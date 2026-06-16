import { c as createServerRpc } from "./createServerRpc-D_oksST5.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
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
