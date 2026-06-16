import { b as requireSrc$2 } from "./google-auth-library.mjs";
import require$$0$2 from "crypto";
import { r as requireSrc$1 } from "./google-cloud__projectify.mjs";
import { r as requireCommonjs } from "./html-entities.mjs";
import { a as requireRetryRequest } from "./retry-request.mjs";
import require$$0$1 from "stream";
import { r as requireSrc$3 } from "./teeny-request.mjs";
import require$$5 from "path";
import require$$1 from "querystring";
import Url from "url";
import { r as requireDuplexify } from "./duplexify.mjs";
import { r as requireSrc$4 } from "./google-cloud__promisify.mjs";
import require$$0$3 from "events";
import { r as requireSrc$6 } from "./google-cloud__paginator.mjs";
import { c as commonjsGlobal } from "./react.mjs";
import require$$0$4 from "fs";
import { r as requireMime } from "./mime.mjs";
import { r as requirePLimit } from "./p-limit.mjs";
import require$$0$6 from "util";
import { r as requireLib } from "./async-retry.mjs";
import { r as require$$0$5 } from "./abort-controller.mjs";
import { b as requireSrc$5 } from "./gaxios.mjs";
import zlib from "zlib";
import { r as requireFxp } from "./fast-xml-parser.mjs";
var src = {};
var nodejsCommon = {};
var service = {};
var util$1 = {};
var util = {};
var packageJsonHelper = {};
const name = "@google-cloud/storage";
const description = "Cloud Storage Client Library for Node.js";
const version = "7.21.0";
const license = "Apache-2.0";
const author = "Google Inc.";
const engines = { "node": ">=14" };
const repository = { "type": "git", "directory": "handwritten/storage", "url": "https://github.com/googleapis/google-cloud-node.git" };
const main = "./build/cjs/src/index.js";
const types = "./build/cjs/src/index.d.ts";
const type = "module";
const exports$1 = { ".": { "import": { "types": "./build/esm/src/index.d.ts", "default": "./build/esm/src/index.js" }, "require": { "types": "./build/cjs/src/index.d.ts", "default": "./build/cjs/src/index.js" } } };
const files = ["build/cjs/src", "build/cjs/package.json", "!build/cjs/src/**/*.map", "build/esm/src", "!build/esm/src/**/*.map"];
const keywords = ["google apis client", "google api client", "google apis", "google api", "google", "google cloud platform", "google cloud", "cloud", "google storage", "storage"];
const scripts = { "all-test": "npm test && npm run system-test && npm run samples-test", "benchwrapper": "node bin/benchwrapper.js", "check": "gts check", "clean": "rm -rf build/", "compile:cjs": "tsc -p ./tsconfig.cjs.json", "compile:esm": "tsc -p .", "compile": "npm run compile:cjs && npm run compile:esm", "conformance-test": "mocha --parallel build/cjs/conformance-test/ --require build/cjs/conformance-test/globalHooks.js", "docs": "jsdoc -c .jsdoc.json", "fix": "gts fix", "lint": "gts check", "postcompile": "cp ./src/package-json-helper.cjs ./build/cjs/src && cp ./src/package-json-helper.cjs ./build/esm/src", "postcompile:cjs": "babel --plugins gapic-tools/build/src/replaceImportMetaUrl,gapic-tools/build/src/toggleESMFlagVariable build/cjs/src/util.js -o build/cjs/src/util.js && cp internal-tooling/helpers/package.cjs.json build/cjs/package.json", "precompile": "rm -rf build/", "preconformance-test": "npm run compile:cjs -- --sourceMap", "predocs": "npm run compile:cjs -- --sourceMap", "prelint": "cd samples; npm link ../; npm install", "prepare": "npm run compile", "presystem-test:esm": "npm run compile:esm", "presystem-test": "npm run compile -- --sourceMap", "pretest": "npm run compile -- --sourceMap", "samples-test": "npm link && cd samples/ && npm link ../ && npm test && cd ../", "system-test:esm": "mocha build/esm/system-test --timeout 600000 --exit", "system-test": "mocha build/cjs/system-test --timeout 600000 --exit", "test": "cross-env NODE_OPTIONS='--no-deprecation' c8 mocha build/cjs/test" };
const dependencies = { "@google-cloud/paginator": "^5.0.0", "@google-cloud/projectify": "^4.0.0", "@google-cloud/promisify": "<4.1.0", "abort-controller": "^3.0.0", "async-retry": "^1.3.3", "duplexify": "^4.1.3", "fast-xml-parser": "^5.3.4", "gaxios": "^6.0.2", "google-auth-library": "^9.6.3", "html-entities": "^2.5.2", "mime": "^3.0.0", "p-limit": "^3.0.1", "retry-request": "^7.0.0", "teeny-request": "^9.0.0" };
const devDependencies = { "@babel/cli": "^7.22.10", "@babel/core": "^7.22.11", "@google-cloud/pubsub": "^4.0.0", "@grpc/grpc-js": "^1.0.3", "@grpc/proto-loader": "^0.8.0", "@types/async-retry": "^1.4.3", "@types/duplexify": "^3.6.4", "@types/mime": "^3.0.0", "@types/mocha": "^9.1.1", "@types/mockery": "^1.4.29", "@types/node": "^24.0.0", "@types/node-fetch": "^2.1.3", "@types/proxyquire": "^1.3.28", "@types/request": "^2.48.4", "@types/sinon": "^17.0.0", "@types/tmp": "0.2.6", "@types/yargs": "^17.0.10", "c8": "^9.0.0", "form-data": "^4.0.4", "gapic-tools": "^0.4.0", "gts": "^5.0.0", "jsdoc": "^4.0.4", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "mocha": "^9.2.2", "mockery": "^2.1.0", "nock": "~13.5.0", "node-fetch": "^2.6.7", "pack-n-play": "^2.0.0", "proxyquire": "^2.1.3", "sinon": "^18.0.0", "nise": "6.0.0", "path-to-regexp": "6.3.0", "tmp": "^0.2.0", "typescript": "^5.1.6", "yargs": "^17.3.1", "cross-env": "^7.0.3" };
const homepage = "https://github.com/googleapis/google-cloud-node/tree/main/handwritten/storage";
const require$$0 = {
  name,
  description,
  version,
  license,
  author,
  engines,
  repository,
  main,
  types,
  type,
  exports: exports$1,
  files,
  keywords,
  scripts,
  dependencies,
  devDependencies,
  homepage
};
var hasRequiredPackageJsonHelper;
function requirePackageJsonHelper() {
  if (hasRequiredPackageJsonHelper) return packageJsonHelper;
  hasRequiredPackageJsonHelper = 1;
  function getPackageJSON() {
    return require$$0;
  }
  packageJsonHelper.getPackageJSON = getPackageJSON;
  return packageJsonHelper;
}
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util;
  hasRequiredUtil$1 = 1;
  var __createBinding = util && util.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
        enumerable: true,
        get: function() {
          return m[k];
        }
      };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = util && util.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = util && util.__importStar || /* @__PURE__ */ (function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
  Object.defineProperty(util, "__esModule", {
    value: true
  });
  util.PassThroughShim = void 0;
  util.normalize = normalize;
  util.objectEntries = objectEntries;
  util.fixedEncodeURIComponent = fixedEncodeURIComponent;
  util.encodeURI = encodeURI;
  util.qsStringify = qsStringify;
  util.objectKeyToLowercase = objectKeyToLowercase;
  util.unicodeJSONStringify = unicodeJSONStringify;
  util.convertObjKeysToSnakeCase = convertObjKeysToSnakeCase;
  util.formatAsUTCISO = formatAsUTCISO;
  util.getRuntimeTrackingString = getRuntimeTrackingString;
  util.getUserAgentString = getUserAgentString;
  util.getDirName = getDirName;
  util.getModuleFormat = getModuleFormat;
  util.validateContexts = validateContexts;
  util.handleContextValidation = handleContextValidation;
  __importStar(require$$5);
  const querystring = __importStar(require$$1);
  const stream_1 = require$$0$1;
  const url = __importStar(Url);
  const package_json_helper_cjs_1 = requirePackageJsonHelper();
  url.fileURLToPath;
  const isEsm = false;
  function normalize(optionsOrCallback, cb) {
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
    return {
      options,
      callback
    };
  }
  function objectEntries(obj) {
    return Object.keys(obj).map((key) => [key, obj[key]]);
  }
  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
  }
  function encodeURI(uri, encodeSlash) {
    return uri.split("/").map(fixedEncodeURIComponent).join(encodeSlash ? "%2F" : "/");
  }
  function qsStringify(qs) {
    return querystring.stringify(qs, "&", "=", {
      encodeURIComponent: (component) => encodeURI(component, true)
    });
  }
  function objectKeyToLowercase(object) {
    const newObj = {};
    for (let key of Object.keys(object)) {
      const value = object[key];
      key = key.toLowerCase();
      newObj[key] = value;
    }
    return newObj;
  }
  function unicodeJSONStringify(obj) {
    return JSON.stringify(obj).replace(/[\u0080-\uFFFF]/g, (char) => "\\u" + ("0000" + char.charCodeAt(0).toString(16)).slice(-4));
  }
  function convertObjKeysToSnakeCase(obj) {
    if (obj instanceof Date || obj instanceof RegExp) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(convertObjKeysToSnakeCase);
    }
    if (obj instanceof Object) {
      return Object.keys(obj).reduce((acc, cur) => {
        const s = cur[0].toLocaleLowerCase() + cur.slice(1).replace(/([A-Z]+)/g, (match, p1) => {
          return `_${p1.toLowerCase()}`;
        });
        acc[s] = convertObjKeysToSnakeCase(obj[cur]);
        return acc;
      }, Object());
    }
    return obj;
  }
  function formatAsUTCISO(dateTimeToFormat, includeTime = false, dateDelimiter = "", timeDelimiter = "") {
    const year = dateTimeToFormat.getUTCFullYear();
    const month = dateTimeToFormat.getUTCMonth() + 1;
    const day = dateTimeToFormat.getUTCDate();
    const hour = dateTimeToFormat.getUTCHours();
    const minute = dateTimeToFormat.getUTCMinutes();
    const second = dateTimeToFormat.getUTCSeconds();
    let resultString = `${year.toString().padStart(4, "0")}${dateDelimiter}${month.toString().padStart(2, "0")}${dateDelimiter}${day.toString().padStart(2, "0")}`;
    if (includeTime) {
      resultString = `${resultString}T${hour.toString().padStart(2, "0")}${timeDelimiter}${minute.toString().padStart(2, "0")}${timeDelimiter}${second.toString().padStart(2, "0")}Z`;
    }
    return resultString;
  }
  function getRuntimeTrackingString() {
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      globalThis.Deno && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      globalThis.Deno.version && // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      globalThis.Deno.version.deno
    ) {
      return `gl-deno/${globalThis.Deno.version.deno}`;
    } else {
      return `gl-node/${process.versions.node}`;
    }
  }
  function getUserAgentString() {
    const pkg = (0, package_json_helper_cjs_1.getPackageJSON)();
    const hyphenatedPackageName = pkg.name.replace("@google-cloud", "gcloud-node").replace("/", "-");
    return hyphenatedPackageName + "/" + pkg.version;
  }
  function getDirName() {
    let dirToUse = "";
    try {
      dirToUse = __dirname;
    } catch (e) {
      dirToUse = __dirname;
    }
    return dirToUse;
  }
  function getModuleFormat() {
    return isEsm ? "ESM" : "CJS";
  }
  class PassThroughShim extends stream_1.PassThrough {
    constructor() {
      super(...arguments);
      this.shouldEmitReading = true;
      this.shouldEmitWriting = true;
    }
    _read(size) {
      if (this.shouldEmitReading) {
        this.emit("reading");
        this.shouldEmitReading = false;
      }
      super._read(size);
    }
    _write(chunk, encoding, callback) {
      if (this.shouldEmitWriting) {
        this.emit("writing");
        this.shouldEmitWriting = false;
      }
      process.nextTick(() => {
        super._write(chunk, encoding, callback);
      });
    }
    _final(callback) {
      if (this.shouldEmitReading) {
        this.emit("reading");
        this.shouldEmitReading = false;
      }
      if (this.shouldEmitWriting) {
        this.emit("writing");
        this.shouldEmitWriting = false;
      }
      callback(null);
    }
  }
  util.PassThroughShim = PassThroughShim;
  function validateContexts(contexts) {
    const custom = contexts === null || contexts === void 0 ? void 0 : contexts.custom;
    if (!custom) return;
    for (const [key, context] of Object.entries(custom)) {
      if (key.includes('"')) {
        throw new Error(`Invalid context key "${key}": Forbidden character (") detected.`);
      }
      if ((context === null || context === void 0 ? void 0 : context.value) && context.value.includes('"')) {
        throw new Error(`Invalid context value for key "${key}": Forbidden character (") detected.`);
      }
    }
  }
  function handleContextValidation(contexts, callback) {
    try {
      validateContexts(contexts);
    } catch (err) {
      if (callback) {
        return callback(err);
      }
      return Promise.reject(err);
    }
  }
  return util;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util$1;
  hasRequiredUtil = 1;
  (function(exports) {
    var __createBinding = util$1 && util$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = util$1 && util$1.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = util$1 && util$1.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = util$1 && util$1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.util = exports.Util = exports.PartialFailureError = exports.ApiError = exports.GCCL_GCS_CMD_KEY = void 0;
    const projectify_1 = requireSrc$1();
    const htmlEntities = __importStar(/* @__PURE__ */ requireCommonjs());
    const google_auth_library_1 = requireSrc$2();
    const retry_request_1 = __importDefault(requireRetryRequest());
    const stream_1 = require$$0$1;
    const teeny_request_1 = requireSrc$3();
    const crypto = __importStar(require$$0$2);
    const service_js_1 = requireService();
    const util_js_1 = requireUtil$1();
    const duplexify_1 = __importDefault(requireDuplexify());
    const package_json_helper_cjs_1 = requirePackageJsonHelper();
    const packageJson = (0, package_json_helper_cjs_1.getPackageJSON)();
    exports.GCCL_GCS_CMD_KEY = /* @__PURE__ */ Symbol.for("GCCL_GCS_CMD");
    const requestDefaults = {
      timeout: 6e4,
      gzip: true,
      forever: true,
      pool: {
        maxSockets: Infinity
      }
    };
    const AUTO_RETRY_DEFAULT = true;
    const MAX_RETRY_DEFAULT = 3;
    class ApiError extends Error {
      constructor(errorBodyOrMessage) {
        super();
        if (typeof errorBodyOrMessage !== "object") {
          this.message = errorBodyOrMessage || "";
          return;
        }
        const errorBody = errorBodyOrMessage;
        this.code = errorBody.code;
        this.errors = errorBody.errors;
        this.response = errorBody.response;
        try {
          this.errors = JSON.parse(this.response.body).error.errors;
        } catch (e) {
          this.errors = errorBody.errors;
        }
        this.message = ApiError.createMultiErrorMessage(errorBody, this.errors);
        Error.captureStackTrace(this);
      }
      /**
       * Pieces together an error message by combining all unique error messages
       * returned from a single GoogleError
       *
       * @private
       *
       * @param {GoogleErrorBody} err The original error.
       * @param {GoogleInnerError[]} [errors] Inner errors, if any.
       * @returns {string}
       */
      static createMultiErrorMessage(err, errors) {
        const messages = /* @__PURE__ */ new Set();
        if (err.message) {
          messages.add(err.message);
        }
        if (errors && errors.length) {
          errors.forEach(({ message }) => messages.add(message));
        } else if (err.response && err.response.body) {
          messages.add(htmlEntities.decode(err.response.body.toString()));
        } else if (!err.message) {
          messages.add("A failure occurred during this request.");
        }
        let messageArr = Array.from(messages);
        if (messageArr.length > 1) {
          messageArr = messageArr.map((message, i) => `    ${i + 1}. ${message}`);
          messageArr.unshift("Multiple errors occurred during the request. Please see the `errors` array for complete details.\n");
          messageArr.push("\n");
        }
        return messageArr.join("\n");
      }
    }
    exports.ApiError = ApiError;
    class PartialFailureError extends Error {
      constructor(b) {
        super();
        const errorObject = b;
        this.errors = errorObject.errors;
        this.name = "PartialFailureError";
        this.response = errorObject.response;
        this.message = ApiError.createMultiErrorMessage(errorObject, this.errors);
      }
    }
    exports.PartialFailureError = PartialFailureError;
    class Util {
      constructor() {
        this.ApiError = ApiError;
        this.PartialFailureError = PartialFailureError;
      }
      /**
       * No op.
       *
       * @example
       * function doSomething(callback) {
       *   callback = callback || noop;
       * }
       */
      noop() {
      }
      /**
       * Uniformly process an API response.
       *
       * @param {*} err - Error value.
       * @param {*} resp - Response value.
       * @param {*} body - Body value.
       * @param {function} callback - The callback function.
       */
      handleResp(err, resp, body, callback) {
        callback = callback || util2.noop;
        const parsedResp = {
          err: err || null,
          ...resp && util2.parseHttpRespMessage(resp),
          ...body && util2.parseHttpRespBody(body)
        };
        if (!parsedResp.err && resp && typeof parsedResp.body === "object") {
          parsedResp.resp.body = parsedResp.body;
        }
        if (parsedResp.err && resp) {
          parsedResp.err.response = resp;
        }
        callback(parsedResp.err, parsedResp.body, parsedResp.resp);
      }
      /**
       * Sniff an incoming HTTP response message for errors.
       *
       * @param {object} httpRespMessage - An incoming HTTP response message from `request`.
       * @return {object} parsedHttpRespMessage - The parsed response.
       * @param {?error} parsedHttpRespMessage.err - An error detected.
       * @param {object} parsedHttpRespMessage.resp - The original response object.
       */
      parseHttpRespMessage(httpRespMessage) {
        const parsedHttpRespMessage = {
          resp: httpRespMessage
        };
        if (httpRespMessage.statusCode < 200 || httpRespMessage.statusCode > 299) {
          parsedHttpRespMessage.err = new ApiError({
            errors: new Array(),
            code: httpRespMessage.statusCode,
            message: httpRespMessage.statusMessage,
            response: httpRespMessage
          });
        }
        return parsedHttpRespMessage;
      }
      /**
       * Parse the response body from an HTTP request.
       *
       * @param {object} body - The response body.
       * @return {object} parsedHttpRespMessage - The parsed response.
       * @param {?error} parsedHttpRespMessage.err - An error detected.
       * @param {object} parsedHttpRespMessage.body - The original body value provided
       *     will try to be JSON.parse'd. If it's successful, the parsed value will
       * be returned here, otherwise the original value and an error will be returned.
       */
      parseHttpRespBody(body) {
        const parsedHttpRespBody = {
          body
        };
        if (typeof body === "string") {
          try {
            parsedHttpRespBody.body = JSON.parse(body);
          } catch (err) {
            parsedHttpRespBody.body = body;
          }
        }
        if (parsedHttpRespBody.body && parsedHttpRespBody.body.error) {
          parsedHttpRespBody.err = new ApiError(parsedHttpRespBody.body.error);
        }
        return parsedHttpRespBody;
      }
      /**
       * Take a Duplexify stream, fetch an authenticated connection header, and
       * create an outgoing writable stream.
       *
       * @param {Duplexify} dup - Duplexify stream.
       * @param {object} options - Configuration object.
       * @param {module:common/connection} options.connection - A connection instance used to get a token with and send the request through.
       * @param {object} options.metadata - Metadata to send at the head of the request.
       * @param {object} options.request - Request object, in the format of a standard Node.js http.request() object.
       * @param {string=} options.request.method - Default: "POST".
       * @param {string=} options.request.qs.uploadType - Default: "multipart".
       * @param {string=} options.streamContentType - Default: "application/octet-stream".
       * @param {function} onComplete - Callback, executed after the writable Request stream has completed.
       */
      makeWritableStream(dup, options, onComplete) {
        var _a;
        onComplete = onComplete || util2.noop;
        const writeStream = new ProgressStream();
        writeStream.on("progress", (evt) => dup.emit("progress", evt));
        dup.setWritable(writeStream);
        const defaultReqOpts = {
          method: "POST",
          qs: {
            uploadType: "multipart"
          },
          timeout: 0,
          maxRetries: 0
        };
        const metadata = options.metadata || {};
        const reqOpts = {
          ...defaultReqOpts,
          ...options.request,
          qs: {
            ...defaultReqOpts.qs,
            ...(_a = options.request) === null || _a === void 0 ? void 0 : _a.qs
          },
          multipart: [
            {
              "Content-Type": "application/json",
              body: JSON.stringify(metadata)
            },
            {
              "Content-Type": metadata.contentType || "application/octet-stream",
              body: writeStream
            }
          ]
        };
        options.makeAuthenticatedRequest(reqOpts, {
          onAuthenticated(err, authenticatedReqOpts) {
            if (err) {
              dup.destroy(err);
              return;
            }
            requestDefaults.headers = util2._getDefaultHeaders(reqOpts[exports.GCCL_GCS_CMD_KEY]);
            const request = teeny_request_1.teenyRequest.defaults(requestDefaults);
            request(authenticatedReqOpts, (err2, resp, body) => {
              util2.handleResp(err2, resp, body, (err3, data) => {
                if (err3) {
                  dup.destroy(err3);
                  return;
                }
                dup.emit("response", resp);
                onComplete(data);
              });
            });
          }
        });
      }
      /**
       * Returns true if the API request should be retried, given the error that was
       * given the first time the request was attempted. This is used for rate limit
       * related errors as well as intermittent server errors.
       *
       * @param {error} err - The API error to check if it is appropriate to retry.
       * @return {boolean} True if the API request should be retried, false otherwise.
       */
      shouldRetryRequest(err) {
        if (err) {
          if ([408, 429, 500, 502, 503, 504].indexOf(err.code) !== -1) {
            return true;
          }
          if (err.errors) {
            for (const e of err.errors) {
              const reason = e.reason;
              if (reason === "rateLimitExceeded") {
                return true;
              }
              if (reason === "userRateLimitExceeded") {
                return true;
              }
              if (reason && reason.includes("EAI_AGAIN")) {
                return true;
              }
            }
          }
        }
        return false;
      }
      /**
       * Get a function for making authenticated requests.
       *
       * @param {object} config - Configuration object.
       * @param {boolean=} config.autoRetry - Automatically retry requests if the
       *     response is related to rate limits or certain intermittent server
       * errors. We will exponentially backoff subsequent requests by default.
       * (default: true)
       * @param {object=} config.credentials - Credentials object.
       * @param {boolean=} config.customEndpoint - If true, just return the provided request options. Default: false.
       * @param {boolean=} config.useAuthWithCustomEndpoint - If true, will authenticate when using a custom endpoint. Default: false.
       * @param {string=} config.email - Account email address, required for PEM/P12 usage.
       * @param {number=} config.maxRetries - Maximum number of automatic retries attempted before returning the error. (default: 3)
       * @param {string=} config.keyFile - Path to a .json, .pem, or .p12 keyfile.
       * @param {array} config.scopes - Array of scopes required for the API.
       */
      makeAuthenticatedRequestFactory(config) {
        const googleAutoAuthConfig = { ...config };
        if (googleAutoAuthConfig.projectId === service_js_1.DEFAULT_PROJECT_ID_TOKEN) {
          delete googleAutoAuthConfig.projectId;
        }
        let authClient;
        if (googleAutoAuthConfig.authClient instanceof google_auth_library_1.GoogleAuth) {
          authClient = googleAutoAuthConfig.authClient;
        } else {
          authClient = new google_auth_library_1.GoogleAuth({
            ...googleAutoAuthConfig,
            authClient: googleAutoAuthConfig.authClient,
            clientOptions: googleAutoAuthConfig.clientOptions
          });
        }
        function makeAuthenticatedRequest(reqOpts, optionsOrCallback) {
          let stream;
          let projectId;
          const reqConfig = { ...config };
          let activeRequest_;
          if (!optionsOrCallback) {
            stream = (0, duplexify_1.default)();
            reqConfig.stream = stream;
          }
          const options = typeof optionsOrCallback === "object" ? optionsOrCallback : void 0;
          const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : void 0;
          async function setProjectId() {
            projectId = await authClient.getProjectId();
          }
          const onAuthenticated = async (err, authenticatedReqOpts) => {
            const authLibraryError = err;
            const autoAuthFailed = err && typeof err.message === "string" && err.message.indexOf("Could not load the default credentials") > -1;
            if (autoAuthFailed) {
              authenticatedReqOpts = reqOpts;
            }
            if (!err || autoAuthFailed) {
              try {
                authenticatedReqOpts = util2.decorateRequest(authenticatedReqOpts, projectId);
                err = null;
              } catch (e) {
                if (e instanceof projectify_1.MissingProjectIdError) {
                  try {
                    await setProjectId();
                    authenticatedReqOpts = util2.decorateRequest(authenticatedReqOpts, projectId);
                    err = null;
                  } catch (e2) {
                    err = err || e2;
                  }
                } else {
                  err = err || e;
                }
              }
            }
            if (err) {
              if (stream) {
                stream.destroy(err);
              } else {
                const fn = options && options.onAuthenticated ? options.onAuthenticated : callback;
                fn(err);
              }
              return;
            }
            if (options && options.onAuthenticated) {
              options.onAuthenticated(null, authenticatedReqOpts);
            } else {
              activeRequest_ = util2.makeRequest(authenticatedReqOpts, reqConfig, (apiResponseError, ...params) => {
                if (apiResponseError && apiResponseError.code === 401 && authLibraryError) {
                  apiResponseError = authLibraryError;
                }
                callback(apiResponseError, ...params);
              });
            }
          };
          const prepareRequest = async () => {
            try {
              const getProjectId = async () => {
                if (config.projectId && config.projectId !== service_js_1.DEFAULT_PROJECT_ID_TOKEN) {
                  return config.projectId;
                }
                if (config.projectIdRequired === false) {
                  return service_js_1.DEFAULT_PROJECT_ID_TOKEN;
                }
                return setProjectId();
              };
              const authorizeRequest = async () => {
                if (reqConfig.customEndpoint && !reqConfig.useAuthWithCustomEndpoint) {
                  return reqOpts;
                } else {
                  return authClient.authorizeRequest(reqOpts);
                }
              };
              const [_projectId, authorizedReqOpts] = await Promise.all([
                getProjectId(),
                authorizeRequest()
              ]);
              if (_projectId) {
                projectId = _projectId;
              }
              return onAuthenticated(null, authorizedReqOpts);
            } catch (e) {
              return onAuthenticated(e);
            }
          };
          prepareRequest();
          if (stream) {
            return stream;
          }
          return {
            abort() {
              setImmediate(() => {
                if (activeRequest_) {
                  activeRequest_.abort();
                  activeRequest_ = null;
                }
              });
            }
          };
        }
        const mar = makeAuthenticatedRequest;
        mar.getCredentials = authClient.getCredentials.bind(authClient);
        mar.authClient = authClient;
        return mar;
      }
      /**
       * Make a request through the `retryRequest` module with built-in error
       * handling and exponential back off.
       *
       * @param {object} reqOpts - Request options in the format `request` expects.
       * @param {object=} config - Configuration object.
       * @param {boolean=} config.autoRetry - Automatically retry requests if the
       *     response is related to rate limits or certain intermittent server
       * errors. We will exponentially backoff subsequent requests by default.
       * (default: true)
       * @param {number=} config.maxRetries - Maximum number of automatic retries
       *     attempted before returning the error. (default: 3)
       * @param {object=} config.request - HTTP module for request calls.
       * @param {function} callback - The callback function.
       */
      makeRequest(reqOpts, config, callback) {
        var _a, _b, _c, _d, _e;
        let autoRetryValue = AUTO_RETRY_DEFAULT;
        if (config.autoRetry !== void 0) {
          autoRetryValue = config.autoRetry;
        } else if (((_a = config.retryOptions) === null || _a === void 0 ? void 0 : _a.autoRetry) !== void 0) {
          autoRetryValue = config.retryOptions.autoRetry;
        }
        let maxRetryValue = MAX_RETRY_DEFAULT;
        if (config.maxRetries !== void 0) {
          maxRetryValue = config.maxRetries;
        } else if (((_b = config.retryOptions) === null || _b === void 0 ? void 0 : _b.maxRetries) !== void 0) {
          maxRetryValue = config.retryOptions.maxRetries;
        }
        requestDefaults.headers = this._getDefaultHeaders(reqOpts[exports.GCCL_GCS_CMD_KEY]);
        const options = {
          request: teeny_request_1.teenyRequest.defaults(requestDefaults),
          retries: autoRetryValue !== false ? maxRetryValue : 0,
          noResponseRetries: autoRetryValue !== false ? maxRetryValue : 0,
          shouldRetryFn(httpRespMessage) {
            var _a2, _b2;
            const err = util2.parseHttpRespMessage(httpRespMessage).err;
            if ((_a2 = config.retryOptions) === null || _a2 === void 0 ? void 0 : _a2.retryableErrorFn) {
              return err && ((_b2 = config.retryOptions) === null || _b2 === void 0 ? void 0 : _b2.retryableErrorFn(err));
            }
            return err && util2.shouldRetryRequest(err);
          },
          maxRetryDelay: (_c = config.retryOptions) === null || _c === void 0 ? void 0 : _c.maxRetryDelay,
          retryDelayMultiplier: (_d = config.retryOptions) === null || _d === void 0 ? void 0 : _d.retryDelayMultiplier,
          totalTimeout: (_e = config.retryOptions) === null || _e === void 0 ? void 0 : _e.totalTimeout
        };
        if (typeof reqOpts.maxRetries === "number") {
          options.retries = reqOpts.maxRetries;
          options.noResponseRetries = reqOpts.maxRetries;
        }
        if (!config.stream) {
          return (0, retry_request_1.default)(
            reqOpts,
            options,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (err, response, body) => {
              util2.handleResp(err, response, body, callback);
            }
          );
        }
        const dup = config.stream;
        let requestStream;
        const isGetRequest = (reqOpts.method || "GET").toUpperCase() === "GET";
        if (isGetRequest) {
          requestStream = (0, retry_request_1.default)(reqOpts, options);
          dup.setReadable(requestStream);
        } else {
          requestStream = options.request(reqOpts);
          dup.setWritable(requestStream);
        }
        requestStream.on("error", dup.destroy.bind(dup)).on("response", dup.emit.bind(dup, "response")).on("complete", dup.emit.bind(dup, "complete"));
        dup.abort = requestStream.abort;
        return dup;
      }
      /**
       * Decorate the options about to be made in a request.
       *
       * @param {object} reqOpts - The options to be passed to `request`.
       * @param {string} projectId - The project ID.
       * @return {object} reqOpts - The decorated reqOpts.
       */
      decorateRequest(reqOpts, projectId) {
        delete reqOpts.autoPaginate;
        delete reqOpts.autoPaginateVal;
        delete reqOpts.objectMode;
        if (reqOpts.qs !== null && typeof reqOpts.qs === "object") {
          delete reqOpts.qs.autoPaginate;
          delete reqOpts.qs.autoPaginateVal;
          reqOpts.qs = (0, projectify_1.replaceProjectIdToken)(reqOpts.qs, projectId);
        }
        if (Array.isArray(reqOpts.multipart)) {
          reqOpts.multipart = reqOpts.multipart.map((part) => {
            return (0, projectify_1.replaceProjectIdToken)(part, projectId);
          });
        }
        if (reqOpts.json !== null && typeof reqOpts.json === "object") {
          delete reqOpts.json.autoPaginate;
          delete reqOpts.json.autoPaginateVal;
          reqOpts.json = (0, projectify_1.replaceProjectIdToken)(reqOpts.json, projectId);
        }
        reqOpts.uri = (0, projectify_1.replaceProjectIdToken)(reqOpts.uri, projectId);
        return reqOpts;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isCustomType(unknown, module) {
        function getConstructorName(obj) {
          return obj.constructor && obj.constructor.name.toLowerCase();
        }
        const moduleNameParts = module.split("/");
        const parentModuleName = moduleNameParts[0] && moduleNameParts[0].toLowerCase();
        const subModuleName = moduleNameParts[1] && moduleNameParts[1].toLowerCase();
        if (subModuleName && getConstructorName(unknown) !== subModuleName) {
          return false;
        }
        let walkingModule = unknown;
        while (true) {
          if (getConstructorName(walkingModule) === parentModuleName) {
            return true;
          }
          walkingModule = walkingModule.parent;
          if (!walkingModule) {
            return false;
          }
        }
      }
      /**
       * Given two parameters, figure out if this is either:
       *  - Just a callback function
       *  - An options object, and then a callback function
       * @param optionsOrCallback An options object or callback.
       * @param cb A potentially undefined callback.
       */
      maybeOptionsOrCallback(optionsOrCallback, cb) {
        return typeof optionsOrCallback === "function" ? [{}, optionsOrCallback] : [optionsOrCallback, cb];
      }
      _getDefaultHeaders(gcclGcsCmd) {
        const headers = {
          "User-Agent": (0, util_js_1.getUserAgentString)(),
          "x-goog-api-client": `${(0, util_js_1.getRuntimeTrackingString)()} gccl/${packageJson.version}-${(0, util_js_1.getModuleFormat)()} gccl-invocation-id/${crypto.randomUUID()}`
        };
        if (gcclGcsCmd) {
          headers["x-goog-api-client"] += ` gccl-gcs-cmd/${gcclGcsCmd}`;
        }
        return headers;
      }
    }
    exports.Util = Util;
    class ProgressStream extends stream_1.Transform {
      constructor() {
        super(...arguments);
        this.bytesRead = 0;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _transform(chunk, encoding, callback) {
        this.bytesRead += chunk.length;
        this.emit("progress", { bytesWritten: this.bytesRead, contentLength: "*" });
        this.push(chunk);
        callback();
      }
    }
    const util2 = new Util();
    exports.util = util2;
  })(util$1);
  return util$1;
}
var hasRequiredService;
function requireService() {
  if (hasRequiredService) return service;
  hasRequiredService = 1;
  (function(exports) {
    var __createBinding = service && service.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = service && service.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = service && service.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Service = exports.DEFAULT_PROJECT_ID_TOKEN = void 0;
    const google_auth_library_1 = requireSrc$2();
    const crypto = __importStar(require$$0$2);
    const util_js_1 = requireUtil();
    const util_js_2 = requireUtil$1();
    exports.DEFAULT_PROJECT_ID_TOKEN = "{{projectId}}";
    class Service {
      /**
       * Service is a base class, meant to be inherited from by a "service," like
       * BigQuery or Storage.
       *
       * This handles making authenticated requests by exposing a `makeReq_`
       * function.
       *
       * @constructor
       * @alias module:common/service
       *
       * @param {object} config - Configuration object.
       * @param {string} config.baseUrl - The base URL to make API requests to.
       * @param {string[]} config.scopes - The scopes required for the request.
       * @param {object=} options - [Configuration object](#/docs).
       */
      constructor(config, options = {}) {
        this.baseUrl = config.baseUrl;
        this.apiEndpoint = config.apiEndpoint;
        this.timeout = options.timeout;
        this.globalInterceptors = Array.isArray(options.interceptors_) ? options.interceptors_ : [];
        this.interceptors = [];
        this.packageJson = config.packageJson;
        this.projectId = options.projectId || exports.DEFAULT_PROJECT_ID_TOKEN;
        this.projectIdRequired = config.projectIdRequired !== false;
        this.providedUserAgent = options.userAgent;
        this.universeDomain = options.universeDomain || google_auth_library_1.DEFAULT_UNIVERSE;
        this.customEndpoint = config.customEndpoint || false;
        this.useAuthWithCustomEndpoint = config.useAuthWithCustomEndpoint;
        this.makeAuthenticatedRequest = util_js_1.util.makeAuthenticatedRequestFactory({
          ...config,
          projectIdRequired: this.projectIdRequired,
          projectId: this.projectId,
          authClient: options.authClient || config.authClient,
          credentials: options.credentials,
          keyFile: options.keyFilename,
          email: options.email,
          clientOptions: {
            universeDomain: options.universeDomain,
            ...options.clientOptions
          }
        });
        this.authClient = this.makeAuthenticatedRequest.authClient;
        const isCloudFunctionEnv = !!process.env.FUNCTION_NAME;
        if (isCloudFunctionEnv) {
          this.interceptors.push({
            request(reqOpts) {
              reqOpts.forever = false;
              return reqOpts;
            }
          });
        }
      }
      /**
       * Return the user's custom request interceptors.
       */
      getRequestInterceptors() {
        return [].slice.call(this.globalInterceptors).concat(this.interceptors).filter((interceptor) => typeof interceptor.request === "function").map((interceptor) => interceptor.request);
      }
      getProjectId(callback) {
        if (!callback) {
          return this.getProjectIdAsync();
        }
        this.getProjectIdAsync().then((p) => callback(null, p), callback);
      }
      async getProjectIdAsync() {
        const projectId = await this.authClient.getProjectId();
        if (this.projectId === exports.DEFAULT_PROJECT_ID_TOKEN && projectId) {
          this.projectId = projectId;
        }
        return this.projectId;
      }
      request_(reqOpts, callback) {
        reqOpts = { ...reqOpts, timeout: this.timeout };
        const isAbsoluteUrl = reqOpts.uri.indexOf("http") === 0;
        const uriComponents = [this.baseUrl];
        if (this.projectIdRequired) {
          if (reqOpts.projectId) {
            uriComponents.push("projects");
            uriComponents.push(reqOpts.projectId);
          } else {
            uriComponents.push("projects");
            uriComponents.push(this.projectId);
          }
        }
        uriComponents.push(reqOpts.uri);
        if (isAbsoluteUrl) {
          uriComponents.splice(0, uriComponents.indexOf(reqOpts.uri));
        }
        reqOpts.uri = uriComponents.map((uriComponent) => {
          const trimSlashesRegex = /^\/*|\/*$/g;
          return uriComponent.replace(trimSlashesRegex, "");
        }).join("/").replace(/\/:/g, ":");
        const requestInterceptors = this.getRequestInterceptors();
        const interceptorArray = Array.isArray(reqOpts.interceptors_) ? reqOpts.interceptors_ : [];
        interceptorArray.forEach((interceptor) => {
          if (typeof interceptor.request === "function") {
            requestInterceptors.push(interceptor.request);
          }
        });
        requestInterceptors.forEach((requestInterceptor) => {
          reqOpts = requestInterceptor(reqOpts);
        });
        delete reqOpts.interceptors_;
        const pkg = this.packageJson;
        let userAgent = (0, util_js_2.getUserAgentString)();
        if (this.providedUserAgent) {
          userAgent = `${this.providedUserAgent} ${userAgent}`;
        }
        reqOpts.headers = {
          ...reqOpts.headers,
          "User-Agent": userAgent,
          "x-goog-api-client": `${(0, util_js_2.getRuntimeTrackingString)()} gccl/${pkg.version}-${(0, util_js_2.getModuleFormat)()} gccl-invocation-id/${crypto.randomUUID()}`
        };
        if (reqOpts[util_js_1.GCCL_GCS_CMD_KEY]) {
          reqOpts.headers["x-goog-api-client"] += ` gccl-gcs-cmd/${reqOpts[util_js_1.GCCL_GCS_CMD_KEY]}`;
        }
        if (reqOpts.shouldReturnStream) {
          return this.makeAuthenticatedRequest(reqOpts);
        } else {
          this.makeAuthenticatedRequest(reqOpts, callback);
        }
      }
      /**
       * Make an authenticated API request.
       *
       * @param {object} reqOpts - Request options that are passed to `request`.
       * @param {string} reqOpts.uri - A URI relative to the baseUrl.
       * @param {function} callback - The callback function passed to `request`.
       */
      request(reqOpts, callback) {
        Service.prototype.request_.call(this, reqOpts, callback);
      }
      /**
       * Make an authenticated API request.
       *
       * @param {object} reqOpts - Request options that are passed to `request`.
       * @param {string} reqOpts.uri - A URI relative to the baseUrl.
       */
      requestStream(reqOpts) {
        const opts = { ...reqOpts, shouldReturnStream: true };
        return Service.prototype.request_.call(this, opts);
      }
    }
    exports.Service = Service;
  })(service);
  return service;
}
var serviceObject = {};
var hasRequiredServiceObject;
function requireServiceObject() {
  if (hasRequiredServiceObject) return serviceObject;
  hasRequiredServiceObject = 1;
  Object.defineProperty(serviceObject, "__esModule", { value: true });
  serviceObject.ServiceObject = void 0;
  const promisify_1 = requireSrc$4();
  const events_1 = require$$0$3;
  const util_js_1 = requireUtil();
  class ServiceObject extends events_1.EventEmitter {
    /*
     * @constructor
     * @alias module:common/service-object
     *
     * @private
     *
     * @param {object} config - Configuration object.
     * @param {string} config.baseUrl - The base URL to make API requests to.
     * @param {string} config.createMethod - The method which creates this object.
     * @param {string=} config.id - The identifier of the object. For example, the
     *     name of a Storage bucket or Pub/Sub topic.
     * @param {object=} config.methods - A map of each method name that should be inherited.
     * @param {object} config.methods[].reqOpts - Default request options for this
     *     particular method. A common use case is when `setMetadata` requires a
     *     `PUT` method to override the default `PATCH`.
     * @param {object} config.parent - The parent service instance. For example, an
     *     instance of Storage if the object is Bucket.
     */
    constructor(config) {
      super();
      this.metadata = {};
      this.baseUrl = config.baseUrl;
      this.parent = config.parent;
      this.id = config.id;
      this.createMethod = config.createMethod;
      this.methods = config.methods || {};
      this.interceptors = [];
      this.projectId = config.projectId;
      if (config.methods) {
        Object.getOwnPropertyNames(ServiceObject.prototype).filter((methodName) => {
          return (
            // All ServiceObjects need `request` and `getRequestInterceptors`.
            // clang-format off
            !/^request/.test(methodName) && !/^getRequestInterceptors/.test(methodName) && // clang-format on
            // The ServiceObject didn't redefine the method.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this[methodName] === // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ServiceObject.prototype[methodName] && // This method isn't wanted.
            !config.methods[methodName]
          );
        }).forEach((methodName) => {
          this[methodName] = void 0;
        });
      }
    }
    create(optionsOrCallback, callback) {
      const self = this;
      const args = [this.id];
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      }
      if (typeof optionsOrCallback === "object") {
        args.push(optionsOrCallback);
      }
      function onCreate(...args2) {
        const [err, instance] = args2;
        if (!err) {
          self.metadata = instance.metadata;
          if (self.id && instance.metadata) {
            self.id = instance.metadata.id;
          }
          args2[1] = self;
        }
        callback(...args2);
      }
      args.push(onCreate);
      this.createMethod.apply(null, args);
    }
    delete(optionsOrCallback, cb) {
      var _a;
      const [options, callback] = util_js_1.util.maybeOptionsOrCallback(optionsOrCallback, cb);
      const ignoreNotFound = options.ignoreNotFound;
      delete options.ignoreNotFound;
      const methodConfig = typeof this.methods.delete === "object" && this.methods.delete || {};
      const reqOpts = {
        method: "DELETE",
        uri: "",
        ...methodConfig.reqOpts,
        qs: {
          ...(_a = methodConfig.reqOpts) === null || _a === void 0 ? void 0 : _a.qs,
          ...options
        }
      };
      ServiceObject.prototype.request.call(this, reqOpts, (err, body, res) => {
        if (err) {
          if (err.code === 404 && ignoreNotFound) {
            err = null;
          }
        }
        callback(err, res);
      });
    }
    exists(optionsOrCallback, cb) {
      const [options, callback] = util_js_1.util.maybeOptionsOrCallback(optionsOrCallback, cb);
      this.get(options, (err) => {
        if (err) {
          if (err.code === 404) {
            callback(null, false);
          } else {
            callback(err);
          }
          return;
        }
        callback(null, true);
      });
    }
    get(optionsOrCallback, cb) {
      const self = this;
      const [opts, callback] = util_js_1.util.maybeOptionsOrCallback(optionsOrCallback, cb);
      const options = Object.assign({}, opts);
      const autoCreate = options.autoCreate && typeof this.create === "function";
      delete options.autoCreate;
      function onCreate(err, instance, apiResponse) {
        if (err) {
          if (err.code === 409) {
            self.get(options, callback);
            return;
          }
          callback(err, null, apiResponse);
          return;
        }
        callback(null, instance, apiResponse);
      }
      this.getMetadata(options, (err, metadata) => {
        if (err) {
          if (err.code === 404 && autoCreate) {
            const args = [];
            if (Object.keys(options).length > 0) {
              args.push(options);
            }
            args.push(onCreate);
            self.create(...args);
            return;
          }
          callback(err, null, metadata);
          return;
        }
        callback(null, self, metadata);
      });
    }
    getMetadata(optionsOrCallback, cb) {
      var _a;
      const [options, callback] = util_js_1.util.maybeOptionsOrCallback(optionsOrCallback, cb);
      const methodConfig = typeof this.methods.getMetadata === "object" && this.methods.getMetadata || {};
      const reqOpts = {
        uri: "",
        ...methodConfig.reqOpts,
        qs: {
          ...(_a = methodConfig.reqOpts) === null || _a === void 0 ? void 0 : _a.qs,
          ...options
        }
      };
      ServiceObject.prototype.request.call(this, reqOpts, (err, body, res) => {
        this.metadata = body;
        callback(err, this.metadata, res);
      });
    }
    /**
     * Return the user's custom request interceptors.
     */
    getRequestInterceptors() {
      const localInterceptors = this.interceptors.filter((interceptor) => typeof interceptor.request === "function").map((interceptor) => interceptor.request);
      return this.parent.getRequestInterceptors().concat(localInterceptors);
    }
    setMetadata(metadata, optionsOrCallback, cb) {
      var _a, _b;
      const [options, callback] = util_js_1.util.maybeOptionsOrCallback(optionsOrCallback, cb);
      const methodConfig = typeof this.methods.setMetadata === "object" && this.methods.setMetadata || {};
      const reqOpts = {
        method: "PATCH",
        uri: "",
        ...methodConfig.reqOpts,
        json: {
          ...(_a = methodConfig.reqOpts) === null || _a === void 0 ? void 0 : _a.json,
          ...metadata
        },
        qs: {
          ...(_b = methodConfig.reqOpts) === null || _b === void 0 ? void 0 : _b.qs,
          ...options
        }
      };
      ServiceObject.prototype.request.call(this, reqOpts, (err, body, res) => {
        this.metadata = body;
        callback(err, this.metadata, res);
      });
    }
    request_(reqOpts, callback) {
      reqOpts = { ...reqOpts };
      if (this.projectId) {
        reqOpts.projectId = this.projectId;
      }
      const isAbsoluteUrl = reqOpts.uri.indexOf("http") === 0;
      const uriComponents = [this.baseUrl, this.id || "", reqOpts.uri];
      if (isAbsoluteUrl) {
        uriComponents.splice(0, uriComponents.indexOf(reqOpts.uri));
      }
      reqOpts.uri = uriComponents.filter((x) => x.trim()).map((uriComponent) => {
        const trimSlashesRegex = /^\/*|\/*$/g;
        return uriComponent.replace(trimSlashesRegex, "");
      }).join("/");
      const childInterceptors = Array.isArray(reqOpts.interceptors_) ? reqOpts.interceptors_ : [];
      const localInterceptors = [].slice.call(this.interceptors);
      reqOpts.interceptors_ = childInterceptors.concat(localInterceptors);
      if (reqOpts.shouldReturnStream) {
        return this.parent.requestStream(reqOpts);
      }
      this.parent.request(reqOpts, callback);
    }
    request(reqOpts, callback) {
      this.request_(reqOpts, callback);
    }
    /**
     * Make an authenticated API request.
     *
     * @param {object} reqOpts - Request options that are passed to `request`.
     * @param {string} reqOpts.uri - A URI relative to the baseUrl.
     */
    requestStream(reqOpts) {
      const opts = { ...reqOpts, shouldReturnStream: true };
      return this.request_(opts);
    }
  }
  serviceObject.ServiceObject = ServiceObject;
  (0, promisify_1.promisifyAll)(ServiceObject, { exclude: ["getRequestInterceptors"] });
  return serviceObject;
}
var hasRequiredNodejsCommon;
function requireNodejsCommon() {
  if (hasRequiredNodejsCommon) return nodejsCommon;
  hasRequiredNodejsCommon = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.util = exports.ApiError = exports.ServiceObject = exports.Service = void 0;
    var service_js_1 = requireService();
    Object.defineProperty(exports, "Service", { enumerable: true, get: function() {
      return service_js_1.Service;
    } });
    var service_object_js_1 = requireServiceObject();
    Object.defineProperty(exports, "ServiceObject", { enumerable: true, get: function() {
      return service_object_js_1.ServiceObject;
    } });
    var util_js_1 = requireUtil();
    Object.defineProperty(exports, "ApiError", { enumerable: true, get: function() {
      return util_js_1.ApiError;
    } });
    Object.defineProperty(exports, "util", { enumerable: true, get: function() {
      return util_js_1.util;
    } });
  })(nodejsCommon);
  return nodejsCommon;
}
var storage = {};
var bucket = {};
var acl = {};
var hasRequiredAcl;
function requireAcl() {
  if (hasRequiredAcl) return acl;
  hasRequiredAcl = 1;
  Object.defineProperty(acl, "__esModule", { value: true });
  acl.AclRoleAccessorMethods = acl.Acl = void 0;
  const promisify_1 = requireSrc$4();
  class AclRoleAccessorMethods {
    constructor() {
      this.owners = {};
      this.readers = {};
      this.writers = {};
      this.owners = {};
      this.readers = {};
      this.writers = {};
      AclRoleAccessorMethods.roles.forEach(this._assignAccessMethods.bind(this));
    }
    _assignAccessMethods(role) {
      const accessMethods = AclRoleAccessorMethods.accessMethods;
      const entities = AclRoleAccessorMethods.entities;
      const roleGroup = role.toLowerCase() + "s";
      this[roleGroup] = entities.reduce((acc, entity) => {
        const isPrefix = entity.charAt(entity.length - 1) === "-";
        accessMethods.forEach((accessMethod) => {
          let method = accessMethod + entity[0].toUpperCase() + entity.substring(1);
          if (isPrefix) {
            method = method.replace("-", "");
          }
          acc[method] = (entityId, options, callback) => {
            let apiEntity;
            if (typeof options === "function") {
              callback = options;
              options = {};
            }
            if (isPrefix) {
              apiEntity = entity + entityId;
            } else {
              apiEntity = entity;
              callback = entityId;
            }
            options = Object.assign({
              entity: apiEntity,
              role
            }, options);
            const args = [options];
            if (typeof callback === "function") {
              args.push(callback);
            }
            return this[accessMethod].apply(this, args);
          };
        });
        return acc;
      }, {});
    }
  }
  acl.AclRoleAccessorMethods = AclRoleAccessorMethods;
  AclRoleAccessorMethods.accessMethods = ["add", "delete"];
  AclRoleAccessorMethods.entities = [
    // Special entity groups that do not require further specification.
    "allAuthenticatedUsers",
    "allUsers",
    // Entity groups that require specification, e.g. `user-email@example.com`.
    "domain-",
    "group-",
    "project-",
    "user-"
  ];
  AclRoleAccessorMethods.roles = ["OWNER", "READER", "WRITER"];
  class Acl extends AclRoleAccessorMethods {
    constructor(options) {
      super();
      this.pathPrefix = options.pathPrefix;
      this.request_ = options.request;
    }
    /**
     * @typedef {array} AddAclResponse
     * @property {object} 0 The Acl Objects.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback AddAclCallback
     * @param {?Error} err Request error, if any.
     * @param {object} acl The Acl Objects.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Add access controls on a {@link Bucket} or {@link File}.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/bucketAccessControls/insert| BucketAccessControls: insert API Documentation}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objectAccessControls/insert| ObjectAccessControls: insert API Documentation}
     *
     * @param {object} options Configuration options.
     * @param {string} options.entity Whose permissions will be added.
     * @param {string} options.role Permissions allowed for the defined entity.
     *     See {@link https://cloud.google.com/storage/docs/access-control Access
     * Control}.
     * @param {number} [options.generation] **File Objects Only** Select a specific
     *     revision of this file (as opposed to the latest version, the default).
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {AddAclCallback} [callback] Callback function.
     * @returns {Promise<AddAclResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const myBucket = storage.bucket('my-bucket');
     * const myFile = myBucket.file('my-file');
     *
     * const options = {
     *   entity: 'user-useremail@example.com',
     *   role: gcs.acl.OWNER_ROLE
     * };
     *
     * myBucket.acl.add(options, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // For file ACL operations, you can also specify a `generation` property.
     * // Here is how you would grant ownership permissions to a user on a
     * specific
     * // revision of a file.
     * //-
     * myFile.acl.add({
     *   entity: 'user-useremail@example.com',
     *   role: gcs.acl.OWNER_ROLE,
     *   generation: 1
     * }, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * myBucket.acl.add(options).then(function(data) {
     *   const aclObject = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_add_file_owner
     * Example of adding an owner to a file:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_add_bucket_owner
     * Example of adding an owner to a bucket:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_add_bucket_default_owner
     * Example of adding a default owner to a bucket:
     */
    add(options, callback) {
      const query = {};
      if (options.generation) {
        query.generation = options.generation;
      }
      if (options.userProject) {
        query.userProject = options.userProject;
      }
      this.request({
        method: "POST",
        uri: "",
        qs: query,
        maxRetries: 0,
        //explicitly set this value since this is a non-idempotent function
        json: {
          entity: options.entity,
          role: options.role.toUpperCase()
        }
      }, (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }
        callback(null, this.makeAclObject_(resp), resp);
      });
    }
    /**
     * @typedef {array} RemoveAclResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @callback RemoveAclCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Delete access controls on a {@link Bucket} or {@link File}.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/bucketAccessControls/delete| BucketAccessControls: delete API Documentation}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objectAccessControls/delete| ObjectAccessControls: delete API Documentation}
     *
     * @param {object} options Configuration object.
     * @param {string} options.entity Whose permissions will be revoked.
     * @param {int} [options.generation] **File Objects Only** Select a specific
     *     revision of this file (as opposed to the latest version, the default).
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {RemoveAclCallback} callback The callback function.
     * @returns {Promise<RemoveAclResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const myBucket = storage.bucket('my-bucket');
     * const myFile = myBucket.file('my-file');
     *
     * myBucket.acl.delete({
     *   entity: 'user-useremail@example.com'
     * }, function(err, apiResponse) {});
     *
     * //-
     * // For file ACL operations, you can also specify a `generation` property.
     * //-
     * myFile.acl.delete({
     *   entity: 'user-useremail@example.com',
     *   generation: 1
     * }, function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * myFile.acl.delete().then(function(data) {
     *   const apiResponse = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_remove_bucket_owner
     * Example of removing an owner from a bucket:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_remove_bucket_default_owner
     * Example of removing a default owner from a bucket:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_remove_file_owner
     * Example of removing an owner from a bucket:
     */
    delete(options, callback) {
      const query = {};
      if (options.generation) {
        query.generation = options.generation;
      }
      if (options.userProject) {
        query.userProject = options.userProject;
      }
      this.request({
        method: "DELETE",
        uri: "/" + encodeURIComponent(options.entity),
        qs: query
      }, (err, resp) => {
        callback(err, resp);
      });
    }
    /**
     * @typedef {array} GetAclResponse
     * @property {object|object[]} 0 Single or array of Acl Objects.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback GetAclCallback
     * @param {?Error} err Request error, if any.
     * @param {object|object[]} acl Single or array of Acl Objects.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Get access controls on a {@link Bucket} or {@link File}. If
     * an entity is omitted, you will receive an array of all applicable access
     * controls.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/bucketAccessControls/get| BucketAccessControls: get API Documentation}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objectAccessControls/get| ObjectAccessControls: get API Documentation}
     *
     * @param {object|function} [options] Configuration options. If you want to
     *     receive a list of all access controls, pass the callback function as
     * the only argument.
     * @param {string} options.entity Whose permissions will be fetched.
     * @param {number} [options.generation] **File Objects Only** Select a specific
     *     revision of this file (as opposed to the latest version, the default).
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {GetAclCallback} [callback] Callback function.
     * @returns {Promise<GetAclResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const myBucket = storage.bucket('my-bucket');
     * const myFile = myBucket.file('my-file');
     *
     * myBucket.acl.get({
     *   entity: 'user-useremail@example.com'
     * }, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // Get all access controls.
     * //-
     * myBucket.acl.get(function(err, aclObjects, apiResponse) {
     *   // aclObjects = [
     *   //   {
     *   //     entity: 'user-useremail@example.com',
     *   //     role: 'owner'
     *   //   }
     *   // ]
     * });
     *
     * //-
     * // For file ACL operations, you can also specify a `generation` property.
     * //-
     * myFile.acl.get({
     *   entity: 'user-useremail@example.com',
     *   generation: 1
     * }, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * myBucket.acl.get().then(function(data) {
     *   const aclObject = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_print_file_acl
     * Example of printing a file's ACL:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_print_file_acl_for_user
     * Example of printing a file's ACL for a specific user:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_print_bucket_acl
     * Example of printing a bucket's ACL:
     *
     * @example <caption>include:samples/acl.js</caption>
     * region_tag:storage_print_bucket_acl_for_user
     * Example of printing a bucket's ACL for a specific user:
     */
    get(optionsOrCallback, cb) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
      const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      let path = "";
      const query = {};
      if (options) {
        path = "/" + encodeURIComponent(options.entity);
        if (options.generation) {
          query.generation = options.generation;
        }
        if (options.userProject) {
          query.userProject = options.userProject;
        }
      }
      this.request({
        uri: path,
        qs: query
      }, (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }
        let results;
        if (resp.items) {
          results = resp.items.map(this.makeAclObject_);
        } else {
          results = this.makeAclObject_(resp);
        }
        callback(null, results, resp);
      });
    }
    /**
     * @typedef {array} UpdateAclResponse
     * @property {object} 0 The updated Acl Objects.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback UpdateAclCallback
     * @param {?Error} err Request error, if any.
     * @param {object} acl The updated Acl Objects.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Update access controls on a {@link Bucket} or {@link File}.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/bucketAccessControls/update| BucketAccessControls: update API Documentation}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objectAccessControls/update| ObjectAccessControls: update API Documentation}
     *
     * @param {object} options Configuration options.
     * @param {string} options.entity Whose permissions will be updated.
     * @param {string} options.role Permissions allowed for the defined entity.
     *     See {@link Storage.acl}.
     * @param {number} [options.generation] **File Objects Only** Select a specific
     *     revision of this file (as opposed to the latest version, the default).
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {UpdateAclCallback} [callback] Callback function.
     * @returns {Promise<UpdateAclResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const myBucket = storage.bucket('my-bucket');
     * const myFile = myBucket.file('my-file');
     *
     * const options = {
     *   entity: 'user-useremail@example.com',
     *   role: gcs.acl.WRITER_ROLE
     * };
     *
     * myBucket.acl.update(options, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // For file ACL operations, you can also specify a `generation` property.
     * //-
     * myFile.acl.update({
     *   entity: 'user-useremail@example.com',
     *   role: gcs.acl.WRITER_ROLE,
     *   generation: 1
     * }, function(err, aclObject, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * myFile.acl.update(options).then(function(data) {
     *   const aclObject = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    update(options, callback) {
      const query = {};
      if (options.generation) {
        query.generation = options.generation;
      }
      if (options.userProject) {
        query.userProject = options.userProject;
      }
      this.request({
        method: "PUT",
        uri: "/" + encodeURIComponent(options.entity),
        qs: query,
        json: {
          role: options.role.toUpperCase()
        }
      }, (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }
        callback(null, this.makeAclObject_(resp), resp);
      });
    }
    /**
     * Transform API responses to a consistent object format.
     *
     * @private
     */
    makeAclObject_(accessControlObject) {
      const obj = {
        entity: accessControlObject.entity,
        role: accessControlObject.role
      };
      if (accessControlObject.projectTeam) {
        obj.projectTeam = accessControlObject.projectTeam;
      }
      return obj;
    }
    /**
     * Patch requests up to the bucket's request object.
     *
     * @private
     *
     * @param {string} method Action.
     * @param {string} path Request path.
     * @param {*} query Request query object.
     * @param {*} body Request body contents.
     * @param {function} callback Callback function.
     */
    request(reqOpts, callback) {
      reqOpts.uri = this.pathPrefix + reqOpts.uri;
      this.request_(reqOpts, callback);
    }
  }
  acl.Acl = Acl;
  (0, promisify_1.promisifyAll)(Acl, {
    exclude: ["request"]
  });
  return acl;
}
var file = {};
var resumableUpload = {};
var hashStreamValidator = {};
var crc32c = {};
var hasRequiredCrc32c;
function requireCrc32c() {
  if (hasRequiredCrc32c) return crc32c;
  hasRequiredCrc32c = 1;
  var __classPrivateFieldSet = crc32c && crc32c.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = crc32c && crc32c.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _CRC32C_crc32c;
  Object.defineProperty(crc32c, "__esModule", { value: true });
  crc32c.CRC32C_EXTENSION_TABLE = crc32c.CRC32C_EXTENSIONS = crc32c.CRC32C_EXCEPTION_MESSAGES = crc32c.CRC32C_DEFAULT_VALIDATOR_GENERATOR = crc32c.CRC32C = void 0;
  const fs_1 = require$$0$4;
  const CRC32C_EXTENSIONS = [
    0,
    4067132163,
    3778769143,
    324072436,
    3348797215,
    904991772,
    648144872,
    3570033899,
    2329499855,
    2024987596,
    1809983544,
    2575936315,
    1296289744,
    3207089363,
    2893594407,
    1578318884,
    274646895,
    3795141740,
    4049975192,
    51262619,
    3619967088,
    632279923,
    922689671,
    3298075524,
    2592579488,
    1760304291,
    2075979607,
    2312596564,
    1562183871,
    2943781820,
    3156637768,
    1313733451,
    549293790,
    3537243613,
    3246849577,
    871202090,
    3878099393,
    357341890,
    102525238,
    4101499445,
    2858735121,
    1477399826,
    1264559846,
    3107202533,
    1845379342,
    2677391885,
    2361733625,
    2125378298,
    820201905,
    3263744690,
    3520608582,
    598981189,
    4151959214,
    85089709,
    373468761,
    3827903834,
    3124367742,
    1213305469,
    1526817161,
    2842354314,
    2107672161,
    2412447074,
    2627466902,
    1861252501,
    1098587580,
    3004210879,
    2688576843,
    1378610760,
    2262928035,
    1955203488,
    1742404180,
    2511436119,
    3416409459,
    969524848,
    714683780,
    3639785095,
    205050476,
    4266873199,
    3976438427,
    526918040,
    1361435347,
    2739821008,
    2954799652,
    1114974503,
    2529119692,
    1691668175,
    2005155131,
    2247081528,
    3690758684,
    697762079,
    986182379,
    3366744552,
    476452099,
    3993867776,
    4250756596,
    255256311,
    1640403810,
    2477592673,
    2164122517,
    1922457750,
    2791048317,
    1412925310,
    1197962378,
    3037525897,
    3944729517,
    427051182,
    170179418,
    4165941337,
    746937522,
    3740196785,
    3451792453,
    1070968646,
    1905808397,
    2213795598,
    2426610938,
    1657317369,
    3053634322,
    1147748369,
    1463399397,
    2773627110,
    4215344322,
    153784257,
    444234805,
    3893493558,
    1021025245,
    3467647198,
    3722505002,
    797665321,
    2197175160,
    1889384571,
    1674398607,
    2443626636,
    1164749927,
    3070701412,
    2757221520,
    1446797203,
    137323447,
    4198817972,
    3910406976,
    461344835,
    3484808360,
    1037989803,
    781091935,
    3705997148,
    2460548119,
    1623424788,
    1939049696,
    2180517859,
    1429367560,
    2807687179,
    3020495871,
    1180866812,
    410100952,
    3927582683,
    4182430767,
    186734380,
    3756733383,
    763408580,
    1053836080,
    3434856499,
    2722870694,
    1344288421,
    1131464017,
    2971354706,
    1708204729,
    2545590714,
    2229949006,
    1988219213,
    680717673,
    3673779818,
    3383336350,
    1002577565,
    4010310262,
    493091189,
    238226049,
    4233660802,
    2987750089,
    1082061258,
    1395524158,
    2705686845,
    1972364758,
    2279892693,
    2494862625,
    1725896226,
    952904198,
    3399985413,
    3656866545,
    731699698,
    4283874585,
    222117402,
    510512622,
    3959836397,
    3280807620,
    837199303,
    582374963,
    3504198960,
    68661723,
    4135334616,
    3844915500,
    390545967,
    1230274059,
    3141532936,
    2825850620,
    1510247935,
    2395924756,
    2091215383,
    1878366691,
    2644384480,
    3553878443,
    565732008,
    854102364,
    3229815391,
    340358836,
    3861050807,
    4117890627,
    119113024,
    1493875044,
    2875275879,
    3090270611,
    1247431312,
    2660249211,
    1828433272,
    2141937292,
    2378227087,
    3811616794,
    291187481,
    34330861,
    4032846830,
    615137029,
    3603020806,
    3314634738,
    939183345,
    1776939221,
    2609017814,
    2295496738,
    2058945313,
    2926798794,
    1545135305,
    1330124605,
    3173225534,
    4084100981,
    17165430,
    307568514,
    3762199681,
    888469610,
    3332340585,
    3587147933,
    665062302,
    2042050490,
    2346497209,
    2559330125,
    1793573966,
    3190661285,
    1279665062,
    1595330642,
    2910671697
  ];
  crc32c.CRC32C_EXTENSIONS = CRC32C_EXTENSIONS;
  const CRC32C_EXTENSION_TABLE = new Int32Array(CRC32C_EXTENSIONS);
  crc32c.CRC32C_EXTENSION_TABLE = CRC32C_EXTENSION_TABLE;
  const CRC32C_DEFAULT_VALIDATOR_GENERATOR = () => new CRC32C();
  crc32c.CRC32C_DEFAULT_VALIDATOR_GENERATOR = CRC32C_DEFAULT_VALIDATOR_GENERATOR;
  const CRC32C_EXCEPTION_MESSAGES = {
    INVALID_INIT_BASE64_RANGE: (l) => `base64-encoded data expected to equal 4 bytes, not ${l}`,
    INVALID_INIT_BUFFER_LENGTH: (l) => `Buffer expected to equal 4 bytes, not ${l}`,
    INVALID_INIT_INTEGER: (l) => `Number expected to be a safe, unsigned 32-bit integer, not ${l}`
  };
  crc32c.CRC32C_EXCEPTION_MESSAGES = CRC32C_EXCEPTION_MESSAGES;
  class CRC32C {
    /**
     * Constructs a new `CRC32C` object.
     *
     * Reconstruction is recommended via the `CRC32C.from` static method.
     *
     * @param initialValue An initial CRC32C value - a signed 32-bit integer.
     */
    constructor(initialValue = 0) {
      _CRC32C_crc32c.set(this, 0);
      __classPrivateFieldSet(this, _CRC32C_crc32c, initialValue, "f");
    }
    /**
     * Calculates a CRC32C from a provided buffer.
     *
     * Implementation inspired from:
     * - {@link https://github.com/google/crc32c/blob/21fc8ef30415a635e7351ffa0e5d5367943d4a94/src/crc32c_portable.cc github.com/google/crc32c}
     * - {@link https://github.com/googleapis/python-crc32c/blob/a595e758c08df445a99c3bf132ee8e80a3ec4308/src/google_crc32c/python.py github.com/googleapis/python-crc32c}
     * - {@link https://github.com/googleapis/java-storage/pull/1376/files github.com/googleapis/java-storage}
     *
     * @param data The `Buffer` to generate the CRC32C from
     */
    update(data) {
      let current = __classPrivateFieldGet(this, _CRC32C_crc32c, "f") ^ 4294967295;
      for (const d of data) {
        const tablePoly = CRC32C.CRC32C_EXTENSION_TABLE[(d ^ current) & 255];
        current = tablePoly ^ current >>> 8;
      }
      __classPrivateFieldSet(this, _CRC32C_crc32c, current ^ 4294967295, "f");
    }
    /**
     * Validates a provided input to the current CRC32C value.
     *
     * @param input A Buffer, `CRC32C`-compatible object, base64-encoded data (string), or signed 32-bit integer
     */
    validate(input) {
      if (typeof input === "number") {
        return input === __classPrivateFieldGet(this, _CRC32C_crc32c, "f");
      } else if (typeof input === "string") {
        return input === this.toString();
      } else if (Buffer.isBuffer(input)) {
        return Buffer.compare(input, this.toBuffer()) === 0;
      } else {
        return input.toString() === this.toString();
      }
    }
    /**
     * Returns a `Buffer` representation of the CRC32C value
     */
    toBuffer() {
      const buffer = Buffer.alloc(4);
      buffer.writeInt32BE(__classPrivateFieldGet(this, _CRC32C_crc32c, "f"));
      return buffer;
    }
    /**
     * Returns a JSON-compatible, base64-encoded representation of the CRC32C value.
     *
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify `JSON#stringify`}
     */
    toJSON() {
      return this.toString();
    }
    /**
     * Returns a base64-encoded representation of the CRC32C value.
     *
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString `Object#toString`}
     */
    toString() {
      return this.toBuffer().toString("base64");
    }
    /**
     * Returns the `number` representation of the CRC32C value as a signed 32-bit integer
     *
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf `Object#valueOf`}
     */
    valueOf() {
      return __classPrivateFieldGet(this, _CRC32C_crc32c, "f");
    }
    /**
     * Generates a `CRC32C` from a compatible buffer format.
     *
     * @param value 4-byte `ArrayBufferView`/`Buffer`/`TypedArray`
     */
    static fromBuffer(value) {
      let buffer;
      if (Buffer.isBuffer(value)) {
        buffer = value;
      } else if ("buffer" in value) {
        buffer = Buffer.from(value.buffer);
      } else {
        buffer = Buffer.from(value);
      }
      if (buffer.byteLength !== 4) {
        throw new RangeError(CRC32C_EXCEPTION_MESSAGES.INVALID_INIT_BUFFER_LENGTH(buffer.byteLength));
      }
      return new CRC32C(buffer.readInt32BE());
    }
    static async fromFile(file2) {
      const crc32c2 = new CRC32C();
      await new Promise((resolve, reject) => {
        (0, fs_1.createReadStream)(file2).on("data", (d) => {
          if (typeof d === "string") {
            crc32c2.update(Buffer.from(d));
          } else {
            crc32c2.update(d);
          }
        }).on("end", () => resolve()).on("error", reject);
      });
      return crc32c2;
    }
    /**
     * Generates a `CRC32C` from 4-byte base64-encoded data (string).
     *
     * @param value 4-byte base64-encoded data (string)
     */
    static fromString(value) {
      const buffer = Buffer.from(value, "base64");
      if (buffer.byteLength !== 4) {
        throw new RangeError(CRC32C_EXCEPTION_MESSAGES.INVALID_INIT_BASE64_RANGE(buffer.byteLength));
      }
      return this.fromBuffer(buffer);
    }
    /**
     * Generates a `CRC32C` from a safe, unsigned 32-bit integer.
     *
     * @param value an unsigned 32-bit integer
     */
    static fromNumber(value) {
      if (!Number.isSafeInteger(value) || value > 2 ** 32 || value < -4294967296) {
        throw new RangeError(CRC32C_EXCEPTION_MESSAGES.INVALID_INIT_INTEGER(value));
      }
      return new CRC32C(value);
    }
    /**
     * Generates a `CRC32C` from a variety of compatable types.
     * Note: strings are treated as input, not as file paths to read from.
     *
     * @param value A number, 4-byte `ArrayBufferView`/`Buffer`/`TypedArray`, or 4-byte base64-encoded data (string)
     */
    static from(value) {
      if (typeof value === "number") {
        return this.fromNumber(value);
      } else if (typeof value === "string") {
        return this.fromString(value);
      } else if ("byteLength" in value) {
        return this.fromBuffer(value);
      } else {
        return this.fromString(value.toString());
      }
    }
  }
  crc32c.CRC32C = CRC32C;
  _CRC32C_crc32c = /* @__PURE__ */ new WeakMap();
  CRC32C.CRC32C_EXTENSIONS = CRC32C_EXTENSIONS;
  CRC32C.CRC32C_EXTENSION_TABLE = CRC32C_EXTENSION_TABLE;
  return crc32c;
}
var hasRequiredHashStreamValidator;
function requireHashStreamValidator() {
  if (hasRequiredHashStreamValidator) return hashStreamValidator;
  hasRequiredHashStreamValidator = 1;
  var __classPrivateFieldSet = hashStreamValidator && hashStreamValidator.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = hashStreamValidator && hashStreamValidator.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _HashStreamValidator_crc32cHash, _HashStreamValidator_md5Hash, _HashStreamValidator_md5Digest;
  Object.defineProperty(hashStreamValidator, "__esModule", { value: true });
  hashStreamValidator.HashStreamValidator = void 0;
  const crypto_1 = require$$0$2;
  const stream_1 = require$$0$1;
  const crc32c_js_1 = requireCrc32c();
  const file_js_1 = requireFile();
  class HashStreamValidator extends stream_1.Transform {
    constructor(options = {}) {
      super();
      this.updateHashesOnly = false;
      _HashStreamValidator_crc32cHash.set(this, void 0);
      _HashStreamValidator_md5Hash.set(this, void 0);
      _HashStreamValidator_md5Digest.set(this, "");
      this.crc32cEnabled = !!options.crc32c;
      this.md5Enabled = !!options.md5;
      this.updateHashesOnly = !!options.updateHashesOnly;
      this.crc32cExpected = options.crc32cExpected;
      this.md5Expected = options.md5Expected;
      if (this.crc32cEnabled) {
        if (options.crc32cInstance) {
          __classPrivateFieldSet(this, _HashStreamValidator_crc32cHash, options.crc32cInstance, "f");
        } else {
          const crc32cGenerator = options.crc32cGenerator || crc32c_js_1.CRC32C_DEFAULT_VALIDATOR_GENERATOR;
          __classPrivateFieldSet(this, _HashStreamValidator_crc32cHash, crc32cGenerator(), "f");
        }
      }
      if (this.md5Enabled) {
        __classPrivateFieldSet(this, _HashStreamValidator_md5Hash, (0, crypto_1.createHash)("md5"), "f");
      }
    }
    /**
     * Return the current CRC32C value, if available.
     */
    get crc32c() {
      var _a;
      return (_a = __classPrivateFieldGet(this, _HashStreamValidator_crc32cHash, "f")) === null || _a === void 0 ? void 0 : _a.toString();
    }
    /**
     * Return the calculated MD5 value, if available.
     */
    get md5Digest() {
      if (__classPrivateFieldGet(this, _HashStreamValidator_md5Hash, "f") && !__classPrivateFieldGet(this, _HashStreamValidator_md5Digest, "f")) {
        __classPrivateFieldSet(this, _HashStreamValidator_md5Digest, __classPrivateFieldGet(this, _HashStreamValidator_md5Hash, "f").digest("base64"), "f");
      }
      return __classPrivateFieldGet(this, _HashStreamValidator_md5Digest, "f");
    }
    _flush(callback) {
      this.md5Digest;
      if (this.updateHashesOnly) {
        callback();
        return;
      }
      let failed = this.crc32cEnabled || this.md5Enabled;
      if (this.crc32cEnabled && this.crc32cExpected) {
        failed = !this.test("crc32c", this.crc32cExpected);
      }
      if (this.md5Enabled && this.md5Expected) {
        failed = !this.test("md5", this.md5Expected);
      }
      if (failed) {
        const mismatchError = new file_js_1.RequestError(file_js_1.FileExceptionMessages.DOWNLOAD_MISMATCH);
        mismatchError.code = "CONTENT_DOWNLOAD_MISMATCH";
        callback(mismatchError);
      } else {
        callback();
      }
    }
    _transform(chunk, encoding, callback) {
      this.push(chunk, encoding);
      try {
        if (__classPrivateFieldGet(this, _HashStreamValidator_crc32cHash, "f"))
          __classPrivateFieldGet(this, _HashStreamValidator_crc32cHash, "f").update(chunk);
        if (__classPrivateFieldGet(this, _HashStreamValidator_md5Hash, "f"))
          __classPrivateFieldGet(this, _HashStreamValidator_md5Hash, "f").update(chunk);
        callback();
      } catch (e) {
        callback(e);
      }
    }
    test(hash, sum) {
      const check = Buffer.isBuffer(sum) ? sum.toString("base64") : sum;
      if (hash === "crc32c" && __classPrivateFieldGet(this, _HashStreamValidator_crc32cHash, "f")) {
        return __classPrivateFieldGet(this, _HashStreamValidator_crc32cHash, "f").validate(check);
      }
      if (hash === "md5" && __classPrivateFieldGet(this, _HashStreamValidator_md5Hash, "f")) {
        return __classPrivateFieldGet(this, _HashStreamValidator_md5Digest, "f") === check;
      }
      return false;
    }
  }
  hashStreamValidator.HashStreamValidator = HashStreamValidator;
  _HashStreamValidator_crc32cHash = /* @__PURE__ */ new WeakMap(), _HashStreamValidator_md5Hash = /* @__PURE__ */ new WeakMap(), _HashStreamValidator_md5Digest = /* @__PURE__ */ new WeakMap();
  return hashStreamValidator;
}
var hasRequiredResumableUpload;
function requireResumableUpload() {
  if (hasRequiredResumableUpload) return resumableUpload;
  hasRequiredResumableUpload = 1;
  (function(exports) {
    var __createBinding = resumableUpload && resumableUpload.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = resumableUpload && resumableUpload.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = resumableUpload && resumableUpload.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __classPrivateFieldSet = resumableUpload && resumableUpload.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = resumableUpload && resumableUpload.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __importDefault = resumableUpload && resumableUpload.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _Upload_instances, _Upload_hashValidator, _Upload_clientCrc32c, _Upload_clientMd5Hash, _Upload_gcclGcsCmd, _Upload_resetLocalBuffersCache, _Upload_addLocalBufferCache, _Upload_validateChecksum, _Upload_applyChecksumHeaders;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Upload = exports.PROTOCOL_REGEX = void 0;
    exports.upload = upload;
    exports.createURI = createURI;
    exports.checkUploadStatus = checkUploadStatus;
    const abort_controller_1 = __importDefault(require$$0$5);
    const crypto_1 = require$$0$2;
    const gaxios = __importStar(requireSrc$5());
    const google_auth_library_1 = requireSrc$2();
    const stream_1 = require$$0$1;
    const async_retry_1 = __importDefault(requireLib());
    const crypto = __importStar(require$$0$2);
    const util_js_1 = requireUtil$1();
    const util_js_2 = requireUtil();
    const file_js_1 = requireFile();
    const package_json_helper_cjs_1 = requirePackageJsonHelper();
    const hash_stream_validator_js_1 = requireHashStreamValidator();
    const NOT_FOUND_STATUS_CODE = 404;
    const RESUMABLE_INCOMPLETE_STATUS_CODE = 308;
    const packageJson = (0, package_json_helper_cjs_1.getPackageJSON)();
    exports.PROTOCOL_REGEX = /^(\w*):\/\//;
    class Upload extends stream_1.Writable {
      constructor(cfg) {
        var _a;
        super(cfg);
        _Upload_instances.add(this);
        this.numBytesWritten = 0;
        this.numRetries = 0;
        this.currentInvocationId = {
          checkUploadStatus: crypto.randomUUID(),
          chunk: crypto.randomUUID(),
          uri: crypto.randomUUID()
        };
        this.writeBuffers = [];
        this.numChunksReadInRequest = 0;
        _Upload_hashValidator.set(this, void 0);
        _Upload_clientCrc32c.set(this, void 0);
        _Upload_clientMd5Hash.set(this, void 0);
        this.localWriteCache = [];
        this.localWriteCacheByteLength = 0;
        this.upstreamEnded = false;
        _Upload_gcclGcsCmd.set(this, void 0);
        cfg = cfg || {};
        if (!cfg.bucket || !cfg.file) {
          throw new Error("A bucket and file name are required");
        }
        if (cfg.offset && !cfg.uri) {
          throw new RangeError("Cannot provide an `offset` without providing a `uri`");
        }
        if (cfg.isPartialUpload && !cfg.chunkSize) {
          throw new RangeError("Cannot set `isPartialUpload` without providing a `chunkSize`");
        }
        cfg.authConfig = cfg.authConfig || {};
        cfg.authConfig.scopes = [
          "https://www.googleapis.com/auth/devstorage.full_control"
        ];
        this.authClient = cfg.authClient || new google_auth_library_1.GoogleAuth(cfg.authConfig);
        const universe = cfg.universeDomain || google_auth_library_1.DEFAULT_UNIVERSE;
        this.apiEndpoint = `https://storage.${universe}`;
        if (cfg.apiEndpoint && cfg.apiEndpoint !== this.apiEndpoint) {
          this.apiEndpoint = this.sanitizeEndpoint(cfg.apiEndpoint);
          const hostname = new URL(this.apiEndpoint).hostname;
          const isDomain = hostname === universe;
          const isDefaultUniverseDomain = hostname === google_auth_library_1.DEFAULT_UNIVERSE;
          const isSubDomainOfUniverse = hostname.slice(-(universe.length + 1)) === `.${universe}`;
          const isSubDomainOfDefaultUniverse = hostname.slice(-(google_auth_library_1.DEFAULT_UNIVERSE.length + 1)) === `.${google_auth_library_1.DEFAULT_UNIVERSE}`;
          if (!isDomain && !isDefaultUniverseDomain && !isSubDomainOfUniverse && !isSubDomainOfDefaultUniverse) {
            if (cfg.useAuthWithCustomEndpoint !== true) {
              this.authClient = gaxios;
            }
          }
        }
        this.baseURI = `${this.apiEndpoint}/upload/storage/v1/b`;
        this.bucket = cfg.bucket;
        const cacheKeyElements = [cfg.bucket, cfg.file];
        if (typeof cfg.generation === "number") {
          cacheKeyElements.push(`${cfg.generation}`);
        }
        this.cacheKey = cacheKeyElements.join("/");
        this.customRequestOptions = cfg.customRequestOptions || {};
        this.file = cfg.file;
        this.generation = cfg.generation;
        this.kmsKeyName = cfg.kmsKeyName;
        this.metadata = cfg.metadata || {};
        this.offset = cfg.offset;
        this.origin = cfg.origin;
        this.params = cfg.params || {};
        this.userProject = cfg.userProject;
        this.chunkSize = cfg.chunkSize;
        this.retryOptions = cfg.retryOptions;
        this.isPartialUpload = (_a = cfg.isPartialUpload) !== null && _a !== void 0 ? _a : false;
        __classPrivateFieldSet(this, _Upload_clientCrc32c, cfg.clientCrc32c, "f");
        __classPrivateFieldSet(this, _Upload_clientMd5Hash, cfg.clientMd5Hash, "f");
        const calculateCrc32c = !cfg.clientCrc32c && cfg.crc32c;
        const calculateMd5 = !cfg.clientMd5Hash && cfg.md5;
        if (calculateCrc32c || calculateMd5) {
          __classPrivateFieldSet(this, _Upload_hashValidator, new hash_stream_validator_js_1.HashStreamValidator({
            crc32c: calculateCrc32c,
            md5: calculateMd5,
            updateHashesOnly: true
          }), "f");
        }
        if (cfg.key) {
          if (typeof cfg.key === "string") {
            const base64Key = Buffer.from(cfg.key).toString("base64");
            this.encryption = {
              key: base64Key,
              hash: (0, crypto_1.createHash)("sha256").update(cfg.key).digest("base64")
            };
          } else {
            const base64Key = cfg.key.toString("base64");
            this.encryption = {
              key: base64Key,
              hash: (0, crypto_1.createHash)("sha256").update(cfg.key).digest("base64")
            };
          }
        }
        this.predefinedAcl = cfg.predefinedAcl;
        if (cfg.private)
          this.predefinedAcl = "private";
        if (cfg.public)
          this.predefinedAcl = "publicRead";
        const autoRetry = cfg.retryOptions.autoRetry;
        this.uriProvidedManually = !!cfg.uri;
        this.uri = cfg.uri;
        if (this.offset) {
          this.numBytesWritten = this.offset;
        }
        this.numRetries = 0;
        if (!autoRetry) {
          cfg.retryOptions.maxRetries = 0;
        }
        this.timeOfFirstRequest = Date.now();
        const contentLength = cfg.metadata ? Number(cfg.metadata.contentLength) : NaN;
        this.contentLength = isNaN(contentLength) ? "*" : contentLength;
        __classPrivateFieldSet(this, _Upload_gcclGcsCmd, cfg[util_js_2.GCCL_GCS_CMD_KEY], "f");
        this.once("writing", () => {
          if (this.uri) {
            this.continueUploading();
          } else {
            this.createURI((err) => {
              if (err) {
                return this.destroy(err);
              }
              this.startUploading();
              return;
            });
          }
        });
      }
      /**
       * Prevent 'finish' event until the upload has succeeded.
       *
       * @param fireFinishEvent The finish callback
       */
      _final(fireFinishEvent = () => {
      }) {
        this.upstreamEnded = true;
        this.once("uploadFinished", fireFinishEvent);
        process.nextTick(() => {
          this.emit("upstreamFinished");
          this.emit("writing");
        });
      }
      /**
       * Handles incoming data from upstream
       *
       * @param chunk The chunk to append to the buffer
       * @param encoding The encoding of the chunk
       * @param readCallback A callback for when the buffer has been read downstream
       */
      _write(chunk, encoding, readCallback = () => {
      }) {
        this.emit("writing");
        const bufferChunk = typeof chunk === "string" ? Buffer.from(chunk, encoding) : chunk;
        if (__classPrivateFieldGet(this, _Upload_hashValidator, "f")) {
          try {
            __classPrivateFieldGet(this, _Upload_hashValidator, "f").write(bufferChunk);
          } catch (e) {
            this.destroy(e);
            return;
          }
        }
        this.writeBuffers.push(bufferChunk);
        this.once("readFromChunkBuffer", readCallback);
        process.nextTick(() => this.emit("wroteToChunkBuffer"));
      }
      /**
       * Prepends the local buffer to write buffer and resets it.
       *
       * @param keepLastBytes number of bytes to keep from the end of the local buffer.
       */
      prependLocalBufferToUpstream(keepLastBytes) {
        let initialBuffers = [];
        if (keepLastBytes) {
          let bytesKept = 0;
          while (keepLastBytes > bytesKept) {
            let buf = this.localWriteCache.pop();
            if (!buf)
              break;
            bytesKept += buf.byteLength;
            if (bytesKept > keepLastBytes) {
              const diff = bytesKept - keepLastBytes;
              buf = buf.subarray(diff);
              bytesKept -= diff;
            }
            initialBuffers.unshift(buf);
          }
        } else {
          initialBuffers = this.localWriteCache;
        }
        const append = this.writeBuffers;
        this.writeBuffers = initialBuffers;
        for (const buf of append) {
          this.writeBuffers.push(buf);
        }
        __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_resetLocalBuffersCache).call(this);
      }
      /**
       * Retrieves data from upstream's buffer.
       *
       * @param limit The maximum amount to return from the buffer.
       */
      *pullFromChunkBuffer(limit) {
        while (limit) {
          const buf = this.writeBuffers.shift();
          if (!buf)
            break;
          let bufToYield = buf;
          if (buf.byteLength > limit) {
            bufToYield = buf.subarray(0, limit);
            this.writeBuffers.unshift(buf.subarray(limit));
            limit = 0;
          } else {
            limit -= buf.byteLength;
          }
          yield bufToYield;
          this.emit("readFromChunkBuffer");
        }
      }
      /**
       * A handler for determining if data is ready to be read from upstream.
       *
       * @returns If there will be more chunks to read in the future
       */
      async waitForNextChunk() {
        const willBeMoreChunks = await new Promise((resolve) => {
          if (this.writeBuffers.length) {
            return resolve(true);
          }
          if (this.upstreamEnded) {
            return resolve(false);
          }
          const wroteToChunkBufferCallback = () => {
            removeListeners();
            return resolve(true);
          };
          const upstreamFinishedCallback = () => {
            removeListeners();
            if (this.writeBuffers.length)
              return resolve(true);
            return resolve(false);
          };
          const removeListeners = () => {
            this.removeListener("wroteToChunkBuffer", wroteToChunkBufferCallback);
            this.removeListener("upstreamFinished", upstreamFinishedCallback);
          };
          this.once("wroteToChunkBuffer", wroteToChunkBufferCallback);
          this.once("upstreamFinished", upstreamFinishedCallback);
        });
        return willBeMoreChunks;
      }
      /**
       * Reads data from upstream up to the provided `limit`.
       * Ends when the limit has reached or no data is expected to be pushed from upstream.
       *
       * @param limit The most amount of data this iterator should return. `Infinity` by default.
       */
      async *upstreamIterator(limit = Infinity) {
        while (limit && await this.waitForNextChunk()) {
          for (const chunk of this.pullFromChunkBuffer(limit)) {
            limit -= chunk.byteLength;
            yield chunk;
          }
        }
      }
      createURI(callback) {
        if (!callback) {
          return this.createURIAsync();
        }
        this.createURIAsync().then((r) => callback(null, r), callback);
      }
      async createURIAsync() {
        const metadata = { ...this.metadata };
        const headers = {};
        if (metadata.contentLength) {
          headers["X-Upload-Content-Length"] = metadata.contentLength.toString();
          delete metadata.contentLength;
        }
        if (metadata.contentType) {
          headers["X-Upload-Content-Type"] = metadata.contentType;
          delete metadata.contentType;
        }
        let googAPIClient = `${(0, util_js_1.getRuntimeTrackingString)()} gccl/${packageJson.version}-${(0, util_js_1.getModuleFormat)()} gccl-invocation-id/${this.currentInvocationId.uri}`;
        if (__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")) {
          googAPIClient += ` gccl-gcs-cmd/${__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")}`;
        }
        const reqOpts = {
          method: "POST",
          url: [this.baseURI, this.bucket, "o"].join("/"),
          params: Object.assign({
            name: this.file,
            uploadType: "resumable"
          }, this.params),
          data: metadata,
          headers: {
            "User-Agent": (0, util_js_1.getUserAgentString)(),
            "x-goog-api-client": googAPIClient,
            ...headers
          }
        };
        if (metadata.contentLength) {
          reqOpts.headers["X-Upload-Content-Length"] = metadata.contentLength.toString();
        }
        if (metadata.contentType) {
          reqOpts.headers["X-Upload-Content-Type"] = metadata.contentType;
        }
        if (typeof this.generation !== "undefined") {
          reqOpts.params.ifGenerationMatch = this.generation;
        }
        if (this.kmsKeyName) {
          reqOpts.params.kmsKeyName = this.kmsKeyName;
        }
        if (this.predefinedAcl) {
          reqOpts.params.predefinedAcl = this.predefinedAcl;
        }
        if (this.origin) {
          reqOpts.headers.Origin = this.origin;
        }
        const uri = await (0, async_retry_1.default)(async (bail) => {
          var _a, _b, _c;
          try {
            const res = await this.makeRequest(reqOpts);
            this.currentInvocationId.uri = crypto.randomUUID();
            return res.headers.location;
          } catch (err) {
            const e = err;
            const apiError = {
              code: (_a = e.response) === null || _a === void 0 ? void 0 : _a.status,
              name: (_b = e.response) === null || _b === void 0 ? void 0 : _b.statusText,
              message: (_c = e.response) === null || _c === void 0 ? void 0 : _c.statusText,
              errors: [
                {
                  reason: e.code
                }
              ]
            };
            if (this.retryOptions.maxRetries > 0 && this.retryOptions.retryableErrorFn(apiError)) {
              throw e;
            } else {
              return bail(e);
            }
          }
        }, {
          retries: this.retryOptions.maxRetries,
          factor: this.retryOptions.retryDelayMultiplier,
          maxTimeout: this.retryOptions.maxRetryDelay * 1e3,
          //convert to milliseconds
          maxRetryTime: this.retryOptions.totalTimeout * 1e3
          //convert to milliseconds
        });
        this.uri = uri;
        this.offset = 0;
        this.emit("uri", uri);
        return uri;
      }
      async continueUploading() {
        var _a;
        (_a = this.offset) !== null && _a !== void 0 ? _a : await this.getAndSetOffset();
        return this.startUploading();
      }
      async startUploading() {
        const multiChunkMode = !!this.chunkSize;
        let responseReceived = false;
        this.numChunksReadInRequest = 0;
        if (!this.offset) {
          this.offset = 0;
        }
        if (this.offset < this.numBytesWritten) {
          const delta = this.numBytesWritten - this.offset;
          const message = `The offset is lower than the number of bytes written. The server has ${this.offset} bytes and while ${this.numBytesWritten} bytes has been uploaded - thus ${delta} bytes are missing. Stopping as this could result in data loss. Initiate a new upload to continue.`;
          this.emit("error", new RangeError(message));
          return;
        }
        if (this.numBytesWritten < this.offset) {
          const fastForwardBytes = this.offset - this.numBytesWritten;
          for await (const _chunk of this.upstreamIterator(fastForwardBytes)) {
          }
          this.numBytesWritten = this.offset;
        }
        let expectedUploadSize = void 0;
        if (typeof this.contentLength === "number") {
          expectedUploadSize = this.contentLength - this.numBytesWritten;
        }
        if (this.chunkSize) {
          expectedUploadSize = expectedUploadSize ? Math.min(this.chunkSize, expectedUploadSize) : this.chunkSize;
        }
        const upstreamQueue = this.upstreamIterator(expectedUploadSize);
        const requestStream = new stream_1.Readable({
          read: async () => {
            if (responseReceived)
              requestStream.push(null);
            const result = await upstreamQueue.next();
            if (result.value) {
              this.numChunksReadInRequest++;
              if (multiChunkMode) {
                __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_addLocalBufferCache).call(this, result.value);
              } else {
                __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_resetLocalBuffersCache).call(this);
                __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_addLocalBufferCache).call(this, result.value);
              }
              this.numBytesWritten += result.value.byteLength;
              this.emit("progress", {
                bytesWritten: this.numBytesWritten,
                contentLength: this.contentLength
              });
              requestStream.push(result.value);
            }
            if (result.done) {
              requestStream.push(null);
            }
          }
        });
        let googAPIClient = `${(0, util_js_1.getRuntimeTrackingString)()} gccl/${packageJson.version}-${(0, util_js_1.getModuleFormat)()} gccl-invocation-id/${this.currentInvocationId.chunk}`;
        if (__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")) {
          googAPIClient += ` gccl-gcs-cmd/${__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")}`;
        }
        const headers = {
          "User-Agent": (0, util_js_1.getUserAgentString)(),
          "x-goog-api-client": googAPIClient
        };
        if (multiChunkMode) {
          for await (const chunk of this.upstreamIterator(expectedUploadSize)) {
            __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_addLocalBufferCache).call(this, chunk);
          }
          const bytesToUpload = this.localWriteCacheByteLength;
          const isLastChunkOfUpload = !await this.waitForNextChunk();
          if (isLastChunkOfUpload && __classPrivateFieldGet(this, _Upload_hashValidator, "f")) {
            __classPrivateFieldGet(this, _Upload_hashValidator, "f").end();
          }
          this.prependLocalBufferToUpstream();
          let totalObjectSize = this.contentLength;
          if (typeof this.contentLength !== "number" && isLastChunkOfUpload && !this.isPartialUpload) {
            totalObjectSize = bytesToUpload + this.numBytesWritten;
          }
          const endingByte = bytesToUpload + this.numBytesWritten - 1;
          headers["Content-Length"] = bytesToUpload;
          headers["Content-Range"] = `bytes ${this.offset}-${endingByte}/${totalObjectSize}`;
          if (isLastChunkOfUpload) {
            __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_applyChecksumHeaders).call(this, headers);
          }
        } else {
          headers["Content-Range"] = `bytes ${this.offset}-*/${this.contentLength}`;
          if (__classPrivateFieldGet(this, _Upload_hashValidator, "f")) {
            __classPrivateFieldGet(this, _Upload_hashValidator, "f").end();
          }
          __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_applyChecksumHeaders).call(this, headers);
        }
        const reqOpts = {
          method: "PUT",
          url: this.uri,
          headers,
          body: requestStream
        };
        try {
          const resp = await this.makeRequestStream(reqOpts);
          if (resp) {
            responseReceived = true;
            await this.responseHandler(resp);
          }
        } catch (e) {
          const err = e;
          if (this.retryOptions.retryableErrorFn(err)) {
            this.attemptDelayedRetry({
              status: NaN,
              data: err
            });
            return;
          }
          this.destroy(err);
        }
      }
      // Process the API response to look for errors that came in
      // the response body.
      async responseHandler(resp) {
        var _a, _b;
        if (resp.data.error) {
          this.destroy(resp.data.error);
          return;
        }
        this.currentInvocationId.chunk = crypto.randomUUID();
        const moreDataToUpload = await this.waitForNextChunk();
        const shouldContinueWithNextMultiChunkRequest = this.chunkSize && resp.status === RESUMABLE_INCOMPLETE_STATUS_CODE && resp.headers.range && moreDataToUpload;
        const shouldContinueUploadInAnotherRequest = this.isPartialUpload && resp.status === RESUMABLE_INCOMPLETE_STATUS_CODE && !moreDataToUpload;
        if (shouldContinueWithNextMultiChunkRequest) {
          const range = resp.headers.range;
          this.offset = Number(range.split("-")[1]) + 1;
          const missingBytes = this.numBytesWritten - this.offset;
          if (missingBytes) {
            this.prependLocalBufferToUpstream(missingBytes);
            this.numBytesWritten -= missingBytes;
          } else {
            __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_resetLocalBuffersCache).call(this);
          }
          this.continueUploading();
        } else if (!this.isSuccessfulResponse(resp.status) && !shouldContinueUploadInAnotherRequest) {
          const err = new Error("Upload failed");
          err.code = resp.status;
          err.name = "Upload failed";
          if (resp === null || resp === void 0 ? void 0 : resp.data) {
            err.errors = [resp === null || resp === void 0 ? void 0 : resp.data];
          }
          this.destroy(err);
        } else if (this.isSuccessfulResponse(resp.status)) {
          const serverCrc32c = resp.data.crc32c;
          const serverMd5 = resp.data.md5Hash;
          if (__classPrivateFieldGet(this, _Upload_hashValidator, "f")) {
            __classPrivateFieldGet(this, _Upload_hashValidator, "f").end();
          }
          const clientCrc32cToValidate = ((_a = __classPrivateFieldGet(this, _Upload_hashValidator, "f")) === null || _a === void 0 ? void 0 : _a.crc32c) || __classPrivateFieldGet(this, _Upload_clientCrc32c, "f");
          const clientMd5HashToValidate = ((_b = __classPrivateFieldGet(this, _Upload_hashValidator, "f")) === null || _b === void 0 ? void 0 : _b.md5Digest) || __classPrivateFieldGet(this, _Upload_clientMd5Hash, "f");
          if (__classPrivateFieldGet(this, _Upload_instances, "m", _Upload_validateChecksum).call(this, clientCrc32cToValidate, serverCrc32c, "CRC32C") || __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_validateChecksum).call(this, clientMd5HashToValidate, serverMd5, "MD5")) {
            return;
          }
          __classPrivateFieldGet(this, _Upload_instances, "m", _Upload_resetLocalBuffersCache).call(this);
          if (resp && resp.data) {
            resp.data.size = Number(resp.data.size);
          }
          this.emit("metadata", resp.data);
          this.emit("uploadFinished");
        } else {
          this.emit("uploadFinished");
        }
      }
      /**
       * Check the status of an existing resumable upload.
       *
       * @param cfg A configuration to use. `uri` is required.
       * @returns the current upload status
       */
      async checkUploadStatus(config = {}) {
        let googAPIClient = `${(0, util_js_1.getRuntimeTrackingString)()} gccl/${packageJson.version}-${(0, util_js_1.getModuleFormat)()} gccl-invocation-id/${this.currentInvocationId.checkUploadStatus}`;
        if (__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")) {
          googAPIClient += ` gccl-gcs-cmd/${__classPrivateFieldGet(this, _Upload_gcclGcsCmd, "f")}`;
        }
        const opts = {
          method: "PUT",
          url: this.uri,
          headers: {
            "Content-Length": 0,
            "Content-Range": "bytes */*",
            "User-Agent": (0, util_js_1.getUserAgentString)(),
            "x-goog-api-client": googAPIClient
          }
        };
        try {
          const resp = await this.makeRequest(opts);
          this.currentInvocationId.checkUploadStatus = crypto.randomUUID();
          return resp;
        } catch (e) {
          if (config.retry === false || !(e instanceof Error) || !this.retryOptions.retryableErrorFn(e)) {
            throw e;
          }
          const retryDelay = this.getRetryDelay();
          if (retryDelay <= 0) {
            throw e;
          }
          await new Promise((res) => setTimeout(res, retryDelay));
          return this.checkUploadStatus(config);
        }
      }
      async getAndSetOffset() {
        try {
          const resp = await this.checkUploadStatus({ retry: false });
          if (resp.status === RESUMABLE_INCOMPLETE_STATUS_CODE) {
            if (typeof resp.headers.range === "string") {
              this.offset = Number(resp.headers.range.split("-")[1]) + 1;
              return;
            }
          }
          this.offset = 0;
        } catch (e) {
          const err = e;
          if (this.retryOptions.retryableErrorFn(err)) {
            this.attemptDelayedRetry({
              status: NaN,
              data: err
            });
            return;
          }
          this.destroy(err);
        }
      }
      async makeRequest(reqOpts) {
        if (this.encryption) {
          reqOpts.headers = reqOpts.headers || {};
          reqOpts.headers["x-goog-encryption-algorithm"] = "AES256";
          reqOpts.headers["x-goog-encryption-key"] = this.encryption.key.toString();
          reqOpts.headers["x-goog-encryption-key-sha256"] = this.encryption.hash.toString();
        }
        if (this.userProject) {
          reqOpts.params = reqOpts.params || {};
          reqOpts.params.userProject = this.userProject;
        }
        reqOpts.validateStatus = (status) => {
          return this.isSuccessfulResponse(status) || status === RESUMABLE_INCOMPLETE_STATUS_CODE;
        };
        const combinedReqOpts = {
          ...this.customRequestOptions,
          ...reqOpts,
          headers: {
            ...this.customRequestOptions.headers,
            ...reqOpts.headers
          }
        };
        const res = await this.authClient.request(combinedReqOpts);
        if (res.data && res.data.error) {
          throw res.data.error;
        }
        return res;
      }
      async makeRequestStream(reqOpts) {
        const controller = new abort_controller_1.default();
        const errorCallback = () => controller.abort();
        this.once("error", errorCallback);
        if (this.userProject) {
          reqOpts.params = reqOpts.params || {};
          reqOpts.params.userProject = this.userProject;
        }
        reqOpts.signal = controller.signal;
        reqOpts.validateStatus = () => true;
        const combinedReqOpts = {
          ...this.customRequestOptions,
          ...reqOpts,
          headers: {
            ...this.customRequestOptions.headers,
            ...reqOpts.headers
          }
        };
        const res = await this.authClient.request(combinedReqOpts);
        const successfulRequest = this.onResponse(res);
        this.removeListener("error", errorCallback);
        return successfulRequest ? res : null;
      }
      /**
       * @return {bool} is the request good?
       */
      onResponse(resp) {
        if (resp.status !== 200 && this.retryOptions.retryableErrorFn({
          code: resp.status,
          message: resp.statusText,
          name: resp.statusText
        })) {
          this.attemptDelayedRetry(resp);
          return false;
        }
        this.emit("response", resp);
        return true;
      }
      /**
       * @param resp GaxiosResponse object from previous attempt
       */
      attemptDelayedRetry(resp) {
        if (this.numRetries < this.retryOptions.maxRetries) {
          if (resp.status === NOT_FOUND_STATUS_CODE && this.numChunksReadInRequest === 0) {
            this.startUploading();
          } else {
            const retryDelay = this.getRetryDelay();
            if (retryDelay <= 0) {
              this.destroy(new Error(`Retry total time limit exceeded - ${JSON.stringify(resp.data)}`));
              return;
            }
            this.numBytesWritten -= this.localWriteCacheByteLength;
            this.prependLocalBufferToUpstream();
            this.offset = void 0;
            setTimeout(this.continueUploading.bind(this), retryDelay);
          }
          this.numRetries++;
        } else {
          this.destroy(new Error(`Retry limit exceeded - ${JSON.stringify(resp.data)}`));
        }
      }
      /**
       * The amount of time to wait before retrying the request, in milliseconds.
       * If negative, do not retry.
       *
       * @returns the amount of time to wait, in milliseconds.
       */
      getRetryDelay() {
        const randomMs = Math.round(Math.random() * 1e3);
        const waitTime = Math.pow(this.retryOptions.retryDelayMultiplier, this.numRetries) * 1e3 + randomMs;
        const maxAllowableDelayMs = this.retryOptions.totalTimeout * 1e3 - (Date.now() - this.timeOfFirstRequest);
        const maxRetryDelayMs = this.retryOptions.maxRetryDelay * 1e3;
        return Math.min(waitTime, maxRetryDelayMs, maxAllowableDelayMs);
      }
      /*
       * Prepare user-defined API endpoint for compatibility with our API.
       */
      sanitizeEndpoint(url) {
        if (!exports.PROTOCOL_REGEX.test(url)) {
          url = `https://${url}`;
        }
        return url.replace(/\/+$/, "");
      }
      /**
       * Check if a given status code is 2xx
       *
       * @param status The status code to check
       * @returns if the status is 2xx
       */
      isSuccessfulResponse(status) {
        return status >= 200 && status < 300;
      }
    }
    exports.Upload = Upload;
    _Upload_hashValidator = /* @__PURE__ */ new WeakMap(), _Upload_clientCrc32c = /* @__PURE__ */ new WeakMap(), _Upload_clientMd5Hash = /* @__PURE__ */ new WeakMap(), _Upload_gcclGcsCmd = /* @__PURE__ */ new WeakMap(), _Upload_instances = /* @__PURE__ */ new WeakSet(), _Upload_resetLocalBuffersCache = function _Upload_resetLocalBuffersCache2() {
      this.localWriteCache = [];
      this.localWriteCacheByteLength = 0;
    }, _Upload_addLocalBufferCache = function _Upload_addLocalBufferCache2(buf) {
      this.localWriteCache.push(buf);
      this.localWriteCacheByteLength += buf.byteLength;
    }, _Upload_validateChecksum = function _Upload_validateChecksum2(clientHash, serverHash, hashType) {
      if (clientHash && serverHash) {
        if (clientHash !== serverHash) {
          const detailMessage = `${hashType} checksum mismatch. Client calculated: ${clientHash}, Server returned: ${serverHash}`;
          const detailError = new Error(detailMessage);
          const error = new file_js_1.RequestError(file_js_1.FileExceptionMessages.UPLOAD_MISMATCH);
          error.code = "FILE_NO_UPLOAD";
          error.errors = [detailError];
          this.destroy(error);
          return true;
        }
      }
      return false;
    }, _Upload_applyChecksumHeaders = function _Upload_applyChecksumHeaders2(headers) {
      var _a, _b;
      const checksums = [];
      if ((_a = __classPrivateFieldGet(this, _Upload_hashValidator, "f")) === null || _a === void 0 ? void 0 : _a.crc32cEnabled) {
        checksums.push(`crc32c=${__classPrivateFieldGet(this, _Upload_hashValidator, "f").crc32c}`);
      } else if (__classPrivateFieldGet(this, _Upload_clientCrc32c, "f")) {
        checksums.push(`crc32c=${__classPrivateFieldGet(this, _Upload_clientCrc32c, "f")}`);
      }
      if ((_b = __classPrivateFieldGet(this, _Upload_hashValidator, "f")) === null || _b === void 0 ? void 0 : _b.md5Enabled) {
        checksums.push(`md5=${__classPrivateFieldGet(this, _Upload_hashValidator, "f").md5Digest}`);
      } else if (__classPrivateFieldGet(this, _Upload_clientMd5Hash, "f")) {
        checksums.push(`md5=${__classPrivateFieldGet(this, _Upload_clientMd5Hash, "f")}`);
      }
      if (checksums.length > 0) {
        headers["X-Goog-Hash"] = checksums.join(",");
      }
    };
    function upload(cfg) {
      return new Upload(cfg);
    }
    function createURI(cfg, callback) {
      const up = new Upload(cfg);
      if (!callback) {
        return up.createURI();
      }
      up.createURI().then((r) => callback(null, r), callback);
    }
    function checkUploadStatus(cfg) {
      const up = new Upload(cfg);
      return up.checkUploadStatus();
    }
  })(resumableUpload);
  return resumableUpload;
}
var signer = {};
var hasRequiredSigner;
function requireSigner() {
  if (hasRequiredSigner) return signer;
  hasRequiredSigner = 1;
  var __createBinding = signer && signer.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __setModuleDefault = signer && signer.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = signer && signer.__importStar || /* @__PURE__ */ (function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
  Object.defineProperty(signer, "__esModule", { value: true });
  signer.SigningError = signer.URLSigner = signer.PATH_STYLED_HOST = signer.SignerExceptionMessages = void 0;
  const crypto = __importStar(require$$0$2);
  const url = __importStar(Url);
  const storage_js_1 = requireStorage();
  const util_js_1 = requireUtil$1();
  var SignerExceptionMessages;
  (function(SignerExceptionMessages2) {
    SignerExceptionMessages2["ACCESSIBLE_DATE_INVALID"] = "The accessible at date provided was invalid.";
    SignerExceptionMessages2["EXPIRATION_BEFORE_ACCESSIBLE_DATE"] = "An expiration date cannot be before accessible date.";
    SignerExceptionMessages2["X_GOOG_CONTENT_SHA256"] = "The header X-Goog-Content-SHA256 must be a hexadecimal string.";
  })(SignerExceptionMessages || (signer.SignerExceptionMessages = SignerExceptionMessages = {}));
  const DEFAULT_SIGNING_VERSION = "v2";
  const SEVEN_DAYS = 7 * 24 * 60 * 60;
  signer.PATH_STYLED_HOST = "https://storage.googleapis.com";
  class URLSigner {
    constructor(auth, bucket2, file2, storage2 = new storage_js_1.Storage()) {
      this.auth = auth;
      this.bucket = bucket2;
      this.file = file2;
      this.storage = storage2;
    }
    getSignedUrl(cfg) {
      const expiresInSeconds = this.parseExpires(cfg.expires);
      const method = cfg.method;
      const accessibleAtInSeconds = this.parseAccessibleAt(cfg.accessibleAt);
      if (expiresInSeconds < accessibleAtInSeconds) {
        throw new Error(SignerExceptionMessages.EXPIRATION_BEFORE_ACCESSIBLE_DATE);
      }
      let customHost;
      const isVirtualHostedStyle = cfg.virtualHostedStyle || false;
      if (cfg.cname) {
        customHost = cfg.cname;
      } else if (isVirtualHostedStyle) {
        customHost = `https://${this.bucket.name}.storage.${this.storage.universeDomain}`;
      }
      const secondsToMilliseconds = 1e3;
      const config = Object.assign({}, cfg, {
        method,
        expiration: expiresInSeconds,
        accessibleAt: new Date(secondsToMilliseconds * accessibleAtInSeconds),
        bucket: this.bucket.name,
        file: this.file ? (0, util_js_1.encodeURI)(this.file.name, false) : void 0
      });
      if (customHost) {
        config.cname = customHost;
      }
      const version2 = cfg.version || DEFAULT_SIGNING_VERSION;
      let promise;
      if (version2 === "v2") {
        promise = this.getSignedUrlV2(config);
      } else if (version2 === "v4") {
        promise = this.getSignedUrlV4(config);
      } else {
        throw new Error(`Invalid signed URL version: ${version2}. Supported versions are 'v2' and 'v4'.`);
      }
      return promise.then((query) => {
        var _a;
        query = Object.assign(query, cfg.queryParams);
        const signedUrl = new url.URL(((_a = cfg.host) === null || _a === void 0 ? void 0 : _a.toString()) || config.cname || this.storage.apiEndpoint);
        signedUrl.pathname = this.getResourcePath(!!config.cname, this.bucket.name, config.file);
        signedUrl.search = (0, util_js_1.qsStringify)(query);
        return signedUrl.href;
      });
    }
    getSignedUrlV2(config) {
      const canonicalHeadersString = this.getCanonicalHeaders(config.extensionHeaders || {});
      const resourcePath = this.getResourcePath(false, config.bucket, config.file);
      const blobToSign = [
        config.method,
        config.contentMd5 || "",
        config.contentType || "",
        config.expiration,
        canonicalHeadersString + resourcePath
      ].join("\n");
      const sign = async () => {
        var _a;
        const auth = this.auth;
        try {
          const signature = await auth.sign(blobToSign, (_a = config.signingEndpoint) === null || _a === void 0 ? void 0 : _a.toString());
          const credentials = await auth.getCredentials();
          return {
            GoogleAccessId: credentials.client_email,
            Expires: config.expiration,
            Signature: signature
          };
        } catch (err) {
          const error = err;
          const signingErr = new SigningError(error.message);
          signingErr.stack = error.stack;
          throw signingErr;
        }
      };
      return sign();
    }
    getSignedUrlV4(config) {
      var _a;
      config.accessibleAt = config.accessibleAt ? config.accessibleAt : /* @__PURE__ */ new Date();
      const millisecondsToSeconds = 1 / 1e3;
      const expiresPeriodInSeconds = config.expiration - config.accessibleAt.valueOf() * millisecondsToSeconds;
      if (expiresPeriodInSeconds > SEVEN_DAYS) {
        throw new Error(`Max allowed expiration is seven days (${SEVEN_DAYS} seconds).`);
      }
      const extensionHeaders = Object.assign({}, config.extensionHeaders);
      const fqdn = new url.URL(((_a = config.host) === null || _a === void 0 ? void 0 : _a.toString()) || config.cname || this.storage.apiEndpoint);
      extensionHeaders.host = fqdn.hostname;
      if (config.contentMd5) {
        extensionHeaders["content-md5"] = config.contentMd5;
      }
      if (config.contentType) {
        extensionHeaders["content-type"] = config.contentType;
      }
      let contentSha256;
      const sha256Header = extensionHeaders["x-goog-content-sha256"];
      if (sha256Header) {
        if (typeof sha256Header !== "string" || !/[A-Fa-f0-9]{40}/.test(sha256Header)) {
          throw new Error(SignerExceptionMessages.X_GOOG_CONTENT_SHA256);
        }
        contentSha256 = sha256Header;
      }
      const signedHeaders = Object.keys(extensionHeaders).map((header) => header.toLowerCase()).sort().join(";");
      const extensionHeadersString = this.getCanonicalHeaders(extensionHeaders);
      const datestamp = (0, util_js_1.formatAsUTCISO)(config.accessibleAt);
      const credentialScope = `${datestamp}/auto/storage/goog4_request`;
      const sign = async () => {
        var _a2;
        const credentials = await this.auth.getCredentials();
        const credential = `${credentials.client_email}/${credentialScope}`;
        const dateISO = (0, util_js_1.formatAsUTCISO)(config.accessibleAt ? config.accessibleAt : /* @__PURE__ */ new Date(), true);
        const queryParams = {
          "X-Goog-Algorithm": "GOOG4-RSA-SHA256",
          "X-Goog-Credential": credential,
          "X-Goog-Date": dateISO,
          "X-Goog-Expires": expiresPeriodInSeconds.toString(10),
          "X-Goog-SignedHeaders": signedHeaders,
          ...config.queryParams || {}
        };
        const canonicalQueryParams = this.getCanonicalQueryParams(queryParams);
        const canonicalRequest = this.getCanonicalRequest(config.method, this.getResourcePath(!!config.cname, config.bucket, config.file), canonicalQueryParams, extensionHeadersString, signedHeaders, contentSha256);
        const hash = crypto.createHash("sha256").update(canonicalRequest).digest("hex");
        const blobToSign = [
          "GOOG4-RSA-SHA256",
          dateISO,
          credentialScope,
          hash
        ].join("\n");
        try {
          const signature = await this.auth.sign(blobToSign, (_a2 = config.signingEndpoint) === null || _a2 === void 0 ? void 0 : _a2.toString());
          const signatureHex = Buffer.from(signature, "base64").toString("hex");
          const signedQuery = Object.assign({}, queryParams, {
            "X-Goog-Signature": signatureHex
          });
          return signedQuery;
        } catch (err) {
          const error = err;
          const signingErr = new SigningError(error.message);
          signingErr.stack = error.stack;
          throw signingErr;
        }
      };
      return sign();
    }
    /**
     * Create canonical headers for signing v4 url.
     *
     * The canonical headers for v4-signing a request demands header names are
     * first lowercased, followed by sorting the header names.
     * Then, construct the canonical headers part of the request:
     *  <lowercasedHeaderName> + ":" + Trim(<value>) + "\n"
     *  ..
     *  <lowercasedHeaderName> + ":" + Trim(<value>) + "\n"
     *
     * @param headers
     * @private
     */
    getCanonicalHeaders(headers) {
      const sortedHeaders = (0, util_js_1.objectEntries)(headers).map(([headerName, value]) => [
        headerName.toLowerCase(),
        value
      ]).sort((a, b) => a[0].localeCompare(b[0]));
      return sortedHeaders.filter(([, value]) => value !== void 0).map(([headerName, value]) => {
        const canonicalValue = `${value}`.trim().replace(/\s{2,}/g, " ");
        return `${headerName}:${canonicalValue}
`;
      }).join("");
    }
    getCanonicalRequest(method, path, query, headers, signedHeaders, contentSha256) {
      return [
        method,
        path,
        query,
        headers,
        signedHeaders,
        contentSha256 || "UNSIGNED-PAYLOAD"
      ].join("\n");
    }
    getCanonicalQueryParams(query) {
      return (0, util_js_1.objectEntries)(query).map(([key, value]) => [(0, util_js_1.encodeURI)(key, true), (0, util_js_1.encodeURI)(value, true)]).sort((a, b) => a[0] < b[0] ? -1 : 1).map(([key, value]) => `${key}=${value}`).join("&");
    }
    getResourcePath(cname, bucket2, file2) {
      if (cname) {
        return "/" + (file2 || "");
      } else if (file2) {
        return `/${bucket2}/${file2}`;
      } else {
        return `/${bucket2}`;
      }
    }
    parseExpires(expires, current = /* @__PURE__ */ new Date()) {
      const expiresInMSeconds = new Date(expires).valueOf();
      if (isNaN(expiresInMSeconds)) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_INVALID);
      }
      if (expiresInMSeconds < current.valueOf()) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_PAST);
      }
      return Math.floor(expiresInMSeconds / 1e3);
    }
    parseAccessibleAt(accessibleAt) {
      const accessibleAtInMSeconds = new Date(accessibleAt || /* @__PURE__ */ new Date()).valueOf();
      if (isNaN(accessibleAtInMSeconds)) {
        throw new Error(SignerExceptionMessages.ACCESSIBLE_DATE_INVALID);
      }
      return Math.floor(accessibleAtInMSeconds / 1e3);
    }
  }
  signer.URLSigner = URLSigner;
  class SigningError extends Error {
    constructor() {
      super(...arguments);
      this.name = "SigningError";
    }
  }
  signer.SigningError = SigningError;
  return signer;
}
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  var __createBinding = file && file.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __setModuleDefault = file && file.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = file && file.__importStar || /* @__PURE__ */ (function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
  var __classPrivateFieldGet = file && file.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __importDefault = file && file.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _File_instances, _File_validateIntegrity;
  Object.defineProperty(file, "__esModule", { value: true });
  file.File = file.FileExceptionMessages = file.RequestError = file.SkipReason = file.STORAGE_POST_POLICY_BASE_URL = file.ActionToHTTPMethod = void 0;
  const index_js_1 = requireNodejsCommon();
  const promisify_1 = requireSrc$4();
  const crypto = __importStar(require$$0$2);
  const fs = __importStar(require$$0$4);
  const mime_1 = __importDefault(requireMime());
  const resumableUpload2 = __importStar(requireResumableUpload());
  const stream_1 = require$$0$1;
  const zlib$1 = __importStar(zlib);
  const storage_js_1 = requireStorage();
  const bucket_js_1 = requireBucket();
  const acl_js_1 = requireAcl();
  const signer_js_1 = requireSigner();
  const util_js_1 = requireUtil();
  const duplexify_1 = __importDefault(requireDuplexify());
  const util_js_2 = requireUtil$1();
  const crc32c_js_1 = requireCrc32c();
  const hash_stream_validator_js_1 = requireHashStreamValidator();
  const async_retry_1 = __importDefault(requireLib());
  var ActionToHTTPMethod;
  (function(ActionToHTTPMethod2) {
    ActionToHTTPMethod2["read"] = "GET";
    ActionToHTTPMethod2["write"] = "PUT";
    ActionToHTTPMethod2["delete"] = "DELETE";
    ActionToHTTPMethod2["resumable"] = "POST";
  })(ActionToHTTPMethod || (file.ActionToHTTPMethod = ActionToHTTPMethod = {}));
  file.STORAGE_POST_POLICY_BASE_URL = "https://storage.googleapis.com";
  const GS_URL_REGEXP = /^gs:\/\/([a-z0-9_.-]+)\/(.+)$/;
  const COMPRESSIBLE_MIME_REGEX = new RegExp([
    /^text\/|application\/ecmascript|application\/javascript|application\/json/,
    /|application\/postscript|application\/rtf|application\/toml|application\/vnd.dart/,
    /|application\/vnd.ms-fontobject|application\/wasm|application\/x-httpd-php|application\/x-ns-proxy-autoconfig/,
    /|application\/x-sh(?!ockwave-flash)|application\/x-tar|application\/x-virtualbox-hdd|application\/x-virtualbox-ova|application\/x-virtualbox-ovf/,
    /|^application\/x-virtualbox-vbox$|application\/x-virtualbox-vdi|application\/x-virtualbox-vhd|application\/x-virtualbox-vmdk/,
    /|application\/xml|application\/xml-dtd|font\/otf|font\/ttf|image\/bmp|image\/vnd.adobe.photoshop|image\/vnd.microsoft.icon/,
    /|image\/vnd.ms-dds|image\/x-icon|image\/x-ms-bmp|message\/rfc822|model\/gltf-binary|\+json|\+text|\+xml|\+yaml/
  ].map((r) => r.source).join(""), "i");
  var SkipReason;
  (function(SkipReason2) {
    SkipReason2["PATH_TRAVERSAL"] = "PATH_TRAVERSAL";
    SkipReason2["ILLEGAL_CHARACTER"] = "ILLEGAL_CHARACTER";
    SkipReason2["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    SkipReason2["DOWNLOAD_ERROR"] = "DOWNLOAD_ERROR";
  })(SkipReason || (file.SkipReason = SkipReason = {}));
  class RequestError extends Error {
  }
  file.RequestError = RequestError;
  const SEVEN_DAYS = 7 * 24 * 60 * 60;
  const GS_UTIL_URL_REGEX = /(gs):\/\/([a-z0-9_.-]+)\/(.+)/g;
  const HTTPS_PUBLIC_URL_REGEX = /(https):\/\/(storage\.googleapis\.com)\/([a-z0-9_.-]+)\/(.+)/g;
  var FileExceptionMessages;
  (function(FileExceptionMessages2) {
    FileExceptionMessages2["EXPIRATION_TIME_NA"] = "An expiration time is not available.";
    FileExceptionMessages2["DESTINATION_NO_NAME"] = "Destination file should have a name.";
    FileExceptionMessages2["INVALID_VALIDATION_FILE_RANGE"] = "Cannot use validation with file ranges (start/end).";
    FileExceptionMessages2["MD5_NOT_AVAILABLE"] = "MD5 verification was specified, but is not available for the requested object. MD5 is not available for composite objects.";
    FileExceptionMessages2["EQUALS_CONDITION_TWO_ELEMENTS"] = "Equals condition must be an array of 2 elements.";
    FileExceptionMessages2["STARTS_WITH_TWO_ELEMENTS"] = "StartsWith condition must be an array of 2 elements.";
    FileExceptionMessages2["CONTENT_LENGTH_RANGE_MIN_MAX"] = "ContentLengthRange must have numeric min & max fields.";
    FileExceptionMessages2["DOWNLOAD_MISMATCH"] = "The downloaded data did not match the data from the server. To be sure the content is the same, you should download the file again.";
    FileExceptionMessages2["UPLOAD_MISMATCH_DELETE_FAIL"] = "The uploaded data did not match the data from the server.\n    As a precaution, we attempted to delete the file, but it was not successful.\n    To be sure the content is the same, you should try removing the file manually,\n    then uploading the file again.\n    \n\nThe delete attempt failed with this message:\n\n  ";
    FileExceptionMessages2["UPLOAD_MISMATCH"] = "The uploaded data did not match the data from the server.\n    As a precaution, the file has been deleted.\n    To be sure the content is the same, you should try uploading the file again.";
    FileExceptionMessages2["MD5_RESUMED_UPLOAD"] = "MD5 cannot be used with a continued resumable upload as MD5 cannot be extended from an existing value";
    FileExceptionMessages2["MISSING_RESUME_CRC32C_FINAL_UPLOAD"] = "The CRC32C is missing for the final portion of a resumed upload, which is required for validation. Please provide `resumeCRC32C` if validation is required, or disable `validation`.";
  })(FileExceptionMessages || (file.FileExceptionMessages = FileExceptionMessages = {}));
  class File extends index_js_1.ServiceObject {
    /**
     * Cloud Storage uses access control lists (ACLs) to manage object and
     * bucket access. ACLs are the mechanism you use to share objects with other
     * users and allow other users to access your buckets and objects.
     *
     * An ACL consists of one or more entries, where each entry grants permissions
     * to an entity. Permissions define the actions that can be performed against
     * an object or bucket (for example, `READ` or `WRITE`); the entity defines
     * who the permission applies to (for example, a specific user or group of
     * users).
     *
     * The `acl` object on a File instance provides methods to get you a list of
     * the ACLs defined on your bucket, as well as set, update, and delete them.
     *
     * See {@link http://goo.gl/6qBBPO| About Access Control lists}
     *
     * @name File#acl
     * @mixes Acl
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * //-
     * // Make a file publicly readable.
     * //-
     * const options = {
     *   entity: 'allUsers',
     *   role: storage.acl.READER_ROLE
     * };
     *
     * file.acl.add(options, function(err, aclObject) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.acl.add(options).then(function(data) {
     *   const aclObject = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    /**
     * The API-formatted resource description of the file.
     *
     * Note: This is not guaranteed to be up-to-date when accessed. To get the
     * latest record, call the `getMetadata()` method.
     *
     * @name File#metadata
     * @type {object}
     */
    /**
     * The file's name.
     * @name File#name
     * @type {string}
     */
    /**
     * @callback Crc32cGeneratorToStringCallback
     * A method returning the CRC32C as a base64-encoded string.
     *
     * @returns {string}
     *
     * @example
     * Hashing the string 'data' should return 'rth90Q=='
     *
     * ```js
     * const buffer = Buffer.from('data');
     * crc32c.update(buffer);
     * crc32c.toString(); // 'rth90Q=='
     * ```
     **/
    /**
     * @callback Crc32cGeneratorValidateCallback
     * A method validating a base64-encoded CRC32C string.
     *
     * @param {string} [value] base64-encoded CRC32C string to validate
     * @returns {boolean}
     *
     * @example
     * Should return `true` if the value matches, `false` otherwise
     *
     * ```js
     * const buffer = Buffer.from('data');
     * crc32c.update(buffer);
     * crc32c.validate('DkjKuA=='); // false
     * crc32c.validate('rth90Q=='); // true
     * ```
     **/
    /**
     * @callback Crc32cGeneratorUpdateCallback
     * A method for passing `Buffer`s for CRC32C generation.
     *
     * @param {Buffer} [data] data to update CRC32C value with
     * @returns {undefined}
     *
     * @example
     * Hashing buffers from 'some ' and 'text\n'
     *
     * ```js
     * const buffer1 = Buffer.from('some ');
     * crc32c.update(buffer1);
     *
     * const buffer2 = Buffer.from('text\n');
     * crc32c.update(buffer2);
     *
     * crc32c.toString(); // 'DkjKuA=='
     * ```
     **/
    /**
     * @typedef {object} CRC32CValidator
     * @property {Crc32cGeneratorToStringCallback}
     * @property {Crc32cGeneratorValidateCallback}
     * @property {Crc32cGeneratorUpdateCallback}
     */
    /**
     * @callback Crc32cGeneratorCallback
     * @returns {CRC32CValidator}
     */
    /**
     * @typedef {object} FileOptions Options passed to the File constructor.
     * @property {string} [encryptionKey] A custom encryption key.
     * @property {number} [generation] Generation to scope the file to.
     * @property {string} [kmsKeyName] Cloud KMS Key used to encrypt this
     *     object, if the object is encrypted by such a key. Limited availability;
     *     usable only by enabled projects.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for all requests made from File object.
     * @property {Crc32cGeneratorCallback} [callback] A function that generates a CRC32C Validator. Defaults to {@link CRC32C}
     */
    /**
     * Constructs a file object.
     *
     * @param {Bucket} bucket The Bucket instance this file is
     *     attached to.
     * @param {string} name The name of the remote file.
     * @param {FileOptions} [options] Configuration options.
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * ```
     */
    constructor(bucket2, name2, options = {}) {
      var _a, _b;
      const requestQueryObject = {};
      let generation;
      if (options.generation !== null) {
        if (typeof options.generation === "string") {
          generation = Number(options.generation);
        } else {
          generation = options.generation;
        }
        if (!isNaN(generation)) {
          requestQueryObject.generation = generation;
        }
      }
      Object.assign(requestQueryObject, options.preconditionOpts);
      const userProject = options.userProject || bucket2.userProject;
      if (typeof userProject === "string") {
        requestQueryObject.userProject = userProject;
      }
      const methods = {
        /**
         * @typedef {array} DeleteFileResponse
         * @property {object} 0 The full API response.
         */
        /**
         * @callback DeleteFileCallback
         * @param {?Error} err Request error, if any.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Delete the file.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/delete| Objects: delete API Documentation}
         *
         * @method File#delete
         * @param {object} [options] Configuration options.
         * @param {boolean} [options.ignoreNotFound = false] Ignore an error if
         *     the file does not exist.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {DeleteFileCallback} [callback] Callback function.
         * @returns {Promise<DeleteFileResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         *
         * const file = myBucket.file('my-file');
         * file.delete(function(err, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * file.delete().then(function(data) {
         *   const apiResponse = data[0];
         * });
         *
         * ```
         * @example <caption>include:samples/files.js</caption>
         * region_tag:storage_delete_file
         * Another example:
         */
        delete: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {array} FileExistsResponse
         * @property {boolean} 0 Whether the {@link File} exists.
         */
        /**
         * @callback FileExistsCallback
         * @param {?Error} err Request error, if any.
         * @param {boolean} exists Whether the {@link File} exists.
         */
        /**
         * Check if the file exists.
         *
         * @method File#exists
         * @param {options} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {FileExistsCallback} [callback] Callback function.
         * @returns {Promise<FileExistsResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         *
         * const file = myBucket.file('my-file');
         *
         * file.exists(function(err, exists) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * file.exists().then(function(data) {
         *   const exists = data[0];
         * });
         * ```
         */
        exists: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {array} GetFileResponse
         * @property {File} 0 The {@link File}.
         * @property {object} 1 The full API response.
         */
        /**
         * @callback GetFileCallback
         * @param {?Error} err Request error, if any.
         * @param {File} file The {@link File}.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Get a file object and its metadata if it exists.
         *
         * @method File#get
         * @param {options} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {number} [options.generation] The generation number to get
         * @param {string} [options.restoreToken] If this is a soft-deleted object in an HNS-enabled bucket, returns the restore token which will
         *    be necessary to restore it if there's a name conflict with another object.
         * @param {boolean} [options.softDeleted] If true, returns the soft-deleted object.
              Object `generation` is required if `softDeleted` is set to True.
         * @param {GetFileCallback} [callback] Callback function.
         * @returns {Promise<GetFileResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         *
         * const file = myBucket.file('my-file');
         *
         * file.get(function(err, file, apiResponse) {
         *   // file.metadata` has been populated.
         * });
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * file.get().then(function(data) {
         *   const file = data[0];
         *   const apiResponse = data[1];
         * });
         * ```
         */
        get: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {array} GetFileMetadataResponse
         * @property {object} 0 The {@link File} metadata.
         * @property {object} 1 The full API response.
         */
        /**
         * @callback GetFileMetadataCallback
         * @param {?Error} err Request error, if any.
         * @param {object} metadata The {@link File} metadata.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Get the file's metadata.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/get| Objects: get API Documentation}
         *
         * @method File#getMetadata
         * @param {object} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {GetFileMetadataCallback} [callback] Callback function.
         * @returns {Promise<GetFileMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         *
         * const file = myBucket.file('my-file');
         *
         * file.getMetadata(function(err, metadata, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * file.getMetadata().then(function(data) {
         *   const metadata = data[0];
         *   const apiResponse = data[1];
         * });
         *
         * ```
         * @example <caption>include:samples/files.js</caption>
         * region_tag:storage_get_metadata
         * Another example:
         */
        getMetadata: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {object} SetFileMetadataOptions Configuration options for File#setMetadata().
         * @param {string} [userProject] The ID of the project which will be billed for the request.
         */
        /**
         * @callback SetFileMetadataCallback
         * @param {?Error} err Request error, if any.
         * @param {object} apiResponse The full API response.
         */
        /**
         * @typedef {array} SetFileMetadataResponse
         * @property {object} 0 The full API response.
         */
        /**
         * Merge the given metadata with the current remote file's metadata. This
         * will set metadata if it was previously unset or update previously set
         * metadata. To unset previously set metadata, set its value to null.
         *
         * You can set custom key/value pairs in the metadata key of the given
         * object, however the other properties outside of this object must adhere
         * to the {@link https://goo.gl/BOnnCK| official API documentation}.
         *
         *
         * See the examples below for more information.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/patch| Objects: patch API Documentation}
         *
         * @method File#setMetadata
         * @param {object} [metadata] The metadata you wish to update.
         * @param {SetFileMetadataOptions} [options] Configuration options.
         * @param {SetFileMetadataCallback} [callback] Callback function.
         * @returns {Promise<SetFileMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         *
         * const file = myBucket.file('my-file');
         *
         * const metadata = {
         *   contentType: 'application/x-font-ttf',
         *   metadata: {
         *     my: 'custom',
         *     properties: 'go here'
         *   }
         * };
         *
         * file.setMetadata(metadata, function(err, apiResponse) {});
         *
         * // Assuming current metadata = { hello: 'world', unsetMe: 'will do' }
         * file.setMetadata({
         *   metadata: {
         *     abc: '123', // will be set.
         *     unsetMe: null, // will be unset (deleted).
         *     hello: 'goodbye' // will be updated from 'world' to 'goodbye'.
         *   }
         * }, function(err, apiResponse) {
         *   // metadata should now be { abc: '123', hello: 'goodbye' }
         * });
         *
         * //-
         * // Set a temporary hold on this file from its bucket's retention period
         * // configuration.
         * //
         * file.setMetadata({
         *   temporaryHold: true
         * }, function(err, apiResponse) {});
         *
         * //-
         * // Alternatively, you may set a temporary hold. This will follow the
         * // same behavior as an event-based hold, with the exception that the
         * // bucket's retention policy will not renew for this file from the time
         * // the hold is released.
         * //-
         * file.setMetadata({
         *   eventBasedHold: true
         * }, function(err, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * file.setMetadata(metadata).then(function(data) {
         *   const apiResponse = data[0];
         * });
         * ```
         */
        setMetadata: {
          reqOpts: {
            qs: requestQueryObject
          }
        }
      };
      super({
        parent: bucket2,
        baseUrl: "/o",
        id: encodeURIComponent(name2),
        methods
      });
      _File_instances.add(this);
      this.bucket = bucket2;
      this.storage = bucket2.parent;
      if (options.generation !== null) {
        let generation2;
        if (typeof options.generation === "string") {
          generation2 = Number(options.generation);
        } else {
          generation2 = options.generation;
        }
        if (!isNaN(generation2)) {
          this.generation = generation2;
        }
      }
      this.kmsKeyName = options.kmsKeyName;
      this.userProject = userProject;
      this.name = name2;
      if (options.encryptionKey) {
        this.setEncryptionKey(options.encryptionKey);
      }
      this.acl = new acl_js_1.Acl({
        request: this.request.bind(this),
        pathPrefix: "/acl"
      });
      this.crc32cGenerator = options.crc32cGenerator || this.bucket.crc32cGenerator;
      this.instanceRetryValue = (_b = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.retryOptions) === null || _b === void 0 ? void 0 : _b.autoRetry;
      this.instancePreconditionOpts = options === null || options === void 0 ? void 0 : options.preconditionOpts;
    }
    /**
     * The object's Cloud Storage URI (`gs://`)
     *
     * @example
     * ```ts
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const file = bucket.file('image.png');
     *
     * // `gs://my-bucket/image.png`
     * const href = file.cloudStorageURI.href;
     * ```
     */
    get cloudStorageURI() {
      const uri = this.bucket.cloudStorageURI;
      uri.pathname = this.name;
      return uri;
    }
    /**
     * A helper method for determining if a request should be retried based on preconditions.
     * This should only be used for methods where the idempotency is determined by
     * `ifGenerationMatch`
     * @private
     *
     * A request should not be retried under the following conditions:
     * - if precondition option `ifGenerationMatch` is not set OR
     * - if `idempotencyStrategy` is set to `RetryNever`
     */
    shouldRetryBasedOnPreconditionAndIdempotencyStrat(options) {
      var _a;
      return !((options === null || options === void 0 ? void 0 : options.ifGenerationMatch) === void 0 && ((_a = this.instancePreconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) === void 0 && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever);
    }
    /**
     * @typedef {array} CopyResponse
     * @property {File} 0 The copied {@link File}.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback CopyCallback
     * @param {?Error} err Request error, if any.
     * @param {File} copiedFile The copied {@link File}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {object} CopyOptions Configuration options for File#copy(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects#resource| Object resource}.
     * @property {string} [cacheControl] The cacheControl setting for the new file.
     * @property {string} [contentEncoding] The contentEncoding setting for the new file.
     * @property {string} [contentType] The contentType setting for the new file.
     * @property {string} [destinationKmsKeyName] Resource name of the Cloud
     *     KMS key, of the form
     *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`,
     *     that will be used to encrypt the object. Overwrites the object
     * metadata's `kms_key_name` value, if any.
     * @property {Metadata} [metadata] Metadata to specify on the copied file.
     * @property {string} [predefinedAcl] Set the ACL for the new file.
     * @property {string} [token] A previously-returned `rewriteToken` from an
     *     unfinished rewrite request.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * Copy this file to another file. By default, this will copy the file to the
     * same bucket, but you can choose to copy it to another Bucket by providing
     * a Bucket or File object or a URL starting with "gs://".
     * The generation of the file will not be preserved.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/rewrite| Objects: rewrite API Documentation}
     *
     * @throws {Error} If the destination file is not provided.
     *
     * @param {string|Bucket|File} destination Destination file.
     * @param {CopyOptions} [options] Configuration options. See an
     * @param {CopyCallback} [callback] Callback function.
     * @returns {Promise<CopyResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     *
     * //-
     * // You can pass in a variety of types for the destination.
     * //
     * // For all of the below examples, assume we are working with the following
     * // Bucket and File objects.
     * //-
     * const bucket = storage.bucket('my-bucket');
     * const file = bucket.file('my-image.png');
     *
     * //-
     * // If you pass in a string for the destination, the file is copied to its
     * // current bucket, under the new name provided.
     * //-
     * file.copy('my-image-copy.png', function(err, copiedFile, apiResponse) {
     *   // `my-bucket` now contains:
     *   // - "my-image.png"
     *   // - "my-image-copy.png"
     *
     *   // `copiedFile` is an instance of a File object that refers to your new
     *   // file.
     * });
     *
     * //-
     * // If you pass in a string starting with "gs://" for the destination, the
     * // file is copied to the other bucket and under the new name provided.
     * //-
     * const newLocation = 'gs://another-bucket/my-image-copy.png';
     * file.copy(newLocation, function(err, copiedFile, apiResponse) {
     *   // `my-bucket` still contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-image-copy.png"
     *
     *   // `copiedFile` is an instance of a File object that refers to your new
     *   // file.
     * });
     *
     * //-
     * // If you pass in a Bucket object, the file will be copied to that bucket
     * // using the same name.
     * //-
     * const anotherBucket = storage.bucket('another-bucket');
     * file.copy(anotherBucket, function(err, copiedFile, apiResponse) {
     *   // `my-bucket` still contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-image.png"
     *
     *   // `copiedFile` is an instance of a File object that refers to your new
     *   // file.
     * });
     *
     * //-
     * // If you pass in a File object, you have complete control over the new
     * // bucket and filename.
     * //-
     * const anotherFile = anotherBucket.file('my-awesome-image.png');
     * file.copy(anotherFile, function(err, copiedFile, apiResponse) {
     *   // `my-bucket` still contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-awesome-image.png"
     *
     *   // Note:
     *   // The `copiedFile` parameter is equal to `anotherFile`.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.copy(newLocation).then(function(data) {
     *   const newFile = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_copy_file
     * Another example:
     */
    copy(destination, optionsOrCallback, callback) {
      var _a, _b;
      const noDestinationError = new Error(FileExceptionMessages.DESTINATION_NO_NAME);
      if (!destination) {
        throw noDestinationError;
      }
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = { ...optionsOrCallback };
      }
      if (options.contexts) {
        const validationError = (0, util_js_2.handleContextValidation)(options.contexts, callback);
        if (validationError)
          return validationError;
      }
      callback = callback || index_js_1.util.noop;
      let destBucket;
      let destName;
      let newFile;
      if (typeof destination === "string") {
        const parsedDestination = GS_URL_REGEXP.exec(destination);
        if (parsedDestination !== null && parsedDestination.length === 3) {
          destBucket = this.storage.bucket(parsedDestination[1]);
          destName = parsedDestination[2];
        } else {
          destBucket = this.bucket;
          destName = destination;
        }
      } else if (destination instanceof bucket_js_1.Bucket) {
        destBucket = destination;
        destName = this.name;
      } else if (destination instanceof File) {
        destBucket = destination.bucket;
        destName = destination.name;
        newFile = destination;
      } else {
        throw noDestinationError;
      }
      const query = {};
      if (this.generation !== void 0) {
        query.sourceGeneration = this.generation;
      }
      if (options.token !== void 0) {
        query.rewriteToken = options.token;
      }
      if (options.userProject !== void 0) {
        query.userProject = options.userProject;
        delete options.userProject;
      }
      if (options.predefinedAcl !== void 0) {
        query.destinationPredefinedAcl = options.predefinedAcl;
        delete options.predefinedAcl;
      }
      newFile = newFile || destBucket.file(destName);
      const headers = {};
      if (this.encryptionKey !== void 0) {
        headers["x-goog-copy-source-encryption-algorithm"] = "AES256";
        headers["x-goog-copy-source-encryption-key"] = this.encryptionKeyBase64;
        headers["x-goog-copy-source-encryption-key-sha256"] = this.encryptionKeyHash;
      }
      if (newFile.encryptionKey !== void 0) {
        this.setEncryptionKey(newFile.encryptionKey);
      } else if (options.destinationKmsKeyName !== void 0) {
        query.destinationKmsKeyName = options.destinationKmsKeyName;
        delete options.destinationKmsKeyName;
      } else if (newFile.kmsKeyName !== void 0) {
        query.destinationKmsKeyName = newFile.kmsKeyName;
      }
      if (query.destinationKmsKeyName) {
        this.kmsKeyName = query.destinationKmsKeyName;
        const keyIndex = this.interceptors.indexOf(this.encryptionKeyInterceptor);
        if (keyIndex > -1) {
          this.interceptors.splice(keyIndex, 1);
        }
      }
      if (!this.shouldRetryBasedOnPreconditionAndIdempotencyStrat(options === null || options === void 0 ? void 0 : options.preconditionOpts)) {
        this.storage.retryOptions.autoRetry = false;
      }
      if (((_a = options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) !== void 0) {
        query.ifGenerationMatch = (_b = options.preconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationMatch;
        delete options.preconditionOpts;
      }
      this.request({
        method: "POST",
        uri: `/rewriteTo/b/${destBucket.name}/o/${encodeURIComponent(newFile.name)}`,
        qs: query,
        json: options,
        headers
      }, (err, resp) => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
        if (err) {
          callback(err, null, resp);
          return;
        }
        if (resp.rewriteToken) {
          const options2 = {
            token: resp.rewriteToken
          };
          if (query.userProject) {
            options2.userProject = query.userProject;
          }
          if (query.destinationKmsKeyName) {
            options2.destinationKmsKeyName = query.destinationKmsKeyName;
          }
          this.copy(newFile, options2, callback);
          return;
        }
        callback(null, newFile, resp);
      });
    }
    /**
     * @typedef {object} CreateReadStreamOptions Configuration options for File#createReadStream.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {string|boolean} [validation] Possible values: `"md5"`,
     *     `"crc32c"`, or `false`. By default, data integrity is validated with a
     *     CRC32c checksum. You may use MD5 if preferred, but that hash is not
     *     supported for composite objects. An error will be raised if MD5 is
     *     specified but is not available. You may also choose to skip validation
     *     completely, however this is **not recommended**.
     * @property {number} [start] A byte offset to begin the file's download
     *     from. Default is 0. NOTE: Byte ranges are inclusive; that is,
     *     `options.start = 0` and `options.end = 999` represent the first 1000
     *     bytes in a file or object. NOTE: when specifying a byte range, data
     *     integrity is not available.
     * @property {number} [end] A byte offset to stop reading the file at.
     *     NOTE: Byte ranges are inclusive; that is, `options.start = 0` and
     *     `options.end = 999` represent the first 1000 bytes in a file or object.
     *     NOTE: when specifying a byte range, data integrity is not available.
     * @property {boolean} [decompress=true] Disable auto decompression of the
     *     received data. By default this option is set to `true`.
     *     Applicable in cases where the data was uploaded with
     *     `gzip: true` option. See {@link File#createWriteStream}.
     */
    /**
     * Create a readable stream to read the contents of the remote file. It can be
     * piped to a writable stream or listened to for 'data' events to read a
     * file's contents.
     *
     * In the unlikely event there is a mismatch between what you downloaded and
     * the version in your Bucket, your error handler will receive an error with
     * code "CONTENT_DOWNLOAD_MISMATCH". If you receive this error, the best
     * recourse is to try downloading the file again.
     *
     * NOTE: Readable streams will emit the `end` event when the file is fully
     * downloaded.
     *
     * @param {CreateReadStreamOptions} [options] Configuration options.
     * @returns {ReadableStream}
     *
     * @example
     * ```
     * //-
     * // <h4>Downloading a File</h4>
     * //
     * // The example below demonstrates how we can reference a remote file, then
     * // pipe its contents to a local file. This is effectively creating a local
     * // backup of your remote data.
     * //-
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * const fs = require('fs');
     * const remoteFile = bucket.file('image.png');
     * const localFilename = '/Users/stephen/Photos/image.png';
     *
     * remoteFile.createReadStream()
     *   .on('error', function(err) {})
     *   .on('response', function(response) {
     *     // Server connected and responded with the specified status and headers.
     *    })
     *   .on('end', function() {
     *     // The file is fully downloaded.
     *   })
     *   .pipe(fs.createWriteStream(localFilename));
     *
     * //-
     * // To limit the downloaded data to only a byte range, pass an options
     * // object.
     * //-
     * const logFile = myBucket.file('access_log');
     * logFile.createReadStream({
     *     start: 10000,
     *     end: 20000
     *   })
     *   .on('error', function(err) {})
     *   .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));
     *
     * //-
     * // To read a tail byte range, specify only `options.end` as a negative
     * // number.
     * //-
     * const logFile = myBucket.file('access_log');
     * logFile.createReadStream({
     *     end: -100
     *   })
     *   .on('error', function(err) {})
     *   .pipe(fs.createWriteStream('/Users/stephen/logfile.txt'));
     * ```
     */
    createReadStream(options = {}) {
      options = Object.assign({ decompress: true }, options);
      const rangeRequest = typeof options.start === "number" || typeof options.end === "number";
      const tailRequest = options.end < 0;
      let validateStream = void 0;
      let request = void 0;
      const throughStream = new util_js_2.PassThroughShim();
      let crc32c2 = true;
      let md5 = false;
      if (typeof options.validation === "string") {
        const value = options.validation.toLowerCase().trim();
        crc32c2 = value === "crc32c";
        md5 = value === "md5";
      } else if (options.validation === false) {
        crc32c2 = false;
      }
      const shouldRunValidation = !rangeRequest && (crc32c2 || md5);
      if (rangeRequest) {
        if (typeof options.validation === "string" || options.validation === true) {
          throw new Error(FileExceptionMessages.INVALID_VALIDATION_FILE_RANGE);
        }
        crc32c2 = false;
        md5 = false;
      }
      const onComplete = (err) => {
        if (err) {
          if (request === null || request === void 0 ? void 0 : request.agent) {
            request.agent.destroy();
          }
          throughStream.destroy(err);
        }
      };
      const onResponse = (err, _body, rawResponseStream) => {
        if (err) {
          this.getBufferFromReadable(rawResponseStream).then((body) => {
            err.message = body.toString("utf8");
            throughStream.destroy(err);
          });
          return;
        }
        request = rawResponseStream.request;
        const headers = rawResponseStream.toJSON().headers;
        const isCompressed = headers["content-encoding"] === "gzip";
        const hashes = {};
        const safeToValidate = headers["x-goog-stored-content-encoding"] === "gzip" && isCompressed || headers["x-goog-stored-content-encoding"] === "identity";
        const transformStreams = [];
        if (shouldRunValidation) {
          if (typeof headers["x-goog-hash"] === "string") {
            headers["x-goog-hash"].split(",").forEach((hashKeyValPair) => {
              const delimiterIndex = hashKeyValPair.indexOf("=");
              const hashType = hashKeyValPair.substring(0, delimiterIndex);
              const hashValue = hashKeyValPair.substring(delimiterIndex + 1);
              hashes[hashType] = hashValue;
            });
          }
          validateStream = new hash_stream_validator_js_1.HashStreamValidator({
            crc32c: crc32c2,
            md5,
            crc32cGenerator: this.crc32cGenerator,
            crc32cExpected: hashes.crc32c,
            md5Expected: hashes.md5
          });
        }
        if (md5 && !hashes.md5) {
          const hashError = new RequestError(FileExceptionMessages.MD5_NOT_AVAILABLE);
          hashError.code = "MD5_NOT_AVAILABLE";
          throughStream.destroy(hashError);
          return;
        }
        if (safeToValidate && shouldRunValidation && validateStream) {
          transformStreams.push(validateStream);
        }
        if (isCompressed && options.decompress) {
          transformStreams.push(zlib$1.createGunzip());
        }
        (0, stream_1.pipeline)(rawResponseStream, ...transformStreams, throughStream, onComplete);
      };
      const makeRequest = () => {
        const query = { alt: "media" };
        if (this.generation) {
          query.generation = this.generation;
        }
        if (options.userProject) {
          query.userProject = options.userProject;
        }
        const headers = {
          "Accept-Encoding": "gzip",
          "Cache-Control": "no-store"
        };
        if (rangeRequest) {
          const start = typeof options.start === "number" ? options.start : "0";
          const end = typeof options.end === "number" ? options.end : "";
          headers.Range = `bytes=${tailRequest ? end : `${start}-${end}`}`;
        }
        const reqOpts = {
          uri: "",
          headers,
          qs: query
        };
        if (options[util_js_1.GCCL_GCS_CMD_KEY]) {
          reqOpts[util_js_1.GCCL_GCS_CMD_KEY] = options[util_js_1.GCCL_GCS_CMD_KEY];
        }
        this.requestStream(reqOpts).on("error", (err) => {
          throughStream.destroy(err);
        }).on("response", (res) => {
          throughStream.emit("response", res);
          index_js_1.util.handleResp(null, res, null, onResponse);
        }).resume();
      };
      throughStream.on("reading", makeRequest);
      return throughStream;
    }
    /**
     * @callback CreateResumableUploadCallback
     * @param {?Error} err Request error, if any.
     * @param {string} uri The resumable upload's unique session URI.
     */
    /**
     * @typedef {array} CreateResumableUploadResponse
     * @property {string} 0 The resumable upload's unique session URI.
     */
    /**
     * @typedef {object} CreateResumableUploadOptions
     * @property {object} [metadata] Metadata to set on the file.
     * @property {number} [offset] The starting byte of the upload stream for resuming an interrupted upload.
     * @property {string} [origin] Origin header to set for the upload.
     * @property {string} [predefinedAcl] Apply a predefined set of access
     * controls to this object.
     *
     * Acceptable values are:
     * - **`authenticatedRead`** - Object owner gets `OWNER` access, and
     *   `allAuthenticatedUsers` get `READER` access.
     *
     * - **`bucketOwnerFullControl`** - Object owner gets `OWNER` access, and
     *   project team owners get `OWNER` access.
     *
     * - **`bucketOwnerRead`** - Object owner gets `OWNER` access, and project
     *   team owners get `READER` access.
     *
     * - **`private`** - Object owner gets `OWNER` access.
     *
     * - **`projectPrivate`** - Object owner gets `OWNER` access, and project
     *   team members get access according to their roles.
     *
     * - **`publicRead`** - Object owner gets `OWNER` access, and `allUsers`
     *   get `READER` access.
     * @property {boolean} [private] Make the uploaded file private. (Alias for
     *     `options.predefinedAcl = 'private'`)
     * @property {boolean} [public] Make the uploaded file public. (Alias for
     *     `options.predefinedAcl = 'publicRead'`)
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {string} [chunkSize] Create a separate request per chunk. This
     *     value is in bytes and should be a multiple of 256 KiB (2^18).
     *     {@link https://cloud.google.com/storage/docs/performing-resumable-uploads#chunked-upload| We recommend using at least 8 MiB for the chunk size.}
     */
    /**
     * Create a unique resumable upload session URI. This is the first step when
     * performing a resumable upload.
     *
     * See the {@link https://cloud.google.com/storage/docs/json_api/v1/how-tos/resumable-upload| Resumable upload guide}
     * for more on how the entire process works.
     *
     * <h4>Note</h4>
     *
     * If you are just looking to perform a resumable upload without worrying
     * about any of the details, see {@link File#createWriteStream}. Resumable
     * uploads are performed by default.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/how-tos/resumable-upload| Resumable upload guide}
     *
     * @param {CreateResumableUploadOptions} [options] Configuration options.
     * @param {CreateResumableUploadCallback} [callback] Callback function.
     * @returns {Promise<CreateResumableUploadResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * file.createResumableUpload(function(err, uri) {
     *   if (!err) {
     *     // `uri` can be used to PUT data to.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.createResumableUpload().then(function(data) {
     *   const uri = data[0];
     * });
     * ```
     */
    createResumableUpload(optionsOrCallback, callback) {
      var _a, _b;
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const retryOptions = this.storage.retryOptions;
      if (((_a = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) === void 0 && ((_b = this.instancePreconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationMatch) === void 0 && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        retryOptions.autoRetry = false;
      }
      resumableUpload2.createURI({
        authClient: this.storage.authClient,
        apiEndpoint: this.storage.apiEndpoint,
        bucket: this.bucket.name,
        customRequestOptions: this.getRequestInterceptors().reduce((reqOpts, interceptorFn) => interceptorFn(reqOpts), {}),
        file: this.name,
        generation: this.generation,
        key: this.encryptionKey,
        kmsKeyName: this.kmsKeyName,
        metadata: options.metadata,
        offset: options.offset,
        origin: options.origin,
        predefinedAcl: options.predefinedAcl,
        private: options.private,
        public: options.public,
        userProject: options.userProject || this.userProject,
        retryOptions,
        params: (options === null || options === void 0 ? void 0 : options.preconditionOpts) || this.instancePreconditionOpts,
        universeDomain: this.bucket.storage.universeDomain,
        useAuthWithCustomEndpoint: this.storage.useAuthWithCustomEndpoint,
        [util_js_1.GCCL_GCS_CMD_KEY]: options[util_js_1.GCCL_GCS_CMD_KEY]
      }, callback);
      this.storage.retryOptions.autoRetry = this.instanceRetryValue;
    }
    /**
     * @typedef {object} CreateWriteStreamOptions Configuration options for File#createWriteStream().
     * @property {string} [contentType] Alias for
     *     `options.metadata.contentType`. If set to `auto`, the file name is used
     *     to determine the contentType.
     * @property {string|boolean} [gzip] If true, automatically gzip the file.
     *     If set to `auto`, the contentType is used to determine if the file
     * should be gzipped. This will set `options.metadata.contentEncoding` to
     * `gzip` if necessary.
     * @property {object} [metadata] See the examples below or
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON| Objects: insert request body}
     *     for more details.
     * @property {number} [offset] The starting byte of the upload stream, for
     *     resuming an interrupted upload. Defaults to 0.
     * @property {string} [predefinedAcl] Apply a predefined set of access
     * controls to this object.
     *
     * Acceptable values are:
     * - **`authenticatedRead`** - Object owner gets `OWNER` access, and
     *   `allAuthenticatedUsers` get `READER` access.
     *
     * - **`bucketOwnerFullControl`** - Object owner gets `OWNER` access, and
     *   project team owners get `OWNER` access.
     *
     * - **`bucketOwnerRead`** - Object owner gets `OWNER` access, and project
     *   team owners get `READER` access.
     *
     * - **`private`** - Object owner gets `OWNER` access.
     *
     * - **`projectPrivate`** - Object owner gets `OWNER` access, and project
     *   team members get access according to their roles.
     *
     * - **`publicRead`** - Object owner gets `OWNER` access, and `allUsers`
     *   get `READER` access.
     * @property {boolean} [private] Make the uploaded file private. (Alias for
     *     `options.predefinedAcl = 'private'`)
     * @property {boolean} [public] Make the uploaded file public. (Alias for
     *     `options.predefinedAcl = 'publicRead'`)
     * @property {boolean} [resumable] Force a resumable upload. NOTE: When
     *     working with streams, the file format and size is unknown until it's
     *     completely consumed. Because of this, it's best for you to be explicit
     *     for what makes sense given your input.
     * @property {number} [timeout=60000] Set the HTTP request timeout in
     *     milliseconds. This option is not available for resumable uploads.
     *     Default: `60000`
     * @property {string} [uri] The URI for an already-created resumable
     *     upload. See {@link File#createResumableUpload}.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {string|boolean} [validation] Possible values: `"md5"`,
     *     `"crc32c"`, or `false`. By default, data integrity is validated with a
     *     CRC32c checksum. You may use MD5 if preferred, but that hash is not
     *     supported for composite objects. An error will be raised if MD5 is
     *     specified but is not available. You may also choose to skip validation
     *     completely, however this is **not recommended**. In addition to specifying
     *     validation type, providing `metadata.crc32c` or `metadata.md5Hash` will
     *     cause the server to perform validation in addition to client validation.
     *     NOTE: Validation is automatically skipped for objects that were
     *     uploaded using the `gzip` option and have already compressed content.
     */
    /**
     * Create a writable stream to overwrite the contents of the file in your
     * bucket.
     *
     * A File object can also be used to create files for the first time.
     *
     * Resumable uploads are automatically enabled and must be shut off explicitly
     * by setting `options.resumable` to `false`.
     *
     *
     * <p class="notice">
     *   There is some overhead when using a resumable upload that can cause
     *   noticeable performance degradation while uploading a series of small
     *   files. When uploading files less than 10MB, it is recommended that the
     *   resumable feature is disabled.
     * </p>
     *
     * NOTE: Writable streams will emit the `finish` event when the file is fully
     * uploaded.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/how-tos/upload Upload Options (Simple or Resumable)}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/insert Objects: insert API Documentation}
     *
     * @param {CreateWriteStreamOptions} [options] Configuration options.
     * @returns {WritableStream}
     *
     * @example
     * ```
     * const fs = require('fs');
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * //-
     * // <h4>Uploading a File</h4>
     * //
     * // Now, consider a case where we want to upload a file to your bucket. You
     * // have the option of using {@link Bucket#upload}, but that is just
     * // a convenience method which will do the following.
     * //-
     * fs.createReadStream('/Users/stephen/Photos/birthday-at-the-zoo/panda.jpg')
     *   .pipe(file.createWriteStream())
     *   .on('error', function(err) {})
     *   .on('finish', function() {
     *     // The file upload is complete.
     *   });
     *
     * //-
     * // <h4>Uploading a File with gzip compression</h4>
     * //-
     * fs.createReadStream('/Users/stephen/site/index.html')
     *   .pipe(file.createWriteStream({ gzip: true }))
     *   .on('error', function(err) {})
     *   .on('finish', function() {
     *     // The file upload is complete.
     *   });
     *
     * //-
     * // Downloading the file with `createReadStream` will automatically decode
     * // the file.
     * //-
     *
     * //-
     * // <h4>Uploading a File with Metadata</h4>
     * //
     * // One last case you may run into is when you want to upload a file to your
     * // bucket and set its metadata at the same time. Like above, you can use
     * // {@link Bucket#upload} to do this, which is just a wrapper around
     * // the following.
     * //-
     * fs.createReadStream('/Users/stephen/Photos/birthday-at-the-zoo/panda.jpg')
     *   .pipe(file.createWriteStream({
     *     metadata: {
     *       contentType: 'image/jpeg',
     *       metadata: {
     *         custom: 'metadata'
     *       }
     *     }
     *   }))
     *   .on('error', function(err) {})
     *   .on('finish', function() {
     *     // The file upload is complete.
     *   });
     * ```
     *
     * //-
     * // <h4>Continuing a Resumable Upload</h4>
     * //
     * // One can capture a `uri` from a resumable upload to reuse later.
     * // Additionally, for validation, one can also capture and pass `crc32c`.
     * //-
     * let uri: string | undefined = undefined;
     * let resumeCRC32C: string | undefined = undefined;
     *
     * fs.createWriteStream()
     *   .on('uri', link => {uri = link})
     *   .on('crc32', crc32c => {resumeCRC32C = crc32c});
     *
     * // later...
     * fs.createWriteStream({uri, resumeCRC32C});
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createWriteStream(options = {}) {
      var _a;
      (_a = options.metadata) !== null && _a !== void 0 ? _a : options.metadata = {};
      if (options.contentType) {
        options.metadata.contentType = options.contentType;
      }
      if (!options.metadata.contentType || options.metadata.contentType === "auto") {
        const detectedContentType = mime_1.default.getType(this.name);
        if (detectedContentType) {
          options.metadata.contentType = detectedContentType;
        }
      }
      let gzip = options.gzip;
      if (gzip === "auto") {
        gzip = COMPRESSIBLE_MIME_REGEX.test(options.metadata.contentType || "");
      }
      if (gzip) {
        options.metadata.contentEncoding = "gzip";
      }
      let crc32c2 = true;
      let md5 = false;
      if (typeof options.validation === "string") {
        options.validation = options.validation.toLowerCase();
        crc32c2 = options.validation === "crc32c";
        md5 = options.validation === "md5";
      } else if (options.validation === false) {
        crc32c2 = false;
        md5 = false;
      }
      if (options.offset) {
        if (md5) {
          throw new RangeError(FileExceptionMessages.MD5_RESUMED_UPLOAD);
        }
        if (crc32c2 && !options.isPartialUpload && !options.resumeCRC32C) {
          throw new RangeError(FileExceptionMessages.MISSING_RESUME_CRC32C_FINAL_UPLOAD);
        }
      }
      let pipelineCallback = (error) => {
        writeStream.destroy(error || void 0);
      };
      const writeStream = new stream_1.Writable({
        final(cb) {
          pipelineCallback = cb;
          emitStream.end();
        },
        write(chunk, encoding, cb) {
          emitStream.write(chunk, encoding, cb);
        }
      });
      writeStream.once("error", (e) => {
        emitStream.destroy(e);
      });
      writeStream.once("close", () => {
        emitStream.destroy();
      });
      const transformStreams = [];
      if (gzip) {
        transformStreams.push(zlib$1.createGzip());
      }
      const emitStream = new util_js_2.PassThroughShim();
      const noop = () => {
      };
      emitStream.on("error", noop);
      let hashCalculatingStream = null;
      if (crc32c2 || md5) {
        const crc32cInstance = options.resumeCRC32C ? crc32c_js_1.CRC32C.from(options.resumeCRC32C) : void 0;
        hashCalculatingStream = new hash_stream_validator_js_1.HashStreamValidator({
          crc32c: crc32c2,
          crc32cInstance,
          md5,
          crc32cGenerator: this.crc32cGenerator,
          updateHashesOnly: true
        });
        transformStreams.push(hashCalculatingStream);
      }
      const fileWriteStream = (0, duplexify_1.default)();
      let fileWriteStreamMetadataReceived = false;
      emitStream.on("reading", () => writeStream.emit("reading"));
      emitStream.on("writing", () => writeStream.emit("writing"));
      fileWriteStream.on("uri", (evt) => writeStream.emit("uri", evt));
      fileWriteStream.on("progress", (evt) => writeStream.emit("progress", evt));
      fileWriteStream.on("response", (resp) => writeStream.emit("response", resp));
      fileWriteStream.once("metadata", () => {
        fileWriteStreamMetadataReceived = true;
      });
      writeStream.once("writing", () => {
        if (options.resumable === false) {
          this.startSimpleUpload_(fileWriteStream, options);
        } else {
          this.startResumableUpload_(fileWriteStream, options);
        }
        emitStream.removeListener("error", noop);
        (0, stream_1.pipeline)(emitStream, ...transformStreams, fileWriteStream, async (e) => {
          if (e) {
            return pipelineCallback(e);
          }
          if (options.isPartialUpload) {
            if (hashCalculatingStream === null || hashCalculatingStream === void 0 ? void 0 : hashCalculatingStream.crc32c) {
              writeStream.emit("crc32c", hashCalculatingStream.crc32c);
            }
            return pipelineCallback();
          }
          if (!fileWriteStreamMetadataReceived) {
            try {
              await new Promise((resolve, reject) => {
                fileWriteStream.once("metadata", resolve);
                fileWriteStream.once("error", reject);
              });
            } catch (e2) {
              return pipelineCallback(e2);
            }
          }
          if (hashCalculatingStream === null || hashCalculatingStream === void 0 ? void 0 : hashCalculatingStream.crc32c) {
            writeStream.emit("crc32c", hashCalculatingStream.crc32c);
          }
          try {
            const metadataNotReady = options.isPartialUpload && !this.metadata;
            if (hashCalculatingStream && !metadataNotReady) {
              await __classPrivateFieldGet(this, _File_instances, "m", _File_validateIntegrity).call(this, hashCalculatingStream, {
                crc32c: crc32c2,
                md5
              });
            }
            pipelineCallback();
          } catch (e2) {
            pipelineCallback(e2);
          }
        });
      });
      return writeStream;
    }
    delete(optionsOrCallback, cb) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      cb = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      this.disableAutoRetryConditionallyIdempotent_(this.methods.delete, bucket_js_1.AvailableServiceObjectMethods.delete, options);
      super.delete(options).then((resp) => cb(null, ...resp)).catch(cb).finally(() => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
      });
    }
    /**
     * @typedef {array} DownloadResponse
     * @property [0] The contents of a File.
     */
    /**
     * @callback DownloadCallback
     * @param err Request error, if any.
     * @param contents The contents of a File.
     */
    /**
     * Convenience method to download a file into memory or to a local
     * destination.
     *
     * @param {object} [options] Configuration options. The arguments match those
     *     passed to {@link File#createReadStream}.
     * @param {string} [options.destination] Local file path to write the file's
     *     contents to.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {DownloadCallback} [callback] Callback function.
     * @returns {Promise<DownloadResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * //-
     * // Download a file into memory. The contents will be available as the
     * second
     * // argument in the demonstration below, `contents`.
     * //-
     * file.download(function(err, contents) {});
     *
     * //-
     * // Download a file to a local destination.
     * //-
     * file.download({
     *   destination: '/Users/me/Desktop/file-backup.txt'
     * }, function(err) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.download().then(function(data) {
     *   const contents = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_download_file
     * Another example:
     *
     * @example <caption>include:samples/encryption.js</caption>
     * region_tag:storage_download_encrypted_file
     * Example of downloading an encrypted file:
     *
     * @example <caption>include:samples/requesterPays.js</caption>
     * region_tag:storage_download_file_requester_pays
     * Example of downloading a file where the requester pays:
     */
    download(optionsOrCallback, cb) {
      let options;
      if (typeof optionsOrCallback === "function") {
        cb = optionsOrCallback;
        options = {};
      } else {
        options = Object.assign({}, optionsOrCallback);
      }
      let called = false;
      const callback = ((...args) => {
        if (!called)
          cb(...args);
        called = true;
      });
      const destination = options.destination;
      delete options.destination;
      if (options.encryptionKey) {
        this.setEncryptionKey(options.encryptionKey);
        delete options.encryptionKey;
      }
      const fileStream = this.createReadStream(options);
      let receivedData = false;
      if (destination) {
        fileStream.on("error", callback).once("data", (data) => {
          receivedData = true;
          const writable = fs.createWriteStream(destination);
          writable.write(data);
          fileStream.pipe(writable).on("error", (err) => {
            callback(err, Buffer.from(""));
          }).on("finish", () => {
            callback(null, data);
          });
        }).on("end", () => {
          if (!receivedData) {
            const data = Buffer.alloc(0);
            try {
              fs.writeFileSync(destination, data);
              callback(null, data);
            } catch (e) {
              callback(e, data);
            }
          }
        });
      } else {
        this.getBufferFromReadable(fileStream).then((contents) => callback === null || callback === void 0 ? void 0 : callback(null, contents)).catch(callback);
      }
    }
    /**
     * The Storage API allows you to use a custom key for server-side encryption.
     *
     * See {@link https://cloud.google.com/storage/docs/encryption#customer-supplied| Customer-supplied Encryption Keys}
     *
     * @param {string|buffer} encryptionKey An AES-256 encryption key.
     * @returns {File}
     *
     * @example
     * ```
     * const crypto = require('crypto');
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const encryptionKey = crypto.randomBytes(32);
     *
     * const fileWithCustomEncryption = myBucket.file('my-file');
     * fileWithCustomEncryption.setEncryptionKey(encryptionKey);
     *
     * const fileWithoutCustomEncryption = myBucket.file('my-file');
     *
     * fileWithCustomEncryption.save('data', function(err) {
     *   // Try to download with the File object that hasn't had
     *   // `setEncryptionKey()` called:
     *   fileWithoutCustomEncryption.download(function(err) {
     *     // We will receive an error:
     *     //   err.message === 'Bad Request'
     *
     *     // Try again with the File object we called `setEncryptionKey()` on:
     *     fileWithCustomEncryption.download(function(err, contents) {
     *       // contents.toString() === 'data'
     *     });
     *   });
     * });
     *
     * ```
     * @example <caption>include:samples/encryption.js</caption>
     * region_tag:storage_upload_encrypted_file
     * Example of uploading an encrypted file:
     *
     * @example <caption>include:samples/encryption.js</caption>
     * region_tag:storage_download_encrypted_file
     * Example of downloading an encrypted file:
     */
    setEncryptionKey(encryptionKey) {
      this.encryptionKey = encryptionKey;
      this.encryptionKeyBase64 = Buffer.from(encryptionKey).toString("base64");
      this.encryptionKeyHash = crypto.createHash("sha256").update(this.encryptionKeyBase64, "base64").digest("base64");
      this.encryptionKeyInterceptor = {
        request: (reqOpts) => {
          reqOpts.headers = reqOpts.headers || {};
          reqOpts.headers["x-goog-encryption-algorithm"] = "AES256";
          reqOpts.headers["x-goog-encryption-key"] = this.encryptionKeyBase64;
          reqOpts.headers["x-goog-encryption-key-sha256"] = this.encryptionKeyHash;
          return reqOpts;
        }
      };
      this.interceptors.push(this.encryptionKeyInterceptor);
      return this;
    }
    /**
     * Gets a reference to a Cloud Storage {@link File} file from the provided URL in string format.
     * @param {string} publicUrlOrGsUrl the URL as a string. Must be of the format gs://bucket/file
     *  or https://storage.googleapis.com/bucket/file.
     * @param {Storage} storageInstance an instance of a Storage object.
     * @param {FileOptions} [options] Configuration options
     * @returns {File}
     */
    static from(publicUrlOrGsUrl, storageInstance, options) {
      const gsMatches = [...publicUrlOrGsUrl.matchAll(GS_UTIL_URL_REGEX)];
      const httpsMatches = [...publicUrlOrGsUrl.matchAll(HTTPS_PUBLIC_URL_REGEX)];
      if (gsMatches.length > 0) {
        const bucket2 = new bucket_js_1.Bucket(storageInstance, gsMatches[0][2]);
        return new File(bucket2, gsMatches[0][3], options);
      } else if (httpsMatches.length > 0) {
        const bucket2 = new bucket_js_1.Bucket(storageInstance, httpsMatches[0][3]);
        return new File(bucket2, httpsMatches[0][4], options);
      } else {
        throw new Error("URL string must be of format gs://bucket/file or https://storage.googleapis.com/bucket/file");
      }
    }
    get(optionsOrCallback, cb) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      cb = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      super.get(options).then((resp) => cb(null, ...resp)).catch(cb);
    }
    /**
     * @typedef {array} GetExpirationDateResponse
     * @property {date} 0 A Date object representing the earliest time this file's
     *     retention policy will expire.
     */
    /**
     * @callback GetExpirationDateCallback
     * @param {?Error} err Request error, if any.
     * @param {date} expirationDate A Date object representing the earliest time
     *     this file's retention policy will expire.
     */
    /**
     * If this bucket has a retention policy defined, use this method to get a
     * Date object representing the earliest time this file will expire.
     *
     * @param {GetExpirationDateCallback} [callback] Callback function.
     * @returns {Promise<GetExpirationDateResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * file.getExpirationDate(function(err, expirationDate) {
     *   // expirationDate is a Date object.
     * });
     * ```
     */
    getExpirationDate(callback) {
      this.getMetadata((err, metadata, apiResponse) => {
        if (err) {
          callback(err, null, apiResponse);
          return;
        }
        if (!metadata.retentionExpirationTime) {
          const error = new Error(FileExceptionMessages.EXPIRATION_TIME_NA);
          callback(error, null, apiResponse);
          return;
        }
        callback(null, new Date(metadata.retentionExpirationTime), apiResponse);
      });
    }
    /**
     * @typedef {array} GenerateSignedPostPolicyV2Response
     * @property {object} 0 The document policy.
     */
    /**
     * @callback GenerateSignedPostPolicyV2Callback
     * @param {?Error} err Request error, if any.
     * @param {object} policy The document policy.
     */
    /**
     * Get a signed policy document to allow a user to upload data with a POST
     * request.
     *
     * In Google Cloud Platform environments, such as Cloud Functions and App
     * Engine, you usually don't provide a `keyFilename` or `credentials` during
     * instantiation. In those environments, we call the
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob| signBlob API}
     * to create a signed policy. That API requires either the
     * `https://www.googleapis.com/auth/iam` or
     * `https://www.googleapis.com/auth/cloud-platform` scope, so be sure they are
     * enabled.
     *
     * See {@link https://cloud.google.com/storage/docs/xml-api/post-object-v2| POST Object with the V2 signing process}
     *
     * @throws {Error} If an expiration timestamp from the past is given.
     * @throws {Error} If options.equals has an array with less or more than two
     *     members.
     * @throws {Error} If options.startsWith has an array with less or more than two
     *     members.
     *
     * @param {object} options Configuration options.
     * @param {array|array[]} [options.equals] Array of request parameters and
     *     their expected value (e.g. [['$<field>', '<value>']]). Values are
     *     translated into equality constraints in the conditions field of the
     *     policy document (e.g. ['eq', '$<field>', '<value>']). If only one
     *     equality condition is to be specified, options.equals can be a one-
     *     dimensional array (e.g. ['$<field>', '<value>']).
     * @param {*} options.expires - A timestamp when this policy will expire. Any
     *     value given is passed to `new Date()`.
     * @param {array|array[]} [options.startsWith] Array of request parameters and
     *     their expected prefixes (e.g. [['$<field>', '<value>']). Values are
     *     translated into starts-with constraints in the conditions field of the
     *     policy document (e.g. ['starts-with', '$<field>', '<value>']). If only
     *     one prefix condition is to be specified, options.startsWith can be a
     * one- dimensional array (e.g. ['$<field>', '<value>']).
     * @param {string} [options.acl] ACL for the object from possibly predefined
     *     ACLs.
     * @param {string} [options.successRedirect] The URL to which the user client
     *     is redirected if the upload is successful.
     * @param {string} [options.successStatus] - The status of the Google Storage
     *     response if the upload is successful (must be string).
     * @param {object} [options.contentLengthRange]
     * @param {number} [options.contentLengthRange.min] Minimum value for the
     *     request's content length.
     * @param {number} [options.contentLengthRange.max] Maximum value for the
     *     request's content length.
     * @param {GenerateSignedPostPolicyV2Callback} [callback] Callback function.
     * @returns {Promise<GenerateSignedPostPolicyV2Response>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * const options = {
     *   equals: ['$Content-Type', 'image/jpeg'],
     *   expires: '10-25-2022',
     *   contentLengthRange: {
     *     min: 0,
     *     max: 1024
     *   }
     * };
     *
     * file.generateSignedPostPolicyV2(options, function(err, policy) {
     *   // policy.string: the policy document in plain text.
     *   // policy.base64: the policy document in base64.
     *   // policy.signature: the policy signature in base64.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.generateSignedPostPolicyV2(options).then(function(data) {
     *   const policy = data[0];
     * });
     * ```
     */
    generateSignedPostPolicyV2(optionsOrCallback, cb) {
      const args = (0, util_js_2.normalize)(optionsOrCallback, cb);
      let options = args.options;
      const callback = args.callback;
      const expires = new Date(options.expires);
      if (isNaN(expires.getTime())) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_INVALID);
      }
      if (expires.valueOf() < Date.now()) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_PAST);
      }
      options = Object.assign({}, options);
      const conditions = [
        ["eq", "$key", this.name],
        {
          bucket: this.bucket.name
        }
      ];
      if (Array.isArray(options.equals)) {
        if (!Array.isArray(options.equals[0])) {
          options.equals = [options.equals];
        }
        options.equals.forEach((condition) => {
          if (!Array.isArray(condition) || condition.length !== 2) {
            throw new Error(FileExceptionMessages.EQUALS_CONDITION_TWO_ELEMENTS);
          }
          conditions.push(["eq", condition[0], condition[1]]);
        });
      }
      if (Array.isArray(options.startsWith)) {
        if (!Array.isArray(options.startsWith[0])) {
          options.startsWith = [options.startsWith];
        }
        options.startsWith.forEach((condition) => {
          if (!Array.isArray(condition) || condition.length !== 2) {
            throw new Error(FileExceptionMessages.STARTS_WITH_TWO_ELEMENTS);
          }
          conditions.push(["starts-with", condition[0], condition[1]]);
        });
      }
      if (options.acl) {
        conditions.push({
          acl: options.acl
        });
      }
      if (options.successRedirect) {
        conditions.push({
          success_action_redirect: options.successRedirect
        });
      }
      if (options.successStatus) {
        conditions.push({
          success_action_status: options.successStatus
        });
      }
      if (options.contentLengthRange) {
        const min = options.contentLengthRange.min;
        const max = options.contentLengthRange.max;
        if (typeof min !== "number" || typeof max !== "number") {
          throw new Error(FileExceptionMessages.CONTENT_LENGTH_RANGE_MIN_MAX);
        }
        conditions.push(["content-length-range", min, max]);
      }
      const policy = {
        expiration: expires.toISOString(),
        conditions
      };
      const policyString = JSON.stringify(policy);
      const policyBase64 = Buffer.from(policyString).toString("base64");
      this.storage.authClient.sign(policyBase64, options.signingEndpoint).then((signature) => {
        callback(null, {
          string: policyString,
          base64: policyBase64,
          signature
        });
      }, (err) => {
        callback(new signer_js_1.SigningError(err.message));
      });
    }
    /**
     * @typedef {object} SignedPostPolicyV4Output
     * @property {string} url The request URL.
     * @property {object} fields The form fields to include in the POST request.
     */
    /**
     * @typedef {array} GenerateSignedPostPolicyV4Response
     * @property {SignedPostPolicyV4Output} 0 An object containing the request URL and form fields.
     */
    /**
     * @callback GenerateSignedPostPolicyV4Callback
     * @param {?Error} err Request error, if any.
     * @param {SignedPostPolicyV4Output} output An object containing the request URL and form fields.
     */
    /**
     * Get a v4 signed policy document to allow a user to upload data with a POST
     * request.
     *
     * In Google Cloud Platform environments, such as Cloud Functions and App
     * Engine, you usually don't provide a `keyFilename` or `credentials` during
     * instantiation. In those environments, we call the
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob| signBlob API}
     * to create a signed policy. That API requires either the
     * `https://www.googleapis.com/auth/iam` or
     * `https://www.googleapis.com/auth/cloud-platform` scope, so be sure they are
     * enabled.
     *
     * See {@link https://cloud.google.com/storage/docs/xml-api/post-object#policydocument| Policy Document Reference}
     *
     * @param {object} options Configuration options.
     * @param {Date|number|string} options.expires - A timestamp when this policy will expire. Any
     *     value given is passed to `new Date()`.
     * @param {boolean} [config.virtualHostedStyle=false] Use virtual hosted-style
     *     URLs ('https://mybucket.storage.googleapis.com/...') instead of path-style
     *     ('https://storage.googleapis.com/mybucket/...'). Virtual hosted-style URLs
     *     should generally be preferred instead of path-style URL.
     *     Currently defaults to `false` for path-style, although this may change in a
     *     future major-version release.
     * @param {string} [config.bucketBoundHostname] The bucket-bound hostname to return in
     *     the result, e.g. "https://cdn.example.com".
     * @param {object} [config.fields] [Form fields]{@link https://cloud.google.com/storage/docs/xml-api/post-object#policydocument}
     *     to include in the signed policy. Any fields with key beginning with 'x-ignore-'
     *     will not be included in the policy to be signed.
     * @param {object[]} [config.conditions] [Conditions]{@link https://cloud.google.com/storage/docs/authentication/signatures#policy-document}
     *     to include in the signed policy. All fields given in `config.fields` are
     *     automatically included in the conditions array, adding the same entry
     *     in both `fields` and `conditions` will result in duplicate entries.
     *
     * @param {GenerateSignedPostPolicyV4Callback} [callback] Callback function.
     * @returns {Promise<GenerateSignedPostPolicyV4Response>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * const options = {
     *   expires: '10-25-2022',
     *   conditions: [
     *     ['eq', '$Content-Type', 'image/jpeg'],
     *     ['content-length-range', 0, 1024],
     *   ],
     *   fields: {
     *     acl: 'public-read',
     *     'x-goog-meta-foo': 'bar',
     *     'x-ignore-mykey': 'data'
     *   }
     * };
     *
     * file.generateSignedPostPolicyV4(options, function(err, response) {
     *   // response.url The request URL
     *   // response.fields The form fields (including the signature) to include
     *   //     to be used to upload objects by HTML forms.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.generateSignedPostPolicyV4(options).then(function(data) {
     *   const response = data[0];
     *   // response.url The request URL
     *   // response.fields The form fields (including the signature) to include
     *   //     to be used to upload objects by HTML forms.
     * });
     * ```
     */
    generateSignedPostPolicyV4(optionsOrCallback, cb) {
      const args = (0, util_js_2.normalize)(optionsOrCallback, cb);
      let options = args.options;
      const callback = args.callback;
      const expires = new Date(options.expires);
      if (isNaN(expires.getTime())) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_INVALID);
      }
      if (expires.valueOf() < Date.now()) {
        throw new Error(storage_js_1.ExceptionMessages.EXPIRATION_DATE_PAST);
      }
      if (expires.valueOf() - Date.now() > SEVEN_DAYS * 1e3) {
        throw new Error(`Max allowed expiration is seven days (${SEVEN_DAYS} seconds).`);
      }
      options = Object.assign({}, options);
      let fields = Object.assign({}, options.fields);
      const now = /* @__PURE__ */ new Date();
      const nowISO = (0, util_js_2.formatAsUTCISO)(now, true);
      const todayISO = (0, util_js_2.formatAsUTCISO)(now);
      const sign = async () => {
        const { client_email } = await this.storage.authClient.getCredentials();
        const credential = `${client_email}/${todayISO}/auto/storage/goog4_request`;
        fields = {
          ...fields,
          bucket: this.bucket.name,
          key: this.name,
          "x-goog-date": nowISO,
          "x-goog-credential": credential,
          "x-goog-algorithm": "GOOG4-RSA-SHA256"
        };
        const conditions = options.conditions || [];
        Object.entries(fields).forEach(([key, value]) => {
          if (!key.startsWith("x-ignore-")) {
            conditions.push({ [key]: value });
          }
        });
        delete fields.bucket;
        const expiration = (0, util_js_2.formatAsUTCISO)(expires, true, "-", ":");
        const policy = {
          conditions,
          expiration
        };
        const policyString = (0, util_js_2.unicodeJSONStringify)(policy);
        const policyBase64 = Buffer.from(policyString).toString("base64");
        try {
          const signature = await this.storage.authClient.sign(policyBase64, options.signingEndpoint);
          const signatureHex = Buffer.from(signature, "base64").toString("hex");
          const universe = this.parent.storage.universeDomain;
          fields["policy"] = policyBase64;
          fields["x-goog-signature"] = signatureHex;
          let url;
          const EMULATOR_HOST = process.env.STORAGE_EMULATOR_HOST;
          if (this.storage.customEndpoint && typeof EMULATOR_HOST === "string") {
            url = `${this.storage.apiEndpoint}/${this.bucket.name}`;
          } else if (this.storage.customEndpoint) {
            url = this.storage.apiEndpoint;
          } else if (options.virtualHostedStyle) {
            url = `https://${this.bucket.name}.storage.${universe}/`;
          } else if (options.bucketBoundHostname) {
            url = `${options.bucketBoundHostname}/`;
          } else {
            url = `https://storage.${universe}/${this.bucket.name}/`;
          }
          return {
            url,
            fields
          };
        } catch (err) {
          throw new signer_js_1.SigningError(err.message);
        }
      };
      sign().then((res) => callback(null, res), callback);
    }
    /**
     * @typedef {array} GetSignedUrlResponse
     * @property {object} 0 The signed URL.
     */
    /**
     * @callback GetSignedUrlCallback
     * @param {?Error} err Request error, if any.
     * @param {object} url The signed URL.
     */
    /**
     * Get a signed URL to allow limited time access to the file.
     *
     * In Google Cloud Platform environments, such as Cloud Functions and App
     * Engine, you usually don't provide a `keyFilename` or `credentials` during
     * instantiation. In those environments, we call the
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob| signBlob API}
     * to create a signed URL. That API requires either the
     * `https://www.googleapis.com/auth/iam` or
     * `https://www.googleapis.com/auth/cloud-platform` scope, so be sure they are
     * enabled.
     *
     * See {@link https://cloud.google.com/storage/docs/access-control/signed-urls| Signed URLs Reference}
     *
     * @throws {Error} if an expiration timestamp from the past is given.
     *
     * @param {object} config Configuration object.
     * @param {string} config.action "read" (HTTP: GET), "write" (HTTP: PUT), or
     *     "delete" (HTTP: DELETE), "resumable" (HTTP: POST).
     *     When using "resumable", the header `X-Goog-Resumable: start` has
     *     to be sent when making a request with the signed URL.
     * @param {*} config.expires A timestamp when this link will expire. Any value
     *     given is passed to `new Date()`.
     *     Note: 'v4' supports maximum duration of 7 days (604800 seconds) from now.
     *     See [reference]{@link https://cloud.google.com/storage/docs/access-control/signed-urls#example}
     * @param {string} [config.version='v2'] The signing version to use, either
     *     'v2' or 'v4'.
     * @param {boolean} [config.virtualHostedStyle=false] Use virtual hosted-style
     *     URLs (e.g. 'https://mybucket.storage.googleapis.com/...') instead of path-style
     *     (e.g. 'https://storage.googleapis.com/mybucket/...'). Virtual hosted-style URLs
     *     should generally be preferred instead of path-style URL.
     *     Currently defaults to `false` for path-style, although this may change in a
     *     future major-version release.
     * @param {string} [config.cname] The cname for this bucket, i.e.,
     *     "https://cdn.example.com".
     * @param {string} [config.contentMd5] The MD5 digest value in base64. Just like
     *     if you provide this, the client must provide this HTTP header with this same
     *     value in its request, so to if this parameter is not provided here,
     *     the client must not provide any value for this HTTP header in its request.
     * @param {string} [config.contentType] Just like if you provide this, the client
     *     must provide this HTTP header with this same value in its request, so to if
     *     this parameter is not provided here, the client must not provide any value
     *     for this HTTP header in its request.
     * @param {object} [config.extensionHeaders] If these headers are used, the
     * server will check to make sure that the client provides matching
     * values. See {@link https://cloud.google.com/storage/docs/access-control/signed-urls#about-canonical-extension-headers| Canonical extension headers}
     * for the requirements of this feature, most notably:
     * - The header name must be prefixed with `x-goog-`
     * - The header name must be all lowercase
     *
     * Note: Multi-valued header passed as an array in the extensionHeaders
     *       object is converted into a string, delimited by `,` with
     *       no space. Requests made using the signed URL will need to
     *       delimit multi-valued headers using a single `,` as well, or
     *       else the server will report a mismatched signature.
     * @param {object} [config.queryParams] Additional query parameters to include
     *     in the signed URL.
     * @param {string} [config.promptSaveAs] The filename to prompt the user to
     *     save the file as when the signed url is accessed. This is ignored if
     *     `config.responseDisposition` is set.
     * @param {string} [config.responseDisposition] The
     *     {@link http://goo.gl/yMWxQV| response-content-disposition parameter} of the
     *     signed url.
     * @param {*} [config.accessibleAt=Date.now()] A timestamp when this link became usable. Any value
     *     given is passed to `new Date()`.
     *     Note: Use for 'v4' only.
     * @param {string} [config.responseType] The response-content-type parameter
     *     of the signed url.
     * @param {GetSignedUrlCallback} [callback] Callback function.
     * @returns {Promise<GetSignedUrlResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * //-
     * // Generate a URL that allows temporary access to download your file.
     * //-
     * const request = require('request');
     *
     * const config = {
     *   action: 'read',
     *   expires: '03-17-2025',
     * };
     *
     * file.getSignedUrl(config, function(err, url) {
     *   if (err) {
     *     console.error(err);
     *     return;
     *   }
     *
     *   // The file is now available to read from this URL.
     *   request(url, function(err, resp) {
     *     // resp.statusCode = 200
     *   });
     * });
     *
     * //-
     * // Generate a URL that allows temporary access to download your file.
     * // Access will begin at accessibleAt and end at expires.
     * //-
     * const request = require('request');
     *
     * const config = {
     *   action: 'read',
     *   expires: '03-17-2025',
     *   accessibleAt: '03-13-2025'
     * };
     *
     * file.getSignedUrl(config, function(err, url) {
     *   if (err) {
     *     console.error(err);
     *     return;
     *   }
     *
     *   // The file will be available to read from this URL from 03-13-2025 to 03-17-2025.
     *   request(url, function(err, resp) {
     *     // resp.statusCode = 200
     *   });
     * });
     *
     * //-
     * // Generate a URL to allow write permissions. This means anyone with this
     * URL
     * // can send a POST request with new data that will overwrite the file.
     * //-
     * file.getSignedUrl({
     *   action: 'write',
     *   expires: '03-17-2025'
     * }, function(err, url) {
     *   if (err) {
     *     console.error(err);
     *     return;
     *   }
     *
     *   // The file is now available to be written to.
     *   const writeStream = request.put(url);
     *   writeStream.end('New data');
     *
     *   writeStream.on('complete', function(resp) {
     *     // Confirm the new content was saved.
     *     file.download(function(err, fileContents) {
     *       console.log('Contents:', fileContents.toString());
     *       // Contents: New data
     *     });
     *   });
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.getSignedUrl(config).then(function(data) {
     *   const url = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_generate_signed_url
     * Another example:
     */
    getSignedUrl(cfg, callback) {
      const method = ActionToHTTPMethod[cfg.action];
      const extensionHeaders = (0, util_js_2.objectKeyToLowercase)(cfg.extensionHeaders || {});
      if (cfg.action === "resumable") {
        extensionHeaders["x-goog-resumable"] = "start";
      }
      const queryParams = Object.assign({}, cfg.queryParams);
      if (typeof cfg.responseType === "string") {
        queryParams["response-content-type"] = cfg.responseType;
      }
      if (typeof cfg.promptSaveAs === "string") {
        queryParams["response-content-disposition"] = 'attachment; filename="' + cfg.promptSaveAs + '"';
      }
      if (typeof cfg.responseDisposition === "string") {
        queryParams["response-content-disposition"] = cfg.responseDisposition;
      }
      if (this.generation) {
        queryParams["generation"] = this.generation.toString();
      }
      const signConfig = {
        method,
        expires: cfg.expires,
        accessibleAt: cfg.accessibleAt,
        extensionHeaders,
        queryParams,
        contentMd5: cfg.contentMd5,
        contentType: cfg.contentType,
        host: cfg.host
      };
      if (cfg.cname) {
        signConfig.cname = cfg.cname;
      }
      if (cfg.version) {
        signConfig.version = cfg.version;
      }
      if (cfg.virtualHostedStyle) {
        signConfig.virtualHostedStyle = cfg.virtualHostedStyle;
      }
      if (!this.signer) {
        this.signer = new signer_js_1.URLSigner(this.storage.authClient, this.bucket, this, this.storage);
      }
      this.signer.getSignedUrl(signConfig).then((signedUrl) => callback(null, signedUrl), callback);
    }
    /**
     * @callback IsPublicCallback
     * @param {?Error} err Request error, if any.
     * @param {boolean} resp Whether file is public or not.
     */
    /**
     * @typedef {array} IsPublicResponse
     * @property {boolean} 0 Whether file is public or not.
     */
    /**
     * Check whether this file is public or not by sending
     * a HEAD request without credentials.
     * No errors from the server indicates that the current
     * file is public.
     * A 403-Forbidden error {@link https://cloud.google.com/storage/docs/json_api/v1/status-codes#403_Forbidden}
     * indicates that file is private.
     * Any other non 403 error is propagated to user.
     *
     * @param {IsPublicCallback} [callback] Callback function.
     * @returns {Promise<IsPublicResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * //-
     * // Check whether the file is publicly accessible.
     * //-
     * file.isPublic(function(err, resp) {
     *   if (err) {
     *     console.error(err);
     *     return;
     *   }
     *   console.log(`the file ${file.id} is public: ${resp}`) ;
     * })
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.isPublic().then(function(data) {
     *   const resp = data[0];
     * });
     * ```
     */
    isPublic(callback) {
      var _a;
      const storageInterceptors = ((_a = this.storage) === null || _a === void 0 ? void 0 : _a.interceptors) || [];
      const fileInterceptors = this.interceptors || [];
      const allInterceptors = storageInterceptors.concat(fileInterceptors);
      const headers = allInterceptors.reduce((acc, curInterceptor) => {
        const currentHeaders = curInterceptor.request({
          uri: `${this.storage.apiEndpoint}/${this.bucket.name}/${encodeURIComponent(this.name)}`
        });
        Object.assign(acc, currentHeaders.headers);
        return acc;
      }, {});
      index_js_1.util.makeRequest({
        method: "GET",
        uri: `${this.storage.apiEndpoint}/${this.bucket.name}/${encodeURIComponent(this.name)}`,
        headers
      }, {
        retryOptions: this.storage.retryOptions
      }, (err) => {
        if (err) {
          const apiError = err;
          if (apiError.code === 403) {
            callback(null, false);
          } else {
            callback(err);
          }
        } else {
          callback(null, true);
        }
      });
    }
    /**
     * @typedef {object} MakeFilePrivateOptions Configuration options for File#makePrivate().
     * @property {Metadata} [metadata] Define custom metadata properties to define
     *     along with the operation.
     * @property {boolean} [strict] If true, set the file to be private to
     *     only the owner user. Otherwise, it will be private to the project.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback MakeFilePrivateCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {array} MakeFilePrivateResponse
     * @property {object} 0 The full API response.
     */
    /**
     * Make a file private to the project and remove all other permissions.
     * Set `options.strict` to true to make the file private to only the owner.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/patch| Objects: patch API Documentation}
     *
     * @param {MakeFilePrivateOptions} [options] Configuration options.
     * @param {MakeFilePrivateCallback} [callback] Callback function.
     * @returns {Promise<MakeFilePrivateResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * //-
     * // Set the file private so only project maintainers can see and modify it.
     * //-
     * file.makePrivate(function(err) {});
     *
     * //-
     * // Set the file private so only the owner can see and modify it.
     * //-
     * file.makePrivate({ strict: true }, function(err) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.makePrivate().then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    makePrivate(optionsOrCallback, callback) {
      var _a, _b;
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const query = {
        predefinedAcl: options.strict ? "private" : "projectPrivate"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      };
      if (((_a = options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifMetagenerationMatch) !== void 0) {
        query.ifMetagenerationMatch = (_b = options.preconditionOpts) === null || _b === void 0 ? void 0 : _b.ifMetagenerationMatch;
        delete options.preconditionOpts;
      }
      if (options.userProject) {
        query.userProject = options.userProject;
      }
      const metadata = { ...options.metadata, acl: null };
      this.setMetadata(metadata, query, callback);
    }
    /**
     * @typedef {array} MakeFilePublicResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @callback MakeFilePublicCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Set a file to be publicly readable and maintain all previous permissions.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objectAccessControls/insert| ObjectAccessControls: insert API Documentation}
     *
     * @param {MakeFilePublicCallback} [callback] Callback function.
     * @returns {Promise<MakeFilePublicResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     *
     * file.makePublic(function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.makePublic().then(function(data) {
     *   const apiResponse = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_make_public
     * Another example:
     */
    makePublic(callback) {
      callback = callback || index_js_1.util.noop;
      this.acl.add({
        entity: "allUsers",
        role: "READER"
      }, (err, acl2, resp) => {
        callback(err, resp);
      });
    }
    /**
     * The public URL of this File
     * Use {@link File#makePublic} to enable anonymous access via the returned URL.
     *
     * @returns {string}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     * const file = bucket.file('my-file');
     *
     * // publicUrl will be "https://storage.googleapis.com/albums/my-file"
     * const publicUrl = file.publicUrl();
     * ```
     */
    publicUrl() {
      return `${this.storage.apiEndpoint}/${this.bucket.name}/${encodeURIComponent(this.name)}`;
    }
    /**
     * @typedef {array} MoveFileAtomicResponse
     * @property {File} 0 The moved {@link File}.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback MoveFileAtomicCallback
     * @param {?Error} err Request error, if any.
     * @param {File} movedFile The moved {@link File}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {object} MoveFileAtomicOptions Configuration options for File#moveFileAtomic(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects#resource| Object resource}.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {object} [preconditionOpts] Precondition options.
     * @property {number} [preconditionOpts.ifGenerationMatch] Makes the operation conditional on whether the object's current generation matches the given value.
     */
    /**
     * Move this file within the same bucket.
     * The source object must exist and be a live object.
     * The source and destination object IDs must be different.
     * Overwriting the destination object is allowed by default, but can be prevented
     * using preconditions.
     * If the destination path includes non-existent parent folders, they will be created.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/move| Objects: move API Documentation}
     *
     * @throws {Error} If the destination file is not provided.
     *
     * @param {string|File} destination Destination file name or File object within the same bucket..
     * @param {MoveFileAtomicOptions} [options] Configuration options. See an
     * @param {MoveFileAtomicCallback} [callback] Callback function.
     * @returns {Promise<MoveFileAtomicResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     *
     * //-
     * // Assume 'my-bucket' is a bucket.
     * //-
     * const bucket = storage.bucket('my-bucket');
     * const file = bucket.file('my-image.png');
     *
     * //-
     * // If you pass in a string for the destination, the file is copied to its
     * // current bucket, under the new name provided.
     * //-
     * file.moveFileAtomic('moved-image.png', function(err, movedFile, apiResponse) {
     *   // `my-bucket` now contains:
     *   // - "moved-image.png"
     *
     *   // `movedFile` is an instance of a File object that refers to your new
     *   // file.
     * });
     *
     * //-
     * // Move the file to a subdirectory, creating parent folders if necessary.
     * //-
     * file.moveFileAtomic('new-folder/subfolder/moved-image.png', function(err, movedFile, apiResponse) {
     * // `my-bucket` now contains:
     * // - "new-folder/subfolder/moved-image.png"
     * });
     *
     * //-
     * // Prevent overwriting an existing destination object using preconditions.
     * //-
     * file.moveFileAtomic('existing-destination.png', {
     * preconditionOpts: {
     * ifGenerationMatch: 0 // Fails if the destination object exists.
     * }
     * }, function(err, movedFile, apiResponse) {
     * if (err) {
     * // Handle the error (e.g., the destination object already exists).
     * } else {
     * // Move successful.
     * }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.moveFileAtomic('moved-image.png).then(function(data) {
     *   const newFile = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_move_file
     * Another example:
     */
    moveFileAtomic(destination, optionsOrCallback, callback) {
      var _a, _b;
      const noDestinationError = new Error(FileExceptionMessages.DESTINATION_NO_NAME);
      if (!destination) {
        throw noDestinationError;
      }
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = { ...optionsOrCallback };
      }
      callback = callback || index_js_1.util.noop;
      let destName;
      let newFile;
      if (typeof destination === "string") {
        const parsedDestination = GS_URL_REGEXP.exec(destination);
        if (parsedDestination !== null && parsedDestination.length === 3) {
          destName = parsedDestination[2];
        } else {
          destName = destination;
        }
      } else if (destination instanceof File) {
        destName = destination.name;
        newFile = destination;
      } else {
        throw noDestinationError;
      }
      newFile = newFile || this.bucket.file(destName);
      if (!this.shouldRetryBasedOnPreconditionAndIdempotencyStrat(options === null || options === void 0 ? void 0 : options.preconditionOpts)) {
        this.storage.retryOptions.autoRetry = false;
      }
      const query = {};
      if (options.userProject !== void 0) {
        query.userProject = options.userProject;
        delete options.userProject;
      }
      if (((_a = options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) !== void 0) {
        query.ifGenerationMatch = (_b = options.preconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationMatch;
        delete options.preconditionOpts;
      }
      this.request({
        method: "POST",
        uri: `/moveTo/o/${encodeURIComponent(newFile.name)}`,
        qs: query,
        json: options
      }, (err, resp) => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
        if (err) {
          callback(err, null, resp);
          return;
        }
        callback(null, newFile, resp);
      });
    }
    /**
     * @typedef {array} MoveResponse
     * @property {File} 0 The destination File.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback MoveCallback
     * @param {?Error} err Request error, if any.
     * @param {?File} destinationFile The destination File.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {object} MoveOptions Configuration options for File#move(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects#resource| Object resource}.
     * @param {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * Move this file to another location. By default, this will rename the file
     * and keep it in the same bucket, but you can choose to move it to another
     * Bucket by providing a Bucket or File object or a URL beginning with
     * "gs://".
     *
     * **Warning**:
     * There is currently no atomic `move` method in the Cloud Storage API,
     * so this method is a composition of {@link File#copy} (to the new
     * location) and {@link File#delete} (from the old location). While
     * unlikely, it is possible that an error returned to your callback could be
     * triggered from either one of these API calls failing, which could leave a
     * duplicate file lingering. The error message will indicate what operation
     * has failed.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/copy| Objects: copy API Documentation}
     *
     * @throws {Error} If the destination file is not provided.
     *
     * @param {string|Bucket|File} destination Destination file.
     * @param {MoveCallback} [callback] Callback function.
     * @returns {Promise<MoveResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * //-
     * // You can pass in a variety of types for the destination.
     * //
     * // For all of the below examples, assume we are working with the following
     * // Bucket and File objects.
     * //-
     * const bucket = storage.bucket('my-bucket');
     * const file = bucket.file('my-image.png');
     *
     * //-
     * // If you pass in a string for the destination, the file is moved to its
     * // current bucket, under the new name provided.
     * //-
     * file.move('my-image-new.png', function(err, destinationFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *   // but contains instead:
     *   // - "my-image-new.png"
     *
     *   // `destinationFile` is an instance of a File object that refers to your
     *   // new file.
     * });
     *
     * //-
     * // If you pass in a string starting with "gs://" for the destination, the
     * // file is copied to the other bucket and under the new name provided.
     * //-
     * const newLocation = 'gs://another-bucket/my-image-new.png';
     * file.move(newLocation, function(err, destinationFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-image-new.png"
     *
     *   // `destinationFile` is an instance of a File object that refers to your
     *   // new file.
     * });
     *
     * //-
     * // If you pass in a Bucket object, the file will be moved to that bucket
     * // using the same name.
     * //-
     * const anotherBucket = gcs.bucket('another-bucket');
     *
     * file.move(anotherBucket, function(err, destinationFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-image.png"
     *
     *   // `destinationFile` is an instance of a File object that refers to your
     *   // new file.
     * });
     *
     * //-
     * // If you pass in a File object, you have complete control over the new
     * // bucket and filename.
     * //-
     * const anotherFile = anotherBucket.file('my-awesome-image.png');
     *
     * file.move(anotherFile, function(err, destinationFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *   //
     *   // `another-bucket` now contains:
     *   // - "my-awesome-image.png"
     *
     *   // Note:
     *   // The `destinationFile` parameter is equal to `anotherFile`.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.move('my-image-new.png').then(function(data) {
     *   const destinationFile = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_move_file
     * Another example:
     */
    move(destination, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      callback = callback || index_js_1.util.noop;
      this.copy(destination, options, (err, destinationFile, copyApiResponse) => {
        if (err) {
          err.message = "file#copy failed with an error - " + err.message;
          callback(err, null, copyApiResponse);
          return;
        }
        if (this.name !== destinationFile.name || this.bucket.name !== destinationFile.bucket.name) {
          this.delete(options, (err2, apiResponse) => {
            if (err2) {
              err2.message = "file#delete failed with an error - " + err2.message;
              callback(err2, destinationFile, apiResponse);
              return;
            }
            callback(null, destinationFile, copyApiResponse);
          });
        } else {
          callback(null, destinationFile, copyApiResponse);
        }
      });
    }
    /**
     * @typedef {array} RenameResponse
     * @property {File} 0 The destination File.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback RenameCallback
     * @param {?Error} err Request error, if any.
     * @param {?File} destinationFile The destination File.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {object} RenameOptions Configuration options for File#move(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects#resource| Object resource}.
     * @param {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * Rename this file.
     *
     * **Warning**:
     * There is currently no atomic `rename` method in the Cloud Storage API,
     * so this method is an alias of {@link File#move}, which in turn is a
     * composition of {@link File#copy} (to the new location) and
     * {@link File#delete} (from the old location). While
     * unlikely, it is possible that an error returned to your callback could be
     * triggered from either one of these API calls failing, which could leave a
     * duplicate file lingering. The error message will indicate what operation
     * has failed.
     *
     * @param {string|File} destinationFile Destination file.
     * @param {RenameCallback} [callback] Callback function.
     * @returns {Promise<RenameResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     *
     * //-
     * // You can pass in a string or a File object.
     * //
     * // For all of the below examples, assume we are working with the following
     * // Bucket and File objects.
     * //-
     *
     * const bucket = storage.bucket('my-bucket');
     * const file = bucket.file('my-image.png');
     *
     * //-
     * // You can pass in a string for the destinationFile.
     * //-
     * file.rename('renamed-image.png', function(err, renamedFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *   // but contains instead:
     *   // - "renamed-image.png"
     *
     *   // `renamedFile` is an instance of a File object that refers to your
     *   // renamed file.
     * });
     *
     * //-
     * // You can pass in a File object.
     * //-
     * const anotherFile = anotherBucket.file('my-awesome-image.png');
     *
     * file.rename(anotherFile, function(err, renamedFile, apiResponse) {
     *   // `my-bucket` no longer contains:
     *   // - "my-image.png"
     *
     *   // Note:
     *   // The `renamedFile` parameter is equal to `anotherFile`.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.rename('my-renamed-image.png').then(function(data) {
     *   const renamedFile = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    rename(destinationFile, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      callback = callback || index_js_1.util.noop;
      this.move(destinationFile, options, callback);
    }
    /**
     * @typedef {object} RestoreOptions Options for File#restore(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects#resource| Object resource}.
     * @param {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @param {number} [generation] If present, selects a specific revision of this object.
     * @param {string} [restoreToken] Returns an option that must be specified when getting a soft-deleted object from an HNS-enabled
     *  bucket that has a naming and generation conflict with another object in the same bucket.
     * @param {string} [projection] Specifies the set of properties to return. If used, must be 'full' or 'noAcl'.
     * @param {string | number} [ifGenerationMatch] Request proceeds if the generation of the target resource
     *  matches the value used in the precondition.
     *  If the values don't match, the request fails with a 412 Precondition Failed response.
     * @param {string | number} [ifGenerationNotMatch] Request proceeds if the generation of the target resource does
     *  not match the value used in the precondition. If the values match, the request fails with a 304 Not Modified response.
     * @param {string | number} [ifMetagenerationMatch] Request proceeds if the meta-generation of the target resource
     *  matches the value used in the precondition.
     *  If the values don't match, the request fails with a 412 Precondition Failed response.
     * @param {string | number} [ifMetagenerationNotMatch]  Request proceeds if the meta-generation of the target resource does
     *  not match the value used in the precondition. If the values match, the request fails with a 304 Not Modified response.
     */
    /**
     * Restores a soft-deleted file
     * @param {RestoreOptions} options Restore options.
     * @returns {Promise<File>}
     */
    async restore(options) {
      const [file2] = await this.request({
        method: "POST",
        uri: "/restore",
        qs: options
      });
      return file2;
    }
    /**
     * Makes request and applies userProject query parameter if necessary.
     *
     * @private
     *
     * @param {object} reqOpts - The request options.
     * @param {function} callback - The callback function.
     */
    request(reqOpts, callback) {
      return this.parent.request.call(this, reqOpts, callback);
    }
    /**
     * @callback RotateEncryptionKeyCallback
     * @extends CopyCallback
     */
    /**
     * @typedef RotateEncryptionKeyResponse
     * @extends CopyResponse
     */
    /**
     * @param {string|buffer|object} RotateEncryptionKeyOptions Configuration options
     *     for File#rotateEncryptionKey().
     * If a string or Buffer is provided, it is interpreted as an AES-256,
     * customer-supplied encryption key. If you'd like to use a Cloud KMS key
     * name, you must specify an options object with the property name:
     * `kmsKeyName`.
     * @param {string|buffer} [options.encryptionKey] An AES-256 encryption key.
     * @param {string} [options.kmsKeyName] A Cloud KMS key name.
     */
    /**
     * This method allows you to update the encryption key associated with this
     * file.
     *
     * See {@link https://cloud.google.com/storage/docs/encryption#customer-supplied| Customer-supplied Encryption Keys}
     *
     * @param {RotateEncryptionKeyOptions} [options] - Configuration options.
     * @param {RotateEncryptionKeyCallback} [callback]
     * @returns {Promise<File>}
     *
     * @example <caption>include:samples/encryption.js</caption>
     * region_tag:storage_rotate_encryption_key
     * Example of rotating the encryption key for this file:
     */
    rotateEncryptionKey(optionsOrCallback, callback) {
      var _a;
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      let options = {};
      if (typeof optionsOrCallback === "string" || optionsOrCallback instanceof Buffer) {
        options = {
          encryptionKey: optionsOrCallback
        };
      } else if (typeof optionsOrCallback === "object") {
        options = optionsOrCallback;
      }
      const newFile = this.bucket.file(this.id, options);
      const copyOptions = ((_a = options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) !== void 0 ? { preconditionOpts: options.preconditionOpts } : {};
      this.copy(newFile, copyOptions, callback);
    }
    /**
     * @typedef {object} SaveOptions
     * @extends CreateWriteStreamOptions
     */
    /**
     * @callback SaveCallback
     * @param {?Error} err Request error, if any.
     */
    /**
     * Write strings or buffers to a file.
     *
     * *This is a convenience method which wraps {@link File#createWriteStream}.*
     * To upload arbitrary data to a file, please use {@link File#createWriteStream} directly.
     *
     * Resumable uploads are automatically enabled and must be shut off explicitly
     * by setting `options.resumable` to `false`.
     *
     * Multipart uploads with retryable error codes will be retried 3 times with exponential backoff.
     *
     * <p class="notice">
     *   There is some overhead when using a resumable upload that can cause
     *   noticeable performance degradation while uploading a series of small
     * files. When uploading files less than 10MB, it is recommended that the
     * resumable feature is disabled.
     * </p>
     *
     * @param {SaveData} data The data to write to a file.
     * @param {SaveOptions} [options] See {@link File#createWriteStream}'s `options`
     *     parameter.
     * @param {SaveCallback} [callback] Callback function.
     * @returns {Promise}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const file = myBucket.file('my-file');
     * const contents = 'This is the contents of the file.';
     *
     * file.save(contents, function(err) {
     *   if (!err) {
     *     // File written successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.save(contents).then(function() {});
     * ```
     */
    save(data, optionsOrCallback, callback) {
      var _a;
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      const validationError = (0, util_js_2.handleContextValidation)((_a = options.metadata) === null || _a === void 0 ? void 0 : _a.contexts, callback);
      if (validationError)
        return validationError;
      let maxRetries = this.storage.retryOptions.maxRetries;
      if (!this.shouldRetryBasedOnPreconditionAndIdempotencyStrat(options === null || options === void 0 ? void 0 : options.preconditionOpts)) {
        maxRetries = 0;
      }
      const returnValue = (0, async_retry_1.default)(async (bail) => {
        return new Promise((resolve, reject) => {
          if (maxRetries === 0) {
            this.storage.retryOptions.autoRetry = false;
          }
          const writable = this.createWriteStream(options);
          if (options.onUploadProgress) {
            writable.on("progress", options.onUploadProgress);
          }
          const handleError = (err) => {
            if (this.storage.retryOptions.autoRetry && this.storage.retryOptions.retryableErrorFn(err)) {
              return reject(err);
            }
            return bail(err);
          };
          if (typeof data === "string" || Buffer.isBuffer(data) || data instanceof Uint8Array) {
            writable.on("error", handleError).on("finish", () => resolve()).end(data);
          } else {
            (0, stream_1.pipeline)(data, writable, (err) => {
              if (err) {
                if (typeof data !== "function") {
                  return bail(err);
                }
                handleError(err);
              } else {
                resolve();
              }
            });
          }
        });
      }, {
        retries: maxRetries,
        factor: this.storage.retryOptions.retryDelayMultiplier,
        maxTimeout: this.storage.retryOptions.maxRetryDelay * 1e3,
        //convert to milliseconds
        maxRetryTime: this.storage.retryOptions.totalTimeout * 1e3
        //convert to milliseconds
      });
      if (!callback) {
        return returnValue;
      } else {
        return returnValue.then(() => {
          if (callback) {
            return callback();
          }
        }).catch(callback);
      }
    }
    setMetadata(metadata, optionsOrCallback, cb) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      cb = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      const validationError = (0, util_js_2.handleContextValidation)(metadata.contexts, cb);
      if (validationError)
        return validationError;
      this.disableAutoRetryConditionallyIdempotent_(this.methods.setMetadata, bucket_js_1.AvailableServiceObjectMethods.setMetadata, options);
      super.setMetadata(metadata, options).then((resp) => cb(null, ...resp)).catch(cb).finally(() => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
      });
    }
    /**
     * @typedef {array} SetStorageClassResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @typedef {object} SetStorageClassOptions Configuration options for File#setStorageClass().
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback SetStorageClassCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Set the storage class for this file.
     *
     * See {@link https://cloud.google.com/storage/docs/per-object-storage-class| Per-Object Storage Class}
     * See {@link https://cloud.google.com/storage/docs/storage-classes| Storage Classes}
     *
     * @param {string} storageClass The new storage class. (`standard`,
     *     `nearline`, `coldline`, or `archive`)
     *     **Note:** The storage classes `multi_regional` and `regional`
     *     are now legacy and will be deprecated in the future.
     * @param {SetStorageClassOptions} [options] Configuration options.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {SetStorageClassCallback} [callback] Callback function.
     * @returns {Promise<SetStorageClassResponse>}
     *
     * @example
     * ```
     * file.setStorageClass('nearline', function(err, apiResponse) {
     *   if (err) {
     *     // Error handling omitted.
     *   }
     *
     *   // The storage class was updated successfully.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * file.setStorageClass('nearline').then(function() {});
     * ```
     */
    setStorageClass(storageClass, optionsOrCallback, callback) {
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      const req = {
        ...options,
        // In case we get input like `storageClass`, convert to `storage_class`.
        storageClass: storageClass.replace(/-/g, "_").replace(/([a-z])([A-Z])/g, (_, low, up) => {
          return low + "_" + up;
        }).toUpperCase()
      };
      this.copy(this, req, (err, file2, apiResponse) => {
        if (err) {
          callback(err, apiResponse);
          return;
        }
        this.metadata = file2.metadata;
        callback(null, apiResponse);
      });
    }
    /**
     * Set a user project to be billed for all requests made from this File
     * object.
     *
     * @param {string} userProject The user project.
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     * const file = bucket.file('my-file');
     *
     * file.setUserProject('grape-spaceship-123');
     * ```
     */
    setUserProject(userProject) {
      this.bucket.setUserProject.call(this, userProject);
    }
    /**
     * This creates a resumable-upload upload stream.
     *
     * @param {Duplexify} stream - Duplexify stream of data to pipe to the file.
     * @param {object=} options - Configuration object.
     *
     * @private
     */
    startResumableUpload_(dup, options = {}) {
      var _a;
      (_a = options.metadata) !== null && _a !== void 0 ? _a : options.metadata = {};
      const retryOptions = this.storage.retryOptions;
      if (!this.shouldRetryBasedOnPreconditionAndIdempotencyStrat(options.preconditionOpts)) {
        retryOptions.autoRetry = false;
      }
      const cfg = {
        authClient: this.storage.authClient,
        apiEndpoint: this.storage.apiEndpoint,
        bucket: this.bucket.name,
        customRequestOptions: this.getRequestInterceptors().reduce((reqOpts, interceptorFn) => interceptorFn(reqOpts), {}),
        file: this.name,
        generation: this.generation,
        isPartialUpload: options.isPartialUpload,
        key: this.encryptionKey,
        kmsKeyName: this.kmsKeyName,
        metadata: options.metadata,
        offset: options.offset,
        predefinedAcl: options.predefinedAcl,
        private: options.private,
        public: options.public,
        uri: options.uri,
        userProject: options.userProject || this.userProject,
        retryOptions: { ...retryOptions },
        params: (options === null || options === void 0 ? void 0 : options.preconditionOpts) || this.instancePreconditionOpts,
        chunkSize: options === null || options === void 0 ? void 0 : options.chunkSize,
        highWaterMark: options === null || options === void 0 ? void 0 : options.highWaterMark,
        universeDomain: this.bucket.storage.universeDomain,
        [util_js_1.GCCL_GCS_CMD_KEY]: options[util_js_1.GCCL_GCS_CMD_KEY]
      };
      let uploadStream;
      try {
        uploadStream = resumableUpload2.upload(cfg);
      } catch (error) {
        dup.destroy(error);
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
        return;
      }
      uploadStream.on("response", (resp) => {
        dup.emit("response", resp);
      }).on("uri", (uri) => {
        dup.emit("uri", uri);
      }).on("metadata", (metadata) => {
        this.metadata = metadata;
        dup.emit("metadata");
      }).on("finish", () => {
        dup.emit("complete");
      }).on("progress", (evt) => dup.emit("progress", evt));
      dup.setWritable(uploadStream);
      this.storage.retryOptions.autoRetry = this.instanceRetryValue;
    }
    /**
     * Takes a readable stream and pipes it to a remote file. Unlike
     * `startResumableUpload_`, which uses the resumable upload technique, this
     * method uses a simple upload (all or nothing).
     *
     * @param {Duplexify} dup - Duplexify stream of data to pipe to the file.
     * @param {object=} options - Configuration object.
     *
     * @private
     */
    startSimpleUpload_(dup, options = {}) {
      var _a;
      (_a = options.metadata) !== null && _a !== void 0 ? _a : options.metadata = {};
      const apiEndpoint = this.storage.apiEndpoint;
      const bucketName = this.bucket.name;
      const uri = `${apiEndpoint}/upload/storage/v1/b/${bucketName}/o`;
      const reqOpts = {
        qs: {
          name: this.name
        },
        uri,
        [util_js_1.GCCL_GCS_CMD_KEY]: options[util_js_1.GCCL_GCS_CMD_KEY]
      };
      if (this.generation !== void 0) {
        reqOpts.qs.ifGenerationMatch = this.generation;
      }
      if (this.kmsKeyName !== void 0) {
        reqOpts.qs.kmsKeyName = this.kmsKeyName;
      }
      if (typeof options.timeout === "number") {
        reqOpts.timeout = options.timeout;
      }
      if (options.userProject || this.userProject) {
        reqOpts.qs.userProject = options.userProject || this.userProject;
      }
      if (options.predefinedAcl) {
        reqOpts.qs.predefinedAcl = options.predefinedAcl;
      } else if (options.private) {
        reqOpts.qs.predefinedAcl = "private";
      } else if (options.public) {
        reqOpts.qs.predefinedAcl = "publicRead";
      }
      Object.assign(reqOpts.qs, this.instancePreconditionOpts, options.preconditionOpts);
      index_js_1.util.makeWritableStream(dup, {
        makeAuthenticatedRequest: (reqOpts2) => {
          this.request(reqOpts2, (err, body, resp) => {
            if (err) {
              dup.destroy(err);
              return;
            }
            this.metadata = body;
            dup.emit("metadata", body);
            dup.emit("response", resp);
            dup.emit("complete");
          });
        },
        metadata: options.metadata,
        request: reqOpts
      });
    }
    disableAutoRetryConditionallyIdempotent_(coreOpts, methodType, localPreconditionOptions) {
      var _a, _b, _c, _d;
      if (typeof coreOpts === "object" && ((_b = (_a = coreOpts === null || coreOpts === void 0 ? void 0 : coreOpts.reqOpts) === null || _a === void 0 ? void 0 : _a.qs) === null || _b === void 0 ? void 0 : _b.ifGenerationMatch) === void 0 && (localPreconditionOptions === null || localPreconditionOptions === void 0 ? void 0 : localPreconditionOptions.ifGenerationMatch) === void 0 && methodType === bucket_js_1.AvailableServiceObjectMethods.delete && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        this.storage.retryOptions.autoRetry = false;
      }
      if (typeof coreOpts === "object" && ((_d = (_c = coreOpts === null || coreOpts === void 0 ? void 0 : coreOpts.reqOpts) === null || _c === void 0 ? void 0 : _c.qs) === null || _d === void 0 ? void 0 : _d.ifMetagenerationMatch) === void 0 && (localPreconditionOptions === null || localPreconditionOptions === void 0 ? void 0 : localPreconditionOptions.ifMetagenerationMatch) === void 0 && methodType === bucket_js_1.AvailableServiceObjectMethods.setMetadata && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        this.storage.retryOptions.autoRetry = false;
      }
    }
    async getBufferFromReadable(readable) {
      const buf = [];
      for await (const chunk of readable) {
        buf.push(chunk);
      }
      return Buffer.concat(buf);
    }
  }
  file.File = File;
  _File_instances = /* @__PURE__ */ new WeakSet(), _File_validateIntegrity = /**
   *
   * @param hashCalculatingStream
   * @param verify
   * @returns {boolean} Returns `true` if valid, throws with error otherwise
   */
  async function _File_validateIntegrity2(hashCalculatingStream, verify = {}) {
    const metadata = this.metadata;
    let dataMismatch = !!(verify.crc32c || verify.md5);
    if (verify.crc32c && metadata.crc32c) {
      dataMismatch = !hashCalculatingStream.test("crc32c", metadata.crc32c);
    }
    if (verify.md5 && metadata.md5Hash) {
      dataMismatch = !hashCalculatingStream.test("md5", metadata.md5Hash);
    }
    if (dataMismatch) {
      const errors = [];
      let code = "";
      let message = "";
      try {
        await this.delete();
        if (verify.md5 && !metadata.md5Hash) {
          code = "MD5_NOT_AVAILABLE";
          message = FileExceptionMessages.MD5_NOT_AVAILABLE;
        } else {
          code = "FILE_NO_UPLOAD";
          message = FileExceptionMessages.UPLOAD_MISMATCH;
        }
      } catch (e) {
        const error2 = e;
        code = "FILE_NO_UPLOAD_DELETE";
        message = `${FileExceptionMessages.UPLOAD_MISMATCH_DELETE_FAIL}${error2.message}`;
        errors.push(error2);
      }
      const error = new RequestError(message);
      error.code = code;
      error.errors = errors;
      throw error;
    }
    return true;
  };
  (0, promisify_1.promisifyAll)(File, {
    exclude: [
      "cloudStorageURI",
      "publicUrl",
      "request",
      "save",
      "setEncryptionKey",
      "shouldRetryBasedOnPreconditionAndIdempotencyStrat",
      "getBufferFromReadable",
      "restore"
    ]
  });
  return file;
}
var iam = {};
var hasRequiredIam;
function requireIam() {
  if (hasRequiredIam) return iam;
  hasRequiredIam = 1;
  Object.defineProperty(iam, "__esModule", { value: true });
  iam.Iam = iam.IAMExceptionMessages = void 0;
  const promisify_1 = requireSrc$4();
  const util_js_1 = requireUtil$1();
  var IAMExceptionMessages;
  (function(IAMExceptionMessages2) {
    IAMExceptionMessages2["POLICY_OBJECT_REQUIRED"] = "A policy object is required.";
    IAMExceptionMessages2["PERMISSIONS_REQUIRED"] = "Permissions are required.";
  })(IAMExceptionMessages || (iam.IAMExceptionMessages = IAMExceptionMessages = {}));
  class Iam {
    constructor(bucket2) {
      this.request_ = bucket2.request.bind(bucket2);
      this.resourceId_ = "buckets/" + bucket2.getId();
    }
    /**
     * @typedef {object} GetPolicyOptions Requested options for IAM#getPolicy().
     * @property {number} [requestedPolicyVersion] The version of IAM policies to
     *     request. If a policy with a condition is requested without setting
     *     this, the server will return an error. This must be set to a value
     *     of 3 to retrieve IAM policies containing conditions. This is to
     *     prevent client code that isn't aware of IAM conditions from
     *     interpreting and modifying policies incorrectly. The service might
     *     return a policy with version lower than the one that was requested,
     *     based on the feature syntax in the policy fetched.
     *     See {@link https://cloud.google.com/iam/docs/policies#versions| IAM Policy versions}
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @typedef {array} GetPolicyResponse
     * @property {Policy} 0 The policy.
     * @property {object} 1 The full API response.
     */
    /**
     * @typedef {object} Policy
     * @property {PolicyBinding[]} policy.bindings Bindings associate members with roles.
     * @property {string} [policy.etag] Etags are used to perform a read-modify-write.
     * @property {number} [policy.version] The syntax schema version of the Policy.
     *      To set an IAM policy with conditional binding, this field must be set to
     *      3 or greater.
     *     See {@link https://cloud.google.com/iam/docs/policies#versions| IAM Policy versions}
     */
    /**
     * @typedef {object} PolicyBinding
     * @property {string} role Role that is assigned to members.
     * @property {string[]} members Specifies the identities requesting access for the bucket.
     * @property {Expr} [condition] The condition that is associated with this binding.
     */
    /**
     * @typedef {object} Expr
     * @property {string} [title] An optional title for the expression, i.e. a
     *     short string describing its purpose. This can be used e.g. in UIs
     *     which allow to enter the expression.
     * @property {string} [description] An optional description of the
     *     expression. This is a longer text which describes the expression,
     *     e.g. when hovered over it in a UI.
     * @property {string} expression Textual representation of an expression in
     *     Common Expression Language syntax. The application context of the
     *     containing message determines which well-known feature set of CEL
     *     is supported.The condition that is associated with this binding.
     *
     * @see [Condition] https://cloud.google.com/storage/docs/access-control/iam#conditions
     */
    /**
     * Get the IAM policy.
     *
     * @param {GetPolicyOptions} [options] Request options.
     * @param {GetPolicyCallback} [callback] Callback function.
     * @returns {Promise<GetPolicyResponse>}
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/getIamPolicy| Buckets: setIamPolicy API Documentation}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * bucket.iam.getPolicy(
     *     {requestedPolicyVersion: 3},
     *     function(err, policy, apiResponse) {
     *
     *     },
     * );
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.iam.getPolicy({requestedPolicyVersion: 3})
     *   .then(function(data) {
     *     const policy = data[0];
     *     const apiResponse = data[1];
     *   });
     *
     * ```
     * @example <caption>include:samples/iam.js</caption>
     * region_tag:storage_view_bucket_iam_members
     * Example of retrieving a bucket's IAM policy:
     */
    getPolicy(optionsOrCallback, callback) {
      const { options, callback: cb } = (0, util_js_1.normalize)(optionsOrCallback, callback);
      const qs = {};
      if (options.userProject) {
        qs.userProject = options.userProject;
      }
      if (options.requestedPolicyVersion !== null && options.requestedPolicyVersion !== void 0) {
        qs.optionsRequestedPolicyVersion = options.requestedPolicyVersion;
      }
      this.request_({
        uri: "/iam",
        qs
      }, cb);
    }
    /**
     * Set the IAM policy.
     *
     * @throws {Error} If no policy is provided.
     *
     * @param {Policy} policy The policy.
     * @param {SetPolicyOptions} [options] Configuration options.
     * @param {SetPolicyCallback} callback Callback function.
     * @returns {Promise<SetPolicyResponse>}
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/setIamPolicy| Buckets: setIamPolicy API Documentation}
     * See {@link https://cloud.google.com/iam/docs/understanding-roles| IAM Roles}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * const myPolicy = {
     *   bindings: [
     *     {
     *       role: 'roles/storage.admin',
     *       members:
     * ['serviceAccount:myotherproject@appspot.gserviceaccount.com']
     *     }
     *   ]
     * };
     *
     * bucket.iam.setPolicy(myPolicy, function(err, policy, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.iam.setPolicy(myPolicy).then(function(data) {
     *   const policy = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/iam.js</caption>
     * region_tag:storage_add_bucket_iam_member
     * Example of adding to a bucket's IAM policy:
     *
     * @example <caption>include:samples/iam.js</caption>
     * region_tag:storage_remove_bucket_iam_member
     * Example of removing from a bucket's IAM policy:
     */
    setPolicy(policy, optionsOrCallback, callback) {
      if (policy === null || typeof policy !== "object") {
        throw new Error(IAMExceptionMessages.POLICY_OBJECT_REQUIRED);
      }
      const { options, callback: cb } = (0, util_js_1.normalize)(optionsOrCallback, callback);
      let maxRetries;
      if (policy.etag === void 0) {
        maxRetries = 0;
      }
      this.request_({
        method: "PUT",
        uri: "/iam",
        maxRetries,
        json: Object.assign({
          resourceId: this.resourceId_
        }, policy),
        qs: options
      }, cb);
    }
    /**
     * Test a set of permissions for a resource.
     *
     * @throws {Error} If permissions are not provided.
     *
     * @param {string|string[]} permissions The permission(s) to test for.
     * @param {TestIamPermissionsOptions} [options] Configuration object.
     * @param {TestIamPermissionsCallback} [callback] Callback function.
     * @returns {Promise<TestIamPermissionsResponse>}
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/testIamPermissions| Buckets: testIamPermissions API Documentation}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * //-
     * // Test a single permission.
     * //-
     * const test = 'storage.buckets.delete';
     *
     * bucket.iam.testPermissions(test, function(err, permissions, apiResponse) {
     *   console.log(permissions);
     *   // {
     *   //   "storage.buckets.delete": true
     *   // }
     * });
     *
     * //-
     * // Test several permissions at once.
     * //-
     * const tests = [
     *   'storage.buckets.delete',
     *   'storage.buckets.get'
     * ];
     *
     * bucket.iam.testPermissions(tests, function(err, permissions) {
     *   console.log(permissions);
     *   // {
     *   //   "storage.buckets.delete": false,
     *   //   "storage.buckets.get": true
     *   // }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.iam.testPermissions(test).then(function(data) {
     *   const permissions = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    testPermissions(permissions, optionsOrCallback, callback) {
      if (!Array.isArray(permissions) && typeof permissions !== "string") {
        throw new Error(IAMExceptionMessages.PERMISSIONS_REQUIRED);
      }
      const { options, callback: cb } = (0, util_js_1.normalize)(optionsOrCallback, callback);
      const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];
      const req = Object.assign({
        permissions: permissionsArray
      }, options);
      this.request_({
        uri: "/iam/testPermissions",
        qs: req,
        useQuerystring: true
      }, (err, resp) => {
        if (err) {
          cb(err, null, resp);
          return;
        }
        const availablePermissions = Array.isArray(resp.permissions) ? resp.permissions : [];
        const permissionsHash = permissionsArray.reduce((acc, permission) => {
          acc[permission] = availablePermissions.indexOf(permission) > -1;
          return acc;
        }, {});
        cb(null, permissionsHash, resp);
      });
    }
  }
  iam.Iam = Iam;
  (0, promisify_1.promisifyAll)(Iam);
  return iam;
}
var notification = {};
var hasRequiredNotification;
function requireNotification() {
  if (hasRequiredNotification) return notification;
  hasRequiredNotification = 1;
  Object.defineProperty(notification, "__esModule", { value: true });
  notification.Notification = void 0;
  const index_js_1 = requireNodejsCommon();
  const promisify_1 = requireSrc$4();
  class Notification extends index_js_1.ServiceObject {
    constructor(bucket2, id) {
      const requestQueryObject = {};
      const methods = {
        /**
         * Creates a notification subscription for the bucket.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/insert| Notifications: insert}
         * @method Notification#create
         *
         * @param {Topic|string} topic The Cloud PubSub topic to which this
         * subscription publishes. If the project ID is omitted, the current
         * project ID will be used.
         *
         * Acceptable formats are:
         * - `projects/grape-spaceship-123/topics/my-topic`
         *
         * - `my-topic`
         * @param {CreateNotificationRequest} [options] Metadata to set for
         *     the notification.
         * @param {CreateNotificationCallback} [callback] Callback function.
         * @returns {Promise<CreateNotificationResponse>}
         * @throws {Error} If a valid topic is not provided.
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         * const notification = myBucket.notification('1');
         *
         * notification.create(function(err, notification, apiResponse) {
         *   if (!err) {
         *     // The notification was created successfully.
         *   }
         * });
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * notification.create().then(function(data) {
         *   const notification = data[0];
         *   const apiResponse = data[1];
         * });
         * ```
         */
        create: true,
        /**
         * @typedef {array} DeleteNotificationResponse
         * @property {object} 0 The full API response.
         */
        /**
         * Permanently deletes a notification subscription.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/delete| Notifications: delete API Documentation}
         *
         * @param {object} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {DeleteNotificationCallback} [callback] Callback function.
         * @returns {Promise<DeleteNotificationResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         * const notification = myBucket.notification('1');
         *
         * notification.delete(function(err, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * notification.delete().then(function(data) {
         *   const apiResponse = data[0];
         * });
         *
         * ```
         * @example <caption>include:samples/deleteNotification.js</caption>
         * region_tag:storage_delete_bucket_notification
         * Another example:
         */
        delete: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * Get a notification and its metadata if it exists.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/get| Notifications: get API Documentation}
         *
         * @param {object} [options] Configuration options.
         *     See {@link Bucket#createNotification} for create options.
         * @param {boolean} [options.autoCreate] Automatically create the object if
         *     it does not exist. Default: `false`.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {GetNotificationCallback} [callback] Callback function.
         * @return {Promise<GetNotificationCallback>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         * const notification = myBucket.notification('1');
         *
         * notification.get(function(err, notification, apiResponse) {
         *   // `notification.metadata` has been populated.
         * });
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * notification.get().then(function(data) {
         *   const notification = data[0];
         *   const apiResponse = data[1];
         * });
         * ```
         */
        get: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * Get the notification's metadata.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/get| Notifications: get API Documentation}
         *
         * @param {object} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {GetNotificationMetadataCallback} [callback] Callback function.
         * @returns {Promise<GetNotificationMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         * const notification = myBucket.notification('1');
         *
         * notification.getMetadata(function(err, metadata, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * notification.getMetadata().then(function(data) {
         *   const metadata = data[0];
         *   const apiResponse = data[1];
         * });
         *
         * ```
         * @example <caption>include:samples/getMetadataNotifications.js</caption>
         * region_tag:storage_print_pubsub_bucket_notification
         * Another example:
         */
        getMetadata: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {array} NotificationExistsResponse
         * @property {boolean} 0 Whether the notification exists or not.
         */
        /**
         * @callback NotificationExistsCallback
         * @param {?Error} err Request error, if any.
         * @param {boolean} exists Whether the notification exists or not.
         */
        /**
         * Check if the notification exists.
         *
         * @method Notification#exists
         * @param {NotificationExistsCallback} [callback] Callback function.
         * @returns {Promise<NotificationExistsResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const myBucket = storage.bucket('my-bucket');
         * const notification = myBucket.notification('1');
         *
         * notification.exists(function(err, exists) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * notification.exists().then(function(data) {
         *   const exists = data[0];
         * });
         * ```
         */
        exists: true
      };
      super({
        parent: bucket2,
        baseUrl: "/notificationConfigs",
        id: id.toString(),
        createMethod: bucket2.createNotification.bind(bucket2),
        methods
      });
    }
  }
  notification.Notification = Notification;
  (0, promisify_1.promisifyAll)(Notification);
  return notification;
}
var hasRequiredBucket;
function requireBucket() {
  if (hasRequiredBucket) return bucket;
  hasRequiredBucket = 1;
  var __createBinding = bucket && bucket.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __setModuleDefault = bucket && bucket.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = bucket && bucket.__importStar || /* @__PURE__ */ (function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
  var __importDefault = bucket && bucket.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(bucket, "__esModule", { value: true });
  bucket.Bucket = bucket.BucketExceptionMessages = bucket.AvailableServiceObjectMethods = bucket.BucketActionToHTTPMethod = void 0;
  const index_js_1 = requireNodejsCommon();
  const paginator_1 = requireSrc$6();
  const promisify_1 = requireSrc$4();
  const fs = __importStar(require$$0$4);
  const mime_1 = __importDefault(requireMime());
  const path = __importStar(require$$5);
  const p_limit_1 = __importDefault(requirePLimit());
  const util_1 = require$$0$6;
  const async_retry_1 = __importDefault(requireLib());
  const util_js_1 = requireUtil$1();
  const acl_js_1 = requireAcl();
  const file_js_1 = requireFile();
  const iam_js_1 = requireIam();
  const notification_js_1 = requireNotification();
  const storage_js_1 = requireStorage();
  const signer_js_1 = requireSigner();
  const stream_1 = require$$0$1;
  const url_1 = Url;
  var BucketActionToHTTPMethod;
  (function(BucketActionToHTTPMethod2) {
    BucketActionToHTTPMethod2["list"] = "GET";
  })(BucketActionToHTTPMethod || (bucket.BucketActionToHTTPMethod = BucketActionToHTTPMethod = {}));
  var AvailableServiceObjectMethods;
  (function(AvailableServiceObjectMethods2) {
    AvailableServiceObjectMethods2[AvailableServiceObjectMethods2["setMetadata"] = 0] = "setMetadata";
    AvailableServiceObjectMethods2[AvailableServiceObjectMethods2["delete"] = 1] = "delete";
  })(AvailableServiceObjectMethods || (bucket.AvailableServiceObjectMethods = AvailableServiceObjectMethods = {}));
  var BucketExceptionMessages;
  (function(BucketExceptionMessages2) {
    BucketExceptionMessages2["PROVIDE_SOURCE_FILE"] = "You must provide at least one source file.";
    BucketExceptionMessages2["DESTINATION_FILE_NOT_SPECIFIED"] = "A destination file must be specified.";
    BucketExceptionMessages2["CHANNEL_ID_REQUIRED"] = "An ID is required to create a channel.";
    BucketExceptionMessages2["TOPIC_NAME_REQUIRED"] = "A valid topic name is required.";
    BucketExceptionMessages2["CONFIGURATION_OBJECT_PREFIX_REQUIRED"] = "A configuration object with a prefix is required.";
    BucketExceptionMessages2["SPECIFY_FILE_NAME"] = "A file name must be specified.";
    BucketExceptionMessages2["METAGENERATION_NOT_PROVIDED"] = "A metageneration must be provided.";
    BucketExceptionMessages2["SUPPLY_NOTIFICATION_ID"] = "You must supply a notification ID.";
  })(BucketExceptionMessages || (bucket.BucketExceptionMessages = BucketExceptionMessages = {}));
  class Bucket extends index_js_1.ServiceObject {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFilesStream(query) {
      return new stream_1.Readable();
    }
    constructor(storage2, name2, options) {
      var _a, _b, _c, _d;
      options = options || {};
      name2 = name2.replace(/^gs:\/\//, "").replace(/\/+$/, "");
      const requestQueryObject = {};
      if ((_a = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) {
        requestQueryObject.ifGenerationMatch = options.preconditionOpts.ifGenerationMatch;
      }
      if ((_b = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationNotMatch) {
        requestQueryObject.ifGenerationNotMatch = options.preconditionOpts.ifGenerationNotMatch;
      }
      if ((_c = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _c === void 0 ? void 0 : _c.ifMetagenerationMatch) {
        requestQueryObject.ifMetagenerationMatch = options.preconditionOpts.ifMetagenerationMatch;
      }
      if ((_d = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _d === void 0 ? void 0 : _d.ifMetagenerationNotMatch) {
        requestQueryObject.ifMetagenerationNotMatch = options.preconditionOpts.ifMetagenerationNotMatch;
      }
      const userProject = options.userProject;
      if (typeof userProject === "string") {
        requestQueryObject.userProject = userProject;
      }
      const methods = {
        /**
         * Create a bucket.
         *
         * @method Bucket#create
         * @param {CreateBucketRequest} [metadata] Metadata to set for the bucket.
         * @param {CreateBucketCallback} [callback] Callback function.
         * @returns {Promise<CreateBucketResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         * bucket.create(function(err, bucket, apiResponse) {
         *   if (!err) {
         *     // The bucket was created successfully.
         *   }
         * });
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.create().then(function(data) {
         *   const bucket = data[0];
         *   const apiResponse = data[1];
         * });
         * ```
         */
        create: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * IamDeleteBucketOptions Configuration options.
         * @property {boolean} [ignoreNotFound = false] Ignore an error if
         *     the bucket does not exist.
         * @property {string} [userProject] The ID of the project which will be
         *     billed for the request.
         */
        /**
         * @typedef {array} DeleteBucketResponse
         * @property {object} 0 The full API response.
         */
        /**
         * @callback DeleteBucketCallback
         * @param {?Error} err Request error, if any.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Delete the bucket.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/delete| Buckets: delete API Documentation}
         *
         * @method Bucket#delete
         * @param {DeleteBucketOptions} [options] Configuration options.
         * @param {boolean} [options.ignoreNotFound = false] Ignore an error if
         *     the bucket does not exist.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {DeleteBucketCallback} [callback] Callback function.
         * @returns {Promise<DeleteBucketResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         * bucket.delete(function(err, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.delete().then(function(data) {
         *   const apiResponse = data[0];
         * });
         *
         * ```
         * @example <caption>include:samples/buckets.js</caption>
         * region_tag:storage_delete_bucket
         * Another example:
         */
        delete: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {object} BucketExistsOptions Configuration options for Bucket#exists().
         * @property {string} [userProject] The ID of the project which will be
         *     billed for the request.
         */
        /**
         * @typedef {array} BucketExistsResponse
         * @property {boolean} 0 Whether the {@link Bucket} exists.
         */
        /**
         * @callback BucketExistsCallback
         * @param {?Error} err Request error, if any.
         * @param {boolean} exists Whether the {@link Bucket} exists.
         */
        /**
         * Check if the bucket exists.
         *
         * @method Bucket#exists
         * @param {BucketExistsOptions} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {BucketExistsCallback} [callback] Callback function.
         * @returns {Promise<BucketExistsResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         *
         * bucket.exists(function(err, exists) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.exists().then(function(data) {
         *   const exists = data[0];
         * });
         * ```
         */
        exists: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {object} [GetBucketOptions] Configuration options for Bucket#get()
         * @property {boolean} [autoCreate] Automatically create the object if
         *     it does not exist. Default: `false`
         * @property {string} [userProject] The ID of the project which will be
         *     billed for the request.
         */
        /**
         * @typedef {array} GetBucketResponse
         * @property {Bucket} 0 The {@link Bucket}.
         * @property {object} 1 The full API response.
         */
        /**
         * @callback GetBucketCallback
         * @param {?Error} err Request error, if any.
         * @param {Bucket} bucket The {@link Bucket}.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Get a bucket if it exists.
         *
         * You may optionally use this to "get or create" an object by providing
         * an object with `autoCreate` set to `true`. Any extra configuration that
         * is normally required for the `create` method must be contained within
         * this object as well.
         *
         * @method Bucket#get
         * @param {GetBucketOptions} [options] Configuration options.
         * @param {boolean} [options.autoCreate] Automatically create the object if
         *     it does not exist. Default: `false`
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {GetBucketCallback} [callback] Callback function.
         * @returns {Promise<GetBucketResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         *
         * bucket.get(function(err, bucket, apiResponse) {
         *   // `bucket.metadata` has been populated.
         * });
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.get().then(function(data) {
         *   const bucket = data[0];
         *   const apiResponse = data[1];
         * });
         * ```
         */
        get: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {array} GetBucketMetadataResponse
         * @property {object} 0 The bucket metadata.
         * @property {object} 1 The full API response.
         */
        /**
         * @callback GetBucketMetadataCallback
         * @param {?Error} err Request error, if any.
         * @param {object} metadata The bucket metadata.
         * @param {object} apiResponse The full API response.
         */
        /**
         * @typedef {object} GetBucketMetadataOptions Configuration options for Bucket#getMetadata().
         * @property {string} [userProject] The ID of the project which will be
         *     billed for the request.
         */
        /**
         * Get the bucket's metadata.
         *
         * To set metadata, see {@link Bucket#setMetadata}.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/get| Buckets: get API Documentation}
         *
         * @method Bucket#getMetadata
         * @param {GetBucketMetadataOptions} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {GetBucketMetadataCallback} [callback] Callback function.
         * @returns {Promise<GetBucketMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         *
         * bucket.getMetadata(function(err, metadata, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.getMetadata().then(function(data) {
         *   const metadata = data[0];
         *   const apiResponse = data[1];
         * });
         *
         * ```
         * @example <caption>include:samples/requesterPays.js</caption>
         * region_tag:storage_get_requester_pays_status
         * Example of retrieving the requester pays status of a bucket:
         */
        getMetadata: {
          reqOpts: {
            qs: requestQueryObject
          }
        },
        /**
         * @typedef {object} SetBucketMetadataOptions Configuration options for Bucket#setMetadata().
         * @property {string} [userProject] The ID of the project which will be
         *     billed for the request.
         */
        /**
         * @typedef {array} SetBucketMetadataResponse
         * @property {object} apiResponse The full API response.
         */
        /**
         * @callback SetBucketMetadataCallback
         * @param {?Error} err Request error, if any.
         * @param {object} metadata The bucket metadata.
         */
        /**
         * Set the bucket's metadata.
         *
         * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/patch| Buckets: patch API Documentation}
         *
         * @method Bucket#setMetadata
         * @param {object<string, *>} metadata The metadata you wish to set.
         * @param {SetBucketMetadataOptions} [options] Configuration options.
         * @param {string} [options.userProject] The ID of the project which will be
         *     billed for the request.
         * @param {SetBucketMetadataCallback} [callback] Callback function.
         * @returns {Promise<SetBucketMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         * const bucket = storage.bucket('albums');
         *
         * //-
         * // Set website metadata field on the bucket.
         * //-
         * const metadata = {
         *   website: {
         *     mainPageSuffix: 'http://example.com',
         *     notFoundPage: 'http://example.com/404.html'
         *   }
         * };
         *
         * bucket.setMetadata(metadata, function(err, apiResponse) {});
         *
         * //-
         * // Enable versioning for your bucket.
         * //-
         * bucket.setMetadata({
         *   versioning: {
         *     enabled: true
         *   }
         * }, function(err, apiResponse) {});
         *
         * //-
         * // Enable KMS encryption for objects within this bucket.
         * //-
         * bucket.setMetadata({
         *   encryption: {
         *     defaultKmsKeyName: 'projects/grape-spaceship-123/...'
         *   }
         * }, function(err, apiResponse) {});
         *
         * //-
         * // Enforce CMEK-only encryption for new objects.
         * // This blocks Google-Managed and Customer-Supplied keys.
         * //-
         * bucket.setMetadata({
         *   encryption: {
         *     defaultKmsKeyName: 'projects/grape-spaceship-123/...',
         *     googleManagedEncryptionEnforcementConfig: {
         *       restrictionMode: 'FullyRestricted'
         *     },
         *     customerSuppliedEncryptionEnforcementConfig: {
         *       restrictionMode: 'FullyRestricted'
         *     },
         *     customerManagedEncryptionEnforcementConfig: {
         *       restrictionMode: 'NotRestricted'
         *     }
         *   }
         * }, function(err, apiResponse) {});
         *
         * //-
         * // Set the default event-based hold value for new objects in this
         * // bucket.
         * //-
         * bucket.setMetadata({
         *   defaultEventBasedHold: true
         * }, function(err, apiResponse) {});
         *
         * //-
         * // Remove object lifecycle rules.
         * //-
         * bucket.setMetadata({
         *   lifecycle: null
         * }, function(err, apiResponse) {});
         *
         * //-
         * // If the callback is omitted, we'll return a Promise.
         * //-
         * bucket.setMetadata(metadata).then(function(data) {
         *   const apiResponse = data[0];
         * });
         * ```
         */
        setMetadata: {
          reqOpts: {
            qs: requestQueryObject
          }
        }
      };
      super({
        parent: storage2,
        baseUrl: "/b",
        id: name2,
        createMethod: storage2.createBucket.bind(storage2),
        methods
      });
      this.unreachable = false;
      this.name = name2;
      this.storage = storage2;
      this.userProject = options.userProject;
      this.acl = new acl_js_1.Acl({
        request: this.request.bind(this),
        pathPrefix: "/acl"
      });
      this.acl.default = new acl_js_1.Acl({
        request: this.request.bind(this),
        pathPrefix: "/defaultObjectAcl"
      });
      this.crc32cGenerator = options.crc32cGenerator || this.storage.crc32cGenerator;
      this.iam = new iam_js_1.Iam(this);
      this.getFilesStream = paginator_1.paginator.streamify("getFiles");
      this.instanceRetryValue = storage2.retryOptions.autoRetry;
      this.instancePreconditionOpts = options === null || options === void 0 ? void 0 : options.preconditionOpts;
    }
    /**
     * The bucket's Cloud Storage URI (`gs://`)
     *
     * @example
     * ```ts
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * // `gs://my-bucket`
     * const href = bucket.cloudStorageURI.href;
     * ```
     */
    get cloudStorageURI() {
      const uri = new url_1.URL("gs://");
      uri.host = this.name;
      return uri;
    }
    /**
     * @typedef {object} AddLifecycleRuleOptions Configuration options for Bucket#addLifecycleRule().
     * @property {boolean} [append=true] The new rules will be appended to any
     *     pre-existing rules.
     */
    /**
     *
     * @typedef {object} LifecycleRule The new lifecycle rule to be added to objects
     *     in this bucket.
     * @property {string|object} action The action to be taken upon matching of
     *     all the conditions 'delete', 'setStorageClass', or 'AbortIncompleteMultipartUpload'.
     *     **Note**: For configuring a raw-formatted rule object to be passed as `action`
     *               please refer to the [examples]{@link https://cloud.google.com/storage/docs/managing-lifecycles#configexamples}.
     * @property {object} condition Condition a bucket must meet before the
     *     action occurs on the bucket. Refer to following supported [conditions]{@link https://cloud.google.com/storage/docs/lifecycle#conditions}.
     * @property {string} [storageClass] When using the `setStorageClass`
     *     action, provide this option to dictate which storage class the object
     *     should update to. Please see
     *     [SetStorageClass option documentation]{@link https://cloud.google.com/storage/docs/lifecycle#setstorageclass} for supported transitions.
     */
    /**
     * Add an object lifecycle management rule to the bucket.
     *
     * By default, an Object Lifecycle Management rule provided to this method
     * will be included to the existing policy. To replace all existing rules,
     * supply the `options` argument, setting `append` to `false`.
     *
     * To add multiple rules, pass a list to the `rule` parameter. Calling this
     * function multiple times asynchronously does not guarantee that all rules
     * are added correctly.
     *
     * See {@link https://cloud.google.com/storage/docs/lifecycle| Object Lifecycle Management}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/patch| Buckets: patch API Documentation}
     *
     * @param {LifecycleRule|LifecycleRule[]} rule The new lifecycle rule or rules to be added to objects
     *     in this bucket.
     * @param {string|object} rule.action The action to be taken upon matching of
     *     all the conditions 'delete', 'setStorageClass', or 'AbortIncompleteMultipartUpload'.
     *     **Note**: For configuring a raw-formatted rule object to be passed as `action`
     *               please refer to the [examples]{@link https://cloud.google.com/storage/docs/managing-lifecycles#configexamples}.
     * @param {object} rule.condition Condition a bucket must meet before the
     *     action occurs on the bucket. Refer to following supported [conditions]{@link https://cloud.google.com/storage/docs/lifecycle#conditions}.
     * @param {string} [rule.storageClass] When using the `setStorageClass`
     *     action, provide this option to dictate which storage class the object
     *     should update to.
     * @param {AddLifecycleRuleOptions} [options] Configuration object.
     * @param {boolean} [options.append=true] Append the new rule to the existing
     *     policy.
     * @param {SetBucketMetadataCallback} [callback] Callback function.
     * @returns {Promise<SetBucketMetadataResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Automatically have an object deleted from this bucket once it is 3 years
     * // of age.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     age: 365 * 3 // Specified in days.
     *   }
     * }, function(err, apiResponse) {
     *   if (err) {
     *     // Error handling omitted.
     *   }
     *
     *   const lifecycleRules = bucket.metadata.lifecycle.rule;
     *
     *   // Iterate over the Object Lifecycle Management rules on this bucket.
     *   lifecycleRules.forEach(lifecycleRule => {});
     * });
     *
     * //-
     * // By default, the rule you provide will be added to the existing policy.
     * // Optionally, you can disable this behavior to replace all of the
     * // pre-existing rules.
     * //-
     * const options = {
     *   append: false
     * };
     *
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     age: 365 * 3 // Specified in days.
     *   }
     * }, options, function(err, apiResponse) {
     *   if (err) {
     *     // Error handling omitted.
     *   }
     *
     *   // All rules have been replaced with the new "delete" rule.
     *
     *   // Iterate over the Object Lifecycle Management rules on this bucket.
     *   lifecycleRules.forEach(lifecycleRule => {});
     * });
     *
     * //-
     * // For objects created before 2018, "downgrade" the storage class.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'setStorageClass',
     *   storageClass: 'COLDLINE',
     *   condition: {
     *     createdBefore: new Date('2018')
     *   }
     * }, function(err, apiResponse) {});
     *
     * //-
     * // Delete objects created before 2016 which have the Coldline storage
     * // class.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     matchesStorageClass: [
     *       'COLDLINE'
     *     ],
     *     createdBefore: new Date('2016')
     *   }
     * }, function(err, apiResponse) {});
     *
     * //-
     * // Delete object that has a noncurrent timestamp that is at least 100 days.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     daysSinceNoncurrentTime: 100
     *   }
     * }, function(err, apiResponse) {});
     *
     * //-
     * // Delete object that has a noncurrent timestamp before 2020-01-01.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     noncurrentTimeBefore: new Date('2020-01-01')
     *   }
     * }, function(err, apiResponse) {});
     *
     * //-
     * // Delete object that has a customTime that is at least 100 days.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     daysSinceCustomTime: 100
     *   }
     * }, function(err, apiResponse) ());
     *
     * //-
     * // Delete object that has a customTime before 2020-01-01.
     * //-
     * bucket.addLifecycleRule({
     *   action: 'delete',
     *   condition: {
     *     customTimeBefore: new Date('2020-01-01')
     *   }
     * }, function(err, apiResponse) {});
     * ```
     */
    addLifecycleRule(rule, optionsOrCallback, callback) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      options = options || {};
      const rules = Array.isArray(rule) ? rule : [rule];
      for (const curRule of rules) {
        if (curRule.condition.createdBefore instanceof Date) {
          curRule.condition.createdBefore = curRule.condition.createdBefore.toISOString().replace(/T.+$/, "");
        }
        if (curRule.condition.customTimeBefore instanceof Date) {
          curRule.condition.customTimeBefore = curRule.condition.customTimeBefore.toISOString().replace(/T.+$/, "");
        }
        if (curRule.condition.noncurrentTimeBefore instanceof Date) {
          curRule.condition.noncurrentTimeBefore = curRule.condition.noncurrentTimeBefore.toISOString().replace(/T.+$/, "");
        }
      }
      if (options.append === false) {
        this.setMetadata({ lifecycle: { rule: rules } }, options, callback);
        return;
      }
      this.getMetadata((err, metadata) => {
        var _a, _b;
        if (err) {
          callback(err);
          return;
        }
        const currentLifecycleRules = Array.isArray((_a = metadata.lifecycle) === null || _a === void 0 ? void 0 : _a.rule) ? (_b = metadata.lifecycle) === null || _b === void 0 ? void 0 : _b.rule : [];
        this.setMetadata({
          lifecycle: { rule: currentLifecycleRules.concat(rules) }
        }, options, callback);
      });
    }
    /**
     * @typedef {object} CombineOptions
     * @property {string} [kmsKeyName] Resource name of the Cloud KMS key, of
     *     the form
     *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`,
     *     that will be used to encrypt the object. Overwrites the object
     * metadata's `kms_key_name` value, if any.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback CombineCallback
     * @param {?Error} err Request error, if any.
     * @param {File} newFile The new {@link File}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {array} CombineResponse
     * @property {File} 0 The new {@link File}.
     * @property {object} 1 The full API response.
     */
    /**
       * Combine multiple files into one new file.
       *
       * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/compose| Objects: compose API Documentation}
       *
       * @throws {Error} if a non-array is provided as sources argument.
       * @throws {Error} if no sources are provided.
       * @throws {Error} if no destination is provided.
       *
       * @param {string[]|File[]} sources The source files that will be
       *     combined.
       * @param {string|File} destination The file you would like the
       *     source files combined into.
       * @param {CombineOptions} [options] Configuration options.
       * @param {string} [options.kmsKeyName] Resource name of the Cloud KMS key, of
       *     the form
       *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`,
       *     that will be used to encrypt the object. Overwrites the object
       * metadata's `kms_key_name` value, if any.
       * @param {string} [options.userProject] The ID of the project which will be
       *     billed for the request.
    
       * @param {CombineCallback} [callback] Callback function.
       * @returns {Promise<CombineResponse>}
       *
       * @example
       * ```
       * const logBucket = storage.bucket('log-bucket');
       *
       * const sources = [
       *   logBucket.file('2013-logs.txt'),
       *   logBucket.file('2014-logs.txt')
       * ];
       *
       * const allLogs = logBucket.file('all-logs.txt');
       *
       * logBucket.combine(sources, allLogs, function(err, newFile, apiResponse) {
       *   // newFile === allLogs
       * });
       *
       * //-
       * // If the callback is omitted, we'll return a Promise.
       * //-
       * logBucket.combine(sources, allLogs).then(function(data) {
       *   const newFile = data[0];
       *   const apiResponse = data[1];
       * });
       * ```
       */
    combine(sources, destination, optionsOrCallback, callback) {
      var _a;
      if (!Array.isArray(sources) || sources.length === 0) {
        throw new Error(BucketExceptionMessages.PROVIDE_SOURCE_FILE);
      }
      if (!destination) {
        throw new Error(BucketExceptionMessages.DESTINATION_FILE_NOT_SPECIFIED);
      }
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      if (options.contexts) {
        const validationError = (0, util_js_1.handleContextValidation)(options.contexts, callback);
        if (validationError)
          return validationError;
      }
      this.disableAutoRetryConditionallyIdempotent_(
        this.methods.setMetadata,
        // Not relevant but param is required
        AvailableServiceObjectMethods.setMetadata,
        // Same as above
        options
      );
      const convertToFile = (file2) => {
        if (file2 instanceof file_js_1.File) {
          return file2;
        }
        return this.file(file2);
      };
      sources = sources.map(convertToFile);
      const destinationFile = convertToFile(destination);
      callback = callback || index_js_1.util.noop;
      if (!destinationFile.metadata.contentType) {
        const destinationContentType = mime_1.default.getType(destinationFile.name) || void 0;
        if (destinationContentType) {
          destinationFile.metadata.contentType = destinationContentType;
        }
      }
      let maxRetries = this.storage.retryOptions.maxRetries;
      if (((_a = destinationFile === null || destinationFile === void 0 ? void 0 : destinationFile.instancePreconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) === void 0 && options.ifGenerationMatch === void 0 && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        maxRetries = 0;
      }
      if (options.ifGenerationMatch === void 0) {
        Object.assign(options, destinationFile.instancePreconditionOpts, options);
      }
      destinationFile.request({
        method: "POST",
        uri: "/compose",
        maxRetries,
        json: {
          destination: {
            contentType: destinationFile.metadata.contentType,
            contentEncoding: destinationFile.metadata.contentEncoding,
            contexts: options.contexts || destinationFile.metadata.contexts
          },
          sourceObjects: sources.map((source) => {
            const sourceObject = {
              name: source.name
            };
            if (source.metadata && source.metadata.generation) {
              sourceObject.generation = parseInt(source.metadata.generation.toString());
            }
            return sourceObject;
          })
        },
        qs: options
      }, (err, resp) => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
        if (err) {
          callback(err, null, resp);
          return;
        }
        callback(null, destinationFile, resp);
      });
    }
    /**
     * See a {@link https://cloud.google.com/storage/docs/json_api/v1/objects/watchAll| Objects: watchAll request body}.
     *
     * @typedef {object} CreateChannelConfig
     * @property {string} address The address where notifications are
     *     delivered for this channel.
     * @property {string} [delimiter] Returns results in a directory-like mode.
     * @property {number} [maxResults] Maximum number of `items` plus `prefixes`
     *     to return in a single page of responses.
     * @property {string} [pageToken] A previously-returned page token
     *     representing part of the larger set of results to view.
     * @property {string} [prefix] Filter results to objects whose names begin
     *     with this prefix.
     * @property {string} [projection=noAcl] Set of properties to return.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {boolean} [versions=false] If `true`, lists all versions of an object
     *     as distinct results.
     */
    /**
     * @typedef {object} CreateChannelOptions
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @typedef {array} CreateChannelResponse
     * @property {Channel} 0 The new {@link Channel}.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback CreateChannelCallback
     * @param {?Error} err Request error, if any.
     * @param {Channel} channel The new {@link Channel}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Create a channel that will be notified when objects in this bucket changes.
     *
     * @throws {Error} If an ID is not provided.
     * @throws {Error} If an address is not provided.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/watchAll| Objects: watchAll API Documentation}
     *
     * @param {string} id The ID of the channel to create.
     * @param {CreateChannelConfig} config Configuration for creating channel.
     * @param {string} config.address The address where notifications are
     *     delivered for this channel.
     * @param {string} [config.delimiter] Returns results in a directory-like mode.
     * @param {number} [config.maxResults] Maximum number of `items` plus `prefixes`
     *     to return in a single page of responses.
     * @param {string} [config.pageToken] A previously-returned page token
     *     representing part of the larger set of results to view.
     * @param {string} [config.prefix] Filter results to objects whose names begin
     *     with this prefix.
     * @param {string} [config.projection=noAcl] Set of properties to return.
     * @param {string} [config.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {boolean} [config.versions=false] If `true`, lists all versions of an object
     *     as distinct results.
     * @param {CreateChannelOptions} [options] Configuration options.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {CreateChannelCallback} [callback] Callback function.
     * @returns {Promise<CreateChannelResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     * const id = 'new-channel-id';
     *
     * const config = {
     *   address: 'https://...'
     * };
     *
     * bucket.createChannel(id, config, function(err, channel, apiResponse) {
     *   if (!err) {
     *     // Channel created successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.createChannel(id, config).then(function(data) {
     *   const channel = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    createChannel(id, config, optionsOrCallback, callback) {
      if (typeof id !== "string") {
        throw new Error(BucketExceptionMessages.CHANNEL_ID_REQUIRED);
      }
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      this.request({
        method: "POST",
        uri: "/o/watch",
        json: Object.assign({
          id,
          type: "web_hook"
        }, config),
        qs: options
      }, (err, apiResponse) => {
        if (err) {
          callback(err, null, apiResponse);
          return;
        }
        const resourceId = apiResponse.resourceId;
        const channel2 = this.storage.channel(id, resourceId);
        channel2.metadata = apiResponse;
        callback(null, channel2, apiResponse);
      });
    }
    /**
     * Metadata to set for the Notification.
     *
     * @typedef {object} CreateNotificationOptions
     * @property {object} [customAttributes] An optional list of additional
     *     attributes to attach to each Cloud PubSub message published for this
     *     notification subscription.
     * @property {string[]} [eventTypes] If present, only send notifications about
     *     listed event types. If empty, sent notifications for all event types.
     * @property {string} [objectNamePrefix] If present, only apply this
     *     notification configuration to object names that begin with this prefix.
     * @property {string} [payloadFormat] The desired content of the Payload.
     * Defaults to `JSON_API_V1`.
     *
     * Acceptable values are:
     * - `JSON_API_V1`
     *
     * - `NONE`
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback CreateNotificationCallback
     * @param {?Error} err Request error, if any.
     * @param {Notification} notification The new {@link Notification}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {array} CreateNotificationResponse
     * @property {Notification} 0 The new {@link Notification}.
     * @property {object} 1 The full API response.
     */
    /**
     * Creates a notification subscription for the bucket.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/insert| Notifications: insert}
     *
     * @param {Topic|string} topic The Cloud PubSub topic to which this
     * subscription publishes. If the project ID is omitted, the current
     * project ID will be used.
     *
     * Acceptable formats are:
     * - `projects/grape-spaceship-123/topics/my-topic`
     *
     * - `my-topic`
     * @param {CreateNotificationOptions} [options] Metadata to set for the
     *     notification.
     * @param {object} [options.customAttributes] An optional list of additional
     *     attributes to attach to each Cloud PubSub message published for this
     *     notification subscription.
     * @param {string[]} [options.eventTypes] If present, only send notifications about
     *     listed event types. If empty, sent notifications for all event types.
     * @param {string} [options.objectNamePrefix] If present, only apply this
     *     notification configuration to object names that begin with this prefix.
     * @param {string} [options.payloadFormat] The desired content of the Payload.
     * Defaults to `JSON_API_V1`.
     *
     * Acceptable values are:
     * - `JSON_API_V1`
     *
     * - `NONE`
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {CreateNotificationCallback} [callback] Callback function.
     * @returns {Promise<CreateNotificationResponse>}
     * @throws {Error} If a valid topic is not provided.
     * @see Notification#create
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * const callback = function(err, notification, apiResponse) {
     *   if (!err) {
     *     // The notification was created successfully.
     *   }
     * };
     *
     * myBucket.createNotification('my-topic', callback);
     *
     * //-
     * // Configure the notification by providing Notification metadata.
     * //-
     * const metadata = {
     *   objectNamePrefix: 'prefix-'
     * };
     *
     * myBucket.createNotification('my-topic', metadata, callback);
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * myBucket.createNotification('my-topic').then(function(data) {
     *   const notification = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/createNotification.js</caption>
     * region_tag:storage_create_bucket_notifications
     * Another example:
     */
    createNotification(topic, optionsOrCallback, callback) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      const topicIsObject = topic !== null && typeof topic === "object";
      if (topicIsObject && index_js_1.util.isCustomType(topic, "pubsub/topic")) {
        topic = topic.name;
      }
      if (typeof topic !== "string") {
        throw new Error(BucketExceptionMessages.TOPIC_NAME_REQUIRED);
      }
      const body = Object.assign({ topic }, options);
      if (body.topic.indexOf("projects") !== 0) {
        body.topic = "projects/{{projectId}}/topics/" + body.topic;
      }
      body.topic = `//pubsub.${this.storage.universeDomain}/` + body.topic;
      if (!body.payloadFormat) {
        body.payloadFormat = "JSON_API_V1";
      }
      const query = {};
      if (body.userProject) {
        query.userProject = body.userProject;
        delete body.userProject;
      }
      this.request({
        method: "POST",
        uri: "/notificationConfigs",
        json: (0, util_js_1.convertObjKeysToSnakeCase)(body),
        qs: query,
        maxRetries: 0
        //explicitly set this value since this is a non-idempotent function
      }, (err, apiResponse) => {
        if (err) {
          callback(err, null, apiResponse);
          return;
        }
        const notification2 = this.notification(apiResponse.id);
        notification2.metadata = apiResponse;
        callback(null, notification2, apiResponse);
      });
    }
    /**
     * @typedef {object} DeleteFilesOptions Query object. See {@link Bucket#getFiles}
     *     for all of the supported properties.
     * @property {boolean} [force] Suppress errors until all files have been
     *     processed.
     */
    /**
     * @callback DeleteFilesCallback
     * @param {?Error|?Error[]} err Request error, if any, or array of errors from
     *     files that were not able to be deleted.
     * @param {object} [apiResponse] The full API response.
     */
    /**
     * Iterate over the bucket's files, calling `file.delete()` on each.
     *
     * <strong>This is not an atomic request.</strong> A delete attempt will be
     * made for each file individually. Any one can fail, in which case only a
     * portion of the files you intended to be deleted would have.
     *
     * Operations are performed in parallel, up to 10 at once. The first error
     * breaks the loop and will execute the provided callback with it. Specify
     * `{ force: true }` to suppress the errors until all files have had a chance
     * to be processed.
     *
     * File preconditions cannot be passed to this function. It will not retry unless
     * the idempotency strategy is set to retry always.
     *
     * The `query` object passed as the first argument will also be passed to
     * {@link Bucket#getFiles}.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/delete| Objects: delete API Documentation}
     *
     * @param {DeleteFilesOptions} [query] Query object. See {@link Bucket#getFiles}
     * @param {boolean} [query.force] Suppress errors until all files have been
     *     processed.
     * @param {DeleteFilesCallback} [callback] Callback function.
     * @returns {Promise}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Delete all of the files in the bucket.
     * //-
     * bucket.deleteFiles(function(err) {});
     *
     * //-
     * // By default, if a file cannot be deleted, this method will stop deleting
     * // files from your bucket. You can override this setting with `force:
     * // true`.
     * //-
     * bucket.deleteFiles({
     *   force: true
     * }, function(errors) {
     *   // `errors`:
     *   //    Array of errors if any occurred, otherwise null.
     * });
     *
     * //-
     * // The first argument to this method acts as a query to
     * // {@link Bucket#getFiles}. As an example, you can delete files
     * // which match a prefix.
     * //-
     * bucket.deleteFiles({
     *   prefix: 'images/'
     * }, function(err) {
     *   if (!err) {
     *     // All files in the `images` directory have been deleted.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.deleteFiles().then(function() {});
     * ```
     */
    deleteFiles(queryOrCallback, callback) {
      let query = {};
      if (typeof queryOrCallback === "function") {
        callback = queryOrCallback;
      } else if (queryOrCallback) {
        query = queryOrCallback;
      }
      const MAX_PARALLEL_LIMIT = 10;
      const MAX_QUEUE_SIZE = 1e3;
      const errors = [];
      const deleteFile = (file2) => {
        return file2.delete(query).catch((err) => {
          if (!query.force) {
            throw err;
          }
          errors.push(err);
        });
      };
      (async () => {
        try {
          let promises = [];
          const limit = (0, p_limit_1.default)(MAX_PARALLEL_LIMIT);
          const filesStream = this.getFilesStream(query);
          for await (const curFile of filesStream) {
            if (promises.length >= MAX_QUEUE_SIZE) {
              await Promise.all(promises);
              promises = [];
            }
            promises.push(limit(() => deleteFile(curFile)).catch((e) => {
              filesStream.destroy();
              throw e;
            }));
          }
          await Promise.all(promises);
          callback(errors.length > 0 ? errors : null);
        } catch (e) {
          callback(e);
          return;
        }
      })();
    }
    /**
     * @deprecated
     * @typedef {array} DeleteLabelsResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @deprecated
     * @callback DeleteLabelsCallback
     * @param {?Error} err Request error, if any.
     * @param {object} metadata Bucket's metadata.
     */
    /**
     * @deprecated Use setMetadata directly
     * Delete one or more labels from this bucket.
     *
     * @param {string|string[]} [labels] The labels to delete. If no labels are
     *     provided, all of the labels are removed.
     * @param {DeleteLabelsCallback} [callback] Callback function.
     * @param {DeleteLabelsOptions} [options] Options, including precondition options
     * @returns {Promise<DeleteLabelsResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Delete all of the labels from this bucket.
     * //-
     * bucket.deleteLabels(function(err, apiResponse) {});
     *
     * //-
     * // Delete a single label.
     * //-
     * bucket.deleteLabels('labelone', function(err, apiResponse) {});
     *
     * //-
     * // Delete a specific set of labels.
     * //-
     * bucket.deleteLabels([
     *   'labelone',
     *   'labeltwo'
     * ], function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.deleteLabels().then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    deleteLabels(labelsOrCallbackOrOptions, optionsOrCallback, callback) {
      let labels = new Array();
      let options = {};
      if (typeof labelsOrCallbackOrOptions === "function") {
        callback = labelsOrCallbackOrOptions;
      } else if (typeof labelsOrCallbackOrOptions === "string") {
        labels = [labelsOrCallbackOrOptions];
      } else if (Array.isArray(labelsOrCallbackOrOptions)) {
        labels = labelsOrCallbackOrOptions;
      } else if (labelsOrCallbackOrOptions) {
        options = labelsOrCallbackOrOptions;
      }
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      const deleteLabels = (labels2) => {
        const nullLabelMap = labels2.reduce((nullLabelMap2, labelKey) => {
          nullLabelMap2[labelKey] = null;
          return nullLabelMap2;
        }, {});
        if ((options === null || options === void 0 ? void 0 : options.ifMetagenerationMatch) !== void 0) {
          this.setLabels(nullLabelMap, options, callback);
        } else {
          this.setLabels(nullLabelMap, callback);
        }
      };
      if (labels.length === 0) {
        this.getLabels((err, labels2) => {
          if (err) {
            callback(err);
            return;
          }
          deleteLabels(Object.keys(labels2));
        });
      } else {
        deleteLabels(labels);
      }
    }
    /**
     * @typedef {array} DisableRequesterPaysResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @callback DisableRequesterPaysCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * <div class="notice">
     *   <strong>Early Access Testers Only</strong>
     *   <p>
     *     This feature is not yet widely-available.
     *   </p>
     * </div>
     *
     * Disable `requesterPays` functionality from this bucket.
     *
     * @param {DisableRequesterPaysCallback} [callback] Callback function.
     * @param {DisableRequesterPaysOptions} [options] Options, including precondition options
     * @returns {Promise<DisableRequesterPaysCallback>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.disableRequesterPays(function(err, apiResponse) {
     *   if (!err) {
     *     // requesterPays functionality disabled successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.disableRequesterPays().then(function(data) {
     *   const apiResponse = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/requesterPays.js</caption>
     * region_tag:storage_disable_requester_pays
     * Example of disabling requester pays:
     */
    disableRequesterPays(optionsOrCallback, callback) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      this.setMetadata({
        billing: {
          requesterPays: false
        }
      }, options, callback);
    }
    /**
     * Configuration object for enabling logging.
     *
     * @typedef {object} EnableLoggingOptions
     * @property {string|Bucket} [bucket] The bucket for the log entries. By
     *     default, the current bucket is used.
     * @property {string} prefix A unique prefix for log object names.
     */
    /**
     * Enable logging functionality for this bucket. This will make two API
     * requests, first to grant Cloud Storage WRITE permission to the bucket, then
     * to set the appropriate configuration on the Bucket's metadata.
     *
     * @param {EnableLoggingOptions} config Configuration options.
     * @param {string|Bucket} [config.bucket] The bucket for the log entries. By
     *     default, the current bucket is used.
     * @param {string} config.prefix A unique prefix for log object names.
     * @param {SetBucketMetadataCallback} [callback] Callback function.
     * @returns {Promise<SetBucketMetadataResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * const config = {
     *   prefix: 'log'
     * };
     *
     * bucket.enableLogging(config, function(err, apiResponse) {
     *   if (!err) {
     *     // Logging functionality enabled successfully.
     *   }
     * });
     *
     * ```
     * @example
     * Optionally, provide a destination bucket.
     * ```
     * const config = {
     *   prefix: 'log',
     *   bucket: 'destination-bucket'
     * };
     *
     * bucket.enableLogging(config, function(err, apiResponse) {});
     * ```
     *
     * @example
     * If the callback is omitted, we'll return a Promise.
     * ```
     * bucket.enableLogging(config).then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    enableLogging(config, callback) {
      if (!config || typeof config === "function" || typeof config.prefix === "undefined") {
        throw new Error(BucketExceptionMessages.CONFIGURATION_OBJECT_PREFIX_REQUIRED);
      }
      let logBucket = this.id;
      if (config.bucket && config.bucket instanceof Bucket) {
        logBucket = config.bucket.id;
      } else if (config.bucket && typeof config.bucket === "string") {
        logBucket = config.bucket;
      }
      const options = {};
      if (config === null || config === void 0 ? void 0 : config.ifMetagenerationMatch) {
        options.ifMetagenerationMatch = config.ifMetagenerationMatch;
      }
      if (config === null || config === void 0 ? void 0 : config.ifMetagenerationNotMatch) {
        options.ifMetagenerationNotMatch = config.ifMetagenerationNotMatch;
      }
      (async () => {
        try {
          const [policy] = await this.iam.getPolicy();
          policy.bindings.push({
            members: ["group:cloud-storage-analytics@google.com"],
            role: "roles/storage.objectCreator"
          });
          await this.iam.setPolicy(policy);
          this.setMetadata({
            logging: {
              logBucket,
              logObjectPrefix: config.prefix
            }
          }, options, callback);
        } catch (e) {
          callback(e);
          return;
        }
      })();
    }
    /**
     * @typedef {array} EnableRequesterPaysResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @callback EnableRequesterPaysCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * <div class="notice">
     *   <strong>Early Access Testers Only</strong>
     *   <p>
     *     This feature is not yet widely-available.
     *   </p>
     * </div>
     *
     * Enable `requesterPays` functionality for this bucket. This enables you, the
     * bucket owner, to have the requesting user assume the charges for the access
     * to your bucket and its contents.
     *
     * @param {EnableRequesterPaysCallback | EnableRequesterPaysOptions} [optionsOrCallback]
     * Callback function or precondition options.
     * @returns {Promise<EnableRequesterPaysResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.enableRequesterPays(function(err, apiResponse) {
     *   if (!err) {
     *     // requesterPays functionality enabled successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.enableRequesterPays().then(function(data) {
     *   const apiResponse = data[0];
     * });
     *
     * ```
     * @example <caption>include:samples/requesterPays.js</caption>
     * region_tag:storage_enable_requester_pays
     * Example of enabling requester pays:
     */
    enableRequesterPays(optionsOrCallback, cb) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        cb = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      this.setMetadata({
        billing: {
          requesterPays: true
        }
      }, options, cb);
    }
    /**
     * Create a {@link File} object. See {@link File} to see how to handle
     * the different use cases you may have.
     *
     * @param {string} name The name of the file in this bucket.
     * @param {FileOptions} [options] Configuration options.
     * @param {string|number} [options.generation] Only use a specific revision of
     *     this file.
     * @param {string} [options.encryptionKey] A custom encryption key. See
     *     {@link https://cloud.google.com/storage/docs/encryption#customer-supplied| Customer-supplied Encryption Keys}.
     * @param {string} [options.kmsKeyName] The name of the Cloud KMS key that will
     *     be used to encrypt the object. Must be in the format:
     *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`.
     *     KMS key ring must use the same location as the bucket.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for all requests made from File object.
     * @returns {File}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     * const file = bucket.file('my-existing-file.png');
     * ```
     */
    file(name2, options) {
      if (!name2) {
        throw Error(BucketExceptionMessages.SPECIFY_FILE_NAME);
      }
      return new file_js_1.File(this, name2, options);
    }
    /**
     * @typedef {array} GetFilesResponse
     * @property {File[]} 0 Array of {@link File} instances.
     * @param {object} nextQuery 1 A query object to receive more results.
     * @param {object} apiResponse 2 The full API response.
     */
    /**
     * @callback GetFilesCallback
     * @param {?Error} err Request error, if any.
     * @param {File[]} files Array of {@link File} instances.
     * @param {object} nextQuery A query object to receive more results.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Query object for listing files.
     *
     * @typedef {object} GetFilesOptions
     * @property {boolean} [autoPaginate=true] Have pagination handled
     *     automatically.
     * @property {string} [delimiter] Results will contain only objects whose
     *     names, aside from the prefix, do not contain delimiter. Objects whose
     *     names, aside from the prefix, contain delimiter will have their name
     *     truncated after the delimiter, returned in `apiResponse.prefixes`.
     *     Duplicate prefixes are omitted.
     * @property {string} [endOffset] Filter results to objects whose names are
     * lexicographically before endOffset. If startOffset is also set, the objects
     * listed have names between startOffset (inclusive) and endOffset (exclusive).
     * @property {boolean} [includeFoldersAsPrefixes] If true, includes folders and
     * managed folders in the set of prefixes returned by the query. Only applicable if
     * delimiter is set to / and autoPaginate is set to false.
     * See: https://cloud.google.com/storage/docs/managed-folders
     * @property {boolean} [includeTrailingDelimiter] If true, objects that end in
     * exactly one instance of delimiter have their metadata included in items[]
     * in addition to the relevant part of the object name appearing in prefixes[].
     * @property {string} [prefix] Filter results to objects whose names begin
     *     with this prefix.
     * @property {string} [filter] Filter results using a server-side filter
     * expression. This is primarily used for filtering by Object Contexts.
     * Syntax: `contexts."<key>"="<value>"` or `contexts."<key>":*`.
     * Prepend `-` for negation (e.g., `-contexts."key":*`).
     * @property {string} [matchGlob] A glob pattern used to filter results,
     *     for example foo*bar
     * @property {number} [maxApiCalls] Maximum number of API calls to make.
     * @property {number} [maxResults] Maximum number of items plus prefixes to
     *     return per call.
     *     Note: By default will handle pagination automatically
     *     if more than 1 page worth of results are requested per call.
     *     When `autoPaginate` is set to `false` the smaller of `maxResults`
     *     or 1 page of results will be returned per call.
     * @property {string} [pageToken] A previously-returned page token
     *     representing part of the larger set of results to view.
     * @property {boolean} [softDeleted] If true, only soft-deleted object versions will be
     *     listed as distinct results in order of generation number. Note `soft_deleted` and
     *     `versions` cannot be set to true simultaneously.
     * @property {string} [startOffset] Filter results to objects whose names are
     * lexicographically equal to or after startOffset. If endOffset is also set,
     * the objects listed have names between startOffset (inclusive) and endOffset (exclusive).
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {boolean} [versions] If true, returns File objects scoped to
     *     their versions.
     */
    /**
     * Get {@link File} objects for the files currently in the bucket.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/list| Objects: list API Documentation}
     *
     * @param {GetFilesOptions} [query] Query object for listing files.
     * @param {boolean} [query.autoPaginate=true] Have pagination handled
     *     automatically.
     * @param {string} [query.delimiter] Results will contain only objects whose
     *     names, aside from the prefix, do not contain delimiter. Objects whose
     *     names, aside from the prefix, contain delimiter will have their name
     *     truncated after the delimiter, returned in `apiResponse.prefixes`.
     *     Duplicate prefixes are omitted.
     * @param {string} [query.endOffset] Filter results to objects whose names are
     * lexicographically before endOffset. If startOffset is also set, the objects
     * listed have names between startOffset (inclusive) and endOffset (exclusive).
     * @param {boolean} [query.includeFoldersAsPrefixes] If true, includes folders and
     * managed folders in the set of prefixes returned by the query. Only applicable if
     * delimiter is set to / and autoPaginate is set to false.
     * See: https://cloud.google.com/storage/docs/managed-folders
     * @param {boolean} [query.includeTrailingDelimiter] If true, objects that end in
     * exactly one instance of delimiter have their metadata included in items[]
     * in addition to the relevant part of the object name appearing in prefixes[].
     * @param {string} [query.prefix] Filter results to objects whose names begin
     *     with this prefix.
     * @param {string} [query.filter] Filter results using a server-side filter
     *     expression. Supports Object Contexts with operators like `=`, `:`,
     *     and `-` for negation.
     * @param {number} [query.maxApiCalls] Maximum number of API calls to make.
     * @param {number} [query.maxResults] Maximum number of items plus prefixes to
     *     return per call.
     *     Note: By default will handle pagination automatically
     *     if more than 1 page worth of results are requested per call.
     *     When `autoPaginate` is set to `false` the smaller of `maxResults`
     *     or 1 page of results will be returned per call.
     * @param {string} [query.pageToken] A previously-returned page token
     *     representing part of the larger set of results to view.
     * @param {boolean} [query.softDeleted] If true, only soft-deleted object versions will be
     *     listed as distinct results in order of generation number. Note `soft_deleted` and
     *     `versions` cannot be set to true simultaneously.
     * @param {string} [query.startOffset] Filter results to objects whose names are
     * lexicographically equal to or after startOffset. If endOffset is also set,
     * the objects listed have names between startOffset (inclusive) and endOffset (exclusive).
     * @param {string} [query.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {boolean} [query.versions] If true, returns File objects scoped to
     *     their versions.
     *
     * @param {GetFilesCallback} [callback] Callback function.
     * @returns {Promise<GetFilesResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.getFiles(function(err, files) {
     *   if (!err) {
     *     // files is an array of File objects.
     *   }
     * });
     *
     * //-
     * // If your bucket has versioning enabled, you can get all of your files
     * // scoped to their generation.
     * //-
     * bucket.getFiles({
     *   versions: true
     * }, function(err, files) {
     *   // Each file is scoped to its generation.
     * });
     *
     * //-
     * // To control how many API requests are made and page through the results
     * // manually, set `autoPaginate` to `false`.
     * //-
     * const callback = function(err, files, nextQuery, apiResponse) {
     *   if (nextQuery) {
     *     // More results exist.
     *     bucket.getFiles(nextQuery, callback);
     *   }
     *
     *   // The `metadata` property is populated for you with the metadata at the
     *   // time of fetching.
     *   files[0].metadata;
     *
     *   // However, in cases where you are concerned the metadata could have
     *   // changed, use the `getMetadata` method.
     *   files[0].getMetadata(function(err, metadata) {});
     * };
     *
     * bucket.getFiles({
     *   autoPaginate: false
     * }, callback);
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.getFiles().then(function(data) {
     *   const files = data[0];
     * });
     *
     * ```
     * @example
     * <h6>Simulating a File System</h6><p>With `autoPaginate: false`, it's possible to iterate over files which incorporate a common structure using a delimiter.</p><p>Consider the following remote objects:</p><ol><li>"a"</li><li>"a/b/c/d"</li><li>"b/d/e"</li></ol><p>Using a delimiter of `/` will return a single file, "a".</p><p>`apiResponse.prefixes` will return the "sub-directories" that were found:</p><ol><li>"a/"</li><li>"b/"</li></ol>
     * ```
     * bucket.getFiles({
     *   autoPaginate: false,
     *   delimiter: '/'
     * }, function(err, files, nextQuery, apiResponse) {
     *   // files = [
     *   //   {File} // File object for file "a"
     *   // ]
     *
     *   // apiResponse.prefixes = [
     *   //   'a/',
     *   //   'b/'
     *   // ]
     * });
     * ```
     *
     * @example
     * Using prefixes, it's now possible to simulate a file system with follow-up requests.
     * ```
     * bucket.getFiles({
     *   autoPaginate: false,
     *   delimiter: '/',
     *   prefix: 'a/'
     * }, function(err, files, nextQuery, apiResponse) {
     *   // No files found within "directory" a.
     *   // files = []
     *
     *   // However, a "sub-directory" was found.
     *   // This prefix can be used to continue traversing the "file system".
     *   // apiResponse.prefixes = [
     *   //   'a/b/'
     *   // ]
     * });
     * ```
     *
     * @example
     * //-
     * // Filter files using Object Contexts.
     * //-
     * ```
     * const query = {
     *    filter: 'contexts."status"="active"'
     * };
     * bucket.getFiles(query, function(err, files) {
     *    if (!err) {
     *      // files only contains objects with the 'status' context set to 'active'.
     *    }
     * });
     *
     * //-
     * // You can also filter by the absence of a context key.
     * //-
     *
     * bucket.getFiles({
     *    filter: '-contexts."priority":*'
     * }, function(err, files) {
     *     // files contains objects that DO NOT have the 'priority' context key.
     * });
     * ```
     *
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_list_files
     * Another example:
     *
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_list_files_with_prefix
     * Example of listing files, filtered by a prefix:
     */
    getFiles(queryOrCallback, callback) {
      let query = typeof queryOrCallback === "object" ? queryOrCallback : {};
      if (!callback) {
        callback = queryOrCallback;
      }
      query = Object.assign({}, query);
      if (query.fields && query.autoPaginate && !query.fields.includes("nextPageToken")) {
        query.fields = `${query.fields},nextPageToken`;
      }
      this.request({
        uri: "/o",
        qs: query
      }, (err, resp) => {
        if (err) {
          callback(err, null, null, resp);
          return;
        }
        const itemsArray = resp.items ? resp.items : [];
        const files2 = itemsArray.map((file2) => {
          const options = {};
          if (query.fields) {
            const fileInstance2 = file2;
            return fileInstance2;
          }
          if (query.versions) {
            options.generation = file2.generation;
          }
          if (file2.kmsKeyName) {
            options.kmsKeyName = file2.kmsKeyName;
          }
          const fileInstance = this.file(file2.name, options);
          fileInstance.metadata = file2;
          return fileInstance;
        });
        let nextQuery = null;
        if (resp.nextPageToken) {
          nextQuery = Object.assign({}, query, {
            pageToken: resp.nextPageToken
          });
        }
        callback(null, files2, nextQuery, resp);
      });
    }
    /**
     * @deprecated
     * @typedef {object} GetLabelsOptions Configuration options for Bucket#getLabels().
     * @param {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @deprecated
     * @typedef {array} GetLabelsResponse
     * @property {object} 0 Object of labels currently set on this bucket.
     */
    /**
     * @deprecated
     * @callback GetLabelsCallback
     * @param {?Error} err Request error, if any.
     * @param {object} labels Object of labels currently set on this bucket.
     */
    /**
     * @deprecated Use getMetadata directly.
     * Get the labels currently set on this bucket.
     *
     * @param {object} [options] Configuration options.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {GetLabelsCallback} [callback] Callback function.
     * @returns {Promise<GetLabelsCallback>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.getLabels(function(err, labels) {
     *   if (err) {
     *     // Error handling omitted.
     *   }
     *
     *   // labels = {
     *   //   label: 'labelValue',
     *   //   ...
     *   // }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.getLabels().then(function(data) {
     *   const labels = data[0];
     * });
     * ```
     */
    getLabels(optionsOrCallback, callback) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      this.getMetadata(options, (err, metadata) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, (metadata === null || metadata === void 0 ? void 0 : metadata.labels) || {});
      });
    }
    /**
     * @typedef {object} GetNotificationsOptions Configuration options for Bucket#getNotification().
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback GetNotificationsCallback
     * @param {?Error} err Request error, if any.
     * @param {Notification[]} notifications Array of {@link Notification}
     *     instances.
     * @param {object} apiResponse The full API response.
     */
    /**
     * @typedef {array} GetNotificationsResponse
     * @property {Notification[]} 0 Array of {@link Notification} instances.
     * @property {object} 1 The full API response.
     */
    /**
     * Retrieves a list of notification subscriptions for a given bucket.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/notifications/list| Notifications: list}
     *
     * @param {GetNotificationsOptions} [options] Configuration options.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {GetNotificationsCallback} [callback] Callback function.
     * @returns {Promise<GetNotificationsResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     *
     * bucket.getNotifications(function(err, notifications, apiResponse) {
     *   if (!err) {
     *     // notifications is an array of Notification objects.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.getNotifications().then(function(data) {
     *   const notifications = data[0];
     *   const apiResponse = data[1];
     * });
     *
     * ```
     * @example <caption>include:samples/listNotifications.js</caption>
     * region_tag:storage_list_bucket_notifications
     * Another example:
     */
    getNotifications(optionsOrCallback, callback) {
      let options = {};
      if (typeof optionsOrCallback === "function") {
        callback = optionsOrCallback;
      } else if (optionsOrCallback) {
        options = optionsOrCallback;
      }
      this.request({
        uri: "/notificationConfigs",
        qs: options
      }, (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }
        const itemsArray = resp.items ? resp.items : [];
        const notifications = itemsArray.map((notification2) => {
          const notificationInstance = this.notification(notification2.id);
          notificationInstance.metadata = notification2;
          return notificationInstance;
        });
        callback(null, notifications, resp);
      });
    }
    /**
     * @typedef {array} GetSignedUrlResponse
     * @property {object} 0 The signed URL.
     */
    /**
     * @callback GetSignedUrlCallback
     * @param {?Error} err Request error, if any.
     * @param {object} url The signed URL.
     */
    /**
     * @typedef {object} GetBucketSignedUrlConfig
     * @property {string} action Only listing objects within a bucket (HTTP: GET) is supported for bucket-level signed URLs.
     * @property {*} expires A timestamp when this link will expire. Any value
     *     given is passed to `new Date()`.
     *     Note: 'v4' supports maximum duration of 7 days (604800 seconds) from now.
     * @property {string} [version='v2'] The signing version to use, either
     *     'v2' or 'v4'.
     * @property {boolean} [virtualHostedStyle=false] Use virtual hosted-style
     *     URLs ('https://mybucket.storage.googleapis.com/...') instead of path-style
     *     ('https://storage.googleapis.com/mybucket/...'). Virtual hosted-style URLs
     *     should generally be preferred instead of path-style URL.
     *     Currently defaults to `false` for path-style, although this may change in a
     *     future major-version release.
     * @property {string} [cname] The cname for this bucket, i.e.,
     *     "https://cdn.example.com".
     *     See [reference]{@link https://cloud.google.com/storage/docs/access-control/signed-urls#example}
     * @property {object} [extensionHeaders] If these headers are used, the
     * server will check to make sure that the client provides matching
     * values. See {@link https://cloud.google.com/storage/docs/access-control/signed-urls#about-canonical-extension-headers| Canonical extension headers}
     * for the requirements of this feature, most notably:
     * - The header name must be prefixed with `x-goog-`
     * - The header name must be all lowercase
     *
     * Note: Multi-valued header passed as an array in the extensionHeaders
     *       object is converted into a string, delimited by `,` with
     *       no space. Requests made using the signed URL will need to
     *       delimit multi-valued headers using a single `,` as well, or
     *       else the server will report a mismatched signature.
     * @property {object} [queryParams] Additional query parameters to include
     *     in the signed URL.
     */
    /**
     * Get a signed URL to allow limited time access to a bucket.
     *
     * In Google Cloud Platform environments, such as Cloud Functions and App
     * Engine, you usually don't provide a `keyFilename` or `credentials` during
     * instantiation. In those environments, we call the
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob| signBlob API}
     * to create a signed URL. That API requires either the
     * `https://www.googleapis.com/auth/iam` or
     * `https://www.googleapis.com/auth/cloud-platform` scope, so be sure they are
     * enabled.
     *
     * See {@link https://cloud.google.com/storage/docs/access-control/signed-urls| Signed URLs Reference}
     *
     * @throws {Error} if an expiration timestamp from the past is given.
     *
     * @param {GetBucketSignedUrlConfig} config Configuration object.
     * @param {string} config.action Currently only supports "list" (HTTP: GET).
     * @param {*} config.expires A timestamp when this link will expire. Any value
     *     given is passed to `new Date()`.
     *     Note: 'v4' supports maximum duration of 7 days (604800 seconds) from now.
     * @param {string} [config.version='v2'] The signing version to use, either
     *     'v2' or 'v4'.
     * @param {boolean} [config.virtualHostedStyle=false] Use virtual hosted-style
     *     URLs ('https://mybucket.storage.googleapis.com/...') instead of path-style
     *     ('https://storage.googleapis.com/mybucket/...'). Virtual hosted-style URLs
     *     should generally be preferred instead of path-style URL.
     *     Currently defaults to `false` for path-style, although this may change in a
     *     future major-version release.
     * @param {string} [config.cname] The cname for this bucket, i.e.,
     *     "https://cdn.example.com".
     *     See [reference]{@link https://cloud.google.com/storage/docs/access-control/signed-urls#example}
     * @param {object} [config.extensionHeaders] If these headers are used, the
     * server will check to make sure that the client provides matching
     * values. See {@link https://cloud.google.com/storage/docs/access-control/signed-urls#about-canonical-extension-headers| Canonical extension headers}
     * for the requirements of this feature, most notably:
     * - The header name must be prefixed with `x-goog-`
     * - The header name must be all lowercase
     *
     * Note: Multi-valued header passed as an array in the extensionHeaders
     *       object is converted into a string, delimited by `,` with
     *       no space. Requests made using the signed URL will need to
     *       delimit multi-valued headers using a single `,` as well, or
     *       else the server will report a mismatched signature.
     * @property {object} [config.queryParams] Additional query parameters to include
     *     in the signed URL.
     * @param {GetSignedUrlCallback} [callback] Callback function.
     * @returns {Promise<GetSignedUrlResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const myBucket = storage.bucket('my-bucket');
     *
     * //-
     * // Generate a URL that allows temporary access to list files in a bucket.
     * //-
     * const request = require('request');
     *
     * const config = {
     *   action: 'list',
     *   expires: '03-17-2025'
     * };
     *
     * bucket.getSignedUrl(config, function(err, url) {
     *   if (err) {
     *     console.error(err);
     *     return;
     *   }
     *
     *   // The bucket is now available to be listed from this URL.
     *   request(url, function(err, resp) {
     *     // resp.statusCode = 200
     *   });
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.getSignedUrl(config).then(function(data) {
     *   const url = data[0];
     * });
     * ```
     */
    getSignedUrl(cfg, callback) {
      const method = BucketActionToHTTPMethod[cfg.action];
      const signConfig = {
        method,
        expires: cfg.expires,
        version: cfg.version,
        cname: cfg.cname,
        extensionHeaders: cfg.extensionHeaders || {},
        queryParams: cfg.queryParams || {},
        host: cfg.host,
        signingEndpoint: cfg.signingEndpoint
      };
      if (!this.signer) {
        this.signer = new signer_js_1.URLSigner(this.storage.authClient, this, void 0, this.storage);
      }
      this.signer.getSignedUrl(signConfig).then((signedUrl) => callback(null, signedUrl), callback);
    }
    /**
     * @callback BucketLockCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Lock a previously-defined retention policy. This will prevent changes to
     * the policy.
     *
     * @throws {Error} if a metageneration is not provided.
     *
     * @param {number|string} metageneration The bucket's metageneration. This is
     *     accessible from calling {@link File#getMetadata}.
     * @param {BucketLockCallback} [callback] Callback function.
     * @returns {Promise<BucketLockResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const bucket = storage.bucket('albums');
     *
     * const metageneration = 2;
     *
     * bucket.lock(metageneration, function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.lock(metageneration).then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    lock(metageneration, callback) {
      const metatype = typeof metageneration;
      if (metatype !== "number" && metatype !== "string") {
        throw new Error(BucketExceptionMessages.METAGENERATION_NOT_PROVIDED);
      }
      this.request({
        method: "POST",
        uri: "/lockRetentionPolicy",
        qs: {
          ifMetagenerationMatch: metageneration
        }
      }, callback);
    }
    /**
     * @typedef {object} RestoreOptions Options for Bucket#restore(). See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/restore#resource| Object resource}.
     * @param {number} [generation] If present, selects a specific revision of this object.
     * @param {string} [projection] Specifies the set of properties to return. If used, must be 'full' or 'noAcl'.
     */
    /**
     * Restores a soft-deleted bucket
     * @param {RestoreOptions} options Restore options.
     * @returns {Promise<Bucket>}
     */
    async restore(options) {
      const [bucket2] = await this.request({
        method: "POST",
        uri: "/restore",
        qs: options
      });
      return bucket2;
    }
    /**
     * @typedef {array} MakeBucketPrivateResponse
     * @property {File[]} 0 List of files made private.
     */
    /**
     * @callback MakeBucketPrivateCallback
     * @param {?Error} err Request error, if any.
     * @param {File[]} files List of files made private.
     */
    /**
     * @typedef {object} MakeBucketPrivateOptions
     * @property {boolean} [includeFiles=false] Make each file in the bucket
     *     private.
     * @property {Metadata} [metadata] Define custom metadata properties to define
     *     along with the operation.
     * @property {boolean} [force] Queue errors occurred while making files
     *     private until all files have been processed.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * Make the bucket listing private.
     *
     * You may also choose to make the contents of the bucket private by
     * specifying `includeFiles: true`. This will automatically run
     * {@link File#makePrivate} for every file in the bucket.
     *
     * When specifying `includeFiles: true`, use `force: true` to delay execution
     * of your callback until all files have been processed. By default, the
     * callback is executed after the first error. Use `force` to queue such
     * errors until all files have been processed, after which they will be
     * returned as an array as the first argument to your callback.
     *
     * NOTE: This may cause the process to be long-running and use a high number
     * of requests. Use with caution.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/patch| Buckets: patch API Documentation}
     *
     * @param {MakeBucketPrivateOptions} [options] Configuration options.
     * @param {boolean} [options.includeFiles=false] Make each file in the bucket
     *     private.
     * @param {Metadata} [options.metadata] Define custom metadata properties to define
     *     along with the operation.
     * @param {boolean} [options.force] Queue errors occurred while making files
     *     private until all files have been processed.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {MakeBucketPrivateCallback} [callback] Callback function.
     * @returns {Promise<MakeBucketPrivateResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Make the bucket private.
     * //-
     * bucket.makePrivate(function(err) {});
     *
     * //-
     * // Make the bucket and its contents private.
     * //-
     * const opts = {
     *   includeFiles: true
     * };
     *
     * bucket.makePrivate(opts, function(err, files) {
     *   // `err`:
     *   //    The first error to occur, otherwise null.
     *   //
     *   // `files`:
     *   //    Array of files successfully made private in the bucket.
     * });
     *
     * //-
     * // Make the bucket and its contents private, using force to suppress errors
     * // until all files have been processed.
     * //-
     * const opts = {
     *   includeFiles: true,
     *   force: true
     * };
     *
     * bucket.makePrivate(opts, function(errors, files) {
     *   // `errors`:
     *   //    Array of errors if any occurred, otherwise null.
     *   //
     *   // `files`:
     *   //    Array of files successfully made private in the bucket.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.makePrivate(opts).then(function(data) {
     *   const files = data[0];
     * });
     * ```
     */
    makePrivate(optionsOrCallback, callback) {
      var _a, _b, _c, _d;
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      options.private = true;
      const query = {
        predefinedAcl: "projectPrivate"
      };
      if (options.userProject) {
        query.userProject = options.userProject;
      }
      if ((_a = options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) {
        query.ifGenerationMatch = options.preconditionOpts.ifGenerationMatch;
      }
      if ((_b = options.preconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationNotMatch) {
        query.ifGenerationNotMatch = options.preconditionOpts.ifGenerationNotMatch;
      }
      if ((_c = options.preconditionOpts) === null || _c === void 0 ? void 0 : _c.ifMetagenerationMatch) {
        query.ifMetagenerationMatch = options.preconditionOpts.ifMetagenerationMatch;
      }
      if ((_d = options.preconditionOpts) === null || _d === void 0 ? void 0 : _d.ifMetagenerationNotMatch) {
        query.ifMetagenerationNotMatch = options.preconditionOpts.ifMetagenerationNotMatch;
      }
      const metadata = { ...options.metadata, acl: null };
      this.setMetadata(metadata, query, (err) => {
        if (err) {
          callback(err);
        }
        const internalCall = () => {
          if (options.includeFiles) {
            return (0, util_1.promisify)(this.makeAllFilesPublicPrivate_).call(this, options);
          }
          return Promise.resolve([]);
        };
        internalCall().then((files2) => callback(null, files2)).catch(callback);
      });
    }
    /**
     * @typedef {object} MakeBucketPublicOptions
     * @property {boolean} [includeFiles=false] Make each file in the bucket
     *     private.
     * @property {boolean} [force] Queue errors occurred while making files
     *     private until all files have been processed.
     */
    /**
     * @callback MakeBucketPublicCallback
     * @param {?Error} err Request error, if any.
     * @param {File[]} files List of files made public.
     */
    /**
     * @typedef {array} MakeBucketPublicResponse
     * @property {File[]} 0 List of files made public.
     */
    /**
     * Make the bucket publicly readable.
     *
     * You may also choose to make the contents of the bucket publicly readable by
     * specifying `includeFiles: true`. This will automatically run
     * {@link File#makePublic} for every file in the bucket.
     *
     * When specifying `includeFiles: true`, use `force: true` to delay execution
     * of your callback until all files have been processed. By default, the
     * callback is executed after the first error. Use `force` to queue such
     * errors until all files have been processed, after which they will be
     * returned as an array as the first argument to your callback.
     *
     * NOTE: This may cause the process to be long-running and use a high number
     * of requests. Use with caution.
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/patch| Buckets: patch API Documentation}
     *
     * @param {MakeBucketPublicOptions} [options] Configuration options.
     * @param {boolean} [options.includeFiles=false] Make each file in the bucket
     *     private.
     * @param {boolean} [options.force] Queue errors occurred while making files
     *     private until all files have been processed.
     * @param {MakeBucketPublicCallback} [callback] Callback function.
     * @returns {Promise<MakeBucketPublicResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Make the bucket publicly readable.
     * //-
     * bucket.makePublic(function(err) {});
     *
     * //-
     * // Make the bucket and its contents publicly readable.
     * //-
     * const opts = {
     *   includeFiles: true
     * };
     *
     * bucket.makePublic(opts, function(err, files) {
     *   // `err`:
     *   //    The first error to occur, otherwise null.
     *   //
     *   // `files`:
     *   //    Array of files successfully made public in the bucket.
     * });
     *
     * //-
     * // Make the bucket and its contents publicly readable, using force to
     * // suppress errors until all files have been processed.
     * //-
     * const opts = {
     *   includeFiles: true,
     *   force: true
     * };
     *
     * bucket.makePublic(opts, function(errors, files) {
     *   // `errors`:
     *   //    Array of errors if any occurred, otherwise null.
     *   //
     *   // `files`:
     *   //    Array of files successfully made public in the bucket.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.makePublic(opts).then(function(data) {
     *   const files = data[0];
     * });
     * ```
     */
    makePublic(optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const req = { public: true, ...options };
      this.acl.add({
        entity: "allUsers",
        role: "READER"
      }).then(() => {
        return this.acl.default.add({
          entity: "allUsers",
          role: "READER"
        });
      }).then(() => {
        if (req.includeFiles) {
          return (0, util_1.promisify)(this.makeAllFilesPublicPrivate_).call(this, req);
        }
        return [];
      }).then((files2) => callback(null, files2), callback);
    }
    /**
     * Get a reference to a Cloud Pub/Sub Notification.
     *
     * @param {string} id ID of notification.
     * @returns {Notification}
     * @see Notification
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const notification = bucket.notification('1');
     * ```
     */
    notification(id) {
      if (!id) {
        throw new Error(BucketExceptionMessages.SUPPLY_NOTIFICATION_ID);
      }
      return new notification_js_1.Notification(this, id);
    }
    /**
     * Remove an already-existing retention policy from this bucket, if it is not
     * locked.
     *
     * @param {SetBucketMetadataCallback} [callback] Callback function.
     * @param {SetBucketMetadataOptions} [options] Options, including precondition options
     * @returns {Promise<SetBucketMetadataResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const bucket = storage.bucket('albums');
     *
     * bucket.removeRetentionPeriod(function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.removeRetentionPeriod().then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    removeRetentionPeriod(optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      this.setMetadata({
        retentionPolicy: null
      }, options, callback);
    }
    /**
     * Makes request and applies userProject query parameter if necessary.
     *
     * @private
     *
     * @param {object} reqOpts - The request options.
     * @param {function} callback - The callback function.
     */
    request(reqOpts, callback) {
      if (this.userProject && (!reqOpts.qs || !reqOpts.qs.userProject)) {
        reqOpts.qs = { ...reqOpts.qs, userProject: this.userProject };
      }
      return super.request(reqOpts, callback);
    }
    /**
     * @deprecated
     * @typedef {array} SetLabelsResponse
     * @property {object} 0 The bucket metadata.
     */
    /**
     * @deprecated
     * @callback SetLabelsCallback
     * @param {?Error} err Request error, if any.
     * @param {object} metadata The bucket metadata.
     */
    /**
     * @deprecated
     * @typedef {object} SetLabelsOptions Configuration options for Bucket#setLabels().
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @deprecated Use setMetadata directly.
     * Set labels on the bucket.
     *
     * This makes an underlying call to {@link Bucket#setMetadata}, which
     * is a PATCH request. This means an individual label can be overwritten, but
     * unmentioned labels will not be touched.
     *
     * @param {object<string, string>} labels Labels to set on the bucket.
     * @param {SetLabelsOptions} [options] Configuration options.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {SetLabelsCallback} [callback] Callback function.
     * @returns {Promise<SetLabelsResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * const labels = {
     *   labelone: 'labelonevalue',
     *   labeltwo: 'labeltwovalue'
     * };
     *
     * bucket.setLabels(labels, function(err, metadata) {
     *   if (!err) {
     *     // Labels set successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.setLabels(labels).then(function(data) {
     *   const metadata = data[0];
     * });
     * ```
     */
    setLabels(labels, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      callback = callback || index_js_1.util.noop;
      this.setMetadata({ labels }, options, callback);
    }
    setMetadata(metadata, optionsOrCallback, cb) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      cb = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      this.disableAutoRetryConditionallyIdempotent_(this.methods.setMetadata, AvailableServiceObjectMethods.setMetadata, options);
      super.setMetadata(metadata, options).then((resp) => cb(null, ...resp)).catch(cb).finally(() => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
      });
    }
    /**
     * Lock all objects contained in the bucket, based on their creation time. Any
     * attempt to overwrite or delete objects younger than the retention period
     * will result in a `PERMISSION_DENIED` error.
     *
     * An unlocked retention policy can be modified or removed from the bucket via
     * {@link File#removeRetentionPeriod} and {@link File#setRetentionPeriod}. A
     * locked retention policy cannot be removed or shortened in duration for the
     * lifetime of the bucket. Attempting to remove or decrease period of a locked
     * retention policy will result in a `PERMISSION_DENIED` error. You can still
     * increase the policy.
     *
     * @param {*} duration In seconds, the minimum retention time for all objects
     *     contained in this bucket.
     * @param {SetBucketMetadataCallback} [callback] Callback function.
     * @param {SetBucketMetadataCallback} [options] Options, including precondition options.
     * @returns {Promise<SetBucketMetadataResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const bucket = storage.bucket('albums');
     *
     * const DURATION_SECONDS = 15780000; // 6 months.
     *
     * //-
     * // Lock the objects in this bucket for 6 months.
     * //-
     * bucket.setRetentionPeriod(DURATION_SECONDS, function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.setRetentionPeriod(DURATION_SECONDS).then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    setRetentionPeriod(duration, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      this.setMetadata({
        retentionPolicy: {
          retentionPeriod: duration.toString()
        }
      }, options, callback);
    }
    /**
     *
     * @typedef {object} Cors
     * @property {number} [maxAgeSeconds] The number of seconds the browser is
     *     allowed to make requests before it must repeat the preflight request.
     * @property {string[]} [method] HTTP method allowed for cross origin resource
     *     sharing with this bucket.
     * @property {string[]} [origin] an origin allowed for cross origin resource
     *     sharing with this bucket.
     * @property {string[]} [responseHeader] A header allowed for cross origin
     *     resource sharing with this bucket.
     */
    /**
     * This can be used to set the CORS configuration on the bucket.
     *
     * The configuration will be overwritten with the value passed into this.
     *
     * @param {Cors[]} corsConfiguration The new CORS configuration to set
     * @param {number} [corsConfiguration.maxAgeSeconds] The number of seconds the browser is
     *     allowed to make requests before it must repeat the preflight request.
     * @param {string[]} [corsConfiguration.method] HTTP method allowed for cross origin resource
     *     sharing with this bucket.
     * @param {string[]} [corsConfiguration.origin] an origin allowed for cross origin resource
     *     sharing with this bucket.
     * @param {string[]} [corsConfiguration.responseHeader] A header allowed for cross origin
     *     resource sharing with this bucket.
     * @param {SetBucketMetadataCallback} [callback] Callback function.
     * @param {SetBucketMetadataOptions} [options] Options, including precondition options.
     * @returns {Promise<SetBucketMetadataResponse>}
     *
     * @example
     * ```
     * const storage = require('@google-cloud/storage')();
     * const bucket = storage.bucket('albums');
     *
     * const corsConfiguration = [{maxAgeSeconds: 3600}]; // 1 hour
     * bucket.setCorsConfiguration(corsConfiguration);
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.setCorsConfiguration(corsConfiguration).then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    setCorsConfiguration(corsConfiguration, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      this.setMetadata({
        cors: corsConfiguration
      }, options, callback);
    }
    /**
     * @typedef {object} SetBucketStorageClassOptions
     * @property {string} [userProject] - The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @callback SetBucketStorageClassCallback
     * @param {?Error} err Request error, if any.
     */
    /**
     * Set the default storage class for new files in this bucket.
     *
     * See {@link https://cloud.google.com/storage/docs/storage-classes| Storage Classes}
     *
     * @param {string} storageClass The new storage class. (`standard`,
     *     `nearline`, `coldline`, or `archive`).
     *     **Note:** The storage classes `multi_regional`, `regional`, and
     *     `durable_reduced_availability` are now legacy and will be deprecated in
     *     the future.
     * @param {object} [options] Configuration options.
     * @param {string} [options.userProject] - The ID of the project which will be
     *     billed for the request.
     * @param {SetStorageClassCallback} [callback] Callback function.
     * @returns {Promise}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.setStorageClass('nearline', function(err, apiResponse) {
     *   if (err) {
     *     // Error handling omitted.
     *   }
     *
     *   // The storage class was updated successfully.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.setStorageClass('nearline').then(function() {});
     * ```
     */
    setStorageClass(storageClass, optionsOrCallback, callback) {
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      storageClass = storageClass.replace(/-/g, "_").replace(/([a-z])([A-Z])/g, (_, low, up) => {
        return low + "_" + up;
      }).toUpperCase();
      this.setMetadata({ storageClass }, options, callback);
    }
    /**
     * Set a user project to be billed for all requests made from this Bucket
     * object and any files referenced from this Bucket object.
     *
     * @param {string} userProject The user project.
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * bucket.setUserProject('grape-spaceship-123');
     * ```
     */
    setUserProject(userProject) {
      this.userProject = userProject;
      const methods = [
        "create",
        "delete",
        "exists",
        "get",
        "getMetadata",
        "setMetadata"
      ];
      methods.forEach((method) => {
        const methodConfig = this.methods[method];
        if (typeof methodConfig === "object") {
          if (typeof methodConfig.reqOpts === "object") {
            Object.assign(methodConfig.reqOpts.qs, { userProject });
          } else {
            methodConfig.reqOpts = {
              qs: { userProject }
            };
          }
        }
      });
    }
    /**
     * @typedef {object} UploadOptions Configuration options for Bucket#upload().
     * @property {string|File} [destination] The place to save
     *     your file. If given a string, the file will be uploaded to the bucket
     *     using the string as a filename. When given a File object, your local
     * file will be uploaded to the File object's bucket and under the File
     * object's name. Lastly, when this argument is omitted, the file is uploaded
     * to your bucket using the name of the local file.
     * @property {string} [encryptionKey] A custom encryption key. See
     *     {@link https://cloud.google.com/storage/docs/encryption#customer-supplied| Customer-supplied Encryption Keys}.
     * @property {boolean} [gzip] Automatically gzip the file. This will set
     *     `options.metadata.contentEncoding` to `gzip`.
     * @property {string} [kmsKeyName] The name of the Cloud KMS key that will
     *     be used to encrypt the object. Must be in the format:
     *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`.
     * @property {object} [metadata] See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON| Objects: insert request body}.
     * @property {string} [offset] The starting byte of the upload stream, for
     *     resuming an interrupted upload. Defaults to 0.
     * @property {string} [predefinedAcl] Apply a predefined set of access
     * controls to this object.
     *
     * Acceptable values are:
     * - **`authenticatedRead`** - Object owner gets `OWNER` access, and
     *       `allAuthenticatedUsers` get `READER` access.
     *
     * - **`bucketOwnerFullControl`** - Object owner gets `OWNER` access, and
     *       project team owners get `OWNER` access.
     *
     * - **`bucketOwnerRead`** - Object owner gets `OWNER` access, and project
     *       team owners get `READER` access.
     *
     * - **`private`** - Object owner gets `OWNER` access.
     *
     * - **`projectPrivate`** - Object owner gets `OWNER` access, and project
     *       team members get access according to their roles.
     *
     * - **`publicRead`** - Object owner gets `OWNER` access, and `allUsers`
     *       get `READER` access.
     * @property {boolean} [private] Make the uploaded file private. (Alias for
     *     `options.predefinedAcl = 'private'`)
     * @property {boolean} [public] Make the uploaded file public. (Alias for
     *     `options.predefinedAcl = 'publicRead'`)
     * @property {boolean} [resumable=true] Resumable uploads are automatically
     *     enabled and must be shut off explicitly by setting to false.
     * @property {number} [timeout=60000] Set the HTTP request timeout in
     *     milliseconds. This option is not available for resumable uploads.
     *     Default: `60000`
     * @property {string} [uri] The URI for an already-created resumable
     *     upload. See {@link File#createResumableUpload}.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     * @property {string|boolean} [validation] Possible values: `"md5"`,
     *     `"crc32c"`, or `false`. By default, data integrity is validated with an
     *     MD5 checksum for maximum reliability. CRC32c will provide better
     *     performance with less reliability. You may also choose to skip
     * validation completely, however this is **not recommended**.
     */
    /**
     * @typedef {array} UploadResponse
     * @property {object} 0 The uploaded {@link File}.
     * @property {object} 1 The full API response.
     */
    /**
     * @callback UploadCallback
     * @param {?Error} err Request error, if any.
     * @param {object} file The uploaded {@link File}.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Upload a file to the bucket. This is a convenience method that wraps
     * {@link File#createWriteStream}.
     *
     * Resumable uploads are enabled by default
     *
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/how-tos/upload#uploads| Upload Options (Simple or Resumable)}
     * See {@link https://cloud.google.com/storage/docs/json_api/v1/objects/insert| Objects: insert API Documentation}
     *
     * @param {string} pathString The fully qualified path to the file you
     *     wish to upload to your bucket.
     * @param {UploadOptions} [options] Configuration options.
     * @param {string|File} [options.destination] The place to save
     *     your file. If given a string, the file will be uploaded to the bucket
     *     using the string as a filename. When given a File object, your local
     * file will be uploaded to the File object's bucket and under the File
     * object's name. Lastly, when this argument is omitted, the file is uploaded
     * to your bucket using the name of the local file.
     * @param {string} [options.encryptionKey] A custom encryption key. See
     *     {@link https://cloud.google.com/storage/docs/encryption#customer-supplied| Customer-supplied Encryption Keys}.
     * @param {boolean} [options.gzip] Automatically gzip the file. This will set
     *     `options.metadata.contentEncoding` to `gzip`.
     * @param {string} [options.kmsKeyName] The name of the Cloud KMS key that will
     *     be used to encrypt the object. Must be in the format:
     *     `projects/my-project/locations/location/keyRings/my-kr/cryptoKeys/my-key`.
     * @param {object} [options.metadata] See an
     *     {@link https://cloud.google.com/storage/docs/json_api/v1/objects/insert#request_properties_JSON| Objects: insert request body}.
     * @param {string} [options.offset] The starting byte of the upload stream, for
     *     resuming an interrupted upload. Defaults to 0.
     * @param {string} [options.predefinedAcl] Apply a predefined set of access
     * controls to this object.
     * Acceptable values are:
     * - **`authenticatedRead`** - Object owner gets `OWNER` access, and
     *   `allAuthenticatedUsers` get `READER` access.
     *
     * - **`bucketOwnerFullControl`** - Object owner gets `OWNER` access, and
     *   project team owners get `OWNER` access.
     *
     * - **`bucketOwnerRead`** - Object owner gets `OWNER` access, and project
     *   team owners get `READER` access.
     *
     * - **`private`** - Object owner gets `OWNER` access.
     *
     * - **`projectPrivate`** - Object owner gets `OWNER` access, and project
     *   team members get access according to their roles.
     *
     * - **`publicRead`** - Object owner gets `OWNER` access, and `allUsers`
     *   get `READER` access.
     * @param {boolean} [options.private] Make the uploaded file private. (Alias for
     *     `options.predefinedAcl = 'private'`)
     * @param {boolean} [options.public] Make the uploaded file public. (Alias for
     *     `options.predefinedAcl = 'publicRead'`)
     * @param {boolean} [options.resumable=true] Resumable uploads are automatically
     *     enabled and must be shut off explicitly by setting to false.
     * @param {number} [options.timeout=60000] Set the HTTP request timeout in
     *     milliseconds. This option is not available for resumable uploads.
     *     Default: `60000`
     * @param {string} [options.uri] The URI for an already-created resumable
     *     upload. See {@link File#createResumableUpload}.
     * @param {string} [options.userProject] The ID of the project which will be
     *     billed for the request.
     * @param {string|boolean} [options.validation] Possible values: `"md5"`,
     *     `"crc32c"`, or `false`. By default, data integrity is validated with an
     *     MD5 checksum for maximum reliability. CRC32c will provide better
     *     performance with less reliability. You may also choose to skip
     * validation completely, however this is **not recommended**.
     * @param {UploadCallback} [callback] Callback function.
     * @returns {Promise<UploadResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('albums');
     *
     * //-
     * // Upload a file from a local path.
     * //-
     * bucket.upload('/local/path/image.png', function(err, file, apiResponse) {
     *   // Your bucket now contains:
     *   // - "image.png" (with the contents of `/local/path/image.png')
     *
     *   // `file` is an instance of a File object that refers to your new file.
     * });
     *
     *
     * //-
     * // It's not always that easy. You will likely want to specify the filename
     * // used when your new file lands in your bucket.
     * //
     * // You may also want to set metadata or customize other options.
     * //-
     * const options = {
     *   destination: 'new-image.png',
     *   validation: 'crc32c',
     *   metadata: {
     *     metadata: {
     *       event: 'Fall trip to the zoo'
     *     }
     *   }
     * };
     *
     * bucket.upload('local-image.png', options, function(err, file) {
     *   // Your bucket now contains:
     *   // - "new-image.png" (with the contents of `local-image.png')
     *
     *   // `file` is an instance of a File object that refers to your new file.
     * });
     *
     * //-
     * // You can also have a file gzip'd on the fly.
     * //-
     * bucket.upload('index.html', { gzip: true }, function(err, file) {
     *   // Your bucket now contains:
     *   // - "index.html" (automatically compressed with gzip)
     *
     *   // Downloading the file with `file.download` will automatically decode
     * the
     *   // file.
     * });
     *
     * //-
     * // You may also re-use a File object, {File}, that references
     * // the file you wish to create or overwrite.
     * //-
     * const options = {
     *   destination: bucket.file('existing-file.png'),
     *   resumable: false
     * };
     *
     * bucket.upload('local-img.png', options, function(err, newFile) {
     *   // Your bucket now contains:
     *   // - "existing-file.png" (with the contents of `local-img.png')
     *
     *   // Note:
     *   // The `newFile` parameter is equal to `file`.
     * });
     *
     * //-
     * // To use
     * // <a
     * href="https://cloud.google.com/storage/docs/encryption#customer-supplied">
     * // Customer-supplied Encryption Keys</a>, provide the `encryptionKey`
     * option.
     * //-
     * const crypto = require('crypto');
     * const encryptionKey = crypto.randomBytes(32);
     *
     * bucket.upload('img.png', {
     *   encryptionKey: encryptionKey
     * }, function(err, newFile) {
     *   // `img.png` was uploaded with your custom encryption key.
     *
     *   // `newFile` is already configured to use the encryption key when making
     *   // operations on the remote object.
     *
     *   // However, to use your encryption key later, you must create a `File`
     *   // instance with the `key` supplied:
     *   const file = bucket.file('img.png', {
     *     encryptionKey: encryptionKey
     *   });
     *
     *   // Or with `file#setEncryptionKey`:
     *   const file = bucket.file('img.png');
     *   file.setEncryptionKey(encryptionKey);
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * bucket.upload('local-image.png').then(function(data) {
     *   const file = data[0];
     * });
     *
     * To upload a file from a URL, use {@link File#createWriteStream}.
     *
     * ```
     * @example <caption>include:samples/files.js</caption>
     * region_tag:storage_upload_file
     * Another example:
     *
     * @example <caption>include:samples/encryption.js</caption>
     * region_tag:storage_upload_encrypted_file
     * Example of uploading an encrypted file:
     */
    upload(pathString, optionsOrCallback, callback) {
      var _a, _b;
      const upload = (numberOfRetries) => {
        const returnValue = (0, async_retry_1.default)(async (bail) => {
          await new Promise((resolve, reject) => {
            var _a2, _b2;
            if (numberOfRetries === 0 && ((_b2 = (_a2 = newFile === null || newFile === void 0 ? void 0 : newFile.storage) === null || _a2 === void 0 ? void 0 : _a2.retryOptions) === null || _b2 === void 0 ? void 0 : _b2.autoRetry)) {
              newFile.storage.retryOptions.autoRetry = false;
            }
            const writable = newFile.createWriteStream(options);
            if (options.onUploadProgress) {
              writable.on("progress", options.onUploadProgress);
            }
            fs.createReadStream(pathString).on("error", bail).pipe(writable).on("error", (err) => {
              if (this.storage.retryOptions.autoRetry && this.storage.retryOptions.retryableErrorFn(err)) {
                return reject(err);
              } else {
                return bail(err);
              }
            }).on("finish", () => {
              return resolve();
            });
          });
        }, {
          retries: numberOfRetries,
          factor: this.storage.retryOptions.retryDelayMultiplier,
          maxTimeout: this.storage.retryOptions.maxRetryDelay * 1e3,
          //convert to milliseconds
          maxRetryTime: this.storage.retryOptions.totalTimeout * 1e3
          //convert to milliseconds
        });
        if (!callback) {
          return returnValue;
        } else {
          return returnValue.then(() => {
            if (callback) {
              return callback(null, newFile, newFile.metadata);
            }
          }).catch(callback);
        }
      };
      if (commonjsGlobal["GCLOUD_SANDBOX_ENV"]) {
        return;
      }
      let options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      options = Object.assign({
        metadata: {}
      }, options);
      let maxRetries = this.storage.retryOptions.maxRetries;
      if (((_a = options === null || options === void 0 ? void 0 : options.preconditionOpts) === null || _a === void 0 ? void 0 : _a.ifGenerationMatch) === void 0 && ((_b = this.instancePreconditionOpts) === null || _b === void 0 ? void 0 : _b.ifGenerationMatch) === void 0 && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional || this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        maxRetries = 0;
      }
      let newFile;
      if (options.destination instanceof file_js_1.File) {
        newFile = options.destination;
      } else if (options.destination !== null && typeof options.destination === "string") {
        newFile = this.file(options.destination, {
          encryptionKey: options.encryptionKey,
          kmsKeyName: options.kmsKeyName,
          preconditionOpts: this.instancePreconditionOpts
        });
      } else {
        const destination = path.basename(pathString);
        newFile = this.file(destination, {
          encryptionKey: options.encryptionKey,
          kmsKeyName: options.kmsKeyName,
          preconditionOpts: this.instancePreconditionOpts
        });
      }
      upload(maxRetries);
    }
    /**
     * @private
     *
     * @typedef {object} MakeAllFilesPublicPrivateOptions
     * @property {boolean} [force] Suppress errors until all files have been
     *     processed.
     * @property {boolean} [private] Make files private.
     * @property {boolean} [public] Make files public.
     * @property {string} [userProject] The ID of the project which will be
     *     billed for the request.
     */
    /**
     * @private
     *
     * @callback SetBucketMetadataCallback
     * @param {?Error} err Request error, if any.
     * @param {File[]} files Files that were updated.
     */
    /**
     * @typedef {array} MakeAllFilesPublicPrivateResponse
     * @property {File[]} 0 List of files affected.
     */
    /**
       * Iterate over all of a bucket's files, calling `file.makePublic()` (public)
       * or `file.makePrivate()` (private) on each.
       *
       * Operations are performed in parallel, up to 10 at once. The first error
       * breaks the loop, and will execute the provided callback with it. Specify
       * `{ force: true }` to suppress the errors.
       *
       * @private
       *
       * @param {MakeAllFilesPublicPrivateOptions} [options] Configuration options.
       * @param {boolean} [options.force] Suppress errors until all files have been
       *     processed.
       * @param {boolean} [options.private] Make files private.
       * @param {boolean} [options.public] Make files public.
       * @param {string} [options.userProject] The ID of the project which will be
       *     billed for the request.
    
       * @param {MakeAllFilesPublicPrivateCallback} callback Callback function.
       *
       * @return {Promise<MakeAllFilesPublicPrivateResponse>}
       */
    makeAllFilesPublicPrivate_(optionsOrCallback, callback) {
      const MAX_PARALLEL_LIMIT = 10;
      const errors = [];
      const updatedFiles = [];
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      callback = typeof optionsOrCallback === "function" ? optionsOrCallback : callback;
      const processFile = async (file2) => {
        try {
          await (options.public ? file2.makePublic() : file2.makePrivate(options));
          updatedFiles.push(file2);
        } catch (e) {
          if (!options.force) {
            throw e;
          }
          errors.push(e);
        }
      };
      this.getFiles(options).then(([files2]) => {
        const limit = (0, p_limit_1.default)(MAX_PARALLEL_LIMIT);
        const promises = files2.map((file2) => {
          return limit(() => processFile(file2));
        });
        return Promise.all(promises);
      }).then(() => callback(errors.length > 0 ? errors : null, updatedFiles), (err) => callback(err, updatedFiles));
    }
    getId() {
      return this.id;
    }
    disableAutoRetryConditionallyIdempotent_(coreOpts, methodType, localPreconditionOptions) {
      var _a, _b;
      if (typeof coreOpts === "object" && ((_b = (_a = coreOpts === null || coreOpts === void 0 ? void 0 : coreOpts.reqOpts) === null || _a === void 0 ? void 0 : _a.qs) === null || _b === void 0 ? void 0 : _b.ifMetagenerationMatch) === void 0 && (localPreconditionOptions === null || localPreconditionOptions === void 0 ? void 0 : localPreconditionOptions.ifMetagenerationMatch) === void 0 && (methodType === AvailableServiceObjectMethods.setMetadata || methodType === AvailableServiceObjectMethods.delete) && this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryConditional) {
        this.storage.retryOptions.autoRetry = false;
      } else if (this.storage.retryOptions.idempotencyStrategy === storage_js_1.IdempotencyStrategy.RetryNever) {
        this.storage.retryOptions.autoRetry = false;
      }
    }
  }
  bucket.Bucket = Bucket;
  paginator_1.paginator.extend(Bucket, "getFiles");
  (0, promisify_1.promisifyAll)(Bucket, {
    exclude: ["cloudStorageURI", "request", "file", "notification", "restore"]
  });
  return bucket;
}
var channel = {};
var hasRequiredChannel;
function requireChannel() {
  if (hasRequiredChannel) return channel;
  hasRequiredChannel = 1;
  Object.defineProperty(channel, "__esModule", { value: true });
  channel.Channel = void 0;
  const index_js_1 = requireNodejsCommon();
  const promisify_1 = requireSrc$4();
  class Channel extends index_js_1.ServiceObject {
    constructor(storage2, id, resourceId) {
      const config = {
        parent: storage2,
        baseUrl: "/channels",
        // An ID shouldn't be included in the API requests.
        // RE:
        // https://github.com/GoogleCloudPlatform/google-cloud-node/issues/1145
        id: "",
        methods: {
          // Only need `request`.
        }
      };
      super(config);
      this.metadata.id = id;
      this.metadata.resourceId = resourceId;
    }
    /**
     * @typedef {array} StopResponse
     * @property {object} 0 The full API response.
     */
    /**
     * @callback StopCallback
     * @param {?Error} err Request error, if any.
     * @param {object} apiResponse The full API response.
     */
    /**
     * Stop this channel.
     *
     * @param {StopCallback} [callback] Callback function.
     * @returns {Promise<StopResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const channel = storage.channel('id', 'resource-id');
     * channel.stop(function(err, apiResponse) {
     *   if (!err) {
     *     // Channel stopped successfully.
     *   }
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * channel.stop().then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    stop(callback) {
      callback = callback || index_js_1.util.noop;
      this.request({
        method: "POST",
        uri: "/stop",
        json: this.metadata
      }, (err, apiResponse) => {
        callback(err, apiResponse);
      });
    }
  }
  channel.Channel = Channel;
  (0, promisify_1.promisifyAll)(Channel);
  return channel;
}
var hmacKey = {};
var hasRequiredHmacKey;
function requireHmacKey() {
  if (hasRequiredHmacKey) return hmacKey;
  hasRequiredHmacKey = 1;
  Object.defineProperty(hmacKey, "__esModule", { value: true });
  hmacKey.HmacKey = void 0;
  const index_js_1 = requireNodejsCommon();
  const storage_js_1 = requireStorage();
  const promisify_1 = requireSrc$4();
  class HmacKey extends index_js_1.ServiceObject {
    /**
     * @typedef {object} HmacKeyOptions
     * @property {string} [projectId] The project ID of the project that owns
     *     the service account of the requested HMAC key. If not provided,
     *     the project ID used to instantiate the Storage client will be used.
     */
    /**
     * Constructs an HmacKey object.
     *
     * Note: this only create a local reference to an HMAC key, to create
     * an HMAC key, use {@link Storage#createHmacKey}.
     *
     * @param {Storage} storage The Storage instance this HMAC key is
     *     attached to.
     * @param {string} accessId The unique accessId for this HMAC key.
     * @param {HmacKeyOptions} options Constructor configurations.
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const hmacKey = storage.hmacKey('access-id');
     * ```
     */
    constructor(storage2, accessId, options) {
      const methods = {
        /**
         * @typedef {object} DeleteHmacKeyOptions
         * @property {string} [userProject] This parameter is currently ignored.
         */
        /**
         * @typedef {array} DeleteHmacKeyResponse
         * @property {object} 0 The full API response.
         */
        /**
         * @callback DeleteHmacKeyCallback
         * @param {?Error} err Request error, if any.
         * @param {object} apiResponse The full API response.
         */
        /**
         * Deletes an HMAC key.
         * Key state must be set to `INACTIVE` prior to deletion.
         * Caution: HMAC keys cannot be recovered once you delete them.
         *
         * The authenticated user must have `storage.hmacKeys.delete` permission for the project in which the key exists.
         *
         * @method HmacKey#delete
         * @param {DeleteHmacKeyOptions} [options] Configuration options.
         * @param {DeleteHmacKeyCallback} [callback] Callback function.
         * @returns {Promise<DeleteHmacKeyResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         *
         * //-
         * // Delete HMAC key after making the key inactive.
         * //-
         * const hmacKey = storage.hmacKey('ACCESS_ID');
         * hmacKey.setMetadata({state: 'INACTIVE'}, (err, hmacKeyMetadata) => {
         *     if (err) {
         *       // The request was an error.
         *       console.error(err);
         *       return;
         *     }
         *     hmacKey.delete((err) => {
         *       if (err) {
         *         console.error(err);
         *         return;
         *       }
         *       // The HMAC key is deleted.
         *     });
         *   });
         *
         * //-
         * // If the callback is omitted, a promise is returned.
         * //-
         * const hmacKey = storage.hmacKey('ACCESS_ID');
         * hmacKey
         *   .setMetadata({state: 'INACTIVE'})
         *   .then(() => {
         *     return hmacKey.delete();
         *   });
         * ```
         */
        delete: true,
        /**
         * @callback GetHmacKeyCallback
         * @param {?Error} err Request error, if any.
         * @param {HmacKey} hmacKey this {@link HmacKey} instance.
         * @param {object} apiResponse The full API response.
         */
        /**
         * @typedef {array} GetHmacKeyResponse
         * @property {HmacKey} 0 This {@link HmacKey} instance.
         * @property {object} 1 The full API response.
         */
        /**
         * @typedef {object} GetHmacKeyOptions
         * @property {string} [userProject] This parameter is currently ignored.
         */
        /**
         * Retrieves and populate an HMAC key's metadata, and return
         * this {@link HmacKey} instance.
         *
         * HmacKey.get() does not give the HMAC key secret, as
         * it is only returned on creation.
         *
         * The authenticated user must have `storage.hmacKeys.get` permission
         * for the project in which the key exists.
         *
         * @method HmacKey#get
         * @param {GetHmacKeyOptions} [options] Configuration options.
         * @param {GetHmacKeyCallback} [callback] Callback function.
         * @returns {Promise<GetHmacKeyResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         *
         * //-
         * // Get the HmacKey's Metadata.
         * //-
         * storage.hmacKey('ACCESS_ID')
         *   .get((err, hmacKey) => {
         *     if (err) {
         *       // The request was an error.
         *       console.error(err);
         *       return;
         *     }
         *     // do something with the returned HmacKey object.
         *   });
         *
         * //-
         * // If the callback is omitted, a promise is returned.
         * //-
         * storage.hmacKey('ACCESS_ID')
         *   .get()
         *   .then((data) => {
         *     const hmacKey = data[0];
         *   });
         * ```
         */
        get: true,
        /**
         * @typedef {object} GetHmacKeyMetadataOptions
         * @property {string} [userProject] This parameter is currently ignored.
         */
        /**
         * Retrieves and populate an HMAC key's metadata, and return
         * the HMAC key's metadata as an object.
         *
         * HmacKey.getMetadata() does not give the HMAC key secret, as
         * it is only returned on creation.
         *
         * The authenticated user must have `storage.hmacKeys.get` permission
         * for the project in which the key exists.
         *
         * @method HmacKey#getMetadata
         * @param {GetHmacKeyMetadataOptions} [options] Configuration options.
         * @param {HmacKeyMetadataCallback} [callback] Callback function.
         * @returns {Promise<HmacKeyMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         *
         * //-
         * // Get the HmacKey's metadata and populate to the metadata property.
         * //-
         * storage.hmacKey('ACCESS_ID')
         *   .getMetadata((err, hmacKeyMetadata) => {
         *     if (err) {
         *       // The request was an error.
         *       console.error(err);
         *       return;
         *     }
         *     console.log(hmacKeyMetadata);
         *   });
         *
         * //-
         * // If the callback is omitted, a promise is returned.
         * //-
         * storage.hmacKey('ACCESS_ID')
         *   .getMetadata()
         *   .then((data) => {
         *     const hmacKeyMetadata = data[0];
         *     console.log(hmacKeyMetadata);
         *   });
         * ```
         */
        getMetadata: true,
        /**
         * @typedef {object} SetHmacKeyMetadata Subset of {@link HmacKeyMetadata} to update.
         * @property {string} state New state of the HmacKey. Either 'ACTIVE' or 'INACTIVE'.
         * @property {string} [etag] Include an etag from a previous get HMAC key request
         *    to perform safe read-modify-write.
         */
        /**
         * @typedef {object} SetHmacKeyMetadataOptions
         * @property {string} [userProject] This parameter is currently ignored.
         */
        /**
         * @callback HmacKeyMetadataCallback
         * @param {?Error} err Request error, if any.
         * @param {HmacKeyMetadata} metadata The updated {@link HmacKeyMetadata} object.
         * @param {object} apiResponse The full API response.
         */
        /**
         * @typedef {array} HmacKeyMetadataResponse
         * @property {HmacKeyMetadata} 0 The updated {@link HmacKeyMetadata} object.
         * @property {object} 1 The full API response.
         */
        /**
         * Updates the state of an HMAC key. See {@link SetHmacKeyMetadata} for
         * valid states.
         *
         * @method HmacKey#setMetadata
         * @param {SetHmacKeyMetadata} metadata The new metadata.
         * @param {SetHmacKeyMetadataOptions} [options] Configuration options.
         * @param {HmacKeyMetadataCallback} [callback] Callback function.
         * @returns {Promise<HmacKeyMetadataResponse>}
         *
         * @example
         * ```
         * const {Storage} = require('@google-cloud/storage');
         * const storage = new Storage();
         *
         * const metadata = {
         *   state: 'INACTIVE',
         * };
         *
         * storage.hmacKey('ACCESS_ID')
         *   .setMetadata(metadata, (err, hmacKeyMetadata) => {
         *     if (err) {
         *       // The request was an error.
         *       console.error(err);
         *       return;
         *     }
         *     console.log(hmacKeyMetadata);
         *   });
         *
         * //-
         * // If the callback is omitted, a promise is returned.
         * //-
         * storage.hmacKey('ACCESS_ID')
         *   .setMetadata(metadata)
         *   .then((data) => {
         *     const hmacKeyMetadata = data[0];
         *     console.log(hmacKeyMetadata);
         *   });
         * ```
         */
        setMetadata: {
          reqOpts: {
            method: "PUT"
          }
        }
      };
      const projectId = options && options.projectId || storage2.projectId;
      super({
        parent: storage2,
        id: accessId,
        baseUrl: `/projects/${projectId}/hmacKeys`,
        methods
      });
      this.storage = storage2;
      this.instanceRetryValue = storage2.retryOptions.autoRetry;
    }
    setMetadata(metadata, optionsOrCallback, cb) {
      if (this.storage.retryOptions.idempotencyStrategy !== storage_js_1.IdempotencyStrategy.RetryAlways) {
        this.storage.retryOptions.autoRetry = false;
      }
      const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {};
      cb = typeof optionsOrCallback === "function" ? optionsOrCallback : cb;
      super.setMetadata(metadata, options).then((resp) => cb(null, ...resp)).catch(cb).finally(() => {
        this.storage.retryOptions.autoRetry = this.instanceRetryValue;
      });
    }
  }
  hmacKey.HmacKey = HmacKey;
  (0, promisify_1.promisifyAll)(HmacKey);
  return hmacKey;
}
var hasRequiredStorage;
function requireStorage() {
  if (hasRequiredStorage) return storage;
  hasRequiredStorage = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Storage = exports.RETRYABLE_ERR_FN_DEFAULT = exports.MAX_RETRY_DELAY_DEFAULT = exports.TOTAL_TIMEOUT_DEFAULT = exports.RETRY_DELAY_MULTIPLIER_DEFAULT = exports.MAX_RETRY_DEFAULT = exports.AUTO_RETRY_DEFAULT = exports.PROTOCOL_REGEX = exports.StorageExceptionMessages = exports.ExceptionMessages = exports.IdempotencyStrategy = void 0;
    const index_js_1 = requireNodejsCommon();
    const paginator_1 = requireSrc$6();
    const promisify_1 = requireSrc$4();
    const stream_1 = require$$0$1;
    const bucket_js_1 = requireBucket();
    const channel_js_1 = requireChannel();
    const file_js_1 = requireFile();
    const util_js_1 = requireUtil$1();
    const package_json_helper_cjs_1 = requirePackageJsonHelper();
    const hmacKey_js_1 = requireHmacKey();
    const crc32c_js_1 = requireCrc32c();
    const google_auth_library_1 = requireSrc$2();
    var IdempotencyStrategy;
    (function(IdempotencyStrategy2) {
      IdempotencyStrategy2[IdempotencyStrategy2["RetryAlways"] = 0] = "RetryAlways";
      IdempotencyStrategy2[IdempotencyStrategy2["RetryConditional"] = 1] = "RetryConditional";
      IdempotencyStrategy2[IdempotencyStrategy2["RetryNever"] = 2] = "RetryNever";
    })(IdempotencyStrategy || (exports.IdempotencyStrategy = IdempotencyStrategy = {}));
    var ExceptionMessages;
    (function(ExceptionMessages2) {
      ExceptionMessages2["EXPIRATION_DATE_INVALID"] = "The expiration date provided was invalid.";
      ExceptionMessages2["EXPIRATION_DATE_PAST"] = "An expiration date cannot be in the past.";
    })(ExceptionMessages || (exports.ExceptionMessages = ExceptionMessages = {}));
    var StorageExceptionMessages;
    (function(StorageExceptionMessages2) {
      StorageExceptionMessages2["BUCKET_NAME_REQUIRED"] = "A bucket name is needed to use Cloud Storage.";
      StorageExceptionMessages2["BUCKET_NAME_REQUIRED_CREATE"] = "A name is required to create a bucket.";
      StorageExceptionMessages2["HMAC_SERVICE_ACCOUNT"] = "The first argument must be a service account email to create an HMAC key.";
      StorageExceptionMessages2["HMAC_ACCESS_ID"] = "An access ID is needed to create an HmacKey object.";
    })(StorageExceptionMessages || (exports.StorageExceptionMessages = StorageExceptionMessages = {}));
    exports.PROTOCOL_REGEX = /^(\w*):\/\//;
    exports.AUTO_RETRY_DEFAULT = true;
    exports.MAX_RETRY_DEFAULT = 3;
    exports.RETRY_DELAY_MULTIPLIER_DEFAULT = 2;
    exports.TOTAL_TIMEOUT_DEFAULT = 600;
    exports.MAX_RETRY_DELAY_DEFAULT = 64;
    const IDEMPOTENCY_STRATEGY_DEFAULT = IdempotencyStrategy.RetryConditional;
    const RETRYABLE_ERR_FN_DEFAULT = function(err) {
      var _a;
      const isConnectionProblem = (reason) => {
        return reason.includes("eai_again") || // DNS lookup error
        reason === "econnreset" || reason === "unexpected connection closure" || reason === "epipe" || reason === "socket connection timeout";
      };
      if (err) {
        if ([408, 429, 500, 502, 503, 504].indexOf(err.code) !== -1) {
          return true;
        }
        if (typeof err.code === "string") {
          if (["408", "429", "500", "502", "503", "504"].indexOf(err.code) !== -1) {
            return true;
          }
          const reason = err.code.toLowerCase();
          if (isConnectionProblem(reason)) {
            return true;
          }
        }
        if (err.errors) {
          for (const e of err.errors) {
            const reason = (_a = e === null || e === void 0 ? void 0 : e.reason) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase();
            if (reason && isConnectionProblem(reason)) {
              return true;
            }
          }
        }
      }
      return false;
    };
    exports.RETRYABLE_ERR_FN_DEFAULT = RETRYABLE_ERR_FN_DEFAULT;
    class Storage extends index_js_1.Service {
      getBucketsStream() {
        return new stream_1.Readable();
      }
      getHmacKeysStream() {
        return new stream_1.Readable();
      }
      /**
       * @callback Crc32cGeneratorToStringCallback
       * A method returning the CRC32C as a base64-encoded string.
       *
       * @returns {string}
       *
       * @example
       * Hashing the string 'data' should return 'rth90Q=='
       *
       * ```js
       * const buffer = Buffer.from('data');
       * crc32c.update(buffer);
       * crc32c.toString(); // 'rth90Q=='
       * ```
       **/
      /**
       * @callback Crc32cGeneratorValidateCallback
       * A method validating a base64-encoded CRC32C string.
       *
       * @param {string} [value] base64-encoded CRC32C string to validate
       * @returns {boolean}
       *
       * @example
       * Should return `true` if the value matches, `false` otherwise
       *
       * ```js
       * const buffer = Buffer.from('data');
       * crc32c.update(buffer);
       * crc32c.validate('DkjKuA=='); // false
       * crc32c.validate('rth90Q=='); // true
       * ```
       **/
      /**
       * @callback Crc32cGeneratorUpdateCallback
       * A method for passing `Buffer`s for CRC32C generation.
       *
       * @param {Buffer} [data] data to update CRC32C value with
       * @returns {undefined}
       *
       * @example
       * Hashing buffers from 'some ' and 'text\n'
       *
       * ```js
       * const buffer1 = Buffer.from('some ');
       * crc32c.update(buffer1);
       *
       * const buffer2 = Buffer.from('text\n');
       * crc32c.update(buffer2);
       *
       * crc32c.toString(); // 'DkjKuA=='
       * ```
       **/
      /**
       * @typedef {object} CRC32CValidator
       * @property {Crc32cGeneratorToStringCallback}
       * @property {Crc32cGeneratorValidateCallback}
       * @property {Crc32cGeneratorUpdateCallback}
       */
      /**
       * @callback Crc32cGeneratorCallback
       * @returns {CRC32CValidator}
       */
      /**
       * @typedef {object} StorageOptions
       * @property {string} [projectId] The project ID from the Google Developer's
       *     Console, e.g. 'grape-spaceship-123'. We will also check the environment
       *     variable `GCLOUD_PROJECT` for your project ID. If your app is running
       * in an environment which supports {@link
       * https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application
       * Application Default Credentials}, your project ID will be detected
       * automatically.
       * @property {string} [keyFilename] Full path to the a .json, .pem, or .p12 key
       *     downloaded from the Google Developers Console. If you provide a path to
       * a JSON file, the `projectId` option above is not necessary. NOTE: .pem and
       *     .p12 require you to specify the `email` option as well.
       * @property {string} [email] Account email address. Required when using a .pem
       *     or .p12 keyFilename.
       * @property {object} [credentials] Credentials object.
       * @property {string} [credentials.client_email]
       * @property {string} [credentials.private_key]
       * @property {object} [retryOptions] Options for customizing retries. Retriable server errors
       *     will be retried with exponential delay between them dictated by the formula
       *     max(maxRetryDelay, retryDelayMultiplier*retryNumber) until maxRetries or totalTimeout
       *     has been reached. Retries will only happen if autoRetry is set to true.
       * @property {boolean} [retryOptions.autoRetry=true] Automatically retry requests if the
       *     response is related to rate limits or certain intermittent server
       * errors. We will exponentially backoff subsequent requests by default.
       * @property {number} [retryOptions.retryDelayMultiplier = 2] the multiplier by which to
       *   increase the delay time between the completion of failed requests, and the
       *   initiation of the subsequent retrying request.
       * @property {number} [retryOptions.totalTimeout = 600] The total time, starting from
       *  when the initial request is sent, after which an error will
       *   be returned, regardless of the retrying attempts made meanwhile.
       * @property {number} [retryOptions.maxRetryDelay = 64] The maximum delay time between requests.
       *   When this value is reached, ``retryDelayMultiplier`` will no longer be used to
       *   increase delay time.
       * @property {number} [retryOptions.maxRetries=3] Maximum number of automatic retries
       *     attempted before returning the error.
       * @property {function} [retryOptions.retryableErrorFn] Function that returns true if a given
       *     error should be retried and false otherwise.
       * @property {enum} [retryOptions.idempotencyStrategy=IdempotencyStrategy.RetryConditional] Enumeration
       *     controls how conditionally idempotent operations are retried. Possible values are: RetryAlways -
       *     will respect other retry settings and attempt to retry conditionally idempotent operations. RetryConditional -
       *     will retry conditionally idempotent operations if the correct preconditions are set. RetryNever - never
       *     retry a conditionally idempotent operation.
       * @property {string} [userAgent] The value to be prepended to the User-Agent
       *     header in API requests.
       * @property {object} [authClient] `AuthClient` or `GoogleAuth` client to reuse instead of creating a new one.
       * @property {number} [timeout] The amount of time in milliseconds to wait per http request before timing out.
       * @property {object[]} [interceptors_] Array of custom request interceptors to be returned in the order they were assigned.
       * @property {string} [apiEndpoint = storage.google.com] The API endpoint of the service used to make requests.
       * @property {boolean} [useAuthWithCustomEndpoint = false] Controls whether or not to use authentication when using a custom endpoint.
       * @property {Crc32cGeneratorCallback} [callback] A function that generates a CRC32C Validator. Defaults to {@link CRC32C}
       */
      /**
       * Constructs the Storage client.
       *
       * @example
       * Create a client that uses Application Default Credentials
       * (ADC)
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * ```
       *
       * @example
       * Create a client with explicit credentials
       * ```
       * const storage = new Storage({
       *   projectId: 'your-project-id',
       *   keyFilename: '/path/to/keyfile.json'
       * });
       * ```
       *
       * @example
       * Create a client with credentials passed
       * by value as a JavaScript object
       * ```
       * const storage = new Storage({
       *   projectId: 'your-project-id',
       *   credentials: {
       *     type: 'service_account',
       *     project_id: 'xxxxxxx',
       *     private_key_id: 'xxxx',
       *     private_key:'-----BEGIN PRIVATE KEY-----xxxxxxx\n-----END PRIVATE KEY-----\n',
       *     client_email: 'xxxx',
       *     client_id: 'xxx',
       *     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
       *     token_uri: 'https://oauth2.googleapis.com/token',
       *     auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
       *     client_x509_cert_url: 'xxx',
       *     }
       * });
       * ```
       *
       * @example
       * Create a client with credentials passed
       * by loading a JSON file directly from disk
       * ```
       * const storage = new Storage({
       *   projectId: 'your-project-id',
       *   credentials: require('/path/to-keyfile.json')
       * });
       * ```
       *
       * @example
       * Create a client with an `AuthClient` (e.g. `DownscopedClient`)
       * ```
       * const {DownscopedClient} = require('google-auth-library');
       * const authClient = new DownscopedClient({...});
       *
       * const storage = new Storage({authClient});
       * ```
       *
       * Additional samples:
       * - https://github.com/googleapis/google-auth-library-nodejs#sample-usage-1
       * - https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/downscopedclient.js
       *
       * @param {StorageOptions} [options] Configuration options.
       */
      constructor(options = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const universe = options.universeDomain || google_auth_library_1.DEFAULT_UNIVERSE;
        let apiEndpoint = `https://storage.${universe}`;
        let customEndpoint = false;
        const EMULATOR_HOST = process.env.STORAGE_EMULATOR_HOST;
        if (typeof EMULATOR_HOST === "string") {
          apiEndpoint = Storage.sanitizeEndpoint(EMULATOR_HOST);
          customEndpoint = true;
        }
        if (options.apiEndpoint && options.apiEndpoint !== apiEndpoint) {
          apiEndpoint = Storage.sanitizeEndpoint(options.apiEndpoint);
          customEndpoint = true;
        }
        options = Object.assign({}, options, { apiEndpoint });
        const baseUrl = EMULATOR_HOST || `${options.apiEndpoint}/storage/v1`;
        const config = {
          apiEndpoint: options.apiEndpoint,
          retryOptions: {
            autoRetry: ((_a = options.retryOptions) === null || _a === void 0 ? void 0 : _a.autoRetry) !== void 0 ? (_b = options.retryOptions) === null || _b === void 0 ? void 0 : _b.autoRetry : exports.AUTO_RETRY_DEFAULT,
            maxRetries: ((_c = options.retryOptions) === null || _c === void 0 ? void 0 : _c.maxRetries) ? (_d = options.retryOptions) === null || _d === void 0 ? void 0 : _d.maxRetries : exports.MAX_RETRY_DEFAULT,
            retryDelayMultiplier: ((_e = options.retryOptions) === null || _e === void 0 ? void 0 : _e.retryDelayMultiplier) ? (_f = options.retryOptions) === null || _f === void 0 ? void 0 : _f.retryDelayMultiplier : exports.RETRY_DELAY_MULTIPLIER_DEFAULT,
            totalTimeout: ((_g = options.retryOptions) === null || _g === void 0 ? void 0 : _g.totalTimeout) ? (_h = options.retryOptions) === null || _h === void 0 ? void 0 : _h.totalTimeout : exports.TOTAL_TIMEOUT_DEFAULT,
            maxRetryDelay: ((_j = options.retryOptions) === null || _j === void 0 ? void 0 : _j.maxRetryDelay) ? (_k = options.retryOptions) === null || _k === void 0 ? void 0 : _k.maxRetryDelay : exports.MAX_RETRY_DELAY_DEFAULT,
            retryableErrorFn: ((_l = options.retryOptions) === null || _l === void 0 ? void 0 : _l.retryableErrorFn) ? (_m = options.retryOptions) === null || _m === void 0 ? void 0 : _m.retryableErrorFn : exports.RETRYABLE_ERR_FN_DEFAULT,
            idempotencyStrategy: ((_o = options.retryOptions) === null || _o === void 0 ? void 0 : _o.idempotencyStrategy) !== void 0 ? (_p = options.retryOptions) === null || _p === void 0 ? void 0 : _p.idempotencyStrategy : IDEMPOTENCY_STRATEGY_DEFAULT
          },
          baseUrl,
          customEndpoint,
          useAuthWithCustomEndpoint: options === null || options === void 0 ? void 0 : options.useAuthWithCustomEndpoint,
          projectIdRequired: false,
          scopes: [
            "https://www.googleapis.com/auth/iam",
            "https://www.googleapis.com/auth/cloud-platform",
            "https://www.googleapis.com/auth/devstorage.full_control"
          ],
          packageJson: (0, package_json_helper_cjs_1.getPackageJSON)()
        };
        super(config, options);
        this.acl = Storage.acl;
        this.crc32cGenerator = options.crc32cGenerator || crc32c_js_1.CRC32C_DEFAULT_VALIDATOR_GENERATOR;
        this.retryOptions = config.retryOptions;
        this.getBucketsStream = paginator_1.paginator.streamify("getBuckets");
        this.getHmacKeysStream = paginator_1.paginator.streamify("getHmacKeys");
      }
      static sanitizeEndpoint(url) {
        if (!exports.PROTOCOL_REGEX.test(url)) {
          url = `https://${url}`;
        }
        return url.replace(/\/+$/, "");
      }
      /**
       * Get a reference to a Cloud Storage bucket.
       *
       * @param {string} name Name of the bucket.
       * @param {object} [options] Configuration object.
       * @param {string} [options.kmsKeyName] A Cloud KMS key that will be used to
       *     encrypt objects inserted into this bucket, if no encryption method is
       *     specified.
       * @param {string} [options.userProject] User project to be billed for all
       *     requests made from this Bucket object.
       * @returns {Bucket}
       * @see Bucket
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * const albums = storage.bucket('albums');
       * const photos = storage.bucket('photos');
       * ```
       */
      bucket(name2, options) {
        if (!name2) {
          throw new Error(StorageExceptionMessages.BUCKET_NAME_REQUIRED);
        }
        return new bucket_js_1.Bucket(this, name2, options);
      }
      /**
       * Reference a channel to receive notifications about changes to your bucket.
       *
       * @param {string} id The ID of the channel.
       * @param {string} resourceId The resource ID of the channel.
       * @returns {Channel}
       * @see Channel
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * const channel = storage.channel('id', 'resource-id');
       * ```
       */
      channel(id, resourceId) {
        return new channel_js_1.Channel(this, id, resourceId);
      }
      /**
       * @typedef {array} CreateBucketResponse
       * @property {Bucket} 0 The new {@link Bucket}.
       * @property {object} 1 The full API response.
       */
      /**
       * @callback CreateBucketCallback
       * @param {?Error} err Request error, if any.
       * @param {Bucket} bucket The new {@link Bucket}.
       * @param {object} apiResponse The full API response.
       */
      /**
       * Metadata to set for the bucket.
       *
       * @typedef {object} CreateBucketRequest
       * @property {boolean} [archive=false] Specify the storage class as Archive.
       * @property {object} [autoclass.enabled=false] Specify whether Autoclass is
       *     enabled for the bucket.
       * @property {object} [autoclass.terminalStorageClass='NEARLINE'] The storage class that objects in an Autoclass bucket eventually transition to if
       *     they are not read for a certain length of time. Valid values are NEARLINE and ARCHIVE.
       * @property {boolean} [coldline=false] Specify the storage class as Coldline.
       * @property {Cors[]} [cors=[]] Specify the CORS configuration to use.
       * @property {CustomPlacementConfig} [customPlacementConfig={}] Specify the bucket's regions for dual-region buckets.
       *     For more information, see {@link https://cloud.google.com/storage/docs/locations| Bucket Locations}.
       * @property {boolean} [dra=false] Specify the storage class as Durable Reduced
       *     Availability.
       * @property {boolean} [enableObjectRetention=false] Specify whether or not object retention should be enabled on this bucket.
       * @property {object} [hierarchicalNamespace.enabled=false] Specify whether or not to enable hierarchical namespace on this bucket.
       * @property {string} [location] Specify the bucket's location. If specifying
       *     a dual-region, the `customPlacementConfig` property should be set in conjunction.
       *     For more information, see {@link https://cloud.google.com/storage/docs/locations| Bucket Locations}.
       * @property {boolean} [multiRegional=false] Specify the storage class as
       *     Multi-Regional.
       * @property {boolean} [nearline=false] Specify the storage class as Nearline.
       * @property {boolean} [regional=false] Specify the storage class as Regional.
       * @property {boolean} [requesterPays=false] Force the use of the User Project metadata field to assign operational
       *     costs when an operation is made on a Bucket and its objects.
       * @property {string} [rpo] For dual-region buckets, controls whether turbo
       *      replication is enabled (`ASYNC_TURBO`) or disabled (`DEFAULT`).
       * @property {boolean} [standard=true] Specify the storage class as Standard.
       * @property {string} [storageClass] The new storage class. (`standard`,
       *     `nearline`, `coldline`, or `archive`).
       *     **Note:** The storage classes `multi_regional`, `regional`, and
       *     `durable_reduced_availability` are now legacy and will be deprecated in
       *     the future.
       * @property {Versioning} [versioning=undefined] Specify the versioning status.
       * @property {string} [userProject] The ID of the project which will be billed
       *     for the request.
       */
      /**
       * Create a bucket.
       *
       * Cloud Storage uses a flat namespace, so you can't create a bucket with
       * a name that is already in use. For more information, see
       * {@link https://cloud.google.com/storage/docs/bucketnaming.html#requirements| Bucket Naming Guidelines}.
       *
       * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/insert| Buckets: insert API Documentation}
       * See {@link https://cloud.google.com/storage/docs/storage-classes| Storage Classes}
       *
       * @param {string} name Name of the bucket to create.
       * @param {CreateBucketRequest} [metadata] Metadata to set for the bucket.
       * @param {CreateBucketCallback} [callback] Callback function.
       * @returns {Promise<CreateBucketResponse>}
       * @throws {Error} If a name is not provided.
       * @see Bucket#create
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * const callback = function(err, bucket, apiResponse) {
       *   // `bucket` is a Bucket object.
       * };
       *
       * storage.createBucket('new-bucket', callback);
       *
       * //-
       * // Create a bucket in a specific location and region. <em>See the <a
       * // href="https://cloud.google.com/storage/docs/json_api/v1/buckets/insert">
       * // Official JSON API docs</a> for complete details on the `location`
       * option.
       * // </em>
       * //-
       * const metadata = {
       *   location: 'US-CENTRAL1',
       *   regional: true
       * };
       *
       * storage.createBucket('new-bucket', metadata, callback);
       *
       * //-
       * // Create a bucket with a retention policy of 6 months.
       * //-
       * const metadata = {
       *   retentionPolicy: {
       *     retentionPeriod: 15780000 // 6 months in seconds.
       *   }
       * };
       *
       * storage.createBucket('new-bucket', metadata, callback);
       *
       * //-
       * // Enable versioning on a new bucket.
       * //-
       * const metadata = {
       *   versioning: {
       *     enabled: true
       *   }
       * };
       *
       * storage.createBucket('new-bucket', metadata, callback);
       *
       * //-
       * // If the callback is omitted, we'll return a Promise.
       * //-
       * storage.createBucket('new-bucket').then(function(data) {
       *   const bucket = data[0];
       *   const apiResponse = data[1];
       * });
       *
       * ```
       * @example <caption>include:samples/buckets.js</caption>
       * region_tag:storage_create_bucket
       * Another example:
       */
      createBucket(name2, metadataOrCallback, callback) {
        if (!name2) {
          throw new Error(StorageExceptionMessages.BUCKET_NAME_REQUIRED_CREATE);
        }
        let metadata;
        if (!callback) {
          callback = metadataOrCallback;
          metadata = {};
        } else {
          metadata = metadataOrCallback;
        }
        const body = {
          ...metadata,
          name: name2
        };
        const storageClasses = {
          archive: "ARCHIVE",
          coldline: "COLDLINE",
          dra: "DURABLE_REDUCED_AVAILABILITY",
          multiRegional: "MULTI_REGIONAL",
          nearline: "NEARLINE",
          regional: "REGIONAL",
          standard: "STANDARD"
        };
        const storageClassKeys = Object.keys(storageClasses);
        for (const storageClass of storageClassKeys) {
          if (body[storageClass]) {
            if (metadata.storageClass && metadata.storageClass !== storageClass) {
              throw new Error(`Both \`${storageClass}\` and \`storageClass\` were provided.`);
            }
            body.storageClass = storageClasses[storageClass];
            delete body[storageClass];
          }
        }
        if (body.requesterPays) {
          body.billing = {
            requesterPays: body.requesterPays
          };
          delete body.requesterPays;
        }
        const query = {
          project: this.projectId
        };
        if (body.userProject) {
          query.userProject = body.userProject;
          delete body.userProject;
        }
        if (body.enableObjectRetention) {
          query.enableObjectRetention = body.enableObjectRetention;
          delete body.enableObjectRetention;
        }
        if (body.predefinedAcl) {
          query.predefinedAcl = body.predefinedAcl;
          delete body.predefinedAcl;
        }
        if (body.predefinedDefaultObjectAcl) {
          query.predefinedDefaultObjectAcl = body.predefinedDefaultObjectAcl;
          delete body.predefinedDefaultObjectAcl;
        }
        if (body.projection) {
          query.projection = body.projection;
          delete body.projection;
        }
        this.request({
          method: "POST",
          uri: "/b",
          qs: query,
          json: body
        }, (err, resp) => {
          if (err) {
            callback(err, null, resp);
            return;
          }
          const bucket2 = this.bucket(name2);
          bucket2.metadata = resp;
          callback(null, bucket2, resp);
        });
      }
      /**
       * @typedef {object} CreateHmacKeyOptions
       * @property {string} [projectId] The project ID of the project that owns
       *     the service account of the requested HMAC key. If not provided,
       *     the project ID used to instantiate the Storage client will be used.
       * @property {string} [userProject] This parameter is currently ignored.
       */
      /**
       * @typedef {object} HmacKeyMetadata
       * @property {string} accessId The access id identifies which HMAC key was
       *     used to sign a request when authenticating with HMAC.
       * @property {string} etag Used to perform a read-modify-write of the key.
       * @property {string} id The resource name of the HMAC key.
       * @property {string} projectId The project ID.
       * @property {string} serviceAccountEmail The service account's email this
       *     HMAC key is created for.
       * @property {string} state The state of this HMAC key. One of "ACTIVE",
       *     "INACTIVE" or "DELETED".
       * @property {string} timeCreated The creation time of the HMAC key in
       *     RFC 3339 format.
       * @property {string} [updated] The time this HMAC key was last updated in
       *     RFC 3339 format.
       */
      /**
       * @typedef {array} CreateHmacKeyResponse
       * @property {HmacKey} 0 The HmacKey instance created from API response.
       * @property {string} 1 The HMAC key's secret used to access the XML API.
       * @property {object} 3 The raw API response.
       */
      /**
       * @callback CreateHmacKeyCallback Callback function.
       * @param {?Error} err Request error, if any.
       * @param {HmacKey} hmacKey The HmacKey instance created from API response.
       * @param {string} secret The HMAC key's secret used to access the XML API.
       * @param {object} apiResponse The raw API response.
       */
      /**
       * Create an HMAC key associated with an service account to authenticate
       * requests to the Cloud Storage XML API.
       *
       * See {@link https://cloud.google.com/storage/docs/authentication/hmackeys| HMAC keys documentation}
       *
       * @param {string} serviceAccountEmail The service account's email address
       *     with which the HMAC key is created for.
       * @param {CreateHmacKeyCallback} [callback] Callback function.
       * @return {Promise<CreateHmacKeyResponse>}
       *
       * @example
       * ```
       * const {Storage} = require('google-cloud/storage');
       * const storage = new Storage();
       *
       * // Replace with your service account's email address
       * const serviceAccountEmail =
       *   'my-service-account@appspot.gserviceaccount.com';
       *
       * storage.createHmacKey(serviceAccountEmail, function(err, hmacKey, secret) {
       *   if (!err) {
       *     // Securely store the secret for use with the XML API.
       *   }
       * });
       *
       * //-
       * // If the callback is omitted, we'll return a Promise.
       * //-
       * storage.createHmacKey(serviceAccountEmail)
       *   .then((response) => {
       *     const hmacKey = response[0];
       *     const secret = response[1];
       *     // Securely store the secret for use with the XML API.
       *   });
       * ```
       */
      createHmacKey(serviceAccountEmail, optionsOrCb, cb) {
        if (typeof serviceAccountEmail !== "string") {
          throw new Error(StorageExceptionMessages.HMAC_SERVICE_ACCOUNT);
        }
        const { options, callback } = (0, util_js_1.normalize)(optionsOrCb, cb);
        const query = Object.assign({}, options, { serviceAccountEmail });
        const projectId = query.projectId || this.projectId;
        delete query.projectId;
        this.request({
          method: "POST",
          uri: `/projects/${projectId}/hmacKeys`,
          qs: query,
          maxRetries: 0
          //explicitly set this value since this is a non-idempotent function
        }, (err, resp) => {
          if (err) {
            callback(err, null, null, resp);
            return;
          }
          const metadata = resp.metadata;
          const hmacKey2 = this.hmacKey(metadata.accessId, {
            projectId: metadata.projectId
          });
          hmacKey2.metadata = resp.metadata;
          callback(null, hmacKey2, resp.secret, resp);
        });
      }
      /**
       * Query object for listing buckets.
       *
       * @typedef {object} GetBucketsRequest
       * @property {boolean} [autoPaginate=true] Have pagination handled
       *     automatically.
       * @property {number} [maxApiCalls] Maximum number of API calls to make.
       * @property {number} [maxResults] Maximum number of items plus prefixes to
       *     return per call.
       *     Note: By default will handle pagination automatically
       *     if more than 1 page worth of results are requested per call.
       *     When `autoPaginate` is set to `false` the smaller of `maxResults`
       *     or 1 page of results will be returned per call.
       * @property {string} [pageToken] A previously-returned page token
       *     representing part of the larger set of results to view.
       * @property {string} [userProject] The ID of the project which will be billed
       *     for the request.
       *  @param {boolean} [softDeleted] If true, returns the soft-deleted object.
       *     Object `generation` is required if `softDeleted` is set to True.
       */
      /**
       * @typedef {array} GetBucketsResponse
       * @property {Bucket[]} 0 Array of {@link Bucket} instances.
       * @property {object} 1 nextQuery A query object to receive more results.
       * @property {object} 2 The full API response.
       */
      /**
       * @callback GetBucketsCallback
       * @param {?Error} err Request error, if any.
       * @param {Bucket[]} buckets Array of {@link Bucket} instances.
       * @param {object} nextQuery A query object to receive more results.
       * @param {object} apiResponse The full API response.
       */
      /**
       * Get Bucket objects for all of the buckets in your project.
       *
       * See {@link https://cloud.google.com/storage/docs/json_api/v1/buckets/list| Buckets: list API Documentation}
       *
       * @param {GetBucketsRequest} [query] Query object for listing buckets.
       * @param {GetBucketsCallback} [callback] Callback function.
       * @returns {Promise<GetBucketsResponse>}
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * storage.getBuckets(function(err, buckets) {
       *   if (!err) {
       *     // buckets is an array of Bucket objects.
       *   }
       * });
       *
       * //-
       * // To control how many API requests are made and page through the results
       * // manually, set `autoPaginate` to `false`.
       * //-
       * const callback = function(err, buckets, nextQuery, apiResponse) {
       *   if (nextQuery) {
       *     // More results exist.
       *     storage.getBuckets(nextQuery, callback);
       *   }
       *
       *   // The `metadata` property is populated for you with the metadata at the
       *   // time of fetching.
       *   buckets[0].metadata;
       *
       *   // However, in cases where you are concerned the metadata could have
       *   // changed, use the `getMetadata` method.
       *   buckets[0].getMetadata(function(err, metadata, apiResponse) {});
       * };
       *
       * storage.getBuckets({
       *   autoPaginate: false
       * }, callback);
       *
       * //-
       * // If the callback is omitted, we'll return a Promise.
       * //-
       * storage.getBuckets().then(function(data) {
       *   const buckets = data[0];
       * });
       *
       * ```
       * @example <caption>include:samples/buckets.js</caption>
       * region_tag:storage_list_buckets
       * Another example:
       */
      getBuckets(optionsOrCallback, cb) {
        const { options, callback } = (0, util_js_1.normalize)(optionsOrCallback, cb);
        options.project = options.project || this.projectId;
        this.request({
          uri: "/b",
          qs: options
        }, (err, resp) => {
          if (err) {
            callback(err, null, null, resp);
            return;
          }
          const itemsArray = resp.items ? resp.items : [];
          const unreachableArray = resp.unreachable ? resp.unreachable : [];
          const buckets = itemsArray.map((bucket2) => {
            const bucketInstance = this.bucket(bucket2.id);
            bucketInstance.metadata = bucket2;
            return bucketInstance;
          });
          if (unreachableArray.length > 0) {
            unreachableArray.forEach((fullPath) => {
              const name2 = fullPath.split("/").pop();
              if (name2) {
                const placeholder = this.bucket(name2);
                placeholder.unreachable = true;
                placeholder.metadata = {};
                buckets.push(placeholder);
              }
            });
          }
          const nextQuery = resp.nextPageToken ? Object.assign({}, options, { pageToken: resp.nextPageToken }) : null;
          callback(null, buckets, nextQuery, resp);
        });
      }
      getHmacKeys(optionsOrCb, cb) {
        const { options, callback } = (0, util_js_1.normalize)(optionsOrCb, cb);
        const query = Object.assign({}, options);
        const projectId = query.projectId || this.projectId;
        delete query.projectId;
        this.request({
          uri: `/projects/${projectId}/hmacKeys`,
          qs: query
        }, (err, resp) => {
          if (err) {
            callback(err, null, null, resp);
            return;
          }
          const itemsArray = resp.items ? resp.items : [];
          const hmacKeys = itemsArray.map((hmacKey2) => {
            const hmacKeyInstance = this.hmacKey(hmacKey2.accessId, {
              projectId: hmacKey2.projectId
            });
            hmacKeyInstance.metadata = hmacKey2;
            return hmacKeyInstance;
          });
          const nextQuery = resp.nextPageToken ? Object.assign({}, options, { pageToken: resp.nextPageToken }) : null;
          callback(null, hmacKeys, nextQuery, resp);
        });
      }
      /**
       * @typedef {array} GetServiceAccountResponse
       * @property {object} 0 The service account resource.
       * @property {object} 1 The full
       * {@link https://cloud.google.com/storage/docs/json_api/v1/projects/serviceAccount#resource| API response}.
       */
      /**
       * @callback GetServiceAccountCallback
       * @param {?Error} err Request error, if any.
       * @param {object} serviceAccount The serviceAccount resource.
       * @param {string} serviceAccount.emailAddress The service account email
       *     address.
       * @param {object} apiResponse The full
       * {@link https://cloud.google.com/storage/docs/json_api/v1/projects/serviceAccount#resource| API response}.
       */
      /**
       * Get the email address of this project's Google Cloud Storage service
       * account.
       *
       * See {@link https://cloud.google.com/storage/docs/json_api/v1/projects/serviceAccount/get| Projects.serviceAccount: get API Documentation}
       * See {@link https://cloud.google.com/storage/docs/json_api/v1/projects/serviceAccount#resource| Projects.serviceAccount Resource}
       *
       * @param {object} [options] Configuration object.
       * @param {string} [options.userProject] User project to be billed for this
       *     request.
       * @param {GetServiceAccountCallback} [callback] Callback function.
       * @returns {Promise<GetServiceAccountResponse>}
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       *
       * storage.getServiceAccount(function(err, serviceAccount, apiResponse) {
       *   if (!err) {
       *     const serviceAccountEmail = serviceAccount.emailAddress;
       *   }
       * });
       *
       * //-
       * // If the callback is omitted, we'll return a Promise.
       * //-
       * storage.getServiceAccount().then(function(data) {
       *   const serviceAccountEmail = data[0].emailAddress;
       *   const apiResponse = data[1];
       * });
       * ```
       */
      getServiceAccount(optionsOrCallback, cb) {
        const { options, callback } = (0, util_js_1.normalize)(optionsOrCallback, cb);
        this.request({
          uri: `/projects/${this.projectId}/serviceAccount`,
          qs: options
        }, (err, resp) => {
          if (err) {
            callback(err, null, resp);
            return;
          }
          const camelCaseResponse = {};
          for (const prop in resp) {
            if (resp.hasOwnProperty(prop)) {
              const camelCaseProp = prop.replace(/_(\w)/g, (_, match) => match.toUpperCase());
              camelCaseResponse[camelCaseProp] = resp[prop];
            }
          }
          callback(null, camelCaseResponse, resp);
        });
      }
      /**
       * Get a reference to an HmacKey object.
       * Note: this does not fetch the HMAC key's metadata. Use HmacKey#get() to
       * retrieve and populate the metadata.
       *
       * To get a reference to an HMAC key that's not created for a service
       * account in the same project used to instantiate the Storage client,
       * supply the project's ID as `projectId` in the `options` argument.
       *
       * @param {string} accessId The HMAC key's access ID.
       * @param {HmacKeyOptions} options HmacKey constructor options.
       * @returns {HmacKey}
       * @see HmacKey
       *
       * @example
       * ```
       * const {Storage} = require('@google-cloud/storage');
       * const storage = new Storage();
       * const hmacKey = storage.hmacKey('ACCESS_ID');
       * ```
       */
      hmacKey(accessId, options) {
        if (!accessId) {
          throw new Error(StorageExceptionMessages.HMAC_ACCESS_ID);
        }
        return new hmacKey_js_1.HmacKey(this, accessId, options);
      }
    }
    exports.Storage = Storage;
    Storage.Bucket = bucket_js_1.Bucket;
    Storage.Channel = channel_js_1.Channel;
    Storage.File = file_js_1.File;
    Storage.HmacKey = hmacKey_js_1.HmacKey;
    Storage.acl = {
      OWNER_ROLE: "OWNER",
      READER_ROLE: "READER",
      WRITER_ROLE: "WRITER"
    };
    paginator_1.paginator.extend(Storage, ["getBuckets", "getHmacKeys"]);
    (0, promisify_1.promisifyAll)(Storage, {
      exclude: ["bucket", "channel", "hmacKey"]
    });
  })(storage);
  return storage;
}
var transferManager = {};
var hasRequiredTransferManager;
function requireTransferManager() {
  if (hasRequiredTransferManager) return transferManager;
  hasRequiredTransferManager = 1;
  var __createBinding = transferManager && transferManager.__createBinding || (Object.create ? (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  }) : (function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  }));
  var __setModuleDefault = transferManager && transferManager.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = transferManager && transferManager.__importStar || /* @__PURE__ */ (function() {
    var ownKeys = function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    };
    return function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
      }
      __setModuleDefault(result, mod);
      return result;
    };
  })();
  var __classPrivateFieldGet = transferManager && transferManager.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __importDefault = transferManager && transferManager.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _XMLMultiPartUploadHelper_instances, _XMLMultiPartUploadHelper_setGoogApiClientHeaders, _XMLMultiPartUploadHelper_handleErrorResponse;
  Object.defineProperty(transferManager, "__esModule", { value: true });
  transferManager.TransferManager = transferManager.MultiPartUploadError = void 0;
  const file_js_1 = requireFile();
  const p_limit_1 = __importDefault(requirePLimit());
  const path = __importStar(require$$5);
  const fs_1 = require$$0$4;
  const crc32c_js_1 = requireCrc32c();
  const google_auth_library_1 = requireSrc$2();
  const fast_xml_parser_1 = /* @__PURE__ */ requireFxp();
  const async_retry_1 = __importDefault(requireLib());
  const crypto_1 = require$$0$2;
  const util_js_1 = requireUtil();
  const util_js_2 = requireUtil$1();
  const package_json_helper_cjs_1 = requirePackageJsonHelper();
  const packageJson = (0, package_json_helper_cjs_1.getPackageJSON)();
  const DEFAULT_PARALLEL_UPLOAD_LIMIT = 5;
  const DEFAULT_PARALLEL_DOWNLOAD_LIMIT = 5;
  const DEFAULT_PARALLEL_CHUNKED_DOWNLOAD_LIMIT = 5;
  const DOWNLOAD_IN_CHUNKS_FILE_SIZE_THRESHOLD = 32 * 1024 * 1024;
  const DOWNLOAD_IN_CHUNKS_DEFAULT_CHUNK_SIZE = 32 * 1024 * 1024;
  const UPLOAD_IN_CHUNKS_DEFAULT_CHUNK_SIZE = 32 * 1024 * 1024;
  const DEFAULT_PARALLEL_CHUNKED_UPLOAD_LIMIT = 5;
  const EMPTY_REGEX = "(?:)";
  const GCCL_GCS_CMD_FEATURE = {
    UPLOAD_MANY: "tm.upload_many",
    DOWNLOAD_MANY: "tm.download_many",
    UPLOAD_SHARDED: "tm.upload_sharded",
    DOWNLOAD_SHARDED: "tm.download_sharded"
  };
  const defaultMultiPartGenerator = (bucket2, fileName, uploadId, partsMap) => {
    return new XMLMultiPartUploadHelper(bucket2, fileName, uploadId, partsMap);
  };
  class MultiPartUploadError extends Error {
    constructor(message, uploadId, partsMap) {
      super(message);
      this.uploadId = uploadId;
      this.partsMap = partsMap;
    }
  }
  transferManager.MultiPartUploadError = MultiPartUploadError;
  class XMLMultiPartUploadHelper {
    constructor(bucket2, fileName, uploadId, partsMap) {
      _XMLMultiPartUploadHelper_instances.add(this);
      this.authClient = bucket2.storage.authClient || new google_auth_library_1.GoogleAuth();
      this.uploadId = uploadId || "";
      this.bucket = bucket2;
      this.fileName = fileName;
      this.baseUrl = `https://${bucket2.name}.${new URL(this.bucket.storage.apiEndpoint).hostname}/${fileName}`;
      this.xmlBuilder = new fast_xml_parser_1.XMLBuilder({ arrayNodeName: "Part" });
      this.xmlParser = new fast_xml_parser_1.XMLParser();
      this.partsMap = partsMap || /* @__PURE__ */ new Map();
      this.retryOptions = {
        retries: this.bucket.storage.retryOptions.maxRetries,
        factor: this.bucket.storage.retryOptions.retryDelayMultiplier,
        maxTimeout: this.bucket.storage.retryOptions.maxRetryDelay * 1e3,
        maxRetryTime: this.bucket.storage.retryOptions.totalTimeout * 1e3
      };
    }
    /**
     * Initiates a multipart upload (MPU) to the XML API and stores the resultant upload id.
     *
     * @returns {Promise<void>}
     */
    async initiateUpload(headers = {}) {
      const url = `${this.baseUrl}?uploads`;
      return (0, async_retry_1.default)(async (bail) => {
        try {
          const res = await this.authClient.request({
            headers: __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_setGoogApiClientHeaders).call(this, headers),
            method: "POST",
            url
          });
          if (res.data && res.data.error) {
            throw res.data.error;
          }
          const parsedXML = this.xmlParser.parse(res.data);
          this.uploadId = parsedXML.InitiateMultipartUploadResult.UploadId;
        } catch (e) {
          __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_handleErrorResponse).call(this, e, bail);
        }
      }, this.retryOptions);
    }
    /**
     * Uploads the provided chunk of data to the XML API using the previously created upload id.
     *
     * @param {number} partNumber the sequence number of this chunk.
     * @param {Buffer} chunk the chunk of data to be uploaded.
     * @param {string | false} validation whether or not to include the md5 hash in the headers to cause the server
     * to validate the chunk was not corrupted.
     * @returns {Promise<void>}
     */
    async uploadPart(partNumber, chunk, validation) {
      const url = `${this.baseUrl}?partNumber=${partNumber}&uploadId=${this.uploadId}`;
      let headers = __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_setGoogApiClientHeaders).call(this);
      if (validation === "md5") {
        const hash = (0, crypto_1.createHash)("md5").update(chunk).digest("base64");
        headers = {
          "Content-MD5": hash
        };
      } else if (validation === "crc32c") {
        const crc = new crc32c_js_1.CRC32C();
        crc.update(chunk);
        headers["x-goog-hash"] = `crc32c=${crc.toString()}`;
      }
      return (0, async_retry_1.default)(async (bail) => {
        try {
          const res = await this.authClient.request({
            url,
            method: "PUT",
            body: chunk,
            headers
          });
          if (res.data && res.data.error) {
            throw res.data.error;
          }
          this.partsMap.set(partNumber, res.headers["etag"]);
        } catch (e) {
          __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_handleErrorResponse).call(this, e, bail);
        }
      }, this.retryOptions);
    }
    /**
     * Sends the final request of the MPU to tell GCS the upload is now complete.
     *
     * @returns {Promise<void>}
     */
    async completeUpload() {
      const url = `${this.baseUrl}?uploadId=${this.uploadId}`;
      const sortedMap = new Map([...this.partsMap.entries()].sort((a, b) => a[0] - b[0]));
      const parts = [];
      for (const entry of sortedMap.entries()) {
        parts.push({ PartNumber: entry[0], ETag: entry[1] });
      }
      const body = `<CompleteMultipartUpload>${this.xmlBuilder.build(parts)}</CompleteMultipartUpload>`;
      return (0, async_retry_1.default)(async (bail) => {
        try {
          const res = await this.authClient.request({
            headers: __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_setGoogApiClientHeaders).call(this),
            url,
            method: "POST",
            body
          });
          if (res.data && res.data.error) {
            throw res.data.error;
          }
          return res;
        } catch (e) {
          __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_handleErrorResponse).call(this, e, bail);
          return;
        }
      }, this.retryOptions);
    }
    /**
     * Aborts an multipart upload that is in progress. Once aborted, any parts in the process of being uploaded fail,
     * and future requests using the upload ID fail.
     *
     * @returns {Promise<void>}
     */
    async abortUpload() {
      const url = `${this.baseUrl}?uploadId=${this.uploadId}`;
      return (0, async_retry_1.default)(async (bail) => {
        try {
          const res = await this.authClient.request({
            url,
            method: "DELETE"
          });
          if (res.data && res.data.error) {
            throw res.data.error;
          }
        } catch (e) {
          __classPrivateFieldGet(this, _XMLMultiPartUploadHelper_instances, "m", _XMLMultiPartUploadHelper_handleErrorResponse).call(this, e, bail);
          return;
        }
      }, this.retryOptions);
    }
  }
  _XMLMultiPartUploadHelper_instances = /* @__PURE__ */ new WeakSet(), _XMLMultiPartUploadHelper_setGoogApiClientHeaders = function _XMLMultiPartUploadHelper_setGoogApiClientHeaders2(headers = {}) {
    let headerFound = false;
    let userAgentFound = false;
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLocaleLowerCase().trim() === "x-goog-api-client") {
        headerFound = true;
        if (!value.includes(GCCL_GCS_CMD_FEATURE.UPLOAD_SHARDED)) {
          headers[key] = `${value} gccl-gcs-cmd/${GCCL_GCS_CMD_FEATURE.UPLOAD_SHARDED}`;
        }
      } else if (key.toLocaleLowerCase().trim() === "user-agent") {
        userAgentFound = true;
      }
    }
    if (!headerFound) {
      headers["x-goog-api-client"] = `${(0, util_js_2.getRuntimeTrackingString)()} gccl/${packageJson.version} gccl-gcs-cmd/${GCCL_GCS_CMD_FEATURE.UPLOAD_SHARDED}`;
    }
    if (!userAgentFound) {
      headers["User-Agent"] = (0, util_js_2.getUserAgentString)();
    }
    return headers;
  }, _XMLMultiPartUploadHelper_handleErrorResponse = function _XMLMultiPartUploadHelper_handleErrorResponse2(err, bail) {
    if (this.bucket.storage.retryOptions.autoRetry && this.bucket.storage.retryOptions.retryableErrorFn(err)) {
      throw err;
    } else {
      bail(err);
    }
  };
  class TransferManager {
    constructor(bucket2) {
      this.bucket = bucket2;
    }
    /**
     * @typedef {object} UploadManyFilesOptions
     * @property {number} [concurrencyLimit] The number of concurrently executing promises
     * to use when uploading the files.
     * @property {Function} [customDestinationBuilder] A function that will take the current path of a local file
     * and return a string representing a custom path to be used to upload the file to GCS.
     * @property {boolean} [skipIfExists] Do not upload the file if it already exists in
     * the bucket. This will set the precondition ifGenerationMatch = 0.
     * @property {string} [prefix] A prefix to append to all of the uploaded files.
     * @property {object} [passthroughOptions] {@link UploadOptions} Options to be passed through
     * to each individual upload operation.
     *
     */
    /**
     * Upload multiple files in parallel to the bucket. This is a convenience method
     * that utilizes {@link Bucket#upload} to perform the upload.
     *
     * @param {array | string} [filePathsOrDirectory] An array of fully qualified paths to the files or a directory name.
     * If a directory name is provided, the directory will be recursively walked and all files will be added to the upload list.
     * to be uploaded to the bucket
     * @param {UploadManyFilesOptions} [options] Configuration options.
     * @returns {Promise<UploadResponse[]>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const transferManager = new TransferManager(bucket);
     *
     * //-
     * // Upload multiple files in parallel.
     * //-
     * const response = await transferManager.uploadManyFiles(['/local/path/file1.txt, 'local/path/file2.txt']);
     * // Your bucket now contains:
     * // - "local/path/file1.txt" (with the contents of '/local/path/file1.txt')
     * // - "local/path/file2.txt" (with the contents of '/local/path/file2.txt')
     * const response = await transferManager.uploadManyFiles('/local/directory');
     * // Your bucket will now contain all files contained in '/local/directory' maintaining the subdirectory structure.
     * ```
     *
     */
    async uploadManyFiles(filePathsOrDirectory, options = {}) {
      var _a;
      if (options.skipIfExists && ((_a = options.passthroughOptions) === null || _a === void 0 ? void 0 : _a.preconditionOpts)) {
        options.passthroughOptions.preconditionOpts.ifGenerationMatch = 0;
      } else if (options.skipIfExists && options.passthroughOptions === void 0) {
        options.passthroughOptions = {
          preconditionOpts: {
            ifGenerationMatch: 0
          }
        };
      }
      const limit = (0, p_limit_1.default)(options.concurrencyLimit || DEFAULT_PARALLEL_UPLOAD_LIMIT);
      const promises = [];
      let allPaths = [];
      if (!Array.isArray(filePathsOrDirectory)) {
        for await (const curPath of this.getPathsFromDirectory(filePathsOrDirectory)) {
          allPaths.push(curPath);
        }
      } else {
        allPaths = filePathsOrDirectory;
      }
      for (const filePath of allPaths) {
        const stat = await fs_1.promises.lstat(filePath);
        if (stat.isDirectory()) {
          continue;
        }
        const passThroughOptionsCopy = {
          ...options.passthroughOptions,
          [util_js_1.GCCL_GCS_CMD_KEY]: GCCL_GCS_CMD_FEATURE.UPLOAD_MANY
        };
        passThroughOptionsCopy.destination = options.customDestinationBuilder ? options.customDestinationBuilder(filePath, options) : filePath.split(path.sep).join(path.posix.sep);
        if (options.prefix) {
          passThroughOptionsCopy.destination = path.posix.join(...options.prefix.split(path.sep), passThroughOptionsCopy.destination);
        }
        promises.push(limit(() => this.bucket.upload(filePath, passThroughOptionsCopy)));
      }
      return Promise.all(promises);
    }
    /**
     * @typedef {object} DownloadManyFilesOptions
     * @property {number} [concurrencyLimit] The number of concurrently executing promises
     * to use when downloading the files.
     * @property {string} [prefix] A prefix to append to all of the downloaded files.
     * @property {string} [stripPrefix] A prefix to remove from all of the downloaded files.
     * @property {object} [passthroughOptions] {@link DownloadOptions} Options to be passed through
     * to each individual download operation.
     * @property {boolean} [skipIfExists] Do not download the file if it already exists in
     * the destination.
     *
     */
    /**
     * Download multiple files in parallel to the local filesystem. This is a convenience method
     * that utilizes {@link File#download} to perform the download.
     *
     * @param {array | string} [filesOrFolder] An array of file name strings or file objects to be downloaded. If
     * a string is provided this will be treated as a GCS prefix and all files with that prefix will be downloaded.
     * @param {DownloadManyFilesOptions} [options] Configuration options. Setting options.prefix or options.stripPrefix
     * or options.passthroughOptions.destination will cause the downloaded files to be written to the file system
     * instead of being returned as a buffer.
     * @returns {Promise<DownloadResponse[]>}
     *
     * @behavior
     * **Return shape change (breaking/observable behavior):**
     * - Previously, the returned array only contained entries for files that were successfully downloaded.
     * - This meant the response length could be smaller than the number of requested input files.
     * - Now, the returned array always has the same length and ordering as the input file list.
     * - Each index in the response corresponds directly to the same index in the input.
     * - Files that are skipped or fail will still have an entry in the result with:
     *   - `skipped = true`
     *   - `reason` populated with a {@link SkipReason}
     *
     * **New guarantees:**
     * - Response length === number of requested files
     * - Stable positional mapping between input and output
     * - All outcomes (success, skipped, error) are explicitly represented
     *
     * @security
     * **Path traversal protection (new):**
     * - File paths are resolved relative to the configured destination directory.
     * - Any file whose resolved path escapes the base destination directory is rejected.
     * - This prevents directory traversal attacks (e.g. `../../etc/passwd`).
     * - Such files are not downloaded and instead return:
     *   - `skipped = true`
     *   - `reason = SkipReason.PATH_TRAVERSAL`
     *
     * **Additional validation:**
     * - File names containing illegal drive prefixes (e.g. `C:\`) are skipped
     * to prevent unintended writes on host systems.
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const transferManager = new TransferManager(bucket);
     *
     * //-
     * // Download multiple files in parallel.
     * //-
     * const response = await transferManager.downloadManyFiles(['file1.txt', 'file2.txt']);
     * // The following files have been downloaded:
     * // - "file1.txt" (with the contents from my-bucket.file1.txt)
     * // - "file2.txt" (with the contents from my-bucket.file2.txt)
     * // response.length === 2 (always matches input length)
     * // Each entry corresponds to the respective input file
     * const response = await transferManager.downloadManyFiles([bucket.File('file1.txt'), bucket.File('file2.txt')]);
     * // The following files have been downloaded:
     * // - "file1.txt" (with the contents from my-bucket.file1.txt)
     * // - "file2.txt" (with the contents from my-bucket.file2.txt)
     * const response = await transferManager.downloadManyFiles('test-folder');
     * // All files with GCS prefix of 'test-folder' have been processed.
     * // Skipped or failed files are still included in the response.
     * ```
     *
     */
    async downloadManyFiles(filesOrFolder, options = {}) {
      var _a;
      const limit = (0, p_limit_1.default)(options.concurrencyLimit || DEFAULT_PARALLEL_DOWNLOAD_LIMIT);
      const promises = [];
      let files2 = [];
      const baseDestination = path.resolve(((_a = options.passthroughOptions) === null || _a === void 0 ? void 0 : _a.destination) || ".");
      if (!Array.isArray(filesOrFolder)) {
        const directoryFiles = await this.bucket.getFiles({
          prefix: filesOrFolder
        });
        files2 = directoryFiles[0];
      } else {
        files2 = filesOrFolder.map((curFile) => {
          if (typeof curFile === "string") {
            return this.bucket.file(curFile);
          }
          return curFile;
        });
      }
      const stripRegexString = options.stripPrefix ? `^${options.stripPrefix}` : EMPTY_REGEX;
      const regex = new RegExp(stripRegexString, "g");
      const finalResults = new Array(files2.length);
      for (let i = 0; i < files2.length; i++) {
        const file2 = files2[i];
        const hasIllegalDrive = /^[a-zA-Z]:/.test(file2.name);
        if (hasIllegalDrive) {
          const skippedResult = [Buffer.alloc(0)];
          skippedResult.skipped = true;
          skippedResult.reason = file_js_1.SkipReason.ILLEGAL_CHARACTER;
          skippedResult.fileName = file2.name;
          finalResults[i] = skippedResult;
          continue;
        }
        const fileName = options.stripPrefix ? file2.name.replace(regex, "") : file2.name;
        const dest = fileName.replace(/^[\\/]+/, "");
        const resolvedPath = path.resolve(baseDestination, dest);
        const relativeFromBase = path.relative(baseDestination, resolvedPath);
        const isOutside = path.isAbsolute(relativeFromBase) || relativeFromBase.split(/[\\/]/).includes("..");
        if (isOutside) {
          const skippedResult = [Buffer.alloc(0)];
          skippedResult.skipped = true;
          skippedResult.reason = file_js_1.SkipReason.PATH_TRAVERSAL;
          skippedResult.fileName = file2.name;
          skippedResult.localPath = resolvedPath;
          finalResults[i] = skippedResult;
          continue;
        }
        if (options.skipIfExists && (0, fs_1.existsSync)(resolvedPath)) {
          const skippedResult = [Buffer.alloc(0)];
          skippedResult.skipped = true;
          skippedResult.reason = file_js_1.SkipReason.ALREADY_EXISTS;
          skippedResult.fileName = file2.name;
          skippedResult.localPath = resolvedPath;
          finalResults[i] = skippedResult;
          continue;
        }
        promises.push(limit(async () => {
          const passThroughOptionsCopy = {
            ...options.passthroughOptions,
            destination: resolvedPath,
            [util_js_1.GCCL_GCS_CMD_KEY]: GCCL_GCS_CMD_FEATURE.DOWNLOAD_MANY
          };
          try {
            const destination = passThroughOptionsCopy.destination;
            if (destination.endsWith(path.sep) || destination.endsWith("/")) {
              await fs_1.promises.mkdir(destination, { recursive: true });
              const dirResp = [Buffer.alloc(0)];
              dirResp.skipped = false;
              dirResp.fileName = file2.name;
              dirResp.localPath = destination;
              finalResults[i] = dirResp;
              return;
            }
            await fs_1.promises.mkdir(path.dirname(destination), { recursive: true });
            const resp = await file2.download(passThroughOptionsCopy);
            finalResults[i] = {
              ...resp,
              skipped: false,
              fileName: file2.name,
              localPath: destination
            };
          } catch (err) {
            const errorResp = [Buffer.alloc(0)];
            errorResp.skipped = true;
            errorResp.reason = file_js_1.SkipReason.DOWNLOAD_ERROR;
            errorResp.fileName = file2.name;
            errorResp.localPath = resolvedPath;
            errorResp.error = err;
            finalResults[i] = errorResp;
          }
        }));
      }
      await Promise.all(promises);
      return finalResults;
    }
    /**
     * @typedef {object} DownloadFileInChunksOptions
     * @property {number} [concurrencyLimit] The number of concurrently executing promises
     * to use when downloading the file.
     * @property {number} [chunkSizeBytes] The size in bytes of each chunk to be downloaded.
     * @property {'crc32c' | boolean} [validation] Whether or not to perform a CRC32C validation check when download is complete. Defaults to 'crc32c'.
     * @property {boolean} [noReturnData] Whether or not to return the downloaded data. A `true` value here would be useful for files with a size that will not fit into memory.
     *
     */
    /**
     * Download a large file in chunks utilizing parallel download operations. This is a convenience method
     * that utilizes {@link File#download} to perform the download.
     *
     * @param {File | string} fileOrName {@link File} to download.
     * @param {DownloadFileInChunksOptions} [options] Configuration options.
     * @returns {Promise<void | DownloadResponse>}
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const transferManager = new TransferManager(bucket);
     *
     * //-
     * // Download a large file in chunks utilizing parallel operations.
     * // CRC32C validation is performed by default.
     * //-
     * const response = await transferManager.downloadFileInChunks(bucket.file('large-file.txt');
     * // Your local directory now contains:
     * // - "large-file.txt" (with the contents from my-bucket.large-file.txt)
     *
     * //-
     * // To disable validation:
     * //-
     * const responseWithoutValidation = await transferManager.downloadFileInChunks(
     *   bucket.file('large-file.txt'),
     *   { validation: false }
     * );
     * ```
     *
     */
    async downloadFileInChunks(fileOrName, options = {}) {
      let chunkSize = options.chunkSizeBytes || DOWNLOAD_IN_CHUNKS_DEFAULT_CHUNK_SIZE;
      let limit = (0, p_limit_1.default)(options.concurrencyLimit || DEFAULT_PARALLEL_CHUNKED_DOWNLOAD_LIMIT);
      const noReturnData = Boolean(options.noReturnData);
      const promises = [];
      const file2 = typeof fileOrName === "string" ? this.bucket.file(fileOrName) : fileOrName;
      const validation = options.validation === void 0 || options.validation === true ? "crc32c" : options.validation;
      const fileInfo = await file2.get();
      const size = parseInt(fileInfo[0].metadata.size.toString());
      if (size < DOWNLOAD_IN_CHUNKS_FILE_SIZE_THRESHOLD) {
        limit = (0, p_limit_1.default)(1);
        chunkSize = size;
      }
      let start = 0;
      const filePath = options.destination || path.basename(file2.name);
      const fileToWrite = await fs_1.promises.open(filePath, "w");
      while (start < size) {
        const chunkStart = start;
        let chunkEnd = start + chunkSize - 1;
        chunkEnd = chunkEnd > size ? size : chunkEnd;
        promises.push(limit(async () => {
          const resp = await file2.download({
            start: chunkStart,
            end: chunkEnd,
            [util_js_1.GCCL_GCS_CMD_KEY]: GCCL_GCS_CMD_FEATURE.DOWNLOAD_SHARDED,
            validation: false
            // Disable validation on individual chunks
          });
          const result = await fileToWrite.write(resp[0], 0, resp[0].length, chunkStart);
          if (noReturnData)
            return;
          return result.buffer;
        }));
        start += chunkSize;
      }
      let chunks;
      try {
        chunks = await Promise.all(promises);
      } finally {
        await fileToWrite.close();
      }
      if (validation === "crc32c" && fileInfo[0].metadata.crc32c) {
        const downloadedCrc32C = await crc32c_js_1.CRC32C.fromFile(filePath);
        if (!downloadedCrc32C.validate(fileInfo[0].metadata.crc32c)) {
          const mismatchError = new file_js_1.RequestError(file_js_1.FileExceptionMessages.DOWNLOAD_MISMATCH);
          mismatchError.code = "CONTENT_DOWNLOAD_MISMATCH";
          throw mismatchError;
        }
      }
      if (noReturnData)
        return;
      return [Buffer.concat(chunks, size)];
    }
    /**
     * @typedef {object} UploadFileInChunksOptions
     * @property {number} [concurrencyLimit] The number of concurrently executing promises
     * to use when uploading the file.
     * @property {number} [chunkSizeBytes] The size in bytes of each chunk to be uploaded.
     * @property {string} [uploadName] Name of the file when saving to GCS. If omitted the name is taken from the file path.
     * @property {number} [maxQueueSize] The number of chunks to be uploaded to hold in memory concurrently. If not specified
     * defaults to the specified concurrency limit.
     * @property {string} [uploadId] If specified attempts to resume a previous upload.
     * @property {Map} [partsMap] If specified alongside uploadId, attempts to resume a previous upload from the last chunk
     * specified in partsMap
     * @property {object} [headers] headers to be sent when initiating the multipart upload.
     * See {@link https://cloud.google.com/storage/docs/xml-api/post-object-multipart#request_headers| Request Headers: Initiate a Multipart Upload}
     * @property {boolean} [autoAbortFailure] boolean to indicate if an in progress upload session will be automatically aborted upon failure. If not set,
     * failures will be automatically aborted.
     *
     */
    /**
     * Upload a large file in chunks utilizing parallel upload operations. If the upload fails, an uploadId and
     * map containing all the successfully uploaded parts will be returned to the caller. These arguments can be used to
     * resume the upload.
     *
     * @param {string} [filePath] The path of the file to be uploaded
     * @param {UploadFileInChunksOptions} [options] Configuration options.
     * @param {MultiPartHelperGenerator} [generator] A function that will return a type that implements the MPU interface. Most users will not need to use this.
     * @returns {Promise<void>} If successful a promise resolving to void, otherwise a error containing the message, uploadId, and parts map.
     *
     * @example
     * ```
     * const {Storage} = require('@google-cloud/storage');
     * const storage = new Storage();
     * const bucket = storage.bucket('my-bucket');
     * const transferManager = new TransferManager(bucket);
     *
     * //-
     * // Upload a large file in chunks utilizing parallel operations.
     * //-
     * const response = await transferManager.uploadFileInChunks('large-file.txt');
     * // Your bucket now contains:
     * // - "large-file.txt"
     * ```
     *
     *
     */
    async uploadFileInChunks(filePath, options = {}, generator = defaultMultiPartGenerator) {
      var _a;
      const chunkSize = options.chunkSizeBytes || UPLOAD_IN_CHUNKS_DEFAULT_CHUNK_SIZE;
      const limit = (0, p_limit_1.default)(options.concurrencyLimit || DEFAULT_PARALLEL_CHUNKED_UPLOAD_LIMIT);
      const maxQueueSize = options.maxQueueSize || options.concurrencyLimit || DEFAULT_PARALLEL_CHUNKED_UPLOAD_LIMIT;
      const fileName = options.uploadName || path.basename(filePath);
      const mpuHelper = generator(this.bucket, fileName, options.uploadId, options.partsMap);
      let partNumber = 1;
      let promises = [];
      const validation = (_a = options.validation) !== null && _a !== void 0 ? _a : "crc32c";
      try {
        if (options.uploadId === void 0) {
          await mpuHelper.initiateUpload(options.headers);
        }
        const startOrResumptionByte = mpuHelper.partsMap.size * chunkSize;
        const readStream = (0, fs_1.createReadStream)(filePath, {
          highWaterMark: chunkSize,
          start: startOrResumptionByte
        });
        for await (const curChunk of readStream) {
          if (promises.length >= maxQueueSize) {
            await Promise.all(promises);
            promises = [];
          }
          promises.push(limit(() => mpuHelper.uploadPart(partNumber++, curChunk, validation)));
        }
        await Promise.all(promises);
        return await mpuHelper.completeUpload();
      } catch (e) {
        if ((options.autoAbortFailure === void 0 || options.autoAbortFailure) && mpuHelper.uploadId) {
          try {
            await mpuHelper.abortUpload();
            return;
          } catch (e2) {
            throw new MultiPartUploadError(e2.message, mpuHelper.uploadId, mpuHelper.partsMap);
          }
        }
        throw new MultiPartUploadError(e.message, mpuHelper.uploadId, mpuHelper.partsMap);
      }
    }
    async *getPathsFromDirectory(directory) {
      const filesAndSubdirectories = await fs_1.promises.readdir(directory, {
        withFileTypes: true
      });
      for (const curFileOrDirectory of filesAndSubdirectories) {
        const fullPath = path.join(directory, curFileOrDirectory.name);
        curFileOrDirectory.isDirectory() ? yield* this.getPathsFromDirectory(fullPath) : yield fullPath;
      }
    }
  }
  transferManager.TransferManager = TransferManager;
  return transferManager;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    var __createBinding = src && src.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = src && src.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Notification = exports.Iam = exports.HmacKey = exports.File = exports.Channel = exports.Bucket = exports.Storage = exports.RETRYABLE_ERR_FN_DEFAULT = exports.IdempotencyStrategy = exports.ApiError = void 0;
    var index_js_1 = requireNodejsCommon();
    Object.defineProperty(exports, "ApiError", { enumerable: true, get: function() {
      return index_js_1.ApiError;
    } });
    var storage_js_1 = requireStorage();
    Object.defineProperty(exports, "IdempotencyStrategy", { enumerable: true, get: function() {
      return storage_js_1.IdempotencyStrategy;
    } });
    Object.defineProperty(exports, "RETRYABLE_ERR_FN_DEFAULT", { enumerable: true, get: function() {
      return storage_js_1.RETRYABLE_ERR_FN_DEFAULT;
    } });
    Object.defineProperty(exports, "Storage", { enumerable: true, get: function() {
      return storage_js_1.Storage;
    } });
    var bucket_js_1 = requireBucket();
    Object.defineProperty(exports, "Bucket", { enumerable: true, get: function() {
      return bucket_js_1.Bucket;
    } });
    __exportStar(requireCrc32c(), exports);
    var channel_js_1 = requireChannel();
    Object.defineProperty(exports, "Channel", { enumerable: true, get: function() {
      return channel_js_1.Channel;
    } });
    var file_js_1 = requireFile();
    Object.defineProperty(exports, "File", { enumerable: true, get: function() {
      return file_js_1.File;
    } });
    __exportStar(requireHashStreamValidator(), exports);
    var hmacKey_js_1 = requireHmacKey();
    Object.defineProperty(exports, "HmacKey", { enumerable: true, get: function() {
      return hmacKey_js_1.HmacKey;
    } });
    var iam_js_1 = requireIam();
    Object.defineProperty(exports, "Iam", { enumerable: true, get: function() {
      return iam_js_1.Iam;
    } });
    var notification_js_1 = requireNotification();
    Object.defineProperty(exports, "Notification", { enumerable: true, get: function() {
      return notification_js_1.Notification;
    } });
    __exportStar(requireTransferManager(), exports);
  })(src);
  return src;
}
export {
  requireSrc as r
};
