import Url from "url";
import require$$1$1 from "tls";
import require$$0$1 from "net";
import require$$1$4 from "dns";
import require$$1 from "process";
import require$$0 from "fs";
import require$$1$2 from "os";
import { r as require$$1$3 } from "../js-sdsl__ordered-map.mjs";
import require$$0$2 from "events";
import require$$0$3 from "stream";
import { r as requireSrc$2, a as requireSrc$3 } from "../grpc__proto-loader.mjs";
import zlib from "zlib";
import require$$0$5 from "http2";
import require$$0$4 from "http";
import require$$0$6 from "util";
var src$1 = {};
var callCredentials$1 = {};
var metadata$1 = {};
var logging$1 = {};
var constants$1 = {};
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  Object.defineProperty(constants$1, "__esModule", { value: true });
  constants$1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = constants$1.DEFAULT_MAX_SEND_MESSAGE_LENGTH = constants$1.Propagate = constants$1.LogVerbosity = constants$1.Status = void 0;
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
  })(Status || (constants$1.Status = Status = {}));
  var LogVerbosity;
  (function(LogVerbosity2) {
    LogVerbosity2[LogVerbosity2["DEBUG"] = 0] = "DEBUG";
    LogVerbosity2[LogVerbosity2["INFO"] = 1] = "INFO";
    LogVerbosity2[LogVerbosity2["ERROR"] = 2] = "ERROR";
    LogVerbosity2[LogVerbosity2["NONE"] = 3] = "NONE";
  })(LogVerbosity || (constants$1.LogVerbosity = LogVerbosity = {}));
  var Propagate;
  (function(Propagate2) {
    Propagate2[Propagate2["DEADLINE"] = 1] = "DEADLINE";
    Propagate2[Propagate2["CENSUS_STATS_CONTEXT"] = 2] = "CENSUS_STATS_CONTEXT";
    Propagate2[Propagate2["CENSUS_TRACING_CONTEXT"] = 4] = "CENSUS_TRACING_CONTEXT";
    Propagate2[Propagate2["CANCELLATION"] = 8] = "CANCELLATION";
    Propagate2[Propagate2["DEFAULTS"] = 65535] = "DEFAULTS";
  })(Propagate || (constants$1.Propagate = Propagate = {}));
  constants$1.DEFAULT_MAX_SEND_MESSAGE_LENGTH = -1;
  constants$1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = 4 * 1024 * 1024;
  return constants$1;
}
const version$1 = "1.14.4";
const require$$11 = {
  version: version$1
};
var hasRequiredLogging$1;
function requireLogging$1() {
  if (hasRequiredLogging$1) return logging$1;
  hasRequiredLogging$1 = 1;
  (function(exports) {
    var _a, _b, _c, _d;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.log = exports.setLoggerVerbosity = exports.setLogger = exports.getLogger = void 0;
    exports.trace = trace;
    exports.isTracerEnabled = isTracerEnabled;
    const constants_1 = requireConstants$1();
    const process_1 = require$$1;
    const clientVersion = require$$11.version;
    const DEFAULT_LOGGER = {
      error: (message, ...optionalParams) => {
        console.error("E " + message, ...optionalParams);
      },
      info: (message, ...optionalParams) => {
        console.error("I " + message, ...optionalParams);
      },
      debug: (message, ...optionalParams) => {
        console.error("D " + message, ...optionalParams);
      }
    };
    let _logger = DEFAULT_LOGGER;
    let _logVerbosity = constants_1.LogVerbosity.ERROR;
    const verbosityString = (_b = (_a = process.env.GRPC_NODE_VERBOSITY) !== null && _a !== void 0 ? _a : process.env.GRPC_VERBOSITY) !== null && _b !== void 0 ? _b : "";
    switch (verbosityString.toUpperCase()) {
      case "DEBUG":
        _logVerbosity = constants_1.LogVerbosity.DEBUG;
        break;
      case "INFO":
        _logVerbosity = constants_1.LogVerbosity.INFO;
        break;
      case "ERROR":
        _logVerbosity = constants_1.LogVerbosity.ERROR;
        break;
      case "NONE":
        _logVerbosity = constants_1.LogVerbosity.NONE;
        break;
    }
    const getLogger = () => {
      return _logger;
    };
    exports.getLogger = getLogger;
    const setLogger = (logger) => {
      _logger = logger;
    };
    exports.setLogger = setLogger;
    const setLoggerVerbosity = (verbosity) => {
      _logVerbosity = verbosity;
    };
    exports.setLoggerVerbosity = setLoggerVerbosity;
    const log = (severity, ...args) => {
      let logFunction;
      if (severity >= _logVerbosity) {
        switch (severity) {
          case constants_1.LogVerbosity.DEBUG:
            logFunction = _logger.debug;
            break;
          case constants_1.LogVerbosity.INFO:
            logFunction = _logger.info;
            break;
          case constants_1.LogVerbosity.ERROR:
            logFunction = _logger.error;
            break;
        }
        if (!logFunction) {
          logFunction = _logger.error;
        }
        if (logFunction) {
          logFunction.bind(_logger)(...args);
        }
      }
    };
    exports.log = log;
    const tracersString = (_d = (_c = process.env.GRPC_NODE_TRACE) !== null && _c !== void 0 ? _c : process.env.GRPC_TRACE) !== null && _d !== void 0 ? _d : "";
    const enabledTracers = /* @__PURE__ */ new Set();
    const disabledTracers = /* @__PURE__ */ new Set();
    for (const tracerName of tracersString.split(",")) {
      if (tracerName.startsWith("-")) {
        disabledTracers.add(tracerName.substring(1));
      } else {
        enabledTracers.add(tracerName);
      }
    }
    const allEnabled = enabledTracers.has("all");
    function trace(severity, tracer, text) {
      if (isTracerEnabled(tracer)) {
        (0, exports.log)(severity, (/* @__PURE__ */ new Date()).toISOString() + " | v" + clientVersion + " " + process_1.pid + " | " + tracer + " | " + text);
      }
    }
    function isTracerEnabled(tracer) {
      return !disabledTracers.has(tracer) && (allEnabled || enabledTracers.has(tracer));
    }
  })(logging$1);
  return logging$1;
}
var error$1 = {};
var hasRequiredError$1;
function requireError$1() {
  if (hasRequiredError$1) return error$1;
  hasRequiredError$1 = 1;
  Object.defineProperty(error$1, "__esModule", { value: true });
  error$1.getErrorMessage = getErrorMessage;
  error$1.getErrorCode = getErrorCode;
  function getErrorMessage(error2) {
    if (error2 instanceof Error) {
      return error2.message;
    } else {
      return String(error2);
    }
  }
  function getErrorCode(error2) {
    if (typeof error2 === "object" && error2 !== null && "code" in error2 && typeof error2.code === "number") {
      return error2.code;
    } else {
      return null;
    }
  }
  return error$1;
}
var hasRequiredMetadata$1;
function requireMetadata$1() {
  if (hasRequiredMetadata$1) return metadata$1;
  hasRequiredMetadata$1 = 1;
  Object.defineProperty(metadata$1, "__esModule", { value: true });
  metadata$1.Metadata = void 0;
  const logging_1 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const error_1 = requireError$1();
  const LEGAL_KEY_REGEX = /^[:0-9a-z_.-]+$/;
  const LEGAL_NON_BINARY_VALUE_REGEX = /^[ -~]*$/;
  function isLegalKey(key) {
    return LEGAL_KEY_REGEX.test(key);
  }
  function isLegalNonBinaryValue(value) {
    return LEGAL_NON_BINARY_VALUE_REGEX.test(value);
  }
  function isBinaryKey(key) {
    return key.endsWith("-bin");
  }
  function isCustomMetadata(key) {
    return !key.startsWith("grpc-");
  }
  function normalizeKey(key) {
    return key.toLowerCase();
  }
  function validate(key, value) {
    if (!isLegalKey(key)) {
      throw new Error('Metadata key "' + key + '" contains illegal characters');
    }
    if (value !== null && value !== void 0) {
      if (isBinaryKey(key)) {
        if (!Buffer.isBuffer(value)) {
          throw new Error("keys that end with '-bin' must have Buffer values");
        }
      } else {
        if (Buffer.isBuffer(value)) {
          throw new Error("keys that don't end with '-bin' must have String values");
        }
        if (!isLegalNonBinaryValue(value)) {
          throw new Error('Metadata string value "' + value + '" contains illegal characters');
        }
      }
    }
  }
  class Metadata {
    constructor(options = {}) {
      this.internalRepr = /* @__PURE__ */ new Map();
      this.opaqueData = /* @__PURE__ */ new Map();
      this.options = options;
    }
    /**
     * Sets the given value for the given key by replacing any other values
     * associated with that key. Normalizes the key.
     * @param key The key to whose value should be set.
     * @param value The value to set. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    set(key, value) {
      key = normalizeKey(key);
      validate(key, value);
      this.internalRepr.set(key, [value]);
    }
    /**
     * Adds the given value for the given key by appending to a list of previous
     * values associated with that key. Normalizes the key.
     * @param key The key for which a new value should be appended.
     * @param value The value to add. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    add(key, value) {
      key = normalizeKey(key);
      validate(key, value);
      const existingValue = this.internalRepr.get(key);
      if (existingValue === void 0) {
        this.internalRepr.set(key, [value]);
      } else {
        existingValue.push(value);
      }
    }
    /**
     * Removes the given key and any associated values. Normalizes the key.
     * @param key The key whose values should be removed.
     */
    remove(key) {
      key = normalizeKey(key);
      this.internalRepr.delete(key);
    }
    /**
     * Gets a list of all values associated with the key. Normalizes the key.
     * @param key The key whose value should be retrieved.
     * @return A list of values associated with the given key.
     */
    get(key) {
      key = normalizeKey(key);
      return this.internalRepr.get(key) || [];
    }
    /**
     * Gets a plain object mapping each key to the first value associated with it.
     * This reflects the most common way that people will want to see metadata.
     * @return A key/value mapping of the metadata.
     */
    getMap() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        if (values.length > 0) {
          const v = values[0];
          result[key] = Buffer.isBuffer(v) ? Buffer.from(v) : v;
        }
      }
      return result;
    }
    /**
     * Clones the metadata object.
     * @return The newly cloned object.
     */
    clone() {
      const newMetadata = new Metadata(this.options);
      const newInternalRepr = newMetadata.internalRepr;
      for (const [key, value] of this.internalRepr) {
        const clonedValue = value.map((v) => {
          if (Buffer.isBuffer(v)) {
            return Buffer.from(v);
          } else {
            return v;
          }
        });
        newInternalRepr.set(key, clonedValue);
      }
      return newMetadata;
    }
    /**
     * Merges all key-value pairs from a given Metadata object into this one.
     * If both this object and the given object have values in the same key,
     * values from the other Metadata object will be appended to this object's
     * values.
     * @param other A Metadata object.
     */
    merge(other) {
      for (const [key, values] of other.internalRepr) {
        const mergedValue = (this.internalRepr.get(key) || []).concat(values);
        this.internalRepr.set(key, mergedValue);
      }
    }
    setOptions(options) {
      this.options = options;
    }
    getOptions() {
      return this.options;
    }
    /**
     * Creates an OutgoingHttpHeaders object that can be used with the http2 API.
     */
    toHttp2Headers() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        if (key.startsWith(":")) {
          continue;
        }
        result[key] = values.map(bufToString);
      }
      return result;
    }
    /**
     * This modifies the behavior of JSON.stringify to show an object
     * representation of the metadata map.
     */
    toJSON() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        result[key] = values;
      }
      return result;
    }
    /**
     * Attach additional data of any type to the metadata object, which will not
     * be included when sending headers. The data can later be retrieved with
     * `getOpaque`. Keys with the prefix `grpc` are reserved for use by this
     * library.
     * @param key
     * @param value
     */
    setOpaque(key, value) {
      this.opaqueData.set(key, value);
    }
    /**
     * Retrieve data previously added with `setOpaque`.
     * @param key
     * @returns
     */
    getOpaque(key) {
      return this.opaqueData.get(key);
    }
    /**
     * Returns a new Metadata object based fields in a given IncomingHttpHeaders
     * object.
     * @param headers An IncomingHttpHeaders object.
     */
    static fromHttp2Headers(headers) {
      const result = new Metadata();
      for (const key of Object.keys(headers)) {
        if (key.charAt(0) === ":") {
          continue;
        }
        const values = headers[key];
        try {
          if (isBinaryKey(key)) {
            if (Array.isArray(values)) {
              values.forEach((value) => {
                result.add(key, Buffer.from(value, "base64"));
              });
            } else if (values !== void 0) {
              if (isCustomMetadata(key)) {
                values.split(",").forEach((v) => {
                  result.add(key, Buffer.from(v.trim(), "base64"));
                });
              } else {
                result.add(key, Buffer.from(values, "base64"));
              }
            }
          } else {
            if (Array.isArray(values)) {
              values.forEach((value) => {
                result.add(key, value);
              });
            } else if (values !== void 0) {
              result.add(key, values);
            }
          }
        } catch (error2) {
          const message = `Failed to add metadata entry ${key}: ${values}. ${(0, error_1.getErrorMessage)(error2)}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
          (0, logging_1.log)(constants_1.LogVerbosity.ERROR, message);
        }
      }
      return result;
    }
  }
  metadata$1.Metadata = Metadata;
  const bufToString = (val) => {
    return Buffer.isBuffer(val) ? val.toString("base64") : val;
  };
  return metadata$1;
}
var hasRequiredCallCredentials$1;
function requireCallCredentials$1() {
  if (hasRequiredCallCredentials$1) return callCredentials$1;
  hasRequiredCallCredentials$1 = 1;
  Object.defineProperty(callCredentials$1, "__esModule", { value: true });
  callCredentials$1.CallCredentials = void 0;
  const metadata_1 = requireMetadata$1();
  function isCurrentOauth2Client(client2) {
    return "getRequestHeaders" in client2 && typeof client2.getRequestHeaders === "function";
  }
  class CallCredentials {
    /**
     * Creates a new CallCredentials object from a given function that generates
     * Metadata objects.
     * @param metadataGenerator A function that accepts a set of options, and
     * generates a Metadata object based on these options, which is passed back
     * to the caller via a supplied (err, metadata) callback.
     */
    static createFromMetadataGenerator(metadataGenerator) {
      return new SingleCallCredentials(metadataGenerator);
    }
    /**
     * Create a gRPC credential from a Google credential object.
     * @param googleCredentials The authentication client to use.
     * @return The resulting CallCredentials object.
     */
    static createFromGoogleCredential(googleCredentials) {
      return CallCredentials.createFromMetadataGenerator((options, callback) => {
        let getHeaders;
        if (isCurrentOauth2Client(googleCredentials)) {
          getHeaders = googleCredentials.getRequestHeaders(options.service_url);
        } else {
          getHeaders = new Promise((resolve, reject) => {
            googleCredentials.getRequestMetadata(options.service_url, (err, headers) => {
              if (err) {
                reject(err);
                return;
              }
              if (!headers) {
                reject(new Error("Headers not set by metadata plugin"));
                return;
              }
              resolve(headers);
            });
          });
        }
        getHeaders.then((headers) => {
          const metadata2 = new metadata_1.Metadata();
          for (const key of Object.keys(headers)) {
            metadata2.add(key, headers[key]);
          }
          callback(null, metadata2);
        }, (err) => {
          callback(err);
        });
      });
    }
    static createEmpty() {
      return new EmptyCallCredentials();
    }
  }
  callCredentials$1.CallCredentials = CallCredentials;
  class ComposedCallCredentials extends CallCredentials {
    constructor(creds) {
      super();
      this.creds = creds;
    }
    async generateMetadata(options) {
      const base = new metadata_1.Metadata();
      const generated = await Promise.all(this.creds.map((cred) => cred.generateMetadata(options)));
      for (const gen of generated) {
        base.merge(gen);
      }
      return base;
    }
    compose(other) {
      return new ComposedCallCredentials(this.creds.concat([other]));
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof ComposedCallCredentials) {
        return this.creds.every((value, index) => value._equals(other.creds[index]));
      } else {
        return false;
      }
    }
  }
  class SingleCallCredentials extends CallCredentials {
    constructor(metadataGenerator) {
      super();
      this.metadataGenerator = metadataGenerator;
    }
    generateMetadata(options) {
      return new Promise((resolve, reject) => {
        this.metadataGenerator(options, (err, metadata2) => {
          if (metadata2 !== void 0) {
            resolve(metadata2);
          } else {
            reject(err);
          }
        });
      });
    }
    compose(other) {
      return new ComposedCallCredentials([this, other]);
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof SingleCallCredentials) {
        return this.metadataGenerator === other.metadataGenerator;
      } else {
        return false;
      }
    }
  }
  class EmptyCallCredentials extends CallCredentials {
    generateMetadata(options) {
      return Promise.resolve(new metadata_1.Metadata());
    }
    compose(other) {
      return other;
    }
    _equals(other) {
      return other instanceof EmptyCallCredentials;
    }
  }
  return callCredentials$1;
}
var channel$1 = {};
var channelCredentials$1 = {};
var tlsHelpers$1 = {};
var hasRequiredTlsHelpers$1;
function requireTlsHelpers$1() {
  if (hasRequiredTlsHelpers$1) return tlsHelpers$1;
  hasRequiredTlsHelpers$1 = 1;
  Object.defineProperty(tlsHelpers$1, "__esModule", { value: true });
  tlsHelpers$1.CIPHER_SUITES = void 0;
  tlsHelpers$1.getDefaultRootsData = getDefaultRootsData;
  const fs = require$$0;
  tlsHelpers$1.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
  const DEFAULT_ROOTS_FILE_PATH = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH;
  let defaultRootsData = null;
  function getDefaultRootsData() {
    if (DEFAULT_ROOTS_FILE_PATH) {
      if (defaultRootsData === null) {
        defaultRootsData = fs.readFileSync(DEFAULT_ROOTS_FILE_PATH);
      }
      return defaultRootsData;
    }
    return null;
  }
  return tlsHelpers$1;
}
var uriParser$1 = {};
var hasRequiredUriParser$1;
function requireUriParser$1() {
  if (hasRequiredUriParser$1) return uriParser$1;
  hasRequiredUriParser$1 = 1;
  Object.defineProperty(uriParser$1, "__esModule", { value: true });
  uriParser$1.parseUri = parseUri;
  uriParser$1.splitHostPort = splitHostPort;
  uriParser$1.combineHostPort = combineHostPort;
  uriParser$1.uriToString = uriToString;
  const URI_REGEX = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;
  function parseUri(uriString) {
    const parsedUri = URI_REGEX.exec(uriString);
    if (parsedUri === null) {
      return null;
    }
    return {
      scheme: parsedUri[1],
      authority: parsedUri[2],
      path: parsedUri[3]
    };
  }
  const NUMBER_REGEX = /^\d+$/;
  function splitHostPort(path) {
    if (path.startsWith("[")) {
      const hostEnd = path.indexOf("]");
      if (hostEnd === -1) {
        return null;
      }
      const host = path.substring(1, hostEnd);
      if (host.indexOf(":") === -1) {
        return null;
      }
      if (path.length > hostEnd + 1) {
        if (path[hostEnd + 1] === ":") {
          const portString = path.substring(hostEnd + 2);
          if (NUMBER_REGEX.test(portString)) {
            return {
              host,
              port: +portString
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return {
          host
        };
      }
    } else {
      const splitPath = path.split(":");
      if (splitPath.length === 2) {
        if (NUMBER_REGEX.test(splitPath[1])) {
          return {
            host: splitPath[0],
            port: +splitPath[1]
          };
        } else {
          return null;
        }
      } else {
        return {
          host: path
        };
      }
    }
  }
  function combineHostPort(hostPort) {
    if (hostPort.port === void 0) {
      return hostPort.host;
    } else {
      if (hostPort.host.includes(":")) {
        return `[${hostPort.host}]:${hostPort.port}`;
      } else {
        return `${hostPort.host}:${hostPort.port}`;
      }
    }
  }
  function uriToString(uri) {
    let result = "";
    if (uri.scheme !== void 0) {
      result += uri.scheme + ":";
    }
    if (uri.authority !== void 0) {
      result += "//" + uri.authority + "/";
    }
    result += uri.path;
    return result;
  }
  return uriParser$1;
}
var resolver$1 = {};
var hasRequiredResolver$1;
function requireResolver$1() {
  if (hasRequiredResolver$1) return resolver$1;
  hasRequiredResolver$1 = 1;
  Object.defineProperty(resolver$1, "__esModule", { value: true });
  resolver$1.CHANNEL_ARGS_CONFIG_SELECTOR_KEY = void 0;
  resolver$1.registerResolver = registerResolver;
  resolver$1.registerDefaultScheme = registerDefaultScheme;
  resolver$1.createResolver = createResolver;
  resolver$1.getDefaultAuthority = getDefaultAuthority;
  resolver$1.mapUriDefaultScheme = mapUriDefaultScheme;
  const uri_parser_1 = requireUriParser$1();
  resolver$1.CHANNEL_ARGS_CONFIG_SELECTOR_KEY = "grpc.internal.config_selector";
  const registeredResolvers = {};
  let defaultScheme = null;
  function registerResolver(scheme, resolverClass) {
    registeredResolvers[scheme] = resolverClass;
  }
  function registerDefaultScheme(scheme) {
    defaultScheme = scheme;
  }
  function createResolver(target, listener, options) {
    if (target.scheme !== void 0 && target.scheme in registeredResolvers) {
      return new registeredResolvers[target.scheme](target, listener, options);
    } else {
      throw new Error(`No resolver could be created for target ${(0, uri_parser_1.uriToString)(target)}`);
    }
  }
  function getDefaultAuthority(target) {
    if (target.scheme !== void 0 && target.scheme in registeredResolvers) {
      return registeredResolvers[target.scheme].getDefaultAuthority(target);
    } else {
      throw new Error(`Invalid target ${(0, uri_parser_1.uriToString)(target)}`);
    }
  }
  function mapUriDefaultScheme(target) {
    if (target.scheme === void 0 || !(target.scheme in registeredResolvers)) {
      if (defaultScheme !== null) {
        return {
          scheme: defaultScheme,
          authority: void 0,
          path: (0, uri_parser_1.uriToString)(target)
        };
      } else {
        return null;
      }
    }
    return target;
  }
  return resolver$1;
}
var hasRequiredChannelCredentials$1;
function requireChannelCredentials$1() {
  if (hasRequiredChannelCredentials$1) return channelCredentials$1;
  hasRequiredChannelCredentials$1 = 1;
  Object.defineProperty(channelCredentials$1, "__esModule", { value: true });
  channelCredentials$1.ChannelCredentials = void 0;
  channelCredentials$1.createCertificateProviderChannelCredentials = createCertificateProviderChannelCredentials;
  const tls_1 = require$$1$1;
  const call_credentials_1 = requireCallCredentials$1();
  const tls_helpers_1 = requireTlsHelpers$1();
  const uri_parser_1 = requireUriParser$1();
  const resolver_1 = requireResolver$1();
  const logging_1 = requireLogging$1();
  const constants_1 = requireConstants$1();
  function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
      throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
  }
  class ChannelCredentials {
    /**
     * Returns a copy of this object with the included set of per-call credentials
     * expanded to include callCredentials.
     * @param callCredentials A CallCredentials object to associate with this
     * instance.
     */
    compose(callCredentials2) {
      return new ComposedChannelCredentialsImpl(this, callCredentials2);
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
      var _a;
      verifyIsBufferOrNull(rootCerts, "Root certificate");
      verifyIsBufferOrNull(privateKey, "Private key");
      verifyIsBufferOrNull(certChain, "Certificate chain");
      if (privateKey && !certChain) {
        throw new Error("Private key must be given with accompanying certificate chain");
      }
      if (!privateKey && certChain) {
        throw new Error("Certificate chain must be given with accompanying private key");
      }
      const secureContext = (0, tls_1.createSecureContext)({
        ca: (_a = rootCerts !== null && rootCerts !== void 0 ? rootCerts : (0, tls_helpers_1.getDefaultRootsData)()) !== null && _a !== void 0 ? _a : void 0,
        key: privateKey !== null && privateKey !== void 0 ? privateKey : void 0,
        cert: certChain !== null && certChain !== void 0 ? certChain : void 0,
        ciphers: tls_helpers_1.CIPHER_SUITES
      });
      return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with credentials created using
     * the provided secureContext. The resulting instances can be used to
     * construct a Channel that communicates over TLS. gRPC will not override
     * anything in the provided secureContext, so the environment variables
     * GRPC_SSL_CIPHER_SUITES and GRPC_DEFAULT_SSL_ROOTS_FILE_PATH will
     * not be applied.
     * @param secureContext The return value of tls.createSecureContext()
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createFromSecureContext(secureContext, verifyOptions) {
      return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure() {
      return new InsecureChannelCredentialsImpl();
    }
  }
  channelCredentials$1.ChannelCredentials = ChannelCredentials;
  class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor() {
      super();
    }
    compose(callCredentials2) {
      throw new Error("Cannot compose insecure credentials");
    }
    _isSecure() {
      return false;
    }
    _equals(other) {
      return other instanceof InsecureChannelCredentialsImpl;
    }
    _createSecureConnector(channelTarget, options, callCredentials2) {
      return {
        connect(socket) {
          return Promise.resolve({
            socket,
            secure: false
          });
        },
        waitForReady: () => {
          return Promise.resolve();
        },
        getCallCredentials: () => {
          return callCredentials2 !== null && callCredentials2 !== void 0 ? callCredentials2 : call_credentials_1.CallCredentials.createEmpty();
        },
        destroy() {
        }
      };
    }
  }
  function getConnectionOptions(secureContext, verifyOptions, channelTarget, options) {
    var _a, _b;
    const connectionOptions = {
      secureContext
    };
    let realTarget = channelTarget;
    if ("grpc.http_connect_target" in options) {
      const parsedTarget = (0, uri_parser_1.parseUri)(options["grpc.http_connect_target"]);
      if (parsedTarget) {
        realTarget = parsedTarget;
      }
    }
    const targetPath = (0, resolver_1.getDefaultAuthority)(realTarget);
    const hostPort = (0, uri_parser_1.splitHostPort)(targetPath);
    const remoteHost = (_a = hostPort === null || hostPort === void 0 ? void 0 : hostPort.host) !== null && _a !== void 0 ? _a : targetPath;
    connectionOptions.host = remoteHost;
    if (verifyOptions.checkServerIdentity) {
      connectionOptions.checkServerIdentity = verifyOptions.checkServerIdentity;
    }
    if (verifyOptions.rejectUnauthorized !== void 0) {
      connectionOptions.rejectUnauthorized = verifyOptions.rejectUnauthorized;
    }
    connectionOptions.ALPNProtocols = ["h2"];
    if (options["grpc.ssl_target_name_override"]) {
      const sslTargetNameOverride = options["grpc.ssl_target_name_override"];
      const originalCheckServerIdentity = (_b = connectionOptions.checkServerIdentity) !== null && _b !== void 0 ? _b : tls_1.checkServerIdentity;
      connectionOptions.checkServerIdentity = (host, cert) => {
        return originalCheckServerIdentity(sslTargetNameOverride, cert);
      };
      connectionOptions.servername = sslTargetNameOverride;
    } else {
      connectionOptions.servername = remoteHost;
    }
    if (options["grpc-node.tls_enable_trace"]) {
      connectionOptions.enableTrace = true;
    }
    return connectionOptions;
  }
  class SecureConnectorImpl {
    constructor(connectionOptions, callCredentials2) {
      this.connectionOptions = connectionOptions;
      this.callCredentials = callCredentials2;
    }
    connect(socket) {
      const tlsConnectOptions = Object.assign({ socket }, this.connectionOptions);
      return new Promise((resolve, reject) => {
        const tlsSocket = (0, tls_1.connect)(tlsConnectOptions, () => {
          var _a;
          if (((_a = this.connectionOptions.rejectUnauthorized) !== null && _a !== void 0 ? _a : true) && !tlsSocket.authorized) {
            reject(tlsSocket.authorizationError);
            return;
          }
          resolve({
            socket: tlsSocket,
            secure: true
          });
        });
        tlsSocket.on("error", (error2) => {
          reject(error2);
        });
      });
    }
    waitForReady() {
      return Promise.resolve();
    }
    getCallCredentials() {
      return this.callCredentials;
    }
    destroy() {
    }
  }
  class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(secureContext, verifyOptions) {
      super();
      this.secureContext = secureContext;
      this.verifyOptions = verifyOptions;
    }
    _isSecure() {
      return true;
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof SecureChannelCredentialsImpl) {
        return this.secureContext === other.secureContext && this.verifyOptions.checkServerIdentity === other.verifyOptions.checkServerIdentity;
      } else {
        return false;
      }
    }
    _createSecureConnector(channelTarget, options, callCredentials2) {
      const connectionOptions = getConnectionOptions(this.secureContext, this.verifyOptions, channelTarget, options);
      return new SecureConnectorImpl(connectionOptions, callCredentials2 !== null && callCredentials2 !== void 0 ? callCredentials2 : call_credentials_1.CallCredentials.createEmpty());
    }
  }
  class CertificateProviderChannelCredentialsImpl extends ChannelCredentials {
    constructor(caCertificateProvider, identityCertificateProvider, verifyOptions) {
      super();
      this.caCertificateProvider = caCertificateProvider;
      this.identityCertificateProvider = identityCertificateProvider;
      this.verifyOptions = verifyOptions;
      this.refcount = 0;
      this.latestCaUpdate = void 0;
      this.latestIdentityUpdate = void 0;
      this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this);
      this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this);
      this.secureContextWatchers = [];
    }
    _isSecure() {
      return true;
    }
    _equals(other) {
      var _a, _b;
      if (this === other) {
        return true;
      }
      if (other instanceof CertificateProviderChannelCredentialsImpl) {
        return this.caCertificateProvider === other.caCertificateProvider && this.identityCertificateProvider === other.identityCertificateProvider && ((_a = this.verifyOptions) === null || _a === void 0 ? void 0 : _a.checkServerIdentity) === ((_b = other.verifyOptions) === null || _b === void 0 ? void 0 : _b.checkServerIdentity);
      } else {
        return false;
      }
    }
    ref() {
      var _a;
      if (this.refcount === 0) {
        this.caCertificateProvider.addCaCertificateListener(this.caCertificateUpdateListener);
        (_a = this.identityCertificateProvider) === null || _a === void 0 ? void 0 : _a.addIdentityCertificateListener(this.identityCertificateUpdateListener);
      }
      this.refcount += 1;
    }
    unref() {
      var _a;
      this.refcount -= 1;
      if (this.refcount === 0) {
        this.caCertificateProvider.removeCaCertificateListener(this.caCertificateUpdateListener);
        (_a = this.identityCertificateProvider) === null || _a === void 0 ? void 0 : _a.removeIdentityCertificateListener(this.identityCertificateUpdateListener);
      }
    }
    _createSecureConnector(channelTarget, options, callCredentials2) {
      this.ref();
      return new CertificateProviderChannelCredentialsImpl.SecureConnectorImpl(this, channelTarget, options, callCredentials2 !== null && callCredentials2 !== void 0 ? callCredentials2 : call_credentials_1.CallCredentials.createEmpty());
    }
    maybeUpdateWatchers() {
      if (this.hasReceivedUpdates()) {
        for (const watcher of this.secureContextWatchers) {
          watcher(this.getLatestSecureContext());
        }
        this.secureContextWatchers = [];
      }
    }
    handleCaCertificateUpdate(update) {
      this.latestCaUpdate = update;
      this.maybeUpdateWatchers();
    }
    handleIdentityCertitificateUpdate(update) {
      this.latestIdentityUpdate = update;
      this.maybeUpdateWatchers();
    }
    hasReceivedUpdates() {
      if (this.latestCaUpdate === void 0) {
        return false;
      }
      if (this.identityCertificateProvider && this.latestIdentityUpdate === void 0) {
        return false;
      }
      return true;
    }
    getSecureContext() {
      if (this.hasReceivedUpdates()) {
        return Promise.resolve(this.getLatestSecureContext());
      } else {
        return new Promise((resolve) => {
          this.secureContextWatchers.push(resolve);
        });
      }
    }
    getLatestSecureContext() {
      var _a, _b;
      if (!this.latestCaUpdate) {
        return null;
      }
      if (this.identityCertificateProvider !== null && !this.latestIdentityUpdate) {
        return null;
      }
      try {
        return (0, tls_1.createSecureContext)({
          ca: this.latestCaUpdate.caCertificate,
          key: (_a = this.latestIdentityUpdate) === null || _a === void 0 ? void 0 : _a.privateKey,
          cert: (_b = this.latestIdentityUpdate) === null || _b === void 0 ? void 0 : _b.certificate,
          ciphers: tls_helpers_1.CIPHER_SUITES
        });
      } catch (e) {
        (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to createSecureContext with error " + e.message);
        return null;
      }
    }
  }
  CertificateProviderChannelCredentialsImpl.SecureConnectorImpl = class {
    constructor(parent, channelTarget, options, callCredentials2) {
      this.parent = parent;
      this.channelTarget = channelTarget;
      this.options = options;
      this.callCredentials = callCredentials2;
    }
    connect(socket) {
      return new Promise((resolve, reject) => {
        const secureContext = this.parent.getLatestSecureContext();
        if (!secureContext) {
          reject(new Error("Failed to load credentials"));
          return;
        }
        if (socket.closed) {
          reject(new Error("Socket closed while loading credentials"));
        }
        const connnectionOptions = getConnectionOptions(secureContext, this.parent.verifyOptions, this.channelTarget, this.options);
        const tlsConnectOptions = Object.assign({ socket }, connnectionOptions);
        const closeCallback = () => {
          reject(new Error("Socket closed"));
        };
        const errorCallback = (error2) => {
          reject(error2);
        };
        const tlsSocket = (0, tls_1.connect)(tlsConnectOptions, () => {
          var _a;
          tlsSocket.removeListener("close", closeCallback);
          tlsSocket.removeListener("error", errorCallback);
          if (((_a = this.parent.verifyOptions.rejectUnauthorized) !== null && _a !== void 0 ? _a : true) && !tlsSocket.authorized) {
            reject(tlsSocket.authorizationError);
            return;
          }
          resolve({
            socket: tlsSocket,
            secure: true
          });
        });
        tlsSocket.once("close", closeCallback);
        tlsSocket.once("error", errorCallback);
      });
    }
    async waitForReady() {
      await this.parent.getSecureContext();
    }
    getCallCredentials() {
      return this.callCredentials;
    }
    destroy() {
      this.parent.unref();
    }
  };
  function createCertificateProviderChannelCredentials(caCertificateProvider, identityCertificateProvider, verifyOptions) {
    return new CertificateProviderChannelCredentialsImpl(caCertificateProvider, identityCertificateProvider, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
  }
  class ComposedChannelCredentialsImpl extends ChannelCredentials {
    constructor(channelCredentials2, callCredentials2) {
      super();
      this.channelCredentials = channelCredentials2;
      this.callCredentials = callCredentials2;
      if (!channelCredentials2._isSecure()) {
        throw new Error("Cannot compose insecure credentials");
      }
    }
    compose(callCredentials2) {
      const combinedCallCredentials = this.callCredentials.compose(callCredentials2);
      return new ComposedChannelCredentialsImpl(this.channelCredentials, combinedCallCredentials);
    }
    _isSecure() {
      return true;
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof ComposedChannelCredentialsImpl) {
        return this.channelCredentials._equals(other.channelCredentials) && this.callCredentials._equals(other.callCredentials);
      } else {
        return false;
      }
    }
    _createSecureConnector(channelTarget, options, callCredentials2) {
      const combinedCallCredentials = this.callCredentials.compose(callCredentials2 !== null && callCredentials2 !== void 0 ? callCredentials2 : call_credentials_1.CallCredentials.createEmpty());
      return this.channelCredentials._createSecureConnector(channelTarget, options, combinedCallCredentials);
    }
  }
  return channelCredentials$1;
}
var internalChannel$1 = {};
var resolvingLoadBalancer$1 = {};
var loadBalancer$1 = {};
var hasRequiredLoadBalancer$1;
function requireLoadBalancer$1() {
  if (hasRequiredLoadBalancer$1) return loadBalancer$1;
  hasRequiredLoadBalancer$1 = 1;
  Object.defineProperty(loadBalancer$1, "__esModule", { value: true });
  loadBalancer$1.createChildChannelControlHelper = createChildChannelControlHelper;
  loadBalancer$1.registerLoadBalancerType = registerLoadBalancerType;
  loadBalancer$1.registerDefaultLoadBalancerType = registerDefaultLoadBalancerType;
  loadBalancer$1.createLoadBalancer = createLoadBalancer;
  loadBalancer$1.isLoadBalancerNameRegistered = isLoadBalancerNameRegistered;
  loadBalancer$1.parseLoadBalancingConfig = parseLoadBalancingConfig;
  loadBalancer$1.getDefaultConfig = getDefaultConfig;
  loadBalancer$1.selectLbConfigFromList = selectLbConfigFromList;
  const logging_1 = requireLogging$1();
  const constants_1 = requireConstants$1();
  function createChildChannelControlHelper(parent, overrides) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
      createSubchannel: (_b = (_a = overrides.createSubchannel) === null || _a === void 0 ? void 0 : _a.bind(overrides)) !== null && _b !== void 0 ? _b : parent.createSubchannel.bind(parent),
      updateState: (_d = (_c = overrides.updateState) === null || _c === void 0 ? void 0 : _c.bind(overrides)) !== null && _d !== void 0 ? _d : parent.updateState.bind(parent),
      requestReresolution: (_f = (_e = overrides.requestReresolution) === null || _e === void 0 ? void 0 : _e.bind(overrides)) !== null && _f !== void 0 ? _f : parent.requestReresolution.bind(parent),
      addChannelzChild: (_h = (_g = overrides.addChannelzChild) === null || _g === void 0 ? void 0 : _g.bind(overrides)) !== null && _h !== void 0 ? _h : parent.addChannelzChild.bind(parent),
      removeChannelzChild: (_k = (_j = overrides.removeChannelzChild) === null || _j === void 0 ? void 0 : _j.bind(overrides)) !== null && _k !== void 0 ? _k : parent.removeChannelzChild.bind(parent)
    };
  }
  const registeredLoadBalancerTypes = {};
  let defaultLoadBalancerType = null;
  function registerLoadBalancerType(typeName, loadBalancerType, loadBalancingConfigType) {
    registeredLoadBalancerTypes[typeName] = {
      LoadBalancer: loadBalancerType,
      LoadBalancingConfig: loadBalancingConfigType
    };
  }
  function registerDefaultLoadBalancerType(typeName) {
    defaultLoadBalancerType = typeName;
  }
  function createLoadBalancer(config, channelControlHelper) {
    const typeName = config.getLoadBalancerName();
    if (typeName in registeredLoadBalancerTypes) {
      return new registeredLoadBalancerTypes[typeName].LoadBalancer(channelControlHelper);
    } else {
      return null;
    }
  }
  function isLoadBalancerNameRegistered(typeName) {
    return typeName in registeredLoadBalancerTypes;
  }
  function parseLoadBalancingConfig(rawConfig) {
    const keys = Object.keys(rawConfig);
    if (keys.length !== 1) {
      throw new Error("Provided load balancing config has multiple conflicting entries");
    }
    const typeName = keys[0];
    if (typeName in registeredLoadBalancerTypes) {
      try {
        return registeredLoadBalancerTypes[typeName].LoadBalancingConfig.createFromJson(rawConfig[typeName]);
      } catch (e) {
        throw new Error(`${typeName}: ${e.message}`);
      }
    } else {
      throw new Error(`Unrecognized load balancing config name ${typeName}`);
    }
  }
  function getDefaultConfig() {
    if (!defaultLoadBalancerType) {
      throw new Error("No default load balancer type registered");
    }
    return new registeredLoadBalancerTypes[defaultLoadBalancerType].LoadBalancingConfig();
  }
  function selectLbConfigFromList(configs, fallbackTodefault = false) {
    for (const config of configs) {
      try {
        return parseLoadBalancingConfig(config);
      } catch (e) {
        (0, logging_1.log)(constants_1.LogVerbosity.DEBUG, "Config parsing failed with error", e.message);
        continue;
      }
    }
    if (fallbackTodefault) {
      if (defaultLoadBalancerType) {
        return new registeredLoadBalancerTypes[defaultLoadBalancerType].LoadBalancingConfig();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return loadBalancer$1;
}
var serviceConfig$1 = {};
var hasRequiredServiceConfig$1;
function requireServiceConfig$1() {
  if (hasRequiredServiceConfig$1) return serviceConfig$1;
  hasRequiredServiceConfig$1 = 1;
  Object.defineProperty(serviceConfig$1, "__esModule", { value: true });
  serviceConfig$1.validateRetryThrottling = validateRetryThrottling;
  serviceConfig$1.validateServiceConfig = validateServiceConfig;
  serviceConfig$1.extractAndSelectServiceConfig = extractAndSelectServiceConfig;
  const os = require$$1$2;
  const constants_1 = requireConstants$1();
  const DURATION_REGEX = /^\d+(\.\d{1,9})?s$/;
  const CLIENT_LANGUAGE_STRING = "node";
  function validateName(obj) {
    if ("service" in obj && obj.service !== "") {
      if (typeof obj.service !== "string") {
        throw new Error(`Invalid method config name: invalid service: expected type string, got ${typeof obj.service}`);
      }
      if ("method" in obj && obj.method !== "") {
        if (typeof obj.method !== "string") {
          throw new Error(`Invalid method config name: invalid method: expected type string, got ${typeof obj.service}`);
        }
        return {
          service: obj.service,
          method: obj.method
        };
      } else {
        return {
          service: obj.service
        };
      }
    } else {
      if ("method" in obj && obj.method !== void 0) {
        throw new Error(`Invalid method config name: method set with empty or unset service`);
      }
      return {};
    }
  }
  function validateRetryPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
      throw new Error("Invalid method config retry policy: maxAttempts must be an integer at least 2");
    }
    if (!("initialBackoff" in obj) || typeof obj.initialBackoff !== "string" || !DURATION_REGEX.test(obj.initialBackoff)) {
      throw new Error("Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer or decimal followed by s");
    }
    if (!("maxBackoff" in obj) || typeof obj.maxBackoff !== "string" || !DURATION_REGEX.test(obj.maxBackoff)) {
      throw new Error("Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer or decimal followed by s");
    }
    if (!("backoffMultiplier" in obj) || typeof obj.backoffMultiplier !== "number" || obj.backoffMultiplier <= 0) {
      throw new Error("Invalid method config retry policy: backoffMultiplier must be a number greater than 0");
    }
    if (!("retryableStatusCodes" in obj && Array.isArray(obj.retryableStatusCodes))) {
      throw new Error("Invalid method config retry policy: retryableStatusCodes is required");
    }
    if (obj.retryableStatusCodes.length === 0) {
      throw new Error("Invalid method config retry policy: retryableStatusCodes must be non-empty");
    }
    for (const value of obj.retryableStatusCodes) {
      if (typeof value === "number") {
        if (!Object.values(constants_1.Status).includes(value)) {
          throw new Error("Invalid method config retry policy: retryableStatusCodes value not in status code range");
        }
      } else if (typeof value === "string") {
        if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
          throw new Error("Invalid method config retry policy: retryableStatusCodes value not a status code name");
        }
      } else {
        throw new Error("Invalid method config retry policy: retryableStatusCodes value must be a string or number");
      }
    }
    return {
      maxAttempts: obj.maxAttempts,
      initialBackoff: obj.initialBackoff,
      maxBackoff: obj.maxBackoff,
      backoffMultiplier: obj.backoffMultiplier,
      retryableStatusCodes: obj.retryableStatusCodes
    };
  }
  function validateHedgingPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
      throw new Error("Invalid method config hedging policy: maxAttempts must be an integer at least 2");
    }
    if ("hedgingDelay" in obj && (typeof obj.hedgingDelay !== "string" || !DURATION_REGEX.test(obj.hedgingDelay))) {
      throw new Error("Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by s");
    }
    if ("nonFatalStatusCodes" in obj && Array.isArray(obj.nonFatalStatusCodes)) {
      for (const value of obj.nonFatalStatusCodes) {
        if (typeof value === "number") {
          if (!Object.values(constants_1.Status).includes(value)) {
            throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not in status code range");
          }
        } else if (typeof value === "string") {
          if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
            throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not a status code name");
          }
        } else {
          throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value must be a string or number");
        }
      }
    }
    const result = {
      maxAttempts: obj.maxAttempts
    };
    if (obj.hedgingDelay) {
      result.hedgingDelay = obj.hedgingDelay;
    }
    if (obj.nonFatalStatusCodes) {
      result.nonFatalStatusCodes = obj.nonFatalStatusCodes;
    }
    return result;
  }
  function validateMethodConfig(obj) {
    var _a;
    const result = {
      name: []
    };
    if (!("name" in obj) || !Array.isArray(obj.name)) {
      throw new Error("Invalid method config: invalid name array");
    }
    for (const name of obj.name) {
      result.name.push(validateName(name));
    }
    if ("waitForReady" in obj) {
      if (typeof obj.waitForReady !== "boolean") {
        throw new Error("Invalid method config: invalid waitForReady");
      }
      result.waitForReady = obj.waitForReady;
    }
    if ("timeout" in obj) {
      if (typeof obj.timeout === "object") {
        if (!("seconds" in obj.timeout) || !(typeof obj.timeout.seconds === "number")) {
          throw new Error("Invalid method config: invalid timeout.seconds");
        }
        if (!("nanos" in obj.timeout) || !(typeof obj.timeout.nanos === "number")) {
          throw new Error("Invalid method config: invalid timeout.nanos");
        }
        result.timeout = obj.timeout;
      } else if (typeof obj.timeout === "string" && DURATION_REGEX.test(obj.timeout)) {
        const timeoutParts = obj.timeout.substring(0, obj.timeout.length - 1).split(".");
        result.timeout = {
          seconds: timeoutParts[0] | 0,
          nanos: ((_a = timeoutParts[1]) !== null && _a !== void 0 ? _a : 0) | 0
        };
      } else {
        throw new Error("Invalid method config: invalid timeout");
      }
    }
    if ("maxRequestBytes" in obj) {
      if (typeof obj.maxRequestBytes !== "number") {
        throw new Error("Invalid method config: invalid maxRequestBytes");
      }
      result.maxRequestBytes = obj.maxRequestBytes;
    }
    if ("maxResponseBytes" in obj) {
      if (typeof obj.maxResponseBytes !== "number") {
        throw new Error("Invalid method config: invalid maxRequestBytes");
      }
      result.maxResponseBytes = obj.maxResponseBytes;
    }
    if ("retryPolicy" in obj) {
      if ("hedgingPolicy" in obj) {
        throw new Error("Invalid method config: retryPolicy and hedgingPolicy cannot both be specified");
      } else {
        result.retryPolicy = validateRetryPolicy(obj.retryPolicy);
      }
    } else if ("hedgingPolicy" in obj) {
      result.hedgingPolicy = validateHedgingPolicy(obj.hedgingPolicy);
    }
    return result;
  }
  function validateRetryThrottling(obj) {
    if (!("maxTokens" in obj) || typeof obj.maxTokens !== "number" || obj.maxTokens <= 0 || obj.maxTokens > 1e3) {
      throw new Error("Invalid retryThrottling: maxTokens must be a number in (0, 1000]");
    }
    if (!("tokenRatio" in obj) || typeof obj.tokenRatio !== "number" || obj.tokenRatio <= 0) {
      throw new Error("Invalid retryThrottling: tokenRatio must be a number greater than 0");
    }
    return {
      maxTokens: +obj.maxTokens.toFixed(3),
      tokenRatio: +obj.tokenRatio.toFixed(3)
    };
  }
  function validateLoadBalancingConfig(obj) {
    if (!(typeof obj === "object" && obj !== null)) {
      throw new Error(`Invalid loadBalancingConfig: unexpected type ${typeof obj}`);
    }
    const keys = Object.keys(obj);
    if (keys.length > 1) {
      throw new Error(`Invalid loadBalancingConfig: unexpected multiple keys ${keys}`);
    }
    if (keys.length === 0) {
      throw new Error("Invalid loadBalancingConfig: load balancing policy name required");
    }
    return {
      [keys[0]]: obj[keys[0]]
    };
  }
  function validateServiceConfig(obj) {
    const result = {
      loadBalancingConfig: [],
      methodConfig: []
    };
    if ("loadBalancingPolicy" in obj) {
      if (typeof obj.loadBalancingPolicy === "string") {
        result.loadBalancingPolicy = obj.loadBalancingPolicy;
      } else {
        throw new Error("Invalid service config: invalid loadBalancingPolicy");
      }
    }
    if ("loadBalancingConfig" in obj) {
      if (Array.isArray(obj.loadBalancingConfig)) {
        for (const config of obj.loadBalancingConfig) {
          result.loadBalancingConfig.push(validateLoadBalancingConfig(config));
        }
      } else {
        throw new Error("Invalid service config: invalid loadBalancingConfig");
      }
    }
    if ("methodConfig" in obj) {
      if (Array.isArray(obj.methodConfig)) {
        for (const methodConfig of obj.methodConfig) {
          result.methodConfig.push(validateMethodConfig(methodConfig));
        }
      }
    }
    if ("retryThrottling" in obj) {
      result.retryThrottling = validateRetryThrottling(obj.retryThrottling);
    }
    const seenMethodNames = [];
    for (const methodConfig of result.methodConfig) {
      for (const name of methodConfig.name) {
        for (const seenName of seenMethodNames) {
          if (name.service === seenName.service && name.method === seenName.method) {
            throw new Error(`Invalid service config: duplicate name ${name.service}/${name.method}`);
          }
        }
        seenMethodNames.push(name);
      }
    }
    return result;
  }
  function validateCanaryConfig(obj) {
    if (!("serviceConfig" in obj)) {
      throw new Error("Invalid service config choice: missing service config");
    }
    const result = {
      serviceConfig: validateServiceConfig(obj.serviceConfig)
    };
    if ("clientLanguage" in obj) {
      if (Array.isArray(obj.clientLanguage)) {
        result.clientLanguage = [];
        for (const lang of obj.clientLanguage) {
          if (typeof lang === "string") {
            result.clientLanguage.push(lang);
          } else {
            throw new Error("Invalid service config choice: invalid clientLanguage");
          }
        }
      } else {
        throw new Error("Invalid service config choice: invalid clientLanguage");
      }
    }
    if ("clientHostname" in obj) {
      if (Array.isArray(obj.clientHostname)) {
        result.clientHostname = [];
        for (const lang of obj.clientHostname) {
          if (typeof lang === "string") {
            result.clientHostname.push(lang);
          } else {
            throw new Error("Invalid service config choice: invalid clientHostname");
          }
        }
      } else {
        throw new Error("Invalid service config choice: invalid clientHostname");
      }
    }
    if ("percentage" in obj) {
      if (typeof obj.percentage === "number" && 0 <= obj.percentage && obj.percentage <= 100) {
        result.percentage = obj.percentage;
      } else {
        throw new Error("Invalid service config choice: invalid percentage");
      }
    }
    const allowedFields = [
      "clientLanguage",
      "percentage",
      "clientHostname",
      "serviceConfig"
    ];
    for (const field in obj) {
      if (!allowedFields.includes(field)) {
        throw new Error(`Invalid service config choice: unexpected field ${field}`);
      }
    }
    return result;
  }
  function validateAndSelectCanaryConfig(obj, percentage) {
    if (!Array.isArray(obj)) {
      throw new Error("Invalid service config list");
    }
    for (const config of obj) {
      const validatedConfig = validateCanaryConfig(config);
      if (typeof validatedConfig.percentage === "number" && percentage > validatedConfig.percentage) {
        continue;
      }
      if (Array.isArray(validatedConfig.clientHostname)) {
        let hostnameMatched = false;
        for (const hostname of validatedConfig.clientHostname) {
          if (hostname === os.hostname()) {
            hostnameMatched = true;
          }
        }
        if (!hostnameMatched) {
          continue;
        }
      }
      if (Array.isArray(validatedConfig.clientLanguage)) {
        let languageMatched = false;
        for (const language of validatedConfig.clientLanguage) {
          if (language === CLIENT_LANGUAGE_STRING) {
            languageMatched = true;
          }
        }
        if (!languageMatched) {
          continue;
        }
      }
      return validatedConfig.serviceConfig;
    }
    throw new Error("No matching service config found");
  }
  function extractAndSelectServiceConfig(txtRecord, percentage) {
    for (const record of txtRecord) {
      if (record.length > 0 && record[0].startsWith("grpc_config=")) {
        const recordString = record.join("").substring("grpc_config=".length);
        const recordJson = JSON.parse(recordString);
        return validateAndSelectCanaryConfig(recordJson, percentage);
      }
    }
    return null;
  }
  return serviceConfig$1;
}
var connectivityState$1 = {};
var hasRequiredConnectivityState$1;
function requireConnectivityState$1() {
  if (hasRequiredConnectivityState$1) return connectivityState$1;
  hasRequiredConnectivityState$1 = 1;
  Object.defineProperty(connectivityState$1, "__esModule", { value: true });
  connectivityState$1.ConnectivityState = void 0;
  var ConnectivityState;
  (function(ConnectivityState2) {
    ConnectivityState2[ConnectivityState2["IDLE"] = 0] = "IDLE";
    ConnectivityState2[ConnectivityState2["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState2[ConnectivityState2["READY"] = 2] = "READY";
    ConnectivityState2[ConnectivityState2["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState2[ConnectivityState2["SHUTDOWN"] = 4] = "SHUTDOWN";
  })(ConnectivityState || (connectivityState$1.ConnectivityState = ConnectivityState = {}));
  return connectivityState$1;
}
var picker$1 = {};
var hasRequiredPicker$1;
function requirePicker$1() {
  if (hasRequiredPicker$1) return picker$1;
  hasRequiredPicker$1 = 1;
  Object.defineProperty(picker$1, "__esModule", { value: true });
  picker$1.QueuePicker = picker$1.UnavailablePicker = picker$1.PickResultType = void 0;
  const metadata_1 = requireMetadata$1();
  const constants_1 = requireConstants$1();
  var PickResultType;
  (function(PickResultType2) {
    PickResultType2[PickResultType2["COMPLETE"] = 0] = "COMPLETE";
    PickResultType2[PickResultType2["QUEUE"] = 1] = "QUEUE";
    PickResultType2[PickResultType2["TRANSIENT_FAILURE"] = 2] = "TRANSIENT_FAILURE";
    PickResultType2[PickResultType2["DROP"] = 3] = "DROP";
  })(PickResultType || (picker$1.PickResultType = PickResultType = {}));
  class UnavailablePicker {
    constructor(status) {
      this.status = Object.assign({ code: constants_1.Status.UNAVAILABLE, details: "No connection established", metadata: new metadata_1.Metadata() }, status);
    }
    pick(pickArgs) {
      return {
        pickResultType: PickResultType.TRANSIENT_FAILURE,
        subchannel: null,
        status: this.status,
        onCallStarted: null,
        onCallEnded: null
      };
    }
  }
  picker$1.UnavailablePicker = UnavailablePicker;
  class QueuePicker {
    // Constructed with a load balancer. Calls exitIdle on it the first time pick is called
    constructor(loadBalancer2, childPicker) {
      this.loadBalancer = loadBalancer2;
      this.childPicker = childPicker;
      this.calledExitIdle = false;
    }
    pick(pickArgs) {
      if (!this.calledExitIdle) {
        process.nextTick(() => {
          this.loadBalancer.exitIdle();
        });
        this.calledExitIdle = true;
      }
      if (this.childPicker) {
        return this.childPicker.pick(pickArgs);
      } else {
        return {
          pickResultType: PickResultType.QUEUE,
          subchannel: null,
          status: null,
          onCallStarted: null,
          onCallEnded: null
        };
      }
    }
  }
  picker$1.QueuePicker = QueuePicker;
  return picker$1;
}
var backoffTimeout$1 = {};
var hasRequiredBackoffTimeout$1;
function requireBackoffTimeout$1() {
  if (hasRequiredBackoffTimeout$1) return backoffTimeout$1;
  hasRequiredBackoffTimeout$1 = 1;
  Object.defineProperty(backoffTimeout$1, "__esModule", { value: true });
  backoffTimeout$1.BackoffTimeout = void 0;
  const constants_1 = requireConstants$1();
  const logging2 = requireLogging$1();
  const TRACER_NAME = "backoff";
  const INITIAL_BACKOFF_MS = 1e3;
  const BACKOFF_MULTIPLIER = 1.6;
  const MAX_BACKOFF_MS = 12e4;
  const BACKOFF_JITTER = 0.2;
  function uniformRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  class BackoffTimeout {
    constructor(callback, options) {
      this.callback = callback;
      this.initialDelay = INITIAL_BACKOFF_MS;
      this.multiplier = BACKOFF_MULTIPLIER;
      this.maxDelay = MAX_BACKOFF_MS;
      this.jitter = BACKOFF_JITTER;
      this.running = false;
      this.hasRef = true;
      this.startTime = /* @__PURE__ */ new Date();
      this.endTime = /* @__PURE__ */ new Date();
      this.id = BackoffTimeout.getNextId();
      if (options) {
        if (options.initialDelay) {
          this.initialDelay = options.initialDelay;
        }
        if (options.multiplier) {
          this.multiplier = options.multiplier;
        }
        if (options.jitter) {
          this.jitter = options.jitter;
        }
        if (options.maxDelay) {
          this.maxDelay = options.maxDelay;
        }
      }
      this.trace("constructed initialDelay=" + this.initialDelay + " multiplier=" + this.multiplier + " jitter=" + this.jitter + " maxDelay=" + this.maxDelay);
      this.nextDelay = this.initialDelay;
      this.timerId = setTimeout(() => {
      }, 0);
      clearTimeout(this.timerId);
    }
    static getNextId() {
      return this.nextId++;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "{" + this.id + "} " + text);
    }
    runTimer(delay) {
      var _a, _b;
      this.trace("runTimer(delay=" + delay + ")");
      this.endTime = this.startTime;
      this.endTime.setMilliseconds(this.endTime.getMilliseconds() + delay);
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.trace("timer fired");
        this.running = false;
        this.callback();
      }, delay);
      if (!this.hasRef) {
        (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    /**
     * Call the callback after the current amount of delay time
     */
    runOnce() {
      this.trace("runOnce()");
      this.running = true;
      this.startTime = /* @__PURE__ */ new Date();
      this.runTimer(this.nextDelay);
      const nextBackoff = Math.min(this.nextDelay * this.multiplier, this.maxDelay);
      const jitterMagnitude = nextBackoff * this.jitter;
      this.nextDelay = nextBackoff + uniformRandom(-jitterMagnitude, jitterMagnitude);
    }
    /**
     * Stop the timer. The callback will not be called until `runOnce` is called
     * again.
     */
    stop() {
      this.trace("stop()");
      clearTimeout(this.timerId);
      this.running = false;
    }
    /**
     * Reset the delay time to its initial value. If the timer is still running,
     * retroactively apply that reset to the current timer.
     */
    reset() {
      this.trace("reset() running=" + this.running);
      this.nextDelay = this.initialDelay;
      if (this.running) {
        const now = /* @__PURE__ */ new Date();
        const newEndTime = this.startTime;
        newEndTime.setMilliseconds(newEndTime.getMilliseconds() + this.nextDelay);
        clearTimeout(this.timerId);
        if (now < newEndTime) {
          this.runTimer(newEndTime.getTime() - now.getTime());
        } else {
          this.running = false;
        }
      }
    }
    /**
     * Check whether the timer is currently running.
     */
    isRunning() {
      return this.running;
    }
    /**
     * Set that while the timer is running, it should keep the Node process
     * running.
     */
    ref() {
      var _a, _b;
      this.hasRef = true;
      (_b = (_a = this.timerId).ref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Set that while the timer is running, it should not keep the Node process
     * running.
     */
    unref() {
      var _a, _b;
      this.hasRef = false;
      (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Get the approximate timestamp of when the timer will fire. Only valid if
     * this.isRunning() is true.
     */
    getEndTime() {
      return this.endTime;
    }
  }
  backoffTimeout$1.BackoffTimeout = BackoffTimeout;
  BackoffTimeout.nextId = 0;
  return backoffTimeout$1;
}
var loadBalancerChildHandler$1 = {};
var hasRequiredLoadBalancerChildHandler$1;
function requireLoadBalancerChildHandler$1() {
  if (hasRequiredLoadBalancerChildHandler$1) return loadBalancerChildHandler$1;
  hasRequiredLoadBalancerChildHandler$1 = 1;
  Object.defineProperty(loadBalancerChildHandler$1, "__esModule", { value: true });
  loadBalancerChildHandler$1.ChildLoadBalancerHandler = void 0;
  const load_balancer_1 = requireLoadBalancer$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const TYPE_NAME = "child_load_balancer_helper";
  class ChildLoadBalancerHandler {
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.currentChild = null;
      this.pendingChild = null;
      this.latestConfig = null;
      this.ChildPolicyHelper = class {
        constructor(parent) {
          this.parent = parent;
          this.child = null;
        }
        createSubchannel(subchannelAddress2, subchannelArgs) {
          return this.parent.channelControlHelper.createSubchannel(subchannelAddress2, subchannelArgs);
        }
        updateState(connectivityState2, picker2, errorMessage) {
          var _a;
          if (this.calledByPendingChild()) {
            if (connectivityState2 === connectivity_state_1.ConnectivityState.CONNECTING) {
              return;
            }
            (_a = this.parent.currentChild) === null || _a === void 0 ? void 0 : _a.destroy();
            this.parent.currentChild = this.parent.pendingChild;
            this.parent.pendingChild = null;
          } else if (!this.calledByCurrentChild()) {
            return;
          }
          this.parent.channelControlHelper.updateState(connectivityState2, picker2, errorMessage);
        }
        requestReresolution() {
          var _a;
          const latestChild = (_a = this.parent.pendingChild) !== null && _a !== void 0 ? _a : this.parent.currentChild;
          if (this.child === latestChild) {
            this.parent.channelControlHelper.requestReresolution();
          }
        }
        setChild(newChild) {
          this.child = newChild;
        }
        addChannelzChild(child) {
          this.parent.channelControlHelper.addChannelzChild(child);
        }
        removeChannelzChild(child) {
          this.parent.channelControlHelper.removeChannelzChild(child);
        }
        calledByPendingChild() {
          return this.child === this.parent.pendingChild;
        }
        calledByCurrentChild() {
          return this.child === this.parent.currentChild;
        }
      };
    }
    configUpdateRequiresNewPolicyInstance(oldConfig, newConfig) {
      return oldConfig.getLoadBalancerName() !== newConfig.getLoadBalancerName();
    }
    /**
     * Prerequisites: lbConfig !== null and lbConfig.name is registered
     * @param endpointList
     * @param lbConfig
     * @param attributes
     */
    updateAddressList(endpointList, lbConfig, options, resolutionNote) {
      let childToUpdate;
      if (this.currentChild === null || this.latestConfig === null || this.configUpdateRequiresNewPolicyInstance(this.latestConfig, lbConfig)) {
        const newHelper = new this.ChildPolicyHelper(this);
        const newChild = (0, load_balancer_1.createLoadBalancer)(lbConfig, newHelper);
        newHelper.setChild(newChild);
        if (this.currentChild === null) {
          this.currentChild = newChild;
          childToUpdate = this.currentChild;
        } else {
          if (this.pendingChild) {
            this.pendingChild.destroy();
          }
          this.pendingChild = newChild;
          childToUpdate = this.pendingChild;
        }
      } else {
        if (this.pendingChild === null) {
          childToUpdate = this.currentChild;
        } else {
          childToUpdate = this.pendingChild;
        }
      }
      this.latestConfig = lbConfig;
      return childToUpdate.updateAddressList(endpointList, lbConfig, options, resolutionNote);
    }
    exitIdle() {
      if (this.currentChild) {
        this.currentChild.exitIdle();
        if (this.pendingChild) {
          this.pendingChild.exitIdle();
        }
      }
    }
    resetBackoff() {
      if (this.currentChild) {
        this.currentChild.resetBackoff();
        if (this.pendingChild) {
          this.pendingChild.resetBackoff();
        }
      }
    }
    destroy() {
      if (this.currentChild) {
        this.currentChild.destroy();
        this.currentChild = null;
      }
      if (this.pendingChild) {
        this.pendingChild.destroy();
        this.pendingChild = null;
      }
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerChildHandler$1.ChildLoadBalancerHandler = ChildLoadBalancerHandler;
  return loadBalancerChildHandler$1;
}
var hasRequiredResolvingLoadBalancer$1;
function requireResolvingLoadBalancer$1() {
  if (hasRequiredResolvingLoadBalancer$1) return resolvingLoadBalancer$1;
  hasRequiredResolvingLoadBalancer$1 = 1;
  Object.defineProperty(resolvingLoadBalancer$1, "__esModule", { value: true });
  resolvingLoadBalancer$1.ResolvingLoadBalancer = void 0;
  const load_balancer_1 = requireLoadBalancer$1();
  const service_config_1 = requireServiceConfig$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const resolver_1 = requireResolver$1();
  const picker_1 = requirePicker$1();
  const backoff_timeout_1 = requireBackoffTimeout$1();
  const constants_1 = requireConstants$1();
  const metadata_1 = requireMetadata$1();
  const logging2 = requireLogging$1();
  const constants_2 = requireConstants$1();
  const uri_parser_1 = requireUriParser$1();
  const load_balancer_child_handler_1 = requireLoadBalancerChildHandler$1();
  const TRACER_NAME = "resolving_load_balancer";
  function trace(text) {
    logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const NAME_MATCH_LEVEL_ORDER = [
    "SERVICE_AND_METHOD",
    "SERVICE",
    "EMPTY"
  ];
  function hasMatchingName(service, method, methodConfig, matchLevel) {
    for (const name of methodConfig.name) {
      switch (matchLevel) {
        case "EMPTY":
          if (!name.service && !name.method) {
            return true;
          }
          break;
        case "SERVICE":
          if (name.service === service && !name.method) {
            return true;
          }
          break;
        case "SERVICE_AND_METHOD":
          if (name.service === service && name.method === method) {
            return true;
          }
      }
    }
    return false;
  }
  function findMatchingConfig(service, method, methodConfigs, matchLevel) {
    for (const config of methodConfigs) {
      if (hasMatchingName(service, method, config, matchLevel)) {
        return config;
      }
    }
    return null;
  }
  function getDefaultConfigSelector(serviceConfig2) {
    return {
      invoke(methodName, metadata2) {
        var _a, _b;
        const splitName = methodName.split("/").filter((x) => x.length > 0);
        const service = (_a = splitName[0]) !== null && _a !== void 0 ? _a : "";
        const method = (_b = splitName[1]) !== null && _b !== void 0 ? _b : "";
        if (serviceConfig2 && serviceConfig2.methodConfig) {
          for (const matchLevel of NAME_MATCH_LEVEL_ORDER) {
            const matchingConfig = findMatchingConfig(service, method, serviceConfig2.methodConfig, matchLevel);
            if (matchingConfig) {
              return {
                methodConfig: matchingConfig,
                pickInformation: {},
                status: constants_1.Status.OK,
                dynamicFilterFactories: []
              };
            }
          }
        }
        return {
          methodConfig: { name: [] },
          pickInformation: {},
          status: constants_1.Status.OK,
          dynamicFilterFactories: []
        };
      },
      unref() {
      }
    };
  }
  class ResolvingLoadBalancer {
    /**
     * Wrapper class that behaves like a `LoadBalancer` and also handles name
     * resolution internally.
     * @param target The address of the backend to connect to.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     * @param defaultServiceConfig The default service configuration to be used
     *     if none is provided by the name resolver. A `null` value indicates
     *     that the default behavior should be the default unconfigured behavior.
     *     In practice, that means using the "pick first" load balancer
     *     implmentation
     */
    constructor(target, channelControlHelper, channelOptions2, onSuccessfulResolution, onFailedResolution) {
      this.target = target;
      this.channelControlHelper = channelControlHelper;
      this.channelOptions = channelOptions2;
      this.onSuccessfulResolution = onSuccessfulResolution;
      this.onFailedResolution = onFailedResolution;
      this.latestChildState = connectivity_state_1.ConnectivityState.IDLE;
      this.latestChildPicker = new picker_1.QueuePicker(this);
      this.latestChildErrorMessage = null;
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.previousServiceConfig = null;
      this.continueResolving = false;
      if (channelOptions2["grpc.service_config"]) {
        this.defaultServiceConfig = (0, service_config_1.validateServiceConfig)(JSON.parse(channelOptions2["grpc.service_config"]));
      } else {
        this.defaultServiceConfig = {
          loadBalancingConfig: [],
          methodConfig: []
        };
      }
      this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this), null);
      this.childLoadBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler({
        createSubchannel: channelControlHelper.createSubchannel.bind(channelControlHelper),
        requestReresolution: () => {
          if (this.backoffTimeout.isRunning()) {
            trace("requestReresolution delayed by backoff timer until " + this.backoffTimeout.getEndTime().toISOString());
            this.continueResolving = true;
          } else {
            this.updateResolution();
          }
        },
        updateState: (newState, picker2, errorMessage) => {
          this.latestChildState = newState;
          this.latestChildPicker = picker2;
          this.latestChildErrorMessage = errorMessage;
          this.updateState(newState, picker2, errorMessage);
        },
        addChannelzChild: channelControlHelper.addChannelzChild.bind(channelControlHelper),
        removeChannelzChild: channelControlHelper.removeChannelzChild.bind(channelControlHelper)
      });
      this.innerResolver = (0, resolver_1.createResolver)(target, this.handleResolverResult.bind(this), channelOptions2);
      const backoffOptions = {
        initialDelay: channelOptions2["grpc.initial_reconnect_backoff_ms"],
        maxDelay: channelOptions2["grpc.max_reconnect_backoff_ms"]
      };
      this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(() => {
        if (this.continueResolving) {
          this.updateResolution();
          this.continueResolving = false;
        } else {
          this.updateState(this.latestChildState, this.latestChildPicker, this.latestChildErrorMessage);
        }
      }, backoffOptions);
      this.backoffTimeout.unref();
    }
    handleResolverResult(endpointList, attributes, serviceConfig2, resolutionNote) {
      var _a, _b;
      this.backoffTimeout.stop();
      this.backoffTimeout.reset();
      let resultAccepted = true;
      let workingServiceConfig = null;
      if (serviceConfig2 === null) {
        workingServiceConfig = this.defaultServiceConfig;
      } else if (serviceConfig2.ok) {
        workingServiceConfig = serviceConfig2.value;
      } else {
        if (this.previousServiceConfig !== null) {
          workingServiceConfig = this.previousServiceConfig;
        } else {
          resultAccepted = false;
          this.handleResolutionFailure(serviceConfig2.error);
        }
      }
      if (workingServiceConfig !== null) {
        const workingConfigList = (_a = workingServiceConfig === null || workingServiceConfig === void 0 ? void 0 : workingServiceConfig.loadBalancingConfig) !== null && _a !== void 0 ? _a : [];
        const loadBalancingConfig = (0, load_balancer_1.selectLbConfigFromList)(workingConfigList, true);
        if (loadBalancingConfig === null) {
          resultAccepted = false;
          this.handleResolutionFailure({
            code: constants_1.Status.UNAVAILABLE,
            details: "All load balancer options in service config are not compatible",
            metadata: new metadata_1.Metadata()
          });
        } else {
          resultAccepted = this.childLoadBalancer.updateAddressList(endpointList, loadBalancingConfig, Object.assign(Object.assign({}, this.channelOptions), attributes), resolutionNote);
        }
      }
      if (resultAccepted) {
        this.onSuccessfulResolution(workingServiceConfig, (_b = attributes[resolver_1.CHANNEL_ARGS_CONFIG_SELECTOR_KEY]) !== null && _b !== void 0 ? _b : getDefaultConfigSelector(workingServiceConfig));
      }
      return resultAccepted;
    }
    updateResolution() {
      this.innerResolver.updateResolution();
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE) {
        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, this.latestChildPicker, this.latestChildErrorMessage);
      }
      this.backoffTimeout.runOnce();
    }
    updateState(connectivityState2, picker2, errorMessage) {
      trace((0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[connectivityState2]);
      if (connectivityState2 === connectivity_state_1.ConnectivityState.IDLE) {
        picker2 = new picker_1.QueuePicker(this, picker2);
      }
      this.currentState = connectivityState2;
      this.channelControlHelper.updateState(connectivityState2, picker2, errorMessage);
    }
    handleResolutionFailure(error2) {
      if (this.latestChildState === connectivity_state_1.ConnectivityState.IDLE) {
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(error2), error2.details);
        this.onFailedResolution(error2);
      }
    }
    exitIdle() {
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE || this.currentState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
        if (this.backoffTimeout.isRunning()) {
          this.continueResolving = true;
        } else {
          this.updateResolution();
        }
      }
      this.childLoadBalancer.exitIdle();
    }
    updateAddressList(endpointList, lbConfig) {
      throw new Error("updateAddressList not supported on ResolvingLoadBalancer");
    }
    resetBackoff() {
      this.backoffTimeout.reset();
      this.childLoadBalancer.resetBackoff();
    }
    destroy() {
      this.childLoadBalancer.destroy();
      this.innerResolver.destroy();
      this.backoffTimeout.reset();
      this.backoffTimeout.stop();
      this.latestChildState = connectivity_state_1.ConnectivityState.IDLE;
      this.latestChildPicker = new picker_1.QueuePicker(this);
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.previousServiceConfig = null;
      this.continueResolving = false;
    }
    getTypeName() {
      return "resolving_load_balancer";
    }
  }
  resolvingLoadBalancer$1.ResolvingLoadBalancer = ResolvingLoadBalancer;
  return resolvingLoadBalancer$1;
}
var subchannelPool$1 = {};
var channelOptions$1 = {};
var hasRequiredChannelOptions$1;
function requireChannelOptions$1() {
  if (hasRequiredChannelOptions$1) return channelOptions$1;
  hasRequiredChannelOptions$1 = 1;
  Object.defineProperty(channelOptions$1, "__esModule", { value: true });
  channelOptions$1.recognizedOptions = void 0;
  channelOptions$1.channelOptionsEqual = channelOptionsEqual;
  channelOptions$1.recognizedOptions = {
    "grpc.ssl_target_name_override": true,
    "grpc.primary_user_agent": true,
    "grpc.secondary_user_agent": true,
    "grpc.default_authority": true,
    "grpc.keepalive_time_ms": true,
    "grpc.keepalive_timeout_ms": true,
    "grpc.keepalive_permit_without_calls": true,
    "grpc.service_config": true,
    "grpc.max_concurrent_streams": true,
    "grpc.initial_reconnect_backoff_ms": true,
    "grpc.max_reconnect_backoff_ms": true,
    "grpc.use_local_subchannel_pool": true,
    "grpc.max_send_message_length": true,
    "grpc.max_receive_message_length": true,
    "grpc.enable_http_proxy": true,
    "grpc.enable_channelz": true,
    "grpc.dns_min_time_between_resolutions_ms": true,
    "grpc.enable_retries": true,
    "grpc.per_rpc_retry_buffer_size": true,
    "grpc.retry_buffer_size": true,
    "grpc.max_connection_age_ms": true,
    "grpc.max_connection_age_grace_ms": true,
    "grpc-node.max_session_memory": true,
    "grpc.service_config_disable_resolution": true,
    "grpc.client_idle_timeout_ms": true,
    "grpc-node.tls_enable_trace": true,
    "grpc.lb.ring_hash.ring_size_cap": true,
    "grpc-node.retry_max_attempts_limit": true,
    "grpc-node.flow_control_window": true,
    "grpc.server_call_metric_recording": true
  };
  function channelOptionsEqual(options1, options2) {
    const keys1 = Object.keys(options1).sort();
    const keys2 = Object.keys(options2).sort();
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let i = 0; i < keys1.length; i += 1) {
      if (keys1[i] !== keys2[i]) {
        return false;
      }
      if (options1[keys1[i]] !== options2[keys2[i]]) {
        return false;
      }
    }
    return true;
  }
  return channelOptions$1;
}
var subchannel$1 = {};
var subchannelAddress$1 = {};
var hasRequiredSubchannelAddress$1;
function requireSubchannelAddress$1() {
  if (hasRequiredSubchannelAddress$1) return subchannelAddress$1;
  hasRequiredSubchannelAddress$1 = 1;
  Object.defineProperty(subchannelAddress$1, "__esModule", { value: true });
  subchannelAddress$1.EndpointMap = void 0;
  subchannelAddress$1.isTcpSubchannelAddress = isTcpSubchannelAddress;
  subchannelAddress$1.subchannelAddressEqual = subchannelAddressEqual;
  subchannelAddress$1.subchannelAddressToString = subchannelAddressToString;
  subchannelAddress$1.stringToSubchannelAddress = stringToSubchannelAddress;
  subchannelAddress$1.endpointEqual = endpointEqual;
  subchannelAddress$1.endpointToString = endpointToString;
  subchannelAddress$1.endpointHasAddress = endpointHasAddress;
  const net_1 = require$$0$1;
  function isTcpSubchannelAddress(address) {
    return "port" in address;
  }
  function subchannelAddressEqual(address1, address2) {
    if (!address1 && !address2) {
      return true;
    }
    if (!address1 || !address2) {
      return false;
    }
    if (isTcpSubchannelAddress(address1)) {
      return isTcpSubchannelAddress(address2) && address1.host === address2.host && address1.port === address2.port;
    } else {
      return !isTcpSubchannelAddress(address2) && address1.path === address2.path;
    }
  }
  function subchannelAddressToString(address) {
    if (isTcpSubchannelAddress(address)) {
      if ((0, net_1.isIPv6)(address.host)) {
        return "[" + address.host + "]:" + address.port;
      } else {
        return address.host + ":" + address.port;
      }
    } else {
      return address.path;
    }
  }
  const DEFAULT_PORT = 443;
  function stringToSubchannelAddress(addressString, port) {
    if ((0, net_1.isIP)(addressString)) {
      return {
        host: addressString,
        port: port !== null && port !== void 0 ? port : DEFAULT_PORT
      };
    } else {
      return {
        path: addressString
      };
    }
  }
  function endpointEqual(endpoint1, endpoint2) {
    if (endpoint1.addresses.length !== endpoint2.addresses.length) {
      return false;
    }
    for (let i = 0; i < endpoint1.addresses.length; i++) {
      if (!subchannelAddressEqual(endpoint1.addresses[i], endpoint2.addresses[i])) {
        return false;
      }
    }
    return true;
  }
  function endpointToString(endpoint) {
    return "[" + endpoint.addresses.map(subchannelAddressToString).join(", ") + "]";
  }
  function endpointHasAddress(endpoint, expectedAddress) {
    for (const address of endpoint.addresses) {
      if (subchannelAddressEqual(address, expectedAddress)) {
        return true;
      }
    }
    return false;
  }
  function endpointEqualUnordered(endpoint1, endpoint2) {
    if (endpoint1.addresses.length !== endpoint2.addresses.length) {
      return false;
    }
    for (const address1 of endpoint1.addresses) {
      let matchFound = false;
      for (const address2 of endpoint2.addresses) {
        if (subchannelAddressEqual(address1, address2)) {
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        return false;
      }
    }
    return true;
  }
  class EndpointMap {
    constructor() {
      this.map = /* @__PURE__ */ new Set();
    }
    get size() {
      return this.map.size;
    }
    getForSubchannelAddress(address) {
      for (const entry of this.map) {
        if (endpointHasAddress(entry.key, address)) {
          return entry.value;
        }
      }
      return void 0;
    }
    /**
     * Delete any entries in this map with keys that are not in endpoints
     * @param endpoints
     */
    deleteMissing(endpoints) {
      const removedValues = [];
      for (const entry of this.map) {
        let foundEntry = false;
        for (const endpoint of endpoints) {
          if (endpointEqualUnordered(endpoint, entry.key)) {
            foundEntry = true;
          }
        }
        if (!foundEntry) {
          removedValues.push(entry.value);
          this.map.delete(entry);
        }
      }
      return removedValues;
    }
    get(endpoint) {
      for (const entry of this.map) {
        if (endpointEqualUnordered(endpoint, entry.key)) {
          return entry.value;
        }
      }
      return void 0;
    }
    set(endpoint, mapEntry) {
      for (const entry of this.map) {
        if (endpointEqualUnordered(endpoint, entry.key)) {
          entry.value = mapEntry;
          return;
        }
      }
      this.map.add({ key: endpoint, value: mapEntry });
    }
    delete(endpoint) {
      for (const entry of this.map) {
        if (endpointEqualUnordered(endpoint, entry.key)) {
          this.map.delete(entry);
          return;
        }
      }
    }
    has(endpoint) {
      for (const entry of this.map) {
        if (endpointEqualUnordered(endpoint, entry.key)) {
          return true;
        }
      }
      return false;
    }
    clear() {
      this.map.clear();
    }
    *keys() {
      for (const entry of this.map) {
        yield entry.key;
      }
    }
    *values() {
      for (const entry of this.map) {
        yield entry.value;
      }
    }
    *entries() {
      for (const entry of this.map) {
        yield [entry.key, entry.value];
      }
    }
  }
  subchannelAddress$1.EndpointMap = EndpointMap;
  return subchannelAddress$1;
}
var channelz$1 = {};
var admin$1 = {};
var hasRequiredAdmin$1;
function requireAdmin$1() {
  if (hasRequiredAdmin$1) return admin$1;
  hasRequiredAdmin$1 = 1;
  Object.defineProperty(admin$1, "__esModule", { value: true });
  admin$1.registerAdminService = registerAdminService;
  admin$1.addAdminServicesToServer = addAdminServicesToServer;
  const registeredAdminServices = [];
  function registerAdminService(getServiceDefinition, getHandlers) {
    registeredAdminServices.push({ getServiceDefinition, getHandlers });
  }
  function addAdminServicesToServer(server2) {
    for (const { getServiceDefinition, getHandlers } of registeredAdminServices) {
      server2.addService(getServiceDefinition(), getHandlers());
    }
  }
  return admin$1;
}
var makeClient$1 = {};
var client$1 = {};
var call$1 = {};
var hasRequiredCall$1;
function requireCall$1() {
  if (hasRequiredCall$1) return call$1;
  hasRequiredCall$1 = 1;
  Object.defineProperty(call$1, "__esModule", { value: true });
  call$1.ClientDuplexStreamImpl = call$1.ClientWritableStreamImpl = call$1.ClientReadableStreamImpl = call$1.ClientUnaryCallImpl = void 0;
  call$1.callErrorFromStatus = callErrorFromStatus;
  const events_1 = require$$0$2;
  const stream_1 = require$$0$3;
  const constants_1 = requireConstants$1();
  function callErrorFromStatus(status, callerStack) {
    const message = `${status.code} ${constants_1.Status[status.code]}: ${status.details}`;
    const error2 = new Error(message);
    const stack = `${error2.stack}
for call at
${callerStack}`;
    return Object.assign(new Error(message), status, { stack });
  }
  class ClientUnaryCallImpl extends events_1.EventEmitter {
    constructor() {
      super();
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    getAuthContext() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getAuthContext()) !== null && _b !== void 0 ? _b : null;
    }
  }
  call$1.ClientUnaryCallImpl = ClientUnaryCallImpl;
  class ClientReadableStreamImpl extends stream_1.Readable {
    constructor(deserialize) {
      super({ objectMode: true });
      this.deserialize = deserialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    getAuthContext() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getAuthContext()) !== null && _b !== void 0 ? _b : null;
    }
    _read(_size) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
  }
  call$1.ClientReadableStreamImpl = ClientReadableStreamImpl;
  class ClientWritableStreamImpl extends stream_1.Writable {
    constructor(serialize) {
      super({ objectMode: true });
      this.serialize = serialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    getAuthContext() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getAuthContext()) !== null && _b !== void 0 ? _b : null;
    }
    _write(chunk, encoding, cb) {
      var _a;
      const context = {
        callback: cb
      };
      const flags = Number(encoding);
      if (!Number.isNaN(flags)) {
        context.flags = flags;
      }
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
      cb();
    }
  }
  call$1.ClientWritableStreamImpl = ClientWritableStreamImpl;
  class ClientDuplexStreamImpl extends stream_1.Duplex {
    constructor(serialize, deserialize) {
      super({ objectMode: true });
      this.serialize = serialize;
      this.deserialize = deserialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    getAuthContext() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getAuthContext()) !== null && _b !== void 0 ? _b : null;
    }
    _read(_size) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
    _write(chunk, encoding, cb) {
      var _a;
      const context = {
        callback: cb
      };
      const flags = Number(encoding);
      if (!Number.isNaN(flags)) {
        context.flags = flags;
      }
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
      cb();
    }
  }
  call$1.ClientDuplexStreamImpl = ClientDuplexStreamImpl;
  return call$1;
}
var clientInterceptors$1 = {};
var callInterface$1 = {};
var hasRequiredCallInterface$1;
function requireCallInterface$1() {
  if (hasRequiredCallInterface$1) return callInterface$1;
  hasRequiredCallInterface$1 = 1;
  Object.defineProperty(callInterface$1, "__esModule", { value: true });
  callInterface$1.InterceptingListenerImpl = void 0;
  callInterface$1.statusOrFromValue = statusOrFromValue;
  callInterface$1.statusOrFromError = statusOrFromError;
  callInterface$1.isInterceptingListener = isInterceptingListener;
  const metadata_1 = requireMetadata$1();
  function statusOrFromValue(value) {
    return {
      ok: true,
      value
    };
  }
  function statusOrFromError(error2) {
    var _a;
    return {
      ok: false,
      error: Object.assign(Object.assign({}, error2), { metadata: (_a = error2.metadata) !== null && _a !== void 0 ? _a : new metadata_1.Metadata() })
    };
  }
  function isInterceptingListener(listener) {
    return listener.onReceiveMetadata !== void 0 && listener.onReceiveMetadata.length === 1;
  }
  class InterceptingListenerImpl {
    constructor(listener, nextListener) {
      this.listener = listener;
      this.nextListener = nextListener;
      this.processingMetadata = false;
      this.hasPendingMessage = false;
      this.processingMessage = false;
      this.pendingStatus = null;
    }
    processPendingMessage() {
      if (this.hasPendingMessage) {
        this.nextListener.onReceiveMessage(this.pendingMessage);
        this.pendingMessage = null;
        this.hasPendingMessage = false;
      }
    }
    processPendingStatus() {
      if (this.pendingStatus) {
        this.nextListener.onReceiveStatus(this.pendingStatus);
      }
    }
    onReceiveMetadata(metadata2) {
      this.processingMetadata = true;
      this.listener.onReceiveMetadata(metadata2, (metadata3) => {
        this.processingMetadata = false;
        this.nextListener.onReceiveMetadata(metadata3);
        this.processPendingMessage();
        this.processPendingStatus();
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onReceiveMessage(message) {
      this.processingMessage = true;
      this.listener.onReceiveMessage(message, (msg) => {
        this.processingMessage = false;
        if (this.processingMetadata) {
          this.pendingMessage = msg;
          this.hasPendingMessage = true;
        } else {
          this.nextListener.onReceiveMessage(msg);
          this.processPendingStatus();
        }
      });
    }
    onReceiveStatus(status) {
      this.listener.onReceiveStatus(status, (processedStatus) => {
        if (this.processingMetadata || this.processingMessage) {
          this.pendingStatus = processedStatus;
        } else {
          this.nextListener.onReceiveStatus(processedStatus);
        }
      });
    }
  }
  callInterface$1.InterceptingListenerImpl = InterceptingListenerImpl;
  return callInterface$1;
}
var hasRequiredClientInterceptors$1;
function requireClientInterceptors$1() {
  if (hasRequiredClientInterceptors$1) return clientInterceptors$1;
  hasRequiredClientInterceptors$1 = 1;
  Object.defineProperty(clientInterceptors$1, "__esModule", { value: true });
  clientInterceptors$1.InterceptingCall = clientInterceptors$1.RequesterBuilder = clientInterceptors$1.ListenerBuilder = clientInterceptors$1.InterceptorConfigurationError = void 0;
  clientInterceptors$1.getInterceptingCall = getInterceptingCall;
  const metadata_1 = requireMetadata$1();
  const call_interface_1 = requireCallInterface$1();
  const constants_1 = requireConstants$1();
  const error_1 = requireError$1();
  class InterceptorConfigurationError extends Error {
    constructor(message) {
      super(message);
      this.name = "InterceptorConfigurationError";
      Error.captureStackTrace(this, InterceptorConfigurationError);
    }
  }
  clientInterceptors$1.InterceptorConfigurationError = InterceptorConfigurationError;
  class ListenerBuilder {
    constructor() {
      this.metadata = void 0;
      this.message = void 0;
      this.status = void 0;
    }
    withOnReceiveMetadata(onReceiveMetadata) {
      this.metadata = onReceiveMetadata;
      return this;
    }
    withOnReceiveMessage(onReceiveMessage) {
      this.message = onReceiveMessage;
      return this;
    }
    withOnReceiveStatus(onReceiveStatus) {
      this.status = onReceiveStatus;
      return this;
    }
    build() {
      return {
        onReceiveMetadata: this.metadata,
        onReceiveMessage: this.message,
        onReceiveStatus: this.status
      };
    }
  }
  clientInterceptors$1.ListenerBuilder = ListenerBuilder;
  class RequesterBuilder {
    constructor() {
      this.start = void 0;
      this.message = void 0;
      this.halfClose = void 0;
      this.cancel = void 0;
    }
    withStart(start) {
      this.start = start;
      return this;
    }
    withSendMessage(sendMessage) {
      this.message = sendMessage;
      return this;
    }
    withHalfClose(halfClose) {
      this.halfClose = halfClose;
      return this;
    }
    withCancel(cancel) {
      this.cancel = cancel;
      return this;
    }
    build() {
      return {
        start: this.start,
        sendMessage: this.message,
        halfClose: this.halfClose,
        cancel: this.cancel
      };
    }
  }
  clientInterceptors$1.RequesterBuilder = RequesterBuilder;
  const defaultListener = {
    onReceiveMetadata: (metadata2, next) => {
      next(metadata2);
    },
    onReceiveMessage: (message, next) => {
      next(message);
    },
    onReceiveStatus: (status, next) => {
      next(status);
    }
  };
  const defaultRequester = {
    start: (metadata2, listener, next) => {
      next(metadata2, listener);
    },
    sendMessage: (message, next) => {
      next(message);
    },
    halfClose: (next) => {
      next();
    },
    cancel: (next) => {
      next();
    }
  };
  class InterceptingCall {
    constructor(nextCall, requester) {
      var _a, _b, _c, _d;
      this.nextCall = nextCall;
      this.processingMetadata = false;
      this.pendingMessageContext = null;
      this.processingMessage = false;
      this.pendingHalfClose = false;
      if (requester) {
        this.requester = {
          start: (_a = requester.start) !== null && _a !== void 0 ? _a : defaultRequester.start,
          sendMessage: (_b = requester.sendMessage) !== null && _b !== void 0 ? _b : defaultRequester.sendMessage,
          halfClose: (_c = requester.halfClose) !== null && _c !== void 0 ? _c : defaultRequester.halfClose,
          cancel: (_d = requester.cancel) !== null && _d !== void 0 ? _d : defaultRequester.cancel
        };
      } else {
        this.requester = defaultRequester;
      }
    }
    cancelWithStatus(status, details) {
      this.requester.cancel(() => {
        this.nextCall.cancelWithStatus(status, details);
      });
    }
    getPeer() {
      return this.nextCall.getPeer();
    }
    processPendingMessage() {
      if (this.pendingMessageContext) {
        this.nextCall.sendMessageWithContext(this.pendingMessageContext, this.pendingMessage);
        this.pendingMessageContext = null;
        this.pendingMessage = null;
      }
    }
    processPendingHalfClose() {
      if (this.pendingHalfClose) {
        this.nextCall.halfClose();
      }
    }
    start(metadata2, interceptingListener) {
      var _a, _b, _c, _d, _e, _f;
      const fullInterceptingListener = {
        onReceiveMetadata: (_b = (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(interceptingListener)) !== null && _b !== void 0 ? _b : ((metadata3) => {
        }),
        onReceiveMessage: (_d = (_c = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _c === void 0 ? void 0 : _c.bind(interceptingListener)) !== null && _d !== void 0 ? _d : ((message) => {
        }),
        onReceiveStatus: (_f = (_e = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _e === void 0 ? void 0 : _e.bind(interceptingListener)) !== null && _f !== void 0 ? _f : ((status) => {
        })
      };
      this.processingMetadata = true;
      this.requester.start(metadata2, fullInterceptingListener, (md, listener) => {
        var _a2, _b2, _c2;
        this.processingMetadata = false;
        let finalInterceptingListener;
        if ((0, call_interface_1.isInterceptingListener)(listener)) {
          finalInterceptingListener = listener;
        } else {
          const fullListener = {
            onReceiveMetadata: (_a2 = listener.onReceiveMetadata) !== null && _a2 !== void 0 ? _a2 : defaultListener.onReceiveMetadata,
            onReceiveMessage: (_b2 = listener.onReceiveMessage) !== null && _b2 !== void 0 ? _b2 : defaultListener.onReceiveMessage,
            onReceiveStatus: (_c2 = listener.onReceiveStatus) !== null && _c2 !== void 0 ? _c2 : defaultListener.onReceiveStatus
          };
          finalInterceptingListener = new call_interface_1.InterceptingListenerImpl(fullListener, fullInterceptingListener);
        }
        this.nextCall.start(md, finalInterceptingListener);
        this.processPendingMessage();
        this.processPendingHalfClose();
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
      this.processingMessage = true;
      this.requester.sendMessage(message, (finalMessage) => {
        this.processingMessage = false;
        if (this.processingMetadata) {
          this.pendingMessageContext = context;
          this.pendingMessage = message;
        } else {
          this.nextCall.sendMessageWithContext(context, finalMessage);
          this.processPendingHalfClose();
        }
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
      this.sendMessageWithContext({}, message);
    }
    startRead() {
      this.nextCall.startRead();
    }
    halfClose() {
      this.requester.halfClose(() => {
        if (this.processingMetadata || this.processingMessage) {
          this.pendingHalfClose = true;
        } else {
          this.nextCall.halfClose();
        }
      });
    }
    getAuthContext() {
      return this.nextCall.getAuthContext();
    }
  }
  clientInterceptors$1.InterceptingCall = InterceptingCall;
  function getCall(channel2, path, options) {
    var _a, _b;
    const deadline2 = (_a = options.deadline) !== null && _a !== void 0 ? _a : Infinity;
    const host = options.host;
    const parent = (_b = options.parent) !== null && _b !== void 0 ? _b : null;
    const propagateFlags = options.propagate_flags;
    const credentials = options.credentials;
    const call2 = channel2.createCall(path, deadline2, host, parent, propagateFlags);
    if (credentials) {
      call2.setCredentials(credentials);
    }
    return call2;
  }
  class BaseInterceptingCall {
    constructor(call2, methodDefinition) {
      this.call = call2;
      this.methodDefinition = methodDefinition;
    }
    cancelWithStatus(status, details) {
      this.call.cancelWithStatus(status, details);
    }
    getPeer() {
      return this.call.getPeer();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
      let serialized;
      try {
        serialized = this.methodDefinition.requestSerialize(message);
      } catch (e) {
        this.call.cancelWithStatus(constants_1.Status.INTERNAL, `Request message serialization failure: ${(0, error_1.getErrorMessage)(e)}`);
        return;
      }
      this.call.sendMessageWithContext(context, serialized);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
      this.sendMessageWithContext({}, message);
    }
    start(metadata2, interceptingListener) {
      let readError = null;
      this.call.start(metadata2, {
        onReceiveMetadata: (metadata3) => {
          var _a;
          (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, metadata3);
        },
        onReceiveMessage: (message) => {
          var _a;
          let deserialized;
          try {
            deserialized = this.methodDefinition.responseDeserialize(message);
          } catch (e) {
            readError = {
              code: constants_1.Status.INTERNAL,
              details: `Response message parsing error: ${(0, error_1.getErrorMessage)(e)}`,
              metadata: new metadata_1.Metadata()
            };
            this.call.cancelWithStatus(readError.code, readError.details);
            return;
          }
          (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, deserialized);
        },
        onReceiveStatus: (status) => {
          var _a, _b;
          if (readError) {
            (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, readError);
          } else {
            (_b = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _b === void 0 ? void 0 : _b.call(interceptingListener, status);
          }
        }
      });
    }
    startRead() {
      this.call.startRead();
    }
    halfClose() {
      this.call.halfClose();
    }
    getAuthContext() {
      return this.call.getAuthContext();
    }
  }
  class BaseUnaryInterceptingCall extends BaseInterceptingCall {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(call2, methodDefinition) {
      super(call2, methodDefinition);
    }
    start(metadata2, listener) {
      var _a, _b;
      let receivedMessage = false;
      const wrapperListener = {
        onReceiveMetadata: (_b = (_a = listener === null || listener === void 0 ? void 0 : listener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(listener)) !== null && _b !== void 0 ? _b : ((metadata3) => {
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage: (message) => {
          var _a2;
          receivedMessage = true;
          (_a2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a2 === void 0 ? void 0 : _a2.call(listener, message);
        },
        onReceiveStatus: (status) => {
          var _a2, _b2;
          if (!receivedMessage) {
            (_a2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a2 === void 0 ? void 0 : _a2.call(listener, null);
          }
          (_b2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveStatus) === null || _b2 === void 0 ? void 0 : _b2.call(listener, status);
        }
      };
      super.start(metadata2, wrapperListener);
      this.call.startRead();
    }
  }
  class BaseStreamingInterceptingCall extends BaseInterceptingCall {
  }
  function getBottomInterceptingCall(channel2, options, methodDefinition) {
    const call2 = getCall(channel2, methodDefinition.path, options);
    if (methodDefinition.responseStream) {
      return new BaseStreamingInterceptingCall(call2, methodDefinition);
    } else {
      return new BaseUnaryInterceptingCall(call2, methodDefinition);
    }
  }
  function getInterceptingCall(interceptorArgs, methodDefinition, options, channel2) {
    if (interceptorArgs.clientInterceptors.length > 0 && interceptorArgs.clientInterceptorProviders.length > 0) {
      throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
    }
    if (interceptorArgs.callInterceptors.length > 0 && interceptorArgs.callInterceptorProviders.length > 0) {
      throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as call options. Only one of these is allowed.");
    }
    let interceptors = [];
    if (interceptorArgs.callInterceptors.length > 0 || interceptorArgs.callInterceptorProviders.length > 0) {
      interceptors = [].concat(interceptorArgs.callInterceptors, interceptorArgs.callInterceptorProviders.map((provider) => provider(methodDefinition))).filter((interceptor) => interceptor);
    } else {
      interceptors = [].concat(interceptorArgs.clientInterceptors, interceptorArgs.clientInterceptorProviders.map((provider) => provider(methodDefinition))).filter((interceptor) => interceptor);
    }
    const interceptorOptions = Object.assign({}, options, {
      method_definition: methodDefinition
    });
    const getCall2 = interceptors.reduceRight((nextCall, nextInterceptor) => {
      return (currentOptions) => nextInterceptor(currentOptions, nextCall);
    }, (finalOptions) => getBottomInterceptingCall(channel2, finalOptions, methodDefinition));
    return getCall2(interceptorOptions);
  }
  return clientInterceptors$1;
}
var hasRequiredClient$1;
function requireClient$1() {
  if (hasRequiredClient$1) return client$1;
  hasRequiredClient$1 = 1;
  Object.defineProperty(client$1, "__esModule", { value: true });
  client$1.Client = void 0;
  const call_1 = requireCall$1();
  const channel_1 = requireChannel$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const metadata_1 = requireMetadata$1();
  const client_interceptors_1 = requireClientInterceptors$1();
  const CHANNEL_SYMBOL = /* @__PURE__ */ Symbol();
  const INTERCEPTOR_SYMBOL = /* @__PURE__ */ Symbol();
  const INTERCEPTOR_PROVIDER_SYMBOL = /* @__PURE__ */ Symbol();
  const CALL_INVOCATION_TRANSFORMER_SYMBOL = /* @__PURE__ */ Symbol();
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function getErrorStackString(error2) {
    var _a;
    return ((_a = error2.stack) === null || _a === void 0 ? void 0 : _a.split("\n").slice(1).join("\n")) || "no stack trace available";
  }
  class Client {
    constructor(address, credentials, options = {}) {
      var _a, _b;
      options = Object.assign({}, options);
      this[INTERCEPTOR_SYMBOL] = (_a = options.interceptors) !== null && _a !== void 0 ? _a : [];
      delete options.interceptors;
      this[INTERCEPTOR_PROVIDER_SYMBOL] = (_b = options.interceptor_providers) !== null && _b !== void 0 ? _b : [];
      delete options.interceptor_providers;
      if (this[INTERCEPTOR_SYMBOL].length > 0 && this[INTERCEPTOR_PROVIDER_SYMBOL].length > 0) {
        throw new Error("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
      }
      this[CALL_INVOCATION_TRANSFORMER_SYMBOL] = options.callInvocationTransformer;
      delete options.callInvocationTransformer;
      if (options.channelOverride) {
        this[CHANNEL_SYMBOL] = options.channelOverride;
      } else if (options.channelFactoryOverride) {
        const channelFactoryOverride = options.channelFactoryOverride;
        delete options.channelFactoryOverride;
        this[CHANNEL_SYMBOL] = channelFactoryOverride(address, credentials, options);
      } else {
        this[CHANNEL_SYMBOL] = new channel_1.ChannelImplementation(address, credentials, options);
      }
    }
    close() {
      this[CHANNEL_SYMBOL].close();
    }
    getChannel() {
      return this[CHANNEL_SYMBOL];
    }
    waitForReady(deadline2, callback) {
      const checkState = (err) => {
        if (err) {
          callback(new Error("Failed to connect before the deadline"));
          return;
        }
        let newState;
        try {
          newState = this[CHANNEL_SYMBOL].getConnectivityState(true);
        } catch (e) {
          callback(new Error("The channel has been closed"));
          return;
        }
        if (newState === connectivity_state_1.ConnectivityState.READY) {
          callback();
        } else {
          try {
            this[CHANNEL_SYMBOL].watchConnectivityState(newState, deadline2, checkState);
          } catch (e) {
            callback(new Error("The channel has been closed"));
          }
        }
      };
      setImmediate(checkState);
    }
    checkOptionalUnaryResponseArguments(arg1, arg2, arg3) {
      if (isFunction(arg1)) {
        return { metadata: new metadata_1.Metadata(), options: {}, callback: arg1 };
      } else if (isFunction(arg2)) {
        if (arg1 instanceof metadata_1.Metadata) {
          return { metadata: arg1, options: {}, callback: arg2 };
        } else {
          return { metadata: new metadata_1.Metadata(), options: arg1, callback: arg2 };
        }
      } else {
        if (!(arg1 instanceof metadata_1.Metadata && arg2 instanceof Object && isFunction(arg3))) {
          throw new Error("Incorrect arguments passed");
        }
        return { metadata: arg1, options: arg2, callback: arg3 };
      }
    }
    makeUnaryRequest(method, serialize, deserialize, argument, metadata2, options, callback) {
      var _a, _b;
      const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata2, options, callback);
      const methodDefinition = {
        path: method,
        requestStream: false,
        responseStream: false,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        argument,
        metadata: checkedArguments.metadata,
        call: new call_1.ClientUnaryCallImpl(),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options,
        callback: checkedArguments.callback
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const emitter = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      emitter.call = call2;
      let responseMessage = null;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata: (metadata3) => {
          emitter.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          if (responseMessage !== null) {
            call2.cancelWithStatus(constants_1.Status.UNIMPLEMENTED, "Too many responses received");
          }
          responseMessage = message;
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          if (status.code === constants_1.Status.OK) {
            if (responseMessage === null) {
              const callerStack = getErrorStackString(callerStackError);
              callProperties.callback((0, call_1.callErrorFromStatus)({
                code: constants_1.Status.UNIMPLEMENTED,
                details: "No message received",
                metadata: status.metadata
              }, callerStack));
            } else {
              callProperties.callback(null, responseMessage);
            }
          } else {
            const callerStack = getErrorStackString(callerStackError);
            callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          emitter.emit("status", status);
        }
      });
      call2.sendMessage(argument);
      call2.halfClose();
      return emitter;
    }
    makeClientStreamRequest(method, serialize, deserialize, metadata2, options, callback) {
      var _a, _b;
      const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata2, options, callback);
      const methodDefinition = {
        path: method,
        requestStream: true,
        responseStream: false,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        metadata: checkedArguments.metadata,
        call: new call_1.ClientWritableStreamImpl(serialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options,
        callback: checkedArguments.callback
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const emitter = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      emitter.call = call2;
      let responseMessage = null;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata: (metadata3) => {
          emitter.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          if (responseMessage !== null) {
            call2.cancelWithStatus(constants_1.Status.UNIMPLEMENTED, "Too many responses received");
          }
          responseMessage = message;
          call2.startRead();
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          if (status.code === constants_1.Status.OK) {
            if (responseMessage === null) {
              const callerStack = getErrorStackString(callerStackError);
              callProperties.callback((0, call_1.callErrorFromStatus)({
                code: constants_1.Status.UNIMPLEMENTED,
                details: "No message received",
                metadata: status.metadata
              }, callerStack));
            } else {
              callProperties.callback(null, responseMessage);
            }
          } else {
            const callerStack = getErrorStackString(callerStackError);
            callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          emitter.emit("status", status);
        }
      });
      return emitter;
    }
    checkMetadataAndOptions(arg1, arg2) {
      let metadata2;
      let options;
      if (arg1 instanceof metadata_1.Metadata) {
        metadata2 = arg1;
        if (arg2) {
          options = arg2;
        } else {
          options = {};
        }
      } else {
        if (arg1) {
          options = arg1;
        } else {
          options = {};
        }
        metadata2 = new metadata_1.Metadata();
      }
      return { metadata: metadata2, options };
    }
    makeServerStreamRequest(method, serialize, deserialize, argument, metadata2, options) {
      var _a, _b;
      const checkedArguments = this.checkMetadataAndOptions(metadata2, options);
      const methodDefinition = {
        path: method,
        requestStream: false,
        responseStream: true,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        argument,
        metadata: checkedArguments.metadata,
        call: new call_1.ClientReadableStreamImpl(deserialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const stream = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      stream.call = call2;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata(metadata3) {
          stream.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          stream.push(message);
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          stream.push(null);
          if (status.code !== constants_1.Status.OK) {
            const callerStack = getErrorStackString(callerStackError);
            stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          stream.emit("status", status);
        }
      });
      call2.sendMessage(argument);
      call2.halfClose();
      return stream;
    }
    makeBidiStreamRequest(method, serialize, deserialize, metadata2, options) {
      var _a, _b;
      const checkedArguments = this.checkMetadataAndOptions(metadata2, options);
      const methodDefinition = {
        path: method,
        requestStream: true,
        responseStream: true,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        metadata: checkedArguments.metadata,
        call: new call_1.ClientDuplexStreamImpl(serialize, deserialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const stream = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      stream.call = call2;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata(metadata3) {
          stream.emit("metadata", metadata3);
        },
        onReceiveMessage(message) {
          stream.push(message);
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          stream.push(null);
          if (status.code !== constants_1.Status.OK) {
            const callerStack = getErrorStackString(callerStackError);
            stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          stream.emit("status", status);
        }
      });
      return stream;
    }
  }
  client$1.Client = Client;
  return client$1;
}
var hasRequiredMakeClient$1;
function requireMakeClient$1() {
  if (hasRequiredMakeClient$1) return makeClient$1;
  hasRequiredMakeClient$1 = 1;
  Object.defineProperty(makeClient$1, "__esModule", { value: true });
  makeClient$1.makeClientConstructor = makeClientConstructor;
  makeClient$1.loadPackageDefinition = loadPackageDefinition;
  const client_1 = requireClient$1();
  const requesterFuncs = {
    unary: client_1.Client.prototype.makeUnaryRequest,
    server_stream: client_1.Client.prototype.makeServerStreamRequest,
    client_stream: client_1.Client.prototype.makeClientStreamRequest,
    bidi: client_1.Client.prototype.makeBidiStreamRequest
  };
  function isPrototypePolluted(key) {
    return ["__proto__", "prototype", "constructor"].includes(key);
  }
  function makeClientConstructor(methods, serviceName, classOptions) {
    class ServiceClientImpl extends client_1.Client {
    }
    Object.keys(methods).forEach((name) => {
      if (isPrototypePolluted(name)) {
        return;
      }
      const attrs = methods[name];
      let methodType;
      if (typeof name === "string" && name.charAt(0) === "$") {
        throw new Error("Method names cannot start with $");
      }
      if (attrs.requestStream) {
        if (attrs.responseStream) {
          methodType = "bidi";
        } else {
          methodType = "client_stream";
        }
      } else {
        if (attrs.responseStream) {
          methodType = "server_stream";
        } else {
          methodType = "unary";
        }
      }
      const serialize = attrs.requestSerialize;
      const deserialize = attrs.responseDeserialize;
      const methodFunc = partial(requesterFuncs[methodType], attrs.path, serialize, deserialize);
      ServiceClientImpl.prototype[name] = methodFunc;
      Object.assign(ServiceClientImpl.prototype[name], attrs);
      if (attrs.originalName && !isPrototypePolluted(attrs.originalName)) {
        ServiceClientImpl.prototype[attrs.originalName] = ServiceClientImpl.prototype[name];
      }
    });
    ServiceClientImpl.service = methods;
    ServiceClientImpl.serviceName = serviceName;
    return ServiceClientImpl;
  }
  function partial(fn, path, serialize, deserialize) {
    return function(...args) {
      return fn.call(this, path, serialize, deserialize, ...args);
    };
  }
  function isProtobufTypeDefinition(obj) {
    return "format" in obj;
  }
  function loadPackageDefinition(packageDef) {
    const result = {};
    for (const serviceFqn in packageDef) {
      if (Object.prototype.hasOwnProperty.call(packageDef, serviceFqn)) {
        const service = packageDef[serviceFqn];
        const nameComponents = serviceFqn.split(".");
        if (nameComponents.some((comp) => isPrototypePolluted(comp))) {
          continue;
        }
        const serviceName = nameComponents[nameComponents.length - 1];
        let current = result;
        for (const packageName of nameComponents.slice(0, -1)) {
          if (!current[packageName]) {
            current[packageName] = {};
          }
          current = current[packageName];
        }
        if (isProtobufTypeDefinition(service)) {
          current[serviceName] = service;
        } else {
          current[serviceName] = makeClientConstructor(service, serviceName);
        }
      }
    }
    return result;
  }
  return makeClient$1;
}
var hasRequiredChannelz$1;
function requireChannelz$1() {
  if (hasRequiredChannelz$1) return channelz$1;
  hasRequiredChannelz$1 = 1;
  Object.defineProperty(channelz$1, "__esModule", { value: true });
  channelz$1.registerChannelzSocket = channelz$1.registerChannelzServer = channelz$1.registerChannelzSubchannel = channelz$1.registerChannelzChannel = channelz$1.ChannelzCallTrackerStub = channelz$1.ChannelzCallTracker = channelz$1.ChannelzChildrenTrackerStub = channelz$1.ChannelzChildrenTracker = channelz$1.ChannelzTrace = channelz$1.ChannelzTraceStub = void 0;
  channelz$1.unregisterChannelzRef = unregisterChannelzRef;
  channelz$1.getChannelzHandlers = getChannelzHandlers;
  channelz$1.getChannelzServiceDefinition = getChannelzServiceDefinition;
  channelz$1.setup = setup;
  const net_1 = require$$0$1;
  const ordered_map_1 = require$$1$3;
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const admin_1 = requireAdmin$1();
  const make_client_1 = requireMakeClient$1();
  function channelRefToMessage(ref) {
    return {
      channel_id: ref.id,
      name: ref.name
    };
  }
  function subchannelRefToMessage(ref) {
    return {
      subchannel_id: ref.id,
      name: ref.name
    };
  }
  function serverRefToMessage(ref) {
    return {
      server_id: ref.id
    };
  }
  function socketRefToMessage(ref) {
    return {
      socket_id: ref.id,
      name: ref.name
    };
  }
  const TARGET_RETAINED_TRACES = 32;
  const DEFAULT_MAX_RESULTS = 100;
  class ChannelzTraceStub {
    constructor() {
      this.events = [];
      this.creationTimestamp = /* @__PURE__ */ new Date();
      this.eventsLogged = 0;
    }
    addTrace() {
    }
    getTraceMessage() {
      return {
        creation_timestamp: dateToProtoTimestamp(this.creationTimestamp),
        num_events_logged: this.eventsLogged,
        events: []
      };
    }
  }
  channelz$1.ChannelzTraceStub = ChannelzTraceStub;
  class ChannelzTrace {
    constructor() {
      this.events = [];
      this.eventsLogged = 0;
      this.creationTimestamp = /* @__PURE__ */ new Date();
    }
    addTrace(severity, description, child) {
      const timestamp = /* @__PURE__ */ new Date();
      this.events.push({
        description,
        severity,
        timestamp,
        childChannel: (child === null || child === void 0 ? void 0 : child.kind) === "channel" ? child : void 0,
        childSubchannel: (child === null || child === void 0 ? void 0 : child.kind) === "subchannel" ? child : void 0
      });
      if (this.events.length >= TARGET_RETAINED_TRACES * 2) {
        this.events = this.events.slice(TARGET_RETAINED_TRACES);
      }
      this.eventsLogged += 1;
    }
    getTraceMessage() {
      return {
        creation_timestamp: dateToProtoTimestamp(this.creationTimestamp),
        num_events_logged: this.eventsLogged,
        events: this.events.map((event) => {
          return {
            description: event.description,
            severity: event.severity,
            timestamp: dateToProtoTimestamp(event.timestamp),
            channel_ref: event.childChannel ? channelRefToMessage(event.childChannel) : null,
            subchannel_ref: event.childSubchannel ? subchannelRefToMessage(event.childSubchannel) : null
          };
        })
      };
    }
  }
  channelz$1.ChannelzTrace = ChannelzTrace;
  class ChannelzChildrenTracker {
    constructor() {
      this.channelChildren = new ordered_map_1.OrderedMap();
      this.subchannelChildren = new ordered_map_1.OrderedMap();
      this.socketChildren = new ordered_map_1.OrderedMap();
      this.trackerMap = {
        [
          "channel"
          /* EntityTypes.channel */
        ]: this.channelChildren,
        [
          "subchannel"
          /* EntityTypes.subchannel */
        ]: this.subchannelChildren,
        [
          "socket"
          /* EntityTypes.socket */
        ]: this.socketChildren
      };
    }
    refChild(child) {
      const tracker = this.trackerMap[child.kind];
      const trackedChild = tracker.find(child.id);
      if (trackedChild.equals(tracker.end())) {
        tracker.setElement(child.id, {
          ref: child,
          count: 1
        }, trackedChild);
      } else {
        trackedChild.pointer[1].count += 1;
      }
    }
    unrefChild(child) {
      const tracker = this.trackerMap[child.kind];
      const trackedChild = tracker.getElementByKey(child.id);
      if (trackedChild !== void 0) {
        trackedChild.count -= 1;
        if (trackedChild.count === 0) {
          tracker.eraseElementByKey(child.id);
        }
      }
    }
    getChildLists() {
      return {
        channels: this.channelChildren,
        subchannels: this.subchannelChildren,
        sockets: this.socketChildren
      };
    }
  }
  channelz$1.ChannelzChildrenTracker = ChannelzChildrenTracker;
  class ChannelzChildrenTrackerStub extends ChannelzChildrenTracker {
    refChild() {
    }
    unrefChild() {
    }
  }
  channelz$1.ChannelzChildrenTrackerStub = ChannelzChildrenTrackerStub;
  class ChannelzCallTracker {
    constructor() {
      this.callsStarted = 0;
      this.callsSucceeded = 0;
      this.callsFailed = 0;
      this.lastCallStartedTimestamp = null;
    }
    addCallStarted() {
      this.callsStarted += 1;
      this.lastCallStartedTimestamp = /* @__PURE__ */ new Date();
    }
    addCallSucceeded() {
      this.callsSucceeded += 1;
    }
    addCallFailed() {
      this.callsFailed += 1;
    }
  }
  channelz$1.ChannelzCallTracker = ChannelzCallTracker;
  class ChannelzCallTrackerStub extends ChannelzCallTracker {
    addCallStarted() {
    }
    addCallSucceeded() {
    }
    addCallFailed() {
    }
  }
  channelz$1.ChannelzCallTrackerStub = ChannelzCallTrackerStub;
  const entityMaps = {
    [
      "channel"
      /* EntityTypes.channel */
    ]: new ordered_map_1.OrderedMap(),
    [
      "subchannel"
      /* EntityTypes.subchannel */
    ]: new ordered_map_1.OrderedMap(),
    [
      "server"
      /* EntityTypes.server */
    ]: new ordered_map_1.OrderedMap(),
    [
      "socket"
      /* EntityTypes.socket */
    ]: new ordered_map_1.OrderedMap()
  };
  const generateRegisterFn = (kind) => {
    let nextId = 1;
    function getNextId() {
      return nextId++;
    }
    const entityMap = entityMaps[kind];
    return (name, getInfo, channelzEnabled) => {
      const id = getNextId();
      const ref = { id, name, kind };
      if (channelzEnabled) {
        entityMap.setElement(id, { ref, getInfo });
      }
      return ref;
    };
  };
  channelz$1.registerChannelzChannel = generateRegisterFn(
    "channel"
    /* EntityTypes.channel */
  );
  channelz$1.registerChannelzSubchannel = generateRegisterFn(
    "subchannel"
    /* EntityTypes.subchannel */
  );
  channelz$1.registerChannelzServer = generateRegisterFn(
    "server"
    /* EntityTypes.server */
  );
  channelz$1.registerChannelzSocket = generateRegisterFn(
    "socket"
    /* EntityTypes.socket */
  );
  function unregisterChannelzRef(ref) {
    entityMaps[ref.kind].eraseElementByKey(ref.id);
  }
  function parseIPv6Section(addressSection) {
    const numberValue = Number.parseInt(addressSection, 16);
    return [numberValue / 256 | 0, numberValue % 256];
  }
  function parseIPv6Chunk(addressChunk) {
    if (addressChunk === "") {
      return [];
    }
    const bytePairs = addressChunk.split(":").map((section) => parseIPv6Section(section));
    const result = [];
    return result.concat(...bytePairs);
  }
  function isIPv6MappedIPv4(ipAddress) {
    return (0, net_1.isIPv6)(ipAddress) && ipAddress.toLowerCase().startsWith("::ffff:") && (0, net_1.isIPv4)(ipAddress.substring(7));
  }
  function ipv4AddressStringToBuffer(ipAddress) {
    return Buffer.from(Uint8Array.from(ipAddress.split(".").map((segment) => Number.parseInt(segment))));
  }
  function ipAddressStringToBuffer(ipAddress) {
    if ((0, net_1.isIPv4)(ipAddress)) {
      return ipv4AddressStringToBuffer(ipAddress);
    } else if (isIPv6MappedIPv4(ipAddress)) {
      return ipv4AddressStringToBuffer(ipAddress.substring(7));
    } else if ((0, net_1.isIPv6)(ipAddress)) {
      let leftSection;
      let rightSection;
      const doubleColonIndex = ipAddress.indexOf("::");
      if (doubleColonIndex === -1) {
        leftSection = ipAddress;
        rightSection = "";
      } else {
        leftSection = ipAddress.substring(0, doubleColonIndex);
        rightSection = ipAddress.substring(doubleColonIndex + 2);
      }
      const leftBuffer = Buffer.from(parseIPv6Chunk(leftSection));
      const rightBuffer = Buffer.from(parseIPv6Chunk(rightSection));
      const middleBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
      return Buffer.concat([leftBuffer, middleBuffer, rightBuffer]);
    } else {
      return null;
    }
  }
  function connectivityStateToMessage(state) {
    switch (state) {
      case connectivity_state_1.ConnectivityState.CONNECTING:
        return {
          state: "CONNECTING"
        };
      case connectivity_state_1.ConnectivityState.IDLE:
        return {
          state: "IDLE"
        };
      case connectivity_state_1.ConnectivityState.READY:
        return {
          state: "READY"
        };
      case connectivity_state_1.ConnectivityState.SHUTDOWN:
        return {
          state: "SHUTDOWN"
        };
      case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
        return {
          state: "TRANSIENT_FAILURE"
        };
      default:
        return {
          state: "UNKNOWN"
        };
    }
  }
  function dateToProtoTimestamp(date) {
    if (!date) {
      return null;
    }
    const millisSinceEpoch = date.getTime();
    return {
      seconds: millisSinceEpoch / 1e3 | 0,
      nanos: millisSinceEpoch % 1e3 * 1e6
    };
  }
  function getChannelMessage(channelEntry) {
    const resolvedInfo = channelEntry.getInfo();
    const channelRef = [];
    const subchannelRef = [];
    resolvedInfo.children.channels.forEach((el) => {
      channelRef.push(channelRefToMessage(el[1].ref));
    });
    resolvedInfo.children.subchannels.forEach((el) => {
      subchannelRef.push(subchannelRefToMessage(el[1].ref));
    });
    return {
      ref: channelRefToMessage(channelEntry.ref),
      data: {
        target: resolvedInfo.target,
        state: connectivityStateToMessage(resolvedInfo.state),
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      channel_ref: channelRef,
      subchannel_ref: subchannelRef
    };
  }
  function GetChannel(call2, callback) {
    const channelId = parseInt(call2.request.channel_id, 10);
    const channelEntry = entityMaps[
      "channel"
      /* EntityTypes.channel */
    ].getElementByKey(channelId);
    if (channelEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No channel data found for id " + channelId
      });
      return;
    }
    callback(null, { channel: getChannelMessage(channelEntry) });
  }
  function GetTopChannels(call2, callback) {
    const maxResults = parseInt(call2.request.max_results, 10) || DEFAULT_MAX_RESULTS;
    const resultList = [];
    const startId = parseInt(call2.request.start_channel_id, 10);
    const channelEntries = entityMaps[
      "channel"
      /* EntityTypes.channel */
    ];
    let i;
    for (i = channelEntries.lowerBound(startId); !i.equals(channelEntries.end()) && resultList.length < maxResults; i = i.next()) {
      resultList.push(getChannelMessage(i.pointer[1]));
    }
    callback(null, {
      channel: resultList,
      end: i.equals(channelEntries.end())
    });
  }
  function getServerMessage(serverEntry) {
    const resolvedInfo = serverEntry.getInfo();
    const listenSocket = [];
    resolvedInfo.listenerChildren.sockets.forEach((el) => {
      listenSocket.push(socketRefToMessage(el[1].ref));
    });
    return {
      ref: serverRefToMessage(serverEntry.ref),
      data: {
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      listen_socket: listenSocket
    };
  }
  function GetServer(call2, callback) {
    const serverId = parseInt(call2.request.server_id, 10);
    const serverEntries = entityMaps[
      "server"
      /* EntityTypes.server */
    ];
    const serverEntry = serverEntries.getElementByKey(serverId);
    if (serverEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No server data found for id " + serverId
      });
      return;
    }
    callback(null, { server: getServerMessage(serverEntry) });
  }
  function GetServers(call2, callback) {
    const maxResults = parseInt(call2.request.max_results, 10) || DEFAULT_MAX_RESULTS;
    const startId = parseInt(call2.request.start_server_id, 10);
    const serverEntries = entityMaps[
      "server"
      /* EntityTypes.server */
    ];
    const resultList = [];
    let i;
    for (i = serverEntries.lowerBound(startId); !i.equals(serverEntries.end()) && resultList.length < maxResults; i = i.next()) {
      resultList.push(getServerMessage(i.pointer[1]));
    }
    callback(null, {
      server: resultList,
      end: i.equals(serverEntries.end())
    });
  }
  function GetSubchannel(call2, callback) {
    const subchannelId = parseInt(call2.request.subchannel_id, 10);
    const subchannelEntry = entityMaps[
      "subchannel"
      /* EntityTypes.subchannel */
    ].getElementByKey(subchannelId);
    if (subchannelEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No subchannel data found for id " + subchannelId
      });
      return;
    }
    const resolvedInfo = subchannelEntry.getInfo();
    const listenSocket = [];
    resolvedInfo.children.sockets.forEach((el) => {
      listenSocket.push(socketRefToMessage(el[1].ref));
    });
    const subchannelMessage = {
      ref: subchannelRefToMessage(subchannelEntry.ref),
      data: {
        target: resolvedInfo.target,
        state: connectivityStateToMessage(resolvedInfo.state),
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      socket_ref: listenSocket
    };
    callback(null, { subchannel: subchannelMessage });
  }
  function subchannelAddressToAddressMessage(subchannelAddress2) {
    var _a;
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(subchannelAddress2)) {
      return {
        address: "tcpip_address",
        tcpip_address: {
          ip_address: (_a = ipAddressStringToBuffer(subchannelAddress2.host)) !== null && _a !== void 0 ? _a : void 0,
          port: subchannelAddress2.port
        }
      };
    } else {
      return {
        address: "uds_address",
        uds_address: {
          filename: subchannelAddress2.path
        }
      };
    }
  }
  function GetSocket(call2, callback) {
    var _a, _b, _c, _d, _e;
    const socketId = parseInt(call2.request.socket_id, 10);
    const socketEntry = entityMaps[
      "socket"
      /* EntityTypes.socket */
    ].getElementByKey(socketId);
    if (socketEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No socket data found for id " + socketId
      });
      return;
    }
    const resolvedInfo = socketEntry.getInfo();
    const securityMessage = resolvedInfo.security ? {
      model: "tls",
      tls: {
        cipher_suite: resolvedInfo.security.cipherSuiteStandardName ? "standard_name" : "other_name",
        standard_name: (_a = resolvedInfo.security.cipherSuiteStandardName) !== null && _a !== void 0 ? _a : void 0,
        other_name: (_b = resolvedInfo.security.cipherSuiteOtherName) !== null && _b !== void 0 ? _b : void 0,
        local_certificate: (_c = resolvedInfo.security.localCertificate) !== null && _c !== void 0 ? _c : void 0,
        remote_certificate: (_d = resolvedInfo.security.remoteCertificate) !== null && _d !== void 0 ? _d : void 0
      }
    } : null;
    const socketMessage = {
      ref: socketRefToMessage(socketEntry.ref),
      local: resolvedInfo.localAddress ? subchannelAddressToAddressMessage(resolvedInfo.localAddress) : null,
      remote: resolvedInfo.remoteAddress ? subchannelAddressToAddressMessage(resolvedInfo.remoteAddress) : null,
      remote_name: (_e = resolvedInfo.remoteName) !== null && _e !== void 0 ? _e : void 0,
      security: securityMessage,
      data: {
        keep_alives_sent: resolvedInfo.keepAlivesSent,
        streams_started: resolvedInfo.streamsStarted,
        streams_succeeded: resolvedInfo.streamsSucceeded,
        streams_failed: resolvedInfo.streamsFailed,
        last_local_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastLocalStreamCreatedTimestamp),
        last_remote_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastRemoteStreamCreatedTimestamp),
        messages_received: resolvedInfo.messagesReceived,
        messages_sent: resolvedInfo.messagesSent,
        last_message_received_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageReceivedTimestamp),
        last_message_sent_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageSentTimestamp),
        local_flow_control_window: resolvedInfo.localFlowControlWindow ? { value: resolvedInfo.localFlowControlWindow } : null,
        remote_flow_control_window: resolvedInfo.remoteFlowControlWindow ? { value: resolvedInfo.remoteFlowControlWindow } : null
      }
    };
    callback(null, { socket: socketMessage });
  }
  function GetServerSockets(call2, callback) {
    const serverId = parseInt(call2.request.server_id, 10);
    const serverEntry = entityMaps[
      "server"
      /* EntityTypes.server */
    ].getElementByKey(serverId);
    if (serverEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No server data found for id " + serverId
      });
      return;
    }
    const startId = parseInt(call2.request.start_socket_id, 10);
    const maxResults = parseInt(call2.request.max_results, 10) || DEFAULT_MAX_RESULTS;
    const resolvedInfo = serverEntry.getInfo();
    const allSockets = resolvedInfo.sessionChildren.sockets;
    const resultList = [];
    let i;
    for (i = allSockets.lowerBound(startId); !i.equals(allSockets.end()) && resultList.length < maxResults; i = i.next()) {
      resultList.push(socketRefToMessage(i.pointer[1].ref));
    }
    callback(null, {
      socket_ref: resultList,
      end: i.equals(allSockets.end())
    });
  }
  function getChannelzHandlers() {
    return {
      GetChannel,
      GetTopChannels,
      GetServer,
      GetServers,
      GetSubchannel,
      GetSocket,
      GetServerSockets
    };
  }
  let loadedChannelzDefinition = null;
  function getChannelzServiceDefinition() {
    if (loadedChannelzDefinition) {
      return loadedChannelzDefinition;
    }
    const loaderLoadSync = requireSrc$2().loadSync;
    const loadedProto = loaderLoadSync("channelz.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [`${__dirname}/../../proto`]
    });
    const channelzGrpcObject = (0, make_client_1.loadPackageDefinition)(loadedProto);
    loadedChannelzDefinition = channelzGrpcObject.grpc.channelz.v1.Channelz.service;
    return loadedChannelzDefinition;
  }
  function setup() {
    (0, admin_1.registerAdminService)(getChannelzServiceDefinition, getChannelzHandlers);
  }
  return channelz$1;
}
var singleSubchannelChannel = {};
var callNumber$1 = {};
var hasRequiredCallNumber$1;
function requireCallNumber$1() {
  if (hasRequiredCallNumber$1) return callNumber$1;
  hasRequiredCallNumber$1 = 1;
  Object.defineProperty(callNumber$1, "__esModule", { value: true });
  callNumber$1.getNextCallNumber = getNextCallNumber;
  let nextCallNumber = 0;
  function getNextCallNumber() {
    return nextCallNumber++;
  }
  return callNumber$1;
}
var compressionFilter$1 = {};
var compressionAlgorithms$1 = {};
var hasRequiredCompressionAlgorithms$1;
function requireCompressionAlgorithms$1() {
  if (hasRequiredCompressionAlgorithms$1) return compressionAlgorithms$1;
  hasRequiredCompressionAlgorithms$1 = 1;
  Object.defineProperty(compressionAlgorithms$1, "__esModule", { value: true });
  compressionAlgorithms$1.CompressionAlgorithms = void 0;
  var CompressionAlgorithms;
  (function(CompressionAlgorithms2) {
    CompressionAlgorithms2[CompressionAlgorithms2["identity"] = 0] = "identity";
    CompressionAlgorithms2[CompressionAlgorithms2["deflate"] = 1] = "deflate";
    CompressionAlgorithms2[CompressionAlgorithms2["gzip"] = 2] = "gzip";
  })(CompressionAlgorithms || (compressionAlgorithms$1.CompressionAlgorithms = CompressionAlgorithms = {}));
  return compressionAlgorithms$1;
}
var filter$1 = {};
var hasRequiredFilter$1;
function requireFilter$1() {
  if (hasRequiredFilter$1) return filter$1;
  hasRequiredFilter$1 = 1;
  Object.defineProperty(filter$1, "__esModule", { value: true });
  filter$1.BaseFilter = void 0;
  class BaseFilter {
    async sendMetadata(metadata2) {
      return metadata2;
    }
    receiveMetadata(metadata2) {
      return metadata2;
    }
    async sendMessage(message) {
      return message;
    }
    async receiveMessage(message) {
      return message;
    }
    receiveTrailers(status) {
      return status;
    }
  }
  filter$1.BaseFilter = BaseFilter;
  return filter$1;
}
var hasRequiredCompressionFilter$1;
function requireCompressionFilter$1() {
  if (hasRequiredCompressionFilter$1) return compressionFilter$1;
  hasRequiredCompressionFilter$1 = 1;
  Object.defineProperty(compressionFilter$1, "__esModule", { value: true });
  compressionFilter$1.CompressionFilterFactory = compressionFilter$1.CompressionFilter = void 0;
  const zlib$1 = zlib;
  const compression_algorithms_1 = requireCompressionAlgorithms$1();
  const constants_1 = requireConstants$1();
  const filter_1 = requireFilter$1();
  const logging2 = requireLogging$1();
  const isCompressionAlgorithmKey = (key) => {
    return typeof key === "number" && typeof compression_algorithms_1.CompressionAlgorithms[key] === "string";
  };
  class CompressionHandler {
    /**
     * @param message Raw uncompressed message bytes
     * @param compress Indicates whether the message should be compressed
     * @return Framed message, compressed if applicable
     */
    async writeMessage(message, compress) {
      let messageBuffer = message;
      if (compress) {
        messageBuffer = await this.compressMessage(messageBuffer);
      }
      const output = Buffer.allocUnsafe(messageBuffer.length + 5);
      output.writeUInt8(compress ? 1 : 0, 0);
      output.writeUInt32BE(messageBuffer.length, 1);
      messageBuffer.copy(output, 5);
      return output;
    }
    /**
     * @param data Framed message, possibly compressed
     * @return Uncompressed message
     */
    async readMessage(data) {
      const compressed = data.readUInt8(0) === 1;
      let messageBuffer = data.slice(5);
      if (compressed) {
        messageBuffer = await this.decompressMessage(messageBuffer);
      }
      return messageBuffer;
    }
  }
  class IdentityHandler extends CompressionHandler {
    async compressMessage(message) {
      return message;
    }
    async writeMessage(message, compress) {
      const output = Buffer.allocUnsafe(message.length + 5);
      output.writeUInt8(0, 0);
      output.writeUInt32BE(message.length, 1);
      message.copy(output, 5);
      return output;
    }
    decompressMessage(message) {
      return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'));
    }
  }
  class DeflateHandler extends CompressionHandler {
    constructor(maxRecvMessageLength) {
      super();
      this.maxRecvMessageLength = maxRecvMessageLength;
    }
    compressMessage(message) {
      return new Promise((resolve, reject) => {
        zlib$1.deflate(message, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      });
    }
    decompressMessage(message) {
      return new Promise((resolve, reject) => {
        let totalLength = 0;
        const messageParts = [];
        const decompresser = zlib$1.createInflate();
        decompresser.on("error", (error2) => {
          reject({
            code: constants_1.Status.INTERNAL,
            details: "Failed to decompress deflate-encoded message"
          });
        });
        decompresser.on("data", (chunk) => {
          messageParts.push(chunk);
          totalLength += chunk.byteLength;
          if (this.maxRecvMessageLength !== -1 && totalLength > this.maxRecvMessageLength) {
            decompresser.destroy();
            reject({
              code: constants_1.Status.RESOURCE_EXHAUSTED,
              details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
            });
          }
        });
        decompresser.on("end", () => {
          resolve(Buffer.concat(messageParts));
        });
        decompresser.write(message);
        decompresser.end();
      });
    }
  }
  class GzipHandler extends CompressionHandler {
    constructor(maxRecvMessageLength) {
      super();
      this.maxRecvMessageLength = maxRecvMessageLength;
    }
    compressMessage(message) {
      return new Promise((resolve, reject) => {
        zlib$1.gzip(message, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      });
    }
    decompressMessage(message) {
      return new Promise((resolve, reject) => {
        let totalLength = 0;
        const messageParts = [];
        const decompresser = zlib$1.createGunzip();
        decompresser.on("error", (error2) => {
          reject({
            code: constants_1.Status.INTERNAL,
            details: "Failed to decompress gzip-encoded message"
          });
        });
        decompresser.on("data", (chunk) => {
          messageParts.push(chunk);
          totalLength += chunk.byteLength;
          if (this.maxRecvMessageLength !== -1 && totalLength > this.maxRecvMessageLength) {
            decompresser.destroy();
            reject({
              code: constants_1.Status.RESOURCE_EXHAUSTED,
              details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
            });
          }
        });
        decompresser.on("end", () => {
          resolve(Buffer.concat(messageParts));
        });
        decompresser.write(message);
        decompresser.end();
      });
    }
  }
  class UnknownHandler extends CompressionHandler {
    constructor(compressionName) {
      super();
      this.compressionName = compressionName;
    }
    compressMessage(message) {
      return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`));
    }
    decompressMessage(message) {
      return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`));
    }
  }
  function getCompressionHandler(compressionName, maxReceiveMessageSize) {
    switch (compressionName) {
      case "identity":
        return new IdentityHandler();
      case "deflate":
        return new DeflateHandler(maxReceiveMessageSize);
      case "gzip":
        return new GzipHandler(maxReceiveMessageSize);
      default:
        return new UnknownHandler(compressionName);
    }
  }
  class CompressionFilter extends filter_1.BaseFilter {
    constructor(channelOptions2, sharedFilterConfig) {
      var _a, _b, _c;
      super();
      this.sharedFilterConfig = sharedFilterConfig;
      this.sendCompression = new IdentityHandler();
      this.receiveCompression = new IdentityHandler();
      this.currentCompressionAlgorithm = "identity";
      const compressionAlgorithmKey = channelOptions2["grpc.default_compression_algorithm"];
      this.maxReceiveMessageLength = (_a = channelOptions2["grpc.max_receive_message_length"]) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.maxSendMessageLength = (_b = channelOptions2["grpc.max_send_message_length"]) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_MAX_SEND_MESSAGE_LENGTH;
      if (compressionAlgorithmKey !== void 0) {
        if (isCompressionAlgorithmKey(compressionAlgorithmKey)) {
          const clientSelectedEncoding = compression_algorithms_1.CompressionAlgorithms[compressionAlgorithmKey];
          const serverSupportedEncodings = (_c = sharedFilterConfig.serverSupportedEncodingHeader) === null || _c === void 0 ? void 0 : _c.split(",");
          if (!serverSupportedEncodings || serverSupportedEncodings.includes(clientSelectedEncoding)) {
            this.currentCompressionAlgorithm = clientSelectedEncoding;
            this.sendCompression = getCompressionHandler(this.currentCompressionAlgorithm, -1);
          }
        } else {
          logging2.log(constants_1.LogVerbosity.ERROR, `Invalid value provided for grpc.default_compression_algorithm option: ${compressionAlgorithmKey}`);
        }
      }
    }
    async sendMetadata(metadata2) {
      const headers = await metadata2;
      headers.set("grpc-accept-encoding", "identity,deflate,gzip");
      headers.set("accept-encoding", "identity");
      if (this.currentCompressionAlgorithm === "identity") {
        headers.remove("grpc-encoding");
      } else {
        headers.set("grpc-encoding", this.currentCompressionAlgorithm);
      }
      return headers;
    }
    receiveMetadata(metadata2) {
      const receiveEncoding = metadata2.get("grpc-encoding");
      if (receiveEncoding.length > 0) {
        const encoding = receiveEncoding[0];
        if (typeof encoding === "string") {
          this.receiveCompression = getCompressionHandler(encoding, this.maxReceiveMessageLength);
        }
      }
      metadata2.remove("grpc-encoding");
      const serverSupportedEncodingsHeader = metadata2.get("grpc-accept-encoding")[0];
      if (serverSupportedEncodingsHeader) {
        this.sharedFilterConfig.serverSupportedEncodingHeader = serverSupportedEncodingsHeader;
        const serverSupportedEncodings = serverSupportedEncodingsHeader.split(",");
        if (!serverSupportedEncodings.includes(this.currentCompressionAlgorithm)) {
          this.sendCompression = new IdentityHandler();
          this.currentCompressionAlgorithm = "identity";
        }
      }
      metadata2.remove("grpc-accept-encoding");
      return metadata2;
    }
    async sendMessage(message) {
      var _a;
      const resolvedMessage = await message;
      if (this.maxSendMessageLength !== -1 && resolvedMessage.message.length > this.maxSendMessageLength) {
        throw {
          code: constants_1.Status.RESOURCE_EXHAUSTED,
          details: `Attempted to send message with a size larger than ${this.maxSendMessageLength}`
        };
      }
      let compress;
      if (this.sendCompression instanceof IdentityHandler) {
        compress = false;
      } else {
        compress = (((_a = resolvedMessage.flags) !== null && _a !== void 0 ? _a : 0) & 2) === 0;
      }
      return {
        message: await this.sendCompression.writeMessage(resolvedMessage.message, compress),
        flags: resolvedMessage.flags
      };
    }
    async receiveMessage(message) {
      return this.receiveCompression.readMessage(await message);
    }
  }
  compressionFilter$1.CompressionFilter = CompressionFilter;
  class CompressionFilterFactory {
    constructor(channel2, options) {
      this.options = options;
      this.sharedFilterConfig = {};
    }
    createFilter() {
      return new CompressionFilter(this.options, this.sharedFilterConfig);
    }
  }
  compressionFilter$1.CompressionFilterFactory = CompressionFilterFactory;
  return compressionFilter$1;
}
var controlPlaneStatus$1 = {};
var hasRequiredControlPlaneStatus$1;
function requireControlPlaneStatus$1() {
  if (hasRequiredControlPlaneStatus$1) return controlPlaneStatus$1;
  hasRequiredControlPlaneStatus$1 = 1;
  Object.defineProperty(controlPlaneStatus$1, "__esModule", { value: true });
  controlPlaneStatus$1.restrictControlPlaneStatusCode = restrictControlPlaneStatusCode;
  const constants_1 = requireConstants$1();
  const INAPPROPRIATE_CONTROL_PLANE_CODES = [
    constants_1.Status.OK,
    constants_1.Status.INVALID_ARGUMENT,
    constants_1.Status.NOT_FOUND,
    constants_1.Status.ALREADY_EXISTS,
    constants_1.Status.FAILED_PRECONDITION,
    constants_1.Status.ABORTED,
    constants_1.Status.OUT_OF_RANGE,
    constants_1.Status.DATA_LOSS
  ];
  function restrictControlPlaneStatusCode(code, details) {
    if (INAPPROPRIATE_CONTROL_PLANE_CODES.includes(code)) {
      return {
        code: constants_1.Status.INTERNAL,
        details: `Invalid status from control plane: ${code} ${constants_1.Status[code]} ${details}`
      };
    } else {
      return { code, details };
    }
  }
  return controlPlaneStatus$1;
}
var deadline$1 = {};
var hasRequiredDeadline$1;
function requireDeadline$1() {
  if (hasRequiredDeadline$1) return deadline$1;
  hasRequiredDeadline$1 = 1;
  Object.defineProperty(deadline$1, "__esModule", { value: true });
  deadline$1.minDeadline = minDeadline;
  deadline$1.getDeadlineTimeoutString = getDeadlineTimeoutString;
  deadline$1.getRelativeTimeout = getRelativeTimeout;
  deadline$1.deadlineToString = deadlineToString;
  deadline$1.formatDateDifference = formatDateDifference;
  function minDeadline(...deadlineList) {
    let minValue = Infinity;
    for (const deadline2 of deadlineList) {
      const deadlineMsecs = deadline2 instanceof Date ? deadline2.getTime() : deadline2;
      if (deadlineMsecs < minValue) {
        minValue = deadlineMsecs;
      }
    }
    return minValue;
  }
  const units = [
    ["m", 1],
    ["S", 1e3],
    ["M", 60 * 1e3],
    ["H", 60 * 60 * 1e3]
  ];
  function getDeadlineTimeoutString(deadline2) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (deadline2 instanceof Date) {
      deadline2 = deadline2.getTime();
    }
    const timeoutMs = Math.max(deadline2 - now, 0);
    for (const [unit, factor] of units) {
      const amount = timeoutMs / factor;
      if (amount < 1e8) {
        return String(Math.ceil(amount)) + unit;
      }
    }
    throw new Error("Deadline is too far in the future");
  }
  const MAX_TIMEOUT_TIME = 2147483647;
  function getRelativeTimeout(deadline2) {
    const deadlineMs = deadline2 instanceof Date ? deadline2.getTime() : deadline2;
    const now = (/* @__PURE__ */ new Date()).getTime();
    const timeout = deadlineMs - now;
    if (timeout < 0) {
      return 0;
    } else if (timeout > MAX_TIMEOUT_TIME) {
      return Infinity;
    } else {
      return timeout;
    }
  }
  function deadlineToString(deadline2) {
    if (deadline2 instanceof Date) {
      return deadline2.toISOString();
    } else {
      const dateDeadline = new Date(deadline2);
      if (Number.isNaN(dateDeadline.getTime())) {
        return "" + deadline2;
      } else {
        return dateDeadline.toISOString();
      }
    }
  }
  function formatDateDifference(startDate, endDate) {
    return ((endDate.getTime() - startDate.getTime()) / 1e3).toFixed(3) + "s";
  }
  return deadline$1;
}
var filterStack$1 = {};
var hasRequiredFilterStack$1;
function requireFilterStack$1() {
  if (hasRequiredFilterStack$1) return filterStack$1;
  hasRequiredFilterStack$1 = 1;
  Object.defineProperty(filterStack$1, "__esModule", { value: true });
  filterStack$1.FilterStackFactory = filterStack$1.FilterStack = void 0;
  class FilterStack {
    constructor(filters) {
      this.filters = filters;
    }
    sendMetadata(metadata2) {
      let result = metadata2;
      for (let i = 0; i < this.filters.length; i++) {
        result = this.filters[i].sendMetadata(result);
      }
      return result;
    }
    receiveMetadata(metadata2) {
      let result = metadata2;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveMetadata(result);
      }
      return result;
    }
    sendMessage(message) {
      let result = message;
      for (let i = 0; i < this.filters.length; i++) {
        result = this.filters[i].sendMessage(result);
      }
      return result;
    }
    receiveMessage(message) {
      let result = message;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveMessage(result);
      }
      return result;
    }
    receiveTrailers(status) {
      let result = status;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveTrailers(result);
      }
      return result;
    }
    push(filters) {
      this.filters.unshift(...filters);
    }
    getFilters() {
      return this.filters;
    }
  }
  filterStack$1.FilterStack = FilterStack;
  class FilterStackFactory {
    constructor(factories) {
      this.factories = factories;
    }
    push(filterFactories) {
      this.factories.unshift(...filterFactories);
    }
    clone() {
      return new FilterStackFactory([...this.factories]);
    }
    createFilter() {
      return new FilterStack(this.factories.map((factory) => factory.createFilter()));
    }
  }
  filterStack$1.FilterStackFactory = FilterStackFactory;
  return filterStack$1;
}
var hasRequiredSingleSubchannelChannel;
function requireSingleSubchannelChannel() {
  if (hasRequiredSingleSubchannelChannel) return singleSubchannelChannel;
  hasRequiredSingleSubchannelChannel = 1;
  Object.defineProperty(singleSubchannelChannel, "__esModule", { value: true });
  singleSubchannelChannel.SingleSubchannelChannel = void 0;
  const call_number_1 = requireCallNumber$1();
  const channelz_1 = requireChannelz$1();
  const compression_filter_1 = requireCompressionFilter$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const control_plane_status_1 = requireControlPlaneStatus$1();
  const deadline_1 = requireDeadline$1();
  const filter_stack_1 = requireFilterStack$1();
  const metadata_1 = requireMetadata$1();
  const resolver_1 = requireResolver$1();
  const uri_parser_1 = requireUriParser$1();
  class SubchannelCallWrapper {
    constructor(subchannel2, method, filterStackFactory, options, callNumber2) {
      var _a, _b;
      this.subchannel = subchannel2;
      this.method = method;
      this.options = options;
      this.callNumber = callNumber2;
      this.childCall = null;
      this.pendingMessage = null;
      this.readPending = false;
      this.halfClosePending = false;
      this.pendingStatus = null;
      this.readFilterPending = false;
      this.writeFilterPending = false;
      const splitPath = this.method.split("/");
      let serviceName = "";
      if (splitPath.length >= 2) {
        serviceName = splitPath[1];
      }
      const hostname = (_b = (_a = (0, uri_parser_1.splitHostPort)(this.options.host)) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : "localhost";
      this.serviceUrl = `https://${hostname}/${serviceName}`;
      const timeout = (0, deadline_1.getRelativeTimeout)(options.deadline);
      if (timeout !== Infinity) {
        if (timeout <= 0) {
          this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
        } else {
          setTimeout(() => {
            this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
          }, timeout);
        }
      }
      this.filterStack = filterStackFactory.createFilter();
    }
    cancelWithStatus(status, details) {
      if (this.childCall) {
        this.childCall.cancelWithStatus(status, details);
      } else {
        this.pendingStatus = {
          code: status,
          details,
          metadata: new metadata_1.Metadata()
        };
      }
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.childCall) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.subchannel.getAddress();
    }
    async start(metadata2, listener) {
      if (this.pendingStatus) {
        listener.onReceiveStatus(this.pendingStatus);
        return;
      }
      if (this.subchannel.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
        listener.onReceiveStatus({
          code: constants_1.Status.UNAVAILABLE,
          details: "Subchannel not ready",
          metadata: new metadata_1.Metadata()
        });
        return;
      }
      const filteredMetadata = await this.filterStack.sendMetadata(Promise.resolve(metadata2));
      let credsMetadata;
      try {
        credsMetadata = await this.subchannel.getCallCredentials().generateMetadata({ method_name: this.method, service_url: this.serviceUrl });
      } catch (e) {
        const error2 = e;
        const { code, details } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(typeof error2.code === "number" ? error2.code : constants_1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${error2.message}`);
        listener.onReceiveStatus({
          code,
          details,
          metadata: new metadata_1.Metadata()
        });
        return;
      }
      credsMetadata.merge(filteredMetadata);
      const childListener = {
        onReceiveMetadata: async (metadata3) => {
          listener.onReceiveMetadata(await this.filterStack.receiveMetadata(metadata3));
        },
        onReceiveMessage: async (message) => {
          this.readFilterPending = true;
          const filteredMessage = await this.filterStack.receiveMessage(message);
          this.readFilterPending = false;
          listener.onReceiveMessage(filteredMessage);
          if (this.pendingStatus) {
            listener.onReceiveStatus(this.pendingStatus);
          }
        },
        onReceiveStatus: async (status) => {
          const filteredStatus = await this.filterStack.receiveTrailers(status);
          if (this.readFilterPending) {
            this.pendingStatus = filteredStatus;
          } else {
            listener.onReceiveStatus(filteredStatus);
          }
        }
      };
      this.childCall = this.subchannel.createCall(credsMetadata, this.options.host, this.method, childListener);
      if (this.readPending) {
        this.childCall.startRead();
      }
      if (this.pendingMessage) {
        this.childCall.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
      }
      if (this.halfClosePending && !this.writeFilterPending) {
        this.childCall.halfClose();
      }
    }
    async sendMessageWithContext(context, message) {
      this.writeFilterPending = true;
      const filteredMessage = await this.filterStack.sendMessage(Promise.resolve({ message, flags: context.flags }));
      this.writeFilterPending = false;
      if (this.childCall) {
        this.childCall.sendMessageWithContext(context, filteredMessage.message);
        if (this.halfClosePending) {
          this.childCall.halfClose();
        }
      } else {
        this.pendingMessage = { context, message: filteredMessage.message };
      }
    }
    startRead() {
      if (this.childCall) {
        this.childCall.startRead();
      } else {
        this.readPending = true;
      }
    }
    halfClose() {
      if (this.childCall && !this.writeFilterPending) {
        this.childCall.halfClose();
      } else {
        this.halfClosePending = true;
      }
    }
    getCallNumber() {
      return this.callNumber;
    }
    setCredentials(credentials) {
      throw new Error("Method not implemented.");
    }
    getAuthContext() {
      if (this.childCall) {
        return this.childCall.getAuthContext();
      } else {
        return null;
      }
    }
  }
  class SingleSubchannelChannel {
    constructor(subchannel2, target, options) {
      this.subchannel = subchannel2;
      this.target = target;
      this.channelzEnabled = false;
      this.channelzTrace = new channelz_1.ChannelzTrace();
      this.callTracker = new channelz_1.ChannelzCallTracker();
      this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
      this.channelzEnabled = options["grpc.enable_channelz"] !== 0;
      this.channelzRef = (0, channelz_1.registerChannelzChannel)((0, uri_parser_1.uriToString)(target), () => ({
        target: `${(0, uri_parser_1.uriToString)(target)} (${subchannel2.getAddress()})`,
        state: this.subchannel.getConnectivityState(),
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        children: this.childrenTracker.getChildLists()
      }), this.channelzEnabled);
      if (this.channelzEnabled) {
        this.childrenTracker.refChild(subchannel2.getChannelzRef());
      }
      this.filterStackFactory = new filter_stack_1.FilterStackFactory([new compression_filter_1.CompressionFilterFactory(this, options)]);
    }
    close() {
      if (this.channelzEnabled) {
        this.childrenTracker.unrefChild(this.subchannel.getChannelzRef());
      }
      (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
    }
    getTarget() {
      return (0, uri_parser_1.uriToString)(this.target);
    }
    getConnectivityState(tryToConnect) {
      throw new Error("Method not implemented.");
    }
    watchConnectivityState(currentState, deadline2, callback) {
      throw new Error("Method not implemented.");
    }
    getChannelzRef() {
      return this.channelzRef;
    }
    createCall(method, deadline2) {
      const callOptions = {
        deadline: deadline2,
        host: (0, resolver_1.getDefaultAuthority)(this.target),
        flags: constants_1.Propagate.DEFAULTS,
        parentCall: null
      };
      return new SubchannelCallWrapper(this.subchannel, method, this.filterStackFactory, callOptions, (0, call_number_1.getNextCallNumber)());
    }
  }
  singleSubchannelChannel.SingleSubchannelChannel = SingleSubchannelChannel;
  return singleSubchannelChannel;
}
var hasRequiredSubchannel$1;
function requireSubchannel$1() {
  if (hasRequiredSubchannel$1) return subchannel$1;
  hasRequiredSubchannel$1 = 1;
  Object.defineProperty(subchannel$1, "__esModule", { value: true });
  subchannel$1.Subchannel = void 0;
  const connectivity_state_1 = requireConnectivityState$1();
  const backoff_timeout_1 = requireBackoffTimeout$1();
  const logging2 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const uri_parser_1 = requireUriParser$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const channelz_1 = requireChannelz$1();
  const single_subchannel_channel_1 = requireSingleSubchannelChannel();
  const TRACER_NAME = "subchannel";
  const KEEPALIVE_MAX_TIME_MS = 2147483647;
  class Subchannel {
    /**
     * A class representing a connection to a single backend.
     * @param channelTarget The target string for the channel as a whole
     * @param subchannelAddress The address for the backend that this subchannel
     *     will connect to
     * @param options The channel options, plus any specific subchannel options
     *     for this subchannel
     * @param credentials The channel credentials used to establish this
     *     connection
     */
    constructor(channelTarget, subchannelAddress2, options, credentials, connector) {
      var _a;
      this.channelTarget = channelTarget;
      this.subchannelAddress = subchannelAddress2;
      this.options = options;
      this.connector = connector;
      this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
      this.transport = null;
      this.continueConnecting = false;
      this.stateListeners = /* @__PURE__ */ new Set();
      this.refcount = 0;
      this.channelzEnabled = true;
      this.dataProducers = /* @__PURE__ */ new Map();
      this.subchannelChannel = null;
      const backoffOptions = {
        initialDelay: options["grpc.initial_reconnect_backoff_ms"],
        maxDelay: options["grpc.max_reconnect_backoff_ms"]
      };
      this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(() => {
        this.handleBackoffTimer();
      }, backoffOptions);
      this.backoffTimeout.unref();
      this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress2);
      this.keepaliveTime = (_a = options["grpc.keepalive_time_ms"]) !== null && _a !== void 0 ? _a : -1;
      if (options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
        this.channelzTrace = new channelz_1.ChannelzTraceStub();
        this.callTracker = new channelz_1.ChannelzCallTrackerStub();
        this.childrenTracker = new channelz_1.ChannelzChildrenTrackerStub();
        this.streamTracker = new channelz_1.ChannelzCallTrackerStub();
      } else {
        this.channelzTrace = new channelz_1.ChannelzTrace();
        this.callTracker = new channelz_1.ChannelzCallTracker();
        this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
        this.streamTracker = new channelz_1.ChannelzCallTracker();
      }
      this.channelzRef = (0, channelz_1.registerChannelzSubchannel)(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled);
      this.channelzTrace.addTrace("CT_INFO", "Subchannel created");
      this.trace("Subchannel constructed with options " + JSON.stringify(options, void 0, 2));
      this.secureConnector = credentials._createSecureConnector(channelTarget, options);
    }
    getChannelzInfo() {
      return {
        state: this.connectivityState,
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        children: this.childrenTracker.getChildLists(),
        target: this.subchannelAddressString
      };
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    refTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "subchannel_refcount", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    handleBackoffTimer() {
      if (this.continueConnecting) {
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.CONNECTING);
      } else {
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.IDLE);
      }
    }
    /**
     * Start a backoff timer with the current nextBackoff timeout
     */
    startBackoff() {
      this.backoffTimeout.runOnce();
    }
    stopBackoff() {
      this.backoffTimeout.stop();
      this.backoffTimeout.reset();
    }
    startConnectingInternal() {
      let options = this.options;
      if (options["grpc.keepalive_time_ms"]) {
        const adjustedKeepaliveTime = Math.min(this.keepaliveTime, KEEPALIVE_MAX_TIME_MS);
        options = Object.assign(Object.assign({}, options), { "grpc.keepalive_time_ms": adjustedKeepaliveTime });
      }
      this.connector.connect(this.subchannelAddress, this.secureConnector, options).then((transport2) => {
        if (this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING], connectivity_state_1.ConnectivityState.READY)) {
          this.transport = transport2;
          if (this.channelzEnabled) {
            this.childrenTracker.refChild(transport2.getChannelzRef());
          }
          transport2.addDisconnectListener((tooManyPings) => {
            this.transitionToState([connectivity_state_1.ConnectivityState.READY], connectivity_state_1.ConnectivityState.IDLE);
            if (tooManyPings && this.keepaliveTime > 0) {
              this.keepaliveTime *= 2;
              logging2.log(constants_1.LogVerbosity.ERROR, `Connection to ${(0, uri_parser_1.uriToString)(this.channelTarget)} at ${this.subchannelAddressString} rejected by server because of excess pings. Increasing ping interval to ${this.keepaliveTime} ms`);
            }
          });
        } else {
          transport2.shutdown();
        }
      }, (error2) => {
        this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING], connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, `${error2}`);
      });
    }
    /**
     * Initiate a state transition from any element of oldStates to the new
     * state. If the current connectivityState is not in oldStates, do nothing.
     * @param oldStates The set of states to transition from
     * @param newState The state to transition to
     * @returns True if the state changed, false otherwise
     */
    transitionToState(oldStates, newState, errorMessage) {
      var _a, _b;
      if (oldStates.indexOf(this.connectivityState) === -1) {
        return false;
      }
      if (errorMessage) {
        this.trace(connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState] + ' with error "' + errorMessage + '"');
      } else {
        this.trace(connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      }
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Connectivity state change to " + connectivity_state_1.ConnectivityState[newState]);
      }
      const previousState = this.connectivityState;
      this.connectivityState = newState;
      switch (newState) {
        case connectivity_state_1.ConnectivityState.READY:
          this.stopBackoff();
          break;
        case connectivity_state_1.ConnectivityState.CONNECTING:
          this.startBackoff();
          this.startConnectingInternal();
          this.continueConnecting = false;
          break;
        case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
          if (this.channelzEnabled && this.transport) {
            this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          }
          (_a = this.transport) === null || _a === void 0 ? void 0 : _a.shutdown();
          this.transport = null;
          if (!this.backoffTimeout.isRunning()) {
            process.nextTick(() => {
              this.handleBackoffTimer();
            });
          }
          break;
        case connectivity_state_1.ConnectivityState.IDLE:
          if (this.channelzEnabled && this.transport) {
            this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          }
          (_b = this.transport) === null || _b === void 0 ? void 0 : _b.shutdown();
          this.transport = null;
          break;
        default:
          throw new Error(`Invalid state: unknown ConnectivityState ${newState}`);
      }
      for (const listener of this.stateListeners) {
        listener(this, previousState, newState, this.keepaliveTime, errorMessage);
      }
      return true;
    }
    ref() {
      this.refTrace("refcount " + this.refcount + " -> " + (this.refcount + 1));
      this.refcount += 1;
    }
    unref() {
      this.refTrace("refcount " + this.refcount + " -> " + (this.refcount - 1));
      this.refcount -= 1;
      if (this.refcount === 0) {
        this.channelzTrace.addTrace("CT_INFO", "Shutting down");
        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        this.secureConnector.destroy();
        process.nextTick(() => {
          this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING, connectivity_state_1.ConnectivityState.READY], connectivity_state_1.ConnectivityState.IDLE);
        });
      }
    }
    unrefIfOneRef() {
      if (this.refcount === 1) {
        this.unref();
        return true;
      }
      return false;
    }
    createCall(metadata2, host, method, listener) {
      if (!this.transport) {
        throw new Error("Cannot create call, subchannel not READY");
      }
      let statsTracker;
      if (this.channelzEnabled) {
        this.callTracker.addCallStarted();
        this.streamTracker.addCallStarted();
        statsTracker = {
          onCallEnd: (status) => {
            if (status.code === constants_1.Status.OK) {
              this.callTracker.addCallSucceeded();
            } else {
              this.callTracker.addCallFailed();
            }
          }
        };
      } else {
        statsTracker = {};
      }
      return this.transport.createCall(metadata2, host, method, listener, statsTracker);
    }
    /**
     * If the subchannel is currently IDLE, start connecting and switch to the
     * CONNECTING state. If the subchannel is current in TRANSIENT_FAILURE,
     * the next time it would transition to IDLE, start connecting again instead.
     * Otherwise, do nothing.
     */
    startConnecting() {
      process.nextTick(() => {
        if (!this.transitionToState([connectivity_state_1.ConnectivityState.IDLE], connectivity_state_1.ConnectivityState.CONNECTING)) {
          if (this.connectivityState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            this.continueConnecting = true;
          }
        }
      });
    }
    /**
     * Get the subchannel's current connectivity state.
     */
    getConnectivityState() {
      return this.connectivityState;
    }
    /**
     * Add a listener function to be called whenever the subchannel's
     * connectivity state changes.
     * @param listener
     */
    addConnectivityStateListener(listener) {
      this.stateListeners.add(listener);
    }
    /**
     * Remove a listener previously added with `addConnectivityStateListener`
     * @param listener A reference to a function previously passed to
     *     `addConnectivityStateListener`
     */
    removeConnectivityStateListener(listener) {
      this.stateListeners.delete(listener);
    }
    /**
     * Reset the backoff timeout, and immediately start connecting if in backoff.
     */
    resetBackoff() {
      process.nextTick(() => {
        this.backoffTimeout.reset();
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.CONNECTING);
      });
    }
    getAddress() {
      return this.subchannelAddressString;
    }
    getChannelzRef() {
      return this.channelzRef;
    }
    isHealthy() {
      return true;
    }
    addHealthStateWatcher(listener) {
    }
    removeHealthStateWatcher(listener) {
    }
    getRealSubchannel() {
      return this;
    }
    realSubchannelEquals(other) {
      return other.getRealSubchannel() === this;
    }
    throttleKeepalive(newKeepaliveTime) {
      if (newKeepaliveTime > this.keepaliveTime) {
        this.keepaliveTime = newKeepaliveTime;
      }
    }
    getCallCredentials() {
      return this.secureConnector.getCallCredentials();
    }
    getChannel() {
      if (!this.subchannelChannel) {
        this.subchannelChannel = new single_subchannel_channel_1.SingleSubchannelChannel(this, this.channelTarget, this.options);
      }
      return this.subchannelChannel;
    }
    addDataWatcher(dataWatcher) {
      throw new Error("Not implemented");
    }
    getOrCreateDataProducer(name, createDataProducer) {
      const existingProducer = this.dataProducers.get(name);
      if (existingProducer) {
        return existingProducer;
      }
      const newProducer = createDataProducer(this);
      this.dataProducers.set(name, newProducer);
      return newProducer;
    }
    removeDataProducer(name) {
      this.dataProducers.delete(name);
    }
  }
  subchannel$1.Subchannel = Subchannel;
  return subchannel$1;
}
var transport$1 = {};
var http_proxy$1 = {};
var resolverDns$1 = {};
var environment = {};
var hasRequiredEnvironment;
function requireEnvironment() {
  if (hasRequiredEnvironment) return environment;
  hasRequiredEnvironment = 1;
  var _a;
  Object.defineProperty(environment, "__esModule", { value: true });
  environment.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = void 0;
  environment.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = ((_a = process.env.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) !== null && _a !== void 0 ? _a : "false") === "true";
  return environment;
}
var hasRequiredResolverDns$1;
function requireResolverDns$1() {
  if (hasRequiredResolverDns$1) return resolverDns$1;
  hasRequiredResolverDns$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_PORT = void 0;
    exports.setup = setup;
    const resolver_1 = requireResolver$1();
    const dns_1 = require$$1$4;
    const service_config_1 = requireServiceConfig$1();
    const constants_1 = requireConstants$1();
    const call_interface_1 = requireCallInterface$1();
    const metadata_1 = requireMetadata$1();
    const logging2 = requireLogging$1();
    const constants_2 = requireConstants$1();
    const uri_parser_1 = requireUriParser$1();
    const net_1 = require$$0$1;
    const backoff_timeout_1 = requireBackoffTimeout$1();
    const environment_1 = requireEnvironment();
    const TRACER_NAME = "dns_resolver";
    function trace(text) {
      logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
    }
    exports.DEFAULT_PORT = 443;
    const DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS = 3e4;
    class DnsResolver {
      constructor(target, listener, channelOptions2) {
        var _a, _b, _c;
        this.target = target;
        this.listener = listener;
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfigResult = null;
        this.continueResolving = false;
        this.isNextResolutionTimerRunning = false;
        this.isServiceConfigEnabled = true;
        this.returnedIpResult = false;
        this.alternativeResolver = new dns_1.promises.Resolver();
        trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
        if (target.authority) {
          this.alternativeResolver.setServers([target.authority]);
        }
        const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
        if (hostPort === null) {
          this.ipResult = null;
          this.dnsHostname = null;
          this.port = null;
        } else {
          if ((0, net_1.isIPv4)(hostPort.host) || (0, net_1.isIPv6)(hostPort.host)) {
            this.ipResult = [
              {
                addresses: [
                  {
                    host: hostPort.host,
                    port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : exports.DEFAULT_PORT
                  }
                ]
              }
            ];
            this.dnsHostname = null;
            this.port = null;
          } else {
            this.ipResult = null;
            this.dnsHostname = hostPort.host;
            this.port = (_b = hostPort.port) !== null && _b !== void 0 ? _b : exports.DEFAULT_PORT;
          }
        }
        this.percentage = Math.random() * 100;
        if (channelOptions2["grpc.service_config_disable_resolution"] === 1) {
          this.isServiceConfigEnabled = false;
        }
        this.defaultResolutionError = {
          code: constants_1.Status.UNAVAILABLE,
          details: `Name resolution failed for target ${(0, uri_parser_1.uriToString)(this.target)}`,
          metadata: new metadata_1.Metadata()
        };
        const backoffOptions = {
          initialDelay: channelOptions2["grpc.initial_reconnect_backoff_ms"],
          maxDelay: channelOptions2["grpc.max_reconnect_backoff_ms"]
        };
        this.backoff = new backoff_timeout_1.BackoffTimeout(() => {
          if (this.continueResolving) {
            this.startResolutionWithBackoff();
          }
        }, backoffOptions);
        this.backoff.unref();
        this.minTimeBetweenResolutionsMs = (_c = channelOptions2["grpc.dns_min_time_between_resolutions_ms"]) !== null && _c !== void 0 ? _c : DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS;
        this.nextResolutionTimer = setTimeout(() => {
        }, 0);
        clearTimeout(this.nextResolutionTimer);
      }
      /**
       * If the target is an IP address, just provide that address as a result.
       * Otherwise, initiate A, AAAA, and TXT lookups
       */
      startResolution() {
        if (this.ipResult !== null) {
          if (!this.returnedIpResult) {
            trace("Returning IP address for target " + (0, uri_parser_1.uriToString)(this.target));
            setImmediate(() => {
              this.listener((0, call_interface_1.statusOrFromValue)(this.ipResult), {}, null, "");
            });
            this.returnedIpResult = true;
          }
          this.backoff.stop();
          this.backoff.reset();
          this.stopNextResolutionTimer();
          return;
        }
        if (this.dnsHostname === null) {
          trace("Failed to parse DNS address " + (0, uri_parser_1.uriToString)(this.target));
          setImmediate(() => {
            this.listener((0, call_interface_1.statusOrFromError)({
              code: constants_1.Status.UNAVAILABLE,
              details: `Failed to parse DNS address ${(0, uri_parser_1.uriToString)(this.target)}`
            }), {}, null, "");
          });
          this.stopNextResolutionTimer();
        } else {
          if (this.pendingLookupPromise !== null) {
            return;
          }
          trace("Looking up DNS hostname " + this.dnsHostname);
          this.latestLookupResult = null;
          const hostname = this.dnsHostname;
          this.pendingLookupPromise = this.lookup(hostname);
          this.pendingLookupPromise.then((addressList) => {
            if (this.pendingLookupPromise === null) {
              return;
            }
            this.pendingLookupPromise = null;
            this.latestLookupResult = (0, call_interface_1.statusOrFromValue)(addressList.map((address) => ({
              addresses: [address]
            })));
            const allAddressesString = "[" + addressList.map((addr) => addr.host + ":" + addr.port).join(",") + "]";
            trace("Resolved addresses for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + allAddressesString);
            const healthStatus = this.listener(this.latestLookupResult, {}, this.latestServiceConfigResult, "");
            this.handleHealthStatus(healthStatus);
          }, (err) => {
            if (this.pendingLookupPromise === null) {
              return;
            }
            trace("Resolution error for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + err.message);
            this.pendingLookupPromise = null;
            this.stopNextResolutionTimer();
            this.listener((0, call_interface_1.statusOrFromError)(this.defaultResolutionError), {}, this.latestServiceConfigResult, "");
          });
          if (this.isServiceConfigEnabled && this.pendingTxtPromise === null) {
            this.pendingTxtPromise = this.resolveTxt(hostname);
            this.pendingTxtPromise.then((txtRecord) => {
              if (this.pendingTxtPromise === null) {
                return;
              }
              this.pendingTxtPromise = null;
              let serviceConfig2;
              try {
                serviceConfig2 = (0, service_config_1.extractAndSelectServiceConfig)(txtRecord, this.percentage);
                if (serviceConfig2) {
                  this.latestServiceConfigResult = (0, call_interface_1.statusOrFromValue)(serviceConfig2);
                } else {
                  this.latestServiceConfigResult = null;
                }
              } catch (err) {
                this.latestServiceConfigResult = (0, call_interface_1.statusOrFromError)({
                  code: constants_1.Status.UNAVAILABLE,
                  details: `Parsing service config failed with error ${err.message}`
                });
              }
              if (this.latestLookupResult !== null) {
                this.listener(this.latestLookupResult, {}, this.latestServiceConfigResult, "");
              }
            }, (err) => {
            });
          }
        }
      }
      /**
       * The ResolverListener returns a boolean indicating whether the LB policy
       * accepted the resolution result. A false result on an otherwise successful
       * resolution should be treated as a resolution failure.
       * @param healthStatus
       */
      handleHealthStatus(healthStatus) {
        if (healthStatus) {
          this.backoff.stop();
          this.backoff.reset();
        } else {
          this.continueResolving = true;
        }
      }
      async lookup(hostname) {
        if (environment_1.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) {
          trace("Using alternative DNS resolver.");
          const records = await Promise.allSettled([
            this.alternativeResolver.resolve4(hostname),
            this.alternativeResolver.resolve6(hostname)
          ]);
          if (records.every((result) => result.status === "rejected")) {
            throw new Error(records[0].reason);
          }
          return records.reduce((acc, result) => {
            return result.status === "fulfilled" ? [...acc, ...result.value] : acc;
          }, []).map((addr) => ({
            host: addr,
            port: +this.port
          }));
        }
        const addressList = await dns_1.promises.lookup(hostname, { all: true });
        return addressList.map((addr) => ({ host: addr.address, port: +this.port }));
      }
      async resolveTxt(hostname) {
        if (environment_1.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) {
          trace("Using alternative DNS resolver.");
          return this.alternativeResolver.resolveTxt(hostname);
        }
        return dns_1.promises.resolveTxt(hostname);
      }
      startNextResolutionTimer() {
        var _a, _b;
        clearTimeout(this.nextResolutionTimer);
        this.nextResolutionTimer = setTimeout(() => {
          this.stopNextResolutionTimer();
          if (this.continueResolving) {
            this.startResolutionWithBackoff();
          }
        }, this.minTimeBetweenResolutionsMs);
        (_b = (_a = this.nextResolutionTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.isNextResolutionTimerRunning = true;
      }
      stopNextResolutionTimer() {
        clearTimeout(this.nextResolutionTimer);
        this.isNextResolutionTimerRunning = false;
      }
      startResolutionWithBackoff() {
        if (this.pendingLookupPromise === null) {
          this.continueResolving = false;
          this.backoff.runOnce();
          this.startNextResolutionTimer();
          this.startResolution();
        }
      }
      updateResolution() {
        if (this.pendingLookupPromise === null) {
          if (this.isNextResolutionTimerRunning || this.backoff.isRunning()) {
            if (this.isNextResolutionTimerRunning) {
              trace('resolution update delayed by "min time between resolutions" rate limit');
            } else {
              trace("resolution update delayed by backoff timer until " + this.backoff.getEndTime().toISOString());
            }
            this.continueResolving = true;
          } else {
            this.startResolutionWithBackoff();
          }
        }
      }
      /**
       * Reset the resolver to the same state it had when it was created. In-flight
       * DNS requests cannot be cancelled, but they are discarded and their results
       * will be ignored.
       */
      destroy() {
        this.continueResolving = false;
        this.backoff.reset();
        this.backoff.stop();
        this.stopNextResolutionTimer();
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfigResult = null;
        this.returnedIpResult = false;
      }
      /**
       * Get the default authority for the given target. For IP targets, that is
       * the IP address. For DNS targets, it is the hostname.
       * @param target
       */
      static getDefaultAuthority(target) {
        return target.path;
      }
    }
    function setup() {
      (0, resolver_1.registerResolver)("dns", DnsResolver);
      (0, resolver_1.registerDefaultScheme)("dns");
    }
  })(resolverDns$1);
  return resolverDns$1;
}
var hasRequiredHttp_proxy$1;
function requireHttp_proxy$1() {
  if (hasRequiredHttp_proxy$1) return http_proxy$1;
  hasRequiredHttp_proxy$1 = 1;
  Object.defineProperty(http_proxy$1, "__esModule", { value: true });
  http_proxy$1.parseCIDR = parseCIDR;
  http_proxy$1.mapProxyName = mapProxyName;
  http_proxy$1.getProxiedConnection = getProxiedConnection;
  const logging_1 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const net_1 = require$$0$1;
  const http = require$$0$4;
  const logging2 = requireLogging$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const uri_parser_1 = requireUriParser$1();
  const url_1 = Url;
  const resolver_dns_1 = requireResolverDns$1();
  const TRACER_NAME = "proxy";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  function getProxyInfo() {
    let proxyEnv = "";
    let envVar = "";
    if (process.env.grpc_proxy) {
      envVar = "grpc_proxy";
      proxyEnv = process.env.grpc_proxy;
    } else if (process.env.https_proxy) {
      envVar = "https_proxy";
      proxyEnv = process.env.https_proxy;
    } else if (process.env.http_proxy) {
      envVar = "http_proxy";
      proxyEnv = process.env.http_proxy;
    } else {
      return {};
    }
    let proxyUrl;
    try {
      proxyUrl = new url_1.URL(proxyEnv);
    } catch (e) {
      (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `cannot parse value of "${envVar}" env var`);
      return {};
    }
    if (proxyUrl.protocol !== "http:") {
      (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `"${proxyUrl.protocol}" scheme not supported in proxy URI`);
      return {};
    }
    let userCred = null;
    if (proxyUrl.username) {
      if (proxyUrl.password) {
        (0, logging_1.log)(constants_1.LogVerbosity.INFO, "userinfo found in proxy URI");
        userCred = decodeURIComponent(`${proxyUrl.username}:${proxyUrl.password}`);
      } else {
        userCred = proxyUrl.username;
      }
    }
    const hostname = proxyUrl.hostname;
    let port = proxyUrl.port;
    if (port === "") {
      port = "80";
    }
    const result = {
      address: `${hostname}:${port}`
    };
    if (userCred) {
      result.creds = userCred;
    }
    trace("Proxy server " + result.address + " set by environment variable " + envVar);
    return result;
  }
  function getNoProxyHostList() {
    let noProxyStr = process.env.no_grpc_proxy;
    let envVar = "no_grpc_proxy";
    if (!noProxyStr) {
      noProxyStr = process.env.no_proxy;
      envVar = "no_proxy";
    }
    if (noProxyStr) {
      trace("No proxy server list set by environment variable " + envVar);
      return noProxyStr.split(",");
    } else {
      return [];
    }
  }
  function parseCIDR(cidrString) {
    const splitRange = cidrString.split("/");
    if (splitRange.length !== 2) {
      return null;
    }
    const prefixLength = parseInt(splitRange[1], 10);
    if (!(0, net_1.isIPv4)(splitRange[0]) || Number.isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) {
      return null;
    }
    return {
      ip: ipToInt(splitRange[0]),
      prefixLength
    };
  }
  function ipToInt(ip) {
    return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  }
  function isIpInCIDR(cidr, serverHost) {
    const ip = cidr.ip;
    const mask = -1 << 32 - cidr.prefixLength;
    const hostIP = ipToInt(serverHost);
    return (hostIP & mask) === (ip & mask);
  }
  function hostMatchesNoProxyList(serverHost) {
    for (const host of getNoProxyHostList()) {
      const parsedCIDR = parseCIDR(host);
      if ((0, net_1.isIPv4)(serverHost) && parsedCIDR && isIpInCIDR(parsedCIDR, serverHost)) {
        return true;
      } else if (serverHost.endsWith(host)) {
        return true;
      }
    }
    return false;
  }
  function mapProxyName(target, options) {
    var _a;
    const noProxyResult = {
      target,
      extraOptions: {}
    };
    if (((_a = options["grpc.enable_http_proxy"]) !== null && _a !== void 0 ? _a : 1) === 0) {
      return noProxyResult;
    }
    if (target.scheme === "unix") {
      return noProxyResult;
    }
    const proxyInfo = getProxyInfo();
    if (!proxyInfo.address) {
      return noProxyResult;
    }
    const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
    if (!hostPort) {
      return noProxyResult;
    }
    const serverHost = hostPort.host;
    if (hostMatchesNoProxyList(serverHost)) {
      trace("Not using proxy for target in no_proxy list: " + (0, uri_parser_1.uriToString)(target));
      return noProxyResult;
    }
    const extraOptions = {
      "grpc.http_connect_target": (0, uri_parser_1.uriToString)(target)
    };
    if (proxyInfo.creds) {
      extraOptions["grpc.http_connect_creds"] = proxyInfo.creds;
    }
    return {
      target: {
        scheme: "dns",
        path: proxyInfo.address
      },
      extraOptions
    };
  }
  function getProxiedConnection(address, channelOptions2) {
    var _a;
    if (!("grpc.http_connect_target" in channelOptions2)) {
      return Promise.resolve(null);
    }
    const realTarget = channelOptions2["grpc.http_connect_target"];
    const parsedTarget = (0, uri_parser_1.parseUri)(realTarget);
    if (parsedTarget === null) {
      return Promise.resolve(null);
    }
    const splitHostPost = (0, uri_parser_1.splitHostPort)(parsedTarget.path);
    if (splitHostPost === null) {
      return Promise.resolve(null);
    }
    const hostPort = `${splitHostPost.host}:${(_a = splitHostPost.port) !== null && _a !== void 0 ? _a : resolver_dns_1.DEFAULT_PORT}`;
    const options = {
      method: "CONNECT",
      path: hostPort
    };
    const headers = {
      Host: hostPort
    };
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(address)) {
      options.host = address.host;
      options.port = address.port;
    } else {
      options.socketPath = address.path;
    }
    if ("grpc.http_connect_creds" in channelOptions2) {
      headers["Proxy-Authorization"] = "Basic " + Buffer.from(channelOptions2["grpc.http_connect_creds"]).toString("base64");
    }
    options.headers = headers;
    const proxyAddressString = (0, subchannel_address_1.subchannelAddressToString)(address);
    trace("Using proxy " + proxyAddressString + " to connect to " + options.path);
    return new Promise((resolve, reject) => {
      const request = http.request(options);
      request.once("connect", (res, socket, head) => {
        request.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode === 200) {
          trace("Successfully connected to " + options.path + " through proxy " + proxyAddressString);
          if (head.length > 0) {
            socket.unshift(head);
          }
          trace("Successfully established a plaintext connection to " + options.path + " through proxy " + proxyAddressString);
          resolve(socket);
        } else {
          (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to " + options.path + " through proxy " + proxyAddressString + " with status " + res.statusCode);
          reject();
        }
      });
      request.once("error", (err) => {
        request.removeAllListeners();
        (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to proxy " + proxyAddressString + " with error " + err.message);
        reject();
      });
      request.end();
    });
  }
  return http_proxy$1;
}
var subchannelCall$1 = {};
var streamDecoder$1 = {};
var hasRequiredStreamDecoder$1;
function requireStreamDecoder$1() {
  if (hasRequiredStreamDecoder$1) return streamDecoder$1;
  hasRequiredStreamDecoder$1 = 1;
  Object.defineProperty(streamDecoder$1, "__esModule", { value: true });
  streamDecoder$1.StreamDecoder = void 0;
  var ReadState;
  (function(ReadState2) {
    ReadState2[ReadState2["NO_DATA"] = 0] = "NO_DATA";
    ReadState2[ReadState2["READING_SIZE"] = 1] = "READING_SIZE";
    ReadState2[ReadState2["READING_MESSAGE"] = 2] = "READING_MESSAGE";
  })(ReadState || (ReadState = {}));
  class StreamDecoder {
    constructor(maxReadMessageLength) {
      this.maxReadMessageLength = maxReadMessageLength;
      this.readState = ReadState.NO_DATA;
      this.readCompressFlag = Buffer.alloc(1);
      this.readPartialSize = Buffer.alloc(4);
      this.readSizeRemaining = 4;
      this.readMessageSize = 0;
      this.readPartialMessage = [];
      this.readMessageRemaining = 0;
    }
    write(data) {
      let readHead = 0;
      let toRead;
      const result = [];
      while (readHead < data.length) {
        switch (this.readState) {
          case ReadState.NO_DATA:
            this.readCompressFlag = data.slice(readHead, readHead + 1);
            readHead += 1;
            this.readState = ReadState.READING_SIZE;
            this.readPartialSize.fill(0);
            this.readSizeRemaining = 4;
            this.readMessageSize = 0;
            this.readMessageRemaining = 0;
            this.readPartialMessage = [];
            break;
          case ReadState.READING_SIZE:
            toRead = Math.min(data.length - readHead, this.readSizeRemaining);
            data.copy(this.readPartialSize, 4 - this.readSizeRemaining, readHead, readHead + toRead);
            this.readSizeRemaining -= toRead;
            readHead += toRead;
            if (this.readSizeRemaining === 0) {
              this.readMessageSize = this.readPartialSize.readUInt32BE(0);
              if (this.maxReadMessageLength !== -1 && this.readMessageSize > this.maxReadMessageLength) {
                throw new Error(`Received message larger than max (${this.readMessageSize} vs ${this.maxReadMessageLength})`);
              }
              this.readMessageRemaining = this.readMessageSize;
              if (this.readMessageRemaining > 0) {
                this.readState = ReadState.READING_MESSAGE;
              } else {
                const message = Buffer.concat([this.readCompressFlag, this.readPartialSize], 5);
                this.readState = ReadState.NO_DATA;
                result.push(message);
              }
            }
            break;
          case ReadState.READING_MESSAGE:
            toRead = Math.min(data.length - readHead, this.readMessageRemaining);
            this.readPartialMessage.push(data.slice(readHead, readHead + toRead));
            this.readMessageRemaining -= toRead;
            readHead += toRead;
            if (this.readMessageRemaining === 0) {
              const framedMessageBuffers = [
                this.readCompressFlag,
                this.readPartialSize
              ].concat(this.readPartialMessage);
              const framedMessage = Buffer.concat(framedMessageBuffers, this.readMessageSize + 5);
              this.readState = ReadState.NO_DATA;
              result.push(framedMessage);
            }
            break;
          default:
            throw new Error("Unexpected read state");
        }
      }
      return result;
    }
  }
  streamDecoder$1.StreamDecoder = StreamDecoder;
  return streamDecoder$1;
}
var hasRequiredSubchannelCall$1;
function requireSubchannelCall$1() {
  if (hasRequiredSubchannelCall$1) return subchannelCall$1;
  hasRequiredSubchannelCall$1 = 1;
  Object.defineProperty(subchannelCall$1, "__esModule", { value: true });
  subchannelCall$1.Http2SubchannelCall = void 0;
  const http2 = require$$0$5;
  const os = require$$1$2;
  const constants_1 = requireConstants$1();
  const metadata_1 = requireMetadata$1();
  const stream_decoder_1 = requireStreamDecoder$1();
  const logging2 = requireLogging$1();
  const constants_2 = requireConstants$1();
  const TRACER_NAME = "subchannel_call";
  function getSystemErrorName(errno) {
    for (const [name, num] of Object.entries(os.constants.errno)) {
      if (num === errno) {
        return name;
      }
    }
    return "Unknown system error " + errno;
  }
  function mapHttpStatusCode(code) {
    const details = `Received HTTP status code ${code}`;
    let mappedStatusCode;
    switch (code) {
      // TODO(murgatroid99): handle 100 and 101
      case 400:
        mappedStatusCode = constants_1.Status.INTERNAL;
        break;
      case 401:
        mappedStatusCode = constants_1.Status.UNAUTHENTICATED;
        break;
      case 403:
        mappedStatusCode = constants_1.Status.PERMISSION_DENIED;
        break;
      case 404:
        mappedStatusCode = constants_1.Status.UNIMPLEMENTED;
        break;
      case 429:
      case 502:
      case 503:
      case 504:
        mappedStatusCode = constants_1.Status.UNAVAILABLE;
        break;
      default:
        mappedStatusCode = constants_1.Status.UNKNOWN;
    }
    return {
      code: mappedStatusCode,
      details,
      metadata: new metadata_1.Metadata()
    };
  }
  class Http2SubchannelCall {
    constructor(http2Stream, callEventTracker, listener, transport2, callId) {
      var _a;
      this.http2Stream = http2Stream;
      this.callEventTracker = callEventTracker;
      this.listener = listener;
      this.transport = transport2;
      this.callId = callId;
      this.isReadFilterPending = false;
      this.isPushPending = false;
      this.canPush = false;
      this.readsClosed = false;
      this.statusOutput = false;
      this.unpushedReadMessages = [];
      this.finalStatus = null;
      this.internalError = null;
      this.serverEndedCall = false;
      this.connectionDropped = false;
      const maxReceiveMessageLength = (_a = transport2.getOptions()["grpc.max_receive_message_length"]) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.decoder = new stream_decoder_1.StreamDecoder(maxReceiveMessageLength);
      http2Stream.on("response", (headers, flags) => {
        let headersString = "";
        for (const header of Object.keys(headers)) {
          headersString += "		" + header + ": " + headers[header] + "\n";
        }
        this.trace("Received server headers:\n" + headersString);
        this.httpStatusCode = headers[":status"];
        if (flags & http2.constants.NGHTTP2_FLAG_END_STREAM) {
          this.handleTrailers(headers);
        } else {
          let metadata2;
          try {
            metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
          } catch (error2) {
            this.endCall({
              code: constants_1.Status.UNKNOWN,
              details: error2.message,
              metadata: new metadata_1.Metadata()
            });
            return;
          }
          this.listener.onReceiveMetadata(metadata2);
        }
      });
      http2Stream.on("trailers", (headers) => {
        this.handleTrailers(headers);
      });
      http2Stream.on("data", (data) => {
        if (this.statusOutput) {
          return;
        }
        this.trace("receive HTTP/2 data frame of length " + data.length);
        let messages;
        try {
          messages = this.decoder.write(data);
        } catch (e) {
          if (this.httpStatusCode !== void 0 && this.httpStatusCode !== 200) {
            const mappedStatus = mapHttpStatusCode(this.httpStatusCode);
            this.cancelWithStatus(mappedStatus.code, mappedStatus.details);
          } else {
            this.cancelWithStatus(constants_1.Status.RESOURCE_EXHAUSTED, e.message);
          }
          return;
        }
        for (const message of messages) {
          this.trace("parsed message of length " + message.length);
          this.callEventTracker.addMessageReceived();
          this.tryPush(message);
        }
      });
      http2Stream.on("end", () => {
        this.readsClosed = true;
        this.maybeOutputStatus();
      });
      http2Stream.on("close", () => {
        this.serverEndedCall = true;
        process.nextTick(() => {
          var _a2;
          this.trace("HTTP/2 stream closed with code " + http2Stream.rstCode);
          if (((_a2 = this.finalStatus) === null || _a2 === void 0 ? void 0 : _a2.code) === constants_1.Status.OK) {
            return;
          }
          let code;
          let details = "";
          switch (http2Stream.rstCode) {
            case http2.constants.NGHTTP2_NO_ERROR:
              if (this.finalStatus !== null) {
                return;
              }
              if (this.httpStatusCode && this.httpStatusCode !== 200) {
                const mappedStatus = mapHttpStatusCode(this.httpStatusCode);
                code = mappedStatus.code;
                details = mappedStatus.details;
              } else {
                code = constants_1.Status.INTERNAL;
                details = `Received RST_STREAM with code ${http2Stream.rstCode} (Call ended without gRPC status)`;
              }
              break;
            case http2.constants.NGHTTP2_REFUSED_STREAM:
              code = constants_1.Status.UNAVAILABLE;
              details = "Stream refused by server";
              break;
            case http2.constants.NGHTTP2_CANCEL:
              if (this.connectionDropped) {
                code = constants_1.Status.UNAVAILABLE;
                details = "Connection dropped";
              } else {
                code = constants_1.Status.CANCELLED;
                details = "Call cancelled";
              }
              break;
            case http2.constants.NGHTTP2_ENHANCE_YOUR_CALM:
              code = constants_1.Status.RESOURCE_EXHAUSTED;
              details = "Bandwidth exhausted or memory limit exceeded";
              break;
            case http2.constants.NGHTTP2_INADEQUATE_SECURITY:
              code = constants_1.Status.PERMISSION_DENIED;
              details = "Protocol not secure enough";
              break;
            case http2.constants.NGHTTP2_INTERNAL_ERROR:
              code = constants_1.Status.INTERNAL;
              if (this.internalError === null) {
                details = `Received RST_STREAM with code ${http2Stream.rstCode} (Internal server error)`;
              } else {
                if (this.internalError.code === "ECONNRESET" || this.internalError.code === "ETIMEDOUT") {
                  code = constants_1.Status.UNAVAILABLE;
                  details = this.internalError.message;
                } else {
                  details = `Received RST_STREAM with code ${http2Stream.rstCode} triggered by internal client error: ${this.internalError.message}`;
                }
              }
              break;
            default:
              code = constants_1.Status.INTERNAL;
              details = `Received RST_STREAM with code ${http2Stream.rstCode}`;
          }
          this.endCall({
            code,
            details,
            metadata: new metadata_1.Metadata(),
            rstCode: http2Stream.rstCode
          });
        });
      });
      http2Stream.on("error", (err) => {
        if (err.code !== "ERR_HTTP2_STREAM_ERROR") {
          this.trace("Node error event: message=" + err.message + " code=" + err.code + " errno=" + getSystemErrorName(err.errno) + " syscall=" + err.syscall);
          this.internalError = err;
        }
        this.callEventTracker.onStreamEnd(false);
      });
    }
    getDeadlineInfo() {
      return [`remote_addr=${this.getPeer()}`];
    }
    onDisconnect() {
      this.connectionDropped = true;
      setImmediate(() => {
        this.endCall({
          code: constants_1.Status.UNAVAILABLE,
          details: "Connection dropped",
          metadata: new metadata_1.Metadata()
        });
      });
    }
    outputStatus() {
      if (!this.statusOutput) {
        this.statusOutput = true;
        this.trace("ended with status: code=" + this.finalStatus.code + ' details="' + this.finalStatus.details + '"');
        this.callEventTracker.onCallEnd(this.finalStatus);
        process.nextTick(() => {
          this.listener.onReceiveStatus(this.finalStatus);
        });
        this.http2Stream.resume();
      }
    }
    trace(text) {
      logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callId + "] " + text);
    }
    /**
     * On first call, emits a 'status' event with the given StatusObject.
     * Subsequent calls are no-ops.
     * @param status The status of the call.
     */
    endCall(status) {
      if (this.finalStatus === null || this.finalStatus.code === constants_1.Status.OK) {
        this.finalStatus = status;
        this.maybeOutputStatus();
      }
      this.destroyHttp2Stream();
    }
    maybeOutputStatus() {
      if (this.finalStatus !== null) {
        if (this.finalStatus.code !== constants_1.Status.OK || this.readsClosed && this.unpushedReadMessages.length === 0 && !this.isReadFilterPending && !this.isPushPending) {
          this.outputStatus();
        }
      }
    }
    push(message) {
      this.trace("pushing to reader message of length " + (message instanceof Buffer ? message.length : null));
      this.canPush = false;
      this.isPushPending = true;
      process.nextTick(() => {
        this.isPushPending = false;
        if (this.statusOutput) {
          return;
        }
        this.listener.onReceiveMessage(message);
        this.maybeOutputStatus();
      });
    }
    tryPush(messageBytes) {
      if (this.canPush) {
        this.http2Stream.pause();
        this.push(messageBytes);
      } else {
        this.trace("unpushedReadMessages.push message of length " + messageBytes.length);
        this.unpushedReadMessages.push(messageBytes);
      }
    }
    handleTrailers(headers) {
      this.serverEndedCall = true;
      this.callEventTracker.onStreamEnd(true);
      let headersString = "";
      for (const header of Object.keys(headers)) {
        headersString += "		" + header + ": " + headers[header] + "\n";
      }
      this.trace("Received server trailers:\n" + headersString);
      let metadata2;
      try {
        metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
      } catch (e) {
        metadata2 = new metadata_1.Metadata();
      }
      const metadataMap = metadata2.getMap();
      let status;
      if (typeof metadataMap["grpc-status"] === "string") {
        const receivedStatus = Number(metadataMap["grpc-status"]);
        this.trace("received status code " + receivedStatus + " from server");
        metadata2.remove("grpc-status");
        let details = "";
        if (typeof metadataMap["grpc-message"] === "string") {
          try {
            details = decodeURI(metadataMap["grpc-message"]);
          } catch (e) {
            details = metadataMap["grpc-message"];
          }
          metadata2.remove("grpc-message");
          this.trace('received status details string "' + details + '" from server');
        }
        status = {
          code: receivedStatus,
          details,
          metadata: metadata2
        };
      } else if (this.httpStatusCode) {
        status = mapHttpStatusCode(this.httpStatusCode);
        status.metadata = metadata2;
      } else {
        status = {
          code: constants_1.Status.UNKNOWN,
          details: "No status information received",
          metadata: metadata2
        };
      }
      this.endCall(status);
    }
    destroyHttp2Stream() {
      var _a;
      if (this.http2Stream.destroyed) {
        return;
      }
      if (this.serverEndedCall) {
        this.http2Stream.end();
      } else {
        let code;
        if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
          code = http2.constants.NGHTTP2_NO_ERROR;
        } else {
          code = http2.constants.NGHTTP2_CANCEL;
        }
        this.trace("close http2 stream with code " + code);
        this.http2Stream.close(code);
      }
    }
    cancelWithStatus(status, details) {
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      this.endCall({ code: status, details, metadata: new metadata_1.Metadata() });
    }
    getStatus() {
      return this.finalStatus;
    }
    getPeer() {
      return this.transport.getPeerName();
    }
    getCallNumber() {
      return this.callId;
    }
    getAuthContext() {
      return this.transport.getAuthContext();
    }
    startRead() {
      if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
        this.readsClosed = true;
        this.maybeOutputStatus();
        return;
      }
      this.canPush = true;
      if (this.unpushedReadMessages.length > 0) {
        const nextMessage = this.unpushedReadMessages.shift();
        this.push(nextMessage);
        return;
      }
      this.http2Stream.resume();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      const cb = (error2) => {
        process.nextTick(() => {
          var _a;
          let code = constants_1.Status.UNAVAILABLE;
          if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "ERR_STREAM_WRITE_AFTER_END") {
            code = constants_1.Status.INTERNAL;
          }
          if (error2) {
            this.cancelWithStatus(code, `Write error: ${error2.message}`);
          }
          (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
        });
      };
      this.trace("sending data chunk of length " + message.length);
      this.callEventTracker.addMessageSent();
      try {
        this.http2Stream.write(message, cb);
      } catch (error2) {
        this.endCall({
          code: constants_1.Status.UNAVAILABLE,
          details: `Write failed with error ${error2.message}`,
          metadata: new metadata_1.Metadata()
        });
      }
    }
    halfClose() {
      this.trace("end() called");
      this.trace("calling end() on HTTP/2 stream");
      this.http2Stream.end();
    }
  }
  subchannelCall$1.Http2SubchannelCall = Http2SubchannelCall;
  return subchannelCall$1;
}
var hasRequiredTransport$1;
function requireTransport$1() {
  if (hasRequiredTransport$1) return transport$1;
  hasRequiredTransport$1 = 1;
  Object.defineProperty(transport$1, "__esModule", { value: true });
  transport$1.Http2SubchannelConnector = void 0;
  const http2 = require$$0$5;
  const tls_1 = require$$1$1;
  const channelz_1 = requireChannelz$1();
  const constants_1 = requireConstants$1();
  const http_proxy_1 = requireHttp_proxy$1();
  const logging2 = requireLogging$1();
  const resolver_1 = requireResolver$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const uri_parser_1 = requireUriParser$1();
  const net = require$$0$1;
  const subchannel_call_1 = requireSubchannelCall$1();
  const call_number_1 = requireCallNumber$1();
  const TRACER_NAME = "transport";
  const FLOW_CONTROL_TRACER_NAME = "transport_flowctrl";
  const clientVersion = require$$11.version;
  const { HTTP2_HEADER_AUTHORITY, HTTP2_HEADER_CONTENT_TYPE, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_TE, HTTP2_HEADER_USER_AGENT } = http2.constants;
  const KEEPALIVE_TIMEOUT_MS = 2e4;
  const tooManyPingsData = Buffer.from("too_many_pings", "ascii");
  class Http2Transport {
    constructor(session, subchannelAddress2, options, remoteName) {
      this.session = session;
      this.options = options;
      this.remoteName = remoteName;
      this.keepaliveTimer = null;
      this.pendingSendKeepalivePing = false;
      this.activeCalls = /* @__PURE__ */ new Set();
      this.disconnectListeners = [];
      this.disconnectHandled = false;
      this.channelzEnabled = true;
      this.keepalivesSent = 0;
      this.messagesSent = 0;
      this.messagesReceived = 0;
      this.lastMessageSentTimestamp = null;
      this.lastMessageReceivedTimestamp = null;
      this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress2);
      if (options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
        this.streamTracker = new channelz_1.ChannelzCallTrackerStub();
      } else {
        this.streamTracker = new channelz_1.ChannelzCallTracker();
      }
      this.channelzRef = (0, channelz_1.registerChannelzSocket)(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled);
      this.userAgent = [
        options["grpc.primary_user_agent"],
        `grpc-node-js/${clientVersion}`,
        options["grpc.secondary_user_agent"]
      ].filter((e) => e).join(" ");
      if ("grpc.keepalive_time_ms" in options) {
        this.keepaliveTimeMs = options["grpc.keepalive_time_ms"];
      } else {
        this.keepaliveTimeMs = -1;
      }
      if ("grpc.keepalive_timeout_ms" in options) {
        this.keepaliveTimeoutMs = options["grpc.keepalive_timeout_ms"];
      } else {
        this.keepaliveTimeoutMs = KEEPALIVE_TIMEOUT_MS;
      }
      if ("grpc.keepalive_permit_without_calls" in options) {
        this.keepaliveWithoutCalls = options["grpc.keepalive_permit_without_calls"] === 1;
      } else {
        this.keepaliveWithoutCalls = false;
      }
      session.once("close", () => {
        this.trace("session closed");
        this.handleDisconnect();
      });
      session.once("goaway", (errorCode, lastStreamID, opaqueData) => {
        let tooManyPings = false;
        if (errorCode === http2.constants.NGHTTP2_ENHANCE_YOUR_CALM && opaqueData && opaqueData.equals(tooManyPingsData)) {
          tooManyPings = true;
        }
        this.trace("connection closed by GOAWAY with code " + errorCode + " and data " + (opaqueData === null || opaqueData === void 0 ? void 0 : opaqueData.toString()));
        this.reportDisconnectToOwner(tooManyPings);
      });
      session.once("error", (error2) => {
        this.trace("connection closed with error " + error2.message);
        this.handleDisconnect();
      });
      session.socket.once("close", (hadError) => {
        this.trace("connection closed. hadError=" + hadError);
        this.handleDisconnect();
      });
      if (logging2.isTracerEnabled(TRACER_NAME)) {
        session.on("remoteSettings", (settings) => {
          this.trace("new settings received" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
        });
        session.on("localSettings", (settings) => {
          this.trace("local settings acknowledged by remote" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
        });
      }
      if (this.keepaliveWithoutCalls) {
        this.maybeStartKeepalivePingTimer();
      }
      if (session.socket instanceof tls_1.TLSSocket) {
        this.authContext = {
          transportSecurityType: "ssl",
          sslPeerCertificate: session.socket.getPeerCertificate()
        };
      } else {
        this.authContext = {};
      }
    }
    getChannelzInfo() {
      var _a, _b, _c;
      const sessionSocket = this.session.socket;
      const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
      const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
      let tlsInfo;
      if (this.session.encrypted) {
        const tlsSocket = sessionSocket;
        const cipherInfo = tlsSocket.getCipher();
        const certificate = tlsSocket.getCertificate();
        const peerCertificate = tlsSocket.getPeerCertificate();
        tlsInfo = {
          cipherSuiteStandardName: (_a = cipherInfo.standardName) !== null && _a !== void 0 ? _a : null,
          cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
          localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
          remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
        };
      } else {
        tlsInfo = null;
      }
      const socketInfo = {
        remoteAddress,
        localAddress,
        security: tlsInfo,
        remoteName: this.remoteName,
        streamsStarted: this.streamTracker.callsStarted,
        streamsSucceeded: this.streamTracker.callsSucceeded,
        streamsFailed: this.streamTracker.callsFailed,
        messagesSent: this.messagesSent,
        messagesReceived: this.messagesReceived,
        keepAlivesSent: this.keepalivesSent,
        lastLocalStreamCreatedTimestamp: this.streamTracker.lastCallStartedTimestamp,
        lastRemoteStreamCreatedTimestamp: null,
        lastMessageSentTimestamp: this.lastMessageSentTimestamp,
        lastMessageReceivedTimestamp: this.lastMessageReceivedTimestamp,
        localFlowControlWindow: (_b = this.session.state.localWindowSize) !== null && _b !== void 0 ? _b : null,
        remoteFlowControlWindow: (_c = this.session.state.remoteWindowSize) !== null && _c !== void 0 ? _c : null
      };
      return socketInfo;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    keepaliveTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    flowControlTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, FLOW_CONTROL_TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    internalsTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "transport_internals", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    /**
     * Indicate to the owner of this object that this transport should no longer
     * be used. That happens if the connection drops, or if the server sends a
     * GOAWAY.
     * @param tooManyPings If true, this was triggered by a GOAWAY with data
     * indicating that the session was closed becaues the client sent too many
     * pings.
     * @returns
     */
    reportDisconnectToOwner(tooManyPings) {
      if (this.disconnectHandled) {
        return;
      }
      this.disconnectHandled = true;
      this.disconnectListeners.forEach((listener) => listener(tooManyPings));
    }
    /**
     * Handle connection drops, but not GOAWAYs.
     */
    handleDisconnect() {
      this.clearKeepaliveTimeout();
      this.reportDisconnectToOwner(false);
      for (const call2 of this.activeCalls) {
        call2.onDisconnect();
      }
      setImmediate(() => {
        this.session.destroy();
      });
    }
    addDisconnectListener(listener) {
      this.disconnectListeners.push(listener);
    }
    canSendPing() {
      return !this.session.destroyed && this.keepaliveTimeMs > 0 && (this.keepaliveWithoutCalls || this.activeCalls.size > 0);
    }
    maybeSendPing() {
      var _a, _b;
      if (!this.canSendPing()) {
        this.pendingSendKeepalivePing = true;
        return;
      }
      if (this.keepaliveTimer) {
        console.error("keepaliveTimeout is not null");
        return;
      }
      if (this.channelzEnabled) {
        this.keepalivesSent += 1;
      }
      this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
      this.keepaliveTimer = setTimeout(() => {
        this.keepaliveTimer = null;
        this.keepaliveTrace("Ping timeout passed without response");
        this.handleDisconnect();
      }, this.keepaliveTimeoutMs);
      (_b = (_a = this.keepaliveTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      let pingSendError = "";
      try {
        const pingSentSuccessfully = this.session.ping((err, duration2, payload) => {
          this.clearKeepaliveTimeout();
          if (err) {
            this.keepaliveTrace("Ping failed with error " + err.message);
            this.handleDisconnect();
          } else {
            this.keepaliveTrace("Received ping response");
            this.maybeStartKeepalivePingTimer();
          }
        });
        if (!pingSentSuccessfully) {
          pingSendError = "Ping returned false";
        }
      } catch (e) {
        pingSendError = (e instanceof Error ? e.message : "") || "Unknown error";
      }
      if (pingSendError) {
        this.keepaliveTrace("Ping send failed: " + pingSendError);
        this.handleDisconnect();
      }
    }
    /**
     * Starts the keepalive ping timer if appropriate. If the timer already ran
     * out while there were no active requests, instead send a ping immediately.
     * If the ping timer is already running or a ping is currently in flight,
     * instead do nothing and wait for them to resolve.
     */
    maybeStartKeepalivePingTimer() {
      var _a, _b;
      if (!this.canSendPing()) {
        return;
      }
      if (this.pendingSendKeepalivePing) {
        this.pendingSendKeepalivePing = false;
        this.maybeSendPing();
      } else if (!this.keepaliveTimer) {
        this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms");
        this.keepaliveTimer = setTimeout(() => {
          this.keepaliveTimer = null;
          this.maybeSendPing();
        }, this.keepaliveTimeMs);
        (_b = (_a = this.keepaliveTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    /**
     * Clears whichever keepalive timeout is currently active, if any.
     */
    clearKeepaliveTimeout() {
      if (this.keepaliveTimer) {
        clearTimeout(this.keepaliveTimer);
        this.keepaliveTimer = null;
      }
    }
    removeActiveCall(call2) {
      this.activeCalls.delete(call2);
      if (this.activeCalls.size === 0) {
        this.session.unref();
      }
    }
    addActiveCall(call2) {
      this.activeCalls.add(call2);
      if (this.activeCalls.size === 1) {
        this.session.ref();
        if (!this.keepaliveWithoutCalls) {
          this.maybeStartKeepalivePingTimer();
        }
      }
    }
    createCall(metadata2, host, method, listener, subchannelCallStatsTracker) {
      const headers = metadata2.toHttp2Headers();
      headers[HTTP2_HEADER_AUTHORITY] = host;
      headers[HTTP2_HEADER_USER_AGENT] = this.userAgent;
      headers[HTTP2_HEADER_CONTENT_TYPE] = "application/grpc";
      headers[HTTP2_HEADER_METHOD] = "POST";
      headers[HTTP2_HEADER_PATH] = method;
      headers[HTTP2_HEADER_TE] = "trailers";
      let http2Stream;
      try {
        http2Stream = this.session.request(headers);
      } catch (e) {
        this.handleDisconnect();
        throw e;
      }
      this.flowControlTrace("local window size: " + this.session.state.localWindowSize + " remote window size: " + this.session.state.remoteWindowSize);
      this.internalsTrace("session.closed=" + this.session.closed + " session.destroyed=" + this.session.destroyed + " session.socket.destroyed=" + this.session.socket.destroyed);
      let eventTracker;
      let call2;
      if (this.channelzEnabled) {
        this.streamTracker.addCallStarted();
        eventTracker = {
          addMessageSent: () => {
            var _a;
            this.messagesSent += 1;
            this.lastMessageSentTimestamp = /* @__PURE__ */ new Date();
            (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          addMessageReceived: () => {
            var _a;
            this.messagesReceived += 1;
            this.lastMessageReceivedTimestamp = /* @__PURE__ */ new Date();
            (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          onCallEnd: (status) => {
            var _a;
            (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
            this.removeActiveCall(call2);
          },
          onStreamEnd: (success) => {
            var _a;
            if (success) {
              this.streamTracker.addCallSucceeded();
            } else {
              this.streamTracker.addCallFailed();
            }
            (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
          }
        };
      } else {
        eventTracker = {
          addMessageSent: () => {
            var _a;
            (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          addMessageReceived: () => {
            var _a;
            (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          onCallEnd: (status) => {
            var _a;
            (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
            this.removeActiveCall(call2);
          },
          onStreamEnd: (success) => {
            var _a;
            (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
          }
        };
      }
      call2 = new subchannel_call_1.Http2SubchannelCall(http2Stream, eventTracker, listener, this, (0, call_number_1.getNextCallNumber)());
      this.addActiveCall(call2);
      return call2;
    }
    getChannelzRef() {
      return this.channelzRef;
    }
    getPeerName() {
      return this.subchannelAddressString;
    }
    getOptions() {
      return this.options;
    }
    getAuthContext() {
      return this.authContext;
    }
    shutdown() {
      this.session.close();
      (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
    }
  }
  class Http2SubchannelConnector {
    constructor(channelTarget) {
      this.channelTarget = channelTarget;
      this.session = null;
      this.isShutdown = false;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, (0, uri_parser_1.uriToString)(this.channelTarget) + " " + text);
    }
    createSession(secureConnectResult, address, options) {
      if (this.isShutdown) {
        return Promise.reject();
      }
      if (secureConnectResult.socket.closed) {
        return Promise.reject("Connection closed before starting HTTP/2 handshake");
      }
      return new Promise((resolve, reject) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let remoteName = null;
        let realTarget = this.channelTarget;
        if ("grpc.http_connect_target" in options) {
          const parsedTarget = (0, uri_parser_1.parseUri)(options["grpc.http_connect_target"]);
          if (parsedTarget) {
            realTarget = parsedTarget;
            remoteName = (0, uri_parser_1.uriToString)(parsedTarget);
          }
        }
        const scheme = secureConnectResult.secure ? "https" : "http";
        const targetPath = (0, resolver_1.getDefaultAuthority)(realTarget);
        const closeHandler = () => {
          var _a2;
          (_a2 = this.session) === null || _a2 === void 0 ? void 0 : _a2.destroy();
          this.session = null;
          setImmediate(() => {
            if (!reportedError) {
              reportedError = true;
              reject(`${errorMessage.trim()} (${(/* @__PURE__ */ new Date()).toISOString()})`);
            }
          });
        };
        const errorHandler = (error2) => {
          var _a2;
          (_a2 = this.session) === null || _a2 === void 0 ? void 0 : _a2.destroy();
          errorMessage = error2.message;
          this.trace("connection failed with error " + errorMessage);
          if (!reportedError) {
            reportedError = true;
            reject(`${errorMessage} (${(/* @__PURE__ */ new Date()).toISOString()})`);
          }
        };
        const sessionOptions = {
          createConnection: (authority, option) => {
            return secureConnectResult.socket;
          },
          settings: {
            initialWindowSize: (_d = (_a = options["grpc-node.flow_control_window"]) !== null && _a !== void 0 ? _a : (_c = (_b = http2.getDefaultSettings) === null || _b === void 0 ? void 0 : _b.call(http2)) === null || _c === void 0 ? void 0 : _c.initialWindowSize) !== null && _d !== void 0 ? _d : 65535
          },
          maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER,
          /* By default, set a very large max session memory limit, to effectively
           * disable enforcement of the limit. Some testing indicates that Node's
           * behavior degrades badly when this limit is reached, so we solve that
           * by disabling the check entirely. */
          maxSessionMemory: (_e = options["grpc-node.max_session_memory"]) !== null && _e !== void 0 ? _e : Number.MAX_SAFE_INTEGER
        };
        const session = http2.connect(`${scheme}://${targetPath}`, sessionOptions);
        const defaultWin = (_h = (_g = (_f = http2.getDefaultSettings) === null || _f === void 0 ? void 0 : _f.call(http2)) === null || _g === void 0 ? void 0 : _g.initialWindowSize) !== null && _h !== void 0 ? _h : 65535;
        const connWin = options["grpc-node.flow_control_window"];
        this.session = session;
        let errorMessage = "Failed to connect";
        let reportedError = false;
        session.unref();
        session.once("remoteSettings", () => {
          var _a2;
          if (connWin && connWin > defaultWin) {
            try {
              session.setLocalWindowSize(connWin);
            } catch (_b2) {
              const delta = connWin - ((_a2 = session.state.localWindowSize) !== null && _a2 !== void 0 ? _a2 : defaultWin);
              if (delta > 0)
                session.incrementWindowSize(delta);
            }
          }
          session.removeAllListeners();
          secureConnectResult.socket.removeListener("close", closeHandler);
          secureConnectResult.socket.removeListener("error", errorHandler);
          resolve(new Http2Transport(session, address, options, remoteName));
          this.session = null;
        });
        session.once("close", closeHandler);
        session.once("error", errorHandler);
        secureConnectResult.socket.once("close", closeHandler);
        secureConnectResult.socket.once("error", errorHandler);
      });
    }
    tcpConnect(address, options) {
      return (0, http_proxy_1.getProxiedConnection)(address, options).then((proxiedSocket) => {
        if (proxiedSocket) {
          return proxiedSocket;
        } else {
          return new Promise((resolve, reject) => {
            const closeCallback = () => {
              reject(new Error("Socket closed"));
            };
            const errorCallback = (error2) => {
              reject(error2);
            };
            const socket = net.connect(address, () => {
              socket.removeListener("close", closeCallback);
              socket.removeListener("error", errorCallback);
              resolve(socket);
            });
            socket.once("close", closeCallback);
            socket.once("error", errorCallback);
          });
        }
      });
    }
    async connect(address, secureConnector, options) {
      if (this.isShutdown) {
        return Promise.reject();
      }
      let tcpConnection = null;
      let secureConnectResult = null;
      const addressString = (0, subchannel_address_1.subchannelAddressToString)(address);
      try {
        this.trace(addressString + " Waiting for secureConnector to be ready");
        await secureConnector.waitForReady();
        this.trace(addressString + " secureConnector is ready");
        tcpConnection = await this.tcpConnect(address, options);
        tcpConnection.setNoDelay();
        this.trace(addressString + " Established TCP connection");
        secureConnectResult = await secureConnector.connect(tcpConnection);
        this.trace(addressString + " Established secure connection");
        return this.createSession(secureConnectResult, address, options);
      } catch (e) {
        tcpConnection === null || tcpConnection === void 0 ? void 0 : tcpConnection.destroy();
        secureConnectResult === null || secureConnectResult === void 0 ? void 0 : secureConnectResult.socket.destroy();
        throw e;
      }
    }
    shutdown() {
      var _a;
      this.isShutdown = true;
      (_a = this.session) === null || _a === void 0 ? void 0 : _a.close();
      this.session = null;
    }
  }
  transport$1.Http2SubchannelConnector = Http2SubchannelConnector;
  return transport$1;
}
var hasRequiredSubchannelPool$1;
function requireSubchannelPool$1() {
  if (hasRequiredSubchannelPool$1) return subchannelPool$1;
  hasRequiredSubchannelPool$1 = 1;
  Object.defineProperty(subchannelPool$1, "__esModule", { value: true });
  subchannelPool$1.SubchannelPool = void 0;
  subchannelPool$1.getSubchannelPool = getSubchannelPool;
  const channel_options_1 = requireChannelOptions$1();
  const subchannel_1 = requireSubchannel$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const uri_parser_1 = requireUriParser$1();
  const transport_1 = requireTransport$1();
  const REF_CHECK_INTERVAL = 1e4;
  class SubchannelPool {
    /**
     * A pool of subchannels use for making connections. Subchannels with the
     * exact same parameters will be reused.
     */
    constructor() {
      this.pool = /* @__PURE__ */ Object.create(null);
      this.cleanupTimer = null;
    }
    /**
     * Unrefs all unused subchannels and cancels the cleanup task if all
     * subchannels have been unrefed.
     */
    unrefUnusedSubchannels() {
      let allSubchannelsUnrefed = true;
      for (const channelTarget in this.pool) {
        const subchannelObjArray = this.pool[channelTarget];
        const refedSubchannels = subchannelObjArray.filter((value) => !value.subchannel.unrefIfOneRef());
        if (refedSubchannels.length > 0) {
          allSubchannelsUnrefed = false;
        }
        this.pool[channelTarget] = refedSubchannels;
      }
      if (allSubchannelsUnrefed && this.cleanupTimer !== null) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
    }
    /**
     * Ensures that the cleanup task is spawned.
     */
    ensureCleanupTask() {
      var _a, _b;
      if (this.cleanupTimer === null) {
        this.cleanupTimer = setInterval(() => {
          this.unrefUnusedSubchannels();
        }, REF_CHECK_INTERVAL);
        (_b = (_a = this.cleanupTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    /**
     * Get a subchannel if one already exists with exactly matching parameters.
     * Otherwise, create and save a subchannel with those parameters.
     * @param channelTarget
     * @param subchannelTarget
     * @param channelArguments
     * @param channelCredentials
     */
    getOrCreateSubchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials2) {
      this.ensureCleanupTask();
      const channelTarget = (0, uri_parser_1.uriToString)(channelTargetUri);
      if (channelTarget in this.pool) {
        const subchannelObjArray = this.pool[channelTarget];
        for (const subchannelObj of subchannelObjArray) {
          if ((0, subchannel_address_1.subchannelAddressEqual)(subchannelTarget, subchannelObj.subchannelAddress) && (0, channel_options_1.channelOptionsEqual)(channelArguments, subchannelObj.channelArguments) && channelCredentials2._equals(subchannelObj.channelCredentials)) {
            return subchannelObj.subchannel;
          }
        }
      }
      const subchannel2 = new subchannel_1.Subchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials2, new transport_1.Http2SubchannelConnector(channelTargetUri));
      if (!(channelTarget in this.pool)) {
        this.pool[channelTarget] = [];
      }
      this.pool[channelTarget].push({
        subchannelAddress: subchannelTarget,
        channelArguments,
        channelCredentials: channelCredentials2,
        subchannel: subchannel2
      });
      subchannel2.ref();
      return subchannel2;
    }
  }
  subchannelPool$1.SubchannelPool = SubchannelPool;
  const globalSubchannelPool = new SubchannelPool();
  function getSubchannelPool(global) {
    if (global) {
      return globalSubchannelPool;
    } else {
      return new SubchannelPool();
    }
  }
  return subchannelPool$1;
}
var loadBalancingCall$1 = {};
var hasRequiredLoadBalancingCall$1;
function requireLoadBalancingCall$1() {
  if (hasRequiredLoadBalancingCall$1) return loadBalancingCall$1;
  hasRequiredLoadBalancingCall$1 = 1;
  Object.defineProperty(loadBalancingCall$1, "__esModule", { value: true });
  loadBalancingCall$1.LoadBalancingCall = void 0;
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const deadline_1 = requireDeadline$1();
  const metadata_1 = requireMetadata$1();
  const picker_1 = requirePicker$1();
  const uri_parser_1 = requireUriParser$1();
  const logging2 = requireLogging$1();
  const control_plane_status_1 = requireControlPlaneStatus$1();
  const http2 = require$$0$5;
  const TRACER_NAME = "load_balancing_call";
  class LoadBalancingCall {
    constructor(channel2, callConfig, methodName, host, credentials, deadline2, callNumber2) {
      var _a, _b;
      this.channel = channel2;
      this.callConfig = callConfig;
      this.methodName = methodName;
      this.host = host;
      this.credentials = credentials;
      this.deadline = deadline2;
      this.callNumber = callNumber2;
      this.child = null;
      this.readPending = false;
      this.pendingMessage = null;
      this.pendingHalfClose = false;
      this.ended = false;
      this.metadata = null;
      this.listener = null;
      this.onCallEnded = null;
      this.childStartTime = null;
      const splitPath = this.methodName.split("/");
      let serviceName = "";
      if (splitPath.length >= 2) {
        serviceName = splitPath[1];
      }
      const hostname = (_b = (_a = (0, uri_parser_1.splitHostPort)(this.host)) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : "localhost";
      this.serviceUrl = `https://${hostname}/${serviceName}`;
      this.startTime = /* @__PURE__ */ new Date();
    }
    getDeadlineInfo() {
      var _a, _b;
      const deadlineInfo = [];
      if (this.childStartTime) {
        if (this.childStartTime > this.startTime) {
          if ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.getOptions().waitForReady) {
            deadlineInfo.push("wait_for_ready");
          }
          deadlineInfo.push(`LB pick: ${(0, deadline_1.formatDateDifference)(this.startTime, this.childStartTime)}`);
        }
        deadlineInfo.push(...this.child.getDeadlineInfo());
        return deadlineInfo;
      } else {
        if ((_b = this.metadata) === null || _b === void 0 ? void 0 : _b.getOptions().waitForReady) {
          deadlineInfo.push("wait_for_ready");
        }
        deadlineInfo.push("Waiting for LB pick");
      }
      return deadlineInfo;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    outputStatus(status, progress) {
      var _a, _b;
      if (!this.ended) {
        this.ended = true;
        this.trace("ended with status: code=" + status.code + ' details="' + status.details + '" start time=' + this.startTime.toISOString());
        const finalStatus = Object.assign(Object.assign({}, status), { progress });
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(finalStatus);
        (_b = this.onCallEnded) === null || _b === void 0 ? void 0 : _b.call(this, finalStatus.code, finalStatus.details, finalStatus.metadata);
      }
    }
    doPick() {
      var _a, _b;
      if (this.ended) {
        return;
      }
      if (!this.metadata) {
        throw new Error("doPick called before start");
      }
      this.trace("Pick called");
      const finalMetadata = this.metadata.clone();
      const pickResult = this.channel.doPick(finalMetadata, this.callConfig.pickInformation);
      const subchannelString = pickResult.subchannel ? "(" + pickResult.subchannel.getChannelzRef().id + ") " + pickResult.subchannel.getAddress() : "" + pickResult.subchannel;
      this.trace("Pick result: " + picker_1.PickResultType[pickResult.pickResultType] + " subchannel: " + subchannelString + " status: " + ((_a = pickResult.status) === null || _a === void 0 ? void 0 : _a.code) + " " + ((_b = pickResult.status) === null || _b === void 0 ? void 0 : _b.details));
      switch (pickResult.pickResultType) {
        case picker_1.PickResultType.COMPLETE:
          const combinedCallCredentials = this.credentials.compose(pickResult.subchannel.getCallCredentials());
          combinedCallCredentials.generateMetadata({ method_name: this.methodName, service_url: this.serviceUrl }).then((credsMetadata) => {
            var _a2;
            if (this.ended) {
              this.trace("Credentials metadata generation finished after call ended");
              return;
            }
            finalMetadata.merge(credsMetadata);
            if (finalMetadata.get("authorization").length > 1) {
              this.outputStatus({
                code: constants_1.Status.INTERNAL,
                details: '"authorization" metadata cannot have multiple values',
                metadata: new metadata_1.Metadata()
              }, "PROCESSED");
            }
            if (pickResult.subchannel.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
              this.trace("Picked subchannel " + subchannelString + " has state " + connectivity_state_1.ConnectivityState[pickResult.subchannel.getConnectivityState()] + " after getting credentials metadata. Retrying pick");
              this.doPick();
              return;
            }
            if (this.deadline !== Infinity) {
              finalMetadata.set("grpc-timeout", (0, deadline_1.getDeadlineTimeoutString)(this.deadline));
            }
            try {
              this.child = pickResult.subchannel.getRealSubchannel().createCall(finalMetadata, this.host, this.methodName, {
                onReceiveMetadata: (metadata2) => {
                  this.trace("Received metadata");
                  this.listener.onReceiveMetadata(metadata2);
                },
                onReceiveMessage: (message) => {
                  this.trace("Received message");
                  this.listener.onReceiveMessage(message);
                },
                onReceiveStatus: (status) => {
                  this.trace("Received status");
                  if (status.rstCode === http2.constants.NGHTTP2_REFUSED_STREAM) {
                    this.outputStatus(status, "REFUSED");
                  } else {
                    this.outputStatus(status, "PROCESSED");
                  }
                }
              });
              this.childStartTime = /* @__PURE__ */ new Date();
            } catch (error2) {
              this.trace("Failed to start call on picked subchannel " + subchannelString + " with error " + error2.message);
              this.outputStatus({
                code: constants_1.Status.INTERNAL,
                details: "Failed to start HTTP/2 stream with error " + error2.message,
                metadata: new metadata_1.Metadata()
              }, "NOT_STARTED");
              return;
            }
            (_a2 = pickResult.onCallStarted) === null || _a2 === void 0 ? void 0 : _a2.call(pickResult);
            this.onCallEnded = pickResult.onCallEnded;
            this.trace("Created child call [" + this.child.getCallNumber() + "]");
            if (this.readPending) {
              this.child.startRead();
            }
            if (this.pendingMessage) {
              this.child.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
            }
            if (this.pendingHalfClose) {
              this.child.halfClose();
            }
          }, (error2) => {
            const { code: code2, details: details2 } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(typeof error2.code === "number" ? error2.code : constants_1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${error2.message}`);
            this.outputStatus({
              code: code2,
              details: details2,
              metadata: new metadata_1.Metadata()
            }, "PROCESSED");
          });
          break;
        case picker_1.PickResultType.DROP:
          const { code, details } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
          setImmediate(() => {
            this.outputStatus({ code, details, metadata: pickResult.status.metadata }, "DROP");
          });
          break;
        case picker_1.PickResultType.TRANSIENT_FAILURE:
          if (this.metadata.getOptions().waitForReady) {
            this.channel.queueCallForPick(this);
          } else {
            const { code: code2, details: details2 } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
            setImmediate(() => {
              this.outputStatus({ code: code2, details: details2, metadata: pickResult.status.metadata }, "PROCESSED");
            });
          }
          break;
        case picker_1.PickResultType.QUEUE:
          this.channel.queueCallForPick(this);
      }
    }
    cancelWithStatus(status, details) {
      var _a;
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
      this.outputStatus({ code: status, details, metadata: new metadata_1.Metadata() }, "PROCESSED");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.listener = listener;
      this.metadata = metadata2;
      this.doPick();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      if (this.child) {
        this.child.sendMessageWithContext(context, message);
      } else {
        this.pendingMessage = { context, message };
      }
    }
    startRead() {
      this.trace("startRead called");
      if (this.child) {
        this.child.startRead();
      } else {
        this.readPending = true;
      }
    }
    halfClose() {
      this.trace("halfClose called");
      if (this.child) {
        this.child.halfClose();
      } else {
        this.pendingHalfClose = true;
      }
    }
    setCredentials(credentials) {
      throw new Error("Method not implemented.");
    }
    getCallNumber() {
      return this.callNumber;
    }
    getAuthContext() {
      if (this.child) {
        return this.child.getAuthContext();
      } else {
        return null;
      }
    }
  }
  loadBalancingCall$1.LoadBalancingCall = LoadBalancingCall;
  return loadBalancingCall$1;
}
var resolvingCall$1 = {};
var hasRequiredResolvingCall$1;
function requireResolvingCall$1() {
  if (hasRequiredResolvingCall$1) return resolvingCall$1;
  hasRequiredResolvingCall$1 = 1;
  Object.defineProperty(resolvingCall$1, "__esModule", { value: true });
  resolvingCall$1.ResolvingCall = void 0;
  const call_credentials_1 = requireCallCredentials$1();
  const constants_1 = requireConstants$1();
  const deadline_1 = requireDeadline$1();
  const metadata_1 = requireMetadata$1();
  const logging2 = requireLogging$1();
  const control_plane_status_1 = requireControlPlaneStatus$1();
  const TRACER_NAME = "resolving_call";
  class ResolvingCall {
    constructor(channel2, method, options, filterStackFactory, callNumber2) {
      this.channel = channel2;
      this.method = method;
      this.filterStackFactory = filterStackFactory;
      this.callNumber = callNumber2;
      this.child = null;
      this.readPending = false;
      this.pendingMessage = null;
      this.pendingHalfClose = false;
      this.ended = false;
      this.readFilterPending = false;
      this.writeFilterPending = false;
      this.pendingChildStatus = null;
      this.metadata = null;
      this.listener = null;
      this.statusWatchers = [];
      this.deadlineTimer = setTimeout(() => {
      }, 0);
      this.filterStack = null;
      this.deadlineStartTime = null;
      this.configReceivedTime = null;
      this.childStartTime = null;
      this.credentials = call_credentials_1.CallCredentials.createEmpty();
      this.deadline = options.deadline;
      this.host = options.host;
      if (options.parentCall) {
        if (options.flags & constants_1.Propagate.CANCELLATION) {
          options.parentCall.on("cancelled", () => {
            this.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled by parent call");
          });
        }
        if (options.flags & constants_1.Propagate.DEADLINE) {
          this.trace("Propagating deadline from parent: " + options.parentCall.getDeadline());
          this.deadline = (0, deadline_1.minDeadline)(this.deadline, options.parentCall.getDeadline());
        }
      }
      this.trace("Created");
      this.runDeadlineTimer();
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    runDeadlineTimer() {
      clearTimeout(this.deadlineTimer);
      this.deadlineStartTime = /* @__PURE__ */ new Date();
      this.trace("Deadline: " + (0, deadline_1.deadlineToString)(this.deadline));
      const timeout = (0, deadline_1.getRelativeTimeout)(this.deadline);
      if (timeout !== Infinity) {
        this.trace("Deadline will be reached in " + timeout + "ms");
        const handleDeadline = () => {
          if (!this.deadlineStartTime) {
            this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
            return;
          }
          const deadlineInfo = [];
          const deadlineEndTime = /* @__PURE__ */ new Date();
          deadlineInfo.push(`Deadline exceeded after ${(0, deadline_1.formatDateDifference)(this.deadlineStartTime, deadlineEndTime)}`);
          if (this.configReceivedTime) {
            if (this.configReceivedTime > this.deadlineStartTime) {
              deadlineInfo.push(`name resolution: ${(0, deadline_1.formatDateDifference)(this.deadlineStartTime, this.configReceivedTime)}`);
            }
            if (this.childStartTime) {
              if (this.childStartTime > this.configReceivedTime) {
                deadlineInfo.push(`metadata filters: ${(0, deadline_1.formatDateDifference)(this.configReceivedTime, this.childStartTime)}`);
              }
            } else {
              deadlineInfo.push("waiting for metadata filters");
            }
          } else {
            deadlineInfo.push("waiting for name resolution");
          }
          if (this.child) {
            deadlineInfo.push(...this.child.getDeadlineInfo());
          }
          this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, deadlineInfo.join(","));
        };
        if (timeout <= 0) {
          process.nextTick(handleDeadline);
        } else {
          this.deadlineTimer = setTimeout(handleDeadline, timeout);
        }
      }
    }
    outputStatus(status) {
      if (!this.ended) {
        this.ended = true;
        if (!this.filterStack) {
          this.filterStack = this.filterStackFactory.createFilter();
        }
        clearTimeout(this.deadlineTimer);
        const filteredStatus = this.filterStack.receiveTrailers(status);
        this.trace("ended with status: code=" + filteredStatus.code + ' details="' + filteredStatus.details + '"');
        this.statusWatchers.forEach((watcher) => watcher(filteredStatus));
        process.nextTick(() => {
          var _a;
          (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(filteredStatus);
        });
      }
    }
    sendMessageOnChild(context, message) {
      if (!this.child) {
        throw new Error("sendMessageonChild called with child not populated");
      }
      const child = this.child;
      this.writeFilterPending = true;
      this.filterStack.sendMessage(Promise.resolve({ message, flags: context.flags })).then((filteredMessage) => {
        this.writeFilterPending = false;
        child.sendMessageWithContext(context, filteredMessage.message);
        if (this.pendingHalfClose) {
          child.halfClose();
        }
      }, (status) => {
        this.cancelWithStatus(status.code, status.details);
      });
    }
    getConfig() {
      if (this.ended) {
        return;
      }
      if (!this.metadata || !this.listener) {
        throw new Error("getConfig called before start");
      }
      const configResult = this.channel.getConfig(this.method, this.metadata);
      if (configResult.type === "NONE") {
        this.channel.queueCallForConfig(this);
        return;
      } else if (configResult.type === "ERROR") {
        if (this.metadata.getOptions().waitForReady) {
          this.channel.queueCallForConfig(this);
        } else {
          this.outputStatus(configResult.error);
        }
        return;
      }
      this.configReceivedTime = /* @__PURE__ */ new Date();
      const config = configResult.config;
      if (config.status !== constants_1.Status.OK) {
        const { code, details } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(config.status, "Failed to route call to method " + this.method);
        this.outputStatus({
          code,
          details,
          metadata: new metadata_1.Metadata()
        });
        return;
      }
      if (config.methodConfig.timeout) {
        const configDeadline = /* @__PURE__ */ new Date();
        configDeadline.setSeconds(configDeadline.getSeconds() + config.methodConfig.timeout.seconds);
        configDeadline.setMilliseconds(configDeadline.getMilliseconds() + config.methodConfig.timeout.nanos / 1e6);
        this.deadline = (0, deadline_1.minDeadline)(this.deadline, configDeadline);
        this.runDeadlineTimer();
      }
      this.filterStackFactory.push(config.dynamicFilterFactories);
      this.filterStack = this.filterStackFactory.createFilter();
      this.filterStack.sendMetadata(Promise.resolve(this.metadata)).then((filteredMetadata) => {
        this.child = this.channel.createRetryingCall(config, this.method, this.host, this.credentials, this.deadline);
        this.trace("Created child [" + this.child.getCallNumber() + "]");
        this.childStartTime = /* @__PURE__ */ new Date();
        this.child.start(filteredMetadata, {
          onReceiveMetadata: (metadata2) => {
            this.trace("Received metadata");
            this.listener.onReceiveMetadata(this.filterStack.receiveMetadata(metadata2));
          },
          onReceiveMessage: (message) => {
            this.trace("Received message");
            this.readFilterPending = true;
            this.filterStack.receiveMessage(message).then((filteredMesssage) => {
              this.trace("Finished filtering received message");
              this.readFilterPending = false;
              this.listener.onReceiveMessage(filteredMesssage);
              if (this.pendingChildStatus) {
                this.outputStatus(this.pendingChildStatus);
              }
            }, (status) => {
              this.cancelWithStatus(status.code, status.details);
            });
          },
          onReceiveStatus: (status) => {
            this.trace("Received status");
            if (this.readFilterPending) {
              this.pendingChildStatus = status;
            } else {
              this.outputStatus(status);
            }
          }
        });
        if (this.readPending) {
          this.child.startRead();
        }
        if (this.pendingMessage) {
          this.sendMessageOnChild(this.pendingMessage.context, this.pendingMessage.message);
        } else if (this.pendingHalfClose) {
          this.child.halfClose();
        }
      }, (status) => {
        this.outputStatus(status);
      });
    }
    reportResolverError(status) {
      var _a;
      if ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.getOptions().waitForReady) {
        this.channel.queueCallForConfig(this);
      } else {
        this.outputStatus(status);
      }
    }
    cancelWithStatus(status, details) {
      var _a;
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
      this.outputStatus({
        code: status,
        details,
        metadata: new metadata_1.Metadata()
      });
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.metadata = metadata2.clone();
      this.listener = listener;
      this.getConfig();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      if (this.child) {
        this.sendMessageOnChild(context, message);
      } else {
        this.pendingMessage = { context, message };
      }
    }
    startRead() {
      this.trace("startRead called");
      if (this.child) {
        this.child.startRead();
      } else {
        this.readPending = true;
      }
    }
    halfClose() {
      this.trace("halfClose called");
      if (this.child && !this.writeFilterPending) {
        this.child.halfClose();
      } else {
        this.pendingHalfClose = true;
      }
    }
    setCredentials(credentials) {
      this.credentials = credentials;
    }
    addStatusWatcher(watcher) {
      this.statusWatchers.push(watcher);
    }
    getCallNumber() {
      return this.callNumber;
    }
    getAuthContext() {
      if (this.child) {
        return this.child.getAuthContext();
      } else {
        return null;
      }
    }
  }
  resolvingCall$1.ResolvingCall = ResolvingCall;
  return resolvingCall$1;
}
var retryingCall$1 = {};
var hasRequiredRetryingCall$1;
function requireRetryingCall$1() {
  if (hasRequiredRetryingCall$1) return retryingCall$1;
  hasRequiredRetryingCall$1 = 1;
  Object.defineProperty(retryingCall$1, "__esModule", { value: true });
  retryingCall$1.RetryingCall = retryingCall$1.MessageBufferTracker = retryingCall$1.RetryThrottler = void 0;
  const constants_1 = requireConstants$1();
  const deadline_1 = requireDeadline$1();
  const metadata_1 = requireMetadata$1();
  const logging2 = requireLogging$1();
  const TRACER_NAME = "retrying_call";
  class RetryThrottler {
    constructor(maxTokens, tokenRatio, previousRetryThrottler) {
      this.maxTokens = maxTokens;
      this.tokenRatio = tokenRatio;
      if (previousRetryThrottler) {
        this.tokens = previousRetryThrottler.tokens * (maxTokens / previousRetryThrottler.maxTokens);
      } else {
        this.tokens = maxTokens;
      }
    }
    addCallSucceeded() {
      this.tokens = Math.min(this.tokens + this.tokenRatio, this.maxTokens);
    }
    addCallFailed() {
      this.tokens = Math.max(this.tokens - 1, 0);
    }
    canRetryCall() {
      return this.tokens > this.maxTokens / 2;
    }
  }
  retryingCall$1.RetryThrottler = RetryThrottler;
  class MessageBufferTracker {
    constructor(totalLimit, limitPerCall) {
      this.totalLimit = totalLimit;
      this.limitPerCall = limitPerCall;
      this.totalAllocated = 0;
      this.allocatedPerCall = /* @__PURE__ */ new Map();
    }
    allocate(size, callId) {
      var _a;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (this.limitPerCall - currentPerCall < size || this.totalLimit - this.totalAllocated < size) {
        return false;
      }
      this.allocatedPerCall.set(callId, currentPerCall + size);
      this.totalAllocated += size;
      return true;
    }
    free(size, callId) {
      var _a;
      if (this.totalAllocated < size) {
        throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > total allocated ${this.totalAllocated}`);
      }
      this.totalAllocated -= size;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (currentPerCall < size) {
        throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > allocated for call ${currentPerCall}`);
      }
      this.allocatedPerCall.set(callId, currentPerCall - size);
    }
    freeAll(callId) {
      var _a;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (this.totalAllocated < currentPerCall) {
        throw new Error(`Invalid buffer allocation state: call ${callId} allocated ${currentPerCall} > total allocated ${this.totalAllocated}`);
      }
      this.totalAllocated -= currentPerCall;
      this.allocatedPerCall.delete(callId);
    }
  }
  retryingCall$1.MessageBufferTracker = MessageBufferTracker;
  const PREVIONS_RPC_ATTEMPTS_METADATA_KEY = "grpc-previous-rpc-attempts";
  const DEFAULT_MAX_ATTEMPTS_LIMIT = 5;
  class RetryingCall {
    constructor(channel2, callConfig, methodName, host, credentials, deadline2, callNumber2, bufferTracker, retryThrottler) {
      var _a;
      this.channel = channel2;
      this.callConfig = callConfig;
      this.methodName = methodName;
      this.host = host;
      this.credentials = credentials;
      this.deadline = deadline2;
      this.callNumber = callNumber2;
      this.bufferTracker = bufferTracker;
      this.retryThrottler = retryThrottler;
      this.listener = null;
      this.initialMetadata = null;
      this.underlyingCalls = [];
      this.writeBuffer = [];
      this.writeBufferOffset = 0;
      this.readStarted = false;
      this.transparentRetryUsed = false;
      this.attempts = 0;
      this.hedgingTimer = null;
      this.committedCallIndex = null;
      this.initialRetryBackoffSec = 0;
      this.nextRetryBackoffSec = 0;
      const maxAttemptsLimit = (_a = channel2.getOptions()["grpc-node.retry_max_attempts_limit"]) !== null && _a !== void 0 ? _a : DEFAULT_MAX_ATTEMPTS_LIMIT;
      if (channel2.getOptions()["grpc.enable_retries"] === 0) {
        this.state = "NO_RETRY";
        this.maxAttempts = 1;
      } else if (callConfig.methodConfig.retryPolicy) {
        this.state = "RETRY";
        const retryPolicy = callConfig.methodConfig.retryPolicy;
        this.nextRetryBackoffSec = this.initialRetryBackoffSec = Number(retryPolicy.initialBackoff.substring(0, retryPolicy.initialBackoff.length - 1));
        this.maxAttempts = Math.min(retryPolicy.maxAttempts, maxAttemptsLimit);
      } else if (callConfig.methodConfig.hedgingPolicy) {
        this.state = "HEDGING";
        this.maxAttempts = Math.min(callConfig.methodConfig.hedgingPolicy.maxAttempts, maxAttemptsLimit);
      } else {
        this.state = "TRANSPARENT_ONLY";
        this.maxAttempts = 1;
      }
      this.startTime = /* @__PURE__ */ new Date();
    }
    getDeadlineInfo() {
      if (this.underlyingCalls.length === 0) {
        return [];
      }
      const deadlineInfo = [];
      const latestCall = this.underlyingCalls[this.underlyingCalls.length - 1];
      if (this.underlyingCalls.length > 1) {
        deadlineInfo.push(`previous attempts: ${this.underlyingCalls.length - 1}`);
      }
      if (latestCall.startTime > this.startTime) {
        deadlineInfo.push(`time to current attempt start: ${(0, deadline_1.formatDateDifference)(this.startTime, latestCall.startTime)}`);
      }
      deadlineInfo.push(...latestCall.call.getDeadlineInfo());
      return deadlineInfo;
    }
    getCallNumber() {
      return this.callNumber;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    reportStatus(statusObject) {
      this.trace("ended with status: code=" + statusObject.code + ' details="' + statusObject.details + '" start time=' + this.startTime.toISOString());
      this.bufferTracker.freeAll(this.callNumber);
      this.writeBufferOffset = this.writeBufferOffset + this.writeBuffer.length;
      this.writeBuffer = [];
      process.nextTick(() => {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus({
          code: statusObject.code,
          details: statusObject.details,
          metadata: statusObject.metadata
        });
      });
    }
    cancelWithStatus(status, details) {
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      this.reportStatus({ code: status, details, metadata: new metadata_1.Metadata() });
      for (const { call: call2 } of this.underlyingCalls) {
        call2.cancelWithStatus(status, details);
      }
    }
    getPeer() {
      if (this.committedCallIndex !== null) {
        return this.underlyingCalls[this.committedCallIndex].call.getPeer();
      } else {
        return "unknown";
      }
    }
    getBufferEntry(messageIndex) {
      var _a;
      return (_a = this.writeBuffer[messageIndex - this.writeBufferOffset]) !== null && _a !== void 0 ? _a : {
        entryType: "FREED",
        allocated: false
      };
    }
    getNextBufferIndex() {
      return this.writeBufferOffset + this.writeBuffer.length;
    }
    clearSentMessages() {
      if (this.state !== "COMMITTED") {
        return;
      }
      let earliestNeededMessageIndex;
      if (this.underlyingCalls[this.committedCallIndex].state === "COMPLETED") {
        earliestNeededMessageIndex = this.getNextBufferIndex();
      } else {
        earliestNeededMessageIndex = this.underlyingCalls[this.committedCallIndex].nextMessageToSend;
      }
      for (let messageIndex = this.writeBufferOffset; messageIndex < earliestNeededMessageIndex; messageIndex++) {
        const bufferEntry = this.getBufferEntry(messageIndex);
        if (bufferEntry.allocated) {
          this.bufferTracker.free(bufferEntry.message.message.length, this.callNumber);
        }
      }
      this.writeBuffer = this.writeBuffer.slice(earliestNeededMessageIndex - this.writeBufferOffset);
      this.writeBufferOffset = earliestNeededMessageIndex;
    }
    commitCall(index) {
      var _a, _b;
      if (this.state === "COMMITTED") {
        return;
      }
      this.trace("Committing call [" + this.underlyingCalls[index].call.getCallNumber() + "] at index " + index);
      this.state = "COMMITTED";
      (_b = (_a = this.callConfig).onCommitted) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.committedCallIndex = index;
      for (let i = 0; i < this.underlyingCalls.length; i++) {
        if (i === index) {
          continue;
        }
        if (this.underlyingCalls[i].state === "COMPLETED") {
          continue;
        }
        this.underlyingCalls[i].state = "COMPLETED";
        this.underlyingCalls[i].call.cancelWithStatus(constants_1.Status.CANCELLED, "Discarded in favor of other hedged attempt");
      }
      this.clearSentMessages();
    }
    commitCallWithMostMessages() {
      if (this.state === "COMMITTED") {
        return;
      }
      let mostMessages = -1;
      let callWithMostMessages = -1;
      for (const [index, childCall] of this.underlyingCalls.entries()) {
        if (childCall.state === "ACTIVE" && childCall.nextMessageToSend > mostMessages) {
          mostMessages = childCall.nextMessageToSend;
          callWithMostMessages = index;
        }
      }
      if (callWithMostMessages === -1) {
        this.state = "TRANSPARENT_ONLY";
      } else {
        this.commitCall(callWithMostMessages);
      }
    }
    isStatusCodeInList(list, code) {
      return list.some((value) => {
        var _a;
        return value === code || value.toString().toLowerCase() === ((_a = constants_1.Status[code]) === null || _a === void 0 ? void 0 : _a.toLowerCase());
      });
    }
    getNextRetryJitter() {
      return Math.random() * (1.2 - 0.8) + 0.8;
    }
    getNextRetryBackoffMs() {
      var _a;
      const retryPolicy = (_a = this.callConfig) === null || _a === void 0 ? void 0 : _a.methodConfig.retryPolicy;
      if (!retryPolicy) {
        return 0;
      }
      const jitter = this.getNextRetryJitter();
      const nextBackoffMs = jitter * this.nextRetryBackoffSec * 1e3;
      const maxBackoffSec = Number(retryPolicy.maxBackoff.substring(0, retryPolicy.maxBackoff.length - 1));
      this.nextRetryBackoffSec = Math.min(this.nextRetryBackoffSec * retryPolicy.backoffMultiplier, maxBackoffSec);
      return nextBackoffMs;
    }
    maybeRetryCall(pushback, callback) {
      if (this.state !== "RETRY") {
        callback(false);
        return;
      }
      if (this.attempts >= this.maxAttempts) {
        callback(false);
        return;
      }
      let retryDelayMs;
      if (pushback === null) {
        retryDelayMs = this.getNextRetryBackoffMs();
      } else if (pushback < 0) {
        this.state = "TRANSPARENT_ONLY";
        callback(false);
        return;
      } else {
        retryDelayMs = pushback;
        this.nextRetryBackoffSec = this.initialRetryBackoffSec;
      }
      setTimeout(() => {
        var _a, _b;
        if (this.state !== "RETRY") {
          callback(false);
          return;
        }
        if ((_b = (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.canRetryCall()) !== null && _b !== void 0 ? _b : true) {
          callback(true);
          this.attempts += 1;
          this.startNewAttempt();
        } else {
          this.trace("Retry attempt denied by throttling policy");
          callback(false);
        }
      }, retryDelayMs);
    }
    countActiveCalls() {
      let count = 0;
      for (const call2 of this.underlyingCalls) {
        if ((call2 === null || call2 === void 0 ? void 0 : call2.state) === "ACTIVE") {
          count += 1;
        }
      }
      return count;
    }
    handleProcessedStatus(status, callIndex, pushback) {
      var _a, _b, _c;
      switch (this.state) {
        case "COMMITTED":
        case "NO_RETRY":
        case "TRANSPARENT_ONLY":
          this.commitCall(callIndex);
          this.reportStatus(status);
          break;
        case "HEDGING":
          if (this.isStatusCodeInList((_a = this.callConfig.methodConfig.hedgingPolicy.nonFatalStatusCodes) !== null && _a !== void 0 ? _a : [], status.code)) {
            (_b = this.retryThrottler) === null || _b === void 0 ? void 0 : _b.addCallFailed();
            let delayMs;
            if (pushback === null) {
              delayMs = 0;
            } else if (pushback < 0) {
              this.state = "TRANSPARENT_ONLY";
              this.commitCall(callIndex);
              this.reportStatus(status);
              return;
            } else {
              delayMs = pushback;
            }
            setTimeout(() => {
              this.maybeStartHedgingAttempt();
              if (this.countActiveCalls() === 0) {
                this.commitCall(callIndex);
                this.reportStatus(status);
              }
            }, delayMs);
          } else {
            this.commitCall(callIndex);
            this.reportStatus(status);
          }
          break;
        case "RETRY":
          if (this.isStatusCodeInList(this.callConfig.methodConfig.retryPolicy.retryableStatusCodes, status.code)) {
            (_c = this.retryThrottler) === null || _c === void 0 ? void 0 : _c.addCallFailed();
            this.maybeRetryCall(pushback, (retried) => {
              if (!retried) {
                this.commitCall(callIndex);
                this.reportStatus(status);
              }
            });
          } else {
            this.commitCall(callIndex);
            this.reportStatus(status);
          }
          break;
      }
    }
    getPushback(metadata2) {
      const mdValue = metadata2.get("grpc-retry-pushback-ms");
      if (mdValue.length === 0) {
        return null;
      }
      try {
        return parseInt(mdValue[0]);
      } catch (e) {
        return -1;
      }
    }
    handleChildStatus(status, callIndex) {
      var _a;
      if (this.underlyingCalls[callIndex].state === "COMPLETED") {
        return;
      }
      this.trace("state=" + this.state + " handling status with progress " + status.progress + " from child [" + this.underlyingCalls[callIndex].call.getCallNumber() + "] in state " + this.underlyingCalls[callIndex].state);
      this.underlyingCalls[callIndex].state = "COMPLETED";
      if (status.code === constants_1.Status.OK) {
        (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.addCallSucceeded();
        this.commitCall(callIndex);
        this.reportStatus(status);
        return;
      }
      if (this.state === "NO_RETRY") {
        this.commitCall(callIndex);
        this.reportStatus(status);
        return;
      }
      if (this.state === "COMMITTED") {
        this.reportStatus(status);
        return;
      }
      const pushback = this.getPushback(status.metadata);
      switch (status.progress) {
        case "NOT_STARTED":
          this.startNewAttempt();
          break;
        case "REFUSED":
          if (this.transparentRetryUsed) {
            this.handleProcessedStatus(status, callIndex, pushback);
          } else {
            this.transparentRetryUsed = true;
            this.startNewAttempt();
          }
          break;
        case "DROP":
          this.commitCall(callIndex);
          this.reportStatus(status);
          break;
        case "PROCESSED":
          this.handleProcessedStatus(status, callIndex, pushback);
          break;
      }
    }
    maybeStartHedgingAttempt() {
      if (this.state !== "HEDGING") {
        return;
      }
      if (!this.callConfig.methodConfig.hedgingPolicy) {
        return;
      }
      if (this.attempts >= this.maxAttempts) {
        return;
      }
      this.attempts += 1;
      this.startNewAttempt();
      this.maybeStartHedgingTimer();
    }
    maybeStartHedgingTimer() {
      var _a, _b, _c;
      if (this.hedgingTimer) {
        clearTimeout(this.hedgingTimer);
      }
      if (this.state !== "HEDGING") {
        return;
      }
      if (!this.callConfig.methodConfig.hedgingPolicy) {
        return;
      }
      const hedgingPolicy = this.callConfig.methodConfig.hedgingPolicy;
      if (this.attempts >= this.maxAttempts) {
        return;
      }
      const hedgingDelayString = (_a = hedgingPolicy.hedgingDelay) !== null && _a !== void 0 ? _a : "0s";
      const hedgingDelaySec = Number(hedgingDelayString.substring(0, hedgingDelayString.length - 1));
      this.hedgingTimer = setTimeout(() => {
        this.maybeStartHedgingAttempt();
      }, hedgingDelaySec * 1e3);
      (_c = (_b = this.hedgingTimer).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    startNewAttempt() {
      const child = this.channel.createLoadBalancingCall(this.callConfig, this.methodName, this.host, this.credentials, this.deadline);
      this.trace("Created child call [" + child.getCallNumber() + "] for attempt " + this.attempts);
      const index = this.underlyingCalls.length;
      this.underlyingCalls.push({
        state: "ACTIVE",
        call: child,
        nextMessageToSend: 0,
        startTime: /* @__PURE__ */ new Date()
      });
      const previousAttempts = this.attempts - 1;
      const initialMetadata = this.initialMetadata.clone();
      if (previousAttempts > 0) {
        initialMetadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
      }
      let receivedMetadata = false;
      child.start(initialMetadata, {
        onReceiveMetadata: (metadata2) => {
          this.trace("Received metadata from child [" + child.getCallNumber() + "]");
          this.commitCall(index);
          receivedMetadata = true;
          if (previousAttempts > 0) {
            metadata2.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
          }
          if (this.underlyingCalls[index].state === "ACTIVE") {
            this.listener.onReceiveMetadata(metadata2);
          }
        },
        onReceiveMessage: (message) => {
          this.trace("Received message from child [" + child.getCallNumber() + "]");
          this.commitCall(index);
          if (this.underlyingCalls[index].state === "ACTIVE") {
            this.listener.onReceiveMessage(message);
          }
        },
        onReceiveStatus: (status) => {
          this.trace("Received status from child [" + child.getCallNumber() + "]");
          if (!receivedMetadata && previousAttempts > 0) {
            status.metadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
          }
          this.handleChildStatus(status, index);
        }
      });
      this.sendNextChildMessage(index);
      if (this.readStarted) {
        child.startRead();
      }
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.listener = listener;
      this.initialMetadata = metadata2;
      this.attempts += 1;
      this.startNewAttempt();
      this.maybeStartHedgingTimer();
    }
    handleChildWriteCompleted(childIndex, messageIndex) {
      var _a, _b;
      (_b = (_a = this.getBufferEntry(messageIndex)).callback) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.clearSentMessages();
      const childCall = this.underlyingCalls[childIndex];
      childCall.nextMessageToSend += 1;
      this.sendNextChildMessage(childIndex);
    }
    sendNextChildMessage(childIndex) {
      const childCall = this.underlyingCalls[childIndex];
      if (childCall.state === "COMPLETED") {
        return;
      }
      const messageIndex = childCall.nextMessageToSend;
      if (this.getBufferEntry(messageIndex)) {
        const bufferEntry = this.getBufferEntry(messageIndex);
        switch (bufferEntry.entryType) {
          case "MESSAGE":
            childCall.call.sendMessageWithContext({
              callback: (error2) => {
                this.handleChildWriteCompleted(childIndex, messageIndex);
              }
            }, bufferEntry.message.message);
            const nextEntry = this.getBufferEntry(messageIndex + 1);
            if (nextEntry.entryType === "HALF_CLOSE") {
              this.trace("Sending halfClose immediately after message to child [" + childCall.call.getCallNumber() + "] - optimizing for unary/final message");
              childCall.nextMessageToSend += 1;
              childCall.call.halfClose();
            }
            break;
          case "HALF_CLOSE":
            childCall.nextMessageToSend += 1;
            childCall.call.halfClose();
            break;
        }
      }
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      const writeObj = {
        message,
        flags: context.flags
      };
      const messageIndex = this.getNextBufferIndex();
      const bufferEntry = {
        entryType: "MESSAGE",
        message: writeObj,
        allocated: this.bufferTracker.allocate(message.length, this.callNumber)
      };
      this.writeBuffer.push(bufferEntry);
      if (bufferEntry.allocated) {
        process.nextTick(() => {
          var _a;
          (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
        });
        for (const [callIndex, call2] of this.underlyingCalls.entries()) {
          if (call2.state === "ACTIVE" && call2.nextMessageToSend === messageIndex) {
            call2.call.sendMessageWithContext({
              callback: (error2) => {
                this.handleChildWriteCompleted(callIndex, messageIndex);
              }
            }, message);
          }
        }
      } else {
        this.commitCallWithMostMessages();
        if (this.committedCallIndex === null) {
          return;
        }
        const call2 = this.underlyingCalls[this.committedCallIndex];
        bufferEntry.callback = context.callback;
        if (call2.state === "ACTIVE" && call2.nextMessageToSend === messageIndex) {
          call2.call.sendMessageWithContext({
            callback: (error2) => {
              this.handleChildWriteCompleted(this.committedCallIndex, messageIndex);
            }
          }, message);
        }
      }
    }
    startRead() {
      this.trace("startRead called");
      this.readStarted = true;
      for (const underlyingCall of this.underlyingCalls) {
        if ((underlyingCall === null || underlyingCall === void 0 ? void 0 : underlyingCall.state) === "ACTIVE") {
          underlyingCall.call.startRead();
        }
      }
    }
    halfClose() {
      this.trace("halfClose called");
      const halfCloseIndex = this.getNextBufferIndex();
      this.writeBuffer.push({
        entryType: "HALF_CLOSE",
        allocated: false
      });
      for (const call2 of this.underlyingCalls) {
        if ((call2 === null || call2 === void 0 ? void 0 : call2.state) === "ACTIVE") {
          if (call2.nextMessageToSend === halfCloseIndex || call2.nextMessageToSend === halfCloseIndex - 1) {
            this.trace("Sending halfClose immediately to child [" + call2.call.getCallNumber() + "] - all messages already sent");
            call2.nextMessageToSend += 1;
            call2.call.halfClose();
          }
        }
      }
    }
    setCredentials(newCredentials) {
      throw new Error("Method not implemented.");
    }
    getMethod() {
      return this.methodName;
    }
    getHost() {
      return this.host;
    }
    getAuthContext() {
      if (this.committedCallIndex !== null) {
        return this.underlyingCalls[this.committedCallIndex].call.getAuthContext();
      } else {
        return null;
      }
    }
  }
  retryingCall$1.RetryingCall = RetryingCall;
  return retryingCall$1;
}
var subchannelInterface$1 = {};
var hasRequiredSubchannelInterface$1;
function requireSubchannelInterface$1() {
  if (hasRequiredSubchannelInterface$1) return subchannelInterface$1;
  hasRequiredSubchannelInterface$1 = 1;
  Object.defineProperty(subchannelInterface$1, "__esModule", { value: true });
  subchannelInterface$1.BaseSubchannelWrapper = void 0;
  class BaseSubchannelWrapper {
    constructor(child) {
      this.child = child;
      this.healthy = true;
      this.healthListeners = /* @__PURE__ */ new Set();
      this.refcount = 0;
      this.dataWatchers = /* @__PURE__ */ new Set();
      child.addHealthStateWatcher((childHealthy) => {
        if (this.healthy) {
          this.updateHealthListeners();
        }
      });
    }
    updateHealthListeners() {
      for (const listener of this.healthListeners) {
        listener(this.isHealthy());
      }
    }
    getConnectivityState() {
      return this.child.getConnectivityState();
    }
    addConnectivityStateListener(listener) {
      this.child.addConnectivityStateListener(listener);
    }
    removeConnectivityStateListener(listener) {
      this.child.removeConnectivityStateListener(listener);
    }
    startConnecting() {
      this.child.startConnecting();
    }
    getAddress() {
      return this.child.getAddress();
    }
    throttleKeepalive(newKeepaliveTime) {
      this.child.throttleKeepalive(newKeepaliveTime);
    }
    ref() {
      this.child.ref();
      this.refcount += 1;
    }
    unref() {
      this.child.unref();
      this.refcount -= 1;
      if (this.refcount === 0) {
        this.destroy();
      }
    }
    destroy() {
      for (const watcher of this.dataWatchers) {
        watcher.destroy();
      }
    }
    getChannelzRef() {
      return this.child.getChannelzRef();
    }
    isHealthy() {
      return this.healthy && this.child.isHealthy();
    }
    addHealthStateWatcher(listener) {
      this.healthListeners.add(listener);
    }
    removeHealthStateWatcher(listener) {
      this.healthListeners.delete(listener);
    }
    addDataWatcher(dataWatcher) {
      dataWatcher.setSubchannel(this.getRealSubchannel());
      this.dataWatchers.add(dataWatcher);
    }
    setHealthy(healthy) {
      if (healthy !== this.healthy) {
        this.healthy = healthy;
        if (this.child.isHealthy()) {
          this.updateHealthListeners();
        }
      }
    }
    getRealSubchannel() {
      return this.child.getRealSubchannel();
    }
    realSubchannelEquals(other) {
      return this.getRealSubchannel() === other.getRealSubchannel();
    }
    getCallCredentials() {
      return this.child.getCallCredentials();
    }
    getChannel() {
      return this.child.getChannel();
    }
  }
  subchannelInterface$1.BaseSubchannelWrapper = BaseSubchannelWrapper;
  return subchannelInterface$1;
}
var hasRequiredInternalChannel$1;
function requireInternalChannel$1() {
  if (hasRequiredInternalChannel$1) return internalChannel$1;
  hasRequiredInternalChannel$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalChannel = exports.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = void 0;
    const channel_credentials_1 = requireChannelCredentials$1();
    const resolving_load_balancer_1 = requireResolvingLoadBalancer$1();
    const subchannel_pool_1 = requireSubchannelPool$1();
    const picker_1 = requirePicker$1();
    const metadata_1 = requireMetadata$1();
    const constants_1 = requireConstants$1();
    const filter_stack_1 = requireFilterStack$1();
    const compression_filter_1 = requireCompressionFilter$1();
    const resolver_1 = requireResolver$1();
    const logging_1 = requireLogging$1();
    const http_proxy_1 = requireHttp_proxy$1();
    const uri_parser_1 = requireUriParser$1();
    const connectivity_state_1 = requireConnectivityState$1();
    const channelz_1 = requireChannelz$1();
    const load_balancing_call_1 = requireLoadBalancingCall$1();
    const deadline_1 = requireDeadline$1();
    const resolving_call_1 = requireResolvingCall$1();
    const call_number_1 = requireCallNumber$1();
    const control_plane_status_1 = requireControlPlaneStatus$1();
    const retrying_call_1 = requireRetryingCall$1();
    const subchannel_interface_1 = requireSubchannelInterface$1();
    const MAX_TIMEOUT_TIME = 2147483647;
    const MIN_IDLE_TIMEOUT_MS = 1e3;
    const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1e3;
    const RETRY_THROTTLER_MAP = /* @__PURE__ */ new Map();
    const DEFAULT_RETRY_BUFFER_SIZE_BYTES = 1 << 24;
    const DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES = 1 << 20;
    class ChannelSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
      constructor(childSubchannel, channel2) {
        super(childSubchannel);
        this.channel = channel2;
        this.refCount = 0;
        this.subchannelStateListener = (subchannel2, previousState, newState, keepaliveTime) => {
          channel2.throttleKeepalive(keepaliveTime);
        };
      }
      ref() {
        if (this.refCount === 0) {
          this.child.addConnectivityStateListener(this.subchannelStateListener);
          this.channel.addWrappedSubchannel(this);
        }
        this.child.ref();
        this.refCount += 1;
      }
      unref() {
        this.child.unref();
        this.refCount -= 1;
        if (this.refCount <= 0) {
          this.child.removeConnectivityStateListener(this.subchannelStateListener);
          this.channel.removeWrappedSubchannel(this);
        }
      }
    }
    class ShutdownPicker {
      pick(pickArgs) {
        return {
          pickResultType: picker_1.PickResultType.DROP,
          status: {
            code: constants_1.Status.UNAVAILABLE,
            details: "Channel closed before call started",
            metadata: new metadata_1.Metadata()
          },
          subchannel: null,
          onCallStarted: null,
          onCallEnded: null
        };
      }
    }
    exports.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = "grpc.internal.no_subchannel";
    class ChannelzInfoTracker {
      constructor(target) {
        this.target = target;
        this.trace = new channelz_1.ChannelzTrace();
        this.callTracker = new channelz_1.ChannelzCallTracker();
        this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
        this.state = connectivity_state_1.ConnectivityState.IDLE;
      }
      getChannelzInfoCallback() {
        return () => {
          return {
            target: this.target,
            state: this.state,
            trace: this.trace,
            callTracker: this.callTracker,
            children: this.childrenTracker.getChildLists()
          };
        };
      }
    }
    class InternalChannel {
      constructor(target, credentials, options) {
        var _a, _b, _c, _d, _e, _f;
        this.credentials = credentials;
        this.options = options;
        this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
        this.currentPicker = new picker_1.UnavailablePicker();
        this.configSelectionQueue = [];
        this.pickQueue = [];
        this.connectivityStateWatchers = [];
        this.callRefTimer = null;
        this.configSelector = null;
        this.currentResolutionError = null;
        this.wrappedSubchannels = /* @__PURE__ */ new Set();
        this.callCount = 0;
        this.idleTimer = null;
        this.channelzEnabled = true;
        this.randomChannelId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        if (typeof target !== "string") {
          throw new TypeError("Channel target must be a string");
        }
        if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
          throw new TypeError("Channel credentials must be a ChannelCredentials object");
        }
        if (options) {
          if (typeof options !== "object") {
            throw new TypeError("Channel options must be an object");
          }
        }
        this.channelzInfoTracker = new ChannelzInfoTracker(target);
        const originalTargetUri = (0, uri_parser_1.parseUri)(target);
        if (originalTargetUri === null) {
          throw new Error(`Could not parse target name "${target}"`);
        }
        const defaultSchemeMapResult = (0, resolver_1.mapUriDefaultScheme)(originalTargetUri);
        if (defaultSchemeMapResult === null) {
          throw new Error(`Could not find a default scheme for target name "${target}"`);
        }
        if (this.options["grpc.enable_channelz"] === 0) {
          this.channelzEnabled = false;
        }
        this.channelzRef = (0, channelz_1.registerChannelzChannel)(target, this.channelzInfoTracker.getChannelzInfoCallback(), this.channelzEnabled);
        if (this.channelzEnabled) {
          this.channelzInfoTracker.trace.addTrace("CT_INFO", "Channel created");
        }
        if (this.options["grpc.default_authority"]) {
          this.defaultAuthority = this.options["grpc.default_authority"];
        } else {
          this.defaultAuthority = (0, resolver_1.getDefaultAuthority)(defaultSchemeMapResult);
        }
        const proxyMapResult = (0, http_proxy_1.mapProxyName)(defaultSchemeMapResult, options);
        this.target = proxyMapResult.target;
        this.options = Object.assign({}, this.options, proxyMapResult.extraOptions);
        this.subchannelPool = (0, subchannel_pool_1.getSubchannelPool)(((_a = this.options["grpc.use_local_subchannel_pool"]) !== null && _a !== void 0 ? _a : 0) === 0);
        this.retryBufferTracker = new retrying_call_1.MessageBufferTracker((_b = this.options["grpc.retry_buffer_size"]) !== null && _b !== void 0 ? _b : DEFAULT_RETRY_BUFFER_SIZE_BYTES, (_c = this.options["grpc.per_rpc_retry_buffer_size"]) !== null && _c !== void 0 ? _c : DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES);
        this.keepaliveTime = (_d = this.options["grpc.keepalive_time_ms"]) !== null && _d !== void 0 ? _d : -1;
        this.idleTimeoutMs = Math.max((_e = this.options["grpc.client_idle_timeout_ms"]) !== null && _e !== void 0 ? _e : DEFAULT_IDLE_TIMEOUT_MS, MIN_IDLE_TIMEOUT_MS);
        const channelControlHelper = {
          createSubchannel: (subchannelAddress2, subchannelArgs) => {
            const finalSubchannelArgs = {};
            for (const [key, value] of Object.entries(subchannelArgs)) {
              if (!key.startsWith(exports.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX)) {
                finalSubchannelArgs[key] = value;
              }
            }
            const subchannel2 = this.subchannelPool.getOrCreateSubchannel(this.target, subchannelAddress2, finalSubchannelArgs, this.credentials);
            subchannel2.throttleKeepalive(this.keepaliveTime);
            if (this.channelzEnabled) {
              this.channelzInfoTracker.trace.addTrace("CT_INFO", "Created subchannel or used existing subchannel", subchannel2.getChannelzRef());
            }
            const wrappedSubchannel = new ChannelSubchannelWrapper(subchannel2, this);
            return wrappedSubchannel;
          },
          updateState: (connectivityState2, picker2) => {
            this.currentPicker = picker2;
            const queueCopy = this.pickQueue.slice();
            this.pickQueue = [];
            if (queueCopy.length > 0) {
              this.callRefTimerUnref();
            }
            for (const call2 of queueCopy) {
              call2.doPick();
            }
            this.updateState(connectivityState2);
          },
          requestReresolution: () => {
            throw new Error("Resolving load balancer should never call requestReresolution");
          },
          addChannelzChild: (child) => {
            if (this.channelzEnabled) {
              this.channelzInfoTracker.childrenTracker.refChild(child);
            }
          },
          removeChannelzChild: (child) => {
            if (this.channelzEnabled) {
              this.channelzInfoTracker.childrenTracker.unrefChild(child);
            }
          }
        };
        this.resolvingLoadBalancer = new resolving_load_balancer_1.ResolvingLoadBalancer(this.target, channelControlHelper, this.options, (serviceConfig2, configSelector) => {
          var _a2;
          if (serviceConfig2.retryThrottling) {
            RETRY_THROTTLER_MAP.set(this.getTarget(), new retrying_call_1.RetryThrottler(serviceConfig2.retryThrottling.maxTokens, serviceConfig2.retryThrottling.tokenRatio, RETRY_THROTTLER_MAP.get(this.getTarget())));
          } else {
            RETRY_THROTTLER_MAP.delete(this.getTarget());
          }
          if (this.channelzEnabled) {
            this.channelzInfoTracker.trace.addTrace("CT_INFO", "Address resolution succeeded");
          }
          (_a2 = this.configSelector) === null || _a2 === void 0 ? void 0 : _a2.unref();
          this.configSelector = configSelector;
          this.currentResolutionError = null;
          process.nextTick(() => {
            const localQueue = this.configSelectionQueue;
            this.configSelectionQueue = [];
            if (localQueue.length > 0) {
              this.callRefTimerUnref();
            }
            for (const call2 of localQueue) {
              call2.getConfig();
            }
          });
        }, (status) => {
          if (this.channelzEnabled) {
            this.channelzInfoTracker.trace.addTrace("CT_WARNING", "Address resolution failed with code " + status.code + ' and details "' + status.details + '"');
          }
          if (this.configSelectionQueue.length > 0) {
            this.trace("Name resolution failed with calls queued for config selection");
          }
          if (this.configSelector === null) {
            this.currentResolutionError = Object.assign(Object.assign({}, (0, control_plane_status_1.restrictControlPlaneStatusCode)(status.code, status.details)), { metadata: status.metadata });
          }
          const localQueue = this.configSelectionQueue;
          this.configSelectionQueue = [];
          if (localQueue.length > 0) {
            this.callRefTimerUnref();
          }
          for (const call2 of localQueue) {
            call2.reportResolverError(status);
          }
        });
        this.filterStackFactory = new filter_stack_1.FilterStackFactory([
          new compression_filter_1.CompressionFilterFactory(this, this.options)
        ]);
        this.trace("Channel constructed with options " + JSON.stringify(options, void 0, 2));
        const error2 = new Error();
        if ((0, logging_1.isTracerEnabled)("channel_stacktrace")) {
          (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "channel_stacktrace", "(" + this.channelzRef.id + ") Channel constructed \n" + ((_f = error2.stack) === null || _f === void 0 ? void 0 : _f.substring(error2.stack.indexOf("\n") + 1)));
        }
        this.lastActivityTimestamp = /* @__PURE__ */ new Date();
      }
      trace(text, verbosityOverride) {
        (0, logging_1.trace)(verbosityOverride !== null && verbosityOverride !== void 0 ? verbosityOverride : constants_1.LogVerbosity.DEBUG, "channel", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + text);
      }
      callRefTimerRef() {
        var _a, _b, _c, _d;
        if (!this.callRefTimer) {
          this.callRefTimer = setInterval(() => {
          }, MAX_TIMEOUT_TIME);
        }
        if (!((_b = (_a = this.callRefTimer).hasRef) === null || _b === void 0 ? void 0 : _b.call(_a))) {
          this.trace("callRefTimer.ref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
          (_d = (_c = this.callRefTimer).ref) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
      }
      callRefTimerUnref() {
        var _a, _b, _c;
        if (!((_a = this.callRefTimer) === null || _a === void 0 ? void 0 : _a.hasRef) || this.callRefTimer.hasRef()) {
          this.trace("callRefTimer.unref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
          (_c = (_b = this.callRefTimer) === null || _b === void 0 ? void 0 : _b.unref) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
      }
      removeConnectivityStateWatcher(watcherObject) {
        const watcherIndex = this.connectivityStateWatchers.findIndex((value) => value === watcherObject);
        if (watcherIndex >= 0) {
          this.connectivityStateWatchers.splice(watcherIndex, 1);
        }
      }
      updateState(newState) {
        (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "connectivity_state", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        if (this.channelzEnabled) {
          this.channelzInfoTracker.trace.addTrace("CT_INFO", "Connectivity state change to " + connectivity_state_1.ConnectivityState[newState]);
        }
        this.connectivityState = newState;
        this.channelzInfoTracker.state = newState;
        const watchersCopy = this.connectivityStateWatchers.slice();
        for (const watcherObject of watchersCopy) {
          if (newState !== watcherObject.currentState) {
            if (watcherObject.timer) {
              clearTimeout(watcherObject.timer);
            }
            this.removeConnectivityStateWatcher(watcherObject);
            watcherObject.callback();
          }
        }
        if (newState !== connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
          this.currentResolutionError = null;
        }
      }
      throttleKeepalive(newKeepaliveTime) {
        if (newKeepaliveTime > this.keepaliveTime) {
          this.keepaliveTime = newKeepaliveTime;
          for (const wrappedSubchannel of this.wrappedSubchannels) {
            wrappedSubchannel.throttleKeepalive(newKeepaliveTime);
          }
        }
      }
      addWrappedSubchannel(wrappedSubchannel) {
        this.wrappedSubchannels.add(wrappedSubchannel);
      }
      removeWrappedSubchannel(wrappedSubchannel) {
        this.wrappedSubchannels.delete(wrappedSubchannel);
      }
      doPick(metadata2, extraPickInfo) {
        return this.currentPicker.pick({
          metadata: metadata2,
          extraPickInfo
        });
      }
      queueCallForPick(call2) {
        this.pickQueue.push(call2);
        this.callRefTimerRef();
      }
      getConfig(method, metadata2) {
        if (this.connectivityState !== connectivity_state_1.ConnectivityState.SHUTDOWN) {
          this.resolvingLoadBalancer.exitIdle();
        }
        if (this.configSelector) {
          return {
            type: "SUCCESS",
            config: this.configSelector.invoke(method, metadata2, this.randomChannelId)
          };
        } else {
          if (this.currentResolutionError) {
            return {
              type: "ERROR",
              error: this.currentResolutionError
            };
          } else {
            return {
              type: "NONE"
            };
          }
        }
      }
      queueCallForConfig(call2) {
        this.configSelectionQueue.push(call2);
        this.callRefTimerRef();
      }
      enterIdle() {
        this.resolvingLoadBalancer.destroy();
        this.updateState(connectivity_state_1.ConnectivityState.IDLE);
        this.currentPicker = new picker_1.QueuePicker(this.resolvingLoadBalancer);
        if (this.idleTimer) {
          clearTimeout(this.idleTimer);
          this.idleTimer = null;
        }
        if (this.callRefTimer) {
          clearInterval(this.callRefTimer);
          this.callRefTimer = null;
        }
      }
      startIdleTimeout(timeoutMs) {
        var _a, _b;
        this.idleTimer = setTimeout(() => {
          if (this.callCount > 0) {
            this.startIdleTimeout(this.idleTimeoutMs);
            return;
          }
          const now = /* @__PURE__ */ new Date();
          const timeSinceLastActivity = now.valueOf() - this.lastActivityTimestamp.valueOf();
          if (timeSinceLastActivity >= this.idleTimeoutMs) {
            this.trace("Idle timer triggered after " + this.idleTimeoutMs + "ms of inactivity");
            this.enterIdle();
          } else {
            this.startIdleTimeout(this.idleTimeoutMs - timeSinceLastActivity);
          }
        }, timeoutMs);
        (_b = (_a = this.idleTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
      maybeStartIdleTimer() {
        if (this.connectivityState !== connectivity_state_1.ConnectivityState.SHUTDOWN && !this.idleTimer) {
          this.startIdleTimeout(this.idleTimeoutMs);
        }
      }
      onCallStart() {
        if (this.channelzEnabled) {
          this.channelzInfoTracker.callTracker.addCallStarted();
        }
        this.callCount += 1;
      }
      onCallEnd(status) {
        if (this.channelzEnabled) {
          if (status.code === constants_1.Status.OK) {
            this.channelzInfoTracker.callTracker.addCallSucceeded();
          } else {
            this.channelzInfoTracker.callTracker.addCallFailed();
          }
        }
        this.callCount -= 1;
        this.lastActivityTimestamp = /* @__PURE__ */ new Date();
        this.maybeStartIdleTimer();
      }
      createLoadBalancingCall(callConfig, method, host, credentials, deadline2) {
        const callNumber2 = (0, call_number_1.getNextCallNumber)();
        this.trace("createLoadBalancingCall [" + callNumber2 + '] method="' + method + '"');
        return new load_balancing_call_1.LoadBalancingCall(this, callConfig, method, host, credentials, deadline2, callNumber2);
      }
      createRetryingCall(callConfig, method, host, credentials, deadline2) {
        const callNumber2 = (0, call_number_1.getNextCallNumber)();
        this.trace("createRetryingCall [" + callNumber2 + '] method="' + method + '"');
        return new retrying_call_1.RetryingCall(this, callConfig, method, host, credentials, deadline2, callNumber2, this.retryBufferTracker, RETRY_THROTTLER_MAP.get(this.getTarget()));
      }
      createResolvingCall(method, deadline2, host, parentCall, propagateFlags) {
        const callNumber2 = (0, call_number_1.getNextCallNumber)();
        this.trace("createResolvingCall [" + callNumber2 + '] method="' + method + '", deadline=' + (0, deadline_1.deadlineToString)(deadline2));
        const finalOptions = {
          deadline: deadline2,
          flags: propagateFlags !== null && propagateFlags !== void 0 ? propagateFlags : constants_1.Propagate.DEFAULTS,
          host: host !== null && host !== void 0 ? host : this.defaultAuthority,
          parentCall
        };
        const call2 = new resolving_call_1.ResolvingCall(this, method, finalOptions, this.filterStackFactory.clone(), callNumber2);
        this.onCallStart();
        call2.addStatusWatcher((status) => {
          this.onCallEnd(status);
        });
        return call2;
      }
      close() {
        var _a;
        this.resolvingLoadBalancer.destroy();
        this.updateState(connectivity_state_1.ConnectivityState.SHUTDOWN);
        this.currentPicker = new ShutdownPicker();
        for (const call2 of this.configSelectionQueue) {
          call2.cancelWithStatus(constants_1.Status.UNAVAILABLE, "Channel closed before call started");
        }
        this.configSelectionQueue = [];
        for (const call2 of this.pickQueue) {
          call2.cancelWithStatus(constants_1.Status.UNAVAILABLE, "Channel closed before call started");
        }
        this.pickQueue = [];
        if (this.callRefTimer) {
          clearInterval(this.callRefTimer);
        }
        if (this.idleTimer) {
          clearTimeout(this.idleTimer);
        }
        if (this.channelzEnabled) {
          (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        }
        this.subchannelPool.unrefUnusedSubchannels();
        (_a = this.configSelector) === null || _a === void 0 ? void 0 : _a.unref();
        this.configSelector = null;
      }
      getTarget() {
        return (0, uri_parser_1.uriToString)(this.target);
      }
      getConnectivityState(tryToConnect) {
        const connectivityState2 = this.connectivityState;
        if (tryToConnect) {
          this.resolvingLoadBalancer.exitIdle();
          this.lastActivityTimestamp = /* @__PURE__ */ new Date();
          this.maybeStartIdleTimer();
        }
        return connectivityState2;
      }
      watchConnectivityState(currentState, deadline2, callback) {
        if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
          throw new Error("Channel has been shut down");
        }
        let timer = null;
        if (deadline2 !== Infinity) {
          const deadlineDate = deadline2 instanceof Date ? deadline2 : new Date(deadline2);
          const now = /* @__PURE__ */ new Date();
          if (deadline2 === -Infinity || deadlineDate <= now) {
            process.nextTick(callback, new Error("Deadline passed without connectivity state change"));
            return;
          }
          timer = setTimeout(() => {
            this.removeConnectivityStateWatcher(watcherObject);
            callback(new Error("Deadline passed without connectivity state change"));
          }, deadlineDate.getTime() - now.getTime());
        }
        const watcherObject = {
          currentState,
          callback,
          timer
        };
        this.connectivityStateWatchers.push(watcherObject);
      }
      /**
       * Get the channelz reference object for this channel. The returned value is
       * garbage if channelz is disabled for this channel.
       * @returns
       */
      getChannelzRef() {
        return this.channelzRef;
      }
      createCall(method, deadline2, host, parentCall, propagateFlags) {
        if (typeof method !== "string") {
          throw new TypeError("Channel#createCall: method must be a string");
        }
        if (!(typeof deadline2 === "number" || deadline2 instanceof Date)) {
          throw new TypeError("Channel#createCall: deadline must be a number or Date");
        }
        if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
          throw new Error("Channel has been shut down");
        }
        return this.createResolvingCall(method, deadline2, host, parentCall, propagateFlags);
      }
      getOptions() {
        return this.options;
      }
    }
    exports.InternalChannel = InternalChannel;
  })(internalChannel$1);
  return internalChannel$1;
}
var hasRequiredChannel$1;
function requireChannel$1() {
  if (hasRequiredChannel$1) return channel$1;
  hasRequiredChannel$1 = 1;
  Object.defineProperty(channel$1, "__esModule", { value: true });
  channel$1.ChannelImplementation = void 0;
  const channel_credentials_1 = requireChannelCredentials$1();
  const internal_channel_1 = requireInternalChannel$1();
  class ChannelImplementation {
    constructor(target, credentials, options) {
      if (typeof target !== "string") {
        throw new TypeError("Channel target must be a string");
      }
      if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
        throw new TypeError("Channel credentials must be a ChannelCredentials object");
      }
      if (options) {
        if (typeof options !== "object") {
          throw new TypeError("Channel options must be an object");
        }
      }
      this.internalChannel = new internal_channel_1.InternalChannel(target, credentials, options);
    }
    close() {
      this.internalChannel.close();
    }
    getTarget() {
      return this.internalChannel.getTarget();
    }
    getConnectivityState(tryToConnect) {
      return this.internalChannel.getConnectivityState(tryToConnect);
    }
    watchConnectivityState(currentState, deadline2, callback) {
      this.internalChannel.watchConnectivityState(currentState, deadline2, callback);
    }
    /**
     * Get the channelz reference object for this channel. The returned value is
     * garbage if channelz is disabled for this channel.
     * @returns
     */
    getChannelzRef() {
      return this.internalChannel.getChannelzRef();
    }
    createCall(method, deadline2, host, parentCall, propagateFlags) {
      if (typeof method !== "string") {
        throw new TypeError("Channel#createCall: method must be a string");
      }
      if (!(typeof deadline2 === "number" || deadline2 instanceof Date)) {
        throw new TypeError("Channel#createCall: deadline must be a number or Date");
      }
      return this.internalChannel.createCall(method, deadline2, host, parentCall, propagateFlags);
    }
  }
  channel$1.ChannelImplementation = ChannelImplementation;
  return channel$1;
}
var server$1 = {};
var serverCall$1 = {};
var hasRequiredServerCall$1;
function requireServerCall$1() {
  if (hasRequiredServerCall$1) return serverCall$1;
  hasRequiredServerCall$1 = 1;
  Object.defineProperty(serverCall$1, "__esModule", { value: true });
  serverCall$1.ServerDuplexStreamImpl = serverCall$1.ServerWritableStreamImpl = serverCall$1.ServerReadableStreamImpl = serverCall$1.ServerUnaryCallImpl = void 0;
  serverCall$1.serverErrorToStatus = serverErrorToStatus;
  const events_1 = require$$0$2;
  const stream_1 = require$$0$3;
  const constants_1 = requireConstants$1();
  const metadata_1 = requireMetadata$1();
  function serverErrorToStatus(error2, overrideTrailers) {
    var _a;
    const status = {
      code: constants_1.Status.UNKNOWN,
      details: "message" in error2 ? error2.message : "Unknown Error",
      metadata: (_a = overrideTrailers !== null && overrideTrailers !== void 0 ? overrideTrailers : error2.metadata) !== null && _a !== void 0 ? _a : null
    };
    if ("code" in error2 && typeof error2.code === "number" && Number.isInteger(error2.code)) {
      status.code = error2.code;
      if ("details" in error2 && typeof error2.details === "string") {
        status.details = error2.details;
      }
    }
    return status;
  }
  class ServerUnaryCallImpl extends events_1.EventEmitter {
    constructor(path, call2, metadata2, request) {
      super();
      this.path = path;
      this.call = call2;
      this.metadata = metadata2;
      this.request = request;
      this.cancelled = false;
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.path;
    }
    getHost() {
      return this.call.getHost();
    }
    getAuthContext() {
      return this.call.getAuthContext();
    }
    getMetricsRecorder() {
      return this.call.getMetricsRecorder();
    }
  }
  serverCall$1.ServerUnaryCallImpl = ServerUnaryCallImpl;
  class ServerReadableStreamImpl extends stream_1.Readable {
    constructor(path, call2, metadata2) {
      super({ objectMode: true });
      this.path = path;
      this.call = call2;
      this.metadata = metadata2;
      this.cancelled = false;
    }
    _read(size) {
      this.call.startRead();
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.path;
    }
    getHost() {
      return this.call.getHost();
    }
    getAuthContext() {
      return this.call.getAuthContext();
    }
    getMetricsRecorder() {
      return this.call.getMetricsRecorder();
    }
  }
  serverCall$1.ServerReadableStreamImpl = ServerReadableStreamImpl;
  class ServerWritableStreamImpl extends stream_1.Writable {
    constructor(path, call2, metadata2, request) {
      super({ objectMode: true });
      this.path = path;
      this.call = call2;
      this.metadata = metadata2;
      this.request = request;
      this.pendingStatus = {
        code: constants_1.Status.OK,
        details: "OK"
      };
      this.cancelled = false;
      this.trailingMetadata = new metadata_1.Metadata();
      this.on("error", (err) => {
        this.pendingStatus = serverErrorToStatus(err);
        this.end();
      });
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.path;
    }
    getHost() {
      return this.call.getHost();
    }
    getAuthContext() {
      return this.call.getAuthContext();
    }
    getMetricsRecorder() {
      return this.call.getMetricsRecorder();
    }
    _write(chunk, encoding, callback) {
      this.call.sendMessage(chunk, callback);
    }
    _final(callback) {
      var _a;
      callback(null);
      this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), { metadata: (_a = this.pendingStatus.metadata) !== null && _a !== void 0 ? _a : this.trailingMetadata }));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata2) {
      if (metadata2) {
        this.trailingMetadata = metadata2;
      }
      return super.end();
    }
  }
  serverCall$1.ServerWritableStreamImpl = ServerWritableStreamImpl;
  class ServerDuplexStreamImpl extends stream_1.Duplex {
    constructor(path, call2, metadata2) {
      super({ objectMode: true });
      this.path = path;
      this.call = call2;
      this.metadata = metadata2;
      this.pendingStatus = {
        code: constants_1.Status.OK,
        details: "OK"
      };
      this.cancelled = false;
      this.trailingMetadata = new metadata_1.Metadata();
      this.on("error", (err) => {
        this.pendingStatus = serverErrorToStatus(err);
        this.end();
      });
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.path;
    }
    getHost() {
      return this.call.getHost();
    }
    getAuthContext() {
      return this.call.getAuthContext();
    }
    getMetricsRecorder() {
      return this.call.getMetricsRecorder();
    }
    _read(size) {
      this.call.startRead();
    }
    _write(chunk, encoding, callback) {
      this.call.sendMessage(chunk, callback);
    }
    _final(callback) {
      var _a;
      callback(null);
      this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), { metadata: (_a = this.pendingStatus.metadata) !== null && _a !== void 0 ? _a : this.trailingMetadata }));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata2) {
      if (metadata2) {
        this.trailingMetadata = metadata2;
      }
      return super.end();
    }
  }
  serverCall$1.ServerDuplexStreamImpl = ServerDuplexStreamImpl;
  return serverCall$1;
}
var serverCredentials$1 = {};
var hasRequiredServerCredentials$1;
function requireServerCredentials$1() {
  if (hasRequiredServerCredentials$1) return serverCredentials$1;
  hasRequiredServerCredentials$1 = 1;
  Object.defineProperty(serverCredentials$1, "__esModule", { value: true });
  serverCredentials$1.ServerCredentials = void 0;
  serverCredentials$1.createCertificateProviderServerCredentials = createCertificateProviderServerCredentials;
  serverCredentials$1.createServerCredentialsWithInterceptors = createServerCredentialsWithInterceptors;
  const tls_helpers_1 = requireTlsHelpers$1();
  class ServerCredentials {
    constructor(serverConstructorOptions, contextOptions) {
      this.serverConstructorOptions = serverConstructorOptions;
      this.watchers = /* @__PURE__ */ new Set();
      this.latestContextOptions = null;
      this.latestContextOptions = contextOptions !== null && contextOptions !== void 0 ? contextOptions : null;
    }
    _addWatcher(watcher) {
      this.watchers.add(watcher);
    }
    _removeWatcher(watcher) {
      this.watchers.delete(watcher);
    }
    getWatcherCount() {
      return this.watchers.size;
    }
    updateSecureContextOptions(options) {
      this.latestContextOptions = options;
      for (const watcher of this.watchers) {
        watcher(this.latestContextOptions);
      }
    }
    _isSecure() {
      return this.serverConstructorOptions !== null;
    }
    _getSecureContextOptions() {
      return this.latestContextOptions;
    }
    _getConstructorOptions() {
      return this.serverConstructorOptions;
    }
    _getInterceptors() {
      return [];
    }
    static createInsecure() {
      return new InsecureServerCredentials();
    }
    static createSsl(rootCerts, keyCertPairs, checkClientCertificate = false) {
      var _a;
      if (rootCerts !== null && !Buffer.isBuffer(rootCerts)) {
        throw new TypeError("rootCerts must be null or a Buffer");
      }
      if (!Array.isArray(keyCertPairs)) {
        throw new TypeError("keyCertPairs must be an array");
      }
      if (typeof checkClientCertificate !== "boolean") {
        throw new TypeError("checkClientCertificate must be a boolean");
      }
      const cert = [];
      const key = [];
      for (let i = 0; i < keyCertPairs.length; i++) {
        const pair = keyCertPairs[i];
        if (pair === null || typeof pair !== "object") {
          throw new TypeError(`keyCertPair[${i}] must be an object`);
        }
        if (!Buffer.isBuffer(pair.private_key)) {
          throw new TypeError(`keyCertPair[${i}].private_key must be a Buffer`);
        }
        if (!Buffer.isBuffer(pair.cert_chain)) {
          throw new TypeError(`keyCertPair[${i}].cert_chain must be a Buffer`);
        }
        cert.push(pair.cert_chain);
        key.push(pair.private_key);
      }
      return new SecureServerCredentials({
        requestCert: checkClientCertificate,
        ciphers: tls_helpers_1.CIPHER_SUITES
      }, {
        ca: (_a = rootCerts !== null && rootCerts !== void 0 ? rootCerts : (0, tls_helpers_1.getDefaultRootsData)()) !== null && _a !== void 0 ? _a : void 0,
        cert,
        key
      });
    }
  }
  serverCredentials$1.ServerCredentials = ServerCredentials;
  class InsecureServerCredentials extends ServerCredentials {
    constructor() {
      super(null);
    }
    _getSettings() {
      return null;
    }
    _equals(other) {
      return other instanceof InsecureServerCredentials;
    }
  }
  class SecureServerCredentials extends ServerCredentials {
    constructor(constructorOptions, contextOptions) {
      super(constructorOptions, contextOptions);
      this.options = Object.assign(Object.assign({}, constructorOptions), contextOptions);
    }
    /**
     * Checks equality by checking the options that are actually set by
     * createSsl.
     * @param other
     * @returns
     */
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (!(other instanceof SecureServerCredentials)) {
        return false;
      }
      if (Buffer.isBuffer(this.options.ca) && Buffer.isBuffer(other.options.ca)) {
        if (!this.options.ca.equals(other.options.ca)) {
          return false;
        }
      } else {
        if (this.options.ca !== other.options.ca) {
          return false;
        }
      }
      if (Array.isArray(this.options.cert) && Array.isArray(other.options.cert)) {
        if (this.options.cert.length !== other.options.cert.length) {
          return false;
        }
        for (let i = 0; i < this.options.cert.length; i++) {
          const thisCert = this.options.cert[i];
          const otherCert = other.options.cert[i];
          if (Buffer.isBuffer(thisCert) && Buffer.isBuffer(otherCert)) {
            if (!thisCert.equals(otherCert)) {
              return false;
            }
          } else {
            if (thisCert !== otherCert) {
              return false;
            }
          }
        }
      } else {
        if (this.options.cert !== other.options.cert) {
          return false;
        }
      }
      if (Array.isArray(this.options.key) && Array.isArray(other.options.key)) {
        if (this.options.key.length !== other.options.key.length) {
          return false;
        }
        for (let i = 0; i < this.options.key.length; i++) {
          const thisKey = this.options.key[i];
          const otherKey = other.options.key[i];
          if (Buffer.isBuffer(thisKey) && Buffer.isBuffer(otherKey)) {
            if (!thisKey.equals(otherKey)) {
              return false;
            }
          } else {
            if (thisKey !== otherKey) {
              return false;
            }
          }
        }
      } else {
        if (this.options.key !== other.options.key) {
          return false;
        }
      }
      if (this.options.requestCert !== other.options.requestCert) {
        return false;
      }
      return true;
    }
  }
  class CertificateProviderServerCredentials extends ServerCredentials {
    constructor(identityCertificateProvider, caCertificateProvider, requireClientCertificate) {
      super({
        requestCert: caCertificateProvider !== null,
        rejectUnauthorized: requireClientCertificate,
        ciphers: tls_helpers_1.CIPHER_SUITES
      });
      this.identityCertificateProvider = identityCertificateProvider;
      this.caCertificateProvider = caCertificateProvider;
      this.requireClientCertificate = requireClientCertificate;
      this.latestCaUpdate = null;
      this.latestIdentityUpdate = null;
      this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this);
      this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this);
    }
    _addWatcher(watcher) {
      var _a;
      if (this.getWatcherCount() === 0) {
        (_a = this.caCertificateProvider) === null || _a === void 0 ? void 0 : _a.addCaCertificateListener(this.caCertificateUpdateListener);
        this.identityCertificateProvider.addIdentityCertificateListener(this.identityCertificateUpdateListener);
      }
      super._addWatcher(watcher);
    }
    _removeWatcher(watcher) {
      var _a;
      super._removeWatcher(watcher);
      if (this.getWatcherCount() === 0) {
        (_a = this.caCertificateProvider) === null || _a === void 0 ? void 0 : _a.removeCaCertificateListener(this.caCertificateUpdateListener);
        this.identityCertificateProvider.removeIdentityCertificateListener(this.identityCertificateUpdateListener);
      }
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (!(other instanceof CertificateProviderServerCredentials)) {
        return false;
      }
      return this.caCertificateProvider === other.caCertificateProvider && this.identityCertificateProvider === other.identityCertificateProvider && this.requireClientCertificate === other.requireClientCertificate;
    }
    calculateSecureContextOptions() {
      var _a;
      if (this.latestIdentityUpdate === null) {
        return null;
      }
      if (this.caCertificateProvider !== null && this.latestCaUpdate === null) {
        return null;
      }
      return {
        ca: (_a = this.latestCaUpdate) === null || _a === void 0 ? void 0 : _a.caCertificate,
        cert: [this.latestIdentityUpdate.certificate],
        key: [this.latestIdentityUpdate.privateKey]
      };
    }
    finalizeUpdate() {
      const secureContextOptions = this.calculateSecureContextOptions();
      this.updateSecureContextOptions(secureContextOptions);
    }
    handleCaCertificateUpdate(update) {
      this.latestCaUpdate = update;
      this.finalizeUpdate();
    }
    handleIdentityCertitificateUpdate(update) {
      this.latestIdentityUpdate = update;
      this.finalizeUpdate();
    }
  }
  function createCertificateProviderServerCredentials(caCertificateProvider, identityCertificateProvider, requireClientCertificate) {
    return new CertificateProviderServerCredentials(caCertificateProvider, identityCertificateProvider, requireClientCertificate);
  }
  class InterceptorServerCredentials extends ServerCredentials {
    constructor(childCredentials, interceptors) {
      super({});
      this.childCredentials = childCredentials;
      this.interceptors = interceptors;
    }
    _isSecure() {
      return this.childCredentials._isSecure();
    }
    _equals(other) {
      if (!(other instanceof InterceptorServerCredentials)) {
        return false;
      }
      if (!this.childCredentials._equals(other.childCredentials)) {
        return false;
      }
      if (this.interceptors.length !== other.interceptors.length) {
        return false;
      }
      for (let i = 0; i < this.interceptors.length; i++) {
        if (this.interceptors[i] !== other.interceptors[i]) {
          return false;
        }
      }
      return true;
    }
    _getInterceptors() {
      return this.interceptors;
    }
    _addWatcher(watcher) {
      this.childCredentials._addWatcher(watcher);
    }
    _removeWatcher(watcher) {
      this.childCredentials._removeWatcher(watcher);
    }
    _getConstructorOptions() {
      return this.childCredentials._getConstructorOptions();
    }
    _getSecureContextOptions() {
      return this.childCredentials._getSecureContextOptions();
    }
  }
  function createServerCredentialsWithInterceptors(credentials, interceptors) {
    return new InterceptorServerCredentials(credentials, interceptors);
  }
  return serverCredentials$1;
}
var serverInterceptors = {};
var orca = {};
var duration$1 = {};
var hasRequiredDuration$1;
function requireDuration$1() {
  if (hasRequiredDuration$1) return duration$1;
  hasRequiredDuration$1 = 1;
  Object.defineProperty(duration$1, "__esModule", { value: true });
  duration$1.durationMessageToDuration = durationMessageToDuration;
  duration$1.msToDuration = msToDuration;
  duration$1.durationToMs = durationToMs;
  duration$1.isDuration = isDuration;
  duration$1.isDurationMessage = isDurationMessage;
  duration$1.parseDuration = parseDuration;
  duration$1.durationToString = durationToString;
  function durationMessageToDuration(message) {
    return {
      seconds: Number.parseInt(message.seconds),
      nanos: message.nanos
    };
  }
  function msToDuration(millis) {
    return {
      seconds: millis / 1e3 | 0,
      nanos: millis % 1e3 * 1e6 | 0
    };
  }
  function durationToMs(duration2) {
    return duration2.seconds * 1e3 + duration2.nanos / 1e6 | 0;
  }
  function isDuration(value) {
    return typeof value.seconds === "number" && typeof value.nanos === "number";
  }
  function isDurationMessage(value) {
    return typeof value.seconds === "string" && typeof value.nanos === "number";
  }
  const durationRegex = /^(\d+)(?:\.(\d+))?s$/;
  function parseDuration(value) {
    const match = value.match(durationRegex);
    if (!match) {
      return null;
    }
    return {
      seconds: Number.parseInt(match[1], 10),
      nanos: match[2] ? Number.parseInt(match[2].padEnd(9, "0"), 10) : 0
    };
  }
  function durationToString(duration2) {
    if (duration2.nanos === 0) {
      return `${duration2.seconds}s`;
    }
    let scaleFactor;
    if (duration2.nanos % 1e6 === 0) {
      scaleFactor = 1e6;
    } else if (duration2.nanos % 1e3 === 0) {
      scaleFactor = 1e3;
    } else {
      scaleFactor = 1;
    }
    return `${duration2.seconds}.${duration2.nanos / scaleFactor}s`;
  }
  return duration$1;
}
var hasRequiredOrca;
function requireOrca() {
  if (hasRequiredOrca) return orca;
  hasRequiredOrca = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrcaOobMetricsSubchannelWrapper = exports.GRPC_METRICS_HEADER = exports.ServerMetricRecorder = exports.PerRequestMetricRecorder = void 0;
    exports.createOrcaClient = createOrcaClient;
    exports.createMetricsReader = createMetricsReader;
    const make_client_1 = requireMakeClient$1();
    const duration_1 = requireDuration$1();
    const channel_credentials_1 = requireChannelCredentials$1();
    const subchannel_interface_1 = requireSubchannelInterface$1();
    const constants_1 = requireConstants$1();
    const backoff_timeout_1 = requireBackoffTimeout$1();
    const connectivity_state_1 = requireConnectivityState$1();
    function loadOrcaProto() {
      const loaderLoadSync = requireSrc$2().loadSync;
      const loadedProto = loaderLoadSync("xds/service/orca/v3/orca.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [
          `${__dirname}/../../proto/xds`,
          `${__dirname}/../../proto/protoc-gen-validate`
        ]
      });
      return (0, make_client_1.loadPackageDefinition)(loadedProto);
    }
    class PerRequestMetricRecorder {
      constructor() {
        this.message = {};
      }
      /**
       * Records a request cost metric measurement for the call.
       * @param name
       * @param value
       */
      recordRequestCostMetric(name, value) {
        if (!this.message.request_cost) {
          this.message.request_cost = {};
        }
        this.message.request_cost[name] = value;
      }
      /**
       * Records a request cost metric measurement for the call.
       * @param name
       * @param value
       */
      recordUtilizationMetric(name, value) {
        if (!this.message.utilization) {
          this.message.utilization = {};
        }
        this.message.utilization[name] = value;
      }
      /**
       * Records an opaque named metric measurement for the call.
       * @param name
       * @param value
       */
      recordNamedMetric(name, value) {
        if (!this.message.named_metrics) {
          this.message.named_metrics = {};
        }
        this.message.named_metrics[name] = value;
      }
      /**
       * Records the CPU utilization metric measurement for the call.
       * @param value
       */
      recordCPUUtilizationMetric(value) {
        this.message.cpu_utilization = value;
      }
      /**
       * Records the memory utilization metric measurement for the call.
       * @param value
       */
      recordMemoryUtilizationMetric(value) {
        this.message.mem_utilization = value;
      }
      /**
       * Records the memory utilization metric measurement for the call.
       * @param value
       */
      recordApplicationUtilizationMetric(value) {
        this.message.application_utilization = value;
      }
      /**
       * Records the queries per second measurement.
       * @param value
       */
      recordQpsMetric(value) {
        this.message.rps_fractional = value;
      }
      /**
       * Records the errors per second measurement.
       * @param value
       */
      recordEpsMetric(value) {
        this.message.eps = value;
      }
      serialize() {
        const orcaProto = loadOrcaProto();
        return orcaProto.xds.data.orca.v3.OrcaLoadReport.serialize(this.message);
      }
    }
    exports.PerRequestMetricRecorder = PerRequestMetricRecorder;
    const DEFAULT_REPORT_INTERVAL_MS = 3e4;
    class ServerMetricRecorder {
      constructor() {
        this.message = {};
        this.serviceImplementation = {
          StreamCoreMetrics: (call2) => {
            const reportInterval = call2.request.report_interval ? (0, duration_1.durationToMs)((0, duration_1.durationMessageToDuration)(call2.request.report_interval)) : DEFAULT_REPORT_INTERVAL_MS;
            const reportTimer = setInterval(() => {
              call2.write(this.message);
            }, reportInterval);
            call2.on("cancelled", () => {
              clearInterval(reportTimer);
            });
          }
        };
      }
      putUtilizationMetric(name, value) {
        if (!this.message.utilization) {
          this.message.utilization = {};
        }
        this.message.utilization[name] = value;
      }
      setAllUtilizationMetrics(metrics) {
        this.message.utilization = Object.assign({}, metrics);
      }
      deleteUtilizationMetric(name) {
        var _a;
        (_a = this.message.utilization) === null || _a === void 0 ? true : delete _a[name];
      }
      setCpuUtilizationMetric(value) {
        this.message.cpu_utilization = value;
      }
      deleteCpuUtilizationMetric() {
        delete this.message.cpu_utilization;
      }
      setApplicationUtilizationMetric(value) {
        this.message.application_utilization = value;
      }
      deleteApplicationUtilizationMetric() {
        delete this.message.application_utilization;
      }
      setQpsMetric(value) {
        this.message.rps_fractional = value;
      }
      deleteQpsMetric() {
        delete this.message.rps_fractional;
      }
      setEpsMetric(value) {
        this.message.eps = value;
      }
      deleteEpsMetric() {
        delete this.message.eps;
      }
      addToServer(server2) {
        const serviceDefinition = loadOrcaProto().xds.service.orca.v3.OpenRcaService.service;
        server2.addService(serviceDefinition, this.serviceImplementation);
      }
    }
    exports.ServerMetricRecorder = ServerMetricRecorder;
    function createOrcaClient(channel2) {
      const ClientClass = loadOrcaProto().xds.service.orca.v3.OpenRcaService;
      return new ClientClass("unused", channel_credentials_1.ChannelCredentials.createInsecure(), { channelOverride: channel2 });
    }
    exports.GRPC_METRICS_HEADER = "endpoint-load-metrics-bin";
    const PARSED_LOAD_REPORT_KEY = "grpc_orca_load_report";
    function createMetricsReader(listener, previousOnCallEnded) {
      return (code, details, metadata2) => {
        let parsedLoadReport = metadata2.getOpaque(PARSED_LOAD_REPORT_KEY);
        if (parsedLoadReport) {
          listener(parsedLoadReport);
        } else {
          const serializedLoadReport = metadata2.get(exports.GRPC_METRICS_HEADER);
          if (serializedLoadReport.length > 0) {
            const orcaProto = loadOrcaProto();
            parsedLoadReport = orcaProto.xds.data.orca.v3.OrcaLoadReport.deserialize(serializedLoadReport[0]);
            listener(parsedLoadReport);
            metadata2.setOpaque(PARSED_LOAD_REPORT_KEY, parsedLoadReport);
          }
        }
        if (previousOnCallEnded) {
          previousOnCallEnded(code, details, metadata2);
        }
      };
    }
    const DATA_PRODUCER_KEY = "orca_oob_metrics";
    class OobMetricsDataWatcher {
      constructor(metricsListener, intervalMs) {
        this.metricsListener = metricsListener;
        this.intervalMs = intervalMs;
        this.dataProducer = null;
      }
      setSubchannel(subchannel2) {
        const producer = subchannel2.getOrCreateDataProducer(DATA_PRODUCER_KEY, createOobMetricsDataProducer);
        this.dataProducer = producer;
        producer.addDataWatcher(this);
      }
      destroy() {
        var _a;
        (_a = this.dataProducer) === null || _a === void 0 ? void 0 : _a.removeDataWatcher(this);
      }
      getInterval() {
        return this.intervalMs;
      }
      onMetricsUpdate(metrics) {
        this.metricsListener(metrics);
      }
    }
    class OobMetricsDataProducer {
      constructor(subchannel2) {
        this.subchannel = subchannel2;
        this.dataWatchers = /* @__PURE__ */ new Set();
        this.orcaSupported = true;
        this.metricsCall = null;
        this.currentInterval = Infinity;
        this.backoffTimer = new backoff_timeout_1.BackoffTimeout(() => this.updateMetricsSubscription());
        this.subchannelStateListener = () => this.updateMetricsSubscription();
        const channel2 = subchannel2.getChannel();
        this.client = createOrcaClient(channel2);
        subchannel2.addConnectivityStateListener(this.subchannelStateListener);
      }
      addDataWatcher(dataWatcher) {
        this.dataWatchers.add(dataWatcher);
        this.updateMetricsSubscription();
      }
      removeDataWatcher(dataWatcher) {
        var _a;
        this.dataWatchers.delete(dataWatcher);
        if (this.dataWatchers.size === 0) {
          this.subchannel.removeDataProducer(DATA_PRODUCER_KEY);
          (_a = this.metricsCall) === null || _a === void 0 ? void 0 : _a.cancel();
          this.metricsCall = null;
          this.client.close();
          this.subchannel.removeConnectivityStateListener(this.subchannelStateListener);
        } else {
          this.updateMetricsSubscription();
        }
      }
      updateMetricsSubscription() {
        var _a;
        if (this.dataWatchers.size === 0 || !this.orcaSupported || this.subchannel.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
          return;
        }
        const newInterval = Math.min(...Array.from(this.dataWatchers).map((watcher) => watcher.getInterval()));
        if (!this.metricsCall || newInterval !== this.currentInterval) {
          (_a = this.metricsCall) === null || _a === void 0 ? void 0 : _a.cancel();
          this.currentInterval = newInterval;
          const metricsCall = this.client.streamCoreMetrics({ report_interval: (0, duration_1.msToDuration)(newInterval) });
          this.metricsCall = metricsCall;
          metricsCall.on("data", (report) => {
            this.dataWatchers.forEach((watcher) => {
              watcher.onMetricsUpdate(report);
            });
          });
          metricsCall.on("error", (error2) => {
            this.metricsCall = null;
            if (error2.code === constants_1.Status.UNIMPLEMENTED) {
              this.orcaSupported = false;
              return;
            }
            if (error2.code === constants_1.Status.CANCELLED) {
              return;
            }
            this.backoffTimer.runOnce();
          });
        }
      }
    }
    class OrcaOobMetricsSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
      constructor(child, metricsListener, intervalMs) {
        super(child);
        this.addDataWatcher(new OobMetricsDataWatcher(metricsListener, intervalMs));
      }
      getWrappedSubchannel() {
        return this.child;
      }
    }
    exports.OrcaOobMetricsSubchannelWrapper = OrcaOobMetricsSubchannelWrapper;
    function createOobMetricsDataProducer(subchannel2) {
      return new OobMetricsDataProducer(subchannel2);
    }
  })(orca);
  return orca;
}
var hasRequiredServerInterceptors;
function requireServerInterceptors() {
  if (hasRequiredServerInterceptors) return serverInterceptors;
  hasRequiredServerInterceptors = 1;
  Object.defineProperty(serverInterceptors, "__esModule", { value: true });
  serverInterceptors.BaseServerInterceptingCall = serverInterceptors.ServerInterceptingCall = serverInterceptors.ResponderBuilder = serverInterceptors.ServerListenerBuilder = void 0;
  serverInterceptors.isInterceptingServerListener = isInterceptingServerListener;
  serverInterceptors.getServerInterceptingCall = getServerInterceptingCall;
  const metadata_1 = requireMetadata$1();
  const constants_1 = requireConstants$1();
  const http2 = require$$0$5;
  const error_1 = requireError$1();
  const zlib$1 = zlib;
  const stream_decoder_1 = requireStreamDecoder$1();
  const logging2 = requireLogging$1();
  const tls_1 = require$$1$1;
  const orca_1 = requireOrca();
  const TRACER_NAME = "server_call";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  class ServerListenerBuilder {
    constructor() {
      this.metadata = void 0;
      this.message = void 0;
      this.halfClose = void 0;
      this.cancel = void 0;
    }
    withOnReceiveMetadata(onReceiveMetadata) {
      this.metadata = onReceiveMetadata;
      return this;
    }
    withOnReceiveMessage(onReceiveMessage) {
      this.message = onReceiveMessage;
      return this;
    }
    withOnReceiveHalfClose(onReceiveHalfClose) {
      this.halfClose = onReceiveHalfClose;
      return this;
    }
    withOnCancel(onCancel) {
      this.cancel = onCancel;
      return this;
    }
    build() {
      return {
        onReceiveMetadata: this.metadata,
        onReceiveMessage: this.message,
        onReceiveHalfClose: this.halfClose,
        onCancel: this.cancel
      };
    }
  }
  serverInterceptors.ServerListenerBuilder = ServerListenerBuilder;
  function isInterceptingServerListener(listener) {
    return listener.onReceiveMetadata !== void 0 && listener.onReceiveMetadata.length === 1;
  }
  class InterceptingServerListenerImpl {
    constructor(listener, nextListener) {
      this.listener = listener;
      this.nextListener = nextListener;
      this.cancelled = false;
      this.processingMetadata = false;
      this.hasPendingMessage = false;
      this.pendingMessage = null;
      this.processingMessage = false;
      this.hasPendingHalfClose = false;
    }
    processPendingMessage() {
      if (this.hasPendingMessage) {
        this.nextListener.onReceiveMessage(this.pendingMessage);
        this.pendingMessage = null;
        this.hasPendingMessage = false;
      }
    }
    processPendingHalfClose() {
      if (this.hasPendingHalfClose) {
        this.nextListener.onReceiveHalfClose();
        this.hasPendingHalfClose = false;
      }
    }
    onReceiveMetadata(metadata2) {
      if (this.cancelled) {
        return;
      }
      this.processingMetadata = true;
      this.listener.onReceiveMetadata(metadata2, (interceptedMetadata) => {
        this.processingMetadata = false;
        if (this.cancelled) {
          return;
        }
        this.nextListener.onReceiveMetadata(interceptedMetadata);
        this.processPendingMessage();
        this.processPendingHalfClose();
      });
    }
    onReceiveMessage(message) {
      if (this.cancelled) {
        return;
      }
      this.processingMessage = true;
      this.listener.onReceiveMessage(message, (msg) => {
        this.processingMessage = false;
        if (this.cancelled) {
          return;
        }
        if (this.processingMetadata) {
          this.pendingMessage = msg;
          this.hasPendingMessage = true;
        } else {
          this.nextListener.onReceiveMessage(msg);
          this.processPendingHalfClose();
        }
      });
    }
    onReceiveHalfClose() {
      if (this.cancelled) {
        return;
      }
      this.listener.onReceiveHalfClose(() => {
        if (this.cancelled) {
          return;
        }
        if (this.processingMetadata || this.processingMessage) {
          this.hasPendingHalfClose = true;
        } else {
          this.nextListener.onReceiveHalfClose();
        }
      });
    }
    onCancel() {
      this.cancelled = true;
      this.listener.onCancel();
      this.nextListener.onCancel();
    }
  }
  class ResponderBuilder {
    constructor() {
      this.start = void 0;
      this.metadata = void 0;
      this.message = void 0;
      this.status = void 0;
    }
    withStart(start) {
      this.start = start;
      return this;
    }
    withSendMetadata(sendMetadata) {
      this.metadata = sendMetadata;
      return this;
    }
    withSendMessage(sendMessage) {
      this.message = sendMessage;
      return this;
    }
    withSendStatus(sendStatus) {
      this.status = sendStatus;
      return this;
    }
    build() {
      return {
        start: this.start,
        sendMetadata: this.metadata,
        sendMessage: this.message,
        sendStatus: this.status
      };
    }
  }
  serverInterceptors.ResponderBuilder = ResponderBuilder;
  const defaultServerListener = {
    onReceiveMetadata: (metadata2, next) => {
      next(metadata2);
    },
    onReceiveMessage: (message, next) => {
      next(message);
    },
    onReceiveHalfClose: (next) => {
      next();
    },
    onCancel: () => {
    }
  };
  const defaultResponder = {
    start: (next) => {
      next();
    },
    sendMetadata: (metadata2, next) => {
      next(metadata2);
    },
    sendMessage: (message, next) => {
      next(message);
    },
    sendStatus: (status, next) => {
      next(status);
    }
  };
  class ServerInterceptingCall {
    constructor(nextCall, responder) {
      var _a, _b, _c, _d;
      this.nextCall = nextCall;
      this.processingMetadata = false;
      this.sentMetadata = false;
      this.processingMessage = false;
      this.pendingMessage = null;
      this.pendingMessageCallback = null;
      this.pendingStatus = null;
      this.responder = {
        start: (_a = responder === null || responder === void 0 ? void 0 : responder.start) !== null && _a !== void 0 ? _a : defaultResponder.start,
        sendMetadata: (_b = responder === null || responder === void 0 ? void 0 : responder.sendMetadata) !== null && _b !== void 0 ? _b : defaultResponder.sendMetadata,
        sendMessage: (_c = responder === null || responder === void 0 ? void 0 : responder.sendMessage) !== null && _c !== void 0 ? _c : defaultResponder.sendMessage,
        sendStatus: (_d = responder === null || responder === void 0 ? void 0 : responder.sendStatus) !== null && _d !== void 0 ? _d : defaultResponder.sendStatus
      };
    }
    processPendingMessage() {
      if (this.pendingMessageCallback) {
        this.nextCall.sendMessage(this.pendingMessage, this.pendingMessageCallback);
        this.pendingMessage = null;
        this.pendingMessageCallback = null;
      }
    }
    processPendingStatus() {
      if (this.pendingStatus) {
        this.nextCall.sendStatus(this.pendingStatus);
        this.pendingStatus = null;
      }
    }
    start(listener) {
      this.responder.start((interceptedListener) => {
        var _a, _b, _c, _d;
        const fullInterceptedListener = {
          onReceiveMetadata: (_a = interceptedListener === null || interceptedListener === void 0 ? void 0 : interceptedListener.onReceiveMetadata) !== null && _a !== void 0 ? _a : defaultServerListener.onReceiveMetadata,
          onReceiveMessage: (_b = interceptedListener === null || interceptedListener === void 0 ? void 0 : interceptedListener.onReceiveMessage) !== null && _b !== void 0 ? _b : defaultServerListener.onReceiveMessage,
          onReceiveHalfClose: (_c = interceptedListener === null || interceptedListener === void 0 ? void 0 : interceptedListener.onReceiveHalfClose) !== null && _c !== void 0 ? _c : defaultServerListener.onReceiveHalfClose,
          onCancel: (_d = interceptedListener === null || interceptedListener === void 0 ? void 0 : interceptedListener.onCancel) !== null && _d !== void 0 ? _d : defaultServerListener.onCancel
        };
        const finalInterceptingListener = new InterceptingServerListenerImpl(fullInterceptedListener, listener);
        this.nextCall.start(finalInterceptingListener);
      });
    }
    sendMetadata(metadata2) {
      this.processingMetadata = true;
      this.sentMetadata = true;
      this.responder.sendMetadata(metadata2, (interceptedMetadata) => {
        this.processingMetadata = false;
        this.nextCall.sendMetadata(interceptedMetadata);
        this.processPendingMessage();
        this.processPendingStatus();
      });
    }
    sendMessage(message, callback) {
      this.processingMessage = true;
      if (!this.sentMetadata) {
        this.sendMetadata(new metadata_1.Metadata());
      }
      this.responder.sendMessage(message, (interceptedMessage) => {
        this.processingMessage = false;
        if (this.processingMetadata) {
          this.pendingMessage = interceptedMessage;
          this.pendingMessageCallback = callback;
        } else {
          this.nextCall.sendMessage(interceptedMessage, callback);
        }
      });
    }
    sendStatus(status) {
      this.responder.sendStatus(status, (interceptedStatus) => {
        if (this.processingMetadata || this.processingMessage) {
          this.pendingStatus = interceptedStatus;
        } else {
          this.nextCall.sendStatus(interceptedStatus);
        }
      });
    }
    startRead() {
      this.nextCall.startRead();
    }
    getPeer() {
      return this.nextCall.getPeer();
    }
    getDeadline() {
      return this.nextCall.getDeadline();
    }
    getHost() {
      return this.nextCall.getHost();
    }
    getAuthContext() {
      return this.nextCall.getAuthContext();
    }
    getConnectionInfo() {
      return this.nextCall.getConnectionInfo();
    }
    getMetricsRecorder() {
      return this.nextCall.getMetricsRecorder();
    }
  }
  serverInterceptors.ServerInterceptingCall = ServerInterceptingCall;
  const GRPC_ACCEPT_ENCODING_HEADER = "grpc-accept-encoding";
  const GRPC_ENCODING_HEADER = "grpc-encoding";
  const GRPC_MESSAGE_HEADER = "grpc-message";
  const GRPC_STATUS_HEADER = "grpc-status";
  const GRPC_TIMEOUT_HEADER = "grpc-timeout";
  const DEADLINE_REGEX = /(\d{1,8})\s*([HMSmun])/;
  const deadlineUnitsToMs = {
    H: 36e5,
    M: 6e4,
    S: 1e3,
    m: 1,
    u: 1e-3,
    n: 1e-6
  };
  const defaultCompressionHeaders = {
    // TODO(cjihrig): Remove these encoding headers from the default response
    // once compression is integrated.
    [GRPC_ACCEPT_ENCODING_HEADER]: "identity,deflate,gzip",
    [GRPC_ENCODING_HEADER]: "identity"
  };
  const defaultResponseHeaders = {
    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK,
    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
  };
  const defaultResponseOptions = {
    waitForTrailers: true
  };
  class BaseServerInterceptingCall {
    constructor(stream, headers, callEventTracker, handler, options) {
      var _a, _b;
      this.stream = stream;
      this.callEventTracker = callEventTracker;
      this.handler = handler;
      this.listener = null;
      this.deadlineTimer = null;
      this.deadline = Infinity;
      this.maxSendMessageSize = constants_1.DEFAULT_MAX_SEND_MESSAGE_LENGTH;
      this.maxReceiveMessageSize = constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.cancelled = false;
      this.metadataSent = false;
      this.wantTrailers = false;
      this.cancelNotified = false;
      this.incomingEncoding = "identity";
      this.readQueue = [];
      this.isReadPending = false;
      this.receivedHalfClose = false;
      this.streamEnded = false;
      this.metricsRecorder = new orca_1.PerRequestMetricRecorder();
      this.stream.once("close", () => {
        var _a2;
        trace("Request to method " + ((_a2 = this.handler) === null || _a2 === void 0 ? void 0 : _a2.path) + " stream closed with rstCode " + this.stream.rstCode);
        if (this.callEventTracker && !this.streamEnded) {
          this.streamEnded = true;
          this.callEventTracker.onStreamEnd(false);
          this.callEventTracker.onCallEnd({
            code: constants_1.Status.CANCELLED,
            details: "Stream closed before sending status",
            metadata: null
          });
        }
        this.notifyOnCancel();
      });
      this.stream.on("data", (data) => {
        this.handleDataFrame(data);
      });
      this.stream.pause();
      this.stream.on("end", () => {
        this.handleEndEvent();
      });
      if ("grpc.max_send_message_length" in options) {
        this.maxSendMessageSize = options["grpc.max_send_message_length"];
      }
      if ("grpc.max_receive_message_length" in options) {
        this.maxReceiveMessageSize = options["grpc.max_receive_message_length"];
      }
      this.host = (_a = headers[":authority"]) !== null && _a !== void 0 ? _a : headers.host;
      this.decoder = new stream_decoder_1.StreamDecoder(this.maxReceiveMessageSize);
      const metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
      if (logging2.isTracerEnabled(TRACER_NAME)) {
        trace("Request to " + this.handler.path + " received headers " + JSON.stringify(metadata2.toJSON()));
      }
      const timeoutHeader = metadata2.get(GRPC_TIMEOUT_HEADER);
      if (timeoutHeader.length > 0) {
        this.handleTimeoutHeader(timeoutHeader[0]);
      }
      const encodingHeader = metadata2.get(GRPC_ENCODING_HEADER);
      if (encodingHeader.length > 0) {
        this.incomingEncoding = encodingHeader[0];
      }
      metadata2.remove(GRPC_TIMEOUT_HEADER);
      metadata2.remove(GRPC_ENCODING_HEADER);
      metadata2.remove(GRPC_ACCEPT_ENCODING_HEADER);
      metadata2.remove(http2.constants.HTTP2_HEADER_ACCEPT_ENCODING);
      metadata2.remove(http2.constants.HTTP2_HEADER_TE);
      metadata2.remove(http2.constants.HTTP2_HEADER_CONTENT_TYPE);
      this.metadata = metadata2;
      const socket = (_b = stream.session) === null || _b === void 0 ? void 0 : _b.socket;
      this.connectionInfo = {
        localAddress: socket === null || socket === void 0 ? void 0 : socket.localAddress,
        localPort: socket === null || socket === void 0 ? void 0 : socket.localPort,
        remoteAddress: socket === null || socket === void 0 ? void 0 : socket.remoteAddress,
        remotePort: socket === null || socket === void 0 ? void 0 : socket.remotePort
      };
      this.shouldSendMetrics = !!options["grpc.server_call_metric_recording"];
    }
    handleTimeoutHeader(timeoutHeader) {
      const match = timeoutHeader.toString().match(DEADLINE_REGEX);
      if (match === null) {
        const status = {
          code: constants_1.Status.INTERNAL,
          details: `Invalid ${GRPC_TIMEOUT_HEADER} value "${timeoutHeader}"`,
          metadata: null
        };
        process.nextTick(() => {
          this.sendStatus(status);
        });
        return;
      }
      const timeout = +match[1] * deadlineUnitsToMs[match[2]] | 0;
      const now = /* @__PURE__ */ new Date();
      this.deadline = now.setMilliseconds(now.getMilliseconds() + timeout);
      this.deadlineTimer = setTimeout(() => {
        const status = {
          code: constants_1.Status.DEADLINE_EXCEEDED,
          details: "Deadline exceeded",
          metadata: null
        };
        this.sendStatus(status);
      }, timeout);
    }
    checkCancelled() {
      if (!this.cancelled && (this.stream.destroyed || this.stream.closed)) {
        this.notifyOnCancel();
        this.cancelled = true;
      }
      return this.cancelled;
    }
    notifyOnCancel() {
      if (this.cancelNotified) {
        return;
      }
      this.cancelNotified = true;
      this.cancelled = true;
      process.nextTick(() => {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onCancel();
      });
      if (this.deadlineTimer) {
        clearTimeout(this.deadlineTimer);
      }
      this.stream.resume();
    }
    /**
     * A server handler can start sending messages without explicitly sending
     * metadata. In that case, we need to send headers before sending any
     * messages. This function does that if necessary.
     */
    maybeSendMetadata() {
      if (!this.metadataSent) {
        this.sendMetadata(new metadata_1.Metadata());
      }
    }
    /**
     * Serialize a message to a length-delimited byte string.
     * @param value
     * @returns
     */
    serializeMessage(value) {
      const messageBuffer = this.handler.serialize(value);
      const byteLength = messageBuffer.byteLength;
      const output = Buffer.allocUnsafe(byteLength + 5);
      output.writeUInt8(0, 0);
      output.writeUInt32BE(byteLength, 1);
      messageBuffer.copy(output, 5);
      return output;
    }
    decompressMessage(message, encoding) {
      const messageContents = message.subarray(5);
      if (encoding === "identity") {
        return messageContents;
      } else if (encoding === "deflate" || encoding === "gzip") {
        let decompresser;
        if (encoding === "deflate") {
          decompresser = zlib$1.createInflate();
        } else {
          decompresser = zlib$1.createGunzip();
        }
        return new Promise((resolve, reject) => {
          let totalLength = 0;
          const messageParts = [];
          decompresser.on("error", (error2) => {
            reject({
              code: constants_1.Status.INTERNAL,
              details: "Failed to decompress message"
            });
          });
          decompresser.on("data", (chunk) => {
            messageParts.push(chunk);
            totalLength += chunk.byteLength;
            if (this.maxReceiveMessageSize !== -1 && totalLength > this.maxReceiveMessageSize) {
              decompresser.destroy();
              reject({
                code: constants_1.Status.RESOURCE_EXHAUSTED,
                details: `Received message that decompresses to a size larger than ${this.maxReceiveMessageSize}`
              });
            }
          });
          decompresser.on("end", () => {
            resolve(Buffer.concat(messageParts));
          });
          decompresser.write(messageContents);
          decompresser.end();
        });
      } else {
        return Promise.reject({
          code: constants_1.Status.UNIMPLEMENTED,
          details: `Received message compressed with unsupported encoding "${encoding}"`
        });
      }
    }
    async decompressAndMaybePush(queueEntry) {
      if (queueEntry.type !== "COMPRESSED") {
        throw new Error(`Invalid queue entry type: ${queueEntry.type}`);
      }
      const compressed = queueEntry.compressedMessage.readUInt8(0) === 1;
      const compressedMessageEncoding = compressed ? this.incomingEncoding : "identity";
      let decompressedMessage;
      try {
        decompressedMessage = await this.decompressMessage(queueEntry.compressedMessage, compressedMessageEncoding);
      } catch (err) {
        this.sendStatus(err);
        return;
      }
      try {
        queueEntry.parsedMessage = this.handler.deserialize(decompressedMessage);
      } catch (err) {
        this.sendStatus({
          code: constants_1.Status.INTERNAL,
          details: `Error deserializing request: ${err.message}`
        });
        return;
      }
      queueEntry.type = "READABLE";
      this.maybePushNextMessage();
    }
    maybePushNextMessage() {
      if (this.listener && this.isReadPending && this.readQueue.length > 0 && this.readQueue[0].type !== "COMPRESSED") {
        this.isReadPending = false;
        const nextQueueEntry = this.readQueue.shift();
        if (nextQueueEntry.type === "READABLE") {
          this.listener.onReceiveMessage(nextQueueEntry.parsedMessage);
        } else {
          this.listener.onReceiveHalfClose();
        }
      }
    }
    handleDataFrame(data) {
      var _a;
      if (this.checkCancelled()) {
        return;
      }
      trace("Request to " + this.handler.path + " received data frame of size " + data.length);
      let rawMessages;
      try {
        rawMessages = this.decoder.write(data);
      } catch (e) {
        this.sendStatus({ code: constants_1.Status.RESOURCE_EXHAUSTED, details: e.message });
        return;
      }
      for (const messageBytes of rawMessages) {
        this.stream.pause();
        const queueEntry = {
          type: "COMPRESSED",
          compressedMessage: messageBytes,
          parsedMessage: null
        };
        this.readQueue.push(queueEntry);
        this.decompressAndMaybePush(queueEntry);
        (_a = this.callEventTracker) === null || _a === void 0 ? void 0 : _a.addMessageReceived();
      }
    }
    handleEndEvent() {
      this.readQueue.push({
        type: "HALF_CLOSE",
        compressedMessage: null,
        parsedMessage: null
      });
      this.receivedHalfClose = true;
      this.maybePushNextMessage();
    }
    start(listener) {
      trace("Request to " + this.handler.path + " start called");
      if (this.checkCancelled()) {
        return;
      }
      this.listener = listener;
      listener.onReceiveMetadata(this.metadata);
    }
    sendMetadata(metadata2) {
      if (this.checkCancelled()) {
        return;
      }
      if (this.metadataSent) {
        return;
      }
      this.metadataSent = true;
      const custom = metadata2 ? metadata2.toHttp2Headers() : null;
      const headers = Object.assign(Object.assign(Object.assign({}, defaultResponseHeaders), defaultCompressionHeaders), custom);
      this.stream.respond(headers, defaultResponseOptions);
    }
    sendMessage(message, callback) {
      if (this.checkCancelled()) {
        return;
      }
      let response;
      try {
        response = this.serializeMessage(message);
      } catch (e) {
        this.sendStatus({
          code: constants_1.Status.INTERNAL,
          details: `Error serializing response: ${(0, error_1.getErrorMessage)(e)}`,
          metadata: null
        });
        return;
      }
      if (this.maxSendMessageSize !== -1 && response.length - 5 > this.maxSendMessageSize) {
        this.sendStatus({
          code: constants_1.Status.RESOURCE_EXHAUSTED,
          details: `Sent message larger than max (${response.length} vs. ${this.maxSendMessageSize})`,
          metadata: null
        });
        return;
      }
      this.maybeSendMetadata();
      trace("Request to " + this.handler.path + " sent data frame of size " + response.length);
      this.stream.write(response, (error2) => {
        var _a;
        if (error2) {
          this.sendStatus({
            code: constants_1.Status.INTERNAL,
            details: `Error writing message: ${(0, error_1.getErrorMessage)(error2)}`,
            metadata: null
          });
          return;
        }
        (_a = this.callEventTracker) === null || _a === void 0 ? void 0 : _a.addMessageSent();
        callback();
      });
    }
    sendStatus(status) {
      var _a, _b, _c;
      if (this.checkCancelled()) {
        return;
      }
      trace("Request to method " + ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.path) + " ended with status code: " + constants_1.Status[status.code] + " details: " + status.details);
      const statusMetadata = (_c = (_b = status.metadata) === null || _b === void 0 ? void 0 : _b.clone()) !== null && _c !== void 0 ? _c : new metadata_1.Metadata();
      if (this.shouldSendMetrics) {
        statusMetadata.set(orca_1.GRPC_METRICS_HEADER, this.metricsRecorder.serialize());
      }
      if (this.metadataSent) {
        if (!this.wantTrailers) {
          this.wantTrailers = true;
          this.stream.once("wantTrailers", () => {
            if (this.callEventTracker && !this.streamEnded) {
              this.streamEnded = true;
              this.callEventTracker.onStreamEnd(true);
              this.callEventTracker.onCallEnd(status);
            }
            const trailersToSend = Object.assign({ [GRPC_STATUS_HEADER]: status.code, [GRPC_MESSAGE_HEADER]: encodeURI(status.details) }, statusMetadata.toHttp2Headers());
            this.stream.sendTrailers(trailersToSend);
            this.notifyOnCancel();
          });
          this.stream.end();
        } else {
          this.notifyOnCancel();
        }
      } else {
        if (this.callEventTracker && !this.streamEnded) {
          this.streamEnded = true;
          this.callEventTracker.onStreamEnd(true);
          this.callEventTracker.onCallEnd(status);
        }
        const trailersToSend = Object.assign(Object.assign({ [GRPC_STATUS_HEADER]: status.code, [GRPC_MESSAGE_HEADER]: encodeURI(status.details) }, defaultResponseHeaders), statusMetadata.toHttp2Headers());
        this.stream.respond(trailersToSend, { endStream: true });
        this.notifyOnCancel();
      }
    }
    startRead() {
      trace("Request to " + this.handler.path + " startRead called");
      if (this.checkCancelled()) {
        return;
      }
      this.isReadPending = true;
      if (this.readQueue.length === 0) {
        if (!this.receivedHalfClose) {
          this.stream.resume();
        }
      } else {
        this.maybePushNextMessage();
      }
    }
    getPeer() {
      var _a;
      const socket = (_a = this.stream.session) === null || _a === void 0 ? void 0 : _a.socket;
      if (socket === null || socket === void 0 ? void 0 : socket.remoteAddress) {
        if (socket.remotePort) {
          return `${socket.remoteAddress}:${socket.remotePort}`;
        } else {
          return socket.remoteAddress;
        }
      } else {
        return "unknown";
      }
    }
    getDeadline() {
      return this.deadline;
    }
    getHost() {
      return this.host;
    }
    getAuthContext() {
      var _a;
      if (((_a = this.stream.session) === null || _a === void 0 ? void 0 : _a.socket) instanceof tls_1.TLSSocket) {
        const peerCertificate = this.stream.session.socket.getPeerCertificate();
        return {
          transportSecurityType: "ssl",
          sslPeerCertificate: peerCertificate.raw ? peerCertificate : void 0
        };
      } else {
        return {};
      }
    }
    getConnectionInfo() {
      return this.connectionInfo;
    }
    getMetricsRecorder() {
      return this.metricsRecorder;
    }
  }
  serverInterceptors.BaseServerInterceptingCall = BaseServerInterceptingCall;
  function getServerInterceptingCall(interceptors, stream, headers, callEventTracker, handler, options) {
    const methodDefinition = {
      path: handler.path,
      requestStream: handler.type === "clientStream" || handler.type === "bidi",
      responseStream: handler.type === "serverStream" || handler.type === "bidi",
      requestDeserialize: handler.deserialize,
      responseSerialize: handler.serialize
    };
    const baseCall = new BaseServerInterceptingCall(stream, headers, callEventTracker, handler, options);
    return interceptors.reduce((call2, interceptor) => {
      return interceptor(methodDefinition, call2);
    }, baseCall);
  }
  return serverInterceptors;
}
var hasRequiredServer$1;
function requireServer$1() {
  if (hasRequiredServer$1) return server$1;
  hasRequiredServer$1 = 1;
  var __runInitializers = server$1 && server$1.__runInitializers || function(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
  var __esDecorate = server$1 && server$1.__esDecorate || function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
  Object.defineProperty(server$1, "__esModule", { value: true });
  server$1.Server = void 0;
  const http2 = require$$0$5;
  const util = require$$0$6;
  const constants_1 = requireConstants$1();
  const server_call_1 = requireServerCall$1();
  const server_credentials_1 = requireServerCredentials$1();
  const resolver_1 = requireResolver$1();
  const logging2 = requireLogging$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const uri_parser_1 = requireUriParser$1();
  const channelz_1 = requireChannelz$1();
  const server_interceptors_1 = requireServerInterceptors();
  const UNLIMITED_CONNECTION_AGE_MS = 2147483647;
  const KEEPALIVE_MAX_TIME_MS = 2147483647;
  const KEEPALIVE_TIMEOUT_MS = 2e4;
  const MAX_CONNECTION_IDLE_MS = 2147483647;
  const { HTTP2_HEADER_PATH } = http2.constants;
  const TRACER_NAME = "server";
  const kMaxAge = Buffer.from("max_age");
  function serverCallTrace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, "server_call", text);
  }
  function noop() {
  }
  function deprecate(message) {
    return function(target, context) {
      return util.deprecate(target, message);
    };
  }
  function getUnimplementedStatusResponse(methodName) {
    return {
      code: constants_1.Status.UNIMPLEMENTED,
      details: `The server does not implement the method ${methodName}`
    };
  }
  function getDefaultHandler(handlerType, methodName) {
    const unimplementedStatusResponse = getUnimplementedStatusResponse(methodName);
    switch (handlerType) {
      case "unary":
        return (call2, callback) => {
          callback(unimplementedStatusResponse, null);
        };
      case "clientStream":
        return (call2, callback) => {
          callback(unimplementedStatusResponse, null);
        };
      case "serverStream":
        return (call2) => {
          call2.emit("error", unimplementedStatusResponse);
        };
      case "bidi":
        return (call2) => {
          call2.emit("error", unimplementedStatusResponse);
        };
      default:
        throw new Error(`Invalid handlerType ${handlerType}`);
    }
  }
  let Server = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _start_decorators;
    return _a = class Server {
      constructor(options) {
        var _b, _c, _d, _e, _f, _g;
        this.boundPorts = (__runInitializers(this, _instanceExtraInitializers), /* @__PURE__ */ new Map());
        this.http2Servers = /* @__PURE__ */ new Map();
        this.sessionIdleTimeouts = /* @__PURE__ */ new Map();
        this.handlers = /* @__PURE__ */ new Map();
        this.sessions = /* @__PURE__ */ new Map();
        this.started = false;
        this.shutdown = false;
        this.serverAddressString = "null";
        this.channelzEnabled = true;
        this.options = options !== null && options !== void 0 ? options : {};
        if (this.options["grpc.enable_channelz"] === 0) {
          this.channelzEnabled = false;
          this.channelzTrace = new channelz_1.ChannelzTraceStub();
          this.callTracker = new channelz_1.ChannelzCallTrackerStub();
          this.listenerChildrenTracker = new channelz_1.ChannelzChildrenTrackerStub();
          this.sessionChildrenTracker = new channelz_1.ChannelzChildrenTrackerStub();
        } else {
          this.channelzTrace = new channelz_1.ChannelzTrace();
          this.callTracker = new channelz_1.ChannelzCallTracker();
          this.listenerChildrenTracker = new channelz_1.ChannelzChildrenTracker();
          this.sessionChildrenTracker = new channelz_1.ChannelzChildrenTracker();
        }
        this.channelzRef = (0, channelz_1.registerChannelzServer)("server", () => this.getChannelzInfo(), this.channelzEnabled);
        this.channelzTrace.addTrace("CT_INFO", "Server created");
        this.maxConnectionAgeMs = (_b = this.options["grpc.max_connection_age_ms"]) !== null && _b !== void 0 ? _b : UNLIMITED_CONNECTION_AGE_MS;
        this.maxConnectionAgeGraceMs = (_c = this.options["grpc.max_connection_age_grace_ms"]) !== null && _c !== void 0 ? _c : UNLIMITED_CONNECTION_AGE_MS;
        this.keepaliveTimeMs = (_d = this.options["grpc.keepalive_time_ms"]) !== null && _d !== void 0 ? _d : KEEPALIVE_MAX_TIME_MS;
        this.keepaliveTimeoutMs = (_e = this.options["grpc.keepalive_timeout_ms"]) !== null && _e !== void 0 ? _e : KEEPALIVE_TIMEOUT_MS;
        this.sessionIdleTimeout = (_f = this.options["grpc.max_connection_idle_ms"]) !== null && _f !== void 0 ? _f : MAX_CONNECTION_IDLE_MS;
        this.commonServerOptions = {
          maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
        };
        if ("grpc-node.max_session_memory" in this.options) {
          this.commonServerOptions.maxSessionMemory = this.options["grpc-node.max_session_memory"];
        } else {
          this.commonServerOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
        }
        if ("grpc.max_concurrent_streams" in this.options) {
          this.commonServerOptions.settings = {
            maxConcurrentStreams: this.options["grpc.max_concurrent_streams"]
          };
        }
        this.interceptors = (_g = this.options.interceptors) !== null && _g !== void 0 ? _g : [];
        this.trace("Server constructed");
      }
      getChannelzInfo() {
        return {
          trace: this.channelzTrace,
          callTracker: this.callTracker,
          listenerChildren: this.listenerChildrenTracker.getChildLists(),
          sessionChildren: this.sessionChildrenTracker.getChildLists()
        };
      }
      getChannelzSessionInfo(session) {
        var _b, _c, _d;
        const sessionInfo = this.sessions.get(session);
        const sessionSocket = session.socket;
        const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
        const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
        let tlsInfo;
        if (session.encrypted) {
          const tlsSocket = sessionSocket;
          const cipherInfo = tlsSocket.getCipher();
          const certificate = tlsSocket.getCertificate();
          const peerCertificate = tlsSocket.getPeerCertificate();
          tlsInfo = {
            cipherSuiteStandardName: (_b = cipherInfo.standardName) !== null && _b !== void 0 ? _b : null,
            cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
            localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
            remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
          };
        } else {
          tlsInfo = null;
        }
        const socketInfo = {
          remoteAddress,
          localAddress,
          security: tlsInfo,
          remoteName: null,
          streamsStarted: sessionInfo.streamTracker.callsStarted,
          streamsSucceeded: sessionInfo.streamTracker.callsSucceeded,
          streamsFailed: sessionInfo.streamTracker.callsFailed,
          messagesSent: sessionInfo.messagesSent,
          messagesReceived: sessionInfo.messagesReceived,
          keepAlivesSent: sessionInfo.keepAlivesSent,
          lastLocalStreamCreatedTimestamp: null,
          lastRemoteStreamCreatedTimestamp: sessionInfo.streamTracker.lastCallStartedTimestamp,
          lastMessageSentTimestamp: sessionInfo.lastMessageSentTimestamp,
          lastMessageReceivedTimestamp: sessionInfo.lastMessageReceivedTimestamp,
          localFlowControlWindow: (_c = session.state.localWindowSize) !== null && _c !== void 0 ? _c : null,
          remoteFlowControlWindow: (_d = session.state.remoteWindowSize) !== null && _d !== void 0 ? _d : null
        };
        return socketInfo;
      }
      trace(text) {
        logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + text);
      }
      keepaliveTrace(text) {
        logging2.trace(constants_1.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + text);
      }
      addProtoService() {
        throw new Error("Not implemented. Use addService() instead");
      }
      addService(service, implementation) {
        if (service === null || typeof service !== "object" || implementation === null || typeof implementation !== "object") {
          throw new Error("addService() requires two objects as arguments");
        }
        const serviceKeys = Object.keys(service);
        if (serviceKeys.length === 0) {
          throw new Error("Cannot add an empty service to a server");
        }
        serviceKeys.forEach((name) => {
          const attrs = service[name];
          let methodType;
          if (attrs.requestStream) {
            if (attrs.responseStream) {
              methodType = "bidi";
            } else {
              methodType = "clientStream";
            }
          } else {
            if (attrs.responseStream) {
              methodType = "serverStream";
            } else {
              methodType = "unary";
            }
          }
          let implFn = implementation[name];
          let impl;
          if (implFn === void 0 && typeof attrs.originalName === "string") {
            implFn = implementation[attrs.originalName];
          }
          if (implFn !== void 0) {
            impl = implFn.bind(implementation);
          } else {
            impl = getDefaultHandler(methodType, name);
          }
          const success = this.register(attrs.path, impl, attrs.responseSerialize, attrs.requestDeserialize, methodType);
          if (success === false) {
            throw new Error(`Method handler for ${attrs.path} already provided.`);
          }
        });
      }
      removeService(service) {
        if (service === null || typeof service !== "object") {
          throw new Error("removeService() requires object as argument");
        }
        const serviceKeys = Object.keys(service);
        serviceKeys.forEach((name) => {
          const attrs = service[name];
          this.unregister(attrs.path);
        });
      }
      bind(port, creds) {
        throw new Error("Not implemented. Use bindAsync() instead");
      }
      /**
       * This API is experimental, so API stability is not guaranteed across minor versions.
       * @param boundAddress
       * @returns
       */
      experimentalRegisterListenerToChannelz(boundAddress) {
        return (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundAddress), () => {
          return {
            localAddress: boundAddress,
            remoteAddress: null,
            security: null,
            remoteName: null,
            streamsStarted: 0,
            streamsSucceeded: 0,
            streamsFailed: 0,
            messagesSent: 0,
            messagesReceived: 0,
            keepAlivesSent: 0,
            lastLocalStreamCreatedTimestamp: null,
            lastRemoteStreamCreatedTimestamp: null,
            lastMessageSentTimestamp: null,
            lastMessageReceivedTimestamp: null,
            localFlowControlWindow: null,
            remoteFlowControlWindow: null
          };
        }, this.channelzEnabled);
      }
      experimentalUnregisterListenerFromChannelz(channelzRef) {
        (0, channelz_1.unregisterChannelzRef)(channelzRef);
      }
      createHttp2Server(credentials) {
        let http2Server;
        if (credentials._isSecure()) {
          const constructorOptions = credentials._getConstructorOptions();
          const contextOptions = credentials._getSecureContextOptions();
          const secureServerOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, this.commonServerOptions), constructorOptions), contextOptions), { enableTrace: this.options["grpc-node.tls_enable_trace"] === 1 });
          let areCredentialsValid = contextOptions !== null;
          this.trace("Initial credentials valid: " + areCredentialsValid);
          http2Server = http2.createSecureServer(secureServerOptions);
          http2Server.prependListener("connection", (socket) => {
            if (!areCredentialsValid) {
              this.trace("Dropped connection from " + JSON.stringify(socket.address()) + " due to unloaded credentials");
              socket.destroy();
            }
          });
          http2Server.on("secureConnection", (socket) => {
            socket.on("error", (e) => {
              this.trace("An incoming TLS connection closed with error: " + e.message);
            });
          });
          const credsWatcher = (options) => {
            if (options) {
              const secureServer = http2Server;
              try {
                secureServer.setSecureContext(options);
              } catch (e) {
                logging2.log(constants_1.LogVerbosity.ERROR, "Failed to set secure context with error " + e.message);
                options = null;
              }
            }
            areCredentialsValid = options !== null;
            this.trace("Post-update credentials valid: " + areCredentialsValid);
          };
          credentials._addWatcher(credsWatcher);
          http2Server.on("close", () => {
            credentials._removeWatcher(credsWatcher);
          });
        } else {
          http2Server = http2.createServer(this.commonServerOptions);
        }
        http2Server.setTimeout(0, noop);
        this._setupHandlers(http2Server, credentials._getInterceptors());
        return http2Server;
      }
      bindOneAddress(address, boundPortObject) {
        this.trace("Attempting to bind " + (0, subchannel_address_1.subchannelAddressToString)(address));
        const http2Server = this.createHttp2Server(boundPortObject.credentials);
        return new Promise((resolve, reject) => {
          const onError = (err) => {
            this.trace("Failed to bind " + (0, subchannel_address_1.subchannelAddressToString)(address) + " with error " + err.message);
            resolve({
              port: "port" in address ? address.port : 1,
              error: err.message
            });
          };
          http2Server.once("error", onError);
          http2Server.listen(address, () => {
            const boundAddress = http2Server.address();
            let boundSubchannelAddress;
            if (typeof boundAddress === "string") {
              boundSubchannelAddress = {
                path: boundAddress
              };
            } else {
              boundSubchannelAddress = {
                host: boundAddress.address,
                port: boundAddress.port
              };
            }
            const channelzRef = this.experimentalRegisterListenerToChannelz(boundSubchannelAddress);
            this.listenerChildrenTracker.refChild(channelzRef);
            this.http2Servers.set(http2Server, {
              channelzRef,
              sessions: /* @__PURE__ */ new Set(),
              ownsChannelzRef: true
            });
            boundPortObject.listeningServers.add(http2Server);
            this.trace("Successfully bound " + (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
            resolve({
              port: "port" in boundSubchannelAddress ? boundSubchannelAddress.port : 1
            });
            http2Server.removeListener("error", onError);
          });
        });
      }
      async bindManyPorts(addressList, boundPortObject) {
        if (addressList.length === 0) {
          return {
            count: 0,
            port: 0,
            errors: []
          };
        }
        if ((0, subchannel_address_1.isTcpSubchannelAddress)(addressList[0]) && addressList[0].port === 0) {
          const firstAddressResult = await this.bindOneAddress(addressList[0], boundPortObject);
          if (firstAddressResult.error) {
            const restAddressResult = await this.bindManyPorts(addressList.slice(1), boundPortObject);
            return Object.assign(Object.assign({}, restAddressResult), { errors: [firstAddressResult.error, ...restAddressResult.errors] });
          } else {
            const restAddresses = addressList.slice(1).map((address) => (0, subchannel_address_1.isTcpSubchannelAddress)(address) ? { host: address.host, port: firstAddressResult.port } : address);
            const restAddressResult = await Promise.all(restAddresses.map((address) => this.bindOneAddress(address, boundPortObject)));
            const allResults = [firstAddressResult, ...restAddressResult];
            return {
              count: allResults.filter((result) => result.error === void 0).length,
              port: firstAddressResult.port,
              errors: allResults.filter((result) => result.error).map((result) => result.error)
            };
          }
        } else {
          const allResults = await Promise.all(addressList.map((address) => this.bindOneAddress(address, boundPortObject)));
          return {
            count: allResults.filter((result) => result.error === void 0).length,
            port: allResults[0].port,
            errors: allResults.filter((result) => result.error).map((result) => result.error)
          };
        }
      }
      async bindAddressList(addressList, boundPortObject) {
        const bindResult = await this.bindManyPorts(addressList, boundPortObject);
        if (bindResult.count > 0) {
          if (bindResult.count < addressList.length) {
            logging2.log(constants_1.LogVerbosity.INFO, `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`);
          }
          return bindResult.port;
        } else {
          const errorString = `No address added out of total ${addressList.length} resolved`;
          logging2.log(constants_1.LogVerbosity.ERROR, errorString);
          throw new Error(`${errorString} errors: [${bindResult.errors.join(",")}]`);
        }
      }
      resolvePort(port) {
        return new Promise((resolve, reject) => {
          let seenResolution = false;
          const resolverListener = (endpointList, attributes, serviceConfig2, resolutionNote) => {
            if (seenResolution) {
              return true;
            }
            seenResolution = true;
            if (!endpointList.ok) {
              reject(new Error(endpointList.error.details));
              return true;
            }
            const addressList = [].concat(...endpointList.value.map((endpoint) => endpoint.addresses));
            if (addressList.length === 0) {
              reject(new Error(`No addresses resolved for port ${port}`));
              return true;
            }
            resolve(addressList);
            return true;
          };
          const resolver2 = (0, resolver_1.createResolver)(port, resolverListener, this.options);
          resolver2.updateResolution();
        });
      }
      async bindPort(port, boundPortObject) {
        const addressList = await this.resolvePort(port);
        if (boundPortObject.cancelled) {
          this.completeUnbind(boundPortObject);
          throw new Error("bindAsync operation cancelled by unbind call");
        }
        const portNumber = await this.bindAddressList(addressList, boundPortObject);
        if (boundPortObject.cancelled) {
          this.completeUnbind(boundPortObject);
          throw new Error("bindAsync operation cancelled by unbind call");
        }
        return portNumber;
      }
      normalizePort(port) {
        const initialPortUri = (0, uri_parser_1.parseUri)(port);
        if (initialPortUri === null) {
          throw new Error(`Could not parse port "${port}"`);
        }
        const portUri = (0, resolver_1.mapUriDefaultScheme)(initialPortUri);
        if (portUri === null) {
          throw new Error(`Could not get a default scheme for port "${port}"`);
        }
        return portUri;
      }
      bindAsync(port, creds, callback) {
        if (this.shutdown) {
          throw new Error("bindAsync called after shutdown");
        }
        if (typeof port !== "string") {
          throw new TypeError("port must be a string");
        }
        if (creds === null || !(creds instanceof server_credentials_1.ServerCredentials)) {
          throw new TypeError("creds must be a ServerCredentials object");
        }
        if (typeof callback !== "function") {
          throw new TypeError("callback must be a function");
        }
        this.trace("bindAsync port=" + port);
        const portUri = this.normalizePort(port);
        const deferredCallback = (error2, port2) => {
          process.nextTick(() => callback(error2, port2));
        };
        let boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
        if (boundPortObject) {
          if (!creds._equals(boundPortObject.credentials)) {
            deferredCallback(new Error(`${port} already bound with incompatible credentials`), 0);
            return;
          }
          boundPortObject.cancelled = false;
          if (boundPortObject.completionPromise) {
            boundPortObject.completionPromise.then((portNum) => callback(null, portNum), (error2) => callback(error2, 0));
          } else {
            deferredCallback(null, boundPortObject.portNumber);
          }
          return;
        }
        boundPortObject = {
          mapKey: (0, uri_parser_1.uriToString)(portUri),
          originalUri: portUri,
          completionPromise: null,
          cancelled: false,
          portNumber: 0,
          credentials: creds,
          listeningServers: /* @__PURE__ */ new Set()
        };
        const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
        const completionPromise = this.bindPort(portUri, boundPortObject);
        boundPortObject.completionPromise = completionPromise;
        if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
          completionPromise.then((portNum) => {
            const finalUri = {
              scheme: portUri.scheme,
              authority: portUri.authority,
              path: (0, uri_parser_1.combineHostPort)({ host: splitPort.host, port: portNum })
            };
            boundPortObject.mapKey = (0, uri_parser_1.uriToString)(finalUri);
            boundPortObject.completionPromise = null;
            boundPortObject.portNumber = portNum;
            this.boundPorts.set(boundPortObject.mapKey, boundPortObject);
            callback(null, portNum);
          }, (error2) => {
            callback(error2, 0);
          });
        } else {
          this.boundPorts.set(boundPortObject.mapKey, boundPortObject);
          completionPromise.then((portNum) => {
            boundPortObject.completionPromise = null;
            boundPortObject.portNumber = portNum;
            callback(null, portNum);
          }, (error2) => {
            callback(error2, 0);
          });
        }
      }
      registerInjectorToChannelz() {
        return (0, channelz_1.registerChannelzSocket)("injector", () => {
          return {
            localAddress: null,
            remoteAddress: null,
            security: null,
            remoteName: null,
            streamsStarted: 0,
            streamsSucceeded: 0,
            streamsFailed: 0,
            messagesSent: 0,
            messagesReceived: 0,
            keepAlivesSent: 0,
            lastLocalStreamCreatedTimestamp: null,
            lastRemoteStreamCreatedTimestamp: null,
            lastMessageSentTimestamp: null,
            lastMessageReceivedTimestamp: null,
            localFlowControlWindow: null,
            remoteFlowControlWindow: null
          };
        }, this.channelzEnabled);
      }
      /**
       * This API is experimental, so API stability is not guaranteed across minor versions.
       * @param credentials
       * @param channelzRef
       * @returns
       */
      experimentalCreateConnectionInjectorWithChannelzRef(credentials, channelzRef, ownsChannelzRef = false) {
        if (credentials === null || !(credentials instanceof server_credentials_1.ServerCredentials)) {
          throw new TypeError("creds must be a ServerCredentials object");
        }
        if (this.channelzEnabled) {
          this.listenerChildrenTracker.refChild(channelzRef);
        }
        const server2 = this.createHttp2Server(credentials);
        const sessionsSet = /* @__PURE__ */ new Set();
        this.http2Servers.set(server2, {
          channelzRef,
          sessions: sessionsSet,
          ownsChannelzRef
        });
        return {
          injectConnection: (connection) => {
            server2.emit("connection", connection);
          },
          drain: (graceTimeMs) => {
            var _b, _c;
            for (const session of sessionsSet) {
              this.closeSession(session);
            }
            (_c = (_b = setTimeout(() => {
              for (const session of sessionsSet) {
                session.destroy(http2.constants.NGHTTP2_CANCEL);
              }
            }, graceTimeMs)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
          },
          destroy: () => {
            this.closeServer(server2);
            for (const session of sessionsSet) {
              this.closeSession(session);
            }
          }
        };
      }
      createConnectionInjector(credentials) {
        if (credentials === null || !(credentials instanceof server_credentials_1.ServerCredentials)) {
          throw new TypeError("creds must be a ServerCredentials object");
        }
        const channelzRef = this.registerInjectorToChannelz();
        return this.experimentalCreateConnectionInjectorWithChannelzRef(credentials, channelzRef, true);
      }
      closeServer(server2, callback) {
        this.trace("Closing server with address " + JSON.stringify(server2.address()));
        const serverInfo = this.http2Servers.get(server2);
        server2.close(() => {
          if (serverInfo && serverInfo.ownsChannelzRef) {
            this.listenerChildrenTracker.unrefChild(serverInfo.channelzRef);
            (0, channelz_1.unregisterChannelzRef)(serverInfo.channelzRef);
          }
          this.http2Servers.delete(server2);
          callback === null || callback === void 0 ? void 0 : callback();
        });
      }
      closeSession(session, callback) {
        var _b;
        this.trace("Closing session initiated by " + ((_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress));
        const sessionInfo = this.sessions.get(session);
        const closeCallback = () => {
          if (sessionInfo) {
            this.sessionChildrenTracker.unrefChild(sessionInfo.ref);
            (0, channelz_1.unregisterChannelzRef)(sessionInfo.ref);
          }
          callback === null || callback === void 0 ? void 0 : callback();
        };
        if (session.closed) {
          queueMicrotask(closeCallback);
        } else {
          session.close(closeCallback);
        }
      }
      completeUnbind(boundPortObject) {
        for (const server2 of boundPortObject.listeningServers) {
          const serverInfo = this.http2Servers.get(server2);
          this.closeServer(server2, () => {
            boundPortObject.listeningServers.delete(server2);
          });
          if (serverInfo) {
            for (const session of serverInfo.sessions) {
              this.closeSession(session);
            }
          }
        }
        this.boundPorts.delete(boundPortObject.mapKey);
      }
      /**
       * Unbind a previously bound port, or cancel an in-progress bindAsync
       * operation. If port 0 was bound, only the actual bound port can be
       * unbound. For example, if bindAsync was called with "localhost:0" and the
       * bound port result was 54321, it can be unbound as "localhost:54321".
       * @param port
       */
      unbind(port) {
        this.trace("unbind port=" + port);
        const portUri = this.normalizePort(port);
        const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
        if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
          throw new Error("Cannot unbind port 0");
        }
        const boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
        if (boundPortObject) {
          this.trace("unbinding " + boundPortObject.mapKey + " originally bound as " + (0, uri_parser_1.uriToString)(boundPortObject.originalUri));
          if (boundPortObject.completionPromise) {
            boundPortObject.cancelled = true;
          } else {
            this.completeUnbind(boundPortObject);
          }
        }
      }
      /**
       * Gracefully close all connections associated with a previously bound port.
       * After the grace time, forcefully close all remaining open connections.
       *
       * If port 0 was bound, only the actual bound port can be
       * drained. For example, if bindAsync was called with "localhost:0" and the
       * bound port result was 54321, it can be drained as "localhost:54321".
       * @param port
       * @param graceTimeMs
       * @returns
       */
      drain(port, graceTimeMs) {
        var _b, _c;
        this.trace("drain port=" + port + " graceTimeMs=" + graceTimeMs);
        const portUri = this.normalizePort(port);
        const splitPort = (0, uri_parser_1.splitHostPort)(portUri.path);
        if ((splitPort === null || splitPort === void 0 ? void 0 : splitPort.port) === 0) {
          throw new Error("Cannot drain port 0");
        }
        const boundPortObject = this.boundPorts.get((0, uri_parser_1.uriToString)(portUri));
        if (!boundPortObject) {
          return;
        }
        const allSessions = /* @__PURE__ */ new Set();
        for (const http2Server of boundPortObject.listeningServers) {
          const serverEntry = this.http2Servers.get(http2Server);
          if (serverEntry) {
            for (const session of serverEntry.sessions) {
              allSessions.add(session);
              this.closeSession(session, () => {
                allSessions.delete(session);
              });
            }
          }
        }
        (_c = (_b = setTimeout(() => {
          for (const session of allSessions) {
            session.destroy(http2.constants.NGHTTP2_CANCEL);
          }
        }, graceTimeMs)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
      }
      forceShutdown() {
        for (const boundPortObject of this.boundPorts.values()) {
          boundPortObject.cancelled = true;
        }
        this.boundPorts.clear();
        for (const server2 of this.http2Servers.keys()) {
          this.closeServer(server2);
        }
        this.sessions.forEach((channelzInfo, session) => {
          this.closeSession(session);
          session.destroy(http2.constants.NGHTTP2_CANCEL);
        });
        this.sessions.clear();
        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        this.shutdown = true;
      }
      register(name, handler, serialize, deserialize, type) {
        if (this.handlers.has(name)) {
          return false;
        }
        this.handlers.set(name, {
          func: handler,
          serialize,
          deserialize,
          type,
          path: name
        });
        return true;
      }
      unregister(name) {
        return this.handlers.delete(name);
      }
      /**
       * @deprecated No longer needed as of version 1.10.x
       */
      start() {
        if (this.http2Servers.size === 0 || [...this.http2Servers.keys()].every((server2) => !server2.listening)) {
          throw new Error("server must be bound in order to start");
        }
        if (this.started === true) {
          throw new Error("server is already started");
        }
        this.started = true;
      }
      tryShutdown(callback) {
        var _b;
        const wrappedCallback = (error2) => {
          (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
          callback(error2);
        };
        let pendingChecks = 0;
        function maybeCallback() {
          pendingChecks--;
          if (pendingChecks === 0) {
            wrappedCallback();
          }
        }
        this.shutdown = true;
        for (const [serverKey, server2] of this.http2Servers.entries()) {
          pendingChecks++;
          const serverString = server2.channelzRef.name;
          this.trace("Waiting for server " + serverString + " to close");
          this.closeServer(serverKey, () => {
            this.trace("Server " + serverString + " finished closing");
            maybeCallback();
          });
          for (const session of server2.sessions.keys()) {
            pendingChecks++;
            const sessionString = (_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress;
            this.trace("Waiting for session " + sessionString + " to close");
            this.closeSession(session, () => {
              this.trace("Session " + sessionString + " finished closing");
              maybeCallback();
            });
          }
        }
        if (pendingChecks === 0) {
          wrappedCallback();
        }
      }
      addHttp2Port() {
        throw new Error("Not yet implemented");
      }
      /**
       * Get the channelz reference object for this server. The returned value is
       * garbage if channelz is disabled for this server.
       * @returns
       */
      getChannelzRef() {
        return this.channelzRef;
      }
      _verifyContentType(stream, headers) {
        const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];
        if (typeof contentType !== "string" || !contentType.startsWith("application/grpc")) {
          stream.respond({
            [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE
          }, { endStream: true });
          return false;
        }
        return true;
      }
      _retrieveHandler(path) {
        serverCallTrace("Received call to method " + path + " at address " + this.serverAddressString);
        const handler = this.handlers.get(path);
        if (handler === void 0) {
          serverCallTrace("No handler registered for method " + path + ". Sending UNIMPLEMENTED status.");
          return null;
        }
        return handler;
      }
      _respondWithError(err, stream, channelzSessionInfo = null) {
        var _b, _c;
        const trailersToSend = Object.assign({ "grpc-status": (_b = err.code) !== null && _b !== void 0 ? _b : constants_1.Status.INTERNAL, "grpc-message": err.details, [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK, [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto" }, (_c = err.metadata) === null || _c === void 0 ? void 0 : _c.toHttp2Headers());
        stream.respond(trailersToSend, { endStream: true });
        this.callTracker.addCallFailed();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
      }
      _channelzHandler(extraInterceptors, stream, headers) {
        stream.once("error", (err) => {
        });
        this.onStreamOpened(stream);
        const channelzSessionInfo = this.sessions.get(stream.session);
        this.callTracker.addCallStarted();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallStarted();
        if (!this._verifyContentType(stream, headers)) {
          this.callTracker.addCallFailed();
          channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
          return;
        }
        const path = headers[HTTP2_HEADER_PATH];
        const handler = this._retrieveHandler(path);
        if (!handler) {
          this._respondWithError(getUnimplementedStatusResponse(path), stream, channelzSessionInfo);
          return;
        }
        const callEventTracker = {
          addMessageSent: () => {
            if (channelzSessionInfo) {
              channelzSessionInfo.messagesSent += 1;
              channelzSessionInfo.lastMessageSentTimestamp = /* @__PURE__ */ new Date();
            }
          },
          addMessageReceived: () => {
            if (channelzSessionInfo) {
              channelzSessionInfo.messagesReceived += 1;
              channelzSessionInfo.lastMessageReceivedTimestamp = /* @__PURE__ */ new Date();
            }
          },
          onCallEnd: (status) => {
            if (status.code === constants_1.Status.OK) {
              this.callTracker.addCallSucceeded();
            } else {
              this.callTracker.addCallFailed();
            }
          },
          onStreamEnd: (success) => {
            if (channelzSessionInfo) {
              if (success) {
                channelzSessionInfo.streamTracker.addCallSucceeded();
              } else {
                channelzSessionInfo.streamTracker.addCallFailed();
              }
            }
          }
        };
        const call2 = (0, server_interceptors_1.getServerInterceptingCall)([...extraInterceptors, ...this.interceptors], stream, headers, callEventTracker, handler, this.options);
        if (!this._runHandlerForCall(call2, handler)) {
          this.callTracker.addCallFailed();
          channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
          call2.sendStatus({
            code: constants_1.Status.INTERNAL,
            details: `Unknown handler type: ${handler.type}`
          });
        }
      }
      _streamHandler(extraInterceptors, stream, headers) {
        stream.once("error", (err) => {
        });
        this.onStreamOpened(stream);
        if (this._verifyContentType(stream, headers) !== true) {
          return;
        }
        const path = headers[HTTP2_HEADER_PATH];
        const handler = this._retrieveHandler(path);
        if (!handler) {
          this._respondWithError(getUnimplementedStatusResponse(path), stream, null);
          return;
        }
        const call2 = (0, server_interceptors_1.getServerInterceptingCall)([...extraInterceptors, ...this.interceptors], stream, headers, null, handler, this.options);
        if (!this._runHandlerForCall(call2, handler)) {
          call2.sendStatus({
            code: constants_1.Status.INTERNAL,
            details: `Unknown handler type: ${handler.type}`
          });
        }
      }
      _runHandlerForCall(call2, handler) {
        const { type } = handler;
        if (type === "unary") {
          handleUnary(call2, handler);
        } else if (type === "clientStream") {
          handleClientStreaming(call2, handler);
        } else if (type === "serverStream") {
          handleServerStreaming(call2, handler);
        } else if (type === "bidi") {
          handleBidiStreaming(call2, handler);
        } else {
          return false;
        }
        return true;
      }
      _setupHandlers(http2Server, extraInterceptors) {
        if (http2Server === null) {
          return;
        }
        const serverAddress = http2Server.address();
        let serverAddressString = "null";
        if (serverAddress) {
          if (typeof serverAddress === "string") {
            serverAddressString = serverAddress;
          } else {
            serverAddressString = serverAddress.address + ":" + serverAddress.port;
          }
        }
        this.serverAddressString = serverAddressString;
        const handler = this.channelzEnabled ? this._channelzHandler : this._streamHandler;
        const sessionHandler = this.channelzEnabled ? this._channelzSessionHandler(http2Server) : this._sessionHandler(http2Server);
        http2Server.on("stream", handler.bind(this, extraInterceptors));
        http2Server.on("session", sessionHandler);
      }
      _sessionHandler(http2Server) {
        return (session) => {
          var _b, _c;
          (_b = this.http2Servers.get(http2Server)) === null || _b === void 0 ? void 0 : _b.sessions.add(session);
          let connectionAgeTimer = null;
          let connectionAgeGraceTimer = null;
          let keepaliveTimer = null;
          let sessionClosedByServer = false;
          const idleTimeoutObj = this.enableIdleTimeout(session);
          if (this.maxConnectionAgeMs !== UNLIMITED_CONNECTION_AGE_MS) {
            const jitterMagnitude = this.maxConnectionAgeMs / 10;
            const jitter = Math.random() * jitterMagnitude * 2 - jitterMagnitude;
            connectionAgeTimer = setTimeout(() => {
              var _b2, _c2;
              sessionClosedByServer = true;
              this.trace("Connection dropped by max connection age: " + ((_b2 = session.socket) === null || _b2 === void 0 ? void 0 : _b2.remoteAddress));
              try {
                session.goaway(http2.constants.NGHTTP2_NO_ERROR, ~(1 << 31), kMaxAge);
              } catch (e) {
                session.destroy();
                return;
              }
              session.close();
              if (this.maxConnectionAgeGraceMs !== UNLIMITED_CONNECTION_AGE_MS) {
                connectionAgeGraceTimer = setTimeout(() => {
                  session.destroy();
                }, this.maxConnectionAgeGraceMs);
                (_c2 = connectionAgeGraceTimer.unref) === null || _c2 === void 0 ? void 0 : _c2.call(connectionAgeGraceTimer);
              }
            }, this.maxConnectionAgeMs + jitter);
            (_c = connectionAgeTimer.unref) === null || _c === void 0 ? void 0 : _c.call(connectionAgeTimer);
          }
          const clearKeepaliveTimeout = () => {
            if (keepaliveTimer) {
              clearTimeout(keepaliveTimer);
              keepaliveTimer = null;
            }
          };
          const canSendPing = () => {
            return !session.destroyed && this.keepaliveTimeMs < KEEPALIVE_MAX_TIME_MS && this.keepaliveTimeMs > 0;
          };
          let sendPing;
          const maybeStartKeepalivePingTimer = () => {
            var _b2;
            if (!canSendPing()) {
              return;
            }
            this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms");
            keepaliveTimer = setTimeout(() => {
              clearKeepaliveTimeout();
              sendPing();
            }, this.keepaliveTimeMs);
            (_b2 = keepaliveTimer.unref) === null || _b2 === void 0 ? void 0 : _b2.call(keepaliveTimer);
          };
          sendPing = () => {
            var _b2;
            if (!canSendPing()) {
              return;
            }
            this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
            let pingSendError = "";
            try {
              const pingSentSuccessfully = session.ping((err, duration2, payload) => {
                clearKeepaliveTimeout();
                if (err) {
                  this.keepaliveTrace("Ping failed with error: " + err.message);
                  sessionClosedByServer = true;
                  session.destroy();
                } else {
                  this.keepaliveTrace("Received ping response");
                  maybeStartKeepalivePingTimer();
                }
              });
              if (!pingSentSuccessfully) {
                pingSendError = "Ping returned false";
              }
            } catch (e) {
              pingSendError = (e instanceof Error ? e.message : "") || "Unknown error";
            }
            if (pingSendError) {
              this.keepaliveTrace("Ping send failed: " + pingSendError);
              this.trace("Connection dropped due to ping send error: " + pingSendError);
              sessionClosedByServer = true;
              session.destroy();
              return;
            }
            keepaliveTimer = setTimeout(() => {
              clearKeepaliveTimeout();
              this.keepaliveTrace("Ping timeout passed without response");
              this.trace("Connection dropped by keepalive timeout");
              sessionClosedByServer = true;
              session.destroy();
            }, this.keepaliveTimeoutMs);
            (_b2 = keepaliveTimer.unref) === null || _b2 === void 0 ? void 0 : _b2.call(keepaliveTimer);
          };
          maybeStartKeepalivePingTimer();
          session.on("close", () => {
            var _b2, _c2;
            if (!sessionClosedByServer) {
              this.trace(`Connection dropped by client ${(_b2 = session.socket) === null || _b2 === void 0 ? void 0 : _b2.remoteAddress}`);
            }
            if (connectionAgeTimer) {
              clearTimeout(connectionAgeTimer);
            }
            if (connectionAgeGraceTimer) {
              clearTimeout(connectionAgeGraceTimer);
            }
            clearKeepaliveTimeout();
            if (idleTimeoutObj !== null) {
              clearTimeout(idleTimeoutObj.timeout);
              this.sessionIdleTimeouts.delete(session);
            }
            (_c2 = this.http2Servers.get(http2Server)) === null || _c2 === void 0 ? void 0 : _c2.sessions.delete(session);
          });
        };
      }
      _channelzSessionHandler(http2Server) {
        return (session) => {
          var _b, _c, _d, _e;
          const channelzRef = (0, channelz_1.registerChannelzSocket)((_c = (_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress) !== null && _c !== void 0 ? _c : "unknown", this.getChannelzSessionInfo.bind(this, session), this.channelzEnabled);
          const channelzSessionInfo = {
            ref: channelzRef,
            streamTracker: new channelz_1.ChannelzCallTracker(),
            messagesSent: 0,
            messagesReceived: 0,
            keepAlivesSent: 0,
            lastMessageSentTimestamp: null,
            lastMessageReceivedTimestamp: null
          };
          (_d = this.http2Servers.get(http2Server)) === null || _d === void 0 ? void 0 : _d.sessions.add(session);
          this.sessions.set(session, channelzSessionInfo);
          const clientAddress = `${session.socket.remoteAddress}:${session.socket.remotePort}`;
          this.channelzTrace.addTrace("CT_INFO", "Connection established by client " + clientAddress);
          this.trace("Connection established by client " + clientAddress);
          this.sessionChildrenTracker.refChild(channelzRef);
          let connectionAgeTimer = null;
          let connectionAgeGraceTimer = null;
          let keepaliveTimeout = null;
          let sessionClosedByServer = false;
          const idleTimeoutObj = this.enableIdleTimeout(session);
          if (this.maxConnectionAgeMs !== UNLIMITED_CONNECTION_AGE_MS) {
            const jitterMagnitude = this.maxConnectionAgeMs / 10;
            const jitter = Math.random() * jitterMagnitude * 2 - jitterMagnitude;
            connectionAgeTimer = setTimeout(() => {
              var _b2;
              sessionClosedByServer = true;
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by max connection age from " + clientAddress);
              try {
                session.goaway(http2.constants.NGHTTP2_NO_ERROR, ~(1 << 31), kMaxAge);
              } catch (e) {
                session.destroy();
                return;
              }
              session.close();
              if (this.maxConnectionAgeGraceMs !== UNLIMITED_CONNECTION_AGE_MS) {
                connectionAgeGraceTimer = setTimeout(() => {
                  session.destroy();
                }, this.maxConnectionAgeGraceMs);
                (_b2 = connectionAgeGraceTimer.unref) === null || _b2 === void 0 ? void 0 : _b2.call(connectionAgeGraceTimer);
              }
            }, this.maxConnectionAgeMs + jitter);
            (_e = connectionAgeTimer.unref) === null || _e === void 0 ? void 0 : _e.call(connectionAgeTimer);
          }
          const clearKeepaliveTimeout = () => {
            if (keepaliveTimeout) {
              clearTimeout(keepaliveTimeout);
              keepaliveTimeout = null;
            }
          };
          const canSendPing = () => {
            return !session.destroyed && this.keepaliveTimeMs < KEEPALIVE_MAX_TIME_MS && this.keepaliveTimeMs > 0;
          };
          let sendPing;
          const maybeStartKeepalivePingTimer = () => {
            var _b2;
            if (!canSendPing()) {
              return;
            }
            this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms");
            keepaliveTimeout = setTimeout(() => {
              clearKeepaliveTimeout();
              sendPing();
            }, this.keepaliveTimeMs);
            (_b2 = keepaliveTimeout.unref) === null || _b2 === void 0 ? void 0 : _b2.call(keepaliveTimeout);
          };
          sendPing = () => {
            var _b2;
            if (!canSendPing()) {
              return;
            }
            this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
            let pingSendError = "";
            try {
              const pingSentSuccessfully = session.ping((err, duration2, payload) => {
                clearKeepaliveTimeout();
                if (err) {
                  this.keepaliveTrace("Ping failed with error: " + err.message);
                  this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to error of a ping frame " + err.message + " return in " + duration2);
                  sessionClosedByServer = true;
                  session.destroy();
                } else {
                  this.keepaliveTrace("Received ping response");
                  maybeStartKeepalivePingTimer();
                }
              });
              if (!pingSentSuccessfully) {
                pingSendError = "Ping returned false";
              }
            } catch (e) {
              pingSendError = (e instanceof Error ? e.message : "") || "Unknown error";
            }
            if (pingSendError) {
              this.keepaliveTrace("Ping send failed: " + pingSendError);
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to ping send error: " + pingSendError);
              sessionClosedByServer = true;
              session.destroy();
              return;
            }
            channelzSessionInfo.keepAlivesSent += 1;
            keepaliveTimeout = setTimeout(() => {
              clearKeepaliveTimeout();
              this.keepaliveTrace("Ping timeout passed without response");
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by keepalive timeout from " + clientAddress);
              sessionClosedByServer = true;
              session.destroy();
            }, this.keepaliveTimeoutMs);
            (_b2 = keepaliveTimeout.unref) === null || _b2 === void 0 ? void 0 : _b2.call(keepaliveTimeout);
          };
          maybeStartKeepalivePingTimer();
          session.on("close", () => {
            var _b2;
            if (!sessionClosedByServer) {
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by client " + clientAddress);
            }
            this.sessionChildrenTracker.unrefChild(channelzRef);
            (0, channelz_1.unregisterChannelzRef)(channelzRef);
            if (connectionAgeTimer) {
              clearTimeout(connectionAgeTimer);
            }
            if (connectionAgeGraceTimer) {
              clearTimeout(connectionAgeGraceTimer);
            }
            clearKeepaliveTimeout();
            if (idleTimeoutObj !== null) {
              clearTimeout(idleTimeoutObj.timeout);
              this.sessionIdleTimeouts.delete(session);
            }
            (_b2 = this.http2Servers.get(http2Server)) === null || _b2 === void 0 ? void 0 : _b2.sessions.delete(session);
            this.sessions.delete(session);
          });
        };
      }
      enableIdleTimeout(session) {
        var _b, _c;
        if (this.sessionIdleTimeout >= MAX_CONNECTION_IDLE_MS) {
          return null;
        }
        const idleTimeoutObj = {
          activeStreams: 0,
          lastIdle: Date.now(),
          onClose: this.onStreamClose.bind(this, session),
          timeout: setTimeout(this.onIdleTimeout, this.sessionIdleTimeout, this, session)
        };
        (_c = (_b = idleTimeoutObj.timeout).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
        this.sessionIdleTimeouts.set(session, idleTimeoutObj);
        const { socket } = session;
        this.trace("Enable idle timeout for " + socket.remoteAddress + ":" + socket.remotePort);
        return idleTimeoutObj;
      }
      onIdleTimeout(ctx, session) {
        const { socket } = session;
        const sessionInfo = ctx.sessionIdleTimeouts.get(session);
        if (sessionInfo !== void 0 && sessionInfo.activeStreams === 0) {
          if (Date.now() - sessionInfo.lastIdle >= ctx.sessionIdleTimeout) {
            ctx.trace("Session idle timeout triggered for " + (socket === null || socket === void 0 ? void 0 : socket.remoteAddress) + ":" + (socket === null || socket === void 0 ? void 0 : socket.remotePort) + " last idle at " + sessionInfo.lastIdle);
            ctx.closeSession(session);
          } else {
            sessionInfo.timeout.refresh();
          }
        }
      }
      onStreamOpened(stream) {
        const session = stream.session;
        const idleTimeoutObj = this.sessionIdleTimeouts.get(session);
        if (idleTimeoutObj) {
          idleTimeoutObj.activeStreams += 1;
          stream.once("close", idleTimeoutObj.onClose);
        }
      }
      onStreamClose(session) {
        var _b, _c;
        const idleTimeoutObj = this.sessionIdleTimeouts.get(session);
        if (idleTimeoutObj) {
          idleTimeoutObj.activeStreams -= 1;
          if (idleTimeoutObj.activeStreams === 0) {
            idleTimeoutObj.lastIdle = Date.now();
            idleTimeoutObj.timeout.refresh();
            this.trace("Session onStreamClose" + ((_b = session.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress) + ":" + ((_c = session.socket) === null || _c === void 0 ? void 0 : _c.remotePort) + " at " + idleTimeoutObj.lastIdle);
          }
        }
      }
    }, (() => {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _start_decorators = [deprecate("Calling start() is no longer necessary. It can be safely omitted.")];
      __esDecorate(_a, null, _start_decorators, { kind: "method", name: "start", static: false, private: false, access: { has: (obj) => "start" in obj, get: (obj) => obj.start }, metadata: _metadata }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })(), _a;
  })();
  server$1.Server = Server;
  async function handleUnary(call2, handler) {
    let stream;
    function respond(err, value, trailer, flags) {
      if (err) {
        call2.sendStatus((0, server_call_1.serverErrorToStatus)(err, trailer));
        return;
      }
      call2.sendMessage(value, () => {
        call2.sendStatus({
          code: constants_1.Status.OK,
          details: "OK",
          metadata: trailer !== null && trailer !== void 0 ? trailer : null
        });
      });
    }
    let requestMetadata;
    let requestMessage = null;
    call2.start({
      onReceiveMetadata(metadata2) {
        requestMetadata = metadata2;
        call2.startRead();
      },
      onReceiveMessage(message) {
        if (requestMessage) {
          call2.sendStatus({
            code: constants_1.Status.UNIMPLEMENTED,
            details: `Received a second request message for server streaming method ${handler.path}`,
            metadata: null
          });
          return;
        }
        requestMessage = message;
        call2.startRead();
      },
      onReceiveHalfClose() {
        if (!requestMessage) {
          call2.sendStatus({
            code: constants_1.Status.UNIMPLEMENTED,
            details: `Received no request message for server streaming method ${handler.path}`,
            metadata: null
          });
          return;
        }
        stream = new server_call_1.ServerWritableStreamImpl(handler.path, call2, requestMetadata, requestMessage);
        try {
          handler.func(stream, respond);
        } catch (err) {
          call2.sendStatus({
            code: constants_1.Status.UNKNOWN,
            details: `Server method handler threw error ${err.message}`,
            metadata: null
          });
        }
      },
      onCancel() {
        if (stream) {
          stream.cancelled = true;
          stream.emit("cancelled", "cancelled");
        }
      }
    });
  }
  function handleClientStreaming(call2, handler) {
    let stream;
    function respond(err, value, trailer, flags) {
      if (err) {
        call2.sendStatus((0, server_call_1.serverErrorToStatus)(err, trailer));
        return;
      }
      call2.sendMessage(value, () => {
        call2.sendStatus({
          code: constants_1.Status.OK,
          details: "OK",
          metadata: trailer !== null && trailer !== void 0 ? trailer : null
        });
      });
    }
    call2.start({
      onReceiveMetadata(metadata2) {
        stream = new server_call_1.ServerDuplexStreamImpl(handler.path, call2, metadata2);
        try {
          handler.func(stream, respond);
        } catch (err) {
          call2.sendStatus({
            code: constants_1.Status.UNKNOWN,
            details: `Server method handler threw error ${err.message}`,
            metadata: null
          });
        }
      },
      onReceiveMessage(message) {
        stream.push(message);
      },
      onReceiveHalfClose() {
        stream.push(null);
      },
      onCancel() {
        if (stream) {
          stream.cancelled = true;
          stream.emit("cancelled", "cancelled");
          stream.destroy();
        }
      }
    });
  }
  function handleServerStreaming(call2, handler) {
    let stream;
    let requestMetadata;
    let requestMessage = null;
    call2.start({
      onReceiveMetadata(metadata2) {
        requestMetadata = metadata2;
        call2.startRead();
      },
      onReceiveMessage(message) {
        if (requestMessage) {
          call2.sendStatus({
            code: constants_1.Status.UNIMPLEMENTED,
            details: `Received a second request message for server streaming method ${handler.path}`,
            metadata: null
          });
          return;
        }
        requestMessage = message;
        call2.startRead();
      },
      onReceiveHalfClose() {
        if (!requestMessage) {
          call2.sendStatus({
            code: constants_1.Status.UNIMPLEMENTED,
            details: `Received no request message for server streaming method ${handler.path}`,
            metadata: null
          });
          return;
        }
        stream = new server_call_1.ServerWritableStreamImpl(handler.path, call2, requestMetadata, requestMessage);
        try {
          handler.func(stream);
        } catch (err) {
          call2.sendStatus({
            code: constants_1.Status.UNKNOWN,
            details: `Server method handler threw error ${err.message}`,
            metadata: null
          });
        }
      },
      onCancel() {
        if (stream) {
          stream.cancelled = true;
          stream.emit("cancelled", "cancelled");
          stream.destroy();
        }
      }
    });
  }
  function handleBidiStreaming(call2, handler) {
    let stream;
    call2.start({
      onReceiveMetadata(metadata2) {
        stream = new server_call_1.ServerDuplexStreamImpl(handler.path, call2, metadata2);
        try {
          handler.func(stream);
        } catch (err) {
          call2.sendStatus({
            code: constants_1.Status.UNKNOWN,
            details: `Server method handler threw error ${err.message}`,
            metadata: null
          });
        }
      },
      onReceiveMessage(message) {
        stream.push(message);
      },
      onReceiveHalfClose() {
        stream.push(null);
      },
      onCancel() {
        if (stream) {
          stream.cancelled = true;
          stream.emit("cancelled", "cancelled");
          stream.destroy();
        }
      }
    });
  }
  return server$1;
}
var statusBuilder$1 = {};
var hasRequiredStatusBuilder$1;
function requireStatusBuilder$1() {
  if (hasRequiredStatusBuilder$1) return statusBuilder$1;
  hasRequiredStatusBuilder$1 = 1;
  Object.defineProperty(statusBuilder$1, "__esModule", { value: true });
  statusBuilder$1.StatusBuilder = void 0;
  class StatusBuilder {
    constructor() {
      this.code = null;
      this.details = null;
      this.metadata = null;
    }
    /**
     * Adds a status code to the builder.
     */
    withCode(code) {
      this.code = code;
      return this;
    }
    /**
     * Adds details to the builder.
     */
    withDetails(details) {
      this.details = details;
      return this;
    }
    /**
     * Adds metadata to the builder.
     */
    withMetadata(metadata2) {
      this.metadata = metadata2;
      return this;
    }
    /**
     * Builds the status object.
     */
    build() {
      const status = {};
      if (this.code !== null) {
        status.code = this.code;
      }
      if (this.details !== null) {
        status.details = this.details;
      }
      if (this.metadata !== null) {
        status.metadata = this.metadata;
      }
      return status;
    }
  }
  statusBuilder$1.StatusBuilder = StatusBuilder;
  return statusBuilder$1;
}
var experimental$1 = {};
var loadBalancerPickFirst$1 = {};
var hasRequiredLoadBalancerPickFirst$1;
function requireLoadBalancerPickFirst$1() {
  if (hasRequiredLoadBalancerPickFirst$1) return loadBalancerPickFirst$1;
  hasRequiredLoadBalancerPickFirst$1 = 1;
  Object.defineProperty(loadBalancerPickFirst$1, "__esModule", { value: true });
  loadBalancerPickFirst$1.LeafLoadBalancer = loadBalancerPickFirst$1.PickFirstLoadBalancer = loadBalancerPickFirst$1.PickFirstLoadBalancingConfig = void 0;
  loadBalancerPickFirst$1.shuffled = shuffled;
  loadBalancerPickFirst$1.setup = setup;
  const load_balancer_1 = requireLoadBalancer$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const picker_1 = requirePicker$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const logging2 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const subchannel_address_2 = requireSubchannelAddress$1();
  const net_1 = require$$0$1;
  const call_interface_1 = requireCallInterface$1();
  const TRACER_NAME = "pick_first";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "pick_first";
  const CONNECTION_DELAY_INTERVAL_MS = 250;
  class PickFirstLoadBalancingConfig {
    constructor(shuffleAddressList) {
      this.shuffleAddressList = shuffleAddressList;
    }
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    toJsonObject() {
      return {
        [TYPE_NAME]: {
          shuffleAddressList: this.shuffleAddressList
        }
      };
    }
    getShuffleAddressList() {
      return this.shuffleAddressList;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
      if ("shuffleAddressList" in obj && !(typeof obj.shuffleAddressList === "boolean")) {
        throw new Error("pick_first config field shuffleAddressList must be a boolean if provided");
      }
      return new PickFirstLoadBalancingConfig(obj.shuffleAddressList === true);
    }
  }
  loadBalancerPickFirst$1.PickFirstLoadBalancingConfig = PickFirstLoadBalancingConfig;
  class PickFirstPicker {
    constructor(subchannel2) {
      this.subchannel = subchannel2;
    }
    pick(pickArgs) {
      return {
        pickResultType: picker_1.PickResultType.COMPLETE,
        subchannel: this.subchannel,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      };
    }
  }
  function shuffled(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
  function interleaveAddressFamilies(addressList) {
    if (addressList.length === 0) {
      return [];
    }
    const result = [];
    const ipv6Addresses = [];
    const ipv4Addresses = [];
    const ipv6First = (0, subchannel_address_2.isTcpSubchannelAddress)(addressList[0]) && (0, net_1.isIPv6)(addressList[0].host);
    for (const address of addressList) {
      if ((0, subchannel_address_2.isTcpSubchannelAddress)(address) && (0, net_1.isIPv6)(address.host)) {
        ipv6Addresses.push(address);
      } else {
        ipv4Addresses.push(address);
      }
    }
    const firstList = ipv6First ? ipv6Addresses : ipv4Addresses;
    const secondList = ipv6First ? ipv4Addresses : ipv6Addresses;
    for (let i = 0; i < Math.max(firstList.length, secondList.length); i++) {
      if (i < firstList.length) {
        result.push(firstList[i]);
      }
      if (i < secondList.length) {
        result.push(secondList[i]);
      }
    }
    return result;
  }
  const REPORT_HEALTH_STATUS_OPTION_NAME = "grpc-node.internal.pick-first.report_health_status";
  class PickFirstLoadBalancer {
    /**
     * Load balancer that attempts to connect to each backend in the address list
     * in order, and picks the first one that connects, using it for every
     * request.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     */
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.children = [];
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.currentSubchannelIndex = 0;
      this.currentPick = null;
      this.subchannelStateListener = (subchannel2, previousState, newState, keepaliveTime, errorMessage) => {
        this.onSubchannelStateUpdate(subchannel2, previousState, newState, errorMessage);
      };
      this.pickedSubchannelHealthListener = () => this.calculateAndReportNewState();
      this.stickyTransientFailureMode = false;
      this.reportHealthStatus = false;
      this.lastError = null;
      this.latestAddressList = null;
      this.latestOptions = {};
      this.latestResolutionNote = "";
      this.connectionDelayTimeout = setTimeout(() => {
      }, 0);
      clearTimeout(this.connectionDelayTimeout);
    }
    allChildrenHaveReportedTF() {
      return this.children.every((child) => child.hasReportedTransientFailure);
    }
    resetChildrenReportedTF() {
      this.children.every((child) => child.hasReportedTransientFailure = false);
    }
    calculateAndReportNewState() {
      var _a;
      if (this.currentPick) {
        if (this.reportHealthStatus && !this.currentPick.isHealthy()) {
          const errorMessage = `Picked subchannel ${this.currentPick.getAddress()} is unhealthy`;
          this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({
            details: errorMessage
          }), errorMessage);
        } else {
          this.updateState(connectivity_state_1.ConnectivityState.READY, new PickFirstPicker(this.currentPick), null);
        }
      } else if (((_a = this.latestAddressList) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        const errorMessage = `No connection established. Last error: ${this.lastError}. Resolution note: ${this.latestResolutionNote}`;
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({
          details: errorMessage
        }), errorMessage);
      } else if (this.children.length === 0) {
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this), null);
      } else {
        if (this.stickyTransientFailureMode) {
          const errorMessage = `No connection established. Last error: ${this.lastError}. Resolution note: ${this.latestResolutionNote}`;
          this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({
            details: errorMessage
          }), errorMessage);
        } else {
          this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this), null);
        }
      }
    }
    requestReresolution() {
      this.channelControlHelper.requestReresolution();
    }
    maybeEnterStickyTransientFailureMode() {
      if (!this.allChildrenHaveReportedTF()) {
        return;
      }
      this.requestReresolution();
      this.resetChildrenReportedTF();
      if (this.stickyTransientFailureMode) {
        this.calculateAndReportNewState();
        return;
      }
      this.stickyTransientFailureMode = true;
      for (const { subchannel: subchannel2 } of this.children) {
        subchannel2.startConnecting();
      }
      this.calculateAndReportNewState();
    }
    removeCurrentPick() {
      if (this.currentPick !== null) {
        this.currentPick.removeConnectivityStateListener(this.subchannelStateListener);
        this.channelControlHelper.removeChannelzChild(this.currentPick.getChannelzRef());
        this.currentPick.removeHealthStateWatcher(this.pickedSubchannelHealthListener);
        this.currentPick.unref();
        this.currentPick = null;
      }
    }
    onSubchannelStateUpdate(subchannel2, previousState, newState, errorMessage) {
      var _a;
      if ((_a = this.currentPick) === null || _a === void 0 ? void 0 : _a.realSubchannelEquals(subchannel2)) {
        if (newState !== connectivity_state_1.ConnectivityState.READY) {
          this.removeCurrentPick();
          this.calculateAndReportNewState();
        }
        return;
      }
      for (const [index, child] of this.children.entries()) {
        if (subchannel2.realSubchannelEquals(child.subchannel)) {
          if (newState === connectivity_state_1.ConnectivityState.READY) {
            this.pickSubchannel(child.subchannel);
          }
          if (newState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            child.hasReportedTransientFailure = true;
            if (errorMessage) {
              this.lastError = errorMessage;
            }
            this.maybeEnterStickyTransientFailureMode();
            if (index === this.currentSubchannelIndex) {
              this.startNextSubchannelConnecting(index + 1);
            }
          }
          child.subchannel.startConnecting();
          return;
        }
      }
    }
    startNextSubchannelConnecting(startIndex) {
      clearTimeout(this.connectionDelayTimeout);
      for (const [index, child] of this.children.entries()) {
        if (index >= startIndex) {
          const subchannelState = child.subchannel.getConnectivityState();
          if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.CONNECTING) {
            this.startConnecting(index);
            return;
          }
        }
      }
      this.maybeEnterStickyTransientFailureMode();
    }
    /**
     * Have a single subchannel in the `subchannels` list start connecting.
     * @param subchannelIndex The index into the `subchannels` list.
     */
    startConnecting(subchannelIndex) {
      var _a, _b;
      clearTimeout(this.connectionDelayTimeout);
      this.currentSubchannelIndex = subchannelIndex;
      if (this.children[subchannelIndex].subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.IDLE) {
        trace("Start connecting to subchannel with address " + this.children[subchannelIndex].subchannel.getAddress());
        process.nextTick(() => {
          var _a2;
          (_a2 = this.children[subchannelIndex]) === null || _a2 === void 0 ? void 0 : _a2.subchannel.startConnecting();
        });
      }
      this.connectionDelayTimeout = setTimeout(() => {
        this.startNextSubchannelConnecting(subchannelIndex + 1);
      }, CONNECTION_DELAY_INTERVAL_MS);
      (_b = (_a = this.connectionDelayTimeout).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Declare that the specified subchannel should be used to make requests.
     * This functions the same independent of whether subchannel is a member of
     * this.children and whether it is equal to this.currentPick.
     * Prerequisite: subchannel.getConnectivityState() === READY.
     * @param subchannel
     */
    pickSubchannel(subchannel2) {
      trace("Pick subchannel with address " + subchannel2.getAddress());
      this.stickyTransientFailureMode = false;
      subchannel2.ref();
      this.channelControlHelper.addChannelzChild(subchannel2.getChannelzRef());
      this.removeCurrentPick();
      this.resetSubchannelList();
      subchannel2.addConnectivityStateListener(this.subchannelStateListener);
      subchannel2.addHealthStateWatcher(this.pickedSubchannelHealthListener);
      this.currentPick = subchannel2;
      clearTimeout(this.connectionDelayTimeout);
      this.calculateAndReportNewState();
    }
    updateState(newState, picker2, errorMessage) {
      trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      this.currentState = newState;
      this.channelControlHelper.updateState(newState, picker2, errorMessage);
    }
    resetSubchannelList() {
      for (const child of this.children) {
        child.subchannel.removeConnectivityStateListener(this.subchannelStateListener);
        child.subchannel.unref();
        this.channelControlHelper.removeChannelzChild(child.subchannel.getChannelzRef());
      }
      this.currentSubchannelIndex = 0;
      this.children = [];
    }
    connectToAddressList(addressList, options) {
      trace("connectToAddressList([" + addressList.map((address) => (0, subchannel_address_1.subchannelAddressToString)(address)) + "])");
      const newChildrenList = addressList.map((address) => ({
        subchannel: this.channelControlHelper.createSubchannel(address, options),
        hasReportedTransientFailure: false
      }));
      for (const { subchannel: subchannel2 } of newChildrenList) {
        if (subchannel2.getConnectivityState() === connectivity_state_1.ConnectivityState.READY) {
          this.pickSubchannel(subchannel2);
          return;
        }
      }
      for (const { subchannel: subchannel2 } of newChildrenList) {
        subchannel2.ref();
        this.channelControlHelper.addChannelzChild(subchannel2.getChannelzRef());
      }
      this.resetSubchannelList();
      this.children = newChildrenList;
      for (const { subchannel: subchannel2 } of this.children) {
        subchannel2.addConnectivityStateListener(this.subchannelStateListener);
      }
      for (const child of this.children) {
        if (child.subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
          child.hasReportedTransientFailure = true;
        }
      }
      this.startNextSubchannelConnecting(0);
      this.calculateAndReportNewState();
    }
    updateAddressList(maybeEndpointList, lbConfig, options, resolutionNote) {
      if (!(lbConfig instanceof PickFirstLoadBalancingConfig)) {
        return false;
      }
      if (!maybeEndpointList.ok) {
        if (this.children.length === 0 && this.currentPick === null) {
          this.channelControlHelper.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(maybeEndpointList.error), maybeEndpointList.error.details);
        }
        return true;
      }
      let endpointList = maybeEndpointList.value;
      this.reportHealthStatus = options[REPORT_HEALTH_STATUS_OPTION_NAME];
      if (lbConfig.getShuffleAddressList()) {
        endpointList = shuffled(endpointList);
      }
      const rawAddressList = [].concat(...endpointList.map((endpoint) => endpoint.addresses));
      trace("updateAddressList([" + rawAddressList.map((address) => (0, subchannel_address_1.subchannelAddressToString)(address)) + "])");
      const addressList = interleaveAddressFamilies(rawAddressList);
      this.latestAddressList = addressList;
      this.latestOptions = options;
      this.connectToAddressList(addressList, options);
      this.latestResolutionNote = resolutionNote;
      if (rawAddressList.length > 0) {
        return true;
      } else {
        this.lastError = "No addresses resolved";
        return false;
      }
    }
    exitIdle() {
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE && this.latestAddressList) {
        this.connectToAddressList(this.latestAddressList, this.latestOptions);
      }
    }
    resetBackoff() {
    }
    destroy() {
      this.resetSubchannelList();
      this.removeCurrentPick();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerPickFirst$1.PickFirstLoadBalancer = PickFirstLoadBalancer;
  const LEAF_CONFIG = new PickFirstLoadBalancingConfig(false);
  class LeafLoadBalancer {
    constructor(endpoint, channelControlHelper, options, resolutionNote) {
      this.endpoint = endpoint;
      this.options = options;
      this.resolutionNote = resolutionNote;
      this.latestState = connectivity_state_1.ConnectivityState.IDLE;
      const childChannelControlHelper = (0, load_balancer_1.createChildChannelControlHelper)(channelControlHelper, {
        updateState: (connectivityState2, picker2, errorMessage) => {
          this.latestState = connectivityState2;
          this.latestPicker = picker2;
          channelControlHelper.updateState(connectivityState2, picker2, errorMessage);
        }
      });
      this.pickFirstBalancer = new PickFirstLoadBalancer(childChannelControlHelper);
      this.latestPicker = new picker_1.QueuePicker(this.pickFirstBalancer);
    }
    startConnecting() {
      this.pickFirstBalancer.updateAddressList((0, call_interface_1.statusOrFromValue)([this.endpoint]), LEAF_CONFIG, Object.assign(Object.assign({}, this.options), { [REPORT_HEALTH_STATUS_OPTION_NAME]: true }), this.resolutionNote);
    }
    /**
     * Update the endpoint associated with this LeafLoadBalancer to a new
     * endpoint. Does not trigger connection establishment if a connection
     * attempt is not already in progress.
     * @param newEndpoint
     */
    updateEndpoint(newEndpoint, newOptions) {
      this.options = newOptions;
      this.endpoint = newEndpoint;
      if (this.latestState !== connectivity_state_1.ConnectivityState.IDLE) {
        this.startConnecting();
      }
    }
    getConnectivityState() {
      return this.latestState;
    }
    getPicker() {
      return this.latestPicker;
    }
    getEndpoint() {
      return this.endpoint;
    }
    exitIdle() {
      this.pickFirstBalancer.exitIdle();
    }
    destroy() {
      this.pickFirstBalancer.destroy();
    }
  }
  loadBalancerPickFirst$1.LeafLoadBalancer = LeafLoadBalancer;
  function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, PickFirstLoadBalancer, PickFirstLoadBalancingConfig);
    (0, load_balancer_1.registerDefaultLoadBalancerType)(TYPE_NAME);
  }
  return loadBalancerPickFirst$1;
}
var certificateProvider = {};
var hasRequiredCertificateProvider;
function requireCertificateProvider() {
  if (hasRequiredCertificateProvider) return certificateProvider;
  hasRequiredCertificateProvider = 1;
  Object.defineProperty(certificateProvider, "__esModule", { value: true });
  certificateProvider.FileWatcherCertificateProvider = void 0;
  const fs = require$$0;
  const logging2 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const util_1 = require$$0$6;
  const TRACER_NAME = "certificate_provider";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const readFilePromise = (0, util_1.promisify)(fs.readFile);
  class FileWatcherCertificateProvider {
    constructor(config) {
      this.config = config;
      this.refreshTimer = null;
      this.fileResultPromise = null;
      this.latestCaUpdate = void 0;
      this.caListeners = /* @__PURE__ */ new Set();
      this.latestIdentityUpdate = void 0;
      this.identityListeners = /* @__PURE__ */ new Set();
      this.lastUpdateTime = null;
      if (config.certificateFile === void 0 !== (config.privateKeyFile === void 0)) {
        throw new Error("certificateFile and privateKeyFile must be set or unset together");
      }
      if (config.certificateFile === void 0 && config.caCertificateFile === void 0) {
        throw new Error("At least one of certificateFile and caCertificateFile must be set");
      }
      trace("File watcher constructed with config " + JSON.stringify(config));
    }
    updateCertificates() {
      if (this.fileResultPromise) {
        return;
      }
      this.fileResultPromise = Promise.allSettled([
        this.config.certificateFile ? readFilePromise(this.config.certificateFile) : Promise.reject(),
        this.config.privateKeyFile ? readFilePromise(this.config.privateKeyFile) : Promise.reject(),
        this.config.caCertificateFile ? readFilePromise(this.config.caCertificateFile) : Promise.reject()
      ]);
      this.fileResultPromise.then(([certificateResult, privateKeyResult, caCertificateResult]) => {
        if (!this.refreshTimer) {
          return;
        }
        trace("File watcher read certificates certificate " + certificateResult.status + ", privateKey " + privateKeyResult.status + ", CA certificate " + caCertificateResult.status);
        this.lastUpdateTime = /* @__PURE__ */ new Date();
        this.fileResultPromise = null;
        if (certificateResult.status === "fulfilled" && privateKeyResult.status === "fulfilled") {
          this.latestIdentityUpdate = {
            certificate: certificateResult.value,
            privateKey: privateKeyResult.value
          };
        } else {
          this.latestIdentityUpdate = null;
        }
        if (caCertificateResult.status === "fulfilled") {
          this.latestCaUpdate = {
            caCertificate: caCertificateResult.value
          };
        } else {
          this.latestCaUpdate = null;
        }
        for (const listener of this.identityListeners) {
          listener(this.latestIdentityUpdate);
        }
        for (const listener of this.caListeners) {
          listener(this.latestCaUpdate);
        }
      });
      trace("File watcher initiated certificate update");
    }
    maybeStartWatchingFiles() {
      if (!this.refreshTimer) {
        const timeSinceLastUpdate = this.lastUpdateTime ? (/* @__PURE__ */ new Date()).getTime() - this.lastUpdateTime.getTime() : Infinity;
        if (timeSinceLastUpdate > this.config.refreshIntervalMs) {
          this.updateCertificates();
        }
        if (timeSinceLastUpdate > this.config.refreshIntervalMs * 2) {
          this.latestCaUpdate = void 0;
          this.latestIdentityUpdate = void 0;
        }
        this.refreshTimer = setInterval(() => this.updateCertificates(), this.config.refreshIntervalMs);
        trace("File watcher started watching");
      }
    }
    maybeStopWatchingFiles() {
      if (this.caListeners.size === 0 && this.identityListeners.size === 0) {
        this.fileResultPromise = null;
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer);
          this.refreshTimer = null;
        }
      }
    }
    addCaCertificateListener(listener) {
      this.caListeners.add(listener);
      this.maybeStartWatchingFiles();
      if (this.latestCaUpdate !== void 0) {
        process.nextTick(listener, this.latestCaUpdate);
      }
    }
    removeCaCertificateListener(listener) {
      this.caListeners.delete(listener);
      this.maybeStopWatchingFiles();
    }
    addIdentityCertificateListener(listener) {
      this.identityListeners.add(listener);
      this.maybeStartWatchingFiles();
      if (this.latestIdentityUpdate !== void 0) {
        process.nextTick(listener, this.latestIdentityUpdate);
      }
    }
    removeIdentityCertificateListener(listener) {
      this.identityListeners.delete(listener);
      this.maybeStopWatchingFiles();
    }
  }
  certificateProvider.FileWatcherCertificateProvider = FileWatcherCertificateProvider;
  return certificateProvider;
}
var hasRequiredExperimental$1;
function requireExperimental$1() {
  if (hasRequiredExperimental$1) return experimental$1;
  hasRequiredExperimental$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = exports.createCertificateProviderChannelCredentials = exports.FileWatcherCertificateProvider = exports.createCertificateProviderServerCredentials = exports.createServerCredentialsWithInterceptors = exports.BaseSubchannelWrapper = exports.registerAdminService = exports.FilterStackFactory = exports.BaseFilter = exports.statusOrFromError = exports.statusOrFromValue = exports.PickResultType = exports.QueuePicker = exports.UnavailablePicker = exports.ChildLoadBalancerHandler = exports.EndpointMap = exports.endpointHasAddress = exports.endpointToString = exports.subchannelAddressToString = exports.LeafLoadBalancer = exports.isLoadBalancerNameRegistered = exports.parseLoadBalancingConfig = exports.selectLbConfigFromList = exports.registerLoadBalancerType = exports.createChildChannelControlHelper = exports.BackoffTimeout = exports.parseDuration = exports.durationToMs = exports.splitHostPort = exports.uriToString = exports.CHANNEL_ARGS_CONFIG_SELECTOR_KEY = exports.createResolver = exports.registerResolver = exports.log = exports.trace = void 0;
    var logging_1 = requireLogging$1();
    Object.defineProperty(exports, "trace", { enumerable: true, get: function() {
      return logging_1.trace;
    } });
    Object.defineProperty(exports, "log", { enumerable: true, get: function() {
      return logging_1.log;
    } });
    var resolver_1 = requireResolver$1();
    Object.defineProperty(exports, "registerResolver", { enumerable: true, get: function() {
      return resolver_1.registerResolver;
    } });
    Object.defineProperty(exports, "createResolver", { enumerable: true, get: function() {
      return resolver_1.createResolver;
    } });
    Object.defineProperty(exports, "CHANNEL_ARGS_CONFIG_SELECTOR_KEY", { enumerable: true, get: function() {
      return resolver_1.CHANNEL_ARGS_CONFIG_SELECTOR_KEY;
    } });
    var uri_parser_1 = requireUriParser$1();
    Object.defineProperty(exports, "uriToString", { enumerable: true, get: function() {
      return uri_parser_1.uriToString;
    } });
    Object.defineProperty(exports, "splitHostPort", { enumerable: true, get: function() {
      return uri_parser_1.splitHostPort;
    } });
    var duration_1 = requireDuration$1();
    Object.defineProperty(exports, "durationToMs", { enumerable: true, get: function() {
      return duration_1.durationToMs;
    } });
    Object.defineProperty(exports, "parseDuration", { enumerable: true, get: function() {
      return duration_1.parseDuration;
    } });
    var backoff_timeout_1 = requireBackoffTimeout$1();
    Object.defineProperty(exports, "BackoffTimeout", { enumerable: true, get: function() {
      return backoff_timeout_1.BackoffTimeout;
    } });
    var load_balancer_1 = requireLoadBalancer$1();
    Object.defineProperty(exports, "createChildChannelControlHelper", { enumerable: true, get: function() {
      return load_balancer_1.createChildChannelControlHelper;
    } });
    Object.defineProperty(exports, "registerLoadBalancerType", { enumerable: true, get: function() {
      return load_balancer_1.registerLoadBalancerType;
    } });
    Object.defineProperty(exports, "selectLbConfigFromList", { enumerable: true, get: function() {
      return load_balancer_1.selectLbConfigFromList;
    } });
    Object.defineProperty(exports, "parseLoadBalancingConfig", { enumerable: true, get: function() {
      return load_balancer_1.parseLoadBalancingConfig;
    } });
    Object.defineProperty(exports, "isLoadBalancerNameRegistered", { enumerable: true, get: function() {
      return load_balancer_1.isLoadBalancerNameRegistered;
    } });
    var load_balancer_pick_first_1 = requireLoadBalancerPickFirst$1();
    Object.defineProperty(exports, "LeafLoadBalancer", { enumerable: true, get: function() {
      return load_balancer_pick_first_1.LeafLoadBalancer;
    } });
    var subchannel_address_1 = requireSubchannelAddress$1();
    Object.defineProperty(exports, "subchannelAddressToString", { enumerable: true, get: function() {
      return subchannel_address_1.subchannelAddressToString;
    } });
    Object.defineProperty(exports, "endpointToString", { enumerable: true, get: function() {
      return subchannel_address_1.endpointToString;
    } });
    Object.defineProperty(exports, "endpointHasAddress", { enumerable: true, get: function() {
      return subchannel_address_1.endpointHasAddress;
    } });
    Object.defineProperty(exports, "EndpointMap", { enumerable: true, get: function() {
      return subchannel_address_1.EndpointMap;
    } });
    var load_balancer_child_handler_1 = requireLoadBalancerChildHandler$1();
    Object.defineProperty(exports, "ChildLoadBalancerHandler", { enumerable: true, get: function() {
      return load_balancer_child_handler_1.ChildLoadBalancerHandler;
    } });
    var picker_1 = requirePicker$1();
    Object.defineProperty(exports, "UnavailablePicker", { enumerable: true, get: function() {
      return picker_1.UnavailablePicker;
    } });
    Object.defineProperty(exports, "QueuePicker", { enumerable: true, get: function() {
      return picker_1.QueuePicker;
    } });
    Object.defineProperty(exports, "PickResultType", { enumerable: true, get: function() {
      return picker_1.PickResultType;
    } });
    var call_interface_1 = requireCallInterface$1();
    Object.defineProperty(exports, "statusOrFromValue", { enumerable: true, get: function() {
      return call_interface_1.statusOrFromValue;
    } });
    Object.defineProperty(exports, "statusOrFromError", { enumerable: true, get: function() {
      return call_interface_1.statusOrFromError;
    } });
    var filter_1 = requireFilter$1();
    Object.defineProperty(exports, "BaseFilter", { enumerable: true, get: function() {
      return filter_1.BaseFilter;
    } });
    var filter_stack_1 = requireFilterStack$1();
    Object.defineProperty(exports, "FilterStackFactory", { enumerable: true, get: function() {
      return filter_stack_1.FilterStackFactory;
    } });
    var admin_1 = requireAdmin$1();
    Object.defineProperty(exports, "registerAdminService", { enumerable: true, get: function() {
      return admin_1.registerAdminService;
    } });
    var subchannel_interface_1 = requireSubchannelInterface$1();
    Object.defineProperty(exports, "BaseSubchannelWrapper", { enumerable: true, get: function() {
      return subchannel_interface_1.BaseSubchannelWrapper;
    } });
    var server_credentials_1 = requireServerCredentials$1();
    Object.defineProperty(exports, "createServerCredentialsWithInterceptors", { enumerable: true, get: function() {
      return server_credentials_1.createServerCredentialsWithInterceptors;
    } });
    Object.defineProperty(exports, "createCertificateProviderServerCredentials", { enumerable: true, get: function() {
      return server_credentials_1.createCertificateProviderServerCredentials;
    } });
    var certificate_provider_1 = requireCertificateProvider();
    Object.defineProperty(exports, "FileWatcherCertificateProvider", { enumerable: true, get: function() {
      return certificate_provider_1.FileWatcherCertificateProvider;
    } });
    var channel_credentials_1 = requireChannelCredentials$1();
    Object.defineProperty(exports, "createCertificateProviderChannelCredentials", { enumerable: true, get: function() {
      return channel_credentials_1.createCertificateProviderChannelCredentials;
    } });
    var internal_channel_1 = requireInternalChannel$1();
    Object.defineProperty(exports, "SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX", { enumerable: true, get: function() {
      return internal_channel_1.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX;
    } });
  })(experimental$1);
  return experimental$1;
}
var resolverUds$1 = {};
var hasRequiredResolverUds$1;
function requireResolverUds$1() {
  if (hasRequiredResolverUds$1) return resolverUds$1;
  hasRequiredResolverUds$1 = 1;
  Object.defineProperty(resolverUds$1, "__esModule", { value: true });
  resolverUds$1.setup = setup;
  const resolver_1 = requireResolver$1();
  const call_interface_1 = requireCallInterface$1();
  class UdsResolver {
    constructor(target, listener, channelOptions2) {
      this.listener = listener;
      this.hasReturnedResult = false;
      this.endpoints = [];
      let path;
      if (target.authority === "") {
        path = "/" + target.path;
      } else {
        path = target.path;
      }
      this.endpoints = [{ addresses: [{ path }] }];
    }
    updateResolution() {
      if (!this.hasReturnedResult) {
        this.hasReturnedResult = true;
        process.nextTick(this.listener, (0, call_interface_1.statusOrFromValue)(this.endpoints), {}, null, "");
      }
    }
    destroy() {
      this.hasReturnedResult = false;
    }
    static getDefaultAuthority(target) {
      return "localhost";
    }
  }
  function setup() {
    (0, resolver_1.registerResolver)("unix", UdsResolver);
  }
  return resolverUds$1;
}
var resolverIp$1 = {};
var hasRequiredResolverIp$1;
function requireResolverIp$1() {
  if (hasRequiredResolverIp$1) return resolverIp$1;
  hasRequiredResolverIp$1 = 1;
  Object.defineProperty(resolverIp$1, "__esModule", { value: true });
  resolverIp$1.setup = setup;
  const net_1 = require$$0$1;
  const call_interface_1 = requireCallInterface$1();
  const constants_1 = requireConstants$1();
  const metadata_1 = requireMetadata$1();
  const resolver_1 = requireResolver$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const uri_parser_1 = requireUriParser$1();
  const logging2 = requireLogging$1();
  const TRACER_NAME = "ip_resolver";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const IPV4_SCHEME = "ipv4";
  const IPV6_SCHEME = "ipv6";
  const DEFAULT_PORT = 443;
  class IpResolver {
    constructor(target, listener, channelOptions2) {
      var _a;
      this.listener = listener;
      this.endpoints = [];
      this.error = null;
      this.hasReturnedResult = false;
      trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
      const addresses = [];
      if (!(target.scheme === IPV4_SCHEME || target.scheme === IPV6_SCHEME)) {
        this.error = {
          code: constants_1.Status.UNAVAILABLE,
          details: `Unrecognized scheme ${target.scheme} in IP resolver`,
          metadata: new metadata_1.Metadata()
        };
        return;
      }
      const pathList = target.path.split(",");
      for (const path of pathList) {
        const hostPort = (0, uri_parser_1.splitHostPort)(path);
        if (hostPort === null) {
          this.error = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Failed to parse ${target.scheme} address ${path}`,
            metadata: new metadata_1.Metadata()
          };
          return;
        }
        if (target.scheme === IPV4_SCHEME && !(0, net_1.isIPv4)(hostPort.host) || target.scheme === IPV6_SCHEME && !(0, net_1.isIPv6)(hostPort.host)) {
          this.error = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Failed to parse ${target.scheme} address ${path}`,
            metadata: new metadata_1.Metadata()
          };
          return;
        }
        addresses.push({
          host: hostPort.host,
          port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT
        });
      }
      this.endpoints = addresses.map((address) => ({ addresses: [address] }));
      trace("Parsed " + target.scheme + " address list " + addresses.map(subchannel_address_1.subchannelAddressToString));
    }
    updateResolution() {
      if (!this.hasReturnedResult) {
        this.hasReturnedResult = true;
        process.nextTick(() => {
          if (this.error) {
            this.listener((0, call_interface_1.statusOrFromError)(this.error), {}, null, "");
          } else {
            this.listener((0, call_interface_1.statusOrFromValue)(this.endpoints), {}, null, "");
          }
        });
      }
    }
    destroy() {
      this.hasReturnedResult = false;
    }
    static getDefaultAuthority(target) {
      return target.path.split(",")[0];
    }
  }
  function setup() {
    (0, resolver_1.registerResolver)(IPV4_SCHEME, IpResolver);
    (0, resolver_1.registerResolver)(IPV6_SCHEME, IpResolver);
  }
  return resolverIp$1;
}
var loadBalancerRoundRobin$1 = {};
var hasRequiredLoadBalancerRoundRobin$1;
function requireLoadBalancerRoundRobin$1() {
  if (hasRequiredLoadBalancerRoundRobin$1) return loadBalancerRoundRobin$1;
  hasRequiredLoadBalancerRoundRobin$1 = 1;
  Object.defineProperty(loadBalancerRoundRobin$1, "__esModule", { value: true });
  loadBalancerRoundRobin$1.RoundRobinLoadBalancer = void 0;
  loadBalancerRoundRobin$1.setup = setup;
  const load_balancer_1 = requireLoadBalancer$1();
  const connectivity_state_1 = requireConnectivityState$1();
  const picker_1 = requirePicker$1();
  const logging2 = requireLogging$1();
  const constants_1 = requireConstants$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const load_balancer_pick_first_1 = requireLoadBalancerPickFirst$1();
  const TRACER_NAME = "round_robin";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "round_robin";
  class RoundRobinLoadBalancingConfig {
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    constructor() {
    }
    toJsonObject() {
      return {
        [TYPE_NAME]: {}
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
      return new RoundRobinLoadBalancingConfig();
    }
  }
  class RoundRobinPicker {
    constructor(children, nextIndex = 0) {
      this.children = children;
      this.nextIndex = nextIndex;
    }
    pick(pickArgs) {
      const childPicker = this.children[this.nextIndex].picker;
      this.nextIndex = (this.nextIndex + 1) % this.children.length;
      return childPicker.pick(pickArgs);
    }
    /**
     * Check what the next subchannel returned would be. Used by the load
     * balancer implementation to preserve this part of the picker state if
     * possible when a subchannel connects or disconnects.
     */
    peekNextEndpoint() {
      return this.children[this.nextIndex].endpoint;
    }
  }
  function rotateArray(list, startIndex) {
    return [...list.slice(startIndex), ...list.slice(0, startIndex)];
  }
  class RoundRobinLoadBalancer {
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.children = [];
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.currentReadyPicker = null;
      this.updatesPaused = false;
      this.lastError = null;
      this.childChannelControlHelper = (0, load_balancer_1.createChildChannelControlHelper)(channelControlHelper, {
        updateState: (connectivityState2, picker2, errorMessage) => {
          if (this.currentState === connectivity_state_1.ConnectivityState.READY && connectivityState2 !== connectivity_state_1.ConnectivityState.READY) {
            this.channelControlHelper.requestReresolution();
          }
          if (errorMessage) {
            this.lastError = errorMessage;
          }
          this.calculateAndUpdateState();
        }
      });
    }
    countChildrenWithState(state) {
      return this.children.filter((child) => child.getConnectivityState() === state).length;
    }
    calculateAndUpdateState() {
      if (this.updatesPaused) {
        return;
      }
      if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.READY) > 0) {
        const readyChildren = this.children.filter((child) => child.getConnectivityState() === connectivity_state_1.ConnectivityState.READY);
        let index = 0;
        if (this.currentReadyPicker !== null) {
          const nextPickedEndpoint = this.currentReadyPicker.peekNextEndpoint();
          index = readyChildren.findIndex((child) => (0, subchannel_address_1.endpointEqual)(child.getEndpoint(), nextPickedEndpoint));
          if (index < 0) {
            index = 0;
          }
        }
        this.updateState(connectivity_state_1.ConnectivityState.READY, new RoundRobinPicker(readyChildren.map((child) => ({
          endpoint: child.getEndpoint(),
          picker: child.getPicker()
        })), index), null);
      } else if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.CONNECTING) > 0) {
        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this), null);
      } else if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) > 0) {
        const errorMessage = `round_robin: No connection established. Last error: ${this.lastError}`;
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({
          details: errorMessage
        }), errorMessage);
      } else {
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this), null);
      }
      for (const child of this.children) {
        if (child.getConnectivityState() === connectivity_state_1.ConnectivityState.IDLE) {
          child.exitIdle();
        }
      }
    }
    updateState(newState, picker2, errorMessage) {
      trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      if (newState === connectivity_state_1.ConnectivityState.READY) {
        this.currentReadyPicker = picker2;
      } else {
        this.currentReadyPicker = null;
      }
      this.currentState = newState;
      this.channelControlHelper.updateState(newState, picker2, errorMessage);
    }
    resetSubchannelList() {
      for (const child of this.children) {
        child.destroy();
      }
      this.children = [];
    }
    updateAddressList(maybeEndpointList, lbConfig, options, resolutionNote) {
      if (!(lbConfig instanceof RoundRobinLoadBalancingConfig)) {
        return false;
      }
      if (!maybeEndpointList.ok) {
        if (this.children.length === 0) {
          this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(maybeEndpointList.error), maybeEndpointList.error.details);
        }
        return true;
      }
      const startIndex = Math.random() * maybeEndpointList.value.length | 0;
      const endpointList = rotateArray(maybeEndpointList.value, startIndex);
      this.resetSubchannelList();
      if (endpointList.length === 0) {
        const errorMessage = `No addresses resolved. Resolution note: ${resolutionNote}`;
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({ details: errorMessage }), errorMessage);
      }
      trace("Connect to endpoint list " + endpointList.map(subchannel_address_1.endpointToString));
      this.updatesPaused = true;
      this.children = endpointList.map((endpoint) => new load_balancer_pick_first_1.LeafLoadBalancer(endpoint, this.childChannelControlHelper, options, resolutionNote));
      for (const child of this.children) {
        child.startConnecting();
      }
      this.updatesPaused = false;
      this.calculateAndUpdateState();
      return true;
    }
    exitIdle() {
    }
    resetBackoff() {
    }
    destroy() {
      this.resetSubchannelList();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerRoundRobin$1.RoundRobinLoadBalancer = RoundRobinLoadBalancer;
  function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, RoundRobinLoadBalancer, RoundRobinLoadBalancingConfig);
  }
  return loadBalancerRoundRobin$1;
}
var loadBalancerOutlierDetection$1 = {};
var hasRequiredLoadBalancerOutlierDetection$1;
function requireLoadBalancerOutlierDetection$1() {
  if (hasRequiredLoadBalancerOutlierDetection$1) return loadBalancerOutlierDetection$1;
  hasRequiredLoadBalancerOutlierDetection$1 = 1;
  var _a;
  Object.defineProperty(loadBalancerOutlierDetection$1, "__esModule", { value: true });
  loadBalancerOutlierDetection$1.OutlierDetectionLoadBalancer = loadBalancerOutlierDetection$1.OutlierDetectionLoadBalancingConfig = void 0;
  loadBalancerOutlierDetection$1.setup = setup;
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const duration_1 = requireDuration$1();
  const experimental_1 = requireExperimental$1();
  const load_balancer_1 = requireLoadBalancer$1();
  const load_balancer_child_handler_1 = requireLoadBalancerChildHandler$1();
  const picker_1 = requirePicker$1();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const subchannel_interface_1 = requireSubchannelInterface$1();
  const logging2 = requireLogging$1();
  const TRACER_NAME = "outlier_detection";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "outlier_detection";
  const OUTLIER_DETECTION_ENABLED = ((_a = process.env.GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION) !== null && _a !== void 0 ? _a : "true") === "true";
  const defaultSuccessRateEjectionConfig = {
    stdev_factor: 1900,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 100
  };
  const defaultFailurePercentageEjectionConfig = {
    threshold: 85,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 50
  };
  function validateFieldType(obj, fieldName, expectedType, objectName) {
    if (fieldName in obj && obj[fieldName] !== void 0 && typeof obj[fieldName] !== expectedType) {
      const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
      throw new Error(`outlier detection config ${fullFieldName} parse error: expected ${expectedType}, got ${typeof obj[fieldName]}`);
    }
  }
  function validatePositiveDuration(obj, fieldName, objectName) {
    const fullFieldName = fieldName;
    if (fieldName in obj && obj[fieldName] !== void 0) {
      if (!(0, duration_1.isDuration)(obj[fieldName])) {
        throw new Error(`outlier detection config ${fullFieldName} parse error: expected Duration, got ${typeof obj[fieldName]}`);
      }
      if (!(obj[fieldName].seconds >= 0 && obj[fieldName].seconds <= 315576e6 && obj[fieldName].nanos >= 0 && obj[fieldName].nanos <= 999999999)) {
        throw new Error(`outlier detection config ${fullFieldName} parse error: values out of range for non-negative Duaration`);
      }
    }
  }
  function validatePercentage(obj, fieldName, objectName) {
    const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
    validateFieldType(obj, fieldName, "number", objectName);
    if (fieldName in obj && obj[fieldName] !== void 0 && !(obj[fieldName] >= 0 && obj[fieldName] <= 100)) {
      throw new Error(`outlier detection config ${fullFieldName} parse error: value out of range for percentage (0-100)`);
    }
  }
  class OutlierDetectionLoadBalancingConfig {
    constructor(intervalMs, baseEjectionTimeMs, maxEjectionTimeMs, maxEjectionPercent, successRateEjection, failurePercentageEjection, childPolicy) {
      this.childPolicy = childPolicy;
      if (childPolicy.getLoadBalancerName() === "pick_first") {
        throw new Error("outlier_detection LB policy cannot have a pick_first child policy");
      }
      this.intervalMs = intervalMs !== null && intervalMs !== void 0 ? intervalMs : 1e4;
      this.baseEjectionTimeMs = baseEjectionTimeMs !== null && baseEjectionTimeMs !== void 0 ? baseEjectionTimeMs : 3e4;
      this.maxEjectionTimeMs = maxEjectionTimeMs !== null && maxEjectionTimeMs !== void 0 ? maxEjectionTimeMs : 3e5;
      this.maxEjectionPercent = maxEjectionPercent !== null && maxEjectionPercent !== void 0 ? maxEjectionPercent : 10;
      this.successRateEjection = successRateEjection ? Object.assign(Object.assign({}, defaultSuccessRateEjectionConfig), successRateEjection) : null;
      this.failurePercentageEjection = failurePercentageEjection ? Object.assign(Object.assign({}, defaultFailurePercentageEjectionConfig), failurePercentageEjection) : null;
    }
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    toJsonObject() {
      var _a2, _b;
      return {
        outlier_detection: {
          interval: (0, duration_1.msToDuration)(this.intervalMs),
          base_ejection_time: (0, duration_1.msToDuration)(this.baseEjectionTimeMs),
          max_ejection_time: (0, duration_1.msToDuration)(this.maxEjectionTimeMs),
          max_ejection_percent: this.maxEjectionPercent,
          success_rate_ejection: (_a2 = this.successRateEjection) !== null && _a2 !== void 0 ? _a2 : void 0,
          failure_percentage_ejection: (_b = this.failurePercentageEjection) !== null && _b !== void 0 ? _b : void 0,
          child_policy: [this.childPolicy.toJsonObject()]
        }
      };
    }
    getIntervalMs() {
      return this.intervalMs;
    }
    getBaseEjectionTimeMs() {
      return this.baseEjectionTimeMs;
    }
    getMaxEjectionTimeMs() {
      return this.maxEjectionTimeMs;
    }
    getMaxEjectionPercent() {
      return this.maxEjectionPercent;
    }
    getSuccessRateEjectionConfig() {
      return this.successRateEjection;
    }
    getFailurePercentageEjectionConfig() {
      return this.failurePercentageEjection;
    }
    getChildPolicy() {
      return this.childPolicy;
    }
    static createFromJson(obj) {
      var _a2;
      validatePositiveDuration(obj, "interval");
      validatePositiveDuration(obj, "base_ejection_time");
      validatePositiveDuration(obj, "max_ejection_time");
      validatePercentage(obj, "max_ejection_percent");
      if ("success_rate_ejection" in obj && obj.success_rate_ejection !== void 0) {
        if (typeof obj.success_rate_ejection !== "object") {
          throw new Error("outlier detection config success_rate_ejection must be an object");
        }
        validateFieldType(obj.success_rate_ejection, "stdev_factor", "number", "success_rate_ejection");
        validatePercentage(obj.success_rate_ejection, "enforcement_percentage", "success_rate_ejection");
        validateFieldType(obj.success_rate_ejection, "minimum_hosts", "number", "success_rate_ejection");
        validateFieldType(obj.success_rate_ejection, "request_volume", "number", "success_rate_ejection");
      }
      if ("failure_percentage_ejection" in obj && obj.failure_percentage_ejection !== void 0) {
        if (typeof obj.failure_percentage_ejection !== "object") {
          throw new Error("outlier detection config failure_percentage_ejection must be an object");
        }
        validatePercentage(obj.failure_percentage_ejection, "threshold", "failure_percentage_ejection");
        validatePercentage(obj.failure_percentage_ejection, "enforcement_percentage", "failure_percentage_ejection");
        validateFieldType(obj.failure_percentage_ejection, "minimum_hosts", "number", "failure_percentage_ejection");
        validateFieldType(obj.failure_percentage_ejection, "request_volume", "number", "failure_percentage_ejection");
      }
      if (!("child_policy" in obj) || !Array.isArray(obj.child_policy)) {
        throw new Error("outlier detection config child_policy must be an array");
      }
      const childPolicy = (0, load_balancer_1.selectLbConfigFromList)(obj.child_policy);
      if (!childPolicy) {
        throw new Error("outlier detection config child_policy: no valid recognized policy found");
      }
      return new OutlierDetectionLoadBalancingConfig(obj.interval ? (0, duration_1.durationToMs)(obj.interval) : null, obj.base_ejection_time ? (0, duration_1.durationToMs)(obj.base_ejection_time) : null, obj.max_ejection_time ? (0, duration_1.durationToMs)(obj.max_ejection_time) : null, (_a2 = obj.max_ejection_percent) !== null && _a2 !== void 0 ? _a2 : null, obj.success_rate_ejection, obj.failure_percentage_ejection, childPolicy);
    }
  }
  loadBalancerOutlierDetection$1.OutlierDetectionLoadBalancingConfig = OutlierDetectionLoadBalancingConfig;
  class OutlierDetectionSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
    constructor(childSubchannel, mapEntry) {
      super(childSubchannel);
      this.mapEntry = mapEntry;
      this.refCount = 0;
    }
    ref() {
      this.child.ref();
      this.refCount += 1;
    }
    unref() {
      this.child.unref();
      this.refCount -= 1;
      if (this.refCount <= 0) {
        if (this.mapEntry) {
          const index = this.mapEntry.subchannelWrappers.indexOf(this);
          if (index >= 0) {
            this.mapEntry.subchannelWrappers.splice(index, 1);
          }
        }
      }
    }
    eject() {
      this.setHealthy(false);
    }
    uneject() {
      this.setHealthy(true);
    }
    getMapEntry() {
      return this.mapEntry;
    }
    getWrappedSubchannel() {
      return this.child;
    }
  }
  function createEmptyBucket() {
    return {
      success: 0,
      failure: 0
    };
  }
  class CallCounter {
    constructor() {
      this.activeBucket = createEmptyBucket();
      this.inactiveBucket = createEmptyBucket();
    }
    addSuccess() {
      this.activeBucket.success += 1;
    }
    addFailure() {
      this.activeBucket.failure += 1;
    }
    switchBuckets() {
      this.inactiveBucket = this.activeBucket;
      this.activeBucket = createEmptyBucket();
    }
    getLastSuccesses() {
      return this.inactiveBucket.success;
    }
    getLastFailures() {
      return this.inactiveBucket.failure;
    }
  }
  class OutlierDetectionPicker {
    constructor(wrappedPicker, countCalls) {
      this.wrappedPicker = wrappedPicker;
      this.countCalls = countCalls;
    }
    pick(pickArgs) {
      const wrappedPick = this.wrappedPicker.pick(pickArgs);
      if (wrappedPick.pickResultType === picker_1.PickResultType.COMPLETE) {
        const subchannelWrapper = wrappedPick.subchannel;
        const mapEntry = subchannelWrapper.getMapEntry();
        if (mapEntry) {
          let onCallEnded = wrappedPick.onCallEnded;
          if (this.countCalls) {
            onCallEnded = (statusCode, details, metadata2) => {
              var _a2;
              if (statusCode === constants_1.Status.OK) {
                mapEntry.counter.addSuccess();
              } else {
                mapEntry.counter.addFailure();
              }
              (_a2 = wrappedPick.onCallEnded) === null || _a2 === void 0 ? void 0 : _a2.call(wrappedPick, statusCode, details, metadata2);
            };
          }
          return Object.assign(Object.assign({}, wrappedPick), { subchannel: subchannelWrapper.getWrappedSubchannel(), onCallEnded });
        } else {
          return Object.assign(Object.assign({}, wrappedPick), { subchannel: subchannelWrapper.getWrappedSubchannel() });
        }
      } else {
        return wrappedPick;
      }
    }
  }
  class OutlierDetectionLoadBalancer {
    constructor(channelControlHelper) {
      this.entryMap = new subchannel_address_1.EndpointMap();
      this.latestConfig = null;
      this.timerStartTime = null;
      this.childBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler((0, experimental_1.createChildChannelControlHelper)(channelControlHelper, {
        createSubchannel: (subchannelAddress2, subchannelArgs) => {
          const originalSubchannel = channelControlHelper.createSubchannel(subchannelAddress2, subchannelArgs);
          const mapEntry = this.entryMap.getForSubchannelAddress(subchannelAddress2);
          const subchannelWrapper = new OutlierDetectionSubchannelWrapper(originalSubchannel, mapEntry);
          if ((mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.currentEjectionTimestamp) !== null) {
            subchannelWrapper.eject();
          }
          mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.subchannelWrappers.push(subchannelWrapper);
          return subchannelWrapper;
        },
        updateState: (connectivityState2, picker2, errorMessage) => {
          if (connectivityState2 === connectivity_state_1.ConnectivityState.READY) {
            channelControlHelper.updateState(connectivityState2, new OutlierDetectionPicker(picker2, this.isCountingEnabled()), errorMessage);
          } else {
            channelControlHelper.updateState(connectivityState2, picker2, errorMessage);
          }
        }
      }));
      this.ejectionTimer = setInterval(() => {
      }, 0);
      clearInterval(this.ejectionTimer);
    }
    isCountingEnabled() {
      return this.latestConfig !== null && (this.latestConfig.getSuccessRateEjectionConfig() !== null || this.latestConfig.getFailurePercentageEjectionConfig() !== null);
    }
    getCurrentEjectionPercent() {
      let ejectionCount = 0;
      for (const mapEntry of this.entryMap.values()) {
        if (mapEntry.currentEjectionTimestamp !== null) {
          ejectionCount += 1;
        }
      }
      return ejectionCount * 100 / this.entryMap.size;
    }
    runSuccessRateCheck(ejectionTimestamp) {
      if (!this.latestConfig) {
        return;
      }
      const successRateConfig = this.latestConfig.getSuccessRateEjectionConfig();
      if (!successRateConfig) {
        return;
      }
      trace("Running success rate check");
      const targetRequestVolume = successRateConfig.request_volume;
      let addresesWithTargetVolume = 0;
      const successRates = [];
      for (const [endpoint, mapEntry] of this.entryMap.entries()) {
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        trace("Stats for " + (0, subchannel_address_1.endpointToString)(endpoint) + ": successes=" + successes + " failures=" + failures + " targetRequestVolume=" + targetRequestVolume);
        if (successes + failures >= targetRequestVolume) {
          addresesWithTargetVolume += 1;
          successRates.push(successes / (successes + failures));
        }
      }
      trace("Found " + addresesWithTargetVolume + " success rate candidates; currentEjectionPercent=" + this.getCurrentEjectionPercent() + " successRates=[" + successRates + "]");
      if (addresesWithTargetVolume < successRateConfig.minimum_hosts) {
        return;
      }
      const successRateMean = successRates.reduce((a, b) => a + b) / successRates.length;
      let successRateDeviationSum = 0;
      for (const rate of successRates) {
        const deviation = rate - successRateMean;
        successRateDeviationSum += deviation * deviation;
      }
      const successRateVariance = successRateDeviationSum / successRates.length;
      const successRateStdev = Math.sqrt(successRateVariance);
      const ejectionThreshold = successRateMean - successRateStdev * (successRateConfig.stdev_factor / 1e3);
      trace("stdev=" + successRateStdev + " ejectionThreshold=" + ejectionThreshold);
      for (const [address, mapEntry] of this.entryMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
          break;
        }
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        if (successes + failures < targetRequestVolume) {
          continue;
        }
        const successRate = successes / (successes + failures);
        trace("Checking candidate " + address + " successRate=" + successRate);
        if (successRate < ejectionThreshold) {
          const randomNumber = Math.random() * 100;
          trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + successRateConfig.enforcement_percentage);
          if (randomNumber < successRateConfig.enforcement_percentage) {
            trace("Ejecting candidate " + address);
            this.eject(mapEntry, ejectionTimestamp);
          }
        }
      }
    }
    runFailurePercentageCheck(ejectionTimestamp) {
      if (!this.latestConfig) {
        return;
      }
      const failurePercentageConfig = this.latestConfig.getFailurePercentageEjectionConfig();
      if (!failurePercentageConfig) {
        return;
      }
      trace("Running failure percentage check. threshold=" + failurePercentageConfig.threshold + " request volume threshold=" + failurePercentageConfig.request_volume);
      let addressesWithTargetVolume = 0;
      for (const mapEntry of this.entryMap.values()) {
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        if (successes + failures >= failurePercentageConfig.request_volume) {
          addressesWithTargetVolume += 1;
        }
      }
      if (addressesWithTargetVolume < failurePercentageConfig.minimum_hosts) {
        return;
      }
      for (const [address, mapEntry] of this.entryMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
          break;
        }
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        trace("Candidate successes=" + successes + " failures=" + failures);
        if (successes + failures < failurePercentageConfig.request_volume) {
          continue;
        }
        const failurePercentage = failures * 100 / (failures + successes);
        if (failurePercentage > failurePercentageConfig.threshold) {
          const randomNumber = Math.random() * 100;
          trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + failurePercentageConfig.enforcement_percentage);
          if (randomNumber < failurePercentageConfig.enforcement_percentage) {
            trace("Ejecting candidate " + address);
            this.eject(mapEntry, ejectionTimestamp);
          }
        }
      }
    }
    eject(mapEntry, ejectionTimestamp) {
      mapEntry.currentEjectionTimestamp = /* @__PURE__ */ new Date();
      mapEntry.ejectionTimeMultiplier += 1;
      for (const subchannelWrapper of mapEntry.subchannelWrappers) {
        subchannelWrapper.eject();
      }
    }
    uneject(mapEntry) {
      mapEntry.currentEjectionTimestamp = null;
      for (const subchannelWrapper of mapEntry.subchannelWrappers) {
        subchannelWrapper.uneject();
      }
    }
    switchAllBuckets() {
      for (const mapEntry of this.entryMap.values()) {
        mapEntry.counter.switchBuckets();
      }
    }
    startTimer(delayMs) {
      var _a2, _b;
      this.ejectionTimer = setTimeout(() => this.runChecks(), delayMs);
      (_b = (_a2 = this.ejectionTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a2);
    }
    runChecks() {
      const ejectionTimestamp = /* @__PURE__ */ new Date();
      trace("Ejection timer running");
      this.switchAllBuckets();
      if (!this.latestConfig) {
        return;
      }
      this.timerStartTime = ejectionTimestamp;
      this.startTimer(this.latestConfig.getIntervalMs());
      this.runSuccessRateCheck(ejectionTimestamp);
      this.runFailurePercentageCheck(ejectionTimestamp);
      for (const [address, mapEntry] of this.entryMap.entries()) {
        if (mapEntry.currentEjectionTimestamp === null) {
          if (mapEntry.ejectionTimeMultiplier > 0) {
            mapEntry.ejectionTimeMultiplier -= 1;
          }
        } else {
          const baseEjectionTimeMs = this.latestConfig.getBaseEjectionTimeMs();
          const maxEjectionTimeMs = this.latestConfig.getMaxEjectionTimeMs();
          const returnTime = new Date(mapEntry.currentEjectionTimestamp.getTime());
          returnTime.setMilliseconds(returnTime.getMilliseconds() + Math.min(baseEjectionTimeMs * mapEntry.ejectionTimeMultiplier, Math.max(baseEjectionTimeMs, maxEjectionTimeMs)));
          if (returnTime < /* @__PURE__ */ new Date()) {
            trace("Unejecting " + address);
            this.uneject(mapEntry);
          }
        }
      }
    }
    updateAddressList(endpointList, lbConfig, options, resolutionNote) {
      if (!(lbConfig instanceof OutlierDetectionLoadBalancingConfig)) {
        return false;
      }
      trace("Received update with config: " + JSON.stringify(lbConfig.toJsonObject(), void 0, 2));
      if (endpointList.ok) {
        for (const endpoint of endpointList.value) {
          if (!this.entryMap.has(endpoint)) {
            trace("Adding map entry for " + (0, subchannel_address_1.endpointToString)(endpoint));
            this.entryMap.set(endpoint, {
              counter: new CallCounter(),
              currentEjectionTimestamp: null,
              ejectionTimeMultiplier: 0,
              subchannelWrappers: []
            });
          }
        }
        this.entryMap.deleteMissing(endpointList.value);
      }
      const childPolicy = lbConfig.getChildPolicy();
      this.childBalancer.updateAddressList(endpointList, childPolicy, options, resolutionNote);
      if (lbConfig.getSuccessRateEjectionConfig() || lbConfig.getFailurePercentageEjectionConfig()) {
        if (this.timerStartTime) {
          trace("Previous timer existed. Replacing timer");
          clearTimeout(this.ejectionTimer);
          const remainingDelay = lbConfig.getIntervalMs() - ((/* @__PURE__ */ new Date()).getTime() - this.timerStartTime.getTime());
          this.startTimer(remainingDelay);
        } else {
          trace("Starting new timer");
          this.timerStartTime = /* @__PURE__ */ new Date();
          this.startTimer(lbConfig.getIntervalMs());
          this.switchAllBuckets();
        }
      } else {
        trace("Counting disabled. Cancelling timer.");
        this.timerStartTime = null;
        clearTimeout(this.ejectionTimer);
        for (const mapEntry of this.entryMap.values()) {
          this.uneject(mapEntry);
          mapEntry.ejectionTimeMultiplier = 0;
        }
      }
      this.latestConfig = lbConfig;
      return true;
    }
    exitIdle() {
      this.childBalancer.exitIdle();
    }
    resetBackoff() {
      this.childBalancer.resetBackoff();
    }
    destroy() {
      clearTimeout(this.ejectionTimer);
      this.childBalancer.destroy();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerOutlierDetection$1.OutlierDetectionLoadBalancer = OutlierDetectionLoadBalancer;
  function setup() {
    if (OUTLIER_DETECTION_ENABLED) {
      (0, experimental_1.registerLoadBalancerType)(TYPE_NAME, OutlierDetectionLoadBalancer, OutlierDetectionLoadBalancingConfig);
    }
  }
  return loadBalancerOutlierDetection$1;
}
var loadBalancerWeightedRoundRobin = {};
var priorityQueue = {};
var hasRequiredPriorityQueue;
function requirePriorityQueue() {
  if (hasRequiredPriorityQueue) return priorityQueue;
  hasRequiredPriorityQueue = 1;
  Object.defineProperty(priorityQueue, "__esModule", { value: true });
  priorityQueue.PriorityQueue = void 0;
  const top = 0;
  const parent = (i) => Math.floor(i / 2);
  const left = (i) => i * 2 + 1;
  const right = (i) => i * 2 + 2;
  class PriorityQueue {
    /**
     *
     * @param comparator Returns true if the first argument should precede the
     *   second in the queue. Defaults to `(a, b) => a > b`
     */
    constructor(comparator = (a, b) => a > b) {
      this.comparator = comparator;
      this.heap = [];
    }
    /**
     * @returns The number of items currently in the queue
     */
    size() {
      return this.heap.length;
    }
    /**
     * @returns True if there are no items in the queue, false otherwise
     */
    isEmpty() {
      return this.size() == 0;
    }
    /**
     * Look at the front item that would be popped, without modifying the contents
     * of the queue
     * @returns The front item in the queue, or undefined if the queue is empty
     */
    peek() {
      return this.heap[top];
    }
    /**
     * Add the items to the queue
     * @param values The items to add
     * @returns The new size of the queue after adding the items
     */
    push(...values) {
      values.forEach((value) => {
        this.heap.push(value);
        this.siftUp();
      });
      return this.size();
    }
    /**
     * Remove the front item in the queue and return it
     * @returns The front item in the queue, or undefined if the queue is empty
     */
    pop() {
      const poppedValue = this.peek();
      const bottom = this.size() - 1;
      if (bottom > top) {
        this.swap(top, bottom);
      }
      this.heap.pop();
      this.siftDown();
      return poppedValue;
    }
    /**
     * Simultaneously remove the front item in the queue and add the provided
     * item.
     * @param value The item to add
     * @returns The front item in the queue, or undefined if the queue is empty
     */
    replace(value) {
      const replacedValue = this.peek();
      this.heap[top] = value;
      this.siftDown();
      return replacedValue;
    }
    greater(i, j) {
      return this.comparator(this.heap[i], this.heap[j]);
    }
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    siftUp() {
      let node = this.size() - 1;
      while (node > top && this.greater(node, parent(node))) {
        this.swap(node, parent(node));
        node = parent(node);
      }
    }
    siftDown() {
      let node = top;
      while (left(node) < this.size() && this.greater(left(node), node) || right(node) < this.size() && this.greater(right(node), node)) {
        let maxChild = right(node) < this.size() && this.greater(right(node), left(node)) ? right(node) : left(node);
        this.swap(node, maxChild);
        node = maxChild;
      }
    }
  }
  priorityQueue.PriorityQueue = PriorityQueue;
  return priorityQueue;
}
var hasRequiredLoadBalancerWeightedRoundRobin;
function requireLoadBalancerWeightedRoundRobin() {
  if (hasRequiredLoadBalancerWeightedRoundRobin) return loadBalancerWeightedRoundRobin;
  hasRequiredLoadBalancerWeightedRoundRobin = 1;
  Object.defineProperty(loadBalancerWeightedRoundRobin, "__esModule", { value: true });
  loadBalancerWeightedRoundRobin.WeightedRoundRobinLoadBalancingConfig = void 0;
  loadBalancerWeightedRoundRobin.setup = setup;
  const connectivity_state_1 = requireConnectivityState$1();
  const constants_1 = requireConstants$1();
  const duration_1 = requireDuration$1();
  const load_balancer_1 = requireLoadBalancer$1();
  const load_balancer_pick_first_1 = requireLoadBalancerPickFirst$1();
  const logging2 = requireLogging$1();
  const orca_1 = requireOrca();
  const picker_1 = requirePicker$1();
  const priority_queue_1 = requirePriorityQueue();
  const subchannel_address_1 = requireSubchannelAddress$1();
  const TRACER_NAME = "weighted_round_robin";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "weighted_round_robin";
  const DEFAULT_OOB_REPORTING_PERIOD_MS = 1e4;
  const DEFAULT_BLACKOUT_PERIOD_MS = 1e4;
  const DEFAULT_WEIGHT_EXPIRATION_PERIOD_MS = 3 * 6e4;
  const DEFAULT_WEIGHT_UPDATE_PERIOD_MS = 1e3;
  const DEFAULT_ERROR_UTILIZATION_PENALTY = 1;
  function validateFieldType(obj, fieldName, expectedType) {
    if (fieldName in obj && obj[fieldName] !== void 0 && typeof obj[fieldName] !== expectedType) {
      throw new Error(`weighted round robin config ${fieldName} parse error: expected ${expectedType}, got ${typeof obj[fieldName]}`);
    }
  }
  function parseDurationField(obj, fieldName) {
    if (fieldName in obj && obj[fieldName] !== void 0 && obj[fieldName] !== null) {
      let durationObject;
      if ((0, duration_1.isDuration)(obj[fieldName])) {
        durationObject = obj[fieldName];
      } else if ((0, duration_1.isDurationMessage)(obj[fieldName])) {
        durationObject = (0, duration_1.durationMessageToDuration)(obj[fieldName]);
      } else if (typeof obj[fieldName] === "string") {
        const parsedDuration = (0, duration_1.parseDuration)(obj[fieldName]);
        if (!parsedDuration) {
          throw new Error(`weighted round robin config ${fieldName}: failed to parse duration string ${obj[fieldName]}`);
        }
        durationObject = parsedDuration;
      } else {
        throw new Error(`weighted round robin config ${fieldName}: expected duration, got ${typeof obj[fieldName]}`);
      }
      return (0, duration_1.durationToMs)(durationObject);
    }
    return null;
  }
  class WeightedRoundRobinLoadBalancingConfig {
    constructor(enableOobLoadReport, oobLoadReportingPeriodMs, blackoutPeriodMs, weightExpirationPeriodMs, weightUpdatePeriodMs, errorUtilizationPenalty) {
      this.enableOobLoadReport = enableOobLoadReport !== null && enableOobLoadReport !== void 0 ? enableOobLoadReport : false;
      this.oobLoadReportingPeriodMs = oobLoadReportingPeriodMs !== null && oobLoadReportingPeriodMs !== void 0 ? oobLoadReportingPeriodMs : DEFAULT_OOB_REPORTING_PERIOD_MS;
      this.blackoutPeriodMs = blackoutPeriodMs !== null && blackoutPeriodMs !== void 0 ? blackoutPeriodMs : DEFAULT_BLACKOUT_PERIOD_MS;
      this.weightExpirationPeriodMs = weightExpirationPeriodMs !== null && weightExpirationPeriodMs !== void 0 ? weightExpirationPeriodMs : DEFAULT_WEIGHT_EXPIRATION_PERIOD_MS;
      this.weightUpdatePeriodMs = Math.max(weightUpdatePeriodMs !== null && weightUpdatePeriodMs !== void 0 ? weightUpdatePeriodMs : DEFAULT_WEIGHT_UPDATE_PERIOD_MS, 100);
      this.errorUtilizationPenalty = errorUtilizationPenalty !== null && errorUtilizationPenalty !== void 0 ? errorUtilizationPenalty : DEFAULT_ERROR_UTILIZATION_PENALTY;
    }
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    toJsonObject() {
      return {
        enable_oob_load_report: this.enableOobLoadReport,
        oob_load_reporting_period: (0, duration_1.durationToString)((0, duration_1.msToDuration)(this.oobLoadReportingPeriodMs)),
        blackout_period: (0, duration_1.durationToString)((0, duration_1.msToDuration)(this.blackoutPeriodMs)),
        weight_expiration_period: (0, duration_1.durationToString)((0, duration_1.msToDuration)(this.weightExpirationPeriodMs)),
        weight_update_period: (0, duration_1.durationToString)((0, duration_1.msToDuration)(this.weightUpdatePeriodMs)),
        error_utilization_penalty: this.errorUtilizationPenalty
      };
    }
    static createFromJson(obj) {
      validateFieldType(obj, "enable_oob_load_report", "boolean");
      validateFieldType(obj, "error_utilization_penalty", "number");
      if (obj.error_utilization_penalty < 0) {
        throw new Error("weighted round robin config error_utilization_penalty < 0");
      }
      return new WeightedRoundRobinLoadBalancingConfig(obj.enable_oob_load_report, parseDurationField(obj, "oob_load_reporting_period"), parseDurationField(obj, "blackout_period"), parseDurationField(obj, "weight_expiration_period"), parseDurationField(obj, "weight_update_period"), obj.error_utilization_penalty);
    }
    getEnableOobLoadReport() {
      return this.enableOobLoadReport;
    }
    getOobLoadReportingPeriodMs() {
      return this.oobLoadReportingPeriodMs;
    }
    getBlackoutPeriodMs() {
      return this.blackoutPeriodMs;
    }
    getWeightExpirationPeriodMs() {
      return this.weightExpirationPeriodMs;
    }
    getWeightUpdatePeriodMs() {
      return this.weightUpdatePeriodMs;
    }
    getErrorUtilizationPenalty() {
      return this.errorUtilizationPenalty;
    }
  }
  loadBalancerWeightedRoundRobin.WeightedRoundRobinLoadBalancingConfig = WeightedRoundRobinLoadBalancingConfig;
  class WeightedRoundRobinPicker {
    constructor(children, metricsHandler) {
      this.metricsHandler = metricsHandler;
      this.queue = new priority_queue_1.PriorityQueue((a, b) => a.deadline < b.deadline);
      const positiveWeight = children.filter((picker2) => picker2.weight > 0);
      let averageWeight;
      if (positiveWeight.length < 2) {
        averageWeight = 1;
      } else {
        let weightSum = 0;
        for (const { weight } of positiveWeight) {
          weightSum += weight;
        }
        averageWeight = weightSum / positiveWeight.length;
      }
      for (const child of children) {
        const period = child.weight > 0 ? 1 / child.weight : averageWeight;
        this.queue.push({
          endpointName: child.endpointName,
          picker: child.picker,
          period,
          deadline: Math.random() * period
        });
      }
    }
    pick(pickArgs) {
      const entry = this.queue.pop();
      this.queue.push(Object.assign(Object.assign({}, entry), { deadline: entry.deadline + entry.period }));
      const childPick = entry.picker.pick(pickArgs);
      if (childPick.pickResultType === picker_1.PickResultType.COMPLETE) {
        if (this.metricsHandler) {
          return Object.assign(Object.assign({}, childPick), { onCallEnded: (0, orca_1.createMetricsReader)((loadReport) => this.metricsHandler(loadReport, entry.endpointName), childPick.onCallEnded) });
        } else {
          const subchannelWrapper = childPick.subchannel;
          return Object.assign(Object.assign({}, childPick), { subchannel: subchannelWrapper.getWrappedSubchannel() });
        }
      } else {
        return childPick;
      }
    }
  }
  class WeightedRoundRobinLoadBalancer {
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.latestConfig = null;
      this.children = /* @__PURE__ */ new Map();
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.updatesPaused = false;
      this.lastError = null;
      this.weightUpdateTimer = null;
    }
    countChildrenWithState(state) {
      let count = 0;
      for (const entry of this.children.values()) {
        if (entry.child.getConnectivityState() === state) {
          count += 1;
        }
      }
      return count;
    }
    updateWeight(entry, loadReport) {
      var _a, _b;
      const qps = loadReport.rps_fractional;
      let utilization = loadReport.application_utilization;
      if (utilization > 0 && qps > 0) {
        utilization += loadReport.eps / qps * ((_b = (_a = this.latestConfig) === null || _a === void 0 ? void 0 : _a.getErrorUtilizationPenalty()) !== null && _b !== void 0 ? _b : 0);
      }
      const newWeight = utilization === 0 ? 0 : qps / utilization;
      if (newWeight === 0) {
        return;
      }
      const now = /* @__PURE__ */ new Date();
      if (entry.nonEmptySince === null) {
        entry.nonEmptySince = now;
      }
      entry.lastUpdated = now;
      entry.weight = newWeight;
    }
    getWeight(entry) {
      if (!this.latestConfig) {
        return 0;
      }
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (now - entry.lastUpdated.getTime() >= this.latestConfig.getWeightExpirationPeriodMs()) {
        entry.nonEmptySince = null;
        return 0;
      }
      const blackoutPeriod = this.latestConfig.getBlackoutPeriodMs();
      if (blackoutPeriod > 0 && (entry.nonEmptySince === null || now - entry.nonEmptySince.getTime() < blackoutPeriod)) {
        return 0;
      }
      return entry.weight;
    }
    calculateAndUpdateState() {
      if (this.updatesPaused || !this.latestConfig) {
        return;
      }
      if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.READY) > 0) {
        const weightedPickers = [];
        for (const [endpoint, entry] of this.children) {
          if (entry.child.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
            continue;
          }
          weightedPickers.push({
            endpointName: endpoint,
            picker: entry.child.getPicker(),
            weight: this.getWeight(entry)
          });
        }
        trace("Created picker with weights: " + weightedPickers.map((entry) => entry.endpointName + ":" + entry.weight).join(","));
        let metricsHandler;
        if (!this.latestConfig.getEnableOobLoadReport()) {
          metricsHandler = (loadReport, endpointName) => {
            const childEntry = this.children.get(endpointName);
            if (childEntry) {
              this.updateWeight(childEntry, loadReport);
            }
          };
        } else {
          metricsHandler = null;
        }
        this.updateState(connectivity_state_1.ConnectivityState.READY, new WeightedRoundRobinPicker(weightedPickers, metricsHandler), null);
      } else if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.CONNECTING) > 0) {
        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this), null);
      } else if (this.countChildrenWithState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) > 0) {
        const errorMessage = `weighted_round_robin: No connection established. Last error: ${this.lastError}`;
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({
          details: errorMessage
        }), errorMessage);
      } else {
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this), null);
      }
      for (const { child } of this.children.values()) {
        if (child.getConnectivityState() === connectivity_state_1.ConnectivityState.IDLE) {
          child.exitIdle();
        }
      }
    }
    updateState(newState, picker2, errorMessage) {
      trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      this.currentState = newState;
      this.channelControlHelper.updateState(newState, picker2, errorMessage);
    }
    updateAddressList(maybeEndpointList, lbConfig, options, resolutionNote) {
      var _a, _b;
      if (!(lbConfig instanceof WeightedRoundRobinLoadBalancingConfig)) {
        return false;
      }
      if (!maybeEndpointList.ok) {
        if (this.children.size === 0) {
          this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(maybeEndpointList.error), maybeEndpointList.error.details);
        }
        return true;
      }
      if (maybeEndpointList.value.length === 0) {
        const errorMessage = `No addresses resolved. Resolution note: ${resolutionNote}`;
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({ details: errorMessage }), errorMessage);
        return false;
      }
      trace("Connect to endpoint list " + maybeEndpointList.value.map(subchannel_address_1.endpointToString));
      const now = /* @__PURE__ */ new Date();
      const seenEndpointNames = /* @__PURE__ */ new Set();
      this.updatesPaused = true;
      this.latestConfig = lbConfig;
      for (const endpoint of maybeEndpointList.value) {
        const name = (0, subchannel_address_1.endpointToString)(endpoint);
        seenEndpointNames.add(name);
        let entry = this.children.get(name);
        if (!entry) {
          entry = {
            child: new load_balancer_pick_first_1.LeafLoadBalancer(endpoint, (0, load_balancer_1.createChildChannelControlHelper)(this.channelControlHelper, {
              updateState: (connectivityState2, picker2, errorMessage) => {
                if (this.currentState === connectivity_state_1.ConnectivityState.READY && connectivityState2 !== connectivity_state_1.ConnectivityState.READY) {
                  this.channelControlHelper.requestReresolution();
                }
                if (connectivityState2 === connectivity_state_1.ConnectivityState.READY) {
                  entry.nonEmptySince = null;
                }
                if (errorMessage) {
                  this.lastError = errorMessage;
                }
                this.calculateAndUpdateState();
              },
              createSubchannel: (subchannelAddress2, subchannelArgs) => {
                const subchannel2 = this.channelControlHelper.createSubchannel(subchannelAddress2, subchannelArgs);
                if (entry === null || entry === void 0 ? void 0 : entry.oobMetricsListener) {
                  return new orca_1.OrcaOobMetricsSubchannelWrapper(subchannel2, entry.oobMetricsListener, this.latestConfig.getOobLoadReportingPeriodMs());
                } else {
                  return subchannel2;
                }
              }
            }), options, resolutionNote),
            lastUpdated: now,
            nonEmptySince: null,
            weight: 0,
            oobMetricsListener: null
          };
          this.children.set(name, entry);
        }
        if (lbConfig.getEnableOobLoadReport()) {
          entry.oobMetricsListener = (loadReport) => {
            this.updateWeight(entry, loadReport);
          };
        } else {
          entry.oobMetricsListener = null;
        }
      }
      for (const [endpointName, entry] of this.children) {
        if (seenEndpointNames.has(endpointName)) {
          entry.child.startConnecting();
        } else {
          entry.child.destroy();
          this.children.delete(endpointName);
        }
      }
      this.updatesPaused = false;
      this.calculateAndUpdateState();
      if (this.weightUpdateTimer) {
        clearInterval(this.weightUpdateTimer);
      }
      this.weightUpdateTimer = (_b = (_a = setInterval(() => {
        if (this.currentState === connectivity_state_1.ConnectivityState.READY) {
          this.calculateAndUpdateState();
        }
      }, lbConfig.getWeightUpdatePeriodMs())).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      return true;
    }
    exitIdle() {
    }
    resetBackoff() {
    }
    destroy() {
      for (const entry of this.children.values()) {
        entry.child.destroy();
      }
      this.children.clear();
      if (this.weightUpdateTimer) {
        clearInterval(this.weightUpdateTimer);
      }
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, WeightedRoundRobinLoadBalancer, WeightedRoundRobinLoadBalancingConfig);
  }
  return loadBalancerWeightedRoundRobin;
}
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.experimental = exports.ServerMetricRecorder = exports.ServerInterceptingCall = exports.ResponderBuilder = exports.ServerListenerBuilder = exports.addAdminServicesToServer = exports.getChannelzHandlers = exports.getChannelzServiceDefinition = exports.InterceptorConfigurationError = exports.InterceptingCall = exports.RequesterBuilder = exports.ListenerBuilder = exports.StatusBuilder = exports.getClientChannel = exports.ServerCredentials = exports.Server = exports.setLogVerbosity = exports.setLogger = exports.load = exports.loadObject = exports.CallCredentials = exports.ChannelCredentials = exports.waitForClientReady = exports.closeClient = exports.Channel = exports.makeGenericClientConstructor = exports.makeClientConstructor = exports.loadPackageDefinition = exports.Client = exports.compressionAlgorithms = exports.propagate = exports.connectivityState = exports.status = exports.logVerbosity = exports.Metadata = exports.credentials = void 0;
    const call_credentials_1 = requireCallCredentials$1();
    Object.defineProperty(exports, "CallCredentials", { enumerable: true, get: function() {
      return call_credentials_1.CallCredentials;
    } });
    const channel_1 = requireChannel$1();
    Object.defineProperty(exports, "Channel", { enumerable: true, get: function() {
      return channel_1.ChannelImplementation;
    } });
    const compression_algorithms_1 = requireCompressionAlgorithms$1();
    Object.defineProperty(exports, "compressionAlgorithms", { enumerable: true, get: function() {
      return compression_algorithms_1.CompressionAlgorithms;
    } });
    const connectivity_state_1 = requireConnectivityState$1();
    Object.defineProperty(exports, "connectivityState", { enumerable: true, get: function() {
      return connectivity_state_1.ConnectivityState;
    } });
    const channel_credentials_1 = requireChannelCredentials$1();
    Object.defineProperty(exports, "ChannelCredentials", { enumerable: true, get: function() {
      return channel_credentials_1.ChannelCredentials;
    } });
    const client_1 = requireClient$1();
    Object.defineProperty(exports, "Client", { enumerable: true, get: function() {
      return client_1.Client;
    } });
    const constants_1 = requireConstants$1();
    Object.defineProperty(exports, "logVerbosity", { enumerable: true, get: function() {
      return constants_1.LogVerbosity;
    } });
    Object.defineProperty(exports, "status", { enumerable: true, get: function() {
      return constants_1.Status;
    } });
    Object.defineProperty(exports, "propagate", { enumerable: true, get: function() {
      return constants_1.Propagate;
    } });
    const logging2 = requireLogging$1();
    const make_client_1 = requireMakeClient$1();
    Object.defineProperty(exports, "loadPackageDefinition", { enumerable: true, get: function() {
      return make_client_1.loadPackageDefinition;
    } });
    Object.defineProperty(exports, "makeClientConstructor", { enumerable: true, get: function() {
      return make_client_1.makeClientConstructor;
    } });
    Object.defineProperty(exports, "makeGenericClientConstructor", { enumerable: true, get: function() {
      return make_client_1.makeClientConstructor;
    } });
    const metadata_1 = requireMetadata$1();
    Object.defineProperty(exports, "Metadata", { enumerable: true, get: function() {
      return metadata_1.Metadata;
    } });
    const server_1 = requireServer$1();
    Object.defineProperty(exports, "Server", { enumerable: true, get: function() {
      return server_1.Server;
    } });
    const server_credentials_1 = requireServerCredentials$1();
    Object.defineProperty(exports, "ServerCredentials", { enumerable: true, get: function() {
      return server_credentials_1.ServerCredentials;
    } });
    const status_builder_1 = requireStatusBuilder$1();
    Object.defineProperty(exports, "StatusBuilder", { enumerable: true, get: function() {
      return status_builder_1.StatusBuilder;
    } });
    exports.credentials = {
      /**
       * Combine a ChannelCredentials with any number of CallCredentials into a
       * single ChannelCredentials object.
       * @param channelCredentials The ChannelCredentials object.
       * @param callCredentials Any number of CallCredentials objects.
       * @return The resulting ChannelCredentials object.
       */
      combineChannelCredentials: (channelCredentials2, ...callCredentials2) => {
        return callCredentials2.reduce((acc, other) => acc.compose(other), channelCredentials2);
      },
      /**
       * Combine any number of CallCredentials into a single CallCredentials
       * object.
       * @param first The first CallCredentials object.
       * @param additional Any number of additional CallCredentials objects.
       * @return The resulting CallCredentials object.
       */
      combineCallCredentials: (first, ...additional) => {
        return additional.reduce((acc, other) => acc.compose(other), first);
      },
      // from channel-credentials.ts
      createInsecure: channel_credentials_1.ChannelCredentials.createInsecure,
      createSsl: channel_credentials_1.ChannelCredentials.createSsl,
      createFromSecureContext: channel_credentials_1.ChannelCredentials.createFromSecureContext,
      // from call-credentials.ts
      createFromMetadataGenerator: call_credentials_1.CallCredentials.createFromMetadataGenerator,
      createFromGoogleCredential: call_credentials_1.CallCredentials.createFromGoogleCredential,
      createEmpty: call_credentials_1.CallCredentials.createEmpty
    };
    const closeClient = (client2) => client2.close();
    exports.closeClient = closeClient;
    const waitForClientReady = (client2, deadline2, callback) => client2.waitForReady(deadline2, callback);
    exports.waitForClientReady = waitForClientReady;
    const loadObject = (value, options) => {
      throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
    };
    exports.loadObject = loadObject;
    const load = (filename, format, options) => {
      throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
    };
    exports.load = load;
    const setLogger = (logger) => {
      logging2.setLogger(logger);
    };
    exports.setLogger = setLogger;
    const setLogVerbosity = (verbosity) => {
      logging2.setLoggerVerbosity(verbosity);
    };
    exports.setLogVerbosity = setLogVerbosity;
    const getClientChannel = (client2) => {
      return client_1.Client.prototype.getChannel.call(client2);
    };
    exports.getClientChannel = getClientChannel;
    var client_interceptors_1 = requireClientInterceptors$1();
    Object.defineProperty(exports, "ListenerBuilder", { enumerable: true, get: function() {
      return client_interceptors_1.ListenerBuilder;
    } });
    Object.defineProperty(exports, "RequesterBuilder", { enumerable: true, get: function() {
      return client_interceptors_1.RequesterBuilder;
    } });
    Object.defineProperty(exports, "InterceptingCall", { enumerable: true, get: function() {
      return client_interceptors_1.InterceptingCall;
    } });
    Object.defineProperty(exports, "InterceptorConfigurationError", { enumerable: true, get: function() {
      return client_interceptors_1.InterceptorConfigurationError;
    } });
    var channelz_1 = requireChannelz$1();
    Object.defineProperty(exports, "getChannelzServiceDefinition", { enumerable: true, get: function() {
      return channelz_1.getChannelzServiceDefinition;
    } });
    Object.defineProperty(exports, "getChannelzHandlers", { enumerable: true, get: function() {
      return channelz_1.getChannelzHandlers;
    } });
    var admin_1 = requireAdmin$1();
    Object.defineProperty(exports, "addAdminServicesToServer", { enumerable: true, get: function() {
      return admin_1.addAdminServicesToServer;
    } });
    var server_interceptors_1 = requireServerInterceptors();
    Object.defineProperty(exports, "ServerListenerBuilder", { enumerable: true, get: function() {
      return server_interceptors_1.ServerListenerBuilder;
    } });
    Object.defineProperty(exports, "ResponderBuilder", { enumerable: true, get: function() {
      return server_interceptors_1.ResponderBuilder;
    } });
    Object.defineProperty(exports, "ServerInterceptingCall", { enumerable: true, get: function() {
      return server_interceptors_1.ServerInterceptingCall;
    } });
    var orca_1 = requireOrca();
    Object.defineProperty(exports, "ServerMetricRecorder", { enumerable: true, get: function() {
      return orca_1.ServerMetricRecorder;
    } });
    const experimental2 = requireExperimental$1();
    exports.experimental = experimental2;
    const resolver_dns = requireResolverDns$1();
    const resolver_uds = requireResolverUds$1();
    const resolver_ip = requireResolverIp$1();
    const load_balancer_pick_first = requireLoadBalancerPickFirst$1();
    const load_balancer_round_robin = requireLoadBalancerRoundRobin$1();
    const load_balancer_outlier_detection = requireLoadBalancerOutlierDetection$1();
    const load_balancer_weighted_round_robin = requireLoadBalancerWeightedRoundRobin();
    const channelz2 = requireChannelz$1();
    (() => {
      resolver_dns.setup();
      resolver_uds.setup();
      resolver_ip.setup();
      load_balancer_pick_first.setup();
      load_balancer_round_robin.setup();
      load_balancer_outlier_detection.setup();
      load_balancer_weighted_round_robin.setup();
      channelz2.setup();
    })();
  })(src$1);
  return src$1;
}
var src = {};
var callCredentials = {};
var metadata = {};
var logging = {};
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  Object.defineProperty(constants, "__esModule", { value: true });
  constants.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = constants.DEFAULT_MAX_SEND_MESSAGE_LENGTH = constants.Propagate = constants.LogVerbosity = constants.Status = void 0;
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
  })(Status || (constants.Status = Status = {}));
  var LogVerbosity;
  (function(LogVerbosity2) {
    LogVerbosity2[LogVerbosity2["DEBUG"] = 0] = "DEBUG";
    LogVerbosity2[LogVerbosity2["INFO"] = 1] = "INFO";
    LogVerbosity2[LogVerbosity2["ERROR"] = 2] = "ERROR";
    LogVerbosity2[LogVerbosity2["NONE"] = 3] = "NONE";
  })(LogVerbosity || (constants.LogVerbosity = LogVerbosity = {}));
  var Propagate;
  (function(Propagate2) {
    Propagate2[Propagate2["DEADLINE"] = 1] = "DEADLINE";
    Propagate2[Propagate2["CENSUS_STATS_CONTEXT"] = 2] = "CENSUS_STATS_CONTEXT";
    Propagate2[Propagate2["CENSUS_TRACING_CONTEXT"] = 4] = "CENSUS_TRACING_CONTEXT";
    Propagate2[Propagate2["CANCELLATION"] = 8] = "CANCELLATION";
    Propagate2[Propagate2["DEFAULTS"] = 65535] = "DEFAULTS";
  })(Propagate || (constants.Propagate = Propagate = {}));
  constants.DEFAULT_MAX_SEND_MESSAGE_LENGTH = -1;
  constants.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = 4 * 1024 * 1024;
  return constants;
}
const version = "1.9.16";
const require$$12 = {
  version
};
var hasRequiredLogging;
function requireLogging() {
  if (hasRequiredLogging) return logging;
  hasRequiredLogging = 1;
  (function(exports) {
    var _a, _b, _c, _d;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.log = exports.setLoggerVerbosity = exports.setLogger = exports.getLogger = void 0;
    exports.trace = trace;
    exports.isTracerEnabled = isTracerEnabled;
    const constants_1 = requireConstants();
    const process_1 = require$$1;
    const clientVersion = require$$12.version;
    const DEFAULT_LOGGER = {
      error: (message, ...optionalParams) => {
        console.error("E " + message, ...optionalParams);
      },
      info: (message, ...optionalParams) => {
        console.error("I " + message, ...optionalParams);
      },
      debug: (message, ...optionalParams) => {
        console.error("D " + message, ...optionalParams);
      }
    };
    let _logger = DEFAULT_LOGGER;
    let _logVerbosity = constants_1.LogVerbosity.ERROR;
    const verbosityString = (_b = (_a = process.env.GRPC_NODE_VERBOSITY) !== null && _a !== void 0 ? _a : process.env.GRPC_VERBOSITY) !== null && _b !== void 0 ? _b : "";
    switch (verbosityString.toUpperCase()) {
      case "DEBUG":
        _logVerbosity = constants_1.LogVerbosity.DEBUG;
        break;
      case "INFO":
        _logVerbosity = constants_1.LogVerbosity.INFO;
        break;
      case "ERROR":
        _logVerbosity = constants_1.LogVerbosity.ERROR;
        break;
      case "NONE":
        _logVerbosity = constants_1.LogVerbosity.NONE;
        break;
    }
    const getLogger = () => {
      return _logger;
    };
    exports.getLogger = getLogger;
    const setLogger = (logger) => {
      _logger = logger;
    };
    exports.setLogger = setLogger;
    const setLoggerVerbosity = (verbosity) => {
      _logVerbosity = verbosity;
    };
    exports.setLoggerVerbosity = setLoggerVerbosity;
    const log = (severity, ...args) => {
      let logFunction;
      if (severity >= _logVerbosity) {
        switch (severity) {
          case constants_1.LogVerbosity.DEBUG:
            logFunction = _logger.debug;
            break;
          case constants_1.LogVerbosity.INFO:
            logFunction = _logger.info;
            break;
          case constants_1.LogVerbosity.ERROR:
            logFunction = _logger.error;
            break;
        }
        if (!logFunction) {
          logFunction = _logger.error;
        }
        if (logFunction) {
          logFunction.bind(_logger)(...args);
        }
      }
    };
    exports.log = log;
    const tracersString = (_d = (_c = process.env.GRPC_NODE_TRACE) !== null && _c !== void 0 ? _c : process.env.GRPC_TRACE) !== null && _d !== void 0 ? _d : "";
    const enabledTracers = /* @__PURE__ */ new Set();
    const disabledTracers = /* @__PURE__ */ new Set();
    for (const tracerName of tracersString.split(",")) {
      if (tracerName.startsWith("-")) {
        disabledTracers.add(tracerName.substring(1));
      } else {
        enabledTracers.add(tracerName);
      }
    }
    const allEnabled = enabledTracers.has("all");
    function trace(severity, tracer, text) {
      if (isTracerEnabled(tracer)) {
        (0, exports.log)(severity, (/* @__PURE__ */ new Date()).toISOString() + " | v" + clientVersion + " " + process_1.pid + " | " + tracer + " | " + text);
      }
    }
    function isTracerEnabled(tracer) {
      return !disabledTracers.has(tracer) && (allEnabled || enabledTracers.has(tracer));
    }
  })(logging);
  return logging;
}
var error = {};
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1;
  Object.defineProperty(error, "__esModule", { value: true });
  error.getErrorMessage = getErrorMessage;
  error.getErrorCode = getErrorCode;
  function getErrorMessage(error2) {
    if (error2 instanceof Error) {
      return error2.message;
    } else {
      return String(error2);
    }
  }
  function getErrorCode(error2) {
    if (typeof error2 === "object" && error2 !== null && "code" in error2 && typeof error2.code === "number") {
      return error2.code;
    } else {
      return null;
    }
  }
  return error;
}
var hasRequiredMetadata;
function requireMetadata() {
  if (hasRequiredMetadata) return metadata;
  hasRequiredMetadata = 1;
  Object.defineProperty(metadata, "__esModule", { value: true });
  metadata.Metadata = void 0;
  const logging_1 = requireLogging();
  const constants_1 = requireConstants();
  const error_1 = requireError();
  const LEGAL_KEY_REGEX = /^[0-9a-z_.-]+$/;
  const LEGAL_NON_BINARY_VALUE_REGEX = /^[ -~]*$/;
  function isLegalKey(key) {
    return LEGAL_KEY_REGEX.test(key);
  }
  function isLegalNonBinaryValue(value) {
    return LEGAL_NON_BINARY_VALUE_REGEX.test(value);
  }
  function isBinaryKey(key) {
    return key.endsWith("-bin");
  }
  function isCustomMetadata(key) {
    return !key.startsWith("grpc-");
  }
  function normalizeKey(key) {
    return key.toLowerCase();
  }
  function validate(key, value) {
    if (!isLegalKey(key)) {
      throw new Error('Metadata key "' + key + '" contains illegal characters');
    }
    if (value !== null && value !== void 0) {
      if (isBinaryKey(key)) {
        if (!Buffer.isBuffer(value)) {
          throw new Error("keys that end with '-bin' must have Buffer values");
        }
      } else {
        if (Buffer.isBuffer(value)) {
          throw new Error("keys that don't end with '-bin' must have String values");
        }
        if (!isLegalNonBinaryValue(value)) {
          throw new Error('Metadata string value "' + value + '" contains illegal characters');
        }
      }
    }
  }
  class Metadata {
    constructor(options = {}) {
      this.internalRepr = /* @__PURE__ */ new Map();
      this.options = options;
    }
    /**
     * Sets the given value for the given key by replacing any other values
     * associated with that key. Normalizes the key.
     * @param key The key to whose value should be set.
     * @param value The value to set. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    set(key, value) {
      key = normalizeKey(key);
      validate(key, value);
      this.internalRepr.set(key, [value]);
    }
    /**
     * Adds the given value for the given key by appending to a list of previous
     * values associated with that key. Normalizes the key.
     * @param key The key for which a new value should be appended.
     * @param value The value to add. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */
    add(key, value) {
      key = normalizeKey(key);
      validate(key, value);
      const existingValue = this.internalRepr.get(key);
      if (existingValue === void 0) {
        this.internalRepr.set(key, [value]);
      } else {
        existingValue.push(value);
      }
    }
    /**
     * Removes the given key and any associated values. Normalizes the key.
     * @param key The key whose values should be removed.
     */
    remove(key) {
      key = normalizeKey(key);
      this.internalRepr.delete(key);
    }
    /**
     * Gets a list of all values associated with the key. Normalizes the key.
     * @param key The key whose value should be retrieved.
     * @return A list of values associated with the given key.
     */
    get(key) {
      key = normalizeKey(key);
      return this.internalRepr.get(key) || [];
    }
    /**
     * Gets a plain object mapping each key to the first value associated with it.
     * This reflects the most common way that people will want to see metadata.
     * @return A key/value mapping of the metadata.
     */
    getMap() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        if (values.length > 0) {
          const v = values[0];
          result[key] = Buffer.isBuffer(v) ? Buffer.from(v) : v;
        }
      }
      return result;
    }
    /**
     * Clones the metadata object.
     * @return The newly cloned object.
     */
    clone() {
      const newMetadata = new Metadata(this.options);
      const newInternalRepr = newMetadata.internalRepr;
      for (const [key, value] of this.internalRepr) {
        const clonedValue = value.map((v) => {
          if (Buffer.isBuffer(v)) {
            return Buffer.from(v);
          } else {
            return v;
          }
        });
        newInternalRepr.set(key, clonedValue);
      }
      return newMetadata;
    }
    /**
     * Merges all key-value pairs from a given Metadata object into this one.
     * If both this object and the given object have values in the same key,
     * values from the other Metadata object will be appended to this object's
     * values.
     * @param other A Metadata object.
     */
    merge(other) {
      for (const [key, values] of other.internalRepr) {
        const mergedValue = (this.internalRepr.get(key) || []).concat(values);
        this.internalRepr.set(key, mergedValue);
      }
    }
    setOptions(options) {
      this.options = options;
    }
    getOptions() {
      return this.options;
    }
    /**
     * Creates an OutgoingHttpHeaders object that can be used with the http2 API.
     */
    toHttp2Headers() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        result[key] = values.map(bufToString);
      }
      return result;
    }
    /**
     * This modifies the behavior of JSON.stringify to show an object
     * representation of the metadata map.
     */
    toJSON() {
      const result = {};
      for (const [key, values] of this.internalRepr) {
        result[key] = values;
      }
      return result;
    }
    /**
     * Returns a new Metadata object based fields in a given IncomingHttpHeaders
     * object.
     * @param headers An IncomingHttpHeaders object.
     */
    static fromHttp2Headers(headers) {
      const result = new Metadata();
      for (const key of Object.keys(headers)) {
        if (key.charAt(0) === ":") {
          continue;
        }
        const values = headers[key];
        try {
          if (isBinaryKey(key)) {
            if (Array.isArray(values)) {
              values.forEach((value) => {
                result.add(key, Buffer.from(value, "base64"));
              });
            } else if (values !== void 0) {
              if (isCustomMetadata(key)) {
                values.split(",").forEach((v) => {
                  result.add(key, Buffer.from(v.trim(), "base64"));
                });
              } else {
                result.add(key, Buffer.from(values, "base64"));
              }
            }
          } else {
            if (Array.isArray(values)) {
              values.forEach((value) => {
                result.add(key, value);
              });
            } else if (values !== void 0) {
              result.add(key, values);
            }
          }
        } catch (error2) {
          const message = `Failed to add metadata entry ${key}: ${values}. ${(0, error_1.getErrorMessage)(error2)}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
          (0, logging_1.log)(constants_1.LogVerbosity.ERROR, message);
        }
      }
      return result;
    }
  }
  metadata.Metadata = Metadata;
  const bufToString = (val) => {
    return Buffer.isBuffer(val) ? val.toString("base64") : val;
  };
  return metadata;
}
var hasRequiredCallCredentials;
function requireCallCredentials() {
  if (hasRequiredCallCredentials) return callCredentials;
  hasRequiredCallCredentials = 1;
  Object.defineProperty(callCredentials, "__esModule", { value: true });
  callCredentials.CallCredentials = void 0;
  const metadata_1 = requireMetadata();
  function isCurrentOauth2Client(client2) {
    return "getRequestHeaders" in client2 && typeof client2.getRequestHeaders === "function";
  }
  class CallCredentials {
    /**
     * Creates a new CallCredentials object from a given function that generates
     * Metadata objects.
     * @param metadataGenerator A function that accepts a set of options, and
     * generates a Metadata object based on these options, which is passed back
     * to the caller via a supplied (err, metadata) callback.
     */
    static createFromMetadataGenerator(metadataGenerator) {
      return new SingleCallCredentials(metadataGenerator);
    }
    /**
     * Create a gRPC credential from a Google credential object.
     * @param googleCredentials The authentication client to use.
     * @return The resulting CallCredentials object.
     */
    static createFromGoogleCredential(googleCredentials) {
      return CallCredentials.createFromMetadataGenerator((options, callback) => {
        let getHeaders;
        if (isCurrentOauth2Client(googleCredentials)) {
          getHeaders = googleCredentials.getRequestHeaders(options.service_url);
        } else {
          getHeaders = new Promise((resolve, reject) => {
            googleCredentials.getRequestMetadata(options.service_url, (err, headers) => {
              if (err) {
                reject(err);
                return;
              }
              if (!headers) {
                reject(new Error("Headers not set by metadata plugin"));
                return;
              }
              resolve(headers);
            });
          });
        }
        getHeaders.then((headers) => {
          const metadata2 = new metadata_1.Metadata();
          for (const key of Object.keys(headers)) {
            metadata2.add(key, headers[key]);
          }
          callback(null, metadata2);
        }, (err) => {
          callback(err);
        });
      });
    }
    static createEmpty() {
      return new EmptyCallCredentials();
    }
  }
  callCredentials.CallCredentials = CallCredentials;
  class ComposedCallCredentials extends CallCredentials {
    constructor(creds) {
      super();
      this.creds = creds;
    }
    async generateMetadata(options) {
      const base = new metadata_1.Metadata();
      const generated = await Promise.all(this.creds.map((cred) => cred.generateMetadata(options)));
      for (const gen of generated) {
        base.merge(gen);
      }
      return base;
    }
    compose(other) {
      return new ComposedCallCredentials(this.creds.concat([other]));
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof ComposedCallCredentials) {
        return this.creds.every((value, index) => value._equals(other.creds[index]));
      } else {
        return false;
      }
    }
  }
  class SingleCallCredentials extends CallCredentials {
    constructor(metadataGenerator) {
      super();
      this.metadataGenerator = metadataGenerator;
    }
    generateMetadata(options) {
      return new Promise((resolve, reject) => {
        this.metadataGenerator(options, (err, metadata2) => {
          if (metadata2 !== void 0) {
            resolve(metadata2);
          } else {
            reject(err);
          }
        });
      });
    }
    compose(other) {
      return new ComposedCallCredentials([this, other]);
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof SingleCallCredentials) {
        return this.metadataGenerator === other.metadataGenerator;
      } else {
        return false;
      }
    }
  }
  class EmptyCallCredentials extends CallCredentials {
    generateMetadata(options) {
      return Promise.resolve(new metadata_1.Metadata());
    }
    compose(other) {
      return other;
    }
    _equals(other) {
      return other instanceof EmptyCallCredentials;
    }
  }
  return callCredentials;
}
var channel = {};
var channelCredentials = {};
var tlsHelpers = {};
var hasRequiredTlsHelpers;
function requireTlsHelpers() {
  if (hasRequiredTlsHelpers) return tlsHelpers;
  hasRequiredTlsHelpers = 1;
  Object.defineProperty(tlsHelpers, "__esModule", { value: true });
  tlsHelpers.CIPHER_SUITES = void 0;
  tlsHelpers.getDefaultRootsData = getDefaultRootsData;
  const fs = require$$0;
  tlsHelpers.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
  const DEFAULT_ROOTS_FILE_PATH = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH;
  let defaultRootsData = null;
  function getDefaultRootsData() {
    if (DEFAULT_ROOTS_FILE_PATH) {
      if (defaultRootsData === null) {
        defaultRootsData = fs.readFileSync(DEFAULT_ROOTS_FILE_PATH);
      }
      return defaultRootsData;
    }
    return null;
  }
  return tlsHelpers;
}
var hasRequiredChannelCredentials;
function requireChannelCredentials() {
  if (hasRequiredChannelCredentials) return channelCredentials;
  hasRequiredChannelCredentials = 1;
  Object.defineProperty(channelCredentials, "__esModule", { value: true });
  channelCredentials.ChannelCredentials = void 0;
  const tls_1 = require$$1$1;
  const call_credentials_1 = requireCallCredentials();
  const tls_helpers_1 = requireTlsHelpers();
  function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
      throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
  }
  class ChannelCredentials {
    constructor(callCredentials2) {
      this.callCredentials = callCredentials2 || call_credentials_1.CallCredentials.createEmpty();
    }
    /**
     * Gets the set of per-call credentials associated with this instance.
     */
    _getCallCredentials() {
      return this.callCredentials;
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
      var _a;
      verifyIsBufferOrNull(rootCerts, "Root certificate");
      verifyIsBufferOrNull(privateKey, "Private key");
      verifyIsBufferOrNull(certChain, "Certificate chain");
      if (privateKey && !certChain) {
        throw new Error("Private key must be given with accompanying certificate chain");
      }
      if (!privateKey && certChain) {
        throw new Error("Certificate chain must be given with accompanying private key");
      }
      const secureContext = (0, tls_1.createSecureContext)({
        ca: (_a = rootCerts !== null && rootCerts !== void 0 ? rootCerts : (0, tls_helpers_1.getDefaultRootsData)()) !== null && _a !== void 0 ? _a : void 0,
        key: privateKey !== null && privateKey !== void 0 ? privateKey : void 0,
        cert: certChain !== null && certChain !== void 0 ? certChain : void 0,
        ciphers: tls_helpers_1.CIPHER_SUITES
      });
      return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with credentials created using
     * the provided secureContext. The resulting instances can be used to
     * construct a Channel that communicates over TLS. gRPC will not override
     * anything in the provided secureContext, so the environment variables
     * GRPC_SSL_CIPHER_SUITES and GRPC_DEFAULT_SSL_ROOTS_FILE_PATH will
     * not be applied.
     * @param secureContext The return value of tls.createSecureContext()
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createFromSecureContext(secureContext, verifyOptions) {
      return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure() {
      return new InsecureChannelCredentialsImpl();
    }
  }
  channelCredentials.ChannelCredentials = ChannelCredentials;
  class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(callCredentials2) {
      super(callCredentials2);
    }
    compose(callCredentials2) {
      throw new Error("Cannot compose insecure credentials");
    }
    _getConnectionOptions() {
      return null;
    }
    _isSecure() {
      return false;
    }
    _equals(other) {
      return other instanceof InsecureChannelCredentialsImpl;
    }
  }
  class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(secureContext, verifyOptions) {
      super();
      this.secureContext = secureContext;
      this.verifyOptions = verifyOptions;
      this.connectionOptions = {
        secureContext
      };
      if (verifyOptions === null || verifyOptions === void 0 ? void 0 : verifyOptions.checkServerIdentity) {
        this.connectionOptions.checkServerIdentity = verifyOptions.checkServerIdentity;
      }
    }
    compose(callCredentials2) {
      const combinedCallCredentials = this.callCredentials.compose(callCredentials2);
      return new ComposedChannelCredentialsImpl(this, combinedCallCredentials);
    }
    _getConnectionOptions() {
      return Object.assign({}, this.connectionOptions);
    }
    _isSecure() {
      return true;
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof SecureChannelCredentialsImpl) {
        return this.secureContext === other.secureContext && this.verifyOptions.checkServerIdentity === other.verifyOptions.checkServerIdentity;
      } else {
        return false;
      }
    }
  }
  class ComposedChannelCredentialsImpl extends ChannelCredentials {
    constructor(channelCredentials2, callCreds) {
      super(callCreds);
      this.channelCredentials = channelCredentials2;
    }
    compose(callCredentials2) {
      const combinedCallCredentials = this.callCredentials.compose(callCredentials2);
      return new ComposedChannelCredentialsImpl(this.channelCredentials, combinedCallCredentials);
    }
    _getConnectionOptions() {
      return this.channelCredentials._getConnectionOptions();
    }
    _isSecure() {
      return true;
    }
    _equals(other) {
      if (this === other) {
        return true;
      }
      if (other instanceof ComposedChannelCredentialsImpl) {
        return this.channelCredentials._equals(other.channelCredentials) && this.callCredentials._equals(other.callCredentials);
      } else {
        return false;
      }
    }
  }
  return channelCredentials;
}
var internalChannel = {};
var resolvingLoadBalancer = {};
var loadBalancer = {};
var hasRequiredLoadBalancer;
function requireLoadBalancer() {
  if (hasRequiredLoadBalancer) return loadBalancer;
  hasRequiredLoadBalancer = 1;
  Object.defineProperty(loadBalancer, "__esModule", { value: true });
  loadBalancer.createChildChannelControlHelper = createChildChannelControlHelper;
  loadBalancer.registerLoadBalancerType = registerLoadBalancerType;
  loadBalancer.registerDefaultLoadBalancerType = registerDefaultLoadBalancerType;
  loadBalancer.createLoadBalancer = createLoadBalancer;
  loadBalancer.isLoadBalancerNameRegistered = isLoadBalancerNameRegistered;
  loadBalancer.getFirstUsableConfig = getFirstUsableConfig;
  loadBalancer.validateLoadBalancingConfig = validateLoadBalancingConfig;
  function createChildChannelControlHelper(parent, overrides) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
      createSubchannel: (_b = (_a = overrides.createSubchannel) === null || _a === void 0 ? void 0 : _a.bind(overrides)) !== null && _b !== void 0 ? _b : parent.createSubchannel.bind(parent),
      updateState: (_d = (_c = overrides.updateState) === null || _c === void 0 ? void 0 : _c.bind(overrides)) !== null && _d !== void 0 ? _d : parent.updateState.bind(parent),
      requestReresolution: (_f = (_e = overrides.requestReresolution) === null || _e === void 0 ? void 0 : _e.bind(overrides)) !== null && _f !== void 0 ? _f : parent.requestReresolution.bind(parent),
      addChannelzChild: (_h = (_g = overrides.addChannelzChild) === null || _g === void 0 ? void 0 : _g.bind(overrides)) !== null && _h !== void 0 ? _h : parent.addChannelzChild.bind(parent),
      removeChannelzChild: (_k = (_j = overrides.removeChannelzChild) === null || _j === void 0 ? void 0 : _j.bind(overrides)) !== null && _k !== void 0 ? _k : parent.removeChannelzChild.bind(parent)
    };
  }
  const registeredLoadBalancerTypes = {};
  let defaultLoadBalancerType = null;
  function registerLoadBalancerType(typeName, loadBalancerType, loadBalancingConfigType) {
    registeredLoadBalancerTypes[typeName] = {
      LoadBalancer: loadBalancerType,
      LoadBalancingConfig: loadBalancingConfigType
    };
  }
  function registerDefaultLoadBalancerType(typeName) {
    defaultLoadBalancerType = typeName;
  }
  function createLoadBalancer(config, channelControlHelper) {
    const typeName = config.getLoadBalancerName();
    if (typeName in registeredLoadBalancerTypes) {
      return new registeredLoadBalancerTypes[typeName].LoadBalancer(channelControlHelper);
    } else {
      return null;
    }
  }
  function isLoadBalancerNameRegistered(typeName) {
    return typeName in registeredLoadBalancerTypes;
  }
  function getFirstUsableConfig(configs, fallbackTodefault = false) {
    for (const config of configs) {
      if (config.getLoadBalancerName() in registeredLoadBalancerTypes) {
        return config;
      }
    }
    if (fallbackTodefault) {
      if (defaultLoadBalancerType) {
        return new registeredLoadBalancerTypes[defaultLoadBalancerType].LoadBalancingConfig();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function validateLoadBalancingConfig(obj) {
    if (!(obj !== null && typeof obj === "object")) {
      throw new Error("Load balancing config must be an object");
    }
    const keys = Object.keys(obj);
    if (keys.length !== 1) {
      throw new Error("Provided load balancing config has multiple conflicting entries");
    }
    const typeName = keys[0];
    if (typeName in registeredLoadBalancerTypes) {
      return registeredLoadBalancerTypes[typeName].LoadBalancingConfig.createFromJson(obj[typeName]);
    } else {
      throw new Error(`Unrecognized load balancing config name ${typeName}`);
    }
  }
  return loadBalancer;
}
var serviceConfig = {};
var hasRequiredServiceConfig;
function requireServiceConfig() {
  if (hasRequiredServiceConfig) return serviceConfig;
  hasRequiredServiceConfig = 1;
  Object.defineProperty(serviceConfig, "__esModule", { value: true });
  serviceConfig.validateRetryThrottling = validateRetryThrottling;
  serviceConfig.validateServiceConfig = validateServiceConfig;
  serviceConfig.extractAndSelectServiceConfig = extractAndSelectServiceConfig;
  const os = require$$1$2;
  const constants_1 = requireConstants();
  const load_balancer_1 = requireLoadBalancer();
  const DURATION_REGEX = /^\d+(\.\d{1,9})?s$/;
  const CLIENT_LANGUAGE_STRING = "node";
  function validateName(obj) {
    if ("service" in obj && obj.service !== "") {
      if (typeof obj.service !== "string") {
        throw new Error(`Invalid method config name: invalid service: expected type string, got ${typeof obj.service}`);
      }
      if ("method" in obj && obj.method !== "") {
        if (typeof obj.method !== "string") {
          throw new Error(`Invalid method config name: invalid method: expected type string, got ${typeof obj.service}`);
        }
        return {
          service: obj.service,
          method: obj.method
        };
      } else {
        return {
          service: obj.service
        };
      }
    } else {
      if ("method" in obj && obj.method !== void 0) {
        throw new Error(`Invalid method config name: method set with empty or unset service`);
      }
      return {};
    }
  }
  function validateRetryPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
      throw new Error("Invalid method config retry policy: maxAttempts must be an integer at least 2");
    }
    if (!("initialBackoff" in obj) || typeof obj.initialBackoff !== "string" || !DURATION_REGEX.test(obj.initialBackoff)) {
      throw new Error("Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer followed by s");
    }
    if (!("maxBackoff" in obj) || typeof obj.maxBackoff !== "string" || !DURATION_REGEX.test(obj.maxBackoff)) {
      throw new Error("Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer followed by s");
    }
    if (!("backoffMultiplier" in obj) || typeof obj.backoffMultiplier !== "number" || obj.backoffMultiplier <= 0) {
      throw new Error("Invalid method config retry policy: backoffMultiplier must be a number greater than 0");
    }
    if (!("retryableStatusCodes" in obj && Array.isArray(obj.retryableStatusCodes))) {
      throw new Error("Invalid method config retry policy: retryableStatusCodes is required");
    }
    if (obj.retryableStatusCodes.length === 0) {
      throw new Error("Invalid method config retry policy: retryableStatusCodes must be non-empty");
    }
    for (const value of obj.retryableStatusCodes) {
      if (typeof value === "number") {
        if (!Object.values(constants_1.Status).includes(value)) {
          throw new Error("Invalid method config retry policy: retryableStatusCodes value not in status code range");
        }
      } else if (typeof value === "string") {
        if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
          throw new Error("Invalid method config retry policy: retryableStatusCodes value not a status code name");
        }
      } else {
        throw new Error("Invalid method config retry policy: retryableStatusCodes value must be a string or number");
      }
    }
    return {
      maxAttempts: obj.maxAttempts,
      initialBackoff: obj.initialBackoff,
      maxBackoff: obj.maxBackoff,
      backoffMultiplier: obj.backoffMultiplier,
      retryableStatusCodes: obj.retryableStatusCodes
    };
  }
  function validateHedgingPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
      throw new Error("Invalid method config hedging policy: maxAttempts must be an integer at least 2");
    }
    if ("hedgingDelay" in obj && (typeof obj.hedgingDelay !== "string" || !DURATION_REGEX.test(obj.hedgingDelay))) {
      throw new Error("Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by s");
    }
    if ("nonFatalStatusCodes" in obj && Array.isArray(obj.nonFatalStatusCodes)) {
      for (const value of obj.nonFatalStatusCodes) {
        if (typeof value === "number") {
          if (!Object.values(constants_1.Status).includes(value)) {
            throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value not in status code range");
          }
        } else if (typeof value === "string") {
          if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
            throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value not a status code name");
          }
        } else {
          throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value must be a string or number");
        }
      }
    }
    const result = {
      maxAttempts: obj.maxAttempts
    };
    if (obj.hedgingDelay) {
      result.hedgingDelay = obj.hedgingDelay;
    }
    if (obj.nonFatalStatusCodes) {
      result.nonFatalStatusCodes = obj.nonFatalStatusCodes;
    }
    return result;
  }
  function validateMethodConfig(obj) {
    var _a;
    const result = {
      name: []
    };
    if (!("name" in obj) || !Array.isArray(obj.name)) {
      throw new Error("Invalid method config: invalid name array");
    }
    for (const name of obj.name) {
      result.name.push(validateName(name));
    }
    if ("waitForReady" in obj) {
      if (typeof obj.waitForReady !== "boolean") {
        throw new Error("Invalid method config: invalid waitForReady");
      }
      result.waitForReady = obj.waitForReady;
    }
    if ("timeout" in obj) {
      if (typeof obj.timeout === "object") {
        if (!("seconds" in obj.timeout) || !(typeof obj.timeout.seconds === "number")) {
          throw new Error("Invalid method config: invalid timeout.seconds");
        }
        if (!("nanos" in obj.timeout) || !(typeof obj.timeout.nanos === "number")) {
          throw new Error("Invalid method config: invalid timeout.nanos");
        }
        result.timeout = obj.timeout;
      } else if (typeof obj.timeout === "string" && DURATION_REGEX.test(obj.timeout)) {
        const timeoutParts = obj.timeout.substring(0, obj.timeout.length - 1).split(".");
        result.timeout = {
          seconds: timeoutParts[0] | 0,
          nanos: ((_a = timeoutParts[1]) !== null && _a !== void 0 ? _a : 0) | 0
        };
      } else {
        throw new Error("Invalid method config: invalid timeout");
      }
    }
    if ("maxRequestBytes" in obj) {
      if (typeof obj.maxRequestBytes !== "number") {
        throw new Error("Invalid method config: invalid maxRequestBytes");
      }
      result.maxRequestBytes = obj.maxRequestBytes;
    }
    if ("maxResponseBytes" in obj) {
      if (typeof obj.maxResponseBytes !== "number") {
        throw new Error("Invalid method config: invalid maxRequestBytes");
      }
      result.maxResponseBytes = obj.maxResponseBytes;
    }
    if ("retryPolicy" in obj) {
      if ("hedgingPolicy" in obj) {
        throw new Error("Invalid method config: retryPolicy and hedgingPolicy cannot both be specified");
      } else {
        result.retryPolicy = validateRetryPolicy(obj.retryPolicy);
      }
    } else if ("hedgingPolicy" in obj) {
      result.hedgingPolicy = validateHedgingPolicy(obj.hedgingPolicy);
    }
    return result;
  }
  function validateRetryThrottling(obj) {
    if (!("maxTokens" in obj) || typeof obj.maxTokens !== "number" || obj.maxTokens <= 0 || obj.maxTokens > 1e3) {
      throw new Error("Invalid retryThrottling: maxTokens must be a number in (0, 1000]");
    }
    if (!("tokenRatio" in obj) || typeof obj.tokenRatio !== "number" || obj.tokenRatio <= 0) {
      throw new Error("Invalid retryThrottling: tokenRatio must be a number greater than 0");
    }
    return {
      maxTokens: +obj.maxTokens.toFixed(3),
      tokenRatio: +obj.tokenRatio.toFixed(3)
    };
  }
  function validateServiceConfig(obj) {
    const result = {
      loadBalancingConfig: [],
      methodConfig: []
    };
    if ("loadBalancingPolicy" in obj) {
      if (typeof obj.loadBalancingPolicy === "string") {
        result.loadBalancingPolicy = obj.loadBalancingPolicy;
      } else {
        throw new Error("Invalid service config: invalid loadBalancingPolicy");
      }
    }
    if ("loadBalancingConfig" in obj) {
      if (Array.isArray(obj.loadBalancingConfig)) {
        for (const config of obj.loadBalancingConfig) {
          result.loadBalancingConfig.push((0, load_balancer_1.validateLoadBalancingConfig)(config));
        }
      } else {
        throw new Error("Invalid service config: invalid loadBalancingConfig");
      }
    }
    if ("methodConfig" in obj) {
      if (Array.isArray(obj.methodConfig)) {
        for (const methodConfig of obj.methodConfig) {
          result.methodConfig.push(validateMethodConfig(methodConfig));
        }
      }
    }
    if ("retryThrottling" in obj) {
      result.retryThrottling = validateRetryThrottling(obj.retryThrottling);
    }
    const seenMethodNames = [];
    for (const methodConfig of result.methodConfig) {
      for (const name of methodConfig.name) {
        for (const seenName of seenMethodNames) {
          if (name.service === seenName.service && name.method === seenName.method) {
            throw new Error(`Invalid service config: duplicate name ${name.service}/${name.method}`);
          }
        }
        seenMethodNames.push(name);
      }
    }
    return result;
  }
  function validateCanaryConfig(obj) {
    if (!("serviceConfig" in obj)) {
      throw new Error("Invalid service config choice: missing service config");
    }
    const result = {
      serviceConfig: validateServiceConfig(obj.serviceConfig)
    };
    if ("clientLanguage" in obj) {
      if (Array.isArray(obj.clientLanguage)) {
        result.clientLanguage = [];
        for (const lang of obj.clientLanguage) {
          if (typeof lang === "string") {
            result.clientLanguage.push(lang);
          } else {
            throw new Error("Invalid service config choice: invalid clientLanguage");
          }
        }
      } else {
        throw new Error("Invalid service config choice: invalid clientLanguage");
      }
    }
    if ("clientHostname" in obj) {
      if (Array.isArray(obj.clientHostname)) {
        result.clientHostname = [];
        for (const lang of obj.clientHostname) {
          if (typeof lang === "string") {
            result.clientHostname.push(lang);
          } else {
            throw new Error("Invalid service config choice: invalid clientHostname");
          }
        }
      } else {
        throw new Error("Invalid service config choice: invalid clientHostname");
      }
    }
    if ("percentage" in obj) {
      if (typeof obj.percentage === "number" && 0 <= obj.percentage && obj.percentage <= 100) {
        result.percentage = obj.percentage;
      } else {
        throw new Error("Invalid service config choice: invalid percentage");
      }
    }
    const allowedFields = [
      "clientLanguage",
      "percentage",
      "clientHostname",
      "serviceConfig"
    ];
    for (const field in obj) {
      if (!allowedFields.includes(field)) {
        throw new Error(`Invalid service config choice: unexpected field ${field}`);
      }
    }
    return result;
  }
  function validateAndSelectCanaryConfig(obj, percentage) {
    if (!Array.isArray(obj)) {
      throw new Error("Invalid service config list");
    }
    for (const config of obj) {
      const validatedConfig = validateCanaryConfig(config);
      if (typeof validatedConfig.percentage === "number" && percentage > validatedConfig.percentage) {
        continue;
      }
      if (Array.isArray(validatedConfig.clientHostname)) {
        let hostnameMatched = false;
        for (const hostname of validatedConfig.clientHostname) {
          if (hostname === os.hostname()) {
            hostnameMatched = true;
          }
        }
        if (!hostnameMatched) {
          continue;
        }
      }
      if (Array.isArray(validatedConfig.clientLanguage)) {
        let languageMatched = false;
        for (const language of validatedConfig.clientLanguage) {
          if (language === CLIENT_LANGUAGE_STRING) {
            languageMatched = true;
          }
        }
        if (!languageMatched) {
          continue;
        }
      }
      return validatedConfig.serviceConfig;
    }
    throw new Error("No matching service config found");
  }
  function extractAndSelectServiceConfig(txtRecord, percentage) {
    for (const record of txtRecord) {
      if (record.length > 0 && record[0].startsWith("grpc_config=")) {
        const recordString = record.join("").substring("grpc_config=".length);
        const recordJson = JSON.parse(recordString);
        return validateAndSelectCanaryConfig(recordJson, percentage);
      }
    }
    return null;
  }
  return serviceConfig;
}
var connectivityState = {};
var hasRequiredConnectivityState;
function requireConnectivityState() {
  if (hasRequiredConnectivityState) return connectivityState;
  hasRequiredConnectivityState = 1;
  Object.defineProperty(connectivityState, "__esModule", { value: true });
  connectivityState.ConnectivityState = void 0;
  var ConnectivityState;
  (function(ConnectivityState2) {
    ConnectivityState2[ConnectivityState2["IDLE"] = 0] = "IDLE";
    ConnectivityState2[ConnectivityState2["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState2[ConnectivityState2["READY"] = 2] = "READY";
    ConnectivityState2[ConnectivityState2["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState2[ConnectivityState2["SHUTDOWN"] = 4] = "SHUTDOWN";
  })(ConnectivityState || (connectivityState.ConnectivityState = ConnectivityState = {}));
  return connectivityState;
}
var resolver = {};
var uriParser = {};
var hasRequiredUriParser;
function requireUriParser() {
  if (hasRequiredUriParser) return uriParser;
  hasRequiredUriParser = 1;
  Object.defineProperty(uriParser, "__esModule", { value: true });
  uriParser.parseUri = parseUri;
  uriParser.splitHostPort = splitHostPort;
  uriParser.uriToString = uriToString;
  const URI_REGEX = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;
  function parseUri(uriString) {
    const parsedUri = URI_REGEX.exec(uriString);
    if (parsedUri === null) {
      return null;
    }
    return {
      scheme: parsedUri[1],
      authority: parsedUri[2],
      path: parsedUri[3]
    };
  }
  const NUMBER_REGEX = /^\d+$/;
  function splitHostPort(path) {
    if (path.startsWith("[")) {
      const hostEnd = path.indexOf("]");
      if (hostEnd === -1) {
        return null;
      }
      const host = path.substring(1, hostEnd);
      if (host.indexOf(":") === -1) {
        return null;
      }
      if (path.length > hostEnd + 1) {
        if (path[hostEnd + 1] === ":") {
          const portString = path.substring(hostEnd + 2);
          if (NUMBER_REGEX.test(portString)) {
            return {
              host,
              port: +portString
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return {
          host
        };
      }
    } else {
      const splitPath = path.split(":");
      if (splitPath.length === 2) {
        if (NUMBER_REGEX.test(splitPath[1])) {
          return {
            host: splitPath[0],
            port: +splitPath[1]
          };
        } else {
          return null;
        }
      } else {
        return {
          host: path
        };
      }
    }
  }
  function uriToString(uri) {
    let result = "";
    if (uri.scheme !== void 0) {
      result += uri.scheme + ":";
    }
    if (uri.authority !== void 0) {
      result += "//" + uri.authority + "/";
    }
    result += uri.path;
    return result;
  }
  return uriParser;
}
var hasRequiredResolver;
function requireResolver() {
  if (hasRequiredResolver) return resolver;
  hasRequiredResolver = 1;
  Object.defineProperty(resolver, "__esModule", { value: true });
  resolver.registerResolver = registerResolver;
  resolver.registerDefaultScheme = registerDefaultScheme;
  resolver.createResolver = createResolver;
  resolver.getDefaultAuthority = getDefaultAuthority;
  resolver.mapUriDefaultScheme = mapUriDefaultScheme;
  const uri_parser_1 = requireUriParser();
  const registeredResolvers = {};
  let defaultScheme = null;
  function registerResolver(scheme, resolverClass) {
    registeredResolvers[scheme] = resolverClass;
  }
  function registerDefaultScheme(scheme) {
    defaultScheme = scheme;
  }
  function createResolver(target, listener, options) {
    if (target.scheme !== void 0 && target.scheme in registeredResolvers) {
      return new registeredResolvers[target.scheme](target, listener, options);
    } else {
      throw new Error(`No resolver could be created for target ${(0, uri_parser_1.uriToString)(target)}`);
    }
  }
  function getDefaultAuthority(target) {
    if (target.scheme !== void 0 && target.scheme in registeredResolvers) {
      return registeredResolvers[target.scheme].getDefaultAuthority(target);
    } else {
      throw new Error(`Invalid target ${(0, uri_parser_1.uriToString)(target)}`);
    }
  }
  function mapUriDefaultScheme(target) {
    if (target.scheme === void 0 || !(target.scheme in registeredResolvers)) {
      if (defaultScheme !== null) {
        return {
          scheme: defaultScheme,
          authority: void 0,
          path: (0, uri_parser_1.uriToString)(target)
        };
      } else {
        return null;
      }
    }
    return target;
  }
  return resolver;
}
var picker = {};
var hasRequiredPicker;
function requirePicker() {
  if (hasRequiredPicker) return picker;
  hasRequiredPicker = 1;
  Object.defineProperty(picker, "__esModule", { value: true });
  picker.QueuePicker = picker.UnavailablePicker = picker.PickResultType = void 0;
  const metadata_1 = requireMetadata();
  const constants_1 = requireConstants();
  var PickResultType;
  (function(PickResultType2) {
    PickResultType2[PickResultType2["COMPLETE"] = 0] = "COMPLETE";
    PickResultType2[PickResultType2["QUEUE"] = 1] = "QUEUE";
    PickResultType2[PickResultType2["TRANSIENT_FAILURE"] = 2] = "TRANSIENT_FAILURE";
    PickResultType2[PickResultType2["DROP"] = 3] = "DROP";
  })(PickResultType || (picker.PickResultType = PickResultType = {}));
  class UnavailablePicker {
    constructor(status) {
      this.status = Object.assign({ code: constants_1.Status.UNAVAILABLE, details: "No connection established", metadata: new metadata_1.Metadata() }, status);
    }
    pick(pickArgs) {
      return {
        pickResultType: PickResultType.TRANSIENT_FAILURE,
        subchannel: null,
        status: this.status,
        onCallStarted: null,
        onCallEnded: null
      };
    }
  }
  picker.UnavailablePicker = UnavailablePicker;
  class QueuePicker {
    // Constructed with a load balancer. Calls exitIdle on it the first time pick is called
    constructor(loadBalancer2) {
      this.loadBalancer = loadBalancer2;
      this.calledExitIdle = false;
    }
    pick(pickArgs) {
      if (!this.calledExitIdle) {
        process.nextTick(() => {
          this.loadBalancer.exitIdle();
        });
        this.calledExitIdle = true;
      }
      return {
        pickResultType: PickResultType.QUEUE,
        subchannel: null,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      };
    }
  }
  picker.QueuePicker = QueuePicker;
  return picker;
}
var backoffTimeout = {};
var hasRequiredBackoffTimeout;
function requireBackoffTimeout() {
  if (hasRequiredBackoffTimeout) return backoffTimeout;
  hasRequiredBackoffTimeout = 1;
  Object.defineProperty(backoffTimeout, "__esModule", { value: true });
  backoffTimeout.BackoffTimeout = void 0;
  const INITIAL_BACKOFF_MS = 1e3;
  const BACKOFF_MULTIPLIER = 1.6;
  const MAX_BACKOFF_MS = 12e4;
  const BACKOFF_JITTER = 0.2;
  function uniformRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  class BackoffTimeout {
    constructor(callback, options) {
      this.callback = callback;
      this.initialDelay = INITIAL_BACKOFF_MS;
      this.multiplier = BACKOFF_MULTIPLIER;
      this.maxDelay = MAX_BACKOFF_MS;
      this.jitter = BACKOFF_JITTER;
      this.running = false;
      this.hasRef = true;
      this.startTime = /* @__PURE__ */ new Date();
      this.endTime = /* @__PURE__ */ new Date();
      if (options) {
        if (options.initialDelay) {
          this.initialDelay = options.initialDelay;
        }
        if (options.multiplier) {
          this.multiplier = options.multiplier;
        }
        if (options.jitter) {
          this.jitter = options.jitter;
        }
        if (options.maxDelay) {
          this.maxDelay = options.maxDelay;
        }
      }
      this.nextDelay = this.initialDelay;
      this.timerId = setTimeout(() => {
      }, 0);
      clearTimeout(this.timerId);
    }
    runTimer(delay) {
      var _a, _b;
      this.endTime = this.startTime;
      this.endTime.setMilliseconds(this.endTime.getMilliseconds() + this.nextDelay);
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.callback();
        this.running = false;
      }, delay);
      if (!this.hasRef) {
        (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    /**
     * Call the callback after the current amount of delay time
     */
    runOnce() {
      this.running = true;
      this.startTime = /* @__PURE__ */ new Date();
      this.runTimer(this.nextDelay);
      const nextBackoff = Math.min(this.nextDelay * this.multiplier, this.maxDelay);
      const jitterMagnitude = nextBackoff * this.jitter;
      this.nextDelay = nextBackoff + uniformRandom(-jitterMagnitude, jitterMagnitude);
    }
    /**
     * Stop the timer. The callback will not be called until `runOnce` is called
     * again.
     */
    stop() {
      clearTimeout(this.timerId);
      this.running = false;
    }
    /**
     * Reset the delay time to its initial value. If the timer is still running,
     * retroactively apply that reset to the current timer.
     */
    reset() {
      this.nextDelay = this.initialDelay;
      if (this.running) {
        const now = /* @__PURE__ */ new Date();
        const newEndTime = this.startTime;
        newEndTime.setMilliseconds(newEndTime.getMilliseconds() + this.nextDelay);
        clearTimeout(this.timerId);
        if (now < newEndTime) {
          this.runTimer(newEndTime.getTime() - now.getTime());
        } else {
          this.running = false;
        }
      }
    }
    /**
     * Check whether the timer is currently running.
     */
    isRunning() {
      return this.running;
    }
    /**
     * Set that while the timer is running, it should keep the Node process
     * running.
     */
    ref() {
      var _a, _b;
      this.hasRef = true;
      (_b = (_a = this.timerId).ref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Set that while the timer is running, it should not keep the Node process
     * running.
     */
    unref() {
      var _a, _b;
      this.hasRef = false;
      (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Get the approximate timestamp of when the timer will fire. Only valid if
     * this.isRunning() is true.
     */
    getEndTime() {
      return this.endTime;
    }
  }
  backoffTimeout.BackoffTimeout = BackoffTimeout;
  return backoffTimeout;
}
var loadBalancerChildHandler = {};
var hasRequiredLoadBalancerChildHandler;
function requireLoadBalancerChildHandler() {
  if (hasRequiredLoadBalancerChildHandler) return loadBalancerChildHandler;
  hasRequiredLoadBalancerChildHandler = 1;
  Object.defineProperty(loadBalancerChildHandler, "__esModule", { value: true });
  loadBalancerChildHandler.ChildLoadBalancerHandler = void 0;
  const load_balancer_1 = requireLoadBalancer();
  const connectivity_state_1 = requireConnectivityState();
  const TYPE_NAME = "child_load_balancer_helper";
  class ChildLoadBalancerHandler {
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.currentChild = null;
      this.pendingChild = null;
      this.latestConfig = null;
      this.ChildPolicyHelper = class {
        constructor(parent) {
          this.parent = parent;
          this.child = null;
        }
        createSubchannel(subchannelAddress2, subchannelArgs) {
          return this.parent.channelControlHelper.createSubchannel(subchannelAddress2, subchannelArgs);
        }
        updateState(connectivityState2, picker2) {
          var _a;
          if (this.calledByPendingChild()) {
            if (connectivityState2 === connectivity_state_1.ConnectivityState.CONNECTING) {
              return;
            }
            (_a = this.parent.currentChild) === null || _a === void 0 ? void 0 : _a.destroy();
            this.parent.currentChild = this.parent.pendingChild;
            this.parent.pendingChild = null;
          } else if (!this.calledByCurrentChild()) {
            return;
          }
          this.parent.channelControlHelper.updateState(connectivityState2, picker2);
        }
        requestReresolution() {
          var _a;
          const latestChild = (_a = this.parent.pendingChild) !== null && _a !== void 0 ? _a : this.parent.currentChild;
          if (this.child === latestChild) {
            this.parent.channelControlHelper.requestReresolution();
          }
        }
        setChild(newChild) {
          this.child = newChild;
        }
        addChannelzChild(child) {
          this.parent.channelControlHelper.addChannelzChild(child);
        }
        removeChannelzChild(child) {
          this.parent.channelControlHelper.removeChannelzChild(child);
        }
        calledByPendingChild() {
          return this.child === this.parent.pendingChild;
        }
        calledByCurrentChild() {
          return this.child === this.parent.currentChild;
        }
      };
    }
    configUpdateRequiresNewPolicyInstance(oldConfig, newConfig) {
      return oldConfig.getLoadBalancerName() !== newConfig.getLoadBalancerName();
    }
    /**
     * Prerequisites: lbConfig !== null and lbConfig.name is registered
     * @param addressList
     * @param lbConfig
     * @param attributes
     */
    updateAddressList(addressList, lbConfig, attributes) {
      let childToUpdate;
      if (this.currentChild === null || this.latestConfig === null || this.configUpdateRequiresNewPolicyInstance(this.latestConfig, lbConfig)) {
        const newHelper = new this.ChildPolicyHelper(this);
        const newChild = (0, load_balancer_1.createLoadBalancer)(lbConfig, newHelper);
        newHelper.setChild(newChild);
        if (this.currentChild === null) {
          this.currentChild = newChild;
          childToUpdate = this.currentChild;
        } else {
          if (this.pendingChild) {
            this.pendingChild.destroy();
          }
          this.pendingChild = newChild;
          childToUpdate = this.pendingChild;
        }
      } else {
        if (this.pendingChild === null) {
          childToUpdate = this.currentChild;
        } else {
          childToUpdate = this.pendingChild;
        }
      }
      this.latestConfig = lbConfig;
      childToUpdate.updateAddressList(addressList, lbConfig, attributes);
    }
    exitIdle() {
      if (this.currentChild) {
        this.currentChild.exitIdle();
        if (this.pendingChild) {
          this.pendingChild.exitIdle();
        }
      }
    }
    resetBackoff() {
      if (this.currentChild) {
        this.currentChild.resetBackoff();
        if (this.pendingChild) {
          this.pendingChild.resetBackoff();
        }
      }
    }
    destroy() {
      if (this.currentChild) {
        this.currentChild.destroy();
        this.currentChild = null;
      }
      if (this.pendingChild) {
        this.pendingChild.destroy();
        this.pendingChild = null;
      }
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerChildHandler.ChildLoadBalancerHandler = ChildLoadBalancerHandler;
  return loadBalancerChildHandler;
}
var hasRequiredResolvingLoadBalancer;
function requireResolvingLoadBalancer() {
  if (hasRequiredResolvingLoadBalancer) return resolvingLoadBalancer;
  hasRequiredResolvingLoadBalancer = 1;
  Object.defineProperty(resolvingLoadBalancer, "__esModule", { value: true });
  resolvingLoadBalancer.ResolvingLoadBalancer = void 0;
  const load_balancer_1 = requireLoadBalancer();
  const service_config_1 = requireServiceConfig();
  const connectivity_state_1 = requireConnectivityState();
  const resolver_1 = requireResolver();
  const picker_1 = requirePicker();
  const backoff_timeout_1 = requireBackoffTimeout();
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const logging2 = requireLogging();
  const constants_2 = requireConstants();
  const uri_parser_1 = requireUriParser();
  const load_balancer_child_handler_1 = requireLoadBalancerChildHandler();
  const TRACER_NAME = "resolving_load_balancer";
  function trace(text) {
    logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const NAME_MATCH_LEVEL_ORDER = [
    "SERVICE_AND_METHOD",
    "SERVICE",
    "EMPTY"
  ];
  function hasMatchingName(service, method, methodConfig, matchLevel) {
    for (const name of methodConfig.name) {
      switch (matchLevel) {
        case "EMPTY":
          if (!name.service && !name.method) {
            return true;
          }
          break;
        case "SERVICE":
          if (name.service === service && !name.method) {
            return true;
          }
          break;
        case "SERVICE_AND_METHOD":
          if (name.service === service && name.method === method) {
            return true;
          }
      }
    }
    return false;
  }
  function findMatchingConfig(service, method, methodConfigs, matchLevel) {
    for (const config of methodConfigs) {
      if (hasMatchingName(service, method, config, matchLevel)) {
        return config;
      }
    }
    return null;
  }
  function getDefaultConfigSelector(serviceConfig2) {
    return function defaultConfigSelector(methodName, metadata2) {
      var _a, _b;
      const splitName = methodName.split("/").filter((x) => x.length > 0);
      const service = (_a = splitName[0]) !== null && _a !== void 0 ? _a : "";
      const method = (_b = splitName[1]) !== null && _b !== void 0 ? _b : "";
      if (serviceConfig2 && serviceConfig2.methodConfig) {
        for (const matchLevel of NAME_MATCH_LEVEL_ORDER) {
          const matchingConfig = findMatchingConfig(service, method, serviceConfig2.methodConfig, matchLevel);
          if (matchingConfig) {
            return {
              methodConfig: matchingConfig,
              pickInformation: {},
              status: constants_1.Status.OK,
              dynamicFilterFactories: []
            };
          }
        }
      }
      return {
        methodConfig: { name: [] },
        pickInformation: {},
        status: constants_1.Status.OK,
        dynamicFilterFactories: []
      };
    };
  }
  class ResolvingLoadBalancer {
    /**
     * Wrapper class that behaves like a `LoadBalancer` and also handles name
     * resolution internally.
     * @param target The address of the backend to connect to.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     * @param defaultServiceConfig The default service configuration to be used
     *     if none is provided by the name resolver. A `null` value indicates
     *     that the default behavior should be the default unconfigured behavior.
     *     In practice, that means using the "pick first" load balancer
     *     implmentation
     */
    constructor(target, channelControlHelper, channelOptions2, onSuccessfulResolution, onFailedResolution) {
      this.target = target;
      this.channelControlHelper = channelControlHelper;
      this.onSuccessfulResolution = onSuccessfulResolution;
      this.onFailedResolution = onFailedResolution;
      this.latestChildState = connectivity_state_1.ConnectivityState.IDLE;
      this.latestChildPicker = new picker_1.QueuePicker(this);
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.previousServiceConfig = null;
      this.continueResolving = false;
      if (channelOptions2["grpc.service_config"]) {
        this.defaultServiceConfig = (0, service_config_1.validateServiceConfig)(JSON.parse(channelOptions2["grpc.service_config"]));
      } else {
        this.defaultServiceConfig = {
          loadBalancingConfig: [],
          methodConfig: []
        };
      }
      this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
      this.childLoadBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler({
        createSubchannel: channelControlHelper.createSubchannel.bind(channelControlHelper),
        requestReresolution: () => {
          if (this.backoffTimeout.isRunning()) {
            trace("requestReresolution delayed by backoff timer until " + this.backoffTimeout.getEndTime().toISOString());
            this.continueResolving = true;
          } else {
            this.updateResolution();
          }
        },
        updateState: (newState, picker2) => {
          this.latestChildState = newState;
          this.latestChildPicker = picker2;
          this.updateState(newState, picker2);
        },
        addChannelzChild: channelControlHelper.addChannelzChild.bind(channelControlHelper),
        removeChannelzChild: channelControlHelper.removeChannelzChild.bind(channelControlHelper)
      });
      this.innerResolver = (0, resolver_1.createResolver)(target, {
        onSuccessfulResolution: (addressList, serviceConfig2, serviceConfigError, configSelector, attributes) => {
          var _a;
          this.backoffTimeout.stop();
          this.backoffTimeout.reset();
          let workingServiceConfig = null;
          if (serviceConfig2 === null) {
            if (serviceConfigError === null) {
              this.previousServiceConfig = null;
              workingServiceConfig = this.defaultServiceConfig;
            } else {
              if (this.previousServiceConfig === null) {
                this.handleResolutionFailure(serviceConfigError);
              } else {
                workingServiceConfig = this.previousServiceConfig;
              }
            }
          } else {
            workingServiceConfig = serviceConfig2;
            this.previousServiceConfig = serviceConfig2;
          }
          const workingConfigList = (_a = workingServiceConfig === null || workingServiceConfig === void 0 ? void 0 : workingServiceConfig.loadBalancingConfig) !== null && _a !== void 0 ? _a : [];
          const loadBalancingConfig = (0, load_balancer_1.getFirstUsableConfig)(workingConfigList, true);
          if (loadBalancingConfig === null) {
            this.handleResolutionFailure({
              code: constants_1.Status.UNAVAILABLE,
              details: "All load balancer options in service config are not compatible",
              metadata: new metadata_1.Metadata()
            });
            return;
          }
          this.childLoadBalancer.updateAddressList(addressList, loadBalancingConfig, attributes);
          const finalServiceConfig = workingServiceConfig !== null && workingServiceConfig !== void 0 ? workingServiceConfig : this.defaultServiceConfig;
          this.onSuccessfulResolution(finalServiceConfig, configSelector !== null && configSelector !== void 0 ? configSelector : getDefaultConfigSelector(finalServiceConfig));
        },
        onError: (error2) => {
          this.handleResolutionFailure(error2);
        }
      }, channelOptions2);
      const backoffOptions = {
        initialDelay: channelOptions2["grpc.initial_reconnect_backoff_ms"],
        maxDelay: channelOptions2["grpc.max_reconnect_backoff_ms"]
      };
      this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(() => {
        if (this.continueResolving) {
          this.updateResolution();
          this.continueResolving = false;
        } else {
          this.updateState(this.latestChildState, this.latestChildPicker);
        }
      }, backoffOptions);
      this.backoffTimeout.unref();
    }
    updateResolution() {
      this.innerResolver.updateResolution();
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE) {
        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
      }
      this.backoffTimeout.runOnce();
    }
    updateState(connectivityState2, picker2) {
      trace((0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[connectivityState2]);
      if (connectivityState2 === connectivity_state_1.ConnectivityState.IDLE) {
        picker2 = new picker_1.QueuePicker(this);
      }
      this.currentState = connectivityState2;
      this.channelControlHelper.updateState(connectivityState2, picker2);
    }
    handleResolutionFailure(error2) {
      if (this.latestChildState === connectivity_state_1.ConnectivityState.IDLE) {
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(error2));
        this.onFailedResolution(error2);
      }
    }
    exitIdle() {
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE || this.currentState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
        if (this.backoffTimeout.isRunning()) {
          this.continueResolving = true;
        } else {
          this.updateResolution();
        }
      }
      this.childLoadBalancer.exitIdle();
    }
    updateAddressList(addressList, lbConfig) {
      throw new Error("updateAddressList not supported on ResolvingLoadBalancer");
    }
    resetBackoff() {
      this.backoffTimeout.reset();
      this.childLoadBalancer.resetBackoff();
    }
    destroy() {
      this.childLoadBalancer.destroy();
      this.innerResolver.destroy();
      this.backoffTimeout.reset();
      this.backoffTimeout.stop();
      this.latestChildState = connectivity_state_1.ConnectivityState.IDLE;
      this.latestChildPicker = new picker_1.QueuePicker(this);
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.previousServiceConfig = null;
      this.continueResolving = false;
    }
    getTypeName() {
      return "resolving_load_balancer";
    }
  }
  resolvingLoadBalancer.ResolvingLoadBalancer = ResolvingLoadBalancer;
  return resolvingLoadBalancer;
}
var subchannelPool = {};
var channelOptions = {};
var hasRequiredChannelOptions;
function requireChannelOptions() {
  if (hasRequiredChannelOptions) return channelOptions;
  hasRequiredChannelOptions = 1;
  Object.defineProperty(channelOptions, "__esModule", { value: true });
  channelOptions.recognizedOptions = void 0;
  channelOptions.channelOptionsEqual = channelOptionsEqual;
  channelOptions.recognizedOptions = {
    "grpc.ssl_target_name_override": true,
    "grpc.primary_user_agent": true,
    "grpc.secondary_user_agent": true,
    "grpc.default_authority": true,
    "grpc.keepalive_time_ms": true,
    "grpc.keepalive_timeout_ms": true,
    "grpc.keepalive_permit_without_calls": true,
    "grpc.service_config": true,
    "grpc.max_concurrent_streams": true,
    "grpc.initial_reconnect_backoff_ms": true,
    "grpc.max_reconnect_backoff_ms": true,
    "grpc.use_local_subchannel_pool": true,
    "grpc.max_send_message_length": true,
    "grpc.max_receive_message_length": true,
    "grpc.enable_http_proxy": true,
    "grpc.enable_channelz": true,
    "grpc.dns_min_time_between_resolutions_ms": true,
    "grpc.enable_retries": true,
    "grpc.per_rpc_retry_buffer_size": true,
    "grpc.retry_buffer_size": true,
    "grpc.max_connection_age_ms": true,
    "grpc.max_connection_age_grace_ms": true,
    "grpc-node.max_session_memory": true,
    "grpc.service_config_disable_resolution": true,
    "grpc.client_idle_timeout_ms": true,
    "grpc-node.tls_enable_trace": true
  };
  function channelOptionsEqual(options1, options2) {
    const keys1 = Object.keys(options1).sort();
    const keys2 = Object.keys(options2).sort();
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let i = 0; i < keys1.length; i += 1) {
      if (keys1[i] !== keys2[i]) {
        return false;
      }
      if (options1[keys1[i]] !== options2[keys2[i]]) {
        return false;
      }
    }
    return true;
  }
  return channelOptions;
}
var subchannel = {};
var subchannelAddress = {};
var hasRequiredSubchannelAddress;
function requireSubchannelAddress() {
  if (hasRequiredSubchannelAddress) return subchannelAddress;
  hasRequiredSubchannelAddress = 1;
  Object.defineProperty(subchannelAddress, "__esModule", { value: true });
  subchannelAddress.isTcpSubchannelAddress = isTcpSubchannelAddress;
  subchannelAddress.subchannelAddressEqual = subchannelAddressEqual;
  subchannelAddress.subchannelAddressToString = subchannelAddressToString;
  subchannelAddress.stringToSubchannelAddress = stringToSubchannelAddress;
  const net_1 = require$$0$1;
  function isTcpSubchannelAddress(address) {
    return "port" in address;
  }
  function subchannelAddressEqual(address1, address2) {
    if (!address1 && !address2) {
      return true;
    }
    if (!address1 || !address2) {
      return false;
    }
    if (isTcpSubchannelAddress(address1)) {
      return isTcpSubchannelAddress(address2) && address1.host === address2.host && address1.port === address2.port;
    } else {
      return !isTcpSubchannelAddress(address2) && address1.path === address2.path;
    }
  }
  function subchannelAddressToString(address) {
    if (isTcpSubchannelAddress(address)) {
      return address.host + ":" + address.port;
    } else {
      return address.path;
    }
  }
  const DEFAULT_PORT = 443;
  function stringToSubchannelAddress(addressString, port) {
    if ((0, net_1.isIP)(addressString)) {
      return {
        host: addressString,
        port: port !== null && port !== void 0 ? port : DEFAULT_PORT
      };
    } else {
      return {
        path: addressString
      };
    }
  }
  return subchannelAddress;
}
var channelz = {};
var admin = {};
var hasRequiredAdmin;
function requireAdmin() {
  if (hasRequiredAdmin) return admin;
  hasRequiredAdmin = 1;
  Object.defineProperty(admin, "__esModule", { value: true });
  admin.registerAdminService = registerAdminService;
  admin.addAdminServicesToServer = addAdminServicesToServer;
  const registeredAdminServices = [];
  function registerAdminService(getServiceDefinition, getHandlers) {
    registeredAdminServices.push({ getServiceDefinition, getHandlers });
  }
  function addAdminServicesToServer(server2) {
    for (const { getServiceDefinition, getHandlers } of registeredAdminServices) {
      server2.addService(getServiceDefinition(), getHandlers());
    }
  }
  return admin;
}
var makeClient = {};
var client = {};
var call = {};
var hasRequiredCall;
function requireCall() {
  if (hasRequiredCall) return call;
  hasRequiredCall = 1;
  Object.defineProperty(call, "__esModule", { value: true });
  call.ClientDuplexStreamImpl = call.ClientWritableStreamImpl = call.ClientReadableStreamImpl = call.ClientUnaryCallImpl = void 0;
  call.callErrorFromStatus = callErrorFromStatus;
  const events_1 = require$$0$2;
  const stream_1 = require$$0$3;
  const constants_1 = requireConstants();
  function callErrorFromStatus(status, callerStack) {
    const message = `${status.code} ${constants_1.Status[status.code]}: ${status.details}`;
    const error2 = new Error(message);
    const stack = `${error2.stack}
for call at
${callerStack}`;
    return Object.assign(new Error(message), status, { stack });
  }
  class ClientUnaryCallImpl extends events_1.EventEmitter {
    constructor() {
      super();
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
  }
  call.ClientUnaryCallImpl = ClientUnaryCallImpl;
  class ClientReadableStreamImpl extends stream_1.Readable {
    constructor(deserialize) {
      super({ objectMode: true });
      this.deserialize = deserialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _read(_size) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
  }
  call.ClientReadableStreamImpl = ClientReadableStreamImpl;
  class ClientWritableStreamImpl extends stream_1.Writable {
    constructor(serialize) {
      super({ objectMode: true });
      this.serialize = serialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _write(chunk, encoding, cb) {
      var _a;
      const context = {
        callback: cb
      };
      const flags = Number(encoding);
      if (!Number.isNaN(flags)) {
        context.flags = flags;
      }
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
      cb();
    }
  }
  call.ClientWritableStreamImpl = ClientWritableStreamImpl;
  class ClientDuplexStreamImpl extends stream_1.Duplex {
    constructor(serialize, deserialize) {
      super({ objectMode: true });
      this.serialize = serialize;
      this.deserialize = deserialize;
    }
    cancel() {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _read(_size) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
    _write(chunk, encoding, cb) {
      var _a;
      const context = {
        callback: cb
      };
      const flags = Number(encoding);
      if (!Number.isNaN(flags)) {
        context.flags = flags;
      }
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
      var _a;
      (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
      cb();
    }
  }
  call.ClientDuplexStreamImpl = ClientDuplexStreamImpl;
  return call;
}
var clientInterceptors = {};
var callInterface = {};
var hasRequiredCallInterface;
function requireCallInterface() {
  if (hasRequiredCallInterface) return callInterface;
  hasRequiredCallInterface = 1;
  Object.defineProperty(callInterface, "__esModule", { value: true });
  callInterface.InterceptingListenerImpl = void 0;
  callInterface.isInterceptingListener = isInterceptingListener;
  function isInterceptingListener(listener) {
    return listener.onReceiveMetadata !== void 0 && listener.onReceiveMetadata.length === 1;
  }
  class InterceptingListenerImpl {
    constructor(listener, nextListener) {
      this.listener = listener;
      this.nextListener = nextListener;
      this.processingMetadata = false;
      this.hasPendingMessage = false;
      this.processingMessage = false;
      this.pendingStatus = null;
    }
    processPendingMessage() {
      if (this.hasPendingMessage) {
        this.nextListener.onReceiveMessage(this.pendingMessage);
        this.pendingMessage = null;
        this.hasPendingMessage = false;
      }
    }
    processPendingStatus() {
      if (this.pendingStatus) {
        this.nextListener.onReceiveStatus(this.pendingStatus);
      }
    }
    onReceiveMetadata(metadata2) {
      this.processingMetadata = true;
      this.listener.onReceiveMetadata(metadata2, (metadata3) => {
        this.processingMetadata = false;
        this.nextListener.onReceiveMetadata(metadata3);
        this.processPendingMessage();
        this.processPendingStatus();
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onReceiveMessage(message) {
      this.processingMessage = true;
      this.listener.onReceiveMessage(message, (msg) => {
        this.processingMessage = false;
        if (this.processingMetadata) {
          this.pendingMessage = msg;
          this.hasPendingMessage = true;
        } else {
          this.nextListener.onReceiveMessage(msg);
          this.processPendingStatus();
        }
      });
    }
    onReceiveStatus(status) {
      this.listener.onReceiveStatus(status, (processedStatus) => {
        if (this.processingMetadata || this.processingMessage) {
          this.pendingStatus = processedStatus;
        } else {
          this.nextListener.onReceiveStatus(processedStatus);
        }
      });
    }
  }
  callInterface.InterceptingListenerImpl = InterceptingListenerImpl;
  return callInterface;
}
var hasRequiredClientInterceptors;
function requireClientInterceptors() {
  if (hasRequiredClientInterceptors) return clientInterceptors;
  hasRequiredClientInterceptors = 1;
  Object.defineProperty(clientInterceptors, "__esModule", { value: true });
  clientInterceptors.InterceptingCall = clientInterceptors.RequesterBuilder = clientInterceptors.ListenerBuilder = clientInterceptors.InterceptorConfigurationError = void 0;
  clientInterceptors.getInterceptingCall = getInterceptingCall;
  const metadata_1 = requireMetadata();
  const call_interface_1 = requireCallInterface();
  const constants_1 = requireConstants();
  const error_1 = requireError();
  class InterceptorConfigurationError extends Error {
    constructor(message) {
      super(message);
      this.name = "InterceptorConfigurationError";
      Error.captureStackTrace(this, InterceptorConfigurationError);
    }
  }
  clientInterceptors.InterceptorConfigurationError = InterceptorConfigurationError;
  class ListenerBuilder {
    constructor() {
      this.metadata = void 0;
      this.message = void 0;
      this.status = void 0;
    }
    withOnReceiveMetadata(onReceiveMetadata) {
      this.metadata = onReceiveMetadata;
      return this;
    }
    withOnReceiveMessage(onReceiveMessage) {
      this.message = onReceiveMessage;
      return this;
    }
    withOnReceiveStatus(onReceiveStatus) {
      this.status = onReceiveStatus;
      return this;
    }
    build() {
      return {
        onReceiveMetadata: this.metadata,
        onReceiveMessage: this.message,
        onReceiveStatus: this.status
      };
    }
  }
  clientInterceptors.ListenerBuilder = ListenerBuilder;
  class RequesterBuilder {
    constructor() {
      this.start = void 0;
      this.message = void 0;
      this.halfClose = void 0;
      this.cancel = void 0;
    }
    withStart(start) {
      this.start = start;
      return this;
    }
    withSendMessage(sendMessage) {
      this.message = sendMessage;
      return this;
    }
    withHalfClose(halfClose) {
      this.halfClose = halfClose;
      return this;
    }
    withCancel(cancel) {
      this.cancel = cancel;
      return this;
    }
    build() {
      return {
        start: this.start,
        sendMessage: this.message,
        halfClose: this.halfClose,
        cancel: this.cancel
      };
    }
  }
  clientInterceptors.RequesterBuilder = RequesterBuilder;
  const defaultListener = {
    onReceiveMetadata: (metadata2, next) => {
      next(metadata2);
    },
    onReceiveMessage: (message, next) => {
      next(message);
    },
    onReceiveStatus: (status, next) => {
      next(status);
    }
  };
  const defaultRequester = {
    start: (metadata2, listener, next) => {
      next(metadata2, listener);
    },
    sendMessage: (message, next) => {
      next(message);
    },
    halfClose: (next) => {
      next();
    },
    cancel: (next) => {
      next();
    }
  };
  class InterceptingCall {
    constructor(nextCall, requester) {
      var _a, _b, _c, _d;
      this.nextCall = nextCall;
      this.processingMetadata = false;
      this.pendingMessageContext = null;
      this.processingMessage = false;
      this.pendingHalfClose = false;
      if (requester) {
        this.requester = {
          start: (_a = requester.start) !== null && _a !== void 0 ? _a : defaultRequester.start,
          sendMessage: (_b = requester.sendMessage) !== null && _b !== void 0 ? _b : defaultRequester.sendMessage,
          halfClose: (_c = requester.halfClose) !== null && _c !== void 0 ? _c : defaultRequester.halfClose,
          cancel: (_d = requester.cancel) !== null && _d !== void 0 ? _d : defaultRequester.cancel
        };
      } else {
        this.requester = defaultRequester;
      }
    }
    cancelWithStatus(status, details) {
      this.requester.cancel(() => {
        this.nextCall.cancelWithStatus(status, details);
      });
    }
    getPeer() {
      return this.nextCall.getPeer();
    }
    processPendingMessage() {
      if (this.pendingMessageContext) {
        this.nextCall.sendMessageWithContext(this.pendingMessageContext, this.pendingMessage);
        this.pendingMessageContext = null;
        this.pendingMessage = null;
      }
    }
    processPendingHalfClose() {
      if (this.pendingHalfClose) {
        this.nextCall.halfClose();
      }
    }
    start(metadata2, interceptingListener) {
      var _a, _b, _c, _d, _e, _f;
      const fullInterceptingListener = {
        onReceiveMetadata: (_b = (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(interceptingListener)) !== null && _b !== void 0 ? _b : ((metadata3) => {
        }),
        onReceiveMessage: (_d = (_c = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _c === void 0 ? void 0 : _c.bind(interceptingListener)) !== null && _d !== void 0 ? _d : ((message) => {
        }),
        onReceiveStatus: (_f = (_e = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _e === void 0 ? void 0 : _e.bind(interceptingListener)) !== null && _f !== void 0 ? _f : ((status) => {
        })
      };
      this.processingMetadata = true;
      this.requester.start(metadata2, fullInterceptingListener, (md, listener) => {
        var _a2, _b2, _c2;
        this.processingMetadata = false;
        let finalInterceptingListener;
        if ((0, call_interface_1.isInterceptingListener)(listener)) {
          finalInterceptingListener = listener;
        } else {
          const fullListener = {
            onReceiveMetadata: (_a2 = listener.onReceiveMetadata) !== null && _a2 !== void 0 ? _a2 : defaultListener.onReceiveMetadata,
            onReceiveMessage: (_b2 = listener.onReceiveMessage) !== null && _b2 !== void 0 ? _b2 : defaultListener.onReceiveMessage,
            onReceiveStatus: (_c2 = listener.onReceiveStatus) !== null && _c2 !== void 0 ? _c2 : defaultListener.onReceiveStatus
          };
          finalInterceptingListener = new call_interface_1.InterceptingListenerImpl(fullListener, fullInterceptingListener);
        }
        this.nextCall.start(md, finalInterceptingListener);
        this.processPendingMessage();
        this.processPendingHalfClose();
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
      this.processingMessage = true;
      this.requester.sendMessage(message, (finalMessage) => {
        this.processingMessage = false;
        if (this.processingMetadata) {
          this.pendingMessageContext = context;
          this.pendingMessage = message;
        } else {
          this.nextCall.sendMessageWithContext(context, finalMessage);
          this.processPendingHalfClose();
        }
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
      this.sendMessageWithContext({}, message);
    }
    startRead() {
      this.nextCall.startRead();
    }
    halfClose() {
      this.requester.halfClose(() => {
        if (this.processingMetadata || this.processingMessage) {
          this.pendingHalfClose = true;
        } else {
          this.nextCall.halfClose();
        }
      });
    }
  }
  clientInterceptors.InterceptingCall = InterceptingCall;
  function getCall(channel2, path, options) {
    var _a, _b;
    const deadline2 = (_a = options.deadline) !== null && _a !== void 0 ? _a : Infinity;
    const host = options.host;
    const parent = (_b = options.parent) !== null && _b !== void 0 ? _b : null;
    const propagateFlags = options.propagate_flags;
    const credentials = options.credentials;
    const call2 = channel2.createCall(path, deadline2, host, parent, propagateFlags);
    if (credentials) {
      call2.setCredentials(credentials);
    }
    return call2;
  }
  class BaseInterceptingCall {
    constructor(call2, methodDefinition) {
      this.call = call2;
      this.methodDefinition = methodDefinition;
    }
    cancelWithStatus(status, details) {
      this.call.cancelWithStatus(status, details);
    }
    getPeer() {
      return this.call.getPeer();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
      let serialized;
      try {
        serialized = this.methodDefinition.requestSerialize(message);
      } catch (e) {
        this.call.cancelWithStatus(constants_1.Status.INTERNAL, `Request message serialization failure: ${(0, error_1.getErrorMessage)(e)}`);
        return;
      }
      this.call.sendMessageWithContext(context, serialized);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
      this.sendMessageWithContext({}, message);
    }
    start(metadata2, interceptingListener) {
      let readError = null;
      this.call.start(metadata2, {
        onReceiveMetadata: (metadata3) => {
          var _a;
          (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, metadata3);
        },
        onReceiveMessage: (message) => {
          var _a;
          let deserialized;
          try {
            deserialized = this.methodDefinition.responseDeserialize(message);
          } catch (e) {
            readError = {
              code: constants_1.Status.INTERNAL,
              details: `Response message parsing error: ${(0, error_1.getErrorMessage)(e)}`,
              metadata: new metadata_1.Metadata()
            };
            this.call.cancelWithStatus(readError.code, readError.details);
            return;
          }
          (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, deserialized);
        },
        onReceiveStatus: (status) => {
          var _a, _b;
          if (readError) {
            (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, readError);
          } else {
            (_b = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _b === void 0 ? void 0 : _b.call(interceptingListener, status);
          }
        }
      });
    }
    startRead() {
      this.call.startRead();
    }
    halfClose() {
      this.call.halfClose();
    }
  }
  class BaseUnaryInterceptingCall extends BaseInterceptingCall {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(call2, methodDefinition) {
      super(call2, methodDefinition);
    }
    start(metadata2, listener) {
      var _a, _b;
      let receivedMessage = false;
      const wrapperListener = {
        onReceiveMetadata: (_b = (_a = listener === null || listener === void 0 ? void 0 : listener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(listener)) !== null && _b !== void 0 ? _b : ((metadata3) => {
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage: (message) => {
          var _a2;
          receivedMessage = true;
          (_a2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a2 === void 0 ? void 0 : _a2.call(listener, message);
        },
        onReceiveStatus: (status) => {
          var _a2, _b2;
          if (!receivedMessage) {
            (_a2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a2 === void 0 ? void 0 : _a2.call(listener, null);
          }
          (_b2 = listener === null || listener === void 0 ? void 0 : listener.onReceiveStatus) === null || _b2 === void 0 ? void 0 : _b2.call(listener, status);
        }
      };
      super.start(metadata2, wrapperListener);
      this.call.startRead();
    }
  }
  class BaseStreamingInterceptingCall extends BaseInterceptingCall {
  }
  function getBottomInterceptingCall(channel2, options, methodDefinition) {
    const call2 = getCall(channel2, methodDefinition.path, options);
    if (methodDefinition.responseStream) {
      return new BaseStreamingInterceptingCall(call2, methodDefinition);
    } else {
      return new BaseUnaryInterceptingCall(call2, methodDefinition);
    }
  }
  function getInterceptingCall(interceptorArgs, methodDefinition, options, channel2) {
    if (interceptorArgs.clientInterceptors.length > 0 && interceptorArgs.clientInterceptorProviders.length > 0) {
      throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
    }
    if (interceptorArgs.callInterceptors.length > 0 && interceptorArgs.callInterceptorProviders.length > 0) {
      throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as call options. Only one of these is allowed.");
    }
    let interceptors = [];
    if (interceptorArgs.callInterceptors.length > 0 || interceptorArgs.callInterceptorProviders.length > 0) {
      interceptors = [].concat(interceptorArgs.callInterceptors, interceptorArgs.callInterceptorProviders.map((provider) => provider(methodDefinition))).filter((interceptor) => interceptor);
    } else {
      interceptors = [].concat(interceptorArgs.clientInterceptors, interceptorArgs.clientInterceptorProviders.map((provider) => provider(methodDefinition))).filter((interceptor) => interceptor);
    }
    const interceptorOptions = Object.assign({}, options, {
      method_definition: methodDefinition
    });
    const getCall2 = interceptors.reduceRight((nextCall, nextInterceptor) => {
      return (currentOptions) => nextInterceptor(currentOptions, nextCall);
    }, (finalOptions) => getBottomInterceptingCall(channel2, finalOptions, methodDefinition));
    return getCall2(interceptorOptions);
  }
  return clientInterceptors;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  Object.defineProperty(client, "__esModule", { value: true });
  client.Client = void 0;
  const call_1 = requireCall();
  const channel_1 = requireChannel();
  const connectivity_state_1 = requireConnectivityState();
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const client_interceptors_1 = requireClientInterceptors();
  const CHANNEL_SYMBOL = /* @__PURE__ */ Symbol();
  const INTERCEPTOR_SYMBOL = /* @__PURE__ */ Symbol();
  const INTERCEPTOR_PROVIDER_SYMBOL = /* @__PURE__ */ Symbol();
  const CALL_INVOCATION_TRANSFORMER_SYMBOL = /* @__PURE__ */ Symbol();
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function getErrorStackString(error2) {
    return error2.stack.split("\n").slice(1).join("\n");
  }
  class Client {
    constructor(address, credentials, options = {}) {
      var _a, _b;
      options = Object.assign({}, options);
      this[INTERCEPTOR_SYMBOL] = (_a = options.interceptors) !== null && _a !== void 0 ? _a : [];
      delete options.interceptors;
      this[INTERCEPTOR_PROVIDER_SYMBOL] = (_b = options.interceptor_providers) !== null && _b !== void 0 ? _b : [];
      delete options.interceptor_providers;
      if (this[INTERCEPTOR_SYMBOL].length > 0 && this[INTERCEPTOR_PROVIDER_SYMBOL].length > 0) {
        throw new Error("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
      }
      this[CALL_INVOCATION_TRANSFORMER_SYMBOL] = options.callInvocationTransformer;
      delete options.callInvocationTransformer;
      if (options.channelOverride) {
        this[CHANNEL_SYMBOL] = options.channelOverride;
      } else if (options.channelFactoryOverride) {
        const channelFactoryOverride = options.channelFactoryOverride;
        delete options.channelFactoryOverride;
        this[CHANNEL_SYMBOL] = channelFactoryOverride(address, credentials, options);
      } else {
        this[CHANNEL_SYMBOL] = new channel_1.ChannelImplementation(address, credentials, options);
      }
    }
    close() {
      this[CHANNEL_SYMBOL].close();
    }
    getChannel() {
      return this[CHANNEL_SYMBOL];
    }
    waitForReady(deadline2, callback) {
      const checkState = (err) => {
        if (err) {
          callback(new Error("Failed to connect before the deadline"));
          return;
        }
        let newState;
        try {
          newState = this[CHANNEL_SYMBOL].getConnectivityState(true);
        } catch (e) {
          callback(new Error("The channel has been closed"));
          return;
        }
        if (newState === connectivity_state_1.ConnectivityState.READY) {
          callback();
        } else {
          try {
            this[CHANNEL_SYMBOL].watchConnectivityState(newState, deadline2, checkState);
          } catch (e) {
            callback(new Error("The channel has been closed"));
          }
        }
      };
      setImmediate(checkState);
    }
    checkOptionalUnaryResponseArguments(arg1, arg2, arg3) {
      if (isFunction(arg1)) {
        return { metadata: new metadata_1.Metadata(), options: {}, callback: arg1 };
      } else if (isFunction(arg2)) {
        if (arg1 instanceof metadata_1.Metadata) {
          return { metadata: arg1, options: {}, callback: arg2 };
        } else {
          return { metadata: new metadata_1.Metadata(), options: arg1, callback: arg2 };
        }
      } else {
        if (!(arg1 instanceof metadata_1.Metadata && arg2 instanceof Object && isFunction(arg3))) {
          throw new Error("Incorrect arguments passed");
        }
        return { metadata: arg1, options: arg2, callback: arg3 };
      }
    }
    makeUnaryRequest(method, serialize, deserialize, argument, metadata2, options, callback) {
      var _a, _b;
      const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata2, options, callback);
      const methodDefinition = {
        path: method,
        requestStream: false,
        responseStream: false,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        argument,
        metadata: checkedArguments.metadata,
        call: new call_1.ClientUnaryCallImpl(),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options,
        callback: checkedArguments.callback
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const emitter = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      emitter.call = call2;
      let responseMessage = null;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata: (metadata3) => {
          emitter.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          if (responseMessage !== null) {
            call2.cancelWithStatus(constants_1.Status.INTERNAL, "Too many responses received");
          }
          responseMessage = message;
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          if (status.code === constants_1.Status.OK) {
            if (responseMessage === null) {
              const callerStack = getErrorStackString(callerStackError);
              callProperties.callback((0, call_1.callErrorFromStatus)({
                code: constants_1.Status.INTERNAL,
                details: "No message received",
                metadata: status.metadata
              }, callerStack));
            } else {
              callProperties.callback(null, responseMessage);
            }
          } else {
            const callerStack = getErrorStackString(callerStackError);
            callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          emitter.emit("status", status);
        }
      });
      call2.sendMessage(argument);
      call2.halfClose();
      return emitter;
    }
    makeClientStreamRequest(method, serialize, deserialize, metadata2, options, callback) {
      var _a, _b;
      const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata2, options, callback);
      const methodDefinition = {
        path: method,
        requestStream: true,
        responseStream: false,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        metadata: checkedArguments.metadata,
        call: new call_1.ClientWritableStreamImpl(serialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options,
        callback: checkedArguments.callback
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const emitter = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      emitter.call = call2;
      let responseMessage = null;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata: (metadata3) => {
          emitter.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          if (responseMessage !== null) {
            call2.cancelWithStatus(constants_1.Status.INTERNAL, "Too many responses received");
          }
          responseMessage = message;
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          if (status.code === constants_1.Status.OK) {
            if (responseMessage === null) {
              const callerStack = getErrorStackString(callerStackError);
              callProperties.callback((0, call_1.callErrorFromStatus)({
                code: constants_1.Status.INTERNAL,
                details: "No message received",
                metadata: status.metadata
              }, callerStack));
            } else {
              callProperties.callback(null, responseMessage);
            }
          } else {
            const callerStack = getErrorStackString(callerStackError);
            callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          emitter.emit("status", status);
        }
      });
      return emitter;
    }
    checkMetadataAndOptions(arg1, arg2) {
      let metadata2;
      let options;
      if (arg1 instanceof metadata_1.Metadata) {
        metadata2 = arg1;
        if (arg2) {
          options = arg2;
        } else {
          options = {};
        }
      } else {
        if (arg1) {
          options = arg1;
        } else {
          options = {};
        }
        metadata2 = new metadata_1.Metadata();
      }
      return { metadata: metadata2, options };
    }
    makeServerStreamRequest(method, serialize, deserialize, argument, metadata2, options) {
      var _a, _b;
      const checkedArguments = this.checkMetadataAndOptions(metadata2, options);
      const methodDefinition = {
        path: method,
        requestStream: false,
        responseStream: true,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        argument,
        metadata: checkedArguments.metadata,
        call: new call_1.ClientReadableStreamImpl(deserialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const stream = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      stream.call = call2;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata(metadata3) {
          stream.emit("metadata", metadata3);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onReceiveMessage(message) {
          stream.push(message);
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          stream.push(null);
          if (status.code !== constants_1.Status.OK) {
            const callerStack = getErrorStackString(callerStackError);
            stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          stream.emit("status", status);
        }
      });
      call2.sendMessage(argument);
      call2.halfClose();
      return stream;
    }
    makeBidiStreamRequest(method, serialize, deserialize, metadata2, options) {
      var _a, _b;
      const checkedArguments = this.checkMetadataAndOptions(metadata2, options);
      const methodDefinition = {
        path: method,
        requestStream: true,
        responseStream: true,
        requestSerialize: serialize,
        responseDeserialize: deserialize
      };
      let callProperties = {
        metadata: checkedArguments.metadata,
        call: new call_1.ClientDuplexStreamImpl(serialize, deserialize),
        channel: this[CHANNEL_SYMBOL],
        methodDefinition,
        callOptions: checkedArguments.options
      };
      if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
        callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
      }
      const stream = callProperties.call;
      const interceptorArgs = {
        clientInterceptors: this[INTERCEPTOR_SYMBOL],
        clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
        callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
        callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
      };
      const call2 = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
      stream.call = call2;
      let receivedStatus = false;
      let callerStackError = new Error();
      call2.start(callProperties.metadata, {
        onReceiveMetadata(metadata3) {
          stream.emit("metadata", metadata3);
        },
        onReceiveMessage(message) {
          stream.push(message);
        },
        onReceiveStatus(status) {
          if (receivedStatus) {
            return;
          }
          receivedStatus = true;
          stream.push(null);
          if (status.code !== constants_1.Status.OK) {
            const callerStack = getErrorStackString(callerStackError);
            stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
          }
          callerStackError = null;
          stream.emit("status", status);
        }
      });
      return stream;
    }
  }
  client.Client = Client;
  return client;
}
var hasRequiredMakeClient;
function requireMakeClient() {
  if (hasRequiredMakeClient) return makeClient;
  hasRequiredMakeClient = 1;
  Object.defineProperty(makeClient, "__esModule", { value: true });
  makeClient.makeClientConstructor = makeClientConstructor;
  makeClient.loadPackageDefinition = loadPackageDefinition;
  const client_1 = requireClient();
  const requesterFuncs = {
    unary: client_1.Client.prototype.makeUnaryRequest,
    server_stream: client_1.Client.prototype.makeServerStreamRequest,
    client_stream: client_1.Client.prototype.makeClientStreamRequest,
    bidi: client_1.Client.prototype.makeBidiStreamRequest
  };
  function isPrototypePolluted(key) {
    return ["__proto__", "prototype", "constructor"].includes(key);
  }
  function makeClientConstructor(methods, serviceName, classOptions) {
    class ServiceClientImpl extends client_1.Client {
    }
    Object.keys(methods).forEach((name) => {
      if (isPrototypePolluted(name)) {
        return;
      }
      const attrs = methods[name];
      let methodType;
      if (typeof name === "string" && name.charAt(0) === "$") {
        throw new Error("Method names cannot start with $");
      }
      if (attrs.requestStream) {
        if (attrs.responseStream) {
          methodType = "bidi";
        } else {
          methodType = "client_stream";
        }
      } else {
        if (attrs.responseStream) {
          methodType = "server_stream";
        } else {
          methodType = "unary";
        }
      }
      const serialize = attrs.requestSerialize;
      const deserialize = attrs.responseDeserialize;
      const methodFunc = partial(requesterFuncs[methodType], attrs.path, serialize, deserialize);
      ServiceClientImpl.prototype[name] = methodFunc;
      Object.assign(ServiceClientImpl.prototype[name], attrs);
      if (attrs.originalName && !isPrototypePolluted(attrs.originalName)) {
        ServiceClientImpl.prototype[attrs.originalName] = ServiceClientImpl.prototype[name];
      }
    });
    ServiceClientImpl.service = methods;
    ServiceClientImpl.serviceName = serviceName;
    return ServiceClientImpl;
  }
  function partial(fn, path, serialize, deserialize) {
    return function(...args) {
      return fn.call(this, path, serialize, deserialize, ...args);
    };
  }
  function isProtobufTypeDefinition(obj) {
    return "format" in obj;
  }
  function loadPackageDefinition(packageDef) {
    const result = {};
    for (const serviceFqn in packageDef) {
      if (Object.prototype.hasOwnProperty.call(packageDef, serviceFqn)) {
        const service = packageDef[serviceFqn];
        const nameComponents = serviceFqn.split(".");
        if (nameComponents.some((comp) => isPrototypePolluted(comp))) {
          continue;
        }
        const serviceName = nameComponents[nameComponents.length - 1];
        let current = result;
        for (const packageName of nameComponents.slice(0, -1)) {
          if (!current[packageName]) {
            current[packageName] = {};
          }
          current = current[packageName];
        }
        if (isProtobufTypeDefinition(service)) {
          current[serviceName] = service;
        } else {
          current[serviceName] = makeClientConstructor(service, serviceName);
        }
      }
    }
    return result;
  }
  return makeClient;
}
var hasRequiredChannelz;
function requireChannelz() {
  if (hasRequiredChannelz) return channelz;
  hasRequiredChannelz = 1;
  Object.defineProperty(channelz, "__esModule", { value: true });
  channelz.ChannelzCallTracker = channelz.ChannelzChildrenTracker = channelz.ChannelzTrace = void 0;
  channelz.registerChannelzChannel = registerChannelzChannel;
  channelz.registerChannelzSubchannel = registerChannelzSubchannel;
  channelz.registerChannelzServer = registerChannelzServer;
  channelz.registerChannelzSocket = registerChannelzSocket;
  channelz.unregisterChannelzRef = unregisterChannelzRef;
  channelz.getChannelzHandlers = getChannelzHandlers;
  channelz.getChannelzServiceDefinition = getChannelzServiceDefinition;
  channelz.setup = setup;
  const net_1 = require$$0$1;
  const connectivity_state_1 = requireConnectivityState();
  const constants_1 = requireConstants();
  const subchannel_address_1 = requireSubchannelAddress();
  const admin_1 = requireAdmin();
  const make_client_1 = requireMakeClient();
  function channelRefToMessage(ref) {
    return {
      channel_id: ref.id,
      name: ref.name
    };
  }
  function subchannelRefToMessage(ref) {
    return {
      subchannel_id: ref.id,
      name: ref.name
    };
  }
  function serverRefToMessage(ref) {
    return {
      server_id: ref.id
    };
  }
  function socketRefToMessage(ref) {
    return {
      socket_id: ref.id,
      name: ref.name
    };
  }
  const TARGET_RETAINED_TRACES = 32;
  class ChannelzTrace {
    constructor() {
      this.events = [];
      this.eventsLogged = 0;
      this.creationTimestamp = /* @__PURE__ */ new Date();
    }
    addTrace(severity, description, child) {
      const timestamp = /* @__PURE__ */ new Date();
      this.events.push({
        description,
        severity,
        timestamp,
        childChannel: (child === null || child === void 0 ? void 0 : child.kind) === "channel" ? child : void 0,
        childSubchannel: (child === null || child === void 0 ? void 0 : child.kind) === "subchannel" ? child : void 0
      });
      if (this.events.length >= TARGET_RETAINED_TRACES * 2) {
        this.events = this.events.slice(TARGET_RETAINED_TRACES);
      }
      this.eventsLogged += 1;
    }
    getTraceMessage() {
      return {
        creation_timestamp: dateToProtoTimestamp(this.creationTimestamp),
        num_events_logged: this.eventsLogged,
        events: this.events.map((event) => {
          return {
            description: event.description,
            severity: event.severity,
            timestamp: dateToProtoTimestamp(event.timestamp),
            channel_ref: event.childChannel ? channelRefToMessage(event.childChannel) : null,
            subchannel_ref: event.childSubchannel ? subchannelRefToMessage(event.childSubchannel) : null
          };
        })
      };
    }
  }
  channelz.ChannelzTrace = ChannelzTrace;
  class ChannelzChildrenTracker {
    constructor() {
      this.channelChildren = /* @__PURE__ */ new Map();
      this.subchannelChildren = /* @__PURE__ */ new Map();
      this.socketChildren = /* @__PURE__ */ new Map();
    }
    refChild(child) {
      var _a, _b, _c;
      switch (child.kind) {
        case "channel": {
          const trackedChild = (_a = this.channelChildren.get(child.id)) !== null && _a !== void 0 ? _a : {
            ref: child,
            count: 0
          };
          trackedChild.count += 1;
          this.channelChildren.set(child.id, trackedChild);
          break;
        }
        case "subchannel": {
          const trackedChild = (_b = this.subchannelChildren.get(child.id)) !== null && _b !== void 0 ? _b : {
            ref: child,
            count: 0
          };
          trackedChild.count += 1;
          this.subchannelChildren.set(child.id, trackedChild);
          break;
        }
        case "socket": {
          const trackedChild = (_c = this.socketChildren.get(child.id)) !== null && _c !== void 0 ? _c : {
            ref: child,
            count: 0
          };
          trackedChild.count += 1;
          this.socketChildren.set(child.id, trackedChild);
          break;
        }
      }
    }
    unrefChild(child) {
      switch (child.kind) {
        case "channel": {
          const trackedChild = this.channelChildren.get(child.id);
          if (trackedChild !== void 0) {
            trackedChild.count -= 1;
            if (trackedChild.count === 0) {
              this.channelChildren.delete(child.id);
            } else {
              this.channelChildren.set(child.id, trackedChild);
            }
          }
          break;
        }
        case "subchannel": {
          const trackedChild = this.subchannelChildren.get(child.id);
          if (trackedChild !== void 0) {
            trackedChild.count -= 1;
            if (trackedChild.count === 0) {
              this.subchannelChildren.delete(child.id);
            } else {
              this.subchannelChildren.set(child.id, trackedChild);
            }
          }
          break;
        }
        case "socket": {
          const trackedChild = this.socketChildren.get(child.id);
          if (trackedChild !== void 0) {
            trackedChild.count -= 1;
            if (trackedChild.count === 0) {
              this.socketChildren.delete(child.id);
            } else {
              this.socketChildren.set(child.id, trackedChild);
            }
          }
          break;
        }
      }
    }
    getChildLists() {
      const channels2 = [];
      for (const { ref } of this.channelChildren.values()) {
        channels2.push(ref);
      }
      const subchannels2 = [];
      for (const { ref } of this.subchannelChildren.values()) {
        subchannels2.push(ref);
      }
      const sockets2 = [];
      for (const { ref } of this.socketChildren.values()) {
        sockets2.push(ref);
      }
      return { channels: channels2, subchannels: subchannels2, sockets: sockets2 };
    }
  }
  channelz.ChannelzChildrenTracker = ChannelzChildrenTracker;
  class ChannelzCallTracker {
    constructor() {
      this.callsStarted = 0;
      this.callsSucceeded = 0;
      this.callsFailed = 0;
      this.lastCallStartedTimestamp = null;
    }
    addCallStarted() {
      this.callsStarted += 1;
      this.lastCallStartedTimestamp = /* @__PURE__ */ new Date();
    }
    addCallSucceeded() {
      this.callsSucceeded += 1;
    }
    addCallFailed() {
      this.callsFailed += 1;
    }
  }
  channelz.ChannelzCallTracker = ChannelzCallTracker;
  let nextId = 1;
  function getNextId() {
    return nextId++;
  }
  const channels = [];
  const subchannels = [];
  const servers = [];
  const sockets = [];
  function registerChannelzChannel(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = { id, name, kind: "channel" };
    if (channelzEnabled) {
      channels[id] = { ref, getInfo };
    }
    return ref;
  }
  function registerChannelzSubchannel(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = { id, name, kind: "subchannel" };
    if (channelzEnabled) {
      subchannels[id] = { ref, getInfo };
    }
    return ref;
  }
  function registerChannelzServer(getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = { id, kind: "server" };
    if (channelzEnabled) {
      servers[id] = { ref, getInfo };
    }
    return ref;
  }
  function registerChannelzSocket(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = { id, name, kind: "socket" };
    if (channelzEnabled) {
      sockets[id] = { ref, getInfo };
    }
    return ref;
  }
  function unregisterChannelzRef(ref) {
    switch (ref.kind) {
      case "channel":
        delete channels[ref.id];
        return;
      case "subchannel":
        delete subchannels[ref.id];
        return;
      case "server":
        delete servers[ref.id];
        return;
      case "socket":
        delete sockets[ref.id];
        return;
    }
  }
  function parseIPv6Section(addressSection) {
    const numberValue = Number.parseInt(addressSection, 16);
    return [numberValue / 256 | 0, numberValue % 256];
  }
  function parseIPv6Chunk(addressChunk) {
    if (addressChunk === "") {
      return [];
    }
    const bytePairs = addressChunk.split(":").map((section) => parseIPv6Section(section));
    const result = [];
    return result.concat(...bytePairs);
  }
  function ipAddressStringToBuffer(ipAddress) {
    if ((0, net_1.isIPv4)(ipAddress)) {
      return Buffer.from(Uint8Array.from(ipAddress.split(".").map((segment) => Number.parseInt(segment))));
    } else if ((0, net_1.isIPv6)(ipAddress)) {
      let leftSection;
      let rightSection;
      const doubleColonIndex = ipAddress.indexOf("::");
      if (doubleColonIndex === -1) {
        leftSection = ipAddress;
        rightSection = "";
      } else {
        leftSection = ipAddress.substring(0, doubleColonIndex);
        rightSection = ipAddress.substring(doubleColonIndex + 2);
      }
      const leftBuffer = Buffer.from(parseIPv6Chunk(leftSection));
      const rightBuffer = Buffer.from(parseIPv6Chunk(rightSection));
      const middleBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
      return Buffer.concat([leftBuffer, middleBuffer, rightBuffer]);
    } else {
      return null;
    }
  }
  function connectivityStateToMessage(state) {
    switch (state) {
      case connectivity_state_1.ConnectivityState.CONNECTING:
        return {
          state: "CONNECTING"
        };
      case connectivity_state_1.ConnectivityState.IDLE:
        return {
          state: "IDLE"
        };
      case connectivity_state_1.ConnectivityState.READY:
        return {
          state: "READY"
        };
      case connectivity_state_1.ConnectivityState.SHUTDOWN:
        return {
          state: "SHUTDOWN"
        };
      case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
        return {
          state: "TRANSIENT_FAILURE"
        };
      default:
        return {
          state: "UNKNOWN"
        };
    }
  }
  function dateToProtoTimestamp(date) {
    if (!date) {
      return null;
    }
    const millisSinceEpoch = date.getTime();
    return {
      seconds: millisSinceEpoch / 1e3 | 0,
      nanos: millisSinceEpoch % 1e3 * 1e6
    };
  }
  function getChannelMessage(channelEntry) {
    const resolvedInfo = channelEntry.getInfo();
    return {
      ref: channelRefToMessage(channelEntry.ref),
      data: {
        target: resolvedInfo.target,
        state: connectivityStateToMessage(resolvedInfo.state),
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      channel_ref: resolvedInfo.children.channels.map((ref) => channelRefToMessage(ref)),
      subchannel_ref: resolvedInfo.children.subchannels.map((ref) => subchannelRefToMessage(ref))
    };
  }
  function GetChannel(call2, callback) {
    const channelId = Number.parseInt(call2.request.channel_id);
    const channelEntry = channels[channelId];
    if (channelEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No channel data found for id " + channelId
      });
      return;
    }
    callback(null, { channel: getChannelMessage(channelEntry) });
  }
  function GetTopChannels(call2, callback) {
    const maxResults = Number.parseInt(call2.request.max_results);
    const resultList = [];
    let i = Number.parseInt(call2.request.start_channel_id);
    for (; i < channels.length; i++) {
      const channelEntry = channels[i];
      if (channelEntry === void 0) {
        continue;
      }
      resultList.push(getChannelMessage(channelEntry));
      if (resultList.length >= maxResults) {
        break;
      }
    }
    callback(null, {
      channel: resultList,
      end: i >= servers.length
    });
  }
  function getServerMessage(serverEntry) {
    const resolvedInfo = serverEntry.getInfo();
    return {
      ref: serverRefToMessage(serverEntry.ref),
      data: {
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      listen_socket: resolvedInfo.listenerChildren.sockets.map((ref) => socketRefToMessage(ref))
    };
  }
  function GetServer(call2, callback) {
    const serverId = Number.parseInt(call2.request.server_id);
    const serverEntry = servers[serverId];
    if (serverEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No server data found for id " + serverId
      });
      return;
    }
    callback(null, { server: getServerMessage(serverEntry) });
  }
  function GetServers(call2, callback) {
    const maxResults = Number.parseInt(call2.request.max_results);
    const resultList = [];
    let i = Number.parseInt(call2.request.start_server_id);
    for (; i < servers.length; i++) {
      const serverEntry = servers[i];
      if (serverEntry === void 0) {
        continue;
      }
      resultList.push(getServerMessage(serverEntry));
      if (resultList.length >= maxResults) {
        break;
      }
    }
    callback(null, {
      server: resultList,
      end: i >= servers.length
    });
  }
  function GetSubchannel(call2, callback) {
    const subchannelId = Number.parseInt(call2.request.subchannel_id);
    const subchannelEntry = subchannels[subchannelId];
    if (subchannelEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No subchannel data found for id " + subchannelId
      });
      return;
    }
    const resolvedInfo = subchannelEntry.getInfo();
    const subchannelMessage = {
      ref: subchannelRefToMessage(subchannelEntry.ref),
      data: {
        target: resolvedInfo.target,
        state: connectivityStateToMessage(resolvedInfo.state),
        calls_started: resolvedInfo.callTracker.callsStarted,
        calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
        calls_failed: resolvedInfo.callTracker.callsFailed,
        last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
        trace: resolvedInfo.trace.getTraceMessage()
      },
      socket_ref: resolvedInfo.children.sockets.map((ref) => socketRefToMessage(ref))
    };
    callback(null, { subchannel: subchannelMessage });
  }
  function subchannelAddressToAddressMessage(subchannelAddress2) {
    var _a;
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(subchannelAddress2)) {
      return {
        address: "tcpip_address",
        tcpip_address: {
          ip_address: (_a = ipAddressStringToBuffer(subchannelAddress2.host)) !== null && _a !== void 0 ? _a : void 0,
          port: subchannelAddress2.port
        }
      };
    } else {
      return {
        address: "uds_address",
        uds_address: {
          filename: subchannelAddress2.path
        }
      };
    }
  }
  function GetSocket(call2, callback) {
    var _a, _b, _c, _d, _e;
    const socketId = Number.parseInt(call2.request.socket_id);
    const socketEntry = sockets[socketId];
    if (socketEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No socket data found for id " + socketId
      });
      return;
    }
    const resolvedInfo = socketEntry.getInfo();
    const securityMessage = resolvedInfo.security ? {
      model: "tls",
      tls: {
        cipher_suite: resolvedInfo.security.cipherSuiteStandardName ? "standard_name" : "other_name",
        standard_name: (_a = resolvedInfo.security.cipherSuiteStandardName) !== null && _a !== void 0 ? _a : void 0,
        other_name: (_b = resolvedInfo.security.cipherSuiteOtherName) !== null && _b !== void 0 ? _b : void 0,
        local_certificate: (_c = resolvedInfo.security.localCertificate) !== null && _c !== void 0 ? _c : void 0,
        remote_certificate: (_d = resolvedInfo.security.remoteCertificate) !== null && _d !== void 0 ? _d : void 0
      }
    } : null;
    const socketMessage = {
      ref: socketRefToMessage(socketEntry.ref),
      local: resolvedInfo.localAddress ? subchannelAddressToAddressMessage(resolvedInfo.localAddress) : null,
      remote: resolvedInfo.remoteAddress ? subchannelAddressToAddressMessage(resolvedInfo.remoteAddress) : null,
      remote_name: (_e = resolvedInfo.remoteName) !== null && _e !== void 0 ? _e : void 0,
      security: securityMessage,
      data: {
        keep_alives_sent: resolvedInfo.keepAlivesSent,
        streams_started: resolvedInfo.streamsStarted,
        streams_succeeded: resolvedInfo.streamsSucceeded,
        streams_failed: resolvedInfo.streamsFailed,
        last_local_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastLocalStreamCreatedTimestamp),
        last_remote_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastRemoteStreamCreatedTimestamp),
        messages_received: resolvedInfo.messagesReceived,
        messages_sent: resolvedInfo.messagesSent,
        last_message_received_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageReceivedTimestamp),
        last_message_sent_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageSentTimestamp),
        local_flow_control_window: resolvedInfo.localFlowControlWindow ? { value: resolvedInfo.localFlowControlWindow } : null,
        remote_flow_control_window: resolvedInfo.remoteFlowControlWindow ? { value: resolvedInfo.remoteFlowControlWindow } : null
      }
    };
    callback(null, { socket: socketMessage });
  }
  function GetServerSockets(call2, callback) {
    const serverId = Number.parseInt(call2.request.server_id);
    const serverEntry = servers[serverId];
    if (serverEntry === void 0) {
      callback({
        code: constants_1.Status.NOT_FOUND,
        details: "No server data found for id " + serverId
      });
      return;
    }
    const startId = Number.parseInt(call2.request.start_socket_id);
    const maxResults = Number.parseInt(call2.request.max_results);
    const resolvedInfo = serverEntry.getInfo();
    const allSockets = resolvedInfo.sessionChildren.sockets.sort((ref1, ref2) => ref1.id - ref2.id);
    const resultList = [];
    let i = 0;
    for (; i < allSockets.length; i++) {
      if (allSockets[i].id >= startId) {
        resultList.push(socketRefToMessage(allSockets[i]));
        if (resultList.length >= maxResults) {
          break;
        }
      }
    }
    callback(null, {
      socket_ref: resultList,
      end: i >= allSockets.length
    });
  }
  function getChannelzHandlers() {
    return {
      GetChannel,
      GetTopChannels,
      GetServer,
      GetServers,
      GetSubchannel,
      GetSocket,
      GetServerSockets
    };
  }
  let loadedChannelzDefinition = null;
  function getChannelzServiceDefinition() {
    if (loadedChannelzDefinition) {
      return loadedChannelzDefinition;
    }
    const loaderLoadSync = requireSrc$3().loadSync;
    const loadedProto = loaderLoadSync("channelz.proto", {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [`${__dirname}/../../proto`]
    });
    const channelzGrpcObject = (0, make_client_1.loadPackageDefinition)(loadedProto);
    loadedChannelzDefinition = channelzGrpcObject.grpc.channelz.v1.Channelz.service;
    return loadedChannelzDefinition;
  }
  function setup() {
    (0, admin_1.registerAdminService)(getChannelzServiceDefinition, getChannelzHandlers);
  }
  return channelz;
}
var hasRequiredSubchannel;
function requireSubchannel() {
  if (hasRequiredSubchannel) return subchannel;
  hasRequiredSubchannel = 1;
  Object.defineProperty(subchannel, "__esModule", { value: true });
  subchannel.Subchannel = void 0;
  const connectivity_state_1 = requireConnectivityState();
  const backoff_timeout_1 = requireBackoffTimeout();
  const logging2 = requireLogging();
  const constants_1 = requireConstants();
  const uri_parser_1 = requireUriParser();
  const subchannel_address_1 = requireSubchannelAddress();
  const channelz_1 = requireChannelz();
  const TRACER_NAME = "subchannel";
  const KEEPALIVE_MAX_TIME_MS = 2147483647;
  class Subchannel {
    /**
     * A class representing a connection to a single backend.
     * @param channelTarget The target string for the channel as a whole
     * @param subchannelAddress The address for the backend that this subchannel
     *     will connect to
     * @param options The channel options, plus any specific subchannel options
     *     for this subchannel
     * @param credentials The channel credentials used to establish this
     *     connection
     */
    constructor(channelTarget, subchannelAddress2, options, credentials, connector) {
      var _a;
      this.channelTarget = channelTarget;
      this.subchannelAddress = subchannelAddress2;
      this.options = options;
      this.credentials = credentials;
      this.connector = connector;
      this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
      this.transport = null;
      this.continueConnecting = false;
      this.stateListeners = /* @__PURE__ */ new Set();
      this.refcount = 0;
      this.channelzEnabled = true;
      this.callTracker = new channelz_1.ChannelzCallTracker();
      this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
      this.streamTracker = new channelz_1.ChannelzCallTracker();
      const backoffOptions = {
        initialDelay: options["grpc.initial_reconnect_backoff_ms"],
        maxDelay: options["grpc.max_reconnect_backoff_ms"]
      };
      this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(() => {
        this.handleBackoffTimer();
      }, backoffOptions);
      this.backoffTimeout.unref();
      this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress2);
      this.keepaliveTime = (_a = options["grpc.keepalive_time_ms"]) !== null && _a !== void 0 ? _a : -1;
      if (options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
      }
      this.channelzTrace = new channelz_1.ChannelzTrace();
      this.channelzRef = (0, channelz_1.registerChannelzSubchannel)(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled);
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Subchannel created");
      }
      this.trace("Subchannel constructed with options " + JSON.stringify(options, void 0, 2));
    }
    getChannelzInfo() {
      return {
        state: this.connectivityState,
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        children: this.childrenTracker.getChildLists(),
        target: this.subchannelAddressString
      };
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    refTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "subchannel_refcount", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    handleBackoffTimer() {
      if (this.continueConnecting) {
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.CONNECTING);
      } else {
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.IDLE);
      }
    }
    /**
     * Start a backoff timer with the current nextBackoff timeout
     */
    startBackoff() {
      this.backoffTimeout.runOnce();
    }
    stopBackoff() {
      this.backoffTimeout.stop();
      this.backoffTimeout.reset();
    }
    startConnectingInternal() {
      let options = this.options;
      if (options["grpc.keepalive_time_ms"]) {
        const adjustedKeepaliveTime = Math.min(this.keepaliveTime, KEEPALIVE_MAX_TIME_MS);
        options = Object.assign(Object.assign({}, options), { "grpc.keepalive_time_ms": adjustedKeepaliveTime });
      }
      this.connector.connect(this.subchannelAddress, this.credentials, options).then((transport2) => {
        if (this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING], connectivity_state_1.ConnectivityState.READY)) {
          this.transport = transport2;
          if (this.channelzEnabled) {
            this.childrenTracker.refChild(transport2.getChannelzRef());
          }
          transport2.addDisconnectListener((tooManyPings) => {
            this.transitionToState([connectivity_state_1.ConnectivityState.READY], connectivity_state_1.ConnectivityState.IDLE);
            if (tooManyPings && this.keepaliveTime > 0) {
              this.keepaliveTime *= 2;
              logging2.log(constants_1.LogVerbosity.ERROR, `Connection to ${(0, uri_parser_1.uriToString)(this.channelTarget)} at ${this.subchannelAddressString} rejected by server because of excess pings. Increasing ping interval to ${this.keepaliveTime} ms`);
            }
          });
        } else {
          transport2.shutdown();
        }
      }, (error2) => {
        this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING], connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, `${error2}`);
      });
    }
    /**
     * Initiate a state transition from any element of oldStates to the new
     * state. If the current connectivityState is not in oldStates, do nothing.
     * @param oldStates The set of states to transition from
     * @param newState The state to transition to
     * @returns True if the state changed, false otherwise
     */
    transitionToState(oldStates, newState, errorMessage) {
      var _a, _b;
      if (oldStates.indexOf(this.connectivityState) === -1) {
        return false;
      }
      this.trace(connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Connectivity state change to " + connectivity_state_1.ConnectivityState[newState]);
      }
      const previousState = this.connectivityState;
      this.connectivityState = newState;
      switch (newState) {
        case connectivity_state_1.ConnectivityState.READY:
          this.stopBackoff();
          break;
        case connectivity_state_1.ConnectivityState.CONNECTING:
          this.startBackoff();
          this.startConnectingInternal();
          this.continueConnecting = false;
          break;
        case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
          if (this.channelzEnabled && this.transport) {
            this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          }
          (_a = this.transport) === null || _a === void 0 ? void 0 : _a.shutdown();
          this.transport = null;
          if (!this.backoffTimeout.isRunning()) {
            process.nextTick(() => {
              this.handleBackoffTimer();
            });
          }
          break;
        case connectivity_state_1.ConnectivityState.IDLE:
          if (this.channelzEnabled && this.transport) {
            this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          }
          (_b = this.transport) === null || _b === void 0 ? void 0 : _b.shutdown();
          this.transport = null;
          break;
        default:
          throw new Error(`Invalid state: unknown ConnectivityState ${newState}`);
      }
      for (const listener of this.stateListeners) {
        listener(this, previousState, newState, this.keepaliveTime, errorMessage);
      }
      return true;
    }
    ref() {
      this.refTrace("refcount " + this.refcount + " -> " + (this.refcount + 1));
      this.refcount += 1;
    }
    unref() {
      this.refTrace("refcount " + this.refcount + " -> " + (this.refcount - 1));
      this.refcount -= 1;
      if (this.refcount === 0) {
        if (this.channelzEnabled) {
          this.channelzTrace.addTrace("CT_INFO", "Shutting down");
        }
        if (this.channelzEnabled) {
          (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        }
        process.nextTick(() => {
          this.transitionToState([connectivity_state_1.ConnectivityState.CONNECTING, connectivity_state_1.ConnectivityState.READY], connectivity_state_1.ConnectivityState.IDLE);
        });
      }
    }
    unrefIfOneRef() {
      if (this.refcount === 1) {
        this.unref();
        return true;
      }
      return false;
    }
    createCall(metadata2, host, method, listener) {
      if (!this.transport) {
        throw new Error("Cannot create call, subchannel not READY");
      }
      let statsTracker;
      if (this.channelzEnabled) {
        this.callTracker.addCallStarted();
        this.streamTracker.addCallStarted();
        statsTracker = {
          onCallEnd: (status) => {
            if (status.code === constants_1.Status.OK) {
              this.callTracker.addCallSucceeded();
            } else {
              this.callTracker.addCallFailed();
            }
          }
        };
      } else {
        statsTracker = {};
      }
      return this.transport.createCall(metadata2, host, method, listener, statsTracker);
    }
    /**
     * If the subchannel is currently IDLE, start connecting and switch to the
     * CONNECTING state. If the subchannel is current in TRANSIENT_FAILURE,
     * the next time it would transition to IDLE, start connecting again instead.
     * Otherwise, do nothing.
     */
    startConnecting() {
      process.nextTick(() => {
        if (!this.transitionToState([connectivity_state_1.ConnectivityState.IDLE], connectivity_state_1.ConnectivityState.CONNECTING)) {
          if (this.connectivityState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            this.continueConnecting = true;
          }
        }
      });
    }
    /**
     * Get the subchannel's current connectivity state.
     */
    getConnectivityState() {
      return this.connectivityState;
    }
    /**
     * Add a listener function to be called whenever the subchannel's
     * connectivity state changes.
     * @param listener
     */
    addConnectivityStateListener(listener) {
      this.stateListeners.add(listener);
    }
    /**
     * Remove a listener previously added with `addConnectivityStateListener`
     * @param listener A reference to a function previously passed to
     *     `addConnectivityStateListener`
     */
    removeConnectivityStateListener(listener) {
      this.stateListeners.delete(listener);
    }
    /**
     * Reset the backoff timeout, and immediately start connecting if in backoff.
     */
    resetBackoff() {
      process.nextTick(() => {
        this.backoffTimeout.reset();
        this.transitionToState([connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE], connectivity_state_1.ConnectivityState.CONNECTING);
      });
    }
    getAddress() {
      return this.subchannelAddressString;
    }
    getChannelzRef() {
      return this.channelzRef;
    }
    getRealSubchannel() {
      return this;
    }
    realSubchannelEquals(other) {
      return other.getRealSubchannel() === this;
    }
    throttleKeepalive(newKeepaliveTime) {
      if (newKeepaliveTime > this.keepaliveTime) {
        this.keepaliveTime = newKeepaliveTime;
      }
    }
  }
  subchannel.Subchannel = Subchannel;
  return subchannel;
}
var transport = {};
var http_proxy = {};
var resolverDns = {};
var hasRequiredResolverDns;
function requireResolverDns() {
  if (hasRequiredResolverDns) return resolverDns;
  hasRequiredResolverDns = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_PORT = void 0;
    exports.setup = setup;
    const resolver_1 = requireResolver();
    const dns = require$$1$4;
    const util = require$$0$6;
    const service_config_1 = requireServiceConfig();
    const constants_1 = requireConstants();
    const metadata_1 = requireMetadata();
    const logging2 = requireLogging();
    const constants_2 = requireConstants();
    const uri_parser_1 = requireUriParser();
    const net_1 = require$$0$1;
    const backoff_timeout_1 = requireBackoffTimeout();
    const TRACER_NAME = "dns_resolver";
    function trace(text) {
      logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
    }
    exports.DEFAULT_PORT = 443;
    const DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS = 3e4;
    const resolveTxtPromise = util.promisify(dns.resolveTxt);
    const dnsLookupPromise = util.promisify(dns.lookup);
    function mergeArrays(...arrays) {
      const result = [];
      for (let i = 0; i < Math.max.apply(null, arrays.map((array) => array.length)); i++) {
        for (const array of arrays) {
          if (i < array.length) {
            result.push(array[i]);
          }
        }
      }
      return result;
    }
    class DnsResolver {
      constructor(target, listener, channelOptions2) {
        var _a, _b, _c;
        this.target = target;
        this.listener = listener;
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfig = null;
        this.latestServiceConfigError = null;
        this.continueResolving = false;
        this.isNextResolutionTimerRunning = false;
        this.isServiceConfigEnabled = true;
        this.returnedIpResult = false;
        trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
        const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
        if (hostPort === null) {
          this.ipResult = null;
          this.dnsHostname = null;
          this.port = null;
        } else {
          if ((0, net_1.isIPv4)(hostPort.host) || (0, net_1.isIPv6)(hostPort.host)) {
            this.ipResult = [
              {
                host: hostPort.host,
                port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : exports.DEFAULT_PORT
              }
            ];
            this.dnsHostname = null;
            this.port = null;
          } else {
            this.ipResult = null;
            this.dnsHostname = hostPort.host;
            this.port = (_b = hostPort.port) !== null && _b !== void 0 ? _b : exports.DEFAULT_PORT;
          }
        }
        this.percentage = Math.random() * 100;
        if (channelOptions2["grpc.service_config_disable_resolution"] === 1) {
          this.isServiceConfigEnabled = false;
        }
        this.defaultResolutionError = {
          code: constants_1.Status.UNAVAILABLE,
          details: `Name resolution failed for target ${(0, uri_parser_1.uriToString)(this.target)}`,
          metadata: new metadata_1.Metadata()
        };
        const backoffOptions = {
          initialDelay: channelOptions2["grpc.initial_reconnect_backoff_ms"],
          maxDelay: channelOptions2["grpc.max_reconnect_backoff_ms"]
        };
        this.backoff = new backoff_timeout_1.BackoffTimeout(() => {
          if (this.continueResolving) {
            this.startResolutionWithBackoff();
          }
        }, backoffOptions);
        this.backoff.unref();
        this.minTimeBetweenResolutionsMs = (_c = channelOptions2["grpc.dns_min_time_between_resolutions_ms"]) !== null && _c !== void 0 ? _c : DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS;
        this.nextResolutionTimer = setTimeout(() => {
        }, 0);
        clearTimeout(this.nextResolutionTimer);
      }
      /**
       * If the target is an IP address, just provide that address as a result.
       * Otherwise, initiate A, AAAA, and TXT lookups
       */
      startResolution() {
        if (this.ipResult !== null) {
          if (!this.returnedIpResult) {
            trace("Returning IP address for target " + (0, uri_parser_1.uriToString)(this.target));
            setImmediate(() => {
              this.listener.onSuccessfulResolution(this.ipResult, null, null, null, {});
            });
            this.returnedIpResult = true;
          }
          this.backoff.stop();
          this.backoff.reset();
          this.stopNextResolutionTimer();
          return;
        }
        if (this.dnsHostname === null) {
          trace("Failed to parse DNS address " + (0, uri_parser_1.uriToString)(this.target));
          setImmediate(() => {
            this.listener.onError({
              code: constants_1.Status.UNAVAILABLE,
              details: `Failed to parse DNS address ${(0, uri_parser_1.uriToString)(this.target)}`,
              metadata: new metadata_1.Metadata()
            });
          });
          this.stopNextResolutionTimer();
        } else {
          if (this.pendingLookupPromise !== null) {
            return;
          }
          trace("Looking up DNS hostname " + this.dnsHostname);
          this.latestLookupResult = null;
          const hostname = this.dnsHostname;
          this.pendingLookupPromise = dnsLookupPromise(hostname, { all: true });
          this.pendingLookupPromise.then((addressList) => {
            if (this.pendingLookupPromise === null) {
              return;
            }
            this.pendingLookupPromise = null;
            this.backoff.reset();
            this.backoff.stop();
            const ip4Addresses = addressList.filter((addr) => addr.family === 4);
            const ip6Addresses = addressList.filter((addr) => addr.family === 6);
            this.latestLookupResult = mergeArrays(ip6Addresses, ip4Addresses).map((addr) => ({ host: addr.address, port: +this.port }));
            const allAddressesString = "[" + this.latestLookupResult.map((addr) => addr.host + ":" + addr.port).join(",") + "]";
            trace("Resolved addresses for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + allAddressesString);
            if (this.latestLookupResult.length === 0) {
              this.listener.onError(this.defaultResolutionError);
              return;
            }
            this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
          }, (err) => {
            if (this.pendingLookupPromise === null) {
              return;
            }
            trace("Resolution error for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + err.message);
            this.pendingLookupPromise = null;
            this.stopNextResolutionTimer();
            this.listener.onError(this.defaultResolutionError);
          });
          if (this.isServiceConfigEnabled && this.pendingTxtPromise === null) {
            this.pendingTxtPromise = resolveTxtPromise(hostname);
            this.pendingTxtPromise.then((txtRecord) => {
              if (this.pendingTxtPromise === null) {
                return;
              }
              this.pendingTxtPromise = null;
              try {
                this.latestServiceConfig = (0, service_config_1.extractAndSelectServiceConfig)(txtRecord, this.percentage);
              } catch (err) {
                this.latestServiceConfigError = {
                  code: constants_1.Status.UNAVAILABLE,
                  details: `Parsing service config failed with error ${err.message}`,
                  metadata: new metadata_1.Metadata()
                };
              }
              if (this.latestLookupResult !== null) {
                this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
              }
            }, (err) => {
            });
          }
        }
      }
      startNextResolutionTimer() {
        var _a, _b;
        clearTimeout(this.nextResolutionTimer);
        this.nextResolutionTimer = (_b = (_a = setTimeout(() => {
          this.stopNextResolutionTimer();
          if (this.continueResolving) {
            this.startResolutionWithBackoff();
          }
        }, this.minTimeBetweenResolutionsMs)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.isNextResolutionTimerRunning = true;
      }
      stopNextResolutionTimer() {
        clearTimeout(this.nextResolutionTimer);
        this.isNextResolutionTimerRunning = false;
      }
      startResolutionWithBackoff() {
        if (this.pendingLookupPromise === null) {
          this.continueResolving = false;
          this.backoff.runOnce();
          this.startNextResolutionTimer();
          this.startResolution();
        }
      }
      updateResolution() {
        if (this.pendingLookupPromise === null) {
          if (this.isNextResolutionTimerRunning || this.backoff.isRunning()) {
            if (this.isNextResolutionTimerRunning) {
              trace('resolution update delayed by "min time between resolutions" rate limit');
            } else {
              trace("resolution update delayed by backoff timer until " + this.backoff.getEndTime().toISOString());
            }
            this.continueResolving = true;
          } else {
            this.startResolutionWithBackoff();
          }
        }
      }
      /**
       * Reset the resolver to the same state it had when it was created. In-flight
       * DNS requests cannot be cancelled, but they are discarded and their results
       * will be ignored.
       */
      destroy() {
        this.continueResolving = false;
        this.backoff.reset();
        this.backoff.stop();
        this.stopNextResolutionTimer();
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfig = null;
        this.latestServiceConfigError = null;
        this.returnedIpResult = false;
      }
      /**
       * Get the default authority for the given target. For IP targets, that is
       * the IP address. For DNS targets, it is the hostname.
       * @param target
       */
      static getDefaultAuthority(target) {
        return target.path;
      }
    }
    function setup() {
      (0, resolver_1.registerResolver)("dns", DnsResolver);
      (0, resolver_1.registerDefaultScheme)("dns");
    }
  })(resolverDns);
  return resolverDns;
}
var hasRequiredHttp_proxy;
function requireHttp_proxy() {
  if (hasRequiredHttp_proxy) return http_proxy;
  hasRequiredHttp_proxy = 1;
  Object.defineProperty(http_proxy, "__esModule", { value: true });
  http_proxy.mapProxyName = mapProxyName;
  http_proxy.getProxiedConnection = getProxiedConnection;
  const logging_1 = requireLogging();
  const constants_1 = requireConstants();
  const resolver_1 = requireResolver();
  const http = require$$0$4;
  const tls = require$$1$1;
  const logging2 = requireLogging();
  const subchannel_address_1 = requireSubchannelAddress();
  const uri_parser_1 = requireUriParser();
  const url_1 = Url;
  const resolver_dns_1 = requireResolverDns();
  const TRACER_NAME = "proxy";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  function getProxyInfo() {
    let proxyEnv = "";
    let envVar = "";
    if (process.env.grpc_proxy) {
      envVar = "grpc_proxy";
      proxyEnv = process.env.grpc_proxy;
    } else if (process.env.https_proxy) {
      envVar = "https_proxy";
      proxyEnv = process.env.https_proxy;
    } else if (process.env.http_proxy) {
      envVar = "http_proxy";
      proxyEnv = process.env.http_proxy;
    } else {
      return {};
    }
    let proxyUrl;
    try {
      proxyUrl = new url_1.URL(proxyEnv);
    } catch (e) {
      (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `cannot parse value of "${envVar}" env var`);
      return {};
    }
    if (proxyUrl.protocol !== "http:") {
      (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `"${proxyUrl.protocol}" scheme not supported in proxy URI`);
      return {};
    }
    let userCred = null;
    if (proxyUrl.username) {
      if (proxyUrl.password) {
        (0, logging_1.log)(constants_1.LogVerbosity.INFO, "userinfo found in proxy URI");
        userCred = `${proxyUrl.username}:${proxyUrl.password}`;
      } else {
        userCred = proxyUrl.username;
      }
    }
    const hostname = proxyUrl.hostname;
    let port = proxyUrl.port;
    if (port === "") {
      port = "80";
    }
    const result = {
      address: `${hostname}:${port}`
    };
    if (userCred) {
      result.creds = userCred;
    }
    trace("Proxy server " + result.address + " set by environment variable " + envVar);
    return result;
  }
  function getNoProxyHostList() {
    let noProxyStr = process.env.no_grpc_proxy;
    let envVar = "no_grpc_proxy";
    if (!noProxyStr) {
      noProxyStr = process.env.no_proxy;
      envVar = "no_proxy";
    }
    if (noProxyStr) {
      trace("No proxy server list set by environment variable " + envVar);
      return noProxyStr.split(",");
    } else {
      return [];
    }
  }
  function mapProxyName(target, options) {
    var _a;
    const noProxyResult = {
      target,
      extraOptions: {}
    };
    if (((_a = options["grpc.enable_http_proxy"]) !== null && _a !== void 0 ? _a : 1) === 0) {
      return noProxyResult;
    }
    if (target.scheme === "unix") {
      return noProxyResult;
    }
    const proxyInfo = getProxyInfo();
    if (!proxyInfo.address) {
      return noProxyResult;
    }
    const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
    if (!hostPort) {
      return noProxyResult;
    }
    const serverHost = hostPort.host;
    for (const host of getNoProxyHostList()) {
      if (host === serverHost) {
        trace("Not using proxy for target in no_proxy list: " + (0, uri_parser_1.uriToString)(target));
        return noProxyResult;
      }
    }
    const extraOptions = {
      "grpc.http_connect_target": (0, uri_parser_1.uriToString)(target)
    };
    if (proxyInfo.creds) {
      extraOptions["grpc.http_connect_creds"] = proxyInfo.creds;
    }
    return {
      target: {
        scheme: "dns",
        path: proxyInfo.address
      },
      extraOptions
    };
  }
  function getProxiedConnection(address, channelOptions2, connectionOptions) {
    var _a;
    if (!("grpc.http_connect_target" in channelOptions2)) {
      return Promise.resolve({});
    }
    const realTarget = channelOptions2["grpc.http_connect_target"];
    const parsedTarget = (0, uri_parser_1.parseUri)(realTarget);
    if (parsedTarget === null) {
      return Promise.resolve({});
    }
    const splitHostPost = (0, uri_parser_1.splitHostPort)(parsedTarget.path);
    if (splitHostPost === null) {
      return Promise.resolve({});
    }
    const hostPort = `${splitHostPost.host}:${(_a = splitHostPost.port) !== null && _a !== void 0 ? _a : resolver_dns_1.DEFAULT_PORT}`;
    const options = {
      method: "CONNECT",
      path: hostPort
    };
    const headers = {
      Host: hostPort
    };
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(address)) {
      options.host = address.host;
      options.port = address.port;
    } else {
      options.socketPath = address.path;
    }
    if ("grpc.http_connect_creds" in channelOptions2) {
      headers["Proxy-Authorization"] = "Basic " + Buffer.from(channelOptions2["grpc.http_connect_creds"]).toString("base64");
    }
    options.headers = headers;
    const proxyAddressString = (0, subchannel_address_1.subchannelAddressToString)(address);
    trace("Using proxy " + proxyAddressString + " to connect to " + options.path);
    return new Promise((resolve, reject) => {
      const request = http.request(options);
      request.once("connect", (res, socket, head) => {
        var _a2;
        request.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode === 200) {
          trace("Successfully connected to " + options.path + " through proxy " + proxyAddressString);
          if ("secureContext" in connectionOptions) {
            const targetPath = (0, resolver_1.getDefaultAuthority)(parsedTarget);
            const hostPort2 = (0, uri_parser_1.splitHostPort)(targetPath);
            const remoteHost = (_a2 = hostPort2 === null || hostPort2 === void 0 ? void 0 : hostPort2.host) !== null && _a2 !== void 0 ? _a2 : targetPath;
            const cts = tls.connect(Object.assign({ host: remoteHost, servername: remoteHost, socket }, connectionOptions), () => {
              trace("Successfully established a TLS connection to " + options.path + " through proxy " + proxyAddressString);
              resolve({ socket: cts, realTarget: parsedTarget });
            });
            cts.on("error", (error2) => {
              trace("Failed to establish a TLS connection to " + options.path + " through proxy " + proxyAddressString + " with error " + error2.message);
              reject();
            });
          } else {
            trace("Successfully established a plaintext connection to " + options.path + " through proxy " + proxyAddressString);
            resolve({
              socket,
              realTarget: parsedTarget
            });
          }
        } else {
          (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to " + options.path + " through proxy " + proxyAddressString + " with status " + res.statusCode);
          reject();
        }
      });
      request.once("error", (err) => {
        request.removeAllListeners();
        (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to proxy " + proxyAddressString + " with error " + err.message);
        reject();
      });
      request.end();
    });
  }
  return http_proxy;
}
var subchannelCall = {};
var streamDecoder = {};
var hasRequiredStreamDecoder;
function requireStreamDecoder() {
  if (hasRequiredStreamDecoder) return streamDecoder;
  hasRequiredStreamDecoder = 1;
  Object.defineProperty(streamDecoder, "__esModule", { value: true });
  streamDecoder.StreamDecoder = void 0;
  var ReadState;
  (function(ReadState2) {
    ReadState2[ReadState2["NO_DATA"] = 0] = "NO_DATA";
    ReadState2[ReadState2["READING_SIZE"] = 1] = "READING_SIZE";
    ReadState2[ReadState2["READING_MESSAGE"] = 2] = "READING_MESSAGE";
  })(ReadState || (ReadState = {}));
  class StreamDecoder {
    constructor(maxReadMessageLength) {
      this.maxReadMessageLength = maxReadMessageLength;
      this.readState = ReadState.NO_DATA;
      this.readCompressFlag = Buffer.alloc(1);
      this.readPartialSize = Buffer.alloc(4);
      this.readSizeRemaining = 4;
      this.readMessageSize = 0;
      this.readPartialMessage = [];
      this.readMessageRemaining = 0;
    }
    write(data) {
      let readHead = 0;
      let toRead;
      const result = [];
      while (readHead < data.length) {
        switch (this.readState) {
          case ReadState.NO_DATA:
            this.readCompressFlag = data.slice(readHead, readHead + 1);
            readHead += 1;
            this.readState = ReadState.READING_SIZE;
            this.readPartialSize.fill(0);
            this.readSizeRemaining = 4;
            this.readMessageSize = 0;
            this.readMessageRemaining = 0;
            this.readPartialMessage = [];
            break;
          case ReadState.READING_SIZE:
            toRead = Math.min(data.length - readHead, this.readSizeRemaining);
            data.copy(this.readPartialSize, 4 - this.readSizeRemaining, readHead, readHead + toRead);
            this.readSizeRemaining -= toRead;
            readHead += toRead;
            if (this.readSizeRemaining === 0) {
              this.readMessageSize = this.readPartialSize.readUInt32BE(0);
              if (this.maxReadMessageLength !== -1 && this.readMessageSize > this.maxReadMessageLength) {
                throw new Error(`Received message larger than max (${this.readMessageSize} vs ${this.maxReadMessageLength})`);
              }
              this.readMessageRemaining = this.readMessageSize;
              if (this.readMessageRemaining > 0) {
                this.readState = ReadState.READING_MESSAGE;
              } else {
                const message = Buffer.concat([this.readCompressFlag, this.readPartialSize], 5);
                this.readState = ReadState.NO_DATA;
                result.push(message);
              }
            }
            break;
          case ReadState.READING_MESSAGE:
            toRead = Math.min(data.length - readHead, this.readMessageRemaining);
            this.readPartialMessage.push(data.slice(readHead, readHead + toRead));
            this.readMessageRemaining -= toRead;
            readHead += toRead;
            if (this.readMessageRemaining === 0) {
              const framedMessageBuffers = [
                this.readCompressFlag,
                this.readPartialSize
              ].concat(this.readPartialMessage);
              const framedMessage = Buffer.concat(framedMessageBuffers, this.readMessageSize + 5);
              this.readState = ReadState.NO_DATA;
              result.push(framedMessage);
            }
            break;
          default:
            throw new Error("Unexpected read state");
        }
      }
      return result;
    }
  }
  streamDecoder.StreamDecoder = StreamDecoder;
  return streamDecoder;
}
var hasRequiredSubchannelCall;
function requireSubchannelCall() {
  if (hasRequiredSubchannelCall) return subchannelCall;
  hasRequiredSubchannelCall = 1;
  Object.defineProperty(subchannelCall, "__esModule", { value: true });
  subchannelCall.Http2SubchannelCall = void 0;
  const http2 = require$$0$5;
  const os = require$$1$2;
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const stream_decoder_1 = requireStreamDecoder();
  const logging2 = requireLogging();
  const constants_2 = requireConstants();
  const TRACER_NAME = "subchannel_call";
  function getSystemErrorName(errno) {
    for (const [name, num] of Object.entries(os.constants.errno)) {
      if (num === errno) {
        return name;
      }
    }
    return "Unknown system error " + errno;
  }
  class Http2SubchannelCall {
    constructor(http2Stream, callEventTracker, listener, transport2, callId) {
      var _a;
      this.http2Stream = http2Stream;
      this.callEventTracker = callEventTracker;
      this.listener = listener;
      this.transport = transport2;
      this.callId = callId;
      this.isReadFilterPending = false;
      this.isPushPending = false;
      this.canPush = false;
      this.readsClosed = false;
      this.statusOutput = false;
      this.unpushedReadMessages = [];
      this.mappedStatusCode = constants_1.Status.UNKNOWN;
      this.finalStatus = null;
      this.internalError = null;
      const maxReceiveMessageLength = (_a = transport2.getOptions()["grpc.max_receive_message_length"]) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.decoder = new stream_decoder_1.StreamDecoder(maxReceiveMessageLength);
      http2Stream.on("response", (headers, flags) => {
        let headersString = "";
        for (const header of Object.keys(headers)) {
          headersString += "		" + header + ": " + headers[header] + "\n";
        }
        this.trace("Received server headers:\n" + headersString);
        switch (headers[":status"]) {
          // TODO(murgatroid99): handle 100 and 101
          case 400:
            this.mappedStatusCode = constants_1.Status.INTERNAL;
            break;
          case 401:
            this.mappedStatusCode = constants_1.Status.UNAUTHENTICATED;
            break;
          case 403:
            this.mappedStatusCode = constants_1.Status.PERMISSION_DENIED;
            break;
          case 404:
            this.mappedStatusCode = constants_1.Status.UNIMPLEMENTED;
            break;
          case 429:
          case 502:
          case 503:
          case 504:
            this.mappedStatusCode = constants_1.Status.UNAVAILABLE;
            break;
          default:
            this.mappedStatusCode = constants_1.Status.UNKNOWN;
        }
        if (flags & http2.constants.NGHTTP2_FLAG_END_STREAM) {
          this.handleTrailers(headers);
        } else {
          let metadata2;
          try {
            metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
          } catch (error2) {
            this.endCall({
              code: constants_1.Status.UNKNOWN,
              details: error2.message,
              metadata: new metadata_1.Metadata()
            });
            return;
          }
          this.listener.onReceiveMetadata(metadata2);
        }
      });
      http2Stream.on("trailers", (headers) => {
        this.handleTrailers(headers);
      });
      http2Stream.on("data", (data) => {
        if (this.statusOutput) {
          return;
        }
        this.trace("receive HTTP/2 data frame of length " + data.length);
        let messages;
        try {
          messages = this.decoder.write(data);
        } catch (e) {
          this.cancelWithStatus(constants_1.Status.RESOURCE_EXHAUSTED, e.message);
          return;
        }
        for (const message of messages) {
          this.trace("parsed message of length " + message.length);
          this.callEventTracker.addMessageReceived();
          this.tryPush(message);
        }
      });
      http2Stream.on("end", () => {
        this.readsClosed = true;
        this.maybeOutputStatus();
      });
      http2Stream.on("close", () => {
        process.nextTick(() => {
          var _a2;
          this.trace("HTTP/2 stream closed with code " + http2Stream.rstCode);
          if (((_a2 = this.finalStatus) === null || _a2 === void 0 ? void 0 : _a2.code) === constants_1.Status.OK) {
            return;
          }
          let code;
          let details = "";
          switch (http2Stream.rstCode) {
            case http2.constants.NGHTTP2_NO_ERROR:
              if (this.finalStatus !== null) {
                return;
              }
              code = constants_1.Status.INTERNAL;
              details = `Received RST_STREAM with code ${http2Stream.rstCode}`;
              break;
            case http2.constants.NGHTTP2_REFUSED_STREAM:
              code = constants_1.Status.UNAVAILABLE;
              details = "Stream refused by server";
              break;
            case http2.constants.NGHTTP2_CANCEL:
              code = constants_1.Status.CANCELLED;
              details = "Call cancelled";
              break;
            case http2.constants.NGHTTP2_ENHANCE_YOUR_CALM:
              code = constants_1.Status.RESOURCE_EXHAUSTED;
              details = "Bandwidth exhausted or memory limit exceeded";
              break;
            case http2.constants.NGHTTP2_INADEQUATE_SECURITY:
              code = constants_1.Status.PERMISSION_DENIED;
              details = "Protocol not secure enough";
              break;
            case http2.constants.NGHTTP2_INTERNAL_ERROR:
              code = constants_1.Status.INTERNAL;
              if (this.internalError === null) {
                details = `Received RST_STREAM with code ${http2Stream.rstCode} (Internal server error)`;
              } else {
                if (this.internalError.code === "ECONNRESET" || this.internalError.code === "ETIMEDOUT") {
                  code = constants_1.Status.UNAVAILABLE;
                  details = this.internalError.message;
                } else {
                  details = `Received RST_STREAM with code ${http2Stream.rstCode} triggered by internal client error: ${this.internalError.message}`;
                }
              }
              break;
            default:
              code = constants_1.Status.INTERNAL;
              details = `Received RST_STREAM with code ${http2Stream.rstCode}`;
          }
          this.endCall({
            code,
            details,
            metadata: new metadata_1.Metadata(),
            rstCode: http2Stream.rstCode
          });
        });
      });
      http2Stream.on("error", (err) => {
        if (err.code !== "ERR_HTTP2_STREAM_ERROR") {
          this.trace("Node error event: message=" + err.message + " code=" + err.code + " errno=" + getSystemErrorName(err.errno) + " syscall=" + err.syscall);
          this.internalError = err;
        }
        this.callEventTracker.onStreamEnd(false);
      });
    }
    onDisconnect() {
      this.endCall({
        code: constants_1.Status.UNAVAILABLE,
        details: "Connection dropped",
        metadata: new metadata_1.Metadata()
      });
    }
    outputStatus() {
      if (!this.statusOutput) {
        this.statusOutput = true;
        this.trace("ended with status: code=" + this.finalStatus.code + ' details="' + this.finalStatus.details + '"');
        this.callEventTracker.onCallEnd(this.finalStatus);
        process.nextTick(() => {
          this.listener.onReceiveStatus(this.finalStatus);
        });
        this.http2Stream.resume();
      }
    }
    trace(text) {
      logging2.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callId + "] " + text);
    }
    /**
     * On first call, emits a 'status' event with the given StatusObject.
     * Subsequent calls are no-ops.
     * @param status The status of the call.
     */
    endCall(status) {
      if (this.finalStatus === null || this.finalStatus.code === constants_1.Status.OK) {
        this.finalStatus = status;
        this.maybeOutputStatus();
      }
      this.destroyHttp2Stream();
    }
    maybeOutputStatus() {
      if (this.finalStatus !== null) {
        if (this.finalStatus.code !== constants_1.Status.OK || this.readsClosed && this.unpushedReadMessages.length === 0 && !this.isReadFilterPending && !this.isPushPending) {
          this.outputStatus();
        }
      }
    }
    push(message) {
      this.trace("pushing to reader message of length " + (message instanceof Buffer ? message.length : null));
      this.canPush = false;
      this.isPushPending = true;
      process.nextTick(() => {
        this.isPushPending = false;
        if (this.statusOutput) {
          return;
        }
        this.listener.onReceiveMessage(message);
        this.maybeOutputStatus();
      });
    }
    tryPush(messageBytes) {
      if (this.canPush) {
        this.http2Stream.pause();
        this.push(messageBytes);
      } else {
        this.trace("unpushedReadMessages.push message of length " + messageBytes.length);
        this.unpushedReadMessages.push(messageBytes);
      }
    }
    handleTrailers(headers) {
      this.callEventTracker.onStreamEnd(true);
      let headersString = "";
      for (const header of Object.keys(headers)) {
        headersString += "		" + header + ": " + headers[header] + "\n";
      }
      this.trace("Received server trailers:\n" + headersString);
      let metadata2;
      try {
        metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
      } catch (e) {
        metadata2 = new metadata_1.Metadata();
      }
      const metadataMap = metadata2.getMap();
      let code = this.mappedStatusCode;
      if (code === constants_1.Status.UNKNOWN && typeof metadataMap["grpc-status"] === "string") {
        const receivedStatus = Number(metadataMap["grpc-status"]);
        if (receivedStatus in constants_1.Status) {
          code = receivedStatus;
          this.trace("received status code " + receivedStatus + " from server");
        }
        metadata2.remove("grpc-status");
      }
      let details = "";
      if (typeof metadataMap["grpc-message"] === "string") {
        try {
          details = decodeURI(metadataMap["grpc-message"]);
        } catch (e) {
          details = metadataMap["grpc-message"];
        }
        metadata2.remove("grpc-message");
        this.trace('received status details string "' + details + '" from server');
      }
      const status = { code, details, metadata: metadata2 };
      this.endCall(status);
    }
    destroyHttp2Stream() {
      var _a;
      if (!this.http2Stream.destroyed) {
        let code;
        if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
          code = http2.constants.NGHTTP2_NO_ERROR;
        } else {
          code = http2.constants.NGHTTP2_CANCEL;
        }
        this.trace("close http2 stream with code " + code);
        this.http2Stream.close(code);
      }
    }
    cancelWithStatus(status, details) {
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      this.endCall({ code: status, details, metadata: new metadata_1.Metadata() });
    }
    getStatus() {
      return this.finalStatus;
    }
    getPeer() {
      return this.transport.getPeerName();
    }
    getCallNumber() {
      return this.callId;
    }
    startRead() {
      if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
        this.readsClosed = true;
        this.maybeOutputStatus();
        return;
      }
      this.canPush = true;
      if (this.unpushedReadMessages.length > 0) {
        const nextMessage = this.unpushedReadMessages.shift();
        this.push(nextMessage);
        return;
      }
      this.http2Stream.resume();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      const cb = (error2) => {
        process.nextTick(() => {
          var _a;
          let code = constants_1.Status.UNAVAILABLE;
          if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "ERR_STREAM_WRITE_AFTER_END") {
            code = constants_1.Status.INTERNAL;
          }
          if (error2) {
            this.cancelWithStatus(code, `Write error: ${error2.message}`);
          }
          (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
        });
      };
      this.trace("sending data chunk of length " + message.length);
      this.callEventTracker.addMessageSent();
      try {
        this.http2Stream.write(message, cb);
      } catch (error2) {
        this.endCall({
          code: constants_1.Status.UNAVAILABLE,
          details: `Write failed with error ${error2.message}`,
          metadata: new metadata_1.Metadata()
        });
      }
    }
    halfClose() {
      this.trace("end() called");
      this.trace("calling end() on HTTP/2 stream");
      this.http2Stream.end();
    }
  }
  subchannelCall.Http2SubchannelCall = Http2SubchannelCall;
  return subchannelCall;
}
var callNumber = {};
var hasRequiredCallNumber;
function requireCallNumber() {
  if (hasRequiredCallNumber) return callNumber;
  hasRequiredCallNumber = 1;
  Object.defineProperty(callNumber, "__esModule", { value: true });
  callNumber.getNextCallNumber = getNextCallNumber;
  let nextCallNumber = 0;
  function getNextCallNumber() {
    return nextCallNumber++;
  }
  return callNumber;
}
var hasRequiredTransport;
function requireTransport() {
  if (hasRequiredTransport) return transport;
  hasRequiredTransport = 1;
  Object.defineProperty(transport, "__esModule", { value: true });
  transport.Http2SubchannelConnector = void 0;
  const http2 = require$$0$5;
  const tls_1 = require$$1$1;
  const channelz_1 = requireChannelz();
  const constants_1 = requireConstants();
  const http_proxy_1 = requireHttp_proxy();
  const logging2 = requireLogging();
  const resolver_1 = requireResolver();
  const subchannel_address_1 = requireSubchannelAddress();
  const uri_parser_1 = requireUriParser();
  const net = require$$0$1;
  const subchannel_call_1 = requireSubchannelCall();
  const call_number_1 = requireCallNumber();
  const TRACER_NAME = "transport";
  const FLOW_CONTROL_TRACER_NAME = "transport_flowctrl";
  const clientVersion = require$$12.version;
  const { HTTP2_HEADER_AUTHORITY, HTTP2_HEADER_CONTENT_TYPE, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_TE, HTTP2_HEADER_USER_AGENT } = http2.constants;
  const KEEPALIVE_TIMEOUT_MS = 2e4;
  const tooManyPingsData = Buffer.from("too_many_pings", "ascii");
  class Http2Transport {
    constructor(session, subchannelAddress2, options, remoteName) {
      this.session = session;
      this.options = options;
      this.remoteName = remoteName;
      this.keepaliveTimeMs = -1;
      this.keepaliveTimeoutMs = KEEPALIVE_TIMEOUT_MS;
      this.keepaliveTimerId = null;
      this.pendingSendKeepalivePing = false;
      this.keepaliveTimeoutId = null;
      this.keepaliveWithoutCalls = false;
      this.activeCalls = /* @__PURE__ */ new Set();
      this.disconnectListeners = [];
      this.disconnectHandled = false;
      this.channelzEnabled = true;
      this.streamTracker = new channelz_1.ChannelzCallTracker();
      this.keepalivesSent = 0;
      this.messagesSent = 0;
      this.messagesReceived = 0;
      this.lastMessageSentTimestamp = null;
      this.lastMessageReceivedTimestamp = null;
      this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress2);
      if (options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
      }
      this.channelzRef = (0, channelz_1.registerChannelzSocket)(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled);
      this.userAgent = [
        options["grpc.primary_user_agent"],
        `grpc-node-js/${clientVersion}`,
        options["grpc.secondary_user_agent"]
      ].filter((e) => e).join(" ");
      if ("grpc.keepalive_time_ms" in options) {
        this.keepaliveTimeMs = options["grpc.keepalive_time_ms"];
      }
      if ("grpc.keepalive_timeout_ms" in options) {
        this.keepaliveTimeoutMs = options["grpc.keepalive_timeout_ms"];
      }
      if ("grpc.keepalive_permit_without_calls" in options) {
        this.keepaliveWithoutCalls = options["grpc.keepalive_permit_without_calls"] === 1;
      } else {
        this.keepaliveWithoutCalls = false;
      }
      session.once("close", () => {
        this.trace("session closed");
        this.stopKeepalivePings();
        this.handleDisconnect();
      });
      session.once("goaway", (errorCode, lastStreamID, opaqueData) => {
        let tooManyPings = false;
        if (errorCode === http2.constants.NGHTTP2_ENHANCE_YOUR_CALM && opaqueData && opaqueData.equals(tooManyPingsData)) {
          tooManyPings = true;
        }
        this.trace("connection closed by GOAWAY with code " + errorCode + " and data " + (opaqueData === null || opaqueData === void 0 ? void 0 : opaqueData.toString()));
        this.reportDisconnectToOwner(tooManyPings);
      });
      session.once("error", (error2) => {
        this.trace("connection closed with error " + error2.message);
      });
      if (logging2.isTracerEnabled(TRACER_NAME)) {
        session.on("remoteSettings", (settings) => {
          this.trace("new settings received" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
        });
        session.on("localSettings", (settings) => {
          this.trace("local settings acknowledged by remote" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
        });
      }
      if (this.keepaliveWithoutCalls) {
        this.maybeStartKeepalivePingTimer();
      }
    }
    getChannelzInfo() {
      var _a, _b, _c;
      const sessionSocket = this.session.socket;
      const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
      const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
      let tlsInfo;
      if (this.session.encrypted) {
        const tlsSocket = sessionSocket;
        const cipherInfo = tlsSocket.getCipher();
        const certificate = tlsSocket.getCertificate();
        const peerCertificate = tlsSocket.getPeerCertificate();
        tlsInfo = {
          cipherSuiteStandardName: (_a = cipherInfo.standardName) !== null && _a !== void 0 ? _a : null,
          cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
          localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
          remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
        };
      } else {
        tlsInfo = null;
      }
      const socketInfo = {
        remoteAddress,
        localAddress,
        security: tlsInfo,
        remoteName: this.remoteName,
        streamsStarted: this.streamTracker.callsStarted,
        streamsSucceeded: this.streamTracker.callsSucceeded,
        streamsFailed: this.streamTracker.callsFailed,
        messagesSent: this.messagesSent,
        messagesReceived: this.messagesReceived,
        keepAlivesSent: this.keepalivesSent,
        lastLocalStreamCreatedTimestamp: this.streamTracker.lastCallStartedTimestamp,
        lastRemoteStreamCreatedTimestamp: null,
        lastMessageSentTimestamp: this.lastMessageSentTimestamp,
        lastMessageReceivedTimestamp: this.lastMessageReceivedTimestamp,
        localFlowControlWindow: (_b = this.session.state.localWindowSize) !== null && _b !== void 0 ? _b : null,
        remoteFlowControlWindow: (_c = this.session.state.remoteWindowSize) !== null && _c !== void 0 ? _c : null
      };
      return socketInfo;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    keepaliveTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    flowControlTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, FLOW_CONTROL_TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    internalsTrace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, "transport_internals", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    /**
     * Indicate to the owner of this object that this transport should no longer
     * be used. That happens if the connection drops, or if the server sends a
     * GOAWAY.
     * @param tooManyPings If true, this was triggered by a GOAWAY with data
     * indicating that the session was closed becaues the client sent too many
     * pings.
     * @returns
     */
    reportDisconnectToOwner(tooManyPings) {
      if (this.disconnectHandled) {
        return;
      }
      this.disconnectHandled = true;
      this.disconnectListeners.forEach((listener) => listener(tooManyPings));
    }
    /**
     * Handle connection drops, but not GOAWAYs.
     */
    handleDisconnect() {
      this.reportDisconnectToOwner(false);
      setImmediate(() => {
        for (const call2 of this.activeCalls) {
          call2.onDisconnect();
        }
      });
    }
    addDisconnectListener(listener) {
      this.disconnectListeners.push(listener);
    }
    clearKeepaliveTimer() {
      if (!this.keepaliveTimerId) {
        return;
      }
      clearTimeout(this.keepaliveTimerId);
      this.keepaliveTimerId = null;
    }
    clearKeepaliveTimeout() {
      if (!this.keepaliveTimeoutId) {
        return;
      }
      clearTimeout(this.keepaliveTimeoutId);
      this.keepaliveTimeoutId = null;
    }
    canSendPing() {
      return this.keepaliveTimeMs > 0 && (this.keepaliveWithoutCalls || this.activeCalls.size > 0);
    }
    maybeSendPing() {
      var _a, _b;
      this.clearKeepaliveTimer();
      if (!this.canSendPing()) {
        this.pendingSendKeepalivePing = true;
        return;
      }
      if (this.channelzEnabled) {
        this.keepalivesSent += 1;
      }
      this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
      if (!this.keepaliveTimeoutId) {
        this.keepaliveTimeoutId = setTimeout(() => {
          this.keepaliveTrace("Ping timeout passed without response");
          this.handleDisconnect();
        }, this.keepaliveTimeoutMs);
        (_b = (_a = this.keepaliveTimeoutId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
      try {
        this.session.ping((err, duration2, payload) => {
          if (err) {
            this.keepaliveTrace("Ping failed with error " + err.message);
            this.handleDisconnect();
          }
          this.keepaliveTrace("Received ping response");
          this.clearKeepaliveTimeout();
          this.maybeStartKeepalivePingTimer();
        });
      } catch (e) {
        this.handleDisconnect();
      }
    }
    /**
     * Starts the keepalive ping timer if appropriate. If the timer already ran
     * out while there were no active requests, instead send a ping immediately.
     * If the ping timer is already running or a ping is currently in flight,
     * instead do nothing and wait for them to resolve.
     */
    maybeStartKeepalivePingTimer() {
      var _a, _b;
      if (!this.canSendPing()) {
        return;
      }
      if (this.pendingSendKeepalivePing) {
        this.pendingSendKeepalivePing = false;
        this.maybeSendPing();
      } else if (!this.keepaliveTimerId && !this.keepaliveTimeoutId) {
        this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms");
        this.keepaliveTimerId = (_b = (_a = setTimeout(() => {
          this.maybeSendPing();
        }, this.keepaliveTimeMs)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    stopKeepalivePings() {
      if (this.keepaliveTimerId) {
        clearTimeout(this.keepaliveTimerId);
        this.keepaliveTimerId = null;
      }
      this.clearKeepaliveTimeout();
    }
    removeActiveCall(call2) {
      this.activeCalls.delete(call2);
      if (this.activeCalls.size === 0) {
        this.session.unref();
      }
    }
    addActiveCall(call2) {
      this.activeCalls.add(call2);
      if (this.activeCalls.size === 1) {
        this.session.ref();
        if (!this.keepaliveWithoutCalls) {
          this.maybeStartKeepalivePingTimer();
        }
      }
    }
    createCall(metadata2, host, method, listener, subchannelCallStatsTracker) {
      const headers = metadata2.toHttp2Headers();
      headers[HTTP2_HEADER_AUTHORITY] = host;
      headers[HTTP2_HEADER_USER_AGENT] = this.userAgent;
      headers[HTTP2_HEADER_CONTENT_TYPE] = "application/grpc";
      headers[HTTP2_HEADER_METHOD] = "POST";
      headers[HTTP2_HEADER_PATH] = method;
      headers[HTTP2_HEADER_TE] = "trailers";
      let http2Stream;
      try {
        http2Stream = this.session.request(headers);
      } catch (e) {
        this.handleDisconnect();
        throw e;
      }
      this.flowControlTrace("local window size: " + this.session.state.localWindowSize + " remote window size: " + this.session.state.remoteWindowSize);
      this.internalsTrace("session.closed=" + this.session.closed + " session.destroyed=" + this.session.destroyed + " session.socket.destroyed=" + this.session.socket.destroyed);
      let eventTracker;
      let call2;
      if (this.channelzEnabled) {
        this.streamTracker.addCallStarted();
        eventTracker = {
          addMessageSent: () => {
            var _a;
            this.messagesSent += 1;
            this.lastMessageSentTimestamp = /* @__PURE__ */ new Date();
            (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          addMessageReceived: () => {
            var _a;
            this.messagesReceived += 1;
            this.lastMessageReceivedTimestamp = /* @__PURE__ */ new Date();
            (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          onCallEnd: (status) => {
            var _a;
            (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
            this.removeActiveCall(call2);
          },
          onStreamEnd: (success) => {
            var _a;
            if (success) {
              this.streamTracker.addCallSucceeded();
            } else {
              this.streamTracker.addCallFailed();
            }
            (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
          }
        };
      } else {
        eventTracker = {
          addMessageSent: () => {
            var _a;
            (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          addMessageReceived: () => {
            var _a;
            (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
          },
          onCallEnd: (status) => {
            var _a;
            (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
            this.removeActiveCall(call2);
          },
          onStreamEnd: (success) => {
            var _a;
            (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
          }
        };
      }
      call2 = new subchannel_call_1.Http2SubchannelCall(http2Stream, eventTracker, listener, this, (0, call_number_1.getNextCallNumber)());
      this.addActiveCall(call2);
      return call2;
    }
    getChannelzRef() {
      return this.channelzRef;
    }
    getPeerName() {
      return this.subchannelAddressString;
    }
    getOptions() {
      return this.options;
    }
    shutdown() {
      this.session.close();
      (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
    }
  }
  class Http2SubchannelConnector {
    constructor(channelTarget) {
      this.channelTarget = channelTarget;
      this.session = null;
      this.isShutdown = false;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, (0, uri_parser_1.uriToString)(this.channelTarget) + " " + text);
    }
    createSession(address, credentials, options, proxyConnectionResult) {
      if (this.isShutdown) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        var _a, _b, _c;
        let remoteName;
        if (proxyConnectionResult.realTarget) {
          remoteName = (0, uri_parser_1.uriToString)(proxyConnectionResult.realTarget);
          this.trace("creating HTTP/2 session through proxy to " + (0, uri_parser_1.uriToString)(proxyConnectionResult.realTarget));
        } else {
          remoteName = null;
          this.trace("creating HTTP/2 session to " + (0, subchannel_address_1.subchannelAddressToString)(address));
        }
        const targetAuthority = (0, resolver_1.getDefaultAuthority)((_a = proxyConnectionResult.realTarget) !== null && _a !== void 0 ? _a : this.channelTarget);
        let connectionOptions = credentials._getConnectionOptions() || {};
        connectionOptions.maxSendHeaderBlockLength = Number.MAX_SAFE_INTEGER;
        if ("grpc-node.max_session_memory" in options) {
          connectionOptions.maxSessionMemory = options["grpc-node.max_session_memory"];
        } else {
          connectionOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
        }
        let addressScheme = "http://";
        if ("secureContext" in connectionOptions) {
          addressScheme = "https://";
          if (options["grpc.ssl_target_name_override"]) {
            const sslTargetNameOverride = options["grpc.ssl_target_name_override"];
            connectionOptions.checkServerIdentity = (host, cert) => {
              return (0, tls_1.checkServerIdentity)(sslTargetNameOverride, cert);
            };
            connectionOptions.servername = sslTargetNameOverride;
          } else {
            const authorityHostname = (_c = (_b = (0, uri_parser_1.splitHostPort)(targetAuthority)) === null || _b === void 0 ? void 0 : _b.host) !== null && _c !== void 0 ? _c : "localhost";
            connectionOptions.servername = authorityHostname;
          }
          if (proxyConnectionResult.socket) {
            connectionOptions.createConnection = (authority, option) => {
              return proxyConnectionResult.socket;
            };
          }
        } else {
          connectionOptions.createConnection = (authority, option) => {
            if (proxyConnectionResult.socket) {
              return proxyConnectionResult.socket;
            } else {
              return net.connect(address);
            }
          };
        }
        connectionOptions = Object.assign(Object.assign(Object.assign({}, connectionOptions), address), { enableTrace: options["grpc-node.tls_enable_trace"] === 1 });
        const session = http2.connect(addressScheme + targetAuthority, connectionOptions);
        this.session = session;
        let errorMessage = "Failed to connect";
        session.unref();
        session.once("connect", () => {
          session.removeAllListeners();
          resolve(new Http2Transport(session, address, options, remoteName));
          this.session = null;
        });
        session.once("close", () => {
          this.session = null;
          setImmediate(() => {
            reject(`${errorMessage} (${(/* @__PURE__ */ new Date()).toISOString()})`);
          });
        });
        session.once("error", (error2) => {
          errorMessage = error2.message;
          this.trace("connection failed with error " + errorMessage);
        });
      });
    }
    connect(address, credentials, options) {
      var _a, _b;
      if (this.isShutdown) {
        return Promise.reject();
      }
      const connectionOptions = credentials._getConnectionOptions() || {};
      if ("secureContext" in connectionOptions) {
        connectionOptions.ALPNProtocols = ["h2"];
        if (options["grpc.ssl_target_name_override"]) {
          const sslTargetNameOverride = options["grpc.ssl_target_name_override"];
          connectionOptions.checkServerIdentity = (host, cert) => {
            return (0, tls_1.checkServerIdentity)(sslTargetNameOverride, cert);
          };
          connectionOptions.servername = sslTargetNameOverride;
        } else {
          if ("grpc.http_connect_target" in options) {
            const targetPath = (0, resolver_1.getDefaultAuthority)((_a = (0, uri_parser_1.parseUri)(options["grpc.http_connect_target"])) !== null && _a !== void 0 ? _a : {
              path: "localhost"
            });
            const hostPort = (0, uri_parser_1.splitHostPort)(targetPath);
            connectionOptions.servername = (_b = hostPort === null || hostPort === void 0 ? void 0 : hostPort.host) !== null && _b !== void 0 ? _b : targetPath;
          }
        }
        if (options["grpc-node.tls_enable_trace"]) {
          connectionOptions.enableTrace = true;
        }
      }
      return (0, http_proxy_1.getProxiedConnection)(address, options, connectionOptions).then((result) => this.createSession(address, credentials, options, result));
    }
    shutdown() {
      var _a;
      this.isShutdown = true;
      (_a = this.session) === null || _a === void 0 ? void 0 : _a.close();
      this.session = null;
    }
  }
  transport.Http2SubchannelConnector = Http2SubchannelConnector;
  return transport;
}
var hasRequiredSubchannelPool;
function requireSubchannelPool() {
  if (hasRequiredSubchannelPool) return subchannelPool;
  hasRequiredSubchannelPool = 1;
  Object.defineProperty(subchannelPool, "__esModule", { value: true });
  subchannelPool.SubchannelPool = void 0;
  subchannelPool.getSubchannelPool = getSubchannelPool;
  const channel_options_1 = requireChannelOptions();
  const subchannel_1 = requireSubchannel();
  const subchannel_address_1 = requireSubchannelAddress();
  const uri_parser_1 = requireUriParser();
  const transport_1 = requireTransport();
  const REF_CHECK_INTERVAL = 1e4;
  class SubchannelPool {
    /**
     * A pool of subchannels use for making connections. Subchannels with the
     * exact same parameters will be reused.
     */
    constructor() {
      this.pool = /* @__PURE__ */ Object.create(null);
      this.cleanupTimer = null;
    }
    /**
     * Unrefs all unused subchannels and cancels the cleanup task if all
     * subchannels have been unrefed.
     */
    unrefUnusedSubchannels() {
      let allSubchannelsUnrefed = true;
      for (const channelTarget in this.pool) {
        const subchannelObjArray = this.pool[channelTarget];
        const refedSubchannels = subchannelObjArray.filter((value) => !value.subchannel.unrefIfOneRef());
        if (refedSubchannels.length > 0) {
          allSubchannelsUnrefed = false;
        }
        this.pool[channelTarget] = refedSubchannels;
      }
      if (allSubchannelsUnrefed && this.cleanupTimer !== null) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
    }
    /**
     * Ensures that the cleanup task is spawned.
     */
    ensureCleanupTask() {
      var _a, _b;
      if (this.cleanupTimer === null) {
        this.cleanupTimer = setInterval(() => {
          this.unrefUnusedSubchannels();
        }, REF_CHECK_INTERVAL);
        (_b = (_a = this.cleanupTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    /**
     * Get a subchannel if one already exists with exactly matching parameters.
     * Otherwise, create and save a subchannel with those parameters.
     * @param channelTarget
     * @param subchannelTarget
     * @param channelArguments
     * @param channelCredentials
     */
    getOrCreateSubchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials2) {
      this.ensureCleanupTask();
      const channelTarget = (0, uri_parser_1.uriToString)(channelTargetUri);
      if (channelTarget in this.pool) {
        const subchannelObjArray = this.pool[channelTarget];
        for (const subchannelObj of subchannelObjArray) {
          if ((0, subchannel_address_1.subchannelAddressEqual)(subchannelTarget, subchannelObj.subchannelAddress) && (0, channel_options_1.channelOptionsEqual)(channelArguments, subchannelObj.channelArguments) && channelCredentials2._equals(subchannelObj.channelCredentials)) {
            return subchannelObj.subchannel;
          }
        }
      }
      const subchannel2 = new subchannel_1.Subchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials2, new transport_1.Http2SubchannelConnector(channelTargetUri));
      if (!(channelTarget in this.pool)) {
        this.pool[channelTarget] = [];
      }
      this.pool[channelTarget].push({
        subchannelAddress: subchannelTarget,
        channelArguments,
        channelCredentials: channelCredentials2,
        subchannel: subchannel2
      });
      subchannel2.ref();
      return subchannel2;
    }
  }
  subchannelPool.SubchannelPool = SubchannelPool;
  const globalSubchannelPool = new SubchannelPool();
  function getSubchannelPool(global) {
    if (global) {
      return globalSubchannelPool;
    } else {
      return new SubchannelPool();
    }
  }
  return subchannelPool;
}
var filterStack = {};
var hasRequiredFilterStack;
function requireFilterStack() {
  if (hasRequiredFilterStack) return filterStack;
  hasRequiredFilterStack = 1;
  Object.defineProperty(filterStack, "__esModule", { value: true });
  filterStack.FilterStackFactory = filterStack.FilterStack = void 0;
  class FilterStack {
    constructor(filters) {
      this.filters = filters;
    }
    sendMetadata(metadata2) {
      let result = metadata2;
      for (let i = 0; i < this.filters.length; i++) {
        result = this.filters[i].sendMetadata(result);
      }
      return result;
    }
    receiveMetadata(metadata2) {
      let result = metadata2;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveMetadata(result);
      }
      return result;
    }
    sendMessage(message) {
      let result = message;
      for (let i = 0; i < this.filters.length; i++) {
        result = this.filters[i].sendMessage(result);
      }
      return result;
    }
    receiveMessage(message) {
      let result = message;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveMessage(result);
      }
      return result;
    }
    receiveTrailers(status) {
      let result = status;
      for (let i = this.filters.length - 1; i >= 0; i--) {
        result = this.filters[i].receiveTrailers(result);
      }
      return result;
    }
    push(filters) {
      this.filters.unshift(...filters);
    }
    getFilters() {
      return this.filters;
    }
  }
  filterStack.FilterStack = FilterStack;
  class FilterStackFactory {
    constructor(factories) {
      this.factories = factories;
    }
    push(filterFactories) {
      this.factories.unshift(...filterFactories);
    }
    clone() {
      return new FilterStackFactory([...this.factories]);
    }
    createFilter() {
      return new FilterStack(this.factories.map((factory) => factory.createFilter()));
    }
  }
  filterStack.FilterStackFactory = FilterStackFactory;
  return filterStack;
}
var compressionFilter = {};
var compressionAlgorithms = {};
var hasRequiredCompressionAlgorithms;
function requireCompressionAlgorithms() {
  if (hasRequiredCompressionAlgorithms) return compressionAlgorithms;
  hasRequiredCompressionAlgorithms = 1;
  Object.defineProperty(compressionAlgorithms, "__esModule", { value: true });
  compressionAlgorithms.CompressionAlgorithms = void 0;
  var CompressionAlgorithms;
  (function(CompressionAlgorithms2) {
    CompressionAlgorithms2[CompressionAlgorithms2["identity"] = 0] = "identity";
    CompressionAlgorithms2[CompressionAlgorithms2["deflate"] = 1] = "deflate";
    CompressionAlgorithms2[CompressionAlgorithms2["gzip"] = 2] = "gzip";
  })(CompressionAlgorithms || (compressionAlgorithms.CompressionAlgorithms = CompressionAlgorithms = {}));
  return compressionAlgorithms;
}
var filter = {};
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return filter;
  hasRequiredFilter = 1;
  Object.defineProperty(filter, "__esModule", { value: true });
  filter.BaseFilter = void 0;
  class BaseFilter {
    async sendMetadata(metadata2) {
      return metadata2;
    }
    receiveMetadata(metadata2) {
      return metadata2;
    }
    async sendMessage(message) {
      return message;
    }
    async receiveMessage(message) {
      return message;
    }
    receiveTrailers(status) {
      return status;
    }
  }
  filter.BaseFilter = BaseFilter;
  return filter;
}
var hasRequiredCompressionFilter;
function requireCompressionFilter() {
  if (hasRequiredCompressionFilter) return compressionFilter;
  hasRequiredCompressionFilter = 1;
  Object.defineProperty(compressionFilter, "__esModule", { value: true });
  compressionFilter.CompressionFilterFactory = compressionFilter.CompressionFilter = void 0;
  const zlib$1 = zlib;
  const compression_algorithms_1 = requireCompressionAlgorithms();
  const constants_1 = requireConstants();
  const filter_1 = requireFilter();
  const logging2 = requireLogging();
  const isCompressionAlgorithmKey = (key) => {
    return typeof key === "number" && typeof compression_algorithms_1.CompressionAlgorithms[key] === "string";
  };
  class CompressionHandler {
    /**
     * @param message Raw uncompressed message bytes
     * @param compress Indicates whether the message should be compressed
     * @return Framed message, compressed if applicable
     */
    async writeMessage(message, compress) {
      let messageBuffer = message;
      if (compress) {
        messageBuffer = await this.compressMessage(messageBuffer);
      }
      const output = Buffer.allocUnsafe(messageBuffer.length + 5);
      output.writeUInt8(compress ? 1 : 0, 0);
      output.writeUInt32BE(messageBuffer.length, 1);
      messageBuffer.copy(output, 5);
      return output;
    }
    /**
     * @param data Framed message, possibly compressed
     * @return Uncompressed message
     */
    async readMessage(data) {
      const compressed = data.readUInt8(0) === 1;
      let messageBuffer = data.slice(5);
      if (compressed) {
        messageBuffer = await this.decompressMessage(messageBuffer);
      }
      return messageBuffer;
    }
  }
  class IdentityHandler extends CompressionHandler {
    async compressMessage(message) {
      return message;
    }
    async writeMessage(message, compress) {
      const output = Buffer.allocUnsafe(message.length + 5);
      output.writeUInt8(0, 0);
      output.writeUInt32BE(message.length, 1);
      message.copy(output, 5);
      return output;
    }
    decompressMessage(message) {
      return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'));
    }
  }
  class DeflateHandler extends CompressionHandler {
    constructor(maxRecvMessageLength) {
      super();
      this.maxRecvMessageLength = maxRecvMessageLength;
    }
    compressMessage(message) {
      return new Promise((resolve, reject) => {
        zlib$1.deflate(message, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      });
    }
    decompressMessage(message) {
      return new Promise((resolve, reject) => {
        let totalLength = 0;
        const messageParts = [];
        const decompresser = zlib$1.createInflate();
        decompresser.on("error", (error2) => {
          reject({
            code: constants_1.Status.INTERNAL,
            details: "Failed to decompress deflate-encoded message"
          });
        });
        decompresser.on("data", (chunk) => {
          messageParts.push(chunk);
          totalLength += chunk.byteLength;
          if (this.maxRecvMessageLength !== -1 && totalLength > this.maxRecvMessageLength) {
            decompresser.destroy();
            reject({
              code: constants_1.Status.RESOURCE_EXHAUSTED,
              details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
            });
          }
        });
        decompresser.on("end", () => {
          resolve(Buffer.concat(messageParts));
        });
        decompresser.write(message);
        decompresser.end();
      });
    }
  }
  class GzipHandler extends CompressionHandler {
    constructor(maxRecvMessageLength) {
      super();
      this.maxRecvMessageLength = maxRecvMessageLength;
    }
    compressMessage(message) {
      return new Promise((resolve, reject) => {
        zlib$1.gzip(message, (err, output) => {
          if (err) {
            reject(err);
          } else {
            resolve(output);
          }
        });
      });
    }
    decompressMessage(message) {
      return new Promise((resolve, reject) => {
        let totalLength = 0;
        const messageParts = [];
        const decompresser = zlib$1.createGunzip();
        decompresser.on("error", (error2) => {
          reject({
            code: constants_1.Status.INTERNAL,
            details: "Failed to decompress deflate-encoded message"
          });
        });
        decompresser.on("data", (chunk) => {
          messageParts.push(chunk);
          totalLength += chunk.byteLength;
          if (this.maxRecvMessageLength !== -1 && totalLength > this.maxRecvMessageLength) {
            decompresser.destroy();
            reject({
              code: constants_1.Status.RESOURCE_EXHAUSTED,
              details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
            });
          }
        });
        decompresser.on("end", () => {
          resolve(Buffer.concat(messageParts));
        });
        decompresser.write(message);
        decompresser.end();
      });
    }
  }
  class UnknownHandler extends CompressionHandler {
    constructor(compressionName) {
      super();
      this.compressionName = compressionName;
    }
    compressMessage(message) {
      return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`));
    }
    decompressMessage(message) {
      return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`));
    }
  }
  function getCompressionHandler(compressionName, maxReceiveMessageSize) {
    switch (compressionName) {
      case "identity":
        return new IdentityHandler();
      case "deflate":
        return new DeflateHandler(maxReceiveMessageSize);
      case "gzip":
        return new GzipHandler(maxReceiveMessageSize);
      default:
        return new UnknownHandler(compressionName);
    }
  }
  class CompressionFilter extends filter_1.BaseFilter {
    constructor(channelOptions2, sharedFilterConfig) {
      var _a, _b;
      super();
      this.sharedFilterConfig = sharedFilterConfig;
      this.sendCompression = new IdentityHandler();
      this.receiveCompression = new IdentityHandler();
      this.currentCompressionAlgorithm = "identity";
      const compressionAlgorithmKey = channelOptions2["grpc.default_compression_algorithm"];
      this.maxReceiveMessageLength = (_a = channelOptions2["grpc.max_receive_message_length"]) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      if (compressionAlgorithmKey !== void 0) {
        if (isCompressionAlgorithmKey(compressionAlgorithmKey)) {
          const clientSelectedEncoding = compression_algorithms_1.CompressionAlgorithms[compressionAlgorithmKey];
          const serverSupportedEncodings = (_b = sharedFilterConfig.serverSupportedEncodingHeader) === null || _b === void 0 ? void 0 : _b.split(",");
          if (!serverSupportedEncodings || serverSupportedEncodings.includes(clientSelectedEncoding)) {
            this.currentCompressionAlgorithm = clientSelectedEncoding;
            this.sendCompression = getCompressionHandler(this.currentCompressionAlgorithm, -1);
          }
        } else {
          logging2.log(constants_1.LogVerbosity.ERROR, `Invalid value provided for grpc.default_compression_algorithm option: ${compressionAlgorithmKey}`);
        }
      }
    }
    async sendMetadata(metadata2) {
      const headers = await metadata2;
      headers.set("grpc-accept-encoding", "identity,deflate,gzip");
      headers.set("accept-encoding", "identity");
      if (this.currentCompressionAlgorithm === "identity") {
        headers.remove("grpc-encoding");
      } else {
        headers.set("grpc-encoding", this.currentCompressionAlgorithm);
      }
      return headers;
    }
    receiveMetadata(metadata2) {
      const receiveEncoding = metadata2.get("grpc-encoding");
      if (receiveEncoding.length > 0) {
        const encoding = receiveEncoding[0];
        if (typeof encoding === "string") {
          this.receiveCompression = getCompressionHandler(encoding, this.maxReceiveMessageLength);
        }
      }
      metadata2.remove("grpc-encoding");
      const serverSupportedEncodingsHeader = metadata2.get("grpc-accept-encoding")[0];
      if (serverSupportedEncodingsHeader) {
        this.sharedFilterConfig.serverSupportedEncodingHeader = serverSupportedEncodingsHeader;
        const serverSupportedEncodings = serverSupportedEncodingsHeader.split(",");
        if (!serverSupportedEncodings.includes(this.currentCompressionAlgorithm)) {
          this.sendCompression = new IdentityHandler();
          this.currentCompressionAlgorithm = "identity";
        }
      }
      metadata2.remove("grpc-accept-encoding");
      return metadata2;
    }
    async sendMessage(message) {
      var _a;
      const resolvedMessage = await message;
      let compress;
      if (this.sendCompression instanceof IdentityHandler) {
        compress = false;
      } else {
        compress = (((_a = resolvedMessage.flags) !== null && _a !== void 0 ? _a : 0) & 2) === 0;
      }
      return {
        message: await this.sendCompression.writeMessage(resolvedMessage.message, compress),
        flags: resolvedMessage.flags
      };
    }
    async receiveMessage(message) {
      return this.receiveCompression.readMessage(await message);
    }
  }
  compressionFilter.CompressionFilter = CompressionFilter;
  class CompressionFilterFactory {
    constructor(channel2, options) {
      this.options = options;
      this.sharedFilterConfig = {};
    }
    createFilter() {
      return new CompressionFilter(this.options, this.sharedFilterConfig);
    }
  }
  compressionFilter.CompressionFilterFactory = CompressionFilterFactory;
  return compressionFilter;
}
var loadBalancingCall = {};
var deadline = {};
var hasRequiredDeadline;
function requireDeadline() {
  if (hasRequiredDeadline) return deadline;
  hasRequiredDeadline = 1;
  Object.defineProperty(deadline, "__esModule", { value: true });
  deadline.minDeadline = minDeadline;
  deadline.getDeadlineTimeoutString = getDeadlineTimeoutString;
  deadline.getRelativeTimeout = getRelativeTimeout;
  deadline.deadlineToString = deadlineToString;
  function minDeadline(...deadlineList) {
    let minValue = Infinity;
    for (const deadline2 of deadlineList) {
      const deadlineMsecs = deadline2 instanceof Date ? deadline2.getTime() : deadline2;
      if (deadlineMsecs < minValue) {
        minValue = deadlineMsecs;
      }
    }
    return minValue;
  }
  const units = [
    ["m", 1],
    ["S", 1e3],
    ["M", 60 * 1e3],
    ["H", 60 * 60 * 1e3]
  ];
  function getDeadlineTimeoutString(deadline2) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (deadline2 instanceof Date) {
      deadline2 = deadline2.getTime();
    }
    const timeoutMs = Math.max(deadline2 - now, 0);
    for (const [unit, factor] of units) {
      const amount = timeoutMs / factor;
      if (amount < 1e8) {
        return String(Math.ceil(amount)) + unit;
      }
    }
    throw new Error("Deadline is too far in the future");
  }
  const MAX_TIMEOUT_TIME = 2147483647;
  function getRelativeTimeout(deadline2) {
    const deadlineMs = deadline2 instanceof Date ? deadline2.getTime() : deadline2;
    const now = (/* @__PURE__ */ new Date()).getTime();
    const timeout = deadlineMs - now;
    if (timeout < 0) {
      return 0;
    } else if (timeout > MAX_TIMEOUT_TIME) {
      return Infinity;
    } else {
      return timeout;
    }
  }
  function deadlineToString(deadline2) {
    if (deadline2 instanceof Date) {
      return deadline2.toISOString();
    } else {
      const dateDeadline = new Date(deadline2);
      if (Number.isNaN(dateDeadline.getTime())) {
        return "" + deadline2;
      } else {
        return dateDeadline.toISOString();
      }
    }
  }
  return deadline;
}
var controlPlaneStatus = {};
var hasRequiredControlPlaneStatus;
function requireControlPlaneStatus() {
  if (hasRequiredControlPlaneStatus) return controlPlaneStatus;
  hasRequiredControlPlaneStatus = 1;
  Object.defineProperty(controlPlaneStatus, "__esModule", { value: true });
  controlPlaneStatus.restrictControlPlaneStatusCode = restrictControlPlaneStatusCode;
  const constants_1 = requireConstants();
  const INAPPROPRIATE_CONTROL_PLANE_CODES = [
    constants_1.Status.OK,
    constants_1.Status.INVALID_ARGUMENT,
    constants_1.Status.NOT_FOUND,
    constants_1.Status.ALREADY_EXISTS,
    constants_1.Status.FAILED_PRECONDITION,
    constants_1.Status.ABORTED,
    constants_1.Status.OUT_OF_RANGE,
    constants_1.Status.DATA_LOSS
  ];
  function restrictControlPlaneStatusCode(code, details) {
    if (INAPPROPRIATE_CONTROL_PLANE_CODES.includes(code)) {
      return {
        code: constants_1.Status.INTERNAL,
        details: `Invalid status from control plane: ${code} ${constants_1.Status[code]} ${details}`
      };
    } else {
      return { code, details };
    }
  }
  return controlPlaneStatus;
}
var hasRequiredLoadBalancingCall;
function requireLoadBalancingCall() {
  if (hasRequiredLoadBalancingCall) return loadBalancingCall;
  hasRequiredLoadBalancingCall = 1;
  Object.defineProperty(loadBalancingCall, "__esModule", { value: true });
  loadBalancingCall.LoadBalancingCall = void 0;
  const connectivity_state_1 = requireConnectivityState();
  const constants_1 = requireConstants();
  const deadline_1 = requireDeadline();
  const metadata_1 = requireMetadata();
  const picker_1 = requirePicker();
  const uri_parser_1 = requireUriParser();
  const logging2 = requireLogging();
  const control_plane_status_1 = requireControlPlaneStatus();
  const http2 = require$$0$5;
  const TRACER_NAME = "load_balancing_call";
  class LoadBalancingCall {
    constructor(channel2, callConfig, methodName, host, credentials, deadline2, callNumber2) {
      var _a, _b;
      this.channel = channel2;
      this.callConfig = callConfig;
      this.methodName = methodName;
      this.host = host;
      this.credentials = credentials;
      this.deadline = deadline2;
      this.callNumber = callNumber2;
      this.child = null;
      this.readPending = false;
      this.pendingMessage = null;
      this.pendingHalfClose = false;
      this.ended = false;
      this.metadata = null;
      this.listener = null;
      this.onCallEnded = null;
      const splitPath = this.methodName.split("/");
      let serviceName = "";
      if (splitPath.length >= 2) {
        serviceName = splitPath[1];
      }
      const hostname = (_b = (_a = (0, uri_parser_1.splitHostPort)(this.host)) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : "localhost";
      this.serviceUrl = `https://${hostname}/${serviceName}`;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    outputStatus(status, progress) {
      var _a, _b;
      if (!this.ended) {
        this.ended = true;
        this.trace("ended with status: code=" + status.code + ' details="' + status.details + '"');
        const finalStatus = Object.assign(Object.assign({}, status), { progress });
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(finalStatus);
        (_b = this.onCallEnded) === null || _b === void 0 ? void 0 : _b.call(this, finalStatus.code);
      }
    }
    doPick() {
      var _a, _b;
      if (this.ended) {
        return;
      }
      if (!this.metadata) {
        throw new Error("doPick called before start");
      }
      this.trace("Pick called");
      const pickResult = this.channel.doPick(this.metadata, this.callConfig.pickInformation);
      const subchannelString = pickResult.subchannel ? "(" + pickResult.subchannel.getChannelzRef().id + ") " + pickResult.subchannel.getAddress() : "" + pickResult.subchannel;
      this.trace("Pick result: " + picker_1.PickResultType[pickResult.pickResultType] + " subchannel: " + subchannelString + " status: " + ((_a = pickResult.status) === null || _a === void 0 ? void 0 : _a.code) + " " + ((_b = pickResult.status) === null || _b === void 0 ? void 0 : _b.details));
      switch (pickResult.pickResultType) {
        case picker_1.PickResultType.COMPLETE:
          this.credentials.generateMetadata({ service_url: this.serviceUrl }).then((credsMetadata) => {
            var _a2, _b2, _c;
            if (this.ended) {
              this.trace("Credentials metadata generation finished after call ended");
              return;
            }
            const finalMetadata = this.metadata.clone();
            finalMetadata.merge(credsMetadata);
            if (finalMetadata.get("authorization").length > 1) {
              this.outputStatus({
                code: constants_1.Status.INTERNAL,
                details: '"authorization" metadata cannot have multiple values',
                metadata: new metadata_1.Metadata()
              }, "PROCESSED");
            }
            if (pickResult.subchannel.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
              this.trace("Picked subchannel " + subchannelString + " has state " + connectivity_state_1.ConnectivityState[pickResult.subchannel.getConnectivityState()] + " after getting credentials metadata. Retrying pick");
              this.doPick();
              return;
            }
            if (this.deadline !== Infinity) {
              finalMetadata.set("grpc-timeout", (0, deadline_1.getDeadlineTimeoutString)(this.deadline));
            }
            try {
              this.child = pickResult.subchannel.getRealSubchannel().createCall(finalMetadata, this.host, this.methodName, {
                onReceiveMetadata: (metadata2) => {
                  this.trace("Received metadata");
                  this.listener.onReceiveMetadata(metadata2);
                },
                onReceiveMessage: (message) => {
                  this.trace("Received message");
                  this.listener.onReceiveMessage(message);
                },
                onReceiveStatus: (status) => {
                  this.trace("Received status");
                  if (status.rstCode === http2.constants.NGHTTP2_REFUSED_STREAM) {
                    this.outputStatus(status, "REFUSED");
                  } else {
                    this.outputStatus(status, "PROCESSED");
                  }
                }
              });
            } catch (error2) {
              this.trace("Failed to start call on picked subchannel " + subchannelString + " with error " + error2.message);
              this.outputStatus({
                code: constants_1.Status.INTERNAL,
                details: "Failed to start HTTP/2 stream with error " + error2.message,
                metadata: new metadata_1.Metadata()
              }, "NOT_STARTED");
              return;
            }
            (_b2 = (_a2 = this.callConfig).onCommitted) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
            (_c = pickResult.onCallStarted) === null || _c === void 0 ? void 0 : _c.call(pickResult);
            this.onCallEnded = pickResult.onCallEnded;
            this.trace("Created child call [" + this.child.getCallNumber() + "]");
            if (this.readPending) {
              this.child.startRead();
            }
            if (this.pendingMessage) {
              this.child.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
            }
            if (this.pendingHalfClose) {
              this.child.halfClose();
            }
          }, (error2) => {
            const { code: code2, details: details2 } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(typeof error2.code === "number" ? error2.code : constants_1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${error2.message}`);
            this.outputStatus({
              code: code2,
              details: details2,
              metadata: new metadata_1.Metadata()
            }, "PROCESSED");
          });
          break;
        case picker_1.PickResultType.DROP:
          const { code, details } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
          setImmediate(() => {
            this.outputStatus({ code, details, metadata: pickResult.status.metadata }, "DROP");
          });
          break;
        case picker_1.PickResultType.TRANSIENT_FAILURE:
          if (this.metadata.getOptions().waitForReady) {
            this.channel.queueCallForPick(this);
          } else {
            const { code: code2, details: details2 } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
            setImmediate(() => {
              this.outputStatus({ code: code2, details: details2, metadata: pickResult.status.metadata }, "PROCESSED");
            });
          }
          break;
        case picker_1.PickResultType.QUEUE:
          this.channel.queueCallForPick(this);
      }
    }
    cancelWithStatus(status, details) {
      var _a;
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
      this.outputStatus({ code: status, details, metadata: new metadata_1.Metadata() }, "PROCESSED");
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.listener = listener;
      this.metadata = metadata2;
      this.doPick();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      if (this.child) {
        this.child.sendMessageWithContext(context, message);
      } else {
        this.pendingMessage = { context, message };
      }
    }
    startRead() {
      this.trace("startRead called");
      if (this.child) {
        this.child.startRead();
      } else {
        this.readPending = true;
      }
    }
    halfClose() {
      this.trace("halfClose called");
      if (this.child) {
        this.child.halfClose();
      } else {
        this.pendingHalfClose = true;
      }
    }
    setCredentials(credentials) {
      throw new Error("Method not implemented.");
    }
    getCallNumber() {
      return this.callNumber;
    }
  }
  loadBalancingCall.LoadBalancingCall = LoadBalancingCall;
  return loadBalancingCall;
}
var resolvingCall = {};
var hasRequiredResolvingCall;
function requireResolvingCall() {
  if (hasRequiredResolvingCall) return resolvingCall;
  hasRequiredResolvingCall = 1;
  Object.defineProperty(resolvingCall, "__esModule", { value: true });
  resolvingCall.ResolvingCall = void 0;
  const constants_1 = requireConstants();
  const deadline_1 = requireDeadline();
  const metadata_1 = requireMetadata();
  const logging2 = requireLogging();
  const control_plane_status_1 = requireControlPlaneStatus();
  const TRACER_NAME = "resolving_call";
  class ResolvingCall {
    constructor(channel2, method, options, filterStackFactory, credentials, callNumber2) {
      this.channel = channel2;
      this.method = method;
      this.filterStackFactory = filterStackFactory;
      this.credentials = credentials;
      this.callNumber = callNumber2;
      this.child = null;
      this.readPending = false;
      this.pendingMessage = null;
      this.pendingHalfClose = false;
      this.ended = false;
      this.readFilterPending = false;
      this.writeFilterPending = false;
      this.pendingChildStatus = null;
      this.metadata = null;
      this.listener = null;
      this.statusWatchers = [];
      this.deadlineTimer = setTimeout(() => {
      }, 0);
      this.filterStack = null;
      this.deadline = options.deadline;
      this.host = options.host;
      if (options.parentCall) {
        if (options.flags & constants_1.Propagate.CANCELLATION) {
          options.parentCall.on("cancelled", () => {
            this.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled by parent call");
          });
        }
        if (options.flags & constants_1.Propagate.DEADLINE) {
          this.trace("Propagating deadline from parent: " + options.parentCall.getDeadline());
          this.deadline = (0, deadline_1.minDeadline)(this.deadline, options.parentCall.getDeadline());
        }
      }
      this.trace("Created");
      this.runDeadlineTimer();
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    runDeadlineTimer() {
      clearTimeout(this.deadlineTimer);
      this.trace("Deadline: " + (0, deadline_1.deadlineToString)(this.deadline));
      const timeout = (0, deadline_1.getRelativeTimeout)(this.deadline);
      if (timeout !== Infinity) {
        this.trace("Deadline will be reached in " + timeout + "ms");
        const handleDeadline = () => {
          this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
        };
        if (timeout <= 0) {
          process.nextTick(handleDeadline);
        } else {
          this.deadlineTimer = setTimeout(handleDeadline, timeout);
        }
      }
    }
    outputStatus(status) {
      if (!this.ended) {
        this.ended = true;
        if (!this.filterStack) {
          this.filterStack = this.filterStackFactory.createFilter();
        }
        clearTimeout(this.deadlineTimer);
        const filteredStatus = this.filterStack.receiveTrailers(status);
        this.trace("ended with status: code=" + filteredStatus.code + ' details="' + filteredStatus.details + '"');
        this.statusWatchers.forEach((watcher) => watcher(filteredStatus));
        process.nextTick(() => {
          var _a;
          (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(filteredStatus);
        });
      }
    }
    sendMessageOnChild(context, message) {
      if (!this.child) {
        throw new Error("sendMessageonChild called with child not populated");
      }
      const child = this.child;
      this.writeFilterPending = true;
      this.filterStack.sendMessage(Promise.resolve({ message, flags: context.flags })).then((filteredMessage) => {
        this.writeFilterPending = false;
        child.sendMessageWithContext(context, filteredMessage.message);
        if (this.pendingHalfClose) {
          child.halfClose();
        }
      }, (status) => {
        this.cancelWithStatus(status.code, status.details);
      });
    }
    getConfig() {
      if (this.ended) {
        return;
      }
      if (!this.metadata || !this.listener) {
        throw new Error("getConfig called before start");
      }
      const configResult = this.channel.getConfig(this.method, this.metadata);
      if (configResult.type === "NONE") {
        this.channel.queueCallForConfig(this);
        return;
      } else if (configResult.type === "ERROR") {
        if (this.metadata.getOptions().waitForReady) {
          this.channel.queueCallForConfig(this);
        } else {
          this.outputStatus(configResult.error);
        }
        return;
      }
      const config = configResult.config;
      if (config.status !== constants_1.Status.OK) {
        const { code, details } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(config.status, "Failed to route call to method " + this.method);
        this.outputStatus({
          code,
          details,
          metadata: new metadata_1.Metadata()
        });
        return;
      }
      if (config.methodConfig.timeout) {
        const configDeadline = /* @__PURE__ */ new Date();
        configDeadline.setSeconds(configDeadline.getSeconds() + config.methodConfig.timeout.seconds);
        configDeadline.setMilliseconds(configDeadline.getMilliseconds() + config.methodConfig.timeout.nanos / 1e6);
        this.deadline = (0, deadline_1.minDeadline)(this.deadline, configDeadline);
        this.runDeadlineTimer();
      }
      this.filterStackFactory.push(config.dynamicFilterFactories);
      this.filterStack = this.filterStackFactory.createFilter();
      this.filterStack.sendMetadata(Promise.resolve(this.metadata)).then((filteredMetadata) => {
        this.child = this.channel.createInnerCall(config, this.method, this.host, this.credentials, this.deadline);
        this.trace("Created child [" + this.child.getCallNumber() + "]");
        this.child.start(filteredMetadata, {
          onReceiveMetadata: (metadata2) => {
            this.trace("Received metadata");
            this.listener.onReceiveMetadata(this.filterStack.receiveMetadata(metadata2));
          },
          onReceiveMessage: (message) => {
            this.trace("Received message");
            this.readFilterPending = true;
            this.filterStack.receiveMessage(message).then((filteredMesssage) => {
              this.trace("Finished filtering received message");
              this.readFilterPending = false;
              this.listener.onReceiveMessage(filteredMesssage);
              if (this.pendingChildStatus) {
                this.outputStatus(this.pendingChildStatus);
              }
            }, (status) => {
              this.cancelWithStatus(status.code, status.details);
            });
          },
          onReceiveStatus: (status) => {
            this.trace("Received status");
            if (this.readFilterPending) {
              this.pendingChildStatus = status;
            } else {
              this.outputStatus(status);
            }
          }
        });
        if (this.readPending) {
          this.child.startRead();
        }
        if (this.pendingMessage) {
          this.sendMessageOnChild(this.pendingMessage.context, this.pendingMessage.message);
        } else if (this.pendingHalfClose) {
          this.child.halfClose();
        }
      }, (status) => {
        this.outputStatus(status);
      });
    }
    reportResolverError(status) {
      var _a;
      if ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.getOptions().waitForReady) {
        this.channel.queueCallForConfig(this);
      } else {
        this.outputStatus(status);
      }
    }
    cancelWithStatus(status, details) {
      var _a;
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
      this.outputStatus({
        code: status,
        details,
        metadata: new metadata_1.Metadata()
      });
    }
    getPeer() {
      var _a, _b;
      return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.metadata = metadata2.clone();
      this.listener = listener;
      this.getConfig();
    }
    sendMessageWithContext(context, message) {
      this.trace("write() called with message of length " + message.length);
      if (this.child) {
        this.sendMessageOnChild(context, message);
      } else {
        this.pendingMessage = { context, message };
      }
    }
    startRead() {
      this.trace("startRead called");
      if (this.child) {
        this.child.startRead();
      } else {
        this.readPending = true;
      }
    }
    halfClose() {
      this.trace("halfClose called");
      if (this.child && !this.writeFilterPending) {
        this.child.halfClose();
      } else {
        this.pendingHalfClose = true;
      }
    }
    setCredentials(credentials) {
      this.credentials = this.credentials.compose(credentials);
    }
    addStatusWatcher(watcher) {
      this.statusWatchers.push(watcher);
    }
    getCallNumber() {
      return this.callNumber;
    }
  }
  resolvingCall.ResolvingCall = ResolvingCall;
  return resolvingCall;
}
var retryingCall = {};
var hasRequiredRetryingCall;
function requireRetryingCall() {
  if (hasRequiredRetryingCall) return retryingCall;
  hasRequiredRetryingCall = 1;
  Object.defineProperty(retryingCall, "__esModule", { value: true });
  retryingCall.RetryingCall = retryingCall.MessageBufferTracker = retryingCall.RetryThrottler = void 0;
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const logging2 = requireLogging();
  const TRACER_NAME = "retrying_call";
  class RetryThrottler {
    constructor(maxTokens, tokenRatio, previousRetryThrottler) {
      this.maxTokens = maxTokens;
      this.tokenRatio = tokenRatio;
      if (previousRetryThrottler) {
        this.tokens = previousRetryThrottler.tokens * (maxTokens / previousRetryThrottler.maxTokens);
      } else {
        this.tokens = maxTokens;
      }
    }
    addCallSucceeded() {
      this.tokens = Math.max(this.tokens + this.tokenRatio, this.maxTokens);
    }
    addCallFailed() {
      this.tokens = Math.min(this.tokens - 1, 0);
    }
    canRetryCall() {
      return this.tokens > this.maxTokens / 2;
    }
  }
  retryingCall.RetryThrottler = RetryThrottler;
  class MessageBufferTracker {
    constructor(totalLimit, limitPerCall) {
      this.totalLimit = totalLimit;
      this.limitPerCall = limitPerCall;
      this.totalAllocated = 0;
      this.allocatedPerCall = /* @__PURE__ */ new Map();
    }
    allocate(size, callId) {
      var _a;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (this.limitPerCall - currentPerCall < size || this.totalLimit - this.totalAllocated < size) {
        return false;
      }
      this.allocatedPerCall.set(callId, currentPerCall + size);
      this.totalAllocated += size;
      return true;
    }
    free(size, callId) {
      var _a;
      if (this.totalAllocated < size) {
        throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > total allocated ${this.totalAllocated}`);
      }
      this.totalAllocated -= size;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (currentPerCall < size) {
        throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > allocated for call ${currentPerCall}`);
      }
      this.allocatedPerCall.set(callId, currentPerCall - size);
    }
    freeAll(callId) {
      var _a;
      const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
      if (this.totalAllocated < currentPerCall) {
        throw new Error(`Invalid buffer allocation state: call ${callId} allocated ${currentPerCall} > total allocated ${this.totalAllocated}`);
      }
      this.totalAllocated -= currentPerCall;
      this.allocatedPerCall.delete(callId);
    }
  }
  retryingCall.MessageBufferTracker = MessageBufferTracker;
  const PREVIONS_RPC_ATTEMPTS_METADATA_KEY = "grpc-previous-rpc-attempts";
  class RetryingCall {
    constructor(channel2, callConfig, methodName, host, credentials, deadline2, callNumber2, bufferTracker, retryThrottler) {
      this.channel = channel2;
      this.callConfig = callConfig;
      this.methodName = methodName;
      this.host = host;
      this.credentials = credentials;
      this.deadline = deadline2;
      this.callNumber = callNumber2;
      this.bufferTracker = bufferTracker;
      this.retryThrottler = retryThrottler;
      this.listener = null;
      this.initialMetadata = null;
      this.underlyingCalls = [];
      this.writeBuffer = [];
      this.writeBufferOffset = 0;
      this.readStarted = false;
      this.transparentRetryUsed = false;
      this.attempts = 0;
      this.hedgingTimer = null;
      this.committedCallIndex = null;
      this.initialRetryBackoffSec = 0;
      this.nextRetryBackoffSec = 0;
      if (callConfig.methodConfig.retryPolicy) {
        this.state = "RETRY";
        const retryPolicy = callConfig.methodConfig.retryPolicy;
        this.nextRetryBackoffSec = this.initialRetryBackoffSec = Number(retryPolicy.initialBackoff.substring(0, retryPolicy.initialBackoff.length - 1));
      } else if (callConfig.methodConfig.hedgingPolicy) {
        this.state = "HEDGING";
      } else {
        this.state = "TRANSPARENT_ONLY";
      }
    }
    getCallNumber() {
      return this.callNumber;
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    reportStatus(statusObject) {
      this.trace("ended with status: code=" + statusObject.code + ' details="' + statusObject.details + '"');
      this.bufferTracker.freeAll(this.callNumber);
      this.writeBufferOffset = this.writeBufferOffset + this.writeBuffer.length;
      this.writeBuffer = [];
      process.nextTick(() => {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus({
          code: statusObject.code,
          details: statusObject.details,
          metadata: statusObject.metadata
        });
      });
    }
    cancelWithStatus(status, details) {
      this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
      this.reportStatus({ code: status, details, metadata: new metadata_1.Metadata() });
      for (const { call: call2 } of this.underlyingCalls) {
        call2.cancelWithStatus(status, details);
      }
    }
    getPeer() {
      if (this.committedCallIndex !== null) {
        return this.underlyingCalls[this.committedCallIndex].call.getPeer();
      } else {
        return "unknown";
      }
    }
    getBufferEntry(messageIndex) {
      var _a;
      return (_a = this.writeBuffer[messageIndex - this.writeBufferOffset]) !== null && _a !== void 0 ? _a : {
        entryType: "FREED",
        allocated: false
      };
    }
    getNextBufferIndex() {
      return this.writeBufferOffset + this.writeBuffer.length;
    }
    clearSentMessages() {
      if (this.state !== "COMMITTED") {
        return;
      }
      const earliestNeededMessageIndex = this.underlyingCalls[this.committedCallIndex].nextMessageToSend;
      for (let messageIndex = this.writeBufferOffset; messageIndex < earliestNeededMessageIndex; messageIndex++) {
        const bufferEntry = this.getBufferEntry(messageIndex);
        if (bufferEntry.allocated) {
          this.bufferTracker.free(bufferEntry.message.message.length, this.callNumber);
        }
      }
      this.writeBuffer = this.writeBuffer.slice(earliestNeededMessageIndex - this.writeBufferOffset);
      this.writeBufferOffset = earliestNeededMessageIndex;
    }
    commitCall(index) {
      if (this.state === "COMMITTED") {
        return;
      }
      if (this.underlyingCalls[index].state === "COMPLETED") {
        return;
      }
      this.trace("Committing call [" + this.underlyingCalls[index].call.getCallNumber() + "] at index " + index);
      this.state = "COMMITTED";
      this.committedCallIndex = index;
      for (let i = 0; i < this.underlyingCalls.length; i++) {
        if (i === index) {
          continue;
        }
        if (this.underlyingCalls[i].state === "COMPLETED") {
          continue;
        }
        this.underlyingCalls[i].state = "COMPLETED";
        this.underlyingCalls[i].call.cancelWithStatus(constants_1.Status.CANCELLED, "Discarded in favor of other hedged attempt");
      }
      this.clearSentMessages();
    }
    commitCallWithMostMessages() {
      if (this.state === "COMMITTED") {
        return;
      }
      let mostMessages = -1;
      let callWithMostMessages = -1;
      for (const [index, childCall] of this.underlyingCalls.entries()) {
        if (childCall.state === "ACTIVE" && childCall.nextMessageToSend > mostMessages) {
          mostMessages = childCall.nextMessageToSend;
          callWithMostMessages = index;
        }
      }
      if (callWithMostMessages === -1) {
        this.state = "TRANSPARENT_ONLY";
      } else {
        this.commitCall(callWithMostMessages);
      }
    }
    isStatusCodeInList(list, code) {
      return list.some((value) => value === code || value.toString().toLowerCase() === constants_1.Status[code].toLowerCase());
    }
    getNextRetryBackoffMs() {
      var _a;
      const retryPolicy = (_a = this.callConfig) === null || _a === void 0 ? void 0 : _a.methodConfig.retryPolicy;
      if (!retryPolicy) {
        return 0;
      }
      const nextBackoffMs = Math.random() * this.nextRetryBackoffSec * 1e3;
      const maxBackoffSec = Number(retryPolicy.maxBackoff.substring(0, retryPolicy.maxBackoff.length - 1));
      this.nextRetryBackoffSec = Math.min(this.nextRetryBackoffSec * retryPolicy.backoffMultiplier, maxBackoffSec);
      return nextBackoffMs;
    }
    maybeRetryCall(pushback, callback) {
      if (this.state !== "RETRY") {
        callback(false);
        return;
      }
      const retryPolicy = this.callConfig.methodConfig.retryPolicy;
      if (this.attempts >= Math.min(retryPolicy.maxAttempts, 5)) {
        callback(false);
        return;
      }
      let retryDelayMs;
      if (pushback === null) {
        retryDelayMs = this.getNextRetryBackoffMs();
      } else if (pushback < 0) {
        this.state = "TRANSPARENT_ONLY";
        callback(false);
        return;
      } else {
        retryDelayMs = pushback;
        this.nextRetryBackoffSec = this.initialRetryBackoffSec;
      }
      setTimeout(() => {
        var _a, _b;
        if (this.state !== "RETRY") {
          callback(false);
          return;
        }
        if ((_b = (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.canRetryCall()) !== null && _b !== void 0 ? _b : true) {
          callback(true);
          this.attempts += 1;
          this.startNewAttempt();
        }
      }, retryDelayMs);
    }
    countActiveCalls() {
      let count = 0;
      for (const call2 of this.underlyingCalls) {
        if ((call2 === null || call2 === void 0 ? void 0 : call2.state) === "ACTIVE") {
          count += 1;
        }
      }
      return count;
    }
    handleProcessedStatus(status, callIndex, pushback) {
      var _a, _b, _c;
      switch (this.state) {
        case "COMMITTED":
        case "TRANSPARENT_ONLY":
          this.commitCall(callIndex);
          this.reportStatus(status);
          break;
        case "HEDGING":
          if (this.isStatusCodeInList((_a = this.callConfig.methodConfig.hedgingPolicy.nonFatalStatusCodes) !== null && _a !== void 0 ? _a : [], status.code)) {
            (_b = this.retryThrottler) === null || _b === void 0 ? void 0 : _b.addCallFailed();
            let delayMs;
            if (pushback === null) {
              delayMs = 0;
            } else if (pushback < 0) {
              this.state = "TRANSPARENT_ONLY";
              this.commitCall(callIndex);
              this.reportStatus(status);
              return;
            } else {
              delayMs = pushback;
            }
            setTimeout(() => {
              this.maybeStartHedgingAttempt();
              if (this.countActiveCalls() === 0) {
                this.commitCall(callIndex);
                this.reportStatus(status);
              }
            }, delayMs);
          } else {
            this.commitCall(callIndex);
            this.reportStatus(status);
          }
          break;
        case "RETRY":
          if (this.isStatusCodeInList(this.callConfig.methodConfig.retryPolicy.retryableStatusCodes, status.code)) {
            (_c = this.retryThrottler) === null || _c === void 0 ? void 0 : _c.addCallFailed();
            this.maybeRetryCall(pushback, (retried) => {
              if (!retried) {
                this.commitCall(callIndex);
                this.reportStatus(status);
              }
            });
          } else {
            this.commitCall(callIndex);
            this.reportStatus(status);
          }
          break;
      }
    }
    getPushback(metadata2) {
      const mdValue = metadata2.get("grpc-retry-pushback-ms");
      if (mdValue.length === 0) {
        return null;
      }
      try {
        return parseInt(mdValue[0]);
      } catch (e) {
        return -1;
      }
    }
    handleChildStatus(status, callIndex) {
      var _a;
      if (this.underlyingCalls[callIndex].state === "COMPLETED") {
        return;
      }
      this.trace("state=" + this.state + " handling status with progress " + status.progress + " from child [" + this.underlyingCalls[callIndex].call.getCallNumber() + "] in state " + this.underlyingCalls[callIndex].state);
      this.underlyingCalls[callIndex].state = "COMPLETED";
      if (status.code === constants_1.Status.OK) {
        (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.addCallSucceeded();
        this.commitCall(callIndex);
        this.reportStatus(status);
        return;
      }
      if (this.state === "COMMITTED") {
        this.reportStatus(status);
        return;
      }
      const pushback = this.getPushback(status.metadata);
      switch (status.progress) {
        case "NOT_STARTED":
          this.startNewAttempt();
          break;
        case "REFUSED":
          if (this.transparentRetryUsed) {
            this.handleProcessedStatus(status, callIndex, pushback);
          } else {
            this.transparentRetryUsed = true;
            this.startNewAttempt();
          }
          break;
        case "DROP":
          this.commitCall(callIndex);
          this.reportStatus(status);
          break;
        case "PROCESSED":
          this.handleProcessedStatus(status, callIndex, pushback);
          break;
      }
    }
    maybeStartHedgingAttempt() {
      if (this.state !== "HEDGING") {
        return;
      }
      if (!this.callConfig.methodConfig.hedgingPolicy) {
        return;
      }
      const hedgingPolicy = this.callConfig.methodConfig.hedgingPolicy;
      if (this.attempts >= Math.min(hedgingPolicy.maxAttempts, 5)) {
        return;
      }
      this.attempts += 1;
      this.startNewAttempt();
      this.maybeStartHedgingTimer();
    }
    maybeStartHedgingTimer() {
      var _a, _b, _c;
      if (this.hedgingTimer) {
        clearTimeout(this.hedgingTimer);
      }
      if (this.state !== "HEDGING") {
        return;
      }
      if (!this.callConfig.methodConfig.hedgingPolicy) {
        return;
      }
      const hedgingPolicy = this.callConfig.methodConfig.hedgingPolicy;
      if (this.attempts >= Math.min(hedgingPolicy.maxAttempts, 5)) {
        return;
      }
      const hedgingDelayString = (_a = hedgingPolicy.hedgingDelay) !== null && _a !== void 0 ? _a : "0s";
      const hedgingDelaySec = Number(hedgingDelayString.substring(0, hedgingDelayString.length - 1));
      this.hedgingTimer = setTimeout(() => {
        this.maybeStartHedgingAttempt();
      }, hedgingDelaySec * 1e3);
      (_c = (_b = this.hedgingTimer).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    startNewAttempt() {
      const child = this.channel.createLoadBalancingCall(this.callConfig, this.methodName, this.host, this.credentials, this.deadline);
      this.trace("Created child call [" + child.getCallNumber() + "] for attempt " + this.attempts);
      const index = this.underlyingCalls.length;
      this.underlyingCalls.push({
        state: "ACTIVE",
        call: child,
        nextMessageToSend: 0
      });
      const previousAttempts = this.attempts - 1;
      const initialMetadata = this.initialMetadata.clone();
      if (previousAttempts > 0) {
        initialMetadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
      }
      let receivedMetadata = false;
      child.start(initialMetadata, {
        onReceiveMetadata: (metadata2) => {
          this.trace("Received metadata from child [" + child.getCallNumber() + "]");
          this.commitCall(index);
          receivedMetadata = true;
          if (previousAttempts > 0) {
            metadata2.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
          }
          if (this.underlyingCalls[index].state === "ACTIVE") {
            this.listener.onReceiveMetadata(metadata2);
          }
        },
        onReceiveMessage: (message) => {
          this.trace("Received message from child [" + child.getCallNumber() + "]");
          this.commitCall(index);
          if (this.underlyingCalls[index].state === "ACTIVE") {
            this.listener.onReceiveMessage(message);
          }
        },
        onReceiveStatus: (status) => {
          this.trace("Received status from child [" + child.getCallNumber() + "]");
          if (!receivedMetadata && previousAttempts > 0) {
            status.metadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
          }
          this.handleChildStatus(status, index);
        }
      });
      this.sendNextChildMessage(index);
      if (this.readStarted) {
        child.startRead();
      }
    }
    start(metadata2, listener) {
      this.trace("start called");
      this.listener = listener;
      this.initialMetadata = metadata2;
      this.attempts += 1;
      this.startNewAttempt();
      this.maybeStartHedgingTimer();
    }
    handleChildWriteCompleted(childIndex) {
      var _a, _b;
      const childCall = this.underlyingCalls[childIndex];
      const messageIndex = childCall.nextMessageToSend;
      (_b = (_a = this.getBufferEntry(messageIndex)).callback) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.clearSentMessages();
      childCall.nextMessageToSend += 1;
      this.sendNextChildMessage(childIndex);
    }
    sendNextChildMessage(childIndex) {
      const childCall = this.underlyingCalls[childIndex];
      if (childCall.state === "COMPLETED") {
        return;
      }
      if (this.getBufferEntry(childCall.nextMessageToSend)) {
        const bufferEntry = this.getBufferEntry(childCall.nextMessageToSend);
        switch (bufferEntry.entryType) {
          case "MESSAGE":
            childCall.call.sendMessageWithContext({
              callback: (error2) => {
                this.handleChildWriteCompleted(childIndex);
              }
            }, bufferEntry.message.message);
            break;
          case "HALF_CLOSE":
            childCall.nextMessageToSend += 1;
            childCall.call.halfClose();
            break;
        }
      }
    }
    sendMessageWithContext(context, message) {
      var _a;
      this.trace("write() called with message of length " + message.length);
      const writeObj = {
        message,
        flags: context.flags
      };
      const messageIndex = this.getNextBufferIndex();
      const bufferEntry = {
        entryType: "MESSAGE",
        message: writeObj,
        allocated: this.bufferTracker.allocate(message.length, this.callNumber)
      };
      this.writeBuffer.push(bufferEntry);
      if (bufferEntry.allocated) {
        (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
        for (const [callIndex, call2] of this.underlyingCalls.entries()) {
          if (call2.state === "ACTIVE" && call2.nextMessageToSend === messageIndex) {
            call2.call.sendMessageWithContext({
              callback: (error2) => {
                this.handleChildWriteCompleted(callIndex);
              }
            }, message);
          }
        }
      } else {
        this.commitCallWithMostMessages();
        if (this.committedCallIndex === null) {
          return;
        }
        const call2 = this.underlyingCalls[this.committedCallIndex];
        bufferEntry.callback = context.callback;
        if (call2.state === "ACTIVE" && call2.nextMessageToSend === messageIndex) {
          call2.call.sendMessageWithContext({
            callback: (error2) => {
              this.handleChildWriteCompleted(this.committedCallIndex);
            }
          }, message);
        }
      }
    }
    startRead() {
      this.trace("startRead called");
      this.readStarted = true;
      for (const underlyingCall of this.underlyingCalls) {
        if ((underlyingCall === null || underlyingCall === void 0 ? void 0 : underlyingCall.state) === "ACTIVE") {
          underlyingCall.call.startRead();
        }
      }
    }
    halfClose() {
      this.trace("halfClose called");
      const halfCloseIndex = this.getNextBufferIndex();
      this.writeBuffer.push({
        entryType: "HALF_CLOSE",
        allocated: false
      });
      for (const call2 of this.underlyingCalls) {
        if ((call2 === null || call2 === void 0 ? void 0 : call2.state) === "ACTIVE" && call2.nextMessageToSend === halfCloseIndex) {
          call2.nextMessageToSend += 1;
          call2.call.halfClose();
        }
      }
    }
    setCredentials(newCredentials) {
      throw new Error("Method not implemented.");
    }
    getMethod() {
      return this.methodName;
    }
    getHost() {
      return this.host;
    }
  }
  retryingCall.RetryingCall = RetryingCall;
  return retryingCall;
}
var subchannelInterface = {};
var hasRequiredSubchannelInterface;
function requireSubchannelInterface() {
  if (hasRequiredSubchannelInterface) return subchannelInterface;
  hasRequiredSubchannelInterface = 1;
  Object.defineProperty(subchannelInterface, "__esModule", { value: true });
  subchannelInterface.BaseSubchannelWrapper = void 0;
  class BaseSubchannelWrapper {
    constructor(child) {
      this.child = child;
    }
    getConnectivityState() {
      return this.child.getConnectivityState();
    }
    addConnectivityStateListener(listener) {
      this.child.addConnectivityStateListener(listener);
    }
    removeConnectivityStateListener(listener) {
      this.child.removeConnectivityStateListener(listener);
    }
    startConnecting() {
      this.child.startConnecting();
    }
    getAddress() {
      return this.child.getAddress();
    }
    throttleKeepalive(newKeepaliveTime) {
      this.child.throttleKeepalive(newKeepaliveTime);
    }
    ref() {
      this.child.ref();
    }
    unref() {
      this.child.unref();
    }
    getChannelzRef() {
      return this.child.getChannelzRef();
    }
    getRealSubchannel() {
      return this.child.getRealSubchannel();
    }
    realSubchannelEquals(other) {
      return this.getRealSubchannel() === other.getRealSubchannel();
    }
  }
  subchannelInterface.BaseSubchannelWrapper = BaseSubchannelWrapper;
  return subchannelInterface;
}
var hasRequiredInternalChannel;
function requireInternalChannel() {
  if (hasRequiredInternalChannel) return internalChannel;
  hasRequiredInternalChannel = 1;
  Object.defineProperty(internalChannel, "__esModule", { value: true });
  internalChannel.InternalChannel = void 0;
  const channel_credentials_1 = requireChannelCredentials();
  const resolving_load_balancer_1 = requireResolvingLoadBalancer();
  const subchannel_pool_1 = requireSubchannelPool();
  const picker_1 = requirePicker();
  const constants_1 = requireConstants();
  const filter_stack_1 = requireFilterStack();
  const compression_filter_1 = requireCompressionFilter();
  const resolver_1 = requireResolver();
  const logging_1 = requireLogging();
  const http_proxy_1 = requireHttp_proxy();
  const uri_parser_1 = requireUriParser();
  const connectivity_state_1 = requireConnectivityState();
  const channelz_1 = requireChannelz();
  const load_balancing_call_1 = requireLoadBalancingCall();
  const deadline_1 = requireDeadline();
  const resolving_call_1 = requireResolvingCall();
  const call_number_1 = requireCallNumber();
  const control_plane_status_1 = requireControlPlaneStatus();
  const retrying_call_1 = requireRetryingCall();
  const subchannel_interface_1 = requireSubchannelInterface();
  const MAX_TIMEOUT_TIME = 2147483647;
  const MIN_IDLE_TIMEOUT_MS = 1e3;
  const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1e3;
  const RETRY_THROTTLER_MAP = /* @__PURE__ */ new Map();
  const DEFAULT_RETRY_BUFFER_SIZE_BYTES = 1 << 24;
  const DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES = 1 << 20;
  class ChannelSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
    constructor(childSubchannel, channel2) {
      super(childSubchannel);
      this.channel = channel2;
      this.refCount = 0;
      this.subchannelStateListener = (subchannel2, previousState, newState, keepaliveTime) => {
        channel2.throttleKeepalive(keepaliveTime);
      };
      childSubchannel.addConnectivityStateListener(this.subchannelStateListener);
    }
    ref() {
      this.child.ref();
      this.refCount += 1;
    }
    unref() {
      this.child.unref();
      this.refCount -= 1;
      if (this.refCount <= 0) {
        this.child.removeConnectivityStateListener(this.subchannelStateListener);
        this.channel.removeWrappedSubchannel(this);
      }
    }
  }
  class InternalChannel {
    constructor(target, credentials, options) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      this.credentials = credentials;
      this.options = options;
      this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
      this.currentPicker = new picker_1.UnavailablePicker();
      this.configSelectionQueue = [];
      this.pickQueue = [];
      this.connectivityStateWatchers = [];
      this.configSelector = null;
      this.currentResolutionError = null;
      this.wrappedSubchannels = /* @__PURE__ */ new Set();
      this.callCount = 0;
      this.idleTimer = null;
      this.channelzEnabled = true;
      this.callTracker = new channelz_1.ChannelzCallTracker();
      this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
      if (typeof target !== "string") {
        throw new TypeError("Channel target must be a string");
      }
      if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
        throw new TypeError("Channel credentials must be a ChannelCredentials object");
      }
      if (options) {
        if (typeof options !== "object") {
          throw new TypeError("Channel options must be an object");
        }
      }
      this.originalTarget = target;
      const originalTargetUri = (0, uri_parser_1.parseUri)(target);
      if (originalTargetUri === null) {
        throw new Error(`Could not parse target name "${target}"`);
      }
      const defaultSchemeMapResult = (0, resolver_1.mapUriDefaultScheme)(originalTargetUri);
      if (defaultSchemeMapResult === null) {
        throw new Error(`Could not find a default scheme for target name "${target}"`);
      }
      this.callRefTimer = setInterval(() => {
      }, MAX_TIMEOUT_TIME);
      (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      if (this.options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
      }
      this.channelzTrace = new channelz_1.ChannelzTrace();
      this.channelzRef = (0, channelz_1.registerChannelzChannel)(target, () => this.getChannelzInfo(), this.channelzEnabled);
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Channel created");
      }
      if (this.options["grpc.default_authority"]) {
        this.defaultAuthority = this.options["grpc.default_authority"];
      } else {
        this.defaultAuthority = (0, resolver_1.getDefaultAuthority)(defaultSchemeMapResult);
      }
      const proxyMapResult = (0, http_proxy_1.mapProxyName)(defaultSchemeMapResult, options);
      this.target = proxyMapResult.target;
      this.options = Object.assign({}, this.options, proxyMapResult.extraOptions);
      this.subchannelPool = (0, subchannel_pool_1.getSubchannelPool)(((_c = options["grpc.use_local_subchannel_pool"]) !== null && _c !== void 0 ? _c : 0) === 0);
      this.retryBufferTracker = new retrying_call_1.MessageBufferTracker((_d = options["grpc.retry_buffer_size"]) !== null && _d !== void 0 ? _d : DEFAULT_RETRY_BUFFER_SIZE_BYTES, (_e = options["grpc.per_rpc_retry_buffer_size"]) !== null && _e !== void 0 ? _e : DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES);
      this.keepaliveTime = (_f = options["grpc.keepalive_time_ms"]) !== null && _f !== void 0 ? _f : -1;
      this.idleTimeoutMs = Math.max((_g = options["grpc.client_idle_timeout_ms"]) !== null && _g !== void 0 ? _g : DEFAULT_IDLE_TIMEOUT_MS, MIN_IDLE_TIMEOUT_MS);
      const channelControlHelper = {
        createSubchannel: (subchannelAddress2, subchannelArgs) => {
          const subchannel2 = this.subchannelPool.getOrCreateSubchannel(this.target, subchannelAddress2, Object.assign({}, this.options, subchannelArgs), this.credentials);
          subchannel2.throttleKeepalive(this.keepaliveTime);
          if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", "Created subchannel or used existing subchannel", subchannel2.getChannelzRef());
          }
          const wrappedSubchannel = new ChannelSubchannelWrapper(subchannel2, this);
          this.wrappedSubchannels.add(wrappedSubchannel);
          return wrappedSubchannel;
        },
        updateState: (connectivityState2, picker2) => {
          this.currentPicker = picker2;
          const queueCopy = this.pickQueue.slice();
          this.pickQueue = [];
          if (queueCopy.length > 0) {
            this.callRefTimerUnref();
          }
          for (const call2 of queueCopy) {
            call2.doPick();
          }
          this.updateState(connectivityState2);
        },
        requestReresolution: () => {
          throw new Error("Resolving load balancer should never call requestReresolution");
        },
        addChannelzChild: (child) => {
          if (this.channelzEnabled) {
            this.childrenTracker.refChild(child);
          }
        },
        removeChannelzChild: (child) => {
          if (this.channelzEnabled) {
            this.childrenTracker.unrefChild(child);
          }
        }
      };
      this.resolvingLoadBalancer = new resolving_load_balancer_1.ResolvingLoadBalancer(this.target, channelControlHelper, options, (serviceConfig2, configSelector) => {
        if (serviceConfig2.retryThrottling) {
          RETRY_THROTTLER_MAP.set(this.getTarget(), new retrying_call_1.RetryThrottler(serviceConfig2.retryThrottling.maxTokens, serviceConfig2.retryThrottling.tokenRatio, RETRY_THROTTLER_MAP.get(this.getTarget())));
        } else {
          RETRY_THROTTLER_MAP.delete(this.getTarget());
        }
        if (this.channelzEnabled) {
          this.channelzTrace.addTrace("CT_INFO", "Address resolution succeeded");
        }
        this.configSelector = configSelector;
        this.currentResolutionError = null;
        process.nextTick(() => {
          const localQueue = this.configSelectionQueue;
          this.configSelectionQueue = [];
          if (localQueue.length > 0) {
            this.callRefTimerUnref();
          }
          for (const call2 of localQueue) {
            call2.getConfig();
          }
        });
      }, (status) => {
        if (this.channelzEnabled) {
          this.channelzTrace.addTrace("CT_WARNING", "Address resolution failed with code " + status.code + ' and details "' + status.details + '"');
        }
        if (this.configSelectionQueue.length > 0) {
          this.trace("Name resolution failed with calls queued for config selection");
        }
        if (this.configSelector === null) {
          this.currentResolutionError = Object.assign(Object.assign({}, (0, control_plane_status_1.restrictControlPlaneStatusCode)(status.code, status.details)), { metadata: status.metadata });
        }
        const localQueue = this.configSelectionQueue;
        this.configSelectionQueue = [];
        if (localQueue.length > 0) {
          this.callRefTimerUnref();
        }
        for (const call2 of localQueue) {
          call2.reportResolverError(status);
        }
      });
      this.filterStackFactory = new filter_stack_1.FilterStackFactory([
        new compression_filter_1.CompressionFilterFactory(this, this.options)
      ]);
      this.trace("Channel constructed with options " + JSON.stringify(options, void 0, 2));
      const error2 = new Error();
      (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "channel_stacktrace", "(" + this.channelzRef.id + ") Channel constructed \n" + ((_h = error2.stack) === null || _h === void 0 ? void 0 : _h.substring(error2.stack.indexOf("\n") + 1)));
      this.lastActivityTimestamp = /* @__PURE__ */ new Date();
    }
    getChannelzInfo() {
      return {
        target: this.originalTarget,
        state: this.connectivityState,
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        children: this.childrenTracker.getChildLists()
      };
    }
    trace(text, verbosityOverride) {
      (0, logging_1.trace)(verbosityOverride !== null && verbosityOverride !== void 0 ? verbosityOverride : constants_1.LogVerbosity.DEBUG, "channel", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + text);
    }
    callRefTimerRef() {
      var _a, _b, _c, _d;
      if (!((_b = (_a = this.callRefTimer).hasRef) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        this.trace("callRefTimer.ref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
        (_d = (_c = this.callRefTimer).ref) === null || _d === void 0 ? void 0 : _d.call(_c);
      }
    }
    callRefTimerUnref() {
      var _a, _b;
      if (!this.callRefTimer.hasRef || this.callRefTimer.hasRef()) {
        this.trace("callRefTimer.unref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
        (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    }
    removeConnectivityStateWatcher(watcherObject) {
      const watcherIndex = this.connectivityStateWatchers.findIndex((value) => value === watcherObject);
      if (watcherIndex >= 0) {
        this.connectivityStateWatchers.splice(watcherIndex, 1);
      }
    }
    updateState(newState) {
      (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "connectivity_state", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Connectivity state change to " + connectivity_state_1.ConnectivityState[newState]);
      }
      this.connectivityState = newState;
      const watchersCopy = this.connectivityStateWatchers.slice();
      for (const watcherObject of watchersCopy) {
        if (newState !== watcherObject.currentState) {
          if (watcherObject.timer) {
            clearTimeout(watcherObject.timer);
          }
          this.removeConnectivityStateWatcher(watcherObject);
          watcherObject.callback();
        }
      }
      if (newState !== connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
        this.currentResolutionError = null;
      }
    }
    throttleKeepalive(newKeepaliveTime) {
      if (newKeepaliveTime > this.keepaliveTime) {
        this.keepaliveTime = newKeepaliveTime;
        for (const wrappedSubchannel of this.wrappedSubchannels) {
          wrappedSubchannel.throttleKeepalive(newKeepaliveTime);
        }
      }
    }
    removeWrappedSubchannel(wrappedSubchannel) {
      this.wrappedSubchannels.delete(wrappedSubchannel);
    }
    doPick(metadata2, extraPickInfo) {
      return this.currentPicker.pick({
        metadata: metadata2,
        extraPickInfo
      });
    }
    queueCallForPick(call2) {
      this.pickQueue.push(call2);
      this.callRefTimerRef();
    }
    getConfig(method, metadata2) {
      this.resolvingLoadBalancer.exitIdle();
      if (this.configSelector) {
        return {
          type: "SUCCESS",
          config: this.configSelector(method, metadata2)
        };
      } else {
        if (this.currentResolutionError) {
          return {
            type: "ERROR",
            error: this.currentResolutionError
          };
        } else {
          return {
            type: "NONE"
          };
        }
      }
    }
    queueCallForConfig(call2) {
      this.configSelectionQueue.push(call2);
      this.callRefTimerRef();
    }
    enterIdle() {
      this.resolvingLoadBalancer.destroy();
      this.updateState(connectivity_state_1.ConnectivityState.IDLE);
      this.currentPicker = new picker_1.QueuePicker(this.resolvingLoadBalancer);
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
    }
    startIdleTimeout(timeoutMs) {
      var _a, _b;
      this.idleTimer = setTimeout(() => {
        if (this.callCount > 0) {
          this.startIdleTimeout(this.idleTimeoutMs);
          return;
        }
        const now = /* @__PURE__ */ new Date();
        const timeSinceLastActivity = now.valueOf() - this.lastActivityTimestamp.valueOf();
        if (timeSinceLastActivity >= this.idleTimeoutMs) {
          this.trace("Idle timer triggered after " + this.idleTimeoutMs + "ms of inactivity");
          this.enterIdle();
        } else {
          this.startIdleTimeout(this.idleTimeoutMs - timeSinceLastActivity);
        }
      }, timeoutMs);
      (_b = (_a = this.idleTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    maybeStartIdleTimer() {
      if (this.connectivityState !== connectivity_state_1.ConnectivityState.SHUTDOWN && !this.idleTimer) {
        this.startIdleTimeout(this.idleTimeoutMs);
      }
    }
    onCallStart() {
      if (this.channelzEnabled) {
        this.callTracker.addCallStarted();
      }
      this.callCount += 1;
    }
    onCallEnd(status) {
      if (this.channelzEnabled) {
        if (status.code === constants_1.Status.OK) {
          this.callTracker.addCallSucceeded();
        } else {
          this.callTracker.addCallFailed();
        }
      }
      this.callCount -= 1;
      this.lastActivityTimestamp = /* @__PURE__ */ new Date();
      this.maybeStartIdleTimer();
    }
    createLoadBalancingCall(callConfig, method, host, credentials, deadline2) {
      const callNumber2 = (0, call_number_1.getNextCallNumber)();
      this.trace("createLoadBalancingCall [" + callNumber2 + '] method="' + method + '"');
      return new load_balancing_call_1.LoadBalancingCall(this, callConfig, method, host, credentials, deadline2, callNumber2);
    }
    createRetryingCall(callConfig, method, host, credentials, deadline2) {
      const callNumber2 = (0, call_number_1.getNextCallNumber)();
      this.trace("createRetryingCall [" + callNumber2 + '] method="' + method + '"');
      return new retrying_call_1.RetryingCall(this, callConfig, method, host, credentials, deadline2, callNumber2, this.retryBufferTracker, RETRY_THROTTLER_MAP.get(this.getTarget()));
    }
    createInnerCall(callConfig, method, host, credentials, deadline2) {
      if (this.options["grpc.enable_retries"] === 0) {
        return this.createLoadBalancingCall(callConfig, method, host, credentials, deadline2);
      } else {
        return this.createRetryingCall(callConfig, method, host, credentials, deadline2);
      }
    }
    createResolvingCall(method, deadline2, host, parentCall, propagateFlags) {
      const callNumber2 = (0, call_number_1.getNextCallNumber)();
      this.trace("createResolvingCall [" + callNumber2 + '] method="' + method + '", deadline=' + (0, deadline_1.deadlineToString)(deadline2));
      const finalOptions = {
        deadline: deadline2,
        flags: propagateFlags !== null && propagateFlags !== void 0 ? propagateFlags : constants_1.Propagate.DEFAULTS,
        host: host !== null && host !== void 0 ? host : this.defaultAuthority,
        parentCall
      };
      const call2 = new resolving_call_1.ResolvingCall(this, method, finalOptions, this.filterStackFactory.clone(), this.credentials._getCallCredentials(), callNumber2);
      this.onCallStart();
      call2.addStatusWatcher((status) => {
        this.onCallEnd(status);
      });
      return call2;
    }
    close() {
      this.resolvingLoadBalancer.destroy();
      this.updateState(connectivity_state_1.ConnectivityState.SHUTDOWN);
      clearInterval(this.callRefTimer);
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
      }
      if (this.channelzEnabled) {
        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
      }
      this.subchannelPool.unrefUnusedSubchannels();
    }
    getTarget() {
      return (0, uri_parser_1.uriToString)(this.target);
    }
    getConnectivityState(tryToConnect) {
      const connectivityState2 = this.connectivityState;
      if (tryToConnect) {
        this.resolvingLoadBalancer.exitIdle();
        this.lastActivityTimestamp = /* @__PURE__ */ new Date();
        this.maybeStartIdleTimer();
      }
      return connectivityState2;
    }
    watchConnectivityState(currentState, deadline2, callback) {
      if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
        throw new Error("Channel has been shut down");
      }
      let timer = null;
      if (deadline2 !== Infinity) {
        const deadlineDate = deadline2 instanceof Date ? deadline2 : new Date(deadline2);
        const now = /* @__PURE__ */ new Date();
        if (deadline2 === -Infinity || deadlineDate <= now) {
          process.nextTick(callback, new Error("Deadline passed without connectivity state change"));
          return;
        }
        timer = setTimeout(() => {
          this.removeConnectivityStateWatcher(watcherObject);
          callback(new Error("Deadline passed without connectivity state change"));
        }, deadlineDate.getTime() - now.getTime());
      }
      const watcherObject = {
        currentState,
        callback,
        timer
      };
      this.connectivityStateWatchers.push(watcherObject);
    }
    /**
     * Get the channelz reference object for this channel. The returned value is
     * garbage if channelz is disabled for this channel.
     * @returns
     */
    getChannelzRef() {
      return this.channelzRef;
    }
    createCall(method, deadline2, host, parentCall, propagateFlags) {
      if (typeof method !== "string") {
        throw new TypeError("Channel#createCall: method must be a string");
      }
      if (!(typeof deadline2 === "number" || deadline2 instanceof Date)) {
        throw new TypeError("Channel#createCall: deadline must be a number or Date");
      }
      if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
        throw new Error("Channel has been shut down");
      }
      return this.createResolvingCall(method, deadline2, host, parentCall, propagateFlags);
    }
  }
  internalChannel.InternalChannel = InternalChannel;
  return internalChannel;
}
var hasRequiredChannel;
function requireChannel() {
  if (hasRequiredChannel) return channel;
  hasRequiredChannel = 1;
  Object.defineProperty(channel, "__esModule", { value: true });
  channel.ChannelImplementation = void 0;
  const channel_credentials_1 = requireChannelCredentials();
  const internal_channel_1 = requireInternalChannel();
  class ChannelImplementation {
    constructor(target, credentials, options) {
      if (typeof target !== "string") {
        throw new TypeError("Channel target must be a string");
      }
      if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
        throw new TypeError("Channel credentials must be a ChannelCredentials object");
      }
      if (options) {
        if (typeof options !== "object") {
          throw new TypeError("Channel options must be an object");
        }
      }
      this.internalChannel = new internal_channel_1.InternalChannel(target, credentials, options);
    }
    close() {
      this.internalChannel.close();
    }
    getTarget() {
      return this.internalChannel.getTarget();
    }
    getConnectivityState(tryToConnect) {
      return this.internalChannel.getConnectivityState(tryToConnect);
    }
    watchConnectivityState(currentState, deadline2, callback) {
      this.internalChannel.watchConnectivityState(currentState, deadline2, callback);
    }
    /**
     * Get the channelz reference object for this channel. The returned value is
     * garbage if channelz is disabled for this channel.
     * @returns
     */
    getChannelzRef() {
      return this.internalChannel.getChannelzRef();
    }
    createCall(method, deadline2, host, parentCall, propagateFlags) {
      if (typeof method !== "string") {
        throw new TypeError("Channel#createCall: method must be a string");
      }
      if (!(typeof deadline2 === "number" || deadline2 instanceof Date)) {
        throw new TypeError("Channel#createCall: deadline must be a number or Date");
      }
      return this.internalChannel.createCall(method, deadline2, host, parentCall, propagateFlags);
    }
  }
  channel.ChannelImplementation = ChannelImplementation;
  return channel;
}
var server = {};
var serverCall = {};
var hasRequiredServerCall;
function requireServerCall() {
  if (hasRequiredServerCall) return serverCall;
  hasRequiredServerCall = 1;
  Object.defineProperty(serverCall, "__esModule", { value: true });
  serverCall.Http2ServerCallStream = serverCall.ServerDuplexStreamImpl = serverCall.ServerWritableStreamImpl = serverCall.ServerReadableStreamImpl = serverCall.ServerUnaryCallImpl = void 0;
  const events_1 = require$$0$2;
  const http2 = require$$0$5;
  const stream_1 = require$$0$3;
  const zlib$1 = zlib;
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const stream_decoder_1 = requireStreamDecoder();
  const logging2 = requireLogging();
  const error_1 = requireError();
  const TRACER_NAME = "server_call";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const GRPC_ACCEPT_ENCODING_HEADER = "grpc-accept-encoding";
  const GRPC_ENCODING_HEADER = "grpc-encoding";
  const GRPC_MESSAGE_HEADER = "grpc-message";
  const GRPC_STATUS_HEADER = "grpc-status";
  const GRPC_TIMEOUT_HEADER = "grpc-timeout";
  const DEADLINE_REGEX = /(\d{1,8})\s*([HMSmun])/;
  const deadlineUnitsToMs = {
    H: 36e5,
    M: 6e4,
    S: 1e3,
    m: 1,
    u: 1e-3,
    n: 1e-6
  };
  const defaultCompressionHeaders = {
    // TODO(cjihrig): Remove these encoding headers from the default response
    // once compression is integrated.
    [GRPC_ACCEPT_ENCODING_HEADER]: "identity,deflate,gzip",
    [GRPC_ENCODING_HEADER]: "identity"
  };
  const defaultResponseHeaders = {
    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK,
    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
  };
  const defaultResponseOptions = {
    waitForTrailers: true
  };
  class ServerUnaryCallImpl extends events_1.EventEmitter {
    constructor(call2, metadata2, request) {
      super();
      this.call = call2;
      this.metadata = metadata2;
      this.request = request;
      this.cancelled = false;
      this.call.setupSurfaceCall(this);
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.call.getPath();
    }
  }
  serverCall.ServerUnaryCallImpl = ServerUnaryCallImpl;
  class ServerReadableStreamImpl extends stream_1.Readable {
    constructor(call2, metadata2, deserialize, encoding) {
      super({ objectMode: true });
      this.call = call2;
      this.metadata = metadata2;
      this.deserialize = deserialize;
      this.cancelled = false;
      this.call.setupSurfaceCall(this);
      this.call.setupReadable(this, encoding);
    }
    _read(size) {
      if (!this.call.consumeUnpushedMessages(this)) {
        return;
      }
      this.call.resume();
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.call.getPath();
    }
  }
  serverCall.ServerReadableStreamImpl = ServerReadableStreamImpl;
  class ServerWritableStreamImpl extends stream_1.Writable {
    constructor(call2, metadata2, serialize, request) {
      super({ objectMode: true });
      this.call = call2;
      this.metadata = metadata2;
      this.serialize = serialize;
      this.request = request;
      this.cancelled = false;
      this.trailingMetadata = new metadata_1.Metadata();
      this.call.setupSurfaceCall(this);
      this.on("error", (err) => {
        this.call.sendError(err);
        this.end();
      });
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.call.getPath();
    }
    _write(chunk, encoding, callback) {
      try {
        const response = this.call.serializeMessage(chunk);
        if (!this.call.write(response)) {
          this.call.once("drain", callback);
          return;
        }
      } catch (err) {
        this.emit("error", {
          details: (0, error_1.getErrorMessage)(err),
          code: constants_1.Status.INTERNAL
        });
      }
      callback();
    }
    _final(callback) {
      this.call.sendStatus({
        code: constants_1.Status.OK,
        details: "OK",
        metadata: this.trailingMetadata
      });
      callback(null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata2) {
      if (metadata2) {
        this.trailingMetadata = metadata2;
      }
      return super.end();
    }
  }
  serverCall.ServerWritableStreamImpl = ServerWritableStreamImpl;
  class ServerDuplexStreamImpl extends stream_1.Duplex {
    constructor(call2, metadata2, serialize, deserialize, encoding) {
      super({ objectMode: true });
      this.call = call2;
      this.metadata = metadata2;
      this.serialize = serialize;
      this.deserialize = deserialize;
      this.cancelled = false;
      this.trailingMetadata = new metadata_1.Metadata();
      this.call.setupSurfaceCall(this);
      this.call.setupReadable(this, encoding);
      this.on("error", (err) => {
        this.call.sendError(err);
        this.end();
      });
    }
    getPeer() {
      return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
      this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
      return this.call.getDeadline();
    }
    getPath() {
      return this.call.getPath();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata2) {
      if (metadata2) {
        this.trailingMetadata = metadata2;
      }
      return super.end();
    }
  }
  serverCall.ServerDuplexStreamImpl = ServerDuplexStreamImpl;
  ServerDuplexStreamImpl.prototype._read = ServerReadableStreamImpl.prototype._read;
  ServerDuplexStreamImpl.prototype._write = ServerWritableStreamImpl.prototype._write;
  ServerDuplexStreamImpl.prototype._final = ServerWritableStreamImpl.prototype._final;
  class Http2ServerCallStream extends events_1.EventEmitter {
    constructor(stream, handler, options) {
      super();
      this.stream = stream;
      this.handler = handler;
      this.cancelled = false;
      this.deadlineTimer = null;
      this.statusSent = false;
      this.deadline = Infinity;
      this.wantTrailers = false;
      this.metadataSent = false;
      this.canPush = false;
      this.isPushPending = false;
      this.bufferedMessages = [];
      this.messagesToPush = [];
      this.maxSendMessageSize = constants_1.DEFAULT_MAX_SEND_MESSAGE_LENGTH;
      this.maxReceiveMessageSize = constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.stream.once("close", () => {
        var _a;
        trace("Request to method " + ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.path) + " stream closed with rstCode " + this.stream.rstCode);
        if (!this.statusSent) {
          this.cancelled = true;
          this.emit("cancelled", "cancelled");
          this.emit("streamEnd", false);
          this.sendStatus({
            code: constants_1.Status.CANCELLED,
            details: "Cancelled by client",
            metadata: null
          });
          if (this.deadlineTimer)
            clearTimeout(this.deadlineTimer);
        }
      });
      this.stream.on("drain", () => {
        this.emit("drain");
      });
      if ("grpc.max_send_message_length" in options) {
        this.maxSendMessageSize = options["grpc.max_send_message_length"];
      }
      if ("grpc.max_receive_message_length" in options) {
        this.maxReceiveMessageSize = options["grpc.max_receive_message_length"];
      }
    }
    checkCancelled() {
      if (this.stream.destroyed || this.stream.closed) {
        this.cancelled = true;
      }
      return this.cancelled;
    }
    getDecompressedMessage(message, encoding) {
      const messageContents = message.subarray(5);
      if (encoding === "identity") {
        return messageContents;
      } else if (encoding === "deflate" || encoding === "gzip") {
        let decompresser;
        if (encoding === "deflate") {
          decompresser = zlib$1.createInflate();
        } else {
          decompresser = zlib$1.createGunzip();
        }
        return new Promise((resolve, reject) => {
          let totalLength = 0;
          const messageParts = [];
          decompresser.on("error", (error2) => {
            reject({
              code: constants_1.Status.INTERNAL,
              details: "Failed to decompress message"
            });
          });
          decompresser.on("data", (chunk) => {
            messageParts.push(chunk);
            totalLength += chunk.byteLength;
            if (this.maxReceiveMessageSize !== -1 && totalLength > this.maxReceiveMessageSize) {
              decompresser.destroy();
              reject({
                code: constants_1.Status.RESOURCE_EXHAUSTED,
                details: `Received message that decompresses to a size larger than ${this.maxReceiveMessageSize}`
              });
            }
          });
          decompresser.on("end", () => {
            resolve(Buffer.concat(messageParts));
          });
          decompresser.write(messageContents);
          decompresser.end();
        });
      } else {
        return Promise.reject({
          code: constants_1.Status.UNIMPLEMENTED,
          details: `Received message compressed with unsupported encoding "${encoding}"`
        });
      }
    }
    sendMetadata(customMetadata) {
      if (this.checkCancelled()) {
        return;
      }
      if (this.metadataSent) {
        return;
      }
      this.metadataSent = true;
      const custom = customMetadata ? customMetadata.toHttp2Headers() : null;
      const headers = Object.assign(Object.assign(Object.assign({}, defaultResponseHeaders), defaultCompressionHeaders), custom);
      this.stream.respond(headers, defaultResponseOptions);
    }
    receiveMetadata(headers) {
      const metadata2 = metadata_1.Metadata.fromHttp2Headers(headers);
      if (logging2.isTracerEnabled(TRACER_NAME)) {
        trace("Request to " + this.handler.path + " received headers " + JSON.stringify(metadata2.toJSON()));
      }
      const timeoutHeader = metadata2.get(GRPC_TIMEOUT_HEADER);
      if (timeoutHeader.length > 0) {
        const match = timeoutHeader[0].toString().match(DEADLINE_REGEX);
        if (match === null) {
          const err = new Error("Invalid deadline");
          err.code = constants_1.Status.OUT_OF_RANGE;
          this.sendError(err);
          return metadata2;
        }
        const timeout = +match[1] * deadlineUnitsToMs[match[2]] | 0;
        const now = /* @__PURE__ */ new Date();
        this.deadline = now.setMilliseconds(now.getMilliseconds() + timeout);
        this.deadlineTimer = setTimeout(handleExpiredDeadline, timeout, this);
        metadata2.remove(GRPC_TIMEOUT_HEADER);
      }
      metadata2.remove(http2.constants.HTTP2_HEADER_ACCEPT_ENCODING);
      metadata2.remove(http2.constants.HTTP2_HEADER_TE);
      metadata2.remove(http2.constants.HTTP2_HEADER_CONTENT_TYPE);
      metadata2.remove("grpc-accept-encoding");
      return metadata2;
    }
    receiveUnaryMessage(encoding) {
      return new Promise((resolve, reject) => {
        const { stream } = this;
        let receivedLength = 0;
        const call2 = this;
        const body = [];
        const limit = this.maxReceiveMessageSize;
        this.stream.on("data", onData);
        this.stream.on("end", onEnd);
        this.stream.on("error", onEnd);
        function onData(chunk) {
          receivedLength += chunk.byteLength;
          if (limit !== -1 && receivedLength > limit) {
            stream.removeListener("data", onData);
            stream.removeListener("end", onEnd);
            stream.removeListener("error", onEnd);
            reject({
              code: constants_1.Status.RESOURCE_EXHAUSTED,
              details: `Received message larger than max (${receivedLength} vs. ${limit})`
            });
            return;
          }
          body.push(chunk);
        }
        function onEnd(err) {
          stream.removeListener("data", onData);
          stream.removeListener("end", onEnd);
          stream.removeListener("error", onEnd);
          if (err !== void 0) {
            reject({ code: constants_1.Status.INTERNAL, details: err.message });
            return;
          }
          if (receivedLength === 0) {
            reject({
              code: constants_1.Status.INTERNAL,
              details: "received empty unary message"
            });
            return;
          }
          call2.emit("receiveMessage");
          const requestBytes = Buffer.concat(body, receivedLength);
          const compressed = requestBytes.readUInt8(0) === 1;
          const compressedMessageEncoding = compressed ? encoding : "identity";
          const decompressedMessage = call2.getDecompressedMessage(requestBytes, compressedMessageEncoding);
          if (Buffer.isBuffer(decompressedMessage)) {
            resolve(call2.deserializeMessageWithInternalError(decompressedMessage));
            return;
          }
          decompressedMessage.then((decompressed) => resolve(call2.deserializeMessageWithInternalError(decompressed)), (err2) => reject(err2.code ? err2 : {
            code: constants_1.Status.INTERNAL,
            details: `Received "grpc-encoding" header "${encoding}" but ${encoding} decompression failed`
          }));
        }
      });
    }
    async deserializeMessageWithInternalError(buffer) {
      try {
        return this.deserializeMessage(buffer);
      } catch (err) {
        throw {
          details: (0, error_1.getErrorMessage)(err),
          code: constants_1.Status.INTERNAL
        };
      }
    }
    serializeMessage(value) {
      const messageBuffer = this.handler.serialize(value);
      const byteLength = messageBuffer.byteLength;
      const output = Buffer.allocUnsafe(byteLength + 5);
      output.writeUInt8(0, 0);
      output.writeUInt32BE(byteLength, 1);
      messageBuffer.copy(output, 5);
      return output;
    }
    deserializeMessage(bytes) {
      return this.handler.deserialize(bytes);
    }
    async sendUnaryMessage(err, value, metadata2, flags) {
      if (this.checkCancelled()) {
        return;
      }
      if (metadata2 === void 0) {
        metadata2 = null;
      }
      if (err) {
        if (!Object.prototype.hasOwnProperty.call(err, "metadata") && metadata2) {
          err.metadata = metadata2;
        }
        this.sendError(err);
        return;
      }
      try {
        const response = this.serializeMessage(value);
        this.write(response);
        this.sendStatus({ code: constants_1.Status.OK, details: "OK", metadata: metadata2 });
      } catch (err2) {
        this.sendError({
          details: (0, error_1.getErrorMessage)(err2),
          code: constants_1.Status.INTERNAL
        });
      }
    }
    sendStatus(statusObj) {
      var _a, _b;
      this.emit("callEnd", statusObj.code);
      this.emit("streamEnd", statusObj.code === constants_1.Status.OK);
      if (this.checkCancelled()) {
        return;
      }
      trace("Request to method " + ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.path) + " ended with status code: " + constants_1.Status[statusObj.code] + " details: " + statusObj.details);
      if (this.deadlineTimer)
        clearTimeout(this.deadlineTimer);
      if (this.stream.headersSent) {
        if (!this.wantTrailers) {
          this.wantTrailers = true;
          this.stream.once("wantTrailers", () => {
            var _a2;
            const trailersToSend = Object.assign({ [GRPC_STATUS_HEADER]: statusObj.code, [GRPC_MESSAGE_HEADER]: encodeURI(statusObj.details) }, (_a2 = statusObj.metadata) === null || _a2 === void 0 ? void 0 : _a2.toHttp2Headers());
            this.stream.sendTrailers(trailersToSend);
            this.statusSent = true;
          });
          this.stream.end();
        }
      } else {
        const trailersToSend = Object.assign(Object.assign({ [GRPC_STATUS_HEADER]: statusObj.code, [GRPC_MESSAGE_HEADER]: encodeURI(statusObj.details) }, defaultResponseHeaders), (_b = statusObj.metadata) === null || _b === void 0 ? void 0 : _b.toHttp2Headers());
        this.stream.respond(trailersToSend, { endStream: true });
        this.statusSent = true;
      }
    }
    sendError(error2) {
      const status = {
        code: constants_1.Status.UNKNOWN,
        details: "message" in error2 ? error2.message : "Unknown Error",
        metadata: "metadata" in error2 && error2.metadata !== void 0 ? error2.metadata : null
      };
      if ("code" in error2 && typeof error2.code === "number" && Number.isInteger(error2.code)) {
        status.code = error2.code;
        if ("details" in error2 && typeof error2.details === "string") {
          status.details = error2.details;
        }
      }
      this.sendStatus(status);
    }
    write(chunk) {
      if (this.checkCancelled()) {
        return;
      }
      if (this.maxSendMessageSize !== -1 && chunk.length > this.maxSendMessageSize) {
        this.sendError({
          code: constants_1.Status.RESOURCE_EXHAUSTED,
          details: `Sent message larger than max (${chunk.length} vs. ${this.maxSendMessageSize})`
        });
        return;
      }
      this.sendMetadata();
      this.emit("sendMessage");
      return this.stream.write(chunk);
    }
    resume() {
      this.stream.resume();
    }
    setupSurfaceCall(call2) {
      this.once("cancelled", (reason) => {
        call2.cancelled = true;
        call2.emit("cancelled", reason);
      });
      this.once("callEnd", (status) => call2.emit("callEnd", status));
    }
    setupReadable(readable, encoding) {
      const decoder = new stream_decoder_1.StreamDecoder(this.maxReceiveMessageSize);
      let readsDone = false;
      let pendingMessageProcessing = false;
      let pushedEnd = false;
      const maybePushEnd = async () => {
        if (!pushedEnd && readsDone && !pendingMessageProcessing) {
          pushedEnd = true;
          await this.pushOrBufferMessage(readable, null);
        }
      };
      this.stream.on("data", async (data) => {
        let messages;
        try {
          messages = decoder.write(data);
        } catch (e) {
          this.sendError({
            code: constants_1.Status.RESOURCE_EXHAUSTED,
            details: e.message
          });
          return;
        }
        pendingMessageProcessing = true;
        this.stream.pause();
        for (const message of messages) {
          this.emit("receiveMessage");
          const compressed = message.readUInt8(0) === 1;
          const compressedMessageEncoding = compressed ? encoding : "identity";
          let decompressedMessage;
          try {
            decompressedMessage = await this.getDecompressedMessage(message, compressedMessageEncoding);
          } catch (e) {
            this.sendError(e);
            return;
          }
          if (!decompressedMessage)
            return;
          await this.pushOrBufferMessage(readable, decompressedMessage);
        }
        pendingMessageProcessing = false;
        this.stream.resume();
        await maybePushEnd();
      });
      this.stream.once("end", async () => {
        readsDone = true;
        await maybePushEnd();
      });
    }
    consumeUnpushedMessages(readable) {
      this.canPush = true;
      while (this.messagesToPush.length > 0) {
        const nextMessage = this.messagesToPush.shift();
        const canPush = readable.push(nextMessage);
        if (nextMessage === null || canPush === false) {
          this.canPush = false;
          break;
        }
      }
      return this.canPush;
    }
    async pushOrBufferMessage(readable, messageBytes) {
      if (this.isPushPending) {
        this.bufferedMessages.push(messageBytes);
      } else {
        await this.pushMessage(readable, messageBytes);
      }
    }
    async pushMessage(readable, messageBytes) {
      if (messageBytes === null) {
        trace("Received end of stream");
        if (this.canPush) {
          readable.push(null);
        } else {
          this.messagesToPush.push(null);
        }
        return;
      }
      trace("Received message of length " + messageBytes.length);
      this.isPushPending = true;
      try {
        const deserialized = await this.deserializeMessage(messageBytes);
        if (this.canPush) {
          if (!readable.push(deserialized)) {
            this.canPush = false;
            this.stream.pause();
          }
        } else {
          this.messagesToPush.push(deserialized);
        }
      } catch (error2) {
        this.bufferedMessages.length = 0;
        let code = (0, error_1.getErrorCode)(error2);
        if (code === null || code < constants_1.Status.OK || code > constants_1.Status.UNAUTHENTICATED) {
          code = constants_1.Status.INTERNAL;
        }
        readable.emit("error", {
          details: (0, error_1.getErrorMessage)(error2),
          code
        });
      }
      this.isPushPending = false;
      if (this.bufferedMessages.length > 0) {
        await this.pushMessage(readable, this.bufferedMessages.shift());
      }
    }
    getPeer() {
      var _a;
      const socket = (_a = this.stream.session) === null || _a === void 0 ? void 0 : _a.socket;
      if (socket === null || socket === void 0 ? void 0 : socket.remoteAddress) {
        if (socket.remotePort) {
          return `${socket.remoteAddress}:${socket.remotePort}`;
        } else {
          return socket.remoteAddress;
        }
      } else {
        return "unknown";
      }
    }
    getDeadline() {
      return this.deadline;
    }
    getPath() {
      return this.handler.path;
    }
  }
  serverCall.Http2ServerCallStream = Http2ServerCallStream;
  function handleExpiredDeadline(call2) {
    const err = new Error("Deadline exceeded");
    err.code = constants_1.Status.DEADLINE_EXCEEDED;
    call2.sendError(err);
    call2.cancelled = true;
    call2.emit("cancelled", "deadline");
  }
  return serverCall;
}
var serverCredentials = {};
var hasRequiredServerCredentials;
function requireServerCredentials() {
  if (hasRequiredServerCredentials) return serverCredentials;
  hasRequiredServerCredentials = 1;
  Object.defineProperty(serverCredentials, "__esModule", { value: true });
  serverCredentials.ServerCredentials = void 0;
  const tls_helpers_1 = requireTlsHelpers();
  class ServerCredentials {
    static createInsecure() {
      return new InsecureServerCredentials();
    }
    static createSsl(rootCerts, keyCertPairs, checkClientCertificate = false) {
      if (rootCerts !== null && !Buffer.isBuffer(rootCerts)) {
        throw new TypeError("rootCerts must be null or a Buffer");
      }
      if (!Array.isArray(keyCertPairs)) {
        throw new TypeError("keyCertPairs must be an array");
      }
      if (typeof checkClientCertificate !== "boolean") {
        throw new TypeError("checkClientCertificate must be a boolean");
      }
      const cert = [];
      const key = [];
      for (let i = 0; i < keyCertPairs.length; i++) {
        const pair = keyCertPairs[i];
        if (pair === null || typeof pair !== "object") {
          throw new TypeError(`keyCertPair[${i}] must be an object`);
        }
        if (!Buffer.isBuffer(pair.private_key)) {
          throw new TypeError(`keyCertPair[${i}].private_key must be a Buffer`);
        }
        if (!Buffer.isBuffer(pair.cert_chain)) {
          throw new TypeError(`keyCertPair[${i}].cert_chain must be a Buffer`);
        }
        cert.push(pair.cert_chain);
        key.push(pair.private_key);
      }
      return new SecureServerCredentials({
        ca: rootCerts || (0, tls_helpers_1.getDefaultRootsData)() || void 0,
        cert,
        key,
        requestCert: checkClientCertificate,
        ciphers: tls_helpers_1.CIPHER_SUITES
      });
    }
  }
  serverCredentials.ServerCredentials = ServerCredentials;
  class InsecureServerCredentials extends ServerCredentials {
    _isSecure() {
      return false;
    }
    _getSettings() {
      return null;
    }
  }
  class SecureServerCredentials extends ServerCredentials {
    constructor(options) {
      super();
      this.options = options;
    }
    _isSecure() {
      return true;
    }
    _getSettings() {
      return this.options;
    }
  }
  return serverCredentials;
}
var hasRequiredServer;
function requireServer() {
  if (hasRequiredServer) return server;
  hasRequiredServer = 1;
  Object.defineProperty(server, "__esModule", { value: true });
  server.Server = void 0;
  const http2 = require$$0$5;
  const constants_1 = requireConstants();
  const server_call_1 = requireServerCall();
  const server_credentials_1 = requireServerCredentials();
  const resolver_1 = requireResolver();
  const logging2 = requireLogging();
  const subchannel_address_1 = requireSubchannelAddress();
  const uri_parser_1 = requireUriParser();
  const channelz_1 = requireChannelz();
  const UNLIMITED_CONNECTION_AGE_MS = 2147483647;
  const KEEPALIVE_MAX_TIME_MS = 2147483647;
  const KEEPALIVE_TIMEOUT_MS = 2e4;
  const { HTTP2_HEADER_PATH } = http2.constants;
  const TRACER_NAME = "server";
  function noop() {
  }
  function getUnimplementedStatusResponse(methodName) {
    return {
      code: constants_1.Status.UNIMPLEMENTED,
      details: `The server does not implement the method ${methodName}`
    };
  }
  function getDefaultHandler(handlerType, methodName) {
    const unimplementedStatusResponse = getUnimplementedStatusResponse(methodName);
    switch (handlerType) {
      case "unary":
        return (call2, callback) => {
          callback(unimplementedStatusResponse, null);
        };
      case "clientStream":
        return (call2, callback) => {
          callback(unimplementedStatusResponse, null);
        };
      case "serverStream":
        return (call2) => {
          call2.emit("error", unimplementedStatusResponse);
        };
      case "bidi":
        return (call2) => {
          call2.emit("error", unimplementedStatusResponse);
        };
      default:
        throw new Error(`Invalid handlerType ${handlerType}`);
    }
  }
  class Server {
    constructor(options) {
      var _a, _b, _c, _d;
      this.http2ServerList = [];
      this.handlers = /* @__PURE__ */ new Map();
      this.sessions = /* @__PURE__ */ new Map();
      this.started = false;
      this.shutdown = false;
      this.serverAddressString = "null";
      this.channelzEnabled = true;
      this.channelzTrace = new channelz_1.ChannelzTrace();
      this.callTracker = new channelz_1.ChannelzCallTracker();
      this.listenerChildrenTracker = new channelz_1.ChannelzChildrenTracker();
      this.sessionChildrenTracker = new channelz_1.ChannelzChildrenTracker();
      this.options = options !== null && options !== void 0 ? options : {};
      if (this.options["grpc.enable_channelz"] === 0) {
        this.channelzEnabled = false;
      }
      this.channelzRef = (0, channelz_1.registerChannelzServer)(() => this.getChannelzInfo(), this.channelzEnabled);
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Server created");
      }
      this.maxConnectionAgeMs = (_a = this.options["grpc.max_connection_age_ms"]) !== null && _a !== void 0 ? _a : UNLIMITED_CONNECTION_AGE_MS;
      this.maxConnectionAgeGraceMs = (_b = this.options["grpc.max_connection_age_grace_ms"]) !== null && _b !== void 0 ? _b : UNLIMITED_CONNECTION_AGE_MS;
      this.keepaliveTimeMs = (_c = this.options["grpc.keepalive_time_ms"]) !== null && _c !== void 0 ? _c : KEEPALIVE_MAX_TIME_MS;
      this.keepaliveTimeoutMs = (_d = this.options["grpc.keepalive_timeout_ms"]) !== null && _d !== void 0 ? _d : KEEPALIVE_TIMEOUT_MS;
      this.trace("Server constructed");
    }
    getChannelzInfo() {
      return {
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        listenerChildren: this.listenerChildrenTracker.getChildLists(),
        sessionChildren: this.sessionChildrenTracker.getChildLists()
      };
    }
    getChannelzSessionInfoGetter(session) {
      return () => {
        var _a, _b, _c;
        const sessionInfo = this.sessions.get(session);
        const sessionSocket = session.socket;
        const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
        const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
        let tlsInfo;
        if (session.encrypted) {
          const tlsSocket = sessionSocket;
          const cipherInfo = tlsSocket.getCipher();
          const certificate = tlsSocket.getCertificate();
          const peerCertificate = tlsSocket.getPeerCertificate();
          tlsInfo = {
            cipherSuiteStandardName: (_a = cipherInfo.standardName) !== null && _a !== void 0 ? _a : null,
            cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
            localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
            remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
          };
        } else {
          tlsInfo = null;
        }
        const socketInfo = {
          remoteAddress,
          localAddress,
          security: tlsInfo,
          remoteName: null,
          streamsStarted: sessionInfo.streamTracker.callsStarted,
          streamsSucceeded: sessionInfo.streamTracker.callsSucceeded,
          streamsFailed: sessionInfo.streamTracker.callsFailed,
          messagesSent: sessionInfo.messagesSent,
          messagesReceived: sessionInfo.messagesReceived,
          keepAlivesSent: 0,
          lastLocalStreamCreatedTimestamp: null,
          lastRemoteStreamCreatedTimestamp: sessionInfo.streamTracker.lastCallStartedTimestamp,
          lastMessageSentTimestamp: sessionInfo.lastMessageSentTimestamp,
          lastMessageReceivedTimestamp: sessionInfo.lastMessageReceivedTimestamp,
          localFlowControlWindow: (_b = session.state.localWindowSize) !== null && _b !== void 0 ? _b : null,
          remoteFlowControlWindow: (_c = session.state.remoteWindowSize) !== null && _c !== void 0 ? _c : null
        };
        return socketInfo;
      };
    }
    trace(text) {
      logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + text);
    }
    addProtoService() {
      throw new Error("Not implemented. Use addService() instead");
    }
    addService(service, implementation) {
      if (service === null || typeof service !== "object" || implementation === null || typeof implementation !== "object") {
        throw new Error("addService() requires two objects as arguments");
      }
      const serviceKeys = Object.keys(service);
      if (serviceKeys.length === 0) {
        throw new Error("Cannot add an empty service to a server");
      }
      serviceKeys.forEach((name) => {
        const attrs = service[name];
        let methodType;
        if (attrs.requestStream) {
          if (attrs.responseStream) {
            methodType = "bidi";
          } else {
            methodType = "clientStream";
          }
        } else {
          if (attrs.responseStream) {
            methodType = "serverStream";
          } else {
            methodType = "unary";
          }
        }
        let implFn = implementation[name];
        let impl;
        if (implFn === void 0 && typeof attrs.originalName === "string") {
          implFn = implementation[attrs.originalName];
        }
        if (implFn !== void 0) {
          impl = implFn.bind(implementation);
        } else {
          impl = getDefaultHandler(methodType, name);
        }
        const success = this.register(attrs.path, impl, attrs.responseSerialize, attrs.requestDeserialize, methodType);
        if (success === false) {
          throw new Error(`Method handler for ${attrs.path} already provided.`);
        }
      });
    }
    removeService(service) {
      if (service === null || typeof service !== "object") {
        throw new Error("removeService() requires object as argument");
      }
      const serviceKeys = Object.keys(service);
      serviceKeys.forEach((name) => {
        const attrs = service[name];
        this.unregister(attrs.path);
      });
    }
    bind(port, creds) {
      throw new Error("Not implemented. Use bindAsync() instead");
    }
    bindAsync(port, creds, callback) {
      if (this.started === true) {
        throw new Error("server is already started");
      }
      if (this.shutdown) {
        throw new Error("bindAsync called after shutdown");
      }
      if (typeof port !== "string") {
        throw new TypeError("port must be a string");
      }
      if (creds === null || !(creds instanceof server_credentials_1.ServerCredentials)) {
        throw new TypeError("creds must be a ServerCredentials object");
      }
      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      }
      const initialPortUri = (0, uri_parser_1.parseUri)(port);
      if (initialPortUri === null) {
        throw new Error(`Could not parse port "${port}"`);
      }
      const portUri = (0, resolver_1.mapUriDefaultScheme)(initialPortUri);
      if (portUri === null) {
        throw new Error(`Could not get a default scheme for port "${port}"`);
      }
      const serverOptions = {
        maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
      };
      if ("grpc-node.max_session_memory" in this.options) {
        serverOptions.maxSessionMemory = this.options["grpc-node.max_session_memory"];
      } else {
        serverOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
      }
      if ("grpc.max_concurrent_streams" in this.options) {
        serverOptions.settings = {
          maxConcurrentStreams: this.options["grpc.max_concurrent_streams"]
        };
      }
      const deferredCallback = (error2, port2) => {
        process.nextTick(() => callback(error2, port2));
      };
      const setupServer = () => {
        let http2Server;
        if (creds._isSecure()) {
          const secureServerOptions = Object.assign(serverOptions, creds._getSettings());
          secureServerOptions.enableTrace = this.options["grpc-node.tls_enable_trace"] === 1;
          http2Server = http2.createSecureServer(secureServerOptions);
          http2Server.on("secureConnection", (socket) => {
            socket.on("error", (e) => {
              this.trace("An incoming TLS connection closed with error: " + e.message);
            });
          });
        } else {
          http2Server = http2.createServer(serverOptions);
        }
        http2Server.setTimeout(0, noop);
        this._setupHandlers(http2Server);
        return http2Server;
      };
      const bindSpecificPort = (addressList, portNum, previousCount) => {
        if (addressList.length === 0) {
          return Promise.resolve({ port: portNum, count: previousCount });
        }
        return Promise.all(addressList.map((address) => {
          this.trace("Attempting to bind " + (0, subchannel_address_1.subchannelAddressToString)(address));
          let addr;
          if ((0, subchannel_address_1.isTcpSubchannelAddress)(address)) {
            addr = {
              host: address.host,
              port: portNum
            };
          } else {
            addr = address;
          }
          const http2Server = setupServer();
          return new Promise((resolve, reject) => {
            const onError = (err) => {
              this.trace("Failed to bind " + (0, subchannel_address_1.subchannelAddressToString)(address) + " with error " + err.message);
              resolve(err);
            };
            http2Server.once("error", onError);
            http2Server.listen(addr, () => {
              if (this.shutdown) {
                http2Server.close();
                resolve(new Error("bindAsync failed because server is shutdown"));
                return;
              }
              const boundAddress = http2Server.address();
              let boundSubchannelAddress;
              if (typeof boundAddress === "string") {
                boundSubchannelAddress = {
                  path: boundAddress
                };
              } else {
                boundSubchannelAddress = {
                  host: boundAddress.address,
                  port: boundAddress.port
                };
              }
              const channelzRef = (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress), () => {
                return {
                  localAddress: boundSubchannelAddress,
                  remoteAddress: null,
                  security: null,
                  remoteName: null,
                  streamsStarted: 0,
                  streamsSucceeded: 0,
                  streamsFailed: 0,
                  messagesSent: 0,
                  messagesReceived: 0,
                  keepAlivesSent: 0,
                  lastLocalStreamCreatedTimestamp: null,
                  lastRemoteStreamCreatedTimestamp: null,
                  lastMessageSentTimestamp: null,
                  lastMessageReceivedTimestamp: null,
                  localFlowControlWindow: null,
                  remoteFlowControlWindow: null
                };
              }, this.channelzEnabled);
              if (this.channelzEnabled) {
                this.listenerChildrenTracker.refChild(channelzRef);
              }
              this.http2ServerList.push({
                server: http2Server,
                channelzRef
              });
              this.trace("Successfully bound " + (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
              resolve("port" in boundSubchannelAddress ? boundSubchannelAddress.port : portNum);
              http2Server.removeListener("error", onError);
            });
          });
        })).then((results) => {
          let count = 0;
          for (const result of results) {
            if (typeof result === "number") {
              count += 1;
              if (result !== portNum) {
                throw new Error("Invalid state: multiple port numbers added from single address");
              }
            }
          }
          return {
            port: portNum,
            count: count + previousCount
          };
        });
      };
      const bindWildcardPort = (addressList) => {
        if (addressList.length === 0) {
          return Promise.resolve({ port: 0, count: 0 });
        }
        const address = addressList[0];
        const http2Server = setupServer();
        return new Promise((resolve, reject) => {
          const onError = (err) => {
            this.trace("Failed to bind " + (0, subchannel_address_1.subchannelAddressToString)(address) + " with error " + err.message);
            resolve(bindWildcardPort(addressList.slice(1)));
          };
          http2Server.once("error", onError);
          http2Server.listen(address, () => {
            if (this.shutdown) {
              http2Server.close();
              resolve({ port: 0, count: 0 });
              return;
            }
            const boundAddress = http2Server.address();
            const boundSubchannelAddress = {
              host: boundAddress.address,
              port: boundAddress.port
            };
            const channelzRef = (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress), () => {
              return {
                localAddress: boundSubchannelAddress,
                remoteAddress: null,
                security: null,
                remoteName: null,
                streamsStarted: 0,
                streamsSucceeded: 0,
                streamsFailed: 0,
                messagesSent: 0,
                messagesReceived: 0,
                keepAlivesSent: 0,
                lastLocalStreamCreatedTimestamp: null,
                lastRemoteStreamCreatedTimestamp: null,
                lastMessageSentTimestamp: null,
                lastMessageReceivedTimestamp: null,
                localFlowControlWindow: null,
                remoteFlowControlWindow: null
              };
            }, this.channelzEnabled);
            if (this.channelzEnabled) {
              this.listenerChildrenTracker.refChild(channelzRef);
            }
            this.http2ServerList.push({
              server: http2Server,
              channelzRef
            });
            this.trace("Successfully bound " + (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
            resolve(bindSpecificPort(addressList.slice(1), boundAddress.port, 1));
            http2Server.removeListener("error", onError);
          });
        });
      };
      const resolverListener = {
        onSuccessfulResolution: (addressList, serviceConfig2, serviceConfigError) => {
          resolverListener.onSuccessfulResolution = () => {
          };
          if (this.shutdown) {
            deferredCallback(new Error(`bindAsync failed because server is shutdown`), 0);
          }
          if (addressList.length === 0) {
            deferredCallback(new Error(`No addresses resolved for port ${port}`), 0);
            return;
          }
          let bindResultPromise;
          if ((0, subchannel_address_1.isTcpSubchannelAddress)(addressList[0])) {
            if (addressList[0].port === 0) {
              bindResultPromise = bindWildcardPort(addressList);
            } else {
              bindResultPromise = bindSpecificPort(addressList, addressList[0].port, 0);
            }
          } else {
            bindResultPromise = bindSpecificPort(addressList, 1, 0);
          }
          bindResultPromise.then((bindResult) => {
            if (bindResult.count === 0) {
              const errorString = `No address added out of total ${addressList.length} resolved`;
              logging2.log(constants_1.LogVerbosity.ERROR, errorString);
              deferredCallback(new Error(errorString), 0);
            } else {
              if (bindResult.count < addressList.length) {
                logging2.log(constants_1.LogVerbosity.INFO, `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`);
              }
              deferredCallback(null, bindResult.port);
            }
          }, (error2) => {
            const errorString = `No address added out of total ${addressList.length} resolved`;
            logging2.log(constants_1.LogVerbosity.ERROR, errorString);
            deferredCallback(new Error(errorString), 0);
          });
        },
        onError: (error2) => {
          deferredCallback(new Error(error2.details), 0);
        }
      };
      const resolver2 = (0, resolver_1.createResolver)(portUri, resolverListener, this.options);
      resolver2.updateResolution();
    }
    forceShutdown() {
      for (const { server: http2Server, channelzRef: ref } of this.http2ServerList) {
        if (http2Server.listening) {
          http2Server.close(() => {
            if (this.channelzEnabled) {
              this.listenerChildrenTracker.unrefChild(ref);
              (0, channelz_1.unregisterChannelzRef)(ref);
            }
          });
        }
      }
      this.started = false;
      this.shutdown = true;
      this.sessions.forEach((channelzInfo, session) => {
        session.destroy(http2.constants.NGHTTP2_CANCEL);
      });
      this.sessions.clear();
      if (this.channelzEnabled) {
        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
      }
    }
    register(name, handler, serialize, deserialize, type) {
      if (this.handlers.has(name)) {
        return false;
      }
      this.handlers.set(name, {
        func: handler,
        serialize,
        deserialize,
        type,
        path: name
      });
      return true;
    }
    unregister(name) {
      return this.handlers.delete(name);
    }
    start() {
      if (this.http2ServerList.length === 0 || this.http2ServerList.every(({ server: http2Server }) => http2Server.listening !== true)) {
        throw new Error("server must be bound in order to start");
      }
      if (this.started === true) {
        throw new Error("server is already started");
      }
      if (this.channelzEnabled) {
        this.channelzTrace.addTrace("CT_INFO", "Starting");
      }
      this.started = true;
    }
    tryShutdown(callback) {
      const wrappedCallback = (error2) => {
        if (this.channelzEnabled) {
          (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        }
        callback(error2);
      };
      let pendingChecks = 0;
      function maybeCallback() {
        pendingChecks--;
        if (pendingChecks === 0) {
          wrappedCallback();
        }
      }
      this.started = false;
      this.shutdown = true;
      for (const { server: http2Server, channelzRef: ref } of this.http2ServerList) {
        if (http2Server.listening) {
          pendingChecks++;
          http2Server.close(() => {
            if (this.channelzEnabled) {
              this.listenerChildrenTracker.unrefChild(ref);
              (0, channelz_1.unregisterChannelzRef)(ref);
            }
            maybeCallback();
          });
        }
      }
      this.sessions.forEach((channelzInfo, session) => {
        if (!session.closed) {
          pendingChecks += 1;
          session.close(maybeCallback);
        }
      });
      if (pendingChecks === 0) {
        wrappedCallback();
      }
    }
    addHttp2Port() {
      throw new Error("Not yet implemented");
    }
    /**
     * Get the channelz reference object for this server. The returned value is
     * garbage if channelz is disabled for this server.
     * @returns
     */
    getChannelzRef() {
      return this.channelzRef;
    }
    _verifyContentType(stream, headers) {
      const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];
      if (typeof contentType !== "string" || !contentType.startsWith("application/grpc")) {
        stream.respond({
          [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE
        }, { endStream: true });
        return false;
      }
      return true;
    }
    _retrieveHandler(path) {
      this.trace("Received call to method " + path + " at address " + this.serverAddressString);
      const handler = this.handlers.get(path);
      if (handler === void 0) {
        this.trace("No handler registered for method " + path + ". Sending UNIMPLEMENTED status.");
        return null;
      }
      return handler;
    }
    _respondWithError(err, stream, channelzSessionInfo = null) {
      const call2 = new server_call_1.Http2ServerCallStream(stream, null, this.options);
      if (err.code === void 0) {
        err.code = constants_1.Status.INTERNAL;
      }
      if (this.channelzEnabled) {
        this.callTracker.addCallFailed();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
      }
      call2.sendError(err);
    }
    _channelzHandler(stream, headers) {
      stream.once("error", (err) => {
      });
      const channelzSessionInfo = this.sessions.get(stream.session);
      this.callTracker.addCallStarted();
      channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallStarted();
      if (!this._verifyContentType(stream, headers)) {
        this.callTracker.addCallFailed();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
        return;
      }
      const path = headers[HTTP2_HEADER_PATH];
      const handler = this._retrieveHandler(path);
      if (!handler) {
        this._respondWithError(getUnimplementedStatusResponse(path), stream, channelzSessionInfo);
        return;
      }
      const call2 = new server_call_1.Http2ServerCallStream(stream, handler, this.options);
      call2.once("callEnd", (code) => {
        if (code === constants_1.Status.OK) {
          this.callTracker.addCallSucceeded();
        } else {
          this.callTracker.addCallFailed();
        }
      });
      if (channelzSessionInfo) {
        call2.once("streamEnd", (success) => {
          if (success) {
            channelzSessionInfo.streamTracker.addCallSucceeded();
          } else {
            channelzSessionInfo.streamTracker.addCallFailed();
          }
        });
        call2.on("sendMessage", () => {
          channelzSessionInfo.messagesSent += 1;
          channelzSessionInfo.lastMessageSentTimestamp = /* @__PURE__ */ new Date();
        });
        call2.on("receiveMessage", () => {
          channelzSessionInfo.messagesReceived += 1;
          channelzSessionInfo.lastMessageReceivedTimestamp = /* @__PURE__ */ new Date();
        });
      }
      if (!this._runHandlerForCall(call2, handler, headers)) {
        this.callTracker.addCallFailed();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
        call2.sendError({
          code: constants_1.Status.INTERNAL,
          details: `Unknown handler type: ${handler.type}`
        });
      }
    }
    _streamHandler(stream, headers) {
      stream.once("error", (err) => {
      });
      if (this._verifyContentType(stream, headers) !== true) {
        return;
      }
      const path = headers[HTTP2_HEADER_PATH];
      const handler = this._retrieveHandler(path);
      if (!handler) {
        this._respondWithError(getUnimplementedStatusResponse(path), stream, null);
        return;
      }
      const call2 = new server_call_1.Http2ServerCallStream(stream, handler, this.options);
      if (!this._runHandlerForCall(call2, handler, headers)) {
        call2.sendError({
          code: constants_1.Status.INTERNAL,
          details: `Unknown handler type: ${handler.type}`
        });
      }
    }
    _runHandlerForCall(call2, handler, headers) {
      var _a;
      const metadata2 = call2.receiveMetadata(headers);
      const encoding = (_a = metadata2.get("grpc-encoding")[0]) !== null && _a !== void 0 ? _a : "identity";
      metadata2.remove("grpc-encoding");
      const { type } = handler;
      if (type === "unary") {
        handleUnary(call2, handler, metadata2, encoding);
      } else if (type === "clientStream") {
        handleClientStreaming(call2, handler, metadata2, encoding);
      } else if (type === "serverStream") {
        handleServerStreaming(call2, handler, metadata2, encoding);
      } else if (type === "bidi") {
        handleBidiStreaming(call2, handler, metadata2, encoding);
      } else {
        return false;
      }
      return true;
    }
    _setupHandlers(http2Server) {
      if (http2Server === null) {
        return;
      }
      const serverAddress = http2Server.address();
      let serverAddressString = "null";
      if (serverAddress) {
        if (typeof serverAddress === "string") {
          serverAddressString = serverAddress;
        } else {
          serverAddressString = serverAddress.address + ":" + serverAddress.port;
        }
      }
      this.serverAddressString = serverAddressString;
      const handler = this.channelzEnabled ? this._channelzHandler : this._streamHandler;
      http2Server.on("stream", handler.bind(this));
      http2Server.on("session", (session) => {
        var _a, _b, _c, _d, _e;
        if (!this.started) {
          session.destroy();
          return;
        }
        const channelzRef = (0, channelz_1.registerChannelzSocket)((_a = session.socket.remoteAddress) !== null && _a !== void 0 ? _a : "unknown", this.getChannelzSessionInfoGetter(session), this.channelzEnabled);
        const channelzSessionInfo = {
          ref: channelzRef,
          streamTracker: new channelz_1.ChannelzCallTracker(),
          messagesSent: 0,
          messagesReceived: 0,
          lastMessageSentTimestamp: null,
          lastMessageReceivedTimestamp: null
        };
        this.sessions.set(session, channelzSessionInfo);
        const clientAddress = session.socket.remoteAddress;
        if (this.channelzEnabled) {
          this.channelzTrace.addTrace("CT_INFO", "Connection established by client " + clientAddress);
          this.sessionChildrenTracker.refChild(channelzRef);
        }
        let connectionAgeTimer = null;
        let connectionAgeGraceTimer = null;
        let sessionClosedByServer = false;
        if (this.maxConnectionAgeMs !== UNLIMITED_CONNECTION_AGE_MS) {
          const jitterMagnitude = this.maxConnectionAgeMs / 10;
          const jitter = Math.random() * jitterMagnitude * 2 - jitterMagnitude;
          connectionAgeTimer = (_c = (_b = setTimeout(() => {
            var _a2, _b2;
            sessionClosedByServer = true;
            if (this.channelzEnabled) {
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by max connection age from " + clientAddress);
            }
            try {
              session.goaway(http2.constants.NGHTTP2_NO_ERROR, ~(1 << 31), Buffer.from("max_age"));
            } catch (e) {
              session.destroy();
              return;
            }
            session.close();
            if (this.maxConnectionAgeGraceMs !== UNLIMITED_CONNECTION_AGE_MS) {
              connectionAgeGraceTimer = (_b2 = (_a2 = setTimeout(() => {
                session.destroy();
              }, this.maxConnectionAgeGraceMs)).unref) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
            }
          }, this.maxConnectionAgeMs + jitter)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
        const keeapliveTimeTimer = (_e = (_d = setInterval(() => {
          var _a2, _b2;
          const timeoutTImer = (_b2 = (_a2 = setTimeout(() => {
            sessionClosedByServer = true;
            if (this.channelzEnabled) {
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by keepalive timeout from " + clientAddress);
            }
            session.close();
          }, this.keepaliveTimeoutMs)).unref) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
          try {
            session.ping((err, duration2, payload) => {
              clearTimeout(timeoutTImer);
            });
          } catch (e) {
            session.destroy();
          }
        }, this.keepaliveTimeMs)).unref) === null || _e === void 0 ? void 0 : _e.call(_d);
        session.on("close", () => {
          if (this.channelzEnabled) {
            if (!sessionClosedByServer) {
              this.channelzTrace.addTrace("CT_INFO", "Connection dropped by client " + clientAddress);
            }
            this.sessionChildrenTracker.unrefChild(channelzRef);
            (0, channelz_1.unregisterChannelzRef)(channelzRef);
          }
          if (connectionAgeTimer) {
            clearTimeout(connectionAgeTimer);
          }
          if (connectionAgeGraceTimer) {
            clearTimeout(connectionAgeGraceTimer);
          }
          if (keeapliveTimeTimer) {
            clearTimeout(keeapliveTimeTimer);
          }
          this.sessions.delete(session);
        });
      });
    }
  }
  server.Server = Server;
  async function handleUnary(call2, handler, metadata2, encoding) {
    try {
      const request = await call2.receiveUnaryMessage(encoding);
      if (request === void 0 || call2.cancelled) {
        return;
      }
      const emitter = new server_call_1.ServerUnaryCallImpl(call2, metadata2, request);
      handler.func(emitter, (err, value, trailer, flags) => {
        call2.sendUnaryMessage(err, value, trailer, flags);
      });
    } catch (err) {
      call2.sendError(err);
    }
  }
  function handleClientStreaming(call2, handler, metadata2, encoding) {
    const stream = new server_call_1.ServerReadableStreamImpl(call2, metadata2, handler.deserialize, encoding);
    function respond(err, value, trailer, flags) {
      stream.destroy();
      call2.sendUnaryMessage(err, value, trailer, flags);
    }
    if (call2.cancelled) {
      return;
    }
    stream.on("error", respond);
    handler.func(stream, respond);
  }
  async function handleServerStreaming(call2, handler, metadata2, encoding) {
    try {
      const request = await call2.receiveUnaryMessage(encoding);
      if (request === void 0 || call2.cancelled) {
        return;
      }
      const stream = new server_call_1.ServerWritableStreamImpl(call2, metadata2, handler.serialize, request);
      handler.func(stream);
    } catch (err) {
      call2.sendError(err);
    }
  }
  function handleBidiStreaming(call2, handler, metadata2, encoding) {
    const stream = new server_call_1.ServerDuplexStreamImpl(call2, metadata2, handler.serialize, handler.deserialize, encoding);
    if (call2.cancelled) {
      return;
    }
    handler.func(stream);
  }
  return server;
}
var statusBuilder = {};
var hasRequiredStatusBuilder;
function requireStatusBuilder() {
  if (hasRequiredStatusBuilder) return statusBuilder;
  hasRequiredStatusBuilder = 1;
  Object.defineProperty(statusBuilder, "__esModule", { value: true });
  statusBuilder.StatusBuilder = void 0;
  class StatusBuilder {
    constructor() {
      this.code = null;
      this.details = null;
      this.metadata = null;
    }
    /**
     * Adds a status code to the builder.
     */
    withCode(code) {
      this.code = code;
      return this;
    }
    /**
     * Adds details to the builder.
     */
    withDetails(details) {
      this.details = details;
      return this;
    }
    /**
     * Adds metadata to the builder.
     */
    withMetadata(metadata2) {
      this.metadata = metadata2;
      return this;
    }
    /**
     * Builds the status object.
     */
    build() {
      const status = {};
      if (this.code !== null) {
        status.code = this.code;
      }
      if (this.details !== null) {
        status.details = this.details;
      }
      if (this.metadata !== null) {
        status.metadata = this.metadata;
      }
      return status;
    }
  }
  statusBuilder.StatusBuilder = StatusBuilder;
  return statusBuilder;
}
var experimental = {};
var duration = {};
var hasRequiredDuration;
function requireDuration() {
  if (hasRequiredDuration) return duration;
  hasRequiredDuration = 1;
  Object.defineProperty(duration, "__esModule", { value: true });
  duration.msToDuration = msToDuration;
  duration.durationToMs = durationToMs;
  duration.isDuration = isDuration;
  function msToDuration(millis) {
    return {
      seconds: millis / 1e3 | 0,
      nanos: millis % 1e3 * 1e6 | 0
    };
  }
  function durationToMs(duration2) {
    return duration2.seconds * 1e3 + duration2.nanos / 1e6 | 0;
  }
  function isDuration(value) {
    return typeof value.seconds === "number" && typeof value.nanos === "number";
  }
  return duration;
}
var loadBalancerOutlierDetection = {};
var hasRequiredLoadBalancerOutlierDetection;
function requireLoadBalancerOutlierDetection() {
  if (hasRequiredLoadBalancerOutlierDetection) return loadBalancerOutlierDetection;
  hasRequiredLoadBalancerOutlierDetection = 1;
  var _a;
  Object.defineProperty(loadBalancerOutlierDetection, "__esModule", { value: true });
  loadBalancerOutlierDetection.OutlierDetectionLoadBalancer = loadBalancerOutlierDetection.OutlierDetectionLoadBalancingConfig = void 0;
  loadBalancerOutlierDetection.setup = setup;
  const connectivity_state_1 = requireConnectivityState();
  const constants_1 = requireConstants();
  const duration_1 = requireDuration();
  const experimental_1 = requireExperimental();
  const load_balancer_1 = requireLoadBalancer();
  const load_balancer_child_handler_1 = requireLoadBalancerChildHandler();
  const picker_1 = requirePicker();
  const subchannel_address_1 = requireSubchannelAddress();
  const subchannel_interface_1 = requireSubchannelInterface();
  const logging2 = requireLogging();
  const TRACER_NAME = "outlier_detection";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "outlier_detection";
  const OUTLIER_DETECTION_ENABLED = ((_a = process.env.GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION) !== null && _a !== void 0 ? _a : "true") === "true";
  const defaultSuccessRateEjectionConfig = {
    stdev_factor: 1900,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 100
  };
  const defaultFailurePercentageEjectionConfig = {
    threshold: 85,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 50
  };
  function validateFieldType(obj, fieldName, expectedType, objectName) {
    if (fieldName in obj && typeof obj[fieldName] !== expectedType) {
      const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
      throw new Error(`outlier detection config ${fullFieldName} parse error: expected ${expectedType}, got ${typeof obj[fieldName]}`);
    }
  }
  function validatePositiveDuration(obj, fieldName, objectName) {
    const fullFieldName = fieldName;
    if (fieldName in obj) {
      if (!(0, duration_1.isDuration)(obj[fieldName])) {
        throw new Error(`outlier detection config ${fullFieldName} parse error: expected Duration, got ${typeof obj[fieldName]}`);
      }
      if (!(obj[fieldName].seconds >= 0 && obj[fieldName].seconds <= 315576e6 && obj[fieldName].nanos >= 0 && obj[fieldName].nanos <= 999999999)) {
        throw new Error(`outlier detection config ${fullFieldName} parse error: values out of range for non-negative Duaration`);
      }
    }
  }
  function validatePercentage(obj, fieldName, objectName) {
    const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
    validateFieldType(obj, fieldName, "number", objectName);
    if (fieldName in obj && !(obj[fieldName] >= 0 && obj[fieldName] <= 100)) {
      throw new Error(`outlier detection config ${fullFieldName} parse error: value out of range for percentage (0-100)`);
    }
  }
  class OutlierDetectionLoadBalancingConfig {
    constructor(intervalMs, baseEjectionTimeMs, maxEjectionTimeMs, maxEjectionPercent, successRateEjection, failurePercentageEjection, childPolicy) {
      this.childPolicy = childPolicy;
      if (childPolicy.length > 0 && childPolicy[0].getLoadBalancerName() === "pick_first") {
        throw new Error("outlier_detection LB policy cannot have a pick_first child policy");
      }
      this.intervalMs = intervalMs !== null && intervalMs !== void 0 ? intervalMs : 1e4;
      this.baseEjectionTimeMs = baseEjectionTimeMs !== null && baseEjectionTimeMs !== void 0 ? baseEjectionTimeMs : 3e4;
      this.maxEjectionTimeMs = maxEjectionTimeMs !== null && maxEjectionTimeMs !== void 0 ? maxEjectionTimeMs : 3e5;
      this.maxEjectionPercent = maxEjectionPercent !== null && maxEjectionPercent !== void 0 ? maxEjectionPercent : 10;
      this.successRateEjection = successRateEjection ? Object.assign(Object.assign({}, defaultSuccessRateEjectionConfig), successRateEjection) : null;
      this.failurePercentageEjection = failurePercentageEjection ? Object.assign(Object.assign({}, defaultFailurePercentageEjectionConfig), failurePercentageEjection) : null;
    }
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    toJsonObject() {
      return {
        interval: (0, duration_1.msToDuration)(this.intervalMs),
        base_ejection_time: (0, duration_1.msToDuration)(this.baseEjectionTimeMs),
        max_ejection_time: (0, duration_1.msToDuration)(this.maxEjectionTimeMs),
        max_ejection_percent: this.maxEjectionPercent,
        success_rate_ejection: this.successRateEjection,
        failure_percentage_ejection: this.failurePercentageEjection,
        child_policy: this.childPolicy.map((policy) => policy.toJsonObject())
      };
    }
    getIntervalMs() {
      return this.intervalMs;
    }
    getBaseEjectionTimeMs() {
      return this.baseEjectionTimeMs;
    }
    getMaxEjectionTimeMs() {
      return this.maxEjectionTimeMs;
    }
    getMaxEjectionPercent() {
      return this.maxEjectionPercent;
    }
    getSuccessRateEjectionConfig() {
      return this.successRateEjection;
    }
    getFailurePercentageEjectionConfig() {
      return this.failurePercentageEjection;
    }
    getChildPolicy() {
      return this.childPolicy;
    }
    copyWithChildPolicy(childPolicy) {
      return new OutlierDetectionLoadBalancingConfig(this.intervalMs, this.baseEjectionTimeMs, this.maxEjectionTimeMs, this.maxEjectionPercent, this.successRateEjection, this.failurePercentageEjection, childPolicy);
    }
    static createFromJson(obj) {
      var _a2;
      validatePositiveDuration(obj, "interval");
      validatePositiveDuration(obj, "base_ejection_time");
      validatePositiveDuration(obj, "max_ejection_time");
      validatePercentage(obj, "max_ejection_percent");
      if ("success_rate_ejection" in obj) {
        if (typeof obj.success_rate_ejection !== "object") {
          throw new Error("outlier detection config success_rate_ejection must be an object");
        }
        validateFieldType(obj.success_rate_ejection, "stdev_factor", "number", "success_rate_ejection");
        validatePercentage(obj.success_rate_ejection, "enforcement_percentage", "success_rate_ejection");
        validateFieldType(obj.success_rate_ejection, "minimum_hosts", "number", "success_rate_ejection");
        validateFieldType(obj.success_rate_ejection, "request_volume", "number", "success_rate_ejection");
      }
      if ("failure_percentage_ejection" in obj) {
        if (typeof obj.failure_percentage_ejection !== "object") {
          throw new Error("outlier detection config failure_percentage_ejection must be an object");
        }
        validatePercentage(obj.failure_percentage_ejection, "threshold", "failure_percentage_ejection");
        validatePercentage(obj.failure_percentage_ejection, "enforcement_percentage", "failure_percentage_ejection");
        validateFieldType(obj.failure_percentage_ejection, "minimum_hosts", "number", "failure_percentage_ejection");
        validateFieldType(obj.failure_percentage_ejection, "request_volume", "number", "failure_percentage_ejection");
      }
      return new OutlierDetectionLoadBalancingConfig(obj.interval ? (0, duration_1.durationToMs)(obj.interval) : null, obj.base_ejection_time ? (0, duration_1.durationToMs)(obj.base_ejection_time) : null, obj.max_ejection_time ? (0, duration_1.durationToMs)(obj.max_ejection_time) : null, (_a2 = obj.max_ejection_percent) !== null && _a2 !== void 0 ? _a2 : null, obj.success_rate_ejection, obj.failure_percentage_ejection, obj.child_policy.map(load_balancer_1.validateLoadBalancingConfig));
    }
  }
  loadBalancerOutlierDetection.OutlierDetectionLoadBalancingConfig = OutlierDetectionLoadBalancingConfig;
  class OutlierDetectionSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
    constructor(childSubchannel, mapEntry) {
      super(childSubchannel);
      this.mapEntry = mapEntry;
      this.stateListeners = [];
      this.ejected = false;
      this.refCount = 0;
      this.childSubchannelState = childSubchannel.getConnectivityState();
      childSubchannel.addConnectivityStateListener((subchannel2, previousState, newState, keepaliveTime) => {
        this.childSubchannelState = newState;
        if (!this.ejected) {
          for (const listener of this.stateListeners) {
            listener(this, previousState, newState, keepaliveTime);
          }
        }
      });
    }
    getConnectivityState() {
      if (this.ejected) {
        return connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE;
      } else {
        return this.childSubchannelState;
      }
    }
    /**
     * Add a listener function to be called whenever the wrapper's
     * connectivity state changes.
     * @param listener
     */
    addConnectivityStateListener(listener) {
      this.stateListeners.push(listener);
    }
    /**
     * Remove a listener previously added with `addConnectivityStateListener`
     * @param listener A reference to a function previously passed to
     *     `addConnectivityStateListener`
     */
    removeConnectivityStateListener(listener) {
      const listenerIndex = this.stateListeners.indexOf(listener);
      if (listenerIndex > -1) {
        this.stateListeners.splice(listenerIndex, 1);
      }
    }
    ref() {
      this.child.ref();
      this.refCount += 1;
    }
    unref() {
      this.child.unref();
      this.refCount -= 1;
      if (this.refCount <= 0) {
        if (this.mapEntry) {
          const index = this.mapEntry.subchannelWrappers.indexOf(this);
          if (index >= 0) {
            this.mapEntry.subchannelWrappers.splice(index, 1);
          }
        }
      }
    }
    eject() {
      this.ejected = true;
      for (const listener of this.stateListeners) {
        listener(this, this.childSubchannelState, connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, -1);
      }
    }
    uneject() {
      this.ejected = false;
      for (const listener of this.stateListeners) {
        listener(this, connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, this.childSubchannelState, -1);
      }
    }
    getMapEntry() {
      return this.mapEntry;
    }
    getWrappedSubchannel() {
      return this.child;
    }
  }
  function createEmptyBucket() {
    return {
      success: 0,
      failure: 0
    };
  }
  class CallCounter {
    constructor() {
      this.activeBucket = createEmptyBucket();
      this.inactiveBucket = createEmptyBucket();
    }
    addSuccess() {
      this.activeBucket.success += 1;
    }
    addFailure() {
      this.activeBucket.failure += 1;
    }
    switchBuckets() {
      this.inactiveBucket = this.activeBucket;
      this.activeBucket = createEmptyBucket();
    }
    getLastSuccesses() {
      return this.inactiveBucket.success;
    }
    getLastFailures() {
      return this.inactiveBucket.failure;
    }
  }
  class OutlierDetectionPicker {
    constructor(wrappedPicker, countCalls) {
      this.wrappedPicker = wrappedPicker;
      this.countCalls = countCalls;
    }
    pick(pickArgs) {
      const wrappedPick = this.wrappedPicker.pick(pickArgs);
      if (wrappedPick.pickResultType === picker_1.PickResultType.COMPLETE) {
        const subchannelWrapper = wrappedPick.subchannel;
        const mapEntry = subchannelWrapper.getMapEntry();
        if (mapEntry) {
          let onCallEnded = wrappedPick.onCallEnded;
          if (this.countCalls) {
            onCallEnded = (statusCode) => {
              var _a2;
              if (statusCode === constants_1.Status.OK) {
                mapEntry.counter.addSuccess();
              } else {
                mapEntry.counter.addFailure();
              }
              (_a2 = wrappedPick.onCallEnded) === null || _a2 === void 0 ? void 0 : _a2.call(wrappedPick, statusCode);
            };
          }
          return Object.assign(Object.assign({}, wrappedPick), { subchannel: subchannelWrapper.getWrappedSubchannel(), onCallEnded });
        } else {
          return Object.assign(Object.assign({}, wrappedPick), { subchannel: subchannelWrapper.getWrappedSubchannel() });
        }
      } else {
        return wrappedPick;
      }
    }
  }
  class OutlierDetectionLoadBalancer {
    constructor(channelControlHelper) {
      this.addressMap = /* @__PURE__ */ new Map();
      this.latestConfig = null;
      this.timerStartTime = null;
      this.childBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler((0, experimental_1.createChildChannelControlHelper)(channelControlHelper, {
        createSubchannel: (subchannelAddress2, subchannelArgs) => {
          const originalSubchannel = channelControlHelper.createSubchannel(subchannelAddress2, subchannelArgs);
          const mapEntry = this.addressMap.get((0, subchannel_address_1.subchannelAddressToString)(subchannelAddress2));
          const subchannelWrapper = new OutlierDetectionSubchannelWrapper(originalSubchannel, mapEntry);
          if ((mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.currentEjectionTimestamp) !== null) {
            subchannelWrapper.eject();
          }
          mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.subchannelWrappers.push(subchannelWrapper);
          return subchannelWrapper;
        },
        updateState: (connectivityState2, picker2) => {
          if (connectivityState2 === connectivity_state_1.ConnectivityState.READY) {
            channelControlHelper.updateState(connectivityState2, new OutlierDetectionPicker(picker2, this.isCountingEnabled()));
          } else {
            channelControlHelper.updateState(connectivityState2, picker2);
          }
        }
      }));
      this.ejectionTimer = setInterval(() => {
      }, 0);
      clearInterval(this.ejectionTimer);
    }
    isCountingEnabled() {
      return this.latestConfig !== null && (this.latestConfig.getSuccessRateEjectionConfig() !== null || this.latestConfig.getFailurePercentageEjectionConfig() !== null);
    }
    getCurrentEjectionPercent() {
      let ejectionCount = 0;
      for (const mapEntry of this.addressMap.values()) {
        if (mapEntry.currentEjectionTimestamp !== null) {
          ejectionCount += 1;
        }
      }
      return ejectionCount * 100 / this.addressMap.size;
    }
    runSuccessRateCheck(ejectionTimestamp) {
      if (!this.latestConfig) {
        return;
      }
      const successRateConfig = this.latestConfig.getSuccessRateEjectionConfig();
      if (!successRateConfig) {
        return;
      }
      trace("Running success rate check");
      const targetRequestVolume = successRateConfig.request_volume;
      let addresesWithTargetVolume = 0;
      const successRates = [];
      for (const [address, mapEntry] of this.addressMap) {
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        trace("Stats for " + address + ": successes=" + successes + " failures=" + failures + " targetRequestVolume=" + targetRequestVolume);
        if (successes + failures >= targetRequestVolume) {
          addresesWithTargetVolume += 1;
          successRates.push(successes / (successes + failures));
        }
      }
      trace("Found " + addresesWithTargetVolume + " success rate candidates; currentEjectionPercent=" + this.getCurrentEjectionPercent() + " successRates=[" + successRates + "]");
      if (addresesWithTargetVolume < successRateConfig.minimum_hosts) {
        return;
      }
      const successRateMean = successRates.reduce((a, b) => a + b) / successRates.length;
      let successRateDeviationSum = 0;
      for (const rate of successRates) {
        const deviation = rate - successRateMean;
        successRateDeviationSum += deviation * deviation;
      }
      const successRateVariance = successRateDeviationSum / successRates.length;
      const successRateStdev = Math.sqrt(successRateVariance);
      const ejectionThreshold = successRateMean - successRateStdev * (successRateConfig.stdev_factor / 1e3);
      trace("stdev=" + successRateStdev + " ejectionThreshold=" + ejectionThreshold);
      for (const [address, mapEntry] of this.addressMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
          break;
        }
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        if (successes + failures < targetRequestVolume) {
          continue;
        }
        const successRate = successes / (successes + failures);
        trace("Checking candidate " + address + " successRate=" + successRate);
        if (successRate < ejectionThreshold) {
          const randomNumber = Math.random() * 100;
          trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + successRateConfig.enforcement_percentage);
          if (randomNumber < successRateConfig.enforcement_percentage) {
            trace("Ejecting candidate " + address);
            this.eject(mapEntry, ejectionTimestamp);
          }
        }
      }
    }
    runFailurePercentageCheck(ejectionTimestamp) {
      if (!this.latestConfig) {
        return;
      }
      const failurePercentageConfig = this.latestConfig.getFailurePercentageEjectionConfig();
      if (!failurePercentageConfig) {
        return;
      }
      trace("Running failure percentage check. threshold=" + failurePercentageConfig.threshold + " request volume threshold=" + failurePercentageConfig.request_volume);
      let addressesWithTargetVolume = 0;
      for (const mapEntry of this.addressMap.values()) {
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        if (successes + failures >= failurePercentageConfig.request_volume) {
          addressesWithTargetVolume += 1;
        }
      }
      if (addressesWithTargetVolume < failurePercentageConfig.minimum_hosts) {
        return;
      }
      for (const [address, mapEntry] of this.addressMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
          break;
        }
        const successes = mapEntry.counter.getLastSuccesses();
        const failures = mapEntry.counter.getLastFailures();
        trace("Candidate successes=" + successes + " failures=" + failures);
        if (successes + failures < failurePercentageConfig.request_volume) {
          continue;
        }
        const failurePercentage = failures * 100 / (failures + successes);
        if (failurePercentage > failurePercentageConfig.threshold) {
          const randomNumber = Math.random() * 100;
          trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + failurePercentageConfig.enforcement_percentage);
          if (randomNumber < failurePercentageConfig.enforcement_percentage) {
            trace("Ejecting candidate " + address);
            this.eject(mapEntry, ejectionTimestamp);
          }
        }
      }
    }
    eject(mapEntry, ejectionTimestamp) {
      mapEntry.currentEjectionTimestamp = /* @__PURE__ */ new Date();
      mapEntry.ejectionTimeMultiplier += 1;
      for (const subchannelWrapper of mapEntry.subchannelWrappers) {
        subchannelWrapper.eject();
      }
    }
    uneject(mapEntry) {
      mapEntry.currentEjectionTimestamp = null;
      for (const subchannelWrapper of mapEntry.subchannelWrappers) {
        subchannelWrapper.uneject();
      }
    }
    switchAllBuckets() {
      for (const mapEntry of this.addressMap.values()) {
        mapEntry.counter.switchBuckets();
      }
    }
    startTimer(delayMs) {
      var _a2, _b;
      this.ejectionTimer = setTimeout(() => this.runChecks(), delayMs);
      (_b = (_a2 = this.ejectionTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a2);
    }
    runChecks() {
      const ejectionTimestamp = /* @__PURE__ */ new Date();
      trace("Ejection timer running");
      this.switchAllBuckets();
      if (!this.latestConfig) {
        return;
      }
      this.timerStartTime = ejectionTimestamp;
      this.startTimer(this.latestConfig.getIntervalMs());
      this.runSuccessRateCheck(ejectionTimestamp);
      this.runFailurePercentageCheck(ejectionTimestamp);
      for (const [address, mapEntry] of this.addressMap.entries()) {
        if (mapEntry.currentEjectionTimestamp === null) {
          if (mapEntry.ejectionTimeMultiplier > 0) {
            mapEntry.ejectionTimeMultiplier -= 1;
          }
        } else {
          const baseEjectionTimeMs = this.latestConfig.getBaseEjectionTimeMs();
          const maxEjectionTimeMs = this.latestConfig.getMaxEjectionTimeMs();
          const returnTime = new Date(mapEntry.currentEjectionTimestamp.getTime());
          returnTime.setMilliseconds(returnTime.getMilliseconds() + Math.min(baseEjectionTimeMs * mapEntry.ejectionTimeMultiplier, Math.max(baseEjectionTimeMs, maxEjectionTimeMs)));
          if (returnTime < /* @__PURE__ */ new Date()) {
            trace("Unejecting " + address);
            this.uneject(mapEntry);
          }
        }
      }
    }
    updateAddressList(addressList, lbConfig, attributes) {
      if (!(lbConfig instanceof OutlierDetectionLoadBalancingConfig)) {
        return;
      }
      const subchannelAddresses = /* @__PURE__ */ new Set();
      for (const address of addressList) {
        subchannelAddresses.add((0, subchannel_address_1.subchannelAddressToString)(address));
      }
      for (const address of subchannelAddresses) {
        if (!this.addressMap.has(address)) {
          trace("Adding map entry for " + address);
          this.addressMap.set(address, {
            counter: new CallCounter(),
            currentEjectionTimestamp: null,
            ejectionTimeMultiplier: 0,
            subchannelWrappers: []
          });
        }
      }
      for (const key of this.addressMap.keys()) {
        if (!subchannelAddresses.has(key)) {
          trace("Removing map entry for " + key);
          this.addressMap.delete(key);
        }
      }
      const childPolicy = (0, load_balancer_1.getFirstUsableConfig)(lbConfig.getChildPolicy(), true);
      this.childBalancer.updateAddressList(addressList, childPolicy, attributes);
      if (lbConfig.getSuccessRateEjectionConfig() || lbConfig.getFailurePercentageEjectionConfig()) {
        if (this.timerStartTime) {
          trace("Previous timer existed. Replacing timer");
          clearTimeout(this.ejectionTimer);
          const remainingDelay = lbConfig.getIntervalMs() - ((/* @__PURE__ */ new Date()).getTime() - this.timerStartTime.getTime());
          this.startTimer(remainingDelay);
        } else {
          trace("Starting new timer");
          this.timerStartTime = /* @__PURE__ */ new Date();
          this.startTimer(lbConfig.getIntervalMs());
          this.switchAllBuckets();
        }
      } else {
        trace("Counting disabled. Cancelling timer.");
        this.timerStartTime = null;
        clearTimeout(this.ejectionTimer);
        for (const mapEntry of this.addressMap.values()) {
          this.uneject(mapEntry);
          mapEntry.ejectionTimeMultiplier = 0;
        }
      }
      this.latestConfig = lbConfig;
    }
    exitIdle() {
      this.childBalancer.exitIdle();
    }
    resetBackoff() {
      this.childBalancer.resetBackoff();
    }
    destroy() {
      clearTimeout(this.ejectionTimer);
      this.childBalancer.destroy();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerOutlierDetection.OutlierDetectionLoadBalancer = OutlierDetectionLoadBalancer;
  function setup() {
    if (OUTLIER_DETECTION_ENABLED) {
      (0, experimental_1.registerLoadBalancerType)(TYPE_NAME, OutlierDetectionLoadBalancer, OutlierDetectionLoadBalancingConfig);
    }
  }
  return loadBalancerOutlierDetection;
}
var hasRequiredExperimental;
function requireExperimental() {
  if (hasRequiredExperimental) return experimental;
  hasRequiredExperimental = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutlierDetectionLoadBalancingConfig = exports.BaseSubchannelWrapper = exports.registerAdminService = exports.FilterStackFactory = exports.BaseFilter = exports.PickResultType = exports.QueuePicker = exports.UnavailablePicker = exports.ChildLoadBalancerHandler = exports.subchannelAddressToString = exports.validateLoadBalancingConfig = exports.getFirstUsableConfig = exports.registerLoadBalancerType = exports.createChildChannelControlHelper = exports.BackoffTimeout = exports.durationToMs = exports.uriToString = exports.createResolver = exports.registerResolver = exports.log = exports.trace = void 0;
    var logging_1 = requireLogging();
    Object.defineProperty(exports, "trace", { enumerable: true, get: function() {
      return logging_1.trace;
    } });
    Object.defineProperty(exports, "log", { enumerable: true, get: function() {
      return logging_1.log;
    } });
    var resolver_1 = requireResolver();
    Object.defineProperty(exports, "registerResolver", { enumerable: true, get: function() {
      return resolver_1.registerResolver;
    } });
    Object.defineProperty(exports, "createResolver", { enumerable: true, get: function() {
      return resolver_1.createResolver;
    } });
    var uri_parser_1 = requireUriParser();
    Object.defineProperty(exports, "uriToString", { enumerable: true, get: function() {
      return uri_parser_1.uriToString;
    } });
    var duration_1 = requireDuration();
    Object.defineProperty(exports, "durationToMs", { enumerable: true, get: function() {
      return duration_1.durationToMs;
    } });
    var backoff_timeout_1 = requireBackoffTimeout();
    Object.defineProperty(exports, "BackoffTimeout", { enumerable: true, get: function() {
      return backoff_timeout_1.BackoffTimeout;
    } });
    var load_balancer_1 = requireLoadBalancer();
    Object.defineProperty(exports, "createChildChannelControlHelper", { enumerable: true, get: function() {
      return load_balancer_1.createChildChannelControlHelper;
    } });
    Object.defineProperty(exports, "registerLoadBalancerType", { enumerable: true, get: function() {
      return load_balancer_1.registerLoadBalancerType;
    } });
    Object.defineProperty(exports, "getFirstUsableConfig", { enumerable: true, get: function() {
      return load_balancer_1.getFirstUsableConfig;
    } });
    Object.defineProperty(exports, "validateLoadBalancingConfig", { enumerable: true, get: function() {
      return load_balancer_1.validateLoadBalancingConfig;
    } });
    var subchannel_address_1 = requireSubchannelAddress();
    Object.defineProperty(exports, "subchannelAddressToString", { enumerable: true, get: function() {
      return subchannel_address_1.subchannelAddressToString;
    } });
    var load_balancer_child_handler_1 = requireLoadBalancerChildHandler();
    Object.defineProperty(exports, "ChildLoadBalancerHandler", { enumerable: true, get: function() {
      return load_balancer_child_handler_1.ChildLoadBalancerHandler;
    } });
    var picker_1 = requirePicker();
    Object.defineProperty(exports, "UnavailablePicker", { enumerable: true, get: function() {
      return picker_1.UnavailablePicker;
    } });
    Object.defineProperty(exports, "QueuePicker", { enumerable: true, get: function() {
      return picker_1.QueuePicker;
    } });
    Object.defineProperty(exports, "PickResultType", { enumerable: true, get: function() {
      return picker_1.PickResultType;
    } });
    var filter_1 = requireFilter();
    Object.defineProperty(exports, "BaseFilter", { enumerable: true, get: function() {
      return filter_1.BaseFilter;
    } });
    var filter_stack_1 = requireFilterStack();
    Object.defineProperty(exports, "FilterStackFactory", { enumerable: true, get: function() {
      return filter_stack_1.FilterStackFactory;
    } });
    var admin_1 = requireAdmin();
    Object.defineProperty(exports, "registerAdminService", { enumerable: true, get: function() {
      return admin_1.registerAdminService;
    } });
    var subchannel_interface_1 = requireSubchannelInterface();
    Object.defineProperty(exports, "BaseSubchannelWrapper", { enumerable: true, get: function() {
      return subchannel_interface_1.BaseSubchannelWrapper;
    } });
    var load_balancer_outlier_detection_1 = requireLoadBalancerOutlierDetection();
    Object.defineProperty(exports, "OutlierDetectionLoadBalancingConfig", { enumerable: true, get: function() {
      return load_balancer_outlier_detection_1.OutlierDetectionLoadBalancingConfig;
    } });
  })(experimental);
  return experimental;
}
var resolverUds = {};
var hasRequiredResolverUds;
function requireResolverUds() {
  if (hasRequiredResolverUds) return resolverUds;
  hasRequiredResolverUds = 1;
  Object.defineProperty(resolverUds, "__esModule", { value: true });
  resolverUds.setup = setup;
  const resolver_1 = requireResolver();
  class UdsResolver {
    constructor(target, listener, channelOptions2) {
      this.listener = listener;
      this.addresses = [];
      this.hasReturnedResult = false;
      let path;
      if (target.authority === "") {
        path = "/" + target.path;
      } else {
        path = target.path;
      }
      this.addresses = [{ path }];
    }
    updateResolution() {
      if (!this.hasReturnedResult) {
        this.hasReturnedResult = true;
        process.nextTick(this.listener.onSuccessfulResolution, this.addresses, null, null, null, {});
      }
    }
    destroy() {
    }
    static getDefaultAuthority(target) {
      return "localhost";
    }
  }
  function setup() {
    (0, resolver_1.registerResolver)("unix", UdsResolver);
  }
  return resolverUds;
}
var resolverIp = {};
var hasRequiredResolverIp;
function requireResolverIp() {
  if (hasRequiredResolverIp) return resolverIp;
  hasRequiredResolverIp = 1;
  Object.defineProperty(resolverIp, "__esModule", { value: true });
  resolverIp.setup = setup;
  const net_1 = require$$0$1;
  const constants_1 = requireConstants();
  const metadata_1 = requireMetadata();
  const resolver_1 = requireResolver();
  const uri_parser_1 = requireUriParser();
  const logging2 = requireLogging();
  const TRACER_NAME = "ip_resolver";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const IPV4_SCHEME = "ipv4";
  const IPV6_SCHEME = "ipv6";
  const DEFAULT_PORT = 443;
  class IpResolver {
    constructor(target, listener, channelOptions2) {
      var _a;
      this.listener = listener;
      this.addresses = [];
      this.error = null;
      this.hasReturnedResult = false;
      trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
      const addresses = [];
      if (!(target.scheme === IPV4_SCHEME || target.scheme === IPV6_SCHEME)) {
        this.error = {
          code: constants_1.Status.UNAVAILABLE,
          details: `Unrecognized scheme ${target.scheme} in IP resolver`,
          metadata: new metadata_1.Metadata()
        };
        return;
      }
      const pathList = target.path.split(",");
      for (const path of pathList) {
        const hostPort = (0, uri_parser_1.splitHostPort)(path);
        if (hostPort === null) {
          this.error = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Failed to parse ${target.scheme} address ${path}`,
            metadata: new metadata_1.Metadata()
          };
          return;
        }
        if (target.scheme === IPV4_SCHEME && !(0, net_1.isIPv4)(hostPort.host) || target.scheme === IPV6_SCHEME && !(0, net_1.isIPv6)(hostPort.host)) {
          this.error = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Failed to parse ${target.scheme} address ${path}`,
            metadata: new metadata_1.Metadata()
          };
          return;
        }
        addresses.push({
          host: hostPort.host,
          port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT
        });
      }
      this.addresses = addresses;
      trace("Parsed " + target.scheme + " address list " + this.addresses);
    }
    updateResolution() {
      if (!this.hasReturnedResult) {
        this.hasReturnedResult = true;
        process.nextTick(() => {
          if (this.error) {
            this.listener.onError(this.error);
          } else {
            this.listener.onSuccessfulResolution(this.addresses, null, null, null, {});
          }
        });
      }
    }
    destroy() {
      this.hasReturnedResult = false;
    }
    static getDefaultAuthority(target) {
      return target.path.split(",")[0];
    }
  }
  function setup() {
    (0, resolver_1.registerResolver)(IPV4_SCHEME, IpResolver);
    (0, resolver_1.registerResolver)(IPV6_SCHEME, IpResolver);
  }
  return resolverIp;
}
var loadBalancerPickFirst = {};
var hasRequiredLoadBalancerPickFirst;
function requireLoadBalancerPickFirst() {
  if (hasRequiredLoadBalancerPickFirst) return loadBalancerPickFirst;
  hasRequiredLoadBalancerPickFirst = 1;
  Object.defineProperty(loadBalancerPickFirst, "__esModule", { value: true });
  loadBalancerPickFirst.PickFirstLoadBalancer = loadBalancerPickFirst.PickFirstLoadBalancingConfig = void 0;
  loadBalancerPickFirst.shuffled = shuffled;
  loadBalancerPickFirst.setup = setup;
  const load_balancer_1 = requireLoadBalancer();
  const connectivity_state_1 = requireConnectivityState();
  const picker_1 = requirePicker();
  const logging2 = requireLogging();
  const constants_1 = requireConstants();
  const TRACER_NAME = "pick_first";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "pick_first";
  const CONNECTION_DELAY_INTERVAL_MS = 250;
  class PickFirstLoadBalancingConfig {
    constructor(shuffleAddressList) {
      this.shuffleAddressList = shuffleAddressList;
    }
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    toJsonObject() {
      return {
        [TYPE_NAME]: {
          shuffleAddressList: this.shuffleAddressList
        }
      };
    }
    getShuffleAddressList() {
      return this.shuffleAddressList;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
      if ("shuffleAddressList" in obj && !(typeof obj.shuffleAddressList === "boolean")) {
        throw new Error("pick_first config field shuffleAddressList must be a boolean if provided");
      }
      return new PickFirstLoadBalancingConfig(obj.shuffleAddressList === true);
    }
  }
  loadBalancerPickFirst.PickFirstLoadBalancingConfig = PickFirstLoadBalancingConfig;
  class PickFirstPicker {
    constructor(subchannel2) {
      this.subchannel = subchannel2;
    }
    pick(pickArgs) {
      return {
        pickResultType: picker_1.PickResultType.COMPLETE,
        subchannel: this.subchannel,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      };
    }
  }
  function shuffled(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }
  class PickFirstLoadBalancer {
    /**
     * Load balancer that attempts to connect to each backend in the address list
     * in order, and picks the first one that connects, using it for every
     * request.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     */
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.children = [];
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.currentSubchannelIndex = 0;
      this.currentPick = null;
      this.subchannelStateListener = (subchannel2, previousState, newState, keepaliveTime, errorMessage) => {
        this.onSubchannelStateUpdate(subchannel2, previousState, newState, errorMessage);
      };
      this.triedAllSubchannels = false;
      this.stickyTransientFailureMode = false;
      this.requestedResolutionSinceLastUpdate = false;
      this.lastError = null;
      this.latestAddressList = null;
      this.connectionDelayTimeout = setTimeout(() => {
      }, 0);
      clearTimeout(this.connectionDelayTimeout);
    }
    allChildrenHaveReportedTF() {
      return this.children.every((child) => child.hasReportedTransientFailure);
    }
    calculateAndReportNewState() {
      if (this.currentPick) {
        this.updateState(connectivity_state_1.ConnectivityState.READY, new PickFirstPicker(this.currentPick));
      } else if (this.children.length === 0) {
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
      } else {
        if (this.stickyTransientFailureMode) {
          this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({ details: `No connection established. Last error: ${this.lastError}` }));
        } else {
          this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        }
      }
    }
    requestReresolution() {
      this.requestedResolutionSinceLastUpdate = true;
      this.channelControlHelper.requestReresolution();
    }
    maybeEnterStickyTransientFailureMode() {
      if (!this.allChildrenHaveReportedTF()) {
        return;
      }
      if (!this.requestedResolutionSinceLastUpdate) {
        this.requestReresolution();
      }
      if (this.stickyTransientFailureMode) {
        return;
      }
      this.stickyTransientFailureMode = true;
      for (const { subchannel: subchannel2 } of this.children) {
        subchannel2.startConnecting();
      }
      this.calculateAndReportNewState();
    }
    removeCurrentPick() {
      if (this.currentPick !== null) {
        const currentPick = this.currentPick;
        this.currentPick = null;
        currentPick.unref();
        currentPick.removeConnectivityStateListener(this.subchannelStateListener);
        this.channelControlHelper.removeChannelzChild(currentPick.getChannelzRef());
      }
    }
    onSubchannelStateUpdate(subchannel2, previousState, newState, errorMessage) {
      var _a;
      if ((_a = this.currentPick) === null || _a === void 0 ? void 0 : _a.realSubchannelEquals(subchannel2)) {
        if (newState !== connectivity_state_1.ConnectivityState.READY) {
          this.removeCurrentPick();
          this.calculateAndReportNewState();
          this.requestReresolution();
        }
        return;
      }
      for (const [index, child] of this.children.entries()) {
        if (subchannel2.realSubchannelEquals(child.subchannel)) {
          if (newState === connectivity_state_1.ConnectivityState.READY) {
            this.pickSubchannel(child.subchannel);
          }
          if (newState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            child.hasReportedTransientFailure = true;
            if (errorMessage) {
              this.lastError = errorMessage;
            }
            this.maybeEnterStickyTransientFailureMode();
            if (index === this.currentSubchannelIndex) {
              this.startNextSubchannelConnecting(index + 1);
            }
          }
          child.subchannel.startConnecting();
          return;
        }
      }
    }
    startNextSubchannelConnecting(startIndex) {
      clearTimeout(this.connectionDelayTimeout);
      if (this.triedAllSubchannels) {
        return;
      }
      for (const [index, child] of this.children.entries()) {
        if (index >= startIndex) {
          const subchannelState = child.subchannel.getConnectivityState();
          if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.CONNECTING) {
            this.startConnecting(index);
            return;
          }
        }
      }
      this.triedAllSubchannels = true;
      this.maybeEnterStickyTransientFailureMode();
    }
    /**
     * Have a single subchannel in the `subchannels` list start connecting.
     * @param subchannelIndex The index into the `subchannels` list.
     */
    startConnecting(subchannelIndex) {
      var _a, _b;
      clearTimeout(this.connectionDelayTimeout);
      this.currentSubchannelIndex = subchannelIndex;
      if (this.children[subchannelIndex].subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.IDLE) {
        trace("Start connecting to subchannel with address " + this.children[subchannelIndex].subchannel.getAddress());
        process.nextTick(() => {
          var _a2;
          (_a2 = this.children[subchannelIndex]) === null || _a2 === void 0 ? void 0 : _a2.subchannel.startConnecting();
        });
      }
      this.connectionDelayTimeout = (_b = (_a = setTimeout(() => {
        this.startNextSubchannelConnecting(subchannelIndex + 1);
      }, CONNECTION_DELAY_INTERVAL_MS)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    pickSubchannel(subchannel2) {
      if (this.currentPick && subchannel2.realSubchannelEquals(this.currentPick)) {
        return;
      }
      trace("Pick subchannel with address " + subchannel2.getAddress());
      this.stickyTransientFailureMode = false;
      if (this.currentPick !== null) {
        this.currentPick.unref();
        this.channelControlHelper.removeChannelzChild(this.currentPick.getChannelzRef());
        this.currentPick.removeConnectivityStateListener(this.subchannelStateListener);
      }
      this.currentPick = subchannel2;
      subchannel2.ref();
      this.channelControlHelper.addChannelzChild(subchannel2.getChannelzRef());
      this.resetSubchannelList();
      clearTimeout(this.connectionDelayTimeout);
      this.calculateAndReportNewState();
    }
    updateState(newState, picker2) {
      trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      this.currentState = newState;
      this.channelControlHelper.updateState(newState, picker2);
    }
    resetSubchannelList() {
      for (const child of this.children) {
        if (!(this.currentPick && child.subchannel.realSubchannelEquals(this.currentPick))) {
          child.subchannel.removeConnectivityStateListener(this.subchannelStateListener);
        }
        child.subchannel.unref();
        this.channelControlHelper.removeChannelzChild(child.subchannel.getChannelzRef());
      }
      this.currentSubchannelIndex = 0;
      this.children = [];
      this.triedAllSubchannels = false;
      this.requestedResolutionSinceLastUpdate = false;
    }
    connectToAddressList(addressList) {
      const newChildrenList = addressList.map((address) => ({
        subchannel: this.channelControlHelper.createSubchannel(address, {}),
        hasReportedTransientFailure: false
      }));
      for (const { subchannel: subchannel2 } of newChildrenList) {
        subchannel2.ref();
        this.channelControlHelper.addChannelzChild(subchannel2.getChannelzRef());
      }
      this.resetSubchannelList();
      this.children = newChildrenList;
      for (const { subchannel: subchannel2 } of this.children) {
        subchannel2.addConnectivityStateListener(this.subchannelStateListener);
        if (subchannel2.getConnectivityState() === connectivity_state_1.ConnectivityState.READY) {
          this.pickSubchannel(subchannel2);
          return;
        }
      }
      for (const child of this.children) {
        if (child.subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
          child.hasReportedTransientFailure = true;
        }
      }
      this.startNextSubchannelConnecting(0);
      this.calculateAndReportNewState();
    }
    updateAddressList(addressList, lbConfig) {
      if (!(lbConfig instanceof PickFirstLoadBalancingConfig)) {
        return;
      }
      if (lbConfig.getShuffleAddressList()) {
        addressList = shuffled(addressList);
      }
      this.latestAddressList = addressList;
      this.connectToAddressList(addressList);
    }
    exitIdle() {
      if (this.currentState === connectivity_state_1.ConnectivityState.IDLE && this.latestAddressList) {
        this.connectToAddressList(this.latestAddressList);
      }
    }
    resetBackoff() {
    }
    destroy() {
      this.resetSubchannelList();
      this.removeCurrentPick();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerPickFirst.PickFirstLoadBalancer = PickFirstLoadBalancer;
  function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, PickFirstLoadBalancer, PickFirstLoadBalancingConfig);
    (0, load_balancer_1.registerDefaultLoadBalancerType)(TYPE_NAME);
  }
  return loadBalancerPickFirst;
}
var loadBalancerRoundRobin = {};
var hasRequiredLoadBalancerRoundRobin;
function requireLoadBalancerRoundRobin() {
  if (hasRequiredLoadBalancerRoundRobin) return loadBalancerRoundRobin;
  hasRequiredLoadBalancerRoundRobin = 1;
  Object.defineProperty(loadBalancerRoundRobin, "__esModule", { value: true });
  loadBalancerRoundRobin.RoundRobinLoadBalancer = void 0;
  loadBalancerRoundRobin.setup = setup;
  const load_balancer_1 = requireLoadBalancer();
  const connectivity_state_1 = requireConnectivityState();
  const picker_1 = requirePicker();
  const subchannel_address_1 = requireSubchannelAddress();
  const logging2 = requireLogging();
  const constants_1 = requireConstants();
  const TRACER_NAME = "round_robin";
  function trace(text) {
    logging2.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
  }
  const TYPE_NAME = "round_robin";
  class RoundRobinLoadBalancingConfig {
    getLoadBalancerName() {
      return TYPE_NAME;
    }
    constructor() {
    }
    toJsonObject() {
      return {
        [TYPE_NAME]: {}
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
      return new RoundRobinLoadBalancingConfig();
    }
  }
  class RoundRobinPicker {
    constructor(subchannelList, nextIndex = 0) {
      this.subchannelList = subchannelList;
      this.nextIndex = nextIndex;
    }
    pick(pickArgs) {
      const pickedSubchannel = this.subchannelList[this.nextIndex];
      this.nextIndex = (this.nextIndex + 1) % this.subchannelList.length;
      return {
        pickResultType: picker_1.PickResultType.COMPLETE,
        subchannel: pickedSubchannel,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      };
    }
    /**
     * Check what the next subchannel returned would be. Used by the load
     * balancer implementation to preserve this part of the picker state if
     * possible when a subchannel connects or disconnects.
     */
    peekNextSubchannel() {
      return this.subchannelList[this.nextIndex];
    }
  }
  class RoundRobinLoadBalancer {
    constructor(channelControlHelper) {
      this.channelControlHelper = channelControlHelper;
      this.subchannels = [];
      this.currentState = connectivity_state_1.ConnectivityState.IDLE;
      this.currentReadyPicker = null;
      this.lastError = null;
      this.subchannelStateListener = (subchannel2, previousState, newState, keepaliveTime, errorMessage) => {
        this.calculateAndUpdateState();
        if (newState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE || newState === connectivity_state_1.ConnectivityState.IDLE) {
          if (errorMessage) {
            this.lastError = errorMessage;
          }
          this.channelControlHelper.requestReresolution();
          subchannel2.startConnecting();
        }
      };
    }
    countSubchannelsWithState(state) {
      return this.subchannels.filter((subchannel2) => subchannel2.getConnectivityState() === state).length;
    }
    calculateAndUpdateState() {
      if (this.countSubchannelsWithState(connectivity_state_1.ConnectivityState.READY) > 0) {
        const readySubchannels = this.subchannels.filter((subchannel2) => subchannel2.getConnectivityState() === connectivity_state_1.ConnectivityState.READY);
        let index = 0;
        if (this.currentReadyPicker !== null) {
          index = readySubchannels.indexOf(this.currentReadyPicker.peekNextSubchannel());
          if (index < 0) {
            index = 0;
          }
        }
        this.updateState(connectivity_state_1.ConnectivityState.READY, new RoundRobinPicker(readySubchannels, index));
      } else if (this.countSubchannelsWithState(connectivity_state_1.ConnectivityState.CONNECTING) > 0) {
        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
      } else if (this.countSubchannelsWithState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) > 0) {
        this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker({ details: `No connection established. Last error: ${this.lastError}` }));
      } else {
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
      }
    }
    updateState(newState, picker2) {
      trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
      if (newState === connectivity_state_1.ConnectivityState.READY) {
        this.currentReadyPicker = picker2;
      } else {
        this.currentReadyPicker = null;
      }
      this.currentState = newState;
      this.channelControlHelper.updateState(newState, picker2);
    }
    resetSubchannelList() {
      for (const subchannel2 of this.subchannels) {
        subchannel2.removeConnectivityStateListener(this.subchannelStateListener);
        subchannel2.unref();
        this.channelControlHelper.removeChannelzChild(subchannel2.getChannelzRef());
      }
      this.subchannels = [];
    }
    updateAddressList(addressList, lbConfig) {
      this.resetSubchannelList();
      trace("Connect to address list " + addressList.map((address) => (0, subchannel_address_1.subchannelAddressToString)(address)));
      this.subchannels = addressList.map((address) => this.channelControlHelper.createSubchannel(address, {}));
      for (const subchannel2 of this.subchannels) {
        subchannel2.ref();
        subchannel2.addConnectivityStateListener(this.subchannelStateListener);
        this.channelControlHelper.addChannelzChild(subchannel2.getChannelzRef());
        const subchannelState = subchannel2.getConnectivityState();
        if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
          subchannel2.startConnecting();
        }
      }
      this.calculateAndUpdateState();
    }
    exitIdle() {
      for (const subchannel2 of this.subchannels) {
        subchannel2.startConnecting();
      }
    }
    resetBackoff() {
    }
    destroy() {
      this.resetSubchannelList();
    }
    getTypeName() {
      return TYPE_NAME;
    }
  }
  loadBalancerRoundRobin.RoundRobinLoadBalancer = RoundRobinLoadBalancer;
  function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, RoundRobinLoadBalancer, RoundRobinLoadBalancingConfig);
  }
  return loadBalancerRoundRobin;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.experimental = exports.addAdminServicesToServer = exports.getChannelzHandlers = exports.getChannelzServiceDefinition = exports.InterceptorConfigurationError = exports.InterceptingCall = exports.RequesterBuilder = exports.ListenerBuilder = exports.StatusBuilder = exports.getClientChannel = exports.ServerCredentials = exports.Server = exports.setLogVerbosity = exports.setLogger = exports.load = exports.loadObject = exports.CallCredentials = exports.ChannelCredentials = exports.waitForClientReady = exports.closeClient = exports.Channel = exports.makeGenericClientConstructor = exports.makeClientConstructor = exports.loadPackageDefinition = exports.Client = exports.compressionAlgorithms = exports.propagate = exports.connectivityState = exports.status = exports.logVerbosity = exports.Metadata = exports.credentials = void 0;
    const call_credentials_1 = requireCallCredentials();
    Object.defineProperty(exports, "CallCredentials", { enumerable: true, get: function() {
      return call_credentials_1.CallCredentials;
    } });
    const channel_1 = requireChannel();
    Object.defineProperty(exports, "Channel", { enumerable: true, get: function() {
      return channel_1.ChannelImplementation;
    } });
    const compression_algorithms_1 = requireCompressionAlgorithms();
    Object.defineProperty(exports, "compressionAlgorithms", { enumerable: true, get: function() {
      return compression_algorithms_1.CompressionAlgorithms;
    } });
    const connectivity_state_1 = requireConnectivityState();
    Object.defineProperty(exports, "connectivityState", { enumerable: true, get: function() {
      return connectivity_state_1.ConnectivityState;
    } });
    const channel_credentials_1 = requireChannelCredentials();
    Object.defineProperty(exports, "ChannelCredentials", { enumerable: true, get: function() {
      return channel_credentials_1.ChannelCredentials;
    } });
    const client_1 = requireClient();
    Object.defineProperty(exports, "Client", { enumerable: true, get: function() {
      return client_1.Client;
    } });
    const constants_1 = requireConstants();
    Object.defineProperty(exports, "logVerbosity", { enumerable: true, get: function() {
      return constants_1.LogVerbosity;
    } });
    Object.defineProperty(exports, "status", { enumerable: true, get: function() {
      return constants_1.Status;
    } });
    Object.defineProperty(exports, "propagate", { enumerable: true, get: function() {
      return constants_1.Propagate;
    } });
    const logging2 = requireLogging();
    const make_client_1 = requireMakeClient();
    Object.defineProperty(exports, "loadPackageDefinition", { enumerable: true, get: function() {
      return make_client_1.loadPackageDefinition;
    } });
    Object.defineProperty(exports, "makeClientConstructor", { enumerable: true, get: function() {
      return make_client_1.makeClientConstructor;
    } });
    Object.defineProperty(exports, "makeGenericClientConstructor", { enumerable: true, get: function() {
      return make_client_1.makeClientConstructor;
    } });
    const metadata_1 = requireMetadata();
    Object.defineProperty(exports, "Metadata", { enumerable: true, get: function() {
      return metadata_1.Metadata;
    } });
    const server_1 = requireServer();
    Object.defineProperty(exports, "Server", { enumerable: true, get: function() {
      return server_1.Server;
    } });
    const server_credentials_1 = requireServerCredentials();
    Object.defineProperty(exports, "ServerCredentials", { enumerable: true, get: function() {
      return server_credentials_1.ServerCredentials;
    } });
    const status_builder_1 = requireStatusBuilder();
    Object.defineProperty(exports, "StatusBuilder", { enumerable: true, get: function() {
      return status_builder_1.StatusBuilder;
    } });
    exports.credentials = {
      /**
       * Combine a ChannelCredentials with any number of CallCredentials into a
       * single ChannelCredentials object.
       * @param channelCredentials The ChannelCredentials object.
       * @param callCredentials Any number of CallCredentials objects.
       * @return The resulting ChannelCredentials object.
       */
      combineChannelCredentials: (channelCredentials2, ...callCredentials2) => {
        return callCredentials2.reduce((acc, other) => acc.compose(other), channelCredentials2);
      },
      /**
       * Combine any number of CallCredentials into a single CallCredentials
       * object.
       * @param first The first CallCredentials object.
       * @param additional Any number of additional CallCredentials objects.
       * @return The resulting CallCredentials object.
       */
      combineCallCredentials: (first, ...additional) => {
        return additional.reduce((acc, other) => acc.compose(other), first);
      },
      // from channel-credentials.ts
      createInsecure: channel_credentials_1.ChannelCredentials.createInsecure,
      createSsl: channel_credentials_1.ChannelCredentials.createSsl,
      createFromSecureContext: channel_credentials_1.ChannelCredentials.createFromSecureContext,
      // from call-credentials.ts
      createFromMetadataGenerator: call_credentials_1.CallCredentials.createFromMetadataGenerator,
      createFromGoogleCredential: call_credentials_1.CallCredentials.createFromGoogleCredential,
      createEmpty: call_credentials_1.CallCredentials.createEmpty
    };
    const closeClient = (client2) => client2.close();
    exports.closeClient = closeClient;
    const waitForClientReady = (client2, deadline2, callback) => client2.waitForReady(deadline2, callback);
    exports.waitForClientReady = waitForClientReady;
    const loadObject = (value, options) => {
      throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
    };
    exports.loadObject = loadObject;
    const load = (filename, format, options) => {
      throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
    };
    exports.load = load;
    const setLogger = (logger) => {
      logging2.setLogger(logger);
    };
    exports.setLogger = setLogger;
    const setLogVerbosity = (verbosity) => {
      logging2.setLoggerVerbosity(verbosity);
    };
    exports.setLogVerbosity = setLogVerbosity;
    const getClientChannel = (client2) => {
      return client_1.Client.prototype.getChannel.call(client2);
    };
    exports.getClientChannel = getClientChannel;
    var client_interceptors_1 = requireClientInterceptors();
    Object.defineProperty(exports, "ListenerBuilder", { enumerable: true, get: function() {
      return client_interceptors_1.ListenerBuilder;
    } });
    Object.defineProperty(exports, "RequesterBuilder", { enumerable: true, get: function() {
      return client_interceptors_1.RequesterBuilder;
    } });
    Object.defineProperty(exports, "InterceptingCall", { enumerable: true, get: function() {
      return client_interceptors_1.InterceptingCall;
    } });
    Object.defineProperty(exports, "InterceptorConfigurationError", { enumerable: true, get: function() {
      return client_interceptors_1.InterceptorConfigurationError;
    } });
    var channelz_1 = requireChannelz();
    Object.defineProperty(exports, "getChannelzServiceDefinition", { enumerable: true, get: function() {
      return channelz_1.getChannelzServiceDefinition;
    } });
    Object.defineProperty(exports, "getChannelzHandlers", { enumerable: true, get: function() {
      return channelz_1.getChannelzHandlers;
    } });
    var admin_1 = requireAdmin();
    Object.defineProperty(exports, "addAdminServicesToServer", { enumerable: true, get: function() {
      return admin_1.addAdminServicesToServer;
    } });
    const experimental2 = requireExperimental();
    exports.experimental = experimental2;
    const resolver_dns = requireResolverDns();
    const resolver_uds = requireResolverUds();
    const resolver_ip = requireResolverIp();
    const load_balancer_pick_first = requireLoadBalancerPickFirst();
    const load_balancer_round_robin = requireLoadBalancerRoundRobin();
    const load_balancer_outlier_detection = requireLoadBalancerOutlierDetection();
    const channelz2 = requireChannelz();
    (() => {
      resolver_dns.setup();
      resolver_uds.setup();
      resolver_ip.setup();
      load_balancer_pick_first.setup();
      load_balancer_round_robin.setup();
      load_balancer_outlier_detection.setup();
      channelz2.setup();
    })();
  })(src);
  return src;
}
var srcExports = requireSrc();
export {
  require$$11 as a,
  requireSrc$1 as r,
  srcExports as s
};
