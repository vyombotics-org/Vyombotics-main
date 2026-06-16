import { c as createSsrRpc } from "./router-8ViFXMOq.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import { o as objectType, c as coerce, s as stringType, e as enumType } from "../_libs/zod.mjs";
const listBatchesByCourseSlug = createServerFn({
  method: "GET"
}).inputValidator((d) => objectType({
  slug: stringType().min(1).max(120)
}).parse(d)).handler(createSsrRpc("a54a3367e3924220aa985ec2a6dfdd32a82bb922a2142e56424070ad1c86ede6"));
createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("0ad520b311bbe351974deb8a9dac4cdc08afd9c8b5bb245bd991732d777c359e"));
createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("b0a71da2237f87df73bbe5d294d19ba3cf7ce4ef6c4e800f49018418b6a958fc"));
const myActiveBatches = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("8f95b607b93f7040aa6d1610d06e2ebd8998b35b4bcb32577b8536b448448ec2"));
const getLearnerBatch = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("a80a22ce981b615161c5d1b5c9072212d04b51e51a06b24323d5723d4de33e8e"));
const recordWatchProgress = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid(),
  watched_seconds: coerce.number().int().min(0).max(86400)
}).parse(d)).handler(createSsrRpc("ece3daa014603bdd1de4e738d738b09407c50bfa5f9866c0079f0e04e95ac9c0"));
const markLiveJoin = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  lecture_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("14c15b0444b48cff6a0c1b945395834e73e34651254202c3ccdfefb1e2cbed94"));
const getBatchAttendance = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("3321c3244b1bdc217cd7b070d638a7b72eb16755a0ae40ae5e84121d332ae9fe"));
const setAttendance = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  lecture_id: stringType().uuid(),
  user_id: stringType().uuid(),
  status: enumType(["present", "absent", "partial", "clear"])
}).parse(d)).handler(createSsrRpc("badab0539d5092897ea7826864d93ec5a57546696050d8fcc317dc8585c2ddac"));
export {
  markLiveJoin as a,
  getBatchAttendance as b,
  getLearnerBatch as g,
  listBatchesByCourseSlug as l,
  myActiveBatches as m,
  recordWatchProgress as r,
  setAttendance as s
};
