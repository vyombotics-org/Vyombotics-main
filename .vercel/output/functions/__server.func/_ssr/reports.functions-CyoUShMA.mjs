import { c as createSsrRpc } from "./router-C729jqE2.mjs";
import { c as createServerFn } from "./server-DNxV6PqS.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-55884gS2.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const getStudentReport = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  user_id: stringType().uuid().optional()
}).parse(d)).handler(createSsrRpc("057a1226280c368e5edfce5a6ba73455a52d93e5ab7fb212b6f5d39899cefff9"));
const listBatchStudentsForReports = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("172e5bb5ae5b85ff822b81675d65589c2e083e85e260c8188aacb7842c5fd596"));
export {
  getStudentReport as g,
  listBatchStudentsForReports as l
};
