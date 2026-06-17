import require$$0 from "stream";
var src = {};
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  Object.defineProperty(src, "__esModule", { value: true });
  src.MissingProjectIdError = src.replaceProjectIdToken = void 0;
  const stream_1 = require$$0;
  function replaceProjectIdToken(value, projectId) {
    if (Array.isArray(value)) {
      value = value.map((v) => replaceProjectIdToken(v, projectId));
    }
    if (value !== null && typeof value === "object" && !(value instanceof Buffer) && !(value instanceof stream_1.Stream) && typeof value.hasOwnProperty === "function") {
      for (const opt in value) {
        if (value.hasOwnProperty(opt)) {
          value[opt] = replaceProjectIdToken(value[opt], projectId);
        }
      }
    }
    if (typeof value === "string" && value.indexOf("{{projectId}}") > -1) {
      if (!projectId || projectId === "{{projectId}}") {
        throw new MissingProjectIdError();
      }
      value = value.replace(/{{projectId}}/g, projectId);
    }
    return value;
  }
  src.replaceProjectIdToken = replaceProjectIdToken;
  class MissingProjectIdError extends Error {
    constructor() {
      super(...arguments);
      this.message = `Sorry, we cannot connect to Cloud Services without a project
    ID. You may specify one with an environment variable named
    "GOOGLE_CLOUD_PROJECT".`.replace(/ +/g, " ");
    }
  }
  src.MissingProjectIdError = MissingProjectIdError;
  return src;
}
export {
  requireSrc as r
};
