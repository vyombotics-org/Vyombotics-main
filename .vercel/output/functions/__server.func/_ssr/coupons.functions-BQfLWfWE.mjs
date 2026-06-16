import { c as createServerRpc } from "./createServerRpc-2SypsCzz.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
import { o as objectType, b as booleanType, s as stringType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
import "http";
import "http2";
import "zlib";
import "https";
import "events";
import "../_libs/@fastify/busboy.mjs";
import "node:events";
import "node:util";
import "node:crypto";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "../_libs/jwks-rsa.mjs";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/jose.mjs";
import "../_libs/lru-memoizer.mjs";
import "../_libs/lru-cache.mjs";
import "node:diagnostics_channel";
import "../_libs/lodash.clonedeep.mjs";
import "../_libs/limiter.mjs";
import "../_libs/@google-cloud/firestore.mjs";
import "assert";
import "url";
import "../_libs/google-gax.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "tls";
import "net";
import "dns";
import "process";
import "fs";
import "../_libs/js-sdsl__ordered-map.mjs";
import "../_libs/grpc__proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "path";
import "child_process";
import "../_libs/google-auth-library.mjs";
import "querystring";
import "../_libs/gaxios.mjs";
import "../_libs/extend.mjs";
import "../_libs/node-fetch.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "punycode";
import "../_libs/tr46.mjs";
import "node:http";
import "node:https";
import "node:zlib";
import "node:buffer";
import "../_libs/data-uri-to-buffer.mjs";
import "../_libs/fetch-blob.mjs";
import "node:fs";
import "../_libs/node-domexception.mjs";
import "../_libs/web-streams-polyfill.mjs";
import "../_libs/formdata-polyfill.mjs";
import "node:url";
import "node:net";
import "../_libs/is-stream.mjs";
import "../_libs/uuid.mjs";
import "../_libs/https-proxy-agent.mjs";
import "../_libs/agent-base.mjs";
import "../_libs/gcp-metadata.mjs";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "node:process";
import "../_libs/base64-js.mjs";
import "../_libs/gtoken.mjs";
import "../_libs/object-hash.mjs";
import "../_libs/proto3-json-serializer.mjs";
import "../_libs/duplexify.mjs";
import "../_libs/readable-stream.mjs";
import "node:string_decoder";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/end-of-stream.mjs";
import "../_libs/once.mjs";
import "../_libs/wrappy.mjs";
import "../_libs/stream-shift.mjs";
import "../_libs/retry-request.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/functional-red-black-tree.mjs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/google-cloud__storage.mjs";
import "../_libs/google-cloud__projectify.mjs";
import "../_libs/html-entities.mjs";
import "../_libs/teeny-request.mjs";
import "../_libs/http-proxy-agent.mjs";
import "../_libs/tootallnate__once.mjs";
import "../_libs/stream-events.mjs";
import "../_libs/stubs.mjs";
import "../_libs/google-cloud__promisify.mjs";
import "../_libs/google-cloud__paginator.mjs";
import "../_libs/arrify.mjs";
import "../_libs/mime.mjs";
import "../_libs/p-limit.mjs";
import "../_libs/yocto-queue.mjs";
import "../_libs/async-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/abort-controller.mjs";
import "../_libs/event-target-shim.mjs";
import "../_libs/fast-xml-parser.mjs";
async function isAdminOrInstructor(supabaseAdmin, userId) {
  const {
    data
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).in("role", ["admin", "instructor"]);
  return (data ?? []).length > 0;
}
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
const listCoupons_createServerFn_handler = createServerRpc({
  id: "a44e41254623c4d16ca20558834ecb427ea77f1edd06af1f90288510a5f2cec0",
  name: "listCoupons",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => listCoupons.__executeServer(opts));
const listCoupons = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(listCoupons_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  if (!await isAdminOrInstructor(supabaseAdmin, context.userId)) throw new Error("Forbidden");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!roleRow;
  let q = supabaseAdmin.from("coupons").select("*, courses(title), batches(name)").order("created_at", {
    ascending: false
  });
  if (!isAdmin) q = q.eq("created_by", context.userId);
  const {
    data,
    error
  } = await q;
  if (error) throw new Error(error.message);
  return {
    coupons: data ?? []
  };
});
const listCouponsForBatch_createServerFn_handler = createServerRpc({
  id: "98808cf2a0600120407ee629d126fdde7d4185ad183714e4ea9eaa9b979376b4",
  name: "listCouponsForBatch",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => listCouponsForBatch.__executeServer(opts));
const listCouponsForBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listCouponsForBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  if (!await isAdminOrInstructor(supabaseAdmin, context.userId)) throw new Error("Forbidden");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, price_inr, course_id, courses(title, instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!roleRow;
  if (!isAdmin && batch.courses?.instructor_id !== context.userId) {
    throw new Error("Forbidden: only the course instructor or admin can manage this");
  }
  const {
    data: coupons,
    error
  } = await supabaseAdmin.from("coupons").select("*").eq("batch_id", data.batch_id).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    coupons: coupons ?? [],
    batch
  };
});
const upsertCoupon_createServerFn_handler = createServerRpc({
  id: "36df1c50d26e4ec08bf50f3f985ef23b5006cf9c374d39bb09b3feaced22161a",
  name: "upsertCoupon",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => upsertCoupon.__executeServer(opts));
const upsertCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => CouponInput.parse(d)).handler(upsertCoupon_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  if (!await isAdminOrInstructor(supabaseAdmin, context.userId)) throw new Error("Forbidden");
  if (data.discount_type === "percent" && data.discount_value > 100) throw new Error("Percent discount cannot exceed 100");
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
    created_by: context.userId
  };
  if (data.id) {
    const {
      data: updated,
      error
    } = await supabaseAdmin.from("coupons").update(payload).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return {
      coupon: updated
    };
  } else {
    const {
      data: created,
      error
    } = await supabaseAdmin.from("coupons").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return {
      coupon: created
    };
  }
});
const deleteCoupon_createServerFn_handler = createServerRpc({
  id: "e2dd9162a423760da101b8cb0df75de99296731d370ffc6eccada85a55fe4395",
  name: "deleteCoupon",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => deleteCoupon.__executeServer(opts));
const deleteCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteCoupon_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: row
  } = await supabaseAdmin.from("coupons").select("created_by").eq("id", data.id).maybeSingle();
  if (!row) throw new Error("Not found");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!roleRow && row.created_by !== context.userId) throw new Error("Forbidden");
  const {
    error
  } = await supabaseAdmin.from("coupons").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const validateCoupon_createServerFn_handler = createServerRpc({
  id: "f55cbfb360842522e6f3389b04207b5a185f1b8232a156668153317b71f79fc2",
  name: "validateCoupon",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => validateCoupon.__executeServer(opts));
const validateCoupon = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  code: stringType().trim().min(3).max(40),
  batch_id: stringType().uuid()
}).parse(d)).handler(validateCoupon_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const code = data.code.toUpperCase();
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, course_id, price_inr").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: coupon
  } = await supabaseAdmin.from("coupons").select("*").eq("code", code).maybeSingle();
  if (!coupon || !coupon.is_active) throw new Error("Invalid coupon code");
  const now = /* @__PURE__ */ new Date();
  if (coupon.valid_from && new Date(coupon.valid_from) > now) throw new Error("Coupon not active yet");
  if (coupon.valid_until && new Date(coupon.valid_until) < now) throw new Error("Coupon expired");
  if (coupon.max_uses && coupon.used_count >= coupon.max_uses) throw new Error("Coupon usage limit reached");
  if (coupon.course_id && coupon.course_id !== batch.course_id) throw new Error("Coupon not valid for this course");
  if (coupon.batch_id && coupon.batch_id !== batch.id) throw new Error("Coupon not valid for this batch");
  const {
    data: redeemed
  } = await supabaseAdmin.from("coupon_redemptions").select("id").eq("coupon_id", coupon.id).eq("user_id", context.userId).maybeSingle();
  if (redeemed) throw new Error("You've already used this coupon");
  const price = Number(batch.price_inr);
  const discount = coupon.discount_type === "percent" ? Math.round(price * Number(coupon.discount_value) / 100) : Math.min(price, Number(coupon.discount_value));
  const finalPrice = Math.max(0, price - discount);
  return {
    coupon_id: coupon.id,
    code: coupon.code,
    description: coupon.description,
    original_price: price,
    discount,
    final_price: finalPrice,
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value
  };
});
const redeemCouponOnEnrollment_createServerFn_handler = createServerRpc({
  id: "0a425a9e08538dd5af26d15d0f589b16a362f1031ba99a23aa9140ed5ff91974",
  name: "redeemCouponOnEnrollment",
  filename: "src/lib/coupons.functions.ts"
}, (opts) => redeemCouponOnEnrollment.__executeServer(opts));
const redeemCouponOnEnrollment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  coupon_id: stringType().uuid()
}).parse(d)).handler(redeemCouponOnEnrollment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id, user_id, batch_id, batches(price_inr)").eq("id", data.enrollment_id).maybeSingle();
  if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");
  const {
    data: coupon
  } = await supabaseAdmin.from("coupons").select("*").eq("id", data.coupon_id).maybeSingle();
  if (!coupon) throw new Error("Coupon not found");
  const price = Number(en.batches?.price_inr ?? 0);
  const discount = coupon.discount_type === "percent" ? Math.round(price * Number(coupon.discount_value) / 100) : Math.min(price, Number(coupon.discount_value));
  const {
    error: rErr
  } = await supabaseAdmin.from("coupon_redemptions").insert({
    coupon_id: coupon.id,
    user_id: context.userId,
    enrollment_id: en.id,
    discount_amount: discount
  });
  if (rErr) throw new Error(rErr.message);
  await supabaseAdmin.from("coupons").update({
    used_count: (coupon.used_count ?? 0) + 1
  }).eq("id", coupon.id);
  return {
    ok: true,
    discount
  };
});
export {
  deleteCoupon_createServerFn_handler,
  listCouponsForBatch_createServerFn_handler,
  listCoupons_createServerFn_handler,
  redeemCouponOnEnrollment_createServerFn_handler,
  upsertCoupon_createServerFn_handler,
  validateCoupon_createServerFn_handler
};
