import { c as createSsrRpc } from "./router-BBmNS5j3.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import { o as objectType, s as stringType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
const CouponInput = objectType({
  id: stringType().uuid().optional(),
  code: stringType().min(3).max(40).regex(/^[A-Z0-9_-]+$/, "Use A-Z, 0-9, _ and - only"),
  description: stringType().max(200).optional().nullable(),
  discount_type: enumType(["percent", "flat"]),
  discount_value: coerce.number().positive().max(1e6),
  max_uses: coerce.number().int().positive().max(1e6).optional().nullable(),
  valid_from: stringType().optional().nullable(),
  valid_until: stringType().optional().nullable(),
  course_id: stringType().uuid().optional().nullable(),
  batch_id: stringType().uuid().optional().nullable(),
  is_active: booleanType().default(true)
});
const listCoupons = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("a44e41254623c4d16ca20558834ecb427ea77f1edd06af1f90288510a5f2cec0"));
const listCouponsForBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("98808cf2a0600120407ee629d126fdde7d4185ad183714e4ea9eaa9b979376b4"));
const upsertCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => CouponInput.parse(d)).handler(createSsrRpc("36df1c50d26e4ec08bf50f3f985ef23b5006cf9c374d39bb09b3feaced22161a"));
const deleteCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("e2dd9162a423760da101b8cb0df75de99296731d370ffc6eccada85a55fe4395"));
const validateCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  code: stringType().trim().min(3).max(40),
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("f55cbfb360842522e6f3389b04207b5a185f1b8232a156668153317b71f79fc2"));
createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  coupon_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("0a425a9e08538dd5af26d15d0f589b16a362f1031ba99a23aa9140ed5ff91974"));
export {
  listCouponsForBatch as a,
  deleteCoupon as d,
  listCoupons as l,
  upsertCoupon as u,
  validateCoupon as v
};
