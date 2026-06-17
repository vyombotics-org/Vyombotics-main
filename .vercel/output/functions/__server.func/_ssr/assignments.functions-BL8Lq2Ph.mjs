import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, b as booleanType, c as coerce } from "../_libs/zod.mjs";
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
const listBatchAssignments_createServerFn_handler = createServerRpc({
  id: "45c41b605e6d9d78b4ee7b514924911cee786309d224455e4f6082bb73733702",
  name: "listBatchAssignments",
  filename: "src/lib/assignments.functions.ts"
}, (opts) => listBatchAssignments.__executeServer(opts));
const listBatchAssignments = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listBatchAssignments_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, courses(instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!role;
  const isOwner = batch.courses?.instructor_id === context.userId;
  const canManage = isAdmin || isOwner;
  let q = supabaseAdmin.from("assignments").select("id,title,description,max_marks,due_at,is_published,created_at").eq("batch_id", data.batch_id).order("created_at", {
    ascending: false
  });
  if (!canManage) {
    const {
      data: en
    } = await supabaseAdmin.from("enrollments").select("id").eq("user_id", context.userId).eq("batch_id", data.batch_id).eq("payment_status", "success").maybeSingle();
    if (!en) return {
      assignments: [],
      submissions: [],
      canManage: false
    };
    q = q.eq("is_published", true);
  }
  const {
    data: assignments
  } = await q;
  const ids = (assignments ?? []).map((a) => a.id);
  const {
    data: submissions
  } = ids.length ? await supabaseAdmin.from("assignment_submissions").select("id,assignment_id,user_id,text_content,file_url,submitted_at,marks_awarded,feedback,graded_at,profiles:user_id(full_name,avatar_url)").in("assignment_id", ids) : {
    data: []
  };
  const filtered = canManage ? submissions ?? [] : (submissions ?? []).filter((s) => s.user_id === context.userId);
  return {
    assignments: assignments ?? [],
    submissions: filtered,
    canManage
  };
});
const upsertAssignment_createServerFn_handler = createServerRpc({
  id: "2865f56d3c9359b82ce31d05be81bdc691620f6e7bd36e3397c42adf492e3603",
  name: "upsertAssignment",
  filename: "src/lib/assignments.functions.ts"
}, (opts) => upsertAssignment.__executeServer(opts));
const upsertAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid().optional(),
  batch_id: stringType().uuid(),
  title: stringType().min(1).max(200),
  description: stringType().max(5e3).optional().nullable(),
  max_marks: coerce.number().int().min(1).max(1e3).default(100),
  due_at: stringType().optional().nullable(),
  is_published: booleanType().default(false)
}).parse(d)).handler(upsertAssignment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, courses(instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && batch.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  const payload = {
    batch_id: data.batch_id,
    title: data.title,
    description: data.description,
    max_marks: data.max_marks,
    due_at: data.due_at || null,
    is_published: data.is_published
  };
  if (data.id) {
    const {
      error: error2
    } = await supabaseAdmin.from("assignments").update(payload).eq("id", data.id);
    if (error2) throw new Error(error2.message);
    return {
      id: data.id
    };
  }
  const {
    data: created,
    error
  } = await supabaseAdmin.from("assignments").insert(payload).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: created.id
  };
});
const deleteAssignment_createServerFn_handler = createServerRpc({
  id: "f5f19ebf6eb94457b65564c4aa811a089d7678e9c58da8cee33b06cd553ee9ca",
  name: "deleteAssignment",
  filename: "src/lib/assignments.functions.ts"
}, (opts) => deleteAssignment.__executeServer(opts));
const deleteAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteAssignment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: a
  } = await supabaseAdmin.from("assignments").select("batch_id, batches(courses(instructor_id))").eq("id", data.id).maybeSingle();
  if (!a) throw new Error("Not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && a.batches?.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  await supabaseAdmin.from("assignments").delete().eq("id", data.id);
  return {
    ok: true
  };
});
const submitAssignment_createServerFn_handler = createServerRpc({
  id: "8bb4f745a44cf95ff3d3a23421f6fb549a54f8f33c672b621ac019c179c3db0f",
  name: "submitAssignment",
  filename: "src/lib/assignments.functions.ts"
}, (opts) => submitAssignment.__executeServer(opts));
const submitAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  assignment_id: stringType().uuid(),
  text_content: stringType().max(2e4).optional().nullable(),
  file_url: stringType().url().max(1e3).optional().nullable()
}).parse(d)).handler(submitAssignment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: a
  } = await supabaseAdmin.from("assignments").select("id,batch_id,is_published").eq("id", data.assignment_id).maybeSingle();
  if (!a || !a.is_published) throw new Error("Assignment not available");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id").eq("user_id", context.userId).eq("batch_id", a.batch_id).eq("payment_status", "success").maybeSingle();
  if (!en) throw new Error("Enrollment required");
  const {
    data: existing
  } = await supabaseAdmin.from("assignment_submissions").select("id,marks_awarded").eq("assignment_id", data.assignment_id).eq("user_id", context.userId).maybeSingle();
  if (existing && existing.marks_awarded !== null) throw new Error("Already graded — cannot resubmit");
  if (existing) {
    const {
      error: error2
    } = await supabaseAdmin.from("assignment_submissions").update({
      text_content: data.text_content,
      file_url: data.file_url,
      submitted_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", existing.id);
    if (error2) throw new Error(error2.message);
    return {
      id: existing.id,
      updated: true
    };
  }
  const {
    data: created,
    error
  } = await supabaseAdmin.from("assignment_submissions").insert({
    assignment_id: data.assignment_id,
    user_id: context.userId,
    text_content: data.text_content,
    file_url: data.file_url
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: created.id,
    updated: false
  };
});
const gradeSubmission_createServerFn_handler = createServerRpc({
  id: "109acf3f99d4345a1da0373f7a92f581bd311c923b98fb614b17c9c25c4b92c5",
  name: "gradeSubmission",
  filename: "src/lib/assignments.functions.ts"
}, (opts) => gradeSubmission.__executeServer(opts));
const gradeSubmission = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  submission_id: stringType().uuid(),
  marks_awarded: coerce.number().int().min(0).max(1e3),
  feedback: stringType().max(5e3).optional().nullable()
}).parse(d)).handler(gradeSubmission_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: s
  } = await supabaseAdmin.from("assignment_submissions").select("id, assignments(batch_id, batches(courses(instructor_id)))").eq("id", data.submission_id).maybeSingle();
  if (!s) throw new Error("Submission not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && s.assignments?.batches?.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  const {
    error
  } = await supabaseAdmin.from("assignment_submissions").update({
    marks_awarded: data.marks_awarded,
    feedback: data.feedback,
    graded_by: context.userId,
    graded_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.submission_id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  deleteAssignment_createServerFn_handler,
  gradeSubmission_createServerFn_handler,
  listBatchAssignments_createServerFn_handler,
  submitAssignment_createServerFn_handler,
  upsertAssignment_createServerFn_handler
};
