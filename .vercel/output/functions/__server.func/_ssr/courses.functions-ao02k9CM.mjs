import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const listPublishedCourses_createServerFn_handler = createServerRpc({
  id: "34b69cba9d724649e782f42b9ed4ecb603e98ca9dde80d3fd002f1c4bf57d5e2",
  name: "listPublishedCourses",
  filename: "src/lib/courses.functions.ts"
}, (opts) => listPublishedCourses.__executeServer(opts));
const listPublishedCourses = createServerFn({
  method: "GET"
}).handler(listPublishedCourses_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("courses").select("id,title,slug,description,thumbnail_url,category,level,price_inr,duration_hours,rating,students_count").eq("is_published", true).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    courses: data ?? []
  };
});
const getCourseBySlug_createServerFn_handler = createServerRpc({
  id: "6d307843915e1de7cab61ff6aced7e88ee60114e7e061d0a60d8864ee671eee3",
  name: "getCourseBySlug",
  filename: "src/lib/courses.functions.ts"
}, (opts) => getCourseBySlug.__executeServer(opts));
const getCourseBySlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(getCourseBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: course,
    error
  } = await supabaseAdmin.from("courses").select("*").eq("slug", data.slug).eq("is_published", true).maybeSingle();
  if (error) throw new Error(error.message);
  if (!course) throw new Error("NOT_FOUND");
  return {
    course
  };
});
const listPreviewLecturesBySlug_createServerFn_handler = createServerRpc({
  id: "9e8d7fdc0d0dd4c88f0c858c7628a22055145fc42dc1f94716a27a24685b7bc9",
  name: "listPreviewLecturesBySlug",
  filename: "src/lib/courses.functions.ts"
}, (opts) => listPreviewLecturesBySlug.__executeServer(opts));
const listPreviewLecturesBySlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(listPreviewLecturesBySlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: course
  } = await supabaseAdmin.from("courses").select("id").eq("slug", data.slug).eq("is_published", true).maybeSingle();
  if (!course) return {
    lectures: []
  };
  const {
    data: batches
  } = await supabaseAdmin.from("batches").select("id").eq("course_id", course.id);
  const batchIds = (batches ?? []).map((b) => b.id);
  if (batchIds.length === 0) return {
    lectures: []
  };
  const {
    data: lectures
  } = await supabaseAdmin.from("lectures").select("id,title,description,kind,video_url,duration_min,order_index,is_preview").in("batch_id", batchIds).eq("is_preview", true).order("order_index", {
    ascending: true
  });
  return {
    lectures: lectures ?? []
  };
});
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
async function assertAdmin(ctx) {
  const {
    data,
    error
  } = await ctx.supabase.from("user_roles").select("role").eq("user_id", ctx.userId).in("role", ["admin", "instructor"]);
  if (error) throw new Error(error.message);
  if (!data || data.length === 0) throw new Error("Forbidden: admin/instructor role required");
}
const adminListCourses_createServerFn_handler = createServerRpc({
  id: "b18ba41786239877bbd0f40f382d0bcd8a2eb0abb02799ddfa0158944f032469",
  name: "adminListCourses",
  filename: "src/lib/courses.functions.ts"
}, (opts) => adminListCourses.__executeServer(opts));
const adminListCourses = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(adminListCourses_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("courses").select("id,title,slug,category,level,price_inr,is_published,students_count,created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    courses: data ?? []
  };
});
const upsertCourse_createServerFn_handler = createServerRpc({
  id: "0070ad9c0bb7c09cf177e7ba20703bd920735dbacb21838fcdc70d416ab2bb4b",
  name: "upsertCourse",
  filename: "src/lib/courses.functions.ts"
}, (opts) => upsertCourse.__executeServer(opts));
const upsertCourse = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => CourseInput.parse(d)).handler(upsertCourse_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const slug = (data.slug && data.slug.length > 0 ? data.slug : slugify(data.title)) || slugify(data.title);
  const payload = {
    title: data.title,
    slug,
    description: data.description ?? "",
    thumbnail_url: data.thumbnail_url ?? null,
    category: data.category ?? "",
    level: data.level ?? "beginner",
    price_inr: data.price_inr,
    duration_hours: data.duration_hours ?? 0,
    is_published: data.is_published,
    instructor_id: context.userId
  };
  if (data.id) {
    const {
      data: updated,
      error
    } = await supabaseAdmin.from("courses").update(payload).eq("id", data.id).select().single();
    if (error) throw new Error(error.message);
    return {
      course: updated
    };
  } else {
    const {
      data: created,
      error
    } = await supabaseAdmin.from("courses").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return {
      course: created
    };
  }
});
const deleteCourse_createServerFn_handler = createServerRpc({
  id: "398a5874789098e47ced66f8e6b8370109c861aefb975c8725f6a6aa92e62ea2",
  name: "deleteCourse",
  filename: "src/lib/courses.functions.ts"
}, (opts) => deleteCourse.__executeServer(opts));
const deleteCourse = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteCourse_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    error
  } = await supabaseAdmin.from("courses").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminListCourses_createServerFn_handler,
  deleteCourse_createServerFn_handler,
  getCourseBySlug_createServerFn_handler,
  listPreviewLecturesBySlug_createServerFn_handler,
  listPublishedCourses_createServerFn_handler,
  upsertCourse_createServerFn_handler
};
