import { c as createSsrRpc } from "./router-BBmNS5j3.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import { o as objectType, s as stringType, p as preprocessType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
const getCourseBySlugAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  slug: stringType().min(1)
}).parse(d)).handler(createSsrRpc("d20c91d3b9ca04f9c629fdca8117d33148005b130bd4e4e5929b2c2cc651755d"));
const listBatchesForCourse = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  course_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("b9e1ee309b12ea8ebbf5e7fd6c6d41601d557c592d2b8cceda0d229bb6ca5757"));
const upsertBatch = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => BatchInput.parse(d)).handler(createSsrRpc("6a9b003e969e2d104200a678a366c8b0fe3d25bff8125596060bdc2efc324b6c"));
const deleteBatch = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("e5336f014792e344f8df7e1bed6e81d383f373c610edffe458bc6d30425613b6"));
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
const getBatchAdmin = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("a108ec91b28ac81bad9517eb78f938a0519ceff97b0efc992198c2d3253d4458"));
const listLecturesForBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6774229815152627294eb0d98ea833dd977f840bb861fd5edf0239740f5980c1"));
const upsertLecture = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => LectureInput.parse(d)).handler(createSsrRpc("5e49336393b85826b733e01f35f1aaca0986b8f019e296a67006443c2fe52338"));
const deleteLecture = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("57823a6473715180803837352291dc5584972e94968adf4481de0d46fc5e0068"));
export {
  getBatchAdmin as a,
  listLecturesForBatch as b,
  upsertLecture as c,
  deleteBatch as d,
  deleteLecture as e,
  getCourseBySlugAdmin as g,
  listBatchesForCourse as l,
  upsertBatch as u
};
