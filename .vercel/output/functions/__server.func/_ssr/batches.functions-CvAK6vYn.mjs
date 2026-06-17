import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
import { o as objectType, p as preprocessType, s as stringType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
async function assertCanManageCourse(ctx, courseId) {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const [{
    data: roleRow
  }, {
    data: course
  }] = await Promise.all([supabaseAdmin.from("user_roles").select("role").eq("user_id", ctx.userId).eq("role", "admin").maybeSingle(), supabaseAdmin.from("courses").select("instructor_id").eq("id", courseId).maybeSingle()]);
  if (roleRow) return;
  if (course?.instructor_id === ctx.userId) return;
  throw new Error("Forbidden: only the course instructor or admin can manage this");
}
async function assertCanManageBatch(ctx, batchId) {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("course_id").eq("id", batchId).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  await assertCanManageCourse(ctx, batch.course_id);
  return batch;
}
const BatchInput = objectType({
  id: stringType().uuid().optional(),
  course_id: stringType().uuid(),
  name: stringType().min(2).max(120),
  start_date: stringType(),
  end_date: stringType(),
  validity_days: coerce.number().int().min(1).max(3650).default(45),
  price_inr: coerce.number().min(0).max(1e6),
  seats: coerce.number().int().min(1).max(1e5).default(100),
  is_active: booleanType().default(true),
  buy_url: preprocessType((v) => v === "" || v === null || v === void 0 ? null : v, stringType().url().nullable().optional())
});
const getCourseBySlugAdmin_createServerFn_handler = createServerRpc({
  id: "d20c91d3b9ca04f9c629fdca8117d33148005b130bd4e4e5929b2c2cc651755d",
  name: "getCourseBySlugAdmin",
  filename: "src/lib/batches.functions.ts"
}, (opts) => getCourseBySlugAdmin.__executeServer(opts));
const getCourseBySlugAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  slug: stringType().min(1)
}).parse(d)).handler(getCourseBySlugAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const identifier = data.slug.trim();
  const isUuid = stringType().uuid().safeParse(identifier).success;
  const {
    data: course,
    error
  } = await supabaseAdmin.from("courses").select("id, title, slug, instructor_id").eq(isUuid ? "id" : "slug", identifier).maybeSingle();
  if (error) throw new Error(error.message);
  if (!course) throw new Error("Course not found");
  await assertCanManageCourse(context, course.id);
  return {
    course
  };
});
const listBatchesForCourse_createServerFn_handler = createServerRpc({
  id: "b9e1ee309b12ea8ebbf5e7fd6c6d41601d557c592d2b8cceda0d229bb6ca5757",
  name: "listBatchesForCourse",
  filename: "src/lib/batches.functions.ts"
}, (opts) => listBatchesForCourse.__executeServer(opts));
const listBatchesForCourse = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  course_id: stringType().uuid()
}).parse(d)).handler(listBatchesForCourse_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertCanManageCourse(context, data.course_id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batches,
    error
  } = await supabaseAdmin.from("batches").select("*").eq("course_id", data.course_id).order("start_date", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    batches: batches ?? []
  };
});
const upsertBatch_createServerFn_handler = createServerRpc({
  id: "6a9b003e969e2d104200a678a366c8b0fe3d25bff8125596060bdc2efc324b6c",
  name: "upsertBatch",
  filename: "src/lib/batches.functions.ts"
}, (opts) => upsertBatch.__executeServer(opts));
const upsertBatch = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => BatchInput.parse(d)).handler(upsertBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertCanManageCourse(context, data.course_id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const payload = {
    course_id: data.course_id,
    name: data.name,
    start_date: data.start_date,
    end_date: data.end_date,
    validity_days: data.validity_days,
    price_inr: data.price_inr,
    seats: data.seats,
    is_active: data.is_active,
    buy_url: data.buy_url ?? null
  };
  if (data.id) {
    const {
      data: updated,
      error
    } = await supabaseAdmin.from("batches").update(payload).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return {
      batch: updated
    };
  } else {
    const {
      data: created,
      error
    } = await supabaseAdmin.from("batches").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return {
      batch: created
    };
  }
});
const deleteBatch_createServerFn_handler = createServerRpc({
  id: "e5336f014792e344f8df7e1bed6e81d383f373c610edffe458bc6d30425613b6",
  name: "deleteBatch",
  filename: "src/lib/batches.functions.ts"
}, (opts) => deleteBatch.__executeServer(opts));
const deleteBatch = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertCanManageBatch(context, data.id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    error
  } = await supabaseAdmin.from("batches").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const optionalUrl = preprocessType((v) => v === "" || v === null || v === void 0 ? null : v, stringType().url().nullable().optional());
