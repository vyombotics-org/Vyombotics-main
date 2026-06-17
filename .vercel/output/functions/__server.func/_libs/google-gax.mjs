import { r as requireSrc$4, a as require$$11 } from "./@grpc/grpc-js.mjs";
import { r as requireSrc$3 } from "./grpc__proto-loader.mjs";
import require$$1$3 from "child_process";
import require$$0$4 from "fs";
import { a as requireSrc$2 } from "./google-auth-library.mjs";
import require$$1$2 from "os";
import require$$5$2 from "path";
import { r as requireProtobufjs, a as requireMinimal } from "./protobufjs.mjs";
import { r as requireObjectHash } from "./object-hash.mjs";
import require$$0 from "crypto";
import { r as requireSrc$1 } from "./proto3-json-serializer.mjs";
import require$$1 from "querystring";
import require$$0$1 from "stream";
import require$$0$3 from "http";
import require$$1$1 from "https";
import { r as requireDuplexify } from "./duplexify.mjs";
import { r as requireRetryRequest } from "./retry-request.mjs";
import require$$0$2 from "events";
import { r as requireSrc$5 } from "./google-logging-utils.mjs";
var fallback = { exports: {} };
var gax = {};
var warnings = {};
var featureDetection = {};
var hasRequiredFeatureDetection;
function requireFeatureDetection() {
  if (hasRequiredFeatureDetection) return featureDetection;
  hasRequiredFeatureDetection = 1;
  Object.defineProperty(featureDetection, "__esModule", { value: true });
  featureDetection.hasWindowFetch = hasWindowFetch;
  featureDetection.isNodeJS = isNodeJS;
  const features = {
    windowFetch: typeof window !== "undefined" && window?.fetch && typeof window?.fetch === "function",
    nodeJS: typeof process !== "undefined" && process?.versions?.node
  };
  function hasWindowFetch() {
    return features.windowFetch;
  }
  function isNodeJS() {
    return features.nodeJS;
  }
  return featureDetection;
}
var hasRequiredWarnings;
function requireWarnings() {
  if (hasRequiredWarnings) return warnings;
  hasRequiredWarnings = 1;
  Object.defineProperty(warnings, "__esModule", { value: true });
  warnings.warn = warn;
  const featureDetection_1 = requireFeatureDetection();
  const emittedWarnings = /* @__PURE__ */ new Set();
  function warn(code, message, warnType) {
    if (emittedWarnings.has(code)) {
      return;
    }
    emittedWarnings.add(code);
    if (!(0, featureDetection_1.isNodeJS)()) {
      console.warn(message);
    } else if (typeof warnType !== "undefined") {
      process.emitWarning(message, {
        type: warnType
      });
    } else {
      process.emitWarning(message);
    }
  }
  return warnings;
}
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeAnyProtosInArray = exports.decodeProtobufAny = exports.getProtoNameFromFullName = void 0;
    exports.camelToSnakeCase = camelToSnakeCase;
    exports.toCamelCase = toCamelCase;
    exports.toLowerCamelCase = toLowerCamelCase;
    exports.makeUUID = makeUUID;
    const PROTO_TYPE_PREFIX = "type.googleapis.com/";
    const NUM_OF_PARTS_IN_PROTO_TYPE_NAME = 2;
    const randomUUID = () => globalThis.crypto?.randomUUID() || require$$0.randomUUID();
    function words(str, normalize = false) {
      if (normalize) {
        str = str.replace(/([A-Z])([A-Z]+)([A-Z])/g, (str2) => {
          return str2[0] + str2.slice(1, str2.length - 1).toLowerCase() + str2[str2.length - 1];
        });
      }
      return str.split(/(?=[A-Z])|[^A-Za-z0-9.]+/).filter((w) => w.length > 0).map((w, index) => index === 0 ? w : w.toLowerCase());
    }
    function lowercase(str) {
      if (str.length === 0) {
        return str;
      }
      return str[0].toLowerCase() + str.slice(1);
    }
    function camelToSnakeCase(str) {
      const wordsList = words(str);
      if (wordsList.length === 0) {
        return str;
      }
      const result = [wordsList[0]];
      result.push(...wordsList.slice(1).map(lowercase));
      return result.join("_");
    }
    function capitalize(str) {
      if (str.length === 0) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    }
    function toCamelCase(str) {
      const wordsList = words(
        str,
        /*normalize:*/
        true
      );
      if (wordsList.length === 0) {
        return str;
      }
      const result = [wordsList[0]];
      result.push(...wordsList.slice(1).map((w) => {
        if (w.match(/^\d+$/)) {
          return "_" + w;
        }
        return capitalize(w);
      }));
      return result.join("");
    }
    function toLowerCamelCase(str) {
      const camelCase = toCamelCase(str);
      if (camelCase.length === 0) {
        return camelCase;
      }
      return camelCase[0].toLowerCase() + camelCase.slice(1);
    }
    function makeUUID() {
      return randomUUID();
    }
    const getProtoNameFromFullName = (fullTypeName) => {
      const parts = fullTypeName.split(PROTO_TYPE_PREFIX);
      if (parts.length !== NUM_OF_PARTS_IN_PROTO_TYPE_NAME) {
        throw Error("Can't get proto name");
      }
      return parts[1];
    };
    exports.getProtoNameFromFullName = getProtoNameFromFullName;
    const decodeProtobufAny = (anyValue, protobuf) => {
      if (anyValue.type_url === "") {
        throw new Error("Any type_url is not set");
      }
      const typeName = (0, exports.getProtoNameFromFullName)(anyValue.type_url);
      const type = protobuf.lookupType(typeName);
      return type.decode(anyValue.value);
    };
    exports.decodeProtobufAny = decodeProtobufAny;
    const decodeAnyProtosInArray = (protoList, protobuf) => {
      const protoListDecoded = [];
      for (const proto of protoList) {
        if (proto.constructor.name === "Any") {
          try {
            const decodedAnyProto = (0, exports.decodeProtobufAny)(proto, protobuf);
            protoListDecoded.push(decodedAnyProto);
          } catch (e) {
          }
          continue;
        }
        protoListDecoded.push(proto);
      }
      return protoListDecoded;
    };
    exports.decodeAnyProtosInArray = decodeAnyProtosInArray;
  })(util);
  return util;
}
var status = {};
var hasRequiredStatus;
function requireStatus() {
  if (hasRequiredStatus) return status;
  hasRequiredStatus = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpCodeToRpcCodeMap = exports.Status = void 0;
    exports.rpcCodeFromHttpStatusCode = rpcCodeFromHttpStatusCode;
    var Status;
    (function(Status2) {
      Status2[Status2["OK"] = 0] = "OK";
      Status2[Status2["CANCELLED"] = 1] = "CANCELLED";
      Status2[Status2["UNKNOWN"] = 2] = "UNKNOWN";
      Status2[Status2["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
      Status2[Status2["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
      Status2[Status2["NOT_FOUND"] = 5] = "NOT_FOUND";
      Status2[Status2["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
      Status2[Status2["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
      Status2[Status2["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
      Status2[Status2["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
      Status2[Status2["ABORTED"] = 10] = "ABORTED";
      Status2[Status2["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
      Status2[Status2["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
      Status2[Status2["INTERNAL"] = 13] = "INTERNAL";
      Status2[Status2["UNAVAILABLE"] = 14] = "UNAVAILABLE";
      Status2[Status2["DATA_LOSS"] = 15] = "DATA_LOSS";
      Status2[Status2["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    })(Status || (exports.Status = Status = {}));
    exports.HttpCodeToRpcCodeMap = /* @__PURE__ */ new Map([
      [400, Status.INVALID_ARGUMENT],
      [401, Status.UNAUTHENTICATED],
      [403, Status.PERMISSION_DENIED],
      [404, Status.NOT_FOUND],
      [409, Status.ABORTED],
      [416, Status.OUT_OF_RANGE],
      [429, Status.RESOURCE_EXHAUSTED],
      [499, Status.CANCELLED],
      [501, Status.UNIMPLEMENTED],
      [503, Status.UNAVAILABLE],
      [504, Status.DEADLINE_EXCEEDED]
    ]);
    function rpcCodeFromHttpStatusCode(httpStatusCode) {
      if (exports.HttpCodeToRpcCodeMap.has(httpStatusCode)) {
        return exports.HttpCodeToRpcCodeMap.get(httpStatusCode);
      }
      if (httpStatusCode >= 200 && httpStatusCode < 300) {
        return Status.OK;
      }
      if (httpStatusCode >= 400 && httpStatusCode < 500) {
        return Status.FAILED_PRECONDITION;
      }
      if (httpStatusCode >= 500 && httpStatusCode < 600) {
        return Status.INTERNAL;
      }
      return Status.UNKNOWN;
    }
  })(status);
  return status;
}
var hasRequiredGax;
function requireGax() {
  if (hasRequiredGax) return gax;
  hasRequiredGax = 1;
  Object.defineProperty(gax, "__esModule", { value: true });
  gax.CallSettings = gax.RetryOptions = void 0;
  gax.convertRetryOptions = convertRetryOptions;
  gax.createRetryOptions = createRetryOptions;
  gax.createBackoffSettings = createBackoffSettings;
  gax.createDefaultBackoffSettings = createDefaultBackoffSettings;
  gax.createMaxRetriesBackoffSettings = createMaxRetriesBackoffSettings;
  gax.createBundleOptions = createBundleOptions;
  gax.constructSettings = constructSettings;
  gax.createByteLengthFunction = createByteLengthFunction;
  const warnings_1 = requireWarnings();
  const util_1 = requireUtil();
  const status_1 = requireStatus();
  class RetryOptions {
    retryCodes;
    backoffSettings;
    shouldRetryFn;
    getResumptionRequestFn;
    constructor(retryCodes, backoffSettings, shouldRetryFn, getResumptionRequestFn) {
      this.retryCodes = retryCodes;
      this.backoffSettings = backoffSettings;
      this.shouldRetryFn = shouldRetryFn;
      this.getResumptionRequestFn = getResumptionRequestFn;
    }
  }
  gax.RetryOptions = RetryOptions;
  class CallSettings {
    timeout;
    retry;
    autoPaginate;
    pageToken;
    pageSize;
    maxResults;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    otherArgs;
    bundleOptions;
    isBundling;
    longrunning;
    apiName;
    retryRequestOptions;
    /**
     * @param {Object} settings - An object containing parameters of this settings.
     * @param {number} settings.timeout - The client-side timeout for API calls.
     *   This parameter is ignored for retrying calls.
     * @param {RetryOptions} settings.retry - The configuration for retrying upon
     *   transient error. If set to null, this call will not retry.
     * @param {boolean} settings.autoPaginate - If there is no `pageDescriptor`,
     *   this attrbute has no meaning. Otherwise, determines whether a page
     * streamed response should make the page structure transparent to the user by
     *   flattening the repeated field in the returned generator.
     * @param {number} settings.pageToken - If there is no `pageDescriptor`,
     *   this attribute has no meaning. Otherwise, determines the page token used
     * in the page streaming request.
     * @param {Object} settings.otherArgs - Additional arguments to be passed to
     *   the API calls.
     *
     * @constructor
     */
    constructor(settings) {
      settings = settings || {};
      this.timeout = settings.timeout || 30 * 1e3;
      this.retry = settings.retry;
      this.autoPaginate = "autoPaginate" in settings ? settings.autoPaginate : true;
      this.maxResults = settings.maxResults;
      this.otherArgs = settings.otherArgs || {};
      this.bundleOptions = settings.bundleOptions;
      this.isBundling = "isBundling" in settings ? settings.isBundling : true;
      this.longrunning = "longrunning" in settings ? settings.longrunning : void 0;
      this.apiName = settings.apiName ?? void 0;
      this.retryRequestOptions = settings.retryRequestOptions;
    }
    /**
     * Returns a new CallSettings merged from this and a CallOptions object.
     *
     * @param {CallOptions} options - an instance whose values override
     *   those in this object. If null, ``merge`` returns a copy of this
     *   object
     * @return {CallSettings} The merged CallSettings instance.
     */
    merge(options) {
      if (!options) {
        return new CallSettings(this);
      }
      let timeout2 = this.timeout;
      let retry = this.retry;
      let autoPaginate = this.autoPaginate;
      let maxResults = this.maxResults;
      let otherArgs = this.otherArgs;
      let isBundling = this.isBundling;
      let longrunning2 = this.longrunning;
      let apiName = this.apiName;
      let retryRequestOptions = this.retryRequestOptions;
      if ("timeout" in options) {
        timeout2 = options.timeout;
      }
      if (retry?.retryCodes) {
        retry.backoffSettings.initialRpcTimeoutMillis = timeout2;
        retry.backoffSettings.maxRpcTimeoutMillis = timeout2;
        retry.backoffSettings.totalTimeoutMillis = timeout2;
      }
      if ("retry" in options) {
        retry = mergeRetryOptions(retry || {}, options.retry);
      }
      if ("autoPaginate" in options && !options.autoPaginate) {
        autoPaginate = false;
      }
      if ("maxResults" in options) {
        maxResults = options.maxResults;
      }
      if ("otherArgs" in options) {
        otherArgs = {};
        for (const key in this.otherArgs) {
          otherArgs[key] = this.otherArgs[key];
        }
        for (const optionsKey in options.otherArgs) {
          otherArgs[optionsKey] = options.otherArgs[optionsKey];
        }
      }
      if ("isBundling" in options) {
        isBundling = options.isBundling;
      }
      if ("maxRetries" in options && options.maxRetries !== void 0) {
        retry.backoffSettings.maxRetries = options.maxRetries;
        delete retry.backoffSettings.totalTimeoutMillis;
      }
      if ("longrunning" in options) {
        longrunning2 = options.longrunning;
      }
      if ("apiName" in options) {
        apiName = options.apiName;
      }
      if ("retryRequestOptions" in options) {
        retryRequestOptions = options.retryRequestOptions;
      }
      return new CallSettings({
        timeout: timeout2,
        retry,
        bundleOptions: this.bundleOptions,
        longrunning: longrunning2,
        autoPaginate,
        maxResults,
        otherArgs,
        isBundling,
        apiName,
        retryRequestOptions
      });
    }
  }
  gax.CallSettings = CallSettings;
  function convertRetryOptions(options, gaxStreamingRetries) {
    if (!options) {
      return options;
    }
    if (!gaxStreamingRetries) {
      return options;
    }
    if (options.retry && options.retryRequestOptions) {
      throw new Error("Only one of retry or retryRequestOptions may be set");
    }
    if (options.retryRequestOptions) {
      if (options.retryRequestOptions.objectMode !== void 0) {
        (0, warnings_1.warn)("retry_request_options", "objectMode override is not supported. It is set to true internally by default in gax.", "UnsupportedParameterWarning");
      }
      if (options.retryRequestOptions.noResponseRetries !== void 0) {
        (0, warnings_1.warn)("retry_request_options", "noResponseRetries override is not supported. Please specify retry codes or a function to determine retry eligibility.", "UnsupportedParameterWarning");
      }
      if (options.retryRequestOptions.currentRetryAttempt !== void 0) {
        (0, warnings_1.warn)("retry_request_options", "currentRetryAttempt override is not supported. Retry attempts are tracked internally.", "UnsupportedParameterWarning");
      }
      let retryCodes = [status_1.Status.UNAVAILABLE];
      let shouldRetryFn;
      if (options.retryRequestOptions.shouldRetryFn) {
        retryCodes = [];
        shouldRetryFn = options.retryRequestOptions.shouldRetryFn;
      }
      options.maxRetries = options?.retryRequestOptions?.retries ?? options.maxRetries;
      const backoffSettings = createDefaultBackoffSettings();
      let maxRetryDelayMillis;
      let totalTimeoutMillis;
      if (options.retryRequestOptions.maxRetryDelay !== void 0) {
        maxRetryDelayMillis = options.retryRequestOptions.maxRetryDelay * 1e3;
      }
      const retryDelayMultiplier = options?.retryRequestOptions?.retryDelayMultiplier ?? backoffSettings.retryDelayMultiplier;
      if (options.retryRequestOptions.totalTimeout !== void 0) {
        totalTimeoutMillis = options.retryRequestOptions.totalTimeout * 1e3;
      } else {
        if (options.maxRetries === void 0) {
          totalTimeoutMillis = 3e4;
          (0, warnings_1.warn)("retry_request_options_no_max_retries_timeout", "Neither maxRetries nor totalTimeout were passed. Defaulting to totalTimeout of 30000ms.", "MissingParameterWarning");
        }
      }
      backoffSettings.maxRetryDelayMillis = maxRetryDelayMillis ?? backoffSettings.maxRetryDelayMillis;
      backoffSettings.retryDelayMultiplier = retryDelayMultiplier ?? backoffSettings.retryDelayMultiplier;
      backoffSettings.totalTimeoutMillis = totalTimeoutMillis ?? backoffSettings.totalTimeoutMillis;
      const convertedRetryOptions = createRetryOptions(retryCodes, backoffSettings, shouldRetryFn);
      options.retry = convertedRetryOptions;
      delete options.retryRequestOptions;
      (0, warnings_1.warn)("retry_request_options", "retryRequestOptions will be deprecated in a future release. Please use retryOptions to pass retry options at call time", "DeprecationWarning");
    }
    return options;
  }
  function createRetryOptions(retryCodes, backoffSettings, shouldRetryFn, getResumptionRequestFn) {
    return {
      retryCodes,
      backoffSettings,
      shouldRetryFn,
      getResumptionRequestFn
    };
  }
  function createBackoffSettings(initialRetryDelayMillis, retryDelayMultiplier, maxRetryDelayMillis, initialRpcTimeoutMillis, rpcTimeoutMultiplier, maxRpcTimeoutMillis, totalTimeoutMillis) {
    return {
      initialRetryDelayMillis,
      retryDelayMultiplier,
      maxRetryDelayMillis,
      initialRpcTimeoutMillis,
      rpcTimeoutMultiplier,
      maxRpcTimeoutMillis,
      totalTimeoutMillis
    };
  }
  function createDefaultBackoffSettings() {
    return createBackoffSettings(100, 1.3, 6e4, null, null, null, null);
  }
  function createMaxRetriesBackoffSettings(initialRetryDelayMillis, retryDelayMultiplier, maxRetryDelayMillis, initialRpcTimeoutMillis, rpcTimeoutMultiplier, maxRpcTimeoutMillis, maxRetries) {
    return {
      initialRetryDelayMillis,
      retryDelayMultiplier,
      maxRetryDelayMillis,
      initialRpcTimeoutMillis,
      rpcTimeoutMultiplier,
      maxRpcTimeoutMillis,
      maxRetries
    };
  }
  function createBundleOptions(options) {
    const params = [
      "element_count_threshold",
      "element_count_limit",
      "request_byte_threshold",
      "request_byte_limit",
      "delay_threshold_millis"
    ];
    params.forEach((param) => {
      if (param in options && typeof options[param] !== "number") {
        throw new Error(`${param} should be a number`);
      }
    });
    const elementCountThreshold = options.element_count_threshold || 0;
    const elementCountLimit = options.element_count_limit || 0;
    const requestByteThreshold = options.request_byte_threshold || 0;
    const requestByteLimit = options.request_byte_limit || 0;
    const delayThreshold = options.delay_threshold_millis || 0;
    if (elementCountThreshold === 0 && requestByteThreshold === 0 && delayThreshold === 0) {
      throw new Error("one threshold should be > 0");
    }
    return {
      elementCountThreshold,
      elementCountLimit,
      requestByteThreshold,
      requestByteLimit,
      delayThreshold
    };
  }
  function constructRetry(methodConfig, retryCodes, retryParams, retryNames) {
    if (!methodConfig) {
      return null;
    }
    let codes = null;
    if (retryCodes && "retry_codes_name" in methodConfig) {
      const retryCodesName = methodConfig["retry_codes_name"];
      codes = (retryCodes[retryCodesName] || []).map((name) => {
        return Number(retryNames[name]);
      });
    }
    let backoffSettings = null;
    if (retryParams && "retry_params_name" in methodConfig) {
      const params = retryParams[methodConfig.retry_params_name];
      backoffSettings = createBackoffSettings(params.initial_retry_delay_millis, params.retry_delay_multiplier, params.max_retry_delay_millis, params.initial_rpc_timeout_millis, params.rpc_timeout_multiplier, params.max_rpc_timeout_millis, params.total_timeout_millis);
    }
    return createRetryOptions(codes, backoffSettings);
  }
  function mergeRetryOptions(retry, overrides) {
    if (!overrides) {
      return null;
    }
    if (!overrides.retryCodes && !overrides.backoffSettings && !overrides.shouldRetryFn && !overrides.getResumptionRequestFn) {
      return retry;
    }
    const retryCodes = overrides.retryCodes ? overrides.retryCodes : retry.retryCodes;
    const backoffSettings = overrides.backoffSettings ? overrides.backoffSettings : retry.backoffSettings;
    const shouldRetryFn = overrides.shouldRetryFn ? overrides.shouldRetryFn : retry.shouldRetryFn;
    const getResumptionRequestFn = overrides.getResumptionRequestFn ? overrides.getResumptionRequestFn : retry.getResumptionRequestFn;
    return createRetryOptions(retryCodes, backoffSettings, shouldRetryFn, getResumptionRequestFn);
  }
  function constructSettings(serviceName, clientConfig, configOverrides, retryNames, otherArgs) {
    otherArgs = otherArgs || {};
    const defaults = {};
    const serviceConfig = (clientConfig.interfaces || {})[serviceName];
    if (!serviceConfig) {
      return null;
    }
    const overrides = (configOverrides.interfaces || {})[serviceName] || {};
    const methods = serviceConfig.methods;
    const overridingMethods = overrides.methods || {};
    for (const methodName in methods) {
      const methodConfig = methods[methodName];
      const jsName = (0, util_1.toLowerCamelCase)(methodName);
      let retry = constructRetry(methodConfig, serviceConfig.retry_codes, serviceConfig.retry_params, retryNames);
      let bundlingConfig = methodConfig.bundling;
      let timeout2 = methodConfig.timeout_millis;
      if (methodName in overridingMethods) {
        const overridingMethod = overridingMethods[methodName];
        if (overridingMethod) {
          if ("bundling" in overridingMethod) {
            bundlingConfig = overridingMethod.bundling;
          }
          if ("timeout_millis" in overridingMethod) {
            timeout2 = overridingMethod.timeout_millis;
          }
        }
        retry = mergeRetryOptions(retry, constructRetry(overridingMethod, overrides.retry_codes, overrides.retry_params, retryNames));
      }
      const apiName = serviceName;
      defaults[jsName] = new CallSettings({
        timeout: timeout2,
        retry,
        bundleOptions: bundlingConfig ? createBundleOptions(bundlingConfig) : null,
        otherArgs,
        apiName
      });
    }
    return defaults;
  }
  function createByteLengthFunction(message) {
    return function getByteLength(obj) {
      try {
        return message.encode(obj).finish().length;
      } catch (err) {
        const stringified = JSON.stringify(obj);
        (0, warnings_1.warn)("error_encoding_protobufjs_object", `Cannot encode protobuf.js object: ${stringified}: ${err}`);
        return stringified.length;
      }
    };
  }
  return gax;
}
var routingHeader = {};
var hasRequiredRoutingHeader;
function requireRoutingHeader() {
  if (hasRequiredRoutingHeader) return routingHeader;
  hasRequiredRoutingHeader = 1;
  var __createBinding = routingHeader && routingHeader.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = routingHeader && routingHeader.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = routingHeader && routingHeader.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(routingHeader, "__esModule", { value: true });
  routingHeader.fromParams = fromParams;
  const querystring = __importStar(require$$1);
  function fromParams(params) {
    return querystring.stringify(params);
  }
  return routingHeader;
}
var operationsClient = {};
var createApiCall = {};
var apiCaller = {};
var normalApiCaller = {};
var call = {};
var googleError = {};
const nested$3 = { "google": { "nested": { "protobuf": { "nested": { "Any": { "fields": { "type_url": { "type": "string", "id": 1 }, "value": { "type": "bytes", "id": 2 } } }, "Duration": { "fields": { "seconds": { "type": "int64", "id": 1 }, "nanos": { "type": "int32", "id": 2 } } } } }, "rpc": { "options": { "cc_enable_arenas": true, "go_package": "google.golang.org/genproto/googleapis/rpc/errdetails;errdetails", "java_multiple_files": true, "java_outer_classname": "ErrorDetailsProto", "java_package": "com.google.rpc", "objc_class_prefix": "RPC" }, "nested": { "Status": { "fields": { "code": { "type": "int32", "id": 1 }, "message": { "type": "string", "id": 2 }, "details": { "rule": "repeated", "type": "google.protobuf.Any", "id": 3 } } }, "RetryInfo": { "fields": { "retryDelay": { "type": "google.protobuf.Duration", "id": 1 } } }, "DebugInfo": { "fields": { "stackEntries": { "rule": "repeated", "type": "string", "id": 1 }, "detail": { "type": "string", "id": 2 } } }, "QuotaFailure": { "fields": { "violations": { "rule": "repeated", "type": "Violation", "id": 1 } }, "nested": { "Violation": { "fields": { "subject": { "type": "string", "id": 1 }, "description": { "type": "string", "id": 2 } } } } }, "ErrorInfo": { "fields": { "reason": { "type": "string", "id": 1 }, "domain": { "type": "string", "id": 2 }, "metadata": { "keyType": "string", "type": "string", "id": 3 } } }, "PreconditionFailure": { "fields": { "violations": { "rule": "repeated", "type": "Violation", "id": 1 } }, "nested": { "Violation": { "fields": { "type": { "type": "string", "id": 1 }, "subject": { "type": "string", "id": 2 }, "description": { "type": "string", "id": 3 } } } } }, "BadRequest": { "fields": { "fieldViolations": { "rule": "repeated", "type": "FieldViolation", "id": 1 } }, "nested": { "FieldViolation": { "fields": { "field": { "type": "string", "id": 1 }, "description": { "type": "string", "id": 2 } } } } }, "RequestInfo": { "fields": { "requestId": { "type": "string", "id": 1 }, "servingData": { "type": "string", "id": 2 } } }, "ResourceInfo": { "fields": { "resourceType": { "type": "string", "id": 1 }, "resourceName": { "type": "string", "id": 2 }, "owner": { "type": "string", "id": 3 }, "description": { "type": "string", "id": 4 } } }, "Help": { "fields": { "links": { "rule": "repeated", "type": "Link", "id": 1 } }, "nested": { "Link": { "fields": { "description": { "type": "string", "id": 1 }, "url": { "type": "string", "id": 2 } } } } }, "LocalizedMessage": { "fields": { "locale": { "type": "string", "id": 1 }, "message": { "type": "string", "id": 2 } } } } } } } };
const require$$4$1 = {
  nested: nested$3
};
var hasRequiredGoogleError;
function requireGoogleError() {
  if (hasRequiredGoogleError) return googleError;
  hasRequiredGoogleError = 1;
  var __createBinding = googleError && googleError.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = googleError && googleError.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = googleError && googleError.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(googleError, "__esModule", { value: true });
  googleError.GoogleErrorDecoder = googleError.GoogleError = void 0;
  const status_1 = requireStatus();
  const protobuf = __importStar(requireProtobufjs());
  const serializer = __importStar(requireSrc$1());
  const fallback_12 = requireFallback();
  const PROTO_TYPE_PREFIX = "type.googleapis.com/";
  const RESOURCE_INFO_TYPE = "type.googleapis.com/google.rpc.ResourceInfo";
  const DEFAULT_RESOURCE_TYPE_NAME_FOR_UNKNOWN_TYPES = "Unknown type";
  const ANY_PROTO_TYPE_NAME = "google.protobuf.Any";
  const UNKNOWN_TYPE_ENCONDED_ERROR_PREFIX = "Unknown type encoded in";
  const UNKNOWN_TYPE_NO_SUCH_TYPE = "no such type";
  const NUM_OF_PARTS_IN_PROTO_TYPE_NAME = 2;
  class GoogleError extends Error {
    code;
    note;
    metadata;
    statusDetails;
    reason;
    domain;
    errorInfoMetadata;
    // Parse details field in google.rpc.status wire over gRPC medatadata.
    // Promote google.rpc.ErrorInfo if exist.
    static parseGRPCStatusDetails(err) {
      const decoder = new GoogleErrorDecoder();
      try {
        if (err.metadata && err.metadata.get("grpc-status-details-bin")) {
          const statusDetailsObj = decoder.decodeGRPCStatusDetails(err.metadata.get("grpc-status-details-bin"));
          if (statusDetailsObj && statusDetailsObj.details && statusDetailsObj.details.length > 0) {
            err.statusDetails = statusDetailsObj.details;
          }
          if (statusDetailsObj && statusDetailsObj.errorInfo) {
            err.reason = statusDetailsObj.errorInfo.reason;
            err.domain = statusDetailsObj.errorInfo.domain;
            err.errorInfoMetadata = statusDetailsObj.errorInfo.metadata;
          }
        }
      } catch (decodeErr) {
      }
      return err;
    }
    // Parse http JSON error and promote google.rpc.ErrorInfo if exist.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static parseHttpError(json) {
      if (Array.isArray(json)) {
        json = json.find((obj) => {
          return "error" in obj;
        });
      }
      if (!json["error"]) {
        json["error"] = {};
        Object.keys(json).filter((key) => key !== "error").forEach((key) => {
          json["error"][key] = json[key];
          delete json[key];
        });
      }
      const decoder = new GoogleErrorDecoder();
      const proto3Error = decoder.decodeHTTPError(json["error"]);
      const error = Object.assign(new GoogleError(json["error"]["message"]), proto3Error);
      if (json["error"]["status"] && status_1.Status[json["error"]["status"]]) {
        error.code = status_1.Status[json["error"]["status"]];
      } else if (json["error"]["code"]) {
        error.code = (0, status_1.rpcCodeFromHttpStatusCode)(json["error"]["code"]);
      } else {
        delete error.code;
      }
      if (error.details) {
        try {
          const statusDetailsObj = decoder.decodeHttpStatusDetails(error.details);
          if (statusDetailsObj && statusDetailsObj.details && statusDetailsObj.details.length > 0) {
            error.statusDetails = statusDetailsObj.details;
          }
          if (statusDetailsObj && statusDetailsObj.errorInfo) {
            error.reason = statusDetailsObj.errorInfo.reason;
            error.domain = statusDetailsObj.errorInfo.domain;
            error.errorInfoMetadata = statusDetailsObj.errorInfo.metadata;
          }
        } catch (decodeErr) {
        }
      }
      return error;
    }
  }
  googleError.GoogleError = GoogleError;
  const getProtoTypeNameFromFullNameType = (fullTypeName) => {
    const parts = fullTypeName.split(PROTO_TYPE_PREFIX);
    if (parts.length !== NUM_OF_PARTS_IN_PROTO_TYPE_NAME) {
      throw Error("Can't convert full type name");
    }
    return parts[1];
  };
  const isDetailKnownProto = (protobuf2, detail) => {
    try {
      const typeName = getProtoTypeNameFromFullNameType(detail["@type"]);
      if (typeName === ANY_PROTO_TYPE_NAME) {
        return isDetailKnownProto(protobuf2, detail.value);
      }
      const proto = protobuf2.lookup(typeName);
      if (!proto) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  const isUnknownTypeEncodedError = (error) => {
    if (typeof error === "object" && error && "message" in error) {
      return error.message.includes(UNKNOWN_TYPE_ENCONDED_ERROR_PREFIX) || error.message.includes(UNKNOWN_TYPE_NO_SUCH_TYPE);
    }
    return false;
  };
  const buildUnknownProtoAsAny = (unknownProto, anyProto) => {
    return anyProto.create({
      type_url: unknownProto.type_url,
      value: unknownProto.value
    });
  };
  const getErrorDetails = (protobuf2, json) => {
    const error_details = {
      knownDetails: [],
      unknownDetails: []
    };
    if (typeof json === "object" && json !== null && "details" in json) {
      const details = json["details"];
      for (const detail of details) {
        if (isDetailKnownProto(protobuf2, detail)) {
          error_details.knownDetails.push(detail);
        } else {
          error_details.unknownDetails.push(detail);
        }
      }
    }
    return error_details;
  };
  const makeResourceInfoError = (resourceType, description) => {
    return {
      "@type": RESOURCE_INFO_TYPE,
      resourceType,
      description
    };
  };
  const convertUnknownDetailsToResourceInfoError = (unknownDetails) => {
    const unknownDetailsAsResourceInfoError = [];
    for (const unknownDetail of unknownDetails) {
      try {
        let resourceType = DEFAULT_RESOURCE_TYPE_NAME_FOR_UNKNOWN_TYPES;
        if (typeof unknownDetail === "object" && unknownDetail !== null && "@type" in unknownDetail) {
          const unknownType = unknownDetail["@type"];
          resourceType = unknownType;
        }
        const description = JSON.stringify(unknownDetail);
        unknownDetailsAsResourceInfoError.push(makeResourceInfoError(resourceType, description));
      } catch (e) {
      }
    }
    return unknownDetailsAsResourceInfoError;
  };
  class GoogleErrorDecoder {
    root;
    anyType;
    statusType;
    constructor() {
      const errorProtoJson = require$$4$1;
      this.root = protobuf.Root.fromJSON(errorProtoJson);
      this.anyType = this.root.lookupType("google.protobuf.Any");
      this.statusType = this.root.lookupType("google.rpc.Status");
    }
    decodeProtobufAny(anyValue) {
      const match = anyValue.type_url.match(/^type.googleapis.com\/(.*)/);
      if (!match) {
        throw new Error(`Unknown type encoded in google.protobuf.any: ${anyValue.type_url}`);
      }
      const typeName = match[1];
      const type = this.root.lookupType(typeName);
      if (!type) {
        throw new Error(`Cannot lookup type ${typeName}`);
      }
      return type.decode(anyValue.value);
    }
    // Decodes gRPC-fallback error which is an instance of google.rpc.Status.
    decodeRpcStatus(buffer) {
      const uint8array = new Uint8Array(buffer);
      const status2 = this.statusType.decode(uint8array);
      const details = [];
      let errorInfo;
      for (const detail of status2.details) {
        try {
          const decodedDetail = this.decodeProtobufAny(detail);
          details.push(decodedDetail);
          if (detail.type_url === "type.googleapis.com/google.rpc.ErrorInfo") {
            errorInfo = decodedDetail;
          }
        } catch (err) {
        }
      }
      const result = {
        code: status2.code,
        message: status2.message,
        statusDetails: details,
        reason: errorInfo?.reason,
        domain: errorInfo?.domain,
        errorInfoMetadata: errorInfo?.metadata
      };
      return result;
    }
    // Construct an Error from a StatusObject.
    // Adapted from https://github.com/grpc/grpc-node/blob/main/packages/grpc-js/src/call.ts#L79
    callErrorFromStatus(status2) {
      status2.message = `${status2.code} ${status_1.Status[status2.code]}: ${status2.message}`;
      return Object.assign(new GoogleError(status2.message), status2);
    }
    // Decodes gRPC-fallback error which is an instance of google.rpc.Status,
    // and puts it into the object similar to gRPC ServiceError object.
    decodeErrorFromBuffer(buffer) {
      return this.callErrorFromStatus(this.decodeRpcStatus(buffer));
    }
    // Decodes gRPC metadata error details which is an instance of google.rpc.Status.
    decodeGRPCStatusDetails(bufferArr) {
      const details = [];
      let errorInfo;
      bufferArr.forEach((buffer) => {
        const uint8array = new Uint8Array(buffer);
        const rpcStatus = this.statusType.decode(uint8array);
        for (const detail of rpcStatus.details) {
          try {
            const decodedDetail = this.decodeProtobufAny(detail);
            details.push(decodedDetail);
            if (detail.type_url === "type.googleapis.com/google.rpc.ErrorInfo") {
              errorInfo = decodedDetail;
            }
          } catch (error) {
            if (isUnknownTypeEncodedError(error)) {
              const customErrorAsAny = buildUnknownProtoAsAny(detail, this.anyType);
              details.push(customErrorAsAny);
            }
          }
        }
      });
      const result = {
        details,
        errorInfo
      };
      return result;
    }
    // Decodes http error which is an instance of google.rpc.Status.
    decodeHTTPError(json) {
      const errorDetails = getErrorDetails(this.root, json);
      let details = [];
      if (typeof json === "object" && json !== null && "details" in json) {
        if (errorDetails.knownDetails.length) {
          details = errorDetails.knownDetails;
        }
        if (errorDetails.unknownDetails.length) {
          const unknowDetailsAsResourceInfo = convertUnknownDetailsToResourceInfoError(errorDetails.unknownDetails);
          details = [...details, ...unknowDetailsAsResourceInfo];
        }
        if (details.length) {
          json.details = details;
        }
      }
      const errorMessage = serializer.fromProto3JSON(this.statusType, json);
      if (!errorMessage) {
        throw new Error(`Received error message ${json}, but failed to serialize as proto3 message`);
      }
      return this.statusType.toObject(errorMessage, fallback_12.defaultToObjectOptions);
    }
    // Decodes http error details which is an instance of Array<google.protobuf.Any>.
    decodeHttpStatusDetails(rawDetails) {
      const details = [];
      let errorInfo;
      for (const detail of rawDetails) {
        try {
          const decodedDetail = this.decodeProtobufAny(detail);
          details.push(decodedDetail);
          if (detail.type_url === "type.googleapis.com/google.rpc.ErrorInfo") {
            errorInfo = decodedDetail;
          }
        } catch (err) {
        }
      }
      return { details, errorInfo };
    }
  }
  googleError.GoogleErrorDecoder = GoogleErrorDecoder;
  return googleError;
}
var hasRequiredCall;
function requireCall() {
  if (hasRequiredCall) return call;
  hasRequiredCall = 1;
  Object.defineProperty(call, "__esModule", { value: true });
  call.OngoingCallPromise = call.OngoingCall = void 0;
  const status_1 = requireStatus();
  const googleError_1 = requireGoogleError();
  class OngoingCall {
    callback;
    cancelFunc;
    completed;
    /**
     * OngoingCall manages callback, API calls, and cancellation
     * of the API calls.
     * @param {APICallback=} callback
     *   The callback to be called asynchronously when the API call
     *   finishes.
     * @constructor
     * @property {APICallback} callback
     *   The callback function to be called.
     * @private
     */
    constructor(callback) {
      this.callback = callback;
      this.completed = false;
    }
    /**
     * Cancels the ongoing promise.
     */
    cancel() {
      if (this.completed) {
        return;
      }
      this.completed = true;
      if (this.cancelFunc) {
        this.cancelFunc();
      } else {
        const error = new googleError_1.GoogleError("cancelled");
        error.code = status_1.Status.CANCELLED;
        this.callback(error);
      }
    }
    /**
     * Call calls the specified function. Result will be used to fulfill
     * the promise.
     *
     * @param {SimpleCallbackFunction} func
     *   A function for an API call.
     * @param {Object} argument
     *   A request object.
     */
    call(func, argument) {
      if (this.completed) {
        return;
      }
      const canceller = func(argument, (err, response, next, rawResponse) => {
        this.completed = true;
        setImmediate(this.callback, err, response, next, rawResponse);
      });
      if (canceller instanceof Promise) {
        canceller.catch((err) => {
          setImmediate(this.callback, new googleError_1.GoogleError(err), null, null, null);
        });
      }
      this.cancelFunc = () => canceller.cancel();
    }
  }
  call.OngoingCall = OngoingCall;
  class OngoingCallPromise extends OngoingCall {
    promise;
    /**
     * GaxPromise is GRPCCallbackWrapper, but it holds a promise when
     * the API call finishes.
     * @constructor
     * @private
     */
    constructor() {
      let resolveCallback;
      let rejectCallback;
      const callback = (err, response, next, rawResponse) => {
        if (err) {
          if (err.metadata) {
            rejectCallback(googleError_1.GoogleError.parseGRPCStatusDetails(err));
          } else {
            rejectCallback(err);
          }
        } else if (response !== void 0) {
          resolveCallback([response, next || null, rawResponse || null]);
        } else {
          throw new googleError_1.GoogleError("Neither error nor response are defined");
        }
      };
      const promise = new Promise((resolve, reject) => {
        resolveCallback = resolve;
        rejectCallback = reject;
      });
      super(callback);
      this.promise = promise;
      this.promise.cancel = () => {
        this.cancel();
      };
    }
  }
  call.OngoingCallPromise = OngoingCallPromise;
  return call;
}
var hasRequiredNormalApiCaller;
function requireNormalApiCaller() {
  if (hasRequiredNormalApiCaller) return normalApiCaller;
  hasRequiredNormalApiCaller = 1;
  Object.defineProperty(normalApiCaller, "__esModule", { value: true });
  normalApiCaller.NormalApiCaller = void 0;
  const call_1 = requireCall();
  class NormalApiCaller {
    init(callback) {
      if (callback) {
        return new call_1.OngoingCall(callback);
      }
      return new call_1.OngoingCallPromise();
    }
    wrap(func) {
      return func;
    }
    call(apiCall, argument, settings, canceller) {
      canceller.call(apiCall, argument);
    }
    fail(canceller, err) {
      canceller.callback(err);
    }
    result(canceller) {
      return canceller.promise;
    }
  }
  normalApiCaller.NormalApiCaller = NormalApiCaller;
  return normalApiCaller;
}
var hasRequiredApiCaller;
function requireApiCaller() {
  if (hasRequiredApiCaller) return apiCaller;
  hasRequiredApiCaller = 1;
  Object.defineProperty(apiCaller, "__esModule", { value: true });
  apiCaller.createAPICaller = createAPICaller;
  const normalApiCaller_1 = requireNormalApiCaller();
  function createAPICaller(settings, descriptor2) {
    if (!descriptor2) {
      return new normalApiCaller_1.NormalApiCaller();
    }
    return descriptor2.getApiCaller(settings);
  }
  return apiCaller;
}
var retries = {};
var timeout = {};
var hasRequiredTimeout;
function requireTimeout() {
  if (hasRequiredTimeout) return timeout;
  hasRequiredTimeout = 1;
  Object.defineProperty(timeout, "__esModule", { value: true });
  timeout.addTimeoutArg = addTimeoutArg;
  function addTimeoutArg(func, timeout2, otherArgs, abTests) {
    return (argument, callback) => {
      const now = /* @__PURE__ */ new Date();
      const options = otherArgs.options || {};
      options.deadline = new Date(now.getTime() + timeout2);
      const metadata = otherArgs.metadataBuilder ? otherArgs.metadataBuilder(abTests, otherArgs.headers || {}) : null;
      return func(argument, metadata, options, callback);
    };
  }
  return timeout;
}
var hasRequiredRetries;
function requireRetries() {
  if (hasRequiredRetries) return retries;
  hasRequiredRetries = 1;
  Object.defineProperty(retries, "__esModule", { value: true });
  retries.retryable = retryable;
  const status_1 = requireStatus();
  const googleError_1 = requireGoogleError();
  const timeout_1 = requireTimeout();
  function retryable(func, retry, otherArgs, apiName) {
    const delayMult = retry.backoffSettings.retryDelayMultiplier;
    const maxDelay = retry.backoffSettings.maxRetryDelayMillis;
    const timeoutMult = retry.backoffSettings.rpcTimeoutMultiplier;
    const maxTimeout = retry.backoffSettings.maxRpcTimeoutMillis;
    let delay = retry.backoffSettings.initialRetryDelayMillis;
    let timeout2 = retry.backoffSettings.initialRpcTimeoutMillis;
    return (argument, callback) => {
      let canceller;
      let timeoutId;
      let now = /* @__PURE__ */ new Date();
      let deadline;
      if (retry.backoffSettings.totalTimeoutMillis) {
        deadline = now.getTime() + retry.backoffSettings.totalTimeoutMillis;
      }
      let retries2 = 0;
      const maxRetries = retry.backoffSettings.maxRetries;
      const errorsEncountered = [];
      function errorDetailsSuffix(errsEncountered) {
        if (errsEncountered.length < 2) {
          return "";
        }
        const errorsAsString = errsEncountered.map((err) => {
          const statusDetailsString = err.statusDetails ? err.statusDetails.toString() : "";
          const codeString = err.code && err.code.toString ? err.code.toString() : "";
          const noteString = err.note && err.note.toString ? err.note.toString() : "";
          const messageString = err.message && err.message.toString ? err.message.toString() : "";
          return `{message: ${messageString}, code: ${codeString}, details: ${statusDetailsString}, note: ${noteString}}`;
        }).join(",");
        return ` : Previous errors : [${errorsAsString}]`;
      }
      function repeat(err) {
        if (err) {
          errorsEncountered.push(err);
        }
        timeoutId = null;
        if (deadline && now.getTime() >= deadline) {
          const error = new googleError_1.GoogleError(`Total timeout of API ${apiName} exceeded ${retry.backoffSettings.totalTimeoutMillis} milliseconds ${err ? `retrying error ${err} ` : ""} before any response was received.${errorDetailsSuffix(errorsEncountered)}`);
          error.code = status_1.Status.DEADLINE_EXCEEDED;
          callback(error);
          return;
        }
        if (retries2 && retries2 >= maxRetries) {
          const error = new googleError_1.GoogleError("Exceeded maximum number of retries " + (err ? `retrying error ${err} ` : "") + "before any response was received" + errorDetailsSuffix(errorsEncountered));
          error.code = status_1.Status.DEADLINE_EXCEEDED;
          callback(error);
          return;
        }
        retries2++;
        let lastError = err;
        const toCall = (0, timeout_1.addTimeoutArg)(func, timeout2, otherArgs);
        canceller = toCall(argument, (err2, response, next, rawResponse) => {
          if (err2) {
            lastError = err2;
          }
          if (!err2) {
            callback(null, response, next, rawResponse);
            return;
          }
          canceller = null;
          if (retry.retryCodes.length > 0 && retry.retryCodes.indexOf(err2.code) < 0) {
            err2.note = "Exception occurred in retry method that was not classified as transient";
            callback(err2);
          } else {
            const toSleep = Math.random() * delay;
            timeoutId = setTimeout(() => {
              now = /* @__PURE__ */ new Date();
              delay = Math.min(delay * delayMult, maxDelay);
              const timeoutCal = timeout2 && timeoutMult ? timeout2 * timeoutMult : 0;
              const rpcTimeout = maxTimeout ? maxTimeout : 0;
              const newDeadline = deadline ? deadline - now.getTime() : Infinity;
              timeout2 = Math.min(timeoutCal, rpcTimeout, newDeadline);
              repeat(lastError);
            }, toSleep);
          }
        });
        if (canceller instanceof Promise) {
          canceller.catch((err2) => {
            callback(new googleError_1.GoogleError(err2));
          });
        }
      }
      if (maxRetries && deadline) {
        const error = new googleError_1.GoogleError("Cannot set both totalTimeoutMillis and maxRetries in backoffSettings.");
        error.code = status_1.Status.INVALID_ARGUMENT;
        callback(error);
      } else {
        repeat();
      }
      return {
        cancel() {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          if (canceller) {
            canceller.cancel();
          } else {
            const error = new googleError_1.GoogleError("cancelled" + errorDetailsSuffix(errorsEncountered));
            error.code = status_1.Status.CANCELLED;
            callback(error);
          }
        }
      };
    };
  }
  return retries;
}
var streamingApiCaller = {};
var streaming = {};
var hasRequiredStreaming;
function requireStreaming() {
  if (hasRequiredStreaming) return streaming;
  hasRequiredStreaming = 1;
  Object.defineProperty(streaming, "__esModule", { value: true });
  streaming.StreamProxy = streaming.StreamType = void 0;
  const gax_1 = requireGax();
  const googleError_1 = requireGoogleError();
  const status_1 = requireStatus();
  const stream_1 = require$$0$1;
  const duplexify = requireDuplexify();
  const retryRequest = requireRetryRequest();
  var StreamType;
  (function(StreamType2) {
    StreamType2[StreamType2["SERVER_STREAMING"] = 1] = "SERVER_STREAMING";
    StreamType2[StreamType2["CLIENT_STREAMING"] = 2] = "CLIENT_STREAMING";
    StreamType2[StreamType2["BIDI_STREAMING"] = 3] = "BIDI_STREAMING";
  })(StreamType || (streaming.StreamType = StreamType = {}));
  const requestOps = null;
  class StreamProxy extends duplexify {
    type;
    _callback;
    _isCancelCalled;
    stream;
    _responseHasSent;
    rest;
    gaxServerStreamingRetries;
    apiCall;
    argument;
    /**
     * StreamProxy is a proxy to gRPC-streaming method.
     *
     * @private
     * @constructor
     * @param {StreamType} type - the type of gRPC stream.
     * @param {ApiCallback} callback - the callback for further API call.
     */
    constructor(type, callback, rest, gaxServerStreamingRetries) {
      super(void 0, void 0, {
        objectMode: true,
        readable: type !== StreamType.CLIENT_STREAMING,
        writable: type !== StreamType.SERVER_STREAMING
      });
      this.type = type;
      this._callback = callback;
      this._isCancelCalled = false;
      this._responseHasSent = false;
      this.rest = rest;
      this.gaxServerStreamingRetries = gaxServerStreamingRetries;
    }
    shouldRetryRequest(error, retry) {
      const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
      let shouldRetry = this.defaultShouldRetry(e, retry);
      if (retry.shouldRetryFn) {
        shouldRetry = retry.shouldRetryFn(e);
      }
      return shouldRetry;
    }
    cancel() {
      if (this.stream) {
        this.stream.cancel();
      } else {
        this._isCancelCalled = true;
      }
    }
    /**
     * Helper function to handle total timeout + max retry check for server streaming retries
     * @param {number} deadline - the current retry deadline
     * @param {number} maxRetries - maximum total number of retries
     * @param {number} totalTimeoutMillis - total timeout in milliseconds used in timeout calculation
     * @param {GoogleError} originalError - underlying error received by the stream
     * @param {originalTimeout} originalTimeout - the original Timeout set in backoff settings
     * @param {retries} retries - the number of retries the call has made so far
     */
    throwIfMaxRetriesOrTotalTimeoutExceeded(deadline, maxRetries, totalTimeoutMillis, originalError, originalTimeout, retries2) {
      const now = /* @__PURE__ */ new Date();
      const nowTime = now.getTime();
      if (originalTimeout && (totalTimeoutMillis === 0 || totalTimeoutMillis < 0 || deadline && nowTime >= deadline)) {
        const error = new googleError_1.GoogleError(`Total timeout of API exceeded ${originalTimeout} milliseconds ${originalError ? `retrying error ${originalError} ` : ""} before any response was received.`);
        error.code = status_1.Status.DEADLINE_EXCEEDED;
        throw error;
      }
      if (maxRetries === 0) {
        const error = originalError;
        error.note = "Max retries is set to zero.";
        throw error;
      }
      if (retries2 && retries2 >= maxRetries) {
        const error = new googleError_1.GoogleError("Exceeded maximum number of retries " + (originalError ? `retrying error ${originalError} ` : "") + "before any response was received");
        error.code = status_1.Status.DEADLINE_EXCEEDED;
        throw error;
      }
    }
    /**
     * Forwards events from an API request stream to the user's stream.
     * @param {Stream} stream - The API request stream.
     */
    eventForwardHelper(stream) {
      const eventsToForward = ["metadata", "response", "status"];
      eventsToForward.forEach((event) => {
        stream.on(event, this.emit.bind(this, event));
      });
    }
    /**
     * Helper function that emits a response on the stream after either a 'metadata'
     * or a 'status' event - this helps streams to behave more like http consumers expect
     * @param {Stream} stream - The API request stream.
     */
    statusMetadataHelper(stream) {
      stream.on("status", () => {
        if (!this._responseHasSent) {
          stream.emit("response", {
            code: 200,
            details: "",
            message: "OK"
          });
        }
      });
      stream.on("metadata", (metadata) => {
        stream.emit("response", {
          code: 200,
          details: "",
          message: "OK",
          metadata
        });
        this._responseHasSent = true;
      });
    }
    /**
     * Forward events from an API request stream to the user's stream.
     *  gRPC is guaranteed emit the 'status' event but not 'metadata'
     * 'status' is the last event to emit; if 'metadata' emits, it will
     * be the first event to emit. It should only emit once; if it emits
     * more than once, unexpected side effects will occur.
     *
     * @param {Stream} stream - The API request stream.
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    forwardEvents(stream) {
      this.eventForwardHelper(stream);
      this.statusMetadataHelper(stream);
      stream.on("error", (error) => {
        googleError_1.GoogleError.parseGRPCStatusDetails(error);
      });
    }
    /**
     * Default mechanism for determining whether a streaming call should retry
     * If a user passes in a "shouldRetryFn", this will not be used
     * @param {GoogleError} errpr - The error we need to determine is retryable or not
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    defaultShouldRetry(error, retry) {
      if (retry.retryCodes.length > 0 && retry.retryCodes.indexOf(error.code) < 0 || retry.retryCodes.length === 0) {
        return false;
      }
      return true;
    }
    /**
     * Specifies the target stream.
     * @param {ApiCall} apiCall - the API function to be called.
     * @param {Object} argument - the argument to be passed to the apiCall.
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    setStream(apiCall, argument, retryRequestOptions = {}, retry) {
      this.apiCall = apiCall;
      this.argument = argument;
      if (this.type === StreamType.SERVER_STREAMING) {
        if (this.rest) {
          const stream2 = apiCall(argument, this._callback);
          this.stream = stream2;
          this.setReadable(stream2);
        } else if (this.gaxServerStreamingRetries) {
          const request = () => {
            if (this._isCancelCalled) {
              if (this.stream) {
                this.stream.cancel();
              }
              return;
            }
            const stream2 = apiCall(argument, this._callback);
            return stream2;
          };
          const retryStream = this.newStreamingRetryRequest({ request, retry });
          this.stream = retryStream;
          this.eventForwardHelper(retryStream);
          this.setReadable(retryStream);
        } else {
          const retryStream = retryRequest(null, {
            objectMode: true,
            request: () => {
              if (this._isCancelCalled) {
                if (this.stream) {
                  this.stream.cancel();
                }
                return;
              }
              const stream2 = apiCall(argument, this._callback);
              this.stream = stream2;
              this.forwardEvents(stream2);
              return stream2;
            },
            retries: retryRequestOptions.retries,
            currentRetryAttempt: retryRequestOptions.currentRetryAttempt,
            noResponseRetries: retryRequestOptions.noResponseRetries,
            shouldRetryFn: retryRequestOptions.shouldRetryFn
          });
          this.setReadable(retryStream);
        }
        return;
      }
      const stream = apiCall(argument, this._callback);
      this.stream = stream;
      this.forwardEvents(stream);
      if (this.type === StreamType.CLIENT_STREAMING) {
        this.setWritable(stream);
      }
      if (this.type === StreamType.BIDI_STREAMING) {
        this.setReadable(stream);
        this.setWritable(stream);
      }
      if (this._isCancelCalled && this.stream) {
        this.stream.cancel();
      }
    }
    /**
     * Creates a new retry request stream -
     *inner arrow function "newMakeRequest" handles retrying and resumption
     * @param {streamingRetryRequestOptions} opts
     *   {request} - the request to be made if the stream errors
     *   {retry} - the retry options associated with the call
     * @returns {CancellableStream} - the stream that handles retry logic
     */
    newStreamingRetryRequest(opts) {
      const retry = opts.retry ?? {
        retryCodes: [],
        backoffSettings: (0, gax_1.createDefaultBackoffSettings)()
      };
      let retries2 = 0;
      const retryStream = new stream_1.PassThrough({
        objectMode: true
      });
      const totalTimeout = retry.backoffSettings.totalTimeoutMillis ?? void 0;
      const maxRetries = retry.backoffSettings.maxRetries ?? void 0;
      let timeout2 = retry.backoffSettings.initialRpcTimeoutMillis ?? void 0;
      let now = /* @__PURE__ */ new Date();
      let deadline = 0;
      if (totalTimeout) {
        deadline = now.getTime() + totalTimeout;
      }
      const transientErrorHelper = (error, requestStream) => {
        const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
        e.note = "Exception occurred in retry method that was not classified as transient";
        requestStream.destroy();
        retryStream.destroy(e);
        return retryStream;
      };
      const newMakeRequest = (newopts) => {
        let dataEnd = false;
        let statusReceived = false;
        let enteredError = false;
        const requestStream = newopts.request(requestOps);
        retryStream.cancel = requestStream.cancel;
        const eventsToForward = ["metadata", "response", "status"];
        eventsToForward.forEach((event) => {
          requestStream.on(event, retryStream.emit.bind(retryStream, event));
        });
        this.statusMetadataHelper(requestStream);
        requestStream.on("data", (data) => {
          retries2 = 0;
          this.emit.bind(this, "data")(data);
        });
        requestStream.on("status", () => {
          statusReceived = true;
          if (dataEnd) {
            retryStream.end();
          }
          return retryStream;
        });
        requestStream.on("end", () => {
          if (!enteredError) {
            dataEnd = true;
            if (statusReceived) {
              retryStream.end();
            }
          }
          return retryStream;
        });
        requestStream.on("error", (error) => {
          enteredError = true;
          if (typeof maxRetries !== void 0 || typeof totalTimeout !== void 0) {
            if (this.shouldRetryRequest(error, retry)) {
              if (maxRetries && totalTimeout) {
                const newError = new googleError_1.GoogleError("Cannot set both totalTimeoutMillis and maxRetries in backoffSettings.");
                newError.code = status_1.Status.INVALID_ARGUMENT;
                requestStream.destroy();
                retryStream.destroy(newError);
                return retryStream;
              } else {
                try {
                  this.throwIfMaxRetriesOrTotalTimeoutExceeded(deadline, maxRetries, timeout2, error, totalTimeout, retries2);
                } catch (error2) {
                  const e = googleError_1.GoogleError.parseGRPCStatusDetails(error2);
                  requestStream.destroy();
                  retryStream.destroy(e);
                  return retryStream;
                }
                const delayMult = retry.backoffSettings.retryDelayMultiplier;
                const maxDelay = retry.backoffSettings.maxRetryDelayMillis;
                const timeoutMult = retry.backoffSettings.rpcTimeoutMultiplier;
                const maxTimeout = retry.backoffSettings.maxRpcTimeoutMillis;
                let delay = retry.backoffSettings.initialRetryDelayMillis;
                const toSleep = Math.random() * delay;
                const calculateTimeoutAndResumptionFunction = () => {
                  setTimeout(() => {
                    if (timeout2) {
                      now = /* @__PURE__ */ new Date();
                      delay = Math.min(delay * delayMult, maxDelay);
                      const timeoutCal = timeout2 && timeoutMult ? timeout2 * timeoutMult : 0;
                      const rpcTimeout = maxTimeout ? maxTimeout : 0;
                      const newDeadline = deadline ? deadline - now.getTime() : 0;
                      timeout2 = Math.min(timeoutCal, rpcTimeout, newDeadline);
                    }
                    retries2++;
                    let retryArgument = this.argument;
                    if (retry.getResumptionRequestFn !== void 0) {
                      retryArgument = retry.getResumptionRequestFn(retryArgument);
                    }
                    const newRequest = () => {
                      if (this._isCancelCalled) {
                        if (this.stream) {
                          this.stream.cancel();
                        }
                        return;
                      }
                      const newStream = this.apiCall(retryArgument, this._callback);
                      return newStream;
                    };
                    opts.request = newRequest;
                    return newMakeRequest(opts);
                  }, toSleep);
                };
                return calculateTimeoutAndResumptionFunction();
              }
            } else {
              return transientErrorHelper(error, requestStream);
            }
          } else {
            return transientErrorHelper(error, requestStream);
          }
        });
        return retryStream;
      };
      return newMakeRequest(opts);
    }
  }
  streaming.StreamProxy = StreamProxy;
  return streaming;
}
var hasRequiredStreamingApiCaller;
function requireStreamingApiCaller() {
  if (hasRequiredStreamingApiCaller) return streamingApiCaller;
  hasRequiredStreamingApiCaller = 1;
  Object.defineProperty(streamingApiCaller, "__esModule", { value: true });
  streamingApiCaller.StreamingApiCaller = void 0;
  const warnings_1 = requireWarnings();
  const streaming_1 = requireStreaming();
  class StreamingApiCaller {
    descriptor;
    /**
     * An API caller for methods of gRPC streaming.
     * @private
     * @constructor
     * @param {StreamDescriptor} descriptor - the descriptor of the method structure.
     */
    constructor(descriptor2) {
      this.descriptor = descriptor2;
    }
    init(callback) {
      return new streaming_1.StreamProxy(this.descriptor.type, callback, this.descriptor.rest, this.descriptor.gaxStreamingRetries);
    }
    wrap(func) {
      switch (this.descriptor.type) {
        case streaming_1.StreamType.SERVER_STREAMING:
          return (argument, metadata, options) => {
            return func(argument, metadata, options);
          };
        case streaming_1.StreamType.CLIENT_STREAMING:
          return (argument, metadata, options, callback) => {
            return func(metadata, options, callback);
          };
        case streaming_1.StreamType.BIDI_STREAMING:
          return (argument, metadata, options) => {
            return func(metadata, options);
          };
        default:
          (0, warnings_1.warn)("streaming_wrap_unknown_stream_type", `Unknown stream type: ${this.descriptor.type}`);
      }
      return func;
    }
    call(apiCall, argument, settings, stream) {
      stream.setStream(apiCall, argument, settings.retryRequestOptions, settings.retry);
    }
    fail(stream, err) {
      stream.emit("error", err);
    }
    result(stream) {
      return stream;
    }
  }
  streamingApiCaller.StreamingApiCaller = StreamingApiCaller;
  return streamingApiCaller;
}
var hasRequiredCreateApiCall;
function requireCreateApiCall() {
  if (hasRequiredCreateApiCall) return createApiCall;
  hasRequiredCreateApiCall = 1;
  Object.defineProperty(createApiCall, "__esModule", { value: true });
  createApiCall.createApiCall = createApiCall$1;
  const apiCaller_1 = requireApiCaller();
  const gax_1 = requireGax();
  const retries_1 = requireRetries();
  const timeout_1 = requireTimeout();
  const streamingApiCaller_1 = requireStreamingApiCaller();
  const warnings_1 = requireWarnings();
  function createApiCall$1(func, settings, descriptor2, _fallback) {
    const funcPromise = typeof func === "function" ? Promise.resolve(func) : func;
    const apiCaller2 = (0, apiCaller_1.createAPICaller)(settings, descriptor2);
    return (request, callOptions, callback) => {
      let currentApiCaller = apiCaller2;
      let thisSettings;
      if (currentApiCaller instanceof streamingApiCaller_1.StreamingApiCaller) {
        const gaxStreamingRetries = currentApiCaller.descriptor?.gaxStreamingRetries ?? false;
        const convertedRetryOptions = (0, gax_1.convertRetryOptions)(callOptions, gaxStreamingRetries);
        thisSettings = settings.merge(convertedRetryOptions);
      } else {
        thisSettings = settings.merge(callOptions);
      }
      if (settings.isBundling && !thisSettings.isBundling) {
        currentApiCaller = (0, apiCaller_1.createAPICaller)(settings, void 0);
      }
      const ongoingCall = currentApiCaller.init(callback);
      funcPromise.then((func2) => {
        func2 = currentApiCaller.wrap(func2);
        const streaming2 = currentApiCaller.descriptor?.streaming;
        const retry = thisSettings.retry;
        if (streaming2 && retry) {
          if (retry.retryCodes.length > 0 && retry.shouldRetryFn) {
            (0, warnings_1.warn)("either_retrycodes_or_shouldretryfn", "Only one of retryCodes or shouldRetryFn may be defined. Ignoring retryCodes.");
            retry.retryCodes = [];
          }
          if (!currentApiCaller.descriptor.gaxStreamingRetries && retry.getResumptionRequestFn) {
            throw new Error("getResumptionRequestFn can only be used when gaxStreamingRetries is set to true.");
          }
        }
        if (!streaming2 && retry) {
          if (retry.shouldRetryFn) {
            throw new Error("Using a function to determine retry eligibility is only supported with server streaming calls");
          }
          if (retry.getResumptionRequestFn) {
            throw new Error("Resumption strategy can only be used with server streaming retries");
          }
          if (retry.retryCodes && retry.retryCodes.length > 0) {
            retry.backoffSettings.initialRpcTimeoutMillis ??= thisSettings.timeout;
            return (0, retries_1.retryable)(func2, thisSettings.retry, thisSettings.otherArgs, thisSettings.apiName);
          }
        }
        return (0, timeout_1.addTimeoutArg)(func2, thisSettings.timeout, thisSettings.otherArgs);
      }).then((apiCall) => {
        currentApiCaller.call(apiCall, request, thisSettings, ongoingCall);
      }).catch((err) => {
        currentApiCaller.fail(ongoingCall, err);
      });
      return currentApiCaller.result(ongoingCall);
    };
  }
  return createApiCall;
}
var descriptor = {};
var longRunningDescriptor = {};
var longRunningApiCaller = {};
var longrunning = {};
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var operations = { exports: {} };
var hasRequiredOperations;
function requireOperations() {
  if (hasRequiredOperations) return operations.exports;
  hasRequiredOperations = 1;
  (function(module) {
    ((e) => {
      "function" == typeof commonjsRequire && true && module && module.exports && (module.exports = e(requireMinimal()));
    })(function(o) {
      var e, t, n, F, a = o.Reader, r = o.Writer, i = o.util, p = o.roots.operations_protos || (o.roots.operations_protos = {});
      function G(e2, t2, n2) {
        o.rpc.Service.call(this, e2, t2, n2);
      }
      function l(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function B(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function s(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function u(e2) {
        if (this.operations = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function L(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function U(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function c(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function d(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function g(e2) {
        if (this.rules = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function f(e2) {
        if (this.additionalBindings = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function y(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function J(e2) {
        if (this.file = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function h(e2) {
        if (this.dependency = [], this.publicDependency = [], this.weakDependency = [], this.messageType = [], this.enumType = [], this.service = [], this.extension = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function O(e2) {
        if (this.field = [], this.extension = [], this.nestedType = [], this.enumType = [], this.extensionRange = [], this.oneofDecl = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function b(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function m(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function M(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function v(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function w(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function P(e2) {
        if (this.value = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function _(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function j(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function S(e2) {
        if (this.method = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function x(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function k(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function D(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function T(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function H(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function E(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function z(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function A(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function N(e2) {
        if (this.uninterpretedOption = [], this[".google.api.methodSignature"] = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function I(e2) {
        if (this.name = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function q(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function Y(e2) {
        if (this.location = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function R(e2) {
        if (this.path = [], this.span = [], this.leadingDetachedComments = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function W(e2) {
        if (this.annotation = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function C(e2) {
        if (this.path = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function X(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function K(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function Q(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function V(e2) {
        if (this.details = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      return p.google = ((F = {}).longrunning = ((t = {}).Operations = (((G.prototype = Object.create(o.rpc.Service.prototype)).constructor = G).create = function(e2, t2, n2) {
        return new this(e2, t2, n2);
      }, Object.defineProperty(G.prototype.listOperations = function e2(t2, n2) {
        return this.rpcCall(e2, p.google.longrunning.ListOperationsRequest, p.google.longrunning.ListOperationsResponse, t2, n2);
      }, "name", { value: "ListOperations" }), Object.defineProperty(G.prototype.getOperation = function e2(t2, n2) {
        return this.rpcCall(e2, p.google.longrunning.GetOperationRequest, p.google.longrunning.Operation, t2, n2);
      }, "name", { value: "GetOperation" }), Object.defineProperty(G.prototype.deleteOperation = function e2(t2, n2) {
        return this.rpcCall(e2, p.google.longrunning.DeleteOperationRequest, p.google.protobuf.Empty, t2, n2);
      }, "name", { value: "DeleteOperation" }), Object.defineProperty(G.prototype.cancelOperation = function e2(t2, n2) {
        return this.rpcCall(e2, p.google.longrunning.CancelOperationRequest, p.google.protobuf.Empty, t2, n2);
      }, "name", { value: "CancelOperation" }), Object.defineProperty(G.prototype.waitOperation = function e2(t2, n2) {
        return this.rpcCall(e2, p.google.longrunning.WaitOperationRequest, p.google.longrunning.Operation, t2, n2);
      }, "name", { value: "WaitOperation" }), G), t.Operation = (l.prototype.name = "", l.prototype.metadata = null, l.prototype.done = false, l.prototype.error = null, l.prototype.response = null, Object.defineProperty(l.prototype, "result", { get: i.oneOfGetter(n = ["error", "response"]), set: i.oneOfSetter(n) }), l.create = function(e2) {
        return new l(e2);
      }, l.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.metadata && Object.hasOwnProperty.call(e2, "metadata") && p.google.protobuf.Any.encode(e2.metadata, t2.uint32(18).fork()).ldelim(), null != e2.done && Object.hasOwnProperty.call(e2, "done") && t2.uint32(24).bool(e2.done), null != e2.error && Object.hasOwnProperty.call(e2, "error") && p.google.rpc.Status.encode(e2.error, t2.uint32(34).fork()).ldelim(), null != e2.response && Object.hasOwnProperty.call(e2, "response") && p.google.protobuf.Any.encode(e2.response, t2.uint32(42).fork()).ldelim(), t2;
      }, l.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, l.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.Operation(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.metadata = p.google.protobuf.Any.decode(e2, e2.uint32());
              break;
            case 3:
              o2.done = e2.bool();
              break;
            case 4:
              o2.error = p.google.rpc.Status.decode(e2, e2.uint32());
              break;
            case 5:
              o2.response = p.google.protobuf.Any.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, l.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, l.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        var t2, n2 = {};
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.metadata && e2.hasOwnProperty("metadata") && (t2 = p.google.protobuf.Any.verify(e2.metadata))) return "metadata." + t2;
        if (null != e2.done && e2.hasOwnProperty("done") && "boolean" != typeof e2.done) return "done: boolean expected";
        if (null != e2.error && e2.hasOwnProperty("error") && (n2.result = 1, t2 = p.google.rpc.Status.verify(e2.error))) return "error." + t2;
        if (null != e2.response && e2.hasOwnProperty("response")) {
          if (1 === n2.result) return "result: multiple values";
          if (n2.result = 1, t2 = p.google.protobuf.Any.verify(e2.response)) return "response." + t2;
        }
        return null;
      }, l.fromObject = function(e2) {
        if (e2 instanceof p.google.longrunning.Operation) return e2;
        var t2 = new p.google.longrunning.Operation();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.metadata) {
          if ("object" != typeof e2.metadata) throw TypeError(".google.longrunning.Operation.metadata: object expected");
          t2.metadata = p.google.protobuf.Any.fromObject(e2.metadata);
        }
        if (null != e2.done && (t2.done = Boolean(e2.done)), null != e2.error) {
          if ("object" != typeof e2.error) throw TypeError(".google.longrunning.Operation.error: object expected");
          t2.error = p.google.rpc.Status.fromObject(e2.error);
        }
        if (null != e2.response) {
          if ("object" != typeof e2.response) throw TypeError(".google.longrunning.Operation.response: object expected");
          t2.response = p.google.protobuf.Any.fromObject(e2.response);
        }
        return t2;
      }, l.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.metadata = null, n2.done = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.metadata && e2.hasOwnProperty("metadata") && (n2.metadata = p.google.protobuf.Any.toObject(e2.metadata, t2)), null != e2.done && e2.hasOwnProperty("done") && (n2.done = e2.done), null != e2.error && e2.hasOwnProperty("error") && (n2.error = p.google.rpc.Status.toObject(e2.error, t2), t2.oneofs) && (n2.result = "error"), null != e2.response && e2.hasOwnProperty("response") && (n2.response = p.google.protobuf.Any.toObject(e2.response, t2), t2.oneofs) && (n2.result = "response"), n2;
      }, l.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, l), t.GetOperationRequest = (B.prototype.name = "", B.create = function(e2) {
        return new B(e2);
      }, B.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), t2;
      }, B.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, B.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.GetOperationRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? o2.name = e2.string() : e2.skipType(7 & r2);
        }
        return o2;
      }, B.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, B.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name) ? "name: string expected" : null;
      }, B.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.longrunning.GetOperationRequest ? e2 : (t2 = new p.google.longrunning.GetOperationRequest(), null != e2.name && (t2.name = String(e2.name)), t2);
      }, B.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), n2;
      }, B.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, B), t.ListOperationsRequest = (s.prototype.name = "", s.prototype.filter = "", s.prototype.pageSize = 0, s.prototype.pageToken = "", s.create = function(e2) {
        return new s(e2);
      }, s.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.filter && Object.hasOwnProperty.call(e2, "filter") && t2.uint32(10).string(e2.filter), null != e2.pageSize && Object.hasOwnProperty.call(e2, "pageSize") && t2.uint32(16).int32(e2.pageSize), null != e2.pageToken && Object.hasOwnProperty.call(e2, "pageToken") && t2.uint32(26).string(e2.pageToken), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(34).string(e2.name), t2;
      }, s.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, s.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.ListOperationsRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 4:
              o2.name = e2.string();
              break;
            case 1:
              o2.filter = e2.string();
              break;
            case 2:
              o2.pageSize = e2.int32();
              break;
            case 3:
              o2.pageToken = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, s.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, s.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name) ? "name: string expected" : null != e2.filter && e2.hasOwnProperty("filter") && !i.isString(e2.filter) ? "filter: string expected" : null != e2.pageSize && e2.hasOwnProperty("pageSize") && !i.isInteger(e2.pageSize) ? "pageSize: integer expected" : null != e2.pageToken && e2.hasOwnProperty("pageToken") && !i.isString(e2.pageToken) ? "pageToken: string expected" : null;
      }, s.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.longrunning.ListOperationsRequest ? e2 : (t2 = new p.google.longrunning.ListOperationsRequest(), null != e2.name && (t2.name = String(e2.name)), null != e2.filter && (t2.filter = String(e2.filter)), null != e2.pageSize && (t2.pageSize = 0 | e2.pageSize), null != e2.pageToken && (t2.pageToken = String(e2.pageToken)), t2);
      }, s.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.filter = "", n2.pageSize = 0, n2.pageToken = "", n2.name = ""), null != e2.filter && e2.hasOwnProperty("filter") && (n2.filter = e2.filter), null != e2.pageSize && e2.hasOwnProperty("pageSize") && (n2.pageSize = e2.pageSize), null != e2.pageToken && e2.hasOwnProperty("pageToken") && (n2.pageToken = e2.pageToken), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), n2;
      }, s.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, s), t.ListOperationsResponse = (u.prototype.operations = i.emptyArray, u.prototype.nextPageToken = "", u.create = function(e2) {
        return new u(e2);
      }, u.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.operations && e2.operations.length) for (var n2 = 0; n2 < e2.operations.length; ++n2) p.google.longrunning.Operation.encode(e2.operations[n2], t2.uint32(10).fork()).ldelim();
        return null != e2.nextPageToken && Object.hasOwnProperty.call(e2, "nextPageToken") && t2.uint32(18).string(e2.nextPageToken), t2;
      }, u.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, u.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.ListOperationsResponse(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.operations && o2.operations.length || (o2.operations = []), o2.operations.push(p.google.longrunning.Operation.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.nextPageToken = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, u.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, u.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.operations && e2.hasOwnProperty("operations")) {
          if (!Array.isArray(e2.operations)) return "operations: array expected";
          for (var t2 = 0; t2 < e2.operations.length; ++t2) {
            var n2 = p.google.longrunning.Operation.verify(e2.operations[t2]);
            if (n2) return "operations." + n2;
          }
        }
        return null != e2.nextPageToken && e2.hasOwnProperty("nextPageToken") && !i.isString(e2.nextPageToken) ? "nextPageToken: string expected" : null;
      }, u.fromObject = function(e2) {
        if (e2 instanceof p.google.longrunning.ListOperationsResponse) return e2;
        var t2 = new p.google.longrunning.ListOperationsResponse();
        if (e2.operations) {
          if (!Array.isArray(e2.operations)) throw TypeError(".google.longrunning.ListOperationsResponse.operations: array expected");
          t2.operations = [];
          for (var n2 = 0; n2 < e2.operations.length; ++n2) {
            if ("object" != typeof e2.operations[n2]) throw TypeError(".google.longrunning.ListOperationsResponse.operations: object expected");
            t2.operations[n2] = p.google.longrunning.Operation.fromObject(e2.operations[n2]);
          }
        }
        return null != e2.nextPageToken && (t2.nextPageToken = String(e2.nextPageToken)), t2;
      }, u.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.operations = []), t2.defaults && (n2.nextPageToken = ""), e2.operations && e2.operations.length) {
          n2.operations = [];
          for (var o2 = 0; o2 < e2.operations.length; ++o2) n2.operations[o2] = p.google.longrunning.Operation.toObject(e2.operations[o2], t2);
        }
        return null != e2.nextPageToken && e2.hasOwnProperty("nextPageToken") && (n2.nextPageToken = e2.nextPageToken), n2;
      }, u.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, u), t.CancelOperationRequest = (L.prototype.name = "", L.create = function(e2) {
        return new L(e2);
      }, L.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), t2;
      }, L.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, L.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.CancelOperationRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? o2.name = e2.string() : e2.skipType(7 & r2);
        }
        return o2;
      }, L.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, L.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name) ? "name: string expected" : null;
      }, L.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.longrunning.CancelOperationRequest ? e2 : (t2 = new p.google.longrunning.CancelOperationRequest(), null != e2.name && (t2.name = String(e2.name)), t2);
      }, L.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), n2;
      }, L.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, L), t.DeleteOperationRequest = (U.prototype.name = "", U.create = function(e2) {
        return new U(e2);
      }, U.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), t2;
      }, U.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, U.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.DeleteOperationRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? o2.name = e2.string() : e2.skipType(7 & r2);
        }
        return o2;
      }, U.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, U.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name) ? "name: string expected" : null;
      }, U.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.longrunning.DeleteOperationRequest ? e2 : (t2 = new p.google.longrunning.DeleteOperationRequest(), null != e2.name && (t2.name = String(e2.name)), t2);
      }, U.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), n2;
      }, U.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, U), t.WaitOperationRequest = (c.prototype.name = "", c.prototype.timeout = null, c.create = function(e2) {
        return new c(e2);
      }, c.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.timeout && Object.hasOwnProperty.call(e2, "timeout") && p.google.protobuf.Duration.encode(e2.timeout, t2.uint32(18).fork()).ldelim(), t2;
      }, c.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, c.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.WaitOperationRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.timeout = p.google.protobuf.Duration.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, c.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, c.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.timeout && e2.hasOwnProperty("timeout")) {
          e2 = p.google.protobuf.Duration.verify(e2.timeout);
          if (e2) return "timeout." + e2;
        }
        return null;
      }, c.fromObject = function(e2) {
        if (e2 instanceof p.google.longrunning.WaitOperationRequest) return e2;
        var t2 = new p.google.longrunning.WaitOperationRequest();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.timeout) {
          if ("object" != typeof e2.timeout) throw TypeError(".google.longrunning.WaitOperationRequest.timeout: object expected");
          t2.timeout = p.google.protobuf.Duration.fromObject(e2.timeout);
        }
        return t2;
      }, c.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.timeout = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.timeout && e2.hasOwnProperty("timeout") && (n2.timeout = p.google.protobuf.Duration.toObject(e2.timeout, t2)), n2;
      }, c.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, c), t.OperationInfo = (d.prototype.responseType = "", d.prototype.metadataType = "", d.create = function(e2) {
        return new d(e2);
      }, d.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.responseType && Object.hasOwnProperty.call(e2, "responseType") && t2.uint32(10).string(e2.responseType), null != e2.metadataType && Object.hasOwnProperty.call(e2, "metadataType") && t2.uint32(18).string(e2.metadataType), t2;
      }, d.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, d.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.longrunning.OperationInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.responseType = e2.string();
              break;
            case 2:
              o2.metadataType = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, d.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, d.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.responseType && e2.hasOwnProperty("responseType") && !i.isString(e2.responseType) ? "responseType: string expected" : null != e2.metadataType && e2.hasOwnProperty("metadataType") && !i.isString(e2.metadataType) ? "metadataType: string expected" : null;
      }, d.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.longrunning.OperationInfo ? e2 : (t2 = new p.google.longrunning.OperationInfo(), null != e2.responseType && (t2.responseType = String(e2.responseType)), null != e2.metadataType && (t2.metadataType = String(e2.metadataType)), t2);
      }, d.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.responseType = "", n2.metadataType = ""), null != e2.responseType && e2.hasOwnProperty("responseType") && (n2.responseType = e2.responseType), null != e2.metadataType && e2.hasOwnProperty("metadataType") && (n2.metadataType = e2.metadataType), n2;
      }, d.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, d), t), F.api = ((n = {}).Http = (g.prototype.rules = i.emptyArray, g.prototype.fullyDecodeReservedExpansion = false, g.create = function(e2) {
        return new g(e2);
      }, g.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.rules && e2.rules.length) for (var n2 = 0; n2 < e2.rules.length; ++n2) p.google.api.HttpRule.encode(e2.rules[n2], t2.uint32(10).fork()).ldelim();
        return null != e2.fullyDecodeReservedExpansion && Object.hasOwnProperty.call(e2, "fullyDecodeReservedExpansion") && t2.uint32(16).bool(e2.fullyDecodeReservedExpansion), t2;
      }, g.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, g.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.api.Http(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.rules && o2.rules.length || (o2.rules = []), o2.rules.push(p.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.fullyDecodeReservedExpansion = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, g.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, g.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.rules && e2.hasOwnProperty("rules")) {
          if (!Array.isArray(e2.rules)) return "rules: array expected";
          for (var t2 = 0; t2 < e2.rules.length; ++t2) {
            var n2 = p.google.api.HttpRule.verify(e2.rules[t2]);
            if (n2) return "rules." + n2;
          }
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && "boolean" != typeof e2.fullyDecodeReservedExpansion ? "fullyDecodeReservedExpansion: boolean expected" : null;
      }, g.fromObject = function(e2) {
        if (e2 instanceof p.google.api.Http) return e2;
        var t2 = new p.google.api.Http();
        if (e2.rules) {
          if (!Array.isArray(e2.rules)) throw TypeError(".google.api.Http.rules: array expected");
          t2.rules = [];
          for (var n2 = 0; n2 < e2.rules.length; ++n2) {
            if ("object" != typeof e2.rules[n2]) throw TypeError(".google.api.Http.rules: object expected");
            t2.rules[n2] = p.google.api.HttpRule.fromObject(e2.rules[n2]);
          }
        }
        return null != e2.fullyDecodeReservedExpansion && (t2.fullyDecodeReservedExpansion = Boolean(e2.fullyDecodeReservedExpansion)), t2;
      }, g.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.rules = []), t2.defaults && (n2.fullyDecodeReservedExpansion = false), e2.rules && e2.rules.length) {
          n2.rules = [];
          for (var o2 = 0; o2 < e2.rules.length; ++o2) n2.rules[o2] = p.google.api.HttpRule.toObject(e2.rules[o2], t2);
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && (n2.fullyDecodeReservedExpansion = e2.fullyDecodeReservedExpansion), n2;
      }, g.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, g), n.HttpRule = (f.prototype.selector = "", f.prototype.get = "", f.prototype.put = "", f.prototype.post = "", f.prototype.delete = "", f.prototype.patch = "", f.prototype.custom = null, f.prototype.body = "", f.prototype.responseBody = "", f.prototype.additionalBindings = i.emptyArray, Object.defineProperty(f.prototype, "pattern", { get: i.oneOfGetter(t = ["get", "put", "post", "delete", "patch", "custom"]), set: i.oneOfSetter(t) }), f.create = function(e2) {
        return new f(e2);
      }, f.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.selector && Object.hasOwnProperty.call(e2, "selector") && t2.uint32(10).string(e2.selector), null != e2.get && Object.hasOwnProperty.call(e2, "get") && t2.uint32(18).string(e2.get), null != e2.put && Object.hasOwnProperty.call(e2, "put") && t2.uint32(26).string(e2.put), null != e2.post && Object.hasOwnProperty.call(e2, "post") && t2.uint32(34).string(e2.post), null != e2.delete && Object.hasOwnProperty.call(e2, "delete") && t2.uint32(42).string(e2.delete), null != e2.patch && Object.hasOwnProperty.call(e2, "patch") && t2.uint32(50).string(e2.patch), null != e2.body && Object.hasOwnProperty.call(e2, "body") && t2.uint32(58).string(e2.body), null != e2.custom && Object.hasOwnProperty.call(e2, "custom") && p.google.api.CustomHttpPattern.encode(e2.custom, t2.uint32(66).fork()).ldelim(), null != e2.additionalBindings && e2.additionalBindings.length) for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) p.google.api.HttpRule.encode(e2.additionalBindings[n2], t2.uint32(90).fork()).ldelim();
        return null != e2.responseBody && Object.hasOwnProperty.call(e2, "responseBody") && t2.uint32(98).string(e2.responseBody), t2;
      }, f.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, f.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.api.HttpRule(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.selector = e2.string();
              break;
            case 2:
              o2.get = e2.string();
              break;
            case 3:
              o2.put = e2.string();
              break;
            case 4:
              o2.post = e2.string();
              break;
            case 5:
              o2.delete = e2.string();
              break;
            case 6:
              o2.patch = e2.string();
              break;
            case 8:
              o2.custom = p.google.api.CustomHttpPattern.decode(e2, e2.uint32());
              break;
            case 7:
              o2.body = e2.string();
              break;
            case 12:
              o2.responseBody = e2.string();
              break;
            case 11:
              o2.additionalBindings && o2.additionalBindings.length || (o2.additionalBindings = []), o2.additionalBindings.push(p.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, f.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, f.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        var t2 = {};
        if (null != e2.selector && e2.hasOwnProperty("selector") && !i.isString(e2.selector)) return "selector: string expected";
        if (null != e2.get && e2.hasOwnProperty("get") && (t2.pattern = 1, !i.isString(e2.get))) return "get: string expected";
        if (null != e2.put && e2.hasOwnProperty("put")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !i.isString(e2.put)) return "put: string expected";
        }
        if (null != e2.post && e2.hasOwnProperty("post")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !i.isString(e2.post)) return "post: string expected";
        }
        if (null != e2.delete && e2.hasOwnProperty("delete")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !i.isString(e2.delete)) return "delete: string expected";
        }
        if (null != e2.patch && e2.hasOwnProperty("patch")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !i.isString(e2.patch)) return "patch: string expected";
        }
        if (null != e2.custom && e2.hasOwnProperty("custom")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, n2 = p.google.api.CustomHttpPattern.verify(e2.custom)) return "custom." + n2;
        }
        if (null != e2.body && e2.hasOwnProperty("body") && !i.isString(e2.body)) return "body: string expected";
        if (null != e2.responseBody && e2.hasOwnProperty("responseBody") && !i.isString(e2.responseBody)) return "responseBody: string expected";
        if (null != e2.additionalBindings && e2.hasOwnProperty("additionalBindings")) {
          if (!Array.isArray(e2.additionalBindings)) return "additionalBindings: array expected";
          for (var n2, o2 = 0; o2 < e2.additionalBindings.length; ++o2) if (n2 = p.google.api.HttpRule.verify(e2.additionalBindings[o2])) return "additionalBindings." + n2;
        }
        return null;
      }, f.fromObject = function(e2) {
        if (e2 instanceof p.google.api.HttpRule) return e2;
        var t2 = new p.google.api.HttpRule();
        if (null != e2.selector && (t2.selector = String(e2.selector)), null != e2.get && (t2.get = String(e2.get)), null != e2.put && (t2.put = String(e2.put)), null != e2.post && (t2.post = String(e2.post)), null != e2.delete && (t2.delete = String(e2.delete)), null != e2.patch && (t2.patch = String(e2.patch)), null != e2.custom) {
          if ("object" != typeof e2.custom) throw TypeError(".google.api.HttpRule.custom: object expected");
          t2.custom = p.google.api.CustomHttpPattern.fromObject(e2.custom);
        }
        if (null != e2.body && (t2.body = String(e2.body)), null != e2.responseBody && (t2.responseBody = String(e2.responseBody)), e2.additionalBindings) {
          if (!Array.isArray(e2.additionalBindings)) throw TypeError(".google.api.HttpRule.additionalBindings: array expected");
          t2.additionalBindings = [];
          for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) {
            if ("object" != typeof e2.additionalBindings[n2]) throw TypeError(".google.api.HttpRule.additionalBindings: object expected");
            t2.additionalBindings[n2] = p.google.api.HttpRule.fromObject(e2.additionalBindings[n2]);
          }
        }
        return t2;
      }, f.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.additionalBindings = []), t2.defaults && (n2.selector = "", n2.body = "", n2.responseBody = ""), null != e2.selector && e2.hasOwnProperty("selector") && (n2.selector = e2.selector), null != e2.get && e2.hasOwnProperty("get") && (n2.get = e2.get, t2.oneofs) && (n2.pattern = "get"), null != e2.put && e2.hasOwnProperty("put") && (n2.put = e2.put, t2.oneofs) && (n2.pattern = "put"), null != e2.post && e2.hasOwnProperty("post") && (n2.post = e2.post, t2.oneofs) && (n2.pattern = "post"), null != e2.delete && e2.hasOwnProperty("delete") && (n2.delete = e2.delete, t2.oneofs) && (n2.pattern = "delete"), null != e2.patch && e2.hasOwnProperty("patch") && (n2.patch = e2.patch, t2.oneofs) && (n2.pattern = "patch"), null != e2.body && e2.hasOwnProperty("body") && (n2.body = e2.body), null != e2.custom && e2.hasOwnProperty("custom") && (n2.custom = p.google.api.CustomHttpPattern.toObject(e2.custom, t2), t2.oneofs) && (n2.pattern = "custom"), e2.additionalBindings && e2.additionalBindings.length) {
          n2.additionalBindings = [];
          for (var o2 = 0; o2 < e2.additionalBindings.length; ++o2) n2.additionalBindings[o2] = p.google.api.HttpRule.toObject(e2.additionalBindings[o2], t2);
        }
        return null != e2.responseBody && e2.hasOwnProperty("responseBody") && (n2.responseBody = e2.responseBody), n2;
      }, f.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, f), n.CustomHttpPattern = (y.prototype.kind = "", y.prototype.path = "", y.create = function(e2) {
        return new y(e2);
      }, y.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.kind && Object.hasOwnProperty.call(e2, "kind") && t2.uint32(10).string(e2.kind), null != e2.path && Object.hasOwnProperty.call(e2, "path") && t2.uint32(18).string(e2.path), t2;
      }, y.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, y.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.api.CustomHttpPattern(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.kind = e2.string();
              break;
            case 2:
              o2.path = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, y.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, y.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.kind && e2.hasOwnProperty("kind") && !i.isString(e2.kind) ? "kind: string expected" : null != e2.path && e2.hasOwnProperty("path") && !i.isString(e2.path) ? "path: string expected" : null;
      }, y.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.api.CustomHttpPattern ? e2 : (t2 = new p.google.api.CustomHttpPattern(), null != e2.kind && (t2.kind = String(e2.kind)), null != e2.path && (t2.path = String(e2.path)), t2);
      }, y.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.kind = "", n2.path = ""), null != e2.kind && e2.hasOwnProperty("kind") && (n2.kind = e2.kind), null != e2.path && e2.hasOwnProperty("path") && (n2.path = e2.path), n2;
      }, y.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, y), n), F.protobuf = ((t = {}).FileDescriptorSet = (J.prototype.file = i.emptyArray, J.create = function(e2) {
        return new J(e2);
      }, J.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.file && e2.file.length) for (var n2 = 0; n2 < e2.file.length; ++n2) p.google.protobuf.FileDescriptorProto.encode(e2.file[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, J.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, J.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.FileDescriptorSet(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.file && o2.file.length || (o2.file = []), o2.file.push(p.google.protobuf.FileDescriptorProto.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, J.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, J.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.file && e2.hasOwnProperty("file")) {
          if (!Array.isArray(e2.file)) return "file: array expected";
          for (var t2 = 0; t2 < e2.file.length; ++t2) {
            var n2 = p.google.protobuf.FileDescriptorProto.verify(e2.file[t2]);
            if (n2) return "file." + n2;
          }
        }
        return null;
      }, J.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.FileDescriptorSet) return e2;
        var t2 = new p.google.protobuf.FileDescriptorSet();
        if (e2.file) {
          if (!Array.isArray(e2.file)) throw TypeError(".google.protobuf.FileDescriptorSet.file: array expected");
          t2.file = [];
          for (var n2 = 0; n2 < e2.file.length; ++n2) {
            if ("object" != typeof e2.file[n2]) throw TypeError(".google.protobuf.FileDescriptorSet.file: object expected");
            t2.file[n2] = p.google.protobuf.FileDescriptorProto.fromObject(e2.file[n2]);
          }
        }
        return t2;
      }, J.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.file = []), e2.file && e2.file.length) {
          n2.file = [];
          for (var o2 = 0; o2 < e2.file.length; ++o2) n2.file[o2] = p.google.protobuf.FileDescriptorProto.toObject(e2.file[o2], t2);
        }
        return n2;
      }, J.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, J), t.FileDescriptorProto = (h.prototype.name = "", h.prototype.package = "", h.prototype.dependency = i.emptyArray, h.prototype.publicDependency = i.emptyArray, h.prototype.weakDependency = i.emptyArray, h.prototype.messageType = i.emptyArray, h.prototype.enumType = i.emptyArray, h.prototype.service = i.emptyArray, h.prototype.extension = i.emptyArray, h.prototype.options = null, h.prototype.sourceCodeInfo = null, h.prototype.syntax = "", h.create = function(e2) {
        return new h(e2);
      }, h.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.package && Object.hasOwnProperty.call(e2, "package") && t2.uint32(18).string(e2.package), null != e2.dependency && e2.dependency.length) for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.uint32(26).string(e2.dependency[n2]);
        if (null != e2.messageType && e2.messageType.length) for (n2 = 0; n2 < e2.messageType.length; ++n2) p.google.protobuf.DescriptorProto.encode(e2.messageType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) p.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.service && e2.service.length) for (n2 = 0; n2 < e2.service.length; ++n2) p.google.protobuf.ServiceDescriptorProto.encode(e2.service[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) p.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(58).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.FileOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.sourceCodeInfo && Object.hasOwnProperty.call(e2, "sourceCodeInfo") && p.google.protobuf.SourceCodeInfo.encode(e2.sourceCodeInfo, t2.uint32(74).fork()).ldelim(), null != e2.publicDependency && e2.publicDependency.length) for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.uint32(80).int32(e2.publicDependency[n2]);
        if (null != e2.weakDependency && e2.weakDependency.length) for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.uint32(88).int32(e2.weakDependency[n2]);
        return null != e2.syntax && Object.hasOwnProperty.call(e2, "syntax") && t2.uint32(98).string(e2.syntax), t2;
      }, h.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, h.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.FileDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.package = e2.string();
              break;
            case 3:
              o2.dependency && o2.dependency.length || (o2.dependency = []), o2.dependency.push(e2.string());
              break;
            case 10:
              if (o2.publicDependency && o2.publicDependency.length || (o2.publicDependency = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.publicDependency.push(e2.int32());
              else o2.publicDependency.push(e2.int32());
              break;
            case 11:
              if (o2.weakDependency && o2.weakDependency.length || (o2.weakDependency = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.weakDependency.push(e2.int32());
              else o2.weakDependency.push(e2.int32());
              break;
            case 4:
              o2.messageType && o2.messageType.length || (o2.messageType = []), o2.messageType.push(p.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(p.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.service && o2.service.length || (o2.service = []), o2.service.push(p.google.protobuf.ServiceDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(p.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.options = p.google.protobuf.FileOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.sourceCodeInfo = p.google.protobuf.SourceCodeInfo.decode(e2, e2.uint32());
              break;
            case 12:
              o2.syntax = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, h.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, h.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.package && e2.hasOwnProperty("package") && !i.isString(e2.package)) return "package: string expected";
        if (null != e2.dependency && e2.hasOwnProperty("dependency")) {
          if (!Array.isArray(e2.dependency)) return "dependency: array expected";
          for (var t2 = 0; t2 < e2.dependency.length; ++t2) if (!i.isString(e2.dependency[t2])) return "dependency: string[] expected";
        }
        if (null != e2.publicDependency && e2.hasOwnProperty("publicDependency")) {
          if (!Array.isArray(e2.publicDependency)) return "publicDependency: array expected";
          for (t2 = 0; t2 < e2.publicDependency.length; ++t2) if (!i.isInteger(e2.publicDependency[t2])) return "publicDependency: integer[] expected";
        }
        if (null != e2.weakDependency && e2.hasOwnProperty("weakDependency")) {
          if (!Array.isArray(e2.weakDependency)) return "weakDependency: array expected";
          for (t2 = 0; t2 < e2.weakDependency.length; ++t2) if (!i.isInteger(e2.weakDependency[t2])) return "weakDependency: integer[] expected";
        }
        if (null != e2.messageType && e2.hasOwnProperty("messageType")) {
          if (!Array.isArray(e2.messageType)) return "messageType: array expected";
          for (t2 = 0; t2 < e2.messageType.length; ++t2) if (n2 = p.google.protobuf.DescriptorProto.verify(e2.messageType[t2])) return "messageType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = p.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.service && e2.hasOwnProperty("service")) {
          if (!Array.isArray(e2.service)) return "service: array expected";
          for (t2 = 0; t2 < e2.service.length; ++t2) if (n2 = p.google.protobuf.ServiceDescriptorProto.verify(e2.service[t2])) return "service." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = p.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = p.google.protobuf.FileOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2 = p.google.protobuf.SourceCodeInfo.verify(e2.sourceCodeInfo))) return "sourceCodeInfo." + n2;
        return null != e2.syntax && e2.hasOwnProperty("syntax") && !i.isString(e2.syntax) ? "syntax: string expected" : null;
      }, h.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.FileDescriptorProto) return e2;
        var t2 = new p.google.protobuf.FileDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.package && (t2.package = String(e2.package)), e2.dependency) {
          if (!Array.isArray(e2.dependency)) throw TypeError(".google.protobuf.FileDescriptorProto.dependency: array expected");
          t2.dependency = [];
          for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.dependency[n2] = String(e2.dependency[n2]);
        }
        if (e2.publicDependency) {
          if (!Array.isArray(e2.publicDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.publicDependency: array expected");
          t2.publicDependency = [];
          for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.publicDependency[n2] = 0 | e2.publicDependency[n2];
        }
        if (e2.weakDependency) {
          if (!Array.isArray(e2.weakDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.weakDependency: array expected");
          t2.weakDependency = [];
          for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.weakDependency[n2] = 0 | e2.weakDependency[n2];
        }
        if (e2.messageType) {
          if (!Array.isArray(e2.messageType)) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: array expected");
          t2.messageType = [];
          for (n2 = 0; n2 < e2.messageType.length; ++n2) {
            if ("object" != typeof e2.messageType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: object expected");
            t2.messageType[n2] = p.google.protobuf.DescriptorProto.fromObject(e2.messageType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: object expected");
            t2.enumType[n2] = p.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.service) {
          if (!Array.isArray(e2.service)) throw TypeError(".google.protobuf.FileDescriptorProto.service: array expected");
          t2.service = [];
          for (n2 = 0; n2 < e2.service.length; ++n2) {
            if ("object" != typeof e2.service[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.service: object expected");
            t2.service[n2] = p.google.protobuf.ServiceDescriptorProto.fromObject(e2.service[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.FileDescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.extension: object expected");
            t2.extension[n2] = p.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FileDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.FileOptions.fromObject(e2.options);
        }
        if (null != e2.sourceCodeInfo) {
          if ("object" != typeof e2.sourceCodeInfo) throw TypeError(".google.protobuf.FileDescriptorProto.sourceCodeInfo: object expected");
          t2.sourceCodeInfo = p.google.protobuf.SourceCodeInfo.fromObject(e2.sourceCodeInfo);
        }
        return null != e2.syntax && (t2.syntax = String(e2.syntax)), t2;
      }, h.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.dependency = [], n2.messageType = [], n2.enumType = [], n2.service = [], n2.extension = [], n2.publicDependency = [], n2.weakDependency = []), t2.defaults && (n2.name = "", n2.package = "", n2.options = null, n2.sourceCodeInfo = null, n2.syntax = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.package && e2.hasOwnProperty("package") && (n2.package = e2.package), e2.dependency && e2.dependency.length) {
          n2.dependency = [];
          for (var o2 = 0; o2 < e2.dependency.length; ++o2) n2.dependency[o2] = e2.dependency[o2];
        }
        if (e2.messageType && e2.messageType.length) {
          n2.messageType = [];
          for (o2 = 0; o2 < e2.messageType.length; ++o2) n2.messageType[o2] = p.google.protobuf.DescriptorProto.toObject(e2.messageType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = p.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.service && e2.service.length) {
          n2.service = [];
          for (o2 = 0; o2 < e2.service.length; ++o2) n2.service[o2] = p.google.protobuf.ServiceDescriptorProto.toObject(e2.service[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = p.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.FileOptions.toObject(e2.options, t2)), null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2.sourceCodeInfo = p.google.protobuf.SourceCodeInfo.toObject(e2.sourceCodeInfo, t2)), e2.publicDependency && e2.publicDependency.length) {
          n2.publicDependency = [];
          for (o2 = 0; o2 < e2.publicDependency.length; ++o2) n2.publicDependency[o2] = e2.publicDependency[o2];
        }
        if (e2.weakDependency && e2.weakDependency.length) {
          n2.weakDependency = [];
          for (o2 = 0; o2 < e2.weakDependency.length; ++o2) n2.weakDependency[o2] = e2.weakDependency[o2];
        }
        return null != e2.syntax && e2.hasOwnProperty("syntax") && (n2.syntax = e2.syntax), n2;
      }, h.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, h), t.DescriptorProto = (O.prototype.name = "", O.prototype.field = i.emptyArray, O.prototype.extension = i.emptyArray, O.prototype.nestedType = i.emptyArray, O.prototype.enumType = i.emptyArray, O.prototype.extensionRange = i.emptyArray, O.prototype.oneofDecl = i.emptyArray, O.prototype.options = null, O.prototype.reservedRange = i.emptyArray, O.prototype.reservedName = i.emptyArray, O.create = function(e2) {
        return new O(e2);
      }, O.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.field && e2.field.length) for (var n2 = 0; n2 < e2.field.length; ++n2) p.google.protobuf.FieldDescriptorProto.encode(e2.field[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.nestedType && e2.nestedType.length) for (n2 = 0; n2 < e2.nestedType.length; ++n2) p.google.protobuf.DescriptorProto.encode(e2.nestedType[n2], t2.uint32(26).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) p.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.extensionRange && e2.extensionRange.length) for (n2 = 0; n2 < e2.extensionRange.length; ++n2) p.google.protobuf.DescriptorProto.ExtensionRange.encode(e2.extensionRange[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) p.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.MessageOptions.encode(e2.options, t2.uint32(58).fork()).ldelim(), null != e2.oneofDecl && e2.oneofDecl.length) for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) p.google.protobuf.OneofDescriptorProto.encode(e2.oneofDecl[n2], t2.uint32(66).fork()).ldelim();
        if (null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) p.google.protobuf.DescriptorProto.ReservedRange.encode(e2.reservedRange[n2], t2.uint32(74).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(82).string(e2.reservedName[n2]);
        return t2;
      }, O.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, O.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.DescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.field && o2.field.length || (o2.field = []), o2.field.push(p.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(p.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.nestedType && o2.nestedType.length || (o2.nestedType = []), o2.nestedType.push(p.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 4:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(p.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.extensionRange && o2.extensionRange.length || (o2.extensionRange = []), o2.extensionRange.push(p.google.protobuf.DescriptorProto.ExtensionRange.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.oneofDecl && o2.oneofDecl.length || (o2.oneofDecl = []), o2.oneofDecl.push(p.google.protobuf.OneofDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.options = p.google.protobuf.MessageOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(p.google.protobuf.DescriptorProto.ReservedRange.decode(e2, e2.uint32()));
              break;
            case 10:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, O.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, O.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.field && e2.hasOwnProperty("field")) {
          if (!Array.isArray(e2.field)) return "field: array expected";
          for (var t2 = 0; t2 < e2.field.length; ++t2) if (n2 = p.google.protobuf.FieldDescriptorProto.verify(e2.field[t2])) return "field." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = p.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        if (null != e2.nestedType && e2.hasOwnProperty("nestedType")) {
          if (!Array.isArray(e2.nestedType)) return "nestedType: array expected";
          for (t2 = 0; t2 < e2.nestedType.length; ++t2) if (n2 = p.google.protobuf.DescriptorProto.verify(e2.nestedType[t2])) return "nestedType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = p.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.extensionRange && e2.hasOwnProperty("extensionRange")) {
          if (!Array.isArray(e2.extensionRange)) return "extensionRange: array expected";
          for (t2 = 0; t2 < e2.extensionRange.length; ++t2) if (n2 = p.google.protobuf.DescriptorProto.ExtensionRange.verify(e2.extensionRange[t2])) return "extensionRange." + n2;
        }
        if (null != e2.oneofDecl && e2.hasOwnProperty("oneofDecl")) {
          if (!Array.isArray(e2.oneofDecl)) return "oneofDecl: array expected";
          for (t2 = 0; t2 < e2.oneofDecl.length; ++t2) if (n2 = p.google.protobuf.OneofDescriptorProto.verify(e2.oneofDecl[t2])) return "oneofDecl." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = p.google.protobuf.MessageOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = p.google.protobuf.DescriptorProto.ReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!i.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, O.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.DescriptorProto) return e2;
        var t2 = new p.google.protobuf.DescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.field) {
          if (!Array.isArray(e2.field)) throw TypeError(".google.protobuf.DescriptorProto.field: array expected");
          t2.field = [];
          for (var n2 = 0; n2 < e2.field.length; ++n2) {
            if ("object" != typeof e2.field[n2]) throw TypeError(".google.protobuf.DescriptorProto.field: object expected");
            t2.field[n2] = p.google.protobuf.FieldDescriptorProto.fromObject(e2.field[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.DescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.DescriptorProto.extension: object expected");
            t2.extension[n2] = p.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (e2.nestedType) {
          if (!Array.isArray(e2.nestedType)) throw TypeError(".google.protobuf.DescriptorProto.nestedType: array expected");
          t2.nestedType = [];
          for (n2 = 0; n2 < e2.nestedType.length; ++n2) {
            if ("object" != typeof e2.nestedType[n2]) throw TypeError(".google.protobuf.DescriptorProto.nestedType: object expected");
            t2.nestedType[n2] = p.google.protobuf.DescriptorProto.fromObject(e2.nestedType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.DescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.DescriptorProto.enumType: object expected");
            t2.enumType[n2] = p.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.extensionRange) {
          if (!Array.isArray(e2.extensionRange)) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: array expected");
          t2.extensionRange = [];
          for (n2 = 0; n2 < e2.extensionRange.length; ++n2) {
            if ("object" != typeof e2.extensionRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: object expected");
            t2.extensionRange[n2] = p.google.protobuf.DescriptorProto.ExtensionRange.fromObject(e2.extensionRange[n2]);
          }
        }
        if (e2.oneofDecl) {
          if (!Array.isArray(e2.oneofDecl)) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: array expected");
          t2.oneofDecl = [];
          for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) {
            if ("object" != typeof e2.oneofDecl[n2]) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: object expected");
            t2.oneofDecl[n2] = p.google.protobuf.OneofDescriptorProto.fromObject(e2.oneofDecl[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.options: object expected");
          t2.options = p.google.protobuf.MessageOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = p.google.protobuf.DescriptorProto.ReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.DescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, O.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.field = [], n2.nestedType = [], n2.enumType = [], n2.extensionRange = [], n2.extension = [], n2.oneofDecl = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.field && e2.field.length) {
          n2.field = [];
          for (var o2 = 0; o2 < e2.field.length; ++o2) n2.field[o2] = p.google.protobuf.FieldDescriptorProto.toObject(e2.field[o2], t2);
        }
        if (e2.nestedType && e2.nestedType.length) {
          n2.nestedType = [];
          for (o2 = 0; o2 < e2.nestedType.length; ++o2) n2.nestedType[o2] = p.google.protobuf.DescriptorProto.toObject(e2.nestedType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = p.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.extensionRange && e2.extensionRange.length) {
          n2.extensionRange = [];
          for (o2 = 0; o2 < e2.extensionRange.length; ++o2) n2.extensionRange[o2] = p.google.protobuf.DescriptorProto.ExtensionRange.toObject(e2.extensionRange[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = p.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.MessageOptions.toObject(e2.options, t2)), e2.oneofDecl && e2.oneofDecl.length) {
          n2.oneofDecl = [];
          for (o2 = 0; o2 < e2.oneofDecl.length; ++o2) n2.oneofDecl[o2] = p.google.protobuf.OneofDescriptorProto.toObject(e2.oneofDecl[o2], t2);
        }
        if (e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = p.google.protobuf.DescriptorProto.ReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, O.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, O.ExtensionRange = (b.prototype.start = 0, b.prototype.end = 0, b.prototype.options = null, b.create = function(e2) {
        return new b(e2);
      }, b.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.ExtensionRangeOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, b.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, b.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.DescriptorProto.ExtensionRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            case 3:
              o2.options = p.google.protobuf.ExtensionRangeOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, b.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, b.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.start && e2.hasOwnProperty("start") && !i.isInteger(e2.start)) return "start: integer expected";
        if (null != e2.end && e2.hasOwnProperty("end") && !i.isInteger(e2.end)) return "end: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = p.google.protobuf.ExtensionRangeOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, b.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.DescriptorProto.ExtensionRange) return e2;
        var t2 = new p.google.protobuf.DescriptorProto.ExtensionRange();
        if (null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.ExtensionRange.options: object expected");
          t2.options = p.google.protobuf.ExtensionRangeOptions.fromObject(e2.options);
        }
        return t2;
      }, b.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0, n2.options = null), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.ExtensionRangeOptions.toObject(e2.options, t2)), n2;
      }, b.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, b), O.ReservedRange = (m.prototype.start = 0, m.prototype.end = 0, m.create = function(e2) {
        return new m(e2);
      }, m.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, m.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, m.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.DescriptorProto.ReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, m.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, m.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !i.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !i.isInteger(e2.end) ? "end: integer expected" : null;
      }, m.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.protobuf.DescriptorProto.ReservedRange ? e2 : (t2 = new p.google.protobuf.DescriptorProto.ReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, m.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, m.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, m), O), t.ExtensionRangeOptions = (M.prototype.uninterpretedOption = i.emptyArray, M.create = function(e2) {
        return new M(e2);
      }, M.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, M.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, M.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.ExtensionRangeOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, M.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, M.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, M.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.ExtensionRangeOptions) return e2;
        var t2 = new p.google.protobuf.ExtensionRangeOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, M.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, M.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, M), t.FieldDescriptorProto = (v.prototype.name = "", v.prototype.number = 0, v.prototype.label = 1, v.prototype.type = 1, v.prototype.typeName = "", v.prototype.extendee = "", v.prototype.defaultValue = "", v.prototype.oneofIndex = 0, v.prototype.jsonName = "", v.prototype.options = null, v.prototype.proto3Optional = false, v.create = function(e2) {
        return new v(e2);
      }, v.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.extendee && Object.hasOwnProperty.call(e2, "extendee") && t2.uint32(18).string(e2.extendee), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(24).int32(e2.number), null != e2.label && Object.hasOwnProperty.call(e2, "label") && t2.uint32(32).int32(e2.label), null != e2.type && Object.hasOwnProperty.call(e2, "type") && t2.uint32(40).int32(e2.type), null != e2.typeName && Object.hasOwnProperty.call(e2, "typeName") && t2.uint32(50).string(e2.typeName), null != e2.defaultValue && Object.hasOwnProperty.call(e2, "defaultValue") && t2.uint32(58).string(e2.defaultValue), null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.FieldOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.oneofIndex && Object.hasOwnProperty.call(e2, "oneofIndex") && t2.uint32(72).int32(e2.oneofIndex), null != e2.jsonName && Object.hasOwnProperty.call(e2, "jsonName") && t2.uint32(82).string(e2.jsonName), null != e2.proto3Optional && Object.hasOwnProperty.call(e2, "proto3Optional") && t2.uint32(136).bool(e2.proto3Optional), t2;
      }, v.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, v.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.FieldDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 3:
              o2.number = e2.int32();
              break;
            case 4:
              o2.label = e2.int32();
              break;
            case 5:
              o2.type = e2.int32();
              break;
            case 6:
              o2.typeName = e2.string();
              break;
            case 2:
              o2.extendee = e2.string();
              break;
            case 7:
              o2.defaultValue = e2.string();
              break;
            case 9:
              o2.oneofIndex = e2.int32();
              break;
            case 10:
              o2.jsonName = e2.string();
              break;
            case 8:
              o2.options = p.google.protobuf.FieldOptions.decode(e2, e2.uint32());
              break;
            case 17:
              o2.proto3Optional = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, v.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, v.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !i.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.label && e2.hasOwnProperty("label")) switch (e2.label) {
          default:
            return "label: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.type && e2.hasOwnProperty("type")) switch (e2.type) {
          default:
            return "type: enum value expected";
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
        }
        if (null != e2.typeName && e2.hasOwnProperty("typeName") && !i.isString(e2.typeName)) return "typeName: string expected";
        if (null != e2.extendee && e2.hasOwnProperty("extendee") && !i.isString(e2.extendee)) return "extendee: string expected";
        if (null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && !i.isString(e2.defaultValue)) return "defaultValue: string expected";
        if (null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && !i.isInteger(e2.oneofIndex)) return "oneofIndex: integer expected";
        if (null != e2.jsonName && e2.hasOwnProperty("jsonName") && !i.isString(e2.jsonName)) return "jsonName: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = p.google.protobuf.FieldOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && "boolean" != typeof e2.proto3Optional ? "proto3Optional: boolean expected" : null;
      }, v.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.FieldDescriptorProto) return e2;
        var t2 = new p.google.protobuf.FieldDescriptorProto();
        switch (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), e2.label) {
          case "LABEL_OPTIONAL":
          case 1:
            t2.label = 1;
            break;
          case "LABEL_REQUIRED":
          case 2:
            t2.label = 2;
            break;
          case "LABEL_REPEATED":
          case 3:
            t2.label = 3;
        }
        switch (e2.type) {
          case "TYPE_DOUBLE":
          case 1:
            t2.type = 1;
            break;
          case "TYPE_FLOAT":
          case 2:
            t2.type = 2;
            break;
          case "TYPE_INT64":
          case 3:
            t2.type = 3;
            break;
          case "TYPE_UINT64":
          case 4:
            t2.type = 4;
            break;
          case "TYPE_INT32":
          case 5:
            t2.type = 5;
            break;
          case "TYPE_FIXED64":
          case 6:
            t2.type = 6;
            break;
          case "TYPE_FIXED32":
          case 7:
            t2.type = 7;
            break;
          case "TYPE_BOOL":
          case 8:
            t2.type = 8;
            break;
          case "TYPE_STRING":
          case 9:
            t2.type = 9;
            break;
          case "TYPE_GROUP":
          case 10:
            t2.type = 10;
            break;
          case "TYPE_MESSAGE":
          case 11:
            t2.type = 11;
            break;
          case "TYPE_BYTES":
          case 12:
            t2.type = 12;
            break;
          case "TYPE_UINT32":
          case 13:
            t2.type = 13;
            break;
          case "TYPE_ENUM":
          case 14:
            t2.type = 14;
            break;
          case "TYPE_SFIXED32":
          case 15:
            t2.type = 15;
            break;
          case "TYPE_SFIXED64":
          case 16:
            t2.type = 16;
            break;
          case "TYPE_SINT32":
          case 17:
            t2.type = 17;
            break;
          case "TYPE_SINT64":
          case 18:
            t2.type = 18;
        }
        if (null != e2.typeName && (t2.typeName = String(e2.typeName)), null != e2.extendee && (t2.extendee = String(e2.extendee)), null != e2.defaultValue && (t2.defaultValue = String(e2.defaultValue)), null != e2.oneofIndex && (t2.oneofIndex = 0 | e2.oneofIndex), null != e2.jsonName && (t2.jsonName = String(e2.jsonName)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FieldDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.FieldOptions.fromObject(e2.options);
        }
        return null != e2.proto3Optional && (t2.proto3Optional = Boolean(e2.proto3Optional)), t2;
      }, v.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.extendee = "", n2.number = 0, n2.label = t2.enums === String ? "LABEL_OPTIONAL" : 1, n2.type = t2.enums === String ? "TYPE_DOUBLE" : 1, n2.typeName = "", n2.defaultValue = "", n2.options = null, n2.oneofIndex = 0, n2.jsonName = "", n2.proto3Optional = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.extendee && e2.hasOwnProperty("extendee") && (n2.extendee = e2.extendee), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.label && e2.hasOwnProperty("label") && (n2.label = t2.enums === String ? p.google.protobuf.FieldDescriptorProto.Label[e2.label] : e2.label), null != e2.type && e2.hasOwnProperty("type") && (n2.type = t2.enums === String ? p.google.protobuf.FieldDescriptorProto.Type[e2.type] : e2.type), null != e2.typeName && e2.hasOwnProperty("typeName") && (n2.typeName = e2.typeName), null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && (n2.defaultValue = e2.defaultValue), null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.FieldOptions.toObject(e2.options, t2)), null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && (n2.oneofIndex = e2.oneofIndex), null != e2.jsonName && e2.hasOwnProperty("jsonName") && (n2.jsonName = e2.jsonName), null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && (n2.proto3Optional = e2.proto3Optional), n2;
      }, v.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, v.Type = (n = {}, (e = Object.create(n))[n[1] = "TYPE_DOUBLE"] = 1, e[n[2] = "TYPE_FLOAT"] = 2, e[n[3] = "TYPE_INT64"] = 3, e[n[4] = "TYPE_UINT64"] = 4, e[n[5] = "TYPE_INT32"] = 5, e[n[6] = "TYPE_FIXED64"] = 6, e[n[7] = "TYPE_FIXED32"] = 7, e[n[8] = "TYPE_BOOL"] = 8, e[n[9] = "TYPE_STRING"] = 9, e[n[10] = "TYPE_GROUP"] = 10, e[n[11] = "TYPE_MESSAGE"] = 11, e[n[12] = "TYPE_BYTES"] = 12, e[n[13] = "TYPE_UINT32"] = 13, e[n[14] = "TYPE_ENUM"] = 14, e[n[15] = "TYPE_SFIXED32"] = 15, e[n[16] = "TYPE_SFIXED64"] = 16, e[n[17] = "TYPE_SINT32"] = 17, e[n[18] = "TYPE_SINT64"] = 18, e), v.Label = (n = {}, (e = Object.create(n))[n[1] = "LABEL_OPTIONAL"] = 1, e[n[2] = "LABEL_REQUIRED"] = 2, e[n[3] = "LABEL_REPEATED"] = 3, e), v), t.OneofDescriptorProto = (w.prototype.name = "", w.prototype.options = null, w.create = function(e2) {
        return new w(e2);
      }, w.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.OneofOptions.encode(e2.options, t2.uint32(18).fork()).ldelim(), t2;
      }, w.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, w.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.OneofDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.options = p.google.protobuf.OneofOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, w.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, w.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = p.google.protobuf.OneofOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, w.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.OneofDescriptorProto) return e2;
        var t2 = new p.google.protobuf.OneofDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.OneofDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.OneofOptions.fromObject(e2.options);
        }
        return t2;
      }, w.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.OneofOptions.toObject(e2.options, t2)), n2;
      }, w.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, w), t.EnumDescriptorProto = (P.prototype.name = "", P.prototype.value = i.emptyArray, P.prototype.options = null, P.prototype.reservedRange = i.emptyArray, P.prototype.reservedName = i.emptyArray, P.create = function(e2) {
        return new P(e2);
      }, P.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.value && e2.value.length) for (var n2 = 0; n2 < e2.value.length; ++n2) p.google.protobuf.EnumValueDescriptorProto.encode(e2.value[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.EnumOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) p.google.protobuf.EnumDescriptorProto.EnumReservedRange.encode(e2.reservedRange[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(42).string(e2.reservedName[n2]);
        return t2;
      }, P.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, P.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.EnumDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.value && o2.value.length || (o2.value = []), o2.value.push(p.google.protobuf.EnumValueDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = p.google.protobuf.EnumOptions.decode(e2, e2.uint32());
              break;
            case 4:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(p.google.protobuf.EnumDescriptorProto.EnumReservedRange.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, P.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, P.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.value && e2.hasOwnProperty("value")) {
          if (!Array.isArray(e2.value)) return "value: array expected";
          for (var t2 = 0; t2 < e2.value.length; ++t2) if (n2 = p.google.protobuf.EnumValueDescriptorProto.verify(e2.value[t2])) return "value." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = p.google.protobuf.EnumOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = p.google.protobuf.EnumDescriptorProto.EnumReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!i.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, P.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.EnumDescriptorProto) return e2;
        var t2 = new p.google.protobuf.EnumDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.value) {
          if (!Array.isArray(e2.value)) throw TypeError(".google.protobuf.EnumDescriptorProto.value: array expected");
          t2.value = [];
          for (var n2 = 0; n2 < e2.value.length; ++n2) {
            if ("object" != typeof e2.value[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.value: object expected");
            t2.value[n2] = p.google.protobuf.EnumValueDescriptorProto.fromObject(e2.value[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.EnumOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = p.google.protobuf.EnumDescriptorProto.EnumReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, P.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.value = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.value && e2.value.length) {
          n2.value = [];
          for (var o2 = 0; o2 < e2.value.length; ++o2) n2.value[o2] = p.google.protobuf.EnumValueDescriptorProto.toObject(e2.value[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.EnumOptions.toObject(e2.options, t2)), e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = p.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, P.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, P.EnumReservedRange = (_.prototype.start = 0, _.prototype.end = 0, _.create = function(e2) {
        return new _(e2);
      }, _.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, _.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, _.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.EnumDescriptorProto.EnumReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, _.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, _.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !i.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !i.isInteger(e2.end) ? "end: integer expected" : null;
      }, _.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.protobuf.EnumDescriptorProto.EnumReservedRange ? e2 : (t2 = new p.google.protobuf.EnumDescriptorProto.EnumReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, _.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, _.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, _), P), t.EnumValueDescriptorProto = (j.prototype.name = "", j.prototype.number = 0, j.prototype.options = null, j.create = function(e2) {
        return new j(e2);
      }, j.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(16).int32(e2.number), null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.EnumValueOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, j.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, j.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.EnumValueDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.number = e2.int32();
              break;
            case 3:
              o2.options = p.google.protobuf.EnumValueOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, j.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, j.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !i.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = p.google.protobuf.EnumValueOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, j.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.EnumValueDescriptorProto) return e2;
        var t2 = new p.google.protobuf.EnumValueDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumValueDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.EnumValueOptions.fromObject(e2.options);
        }
        return t2;
      }, j.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.number = 0, n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.EnumValueOptions.toObject(e2.options, t2)), n2;
      }, j.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, j), t.ServiceDescriptorProto = (S.prototype.name = "", S.prototype.method = i.emptyArray, S.prototype.options = null, S.create = function(e2) {
        return new S(e2);
      }, S.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.method && e2.method.length) for (var n2 = 0; n2 < e2.method.length; ++n2) p.google.protobuf.MethodDescriptorProto.encode(e2.method[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.ServiceOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, S.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, S.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.ServiceDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.method && o2.method.length || (o2.method = []), o2.method.push(p.google.protobuf.MethodDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = p.google.protobuf.ServiceOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, S.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, S.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.method && e2.hasOwnProperty("method")) {
          if (!Array.isArray(e2.method)) return "method: array expected";
          for (var t2 = 0; t2 < e2.method.length; ++t2) if (n2 = p.google.protobuf.MethodDescriptorProto.verify(e2.method[t2])) return "method." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = p.google.protobuf.ServiceOptions.verify(e2.options))) return "options." + n2;
        return null;
      }, S.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.ServiceDescriptorProto) return e2;
        var t2 = new p.google.protobuf.ServiceDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.method) {
          if (!Array.isArray(e2.method)) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: array expected");
          t2.method = [];
          for (var n2 = 0; n2 < e2.method.length; ++n2) {
            if ("object" != typeof e2.method[n2]) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: object expected");
            t2.method[n2] = p.google.protobuf.MethodDescriptorProto.fromObject(e2.method[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.ServiceDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.ServiceOptions.fromObject(e2.options);
        }
        return t2;
      }, S.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.method = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.method && e2.method.length) {
          n2.method = [];
          for (var o2 = 0; o2 < e2.method.length; ++o2) n2.method[o2] = p.google.protobuf.MethodDescriptorProto.toObject(e2.method[o2], t2);
        }
        return null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.ServiceOptions.toObject(e2.options, t2)), n2;
      }, S.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, S), t.MethodDescriptorProto = (x.prototype.name = "", x.prototype.inputType = "", x.prototype.outputType = "", x.prototype.options = null, x.prototype.clientStreaming = false, x.prototype.serverStreaming = false, x.create = function(e2) {
        return new x(e2);
      }, x.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.inputType && Object.hasOwnProperty.call(e2, "inputType") && t2.uint32(18).string(e2.inputType), null != e2.outputType && Object.hasOwnProperty.call(e2, "outputType") && t2.uint32(26).string(e2.outputType), null != e2.options && Object.hasOwnProperty.call(e2, "options") && p.google.protobuf.MethodOptions.encode(e2.options, t2.uint32(34).fork()).ldelim(), null != e2.clientStreaming && Object.hasOwnProperty.call(e2, "clientStreaming") && t2.uint32(40).bool(e2.clientStreaming), null != e2.serverStreaming && Object.hasOwnProperty.call(e2, "serverStreaming") && t2.uint32(48).bool(e2.serverStreaming), t2;
      }, x.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, x.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.MethodDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.inputType = e2.string();
              break;
            case 3:
              o2.outputType = e2.string();
              break;
            case 4:
              o2.options = p.google.protobuf.MethodOptions.decode(e2, e2.uint32());
              break;
            case 5:
              o2.clientStreaming = e2.bool();
              break;
            case 6:
              o2.serverStreaming = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, x.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, x.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !i.isString(e2.name)) return "name: string expected";
        if (null != e2.inputType && e2.hasOwnProperty("inputType") && !i.isString(e2.inputType)) return "inputType: string expected";
        if (null != e2.outputType && e2.hasOwnProperty("outputType") && !i.isString(e2.outputType)) return "outputType: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = p.google.protobuf.MethodOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && "boolean" != typeof e2.clientStreaming ? "clientStreaming: boolean expected" : null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && "boolean" != typeof e2.serverStreaming ? "serverStreaming: boolean expected" : null;
      }, x.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.MethodDescriptorProto) return e2;
        var t2 = new p.google.protobuf.MethodDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.inputType && (t2.inputType = String(e2.inputType)), null != e2.outputType && (t2.outputType = String(e2.outputType)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.MethodDescriptorProto.options: object expected");
          t2.options = p.google.protobuf.MethodOptions.fromObject(e2.options);
        }
        return null != e2.clientStreaming && (t2.clientStreaming = Boolean(e2.clientStreaming)), null != e2.serverStreaming && (t2.serverStreaming = Boolean(e2.serverStreaming)), t2;
      }, x.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.inputType = "", n2.outputType = "", n2.options = null, n2.clientStreaming = false, n2.serverStreaming = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.inputType && e2.hasOwnProperty("inputType") && (n2.inputType = e2.inputType), null != e2.outputType && e2.hasOwnProperty("outputType") && (n2.outputType = e2.outputType), null != e2.options && e2.hasOwnProperty("options") && (n2.options = p.google.protobuf.MethodOptions.toObject(e2.options, t2)), null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && (n2.clientStreaming = e2.clientStreaming), null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && (n2.serverStreaming = e2.serverStreaming), n2;
      }, x.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, x), t.FileOptions = (k.prototype.javaPackage = "", k.prototype.javaOuterClassname = "", k.prototype.javaMultipleFiles = false, k.prototype.javaGenerateEqualsAndHash = false, k.prototype.javaStringCheckUtf8 = false, k.prototype.optimizeFor = 1, k.prototype.goPackage = "", k.prototype.ccGenericServices = false, k.prototype.javaGenericServices = false, k.prototype.pyGenericServices = false, k.prototype.phpGenericServices = false, k.prototype.deprecated = false, k.prototype.ccEnableArenas = true, k.prototype.objcClassPrefix = "", k.prototype.csharpNamespace = "", k.prototype.swiftPrefix = "", k.prototype.phpClassPrefix = "", k.prototype.phpNamespace = "", k.prototype.phpMetadataNamespace = "", k.prototype.rubyPackage = "", k.prototype.uninterpretedOption = i.emptyArray, k.create = function(e2) {
        return new k(e2);
      }, k.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.javaPackage && Object.hasOwnProperty.call(e2, "javaPackage") && t2.uint32(10).string(e2.javaPackage), null != e2.javaOuterClassname && Object.hasOwnProperty.call(e2, "javaOuterClassname") && t2.uint32(66).string(e2.javaOuterClassname), null != e2.optimizeFor && Object.hasOwnProperty.call(e2, "optimizeFor") && t2.uint32(72).int32(e2.optimizeFor), null != e2.javaMultipleFiles && Object.hasOwnProperty.call(e2, "javaMultipleFiles") && t2.uint32(80).bool(e2.javaMultipleFiles), null != e2.goPackage && Object.hasOwnProperty.call(e2, "goPackage") && t2.uint32(90).string(e2.goPackage), null != e2.ccGenericServices && Object.hasOwnProperty.call(e2, "ccGenericServices") && t2.uint32(128).bool(e2.ccGenericServices), null != e2.javaGenericServices && Object.hasOwnProperty.call(e2, "javaGenericServices") && t2.uint32(136).bool(e2.javaGenericServices), null != e2.pyGenericServices && Object.hasOwnProperty.call(e2, "pyGenericServices") && t2.uint32(144).bool(e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && Object.hasOwnProperty.call(e2, "javaGenerateEqualsAndHash") && t2.uint32(160).bool(e2.javaGenerateEqualsAndHash), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(184).bool(e2.deprecated), null != e2.javaStringCheckUtf8 && Object.hasOwnProperty.call(e2, "javaStringCheckUtf8") && t2.uint32(216).bool(e2.javaStringCheckUtf8), null != e2.ccEnableArenas && Object.hasOwnProperty.call(e2, "ccEnableArenas") && t2.uint32(248).bool(e2.ccEnableArenas), null != e2.objcClassPrefix && Object.hasOwnProperty.call(e2, "objcClassPrefix") && t2.uint32(290).string(e2.objcClassPrefix), null != e2.csharpNamespace && Object.hasOwnProperty.call(e2, "csharpNamespace") && t2.uint32(298).string(e2.csharpNamespace), null != e2.swiftPrefix && Object.hasOwnProperty.call(e2, "swiftPrefix") && t2.uint32(314).string(e2.swiftPrefix), null != e2.phpClassPrefix && Object.hasOwnProperty.call(e2, "phpClassPrefix") && t2.uint32(322).string(e2.phpClassPrefix), null != e2.phpNamespace && Object.hasOwnProperty.call(e2, "phpNamespace") && t2.uint32(330).string(e2.phpNamespace), null != e2.phpGenericServices && Object.hasOwnProperty.call(e2, "phpGenericServices") && t2.uint32(336).bool(e2.phpGenericServices), null != e2.phpMetadataNamespace && Object.hasOwnProperty.call(e2, "phpMetadataNamespace") && t2.uint32(354).string(e2.phpMetadataNamespace), null != e2.rubyPackage && Object.hasOwnProperty.call(e2, "rubyPackage") && t2.uint32(362).string(e2.rubyPackage), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, k.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, k.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.FileOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.javaPackage = e2.string();
              break;
            case 8:
              o2.javaOuterClassname = e2.string();
              break;
            case 10:
              o2.javaMultipleFiles = e2.bool();
              break;
            case 20:
              o2.javaGenerateEqualsAndHash = e2.bool();
              break;
            case 27:
              o2.javaStringCheckUtf8 = e2.bool();
              break;
            case 9:
              o2.optimizeFor = e2.int32();
              break;
            case 11:
              o2.goPackage = e2.string();
              break;
            case 16:
              o2.ccGenericServices = e2.bool();
              break;
            case 17:
              o2.javaGenericServices = e2.bool();
              break;
            case 18:
              o2.pyGenericServices = e2.bool();
              break;
            case 42:
              o2.phpGenericServices = e2.bool();
              break;
            case 23:
              o2.deprecated = e2.bool();
              break;
            case 31:
              o2.ccEnableArenas = e2.bool();
              break;
            case 36:
              o2.objcClassPrefix = e2.string();
              break;
            case 37:
              o2.csharpNamespace = e2.string();
              break;
            case 39:
              o2.swiftPrefix = e2.string();
              break;
            case 40:
              o2.phpClassPrefix = e2.string();
              break;
            case 41:
              o2.phpNamespace = e2.string();
              break;
            case 44:
              o2.phpMetadataNamespace = e2.string();
              break;
            case 45:
              o2.rubyPackage = e2.string();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, k.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, k.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && !i.isString(e2.javaPackage)) return "javaPackage: string expected";
        if (null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && !i.isString(e2.javaOuterClassname)) return "javaOuterClassname: string expected";
        if (null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && "boolean" != typeof e2.javaMultipleFiles) return "javaMultipleFiles: boolean expected";
        if (null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && "boolean" != typeof e2.javaGenerateEqualsAndHash) return "javaGenerateEqualsAndHash: boolean expected";
        if (null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && "boolean" != typeof e2.javaStringCheckUtf8) return "javaStringCheckUtf8: boolean expected";
        if (null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor")) switch (e2.optimizeFor) {
          default:
            return "optimizeFor: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.goPackage && e2.hasOwnProperty("goPackage") && !i.isString(e2.goPackage)) return "goPackage: string expected";
        if (null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && "boolean" != typeof e2.ccGenericServices) return "ccGenericServices: boolean expected";
        if (null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && "boolean" != typeof e2.javaGenericServices) return "javaGenericServices: boolean expected";
        if (null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && "boolean" != typeof e2.pyGenericServices) return "pyGenericServices: boolean expected";
        if (null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && "boolean" != typeof e2.phpGenericServices) return "phpGenericServices: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && "boolean" != typeof e2.ccEnableArenas) return "ccEnableArenas: boolean expected";
        if (null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && !i.isString(e2.objcClassPrefix)) return "objcClassPrefix: string expected";
        if (null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && !i.isString(e2.csharpNamespace)) return "csharpNamespace: string expected";
        if (null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && !i.isString(e2.swiftPrefix)) return "swiftPrefix: string expected";
        if (null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && !i.isString(e2.phpClassPrefix)) return "phpClassPrefix: string expected";
        if (null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && !i.isString(e2.phpNamespace)) return "phpNamespace: string expected";
        if (null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && !i.isString(e2.phpMetadataNamespace)) return "phpMetadataNamespace: string expected";
        if (null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && !i.isString(e2.rubyPackage)) return "rubyPackage: string expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, k.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.FileOptions) return e2;
        var t2 = new p.google.protobuf.FileOptions();
        switch (null != e2.javaPackage && (t2.javaPackage = String(e2.javaPackage)), null != e2.javaOuterClassname && (t2.javaOuterClassname = String(e2.javaOuterClassname)), null != e2.javaMultipleFiles && (t2.javaMultipleFiles = Boolean(e2.javaMultipleFiles)), null != e2.javaGenerateEqualsAndHash && (t2.javaGenerateEqualsAndHash = Boolean(e2.javaGenerateEqualsAndHash)), null != e2.javaStringCheckUtf8 && (t2.javaStringCheckUtf8 = Boolean(e2.javaStringCheckUtf8)), e2.optimizeFor) {
          case "SPEED":
          case 1:
            t2.optimizeFor = 1;
            break;
          case "CODE_SIZE":
          case 2:
            t2.optimizeFor = 2;
            break;
          case "LITE_RUNTIME":
          case 3:
            t2.optimizeFor = 3;
        }
        if (null != e2.goPackage && (t2.goPackage = String(e2.goPackage)), null != e2.ccGenericServices && (t2.ccGenericServices = Boolean(e2.ccGenericServices)), null != e2.javaGenericServices && (t2.javaGenericServices = Boolean(e2.javaGenericServices)), null != e2.pyGenericServices && (t2.pyGenericServices = Boolean(e2.pyGenericServices)), null != e2.phpGenericServices && (t2.phpGenericServices = Boolean(e2.phpGenericServices)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.ccEnableArenas && (t2.ccEnableArenas = Boolean(e2.ccEnableArenas)), null != e2.objcClassPrefix && (t2.objcClassPrefix = String(e2.objcClassPrefix)), null != e2.csharpNamespace && (t2.csharpNamespace = String(e2.csharpNamespace)), null != e2.swiftPrefix && (t2.swiftPrefix = String(e2.swiftPrefix)), null != e2.phpClassPrefix && (t2.phpClassPrefix = String(e2.phpClassPrefix)), null != e2.phpNamespace && (t2.phpNamespace = String(e2.phpNamespace)), null != e2.phpMetadataNamespace && (t2.phpMetadataNamespace = String(e2.phpMetadataNamespace)), null != e2.rubyPackage && (t2.rubyPackage = String(e2.rubyPackage)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, k.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.javaPackage = "", n2.javaOuterClassname = "", n2.optimizeFor = t2.enums === String ? "SPEED" : 1, n2.javaMultipleFiles = false, n2.goPackage = "", n2.ccGenericServices = false, n2.javaGenericServices = false, n2.pyGenericServices = false, n2.javaGenerateEqualsAndHash = false, n2.deprecated = false, n2.javaStringCheckUtf8 = false, n2.ccEnableArenas = true, n2.objcClassPrefix = "", n2.csharpNamespace = "", n2.swiftPrefix = "", n2.phpClassPrefix = "", n2.phpNamespace = "", n2.phpGenericServices = false, n2.phpMetadataNamespace = "", n2.rubyPackage = ""), null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && (n2.javaPackage = e2.javaPackage), null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && (n2.javaOuterClassname = e2.javaOuterClassname), null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor") && (n2.optimizeFor = t2.enums === String ? p.google.protobuf.FileOptions.OptimizeMode[e2.optimizeFor] : e2.optimizeFor), null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && (n2.javaMultipleFiles = e2.javaMultipleFiles), null != e2.goPackage && e2.hasOwnProperty("goPackage") && (n2.goPackage = e2.goPackage), null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && (n2.ccGenericServices = e2.ccGenericServices), null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && (n2.javaGenericServices = e2.javaGenericServices), null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && (n2.pyGenericServices = e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && (n2.javaGenerateEqualsAndHash = e2.javaGenerateEqualsAndHash), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && (n2.javaStringCheckUtf8 = e2.javaStringCheckUtf8), null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && (n2.ccEnableArenas = e2.ccEnableArenas), null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && (n2.objcClassPrefix = e2.objcClassPrefix), null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && (n2.csharpNamespace = e2.csharpNamespace), null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && (n2.swiftPrefix = e2.swiftPrefix), null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && (n2.phpClassPrefix = e2.phpClassPrefix), null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && (n2.phpNamespace = e2.phpNamespace), null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && (n2.phpGenericServices = e2.phpGenericServices), null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && (n2.phpMetadataNamespace = e2.phpMetadataNamespace), null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && (n2.rubyPackage = e2.rubyPackage), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, k.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, k.OptimizeMode = (n = {}, (e = Object.create(n))[n[1] = "SPEED"] = 1, e[n[2] = "CODE_SIZE"] = 2, e[n[3] = "LITE_RUNTIME"] = 3, e), k), t.MessageOptions = (D.prototype.messageSetWireFormat = false, D.prototype.noStandardDescriptorAccessor = false, D.prototype.deprecated = false, D.prototype.mapEntry = false, D.prototype.uninterpretedOption = i.emptyArray, D.create = function(e2) {
        return new D(e2);
      }, D.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.messageSetWireFormat && Object.hasOwnProperty.call(e2, "messageSetWireFormat") && t2.uint32(8).bool(e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && Object.hasOwnProperty.call(e2, "noStandardDescriptorAccessor") && t2.uint32(16).bool(e2.noStandardDescriptorAccessor), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.mapEntry && Object.hasOwnProperty.call(e2, "mapEntry") && t2.uint32(56).bool(e2.mapEntry), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, D.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, D.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.MessageOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.messageSetWireFormat = e2.bool();
              break;
            case 2:
              o2.noStandardDescriptorAccessor = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 7:
              o2.mapEntry = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, D.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, D.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && "boolean" != typeof e2.messageSetWireFormat) return "messageSetWireFormat: boolean expected";
        if (null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && "boolean" != typeof e2.noStandardDescriptorAccessor) return "noStandardDescriptorAccessor: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && "boolean" != typeof e2.mapEntry) return "mapEntry: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, D.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.MessageOptions) return e2;
        var t2 = new p.google.protobuf.MessageOptions();
        if (null != e2.messageSetWireFormat && (t2.messageSetWireFormat = Boolean(e2.messageSetWireFormat)), null != e2.noStandardDescriptorAccessor && (t2.noStandardDescriptorAccessor = Boolean(e2.noStandardDescriptorAccessor)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.mapEntry && (t2.mapEntry = Boolean(e2.mapEntry)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, D.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.messageSetWireFormat = false, n2.noStandardDescriptorAccessor = false, n2.deprecated = false, n2.mapEntry = false), null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && (n2.messageSetWireFormat = e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && (n2.noStandardDescriptorAccessor = e2.noStandardDescriptorAccessor), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && (n2.mapEntry = e2.mapEntry), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, D.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, D), t.FieldOptions = (T.prototype.ctype = 0, T.prototype.packed = false, T.prototype.jstype = 0, T.prototype.lazy = false, T.prototype.deprecated = false, T.prototype.weak = false, T.prototype.uninterpretedOption = i.emptyArray, T.create = function(e2) {
        return new T(e2);
      }, T.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.ctype && Object.hasOwnProperty.call(e2, "ctype") && t2.uint32(8).int32(e2.ctype), null != e2.packed && Object.hasOwnProperty.call(e2, "packed") && t2.uint32(16).bool(e2.packed), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.lazy && Object.hasOwnProperty.call(e2, "lazy") && t2.uint32(40).bool(e2.lazy), null != e2.jstype && Object.hasOwnProperty.call(e2, "jstype") && t2.uint32(48).int32(e2.jstype), null != e2.weak && Object.hasOwnProperty.call(e2, "weak") && t2.uint32(80).bool(e2.weak), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, T.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, T.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.FieldOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.ctype = e2.int32();
              break;
            case 2:
              o2.packed = e2.bool();
              break;
            case 6:
              o2.jstype = e2.int32();
              break;
            case 5:
              o2.lazy = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 10:
              o2.weak = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, T.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, T.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.ctype && e2.hasOwnProperty("ctype")) switch (e2.ctype) {
          default:
            return "ctype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.packed && e2.hasOwnProperty("packed") && "boolean" != typeof e2.packed) return "packed: boolean expected";
        if (null != e2.jstype && e2.hasOwnProperty("jstype")) switch (e2.jstype) {
          default:
            return "jstype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.lazy && e2.hasOwnProperty("lazy") && "boolean" != typeof e2.lazy) return "lazy: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.weak && e2.hasOwnProperty("weak") && "boolean" != typeof e2.weak) return "weak: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, T.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.FieldOptions) return e2;
        var t2 = new p.google.protobuf.FieldOptions();
        switch (e2.ctype) {
          case "STRING":
          case 0:
            t2.ctype = 0;
            break;
          case "CORD":
          case 1:
            t2.ctype = 1;
            break;
          case "STRING_PIECE":
          case 2:
            t2.ctype = 2;
        }
        switch (null != e2.packed && (t2.packed = Boolean(e2.packed)), e2.jstype) {
          case "JS_NORMAL":
          case 0:
            t2.jstype = 0;
            break;
          case "JS_STRING":
          case 1:
            t2.jstype = 1;
            break;
          case "JS_NUMBER":
          case 2:
            t2.jstype = 2;
        }
        if (null != e2.lazy && (t2.lazy = Boolean(e2.lazy)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.weak && (t2.weak = Boolean(e2.weak)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, T.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.ctype = t2.enums === String ? "STRING" : 0, n2.packed = false, n2.deprecated = false, n2.lazy = false, n2.jstype = t2.enums === String ? "JS_NORMAL" : 0, n2.weak = false), null != e2.ctype && e2.hasOwnProperty("ctype") && (n2.ctype = t2.enums === String ? p.google.protobuf.FieldOptions.CType[e2.ctype] : e2.ctype), null != e2.packed && e2.hasOwnProperty("packed") && (n2.packed = e2.packed), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.lazy && e2.hasOwnProperty("lazy") && (n2.lazy = e2.lazy), null != e2.jstype && e2.hasOwnProperty("jstype") && (n2.jstype = t2.enums === String ? p.google.protobuf.FieldOptions.JSType[e2.jstype] : e2.jstype), null != e2.weak && e2.hasOwnProperty("weak") && (n2.weak = e2.weak), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, T.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, T.CType = (n = {}, (e = Object.create(n))[n[0] = "STRING"] = 0, e[n[1] = "CORD"] = 1, e[n[2] = "STRING_PIECE"] = 2, e), T.JSType = (n = {}, (e = Object.create(n))[n[0] = "JS_NORMAL"] = 0, e[n[1] = "JS_STRING"] = 1, e[n[2] = "JS_NUMBER"] = 2, e), T), t.OneofOptions = (H.prototype.uninterpretedOption = i.emptyArray, H.create = function(e2) {
        return new H(e2);
      }, H.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, H.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, H.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.OneofOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, H.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, H.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, H.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.OneofOptions) return e2;
        var t2 = new p.google.protobuf.OneofOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, H.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, H.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, H), t.EnumOptions = (E.prototype.allowAlias = false, E.prototype.deprecated = false, E.prototype.uninterpretedOption = i.emptyArray, E.create = function(e2) {
        return new E(e2);
      }, E.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.allowAlias && Object.hasOwnProperty.call(e2, "allowAlias") && t2.uint32(16).bool(e2.allowAlias), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, E.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, E.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.EnumOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.allowAlias = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, E.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, E.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && "boolean" != typeof e2.allowAlias) return "allowAlias: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, E.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.EnumOptions) return e2;
        var t2 = new p.google.protobuf.EnumOptions();
        if (null != e2.allowAlias && (t2.allowAlias = Boolean(e2.allowAlias)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, E.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.allowAlias = false, n2.deprecated = false), null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && (n2.allowAlias = e2.allowAlias), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, E.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, E), t.EnumValueOptions = (z.prototype.deprecated = false, z.prototype.uninterpretedOption = i.emptyArray, z.create = function(e2) {
        return new z(e2);
      }, z.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(8).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, z.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, z.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.EnumValueOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, z.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, z.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, z.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.EnumValueOptions) return e2;
        var t2 = new p.google.protobuf.EnumValueOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, z.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, z.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, z), t.ServiceOptions = (A.prototype.deprecated = false, A.prototype.uninterpretedOption = i.emptyArray, A.prototype[".google.api.defaultHost"] = "", A.prototype[".google.api.oauthScopes"] = "", A.create = function(e2) {
        return new A(e2);
      }, A.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return null != e2[".google.api.defaultHost"] && Object.hasOwnProperty.call(e2, ".google.api.defaultHost") && t2.uint32(8394).string(e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && Object.hasOwnProperty.call(e2, ".google.api.oauthScopes") && t2.uint32(8402).string(e2[".google.api.oauthScopes"]), t2;
      }, A.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, A.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.ServiceOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1049:
              o2[".google.api.defaultHost"] = e2.string();
              break;
            case 1050:
              o2[".google.api.oauthScopes"] = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, A.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, A.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && !i.isString(e2[".google.api.defaultHost"]) ? ".google.api.defaultHost: string expected" : null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && !i.isString(e2[".google.api.oauthScopes"]) ? ".google.api.oauthScopes: string expected" : null;
      }, A.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.ServiceOptions) return e2;
        var t2 = new p.google.protobuf.ServiceOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return null != e2[".google.api.defaultHost"] && (t2[".google.api.defaultHost"] = String(e2[".google.api.defaultHost"])), null != e2[".google.api.oauthScopes"] && (t2[".google.api.oauthScopes"] = String(e2[".google.api.oauthScopes"])), t2;
      }, A.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false, n2[".google.api.defaultHost"] = "", n2[".google.api.oauthScopes"] = ""), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && (n2[".google.api.defaultHost"] = e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && (n2[".google.api.oauthScopes"] = e2[".google.api.oauthScopes"]), n2;
      }, A.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, A), t.MethodOptions = (N.prototype.deprecated = false, N.prototype.idempotencyLevel = 0, N.prototype.uninterpretedOption = i.emptyArray, N.prototype[".google.longrunning.operationInfo"] = null, N.prototype[".google.api.http"] = null, N.prototype[".google.api.methodSignature"] = i.emptyArray, N.create = function(e2) {
        return new N(e2);
      }, N.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.idempotencyLevel && Object.hasOwnProperty.call(e2, "idempotencyLevel") && t2.uint32(272).int32(e2.idempotencyLevel), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) p.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        if (null != e2[".google.longrunning.operationInfo"] && Object.hasOwnProperty.call(e2, ".google.longrunning.operationInfo") && p.google.longrunning.OperationInfo.encode(e2[".google.longrunning.operationInfo"], t2.uint32(8394).fork()).ldelim(), null != e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2.uint32(8410).string(e2[".google.api.methodSignature"][n2]);
        return null != e2[".google.api.http"] && Object.hasOwnProperty.call(e2, ".google.api.http") && p.google.api.HttpRule.encode(e2[".google.api.http"], t2.uint32(578365826).fork()).ldelim(), t2;
      }, N.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, N.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.MethodOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 34:
              o2.idempotencyLevel = e2.int32();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(p.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1049:
              o2[".google.longrunning.operationInfo"] = p.google.longrunning.OperationInfo.decode(e2, e2.uint32());
              break;
            case 72295728:
              o2[".google.api.http"] = p.google.api.HttpRule.decode(e2, e2.uint32());
              break;
            case 1051:
              o2[".google.api.methodSignature"] && o2[".google.api.methodSignature"].length || (o2[".google.api.methodSignature"] = []), o2[".google.api.methodSignature"].push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, N.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, N.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel")) switch (e2.idempotencyLevel) {
          default:
            return "idempotencyLevel: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = p.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        var n2;
        if (null != e2[".google.longrunning.operationInfo"] && e2.hasOwnProperty(".google.longrunning.operationInfo") && (n2 = p.google.longrunning.OperationInfo.verify(e2[".google.longrunning.operationInfo"]))) return ".google.longrunning.operationInfo." + n2;
        if (null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2 = p.google.api.HttpRule.verify(e2[".google.api.http"]))) return ".google.api.http." + n2;
        if (null != e2[".google.api.methodSignature"] && e2.hasOwnProperty(".google.api.methodSignature")) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) return ".google.api.methodSignature: array expected";
          for (t2 = 0; t2 < e2[".google.api.methodSignature"].length; ++t2) if (!i.isString(e2[".google.api.methodSignature"][t2])) return ".google.api.methodSignature: string[] expected";
        }
        return null;
      }, N.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.MethodOptions) return e2;
        var t2 = new p.google.protobuf.MethodOptions();
        switch (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.idempotencyLevel) {
          case "IDEMPOTENCY_UNKNOWN":
          case 0:
            t2.idempotencyLevel = 0;
            break;
          case "NO_SIDE_EFFECTS":
          case 1:
            t2.idempotencyLevel = 1;
            break;
          case "IDEMPOTENT":
          case 2:
            t2.idempotencyLevel = 2;
        }
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = p.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (null != e2[".google.longrunning.operationInfo"]) {
          if ("object" != typeof e2[".google.longrunning.operationInfo"]) throw TypeError(".google.protobuf.MethodOptions..google.longrunning.operationInfo: object expected");
          t2[".google.longrunning.operationInfo"] = p.google.longrunning.OperationInfo.fromObject(e2[".google.longrunning.operationInfo"]);
        }
        if (null != e2[".google.api.http"]) {
          if ("object" != typeof e2[".google.api.http"]) throw TypeError(".google.protobuf.MethodOptions..google.api.http: object expected");
          t2[".google.api.http"] = p.google.api.HttpRule.fromObject(e2[".google.api.http"]);
        }
        if (e2[".google.api.methodSignature"]) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) throw TypeError(".google.protobuf.MethodOptions..google.api.methodSignature: array expected");
          t2[".google.api.methodSignature"] = [];
          for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2[".google.api.methodSignature"][n2] = String(e2[".google.api.methodSignature"][n2]);
        }
        return t2;
      }, N.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = [], n2[".google.api.methodSignature"] = []), t2.defaults && (n2.deprecated = false, n2.idempotencyLevel = t2.enums === String ? "IDEMPOTENCY_UNKNOWN" : 0, n2[".google.longrunning.operationInfo"] = null, n2[".google.api.http"] = null), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel") && (n2.idempotencyLevel = t2.enums === String ? p.google.protobuf.MethodOptions.IdempotencyLevel[e2.idempotencyLevel] : e2.idempotencyLevel), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = p.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        if (null != e2[".google.longrunning.operationInfo"] && e2.hasOwnProperty(".google.longrunning.operationInfo") && (n2[".google.longrunning.operationInfo"] = p.google.longrunning.OperationInfo.toObject(e2[".google.longrunning.operationInfo"], t2)), e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) {
          n2[".google.api.methodSignature"] = [];
          for (o2 = 0; o2 < e2[".google.api.methodSignature"].length; ++o2) n2[".google.api.methodSignature"][o2] = e2[".google.api.methodSignature"][o2];
        }
        return null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2[".google.api.http"] = p.google.api.HttpRule.toObject(e2[".google.api.http"], t2)), n2;
      }, N.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, N.IdempotencyLevel = (n = {}, (e = Object.create(n))[n[0] = "IDEMPOTENCY_UNKNOWN"] = 0, e[n[1] = "NO_SIDE_EFFECTS"] = 1, e[n[2] = "IDEMPOTENT"] = 2, e), N), t.UninterpretedOption = (I.prototype.name = i.emptyArray, I.prototype.identifierValue = "", I.prototype.positiveIntValue = i.Long ? i.Long.fromBits(0, 0, true) : 0, I.prototype.negativeIntValue = i.Long ? i.Long.fromBits(0, 0, false) : 0, I.prototype.doubleValue = 0, I.prototype.stringValue = i.newBuffer([]), I.prototype.aggregateValue = "", I.create = function(e2) {
        return new I(e2);
      }, I.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && e2.name.length) for (var n2 = 0; n2 < e2.name.length; ++n2) p.google.protobuf.UninterpretedOption.NamePart.encode(e2.name[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.identifierValue && Object.hasOwnProperty.call(e2, "identifierValue") && t2.uint32(26).string(e2.identifierValue), null != e2.positiveIntValue && Object.hasOwnProperty.call(e2, "positiveIntValue") && t2.uint32(32).uint64(e2.positiveIntValue), null != e2.negativeIntValue && Object.hasOwnProperty.call(e2, "negativeIntValue") && t2.uint32(40).int64(e2.negativeIntValue), null != e2.doubleValue && Object.hasOwnProperty.call(e2, "doubleValue") && t2.uint32(49).double(e2.doubleValue), null != e2.stringValue && Object.hasOwnProperty.call(e2, "stringValue") && t2.uint32(58).bytes(e2.stringValue), null != e2.aggregateValue && Object.hasOwnProperty.call(e2, "aggregateValue") && t2.uint32(66).string(e2.aggregateValue), t2;
      }, I.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, I.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.UninterpretedOption(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.name && o2.name.length || (o2.name = []), o2.name.push(p.google.protobuf.UninterpretedOption.NamePart.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.identifierValue = e2.string();
              break;
            case 4:
              o2.positiveIntValue = e2.uint64();
              break;
            case 5:
              o2.negativeIntValue = e2.int64();
              break;
            case 6:
              o2.doubleValue = e2.double();
              break;
            case 7:
              o2.stringValue = e2.bytes();
              break;
            case 8:
              o2.aggregateValue = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, I.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, I.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name")) {
          if (!Array.isArray(e2.name)) return "name: array expected";
          for (var t2 = 0; t2 < e2.name.length; ++t2) {
            var n2 = p.google.protobuf.UninterpretedOption.NamePart.verify(e2.name[t2]);
            if (n2) return "name." + n2;
          }
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && !i.isString(e2.identifierValue) ? "identifierValue: string expected" : null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && !(i.isInteger(e2.positiveIntValue) || e2.positiveIntValue && i.isInteger(e2.positiveIntValue.low) && i.isInteger(e2.positiveIntValue.high)) ? "positiveIntValue: integer|Long expected" : null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && !(i.isInteger(e2.negativeIntValue) || e2.negativeIntValue && i.isInteger(e2.negativeIntValue.low) && i.isInteger(e2.negativeIntValue.high)) ? "negativeIntValue: integer|Long expected" : null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && "number" != typeof e2.doubleValue ? "doubleValue: number expected" : null != e2.stringValue && e2.hasOwnProperty("stringValue") && !(e2.stringValue && "number" == typeof e2.stringValue.length || i.isString(e2.stringValue)) ? "stringValue: buffer expected" : null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && !i.isString(e2.aggregateValue) ? "aggregateValue: string expected" : null;
      }, I.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.UninterpretedOption) return e2;
        var t2 = new p.google.protobuf.UninterpretedOption();
        if (e2.name) {
          if (!Array.isArray(e2.name)) throw TypeError(".google.protobuf.UninterpretedOption.name: array expected");
          t2.name = [];
          for (var n2 = 0; n2 < e2.name.length; ++n2) {
            if ("object" != typeof e2.name[n2]) throw TypeError(".google.protobuf.UninterpretedOption.name: object expected");
            t2.name[n2] = p.google.protobuf.UninterpretedOption.NamePart.fromObject(e2.name[n2]);
          }
        }
        return null != e2.identifierValue && (t2.identifierValue = String(e2.identifierValue)), null != e2.positiveIntValue && (i.Long ? (t2.positiveIntValue = i.Long.fromValue(e2.positiveIntValue)).unsigned = true : "string" == typeof e2.positiveIntValue ? t2.positiveIntValue = parseInt(e2.positiveIntValue, 10) : "number" == typeof e2.positiveIntValue ? t2.positiveIntValue = e2.positiveIntValue : "object" == typeof e2.positiveIntValue && (t2.positiveIntValue = new i.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true))), null != e2.negativeIntValue && (i.Long ? (t2.negativeIntValue = i.Long.fromValue(e2.negativeIntValue)).unsigned = false : "string" == typeof e2.negativeIntValue ? t2.negativeIntValue = parseInt(e2.negativeIntValue, 10) : "number" == typeof e2.negativeIntValue ? t2.negativeIntValue = e2.negativeIntValue : "object" == typeof e2.negativeIntValue && (t2.negativeIntValue = new i.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber())), null != e2.doubleValue && (t2.doubleValue = Number(e2.doubleValue)), null != e2.stringValue && ("string" == typeof e2.stringValue ? i.base64.decode(e2.stringValue, t2.stringValue = i.newBuffer(i.base64.length(e2.stringValue)), 0) : e2.stringValue.length && (t2.stringValue = e2.stringValue)), null != e2.aggregateValue && (t2.aggregateValue = String(e2.aggregateValue)), t2;
      }, I.toObject = function(e2, t2) {
        var n2, o2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (o2.name = []), t2.defaults && (o2.identifierValue = "", i.Long ? (n2 = new i.Long(0, 0, true), o2.positiveIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.positiveIntValue = t2.longs === String ? "0" : 0, i.Long ? (n2 = new i.Long(0, 0, false), o2.negativeIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.negativeIntValue = t2.longs === String ? "0" : 0, o2.doubleValue = 0, t2.bytes === String ? o2.stringValue = "" : (o2.stringValue = [], t2.bytes !== Array && (o2.stringValue = i.newBuffer(o2.stringValue))), o2.aggregateValue = ""), e2.name && e2.name.length) {
          o2.name = [];
          for (var r2 = 0; r2 < e2.name.length; ++r2) o2.name[r2] = p.google.protobuf.UninterpretedOption.NamePart.toObject(e2.name[r2], t2);
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && (o2.identifierValue = e2.identifierValue), null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && ("number" == typeof e2.positiveIntValue ? o2.positiveIntValue = t2.longs === String ? String(e2.positiveIntValue) : e2.positiveIntValue : o2.positiveIntValue = t2.longs === String ? i.Long.prototype.toString.call(e2.positiveIntValue) : t2.longs === Number ? new i.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true) : e2.positiveIntValue), null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && ("number" == typeof e2.negativeIntValue ? o2.negativeIntValue = t2.longs === String ? String(e2.negativeIntValue) : e2.negativeIntValue : o2.negativeIntValue = t2.longs === String ? i.Long.prototype.toString.call(e2.negativeIntValue) : t2.longs === Number ? new i.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber() : e2.negativeIntValue), null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && (o2.doubleValue = t2.json && !isFinite(e2.doubleValue) ? String(e2.doubleValue) : e2.doubleValue), null != e2.stringValue && e2.hasOwnProperty("stringValue") && (o2.stringValue = t2.bytes === String ? i.base64.encode(e2.stringValue, 0, e2.stringValue.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.stringValue) : e2.stringValue), null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && (o2.aggregateValue = e2.aggregateValue), o2;
      }, I.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, I.NamePart = (q.prototype.namePart = "", q.prototype.isExtension = false, q.create = function(e2) {
        return new q(e2);
      }, q.encode = function(e2, t2) {
        return (t2 = t2 || r.create()).uint32(10).string(e2.namePart), t2.uint32(16).bool(e2.isExtension), t2;
      }, q.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, q.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.UninterpretedOption.NamePart(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.namePart = e2.string();
              break;
            case 2:
              o2.isExtension = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        if (!o2.hasOwnProperty("namePart")) throw i.ProtocolError("missing required 'namePart'", { instance: o2 });
        if (o2.hasOwnProperty("isExtension")) return o2;
        throw i.ProtocolError("missing required 'isExtension'", { instance: o2 });
      }, q.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, q.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : i.isString(e2.namePart) ? "boolean" != typeof e2.isExtension ? "isExtension: boolean expected" : null : "namePart: string expected";
      }, q.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.protobuf.UninterpretedOption.NamePart ? e2 : (t2 = new p.google.protobuf.UninterpretedOption.NamePart(), null != e2.namePart && (t2.namePart = String(e2.namePart)), null != e2.isExtension && (t2.isExtension = Boolean(e2.isExtension)), t2);
      }, q.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.namePart = "", n2.isExtension = false), null != e2.namePart && e2.hasOwnProperty("namePart") && (n2.namePart = e2.namePart), null != e2.isExtension && e2.hasOwnProperty("isExtension") && (n2.isExtension = e2.isExtension), n2;
      }, q.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, q), I), t.SourceCodeInfo = (Y.prototype.location = i.emptyArray, Y.create = function(e2) {
        return new Y(e2);
      }, Y.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.location && e2.location.length) for (var n2 = 0; n2 < e2.location.length; ++n2) p.google.protobuf.SourceCodeInfo.Location.encode(e2.location[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, Y.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, Y.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.SourceCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.location && o2.location.length || (o2.location = []), o2.location.push(p.google.protobuf.SourceCodeInfo.Location.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, Y.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, Y.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.location && e2.hasOwnProperty("location")) {
          if (!Array.isArray(e2.location)) return "location: array expected";
          for (var t2 = 0; t2 < e2.location.length; ++t2) {
            var n2 = p.google.protobuf.SourceCodeInfo.Location.verify(e2.location[t2]);
            if (n2) return "location." + n2;
          }
        }
        return null;
      }, Y.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.SourceCodeInfo) return e2;
        var t2 = new p.google.protobuf.SourceCodeInfo();
        if (e2.location) {
          if (!Array.isArray(e2.location)) throw TypeError(".google.protobuf.SourceCodeInfo.location: array expected");
          t2.location = [];
          for (var n2 = 0; n2 < e2.location.length; ++n2) {
            if ("object" != typeof e2.location[n2]) throw TypeError(".google.protobuf.SourceCodeInfo.location: object expected");
            t2.location[n2] = p.google.protobuf.SourceCodeInfo.Location.fromObject(e2.location[n2]);
          }
        }
        return t2;
      }, Y.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.location = []), e2.location && e2.location.length) {
          n2.location = [];
          for (var o2 = 0; o2 < e2.location.length; ++o2) n2.location[o2] = p.google.protobuf.SourceCodeInfo.Location.toObject(e2.location[o2], t2);
        }
        return n2;
      }, Y.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, Y.Location = (R.prototype.path = i.emptyArray, R.prototype.span = i.emptyArray, R.prototype.leadingComments = "", R.prototype.trailingComments = "", R.prototype.leadingDetachedComments = i.emptyArray, R.create = function(e2) {
        return new R(e2);
      }, R.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        if (null != e2.span && e2.span.length) {
          t2.uint32(18).fork();
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.int32(e2.span[n2]);
          t2.ldelim();
        }
        if (null != e2.leadingComments && Object.hasOwnProperty.call(e2, "leadingComments") && t2.uint32(26).string(e2.leadingComments), null != e2.trailingComments && Object.hasOwnProperty.call(e2, "trailingComments") && t2.uint32(34).string(e2.trailingComments), null != e2.leadingDetachedComments && e2.leadingDetachedComments.length) for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.uint32(50).string(e2.leadingDetachedComments[n2]);
        return t2;
      }, R.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, R.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.SourceCodeInfo.Location(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              if (o2.span && o2.span.length || (o2.span = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.span.push(e2.int32());
              else o2.span.push(e2.int32());
              break;
            case 3:
              o2.leadingComments = e2.string();
              break;
            case 4:
              o2.trailingComments = e2.string();
              break;
            case 6:
              o2.leadingDetachedComments && o2.leadingDetachedComments.length || (o2.leadingDetachedComments = []), o2.leadingDetachedComments.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, R.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, R.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!i.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        if (null != e2.span && e2.hasOwnProperty("span")) {
          if (!Array.isArray(e2.span)) return "span: array expected";
          for (t2 = 0; t2 < e2.span.length; ++t2) if (!i.isInteger(e2.span[t2])) return "span: integer[] expected";
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && !i.isString(e2.leadingComments)) return "leadingComments: string expected";
        if (null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && !i.isString(e2.trailingComments)) return "trailingComments: string expected";
        if (null != e2.leadingDetachedComments && e2.hasOwnProperty("leadingDetachedComments")) {
          if (!Array.isArray(e2.leadingDetachedComments)) return "leadingDetachedComments: array expected";
          for (t2 = 0; t2 < e2.leadingDetachedComments.length; ++t2) if (!i.isString(e2.leadingDetachedComments[t2])) return "leadingDetachedComments: string[] expected";
        }
        return null;
      }, R.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.SourceCodeInfo.Location) return e2;
        var t2 = new p.google.protobuf.SourceCodeInfo.Location();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        if (e2.span) {
          if (!Array.isArray(e2.span)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.span: array expected");
          t2.span = [];
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.span[n2] = 0 | e2.span[n2];
        }
        if (null != e2.leadingComments && (t2.leadingComments = String(e2.leadingComments)), null != e2.trailingComments && (t2.trailingComments = String(e2.trailingComments)), e2.leadingDetachedComments) {
          if (!Array.isArray(e2.leadingDetachedComments)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected");
          t2.leadingDetachedComments = [];
          for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.leadingDetachedComments[n2] = String(e2.leadingDetachedComments[n2]);
        }
        return t2;
      }, R.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = [], n2.span = [], n2.leadingDetachedComments = []), t2.defaults && (n2.leadingComments = "", n2.trailingComments = ""), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        if (e2.span && e2.span.length) {
          n2.span = [];
          for (o2 = 0; o2 < e2.span.length; ++o2) n2.span[o2] = e2.span[o2];
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && (n2.leadingComments = e2.leadingComments), null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && (n2.trailingComments = e2.trailingComments), e2.leadingDetachedComments && e2.leadingDetachedComments.length) {
          n2.leadingDetachedComments = [];
          for (o2 = 0; o2 < e2.leadingDetachedComments.length; ++o2) n2.leadingDetachedComments[o2] = e2.leadingDetachedComments[o2];
        }
        return n2;
      }, R.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, R), Y), t.GeneratedCodeInfo = (W.prototype.annotation = i.emptyArray, W.create = function(e2) {
        return new W(e2);
      }, W.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.annotation && e2.annotation.length) for (var n2 = 0; n2 < e2.annotation.length; ++n2) p.google.protobuf.GeneratedCodeInfo.Annotation.encode(e2.annotation[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, W.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, W.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.GeneratedCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.annotation && o2.annotation.length || (o2.annotation = []), o2.annotation.push(p.google.protobuf.GeneratedCodeInfo.Annotation.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, W.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, W.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.annotation && e2.hasOwnProperty("annotation")) {
          if (!Array.isArray(e2.annotation)) return "annotation: array expected";
          for (var t2 = 0; t2 < e2.annotation.length; ++t2) {
            var n2 = p.google.protobuf.GeneratedCodeInfo.Annotation.verify(e2.annotation[t2]);
            if (n2) return "annotation." + n2;
          }
        }
        return null;
      }, W.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.GeneratedCodeInfo) return e2;
        var t2 = new p.google.protobuf.GeneratedCodeInfo();
        if (e2.annotation) {
          if (!Array.isArray(e2.annotation)) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: array expected");
          t2.annotation = [];
          for (var n2 = 0; n2 < e2.annotation.length; ++n2) {
            if ("object" != typeof e2.annotation[n2]) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: object expected");
            t2.annotation[n2] = p.google.protobuf.GeneratedCodeInfo.Annotation.fromObject(e2.annotation[n2]);
          }
        }
        return t2;
      }, W.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.annotation = []), e2.annotation && e2.annotation.length) {
          n2.annotation = [];
          for (var o2 = 0; o2 < e2.annotation.length; ++o2) n2.annotation[o2] = p.google.protobuf.GeneratedCodeInfo.Annotation.toObject(e2.annotation[o2], t2);
        }
        return n2;
      }, W.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, W.Annotation = (C.prototype.path = i.emptyArray, C.prototype.sourceFile = "", C.prototype.begin = 0, C.prototype.end = 0, C.create = function(e2) {
        return new C(e2);
      }, C.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        return null != e2.sourceFile && Object.hasOwnProperty.call(e2, "sourceFile") && t2.uint32(18).string(e2.sourceFile), null != e2.begin && Object.hasOwnProperty.call(e2, "begin") && t2.uint32(24).int32(e2.begin), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(32).int32(e2.end), t2;
      }, C.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, C.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.GeneratedCodeInfo.Annotation(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              o2.sourceFile = e2.string();
              break;
            case 3:
              o2.begin = e2.int32();
              break;
            case 4:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, C.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, C.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!i.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && !i.isString(e2.sourceFile) ? "sourceFile: string expected" : null != e2.begin && e2.hasOwnProperty("begin") && !i.isInteger(e2.begin) ? "begin: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !i.isInteger(e2.end) ? "end: integer expected" : null;
      }, C.fromObject = function(e2) {
        if (e2 instanceof p.google.protobuf.GeneratedCodeInfo.Annotation) return e2;
        var t2 = new p.google.protobuf.GeneratedCodeInfo.Annotation();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.GeneratedCodeInfo.Annotation.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        return null != e2.sourceFile && (t2.sourceFile = String(e2.sourceFile)), null != e2.begin && (t2.begin = 0 | e2.begin), null != e2.end && (t2.end = 0 | e2.end), t2;
      }, C.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = []), t2.defaults && (n2.sourceFile = "", n2.begin = 0, n2.end = 0), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && (n2.sourceFile = e2.sourceFile), null != e2.begin && e2.hasOwnProperty("begin") && (n2.begin = e2.begin), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, C.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, C), W), t.Any = (X.prototype.type_url = "", X.prototype.value = i.newBuffer([]), X.create = function(e2) {
        return new X(e2);
      }, X.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.type_url && Object.hasOwnProperty.call(e2, "type_url") && t2.uint32(10).string(e2.type_url), null != e2.value && Object.hasOwnProperty.call(e2, "value") && t2.uint32(18).bytes(e2.value), t2;
      }, X.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, X.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.Any(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.type_url = e2.string();
              break;
            case 2:
              o2.value = e2.bytes();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, X.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, X.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.type_url && e2.hasOwnProperty("type_url") && !i.isString(e2.type_url) ? "type_url: string expected" : null != e2.value && e2.hasOwnProperty("value") && !(e2.value && "number" == typeof e2.value.length || i.isString(e2.value)) ? "value: buffer expected" : null;
      }, X.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.protobuf.Any ? e2 : (t2 = new p.google.protobuf.Any(), null != e2.type_url && (t2.type_url = String(e2.type_url)), null != e2.value && ("string" == typeof e2.value ? i.base64.decode(e2.value, t2.value = i.newBuffer(i.base64.length(e2.value)), 0) : e2.value.length && (t2.value = e2.value)), t2);
      }, X.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.type_url = "", t2.bytes === String ? n2.value = "" : (n2.value = [], t2.bytes !== Array && (n2.value = i.newBuffer(n2.value)))), null != e2.type_url && e2.hasOwnProperty("type_url") && (n2.type_url = e2.type_url), null != e2.value && e2.hasOwnProperty("value") && (n2.value = t2.bytes === String ? i.base64.encode(e2.value, 0, e2.value.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.value) : e2.value), n2;
      }, X.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, X), t.Duration = (K.prototype.seconds = i.Long ? i.Long.fromBits(0, 0, false) : 0, K.prototype.nanos = 0, K.create = function(e2) {
        return new K(e2);
      }, K.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.seconds && Object.hasOwnProperty.call(e2, "seconds") && t2.uint32(8).int64(e2.seconds), null != e2.nanos && Object.hasOwnProperty.call(e2, "nanos") && t2.uint32(16).int32(e2.nanos), t2;
      }, K.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, K.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.protobuf.Duration(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.seconds = e2.int64();
              break;
            case 2:
              o2.nanos = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, K.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, K.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.seconds && e2.hasOwnProperty("seconds") && !(i.isInteger(e2.seconds) || e2.seconds && i.isInteger(e2.seconds.low) && i.isInteger(e2.seconds.high)) ? "seconds: integer|Long expected" : null != e2.nanos && e2.hasOwnProperty("nanos") && !i.isInteger(e2.nanos) ? "nanos: integer expected" : null;
      }, K.fromObject = function(e2) {
        var t2;
        return e2 instanceof p.google.protobuf.Duration ? e2 : (t2 = new p.google.protobuf.Duration(), null != e2.seconds && (i.Long ? (t2.seconds = i.Long.fromValue(e2.seconds)).unsigned = false : "string" == typeof e2.seconds ? t2.seconds = parseInt(e2.seconds, 10) : "number" == typeof e2.seconds ? t2.seconds = e2.seconds : "object" == typeof e2.seconds && (t2.seconds = new i.LongBits(e2.seconds.low >>> 0, e2.seconds.high >>> 0).toNumber())), null != e2.nanos && (t2.nanos = 0 | e2.nanos), t2);
      }, K.toObject = function(e2, t2) {
        var n2, o2 = {};
        return (t2 = t2 || {}).defaults && (i.Long ? (n2 = new i.Long(0, 0, false), o2.seconds = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.seconds = t2.longs === String ? "0" : 0, o2.nanos = 0), null != e2.seconds && e2.hasOwnProperty("seconds") && ("number" == typeof e2.seconds ? o2.seconds = t2.longs === String ? String(e2.seconds) : e2.seconds : o2.seconds = t2.longs === String ? i.Long.prototype.toString.call(e2.seconds) : t2.longs === Number ? new i.LongBits(e2.seconds.low >>> 0, e2.seconds.high >>> 0).toNumber() : e2.seconds), null != e2.nanos && e2.hasOwnProperty("nanos") && (o2.nanos = e2.nanos), o2;
      }, K.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, K), t.Empty = (Q.create = function(e2) {
        return new Q(e2);
      }, Q.encode = function(e2, t2) {
        return t2 = t2 || r.create();
      }, Q.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, Q.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, t2 = new p.google.protobuf.Empty(); e2.pos < n2; ) {
          var o2 = e2.uint32();
          e2.skipType(7 & o2);
        }
        return t2;
      }, Q.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, Q.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null;
      }, Q.fromObject = function(e2) {
        return e2 instanceof p.google.protobuf.Empty ? e2 : new p.google.protobuf.Empty();
      }, Q.toObject = function() {
        return {};
      }, Q.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, Q), t), F.rpc = ((n = {}).Status = (V.prototype.code = 0, V.prototype.message = "", V.prototype.details = i.emptyArray, V.create = function(e2) {
        return new V(e2);
      }, V.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.code && Object.hasOwnProperty.call(e2, "code") && t2.uint32(8).int32(e2.code), null != e2.message && Object.hasOwnProperty.call(e2, "message") && t2.uint32(18).string(e2.message), null != e2.details && e2.details.length) for (var n2 = 0; n2 < e2.details.length; ++n2) p.google.protobuf.Any.encode(e2.details[n2], t2.uint32(26).fork()).ldelim();
        return t2;
      }, V.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, V.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new p.google.rpc.Status(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.code = e2.int32();
              break;
            case 2:
              o2.message = e2.string();
              break;
            case 3:
              o2.details && o2.details.length || (o2.details = []), o2.details.push(p.google.protobuf.Any.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, V.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, V.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.code && e2.hasOwnProperty("code") && !i.isInteger(e2.code)) return "code: integer expected";
        if (null != e2.message && e2.hasOwnProperty("message") && !i.isString(e2.message)) return "message: string expected";
        if (null != e2.details && e2.hasOwnProperty("details")) {
          if (!Array.isArray(e2.details)) return "details: array expected";
          for (var t2 = 0; t2 < e2.details.length; ++t2) {
            var n2 = p.google.protobuf.Any.verify(e2.details[t2]);
            if (n2) return "details." + n2;
          }
        }
        return null;
      }, V.fromObject = function(e2) {
        if (e2 instanceof p.google.rpc.Status) return e2;
        var t2 = new p.google.rpc.Status();
        if (null != e2.code && (t2.code = 0 | e2.code), null != e2.message && (t2.message = String(e2.message)), e2.details) {
          if (!Array.isArray(e2.details)) throw TypeError(".google.rpc.Status.details: array expected");
          t2.details = [];
          for (var n2 = 0; n2 < e2.details.length; ++n2) {
            if ("object" != typeof e2.details[n2]) throw TypeError(".google.rpc.Status.details: object expected");
            t2.details[n2] = p.google.protobuf.Any.fromObject(e2.details[n2]);
          }
        }
        return t2;
      }, V.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.details = []), t2.defaults && (n2.code = 0, n2.message = ""), null != e2.code && e2.hasOwnProperty("code") && (n2.code = e2.code), null != e2.message && e2.hasOwnProperty("message") && (n2.message = e2.message), e2.details && e2.details.length) {
          n2.details = [];
          for (var o2 = 0; o2 < e2.details.length; ++o2) n2.details[o2] = p.google.protobuf.Any.toObject(e2.details[o2], t2);
        }
        return n2;
      }, V.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, V), n), F), p;
    });
  })(operations);
  return operations.exports;
}
var hasRequiredLongrunning;
function requireLongrunning() {
  if (hasRequiredLongrunning) return longrunning;
  hasRequiredLongrunning = 1;
  var __createBinding = longrunning && longrunning.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = longrunning && longrunning.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = longrunning && longrunning.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(longrunning, "__esModule", { value: true });
  longrunning.Operation = void 0;
  longrunning.operation = operation;
  const events_1 = require$$0$2;
  const status_1 = requireStatus();
  const googleError_1 = requireGoogleError();
  const operationProtos = __importStar(requireOperations());
  class Operation extends events_1.EventEmitter {
    completeListeners;
    hasActiveListeners;
    latestResponse;
    longrunningDescriptor;
    result;
    metadata;
    backoffSettings;
    _callOptions;
    currentCallPromise_;
    name;
    done;
    error;
    response;
    /**
     * Wrapper for a google.longrunnung.Operation.
     *
     * @constructor
     *
     * @param {google.longrunning.Operation} grpcOp - The operation to be wrapped.
     * @param {LongRunningDescriptor} longrunningDescriptor - This defines the
     * operations service client and unpacking mechanisms for the operation.
     * @param {BackoffSettings} backoffSettings - The backoff settings used in
     * in polling the operation.
     * @param {CallOptions} callOptions - CallOptions used in making get operation
     * requests.
     */
    constructor(grpcOp, longrunningDescriptor, backoffSettings, callOptions) {
      super();
      this.completeListeners = 0;
      this.hasActiveListeners = false;
      this.latestResponse = grpcOp;
      this.name = this.latestResponse.name;
      this.done = this.latestResponse.done;
      this.error = this.latestResponse.error;
      this.longrunningDescriptor = longrunningDescriptor;
      this.result = null;
      this.metadata = null;
      this.backoffSettings = backoffSettings;
      this._unpackResponse(grpcOp);
      this._listenForEvents();
      this._callOptions = callOptions;
    }
    /**
     * Begin listening for events on the operation. This method keeps track of how
     * many "complete" listeners are registered and removed, making sure polling
     * is handled automatically.
     *
     * As long as there is one active "complete" listener, the connection is open.
     * When there are no more listeners, the polling stops.
     *
     * @private
     */
    _listenForEvents() {
      this.on("newListener", (event) => {
        if (event === "complete") {
          this.completeListeners++;
          if (!this.hasActiveListeners) {
            this.hasActiveListeners = true;
            this.startPolling_();
          }
        }
      });
      this.on("removeListener", (event) => {
        if (event === "complete" && --this.completeListeners === 0) {
          this.hasActiveListeners = false;
        }
      });
    }
    /**
     * Cancels current polling api call and cancels the operation.
     *
     * @return {Promise} the promise of the OperationsClient#cancelOperation api
     * request.
     */
    cancel() {
      if (this.currentCallPromise_) {
        this.currentCallPromise_.cancel();
      }
      const operationsClient2 = this.longrunningDescriptor.operationsClient;
      const cancelRequest = new operationProtos.google.longrunning.CancelOperationRequest();
      cancelRequest.name = this.latestResponse.name;
      return operationsClient2.cancelOperation(cancelRequest);
    }
    getOperation(callback) {
      const self = this;
      const operationsClient2 = this.longrunningDescriptor.operationsClient;
      function promisifyResponse() {
        if (!callback) {
          return new Promise((resolve, reject) => {
            if (self.latestResponse.error) {
              const error = new googleError_1.GoogleError(self.latestResponse.error.message);
              error.code = self.latestResponse.error.code;
              reject(error);
            } else {
              resolve([self.result, self.metadata, self.latestResponse]);
            }
          });
        }
        return;
      }
      if (this.latestResponse.done) {
        this._unpackResponse(this.latestResponse, callback);
        return promisifyResponse();
      }
      const request = new operationProtos.google.longrunning.GetOperationRequest();
      request.name = this.latestResponse.name;
      this.currentCallPromise_ = operationsClient2.getOperationInternal(request, this._callOptions);
      const noCallbackPromise = this.currentCallPromise_.then((responses) => {
        self.latestResponse = responses[0];
        self._unpackResponse(responses[0], callback);
        return promisifyResponse();
      }, (err) => {
        if (callback) {
          callback(err);
          return;
        }
        return Promise.reject(err);
      });
      if (!callback) {
        return noCallbackPromise;
      }
    }
    _unpackResponse(op, callback) {
      const responseDecoder = this.longrunningDescriptor.responseDecoder;
      const metadataDecoder = this.longrunningDescriptor.metadataDecoder;
      let response;
      let metadata;
      if (op.done) {
        if (op.result === "error") {
          const error = new googleError_1.GoogleError(op.error.message);
          error.code = op.error.code;
          this.error = error;
          if (callback) {
            callback(error);
          }
          return;
        }
        if (responseDecoder && op.response) {
          this.response = op.response;
          response = responseDecoder(op.response.value);
          this.result = response;
          this.done = true;
        }
      }
      if (metadataDecoder && op.metadata) {
        metadata = metadataDecoder(op.metadata.value);
        this.metadata = metadata;
      }
      if (callback) {
        callback(null, response, metadata, op);
      }
    }
    /**
     * Poll `getOperation` to check the operation's status. This runs a loop to
     * ping using the backoff strategy specified at initialization.
     *
     * Note: This method is automatically called once a "complete" event handler
     * is registered on the operation.
     *
     * @private
     */
    startPolling_() {
      const self = this;
      let now = /* @__PURE__ */ new Date();
      const delayMult = this.backoffSettings.retryDelayMultiplier;
      const maxDelay = this.backoffSettings.maxRetryDelayMillis;
      let delay = this.backoffSettings.initialRetryDelayMillis;
      let deadline = Infinity;
      if (this.backoffSettings.totalTimeoutMillis) {
        deadline = now.getTime() + this.backoffSettings.totalTimeoutMillis;
      }
      let previousMetadataBytes;
      if (this.latestResponse.metadata) {
        previousMetadataBytes = this.latestResponse.metadata.value;
      }
      function emit(event, ...args) {
        self.emit(event, ...args);
      }
      function arrayEquals(a, b) {
        if (a.byteLength !== b.byteLength) {
          return false;
        }
        for (let i = 0; i < a.byteLength; ++i) {
          if (a[i] !== b[i])
            return false;
        }
        return true;
      }
      function retry() {
        if (!self.hasActiveListeners) {
          return;
        }
        if (now.getTime() >= deadline) {
          const error = new googleError_1.GoogleError("Total timeout exceeded before any response was received");
          error.code = status_1.Status.DEADLINE_EXCEEDED;
          setImmediate(emit, "error", error);
          return;
        }
        self.getOperation((err, result, metadata, rawResponse) => {
          if (err) {
            setImmediate(emit, "error", err);
            return;
          }
          if (!result) {
            if (rawResponse.metadata && (!previousMetadataBytes || rawResponse && !arrayEquals(rawResponse.metadata.value, previousMetadataBytes))) {
              setImmediate(emit, "progress", metadata, rawResponse);
              previousMetadataBytes = rawResponse.metadata.value;
            }
            if (rawResponse.done) {
              setImmediate(emit, "complete", {}, metadata, rawResponse);
              return;
            }
            setTimeout(() => {
              now = /* @__PURE__ */ new Date();
              delay = Math.min(delay * delayMult, maxDelay);
              retry();
            }, delay);
            return;
          }
          setImmediate(emit, "complete", result, metadata, rawResponse);
        });
      }
      retry();
    }
    /**
     * Wraps the `complete` and `error` events in a Promise.
     *
     * @return {promise} - Promise that resolves on operation completion and rejects
     * on operation error.
     */
    promise() {
      return new Promise((resolve, reject) => {
        this.on("error", reject).on("complete", (result, metadata, rawResponse) => {
          resolve([result, metadata, rawResponse]);
        });
      });
    }
  }
  longrunning.Operation = Operation;
  function operation(op, longrunningDescriptor, backoffSettings, callOptions) {
    return new Operation(op, longrunningDescriptor, backoffSettings, callOptions);
  }
  return longrunning;
}
var hasRequiredLongRunningApiCaller;
function requireLongRunningApiCaller() {
  if (hasRequiredLongRunningApiCaller) return longRunningApiCaller;
  hasRequiredLongRunningApiCaller = 1;
  Object.defineProperty(longRunningApiCaller, "__esModule", { value: true });
  longRunningApiCaller.LongrunningApiCaller = void 0;
  const call_1 = requireCall();
  const gax_1 = requireGax();
  const longrunning_1 = requireLongrunning();
  class LongrunningApiCaller {
    longrunningDescriptor;
    /**
     * Creates an API caller that performs polling on a long running operation.
     *
     * @private
     * @constructor
     * @param {LongRunningDescriptor} longrunningDescriptor - Holds the
     * decoders used for unpacking responses and the operationsClient
     * used for polling the operation.
     */
    constructor(longrunningDescriptor) {
      this.longrunningDescriptor = longrunningDescriptor;
    }
    init(callback) {
      if (callback) {
        return new call_1.OngoingCall(callback);
      }
      return new call_1.OngoingCallPromise();
    }
    wrap(func) {
      return func;
    }
    call(apiCall, argument, settings, canceller) {
      canceller.call((argument2, callback) => {
        return this._wrapOperation(apiCall, settings, argument2, callback);
      }, argument);
    }
    _wrapOperation(apiCall, settings, argument, callback) {
      let backoffSettings = settings.longrunning;
      if (!backoffSettings) {
        backoffSettings = (0, gax_1.createDefaultBackoffSettings)();
      }
      const longrunningDescriptor = this.longrunningDescriptor;
      return apiCall(argument, (err, rawResponse) => {
        if (err) {
          callback(err, null, null, rawResponse);
          return;
        }
        const operation = new longrunning_1.Operation(rawResponse, longrunningDescriptor, backoffSettings, settings);
        callback(null, operation, rawResponse);
      });
    }
    fail(canceller, err) {
      canceller.callback(err);
    }
    result(canceller) {
      return canceller.promise;
    }
  }
  longRunningApiCaller.LongrunningApiCaller = LongrunningApiCaller;
  return longRunningApiCaller;
}
var hasRequiredLongRunningDescriptor;
function requireLongRunningDescriptor() {
  if (hasRequiredLongRunningDescriptor) return longRunningDescriptor;
  hasRequiredLongRunningDescriptor = 1;
  Object.defineProperty(longRunningDescriptor, "__esModule", { value: true });
  longRunningDescriptor.LongRunningDescriptor = void 0;
  const longRunningApiCaller_1 = requireLongRunningApiCaller();
  class LongRunningDescriptor {
    operationsClient;
    responseDecoder;
    metadataDecoder;
    constructor(operationsClient2, responseDecoder, metadataDecoder) {
      this.operationsClient = operationsClient2;
      this.responseDecoder = responseDecoder;
      this.metadataDecoder = metadataDecoder;
    }
    getApiCaller() {
      return new longRunningApiCaller_1.LongrunningApiCaller(this);
    }
  }
  longRunningDescriptor.LongRunningDescriptor = LongRunningDescriptor;
  return longRunningDescriptor;
}
var pageDescriptor = {};
var pagedApiCaller = {};
var resourceCollector = {};
var hasRequiredResourceCollector;
function requireResourceCollector() {
  if (hasRequiredResourceCollector) return resourceCollector;
  hasRequiredResourceCollector = 1;
  Object.defineProperty(resourceCollector, "__esModule", { value: true });
  resourceCollector.ResourceCollector = void 0;
  class ResourceCollector {
    apiCall;
    resources;
    maxResults;
    resolveCallback;
    rejectCallback;
    constructor(apiCall, maxResults = -1) {
      this.apiCall = apiCall;
      this.resources = [];
      this.maxResults = maxResults;
    }
    callback(err, resources, nextPageRequest) {
      if (err) {
        this.rejectCallback(err);
        return;
      }
      for (const resource of resources) {
        this.resources.push(resource);
        if (this.resources.length === this.maxResults) {
          nextPageRequest = null;
          break;
        }
      }
      if (!nextPageRequest) {
        this.resolveCallback(this.resources);
        return;
      }
      const callback = (...args) => this.callback(...args);
      setImmediate(this.apiCall, nextPageRequest, callback);
    }
    processAllPages(firstRequest) {
      return new Promise((resolve, reject) => {
        this.resolveCallback = resolve;
        this.rejectCallback = reject;
        const callback = (...args) => this.callback(...args);
        setImmediate(this.apiCall, firstRequest, callback);
      });
    }
  }
  resourceCollector.ResourceCollector = ResourceCollector;
  return resourceCollector;
}
var hasRequiredPagedApiCaller;
function requirePagedApiCaller() {
  if (hasRequiredPagedApiCaller) return pagedApiCaller;
  hasRequiredPagedApiCaller = 1;
  Object.defineProperty(pagedApiCaller, "__esModule", { value: true });
  pagedApiCaller.PagedApiCaller = void 0;
  const call_1 = requireCall();
  const googleError_1 = requireGoogleError();
  const resourceCollector_1 = requireResourceCollector();
  const warnings_1 = requireWarnings();
  class PagedApiCaller {
    pageDescriptor;
    /**
     * Creates an API caller that returns a stream to performs page-streaming.
     *
     * @private
     * @constructor
     * @param {PageDescriptor} pageDescriptor - indicates the structure
     *   of page streaming to be performed.
     */
    constructor(pageDescriptor2) {
      this.pageDescriptor = pageDescriptor2;
    }
    /**
     * This function translates between regular gRPC calls (that accepts a request and returns a response,
     * and does not know anything about pages and page tokens) and the users' callback (that expects
     * to see resources from one page, a request to get the next page, and the raw response from the server).
     *
     * It generates a function that can be passed as a callback function to a gRPC call, will understand
     * pagination-specific fields in the response, and call the users' callback after having those fields
     * parsed.
     *
     * @param request Request object. It needs to be passed to all subsequent next page requests
     * (the main content of the request object stays unchanged, only the next page token changes)
     * @param callback The user's callback that expects the page content, next page request, and raw response.
     */
    generateParseResponseCallback(request, callback) {
      const resourceFieldName = this.pageDescriptor.resourceField;
      const responsePageTokenFieldName = this.pageDescriptor.responsePageTokenField;
      const requestPageTokenFieldName = this.pageDescriptor.requestPageTokenField;
      return (err, response) => {
        if (err) {
          callback(err);
          return;
        }
        if (!request) {
          callback(new googleError_1.GoogleError("Undefined request in pagination method callback."));
          return;
        }
        if (!response) {
          callback(new googleError_1.GoogleError("Undefined response in pagination method callback."));
          return;
        }
        const resources = response[resourceFieldName] || [];
        const pageToken = response[responsePageTokenFieldName];
        let nextPageRequest = null;
        if (pageToken) {
          nextPageRequest = Object.assign({}, request);
          nextPageRequest[requestPageTokenFieldName] = pageToken;
        }
        callback(err, resources, nextPageRequest, response);
      };
    }
    /**
     * Adds a special ability to understand pagination-specific fields to the existing gRPC call.
     * The original gRPC call just calls callback(err, result).
     * The wrapped one will call callback(err, resources, nextPageRequest, rawResponse) instead.
     *
     * @param func gRPC call (normally, a service stub call). The gRPC call is expected to accept four parameters:
     * request, metadata, call options, and callback.
     */
    wrap(func) {
      const self = this;
      return function wrappedCall(argument, metadata, options, callback) {
        return func(argument, metadata, options, self.generateParseResponseCallback(argument, callback));
      };
    }
    /**
     * Makes it possible to use both callback-based and promise-based calls.
     * Returns an OngoingCall or OngoingCallPromise object.
     * Regardless of which one is returned, it always has a `.callback` to call.
     *
     * @param settings Call settings. Can only be used to replace Promise with another promise implementation.
     * @param [callback] Callback to be called, if any.
     */
    init(callback) {
      if (callback) {
        return new call_1.OngoingCall(callback);
      }
      return new call_1.OngoingCallPromise();
    }
    /**
     * Implements auto-pagination logic.
     *
     * @param apiCall A function that performs gRPC request and calls its callback with a response or an error.
     * It's supposed to be a gRPC service stub function wrapped into several layers of wrappers that make it
     * accept just two parameters: (request, callback).
     * @param request A request object that came from the user.
     * @param settings Call settings. We are interested in `maxResults` and `autoPaginate` (they are optional).
     * @param ongoingCall An instance of OngoingCall or OngoingCallPromise that can be used for call cancellation,
     * and is used to return results to the user.
     */
    call(apiCall, request, settings, ongoingCall) {
      request = Object.assign({}, request);
      if (!settings.autoPaginate) {
        ongoingCall.call(apiCall, request);
        return;
      }
      if (request.pageSize && settings.autoPaginate) {
        (0, warnings_1.warn)("autoPaginate true", "Providing a pageSize without setting autoPaginate to false will still return all results. See https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination for more information on how to configure manual paging", "AutopaginateTrueWarning");
      }
      const maxResults = settings.maxResults || -1;
      const resourceCollector2 = new resourceCollector_1.ResourceCollector(apiCall, maxResults);
      resourceCollector2.processAllPages(request).then((resources) => ongoingCall.callback(null, resources), (err) => ongoingCall.callback(err));
    }
    fail(ongoingCall, err) {
      ongoingCall.callback(err);
    }
    result(ongoingCall) {
      return ongoingCall.promise;
    }
  }
  pagedApiCaller.PagedApiCaller = PagedApiCaller;
  return pagedApiCaller;
}
var hasRequiredPageDescriptor;
function requirePageDescriptor() {
  if (hasRequiredPageDescriptor) return pageDescriptor;
  hasRequiredPageDescriptor = 1;
  Object.defineProperty(pageDescriptor, "__esModule", { value: true });
  pageDescriptor.PageDescriptor = void 0;
  const stream_1 = require$$0$1;
  const normalApiCaller_1 = requireNormalApiCaller();
  const warnings_1 = requireWarnings();
  const pagedApiCaller_1 = requirePagedApiCaller();
  const maxAttemptsEmptyResponse = 10;
  class PageDescriptor {
    requestPageTokenField;
    responsePageTokenField;
    requestPageSizeField;
    resourceField;
    constructor(requestPageTokenField, responsePageTokenField, resourceField) {
      this.requestPageTokenField = requestPageTokenField;
      this.responsePageTokenField = responsePageTokenField;
      this.resourceField = resourceField;
    }
    /**
     * Creates a new object Stream which emits the resource on 'data' event.
     */
    createStream(apiCall, request, options) {
      if (options?.autoPaginate) {
        (0, warnings_1.warn)("autoPaginate true", "Autopaginate will always be set to false in stream paging methods. See more info at https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination for more information on how to configure paging calls", "AutopaginateTrueWarning");
      }
      const stream = new stream_1.PassThrough({ objectMode: true });
      options = Object.assign({}, options, { autoPaginate: false });
      const maxResults = "maxResults" in options ? options.maxResults : -1;
      let pushCount = 0;
      let started = false;
      function callback(err, resources, next, apiResp) {
        if (err) {
          stream.emit("error", err);
          return;
        }
        stream.emit("response", apiResp);
        for (let i = 0; i < resources.length; ++i) {
          if (stream._readableState.ended) {
            return;
          }
          if (resources[i] === null) {
            continue;
          }
          stream.push(resources[i]);
          pushCount++;
          if (pushCount === maxResults) {
            stream.end();
          }
        }
        if (stream._readableState.ended) {
          return;
        }
        if (!next) {
          stream.end();
          return;
        }
        if ("pageToken" in options) {
          delete options.pageToken;
        }
        if (stream.isPaused()) {
          request = next;
          started = false;
        } else {
          setImmediate(apiCall, next, options, callback);
        }
      }
      stream.on("resume", async () => {
        if (!started) {
          started = true;
          await apiCall(request, options, callback);
        }
      });
      return stream;
    }
    /**
     * Create an async iterable which can be recursively called for data on-demand.
     */
    asyncIterate(apiCall, request, options) {
      if (options?.autoPaginate) {
        (0, warnings_1.warn)("autoPaginate true", "Autopaginate will always be set to false in Async paging methods. See more info at https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination for more information on how to configure paging calls", "AutopaginateTrueWarning");
      }
      options = Object.assign({}, options, { autoPaginate: false });
      const iterable = this.createIterator(apiCall, request, options);
      return iterable;
    }
    createIterator(apiCall, request, options) {
      const asyncIterable = {
        [Symbol.asyncIterator]() {
          let nextPageRequest = request;
          const cache = [];
          return {
            async next() {
              if (cache.length > 0) {
                return Promise.resolve({
                  done: false,
                  value: cache.shift()
                });
              }
              let attempts = 0;
              while (cache.length === 0 && nextPageRequest) {
                let result;
                [result, nextPageRequest] = await apiCall(nextPageRequest, options);
                if (result && !Array.isArray(result)) {
                  for (const [key, value] of Object.entries(result)) {
                    cache.push([key, value]);
                  }
                } else {
                  cache.push(...result);
                }
                if (cache.length === 0) {
                  ++attempts;
                  if (attempts > maxAttemptsEmptyResponse) {
                    break;
                  }
                }
              }
              if (cache.length === 0) {
                return Promise.resolve({ done: true, value: void 0 });
              }
              return Promise.resolve({ done: false, value: cache.shift() });
            }
          };
        }
      };
      return asyncIterable;
    }
    getApiCaller(settings) {
      if (!settings.autoPaginate) {
        return new normalApiCaller_1.NormalApiCaller();
      }
      return new pagedApiCaller_1.PagedApiCaller(this);
    }
  }
  pageDescriptor.PageDescriptor = PageDescriptor;
  return pageDescriptor;
}
var streamDescriptor = {};
var hasRequiredStreamDescriptor;
function requireStreamDescriptor() {
  if (hasRequiredStreamDescriptor) return streamDescriptor;
  hasRequiredStreamDescriptor = 1;
  Object.defineProperty(streamDescriptor, "__esModule", { value: true });
  streamDescriptor.StreamDescriptor = void 0;
  const streamingApiCaller_1 = requireStreamingApiCaller();
  class StreamDescriptor {
    type;
    streaming;
    // needed for browser support
    rest;
    gaxStreamingRetries;
    constructor(streamType, rest, gaxStreamingRetries) {
      this.type = streamType;
      this.streaming = true;
      this.rest = rest;
      this.gaxStreamingRetries = gaxStreamingRetries;
    }
    getApiCaller() {
      return new streamingApiCaller_1.StreamingApiCaller(this);
    }
  }
  streamDescriptor.StreamDescriptor = StreamDescriptor;
  return streamDescriptor;
}
var bundleDescriptor = {};
var bundleApiCaller = {};
var hasRequiredBundleApiCaller;
function requireBundleApiCaller() {
  if (hasRequiredBundleApiCaller) return bundleApiCaller;
  hasRequiredBundleApiCaller = 1;
  Object.defineProperty(bundleApiCaller, "__esModule", { value: true });
  bundleApiCaller.BundleApiCaller = void 0;
  const call_1 = requireCall();
  const googleError_1 = requireGoogleError();
  class BundleApiCaller {
    bundler;
    constructor(bundler) {
      this.bundler = bundler;
    }
    init(callback) {
      if (callback) {
        return new call_1.OngoingCall(callback);
      }
      return new call_1.OngoingCallPromise();
    }
    wrap(func) {
      return func;
    }
    call(apiCall, argument, settings, status2) {
      if (!settings.isBundling) {
        throw new googleError_1.GoogleError("Bundling enabled with no isBundling!");
      }
      status2.call((argument2, callback) => {
        this.bundler.schedule(apiCall, argument2, callback);
        return status2;
      }, argument);
    }
    fail(canceller, err) {
      canceller.callback(err);
    }
    result(canceller) {
      return canceller.promise;
    }
  }
  bundleApiCaller.BundleApiCaller = BundleApiCaller;
  return bundleApiCaller;
}
var bundleExecutor = {};
var bundlingUtils = {};
var hasRequiredBundlingUtils;
function requireBundlingUtils() {
  if (hasRequiredBundlingUtils) return bundlingUtils;
  hasRequiredBundlingUtils = 1;
  Object.defineProperty(bundlingUtils, "__esModule", { value: true });
  bundlingUtils.computeBundleId = computeBundleId;
  function computeBundleId(obj, discriminatorFields) {
    const ids = [];
    let hasIds = false;
    for (const field of discriminatorFields) {
      const id = at(obj, field);
      if (id === void 0) {
        ids.push(null);
      } else {
        hasIds = true;
        ids.push(id);
      }
    }
    if (!hasIds) {
      return void 0;
    }
    return JSON.stringify(ids);
  }
  function at(obj, field) {
    const pathParts = field.split(".");
    let currentObj = obj;
    for (const pathPart of pathParts) {
      currentObj = currentObj?.[pathPart];
    }
    return currentObj;
  }
  return bundlingUtils;
}
var task = {};
var hasRequiredTask;
function requireTask() {
  if (hasRequiredTask) return task;
  hasRequiredTask = 1;
  Object.defineProperty(task, "__esModule", { value: true });
  task.Task = void 0;
  task.deepCopyForResponse = deepCopyForResponse;
  const status_1 = requireStatus();
  const googleError_1 = requireGoogleError();
  function deepCopyForResponse(obj, subresponseInfo) {
    let result;
    if (obj === null) {
      return null;
    }
    if (obj === void 0) {
      return void 0;
    }
    if (Array.isArray(obj)) {
      result = [];
      obj.forEach((element) => {
        result.push(deepCopyForResponse(element, null));
      });
      return result;
    }
    if (obj.copy !== void 0) {
      return obj.copy();
    }
    if (obj instanceof ArrayBuffer) {
      return obj.slice(0);
    }
    if (typeof obj === "object") {
      result = {};
      Object.keys(obj).forEach((key) => {
        if (subresponseInfo && key === subresponseInfo.field && Array.isArray(obj[key])) {
          result[key] = obj[key].slice(subresponseInfo.start, subresponseInfo.end);
        } else {
          result[key] = deepCopyForResponse(obj[key], null);
        }
      });
      return result;
    }
    return obj;
  }
  class Task {
    _apiCall;
    _request;
    _bundledField;
    _subresponseField;
    _data;
    callCanceller;
    /**
     * A task coordinates the execution of a single bundle.
     *
     * @param {function} apiCall - The function to conduct calling API.
     * @param {Object} bundlingRequest - The base request object to be used
     *   for the actual API call.
     * @param {string} bundledField - The name of the field in bundlingRequest
     *   to be bundled.
     * @param {string=} subresponseField - The name of the field in the response
     *   to be passed to the callback.
     * @constructor
     * @private
     */
    constructor(apiCall, bundlingRequest, bundledField, subresponseField) {
      this._apiCall = apiCall;
      this._request = bundlingRequest;
      this._bundledField = bundledField;
      this._subresponseField = subresponseField;
      this._data = [];
    }
    /**
     * Returns the number of elements in a task.
     * @return {number} The number of elements.
     */
    getElementCount() {
      let count = 0;
      for (let i = 0; i < this._data.length; ++i) {
        count += this._data[i].elements.length;
      }
      return count;
    }
    /**
     * Returns the total byte size of the elements in a task.
     * @return {number} The byte size.
     */
    getRequestByteSize() {
      let size = 0;
      for (let i = 0; i < this._data.length; ++i) {
        size += this._data[i].bytes;
      }
      return size;
    }
    /**
     * Invokes the actual API call with current elements.
     * @return {string[]} - the list of ids for invocations to be run.
     */
    run() {
      if (this._data.length === 0) {
        return [];
      }
      const request = this._request;
      const elements = [];
      const ids = [];
      for (let i = 0; i < this._data.length; ++i) {
        elements.push(...this._data[i].elements);
        ids.push(this._data[i].callback.id);
      }
      request[this._bundledField] = elements;
      const self = this;
      this.callCanceller = this._apiCall(request, (err, response) => {
        const responses = [];
        if (err) {
          self._data.forEach(() => {
            responses.push(void 0);
          });
        } else {
          let subresponseInfo = null;
          if (self._subresponseField) {
            subresponseInfo = {
              field: self._subresponseField,
              start: 0
            };
          }
          self._data.forEach((data) => {
            if (subresponseInfo) {
              subresponseInfo.end = subresponseInfo.start + data.elements.length;
            }
            responses.push(deepCopyForResponse(response, subresponseInfo));
            if (subresponseInfo) {
              subresponseInfo.start = subresponseInfo.end;
            }
          });
        }
        for (let i = 0; i < self._data.length; ++i) {
          if (self._data[i].cancelled) {
            const error = new googleError_1.GoogleError("cancelled");
            error.code = status_1.Status.CANCELLED;
            self._data[i].callback(error);
          } else {
            self._data[i].callback(err, responses[i]);
          }
        }
      });
      return ids;
    }
    /**
     * Appends the list of elements into the task.
     * @param {Object[]} elements - the new list of elements.
     * @param {number} bytes - the byte size required to encode elements in the API.
     * @param {APICallback} callback - the callback of the method call.
     */
    extend(elements, bytes, callback) {
      this._data.push({
        elements,
        bytes,
        callback
      });
    }
    /**
     * Cancels a part of elements.
     * @param {string} id - The identifier of the part of elements.
     * @return {boolean} Whether the entire task will be canceled or not.
     */
    cancel(id) {
      if (this.callCanceller) {
        let allCancelled = true;
        this._data.forEach((d) => {
          if (d.callback.id === id) {
            d.cancelled = true;
          }
          if (!d.cancelled) {
            allCancelled = false;
          }
        });
        if (allCancelled) {
          this.callCanceller.cancel();
        }
        return allCancelled;
      }
      for (let i = 0; i < this._data.length; ++i) {
        if (this._data[i].callback.id === id) {
          const error = new googleError_1.GoogleError("cancelled");
          error.code = status_1.Status.CANCELLED;
          this._data[i].callback(error);
          this._data.splice(i, 1);
          break;
        }
      }
      return this._data.length === 0;
    }
  }
  task.Task = Task;
  return task;
}
var hasRequiredBundleExecutor;
function requireBundleExecutor() {
  if (hasRequiredBundleExecutor) return bundleExecutor;
  hasRequiredBundleExecutor = 1;
  Object.defineProperty(bundleExecutor, "__esModule", { value: true });
  bundleExecutor.BundleExecutor = void 0;
  const status_1 = requireStatus();
  const googleError_1 = requireGoogleError();
  const warnings_1 = requireWarnings();
  const bundlingUtils_1 = requireBundlingUtils();
  const task_1 = requireTask();
  function noop() {
  }
  class BundleExecutor {
    _options;
    _descriptor;
    _tasks;
    _timers;
    _invocations;
    _invocationId;
    /**
     * Organizes requests for an api service that requires to bundle them.
     *
     * @param {BundleOptions} bundleOptions - configures strategy this instance
     *   uses when executing bundled functions.
     * @param {BundleDescriptor} bundleDescriptor - the description of the bundling.
     * @constructor
     */
    constructor(bundleOptions, bundleDescriptor2) {
      this._options = bundleOptions;
      this._descriptor = bundleDescriptor2;
      this._tasks = {};
      this._timers = {};
      this._invocations = {};
      this._invocationId = 0;
    }
    /**
     * Schedule a method call.
     *
     * @param {function} apiCall - the function for an API call.
     * @param {Object} request - the request object to be bundled with others.
     * @param {APICallback} callback - the callback to be called when the method finished.
     * @return {function()} - the function to cancel the scheduled invocation.
     */
    schedule(apiCall, request, callback) {
      const bundleId = (0, bundlingUtils_1.computeBundleId)(request, this._descriptor.requestDiscriminatorFields);
      callback = callback || noop;
      if (bundleId === void 0) {
        (0, warnings_1.warn)("bundling_schedule_bundleid_undefined", `The request does not have enough information for request bundling. Invoking immediately. Request: ${JSON.stringify(request)} discriminator fields: ${this._descriptor.requestDiscriminatorFields}`);
        return apiCall(request, callback);
      }
      if (request[this._descriptor.bundledField] === void 0) {
        (0, warnings_1.warn)("bundling_no_bundled_field", `Request does not contain field ${this._descriptor.bundledField} that must present for bundling. Invoking immediately. Request: ${JSON.stringify(request)}`);
        return apiCall(request, callback);
      }
      if (!(bundleId in this._tasks)) {
        this._tasks[bundleId] = new task_1.Task(apiCall, request, this._descriptor.bundledField, this._descriptor.subresponseField);
      }
      let task2 = this._tasks[bundleId];
      callback.id = String(this._invocationId++);
      this._invocations[callback.id] = bundleId;
      const bundledField = request[this._descriptor.bundledField];
      const elementCount = bundledField.length;
      let requestBytes = 0;
      const self = this;
      bundledField.forEach((obj) => {
        requestBytes += this._descriptor.byteLengthFunction(obj);
      });
      const countLimit = this._options.elementCountLimit || 0;
      const byteLimit = this._options.requestByteLimit || 0;
      if (countLimit > 0 && elementCount > countLimit || byteLimit > 0 && requestBytes >= byteLimit) {
        let message;
        if (countLimit > 0 && elementCount > countLimit) {
          message = "The number of elements " + elementCount + " exceeds the limit " + this._options.elementCountLimit;
        } else {
          message = "The required bytes " + requestBytes + " exceeds the limit " + this._options.requestByteLimit;
        }
        const error = new googleError_1.GoogleError(message);
        error.code = status_1.Status.INVALID_ARGUMENT;
        callback(error);
        return {
          cancel: noop
        };
      }
      const existingCount = task2.getElementCount();
      const existingBytes = task2.getRequestByteSize();
      if (countLimit > 0 && elementCount + existingCount >= countLimit || byteLimit > 0 && requestBytes + existingBytes >= byteLimit) {
        this._runNow(bundleId);
        this._tasks[bundleId] = new task_1.Task(apiCall, request, this._descriptor.bundledField, this._descriptor.subresponseField);
        task2 = this._tasks[bundleId];
      }
      task2.extend(bundledField, requestBytes, callback);
      const ret = {
        cancel() {
          self._cancel(callback.id);
        }
      };
      const countThreshold = this._options.elementCountThreshold || 0;
      const sizeThreshold = this._options.requestByteThreshold || 0;
      if (countThreshold > 0 && task2.getElementCount() >= countThreshold || sizeThreshold > 0 && task2.getRequestByteSize() >= sizeThreshold) {
        this._runNow(bundleId);
        return ret;
      }
      if (!(bundleId in this._timers) && this._options.delayThreshold > 0) {
        this._timers[bundleId] = setTimeout(() => {
          delete this._timers[bundleId];
          this._runNow(bundleId);
        }, this._options.delayThreshold);
      }
      return ret;
    }
    /**
     * Clears scheduled timeout if it exists.
     *
     * @param {String} bundleId - the id for the task whose timeout needs to be
     *   cleared.
     * @private
     */
    _maybeClearTimeout(bundleId) {
      if (bundleId in this._timers) {
        const timerId = this._timers[bundleId];
        delete this._timers[bundleId];
        clearTimeout(timerId);
      }
    }
    /**
     * Cancels an event.
     *
     * @param {String} id - The id for the event in the task.
     * @private
     */
    _cancel(id) {
      if (!(id in this._invocations)) {
        return;
      }
      const bundleId = this._invocations[id];
      if (!(bundleId in this._tasks)) {
        return;
      }
      const task2 = this._tasks[bundleId];
      delete this._invocations[id];
      if (task2.cancel(id)) {
        this._maybeClearTimeout(bundleId);
        delete this._tasks[bundleId];
      }
    }
    /**
     * Invokes a task.
     *
     * @param {String} bundleId - The id for the task.
     * @private
     */
    _runNow(bundleId) {
      if (!(bundleId in this._tasks)) {
        (0, warnings_1.warn)("bundle_runnow_bundleid_unknown", `No such bundleid: ${bundleId}`);
        return;
      }
      this._maybeClearTimeout(bundleId);
      const task2 = this._tasks[bundleId];
      delete this._tasks[bundleId];
      task2.run().forEach((id) => {
        delete this._invocations[id];
      });
    }
  }
  bundleExecutor.BundleExecutor = BundleExecutor;
  return bundleExecutor;
}
var hasRequiredBundleDescriptor;
function requireBundleDescriptor() {
  if (hasRequiredBundleDescriptor) return bundleDescriptor;
  hasRequiredBundleDescriptor = 1;
  Object.defineProperty(bundleDescriptor, "__esModule", { value: true });
  bundleDescriptor.BundleDescriptor = void 0;
  const normalApiCaller_1 = requireNormalApiCaller();
  const bundleApiCaller_1 = requireBundleApiCaller();
  const bundleExecutor_1 = requireBundleExecutor();
  const util_1 = requireUtil();
  class BundleDescriptor {
    bundledField;
    requestDiscriminatorFields;
    subresponseField;
    byteLengthFunction;
    /**
     * Describes the structure of bundled call.
     *
     * requestDiscriminatorFields may include '.' as a separator, which is used to
     * indicate object traversal. This allows fields in nested objects to be used
     * to determine what request to bundle.
     *
     * @property {String} bundledField
     * @property {String} requestDiscriminatorFields
     * @property {String} subresponseField
     * @property {Function} byteLengthFunction
     *
     * @param {String} bundledField - the repeated field in the request message
     *   that will have its elements aggregated by bundling.
     * @param {String} requestDiscriminatorFields - a list of fields in the
     *   target request message class that are used to detemrine which request
     *   messages should be bundled together.
     * @param {String} subresponseField - an optional field, when present it
     *   indicates the field in the response message that should be used to
     *   demultiplex the response into multiple response messages.
     * @param {Function} byteLengthFunction - a function to obtain the byte
     *   length to be consumed for the bundled field messages. Because Node.JS
     *   protobuf.js/gRPC uses builtin Objects for the user-visible data and
     *   internally they are encoded/decoded in protobuf manner, this function
     *   is actually necessary to calculate the byte length.
     * @constructor
     */
    constructor(bundledField, requestDiscriminatorFields, subresponseField, byteLengthFunction) {
      if (!byteLengthFunction && typeof subresponseField === "function") {
        byteLengthFunction = subresponseField;
        subresponseField = null;
      }
      this.bundledField = bundledField;
      this.requestDiscriminatorFields = requestDiscriminatorFields.map(util_1.toCamelCase);
      this.subresponseField = subresponseField;
      this.byteLengthFunction = byteLengthFunction;
    }
    getApiCaller(settings) {
      if (settings.isBundling === false) {
        return new normalApiCaller_1.NormalApiCaller();
      }
      return new bundleApiCaller_1.BundleApiCaller(new bundleExecutor_1.BundleExecutor(settings.bundleOptions, this));
    }
  }
  bundleDescriptor.BundleDescriptor = BundleDescriptor;
  return bundleDescriptor;
}
var hasRequiredDescriptor;
function requireDescriptor() {
  if (hasRequiredDescriptor) return descriptor;
  hasRequiredDescriptor = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BundleDescriptor = exports.StreamDescriptor = exports.PageDescriptor = exports.LongrunningDescriptor = void 0;
    var longRunningDescriptor_1 = requireLongRunningDescriptor();
    Object.defineProperty(exports, "LongrunningDescriptor", { enumerable: true, get: function() {
      return longRunningDescriptor_1.LongRunningDescriptor;
    } });
    var pageDescriptor_1 = requirePageDescriptor();
    Object.defineProperty(exports, "PageDescriptor", { enumerable: true, get: function() {
      return pageDescriptor_1.PageDescriptor;
    } });
    var streamDescriptor_1 = requireStreamDescriptor();
    Object.defineProperty(exports, "StreamDescriptor", { enumerable: true, get: function() {
      return streamDescriptor_1.StreamDescriptor;
    } });
    var bundleDescriptor_1 = requireBundleDescriptor();
    Object.defineProperty(exports, "BundleDescriptor", { enumerable: true, get: function() {
      return bundleDescriptor_1.BundleDescriptor;
    } });
  })(descriptor);
  return descriptor;
}
const interfaces$2 = { "google.longrunning.Operations": { "retry_codes": { "idempotent": ["DEADLINE_EXCEEDED", "UNAVAILABLE"], "non_idempotent": [] }, "retry_params": { "default": { "initial_retry_delay_millis": 100, "retry_delay_multiplier": 1.3, "max_retry_delay_millis": 6e4, "initial_rpc_timeout_millis": 9e4, "rpc_timeout_multiplier": 1, "max_rpc_timeout_millis": 9e4, "total_timeout_millis": 6e5 } }, "methods": { "GetOperation": { "timeout_millis": 6e4, "retry_codes_name": "idempotent", "retry_params_name": "default" }, "ListOperations": { "timeout_millis": 6e4, "retry_codes_name": "idempotent", "retry_params_name": "default" }, "CancelOperation": { "timeout_millis": 6e4, "retry_codes_name": "idempotent", "retry_params_name": "default" }, "DeleteOperation": { "timeout_millis": 6e4, "retry_codes_name": "idempotent", "retry_params_name": "default" } } } };
const require$$3 = {
  interfaces: interfaces$2
};
const nested$2 = /* @__PURE__ */ JSON.parse('{"google":{"nested":{"longrunning":{"options":{"cc_enable_arenas":true,"csharp_namespace":"Google.LongRunning","go_package":"google.golang.org/genproto/googleapis/longrunning;longrunning","java_multiple_files":true,"java_outer_classname":"OperationsProto","java_package":"com.google.longrunning","php_namespace":"Google\\\\LongRunning"},"nested":{"operationInfo":{"type":"google.longrunning.OperationInfo","id":1049,"extend":"google.protobuf.MethodOptions"},"Operations":{"options":{"(google.api.default_host)":"longrunning.googleapis.com"},"methods":{"ListOperations":{"requestType":"ListOperationsRequest","responseType":"ListOperationsResponse","options":{"(google.api.http).get":"/v1/{name=operations}","(google.api.method_signature)":"name,filter"},"parsedOptions":[{"(google.api.http)":{"get":"/v1/{name=operations}"}},{"(google.api.method_signature)":"name,filter"}]},"GetOperation":{"requestType":"GetOperationRequest","responseType":"Operation","options":{"(google.api.http).get":"/v1/operations/{name}","(google.api.method_signature)":"name"},"parsedOptions":[{"(google.api.http)":{"get":"/v1/operations/{name}"}},{"(google.api.method_signature)":"name"}]},"DeleteOperation":{"requestType":"DeleteOperationRequest","responseType":"google.protobuf.Empty","options":{"(google.api.http).delete":"/v1/{name=operations/**}","(google.api.method_signature)":"name"},"parsedOptions":[{"(google.api.http)":{"delete":"/v1/{name=operations/**}"}},{"(google.api.method_signature)":"name"}]},"CancelOperation":{"requestType":"CancelOperationRequest","responseType":"google.protobuf.Empty","options":{"(google.api.http).post":"/v1/{name=operations/**}:cancel","(google.api.http).body":"*","(google.api.method_signature)":"name"},"parsedOptions":[{"(google.api.http)":{"post":"/v1/{name=operations/**}:cancel","body":"*"}},{"(google.api.method_signature)":"name"}]},"WaitOperation":{"requestType":"WaitOperationRequest","responseType":"Operation"}}},"Operation":{"oneofs":{"result":{"oneof":["error","response"]}},"fields":{"name":{"type":"string","id":1},"metadata":{"type":"google.protobuf.Any","id":2},"done":{"type":"bool","id":3},"error":{"type":"google.rpc.Status","id":4},"response":{"type":"google.protobuf.Any","id":5}}},"GetOperationRequest":{"fields":{"name":{"type":"string","id":1}}},"ListOperationsRequest":{"fields":{"name":{"type":"string","id":4},"filter":{"type":"string","id":1},"pageSize":{"type":"int32","id":2},"pageToken":{"type":"string","id":3}}},"ListOperationsResponse":{"fields":{"operations":{"rule":"repeated","type":"Operation","id":1},"nextPageToken":{"type":"string","id":2}}},"CancelOperationRequest":{"fields":{"name":{"type":"string","id":1}}},"DeleteOperationRequest":{"fields":{"name":{"type":"string","id":1}}},"WaitOperationRequest":{"fields":{"name":{"type":"string","id":1},"timeout":{"type":"google.protobuf.Duration","id":2}}},"OperationInfo":{"fields":{"responseType":{"type":"string","id":1},"metadataType":{"type":"string","id":2}}}}},"api":{"options":{"go_package":"google.golang.org/genproto/googleapis/api/annotations;annotations","java_multiple_files":true,"java_outer_classname":"ClientProto","java_package":"com.google.api","objc_class_prefix":"GAPI","cc_enable_arenas":true},"nested":{"http":{"type":"HttpRule","id":72295728,"extend":"google.protobuf.MethodOptions"},"Http":{"fields":{"rules":{"rule":"repeated","type":"HttpRule","id":1},"fullyDecodeReservedExpansion":{"type":"bool","id":2}}},"HttpRule":{"oneofs":{"pattern":{"oneof":["get","put","post","delete","patch","custom"]}},"fields":{"selector":{"type":"string","id":1},"get":{"type":"string","id":2},"put":{"type":"string","id":3},"post":{"type":"string","id":4},"delete":{"type":"string","id":5},"patch":{"type":"string","id":6},"custom":{"type":"CustomHttpPattern","id":8},"body":{"type":"string","id":7},"responseBody":{"type":"string","id":12},"additionalBindings":{"rule":"repeated","type":"HttpRule","id":11}}},"CustomHttpPattern":{"fields":{"kind":{"type":"string","id":1},"path":{"type":"string","id":2}}},"methodSignature":{"rule":"repeated","type":"string","id":1051,"extend":"google.protobuf.MethodOptions"},"defaultHost":{"type":"string","id":1049,"extend":"google.protobuf.ServiceOptions"},"oauthScopes":{"type":"string","id":1050,"extend":"google.protobuf.ServiceOptions"}}},"protobuf":{"options":{"go_package":"github.com/golang/protobuf/protoc-gen-go/descriptor;descriptor","java_package":"com.google.protobuf","java_outer_classname":"DescriptorProtos","csharp_namespace":"Google.Protobuf.Reflection","objc_class_prefix":"GPB","cc_enable_arenas":true,"optimize_for":"SPEED"},"nested":{"FileDescriptorSet":{"fields":{"file":{"rule":"repeated","type":"FileDescriptorProto","id":1}}},"FileDescriptorProto":{"fields":{"name":{"type":"string","id":1},"package":{"type":"string","id":2},"dependency":{"rule":"repeated","type":"string","id":3},"publicDependency":{"rule":"repeated","type":"int32","id":10,"options":{"packed":false}},"weakDependency":{"rule":"repeated","type":"int32","id":11,"options":{"packed":false}},"messageType":{"rule":"repeated","type":"DescriptorProto","id":4},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":5},"service":{"rule":"repeated","type":"ServiceDescriptorProto","id":6},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":7},"options":{"type":"FileOptions","id":8},"sourceCodeInfo":{"type":"SourceCodeInfo","id":9},"syntax":{"type":"string","id":12}}},"DescriptorProto":{"fields":{"name":{"type":"string","id":1},"field":{"rule":"repeated","type":"FieldDescriptorProto","id":2},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":6},"nestedType":{"rule":"repeated","type":"DescriptorProto","id":3},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":4},"extensionRange":{"rule":"repeated","type":"ExtensionRange","id":5},"oneofDecl":{"rule":"repeated","type":"OneofDescriptorProto","id":8},"options":{"type":"MessageOptions","id":7},"reservedRange":{"rule":"repeated","type":"ReservedRange","id":9},"reservedName":{"rule":"repeated","type":"string","id":10}},"nested":{"ExtensionRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2},"options":{"type":"ExtensionRangeOptions","id":3}}},"ReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"ExtensionRangeOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"FieldDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":3},"label":{"type":"Label","id":4},"type":{"type":"Type","id":5},"typeName":{"type":"string","id":6},"extendee":{"type":"string","id":2},"defaultValue":{"type":"string","id":7},"oneofIndex":{"type":"int32","id":9},"jsonName":{"type":"string","id":10},"options":{"type":"FieldOptions","id":8},"proto3Optional":{"type":"bool","id":17}},"nested":{"Type":{"values":{"TYPE_DOUBLE":1,"TYPE_FLOAT":2,"TYPE_INT64":3,"TYPE_UINT64":4,"TYPE_INT32":5,"TYPE_FIXED64":6,"TYPE_FIXED32":7,"TYPE_BOOL":8,"TYPE_STRING":9,"TYPE_GROUP":10,"TYPE_MESSAGE":11,"TYPE_BYTES":12,"TYPE_UINT32":13,"TYPE_ENUM":14,"TYPE_SFIXED32":15,"TYPE_SFIXED64":16,"TYPE_SINT32":17,"TYPE_SINT64":18}},"Label":{"values":{"LABEL_OPTIONAL":1,"LABEL_REQUIRED":2,"LABEL_REPEATED":3}}}},"OneofDescriptorProto":{"fields":{"name":{"type":"string","id":1},"options":{"type":"OneofOptions","id":2}}},"EnumDescriptorProto":{"fields":{"name":{"type":"string","id":1},"value":{"rule":"repeated","type":"EnumValueDescriptorProto","id":2},"options":{"type":"EnumOptions","id":3},"reservedRange":{"rule":"repeated","type":"EnumReservedRange","id":4},"reservedName":{"rule":"repeated","type":"string","id":5}},"nested":{"EnumReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"EnumValueDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":2},"options":{"type":"EnumValueOptions","id":3}}},"ServiceDescriptorProto":{"fields":{"name":{"type":"string","id":1},"method":{"rule":"repeated","type":"MethodDescriptorProto","id":2},"options":{"type":"ServiceOptions","id":3}}},"MethodDescriptorProto":{"fields":{"name":{"type":"string","id":1},"inputType":{"type":"string","id":2},"outputType":{"type":"string","id":3},"options":{"type":"MethodOptions","id":4},"clientStreaming":{"type":"bool","id":5,"options":{"default":false}},"serverStreaming":{"type":"bool","id":6,"options":{"default":false}}}},"FileOptions":{"fields":{"javaPackage":{"type":"string","id":1},"javaOuterClassname":{"type":"string","id":8},"javaMultipleFiles":{"type":"bool","id":10,"options":{"default":false}},"javaGenerateEqualsAndHash":{"type":"bool","id":20,"options":{"deprecated":true}},"javaStringCheckUtf8":{"type":"bool","id":27,"options":{"default":false}},"optimizeFor":{"type":"OptimizeMode","id":9,"options":{"default":"SPEED"}},"goPackage":{"type":"string","id":11},"ccGenericServices":{"type":"bool","id":16,"options":{"default":false}},"javaGenericServices":{"type":"bool","id":17,"options":{"default":false}},"pyGenericServices":{"type":"bool","id":18,"options":{"default":false}},"phpGenericServices":{"type":"bool","id":42,"options":{"default":false}},"deprecated":{"type":"bool","id":23,"options":{"default":false}},"ccEnableArenas":{"type":"bool","id":31,"options":{"default":true}},"objcClassPrefix":{"type":"string","id":36},"csharpNamespace":{"type":"string","id":37},"swiftPrefix":{"type":"string","id":39},"phpClassPrefix":{"type":"string","id":40},"phpNamespace":{"type":"string","id":41},"phpMetadataNamespace":{"type":"string","id":44},"rubyPackage":{"type":"string","id":45},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[38,38]],"nested":{"OptimizeMode":{"values":{"SPEED":1,"CODE_SIZE":2,"LITE_RUNTIME":3}}}},"MessageOptions":{"fields":{"messageSetWireFormat":{"type":"bool","id":1,"options":{"default":false}},"noStandardDescriptorAccessor":{"type":"bool","id":2,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"mapEntry":{"type":"bool","id":7},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[8,8],[9,9]]},"FieldOptions":{"fields":{"ctype":{"type":"CType","id":1,"options":{"default":"STRING"}},"packed":{"type":"bool","id":2},"jstype":{"type":"JSType","id":6,"options":{"default":"JS_NORMAL"}},"lazy":{"type":"bool","id":5,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"weak":{"type":"bool","id":10,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[4,4]],"nested":{"CType":{"values":{"STRING":0,"CORD":1,"STRING_PIECE":2}},"JSType":{"values":{"JS_NORMAL":0,"JS_STRING":1,"JS_NUMBER":2}}}},"OneofOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"EnumOptions":{"fields":{"allowAlias":{"type":"bool","id":2},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[5,5]]},"EnumValueOptions":{"fields":{"deprecated":{"type":"bool","id":1,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"ServiceOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"MethodOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"idempotencyLevel":{"type":"IdempotencyLevel","id":34,"options":{"default":"IDEMPOTENCY_UNKNOWN"}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"nested":{"IdempotencyLevel":{"values":{"IDEMPOTENCY_UNKNOWN":0,"NO_SIDE_EFFECTS":1,"IDEMPOTENT":2}}}},"UninterpretedOption":{"fields":{"name":{"rule":"repeated","type":"NamePart","id":2},"identifierValue":{"type":"string","id":3},"positiveIntValue":{"type":"uint64","id":4},"negativeIntValue":{"type":"int64","id":5},"doubleValue":{"type":"double","id":6},"stringValue":{"type":"bytes","id":7},"aggregateValue":{"type":"string","id":8}},"nested":{"NamePart":{"fields":{"namePart":{"rule":"required","type":"string","id":1},"isExtension":{"rule":"required","type":"bool","id":2}}}}},"SourceCodeInfo":{"fields":{"location":{"rule":"repeated","type":"Location","id":1}},"nested":{"Location":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"span":{"rule":"repeated","type":"int32","id":2},"leadingComments":{"type":"string","id":3},"trailingComments":{"type":"string","id":4},"leadingDetachedComments":{"rule":"repeated","type":"string","id":6}}}}},"GeneratedCodeInfo":{"fields":{"annotation":{"rule":"repeated","type":"Annotation","id":1}},"nested":{"Annotation":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"sourceFile":{"type":"string","id":2},"begin":{"type":"int32","id":3},"end":{"type":"int32","id":4}}}}},"Any":{"fields":{"type_url":{"type":"string","id":1},"value":{"type":"bytes","id":2}}},"Duration":{"fields":{"seconds":{"type":"int64","id":1},"nanos":{"type":"int32","id":2}}},"Empty":{"fields":{}}}},"rpc":{"options":{"cc_enable_arenas":true,"go_package":"google.golang.org/genproto/googleapis/rpc/status;status","java_multiple_files":true,"java_outer_classname":"StatusProto","java_package":"com.google.rpc","objc_class_prefix":"RPC"},"nested":{"Status":{"fields":{"code":{"type":"int32","id":1},"message":{"type":"string","id":2},"details":{"rule":"repeated","type":"google.protobuf.Any","id":3}}}}}}}}');
const require$$4 = {
  nested: nested$2
};
var transcoding = {};
var hasRequiredTranscoding;
function requireTranscoding() {
  if (hasRequiredTranscoding) return transcoding;
  hasRequiredTranscoding = 1;
  Object.defineProperty(transcoding, "__esModule", { value: true });
  transcoding.getField = getField;
  transcoding.deepCopyWithoutMatchedFields = deepCopyWithoutMatchedFields;
  transcoding.deleteField = deleteField;
  transcoding.buildQueryStringComponents = buildQueryStringComponents;
  transcoding.encodeWithSlashes = encodeWithSlashes;
  transcoding.encodeWithoutSlashes = encodeWithoutSlashes;
  transcoding.applyPattern = applyPattern;
  transcoding.match = match;
  transcoding.flattenObject = flattenObject;
  transcoding.isProto3OptionalField = isProto3OptionalField;
  transcoding.transcode = transcode;
  transcoding.overrideHttpRules = overrideHttpRules;
  const util_1 = requireUtil();
  const httpOptionName = "(google.api.http)";
  const proto3OptionalName = "proto3_optional";
  const supportedHttpMethods = ["get", "post", "put", "patch", "delete"];
  function getField(request, field, allowObjects = false) {
    const parts = field.split(".");
    let value = request;
    for (const part of parts) {
      if (typeof value !== "object") {
        return void 0;
      }
      value = value[part];
    }
    if (!allowObjects && typeof value === "object" && !Array.isArray(value) && value !== null) {
      return void 0;
    }
    return value;
  }
  function deepCopyWithoutMatchedFields(request, fieldsToSkip, fullNamePrefix = "") {
    if (typeof request !== "object" || request === null) {
      return request;
    }
    const copy = Object.assign({}, request);
    for (const key in copy) {
      if (fieldsToSkip.has(`${fullNamePrefix}${key}`)) {
        delete copy[key];
        continue;
      }
      const nextFullNamePrefix = `${fullNamePrefix}${key}.`;
      if (Array.isArray(copy[key])) {
        copy[key] = copy[key].map((value) => deepCopyWithoutMatchedFields(value, /* @__PURE__ */ new Set()));
      } else if (typeof copy[key] === "object" && copy[key] !== null) {
        copy[key] = deepCopyWithoutMatchedFields(copy[key], fieldsToSkip, nextFullNamePrefix);
      }
    }
    return copy;
  }
  function deleteField(request, field) {
    const parts = field.split(".");
    while (parts.length > 1) {
      if (typeof request !== "object") {
        return;
      }
      const part2 = parts.shift();
      request = request[part2];
    }
    const part = parts.shift();
    if (typeof request !== "object") {
      return;
    }
    delete request[part];
  }
  function buildQueryStringComponents(request, prefix = "") {
    const resultList = [];
    for (const key in request) {
      if (Array.isArray(request[key])) {
        for (const value of request[key]) {
          resultList.push(`${prefix}${encodeWithoutSlashes(key)}=${encodeWithoutSlashes(value.toString())}`);
        }
      } else if (typeof request[key] === "object" && request[key] !== null) {
        resultList.push(...buildQueryStringComponents(request[key], `${key}.`));
      } else {
        resultList.push(`${prefix}${encodeWithoutSlashes(key)}=${encodeWithoutSlashes(request[key] === null ? "null" : request[key].toString())}`);
      }
    }
    return resultList;
  }
  function encodeWithSlashes(str) {
    return str.split("").map((c) => c.match(/[-_.~0-9a-zA-Z]/) ? c : encodeURIComponent(c)).join("");
  }
  function encodeWithoutSlashes(str) {
    return str.split("").map((c) => c.match(/[-_.~0-9a-zA-Z/]/) ? c : encodeURIComponent(c)).join("");
  }
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function applyPattern(pattern, fieldValue) {
    if (!pattern || pattern === "*") {
      return encodeWithSlashes(fieldValue);
    }
    if (!pattern.includes("*") && pattern !== fieldValue) {
      return void 0;
    }
    const regex = new RegExp("^" + escapeRegExp(pattern).replace(/\\\*\\\*/g, "(.+)").replace(/\\\*/g, "([^/]+)") + "$");
    if (!fieldValue.match(regex)) {
      return void 0;
    }
    return encodeWithoutSlashes(fieldValue);
  }
  function fieldToCamelCase(field) {
    const parts = field.split(".");
    return parts.map((part) => (0, util_1.toCamelCase)(part)).join(".");
  }
  function match(request, pattern) {
    let url = pattern;
    const matchedFields = [];
    for (; ; ) {
      const match2 = url.match(/^(.*)\{([^}=]+)(?:=([^}]*))?\}(.*)/);
      if (!match2) {
        break;
      }
      const [, before, field, pattern2, after] = match2;
      const camelCasedField = fieldToCamelCase(field);
      matchedFields.push(fieldToCamelCase(camelCasedField));
      const fieldValue = getField(request, camelCasedField);
      if (fieldValue === void 0) {
        return void 0;
      }
      const appliedPattern = applyPattern(pattern2, fieldValue === null ? "null" : fieldValue.toString());
      if (appliedPattern === void 0) {
        return void 0;
      }
      url = before + appliedPattern + after;
    }
    return { matchedFields, url };
  }
  function flattenObject(request) {
    const result = {};
    for (const key in request) {
      if (request[key] === void 0) {
        continue;
      }
      if (Array.isArray(request[key])) {
        result[key] = request[key];
        continue;
      }
      if (typeof request[key] === "object" && request[key] !== null) {
        const nested2 = flattenObject(request[key]);
        for (const nestedKey in nested2) {
          result[`${key}.${nestedKey}`] = nested2[nestedKey];
        }
        continue;
      }
      result[key] = request[key];
    }
    return result;
  }
  function isProto3OptionalField(field) {
    return field && field.options && field.options[proto3OptionalName];
  }
  function transcode(request, parsedOptions) {
    const httpRules = [];
    for (const option of parsedOptions) {
      if (!(httpOptionName in option)) {
        continue;
      }
      const httpRule = option[httpOptionName];
      httpRules.push(httpRule);
      if (httpRule?.additional_bindings) {
        const additionalBindings = Array.isArray(httpRule.additional_bindings) ? httpRule.additional_bindings : [httpRule.additional_bindings];
        httpRules.push(...additionalBindings);
      }
    }
    for (const httpRule of httpRules) {
      for (const httpMethod of supportedHttpMethods) {
        if (!(httpMethod in httpRule)) {
          continue;
        }
        const pathTemplate2 = httpRule[httpMethod];
        const matchResult = match(request, pathTemplate2);
        if (matchResult === void 0) {
          continue;
        }
        const { url, matchedFields } = matchResult;
        let data = deepCopyWithoutMatchedFields(request, new Set(matchedFields));
        if (httpRule.body === "*") {
          return { httpMethod, url, queryString: "", data };
        }
        const queryStringObject = data;
        if (httpRule.body) {
          data = getField(
            queryStringObject,
            fieldToCamelCase(httpRule.body),
            /*allowObjects:*/
            true
          );
          deleteField(queryStringObject, fieldToCamelCase(httpRule.body));
        } else {
          data = "";
        }
        const queryStringComponents = buildQueryStringComponents(queryStringObject);
        const queryString = queryStringComponents.join("&");
        if (!data || typeof data === "object" && Object.keys(data).length === 0) {
          data = "";
        }
        return { httpMethod, url, queryString, data };
      }
    }
    return void 0;
  }
  function overrideHttpRules(httpRules, protoJson) {
    for (const rule of httpRules) {
      if (!rule.selector) {
        continue;
      }
      const rpc = protoJson.lookup(rule.selector);
      if (!rpc || !rpc.parsedOptions) {
        continue;
      }
      for (const item of rpc.parsedOptions) {
        if (!(httpOptionName in item)) {
          continue;
        }
        const httpOptions = item[httpOptionName];
        for (const httpMethod in httpOptions) {
          if (httpMethod in rule) {
            if (httpMethod === "additional_bindings") {
              continue;
            }
            httpOptions[httpMethod] = rule[httpMethod];
          }
          if (rule.additional_bindings) {
            httpOptions["additional_bindings"] = !httpOptions["additional_bindings"] ? [] : Array.isArray(httpOptions["additional_bindings"]) ? httpOptions["additional_bindings"] : [httpOptions["additional_bindings"]];
            httpOptions["additional_bindings"].push(...rule.additional_bindings);
          }
        }
      }
    }
  }
  return transcoding;
}
const version = "5.0.7";
const require$$20 = {
  version
};
var hasRequiredOperationsClient;
function requireOperationsClient() {
  if (hasRequiredOperationsClient) return operationsClient;
  hasRequiredOperationsClient = 1;
  (function(exports) {
    var __createBinding = operationsClient && operationsClient.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __setModuleDefault = operationsClient && operationsClient.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = operationsClient && operationsClient.__importStar || /* @__PURE__ */ (function() {
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
    exports.OperationsClientBuilder = exports.OperationsClient = exports.ALL_SCOPES = exports.SERVICE_ADDRESS = void 0;
    const createApiCall_1 = requireCreateApiCall();
    const descriptor_1 = requireDescriptor();
    const gax2 = __importStar(requireGax());
    const configData = require$$3;
    const operationProtoJson = require$$4;
    const transcoding_1 = requireTranscoding();
    exports.SERVICE_ADDRESS = "longrunning.googleapis.com";
    const version2 = require$$20.version;
    const DEFAULT_SERVICE_PORT = 443;
    const CODE_GEN_NAME_VERSION = "gapic/0.7.1";
    exports.ALL_SCOPES = [];
    class OperationsClient {
      auth;
      innerApiCalls;
      descriptor;
      operationsStub;
      constructor(gaxGrpc, operationsProtos, options) {
        const opts = Object.assign({
          servicePath: exports.SERVICE_ADDRESS,
          port: DEFAULT_SERVICE_PORT,
          clientConfig: {}
        }, options);
        const googleApiClient = ["gl-node/" + process.versions.node];
        if (opts.libName && opts.libVersion) {
          googleApiClient.push(opts.libName + "/" + opts.libVersion);
        }
        googleApiClient.push(CODE_GEN_NAME_VERSION, "gax/" + version2);
        if (opts.fallback) {
          googleApiClient.push("gl-web/" + version2);
        } else {
          googleApiClient.push("grpc/" + gaxGrpc.grpcVersion);
        }
        const defaults = gaxGrpc.constructSettings("google.longrunning.Operations", configData, opts.clientConfig || {}, { "x-goog-api-client": googleApiClient.join(" ") });
        this.auth = gaxGrpc.auth;
        this.innerApiCalls = {};
        this.descriptor = {
          listOperations: new descriptor_1.PageDescriptor("pageToken", "nextPageToken", "operations")
        };
        this.operationsStub = gaxGrpc.createStub(opts.fallback ? operationsProtos.lookupService("google.longrunning.Operations") : operationsProtos.google.longrunning.Operations, opts);
        const operationsStubMethods = [
          "getOperation",
          "listOperations",
          "cancelOperation",
          "deleteOperation"
        ];
        for (const methodName of operationsStubMethods) {
          const innerCallPromise = this.operationsStub.then((stub) => (...args) => {
            const func = stub[methodName];
            return func.apply(stub, args);
          }, (err) => () => {
            throw err;
          });
          this.innerApiCalls[methodName] = (0, createApiCall_1.createApiCall)(innerCallPromise, defaults[methodName], this.descriptor[methodName]);
        }
      }
      /** Closes this operations client. */
      close() {
        this.operationsStub.then((stub) => stub.close()).catch(console.error);
      }
      getProjectId(callback) {
        if (this.auth && "getProjectId" in this.auth) {
          return this.auth.getProjectId(callback);
        }
        if (callback) {
          callback(new Error("Cannot determine project ID."));
        } else {
          return Promise.reject("Cannot determine project ID.");
        }
      }
      // Service calls
      getOperationInternal(request, options, callback) {
        request = request || {};
        options = options || {};
        return this.innerApiCalls.getOperation(request, options, callback);
      }
      /**
       * Gets the latest state of a long-running operation.  Clients can use this
       * method to poll the operation result at intervals as recommended by the API
       * service.
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation resource.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       *   e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       *   https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       *   details.
       * @param {function(?Error, ?Object)=} callback
       *   The function which will be called with the result of the API call.
       *
       *   The second parameter to the callback is an object representing
       * [google.longrunning.Operation]{@link
       * external:"google.longrunning.Operation"}.
       * @return {Promise} - The promise which resolves to an array.
       *   The first element of the array is an object representing
       * [google.longrunning.Operation]{@link
       * external:"google.longrunning.Operation"}. The promise has a method named
       * "cancel" which cancels the ongoing API call.
       *
       * @example
       *
       * const client = longrunning.operationsClient();
       * const name = '';
       * const [response] = await client.getOperation({name});
       * // doThingsWith(response)
       */
      getOperation(request, optionsOrCallback, callback) {
        let options;
        if (optionsOrCallback instanceof Function && callback === void 0) {
          callback = optionsOrCallback;
          options = {};
        } else {
          options = optionsOrCallback;
        }
        request = request || {};
        options = options || {};
        return this.innerApiCalls.getOperation(request, options, callback);
      }
      /**
       * Lists operations that match the specified filter in the request. If the
       * server doesn't support this method, it returns `UNIMPLEMENTED`.
       *
       * NOTE: the `name` binding below allows API services to override the binding
       * to use different resource name schemes.
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation collection.
       * @param {string} request.filter - The standard list filter.
       * @param {number=} request.pageSize
       *   The maximum number of resources contained in the underlying API
       *   response. If page streaming is performed per-resource, this
       *   parameter does not affect the return value. If page streaming is
       *   performed per-page, this determines the maximum number of
       *   resources in a page.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       * details.
       * @param {function(?Error, ?Array, ?Object, ?Object)=} callback
       *   The function which will be called with the result of the API call.
       *
       *   The second parameter to the callback is Array of
       * [google.longrunning.Operation]{@link
       * external:"google.longrunning.Operation"}.
       *
       *   When autoPaginate: false is specified through options, it contains the
       * result in a single response. If the response indicates the next page
       * exists, the third parameter is set to be used for the next request object.
       * The fourth parameter keeps the raw response object of an object
       * representing [google.longrunning.ListOperationsResponse]{@link
       * external:"google.longrunning.ListOperationsResponse"}.
       * @return {Promise} - The promise which resolves to an array.
       *   The first element of the array is Array of
       * [google.longrunning.Operation]{@link
       * external:"google.longrunning.Operation"}.
       *
       *   When autoPaginate: false is specified through options, the array has
       * three elements. The first element is Array of
       * [google.longrunning.Operation]{@link
       * external:"google.longrunning.Operation"} in a single response. The second
       * element is the next request object if the response indicates the next page
       * exists, or null. The third element is an object representing
       * [google.longrunning.ListOperationsResponse]{@link
       * external:"google.longrunning.ListOperationsResponse"}.
       *
       *   The promise has a method named "cancel" which cancels the ongoing API
       * call.
       *
       * @example
       *
       * const client = longrunning.operationsClient();
       * const request = {
       *     name: '',
       *     filter: ''
       * };
       * // Iterate over all elements.
       * const [resources] = await client.listOperations(request);
       * for (const resource of resources) {
       *   console.log(resources);
       * }
       *
       * // Or obtain the paged response.
       * const options = {autoPaginate: false};
       * let nextRequest = request;
       * while(nextRequest) {
       *   const response = await client.listOperations(nextRequest, options);
       *   const resources = response[0];
       *   nextRequest = response[1];
       *   const rawResponse = response[2];
       *   for (const resource of resources) {
       *     // doThingsWith(resource);
       *   }
       * };
       */
      listOperations(request, optionsOrCallback, callback) {
        let options;
        if (optionsOrCallback instanceof Function && callback === void 0) {
          callback = optionsOrCallback;
          options = {};
        } else {
          options = optionsOrCallback;
        }
        request = request || {};
        options = options || {};
        return this.innerApiCalls.listOperations(request, options, callback);
      }
      /**
       * Equivalent to {@link listOperations}, but returns a NodeJS Stream object.
       *
       * This fetches the paged responses for {@link listOperations} continuously
       * and invokes the callback registered for 'data' event for each element in
       * the responses.
       *
       * The returned object has 'end' method when no more elements are required.
       *
       * autoPaginate option will be ignored.
       *
       * @see {@link https://nodejs.org/api/stream.html}
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation collection.
       * @param {string} request.filter - The standard list filter.
       * @param {number=} request.pageSize -
       *   The maximum number of resources contained in the underlying API
       *   response. If page streaming is performed per-resource, this
       *   parameter does not affect the return value. If page streaming is
       *   performed per-page, this determines the maximum number of
       *   resources in a page.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       *   e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       *   https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       *   details.
       * @return {Stream} - An object stream which emits an object representing [google.longrunning.Operation]{@link external:"google.longrunning.Operation"} on 'data' event.
       *
       * @example
       *
       * const client = longrunning.operationsClient();
       * const request = {
       *   name: '',
       *   filter: ''
       * };
       * client.listOperationsStream(request)
       *   .on('data', element => {
       *     // doThingsWith(element)
       *   })
       *   .on('error', err => {
       *     console.error(err);
       *   });
       */
      listOperationsStream(request, options) {
        const callSettings = new gax2.CallSettings(options);
        return this.descriptor.listOperations.createStream(this.innerApiCalls.listOperations, request, callSettings);
      }
      /**
       * Equivalent to {@link listOperations}, but returns an iterable object.
       *
       * for-await-of syntax is used with the iterable to recursively get response element on-demand.
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation collection.
       * @param {string} request.filter - The standard list filter.
       * @param {number=} request.pageSize -
       *   The maximum number of resources contained in the underlying API
       *   response. If page streaming is performed per-resource, this
       *   parameter does not affect the return value. If page streaming is
       *   performed per-page, this determines the maximum number of
       *   resources in a page.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       *   e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       *   https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       *   details.
       * @returns {Object}
       *   An iterable Object that conforms to @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols.
       */
      listOperationsAsync(request, options) {
        request = request || {};
        options = options || {};
        const callSettings = new gax2.CallSettings(options);
        return this.descriptor.listOperations.asyncIterate(this.innerApiCalls.listOperations, request, callSettings);
      }
      /**
       * Starts asynchronous cancellation on a long-running operation.  The server
       * makes a best effort to cancel the operation, but success is not
       * guaranteed.  If the server doesn't support this method, it returns
       * `google.rpc.Code.UNIMPLEMENTED`.  Clients can use
       * {@link Operations.GetOperation} or
       * other methods to check whether the cancellation succeeded or whether the
       * operation completed despite cancellation. On successful cancellation,
       * the operation is not deleted; instead, it becomes an operation with
       * an {@link Operation.error} value with a {@link google.rpc.Status.code} of
       * 1, corresponding to `Code.CANCELLED`.
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation resource to be cancelled.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       * details.
       * @param {function(?Error)=} callback
       *   The function which will be called with the result of the API call.
       * @return {Promise} - The promise which resolves when API call finishes.
       *   The promise has a method named "cancel" which cancels the ongoing API
       * call.
       *
       * @example
       *
       * const client = longrunning.operationsClient();
       * await client.cancelOperation({name: ''});
       */
      cancelOperation(request, optionsOrCallback, callback) {
        let options;
        if (optionsOrCallback instanceof Function && callback === void 0) {
          callback = optionsOrCallback;
          options = {};
        } else {
          options = optionsOrCallback;
        }
        request = request || {};
        options = options || {};
        return this.innerApiCalls.cancelOperation(request, options, callback);
      }
      /**
       * Deletes a long-running operation. This method indicates that the client is
       * no longer interested in the operation result. It does not cancel the
       * operation. If the server doesn't support this method, it returns
       * `google.rpc.Code.UNIMPLEMENTED`.
       *
       * @param {Object} request - The request object that will be sent.
       * @param {string} request.name - The name of the operation resource to be deleted.
       * @param {Object=} options
       *   Optional parameters. You can override the default settings for this call,
       * e.g, timeout, retries, paginations, etc. See [gax.CallOptions]{@link
       * https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the
       * details.
       * @param {function(?Error)=} callback
       *   The function which will be called with the result of the API call.
       * @return {Promise} - The promise which resolves when API call finishes.
       *   The promise has a method named "cancel" which cancels the ongoing API
       * call.
       *
       * @example
       *
       * const client = longrunning.operationsClient();
       * await client.deleteOperation({name: ''});
       */
      deleteOperation(request, optionsOrCallback, callback) {
        let options;
        if (optionsOrCallback instanceof Function && callback === void 0) {
          callback = optionsOrCallback;
          options = {};
        } else {
          options = optionsOrCallback;
        }
        request = request || {};
        options = options || {};
        return this.innerApiCalls.deleteOperation(request, options, callback);
      }
    }
    exports.OperationsClient = OperationsClient;
    class OperationsClientBuilder {
      operationsClient;
      /**
       * Builds a new Operations Client
       * @param gaxGrpc {GrpcClient}
       */
      constructor(gaxGrpc, protoJson) {
        if (protoJson && gaxGrpc.httpRules) {
          (0, transcoding_1.overrideHttpRules)(gaxGrpc.httpRules, protoJson);
        }
        const operationsProtos = protoJson ?? gaxGrpc.loadProtoJSON(operationProtoJson);
        this.operationsClient = (opts) => {
          if (gaxGrpc.fallback) {
            opts.fallback = gaxGrpc.fallback;
          }
          return new OperationsClient(gaxGrpc, operationsProtos, opts);
        };
        Object.assign(this.operationsClient, OperationsClient);
      }
    }
    exports.OperationsClientBuilder = OperationsClientBuilder;
  })(operationsClient);
  return operationsClient;
}
var fallbackRest = {};
var hasRequiredFallbackRest;
function requireFallbackRest() {
  if (hasRequiredFallbackRest) return fallbackRest;
  hasRequiredFallbackRest = 1;
  var __createBinding = fallbackRest && fallbackRest.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = fallbackRest && fallbackRest.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = fallbackRest && fallbackRest.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(fallbackRest, "__esModule", { value: true });
  fallbackRest.encodeRequest = encodeRequest;
  fallbackRest.decodeResponse = decodeResponse;
  const serializer = __importStar(requireSrc$1());
  const fallback_12 = requireFallback();
  const googleError_1 = requireGoogleError();
  const transcoding_1 = requireTranscoding();
  function encodeRequest(rpc, protocol, servicePath, servicePort, request, numericEnums, minifyJson) {
    const headers = {
      "Content-Type": "application/json"
    };
    const message = rpc.resolvedRequestType.fromObject(request);
    const json = serializer.toProto3JSON(message, {
      numericEnums
    });
    if (!json) {
      throw new Error(`Cannot send null request to RPC ${rpc.name}.`);
    }
    if (typeof json !== "object" || Array.isArray(json)) {
      throw new Error(`Request to RPC ${rpc.name} must be an object.`);
    }
    const transcoded = (0, transcoding_1.transcode)(json, rpc.parsedOptions);
    if (!transcoded) {
      throw new Error(`Cannot build HTTP request for ${JSON.stringify(json)}, method: ${rpc.name}`);
    }
    if (numericEnums) {
      transcoded.queryString = (transcoded.queryString ? `${transcoded.queryString}&` : "") + "$alt=json%3Benum-encoding=int";
    }
    if (minifyJson) {
      transcoded.queryString = (transcoded.queryString ? `${transcoded.queryString}&` : "") + "$prettyPrint=0";
    }
    const method = transcoded.httpMethod.toUpperCase();
    const body = JSON.stringify(transcoded.data);
    const url = `${protocol}://${servicePath}:${servicePort}/${transcoded.url.replace(/^\//, "")}?${transcoded.queryString}`;
    return {
      method,
      url,
      headers,
      body
    };
  }
  function decodeResponse(rpc, ok, response) {
    const decodedString = new TextDecoder().decode(response);
    if (!decodedString) {
      throw new Error(`Received null response from RPC ${rpc.name}`);
    }
    const json = JSON.parse(decodedString);
    if (!ok) {
      const error = googleError_1.GoogleError.parseHttpError(json);
      throw error;
    }
    const message = serializer.fromProto3JSON(rpc.resolvedResponseType, json);
    if (!message) {
      throw new Error(`Received null or malformed response from JSON serializer from RPC ${rpc.name}`);
    }
    return rpc.resolvedResponseType.toObject(message, fallback_12.defaultToObjectOptions);
  }
  return fallbackRest;
}
var fallbackServiceStub = {};
var streamArrayParser = {};
var hasRequiredStreamArrayParser;
function requireStreamArrayParser() {
  if (hasRequiredStreamArrayParser) return streamArrayParser;
  hasRequiredStreamArrayParser = 1;
  Object.defineProperty(streamArrayParser, "__esModule", { value: true });
  streamArrayParser.StreamArrayParser = void 0;
  const stream_1 = require$$0$1;
  const fallbackRest_1 = requireFallbackRest();
  class StreamArrayParser extends stream_1.Transform {
    _done;
    _prevBlock;
    _isInString;
    _isSkipped;
    _level;
    rpc;
    cancelController;
    cancelSignal;
    cancelRequested;
    /**
     * StreamArrayParser processes array of valid JSON objects in random chunks
     * through readable stream, and produces a stream of plain Javascript objects
     * where it converted from the corresponding protobuf message instance.
     *
     * The default JSON parser decodes the input stream under the
     * following rules:
     *  1. The stream represents a valid JSON array (must start with a "[" and
     * close with the corresponding "]"). Each element of this array is assumed to
     * be either an array or an object, and will be decoded as a JS object and
     *    delivered.
     *  2. All JSON elements in the buffer will be decoded and delivered in a
     * stream.
     *
     * @private
     * @constructor
     * @param {protobuf.Method} rpc - the protobuf method produce array of JSON.
     * @param {Object} options - the options pass to Transform Stream. See more
     * details
     * https://nodejs.org/api/stream.html#stream_new_stream_transform_options.
     */
    constructor(rpc, options) {
      super(Object.assign({}, options, { readableObjectMode: true }));
      this._done = false;
      this._prevBlock = Buffer.from("");
      this._isInString = false;
      this._isSkipped = false;
      this._level = 0;
      this.rpc = rpc;
      this.cancelController = new AbortController();
      this.cancelSignal = this.cancelController.signal;
      this.cancelRequested = false;
    }
    _transform(chunk, _, callback) {
      let objectStart = 0;
      let curIndex = 0;
      if (this._level === 0 && curIndex === 0) {
        if (String.fromCharCode(chunk[0]) !== "[") {
          this.emit("error", new Error(`Internal Error: API service stream data must start with a '[' and close with the corresponding ']', but it start with ${String.fromCharCode(chunk[0])}`));
        }
        curIndex++;
        this._level++;
      }
      while (curIndex < chunk.length) {
        const curValue = String.fromCharCode(chunk[curIndex]);
        if (!this._isSkipped) {
          switch (curValue) {
            case "{":
              if (!this._isInString) {
                this._level++;
              }
              if (!this._isInString && this._level === 2) {
                objectStart = curIndex;
              }
              break;
            case '"':
              this._isInString = !this._isInString;
              break;
            case "}":
              if (!this._isInString) {
                this._level--;
              }
              if (!this._isInString && this._level === 1) {
                const objBuff = Buffer.concat([
                  this._prevBlock,
                  chunk.slice(objectStart, curIndex + 1)
                ]);
                try {
                  const msgObj = (0, fallbackRest_1.decodeResponse)(this.rpc, true, objBuff);
                  this.push(msgObj);
                } catch (err) {
                  this.emit("error", err);
                }
                objectStart = curIndex + 1;
                this._prevBlock = Buffer.from("");
              }
              break;
            case "]":
              if (!this._isInString && this._level === 1) {
                this._done = true;
                this.push(null);
              }
              break;
            case "\\":
              this._isSkipped = true;
              break;
          }
        } else {
          this._isSkipped = false;
        }
        curIndex++;
      }
      if (this._level > 1) {
        this._prevBlock = Buffer.concat([
          this._prevBlock,
          chunk.slice(objectStart, curIndex)
        ]);
      }
      callback();
    }
    _flush(callback) {
      callback();
    }
    cancel() {
      this._done = true;
      this.cancelRequested = true;
      this.cancelController.abort();
      this.end();
    }
  }
  streamArrayParser.StreamArrayParser = StreamArrayParser;
  return streamArrayParser;
}
var hasRequiredFallbackServiceStub;
function requireFallbackServiceStub() {
  if (hasRequiredFallbackServiceStub) return fallbackServiceStub;
  hasRequiredFallbackServiceStub = 1;
  var __createBinding = fallbackServiceStub && fallbackServiceStub.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = fallbackServiceStub && fallbackServiceStub.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = fallbackServiceStub && fallbackServiceStub.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(fallbackServiceStub, "__esModule", { value: true });
  fallbackServiceStub.generateServiceStub = generateServiceStub;
  const serializer = __importStar(requireSrc$1());
  const featureDetection_1 = requireFeatureDetection();
  const streamArrayParser_1 = requireStreamArrayParser();
  const fallback_12 = requireFallback();
  const stream_1 = require$$0$1;
  let agentOption = null;
  if ((0, featureDetection_1.isNodeJS)()) {
    const http = require$$0$3;
    const https = require$$1$1;
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    agentOption = (parsedUrl) => {
      if (parsedUrl.protocol === "http:") {
        return httpAgent;
      }
      return httpsAgent;
    };
  }
  function _formatEmptyResponse(rpc) {
    const emptyMessage = serializer.fromProto3JSON(rpc.resolvedResponseType, JSON.parse("{}"));
    const resp = rpc.resolvedResponseType.toObject(emptyMessage, fallback_12.defaultToObjectOptions);
    return resp;
  }
  function generateServiceStub(rpcs, protocol, servicePath, servicePort, auth, requestEncoder, responseDecoder, numericEnums, minifyJson) {
    const serviceStub = {
      // close method should close all cancel controllers. If this feature request in the future, we can have a cancelControllerFactory that tracks created cancel controllers, and abort them all in close method.
      close: () => {
        return { cancel: () => {
        } };
      }
    };
    for (const [rpcName, rpc] of Object.entries(rpcs)) {
      serviceStub[rpcName] = (request, options, _metadata, callback) => {
        options ??= {};
        let fetchParameters;
        try {
          fetchParameters = requestEncoder(rpc, protocol, servicePath, servicePort, request, numericEnums, minifyJson);
        } catch (err) {
          if (callback) {
            callback(err);
          }
          return {
            cancel() {
            }
          };
        }
        const cancelController = new AbortController();
        const cancelSignal = cancelController.signal;
        let cancelRequested = false;
        const url = fetchParameters.url;
        const headers = new Headers(fetchParameters.headers);
        for (const key of Object.keys(options)) {
          headers.set(key, options[key][0]);
        }
        const streamArrayParser2 = new streamArrayParser_1.StreamArrayParser(rpc);
        let response204Ok = false;
        const fetchRequest = {
          headers,
          body: typeof fetchParameters.body === "string" ? fetchParameters.body : Buffer.from(fetchParameters.body),
          method: fetchParameters.method,
          signal: cancelSignal,
          responseType: "stream",
          // ensure gaxios returns the data directly so that it handle data/streams itself
          agent: agentOption || void 0
        };
        if (fetchParameters.method === "GET" || fetchParameters.method === "DELETE") {
          delete fetchRequest["body"];
        }
        auth.fetch(url, fetchRequest).then((response) => {
          if (response.status === 204 && response.ok) {
            response204Ok = true;
          }
          if (response.ok && rpc.responseStream) {
            (0, stream_1.pipeline)(response.body, streamArrayParser2, (err) => {
              if (err && (!cancelRequested || err instanceof Error && err.name !== "AbortError")) {
                if (callback) {
                  callback(err);
                }
                streamArrayParser2.emit("error", err);
              }
            });
            return;
          } else {
            return Promise.all([
              Promise.resolve(response.ok),
              response.arrayBuffer()
            ]).then(([ok, buffer]) => {
              const response2 = responseDecoder(rpc, ok, buffer);
              callback(null, response2);
            }).catch((err) => {
              if (!cancelRequested || err.name !== "AbortError") {
                if (rpc.responseStream) {
                  if (callback) {
                    callback(err);
                  }
                  streamArrayParser2.emit("error", err);
                } else {
                  if (!response204Ok) {
                    callback(err);
                  } else {
                    const resp = _formatEmptyResponse(rpc);
                    callback(null, resp);
                  }
                }
              }
            });
          }
        }).catch((err) => {
          if (rpc.responseStream) {
            if (callback) {
              callback(err);
            }
            streamArrayParser2.emit("error", err);
          } else if (callback) {
            callback(err);
          } else {
            throw err;
          }
        });
        if (rpc.responseStream) {
          return streamArrayParser2;
        }
        return {
          cancel: () => {
            cancelRequested = true;
            cancelController.abort();
          }
        };
      };
    }
    return serviceStub;
  }
  return fallbackServiceStub;
}
var iam_service = { exports: {} };
var hasRequiredIam_service;
function requireIam_service() {
  if (hasRequiredIam_service) return iam_service.exports;
  hasRequiredIam_service = 1;
  (function(module) {
    ((e) => {
      "function" == typeof commonjsRequire && true && module && module.exports && (module.exports = e(requireMinimal()));
    })(function(o) {
      var e, t, n, r, F, a = o.Reader, i = o.Writer, p = o.util, l = o.roots.iam_protos || (o.roots.iam_protos = {});
      function B(e2, t2, n2) {
        o.rpc.Service.call(this, e2, t2, n2);
      }
      function s(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function u(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function c(e2) {
        if (this.permissions = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function G(e2) {
        if (this.permissions = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function U(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function d(e2) {
        if (this.bindings = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function g(e2) {
        if (this.members = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function M(e2) {
        if (this.bindingDeltas = [], this.auditConfigDeltas = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function f(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function y(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function L(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function J(e2) {
        if (this.rules = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function h(e2) {
        if (this.additionalBindings = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function _(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function b(e2) {
        if (this.pattern = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function H(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function q(e2) {
        if (this.file = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function m(e2) {
        if (this.dependency = [], this.publicDependency = [], this.weakDependency = [], this.messageType = [], this.enumType = [], this.service = [], this.extension = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function O(e2) {
        if (this.field = [], this.extension = [], this.nestedType = [], this.enumType = [], this.extensionRange = [], this.oneofDecl = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function v(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function Y(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function z(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function P(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function W(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function w(e2) {
        if (this.value = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function X(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function j(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function D(e2) {
        if (this.method = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function x(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function S(e2) {
        if (this.uninterpretedOption = [], this[".google.api.resourceDefinition"] = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function k(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function T(e2) {
        if (this.uninterpretedOption = [], this[".google.api.fieldBehavior"] = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function Q(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function E(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function K(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function A(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function N(e2) {
        if (this.uninterpretedOption = [], this[".google.api.methodSignature"] = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function R(e2) {
        if (this.name = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function Z(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function $(e2) {
        if (this.location = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function I(e2) {
        if (this.path = [], this.span = [], this.leadingDetachedComments = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function ee(e2) {
        if (this.annotation = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function C(e2) {
        if (this.path = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function V(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      return l.google = ((F = {}).iam = ((n = {}).v1 = ((t = {}).IAMPolicy = (((B.prototype = Object.create(o.rpc.Service.prototype)).constructor = B).create = function(e2, t2, n2) {
        return new this(e2, t2, n2);
      }, Object.defineProperty(B.prototype.setIamPolicy = function e2(t2, n2) {
        return this.rpcCall(e2, l.google.iam.v1.SetIamPolicyRequest, l.google.iam.v1.Policy, t2, n2);
      }, "name", { value: "SetIamPolicy" }), Object.defineProperty(B.prototype.getIamPolicy = function e2(t2, n2) {
        return this.rpcCall(e2, l.google.iam.v1.GetIamPolicyRequest, l.google.iam.v1.Policy, t2, n2);
      }, "name", { value: "GetIamPolicy" }), Object.defineProperty(B.prototype.testIamPermissions = function e2(t2, n2) {
        return this.rpcCall(e2, l.google.iam.v1.TestIamPermissionsRequest, l.google.iam.v1.TestIamPermissionsResponse, t2, n2);
      }, "name", { value: "TestIamPermissions" }), B), t.SetIamPolicyRequest = (s.prototype.resource = "", s.prototype.policy = null, s.create = function(e2) {
        return new s(e2);
      }, s.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.resource && Object.hasOwnProperty.call(e2, "resource") && t2.uint32(10).string(e2.resource), null != e2.policy && Object.hasOwnProperty.call(e2, "policy") && l.google.iam.v1.Policy.encode(e2.policy, t2.uint32(18).fork()).ldelim(), t2;
      }, s.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, s.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.SetIamPolicyRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.resource = e2.string();
              break;
            case 2:
              o2.policy = l.google.iam.v1.Policy.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, s.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, s.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.resource && e2.hasOwnProperty("resource") && !p.isString(e2.resource)) return "resource: string expected";
        if (null != e2.policy && e2.hasOwnProperty("policy")) {
          e2 = l.google.iam.v1.Policy.verify(e2.policy);
          if (e2) return "policy." + e2;
        }
        return null;
      }, s.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.SetIamPolicyRequest) return e2;
        var t2 = new l.google.iam.v1.SetIamPolicyRequest();
        if (null != e2.resource && (t2.resource = String(e2.resource)), null != e2.policy) {
          if ("object" != typeof e2.policy) throw TypeError(".google.iam.v1.SetIamPolicyRequest.policy: object expected");
          t2.policy = l.google.iam.v1.Policy.fromObject(e2.policy);
        }
        return t2;
      }, s.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.resource = "", n2.policy = null), null != e2.resource && e2.hasOwnProperty("resource") && (n2.resource = e2.resource), null != e2.policy && e2.hasOwnProperty("policy") && (n2.policy = l.google.iam.v1.Policy.toObject(e2.policy, t2)), n2;
      }, s.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, s), t.GetIamPolicyRequest = (u.prototype.resource = "", u.prototype.options = null, u.create = function(e2) {
        return new u(e2);
      }, u.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.resource && Object.hasOwnProperty.call(e2, "resource") && t2.uint32(10).string(e2.resource), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.iam.v1.GetPolicyOptions.encode(e2.options, t2.uint32(18).fork()).ldelim(), t2;
      }, u.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, u.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.GetIamPolicyRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.resource = e2.string();
              break;
            case 2:
              o2.options = l.google.iam.v1.GetPolicyOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, u.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, u.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.resource && e2.hasOwnProperty("resource") && !p.isString(e2.resource)) return "resource: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = l.google.iam.v1.GetPolicyOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, u.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.GetIamPolicyRequest) return e2;
        var t2 = new l.google.iam.v1.GetIamPolicyRequest();
        if (null != e2.resource && (t2.resource = String(e2.resource)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.iam.v1.GetIamPolicyRequest.options: object expected");
          t2.options = l.google.iam.v1.GetPolicyOptions.fromObject(e2.options);
        }
        return t2;
      }, u.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.resource = "", n2.options = null), null != e2.resource && e2.hasOwnProperty("resource") && (n2.resource = e2.resource), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.iam.v1.GetPolicyOptions.toObject(e2.options, t2)), n2;
      }, u.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, u), t.TestIamPermissionsRequest = (c.prototype.resource = "", c.prototype.permissions = p.emptyArray, c.create = function(e2) {
        return new c(e2);
      }, c.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.resource && Object.hasOwnProperty.call(e2, "resource") && t2.uint32(10).string(e2.resource), null != e2.permissions && e2.permissions.length) for (var n2 = 0; n2 < e2.permissions.length; ++n2) t2.uint32(18).string(e2.permissions[n2]);
        return t2;
      }, c.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, c.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.TestIamPermissionsRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.resource = e2.string();
              break;
            case 2:
              o2.permissions && o2.permissions.length || (o2.permissions = []), o2.permissions.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, c.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, c.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.resource && e2.hasOwnProperty("resource") && !p.isString(e2.resource)) return "resource: string expected";
        if (null != e2.permissions && e2.hasOwnProperty("permissions")) {
          if (!Array.isArray(e2.permissions)) return "permissions: array expected";
          for (var t2 = 0; t2 < e2.permissions.length; ++t2) if (!p.isString(e2.permissions[t2])) return "permissions: string[] expected";
        }
        return null;
      }, c.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.TestIamPermissionsRequest) return e2;
        var t2 = new l.google.iam.v1.TestIamPermissionsRequest();
        if (null != e2.resource && (t2.resource = String(e2.resource)), e2.permissions) {
          if (!Array.isArray(e2.permissions)) throw TypeError(".google.iam.v1.TestIamPermissionsRequest.permissions: array expected");
          t2.permissions = [];
          for (var n2 = 0; n2 < e2.permissions.length; ++n2) t2.permissions[n2] = String(e2.permissions[n2]);
        }
        return t2;
      }, c.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.permissions = []), t2.defaults && (n2.resource = ""), null != e2.resource && e2.hasOwnProperty("resource") && (n2.resource = e2.resource), e2.permissions && e2.permissions.length) {
          n2.permissions = [];
          for (var o2 = 0; o2 < e2.permissions.length; ++o2) n2.permissions[o2] = e2.permissions[o2];
        }
        return n2;
      }, c.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, c), t.TestIamPermissionsResponse = (G.prototype.permissions = p.emptyArray, G.create = function(e2) {
        return new G(e2);
      }, G.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.permissions && e2.permissions.length) for (var n2 = 0; n2 < e2.permissions.length; ++n2) t2.uint32(10).string(e2.permissions[n2]);
        return t2;
      }, G.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, G.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.TestIamPermissionsResponse(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.permissions && o2.permissions.length || (o2.permissions = []), o2.permissions.push(e2.string())) : e2.skipType(7 & r2);
        }
        return o2;
      }, G.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, G.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.permissions && e2.hasOwnProperty("permissions")) {
          if (!Array.isArray(e2.permissions)) return "permissions: array expected";
          for (var t2 = 0; t2 < e2.permissions.length; ++t2) if (!p.isString(e2.permissions[t2])) return "permissions: string[] expected";
        }
        return null;
      }, G.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.TestIamPermissionsResponse) return e2;
        var t2 = new l.google.iam.v1.TestIamPermissionsResponse();
        if (e2.permissions) {
          if (!Array.isArray(e2.permissions)) throw TypeError(".google.iam.v1.TestIamPermissionsResponse.permissions: array expected");
          t2.permissions = [];
          for (var n2 = 0; n2 < e2.permissions.length; ++n2) t2.permissions[n2] = String(e2.permissions[n2]);
        }
        return t2;
      }, G.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.permissions = []), e2.permissions && e2.permissions.length) {
          n2.permissions = [];
          for (var o2 = 0; o2 < e2.permissions.length; ++o2) n2.permissions[o2] = e2.permissions[o2];
        }
        return n2;
      }, G.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, G), t.GetPolicyOptions = (U.prototype.requestedPolicyVersion = 0, U.create = function(e2) {
        return new U(e2);
      }, U.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.requestedPolicyVersion && Object.hasOwnProperty.call(e2, "requestedPolicyVersion") && t2.uint32(8).int32(e2.requestedPolicyVersion), t2;
      }, U.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, U.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.GetPolicyOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? o2.requestedPolicyVersion = e2.int32() : e2.skipType(7 & r2);
        }
        return o2;
      }, U.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, U.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.requestedPolicyVersion && e2.hasOwnProperty("requestedPolicyVersion") && !p.isInteger(e2.requestedPolicyVersion) ? "requestedPolicyVersion: integer expected" : null;
      }, U.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.iam.v1.GetPolicyOptions ? e2 : (t2 = new l.google.iam.v1.GetPolicyOptions(), null != e2.requestedPolicyVersion && (t2.requestedPolicyVersion = 0 | e2.requestedPolicyVersion), t2);
      }, U.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.requestedPolicyVersion = 0), null != e2.requestedPolicyVersion && e2.hasOwnProperty("requestedPolicyVersion") && (n2.requestedPolicyVersion = e2.requestedPolicyVersion), n2;
      }, U.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, U), t.Policy = (d.prototype.version = 0, d.prototype.bindings = p.emptyArray, d.prototype.etag = p.newBuffer([]), d.create = function(e2) {
        return new d(e2);
      }, d.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.version && Object.hasOwnProperty.call(e2, "version") && t2.uint32(8).int32(e2.version), null != e2.etag && Object.hasOwnProperty.call(e2, "etag") && t2.uint32(26).bytes(e2.etag), null != e2.bindings && e2.bindings.length) for (var n2 = 0; n2 < e2.bindings.length; ++n2) l.google.iam.v1.Binding.encode(e2.bindings[n2], t2.uint32(34).fork()).ldelim();
        return t2;
      }, d.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, d.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.Policy(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.version = e2.int32();
              break;
            case 4:
              o2.bindings && o2.bindings.length || (o2.bindings = []), o2.bindings.push(l.google.iam.v1.Binding.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.etag = e2.bytes();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, d.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, d.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.version && e2.hasOwnProperty("version") && !p.isInteger(e2.version)) return "version: integer expected";
        if (null != e2.bindings && e2.hasOwnProperty("bindings")) {
          if (!Array.isArray(e2.bindings)) return "bindings: array expected";
          for (var t2 = 0; t2 < e2.bindings.length; ++t2) {
            var n2 = l.google.iam.v1.Binding.verify(e2.bindings[t2]);
            if (n2) return "bindings." + n2;
          }
        }
        return null != e2.etag && e2.hasOwnProperty("etag") && !(e2.etag && "number" == typeof e2.etag.length || p.isString(e2.etag)) ? "etag: buffer expected" : null;
      }, d.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.Policy) return e2;
        var t2 = new l.google.iam.v1.Policy();
        if (null != e2.version && (t2.version = 0 | e2.version), e2.bindings) {
          if (!Array.isArray(e2.bindings)) throw TypeError(".google.iam.v1.Policy.bindings: array expected");
          t2.bindings = [];
          for (var n2 = 0; n2 < e2.bindings.length; ++n2) {
            if ("object" != typeof e2.bindings[n2]) throw TypeError(".google.iam.v1.Policy.bindings: object expected");
            t2.bindings[n2] = l.google.iam.v1.Binding.fromObject(e2.bindings[n2]);
          }
        }
        return null != e2.etag && ("string" == typeof e2.etag ? p.base64.decode(e2.etag, t2.etag = p.newBuffer(p.base64.length(e2.etag)), 0) : e2.etag.length && (t2.etag = e2.etag)), t2;
      }, d.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.bindings = []), t2.defaults && (n2.version = 0, t2.bytes === String ? n2.etag = "" : (n2.etag = [], t2.bytes !== Array && (n2.etag = p.newBuffer(n2.etag)))), null != e2.version && e2.hasOwnProperty("version") && (n2.version = e2.version), null != e2.etag && e2.hasOwnProperty("etag") && (n2.etag = t2.bytes === String ? p.base64.encode(e2.etag, 0, e2.etag.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.etag) : e2.etag), e2.bindings && e2.bindings.length) {
          n2.bindings = [];
          for (var o2 = 0; o2 < e2.bindings.length; ++o2) n2.bindings[o2] = l.google.iam.v1.Binding.toObject(e2.bindings[o2], t2);
        }
        return n2;
      }, d.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, d), t.Binding = (g.prototype.role = "", g.prototype.members = p.emptyArray, g.prototype.condition = null, g.create = function(e2) {
        return new g(e2);
      }, g.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.role && Object.hasOwnProperty.call(e2, "role") && t2.uint32(10).string(e2.role), null != e2.members && e2.members.length) for (var n2 = 0; n2 < e2.members.length; ++n2) t2.uint32(18).string(e2.members[n2]);
        return null != e2.condition && Object.hasOwnProperty.call(e2, "condition") && l.google.type.Expr.encode(e2.condition, t2.uint32(26).fork()).ldelim(), t2;
      }, g.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, g.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.Binding(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.role = e2.string();
              break;
            case 2:
              o2.members && o2.members.length || (o2.members = []), o2.members.push(e2.string());
              break;
            case 3:
              o2.condition = l.google.type.Expr.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, g.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, g.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.role && e2.hasOwnProperty("role") && !p.isString(e2.role)) return "role: string expected";
        if (null != e2.members && e2.hasOwnProperty("members")) {
          if (!Array.isArray(e2.members)) return "members: array expected";
          for (var t2 = 0; t2 < e2.members.length; ++t2) if (!p.isString(e2.members[t2])) return "members: string[] expected";
        }
        if (null != e2.condition && e2.hasOwnProperty("condition")) {
          var n2 = l.google.type.Expr.verify(e2.condition);
          if (n2) return "condition." + n2;
        }
        return null;
      }, g.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.Binding) return e2;
        var t2 = new l.google.iam.v1.Binding();
        if (null != e2.role && (t2.role = String(e2.role)), e2.members) {
          if (!Array.isArray(e2.members)) throw TypeError(".google.iam.v1.Binding.members: array expected");
          t2.members = [];
          for (var n2 = 0; n2 < e2.members.length; ++n2) t2.members[n2] = String(e2.members[n2]);
        }
        if (null != e2.condition) {
          if ("object" != typeof e2.condition) throw TypeError(".google.iam.v1.Binding.condition: object expected");
          t2.condition = l.google.type.Expr.fromObject(e2.condition);
        }
        return t2;
      }, g.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.members = []), t2.defaults && (n2.role = "", n2.condition = null), null != e2.role && e2.hasOwnProperty("role") && (n2.role = e2.role), e2.members && e2.members.length) {
          n2.members = [];
          for (var o2 = 0; o2 < e2.members.length; ++o2) n2.members[o2] = e2.members[o2];
        }
        return null != e2.condition && e2.hasOwnProperty("condition") && (n2.condition = l.google.type.Expr.toObject(e2.condition, t2)), n2;
      }, g.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, g), t.PolicyDelta = (M.prototype.bindingDeltas = p.emptyArray, M.prototype.auditConfigDeltas = p.emptyArray, M.create = function(e2) {
        return new M(e2);
      }, M.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.bindingDeltas && e2.bindingDeltas.length) for (var n2 = 0; n2 < e2.bindingDeltas.length; ++n2) l.google.iam.v1.BindingDelta.encode(e2.bindingDeltas[n2], t2.uint32(10).fork()).ldelim();
        if (null != e2.auditConfigDeltas && e2.auditConfigDeltas.length) for (n2 = 0; n2 < e2.auditConfigDeltas.length; ++n2) l.google.iam.v1.AuditConfigDelta.encode(e2.auditConfigDeltas[n2], t2.uint32(18).fork()).ldelim();
        return t2;
      }, M.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, M.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.PolicyDelta(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.bindingDeltas && o2.bindingDeltas.length || (o2.bindingDeltas = []), o2.bindingDeltas.push(l.google.iam.v1.BindingDelta.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.auditConfigDeltas && o2.auditConfigDeltas.length || (o2.auditConfigDeltas = []), o2.auditConfigDeltas.push(l.google.iam.v1.AuditConfigDelta.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, M.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, M.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.bindingDeltas && e2.hasOwnProperty("bindingDeltas")) {
          if (!Array.isArray(e2.bindingDeltas)) return "bindingDeltas: array expected";
          for (var t2 = 0; t2 < e2.bindingDeltas.length; ++t2) if (n2 = l.google.iam.v1.BindingDelta.verify(e2.bindingDeltas[t2])) return "bindingDeltas." + n2;
        }
        if (null != e2.auditConfigDeltas && e2.hasOwnProperty("auditConfigDeltas")) {
          if (!Array.isArray(e2.auditConfigDeltas)) return "auditConfigDeltas: array expected";
          for (var n2, t2 = 0; t2 < e2.auditConfigDeltas.length; ++t2) if (n2 = l.google.iam.v1.AuditConfigDelta.verify(e2.auditConfigDeltas[t2])) return "auditConfigDeltas." + n2;
        }
        return null;
      }, M.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.PolicyDelta) return e2;
        var t2 = new l.google.iam.v1.PolicyDelta();
        if (e2.bindingDeltas) {
          if (!Array.isArray(e2.bindingDeltas)) throw TypeError(".google.iam.v1.PolicyDelta.bindingDeltas: array expected");
          t2.bindingDeltas = [];
          for (var n2 = 0; n2 < e2.bindingDeltas.length; ++n2) {
            if ("object" != typeof e2.bindingDeltas[n2]) throw TypeError(".google.iam.v1.PolicyDelta.bindingDeltas: object expected");
            t2.bindingDeltas[n2] = l.google.iam.v1.BindingDelta.fromObject(e2.bindingDeltas[n2]);
          }
        }
        if (e2.auditConfigDeltas) {
          if (!Array.isArray(e2.auditConfigDeltas)) throw TypeError(".google.iam.v1.PolicyDelta.auditConfigDeltas: array expected");
          t2.auditConfigDeltas = [];
          for (n2 = 0; n2 < e2.auditConfigDeltas.length; ++n2) {
            if ("object" != typeof e2.auditConfigDeltas[n2]) throw TypeError(".google.iam.v1.PolicyDelta.auditConfigDeltas: object expected");
            t2.auditConfigDeltas[n2] = l.google.iam.v1.AuditConfigDelta.fromObject(e2.auditConfigDeltas[n2]);
          }
        }
        return t2;
      }, M.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.bindingDeltas = [], n2.auditConfigDeltas = []), e2.bindingDeltas && e2.bindingDeltas.length) {
          n2.bindingDeltas = [];
          for (var o2 = 0; o2 < e2.bindingDeltas.length; ++o2) n2.bindingDeltas[o2] = l.google.iam.v1.BindingDelta.toObject(e2.bindingDeltas[o2], t2);
        }
        if (e2.auditConfigDeltas && e2.auditConfigDeltas.length) {
          n2.auditConfigDeltas = [];
          for (o2 = 0; o2 < e2.auditConfigDeltas.length; ++o2) n2.auditConfigDeltas[o2] = l.google.iam.v1.AuditConfigDelta.toObject(e2.auditConfigDeltas[o2], t2);
        }
        return n2;
      }, M.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, M), t.BindingDelta = (f.prototype.action = 0, f.prototype.role = "", f.prototype.member = "", f.prototype.condition = null, f.create = function(e2) {
        return new f(e2);
      }, f.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.action && Object.hasOwnProperty.call(e2, "action") && t2.uint32(8).int32(e2.action), null != e2.role && Object.hasOwnProperty.call(e2, "role") && t2.uint32(18).string(e2.role), null != e2.member && Object.hasOwnProperty.call(e2, "member") && t2.uint32(26).string(e2.member), null != e2.condition && Object.hasOwnProperty.call(e2, "condition") && l.google.type.Expr.encode(e2.condition, t2.uint32(34).fork()).ldelim(), t2;
      }, f.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, f.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.BindingDelta(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.action = e2.int32();
              break;
            case 2:
              o2.role = e2.string();
              break;
            case 3:
              o2.member = e2.string();
              break;
            case 4:
              o2.condition = l.google.type.Expr.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, f.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, f.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.action && e2.hasOwnProperty("action")) switch (e2.action) {
          default:
            return "action: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.role && e2.hasOwnProperty("role") && !p.isString(e2.role)) return "role: string expected";
        if (null != e2.member && e2.hasOwnProperty("member") && !p.isString(e2.member)) return "member: string expected";
        if (null != e2.condition && e2.hasOwnProperty("condition")) {
          e2 = l.google.type.Expr.verify(e2.condition);
          if (e2) return "condition." + e2;
        }
        return null;
      }, f.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.BindingDelta) return e2;
        var t2 = new l.google.iam.v1.BindingDelta();
        switch (e2.action) {
          case "ACTION_UNSPECIFIED":
          case 0:
            t2.action = 0;
            break;
          case "ADD":
          case 1:
            t2.action = 1;
            break;
          case "REMOVE":
          case 2:
            t2.action = 2;
        }
        if (null != e2.role && (t2.role = String(e2.role)), null != e2.member && (t2.member = String(e2.member)), null != e2.condition) {
          if ("object" != typeof e2.condition) throw TypeError(".google.iam.v1.BindingDelta.condition: object expected");
          t2.condition = l.google.type.Expr.fromObject(e2.condition);
        }
        return t2;
      }, f.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.action = t2.enums === String ? "ACTION_UNSPECIFIED" : 0, n2.role = "", n2.member = "", n2.condition = null), null != e2.action && e2.hasOwnProperty("action") && (n2.action = t2.enums === String ? l.google.iam.v1.BindingDelta.Action[e2.action] : e2.action), null != e2.role && e2.hasOwnProperty("role") && (n2.role = e2.role), null != e2.member && e2.hasOwnProperty("member") && (n2.member = e2.member), null != e2.condition && e2.hasOwnProperty("condition") && (n2.condition = l.google.type.Expr.toObject(e2.condition, t2)), n2;
      }, f.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, f.Action = (e = {}, (r = Object.create(e))[e[0] = "ACTION_UNSPECIFIED"] = 0, r[e[1] = "ADD"] = 1, r[e[2] = "REMOVE"] = 2, r), f), t.AuditConfigDelta = (y.prototype.action = 0, y.prototype.service = "", y.prototype.exemptedMember = "", y.prototype.logType = "", y.create = function(e2) {
        return new y(e2);
      }, y.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.action && Object.hasOwnProperty.call(e2, "action") && t2.uint32(8).int32(e2.action), null != e2.service && Object.hasOwnProperty.call(e2, "service") && t2.uint32(18).string(e2.service), null != e2.exemptedMember && Object.hasOwnProperty.call(e2, "exemptedMember") && t2.uint32(26).string(e2.exemptedMember), null != e2.logType && Object.hasOwnProperty.call(e2, "logType") && t2.uint32(34).string(e2.logType), t2;
      }, y.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, y.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.AuditConfigDelta(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.action = e2.int32();
              break;
            case 2:
              o2.service = e2.string();
              break;
            case 3:
              o2.exemptedMember = e2.string();
              break;
            case 4:
              o2.logType = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, y.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, y.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.action && e2.hasOwnProperty("action")) switch (e2.action) {
          default:
            return "action: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        return null != e2.service && e2.hasOwnProperty("service") && !p.isString(e2.service) ? "service: string expected" : null != e2.exemptedMember && e2.hasOwnProperty("exemptedMember") && !p.isString(e2.exemptedMember) ? "exemptedMember: string expected" : null != e2.logType && e2.hasOwnProperty("logType") && !p.isString(e2.logType) ? "logType: string expected" : null;
      }, y.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.AuditConfigDelta) return e2;
        var t2 = new l.google.iam.v1.AuditConfigDelta();
        switch (e2.action) {
          case "ACTION_UNSPECIFIED":
          case 0:
            t2.action = 0;
            break;
          case "ADD":
          case 1:
            t2.action = 1;
            break;
          case "REMOVE":
          case 2:
            t2.action = 2;
        }
        return null != e2.service && (t2.service = String(e2.service)), null != e2.exemptedMember && (t2.exemptedMember = String(e2.exemptedMember)), null != e2.logType && (t2.logType = String(e2.logType)), t2;
      }, y.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.action = t2.enums === String ? "ACTION_UNSPECIFIED" : 0, n2.service = "", n2.exemptedMember = "", n2.logType = ""), null != e2.action && e2.hasOwnProperty("action") && (n2.action = t2.enums === String ? l.google.iam.v1.AuditConfigDelta.Action[e2.action] : e2.action), null != e2.service && e2.hasOwnProperty("service") && (n2.service = e2.service), null != e2.exemptedMember && e2.hasOwnProperty("exemptedMember") && (n2.exemptedMember = e2.exemptedMember), null != e2.logType && e2.hasOwnProperty("logType") && (n2.logType = e2.logType), n2;
      }, y.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, y.Action = (e = {}, (r = Object.create(e))[e[0] = "ACTION_UNSPECIFIED"] = 0, r[e[1] = "ADD"] = 1, r[e[2] = "REMOVE"] = 2, r), y), t.logging = ((e = {}).AuditData = (L.prototype.policyDelta = null, L.create = function(e2) {
        return new L(e2);
      }, L.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.policyDelta && Object.hasOwnProperty.call(e2, "policyDelta") && l.google.iam.v1.PolicyDelta.encode(e2.policyDelta, t2.uint32(18).fork()).ldelim(), t2;
      }, L.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, L.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.iam.v1.logging.AuditData(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 2 ? o2.policyDelta = l.google.iam.v1.PolicyDelta.decode(e2, e2.uint32()) : e2.skipType(7 & r2);
        }
        return o2;
      }, L.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, L.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.policyDelta && e2.hasOwnProperty("policyDelta")) {
          e2 = l.google.iam.v1.PolicyDelta.verify(e2.policyDelta);
          if (e2) return "policyDelta." + e2;
        }
        return null;
      }, L.fromObject = function(e2) {
        if (e2 instanceof l.google.iam.v1.logging.AuditData) return e2;
        var t2 = new l.google.iam.v1.logging.AuditData();
        if (null != e2.policyDelta) {
          if ("object" != typeof e2.policyDelta) throw TypeError(".google.iam.v1.logging.AuditData.policyDelta: object expected");
          t2.policyDelta = l.google.iam.v1.PolicyDelta.fromObject(e2.policyDelta);
        }
        return t2;
      }, L.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.policyDelta = null), null != e2.policyDelta && e2.hasOwnProperty("policyDelta") && (n2.policyDelta = l.google.iam.v1.PolicyDelta.toObject(e2.policyDelta, t2)), n2;
      }, L.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, L), e), t), n), F.api = ((r = {}).Http = (J.prototype.rules = p.emptyArray, J.prototype.fullyDecodeReservedExpansion = false, J.create = function(e2) {
        return new J(e2);
      }, J.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.rules && e2.rules.length) for (var n2 = 0; n2 < e2.rules.length; ++n2) l.google.api.HttpRule.encode(e2.rules[n2], t2.uint32(10).fork()).ldelim();
        return null != e2.fullyDecodeReservedExpansion && Object.hasOwnProperty.call(e2, "fullyDecodeReservedExpansion") && t2.uint32(16).bool(e2.fullyDecodeReservedExpansion), t2;
      }, J.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, J.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.api.Http(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.rules && o2.rules.length || (o2.rules = []), o2.rules.push(l.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.fullyDecodeReservedExpansion = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, J.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, J.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.rules && e2.hasOwnProperty("rules")) {
          if (!Array.isArray(e2.rules)) return "rules: array expected";
          for (var t2 = 0; t2 < e2.rules.length; ++t2) {
            var n2 = l.google.api.HttpRule.verify(e2.rules[t2]);
            if (n2) return "rules." + n2;
          }
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && "boolean" != typeof e2.fullyDecodeReservedExpansion ? "fullyDecodeReservedExpansion: boolean expected" : null;
      }, J.fromObject = function(e2) {
        if (e2 instanceof l.google.api.Http) return e2;
        var t2 = new l.google.api.Http();
        if (e2.rules) {
          if (!Array.isArray(e2.rules)) throw TypeError(".google.api.Http.rules: array expected");
          t2.rules = [];
          for (var n2 = 0; n2 < e2.rules.length; ++n2) {
            if ("object" != typeof e2.rules[n2]) throw TypeError(".google.api.Http.rules: object expected");
            t2.rules[n2] = l.google.api.HttpRule.fromObject(e2.rules[n2]);
          }
        }
        return null != e2.fullyDecodeReservedExpansion && (t2.fullyDecodeReservedExpansion = Boolean(e2.fullyDecodeReservedExpansion)), t2;
      }, J.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.rules = []), t2.defaults && (n2.fullyDecodeReservedExpansion = false), e2.rules && e2.rules.length) {
          n2.rules = [];
          for (var o2 = 0; o2 < e2.rules.length; ++o2) n2.rules[o2] = l.google.api.HttpRule.toObject(e2.rules[o2], t2);
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && (n2.fullyDecodeReservedExpansion = e2.fullyDecodeReservedExpansion), n2;
      }, J.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, J), r.HttpRule = (h.prototype.selector = "", h.prototype.get = "", h.prototype.put = "", h.prototype.post = "", h.prototype.delete = "", h.prototype.patch = "", h.prototype.custom = null, h.prototype.body = "", h.prototype.responseBody = "", h.prototype.additionalBindings = p.emptyArray, Object.defineProperty(h.prototype, "pattern", { get: p.oneOfGetter(e = ["get", "put", "post", "delete", "patch", "custom"]), set: p.oneOfSetter(e) }), h.create = function(e2) {
        return new h(e2);
      }, h.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.selector && Object.hasOwnProperty.call(e2, "selector") && t2.uint32(10).string(e2.selector), null != e2.get && Object.hasOwnProperty.call(e2, "get") && t2.uint32(18).string(e2.get), null != e2.put && Object.hasOwnProperty.call(e2, "put") && t2.uint32(26).string(e2.put), null != e2.post && Object.hasOwnProperty.call(e2, "post") && t2.uint32(34).string(e2.post), null != e2.delete && Object.hasOwnProperty.call(e2, "delete") && t2.uint32(42).string(e2.delete), null != e2.patch && Object.hasOwnProperty.call(e2, "patch") && t2.uint32(50).string(e2.patch), null != e2.body && Object.hasOwnProperty.call(e2, "body") && t2.uint32(58).string(e2.body), null != e2.custom && Object.hasOwnProperty.call(e2, "custom") && l.google.api.CustomHttpPattern.encode(e2.custom, t2.uint32(66).fork()).ldelim(), null != e2.additionalBindings && e2.additionalBindings.length) for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) l.google.api.HttpRule.encode(e2.additionalBindings[n2], t2.uint32(90).fork()).ldelim();
        return null != e2.responseBody && Object.hasOwnProperty.call(e2, "responseBody") && t2.uint32(98).string(e2.responseBody), t2;
      }, h.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, h.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.api.HttpRule(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.selector = e2.string();
              break;
            case 2:
              o2.get = e2.string();
              break;
            case 3:
              o2.put = e2.string();
              break;
            case 4:
              o2.post = e2.string();
              break;
            case 5:
              o2.delete = e2.string();
              break;
            case 6:
              o2.patch = e2.string();
              break;
            case 8:
              o2.custom = l.google.api.CustomHttpPattern.decode(e2, e2.uint32());
              break;
            case 7:
              o2.body = e2.string();
              break;
            case 12:
              o2.responseBody = e2.string();
              break;
            case 11:
              o2.additionalBindings && o2.additionalBindings.length || (o2.additionalBindings = []), o2.additionalBindings.push(l.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, h.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, h.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        var t2 = {};
        if (null != e2.selector && e2.hasOwnProperty("selector") && !p.isString(e2.selector)) return "selector: string expected";
        if (null != e2.get && e2.hasOwnProperty("get") && (t2.pattern = 1, !p.isString(e2.get))) return "get: string expected";
        if (null != e2.put && e2.hasOwnProperty("put")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !p.isString(e2.put)) return "put: string expected";
        }
        if (null != e2.post && e2.hasOwnProperty("post")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !p.isString(e2.post)) return "post: string expected";
        }
        if (null != e2.delete && e2.hasOwnProperty("delete")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !p.isString(e2.delete)) return "delete: string expected";
        }
        if (null != e2.patch && e2.hasOwnProperty("patch")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !p.isString(e2.patch)) return "patch: string expected";
        }
        if (null != e2.custom && e2.hasOwnProperty("custom")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, n2 = l.google.api.CustomHttpPattern.verify(e2.custom)) return "custom." + n2;
        }
        if (null != e2.body && e2.hasOwnProperty("body") && !p.isString(e2.body)) return "body: string expected";
        if (null != e2.responseBody && e2.hasOwnProperty("responseBody") && !p.isString(e2.responseBody)) return "responseBody: string expected";
        if (null != e2.additionalBindings && e2.hasOwnProperty("additionalBindings")) {
          if (!Array.isArray(e2.additionalBindings)) return "additionalBindings: array expected";
          for (var n2, o2 = 0; o2 < e2.additionalBindings.length; ++o2) if (n2 = l.google.api.HttpRule.verify(e2.additionalBindings[o2])) return "additionalBindings." + n2;
        }
        return null;
      }, h.fromObject = function(e2) {
        if (e2 instanceof l.google.api.HttpRule) return e2;
        var t2 = new l.google.api.HttpRule();
        if (null != e2.selector && (t2.selector = String(e2.selector)), null != e2.get && (t2.get = String(e2.get)), null != e2.put && (t2.put = String(e2.put)), null != e2.post && (t2.post = String(e2.post)), null != e2.delete && (t2.delete = String(e2.delete)), null != e2.patch && (t2.patch = String(e2.patch)), null != e2.custom) {
          if ("object" != typeof e2.custom) throw TypeError(".google.api.HttpRule.custom: object expected");
          t2.custom = l.google.api.CustomHttpPattern.fromObject(e2.custom);
        }
        if (null != e2.body && (t2.body = String(e2.body)), null != e2.responseBody && (t2.responseBody = String(e2.responseBody)), e2.additionalBindings) {
          if (!Array.isArray(e2.additionalBindings)) throw TypeError(".google.api.HttpRule.additionalBindings: array expected");
          t2.additionalBindings = [];
          for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) {
            if ("object" != typeof e2.additionalBindings[n2]) throw TypeError(".google.api.HttpRule.additionalBindings: object expected");
            t2.additionalBindings[n2] = l.google.api.HttpRule.fromObject(e2.additionalBindings[n2]);
          }
        }
        return t2;
      }, h.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.additionalBindings = []), t2.defaults && (n2.selector = "", n2.body = "", n2.responseBody = ""), null != e2.selector && e2.hasOwnProperty("selector") && (n2.selector = e2.selector), null != e2.get && e2.hasOwnProperty("get") && (n2.get = e2.get, t2.oneofs) && (n2.pattern = "get"), null != e2.put && e2.hasOwnProperty("put") && (n2.put = e2.put, t2.oneofs) && (n2.pattern = "put"), null != e2.post && e2.hasOwnProperty("post") && (n2.post = e2.post, t2.oneofs) && (n2.pattern = "post"), null != e2.delete && e2.hasOwnProperty("delete") && (n2.delete = e2.delete, t2.oneofs) && (n2.pattern = "delete"), null != e2.patch && e2.hasOwnProperty("patch") && (n2.patch = e2.patch, t2.oneofs) && (n2.pattern = "patch"), null != e2.body && e2.hasOwnProperty("body") && (n2.body = e2.body), null != e2.custom && e2.hasOwnProperty("custom") && (n2.custom = l.google.api.CustomHttpPattern.toObject(e2.custom, t2), t2.oneofs) && (n2.pattern = "custom"), e2.additionalBindings && e2.additionalBindings.length) {
          n2.additionalBindings = [];
          for (var o2 = 0; o2 < e2.additionalBindings.length; ++o2) n2.additionalBindings[o2] = l.google.api.HttpRule.toObject(e2.additionalBindings[o2], t2);
        }
        return null != e2.responseBody && e2.hasOwnProperty("responseBody") && (n2.responseBody = e2.responseBody), n2;
      }, h.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, h), r.CustomHttpPattern = (_.prototype.kind = "", _.prototype.path = "", _.create = function(e2) {
        return new _(e2);
      }, _.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.kind && Object.hasOwnProperty.call(e2, "kind") && t2.uint32(10).string(e2.kind), null != e2.path && Object.hasOwnProperty.call(e2, "path") && t2.uint32(18).string(e2.path), t2;
      }, _.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, _.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.api.CustomHttpPattern(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.kind = e2.string();
              break;
            case 2:
              o2.path = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, _.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, _.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.kind && e2.hasOwnProperty("kind") && !p.isString(e2.kind) ? "kind: string expected" : null != e2.path && e2.hasOwnProperty("path") && !p.isString(e2.path) ? "path: string expected" : null;
      }, _.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.api.CustomHttpPattern ? e2 : (t2 = new l.google.api.CustomHttpPattern(), null != e2.kind && (t2.kind = String(e2.kind)), null != e2.path && (t2.path = String(e2.path)), t2);
      }, _.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.kind = "", n2.path = ""), null != e2.kind && e2.hasOwnProperty("kind") && (n2.kind = e2.kind), null != e2.path && e2.hasOwnProperty("path") && (n2.path = e2.path), n2;
      }, _.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, _), r.FieldBehavior = (e = {}, (t = Object.create(e))[e[0] = "FIELD_BEHAVIOR_UNSPECIFIED"] = 0, t[e[1] = "OPTIONAL"] = 1, t[e[2] = "REQUIRED"] = 2, t[e[3] = "OUTPUT_ONLY"] = 3, t[e[4] = "INPUT_ONLY"] = 4, t[e[5] = "IMMUTABLE"] = 5, t), r.ResourceDescriptor = (b.prototype.type = "", b.prototype.pattern = p.emptyArray, b.prototype.nameField = "", b.prototype.history = 0, b.prototype.plural = "", b.prototype.singular = "", b.create = function(e2) {
        return new b(e2);
      }, b.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.type && Object.hasOwnProperty.call(e2, "type") && t2.uint32(10).string(e2.type), null != e2.pattern && e2.pattern.length) for (var n2 = 0; n2 < e2.pattern.length; ++n2) t2.uint32(18).string(e2.pattern[n2]);
        return null != e2.nameField && Object.hasOwnProperty.call(e2, "nameField") && t2.uint32(26).string(e2.nameField), null != e2.history && Object.hasOwnProperty.call(e2, "history") && t2.uint32(32).int32(e2.history), null != e2.plural && Object.hasOwnProperty.call(e2, "plural") && t2.uint32(42).string(e2.plural), null != e2.singular && Object.hasOwnProperty.call(e2, "singular") && t2.uint32(50).string(e2.singular), t2;
      }, b.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, b.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.api.ResourceDescriptor(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.type = e2.string();
              break;
            case 2:
              o2.pattern && o2.pattern.length || (o2.pattern = []), o2.pattern.push(e2.string());
              break;
            case 3:
              o2.nameField = e2.string();
              break;
            case 4:
              o2.history = e2.int32();
              break;
            case 5:
              o2.plural = e2.string();
              break;
            case 6:
              o2.singular = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, b.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, b.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.type && e2.hasOwnProperty("type") && !p.isString(e2.type)) return "type: string expected";
        if (null != e2.pattern && e2.hasOwnProperty("pattern")) {
          if (!Array.isArray(e2.pattern)) return "pattern: array expected";
          for (var t2 = 0; t2 < e2.pattern.length; ++t2) if (!p.isString(e2.pattern[t2])) return "pattern: string[] expected";
        }
        if (null != e2.nameField && e2.hasOwnProperty("nameField") && !p.isString(e2.nameField)) return "nameField: string expected";
        if (null != e2.history && e2.hasOwnProperty("history")) switch (e2.history) {
          default:
            return "history: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        return null != e2.plural && e2.hasOwnProperty("plural") && !p.isString(e2.plural) ? "plural: string expected" : null != e2.singular && e2.hasOwnProperty("singular") && !p.isString(e2.singular) ? "singular: string expected" : null;
      }, b.fromObject = function(e2) {
        if (e2 instanceof l.google.api.ResourceDescriptor) return e2;
        var t2 = new l.google.api.ResourceDescriptor();
        if (null != e2.type && (t2.type = String(e2.type)), e2.pattern) {
          if (!Array.isArray(e2.pattern)) throw TypeError(".google.api.ResourceDescriptor.pattern: array expected");
          t2.pattern = [];
          for (var n2 = 0; n2 < e2.pattern.length; ++n2) t2.pattern[n2] = String(e2.pattern[n2]);
        }
        switch (null != e2.nameField && (t2.nameField = String(e2.nameField)), e2.history) {
          case "HISTORY_UNSPECIFIED":
          case 0:
            t2.history = 0;
            break;
          case "ORIGINALLY_SINGLE_PATTERN":
          case 1:
            t2.history = 1;
            break;
          case "FUTURE_MULTI_PATTERN":
          case 2:
            t2.history = 2;
        }
        return null != e2.plural && (t2.plural = String(e2.plural)), null != e2.singular && (t2.singular = String(e2.singular)), t2;
      }, b.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.pattern = []), t2.defaults && (n2.type = "", n2.nameField = "", n2.history = t2.enums === String ? "HISTORY_UNSPECIFIED" : 0, n2.plural = "", n2.singular = ""), null != e2.type && e2.hasOwnProperty("type") && (n2.type = e2.type), e2.pattern && e2.pattern.length) {
          n2.pattern = [];
          for (var o2 = 0; o2 < e2.pattern.length; ++o2) n2.pattern[o2] = e2.pattern[o2];
        }
        return null != e2.nameField && e2.hasOwnProperty("nameField") && (n2.nameField = e2.nameField), null != e2.history && e2.hasOwnProperty("history") && (n2.history = t2.enums === String ? l.google.api.ResourceDescriptor.History[e2.history] : e2.history), null != e2.plural && e2.hasOwnProperty("plural") && (n2.plural = e2.plural), null != e2.singular && e2.hasOwnProperty("singular") && (n2.singular = e2.singular), n2;
      }, b.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, b.History = (e = {}, (t = Object.create(e))[e[0] = "HISTORY_UNSPECIFIED"] = 0, t[e[1] = "ORIGINALLY_SINGLE_PATTERN"] = 1, t[e[2] = "FUTURE_MULTI_PATTERN"] = 2, t), b), r.ResourceReference = (H.prototype.type = "", H.prototype.childType = "", H.create = function(e2) {
        return new H(e2);
      }, H.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.type && Object.hasOwnProperty.call(e2, "type") && t2.uint32(10).string(e2.type), null != e2.childType && Object.hasOwnProperty.call(e2, "childType") && t2.uint32(18).string(e2.childType), t2;
      }, H.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, H.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.api.ResourceReference(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.type = e2.string();
              break;
            case 2:
              o2.childType = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, H.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, H.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.type && e2.hasOwnProperty("type") && !p.isString(e2.type) ? "type: string expected" : null != e2.childType && e2.hasOwnProperty("childType") && !p.isString(e2.childType) ? "childType: string expected" : null;
      }, H.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.api.ResourceReference ? e2 : (t2 = new l.google.api.ResourceReference(), null != e2.type && (t2.type = String(e2.type)), null != e2.childType && (t2.childType = String(e2.childType)), t2);
      }, H.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.type = "", n2.childType = ""), null != e2.type && e2.hasOwnProperty("type") && (n2.type = e2.type), null != e2.childType && e2.hasOwnProperty("childType") && (n2.childType = e2.childType), n2;
      }, H.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, H), r), F.protobuf = ((n = {}).FileDescriptorSet = (q.prototype.file = p.emptyArray, q.create = function(e2) {
        return new q(e2);
      }, q.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.file && e2.file.length) for (var n2 = 0; n2 < e2.file.length; ++n2) l.google.protobuf.FileDescriptorProto.encode(e2.file[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, q.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, q.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.FileDescriptorSet(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.file && o2.file.length || (o2.file = []), o2.file.push(l.google.protobuf.FileDescriptorProto.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, q.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, q.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.file && e2.hasOwnProperty("file")) {
          if (!Array.isArray(e2.file)) return "file: array expected";
          for (var t2 = 0; t2 < e2.file.length; ++t2) {
            var n2 = l.google.protobuf.FileDescriptorProto.verify(e2.file[t2]);
            if (n2) return "file." + n2;
          }
        }
        return null;
      }, q.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.FileDescriptorSet) return e2;
        var t2 = new l.google.protobuf.FileDescriptorSet();
        if (e2.file) {
          if (!Array.isArray(e2.file)) throw TypeError(".google.protobuf.FileDescriptorSet.file: array expected");
          t2.file = [];
          for (var n2 = 0; n2 < e2.file.length; ++n2) {
            if ("object" != typeof e2.file[n2]) throw TypeError(".google.protobuf.FileDescriptorSet.file: object expected");
            t2.file[n2] = l.google.protobuf.FileDescriptorProto.fromObject(e2.file[n2]);
          }
        }
        return t2;
      }, q.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.file = []), e2.file && e2.file.length) {
          n2.file = [];
          for (var o2 = 0; o2 < e2.file.length; ++o2) n2.file[o2] = l.google.protobuf.FileDescriptorProto.toObject(e2.file[o2], t2);
        }
        return n2;
      }, q.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, q), n.FileDescriptorProto = (m.prototype.name = "", m.prototype.package = "", m.prototype.dependency = p.emptyArray, m.prototype.publicDependency = p.emptyArray, m.prototype.weakDependency = p.emptyArray, m.prototype.messageType = p.emptyArray, m.prototype.enumType = p.emptyArray, m.prototype.service = p.emptyArray, m.prototype.extension = p.emptyArray, m.prototype.options = null, m.prototype.sourceCodeInfo = null, m.prototype.syntax = "", m.create = function(e2) {
        return new m(e2);
      }, m.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.package && Object.hasOwnProperty.call(e2, "package") && t2.uint32(18).string(e2.package), null != e2.dependency && e2.dependency.length) for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.uint32(26).string(e2.dependency[n2]);
        if (null != e2.messageType && e2.messageType.length) for (n2 = 0; n2 < e2.messageType.length; ++n2) l.google.protobuf.DescriptorProto.encode(e2.messageType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) l.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.service && e2.service.length) for (n2 = 0; n2 < e2.service.length; ++n2) l.google.protobuf.ServiceDescriptorProto.encode(e2.service[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) l.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(58).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.FileOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.sourceCodeInfo && Object.hasOwnProperty.call(e2, "sourceCodeInfo") && l.google.protobuf.SourceCodeInfo.encode(e2.sourceCodeInfo, t2.uint32(74).fork()).ldelim(), null != e2.publicDependency && e2.publicDependency.length) for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.uint32(80).int32(e2.publicDependency[n2]);
        if (null != e2.weakDependency && e2.weakDependency.length) for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.uint32(88).int32(e2.weakDependency[n2]);
        return null != e2.syntax && Object.hasOwnProperty.call(e2, "syntax") && t2.uint32(98).string(e2.syntax), t2;
      }, m.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, m.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.FileDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.package = e2.string();
              break;
            case 3:
              o2.dependency && o2.dependency.length || (o2.dependency = []), o2.dependency.push(e2.string());
              break;
            case 10:
              if (o2.publicDependency && o2.publicDependency.length || (o2.publicDependency = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.publicDependency.push(e2.int32());
              else o2.publicDependency.push(e2.int32());
              break;
            case 11:
              if (o2.weakDependency && o2.weakDependency.length || (o2.weakDependency = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.weakDependency.push(e2.int32());
              else o2.weakDependency.push(e2.int32());
              break;
            case 4:
              o2.messageType && o2.messageType.length || (o2.messageType = []), o2.messageType.push(l.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(l.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.service && o2.service.length || (o2.service = []), o2.service.push(l.google.protobuf.ServiceDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(l.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.options = l.google.protobuf.FileOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.sourceCodeInfo = l.google.protobuf.SourceCodeInfo.decode(e2, e2.uint32());
              break;
            case 12:
              o2.syntax = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, m.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, m.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.package && e2.hasOwnProperty("package") && !p.isString(e2.package)) return "package: string expected";
        if (null != e2.dependency && e2.hasOwnProperty("dependency")) {
          if (!Array.isArray(e2.dependency)) return "dependency: array expected";
          for (var t2 = 0; t2 < e2.dependency.length; ++t2) if (!p.isString(e2.dependency[t2])) return "dependency: string[] expected";
        }
        if (null != e2.publicDependency && e2.hasOwnProperty("publicDependency")) {
          if (!Array.isArray(e2.publicDependency)) return "publicDependency: array expected";
          for (t2 = 0; t2 < e2.publicDependency.length; ++t2) if (!p.isInteger(e2.publicDependency[t2])) return "publicDependency: integer[] expected";
        }
        if (null != e2.weakDependency && e2.hasOwnProperty("weakDependency")) {
          if (!Array.isArray(e2.weakDependency)) return "weakDependency: array expected";
          for (t2 = 0; t2 < e2.weakDependency.length; ++t2) if (!p.isInteger(e2.weakDependency[t2])) return "weakDependency: integer[] expected";
        }
        if (null != e2.messageType && e2.hasOwnProperty("messageType")) {
          if (!Array.isArray(e2.messageType)) return "messageType: array expected";
          for (t2 = 0; t2 < e2.messageType.length; ++t2) if (n2 = l.google.protobuf.DescriptorProto.verify(e2.messageType[t2])) return "messageType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = l.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.service && e2.hasOwnProperty("service")) {
          if (!Array.isArray(e2.service)) return "service: array expected";
          for (t2 = 0; t2 < e2.service.length; ++t2) if (n2 = l.google.protobuf.ServiceDescriptorProto.verify(e2.service[t2])) return "service." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = l.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = l.google.protobuf.FileOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2 = l.google.protobuf.SourceCodeInfo.verify(e2.sourceCodeInfo))) return "sourceCodeInfo." + n2;
        return null != e2.syntax && e2.hasOwnProperty("syntax") && !p.isString(e2.syntax) ? "syntax: string expected" : null;
      }, m.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.FileDescriptorProto) return e2;
        var t2 = new l.google.protobuf.FileDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.package && (t2.package = String(e2.package)), e2.dependency) {
          if (!Array.isArray(e2.dependency)) throw TypeError(".google.protobuf.FileDescriptorProto.dependency: array expected");
          t2.dependency = [];
          for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.dependency[n2] = String(e2.dependency[n2]);
        }
        if (e2.publicDependency) {
          if (!Array.isArray(e2.publicDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.publicDependency: array expected");
          t2.publicDependency = [];
          for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.publicDependency[n2] = 0 | e2.publicDependency[n2];
        }
        if (e2.weakDependency) {
          if (!Array.isArray(e2.weakDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.weakDependency: array expected");
          t2.weakDependency = [];
          for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.weakDependency[n2] = 0 | e2.weakDependency[n2];
        }
        if (e2.messageType) {
          if (!Array.isArray(e2.messageType)) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: array expected");
          t2.messageType = [];
          for (n2 = 0; n2 < e2.messageType.length; ++n2) {
            if ("object" != typeof e2.messageType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: object expected");
            t2.messageType[n2] = l.google.protobuf.DescriptorProto.fromObject(e2.messageType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: object expected");
            t2.enumType[n2] = l.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.service) {
          if (!Array.isArray(e2.service)) throw TypeError(".google.protobuf.FileDescriptorProto.service: array expected");
          t2.service = [];
          for (n2 = 0; n2 < e2.service.length; ++n2) {
            if ("object" != typeof e2.service[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.service: object expected");
            t2.service[n2] = l.google.protobuf.ServiceDescriptorProto.fromObject(e2.service[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.FileDescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.extension: object expected");
            t2.extension[n2] = l.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FileDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.FileOptions.fromObject(e2.options);
        }
        if (null != e2.sourceCodeInfo) {
          if ("object" != typeof e2.sourceCodeInfo) throw TypeError(".google.protobuf.FileDescriptorProto.sourceCodeInfo: object expected");
          t2.sourceCodeInfo = l.google.protobuf.SourceCodeInfo.fromObject(e2.sourceCodeInfo);
        }
        return null != e2.syntax && (t2.syntax = String(e2.syntax)), t2;
      }, m.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.dependency = [], n2.messageType = [], n2.enumType = [], n2.service = [], n2.extension = [], n2.publicDependency = [], n2.weakDependency = []), t2.defaults && (n2.name = "", n2.package = "", n2.options = null, n2.sourceCodeInfo = null, n2.syntax = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.package && e2.hasOwnProperty("package") && (n2.package = e2.package), e2.dependency && e2.dependency.length) {
          n2.dependency = [];
          for (var o2 = 0; o2 < e2.dependency.length; ++o2) n2.dependency[o2] = e2.dependency[o2];
        }
        if (e2.messageType && e2.messageType.length) {
          n2.messageType = [];
          for (o2 = 0; o2 < e2.messageType.length; ++o2) n2.messageType[o2] = l.google.protobuf.DescriptorProto.toObject(e2.messageType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = l.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.service && e2.service.length) {
          n2.service = [];
          for (o2 = 0; o2 < e2.service.length; ++o2) n2.service[o2] = l.google.protobuf.ServiceDescriptorProto.toObject(e2.service[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = l.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.FileOptions.toObject(e2.options, t2)), null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2.sourceCodeInfo = l.google.protobuf.SourceCodeInfo.toObject(e2.sourceCodeInfo, t2)), e2.publicDependency && e2.publicDependency.length) {
          n2.publicDependency = [];
          for (o2 = 0; o2 < e2.publicDependency.length; ++o2) n2.publicDependency[o2] = e2.publicDependency[o2];
        }
        if (e2.weakDependency && e2.weakDependency.length) {
          n2.weakDependency = [];
          for (o2 = 0; o2 < e2.weakDependency.length; ++o2) n2.weakDependency[o2] = e2.weakDependency[o2];
        }
        return null != e2.syntax && e2.hasOwnProperty("syntax") && (n2.syntax = e2.syntax), n2;
      }, m.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, m), n.DescriptorProto = (O.prototype.name = "", O.prototype.field = p.emptyArray, O.prototype.extension = p.emptyArray, O.prototype.nestedType = p.emptyArray, O.prototype.enumType = p.emptyArray, O.prototype.extensionRange = p.emptyArray, O.prototype.oneofDecl = p.emptyArray, O.prototype.options = null, O.prototype.reservedRange = p.emptyArray, O.prototype.reservedName = p.emptyArray, O.create = function(e2) {
        return new O(e2);
      }, O.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.field && e2.field.length) for (var n2 = 0; n2 < e2.field.length; ++n2) l.google.protobuf.FieldDescriptorProto.encode(e2.field[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.nestedType && e2.nestedType.length) for (n2 = 0; n2 < e2.nestedType.length; ++n2) l.google.protobuf.DescriptorProto.encode(e2.nestedType[n2], t2.uint32(26).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) l.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.extensionRange && e2.extensionRange.length) for (n2 = 0; n2 < e2.extensionRange.length; ++n2) l.google.protobuf.DescriptorProto.ExtensionRange.encode(e2.extensionRange[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) l.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.MessageOptions.encode(e2.options, t2.uint32(58).fork()).ldelim(), null != e2.oneofDecl && e2.oneofDecl.length) for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) l.google.protobuf.OneofDescriptorProto.encode(e2.oneofDecl[n2], t2.uint32(66).fork()).ldelim();
        if (null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) l.google.protobuf.DescriptorProto.ReservedRange.encode(e2.reservedRange[n2], t2.uint32(74).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(82).string(e2.reservedName[n2]);
        return t2;
      }, O.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, O.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.DescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.field && o2.field.length || (o2.field = []), o2.field.push(l.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(l.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.nestedType && o2.nestedType.length || (o2.nestedType = []), o2.nestedType.push(l.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 4:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(l.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.extensionRange && o2.extensionRange.length || (o2.extensionRange = []), o2.extensionRange.push(l.google.protobuf.DescriptorProto.ExtensionRange.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.oneofDecl && o2.oneofDecl.length || (o2.oneofDecl = []), o2.oneofDecl.push(l.google.protobuf.OneofDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.options = l.google.protobuf.MessageOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(l.google.protobuf.DescriptorProto.ReservedRange.decode(e2, e2.uint32()));
              break;
            case 10:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, O.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, O.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.field && e2.hasOwnProperty("field")) {
          if (!Array.isArray(e2.field)) return "field: array expected";
          for (var t2 = 0; t2 < e2.field.length; ++t2) if (n2 = l.google.protobuf.FieldDescriptorProto.verify(e2.field[t2])) return "field." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = l.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        if (null != e2.nestedType && e2.hasOwnProperty("nestedType")) {
          if (!Array.isArray(e2.nestedType)) return "nestedType: array expected";
          for (t2 = 0; t2 < e2.nestedType.length; ++t2) if (n2 = l.google.protobuf.DescriptorProto.verify(e2.nestedType[t2])) return "nestedType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = l.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.extensionRange && e2.hasOwnProperty("extensionRange")) {
          if (!Array.isArray(e2.extensionRange)) return "extensionRange: array expected";
          for (t2 = 0; t2 < e2.extensionRange.length; ++t2) if (n2 = l.google.protobuf.DescriptorProto.ExtensionRange.verify(e2.extensionRange[t2])) return "extensionRange." + n2;
        }
        if (null != e2.oneofDecl && e2.hasOwnProperty("oneofDecl")) {
          if (!Array.isArray(e2.oneofDecl)) return "oneofDecl: array expected";
          for (t2 = 0; t2 < e2.oneofDecl.length; ++t2) if (n2 = l.google.protobuf.OneofDescriptorProto.verify(e2.oneofDecl[t2])) return "oneofDecl." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = l.google.protobuf.MessageOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = l.google.protobuf.DescriptorProto.ReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!p.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, O.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.DescriptorProto) return e2;
        var t2 = new l.google.protobuf.DescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.field) {
          if (!Array.isArray(e2.field)) throw TypeError(".google.protobuf.DescriptorProto.field: array expected");
          t2.field = [];
          for (var n2 = 0; n2 < e2.field.length; ++n2) {
            if ("object" != typeof e2.field[n2]) throw TypeError(".google.protobuf.DescriptorProto.field: object expected");
            t2.field[n2] = l.google.protobuf.FieldDescriptorProto.fromObject(e2.field[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.DescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.DescriptorProto.extension: object expected");
            t2.extension[n2] = l.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (e2.nestedType) {
          if (!Array.isArray(e2.nestedType)) throw TypeError(".google.protobuf.DescriptorProto.nestedType: array expected");
          t2.nestedType = [];
          for (n2 = 0; n2 < e2.nestedType.length; ++n2) {
            if ("object" != typeof e2.nestedType[n2]) throw TypeError(".google.protobuf.DescriptorProto.nestedType: object expected");
            t2.nestedType[n2] = l.google.protobuf.DescriptorProto.fromObject(e2.nestedType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.DescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.DescriptorProto.enumType: object expected");
            t2.enumType[n2] = l.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.extensionRange) {
          if (!Array.isArray(e2.extensionRange)) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: array expected");
          t2.extensionRange = [];
          for (n2 = 0; n2 < e2.extensionRange.length; ++n2) {
            if ("object" != typeof e2.extensionRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: object expected");
            t2.extensionRange[n2] = l.google.protobuf.DescriptorProto.ExtensionRange.fromObject(e2.extensionRange[n2]);
          }
        }
        if (e2.oneofDecl) {
          if (!Array.isArray(e2.oneofDecl)) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: array expected");
          t2.oneofDecl = [];
          for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) {
            if ("object" != typeof e2.oneofDecl[n2]) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: object expected");
            t2.oneofDecl[n2] = l.google.protobuf.OneofDescriptorProto.fromObject(e2.oneofDecl[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.options: object expected");
          t2.options = l.google.protobuf.MessageOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = l.google.protobuf.DescriptorProto.ReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.DescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, O.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.field = [], n2.nestedType = [], n2.enumType = [], n2.extensionRange = [], n2.extension = [], n2.oneofDecl = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.field && e2.field.length) {
          n2.field = [];
          for (var o2 = 0; o2 < e2.field.length; ++o2) n2.field[o2] = l.google.protobuf.FieldDescriptorProto.toObject(e2.field[o2], t2);
        }
        if (e2.nestedType && e2.nestedType.length) {
          n2.nestedType = [];
          for (o2 = 0; o2 < e2.nestedType.length; ++o2) n2.nestedType[o2] = l.google.protobuf.DescriptorProto.toObject(e2.nestedType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = l.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.extensionRange && e2.extensionRange.length) {
          n2.extensionRange = [];
          for (o2 = 0; o2 < e2.extensionRange.length; ++o2) n2.extensionRange[o2] = l.google.protobuf.DescriptorProto.ExtensionRange.toObject(e2.extensionRange[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = l.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.MessageOptions.toObject(e2.options, t2)), e2.oneofDecl && e2.oneofDecl.length) {
          n2.oneofDecl = [];
          for (o2 = 0; o2 < e2.oneofDecl.length; ++o2) n2.oneofDecl[o2] = l.google.protobuf.OneofDescriptorProto.toObject(e2.oneofDecl[o2], t2);
        }
        if (e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = l.google.protobuf.DescriptorProto.ReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, O.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, O.ExtensionRange = (v.prototype.start = 0, v.prototype.end = 0, v.prototype.options = null, v.create = function(e2) {
        return new v(e2);
      }, v.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.ExtensionRangeOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, v.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, v.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.DescriptorProto.ExtensionRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            case 3:
              o2.options = l.google.protobuf.ExtensionRangeOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, v.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, v.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.start && e2.hasOwnProperty("start") && !p.isInteger(e2.start)) return "start: integer expected";
        if (null != e2.end && e2.hasOwnProperty("end") && !p.isInteger(e2.end)) return "end: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = l.google.protobuf.ExtensionRangeOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, v.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.DescriptorProto.ExtensionRange) return e2;
        var t2 = new l.google.protobuf.DescriptorProto.ExtensionRange();
        if (null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.ExtensionRange.options: object expected");
          t2.options = l.google.protobuf.ExtensionRangeOptions.fromObject(e2.options);
        }
        return t2;
      }, v.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0, n2.options = null), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.ExtensionRangeOptions.toObject(e2.options, t2)), n2;
      }, v.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, v), O.ReservedRange = (Y.prototype.start = 0, Y.prototype.end = 0, Y.create = function(e2) {
        return new Y(e2);
      }, Y.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, Y.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, Y.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.DescriptorProto.ReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, Y.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, Y.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !p.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !p.isInteger(e2.end) ? "end: integer expected" : null;
      }, Y.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.protobuf.DescriptorProto.ReservedRange ? e2 : (t2 = new l.google.protobuf.DescriptorProto.ReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, Y.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, Y.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, Y), O), n.ExtensionRangeOptions = (z.prototype.uninterpretedOption = p.emptyArray, z.create = function(e2) {
        return new z(e2);
      }, z.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, z.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, z.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.ExtensionRangeOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, z.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, z.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, z.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.ExtensionRangeOptions) return e2;
        var t2 = new l.google.protobuf.ExtensionRangeOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, z.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, z.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, z), n.FieldDescriptorProto = (P.prototype.name = "", P.prototype.number = 0, P.prototype.label = 1, P.prototype.type = 1, P.prototype.typeName = "", P.prototype.extendee = "", P.prototype.defaultValue = "", P.prototype.oneofIndex = 0, P.prototype.jsonName = "", P.prototype.options = null, P.prototype.proto3Optional = false, P.create = function(e2) {
        return new P(e2);
      }, P.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.extendee && Object.hasOwnProperty.call(e2, "extendee") && t2.uint32(18).string(e2.extendee), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(24).int32(e2.number), null != e2.label && Object.hasOwnProperty.call(e2, "label") && t2.uint32(32).int32(e2.label), null != e2.type && Object.hasOwnProperty.call(e2, "type") && t2.uint32(40).int32(e2.type), null != e2.typeName && Object.hasOwnProperty.call(e2, "typeName") && t2.uint32(50).string(e2.typeName), null != e2.defaultValue && Object.hasOwnProperty.call(e2, "defaultValue") && t2.uint32(58).string(e2.defaultValue), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.FieldOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.oneofIndex && Object.hasOwnProperty.call(e2, "oneofIndex") && t2.uint32(72).int32(e2.oneofIndex), null != e2.jsonName && Object.hasOwnProperty.call(e2, "jsonName") && t2.uint32(82).string(e2.jsonName), null != e2.proto3Optional && Object.hasOwnProperty.call(e2, "proto3Optional") && t2.uint32(136).bool(e2.proto3Optional), t2;
      }, P.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, P.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.FieldDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 3:
              o2.number = e2.int32();
              break;
            case 4:
              o2.label = e2.int32();
              break;
            case 5:
              o2.type = e2.int32();
              break;
            case 6:
              o2.typeName = e2.string();
              break;
            case 2:
              o2.extendee = e2.string();
              break;
            case 7:
              o2.defaultValue = e2.string();
              break;
            case 9:
              o2.oneofIndex = e2.int32();
              break;
            case 10:
              o2.jsonName = e2.string();
              break;
            case 8:
              o2.options = l.google.protobuf.FieldOptions.decode(e2, e2.uint32());
              break;
            case 17:
              o2.proto3Optional = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, P.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, P.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !p.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.label && e2.hasOwnProperty("label")) switch (e2.label) {
          default:
            return "label: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.type && e2.hasOwnProperty("type")) switch (e2.type) {
          default:
            return "type: enum value expected";
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
        }
        if (null != e2.typeName && e2.hasOwnProperty("typeName") && !p.isString(e2.typeName)) return "typeName: string expected";
        if (null != e2.extendee && e2.hasOwnProperty("extendee") && !p.isString(e2.extendee)) return "extendee: string expected";
        if (null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && !p.isString(e2.defaultValue)) return "defaultValue: string expected";
        if (null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && !p.isInteger(e2.oneofIndex)) return "oneofIndex: integer expected";
        if (null != e2.jsonName && e2.hasOwnProperty("jsonName") && !p.isString(e2.jsonName)) return "jsonName: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = l.google.protobuf.FieldOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && "boolean" != typeof e2.proto3Optional ? "proto3Optional: boolean expected" : null;
      }, P.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.FieldDescriptorProto) return e2;
        var t2 = new l.google.protobuf.FieldDescriptorProto();
        switch (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), e2.label) {
          case "LABEL_OPTIONAL":
          case 1:
            t2.label = 1;
            break;
          case "LABEL_REQUIRED":
          case 2:
            t2.label = 2;
            break;
          case "LABEL_REPEATED":
          case 3:
            t2.label = 3;
        }
        switch (e2.type) {
          case "TYPE_DOUBLE":
          case 1:
            t2.type = 1;
            break;
          case "TYPE_FLOAT":
          case 2:
            t2.type = 2;
            break;
          case "TYPE_INT64":
          case 3:
            t2.type = 3;
            break;
          case "TYPE_UINT64":
          case 4:
            t2.type = 4;
            break;
          case "TYPE_INT32":
          case 5:
            t2.type = 5;
            break;
          case "TYPE_FIXED64":
          case 6:
            t2.type = 6;
            break;
          case "TYPE_FIXED32":
          case 7:
            t2.type = 7;
            break;
          case "TYPE_BOOL":
          case 8:
            t2.type = 8;
            break;
          case "TYPE_STRING":
          case 9:
            t2.type = 9;
            break;
          case "TYPE_GROUP":
          case 10:
            t2.type = 10;
            break;
          case "TYPE_MESSAGE":
          case 11:
            t2.type = 11;
            break;
          case "TYPE_BYTES":
          case 12:
            t2.type = 12;
            break;
          case "TYPE_UINT32":
          case 13:
            t2.type = 13;
            break;
          case "TYPE_ENUM":
          case 14:
            t2.type = 14;
            break;
          case "TYPE_SFIXED32":
          case 15:
            t2.type = 15;
            break;
          case "TYPE_SFIXED64":
          case 16:
            t2.type = 16;
            break;
          case "TYPE_SINT32":
          case 17:
            t2.type = 17;
            break;
          case "TYPE_SINT64":
          case 18:
            t2.type = 18;
        }
        if (null != e2.typeName && (t2.typeName = String(e2.typeName)), null != e2.extendee && (t2.extendee = String(e2.extendee)), null != e2.defaultValue && (t2.defaultValue = String(e2.defaultValue)), null != e2.oneofIndex && (t2.oneofIndex = 0 | e2.oneofIndex), null != e2.jsonName && (t2.jsonName = String(e2.jsonName)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FieldDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.FieldOptions.fromObject(e2.options);
        }
        return null != e2.proto3Optional && (t2.proto3Optional = Boolean(e2.proto3Optional)), t2;
      }, P.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.extendee = "", n2.number = 0, n2.label = t2.enums === String ? "LABEL_OPTIONAL" : 1, n2.type = t2.enums === String ? "TYPE_DOUBLE" : 1, n2.typeName = "", n2.defaultValue = "", n2.options = null, n2.oneofIndex = 0, n2.jsonName = "", n2.proto3Optional = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.extendee && e2.hasOwnProperty("extendee") && (n2.extendee = e2.extendee), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.label && e2.hasOwnProperty("label") && (n2.label = t2.enums === String ? l.google.protobuf.FieldDescriptorProto.Label[e2.label] : e2.label), null != e2.type && e2.hasOwnProperty("type") && (n2.type = t2.enums === String ? l.google.protobuf.FieldDescriptorProto.Type[e2.type] : e2.type), null != e2.typeName && e2.hasOwnProperty("typeName") && (n2.typeName = e2.typeName), null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && (n2.defaultValue = e2.defaultValue), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.FieldOptions.toObject(e2.options, t2)), null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && (n2.oneofIndex = e2.oneofIndex), null != e2.jsonName && e2.hasOwnProperty("jsonName") && (n2.jsonName = e2.jsonName), null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && (n2.proto3Optional = e2.proto3Optional), n2;
      }, P.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, P.Type = (e = {}, (t = Object.create(e))[e[1] = "TYPE_DOUBLE"] = 1, t[e[2] = "TYPE_FLOAT"] = 2, t[e[3] = "TYPE_INT64"] = 3, t[e[4] = "TYPE_UINT64"] = 4, t[e[5] = "TYPE_INT32"] = 5, t[e[6] = "TYPE_FIXED64"] = 6, t[e[7] = "TYPE_FIXED32"] = 7, t[e[8] = "TYPE_BOOL"] = 8, t[e[9] = "TYPE_STRING"] = 9, t[e[10] = "TYPE_GROUP"] = 10, t[e[11] = "TYPE_MESSAGE"] = 11, t[e[12] = "TYPE_BYTES"] = 12, t[e[13] = "TYPE_UINT32"] = 13, t[e[14] = "TYPE_ENUM"] = 14, t[e[15] = "TYPE_SFIXED32"] = 15, t[e[16] = "TYPE_SFIXED64"] = 16, t[e[17] = "TYPE_SINT32"] = 17, t[e[18] = "TYPE_SINT64"] = 18, t), P.Label = (e = {}, (t = Object.create(e))[e[1] = "LABEL_OPTIONAL"] = 1, t[e[2] = "LABEL_REQUIRED"] = 2, t[e[3] = "LABEL_REPEATED"] = 3, t), P), n.OneofDescriptorProto = (W.prototype.name = "", W.prototype.options = null, W.create = function(e2) {
        return new W(e2);
      }, W.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.OneofOptions.encode(e2.options, t2.uint32(18).fork()).ldelim(), t2;
      }, W.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, W.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.OneofDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.options = l.google.protobuf.OneofOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, W.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, W.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = l.google.protobuf.OneofOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, W.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.OneofDescriptorProto) return e2;
        var t2 = new l.google.protobuf.OneofDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.OneofDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.OneofOptions.fromObject(e2.options);
        }
        return t2;
      }, W.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.OneofOptions.toObject(e2.options, t2)), n2;
      }, W.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, W), n.EnumDescriptorProto = (w.prototype.name = "", w.prototype.value = p.emptyArray, w.prototype.options = null, w.prototype.reservedRange = p.emptyArray, w.prototype.reservedName = p.emptyArray, w.create = function(e2) {
        return new w(e2);
      }, w.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.value && e2.value.length) for (var n2 = 0; n2 < e2.value.length; ++n2) l.google.protobuf.EnumValueDescriptorProto.encode(e2.value[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.EnumOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) l.google.protobuf.EnumDescriptorProto.EnumReservedRange.encode(e2.reservedRange[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(42).string(e2.reservedName[n2]);
        return t2;
      }, w.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, w.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.EnumDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.value && o2.value.length || (o2.value = []), o2.value.push(l.google.protobuf.EnumValueDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = l.google.protobuf.EnumOptions.decode(e2, e2.uint32());
              break;
            case 4:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(l.google.protobuf.EnumDescriptorProto.EnumReservedRange.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, w.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, w.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.value && e2.hasOwnProperty("value")) {
          if (!Array.isArray(e2.value)) return "value: array expected";
          for (var t2 = 0; t2 < e2.value.length; ++t2) if (n2 = l.google.protobuf.EnumValueDescriptorProto.verify(e2.value[t2])) return "value." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = l.google.protobuf.EnumOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = l.google.protobuf.EnumDescriptorProto.EnumReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!p.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, w.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.EnumDescriptorProto) return e2;
        var t2 = new l.google.protobuf.EnumDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.value) {
          if (!Array.isArray(e2.value)) throw TypeError(".google.protobuf.EnumDescriptorProto.value: array expected");
          t2.value = [];
          for (var n2 = 0; n2 < e2.value.length; ++n2) {
            if ("object" != typeof e2.value[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.value: object expected");
            t2.value[n2] = l.google.protobuf.EnumValueDescriptorProto.fromObject(e2.value[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.EnumOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = l.google.protobuf.EnumDescriptorProto.EnumReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, w.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.value = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.value && e2.value.length) {
          n2.value = [];
          for (var o2 = 0; o2 < e2.value.length; ++o2) n2.value[o2] = l.google.protobuf.EnumValueDescriptorProto.toObject(e2.value[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.EnumOptions.toObject(e2.options, t2)), e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = l.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, w.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, w.EnumReservedRange = (X.prototype.start = 0, X.prototype.end = 0, X.create = function(e2) {
        return new X(e2);
      }, X.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, X.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, X.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.EnumDescriptorProto.EnumReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, X.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, X.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !p.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !p.isInteger(e2.end) ? "end: integer expected" : null;
      }, X.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.protobuf.EnumDescriptorProto.EnumReservedRange ? e2 : (t2 = new l.google.protobuf.EnumDescriptorProto.EnumReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, X.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, X.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, X), w), n.EnumValueDescriptorProto = (j.prototype.name = "", j.prototype.number = 0, j.prototype.options = null, j.create = function(e2) {
        return new j(e2);
      }, j.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(16).int32(e2.number), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.EnumValueOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, j.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, j.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.EnumValueDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.number = e2.int32();
              break;
            case 3:
              o2.options = l.google.protobuf.EnumValueOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, j.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, j.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !p.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = l.google.protobuf.EnumValueOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, j.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.EnumValueDescriptorProto) return e2;
        var t2 = new l.google.protobuf.EnumValueDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumValueDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.EnumValueOptions.fromObject(e2.options);
        }
        return t2;
      }, j.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.number = 0, n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.EnumValueOptions.toObject(e2.options, t2)), n2;
      }, j.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, j), n.ServiceDescriptorProto = (D.prototype.name = "", D.prototype.method = p.emptyArray, D.prototype.options = null, D.create = function(e2) {
        return new D(e2);
      }, D.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.method && e2.method.length) for (var n2 = 0; n2 < e2.method.length; ++n2) l.google.protobuf.MethodDescriptorProto.encode(e2.method[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.ServiceOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, D.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, D.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.ServiceDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.method && o2.method.length || (o2.method = []), o2.method.push(l.google.protobuf.MethodDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = l.google.protobuf.ServiceOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, D.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, D.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.method && e2.hasOwnProperty("method")) {
          if (!Array.isArray(e2.method)) return "method: array expected";
          for (var t2 = 0; t2 < e2.method.length; ++t2) if (n2 = l.google.protobuf.MethodDescriptorProto.verify(e2.method[t2])) return "method." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = l.google.protobuf.ServiceOptions.verify(e2.options))) return "options." + n2;
        return null;
      }, D.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.ServiceDescriptorProto) return e2;
        var t2 = new l.google.protobuf.ServiceDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.method) {
          if (!Array.isArray(e2.method)) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: array expected");
          t2.method = [];
          for (var n2 = 0; n2 < e2.method.length; ++n2) {
            if ("object" != typeof e2.method[n2]) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: object expected");
            t2.method[n2] = l.google.protobuf.MethodDescriptorProto.fromObject(e2.method[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.ServiceDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.ServiceOptions.fromObject(e2.options);
        }
        return t2;
      }, D.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.method = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.method && e2.method.length) {
          n2.method = [];
          for (var o2 = 0; o2 < e2.method.length; ++o2) n2.method[o2] = l.google.protobuf.MethodDescriptorProto.toObject(e2.method[o2], t2);
        }
        return null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.ServiceOptions.toObject(e2.options, t2)), n2;
      }, D.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, D), n.MethodDescriptorProto = (x.prototype.name = "", x.prototype.inputType = "", x.prototype.outputType = "", x.prototype.options = null, x.prototype.clientStreaming = false, x.prototype.serverStreaming = false, x.create = function(e2) {
        return new x(e2);
      }, x.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.inputType && Object.hasOwnProperty.call(e2, "inputType") && t2.uint32(18).string(e2.inputType), null != e2.outputType && Object.hasOwnProperty.call(e2, "outputType") && t2.uint32(26).string(e2.outputType), null != e2.options && Object.hasOwnProperty.call(e2, "options") && l.google.protobuf.MethodOptions.encode(e2.options, t2.uint32(34).fork()).ldelim(), null != e2.clientStreaming && Object.hasOwnProperty.call(e2, "clientStreaming") && t2.uint32(40).bool(e2.clientStreaming), null != e2.serverStreaming && Object.hasOwnProperty.call(e2, "serverStreaming") && t2.uint32(48).bool(e2.serverStreaming), t2;
      }, x.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, x.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.MethodDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.inputType = e2.string();
              break;
            case 3:
              o2.outputType = e2.string();
              break;
            case 4:
              o2.options = l.google.protobuf.MethodOptions.decode(e2, e2.uint32());
              break;
            case 5:
              o2.clientStreaming = e2.bool();
              break;
            case 6:
              o2.serverStreaming = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, x.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, x.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !p.isString(e2.name)) return "name: string expected";
        if (null != e2.inputType && e2.hasOwnProperty("inputType") && !p.isString(e2.inputType)) return "inputType: string expected";
        if (null != e2.outputType && e2.hasOwnProperty("outputType") && !p.isString(e2.outputType)) return "outputType: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = l.google.protobuf.MethodOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && "boolean" != typeof e2.clientStreaming ? "clientStreaming: boolean expected" : null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && "boolean" != typeof e2.serverStreaming ? "serverStreaming: boolean expected" : null;
      }, x.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.MethodDescriptorProto) return e2;
        var t2 = new l.google.protobuf.MethodDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.inputType && (t2.inputType = String(e2.inputType)), null != e2.outputType && (t2.outputType = String(e2.outputType)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.MethodDescriptorProto.options: object expected");
          t2.options = l.google.protobuf.MethodOptions.fromObject(e2.options);
        }
        return null != e2.clientStreaming && (t2.clientStreaming = Boolean(e2.clientStreaming)), null != e2.serverStreaming && (t2.serverStreaming = Boolean(e2.serverStreaming)), t2;
      }, x.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.inputType = "", n2.outputType = "", n2.options = null, n2.clientStreaming = false, n2.serverStreaming = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.inputType && e2.hasOwnProperty("inputType") && (n2.inputType = e2.inputType), null != e2.outputType && e2.hasOwnProperty("outputType") && (n2.outputType = e2.outputType), null != e2.options && e2.hasOwnProperty("options") && (n2.options = l.google.protobuf.MethodOptions.toObject(e2.options, t2)), null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && (n2.clientStreaming = e2.clientStreaming), null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && (n2.serverStreaming = e2.serverStreaming), n2;
      }, x.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, x), n.FileOptions = (S.prototype.javaPackage = "", S.prototype.javaOuterClassname = "", S.prototype.javaMultipleFiles = false, S.prototype.javaGenerateEqualsAndHash = false, S.prototype.javaStringCheckUtf8 = false, S.prototype.optimizeFor = 1, S.prototype.goPackage = "", S.prototype.ccGenericServices = false, S.prototype.javaGenericServices = false, S.prototype.pyGenericServices = false, S.prototype.phpGenericServices = false, S.prototype.deprecated = false, S.prototype.ccEnableArenas = true, S.prototype.objcClassPrefix = "", S.prototype.csharpNamespace = "", S.prototype.swiftPrefix = "", S.prototype.phpClassPrefix = "", S.prototype.phpNamespace = "", S.prototype.phpMetadataNamespace = "", S.prototype.rubyPackage = "", S.prototype.uninterpretedOption = p.emptyArray, S.prototype[".google.api.resourceDefinition"] = p.emptyArray, S.create = function(e2) {
        return new S(e2);
      }, S.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.javaPackage && Object.hasOwnProperty.call(e2, "javaPackage") && t2.uint32(10).string(e2.javaPackage), null != e2.javaOuterClassname && Object.hasOwnProperty.call(e2, "javaOuterClassname") && t2.uint32(66).string(e2.javaOuterClassname), null != e2.optimizeFor && Object.hasOwnProperty.call(e2, "optimizeFor") && t2.uint32(72).int32(e2.optimizeFor), null != e2.javaMultipleFiles && Object.hasOwnProperty.call(e2, "javaMultipleFiles") && t2.uint32(80).bool(e2.javaMultipleFiles), null != e2.goPackage && Object.hasOwnProperty.call(e2, "goPackage") && t2.uint32(90).string(e2.goPackage), null != e2.ccGenericServices && Object.hasOwnProperty.call(e2, "ccGenericServices") && t2.uint32(128).bool(e2.ccGenericServices), null != e2.javaGenericServices && Object.hasOwnProperty.call(e2, "javaGenericServices") && t2.uint32(136).bool(e2.javaGenericServices), null != e2.pyGenericServices && Object.hasOwnProperty.call(e2, "pyGenericServices") && t2.uint32(144).bool(e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && Object.hasOwnProperty.call(e2, "javaGenerateEqualsAndHash") && t2.uint32(160).bool(e2.javaGenerateEqualsAndHash), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(184).bool(e2.deprecated), null != e2.javaStringCheckUtf8 && Object.hasOwnProperty.call(e2, "javaStringCheckUtf8") && t2.uint32(216).bool(e2.javaStringCheckUtf8), null != e2.ccEnableArenas && Object.hasOwnProperty.call(e2, "ccEnableArenas") && t2.uint32(248).bool(e2.ccEnableArenas), null != e2.objcClassPrefix && Object.hasOwnProperty.call(e2, "objcClassPrefix") && t2.uint32(290).string(e2.objcClassPrefix), null != e2.csharpNamespace && Object.hasOwnProperty.call(e2, "csharpNamespace") && t2.uint32(298).string(e2.csharpNamespace), null != e2.swiftPrefix && Object.hasOwnProperty.call(e2, "swiftPrefix") && t2.uint32(314).string(e2.swiftPrefix), null != e2.phpClassPrefix && Object.hasOwnProperty.call(e2, "phpClassPrefix") && t2.uint32(322).string(e2.phpClassPrefix), null != e2.phpNamespace && Object.hasOwnProperty.call(e2, "phpNamespace") && t2.uint32(330).string(e2.phpNamespace), null != e2.phpGenericServices && Object.hasOwnProperty.call(e2, "phpGenericServices") && t2.uint32(336).bool(e2.phpGenericServices), null != e2.phpMetadataNamespace && Object.hasOwnProperty.call(e2, "phpMetadataNamespace") && t2.uint32(354).string(e2.phpMetadataNamespace), null != e2.rubyPackage && Object.hasOwnProperty.call(e2, "rubyPackage") && t2.uint32(362).string(e2.rubyPackage), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        if (null != e2[".google.api.resourceDefinition"] && e2[".google.api.resourceDefinition"].length) for (n2 = 0; n2 < e2[".google.api.resourceDefinition"].length; ++n2) l.google.api.ResourceDescriptor.encode(e2[".google.api.resourceDefinition"][n2], t2.uint32(8426).fork()).ldelim();
        return t2;
      }, S.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, S.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.FileOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.javaPackage = e2.string();
              break;
            case 8:
              o2.javaOuterClassname = e2.string();
              break;
            case 10:
              o2.javaMultipleFiles = e2.bool();
              break;
            case 20:
              o2.javaGenerateEqualsAndHash = e2.bool();
              break;
            case 27:
              o2.javaStringCheckUtf8 = e2.bool();
              break;
            case 9:
              o2.optimizeFor = e2.int32();
              break;
            case 11:
              o2.goPackage = e2.string();
              break;
            case 16:
              o2.ccGenericServices = e2.bool();
              break;
            case 17:
              o2.javaGenericServices = e2.bool();
              break;
            case 18:
              o2.pyGenericServices = e2.bool();
              break;
            case 42:
              o2.phpGenericServices = e2.bool();
              break;
            case 23:
              o2.deprecated = e2.bool();
              break;
            case 31:
              o2.ccEnableArenas = e2.bool();
              break;
            case 36:
              o2.objcClassPrefix = e2.string();
              break;
            case 37:
              o2.csharpNamespace = e2.string();
              break;
            case 39:
              o2.swiftPrefix = e2.string();
              break;
            case 40:
              o2.phpClassPrefix = e2.string();
              break;
            case 41:
              o2.phpNamespace = e2.string();
              break;
            case 44:
              o2.phpMetadataNamespace = e2.string();
              break;
            case 45:
              o2.rubyPackage = e2.string();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1053:
              o2[".google.api.resourceDefinition"] && o2[".google.api.resourceDefinition"].length || (o2[".google.api.resourceDefinition"] = []), o2[".google.api.resourceDefinition"].push(l.google.api.ResourceDescriptor.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, S.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, S.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && !p.isString(e2.javaPackage)) return "javaPackage: string expected";
        if (null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && !p.isString(e2.javaOuterClassname)) return "javaOuterClassname: string expected";
        if (null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && "boolean" != typeof e2.javaMultipleFiles) return "javaMultipleFiles: boolean expected";
        if (null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && "boolean" != typeof e2.javaGenerateEqualsAndHash) return "javaGenerateEqualsAndHash: boolean expected";
        if (null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && "boolean" != typeof e2.javaStringCheckUtf8) return "javaStringCheckUtf8: boolean expected";
        if (null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor")) switch (e2.optimizeFor) {
          default:
            return "optimizeFor: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.goPackage && e2.hasOwnProperty("goPackage") && !p.isString(e2.goPackage)) return "goPackage: string expected";
        if (null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && "boolean" != typeof e2.ccGenericServices) return "ccGenericServices: boolean expected";
        if (null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && "boolean" != typeof e2.javaGenericServices) return "javaGenericServices: boolean expected";
        if (null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && "boolean" != typeof e2.pyGenericServices) return "pyGenericServices: boolean expected";
        if (null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && "boolean" != typeof e2.phpGenericServices) return "phpGenericServices: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && "boolean" != typeof e2.ccEnableArenas) return "ccEnableArenas: boolean expected";
        if (null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && !p.isString(e2.objcClassPrefix)) return "objcClassPrefix: string expected";
        if (null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && !p.isString(e2.csharpNamespace)) return "csharpNamespace: string expected";
        if (null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && !p.isString(e2.swiftPrefix)) return "swiftPrefix: string expected";
        if (null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && !p.isString(e2.phpClassPrefix)) return "phpClassPrefix: string expected";
        if (null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && !p.isString(e2.phpNamespace)) return "phpNamespace: string expected";
        if (null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && !p.isString(e2.phpMetadataNamespace)) return "phpMetadataNamespace: string expected";
        if (null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && !p.isString(e2.rubyPackage)) return "rubyPackage: string expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        if (null != e2[".google.api.resourceDefinition"] && e2.hasOwnProperty(".google.api.resourceDefinition")) {
          if (!Array.isArray(e2[".google.api.resourceDefinition"])) return ".google.api.resourceDefinition: array expected";
          for (var n2, t2 = 0; t2 < e2[".google.api.resourceDefinition"].length; ++t2) if (n2 = l.google.api.ResourceDescriptor.verify(e2[".google.api.resourceDefinition"][t2])) return ".google.api.resourceDefinition." + n2;
        }
        return null;
      }, S.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.FileOptions) return e2;
        var t2 = new l.google.protobuf.FileOptions();
        switch (null != e2.javaPackage && (t2.javaPackage = String(e2.javaPackage)), null != e2.javaOuterClassname && (t2.javaOuterClassname = String(e2.javaOuterClassname)), null != e2.javaMultipleFiles && (t2.javaMultipleFiles = Boolean(e2.javaMultipleFiles)), null != e2.javaGenerateEqualsAndHash && (t2.javaGenerateEqualsAndHash = Boolean(e2.javaGenerateEqualsAndHash)), null != e2.javaStringCheckUtf8 && (t2.javaStringCheckUtf8 = Boolean(e2.javaStringCheckUtf8)), e2.optimizeFor) {
          case "SPEED":
          case 1:
            t2.optimizeFor = 1;
            break;
          case "CODE_SIZE":
          case 2:
            t2.optimizeFor = 2;
            break;
          case "LITE_RUNTIME":
          case 3:
            t2.optimizeFor = 3;
        }
        if (null != e2.goPackage && (t2.goPackage = String(e2.goPackage)), null != e2.ccGenericServices && (t2.ccGenericServices = Boolean(e2.ccGenericServices)), null != e2.javaGenericServices && (t2.javaGenericServices = Boolean(e2.javaGenericServices)), null != e2.pyGenericServices && (t2.pyGenericServices = Boolean(e2.pyGenericServices)), null != e2.phpGenericServices && (t2.phpGenericServices = Boolean(e2.phpGenericServices)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.ccEnableArenas && (t2.ccEnableArenas = Boolean(e2.ccEnableArenas)), null != e2.objcClassPrefix && (t2.objcClassPrefix = String(e2.objcClassPrefix)), null != e2.csharpNamespace && (t2.csharpNamespace = String(e2.csharpNamespace)), null != e2.swiftPrefix && (t2.swiftPrefix = String(e2.swiftPrefix)), null != e2.phpClassPrefix && (t2.phpClassPrefix = String(e2.phpClassPrefix)), null != e2.phpNamespace && (t2.phpNamespace = String(e2.phpNamespace)), null != e2.phpMetadataNamespace && (t2.phpMetadataNamespace = String(e2.phpMetadataNamespace)), null != e2.rubyPackage && (t2.rubyPackage = String(e2.rubyPackage)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (e2[".google.api.resourceDefinition"]) {
          if (!Array.isArray(e2[".google.api.resourceDefinition"])) throw TypeError(".google.protobuf.FileOptions..google.api.resourceDefinition: array expected");
          t2[".google.api.resourceDefinition"] = [];
          for (n2 = 0; n2 < e2[".google.api.resourceDefinition"].length; ++n2) {
            if ("object" != typeof e2[".google.api.resourceDefinition"][n2]) throw TypeError(".google.protobuf.FileOptions..google.api.resourceDefinition: object expected");
            t2[".google.api.resourceDefinition"][n2] = l.google.api.ResourceDescriptor.fromObject(e2[".google.api.resourceDefinition"][n2]);
          }
        }
        return t2;
      }, S.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = [], n2[".google.api.resourceDefinition"] = []), t2.defaults && (n2.javaPackage = "", n2.javaOuterClassname = "", n2.optimizeFor = t2.enums === String ? "SPEED" : 1, n2.javaMultipleFiles = false, n2.goPackage = "", n2.ccGenericServices = false, n2.javaGenericServices = false, n2.pyGenericServices = false, n2.javaGenerateEqualsAndHash = false, n2.deprecated = false, n2.javaStringCheckUtf8 = false, n2.ccEnableArenas = true, n2.objcClassPrefix = "", n2.csharpNamespace = "", n2.swiftPrefix = "", n2.phpClassPrefix = "", n2.phpNamespace = "", n2.phpGenericServices = false, n2.phpMetadataNamespace = "", n2.rubyPackage = ""), null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && (n2.javaPackage = e2.javaPackage), null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && (n2.javaOuterClassname = e2.javaOuterClassname), null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor") && (n2.optimizeFor = t2.enums === String ? l.google.protobuf.FileOptions.OptimizeMode[e2.optimizeFor] : e2.optimizeFor), null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && (n2.javaMultipleFiles = e2.javaMultipleFiles), null != e2.goPackage && e2.hasOwnProperty("goPackage") && (n2.goPackage = e2.goPackage), null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && (n2.ccGenericServices = e2.ccGenericServices), null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && (n2.javaGenericServices = e2.javaGenericServices), null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && (n2.pyGenericServices = e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && (n2.javaGenerateEqualsAndHash = e2.javaGenerateEqualsAndHash), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && (n2.javaStringCheckUtf8 = e2.javaStringCheckUtf8), null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && (n2.ccEnableArenas = e2.ccEnableArenas), null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && (n2.objcClassPrefix = e2.objcClassPrefix), null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && (n2.csharpNamespace = e2.csharpNamespace), null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && (n2.swiftPrefix = e2.swiftPrefix), null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && (n2.phpClassPrefix = e2.phpClassPrefix), null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && (n2.phpNamespace = e2.phpNamespace), null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && (n2.phpGenericServices = e2.phpGenericServices), null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && (n2.phpMetadataNamespace = e2.phpMetadataNamespace), null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && (n2.rubyPackage = e2.rubyPackage), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        if (e2[".google.api.resourceDefinition"] && e2[".google.api.resourceDefinition"].length) {
          n2[".google.api.resourceDefinition"] = [];
          for (o2 = 0; o2 < e2[".google.api.resourceDefinition"].length; ++o2) n2[".google.api.resourceDefinition"][o2] = l.google.api.ResourceDescriptor.toObject(e2[".google.api.resourceDefinition"][o2], t2);
        }
        return n2;
      }, S.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, S.OptimizeMode = (e = {}, (t = Object.create(e))[e[1] = "SPEED"] = 1, t[e[2] = "CODE_SIZE"] = 2, t[e[3] = "LITE_RUNTIME"] = 3, t), S), n.MessageOptions = (k.prototype.messageSetWireFormat = false, k.prototype.noStandardDescriptorAccessor = false, k.prototype.deprecated = false, k.prototype.mapEntry = false, k.prototype.uninterpretedOption = p.emptyArray, k.prototype[".google.api.resource"] = null, k.create = function(e2) {
        return new k(e2);
      }, k.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.messageSetWireFormat && Object.hasOwnProperty.call(e2, "messageSetWireFormat") && t2.uint32(8).bool(e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && Object.hasOwnProperty.call(e2, "noStandardDescriptorAccessor") && t2.uint32(16).bool(e2.noStandardDescriptorAccessor), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.mapEntry && Object.hasOwnProperty.call(e2, "mapEntry") && t2.uint32(56).bool(e2.mapEntry), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return null != e2[".google.api.resource"] && Object.hasOwnProperty.call(e2, ".google.api.resource") && l.google.api.ResourceDescriptor.encode(e2[".google.api.resource"], t2.uint32(8426).fork()).ldelim(), t2;
      }, k.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, k.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.MessageOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.messageSetWireFormat = e2.bool();
              break;
            case 2:
              o2.noStandardDescriptorAccessor = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 7:
              o2.mapEntry = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1053:
              o2[".google.api.resource"] = l.google.api.ResourceDescriptor.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, k.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, k.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && "boolean" != typeof e2.messageSetWireFormat) return "messageSetWireFormat: boolean expected";
        if (null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && "boolean" != typeof e2.noStandardDescriptorAccessor) return "noStandardDescriptorAccessor: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && "boolean" != typeof e2.mapEntry) return "mapEntry: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        var n2;
        if (null != e2[".google.api.resource"] && e2.hasOwnProperty(".google.api.resource") && (n2 = l.google.api.ResourceDescriptor.verify(e2[".google.api.resource"]))) return ".google.api.resource." + n2;
        return null;
      }, k.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.MessageOptions) return e2;
        var t2 = new l.google.protobuf.MessageOptions();
        if (null != e2.messageSetWireFormat && (t2.messageSetWireFormat = Boolean(e2.messageSetWireFormat)), null != e2.noStandardDescriptorAccessor && (t2.noStandardDescriptorAccessor = Boolean(e2.noStandardDescriptorAccessor)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.mapEntry && (t2.mapEntry = Boolean(e2.mapEntry)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (null != e2[".google.api.resource"]) {
          if ("object" != typeof e2[".google.api.resource"]) throw TypeError(".google.protobuf.MessageOptions..google.api.resource: object expected");
          t2[".google.api.resource"] = l.google.api.ResourceDescriptor.fromObject(e2[".google.api.resource"]);
        }
        return t2;
      }, k.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.messageSetWireFormat = false, n2.noStandardDescriptorAccessor = false, n2.deprecated = false, n2.mapEntry = false, n2[".google.api.resource"] = null), null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && (n2.messageSetWireFormat = e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && (n2.noStandardDescriptorAccessor = e2.noStandardDescriptorAccessor), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && (n2.mapEntry = e2.mapEntry), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return null != e2[".google.api.resource"] && e2.hasOwnProperty(".google.api.resource") && (n2[".google.api.resource"] = l.google.api.ResourceDescriptor.toObject(e2[".google.api.resource"], t2)), n2;
      }, k.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, k), n.FieldOptions = (T.prototype.ctype = 0, T.prototype.packed = false, T.prototype.jstype = 0, T.prototype.lazy = false, T.prototype.deprecated = false, T.prototype.weak = false, T.prototype.uninterpretedOption = p.emptyArray, T.prototype[".google.api.fieldBehavior"] = p.emptyArray, T.prototype[".google.api.resourceReference"] = null, T.create = function(e2) {
        return new T(e2);
      }, T.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.ctype && Object.hasOwnProperty.call(e2, "ctype") && t2.uint32(8).int32(e2.ctype), null != e2.packed && Object.hasOwnProperty.call(e2, "packed") && t2.uint32(16).bool(e2.packed), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.lazy && Object.hasOwnProperty.call(e2, "lazy") && t2.uint32(40).bool(e2.lazy), null != e2.jstype && Object.hasOwnProperty.call(e2, "jstype") && t2.uint32(48).int32(e2.jstype), null != e2.weak && Object.hasOwnProperty.call(e2, "weak") && t2.uint32(80).bool(e2.weak), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        if (null != e2[".google.api.fieldBehavior"] && e2[".google.api.fieldBehavior"].length) {
          t2.uint32(8418).fork();
          for (n2 = 0; n2 < e2[".google.api.fieldBehavior"].length; ++n2) t2.int32(e2[".google.api.fieldBehavior"][n2]);
          t2.ldelim();
        }
        return null != e2[".google.api.resourceReference"] && Object.hasOwnProperty.call(e2, ".google.api.resourceReference") && l.google.api.ResourceReference.encode(e2[".google.api.resourceReference"], t2.uint32(8442).fork()).ldelim(), t2;
      }, T.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, T.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.FieldOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.ctype = e2.int32();
              break;
            case 2:
              o2.packed = e2.bool();
              break;
            case 6:
              o2.jstype = e2.int32();
              break;
            case 5:
              o2.lazy = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 10:
              o2.weak = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1052:
              if (o2[".google.api.fieldBehavior"] && o2[".google.api.fieldBehavior"].length || (o2[".google.api.fieldBehavior"] = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2[".google.api.fieldBehavior"].push(e2.int32());
              else o2[".google.api.fieldBehavior"].push(e2.int32());
              break;
            case 1055:
              o2[".google.api.resourceReference"] = l.google.api.ResourceReference.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, T.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, T.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.ctype && e2.hasOwnProperty("ctype")) switch (e2.ctype) {
          default:
            return "ctype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.packed && e2.hasOwnProperty("packed") && "boolean" != typeof e2.packed) return "packed: boolean expected";
        if (null != e2.jstype && e2.hasOwnProperty("jstype")) switch (e2.jstype) {
          default:
            return "jstype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.lazy && e2.hasOwnProperty("lazy") && "boolean" != typeof e2.lazy) return "lazy: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.weak && e2.hasOwnProperty("weak") && "boolean" != typeof e2.weak) return "weak: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        if (null != e2[".google.api.fieldBehavior"] && e2.hasOwnProperty(".google.api.fieldBehavior")) {
          if (!Array.isArray(e2[".google.api.fieldBehavior"])) return ".google.api.fieldBehavior: array expected";
          for (t2 = 0; t2 < e2[".google.api.fieldBehavior"].length; ++t2) switch (e2[".google.api.fieldBehavior"][t2]) {
            default:
              return ".google.api.fieldBehavior: enum value[] expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
          }
        }
        var n2;
        if (null != e2[".google.api.resourceReference"] && e2.hasOwnProperty(".google.api.resourceReference") && (n2 = l.google.api.ResourceReference.verify(e2[".google.api.resourceReference"]))) return ".google.api.resourceReference." + n2;
        return null;
      }, T.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.FieldOptions) return e2;
        var t2 = new l.google.protobuf.FieldOptions();
        switch (e2.ctype) {
          case "STRING":
          case 0:
            t2.ctype = 0;
            break;
          case "CORD":
          case 1:
            t2.ctype = 1;
            break;
          case "STRING_PIECE":
          case 2:
            t2.ctype = 2;
        }
        switch (null != e2.packed && (t2.packed = Boolean(e2.packed)), e2.jstype) {
          case "JS_NORMAL":
          case 0:
            t2.jstype = 0;
            break;
          case "JS_STRING":
          case 1:
            t2.jstype = 1;
            break;
          case "JS_NUMBER":
          case 2:
            t2.jstype = 2;
        }
        if (null != e2.lazy && (t2.lazy = Boolean(e2.lazy)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.weak && (t2.weak = Boolean(e2.weak)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (e2[".google.api.fieldBehavior"]) {
          if (!Array.isArray(e2[".google.api.fieldBehavior"])) throw TypeError(".google.protobuf.FieldOptions..google.api.fieldBehavior: array expected");
          t2[".google.api.fieldBehavior"] = [];
          for (n2 = 0; n2 < e2[".google.api.fieldBehavior"].length; ++n2) switch (e2[".google.api.fieldBehavior"][n2]) {
            default:
            case "FIELD_BEHAVIOR_UNSPECIFIED":
            case 0:
              t2[".google.api.fieldBehavior"][n2] = 0;
              break;
            case "OPTIONAL":
            case 1:
              t2[".google.api.fieldBehavior"][n2] = 1;
              break;
            case "REQUIRED":
            case 2:
              t2[".google.api.fieldBehavior"][n2] = 2;
              break;
            case "OUTPUT_ONLY":
            case 3:
              t2[".google.api.fieldBehavior"][n2] = 3;
              break;
            case "INPUT_ONLY":
            case 4:
              t2[".google.api.fieldBehavior"][n2] = 4;
              break;
            case "IMMUTABLE":
            case 5:
              t2[".google.api.fieldBehavior"][n2] = 5;
          }
        }
        if (null != e2[".google.api.resourceReference"]) {
          if ("object" != typeof e2[".google.api.resourceReference"]) throw TypeError(".google.protobuf.FieldOptions..google.api.resourceReference: object expected");
          t2[".google.api.resourceReference"] = l.google.api.ResourceReference.fromObject(e2[".google.api.resourceReference"]);
        }
        return t2;
      }, T.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = [], n2[".google.api.fieldBehavior"] = []), t2.defaults && (n2.ctype = t2.enums === String ? "STRING" : 0, n2.packed = false, n2.deprecated = false, n2.lazy = false, n2.jstype = t2.enums === String ? "JS_NORMAL" : 0, n2.weak = false, n2[".google.api.resourceReference"] = null), null != e2.ctype && e2.hasOwnProperty("ctype") && (n2.ctype = t2.enums === String ? l.google.protobuf.FieldOptions.CType[e2.ctype] : e2.ctype), null != e2.packed && e2.hasOwnProperty("packed") && (n2.packed = e2.packed), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.lazy && e2.hasOwnProperty("lazy") && (n2.lazy = e2.lazy), null != e2.jstype && e2.hasOwnProperty("jstype") && (n2.jstype = t2.enums === String ? l.google.protobuf.FieldOptions.JSType[e2.jstype] : e2.jstype), null != e2.weak && e2.hasOwnProperty("weak") && (n2.weak = e2.weak), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        if (e2[".google.api.fieldBehavior"] && e2[".google.api.fieldBehavior"].length) {
          n2[".google.api.fieldBehavior"] = [];
          for (o2 = 0; o2 < e2[".google.api.fieldBehavior"].length; ++o2) n2[".google.api.fieldBehavior"][o2] = t2.enums === String ? l.google.api.FieldBehavior[e2[".google.api.fieldBehavior"][o2]] : e2[".google.api.fieldBehavior"][o2];
        }
        return null != e2[".google.api.resourceReference"] && e2.hasOwnProperty(".google.api.resourceReference") && (n2[".google.api.resourceReference"] = l.google.api.ResourceReference.toObject(e2[".google.api.resourceReference"], t2)), n2;
      }, T.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, T.CType = (e = {}, (t = Object.create(e))[e[0] = "STRING"] = 0, t[e[1] = "CORD"] = 1, t[e[2] = "STRING_PIECE"] = 2, t), T.JSType = (e = {}, (t = Object.create(e))[e[0] = "JS_NORMAL"] = 0, t[e[1] = "JS_STRING"] = 1, t[e[2] = "JS_NUMBER"] = 2, t), T), n.OneofOptions = (Q.prototype.uninterpretedOption = p.emptyArray, Q.create = function(e2) {
        return new Q(e2);
      }, Q.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, Q.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, Q.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.OneofOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, Q.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, Q.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, Q.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.OneofOptions) return e2;
        var t2 = new l.google.protobuf.OneofOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, Q.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, Q.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, Q), n.EnumOptions = (E.prototype.allowAlias = false, E.prototype.deprecated = false, E.prototype.uninterpretedOption = p.emptyArray, E.create = function(e2) {
        return new E(e2);
      }, E.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.allowAlias && Object.hasOwnProperty.call(e2, "allowAlias") && t2.uint32(16).bool(e2.allowAlias), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, E.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, E.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.EnumOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.allowAlias = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, E.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, E.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && "boolean" != typeof e2.allowAlias) return "allowAlias: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, E.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.EnumOptions) return e2;
        var t2 = new l.google.protobuf.EnumOptions();
        if (null != e2.allowAlias && (t2.allowAlias = Boolean(e2.allowAlias)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, E.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.allowAlias = false, n2.deprecated = false), null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && (n2.allowAlias = e2.allowAlias), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, E.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, E), n.EnumValueOptions = (K.prototype.deprecated = false, K.prototype.uninterpretedOption = p.emptyArray, K.create = function(e2) {
        return new K(e2);
      }, K.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(8).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, K.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, K.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.EnumValueOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, K.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, K.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, K.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.EnumValueOptions) return e2;
        var t2 = new l.google.protobuf.EnumValueOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, K.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, K.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, K), n.ServiceOptions = (A.prototype.deprecated = false, A.prototype.uninterpretedOption = p.emptyArray, A.prototype[".google.api.defaultHost"] = "", A.prototype[".google.api.oauthScopes"] = "", A.create = function(e2) {
        return new A(e2);
      }, A.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return null != e2[".google.api.defaultHost"] && Object.hasOwnProperty.call(e2, ".google.api.defaultHost") && t2.uint32(8394).string(e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && Object.hasOwnProperty.call(e2, ".google.api.oauthScopes") && t2.uint32(8402).string(e2[".google.api.oauthScopes"]), t2;
      }, A.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, A.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.ServiceOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1049:
              o2[".google.api.defaultHost"] = e2.string();
              break;
            case 1050:
              o2[".google.api.oauthScopes"] = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, A.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, A.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && !p.isString(e2[".google.api.defaultHost"]) ? ".google.api.defaultHost: string expected" : null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && !p.isString(e2[".google.api.oauthScopes"]) ? ".google.api.oauthScopes: string expected" : null;
      }, A.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.ServiceOptions) return e2;
        var t2 = new l.google.protobuf.ServiceOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return null != e2[".google.api.defaultHost"] && (t2[".google.api.defaultHost"] = String(e2[".google.api.defaultHost"])), null != e2[".google.api.oauthScopes"] && (t2[".google.api.oauthScopes"] = String(e2[".google.api.oauthScopes"])), t2;
      }, A.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false, n2[".google.api.defaultHost"] = "", n2[".google.api.oauthScopes"] = ""), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && (n2[".google.api.defaultHost"] = e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && (n2[".google.api.oauthScopes"] = e2[".google.api.oauthScopes"]), n2;
      }, A.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, A), n.MethodOptions = (N.prototype.deprecated = false, N.prototype.idempotencyLevel = 0, N.prototype.uninterpretedOption = p.emptyArray, N.prototype[".google.api.http"] = null, N.prototype[".google.api.methodSignature"] = p.emptyArray, N.create = function(e2) {
        return new N(e2);
      }, N.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.idempotencyLevel && Object.hasOwnProperty.call(e2, "idempotencyLevel") && t2.uint32(272).int32(e2.idempotencyLevel), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) l.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        if (null != e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2.uint32(8410).string(e2[".google.api.methodSignature"][n2]);
        return null != e2[".google.api.http"] && Object.hasOwnProperty.call(e2, ".google.api.http") && l.google.api.HttpRule.encode(e2[".google.api.http"], t2.uint32(578365826).fork()).ldelim(), t2;
      }, N.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, N.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.MethodOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 34:
              o2.idempotencyLevel = e2.int32();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(l.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 72295728:
              o2[".google.api.http"] = l.google.api.HttpRule.decode(e2, e2.uint32());
              break;
            case 1051:
              o2[".google.api.methodSignature"] && o2[".google.api.methodSignature"].length || (o2[".google.api.methodSignature"] = []), o2[".google.api.methodSignature"].push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, N.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, N.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel")) switch (e2.idempotencyLevel) {
          default:
            return "idempotencyLevel: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = l.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        var n2;
        if (null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2 = l.google.api.HttpRule.verify(e2[".google.api.http"]))) return ".google.api.http." + n2;
        if (null != e2[".google.api.methodSignature"] && e2.hasOwnProperty(".google.api.methodSignature")) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) return ".google.api.methodSignature: array expected";
          for (t2 = 0; t2 < e2[".google.api.methodSignature"].length; ++t2) if (!p.isString(e2[".google.api.methodSignature"][t2])) return ".google.api.methodSignature: string[] expected";
        }
        return null;
      }, N.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.MethodOptions) return e2;
        var t2 = new l.google.protobuf.MethodOptions();
        switch (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.idempotencyLevel) {
          case "IDEMPOTENCY_UNKNOWN":
          case 0:
            t2.idempotencyLevel = 0;
            break;
          case "NO_SIDE_EFFECTS":
          case 1:
            t2.idempotencyLevel = 1;
            break;
          case "IDEMPOTENT":
          case 2:
            t2.idempotencyLevel = 2;
        }
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = l.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (null != e2[".google.api.http"]) {
          if ("object" != typeof e2[".google.api.http"]) throw TypeError(".google.protobuf.MethodOptions..google.api.http: object expected");
          t2[".google.api.http"] = l.google.api.HttpRule.fromObject(e2[".google.api.http"]);
        }
        if (e2[".google.api.methodSignature"]) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) throw TypeError(".google.protobuf.MethodOptions..google.api.methodSignature: array expected");
          t2[".google.api.methodSignature"] = [];
          for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2[".google.api.methodSignature"][n2] = String(e2[".google.api.methodSignature"][n2]);
        }
        return t2;
      }, N.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = [], n2[".google.api.methodSignature"] = []), t2.defaults && (n2.deprecated = false, n2.idempotencyLevel = t2.enums === String ? "IDEMPOTENCY_UNKNOWN" : 0, n2[".google.api.http"] = null), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel") && (n2.idempotencyLevel = t2.enums === String ? l.google.protobuf.MethodOptions.IdempotencyLevel[e2.idempotencyLevel] : e2.idempotencyLevel), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = l.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        if (e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) {
          n2[".google.api.methodSignature"] = [];
          for (o2 = 0; o2 < e2[".google.api.methodSignature"].length; ++o2) n2[".google.api.methodSignature"][o2] = e2[".google.api.methodSignature"][o2];
        }
        return null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2[".google.api.http"] = l.google.api.HttpRule.toObject(e2[".google.api.http"], t2)), n2;
      }, N.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, N.IdempotencyLevel = (e = {}, (t = Object.create(e))[e[0] = "IDEMPOTENCY_UNKNOWN"] = 0, t[e[1] = "NO_SIDE_EFFECTS"] = 1, t[e[2] = "IDEMPOTENT"] = 2, t), N), n.UninterpretedOption = (R.prototype.name = p.emptyArray, R.prototype.identifierValue = "", R.prototype.positiveIntValue = p.Long ? p.Long.fromBits(0, 0, true) : 0, R.prototype.negativeIntValue = p.Long ? p.Long.fromBits(0, 0, false) : 0, R.prototype.doubleValue = 0, R.prototype.stringValue = p.newBuffer([]), R.prototype.aggregateValue = "", R.create = function(e2) {
        return new R(e2);
      }, R.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.name && e2.name.length) for (var n2 = 0; n2 < e2.name.length; ++n2) l.google.protobuf.UninterpretedOption.NamePart.encode(e2.name[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.identifierValue && Object.hasOwnProperty.call(e2, "identifierValue") && t2.uint32(26).string(e2.identifierValue), null != e2.positiveIntValue && Object.hasOwnProperty.call(e2, "positiveIntValue") && t2.uint32(32).uint64(e2.positiveIntValue), null != e2.negativeIntValue && Object.hasOwnProperty.call(e2, "negativeIntValue") && t2.uint32(40).int64(e2.negativeIntValue), null != e2.doubleValue && Object.hasOwnProperty.call(e2, "doubleValue") && t2.uint32(49).double(e2.doubleValue), null != e2.stringValue && Object.hasOwnProperty.call(e2, "stringValue") && t2.uint32(58).bytes(e2.stringValue), null != e2.aggregateValue && Object.hasOwnProperty.call(e2, "aggregateValue") && t2.uint32(66).string(e2.aggregateValue), t2;
      }, R.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, R.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.UninterpretedOption(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.name && o2.name.length || (o2.name = []), o2.name.push(l.google.protobuf.UninterpretedOption.NamePart.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.identifierValue = e2.string();
              break;
            case 4:
              o2.positiveIntValue = e2.uint64();
              break;
            case 5:
              o2.negativeIntValue = e2.int64();
              break;
            case 6:
              o2.doubleValue = e2.double();
              break;
            case 7:
              o2.stringValue = e2.bytes();
              break;
            case 8:
              o2.aggregateValue = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, R.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, R.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name")) {
          if (!Array.isArray(e2.name)) return "name: array expected";
          for (var t2 = 0; t2 < e2.name.length; ++t2) {
            var n2 = l.google.protobuf.UninterpretedOption.NamePart.verify(e2.name[t2]);
            if (n2) return "name." + n2;
          }
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && !p.isString(e2.identifierValue) ? "identifierValue: string expected" : null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && !(p.isInteger(e2.positiveIntValue) || e2.positiveIntValue && p.isInteger(e2.positiveIntValue.low) && p.isInteger(e2.positiveIntValue.high)) ? "positiveIntValue: integer|Long expected" : null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && !(p.isInteger(e2.negativeIntValue) || e2.negativeIntValue && p.isInteger(e2.negativeIntValue.low) && p.isInteger(e2.negativeIntValue.high)) ? "negativeIntValue: integer|Long expected" : null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && "number" != typeof e2.doubleValue ? "doubleValue: number expected" : null != e2.stringValue && e2.hasOwnProperty("stringValue") && !(e2.stringValue && "number" == typeof e2.stringValue.length || p.isString(e2.stringValue)) ? "stringValue: buffer expected" : null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && !p.isString(e2.aggregateValue) ? "aggregateValue: string expected" : null;
      }, R.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.UninterpretedOption) return e2;
        var t2 = new l.google.protobuf.UninterpretedOption();
        if (e2.name) {
          if (!Array.isArray(e2.name)) throw TypeError(".google.protobuf.UninterpretedOption.name: array expected");
          t2.name = [];
          for (var n2 = 0; n2 < e2.name.length; ++n2) {
            if ("object" != typeof e2.name[n2]) throw TypeError(".google.protobuf.UninterpretedOption.name: object expected");
            t2.name[n2] = l.google.protobuf.UninterpretedOption.NamePart.fromObject(e2.name[n2]);
          }
        }
        return null != e2.identifierValue && (t2.identifierValue = String(e2.identifierValue)), null != e2.positiveIntValue && (p.Long ? (t2.positiveIntValue = p.Long.fromValue(e2.positiveIntValue)).unsigned = true : "string" == typeof e2.positiveIntValue ? t2.positiveIntValue = parseInt(e2.positiveIntValue, 10) : "number" == typeof e2.positiveIntValue ? t2.positiveIntValue = e2.positiveIntValue : "object" == typeof e2.positiveIntValue && (t2.positiveIntValue = new p.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true))), null != e2.negativeIntValue && (p.Long ? (t2.negativeIntValue = p.Long.fromValue(e2.negativeIntValue)).unsigned = false : "string" == typeof e2.negativeIntValue ? t2.negativeIntValue = parseInt(e2.negativeIntValue, 10) : "number" == typeof e2.negativeIntValue ? t2.negativeIntValue = e2.negativeIntValue : "object" == typeof e2.negativeIntValue && (t2.negativeIntValue = new p.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber())), null != e2.doubleValue && (t2.doubleValue = Number(e2.doubleValue)), null != e2.stringValue && ("string" == typeof e2.stringValue ? p.base64.decode(e2.stringValue, t2.stringValue = p.newBuffer(p.base64.length(e2.stringValue)), 0) : e2.stringValue.length && (t2.stringValue = e2.stringValue)), null != e2.aggregateValue && (t2.aggregateValue = String(e2.aggregateValue)), t2;
      }, R.toObject = function(e2, t2) {
        var n2, o2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (o2.name = []), t2.defaults && (o2.identifierValue = "", p.Long ? (n2 = new p.Long(0, 0, true), o2.positiveIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.positiveIntValue = t2.longs === String ? "0" : 0, p.Long ? (n2 = new p.Long(0, 0, false), o2.negativeIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.negativeIntValue = t2.longs === String ? "0" : 0, o2.doubleValue = 0, t2.bytes === String ? o2.stringValue = "" : (o2.stringValue = [], t2.bytes !== Array && (o2.stringValue = p.newBuffer(o2.stringValue))), o2.aggregateValue = ""), e2.name && e2.name.length) {
          o2.name = [];
          for (var r2 = 0; r2 < e2.name.length; ++r2) o2.name[r2] = l.google.protobuf.UninterpretedOption.NamePart.toObject(e2.name[r2], t2);
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && (o2.identifierValue = e2.identifierValue), null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && ("number" == typeof e2.positiveIntValue ? o2.positiveIntValue = t2.longs === String ? String(e2.positiveIntValue) : e2.positiveIntValue : o2.positiveIntValue = t2.longs === String ? p.Long.prototype.toString.call(e2.positiveIntValue) : t2.longs === Number ? new p.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true) : e2.positiveIntValue), null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && ("number" == typeof e2.negativeIntValue ? o2.negativeIntValue = t2.longs === String ? String(e2.negativeIntValue) : e2.negativeIntValue : o2.negativeIntValue = t2.longs === String ? p.Long.prototype.toString.call(e2.negativeIntValue) : t2.longs === Number ? new p.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber() : e2.negativeIntValue), null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && (o2.doubleValue = t2.json && !isFinite(e2.doubleValue) ? String(e2.doubleValue) : e2.doubleValue), null != e2.stringValue && e2.hasOwnProperty("stringValue") && (o2.stringValue = t2.bytes === String ? p.base64.encode(e2.stringValue, 0, e2.stringValue.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.stringValue) : e2.stringValue), null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && (o2.aggregateValue = e2.aggregateValue), o2;
      }, R.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, R.NamePart = (Z.prototype.namePart = "", Z.prototype.isExtension = false, Z.create = function(e2) {
        return new Z(e2);
      }, Z.encode = function(e2, t2) {
        return (t2 = t2 || i.create()).uint32(10).string(e2.namePart), t2.uint32(16).bool(e2.isExtension), t2;
      }, Z.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, Z.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.UninterpretedOption.NamePart(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.namePart = e2.string();
              break;
            case 2:
              o2.isExtension = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        if (!o2.hasOwnProperty("namePart")) throw p.ProtocolError("missing required 'namePart'", { instance: o2 });
        if (o2.hasOwnProperty("isExtension")) return o2;
        throw p.ProtocolError("missing required 'isExtension'", { instance: o2 });
      }, Z.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, Z.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : p.isString(e2.namePart) ? "boolean" != typeof e2.isExtension ? "isExtension: boolean expected" : null : "namePart: string expected";
      }, Z.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.protobuf.UninterpretedOption.NamePart ? e2 : (t2 = new l.google.protobuf.UninterpretedOption.NamePart(), null != e2.namePart && (t2.namePart = String(e2.namePart)), null != e2.isExtension && (t2.isExtension = Boolean(e2.isExtension)), t2);
      }, Z.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.namePart = "", n2.isExtension = false), null != e2.namePart && e2.hasOwnProperty("namePart") && (n2.namePart = e2.namePart), null != e2.isExtension && e2.hasOwnProperty("isExtension") && (n2.isExtension = e2.isExtension), n2;
      }, Z.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, Z), R), n.SourceCodeInfo = ($.prototype.location = p.emptyArray, $.create = function(e2) {
        return new $(e2);
      }, $.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.location && e2.location.length) for (var n2 = 0; n2 < e2.location.length; ++n2) l.google.protobuf.SourceCodeInfo.Location.encode(e2.location[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, $.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, $.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.SourceCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.location && o2.location.length || (o2.location = []), o2.location.push(l.google.protobuf.SourceCodeInfo.Location.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, $.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, $.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.location && e2.hasOwnProperty("location")) {
          if (!Array.isArray(e2.location)) return "location: array expected";
          for (var t2 = 0; t2 < e2.location.length; ++t2) {
            var n2 = l.google.protobuf.SourceCodeInfo.Location.verify(e2.location[t2]);
            if (n2) return "location." + n2;
          }
        }
        return null;
      }, $.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.SourceCodeInfo) return e2;
        var t2 = new l.google.protobuf.SourceCodeInfo();
        if (e2.location) {
          if (!Array.isArray(e2.location)) throw TypeError(".google.protobuf.SourceCodeInfo.location: array expected");
          t2.location = [];
          for (var n2 = 0; n2 < e2.location.length; ++n2) {
            if ("object" != typeof e2.location[n2]) throw TypeError(".google.protobuf.SourceCodeInfo.location: object expected");
            t2.location[n2] = l.google.protobuf.SourceCodeInfo.Location.fromObject(e2.location[n2]);
          }
        }
        return t2;
      }, $.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.location = []), e2.location && e2.location.length) {
          n2.location = [];
          for (var o2 = 0; o2 < e2.location.length; ++o2) n2.location[o2] = l.google.protobuf.SourceCodeInfo.Location.toObject(e2.location[o2], t2);
        }
        return n2;
      }, $.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, $.Location = (I.prototype.path = p.emptyArray, I.prototype.span = p.emptyArray, I.prototype.leadingComments = "", I.prototype.trailingComments = "", I.prototype.leadingDetachedComments = p.emptyArray, I.create = function(e2) {
        return new I(e2);
      }, I.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        if (null != e2.span && e2.span.length) {
          t2.uint32(18).fork();
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.int32(e2.span[n2]);
          t2.ldelim();
        }
        if (null != e2.leadingComments && Object.hasOwnProperty.call(e2, "leadingComments") && t2.uint32(26).string(e2.leadingComments), null != e2.trailingComments && Object.hasOwnProperty.call(e2, "trailingComments") && t2.uint32(34).string(e2.trailingComments), null != e2.leadingDetachedComments && e2.leadingDetachedComments.length) for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.uint32(50).string(e2.leadingDetachedComments[n2]);
        return t2;
      }, I.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, I.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.SourceCodeInfo.Location(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              if (o2.span && o2.span.length || (o2.span = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.span.push(e2.int32());
              else o2.span.push(e2.int32());
              break;
            case 3:
              o2.leadingComments = e2.string();
              break;
            case 4:
              o2.trailingComments = e2.string();
              break;
            case 6:
              o2.leadingDetachedComments && o2.leadingDetachedComments.length || (o2.leadingDetachedComments = []), o2.leadingDetachedComments.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, I.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, I.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!p.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        if (null != e2.span && e2.hasOwnProperty("span")) {
          if (!Array.isArray(e2.span)) return "span: array expected";
          for (t2 = 0; t2 < e2.span.length; ++t2) if (!p.isInteger(e2.span[t2])) return "span: integer[] expected";
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && !p.isString(e2.leadingComments)) return "leadingComments: string expected";
        if (null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && !p.isString(e2.trailingComments)) return "trailingComments: string expected";
        if (null != e2.leadingDetachedComments && e2.hasOwnProperty("leadingDetachedComments")) {
          if (!Array.isArray(e2.leadingDetachedComments)) return "leadingDetachedComments: array expected";
          for (t2 = 0; t2 < e2.leadingDetachedComments.length; ++t2) if (!p.isString(e2.leadingDetachedComments[t2])) return "leadingDetachedComments: string[] expected";
        }
        return null;
      }, I.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.SourceCodeInfo.Location) return e2;
        var t2 = new l.google.protobuf.SourceCodeInfo.Location();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        if (e2.span) {
          if (!Array.isArray(e2.span)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.span: array expected");
          t2.span = [];
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.span[n2] = 0 | e2.span[n2];
        }
        if (null != e2.leadingComments && (t2.leadingComments = String(e2.leadingComments)), null != e2.trailingComments && (t2.trailingComments = String(e2.trailingComments)), e2.leadingDetachedComments) {
          if (!Array.isArray(e2.leadingDetachedComments)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected");
          t2.leadingDetachedComments = [];
          for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.leadingDetachedComments[n2] = String(e2.leadingDetachedComments[n2]);
        }
        return t2;
      }, I.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = [], n2.span = [], n2.leadingDetachedComments = []), t2.defaults && (n2.leadingComments = "", n2.trailingComments = ""), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        if (e2.span && e2.span.length) {
          n2.span = [];
          for (o2 = 0; o2 < e2.span.length; ++o2) n2.span[o2] = e2.span[o2];
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && (n2.leadingComments = e2.leadingComments), null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && (n2.trailingComments = e2.trailingComments), e2.leadingDetachedComments && e2.leadingDetachedComments.length) {
          n2.leadingDetachedComments = [];
          for (o2 = 0; o2 < e2.leadingDetachedComments.length; ++o2) n2.leadingDetachedComments[o2] = e2.leadingDetachedComments[o2];
        }
        return n2;
      }, I.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, I), $), n.GeneratedCodeInfo = (ee.prototype.annotation = p.emptyArray, ee.create = function(e2) {
        return new ee(e2);
      }, ee.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.annotation && e2.annotation.length) for (var n2 = 0; n2 < e2.annotation.length; ++n2) l.google.protobuf.GeneratedCodeInfo.Annotation.encode(e2.annotation[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, ee.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, ee.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.GeneratedCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.annotation && o2.annotation.length || (o2.annotation = []), o2.annotation.push(l.google.protobuf.GeneratedCodeInfo.Annotation.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, ee.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, ee.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.annotation && e2.hasOwnProperty("annotation")) {
          if (!Array.isArray(e2.annotation)) return "annotation: array expected";
          for (var t2 = 0; t2 < e2.annotation.length; ++t2) {
            var n2 = l.google.protobuf.GeneratedCodeInfo.Annotation.verify(e2.annotation[t2]);
            if (n2) return "annotation." + n2;
          }
        }
        return null;
      }, ee.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.GeneratedCodeInfo) return e2;
        var t2 = new l.google.protobuf.GeneratedCodeInfo();
        if (e2.annotation) {
          if (!Array.isArray(e2.annotation)) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: array expected");
          t2.annotation = [];
          for (var n2 = 0; n2 < e2.annotation.length; ++n2) {
            if ("object" != typeof e2.annotation[n2]) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: object expected");
            t2.annotation[n2] = l.google.protobuf.GeneratedCodeInfo.Annotation.fromObject(e2.annotation[n2]);
          }
        }
        return t2;
      }, ee.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.annotation = []), e2.annotation && e2.annotation.length) {
          n2.annotation = [];
          for (var o2 = 0; o2 < e2.annotation.length; ++o2) n2.annotation[o2] = l.google.protobuf.GeneratedCodeInfo.Annotation.toObject(e2.annotation[o2], t2);
        }
        return n2;
      }, ee.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, ee.Annotation = (C.prototype.path = p.emptyArray, C.prototype.sourceFile = "", C.prototype.begin = 0, C.prototype.end = 0, C.create = function(e2) {
        return new C(e2);
      }, C.encode = function(e2, t2) {
        if (t2 = t2 || i.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        return null != e2.sourceFile && Object.hasOwnProperty.call(e2, "sourceFile") && t2.uint32(18).string(e2.sourceFile), null != e2.begin && Object.hasOwnProperty.call(e2, "begin") && t2.uint32(24).int32(e2.begin), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(32).int32(e2.end), t2;
      }, C.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, C.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.protobuf.GeneratedCodeInfo.Annotation(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              o2.sourceFile = e2.string();
              break;
            case 3:
              o2.begin = e2.int32();
              break;
            case 4:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, C.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, C.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!p.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && !p.isString(e2.sourceFile) ? "sourceFile: string expected" : null != e2.begin && e2.hasOwnProperty("begin") && !p.isInteger(e2.begin) ? "begin: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !p.isInteger(e2.end) ? "end: integer expected" : null;
      }, C.fromObject = function(e2) {
        if (e2 instanceof l.google.protobuf.GeneratedCodeInfo.Annotation) return e2;
        var t2 = new l.google.protobuf.GeneratedCodeInfo.Annotation();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.GeneratedCodeInfo.Annotation.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        return null != e2.sourceFile && (t2.sourceFile = String(e2.sourceFile)), null != e2.begin && (t2.begin = 0 | e2.begin), null != e2.end && (t2.end = 0 | e2.end), t2;
      }, C.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = []), t2.defaults && (n2.sourceFile = "", n2.begin = 0, n2.end = 0), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && (n2.sourceFile = e2.sourceFile), null != e2.begin && e2.hasOwnProperty("begin") && (n2.begin = e2.begin), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, C.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, C), ee), n), F.type = ((r = {}).Expr = (V.prototype.expression = "", V.prototype.title = "", V.prototype.description = "", V.prototype.location = "", V.create = function(e2) {
        return new V(e2);
      }, V.encode = function(e2, t2) {
        return t2 = t2 || i.create(), null != e2.expression && Object.hasOwnProperty.call(e2, "expression") && t2.uint32(10).string(e2.expression), null != e2.title && Object.hasOwnProperty.call(e2, "title") && t2.uint32(18).string(e2.title), null != e2.description && Object.hasOwnProperty.call(e2, "description") && t2.uint32(26).string(e2.description), null != e2.location && Object.hasOwnProperty.call(e2, "location") && t2.uint32(34).string(e2.location), t2;
      }, V.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, V.decode = function(e2, t2) {
        e2 instanceof a || (e2 = a.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new l.google.type.Expr(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.expression = e2.string();
              break;
            case 2:
              o2.title = e2.string();
              break;
            case 3:
              o2.description = e2.string();
              break;
            case 4:
              o2.location = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, V.decodeDelimited = function(e2) {
        return e2 instanceof a || (e2 = new a(e2)), this.decode(e2, e2.uint32());
      }, V.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.expression && e2.hasOwnProperty("expression") && !p.isString(e2.expression) ? "expression: string expected" : null != e2.title && e2.hasOwnProperty("title") && !p.isString(e2.title) ? "title: string expected" : null != e2.description && e2.hasOwnProperty("description") && !p.isString(e2.description) ? "description: string expected" : null != e2.location && e2.hasOwnProperty("location") && !p.isString(e2.location) ? "location: string expected" : null;
      }, V.fromObject = function(e2) {
        var t2;
        return e2 instanceof l.google.type.Expr ? e2 : (t2 = new l.google.type.Expr(), null != e2.expression && (t2.expression = String(e2.expression)), null != e2.title && (t2.title = String(e2.title)), null != e2.description && (t2.description = String(e2.description)), null != e2.location && (t2.location = String(e2.location)), t2);
      }, V.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.expression = "", n2.title = "", n2.description = "", n2.location = ""), null != e2.expression && e2.hasOwnProperty("expression") && (n2.expression = e2.expression), null != e2.title && e2.hasOwnProperty("title") && (n2.title = e2.title), null != e2.description && e2.hasOwnProperty("description") && (n2.description = e2.description), null != e2.location && e2.hasOwnProperty("location") && (n2.location = e2.location), n2;
      }, V.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, V), r), F), l;
    });
  })(iam_service);
  return iam_service.exports;
}
var locations = { exports: {} };
var hasRequiredLocations;
function requireLocations() {
  if (hasRequiredLocations) return locations.exports;
  hasRequiredLocations = 1;
  (function(module) {
    ((e) => {
      "function" == typeof commonjsRequire && true && module && module.exports && (module.exports = e(requireMinimal()));
    })(function(o) {
      var e, t, n, F, s = o.Reader, r = o.Writer, u = o.util, c = o.roots.locations_protos || (o.roots.locations_protos = {});
      function L(e2, t2, n2) {
        o.rpc.Service.call(this, e2, t2, n2);
      }
      function i(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function a(e2) {
        if (this.locations = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function G(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function p(e2) {
        if (this.labels = {}, e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function l(e2) {
        if (this.rules = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function d(e2) {
        if (this.additionalBindings = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function g(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function B(e2) {
        if (this.file = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function f(e2) {
        if (this.dependency = [], this.publicDependency = [], this.weakDependency = [], this.messageType = [], this.enumType = [], this.service = [], this.extension = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function y(e2) {
        if (this.field = [], this.extension = [], this.nestedType = [], this.enumType = [], this.extensionRange = [], this.oneofDecl = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function h(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function b(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function U(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function O(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function m(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function v(e2) {
        if (this.value = [], this.reservedRange = [], this.reservedName = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function P(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function w(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function j(e2) {
        if (this.method = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function x(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function S(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function k(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function D(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function M(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function T(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function E(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function A(e2) {
        if (this.uninterpretedOption = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function N(e2) {
        if (this.uninterpretedOption = [], this[".google.api.methodSignature"] = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function I(e2) {
        if (this.name = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function R(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function _(e2) {
        if (this.location = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function C(e2) {
        if (this.path = [], this.span = [], this.leadingDetachedComments = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function J(e2) {
        if (this.annotation = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function V(e2) {
        if (this.path = [], e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      function H(e2) {
        if (e2) for (var t2 = Object.keys(e2), n2 = 0; n2 < t2.length; ++n2) null != e2[t2[n2]] && (this[t2[n2]] = e2[t2[n2]]);
      }
      return c.google = ((F = {}).cloud = ((n = {}).location = ((e = {}).Locations = (((L.prototype = Object.create(o.rpc.Service.prototype)).constructor = L).create = function(e2, t2, n2) {
        return new this(e2, t2, n2);
      }, Object.defineProperty(L.prototype.listLocations = function e2(t2, n2) {
        return this.rpcCall(e2, c.google.cloud.location.ListLocationsRequest, c.google.cloud.location.ListLocationsResponse, t2, n2);
      }, "name", { value: "ListLocations" }), Object.defineProperty(L.prototype.getLocation = function e2(t2, n2) {
        return this.rpcCall(e2, c.google.cloud.location.GetLocationRequest, c.google.cloud.location.Location, t2, n2);
      }, "name", { value: "GetLocation" }), L), e.ListLocationsRequest = (i.prototype.name = "", i.prototype.filter = "", i.prototype.pageSize = 0, i.prototype.pageToken = "", i.create = function(e2) {
        return new i(e2);
      }, i.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.filter && Object.hasOwnProperty.call(e2, "filter") && t2.uint32(18).string(e2.filter), null != e2.pageSize && Object.hasOwnProperty.call(e2, "pageSize") && t2.uint32(24).int32(e2.pageSize), null != e2.pageToken && Object.hasOwnProperty.call(e2, "pageToken") && t2.uint32(34).string(e2.pageToken), t2;
      }, i.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, i.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.cloud.location.ListLocationsRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.filter = e2.string();
              break;
            case 3:
              o2.pageSize = e2.int32();
              break;
            case 4:
              o2.pageToken = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, i.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, i.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name) ? "name: string expected" : null != e2.filter && e2.hasOwnProperty("filter") && !u.isString(e2.filter) ? "filter: string expected" : null != e2.pageSize && e2.hasOwnProperty("pageSize") && !u.isInteger(e2.pageSize) ? "pageSize: integer expected" : null != e2.pageToken && e2.hasOwnProperty("pageToken") && !u.isString(e2.pageToken) ? "pageToken: string expected" : null;
      }, i.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.cloud.location.ListLocationsRequest ? e2 : (t2 = new c.google.cloud.location.ListLocationsRequest(), null != e2.name && (t2.name = String(e2.name)), null != e2.filter && (t2.filter = String(e2.filter)), null != e2.pageSize && (t2.pageSize = 0 | e2.pageSize), null != e2.pageToken && (t2.pageToken = String(e2.pageToken)), t2);
      }, i.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.filter = "", n2.pageSize = 0, n2.pageToken = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.filter && e2.hasOwnProperty("filter") && (n2.filter = e2.filter), null != e2.pageSize && e2.hasOwnProperty("pageSize") && (n2.pageSize = e2.pageSize), null != e2.pageToken && e2.hasOwnProperty("pageToken") && (n2.pageToken = e2.pageToken), n2;
      }, i.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, i), e.ListLocationsResponse = (a.prototype.locations = u.emptyArray, a.prototype.nextPageToken = "", a.create = function(e2) {
        return new a(e2);
      }, a.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.locations && e2.locations.length) for (var n2 = 0; n2 < e2.locations.length; ++n2) c.google.cloud.location.Location.encode(e2.locations[n2], t2.uint32(10).fork()).ldelim();
        return null != e2.nextPageToken && Object.hasOwnProperty.call(e2, "nextPageToken") && t2.uint32(18).string(e2.nextPageToken), t2;
      }, a.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, a.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.cloud.location.ListLocationsResponse(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.locations && o2.locations.length || (o2.locations = []), o2.locations.push(c.google.cloud.location.Location.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.nextPageToken = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, a.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, a.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.locations && e2.hasOwnProperty("locations")) {
          if (!Array.isArray(e2.locations)) return "locations: array expected";
          for (var t2 = 0; t2 < e2.locations.length; ++t2) {
            var n2 = c.google.cloud.location.Location.verify(e2.locations[t2]);
            if (n2) return "locations." + n2;
          }
        }
        return null != e2.nextPageToken && e2.hasOwnProperty("nextPageToken") && !u.isString(e2.nextPageToken) ? "nextPageToken: string expected" : null;
      }, a.fromObject = function(e2) {
        if (e2 instanceof c.google.cloud.location.ListLocationsResponse) return e2;
        var t2 = new c.google.cloud.location.ListLocationsResponse();
        if (e2.locations) {
          if (!Array.isArray(e2.locations)) throw TypeError(".google.cloud.location.ListLocationsResponse.locations: array expected");
          t2.locations = [];
          for (var n2 = 0; n2 < e2.locations.length; ++n2) {
            if ("object" != typeof e2.locations[n2]) throw TypeError(".google.cloud.location.ListLocationsResponse.locations: object expected");
            t2.locations[n2] = c.google.cloud.location.Location.fromObject(e2.locations[n2]);
          }
        }
        return null != e2.nextPageToken && (t2.nextPageToken = String(e2.nextPageToken)), t2;
      }, a.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.locations = []), t2.defaults && (n2.nextPageToken = ""), e2.locations && e2.locations.length) {
          n2.locations = [];
          for (var o2 = 0; o2 < e2.locations.length; ++o2) n2.locations[o2] = c.google.cloud.location.Location.toObject(e2.locations[o2], t2);
        }
        return null != e2.nextPageToken && e2.hasOwnProperty("nextPageToken") && (n2.nextPageToken = e2.nextPageToken), n2;
      }, a.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, a), e.GetLocationRequest = (G.prototype.name = "", G.create = function(e2) {
        return new G(e2);
      }, G.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), t2;
      }, G.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, G.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.cloud.location.GetLocationRequest(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? o2.name = e2.string() : e2.skipType(7 & r2);
        }
        return o2;
      }, G.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, G.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name) ? "name: string expected" : null;
      }, G.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.cloud.location.GetLocationRequest ? e2 : (t2 = new c.google.cloud.location.GetLocationRequest(), null != e2.name && (t2.name = String(e2.name)), t2);
      }, G.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), n2;
      }, G.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, G), e.Location = (p.prototype.name = "", p.prototype.locationId = "", p.prototype.displayName = "", p.prototype.labels = u.emptyObject, p.prototype.metadata = null, p.create = function(e2) {
        return new p(e2);
      }, p.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.labels && Object.hasOwnProperty.call(e2, "labels")) for (var n2 = Object.keys(e2.labels), o2 = 0; o2 < n2.length; ++o2) t2.uint32(18).fork().uint32(10).string(n2[o2]).uint32(18).string(e2.labels[n2[o2]]).ldelim();
        return null != e2.metadata && Object.hasOwnProperty.call(e2, "metadata") && c.google.protobuf.Any.encode(e2.metadata, t2.uint32(26).fork()).ldelim(), null != e2.locationId && Object.hasOwnProperty.call(e2, "locationId") && t2.uint32(34).string(e2.locationId), null != e2.displayName && Object.hasOwnProperty.call(e2, "displayName") && t2.uint32(42).string(e2.displayName), t2;
      }, p.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, p.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.cloud.location.Location(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 4:
              o2.locationId = e2.string();
              break;
            case 5:
              o2.displayName = e2.string();
              break;
            case 2:
              o2.labels === u.emptyObject && (o2.labels = {});
              for (var i2 = e2.uint32() + e2.pos, a2 = "", p2 = ""; e2.pos < i2; ) {
                var l2 = e2.uint32();
                switch (l2 >>> 3) {
                  case 1:
                    a2 = e2.string();
                    break;
                  case 2:
                    p2 = e2.string();
                    break;
                  default:
                    e2.skipType(7 & l2);
                }
              }
              o2.labels[a2] = p2;
              break;
            case 3:
              o2.metadata = c.google.protobuf.Any.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, p.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, p.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.locationId && e2.hasOwnProperty("locationId") && !u.isString(e2.locationId)) return "locationId: string expected";
        if (null != e2.displayName && e2.hasOwnProperty("displayName") && !u.isString(e2.displayName)) return "displayName: string expected";
        if (null != e2.labels && e2.hasOwnProperty("labels")) {
          if (!u.isObject(e2.labels)) return "labels: object expected";
          for (var t2 = Object.keys(e2.labels), n2 = 0; n2 < t2.length; ++n2) if (!u.isString(e2.labels[t2[n2]])) return "labels: string{k:string} expected";
        }
        if (null != e2.metadata && e2.hasOwnProperty("metadata")) {
          var o2 = c.google.protobuf.Any.verify(e2.metadata);
          if (o2) return "metadata." + o2;
        }
        return null;
      }, p.fromObject = function(e2) {
        if (e2 instanceof c.google.cloud.location.Location) return e2;
        var t2 = new c.google.cloud.location.Location();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.locationId && (t2.locationId = String(e2.locationId)), null != e2.displayName && (t2.displayName = String(e2.displayName)), e2.labels) {
          if ("object" != typeof e2.labels) throw TypeError(".google.cloud.location.Location.labels: object expected");
          t2.labels = {};
          for (var n2 = Object.keys(e2.labels), o2 = 0; o2 < n2.length; ++o2) t2.labels[n2[o2]] = String(e2.labels[n2[o2]]);
        }
        if (null != e2.metadata) {
          if ("object" != typeof e2.metadata) throw TypeError(".google.cloud.location.Location.metadata: object expected");
          t2.metadata = c.google.protobuf.Any.fromObject(e2.metadata);
        }
        return t2;
      }, p.toObject = function(e2, t2) {
        var n2, o2 = {};
        if (((t2 = t2 || {}).objects || t2.defaults) && (o2.labels = {}), t2.defaults && (o2.name = "", o2.metadata = null, o2.locationId = "", o2.displayName = ""), null != e2.name && e2.hasOwnProperty("name") && (o2.name = e2.name), e2.labels && (n2 = Object.keys(e2.labels)).length) {
          o2.labels = {};
          for (var r2 = 0; r2 < n2.length; ++r2) o2.labels[n2[r2]] = e2.labels[n2[r2]];
        }
        return null != e2.metadata && e2.hasOwnProperty("metadata") && (o2.metadata = c.google.protobuf.Any.toObject(e2.metadata, t2)), null != e2.locationId && e2.hasOwnProperty("locationId") && (o2.locationId = e2.locationId), null != e2.displayName && e2.hasOwnProperty("displayName") && (o2.displayName = e2.displayName), o2;
      }, p.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, p), e), n), F.api = ((e = {}).Http = (l.prototype.rules = u.emptyArray, l.prototype.fullyDecodeReservedExpansion = false, l.create = function(e2) {
        return new l(e2);
      }, l.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.rules && e2.rules.length) for (var n2 = 0; n2 < e2.rules.length; ++n2) c.google.api.HttpRule.encode(e2.rules[n2], t2.uint32(10).fork()).ldelim();
        return null != e2.fullyDecodeReservedExpansion && Object.hasOwnProperty.call(e2, "fullyDecodeReservedExpansion") && t2.uint32(16).bool(e2.fullyDecodeReservedExpansion), t2;
      }, l.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, l.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.api.Http(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.rules && o2.rules.length || (o2.rules = []), o2.rules.push(c.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            case 2:
              o2.fullyDecodeReservedExpansion = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, l.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, l.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.rules && e2.hasOwnProperty("rules")) {
          if (!Array.isArray(e2.rules)) return "rules: array expected";
          for (var t2 = 0; t2 < e2.rules.length; ++t2) {
            var n2 = c.google.api.HttpRule.verify(e2.rules[t2]);
            if (n2) return "rules." + n2;
          }
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && "boolean" != typeof e2.fullyDecodeReservedExpansion ? "fullyDecodeReservedExpansion: boolean expected" : null;
      }, l.fromObject = function(e2) {
        if (e2 instanceof c.google.api.Http) return e2;
        var t2 = new c.google.api.Http();
        if (e2.rules) {
          if (!Array.isArray(e2.rules)) throw TypeError(".google.api.Http.rules: array expected");
          t2.rules = [];
          for (var n2 = 0; n2 < e2.rules.length; ++n2) {
            if ("object" != typeof e2.rules[n2]) throw TypeError(".google.api.Http.rules: object expected");
            t2.rules[n2] = c.google.api.HttpRule.fromObject(e2.rules[n2]);
          }
        }
        return null != e2.fullyDecodeReservedExpansion && (t2.fullyDecodeReservedExpansion = Boolean(e2.fullyDecodeReservedExpansion)), t2;
      }, l.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.rules = []), t2.defaults && (n2.fullyDecodeReservedExpansion = false), e2.rules && e2.rules.length) {
          n2.rules = [];
          for (var o2 = 0; o2 < e2.rules.length; ++o2) n2.rules[o2] = c.google.api.HttpRule.toObject(e2.rules[o2], t2);
        }
        return null != e2.fullyDecodeReservedExpansion && e2.hasOwnProperty("fullyDecodeReservedExpansion") && (n2.fullyDecodeReservedExpansion = e2.fullyDecodeReservedExpansion), n2;
      }, l.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, l), e.HttpRule = (d.prototype.selector = "", d.prototype.get = null, d.prototype.put = null, d.prototype.post = null, d.prototype.delete = null, d.prototype.patch = null, d.prototype.custom = null, d.prototype.body = "", d.prototype.responseBody = "", d.prototype.additionalBindings = u.emptyArray, Object.defineProperty(d.prototype, "pattern", { get: u.oneOfGetter(n = ["get", "put", "post", "delete", "patch", "custom"]), set: u.oneOfSetter(n) }), d.create = function(e2) {
        return new d(e2);
      }, d.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.selector && Object.hasOwnProperty.call(e2, "selector") && t2.uint32(10).string(e2.selector), null != e2.get && Object.hasOwnProperty.call(e2, "get") && t2.uint32(18).string(e2.get), null != e2.put && Object.hasOwnProperty.call(e2, "put") && t2.uint32(26).string(e2.put), null != e2.post && Object.hasOwnProperty.call(e2, "post") && t2.uint32(34).string(e2.post), null != e2.delete && Object.hasOwnProperty.call(e2, "delete") && t2.uint32(42).string(e2.delete), null != e2.patch && Object.hasOwnProperty.call(e2, "patch") && t2.uint32(50).string(e2.patch), null != e2.body && Object.hasOwnProperty.call(e2, "body") && t2.uint32(58).string(e2.body), null != e2.custom && Object.hasOwnProperty.call(e2, "custom") && c.google.api.CustomHttpPattern.encode(e2.custom, t2.uint32(66).fork()).ldelim(), null != e2.additionalBindings && e2.additionalBindings.length) for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) c.google.api.HttpRule.encode(e2.additionalBindings[n2], t2.uint32(90).fork()).ldelim();
        return null != e2.responseBody && Object.hasOwnProperty.call(e2, "responseBody") && t2.uint32(98).string(e2.responseBody), t2;
      }, d.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, d.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.api.HttpRule(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.selector = e2.string();
              break;
            case 2:
              o2.get = e2.string();
              break;
            case 3:
              o2.put = e2.string();
              break;
            case 4:
              o2.post = e2.string();
              break;
            case 5:
              o2.delete = e2.string();
              break;
            case 6:
              o2.patch = e2.string();
              break;
            case 8:
              o2.custom = c.google.api.CustomHttpPattern.decode(e2, e2.uint32());
              break;
            case 7:
              o2.body = e2.string();
              break;
            case 12:
              o2.responseBody = e2.string();
              break;
            case 11:
              o2.additionalBindings && o2.additionalBindings.length || (o2.additionalBindings = []), o2.additionalBindings.push(c.google.api.HttpRule.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, d.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, d.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        var t2 = {};
        if (null != e2.selector && e2.hasOwnProperty("selector") && !u.isString(e2.selector)) return "selector: string expected";
        if (null != e2.get && e2.hasOwnProperty("get") && (t2.pattern = 1, !u.isString(e2.get))) return "get: string expected";
        if (null != e2.put && e2.hasOwnProperty("put")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !u.isString(e2.put)) return "put: string expected";
        }
        if (null != e2.post && e2.hasOwnProperty("post")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !u.isString(e2.post)) return "post: string expected";
        }
        if (null != e2.delete && e2.hasOwnProperty("delete")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !u.isString(e2.delete)) return "delete: string expected";
        }
        if (null != e2.patch && e2.hasOwnProperty("patch")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, !u.isString(e2.patch)) return "patch: string expected";
        }
        if (null != e2.custom && e2.hasOwnProperty("custom")) {
          if (1 === t2.pattern) return "pattern: multiple values";
          if (t2.pattern = 1, n2 = c.google.api.CustomHttpPattern.verify(e2.custom)) return "custom." + n2;
        }
        if (null != e2.body && e2.hasOwnProperty("body") && !u.isString(e2.body)) return "body: string expected";
        if (null != e2.responseBody && e2.hasOwnProperty("responseBody") && !u.isString(e2.responseBody)) return "responseBody: string expected";
        if (null != e2.additionalBindings && e2.hasOwnProperty("additionalBindings")) {
          if (!Array.isArray(e2.additionalBindings)) return "additionalBindings: array expected";
          for (var n2, o2 = 0; o2 < e2.additionalBindings.length; ++o2) if (n2 = c.google.api.HttpRule.verify(e2.additionalBindings[o2])) return "additionalBindings." + n2;
        }
        return null;
      }, d.fromObject = function(e2) {
        if (e2 instanceof c.google.api.HttpRule) return e2;
        var t2 = new c.google.api.HttpRule();
        if (null != e2.selector && (t2.selector = String(e2.selector)), null != e2.get && (t2.get = String(e2.get)), null != e2.put && (t2.put = String(e2.put)), null != e2.post && (t2.post = String(e2.post)), null != e2.delete && (t2.delete = String(e2.delete)), null != e2.patch && (t2.patch = String(e2.patch)), null != e2.custom) {
          if ("object" != typeof e2.custom) throw TypeError(".google.api.HttpRule.custom: object expected");
          t2.custom = c.google.api.CustomHttpPattern.fromObject(e2.custom);
        }
        if (null != e2.body && (t2.body = String(e2.body)), null != e2.responseBody && (t2.responseBody = String(e2.responseBody)), e2.additionalBindings) {
          if (!Array.isArray(e2.additionalBindings)) throw TypeError(".google.api.HttpRule.additionalBindings: array expected");
          t2.additionalBindings = [];
          for (var n2 = 0; n2 < e2.additionalBindings.length; ++n2) {
            if ("object" != typeof e2.additionalBindings[n2]) throw TypeError(".google.api.HttpRule.additionalBindings: object expected");
            t2.additionalBindings[n2] = c.google.api.HttpRule.fromObject(e2.additionalBindings[n2]);
          }
        }
        return t2;
      }, d.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.additionalBindings = []), t2.defaults && (n2.selector = "", n2.body = "", n2.responseBody = ""), null != e2.selector && e2.hasOwnProperty("selector") && (n2.selector = e2.selector), null != e2.get && e2.hasOwnProperty("get") && (n2.get = e2.get, t2.oneofs) && (n2.pattern = "get"), null != e2.put && e2.hasOwnProperty("put") && (n2.put = e2.put, t2.oneofs) && (n2.pattern = "put"), null != e2.post && e2.hasOwnProperty("post") && (n2.post = e2.post, t2.oneofs) && (n2.pattern = "post"), null != e2.delete && e2.hasOwnProperty("delete") && (n2.delete = e2.delete, t2.oneofs) && (n2.pattern = "delete"), null != e2.patch && e2.hasOwnProperty("patch") && (n2.patch = e2.patch, t2.oneofs) && (n2.pattern = "patch"), null != e2.body && e2.hasOwnProperty("body") && (n2.body = e2.body), null != e2.custom && e2.hasOwnProperty("custom") && (n2.custom = c.google.api.CustomHttpPattern.toObject(e2.custom, t2), t2.oneofs) && (n2.pattern = "custom"), e2.additionalBindings && e2.additionalBindings.length) {
          n2.additionalBindings = [];
          for (var o2 = 0; o2 < e2.additionalBindings.length; ++o2) n2.additionalBindings[o2] = c.google.api.HttpRule.toObject(e2.additionalBindings[o2], t2);
        }
        return null != e2.responseBody && e2.hasOwnProperty("responseBody") && (n2.responseBody = e2.responseBody), n2;
      }, d.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, d), e.CustomHttpPattern = (g.prototype.kind = "", g.prototype.path = "", g.create = function(e2) {
        return new g(e2);
      }, g.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.kind && Object.hasOwnProperty.call(e2, "kind") && t2.uint32(10).string(e2.kind), null != e2.path && Object.hasOwnProperty.call(e2, "path") && t2.uint32(18).string(e2.path), t2;
      }, g.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, g.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.api.CustomHttpPattern(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.kind = e2.string();
              break;
            case 2:
              o2.path = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, g.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, g.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.kind && e2.hasOwnProperty("kind") && !u.isString(e2.kind) ? "kind: string expected" : null != e2.path && e2.hasOwnProperty("path") && !u.isString(e2.path) ? "path: string expected" : null;
      }, g.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.api.CustomHttpPattern ? e2 : (t2 = new c.google.api.CustomHttpPattern(), null != e2.kind && (t2.kind = String(e2.kind)), null != e2.path && (t2.path = String(e2.path)), t2);
      }, g.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.kind = "", n2.path = ""), null != e2.kind && e2.hasOwnProperty("kind") && (n2.kind = e2.kind), null != e2.path && e2.hasOwnProperty("path") && (n2.path = e2.path), n2;
      }, g.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, g), e), F.protobuf = ((n = {}).FileDescriptorSet = (B.prototype.file = u.emptyArray, B.create = function(e2) {
        return new B(e2);
      }, B.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.file && e2.file.length) for (var n2 = 0; n2 < e2.file.length; ++n2) c.google.protobuf.FileDescriptorProto.encode(e2.file[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, B.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, B.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.FileDescriptorSet(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.file && o2.file.length || (o2.file = []), o2.file.push(c.google.protobuf.FileDescriptorProto.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, B.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, B.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.file && e2.hasOwnProperty("file")) {
          if (!Array.isArray(e2.file)) return "file: array expected";
          for (var t2 = 0; t2 < e2.file.length; ++t2) {
            var n2 = c.google.protobuf.FileDescriptorProto.verify(e2.file[t2]);
            if (n2) return "file." + n2;
          }
        }
        return null;
      }, B.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.FileDescriptorSet) return e2;
        var t2 = new c.google.protobuf.FileDescriptorSet();
        if (e2.file) {
          if (!Array.isArray(e2.file)) throw TypeError(".google.protobuf.FileDescriptorSet.file: array expected");
          t2.file = [];
          for (var n2 = 0; n2 < e2.file.length; ++n2) {
            if ("object" != typeof e2.file[n2]) throw TypeError(".google.protobuf.FileDescriptorSet.file: object expected");
            t2.file[n2] = c.google.protobuf.FileDescriptorProto.fromObject(e2.file[n2]);
          }
        }
        return t2;
      }, B.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.file = []), e2.file && e2.file.length) {
          n2.file = [];
          for (var o2 = 0; o2 < e2.file.length; ++o2) n2.file[o2] = c.google.protobuf.FileDescriptorProto.toObject(e2.file[o2], t2);
        }
        return n2;
      }, B.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, B), n.FileDescriptorProto = (f.prototype.name = "", f.prototype.package = "", f.prototype.dependency = u.emptyArray, f.prototype.publicDependency = u.emptyArray, f.prototype.weakDependency = u.emptyArray, f.prototype.messageType = u.emptyArray, f.prototype.enumType = u.emptyArray, f.prototype.service = u.emptyArray, f.prototype.extension = u.emptyArray, f.prototype.options = null, f.prototype.sourceCodeInfo = null, f.prototype.syntax = "", f.create = function(e2) {
        return new f(e2);
      }, f.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.package && Object.hasOwnProperty.call(e2, "package") && t2.uint32(18).string(e2.package), null != e2.dependency && e2.dependency.length) for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.uint32(26).string(e2.dependency[n2]);
        if (null != e2.messageType && e2.messageType.length) for (n2 = 0; n2 < e2.messageType.length; ++n2) c.google.protobuf.DescriptorProto.encode(e2.messageType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) c.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.service && e2.service.length) for (n2 = 0; n2 < e2.service.length; ++n2) c.google.protobuf.ServiceDescriptorProto.encode(e2.service[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) c.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(58).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.FileOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.sourceCodeInfo && Object.hasOwnProperty.call(e2, "sourceCodeInfo") && c.google.protobuf.SourceCodeInfo.encode(e2.sourceCodeInfo, t2.uint32(74).fork()).ldelim(), null != e2.publicDependency && e2.publicDependency.length) for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.uint32(80).int32(e2.publicDependency[n2]);
        if (null != e2.weakDependency && e2.weakDependency.length) for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.uint32(88).int32(e2.weakDependency[n2]);
        return null != e2.syntax && Object.hasOwnProperty.call(e2, "syntax") && t2.uint32(98).string(e2.syntax), t2;
      }, f.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, f.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.FileDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.package = e2.string();
              break;
            case 3:
              o2.dependency && o2.dependency.length || (o2.dependency = []), o2.dependency.push(e2.string());
              break;
            case 10:
              if (o2.publicDependency && o2.publicDependency.length || (o2.publicDependency = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.publicDependency.push(e2.int32());
              else o2.publicDependency.push(e2.int32());
              break;
            case 11:
              if (o2.weakDependency && o2.weakDependency.length || (o2.weakDependency = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.weakDependency.push(e2.int32());
              else o2.weakDependency.push(e2.int32());
              break;
            case 4:
              o2.messageType && o2.messageType.length || (o2.messageType = []), o2.messageType.push(c.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(c.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.service && o2.service.length || (o2.service = []), o2.service.push(c.google.protobuf.ServiceDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(c.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.options = c.google.protobuf.FileOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.sourceCodeInfo = c.google.protobuf.SourceCodeInfo.decode(e2, e2.uint32());
              break;
            case 12:
              o2.syntax = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, f.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, f.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.package && e2.hasOwnProperty("package") && !u.isString(e2.package)) return "package: string expected";
        if (null != e2.dependency && e2.hasOwnProperty("dependency")) {
          if (!Array.isArray(e2.dependency)) return "dependency: array expected";
          for (var t2 = 0; t2 < e2.dependency.length; ++t2) if (!u.isString(e2.dependency[t2])) return "dependency: string[] expected";
        }
        if (null != e2.publicDependency && e2.hasOwnProperty("publicDependency")) {
          if (!Array.isArray(e2.publicDependency)) return "publicDependency: array expected";
          for (t2 = 0; t2 < e2.publicDependency.length; ++t2) if (!u.isInteger(e2.publicDependency[t2])) return "publicDependency: integer[] expected";
        }
        if (null != e2.weakDependency && e2.hasOwnProperty("weakDependency")) {
          if (!Array.isArray(e2.weakDependency)) return "weakDependency: array expected";
          for (t2 = 0; t2 < e2.weakDependency.length; ++t2) if (!u.isInteger(e2.weakDependency[t2])) return "weakDependency: integer[] expected";
        }
        if (null != e2.messageType && e2.hasOwnProperty("messageType")) {
          if (!Array.isArray(e2.messageType)) return "messageType: array expected";
          for (t2 = 0; t2 < e2.messageType.length; ++t2) if (n2 = c.google.protobuf.DescriptorProto.verify(e2.messageType[t2])) return "messageType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = c.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.service && e2.hasOwnProperty("service")) {
          if (!Array.isArray(e2.service)) return "service: array expected";
          for (t2 = 0; t2 < e2.service.length; ++t2) if (n2 = c.google.protobuf.ServiceDescriptorProto.verify(e2.service[t2])) return "service." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = c.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = c.google.protobuf.FileOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2 = c.google.protobuf.SourceCodeInfo.verify(e2.sourceCodeInfo))) return "sourceCodeInfo." + n2;
        return null != e2.syntax && e2.hasOwnProperty("syntax") && !u.isString(e2.syntax) ? "syntax: string expected" : null;
      }, f.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.FileDescriptorProto) return e2;
        var t2 = new c.google.protobuf.FileDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.package && (t2.package = String(e2.package)), e2.dependency) {
          if (!Array.isArray(e2.dependency)) throw TypeError(".google.protobuf.FileDescriptorProto.dependency: array expected");
          t2.dependency = [];
          for (var n2 = 0; n2 < e2.dependency.length; ++n2) t2.dependency[n2] = String(e2.dependency[n2]);
        }
        if (e2.publicDependency) {
          if (!Array.isArray(e2.publicDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.publicDependency: array expected");
          t2.publicDependency = [];
          for (n2 = 0; n2 < e2.publicDependency.length; ++n2) t2.publicDependency[n2] = 0 | e2.publicDependency[n2];
        }
        if (e2.weakDependency) {
          if (!Array.isArray(e2.weakDependency)) throw TypeError(".google.protobuf.FileDescriptorProto.weakDependency: array expected");
          t2.weakDependency = [];
          for (n2 = 0; n2 < e2.weakDependency.length; ++n2) t2.weakDependency[n2] = 0 | e2.weakDependency[n2];
        }
        if (e2.messageType) {
          if (!Array.isArray(e2.messageType)) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: array expected");
          t2.messageType = [];
          for (n2 = 0; n2 < e2.messageType.length; ++n2) {
            if ("object" != typeof e2.messageType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.messageType: object expected");
            t2.messageType[n2] = c.google.protobuf.DescriptorProto.fromObject(e2.messageType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.enumType: object expected");
            t2.enumType[n2] = c.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.service) {
          if (!Array.isArray(e2.service)) throw TypeError(".google.protobuf.FileDescriptorProto.service: array expected");
          t2.service = [];
          for (n2 = 0; n2 < e2.service.length; ++n2) {
            if ("object" != typeof e2.service[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.service: object expected");
            t2.service[n2] = c.google.protobuf.ServiceDescriptorProto.fromObject(e2.service[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.FileDescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.FileDescriptorProto.extension: object expected");
            t2.extension[n2] = c.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FileDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.FileOptions.fromObject(e2.options);
        }
        if (null != e2.sourceCodeInfo) {
          if ("object" != typeof e2.sourceCodeInfo) throw TypeError(".google.protobuf.FileDescriptorProto.sourceCodeInfo: object expected");
          t2.sourceCodeInfo = c.google.protobuf.SourceCodeInfo.fromObject(e2.sourceCodeInfo);
        }
        return null != e2.syntax && (t2.syntax = String(e2.syntax)), t2;
      }, f.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.dependency = [], n2.messageType = [], n2.enumType = [], n2.service = [], n2.extension = [], n2.publicDependency = [], n2.weakDependency = []), t2.defaults && (n2.name = "", n2.package = "", n2.options = null, n2.sourceCodeInfo = null, n2.syntax = ""), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.package && e2.hasOwnProperty("package") && (n2.package = e2.package), e2.dependency && e2.dependency.length) {
          n2.dependency = [];
          for (var o2 = 0; o2 < e2.dependency.length; ++o2) n2.dependency[o2] = e2.dependency[o2];
        }
        if (e2.messageType && e2.messageType.length) {
          n2.messageType = [];
          for (o2 = 0; o2 < e2.messageType.length; ++o2) n2.messageType[o2] = c.google.protobuf.DescriptorProto.toObject(e2.messageType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = c.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.service && e2.service.length) {
          n2.service = [];
          for (o2 = 0; o2 < e2.service.length; ++o2) n2.service[o2] = c.google.protobuf.ServiceDescriptorProto.toObject(e2.service[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = c.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.FileOptions.toObject(e2.options, t2)), null != e2.sourceCodeInfo && e2.hasOwnProperty("sourceCodeInfo") && (n2.sourceCodeInfo = c.google.protobuf.SourceCodeInfo.toObject(e2.sourceCodeInfo, t2)), e2.publicDependency && e2.publicDependency.length) {
          n2.publicDependency = [];
          for (o2 = 0; o2 < e2.publicDependency.length; ++o2) n2.publicDependency[o2] = e2.publicDependency[o2];
        }
        if (e2.weakDependency && e2.weakDependency.length) {
          n2.weakDependency = [];
          for (o2 = 0; o2 < e2.weakDependency.length; ++o2) n2.weakDependency[o2] = e2.weakDependency[o2];
        }
        return null != e2.syntax && e2.hasOwnProperty("syntax") && (n2.syntax = e2.syntax), n2;
      }, f.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, f), n.DescriptorProto = (y.prototype.name = "", y.prototype.field = u.emptyArray, y.prototype.extension = u.emptyArray, y.prototype.nestedType = u.emptyArray, y.prototype.enumType = u.emptyArray, y.prototype.extensionRange = u.emptyArray, y.prototype.oneofDecl = u.emptyArray, y.prototype.options = null, y.prototype.reservedRange = u.emptyArray, y.prototype.reservedName = u.emptyArray, y.create = function(e2) {
        return new y(e2);
      }, y.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.field && e2.field.length) for (var n2 = 0; n2 < e2.field.length; ++n2) c.google.protobuf.FieldDescriptorProto.encode(e2.field[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.nestedType && e2.nestedType.length) for (n2 = 0; n2 < e2.nestedType.length; ++n2) c.google.protobuf.DescriptorProto.encode(e2.nestedType[n2], t2.uint32(26).fork()).ldelim();
        if (null != e2.enumType && e2.enumType.length) for (n2 = 0; n2 < e2.enumType.length; ++n2) c.google.protobuf.EnumDescriptorProto.encode(e2.enumType[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.extensionRange && e2.extensionRange.length) for (n2 = 0; n2 < e2.extensionRange.length; ++n2) c.google.protobuf.DescriptorProto.ExtensionRange.encode(e2.extensionRange[n2], t2.uint32(42).fork()).ldelim();
        if (null != e2.extension && e2.extension.length) for (n2 = 0; n2 < e2.extension.length; ++n2) c.google.protobuf.FieldDescriptorProto.encode(e2.extension[n2], t2.uint32(50).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.MessageOptions.encode(e2.options, t2.uint32(58).fork()).ldelim(), null != e2.oneofDecl && e2.oneofDecl.length) for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) c.google.protobuf.OneofDescriptorProto.encode(e2.oneofDecl[n2], t2.uint32(66).fork()).ldelim();
        if (null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) c.google.protobuf.DescriptorProto.ReservedRange.encode(e2.reservedRange[n2], t2.uint32(74).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(82).string(e2.reservedName[n2]);
        return t2;
      }, y.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, y.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.DescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.field && o2.field.length || (o2.field = []), o2.field.push(c.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 6:
              o2.extension && o2.extension.length || (o2.extension = []), o2.extension.push(c.google.protobuf.FieldDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.nestedType && o2.nestedType.length || (o2.nestedType = []), o2.nestedType.push(c.google.protobuf.DescriptorProto.decode(e2, e2.uint32()));
              break;
            case 4:
              o2.enumType && o2.enumType.length || (o2.enumType = []), o2.enumType.push(c.google.protobuf.EnumDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.extensionRange && o2.extensionRange.length || (o2.extensionRange = []), o2.extensionRange.push(c.google.protobuf.DescriptorProto.ExtensionRange.decode(e2, e2.uint32()));
              break;
            case 8:
              o2.oneofDecl && o2.oneofDecl.length || (o2.oneofDecl = []), o2.oneofDecl.push(c.google.protobuf.OneofDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 7:
              o2.options = c.google.protobuf.MessageOptions.decode(e2, e2.uint32());
              break;
            case 9:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(c.google.protobuf.DescriptorProto.ReservedRange.decode(e2, e2.uint32()));
              break;
            case 10:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, y.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, y.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.field && e2.hasOwnProperty("field")) {
          if (!Array.isArray(e2.field)) return "field: array expected";
          for (var t2 = 0; t2 < e2.field.length; ++t2) if (n2 = c.google.protobuf.FieldDescriptorProto.verify(e2.field[t2])) return "field." + n2;
        }
        if (null != e2.extension && e2.hasOwnProperty("extension")) {
          if (!Array.isArray(e2.extension)) return "extension: array expected";
          for (t2 = 0; t2 < e2.extension.length; ++t2) if (n2 = c.google.protobuf.FieldDescriptorProto.verify(e2.extension[t2])) return "extension." + n2;
        }
        if (null != e2.nestedType && e2.hasOwnProperty("nestedType")) {
          if (!Array.isArray(e2.nestedType)) return "nestedType: array expected";
          for (t2 = 0; t2 < e2.nestedType.length; ++t2) if (n2 = c.google.protobuf.DescriptorProto.verify(e2.nestedType[t2])) return "nestedType." + n2;
        }
        if (null != e2.enumType && e2.hasOwnProperty("enumType")) {
          if (!Array.isArray(e2.enumType)) return "enumType: array expected";
          for (t2 = 0; t2 < e2.enumType.length; ++t2) if (n2 = c.google.protobuf.EnumDescriptorProto.verify(e2.enumType[t2])) return "enumType." + n2;
        }
        if (null != e2.extensionRange && e2.hasOwnProperty("extensionRange")) {
          if (!Array.isArray(e2.extensionRange)) return "extensionRange: array expected";
          for (t2 = 0; t2 < e2.extensionRange.length; ++t2) if (n2 = c.google.protobuf.DescriptorProto.ExtensionRange.verify(e2.extensionRange[t2])) return "extensionRange." + n2;
        }
        if (null != e2.oneofDecl && e2.hasOwnProperty("oneofDecl")) {
          if (!Array.isArray(e2.oneofDecl)) return "oneofDecl: array expected";
          for (t2 = 0; t2 < e2.oneofDecl.length; ++t2) if (n2 = c.google.protobuf.OneofDescriptorProto.verify(e2.oneofDecl[t2])) return "oneofDecl." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = c.google.protobuf.MessageOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = c.google.protobuf.DescriptorProto.ReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!u.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, y.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.DescriptorProto) return e2;
        var t2 = new c.google.protobuf.DescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.field) {
          if (!Array.isArray(e2.field)) throw TypeError(".google.protobuf.DescriptorProto.field: array expected");
          t2.field = [];
          for (var n2 = 0; n2 < e2.field.length; ++n2) {
            if ("object" != typeof e2.field[n2]) throw TypeError(".google.protobuf.DescriptorProto.field: object expected");
            t2.field[n2] = c.google.protobuf.FieldDescriptorProto.fromObject(e2.field[n2]);
          }
        }
        if (e2.extension) {
          if (!Array.isArray(e2.extension)) throw TypeError(".google.protobuf.DescriptorProto.extension: array expected");
          t2.extension = [];
          for (n2 = 0; n2 < e2.extension.length; ++n2) {
            if ("object" != typeof e2.extension[n2]) throw TypeError(".google.protobuf.DescriptorProto.extension: object expected");
            t2.extension[n2] = c.google.protobuf.FieldDescriptorProto.fromObject(e2.extension[n2]);
          }
        }
        if (e2.nestedType) {
          if (!Array.isArray(e2.nestedType)) throw TypeError(".google.protobuf.DescriptorProto.nestedType: array expected");
          t2.nestedType = [];
          for (n2 = 0; n2 < e2.nestedType.length; ++n2) {
            if ("object" != typeof e2.nestedType[n2]) throw TypeError(".google.protobuf.DescriptorProto.nestedType: object expected");
            t2.nestedType[n2] = c.google.protobuf.DescriptorProto.fromObject(e2.nestedType[n2]);
          }
        }
        if (e2.enumType) {
          if (!Array.isArray(e2.enumType)) throw TypeError(".google.protobuf.DescriptorProto.enumType: array expected");
          t2.enumType = [];
          for (n2 = 0; n2 < e2.enumType.length; ++n2) {
            if ("object" != typeof e2.enumType[n2]) throw TypeError(".google.protobuf.DescriptorProto.enumType: object expected");
            t2.enumType[n2] = c.google.protobuf.EnumDescriptorProto.fromObject(e2.enumType[n2]);
          }
        }
        if (e2.extensionRange) {
          if (!Array.isArray(e2.extensionRange)) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: array expected");
          t2.extensionRange = [];
          for (n2 = 0; n2 < e2.extensionRange.length; ++n2) {
            if ("object" != typeof e2.extensionRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.extensionRange: object expected");
            t2.extensionRange[n2] = c.google.protobuf.DescriptorProto.ExtensionRange.fromObject(e2.extensionRange[n2]);
          }
        }
        if (e2.oneofDecl) {
          if (!Array.isArray(e2.oneofDecl)) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: array expected");
          t2.oneofDecl = [];
          for (n2 = 0; n2 < e2.oneofDecl.length; ++n2) {
            if ("object" != typeof e2.oneofDecl[n2]) throw TypeError(".google.protobuf.DescriptorProto.oneofDecl: object expected");
            t2.oneofDecl[n2] = c.google.protobuf.OneofDescriptorProto.fromObject(e2.oneofDecl[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.options: object expected");
          t2.options = c.google.protobuf.MessageOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.DescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = c.google.protobuf.DescriptorProto.ReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.DescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, y.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.field = [], n2.nestedType = [], n2.enumType = [], n2.extensionRange = [], n2.extension = [], n2.oneofDecl = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.field && e2.field.length) {
          n2.field = [];
          for (var o2 = 0; o2 < e2.field.length; ++o2) n2.field[o2] = c.google.protobuf.FieldDescriptorProto.toObject(e2.field[o2], t2);
        }
        if (e2.nestedType && e2.nestedType.length) {
          n2.nestedType = [];
          for (o2 = 0; o2 < e2.nestedType.length; ++o2) n2.nestedType[o2] = c.google.protobuf.DescriptorProto.toObject(e2.nestedType[o2], t2);
        }
        if (e2.enumType && e2.enumType.length) {
          n2.enumType = [];
          for (o2 = 0; o2 < e2.enumType.length; ++o2) n2.enumType[o2] = c.google.protobuf.EnumDescriptorProto.toObject(e2.enumType[o2], t2);
        }
        if (e2.extensionRange && e2.extensionRange.length) {
          n2.extensionRange = [];
          for (o2 = 0; o2 < e2.extensionRange.length; ++o2) n2.extensionRange[o2] = c.google.protobuf.DescriptorProto.ExtensionRange.toObject(e2.extensionRange[o2], t2);
        }
        if (e2.extension && e2.extension.length) {
          n2.extension = [];
          for (o2 = 0; o2 < e2.extension.length; ++o2) n2.extension[o2] = c.google.protobuf.FieldDescriptorProto.toObject(e2.extension[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.MessageOptions.toObject(e2.options, t2)), e2.oneofDecl && e2.oneofDecl.length) {
          n2.oneofDecl = [];
          for (o2 = 0; o2 < e2.oneofDecl.length; ++o2) n2.oneofDecl[o2] = c.google.protobuf.OneofDescriptorProto.toObject(e2.oneofDecl[o2], t2);
        }
        if (e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = c.google.protobuf.DescriptorProto.ReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, y.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, y.ExtensionRange = (h.prototype.start = 0, h.prototype.end = 0, h.prototype.options = null, h.create = function(e2) {
        return new h(e2);
      }, h.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.ExtensionRangeOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, h.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, h.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.DescriptorProto.ExtensionRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            case 3:
              o2.options = c.google.protobuf.ExtensionRangeOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, h.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, h.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.start && e2.hasOwnProperty("start") && !u.isInteger(e2.start)) return "start: integer expected";
        if (null != e2.end && e2.hasOwnProperty("end") && !u.isInteger(e2.end)) return "end: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = c.google.protobuf.ExtensionRangeOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, h.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.DescriptorProto.ExtensionRange) return e2;
        var t2 = new c.google.protobuf.DescriptorProto.ExtensionRange();
        if (null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.DescriptorProto.ExtensionRange.options: object expected");
          t2.options = c.google.protobuf.ExtensionRangeOptions.fromObject(e2.options);
        }
        return t2;
      }, h.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0, n2.options = null), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.ExtensionRangeOptions.toObject(e2.options, t2)), n2;
      }, h.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, h), y.ReservedRange = (b.prototype.start = 0, b.prototype.end = 0, b.create = function(e2) {
        return new b(e2);
      }, b.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, b.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, b.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.DescriptorProto.ReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, b.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, b.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !u.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !u.isInteger(e2.end) ? "end: integer expected" : null;
      }, b.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.protobuf.DescriptorProto.ReservedRange ? e2 : (t2 = new c.google.protobuf.DescriptorProto.ReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, b.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, b.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, b), y), n.ExtensionRangeOptions = (U.prototype.uninterpretedOption = u.emptyArray, U.create = function(e2) {
        return new U(e2);
      }, U.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, U.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, U.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.ExtensionRangeOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, U.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, U.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, U.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.ExtensionRangeOptions) return e2;
        var t2 = new c.google.protobuf.ExtensionRangeOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ExtensionRangeOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, U.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, U.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, U), n.FieldDescriptorProto = (O.prototype.name = "", O.prototype.number = 0, O.prototype.label = 1, O.prototype.type = 1, O.prototype.typeName = "", O.prototype.extendee = "", O.prototype.defaultValue = "", O.prototype.oneofIndex = 0, O.prototype.jsonName = "", O.prototype.options = null, O.prototype.proto3Optional = false, O.create = function(e2) {
        return new O(e2);
      }, O.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.extendee && Object.hasOwnProperty.call(e2, "extendee") && t2.uint32(18).string(e2.extendee), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(24).int32(e2.number), null != e2.label && Object.hasOwnProperty.call(e2, "label") && t2.uint32(32).int32(e2.label), null != e2.type && Object.hasOwnProperty.call(e2, "type") && t2.uint32(40).int32(e2.type), null != e2.typeName && Object.hasOwnProperty.call(e2, "typeName") && t2.uint32(50).string(e2.typeName), null != e2.defaultValue && Object.hasOwnProperty.call(e2, "defaultValue") && t2.uint32(58).string(e2.defaultValue), null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.FieldOptions.encode(e2.options, t2.uint32(66).fork()).ldelim(), null != e2.oneofIndex && Object.hasOwnProperty.call(e2, "oneofIndex") && t2.uint32(72).int32(e2.oneofIndex), null != e2.jsonName && Object.hasOwnProperty.call(e2, "jsonName") && t2.uint32(82).string(e2.jsonName), null != e2.proto3Optional && Object.hasOwnProperty.call(e2, "proto3Optional") && t2.uint32(136).bool(e2.proto3Optional), t2;
      }, O.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, O.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.FieldDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 3:
              o2.number = e2.int32();
              break;
            case 4:
              o2.label = e2.int32();
              break;
            case 5:
              o2.type = e2.int32();
              break;
            case 6:
              o2.typeName = e2.string();
              break;
            case 2:
              o2.extendee = e2.string();
              break;
            case 7:
              o2.defaultValue = e2.string();
              break;
            case 9:
              o2.oneofIndex = e2.int32();
              break;
            case 10:
              o2.jsonName = e2.string();
              break;
            case 8:
              o2.options = c.google.protobuf.FieldOptions.decode(e2, e2.uint32());
              break;
            case 17:
              o2.proto3Optional = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, O.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, O.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !u.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.label && e2.hasOwnProperty("label")) switch (e2.label) {
          default:
            return "label: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.type && e2.hasOwnProperty("type")) switch (e2.type) {
          default:
            return "type: enum value expected";
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
        }
        if (null != e2.typeName && e2.hasOwnProperty("typeName") && !u.isString(e2.typeName)) return "typeName: string expected";
        if (null != e2.extendee && e2.hasOwnProperty("extendee") && !u.isString(e2.extendee)) return "extendee: string expected";
        if (null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && !u.isString(e2.defaultValue)) return "defaultValue: string expected";
        if (null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && !u.isInteger(e2.oneofIndex)) return "oneofIndex: integer expected";
        if (null != e2.jsonName && e2.hasOwnProperty("jsonName") && !u.isString(e2.jsonName)) return "jsonName: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = c.google.protobuf.FieldOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && "boolean" != typeof e2.proto3Optional ? "proto3Optional: boolean expected" : null;
      }, O.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.FieldDescriptorProto) return e2;
        var t2 = new c.google.protobuf.FieldDescriptorProto();
        switch (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), e2.label) {
          case "LABEL_OPTIONAL":
          case 1:
            t2.label = 1;
            break;
          case "LABEL_REQUIRED":
          case 2:
            t2.label = 2;
            break;
          case "LABEL_REPEATED":
          case 3:
            t2.label = 3;
        }
        switch (e2.type) {
          case "TYPE_DOUBLE":
          case 1:
            t2.type = 1;
            break;
          case "TYPE_FLOAT":
          case 2:
            t2.type = 2;
            break;
          case "TYPE_INT64":
          case 3:
            t2.type = 3;
            break;
          case "TYPE_UINT64":
          case 4:
            t2.type = 4;
            break;
          case "TYPE_INT32":
          case 5:
            t2.type = 5;
            break;
          case "TYPE_FIXED64":
          case 6:
            t2.type = 6;
            break;
          case "TYPE_FIXED32":
          case 7:
            t2.type = 7;
            break;
          case "TYPE_BOOL":
          case 8:
            t2.type = 8;
            break;
          case "TYPE_STRING":
          case 9:
            t2.type = 9;
            break;
          case "TYPE_GROUP":
          case 10:
            t2.type = 10;
            break;
          case "TYPE_MESSAGE":
          case 11:
            t2.type = 11;
            break;
          case "TYPE_BYTES":
          case 12:
            t2.type = 12;
            break;
          case "TYPE_UINT32":
          case 13:
            t2.type = 13;
            break;
          case "TYPE_ENUM":
          case 14:
            t2.type = 14;
            break;
          case "TYPE_SFIXED32":
          case 15:
            t2.type = 15;
            break;
          case "TYPE_SFIXED64":
          case 16:
            t2.type = 16;
            break;
          case "TYPE_SINT32":
          case 17:
            t2.type = 17;
            break;
          case "TYPE_SINT64":
          case 18:
            t2.type = 18;
        }
        if (null != e2.typeName && (t2.typeName = String(e2.typeName)), null != e2.extendee && (t2.extendee = String(e2.extendee)), null != e2.defaultValue && (t2.defaultValue = String(e2.defaultValue)), null != e2.oneofIndex && (t2.oneofIndex = 0 | e2.oneofIndex), null != e2.jsonName && (t2.jsonName = String(e2.jsonName)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.FieldDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.FieldOptions.fromObject(e2.options);
        }
        return null != e2.proto3Optional && (t2.proto3Optional = Boolean(e2.proto3Optional)), t2;
      }, O.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.extendee = "", n2.number = 0, n2.label = t2.enums === String ? "LABEL_OPTIONAL" : 1, n2.type = t2.enums === String ? "TYPE_DOUBLE" : 1, n2.typeName = "", n2.defaultValue = "", n2.options = null, n2.oneofIndex = 0, n2.jsonName = "", n2.proto3Optional = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.extendee && e2.hasOwnProperty("extendee") && (n2.extendee = e2.extendee), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.label && e2.hasOwnProperty("label") && (n2.label = t2.enums === String ? c.google.protobuf.FieldDescriptorProto.Label[e2.label] : e2.label), null != e2.type && e2.hasOwnProperty("type") && (n2.type = t2.enums === String ? c.google.protobuf.FieldDescriptorProto.Type[e2.type] : e2.type), null != e2.typeName && e2.hasOwnProperty("typeName") && (n2.typeName = e2.typeName), null != e2.defaultValue && e2.hasOwnProperty("defaultValue") && (n2.defaultValue = e2.defaultValue), null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.FieldOptions.toObject(e2.options, t2)), null != e2.oneofIndex && e2.hasOwnProperty("oneofIndex") && (n2.oneofIndex = e2.oneofIndex), null != e2.jsonName && e2.hasOwnProperty("jsonName") && (n2.jsonName = e2.jsonName), null != e2.proto3Optional && e2.hasOwnProperty("proto3Optional") && (n2.proto3Optional = e2.proto3Optional), n2;
      }, O.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, O.Type = (e = {}, (t = Object.create(e))[e[1] = "TYPE_DOUBLE"] = 1, t[e[2] = "TYPE_FLOAT"] = 2, t[e[3] = "TYPE_INT64"] = 3, t[e[4] = "TYPE_UINT64"] = 4, t[e[5] = "TYPE_INT32"] = 5, t[e[6] = "TYPE_FIXED64"] = 6, t[e[7] = "TYPE_FIXED32"] = 7, t[e[8] = "TYPE_BOOL"] = 8, t[e[9] = "TYPE_STRING"] = 9, t[e[10] = "TYPE_GROUP"] = 10, t[e[11] = "TYPE_MESSAGE"] = 11, t[e[12] = "TYPE_BYTES"] = 12, t[e[13] = "TYPE_UINT32"] = 13, t[e[14] = "TYPE_ENUM"] = 14, t[e[15] = "TYPE_SFIXED32"] = 15, t[e[16] = "TYPE_SFIXED64"] = 16, t[e[17] = "TYPE_SINT32"] = 17, t[e[18] = "TYPE_SINT64"] = 18, t), O.Label = (e = {}, (t = Object.create(e))[e[1] = "LABEL_OPTIONAL"] = 1, t[e[2] = "LABEL_REQUIRED"] = 2, t[e[3] = "LABEL_REPEATED"] = 3, t), O), n.OneofDescriptorProto = (m.prototype.name = "", m.prototype.options = null, m.create = function(e2) {
        return new m(e2);
      }, m.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.OneofOptions.encode(e2.options, t2.uint32(18).fork()).ldelim(), t2;
      }, m.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, m.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.OneofDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.options = c.google.protobuf.OneofOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, m.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, m.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = c.google.protobuf.OneofOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, m.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.OneofDescriptorProto) return e2;
        var t2 = new c.google.protobuf.OneofDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.OneofDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.OneofOptions.fromObject(e2.options);
        }
        return t2;
      }, m.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.OneofOptions.toObject(e2.options, t2)), n2;
      }, m.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, m), n.EnumDescriptorProto = (v.prototype.name = "", v.prototype.value = u.emptyArray, v.prototype.options = null, v.prototype.reservedRange = u.emptyArray, v.prototype.reservedName = u.emptyArray, v.create = function(e2) {
        return new v(e2);
      }, v.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.value && e2.value.length) for (var n2 = 0; n2 < e2.value.length; ++n2) c.google.protobuf.EnumValueDescriptorProto.encode(e2.value[n2], t2.uint32(18).fork()).ldelim();
        if (null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.EnumOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), null != e2.reservedRange && e2.reservedRange.length) for (n2 = 0; n2 < e2.reservedRange.length; ++n2) c.google.protobuf.EnumDescriptorProto.EnumReservedRange.encode(e2.reservedRange[n2], t2.uint32(34).fork()).ldelim();
        if (null != e2.reservedName && e2.reservedName.length) for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.uint32(42).string(e2.reservedName[n2]);
        return t2;
      }, v.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, v.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.EnumDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.value && o2.value.length || (o2.value = []), o2.value.push(c.google.protobuf.EnumValueDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = c.google.protobuf.EnumOptions.decode(e2, e2.uint32());
              break;
            case 4:
              o2.reservedRange && o2.reservedRange.length || (o2.reservedRange = []), o2.reservedRange.push(c.google.protobuf.EnumDescriptorProto.EnumReservedRange.decode(e2, e2.uint32()));
              break;
            case 5:
              o2.reservedName && o2.reservedName.length || (o2.reservedName = []), o2.reservedName.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, v.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, v.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.value && e2.hasOwnProperty("value")) {
          if (!Array.isArray(e2.value)) return "value: array expected";
          for (var t2 = 0; t2 < e2.value.length; ++t2) if (n2 = c.google.protobuf.EnumValueDescriptorProto.verify(e2.value[t2])) return "value." + n2;
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = c.google.protobuf.EnumOptions.verify(e2.options))) return "options." + n2;
        if (null != e2.reservedRange && e2.hasOwnProperty("reservedRange")) {
          if (!Array.isArray(e2.reservedRange)) return "reservedRange: array expected";
          for (var n2, t2 = 0; t2 < e2.reservedRange.length; ++t2) if (n2 = c.google.protobuf.EnumDescriptorProto.EnumReservedRange.verify(e2.reservedRange[t2])) return "reservedRange." + n2;
        }
        if (null != e2.reservedName && e2.hasOwnProperty("reservedName")) {
          if (!Array.isArray(e2.reservedName)) return "reservedName: array expected";
          for (t2 = 0; t2 < e2.reservedName.length; ++t2) if (!u.isString(e2.reservedName[t2])) return "reservedName: string[] expected";
        }
        return null;
      }, v.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.EnumDescriptorProto) return e2;
        var t2 = new c.google.protobuf.EnumDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.value) {
          if (!Array.isArray(e2.value)) throw TypeError(".google.protobuf.EnumDescriptorProto.value: array expected");
          t2.value = [];
          for (var n2 = 0; n2 < e2.value.length; ++n2) {
            if ("object" != typeof e2.value[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.value: object expected");
            t2.value[n2] = c.google.protobuf.EnumValueDescriptorProto.fromObject(e2.value[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.EnumOptions.fromObject(e2.options);
        }
        if (e2.reservedRange) {
          if (!Array.isArray(e2.reservedRange)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: array expected");
          t2.reservedRange = [];
          for (n2 = 0; n2 < e2.reservedRange.length; ++n2) {
            if ("object" != typeof e2.reservedRange[n2]) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedRange: object expected");
            t2.reservedRange[n2] = c.google.protobuf.EnumDescriptorProto.EnumReservedRange.fromObject(e2.reservedRange[n2]);
          }
        }
        if (e2.reservedName) {
          if (!Array.isArray(e2.reservedName)) throw TypeError(".google.protobuf.EnumDescriptorProto.reservedName: array expected");
          t2.reservedName = [];
          for (n2 = 0; n2 < e2.reservedName.length; ++n2) t2.reservedName[n2] = String(e2.reservedName[n2]);
        }
        return t2;
      }, v.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.value = [], n2.reservedRange = [], n2.reservedName = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.value && e2.value.length) {
          n2.value = [];
          for (var o2 = 0; o2 < e2.value.length; ++o2) n2.value[o2] = c.google.protobuf.EnumValueDescriptorProto.toObject(e2.value[o2], t2);
        }
        if (null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.EnumOptions.toObject(e2.options, t2)), e2.reservedRange && e2.reservedRange.length) {
          n2.reservedRange = [];
          for (o2 = 0; o2 < e2.reservedRange.length; ++o2) n2.reservedRange[o2] = c.google.protobuf.EnumDescriptorProto.EnumReservedRange.toObject(e2.reservedRange[o2], t2);
        }
        if (e2.reservedName && e2.reservedName.length) {
          n2.reservedName = [];
          for (o2 = 0; o2 < e2.reservedName.length; ++o2) n2.reservedName[o2] = e2.reservedName[o2];
        }
        return n2;
      }, v.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, v.EnumReservedRange = (P.prototype.start = 0, P.prototype.end = 0, P.create = function(e2) {
        return new P(e2);
      }, P.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.start && Object.hasOwnProperty.call(e2, "start") && t2.uint32(8).int32(e2.start), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(16).int32(e2.end), t2;
      }, P.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, P.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.EnumDescriptorProto.EnumReservedRange(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.start = e2.int32();
              break;
            case 2:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, P.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, P.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.start && e2.hasOwnProperty("start") && !u.isInteger(e2.start) ? "start: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !u.isInteger(e2.end) ? "end: integer expected" : null;
      }, P.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.protobuf.EnumDescriptorProto.EnumReservedRange ? e2 : (t2 = new c.google.protobuf.EnumDescriptorProto.EnumReservedRange(), null != e2.start && (t2.start = 0 | e2.start), null != e2.end && (t2.end = 0 | e2.end), t2);
      }, P.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.start = 0, n2.end = 0), null != e2.start && e2.hasOwnProperty("start") && (n2.start = e2.start), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, P.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, P), v), n.EnumValueDescriptorProto = (w.prototype.name = "", w.prototype.number = 0, w.prototype.options = null, w.create = function(e2) {
        return new w(e2);
      }, w.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.number && Object.hasOwnProperty.call(e2, "number") && t2.uint32(16).int32(e2.number), null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.EnumValueOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, w.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, w.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.EnumValueDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.number = e2.int32();
              break;
            case 3:
              o2.options = c.google.protobuf.EnumValueOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, w.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, w.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.number && e2.hasOwnProperty("number") && !u.isInteger(e2.number)) return "number: integer expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          e2 = c.google.protobuf.EnumValueOptions.verify(e2.options);
          if (e2) return "options." + e2;
        }
        return null;
      }, w.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.EnumValueDescriptorProto) return e2;
        var t2 = new c.google.protobuf.EnumValueDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.number && (t2.number = 0 | e2.number), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.EnumValueDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.EnumValueOptions.fromObject(e2.options);
        }
        return t2;
      }, w.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.number = 0, n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.number && e2.hasOwnProperty("number") && (n2.number = e2.number), null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.EnumValueOptions.toObject(e2.options, t2)), n2;
      }, w.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, w), n.ServiceDescriptorProto = (j.prototype.name = "", j.prototype.method = u.emptyArray, j.prototype.options = null, j.create = function(e2) {
        return new j(e2);
      }, j.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.method && e2.method.length) for (var n2 = 0; n2 < e2.method.length; ++n2) c.google.protobuf.MethodDescriptorProto.encode(e2.method[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.ServiceOptions.encode(e2.options, t2.uint32(26).fork()).ldelim(), t2;
      }, j.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, j.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.ServiceDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.method && o2.method.length || (o2.method = []), o2.method.push(c.google.protobuf.MethodDescriptorProto.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.options = c.google.protobuf.ServiceOptions.decode(e2, e2.uint32());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, j.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, j.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.method && e2.hasOwnProperty("method")) {
          if (!Array.isArray(e2.method)) return "method: array expected";
          for (var t2 = 0; t2 < e2.method.length; ++t2) if (n2 = c.google.protobuf.MethodDescriptorProto.verify(e2.method[t2])) return "method." + n2;
        }
        var n2;
        if (null != e2.options && e2.hasOwnProperty("options") && (n2 = c.google.protobuf.ServiceOptions.verify(e2.options))) return "options." + n2;
        return null;
      }, j.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.ServiceDescriptorProto) return e2;
        var t2 = new c.google.protobuf.ServiceDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), e2.method) {
          if (!Array.isArray(e2.method)) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: array expected");
          t2.method = [];
          for (var n2 = 0; n2 < e2.method.length; ++n2) {
            if ("object" != typeof e2.method[n2]) throw TypeError(".google.protobuf.ServiceDescriptorProto.method: object expected");
            t2.method[n2] = c.google.protobuf.MethodDescriptorProto.fromObject(e2.method[n2]);
          }
        }
        if (null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.ServiceDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.ServiceOptions.fromObject(e2.options);
        }
        return t2;
      }, j.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.method = []), t2.defaults && (n2.name = "", n2.options = null), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), e2.method && e2.method.length) {
          n2.method = [];
          for (var o2 = 0; o2 < e2.method.length; ++o2) n2.method[o2] = c.google.protobuf.MethodDescriptorProto.toObject(e2.method[o2], t2);
        }
        return null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.ServiceOptions.toObject(e2.options, t2)), n2;
      }, j.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, j), n.MethodDescriptorProto = (x.prototype.name = "", x.prototype.inputType = "", x.prototype.outputType = "", x.prototype.options = null, x.prototype.clientStreaming = false, x.prototype.serverStreaming = false, x.create = function(e2) {
        return new x(e2);
      }, x.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.name && Object.hasOwnProperty.call(e2, "name") && t2.uint32(10).string(e2.name), null != e2.inputType && Object.hasOwnProperty.call(e2, "inputType") && t2.uint32(18).string(e2.inputType), null != e2.outputType && Object.hasOwnProperty.call(e2, "outputType") && t2.uint32(26).string(e2.outputType), null != e2.options && Object.hasOwnProperty.call(e2, "options") && c.google.protobuf.MethodOptions.encode(e2.options, t2.uint32(34).fork()).ldelim(), null != e2.clientStreaming && Object.hasOwnProperty.call(e2, "clientStreaming") && t2.uint32(40).bool(e2.clientStreaming), null != e2.serverStreaming && Object.hasOwnProperty.call(e2, "serverStreaming") && t2.uint32(48).bool(e2.serverStreaming), t2;
      }, x.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, x.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.MethodDescriptorProto(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.name = e2.string();
              break;
            case 2:
              o2.inputType = e2.string();
              break;
            case 3:
              o2.outputType = e2.string();
              break;
            case 4:
              o2.options = c.google.protobuf.MethodOptions.decode(e2, e2.uint32());
              break;
            case 5:
              o2.clientStreaming = e2.bool();
              break;
            case 6:
              o2.serverStreaming = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, x.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, x.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name") && !u.isString(e2.name)) return "name: string expected";
        if (null != e2.inputType && e2.hasOwnProperty("inputType") && !u.isString(e2.inputType)) return "inputType: string expected";
        if (null != e2.outputType && e2.hasOwnProperty("outputType") && !u.isString(e2.outputType)) return "outputType: string expected";
        if (null != e2.options && e2.hasOwnProperty("options")) {
          var t2 = c.google.protobuf.MethodOptions.verify(e2.options);
          if (t2) return "options." + t2;
        }
        return null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && "boolean" != typeof e2.clientStreaming ? "clientStreaming: boolean expected" : null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && "boolean" != typeof e2.serverStreaming ? "serverStreaming: boolean expected" : null;
      }, x.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.MethodDescriptorProto) return e2;
        var t2 = new c.google.protobuf.MethodDescriptorProto();
        if (null != e2.name && (t2.name = String(e2.name)), null != e2.inputType && (t2.inputType = String(e2.inputType)), null != e2.outputType && (t2.outputType = String(e2.outputType)), null != e2.options) {
          if ("object" != typeof e2.options) throw TypeError(".google.protobuf.MethodDescriptorProto.options: object expected");
          t2.options = c.google.protobuf.MethodOptions.fromObject(e2.options);
        }
        return null != e2.clientStreaming && (t2.clientStreaming = Boolean(e2.clientStreaming)), null != e2.serverStreaming && (t2.serverStreaming = Boolean(e2.serverStreaming)), t2;
      }, x.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.name = "", n2.inputType = "", n2.outputType = "", n2.options = null, n2.clientStreaming = false, n2.serverStreaming = false), null != e2.name && e2.hasOwnProperty("name") && (n2.name = e2.name), null != e2.inputType && e2.hasOwnProperty("inputType") && (n2.inputType = e2.inputType), null != e2.outputType && e2.hasOwnProperty("outputType") && (n2.outputType = e2.outputType), null != e2.options && e2.hasOwnProperty("options") && (n2.options = c.google.protobuf.MethodOptions.toObject(e2.options, t2)), null != e2.clientStreaming && e2.hasOwnProperty("clientStreaming") && (n2.clientStreaming = e2.clientStreaming), null != e2.serverStreaming && e2.hasOwnProperty("serverStreaming") && (n2.serverStreaming = e2.serverStreaming), n2;
      }, x.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, x), n.FileOptions = (S.prototype.javaPackage = "", S.prototype.javaOuterClassname = "", S.prototype.javaMultipleFiles = false, S.prototype.javaGenerateEqualsAndHash = false, S.prototype.javaStringCheckUtf8 = false, S.prototype.optimizeFor = 1, S.prototype.goPackage = "", S.prototype.ccGenericServices = false, S.prototype.javaGenericServices = false, S.prototype.pyGenericServices = false, S.prototype.phpGenericServices = false, S.prototype.deprecated = false, S.prototype.ccEnableArenas = true, S.prototype.objcClassPrefix = "", S.prototype.csharpNamespace = "", S.prototype.swiftPrefix = "", S.prototype.phpClassPrefix = "", S.prototype.phpNamespace = "", S.prototype.phpMetadataNamespace = "", S.prototype.rubyPackage = "", S.prototype.uninterpretedOption = u.emptyArray, S.create = function(e2) {
        return new S(e2);
      }, S.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.javaPackage && Object.hasOwnProperty.call(e2, "javaPackage") && t2.uint32(10).string(e2.javaPackage), null != e2.javaOuterClassname && Object.hasOwnProperty.call(e2, "javaOuterClassname") && t2.uint32(66).string(e2.javaOuterClassname), null != e2.optimizeFor && Object.hasOwnProperty.call(e2, "optimizeFor") && t2.uint32(72).int32(e2.optimizeFor), null != e2.javaMultipleFiles && Object.hasOwnProperty.call(e2, "javaMultipleFiles") && t2.uint32(80).bool(e2.javaMultipleFiles), null != e2.goPackage && Object.hasOwnProperty.call(e2, "goPackage") && t2.uint32(90).string(e2.goPackage), null != e2.ccGenericServices && Object.hasOwnProperty.call(e2, "ccGenericServices") && t2.uint32(128).bool(e2.ccGenericServices), null != e2.javaGenericServices && Object.hasOwnProperty.call(e2, "javaGenericServices") && t2.uint32(136).bool(e2.javaGenericServices), null != e2.pyGenericServices && Object.hasOwnProperty.call(e2, "pyGenericServices") && t2.uint32(144).bool(e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && Object.hasOwnProperty.call(e2, "javaGenerateEqualsAndHash") && t2.uint32(160).bool(e2.javaGenerateEqualsAndHash), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(184).bool(e2.deprecated), null != e2.javaStringCheckUtf8 && Object.hasOwnProperty.call(e2, "javaStringCheckUtf8") && t2.uint32(216).bool(e2.javaStringCheckUtf8), null != e2.ccEnableArenas && Object.hasOwnProperty.call(e2, "ccEnableArenas") && t2.uint32(248).bool(e2.ccEnableArenas), null != e2.objcClassPrefix && Object.hasOwnProperty.call(e2, "objcClassPrefix") && t2.uint32(290).string(e2.objcClassPrefix), null != e2.csharpNamespace && Object.hasOwnProperty.call(e2, "csharpNamespace") && t2.uint32(298).string(e2.csharpNamespace), null != e2.swiftPrefix && Object.hasOwnProperty.call(e2, "swiftPrefix") && t2.uint32(314).string(e2.swiftPrefix), null != e2.phpClassPrefix && Object.hasOwnProperty.call(e2, "phpClassPrefix") && t2.uint32(322).string(e2.phpClassPrefix), null != e2.phpNamespace && Object.hasOwnProperty.call(e2, "phpNamespace") && t2.uint32(330).string(e2.phpNamespace), null != e2.phpGenericServices && Object.hasOwnProperty.call(e2, "phpGenericServices") && t2.uint32(336).bool(e2.phpGenericServices), null != e2.phpMetadataNamespace && Object.hasOwnProperty.call(e2, "phpMetadataNamespace") && t2.uint32(354).string(e2.phpMetadataNamespace), null != e2.rubyPackage && Object.hasOwnProperty.call(e2, "rubyPackage") && t2.uint32(362).string(e2.rubyPackage), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, S.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, S.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.FileOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.javaPackage = e2.string();
              break;
            case 8:
              o2.javaOuterClassname = e2.string();
              break;
            case 10:
              o2.javaMultipleFiles = e2.bool();
              break;
            case 20:
              o2.javaGenerateEqualsAndHash = e2.bool();
              break;
            case 27:
              o2.javaStringCheckUtf8 = e2.bool();
              break;
            case 9:
              o2.optimizeFor = e2.int32();
              break;
            case 11:
              o2.goPackage = e2.string();
              break;
            case 16:
              o2.ccGenericServices = e2.bool();
              break;
            case 17:
              o2.javaGenericServices = e2.bool();
              break;
            case 18:
              o2.pyGenericServices = e2.bool();
              break;
            case 42:
              o2.phpGenericServices = e2.bool();
              break;
            case 23:
              o2.deprecated = e2.bool();
              break;
            case 31:
              o2.ccEnableArenas = e2.bool();
              break;
            case 36:
              o2.objcClassPrefix = e2.string();
              break;
            case 37:
              o2.csharpNamespace = e2.string();
              break;
            case 39:
              o2.swiftPrefix = e2.string();
              break;
            case 40:
              o2.phpClassPrefix = e2.string();
              break;
            case 41:
              o2.phpNamespace = e2.string();
              break;
            case 44:
              o2.phpMetadataNamespace = e2.string();
              break;
            case 45:
              o2.rubyPackage = e2.string();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, S.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, S.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && !u.isString(e2.javaPackage)) return "javaPackage: string expected";
        if (null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && !u.isString(e2.javaOuterClassname)) return "javaOuterClassname: string expected";
        if (null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && "boolean" != typeof e2.javaMultipleFiles) return "javaMultipleFiles: boolean expected";
        if (null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && "boolean" != typeof e2.javaGenerateEqualsAndHash) return "javaGenerateEqualsAndHash: boolean expected";
        if (null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && "boolean" != typeof e2.javaStringCheckUtf8) return "javaStringCheckUtf8: boolean expected";
        if (null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor")) switch (e2.optimizeFor) {
          default:
            return "optimizeFor: enum value expected";
          case 1:
          case 2:
          case 3:
        }
        if (null != e2.goPackage && e2.hasOwnProperty("goPackage") && !u.isString(e2.goPackage)) return "goPackage: string expected";
        if (null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && "boolean" != typeof e2.ccGenericServices) return "ccGenericServices: boolean expected";
        if (null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && "boolean" != typeof e2.javaGenericServices) return "javaGenericServices: boolean expected";
        if (null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && "boolean" != typeof e2.pyGenericServices) return "pyGenericServices: boolean expected";
        if (null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && "boolean" != typeof e2.phpGenericServices) return "phpGenericServices: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && "boolean" != typeof e2.ccEnableArenas) return "ccEnableArenas: boolean expected";
        if (null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && !u.isString(e2.objcClassPrefix)) return "objcClassPrefix: string expected";
        if (null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && !u.isString(e2.csharpNamespace)) return "csharpNamespace: string expected";
        if (null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && !u.isString(e2.swiftPrefix)) return "swiftPrefix: string expected";
        if (null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && !u.isString(e2.phpClassPrefix)) return "phpClassPrefix: string expected";
        if (null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && !u.isString(e2.phpNamespace)) return "phpNamespace: string expected";
        if (null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && !u.isString(e2.phpMetadataNamespace)) return "phpMetadataNamespace: string expected";
        if (null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && !u.isString(e2.rubyPackage)) return "rubyPackage: string expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, S.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.FileOptions) return e2;
        var t2 = new c.google.protobuf.FileOptions();
        switch (null != e2.javaPackage && (t2.javaPackage = String(e2.javaPackage)), null != e2.javaOuterClassname && (t2.javaOuterClassname = String(e2.javaOuterClassname)), null != e2.javaMultipleFiles && (t2.javaMultipleFiles = Boolean(e2.javaMultipleFiles)), null != e2.javaGenerateEqualsAndHash && (t2.javaGenerateEqualsAndHash = Boolean(e2.javaGenerateEqualsAndHash)), null != e2.javaStringCheckUtf8 && (t2.javaStringCheckUtf8 = Boolean(e2.javaStringCheckUtf8)), e2.optimizeFor) {
          case "SPEED":
          case 1:
            t2.optimizeFor = 1;
            break;
          case "CODE_SIZE":
          case 2:
            t2.optimizeFor = 2;
            break;
          case "LITE_RUNTIME":
          case 3:
            t2.optimizeFor = 3;
        }
        if (null != e2.goPackage && (t2.goPackage = String(e2.goPackage)), null != e2.ccGenericServices && (t2.ccGenericServices = Boolean(e2.ccGenericServices)), null != e2.javaGenericServices && (t2.javaGenericServices = Boolean(e2.javaGenericServices)), null != e2.pyGenericServices && (t2.pyGenericServices = Boolean(e2.pyGenericServices)), null != e2.phpGenericServices && (t2.phpGenericServices = Boolean(e2.phpGenericServices)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.ccEnableArenas && (t2.ccEnableArenas = Boolean(e2.ccEnableArenas)), null != e2.objcClassPrefix && (t2.objcClassPrefix = String(e2.objcClassPrefix)), null != e2.csharpNamespace && (t2.csharpNamespace = String(e2.csharpNamespace)), null != e2.swiftPrefix && (t2.swiftPrefix = String(e2.swiftPrefix)), null != e2.phpClassPrefix && (t2.phpClassPrefix = String(e2.phpClassPrefix)), null != e2.phpNamespace && (t2.phpNamespace = String(e2.phpNamespace)), null != e2.phpMetadataNamespace && (t2.phpMetadataNamespace = String(e2.phpMetadataNamespace)), null != e2.rubyPackage && (t2.rubyPackage = String(e2.rubyPackage)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FileOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, S.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.javaPackage = "", n2.javaOuterClassname = "", n2.optimizeFor = t2.enums === String ? "SPEED" : 1, n2.javaMultipleFiles = false, n2.goPackage = "", n2.ccGenericServices = false, n2.javaGenericServices = false, n2.pyGenericServices = false, n2.javaGenerateEqualsAndHash = false, n2.deprecated = false, n2.javaStringCheckUtf8 = false, n2.ccEnableArenas = true, n2.objcClassPrefix = "", n2.csharpNamespace = "", n2.swiftPrefix = "", n2.phpClassPrefix = "", n2.phpNamespace = "", n2.phpGenericServices = false, n2.phpMetadataNamespace = "", n2.rubyPackage = ""), null != e2.javaPackage && e2.hasOwnProperty("javaPackage") && (n2.javaPackage = e2.javaPackage), null != e2.javaOuterClassname && e2.hasOwnProperty("javaOuterClassname") && (n2.javaOuterClassname = e2.javaOuterClassname), null != e2.optimizeFor && e2.hasOwnProperty("optimizeFor") && (n2.optimizeFor = t2.enums === String ? c.google.protobuf.FileOptions.OptimizeMode[e2.optimizeFor] : e2.optimizeFor), null != e2.javaMultipleFiles && e2.hasOwnProperty("javaMultipleFiles") && (n2.javaMultipleFiles = e2.javaMultipleFiles), null != e2.goPackage && e2.hasOwnProperty("goPackage") && (n2.goPackage = e2.goPackage), null != e2.ccGenericServices && e2.hasOwnProperty("ccGenericServices") && (n2.ccGenericServices = e2.ccGenericServices), null != e2.javaGenericServices && e2.hasOwnProperty("javaGenericServices") && (n2.javaGenericServices = e2.javaGenericServices), null != e2.pyGenericServices && e2.hasOwnProperty("pyGenericServices") && (n2.pyGenericServices = e2.pyGenericServices), null != e2.javaGenerateEqualsAndHash && e2.hasOwnProperty("javaGenerateEqualsAndHash") && (n2.javaGenerateEqualsAndHash = e2.javaGenerateEqualsAndHash), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.javaStringCheckUtf8 && e2.hasOwnProperty("javaStringCheckUtf8") && (n2.javaStringCheckUtf8 = e2.javaStringCheckUtf8), null != e2.ccEnableArenas && e2.hasOwnProperty("ccEnableArenas") && (n2.ccEnableArenas = e2.ccEnableArenas), null != e2.objcClassPrefix && e2.hasOwnProperty("objcClassPrefix") && (n2.objcClassPrefix = e2.objcClassPrefix), null != e2.csharpNamespace && e2.hasOwnProperty("csharpNamespace") && (n2.csharpNamespace = e2.csharpNamespace), null != e2.swiftPrefix && e2.hasOwnProperty("swiftPrefix") && (n2.swiftPrefix = e2.swiftPrefix), null != e2.phpClassPrefix && e2.hasOwnProperty("phpClassPrefix") && (n2.phpClassPrefix = e2.phpClassPrefix), null != e2.phpNamespace && e2.hasOwnProperty("phpNamespace") && (n2.phpNamespace = e2.phpNamespace), null != e2.phpGenericServices && e2.hasOwnProperty("phpGenericServices") && (n2.phpGenericServices = e2.phpGenericServices), null != e2.phpMetadataNamespace && e2.hasOwnProperty("phpMetadataNamespace") && (n2.phpMetadataNamespace = e2.phpMetadataNamespace), null != e2.rubyPackage && e2.hasOwnProperty("rubyPackage") && (n2.rubyPackage = e2.rubyPackage), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, S.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, S.OptimizeMode = (e = {}, (t = Object.create(e))[e[1] = "SPEED"] = 1, t[e[2] = "CODE_SIZE"] = 2, t[e[3] = "LITE_RUNTIME"] = 3, t), S), n.MessageOptions = (k.prototype.messageSetWireFormat = false, k.prototype.noStandardDescriptorAccessor = false, k.prototype.deprecated = false, k.prototype.mapEntry = false, k.prototype.uninterpretedOption = u.emptyArray, k.create = function(e2) {
        return new k(e2);
      }, k.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.messageSetWireFormat && Object.hasOwnProperty.call(e2, "messageSetWireFormat") && t2.uint32(8).bool(e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && Object.hasOwnProperty.call(e2, "noStandardDescriptorAccessor") && t2.uint32(16).bool(e2.noStandardDescriptorAccessor), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.mapEntry && Object.hasOwnProperty.call(e2, "mapEntry") && t2.uint32(56).bool(e2.mapEntry), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, k.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, k.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.MessageOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.messageSetWireFormat = e2.bool();
              break;
            case 2:
              o2.noStandardDescriptorAccessor = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 7:
              o2.mapEntry = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, k.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, k.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && "boolean" != typeof e2.messageSetWireFormat) return "messageSetWireFormat: boolean expected";
        if (null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && "boolean" != typeof e2.noStandardDescriptorAccessor) return "noStandardDescriptorAccessor: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && "boolean" != typeof e2.mapEntry) return "mapEntry: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, k.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.MessageOptions) return e2;
        var t2 = new c.google.protobuf.MessageOptions();
        if (null != e2.messageSetWireFormat && (t2.messageSetWireFormat = Boolean(e2.messageSetWireFormat)), null != e2.noStandardDescriptorAccessor && (t2.noStandardDescriptorAccessor = Boolean(e2.noStandardDescriptorAccessor)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.mapEntry && (t2.mapEntry = Boolean(e2.mapEntry)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MessageOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, k.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.messageSetWireFormat = false, n2.noStandardDescriptorAccessor = false, n2.deprecated = false, n2.mapEntry = false), null != e2.messageSetWireFormat && e2.hasOwnProperty("messageSetWireFormat") && (n2.messageSetWireFormat = e2.messageSetWireFormat), null != e2.noStandardDescriptorAccessor && e2.hasOwnProperty("noStandardDescriptorAccessor") && (n2.noStandardDescriptorAccessor = e2.noStandardDescriptorAccessor), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.mapEntry && e2.hasOwnProperty("mapEntry") && (n2.mapEntry = e2.mapEntry), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, k.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, k), n.FieldOptions = (D.prototype.ctype = 0, D.prototype.packed = false, D.prototype.jstype = 0, D.prototype.lazy = false, D.prototype.deprecated = false, D.prototype.weak = false, D.prototype.uninterpretedOption = u.emptyArray, D.create = function(e2) {
        return new D(e2);
      }, D.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.ctype && Object.hasOwnProperty.call(e2, "ctype") && t2.uint32(8).int32(e2.ctype), null != e2.packed && Object.hasOwnProperty.call(e2, "packed") && t2.uint32(16).bool(e2.packed), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.lazy && Object.hasOwnProperty.call(e2, "lazy") && t2.uint32(40).bool(e2.lazy), null != e2.jstype && Object.hasOwnProperty.call(e2, "jstype") && t2.uint32(48).int32(e2.jstype), null != e2.weak && Object.hasOwnProperty.call(e2, "weak") && t2.uint32(80).bool(e2.weak), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, D.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, D.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.FieldOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.ctype = e2.int32();
              break;
            case 2:
              o2.packed = e2.bool();
              break;
            case 6:
              o2.jstype = e2.int32();
              break;
            case 5:
              o2.lazy = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 10:
              o2.weak = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, D.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, D.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.ctype && e2.hasOwnProperty("ctype")) switch (e2.ctype) {
          default:
            return "ctype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.packed && e2.hasOwnProperty("packed") && "boolean" != typeof e2.packed) return "packed: boolean expected";
        if (null != e2.jstype && e2.hasOwnProperty("jstype")) switch (e2.jstype) {
          default:
            return "jstype: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.lazy && e2.hasOwnProperty("lazy") && "boolean" != typeof e2.lazy) return "lazy: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.weak && e2.hasOwnProperty("weak") && "boolean" != typeof e2.weak) return "weak: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, D.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.FieldOptions) return e2;
        var t2 = new c.google.protobuf.FieldOptions();
        switch (e2.ctype) {
          case "STRING":
          case 0:
            t2.ctype = 0;
            break;
          case "CORD":
          case 1:
            t2.ctype = 1;
            break;
          case "STRING_PIECE":
          case 2:
            t2.ctype = 2;
        }
        switch (null != e2.packed && (t2.packed = Boolean(e2.packed)), e2.jstype) {
          case "JS_NORMAL":
          case 0:
            t2.jstype = 0;
            break;
          case "JS_STRING":
          case 1:
            t2.jstype = 1;
            break;
          case "JS_NUMBER":
          case 2:
            t2.jstype = 2;
        }
        if (null != e2.lazy && (t2.lazy = Boolean(e2.lazy)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), null != e2.weak && (t2.weak = Boolean(e2.weak)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.FieldOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, D.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.ctype = t2.enums === String ? "STRING" : 0, n2.packed = false, n2.deprecated = false, n2.lazy = false, n2.jstype = t2.enums === String ? "JS_NORMAL" : 0, n2.weak = false), null != e2.ctype && e2.hasOwnProperty("ctype") && (n2.ctype = t2.enums === String ? c.google.protobuf.FieldOptions.CType[e2.ctype] : e2.ctype), null != e2.packed && e2.hasOwnProperty("packed") && (n2.packed = e2.packed), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.lazy && e2.hasOwnProperty("lazy") && (n2.lazy = e2.lazy), null != e2.jstype && e2.hasOwnProperty("jstype") && (n2.jstype = t2.enums === String ? c.google.protobuf.FieldOptions.JSType[e2.jstype] : e2.jstype), null != e2.weak && e2.hasOwnProperty("weak") && (n2.weak = e2.weak), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, D.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, D.CType = (e = {}, (t = Object.create(e))[e[0] = "STRING"] = 0, t[e[1] = "CORD"] = 1, t[e[2] = "STRING_PIECE"] = 2, t), D.JSType = (e = {}, (t = Object.create(e))[e[0] = "JS_NORMAL"] = 0, t[e[1] = "JS_STRING"] = 1, t[e[2] = "JS_NUMBER"] = 2, t), D), n.OneofOptions = (M.prototype.uninterpretedOption = u.emptyArray, M.create = function(e2) {
        return new M(e2);
      }, M.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, M.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, M.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.OneofOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 999 ? (o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, M.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, M.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, M.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.OneofOptions) return e2;
        var t2 = new c.google.protobuf.OneofOptions();
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.OneofOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, M.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, M.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, M), n.EnumOptions = (T.prototype.allowAlias = false, T.prototype.deprecated = false, T.prototype.uninterpretedOption = u.emptyArray, T.create = function(e2) {
        return new T(e2);
      }, T.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.allowAlias && Object.hasOwnProperty.call(e2, "allowAlias") && t2.uint32(16).bool(e2.allowAlias), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(24).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, T.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, T.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.EnumOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.allowAlias = e2.bool();
              break;
            case 3:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, T.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, T.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && "boolean" != typeof e2.allowAlias) return "allowAlias: boolean expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, T.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.EnumOptions) return e2;
        var t2 = new c.google.protobuf.EnumOptions();
        if (null != e2.allowAlias && (t2.allowAlias = Boolean(e2.allowAlias)), null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, T.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.allowAlias = false, n2.deprecated = false), null != e2.allowAlias && e2.hasOwnProperty("allowAlias") && (n2.allowAlias = e2.allowAlias), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, T.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, T), n.EnumValueOptions = (E.prototype.deprecated = false, E.prototype.uninterpretedOption = u.emptyArray, E.create = function(e2) {
        return new E(e2);
      }, E.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(8).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return t2;
      }, E.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, E.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.EnumValueOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, E.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, E.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null;
      }, E.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.EnumValueOptions) return e2;
        var t2 = new c.google.protobuf.EnumValueOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.EnumValueOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return t2;
      }, E.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return n2;
      }, E.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, E), n.ServiceOptions = (A.prototype.deprecated = false, A.prototype.uninterpretedOption = u.emptyArray, A.prototype[".google.api.defaultHost"] = "", A.prototype[".google.api.oauthScopes"] = "", A.create = function(e2) {
        return new A(e2);
      }, A.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        return null != e2[".google.api.defaultHost"] && Object.hasOwnProperty.call(e2, ".google.api.defaultHost") && t2.uint32(8394).string(e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && Object.hasOwnProperty.call(e2, ".google.api.oauthScopes") && t2.uint32(8402).string(e2[".google.api.oauthScopes"]), t2;
      }, A.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, A.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.ServiceOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 1049:
              o2[".google.api.defaultHost"] = e2.string();
              break;
            case 1050:
              o2[".google.api.oauthScopes"] = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, A.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, A.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2]);
            if (n2) return "uninterpretedOption." + n2;
          }
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && !u.isString(e2[".google.api.defaultHost"]) ? ".google.api.defaultHost: string expected" : null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && !u.isString(e2[".google.api.oauthScopes"]) ? ".google.api.oauthScopes: string expected" : null;
      }, A.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.ServiceOptions) return e2;
        var t2 = new c.google.protobuf.ServiceOptions();
        if (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.ServiceOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        return null != e2[".google.api.defaultHost"] && (t2[".google.api.defaultHost"] = String(e2[".google.api.defaultHost"])), null != e2[".google.api.oauthScopes"] && (t2[".google.api.oauthScopes"] = String(e2[".google.api.oauthScopes"])), t2;
      }, A.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = []), t2.defaults && (n2.deprecated = false, n2[".google.api.defaultHost"] = "", n2[".google.api.oauthScopes"] = ""), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        return null != e2[".google.api.defaultHost"] && e2.hasOwnProperty(".google.api.defaultHost") && (n2[".google.api.defaultHost"] = e2[".google.api.defaultHost"]), null != e2[".google.api.oauthScopes"] && e2.hasOwnProperty(".google.api.oauthScopes") && (n2[".google.api.oauthScopes"] = e2[".google.api.oauthScopes"]), n2;
      }, A.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, A), n.MethodOptions = (N.prototype.deprecated = false, N.prototype.idempotencyLevel = 0, N.prototype.uninterpretedOption = u.emptyArray, N.prototype[".google.api.http"] = null, N.prototype[".google.api.methodSignature"] = u.emptyArray, N.create = function(e2) {
        return new N(e2);
      }, N.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.deprecated && Object.hasOwnProperty.call(e2, "deprecated") && t2.uint32(264).bool(e2.deprecated), null != e2.idempotencyLevel && Object.hasOwnProperty.call(e2, "idempotencyLevel") && t2.uint32(272).int32(e2.idempotencyLevel), null != e2.uninterpretedOption && e2.uninterpretedOption.length) for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) c.google.protobuf.UninterpretedOption.encode(e2.uninterpretedOption[n2], t2.uint32(7994).fork()).ldelim();
        if (null != e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2.uint32(8410).string(e2[".google.api.methodSignature"][n2]);
        return null != e2[".google.api.http"] && Object.hasOwnProperty.call(e2, ".google.api.http") && c.google.api.HttpRule.encode(e2[".google.api.http"], t2.uint32(578365826).fork()).ldelim(), t2;
      }, N.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, N.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.MethodOptions(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 33:
              o2.deprecated = e2.bool();
              break;
            case 34:
              o2.idempotencyLevel = e2.int32();
              break;
            case 999:
              o2.uninterpretedOption && o2.uninterpretedOption.length || (o2.uninterpretedOption = []), o2.uninterpretedOption.push(c.google.protobuf.UninterpretedOption.decode(e2, e2.uint32()));
              break;
            case 72295728:
              o2[".google.api.http"] = c.google.api.HttpRule.decode(e2, e2.uint32());
              break;
            case 1051:
              o2[".google.api.methodSignature"] && o2[".google.api.methodSignature"].length || (o2[".google.api.methodSignature"] = []), o2[".google.api.methodSignature"].push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, N.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, N.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.deprecated && e2.hasOwnProperty("deprecated") && "boolean" != typeof e2.deprecated) return "deprecated: boolean expected";
        if (null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel")) switch (e2.idempotencyLevel) {
          default:
            return "idempotencyLevel: enum value expected";
          case 0:
          case 1:
          case 2:
        }
        if (null != e2.uninterpretedOption && e2.hasOwnProperty("uninterpretedOption")) {
          if (!Array.isArray(e2.uninterpretedOption)) return "uninterpretedOption: array expected";
          for (var t2 = 0; t2 < e2.uninterpretedOption.length; ++t2) if (n2 = c.google.protobuf.UninterpretedOption.verify(e2.uninterpretedOption[t2])) return "uninterpretedOption." + n2;
        }
        var n2;
        if (null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2 = c.google.api.HttpRule.verify(e2[".google.api.http"]))) return ".google.api.http." + n2;
        if (null != e2[".google.api.methodSignature"] && e2.hasOwnProperty(".google.api.methodSignature")) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) return ".google.api.methodSignature: array expected";
          for (t2 = 0; t2 < e2[".google.api.methodSignature"].length; ++t2) if (!u.isString(e2[".google.api.methodSignature"][t2])) return ".google.api.methodSignature: string[] expected";
        }
        return null;
      }, N.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.MethodOptions) return e2;
        var t2 = new c.google.protobuf.MethodOptions();
        switch (null != e2.deprecated && (t2.deprecated = Boolean(e2.deprecated)), e2.idempotencyLevel) {
          case "IDEMPOTENCY_UNKNOWN":
          case 0:
            t2.idempotencyLevel = 0;
            break;
          case "NO_SIDE_EFFECTS":
          case 1:
            t2.idempotencyLevel = 1;
            break;
          case "IDEMPOTENT":
          case 2:
            t2.idempotencyLevel = 2;
        }
        if (e2.uninterpretedOption) {
          if (!Array.isArray(e2.uninterpretedOption)) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: array expected");
          t2.uninterpretedOption = [];
          for (var n2 = 0; n2 < e2.uninterpretedOption.length; ++n2) {
            if ("object" != typeof e2.uninterpretedOption[n2]) throw TypeError(".google.protobuf.MethodOptions.uninterpretedOption: object expected");
            t2.uninterpretedOption[n2] = c.google.protobuf.UninterpretedOption.fromObject(e2.uninterpretedOption[n2]);
          }
        }
        if (null != e2[".google.api.http"]) {
          if ("object" != typeof e2[".google.api.http"]) throw TypeError(".google.protobuf.MethodOptions..google.api.http: object expected");
          t2[".google.api.http"] = c.google.api.HttpRule.fromObject(e2[".google.api.http"]);
        }
        if (e2[".google.api.methodSignature"]) {
          if (!Array.isArray(e2[".google.api.methodSignature"])) throw TypeError(".google.protobuf.MethodOptions..google.api.methodSignature: array expected");
          t2[".google.api.methodSignature"] = [];
          for (n2 = 0; n2 < e2[".google.api.methodSignature"].length; ++n2) t2[".google.api.methodSignature"][n2] = String(e2[".google.api.methodSignature"][n2]);
        }
        return t2;
      }, N.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.uninterpretedOption = [], n2[".google.api.methodSignature"] = []), t2.defaults && (n2.deprecated = false, n2.idempotencyLevel = t2.enums === String ? "IDEMPOTENCY_UNKNOWN" : 0, n2[".google.api.http"] = null), null != e2.deprecated && e2.hasOwnProperty("deprecated") && (n2.deprecated = e2.deprecated), null != e2.idempotencyLevel && e2.hasOwnProperty("idempotencyLevel") && (n2.idempotencyLevel = t2.enums === String ? c.google.protobuf.MethodOptions.IdempotencyLevel[e2.idempotencyLevel] : e2.idempotencyLevel), e2.uninterpretedOption && e2.uninterpretedOption.length) {
          n2.uninterpretedOption = [];
          for (var o2 = 0; o2 < e2.uninterpretedOption.length; ++o2) n2.uninterpretedOption[o2] = c.google.protobuf.UninterpretedOption.toObject(e2.uninterpretedOption[o2], t2);
        }
        if (e2[".google.api.methodSignature"] && e2[".google.api.methodSignature"].length) {
          n2[".google.api.methodSignature"] = [];
          for (o2 = 0; o2 < e2[".google.api.methodSignature"].length; ++o2) n2[".google.api.methodSignature"][o2] = e2[".google.api.methodSignature"][o2];
        }
        return null != e2[".google.api.http"] && e2.hasOwnProperty(".google.api.http") && (n2[".google.api.http"] = c.google.api.HttpRule.toObject(e2[".google.api.http"], t2)), n2;
      }, N.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, N.IdempotencyLevel = (e = {}, (t = Object.create(e))[e[0] = "IDEMPOTENCY_UNKNOWN"] = 0, t[e[1] = "NO_SIDE_EFFECTS"] = 1, t[e[2] = "IDEMPOTENT"] = 2, t), N), n.UninterpretedOption = (I.prototype.name = u.emptyArray, I.prototype.identifierValue = "", I.prototype.positiveIntValue = u.Long ? u.Long.fromBits(0, 0, true) : 0, I.prototype.negativeIntValue = u.Long ? u.Long.fromBits(0, 0, false) : 0, I.prototype.doubleValue = 0, I.prototype.stringValue = u.newBuffer([]), I.prototype.aggregateValue = "", I.create = function(e2) {
        return new I(e2);
      }, I.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.name && e2.name.length) for (var n2 = 0; n2 < e2.name.length; ++n2) c.google.protobuf.UninterpretedOption.NamePart.encode(e2.name[n2], t2.uint32(18).fork()).ldelim();
        return null != e2.identifierValue && Object.hasOwnProperty.call(e2, "identifierValue") && t2.uint32(26).string(e2.identifierValue), null != e2.positiveIntValue && Object.hasOwnProperty.call(e2, "positiveIntValue") && t2.uint32(32).uint64(e2.positiveIntValue), null != e2.negativeIntValue && Object.hasOwnProperty.call(e2, "negativeIntValue") && t2.uint32(40).int64(e2.negativeIntValue), null != e2.doubleValue && Object.hasOwnProperty.call(e2, "doubleValue") && t2.uint32(49).double(e2.doubleValue), null != e2.stringValue && Object.hasOwnProperty.call(e2, "stringValue") && t2.uint32(58).bytes(e2.stringValue), null != e2.aggregateValue && Object.hasOwnProperty.call(e2, "aggregateValue") && t2.uint32(66).string(e2.aggregateValue), t2;
      }, I.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, I.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.UninterpretedOption(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 2:
              o2.name && o2.name.length || (o2.name = []), o2.name.push(c.google.protobuf.UninterpretedOption.NamePart.decode(e2, e2.uint32()));
              break;
            case 3:
              o2.identifierValue = e2.string();
              break;
            case 4:
              o2.positiveIntValue = e2.uint64();
              break;
            case 5:
              o2.negativeIntValue = e2.int64();
              break;
            case 6:
              o2.doubleValue = e2.double();
              break;
            case 7:
              o2.stringValue = e2.bytes();
              break;
            case 8:
              o2.aggregateValue = e2.string();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, I.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, I.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.name && e2.hasOwnProperty("name")) {
          if (!Array.isArray(e2.name)) return "name: array expected";
          for (var t2 = 0; t2 < e2.name.length; ++t2) {
            var n2 = c.google.protobuf.UninterpretedOption.NamePart.verify(e2.name[t2]);
            if (n2) return "name." + n2;
          }
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && !u.isString(e2.identifierValue) ? "identifierValue: string expected" : null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && !(u.isInteger(e2.positiveIntValue) || e2.positiveIntValue && u.isInteger(e2.positiveIntValue.low) && u.isInteger(e2.positiveIntValue.high)) ? "positiveIntValue: integer|Long expected" : null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && !(u.isInteger(e2.negativeIntValue) || e2.negativeIntValue && u.isInteger(e2.negativeIntValue.low) && u.isInteger(e2.negativeIntValue.high)) ? "negativeIntValue: integer|Long expected" : null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && "number" != typeof e2.doubleValue ? "doubleValue: number expected" : null != e2.stringValue && e2.hasOwnProperty("stringValue") && !(e2.stringValue && "number" == typeof e2.stringValue.length || u.isString(e2.stringValue)) ? "stringValue: buffer expected" : null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && !u.isString(e2.aggregateValue) ? "aggregateValue: string expected" : null;
      }, I.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.UninterpretedOption) return e2;
        var t2 = new c.google.protobuf.UninterpretedOption();
        if (e2.name) {
          if (!Array.isArray(e2.name)) throw TypeError(".google.protobuf.UninterpretedOption.name: array expected");
          t2.name = [];
          for (var n2 = 0; n2 < e2.name.length; ++n2) {
            if ("object" != typeof e2.name[n2]) throw TypeError(".google.protobuf.UninterpretedOption.name: object expected");
            t2.name[n2] = c.google.protobuf.UninterpretedOption.NamePart.fromObject(e2.name[n2]);
          }
        }
        return null != e2.identifierValue && (t2.identifierValue = String(e2.identifierValue)), null != e2.positiveIntValue && (u.Long ? (t2.positiveIntValue = u.Long.fromValue(e2.positiveIntValue)).unsigned = true : "string" == typeof e2.positiveIntValue ? t2.positiveIntValue = parseInt(e2.positiveIntValue, 10) : "number" == typeof e2.positiveIntValue ? t2.positiveIntValue = e2.positiveIntValue : "object" == typeof e2.positiveIntValue && (t2.positiveIntValue = new u.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true))), null != e2.negativeIntValue && (u.Long ? (t2.negativeIntValue = u.Long.fromValue(e2.negativeIntValue)).unsigned = false : "string" == typeof e2.negativeIntValue ? t2.negativeIntValue = parseInt(e2.negativeIntValue, 10) : "number" == typeof e2.negativeIntValue ? t2.negativeIntValue = e2.negativeIntValue : "object" == typeof e2.negativeIntValue && (t2.negativeIntValue = new u.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber())), null != e2.doubleValue && (t2.doubleValue = Number(e2.doubleValue)), null != e2.stringValue && ("string" == typeof e2.stringValue ? u.base64.decode(e2.stringValue, t2.stringValue = u.newBuffer(u.base64.length(e2.stringValue)), 0) : e2.stringValue.length && (t2.stringValue = e2.stringValue)), null != e2.aggregateValue && (t2.aggregateValue = String(e2.aggregateValue)), t2;
      }, I.toObject = function(e2, t2) {
        var n2, o2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (o2.name = []), t2.defaults && (o2.identifierValue = "", u.Long ? (n2 = new u.Long(0, 0, true), o2.positiveIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.positiveIntValue = t2.longs === String ? "0" : 0, u.Long ? (n2 = new u.Long(0, 0, false), o2.negativeIntValue = t2.longs === String ? n2.toString() : t2.longs === Number ? n2.toNumber() : n2) : o2.negativeIntValue = t2.longs === String ? "0" : 0, o2.doubleValue = 0, t2.bytes === String ? o2.stringValue = "" : (o2.stringValue = [], t2.bytes !== Array && (o2.stringValue = u.newBuffer(o2.stringValue))), o2.aggregateValue = ""), e2.name && e2.name.length) {
          o2.name = [];
          for (var r2 = 0; r2 < e2.name.length; ++r2) o2.name[r2] = c.google.protobuf.UninterpretedOption.NamePart.toObject(e2.name[r2], t2);
        }
        return null != e2.identifierValue && e2.hasOwnProperty("identifierValue") && (o2.identifierValue = e2.identifierValue), null != e2.positiveIntValue && e2.hasOwnProperty("positiveIntValue") && ("number" == typeof e2.positiveIntValue ? o2.positiveIntValue = t2.longs === String ? String(e2.positiveIntValue) : e2.positiveIntValue : o2.positiveIntValue = t2.longs === String ? u.Long.prototype.toString.call(e2.positiveIntValue) : t2.longs === Number ? new u.LongBits(e2.positiveIntValue.low >>> 0, e2.positiveIntValue.high >>> 0).toNumber(true) : e2.positiveIntValue), null != e2.negativeIntValue && e2.hasOwnProperty("negativeIntValue") && ("number" == typeof e2.negativeIntValue ? o2.negativeIntValue = t2.longs === String ? String(e2.negativeIntValue) : e2.negativeIntValue : o2.negativeIntValue = t2.longs === String ? u.Long.prototype.toString.call(e2.negativeIntValue) : t2.longs === Number ? new u.LongBits(e2.negativeIntValue.low >>> 0, e2.negativeIntValue.high >>> 0).toNumber() : e2.negativeIntValue), null != e2.doubleValue && e2.hasOwnProperty("doubleValue") && (o2.doubleValue = t2.json && !isFinite(e2.doubleValue) ? String(e2.doubleValue) : e2.doubleValue), null != e2.stringValue && e2.hasOwnProperty("stringValue") && (o2.stringValue = t2.bytes === String ? u.base64.encode(e2.stringValue, 0, e2.stringValue.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.stringValue) : e2.stringValue), null != e2.aggregateValue && e2.hasOwnProperty("aggregateValue") && (o2.aggregateValue = e2.aggregateValue), o2;
      }, I.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, I.NamePart = (R.prototype.namePart = "", R.prototype.isExtension = false, R.create = function(e2) {
        return new R(e2);
      }, R.encode = function(e2, t2) {
        return (t2 = t2 || r.create()).uint32(10).string(e2.namePart), t2.uint32(16).bool(e2.isExtension), t2;
      }, R.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, R.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.UninterpretedOption.NamePart(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.namePart = e2.string();
              break;
            case 2:
              o2.isExtension = e2.bool();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        if (!o2.hasOwnProperty("namePart")) throw u.ProtocolError("missing required 'namePart'", { instance: o2 });
        if (o2.hasOwnProperty("isExtension")) return o2;
        throw u.ProtocolError("missing required 'isExtension'", { instance: o2 });
      }, R.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, R.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : u.isString(e2.namePart) ? "boolean" != typeof e2.isExtension ? "isExtension: boolean expected" : null : "namePart: string expected";
      }, R.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.protobuf.UninterpretedOption.NamePart ? e2 : (t2 = new c.google.protobuf.UninterpretedOption.NamePart(), null != e2.namePart && (t2.namePart = String(e2.namePart)), null != e2.isExtension && (t2.isExtension = Boolean(e2.isExtension)), t2);
      }, R.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.namePart = "", n2.isExtension = false), null != e2.namePart && e2.hasOwnProperty("namePart") && (n2.namePart = e2.namePart), null != e2.isExtension && e2.hasOwnProperty("isExtension") && (n2.isExtension = e2.isExtension), n2;
      }, R.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, R), I), n.SourceCodeInfo = (_.prototype.location = u.emptyArray, _.create = function(e2) {
        return new _(e2);
      }, _.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.location && e2.location.length) for (var n2 = 0; n2 < e2.location.length; ++n2) c.google.protobuf.SourceCodeInfo.Location.encode(e2.location[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, _.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, _.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.SourceCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.location && o2.location.length || (o2.location = []), o2.location.push(c.google.protobuf.SourceCodeInfo.Location.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, _.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, _.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.location && e2.hasOwnProperty("location")) {
          if (!Array.isArray(e2.location)) return "location: array expected";
          for (var t2 = 0; t2 < e2.location.length; ++t2) {
            var n2 = c.google.protobuf.SourceCodeInfo.Location.verify(e2.location[t2]);
            if (n2) return "location." + n2;
          }
        }
        return null;
      }, _.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.SourceCodeInfo) return e2;
        var t2 = new c.google.protobuf.SourceCodeInfo();
        if (e2.location) {
          if (!Array.isArray(e2.location)) throw TypeError(".google.protobuf.SourceCodeInfo.location: array expected");
          t2.location = [];
          for (var n2 = 0; n2 < e2.location.length; ++n2) {
            if ("object" != typeof e2.location[n2]) throw TypeError(".google.protobuf.SourceCodeInfo.location: object expected");
            t2.location[n2] = c.google.protobuf.SourceCodeInfo.Location.fromObject(e2.location[n2]);
          }
        }
        return t2;
      }, _.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.location = []), e2.location && e2.location.length) {
          n2.location = [];
          for (var o2 = 0; o2 < e2.location.length; ++o2) n2.location[o2] = c.google.protobuf.SourceCodeInfo.Location.toObject(e2.location[o2], t2);
        }
        return n2;
      }, _.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, _.Location = (C.prototype.path = u.emptyArray, C.prototype.span = u.emptyArray, C.prototype.leadingComments = "", C.prototype.trailingComments = "", C.prototype.leadingDetachedComments = u.emptyArray, C.create = function(e2) {
        return new C(e2);
      }, C.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        if (null != e2.span && e2.span.length) {
          t2.uint32(18).fork();
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.int32(e2.span[n2]);
          t2.ldelim();
        }
        if (null != e2.leadingComments && Object.hasOwnProperty.call(e2, "leadingComments") && t2.uint32(26).string(e2.leadingComments), null != e2.trailingComments && Object.hasOwnProperty.call(e2, "trailingComments") && t2.uint32(34).string(e2.trailingComments), null != e2.leadingDetachedComments && e2.leadingDetachedComments.length) for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.uint32(50).string(e2.leadingDetachedComments[n2]);
        return t2;
      }, C.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, C.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.SourceCodeInfo.Location(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              if (o2.span && o2.span.length || (o2.span = []), 2 == (7 & r2)) for (i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.span.push(e2.int32());
              else o2.span.push(e2.int32());
              break;
            case 3:
              o2.leadingComments = e2.string();
              break;
            case 4:
              o2.trailingComments = e2.string();
              break;
            case 6:
              o2.leadingDetachedComments && o2.leadingDetachedComments.length || (o2.leadingDetachedComments = []), o2.leadingDetachedComments.push(e2.string());
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, C.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, C.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!u.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        if (null != e2.span && e2.hasOwnProperty("span")) {
          if (!Array.isArray(e2.span)) return "span: array expected";
          for (t2 = 0; t2 < e2.span.length; ++t2) if (!u.isInteger(e2.span[t2])) return "span: integer[] expected";
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && !u.isString(e2.leadingComments)) return "leadingComments: string expected";
        if (null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && !u.isString(e2.trailingComments)) return "trailingComments: string expected";
        if (null != e2.leadingDetachedComments && e2.hasOwnProperty("leadingDetachedComments")) {
          if (!Array.isArray(e2.leadingDetachedComments)) return "leadingDetachedComments: array expected";
          for (t2 = 0; t2 < e2.leadingDetachedComments.length; ++t2) if (!u.isString(e2.leadingDetachedComments[t2])) return "leadingDetachedComments: string[] expected";
        }
        return null;
      }, C.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.SourceCodeInfo.Location) return e2;
        var t2 = new c.google.protobuf.SourceCodeInfo.Location();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        if (e2.span) {
          if (!Array.isArray(e2.span)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.span: array expected");
          t2.span = [];
          for (n2 = 0; n2 < e2.span.length; ++n2) t2.span[n2] = 0 | e2.span[n2];
        }
        if (null != e2.leadingComments && (t2.leadingComments = String(e2.leadingComments)), null != e2.trailingComments && (t2.trailingComments = String(e2.trailingComments)), e2.leadingDetachedComments) {
          if (!Array.isArray(e2.leadingDetachedComments)) throw TypeError(".google.protobuf.SourceCodeInfo.Location.leadingDetachedComments: array expected");
          t2.leadingDetachedComments = [];
          for (n2 = 0; n2 < e2.leadingDetachedComments.length; ++n2) t2.leadingDetachedComments[n2] = String(e2.leadingDetachedComments[n2]);
        }
        return t2;
      }, C.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = [], n2.span = [], n2.leadingDetachedComments = []), t2.defaults && (n2.leadingComments = "", n2.trailingComments = ""), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        if (e2.span && e2.span.length) {
          n2.span = [];
          for (o2 = 0; o2 < e2.span.length; ++o2) n2.span[o2] = e2.span[o2];
        }
        if (null != e2.leadingComments && e2.hasOwnProperty("leadingComments") && (n2.leadingComments = e2.leadingComments), null != e2.trailingComments && e2.hasOwnProperty("trailingComments") && (n2.trailingComments = e2.trailingComments), e2.leadingDetachedComments && e2.leadingDetachedComments.length) {
          n2.leadingDetachedComments = [];
          for (o2 = 0; o2 < e2.leadingDetachedComments.length; ++o2) n2.leadingDetachedComments[o2] = e2.leadingDetachedComments[o2];
        }
        return n2;
      }, C.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, C), _), n.GeneratedCodeInfo = (J.prototype.annotation = u.emptyArray, J.create = function(e2) {
        return new J(e2);
      }, J.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.annotation && e2.annotation.length) for (var n2 = 0; n2 < e2.annotation.length; ++n2) c.google.protobuf.GeneratedCodeInfo.Annotation.encode(e2.annotation[n2], t2.uint32(10).fork()).ldelim();
        return t2;
      }, J.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, J.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.GeneratedCodeInfo(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          r2 >>> 3 == 1 ? (o2.annotation && o2.annotation.length || (o2.annotation = []), o2.annotation.push(c.google.protobuf.GeneratedCodeInfo.Annotation.decode(e2, e2.uint32()))) : e2.skipType(7 & r2);
        }
        return o2;
      }, J.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, J.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.annotation && e2.hasOwnProperty("annotation")) {
          if (!Array.isArray(e2.annotation)) return "annotation: array expected";
          for (var t2 = 0; t2 < e2.annotation.length; ++t2) {
            var n2 = c.google.protobuf.GeneratedCodeInfo.Annotation.verify(e2.annotation[t2]);
            if (n2) return "annotation." + n2;
          }
        }
        return null;
      }, J.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.GeneratedCodeInfo) return e2;
        var t2 = new c.google.protobuf.GeneratedCodeInfo();
        if (e2.annotation) {
          if (!Array.isArray(e2.annotation)) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: array expected");
          t2.annotation = [];
          for (var n2 = 0; n2 < e2.annotation.length; ++n2) {
            if ("object" != typeof e2.annotation[n2]) throw TypeError(".google.protobuf.GeneratedCodeInfo.annotation: object expected");
            t2.annotation[n2] = c.google.protobuf.GeneratedCodeInfo.Annotation.fromObject(e2.annotation[n2]);
          }
        }
        return t2;
      }, J.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.annotation = []), e2.annotation && e2.annotation.length) {
          n2.annotation = [];
          for (var o2 = 0; o2 < e2.annotation.length; ++o2) n2.annotation[o2] = c.google.protobuf.GeneratedCodeInfo.Annotation.toObject(e2.annotation[o2], t2);
        }
        return n2;
      }, J.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, J.Annotation = (V.prototype.path = u.emptyArray, V.prototype.sourceFile = "", V.prototype.begin = 0, V.prototype.end = 0, V.create = function(e2) {
        return new V(e2);
      }, V.encode = function(e2, t2) {
        if (t2 = t2 || r.create(), null != e2.path && e2.path.length) {
          t2.uint32(10).fork();
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.int32(e2.path[n2]);
          t2.ldelim();
        }
        return null != e2.sourceFile && Object.hasOwnProperty.call(e2, "sourceFile") && t2.uint32(18).string(e2.sourceFile), null != e2.begin && Object.hasOwnProperty.call(e2, "begin") && t2.uint32(24).int32(e2.begin), null != e2.end && Object.hasOwnProperty.call(e2, "end") && t2.uint32(32).int32(e2.end), t2;
      }, V.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, V.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.GeneratedCodeInfo.Annotation(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              if (o2.path && o2.path.length || (o2.path = []), 2 == (7 & r2)) for (var i2 = e2.uint32() + e2.pos; e2.pos < i2; ) o2.path.push(e2.int32());
              else o2.path.push(e2.int32());
              break;
            case 2:
              o2.sourceFile = e2.string();
              break;
            case 3:
              o2.begin = e2.int32();
              break;
            case 4:
              o2.end = e2.int32();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, V.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, V.verify = function(e2) {
        if ("object" != typeof e2 || null === e2) return "object expected";
        if (null != e2.path && e2.hasOwnProperty("path")) {
          if (!Array.isArray(e2.path)) return "path: array expected";
          for (var t2 = 0; t2 < e2.path.length; ++t2) if (!u.isInteger(e2.path[t2])) return "path: integer[] expected";
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && !u.isString(e2.sourceFile) ? "sourceFile: string expected" : null != e2.begin && e2.hasOwnProperty("begin") && !u.isInteger(e2.begin) ? "begin: integer expected" : null != e2.end && e2.hasOwnProperty("end") && !u.isInteger(e2.end) ? "end: integer expected" : null;
      }, V.fromObject = function(e2) {
        if (e2 instanceof c.google.protobuf.GeneratedCodeInfo.Annotation) return e2;
        var t2 = new c.google.protobuf.GeneratedCodeInfo.Annotation();
        if (e2.path) {
          if (!Array.isArray(e2.path)) throw TypeError(".google.protobuf.GeneratedCodeInfo.Annotation.path: array expected");
          t2.path = [];
          for (var n2 = 0; n2 < e2.path.length; ++n2) t2.path[n2] = 0 | e2.path[n2];
        }
        return null != e2.sourceFile && (t2.sourceFile = String(e2.sourceFile)), null != e2.begin && (t2.begin = 0 | e2.begin), null != e2.end && (t2.end = 0 | e2.end), t2;
      }, V.toObject = function(e2, t2) {
        var n2 = {};
        if (((t2 = t2 || {}).arrays || t2.defaults) && (n2.path = []), t2.defaults && (n2.sourceFile = "", n2.begin = 0, n2.end = 0), e2.path && e2.path.length) {
          n2.path = [];
          for (var o2 = 0; o2 < e2.path.length; ++o2) n2.path[o2] = e2.path[o2];
        }
        return null != e2.sourceFile && e2.hasOwnProperty("sourceFile") && (n2.sourceFile = e2.sourceFile), null != e2.begin && e2.hasOwnProperty("begin") && (n2.begin = e2.begin), null != e2.end && e2.hasOwnProperty("end") && (n2.end = e2.end), n2;
      }, V.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, V), J), n.Any = (H.prototype.type_url = "", H.prototype.value = u.newBuffer([]), H.create = function(e2) {
        return new H(e2);
      }, H.encode = function(e2, t2) {
        return t2 = t2 || r.create(), null != e2.type_url && Object.hasOwnProperty.call(e2, "type_url") && t2.uint32(10).string(e2.type_url), null != e2.value && Object.hasOwnProperty.call(e2, "value") && t2.uint32(18).bytes(e2.value), t2;
      }, H.encodeDelimited = function(e2, t2) {
        return this.encode(e2, t2).ldelim();
      }, H.decode = function(e2, t2) {
        e2 instanceof s || (e2 = s.create(e2));
        for (var n2 = void 0 === t2 ? e2.len : e2.pos + t2, o2 = new c.google.protobuf.Any(); e2.pos < n2; ) {
          var r2 = e2.uint32();
          switch (r2 >>> 3) {
            case 1:
              o2.type_url = e2.string();
              break;
            case 2:
              o2.value = e2.bytes();
              break;
            default:
              e2.skipType(7 & r2);
          }
        }
        return o2;
      }, H.decodeDelimited = function(e2) {
        return e2 instanceof s || (e2 = new s(e2)), this.decode(e2, e2.uint32());
      }, H.verify = function(e2) {
        return "object" != typeof e2 || null === e2 ? "object expected" : null != e2.type_url && e2.hasOwnProperty("type_url") && !u.isString(e2.type_url) ? "type_url: string expected" : null != e2.value && e2.hasOwnProperty("value") && !(e2.value && "number" == typeof e2.value.length || u.isString(e2.value)) ? "value: buffer expected" : null;
      }, H.fromObject = function(e2) {
        var t2;
        return e2 instanceof c.google.protobuf.Any ? e2 : (t2 = new c.google.protobuf.Any(), null != e2.type_url && (t2.type_url = String(e2.type_url)), null != e2.value && ("string" == typeof e2.value ? u.base64.decode(e2.value, t2.value = u.newBuffer(u.base64.length(e2.value)), 0) : e2.value.length && (t2.value = e2.value)), t2);
      }, H.toObject = function(e2, t2) {
        var n2 = {};
        return (t2 = t2 || {}).defaults && (n2.type_url = "", t2.bytes === String ? n2.value = "" : (n2.value = [], t2.bytes !== Array && (n2.value = u.newBuffer(n2.value)))), null != e2.type_url && e2.hasOwnProperty("type_url") && (n2.type_url = e2.type_url), null != e2.value && e2.hasOwnProperty("value") && (n2.value = t2.bytes === String ? u.base64.encode(e2.value, 0, e2.value.length) : t2.bytes === Array ? Array.prototype.slice.call(e2.value) : e2.value), n2;
      }, H.prototype.toJSON = function() {
        return this.constructor.toObject(this, o.util.toJSONOptions);
      }, H), n), F), c;
    });
  })(locations);
  return locations.exports;
}
var pathTemplate = {};
var hasRequiredPathTemplate;
function requirePathTemplate() {
  if (hasRequiredPathTemplate) return pathTemplate;
  hasRequiredPathTemplate = 1;
  Object.defineProperty(pathTemplate, "__esModule", { value: true });
  pathTemplate.PathTemplate = void 0;
  class PathTemplate {
    data;
    bindings = {};
    segments;
    size;
    /**
     * @param {String} data the of the template
     *
     * @constructor
     */
    constructor(data) {
      this.data = data;
      this.segments = this.parsePathTemplate(data);
      this.size = this.segments.length;
    }
    /**
     * Matches a fully-qualified path template string.
     *
     * @param {String} path a fully-qualified path template string
     * @return {Object} contains const names matched to binding values
     * @throws {TypeError} if path can't be matched to this template
     */
    match(path) {
      let pathSegments = path.split("/");
      const bindings = {};
      if (pathSegments.length !== this.segments.length) {
        if (!this.data.includes("**")) {
          throw new TypeError(`This path ${path} does not match path template ${this.data}, the number of parameters is not same.`);
        } else if (pathSegments.length !== this.segments.length + 1) {
          throw new TypeError(`This path ${path} does not match path template ${this.data}, the number of parameters is not same with one wildcard.`);
        }
      }
      for (let index = 0; index < this.segments.length && pathSegments.length > 0; index++) {
        if (this.segments[index] !== pathSegments[0]) {
          if (!this.segments[index].includes("*")) {
            throw new TypeError(`segment does not match, ${this.segments[index]} and  ${pathSegments[index]}.`);
          } else {
            let segment = this.segments[index];
            const matches = segment.match(/\{[$0-9a-zA-Z_]+=.*?\}/g);
            if (!matches) {
              throw new Error(`Error processing path template segment ${segment}`);
            }
            const variables = matches.map((str) => str.replace(/^\{/, "").replace(/=.*/, ""));
            if (segment.includes("**")) {
              bindings[variables[0]] = pathSegments[0] + "/" + pathSegments[1];
              pathSegments = pathSegments.slice(2);
            } else {
              if (variables.length === 1) {
                bindings[variables[0]] = pathSegments[0];
              } else {
                const value = pathSegments[0].split(/[-_.~]/);
                if (value.length !== variables.length) {
                  throw new Error(`segment ${segment} does not match ${pathSegments[0]}`);
                }
                for (const v of variables) {
                  bindings[v] = value[0];
                  segment = segment.replace(`{${v}=*}`, `${value[0]}`);
                  value.shift();
                }
                if (segment !== pathSegments[0]) {
                  throw new TypeError(`non slash resource pattern ${this.segments[index]} and ${pathSegments[0]} should have same separator`);
                }
              }
              pathSegments.shift();
            }
          }
        } else {
          pathSegments.shift();
        }
      }
      return bindings;
    }
    /**
     * Renders a path template using the provided bindings.
     *
     * @param {Object} bindings a mapping of const names to binding strings
     * @return {String} a rendered representation of the path template
     * @throws {TypeError} if a key is missing, or if a sub-template cannot be
     *   parsed
     */
    render(bindings) {
      if (Object.keys(bindings).length !== Object.keys(this.bindings).length) {
        throw new TypeError(`The number of variables ${Object.keys(bindings).length} does not match the number of needed variables ${Object.keys(this.bindings).length}`);
      }
      let path = this.inspect();
      for (const key of Object.keys(bindings)) {
        const b = bindings[key].toString();
        if (!this.bindings[key]) {
          throw new TypeError(`render fails for not matching ${bindings[key]}`);
        }
        const variable = this.bindings[key];
        if (variable === "*") {
          if (!b.match(/[^/{}]+/)) {
            throw new TypeError(`render fails for not matching ${b}`);
          }
          path = path.replace(`{${key}=*}`, `${b}`);
        } else if (variable === "**") {
          if (!b.match(/[^{}]+/)) {
            throw new TypeError(`render fails for not matching ${b}`);
          }
          path = path.replace(`{${key}=**}`, `${b}`);
        }
      }
      return path;
    }
    /**
     * Renders the path template.
     *
     * @return {string} contains const names matched to binding values
     */
    inspect() {
      return this.segments.join("/");
    }
    /**
     * Parse the path template.
     *
     * @return {string[]} return segments of the input path.
     * For example: 'buckets/{hello}'' will give back ['buckets', {hello=*}]
     */
    parsePathTemplate(data) {
      const pathSegments = splitPathTemplate(data);
      let index = 0;
      let wildCardCount = 0;
      const segments = [];
      let matches;
      pathSegments.forEach((segment) => {
        if (segment === "*" || segment === "**") {
          this.bindings[`$${index}`] = segment;
          segments.push(`{$${index}=${segment}}`);
          index = index + 1;
          if (segment === "**") {
            ++wildCardCount;
          }
        } else if (matches = segment.match(/\{[0-9a-zA-Z-.~_]+(?:=.*?)?\}/g)) {
          for (const subsegment of matches) {
            const pairMatch = subsegment.match(/^\{([0-9a-zA-Z-.~_]+)(?:=(.*?))?\}$/);
            if (!pairMatch) {
              throw new Error(`Cannot process path template segment ${subsegment}`);
            }
            const key = pairMatch[1];
            let value = pairMatch[2];
            if (!value) {
              value = "*";
              segment = segment.replace(key, key + "=*");
              this.bindings[key] = value;
            } else if (value === "*") {
              this.bindings[key] = value;
            } else if (value === "**") {
              ++wildCardCount;
              this.bindings[key] = value;
            }
          }
          segments.push(segment);
        } else if (segment.match(/[0-9a-zA-Z-.~_]+/)) {
          segments.push(segment);
        }
      });
      if (wildCardCount > 1) {
        throw new TypeError("Can not have more than one wildcard.");
      }
      return segments;
    }
  }
  pathTemplate.PathTemplate = PathTemplate;
  function splitPathTemplate(data) {
    let left = 0;
    let right = 0;
    let bracketCount = 0;
    const segments = [];
    while (right >= left && right < data.length) {
      if (data.charAt(right) === "{") {
        bracketCount = bracketCount + 1;
      } else if (data.charAt(right) === "}") {
        bracketCount = bracketCount - 1;
      } else if (data.charAt(right) === "/") {
        if (right === data.length - 1) {
          throw new TypeError("Invalid path, it can not be ended by /");
        }
        if (bracketCount === 0) {
          segments.push(data.substring(left, right));
          left = right + 1;
        }
      }
      if (right === data.length - 1) {
        if (bracketCount !== 0) {
          throw new TypeError("Brackets are invalid.");
        }
        segments.push(data.substring(left));
      }
      right = right + 1;
    }
    return segments;
  }
  return pathTemplate;
}
var iamService = {};
const interfaces$1 = { "google.iam.v1.IAMPolicy": { "retry_codes": { "non_idempotent": [], "idempotent": ["DEADLINE_EXCEEDED", "UNAVAILABLE"] }, "retry_params": { "default": { "initial_retry_delay_millis": 100, "retry_delay_multiplier": 1.3, "max_retry_delay_millis": 6e4, "initial_rpc_timeout_millis": 2e4, "rpc_timeout_multiplier": 1, "max_rpc_timeout_millis": 2e4, "total_timeout_millis": 6e5 } }, "methods": { "GetIamPolicy": { "retry_codes_name": "non_idempotent", "retry_params_name": "default" }, "SetIamPolicy": { "retry_codes_name": "non_idempotent", "retry_params_name": "default" }, "TestIamPermissions": { "retry_codes_name": "non_idempotent", "retry_params_name": "default" } } } };
const require$$2 = {
  interfaces: interfaces$1
};
const nested$1 = /* @__PURE__ */ JSON.parse('{"google":{"nested":{"iam":{"nested":{"v1":{"options":{"cc_enable_arenas":true,"csharp_namespace":"Google.Cloud.Iam.V1","go_package":"google.golang.org/genproto/googleapis/iam/v1;iam","java_multiple_files":true,"java_outer_classname":"PolicyProto","java_package":"com.google.iam.v1","php_namespace":"Google\\\\Cloud\\\\Iam\\\\V1"},"nested":{"IAMPolicy":{"options":{"(google.api.default_host)":"iam-meta-api.googleapis.com"},"methods":{"SetIamPolicy":{"requestType":"SetIamPolicyRequest","responseType":"Policy","options":{"(google.api.http).post":"/v1/{resource=**}:setIamPolicy","(google.api.http).body":"*"},"parsedOptions":[{"(google.api.http)":{"post":"/v1/{resource=**}:setIamPolicy","body":"*"}}]},"GetIamPolicy":{"requestType":"GetIamPolicyRequest","responseType":"Policy","options":{"(google.api.http).post":"/v1/{resource=**}:getIamPolicy","(google.api.http).body":"*"},"parsedOptions":[{"(google.api.http)":{"post":"/v1/{resource=**}:getIamPolicy","body":"*"}}]},"TestIamPermissions":{"requestType":"TestIamPermissionsRequest","responseType":"TestIamPermissionsResponse","options":{"(google.api.http).post":"/v1/{resource=**}:testIamPermissions","(google.api.http).body":"*"},"parsedOptions":[{"(google.api.http)":{"post":"/v1/{resource=**}:testIamPermissions","body":"*"}}]}}},"SetIamPolicyRequest":{"fields":{"resource":{"type":"string","id":1,"options":{"(google.api.field_behavior)":"REQUIRED","(google.api.resource_reference).type":"*"}},"policy":{"type":"Policy","id":2,"options":{"(google.api.field_behavior)":"REQUIRED"}}}},"GetIamPolicyRequest":{"fields":{"resource":{"type":"string","id":1,"options":{"(google.api.field_behavior)":"REQUIRED","(google.api.resource_reference).type":"*"}},"options":{"type":"GetPolicyOptions","id":2}}},"TestIamPermissionsRequest":{"fields":{"resource":{"type":"string","id":1,"options":{"(google.api.field_behavior)":"REQUIRED","(google.api.resource_reference).type":"*"}},"permissions":{"rule":"repeated","type":"string","id":2,"options":{"(google.api.field_behavior)":"REQUIRED"}}}},"TestIamPermissionsResponse":{"fields":{"permissions":{"rule":"repeated","type":"string","id":1}}},"GetPolicyOptions":{"fields":{"requestedPolicyVersion":{"type":"int32","id":1}}},"Policy":{"fields":{"version":{"type":"int32","id":1},"bindings":{"rule":"repeated","type":"Binding","id":4},"etag":{"type":"bytes","id":3}}},"Binding":{"fields":{"role":{"type":"string","id":1},"members":{"rule":"repeated","type":"string","id":2},"condition":{"type":"google.type.Expr","id":3}}},"PolicyDelta":{"fields":{"bindingDeltas":{"rule":"repeated","type":"BindingDelta","id":1},"auditConfigDeltas":{"rule":"repeated","type":"AuditConfigDelta","id":2}}},"BindingDelta":{"fields":{"action":{"type":"Action","id":1},"role":{"type":"string","id":2},"member":{"type":"string","id":3},"condition":{"type":"google.type.Expr","id":4}},"nested":{"Action":{"values":{"ACTION_UNSPECIFIED":0,"ADD":1,"REMOVE":2}}}},"AuditConfigDelta":{"fields":{"action":{"type":"Action","id":1},"service":{"type":"string","id":2},"exemptedMember":{"type":"string","id":3},"logType":{"type":"string","id":4}},"nested":{"Action":{"values":{"ACTION_UNSPECIFIED":0,"ADD":1,"REMOVE":2}}}},"logging":{"options":{"csharp_namespace":"Google.Cloud.Iam.V1.Logging","go_package":"google.golang.org/genproto/googleapis/iam/v1/logging;logging","java_multiple_files":true,"java_outer_classname":"AuditDataProto","java_package":"com.google.iam.v1.logging"},"nested":{"AuditData":{"fields":{"policyDelta":{"type":"google.iam.v1.PolicyDelta","id":2}}}}}}}}},"api":{"options":{"go_package":"google.golang.org/genproto/googleapis/api/annotations;annotations","java_multiple_files":true,"java_outer_classname":"ResourceProto","java_package":"com.google.api","objc_class_prefix":"GAPI","cc_enable_arenas":true},"nested":{"http":{"type":"HttpRule","id":72295728,"extend":"google.protobuf.MethodOptions"},"Http":{"fields":{"rules":{"rule":"repeated","type":"HttpRule","id":1},"fullyDecodeReservedExpansion":{"type":"bool","id":2}}},"HttpRule":{"oneofs":{"pattern":{"oneof":["get","put","post","delete","patch","custom"]}},"fields":{"selector":{"type":"string","id":1},"get":{"type":"string","id":2},"put":{"type":"string","id":3},"post":{"type":"string","id":4},"delete":{"type":"string","id":5},"patch":{"type":"string","id":6},"custom":{"type":"CustomHttpPattern","id":8},"body":{"type":"string","id":7},"responseBody":{"type":"string","id":12},"additionalBindings":{"rule":"repeated","type":"HttpRule","id":11}}},"CustomHttpPattern":{"fields":{"kind":{"type":"string","id":1},"path":{"type":"string","id":2}}},"methodSignature":{"rule":"repeated","type":"string","id":1051,"extend":"google.protobuf.MethodOptions"},"defaultHost":{"type":"string","id":1049,"extend":"google.protobuf.ServiceOptions"},"oauthScopes":{"type":"string","id":1050,"extend":"google.protobuf.ServiceOptions"},"fieldBehavior":{"rule":"repeated","type":"google.api.FieldBehavior","id":1052,"extend":"google.protobuf.FieldOptions"},"FieldBehavior":{"values":{"FIELD_BEHAVIOR_UNSPECIFIED":0,"OPTIONAL":1,"REQUIRED":2,"OUTPUT_ONLY":3,"INPUT_ONLY":4,"IMMUTABLE":5}},"resourceReference":{"type":"google.api.ResourceReference","id":1055,"extend":"google.protobuf.FieldOptions"},"resourceDefinition":{"rule":"repeated","type":"google.api.ResourceDescriptor","id":1053,"extend":"google.protobuf.FileOptions"},"resource":{"type":"google.api.ResourceDescriptor","id":1053,"extend":"google.protobuf.MessageOptions"},"ResourceDescriptor":{"fields":{"type":{"type":"string","id":1},"pattern":{"rule":"repeated","type":"string","id":2},"nameField":{"type":"string","id":3},"history":{"type":"History","id":4},"plural":{"type":"string","id":5},"singular":{"type":"string","id":6}},"nested":{"History":{"values":{"HISTORY_UNSPECIFIED":0,"ORIGINALLY_SINGLE_PATTERN":1,"FUTURE_MULTI_PATTERN":2}}}},"ResourceReference":{"fields":{"type":{"type":"string","id":1},"childType":{"type":"string","id":2}}}}},"protobuf":{"options":{"go_package":"github.com/golang/protobuf/protoc-gen-go/descriptor;descriptor","java_package":"com.google.protobuf","java_outer_classname":"DescriptorProtos","csharp_namespace":"Google.Protobuf.Reflection","objc_class_prefix":"GPB","cc_enable_arenas":true,"optimize_for":"SPEED"},"nested":{"FileDescriptorSet":{"fields":{"file":{"rule":"repeated","type":"FileDescriptorProto","id":1}}},"FileDescriptorProto":{"fields":{"name":{"type":"string","id":1},"package":{"type":"string","id":2},"dependency":{"rule":"repeated","type":"string","id":3},"publicDependency":{"rule":"repeated","type":"int32","id":10,"options":{"packed":false}},"weakDependency":{"rule":"repeated","type":"int32","id":11,"options":{"packed":false}},"messageType":{"rule":"repeated","type":"DescriptorProto","id":4},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":5},"service":{"rule":"repeated","type":"ServiceDescriptorProto","id":6},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":7},"options":{"type":"FileOptions","id":8},"sourceCodeInfo":{"type":"SourceCodeInfo","id":9},"syntax":{"type":"string","id":12}}},"DescriptorProto":{"fields":{"name":{"type":"string","id":1},"field":{"rule":"repeated","type":"FieldDescriptorProto","id":2},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":6},"nestedType":{"rule":"repeated","type":"DescriptorProto","id":3},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":4},"extensionRange":{"rule":"repeated","type":"ExtensionRange","id":5},"oneofDecl":{"rule":"repeated","type":"OneofDescriptorProto","id":8},"options":{"type":"MessageOptions","id":7},"reservedRange":{"rule":"repeated","type":"ReservedRange","id":9},"reservedName":{"rule":"repeated","type":"string","id":10}},"nested":{"ExtensionRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2},"options":{"type":"ExtensionRangeOptions","id":3}}},"ReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"ExtensionRangeOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"FieldDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":3},"label":{"type":"Label","id":4},"type":{"type":"Type","id":5},"typeName":{"type":"string","id":6},"extendee":{"type":"string","id":2},"defaultValue":{"type":"string","id":7},"oneofIndex":{"type":"int32","id":9},"jsonName":{"type":"string","id":10},"options":{"type":"FieldOptions","id":8},"proto3Optional":{"type":"bool","id":17}},"nested":{"Type":{"values":{"TYPE_DOUBLE":1,"TYPE_FLOAT":2,"TYPE_INT64":3,"TYPE_UINT64":4,"TYPE_INT32":5,"TYPE_FIXED64":6,"TYPE_FIXED32":7,"TYPE_BOOL":8,"TYPE_STRING":9,"TYPE_GROUP":10,"TYPE_MESSAGE":11,"TYPE_BYTES":12,"TYPE_UINT32":13,"TYPE_ENUM":14,"TYPE_SFIXED32":15,"TYPE_SFIXED64":16,"TYPE_SINT32":17,"TYPE_SINT64":18}},"Label":{"values":{"LABEL_OPTIONAL":1,"LABEL_REQUIRED":2,"LABEL_REPEATED":3}}}},"OneofDescriptorProto":{"fields":{"name":{"type":"string","id":1},"options":{"type":"OneofOptions","id":2}}},"EnumDescriptorProto":{"fields":{"name":{"type":"string","id":1},"value":{"rule":"repeated","type":"EnumValueDescriptorProto","id":2},"options":{"type":"EnumOptions","id":3},"reservedRange":{"rule":"repeated","type":"EnumReservedRange","id":4},"reservedName":{"rule":"repeated","type":"string","id":5}},"nested":{"EnumReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"EnumValueDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":2},"options":{"type":"EnumValueOptions","id":3}}},"ServiceDescriptorProto":{"fields":{"name":{"type":"string","id":1},"method":{"rule":"repeated","type":"MethodDescriptorProto","id":2},"options":{"type":"ServiceOptions","id":3}}},"MethodDescriptorProto":{"fields":{"name":{"type":"string","id":1},"inputType":{"type":"string","id":2},"outputType":{"type":"string","id":3},"options":{"type":"MethodOptions","id":4},"clientStreaming":{"type":"bool","id":5,"options":{"default":false}},"serverStreaming":{"type":"bool","id":6,"options":{"default":false}}}},"FileOptions":{"fields":{"javaPackage":{"type":"string","id":1},"javaOuterClassname":{"type":"string","id":8},"javaMultipleFiles":{"type":"bool","id":10,"options":{"default":false}},"javaGenerateEqualsAndHash":{"type":"bool","id":20,"options":{"deprecated":true}},"javaStringCheckUtf8":{"type":"bool","id":27,"options":{"default":false}},"optimizeFor":{"type":"OptimizeMode","id":9,"options":{"default":"SPEED"}},"goPackage":{"type":"string","id":11},"ccGenericServices":{"type":"bool","id":16,"options":{"default":false}},"javaGenericServices":{"type":"bool","id":17,"options":{"default":false}},"pyGenericServices":{"type":"bool","id":18,"options":{"default":false}},"phpGenericServices":{"type":"bool","id":42,"options":{"default":false}},"deprecated":{"type":"bool","id":23,"options":{"default":false}},"ccEnableArenas":{"type":"bool","id":31,"options":{"default":true}},"objcClassPrefix":{"type":"string","id":36},"csharpNamespace":{"type":"string","id":37},"swiftPrefix":{"type":"string","id":39},"phpClassPrefix":{"type":"string","id":40},"phpNamespace":{"type":"string","id":41},"phpMetadataNamespace":{"type":"string","id":44},"rubyPackage":{"type":"string","id":45},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[38,38]],"nested":{"OptimizeMode":{"values":{"SPEED":1,"CODE_SIZE":2,"LITE_RUNTIME":3}}}},"MessageOptions":{"fields":{"messageSetWireFormat":{"type":"bool","id":1,"options":{"default":false}},"noStandardDescriptorAccessor":{"type":"bool","id":2,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"mapEntry":{"type":"bool","id":7},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[8,8],[9,9]]},"FieldOptions":{"fields":{"ctype":{"type":"CType","id":1,"options":{"default":"STRING"}},"packed":{"type":"bool","id":2},"jstype":{"type":"JSType","id":6,"options":{"default":"JS_NORMAL"}},"lazy":{"type":"bool","id":5,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"weak":{"type":"bool","id":10,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[4,4]],"nested":{"CType":{"values":{"STRING":0,"CORD":1,"STRING_PIECE":2}},"JSType":{"values":{"JS_NORMAL":0,"JS_STRING":1,"JS_NUMBER":2}}}},"OneofOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"EnumOptions":{"fields":{"allowAlias":{"type":"bool","id":2},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[5,5]]},"EnumValueOptions":{"fields":{"deprecated":{"type":"bool","id":1,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"ServiceOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"MethodOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"idempotencyLevel":{"type":"IdempotencyLevel","id":34,"options":{"default":"IDEMPOTENCY_UNKNOWN"}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"nested":{"IdempotencyLevel":{"values":{"IDEMPOTENCY_UNKNOWN":0,"NO_SIDE_EFFECTS":1,"IDEMPOTENT":2}}}},"UninterpretedOption":{"fields":{"name":{"rule":"repeated","type":"NamePart","id":2},"identifierValue":{"type":"string","id":3},"positiveIntValue":{"type":"uint64","id":4},"negativeIntValue":{"type":"int64","id":5},"doubleValue":{"type":"double","id":6},"stringValue":{"type":"bytes","id":7},"aggregateValue":{"type":"string","id":8}},"nested":{"NamePart":{"fields":{"namePart":{"rule":"required","type":"string","id":1},"isExtension":{"rule":"required","type":"bool","id":2}}}}},"SourceCodeInfo":{"fields":{"location":{"rule":"repeated","type":"Location","id":1}},"nested":{"Location":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"span":{"rule":"repeated","type":"int32","id":2},"leadingComments":{"type":"string","id":3},"trailingComments":{"type":"string","id":4},"leadingDetachedComments":{"rule":"repeated","type":"string","id":6}}}}},"GeneratedCodeInfo":{"fields":{"annotation":{"rule":"repeated","type":"Annotation","id":1}},"nested":{"Annotation":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"sourceFile":{"type":"string","id":2},"begin":{"type":"int32","id":3},"end":{"type":"int32","id":4}}}}}}},"type":{"options":{"go_package":"google.golang.org/genproto/googleapis/type/expr;expr","java_multiple_files":true,"java_outer_classname":"ExprProto","java_package":"com.google.type","objc_class_prefix":"GTP"},"nested":{"Expr":{"fields":{"expression":{"type":"string","id":1},"title":{"type":"string","id":2},"description":{"type":"string","id":3},"location":{"type":"string","id":4}}}}}}}}');
const require$$5$1 = {
  nested: nested$1
};
var hasRequiredIamService;
function requireIamService() {
  if (hasRequiredIamService) return iamService;
  hasRequiredIamService = 1;
  var __createBinding = iamService && iamService.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = iamService && iamService.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = iamService && iamService.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(iamService, "__esModule", { value: true });
  iamService.IamClient = void 0;
  const createApiCall_1 = requireCreateApiCall();
  const routingHeader2 = __importStar(requireRoutingHeader());
  const gapicConfig = __importStar(require$$2);
  const fallback2 = __importStar(requireFallback());
  let version2 = require$$20.version;
  const jsonProtos = require$$5$1;
  class IamClient {
    _terminated = false;
    _opts;
    _defaults;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _protos;
    auth;
    descriptors = { page: {}, stream: {}, longrunning: {} };
    innerApiCalls = {};
    iamPolicyStub;
    gaxGrpc;
    constructor(gaxGrpc, options) {
      this.gaxGrpc = gaxGrpc;
      const opts = Object.assign({
        servicePath: options.servicePath,
        port: options.port,
        clientConfig: options.clientConfig,
        apiEndpoint: options.apiEndpoint,
        fallback: options.fallback
      }, options);
      version2 = opts.fallback ? fallback2.version : version2;
      opts.scopes = this.constructor.scopes;
      this._opts = opts;
      this.auth = gaxGrpc.auth;
      const clientHeader = [`gax/${version2}`, `gapic/${version2}`];
      if (typeof process !== "undefined" && "versions" in process) {
        clientHeader.push(`gl-node/${process.versions.node}`);
      } else {
        clientHeader.push(`gl-web/${version2}`);
      }
      if (!opts.fallback) {
        clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
      }
      if (opts.libName && opts.libVersion) {
        clientHeader.push(`${opts.libName}/${opts.libVersion}`);
      }
      this._protos = this.gaxGrpc.loadProtoJSON(jsonProtos);
      this._defaults = gaxGrpc.constructSettings("google.iam.v1.IAMPolicy", gapicConfig, opts.clientConfig || {}, { "x-goog-api-client": clientHeader.join(" ") });
      this.innerApiCalls = {};
    }
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize() {
      if (this.iamPolicyStub) {
        return this.iamPolicyStub;
      }
      this.iamPolicyStub = this.gaxGrpc.createStub(this._opts.fallback ? this._protos.lookupService("google.iam.v1.IAMPolicy") : this._protos.google.iam.v1.IAMPolicy, this._opts);
      const iamPolicyStubMethods = [
        "getIamPolicy",
        "setIamPolicy",
        "testIamPermissions"
      ];
      for (const methodName of iamPolicyStubMethods) {
        const innerCallPromise = this.iamPolicyStub.then((stub) => (...args) => {
          if (this._terminated) {
            return Promise.reject("The client has already been closed.");
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        }, (err) => () => {
          throw err;
        });
        this.innerApiCalls[methodName] = (0, createApiCall_1.createApiCall)(innerCallPromise, this._defaults[methodName], this.descriptors.page[methodName]);
      }
      return this.iamPolicyStub;
    }
    /**
     * The DNS address for this API service.
     */
    static get servicePath() {
      return "cloudkms.googleapis.com";
    }
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     */
    static get apiEndpoint() {
      return "cloudkms.googleapis.com";
    }
    /**
     * The port for this API service.
     */
    static get port() {
      return 443;
    }
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     */
    static get scopes() {
      return [
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/cloudkms"
      ];
    }
    getProjectId(callback) {
      if (this.auth && "getProjectId" in this.auth) {
        return this.auth.getProjectId(callback);
      }
      if (callback) {
        callback(new Error("Cannot determine project ID."));
      } else {
        return Promise.reject("Cannot determine project ID.");
      }
    }
    getIamPolicy(request, optionsOrCallback, callback) {
      let options;
      if (optionsOrCallback instanceof Function && callback === void 0) {
        callback = optionsOrCallback;
        options = {};
      } else {
        options = optionsOrCallback;
      }
      request = request || {};
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        resource: request.resource
      });
      this.initialize().catch(console.error);
      return this.innerApiCalls.getIamPolicy(request, options, callback);
    }
    setIamPolicy(request, optionsOrCallback, callback) {
      let options;
      if (optionsOrCallback instanceof Function && callback === void 0) {
        callback = optionsOrCallback;
        options = {};
      } else {
        options = optionsOrCallback;
      }
      request = request || {};
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        resource: request.resource
      });
      this.initialize().catch(console.error);
      return this.innerApiCalls.setIamPolicy(request, options, callback);
    }
    testIamPermissions(request, optionsOrCallback, callback) {
      let options;
      if (optionsOrCallback instanceof Function && callback === void 0) {
        callback = optionsOrCallback;
        options = {};
      } else {
        options = optionsOrCallback;
      }
      request = request || {};
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        resource: request.resource
      });
      this.initialize().catch(console.error);
      return this.innerApiCalls.testIamPermissions(request, options, callback);
    }
    /**
     * Terminate the GRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     */
    close() {
      this.initialize().catch(console.error);
      if (!this._terminated) {
        return this.iamPolicyStub.then((stub) => {
          this._terminated = true;
          stub.close();
        });
      }
      return Promise.resolve();
    }
  }
  iamService.IamClient = IamClient;
  return iamService;
}
var locationService = {};
const nested = /* @__PURE__ */ JSON.parse('{"google":{"nested":{"cloud":{"nested":{"location":{"options":{"cc_enable_arenas":true,"go_package":"google.golang.org/genproto/googleapis/cloud/location;location","java_multiple_files":true,"java_outer_classname":"LocationsProto","java_package":"com.google.cloud.location"},"nested":{"Locations":{"options":{"(google.api.default_host)":"cloud.googleapis.com","(google.api.oauth_scopes)":"https://www.googleapis.com/auth/cloud-platform"},"methods":{"ListLocations":{"requestType":"ListLocationsRequest","responseType":"ListLocationsResponse","options":{"(google.api.http).get":"/v1/{name=locations}","(google.api.http).additional_bindings.get":"/v1/{name=projects/*}/locations"},"parsedOptions":[{"(google.api.http)":{"get":"/v1/{name=locations}","additional_bindings":{"get":"/v1/{name=projects/*}/locations"}}}]},"GetLocation":{"requestType":"GetLocationRequest","responseType":"Location","options":{"(google.api.http).get":"/v1/{name=locations/*}","(google.api.http).additional_bindings.get":"/v1/{name=projects/*/locations/*}"},"parsedOptions":[{"(google.api.http)":{"get":"/v1/{name=locations/*}","additional_bindings":{"get":"/v1/{name=projects/*/locations/*}"}}}]}}},"ListLocationsRequest":{"fields":{"name":{"type":"string","id":1},"filter":{"type":"string","id":2},"pageSize":{"type":"int32","id":3},"pageToken":{"type":"string","id":4}}},"ListLocationsResponse":{"fields":{"locations":{"rule":"repeated","type":"Location","id":1},"nextPageToken":{"type":"string","id":2}}},"GetLocationRequest":{"fields":{"name":{"type":"string","id":1}}},"Location":{"fields":{"name":{"type":"string","id":1},"locationId":{"type":"string","id":4},"displayName":{"type":"string","id":5},"labels":{"keyType":"string","type":"string","id":2},"metadata":{"type":"google.protobuf.Any","id":3}}}}}}},"api":{"options":{"go_package":"google.golang.org/genproto/googleapis/api/annotations;annotations","java_multiple_files":true,"java_outer_classname":"ClientProto","java_package":"com.google.api","objc_class_prefix":"GAPI","cc_enable_arenas":true},"nested":{"http":{"type":"HttpRule","id":72295728,"extend":"google.protobuf.MethodOptions"},"Http":{"fields":{"rules":{"rule":"repeated","type":"HttpRule","id":1},"fullyDecodeReservedExpansion":{"type":"bool","id":2}}},"HttpRule":{"oneofs":{"pattern":{"oneof":["get","put","post","delete","patch","custom"]}},"fields":{"selector":{"type":"string","id":1},"get":{"type":"string","id":2},"put":{"type":"string","id":3},"post":{"type":"string","id":4},"delete":{"type":"string","id":5},"patch":{"type":"string","id":6},"custom":{"type":"CustomHttpPattern","id":8},"body":{"type":"string","id":7},"responseBody":{"type":"string","id":12},"additionalBindings":{"rule":"repeated","type":"HttpRule","id":11}}},"CustomHttpPattern":{"fields":{"kind":{"type":"string","id":1},"path":{"type":"string","id":2}}},"methodSignature":{"rule":"repeated","type":"string","id":1051,"extend":"google.protobuf.MethodOptions"},"defaultHost":{"type":"string","id":1049,"extend":"google.protobuf.ServiceOptions"},"oauthScopes":{"type":"string","id":1050,"extend":"google.protobuf.ServiceOptions"}}},"protobuf":{"options":{"go_package":"google.golang.org/protobuf/types/descriptorpb","java_package":"com.google.protobuf","java_outer_classname":"DescriptorProtos","csharp_namespace":"Google.Protobuf.Reflection","objc_class_prefix":"GPB","cc_enable_arenas":true,"optimize_for":"SPEED"},"nested":{"FileDescriptorSet":{"fields":{"file":{"rule":"repeated","type":"FileDescriptorProto","id":1}}},"FileDescriptorProto":{"fields":{"name":{"type":"string","id":1},"package":{"type":"string","id":2},"dependency":{"rule":"repeated","type":"string","id":3},"publicDependency":{"rule":"repeated","type":"int32","id":10,"options":{"packed":false}},"weakDependency":{"rule":"repeated","type":"int32","id":11,"options":{"packed":false}},"messageType":{"rule":"repeated","type":"DescriptorProto","id":4},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":5},"service":{"rule":"repeated","type":"ServiceDescriptorProto","id":6},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":7},"options":{"type":"FileOptions","id":8},"sourceCodeInfo":{"type":"SourceCodeInfo","id":9},"syntax":{"type":"string","id":12}}},"DescriptorProto":{"fields":{"name":{"type":"string","id":1},"field":{"rule":"repeated","type":"FieldDescriptorProto","id":2},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":6},"nestedType":{"rule":"repeated","type":"DescriptorProto","id":3},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":4},"extensionRange":{"rule":"repeated","type":"ExtensionRange","id":5},"oneofDecl":{"rule":"repeated","type":"OneofDescriptorProto","id":8},"options":{"type":"MessageOptions","id":7},"reservedRange":{"rule":"repeated","type":"ReservedRange","id":9},"reservedName":{"rule":"repeated","type":"string","id":10}},"nested":{"ExtensionRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2},"options":{"type":"ExtensionRangeOptions","id":3}}},"ReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"ExtensionRangeOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"FieldDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":3},"label":{"type":"Label","id":4},"type":{"type":"Type","id":5},"typeName":{"type":"string","id":6},"extendee":{"type":"string","id":2},"defaultValue":{"type":"string","id":7},"oneofIndex":{"type":"int32","id":9},"jsonName":{"type":"string","id":10},"options":{"type":"FieldOptions","id":8},"proto3Optional":{"type":"bool","id":17}},"nested":{"Type":{"values":{"TYPE_DOUBLE":1,"TYPE_FLOAT":2,"TYPE_INT64":3,"TYPE_UINT64":4,"TYPE_INT32":5,"TYPE_FIXED64":6,"TYPE_FIXED32":7,"TYPE_BOOL":8,"TYPE_STRING":9,"TYPE_GROUP":10,"TYPE_MESSAGE":11,"TYPE_BYTES":12,"TYPE_UINT32":13,"TYPE_ENUM":14,"TYPE_SFIXED32":15,"TYPE_SFIXED64":16,"TYPE_SINT32":17,"TYPE_SINT64":18}},"Label":{"values":{"LABEL_OPTIONAL":1,"LABEL_REQUIRED":2,"LABEL_REPEATED":3}}}},"OneofDescriptorProto":{"fields":{"name":{"type":"string","id":1},"options":{"type":"OneofOptions","id":2}}},"EnumDescriptorProto":{"fields":{"name":{"type":"string","id":1},"value":{"rule":"repeated","type":"EnumValueDescriptorProto","id":2},"options":{"type":"EnumOptions","id":3},"reservedRange":{"rule":"repeated","type":"EnumReservedRange","id":4},"reservedName":{"rule":"repeated","type":"string","id":5}},"nested":{"EnumReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"EnumValueDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":2},"options":{"type":"EnumValueOptions","id":3}}},"ServiceDescriptorProto":{"fields":{"name":{"type":"string","id":1},"method":{"rule":"repeated","type":"MethodDescriptorProto","id":2},"options":{"type":"ServiceOptions","id":3}}},"MethodDescriptorProto":{"fields":{"name":{"type":"string","id":1},"inputType":{"type":"string","id":2},"outputType":{"type":"string","id":3},"options":{"type":"MethodOptions","id":4},"clientStreaming":{"type":"bool","id":5,"options":{"default":false}},"serverStreaming":{"type":"bool","id":6,"options":{"default":false}}}},"FileOptions":{"fields":{"javaPackage":{"type":"string","id":1},"javaOuterClassname":{"type":"string","id":8},"javaMultipleFiles":{"type":"bool","id":10,"options":{"default":false}},"javaGenerateEqualsAndHash":{"type":"bool","id":20,"options":{"deprecated":true}},"javaStringCheckUtf8":{"type":"bool","id":27,"options":{"default":false}},"optimizeFor":{"type":"OptimizeMode","id":9,"options":{"default":"SPEED"}},"goPackage":{"type":"string","id":11},"ccGenericServices":{"type":"bool","id":16,"options":{"default":false}},"javaGenericServices":{"type":"bool","id":17,"options":{"default":false}},"pyGenericServices":{"type":"bool","id":18,"options":{"default":false}},"phpGenericServices":{"type":"bool","id":42,"options":{"default":false}},"deprecated":{"type":"bool","id":23,"options":{"default":false}},"ccEnableArenas":{"type":"bool","id":31,"options":{"default":true}},"objcClassPrefix":{"type":"string","id":36},"csharpNamespace":{"type":"string","id":37},"swiftPrefix":{"type":"string","id":39},"phpClassPrefix":{"type":"string","id":40},"phpNamespace":{"type":"string","id":41},"phpMetadataNamespace":{"type":"string","id":44},"rubyPackage":{"type":"string","id":45},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[38,38]],"nested":{"OptimizeMode":{"values":{"SPEED":1,"CODE_SIZE":2,"LITE_RUNTIME":3}}}},"MessageOptions":{"fields":{"messageSetWireFormat":{"type":"bool","id":1,"options":{"default":false}},"noStandardDescriptorAccessor":{"type":"bool","id":2,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"mapEntry":{"type":"bool","id":7},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[8,8],[9,9]]},"FieldOptions":{"fields":{"ctype":{"type":"CType","id":1,"options":{"default":"STRING"}},"packed":{"type":"bool","id":2},"jstype":{"type":"JSType","id":6,"options":{"default":"JS_NORMAL"}},"lazy":{"type":"bool","id":5,"options":{"default":false}},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"weak":{"type":"bool","id":10,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[4,4]],"nested":{"CType":{"values":{"STRING":0,"CORD":1,"STRING_PIECE":2}},"JSType":{"values":{"JS_NORMAL":0,"JS_STRING":1,"JS_NUMBER":2}}}},"OneofOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"EnumOptions":{"fields":{"allowAlias":{"type":"bool","id":2},"deprecated":{"type":"bool","id":3,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[5,5]]},"EnumValueOptions":{"fields":{"deprecated":{"type":"bool","id":1,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"ServiceOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"MethodOptions":{"fields":{"deprecated":{"type":"bool","id":33,"options":{"default":false}},"idempotencyLevel":{"type":"IdempotencyLevel","id":34,"options":{"default":"IDEMPOTENCY_UNKNOWN"}},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"nested":{"IdempotencyLevel":{"values":{"IDEMPOTENCY_UNKNOWN":0,"NO_SIDE_EFFECTS":1,"IDEMPOTENT":2}}}},"UninterpretedOption":{"fields":{"name":{"rule":"repeated","type":"NamePart","id":2},"identifierValue":{"type":"string","id":3},"positiveIntValue":{"type":"uint64","id":4},"negativeIntValue":{"type":"int64","id":5},"doubleValue":{"type":"double","id":6},"stringValue":{"type":"bytes","id":7},"aggregateValue":{"type":"string","id":8}},"nested":{"NamePart":{"fields":{"namePart":{"rule":"required","type":"string","id":1},"isExtension":{"rule":"required","type":"bool","id":2}}}}},"SourceCodeInfo":{"fields":{"location":{"rule":"repeated","type":"Location","id":1}},"nested":{"Location":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"span":{"rule":"repeated","type":"int32","id":2},"leadingComments":{"type":"string","id":3},"trailingComments":{"type":"string","id":4},"leadingDetachedComments":{"rule":"repeated","type":"string","id":6}}}}},"GeneratedCodeInfo":{"fields":{"annotation":{"rule":"repeated","type":"Annotation","id":1}},"nested":{"Annotation":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"sourceFile":{"type":"string","id":2},"begin":{"type":"int32","id":3},"end":{"type":"int32","id":4}}}}},"Any":{"fields":{"type_url":{"type":"string","id":1},"value":{"type":"bytes","id":2}}}}}}}}');
const require$$5 = {
  nested
};
const interfaces = { "google.cloud.location.Locations": { "retry_codes": { "non_idempotent": [], "idempotent": ["DEADLINE_EXCEEDED", "UNAVAILABLE"] }, "retry_params": { "default": { "initial_retry_delay_millis": 100, "retry_delay_multiplier": 1.3, "max_retry_delay_millis": 6e4, "initial_rpc_timeout_millis": 6e4, "rpc_timeout_multiplier": 1, "max_rpc_timeout_millis": 6e4, "total_timeout_millis": 6e5 } }, "methods": { "ListLocations": { "retry_codes_name": "non_idempotent", "retry_params_name": "default" }, "GetLocation": { "retry_codes_name": "non_idempotent", "retry_params_name": "default" } } } };
const require$$6 = {
  interfaces
};
var hasRequiredLocationService;
function requireLocationService() {
  if (hasRequiredLocationService) return locationService;
  hasRequiredLocationService = 1;
  var __createBinding = locationService && locationService.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = locationService && locationService.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = locationService && locationService.__importStar || /* @__PURE__ */ (function() {
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
  Object.defineProperty(locationService, "__esModule", { value: true });
  locationService.LocationsClient = void 0;
  const gax2 = __importStar(requireGax());
  const warnings_1 = requireWarnings();
  const createApiCall_1 = requireCreateApiCall();
  const routingHeader2 = __importStar(requireRoutingHeader());
  const pageDescriptor_1 = requirePageDescriptor();
  const jsonProtos = require$$5;
  const gapicConfig = __importStar(require$$6);
  const version2 = require$$20.version;
  class LocationsClient {
    _terminated = false;
    _opts;
    _providedCustomServicePath;
    _protos;
    _defaults;
    auth;
    descriptors = {
      page: {},
      stream: {},
      longrunning: {},
      batching: {}
    };
    warn;
    innerApiCalls;
    locationsStub;
    gaxGrpc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    PageDescriptor;
    /**
     * Construct an instance of LocationsClient.
     *
     * @param {object} [options] - The configuration object.
     * The options accepted by the constructor are described in detail
     * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
     * The common options are:
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
     *     Follows the structure of {@link gapicConfig}.
     * @param {boolean} [options.fallback] - Use HTTP fallback mode.
     *     In fallback mode, a special browser-compatible transport implementation is used
     *     instead of gRPC transport. In browser context (if the `window` object is defined)
     *     the fallback mode is enabled automatically; set `options.fallback` to `false`
     *     if you need to override this behavior.
     */
    constructor(gaxGrpc, opts) {
      this.gaxGrpc = gaxGrpc;
      const staticMembers = this.constructor;
      const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
      this._providedCustomServicePath = !!(opts?.servicePath || opts?.apiEndpoint);
      const port = opts?.port || staticMembers.port;
      const clientConfig = opts?.clientConfig ?? {};
      const fallback2 = opts?.fallback ?? (typeof window !== "undefined" && typeof window?.fetch === "function");
      opts = Object.assign({ servicePath, port, clientConfig, fallback: fallback2 }, opts);
      if (servicePath !== staticMembers.servicePath && !("scopes" in opts)) {
        opts["scopes"] = staticMembers.scopes;
      }
      this._opts = opts;
      this.auth = gaxGrpc.auth;
      if (servicePath === staticMembers.servicePath) {
        this.auth.defaultScopes = staticMembers.scopes;
      }
      const clientHeader = [`gax/${version2}`, `gapic/${version2}`];
      if (typeof process !== "undefined" && "versions" in process) {
        clientHeader.push(`gl-node/${process.versions.node}`);
      } else {
        clientHeader.push(`gl-web/${version2}`);
      }
      if (!opts.fallback) {
        clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
      } else if (opts.fallback === "rest") {
        clientHeader.push(`rest/${gaxGrpc.grpcVersion}`);
      }
      if (opts.libName && opts.libVersion) {
        clientHeader.push(`${opts.libName}/${opts.libVersion}`);
      }
      this._protos = gaxGrpc.loadProtoJSON(jsonProtos);
      this.descriptors.page = {
        listLocations: new pageDescriptor_1.PageDescriptor("pageToken", "nextPageToken", "locations")
      };
      this._defaults = gaxGrpc.constructSettings("google.cloud.location.Locations", gapicConfig, opts.clientConfig || {}, { "x-goog-api-client": clientHeader.join(" ") });
      this.innerApiCalls = {};
      this.warn = warnings_1.warn;
    }
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize() {
      if (this.locationsStub) {
        return this.locationsStub;
      }
      this.locationsStub = this.gaxGrpc.createStub(this._opts.fallback ? this._protos.lookupService("google.cloud.location.Locations") : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._protos.google.cloud.location.Locations
      ), this._opts, this._providedCustomServicePath);
      const locationsStubMethods = ["listLocations", "getLocation"];
      for (const methodName of locationsStubMethods) {
        const callPromise = this.locationsStub.then((stub) => (...args) => {
          if (this._terminated) {
            return Promise.reject("The client has already been closed.");
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        }, (err) => () => {
          throw err;
        });
        const descriptor2 = this.descriptors.page[methodName] || void 0;
        const apiCall = (0, createApiCall_1.createApiCall)(callPromise, this._defaults[methodName], descriptor2);
        this.innerApiCalls[methodName] = apiCall;
      }
      return this.locationsStub;
    }
    /**
     * The DNS address for this API service.
     * @returns {string} The DNS address for this service.
     */
    static get servicePath() {
      return "cloud.googleapis.com";
    }
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     * @returns {string} The DNS address for this service.
     */
    static get apiEndpoint() {
      return "cloud.googleapis.com";
    }
    /**
     * The port for this API service.
     * @returns {number} The default port for this service.
     */
    static get port() {
      return 443;
    }
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     * @returns {string[]} List of default scopes.
     */
    static get scopes() {
      return ["https://www.googleapis.com/auth/cloud-platform"];
    }
    getProjectId(callback) {
      if (callback) {
        this.auth.getProjectId(callback);
        return;
      }
      return this.auth.getProjectId();
    }
    /**
     * Gets information about a location.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Resource name for the location.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing [Location]{@link google.cloud.location.Location}.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#regular-methods)
     *   for more details and examples.
     * @example
     * const [response] = await client.getLocation(request);
     */
    getLocation(request, optionsOrCallback, callback) {
      request = request || {};
      let options;
      if (typeof optionsOrCallback === "function" && callback === void 0) {
        callback = optionsOrCallback;
        options = {};
      } else {
        options = optionsOrCallback;
      }
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        name: request.name || ""
      });
      this.initialize().catch(console.error);
      return this.innerApiCalls.getLocation(request, options, callback);
    }
    /**
     * Lists information about the supported locations for this service.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   The resource that owns the locations collection, if applicable.
     * @param {string} request.filter
     *   The standard list filter.
     * @param {number} request.pageSize
     *   The standard list page size.
     * @param {string} request.pageToken
     *   The standard list page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of [Location]{@link google.cloud.location.Location}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listLocationsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination)
     *   for more details and examples.
     */
    listLocations(request, optionsOrCallback, callback) {
      request = request || {};
      let options;
      if (typeof optionsOrCallback === "function" && callback === void 0) {
        callback = optionsOrCallback;
        options = {};
      } else {
        options = optionsOrCallback;
      }
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        name: request.name || ""
      });
      this.initialize().catch(console.error);
      return this.innerApiCalls.listLocations(request, options, callback);
    }
    /**
     * Equivalent to `listLocations`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   The resource that owns the locations collection, if applicable.
     * @param {string} request.filter
     *   The standard list filter.
     * @param {number} request.pageSize
     *   The standard list page size.
     * @param {string} request.pageToken
     *   The standard list page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows [async iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
     *   When you iterate the returned iterable, each element will be an object representing
     *   [Location]{@link google.cloud.location.Location}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the
     *   [documentation](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#auto-pagination)
     *   for more details and examples.
     * @example
     * const iterable = client.listLocationsAsync(request);
     * for await (const response of iterable) {
     *   // process response
     * }
     */
    listLocationsAsync(request, options) {
      request = request || {};
      options = options || {};
      options.otherArgs = options.otherArgs || {};
      options.otherArgs.headers = options.otherArgs.headers || {};
      options.otherArgs.headers["x-goog-request-params"] = routingHeader2.fromParams({
        name: request.name || ""
      });
      options = options || {};
      const callSettings = new gax2.CallSettings(options);
      this.initialize().catch(console.error);
      return this.descriptors.page.listLocations.asyncIterate(this.innerApiCalls["listLocations"], request, callSettings);
    }
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close() {
      this.initialize().catch(console.error);
      if (!this._terminated) {
        return this.locationsStub.then((stub) => {
          this._terminated = true;
          stub.close();
        });
      }
      return Promise.resolve();
    }
  }
  locationService.LocationsClient = LocationsClient;
  return locationService;
}
var fallback_1 = fallback.exports;
var hasRequiredFallback;
function requireFallback() {
  if (hasRequiredFallback) return fallback.exports;
  hasRequiredFallback = 1;
  (function(module, exports) {
    var __createBinding = fallback_1 && fallback_1.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __setModuleDefault = fallback_1 && fallback_1.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = fallback_1 && fallback_1.__importStar || /* @__PURE__ */ (function() {
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
    var __importDefault = fallback_1 && fallback_1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fallback = exports.GoogleError = exports.operation = exports.Operation = exports.warn = exports.protobufMinimal = exports.protobuf = exports.LocationProtos = exports.IamProtos = exports.operationsProtos = exports.protobufFromJSON = exports.GrpcClient = exports.defaultToObjectOptions = exports.makeUUID = exports.LocationsClient = exports.IamClient = exports.OperationsClient = exports.StreamType = exports.StreamDescriptor = exports.PageDescriptor = exports.LongrunningDescriptor = exports.BundleDescriptor = exports.version = exports.createDefaultBackoffSettings = exports.RetryOptions = exports.constructSettings = exports.CallSettings = exports.routingHeader = exports.PathTemplate = void 0;
    exports.lro = lro;
    exports.createApiCall = createApiCall2;
    const object_hash_1 = __importDefault(requireObjectHash());
    const protobuf = __importStar(requireProtobufjs());
    exports.protobuf = protobuf;
    const gax2 = __importStar(requireGax());
    const routingHeader2 = __importStar(requireRoutingHeader());
    exports.routingHeader = routingHeader2;
    const status_1 = requireStatus();
    const google_auth_library_1 = requireSrc$2();
    const operationsClient_1 = requireOperationsClient();
    const createApiCall_1 = requireCreateApiCall();
    const fallbackRest2 = __importStar(requireFallbackRest());
    const featureDetection_1 = requireFeatureDetection();
    const fallbackServiceStub_1 = requireFallbackServiceStub();
    const streaming_1 = requireStreaming();
    const util_1 = requireUtil();
    const IamProtos = __importStar(requireIam_service());
    exports.IamProtos = IamProtos;
    const LocationProtos = __importStar(requireLocations());
    exports.LocationProtos = LocationProtos;
    const operationsProtos = __importStar(requireOperations());
    exports.operationsProtos = operationsProtos;
    var pathTemplate_1 = requirePathTemplate();
    Object.defineProperty(exports, "PathTemplate", { enumerable: true, get: function() {
      return pathTemplate_1.PathTemplate;
    } });
    var gax_1 = requireGax();
    Object.defineProperty(exports, "CallSettings", { enumerable: true, get: function() {
      return gax_1.CallSettings;
    } });
    Object.defineProperty(exports, "constructSettings", { enumerable: true, get: function() {
      return gax_1.constructSettings;
    } });
    Object.defineProperty(exports, "RetryOptions", { enumerable: true, get: function() {
      return gax_1.RetryOptions;
    } });
    Object.defineProperty(exports, "createDefaultBackoffSettings", { enumerable: true, get: function() {
      return gax_1.createDefaultBackoffSettings;
    } });
    exports.version = require$$20.version + "-fallback";
    var descriptor_1 = requireDescriptor();
    Object.defineProperty(exports, "BundleDescriptor", { enumerable: true, get: function() {
      return descriptor_1.BundleDescriptor;
    } });
    Object.defineProperty(exports, "LongrunningDescriptor", { enumerable: true, get: function() {
      return descriptor_1.LongrunningDescriptor;
    } });
    Object.defineProperty(exports, "PageDescriptor", { enumerable: true, get: function() {
      return descriptor_1.PageDescriptor;
    } });
    Object.defineProperty(exports, "StreamDescriptor", { enumerable: true, get: function() {
      return descriptor_1.StreamDescriptor;
    } });
    var streaming_2 = requireStreaming();
    Object.defineProperty(exports, "StreamType", { enumerable: true, get: function() {
      return streaming_2.StreamType;
    } });
    var operationsClient_2 = requireOperationsClient();
    Object.defineProperty(exports, "OperationsClient", { enumerable: true, get: function() {
      return operationsClient_2.OperationsClient;
    } });
    var iamService_1 = requireIamService();
    Object.defineProperty(exports, "IamClient", { enumerable: true, get: function() {
      return iamService_1.IamClient;
    } });
    var locationService_1 = requireLocationService();
    Object.defineProperty(exports, "LocationsClient", { enumerable: true, get: function() {
      return locationService_1.LocationsClient;
    } });
    var util_2 = requireUtil();
    Object.defineProperty(exports, "makeUUID", { enumerable: true, get: function() {
      return util_2.makeUUID;
    } });
    exports.defaultToObjectOptions = {
      keepCase: false,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    };
    const CLIENT_VERSION_HEADER = "x-goog-api-client";
    class GrpcClient {
      auth;
      /**
       * @deprecated use {@link GrpcClient.auth} instead
       */
      authClient;
      fallback;
      grpcVersion;
      static protoCache = /* @__PURE__ */ new Map();
      httpRules;
      numericEnums;
      minifyJson;
      /**
       * In rare cases users might need to deallocate all memory consumed by loaded protos.
       * This method will delete the proto cache content.
       */
      static clearProtoCache() {
        GrpcClient.protoCache.clear();
      }
      /**
       * gRPC-fallback version of GrpcClient
       * Implements GrpcClient API for a browser using grpc-fallback protocol (sends serialized protobuf to HTTP/1 $rpc endpoint).
       *
       * @param options {@link GrpcClientOptions}
       */
      constructor(options = {}) {
        if (options.auth) {
          this.auth = options.auth;
        } else if ("authClient" in options) {
          this.auth = options.authClient;
        } else {
          this.auth = new google_auth_library_1.GoogleAuth({
            authClient: options.auth,
            ...options
          });
        }
        this.fallback = options.fallback ? true : false;
        this.grpcVersion = require$$20.version;
        this.httpRules = options.httpRules;
        this.numericEnums = options.numericEnums ?? false;
        this.minifyJson = options.minifyJson ?? false;
      }
      /**
       * gRPC-fallback version of loadProto
       * Loads the protobuf root object from a JSON object created from a proto file
       * @param {Object} jsonObject - A JSON version of a protofile created usin protobuf.js
       * @returns {Object} Root namespace of proto JSON
       */
      loadProto(jsonObject) {
        const rootObject = protobuf.Root.fromJSON(jsonObject);
        return rootObject;
      }
      loadProtoJSON(json, ignoreCache = false) {
        return GrpcClient.protobufFromJSON(json, ignoreCache);
      }
      /**
       * Loads the protobuf root object from a JSON object created from a proto file.
       * By default, this is cached in a global cache and the results should not be mutated.
       * @param {Object} jsonObject - A JSON version of a protofile created usin protobuf.js
       * @returns {Object} Root namespace of proto JSON
       */
      static protobufFromJSON(json, ignoreCache = false) {
        const hash = (0, object_hash_1.default)(JSON.stringify(json)).toString();
        const cached = GrpcClient.protoCache.get(hash);
        if (cached && !ignoreCache) {
          return cached;
        }
        const root = protobuf.Root.fromJSON(json);
        GrpcClient.protoCache.set(hash, root);
        return root;
      }
      static getServiceMethods(service) {
        const methods = {};
        for (const [methodName, methodObject] of Object.entries(service.methods)) {
          const methodNameLowerCamelCase = (0, util_1.toLowerCamelCase)(methodName);
          methods[methodNameLowerCamelCase] = methodObject;
        }
        return methods;
      }
      /**
       * gRPC-fallback version of constructSettings
       * A wrapper of {@link constructSettings} function under the gRPC context.
       *
       * Most of parameters are common among constructSettings, please take a look.
       * @param {string} serviceName - The fullly-qualified name of the service.
       * @param {Object} clientConfig - A dictionary of the client config.
       * @param {Object} configOverrides - A dictionary of overriding configs.
       * @param {Object} headers - A dictionary of additional HTTP header name to
       *   its value.
       * @return {Object} A mapping of method names to CallSettings.
       */
      constructSettings(serviceName, clientConfig, configOverrides, headers) {
        function buildMetadata(abTests, moreHeaders) {
          const metadata = {};
          if (!headers) {
            headers = {};
          }
          for (const key in headers) {
            metadata[key] = Array.isArray(headers[key]) ? headers[key] : [headers[key]];
          }
          const clientVersions = [];
          if (metadata[CLIENT_VERSION_HEADER] && metadata[CLIENT_VERSION_HEADER][0]) {
            clientVersions.push(...metadata[CLIENT_VERSION_HEADER][0].split(" "));
          }
          clientVersions.push(`grpc-web/${exports.version}`);
          metadata[CLIENT_VERSION_HEADER] = [clientVersions.join(" ")];
          if (!moreHeaders) {
            return metadata;
          }
          for (const key in moreHeaders) {
            if (key.toLowerCase() !== CLIENT_VERSION_HEADER) {
              const value = moreHeaders[key];
              if (Array.isArray(value)) {
                if (metadata[key] === void 0) {
                  metadata[key] = value;
                } else {
                  if (Array.isArray(metadata[key])) {
                    metadata[key].push(...value);
                  } else {
                    throw new Error(`Can not add value ${value} to the call metadata.`);
                  }
                }
              } else {
                metadata[key] = [value];
              }
            }
          }
          return metadata;
        }
        return gax2.constructSettings(serviceName, clientConfig, configOverrides, status_1.Status, { metadataBuilder: buildMetadata });
      }
      /**
       * gRPC-fallback version of createStub
       * Creates a gRPC-fallback stub with authentication headers built from supplied `AuthClient` instance
       *
       * @param {function} CreateStub - The constructor function of the stub.
       * @param {Object} service - A protobufjs Service object (as returned by lookupService)
       * @param {Object} opts - Connection options, as described below.
       * @param {string} opts.servicePath - The hostname of the API endpoint service.
       * @param {number} opts.port - The port of the service.
       * @return {Promise} A promise which resolves to a gRPC-fallback service stub, which is a protobuf.js service stub instance modified to match the gRPC stub API
       */
      async createStub(service, opts, customServicePath) {
        if (!this.authClient) {
          if (this.auth && "getClient" in this.auth) {
            this.authClient = await this.auth.getClient();
          } else if (this.auth && "getRequestHeaders" in this.auth) {
            this.authClient = this.auth;
          }
        }
        if (!this.authClient) {
          throw new Error("No authentication was provided");
        }
        if (!opts.universeDomain) {
          opts.universeDomain = "googleapis.com";
        }
        if (opts.universeDomain) {
          const universeFromAuth = this.authClient.universeDomain;
          if (universeFromAuth && opts.universeDomain !== universeFromAuth) {
            throw new Error(`The configured universe domain (${opts.universeDomain}) does not match the universe domain found in the credentials (${universeFromAuth}). If you haven't configured the universe domain explicitly, googleapis.com is the default.`);
          }
        }
        service.resolveAll();
        const methods = GrpcClient.getServiceMethods(service);
        const protocol = opts.protocol || "https";
        let servicePath = opts.servicePath;
        if (!servicePath && service.options && service.options["(google.api.default_host)"]) {
          servicePath = service.options["(google.api.default_host)"];
        }
        if (!servicePath) {
          throw new Error(`Cannot determine service API path for service ${service.name}.`);
        }
        let servicePort;
        const match = servicePath.match(/^(.*):(\d+)$/);
        if (match) {
          servicePath = match[1];
          servicePort = parseInt(match[2]);
        }
        if (opts.port) {
          servicePort = opts.port;
        } else if (!servicePort) {
          servicePort = 443;
        }
        const encoder = fallbackRest2.encodeRequest;
        const decoder = fallbackRest2.decodeResponse;
        const serviceStub = (0, fallbackServiceStub_1.generateServiceStub)(methods, protocol, servicePath, servicePort, this.auth || this.authClient, encoder, decoder, this.numericEnums, this.minifyJson);
        return serviceStub;
      }
      /**
       * Creates a 'bytelength' function for a given proto message class.
       *
       * See {@link BundleDescriptor} about the meaning of the return value.
       *
       * @param {function} message - a constructor function that is generated by
       *   protobuf.js. Assumes 'encoder' field in the message.
       * @return {function(Object):number} - a function to compute the byte length
       *   for an object.
       */
      static createByteLengthFunction(message) {
        return gax2.createByteLengthFunction(message);
      }
    }
    exports.GrpcClient = GrpcClient;
    exports.protobufFromJSON = GrpcClient.protobufFromJSON;
    function lro(options) {
      options = Object.assign({ scopes: [] }, options);
      if (options.protoJson) {
        options = Object.assign(options, { fallback: true });
      }
      const gaxGrpc = new GrpcClient(options);
      return new operationsClient_1.OperationsClientBuilder(gaxGrpc, options.protoJson);
    }
    function createApiCall2(func, settings, descriptor2, _fallback) {
      if (descriptor2 && "streaming" in descriptor2 && descriptor2.type !== streaming_1.StreamType.SERVER_STREAMING) {
        return () => {
          throw new Error("The REST transport currently does not support client-streaming or bidi-stream calls.");
        };
      }
      if (descriptor2 && "streaming" in descriptor2 && !(0, featureDetection_1.isNodeJS)()) {
        return () => {
          throw new Error("Server streaming over the REST transport is only supported in Node.js.");
        };
      }
      return (0, createApiCall_1.createApiCall)(func, settings, descriptor2);
    }
    exports.protobufMinimal = __importStar(requireMinimal());
    var warnings_1 = requireWarnings();
    Object.defineProperty(exports, "warn", { enumerable: true, get: function() {
      return warnings_1.warn;
    } });
    var longrunning_1 = requireLongrunning();
    Object.defineProperty(exports, "Operation", { enumerable: true, get: function() {
      return longrunning_1.Operation;
    } });
    Object.defineProperty(exports, "operation", { enumerable: true, get: function() {
      return longrunning_1.operation;
    } });
    var googleError_1 = requireGoogleError();
    Object.defineProperty(exports, "GoogleError", { enumerable: true, get: function() {
      return googleError_1.GoogleError;
    } });
    const fallback2 = module.exports;
    exports.fallback = fallback2;
  })(fallback, fallback.exports);
  return fallback.exports;
}
var src = {};
var grpc = {};
const require$$10 = [
  "google/api/annotations.proto",
  "google/api/apikeys/v2/apikeys.proto",
  "google/api/apikeys/v2/resources.proto",
  "google/api/auth.proto",
  "google/api/backend.proto",
  "google/api/billing.proto",
  "google/api/client.proto",
  "google/api/cloudquotas/v1/cloudquotas.proto",
  "google/api/cloudquotas/v1/resources.proto",
  "google/api/config_change.proto",
  "google/api/consumer.proto",
  "google/api/context.proto",
  "google/api/control.proto",
  "google/api/distribution.proto",
  "google/api/documentation.proto",
  "google/api/endpoint.proto",
  "google/api/error_reason.proto",
  "google/api/expr/conformance/v1alpha1/conformance_service.proto",
  "google/api/expr/v1alpha1/checked.proto",
  "google/api/expr/v1alpha1/eval.proto",
  "google/api/expr/v1alpha1/explain.proto",
  "google/api/expr/v1alpha1/syntax.proto",
  "google/api/expr/v1alpha1/value.proto",
  "google/api/expr/v1beta1/decl.proto",
  "google/api/expr/v1beta1/eval.proto",
  "google/api/expr/v1beta1/expr.proto",
  "google/api/expr/v1beta1/source.proto",
  "google/api/expr/v1beta1/value.proto",
  "google/api/field_behavior.proto",
  "google/api/field_info.proto",
  "google/api/http.proto",
  "google/api/httpbody.proto",
  "google/api/label.proto",
  "google/api/launch_stage.proto",
  "google/api/log.proto",
  "google/api/logging.proto",
  "google/api/metric.proto",
  "google/api/monitored_resource.proto",
  "google/api/monitoring.proto",
  "google/api/policy.proto",
  "google/api/quota.proto",
  "google/api/resource.proto",
  "google/api/routing.proto",
  "google/api/service.proto",
  "google/api/servicecontrol/v1/check_error.proto",
  "google/api/servicecontrol/v1/distribution.proto",
  "google/api/servicecontrol/v1/http_request.proto",
  "google/api/servicecontrol/v1/log_entry.proto",
  "google/api/servicecontrol/v1/metric_value.proto",
  "google/api/servicecontrol/v1/operation.proto",
  "google/api/servicecontrol/v1/quota_controller.proto",
  "google/api/servicecontrol/v1/service_controller.proto",
  "google/api/servicecontrol/v2/service_controller.proto",
  "google/api/servicemanagement/v1/resources.proto",
  "google/api/servicemanagement/v1/servicemanager.proto",
  "google/api/serviceusage/v1/resources.proto",
  "google/api/serviceusage/v1/serviceusage.proto",
  "google/api/serviceusage/v1beta1/resources.proto",
  "google/api/serviceusage/v1beta1/serviceusage.proto",
  "google/api/source_info.proto",
  "google/api/system_parameter.proto",
  "google/api/usage.proto",
  "google/api/visibility.proto",
  "google/cloud/location/locations.proto",
  "google/iam/v1/iam_policy.proto",
  "google/iam/v1/logging/audit_data.proto",
  "google/iam/v1/options.proto",
  "google/iam/v1/policy.proto",
  "google/logging/type/http_request.proto",
  "google/logging/type/log_severity.proto",
  "google/longrunning/operations.proto",
  "google/monitoring/v3/alert.proto",
  "google/monitoring/v3/alert_service.proto",
  "google/monitoring/v3/common.proto",
  "google/monitoring/v3/dropped_labels.proto",
  "google/monitoring/v3/group.proto",
  "google/monitoring/v3/group_service.proto",
  "google/monitoring/v3/metric.proto",
  "google/monitoring/v3/metric_service.proto",
  "google/monitoring/v3/mutation_record.proto",
  "google/monitoring/v3/notification.proto",
  "google/monitoring/v3/notification_service.proto",
  "google/monitoring/v3/query_service.proto",
  "google/monitoring/v3/service.proto",
  "google/monitoring/v3/service_service.proto",
  "google/monitoring/v3/snooze.proto",
  "google/monitoring/v3/snooze_service.proto",
  "google/monitoring/v3/span_context.proto",
  "google/monitoring/v3/uptime.proto",
  "google/monitoring/v3/uptime_service.proto",
  "google/protobuf/any.proto",
  "google/protobuf/api.proto",
  "google/protobuf/bridge/message_set.proto",
  "google/protobuf/compiler/plugin.proto",
  "google/protobuf/compiler/ruby/ruby_generated_code.proto",
  "google/protobuf/compiler/ruby/ruby_generated_code_proto2.proto",
  "google/protobuf/compiler/ruby/ruby_generated_code_proto2_import.proto",
  "google/protobuf/compiler/ruby/ruby_generated_pkg_explicit.proto",
  "google/protobuf/compiler/ruby/ruby_generated_pkg_explicit_legacy.proto",
  "google/protobuf/compiler/ruby/ruby_generated_pkg_implicit.proto",
  "google/protobuf/cpp_features.proto",
  "google/protobuf/descriptor.proto",
  "google/protobuf/duration.proto",
  "google/protobuf/empty.proto",
  "google/protobuf/field_mask.proto",
  "google/protobuf/source_context.proto",
  "google/protobuf/struct.proto",
  "google/protobuf/timestamp.proto",
  "google/protobuf/type.proto",
  "google/protobuf/util/json_format.proto",
  "google/protobuf/util/json_format_proto3.proto",
  "google/protobuf/wrappers.proto",
  "google/rpc/code.proto",
  "google/rpc/context/attribute_context.proto",
  "google/rpc/context/audit_context.proto",
  "google/rpc/error_details.proto",
  "google/rpc/http.proto",
  "google/rpc/status.proto",
  "google/type/calendar_period.proto",
  "google/type/color.proto",
  "google/type/date.proto",
  "google/type/datetime.proto",
  "google/type/dayofweek.proto",
  "google/type/decimal.proto",
  "google/type/expr.proto",
  "google/type/fraction.proto",
  "google/type/interval.proto",
  "google/type/latlng.proto",
  "google/type/localized_text.proto",
  "google/type/money.proto",
  "google/type/month.proto",
  "google/type/phone_number.proto",
  "google/type/postal_address.proto",
  "google/type/quaternion.proto",
  "google/type/timeofday.proto"
];
var hasRequiredGrpc;
function requireGrpc() {
  if (hasRequiredGrpc) return grpc;
  hasRequiredGrpc = 1;
  var __createBinding = grpc && grpc.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = grpc && grpc.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = grpc && grpc.__importStar || /* @__PURE__ */ (function() {
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
  var __importDefault = grpc && grpc.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(grpc, "__esModule", { value: true });
  grpc.GoogleProtoFilesRoot = grpc.GrpcClient = grpc.ClientStub = void 0;
  const grpcProtoLoader = __importStar(requireSrc$3());
  const child_process_1 = require$$1$3;
  const fs = __importStar(require$$0$4);
  const google_auth_library_1 = requireSrc$2();
  const grpc$1 = __importStar(requireSrc$4());
  const os = __importStar(require$$1$2);
  const path_1 = require$$5$2;
  const path = __importStar(require$$5$2);
  const protobuf = __importStar(requireProtobufjs());
  const object_hash_1 = __importDefault(requireObjectHash());
  const gax2 = __importStar(requireGax());
  const googleProtoFilesDir = path.join(__dirname, "..", "..", "build", "protos");
  const INCLUDE_DIRS = [];
  INCLUDE_DIRS.push(googleProtoFilesDir);
  const protosList_json_1 = __importDefault(require$$10);
  const COMMON_PROTO_FILES = protosList_json_1.default.map((file) => file.replace(/[/\\]/g, path.sep));
  async function readFileAsync(path2) {
    return new Promise((resolve, reject) => {
      fs.readFile(path2, "utf8", (err, content) => {
        if (err)
          return reject(err);
        else
          resolve(content);
      });
    });
  }
  async function execFileAsync(command, args) {
    return new Promise((resolve, reject) => {
      (0, child_process_1.execFile)(command, args, (err, stdout) => {
        if (err)
          return reject(err);
        else
          resolve(stdout);
      });
    });
  }
  class ClientStub extends grpc$1.Client {
  }
  grpc.ClientStub = ClientStub;
  class GrpcClient {
    auth;
    grpc;
    grpcVersion;
    fallback;
    static protoCache = /* @__PURE__ */ new Map();
    httpRules;
    /**
     * Base directory for resolving client certificates.
     *
     * @internal
     */
    baseDirectory;
    /**
     * Key for proto cache map. We are doing our best to make sure we respect
     * the options, so if the same proto file is loaded with different set of
     * options, the cache won't be used.  Since some of the options are
     * Functions (e.g. `enums: String` - see below in `loadProto()`),
     * they will be omitted from the cache key.  If the cache breaks anything
     * for you, use the `ignoreCache` parameter of `loadProto()` to disable it.
     */
    static protoCacheKey(filename, options) {
      if (!filename || Array.isArray(filename) && (filename.length === 0 || !filename[0])) {
        return void 0;
      }
      return JSON.stringify(filename) + " " + JSON.stringify(options);
    }
    /**
     * In rare cases users might need to deallocate all memory consumed by loaded protos.
     * This method will delete the proto cache content.
     */
    static clearProtoCache() {
      GrpcClient.protoCache.clear();
    }
    /**
     * A class which keeps the context of gRPC and auth for the gRPC.
     *
     * @param {Object=} options - The optional parameters. It will be directly
     *   passed to google-auth-library library, so parameters like keyFile or
     *   credentials will be valid.
     * @param {Object=} options.auth - An instance of google-auth-library.
     *   When specified, this auth instance will be used instead of creating
     *   a new one.
     * @param {Object=} options.grpc - When specified, this will be used
     *   for the 'grpc' module in this context. By default, it will load the grpc
     *   module in the standard way.
     * @constructor
     */
    constructor(options = {}) {
      this.auth = options.auth || new google_auth_library_1.GoogleAuth(options);
      this.fallback = false;
      const minimumVersion = 10;
      const major = Number(process.version.match(/^v(\d+)/)?.[1]);
      if (Number.isNaN(major) || major < minimumVersion) {
        const errorMessage = `Node.js v${minimumVersion}.0.0 is a minimum requirement. To learn about legacy version support visit: https://github.com/googleapis/google-cloud-node#supported-nodejs-versions`;
        throw new Error(errorMessage);
      }
      if ("grpc" in options) {
        this.grpc = options.grpc;
        this.grpcVersion = "";
      } else {
        this.grpc = grpc$1;
        this.grpcVersion = require$$11.version;
      }
    }
    /**
     * Creates a gRPC credentials. It asks the auth data if necessary.
     * @private
     * @param {Object} opts - options values for configuring credentials.
     * @param {Object=} opts.sslCreds - when specified, this is used instead
     *   of default channel credentials.
     * @return {Promise} The promise which will be resolved to the gRPC credential.
     */
    async _getCredentials(opts) {
      if (opts.sslCreds) {
        return opts.sslCreds;
      }
      const grpc2 = this.grpc;
      const sslCreds = opts.cert && opts.key ? grpc2.credentials.createSsl(null, Buffer.from(opts.key), Buffer.from(opts.cert)) : grpc2.credentials.createSsl();
      const client = await this.auth.getClient();
      const credentials = grpc2.credentials.combineChannelCredentials(sslCreds, grpc2.credentials.createFromGoogleCredential({
        // the `grpc` package does not support the `Headers` object yet
        getRequestHeaders: async (url) => {
          const headers = await client.getRequestHeaders(url);
          const genericHeadersObject = {};
          headers.forEach((value, key) => genericHeadersObject[key] = value);
          return genericHeadersObject;
        }
      }));
      return credentials;
    }
    static defaultOptions() {
      const includeDirs = INCLUDE_DIRS.slice();
      const options = {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs
      };
      return options;
    }
    /**
     * Loads the gRPC service from the proto file(s) at the given path and with the
     * given options. Caches the loaded protos so the subsequent loads don't do
     * any disk reads.
     * @param filename The path to the proto file(s).
     * @param options Options for loading the proto file.
     * @param ignoreCache Defaults to `false`. Set it to `true` if the caching logic
     *   incorrectly decides that the options object is the same, or if you want to
     *   re-read the protos from disk for any other reason.
     */
    loadFromProto(filename, options, ignoreCache = false) {
      const cacheKey = GrpcClient.protoCacheKey(filename, options);
      let grpcPackage = cacheKey ? GrpcClient.protoCache.get(cacheKey) : void 0;
      if (ignoreCache || !grpcPackage) {
        const packageDef = grpcProtoLoader.loadSync(filename, options);
        grpcPackage = this.grpc.loadPackageDefinition(packageDef);
        if (cacheKey) {
          GrpcClient.protoCache.set(cacheKey, grpcPackage);
        }
      }
      return grpcPackage;
    }
    /**
     * Load gRPC proto service from a filename looking in googleapis common protos
     * when necessary. Caches the loaded protos so the subsequent loads don't do
     * any disk reads.
     * @param {String} protoPath - The directory to search for the protofile.
     * @param {String|String[]} filename - The filename(s) of the proto(s) to be loaded.
     *   If omitted, protoPath will be treated as a file path to load.
     * @param ignoreCache Defaults to `false`. Set it to `true` if the caching logic
     *   incorrectly decides that the options object is the same, or if you want to
     *   re-read the protos from disk for any other reason.
     * @return {Object<string, *>} The gRPC loaded result (the toplevel namespace
     *   object).
     */
    loadProto(protoPath, filename, ignoreCache = false) {
      if (!filename) {
        filename = path.basename(protoPath);
        protoPath = path.dirname(protoPath);
      }
      if (Array.isArray(filename) && filename.length === 0) {
        return {};
      }
      const options = GrpcClient.defaultOptions();
      options.includeDirs.unshift(protoPath);
      return this.loadFromProto(filename, options, ignoreCache);
    }
    static _resolveFile(protoPath, filename) {
      if (fs.existsSync(path.join(protoPath, filename))) {
        return path.join(protoPath, filename);
      } else if (COMMON_PROTO_FILES.indexOf(filename) > -1) {
        return path.join(googleProtoFilesDir, filename);
      }
      throw new Error(filename + " could not be found in " + protoPath);
    }
    loadProtoJSON(json, ignoreCache = false) {
      const hash = (0, object_hash_1.default)(JSON.stringify(json)).toString();
      const cached = GrpcClient.protoCache.get(hash);
      if (cached && !ignoreCache) {
        return cached;
      }
      const options = GrpcClient.defaultOptions();
      const packageDefinition = grpcProtoLoader.fromJSON(json, options);
      const grpcPackage = this.grpc.loadPackageDefinition(packageDefinition);
      GrpcClient.protoCache.set(hash, grpcPackage);
      return grpcPackage;
    }
    metadataBuilder(headers) {
      const Metadata = this.grpc.Metadata;
      const baseMetadata = new Metadata();
      for (const key in headers) {
        const value = headers[key];
        if (Array.isArray(value)) {
          value.forEach((v) => baseMetadata.add(key, v));
        } else {
          baseMetadata.set(key, `${value}`);
        }
      }
      return function buildMetadata(abTests, moreHeaders) {
        let copied = false;
        let metadata = baseMetadata;
        if (moreHeaders) {
          for (const key in moreHeaders) {
            if (key.toLowerCase() !== "x-goog-api-client") {
              if (!copied) {
                copied = true;
                metadata = metadata.clone();
              }
              const value = moreHeaders[key];
              if (Array.isArray(value)) {
                value.forEach((v) => metadata.add(key, v));
              } else {
                metadata.set(key, `${value}`);
              }
            }
          }
        }
        return metadata;
      };
    }
    /**
     * A wrapper of {@link constructSettings} function under the gRPC context.
     *
     * Most of parameters are common among constructSettings, please take a look.
     * @param {string} serviceName - The fullly-qualified name of the service.
     * @param {Object} clientConfig - A dictionary of the client config.
     * @param {Object} configOverrides - A dictionary of overriding configs.
     * @param {Object} headers - A dictionary of additional HTTP header name to
     *   its value.
     * @return {Object} A mapping of method names to CallSettings.
     */
    constructSettings(serviceName, clientConfig, configOverrides, headers) {
      return gax2.constructSettings(serviceName, clientConfig, configOverrides, this.grpc.status, { metadataBuilder: this.metadataBuilder(headers) });
    }
    /**
     * Creates a gRPC stub with current gRPC and auth.
     * @param {function} CreateStub - The constructor function of the stub.
     * @param {Object} options - The optional arguments to customize
     *   gRPC connection. This options will be passed to the constructor of
     *   gRPC client too.
     * @param {string} options.servicePath - The name of the server of the service.
     * @param {number} options.port - The port of the service.
     * @param {grpcTypes.ClientCredentials=} options.sslCreds - The credentials to be used
     *   to set up gRPC connection.
     * @param {string} defaultServicePath - The default service path.
     * @return {Promise} A promise which resolves to a gRPC stub instance.
     */
    async createStub(CreateStub, options, customServicePath) {
      const grpcGcpOptions = [
        "grpc.callInvocationTransformer",
        "grpc.channelFactoryOverride",
        "grpc.gcpApiConfig"
      ];
      const [cert, key] = await this._detectClientCertificate(options, options.universeDomain);
      const servicePath = this._mtlsServicePath(options.servicePath, customServicePath, cert && key);
      const opts = Object.assign({}, options, { cert, key, servicePath });
      const serviceAddress = servicePath + ":" + opts.port;
      if (!options.universeDomain) {
        options.universeDomain = "googleapis.com";
      }
      if (options.universeDomain) {
        const universeFromAuth = await this.auth.getUniverseDomain();
        if (universeFromAuth && options.universeDomain !== universeFromAuth) {
          throw new Error(`The configured universe domain (${options.universeDomain}) does not match the universe domain found in the credentials (${universeFromAuth}). If you haven't configured the universe domain explicitly, googleapis.com is the default.`);
        }
      }
      const creds = await this._getCredentials(opts);
      const grpcOptions = {};
      grpcOptions["grpc.max_receive_message_length"] = -1;
      grpcOptions["grpc.max_send_message_length"] = -1;
      grpcOptions["grpc.initial_reconnect_backoff_ms"] = 1e3;
      Object.keys(opts).forEach((key2) => {
        const value = options[key2];
        if (key2.startsWith("grpc.grpc.")) {
          key2 = key2.replace(/^grpc\./, "");
        }
        if (key2.startsWith("grpc.")) {
          if (grpcGcpOptions.includes(key2)) {
            key2 = key2.replace(/^grpc\./, "");
          }
          grpcOptions[key2] = value;
        }
        if (key2.startsWith("grpc-node.")) {
          grpcOptions[key2] = value;
        }
      });
      const stub = new CreateStub(serviceAddress, creds, grpcOptions);
      return stub;
    }
    /**
     * Detect mTLS client certificate based on logic described in
     * https://google.aip.dev/auth/4114.
     *
     * @param {object} [options] - The configuration object.
     * @returns {Promise} Resolves array of strings representing cert and key.
     */
    async _detectClientCertificate(opts, universeDomain) {
      const certRegex = /(?<cert>-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----)/s;
      const keyRegex = /(?<key>-----BEGIN PRIVATE KEY-----.*?-----END PRIVATE KEY-----)/s;
      if (typeof process !== "undefined" && process?.env?.GOOGLE_API_USE_CLIENT_CERTIFICATE === "true") {
        if (universeDomain && universeDomain !== "googleapis.com") {
          throw new Error("mTLS is not supported outside of googleapis.com universe domain.");
        }
        if (opts?.cert && opts?.key) {
          return [opts.cert, opts.key];
        }
        const metadataPath = (0, path_1.join)(this.baseDirectory || os.homedir(), ".secureConnect", "context_aware_metadata.json");
        const metadata = JSON.parse(await readFileAsync(metadataPath));
        if (!metadata.cert_provider_command) {
          throw Error("no cert_provider_command found");
        }
        const stdout = await execFileAsync(metadata.cert_provider_command[0], metadata.cert_provider_command.slice(1));
        const matchCert = stdout.toString().match(certRegex);
        const matchKey = stdout.toString().match(keyRegex);
        if (!(matchCert?.groups && matchKey?.groups)) {
          throw Error("unable to parse certificate and key");
        } else {
          return [matchCert.groups.cert, matchKey.groups.key];
        }
      }
      return [void 0, void 0];
    }
    /**
     * Return service path, taking into account mTLS logic.
     * See: https://google.aip.dev/auth/4114
     *
     * @param {string|undefined} servicePath - The path of the service.
     * @param {string|undefined} customServicePath - Did the user provide a custom service URL.
     * @param {boolean} hasCertificate - Was a certificate found.
     * @returns {string} The DNS address for this service.
     */
    _mtlsServicePath(servicePath, customServicePath, hasCertificate) {
      if (customServicePath || !servicePath)
        return servicePath;
      if (typeof process !== "undefined" && process?.env?.GOOGLE_API_USE_MTLS_ENDPOINT === "never") {
        return servicePath;
      } else if (typeof process !== "undefined" && process?.env?.GOOGLE_API_USE_MTLS_ENDPOINT === "always" || hasCertificate) {
        return servicePath.replace("googleapis.com", "mtls.googleapis.com");
      }
      return servicePath;
    }
    /**
     * Creates a 'bytelength' function for a given proto message class.
     *
     * See {@link BundleDescriptor} about the meaning of the return value.
     *
     * @param {function} message - a constructor function that is generated by
     *   protobuf.js. Assumes 'encoder' field in the message.
     * @return {function(Object):number} - a function to compute the byte length
     *   for an object.
     */
    static createByteLengthFunction(message) {
      return gax2.createByteLengthFunction(message);
    }
  }
  grpc.GrpcClient = GrpcClient;
  class GoogleProtoFilesRoot extends protobuf.Root {
    constructor(...args) {
      super(...args);
    }
    // Causes the loading of an included proto to check if it is a common
    // proto. If it is a common proto, use the bundled proto.
    resolvePath(originPath, includePath) {
      originPath = path.normalize(originPath);
      includePath = path.normalize(includePath);
      if (path.isAbsolute(includePath)) {
        if (!fs.existsSync(includePath)) {
          throw new Error("The include `" + includePath + "` was not found.");
        }
        return includePath;
      }
      if (COMMON_PROTO_FILES.indexOf(includePath) > -1) {
        return path.join(googleProtoFilesDir, includePath);
      }
      return GoogleProtoFilesRoot._findIncludePath(originPath, includePath);
    }
    static _findIncludePath(originPath, includePath) {
      originPath = path.normalize(originPath);
      includePath = path.normalize(includePath);
      let current = originPath;
      let found = fs.existsSync(path.join(current, includePath));
      while (!found && current.length > 0) {
        current = current.substring(0, current.lastIndexOf(path.sep));
        found = fs.existsSync(path.join(current, includePath));
      }
      if (!found) {
        throw new Error("The include `" + includePath + "` was not found.");
      }
      return path.join(current, includePath);
    }
  }
  grpc.GoogleProtoFilesRoot = GoogleProtoFilesRoot;
  return grpc;
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
    var __setModuleDefault = src && src.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = src && src.__importStar || /* @__PURE__ */ (function() {
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
    exports.serializer = exports.warn = exports.ChannelCredentials = exports.decodeProtobufAny = exports.decodeAnyProtosInArray = exports.makeUUID = exports.protobufFromJSON = exports.fallback = exports.protobufMinimal = exports.protobuf = exports.version = exports.createByteLengthFunction = exports.LocationsClient = exports.IamClient = exports.OperationsClient = exports.LocationProtos = exports.IamProtos = exports.operationsProtos = exports.routingHeader = exports.StreamType = exports.Status = exports.PathTemplate = exports.operation = exports.Operation = exports.GrpcClient = exports.GoogleProtoFilesRoot = exports.ClientStub = exports.GoogleError = exports.createMaxRetriesBackoffSettings = exports.createDefaultBackoffSettings = exports.createBackoffSettings = exports.createBundleOptions = exports.createRetryOptions = exports.RetryOptions = exports.constructSettings = exports.CallSettings = exports.StreamDescriptor = exports.PageDescriptor = exports.LongrunningDescriptor = exports.BundleDescriptor = exports.createApiCall = exports.OngoingCall = exports.grpc = exports.loggingUtils = exports.googleAuthLibrary = exports.GoogleAuth = void 0;
    exports.lro = lro;
    const grpc2 = __importStar(requireSrc$4());
    exports.grpc = grpc2;
    const grpc_1 = requireGrpc();
    const IamProtos = __importStar(requireIam_service());
    exports.IamProtos = IamProtos;
    const LocationProtos = __importStar(requireLocations());
    exports.LocationProtos = LocationProtos;
    const operationsProtos = __importStar(requireOperations());
    exports.operationsProtos = operationsProtos;
    const operationsClient2 = __importStar(requireOperationsClient());
    const routingHeader2 = __importStar(requireRoutingHeader());
    exports.routingHeader = routingHeader2;
    var google_auth_library_1 = requireSrc$2();
    Object.defineProperty(exports, "GoogleAuth", { enumerable: true, get: function() {
      return google_auth_library_1.GoogleAuth;
    } });
    exports.googleAuthLibrary = __importStar(requireSrc$2());
    exports.loggingUtils = __importStar(requireSrc$5());
    var call_1 = requireCall();
    Object.defineProperty(exports, "OngoingCall", { enumerable: true, get: function() {
      return call_1.OngoingCall;
    } });
    var createApiCall_1 = requireCreateApiCall();
    Object.defineProperty(exports, "createApiCall", { enumerable: true, get: function() {
      return createApiCall_1.createApiCall;
    } });
    var descriptor_1 = requireDescriptor();
    Object.defineProperty(exports, "BundleDescriptor", { enumerable: true, get: function() {
      return descriptor_1.BundleDescriptor;
    } });
    Object.defineProperty(exports, "LongrunningDescriptor", { enumerable: true, get: function() {
      return descriptor_1.LongrunningDescriptor;
    } });
    Object.defineProperty(exports, "PageDescriptor", { enumerable: true, get: function() {
      return descriptor_1.PageDescriptor;
    } });
    Object.defineProperty(exports, "StreamDescriptor", { enumerable: true, get: function() {
      return descriptor_1.StreamDescriptor;
    } });
    var gax_1 = requireGax();
    Object.defineProperty(exports, "CallSettings", { enumerable: true, get: function() {
      return gax_1.CallSettings;
    } });
    Object.defineProperty(exports, "constructSettings", { enumerable: true, get: function() {
      return gax_1.constructSettings;
    } });
    Object.defineProperty(exports, "RetryOptions", { enumerable: true, get: function() {
      return gax_1.RetryOptions;
    } });
    Object.defineProperty(exports, "createRetryOptions", { enumerable: true, get: function() {
      return gax_1.createRetryOptions;
    } });
    Object.defineProperty(exports, "createBundleOptions", { enumerable: true, get: function() {
      return gax_1.createBundleOptions;
    } });
    Object.defineProperty(exports, "createBackoffSettings", { enumerable: true, get: function() {
      return gax_1.createBackoffSettings;
    } });
    Object.defineProperty(exports, "createDefaultBackoffSettings", { enumerable: true, get: function() {
      return gax_1.createDefaultBackoffSettings;
    } });
    Object.defineProperty(exports, "createMaxRetriesBackoffSettings", { enumerable: true, get: function() {
      return gax_1.createMaxRetriesBackoffSettings;
    } });
    var googleError_1 = requireGoogleError();
    Object.defineProperty(exports, "GoogleError", { enumerable: true, get: function() {
      return googleError_1.GoogleError;
    } });
    var grpc_2 = requireGrpc();
    Object.defineProperty(exports, "ClientStub", { enumerable: true, get: function() {
      return grpc_2.ClientStub;
    } });
    Object.defineProperty(exports, "GoogleProtoFilesRoot", { enumerable: true, get: function() {
      return grpc_2.GoogleProtoFilesRoot;
    } });
    Object.defineProperty(exports, "GrpcClient", { enumerable: true, get: function() {
      return grpc_2.GrpcClient;
    } });
    var longrunning_1 = requireLongrunning();
    Object.defineProperty(exports, "Operation", { enumerable: true, get: function() {
      return longrunning_1.Operation;
    } });
    Object.defineProperty(exports, "operation", { enumerable: true, get: function() {
      return longrunning_1.operation;
    } });
    var pathTemplate_1 = requirePathTemplate();
    Object.defineProperty(exports, "PathTemplate", { enumerable: true, get: function() {
      return pathTemplate_1.PathTemplate;
    } });
    var status_1 = requireStatus();
    Object.defineProperty(exports, "Status", { enumerable: true, get: function() {
      return status_1.Status;
    } });
    var streaming_1 = requireStreaming();
    Object.defineProperty(exports, "StreamType", { enumerable: true, get: function() {
      return streaming_1.StreamType;
    } });
    function lro(options) {
      options = Object.assign({ scopes: lro.ALL_SCOPES }, options);
      const gaxGrpc = new grpc_1.GrpcClient(options);
      return new operationsClient2.OperationsClientBuilder(gaxGrpc);
    }
    lro.SERVICE_ADDRESS = operationsClient2.SERVICE_ADDRESS;
    lro.ALL_SCOPES = operationsClient2.ALL_SCOPES;
    var operationsClient_1 = requireOperationsClient();
    Object.defineProperty(exports, "OperationsClient", { enumerable: true, get: function() {
      return operationsClient_1.OperationsClient;
    } });
    var iamService_1 = requireIamService();
    Object.defineProperty(exports, "IamClient", { enumerable: true, get: function() {
      return iamService_1.IamClient;
    } });
    var locationService_1 = requireLocationService();
    Object.defineProperty(exports, "LocationsClient", { enumerable: true, get: function() {
      return locationService_1.LocationsClient;
    } });
    exports.createByteLengthFunction = grpc_1.GrpcClient?.createByteLengthFunction;
    exports.version = require$$20.version;
    const protobuf = __importStar(requireProtobufjs());
    exports.protobuf = protobuf;
    exports.protobufMinimal = __importStar(requireMinimal());
    const fallback2 = __importStar(requireFallback());
    exports.fallback = fallback2;
    exports.protobufFromJSON = fallback2.protobufFromJSON;
    var util_1 = requireUtil();
    Object.defineProperty(exports, "makeUUID", { enumerable: true, get: function() {
      return util_1.makeUUID;
    } });
    Object.defineProperty(exports, "decodeAnyProtosInArray", { enumerable: true, get: function() {
      return util_1.decodeAnyProtosInArray;
    } });
    Object.defineProperty(exports, "decodeProtobufAny", { enumerable: true, get: function() {
      return util_1.decodeProtobufAny;
    } });
    var grpc_js_1 = requireSrc$4();
    Object.defineProperty(exports, "ChannelCredentials", { enumerable: true, get: function() {
      return grpc_js_1.ChannelCredentials;
    } });
    var warnings_1 = requireWarnings();
    Object.defineProperty(exports, "warn", { enumerable: true, get: function() {
      return warnings_1.warn;
    } });
    const serializer = __importStar(requireSrc$1());
    exports.serializer = serializer;
  })(src);
  return src;
}
export {
  requireSrc as a,
  commonjsRequire as c,
  requireFallback as r
};
