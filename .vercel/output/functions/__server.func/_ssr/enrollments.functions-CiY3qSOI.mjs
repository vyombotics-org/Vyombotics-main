import { c as createSsrRpc } from "./router-C729jqE2.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import { o as objectType, b as booleanType, e as enumType, s as stringType, c as coerce } from "../_libs/zod.mjs";
const listBatchEnrollments = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("a96e4ac947723fa994d87aef6f22b8cf26920c60a8ef8a03271d042e450817fb"));
const adminMarkEnrollmentPaid = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  amount_paid: coerce.number().min(0).optional()
}).parse(d)).handler(createSsrRpc("ddb9427292d41953a909a1d25e927f73d5d165cb5f0204134f6a4c4be4d192eb"));
const adminRevokeEnrollment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("11cfe162140552ca5eafaba5bee6ecef2639a4c1e2f057d45d54cf4d70657c6e"));
const adminIssueCertificate = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  user_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("e9f1bdf631c0f7f76effb5441b8c28dd23ecd00f80666ef42128ef965993b8a1"));
const adminListContactMessages = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("2f071aac21c52b928681da22dd585319386d85ff0cf806e556d190f772628743"));
const adminUpdateContactMessage = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid(),
  status: enumType(["new", "read", "replied"]).optional(),
  delete: booleanType().optional()
}).parse(d)).handler(createSsrRpc("9694c97605ae7b7549ec1af141876aacc4d904973f08025f8cf2d9d5c53c1fb7"));
export {
  adminListContactMessages as a,
  adminUpdateContactMessage as b,
  adminMarkEnrollmentPaid as c,
  adminRevokeEnrollment as d,
  adminIssueCertificate as e,
  listBatchEnrollments as l
};
