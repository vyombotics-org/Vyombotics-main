import { c as createSsrRpc } from "./router-BBmNS5j3.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import { o as objectType, s as stringType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
const listPublishedCourses = createServerFn({
  method: "GET"
}).handler(createSsrRpc("34b69cba9d724649e782f42b9ed4ecb603e98ca9dde80d3fd002f1c4bf57d5e2"));
const getCourseBySlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(createSsrRpc("6d307843915e1de7cab61ff6aced7e88ee60114e7e061d0a60d8864ee671eee3"));
const listPreviewLecturesBySlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(createSsrRpc("9e8d7fdc0d0dd4c88f0c858c7628a22055145fc42dc1f94716a27a24685b7bc9"));
const CourseInput = objectType({
  id: stringType().uuid().optional(),
  title: stringType().min(3).max(160),
  slug: stringType().min(0).max(120).optional(),
  description: stringType().max(5e3).optional().default(""),
  thumbnail_url: stringType().url().optional().nullable(),
  category: stringType().max(60).optional().default(""),
  level: enumType(["beginner", "intermediate", "advanced"]).optional().default("beginner"),
  price_inr: coerce.number().min(0).max(1e6),
  duration_hours: coerce.number().int().min(0).max(2e3).default(0),
  is_published: booleanType().default(false)
});
const adminListCourses = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("b18ba41786239877bbd0f40f382d0bcd8a2eb0abb02799ddfa0158944f032469"));
const upsertCourse = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => CourseInput.parse(d)).handler(createSsrRpc("0070ad9c0bb7c09cf177e7ba20703bd920735dbacb21838fcdc70d416ab2bb4b"));
const deleteCourse = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("398a5874789098e47ced66f8e6b8370109c861aefb975c8725f6a6aa92e62ea2"));
export {
  listPreviewLecturesBySlug as a,
  adminListCourses as b,
  deleteCourse as d,
  getCourseBySlug as g,
  listPublishedCourses as l,
  upsertCourse as u
};
