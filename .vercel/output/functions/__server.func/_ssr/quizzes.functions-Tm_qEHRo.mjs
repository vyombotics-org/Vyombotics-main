import { c as createServerRpc } from "./createServerRpc-D_oksST5.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/firebase-admin.mjs";
import { a as arrayType, o as objectType, s as stringType, b as booleanType, c as coerce, r as recordType } from "../_libs/zod.mjs";
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
const OptionsSchema = arrayType(objectType({
  id: stringType().min(1).max(8),
  text: stringType().min(1).max(500)
})).min(2).max(8);
const listBatchQuizzes_createServerFn_handler = createServerRpc({
  id: "0836dad091a8191a5e3dcbfc4e11b557a2cb6e29a9f1d2ff7e084bb57a99d1ca",
  name: "listBatchQuizzes",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => listBatchQuizzes.__executeServer(opts));
const listBatchQuizzes = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(listBatchQuizzes_createServerFn_handler, async ({
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
  const isOwner = batch.courses?.instructor_id === context.userId;
  const isAdmin = !!role;
  const isMember = !isAdmin && !isOwner;
  let query = supabaseAdmin.from("quizzes").select("id,title,description,pass_percent,time_limit_min,is_published,lecture_id, quiz_questions(count)").eq("batch_id", data.batch_id).order("created_at", {
    ascending: true
  });
  if (isMember) {
    const {
      data: en
    } = await supabaseAdmin.from("enrollments").select("id").eq("user_id", context.userId).eq("batch_id", data.batch_id).eq("payment_status", "success").maybeSingle();
    if (!en) return {
      quizzes: [],
      canManage: false
    };
    query = query.eq("is_published", true);
  }
  const {
    data: quizzes
  } = await query;
  return {
    quizzes: quizzes ?? [],
    canManage: isAdmin || isOwner
  };
});
const upsertQuiz_createServerFn_handler = createServerRpc({
  id: "24bb955c358913428a569448f38a75c07c654b3894ba930f46a99c13de80e000",
  name: "upsertQuiz",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => upsertQuiz.__executeServer(opts));
const upsertQuiz = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid().optional(),
  batch_id: stringType().uuid(),
  title: stringType().min(1).max(200),
  description: stringType().max(2e3).optional().nullable(),
  pass_percent: coerce.number().int().min(0).max(100).default(60),
  time_limit_min: coerce.number().int().min(0).max(360).optional().nullable(),
  is_published: booleanType().default(false),
  lecture_id: stringType().uuid().optional().nullable()
}).parse(d)).handler(upsertQuiz_createServerFn_handler, async ({
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
  if (data.id) {
    const {
      error: error2
    } = await supabaseAdmin.from("quizzes").update({
      title: data.title,
      description: data.description,
      pass_percent: data.pass_percent,
      time_limit_min: data.time_limit_min,
      is_published: data.is_published,
      lecture_id: data.lecture_id
    }).eq("id", data.id);
    if (error2) throw new Error(error2.message);
    return {
      id: data.id
    };
  }
  const {
    data: created,
    error
  } = await supabaseAdmin.from("quizzes").insert({
    batch_id: data.batch_id,
    title: data.title,
    description: data.description,
    pass_percent: data.pass_percent,
    time_limit_min: data.time_limit_min,
    is_published: data.is_published,
    lecture_id: data.lecture_id
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: created.id
  };
});
const deleteQuiz_createServerFn_handler = createServerRpc({
  id: "3be73de37aaeb6c2aca2971edd1f970ec84219790acf52938beb1dd932914580",
  name: "deleteQuiz",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => deleteQuiz.__executeServer(opts));
const deleteQuiz = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteQuiz_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: q
  } = await supabaseAdmin.from("quizzes").select("batch_id, batches(courses(instructor_id))").eq("id", data.id).maybeSingle();
  if (!q) throw new Error("Quiz not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && q.batches?.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  const {
    error
  } = await supabaseAdmin.from("quizzes").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getQuizAdmin_createServerFn_handler = createServerRpc({
  id: "6de5ba9ccd79e6490b0a3facb2170848b0fa0c89200c12d47fc75fb310f173be",
  name: "getQuizAdmin",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => getQuizAdmin.__executeServer(opts));
const getQuizAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid()
}).parse(d)).handler(getQuizAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: quiz
  } = await supabaseAdmin.from("quizzes").select("*, batches(course_id, courses(instructor_id))").eq("id", data.quiz_id).maybeSingle();
  if (!quiz) throw new Error("Not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && quiz.batches?.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  const {
    data: questions
  } = await supabaseAdmin.from("quiz_questions").select("*").eq("quiz_id", data.quiz_id).order("order_index");
  return {
    quiz,
    questions: questions ?? []
  };
});
const saveQuizQuestions_createServerFn_handler = createServerRpc({
  id: "63dc5c1941c81df70cdaaa3a688f18a6099770ab406b85f921da22dc11d2614b",
  name: "saveQuizQuestions",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => saveQuizQuestions.__executeServer(opts));
const saveQuizQuestions = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid(),
  questions: arrayType(objectType({
    id: stringType().uuid().optional(),
    prompt: stringType().min(1).max(2e3),
    options: OptionsSchema,
    correct_option: stringType().min(1).max(8),
    marks: coerce.number().int().min(1).max(100).default(1),
    order_index: coerce.number().int().min(0).max(1e3)
  })).max(100)
}).parse(d)).handler(saveQuizQuestions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: q
  } = await supabaseAdmin.from("quizzes").select("batch_id, batches(courses(instructor_id))").eq("id", data.quiz_id).maybeSingle();
  if (!q) throw new Error("Quiz not found");
  const {
    data: role
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role && q.batches?.courses?.instructor_id !== context.userId) throw new Error("Forbidden");
  await supabaseAdmin.from("quiz_questions").delete().eq("quiz_id", data.quiz_id);
  if (data.questions.length) {
    const rows = data.questions.map((qq) => ({
      quiz_id: data.quiz_id,
      prompt: qq.prompt,
      options: qq.options,
      correct_option: qq.correct_option,
      marks: qq.marks,
      order_index: qq.order_index
    }));
    const {
      error
    } = await supabaseAdmin.from("quiz_questions").insert(rows);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true,
    count: data.questions.length
  };
});
const getQuizForStudent_createServerFn_handler = createServerRpc({
  id: "a96cc632a2207120d8692b16cef51072a01fa4e21fcf2d3a641db960b1ceed99",
  name: "getQuizForStudent",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => getQuizForStudent.__executeServer(opts));
const getQuizForStudent = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid()
}).parse(d)).handler(getQuizForStudent_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: quiz
  } = await supabaseAdmin.from("quizzes").select("id,batch_id,title,description,pass_percent,time_limit_min,is_published").eq("id", data.quiz_id).maybeSingle();
  if (!quiz || !quiz.is_published) throw new Error("Quiz not available");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id").eq("user_id", context.userId).eq("batch_id", quiz.batch_id).eq("payment_status", "success").maybeSingle();
  if (!en) throw new Error("Enrollment required");
  const {
    data: questions
  } = await supabaseAdmin.from("quiz_questions").select("id,prompt,options,marks,order_index").eq("quiz_id", data.quiz_id).order("order_index");
  const {
    data: attempts
  } = await supabaseAdmin.from("quiz_attempts").select("id,score,max_score,passed,submitted_at").eq("user_id", context.userId).eq("quiz_id", data.quiz_id).order("submitted_at", {
    ascending: false
  });
  return {
    quiz,
    questions: questions ?? [],
    attempts: attempts ?? []
  };
});
const submitQuizAttempt_createServerFn_handler = createServerRpc({
  id: "9bcd484f3434e29b505c83d126d2edccf8f7694c3409117b74076e13489b03b7",
  name: "submitQuizAttempt",
  filename: "src/lib/quizzes.functions.ts"
}, (opts) => submitQuizAttempt.__executeServer(opts));
const submitQuizAttempt = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid(),
  answers: recordType(stringType().uuid(), stringType().min(1).max(8))
}).parse(d)).handler(submitQuizAttempt_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: quiz
  } = await supabaseAdmin.from("quizzes").select("id,batch_id,pass_percent,is_published").eq("id", data.quiz_id).maybeSingle();
  if (!quiz || !quiz.is_published) throw new Error("Quiz not available");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id").eq("user_id", context.userId).eq("batch_id", quiz.batch_id).eq("payment_status", "success").maybeSingle();
  if (!en) throw new Error("Enrollment required");
  const {
    data: questions
  } = await supabaseAdmin.from("quiz_questions").select("id,correct_option,marks").eq("quiz_id", data.quiz_id);
  let score = 0, max = 0;
  (questions ?? []).forEach((q) => {
    max += q.marks;
    if (data.answers[q.id] && data.answers[q.id] === q.correct_option) score += q.marks;
  });
  const passed = max > 0 && score / max * 100 >= quiz.pass_percent;
  const {
    data: created,
    error
  } = await supabaseAdmin.from("quiz_attempts").insert({
    quiz_id: data.quiz_id,
    user_id: context.userId,
    answers: data.answers,
    score,
    max_score: max,
    passed,
    submitted_at: (/* @__PURE__ */ new Date()).toISOString()
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: created.id,
    score,
    max_score: max,
    passed
  };
});
export {
  deleteQuiz_createServerFn_handler,
  getQuizAdmin_createServerFn_handler,
  getQuizForStudent_createServerFn_handler,
  listBatchQuizzes_createServerFn_handler,
  saveQuizQuestions_createServerFn_handler,
  submitQuizAttempt_createServerFn_handler,
  upsertQuiz_createServerFn_handler
};
