import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
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
