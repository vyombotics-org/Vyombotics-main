import { c as createSsrRpc } from "./router-8ViFXMOq.mjs";
import { c as createServerFn } from "./server-CtiGMGMU.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-rm7rsgsq.mjs";
import { o as objectType, s as stringType, b as booleanType, c as coerce } from "../_libs/zod.mjs";
const listBatchAssignments = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("45c41b605e6d9d78b4ee7b514924911cee786309d224455e4f6082bb73733702"));
const upsertAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid().optional(),
  batch_id: stringType().uuid(),
  title: stringType().min(1).max(200),
  description: stringType().max(5e3).optional().nullable(),
  max_marks: coerce.number().int().min(1).max(1e3).default(100),
  due_at: stringType().optional().nullable(),
  is_published: booleanType().default(false)
}).parse(d)).handler(createSsrRpc("2865f56d3c9359b82ce31d05be81bdc691620f6e7bd36e3397c42adf492e3603"));
const deleteAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("f5f19ebf6eb94457b65564c4aa811a089d7678e9c58da8cee33b06cd553ee9ca"));
const submitAssignment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  assignment_id: stringType().uuid(),
  text_content: stringType().max(2e4).optional().nullable(),
  file_url: stringType().url().max(1e3).optional().nullable()
}).parse(d)).handler(createSsrRpc("8bb4f745a44cf95ff3d3a23421f6fb549a54f8f33c672b621ac019c179c3db0f"));
const gradeSubmission = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  submission_id: stringType().uuid(),
  marks_awarded: coerce.number().int().min(0).max(1e3),
  feedback: stringType().max(5e3).optional().nullable()
}).parse(d)).handler(createSsrRpc("109acf3f99d4345a1da0373f7a92f581bd311c923b98fb614b17c9c25c4b92c5"));
export {
  deleteAssignment as d,
  gradeSubmission as g,
  listBatchAssignments as l,
  submitAssignment as s,
  upsertAssignment as u
};
