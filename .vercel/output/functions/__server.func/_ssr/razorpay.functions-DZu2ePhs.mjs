import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, c as coerce } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "./client.server-B5gl9oyA.mjs";
const createRazorpayOrder_createServerFn_handler = createServerRpc({
  id: "a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4",
  name: "createRazorpayOrder",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  coupon_id: stringType().uuid().nullish()
}).parse(d)).handler(createRazorpayOrder_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, price_inr, validity_days, course_id, courses(title)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  let finalPrice = Number(batch.price_inr);
  let appliedCouponId = null;
  if (data.coupon_id) {
    const {
      data: coupon
    } = await supabaseAdmin.from("coupons").select("*").eq("id", data.coupon_id).maybeSingle();
    if (coupon && coupon.is_active) {
      const now = /* @__PURE__ */ new Date();
      const validWindow = (!coupon.valid_from || new Date(coupon.valid_from) <= now) && (!coupon.valid_until || new Date(coupon.valid_until) >= now);
      const matchScope = (!coupon.course_id || coupon.course_id === batch.course_id) && (!coupon.batch_id || coupon.batch_id === batch.id);
      const hasUses = !coupon.max_uses || coupon.used_count < coupon.max_uses;
      if (validWindow && matchScope && hasUses) {
        const discount = coupon.discount_type === "percent" ? Math.round(finalPrice * Number(coupon.discount_value) / 100) : Math.min(finalPrice, Number(coupon.discount_value));
        finalPrice = Math.max(0, finalPrice - discount);
        appliedCouponId = coupon.id;
      }
    }
  }
  const {
    data: existing
  } = await supabaseAdmin.from("enrollments").select("id, payment_status").eq("user_id", context.userId).eq("batch_id", batch.id).maybeSingle();
  let enrollment_id = existing?.id;
  if (!enrollment_id) {
    const expires = /* @__PURE__ */ new Date();
    expires.setDate(expires.getDate() + (batch.validity_days || 45));
    const {
      data: created,
      error
    } = await supabaseAdmin.from("enrollments").insert({
      user_id: context.userId,
      batch_id: batch.id,
      payment_status: "pending",
      amount_paid: 0,
      expires_at: expires.toISOString()
    }).select("id").single();
    if (error) throw new Error(error.message);
    enrollment_id = created.id;
  }
  const order_id = `order_DUMMY_${Math.random().toString(36).slice(2, 14)}`;
  return {
    order_id,
    enrollment_id,
    amount: finalPrice * 100,
    // paise (after discount)
    currency: "INR",
    key_id: "rzp_test_DUMMY_KEY",
    name: batch.courses?.title ?? "Course",
    description: batch.name,
    applied_coupon_id: appliedCouponId,
    is_dummy: true
  };
});
const verifyRazorpayPayment_createServerFn_handler = createServerRpc({
  id: "5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199",
  name: "verifyRazorpayPayment",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  razorpay_order_id: stringType().min(1).max(120),
  razorpay_payment_id: stringType().min(1).max(120),
  razorpay_signature: stringType().min(1).max(255),
  applied_coupon_id: stringType().uuid().nullish(),
  amount_paid: coerce.number().min(0).optional()
}).parse(d)).handler(verifyRazorpayPayment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id, user_id, batch_id, batches(price_inr, validity_days)").eq("id", data.enrollment_id).maybeSingle();
  if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");
  const validity = en.batches?.validity_days ?? 45;
  const expires = /* @__PURE__ */ new Date();
  expires.setDate(expires.getDate() + validity);
  const amount = data.amount_paid ?? en.batches?.price_inr ?? 0;
  const {
    error
  } = await supabaseAdmin.from("enrollments").update({
    payment_status: "success",
    amount_paid: amount,
    purchased_at: (/* @__PURE__ */ new Date()).toISOString(),
    expires_at: expires.toISOString()
  }).eq("id", en.id);
  if (error) throw new Error(error.message);
  if (data.applied_coupon_id) {
    const {
      data: coupon
    } = await supabaseAdmin.from("coupons").select("*").eq("id", data.applied_coupon_id).maybeSingle();
    if (coupon) {
      const price = Number(en.batches?.price_inr ?? 0);
      const discount = coupon.discount_type === "percent" ? Math.round(price * Number(coupon.discount_value) / 100) : Math.min(price, Number(coupon.discount_value));
      await supabaseAdmin.from("coupon_redemptions").upsert({
        coupon_id: coupon.id,
        user_id: context.userId,
        enrollment_id: en.id,
        discount_amount: discount
      }, {
        onConflict: "coupon_id,user_id"
      });
      await supabaseAdmin.from("coupons").update({
        used_count: (coupon.used_count ?? 0) + 1
      }).eq("id", coupon.id);
    }
  }
  return {
    ok: true,
    payment_id: data.razorpay_payment_id
  };
});
export {
  createRazorpayOrder_createServerFn_handler,
  verifyRazorpayPayment_createServerFn_handler
};
