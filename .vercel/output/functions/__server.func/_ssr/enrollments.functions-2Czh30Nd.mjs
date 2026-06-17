import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
import { o as objectType, s as stringType, c as coerce, b as booleanType, e as enumType } from "../_libs/zod.mjs";
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
async function assertBatchAdminOrOwner(supabaseAdmin, userId, batch_id) {
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, course_id, validity_days, price_inr, courses(title, instructor_id)").eq("id", batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!roleRow;
  const isOwner = batch.courses?.instructor_id === userId;
  if (!isAdmin && !isOwner) throw new Error("Forbidden");
  return batch;
}
const listBatchEnrollments_createServerFn_handler = createServerRpc({
  id: "a96e4ac947723fa994d87aef6f22b8cf26920c60a8ef8a03271d042e450817fb",
  name: "listBatchEnrollments",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => listBatchEnrollments.__executeServer(opts));
const listBatchEnrollments = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listBatchEnrollments_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const batch = await assertBatchAdminOrOwner(supabaseAdmin, context.userId, data.batch_id);
  const {
    data: enrollments
  } = await supabaseAdmin.from("enrollments").select("id, user_id, payment_status, amount_paid, purchased_at, expires_at, created_at, profiles:user_id(full_name, avatar_url)").eq("batch_id", data.batch_id).order("created_at", {
    ascending: false
  });
  const userIds = (enrollments ?? []).map((e) => e.user_id);
  const emails = /* @__PURE__ */ new Map();
  if (userIds.length) {
    const {
      data: authList
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200
    });
    authList?.users?.forEach((u) => emails.set(u.id, u.email ?? ""));
  }
  const {
    data: certs
  } = await supabaseAdmin.from("certificates").select("user_id, serial_no").eq("batch_id", data.batch_id);
  const certMap = /* @__PURE__ */ new Map();
  (certs ?? []).forEach((c) => certMap.set(c.user_id, c.serial_no));
  const rows = (enrollments ?? []).map((e) => ({
    ...e,
    email: emails.get(e.user_id) ?? "",
    certificate_serial: certMap.get(e.user_id) ?? null
  }));
  return {
    batch,
    enrollments: rows
  };
});
const adminMarkEnrollmentPaid_createServerFn_handler = createServerRpc({
  id: "ddb9427292d41953a909a1d25e927f73d5d165cb5f0204134f6a4c4be4d192eb",
  name: "adminMarkEnrollmentPaid",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => adminMarkEnrollmentPaid.__executeServer(opts));
const adminMarkEnrollmentPaid = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  amount_paid: coerce.number().min(0).optional()
}).parse(d)).handler(adminMarkEnrollmentPaid_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id, batch_id, batches(price_inr, validity_days)").eq("id", data.enrollment_id).maybeSingle();
  if (!en) throw new Error("Enrollment not found");
  await assertBatchAdminOrOwner(supabaseAdmin, context.userId, en.batch_id);
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
  return {
    ok: true
  };
});
const adminRevokeEnrollment_createServerFn_handler = createServerRpc({
  id: "11cfe162140552ca5eafaba5bee6ecef2639a4c1e2f057d45d54cf4d70657c6e",
  name: "adminRevokeEnrollment",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => adminRevokeEnrollment.__executeServer(opts));
const adminRevokeEnrollment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid()
}).parse(d)).handler(adminRevokeEnrollment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id, batch_id").eq("id", data.enrollment_id).maybeSingle();
  if (!en) throw new Error("Enrollment not found");
  await assertBatchAdminOrOwner(supabaseAdmin, context.userId, en.batch_id);
  const {
    error
  } = await supabaseAdmin.from("enrollments").delete().eq("id", en.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
function genSerial() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SV-${ts}-${rand}`;
}
const adminIssueCertificate_createServerFn_handler = createServerRpc({
  id: "e9f1bdf631c0f7f76effb5441b8c28dd23ecd00f80666ef42128ef965993b8a1",
  name: "adminIssueCertificate",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => adminIssueCertificate.__executeServer(opts));
const adminIssueCertificate = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  user_id: stringType().uuid()
}).parse(d)).handler(adminIssueCertificate_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const batch = await assertBatchAdminOrOwner(supabaseAdmin, context.userId, data.batch_id);
  const {
    data: existing
  } = await supabaseAdmin.from("certificates").select("id, serial_no").eq("user_id", data.user_id).eq("batch_id", data.batch_id).maybeSingle();
  if (existing) return {
    certificate: existing,
    just_issued: false
  };
  const {
    data: cert,
    error
  } = await supabaseAdmin.from("certificates").insert({
    user_id: data.user_id,
    batch_id: data.batch_id,
    course_id: batch.course_id,
    serial_no: genSerial()
  }).select("id, serial_no").single();
  if (error) throw new Error(error.message);
  await supabaseAdmin.from("notifications").insert({
    user_id: data.user_id,
    type: "certificate",
    title: "Certificate issued",
    body: `Your certificate for ${batch.courses?.title ?? "the course"} (${batch.name}) is now available.`,
    link: `/certificates`
  });
  return {
    certificate: cert,
    just_issued: true
  };
});
const adminListContactMessages_createServerFn_handler = createServerRpc({
  id: "2f071aac21c52b928681da22dd585319386d85ff0cf806e556d190f772628743",
  name: "adminListContactMessages",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => adminListContactMessages.__executeServer(opts));
const adminListContactMessages = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(adminListContactMessages_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!roleRow) throw new Error("Forbidden: admin only");
  const {
    data,
    error
  } = await supabaseAdmin.from("contact_messages").select("id, name, email, message, status, created_at").order("created_at", {
    ascending: false
  }).limit(200);
  if (error) throw new Error(error.message);
  return {
    messages: data ?? []
  };
});
const adminUpdateContactMessage_createServerFn_handler = createServerRpc({
  id: "9694c97605ae7b7549ec1af141876aacc4d904973f08025f8cf2d9d5c53c1fb7",
  name: "adminUpdateContactMessage",
  filename: "src/lib/enrollments.functions.ts"
}, (opts) => adminUpdateContactMessage.__executeServer(opts));
const adminUpdateContactMessage = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid(),
  status: enumType(["new", "read", "replied"]).optional(),
  delete: booleanType().optional()
}).parse(d)).handler(adminUpdateContactMessage_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!roleRow) throw new Error("Forbidden: admin only");
  if (data.delete) {
    const {
      error
    } = await supabaseAdmin.from("contact_messages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
  } else if (data.status) {
    const {
      error
    } = await supabaseAdmin.from("contact_messages").update({
      status: data.status
    }).eq("id", data.id);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
export {
  adminIssueCertificate_createServerFn_handler,
  adminListContactMessages_createServerFn_handler,
  adminMarkEnrollmentPaid_createServerFn_handler,
  adminRevokeEnrollment_createServerFn_handler,
  adminUpdateContactMessage_createServerFn_handler,
  listBatchEnrollments_createServerFn_handler
};
