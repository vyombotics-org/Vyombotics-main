import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
async function ensureAccess(supabaseAdmin, userId, batchId) {
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, courses(instructor_id)").eq("id", batchId).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const isOwner = batch.courses?.instructor_id === userId;
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  const isAdmin = !!roleRow;
  if (isOwner || isAdmin) return {
    isOwner,
    isAdmin
  };
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("payment_status, expires_at").eq("user_id", userId).eq("batch_id", batchId).maybeSingle();
  const isMember = en?.payment_status === "success" && (!en.expires_at || new Date(en.expires_at) > /* @__PURE__ */ new Date());
  if (!isMember) throw new Error("Access denied");
  return {
    isOwner: false,
    isAdmin: false
  };
}
const listLectureDiscussions_createServerFn_handler = createServerRpc({
  id: "09bf8c3f2bd023158d40bfd2e61a5ae0cd6c71ca055c71ba4948d393dbd8f08e",
  name: "listLectureDiscussions",
  filename: "src/lib/discussions.functions.ts"
}, (opts) => listLectureDiscussions.__executeServer(opts));
const listLectureDiscussions = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid()
}).parse(d)).handler(listLectureDiscussions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lec
  } = await supabaseAdmin.from("lectures").select("batch_id").eq("id", data.lecture_id).maybeSingle();
  if (!lec?.batch_id) throw new Error("Lecture not found");
  await ensureAccess(supabaseAdmin, context.userId, lec.batch_id);
  const {
    data: posts
  } = await supabaseAdmin.from("discussions").select("id, user_id, parent_id, body, is_resolved, created_at").eq("lecture_id", data.lecture_id).order("created_at", {
    ascending: true
  });
  const userIds = Array.from(new Set((posts ?? []).map((p) => p.user_id)));
  const {
    data: profs
  } = userIds.length ? await supabaseAdmin.from("profiles").select("id, full_name, avatar_url").in("id", userIds) : {
    data: []
  };
  const profMap = /* @__PURE__ */ new Map();
  (profs ?? []).forEach((p) => profMap.set(p.id, p));
  const merged = (posts ?? []).map((p) => ({
    ...p,
    profiles: profMap.get(p.user_id) ?? null
  }));
  return {
    posts: merged
  };
});
const postDiscussion_createServerFn_handler = createServerRpc({
  id: "842cf8025eb32c892a226c0eaedeaa9f1c9594f4b0510c3f5b3e6e84f5ac16cf",
  name: "postDiscussion",
  filename: "src/lib/discussions.functions.ts"
}, (opts) => postDiscussion.__executeServer(opts));
const postDiscussion = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid(),
  body: stringType().trim().min(1).max(5e3),
  parent_id: stringType().uuid().nullish()
}).parse(d)).handler(postDiscussion_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lec
  } = await supabaseAdmin.from("lectures").select("id, title, batch_id").eq("id", data.lecture_id).maybeSingle();
  if (!lec?.batch_id) throw new Error("Lecture not found");
  await ensureAccess(supabaseAdmin, context.userId, lec.batch_id);
  const {
    data: inserted,
    error
  } = await supabaseAdmin.from("discussions").insert({
    lecture_id: data.lecture_id,
    batch_id: lec.batch_id,
    user_id: context.userId,
    parent_id: data.parent_id ?? null,
    body: data.body.trim()
  }).select("id").single();
  if (error) throw new Error(error.message);
  try {
    if (data.parent_id) {
      const {
        data: parent
      } = await supabaseAdmin.from("discussions").select("user_id").eq("id", data.parent_id).maybeSingle();
      if (parent && parent.user_id !== context.userId) {
        await supabaseAdmin.from("notifications").insert({
          user_id: parent.user_id,
          type: "discussion_reply",
          title: "New reply to your question",
          body: data.body.slice(0, 200),
          link: `/learn/${lec.batch_id}?lecture=${lec.id}#discussions`
        });
      }
    } else {
      const {
        data: batch
      } = await supabaseAdmin.from("batches").select("courses(instructor_id)").eq("id", lec.batch_id).maybeSingle();
      const ownerId = batch?.courses?.instructor_id;
      if (ownerId && ownerId !== context.userId) {
        await supabaseAdmin.from("notifications").insert({
          user_id: ownerId,
          type: "discussion_question",
          title: `New question on "${lec.title}"`,
          body: data.body.slice(0, 200),
          link: `/learn/${lec.batch_id}?lecture=${lec.id}#discussions`
        });
      }
    }
  } catch {
  }
  return {
    id: inserted.id
  };
});
const deleteDiscussion_createServerFn_handler = createServerRpc({
  id: "9750389844c160ae7e83ae8756c3c5dad3204198f39dc2e252edad8c79905bd6",
  name: "deleteDiscussion",
  filename: "src/lib/discussions.functions.ts"
}, (opts) => deleteDiscussion.__executeServer(opts));
const deleteDiscussion = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteDiscussion_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: row
  } = await supabaseAdmin.from("discussions").select("user_id, batch_id").eq("id", data.id).maybeSingle();
  if (!row) throw new Error("Not found");
  const {
    isOwner,
    isAdmin
  } = await ensureAccess(supabaseAdmin, context.userId, row.batch_id);
  if (row.user_id !== context.userId && !isOwner && !isAdmin) throw new Error("Forbidden");
  const {
    error
  } = await supabaseAdmin.from("discussions").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const toggleResolved_createServerFn_handler = createServerRpc({
  id: "7cbfd7aa6977b7bab0645f5443952a5e5aa7ebb286626955f5c4ab7f0fddbed7",
  name: "toggleResolved",
  filename: "src/lib/discussions.functions.ts"
}, (opts) => toggleResolved.__executeServer(opts));
const toggleResolved = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid(),
  resolved: booleanType()
}).parse(d)).handler(toggleResolved_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: row
  } = await supabaseAdmin.from("discussions").select("batch_id, user_id").eq("id", data.id).maybeSingle();
  if (!row) throw new Error("Not found");
  const {
    isOwner,
    isAdmin
  } = await ensureAccess(supabaseAdmin, context.userId, row.batch_id);
  if (!isOwner && !isAdmin && row.user_id !== context.userId) throw new Error("Forbidden");
  const {
    error
  } = await supabaseAdmin.from("discussions").update({
    is_resolved: data.resolved
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  deleteDiscussion_createServerFn_handler,
  listLectureDiscussions_createServerFn_handler,
  postDiscussion_createServerFn_handler,
  toggleResolved_createServerFn_handler
};
