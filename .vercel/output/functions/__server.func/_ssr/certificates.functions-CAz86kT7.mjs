import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
function genSerial() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SV-${ts}-${rand}`;
}
const issueCertificate_createServerFn_handler = createServerRpc({
  id: "ac2115698b2515ef279cd7c4819eddf1e114fb3d4c5c047df75101b290f93114",
  name: "issueCertificate",
  filename: "src/lib/certificates.functions.ts"
}, (opts) => issueCertificate.__executeServer(opts));
const issueCertificate = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(issueCertificate_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id,course_id,name,courses(title)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id,payment_status,expires_at").eq("user_id", context.userId).eq("batch_id", data.batch_id).maybeSingle();
  if (!en || en.payment_status !== "success") throw new Error("Enrollment required");
  const {
    data: existing
  } = await supabaseAdmin.from("certificates").select("*").eq("user_id", context.userId).eq("batch_id", data.batch_id).maybeSingle();
  if (existing) return {
    certificate: existing,
    just_issued: false
  };
  const {
    data: lectures
  } = await supabaseAdmin.from("lectures").select("id").eq("batch_id", data.batch_id);
  const total = (lectures ?? []).length;
  if (total === 0) throw new Error("No lectures in batch yet");
  const {
    data: progress
  } = await supabaseAdmin.from("lecture_progress").select("lecture_id,completed").eq("user_id", context.userId).in("lecture_id", (lectures ?? []).map((l) => l.id));
  const completed = (progress ?? []).filter((p) => p.completed).length;
  const pct = completed / total * 100;
  if (pct < 80) throw new Error(`Complete at least 80% of lectures (currently ${Math.floor(pct)}%)`);
  const {
    data: quizzes
  } = await supabaseAdmin.from("quizzes").select("id").eq("batch_id", data.batch_id).eq("is_published", true);
  if ((quizzes ?? []).length > 0) {
    const qids = (quizzes ?? []).map((q) => q.id);
    const {
      data: attempts
    } = await supabaseAdmin.from("quiz_attempts").select("quiz_id,passed").eq("user_id", context.userId).in("quiz_id", qids);
    const passedSet = new Set((attempts ?? []).filter((a) => a.passed).map((a) => a.quiz_id));
    const allPassed = qids.every((id) => passedSet.has(id));
    if (!allPassed) throw new Error("Pass all published quizzes first");
  }
  const serial = genSerial();
  const {
    data: cert,
    error
  } = await supabaseAdmin.from("certificates").insert({
    user_id: context.userId,
    batch_id: data.batch_id,
    course_id: batch.course_id,
    serial_no: serial
  }).select("*").single();
  if (error) throw new Error(error.message);
  return {
    certificate: cert,
    just_issued: true
  };
});
const myCertificates_createServerFn_handler = createServerRpc({
  id: "379ffe35ad68302a48b6fa4e835a1aeda5ab80782ffa2d85a0b1a25bf7c745ce",
  name: "myCertificates",
  filename: "src/lib/certificates.functions.ts"
}, (opts) => myCertificates.__executeServer(opts));
const myCertificates = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(myCertificates_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data
  } = await supabaseAdmin.from("certificates").select("id,serial_no,issued_at,batches(name),courses(title,slug)").eq("user_id", context.userId).order("issued_at", {
    ascending: false
  });
  return {
    certificates: data ?? []
  };
});
const verifyCertificate_createServerFn_handler = createServerRpc({
  id: "d2db6178b85398a843aeec148e94a18e889315165724b5888d3e1edd05496bbf",
  name: "verifyCertificate",
  filename: "src/lib/certificates.functions.ts"
}, (opts) => verifyCertificate.__executeServer(opts));
const verifyCertificate = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  serial_no: stringType().min(4).max(64).regex(/^[A-Z0-9-]+$/)
}).parse(d)).handler(verifyCertificate_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: cert
  } = await supabaseAdmin.from("certificates").select("serial_no, issued_at, batches(name), courses(title), profiles:user_id(full_name)").eq("serial_no", data.serial_no).maybeSingle();
  if (!cert) return {
    valid: false
  };
  return {
    valid: true,
    serial_no: cert.serial_no,
    issued_at: cert.issued_at,
    student_name: cert.profiles?.full_name ?? "Student",
    course_title: cert.courses?.title ?? "Course",
    batch_name: cert.batches?.name ?? ""
  };
});
export {
  issueCertificate_createServerFn_handler,
  myCertificates_createServerFn_handler,
  verifyCertificate_createServerFn_handler
};
