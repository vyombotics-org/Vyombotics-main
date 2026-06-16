import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

// DUMMY: Create a fake Razorpay order. Replace with real Razorpay Orders API later.
export const createRazorpayOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string; coupon_id?: string | null }) =>
    z.object({ batch_id: z.string().uuid(), coupon_id: z.string().uuid().nullish() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, name, price_inr, validity_days, course_id, courses(title)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");

    // Resolve discount from coupon if provided
    let finalPrice = Number(batch.price_inr);
    let appliedCouponId: string | null = null;
    if (data.coupon_id) {
      const { data: coupon } = await supabaseAdmin
        .from("coupons")
        .select("*")
        .eq("id", data.coupon_id)
        .maybeSingle();
      if (coupon && coupon.is_active) {
        const now = new Date();
        const validWindow =
          (!coupon.valid_from || new Date(coupon.valid_from) <= now) &&
          (!coupon.valid_until || new Date(coupon.valid_until) >= now);
        const matchScope =
          (!coupon.course_id || coupon.course_id === batch.course_id) &&
          (!coupon.batch_id || coupon.batch_id === batch.id);
        const hasUses = !coupon.max_uses || coupon.used_count < coupon.max_uses;
        if (validWindow && matchScope && hasUses) {
          const discount =
            coupon.discount_type === "percent"
              ? Math.round((finalPrice * Number(coupon.discount_value)) / 100)
              : Math.min(finalPrice, Number(coupon.discount_value));
          finalPrice = Math.max(0, finalPrice - discount);
          appliedCouponId = coupon.id;
        }
      }
    }

    // Ensure pending enrollment exists
    const { data: existing } = await supabaseAdmin
      .from("enrollments")
      .select("id, payment_status")
      .eq("user_id", context.userId)
      .eq("batch_id", batch.id)
      .maybeSingle();

    let enrollment_id = existing?.id;
    if (!enrollment_id) {
      const expires = new Date();
      expires.setDate(expires.getDate() + (batch.validity_days || 45));
      const { data: created, error } = await supabaseAdmin
        .from("enrollments")
        .insert({
          user_id: context.userId,
          batch_id: batch.id,
          payment_status: "pending",
          amount_paid: 0,
          expires_at: expires.toISOString(),
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      enrollment_id = created.id;
    }

    // DUMMY ORDER — in real flow this would call Razorpay Orders API with RAZORPAY_KEY_SECRET
    const order_id = `order_DUMMY_${Math.random().toString(36).slice(2, 14)}`;
    return {
      order_id,
      enrollment_id,
      amount: finalPrice * 100, // paise (after discount)
      currency: "INR",
      key_id: "rzp_test_DUMMY_KEY",
      name: (batch as any).courses?.title ?? "Course",
      description: batch.name,
      applied_coupon_id: appliedCouponId,
      is_dummy: true,
    };
  });

// DUMMY: Verify Razorpay payment. In real flow, validate HMAC of order_id|payment_id with RAZORPAY_KEY_SECRET.
export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: {
      enrollment_id: string;
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      applied_coupon_id?: string | null;
      amount_paid?: number;
    }) =>
      z
        .object({
          enrollment_id: z.string().uuid(),
          razorpay_order_id: z.string().min(1).max(120),
          razorpay_payment_id: z.string().min(1).max(120),
          razorpay_signature: z.string().min(1).max(255),
          applied_coupon_id: z.string().uuid().nullish(),
          amount_paid: z.coerce.number().min(0).optional(),
        })
        .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // TODO: real HMAC verification:
    // const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    //   .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
    // if (expected !== data.razorpay_signature) throw new Error("Invalid signature");

    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id, user_id, batch_id, batches(price_inr, validity_days)")
      .eq("id", data.enrollment_id)
      .maybeSingle();
    if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");

    const validity = (en as any).batches?.validity_days ?? 45;
    const expires = new Date();
    expires.setDate(expires.getDate() + validity);
    const amount = data.amount_paid ?? (en as any).batches?.price_inr ?? 0;
    const { error } = await supabaseAdmin
      .from("enrollments")
      .update({
        payment_status: "success",
        amount_paid: amount,
        purchased_at: new Date().toISOString(),
        expires_at: expires.toISOString(),
      })
      .eq("id", en.id);
    if (error) throw new Error(error.message);

    // Redeem coupon if provided
    if (data.applied_coupon_id) {
      const { data: coupon } = await supabaseAdmin
        .from("coupons")
        .select("*")
        .eq("id", data.applied_coupon_id)
        .maybeSingle();
      if (coupon) {
        const price = Number((en as any).batches?.price_inr ?? 0);
        const discount =
          coupon.discount_type === "percent"
            ? Math.round((price * Number(coupon.discount_value)) / 100)
            : Math.min(price, Number(coupon.discount_value));
        await supabaseAdmin.from("coupon_redemptions").upsert(
          {
            coupon_id: coupon.id,
            user_id: context.userId,
            enrollment_id: en.id,
            discount_amount: discount,
          },
          { onConflict: "coupon_id,user_id" },
        );
        await supabaseAdmin
          .from("coupons")
          .update({ used_count: (coupon.used_count ?? 0) + 1 })
          .eq("id", coupon.id);
      }
    }

    return { ok: true, payment_id: data.razorpay_payment_id };
  });