const LectureInput = objectType({
  id: stringType().uuid().optional(),
  batch_id: stringType().uuid(),
  title: stringType().min(2).max(200),
  description: stringType().max(2e3).optional().nullable(),
  kind: enumType(["live", "recorded"]),
  scheduled_at: stringType().optional().nullable(),
  duration_min: coerce.number().int().min(0).max(1440).default(60),
  meeting_url: optionalUrl,
  video_url: optionalUrl,
  order_index: coerce.number().int().min(0).default(0),
  is_preview: booleanType().default(false)
});
const getBatchAdmin_createServerFn_handler = createServerRpc({
  id: "a108ec91b28ac81bad9517eb78f938a0519ceff97b0efc992198c2d3253d4458",
  name: "getBatchAdmin",
  filename: "src/lib/batches.functions.ts"
}, (opts) => getBatchAdmin.__executeServer(opts));
const getBatchAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(getBatchAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  const batch = await assertCanManageBatch(context, data.id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const [{
    data: full
  }, {
    data: course
  }] = await Promise.all([supabaseAdmin.from("batches").select("*").eq("id", data.id).single(), supabaseAdmin.from("courses").select("id, title, slug").eq("id", batch.course_id).single()]);
  return {
    batch: full,
    course
  };
});
const listLecturesForBatch_createServerFn_handler = createServerRpc({
  id: "6774229815152627294eb0d98ea833dd977f840bb861fd5edf0239740f5980c1",
  name: "listLecturesForBatch",
  filename: "src/lib/batches.functions.ts"
}, (opts) => listLecturesForBatch.__executeServer(opts));
const listLecturesForBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listLecturesForBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertCanManageBatch(context, data.batch_id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lectures,
    error
  } = await supabaseAdmin.from("lectures").select("*").eq("batch_id", data.batch_id).order("order_index", {
    ascending: true
  }).order("scheduled_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return {
    lectures: lectures ?? []
  };
});
const upsertLecture_createServerFn_handler = createServerRpc({
  id: "5e49336393b85826b733e01f35f1aaca0986b8f019e296a67006443c2fe52338",
  name: "upsertLecture",
  filename: "src/lib/batches.functions.ts"
}, (opts) => upsertLecture.__executeServer(opts));
const upsertLecture = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => LectureInput.parse(d)).handler(upsertLecture_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertCanManageBatch(context, data.batch_id);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const payload = {
    batch_id: data.batch_id,
    title: data.title,
    description: data.description ?? null,
    kind: data.kind,
    scheduled_at: data.scheduled_at || null,
    duration_min: data.duration_min,
    meeting_url: data.kind === "live" ? data.meeting_url ?? null : null,
    video_url: data.kind === "recorded" ? data.video_url ?? null : null,
    order_index: data.order_index,
    is_preview: data.is_preview
  };
  if (data.id) {
    const {
      data: updated,
      error
    } = await supabaseAdmin.from("lectures").update(payload).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return {
      lecture: updated
    };
  } else {
    const {
      data: created,
      error
    } = await supabaseAdmin.from("lectures").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return {
      lecture: created
    };
  }
});
const deleteLecture_createServerFn_handler = createServerRpc({
  id: "57823a6473715180803837352291dc5584972e94968adf4481de0d46fc5e0068",
  name: "deleteLecture",
  filename: "src/lib/batches.functions.ts"
}, (opts) => deleteLecture.__executeServer(opts));
const deleteLecture = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteLecture_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lec
  } = await supabaseAdmin.from("lectures").select("batch_id").eq("id", data.id).maybeSingle();
  if (!lec?.batch_id) throw new Error("Lecture not found");
  await assertCanManageBatch(context, lec.batch_id);
  const {
    error
  } = await supabaseAdmin.from("lectures").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  deleteBatch_createServerFn_handler,
  deleteLecture_createServerFn_handler,
  getBatchAdmin_createServerFn_handler,
  getCourseBySlugAdmin_createServerFn_handler,
  listBatchesForCourse_createServerFn_handler,
  listLecturesForBatch_createServerFn_handler,
  upsertBatch_createServerFn_handler,
  upsertLecture_createServerFn_handler
};
