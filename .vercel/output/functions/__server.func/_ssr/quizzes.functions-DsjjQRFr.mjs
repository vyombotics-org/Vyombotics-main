import { c as createSsrRpc } from "./router-8ViFXMOq.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import { o as objectType, s as stringType, r as recordType, b as booleanType, c as coerce, a as arrayType } from "../_libs/zod.mjs";
const OptionsSchema = arrayType(objectType({
  id: stringType().min(1).max(8),
  text: stringType().min(1).max(500)
})).min(2).max(8);
const listBatchQuizzes = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("0836dad091a8191a5e3dcbfc4e11b557a2cb6e29a9f1d2ff7e084bb57a99d1ca"));
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
}).parse(d)).handler(createSsrRpc("24bb955c358913428a569448f38a75c07c654b3894ba930f46a99c13de80e000"));
const deleteQuiz = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("3be73de37aaeb6c2aca2971edd1f970ec84219790acf52938beb1dd932914580"));
const getQuizAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6de5ba9ccd79e6490b0a3facb2170848b0fa0c89200c12d47fc75fb310f173be"));
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
}).parse(d)).handler(createSsrRpc("63dc5c1941c81df70cdaaa3a688f18a6099770ab406b85f921da22dc11d2614b"));
const getQuizForStudent = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("a96cc632a2207120d8692b16cef51072a01fa4e21fcf2d3a641db960b1ceed99"));
const submitQuizAttempt = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  quiz_id: stringType().uuid(),
  answers: recordType(stringType().uuid(), stringType().min(1).max(8))
}).parse(d)).handler(createSsrRpc("9bcd484f3434e29b505c83d126d2edccf8f7694c3409117b74076e13489b03b7"));
export {
  getQuizAdmin as a,
  saveQuizQuestions as b,
  deleteQuiz as d,
  getQuizForStudent as g,
  listBatchQuizzes as l,
  submitQuizAttempt as s,
  upsertQuiz as u
};
