import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function isAdminOrInstructor(supabaseAdmin: any, userId: string) {
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .in("role", ["admin", "instructor"]);
  return (data ?? []).length > 0;
}

const CouponInput = z.object({
  id: z.string().uuid().optional(),
  code: z
    .string()
    .min(3)
    .max(40)
    .regex(/^[A-Z0-9_-]+$/, "Use A-Z, 0-9, _ and - only"),
  description: z.string().max(200).optional().nullable(),
  discount_type: z.enum(["percent", "flat"]),
  discount_value: z.coerce.number().positive().max(1_000_000),
  max_uses: z.coerce.number().int().positive().max(1_000_000).optional().nullable(),
  valid_from: z.string().optional().nullable(),
  valid_until: z.string().optional().nullable(),
  course_id: z.string().uuid().optional().nullable(),
  batch_id: z.string().uuid().optional().nullable(),
  is_active: z.boolean().default(true),
});

export const listCoupons = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (!(await isAdminOrInstructor(supabaseAdmin, context.userId))) throw new Error("Forbidden");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isAdmin = !!roleRow;
    let q = supabaseAdmin
      .from("coupons")
      .select("*, courses(title), batches(name)")
      .order("created_at", { ascending: false });
    if (!isAdmin) q = q.eq("created_by", context.userId);
    const { data, error } = await q;
    if (error) throw new Error(error.message);
    return { coupons: data ?? [] };
  });

export const listCouponsForBatch = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { batch_id: string }) => z.object({ batch_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (!(await isAdminOrInstructor(supabaseAdmin, context.userId))) throw new Error("Forbidden");
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, name, price_inr, course_id, courses(title, instructor_id)")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    const isAdmin = !!roleRow;
    if (!isAdmin && (batch as any).courses?.instructor_id !== context.userId) {
      throw new Error("Forbidden: only the course instructor or admin can manage this");
    }
    const { data: coupons, error } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("batch_id", data.batch_id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { coupons: coupons ?? [], batch };
  });

export const upsertCoupon = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CouponInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (!(await isAdminOrInstructor(supabaseAdmin, context.userId))) throw new Error("Forbidden");
    if (data.discount_type === "percent" && data.discount_value > 100)
      throw new Error("Percent discount cannot exceed 100");
    const payload = {
      code: data.code.toUpperCase(),
      description: data.description ?? null,
      discount_type: data.discount_type,
      discount_value: data.discount_value,
      max_uses: data.max_uses ?? null,
      valid_from: data.valid_from || null,
      valid_until: data.valid_until || null,
      course_id: data.course_id || null,
      batch_id: data.batch_id || null,
      is_active: data.is_active,
      created_by: context.userId,
    };
    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("coupons")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { coupon: updated };
    } else {
      const { data: created, error } = await supabaseAdmin
        .from("coupons")
        .insert(payload)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { coupon: created };
    }
  });

export const deleteCoupon = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("coupons")
      .select("created_by")
      .eq("id", data.id)
      .maybeSingle();
    if (!row) throw new Error("Not found");
    const { data: roleRow } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow && row.created_by !== context.userId) throw new Error("Forbidden");
    const { error } = await supabaseAdmin.from("coupons").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Validates a coupon code for a given batch and returns the discounted price.
 * Does NOT consume the coupon.
 */
export const validateCoupon = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { code: string; batch_id: string }) =>
    z.object({ code: z.string().trim().min(3).max(40), batch_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const code = data.code.toUpperCase();
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, course_id, price_inr")
      .eq("id", data.batch_id)
      .maybeSingle();
    if (!batch) throw new Error("Batch not found");
    const { data: coupon } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("code", code)
      .maybeSingle();
    if (!coupon || !coupon.is_active) throw new Error("Invalid coupon code");
    const now = new Date();
    if (coupon.valid_from && new Date(coupon.valid_from) > now)
      throw new Error("Coupon not active yet");
    if (coupon.valid_until && new Date(coupon.valid_until) < now) throw new Error("Coupon expired");
    if (coupon.max_uses && coupon.used_count >= coupon.max_uses)
      throw new Error("Coupon usage limit reached");
    if (coupon.course_id && coupon.course_id !== batch.course_id)
      throw new Error("Coupon not valid for this course");
    if (coupon.batch_id && coupon.batch_id !== batch.id)
      throw new Error("Coupon not valid for this batch");
    const { data: redeemed } = await supabaseAdmin
      .from("coupon_redemptions")
      .select("id")
      .eq("coupon_id", coupon.id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (redeemed) throw new Error("You've already used this coupon");

    const price = Number(batch.price_inr);
    const discount =
      coupon.discount_type === "percent"
        ? Math.round((price * Number(coupon.discount_value)) / 100)
        : Math.min(price, Number(coupon.discount_value));
    const finalPrice = Math.max(0, price - discount);
    return {
      coupon_id: coupon.id,
      code: coupon.code,
      description: coupon.description,
      original_price: price,
      discount,
      final_price: finalPrice,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
    };
  });

/**
 * Marks the demo enrollment as paid AND consumes the coupon atomically (best-effort).
 */
export const redeemCouponOnEnrollment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { enrollment_id: string; coupon_id: string }) =>
    z.object({ enrollment_id: z.string().uuid(), coupon_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: en } = await supabaseAdmin
      .from("enrollments")
      .select("id, user_id, batch_id, batches(price_inr)")
      .eq("id", data.enrollment_id)
      .maybeSingle();
    if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");
    const { data: coupon } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("id", data.coupon_id)
      .maybeSingle();
    if (!coupon) throw new Error("Coupon not found");
    const price = Number((en as any).batches?.price_inr ?? 0);
    const discount =
      coupon.discount_type === "percent"
        ? Math.round((price * Number(coupon.discount_value)) / 100)
        : Math.min(price, Number(coupon.discount_value));

    const { error: rErr } = await supabaseAdmin.from("coupon_redemptions").insert({
      coupon_id: coupon.id,
      user_id: context.userId,
      enrollment_id: en.id,
      discount_amount: discount,
    });
    if (rErr) throw new Error(rErr.message);
    await supabaseAdmin
      .from("coupons")
      .update({ used_count: (coupon.used_count ?? 0) + 1 })
      .eq("id", coupon.id);
    return { ok: true, discount };
  });
