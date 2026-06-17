import { c as createServerRpc } from "./createServerRpc-ZYejvlcI.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { o as objectType, s as stringType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
const listBatchesByCourseSlug_createServerFn_handler = createServerRpc({
  id: "a54a3367e3924220aa985ec2a6dfdd32a82bb922a2142e56424070ad1c86ede6",
  name: "listBatchesByCourseSlug",
  filename: "src/lib/learn.functions.ts"
}, (opts) => listBatchesByCourseSlug.__executeServer(opts));
const listBatchesByCourseSlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(listBatchesByCourseSlug_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: course
  } = await supabaseAdmin.from("courses").select("id").eq("slug", data.slug).eq("is_published", true).maybeSingle();
  if (!course) return {
    batches: []
  };
  const {
    data: batches
  } = await supabaseAdmin.from("batches").select("id,name,start_date,end_date,validity_days,price_inr,seats,is_active").eq("course_id", course.id).eq("is_active", true).order("start_date", {
    ascending: true
  });
  return {
    batches: batches ?? []
  };
});
const enrollInBatch_createServerFn_handler = createServerRpc({
  id: "0ad520b311bbe351974deb8a9dac4cdc08afd9c8b5bb245bd991732d777c359e",
  name: "enrollInBatch",
  filename: "src/lib/learn.functions.ts"
}, (opts) => enrollInBatch.__executeServer(opts));
const enrollInBatch = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(enrollInBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch,
    error: bErr
  } = await supabaseAdmin.from("batches").select("id, price_inr, validity_days").eq("id", data.batch_id).maybeSingle();
  if (bErr || !batch) throw new Error("Batch not found");
  const {
    data: existing
  } = await supabaseAdmin.from("enrollments").select("id, payment_status").eq("user_id", context.userId).eq("batch_id", batch.id).maybeSingle();
  if (existing) return {
    enrollment_id: existing.id,
    payment_status: existing.payment_status
  };
  const expires = /* @__PURE__ */ new Date();
  expires.setDate(expires.getDate() + (batch.validity_days || 45));
  const {
    data: created,
    error
  } = await supabaseAdmin.from("enrollments").insert({
    user_id: context.userId,
    batch_id: batch.id,
    payment_status: "pending",
    amount_paid: 0,
    expires_at: expires.toISOString()
  }).select().single();
  if (error) throw new Error(error.message);
  return {
    enrollment_id: created.id,
    payment_status: created.payment_status
  };
});
const markEnrollmentPaidDemo_createServerFn_handler = createServerRpc({
  id: "b0a71da2237f87df73bbe5d294d19ba3cf7ce4ef6c4e800f49018418b6a958fc",
  name: "markEnrollmentPaidDemo",
  filename: "src/lib/learn.functions.ts"
}, (opts) => markEnrollmentPaidDemo.__executeServer(opts));
const markEnrollmentPaidDemo = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid()
}).parse(d)).handler(markEnrollmentPaidDemo_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: en
  } = await supabaseAdmin.from("enrollments").select("id, user_id, batch_id, batches(price_inr, validity_days)").eq("id", data.enrollment_id).maybeSingle();
  if (!en || en.user_id !== context.userId) throw new Error("Enrollment not found");
  const validity = en.batches?.validity_days ?? 45;
  const expires = /* @__PURE__ */ new Date();
  expires.setDate(expires.getDate() + validity);
  const {
    error
  } = await supabaseAdmin.from("enrollments").update({
    payment_status: "success",
    amount_paid: en.batches?.price_inr ?? 0,
    purchased_at: (/* @__PURE__ */ new Date()).toISOString(),
    expires_at: expires.toISOString()
  }).eq("id", en.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const myActiveBatches_createServerFn_handler = createServerRpc({
  id: "8f95b607b93f7040aa6d1610d06e2ebd8998b35b4bcb32577b8536b448448ec2",
  name: "myActiveBatches",
  filename: "src/lib/learn.functions.ts"
}, (opts) => myActiveBatches.__executeServer(opts));
const myActiveBatches = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(myActiveBatches_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("enrollments").select("id, expires_at, payment_status, batches(id, name, course_id, courses(title, slug, thumbnail_url))").eq("user_id", context.userId).order("purchased_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    enrollments: data ?? []
  };
});
const getLearnerBatch_createServerFn_handler = createServerRpc({
  id: "a80a22ce981b615161c5d1b5c9072212d04b51e51a06b24323d5723d4de33e8e",
  name: "getLearnerBatch",
  filename: "src/lib/learn.functions.ts"
}, (opts) => getLearnerBatch.__executeServer(opts));
const getLearnerBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(getLearnerBatch_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, course_id, start_date, end_date, courses(title, slug, instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const [{
    data: roleRow
  }, {
    data: enrollment
  }] = await Promise.all([supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).in("role", ["admin"]).maybeSingle(), supabaseAdmin.from("enrollments").select("id, payment_status, expires_at").eq("user_id", context.userId).eq("batch_id", data.batch_id).maybeSingle()]);
  const isAdmin = !!roleRow;
  const isOwner = batch.courses?.instructor_id === context.userId;
  const isMember = enrollment?.payment_status === "success" && (!enrollment.expires_at || new Date(enrollment.expires_at) > /* @__PURE__ */ new Date());
  if (!isAdmin && !isOwner && !isMember) throw new Error("Access denied — enrollment required");
  const {
    data: lectures
  } = await supabaseAdmin.from("lectures").select("id, title, description, kind, scheduled_at, duration_min, meeting_url, video_url, order_index, is_preview").eq("batch_id", data.batch_id).order("order_index", {
    ascending: true
  });
  const lectureIds = (lectures ?? []).map((l) => l.id);
  const [{
    data: progress
  }, {
    data: attendance
  }] = await Promise.all([lectureIds.length ? supabaseAdmin.from("lecture_progress").select("lecture_id, watched_seconds, completed").eq("user_id", context.userId).in("lecture_id", lectureIds) : Promise.resolve({
    data: []
  }), lectureIds.length ? supabaseAdmin.from("attendance").select("lecture_id, status, watched_seconds").eq("user_id", context.userId).in("lecture_id", lectureIds) : Promise.resolve({
    data: []
  })]);
  return {
    batch,
    lectures: lectures ?? [],
    progress: progress ?? [],
    attendance: attendance ?? [],
    enrollment,
    isAdmin,
    isOwner,
    isMember
  };
});
const recordWatchProgress_createServerFn_handler = createServerRpc({
  id: "ece3daa014603bdd1de4e738d738b09407c50bfa5f9866c0079f0e04e95ac9c0",
  name: "recordWatchProgress",
  filename: "src/lib/learn.functions.ts"
}, (opts) => recordWatchProgress.__executeServer(opts));
const recordWatchProgress = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid(),
  watched_seconds: coerce.number().int().min(0).max(86400)
}).parse(d)).handler(recordWatchProgress_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lec
  } = await supabaseAdmin.from("lectures").select("id, batch_id, duration_min, kind").eq("id", data.lecture_id).maybeSingle();
  if (!lec) throw new Error("Lecture not found");
  const {
    data: existing
  } = await supabaseAdmin.from("lecture_progress").select("id, watched_seconds").eq("user_id", context.userId).eq("lecture_id", lec.id).maybeSingle();
  const watched = Math.max(existing?.watched_seconds ?? 0, data.watched_seconds);
  const totalSec = Math.max(1, (lec.duration_min || 0) * 60);
  const ratio = watched / totalSec;
  const completed = ratio >= 0.95;
  if (existing) {
    await supabaseAdmin.from("lecture_progress").update({
      watched_seconds: watched,
      completed,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("lecture_progress").insert({
      user_id: context.userId,
      lecture_id: lec.id,
      watched_seconds: watched,
      completed
    });
  }
  let status = null;
  if (ratio >= 0.7) status = "present";
  else if (ratio >= 0.2) status = "partial";
  if (status) {
    const {
      data: a
    } = await supabaseAdmin.from("attendance").select("id").eq("user_id", context.userId).eq("lecture_id", lec.id).maybeSingle();
    if (a) {
      await supabaseAdmin.from("attendance").update({
        status,
        watched_seconds: watched,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", a.id);
    } else {
      await supabaseAdmin.from("attendance").insert({
        user_id: context.userId,
        lecture_id: lec.id,
        batch_id: lec.batch_id,
        status,
        watched_seconds: watched
      });
    }
  }
  return {
    ok: true,
    watched_seconds: watched,
    completed
  };
});
const markLiveJoin_createServerFn_handler = createServerRpc({
  id: "14c15b0444b48cff6a0c1b945395834e73e34651254202c3ccdfefb1e2cbed94",
  name: "markLiveJoin",
  filename: "src/lib/learn.functions.ts"
}, (opts) => markLiveJoin.__executeServer(opts));
const markLiveJoin = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid()
}).parse(d)).handler(markLiveJoin_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: lec
  } = await supabaseAdmin.from("lectures").select("id, batch_id").eq("id", data.lecture_id).maybeSingle();
  if (!lec) throw new Error("Lecture not found");
  const {
    data: a
  } = await supabaseAdmin.from("attendance").select("id").eq("user_id", context.userId).eq("lecture_id", lec.id).maybeSingle();
  if (!a) {
    await supabaseAdmin.from("attendance").insert({
      user_id: context.userId,
      lecture_id: lec.id,
      batch_id: lec.batch_id,
      status: "present",
      joined_at: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return {
    ok: true
  };
});
const getBatchAttendance_createServerFn_handler = createServerRpc({
  id: "3321c3244b1bdc217cd7b070d638a7b72eb16755a0ae40ae5e84121d332ae9fe",
  name: "getBatchAttendance",
  filename: "src/lib/learn.functions.ts"
}, (opts) => getBatchAttendance.__executeServer(opts));
const getBatchAttendance = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(getBatchAttendance_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-CwXH_WTR.mjs");
  const {
    data: batch
  } = await supabaseAdmin.from("batches").select("id, name, course_id, courses(title, slug, instructor_id)").eq("id", data.batch_id).maybeSingle();
  if (!batch) throw new Error("Batch not found");
  const {
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isOwner = batch.courses?.instructor_id === context.userId;
  if (!roleRow && !isOwner) throw new Error("Forbidden");
  const [{
    data: lectures
  }, {
    data: enrollments
  }, {
    data: attendance
  }] = await Promise.all([supabaseAdmin.from("lectures").select("id, title, order_index").eq("batch_id", data.batch_id).order("order_index"), supabaseAdmin.from("enrollments").select("user_id, payment_status, profiles:user_id(full_name, avatar_url)").eq("batch_id", data.batch_id).eq("payment_status", "success"), supabaseAdmin.from("attendance").select("user_id, lecture_id, status").eq("batch_id", data.batch_id)]);
  return {
    batch,
    lectures: lectures ?? [],
    students: enrollments ?? [],
    attendance: attendance ?? []
  };
});
const setAttendance_createServerFn_handler = createServerRpc({
  id: "badab0539d5092897ea7826864d93ec5a57546696050d8fcc317dc8585c2ddac",
  name: "setAttendance",
  filename: "src/lib/learn.functions.ts"
}, (opts) => setAttendance.__executeServer(opts));
const setAttendance = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  lecture_id: stringType().uuid(),
  user_id: stringType().uuid(),
  status: enumType(["present", "absent", "partial", "clear"])
}).parse(d)).handler(setAttendance_createServerFn_handler, async ({
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
    data: roleRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const isOwner = batch.courses?.instructor_id === context.userId;
  if (!roleRow && !isOwner) throw new Error("Forbidden");
  if (data.status === "clear") {
    await supabaseAdmin.from("attendance").delete().eq("batch_id", data.batch_id).eq("lecture_id", data.lecture_id).eq("user_id", data.user_id);
    return {
      ok: true
    };
  }
  const {
    data: existing
  } = await supabaseAdmin.from("attendance").select("id").eq("lecture_id", data.lecture_id).eq("user_id", data.user_id).maybeSingle();
  if (existing) {
    await supabaseAdmin.from("attendance").update({
      status: data.status,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("attendance").insert({
      user_id: data.user_id,
      lecture_id: data.lecture_id,
      batch_id: data.batch_id,
      status: data.status
    });
  }
  return {
    ok: true
  };
});
export {
  enrollInBatch_createServerFn_handler,
  getBatchAttendance_createServerFn_handler,
  getLearnerBatch_createServerFn_handler,
  listBatchesByCourseSlug_createServerFn_handler,
  markEnrollmentPaidDemo_createServerFn_handler,
  markLiveJoin_createServerFn_handler,
  myActiveBatches_createServerFn_handler,
  recordWatchProgress_createServerFn_handler,
  setAttendance_createServerFn_handler
};
