import require$$1$3 from "child_process";
import require$$5 from "path";
import require$$1$1 from "querystring";
import require$$0$3 from "fs";
import { r as requireSrc$3, a as requireSrc$6, b as requireSrc$8 } from "./gaxios.mjs";
import { r as requireSrc$5, a as requireSrc$9 } from "./gcp-metadata.mjs";
import require$$1 from "os";
import { r as requireBase64Js } from "./base64-js.mjs";
import require$$0$2 from "crypto";
import require$$0$5 from "stream";
import { r as requireEcdsaSigFormatter } from "./ecdsa-sig-formatter.mjs";
import require$$0$4 from "events";
import { r as requireSrc$4 } from "./google-logging-utils.mjs";
import { r as requireJws } from "./jws.mjs";
import require$$0$6 from "util";
import require$$1$2 from "https";
import { r as requireSrc$7, a as requireSrc$a } from "./gtoken.mjs";
var src$2 = {};
var googleauth$2 = {};
var crypto$8 = {};
var crypto$7 = {};
var shared$3 = {};
var hasRequiredShared$3;
function requireShared$3() {
  if (hasRequiredShared$3) return shared$3;
  hasRequiredShared$3 = 1;
  Object.defineProperty(shared$3, "__esModule", { value: true });
  shared$3.fromArrayBufferToHex = fromArrayBufferToHex;
  function fromArrayBufferToHex(arrayBuffer) {
    const byteArray = Array.from(new Uint8Array(arrayBuffer));
    return byteArray.map((byte) => {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }
  return shared$3;
}
var hasRequiredCrypto$8;
function requireCrypto$8() {
  if (hasRequiredCrypto$8) return crypto$7;
  hasRequiredCrypto$8 = 1;
  Object.defineProperty(crypto$7, "__esModule", { value: true });
  crypto$7.BrowserCrypto = void 0;
  const base64js = requireBase64Js();
  const shared_1 = requireShared$3();
  class BrowserCrypto {
    constructor() {
      if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) {
        throw new Error("SubtleCrypto not found. Make sure it's an https:// website.");
      }
    }
    async sha256DigestBase64(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return base64js.fromByteArray(new Uint8Array(outputBuffer));
    }
    randomBytesBase64(count) {
      const array = new Uint8Array(count);
      window.crypto.getRandomValues(array);
      return base64js.fromByteArray(array);
    }
    static padBase64(base64) {
      while (base64.length % 4 !== 0) {
        base64 += "=";
      }
      return base64;
    }
    async verify(pubkey, data, signature) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const signatureArray = base64js.toByteArray(BrowserCrypto.padBase64(signature));
      const cryptoKey = await window.crypto.subtle.importKey("jwk", pubkey, algo, true, ["verify"]);
      const result = await window.crypto.subtle.verify(algo, cryptoKey, Buffer.from(signatureArray), dataArray);
      return result;
    }
    async sign(privateKey, data) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const cryptoKey = await window.crypto.subtle.importKey("jwk", privateKey, algo, true, ["sign"]);
      const result = await window.crypto.subtle.sign(algo, cryptoKey, dataArray);
      return base64js.fromByteArray(new Uint8Array(result));
    }
    decodeBase64StringUtf8(base64) {
      const uint8array = base64js.toByteArray(BrowserCrypto.padBase64(base64));
      const result = new TextDecoder().decode(uint8array);
      return result;
    }
    encodeBase64StringUtf8(text) {
      const uint8array = new TextEncoder().encode(text);
      const result = base64js.fromByteArray(uint8array);
      return result;
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return (0, shared_1.fromArrayBufferToHex)(outputBuffer);
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const rawKey = typeof key === "string" ? key : String.fromCharCode(...new Uint16Array(key));
      const enc = new TextEncoder();
      const cryptoKey = await window.crypto.subtle.importKey("raw", enc.encode(rawKey), {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      }, false, ["sign"]);
      return window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
    }
  }
  crypto$7.BrowserCrypto = BrowserCrypto;
  return crypto$7;
}
var crypto$6 = {};
var hasRequiredCrypto$7;
function requireCrypto$7() {
  if (hasRequiredCrypto$7) return crypto$6;
  hasRequiredCrypto$7 = 1;
  Object.defineProperty(crypto$6, "__esModule", { value: true });
  crypto$6.NodeCrypto = void 0;
  const crypto2 = require$$0$2;
  class NodeCrypto {
    async sha256DigestBase64(str) {
      return crypto2.createHash("sha256").update(str).digest("base64");
    }
    randomBytesBase64(count) {
      return crypto2.randomBytes(count).toString("base64");
    }
    async verify(pubkey, data, signature) {
      const verifier = crypto2.createVerify("RSA-SHA256");
      verifier.update(data);
      verifier.end();
      return verifier.verify(pubkey, signature, "base64");
    }
    async sign(privateKey, data) {
      const signer = crypto2.createSign("RSA-SHA256");
      signer.update(data);
      signer.end();
      return signer.sign(privateKey, "base64");
    }
    decodeBase64StringUtf8(base64) {
      return Buffer.from(base64, "base64").toString("utf-8");
    }
    encodeBase64StringUtf8(text) {
      return Buffer.from(text, "utf-8").toString("base64");
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      return crypto2.createHash("sha256").update(str).digest("hex");
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const cryptoKey = typeof key === "string" ? key : toBuffer(key);
      return toArrayBuffer(crypto2.createHmac("sha256", cryptoKey).update(msg).digest());
    }
  }
  crypto$6.NodeCrypto = NodeCrypto;
  function toArrayBuffer(buffer) {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }
  function toBuffer(arrayBuffer) {
    return Buffer.from(arrayBuffer);
  }
  return crypto$6;
}
var hasRequiredCrypto$6;
function requireCrypto$6() {
  if (hasRequiredCrypto$6) return crypto$8;
  hasRequiredCrypto$6 = 1;
  (function(exports) {
    var __createBinding = crypto$8 && crypto$8.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = crypto$8 && crypto$8.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCrypto = createCrypto;
    exports.hasBrowserCrypto = hasBrowserCrypto;
    const crypto_1 = requireCrypto$8();
    const crypto_2 = requireCrypto$7();
    __exportStar(requireShared$3(), exports);
    function createCrypto() {
      if (hasBrowserCrypto()) {
        return new crypto_1.BrowserCrypto();
      }
      return new crypto_2.NodeCrypto();
    }
    function hasBrowserCrypto() {
      return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";
    }
  })(crypto$8);
  return crypto$8;
}
var computeclient$2 = {};
var oauth2client$2 = {};
var util$2 = {};
var hasRequiredUtil$2;
function requireUtil$2() {
  if (hasRequiredUtil$2) return util$2;
  hasRequiredUtil$2 = 1;
  Object.defineProperty(util$2, "__esModule", { value: true });
  util$2.LRUCache = void 0;
  util$2.snakeToCamel = snakeToCamel;
  util$2.originalOrCamelOptions = originalOrCamelOptions;
  util$2.removeUndefinedValuesInObject = removeUndefinedValuesInObject;
  util$2.isValidFile = isValidFile;
  util$2.getWellKnownCertificateConfigFileLocation = getWellKnownCertificateConfigFileLocation;
  const fs = require$$0$3;
  const os = require$$1;
  const path = require$$5;
  const WELL_KNOWN_CERTIFICATE_CONFIG_FILE = "certificate_config.json";
  const CLOUDSDK_CONFIG_DIRECTORY = "gcloud";
  function snakeToCamel(str) {
    return str.replace(/([_][^_])/g, (match) => match.slice(1).toUpperCase());
  }
  function originalOrCamelOptions(obj) {
    function get(key) {
      const o = obj || {};
      return o[key] ?? o[snakeToCamel(key)];
    }
    return { get };
  }
  class LRUCache {
    capacity;
    /**
     * Maps are in order. Thus, the older item is the first item.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
     */
    #cache = /* @__PURE__ */ new Map();
    maxAge;
    constructor(options2) {
      this.capacity = options2.capacity;
      this.maxAge = options2.maxAge;
    }
    /**
     * Moves the key to the end of the cache.
     *
     * @param key the key to move
     * @param value the value of the key
     */
    #moveToEnd(key, value) {
      this.#cache.delete(key);
      this.#cache.set(key, {
        value,
        lastAccessed: Date.now()
      });
    }
    /**
     * Add an item to the cache.
     *
     * @param key the key to upsert
     * @param value the value of the key
     */
    set(key, value) {
      this.#moveToEnd(key, value);
      this.#evict();
    }
    /**
     * Get an item from the cache.
     *
     * @param key the key to retrieve
     */
    get(key) {
      const item = this.#cache.get(key);
      if (!item)
        return;
      this.#moveToEnd(key, item.value);
      this.#evict();
      return item.value;
    }
    /**
     * Maintain the cache based on capacity and TTL.
     */
    #evict() {
      const cutoffDate = this.maxAge ? Date.now() - this.maxAge : 0;
      let oldestItem = this.#cache.entries().next();
      while (!oldestItem.done && (this.#cache.size > this.capacity || // too many
      oldestItem.value[1].lastAccessed < cutoffDate)) {
        this.#cache.delete(oldestItem.value[0]);
        oldestItem = this.#cache.entries().next();
      }
    }
  }
  util$2.LRUCache = LRUCache;
  function removeUndefinedValuesInObject(object) {
    Object.entries(object).forEach(([key, value]) => {
      if (value === void 0 || value === "undefined") {
        delete object[key];
      }
    });
    return object;
  }
  async function isValidFile(filePath) {
    try {
      const stats = await fs.promises.lstat(filePath);
      return stats.isFile();
    } catch (e) {
      return false;
    }
  }
  function getWellKnownCertificateConfigFileLocation() {
    const configDir = process.env.CLOUDSDK_CONFIG || (_isWindows() ? path.join(process.env.APPDATA || "", CLOUDSDK_CONFIG_DIRECTORY) : path.join(process.env.HOME || "", ".config", CLOUDSDK_CONFIG_DIRECTORY));
    return path.join(configDir, WELL_KNOWN_CERTIFICATE_CONFIG_FILE);
  }
  function _isWindows() {
    return os.platform().startsWith("win");
  }
  return util$2;
}
var authclient$2 = {};
var shared$2 = {};
const name$1 = "google-auth-library";
const version$2 = "10.7.0";
const author$1 = "Google Inc.";
const description$1 = "Google APIs Authentication Client Library for Node.js";
const engines$1 = { "node": ">=18" };
const main$1 = "./build/src/index.js";
const types$1 = "./build/src/index.d.ts";
const repository$1 = { "type": "git", "directory": "packages/google-auth-library-nodejs", "url": "https://github.com/googleapis/google-cloud-node-core.git" };
const keywords$1 = ["google", "api", "google apis", "client", "client library"];
const dependencies$1 = { "base64-js": "^1.3.0", "ecdsa-sig-formatter": "^1.0.11", "gaxios": "^7.1.4", "gcp-metadata": "8.1.2", "google-logging-utils": "1.1.3", "jws": "^4.0.0" };
const devDependencies$1 = { "@types/base64-js": "^1.2.5", "@types/jws": "^3.1.0", "@types/mocha": "^10.0.10", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.8", "@types/node": "^24.0.0", "@types/sinon": "^21.0.0", "assert-rejects": "^1.0.0", "c8": "^10.1.3", "codecov": "^3.8.3", "gts": "^6.0.2", "is-docker": "^3.0.0", "jsdoc": "^4.0.4", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "^5.0.1", "keypair": "^1.0.4", "mocha": "^11.1.0", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "^14.0.5", "null-loader": "^4.0.1", "puppeteer": "^24.0.0", "sinon": "21.0.3", "ts-loader": "^9.5.2", "typescript": "5.8.3", "webpack": "^5.97.1", "webpack-cli": "^6.0.1" };
const files$1 = ["build/src", "!build/src/**/*.map"];
const scripts$1 = { "test": "c8 mocha build/test", "clean": "gts clean", "prepare": "npm run compile", "lint": "gts check --no-inline-config", "compile": "tsc -p .", "fix": "gts fix", "pretest": "npm run compile -- --sourceMap", "docs": "jsdoc -c .jsdoc.js", "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "system-test": "mocha build/system-test --timeout 60000", "presystem-test": "npm run compile -- --sourceMap", "webpack": "webpack", "browser-test": "karma start", "prelint": "cd samples; npm link ../; npm install" };
const license$1 = "Apache-2.0";
const homepage = "https://github.com/googleapis/google-cloud-node-core/tree/main/packages/google-auth-library-nodejs";
const require$$0$1 = {
  name: name$1,
  version: version$2,
  author: author$1,
  description: description$1,
  engines: engines$1,
  main: main$1,
  types: types$1,
  repository: repository$1,
  keywords: keywords$1,
  dependencies: dependencies$1,
  devDependencies: devDependencies$1,
  files: files$1,
  scripts: scripts$1,
  license: license$1,
  homepage
};
var hasRequiredShared$2;
function requireShared$2() {
  if (hasRequiredShared$2) return shared$2;
  hasRequiredShared$2 = 1;
  Object.defineProperty(shared$2, "__esModule", { value: true });
  shared$2.USER_AGENT = shared$2.PRODUCT_NAME = shared$2.pkg = void 0;
  const pkg = require$$0$1;
  shared$2.pkg = pkg;
  const PRODUCT_NAME = "google-api-nodejs-client";
  shared$2.PRODUCT_NAME = PRODUCT_NAME;
  const USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;
  shared$2.USER_AGENT = USER_AGENT;
  return shared$2;
}
var hasRequiredAuthclient$2;
function requireAuthclient$2() {
  if (hasRequiredAuthclient$2) return authclient$2;
  hasRequiredAuthclient$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthClient = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = exports.DEFAULT_UNIVERSE = void 0;
    const events_1 = require$$0$4;
    const gaxios_1 = requireSrc$3();
    const util_1 = requireUtil$2();
    const google_logging_utils_1 = requireSrc$4();
    const shared_cjs_1 = requireShared$2();
    exports.DEFAULT_UNIVERSE = "googleapis.com";
    exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1e3;
    class AuthClient extends events_1.EventEmitter {
      apiKey;
      projectId;
      /**
       * The quota project ID. The quota project can be used by client libraries for the billing purpose.
       * See {@link https://cloud.google.com/docs/quota Working with quotas}
       */
      quotaProjectId;
      /**
       * The {@link Gaxios `Gaxios`} instance used for making requests.
       */
      transporter;
      credentials = {};
      eagerRefreshThresholdMillis = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS;
      forceRefreshOnFailure = false;
      universeDomain = exports.DEFAULT_UNIVERSE;
      /**
       * Symbols that can be added to GaxiosOptions to specify the method name that is
       * making an RPC call, for logging purposes, as well as a string ID that can be
       * used to correlate calls and responses.
       */
      static RequestMethodNameSymbol = /* @__PURE__ */ Symbol("request method name");
      static RequestLogIdSymbol = /* @__PURE__ */ Symbol("request log id");
      constructor(opts = {}) {
        super();
        const options2 = (0, util_1.originalOrCamelOptions)(opts);
        this.apiKey = opts.apiKey;
        this.projectId = options2.get("project_id") ?? null;
        this.quotaProjectId = options2.get("quota_project_id");
        this.credentials = options2.get("credentials") ?? {};
        this.universeDomain = options2.get("universe_domain") ?? exports.DEFAULT_UNIVERSE;
        this.transporter = opts.transporter ?? new gaxios_1.Gaxios(opts.transporterOptions);
        if (options2.get("useAuthRequestParameters") !== false) {
          this.transporter.interceptors.request.add(AuthClient.DEFAULT_REQUEST_INTERCEPTOR);
          this.transporter.interceptors.response.add(AuthClient.DEFAULT_RESPONSE_INTERCEPTOR);
        }
        if (opts.eagerRefreshThresholdMillis) {
          this.eagerRefreshThresholdMillis = opts.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = opts.forceRefreshOnFailure ?? false;
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link AuthClient}.
       *
       * @see {@link AuthClient.request} for the classic method.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const authClient = new AuthClient();
       * const fetchWithAuthClient: typeof fetch = (...args) => authClient.fetch(...args);
       * await fetchWithAuthClient('https://example.com');
       * ```
       *
       * @param args `fetch` API or {@link Gaxios.fetch `Gaxios#fetch`} parameters
       * @returns the {@link GaxiosResponse} with Gaxios-added properties
       */
      fetch(...args) {
        const input = args[0];
        const init = args[1];
        let url = void 0;
        const headers = new Headers();
        if (typeof input === "string") {
          url = new URL(input);
        } else if (input instanceof URL) {
          url = input;
        } else if (input && input.url) {
          url = new URL(input.url);
        }
        if (input && typeof input === "object" && "headers" in input) {
          gaxios_1.Gaxios.mergeHeaders(headers, input.headers);
        }
        if (init) {
          gaxios_1.Gaxios.mergeHeaders(headers, new Headers(init.headers));
        }
        if (typeof input === "object" && !(input instanceof URL)) {
          return this.request({ ...init, ...input, headers, url });
        } else {
          return this.request({ ...init, headers, url });
        }
      }
      /**
       * Sets the auth credentials.
       */
      setCredentials(credentials) {
        this.credentials = credentials;
      }
      /**
       * Append additional headers, e.g., x-goog-user-project, shared across the
       * classes inheriting AuthClient. This method should be used by any method
       * that overrides getRequestMetadataAsync(), which is a shared helper for
       * setting request information in both gRPC and HTTP API calls.
       *
       * @param headers object to append additional headers to.
       */
      addSharedMetadataHeaders(headers) {
        if (!headers.has("x-goog-user-project") && // don't override a value the user sets.
        this.quotaProjectId) {
          headers.set("x-goog-user-project", this.quotaProjectId);
        }
        return headers;
      }
      /**
       * Adds the `x-goog-user-project` and `authorization` headers to the target Headers
       * object, if they exist on the source.
       *
       * @param target the headers to target
       * @param source the headers to source from
       * @returns the target headers
       */
      addUserProjectAndAuthHeaders(target, source) {
        const xGoogUserProject = source.get("x-goog-user-project");
        const authorizationHeader = source.get("authorization");
        if (xGoogUserProject) {
          target.set("x-goog-user-project", xGoogUserProject);
        }
        if (authorizationHeader) {
          target.set("authorization", authorizationHeader);
        }
        return target;
      }
      static log = (0, google_logging_utils_1.log)("auth");
      static DEFAULT_REQUEST_INTERCEPTOR = {
        resolved: async (config) => {
          if (!config.headers.has("x-goog-api-client")) {
            const nodeVersion = process.version.replace(/^v/, "");
            config.headers.set("x-goog-api-client", `gl-node/${nodeVersion}`);
          }
          const userAgent = config.headers.get("User-Agent");
          if (!userAgent) {
            config.headers.set("User-Agent", shared_cjs_1.USER_AGENT);
          } else if (!userAgent.includes(`${shared_cjs_1.PRODUCT_NAME}/`)) {
            config.headers.set("User-Agent", `${userAgent} ${shared_cjs_1.USER_AGENT}`);
          }
          try {
            const symbols = config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = `${Math.floor(Math.random() * 1e3)}`;
            symbols[AuthClient.RequestLogIdSymbol] = logId;
            const logObject = {
              url: config.url,
              headers: config.headers
            };
            if (methodName) {
              AuthClient.log.info("%s [%s] request %j", methodName, logId, logObject);
            } else {
              AuthClient.log.info("[%s] request %j", logId, logObject);
            }
          } catch (e) {
          }
          return config;
        }
      };
      static DEFAULT_RESPONSE_INTERCEPTOR = {
        resolved: async (response) => {
          try {
            const symbols = response.config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = symbols[AuthClient.RequestLogIdSymbol];
            if (methodName) {
              AuthClient.log.info("%s [%s] response %j", methodName, logId, response.data);
            } else {
              AuthClient.log.info("[%s] response %j", logId, response.data);
            }
          } catch (e) {
          }
          return response;
        },
        rejected: async (error) => {
          try {
            const symbols = error.config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = symbols[AuthClient.RequestLogIdSymbol];
            if (methodName) {
              AuthClient.log.info("%s [%s] error %j", methodName, logId, error.response?.data);
            } else {
              AuthClient.log.error("[%s] error %j", logId, error.response?.data);
            }
          } catch (e) {
          }
          throw error;
        }
      };
      /**
       * Sets the method name that is making a Gaxios request, so that logging may tag
       * log lines with the operation.
       * @param config A Gaxios request config
       * @param methodName The method name making the call
       */
      static setMethodName(config, methodName) {
        try {
          const symbols = config;
          symbols[AuthClient.RequestMethodNameSymbol] = methodName;
        } catch (e) {
        }
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    }
    exports.AuthClient = AuthClient;
  })(authclient$2);
  return authclient$2;
}
var loginticket$2 = {};
var hasRequiredLoginticket$2;
function requireLoginticket$2() {
  if (hasRequiredLoginticket$2) return loginticket$2;
  hasRequiredLoginticket$2 = 1;
  Object.defineProperty(loginticket$2, "__esModule", { value: true });
  loginticket$2.LoginTicket = void 0;
  class LoginTicket {
    envelope;
    payload;
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @param {string} env Envelope of the jwt
     * @param {TokenPayload} pay Payload of the jwt
     * @constructor
     */
    constructor(env, pay) {
      this.envelope = env;
      this.payload = pay;
    }
    getEnvelope() {
      return this.envelope;
    }
    getPayload() {
      return this.payload;
    }
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @return The user ID
     */
    getUserId() {
      const payload = this.getPayload();
      if (payload && payload.sub) {
        return payload.sub;
      }
      return null;
    }
    /**
     * Returns attributes from the login ticket.  This can contain
     * various information about the user session.
     *
     * @return The envelope and payload
     */
    getAttributes() {
      return { envelope: this.getEnvelope(), payload: this.getPayload() };
    }
  }
  loginticket$2.LoginTicket = LoginTicket;
  return loginticket$2;
}
var hasRequiredOauth2client$2;
function requireOauth2client$2() {
  if (hasRequiredOauth2client$2) return oauth2client$2;
  hasRequiredOauth2client$2 = 1;
  Object.defineProperty(oauth2client$2, "__esModule", { value: true });
  oauth2client$2.OAuth2Client = oauth2client$2.ClientAuthentication = oauth2client$2.CertificateFormat = oauth2client$2.CodeChallengeMethod = void 0;
  const gaxios_1 = requireSrc$3();
  const querystring = require$$1$1;
  const stream = require$$0$5;
  const formatEcdsa = requireEcdsaSigFormatter();
  const util_1 = requireUtil$2();
  const crypto_1 = requireCrypto$6();
  const authclient_1 = requireAuthclient$2();
  const loginticket_1 = requireLoginticket$2();
  var CodeChallengeMethod;
  (function(CodeChallengeMethod2) {
    CodeChallengeMethod2["Plain"] = "plain";
    CodeChallengeMethod2["S256"] = "S256";
  })(CodeChallengeMethod || (oauth2client$2.CodeChallengeMethod = CodeChallengeMethod = {}));
  var CertificateFormat;
  (function(CertificateFormat2) {
    CertificateFormat2["PEM"] = "PEM";
    CertificateFormat2["JWK"] = "JWK";
  })(CertificateFormat || (oauth2client$2.CertificateFormat = CertificateFormat = {}));
  var ClientAuthentication;
  (function(ClientAuthentication2) {
    ClientAuthentication2["ClientSecretPost"] = "ClientSecretPost";
    ClientAuthentication2["ClientSecretBasic"] = "ClientSecretBasic";
    ClientAuthentication2["None"] = "None";
  })(ClientAuthentication || (oauth2client$2.ClientAuthentication = ClientAuthentication = {}));
  class OAuth2Client extends authclient_1.AuthClient {
    redirectUri;
    certificateCache = {};
    certificateExpiry = null;
    certificateCacheFormat = CertificateFormat.PEM;
    refreshTokenPromises = /* @__PURE__ */ new Map();
    endpoints;
    issuers;
    clientAuthentication;
    // TODO: refactor tests to make this private
    _clientId;
    // TODO: refactor tests to make this private
    _clientSecret;
    refreshHandler;
    /**
     * An OAuth2 Client for Google APIs.
     *
     * @param options The OAuth2 Client Options. Passing an `clientId` directly is **@DEPRECATED**.
     * @param clientSecret **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
     * @param redirectUri **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
     */
    constructor(options2 = {}, clientSecret, redirectUri) {
      super(typeof options2 === "object" ? options2 : {});
      if (typeof options2 !== "object") {
        options2 = {
          clientId: options2,
          clientSecret,
          redirectUri
        };
      }
      this._clientId = options2.clientId || options2.client_id;
      this._clientSecret = options2.clientSecret || options2.client_secret;
      this.redirectUri = options2.redirectUri || options2.redirect_uris?.[0];
      this.endpoints = {
        tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
        oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        oauth2TokenUrl: "https://oauth2.googleapis.com/token",
        oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
        oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
        oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
        oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
        ...options2.endpoints
      };
      this.clientAuthentication = options2.clientAuthentication || ClientAuthentication.ClientSecretPost;
      this.issuers = options2.issuers || [
        "accounts.google.com",
        "https://accounts.google.com",
        this.universeDomain
      ];
    }
    /**
     * @deprecated use instance's {@link OAuth2Client.endpoints}
     */
    static GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
    /**
     * Clock skew - five minutes in seconds
     */
    static CLOCK_SKEW_SECS_ = 300;
    /**
     * The default max Token Lifetime is one day in seconds
     */
    static DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400;
    /**
     * Generates URL for consent page landing.
     * @param opts Options.
     * @return URL to consent page.
     */
    generateAuthUrl(opts = {}) {
      if (opts.code_challenge_method && !opts.code_challenge) {
        throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
      }
      opts.response_type = opts.response_type || "code";
      opts.client_id = opts.client_id || this._clientId;
      opts.redirect_uri = opts.redirect_uri || this.redirectUri;
      if (Array.isArray(opts.scope)) {
        opts.scope = opts.scope.join(" ");
      }
      const rootUrl = this.endpoints.oauth2AuthBaseUrl.toString();
      return rootUrl + "?" + querystring.stringify(opts);
    }
    generateCodeVerifier() {
      throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.");
    }
    /**
     * Convenience method to automatically generate a code_verifier, and its
     * resulting SHA256. If used, this must be paired with a S256
     * code_challenge_method.
     *
     * For a full example see:
     * https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/oauth2-codeVerifier.js
     */
    async generateCodeVerifierAsync() {
      const crypto2 = (0, crypto_1.createCrypto)();
      const randomString = crypto2.randomBytesBase64(96);
      const codeVerifier = randomString.replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-");
      const unencodedCodeChallenge = await crypto2.sha256DigestBase64(codeVerifier);
      const codeChallenge = unencodedCodeChallenge.split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
      return { codeVerifier, codeChallenge };
    }
    getToken(codeOrOptions, callback) {
      const options2 = typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
      if (callback) {
        this.getTokenAsync(options2).then((r) => callback(null, r.tokens, r.res), (e) => callback(e, null, e.response));
      } else {
        return this.getTokenAsync(options2);
      }
    }
    async getTokenAsync(options2) {
      const url = this.endpoints.oauth2TokenUrl.toString();
      const headers = new Headers();
      const values = {
        client_id: options2.client_id || this._clientId,
        code_verifier: options2.codeVerifier,
        code: options2.code,
        grant_type: "authorization_code",
        redirect_uri: options2.redirect_uri || this.redirectUri
      };
      if (this.clientAuthentication === ClientAuthentication.ClientSecretBasic) {
        const basic = Buffer.from(`${this._clientId}:${this._clientSecret}`);
        headers.set("authorization", `Basic ${basic.toString("base64")}`);
      }
      if (this.clientAuthentication === ClientAuthentication.ClientSecretPost) {
        values.client_secret = this._clientSecret;
      }
      const opts = {
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        url,
        data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(values)),
        headers
      };
      authclient_1.AuthClient.setMethodName(opts, "getTokenAsync");
      const res = await this.transporter.request(opts);
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    /**
     * Refreshes the access token.
     * @param refresh_token Existing refresh token.
     * @private
     */
    async refreshToken(refreshToken) {
      if (!refreshToken) {
        return this.refreshTokenNoCache(refreshToken);
      }
      if (this.refreshTokenPromises.has(refreshToken)) {
        return this.refreshTokenPromises.get(refreshToken);
      }
      const p = this.refreshTokenNoCache(refreshToken).then((r) => {
        this.refreshTokenPromises.delete(refreshToken);
        return r;
      }, (e) => {
        this.refreshTokenPromises.delete(refreshToken);
        throw e;
      });
      this.refreshTokenPromises.set(refreshToken, p);
      return p;
    }
    async refreshTokenNoCache(refreshToken) {
      if (!refreshToken) {
        throw new Error("No refresh token is set.");
      }
      const url = this.endpoints.oauth2TokenUrl.toString();
      const data = {
        refresh_token: refreshToken,
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: "refresh_token"
      };
      let res;
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          method: "POST",
          url,
          data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(data))
        };
        authclient_1.AuthClient.setMethodName(opts, "refreshTokenNoCache");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError && e.message === "invalid_grant" && e.response?.data && /ReAuth/i.test(e.response.data.error_description)) {
          e.message = JSON.stringify(e.response.data);
        }
        throw e;
      }
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    refreshAccessToken(callback) {
      if (callback) {
        this.refreshAccessTokenAsync().then((r) => callback(null, r.credentials, r.res), callback);
      } else {
        return this.refreshAccessTokenAsync();
      }
    }
    async refreshAccessTokenAsync() {
      const r = await this.refreshToken(this.credentials.refresh_token);
      const tokens = r.tokens;
      tokens.refresh_token = this.credentials.refresh_token;
      this.credentials = tokens;
      return { credentials: this.credentials, res: r.res };
    }
    getAccessToken(callback) {
      if (callback) {
        this.getAccessTokenAsync().then((r) => callback(null, r.token, r.res), callback);
      } else {
        return this.getAccessTokenAsync();
      }
    }
    async getAccessTokenAsync() {
      const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
      if (shouldRefresh) {
        if (!this.credentials.refresh_token) {
          if (this.refreshHandler) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken?.access_token) {
              this.setCredentials(refreshedAccessToken);
              return { token: this.credentials.access_token };
            }
          } else {
            throw new Error("No refresh token or refresh handler callback is set.");
          }
        }
        const r = await this.refreshAccessTokenAsync();
        if (!r.credentials || r.credentials && !r.credentials.access_token) {
          throw new Error("Could not refresh access token.");
        }
        return { token: r.credentials.access_token, res: r.res };
      } else {
        return { token: this.credentials.access_token };
      }
    }
    /**
     * The main authentication interface.  It takes an optional url which when
     * present is the endpoint being accessed, and returns a Promise which
     * resolves with authorization header fields.
     *
     * In OAuth2Client, the result has the form:
     * { authorization: 'Bearer <access_token_value>' }
     */
    async getRequestHeaders(url) {
      const headers = (await this.getRequestMetadataAsync(url)).headers;
      return headers;
    }
    async getRequestMetadataAsync(url) {
      const thisCreds = this.credentials;
      if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey && !this.refreshHandler) {
        throw new Error("No access, refresh token, API key or refresh handler callback is set.");
      }
      if (thisCreds.access_token && !this.isTokenExpiring()) {
        thisCreds.token_type = thisCreds.token_type || "Bearer";
        const headers2 = new Headers({
          authorization: thisCreds.token_type + " " + thisCreds.access_token
        });
        return { headers: this.addSharedMetadataHeaders(headers2) };
      }
      if (this.refreshHandler) {
        const refreshedAccessToken = await this.processAndValidateRefreshHandler();
        if (refreshedAccessToken?.access_token) {
          this.setCredentials(refreshedAccessToken);
          const headers2 = new Headers({
            authorization: "Bearer " + this.credentials.access_token
          });
          return { headers: this.addSharedMetadataHeaders(headers2) };
        }
      }
      if (this.apiKey) {
        return { headers: new Headers({ "X-Goog-Api-Key": this.apiKey }) };
      }
      let r = null;
      let tokens = null;
      try {
        r = await this.refreshToken(thisCreds.refresh_token);
        tokens = r.tokens;
      } catch (err) {
        const e = err;
        if (e.response && (e.response.status === 403 || e.response.status === 404)) {
          e.message = `Could not refresh access token: ${e.message}`;
        }
        throw e;
      }
      const credentials = this.credentials;
      credentials.token_type = credentials.token_type || "Bearer";
      tokens.refresh_token = credentials.refresh_token;
      this.credentials = tokens;
      const headers = new Headers({
        authorization: credentials.token_type + " " + tokens.access_token
      });
      return { headers: this.addSharedMetadataHeaders(headers), res: r.res };
    }
    /**
     * Generates an URL to revoke the given token.
     * @param token The existing token to be revoked.
     *
     * @deprecated use instance method {@link OAuth2Client.getRevokeTokenURL}
     */
    static getRevokeTokenUrl(token) {
      return new OAuth2Client().getRevokeTokenURL(token).toString();
    }
    /**
     * Generates a URL to revoke the given token.
     *
     * @param token The existing token to be revoked.
     */
    getRevokeTokenURL(token) {
      const url = new URL(this.endpoints.oauth2RevokeUrl);
      url.searchParams.append("token", token);
      return url;
    }
    revokeToken(token, callback) {
      const opts = {
        ...OAuth2Client.RETRY_CONFIG,
        url: this.getRevokeTokenURL(token).toString(),
        method: "POST"
      };
      authclient_1.AuthClient.setMethodName(opts, "revokeToken");
      if (callback) {
        this.transporter.request(opts).then((r) => callback(null, r), callback);
      } else {
        return this.transporter.request(opts);
      }
    }
    revokeCredentials(callback) {
      if (callback) {
        this.revokeCredentialsAsync().then((res) => callback(null, res), callback);
      } else {
        return this.revokeCredentialsAsync();
      }
    }
    async revokeCredentialsAsync() {
      const token = this.credentials.access_token;
      this.credentials = {};
      if (token) {
        return this.revokeToken(token);
      } else {
        throw new Error("No access token to revoke.");
      }
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    async requestAsync(opts, reAuthRetried = false) {
      try {
        const r = await this.getRequestMetadataAsync();
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        this.addUserProjectAndAuthHeaders(opts.headers, r.headers);
        if (this.apiKey) {
          opts.headers.set("X-Goog-Api-Key", this.apiKey);
        }
        return await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const mayRequireRefresh = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure);
          const mayRequireRefreshWithNoRefreshToken = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefresh) {
            await this.refreshAccessTokenAsync();
            return this.requestAsync(opts, true);
          } else if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefreshWithNoRefreshToken) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken?.access_token) {
              this.setCredentials(refreshedAccessToken);
            }
            return this.requestAsync(opts, true);
          }
        }
        throw e;
      }
    }
    verifyIdToken(options2, callback) {
      if (callback && typeof callback !== "function") {
        throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
      }
      if (callback) {
        this.verifyIdTokenAsync(options2).then((r) => callback(null, r), callback);
      } else {
        return this.verifyIdTokenAsync(options2);
      }
    }
    async verifyIdTokenAsync(options2) {
      if (!options2.idToken) {
        throw new Error("The verifyIdToken method requires an ID Token");
      }
      const response = await this.getFederatedSignonCertsAsync();
      const login = await this.verifySignedJwtWithCertsAsync(options2.idToken, response.certs, options2.audience, this.issuers, options2.maxExpiry);
      return login;
    }
    /**
     * Obtains information about the provisioned access token.  Especially useful
     * if you want to check the scopes that were provisioned to a given token.
     *
     * @param accessToken Required.  The Access Token for which you want to get
     * user info.
     */
    async getTokenInfo(accessToken) {
      const { data } = await this.transporter.request({
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          authorization: `Bearer ${accessToken}`
        },
        url: this.endpoints.tokenInfoUrl.toString()
      });
      const info = Object.assign({
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3,
        scopes: data.scope.split(" ")
      }, data);
      delete info.expires_in;
      delete info.scope;
      return info;
    }
    getFederatedSignonCerts(callback) {
      if (callback) {
        this.getFederatedSignonCertsAsync().then((r) => callback(null, r.certs, r.res), callback);
      } else {
        return this.getFederatedSignonCertsAsync();
      }
    }
    async getFederatedSignonCertsAsync() {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const format = (0, crypto_1.hasBrowserCrypto)() ? CertificateFormat.JWK : CertificateFormat.PEM;
      if (this.certificateExpiry && nowTime < this.certificateExpiry.getTime() && this.certificateCacheFormat === format) {
        return { certs: this.certificateCache, format };
      }
      let res;
      let url;
      switch (format) {
        case CertificateFormat.PEM:
          url = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
          break;
        case CertificateFormat.JWK:
          url = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          url
        };
        authclient_1.AuthClient.setMethodName(opts, "getFederatedSignonCertsAsync");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      const cacheControl = res?.headers.get("cache-control");
      let cacheAge = -1;
      if (cacheControl) {
        const maxAge = /max-age=(?<maxAge>[0-9]+)/.exec(cacheControl)?.groups?.maxAge;
        if (maxAge) {
          cacheAge = Number(maxAge) * 1e3;
        }
      }
      let certificates = {};
      switch (format) {
        case CertificateFormat.PEM:
          certificates = res.data;
          break;
        case CertificateFormat.JWK:
          for (const key of res.data.keys) {
            certificates[key.kid] = key;
          }
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      const now = /* @__PURE__ */ new Date();
      this.certificateExpiry = cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
      this.certificateCache = certificates;
      this.certificateCacheFormat = format;
      return { certs: certificates, format, res };
    }
    getIapPublicKeys(callback) {
      if (callback) {
        this.getIapPublicKeysAsync().then((r) => callback(null, r.pubkeys, r.res), callback);
      } else {
        return this.getIapPublicKeysAsync();
      }
    }
    async getIapPublicKeysAsync() {
      let res;
      const url = this.endpoints.oauth2IapPublicKeyUrl.toString();
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          url
        };
        authclient_1.AuthClient.setMethodName(opts, "getIapPublicKeysAsync");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      return { pubkeys: res.data, res };
    }
    verifySignedJwtWithCerts() {
      throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.");
    }
    /**
     * Verify the id token is signed with the correct certificate
     * and is from the correct audience.
     * @param jwt The jwt to verify (The ID Token in this case).
     * @param certs The array of certs to test the jwt against.
     * @param requiredAudience The audience to test the jwt against.
     * @param issuers The allowed issuers of the jwt (Optional).
     * @param maxExpiry The max expiry the certificate can be (Optional).
     * @return Returns a promise resolving to LoginTicket on verification.
     */
    async verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience, issuers, maxExpiry) {
      const crypto2 = (0, crypto_1.createCrypto)();
      if (!maxExpiry) {
        maxExpiry = OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
      }
      const segments = jwt.split(".");
      if (segments.length !== 3) {
        throw new Error("Wrong number of segments in token: " + jwt);
      }
      const signed = segments[0] + "." + segments[1];
      let signature = segments[2];
      let envelope;
      let payload;
      try {
        envelope = JSON.parse(crypto2.decodeBase64StringUtf8(segments[0]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token envelope: ${segments[0]}': ${err.message}`;
        }
        throw err;
      }
      if (!envelope) {
        throw new Error("Can't parse token envelope: " + segments[0]);
      }
      try {
        payload = JSON.parse(crypto2.decodeBase64StringUtf8(segments[1]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token payload '${segments[0]}`;
        }
        throw err;
      }
      if (!payload) {
        throw new Error("Can't parse token payload: " + segments[1]);
      }
      if (!Object.prototype.hasOwnProperty.call(certs, envelope.kid)) {
        throw new Error("No pem found for envelope: " + JSON.stringify(envelope));
      }
      const cert = certs[envelope.kid];
      if (envelope.alg === "ES256") {
        signature = formatEcdsa.joseToDer(signature, "ES256").toString("base64");
      }
      const verified = await crypto2.verify(cert, signed, signature);
      if (!verified) {
        throw new Error("Invalid token signature: " + jwt);
      }
      if (!payload.iat) {
        throw new Error("No issue time in token: " + JSON.stringify(payload));
      }
      if (!payload.exp) {
        throw new Error("No expiration time in token: " + JSON.stringify(payload));
      }
      const iat = Number(payload.iat);
      if (isNaN(iat))
        throw new Error("iat field using invalid format");
      const exp = Number(payload.exp);
      if (isNaN(exp))
        throw new Error("exp field using invalid format");
      const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
      if (exp >= now + maxExpiry) {
        throw new Error("Expiration time too far in future: " + JSON.stringify(payload));
      }
      const earliest = iat - OAuth2Client.CLOCK_SKEW_SECS_;
      const latest = exp + OAuth2Client.CLOCK_SKEW_SECS_;
      if (now < earliest) {
        throw new Error("Token used too early, " + now + " < " + earliest + ": " + JSON.stringify(payload));
      }
      if (now > latest) {
        throw new Error("Token used too late, " + now + " > " + latest + ": " + JSON.stringify(payload));
      }
      if (issuers && issuers.indexOf(payload.iss) < 0) {
        throw new Error("Invalid issuer, expected one of [" + issuers + "], but got " + payload.iss);
      }
      if (typeof requiredAudience !== "undefined" && requiredAudience !== null) {
        const aud = payload.aud;
        let audVerified = false;
        if (requiredAudience.constructor === Array) {
          audVerified = requiredAudience.indexOf(aud) > -1;
        } else {
          audVerified = aud === requiredAudience;
        }
        if (!audVerified) {
          throw new Error("Wrong recipient, payload audience != requiredAudience");
        }
      }
      return new loginticket_1.LoginTicket(envelope, payload);
    }
    /**
     * Returns a promise that resolves with AccessTokenResponse type if
     * refreshHandler is defined.
     * If not, nothing is returned.
     */
    async processAndValidateRefreshHandler() {
      if (this.refreshHandler) {
        const accessTokenResponse = await this.refreshHandler();
        if (!accessTokenResponse.access_token) {
          throw new Error("No access token is returned by the refreshHandler callback.");
        }
        return accessTokenResponse;
      }
      return;
    }
    /**
     * Returns true if a token is expired or will expire within
     * eagerRefreshThresholdMillismilliseconds.
     * If there is no expiry time, assumes the token is not expired or expiring.
     */
    isTokenExpiring() {
      const expiryDate = this.credentials.expiry_date;
      return expiryDate ? expiryDate <= (/* @__PURE__ */ new Date()).getTime() + this.eagerRefreshThresholdMillis : false;
    }
  }
  oauth2client$2.OAuth2Client = OAuth2Client;
  return oauth2client$2;
}
var hasRequiredComputeclient$2;
function requireComputeclient$2() {
  if (hasRequiredComputeclient$2) return computeclient$2;
  hasRequiredComputeclient$2 = 1;
  Object.defineProperty(computeclient$2, "__esModule", { value: true });
  computeclient$2.Compute = void 0;
  const gaxios_1 = requireSrc$3();
  const gcpMetadata = requireSrc$5();
  const oauth2client_1 = requireOauth2client$2();
  class Compute extends oauth2client_1.OAuth2Client {
    serviceAccountEmail;
    scopes;
    /**
     * Google Compute Engine service account credentials.
     *
     * Retrieve access token from the metadata server.
     * See: https://cloud.google.com/compute/docs/access/authenticate-workloads#applications
     */
    constructor(options2 = {}) {
      super(options2);
      this.credentials = { expiry_date: 1, refresh_token: "compute-placeholder" };
      this.serviceAccountEmail = options2.serviceAccountEmail || "default";
      this.scopes = Array.isArray(options2.scopes) ? options2.scopes : options2.scopes ? [options2.scopes] : [];
    }
    /**
     * Refreshes the access token.
     * @param refreshToken Unused parameter
     */
    async refreshTokenNoCache() {
      const tokenPath = `service-accounts/${this.serviceAccountEmail}/token`;
      let data;
      try {
        const instanceOptions = {
          property: tokenPath
        };
        if (this.scopes.length > 0) {
          instanceOptions.params = {
            scopes: this.scopes.join(",")
          };
        }
        data = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError) {
          e.message = `Could not refresh access token: ${e.message}`;
          this.wrapError(e);
        }
        throw e;
      }
      const tokens = data;
      if (data && data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res: null };
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const idTokenPath = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${targetAudience}`;
      let idToken;
      try {
        const instanceOptions = {
          property: idTokenPath
        };
        idToken = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Could not fetch ID token: ${e.message}`;
        }
        throw e;
      }
      return idToken;
    }
    wrapError(e) {
      const res = e.response;
      if (res && res.status) {
        e.status = res.status;
        if (res.status === 403) {
          e.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + e.message;
        } else if (res.status === 404) {
          e.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + e.message;
        }
      }
    }
  }
  computeclient$2.Compute = Compute;
  return computeclient$2;
}
var idtokenclient$2 = {};
var hasRequiredIdtokenclient$2;
function requireIdtokenclient$2() {
  if (hasRequiredIdtokenclient$2) return idtokenclient$2;
  hasRequiredIdtokenclient$2 = 1;
  Object.defineProperty(idtokenclient$2, "__esModule", { value: true });
  idtokenclient$2.IdTokenClient = void 0;
  const oauth2client_1 = requireOauth2client$2();
  class IdTokenClient extends oauth2client_1.OAuth2Client {
    targetAudience;
    idTokenProvider;
    /**
     * Google ID Token client
     *
     * Retrieve ID token from the metadata server.
     * See: https://cloud.google.com/docs/authentication/get-id-token#metadata-server
     */
    constructor(options2) {
      super(options2);
      this.targetAudience = options2.targetAudience;
      this.idTokenProvider = options2.idTokenProvider;
    }
    async getRequestMetadataAsync() {
      if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
        const idToken = await this.idTokenProvider.fetchIdToken(this.targetAudience);
        this.credentials = {
          id_token: idToken,
          expiry_date: this.getIdTokenExpiryDate(idToken)
        };
      }
      const headers = new Headers({
        authorization: "Bearer " + this.credentials.id_token
      });
      return { headers };
    }
    getIdTokenExpiryDate(idToken) {
      const payloadB64 = idToken.split(".")[1];
      if (payloadB64) {
        const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString("ascii"));
        return payload.exp * 1e3;
      }
    }
  }
  idtokenclient$2.IdTokenClient = IdTokenClient;
  return idtokenclient$2;
}
var envDetect$2 = {};
var hasRequiredEnvDetect$2;
function requireEnvDetect$2() {
  if (hasRequiredEnvDetect$2) return envDetect$2;
  hasRequiredEnvDetect$2 = 1;
  Object.defineProperty(envDetect$2, "__esModule", { value: true });
  envDetect$2.GCPEnv = void 0;
  envDetect$2.clear = clear;
  envDetect$2.getEnv = getEnv;
  const gcpMetadata = requireSrc$5();
  var GCPEnv;
  (function(GCPEnv2) {
    GCPEnv2["APP_ENGINE"] = "APP_ENGINE";
    GCPEnv2["KUBERNETES_ENGINE"] = "KUBERNETES_ENGINE";
    GCPEnv2["CLOUD_FUNCTIONS"] = "CLOUD_FUNCTIONS";
    GCPEnv2["COMPUTE_ENGINE"] = "COMPUTE_ENGINE";
    GCPEnv2["CLOUD_RUN"] = "CLOUD_RUN";
    GCPEnv2["CLOUD_RUN_JOBS"] = "CLOUD_RUN_JOBS";
    GCPEnv2["NONE"] = "NONE";
  })(GCPEnv || (envDetect$2.GCPEnv = GCPEnv = {}));
  let envPromise;
  function clear() {
    envPromise = void 0;
  }
  async function getEnv() {
    if (envPromise) {
      return envPromise;
    }
    envPromise = getEnvMemoized();
    return envPromise;
  }
  async function getEnvMemoized() {
    let env = GCPEnv.NONE;
    if (isAppEngine()) {
      env = GCPEnv.APP_ENGINE;
    } else if (isCloudFunction()) {
      env = GCPEnv.CLOUD_FUNCTIONS;
    } else if (await isComputeEngine()) {
      if (await isKubernetesEngine()) {
        env = GCPEnv.KUBERNETES_ENGINE;
      } else if (isCloudRun()) {
        env = GCPEnv.CLOUD_RUN;
      } else if (isCloudRunJob()) {
        env = GCPEnv.CLOUD_RUN_JOBS;
      } else {
        env = GCPEnv.COMPUTE_ENGINE;
      }
    } else {
      env = GCPEnv.NONE;
    }
    return env;
  }
  function isAppEngine() {
    return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME);
  }
  function isCloudFunction() {
    return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET);
  }
  function isCloudRun() {
    return !!process.env.K_CONFIGURATION;
  }
  function isCloudRunJob() {
    return !!process.env.CLOUD_RUN_JOB;
  }
  async function isKubernetesEngine() {
    try {
      await gcpMetadata.instance("attributes/cluster-name");
      return true;
    } catch (e) {
      return false;
    }
  }
  async function isComputeEngine() {
    return gcpMetadata.isAvailable();
  }
  return envDetect$2;
}
var jwtclient$2 = {};
var googleToken = {};
var tokenHandler = {};
var getToken = {};
var jwsSign = {};
var hasRequiredJwsSign;
function requireJwsSign() {
  if (hasRequiredJwsSign) return jwsSign;
  hasRequiredJwsSign = 1;
  Object.defineProperty(jwsSign, "__esModule", { value: true });
  jwsSign.buildPayloadForJwsSign = buildPayloadForJwsSign;
  jwsSign.getJwsSign = getJwsSign;
  const jws_1 = requireJws();
  const ALG_RS256 = "RS256";
  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
  function buildPayloadForJwsSign(tokenOptions) {
    const iat = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    const payload = {
      iss: tokenOptions.iss,
      scope: tokenOptions.scope,
      aud: GOOGLE_TOKEN_URL,
      exp: iat + 3600,
      iat,
      sub: tokenOptions.sub,
      ...tokenOptions.additionalClaims
    };
    return payload;
  }
  function getJwsSign(tokenOptions) {
    const payload = buildPayloadForJwsSign(tokenOptions);
    return (0, jws_1.sign)({
      header: { alg: ALG_RS256 },
      payload,
      secret: tokenOptions.key
    });
  }
  return jwsSign;
}
var hasRequiredGetToken;
function requireGetToken() {
  if (hasRequiredGetToken) return getToken;
  hasRequiredGetToken = 1;
  Object.defineProperty(getToken, "__esModule", { value: true });
  getToken.getToken = getToken$1;
  const jwsSign_1 = requireJwsSign();
  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
  const GOOGLE_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:jwt-bearer";
  const generateRequestOptions = (tokenOptions) => {
    return {
      method: "POST",
      url: GOOGLE_TOKEN_URL,
      data: new URLSearchParams({
        grant_type: GOOGLE_GRANT_TYPE,
        // Grant type for JWT
        assertion: (0, jwsSign_1.getJwsSign)(tokenOptions)
      }),
      responseType: "json",
      retryConfig: {
        httpMethodsToRetry: ["POST"]
      }
    };
  };
  async function getToken$1(tokenOptions) {
    if (!tokenOptions.transporter) {
      throw new Error("No transporter set.");
    }
    try {
      const gaxiosOptions = generateRequestOptions(tokenOptions);
      const response = await tokenOptions.transporter.request(gaxiosOptions);
      return response.data;
    } catch (e) {
      const err = e;
      const errorData = err.response?.data;
      if (errorData?.error) {
        err.message = `${errorData.error}: ${errorData.error_description}`;
      }
      throw err;
    }
  }
  return getToken;
}
var getCredentials = {};
var errorWithCode = {};
var hasRequiredErrorWithCode;
function requireErrorWithCode() {
  if (hasRequiredErrorWithCode) return errorWithCode;
  hasRequiredErrorWithCode = 1;
  Object.defineProperty(errorWithCode, "__esModule", { value: true });
  errorWithCode.ErrorWithCode = void 0;
  class ErrorWithCode extends Error {
    code;
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }
  errorWithCode.ErrorWithCode = ErrorWithCode;
  return errorWithCode;
}
var hasRequiredGetCredentials;
function requireGetCredentials() {
  if (hasRequiredGetCredentials) return getCredentials;
  hasRequiredGetCredentials = 1;
  Object.defineProperty(getCredentials, "__esModule", { value: true });
  getCredentials.getCredentials = getCredentials$1;
  const path = require$$5;
  const fs = require$$0$3;
  const util_1 = require$$0$6;
  const errorWithCode_1 = requireErrorWithCode();
  const readFile = fs.readFile ? (0, util_1.promisify)(fs.readFile) : async () => {
    throw new errorWithCode_1.ErrorWithCode("use key rather than keyFile.", "MISSING_CREDENTIALS");
  };
  var ExtensionFiles;
  (function(ExtensionFiles2) {
    ExtensionFiles2["JSON"] = ".json";
    ExtensionFiles2["DER"] = ".der";
    ExtensionFiles2["CRT"] = ".crt";
    ExtensionFiles2["PEM"] = ".pem";
    ExtensionFiles2["P12"] = ".p12";
    ExtensionFiles2["PFX"] = ".pfx";
  })(ExtensionFiles || (ExtensionFiles = {}));
  class JsonCredentialsProvider {
    keyFilePath;
    constructor(keyFilePath) {
      this.keyFilePath = keyFilePath;
    }
    /**
     * Reads a JSON key file and extracts the private key and client email.
     * @returns A promise that resolves with the credentials.
     */
    async getCredentials() {
      const key = await readFile(this.keyFilePath, "utf8");
      let body;
      try {
        body = JSON.parse(key);
      } catch (error) {
        const err = error;
        throw new Error(`Invalid JSON key file: ${err.message}`);
      }
      const privateKey = body.private_key;
      const clientEmail = body.client_email;
      if (!privateKey || !clientEmail) {
        throw new errorWithCode_1.ErrorWithCode("private_key and client_email are required.", "MISSING_CREDENTIALS");
      }
      return { privateKey, clientEmail };
    }
  }
  class PemCredentialsProvider {
    keyFilePath;
    constructor(keyFilePath) {
      this.keyFilePath = keyFilePath;
    }
    /**
     * Reads a PEM-like key file.
     * @returns A promise that resolves with the private key.
     */
    async getCredentials() {
      const privateKey = await readFile(this.keyFilePath, "utf8");
      return { privateKey };
    }
  }
  class P12CredentialsProvider {
    /**
     * Throws an error as P12/PFX certificates are not supported.
     * @returns A promise that rejects with an error.
     */
    async getCredentials() {
      throw new errorWithCode_1.ErrorWithCode("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
    }
  }
  class CredentialsProviderFactory {
    /**
     * Creates a credential provider based on the key file extension.
     * @param keyFilePath The path to the key file.
     * @returns An instance of a class that implements ICredentialsProvider.
     */
    static create(keyFilePath) {
      const keyFileExtension = path.extname(keyFilePath);
      switch (keyFileExtension) {
        case ExtensionFiles.JSON:
          return new JsonCredentialsProvider(keyFilePath);
        case ExtensionFiles.DER:
        case ExtensionFiles.CRT:
        case ExtensionFiles.PEM:
          return new PemCredentialsProvider(keyFilePath);
        case ExtensionFiles.P12:
        case ExtensionFiles.PFX:
          return new P12CredentialsProvider();
        default:
          throw new errorWithCode_1.ErrorWithCode("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE");
      }
    }
  }
  async function getCredentials$1(keyFilePath) {
    const provider = CredentialsProviderFactory.create(keyFilePath);
    return provider.getCredentials();
  }
  return getCredentials;
}
var hasRequiredTokenHandler;
function requireTokenHandler() {
  if (hasRequiredTokenHandler) return tokenHandler;
  hasRequiredTokenHandler = 1;
  Object.defineProperty(tokenHandler, "__esModule", { value: true });
  tokenHandler.TokenHandler = void 0;
  const getToken_1 = requireGetToken();
  const getCredentials_1 = requireGetCredentials();
  class TokenHandler {
    /** The cached access token. */
    token;
    /** The expiration time of the cached access token. */
    tokenExpiresAt;
    /** A promise for an in-flight token request. */
    inFlightRequest;
    tokenOptions;
    /**
     * Creates an instance of TokenHandler.
     * @param tokenOptions The options for fetching tokens.
     * @param transporter The transporter to use for making requests.
     */
    constructor(tokenOptions) {
      this.tokenOptions = tokenOptions;
    }
    /**
     * Processes the credentials, loading them from a key file if necessary.
     * This method is called before any token request.
     */
    async processCredentials() {
      if (!this.tokenOptions.key && !this.tokenOptions.keyFile) {
        throw new Error("No key or keyFile set.");
      }
      if (!this.tokenOptions.key && this.tokenOptions.keyFile) {
        const credentials = await (0, getCredentials_1.getCredentials)(this.tokenOptions.keyFile);
        this.tokenOptions.key = credentials.privateKey;
        this.tokenOptions.email = credentials.clientEmail;
      }
    }
    /**
     * Checks if the cached token is expired or close to expiring.
     * @returns True if the token is expiring, false otherwise.
     */
    isTokenExpiring() {
      if (!this.token || !this.tokenExpiresAt) {
        return true;
      }
      const now = (/* @__PURE__ */ new Date()).getTime();
      const eagerRefreshThresholdMillis = this.tokenOptions.eagerRefreshThresholdMillis ?? 0;
      return this.tokenExpiresAt <= now + eagerRefreshThresholdMillis;
    }
    /**
     * Returns whether the token has completely expired.
     *
     * @returns true if the token has expired, false otherwise.
     */
    hasExpired() {
      (/* @__PURE__ */ new Date()).getTime();
      if (this.token && this.tokenExpiresAt) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return now >= this.tokenExpiresAt;
      }
      return true;
    }
    /**
     * Fetches an access token, using a cached one if available and not expired.
     * @param forceRefresh If true, forces a new token to be fetched.
     * @returns A promise that resolves with the token data.
     */
    async getToken(forceRefresh) {
      await this.processCredentials();
      if (this.inFlightRequest && !forceRefresh) {
        return this.inFlightRequest;
      }
      if (this.token && !this.isTokenExpiring() && !forceRefresh) {
        return this.token;
      }
      try {
        this.inFlightRequest = (0, getToken_1.getToken)(this.tokenOptions);
        const token = await this.inFlightRequest;
        this.token = token;
        this.tokenExpiresAt = (/* @__PURE__ */ new Date()).getTime() + (token.expires_in ?? 0) * 1e3;
        return token;
      } finally {
        this.inFlightRequest = void 0;
      }
    }
  }
  tokenHandler.TokenHandler = TokenHandler;
  return tokenHandler;
}
var revokeToken = {};
var hasRequiredRevokeToken;
function requireRevokeToken() {
  if (hasRequiredRevokeToken) return revokeToken;
  hasRequiredRevokeToken = 1;
  Object.defineProperty(revokeToken, "__esModule", { value: true });
  revokeToken.revokeToken = revokeToken$1;
  const GOOGLE_REVOKE_TOKEN_URL = "https://oauth2.googleapis.com/revoke?token=";
  const DEFAULT_RETRY_VALUE = true;
  async function revokeToken$1(accessToken, transporter) {
    const url = GOOGLE_REVOKE_TOKEN_URL + accessToken;
    return await transporter.request({
      url,
      retry: DEFAULT_RETRY_VALUE
    });
  }
  return revokeToken;
}
var hasRequiredGoogleToken;
function requireGoogleToken() {
  if (hasRequiredGoogleToken) return googleToken;
  hasRequiredGoogleToken = 1;
  Object.defineProperty(googleToken, "__esModule", { value: true });
  googleToken.GoogleToken = void 0;
  const gaxios_1 = requireSrc$3();
  const tokenHandler_1 = requireTokenHandler();
  const revokeToken_1 = requireRevokeToken();
  class GoogleToken {
    /** The configuration options for this token instance. */
    tokenOptions;
    /** The handler for token fetching and caching logic. */
    tokenHandler;
    /**
     * Create a GoogleToken.
     *
     * @param options  Configuration object.
     */
    constructor(options2) {
      this.tokenOptions = options2 || {};
      this.tokenOptions.transporter = this.tokenOptions.transporter || {
        request: (opts) => (0, gaxios_1.request)(opts)
      };
      if (!this.tokenOptions.iss) {
        this.tokenOptions.iss = this.tokenOptions.email;
      }
      if (typeof this.tokenOptions.scope === "object") {
        this.tokenOptions.scope = this.tokenOptions.scope.join(" ");
      }
      this.tokenHandler = new tokenHandler_1.TokenHandler(this.tokenOptions);
    }
    get expiresAt() {
      return this.tokenHandler.tokenExpiresAt;
    }
    /**
     * The most recent access token obtained by this client.
     */
    get accessToken() {
      return this.tokenHandler.token?.access_token;
    }
    /**
     * The most recent ID token obtained by this client.
     */
    get idToken() {
      return this.tokenHandler.token?.id_token;
    }
    /**
     * The token type of the most recent access token.
     */
    get tokenType() {
      return this.tokenHandler.token?.token_type;
    }
    /**
     * The refresh token for the current credentials.
     */
    get refreshToken() {
      return this.tokenHandler.token?.refresh_token;
    }
    /**
     * A boolean indicating if the current token has expired.
     */
    hasExpired() {
      return this.tokenHandler.hasExpired();
    }
    /**
     * A boolean indicating if the current token is expiring soon,
     * based on the `eagerRefreshThresholdMillis` option.
     */
    isTokenExpiring() {
      return this.tokenHandler.isTokenExpiring();
    }
    getToken(callbackOrOptions, opts = { forceRefresh: false }) {
      let callback;
      if (typeof callbackOrOptions === "function") {
        callback = callbackOrOptions;
      } else if (typeof callbackOrOptions === "object") {
        opts = callbackOrOptions;
      }
      const promise = this.tokenHandler.getToken(opts.forceRefresh ?? false);
      if (callback) {
        promise.then((token) => callback(null, token), callback);
      }
      return promise;
    }
    revokeToken(callback) {
      if (!this.accessToken) {
        return Promise.reject(new Error("No token to revoke."));
      }
      const promise = (0, revokeToken_1.revokeToken)(this.accessToken, this.tokenOptions.transporter);
      if (callback) {
        promise.then(() => callback(), callback);
      }
      this.tokenHandler = new tokenHandler_1.TokenHandler(this.tokenOptions);
    }
    /**
     * Returns the configuration options for this token instance.
     */
    get googleTokenOptions() {
      return this.tokenOptions;
    }
  }
  googleToken.GoogleToken = GoogleToken;
  return googleToken;
}
var jwtaccess$2 = {};
var hasRequiredJwtaccess$2;
function requireJwtaccess$2() {
  if (hasRequiredJwtaccess$2) return jwtaccess$2;
  hasRequiredJwtaccess$2 = 1;
  Object.defineProperty(jwtaccess$2, "__esModule", { value: true });
  jwtaccess$2.JWTAccess = void 0;
  const jws = requireJws();
  const util_1 = requireUtil$2();
  const DEFAULT_HEADER = {
    alg: "RS256",
    typ: "JWT"
  };
  class JWTAccess {
    email;
    key;
    keyId;
    projectId;
    eagerRefreshThresholdMillis;
    cache = new util_1.LRUCache({
      capacity: 500,
      maxAge: 60 * 60 * 1e3
    });
    /**
     * JWTAccess service account credentials.
     *
     * Create a new access token by using the credential to create a new JWT token
     * that's recognized as the access token.
     *
     * @param email the service account email address.
     * @param key the private key that will be used to sign the token.
     * @param keyId the ID of the private key used to sign the token.
     */
    constructor(email, key, keyId, eagerRefreshThresholdMillis) {
      this.email = email;
      this.key = key;
      this.keyId = keyId;
      this.eagerRefreshThresholdMillis = eagerRefreshThresholdMillis ?? 5 * 60 * 1e3;
    }
    /**
     * Ensures that we're caching a key appropriately, giving precedence to scopes vs. url
     *
     * @param url The URI being authorized.
     * @param scopes The scope or scopes being authorized
     * @returns A string that returns the cached key.
     */
    getCachedKey(url, scopes) {
      let cacheKey = url;
      if (scopes && Array.isArray(scopes) && scopes.length) {
        cacheKey = url ? `${url}_${scopes.join("_")}` : `${scopes.join("_")}`;
      } else if (typeof scopes === "string") {
        cacheKey = url ? `${url}_${scopes}` : scopes;
      }
      if (!cacheKey) {
        throw Error("Scopes or url must be provided");
      }
      return cacheKey;
    }
    /**
     * Get a non-expired access token, after refreshing if necessary.
     *
     * @param url The URI being authorized.
     * @param additionalClaims An object with a set of additional claims to
     * include in the payload.
     * @returns An object that includes the authorization header.
     */
    getRequestHeaders(url, additionalClaims, scopes) {
      const key = this.getCachedKey(url, scopes);
      const cachedToken = this.cache.get(key);
      const now = Date.now();
      if (cachedToken && cachedToken.expiration - now > this.eagerRefreshThresholdMillis) {
        return new Headers(cachedToken.headers);
      }
      const iat = Math.floor(Date.now() / 1e3);
      const exp = JWTAccess.getExpirationTime(iat);
      let defaultClaims;
      if (Array.isArray(scopes)) {
        scopes = scopes.join(" ");
      }
      if (scopes) {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          scope: scopes,
          exp,
          iat
        };
      } else {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          aud: url,
          exp,
          iat
        };
      }
      if (additionalClaims) {
        for (const claim in defaultClaims) {
          if (additionalClaims[claim]) {
            throw new Error(`The '${claim}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`);
          }
        }
      }
      const header = this.keyId ? { ...DEFAULT_HEADER, kid: this.keyId } : DEFAULT_HEADER;
      const payload = Object.assign(defaultClaims, additionalClaims);
      const signedJWT = jws.sign({ header, payload, secret: this.key });
      const headers = new Headers({ authorization: `Bearer ${signedJWT}` });
      this.cache.set(key, {
        expiration: exp * 1e3,
        headers
      });
      return headers;
    }
    /**
     * Returns an expiration time for the JWT token.
     *
     * @param iat The issued at time for the JWT.
     * @returns An expiration time for the JWT.
     */
    static getExpirationTime(iat) {
      const exp = iat + 3600;
      return exp;
    }
    /**
     * Create a JWTAccess credentials instance using the given input options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          reject(new Error("Must pass in a stream containing the service account auth settings."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("data", (chunk) => s += chunk).on("error", reject).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }
  jwtaccess$2.JWTAccess = JWTAccess;
  return jwtaccess$2;
}
var hasRequiredJwtclient$2;
function requireJwtclient$2() {
  if (hasRequiredJwtclient$2) return jwtclient$2;
  hasRequiredJwtclient$2 = 1;
  Object.defineProperty(jwtclient$2, "__esModule", { value: true });
  jwtclient$2.JWT = void 0;
  const googleToken_1 = requireGoogleToken();
  const getCredentials_1 = requireGetCredentials();
  const jwtaccess_1 = requireJwtaccess$2();
  const oauth2client_1 = requireOauth2client$2();
  const authclient_1 = requireAuthclient$2();
  class JWT extends oauth2client_1.OAuth2Client {
    email;
    keyFile;
    key;
    keyId;
    defaultScopes;
    scopes;
    scope;
    subject;
    gtoken;
    additionalClaims;
    useJWTAccessWithScope;
    defaultServicePath;
    access;
    /**
     * JWT service account credentials.
     *
     * Retrieve access token using gtoken.
     *
     * @param options the
     */
    constructor(options2 = {}) {
      super(options2);
      this.email = options2.email;
      this.keyFile = options2.keyFile;
      this.key = options2.key;
      this.keyId = options2.keyId;
      this.scopes = options2.scopes;
      this.subject = options2.subject;
      this.additionalClaims = options2.additionalClaims;
      this.credentials = { refresh_token: "jwt-placeholder", expiry_date: 1 };
    }
    /**
     * Creates a copy of the credential with the specified scopes.
     * @param scopes List of requested scopes or a single scope.
     * @return The cloned instance.
     */
    createScoped(scopes) {
      const jwt = new JWT(this);
      jwt.scopes = scopes;
      return jwt;
    }
    /**
     * Obtains the metadata to be sent with the request.
     *
     * @param url the URI being authorized.
     */
    async getRequestMetadataAsync(url) {
      url = this.defaultServicePath ? `https://${this.defaultServicePath}/` : url;
      const useSelfSignedJWT = !this.hasUserScopes() && url || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
      if (this.subject && this.universeDomain !== authclient_1.DEFAULT_UNIVERSE) {
        throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${authclient_1.DEFAULT_UNIVERSE}`);
      }
      if (!this.apiKey && useSelfSignedJWT) {
        if (this.additionalClaims && this.additionalClaims.target_audience) {
          const { tokens } = await this.refreshToken();
          return {
            headers: this.addSharedMetadataHeaders(new Headers({
              authorization: `Bearer ${tokens.id_token}`
            }))
          };
        } else {
          if (!this.access) {
            this.access = new jwtaccess_1.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
          }
          let scopes;
          if (this.hasUserScopes()) {
            scopes = this.scopes;
          } else if (!url) {
            scopes = this.defaultScopes;
          }
          const useScopes = this.useJWTAccessWithScope || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
          const headers = await this.access.getRequestHeaders(
            url ?? void 0,
            this.additionalClaims,
            // Scopes take precedent over audience for signing,
            // so we only provide them if `useJWTAccessWithScope` is on or
            // if we are in a non-default universe
            useScopes ? scopes : void 0
          );
          return { headers: this.addSharedMetadataHeaders(headers) };
        }
      } else if (this.hasAnyScopes() || this.apiKey) {
        return super.getRequestMetadataAsync(url);
      } else {
        return { headers: new Headers() };
      }
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const gtoken = new googleToken_1.GoogleToken({
        iss: this.email,
        sub: this.subject,
        scope: this.scopes || this.defaultScopes,
        keyFile: this.keyFile,
        key: this.key,
        additionalClaims: { target_audience: targetAudience },
        transporter: this.transporter
      });
      await gtoken.getToken({
        forceRefresh: true
      });
      if (!gtoken.idToken) {
        throw new Error("Unknown error: Failed to fetch ID token");
      }
      return gtoken.idToken;
    }
    /**
     * Determine if there are currently scopes available.
     */
    hasUserScopes() {
      if (!this.scopes) {
        return false;
      }
      return this.scopes.length > 0;
    }
    /**
     * Are there any default or user scopes defined.
     */
    hasAnyScopes() {
      if (this.scopes && this.scopes.length > 0)
        return true;
      if (this.defaultScopes && this.defaultScopes.length > 0)
        return true;
      return false;
    }
    authorize(callback) {
      if (callback) {
        this.authorizeAsync().then((r) => callback(null, r), callback);
      } else {
        return this.authorizeAsync();
      }
    }
    async authorizeAsync() {
      const result = await this.refreshToken();
      if (!result) {
        throw new Error("No result returned");
      }
      this.credentials = result.tokens;
      this.credentials.refresh_token = "jwt-placeholder";
      this.key = this.gtoken.googleTokenOptions?.key;
      this.email = this.gtoken.googleTokenOptions?.iss;
      return result.tokens;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken ignored
     * @private
     */
    async refreshTokenNoCache() {
      const gtoken = this.createGToken();
      const token = await gtoken.getToken({
        forceRefresh: this.isTokenExpiring()
      });
      const tokens = {
        access_token: token.access_token,
        token_type: "Bearer",
        expiry_date: gtoken.expiresAt,
        id_token: gtoken.idToken
      };
      this.emit("tokens", tokens);
      return { res: null, tokens };
    }
    /**
     * Create a gToken if it doesn't already exist.
     */
    createGToken() {
      if (!this.gtoken) {
        this.gtoken = new googleToken_1.GoogleToken({
          iss: this.email,
          sub: this.subject,
          scope: this.scopes || this.defaultScopes,
          keyFile: this.keyFile,
          key: this.key,
          additionalClaims: this.additionalClaims,
          transporter: this.transporter
        });
      }
      return this.gtoken;
    }
    /**
     * Create a JWT credentials instance using the given input options.
     * @param json The input object.
     *
     * @remarks
     *
     * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          throw new Error("Must pass in a stream containing the service account auth settings.");
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    /**
     * Creates a JWT credentials instance using an API Key for authentication.
     * @param apiKey The API Key in string form.
     */
    fromAPIKey(apiKey) {
      if (typeof apiKey !== "string") {
        throw new Error("Must provide an API Key string.");
      }
      this.apiKey = apiKey;
    }
    /**
     * Using the key or keyFile on the JWT client, obtain an object that contains
     * the key and the client email.
     */
    async getCredentials() {
      if (this.key) {
        return { private_key: this.key, client_email: this.email };
      } else if (this.keyFile) {
        this.createGToken();
        const creds = await (0, getCredentials_1.getCredentials)(this.keyFile);
        return { private_key: creds.privateKey, client_email: creds.clientEmail };
      }
      throw new Error("A key or a keyFile must be provided to getCredentials.");
    }
  }
  jwtclient$2.JWT = JWT;
  return jwtclient$2;
}
var refreshclient$2 = {};
var hasRequiredRefreshclient$2;
function requireRefreshclient$2() {
  if (hasRequiredRefreshclient$2) return refreshclient$2;
  hasRequiredRefreshclient$2 = 1;
  Object.defineProperty(refreshclient$2, "__esModule", { value: true });
  refreshclient$2.UserRefreshClient = refreshclient$2.USER_REFRESH_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client$2();
  const authclient_1 = requireAuthclient$2();
  refreshclient$2.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
  class UserRefreshClient extends oauth2client_1.OAuth2Client {
    // TODO: refactor tests to make this private
    // In a future gts release, the _propertyName rule will be lifted.
    // This is also a hard one because `this.refreshToken` is a function.
    _refreshToken;
    /**
     * The User Refresh Token client.
     *
     * @param optionsOrClientId The User Refresh Token client options. Passing an `clientId` directly is **@DEPRECATED**.
     * @param clientSecret **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param refreshToken **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param eagerRefreshThresholdMillis **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param forceRefreshOnFailure **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     */
    constructor(optionsOrClientId, clientSecret, refreshToken, eagerRefreshThresholdMillis, forceRefreshOnFailure) {
      const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : {
        clientId: optionsOrClientId,
        clientSecret,
        refreshToken,
        eagerRefreshThresholdMillis,
        forceRefreshOnFailure
      };
      super(opts);
      this._refreshToken = opts.refreshToken;
      this.credentials.refresh_token = opts.refreshToken;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken An ignored refreshToken..
     * @param callback Optional callback.
     */
    async refreshTokenNoCache() {
      return super.refreshTokenNoCache(this._refreshToken);
    }
    async fetchIdToken(targetAudience) {
      const opts = {
        ...UserRefreshClient.RETRY_CONFIG,
        url: this.endpoints.oauth2TokenUrl,
        method: "POST",
        data: new URLSearchParams({
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token",
          refresh_token: this._refreshToken,
          target_audience: targetAudience
        }),
        responseType: "json"
      };
      authclient_1.AuthClient.setMethodName(opts, "fetchIdToken");
      const res = await this.transporter.request(opts);
      return res.data.id_token;
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the user refresh token");
      }
      if (json.type !== "authorized_user") {
        throw new Error('The incoming JSON object does not have the "authorized_user" type');
      }
      if (!json.client_id) {
        throw new Error("The incoming JSON object does not contain a client_id field");
      }
      if (!json.client_secret) {
        throw new Error("The incoming JSON object does not contain a client_secret field");
      }
      if (!json.refresh_token) {
        throw new Error("The incoming JSON object does not contain a refresh_token field");
      }
      this._clientId = json.client_id;
      this._clientSecret = json.client_secret;
      this._refreshToken = json.refresh_token;
      this.credentials.refresh_token = json.refresh_token;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    async fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          return reject(new Error("Must pass in a stream containing the user refresh token."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            return resolve();
          } catch (err) {
            return reject(err);
          }
        });
      });
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    static fromJSON(json) {
      const client = new UserRefreshClient();
      client.fromJSON(json);
      return client;
    }
  }
  refreshclient$2.UserRefreshClient = UserRefreshClient;
  return refreshclient$2;
}
var impersonated$2 = {};
var hasRequiredImpersonated$2;
function requireImpersonated$2() {
  if (hasRequiredImpersonated$2) return impersonated$2;
  hasRequiredImpersonated$2 = 1;
  Object.defineProperty(impersonated$2, "__esModule", { value: true });
  impersonated$2.Impersonated = impersonated$2.IMPERSONATED_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client$2();
  const gaxios_1 = requireSrc$3();
  const util_1 = requireUtil$2();
  impersonated$2.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
  class Impersonated extends oauth2client_1.OAuth2Client {
    sourceClient;
    targetPrincipal;
    targetScopes;
    delegates;
    lifetime;
    endpoint;
    /**
     * Impersonated service account credentials.
     *
     * Create a new access token by impersonating another service account.
     *
     * Impersonated Credentials allowing credentials issued to a user or
     * service account to impersonate another. The source project using
     * Impersonated Credentials must enable the "IAMCredentials" API.
     * Also, the target service account must grant the orginating principal
     * the "Service Account Token Creator" IAM role.
     *
     * **IMPORTANT**: This method does not validate the credential configuration.
     * A security risk occurs when a credential configuration configured with
     * malicious URLs is used. When the credential configuration is accepted from
     * an untrusted source, you should validate it before using it with this
     * method. For more details, see
     * https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
     *
     * @param {object} options - The configuration object.
     * @param {object} [options.sourceClient] the source credential used as to
     * acquire the impersonated credentials.
     * @param {string} [options.targetPrincipal] the service account to
     * impersonate.
     * @param {string[]} [options.delegates] the chained list of delegates
     * required to grant the final access_token. If set, the sequence of
     * identities must have "Service Account Token Creator" capability granted to
     * the preceding identity. For example, if set to [serviceAccountB,
     * serviceAccountC], the sourceCredential must have the Token Creator role on
     * serviceAccountB. serviceAccountB must have the Token Creator on
     * serviceAccountC. Finally, C must have Token Creator on target_principal.
     * If left unset, sourceCredential must have that role on targetPrincipal.
     * @param {string[]} [options.targetScopes] scopes to request during the
     * authorization grant.
     * @param {number} [options.lifetime] number of seconds the delegated
     * credential should be valid for up to 3600 seconds by default, or 43,200
     * seconds by extending the token's lifetime, see:
     * https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials#sa-credentials-oauth
     * @param {string} [options.endpoint] api endpoint override.
     */
    constructor(options2 = {}) {
      super(options2);
      this.credentials = {
        expiry_date: 1,
        refresh_token: "impersonated-placeholder"
      };
      this.sourceClient = options2.sourceClient ?? new oauth2client_1.OAuth2Client();
      this.targetPrincipal = options2.targetPrincipal ?? "";
      this.delegates = options2.delegates ?? [];
      this.targetScopes = options2.targetScopes ?? [];
      this.lifetime = options2.lifetime ?? 3600;
      const usingExplicitUniverseDomain = !!(0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
      if (!usingExplicitUniverseDomain) {
        this.universeDomain = this.sourceClient.universeDomain;
      } else if (this.sourceClient.universeDomain !== this.universeDomain) {
        throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
      }
      this.endpoint = options2.endpoint ?? `https://iamcredentials.${this.universeDomain}`;
    }
    /**
     * Signs some bytes.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob Reference Documentation}
     * @param blobToSign String to sign.
     *
     * @returns A {@link SignBlobResponse} denoting the keyID and signedBlob in base64 string
     */
    async sign(blobToSign) {
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:signBlob`;
      const body = {
        delegates: this.delegates,
        payload: Buffer.from(blobToSign).toString("base64")
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data;
    }
    /** The service account email to be impersonated. */
    getTargetPrincipal() {
      return this.targetPrincipal;
    }
    /**
     * Refreshes the access token.
     */
    async refreshToken() {
      try {
        await this.sourceClient.getAccessToken();
        const name2 = "projects/-/serviceAccounts/" + this.targetPrincipal;
        const u = `${this.endpoint}/v1/${name2}:generateAccessToken`;
        const body = {
          delegates: this.delegates,
          scope: this.targetScopes,
          lifetime: this.lifetime + "s"
        };
        const res = await this.sourceClient.request({
          ...Impersonated.RETRY_CONFIG,
          url: u,
          data: body,
          method: "POST"
        });
        const tokenResponse = res.data;
        this.credentials.access_token = tokenResponse.accessToken;
        this.credentials.expiry_date = Date.parse(tokenResponse.expireTime);
        return {
          tokens: this.credentials,
          res
        };
      } catch (error) {
        if (!(error instanceof Error))
          throw error;
        let status = 0;
        let message = "";
        if (error instanceof gaxios_1.GaxiosError) {
          status = error?.response?.data?.error?.status;
          message = error?.response?.data?.error?.message;
        }
        if (status && message) {
          error.message = `${status}: unable to impersonate: ${message}`;
          throw error;
        } else {
          error.message = `unable to impersonate: ${error}`;
          throw error;
        }
      }
    }
    /**
     * Generates an OpenID Connect ID token for a service account.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/generateIdToken Reference Documentation}
     *
     * @param targetAudience the audience for the fetched ID token.
     * @param options the for the request
     * @return an OpenID Connect ID token
     */
    async fetchIdToken(targetAudience, options2) {
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:generateIdToken`;
      const body = {
        delegates: this.delegates,
        audience: targetAudience,
        includeEmail: options2?.includeEmail ?? true,
        useEmailAzp: options2?.includeEmail ?? true
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data.token;
    }
  }
  impersonated$2.Impersonated = Impersonated;
  return impersonated$2;
}
var externalclient$2 = {};
var baseexternalclient$2 = {};
var stscredentials$2 = {};
var oauth2common$2 = {};
var hasRequiredOauth2common$2;
function requireOauth2common$2() {
  if (hasRequiredOauth2common$2) return oauth2common$2;
  hasRequiredOauth2common$2 = 1;
  Object.defineProperty(oauth2common$2, "__esModule", { value: true });
  oauth2common$2.OAuthClientAuthHandler = void 0;
  oauth2common$2.getErrorFromOAuthErrorResponse = getErrorFromOAuthErrorResponse;
  const gaxios_1 = requireSrc$3();
  const crypto_1 = requireCrypto$6();
  const METHODS_SUPPORTING_REQUEST_BODY = ["PUT", "POST", "PATCH"];
  class OAuthClientAuthHandler {
    #crypto = (0, crypto_1.createCrypto)();
    #clientAuthentication;
    transporter;
    /**
     * Instantiates an OAuth client authentication handler.
     * @param options The OAuth Client Auth Handler instance options. Passing an `ClientAuthentication` directly is **@DEPRECATED**.
     */
    constructor(options2) {
      if (options2 && "clientId" in options2) {
        this.#clientAuthentication = options2;
        this.transporter = new gaxios_1.Gaxios();
      } else {
        this.#clientAuthentication = options2?.clientAuthentication;
        this.transporter = options2?.transporter || new gaxios_1.Gaxios();
      }
    }
    /**
     * Applies client authentication on the OAuth request's headers or POST
     * body but does not process the request.
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    applyClientAuthenticationOptions(opts, bearerToken) {
      opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
      this.injectAuthenticatedHeaders(opts, bearerToken);
      if (!bearerToken) {
        this.injectAuthenticatedRequestBody(opts);
      }
    }
    /**
     * Applies client authentication on the request's header if either
     * basic authentication or bearer token authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    injectAuthenticatedHeaders(opts, bearerToken) {
      if (bearerToken) {
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers, {
          authorization: `Bearer ${bearerToken}`
        });
      } else if (this.#clientAuthentication?.confidentialClientType === "basic") {
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        const clientId = this.#clientAuthentication.clientId;
        const clientSecret = this.#clientAuthentication.clientSecret || "";
        const base64EncodedCreds = this.#crypto.encodeBase64StringUtf8(`${clientId}:${clientSecret}`);
        gaxios_1.Gaxios.mergeHeaders(opts.headers, {
          authorization: `Basic ${base64EncodedCreds}`
        });
      }
    }
    /**
     * Applies client authentication on the request's body if request-body
     * client authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     */
    injectAuthenticatedRequestBody(opts) {
      if (this.#clientAuthentication?.confidentialClientType === "request-body") {
        const method = (opts.method || "GET").toUpperCase();
        if (!METHODS_SUPPORTING_REQUEST_BODY.includes(method)) {
          throw new Error(`${method} HTTP method does not support ${this.#clientAuthentication.confidentialClientType} client authentication`);
        }
        const headers = new Headers(opts.headers);
        const contentType = headers.get("content-type");
        if (contentType?.startsWith("application/x-www-form-urlencoded") || opts.data instanceof URLSearchParams) {
          const data = new URLSearchParams(opts.data ?? "");
          data.append("client_id", this.#clientAuthentication.clientId);
          data.append("client_secret", this.#clientAuthentication.clientSecret || "");
          opts.data = data;
        } else if (contentType?.startsWith("application/json")) {
          opts.data = opts.data || {};
          Object.assign(opts.data, {
            client_id: this.#clientAuthentication.clientId,
            client_secret: this.#clientAuthentication.clientSecret || ""
          });
        } else {
          throw new Error(`${contentType} content-types are not supported with ${this.#clientAuthentication.confidentialClientType} client authentication`);
        }
      }
    }
    /**
     * Retry config for Auth-related requests.
     *
     * @remarks
     *
     * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
     * config as some downstream APIs would prefer if customers explicitly enable retries,
     * such as GCS.
     */
    static get RETRY_CONFIG() {
      return {
        retry: true,
        retryConfig: {
          httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
        }
      };
    }
  }
  oauth2common$2.OAuthClientAuthHandler = OAuthClientAuthHandler;
  function getErrorFromOAuthErrorResponse(resp, err) {
    const errorCode = resp.error;
    const errorDescription = resp.error_description;
    const errorUri = resp.error_uri;
    let message = `Error code ${errorCode}`;
    if (typeof errorDescription !== "undefined") {
      message += `: ${errorDescription}`;
    }
    if (typeof errorUri !== "undefined") {
      message += ` - ${errorUri}`;
    }
    const newError = new Error(message);
    if (err) {
      const keys = Object.keys(err);
      if (err.stack) {
        keys.push("stack");
      }
      keys.forEach((key) => {
        if (key !== "message") {
          Object.defineProperty(newError, key, {
            value: err[key],
            writable: false,
            enumerable: true
          });
        }
      });
    }
    return newError;
  }
  return oauth2common$2;
}
var hasRequiredStscredentials$2;
function requireStscredentials$2() {
  if (hasRequiredStscredentials$2) return stscredentials$2;
  hasRequiredStscredentials$2 = 1;
  Object.defineProperty(stscredentials$2, "__esModule", { value: true });
  stscredentials$2.StsCredentials = void 0;
  const gaxios_1 = requireSrc$3();
  const authclient_1 = requireAuthclient$2();
  const oauth2common_1 = requireOauth2common$2();
  const util_1 = requireUtil$2();
  class StsCredentials extends oauth2common_1.OAuthClientAuthHandler {
    #tokenExchangeEndpoint;
    /**
     * Initializes an STS credentials instance.
     *
     * @param options The STS credentials instance options. Passing an `tokenExchangeEndpoint` directly is **@DEPRECATED**.
     * @param clientAuthentication **@DEPRECATED**. Provide a {@link StsCredentialsConstructionOptions `StsCredentialsConstructionOptions`} object in the first parameter instead.
     */
    constructor(options2 = {
      tokenExchangeEndpoint: ""
    }, clientAuthentication) {
      if (typeof options2 !== "object" || options2 instanceof URL) {
        options2 = {
          tokenExchangeEndpoint: options2,
          clientAuthentication
        };
      }
      super(options2);
      this.#tokenExchangeEndpoint = options2.tokenExchangeEndpoint;
    }
    /**
     * Exchanges the provided token for another type of token based on the
     * rfc8693 spec.
     * @param stsCredentialsOptions The token exchange options used to populate
     *   the token exchange request.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @param options Optional additional GCP-specific non-spec defined options
     *   to send with the request.
     *   Example: `&options=${encodeUriComponent(JSON.stringified(options))}`
     * @return A promise that resolves with the token exchange response containing
     *   the requested token and its expiration time.
     */
    async exchangeToken(stsCredentialsOptions, headers, options2) {
      const values = {
        grant_type: stsCredentialsOptions.grantType,
        resource: stsCredentialsOptions.resource,
        audience: stsCredentialsOptions.audience,
        scope: stsCredentialsOptions.scope?.join(" "),
        requested_token_type: stsCredentialsOptions.requestedTokenType,
        subject_token: stsCredentialsOptions.subjectToken,
        subject_token_type: stsCredentialsOptions.subjectTokenType,
        actor_token: stsCredentialsOptions.actingParty?.actorToken,
        actor_token_type: stsCredentialsOptions.actingParty?.actorTokenType,
        // Non-standard GCP-specific options.
        options: options2 && JSON.stringify(options2)
      };
      const opts = {
        ...StsCredentials.RETRY_CONFIG,
        url: this.#tokenExchangeEndpoint.toString(),
        method: "POST",
        headers,
        data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(values)),
        responseType: "json"
      };
      authclient_1.AuthClient.setMethodName(opts, "exchangeToken");
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const stsSuccessfulResponse = response.data;
        stsSuccessfulResponse.res = response;
        return stsSuccessfulResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  stscredentials$2.StsCredentials = StsCredentials;
  return stscredentials$2;
}
var hasRequiredBaseexternalclient$2;
function requireBaseexternalclient$2() {
  if (hasRequiredBaseexternalclient$2) return baseexternalclient$2;
  hasRequiredBaseexternalclient$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseExternalAccountClient = exports.CLOUD_RESOURCE_MANAGER = exports.EXTERNAL_ACCOUNT_TYPE = exports.EXPIRATION_TIME_OFFSET = void 0;
    const gaxios_1 = requireSrc$3();
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient$2();
    const sts = requireStscredentials$2();
    const util_1 = requireUtil$2();
    const shared_cjs_1 = requireShared$2();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const DEFAULT_OAUTH_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
    const DEFAULT_TOKEN_LIFESPAN = 3600;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    exports.EXTERNAL_ACCOUNT_TYPE = "external_account";
    exports.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
    const WORKFORCE_AUDIENCE_PATTERN = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+";
    const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/token";
    class BaseExternalAccountClient extends authclient_1.AuthClient {
      /**
       * OAuth scopes for the GCP access token to use. When not provided,
       * the default https://www.googleapis.com/auth/cloud-platform is
       * used.
       */
      scopes;
      projectNumber;
      audience;
      subjectTokenType;
      stsCredential;
      clientAuth;
      credentialSourceType;
      cachedAccessToken;
      serviceAccountImpersonationUrl;
      serviceAccountImpersonationLifetime;
      workforcePoolUserProject;
      configLifetimeRequested;
      tokenUrl;
      /**
       * @example
       * ```ts
       * new URL('https://cloudresourcemanager.googleapis.com/v1/projects/');
       * ```
       */
      cloudResourceManagerURL;
      supplierContext;
      /**
       * A pending access token request. Used for concurrent calls.
       */
      #pendingAccessToken = null;
      /**
       * Instantiate a BaseExternalAccountClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file. The camelCased options
       *   are aliases for the snake_cased options.
       */
      constructor(options2) {
        super(options2);
        const opts = (0, util_1.originalOrCamelOptions)(options2);
        const type = opts.get("type");
        if (type && type !== exports.EXTERNAL_ACCOUNT_TYPE) {
          throw new Error(`Expected "${exports.EXTERNAL_ACCOUNT_TYPE}" type but received "${options2.type}"`);
        }
        const clientId = opts.get("client_id");
        const clientSecret = opts.get("client_secret");
        this.tokenUrl = opts.get("token_url") ?? DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain);
        const subjectTokenType = opts.get("subject_token_type");
        const workforcePoolUserProject = opts.get("workforce_pool_user_project");
        const serviceAccountImpersonationUrl = opts.get("service_account_impersonation_url");
        const serviceAccountImpersonation = opts.get("service_account_impersonation");
        const serviceAccountImpersonationLifetime = (0, util_1.originalOrCamelOptions)(serviceAccountImpersonation).get("token_lifetime_seconds");
        this.cloudResourceManagerURL = new URL(opts.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`);
        if (clientId) {
          this.clientAuth = {
            confidentialClientType: "basic",
            clientId,
            clientSecret
          };
        }
        this.stsCredential = new sts.StsCredentials({
          tokenExchangeEndpoint: this.tokenUrl,
          clientAuthentication: this.clientAuth
        });
        this.scopes = opts.get("scopes") || [DEFAULT_OAUTH_SCOPE];
        this.cachedAccessToken = null;
        this.audience = opts.get("audience");
        this.subjectTokenType = subjectTokenType;
        this.workforcePoolUserProject = workforcePoolUserProject;
        const workforceAudiencePattern = new RegExp(WORKFORCE_AUDIENCE_PATTERN);
        if (this.workforcePoolUserProject && !this.audience.match(workforceAudiencePattern)) {
          throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
        }
        this.serviceAccountImpersonationUrl = serviceAccountImpersonationUrl;
        this.serviceAccountImpersonationLifetime = serviceAccountImpersonationLifetime;
        if (this.serviceAccountImpersonationLifetime) {
          this.configLifetimeRequested = true;
        } else {
          this.configLifetimeRequested = false;
          this.serviceAccountImpersonationLifetime = DEFAULT_TOKEN_LIFESPAN;
        }
        this.projectNumber = this.getProjectNumber(this.audience);
        this.supplierContext = {
          audience: this.audience,
          subjectTokenType: this.subjectTokenType,
          transporter: this.transporter
        };
      }
      /** The service account email to be impersonated, if available. */
      getServiceAccountEmail() {
        if (this.serviceAccountImpersonationUrl) {
          if (this.serviceAccountImpersonationUrl.length > 256) {
            throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
          }
          const re = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/;
          const result = re.exec(this.serviceAccountImpersonationUrl);
          return result?.groups?.email || null;
        }
        return null;
      }
      /**
       * Provides a mechanism to inject GCP access tokens directly.
       * When the provided credential expires, a new credential, using the
       * external account options, is retrieved.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        super.setCredentials(credentials);
        this.cachedAccessToken = credentials;
      }
      /**
       * @return A promise that resolves with the current GCP access token
       *   response. If the current credential is expired, a new one is retrieved.
       */
      async getAccessToken() {
        if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedAccessToken.access_token,
          res: this.cachedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = new Headers({
          authorization: `Bearer ${accessTokenResponse.token}`
        });
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * @return A promise that resolves with the project ID corresponding to the
       *   current workload identity pool or current workforce pool if
       *   determinable. For workforce pool credential, it returns the project ID
       *   corresponding to the workforcePoolUserProject.
       *   This is introduced to match the current pattern of using the Auth
       *   library:
       *   const projectId = await auth.getProjectId();
       *   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
       *   const res = await client.request({ url });
       *   The resource may not have permission
       *   (resourcemanager.projects.get) to call this API or the required
       *   scopes may not be selected:
       *   https://cloud.google.com/resource-manager/reference/rest/v1/projects/get#authorization-scopes
       */
      async getProjectId() {
        const projectNumber = this.projectNumber || this.workforcePoolUserProject;
        if (this.projectId) {
          return this.projectId;
        } else if (projectNumber) {
          const headers = await this.getRequestHeaders();
          const opts = {
            ...BaseExternalAccountClient.RETRY_CONFIG,
            headers,
            url: `${this.cloudResourceManagerURL.toString()}${projectNumber}`,
            responseType: "json"
          };
          authclient_1.AuthClient.setMethodName(opts, "getProjectId");
          const response = await this.transporter.request(opts);
          this.projectId = response.data.projectId;
          return this.projectId;
        }
        return null;
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
          this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * External credentials are exchanged for GCP access tokens via the token
       * exchange endpoint and other settings provided in the client options
       * object.
       * If the service_account_impersonation_url is provided, an additional
       * step to exchange the external account GCP access token for a service
       * account impersonated token is performed.
       * @return A promise that resolves with the fresh GCP access tokens.
       */
      async refreshAccessTokenAsync() {
        this.#pendingAccessToken = this.#pendingAccessToken || this.#internalRefreshAccessTokenAsync();
        try {
          return await this.#pendingAccessToken;
        } finally {
          this.#pendingAccessToken = null;
        }
      }
      async #internalRefreshAccessTokenAsync() {
        const subjectToken = await this.retrieveSubjectToken();
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          audience: this.audience,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: this.subjectTokenType,
          // generateAccessToken requires the provided access token to have
          // scopes:
          // https://www.googleapis.com/auth/iam or
          // https://www.googleapis.com/auth/cloud-platform
          // The new service account access token scopes will match the user
          // provided ones.
          scope: this.serviceAccountImpersonationUrl ? [DEFAULT_OAUTH_SCOPE] : this.getScopesArray()
        };
        const additionalOptions = !this.clientAuth && this.workforcePoolUserProject ? { userProject: this.workforcePoolUserProject } : void 0;
        const additionalHeaders = new Headers({
          "x-goog-api-client": this.getMetricsHeaderValue()
        });
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, additionalHeaders, additionalOptions);
        if (this.serviceAccountImpersonationUrl) {
          this.cachedAccessToken = await this.getImpersonatedAccessToken(stsResponse.access_token);
        } else if (stsResponse.expires_in) {
          this.cachedAccessToken = {
            access_token: stsResponse.access_token,
            expiry_date: (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3,
            res: stsResponse.res
          };
        } else {
          this.cachedAccessToken = {
            access_token: stsResponse.access_token,
            res: stsResponse.res
          };
        }
        this.credentials = {};
        Object.assign(this.credentials, this.cachedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedAccessToken.expiry_date,
          access_token: this.cachedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedAccessToken;
      }
      /**
       * Returns the workload identity pool project number if it is determinable
       * from the audience resource name.
       * @param audience The STS audience used to determine the project number.
       * @return The project number associated with the workload identity pool, if
       *   this can be determined from the STS audience field. Otherwise, null is
       *   returned.
       */
      getProjectNumber(audience) {
        const match = audience.match(/\/projects\/([^/]+)/);
        if (!match) {
          return null;
        }
        return match[1];
      }
      /**
       * Exchanges an external account GCP access token for a service
       * account impersonated access token using iamcredentials
       * GenerateAccessToken API.
       * @param token The access token to exchange for a service account access
       *   token.
       * @return A promise that resolves with the service account impersonated
       *   credentials response.
       */
      async getImpersonatedAccessToken(token) {
        const opts = {
          ...BaseExternalAccountClient.RETRY_CONFIG,
          url: this.serviceAccountImpersonationUrl,
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`
          },
          data: {
            scope: this.getScopesArray(),
            lifetime: this.serviceAccountImpersonationLifetime + "s"
          },
          responseType: "json"
        };
        authclient_1.AuthClient.setMethodName(opts, "getImpersonatedAccessToken");
        const response = await this.transporter.request(opts);
        const successResponse = response.data;
        return {
          access_token: successResponse.accessToken,
          // Convert from ISO format to timestamp.
          expiry_date: new Date(successResponse.expireTime).getTime(),
          res: response
        };
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param accessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(accessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return accessToken.expiry_date ? now >= accessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
      /**
       * @return The list of scopes for the requested GCP access token.
       */
      getScopesArray() {
        if (typeof this.scopes === "string") {
          return [this.scopes];
        }
        return this.scopes || [DEFAULT_OAUTH_SCOPE];
      }
      getMetricsHeaderValue() {
        const nodeVersion = process.version.replace(/^v/, "");
        const saImpersonation = this.serviceAccountImpersonationUrl !== void 0;
        const credentialSourceType = this.credentialSourceType ? this.credentialSourceType : "unknown";
        return `gl-node/${nodeVersion} auth/${shared_cjs_1.pkg.version} google-byoid-sdk source/${credentialSourceType} sa-impersonation/${saImpersonation} config-lifetime/${this.configLifetimeRequested}`;
      }
      getTokenUrl() {
        return this.tokenUrl;
      }
    }
    exports.BaseExternalAccountClient = BaseExternalAccountClient;
  })(baseexternalclient$2);
  return baseexternalclient$2;
}
var identitypoolclient$2 = {};
var filesubjecttokensupplier$2 = {};
var hasRequiredFilesubjecttokensupplier$2;
function requireFilesubjecttokensupplier$2() {
  if (hasRequiredFilesubjecttokensupplier$2) return filesubjecttokensupplier$2;
  hasRequiredFilesubjecttokensupplier$2 = 1;
  Object.defineProperty(filesubjecttokensupplier$2, "__esModule", { value: true });
  filesubjecttokensupplier$2.FileSubjectTokenSupplier = void 0;
  const util_1 = require$$0$6;
  const fs = require$$0$3;
  const readFile = (0, util_1.promisify)(fs.readFile ?? (() => {
  }));
  const realpath = (0, util_1.promisify)(fs.realpath ?? (() => {
  }));
  const lstat = (0, util_1.promisify)(fs.lstat ?? (() => {
  }));
  class FileSubjectTokenSupplier {
    filePath;
    formatType;
    subjectTokenFieldName;
    /**
     * Instantiates a new file based subject token supplier.
     * @param opts The file subject token supplier options to build the supplier
     *   with.
     */
    constructor(opts) {
      this.filePath = opts.filePath;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
    }
    /**
     * Returns the subject token stored at the file specified in the constructor.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken() {
      let parsedFilePath = this.filePath;
      try {
        parsedFilePath = await realpath(parsedFilePath);
        if (!(await lstat(parsedFilePath)).isFile()) {
          throw new Error();
        }
      } catch (err) {
        if (err instanceof Error) {
          err.message = `The file at ${parsedFilePath} does not exist, or it is not a file. ${err.message}`;
        }
        throw err;
      }
      let subjectToken;
      const rawText = await readFile(parsedFilePath, { encoding: "utf8" });
      if (this.formatType === "text") {
        subjectToken = rawText;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const json = JSON.parse(rawText);
        subjectToken = json[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source file");
      }
      return subjectToken;
    }
  }
  filesubjecttokensupplier$2.FileSubjectTokenSupplier = FileSubjectTokenSupplier;
  return filesubjecttokensupplier$2;
}
var urlsubjecttokensupplier$2 = {};
var hasRequiredUrlsubjecttokensupplier$2;
function requireUrlsubjecttokensupplier$2() {
  if (hasRequiredUrlsubjecttokensupplier$2) return urlsubjecttokensupplier$2;
  hasRequiredUrlsubjecttokensupplier$2 = 1;
  Object.defineProperty(urlsubjecttokensupplier$2, "__esModule", { value: true });
  urlsubjecttokensupplier$2.UrlSubjectTokenSupplier = void 0;
  const authclient_1 = requireAuthclient$2();
  class UrlSubjectTokenSupplier {
    url;
    headers;
    formatType;
    subjectTokenFieldName;
    additionalGaxiosOptions;
    /**
     * Instantiates a URL subject token supplier.
     * @param opts The URL subject token supplier options to build the supplier with.
     */
    constructor(opts) {
      this.url = opts.url;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
      this.headers = opts.headers;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Sends a GET request to the URL provided in the constructor and resolves
     * with the returned external subject token.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken(context) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.url,
        method: "GET",
        headers: this.headers,
        responseType: this.formatType
      };
      authclient_1.AuthClient.setMethodName(opts, "getSubjectToken");
      let subjectToken;
      if (this.formatType === "text") {
        const response = await context.transporter.request(opts);
        subjectToken = response.data;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const response = await context.transporter.request(opts);
        subjectToken = response.data[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source URL");
      }
      return subjectToken;
    }
  }
  urlsubjecttokensupplier$2.UrlSubjectTokenSupplier = UrlSubjectTokenSupplier;
  return urlsubjecttokensupplier$2;
}
var certificatesubjecttokensupplier$1 = {};
var hasRequiredCertificatesubjecttokensupplier$1;
function requireCertificatesubjecttokensupplier$1() {
  if (hasRequiredCertificatesubjecttokensupplier$1) return certificatesubjecttokensupplier$1;
  hasRequiredCertificatesubjecttokensupplier$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CertificateSubjectTokenSupplier = exports.InvalidConfigurationError = exports.CertificateSourceUnavailableError = exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE = void 0;
    const util_1 = requireUtil$2();
    const fs = require$$0$3;
    const crypto_1 = require$$0$2;
    const https = require$$1$2;
    exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE = "GOOGLE_API_CERTIFICATE_CONFIG";
    class CertificateSourceUnavailableError extends Error {
      constructor(message) {
        super(message);
        this.name = "CertificateSourceUnavailableError";
      }
    }
    exports.CertificateSourceUnavailableError = CertificateSourceUnavailableError;
    class InvalidConfigurationError extends Error {
      constructor(message) {
        super(message);
        this.name = "InvalidConfigurationError";
      }
    }
    exports.InvalidConfigurationError = InvalidConfigurationError;
    class CertificateSubjectTokenSupplier {
      certificateConfigPath;
      trustChainPath;
      cert;
      key;
      /**
       * Initializes a new instance of the CertificateSubjectTokenSupplier.
       * @param opts The configuration options for the supplier.
       */
      constructor(opts) {
        if (!opts.useDefaultCertificateConfig && !opts.certificateConfigLocation) {
          throw new InvalidConfigurationError("Either `useDefaultCertificateConfig` must be true or a `certificateConfigLocation` must be provided.");
        }
        if (opts.useDefaultCertificateConfig && opts.certificateConfigLocation) {
          throw new InvalidConfigurationError("Both `useDefaultCertificateConfig` and `certificateConfigLocation` cannot be provided.");
        }
        this.trustChainPath = opts.trustChainPath;
        this.certificateConfigPath = opts.certificateConfigLocation ?? "";
      }
      /**
       * Creates an HTTPS agent configured with the client certificate and private key for mTLS.
       * @returns An mTLS-configured https.Agent.
       */
      async createMtlsHttpsAgent() {
        if (!this.key || !this.cert) {
          throw new InvalidConfigurationError("Cannot create mTLS Agent with missing certificate or key");
        }
        return new https.Agent({ key: this.key, cert: this.cert });
      }
      /**
       * Constructs the subject token, which is the base64-encoded certificate chain.
       * @returns A promise that resolves with the subject token.
       */
      async getSubjectToken() {
        this.certificateConfigPath = await this.#resolveCertificateConfigFilePath();
        const { certPath, keyPath } = await this.#getCertAndKeyPaths();
        ({ cert: this.cert, key: this.key } = await this.#getKeyAndCert(certPath, keyPath));
        return await this.#processChainFromPaths(this.cert);
      }
      /**
       * Resolves the absolute path to the certificate configuration file
       * by checking the "certificate_config_location" provided in the ADC file,
       * or the "GOOGLE_API_CERTIFICATE_CONFIG" environment variable
       * or in the default gcloud path.
       * @param overridePath An optional path to check first.
       * @returns The resolved file path.
       */
      async #resolveCertificateConfigFilePath() {
        const overridePath = this.certificateConfigPath;
        if (overridePath) {
          if (await (0, util_1.isValidFile)(overridePath)) {
            return overridePath;
          }
          throw new CertificateSourceUnavailableError(`Provided certificate config path is invalid: ${overridePath}`);
        }
        const envPath = process.env[exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE];
        if (envPath) {
          if (await (0, util_1.isValidFile)(envPath)) {
            return envPath;
          }
          throw new CertificateSourceUnavailableError(`Path from environment variable "${exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE}" is invalid: ${envPath}`);
        }
        const wellKnownPath = (0, util_1.getWellKnownCertificateConfigFileLocation)();
        if (await (0, util_1.isValidFile)(wellKnownPath)) {
          return wellKnownPath;
        }
        throw new CertificateSourceUnavailableError(`Could not find certificate configuration file. Searched override path, the "${exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE}" env var, and the gcloud path (${wellKnownPath}).`);
      }
      /**
       * Reads and parses the certificate config JSON file to extract the certificate and key paths.
       * @returns An object containing the certificate and key paths.
       */
      async #getCertAndKeyPaths() {
        const configPath = this.certificateConfigPath;
        let fileContents;
        try {
          fileContents = await fs.promises.readFile(configPath, "utf8");
        } catch (err) {
          throw new CertificateSourceUnavailableError(`Failed to read certificate config file at: ${configPath}`);
        }
        try {
          const config = JSON.parse(fileContents);
          const certPath = config?.cert_configs?.workload?.cert_path;
          const keyPath = config?.cert_configs?.workload?.key_path;
          if (!certPath || !keyPath) {
            throw new InvalidConfigurationError(`Certificate config file (${configPath}) is missing required "cert_path" or "key_path" in the workload config.`);
          }
          return { certPath, keyPath };
        } catch (e) {
          if (e instanceof InvalidConfigurationError)
            throw e;
          throw new InvalidConfigurationError(`Failed to parse certificate config from ${configPath}: ${e.message}`);
        }
      }
      /**
       * Reads and parses the cert and key files get their content and check valid format.
       * @returns An object containing the cert content and key content in buffer format.
       */
      async #getKeyAndCert(certPath, keyPath) {
        let cert, key;
        try {
          cert = await fs.promises.readFile(certPath);
          new crypto_1.X509Certificate(cert);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to read certificate file at ${certPath}: ${message}`);
        }
        try {
          key = await fs.promises.readFile(keyPath);
          (0, crypto_1.createPrivateKey)(key);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to read private key file at ${keyPath}: ${message}`);
        }
        return { cert, key };
      }
      /**
       * Reads the leaf certificate and trust chain, combines them,
       * and returns a JSON array of base64-encoded certificates.
       * @returns A stringified JSON array of the certificate chain.
       */
      async #processChainFromPaths(leafCertBuffer) {
        const leafCert = new crypto_1.X509Certificate(leafCertBuffer);
        if (!this.trustChainPath) {
          return JSON.stringify([leafCert.raw.toString("base64")]);
        }
        try {
          const chainPems = await fs.promises.readFile(this.trustChainPath, "utf8");
          const pemBlocks = chainPems.match(/-----BEGIN CERTIFICATE-----[^-]+-----END CERTIFICATE-----/g) ?? [];
          const chainCerts = pemBlocks.map((pem, index) => {
            try {
              return new crypto_1.X509Certificate(pem);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              throw new InvalidConfigurationError(`Failed to parse certificate at index ${index} in trust chain file ${this.trustChainPath}: ${message}`);
            }
          });
          const leafIndex = chainCerts.findIndex((chainCert) => leafCert.raw.equals(chainCert.raw));
          let finalChain;
          if (leafIndex === -1) {
            finalChain = [leafCert, ...chainCerts];
          } else if (leafIndex === 0) {
            finalChain = chainCerts;
          } else {
            throw new InvalidConfigurationError(`Leaf certificate exists in the trust chain but is not the first entry (found at index ${leafIndex}).`);
          }
          return JSON.stringify(finalChain.map((cert) => cert.raw.toString("base64")));
        } catch (err) {
          if (err instanceof InvalidConfigurationError)
            throw err;
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to process certificate chain from ${this.trustChainPath}: ${message}`);
        }
      }
    }
    exports.CertificateSubjectTokenSupplier = CertificateSubjectTokenSupplier;
  })(certificatesubjecttokensupplier$1);
  return certificatesubjecttokensupplier$1;
}
var hasRequiredIdentitypoolclient$2;
function requireIdentitypoolclient$2() {
  if (hasRequiredIdentitypoolclient$2) return identitypoolclient$2;
  hasRequiredIdentitypoolclient$2 = 1;
  Object.defineProperty(identitypoolclient$2, "__esModule", { value: true });
  identitypoolclient$2.IdentityPoolClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient$2();
  const util_1 = requireUtil$2();
  const filesubjecttokensupplier_1 = requireFilesubjecttokensupplier$2();
  const urlsubjecttokensupplier_1 = requireUrlsubjecttokensupplier$2();
  const certificatesubjecttokensupplier_1 = requireCertificatesubjecttokensupplier$1();
  const stscredentials_1 = requireStscredentials$2();
  const gaxios_1 = requireSrc$3();
  class IdentityPoolClient extends baseexternalclient_1.BaseExternalAccountClient {
    subjectTokenSupplier;
    /**
     * Instantiate an IdentityPoolClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid file-sourced or
     * url-sourced credential or a workforce pool user project is provided
     * with a non workforce audience.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file. The camelCased options
     *   are aliases for the snake_cased options.
     */
    constructor(options2) {
      super(options2);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const subjectTokenSupplier = opts.get("subject_token_supplier");
      if (!credentialSource && !subjectTokenSupplier) {
        throw new Error("A credential source or subject token supplier must be specified.");
      }
      if (credentialSource && subjectTokenSupplier) {
        throw new Error("Only one of credential source or subject token supplier can be specified.");
      }
      if (subjectTokenSupplier) {
        this.subjectTokenSupplier = subjectTokenSupplier;
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        const formatOpts = (0, util_1.originalOrCamelOptions)(credentialSourceOpts.get("format"));
        const formatType = formatOpts.get("type") || "text";
        const formatSubjectTokenFieldName = formatOpts.get("subject_token_field_name");
        if (formatType !== "json" && formatType !== "text") {
          throw new Error(`Invalid credential_source format "${formatType}"`);
        }
        if (formatType === "json" && !formatSubjectTokenFieldName) {
          throw new Error("Missing subject_token_field_name for JSON credential_source format");
        }
        const file = credentialSourceOpts.get("file");
        const url = credentialSourceOpts.get("url");
        const certificate = credentialSourceOpts.get("certificate");
        const headers = credentialSourceOpts.get("headers");
        if (file && url || url && certificate || file && certificate) {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file, url, or certificate.');
        } else if (file) {
          this.credentialSourceType = "file";
          this.subjectTokenSupplier = new filesubjecttokensupplier_1.FileSubjectTokenSupplier({
            filePath: file,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName
          });
        } else if (url) {
          this.credentialSourceType = "url";
          this.subjectTokenSupplier = new urlsubjecttokensupplier_1.UrlSubjectTokenSupplier({
            url,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName,
            headers,
            additionalGaxiosOptions: IdentityPoolClient.RETRY_CONFIG
          });
        } else if (certificate) {
          this.credentialSourceType = "certificate";
          const certificateSubjecttokensupplier = new certificatesubjecttokensupplier_1.CertificateSubjectTokenSupplier({
            useDefaultCertificateConfig: certificate.use_default_certificate_config,
            certificateConfigLocation: certificate.certificate_config_location,
            trustChainPath: certificate.trust_chain_path
          });
          this.subjectTokenSupplier = certificateSubjecttokensupplier;
        } else {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file, url, or certificate.');
        }
      }
    }
    /**
     * Triggered when a external subject token is needed to be exchanged for a GCP
     * access token via GCP STS endpoint. Gets a subject token by calling
     * the configured {@link SubjectTokenSupplier}
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      const subjectToken = await this.subjectTokenSupplier.getSubjectToken(this.supplierContext);
      if (this.subjectTokenSupplier instanceof certificatesubjecttokensupplier_1.CertificateSubjectTokenSupplier) {
        const mtlsAgent = await this.subjectTokenSupplier.createMtlsHttpsAgent();
        this.stsCredential = new stscredentials_1.StsCredentials({
          tokenExchangeEndpoint: this.getTokenUrl(),
          clientAuthentication: this.clientAuth,
          transporter: new gaxios_1.Gaxios({ agent: mtlsAgent })
        });
        this.transporter = new gaxios_1.Gaxios({
          ...this.transporter.defaults || {},
          agent: mtlsAgent
        });
      }
      return subjectToken;
    }
  }
  identitypoolclient$2.IdentityPoolClient = IdentityPoolClient;
  return identitypoolclient$2;
}
var awsclient$2 = {};
var awsrequestsigner$2 = {};
var hasRequiredAwsrequestsigner$2;
function requireAwsrequestsigner$2() {
  if (hasRequiredAwsrequestsigner$2) return awsrequestsigner$2;
  hasRequiredAwsrequestsigner$2 = 1;
  Object.defineProperty(awsrequestsigner$2, "__esModule", { value: true });
  awsrequestsigner$2.AwsRequestSigner = void 0;
  const gaxios_1 = requireSrc$3();
  const crypto_1 = requireCrypto$6();
  const AWS_ALGORITHM = "AWS4-HMAC-SHA256";
  const AWS_REQUEST_TYPE = "aws4_request";
  class AwsRequestSigner {
    getCredentials;
    region;
    crypto;
    /**
     * Instantiates an AWS API request signer used to send authenticated signed
     * requests to AWS APIs based on the AWS Signature Version 4 signing process.
     * This also provides a mechanism to generate the signed request without
     * sending it.
     * @param getCredentials A mechanism to retrieve AWS security credentials
     *   when needed.
     * @param region The AWS region to use.
     */
    constructor(getCredentials2, region) {
      this.getCredentials = getCredentials2;
      this.region = region;
      this.crypto = (0, crypto_1.createCrypto)();
    }
    /**
     * Generates the signed request for the provided HTTP request for calling
     * an AWS API. This follows the steps described at:
     * https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
     * @param amzOptions The AWS request options that need to be signed.
     * @return A promise that resolves with the GaxiosOptions containing the
     *   signed HTTP request parameters.
     */
    async getRequestOptions(amzOptions) {
      if (!amzOptions.url) {
        throw new RangeError('"url" is required in "amzOptions"');
      }
      const requestPayloadData = typeof amzOptions.data === "object" ? JSON.stringify(amzOptions.data) : amzOptions.data;
      const url = amzOptions.url;
      const method = amzOptions.method || "GET";
      const requestPayload = amzOptions.body || requestPayloadData;
      const additionalAmzHeaders = amzOptions.headers;
      const awsSecurityCredentials = await this.getCredentials();
      const uri = new URL(url);
      if (typeof requestPayload !== "string" && requestPayload !== void 0) {
        throw new TypeError(`'requestPayload' is expected to be a string if provided. Got: ${requestPayload}`);
      }
      const headerMap = await generateAuthenticationHeaderMap({
        crypto: this.crypto,
        host: uri.host,
        canonicalUri: uri.pathname,
        canonicalQuerystring: uri.search.slice(1),
        method,
        region: this.region,
        securityCredentials: awsSecurityCredentials,
        requestPayload,
        additionalAmzHeaders
      });
      const headers = gaxios_1.Gaxios.mergeHeaders(
        // Add x-amz-date if available.
        headerMap.amzDate ? { "x-amz-date": headerMap.amzDate } : {},
        {
          authorization: headerMap.authorizationHeader,
          host: uri.host
        },
        additionalAmzHeaders || {}
      );
      if (awsSecurityCredentials.token) {
        gaxios_1.Gaxios.mergeHeaders(headers, {
          "x-amz-security-token": awsSecurityCredentials.token
        });
      }
      const awsSignedReq = {
        url,
        method,
        headers
      };
      if (requestPayload !== void 0) {
        awsSignedReq.body = requestPayload;
      }
      return awsSignedReq;
    }
  }
  awsrequestsigner$2.AwsRequestSigner = AwsRequestSigner;
  async function sign(crypto2, key, msg) {
    return await crypto2.signWithHmacSha256(key, msg);
  }
  async function getSigningKey(crypto2, key, dateStamp, region, serviceName) {
    const kDate = await sign(crypto2, `AWS4${key}`, dateStamp);
    const kRegion = await sign(crypto2, kDate, region);
    const kService = await sign(crypto2, kRegion, serviceName);
    const kSigning = await sign(crypto2, kService, "aws4_request");
    return kSigning;
  }
  async function generateAuthenticationHeaderMap(options2) {
    const additionalAmzHeaders = gaxios_1.Gaxios.mergeHeaders(options2.additionalAmzHeaders);
    const requestPayload = options2.requestPayload || "";
    const serviceName = options2.host.split(".")[0];
    const now = /* @__PURE__ */ new Date();
    const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
    const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/T.*/, "");
    if (options2.securityCredentials.token) {
      additionalAmzHeaders.set("x-amz-security-token", options2.securityCredentials.token);
    }
    const amzHeaders = gaxios_1.Gaxios.mergeHeaders(
      {
        host: options2.host
      },
      // Previously the date was not fixed with x-amz- and could be provided manually.
      // https://github.com/boto/botocore/blob/879f8440a4e9ace5d3cf145ce8b3d5e5ffb892ef/tests/unit/auth/aws4_testsuite/get-header-value-trim.req
      additionalAmzHeaders.has("date") ? {} : { "x-amz-date": amzDate },
      additionalAmzHeaders
    );
    let canonicalHeaders = "";
    const signedHeadersList = [
      ...amzHeaders.keys()
    ].sort();
    signedHeadersList.forEach((key) => {
      canonicalHeaders += `${key}:${amzHeaders.get(key)}
`;
    });
    const signedHeaders = signedHeadersList.join(";");
    const payloadHash = await options2.crypto.sha256DigestHex(requestPayload);
    const canonicalRequest = `${options2.method.toUpperCase()}
${options2.canonicalUri}
${options2.canonicalQuerystring}
${canonicalHeaders}
${signedHeaders}
${payloadHash}`;
    const credentialScope = `${dateStamp}/${options2.region}/${serviceName}/${AWS_REQUEST_TYPE}`;
    const stringToSign = `${AWS_ALGORITHM}
${amzDate}
${credentialScope}
` + await options2.crypto.sha256DigestHex(canonicalRequest);
    const signingKey = await getSigningKey(options2.crypto, options2.securityCredentials.secretAccessKey, dateStamp, options2.region, serviceName);
    const signature = await sign(options2.crypto, signingKey, stringToSign);
    const authorizationHeader = `${AWS_ALGORITHM} Credential=${options2.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${(0, crypto_1.fromArrayBufferToHex)(signature)}`;
    return {
      // Do not return x-amz-date if date is available.
      amzDate: additionalAmzHeaders.has("date") ? void 0 : amzDate,
      authorizationHeader,
      canonicalQuerystring: options2.canonicalQuerystring
    };
  }
  return awsrequestsigner$2;
}
var defaultawssecuritycredentialssupplier$2 = {};
var hasRequiredDefaultawssecuritycredentialssupplier$2;
function requireDefaultawssecuritycredentialssupplier$2() {
  if (hasRequiredDefaultawssecuritycredentialssupplier$2) return defaultawssecuritycredentialssupplier$2;
  hasRequiredDefaultawssecuritycredentialssupplier$2 = 1;
  Object.defineProperty(defaultawssecuritycredentialssupplier$2, "__esModule", { value: true });
  defaultawssecuritycredentialssupplier$2.DefaultAwsSecurityCredentialsSupplier = void 0;
  const authclient_1 = requireAuthclient$2();
  class DefaultAwsSecurityCredentialsSupplier {
    regionUrl;
    securityCredentialsUrl;
    imdsV2SessionTokenUrl;
    additionalGaxiosOptions;
    /**
     * Instantiates a new DefaultAwsSecurityCredentialsSupplier using information
     * from the credential_source stored in the ADC file.
     * @param opts The default aws security credentials supplier options object to
     *   build the supplier with.
     */
    constructor(opts) {
      this.regionUrl = opts.regionUrl;
      this.securityCredentialsUrl = opts.securityCredentialsUrl;
      this.imdsV2SessionTokenUrl = opts.imdsV2SessionTokenUrl;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Returns the active AWS region. This first checks to see if the region
     * is available as an environment variable. If it is not, then the supplier
     * will call the region URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS region string.
     */
    async getAwsRegion(context) {
      if (this.#regionFromEnv) {
        return this.#regionFromEnv;
      }
      const metadataHeaders = new Headers();
      if (!this.#regionFromEnv && this.imdsV2SessionTokenUrl) {
        metadataHeaders.set("x-aws-ec2-metadata-token", await this.#getImdsV2SessionToken(context.transporter));
      }
      if (!this.regionUrl) {
        throw new RangeError('Unable to determine AWS region due to missing "options.credential_source.region_url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.regionUrl,
        method: "GET",
        responseType: "text",
        headers: metadataHeaders
      };
      authclient_1.AuthClient.setMethodName(opts, "getAwsRegion");
      const response = await context.transporter.request(opts);
      return response.data.substr(0, response.data.length - 1);
    }
    /**
     * Returns AWS security credentials. This first checks to see if the credentials
     * is available as environment variables. If it is not, then the supplier
     * will call the security credentials URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS security credentials.
     */
    async getAwsSecurityCredentials(context) {
      if (this.#securityCredentialsFromEnv) {
        return this.#securityCredentialsFromEnv;
      }
      const metadataHeaders = new Headers();
      if (this.imdsV2SessionTokenUrl) {
        metadataHeaders.set("x-aws-ec2-metadata-token", await this.#getImdsV2SessionToken(context.transporter));
      }
      const roleName = await this.#getAwsRoleName(metadataHeaders, context.transporter);
      const awsCreds = await this.#retrieveAwsSecurityCredentials(roleName, metadataHeaders, context.transporter);
      return {
        accessKeyId: awsCreds.AccessKeyId,
        secretAccessKey: awsCreds.SecretAccessKey,
        token: awsCreds.Token
      };
    }
    /**
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the IMDSv2 Session Token.
     */
    async #getImdsV2SessionToken(transporter) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.imdsV2SessionTokenUrl,
        method: "PUT",
        responseType: "text",
        headers: { "x-aws-ec2-metadata-token-ttl-seconds": "300" }
      };
      authclient_1.AuthClient.setMethodName(opts, "#getImdsV2SessionToken");
      const response = await transporter.request(opts);
      return response.data;
    }
    /**
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the assigned role to the current
     *   AWS VM. This is needed for calling the security-credentials endpoint.
     */
    async #getAwsRoleName(headers, transporter) {
      if (!this.securityCredentialsUrl) {
        throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.securityCredentialsUrl,
        method: "GET",
        responseType: "text",
        headers
      };
      authclient_1.AuthClient.setMethodName(opts, "#getAwsRoleName");
      const response = await transporter.request(opts);
      return response.data;
    }
    /**
     * Retrieves the temporary AWS credentials by calling the security-credentials
     * endpoint as specified in the `credential_source` object.
     * @param roleName The role attached to the current VM.
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the temporary AWS credentials
     *   needed for creating the GetCallerIdentity signed request.
     */
    async #retrieveAwsSecurityCredentials(roleName, headers, transporter) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: `${this.securityCredentialsUrl}/${roleName}`,
        headers,
        responseType: "json"
      };
      authclient_1.AuthClient.setMethodName(opts, "#retrieveAwsSecurityCredentials");
      const response = await transporter.request(opts);
      return response.data;
    }
    get #regionFromEnv() {
      return process.env["AWS_REGION"] || process.env["AWS_DEFAULT_REGION"] || null;
    }
    get #securityCredentialsFromEnv() {
      if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
        return {
          accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
          secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
          token: process.env["AWS_SESSION_TOKEN"]
        };
      }
      return null;
    }
  }
  defaultawssecuritycredentialssupplier$2.DefaultAwsSecurityCredentialsSupplier = DefaultAwsSecurityCredentialsSupplier;
  return defaultawssecuritycredentialssupplier$2;
}
var hasRequiredAwsclient$2;
function requireAwsclient$2() {
  if (hasRequiredAwsclient$2) return awsclient$2;
  hasRequiredAwsclient$2 = 1;
  Object.defineProperty(awsclient$2, "__esModule", { value: true });
  awsclient$2.AwsClient = void 0;
  const awsrequestsigner_1 = requireAwsrequestsigner$2();
  const baseexternalclient_1 = requireBaseexternalclient$2();
  const defaultawssecuritycredentialssupplier_1 = requireDefaultawssecuritycredentialssupplier$2();
  const util_1 = requireUtil$2();
  const gaxios_1 = requireSrc$3();
  class AwsClient extends baseexternalclient_1.BaseExternalAccountClient {
    environmentId;
    awsSecurityCredentialsSupplier;
    regionalCredVerificationUrl;
    awsRequestSigner;
    region;
    static #DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL = "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15";
    /**
     * @deprecated AWS client no validates the EC2 metadata address.
     **/
    static AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
    /**
     * @deprecated AWS client no validates the EC2 metadata address.
     **/
    static AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254";
    /**
     * Instantiates an AwsClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid AWS credential.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     */
    constructor(options2) {
      super(options2);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const awsSecurityCredentialsSupplier = opts.get("aws_security_credentials_supplier");
      if (!credentialSource && !awsSecurityCredentialsSupplier) {
        throw new Error("A credential source or AWS security credentials supplier must be specified.");
      }
      if (credentialSource && awsSecurityCredentialsSupplier) {
        throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
      }
      if (awsSecurityCredentialsSupplier) {
        this.awsSecurityCredentialsSupplier = awsSecurityCredentialsSupplier;
        this.regionalCredVerificationUrl = AwsClient.#DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL;
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        this.environmentId = credentialSourceOpts.get("environment_id");
        const regionUrl = credentialSourceOpts.get("region_url");
        const securityCredentialsUrl = credentialSourceOpts.get("url");
        const imdsV2SessionTokenUrl = credentialSourceOpts.get("imdsv2_session_token_url");
        this.awsSecurityCredentialsSupplier = new defaultawssecuritycredentialssupplier_1.DefaultAwsSecurityCredentialsSupplier({
          regionUrl,
          securityCredentialsUrl,
          imdsV2SessionTokenUrl
        });
        this.regionalCredVerificationUrl = credentialSourceOpts.get("regional_cred_verification_url");
        this.credentialSourceType = "aws";
        this.validateEnvironmentId();
      }
      this.awsRequestSigner = null;
      this.region = "";
    }
    validateEnvironmentId() {
      const match = this.environmentId?.match(/^(aws)(\d+)$/);
      if (!match || !this.regionalCredVerificationUrl) {
        throw new Error('No valid AWS "credential_source" provided');
      } else if (parseInt(match[2], 10) !== 1) {
        throw new Error(`aws version "${match[2]}" is not supported in the current build.`);
      }
    }
    /**
     * Triggered when an external subject token is needed to be exchanged for a
     * GCP access token via GCP STS endpoint. This will call the
     * {@link AwsSecurityCredentialsSupplier} to retrieve an AWS region and AWS
     * Security Credentials, then use them to create a signed AWS STS request that
     * can be exchanged for a GCP access token.
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      if (!this.awsRequestSigner) {
        this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext);
        this.awsRequestSigner = new awsrequestsigner_1.AwsRequestSigner(async () => {
          return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext);
        }, this.region);
      }
      const options2 = await this.awsRequestSigner.getRequestOptions({
        ...AwsClient.RETRY_CONFIG,
        url: this.regionalCredVerificationUrl.replace("{region}", this.region),
        method: "POST"
      });
      const reformattedHeader = [];
      const extendedHeaders = gaxios_1.Gaxios.mergeHeaders({
        // The full, canonical resource name of the workload identity pool
        // provider, with or without the HTTPS prefix.
        // Including this header as part of the signature is recommended to
        // ensure data integrity.
        "x-goog-cloud-target-resource": this.audience
      }, options2.headers);
      extendedHeaders.forEach((value, key) => reformattedHeader.push({ key, value }));
      return encodeURIComponent(JSON.stringify({
        url: options2.url,
        method: options2.method,
        headers: reformattedHeader
      }));
    }
  }
  awsclient$2.AwsClient = AwsClient;
  return awsclient$2;
}
var pluggableAuthClient$2 = {};
var executableResponse$2 = {};
var hasRequiredExecutableResponse$2;
function requireExecutableResponse$2() {
  if (hasRequiredExecutableResponse$2) return executableResponse$2;
  hasRequiredExecutableResponse$2 = 1;
  Object.defineProperty(executableResponse$2, "__esModule", { value: true });
  executableResponse$2.InvalidSubjectTokenError = executableResponse$2.InvalidMessageFieldError = executableResponse$2.InvalidCodeFieldError = executableResponse$2.InvalidTokenTypeFieldError = executableResponse$2.InvalidExpirationTimeFieldError = executableResponse$2.InvalidSuccessFieldError = executableResponse$2.InvalidVersionFieldError = executableResponse$2.ExecutableResponseError = executableResponse$2.ExecutableResponse = void 0;
  const SAML_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:saml2";
  const OIDC_SUBJECT_TOKEN_TYPE1 = "urn:ietf:params:oauth:token-type:id_token";
  const OIDC_SUBJECT_TOKEN_TYPE2 = "urn:ietf:params:oauth:token-type:jwt";
  class ExecutableResponse {
    /**
     * The version of the Executable response. Only version 1 is currently supported.
     */
    version;
    /**
     * Whether the executable ran successfully.
     */
    success;
    /**
     * The epoch time for expiration of the token in seconds.
     */
    expirationTime;
    /**
     * The type of subject token in the response, currently supported values are:
     * urn:ietf:params:oauth:token-type:saml2
     * urn:ietf:params:oauth:token-type:id_token
     * urn:ietf:params:oauth:token-type:jwt
     */
    tokenType;
    /**
     * The error code from the executable.
     */
    errorCode;
    /**
     * The error message from the executable.
     */
    errorMessage;
    /**
     * The subject token from the executable, format depends on tokenType.
     */
    subjectToken;
    /**
     * Instantiates an ExecutableResponse instance using the provided JSON object
     * from the output of the executable.
     * @param responseJson Response from a 3rd party executable, loaded from a
     * run of the executable or a cached output file.
     */
    constructor(responseJson) {
      if (!responseJson.version) {
        throw new InvalidVersionFieldError("Executable response must contain a 'version' field.");
      }
      if (responseJson.success === void 0) {
        throw new InvalidSuccessFieldError("Executable response must contain a 'success' field.");
      }
      this.version = responseJson.version;
      this.success = responseJson.success;
      if (this.success) {
        this.expirationTime = responseJson.expiration_time;
        this.tokenType = responseJson.token_type;
        if (this.tokenType !== SAML_SUBJECT_TOKEN_TYPE && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE1 && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE2) {
          throw new InvalidTokenTypeFieldError(`Executable response must contain a 'token_type' field when successful and it must be one of ${OIDC_SUBJECT_TOKEN_TYPE1}, ${OIDC_SUBJECT_TOKEN_TYPE2}, or ${SAML_SUBJECT_TOKEN_TYPE}.`);
        }
        if (this.tokenType === SAML_SUBJECT_TOKEN_TYPE) {
          if (!responseJson.saml_response) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'saml_response' field when token_type=${SAML_SUBJECT_TOKEN_TYPE}.`);
          }
          this.subjectToken = responseJson.saml_response;
        } else {
          if (!responseJson.id_token) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'id_token' field when token_type=${OIDC_SUBJECT_TOKEN_TYPE1} or ${OIDC_SUBJECT_TOKEN_TYPE2}.`);
          }
          this.subjectToken = responseJson.id_token;
        }
      } else {
        if (!responseJson.code) {
          throw new InvalidCodeFieldError("Executable response must contain a 'code' field when unsuccessful.");
        }
        if (!responseJson.message) {
          throw new InvalidMessageFieldError("Executable response must contain a 'message' field when unsuccessful.");
        }
        this.errorCode = responseJson.code;
        this.errorMessage = responseJson.message;
      }
    }
    /**
     * @return A boolean representing if the response has a valid token. Returns
     * true when the response was successful and the token is not expired.
     */
    isValid() {
      return !this.isExpired() && this.success;
    }
    /**
     * @return A boolean representing if the response is expired. Returns true if the
     * provided timeout has passed.
     */
    isExpired() {
      return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1e3);
    }
  }
  executableResponse$2.ExecutableResponse = ExecutableResponse;
  class ExecutableResponseError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  executableResponse$2.ExecutableResponseError = ExecutableResponseError;
  class InvalidVersionFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidVersionFieldError = InvalidVersionFieldError;
  class InvalidSuccessFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidSuccessFieldError = InvalidSuccessFieldError;
  class InvalidExpirationTimeFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidExpirationTimeFieldError = InvalidExpirationTimeFieldError;
  class InvalidTokenTypeFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidTokenTypeFieldError = InvalidTokenTypeFieldError;
  class InvalidCodeFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidCodeFieldError = InvalidCodeFieldError;
  class InvalidMessageFieldError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidMessageFieldError = InvalidMessageFieldError;
  class InvalidSubjectTokenError extends ExecutableResponseError {
  }
  executableResponse$2.InvalidSubjectTokenError = InvalidSubjectTokenError;
  return executableResponse$2;
}
var pluggableAuthHandler$2 = {};
var hasRequiredPluggableAuthHandler$2;
function requirePluggableAuthHandler$2() {
  if (hasRequiredPluggableAuthHandler$2) return pluggableAuthHandler$2;
  hasRequiredPluggableAuthHandler$2 = 1;
  Object.defineProperty(pluggableAuthHandler$2, "__esModule", { value: true });
  pluggableAuthHandler$2.PluggableAuthHandler = pluggableAuthHandler$2.ExecutableError = void 0;
  const executable_response_1 = requireExecutableResponse$2();
  const childProcess = require$$1$3;
  const fs = require$$0$3;
  class ExecutableError extends Error {
    /**
     * The exit code returned by the executable.
     */
    code;
    constructor(message, code) {
      super(`The executable failed with exit code: ${code} and error message: ${message}.`);
      this.code = code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  pluggableAuthHandler$2.ExecutableError = ExecutableError;
  class PluggableAuthHandler {
    commandComponents;
    timeoutMillis;
    outputFile;
    /**
     * Instantiates a PluggableAuthHandler instance using the provided
     * PluggableAuthHandlerOptions object.
     */
    constructor(options2) {
      if (!options2.command) {
        throw new Error("No command provided.");
      }
      this.commandComponents = PluggableAuthHandler.parseCommand(options2.command);
      this.timeoutMillis = options2.timeoutMillis;
      if (!this.timeoutMillis) {
        throw new Error("No timeoutMillis provided.");
      }
      this.outputFile = options2.outputFile;
    }
    /**
     * Calls user provided executable to get a 3rd party subject token and
     * returns the response.
     * @param envMap a Map of additional Environment Variables required for
     *   the executable.
     * @return A promise that resolves with the executable response.
     */
    retrieveResponseFromExecutable(envMap) {
      return new Promise((resolve, reject) => {
        const child = childProcess.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
          env: { ...process.env, ...Object.fromEntries(envMap) }
        });
        let output = "";
        child.stdout.on("data", (data) => {
          output += data;
        });
        child.stderr.on("data", (err) => {
          output += err;
        });
        const timeout = setTimeout(() => {
          child.removeAllListeners();
          child.kill();
          return reject(new Error("The executable failed to finish within the timeout specified."));
        }, this.timeoutMillis);
        child.on("close", (code) => {
          clearTimeout(timeout);
          if (code === 0) {
            try {
              const responseJson = JSON.parse(output);
              const response = new executable_response_1.ExecutableResponse(responseJson);
              return resolve(response);
            } catch (error) {
              if (error instanceof executable_response_1.ExecutableResponseError) {
                return reject(error);
              }
              return reject(new executable_response_1.ExecutableResponseError(`The executable returned an invalid response: ${output}`));
            }
          } else {
            return reject(new ExecutableError(output, code.toString()));
          }
        });
      });
    }
    /**
     * Checks user provided output file for response from previous run of
     * executable and return the response if it exists, is formatted correctly, and is not expired.
     */
    async retrieveCachedResponse() {
      if (!this.outputFile || this.outputFile.length === 0) {
        return void 0;
      }
      let filePath;
      try {
        filePath = await fs.promises.realpath(this.outputFile);
      } catch {
        return void 0;
      }
      if (!(await fs.promises.lstat(filePath)).isFile()) {
        return void 0;
      }
      const responseString = await fs.promises.readFile(filePath, {
        encoding: "utf8"
      });
      if (responseString === "") {
        return void 0;
      }
      try {
        const responseJson = JSON.parse(responseString);
        const response = new executable_response_1.ExecutableResponse(responseJson);
        if (response.isValid()) {
          return new executable_response_1.ExecutableResponse(responseJson);
        }
        return void 0;
      } catch (error) {
        if (error instanceof executable_response_1.ExecutableResponseError) {
          throw error;
        }
        throw new executable_response_1.ExecutableResponseError(`The output file contained an invalid response: ${responseString}`);
      }
    }
    /**
     * Parses given command string into component array, splitting on spaces unless
     * spaces are between quotation marks.
     */
    static parseCommand(command) {
      const components = command.match(/(?:[^\s"]+|"[^"]*")+/g);
      if (!components) {
        throw new Error(`Provided command: "${command}" could not be parsed.`);
      }
      for (let i = 0; i < components.length; i++) {
        if (components[i][0] === '"' && components[i].slice(-1) === '"') {
          components[i] = components[i].slice(1, -1);
        }
      }
      return components;
    }
  }
  pluggableAuthHandler$2.PluggableAuthHandler = PluggableAuthHandler;
  return pluggableAuthHandler$2;
}
var hasRequiredPluggableAuthClient$2;
function requirePluggableAuthClient$2() {
  if (hasRequiredPluggableAuthClient$2) return pluggableAuthClient$2;
  hasRequiredPluggableAuthClient$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluggableAuthClient = exports.ExecutableError = void 0;
    const baseexternalclient_1 = requireBaseexternalclient$2();
    const executable_response_1 = requireExecutableResponse$2();
    const pluggable_auth_handler_1 = requirePluggableAuthHandler$2();
    var pluggable_auth_handler_2 = requirePluggableAuthHandler$2();
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: function() {
      return pluggable_auth_handler_2.ExecutableError;
    } });
    const DEFAULT_EXECUTABLE_TIMEOUT_MILLIS = 30 * 1e3;
    const MINIMUM_EXECUTABLE_TIMEOUT_MILLIS = 5 * 1e3;
    const MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS = 120 * 1e3;
    const GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES";
    const MAXIMUM_EXECUTABLE_VERSION = 1;
    class PluggableAuthClient extends baseexternalclient_1.BaseExternalAccountClient {
      /**
       * The command used to retrieve the third party token.
       */
      command;
      /**
       * The timeout in milliseconds for running executable,
       * set to default if none provided.
       */
      timeoutMillis;
      /**
       * The path to file to check for cached executable response.
       */
      outputFile;
      /**
       * Executable and output file handler.
       */
      handler;
      /**
       * Instantiates a PluggableAuthClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * An error is thrown if the credential is not a valid pluggable auth credential.
       * @param options The external account options object typically loaded from
       *   the external account JSON credential file.
       */
      constructor(options2) {
        super(options2);
        if (!options2.credential_source.executable) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        this.command = options2.credential_source.executable.command;
        if (!this.command) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        if (options2.credential_source.executable.timeout_millis === void 0) {
          this.timeoutMillis = DEFAULT_EXECUTABLE_TIMEOUT_MILLIS;
        } else {
          this.timeoutMillis = options2.credential_source.executable.timeout_millis;
          if (this.timeoutMillis < MINIMUM_EXECUTABLE_TIMEOUT_MILLIS || this.timeoutMillis > MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS) {
            throw new Error(`Timeout must be between ${MINIMUM_EXECUTABLE_TIMEOUT_MILLIS} and ${MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS} milliseconds.`);
          }
        }
        this.outputFile = options2.credential_source.executable.output_file;
        this.handler = new pluggable_auth_handler_1.PluggableAuthHandler({
          command: this.command,
          timeoutMillis: this.timeoutMillis,
          outputFile: this.outputFile
        });
        this.credentialSourceType = "executable";
      }
      /**
       * Triggered when an external subject token is needed to be exchanged for a
       * GCP access token via GCP STS endpoint.
       * This uses the `options.credential_source` object to figure out how
       * to retrieve the token using the current environment. In this case,
       * this calls a user provided executable which returns the subject token.
       * The logic is summarized as:
       * 1. Validated that the executable is allowed to run. The
       *    GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment must be set to
       *    1 for security reasons.
       * 2. If an output file is specified by the user, check the file location
       *    for a response. If the file exists and contains a valid response,
       *    return the subject token from the file.
       * 3. Call the provided executable and return response.
       * @return A promise that resolves with the external subject token.
       */
      async retrieveSubjectToken() {
        if (process.env[GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES] !== "1") {
          throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
        }
        let executableResponse2 = void 0;
        if (this.outputFile) {
          executableResponse2 = await this.handler.retrieveCachedResponse();
        }
        if (!executableResponse2) {
          const envMap = /* @__PURE__ */ new Map();
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0");
          if (this.outputFile) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
          }
          const serviceAccountEmail = this.getServiceAccountEmail();
          if (serviceAccountEmail) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", serviceAccountEmail);
          }
          executableResponse2 = await this.handler.retrieveResponseFromExecutable(envMap);
        }
        if (executableResponse2.version > MAXIMUM_EXECUTABLE_VERSION) {
          throw new Error(`Version of executable is not currently supported, maximum supported version is ${MAXIMUM_EXECUTABLE_VERSION}.`);
        }
        if (!executableResponse2.success) {
          throw new pluggable_auth_handler_1.ExecutableError(executableResponse2.errorMessage, executableResponse2.errorCode);
        }
        if (this.outputFile) {
          if (!executableResponse2.expirationTime) {
            throw new executable_response_1.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.");
          }
        }
        if (executableResponse2.isExpired()) {
          throw new Error("Executable response is expired.");
        }
        return executableResponse2.subjectToken;
      }
    }
    exports.PluggableAuthClient = PluggableAuthClient;
  })(pluggableAuthClient$2);
  return pluggableAuthClient$2;
}
var hasRequiredExternalclient$2;
function requireExternalclient$2() {
  if (hasRequiredExternalclient$2) return externalclient$2;
  hasRequiredExternalclient$2 = 1;
  Object.defineProperty(externalclient$2, "__esModule", { value: true });
  externalclient$2.ExternalAccountClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient$2();
  const identitypoolclient_1 = requireIdentitypoolclient$2();
  const awsclient_1 = requireAwsclient$2();
  const pluggable_auth_client_1 = requirePluggableAuthClient$2();
  class ExternalAccountClient {
    constructor() {
      throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()");
    }
    /**
     * This static method will instantiate the
     * corresponding type of external account credential depending on the
     * underlying credential source.
     *
     * **IMPORTANT**: This method does not validate the credential configuration.
     * A security risk occurs when a credential configuration configured with
     * malicious URLs is used. When the credential configuration is accepted from
     * an untrusted source, you should validate it before using it with this
     * method. For more details, see
     * https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
     *
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     * @return A BaseExternalAccountClient instance or null if the options
     *   provided do not correspond to an external account credential.
     */
    static fromJSON(options2) {
      if (options2 && options2.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
        if (options2.credential_source?.environment_id) {
          return new awsclient_1.AwsClient(options2);
        } else if (options2.credential_source?.executable) {
          return new pluggable_auth_client_1.PluggableAuthClient(options2);
        } else {
          return new identitypoolclient_1.IdentityPoolClient(options2);
        }
      } else {
        return null;
      }
    }
  }
  externalclient$2.ExternalAccountClient = ExternalAccountClient;
  return externalclient$2;
}
var externalAccountAuthorizedUserClient$2 = {};
var hasRequiredExternalAccountAuthorizedUserClient$2;
function requireExternalAccountAuthorizedUserClient$2() {
  if (hasRequiredExternalAccountAuthorizedUserClient$2) return externalAccountAuthorizedUserClient$2;
  hasRequiredExternalAccountAuthorizedUserClient$2 = 1;
  Object.defineProperty(externalAccountAuthorizedUserClient$2, "__esModule", { value: true });
  externalAccountAuthorizedUserClient$2.ExternalAccountAuthorizedUserClient = externalAccountAuthorizedUserClient$2.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
  const authclient_1 = requireAuthclient$2();
  const oauth2common_1 = requireOauth2common$2();
  const gaxios_1 = requireSrc$3();
  const stream = require$$0$5;
  const baseexternalclient_1 = requireBaseexternalclient$2();
  externalAccountAuthorizedUserClient$2.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
  const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/oauthtoken";
  class ExternalAccountAuthorizedUserHandler extends oauth2common_1.OAuthClientAuthHandler {
    #tokenRefreshEndpoint;
    /**
     * Initializes an ExternalAccountAuthorizedUserHandler instance.
     * @param url The URL of the token refresh endpoint.
     * @param transporter The transporter to use for the refresh request.
     * @param clientAuthentication The client authentication credentials to use
     *   for the refresh request.
     */
    constructor(options2) {
      super(options2);
      this.#tokenRefreshEndpoint = options2.tokenRefreshEndpoint;
    }
    /**
     * Requests a new access token from the token_url endpoint using the provided
     *   refresh token.
     * @param refreshToken The refresh token to use to generate a new access token.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @return A promise that resolves with the token refresh response containing
     *   the requested access token and its expiration time.
     */
    async refreshToken(refreshToken, headers) {
      const opts = {
        ...ExternalAccountAuthorizedUserHandler.RETRY_CONFIG,
        url: this.#tokenRefreshEndpoint,
        method: "POST",
        headers,
        data: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken
        }),
        responseType: "json"
      };
      authclient_1.AuthClient.setMethodName(opts, "refreshToken");
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const tokenRefreshResponse = response.data;
        tokenRefreshResponse.res = response;
        return tokenRefreshResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  class ExternalAccountAuthorizedUserClient extends authclient_1.AuthClient {
    cachedAccessToken;
    externalAccountAuthorizedUserHandler;
    refreshToken;
    /**
     * Instantiates an ExternalAccountAuthorizedUserClient instances using the
     * provided JSON object loaded from a credentials files.
     * An error is throws if the credential is not valid.
     * @param options The external account authorized user option object typically
     *   from the external accoutn authorized user JSON credential file.
     */
    constructor(options2) {
      super(options2);
      if (options2.universe_domain) {
        this.universeDomain = options2.universe_domain;
      }
      this.refreshToken = options2.refresh_token;
      const clientAuthentication = {
        confidentialClientType: "basic",
        clientId: options2.client_id,
        clientSecret: options2.client_secret
      };
      this.externalAccountAuthorizedUserHandler = new ExternalAccountAuthorizedUserHandler({
        tokenRefreshEndpoint: options2.token_url ?? DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain),
        transporter: this.transporter,
        clientAuthentication
      });
      this.cachedAccessToken = null;
      this.quotaProjectId = options2.quota_project_id;
      if (typeof options2?.eagerRefreshThresholdMillis !== "number") {
        this.eagerRefreshThresholdMillis = baseexternalclient_1.EXPIRATION_TIME_OFFSET;
      } else {
        this.eagerRefreshThresholdMillis = options2.eagerRefreshThresholdMillis;
      }
      this.forceRefreshOnFailure = !!options2?.forceRefreshOnFailure;
    }
    async getAccessToken() {
      if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
        await this.refreshAccessTokenAsync();
      }
      return {
        token: this.cachedAccessToken.access_token,
        res: this.cachedAccessToken.res
      };
    }
    async getRequestHeaders() {
      const accessTokenResponse = await this.getAccessToken();
      const headers = new Headers({
        authorization: `Bearer ${accessTokenResponse.token}`
      });
      return this.addSharedMetadataHeaders(headers);
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    /**
     * Authenticates the provided HTTP request, processes it and resolves with the
     * returned response.
     * @param opts The HTTP request options.
     * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
     * @return A promise that resolves with the successful response.
     */
    async requestAsync(opts, reAuthRetried = false) {
      let response;
      try {
        const requestHeaders = await this.getRequestHeaders();
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
        response = await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
            await this.refreshAccessTokenAsync();
            return await this.requestAsync(opts, true);
          }
        }
        throw e;
      }
      return response;
    }
    /**
     * Forces token refresh, even if unexpired tokens are currently cached.
     * @return A promise that resolves with the refreshed credential.
     */
    async refreshAccessTokenAsync() {
      const refreshResponse = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
      this.cachedAccessToken = {
        access_token: refreshResponse.access_token,
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + refreshResponse.expires_in * 1e3,
        res: refreshResponse.res
      };
      if (refreshResponse.refresh_token !== void 0) {
        this.refreshToken = refreshResponse.refresh_token;
      }
      return this.cachedAccessToken;
    }
    /**
     * Returns whether the provided credentials are expired or not.
     * If there is no expiry time, assumes the token is not expired or expiring.
     * @param credentials The credentials to check for expiration.
     * @return Whether the credentials are expired or not.
     */
    isExpired(credentials) {
      const now = (/* @__PURE__ */ new Date()).getTime();
      return credentials.expiry_date ? now >= credentials.expiry_date - this.eagerRefreshThresholdMillis : false;
    }
  }
  externalAccountAuthorizedUserClient$2.ExternalAccountAuthorizedUserClient = ExternalAccountAuthorizedUserClient;
  return externalAccountAuthorizedUserClient$2;
}
var gdchclient = {};
var hasRequiredGdchclient;
function requireGdchclient() {
  if (hasRequiredGdchclient) return gdchclient;
  hasRequiredGdchclient = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GdchClient = exports.GDCH_SERVICE_ACCOUNT_TYPE = void 0;
    const crypto2 = require$$0$2;
    const fs = require$$0$3;
    const https = require$$1$2;
    const oauth2client_1 = requireOauth2client$2();
    const DEFAULT_LIFETIME_IN_SECONDS = 3600;
    exports.GDCH_SERVICE_ACCOUNT_TYPE = "gdch_service_account";
    class GdchClient extends oauth2client_1.OAuth2Client {
      projectId;
      privateKeyId;
      privateKey;
      serviceIdentityName;
      tokenServerUri;
      caCertPath;
      apiAudience;
      lifetime;
      gdchOptions;
      caAgentPromise;
      cachedCaCertPath;
      lastCaCertReadTime = 0;
      CA_CERT_TTL_MS = 5 * 60 * 1e3;
      constructor(options2 = {}) {
        super(options2);
        this.gdchOptions = options2;
        this.projectId = options2.projectId || void 0;
        this.privateKeyId = options2.privateKeyId;
        this.privateKey = options2.privateKey;
        this.serviceIdentityName = options2.serviceIdentityName;
        this.tokenServerUri = options2.tokenServerUri;
        this.caCertPath = options2.caCertPath;
        this.apiAudience = options2.apiAudience;
        this.lifetime = options2.lifetime || DEFAULT_LIFETIME_IN_SECONDS;
        this.credentials = { refresh_token: "gdch-placeholder", expiry_date: 1 };
      }
      createWithGdchAudience(apiAudience) {
        if (!apiAudience) {
          throw new Error("Audience cannot be null or empty for GDCH service account credentials.");
        }
        return new GdchClient({
          ...this.gdchOptions,
          projectId: this.projectId,
          privateKeyId: this.privateKeyId,
          privateKey: this.privateKey,
          serviceIdentityName: this.serviceIdentityName,
          tokenServerUri: this.tokenServerUri,
          caCertPath: this.caCertPath,
          lifetime: this.lifetime,
          apiAudience
        });
      }
      fromJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing the GDCH credentials settings.");
        }
        if (json.type !== exports.GDCH_SERVICE_ACCOUNT_TYPE) {
          throw new Error(`The incoming JSON object does not have the "${exports.GDCH_SERVICE_ACCOUNT_TYPE}" type`);
        }
        if (json.format_version !== "1") {
          throw new Error("Only format version 1 is supported.");
        }
        if (!json.project) {
          throw new Error("The incoming JSON object does not contain a project field");
        }
        if (!json.private_key_id) {
          throw new Error("The incoming JSON object does not contain a private_key_id field");
        }
        if (!json.private_key) {
          throw new Error("The incoming JSON object does not contain a private_key field");
        }
        if (!json.name) {
          throw new Error("The incoming JSON object does not contain a name field");
        }
        if (!json.token_uri) {
          throw new Error("The incoming JSON object does not contain a token_uri field");
        }
        this.projectId = json.project;
        this.privateKeyId = json.private_key_id;
        this.privateKey = json.private_key;
        this.serviceIdentityName = json.name;
        this.tokenServerUri = json.token_uri;
        this.caCertPath = json.ca_cert_path;
        this.gdchOptions = {
          ...this.gdchOptions,
          projectId: json.project,
          privateKeyId: json.private_key_id,
          privateKey: json.private_key,
          serviceIdentityName: json.name,
          tokenServerUri: json.token_uri,
          caCertPath: json.ca_cert_path
        };
      }
      async refreshTokenNoCache() {
        if (!this.apiAudience) {
          throw new Error("Audience cannot be null or empty for GDCH service account credentials. Specify the audience by calling createWithGdchAudience.");
        }
        if (!this.privateKey) {
          throw new Error("Private key is not configured for GDCH credentials.");
        }
        if (!this.privateKeyId) {
          throw new Error("Private key ID is not configured for GDCH credentials.");
        }
        if (!this.projectId) {
          throw new Error("Project is not configured for GDCH credentials.");
        }
        if (!this.serviceIdentityName) {
          throw new Error("Service identity name is not configured for GDCH credentials.");
        }
        if (!this.tokenServerUri) {
          throw new Error("Token server URI is not configured for GDCH credentials.");
        }
        const assertion = this.createAssertion();
        const data = {
          audience: this.apiAudience,
          grant_type: "urn:ietf:params:oauth:token-type:token-exchange",
          requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
          subject_token: assertion,
          subject_token_type: "urn:k8s:params:oauth:token-type:serviceaccount"
        };
        const requestOpts = {
          url: this.tokenServerUri,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          data,
          responseType: "json",
          timeout: 1e4,
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["POST"],
            statusCodesToRetry: [[500, 599]],
            noResponseRetries: 3
          }
        };
        if (this.caCertPath) {
          requestOpts.agent = await this.getCaAgent();
        }
        try {
          const res = await this.transporter.request(requestOpts);
          const tokenResponse = res.data;
          if (!tokenResponse.access_token) {
            throw new Error("Token response did not contain an access_token.");
          }
          if (!tokenResponse.expires_in) {
            throw new Error("Token response did not contain an expires_in field.");
          }
          const tokens = {
            access_token: tokenResponse.access_token,
            token_type: "STS-Bearer",
            expiry_date: Date.now() + tokenResponse.expires_in * 1e3
          };
          this.emit("tokens", tokens);
          return { res, tokens };
        } catch (e) {
          if (e && e.config && e.config.data) {
            try {
              if (typeof e.config.data === "string") {
                const parsedData = JSON.parse(e.config.data);
                if (parsedData.subject_token) {
                  parsedData.subject_token = "***REDACTED***";
                  e.config.data = JSON.stringify(parsedData);
                }
              } else if (typeof e.config.data === "object" && e.config.data.subject_token) {
                e.config.data.subject_token = "***REDACTED***";
              }
            } catch {
            }
          }
          if (e instanceof Error) {
            e.message = `Error getting access token for GDCH service account: ${e.message}, iss: ${this.serviceIdentityName}`;
          }
          throw e;
        }
      }
      createAssertion() {
        const header = {
          alg: "ES256",
          typ: "JWT",
          kid: this.privateKeyId
        };
        const issSub = `system:serviceaccount:${this.projectId}:${this.serviceIdentityName}`;
        const currentTime = Math.floor(Date.now() / 1e3);
        const payload = {
          iss: issSub,
          sub: issSub,
          iat: currentTime,
          exp: currentTime + this.lifetime,
          aud: this.tokenServerUri
        };
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
        const signingInput = `${encodedHeader}.${encodedPayload}`;
        const signature = crypto2.sign("sha256", Buffer.from(signingInput), {
          key: this.privateKey,
          dsaEncoding: "ieee-p1363"
        });
        const encodedSignature = this.base64UrlEncode(signature);
        return `${signingInput}.${encodedSignature}`;
      }
      async requestAsync(opts, retry = false) {
        if (this.caCertPath && !opts.agent) {
          const url = (opts.url || "").toString();
          if (!url.includes("googleapis.com") && !url.includes("google.com")) {
            opts.agent = await this.getCaAgent();
          }
        }
        return super.requestAsync(opts, retry);
      }
      getCaAgent() {
        if (!this.caCertPath) {
          this.caAgentPromise = void 0;
          this.cachedCaCertPath = void 0;
          this.lastCaCertReadTime = 0;
          return void 0;
        }
        const now = Date.now();
        const isCacheExpired = now - this.lastCaCertReadTime > this.CA_CERT_TTL_MS;
        if (this.caAgentPromise && this.caCertPath === this.cachedCaCertPath && !isCacheExpired) {
          return this.caAgentPromise;
        }
        this.cachedCaCertPath = this.caCertPath;
        this.lastCaCertReadTime = now;
        const currentPath = this.caCertPath;
        this.caAgentPromise = (async () => {
          try {
            const ca = await fs.promises.readFile(currentPath);
            return new https.Agent({ ca });
          } catch (err) {
            if (this.cachedCaCertPath === currentPath) {
              this.caAgentPromise = void 0;
              this.cachedCaCertPath = void 0;
              this.lastCaCertReadTime = 0;
            }
            if (err instanceof Error) {
              err.message = `Error reading certificate file from CA cert path, value '${currentPath}': ${err.message}`;
            }
            throw err;
          }
        })();
        return this.caAgentPromise;
      }
      toJSON() {
        return {
          ...this,
          privateKey: this.privateKey ? "***REDACTED***" : void 0,
          _clientSecret: this._clientSecret ? "***REDACTED***" : void 0,
          apiKey: this.apiKey ? "***REDACTED***" : void 0,
          gdchOptions: this.gdchOptions ? {
            ...this.gdchOptions,
            privateKey: this.gdchOptions.privateKey ? "***REDACTED***" : void 0,
            clientSecret: this.gdchOptions.clientSecret ? "***REDACTED***" : void 0,
            client_secret: this.gdchOptions.client_secret ? "***REDACTED***" : void 0,
            apiKey: this.gdchOptions.apiKey ? "***REDACTED***" : void 0,
            credentials: this.gdchOptions.credentials ? {
              ...this.gdchOptions.credentials,
              access_token: this.gdchOptions.credentials.access_token ? "***REDACTED***" : void 0,
              refresh_token: this.gdchOptions.credentials.refresh_token ? "***REDACTED***" : void 0
            } : void 0
          } : void 0,
          credentials: {
            ...this.credentials,
            access_token: this.credentials?.access_token ? "***REDACTED***" : void 0,
            refresh_token: this.credentials?.refresh_token ? "***REDACTED***" : void 0
          }
        };
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        return this.toJSON();
      }
      base64UrlEncode(str) {
        const buffer = typeof str === "string" ? Buffer.from(str) : str;
        return buffer.toString("base64url");
      }
    }
    exports.GdchClient = GdchClient;
  })(gdchclient);
  return gdchclient;
}
var hasRequiredGoogleauth$2;
function requireGoogleauth$2() {
  if (hasRequiredGoogleauth$2) return googleauth$2;
  hasRequiredGoogleauth$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.GoogleAuthExceptionMessages = void 0;
    const child_process_1 = require$$1$3;
    const fs = require$$0$3;
    const gaxios_1 = requireSrc$3();
    const gcpMetadata = requireSrc$5();
    const os = require$$1;
    const path = require$$5;
    const crypto_1 = requireCrypto$6();
    const computeclient_1 = requireComputeclient$2();
    const idtokenclient_1 = requireIdtokenclient$2();
    const envDetect_1 = requireEnvDetect$2();
    const jwtclient_1 = requireJwtclient$2();
    const refreshclient_1 = requireRefreshclient$2();
    const impersonated_1 = requireImpersonated$2();
    const externalclient_1 = requireExternalclient$2();
    const baseexternalclient_1 = requireBaseexternalclient$2();
    const authclient_1 = requireAuthclient$2();
    const externalAccountAuthorizedUserClient_1 = requireExternalAccountAuthorizedUserClient$2();
    const gdchclient_1 = requireGdchclient();
    const util_1 = requireUtil$2();
    exports.GoogleAuthExceptionMessages = {
      API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
      NO_PROJECT_ID_FOUND: "Unable to detect a Project Id in the current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_CREDENTIALS_FOUND: "Unable to find credentials in current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
      NO_UNIVERSE_DOMAIN_FOUND: "Unable to detect a Universe Domain in the current environment.\nTo learn more about Universe Domain retrieval, visit: \nhttps://cloud.google.com/compute/docs/metadata/predefined-metadata-keys"
    };
    class GoogleAuth {
      /**
       * Caches a value indicating whether the auth layer is running on Google
       * Compute Engine.
       * @private
       */
      checkIsGCE = void 0;
      useJWTAccessWithScope;
      defaultServicePath;
      // Note:  this properly is only public to satisfy unit tests.
      // https://github.com/Microsoft/TypeScript/issues/5228
      get isGCE() {
        return this.checkIsGCE;
      }
      _findProjectIdPromise;
      _cachedProjectId;
      // To save the contents of the JSON credential file
      jsonContent = null;
      apiKey;
      cachedCredential = null;
      /**
       * A pending {@link AuthClient}. Used for concurrent {@link GoogleAuth.getClient} calls.
       */
      #pendingAuthClient = null;
      /**
       * Scopes populated by the client library by default. We differentiate between
       * these and user defined scopes when deciding whether to use a self-signed JWT.
       */
      defaultScopes;
      keyFilename;
      scopes;
      clientOptions = {};
      /**
       * Configuration is resolved in the following order of precedence:
       * - {@link GoogleAuthOptions.credentials `credentials`}
       * - {@link GoogleAuthOptions.keyFilename `keyFilename`}
       * - {@link GoogleAuthOptions.keyFile `keyFile`}
       *
       * {@link GoogleAuthOptions.clientOptions `clientOptions`} are passed to the
       * {@link AuthClient `AuthClient`s}.
       *
       * @param opts
       */
      constructor(opts = {}) {
        this._cachedProjectId = opts.projectId || null;
        this.cachedCredential = opts.authClient || null;
        this.keyFilename = opts.keyFilename || opts.keyFile;
        this.scopes = opts.scopes;
        this.clientOptions = opts.clientOptions || {};
        this.jsonContent = opts.credentials || null;
        this.apiKey = opts.apiKey || this.clientOptions.apiKey || null;
        if (this.apiKey && (this.jsonContent || this.clientOptions.credentials)) {
          throw new RangeError(exports.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
        }
        if (opts.universeDomain) {
          this.clientOptions.universeDomain = opts.universeDomain;
        }
      }
      // GAPIC client libraries should always use self-signed JWTs. The following
      // variables are set on the JWT client in order to indicate the type of library,
      // and sign the JWT with the correct audience and scopes (if not supplied).
      setGapicJWTValues(client) {
        client.defaultServicePath = this.defaultServicePath;
        client.useJWTAccessWithScope = this.useJWTAccessWithScope;
        client.defaultScopes = this.defaultScopes;
      }
      getProjectId(callback) {
        if (callback) {
          this.getProjectIdAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getProjectIdAsync();
        }
      }
      /**
       * A temporary method for internal `getProjectId` usages where `null` is
       * acceptable. In a future major release, `getProjectId` should return `null`
       * (as the `Promise<string | null>` base signature describes) and this private
       * method should be removed.
       *
       * @returns Promise that resolves with project id (or `null`)
       */
      async getProjectIdOptional() {
        try {
          return await this.getProjectId();
        } catch (e) {
          if (e instanceof Error && e.message === exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) {
            return null;
          } else {
            throw e;
          }
        }
      }
      /**
       * A private method for finding and caching a projectId.
       *
       * Supports environments in order of precedence:
       * - GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variable
       * - GOOGLE_APPLICATION_CREDENTIALS JSON file
       * - Cloud SDK: `gcloud config config-helper --format json`
       * - GCE project ID from metadata server
       *
       * @returns projectId
       */
      async findAndCacheProjectId() {
        let projectId = null;
        projectId ||= await this.getProductionProjectId();
        projectId ||= await this.getFileProjectId();
        projectId ||= await this.getDefaultServiceProjectId();
        projectId ||= await this.getGCEProjectId();
        projectId ||= await this.getExternalAccountClientProjectId();
        if (projectId) {
          this._cachedProjectId = projectId;
          return projectId;
        } else {
          throw new Error(exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND);
        }
      }
      async getProjectIdAsync() {
        if (this._cachedProjectId) {
          return this._cachedProjectId;
        }
        if (!this._findProjectIdPromise) {
          this._findProjectIdPromise = this.findAndCacheProjectId();
        }
        return this._findProjectIdPromise;
      }
      /**
       * Retrieves a universe domain from the metadata server via
       * {@link gcpMetadata.universe}.
       *
       * @returns a universe domain
       */
      async getUniverseDomainFromMetadataServer() {
        let universeDomain;
        try {
          universeDomain = await gcpMetadata.universe("universe-domain");
          universeDomain ||= authclient_1.DEFAULT_UNIVERSE;
        } catch (e) {
          if (e && e?.response?.status === 404) {
            universeDomain = authclient_1.DEFAULT_UNIVERSE;
          } else {
            throw e;
          }
        }
        return universeDomain;
      }
      /**
       * Retrieves, caches, and returns the universe domain in the following order
       * of precedence:
       * - The universe domain in {@link GoogleAuth.clientOptions}
       * - An existing or ADC {@link AuthClient}'s universe domain
       * - {@link gcpMetadata.universe}, if {@link Compute} client
       *
       * @returns The universe domain
       */
      async getUniverseDomain() {
        let universeDomain = (0, util_1.originalOrCamelOptions)(this.clientOptions).get("universe_domain");
        try {
          universeDomain ??= (await this.getClient()).universeDomain;
        } catch {
          universeDomain ??= authclient_1.DEFAULT_UNIVERSE;
        }
        return universeDomain;
      }
      /**
       * @returns Any scopes (user-specified or default scopes specified by the
       *   client library) that need to be set on the current Auth client.
       */
      getAnyScopes() {
        return this.scopes || this.defaultScopes;
      }
      getApplicationDefault(optionsOrCallback = {}, callback) {
        let options2;
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.getApplicationDefaultAsync(options2).then((r) => callback(null, r.credential, r.projectId), callback);
        } else {
          return this.getApplicationDefaultAsync(options2);
        }
      }
      async getApplicationDefaultAsync(options2 = {}) {
        if (this.cachedCredential) {
          return await this.#prepareAndCacheClient(this.cachedCredential, null);
        }
        let credential;
        credential = await this._tryGetApplicationCredentialsFromEnvironmentVariable(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await this.#prepareAndCacheClient(credential);
        }
        credential = await this._tryGetApplicationCredentialsFromWellKnownFile(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await this.#prepareAndCacheClient(credential);
        }
        if (await this._checkIsGCE()) {
          options2.scopes = this.getAnyScopes();
          return await this.#prepareAndCacheClient(new computeclient_1.Compute(options2));
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_ADC_FOUND);
      }
      async #prepareAndCacheClient(credential, quotaProjectIdOverride = process.env["GOOGLE_CLOUD_QUOTA_PROJECT"] || null) {
        const projectId = await this.getProjectIdOptional();
        if (quotaProjectIdOverride) {
          credential.quotaProjectId = quotaProjectIdOverride;
        }
        this.cachedCredential = credential;
        return { credential, projectId };
      }
      /**
       * Determines whether the auth layer is running on Google Compute Engine.
       * Checks for GCP Residency, then fallback to checking if metadata server
       * is available.
       *
       * @returns A promise that resolves with the boolean.
       * @api private
       */
      async _checkIsGCE() {
        if (this.checkIsGCE === void 0) {
          this.checkIsGCE = gcpMetadata.getGCPResidency() || await gcpMetadata.isAvailable();
        }
        return this.checkIsGCE;
      }
      /**
       * Attempts to load default credentials from the environment variable path..
       * @returns Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromEnvironmentVariable(options2) {
        const credentialsPath = process.env["GOOGLE_APPLICATION_CREDENTIALS"] || process.env["google_application_credentials"];
        if (!credentialsPath || credentialsPath.length === 0) {
          return null;
        }
        try {
          return this._getApplicationCredentialsFromFilePath(credentialsPath, options2);
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${e.message}`;
          }
          throw e;
        }
      }
      /**
       * Attempts to load default credentials from a well-known file location
       * @return Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromWellKnownFile(options2) {
        let location = null;
        if (this._isWindows()) {
          location = process.env["APPDATA"];
        } else {
          const home = process.env["HOME"];
          if (home) {
            location = path.join(home, ".config");
          }
        }
        if (location) {
          location = path.join(location, "gcloud", "application_default_credentials.json");
          if (!fs.existsSync(location)) {
            location = null;
          }
        }
        if (!location) {
          return null;
        }
        const client = await this._getApplicationCredentialsFromFilePath(location, options2);
        return client;
      }
      /**
       * Attempts to load default credentials from a file at the given path..
       * @param filePath The path to the file to read.
       * @returns Promise that resolves with the OAuth2Client
       * @api private
       */
      async _getApplicationCredentialsFromFilePath(filePath, options2 = {}) {
        if (!filePath || filePath.length === 0) {
          throw new Error("The file path is invalid.");
        }
        try {
          filePath = fs.realpathSync(filePath);
          if (!fs.lstatSync(filePath).isFile()) {
            throw new Error();
          }
        } catch (err) {
          if (err instanceof Error) {
            err.message = `The file at ${filePath} does not exist, or it is not a file. ${err.message}`;
          }
          throw err;
        }
        const readStream = fs.createReadStream(filePath);
        return this.fromStream(readStream, options2);
      }
      /**
       * Create a credentials instance using a given impersonated input options.
       * @param json The impersonated input object.
       * @returns JWT or UserRefresh Client with data
       */
      fromImpersonatedJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
        }
        if (json.type !== impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          throw new Error(`The incoming JSON object does not have the "${impersonated_1.IMPERSONATED_ACCOUNT_TYPE}" type`);
        }
        if (!json.source_credentials) {
          throw new Error("The incoming JSON object does not contain a source_credentials field");
        }
        if (!json.service_account_impersonation_url) {
          throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
        }
        const sourceClient = this.fromJSON(json.source_credentials);
        if (json.service_account_impersonation_url?.length > 256) {
          throw new RangeError(`Target principal is too long: ${json.service_account_impersonation_url}`);
        }
        const targetPrincipal = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(json.service_account_impersonation_url)?.groups?.target;
        if (!targetPrincipal) {
          throw new RangeError(`Cannot extract target principal from ${json.service_account_impersonation_url}`);
        }
        const targetScopes = (this.scopes || json.scopes || this.defaultScopes) ?? [];
        return new impersonated_1.Impersonated({
          ...json,
          sourceClient,
          targetPrincipal,
          targetScopes: Array.isArray(targetScopes) ? targetScopes : [targetScopes]
        });
      }
      /**
       * Create a credentials instance using the given input options.
       * This client is not cached.
       *
       * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
       *
       * @deprecated This method is being deprecated because of a potential security risk.
       *
       * This method does not validate the credential configuration. The security
       * risk occurs when a credential configuration is accepted from a source that
       * is not under your control and used without validation on your side.
       *
       * If you know that you will be loading credential configurations of a
       * specific type, it is recommended to use a credential-type-specific
       * constructor. This will ensure that an unexpected credential type with
       * potential for malicious intent is not loaded unintentionally. You might
       * still have to do validation for certain credential types. Please follow
       * the recommendation for that method. For example, if you want to load only
       * service accounts, you can use the `JWT` constructor:
       * ```
       * const {JWT} = require('google-auth-library');
       * const keys = require('/path/to/key.json');
       * const client = new JWT({
       *   email: keys.client_email,
       *   key: keys.private_key,
       *   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
       * });
       * ```
       *
       * If you are loading your credential configuration from an untrusted source and have
       * not mitigated the risks (e.g. by validating the configuration yourself), make
       * these changes as soon as possible to prevent security risks to your environment.
       *
       * Regardless of the method used, it is always your responsibility to validate
       * configurations received from external sources.
       *
       * For more details, see https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
       *
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      fromJSON(json, options2 = {}) {
        let client;
        const preferredUniverseDomain = (0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
        if (json.type === refreshclient_1.USER_REFRESH_ACCOUNT_TYPE) {
          client = new refreshclient_1.UserRefreshClient(options2);
          client.fromJSON(json);
        } else if (json.type === impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          client = this.fromImpersonatedJSON(json);
        } else if (json.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          client = externalclient_1.ExternalAccountClient.fromJSON({
            ...json,
            ...options2
          });
          client.scopes = this.getAnyScopes();
        } else if (json.type === externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) {
          client = new externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient({
            ...json,
            ...options2
          });
        } else if (json.type === gdchclient_1.GDCH_SERVICE_ACCOUNT_TYPE) {
          client = new gdchclient_1.GdchClient(options2);
          client.fromJSON(json);
        } else {
          options2.scopes = this.scopes;
          client = new jwtclient_1.JWT(options2);
          this.setGapicJWTValues(client);
          client.fromJSON(json);
        }
        if (preferredUniverseDomain) {
          client.universeDomain = preferredUniverseDomain;
        }
        return client;
      }
      /**
       * Return a JWT or UserRefreshClient from JavaScript object, caching both the
       * object used to instantiate and the client.
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      _cacheClientFromJSON(json, options2) {
        const client = this.fromJSON(json, options2);
        this.jsonContent = json;
        this.cachedCredential = client;
        return client;
      }
      fromStream(inputStream, optionsOrCallback = {}, callback) {
        let options2 = {};
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.fromStreamAsync(inputStream, options2).then((r) => callback(null, r), callback);
        } else {
          return this.fromStreamAsync(inputStream, options2);
        }
      }
      fromStreamAsync(inputStream, options2) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            throw new Error("Must pass in a stream containing the Google auth settings.");
          }
          const chunks = [];
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => chunks.push(chunk)).on("end", () => {
            try {
              try {
                const data = JSON.parse(chunks.join(""));
                const r = this._cacheClientFromJSON(data, options2);
                return resolve(r);
              } catch (err) {
                if (!this.keyFilename)
                  throw err;
                const client = new jwtclient_1.JWT({
                  ...this.clientOptions,
                  keyFile: this.keyFilename
                });
                this.cachedCredential = client;
                this.setGapicJWTValues(client);
                return resolve(client);
              }
            } catch (err) {
              return reject(err);
            }
          });
        });
      }
      /**
       * Create a credentials instance using the given API key string.
       * The created client is not cached. In order to create and cache it use the {@link GoogleAuth.getClient `getClient`} method after first providing an {@link GoogleAuth.apiKey `apiKey`}.
       *
       * @param apiKey The API key string
       * @param options An optional options object.
       * @returns A JWT loaded from the key
       */
      fromAPIKey(apiKey, options2 = {}) {
        return new jwtclient_1.JWT({ ...options2, apiKey });
      }
      /**
       * Determines whether the current operating system is Windows.
       * @api private
       */
      _isWindows() {
        const sys = os.platform();
        if (sys && sys.length >= 3) {
          if (sys.substring(0, 3).toLowerCase() === "win") {
            return true;
          }
        }
        return false;
      }
      /**
       * Run the Google Cloud SDK command that prints the default project ID
       */
      async getDefaultServiceProjectId() {
        return new Promise((resolve) => {
          (0, child_process_1.exec)("gcloud config config-helper --format json", (err, stdout) => {
            if (!err && stdout) {
              try {
                const projectId = JSON.parse(stdout).configuration.properties.core.project;
                resolve(projectId);
                return;
              } catch (e) {
              }
            }
            resolve(null);
          });
        });
      }
      /**
       * Loads the project id from environment variables.
       * @api private
       */
      getProductionProjectId() {
        return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || process.env["gcloud_project"] || process.env["google_cloud_project"];
      }
      /**
       * Loads the project id from the GOOGLE_APPLICATION_CREDENTIALS json file.
       * @api private
       */
      async getFileProjectId() {
        if (this.cachedCredential) {
          return this.cachedCredential.projectId;
        }
        if (this.keyFilename) {
          const creds = await this.getClient();
          if (creds && creds.projectId) {
            return creds.projectId;
          }
        }
        const r = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
        if (r) {
          return r.projectId;
        } else {
          return null;
        }
      }
      /**
       * Gets the project ID from external account client if available.
       */
      async getExternalAccountClientProjectId() {
        if (!this.jsonContent || this.jsonContent.type !== baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          return null;
        }
        const creds = await this.getClient();
        return await creds.getProjectId();
      }
      /**
       * Gets the Compute Engine project ID if it can be inferred.
       */
      async getGCEProjectId() {
        try {
          const r = await gcpMetadata.project("project-id");
          return r;
        } catch (e) {
          return null;
        }
      }
      getCredentials(callback) {
        if (callback) {
          this.getCredentialsAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getCredentialsAsync();
        }
      }
      async getCredentialsAsync() {
        const client = await this.getClient();
        if (client instanceof impersonated_1.Impersonated) {
          return { client_email: client.getTargetPrincipal() };
        }
        if (client instanceof baseexternalclient_1.BaseExternalAccountClient) {
          const serviceAccountEmail = client.getServiceAccountEmail();
          if (serviceAccountEmail) {
            return {
              client_email: serviceAccountEmail,
              universe_domain: client.universeDomain
            };
          }
        }
        if (this.jsonContent) {
          return {
            client_email: this.jsonContent.client_email,
            private_key: this.jsonContent.private_key,
            universe_domain: this.jsonContent.universe_domain
          };
        }
        if (await this._checkIsGCE()) {
          const [client_email, universe_domain] = await Promise.all([
            gcpMetadata.instance("service-accounts/default/email"),
            this.getUniverseDomain()
          ]);
          return { client_email, universe_domain };
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND);
      }
      /**
       * Automatically obtain an {@link AuthClient `AuthClient`} based on the
       * provided configuration. If no options were passed, use Application
       * Default Credentials.
       */
      async getClient() {
        if (this.cachedCredential) {
          return this.cachedCredential;
        }
        this.#pendingAuthClient = this.#pendingAuthClient || this.#determineClient();
        try {
          const client = await this.#pendingAuthClient;
          if (client instanceof gdchclient_1.GdchClient && !client.apiAudience) {
            const opts = this.clientOptions;
            const endpoint = opts.apiEndpoint || opts.servicePath;
            if (endpoint) {
              const scheme = endpoint.startsWith("http") ? "" : "https://";
              const formattedAudience = `${scheme}${endpoint}/`.replace(/\/+$/, "/");
              const newClient = client.createWithGdchAudience(formattedAudience);
              this.cachedCredential = newClient;
              return newClient;
            }
          }
          return client;
        } finally {
          this.#pendingAuthClient = null;
        }
      }
      async #determineClient() {
        if (this.jsonContent) {
          return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
        } else if (this.keyFilename) {
          const filePath = path.resolve(this.keyFilename);
          const stream = fs.createReadStream(filePath);
          return await this.fromStreamAsync(stream, this.clientOptions);
        } else if (this.apiKey) {
          const client = await this.fromAPIKey(this.apiKey, this.clientOptions);
          client.scopes = this.scopes;
          const { credential } = await this.#prepareAndCacheClient(client);
          return credential;
        } else {
          const { credential } = await this.getApplicationDefaultAsync(this.clientOptions);
          return credential;
        }
      }
      /**
       * Creates a client which will fetch an ID token for authorization.
       * @param targetAudience the audience for the fetched ID token.
       * @returns IdTokenClient for making HTTP calls authenticated with ID tokens.
       */
      async getIdTokenClient(targetAudience) {
        const client = await this.getClient();
        if (!("fetchIdToken" in client)) {
          throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
        }
        return new idtokenclient_1.IdTokenClient({ targetAudience, idTokenProvider: client });
      }
      /**
       * Automatically obtain application default credentials, and return
       * an access token for making requests.
       */
      async getAccessToken() {
        const client = await this.getClient();
        return (await client.getAccessToken()).token;
      }
      /**
       * Obtain the HTTP headers that will provide authorization for a given
       * request.
       */
      async getRequestHeaders(url) {
        const client = await this.getClient();
        return client.getRequestHeaders(url);
      }
      /**
       * Obtain credentials for a request, then attach the appropriate headers to
       * the request options.
       * @param opts Axios or Request options on which to attach the headers
       */
      async authorizeRequest(opts = {}) {
        const url = opts.url;
        const client = await this.getClient();
        const headers = await client.getRequestHeaders(url);
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers, headers);
        return opts;
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link GoogleAuth}.
       *
       * @see {@link GoogleAuth.request} for the classic method.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const auth = new GoogleAuth();
       * const fetchWithAuth: typeof fetch = (...args) => auth.fetch(...args);
       * await fetchWithAuth('https://example.com');
       * ```
       *
       * @param args `fetch` API or {@link Gaxios.fetch `Gaxios#fetch`} parameters
       * @returns the {@link GaxiosResponse} with Gaxios-added properties
       */
      async fetch(...args) {
        const client = await this.getClient();
        return client.fetch(...args);
      }
      /**
       * Automatically obtain application default credentials, and make an
       * HTTP request using the given options.
       *
       * @see {@link GoogleAuth.fetch} for the modern method.
       *
       * @param opts Axios request options for the HTTP request.
       */
      async request(opts) {
        const client = await this.getClient();
        return client.request(opts);
      }
      /**
       * Determine the compute environment in which the code is running.
       */
      getEnv() {
        return (0, envDetect_1.getEnv)();
      }
      /**
       * Sign the given data with the current private key, or go out
       * to the IAM API to sign it.
       * @param data The data to be signed.
       * @param endpoint A custom endpoint to use.
       *
       * @example
       * ```
       * sign('data', 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/');
       * ```
       */
      async sign(data, endpoint) {
        const client = await this.getClient();
        const universe = await this.getUniverseDomain();
        endpoint = endpoint || `https://iamcredentials.${universe}/v1/projects/-/serviceAccounts/`;
        if (client instanceof impersonated_1.Impersonated) {
          const signed = await client.sign(data);
          return signed.signedBlob;
        }
        const crypto2 = (0, crypto_1.createCrypto)();
        if (client instanceof jwtclient_1.JWT && client.key) {
          const sign = await crypto2.sign(client.key, data);
          return sign;
        }
        const creds = await this.getCredentials();
        if (!creds.client_email) {
          throw new Error("Cannot sign data without `client_email`.");
        }
        return this.signBlob(crypto2, creds.client_email, data, endpoint);
      }
      async signBlob(crypto2, emailOrUniqueId, data, endpoint) {
        const url = new URL(endpoint + `${emailOrUniqueId}:signBlob`);
        const res = await this.request({
          method: "POST",
          url: url.href,
          data: {
            payload: crypto2.encodeBase64StringUtf8(data)
          },
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["POST"]
          }
        });
        return res.data.signedBlob;
      }
    }
    exports.GoogleAuth = GoogleAuth;
  })(googleauth$2);
  return googleauth$2;
}
var iam$2 = {};
var hasRequiredIam$2;
function requireIam$2() {
  if (hasRequiredIam$2) return iam$2;
  hasRequiredIam$2 = 1;
  Object.defineProperty(iam$2, "__esModule", { value: true });
  iam$2.IAMAuth = void 0;
  class IAMAuth {
    selector;
    token;
    /**
     * IAM credentials.
     *
     * @param selector the iam authority selector
     * @param token the token
     * @constructor
     */
    constructor(selector, token) {
      this.selector = selector;
      this.token = token;
      this.selector = selector;
      this.token = token;
    }
    /**
     * Acquire the HTTP headers required to make an authenticated request.
     */
    getRequestHeaders() {
      return {
        "x-goog-iam-authority-selector": this.selector,
        "x-goog-iam-authorization-token": this.token
      };
    }
  }
  iam$2.IAMAuth = IAMAuth;
  return iam$2;
}
var downscopedclient$2 = {};
var hasRequiredDownscopedclient$2;
function requireDownscopedclient$2() {
  if (hasRequiredDownscopedclient$2) return downscopedclient$2;
  hasRequiredDownscopedclient$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DownscopedClient = exports.EXPIRATION_TIME_OFFSET = exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
    const gaxios_1 = requireSrc$3();
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient$2();
    const sts = requireStscredentials$2();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const STS_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    class DownscopedClient extends authclient_1.AuthClient {
      authClient;
      credentialAccessBoundary;
      cachedDownscopedAccessToken;
      stsCredential;
      /**
       * Instantiates a downscoped client object using the provided source
       * AuthClient and credential access boundary rules.
       * To downscope permissions of a source AuthClient, a Credential Access
       * Boundary that specifies which resources the new credential can access, as
       * well as an upper bound on the permissions that are available on each
       * resource, has to be defined. A downscoped client can then be instantiated
       * using the source AuthClient and the Credential Access Boundary.
       * @param options the {@link DownscopedClientOptions `DownscopedClientOptions`} to use. Passing an `AuthClient` directly is **@DEPRECATED**.
       * @param credentialAccessBoundary **@DEPRECATED**. Provide a {@link DownscopedClientOptions `DownscopedClientOptions`} object in the first parameter instead.
       */
      constructor(options2, credentialAccessBoundary = {
        accessBoundary: {
          accessBoundaryRules: []
        }
      }) {
        super(options2 instanceof authclient_1.AuthClient ? {} : options2);
        if (options2 instanceof authclient_1.AuthClient) {
          this.authClient = options2;
          this.credentialAccessBoundary = credentialAccessBoundary;
        } else {
          this.authClient = options2.authClient;
          this.credentialAccessBoundary = options2.credentialAccessBoundary;
        }
        if (this.credentialAccessBoundary.accessBoundary.accessBoundaryRules.length === 0) {
          throw new Error("At least one access boundary rule needs to be defined.");
        } else if (this.credentialAccessBoundary.accessBoundary.accessBoundaryRules.length > exports.MAX_ACCESS_BOUNDARY_RULES_COUNT) {
          throw new Error(`The provided access boundary has more than ${exports.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
        }
        for (const rule of this.credentialAccessBoundary.accessBoundary.accessBoundaryRules) {
          if (rule.availablePermissions.length === 0) {
            throw new Error("At least one permission should be defined in access boundary rules.");
          }
        }
        this.stsCredential = new sts.StsCredentials({
          tokenExchangeEndpoint: `https://sts.${this.universeDomain}/v1/token`
        });
        this.cachedDownscopedAccessToken = null;
      }
      /**
       * Provides a mechanism to inject Downscoped access tokens directly.
       * The expiry_date field is required to facilitate determination of the token
       * expiration which would make it easier for the token consumer to handle.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        if (!credentials.expiry_date) {
          throw new Error("The access token expiry_date field is missing in the provided credentials.");
        }
        super.setCredentials(credentials);
        this.cachedDownscopedAccessToken = credentials;
      }
      async getAccessToken() {
        if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedDownscopedAccessToken.access_token,
          expirationTime: this.cachedDownscopedAccessToken.expiry_date,
          res: this.cachedDownscopedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = new Headers({
          authorization: `Bearer ${accessTokenResponse.token}`
        });
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
          this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * GCP access tokens are retrieved from authclient object/source credential.
       * Then GCP access tokens are exchanged for downscoped access tokens via the
       * token exchange endpoint.
       * @return A promise that resolves with the fresh downscoped access token.
       */
      async refreshAccessTokenAsync() {
        const subjectToken = (await this.authClient.getAccessToken()).token;
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: STS_SUBJECT_TOKEN_TYPE
        };
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, void 0, this.credentialAccessBoundary);
        const sourceCredExpireDate = this.authClient.credentials?.expiry_date || null;
        const expiryDate = stsResponse.expires_in ? (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3 : sourceCredExpireDate;
        this.cachedDownscopedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: expiryDate,
          res: stsResponse.res
        };
        this.credentials = {};
        Object.assign(this.credentials, this.cachedDownscopedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedDownscopedAccessToken.expiry_date,
          access_token: this.cachedDownscopedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedDownscopedAccessToken;
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param downscopedAccessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(downscopedAccessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return downscopedAccessToken.expiry_date ? now >= downscopedAccessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
    }
    exports.DownscopedClient = DownscopedClient;
  })(downscopedclient$2);
  return downscopedclient$2;
}
var passthrough$2 = {};
var hasRequiredPassthrough$2;
function requirePassthrough$2() {
  if (hasRequiredPassthrough$2) return passthrough$2;
  hasRequiredPassthrough$2 = 1;
  Object.defineProperty(passthrough$2, "__esModule", { value: true });
  passthrough$2.PassThroughClient = void 0;
  const authclient_1 = requireAuthclient$2();
  class PassThroughClient extends authclient_1.AuthClient {
    /**
     * Creates a request without any authentication headers or checks.
     *
     * @remarks
     *
     * In testing environments it may be useful to change the provided
     * {@link AuthClient.transporter} for any desired request overrides/handling.
     *
     * @param opts
     * @returns The response of the request.
     */
    async request(opts) {
      return this.transporter.request(opts);
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getAccessToken() {
      return {};
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getRequestHeaders() {
      return new Headers();
    }
  }
  passthrough$2.PassThroughClient = PassThroughClient;
  return passthrough$2;
}
var hasRequiredSrc$2;
function requireSrc$2() {
  if (hasRequiredSrc$2) return src$2;
  hasRequiredSrc$2 = 1;
  (function(exports) {
    var __createBinding = src$2 && src$2.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = src$2 && src$2.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.auth = exports.GDCH_SERVICE_ACCOUNT_TYPE = exports.GdchClient = exports.PassThroughClient = exports.ExternalAccountAuthorizedUserClient = exports.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = exports.ExecutableError = exports.PluggableAuthClient = exports.DownscopedClient = exports.BaseExternalAccountClient = exports.ExternalAccountClient = exports.IdentityPoolClient = exports.AwsRequestSigner = exports.AwsClient = exports.UserRefreshClient = exports.LoginTicket = exports.ClientAuthentication = exports.OAuth2Client = exports.CodeChallengeMethod = exports.Impersonated = exports.JWT = exports.JWTAccess = exports.IdTokenClient = exports.IAMAuth = exports.GCPEnv = exports.Compute = exports.DEFAULT_UNIVERSE = exports.AuthClient = exports.gaxios = exports.gcpMetadata = void 0;
    const googleauth_1 = requireGoogleauth$2();
    Object.defineProperty(exports, "GoogleAuth", { enumerable: true, get: function() {
      return googleauth_1.GoogleAuth;
    } });
    exports.gcpMetadata = requireSrc$5();
    exports.gaxios = requireSrc$3();
    var authclient_1 = requireAuthclient$2();
    Object.defineProperty(exports, "AuthClient", { enumerable: true, get: function() {
      return authclient_1.AuthClient;
    } });
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: function() {
      return authclient_1.DEFAULT_UNIVERSE;
    } });
    var computeclient_1 = requireComputeclient$2();
    Object.defineProperty(exports, "Compute", { enumerable: true, get: function() {
      return computeclient_1.Compute;
    } });
    var envDetect_1 = requireEnvDetect$2();
    Object.defineProperty(exports, "GCPEnv", { enumerable: true, get: function() {
      return envDetect_1.GCPEnv;
    } });
    var iam_1 = requireIam$2();
    Object.defineProperty(exports, "IAMAuth", { enumerable: true, get: function() {
      return iam_1.IAMAuth;
    } });
    var idtokenclient_1 = requireIdtokenclient$2();
    Object.defineProperty(exports, "IdTokenClient", { enumerable: true, get: function() {
      return idtokenclient_1.IdTokenClient;
    } });
    var jwtaccess_1 = requireJwtaccess$2();
    Object.defineProperty(exports, "JWTAccess", { enumerable: true, get: function() {
      return jwtaccess_1.JWTAccess;
    } });
    var jwtclient_1 = requireJwtclient$2();
    Object.defineProperty(exports, "JWT", { enumerable: true, get: function() {
      return jwtclient_1.JWT;
    } });
    var impersonated_1 = requireImpersonated$2();
    Object.defineProperty(exports, "Impersonated", { enumerable: true, get: function() {
      return impersonated_1.Impersonated;
    } });
    var oauth2client_1 = requireOauth2client$2();
    Object.defineProperty(exports, "CodeChallengeMethod", { enumerable: true, get: function() {
      return oauth2client_1.CodeChallengeMethod;
    } });
    Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: function() {
      return oauth2client_1.OAuth2Client;
    } });
    Object.defineProperty(exports, "ClientAuthentication", { enumerable: true, get: function() {
      return oauth2client_1.ClientAuthentication;
    } });
    var loginticket_1 = requireLoginticket$2();
    Object.defineProperty(exports, "LoginTicket", { enumerable: true, get: function() {
      return loginticket_1.LoginTicket;
    } });
    var refreshclient_1 = requireRefreshclient$2();
    Object.defineProperty(exports, "UserRefreshClient", { enumerable: true, get: function() {
      return refreshclient_1.UserRefreshClient;
    } });
    var awsclient_1 = requireAwsclient$2();
    Object.defineProperty(exports, "AwsClient", { enumerable: true, get: function() {
      return awsclient_1.AwsClient;
    } });
    var awsrequestsigner_1 = requireAwsrequestsigner$2();
    Object.defineProperty(exports, "AwsRequestSigner", { enumerable: true, get: function() {
      return awsrequestsigner_1.AwsRequestSigner;
    } });
    var identitypoolclient_1 = requireIdentitypoolclient$2();
    Object.defineProperty(exports, "IdentityPoolClient", { enumerable: true, get: function() {
      return identitypoolclient_1.IdentityPoolClient;
    } });
    var externalclient_1 = requireExternalclient$2();
    Object.defineProperty(exports, "ExternalAccountClient", { enumerable: true, get: function() {
      return externalclient_1.ExternalAccountClient;
    } });
    var baseexternalclient_1 = requireBaseexternalclient$2();
    Object.defineProperty(exports, "BaseExternalAccountClient", { enumerable: true, get: function() {
      return baseexternalclient_1.BaseExternalAccountClient;
    } });
    var downscopedclient_1 = requireDownscopedclient$2();
    Object.defineProperty(exports, "DownscopedClient", { enumerable: true, get: function() {
      return downscopedclient_1.DownscopedClient;
    } });
    var pluggable_auth_client_1 = requirePluggableAuthClient$2();
    Object.defineProperty(exports, "PluggableAuthClient", { enumerable: true, get: function() {
      return pluggable_auth_client_1.PluggableAuthClient;
    } });
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: function() {
      return pluggable_auth_client_1.ExecutableError;
    } });
    var externalAccountAuthorizedUserClient_1 = requireExternalAccountAuthorizedUserClient$2();
    Object.defineProperty(exports, "EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE", { enumerable: true, get: function() {
      return externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE;
    } });
    Object.defineProperty(exports, "ExternalAccountAuthorizedUserClient", { enumerable: true, get: function() {
      return externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient;
    } });
    var passthrough_1 = requirePassthrough$2();
    Object.defineProperty(exports, "PassThroughClient", { enumerable: true, get: function() {
      return passthrough_1.PassThroughClient;
    } });
    var gdchclient_1 = requireGdchclient();
    Object.defineProperty(exports, "GdchClient", { enumerable: true, get: function() {
      return gdchclient_1.GdchClient;
    } });
    Object.defineProperty(exports, "GDCH_SERVICE_ACCOUNT_TYPE", { enumerable: true, get: function() {
      return gdchclient_1.GDCH_SERVICE_ACCOUNT_TYPE;
    } });
    __exportStar(requireGoogleToken(), exports);
    const auth = new googleauth_1.GoogleAuth();
    exports.auth = auth;
  })(src$2);
  return src$2;
}
var src$1 = {};
var googleauth$1 = {};
var crypto$5 = {};
var crypto$4 = {};
var shared$1 = {};
var hasRequiredShared$1;
function requireShared$1() {
  if (hasRequiredShared$1) return shared$1;
  hasRequiredShared$1 = 1;
  Object.defineProperty(shared$1, "__esModule", { value: true });
  shared$1.fromArrayBufferToHex = fromArrayBufferToHex;
  function fromArrayBufferToHex(arrayBuffer) {
    const byteArray = Array.from(new Uint8Array(arrayBuffer));
    return byteArray.map((byte) => {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }
  return shared$1;
}
var hasRequiredCrypto$5;
function requireCrypto$5() {
  if (hasRequiredCrypto$5) return crypto$4;
  hasRequiredCrypto$5 = 1;
  Object.defineProperty(crypto$4, "__esModule", { value: true });
  crypto$4.BrowserCrypto = void 0;
  const base64js = requireBase64Js();
  const shared_1 = requireShared$1();
  class BrowserCrypto {
    constructor() {
      if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) {
        throw new Error("SubtleCrypto not found. Make sure it's an https:// website.");
      }
    }
    async sha256DigestBase64(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return base64js.fromByteArray(new Uint8Array(outputBuffer));
    }
    randomBytesBase64(count) {
      const array = new Uint8Array(count);
      window.crypto.getRandomValues(array);
      return base64js.fromByteArray(array);
    }
    static padBase64(base64) {
      while (base64.length % 4 !== 0) {
        base64 += "=";
      }
      return base64;
    }
    async verify(pubkey, data, signature) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const signatureArray = base64js.toByteArray(BrowserCrypto.padBase64(signature));
      const cryptoKey = await window.crypto.subtle.importKey("jwk", pubkey, algo, true, ["verify"]);
      const result = await window.crypto.subtle.verify(algo, cryptoKey, signatureArray, dataArray);
      return result;
    }
    async sign(privateKey, data) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const cryptoKey = await window.crypto.subtle.importKey("jwk", privateKey, algo, true, ["sign"]);
      const result = await window.crypto.subtle.sign(algo, cryptoKey, dataArray);
      return base64js.fromByteArray(new Uint8Array(result));
    }
    decodeBase64StringUtf8(base64) {
      const uint8array = base64js.toByteArray(BrowserCrypto.padBase64(base64));
      const result = new TextDecoder().decode(uint8array);
      return result;
    }
    encodeBase64StringUtf8(text) {
      const uint8array = new TextEncoder().encode(text);
      const result = base64js.fromByteArray(uint8array);
      return result;
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return (0, shared_1.fromArrayBufferToHex)(outputBuffer);
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const rawKey = typeof key === "string" ? key : String.fromCharCode(...new Uint16Array(key));
      const enc = new TextEncoder();
      const cryptoKey = await window.crypto.subtle.importKey("raw", enc.encode(rawKey), {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      }, false, ["sign"]);
      return window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
    }
  }
  crypto$4.BrowserCrypto = BrowserCrypto;
  return crypto$4;
}
var crypto$3 = {};
var hasRequiredCrypto$4;
function requireCrypto$4() {
  if (hasRequiredCrypto$4) return crypto$3;
  hasRequiredCrypto$4 = 1;
  Object.defineProperty(crypto$3, "__esModule", { value: true });
  crypto$3.NodeCrypto = void 0;
  const crypto2 = require$$0$2;
  class NodeCrypto {
    async sha256DigestBase64(str) {
      return crypto2.createHash("sha256").update(str).digest("base64");
    }
    randomBytesBase64(count) {
      return crypto2.randomBytes(count).toString("base64");
    }
    async verify(pubkey, data, signature) {
      const verifier = crypto2.createVerify("RSA-SHA256");
      verifier.update(data);
      verifier.end();
      return verifier.verify(pubkey, signature, "base64");
    }
    async sign(privateKey, data) {
      const signer = crypto2.createSign("RSA-SHA256");
      signer.update(data);
      signer.end();
      return signer.sign(privateKey, "base64");
    }
    decodeBase64StringUtf8(base64) {
      return Buffer.from(base64, "base64").toString("utf-8");
    }
    encodeBase64StringUtf8(text) {
      return Buffer.from(text, "utf-8").toString("base64");
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      return crypto2.createHash("sha256").update(str).digest("hex");
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const cryptoKey = typeof key === "string" ? key : toBuffer(key);
      return toArrayBuffer(crypto2.createHmac("sha256", cryptoKey).update(msg).digest());
    }
  }
  crypto$3.NodeCrypto = NodeCrypto;
  function toArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }
  function toBuffer(arrayBuffer) {
    return Buffer.from(arrayBuffer);
  }
  return crypto$3;
}
var hasRequiredCrypto$3;
function requireCrypto$3() {
  if (hasRequiredCrypto$3) return crypto$5;
  hasRequiredCrypto$3 = 1;
  (function(exports) {
    var __createBinding = crypto$5 && crypto$5.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = crypto$5 && crypto$5.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCrypto = createCrypto;
    exports.hasBrowserCrypto = hasBrowserCrypto;
    const crypto_1 = requireCrypto$5();
    const crypto_2 = requireCrypto$4();
    __exportStar(requireShared$1(), exports);
    function createCrypto() {
      if (hasBrowserCrypto()) {
        return new crypto_1.BrowserCrypto();
      }
      return new crypto_2.NodeCrypto();
    }
    function hasBrowserCrypto() {
      return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";
    }
  })(crypto$5);
  return crypto$5;
}
var computeclient$1 = {};
var oauth2client$1 = {};
var util$1 = {};
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$1;
  hasRequiredUtil$1 = 1;
  Object.defineProperty(util$1, "__esModule", { value: true });
  util$1.LRUCache = void 0;
  util$1.snakeToCamel = snakeToCamel;
  util$1.originalOrCamelOptions = originalOrCamelOptions;
  util$1.removeUndefinedValuesInObject = removeUndefinedValuesInObject;
  util$1.isValidFile = isValidFile;
  util$1.getWellKnownCertificateConfigFileLocation = getWellKnownCertificateConfigFileLocation;
  const fs = require$$0$3;
  const os = require$$1;
  const path = require$$5;
  const WELL_KNOWN_CERTIFICATE_CONFIG_FILE = "certificate_config.json";
  const CLOUDSDK_CONFIG_DIRECTORY = "gcloud";
  function snakeToCamel(str) {
    return str.replace(/([_][^_])/g, (match) => match.slice(1).toUpperCase());
  }
  function originalOrCamelOptions(obj) {
    function get(key) {
      const o = obj || {};
      return o[key] ?? o[snakeToCamel(key)];
    }
    return { get };
  }
  class LRUCache {
    capacity;
    /**
     * Maps are in order. Thus, the older item is the first item.
     *
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
     */
    #cache = /* @__PURE__ */ new Map();
    maxAge;
    constructor(options2) {
      this.capacity = options2.capacity;
      this.maxAge = options2.maxAge;
    }
    /**
     * Moves the key to the end of the cache.
     *
     * @param key the key to move
     * @param value the value of the key
     */
    #moveToEnd(key, value) {
      this.#cache.delete(key);
      this.#cache.set(key, {
        value,
        lastAccessed: Date.now()
      });
    }
    /**
     * Add an item to the cache.
     *
     * @param key the key to upsert
     * @param value the value of the key
     */
    set(key, value) {
      this.#moveToEnd(key, value);
      this.#evict();
    }
    /**
     * Get an item from the cache.
     *
     * @param key the key to retrieve
     */
    get(key) {
      const item = this.#cache.get(key);
      if (!item)
        return;
      this.#moveToEnd(key, item.value);
      this.#evict();
      return item.value;
    }
    /**
     * Maintain the cache based on capacity and TTL.
     */
    #evict() {
      const cutoffDate = this.maxAge ? Date.now() - this.maxAge : 0;
      let oldestItem = this.#cache.entries().next();
      while (!oldestItem.done && (this.#cache.size > this.capacity || // too many
      oldestItem.value[1].lastAccessed < cutoffDate)) {
        this.#cache.delete(oldestItem.value[0]);
        oldestItem = this.#cache.entries().next();
      }
    }
  }
  util$1.LRUCache = LRUCache;
  function removeUndefinedValuesInObject(object) {
    Object.entries(object).forEach(([key, value]) => {
      if (value === void 0 || value === "undefined") {
        delete object[key];
      }
    });
    return object;
  }
  async function isValidFile(filePath) {
    try {
      const stats = await fs.promises.lstat(filePath);
      return stats.isFile();
    } catch (e) {
      return false;
    }
  }
  function getWellKnownCertificateConfigFileLocation() {
    const configDir = process.env.CLOUDSDK_CONFIG || (_isWindows() ? path.join(process.env.APPDATA || "", CLOUDSDK_CONFIG_DIRECTORY) : path.join(process.env.HOME || "", ".config", CLOUDSDK_CONFIG_DIRECTORY));
    return path.join(configDir, WELL_KNOWN_CERTIFICATE_CONFIG_FILE);
  }
  function _isWindows() {
    return os.platform().startsWith("win");
  }
  return util$1;
}
var authclient$1 = {};
var shared = {};
const name = "google-auth-library";
const version$1 = "10.5.0";
const author = "Google Inc.";
const description = "Google APIs Authentication Client Library for Node.js";
const engines = { "node": ">=18" };
const main = "./build/src/index.js";
const types = "./build/src/index.d.ts";
const repository = "googleapis/google-auth-library-nodejs.git";
const keywords = ["google", "api", "google apis", "client", "client library"];
const dependencies = { "base64-js": "^1.3.0", "ecdsa-sig-formatter": "^1.0.11", "gaxios": "^7.0.0", "gcp-metadata": "^8.0.0", "google-logging-utils": "^1.0.0", "gtoken": "^8.0.0", "jws": "^4.0.0" };
const devDependencies = { "@types/base64-js": "^1.2.5", "@types/jws": "^3.1.0", "@types/mocha": "^10.0.10", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.1", "@types/node": "^22.0.0", "@types/sinon": "^17.0.0", "assert-rejects": "^1.0.0", "c8": "^10.0.0", "codecov": "^3.0.2", "gts": "^6.0.0", "is-docker": "^3.0.0", "jsdoc": "^4.0.0", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "^5.0.1", "keypair": "^1.0.4", "mocha": "^11.1.0", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "^14.0.5", "null-loader": "^4.0.0", "puppeteer": "^24.0.0", "sinon": "^21.0.0", "ts-loader": "^8.0.0", "typescript": "5.8.2", "webpack": "^5.21.2", "webpack-cli": "^4.0.0" };
const files = ["build/src", "!build/src/**/*.map"];
const scripts = { "test": "c8 mocha build/test", "clean": "gts clean", "prepare": "npm run compile", "lint": "gts check --no-inline-config", "compile": "tsc -p .", "fix": "gts fix", "pretest": "npm run compile -- --sourceMap", "docs": "jsdoc -c .jsdoc.js", "samples-setup": "cd samples/ && npm link ../ && npm run setup && cd ../", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "system-test": "mocha build/system-test --timeout 60000", "presystem-test": "npm run compile -- --sourceMap", "webpack": "webpack", "browser-test": "karma start", "docs-test": "echo 'disabled until linkinator is fixed'", "predocs-test": "npm run docs", "prelint": "cd samples; npm link ../; npm install" };
const license = "Apache-2.0";
const require$$0 = {
  name,
  version: version$1,
  author,
  description,
  engines,
  main,
  types,
  repository,
  keywords,
  dependencies,
  devDependencies,
  files,
  scripts,
  license
};
var hasRequiredShared;
function requireShared() {
  if (hasRequiredShared) return shared;
  hasRequiredShared = 1;
  Object.defineProperty(shared, "__esModule", { value: true });
  shared.USER_AGENT = shared.PRODUCT_NAME = shared.pkg = void 0;
  const pkg = require$$0;
  shared.pkg = pkg;
  const PRODUCT_NAME = "google-api-nodejs-client";
  shared.PRODUCT_NAME = PRODUCT_NAME;
  const USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;
  shared.USER_AGENT = USER_AGENT;
  return shared;
}
var hasRequiredAuthclient$1;
function requireAuthclient$1() {
  if (hasRequiredAuthclient$1) return authclient$1;
  hasRequiredAuthclient$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthClient = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = exports.DEFAULT_UNIVERSE = void 0;
    const events_1 = require$$0$4;
    const gaxios_1 = requireSrc$6();
    const util_1 = requireUtil$1();
    const google_logging_utils_1 = requireSrc$4();
    const shared_cjs_1 = requireShared();
    exports.DEFAULT_UNIVERSE = "googleapis.com";
    exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1e3;
    class AuthClient extends events_1.EventEmitter {
      apiKey;
      projectId;
      /**
       * The quota project ID. The quota project can be used by client libraries for the billing purpose.
       * See {@link https://cloud.google.com/docs/quota Working with quotas}
       */
      quotaProjectId;
      /**
       * The {@link Gaxios `Gaxios`} instance used for making requests.
       */
      transporter;
      credentials = {};
      eagerRefreshThresholdMillis = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS;
      forceRefreshOnFailure = false;
      universeDomain = exports.DEFAULT_UNIVERSE;
      /**
       * Symbols that can be added to GaxiosOptions to specify the method name that is
       * making an RPC call, for logging purposes, as well as a string ID that can be
       * used to correlate calls and responses.
       */
      static RequestMethodNameSymbol = /* @__PURE__ */ Symbol("request method name");
      static RequestLogIdSymbol = /* @__PURE__ */ Symbol("request log id");
      constructor(opts = {}) {
        super();
        const options2 = (0, util_1.originalOrCamelOptions)(opts);
        this.apiKey = opts.apiKey;
        this.projectId = options2.get("project_id") ?? null;
        this.quotaProjectId = options2.get("quota_project_id");
        this.credentials = options2.get("credentials") ?? {};
        this.universeDomain = options2.get("universe_domain") ?? exports.DEFAULT_UNIVERSE;
        this.transporter = opts.transporter ?? new gaxios_1.Gaxios(opts.transporterOptions);
        if (options2.get("useAuthRequestParameters") !== false) {
          this.transporter.interceptors.request.add(AuthClient.DEFAULT_REQUEST_INTERCEPTOR);
          this.transporter.interceptors.response.add(AuthClient.DEFAULT_RESPONSE_INTERCEPTOR);
        }
        if (opts.eagerRefreshThresholdMillis) {
          this.eagerRefreshThresholdMillis = opts.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = opts.forceRefreshOnFailure ?? false;
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link AuthClient}.
       *
       * @see {@link AuthClient.request} for the classic method.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const authClient = new AuthClient();
       * const fetchWithAuthClient: typeof fetch = (...args) => authClient.fetch(...args);
       * await fetchWithAuthClient('https://example.com');
       * ```
       *
       * @param args `fetch` API or {@link Gaxios.fetch `Gaxios#fetch`} parameters
       * @returns the {@link GaxiosResponse} with Gaxios-added properties
       */
      fetch(...args) {
        const input = args[0];
        const init = args[1];
        let url = void 0;
        const headers = new Headers();
        if (typeof input === "string") {
          url = new URL(input);
        } else if (input instanceof URL) {
          url = input;
        } else if (input && input.url) {
          url = new URL(input.url);
        }
        if (input && typeof input === "object" && "headers" in input) {
          gaxios_1.Gaxios.mergeHeaders(headers, input.headers);
        }
        if (init) {
          gaxios_1.Gaxios.mergeHeaders(headers, new Headers(init.headers));
        }
        if (typeof input === "object" && !(input instanceof URL)) {
          return this.request({ ...init, ...input, headers, url });
        } else {
          return this.request({ ...init, headers, url });
        }
      }
      /**
       * Sets the auth credentials.
       */
      setCredentials(credentials) {
        this.credentials = credentials;
      }
      /**
       * Append additional headers, e.g., x-goog-user-project, shared across the
       * classes inheriting AuthClient. This method should be used by any method
       * that overrides getRequestMetadataAsync(), which is a shared helper for
       * setting request information in both gRPC and HTTP API calls.
       *
       * @param headers object to append additional headers to.
       */
      addSharedMetadataHeaders(headers) {
        if (!headers.has("x-goog-user-project") && // don't override a value the user sets.
        this.quotaProjectId) {
          headers.set("x-goog-user-project", this.quotaProjectId);
        }
        return headers;
      }
      /**
       * Adds the `x-goog-user-project` and `authorization` headers to the target Headers
       * object, if they exist on the source.
       *
       * @param target the headers to target
       * @param source the headers to source from
       * @returns the target headers
       */
      addUserProjectAndAuthHeaders(target, source) {
        const xGoogUserProject = source.get("x-goog-user-project");
        const authorizationHeader = source.get("authorization");
        if (xGoogUserProject) {
          target.set("x-goog-user-project", xGoogUserProject);
        }
        if (authorizationHeader) {
          target.set("authorization", authorizationHeader);
        }
        return target;
      }
      static log = (0, google_logging_utils_1.log)("auth");
      static DEFAULT_REQUEST_INTERCEPTOR = {
        resolved: async (config) => {
          if (!config.headers.has("x-goog-api-client")) {
            const nodeVersion = process.version.replace(/^v/, "");
            config.headers.set("x-goog-api-client", `gl-node/${nodeVersion}`);
          }
          const userAgent = config.headers.get("User-Agent");
          if (!userAgent) {
            config.headers.set("User-Agent", shared_cjs_1.USER_AGENT);
          } else if (!userAgent.includes(`${shared_cjs_1.PRODUCT_NAME}/`)) {
            config.headers.set("User-Agent", `${userAgent} ${shared_cjs_1.USER_AGENT}`);
          }
          try {
            const symbols = config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = `${Math.floor(Math.random() * 1e3)}`;
            symbols[AuthClient.RequestLogIdSymbol] = logId;
            const logObject = {
              url: config.url,
              headers: config.headers
            };
            if (methodName) {
              AuthClient.log.info("%s [%s] request %j", methodName, logId, logObject);
            } else {
              AuthClient.log.info("[%s] request %j", logId, logObject);
            }
          } catch (e) {
          }
          return config;
        }
      };
      static DEFAULT_RESPONSE_INTERCEPTOR = {
        resolved: async (response) => {
          try {
            const symbols = response.config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = symbols[AuthClient.RequestLogIdSymbol];
            if (methodName) {
              AuthClient.log.info("%s [%s] response %j", methodName, logId, response.data);
            } else {
              AuthClient.log.info("[%s] response %j", logId, response.data);
            }
          } catch (e) {
          }
          return response;
        },
        rejected: async (error) => {
          try {
            const symbols = error.config;
            const methodName = symbols[AuthClient.RequestMethodNameSymbol];
            const logId = symbols[AuthClient.RequestLogIdSymbol];
            if (methodName) {
              AuthClient.log.info("%s [%s] error %j", methodName, logId, error.response?.data);
            } else {
              AuthClient.log.error("[%s] error %j", logId, error.response?.data);
            }
          } catch (e) {
          }
          throw error;
        }
      };
      /**
       * Sets the method name that is making a Gaxios request, so that logging may tag
       * log lines with the operation.
       * @param config A Gaxios request config
       * @param methodName The method name making the call
       */
      static setMethodName(config, methodName) {
        try {
          const symbols = config;
          symbols[AuthClient.RequestMethodNameSymbol] = methodName;
        } catch (e) {
        }
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    }
    exports.AuthClient = AuthClient;
  })(authclient$1);
  return authclient$1;
}
var loginticket$1 = {};
var hasRequiredLoginticket$1;
function requireLoginticket$1() {
  if (hasRequiredLoginticket$1) return loginticket$1;
  hasRequiredLoginticket$1 = 1;
  Object.defineProperty(loginticket$1, "__esModule", { value: true });
  loginticket$1.LoginTicket = void 0;
  class LoginTicket {
    envelope;
    payload;
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @param {string} env Envelope of the jwt
     * @param {TokenPayload} pay Payload of the jwt
     * @constructor
     */
    constructor(env, pay) {
      this.envelope = env;
      this.payload = pay;
    }
    getEnvelope() {
      return this.envelope;
    }
    getPayload() {
      return this.payload;
    }
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @return The user ID
     */
    getUserId() {
      const payload = this.getPayload();
      if (payload && payload.sub) {
        return payload.sub;
      }
      return null;
    }
    /**
     * Returns attributes from the login ticket.  This can contain
     * various information about the user session.
     *
     * @return The envelope and payload
     */
    getAttributes() {
      return { envelope: this.getEnvelope(), payload: this.getPayload() };
    }
  }
  loginticket$1.LoginTicket = LoginTicket;
  return loginticket$1;
}
var hasRequiredOauth2client$1;
function requireOauth2client$1() {
  if (hasRequiredOauth2client$1) return oauth2client$1;
  hasRequiredOauth2client$1 = 1;
  Object.defineProperty(oauth2client$1, "__esModule", { value: true });
  oauth2client$1.OAuth2Client = oauth2client$1.ClientAuthentication = oauth2client$1.CertificateFormat = oauth2client$1.CodeChallengeMethod = void 0;
  const gaxios_1 = requireSrc$6();
  const querystring = require$$1$1;
  const stream = require$$0$5;
  const formatEcdsa = requireEcdsaSigFormatter();
  const util_1 = requireUtil$1();
  const crypto_1 = requireCrypto$3();
  const authclient_1 = requireAuthclient$1();
  const loginticket_1 = requireLoginticket$1();
  var CodeChallengeMethod;
  (function(CodeChallengeMethod2) {
    CodeChallengeMethod2["Plain"] = "plain";
    CodeChallengeMethod2["S256"] = "S256";
  })(CodeChallengeMethod || (oauth2client$1.CodeChallengeMethod = CodeChallengeMethod = {}));
  var CertificateFormat;
  (function(CertificateFormat2) {
    CertificateFormat2["PEM"] = "PEM";
    CertificateFormat2["JWK"] = "JWK";
  })(CertificateFormat || (oauth2client$1.CertificateFormat = CertificateFormat = {}));
  var ClientAuthentication;
  (function(ClientAuthentication2) {
    ClientAuthentication2["ClientSecretPost"] = "ClientSecretPost";
    ClientAuthentication2["ClientSecretBasic"] = "ClientSecretBasic";
    ClientAuthentication2["None"] = "None";
  })(ClientAuthentication || (oauth2client$1.ClientAuthentication = ClientAuthentication = {}));
  class OAuth2Client extends authclient_1.AuthClient {
    redirectUri;
    certificateCache = {};
    certificateExpiry = null;
    certificateCacheFormat = CertificateFormat.PEM;
    refreshTokenPromises = /* @__PURE__ */ new Map();
    endpoints;
    issuers;
    clientAuthentication;
    // TODO: refactor tests to make this private
    _clientId;
    // TODO: refactor tests to make this private
    _clientSecret;
    refreshHandler;
    /**
     * An OAuth2 Client for Google APIs.
     *
     * @param options The OAuth2 Client Options. Passing an `clientId` directly is **@DEPRECATED**.
     * @param clientSecret **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
     * @param redirectUri **@DEPRECATED**. Provide a {@link OAuth2ClientOptions `OAuth2ClientOptions`} object in the first parameter instead.
     */
    constructor(options2 = {}, clientSecret, redirectUri) {
      super(typeof options2 === "object" ? options2 : {});
      if (typeof options2 !== "object") {
        options2 = {
          clientId: options2,
          clientSecret,
          redirectUri
        };
      }
      this._clientId = options2.clientId || options2.client_id;
      this._clientSecret = options2.clientSecret || options2.client_secret;
      this.redirectUri = options2.redirectUri || options2.redirect_uris?.[0];
      this.endpoints = {
        tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
        oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        oauth2TokenUrl: "https://oauth2.googleapis.com/token",
        oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
        oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
        oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
        oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
        ...options2.endpoints
      };
      this.clientAuthentication = options2.clientAuthentication || ClientAuthentication.ClientSecretPost;
      this.issuers = options2.issuers || [
        "accounts.google.com",
        "https://accounts.google.com",
        this.universeDomain
      ];
    }
    /**
     * @deprecated use instance's {@link OAuth2Client.endpoints}
     */
    static GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
    /**
     * Clock skew - five minutes in seconds
     */
    static CLOCK_SKEW_SECS_ = 300;
    /**
     * The default max Token Lifetime is one day in seconds
     */
    static DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400;
    /**
     * Generates URL for consent page landing.
     * @param opts Options.
     * @return URL to consent page.
     */
    generateAuthUrl(opts = {}) {
      if (opts.code_challenge_method && !opts.code_challenge) {
        throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
      }
      opts.response_type = opts.response_type || "code";
      opts.client_id = opts.client_id || this._clientId;
      opts.redirect_uri = opts.redirect_uri || this.redirectUri;
      if (Array.isArray(opts.scope)) {
        opts.scope = opts.scope.join(" ");
      }
      const rootUrl = this.endpoints.oauth2AuthBaseUrl.toString();
      return rootUrl + "?" + querystring.stringify(opts);
    }
    generateCodeVerifier() {
      throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.");
    }
    /**
     * Convenience method to automatically generate a code_verifier, and its
     * resulting SHA256. If used, this must be paired with a S256
     * code_challenge_method.
     *
     * For a full example see:
     * https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/oauth2-codeVerifier.js
     */
    async generateCodeVerifierAsync() {
      const crypto2 = (0, crypto_1.createCrypto)();
      const randomString = crypto2.randomBytesBase64(96);
      const codeVerifier = randomString.replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-");
      const unencodedCodeChallenge = await crypto2.sha256DigestBase64(codeVerifier);
      const codeChallenge = unencodedCodeChallenge.split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
      return { codeVerifier, codeChallenge };
    }
    getToken(codeOrOptions, callback) {
      const options2 = typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
      if (callback) {
        this.getTokenAsync(options2).then((r) => callback(null, r.tokens, r.res), (e) => callback(e, null, e.response));
      } else {
        return this.getTokenAsync(options2);
      }
    }
    async getTokenAsync(options2) {
      const url = this.endpoints.oauth2TokenUrl.toString();
      const headers = new Headers();
      const values = {
        client_id: options2.client_id || this._clientId,
        code_verifier: options2.codeVerifier,
        code: options2.code,
        grant_type: "authorization_code",
        redirect_uri: options2.redirect_uri || this.redirectUri
      };
      if (this.clientAuthentication === ClientAuthentication.ClientSecretBasic) {
        const basic = Buffer.from(`${this._clientId}:${this._clientSecret}`);
        headers.set("authorization", `Basic ${basic.toString("base64")}`);
      }
      if (this.clientAuthentication === ClientAuthentication.ClientSecretPost) {
        values.client_secret = this._clientSecret;
      }
      const opts = {
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        url,
        data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(values)),
        headers
      };
      authclient_1.AuthClient.setMethodName(opts, "getTokenAsync");
      const res = await this.transporter.request(opts);
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    /**
     * Refreshes the access token.
     * @param refresh_token Existing refresh token.
     * @private
     */
    async refreshToken(refreshToken) {
      if (!refreshToken) {
        return this.refreshTokenNoCache(refreshToken);
      }
      if (this.refreshTokenPromises.has(refreshToken)) {
        return this.refreshTokenPromises.get(refreshToken);
      }
      const p = this.refreshTokenNoCache(refreshToken).then((r) => {
        this.refreshTokenPromises.delete(refreshToken);
        return r;
      }, (e) => {
        this.refreshTokenPromises.delete(refreshToken);
        throw e;
      });
      this.refreshTokenPromises.set(refreshToken, p);
      return p;
    }
    async refreshTokenNoCache(refreshToken) {
      if (!refreshToken) {
        throw new Error("No refresh token is set.");
      }
      const url = this.endpoints.oauth2TokenUrl.toString();
      const data = {
        refresh_token: refreshToken,
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: "refresh_token"
      };
      let res;
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          method: "POST",
          url,
          data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(data))
        };
        authclient_1.AuthClient.setMethodName(opts, "refreshTokenNoCache");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError && e.message === "invalid_grant" && e.response?.data && /ReAuth/i.test(e.response.data.error_description)) {
          e.message = JSON.stringify(e.response.data);
        }
        throw e;
      }
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    refreshAccessToken(callback) {
      if (callback) {
        this.refreshAccessTokenAsync().then((r) => callback(null, r.credentials, r.res), callback);
      } else {
        return this.refreshAccessTokenAsync();
      }
    }
    async refreshAccessTokenAsync() {
      const r = await this.refreshToken(this.credentials.refresh_token);
      const tokens = r.tokens;
      tokens.refresh_token = this.credentials.refresh_token;
      this.credentials = tokens;
      return { credentials: this.credentials, res: r.res };
    }
    getAccessToken(callback) {
      if (callback) {
        this.getAccessTokenAsync().then((r) => callback(null, r.token, r.res), callback);
      } else {
        return this.getAccessTokenAsync();
      }
    }
    async getAccessTokenAsync() {
      const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
      if (shouldRefresh) {
        if (!this.credentials.refresh_token) {
          if (this.refreshHandler) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken?.access_token) {
              this.setCredentials(refreshedAccessToken);
              return { token: this.credentials.access_token };
            }
          } else {
            throw new Error("No refresh token or refresh handler callback is set.");
          }
        }
        const r = await this.refreshAccessTokenAsync();
        if (!r.credentials || r.credentials && !r.credentials.access_token) {
          throw new Error("Could not refresh access token.");
        }
        return { token: r.credentials.access_token, res: r.res };
      } else {
        return { token: this.credentials.access_token };
      }
    }
    /**
     * The main authentication interface.  It takes an optional url which when
     * present is the endpoint being accessed, and returns a Promise which
     * resolves with authorization header fields.
     *
     * In OAuth2Client, the result has the form:
     * { authorization: 'Bearer <access_token_value>' }
     */
    async getRequestHeaders(url) {
      const headers = (await this.getRequestMetadataAsync(url)).headers;
      return headers;
    }
    async getRequestMetadataAsync(url) {
      const thisCreds = this.credentials;
      if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey && !this.refreshHandler) {
        throw new Error("No access, refresh token, API key or refresh handler callback is set.");
      }
      if (thisCreds.access_token && !this.isTokenExpiring()) {
        thisCreds.token_type = thisCreds.token_type || "Bearer";
        const headers2 = new Headers({
          authorization: thisCreds.token_type + " " + thisCreds.access_token
        });
        return { headers: this.addSharedMetadataHeaders(headers2) };
      }
      if (this.refreshHandler) {
        const refreshedAccessToken = await this.processAndValidateRefreshHandler();
        if (refreshedAccessToken?.access_token) {
          this.setCredentials(refreshedAccessToken);
          const headers2 = new Headers({
            authorization: "Bearer " + this.credentials.access_token
          });
          return { headers: this.addSharedMetadataHeaders(headers2) };
        }
      }
      if (this.apiKey) {
        return { headers: new Headers({ "X-Goog-Api-Key": this.apiKey }) };
      }
      let r = null;
      let tokens = null;
      try {
        r = await this.refreshToken(thisCreds.refresh_token);
        tokens = r.tokens;
      } catch (err) {
        const e = err;
        if (e.response && (e.response.status === 403 || e.response.status === 404)) {
          e.message = `Could not refresh access token: ${e.message}`;
        }
        throw e;
      }
      const credentials = this.credentials;
      credentials.token_type = credentials.token_type || "Bearer";
      tokens.refresh_token = credentials.refresh_token;
      this.credentials = tokens;
      const headers = new Headers({
        authorization: credentials.token_type + " " + tokens.access_token
      });
      return { headers: this.addSharedMetadataHeaders(headers), res: r.res };
    }
    /**
     * Generates an URL to revoke the given token.
     * @param token The existing token to be revoked.
     *
     * @deprecated use instance method {@link OAuth2Client.getRevokeTokenURL}
     */
    static getRevokeTokenUrl(token) {
      return new OAuth2Client().getRevokeTokenURL(token).toString();
    }
    /**
     * Generates a URL to revoke the given token.
     *
     * @param token The existing token to be revoked.
     */
    getRevokeTokenURL(token) {
      const url = new URL(this.endpoints.oauth2RevokeUrl);
      url.searchParams.append("token", token);
      return url;
    }
    revokeToken(token, callback) {
      const opts = {
        ...OAuth2Client.RETRY_CONFIG,
        url: this.getRevokeTokenURL(token).toString(),
        method: "POST"
      };
      authclient_1.AuthClient.setMethodName(opts, "revokeToken");
      if (callback) {
        this.transporter.request(opts).then((r) => callback(null, r), callback);
      } else {
        return this.transporter.request(opts);
      }
    }
    revokeCredentials(callback) {
      if (callback) {
        this.revokeCredentialsAsync().then((res) => callback(null, res), callback);
      } else {
        return this.revokeCredentialsAsync();
      }
    }
    async revokeCredentialsAsync() {
      const token = this.credentials.access_token;
      this.credentials = {};
      if (token) {
        return this.revokeToken(token);
      } else {
        throw new Error("No access token to revoke.");
      }
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    async requestAsync(opts, reAuthRetried = false) {
      try {
        const r = await this.getRequestMetadataAsync();
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        this.addUserProjectAndAuthHeaders(opts.headers, r.headers);
        if (this.apiKey) {
          opts.headers.set("X-Goog-Api-Key", this.apiKey);
        }
        return await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const mayRequireRefresh = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure);
          const mayRequireRefreshWithNoRefreshToken = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefresh) {
            await this.refreshAccessTokenAsync();
            return this.requestAsync(opts, true);
          } else if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefreshWithNoRefreshToken) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken?.access_token) {
              this.setCredentials(refreshedAccessToken);
            }
            return this.requestAsync(opts, true);
          }
        }
        throw e;
      }
    }
    verifyIdToken(options2, callback) {
      if (callback && typeof callback !== "function") {
        throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
      }
      if (callback) {
        this.verifyIdTokenAsync(options2).then((r) => callback(null, r), callback);
      } else {
        return this.verifyIdTokenAsync(options2);
      }
    }
    async verifyIdTokenAsync(options2) {
      if (!options2.idToken) {
        throw new Error("The verifyIdToken method requires an ID Token");
      }
      const response = await this.getFederatedSignonCertsAsync();
      const login = await this.verifySignedJwtWithCertsAsync(options2.idToken, response.certs, options2.audience, this.issuers, options2.maxExpiry);
      return login;
    }
    /**
     * Obtains information about the provisioned access token.  Especially useful
     * if you want to check the scopes that were provisioned to a given token.
     *
     * @param accessToken Required.  The Access Token for which you want to get
     * user info.
     */
    async getTokenInfo(accessToken) {
      const { data } = await this.transporter.request({
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          authorization: `Bearer ${accessToken}`
        },
        url: this.endpoints.tokenInfoUrl.toString()
      });
      const info = Object.assign({
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3,
        scopes: data.scope.split(" ")
      }, data);
      delete info.expires_in;
      delete info.scope;
      return info;
    }
    getFederatedSignonCerts(callback) {
      if (callback) {
        this.getFederatedSignonCertsAsync().then((r) => callback(null, r.certs, r.res), callback);
      } else {
        return this.getFederatedSignonCertsAsync();
      }
    }
    async getFederatedSignonCertsAsync() {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const format = (0, crypto_1.hasBrowserCrypto)() ? CertificateFormat.JWK : CertificateFormat.PEM;
      if (this.certificateExpiry && nowTime < this.certificateExpiry.getTime() && this.certificateCacheFormat === format) {
        return { certs: this.certificateCache, format };
      }
      let res;
      let url;
      switch (format) {
        case CertificateFormat.PEM:
          url = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
          break;
        case CertificateFormat.JWK:
          url = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          url
        };
        authclient_1.AuthClient.setMethodName(opts, "getFederatedSignonCertsAsync");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      const cacheControl = res?.headers.get("cache-control");
      let cacheAge = -1;
      if (cacheControl) {
        const maxAge = /max-age=(?<maxAge>[0-9]+)/.exec(cacheControl)?.groups?.maxAge;
        if (maxAge) {
          cacheAge = Number(maxAge) * 1e3;
        }
      }
      let certificates = {};
      switch (format) {
        case CertificateFormat.PEM:
          certificates = res.data;
          break;
        case CertificateFormat.JWK:
          for (const key of res.data.keys) {
            certificates[key.kid] = key;
          }
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      const now = /* @__PURE__ */ new Date();
      this.certificateExpiry = cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
      this.certificateCache = certificates;
      this.certificateCacheFormat = format;
      return { certs: certificates, format, res };
    }
    getIapPublicKeys(callback) {
      if (callback) {
        this.getIapPublicKeysAsync().then((r) => callback(null, r.pubkeys, r.res), callback);
      } else {
        return this.getIapPublicKeysAsync();
      }
    }
    async getIapPublicKeysAsync() {
      let res;
      const url = this.endpoints.oauth2IapPublicKeyUrl.toString();
      try {
        const opts = {
          ...OAuth2Client.RETRY_CONFIG,
          url
        };
        authclient_1.AuthClient.setMethodName(opts, "getIapPublicKeysAsync");
        res = await this.transporter.request(opts);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      return { pubkeys: res.data, res };
    }
    verifySignedJwtWithCerts() {
      throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.");
    }
    /**
     * Verify the id token is signed with the correct certificate
     * and is from the correct audience.
     * @param jwt The jwt to verify (The ID Token in this case).
     * @param certs The array of certs to test the jwt against.
     * @param requiredAudience The audience to test the jwt against.
     * @param issuers The allowed issuers of the jwt (Optional).
     * @param maxExpiry The max expiry the certificate can be (Optional).
     * @return Returns a promise resolving to LoginTicket on verification.
     */
    async verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience, issuers, maxExpiry) {
      const crypto2 = (0, crypto_1.createCrypto)();
      if (!maxExpiry) {
        maxExpiry = OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
      }
      const segments = jwt.split(".");
      if (segments.length !== 3) {
        throw new Error("Wrong number of segments in token: " + jwt);
      }
      const signed = segments[0] + "." + segments[1];
      let signature = segments[2];
      let envelope;
      let payload;
      try {
        envelope = JSON.parse(crypto2.decodeBase64StringUtf8(segments[0]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token envelope: ${segments[0]}': ${err.message}`;
        }
        throw err;
      }
      if (!envelope) {
        throw new Error("Can't parse token envelope: " + segments[0]);
      }
      try {
        payload = JSON.parse(crypto2.decodeBase64StringUtf8(segments[1]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token payload '${segments[0]}`;
        }
        throw err;
      }
      if (!payload) {
        throw new Error("Can't parse token payload: " + segments[1]);
      }
      if (!Object.prototype.hasOwnProperty.call(certs, envelope.kid)) {
        throw new Error("No pem found for envelope: " + JSON.stringify(envelope));
      }
      const cert = certs[envelope.kid];
      if (envelope.alg === "ES256") {
        signature = formatEcdsa.joseToDer(signature, "ES256").toString("base64");
      }
      const verified = await crypto2.verify(cert, signed, signature);
      if (!verified) {
        throw new Error("Invalid token signature: " + jwt);
      }
      if (!payload.iat) {
        throw new Error("No issue time in token: " + JSON.stringify(payload));
      }
      if (!payload.exp) {
        throw new Error("No expiration time in token: " + JSON.stringify(payload));
      }
      const iat = Number(payload.iat);
      if (isNaN(iat))
        throw new Error("iat field using invalid format");
      const exp = Number(payload.exp);
      if (isNaN(exp))
        throw new Error("exp field using invalid format");
      const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
      if (exp >= now + maxExpiry) {
        throw new Error("Expiration time too far in future: " + JSON.stringify(payload));
      }
      const earliest = iat - OAuth2Client.CLOCK_SKEW_SECS_;
      const latest = exp + OAuth2Client.CLOCK_SKEW_SECS_;
      if (now < earliest) {
        throw new Error("Token used too early, " + now + " < " + earliest + ": " + JSON.stringify(payload));
      }
      if (now > latest) {
        throw new Error("Token used too late, " + now + " > " + latest + ": " + JSON.stringify(payload));
      }
      if (issuers && issuers.indexOf(payload.iss) < 0) {
        throw new Error("Invalid issuer, expected one of [" + issuers + "], but got " + payload.iss);
      }
      if (typeof requiredAudience !== "undefined" && requiredAudience !== null) {
        const aud = payload.aud;
        let audVerified = false;
        if (requiredAudience.constructor === Array) {
          audVerified = requiredAudience.indexOf(aud) > -1;
        } else {
          audVerified = aud === requiredAudience;
        }
        if (!audVerified) {
          throw new Error("Wrong recipient, payload audience != requiredAudience");
        }
      }
      return new loginticket_1.LoginTicket(envelope, payload);
    }
    /**
     * Returns a promise that resolves with AccessTokenResponse type if
     * refreshHandler is defined.
     * If not, nothing is returned.
     */
    async processAndValidateRefreshHandler() {
      if (this.refreshHandler) {
        const accessTokenResponse = await this.refreshHandler();
        if (!accessTokenResponse.access_token) {
          throw new Error("No access token is returned by the refreshHandler callback.");
        }
        return accessTokenResponse;
      }
      return;
    }
    /**
     * Returns true if a token is expired or will expire within
     * eagerRefreshThresholdMillismilliseconds.
     * If there is no expiry time, assumes the token is not expired or expiring.
     */
    isTokenExpiring() {
      const expiryDate = this.credentials.expiry_date;
      return expiryDate ? expiryDate <= (/* @__PURE__ */ new Date()).getTime() + this.eagerRefreshThresholdMillis : false;
    }
  }
  oauth2client$1.OAuth2Client = OAuth2Client;
  return oauth2client$1;
}
var hasRequiredComputeclient$1;
function requireComputeclient$1() {
  if (hasRequiredComputeclient$1) return computeclient$1;
  hasRequiredComputeclient$1 = 1;
  Object.defineProperty(computeclient$1, "__esModule", { value: true });
  computeclient$1.Compute = void 0;
  const gaxios_1 = requireSrc$6();
  const gcpMetadata = requireSrc$5();
  const oauth2client_1 = requireOauth2client$1();
  class Compute extends oauth2client_1.OAuth2Client {
    serviceAccountEmail;
    scopes;
    /**
     * Google Compute Engine service account credentials.
     *
     * Retrieve access token from the metadata server.
     * See: https://cloud.google.com/compute/docs/access/authenticate-workloads#applications
     */
    constructor(options2 = {}) {
      super(options2);
      this.credentials = { expiry_date: 1, refresh_token: "compute-placeholder" };
      this.serviceAccountEmail = options2.serviceAccountEmail || "default";
      this.scopes = Array.isArray(options2.scopes) ? options2.scopes : options2.scopes ? [options2.scopes] : [];
    }
    /**
     * Refreshes the access token.
     * @param refreshToken Unused parameter
     */
    async refreshTokenNoCache() {
      const tokenPath = `service-accounts/${this.serviceAccountEmail}/token`;
      let data;
      try {
        const instanceOptions = {
          property: tokenPath
        };
        if (this.scopes.length > 0) {
          instanceOptions.params = {
            scopes: this.scopes.join(",")
          };
        }
        data = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError) {
          e.message = `Could not refresh access token: ${e.message}`;
          this.wrapError(e);
        }
        throw e;
      }
      const tokens = data;
      if (data && data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res: null };
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const idTokenPath = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${targetAudience}`;
      let idToken;
      try {
        const instanceOptions = {
          property: idTokenPath
        };
        idToken = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Could not fetch ID token: ${e.message}`;
        }
        throw e;
      }
      return idToken;
    }
    wrapError(e) {
      const res = e.response;
      if (res && res.status) {
        e.status = res.status;
        if (res.status === 403) {
          e.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + e.message;
        } else if (res.status === 404) {
          e.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + e.message;
        }
      }
    }
  }
  computeclient$1.Compute = Compute;
  return computeclient$1;
}
var idtokenclient$1 = {};
var hasRequiredIdtokenclient$1;
function requireIdtokenclient$1() {
  if (hasRequiredIdtokenclient$1) return idtokenclient$1;
  hasRequiredIdtokenclient$1 = 1;
  Object.defineProperty(idtokenclient$1, "__esModule", { value: true });
  idtokenclient$1.IdTokenClient = void 0;
  const oauth2client_1 = requireOauth2client$1();
  class IdTokenClient extends oauth2client_1.OAuth2Client {
    targetAudience;
    idTokenProvider;
    /**
     * Google ID Token client
     *
     * Retrieve ID token from the metadata server.
     * See: https://cloud.google.com/docs/authentication/get-id-token#metadata-server
     */
    constructor(options2) {
      super(options2);
      this.targetAudience = options2.targetAudience;
      this.idTokenProvider = options2.idTokenProvider;
    }
    async getRequestMetadataAsync() {
      if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
        const idToken = await this.idTokenProvider.fetchIdToken(this.targetAudience);
        this.credentials = {
          id_token: idToken,
          expiry_date: this.getIdTokenExpiryDate(idToken)
        };
      }
      const headers = new Headers({
        authorization: "Bearer " + this.credentials.id_token
      });
      return { headers };
    }
    getIdTokenExpiryDate(idToken) {
      const payloadB64 = idToken.split(".")[1];
      if (payloadB64) {
        const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString("ascii"));
        return payload.exp * 1e3;
      }
    }
  }
  idtokenclient$1.IdTokenClient = IdTokenClient;
  return idtokenclient$1;
}
var envDetect$1 = {};
var hasRequiredEnvDetect$1;
function requireEnvDetect$1() {
  if (hasRequiredEnvDetect$1) return envDetect$1;
  hasRequiredEnvDetect$1 = 1;
  Object.defineProperty(envDetect$1, "__esModule", { value: true });
  envDetect$1.GCPEnv = void 0;
  envDetect$1.clear = clear;
  envDetect$1.getEnv = getEnv;
  const gcpMetadata = requireSrc$5();
  var GCPEnv;
  (function(GCPEnv2) {
    GCPEnv2["APP_ENGINE"] = "APP_ENGINE";
    GCPEnv2["KUBERNETES_ENGINE"] = "KUBERNETES_ENGINE";
    GCPEnv2["CLOUD_FUNCTIONS"] = "CLOUD_FUNCTIONS";
    GCPEnv2["COMPUTE_ENGINE"] = "COMPUTE_ENGINE";
    GCPEnv2["CLOUD_RUN"] = "CLOUD_RUN";
    GCPEnv2["CLOUD_RUN_JOBS"] = "CLOUD_RUN_JOBS";
    GCPEnv2["NONE"] = "NONE";
  })(GCPEnv || (envDetect$1.GCPEnv = GCPEnv = {}));
  let envPromise;
  function clear() {
    envPromise = void 0;
  }
  async function getEnv() {
    if (envPromise) {
      return envPromise;
    }
    envPromise = getEnvMemoized();
    return envPromise;
  }
  async function getEnvMemoized() {
    let env = GCPEnv.NONE;
    if (isAppEngine()) {
      env = GCPEnv.APP_ENGINE;
    } else if (isCloudFunction()) {
      env = GCPEnv.CLOUD_FUNCTIONS;
    } else if (await isComputeEngine()) {
      if (await isKubernetesEngine()) {
        env = GCPEnv.KUBERNETES_ENGINE;
      } else if (isCloudRun()) {
        env = GCPEnv.CLOUD_RUN;
      } else if (isCloudRunJob()) {
        env = GCPEnv.CLOUD_RUN_JOBS;
      } else {
        env = GCPEnv.COMPUTE_ENGINE;
      }
    } else {
      env = GCPEnv.NONE;
    }
    return env;
  }
  function isAppEngine() {
    return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME);
  }
  function isCloudFunction() {
    return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET);
  }
  function isCloudRun() {
    return !!process.env.K_CONFIGURATION;
  }
  function isCloudRunJob() {
    return !!process.env.CLOUD_RUN_JOB;
  }
  async function isKubernetesEngine() {
    try {
      await gcpMetadata.instance("attributes/cluster-name");
      return true;
    } catch (e) {
      return false;
    }
  }
  async function isComputeEngine() {
    return gcpMetadata.isAvailable();
  }
  return envDetect$1;
}
var jwtclient$1 = {};
var jwtaccess$1 = {};
var hasRequiredJwtaccess$1;
function requireJwtaccess$1() {
  if (hasRequiredJwtaccess$1) return jwtaccess$1;
  hasRequiredJwtaccess$1 = 1;
  Object.defineProperty(jwtaccess$1, "__esModule", { value: true });
  jwtaccess$1.JWTAccess = void 0;
  const jws = requireJws();
  const util_1 = requireUtil$1();
  const DEFAULT_HEADER = {
    alg: "RS256",
    typ: "JWT"
  };
  class JWTAccess {
    email;
    key;
    keyId;
    projectId;
    eagerRefreshThresholdMillis;
    cache = new util_1.LRUCache({
      capacity: 500,
      maxAge: 60 * 60 * 1e3
    });
    /**
     * JWTAccess service account credentials.
     *
     * Create a new access token by using the credential to create a new JWT token
     * that's recognized as the access token.
     *
     * @param email the service account email address.
     * @param key the private key that will be used to sign the token.
     * @param keyId the ID of the private key used to sign the token.
     */
    constructor(email, key, keyId, eagerRefreshThresholdMillis) {
      this.email = email;
      this.key = key;
      this.keyId = keyId;
      this.eagerRefreshThresholdMillis = eagerRefreshThresholdMillis ?? 5 * 60 * 1e3;
    }
    /**
     * Ensures that we're caching a key appropriately, giving precedence to scopes vs. url
     *
     * @param url The URI being authorized.
     * @param scopes The scope or scopes being authorized
     * @returns A string that returns the cached key.
     */
    getCachedKey(url, scopes) {
      let cacheKey = url;
      if (scopes && Array.isArray(scopes) && scopes.length) {
        cacheKey = url ? `${url}_${scopes.join("_")}` : `${scopes.join("_")}`;
      } else if (typeof scopes === "string") {
        cacheKey = url ? `${url}_${scopes}` : scopes;
      }
      if (!cacheKey) {
        throw Error("Scopes or url must be provided");
      }
      return cacheKey;
    }
    /**
     * Get a non-expired access token, after refreshing if necessary.
     *
     * @param url The URI being authorized.
     * @param additionalClaims An object with a set of additional claims to
     * include in the payload.
     * @returns An object that includes the authorization header.
     */
    getRequestHeaders(url, additionalClaims, scopes) {
      const key = this.getCachedKey(url, scopes);
      const cachedToken = this.cache.get(key);
      const now = Date.now();
      if (cachedToken && cachedToken.expiration - now > this.eagerRefreshThresholdMillis) {
        return new Headers(cachedToken.headers);
      }
      const iat = Math.floor(Date.now() / 1e3);
      const exp = JWTAccess.getExpirationTime(iat);
      let defaultClaims;
      if (Array.isArray(scopes)) {
        scopes = scopes.join(" ");
      }
      if (scopes) {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          scope: scopes,
          exp,
          iat
        };
      } else {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          aud: url,
          exp,
          iat
        };
      }
      if (additionalClaims) {
        for (const claim in defaultClaims) {
          if (additionalClaims[claim]) {
            throw new Error(`The '${claim}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`);
          }
        }
      }
      const header = this.keyId ? { ...DEFAULT_HEADER, kid: this.keyId } : DEFAULT_HEADER;
      const payload = Object.assign(defaultClaims, additionalClaims);
      const signedJWT = jws.sign({ header, payload, secret: this.key });
      const headers = new Headers({ authorization: `Bearer ${signedJWT}` });
      this.cache.set(key, {
        expiration: exp * 1e3,
        headers
      });
      return headers;
    }
    /**
     * Returns an expiration time for the JWT token.
     *
     * @param iat The issued at time for the JWT.
     * @returns An expiration time for the JWT.
     */
    static getExpirationTime(iat) {
      const exp = iat + 3600;
      return exp;
    }
    /**
     * Create a JWTAccess credentials instance using the given input options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          reject(new Error("Must pass in a stream containing the service account auth settings."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("data", (chunk) => s += chunk).on("error", reject).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }
  jwtaccess$1.JWTAccess = JWTAccess;
  return jwtaccess$1;
}
var hasRequiredJwtclient$1;
function requireJwtclient$1() {
  if (hasRequiredJwtclient$1) return jwtclient$1;
  hasRequiredJwtclient$1 = 1;
  Object.defineProperty(jwtclient$1, "__esModule", { value: true });
  jwtclient$1.JWT = void 0;
  const gtoken_1 = requireSrc$7();
  const jwtaccess_1 = requireJwtaccess$1();
  const oauth2client_1 = requireOauth2client$1();
  const authclient_1 = requireAuthclient$1();
  class JWT extends oauth2client_1.OAuth2Client {
    email;
    keyFile;
    key;
    keyId;
    defaultScopes;
    scopes;
    scope;
    subject;
    gtoken;
    additionalClaims;
    useJWTAccessWithScope;
    defaultServicePath;
    access;
    /**
     * JWT service account credentials.
     *
     * Retrieve access token using gtoken.
     *
     * @param options the
     */
    constructor(options2 = {}) {
      super(options2);
      this.email = options2.email;
      this.keyFile = options2.keyFile;
      this.key = options2.key;
      this.keyId = options2.keyId;
      this.scopes = options2.scopes;
      this.subject = options2.subject;
      this.additionalClaims = options2.additionalClaims;
      this.credentials = { refresh_token: "jwt-placeholder", expiry_date: 1 };
    }
    /**
     * Creates a copy of the credential with the specified scopes.
     * @param scopes List of requested scopes or a single scope.
     * @return The cloned instance.
     */
    createScoped(scopes) {
      const jwt = new JWT(this);
      jwt.scopes = scopes;
      return jwt;
    }
    /**
     * Obtains the metadata to be sent with the request.
     *
     * @param url the URI being authorized.
     */
    async getRequestMetadataAsync(url) {
      url = this.defaultServicePath ? `https://${this.defaultServicePath}/` : url;
      const useSelfSignedJWT = !this.hasUserScopes() && url || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
      if (this.subject && this.universeDomain !== authclient_1.DEFAULT_UNIVERSE) {
        throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${authclient_1.DEFAULT_UNIVERSE}`);
      }
      if (!this.apiKey && useSelfSignedJWT) {
        if (this.additionalClaims && this.additionalClaims.target_audience) {
          const { tokens } = await this.refreshToken();
          return {
            headers: this.addSharedMetadataHeaders(new Headers({
              authorization: `Bearer ${tokens.id_token}`
            }))
          };
        } else {
          if (!this.access) {
            this.access = new jwtaccess_1.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
          }
          let scopes;
          if (this.hasUserScopes()) {
            scopes = this.scopes;
          } else if (!url) {
            scopes = this.defaultScopes;
          }
          const useScopes = this.useJWTAccessWithScope || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
          const headers = await this.access.getRequestHeaders(
            url ?? void 0,
            this.additionalClaims,
            // Scopes take precedent over audience for signing,
            // so we only provide them if `useJWTAccessWithScope` is on or
            // if we are in a non-default universe
            useScopes ? scopes : void 0
          );
          return { headers: this.addSharedMetadataHeaders(headers) };
        }
      } else if (this.hasAnyScopes() || this.apiKey) {
        return super.getRequestMetadataAsync(url);
      } else {
        return { headers: new Headers() };
      }
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const gtoken = new gtoken_1.GoogleToken({
        iss: this.email,
        sub: this.subject,
        scope: this.scopes || this.defaultScopes,
        keyFile: this.keyFile,
        key: this.key,
        additionalClaims: { target_audience: targetAudience },
        transporter: this.transporter
      });
      await gtoken.getToken({
        forceRefresh: true
      });
      if (!gtoken.idToken) {
        throw new Error("Unknown error: Failed to fetch ID token");
      }
      return gtoken.idToken;
    }
    /**
     * Determine if there are currently scopes available.
     */
    hasUserScopes() {
      if (!this.scopes) {
        return false;
      }
      return this.scopes.length > 0;
    }
    /**
     * Are there any default or user scopes defined.
     */
    hasAnyScopes() {
      if (this.scopes && this.scopes.length > 0)
        return true;
      if (this.defaultScopes && this.defaultScopes.length > 0)
        return true;
      return false;
    }
    authorize(callback) {
      if (callback) {
        this.authorizeAsync().then((r) => callback(null, r), callback);
      } else {
        return this.authorizeAsync();
      }
    }
    async authorizeAsync() {
      const result = await this.refreshToken();
      if (!result) {
        throw new Error("No result returned");
      }
      this.credentials = result.tokens;
      this.credentials.refresh_token = "jwt-placeholder";
      this.key = this.gtoken.key;
      this.email = this.gtoken.iss;
      return result.tokens;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken ignored
     * @private
     */
    async refreshTokenNoCache() {
      const gtoken = this.createGToken();
      const token = await gtoken.getToken({
        forceRefresh: this.isTokenExpiring()
      });
      const tokens = {
        access_token: token.access_token,
        token_type: "Bearer",
        expiry_date: gtoken.expiresAt,
        id_token: gtoken.idToken
      };
      this.emit("tokens", tokens);
      return { res: null, tokens };
    }
    /**
     * Create a gToken if it doesn't already exist.
     */
    createGToken() {
      if (!this.gtoken) {
        this.gtoken = new gtoken_1.GoogleToken({
          iss: this.email,
          sub: this.subject,
          scope: this.scopes || this.defaultScopes,
          keyFile: this.keyFile,
          key: this.key,
          additionalClaims: this.additionalClaims,
          transporter: this.transporter
        });
      }
      return this.gtoken;
    }
    /**
     * Create a JWT credentials instance using the given input options.
     * @param json The input object.
     *
     * @remarks
     *
     * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          throw new Error("Must pass in a stream containing the service account auth settings.");
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    /**
     * Creates a JWT credentials instance using an API Key for authentication.
     * @param apiKey The API Key in string form.
     */
    fromAPIKey(apiKey) {
      if (typeof apiKey !== "string") {
        throw new Error("Must provide an API Key string.");
      }
      this.apiKey = apiKey;
    }
    /**
     * Using the key or keyFile on the JWT client, obtain an object that contains
     * the key and the client email.
     */
    async getCredentials() {
      if (this.key) {
        return { private_key: this.key, client_email: this.email };
      } else if (this.keyFile) {
        const gtoken = this.createGToken();
        const creds = await gtoken.getCredentials(this.keyFile);
        return { private_key: creds.privateKey, client_email: creds.clientEmail };
      }
      throw new Error("A key or a keyFile must be provided to getCredentials.");
    }
  }
  jwtclient$1.JWT = JWT;
  return jwtclient$1;
}
var refreshclient$1 = {};
var hasRequiredRefreshclient$1;
function requireRefreshclient$1() {
  if (hasRequiredRefreshclient$1) return refreshclient$1;
  hasRequiredRefreshclient$1 = 1;
  Object.defineProperty(refreshclient$1, "__esModule", { value: true });
  refreshclient$1.UserRefreshClient = refreshclient$1.USER_REFRESH_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client$1();
  const authclient_1 = requireAuthclient$1();
  refreshclient$1.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
  class UserRefreshClient extends oauth2client_1.OAuth2Client {
    // TODO: refactor tests to make this private
    // In a future gts release, the _propertyName rule will be lifted.
    // This is also a hard one because `this.refreshToken` is a function.
    _refreshToken;
    /**
     * The User Refresh Token client.
     *
     * @param optionsOrClientId The User Refresh Token client options. Passing an `clientId` directly is **@DEPRECATED**.
     * @param clientSecret **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param refreshToken **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param eagerRefreshThresholdMillis **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     * @param forceRefreshOnFailure **@DEPRECATED**. Provide a {@link UserRefreshClientOptions `UserRefreshClientOptions`} object in the first parameter instead.
     */
    constructor(optionsOrClientId, clientSecret, refreshToken, eagerRefreshThresholdMillis, forceRefreshOnFailure) {
      const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : {
        clientId: optionsOrClientId,
        clientSecret,
        refreshToken,
        eagerRefreshThresholdMillis,
        forceRefreshOnFailure
      };
      super(opts);
      this._refreshToken = opts.refreshToken;
      this.credentials.refresh_token = opts.refreshToken;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken An ignored refreshToken..
     * @param callback Optional callback.
     */
    async refreshTokenNoCache() {
      return super.refreshTokenNoCache(this._refreshToken);
    }
    async fetchIdToken(targetAudience) {
      const opts = {
        ...UserRefreshClient.RETRY_CONFIG,
        url: this.endpoints.oauth2TokenUrl,
        method: "POST",
        data: new URLSearchParams({
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token",
          refresh_token: this._refreshToken,
          target_audience: targetAudience
        })
      };
      authclient_1.AuthClient.setMethodName(opts, "fetchIdToken");
      const res = await this.transporter.request(opts);
      return res.data.id_token;
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the user refresh token");
      }
      if (json.type !== "authorized_user") {
        throw new Error('The incoming JSON object does not have the "authorized_user" type');
      }
      if (!json.client_id) {
        throw new Error("The incoming JSON object does not contain a client_id field");
      }
      if (!json.client_secret) {
        throw new Error("The incoming JSON object does not contain a client_secret field");
      }
      if (!json.refresh_token) {
        throw new Error("The incoming JSON object does not contain a refresh_token field");
      }
      this._clientId = json.client_id;
      this._clientSecret = json.client_secret;
      this._refreshToken = json.refresh_token;
      this.credentials.refresh_token = json.refresh_token;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    async fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          return reject(new Error("Must pass in a stream containing the user refresh token."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            return resolve();
          } catch (err) {
            return reject(err);
          }
        });
      });
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    static fromJSON(json) {
      const client = new UserRefreshClient();
      client.fromJSON(json);
      return client;
    }
  }
  refreshclient$1.UserRefreshClient = UserRefreshClient;
  return refreshclient$1;
}
var impersonated$1 = {};
var hasRequiredImpersonated$1;
function requireImpersonated$1() {
  if (hasRequiredImpersonated$1) return impersonated$1;
  hasRequiredImpersonated$1 = 1;
  Object.defineProperty(impersonated$1, "__esModule", { value: true });
  impersonated$1.Impersonated = impersonated$1.IMPERSONATED_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client$1();
  const gaxios_1 = requireSrc$6();
  const util_1 = requireUtil$1();
  impersonated$1.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
  class Impersonated extends oauth2client_1.OAuth2Client {
    sourceClient;
    targetPrincipal;
    targetScopes;
    delegates;
    lifetime;
    endpoint;
    /**
     * Impersonated service account credentials.
     *
     * Create a new access token by impersonating another service account.
     *
     * Impersonated Credentials allowing credentials issued to a user or
     * service account to impersonate another. The source project using
     * Impersonated Credentials must enable the "IAMCredentials" API.
     * Also, the target service account must grant the orginating principal
     * the "Service Account Token Creator" IAM role.
     *
     * **IMPORTANT**: This method does not validate the credential configuration.
     * A security risk occurs when a credential configuration configured with
     * malicious URLs is used. When the credential configuration is accepted from
     * an untrusted source, you should validate it before using it with this
     * method. For more details, see
     * https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
     *
     * @param {object} options - The configuration object.
     * @param {object} [options.sourceClient] the source credential used as to
     * acquire the impersonated credentials.
     * @param {string} [options.targetPrincipal] the service account to
     * impersonate.
     * @param {string[]} [options.delegates] the chained list of delegates
     * required to grant the final access_token. If set, the sequence of
     * identities must have "Service Account Token Creator" capability granted to
     * the preceding identity. For example, if set to [serviceAccountB,
     * serviceAccountC], the sourceCredential must have the Token Creator role on
     * serviceAccountB. serviceAccountB must have the Token Creator on
     * serviceAccountC. Finally, C must have Token Creator on target_principal.
     * If left unset, sourceCredential must have that role on targetPrincipal.
     * @param {string[]} [options.targetScopes] scopes to request during the
     * authorization grant.
     * @param {number} [options.lifetime] number of seconds the delegated
     * credential should be valid for up to 3600 seconds by default, or 43,200
     * seconds by extending the token's lifetime, see:
     * https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials#sa-credentials-oauth
     * @param {string} [options.endpoint] api endpoint override.
     */
    constructor(options2 = {}) {
      super(options2);
      this.credentials = {
        expiry_date: 1,
        refresh_token: "impersonated-placeholder"
      };
      this.sourceClient = options2.sourceClient ?? new oauth2client_1.OAuth2Client();
      this.targetPrincipal = options2.targetPrincipal ?? "";
      this.delegates = options2.delegates ?? [];
      this.targetScopes = options2.targetScopes ?? [];
      this.lifetime = options2.lifetime ?? 3600;
      const usingExplicitUniverseDomain = !!(0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
      if (!usingExplicitUniverseDomain) {
        this.universeDomain = this.sourceClient.universeDomain;
      } else if (this.sourceClient.universeDomain !== this.universeDomain) {
        throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
      }
      this.endpoint = options2.endpoint ?? `https://iamcredentials.${this.universeDomain}`;
    }
    /**
     * Signs some bytes.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob Reference Documentation}
     * @param blobToSign String to sign.
     *
     * @returns A {@link SignBlobResponse} denoting the keyID and signedBlob in base64 string
     */
    async sign(blobToSign) {
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:signBlob`;
      const body = {
        delegates: this.delegates,
        payload: Buffer.from(blobToSign).toString("base64")
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data;
    }
    /** The service account email to be impersonated. */
    getTargetPrincipal() {
      return this.targetPrincipal;
    }
    /**
     * Refreshes the access token.
     */
    async refreshToken() {
      try {
        await this.sourceClient.getAccessToken();
        const name2 = "projects/-/serviceAccounts/" + this.targetPrincipal;
        const u = `${this.endpoint}/v1/${name2}:generateAccessToken`;
        const body = {
          delegates: this.delegates,
          scope: this.targetScopes,
          lifetime: this.lifetime + "s"
        };
        const res = await this.sourceClient.request({
          ...Impersonated.RETRY_CONFIG,
          url: u,
          data: body,
          method: "POST"
        });
        const tokenResponse = res.data;
        this.credentials.access_token = tokenResponse.accessToken;
        this.credentials.expiry_date = Date.parse(tokenResponse.expireTime);
        return {
          tokens: this.credentials,
          res
        };
      } catch (error) {
        if (!(error instanceof Error))
          throw error;
        let status = 0;
        let message = "";
        if (error instanceof gaxios_1.GaxiosError) {
          status = error?.response?.data?.error?.status;
          message = error?.response?.data?.error?.message;
        }
        if (status && message) {
          error.message = `${status}: unable to impersonate: ${message}`;
          throw error;
        } else {
          error.message = `unable to impersonate: ${error}`;
          throw error;
        }
      }
    }
    /**
     * Generates an OpenID Connect ID token for a service account.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/generateIdToken Reference Documentation}
     *
     * @param targetAudience the audience for the fetched ID token.
     * @param options the for the request
     * @return an OpenID Connect ID token
     */
    async fetchIdToken(targetAudience, options2) {
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:generateIdToken`;
      const body = {
        delegates: this.delegates,
        audience: targetAudience,
        includeEmail: options2?.includeEmail ?? true,
        useEmailAzp: options2?.includeEmail ?? true
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data.token;
    }
  }
  impersonated$1.Impersonated = Impersonated;
  return impersonated$1;
}
var externalclient$1 = {};
var baseexternalclient$1 = {};
var stscredentials$1 = {};
var oauth2common$1 = {};
var hasRequiredOauth2common$1;
function requireOauth2common$1() {
  if (hasRequiredOauth2common$1) return oauth2common$1;
  hasRequiredOauth2common$1 = 1;
  Object.defineProperty(oauth2common$1, "__esModule", { value: true });
  oauth2common$1.OAuthClientAuthHandler = void 0;
  oauth2common$1.getErrorFromOAuthErrorResponse = getErrorFromOAuthErrorResponse;
  const gaxios_1 = requireSrc$6();
  const crypto_1 = requireCrypto$3();
  const METHODS_SUPPORTING_REQUEST_BODY = ["PUT", "POST", "PATCH"];
  class OAuthClientAuthHandler {
    #crypto = (0, crypto_1.createCrypto)();
    #clientAuthentication;
    transporter;
    /**
     * Instantiates an OAuth client authentication handler.
     * @param options The OAuth Client Auth Handler instance options. Passing an `ClientAuthentication` directly is **@DEPRECATED**.
     */
    constructor(options2) {
      if (options2 && "clientId" in options2) {
        this.#clientAuthentication = options2;
        this.transporter = new gaxios_1.Gaxios();
      } else {
        this.#clientAuthentication = options2?.clientAuthentication;
        this.transporter = options2?.transporter || new gaxios_1.Gaxios();
      }
    }
    /**
     * Applies client authentication on the OAuth request's headers or POST
     * body but does not process the request.
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    applyClientAuthenticationOptions(opts, bearerToken) {
      opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
      this.injectAuthenticatedHeaders(opts, bearerToken);
      if (!bearerToken) {
        this.injectAuthenticatedRequestBody(opts);
      }
    }
    /**
     * Applies client authentication on the request's header if either
     * basic authentication or bearer token authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    injectAuthenticatedHeaders(opts, bearerToken) {
      if (bearerToken) {
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers, {
          authorization: `Bearer ${bearerToken}`
        });
      } else if (this.#clientAuthentication?.confidentialClientType === "basic") {
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        const clientId = this.#clientAuthentication.clientId;
        const clientSecret = this.#clientAuthentication.clientSecret || "";
        const base64EncodedCreds = this.#crypto.encodeBase64StringUtf8(`${clientId}:${clientSecret}`);
        gaxios_1.Gaxios.mergeHeaders(opts.headers, {
          authorization: `Basic ${base64EncodedCreds}`
        });
      }
    }
    /**
     * Applies client authentication on the request's body if request-body
     * client authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     */
    injectAuthenticatedRequestBody(opts) {
      if (this.#clientAuthentication?.confidentialClientType === "request-body") {
        const method = (opts.method || "GET").toUpperCase();
        if (!METHODS_SUPPORTING_REQUEST_BODY.includes(method)) {
          throw new Error(`${method} HTTP method does not support ${this.#clientAuthentication.confidentialClientType} client authentication`);
        }
        const headers = new Headers(opts.headers);
        const contentType = headers.get("content-type");
        if (contentType?.startsWith("application/x-www-form-urlencoded") || opts.data instanceof URLSearchParams) {
          const data = new URLSearchParams(opts.data ?? "");
          data.append("client_id", this.#clientAuthentication.clientId);
          data.append("client_secret", this.#clientAuthentication.clientSecret || "");
          opts.data = data;
        } else if (contentType?.startsWith("application/json")) {
          opts.data = opts.data || {};
          Object.assign(opts.data, {
            client_id: this.#clientAuthentication.clientId,
            client_secret: this.#clientAuthentication.clientSecret || ""
          });
        } else {
          throw new Error(`${contentType} content-types are not supported with ${this.#clientAuthentication.confidentialClientType} client authentication`);
        }
      }
    }
    /**
     * Retry config for Auth-related requests.
     *
     * @remarks
     *
     * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
     * config as some downstream APIs would prefer if customers explicitly enable retries,
     * such as GCS.
     */
    static get RETRY_CONFIG() {
      return {
        retry: true,
        retryConfig: {
          httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
        }
      };
    }
  }
  oauth2common$1.OAuthClientAuthHandler = OAuthClientAuthHandler;
  function getErrorFromOAuthErrorResponse(resp, err) {
    const errorCode = resp.error;
    const errorDescription = resp.error_description;
    const errorUri = resp.error_uri;
    let message = `Error code ${errorCode}`;
    if (typeof errorDescription !== "undefined") {
      message += `: ${errorDescription}`;
    }
    if (typeof errorUri !== "undefined") {
      message += ` - ${errorUri}`;
    }
    const newError = new Error(message);
    if (err) {
      const keys = Object.keys(err);
      if (err.stack) {
        keys.push("stack");
      }
      keys.forEach((key) => {
        if (key !== "message") {
          Object.defineProperty(newError, key, {
            value: err[key],
            writable: false,
            enumerable: true
          });
        }
      });
    }
    return newError;
  }
  return oauth2common$1;
}
var hasRequiredStscredentials$1;
function requireStscredentials$1() {
  if (hasRequiredStscredentials$1) return stscredentials$1;
  hasRequiredStscredentials$1 = 1;
  Object.defineProperty(stscredentials$1, "__esModule", { value: true });
  stscredentials$1.StsCredentials = void 0;
  const gaxios_1 = requireSrc$6();
  const authclient_1 = requireAuthclient$1();
  const oauth2common_1 = requireOauth2common$1();
  const util_1 = requireUtil$1();
  class StsCredentials extends oauth2common_1.OAuthClientAuthHandler {
    #tokenExchangeEndpoint;
    /**
     * Initializes an STS credentials instance.
     *
     * @param options The STS credentials instance options. Passing an `tokenExchangeEndpoint` directly is **@DEPRECATED**.
     * @param clientAuthentication **@DEPRECATED**. Provide a {@link StsCredentialsConstructionOptions `StsCredentialsConstructionOptions`} object in the first parameter instead.
     */
    constructor(options2 = {
      tokenExchangeEndpoint: ""
    }, clientAuthentication) {
      if (typeof options2 !== "object" || options2 instanceof URL) {
        options2 = {
          tokenExchangeEndpoint: options2,
          clientAuthentication
        };
      }
      super(options2);
      this.#tokenExchangeEndpoint = options2.tokenExchangeEndpoint;
    }
    /**
     * Exchanges the provided token for another type of token based on the
     * rfc8693 spec.
     * @param stsCredentialsOptions The token exchange options used to populate
     *   the token exchange request.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @param options Optional additional GCP-specific non-spec defined options
     *   to send with the request.
     *   Example: `&options=${encodeUriComponent(JSON.stringified(options))}`
     * @return A promise that resolves with the token exchange response containing
     *   the requested token and its expiration time.
     */
    async exchangeToken(stsCredentialsOptions, headers, options2) {
      const values = {
        grant_type: stsCredentialsOptions.grantType,
        resource: stsCredentialsOptions.resource,
        audience: stsCredentialsOptions.audience,
        scope: stsCredentialsOptions.scope?.join(" "),
        requested_token_type: stsCredentialsOptions.requestedTokenType,
        subject_token: stsCredentialsOptions.subjectToken,
        subject_token_type: stsCredentialsOptions.subjectTokenType,
        actor_token: stsCredentialsOptions.actingParty?.actorToken,
        actor_token_type: stsCredentialsOptions.actingParty?.actorTokenType,
        // Non-standard GCP-specific options.
        options: options2 && JSON.stringify(options2)
      };
      const opts = {
        ...StsCredentials.RETRY_CONFIG,
        url: this.#tokenExchangeEndpoint.toString(),
        method: "POST",
        headers,
        data: new URLSearchParams((0, util_1.removeUndefinedValuesInObject)(values))
      };
      authclient_1.AuthClient.setMethodName(opts, "exchangeToken");
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const stsSuccessfulResponse = response.data;
        stsSuccessfulResponse.res = response;
        return stsSuccessfulResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  stscredentials$1.StsCredentials = StsCredentials;
  return stscredentials$1;
}
var hasRequiredBaseexternalclient$1;
function requireBaseexternalclient$1() {
  if (hasRequiredBaseexternalclient$1) return baseexternalclient$1;
  hasRequiredBaseexternalclient$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseExternalAccountClient = exports.CLOUD_RESOURCE_MANAGER = exports.EXTERNAL_ACCOUNT_TYPE = exports.EXPIRATION_TIME_OFFSET = void 0;
    const gaxios_1 = requireSrc$6();
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient$1();
    const sts = requireStscredentials$1();
    const util_1 = requireUtil$1();
    const shared_cjs_1 = requireShared();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const DEFAULT_OAUTH_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
    const DEFAULT_TOKEN_LIFESPAN = 3600;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    exports.EXTERNAL_ACCOUNT_TYPE = "external_account";
    exports.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
    const WORKFORCE_AUDIENCE_PATTERN = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+";
    const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/token";
    class BaseExternalAccountClient extends authclient_1.AuthClient {
      /**
       * OAuth scopes for the GCP access token to use. When not provided,
       * the default https://www.googleapis.com/auth/cloud-platform is
       * used.
       */
      scopes;
      projectNumber;
      audience;
      subjectTokenType;
      stsCredential;
      clientAuth;
      credentialSourceType;
      cachedAccessToken;
      serviceAccountImpersonationUrl;
      serviceAccountImpersonationLifetime;
      workforcePoolUserProject;
      configLifetimeRequested;
      tokenUrl;
      /**
       * @example
       * ```ts
       * new URL('https://cloudresourcemanager.googleapis.com/v1/projects/');
       * ```
       */
      cloudResourceManagerURL;
      supplierContext;
      /**
       * A pending access token request. Used for concurrent calls.
       */
      #pendingAccessToken = null;
      /**
       * Instantiate a BaseExternalAccountClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file. The camelCased options
       *   are aliases for the snake_cased options.
       */
      constructor(options2) {
        super(options2);
        const opts = (0, util_1.originalOrCamelOptions)(options2);
        const type = opts.get("type");
        if (type && type !== exports.EXTERNAL_ACCOUNT_TYPE) {
          throw new Error(`Expected "${exports.EXTERNAL_ACCOUNT_TYPE}" type but received "${options2.type}"`);
        }
        const clientId = opts.get("client_id");
        const clientSecret = opts.get("client_secret");
        this.tokenUrl = opts.get("token_url") ?? DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain);
        const subjectTokenType = opts.get("subject_token_type");
        const workforcePoolUserProject = opts.get("workforce_pool_user_project");
        const serviceAccountImpersonationUrl = opts.get("service_account_impersonation_url");
        const serviceAccountImpersonation = opts.get("service_account_impersonation");
        const serviceAccountImpersonationLifetime = (0, util_1.originalOrCamelOptions)(serviceAccountImpersonation).get("token_lifetime_seconds");
        this.cloudResourceManagerURL = new URL(opts.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`);
        if (clientId) {
          this.clientAuth = {
            confidentialClientType: "basic",
            clientId,
            clientSecret
          };
        }
        this.stsCredential = new sts.StsCredentials({
          tokenExchangeEndpoint: this.tokenUrl,
          clientAuthentication: this.clientAuth
        });
        this.scopes = opts.get("scopes") || [DEFAULT_OAUTH_SCOPE];
        this.cachedAccessToken = null;
        this.audience = opts.get("audience");
        this.subjectTokenType = subjectTokenType;
        this.workforcePoolUserProject = workforcePoolUserProject;
        const workforceAudiencePattern = new RegExp(WORKFORCE_AUDIENCE_PATTERN);
        if (this.workforcePoolUserProject && !this.audience.match(workforceAudiencePattern)) {
          throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
        }
        this.serviceAccountImpersonationUrl = serviceAccountImpersonationUrl;
        this.serviceAccountImpersonationLifetime = serviceAccountImpersonationLifetime;
        if (this.serviceAccountImpersonationLifetime) {
          this.configLifetimeRequested = true;
        } else {
          this.configLifetimeRequested = false;
          this.serviceAccountImpersonationLifetime = DEFAULT_TOKEN_LIFESPAN;
        }
        this.projectNumber = this.getProjectNumber(this.audience);
        this.supplierContext = {
          audience: this.audience,
          subjectTokenType: this.subjectTokenType,
          transporter: this.transporter
        };
      }
      /** The service account email to be impersonated, if available. */
      getServiceAccountEmail() {
        if (this.serviceAccountImpersonationUrl) {
          if (this.serviceAccountImpersonationUrl.length > 256) {
            throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
          }
          const re = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/;
          const result = re.exec(this.serviceAccountImpersonationUrl);
          return result?.groups?.email || null;
        }
        return null;
      }
      /**
       * Provides a mechanism to inject GCP access tokens directly.
       * When the provided credential expires, a new credential, using the
       * external account options, is retrieved.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        super.setCredentials(credentials);
        this.cachedAccessToken = credentials;
      }
      /**
       * @return A promise that resolves with the current GCP access token
       *   response. If the current credential is expired, a new one is retrieved.
       */
      async getAccessToken() {
        if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedAccessToken.access_token,
          res: this.cachedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = new Headers({
          authorization: `Bearer ${accessTokenResponse.token}`
        });
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * @return A promise that resolves with the project ID corresponding to the
       *   current workload identity pool or current workforce pool if
       *   determinable. For workforce pool credential, it returns the project ID
       *   corresponding to the workforcePoolUserProject.
       *   This is introduced to match the current pattern of using the Auth
       *   library:
       *   const projectId = await auth.getProjectId();
       *   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
       *   const res = await client.request({ url });
       *   The resource may not have permission
       *   (resourcemanager.projects.get) to call this API or the required
       *   scopes may not be selected:
       *   https://cloud.google.com/resource-manager/reference/rest/v1/projects/get#authorization-scopes
       */
      async getProjectId() {
        const projectNumber = this.projectNumber || this.workforcePoolUserProject;
        if (this.projectId) {
          return this.projectId;
        } else if (projectNumber) {
          const headers = await this.getRequestHeaders();
          const opts = {
            ...BaseExternalAccountClient.RETRY_CONFIG,
            headers,
            url: `${this.cloudResourceManagerURL.toString()}${projectNumber}`
          };
          authclient_1.AuthClient.setMethodName(opts, "getProjectId");
          const response = await this.transporter.request(opts);
          this.projectId = response.data.projectId;
          return this.projectId;
        }
        return null;
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
          this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * External credentials are exchanged for GCP access tokens via the token
       * exchange endpoint and other settings provided in the client options
       * object.
       * If the service_account_impersonation_url is provided, an additional
       * step to exchange the external account GCP access token for a service
       * account impersonated token is performed.
       * @return A promise that resolves with the fresh GCP access tokens.
       */
      async refreshAccessTokenAsync() {
        this.#pendingAccessToken = this.#pendingAccessToken || this.#internalRefreshAccessTokenAsync();
        try {
          return await this.#pendingAccessToken;
        } finally {
          this.#pendingAccessToken = null;
        }
      }
      async #internalRefreshAccessTokenAsync() {
        const subjectToken = await this.retrieveSubjectToken();
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          audience: this.audience,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: this.subjectTokenType,
          // generateAccessToken requires the provided access token to have
          // scopes:
          // https://www.googleapis.com/auth/iam or
          // https://www.googleapis.com/auth/cloud-platform
          // The new service account access token scopes will match the user
          // provided ones.
          scope: this.serviceAccountImpersonationUrl ? [DEFAULT_OAUTH_SCOPE] : this.getScopesArray()
        };
        const additionalOptions = !this.clientAuth && this.workforcePoolUserProject ? { userProject: this.workforcePoolUserProject } : void 0;
        const additionalHeaders = new Headers({
          "x-goog-api-client": this.getMetricsHeaderValue()
        });
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, additionalHeaders, additionalOptions);
        if (this.serviceAccountImpersonationUrl) {
          this.cachedAccessToken = await this.getImpersonatedAccessToken(stsResponse.access_token);
        } else if (stsResponse.expires_in) {
          this.cachedAccessToken = {
            access_token: stsResponse.access_token,
            expiry_date: (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3,
            res: stsResponse.res
          };
        } else {
          this.cachedAccessToken = {
            access_token: stsResponse.access_token,
            res: stsResponse.res
          };
        }
        this.credentials = {};
        Object.assign(this.credentials, this.cachedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedAccessToken.expiry_date,
          access_token: this.cachedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedAccessToken;
      }
      /**
       * Returns the workload identity pool project number if it is determinable
       * from the audience resource name.
       * @param audience The STS audience used to determine the project number.
       * @return The project number associated with the workload identity pool, if
       *   this can be determined from the STS audience field. Otherwise, null is
       *   returned.
       */
      getProjectNumber(audience) {
        const match = audience.match(/\/projects\/([^/]+)/);
        if (!match) {
          return null;
        }
        return match[1];
      }
      /**
       * Exchanges an external account GCP access token for a service
       * account impersonated access token using iamcredentials
       * GenerateAccessToken API.
       * @param token The access token to exchange for a service account access
       *   token.
       * @return A promise that resolves with the service account impersonated
       *   credentials response.
       */
      async getImpersonatedAccessToken(token) {
        const opts = {
          ...BaseExternalAccountClient.RETRY_CONFIG,
          url: this.serviceAccountImpersonationUrl,
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`
          },
          data: {
            scope: this.getScopesArray(),
            lifetime: this.serviceAccountImpersonationLifetime + "s"
          }
        };
        authclient_1.AuthClient.setMethodName(opts, "getImpersonatedAccessToken");
        const response = await this.transporter.request(opts);
        const successResponse = response.data;
        return {
          access_token: successResponse.accessToken,
          // Convert from ISO format to timestamp.
          expiry_date: new Date(successResponse.expireTime).getTime(),
          res: response
        };
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param accessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(accessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return accessToken.expiry_date ? now >= accessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
      /**
       * @return The list of scopes for the requested GCP access token.
       */
      getScopesArray() {
        if (typeof this.scopes === "string") {
          return [this.scopes];
        }
        return this.scopes || [DEFAULT_OAUTH_SCOPE];
      }
      getMetricsHeaderValue() {
        const nodeVersion = process.version.replace(/^v/, "");
        const saImpersonation = this.serviceAccountImpersonationUrl !== void 0;
        const credentialSourceType = this.credentialSourceType ? this.credentialSourceType : "unknown";
        return `gl-node/${nodeVersion} auth/${shared_cjs_1.pkg.version} google-byoid-sdk source/${credentialSourceType} sa-impersonation/${saImpersonation} config-lifetime/${this.configLifetimeRequested}`;
      }
      getTokenUrl() {
        return this.tokenUrl;
      }
    }
    exports.BaseExternalAccountClient = BaseExternalAccountClient;
  })(baseexternalclient$1);
  return baseexternalclient$1;
}
var identitypoolclient$1 = {};
var filesubjecttokensupplier$1 = {};
var hasRequiredFilesubjecttokensupplier$1;
function requireFilesubjecttokensupplier$1() {
  if (hasRequiredFilesubjecttokensupplier$1) return filesubjecttokensupplier$1;
  hasRequiredFilesubjecttokensupplier$1 = 1;
  Object.defineProperty(filesubjecttokensupplier$1, "__esModule", { value: true });
  filesubjecttokensupplier$1.FileSubjectTokenSupplier = void 0;
  const util_1 = require$$0$6;
  const fs = require$$0$3;
  const readFile = (0, util_1.promisify)(fs.readFile ?? (() => {
  }));
  const realpath = (0, util_1.promisify)(fs.realpath ?? (() => {
  }));
  const lstat = (0, util_1.promisify)(fs.lstat ?? (() => {
  }));
  class FileSubjectTokenSupplier {
    filePath;
    formatType;
    subjectTokenFieldName;
    /**
     * Instantiates a new file based subject token supplier.
     * @param opts The file subject token supplier options to build the supplier
     *   with.
     */
    constructor(opts) {
      this.filePath = opts.filePath;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
    }
    /**
     * Returns the subject token stored at the file specified in the constructor.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken() {
      let parsedFilePath = this.filePath;
      try {
        parsedFilePath = await realpath(parsedFilePath);
        if (!(await lstat(parsedFilePath)).isFile()) {
          throw new Error();
        }
      } catch (err) {
        if (err instanceof Error) {
          err.message = `The file at ${parsedFilePath} does not exist, or it is not a file. ${err.message}`;
        }
        throw err;
      }
      let subjectToken;
      const rawText = await readFile(parsedFilePath, { encoding: "utf8" });
      if (this.formatType === "text") {
        subjectToken = rawText;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const json = JSON.parse(rawText);
        subjectToken = json[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source file");
      }
      return subjectToken;
    }
  }
  filesubjecttokensupplier$1.FileSubjectTokenSupplier = FileSubjectTokenSupplier;
  return filesubjecttokensupplier$1;
}
var urlsubjecttokensupplier$1 = {};
var hasRequiredUrlsubjecttokensupplier$1;
function requireUrlsubjecttokensupplier$1() {
  if (hasRequiredUrlsubjecttokensupplier$1) return urlsubjecttokensupplier$1;
  hasRequiredUrlsubjecttokensupplier$1 = 1;
  Object.defineProperty(urlsubjecttokensupplier$1, "__esModule", { value: true });
  urlsubjecttokensupplier$1.UrlSubjectTokenSupplier = void 0;
  const authclient_1 = requireAuthclient$1();
  class UrlSubjectTokenSupplier {
    url;
    headers;
    formatType;
    subjectTokenFieldName;
    additionalGaxiosOptions;
    /**
     * Instantiates a URL subject token supplier.
     * @param opts The URL subject token supplier options to build the supplier with.
     */
    constructor(opts) {
      this.url = opts.url;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
      this.headers = opts.headers;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Sends a GET request to the URL provided in the constructor and resolves
     * with the returned external subject token.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken(context) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.url,
        method: "GET",
        headers: this.headers
      };
      authclient_1.AuthClient.setMethodName(opts, "getSubjectToken");
      let subjectToken;
      if (this.formatType === "text") {
        const response = await context.transporter.request(opts);
        subjectToken = response.data;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const response = await context.transporter.request(opts);
        subjectToken = response.data[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source URL");
      }
      return subjectToken;
    }
  }
  urlsubjecttokensupplier$1.UrlSubjectTokenSupplier = UrlSubjectTokenSupplier;
  return urlsubjecttokensupplier$1;
}
var certificatesubjecttokensupplier = {};
var hasRequiredCertificatesubjecttokensupplier;
function requireCertificatesubjecttokensupplier() {
  if (hasRequiredCertificatesubjecttokensupplier) return certificatesubjecttokensupplier;
  hasRequiredCertificatesubjecttokensupplier = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CertificateSubjectTokenSupplier = exports.InvalidConfigurationError = exports.CertificateSourceUnavailableError = exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE = void 0;
    const util_1 = requireUtil$1();
    const fs = require$$0$3;
    const crypto_1 = require$$0$2;
    const https = require$$1$2;
    exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE = "GOOGLE_API_CERTIFICATE_CONFIG";
    class CertificateSourceUnavailableError extends Error {
      constructor(message) {
        super(message);
        this.name = "CertificateSourceUnavailableError";
      }
    }
    exports.CertificateSourceUnavailableError = CertificateSourceUnavailableError;
    class InvalidConfigurationError extends Error {
      constructor(message) {
        super(message);
        this.name = "InvalidConfigurationError";
      }
    }
    exports.InvalidConfigurationError = InvalidConfigurationError;
    class CertificateSubjectTokenSupplier {
      certificateConfigPath;
      trustChainPath;
      cert;
      key;
      /**
       * Initializes a new instance of the CertificateSubjectTokenSupplier.
       * @param opts The configuration options for the supplier.
       */
      constructor(opts) {
        if (!opts.useDefaultCertificateConfig && !opts.certificateConfigLocation) {
          throw new InvalidConfigurationError("Either `useDefaultCertificateConfig` must be true or a `certificateConfigLocation` must be provided.");
        }
        if (opts.useDefaultCertificateConfig && opts.certificateConfigLocation) {
          throw new InvalidConfigurationError("Both `useDefaultCertificateConfig` and `certificateConfigLocation` cannot be provided.");
        }
        this.trustChainPath = opts.trustChainPath;
        this.certificateConfigPath = opts.certificateConfigLocation ?? "";
      }
      /**
       * Creates an HTTPS agent configured with the client certificate and private key for mTLS.
       * @returns An mTLS-configured https.Agent.
       */
      async createMtlsHttpsAgent() {
        if (!this.key || !this.cert) {
          throw new InvalidConfigurationError("Cannot create mTLS Agent with missing certificate or key");
        }
        return new https.Agent({ key: this.key, cert: this.cert });
      }
      /**
       * Constructs the subject token, which is the base64-encoded certificate chain.
       * @returns A promise that resolves with the subject token.
       */
      async getSubjectToken() {
        this.certificateConfigPath = await this.#resolveCertificateConfigFilePath();
        const { certPath, keyPath } = await this.#getCertAndKeyPaths();
        ({ cert: this.cert, key: this.key } = await this.#getKeyAndCert(certPath, keyPath));
        return await this.#processChainFromPaths(this.cert);
      }
      /**
       * Resolves the absolute path to the certificate configuration file
       * by checking the "certificate_config_location" provided in the ADC file,
       * or the "GOOGLE_API_CERTIFICATE_CONFIG" environment variable
       * or in the default gcloud path.
       * @param overridePath An optional path to check first.
       * @returns The resolved file path.
       */
      async #resolveCertificateConfigFilePath() {
        const overridePath = this.certificateConfigPath;
        if (overridePath) {
          if (await (0, util_1.isValidFile)(overridePath)) {
            return overridePath;
          }
          throw new CertificateSourceUnavailableError(`Provided certificate config path is invalid: ${overridePath}`);
        }
        const envPath = process.env[exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE];
        if (envPath) {
          if (await (0, util_1.isValidFile)(envPath)) {
            return envPath;
          }
          throw new CertificateSourceUnavailableError(`Path from environment variable "${exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE}" is invalid: ${envPath}`);
        }
        const wellKnownPath = (0, util_1.getWellKnownCertificateConfigFileLocation)();
        if (await (0, util_1.isValidFile)(wellKnownPath)) {
          return wellKnownPath;
        }
        throw new CertificateSourceUnavailableError(`Could not find certificate configuration file. Searched override path, the "${exports.CERTIFICATE_CONFIGURATION_ENV_VARIABLE}" env var, and the gcloud path (${wellKnownPath}).`);
      }
      /**
       * Reads and parses the certificate config JSON file to extract the certificate and key paths.
       * @returns An object containing the certificate and key paths.
       */
      async #getCertAndKeyPaths() {
        const configPath = this.certificateConfigPath;
        let fileContents;
        try {
          fileContents = await fs.promises.readFile(configPath, "utf8");
        } catch (err) {
          throw new CertificateSourceUnavailableError(`Failed to read certificate config file at: ${configPath}`);
        }
        try {
          const config = JSON.parse(fileContents);
          const certPath = config?.cert_configs?.workload?.cert_path;
          const keyPath = config?.cert_configs?.workload?.key_path;
          if (!certPath || !keyPath) {
            throw new InvalidConfigurationError(`Certificate config file (${configPath}) is missing required "cert_path" or "key_path" in the workload config.`);
          }
          return { certPath, keyPath };
        } catch (e) {
          if (e instanceof InvalidConfigurationError)
            throw e;
          throw new InvalidConfigurationError(`Failed to parse certificate config from ${configPath}: ${e.message}`);
        }
      }
      /**
       * Reads and parses the cert and key files get their content and check valid format.
       * @returns An object containing the cert content and key content in buffer format.
       */
      async #getKeyAndCert(certPath, keyPath) {
        let cert, key;
        try {
          cert = await fs.promises.readFile(certPath);
          new crypto_1.X509Certificate(cert);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to read certificate file at ${certPath}: ${message}`);
        }
        try {
          key = await fs.promises.readFile(keyPath);
          (0, crypto_1.createPrivateKey)(key);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to read private key file at ${keyPath}: ${message}`);
        }
        return { cert, key };
      }
      /**
       * Reads the leaf certificate and trust chain, combines them,
       * and returns a JSON array of base64-encoded certificates.
       * @returns A stringified JSON array of the certificate chain.
       */
      async #processChainFromPaths(leafCertBuffer) {
        const leafCert = new crypto_1.X509Certificate(leafCertBuffer);
        if (!this.trustChainPath) {
          return JSON.stringify([leafCert.raw.toString("base64")]);
        }
        try {
          const chainPems = await fs.promises.readFile(this.trustChainPath, "utf8");
          const pemBlocks = chainPems.match(/-----BEGIN CERTIFICATE-----[^-]+-----END CERTIFICATE-----/g) ?? [];
          const chainCerts = pemBlocks.map((pem, index) => {
            try {
              return new crypto_1.X509Certificate(pem);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              throw new InvalidConfigurationError(`Failed to parse certificate at index ${index} in trust chain file ${this.trustChainPath}: ${message}`);
            }
          });
          const leafIndex = chainCerts.findIndex((chainCert) => leafCert.raw.equals(chainCert.raw));
          let finalChain;
          if (leafIndex === -1) {
            finalChain = [leafCert, ...chainCerts];
          } else if (leafIndex === 0) {
            finalChain = chainCerts;
          } else {
            throw new InvalidConfigurationError(`Leaf certificate exists in the trust chain but is not the first entry (found at index ${leafIndex}).`);
          }
          return JSON.stringify(finalChain.map((cert) => cert.raw.toString("base64")));
        } catch (err) {
          if (err instanceof InvalidConfigurationError)
            throw err;
          const message = err instanceof Error ? err.message : String(err);
          throw new CertificateSourceUnavailableError(`Failed to process certificate chain from ${this.trustChainPath}: ${message}`);
        }
      }
    }
    exports.CertificateSubjectTokenSupplier = CertificateSubjectTokenSupplier;
  })(certificatesubjecttokensupplier);
  return certificatesubjecttokensupplier;
}
var hasRequiredIdentitypoolclient$1;
function requireIdentitypoolclient$1() {
  if (hasRequiredIdentitypoolclient$1) return identitypoolclient$1;
  hasRequiredIdentitypoolclient$1 = 1;
  Object.defineProperty(identitypoolclient$1, "__esModule", { value: true });
  identitypoolclient$1.IdentityPoolClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient$1();
  const util_1 = requireUtil$1();
  const filesubjecttokensupplier_1 = requireFilesubjecttokensupplier$1();
  const urlsubjecttokensupplier_1 = requireUrlsubjecttokensupplier$1();
  const certificatesubjecttokensupplier_1 = requireCertificatesubjecttokensupplier();
  const stscredentials_1 = requireStscredentials$1();
  const gaxios_1 = requireSrc$6();
  class IdentityPoolClient extends baseexternalclient_1.BaseExternalAccountClient {
    subjectTokenSupplier;
    /**
     * Instantiate an IdentityPoolClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid file-sourced or
     * url-sourced credential or a workforce pool user project is provided
     * with a non workforce audience.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file. The camelCased options
     *   are aliases for the snake_cased options.
     */
    constructor(options2) {
      super(options2);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const subjectTokenSupplier = opts.get("subject_token_supplier");
      if (!credentialSource && !subjectTokenSupplier) {
        throw new Error("A credential source or subject token supplier must be specified.");
      }
      if (credentialSource && subjectTokenSupplier) {
        throw new Error("Only one of credential source or subject token supplier can be specified.");
      }
      if (subjectTokenSupplier) {
        this.subjectTokenSupplier = subjectTokenSupplier;
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        const formatOpts = (0, util_1.originalOrCamelOptions)(credentialSourceOpts.get("format"));
        const formatType = formatOpts.get("type") || "text";
        const formatSubjectTokenFieldName = formatOpts.get("subject_token_field_name");
        if (formatType !== "json" && formatType !== "text") {
          throw new Error(`Invalid credential_source format "${formatType}"`);
        }
        if (formatType === "json" && !formatSubjectTokenFieldName) {
          throw new Error("Missing subject_token_field_name for JSON credential_source format");
        }
        const file = credentialSourceOpts.get("file");
        const url = credentialSourceOpts.get("url");
        const certificate = credentialSourceOpts.get("certificate");
        const headers = credentialSourceOpts.get("headers");
        if (file && url || url && certificate || file && certificate) {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file, url, or certificate.');
        } else if (file) {
          this.credentialSourceType = "file";
          this.subjectTokenSupplier = new filesubjecttokensupplier_1.FileSubjectTokenSupplier({
            filePath: file,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName
          });
        } else if (url) {
          this.credentialSourceType = "url";
          this.subjectTokenSupplier = new urlsubjecttokensupplier_1.UrlSubjectTokenSupplier({
            url,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName,
            headers,
            additionalGaxiosOptions: IdentityPoolClient.RETRY_CONFIG
          });
        } else if (certificate) {
          this.credentialSourceType = "certificate";
          const certificateSubjecttokensupplier = new certificatesubjecttokensupplier_1.CertificateSubjectTokenSupplier({
            useDefaultCertificateConfig: certificate.use_default_certificate_config,
            certificateConfigLocation: certificate.certificate_config_location,
            trustChainPath: certificate.trust_chain_path
          });
          this.subjectTokenSupplier = certificateSubjecttokensupplier;
        } else {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file, url, or certificate.');
        }
      }
    }
    /**
     * Triggered when a external subject token is needed to be exchanged for a GCP
     * access token via GCP STS endpoint. Gets a subject token by calling
     * the configured {@link SubjectTokenSupplier}
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      const subjectToken = await this.subjectTokenSupplier.getSubjectToken(this.supplierContext);
      if (this.subjectTokenSupplier instanceof certificatesubjecttokensupplier_1.CertificateSubjectTokenSupplier) {
        const mtlsAgent = await this.subjectTokenSupplier.createMtlsHttpsAgent();
        this.stsCredential = new stscredentials_1.StsCredentials({
          tokenExchangeEndpoint: this.getTokenUrl(),
          clientAuthentication: this.clientAuth,
          transporter: new gaxios_1.Gaxios({ agent: mtlsAgent })
        });
        this.transporter = new gaxios_1.Gaxios({
          ...this.transporter.defaults || {},
          agent: mtlsAgent
        });
      }
      return subjectToken;
    }
  }
  identitypoolclient$1.IdentityPoolClient = IdentityPoolClient;
  return identitypoolclient$1;
}
var awsclient$1 = {};
var awsrequestsigner$1 = {};
var hasRequiredAwsrequestsigner$1;
function requireAwsrequestsigner$1() {
  if (hasRequiredAwsrequestsigner$1) return awsrequestsigner$1;
  hasRequiredAwsrequestsigner$1 = 1;
  Object.defineProperty(awsrequestsigner$1, "__esModule", { value: true });
  awsrequestsigner$1.AwsRequestSigner = void 0;
  const gaxios_1 = requireSrc$6();
  const crypto_1 = requireCrypto$3();
  const AWS_ALGORITHM = "AWS4-HMAC-SHA256";
  const AWS_REQUEST_TYPE = "aws4_request";
  class AwsRequestSigner {
    getCredentials;
    region;
    crypto;
    /**
     * Instantiates an AWS API request signer used to send authenticated signed
     * requests to AWS APIs based on the AWS Signature Version 4 signing process.
     * This also provides a mechanism to generate the signed request without
     * sending it.
     * @param getCredentials A mechanism to retrieve AWS security credentials
     *   when needed.
     * @param region The AWS region to use.
     */
    constructor(getCredentials2, region) {
      this.getCredentials = getCredentials2;
      this.region = region;
      this.crypto = (0, crypto_1.createCrypto)();
    }
    /**
     * Generates the signed request for the provided HTTP request for calling
     * an AWS API. This follows the steps described at:
     * https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
     * @param amzOptions The AWS request options that need to be signed.
     * @return A promise that resolves with the GaxiosOptions containing the
     *   signed HTTP request parameters.
     */
    async getRequestOptions(amzOptions) {
      if (!amzOptions.url) {
        throw new RangeError('"url" is required in "amzOptions"');
      }
      const requestPayloadData = typeof amzOptions.data === "object" ? JSON.stringify(amzOptions.data) : amzOptions.data;
      const url = amzOptions.url;
      const method = amzOptions.method || "GET";
      const requestPayload = amzOptions.body || requestPayloadData;
      const additionalAmzHeaders = amzOptions.headers;
      const awsSecurityCredentials = await this.getCredentials();
      const uri = new URL(url);
      if (typeof requestPayload !== "string" && requestPayload !== void 0) {
        throw new TypeError(`'requestPayload' is expected to be a string if provided. Got: ${requestPayload}`);
      }
      const headerMap = await generateAuthenticationHeaderMap({
        crypto: this.crypto,
        host: uri.host,
        canonicalUri: uri.pathname,
        canonicalQuerystring: uri.search.slice(1),
        method,
        region: this.region,
        securityCredentials: awsSecurityCredentials,
        requestPayload,
        additionalAmzHeaders
      });
      const headers = gaxios_1.Gaxios.mergeHeaders(
        // Add x-amz-date if available.
        headerMap.amzDate ? { "x-amz-date": headerMap.amzDate } : {},
        {
          authorization: headerMap.authorizationHeader,
          host: uri.host
        },
        additionalAmzHeaders || {}
      );
      if (awsSecurityCredentials.token) {
        gaxios_1.Gaxios.mergeHeaders(headers, {
          "x-amz-security-token": awsSecurityCredentials.token
        });
      }
      const awsSignedReq = {
        url,
        method,
        headers
      };
      if (requestPayload !== void 0) {
        awsSignedReq.body = requestPayload;
      }
      return awsSignedReq;
    }
  }
  awsrequestsigner$1.AwsRequestSigner = AwsRequestSigner;
  async function sign(crypto2, key, msg) {
    return await crypto2.signWithHmacSha256(key, msg);
  }
  async function getSigningKey(crypto2, key, dateStamp, region, serviceName) {
    const kDate = await sign(crypto2, `AWS4${key}`, dateStamp);
    const kRegion = await sign(crypto2, kDate, region);
    const kService = await sign(crypto2, kRegion, serviceName);
    const kSigning = await sign(crypto2, kService, "aws4_request");
    return kSigning;
  }
  async function generateAuthenticationHeaderMap(options2) {
    const additionalAmzHeaders = gaxios_1.Gaxios.mergeHeaders(options2.additionalAmzHeaders);
    const requestPayload = options2.requestPayload || "";
    const serviceName = options2.host.split(".")[0];
    const now = /* @__PURE__ */ new Date();
    const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
    const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/T.*/, "");
    if (options2.securityCredentials.token) {
      additionalAmzHeaders.set("x-amz-security-token", options2.securityCredentials.token);
    }
    const amzHeaders = gaxios_1.Gaxios.mergeHeaders(
      {
        host: options2.host
      },
      // Previously the date was not fixed with x-amz- and could be provided manually.
      // https://github.com/boto/botocore/blob/879f8440a4e9ace5d3cf145ce8b3d5e5ffb892ef/tests/unit/auth/aws4_testsuite/get-header-value-trim.req
      additionalAmzHeaders.has("date") ? {} : { "x-amz-date": amzDate },
      additionalAmzHeaders
    );
    let canonicalHeaders = "";
    const signedHeadersList = [
      ...amzHeaders.keys()
    ].sort();
    signedHeadersList.forEach((key) => {
      canonicalHeaders += `${key}:${amzHeaders.get(key)}
`;
    });
    const signedHeaders = signedHeadersList.join(";");
    const payloadHash = await options2.crypto.sha256DigestHex(requestPayload);
    const canonicalRequest = `${options2.method.toUpperCase()}
${options2.canonicalUri}
${options2.canonicalQuerystring}
${canonicalHeaders}
${signedHeaders}
${payloadHash}`;
    const credentialScope = `${dateStamp}/${options2.region}/${serviceName}/${AWS_REQUEST_TYPE}`;
    const stringToSign = `${AWS_ALGORITHM}
${amzDate}
${credentialScope}
` + await options2.crypto.sha256DigestHex(canonicalRequest);
    const signingKey = await getSigningKey(options2.crypto, options2.securityCredentials.secretAccessKey, dateStamp, options2.region, serviceName);
    const signature = await sign(options2.crypto, signingKey, stringToSign);
    const authorizationHeader = `${AWS_ALGORITHM} Credential=${options2.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${(0, crypto_1.fromArrayBufferToHex)(signature)}`;
    return {
      // Do not return x-amz-date if date is available.
      amzDate: additionalAmzHeaders.has("date") ? void 0 : amzDate,
      authorizationHeader,
      canonicalQuerystring: options2.canonicalQuerystring
    };
  }
  return awsrequestsigner$1;
}
var defaultawssecuritycredentialssupplier$1 = {};
var hasRequiredDefaultawssecuritycredentialssupplier$1;
function requireDefaultawssecuritycredentialssupplier$1() {
  if (hasRequiredDefaultawssecuritycredentialssupplier$1) return defaultawssecuritycredentialssupplier$1;
  hasRequiredDefaultawssecuritycredentialssupplier$1 = 1;
  Object.defineProperty(defaultawssecuritycredentialssupplier$1, "__esModule", { value: true });
  defaultawssecuritycredentialssupplier$1.DefaultAwsSecurityCredentialsSupplier = void 0;
  const authclient_1 = requireAuthclient$1();
  class DefaultAwsSecurityCredentialsSupplier {
    regionUrl;
    securityCredentialsUrl;
    imdsV2SessionTokenUrl;
    additionalGaxiosOptions;
    /**
     * Instantiates a new DefaultAwsSecurityCredentialsSupplier using information
     * from the credential_source stored in the ADC file.
     * @param opts The default aws security credentials supplier options object to
     *   build the supplier with.
     */
    constructor(opts) {
      this.regionUrl = opts.regionUrl;
      this.securityCredentialsUrl = opts.securityCredentialsUrl;
      this.imdsV2SessionTokenUrl = opts.imdsV2SessionTokenUrl;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Returns the active AWS region. This first checks to see if the region
     * is available as an environment variable. If it is not, then the supplier
     * will call the region URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS region string.
     */
    async getAwsRegion(context) {
      if (this.#regionFromEnv) {
        return this.#regionFromEnv;
      }
      const metadataHeaders = new Headers();
      if (!this.#regionFromEnv && this.imdsV2SessionTokenUrl) {
        metadataHeaders.set("x-aws-ec2-metadata-token", await this.#getImdsV2SessionToken(context.transporter));
      }
      if (!this.regionUrl) {
        throw new RangeError('Unable to determine AWS region due to missing "options.credential_source.region_url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.regionUrl,
        method: "GET",
        headers: metadataHeaders
      };
      authclient_1.AuthClient.setMethodName(opts, "getAwsRegion");
      const response = await context.transporter.request(opts);
      return response.data.substr(0, response.data.length - 1);
    }
    /**
     * Returns AWS security credentials. This first checks to see if the credentials
     * is available as environment variables. If it is not, then the supplier
     * will call the security credentials URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS security credentials.
     */
    async getAwsSecurityCredentials(context) {
      if (this.#securityCredentialsFromEnv) {
        return this.#securityCredentialsFromEnv;
      }
      const metadataHeaders = new Headers();
      if (this.imdsV2SessionTokenUrl) {
        metadataHeaders.set("x-aws-ec2-metadata-token", await this.#getImdsV2SessionToken(context.transporter));
      }
      const roleName = await this.#getAwsRoleName(metadataHeaders, context.transporter);
      const awsCreds = await this.#retrieveAwsSecurityCredentials(roleName, metadataHeaders, context.transporter);
      return {
        accessKeyId: awsCreds.AccessKeyId,
        secretAccessKey: awsCreds.SecretAccessKey,
        token: awsCreds.Token
      };
    }
    /**
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the IMDSv2 Session Token.
     */
    async #getImdsV2SessionToken(transporter) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.imdsV2SessionTokenUrl,
        method: "PUT",
        headers: { "x-aws-ec2-metadata-token-ttl-seconds": "300" }
      };
      authclient_1.AuthClient.setMethodName(opts, "#getImdsV2SessionToken");
      const response = await transporter.request(opts);
      return response.data;
    }
    /**
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the assigned role to the current
     *   AWS VM. This is needed for calling the security-credentials endpoint.
     */
    async #getAwsRoleName(headers, transporter) {
      if (!this.securityCredentialsUrl) {
        throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.securityCredentialsUrl,
        method: "GET",
        headers
      };
      authclient_1.AuthClient.setMethodName(opts, "#getAwsRoleName");
      const response = await transporter.request(opts);
      return response.data;
    }
    /**
     * Retrieves the temporary AWS credentials by calling the security-credentials
     * endpoint as specified in the `credential_source` object.
     * @param roleName The role attached to the current VM.
     * @param headers The headers to be used in the metadata request.
     * @param transporter The transporter to use for requests.
     * @return A promise that resolves with the temporary AWS credentials
     *   needed for creating the GetCallerIdentity signed request.
     */
    async #retrieveAwsSecurityCredentials(roleName, headers, transporter) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: `${this.securityCredentialsUrl}/${roleName}`,
        headers
      };
      authclient_1.AuthClient.setMethodName(opts, "#retrieveAwsSecurityCredentials");
      const response = await transporter.request(opts);
      return response.data;
    }
    get #regionFromEnv() {
      return process.env["AWS_REGION"] || process.env["AWS_DEFAULT_REGION"] || null;
    }
    get #securityCredentialsFromEnv() {
      if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
        return {
          accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
          secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
          token: process.env["AWS_SESSION_TOKEN"]
        };
      }
      return null;
    }
  }
  defaultawssecuritycredentialssupplier$1.DefaultAwsSecurityCredentialsSupplier = DefaultAwsSecurityCredentialsSupplier;
  return defaultawssecuritycredentialssupplier$1;
}
var hasRequiredAwsclient$1;
function requireAwsclient$1() {
  if (hasRequiredAwsclient$1) return awsclient$1;
  hasRequiredAwsclient$1 = 1;
  Object.defineProperty(awsclient$1, "__esModule", { value: true });
  awsclient$1.AwsClient = void 0;
  const awsrequestsigner_1 = requireAwsrequestsigner$1();
  const baseexternalclient_1 = requireBaseexternalclient$1();
  const defaultawssecuritycredentialssupplier_1 = requireDefaultawssecuritycredentialssupplier$1();
  const util_1 = requireUtil$1();
  const gaxios_1 = requireSrc$6();
  class AwsClient extends baseexternalclient_1.BaseExternalAccountClient {
    environmentId;
    awsSecurityCredentialsSupplier;
    regionalCredVerificationUrl;
    awsRequestSigner;
    region;
    static #DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL = "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15";
    /**
     * @deprecated AWS client no validates the EC2 metadata address.
     **/
    static AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
    /**
     * @deprecated AWS client no validates the EC2 metadata address.
     **/
    static AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254";
    /**
     * Instantiates an AwsClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid AWS credential.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     */
    constructor(options2) {
      super(options2);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const awsSecurityCredentialsSupplier = opts.get("aws_security_credentials_supplier");
      if (!credentialSource && !awsSecurityCredentialsSupplier) {
        throw new Error("A credential source or AWS security credentials supplier must be specified.");
      }
      if (credentialSource && awsSecurityCredentialsSupplier) {
        throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
      }
      if (awsSecurityCredentialsSupplier) {
        this.awsSecurityCredentialsSupplier = awsSecurityCredentialsSupplier;
        this.regionalCredVerificationUrl = AwsClient.#DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL;
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        this.environmentId = credentialSourceOpts.get("environment_id");
        const regionUrl = credentialSourceOpts.get("region_url");
        const securityCredentialsUrl = credentialSourceOpts.get("url");
        const imdsV2SessionTokenUrl = credentialSourceOpts.get("imdsv2_session_token_url");
        this.awsSecurityCredentialsSupplier = new defaultawssecuritycredentialssupplier_1.DefaultAwsSecurityCredentialsSupplier({
          regionUrl,
          securityCredentialsUrl,
          imdsV2SessionTokenUrl
        });
        this.regionalCredVerificationUrl = credentialSourceOpts.get("regional_cred_verification_url");
        this.credentialSourceType = "aws";
        this.validateEnvironmentId();
      }
      this.awsRequestSigner = null;
      this.region = "";
    }
    validateEnvironmentId() {
      const match = this.environmentId?.match(/^(aws)(\d+)$/);
      if (!match || !this.regionalCredVerificationUrl) {
        throw new Error('No valid AWS "credential_source" provided');
      } else if (parseInt(match[2], 10) !== 1) {
        throw new Error(`aws version "${match[2]}" is not supported in the current build.`);
      }
    }
    /**
     * Triggered when an external subject token is needed to be exchanged for a
     * GCP access token via GCP STS endpoint. This will call the
     * {@link AwsSecurityCredentialsSupplier} to retrieve an AWS region and AWS
     * Security Credentials, then use them to create a signed AWS STS request that
     * can be exchanged for a GCP access token.
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      if (!this.awsRequestSigner) {
        this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext);
        this.awsRequestSigner = new awsrequestsigner_1.AwsRequestSigner(async () => {
          return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext);
        }, this.region);
      }
      const options2 = await this.awsRequestSigner.getRequestOptions({
        ...AwsClient.RETRY_CONFIG,
        url: this.regionalCredVerificationUrl.replace("{region}", this.region),
        method: "POST"
      });
      const reformattedHeader = [];
      const extendedHeaders = gaxios_1.Gaxios.mergeHeaders({
        // The full, canonical resource name of the workload identity pool
        // provider, with or without the HTTPS prefix.
        // Including this header as part of the signature is recommended to
        // ensure data integrity.
        "x-goog-cloud-target-resource": this.audience
      }, options2.headers);
      extendedHeaders.forEach((value, key) => reformattedHeader.push({ key, value }));
      return encodeURIComponent(JSON.stringify({
        url: options2.url,
        method: options2.method,
        headers: reformattedHeader
      }));
    }
  }
  awsclient$1.AwsClient = AwsClient;
  return awsclient$1;
}
var pluggableAuthClient$1 = {};
var executableResponse$1 = {};
var hasRequiredExecutableResponse$1;
function requireExecutableResponse$1() {
  if (hasRequiredExecutableResponse$1) return executableResponse$1;
  hasRequiredExecutableResponse$1 = 1;
  Object.defineProperty(executableResponse$1, "__esModule", { value: true });
  executableResponse$1.InvalidSubjectTokenError = executableResponse$1.InvalidMessageFieldError = executableResponse$1.InvalidCodeFieldError = executableResponse$1.InvalidTokenTypeFieldError = executableResponse$1.InvalidExpirationTimeFieldError = executableResponse$1.InvalidSuccessFieldError = executableResponse$1.InvalidVersionFieldError = executableResponse$1.ExecutableResponseError = executableResponse$1.ExecutableResponse = void 0;
  const SAML_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:saml2";
  const OIDC_SUBJECT_TOKEN_TYPE1 = "urn:ietf:params:oauth:token-type:id_token";
  const OIDC_SUBJECT_TOKEN_TYPE2 = "urn:ietf:params:oauth:token-type:jwt";
  class ExecutableResponse {
    /**
     * The version of the Executable response. Only version 1 is currently supported.
     */
    version;
    /**
     * Whether the executable ran successfully.
     */
    success;
    /**
     * The epoch time for expiration of the token in seconds.
     */
    expirationTime;
    /**
     * The type of subject token in the response, currently supported values are:
     * urn:ietf:params:oauth:token-type:saml2
     * urn:ietf:params:oauth:token-type:id_token
     * urn:ietf:params:oauth:token-type:jwt
     */
    tokenType;
    /**
     * The error code from the executable.
     */
    errorCode;
    /**
     * The error message from the executable.
     */
    errorMessage;
    /**
     * The subject token from the executable, format depends on tokenType.
     */
    subjectToken;
    /**
     * Instantiates an ExecutableResponse instance using the provided JSON object
     * from the output of the executable.
     * @param responseJson Response from a 3rd party executable, loaded from a
     * run of the executable or a cached output file.
     */
    constructor(responseJson) {
      if (!responseJson.version) {
        throw new InvalidVersionFieldError("Executable response must contain a 'version' field.");
      }
      if (responseJson.success === void 0) {
        throw new InvalidSuccessFieldError("Executable response must contain a 'success' field.");
      }
      this.version = responseJson.version;
      this.success = responseJson.success;
      if (this.success) {
        this.expirationTime = responseJson.expiration_time;
        this.tokenType = responseJson.token_type;
        if (this.tokenType !== SAML_SUBJECT_TOKEN_TYPE && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE1 && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE2) {
          throw new InvalidTokenTypeFieldError(`Executable response must contain a 'token_type' field when successful and it must be one of ${OIDC_SUBJECT_TOKEN_TYPE1}, ${OIDC_SUBJECT_TOKEN_TYPE2}, or ${SAML_SUBJECT_TOKEN_TYPE}.`);
        }
        if (this.tokenType === SAML_SUBJECT_TOKEN_TYPE) {
          if (!responseJson.saml_response) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'saml_response' field when token_type=${SAML_SUBJECT_TOKEN_TYPE}.`);
          }
          this.subjectToken = responseJson.saml_response;
        } else {
          if (!responseJson.id_token) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'id_token' field when token_type=${OIDC_SUBJECT_TOKEN_TYPE1} or ${OIDC_SUBJECT_TOKEN_TYPE2}.`);
          }
          this.subjectToken = responseJson.id_token;
        }
      } else {
        if (!responseJson.code) {
          throw new InvalidCodeFieldError("Executable response must contain a 'code' field when unsuccessful.");
        }
        if (!responseJson.message) {
          throw new InvalidMessageFieldError("Executable response must contain a 'message' field when unsuccessful.");
        }
        this.errorCode = responseJson.code;
        this.errorMessage = responseJson.message;
      }
    }
    /**
     * @return A boolean representing if the response has a valid token. Returns
     * true when the response was successful and the token is not expired.
     */
    isValid() {
      return !this.isExpired() && this.success;
    }
    /**
     * @return A boolean representing if the response is expired. Returns true if the
     * provided timeout has passed.
     */
    isExpired() {
      return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1e3);
    }
  }
  executableResponse$1.ExecutableResponse = ExecutableResponse;
  class ExecutableResponseError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  executableResponse$1.ExecutableResponseError = ExecutableResponseError;
  class InvalidVersionFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidVersionFieldError = InvalidVersionFieldError;
  class InvalidSuccessFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidSuccessFieldError = InvalidSuccessFieldError;
  class InvalidExpirationTimeFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidExpirationTimeFieldError = InvalidExpirationTimeFieldError;
  class InvalidTokenTypeFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidTokenTypeFieldError = InvalidTokenTypeFieldError;
  class InvalidCodeFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidCodeFieldError = InvalidCodeFieldError;
  class InvalidMessageFieldError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidMessageFieldError = InvalidMessageFieldError;
  class InvalidSubjectTokenError extends ExecutableResponseError {
  }
  executableResponse$1.InvalidSubjectTokenError = InvalidSubjectTokenError;
  return executableResponse$1;
}
var pluggableAuthHandler$1 = {};
var hasRequiredPluggableAuthHandler$1;
function requirePluggableAuthHandler$1() {
  if (hasRequiredPluggableAuthHandler$1) return pluggableAuthHandler$1;
  hasRequiredPluggableAuthHandler$1 = 1;
  Object.defineProperty(pluggableAuthHandler$1, "__esModule", { value: true });
  pluggableAuthHandler$1.PluggableAuthHandler = pluggableAuthHandler$1.ExecutableError = void 0;
  const executable_response_1 = requireExecutableResponse$1();
  const childProcess = require$$1$3;
  const fs = require$$0$3;
  class ExecutableError extends Error {
    /**
     * The exit code returned by the executable.
     */
    code;
    constructor(message, code) {
      super(`The executable failed with exit code: ${code} and error message: ${message}.`);
      this.code = code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  pluggableAuthHandler$1.ExecutableError = ExecutableError;
  class PluggableAuthHandler {
    commandComponents;
    timeoutMillis;
    outputFile;
    /**
     * Instantiates a PluggableAuthHandler instance using the provided
     * PluggableAuthHandlerOptions object.
     */
    constructor(options2) {
      if (!options2.command) {
        throw new Error("No command provided.");
      }
      this.commandComponents = PluggableAuthHandler.parseCommand(options2.command);
      this.timeoutMillis = options2.timeoutMillis;
      if (!this.timeoutMillis) {
        throw new Error("No timeoutMillis provided.");
      }
      this.outputFile = options2.outputFile;
    }
    /**
     * Calls user provided executable to get a 3rd party subject token and
     * returns the response.
     * @param envMap a Map of additional Environment Variables required for
     *   the executable.
     * @return A promise that resolves with the executable response.
     */
    retrieveResponseFromExecutable(envMap) {
      return new Promise((resolve, reject) => {
        const child = childProcess.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
          env: { ...process.env, ...Object.fromEntries(envMap) }
        });
        let output = "";
        child.stdout.on("data", (data) => {
          output += data;
        });
        child.stderr.on("data", (err) => {
          output += err;
        });
        const timeout = setTimeout(() => {
          child.removeAllListeners();
          child.kill();
          return reject(new Error("The executable failed to finish within the timeout specified."));
        }, this.timeoutMillis);
        child.on("close", (code) => {
          clearTimeout(timeout);
          if (code === 0) {
            try {
              const responseJson = JSON.parse(output);
              const response = new executable_response_1.ExecutableResponse(responseJson);
              return resolve(response);
            } catch (error) {
              if (error instanceof executable_response_1.ExecutableResponseError) {
                return reject(error);
              }
              return reject(new executable_response_1.ExecutableResponseError(`The executable returned an invalid response: ${output}`));
            }
          } else {
            return reject(new ExecutableError(output, code.toString()));
          }
        });
      });
    }
    /**
     * Checks user provided output file for response from previous run of
     * executable and return the response if it exists, is formatted correctly, and is not expired.
     */
    async retrieveCachedResponse() {
      if (!this.outputFile || this.outputFile.length === 0) {
        return void 0;
      }
      let filePath;
      try {
        filePath = await fs.promises.realpath(this.outputFile);
      } catch {
        return void 0;
      }
      if (!(await fs.promises.lstat(filePath)).isFile()) {
        return void 0;
      }
      const responseString = await fs.promises.readFile(filePath, {
        encoding: "utf8"
      });
      if (responseString === "") {
        return void 0;
      }
      try {
        const responseJson = JSON.parse(responseString);
        const response = new executable_response_1.ExecutableResponse(responseJson);
        if (response.isValid()) {
          return new executable_response_1.ExecutableResponse(responseJson);
        }
        return void 0;
      } catch (error) {
        if (error instanceof executable_response_1.ExecutableResponseError) {
          throw error;
        }
        throw new executable_response_1.ExecutableResponseError(`The output file contained an invalid response: ${responseString}`);
      }
    }
    /**
     * Parses given command string into component array, splitting on spaces unless
     * spaces are between quotation marks.
     */
    static parseCommand(command) {
      const components = command.match(/(?:[^\s"]+|"[^"]*")+/g);
      if (!components) {
        throw new Error(`Provided command: "${command}" could not be parsed.`);
      }
      for (let i = 0; i < components.length; i++) {
        if (components[i][0] === '"' && components[i].slice(-1) === '"') {
          components[i] = components[i].slice(1, -1);
        }
      }
      return components;
    }
  }
  pluggableAuthHandler$1.PluggableAuthHandler = PluggableAuthHandler;
  return pluggableAuthHandler$1;
}
var hasRequiredPluggableAuthClient$1;
function requirePluggableAuthClient$1() {
  if (hasRequiredPluggableAuthClient$1) return pluggableAuthClient$1;
  hasRequiredPluggableAuthClient$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluggableAuthClient = exports.ExecutableError = void 0;
    const baseexternalclient_1 = requireBaseexternalclient$1();
    const executable_response_1 = requireExecutableResponse$1();
    const pluggable_auth_handler_1 = requirePluggableAuthHandler$1();
    var pluggable_auth_handler_2 = requirePluggableAuthHandler$1();
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: function() {
      return pluggable_auth_handler_2.ExecutableError;
    } });
    const DEFAULT_EXECUTABLE_TIMEOUT_MILLIS = 30 * 1e3;
    const MINIMUM_EXECUTABLE_TIMEOUT_MILLIS = 5 * 1e3;
    const MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS = 120 * 1e3;
    const GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES";
    const MAXIMUM_EXECUTABLE_VERSION = 1;
    class PluggableAuthClient extends baseexternalclient_1.BaseExternalAccountClient {
      /**
       * The command used to retrieve the third party token.
       */
      command;
      /**
       * The timeout in milliseconds for running executable,
       * set to default if none provided.
       */
      timeoutMillis;
      /**
       * The path to file to check for cached executable response.
       */
      outputFile;
      /**
       * Executable and output file handler.
       */
      handler;
      /**
       * Instantiates a PluggableAuthClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * An error is thrown if the credential is not a valid pluggable auth credential.
       * @param options The external account options object typically loaded from
       *   the external account JSON credential file.
       */
      constructor(options2) {
        super(options2);
        if (!options2.credential_source.executable) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        this.command = options2.credential_source.executable.command;
        if (!this.command) {
          throw new Error('No valid Pluggable Auth "credential_source" provided.');
        }
        if (options2.credential_source.executable.timeout_millis === void 0) {
          this.timeoutMillis = DEFAULT_EXECUTABLE_TIMEOUT_MILLIS;
        } else {
          this.timeoutMillis = options2.credential_source.executable.timeout_millis;
          if (this.timeoutMillis < MINIMUM_EXECUTABLE_TIMEOUT_MILLIS || this.timeoutMillis > MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS) {
            throw new Error(`Timeout must be between ${MINIMUM_EXECUTABLE_TIMEOUT_MILLIS} and ${MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS} milliseconds.`);
          }
        }
        this.outputFile = options2.credential_source.executable.output_file;
        this.handler = new pluggable_auth_handler_1.PluggableAuthHandler({
          command: this.command,
          timeoutMillis: this.timeoutMillis,
          outputFile: this.outputFile
        });
        this.credentialSourceType = "executable";
      }
      /**
       * Triggered when an external subject token is needed to be exchanged for a
       * GCP access token via GCP STS endpoint.
       * This uses the `options.credential_source` object to figure out how
       * to retrieve the token using the current environment. In this case,
       * this calls a user provided executable which returns the subject token.
       * The logic is summarized as:
       * 1. Validated that the executable is allowed to run. The
       *    GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment must be set to
       *    1 for security reasons.
       * 2. If an output file is specified by the user, check the file location
       *    for a response. If the file exists and contains a valid response,
       *    return the subject token from the file.
       * 3. Call the provided executable and return response.
       * @return A promise that resolves with the external subject token.
       */
      async retrieveSubjectToken() {
        if (process.env[GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES] !== "1") {
          throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
        }
        let executableResponse2 = void 0;
        if (this.outputFile) {
          executableResponse2 = await this.handler.retrieveCachedResponse();
        }
        if (!executableResponse2) {
          const envMap = /* @__PURE__ */ new Map();
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType);
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0");
          if (this.outputFile) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
          }
          const serviceAccountEmail = this.getServiceAccountEmail();
          if (serviceAccountEmail) {
            envMap.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", serviceAccountEmail);
          }
          executableResponse2 = await this.handler.retrieveResponseFromExecutable(envMap);
        }
        if (executableResponse2.version > MAXIMUM_EXECUTABLE_VERSION) {
          throw new Error(`Version of executable is not currently supported, maximum supported version is ${MAXIMUM_EXECUTABLE_VERSION}.`);
        }
        if (!executableResponse2.success) {
          throw new pluggable_auth_handler_1.ExecutableError(executableResponse2.errorMessage, executableResponse2.errorCode);
        }
        if (this.outputFile) {
          if (!executableResponse2.expirationTime) {
            throw new executable_response_1.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.");
          }
        }
        if (executableResponse2.isExpired()) {
          throw new Error("Executable response is expired.");
        }
        return executableResponse2.subjectToken;
      }
    }
    exports.PluggableAuthClient = PluggableAuthClient;
  })(pluggableAuthClient$1);
  return pluggableAuthClient$1;
}
var hasRequiredExternalclient$1;
function requireExternalclient$1() {
  if (hasRequiredExternalclient$1) return externalclient$1;
  hasRequiredExternalclient$1 = 1;
  Object.defineProperty(externalclient$1, "__esModule", { value: true });
  externalclient$1.ExternalAccountClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient$1();
  const identitypoolclient_1 = requireIdentitypoolclient$1();
  const awsclient_1 = requireAwsclient$1();
  const pluggable_auth_client_1 = requirePluggableAuthClient$1();
  class ExternalAccountClient {
    constructor() {
      throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()");
    }
    /**
     * This static method will instantiate the
     * corresponding type of external account credential depending on the
     * underlying credential source.
     *
     * **IMPORTANT**: This method does not validate the credential configuration.
     * A security risk occurs when a credential configuration configured with
     * malicious URLs is used. When the credential configuration is accepted from
     * an untrusted source, you should validate it before using it with this
     * method. For more details, see
     * https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
     *
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     * @return A BaseExternalAccountClient instance or null if the options
     *   provided do not correspond to an external account credential.
     */
    static fromJSON(options2) {
      if (options2 && options2.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
        if (options2.credential_source?.environment_id) {
          return new awsclient_1.AwsClient(options2);
        } else if (options2.credential_source?.executable) {
          return new pluggable_auth_client_1.PluggableAuthClient(options2);
        } else {
          return new identitypoolclient_1.IdentityPoolClient(options2);
        }
      } else {
        return null;
      }
    }
  }
  externalclient$1.ExternalAccountClient = ExternalAccountClient;
  return externalclient$1;
}
var externalAccountAuthorizedUserClient$1 = {};
var hasRequiredExternalAccountAuthorizedUserClient$1;
function requireExternalAccountAuthorizedUserClient$1() {
  if (hasRequiredExternalAccountAuthorizedUserClient$1) return externalAccountAuthorizedUserClient$1;
  hasRequiredExternalAccountAuthorizedUserClient$1 = 1;
  Object.defineProperty(externalAccountAuthorizedUserClient$1, "__esModule", { value: true });
  externalAccountAuthorizedUserClient$1.ExternalAccountAuthorizedUserClient = externalAccountAuthorizedUserClient$1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
  const authclient_1 = requireAuthclient$1();
  const oauth2common_1 = requireOauth2common$1();
  const gaxios_1 = requireSrc$6();
  const stream = require$$0$5;
  const baseexternalclient_1 = requireBaseexternalclient$1();
  externalAccountAuthorizedUserClient$1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
  const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/oauthtoken";
  class ExternalAccountAuthorizedUserHandler extends oauth2common_1.OAuthClientAuthHandler {
    #tokenRefreshEndpoint;
    /**
     * Initializes an ExternalAccountAuthorizedUserHandler instance.
     * @param url The URL of the token refresh endpoint.
     * @param transporter The transporter to use for the refresh request.
     * @param clientAuthentication The client authentication credentials to use
     *   for the refresh request.
     */
    constructor(options2) {
      super(options2);
      this.#tokenRefreshEndpoint = options2.tokenRefreshEndpoint;
    }
    /**
     * Requests a new access token from the token_url endpoint using the provided
     *   refresh token.
     * @param refreshToken The refresh token to use to generate a new access token.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @return A promise that resolves with the token refresh response containing
     *   the requested access token and its expiration time.
     */
    async refreshToken(refreshToken, headers) {
      const opts = {
        ...ExternalAccountAuthorizedUserHandler.RETRY_CONFIG,
        url: this.#tokenRefreshEndpoint,
        method: "POST",
        headers,
        data: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken
        })
      };
      authclient_1.AuthClient.setMethodName(opts, "refreshToken");
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const tokenRefreshResponse = response.data;
        tokenRefreshResponse.res = response;
        return tokenRefreshResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  class ExternalAccountAuthorizedUserClient extends authclient_1.AuthClient {
    cachedAccessToken;
    externalAccountAuthorizedUserHandler;
    refreshToken;
    /**
     * Instantiates an ExternalAccountAuthorizedUserClient instances using the
     * provided JSON object loaded from a credentials files.
     * An error is throws if the credential is not valid.
     * @param options The external account authorized user option object typically
     *   from the external accoutn authorized user JSON credential file.
     */
    constructor(options2) {
      super(options2);
      if (options2.universe_domain) {
        this.universeDomain = options2.universe_domain;
      }
      this.refreshToken = options2.refresh_token;
      const clientAuthentication = {
        confidentialClientType: "basic",
        clientId: options2.client_id,
        clientSecret: options2.client_secret
      };
      this.externalAccountAuthorizedUserHandler = new ExternalAccountAuthorizedUserHandler({
        tokenRefreshEndpoint: options2.token_url ?? DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain),
        transporter: this.transporter,
        clientAuthentication
      });
      this.cachedAccessToken = null;
      this.quotaProjectId = options2.quota_project_id;
      if (typeof options2?.eagerRefreshThresholdMillis !== "number") {
        this.eagerRefreshThresholdMillis = baseexternalclient_1.EXPIRATION_TIME_OFFSET;
      } else {
        this.eagerRefreshThresholdMillis = options2.eagerRefreshThresholdMillis;
      }
      this.forceRefreshOnFailure = !!options2?.forceRefreshOnFailure;
    }
    async getAccessToken() {
      if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
        await this.refreshAccessTokenAsync();
      }
      return {
        token: this.cachedAccessToken.access_token,
        res: this.cachedAccessToken.res
      };
    }
    async getRequestHeaders() {
      const accessTokenResponse = await this.getAccessToken();
      const headers = new Headers({
        authorization: `Bearer ${accessTokenResponse.token}`
      });
      return this.addSharedMetadataHeaders(headers);
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    /**
     * Authenticates the provided HTTP request, processes it and resolves with the
     * returned response.
     * @param opts The HTTP request options.
     * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
     * @return A promise that resolves with the successful response.
     */
    async requestAsync(opts, reAuthRetried = false) {
      let response;
      try {
        const requestHeaders = await this.getRequestHeaders();
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
        this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
        response = await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
            await this.refreshAccessTokenAsync();
            return await this.requestAsync(opts, true);
          }
        }
        throw e;
      }
      return response;
    }
    /**
     * Forces token refresh, even if unexpired tokens are currently cached.
     * @return A promise that resolves with the refreshed credential.
     */
    async refreshAccessTokenAsync() {
      const refreshResponse = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
      this.cachedAccessToken = {
        access_token: refreshResponse.access_token,
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + refreshResponse.expires_in * 1e3,
        res: refreshResponse.res
      };
      if (refreshResponse.refresh_token !== void 0) {
        this.refreshToken = refreshResponse.refresh_token;
      }
      return this.cachedAccessToken;
    }
    /**
     * Returns whether the provided credentials are expired or not.
     * If there is no expiry time, assumes the token is not expired or expiring.
     * @param credentials The credentials to check for expiration.
     * @return Whether the credentials are expired or not.
     */
    isExpired(credentials) {
      const now = (/* @__PURE__ */ new Date()).getTime();
      return credentials.expiry_date ? now >= credentials.expiry_date - this.eagerRefreshThresholdMillis : false;
    }
  }
  externalAccountAuthorizedUserClient$1.ExternalAccountAuthorizedUserClient = ExternalAccountAuthorizedUserClient;
  return externalAccountAuthorizedUserClient$1;
}
var hasRequiredGoogleauth$1;
function requireGoogleauth$1() {
  if (hasRequiredGoogleauth$1) return googleauth$1;
  hasRequiredGoogleauth$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.GoogleAuthExceptionMessages = void 0;
    const child_process_1 = require$$1$3;
    const fs = require$$0$3;
    const gaxios_1 = requireSrc$6();
    const gcpMetadata = requireSrc$5();
    const os = require$$1;
    const path = require$$5;
    const crypto_1 = requireCrypto$3();
    const computeclient_1 = requireComputeclient$1();
    const idtokenclient_1 = requireIdtokenclient$1();
    const envDetect_1 = requireEnvDetect$1();
    const jwtclient_1 = requireJwtclient$1();
    const refreshclient_1 = requireRefreshclient$1();
    const impersonated_1 = requireImpersonated$1();
    const externalclient_1 = requireExternalclient$1();
    const baseexternalclient_1 = requireBaseexternalclient$1();
    const authclient_1 = requireAuthclient$1();
    const externalAccountAuthorizedUserClient_1 = requireExternalAccountAuthorizedUserClient$1();
    const util_1 = requireUtil$1();
    exports.GoogleAuthExceptionMessages = {
      API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
      NO_PROJECT_ID_FOUND: "Unable to detect a Project Id in the current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_CREDENTIALS_FOUND: "Unable to find credentials in current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
      NO_UNIVERSE_DOMAIN_FOUND: "Unable to detect a Universe Domain in the current environment.\nTo learn more about Universe Domain retrieval, visit: \nhttps://cloud.google.com/compute/docs/metadata/predefined-metadata-keys"
    };
    class GoogleAuth {
      /**
       * Caches a value indicating whether the auth layer is running on Google
       * Compute Engine.
       * @private
       */
      checkIsGCE = void 0;
      useJWTAccessWithScope;
      defaultServicePath;
      // Note:  this properly is only public to satisfy unit tests.
      // https://github.com/Microsoft/TypeScript/issues/5228
      get isGCE() {
        return this.checkIsGCE;
      }
      _findProjectIdPromise;
      _cachedProjectId;
      // To save the contents of the JSON credential file
      jsonContent = null;
      apiKey;
      cachedCredential = null;
      /**
       * A pending {@link AuthClient}. Used for concurrent {@link GoogleAuth.getClient} calls.
       */
      #pendingAuthClient = null;
      /**
       * Scopes populated by the client library by default. We differentiate between
       * these and user defined scopes when deciding whether to use a self-signed JWT.
       */
      defaultScopes;
      keyFilename;
      scopes;
      clientOptions = {};
      /**
       * Configuration is resolved in the following order of precedence:
       * - {@link GoogleAuthOptions.credentials `credentials`}
       * - {@link GoogleAuthOptions.keyFilename `keyFilename`}
       * - {@link GoogleAuthOptions.keyFile `keyFile`}
       *
       * {@link GoogleAuthOptions.clientOptions `clientOptions`} are passed to the
       * {@link AuthClient `AuthClient`s}.
       *
       * @param opts
       */
      constructor(opts = {}) {
        this._cachedProjectId = opts.projectId || null;
        this.cachedCredential = opts.authClient || null;
        this.keyFilename = opts.keyFilename || opts.keyFile;
        this.scopes = opts.scopes;
        this.clientOptions = opts.clientOptions || {};
        this.jsonContent = opts.credentials || null;
        this.apiKey = opts.apiKey || this.clientOptions.apiKey || null;
        if (this.apiKey && (this.jsonContent || this.clientOptions.credentials)) {
          throw new RangeError(exports.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
        }
        if (opts.universeDomain) {
          this.clientOptions.universeDomain = opts.universeDomain;
        }
      }
      // GAPIC client libraries should always use self-signed JWTs. The following
      // variables are set on the JWT client in order to indicate the type of library,
      // and sign the JWT with the correct audience and scopes (if not supplied).
      setGapicJWTValues(client) {
        client.defaultServicePath = this.defaultServicePath;
        client.useJWTAccessWithScope = this.useJWTAccessWithScope;
        client.defaultScopes = this.defaultScopes;
      }
      getProjectId(callback) {
        if (callback) {
          this.getProjectIdAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getProjectIdAsync();
        }
      }
      /**
       * A temporary method for internal `getProjectId` usages where `null` is
       * acceptable. In a future major release, `getProjectId` should return `null`
       * (as the `Promise<string | null>` base signature describes) and this private
       * method should be removed.
       *
       * @returns Promise that resolves with project id (or `null`)
       */
      async getProjectIdOptional() {
        try {
          return await this.getProjectId();
        } catch (e) {
          if (e instanceof Error && e.message === exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) {
            return null;
          } else {
            throw e;
          }
        }
      }
      /**
       * A private method for finding and caching a projectId.
       *
       * Supports environments in order of precedence:
       * - GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variable
       * - GOOGLE_APPLICATION_CREDENTIALS JSON file
       * - Cloud SDK: `gcloud config config-helper --format json`
       * - GCE project ID from metadata server
       *
       * @returns projectId
       */
      async findAndCacheProjectId() {
        let projectId = null;
        projectId ||= await this.getProductionProjectId();
        projectId ||= await this.getFileProjectId();
        projectId ||= await this.getDefaultServiceProjectId();
        projectId ||= await this.getGCEProjectId();
        projectId ||= await this.getExternalAccountClientProjectId();
        if (projectId) {
          this._cachedProjectId = projectId;
          return projectId;
        } else {
          throw new Error(exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND);
        }
      }
      async getProjectIdAsync() {
        if (this._cachedProjectId) {
          return this._cachedProjectId;
        }
        if (!this._findProjectIdPromise) {
          this._findProjectIdPromise = this.findAndCacheProjectId();
        }
        return this._findProjectIdPromise;
      }
      /**
       * Retrieves a universe domain from the metadata server via
       * {@link gcpMetadata.universe}.
       *
       * @returns a universe domain
       */
      async getUniverseDomainFromMetadataServer() {
        let universeDomain;
        try {
          universeDomain = await gcpMetadata.universe("universe-domain");
          universeDomain ||= authclient_1.DEFAULT_UNIVERSE;
        } catch (e) {
          if (e && e?.response?.status === 404) {
            universeDomain = authclient_1.DEFAULT_UNIVERSE;
          } else {
            throw e;
          }
        }
        return universeDomain;
      }
      /**
       * Retrieves, caches, and returns the universe domain in the following order
       * of precedence:
       * - The universe domain in {@link GoogleAuth.clientOptions}
       * - An existing or ADC {@link AuthClient}'s universe domain
       * - {@link gcpMetadata.universe}, if {@link Compute} client
       *
       * @returns The universe domain
       */
      async getUniverseDomain() {
        let universeDomain = (0, util_1.originalOrCamelOptions)(this.clientOptions).get("universe_domain");
        try {
          universeDomain ??= (await this.getClient()).universeDomain;
        } catch {
          universeDomain ??= authclient_1.DEFAULT_UNIVERSE;
        }
        return universeDomain;
      }
      /**
       * @returns Any scopes (user-specified or default scopes specified by the
       *   client library) that need to be set on the current Auth client.
       */
      getAnyScopes() {
        return this.scopes || this.defaultScopes;
      }
      getApplicationDefault(optionsOrCallback = {}, callback) {
        let options2;
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.getApplicationDefaultAsync(options2).then((r) => callback(null, r.credential, r.projectId), callback);
        } else {
          return this.getApplicationDefaultAsync(options2);
        }
      }
      async getApplicationDefaultAsync(options2 = {}) {
        if (this.cachedCredential) {
          return await this.#prepareAndCacheClient(this.cachedCredential, null);
        }
        let credential;
        credential = await this._tryGetApplicationCredentialsFromEnvironmentVariable(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await this.#prepareAndCacheClient(credential);
        }
        credential = await this._tryGetApplicationCredentialsFromWellKnownFile(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await this.#prepareAndCacheClient(credential);
        }
        if (await this._checkIsGCE()) {
          options2.scopes = this.getAnyScopes();
          return await this.#prepareAndCacheClient(new computeclient_1.Compute(options2));
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_ADC_FOUND);
      }
      async #prepareAndCacheClient(credential, quotaProjectIdOverride = process.env["GOOGLE_CLOUD_QUOTA_PROJECT"] || null) {
        const projectId = await this.getProjectIdOptional();
        if (quotaProjectIdOverride) {
          credential.quotaProjectId = quotaProjectIdOverride;
        }
        this.cachedCredential = credential;
        return { credential, projectId };
      }
      /**
       * Determines whether the auth layer is running on Google Compute Engine.
       * Checks for GCP Residency, then fallback to checking if metadata server
       * is available.
       *
       * @returns A promise that resolves with the boolean.
       * @api private
       */
      async _checkIsGCE() {
        if (this.checkIsGCE === void 0) {
          this.checkIsGCE = gcpMetadata.getGCPResidency() || await gcpMetadata.isAvailable();
        }
        return this.checkIsGCE;
      }
      /**
       * Attempts to load default credentials from the environment variable path..
       * @returns Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromEnvironmentVariable(options2) {
        const credentialsPath = process.env["GOOGLE_APPLICATION_CREDENTIALS"] || process.env["google_application_credentials"];
        if (!credentialsPath || credentialsPath.length === 0) {
          return null;
        }
        try {
          return this._getApplicationCredentialsFromFilePath(credentialsPath, options2);
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${e.message}`;
          }
          throw e;
        }
      }
      /**
       * Attempts to load default credentials from a well-known file location
       * @return Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromWellKnownFile(options2) {
        let location = null;
        if (this._isWindows()) {
          location = process.env["APPDATA"];
        } else {
          const home = process.env["HOME"];
          if (home) {
            location = path.join(home, ".config");
          }
        }
        if (location) {
          location = path.join(location, "gcloud", "application_default_credentials.json");
          if (!fs.existsSync(location)) {
            location = null;
          }
        }
        if (!location) {
          return null;
        }
        const client = await this._getApplicationCredentialsFromFilePath(location, options2);
        return client;
      }
      /**
       * Attempts to load default credentials from a file at the given path..
       * @param filePath The path to the file to read.
       * @returns Promise that resolves with the OAuth2Client
       * @api private
       */
      async _getApplicationCredentialsFromFilePath(filePath, options2 = {}) {
        if (!filePath || filePath.length === 0) {
          throw new Error("The file path is invalid.");
        }
        try {
          filePath = fs.realpathSync(filePath);
          if (!fs.lstatSync(filePath).isFile()) {
            throw new Error();
          }
        } catch (err) {
          if (err instanceof Error) {
            err.message = `The file at ${filePath} does not exist, or it is not a file. ${err.message}`;
          }
          throw err;
        }
        const readStream = fs.createReadStream(filePath);
        return this.fromStream(readStream, options2);
      }
      /**
       * Create a credentials instance using a given impersonated input options.
       * @param json The impersonated input object.
       * @returns JWT or UserRefresh Client with data
       */
      fromImpersonatedJSON(json) {
        if (!json) {
          throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
        }
        if (json.type !== impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          throw new Error(`The incoming JSON object does not have the "${impersonated_1.IMPERSONATED_ACCOUNT_TYPE}" type`);
        }
        if (!json.source_credentials) {
          throw new Error("The incoming JSON object does not contain a source_credentials field");
        }
        if (!json.service_account_impersonation_url) {
          throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
        }
        const sourceClient = this.fromJSON(json.source_credentials);
        if (json.service_account_impersonation_url?.length > 256) {
          throw new RangeError(`Target principal is too long: ${json.service_account_impersonation_url}`);
        }
        const targetPrincipal = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(json.service_account_impersonation_url)?.groups?.target;
        if (!targetPrincipal) {
          throw new RangeError(`Cannot extract target principal from ${json.service_account_impersonation_url}`);
        }
        const targetScopes = (this.scopes || json.scopes || this.defaultScopes) ?? [];
        return new impersonated_1.Impersonated({
          ...json,
          sourceClient,
          targetPrincipal,
          targetScopes: Array.isArray(targetScopes) ? targetScopes : [targetScopes]
        });
      }
      /**
       * Create a credentials instance using the given input options.
       * This client is not cached.
       *
       * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
       *
       * @deprecated This method is being deprecated because of a potential security risk.
       *
       * This method does not validate the credential configuration. The security
       * risk occurs when a credential configuration is accepted from a source that
       * is not under your control and used without validation on your side.
       *
       * If you know that you will be loading credential configurations of a
       * specific type, it is recommended to use a credential-type-specific
       * constructor. This will ensure that an unexpected credential type with
       * potential for malicious intent is not loaded unintentionally. You might
       * still have to do validation for certain credential types. Please follow
       * the recommendation for that method. For example, if you want to load only
       * service accounts, you can use the `JWT` constructor:
       * ```
       * const {JWT} = require('google-auth-library');
       * const keys = require('/path/to/key.json');
       * const client = new JWT({
       *   email: keys.client_email,
       *   key: keys.private_key,
       *   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
       * });
       * ```
       *
       * If you are loading your credential configuration from an untrusted source and have
       * not mitigated the risks (e.g. by validating the configuration yourself), make
       * these changes as soon as possible to prevent security risks to your environment.
       *
       * Regardless of the method used, it is always your responsibility to validate
       * configurations received from external sources.
       *
       * For more details, see https://cloud.google.com/docs/authentication/external/externally-sourced-credentials.
       *
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      fromJSON(json, options2 = {}) {
        let client;
        const preferredUniverseDomain = (0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
        if (json.type === refreshclient_1.USER_REFRESH_ACCOUNT_TYPE) {
          client = new refreshclient_1.UserRefreshClient(options2);
          client.fromJSON(json);
        } else if (json.type === impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          client = this.fromImpersonatedJSON(json);
        } else if (json.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          client = externalclient_1.ExternalAccountClient.fromJSON({
            ...json,
            ...options2
          });
          client.scopes = this.getAnyScopes();
        } else if (json.type === externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) {
          client = new externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient({
            ...json,
            ...options2
          });
        } else {
          options2.scopes = this.scopes;
          client = new jwtclient_1.JWT(options2);
          this.setGapicJWTValues(client);
          client.fromJSON(json);
        }
        if (preferredUniverseDomain) {
          client.universeDomain = preferredUniverseDomain;
        }
        return client;
      }
      /**
       * Return a JWT or UserRefreshClient from JavaScript object, caching both the
       * object used to instantiate and the client.
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      _cacheClientFromJSON(json, options2) {
        const client = this.fromJSON(json, options2);
        this.jsonContent = json;
        this.cachedCredential = client;
        return client;
      }
      fromStream(inputStream, optionsOrCallback = {}, callback) {
        let options2 = {};
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.fromStreamAsync(inputStream, options2).then((r) => callback(null, r), callback);
        } else {
          return this.fromStreamAsync(inputStream, options2);
        }
      }
      fromStreamAsync(inputStream, options2) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            throw new Error("Must pass in a stream containing the Google auth settings.");
          }
          const chunks = [];
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => chunks.push(chunk)).on("end", () => {
            try {
              try {
                const data = JSON.parse(chunks.join(""));
                const r = this._cacheClientFromJSON(data, options2);
                return resolve(r);
              } catch (err) {
                if (!this.keyFilename)
                  throw err;
                const client = new jwtclient_1.JWT({
                  ...this.clientOptions,
                  keyFile: this.keyFilename
                });
                this.cachedCredential = client;
                this.setGapicJWTValues(client);
                return resolve(client);
              }
            } catch (err) {
              return reject(err);
            }
          });
        });
      }
      /**
       * Create a credentials instance using the given API key string.
       * The created client is not cached. In order to create and cache it use the {@link GoogleAuth.getClient `getClient`} method after first providing an {@link GoogleAuth.apiKey `apiKey`}.
       *
       * @param apiKey The API key string
       * @param options An optional options object.
       * @returns A JWT loaded from the key
       */
      fromAPIKey(apiKey, options2 = {}) {
        return new jwtclient_1.JWT({ ...options2, apiKey });
      }
      /**
       * Determines whether the current operating system is Windows.
       * @api private
       */
      _isWindows() {
        const sys = os.platform();
        if (sys && sys.length >= 3) {
          if (sys.substring(0, 3).toLowerCase() === "win") {
            return true;
          }
        }
        return false;
      }
      /**
       * Run the Google Cloud SDK command that prints the default project ID
       */
      async getDefaultServiceProjectId() {
        return new Promise((resolve) => {
          (0, child_process_1.exec)("gcloud config config-helper --format json", (err, stdout) => {
            if (!err && stdout) {
              try {
                const projectId = JSON.parse(stdout).configuration.properties.core.project;
                resolve(projectId);
                return;
              } catch (e) {
              }
            }
            resolve(null);
          });
        });
      }
      /**
       * Loads the project id from environment variables.
       * @api private
       */
      getProductionProjectId() {
        return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || process.env["gcloud_project"] || process.env["google_cloud_project"];
      }
      /**
       * Loads the project id from the GOOGLE_APPLICATION_CREDENTIALS json file.
       * @api private
       */
      async getFileProjectId() {
        if (this.cachedCredential) {
          return this.cachedCredential.projectId;
        }
        if (this.keyFilename) {
          const creds = await this.getClient();
          if (creds && creds.projectId) {
            return creds.projectId;
          }
        }
        const r = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
        if (r) {
          return r.projectId;
        } else {
          return null;
        }
      }
      /**
       * Gets the project ID from external account client if available.
       */
      async getExternalAccountClientProjectId() {
        if (!this.jsonContent || this.jsonContent.type !== baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          return null;
        }
        const creds = await this.getClient();
        return await creds.getProjectId();
      }
      /**
       * Gets the Compute Engine project ID if it can be inferred.
       */
      async getGCEProjectId() {
        try {
          const r = await gcpMetadata.project("project-id");
          return r;
        } catch (e) {
          return null;
        }
      }
      getCredentials(callback) {
        if (callback) {
          this.getCredentialsAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getCredentialsAsync();
        }
      }
      async getCredentialsAsync() {
        const client = await this.getClient();
        if (client instanceof impersonated_1.Impersonated) {
          return { client_email: client.getTargetPrincipal() };
        }
        if (client instanceof baseexternalclient_1.BaseExternalAccountClient) {
          const serviceAccountEmail = client.getServiceAccountEmail();
          if (serviceAccountEmail) {
            return {
              client_email: serviceAccountEmail,
              universe_domain: client.universeDomain
            };
          }
        }
        if (this.jsonContent) {
          return {
            client_email: this.jsonContent.client_email,
            private_key: this.jsonContent.private_key,
            universe_domain: this.jsonContent.universe_domain
          };
        }
        if (await this._checkIsGCE()) {
          const [client_email, universe_domain] = await Promise.all([
            gcpMetadata.instance("service-accounts/default/email"),
            this.getUniverseDomain()
          ]);
          return { client_email, universe_domain };
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND);
      }
      /**
       * Automatically obtain an {@link AuthClient `AuthClient`} based on the
       * provided configuration. If no options were passed, use Application
       * Default Credentials.
       */
      async getClient() {
        if (this.cachedCredential) {
          return this.cachedCredential;
        }
        this.#pendingAuthClient = this.#pendingAuthClient || this.#determineClient();
        try {
          return await this.#pendingAuthClient;
        } finally {
          this.#pendingAuthClient = null;
        }
      }
      async #determineClient() {
        if (this.jsonContent) {
          return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
        } else if (this.keyFilename) {
          const filePath = path.resolve(this.keyFilename);
          const stream = fs.createReadStream(filePath);
          return await this.fromStreamAsync(stream, this.clientOptions);
        } else if (this.apiKey) {
          const client = await this.fromAPIKey(this.apiKey, this.clientOptions);
          client.scopes = this.scopes;
          const { credential } = await this.#prepareAndCacheClient(client);
          return credential;
        } else {
          const { credential } = await this.getApplicationDefaultAsync(this.clientOptions);
          return credential;
        }
      }
      /**
       * Creates a client which will fetch an ID token for authorization.
       * @param targetAudience the audience for the fetched ID token.
       * @returns IdTokenClient for making HTTP calls authenticated with ID tokens.
       */
      async getIdTokenClient(targetAudience) {
        const client = await this.getClient();
        if (!("fetchIdToken" in client)) {
          throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
        }
        return new idtokenclient_1.IdTokenClient({ targetAudience, idTokenProvider: client });
      }
      /**
       * Automatically obtain application default credentials, and return
       * an access token for making requests.
       */
      async getAccessToken() {
        const client = await this.getClient();
        return (await client.getAccessToken()).token;
      }
      /**
       * Obtain the HTTP headers that will provide authorization for a given
       * request.
       */
      async getRequestHeaders(url) {
        const client = await this.getClient();
        return client.getRequestHeaders(url);
      }
      /**
       * Obtain credentials for a request, then attach the appropriate headers to
       * the request options.
       * @param opts Axios or Request options on which to attach the headers
       */
      async authorizeRequest(opts = {}) {
        const url = opts.url;
        const client = await this.getClient();
        const headers = await client.getRequestHeaders(url);
        opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers, headers);
        return opts;
      }
      /**
       * A {@link fetch `fetch`} compliant API for {@link GoogleAuth}.
       *
       * @see {@link GoogleAuth.request} for the classic method.
       *
       * @remarks
       *
       * This is useful as a drop-in replacement for `fetch` API usage.
       *
       * @example
       *
       * ```ts
       * const auth = new GoogleAuth();
       * const fetchWithAuth: typeof fetch = (...args) => auth.fetch(...args);
       * await fetchWithAuth('https://example.com');
       * ```
       *
       * @param args `fetch` API or {@link Gaxios.fetch `Gaxios#fetch`} parameters
       * @returns the {@link GaxiosResponse} with Gaxios-added properties
       */
      async fetch(...args) {
        const client = await this.getClient();
        return client.fetch(...args);
      }
      /**
       * Automatically obtain application default credentials, and make an
       * HTTP request using the given options.
       *
       * @see {@link GoogleAuth.fetch} for the modern method.
       *
       * @param opts Axios request options for the HTTP request.
       */
      async request(opts) {
        const client = await this.getClient();
        return client.request(opts);
      }
      /**
       * Determine the compute environment in which the code is running.
       */
      getEnv() {
        return (0, envDetect_1.getEnv)();
      }
      /**
       * Sign the given data with the current private key, or go out
       * to the IAM API to sign it.
       * @param data The data to be signed.
       * @param endpoint A custom endpoint to use.
       *
       * @example
       * ```
       * sign('data', 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/');
       * ```
       */
      async sign(data, endpoint) {
        const client = await this.getClient();
        const universe = await this.getUniverseDomain();
        endpoint = endpoint || `https://iamcredentials.${universe}/v1/projects/-/serviceAccounts/`;
        if (client instanceof impersonated_1.Impersonated) {
          const signed = await client.sign(data);
          return signed.signedBlob;
        }
        const crypto2 = (0, crypto_1.createCrypto)();
        if (client instanceof jwtclient_1.JWT && client.key) {
          const sign = await crypto2.sign(client.key, data);
          return sign;
        }
        const creds = await this.getCredentials();
        if (!creds.client_email) {
          throw new Error("Cannot sign data without `client_email`.");
        }
        return this.signBlob(crypto2, creds.client_email, data, endpoint);
      }
      async signBlob(crypto2, emailOrUniqueId, data, endpoint) {
        const url = new URL(endpoint + `${emailOrUniqueId}:signBlob`);
        const res = await this.request({
          method: "POST",
          url: url.href,
          data: {
            payload: crypto2.encodeBase64StringUtf8(data)
          },
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["POST"]
          }
        });
        return res.data.signedBlob;
      }
    }
    exports.GoogleAuth = GoogleAuth;
  })(googleauth$1);
  return googleauth$1;
}
var iam$1 = {};
var hasRequiredIam$1;
function requireIam$1() {
  if (hasRequiredIam$1) return iam$1;
  hasRequiredIam$1 = 1;
  Object.defineProperty(iam$1, "__esModule", { value: true });
  iam$1.IAMAuth = void 0;
  class IAMAuth {
    selector;
    token;
    /**
     * IAM credentials.
     *
     * @param selector the iam authority selector
     * @param token the token
     * @constructor
     */
    constructor(selector, token) {
      this.selector = selector;
      this.token = token;
      this.selector = selector;
      this.token = token;
    }
    /**
     * Acquire the HTTP headers required to make an authenticated request.
     */
    getRequestHeaders() {
      return {
        "x-goog-iam-authority-selector": this.selector,
        "x-goog-iam-authorization-token": this.token
      };
    }
  }
  iam$1.IAMAuth = IAMAuth;
  return iam$1;
}
var downscopedclient$1 = {};
var hasRequiredDownscopedclient$1;
function requireDownscopedclient$1() {
  if (hasRequiredDownscopedclient$1) return downscopedclient$1;
  hasRequiredDownscopedclient$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DownscopedClient = exports.EXPIRATION_TIME_OFFSET = exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
    const gaxios_1 = requireSrc$6();
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient$1();
    const sts = requireStscredentials$1();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const STS_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    class DownscopedClient extends authclient_1.AuthClient {
      authClient;
      credentialAccessBoundary;
      cachedDownscopedAccessToken;
      stsCredential;
      /**
       * Instantiates a downscoped client object using the provided source
       * AuthClient and credential access boundary rules.
       * To downscope permissions of a source AuthClient, a Credential Access
       * Boundary that specifies which resources the new credential can access, as
       * well as an upper bound on the permissions that are available on each
       * resource, has to be defined. A downscoped client can then be instantiated
       * using the source AuthClient and the Credential Access Boundary.
       * @param options the {@link DownscopedClientOptions `DownscopedClientOptions`} to use. Passing an `AuthClient` directly is **@DEPRECATED**.
       * @param credentialAccessBoundary **@DEPRECATED**. Provide a {@link DownscopedClientOptions `DownscopedClientOptions`} object in the first parameter instead.
       */
      constructor(options2, credentialAccessBoundary = {
        accessBoundary: {
          accessBoundaryRules: []
        }
      }) {
        super(options2 instanceof authclient_1.AuthClient ? {} : options2);
        if (options2 instanceof authclient_1.AuthClient) {
          this.authClient = options2;
          this.credentialAccessBoundary = credentialAccessBoundary;
        } else {
          this.authClient = options2.authClient;
          this.credentialAccessBoundary = options2.credentialAccessBoundary;
        }
        if (this.credentialAccessBoundary.accessBoundary.accessBoundaryRules.length === 0) {
          throw new Error("At least one access boundary rule needs to be defined.");
        } else if (this.credentialAccessBoundary.accessBoundary.accessBoundaryRules.length > exports.MAX_ACCESS_BOUNDARY_RULES_COUNT) {
          throw new Error(`The provided access boundary has more than ${exports.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
        }
        for (const rule of this.credentialAccessBoundary.accessBoundary.accessBoundaryRules) {
          if (rule.availablePermissions.length === 0) {
            throw new Error("At least one permission should be defined in access boundary rules.");
          }
        }
        this.stsCredential = new sts.StsCredentials({
          tokenExchangeEndpoint: `https://sts.${this.universeDomain}/v1/token`
        });
        this.cachedDownscopedAccessToken = null;
      }
      /**
       * Provides a mechanism to inject Downscoped access tokens directly.
       * The expiry_date field is required to facilitate determination of the token
       * expiration which would make it easier for the token consumer to handle.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        if (!credentials.expiry_date) {
          throw new Error("The access token expiry_date field is missing in the provided credentials.");
        }
        super.setCredentials(credentials);
        this.cachedDownscopedAccessToken = credentials;
      }
      async getAccessToken() {
        if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedDownscopedAccessToken.access_token,
          expirationTime: this.cachedDownscopedAccessToken.expiry_date,
          res: this.cachedDownscopedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = new Headers({
          authorization: `Bearer ${accessTokenResponse.token}`
        });
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = gaxios_1.Gaxios.mergeHeaders(opts.headers);
          this.addUserProjectAndAuthHeaders(opts.headers, requestHeaders);
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * GCP access tokens are retrieved from authclient object/source credential.
       * Then GCP access tokens are exchanged for downscoped access tokens via the
       * token exchange endpoint.
       * @return A promise that resolves with the fresh downscoped access token.
       */
      async refreshAccessTokenAsync() {
        const subjectToken = (await this.authClient.getAccessToken()).token;
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: STS_SUBJECT_TOKEN_TYPE
        };
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, void 0, this.credentialAccessBoundary);
        const sourceCredExpireDate = this.authClient.credentials?.expiry_date || null;
        const expiryDate = stsResponse.expires_in ? (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3 : sourceCredExpireDate;
        this.cachedDownscopedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: expiryDate,
          res: stsResponse.res
        };
        this.credentials = {};
        Object.assign(this.credentials, this.cachedDownscopedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedDownscopedAccessToken.expiry_date,
          access_token: this.cachedDownscopedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedDownscopedAccessToken;
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param downscopedAccessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(downscopedAccessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return downscopedAccessToken.expiry_date ? now >= downscopedAccessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
    }
    exports.DownscopedClient = DownscopedClient;
  })(downscopedclient$1);
  return downscopedclient$1;
}
var passthrough$1 = {};
var hasRequiredPassthrough$1;
function requirePassthrough$1() {
  if (hasRequiredPassthrough$1) return passthrough$1;
  hasRequiredPassthrough$1 = 1;
  Object.defineProperty(passthrough$1, "__esModule", { value: true });
  passthrough$1.PassThroughClient = void 0;
  const authclient_1 = requireAuthclient$1();
  class PassThroughClient extends authclient_1.AuthClient {
    /**
     * Creates a request without any authentication headers or checks.
     *
     * @remarks
     *
     * In testing environments it may be useful to change the provided
     * {@link AuthClient.transporter} for any desired request overrides/handling.
     *
     * @param opts
     * @returns The response of the request.
     */
    async request(opts) {
      return this.transporter.request(opts);
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getAccessToken() {
      return {};
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getRequestHeaders() {
      return new Headers();
    }
  }
  passthrough$1.PassThroughClient = PassThroughClient;
  return passthrough$1;
}
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.auth = exports.PassThroughClient = exports.ExternalAccountAuthorizedUserClient = exports.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = exports.ExecutableError = exports.PluggableAuthClient = exports.DownscopedClient = exports.BaseExternalAccountClient = exports.ExternalAccountClient = exports.IdentityPoolClient = exports.AwsRequestSigner = exports.AwsClient = exports.UserRefreshClient = exports.LoginTicket = exports.ClientAuthentication = exports.OAuth2Client = exports.CodeChallengeMethod = exports.Impersonated = exports.JWT = exports.JWTAccess = exports.IdTokenClient = exports.IAMAuth = exports.GCPEnv = exports.Compute = exports.DEFAULT_UNIVERSE = exports.AuthClient = exports.gaxios = exports.gcpMetadata = void 0;
    const googleauth_1 = requireGoogleauth$1();
    Object.defineProperty(exports, "GoogleAuth", { enumerable: true, get: function() {
      return googleauth_1.GoogleAuth;
    } });
    exports.gcpMetadata = requireSrc$5();
    exports.gaxios = requireSrc$6();
    var authclient_1 = requireAuthclient$1();
    Object.defineProperty(exports, "AuthClient", { enumerable: true, get: function() {
      return authclient_1.AuthClient;
    } });
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: function() {
      return authclient_1.DEFAULT_UNIVERSE;
    } });
    var computeclient_1 = requireComputeclient$1();
    Object.defineProperty(exports, "Compute", { enumerable: true, get: function() {
      return computeclient_1.Compute;
    } });
    var envDetect_1 = requireEnvDetect$1();
    Object.defineProperty(exports, "GCPEnv", { enumerable: true, get: function() {
      return envDetect_1.GCPEnv;
    } });
    var iam_1 = requireIam$1();
    Object.defineProperty(exports, "IAMAuth", { enumerable: true, get: function() {
      return iam_1.IAMAuth;
    } });
    var idtokenclient_1 = requireIdtokenclient$1();
    Object.defineProperty(exports, "IdTokenClient", { enumerable: true, get: function() {
      return idtokenclient_1.IdTokenClient;
    } });
    var jwtaccess_1 = requireJwtaccess$1();
    Object.defineProperty(exports, "JWTAccess", { enumerable: true, get: function() {
      return jwtaccess_1.JWTAccess;
    } });
    var jwtclient_1 = requireJwtclient$1();
    Object.defineProperty(exports, "JWT", { enumerable: true, get: function() {
      return jwtclient_1.JWT;
    } });
    var impersonated_1 = requireImpersonated$1();
    Object.defineProperty(exports, "Impersonated", { enumerable: true, get: function() {
      return impersonated_1.Impersonated;
    } });
    var oauth2client_1 = requireOauth2client$1();
    Object.defineProperty(exports, "CodeChallengeMethod", { enumerable: true, get: function() {
      return oauth2client_1.CodeChallengeMethod;
    } });
    Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: function() {
      return oauth2client_1.OAuth2Client;
    } });
    Object.defineProperty(exports, "ClientAuthentication", { enumerable: true, get: function() {
      return oauth2client_1.ClientAuthentication;
    } });
    var loginticket_1 = requireLoginticket$1();
    Object.defineProperty(exports, "LoginTicket", { enumerable: true, get: function() {
      return loginticket_1.LoginTicket;
    } });
    var refreshclient_1 = requireRefreshclient$1();
    Object.defineProperty(exports, "UserRefreshClient", { enumerable: true, get: function() {
      return refreshclient_1.UserRefreshClient;
    } });
    var awsclient_1 = requireAwsclient$1();
    Object.defineProperty(exports, "AwsClient", { enumerable: true, get: function() {
      return awsclient_1.AwsClient;
    } });
    var awsrequestsigner_1 = requireAwsrequestsigner$1();
    Object.defineProperty(exports, "AwsRequestSigner", { enumerable: true, get: function() {
      return awsrequestsigner_1.AwsRequestSigner;
    } });
    var identitypoolclient_1 = requireIdentitypoolclient$1();
    Object.defineProperty(exports, "IdentityPoolClient", { enumerable: true, get: function() {
      return identitypoolclient_1.IdentityPoolClient;
    } });
    var externalclient_1 = requireExternalclient$1();
    Object.defineProperty(exports, "ExternalAccountClient", { enumerable: true, get: function() {
      return externalclient_1.ExternalAccountClient;
    } });
    var baseexternalclient_1 = requireBaseexternalclient$1();
    Object.defineProperty(exports, "BaseExternalAccountClient", { enumerable: true, get: function() {
      return baseexternalclient_1.BaseExternalAccountClient;
    } });
    var downscopedclient_1 = requireDownscopedclient$1();
    Object.defineProperty(exports, "DownscopedClient", { enumerable: true, get: function() {
      return downscopedclient_1.DownscopedClient;
    } });
    var pluggable_auth_client_1 = requirePluggableAuthClient$1();
    Object.defineProperty(exports, "PluggableAuthClient", { enumerable: true, get: function() {
      return pluggable_auth_client_1.PluggableAuthClient;
    } });
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: function() {
      return pluggable_auth_client_1.ExecutableError;
    } });
    var externalAccountAuthorizedUserClient_1 = requireExternalAccountAuthorizedUserClient$1();
    Object.defineProperty(exports, "EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE", { enumerable: true, get: function() {
      return externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE;
    } });
    Object.defineProperty(exports, "ExternalAccountAuthorizedUserClient", { enumerable: true, get: function() {
      return externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient;
    } });
    var passthrough_1 = requirePassthrough$1();
    Object.defineProperty(exports, "PassThroughClient", { enumerable: true, get: function() {
      return passthrough_1.PassThroughClient;
    } });
    const auth = new googleauth_1.GoogleAuth();
    exports.auth = auth;
  })(src$1);
  return src$1;
}
var src = {};
var googleauth = {};
var crypto$2 = {};
var crypto$1 = {};
var hasRequiredCrypto$2;
function requireCrypto$2() {
  if (hasRequiredCrypto$2) return crypto$1;
  hasRequiredCrypto$2 = 1;
  Object.defineProperty(crypto$1, "__esModule", { value: true });
  crypto$1.BrowserCrypto = void 0;
  const base64js = requireBase64Js();
  const crypto_1 = requireCrypto();
  class BrowserCrypto {
    constructor() {
      if (typeof window === "undefined" || window.crypto === void 0 || window.crypto.subtle === void 0) {
        throw new Error("SubtleCrypto not found. Make sure it's an https:// website.");
      }
    }
    async sha256DigestBase64(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return base64js.fromByteArray(new Uint8Array(outputBuffer));
    }
    randomBytesBase64(count) {
      const array = new Uint8Array(count);
      window.crypto.getRandomValues(array);
      return base64js.fromByteArray(array);
    }
    static padBase64(base64) {
      while (base64.length % 4 !== 0) {
        base64 += "=";
      }
      return base64;
    }
    async verify(pubkey, data, signature) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const signatureArray = base64js.toByteArray(BrowserCrypto.padBase64(signature));
      const cryptoKey = await window.crypto.subtle.importKey("jwk", pubkey, algo, true, ["verify"]);
      const result = await window.crypto.subtle.verify(algo, cryptoKey, signatureArray, dataArray);
      return result;
    }
    async sign(privateKey, data) {
      const algo = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
      const dataArray = new TextEncoder().encode(data);
      const cryptoKey = await window.crypto.subtle.importKey("jwk", privateKey, algo, true, ["sign"]);
      const result = await window.crypto.subtle.sign(algo, cryptoKey, dataArray);
      return base64js.fromByteArray(new Uint8Array(result));
    }
    decodeBase64StringUtf8(base64) {
      const uint8array = base64js.toByteArray(BrowserCrypto.padBase64(base64));
      const result = new TextDecoder().decode(uint8array);
      return result;
    }
    encodeBase64StringUtf8(text) {
      const uint8array = new TextEncoder().encode(text);
      const result = base64js.fromByteArray(uint8array);
      return result;
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      const inputBuffer = new TextEncoder().encode(str);
      const outputBuffer = await window.crypto.subtle.digest("SHA-256", inputBuffer);
      return (0, crypto_1.fromArrayBufferToHex)(outputBuffer);
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const rawKey = typeof key === "string" ? key : String.fromCharCode(...new Uint16Array(key));
      const enc = new TextEncoder();
      const cryptoKey = await window.crypto.subtle.importKey("raw", enc.encode(rawKey), {
        name: "HMAC",
        hash: {
          name: "SHA-256"
        }
      }, false, ["sign"]);
      return window.crypto.subtle.sign("HMAC", cryptoKey, enc.encode(msg));
    }
  }
  crypto$1.BrowserCrypto = BrowserCrypto;
  return crypto$1;
}
var crypto = {};
var hasRequiredCrypto$1;
function requireCrypto$1() {
  if (hasRequiredCrypto$1) return crypto;
  hasRequiredCrypto$1 = 1;
  Object.defineProperty(crypto, "__esModule", { value: true });
  crypto.NodeCrypto = void 0;
  const crypto$12 = require$$0$2;
  class NodeCrypto {
    async sha256DigestBase64(str) {
      return crypto$12.createHash("sha256").update(str).digest("base64");
    }
    randomBytesBase64(count) {
      return crypto$12.randomBytes(count).toString("base64");
    }
    async verify(pubkey, data, signature) {
      const verifier = crypto$12.createVerify("RSA-SHA256");
      verifier.update(data);
      verifier.end();
      return verifier.verify(pubkey, signature, "base64");
    }
    async sign(privateKey, data) {
      const signer = crypto$12.createSign("RSA-SHA256");
      signer.update(data);
      signer.end();
      return signer.sign(privateKey, "base64");
    }
    decodeBase64StringUtf8(base64) {
      return Buffer.from(base64, "base64").toString("utf-8");
    }
    encodeBase64StringUtf8(text) {
      return Buffer.from(text, "utf-8").toString("base64");
    }
    /**
     * Computes the SHA-256 hash of the provided string.
     * @param str The plain text string to hash.
     * @return A promise that resolves with the SHA-256 hash of the provided
     *   string in hexadecimal encoding.
     */
    async sha256DigestHex(str) {
      return crypto$12.createHash("sha256").update(str).digest("hex");
    }
    /**
     * Computes the HMAC hash of a message using the provided crypto key and the
     * SHA-256 algorithm.
     * @param key The secret crypto key in utf-8 or ArrayBuffer format.
     * @param msg The plain text message.
     * @return A promise that resolves with the HMAC-SHA256 hash in ArrayBuffer
     *   format.
     */
    async signWithHmacSha256(key, msg) {
      const cryptoKey = typeof key === "string" ? key : toBuffer(key);
      return toArrayBuffer(crypto$12.createHmac("sha256", cryptoKey).update(msg).digest());
    }
  }
  crypto.NodeCrypto = NodeCrypto;
  function toArrayBuffer(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }
  function toBuffer(arrayBuffer) {
    return Buffer.from(arrayBuffer);
  }
  return crypto;
}
var hasRequiredCrypto;
function requireCrypto() {
  if (hasRequiredCrypto) return crypto$2;
  hasRequiredCrypto = 1;
  Object.defineProperty(crypto$2, "__esModule", { value: true });
  crypto$2.createCrypto = createCrypto;
  crypto$2.hasBrowserCrypto = hasBrowserCrypto;
  crypto$2.fromArrayBufferToHex = fromArrayBufferToHex;
  const crypto_1 = requireCrypto$2();
  const crypto_2 = requireCrypto$1();
  function createCrypto() {
    if (hasBrowserCrypto()) {
      return new crypto_1.BrowserCrypto();
    }
    return new crypto_2.NodeCrypto();
  }
  function hasBrowserCrypto() {
    return typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.subtle !== "undefined";
  }
  function fromArrayBufferToHex(arrayBuffer) {
    const byteArray = Array.from(new Uint8Array(arrayBuffer));
    return byteArray.map((byte) => {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }
  return crypto$2;
}
var transporters = {};
var options = {};
var hasRequiredOptions;
function requireOptions() {
  if (hasRequiredOptions) return options;
  hasRequiredOptions = 1;
  Object.defineProperty(options, "__esModule", { value: true });
  options.validate = validate;
  function validate(options2) {
    const vpairs = [
      { invalid: "uri", expected: "url" },
      { invalid: "json", expected: "data" },
      { invalid: "qs", expected: "params" }
    ];
    for (const pair of vpairs) {
      if (options2[pair.invalid]) {
        const e = `'${pair.invalid}' is not a valid configuration option. Please use '${pair.expected}' instead. This library is using Axios for requests. Please see https://github.com/axios/axios to learn more about the valid request options.`;
        throw new Error(e);
      }
    }
  }
  return options;
}
const version = "9.15.1";
const require$$4 = {
  version
};
var hasRequiredTransporters;
function requireTransporters() {
  if (hasRequiredTransporters) return transporters;
  hasRequiredTransporters = 1;
  Object.defineProperty(transporters, "__esModule", { value: true });
  transporters.DefaultTransporter = void 0;
  const gaxios_1 = requireSrc$8();
  const options_1 = requireOptions();
  const pkg = require$$4;
  const PRODUCT_NAME = "google-api-nodejs-client";
  class DefaultTransporter {
    constructor() {
      this.instance = new gaxios_1.Gaxios();
    }
    /**
     * Configures request options before making a request.
     * @param opts GaxiosOptions options.
     * @return Configured options.
     */
    configure(opts = {}) {
      opts.headers = opts.headers || {};
      if (typeof window === "undefined") {
        const uaValue = opts.headers["User-Agent"];
        if (!uaValue) {
          opts.headers["User-Agent"] = DefaultTransporter.USER_AGENT;
        } else if (!uaValue.includes(`${PRODUCT_NAME}/`)) {
          opts.headers["User-Agent"] = `${uaValue} ${DefaultTransporter.USER_AGENT}`;
        }
        if (!opts.headers["x-goog-api-client"]) {
          const nodeVersion = process.version.replace(/^v/, "");
          opts.headers["x-goog-api-client"] = `gl-node/${nodeVersion}`;
        }
      }
      return opts;
    }
    /**
     * Makes a request using Gaxios with given options.
     * @param opts GaxiosOptions options.
     * @param callback optional callback that contains GaxiosResponse object.
     * @return GaxiosPromise, assuming no callback is passed.
     */
    request(opts) {
      opts = this.configure(opts);
      (0, options_1.validate)(opts);
      return this.instance.request(opts).catch((e) => {
        throw this.processError(e);
      });
    }
    get defaults() {
      return this.instance.defaults;
    }
    set defaults(opts) {
      this.instance.defaults = opts;
    }
    /**
     * Changes the error to include details from the body.
     */
    processError(e) {
      const res = e.response;
      const err = e;
      const body = res ? res.data : null;
      if (res && body && body.error && res.status !== 200) {
        if (typeof body.error === "string") {
          err.message = body.error;
          err.status = res.status;
        } else if (Array.isArray(body.error.errors)) {
          err.message = body.error.errors.map((err2) => err2.message).join("\n");
          err.code = body.error.code;
          err.errors = body.error.errors;
        } else {
          err.message = body.error.message;
          err.code = body.error.code;
        }
      } else if (res && res.status >= 400) {
        err.message = body;
        err.status = res.status;
      }
      return err;
    }
  }
  transporters.DefaultTransporter = DefaultTransporter;
  DefaultTransporter.USER_AGENT = `${PRODUCT_NAME}/${pkg.version}`;
  return transporters;
}
var computeclient = {};
var oauth2client = {};
var authclient = {};
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  var __classPrivateFieldGet = util && util.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _LRUCache_instances, _LRUCache_cache, _LRUCache_moveToEnd, _LRUCache_evict;
  Object.defineProperty(util, "__esModule", { value: true });
  util.LRUCache = void 0;
  util.snakeToCamel = snakeToCamel;
  util.originalOrCamelOptions = originalOrCamelOptions;
  function snakeToCamel(str) {
    return str.replace(/([_][^_])/g, (match) => match.slice(1).toUpperCase());
  }
  function originalOrCamelOptions(obj) {
    function get(key) {
      var _a;
      const o = obj || {};
      return (_a = o[key]) !== null && _a !== void 0 ? _a : o[snakeToCamel(key)];
    }
    return { get };
  }
  class LRUCache {
    constructor(options2) {
      _LRUCache_instances.add(this);
      _LRUCache_cache.set(this, /* @__PURE__ */ new Map());
      this.capacity = options2.capacity;
      this.maxAge = options2.maxAge;
    }
    /**
     * Add an item to the cache.
     *
     * @param key the key to upsert
     * @param value the value of the key
     */
    set(key, value) {
      __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_moveToEnd).call(this, key, value);
      __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_evict).call(this);
    }
    /**
     * Get an item from the cache.
     *
     * @param key the key to retrieve
     */
    get(key) {
      const item = __classPrivateFieldGet(this, _LRUCache_cache, "f").get(key);
      if (!item)
        return;
      __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_moveToEnd).call(this, key, item.value);
      __classPrivateFieldGet(this, _LRUCache_instances, "m", _LRUCache_evict).call(this);
      return item.value;
    }
  }
  util.LRUCache = LRUCache;
  _LRUCache_cache = /* @__PURE__ */ new WeakMap(), _LRUCache_instances = /* @__PURE__ */ new WeakSet(), _LRUCache_moveToEnd = function _LRUCache_moveToEnd2(key, value) {
    __classPrivateFieldGet(this, _LRUCache_cache, "f").delete(key);
    __classPrivateFieldGet(this, _LRUCache_cache, "f").set(key, {
      value,
      lastAccessed: Date.now()
    });
  }, _LRUCache_evict = function _LRUCache_evict2() {
    const cutoffDate = this.maxAge ? Date.now() - this.maxAge : 0;
    let oldestItem = __classPrivateFieldGet(this, _LRUCache_cache, "f").entries().next();
    while (!oldestItem.done && (__classPrivateFieldGet(this, _LRUCache_cache, "f").size > this.capacity || // too many
    oldestItem.value[1].lastAccessed < cutoffDate)) {
      __classPrivateFieldGet(this, _LRUCache_cache, "f").delete(oldestItem.value[0]);
      oldestItem = __classPrivateFieldGet(this, _LRUCache_cache, "f").entries().next();
    }
  };
  return util;
}
var hasRequiredAuthclient;
function requireAuthclient() {
  if (hasRequiredAuthclient) return authclient;
  hasRequiredAuthclient = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthClient = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = exports.DEFAULT_UNIVERSE = void 0;
    const events_1 = require$$0$4;
    const gaxios_1 = requireSrc$8();
    const transporters_1 = requireTransporters();
    const util_1 = requireUtil();
    exports.DEFAULT_UNIVERSE = "googleapis.com";
    exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS = 5 * 60 * 1e3;
    class AuthClient extends events_1.EventEmitter {
      constructor(opts = {}) {
        var _a, _b, _c, _d, _e;
        super();
        this.credentials = {};
        this.eagerRefreshThresholdMillis = exports.DEFAULT_EAGER_REFRESH_THRESHOLD_MILLIS;
        this.forceRefreshOnFailure = false;
        this.universeDomain = exports.DEFAULT_UNIVERSE;
        const options2 = (0, util_1.originalOrCamelOptions)(opts);
        this.apiKey = opts.apiKey;
        this.projectId = (_a = options2.get("project_id")) !== null && _a !== void 0 ? _a : null;
        this.quotaProjectId = options2.get("quota_project_id");
        this.credentials = (_b = options2.get("credentials")) !== null && _b !== void 0 ? _b : {};
        this.universeDomain = (_c = options2.get("universe_domain")) !== null && _c !== void 0 ? _c : exports.DEFAULT_UNIVERSE;
        this.transporter = (_d = opts.transporter) !== null && _d !== void 0 ? _d : new transporters_1.DefaultTransporter();
        if (opts.transporterOptions) {
          this.transporter.defaults = opts.transporterOptions;
        }
        if (opts.eagerRefreshThresholdMillis) {
          this.eagerRefreshThresholdMillis = opts.eagerRefreshThresholdMillis;
        }
        this.forceRefreshOnFailure = (_e = opts.forceRefreshOnFailure) !== null && _e !== void 0 ? _e : false;
      }
      /**
       * Return the {@link Gaxios `Gaxios`} instance from the {@link AuthClient.transporter}.
       *
       * @expiremental
       */
      get gaxios() {
        if (this.transporter instanceof gaxios_1.Gaxios) {
          return this.transporter;
        } else if (this.transporter instanceof transporters_1.DefaultTransporter) {
          return this.transporter.instance;
        } else if ("instance" in this.transporter && this.transporter.instance instanceof gaxios_1.Gaxios) {
          return this.transporter.instance;
        }
        return null;
      }
      /**
       * Sets the auth credentials.
       */
      setCredentials(credentials) {
        this.credentials = credentials;
      }
      /**
       * Append additional headers, e.g., x-goog-user-project, shared across the
       * classes inheriting AuthClient. This method should be used by any method
       * that overrides getRequestMetadataAsync(), which is a shared helper for
       * setting request information in both gRPC and HTTP API calls.
       *
       * @param headers object to append additional headers to.
       */
      addSharedMetadataHeaders(headers) {
        if (!headers["x-goog-user-project"] && // don't override a value the user sets.
        this.quotaProjectId) {
          headers["x-goog-user-project"] = this.quotaProjectId;
        }
        return headers;
      }
      /**
       * Retry config for Auth-related requests.
       *
       * @remarks
       *
       * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
       * config as some downstream APIs would prefer if customers explicitly enable retries,
       * such as GCS.
       */
      static get RETRY_CONFIG() {
        return {
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
          }
        };
      }
    }
    exports.AuthClient = AuthClient;
  })(authclient);
  return authclient;
}
var loginticket = {};
var hasRequiredLoginticket;
function requireLoginticket() {
  if (hasRequiredLoginticket) return loginticket;
  hasRequiredLoginticket = 1;
  Object.defineProperty(loginticket, "__esModule", { value: true });
  loginticket.LoginTicket = void 0;
  class LoginTicket {
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @param {string} env Envelope of the jwt
     * @param {TokenPayload} pay Payload of the jwt
     * @constructor
     */
    constructor(env, pay) {
      this.envelope = env;
      this.payload = pay;
    }
    getEnvelope() {
      return this.envelope;
    }
    getPayload() {
      return this.payload;
    }
    /**
     * Create a simple class to extract user ID from an ID Token
     *
     * @return The user ID
     */
    getUserId() {
      const payload = this.getPayload();
      if (payload && payload.sub) {
        return payload.sub;
      }
      return null;
    }
    /**
     * Returns attributes from the login ticket.  This can contain
     * various information about the user session.
     *
     * @return The envelope and payload
     */
    getAttributes() {
      return { envelope: this.getEnvelope(), payload: this.getPayload() };
    }
  }
  loginticket.LoginTicket = LoginTicket;
  return loginticket;
}
var hasRequiredOauth2client;
function requireOauth2client() {
  if (hasRequiredOauth2client) return oauth2client;
  hasRequiredOauth2client = 1;
  Object.defineProperty(oauth2client, "__esModule", { value: true });
  oauth2client.OAuth2Client = oauth2client.ClientAuthentication = oauth2client.CertificateFormat = oauth2client.CodeChallengeMethod = void 0;
  const gaxios_1 = requireSrc$8();
  const querystring = require$$1$1;
  const stream = require$$0$5;
  const formatEcdsa = requireEcdsaSigFormatter();
  const crypto_1 = requireCrypto();
  const authclient_1 = requireAuthclient();
  const loginticket_1 = requireLoginticket();
  var CodeChallengeMethod;
  (function(CodeChallengeMethod2) {
    CodeChallengeMethod2["Plain"] = "plain";
    CodeChallengeMethod2["S256"] = "S256";
  })(CodeChallengeMethod || (oauth2client.CodeChallengeMethod = CodeChallengeMethod = {}));
  var CertificateFormat;
  (function(CertificateFormat2) {
    CertificateFormat2["PEM"] = "PEM";
    CertificateFormat2["JWK"] = "JWK";
  })(CertificateFormat || (oauth2client.CertificateFormat = CertificateFormat = {}));
  var ClientAuthentication;
  (function(ClientAuthentication2) {
    ClientAuthentication2["ClientSecretPost"] = "ClientSecretPost";
    ClientAuthentication2["ClientSecretBasic"] = "ClientSecretBasic";
    ClientAuthentication2["None"] = "None";
  })(ClientAuthentication || (oauth2client.ClientAuthentication = ClientAuthentication = {}));
  class OAuth2Client extends authclient_1.AuthClient {
    constructor(optionsOrClientId, clientSecret, redirectUri) {
      const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : { clientId: optionsOrClientId, clientSecret, redirectUri };
      super(opts);
      this.certificateCache = {};
      this.certificateExpiry = null;
      this.certificateCacheFormat = CertificateFormat.PEM;
      this.refreshTokenPromises = /* @__PURE__ */ new Map();
      this._clientId = opts.clientId;
      this._clientSecret = opts.clientSecret;
      this.redirectUri = opts.redirectUri;
      this.endpoints = {
        tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
        oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        oauth2TokenUrl: "https://oauth2.googleapis.com/token",
        oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
        oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
        oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
        oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
        ...opts.endpoints
      };
      this.clientAuthentication = opts.clientAuthentication || ClientAuthentication.ClientSecretPost;
      this.issuers = opts.issuers || [
        "accounts.google.com",
        "https://accounts.google.com",
        this.universeDomain
      ];
    }
    /**
     * Generates URL for consent page landing.
     * @param opts Options.
     * @return URL to consent page.
     */
    generateAuthUrl(opts = {}) {
      if (opts.code_challenge_method && !opts.code_challenge) {
        throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
      }
      opts.response_type = opts.response_type || "code";
      opts.client_id = opts.client_id || this._clientId;
      opts.redirect_uri = opts.redirect_uri || this.redirectUri;
      if (Array.isArray(opts.scope)) {
        opts.scope = opts.scope.join(" ");
      }
      const rootUrl = this.endpoints.oauth2AuthBaseUrl.toString();
      return rootUrl + "?" + querystring.stringify(opts);
    }
    generateCodeVerifier() {
      throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.");
    }
    /**
     * Convenience method to automatically generate a code_verifier, and its
     * resulting SHA256. If used, this must be paired with a S256
     * code_challenge_method.
     *
     * For a full example see:
     * https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/oauth2-codeVerifier.js
     */
    async generateCodeVerifierAsync() {
      const crypto2 = (0, crypto_1.createCrypto)();
      const randomString = crypto2.randomBytesBase64(96);
      const codeVerifier = randomString.replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-");
      const unencodedCodeChallenge = await crypto2.sha256DigestBase64(codeVerifier);
      const codeChallenge = unencodedCodeChallenge.split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
      return { codeVerifier, codeChallenge };
    }
    getToken(codeOrOptions, callback) {
      const options2 = typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
      if (callback) {
        this.getTokenAsync(options2).then((r) => callback(null, r.tokens, r.res), (e) => callback(e, null, e.response));
      } else {
        return this.getTokenAsync(options2);
      }
    }
    async getTokenAsync(options2) {
      const url = this.endpoints.oauth2TokenUrl.toString();
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const values = {
        client_id: options2.client_id || this._clientId,
        code_verifier: options2.codeVerifier,
        code: options2.code,
        grant_type: "authorization_code",
        redirect_uri: options2.redirect_uri || this.redirectUri
      };
      if (this.clientAuthentication === ClientAuthentication.ClientSecretBasic) {
        const basic = Buffer.from(`${this._clientId}:${this._clientSecret}`);
        headers["Authorization"] = `Basic ${basic.toString("base64")}`;
      }
      if (this.clientAuthentication === ClientAuthentication.ClientSecretPost) {
        values.client_secret = this._clientSecret;
      }
      const res = await this.transporter.request({
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        url,
        data: querystring.stringify(values),
        headers
      });
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    /**
     * Refreshes the access token.
     * @param refresh_token Existing refresh token.
     * @private
     */
    async refreshToken(refreshToken) {
      if (!refreshToken) {
        return this.refreshTokenNoCache(refreshToken);
      }
      if (this.refreshTokenPromises.has(refreshToken)) {
        return this.refreshTokenPromises.get(refreshToken);
      }
      const p = this.refreshTokenNoCache(refreshToken).then((r) => {
        this.refreshTokenPromises.delete(refreshToken);
        return r;
      }, (e) => {
        this.refreshTokenPromises.delete(refreshToken);
        throw e;
      });
      this.refreshTokenPromises.set(refreshToken, p);
      return p;
    }
    async refreshTokenNoCache(refreshToken) {
      var _a;
      if (!refreshToken) {
        throw new Error("No refresh token is set.");
      }
      const url = this.endpoints.oauth2TokenUrl.toString();
      const data = {
        refresh_token: refreshToken,
        client_id: this._clientId,
        client_secret: this._clientSecret,
        grant_type: "refresh_token"
      };
      let res;
      try {
        res = await this.transporter.request({
          ...OAuth2Client.RETRY_CONFIG,
          method: "POST",
          url,
          data: querystring.stringify(data),
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError && e.message === "invalid_grant" && ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) && /ReAuth/i.test(e.response.data.error_description)) {
          e.message = JSON.stringify(e.response.data);
        }
        throw e;
      }
      const tokens = res.data;
      if (res.data && res.data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + res.data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res };
    }
    refreshAccessToken(callback) {
      if (callback) {
        this.refreshAccessTokenAsync().then((r) => callback(null, r.credentials, r.res), callback);
      } else {
        return this.refreshAccessTokenAsync();
      }
    }
    async refreshAccessTokenAsync() {
      const r = await this.refreshToken(this.credentials.refresh_token);
      const tokens = r.tokens;
      tokens.refresh_token = this.credentials.refresh_token;
      this.credentials = tokens;
      return { credentials: this.credentials, res: r.res };
    }
    getAccessToken(callback) {
      if (callback) {
        this.getAccessTokenAsync().then((r) => callback(null, r.token, r.res), callback);
      } else {
        return this.getAccessTokenAsync();
      }
    }
    async getAccessTokenAsync() {
      const shouldRefresh = !this.credentials.access_token || this.isTokenExpiring();
      if (shouldRefresh) {
        if (!this.credentials.refresh_token) {
          if (this.refreshHandler) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
              this.setCredentials(refreshedAccessToken);
              return { token: this.credentials.access_token };
            }
          } else {
            throw new Error("No refresh token or refresh handler callback is set.");
          }
        }
        const r = await this.refreshAccessTokenAsync();
        if (!r.credentials || r.credentials && !r.credentials.access_token) {
          throw new Error("Could not refresh access token.");
        }
        return { token: r.credentials.access_token, res: r.res };
      } else {
        return { token: this.credentials.access_token };
      }
    }
    /**
     * The main authentication interface.  It takes an optional url which when
     * present is the endpoint being accessed, and returns a Promise which
     * resolves with authorization header fields.
     *
     * In OAuth2Client, the result has the form:
     * { Authorization: 'Bearer <access_token_value>' }
     * @param url The optional url being authorized
     */
    async getRequestHeaders(url) {
      const headers = (await this.getRequestMetadataAsync(url)).headers;
      return headers;
    }
    async getRequestMetadataAsync(url) {
      const thisCreds = this.credentials;
      if (!thisCreds.access_token && !thisCreds.refresh_token && !this.apiKey && !this.refreshHandler) {
        throw new Error("No access, refresh token, API key or refresh handler callback is set.");
      }
      if (thisCreds.access_token && !this.isTokenExpiring()) {
        thisCreds.token_type = thisCreds.token_type || "Bearer";
        const headers2 = {
          Authorization: thisCreds.token_type + " " + thisCreds.access_token
        };
        return { headers: this.addSharedMetadataHeaders(headers2) };
      }
      if (this.refreshHandler) {
        const refreshedAccessToken = await this.processAndValidateRefreshHandler();
        if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
          this.setCredentials(refreshedAccessToken);
          const headers2 = {
            Authorization: "Bearer " + this.credentials.access_token
          };
          return { headers: this.addSharedMetadataHeaders(headers2) };
        }
      }
      if (this.apiKey) {
        return { headers: { "X-Goog-Api-Key": this.apiKey } };
      }
      let r = null;
      let tokens = null;
      try {
        r = await this.refreshToken(thisCreds.refresh_token);
        tokens = r.tokens;
      } catch (err) {
        const e = err;
        if (e.response && (e.response.status === 403 || e.response.status === 404)) {
          e.message = `Could not refresh access token: ${e.message}`;
        }
        throw e;
      }
      const credentials = this.credentials;
      credentials.token_type = credentials.token_type || "Bearer";
      tokens.refresh_token = credentials.refresh_token;
      this.credentials = tokens;
      const headers = {
        Authorization: credentials.token_type + " " + tokens.access_token
      };
      return { headers: this.addSharedMetadataHeaders(headers), res: r.res };
    }
    /**
     * Generates an URL to revoke the given token.
     * @param token The existing token to be revoked.
     *
     * @deprecated use instance method {@link OAuth2Client.getRevokeTokenURL}
     */
    static getRevokeTokenUrl(token) {
      return new OAuth2Client().getRevokeTokenURL(token).toString();
    }
    /**
     * Generates a URL to revoke the given token.
     *
     * @param token The existing token to be revoked.
     */
    getRevokeTokenURL(token) {
      const url = new URL(this.endpoints.oauth2RevokeUrl);
      url.searchParams.append("token", token);
      return url;
    }
    revokeToken(token, callback) {
      const opts = {
        ...OAuth2Client.RETRY_CONFIG,
        url: this.getRevokeTokenURL(token).toString(),
        method: "POST"
      };
      if (callback) {
        this.transporter.request(opts).then((r) => callback(null, r), callback);
      } else {
        return this.transporter.request(opts);
      }
    }
    revokeCredentials(callback) {
      if (callback) {
        this.revokeCredentialsAsync().then((res) => callback(null, res), callback);
      } else {
        return this.revokeCredentialsAsync();
      }
    }
    async revokeCredentialsAsync() {
      const token = this.credentials.access_token;
      this.credentials = {};
      if (token) {
        return this.revokeToken(token);
      } else {
        throw new Error("No access token to revoke.");
      }
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    async requestAsync(opts, reAuthRetried = false) {
      let r2;
      try {
        const r = await this.getRequestMetadataAsync(opts.url);
        opts.headers = opts.headers || {};
        if (r.headers && r.headers["x-goog-user-project"]) {
          opts.headers["x-goog-user-project"] = r.headers["x-goog-user-project"];
        }
        if (r.headers && r.headers.Authorization) {
          opts.headers.Authorization = r.headers.Authorization;
        }
        if (this.apiKey) {
          opts.headers["X-Goog-Api-Key"] = this.apiKey;
        }
        r2 = await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const mayRequireRefresh = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure);
          const mayRequireRefreshWithNoRefreshToken = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefresh) {
            await this.refreshAccessTokenAsync();
            return this.requestAsync(opts, true);
          } else if (!reAuthRetried && isAuthErr && !isReadableStream && mayRequireRefreshWithNoRefreshToken) {
            const refreshedAccessToken = await this.processAndValidateRefreshHandler();
            if (refreshedAccessToken === null || refreshedAccessToken === void 0 ? void 0 : refreshedAccessToken.access_token) {
              this.setCredentials(refreshedAccessToken);
            }
            return this.requestAsync(opts, true);
          }
        }
        throw e;
      }
      return r2;
    }
    verifyIdToken(options2, callback) {
      if (callback && typeof callback !== "function") {
        throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
      }
      if (callback) {
        this.verifyIdTokenAsync(options2).then((r) => callback(null, r), callback);
      } else {
        return this.verifyIdTokenAsync(options2);
      }
    }
    async verifyIdTokenAsync(options2) {
      if (!options2.idToken) {
        throw new Error("The verifyIdToken method requires an ID Token");
      }
      const response = await this.getFederatedSignonCertsAsync();
      const login = await this.verifySignedJwtWithCertsAsync(options2.idToken, response.certs, options2.audience, this.issuers, options2.maxExpiry);
      return login;
    }
    /**
     * Obtains information about the provisioned access token.  Especially useful
     * if you want to check the scopes that were provisioned to a given token.
     *
     * @param accessToken Required.  The Access Token for which you want to get
     * user info.
     */
    async getTokenInfo(accessToken) {
      const { data } = await this.transporter.request({
        ...OAuth2Client.RETRY_CONFIG,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`
        },
        url: this.endpoints.tokenInfoUrl.toString()
      });
      const info = Object.assign({
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3,
        scopes: data.scope.split(" ")
      }, data);
      delete info.expires_in;
      delete info.scope;
      return info;
    }
    getFederatedSignonCerts(callback) {
      if (callback) {
        this.getFederatedSignonCertsAsync().then((r) => callback(null, r.certs, r.res), callback);
      } else {
        return this.getFederatedSignonCertsAsync();
      }
    }
    async getFederatedSignonCertsAsync() {
      const nowTime = (/* @__PURE__ */ new Date()).getTime();
      const format = (0, crypto_1.hasBrowserCrypto)() ? CertificateFormat.JWK : CertificateFormat.PEM;
      if (this.certificateExpiry && nowTime < this.certificateExpiry.getTime() && this.certificateCacheFormat === format) {
        return { certs: this.certificateCache, format };
      }
      let res;
      let url;
      switch (format) {
        case CertificateFormat.PEM:
          url = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
          break;
        case CertificateFormat.JWK:
          url = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      try {
        res = await this.transporter.request({
          ...OAuth2Client.RETRY_CONFIG,
          url
        });
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      const cacheControl = res ? res.headers["cache-control"] : void 0;
      let cacheAge = -1;
      if (cacheControl) {
        const pattern = new RegExp("max-age=([0-9]*)");
        const regexResult = pattern.exec(cacheControl);
        if (regexResult && regexResult.length === 2) {
          cacheAge = Number(regexResult[1]) * 1e3;
        }
      }
      let certificates = {};
      switch (format) {
        case CertificateFormat.PEM:
          certificates = res.data;
          break;
        case CertificateFormat.JWK:
          for (const key of res.data.keys) {
            certificates[key.kid] = key;
          }
          break;
        default:
          throw new Error(`Unsupported certificate format ${format}`);
      }
      const now = /* @__PURE__ */ new Date();
      this.certificateExpiry = cacheAge === -1 ? null : new Date(now.getTime() + cacheAge);
      this.certificateCache = certificates;
      this.certificateCacheFormat = format;
      return { certs: certificates, format, res };
    }
    getIapPublicKeys(callback) {
      if (callback) {
        this.getIapPublicKeysAsync().then((r) => callback(null, r.pubkeys, r.res), callback);
      } else {
        return this.getIapPublicKeysAsync();
      }
    }
    async getIapPublicKeysAsync() {
      let res;
      const url = this.endpoints.oauth2IapPublicKeyUrl.toString();
      try {
        res = await this.transporter.request({
          ...OAuth2Client.RETRY_CONFIG,
          url
        });
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Failed to retrieve verification certificates: ${e.message}`;
        }
        throw e;
      }
      return { pubkeys: res.data, res };
    }
    verifySignedJwtWithCerts() {
      throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.");
    }
    /**
     * Verify the id token is signed with the correct certificate
     * and is from the correct audience.
     * @param jwt The jwt to verify (The ID Token in this case).
     * @param certs The array of certs to test the jwt against.
     * @param requiredAudience The audience to test the jwt against.
     * @param issuers The allowed issuers of the jwt (Optional).
     * @param maxExpiry The max expiry the certificate can be (Optional).
     * @return Returns a promise resolving to LoginTicket on verification.
     */
    async verifySignedJwtWithCertsAsync(jwt, certs, requiredAudience, issuers, maxExpiry) {
      const crypto2 = (0, crypto_1.createCrypto)();
      if (!maxExpiry) {
        maxExpiry = OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
      }
      const segments = jwt.split(".");
      if (segments.length !== 3) {
        throw new Error("Wrong number of segments in token: " + jwt);
      }
      const signed = segments[0] + "." + segments[1];
      let signature = segments[2];
      let envelope;
      let payload;
      try {
        envelope = JSON.parse(crypto2.decodeBase64StringUtf8(segments[0]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token envelope: ${segments[0]}': ${err.message}`;
        }
        throw err;
      }
      if (!envelope) {
        throw new Error("Can't parse token envelope: " + segments[0]);
      }
      try {
        payload = JSON.parse(crypto2.decodeBase64StringUtf8(segments[1]));
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Can't parse token payload '${segments[0]}`;
        }
        throw err;
      }
      if (!payload) {
        throw new Error("Can't parse token payload: " + segments[1]);
      }
      if (!Object.prototype.hasOwnProperty.call(certs, envelope.kid)) {
        throw new Error("No pem found for envelope: " + JSON.stringify(envelope));
      }
      const cert = certs[envelope.kid];
      if (envelope.alg === "ES256") {
        signature = formatEcdsa.joseToDer(signature, "ES256").toString("base64");
      }
      const verified = await crypto2.verify(cert, signed, signature);
      if (!verified) {
        throw new Error("Invalid token signature: " + jwt);
      }
      if (!payload.iat) {
        throw new Error("No issue time in token: " + JSON.stringify(payload));
      }
      if (!payload.exp) {
        throw new Error("No expiration time in token: " + JSON.stringify(payload));
      }
      const iat = Number(payload.iat);
      if (isNaN(iat))
        throw new Error("iat field using invalid format");
      const exp = Number(payload.exp);
      if (isNaN(exp))
        throw new Error("exp field using invalid format");
      const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
      if (exp >= now + maxExpiry) {
        throw new Error("Expiration time too far in future: " + JSON.stringify(payload));
      }
      const earliest = iat - OAuth2Client.CLOCK_SKEW_SECS_;
      const latest = exp + OAuth2Client.CLOCK_SKEW_SECS_;
      if (now < earliest) {
        throw new Error("Token used too early, " + now + " < " + earliest + ": " + JSON.stringify(payload));
      }
      if (now > latest) {
        throw new Error("Token used too late, " + now + " > " + latest + ": " + JSON.stringify(payload));
      }
      if (issuers && issuers.indexOf(payload.iss) < 0) {
        throw new Error("Invalid issuer, expected one of [" + issuers + "], but got " + payload.iss);
      }
      if (typeof requiredAudience !== "undefined" && requiredAudience !== null) {
        const aud = payload.aud;
        let audVerified = false;
        if (requiredAudience.constructor === Array) {
          audVerified = requiredAudience.indexOf(aud) > -1;
        } else {
          audVerified = aud === requiredAudience;
        }
        if (!audVerified) {
          throw new Error("Wrong recipient, payload audience != requiredAudience");
        }
      }
      return new loginticket_1.LoginTicket(envelope, payload);
    }
    /**
     * Returns a promise that resolves with AccessTokenResponse type if
     * refreshHandler is defined.
     * If not, nothing is returned.
     */
    async processAndValidateRefreshHandler() {
      if (this.refreshHandler) {
        const accessTokenResponse = await this.refreshHandler();
        if (!accessTokenResponse.access_token) {
          throw new Error("No access token is returned by the refreshHandler callback.");
        }
        return accessTokenResponse;
      }
      return;
    }
    /**
     * Returns true if a token is expired or will expire within
     * eagerRefreshThresholdMillismilliseconds.
     * If there is no expiry time, assumes the token is not expired or expiring.
     */
    isTokenExpiring() {
      const expiryDate = this.credentials.expiry_date;
      return expiryDate ? expiryDate <= (/* @__PURE__ */ new Date()).getTime() + this.eagerRefreshThresholdMillis : false;
    }
  }
  oauth2client.OAuth2Client = OAuth2Client;
  OAuth2Client.GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
  OAuth2Client.CLOCK_SKEW_SECS_ = 300;
  OAuth2Client.DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400;
  return oauth2client;
}
var hasRequiredComputeclient;
function requireComputeclient() {
  if (hasRequiredComputeclient) return computeclient;
  hasRequiredComputeclient = 1;
  Object.defineProperty(computeclient, "__esModule", { value: true });
  computeclient.Compute = void 0;
  const gaxios_1 = requireSrc$8();
  const gcpMetadata = requireSrc$9();
  const oauth2client_1 = requireOauth2client();
  class Compute extends oauth2client_1.OAuth2Client {
    /**
     * Google Compute Engine service account credentials.
     *
     * Retrieve access token from the metadata server.
     * See: https://cloud.google.com/compute/docs/access/authenticate-workloads#applications
     */
    constructor(options2 = {}) {
      super(options2);
      this.credentials = { expiry_date: 1, refresh_token: "compute-placeholder" };
      this.serviceAccountEmail = options2.serviceAccountEmail || "default";
      this.scopes = Array.isArray(options2.scopes) ? options2.scopes : options2.scopes ? [options2.scopes] : [];
    }
    /**
     * Refreshes the access token.
     * @param refreshToken Unused parameter
     */
    async refreshTokenNoCache(refreshToken) {
      const tokenPath = `service-accounts/${this.serviceAccountEmail}/token`;
      let data;
      try {
        const instanceOptions = {
          property: tokenPath
        };
        if (this.scopes.length > 0) {
          instanceOptions.params = {
            scopes: this.scopes.join(",")
          };
        }
        data = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof gaxios_1.GaxiosError) {
          e.message = `Could not refresh access token: ${e.message}`;
          this.wrapError(e);
        }
        throw e;
      }
      const tokens = data;
      if (data && data.expires_in) {
        tokens.expiry_date = (/* @__PURE__ */ new Date()).getTime() + data.expires_in * 1e3;
        delete tokens.expires_in;
      }
      this.emit("tokens", tokens);
      return { tokens, res: null };
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const idTokenPath = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${targetAudience}`;
      let idToken;
      try {
        const instanceOptions = {
          property: idTokenPath
        };
        idToken = await gcpMetadata.instance(instanceOptions);
      } catch (e) {
        if (e instanceof Error) {
          e.message = `Could not fetch ID token: ${e.message}`;
        }
        throw e;
      }
      return idToken;
    }
    wrapError(e) {
      const res = e.response;
      if (res && res.status) {
        e.status = res.status;
        if (res.status === 403) {
          e.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + e.message;
        } else if (res.status === 404) {
          e.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + e.message;
        }
      }
    }
  }
  computeclient.Compute = Compute;
  return computeclient;
}
var idtokenclient = {};
var hasRequiredIdtokenclient;
function requireIdtokenclient() {
  if (hasRequiredIdtokenclient) return idtokenclient;
  hasRequiredIdtokenclient = 1;
  Object.defineProperty(idtokenclient, "__esModule", { value: true });
  idtokenclient.IdTokenClient = void 0;
  const oauth2client_1 = requireOauth2client();
  class IdTokenClient extends oauth2client_1.OAuth2Client {
    /**
     * Google ID Token client
     *
     * Retrieve ID token from the metadata server.
     * See: https://cloud.google.com/docs/authentication/get-id-token#metadata-server
     */
    constructor(options2) {
      super(options2);
      this.targetAudience = options2.targetAudience;
      this.idTokenProvider = options2.idTokenProvider;
    }
    async getRequestMetadataAsync(url) {
      if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
        const idToken = await this.idTokenProvider.fetchIdToken(this.targetAudience);
        this.credentials = {
          id_token: idToken,
          expiry_date: this.getIdTokenExpiryDate(idToken)
        };
      }
      const headers = {
        Authorization: "Bearer " + this.credentials.id_token
      };
      return { headers };
    }
    getIdTokenExpiryDate(idToken) {
      const payloadB64 = idToken.split(".")[1];
      if (payloadB64) {
        const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString("ascii"));
        return payload.exp * 1e3;
      }
    }
  }
  idtokenclient.IdTokenClient = IdTokenClient;
  return idtokenclient;
}
var envDetect = {};
var hasRequiredEnvDetect;
function requireEnvDetect() {
  if (hasRequiredEnvDetect) return envDetect;
  hasRequiredEnvDetect = 1;
  Object.defineProperty(envDetect, "__esModule", { value: true });
  envDetect.GCPEnv = void 0;
  envDetect.clear = clear;
  envDetect.getEnv = getEnv;
  const gcpMetadata = requireSrc$9();
  var GCPEnv;
  (function(GCPEnv2) {
    GCPEnv2["APP_ENGINE"] = "APP_ENGINE";
    GCPEnv2["KUBERNETES_ENGINE"] = "KUBERNETES_ENGINE";
    GCPEnv2["CLOUD_FUNCTIONS"] = "CLOUD_FUNCTIONS";
    GCPEnv2["COMPUTE_ENGINE"] = "COMPUTE_ENGINE";
    GCPEnv2["CLOUD_RUN"] = "CLOUD_RUN";
    GCPEnv2["NONE"] = "NONE";
  })(GCPEnv || (envDetect.GCPEnv = GCPEnv = {}));
  let envPromise;
  function clear() {
    envPromise = void 0;
  }
  async function getEnv() {
    if (envPromise) {
      return envPromise;
    }
    envPromise = getEnvMemoized();
    return envPromise;
  }
  async function getEnvMemoized() {
    let env = GCPEnv.NONE;
    if (isAppEngine()) {
      env = GCPEnv.APP_ENGINE;
    } else if (isCloudFunction()) {
      env = GCPEnv.CLOUD_FUNCTIONS;
    } else if (await isComputeEngine()) {
      if (await isKubernetesEngine()) {
        env = GCPEnv.KUBERNETES_ENGINE;
      } else if (isCloudRun()) {
        env = GCPEnv.CLOUD_RUN;
      } else {
        env = GCPEnv.COMPUTE_ENGINE;
      }
    } else {
      env = GCPEnv.NONE;
    }
    return env;
  }
  function isAppEngine() {
    return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME);
  }
  function isCloudFunction() {
    return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET);
  }
  function isCloudRun() {
    return !!process.env.K_CONFIGURATION;
  }
  async function isKubernetesEngine() {
    try {
      await gcpMetadata.instance("attributes/cluster-name");
      return true;
    } catch (e) {
      return false;
    }
  }
  async function isComputeEngine() {
    return gcpMetadata.isAvailable();
  }
  return envDetect;
}
var jwtclient = {};
var jwtaccess = {};
var hasRequiredJwtaccess;
function requireJwtaccess() {
  if (hasRequiredJwtaccess) return jwtaccess;
  hasRequiredJwtaccess = 1;
  Object.defineProperty(jwtaccess, "__esModule", { value: true });
  jwtaccess.JWTAccess = void 0;
  const jws = requireJws();
  const util_1 = requireUtil();
  const DEFAULT_HEADER = {
    alg: "RS256",
    typ: "JWT"
  };
  class JWTAccess {
    /**
     * JWTAccess service account credentials.
     *
     * Create a new access token by using the credential to create a new JWT token
     * that's recognized as the access token.
     *
     * @param email the service account email address.
     * @param key the private key that will be used to sign the token.
     * @param keyId the ID of the private key used to sign the token.
     */
    constructor(email, key, keyId, eagerRefreshThresholdMillis) {
      this.cache = new util_1.LRUCache({
        capacity: 500,
        maxAge: 60 * 60 * 1e3
      });
      this.email = email;
      this.key = key;
      this.keyId = keyId;
      this.eagerRefreshThresholdMillis = eagerRefreshThresholdMillis !== null && eagerRefreshThresholdMillis !== void 0 ? eagerRefreshThresholdMillis : 5 * 60 * 1e3;
    }
    /**
     * Ensures that we're caching a key appropriately, giving precedence to scopes vs. url
     *
     * @param url The URI being authorized.
     * @param scopes The scope or scopes being authorized
     * @returns A string that returns the cached key.
     */
    getCachedKey(url, scopes) {
      let cacheKey = url;
      if (scopes && Array.isArray(scopes) && scopes.length) {
        cacheKey = url ? `${url}_${scopes.join("_")}` : `${scopes.join("_")}`;
      } else if (typeof scopes === "string") {
        cacheKey = url ? `${url}_${scopes}` : scopes;
      }
      if (!cacheKey) {
        throw Error("Scopes or url must be provided");
      }
      return cacheKey;
    }
    /**
     * Get a non-expired access token, after refreshing if necessary.
     *
     * @param url The URI being authorized.
     * @param additionalClaims An object with a set of additional claims to
     * include in the payload.
     * @returns An object that includes the authorization header.
     */
    getRequestHeaders(url, additionalClaims, scopes) {
      const key = this.getCachedKey(url, scopes);
      const cachedToken = this.cache.get(key);
      const now = Date.now();
      if (cachedToken && cachedToken.expiration - now > this.eagerRefreshThresholdMillis) {
        return cachedToken.headers;
      }
      const iat = Math.floor(Date.now() / 1e3);
      const exp = JWTAccess.getExpirationTime(iat);
      let defaultClaims;
      if (Array.isArray(scopes)) {
        scopes = scopes.join(" ");
      }
      if (scopes) {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          scope: scopes,
          exp,
          iat
        };
      } else {
        defaultClaims = {
          iss: this.email,
          sub: this.email,
          aud: url,
          exp,
          iat
        };
      }
      if (additionalClaims) {
        for (const claim in defaultClaims) {
          if (additionalClaims[claim]) {
            throw new Error(`The '${claim}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`);
          }
        }
      }
      const header = this.keyId ? { ...DEFAULT_HEADER, kid: this.keyId } : DEFAULT_HEADER;
      const payload = Object.assign(defaultClaims, additionalClaims);
      const signedJWT = jws.sign({ header, payload, secret: this.key });
      const headers = { Authorization: `Bearer ${signedJWT}` };
      this.cache.set(key, {
        expiration: exp * 1e3,
        headers
      });
      return headers;
    }
    /**
     * Returns an expiration time for the JWT token.
     *
     * @param iat The issued at time for the JWT.
     * @returns An expiration time for the JWT.
     */
    static getExpirationTime(iat) {
      const exp = iat + 3600;
      return exp;
    }
    /**
     * Create a JWTAccess credentials instance using the given input options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          reject(new Error("Must pass in a stream containing the service account auth settings."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("data", (chunk) => s += chunk).on("error", reject).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }
  jwtaccess.JWTAccess = JWTAccess;
  return jwtaccess;
}
var hasRequiredJwtclient;
function requireJwtclient() {
  if (hasRequiredJwtclient) return jwtclient;
  hasRequiredJwtclient = 1;
  Object.defineProperty(jwtclient, "__esModule", { value: true });
  jwtclient.JWT = void 0;
  const gtoken_1 = requireSrc$a();
  const jwtaccess_1 = requireJwtaccess();
  const oauth2client_1 = requireOauth2client();
  const authclient_1 = requireAuthclient();
  class JWT extends oauth2client_1.OAuth2Client {
    constructor(optionsOrEmail, keyFile, key, scopes, subject, keyId) {
      const opts = optionsOrEmail && typeof optionsOrEmail === "object" ? optionsOrEmail : { email: optionsOrEmail, keyFile, key, keyId, scopes, subject };
      super(opts);
      this.email = opts.email;
      this.keyFile = opts.keyFile;
      this.key = opts.key;
      this.keyId = opts.keyId;
      this.scopes = opts.scopes;
      this.subject = opts.subject;
      this.additionalClaims = opts.additionalClaims;
      this.credentials = { refresh_token: "jwt-placeholder", expiry_date: 1 };
    }
    /**
     * Creates a copy of the credential with the specified scopes.
     * @param scopes List of requested scopes or a single scope.
     * @return The cloned instance.
     */
    createScoped(scopes) {
      const jwt = new JWT(this);
      jwt.scopes = scopes;
      return jwt;
    }
    /**
     * Obtains the metadata to be sent with the request.
     *
     * @param url the URI being authorized.
     */
    async getRequestMetadataAsync(url) {
      url = this.defaultServicePath ? `https://${this.defaultServicePath}/` : url;
      const useSelfSignedJWT = !this.hasUserScopes() && url || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
      if (this.subject && this.universeDomain !== authclient_1.DEFAULT_UNIVERSE) {
        throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${authclient_1.DEFAULT_UNIVERSE}`);
      }
      if (!this.apiKey && useSelfSignedJWT) {
        if (this.additionalClaims && this.additionalClaims.target_audience) {
          const { tokens } = await this.refreshToken();
          return {
            headers: this.addSharedMetadataHeaders({
              Authorization: `Bearer ${tokens.id_token}`
            })
          };
        } else {
          if (!this.access) {
            this.access = new jwtaccess_1.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
          }
          let scopes;
          if (this.hasUserScopes()) {
            scopes = this.scopes;
          } else if (!url) {
            scopes = this.defaultScopes;
          }
          const useScopes = this.useJWTAccessWithScope || this.universeDomain !== authclient_1.DEFAULT_UNIVERSE;
          const headers = await this.access.getRequestHeaders(
            url !== null && url !== void 0 ? url : void 0,
            this.additionalClaims,
            // Scopes take precedent over audience for signing,
            // so we only provide them if `useJWTAccessWithScope` is on or
            // if we are in a non-default universe
            useScopes ? scopes : void 0
          );
          return { headers: this.addSharedMetadataHeaders(headers) };
        }
      } else if (this.hasAnyScopes() || this.apiKey) {
        return super.getRequestMetadataAsync(url);
      } else {
        return { headers: {} };
      }
    }
    /**
     * Fetches an ID token.
     * @param targetAudience the audience for the fetched ID token.
     */
    async fetchIdToken(targetAudience) {
      const gtoken = new gtoken_1.GoogleToken({
        iss: this.email,
        sub: this.subject,
        scope: this.scopes || this.defaultScopes,
        keyFile: this.keyFile,
        key: this.key,
        additionalClaims: { target_audience: targetAudience },
        transporter: this.transporter
      });
      await gtoken.getToken({
        forceRefresh: true
      });
      if (!gtoken.idToken) {
        throw new Error("Unknown error: Failed to fetch ID token");
      }
      return gtoken.idToken;
    }
    /**
     * Determine if there are currently scopes available.
     */
    hasUserScopes() {
      if (!this.scopes) {
        return false;
      }
      return this.scopes.length > 0;
    }
    /**
     * Are there any default or user scopes defined.
     */
    hasAnyScopes() {
      if (this.scopes && this.scopes.length > 0)
        return true;
      if (this.defaultScopes && this.defaultScopes.length > 0)
        return true;
      return false;
    }
    authorize(callback) {
      if (callback) {
        this.authorizeAsync().then((r) => callback(null, r), callback);
      } else {
        return this.authorizeAsync();
      }
    }
    async authorizeAsync() {
      const result = await this.refreshToken();
      if (!result) {
        throw new Error("No result returned");
      }
      this.credentials = result.tokens;
      this.credentials.refresh_token = "jwt-placeholder";
      this.key = this.gtoken.key;
      this.email = this.gtoken.iss;
      return result.tokens;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken ignored
     * @private
     */
    async refreshTokenNoCache(refreshToken) {
      const gtoken = this.createGToken();
      const token = await gtoken.getToken({
        forceRefresh: this.isTokenExpiring()
      });
      const tokens = {
        access_token: token.access_token,
        token_type: "Bearer",
        expiry_date: gtoken.expiresAt,
        id_token: gtoken.idToken
      };
      this.emit("tokens", tokens);
      return { res: null, tokens };
    }
    /**
     * Create a gToken if it doesn't already exist.
     */
    createGToken() {
      if (!this.gtoken) {
        this.gtoken = new gtoken_1.GoogleToken({
          iss: this.email,
          sub: this.subject,
          scope: this.scopes || this.defaultScopes,
          keyFile: this.keyFile,
          key: this.key,
          additionalClaims: this.additionalClaims,
          transporter: this.transporter
        });
      }
      return this.gtoken;
    }
    /**
     * Create a JWT credentials instance using the given input options.
     * @param json The input object.
     *
     * @remarks
     *
     * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the service account auth settings.");
      }
      if (!json.client_email) {
        throw new Error("The incoming JSON object does not contain a client_email field");
      }
      if (!json.private_key) {
        throw new Error("The incoming JSON object does not contain a private_key field");
      }
      this.email = json.client_email;
      this.key = json.private_key;
      this.keyId = json.private_key_id;
      this.projectId = json.project_id;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          throw new Error("Must pass in a stream containing the service account auth settings.");
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    /**
     * Creates a JWT credentials instance using an API Key for authentication.
     * @param apiKey The API Key in string form.
     */
    fromAPIKey(apiKey) {
      if (typeof apiKey !== "string") {
        throw new Error("Must provide an API Key string.");
      }
      this.apiKey = apiKey;
    }
    /**
     * Using the key or keyFile on the JWT client, obtain an object that contains
     * the key and the client email.
     */
    async getCredentials() {
      if (this.key) {
        return { private_key: this.key, client_email: this.email };
      } else if (this.keyFile) {
        const gtoken = this.createGToken();
        const creds = await gtoken.getCredentials(this.keyFile);
        return { private_key: creds.privateKey, client_email: creds.clientEmail };
      }
      throw new Error("A key or a keyFile must be provided to getCredentials.");
    }
  }
  jwtclient.JWT = JWT;
  return jwtclient;
}
var refreshclient = {};
var hasRequiredRefreshclient;
function requireRefreshclient() {
  if (hasRequiredRefreshclient) return refreshclient;
  hasRequiredRefreshclient = 1;
  Object.defineProperty(refreshclient, "__esModule", { value: true });
  refreshclient.UserRefreshClient = refreshclient.USER_REFRESH_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client();
  const querystring_1 = require$$1$1;
  refreshclient.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
  class UserRefreshClient extends oauth2client_1.OAuth2Client {
    constructor(optionsOrClientId, clientSecret, refreshToken, eagerRefreshThresholdMillis, forceRefreshOnFailure) {
      const opts = optionsOrClientId && typeof optionsOrClientId === "object" ? optionsOrClientId : {
        clientId: optionsOrClientId,
        clientSecret,
        refreshToken,
        eagerRefreshThresholdMillis,
        forceRefreshOnFailure
      };
      super(opts);
      this._refreshToken = opts.refreshToken;
      this.credentials.refresh_token = opts.refreshToken;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken An ignored refreshToken..
     * @param callback Optional callback.
     */
    async refreshTokenNoCache(refreshToken) {
      return super.refreshTokenNoCache(this._refreshToken);
    }
    async fetchIdToken(targetAudience) {
      const res = await this.transporter.request({
        ...UserRefreshClient.RETRY_CONFIG,
        url: this.endpoints.oauth2TokenUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: (0, querystring_1.stringify)({
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token",
          refresh_token: this._refreshToken,
          target_audience: targetAudience
        })
      });
      return res.data.id_token;
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    fromJSON(json) {
      if (!json) {
        throw new Error("Must pass in a JSON object containing the user refresh token");
      }
      if (json.type !== "authorized_user") {
        throw new Error('The incoming JSON object does not have the "authorized_user" type');
      }
      if (!json.client_id) {
        throw new Error("The incoming JSON object does not contain a client_id field");
      }
      if (!json.client_secret) {
        throw new Error("The incoming JSON object does not contain a client_secret field");
      }
      if (!json.refresh_token) {
        throw new Error("The incoming JSON object does not contain a refresh_token field");
      }
      this._clientId = json.client_id;
      this._clientSecret = json.client_secret;
      this._refreshToken = json.refresh_token;
      this.credentials.refresh_token = json.refresh_token;
      this.quotaProjectId = json.quota_project_id;
      this.universeDomain = json.universe_domain || this.universeDomain;
    }
    fromStream(inputStream, callback) {
      if (callback) {
        this.fromStreamAsync(inputStream).then(() => callback(), callback);
      } else {
        return this.fromStreamAsync(inputStream);
      }
    }
    async fromStreamAsync(inputStream) {
      return new Promise((resolve, reject) => {
        if (!inputStream) {
          return reject(new Error("Must pass in a stream containing the user refresh token."));
        }
        let s = "";
        inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => s += chunk).on("end", () => {
          try {
            const data = JSON.parse(s);
            this.fromJSON(data);
            return resolve();
          } catch (err) {
            return reject(err);
          }
        });
      });
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    static fromJSON(json) {
      const client = new UserRefreshClient();
      client.fromJSON(json);
      return client;
    }
  }
  refreshclient.UserRefreshClient = UserRefreshClient;
  return refreshclient;
}
var impersonated = {};
var hasRequiredImpersonated;
function requireImpersonated() {
  if (hasRequiredImpersonated) return impersonated;
  hasRequiredImpersonated = 1;
  Object.defineProperty(impersonated, "__esModule", { value: true });
  impersonated.Impersonated = impersonated.IMPERSONATED_ACCOUNT_TYPE = void 0;
  const oauth2client_1 = requireOauth2client();
  const gaxios_1 = requireSrc$8();
  const util_1 = requireUtil();
  impersonated.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
  class Impersonated extends oauth2client_1.OAuth2Client {
    /**
     * Impersonated service account credentials.
     *
     * Create a new access token by impersonating another service account.
     *
     * Impersonated Credentials allowing credentials issued to a user or
     * service account to impersonate another. The source project using
     * Impersonated Credentials must enable the "IAMCredentials" API.
     * Also, the target service account must grant the orginating principal
     * the "Service Account Token Creator" IAM role.
     *
     * @param {object} options - The configuration object.
     * @param {object} [options.sourceClient] the source credential used as to
     * acquire the impersonated credentials.
     * @param {string} [options.targetPrincipal] the service account to
     * impersonate.
     * @param {string[]} [options.delegates] the chained list of delegates
     * required to grant the final access_token. If set, the sequence of
     * identities must have "Service Account Token Creator" capability granted to
     * the preceding identity. For example, if set to [serviceAccountB,
     * serviceAccountC], the sourceCredential must have the Token Creator role on
     * serviceAccountB. serviceAccountB must have the Token Creator on
     * serviceAccountC. Finally, C must have Token Creator on target_principal.
     * If left unset, sourceCredential must have that role on targetPrincipal.
     * @param {string[]} [options.targetScopes] scopes to request during the
     * authorization grant.
     * @param {number} [options.lifetime] number of seconds the delegated
     * credential should be valid for up to 3600 seconds by default, or 43,200
     * seconds by extending the token's lifetime, see:
     * https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials#sa-credentials-oauth
     * @param {string} [options.endpoint] api endpoint override.
     */
    constructor(options2 = {}) {
      var _a, _b, _c, _d, _e, _f;
      super(options2);
      this.credentials = {
        expiry_date: 1,
        refresh_token: "impersonated-placeholder"
      };
      this.sourceClient = (_a = options2.sourceClient) !== null && _a !== void 0 ? _a : new oauth2client_1.OAuth2Client();
      this.targetPrincipal = (_b = options2.targetPrincipal) !== null && _b !== void 0 ? _b : "";
      this.delegates = (_c = options2.delegates) !== null && _c !== void 0 ? _c : [];
      this.targetScopes = (_d = options2.targetScopes) !== null && _d !== void 0 ? _d : [];
      this.lifetime = (_e = options2.lifetime) !== null && _e !== void 0 ? _e : 3600;
      const usingExplicitUniverseDomain = !!(0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
      if (!usingExplicitUniverseDomain) {
        this.universeDomain = this.sourceClient.universeDomain;
      } else if (this.sourceClient.universeDomain !== this.universeDomain) {
        throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
      }
      this.endpoint = (_f = options2.endpoint) !== null && _f !== void 0 ? _f : `https://iamcredentials.${this.universeDomain}`;
    }
    /**
     * Signs some bytes.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/signBlob Reference Documentation}
     * @param blobToSign String to sign.
     *
     * @returns A {@link SignBlobResponse} denoting the keyID and signedBlob in base64 string
     */
    async sign(blobToSign) {
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:signBlob`;
      const body = {
        delegates: this.delegates,
        payload: Buffer.from(blobToSign).toString("base64")
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data;
    }
    /** The service account email to be impersonated. */
    getTargetPrincipal() {
      return this.targetPrincipal;
    }
    /**
     * Refreshes the access token.
     */
    async refreshToken() {
      var _a, _b, _c, _d, _e, _f;
      try {
        await this.sourceClient.getAccessToken();
        const name2 = "projects/-/serviceAccounts/" + this.targetPrincipal;
        const u = `${this.endpoint}/v1/${name2}:generateAccessToken`;
        const body = {
          delegates: this.delegates,
          scope: this.targetScopes,
          lifetime: this.lifetime + "s"
        };
        const res = await this.sourceClient.request({
          ...Impersonated.RETRY_CONFIG,
          url: u,
          data: body,
          method: "POST"
        });
        const tokenResponse = res.data;
        this.credentials.access_token = tokenResponse.accessToken;
        this.credentials.expiry_date = Date.parse(tokenResponse.expireTime);
        return {
          tokens: this.credentials,
          res
        };
      } catch (error) {
        if (!(error instanceof Error))
          throw error;
        let status = 0;
        let message = "";
        if (error instanceof gaxios_1.GaxiosError) {
          status = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.status;
          message = (_f = (_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.message;
        }
        if (status && message) {
          error.message = `${status}: unable to impersonate: ${message}`;
          throw error;
        } else {
          error.message = `unable to impersonate: ${error}`;
          throw error;
        }
      }
    }
    /**
     * Generates an OpenID Connect ID token for a service account.
     *
     * {@link https://cloud.google.com/iam/docs/reference/credentials/rest/v1/projects.serviceAccounts/generateIdToken Reference Documentation}
     *
     * @param targetAudience the audience for the fetched ID token.
     * @param options the for the request
     * @return an OpenID Connect ID token
     */
    async fetchIdToken(targetAudience, options2) {
      var _a, _b;
      await this.sourceClient.getAccessToken();
      const name2 = `projects/-/serviceAccounts/${this.targetPrincipal}`;
      const u = `${this.endpoint}/v1/${name2}:generateIdToken`;
      const body = {
        delegates: this.delegates,
        audience: targetAudience,
        includeEmail: (_a = options2 === null || options2 === void 0 ? void 0 : options2.includeEmail) !== null && _a !== void 0 ? _a : true,
        useEmailAzp: (_b = options2 === null || options2 === void 0 ? void 0 : options2.includeEmail) !== null && _b !== void 0 ? _b : true
      };
      const res = await this.sourceClient.request({
        ...Impersonated.RETRY_CONFIG,
        url: u,
        data: body,
        method: "POST"
      });
      return res.data.token;
    }
  }
  impersonated.Impersonated = Impersonated;
  return impersonated;
}
var externalclient = {};
var baseexternalclient = {};
var stscredentials = {};
var oauth2common = {};
var hasRequiredOauth2common;
function requireOauth2common() {
  if (hasRequiredOauth2common) return oauth2common;
  hasRequiredOauth2common = 1;
  Object.defineProperty(oauth2common, "__esModule", { value: true });
  oauth2common.OAuthClientAuthHandler = void 0;
  oauth2common.getErrorFromOAuthErrorResponse = getErrorFromOAuthErrorResponse;
  const querystring = require$$1$1;
  const crypto_1 = requireCrypto();
  const METHODS_SUPPORTING_REQUEST_BODY = ["PUT", "POST", "PATCH"];
  class OAuthClientAuthHandler {
    /**
     * Instantiates an OAuth client authentication handler.
     * @param clientAuthentication The client auth credentials.
     */
    constructor(clientAuthentication) {
      this.clientAuthentication = clientAuthentication;
      this.crypto = (0, crypto_1.createCrypto)();
    }
    /**
     * Applies client authentication on the OAuth request's headers or POST
     * body but does not process the request.
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    applyClientAuthenticationOptions(opts, bearerToken) {
      this.injectAuthenticatedHeaders(opts, bearerToken);
      if (!bearerToken) {
        this.injectAuthenticatedRequestBody(opts);
      }
    }
    /**
     * Applies client authentication on the request's header if either
     * basic authentication or bearer token authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     * @param bearerToken The optional bearer token to use for authentication.
     *   When this is used, no client authentication credentials are needed.
     */
    injectAuthenticatedHeaders(opts, bearerToken) {
      var _a;
      if (bearerToken) {
        opts.headers = opts.headers || {};
        Object.assign(opts.headers, {
          Authorization: `Bearer ${bearerToken}}`
        });
      } else if (((_a = this.clientAuthentication) === null || _a === void 0 ? void 0 : _a.confidentialClientType) === "basic") {
        opts.headers = opts.headers || {};
        const clientId = this.clientAuthentication.clientId;
        const clientSecret = this.clientAuthentication.clientSecret || "";
        const base64EncodedCreds = this.crypto.encodeBase64StringUtf8(`${clientId}:${clientSecret}`);
        Object.assign(opts.headers, {
          Authorization: `Basic ${base64EncodedCreds}`
        });
      }
    }
    /**
     * Applies client authentication on the request's body if request-body
     * client authentication is selected.
     *
     * @param opts The GaxiosOptions whose headers or data are to be modified
     *   depending on the client authentication mechanism to be used.
     */
    injectAuthenticatedRequestBody(opts) {
      var _a;
      if (((_a = this.clientAuthentication) === null || _a === void 0 ? void 0 : _a.confidentialClientType) === "request-body") {
        const method = (opts.method || "GET").toUpperCase();
        if (METHODS_SUPPORTING_REQUEST_BODY.indexOf(method) !== -1) {
          let contentType;
          const headers = opts.headers || {};
          for (const key in headers) {
            if (key.toLowerCase() === "content-type" && headers[key]) {
              contentType = headers[key].toLowerCase();
              break;
            }
          }
          if (contentType === "application/x-www-form-urlencoded") {
            opts.data = opts.data || "";
            const data = querystring.parse(opts.data);
            Object.assign(data, {
              client_id: this.clientAuthentication.clientId,
              client_secret: this.clientAuthentication.clientSecret || ""
            });
            opts.data = querystring.stringify(data);
          } else if (contentType === "application/json") {
            opts.data = opts.data || {};
            Object.assign(opts.data, {
              client_id: this.clientAuthentication.clientId,
              client_secret: this.clientAuthentication.clientSecret || ""
            });
          } else {
            throw new Error(`${contentType} content-types are not supported with ${this.clientAuthentication.confidentialClientType} client authentication`);
          }
        } else {
          throw new Error(`${method} HTTP method does not support ${this.clientAuthentication.confidentialClientType} client authentication`);
        }
      }
    }
    /**
     * Retry config for Auth-related requests.
     *
     * @remarks
     *
     * This is not a part of the default {@link AuthClient.transporter transporter/gaxios}
     * config as some downstream APIs would prefer if customers explicitly enable retries,
     * such as GCS.
     */
    static get RETRY_CONFIG() {
      return {
        retry: true,
        retryConfig: {
          httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
        }
      };
    }
  }
  oauth2common.OAuthClientAuthHandler = OAuthClientAuthHandler;
  function getErrorFromOAuthErrorResponse(resp, err) {
    const errorCode = resp.error;
    const errorDescription = resp.error_description;
    const errorUri = resp.error_uri;
    let message = `Error code ${errorCode}`;
    if (typeof errorDescription !== "undefined") {
      message += `: ${errorDescription}`;
    }
    if (typeof errorUri !== "undefined") {
      message += ` - ${errorUri}`;
    }
    const newError = new Error(message);
    if (err) {
      const keys = Object.keys(err);
      if (err.stack) {
        keys.push("stack");
      }
      keys.forEach((key) => {
        if (key !== "message") {
          Object.defineProperty(newError, key, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: err[key],
            writable: false,
            enumerable: true
          });
        }
      });
    }
    return newError;
  }
  return oauth2common;
}
var hasRequiredStscredentials;
function requireStscredentials() {
  if (hasRequiredStscredentials) return stscredentials;
  hasRequiredStscredentials = 1;
  Object.defineProperty(stscredentials, "__esModule", { value: true });
  stscredentials.StsCredentials = void 0;
  const gaxios_1 = requireSrc$8();
  const querystring = require$$1$1;
  const transporters_1 = requireTransporters();
  const oauth2common_1 = requireOauth2common();
  class StsCredentials extends oauth2common_1.OAuthClientAuthHandler {
    /**
     * Initializes an STS credentials instance.
     * @param tokenExchangeEndpoint The token exchange endpoint.
     * @param clientAuthentication The client authentication credentials if
     *   available.
     */
    constructor(tokenExchangeEndpoint, clientAuthentication) {
      super(clientAuthentication);
      this.tokenExchangeEndpoint = tokenExchangeEndpoint;
      this.transporter = new transporters_1.DefaultTransporter();
    }
    /**
     * Exchanges the provided token for another type of token based on the
     * rfc8693 spec.
     * @param stsCredentialsOptions The token exchange options used to populate
     *   the token exchange request.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @param options Optional additional GCP-specific non-spec defined options
     *   to send with the request.
     *   Example: `&options=${encodeUriComponent(JSON.stringified(options))}`
     * @return A promise that resolves with the token exchange response containing
     *   the requested token and its expiration time.
     */
    async exchangeToken(stsCredentialsOptions, additionalHeaders, options2) {
      var _a, _b, _c;
      const values = {
        grant_type: stsCredentialsOptions.grantType,
        resource: stsCredentialsOptions.resource,
        audience: stsCredentialsOptions.audience,
        scope: (_a = stsCredentialsOptions.scope) === null || _a === void 0 ? void 0 : _a.join(" "),
        requested_token_type: stsCredentialsOptions.requestedTokenType,
        subject_token: stsCredentialsOptions.subjectToken,
        subject_token_type: stsCredentialsOptions.subjectTokenType,
        actor_token: (_b = stsCredentialsOptions.actingParty) === null || _b === void 0 ? void 0 : _b.actorToken,
        actor_token_type: (_c = stsCredentialsOptions.actingParty) === null || _c === void 0 ? void 0 : _c.actorTokenType,
        // Non-standard GCP-specific options.
        options: options2 && JSON.stringify(options2)
      };
      Object.keys(values).forEach((key) => {
        if (typeof values[key] === "undefined") {
          delete values[key];
        }
      });
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      Object.assign(headers, additionalHeaders || {});
      const opts = {
        ...StsCredentials.RETRY_CONFIG,
        url: this.tokenExchangeEndpoint.toString(),
        method: "POST",
        headers,
        data: querystring.stringify(values),
        responseType: "json"
      };
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const stsSuccessfulResponse = response.data;
        stsSuccessfulResponse.res = response;
        return stsSuccessfulResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  stscredentials.StsCredentials = StsCredentials;
  return stscredentials;
}
var hasRequiredBaseexternalclient;
function requireBaseexternalclient() {
  if (hasRequiredBaseexternalclient) return baseexternalclient;
  hasRequiredBaseexternalclient = 1;
  (function(exports) {
    var __classPrivateFieldGet = baseexternalclient && baseexternalclient.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = baseexternalclient && baseexternalclient.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _BaseExternalAccountClient_instances, _BaseExternalAccountClient_pendingAccessToken, _BaseExternalAccountClient_internalRefreshAccessTokenAsync;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseExternalAccountClient = exports.DEFAULT_UNIVERSE = exports.CLOUD_RESOURCE_MANAGER = exports.EXTERNAL_ACCOUNT_TYPE = exports.EXPIRATION_TIME_OFFSET = void 0;
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient();
    const sts = requireStscredentials();
    const util_1 = requireUtil();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const DEFAULT_OAUTH_SCOPE = "https://www.googleapis.com/auth/cloud-platform";
    const DEFAULT_TOKEN_LIFESPAN = 3600;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    exports.EXTERNAL_ACCOUNT_TYPE = "external_account";
    exports.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
    const WORKFORCE_AUDIENCE_PATTERN = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+";
    const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/token";
    const pkg = require$$4;
    var authclient_2 = requireAuthclient();
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: function() {
      return authclient_2.DEFAULT_UNIVERSE;
    } });
    class BaseExternalAccountClient extends authclient_1.AuthClient {
      /**
       * Instantiate a BaseExternalAccountClient instance using the provided JSON
       * object loaded from an external account credentials file.
       * @param options The external account options object typically loaded
       *   from the external account JSON credential file. The camelCased options
       *   are aliases for the snake_cased options.
       * @param additionalOptions **DEPRECATED, all options are available in the
       *   `options` parameter.** Optional additional behavior customization options.
       *   These currently customize expiration threshold time and whether to retry
       *   on 401/403 API request errors.
       */
      constructor(options2, additionalOptions) {
        var _a;
        super({ ...options2, ...additionalOptions });
        _BaseExternalAccountClient_instances.add(this);
        _BaseExternalAccountClient_pendingAccessToken.set(this, null);
        const opts = (0, util_1.originalOrCamelOptions)(options2);
        const type = opts.get("type");
        if (type && type !== exports.EXTERNAL_ACCOUNT_TYPE) {
          throw new Error(`Expected "${exports.EXTERNAL_ACCOUNT_TYPE}" type but received "${options2.type}"`);
        }
        const clientId = opts.get("client_id");
        const clientSecret = opts.get("client_secret");
        const tokenUrl = (_a = opts.get("token_url")) !== null && _a !== void 0 ? _a : DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain);
        const subjectTokenType = opts.get("subject_token_type");
        const workforcePoolUserProject = opts.get("workforce_pool_user_project");
        const serviceAccountImpersonationUrl = opts.get("service_account_impersonation_url");
        const serviceAccountImpersonation = opts.get("service_account_impersonation");
        const serviceAccountImpersonationLifetime = (0, util_1.originalOrCamelOptions)(serviceAccountImpersonation).get("token_lifetime_seconds");
        this.cloudResourceManagerURL = new URL(opts.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`);
        if (clientId) {
          this.clientAuth = {
            confidentialClientType: "basic",
            clientId,
            clientSecret
          };
        }
        this.stsCredential = new sts.StsCredentials(tokenUrl, this.clientAuth);
        this.scopes = opts.get("scopes") || [DEFAULT_OAUTH_SCOPE];
        this.cachedAccessToken = null;
        this.audience = opts.get("audience");
        this.subjectTokenType = subjectTokenType;
        this.workforcePoolUserProject = workforcePoolUserProject;
        const workforceAudiencePattern = new RegExp(WORKFORCE_AUDIENCE_PATTERN);
        if (this.workforcePoolUserProject && !this.audience.match(workforceAudiencePattern)) {
          throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
        }
        this.serviceAccountImpersonationUrl = serviceAccountImpersonationUrl;
        this.serviceAccountImpersonationLifetime = serviceAccountImpersonationLifetime;
        if (this.serviceAccountImpersonationLifetime) {
          this.configLifetimeRequested = true;
        } else {
          this.configLifetimeRequested = false;
          this.serviceAccountImpersonationLifetime = DEFAULT_TOKEN_LIFESPAN;
        }
        this.projectNumber = this.getProjectNumber(this.audience);
        this.supplierContext = {
          audience: this.audience,
          subjectTokenType: this.subjectTokenType,
          transporter: this.transporter
        };
      }
      /** The service account email to be impersonated, if available. */
      getServiceAccountEmail() {
        var _a;
        if (this.serviceAccountImpersonationUrl) {
          if (this.serviceAccountImpersonationUrl.length > 256) {
            throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
          }
          const re = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/;
          const result = re.exec(this.serviceAccountImpersonationUrl);
          return ((_a = result === null || result === void 0 ? void 0 : result.groups) === null || _a === void 0 ? void 0 : _a.email) || null;
        }
        return null;
      }
      /**
       * Provides a mechanism to inject GCP access tokens directly.
       * When the provided credential expires, a new credential, using the
       * external account options, is retrieved.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        super.setCredentials(credentials);
        this.cachedAccessToken = credentials;
      }
      /**
       * @return A promise that resolves with the current GCP access token
       *   response. If the current credential is expired, a new one is retrieved.
       */
      async getAccessToken() {
        if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedAccessToken.access_token,
          res: this.cachedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { Authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessTokenResponse.token}`
        };
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * @return A promise that resolves with the project ID corresponding to the
       *   current workload identity pool or current workforce pool if
       *   determinable. For workforce pool credential, it returns the project ID
       *   corresponding to the workforcePoolUserProject.
       *   This is introduced to match the current pattern of using the Auth
       *   library:
       *   const projectId = await auth.getProjectId();
       *   const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
       *   const res = await client.request({ url });
       *   The resource may not have permission
       *   (resourcemanager.projects.get) to call this API or the required
       *   scopes may not be selected:
       *   https://cloud.google.com/resource-manager/reference/rest/v1/projects/get#authorization-scopes
       */
      async getProjectId() {
        const projectNumber = this.projectNumber || this.workforcePoolUserProject;
        if (this.projectId) {
          return this.projectId;
        } else if (projectNumber) {
          const headers = await this.getRequestHeaders();
          const response = await this.transporter.request({
            ...BaseExternalAccountClient.RETRY_CONFIG,
            headers,
            url: `${this.cloudResourceManagerURL.toString()}${projectNumber}`,
            responseType: "json"
          });
          this.projectId = response.data.projectId;
          return this.projectId;
        }
        return null;
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = opts.headers || {};
          if (requestHeaders && requestHeaders["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
          }
          if (requestHeaders && requestHeaders.Authorization) {
            opts.headers.Authorization = requestHeaders.Authorization;
          }
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * External credentials are exchanged for GCP access tokens via the token
       * exchange endpoint and other settings provided in the client options
       * object.
       * If the service_account_impersonation_url is provided, an additional
       * step to exchange the external account GCP access token for a service
       * account impersonated token is performed.
       * @return A promise that resolves with the fresh GCP access tokens.
       */
      async refreshAccessTokenAsync() {
        __classPrivateFieldSet(this, _BaseExternalAccountClient_pendingAccessToken, __classPrivateFieldGet(this, _BaseExternalAccountClient_pendingAccessToken, "f") || __classPrivateFieldGet(this, _BaseExternalAccountClient_instances, "m", _BaseExternalAccountClient_internalRefreshAccessTokenAsync).call(this), "f");
        try {
          return await __classPrivateFieldGet(this, _BaseExternalAccountClient_pendingAccessToken, "f");
        } finally {
          __classPrivateFieldSet(this, _BaseExternalAccountClient_pendingAccessToken, null, "f");
        }
      }
      /**
       * Returns the workload identity pool project number if it is determinable
       * from the audience resource name.
       * @param audience The STS audience used to determine the project number.
       * @return The project number associated with the workload identity pool, if
       *   this can be determined from the STS audience field. Otherwise, null is
       *   returned.
       */
      getProjectNumber(audience) {
        const match = audience.match(/\/projects\/([^/]+)/);
        if (!match) {
          return null;
        }
        return match[1];
      }
      /**
       * Exchanges an external account GCP access token for a service
       * account impersonated access token using iamcredentials
       * GenerateAccessToken API.
       * @param token The access token to exchange for a service account access
       *   token.
       * @return A promise that resolves with the service account impersonated
       *   credentials response.
       */
      async getImpersonatedAccessToken(token) {
        const opts = {
          ...BaseExternalAccountClient.RETRY_CONFIG,
          url: this.serviceAccountImpersonationUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          data: {
            scope: this.getScopesArray(),
            lifetime: this.serviceAccountImpersonationLifetime + "s"
          },
          responseType: "json"
        };
        const response = await this.transporter.request(opts);
        const successResponse = response.data;
        return {
          access_token: successResponse.accessToken,
          // Convert from ISO format to timestamp.
          expiry_date: new Date(successResponse.expireTime).getTime(),
          res: response
        };
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param accessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(accessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return accessToken.expiry_date ? now >= accessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
      /**
       * @return The list of scopes for the requested GCP access token.
       */
      getScopesArray() {
        if (typeof this.scopes === "string") {
          return [this.scopes];
        }
        return this.scopes || [DEFAULT_OAUTH_SCOPE];
      }
      getMetricsHeaderValue() {
        const nodeVersion = process.version.replace(/^v/, "");
        const saImpersonation = this.serviceAccountImpersonationUrl !== void 0;
        const credentialSourceType = this.credentialSourceType ? this.credentialSourceType : "unknown";
        return `gl-node/${nodeVersion} auth/${pkg.version} google-byoid-sdk source/${credentialSourceType} sa-impersonation/${saImpersonation} config-lifetime/${this.configLifetimeRequested}`;
      }
    }
    exports.BaseExternalAccountClient = BaseExternalAccountClient;
    _BaseExternalAccountClient_pendingAccessToken = /* @__PURE__ */ new WeakMap(), _BaseExternalAccountClient_instances = /* @__PURE__ */ new WeakSet(), _BaseExternalAccountClient_internalRefreshAccessTokenAsync = async function _BaseExternalAccountClient_internalRefreshAccessTokenAsync2() {
      const subjectToken = await this.retrieveSubjectToken();
      const stsCredentialsOptions = {
        grantType: STS_GRANT_TYPE,
        audience: this.audience,
        requestedTokenType: STS_REQUEST_TOKEN_TYPE,
        subjectToken,
        subjectTokenType: this.subjectTokenType,
        // generateAccessToken requires the provided access token to have
        // scopes:
        // https://www.googleapis.com/auth/iam or
        // https://www.googleapis.com/auth/cloud-platform
        // The new service account access token scopes will match the user
        // provided ones.
        scope: this.serviceAccountImpersonationUrl ? [DEFAULT_OAUTH_SCOPE] : this.getScopesArray()
      };
      const additionalOptions = !this.clientAuth && this.workforcePoolUserProject ? { userProject: this.workforcePoolUserProject } : void 0;
      const additionalHeaders = {
        "x-goog-api-client": this.getMetricsHeaderValue()
      };
      const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, additionalHeaders, additionalOptions);
      if (this.serviceAccountImpersonationUrl) {
        this.cachedAccessToken = await this.getImpersonatedAccessToken(stsResponse.access_token);
      } else if (stsResponse.expires_in) {
        this.cachedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3,
          res: stsResponse.res
        };
      } else {
        this.cachedAccessToken = {
          access_token: stsResponse.access_token,
          res: stsResponse.res
        };
      }
      this.credentials = {};
      Object.assign(this.credentials, this.cachedAccessToken);
      delete this.credentials.res;
      this.emit("tokens", {
        refresh_token: null,
        expiry_date: this.cachedAccessToken.expiry_date,
        access_token: this.cachedAccessToken.access_token,
        token_type: "Bearer",
        id_token: null
      });
      return this.cachedAccessToken;
    };
  })(baseexternalclient);
  return baseexternalclient;
}
var identitypoolclient = {};
var filesubjecttokensupplier = {};
var hasRequiredFilesubjecttokensupplier;
function requireFilesubjecttokensupplier() {
  if (hasRequiredFilesubjecttokensupplier) return filesubjecttokensupplier;
  hasRequiredFilesubjecttokensupplier = 1;
  var _a, _b, _c;
  Object.defineProperty(filesubjecttokensupplier, "__esModule", { value: true });
  filesubjecttokensupplier.FileSubjectTokenSupplier = void 0;
  const util_1 = require$$0$6;
  const fs = require$$0$3;
  const readFile = (0, util_1.promisify)((_a = fs.readFile) !== null && _a !== void 0 ? _a : (() => {
  }));
  const realpath = (0, util_1.promisify)((_b = fs.realpath) !== null && _b !== void 0 ? _b : (() => {
  }));
  const lstat = (0, util_1.promisify)((_c = fs.lstat) !== null && _c !== void 0 ? _c : (() => {
  }));
  class FileSubjectTokenSupplier {
    /**
     * Instantiates a new file based subject token supplier.
     * @param opts The file subject token supplier options to build the supplier
     *   with.
     */
    constructor(opts) {
      this.filePath = opts.filePath;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
    }
    /**
     * Returns the subject token stored at the file specified in the constructor.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken(context) {
      let parsedFilePath = this.filePath;
      try {
        parsedFilePath = await realpath(parsedFilePath);
        if (!(await lstat(parsedFilePath)).isFile()) {
          throw new Error();
        }
      } catch (err) {
        if (err instanceof Error) {
          err.message = `The file at ${parsedFilePath} does not exist, or it is not a file. ${err.message}`;
        }
        throw err;
      }
      let subjectToken;
      const rawText = await readFile(parsedFilePath, { encoding: "utf8" });
      if (this.formatType === "text") {
        subjectToken = rawText;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const json = JSON.parse(rawText);
        subjectToken = json[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source file");
      }
      return subjectToken;
    }
  }
  filesubjecttokensupplier.FileSubjectTokenSupplier = FileSubjectTokenSupplier;
  return filesubjecttokensupplier;
}
var urlsubjecttokensupplier = {};
var hasRequiredUrlsubjecttokensupplier;
function requireUrlsubjecttokensupplier() {
  if (hasRequiredUrlsubjecttokensupplier) return urlsubjecttokensupplier;
  hasRequiredUrlsubjecttokensupplier = 1;
  Object.defineProperty(urlsubjecttokensupplier, "__esModule", { value: true });
  urlsubjecttokensupplier.UrlSubjectTokenSupplier = void 0;
  class UrlSubjectTokenSupplier {
    /**
     * Instantiates a URL subject token supplier.
     * @param opts The URL subject token supplier options to build the supplier with.
     */
    constructor(opts) {
      this.url = opts.url;
      this.formatType = opts.formatType;
      this.subjectTokenFieldName = opts.subjectTokenFieldName;
      this.headers = opts.headers;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Sends a GET request to the URL provided in the constructor and resolves
     * with the returned external subject token.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link IdentityPoolClient}, contains the requested audience and subject
     *   token type for the external account identity. Not used.
     */
    async getSubjectToken(context) {
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.url,
        method: "GET",
        headers: this.headers,
        responseType: this.formatType
      };
      let subjectToken;
      if (this.formatType === "text") {
        const response = await context.transporter.request(opts);
        subjectToken = response.data;
      } else if (this.formatType === "json" && this.subjectTokenFieldName) {
        const response = await context.transporter.request(opts);
        subjectToken = response.data[this.subjectTokenFieldName];
      }
      if (!subjectToken) {
        throw new Error("Unable to parse the subject_token from the credential_source URL");
      }
      return subjectToken;
    }
  }
  urlsubjecttokensupplier.UrlSubjectTokenSupplier = UrlSubjectTokenSupplier;
  return urlsubjecttokensupplier;
}
var hasRequiredIdentitypoolclient;
function requireIdentitypoolclient() {
  if (hasRequiredIdentitypoolclient) return identitypoolclient;
  hasRequiredIdentitypoolclient = 1;
  Object.defineProperty(identitypoolclient, "__esModule", { value: true });
  identitypoolclient.IdentityPoolClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient();
  const util_1 = requireUtil();
  const filesubjecttokensupplier_1 = requireFilesubjecttokensupplier();
  const urlsubjecttokensupplier_1 = requireUrlsubjecttokensupplier();
  class IdentityPoolClient extends baseexternalclient_1.BaseExternalAccountClient {
    /**
     * Instantiate an IdentityPoolClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid file-sourced or
     * url-sourced credential or a workforce pool user project is provided
     * with a non workforce audience.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file. The camelCased options
     *   are aliases for the snake_cased options.
     * @param additionalOptions **DEPRECATED, all options are available in the
     *   `options` parameter.** Optional additional behavior customization options.
     *   These currently customize expiration threshold time and whether to retry
     *   on 401/403 API request errors.
     */
    constructor(options2, additionalOptions) {
      super(options2, additionalOptions);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const subjectTokenSupplier = opts.get("subject_token_supplier");
      if (!credentialSource && !subjectTokenSupplier) {
        throw new Error("A credential source or subject token supplier must be specified.");
      }
      if (credentialSource && subjectTokenSupplier) {
        throw new Error("Only one of credential source or subject token supplier can be specified.");
      }
      if (subjectTokenSupplier) {
        this.subjectTokenSupplier = subjectTokenSupplier;
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        const formatOpts = (0, util_1.originalOrCamelOptions)(credentialSourceOpts.get("format"));
        const formatType = formatOpts.get("type") || "text";
        const formatSubjectTokenFieldName = formatOpts.get("subject_token_field_name");
        if (formatType !== "json" && formatType !== "text") {
          throw new Error(`Invalid credential_source format "${formatType}"`);
        }
        if (formatType === "json" && !formatSubjectTokenFieldName) {
          throw new Error("Missing subject_token_field_name for JSON credential_source format");
        }
        const file = credentialSourceOpts.get("file");
        const url = credentialSourceOpts.get("url");
        const headers = credentialSourceOpts.get("headers");
        if (file && url) {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
        } else if (file && !url) {
          this.credentialSourceType = "file";
          this.subjectTokenSupplier = new filesubjecttokensupplier_1.FileSubjectTokenSupplier({
            filePath: file,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName
          });
        } else if (!file && url) {
          this.credentialSourceType = "url";
          this.subjectTokenSupplier = new urlsubjecttokensupplier_1.UrlSubjectTokenSupplier({
            url,
            formatType,
            subjectTokenFieldName: formatSubjectTokenFieldName,
            headers,
            additionalGaxiosOptions: IdentityPoolClient.RETRY_CONFIG
          });
        } else {
          throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
        }
      }
    }
    /**
     * Triggered when a external subject token is needed to be exchanged for a GCP
     * access token via GCP STS endpoint. Gets a subject token by calling
     * the configured {@link SubjectTokenSupplier}
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      return this.subjectTokenSupplier.getSubjectToken(this.supplierContext);
    }
  }
  identitypoolclient.IdentityPoolClient = IdentityPoolClient;
  return identitypoolclient;
}
var awsclient = {};
var awsrequestsigner = {};
var hasRequiredAwsrequestsigner;
function requireAwsrequestsigner() {
  if (hasRequiredAwsrequestsigner) return awsrequestsigner;
  hasRequiredAwsrequestsigner = 1;
  Object.defineProperty(awsrequestsigner, "__esModule", { value: true });
  awsrequestsigner.AwsRequestSigner = void 0;
  const crypto_1 = requireCrypto();
  const AWS_ALGORITHM = "AWS4-HMAC-SHA256";
  const AWS_REQUEST_TYPE = "aws4_request";
  class AwsRequestSigner {
    /**
     * Instantiates an AWS API request signer used to send authenticated signed
     * requests to AWS APIs based on the AWS Signature Version 4 signing process.
     * This also provides a mechanism to generate the signed request without
     * sending it.
     * @param getCredentials A mechanism to retrieve AWS security credentials
     *   when needed.
     * @param region The AWS region to use.
     */
    constructor(getCredentials2, region) {
      this.getCredentials = getCredentials2;
      this.region = region;
      this.crypto = (0, crypto_1.createCrypto)();
    }
    /**
     * Generates the signed request for the provided HTTP request for calling
     * an AWS API. This follows the steps described at:
     * https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
     * @param amzOptions The AWS request options that need to be signed.
     * @return A promise that resolves with the GaxiosOptions containing the
     *   signed HTTP request parameters.
     */
    async getRequestOptions(amzOptions) {
      if (!amzOptions.url) {
        throw new Error('"url" is required in "amzOptions"');
      }
      const requestPayloadData = typeof amzOptions.data === "object" ? JSON.stringify(amzOptions.data) : amzOptions.data;
      const url = amzOptions.url;
      const method = amzOptions.method || "GET";
      const requestPayload = amzOptions.body || requestPayloadData;
      const additionalAmzHeaders = amzOptions.headers;
      const awsSecurityCredentials = await this.getCredentials();
      const uri = new URL(url);
      const headerMap = await generateAuthenticationHeaderMap({
        crypto: this.crypto,
        host: uri.host,
        canonicalUri: uri.pathname,
        canonicalQuerystring: uri.search.substr(1),
        method,
        region: this.region,
        securityCredentials: awsSecurityCredentials,
        requestPayload,
        additionalAmzHeaders
      });
      const headers = Object.assign(
        // Add x-amz-date if available.
        headerMap.amzDate ? { "x-amz-date": headerMap.amzDate } : {},
        {
          Authorization: headerMap.authorizationHeader,
          host: uri.host
        },
        additionalAmzHeaders || {}
      );
      if (awsSecurityCredentials.token) {
        Object.assign(headers, {
          "x-amz-security-token": awsSecurityCredentials.token
        });
      }
      const awsSignedReq = {
        url,
        method,
        headers
      };
      if (typeof requestPayload !== "undefined") {
        awsSignedReq.body = requestPayload;
      }
      return awsSignedReq;
    }
  }
  awsrequestsigner.AwsRequestSigner = AwsRequestSigner;
  async function sign(crypto2, key, msg) {
    return await crypto2.signWithHmacSha256(key, msg);
  }
  async function getSigningKey(crypto2, key, dateStamp, region, serviceName) {
    const kDate = await sign(crypto2, `AWS4${key}`, dateStamp);
    const kRegion = await sign(crypto2, kDate, region);
    const kService = await sign(crypto2, kRegion, serviceName);
    const kSigning = await sign(crypto2, kService, "aws4_request");
    return kSigning;
  }
  async function generateAuthenticationHeaderMap(options2) {
    const additionalAmzHeaders = options2.additionalAmzHeaders || {};
    const requestPayload = options2.requestPayload || "";
    const serviceName = options2.host.split(".")[0];
    const now = /* @__PURE__ */ new Date();
    const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, "");
    const dateStamp = now.toISOString().replace(/[-]/g, "").replace(/T.*/, "");
    const reformattedAdditionalAmzHeaders = {};
    Object.keys(additionalAmzHeaders).forEach((key) => {
      reformattedAdditionalAmzHeaders[key.toLowerCase()] = additionalAmzHeaders[key];
    });
    if (options2.securityCredentials.token) {
      reformattedAdditionalAmzHeaders["x-amz-security-token"] = options2.securityCredentials.token;
    }
    const amzHeaders = Object.assign(
      {
        host: options2.host
      },
      // Previously the date was not fixed with x-amz- and could be provided manually.
      // https://github.com/boto/botocore/blob/879f8440a4e9ace5d3cf145ce8b3d5e5ffb892ef/tests/unit/auth/aws4_testsuite/get-header-value-trim.req
      reformattedAdditionalAmzHeaders.date ? {} : { "x-amz-date": amzDate },
      reformattedAdditionalAmzHeaders
    );
    let canonicalHeaders = "";
    const signedHeadersList = Object.keys(amzHeaders).sort();
    signedHeadersList.forEach((key) => {
      canonicalHeaders += `${key}:${amzHeaders[key]}
`;
    });
    const signedHeaders = signedHeadersList.join(";");
    const payloadHash = await options2.crypto.sha256DigestHex(requestPayload);
    const canonicalRequest = `${options2.method}
${options2.canonicalUri}
${options2.canonicalQuerystring}
${canonicalHeaders}
${signedHeaders}
${payloadHash}`;
    const credentialScope = `${dateStamp}/${options2.region}/${serviceName}/${AWS_REQUEST_TYPE}`;
    const stringToSign = `${AWS_ALGORITHM}
${amzDate}
${credentialScope}
` + await options2.crypto.sha256DigestHex(canonicalRequest);
    const signingKey = await getSigningKey(options2.crypto, options2.securityCredentials.secretAccessKey, dateStamp, options2.region, serviceName);
    const signature = await sign(options2.crypto, signingKey, stringToSign);
    const authorizationHeader = `${AWS_ALGORITHM} Credential=${options2.securityCredentials.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${(0, crypto_1.fromArrayBufferToHex)(signature)}`;
    return {
      // Do not return x-amz-date if date is available.
      amzDate: reformattedAdditionalAmzHeaders.date ? void 0 : amzDate,
      authorizationHeader,
      canonicalQuerystring: options2.canonicalQuerystring
    };
  }
  return awsrequestsigner;
}
var defaultawssecuritycredentialssupplier = {};
var hasRequiredDefaultawssecuritycredentialssupplier;
function requireDefaultawssecuritycredentialssupplier() {
  if (hasRequiredDefaultawssecuritycredentialssupplier) return defaultawssecuritycredentialssupplier;
  hasRequiredDefaultawssecuritycredentialssupplier = 1;
  var __classPrivateFieldGet = defaultawssecuritycredentialssupplier && defaultawssecuritycredentialssupplier.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _DefaultAwsSecurityCredentialsSupplier_instances, _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken, _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName, _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials, _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get, _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get;
  Object.defineProperty(defaultawssecuritycredentialssupplier, "__esModule", { value: true });
  defaultawssecuritycredentialssupplier.DefaultAwsSecurityCredentialsSupplier = void 0;
  class DefaultAwsSecurityCredentialsSupplier {
    /**
     * Instantiates a new DefaultAwsSecurityCredentialsSupplier using information
     * from the credential_source stored in the ADC file.
     * @param opts The default aws security credentials supplier options object to
     *   build the supplier with.
     */
    constructor(opts) {
      _DefaultAwsSecurityCredentialsSupplier_instances.add(this);
      this.regionUrl = opts.regionUrl;
      this.securityCredentialsUrl = opts.securityCredentialsUrl;
      this.imdsV2SessionTokenUrl = opts.imdsV2SessionTokenUrl;
      this.additionalGaxiosOptions = opts.additionalGaxiosOptions;
    }
    /**
     * Returns the active AWS region. This first checks to see if the region
     * is available as an environment variable. If it is not, then the supplier
     * will call the region URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS region string.
     */
    async getAwsRegion(context) {
      if (__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get)) {
        return __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get);
      }
      const metadataHeaders = {};
      if (!__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get) && this.imdsV2SessionTokenUrl) {
        metadataHeaders["x-aws-ec2-metadata-token"] = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken).call(this, context.transporter);
      }
      if (!this.regionUrl) {
        throw new Error('Unable to determine AWS region due to missing "options.credential_source.region_url"');
      }
      const opts = {
        ...this.additionalGaxiosOptions,
        url: this.regionUrl,
        method: "GET",
        responseType: "text",
        headers: metadataHeaders
      };
      const response = await context.transporter.request(opts);
      return response.data.substr(0, response.data.length - 1);
    }
    /**
     * Returns AWS security credentials. This first checks to see if the credentials
     * is available as environment variables. If it is not, then the supplier
     * will call the security credentials URL.
     * @param context {@link ExternalAccountSupplierContext} from the calling
     *   {@link AwsClient}, contains the requested audience and subject token type
     *   for the external account identity.
     * @return A promise that resolves with the AWS security credentials.
     */
    async getAwsSecurityCredentials(context) {
      if (__classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get)) {
        return __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "a", _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get);
      }
      const metadataHeaders = {};
      if (this.imdsV2SessionTokenUrl) {
        metadataHeaders["x-aws-ec2-metadata-token"] = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken).call(this, context.transporter);
      }
      const roleName = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName).call(this, metadataHeaders, context.transporter);
      const awsCreds = await __classPrivateFieldGet(this, _DefaultAwsSecurityCredentialsSupplier_instances, "m", _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials).call(this, roleName, metadataHeaders, context.transporter);
      return {
        accessKeyId: awsCreds.AccessKeyId,
        secretAccessKey: awsCreds.SecretAccessKey,
        token: awsCreds.Token
      };
    }
  }
  defaultawssecuritycredentialssupplier.DefaultAwsSecurityCredentialsSupplier = DefaultAwsSecurityCredentialsSupplier;
  _DefaultAwsSecurityCredentialsSupplier_instances = /* @__PURE__ */ new WeakSet(), _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken = /**
   * @param transporter The transporter to use for requests.
   * @return A promise that resolves with the IMDSv2 Session Token.
   */
  async function _DefaultAwsSecurityCredentialsSupplier_getImdsV2SessionToken2(transporter) {
    const opts = {
      ...this.additionalGaxiosOptions,
      url: this.imdsV2SessionTokenUrl,
      method: "PUT",
      responseType: "text",
      headers: { "x-aws-ec2-metadata-token-ttl-seconds": "300" }
    };
    const response = await transporter.request(opts);
    return response.data;
  }, _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName = /**
   * @param headers The headers to be used in the metadata request.
   * @param transporter The transporter to use for requests.
   * @return A promise that resolves with the assigned role to the current
   *   AWS VM. This is needed for calling the security-credentials endpoint.
   */
  async function _DefaultAwsSecurityCredentialsSupplier_getAwsRoleName2(headers, transporter) {
    if (!this.securityCredentialsUrl) {
      throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
    }
    const opts = {
      ...this.additionalGaxiosOptions,
      url: this.securityCredentialsUrl,
      method: "GET",
      responseType: "text",
      headers
    };
    const response = await transporter.request(opts);
    return response.data;
  }, _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials = /**
   * Retrieves the temporary AWS credentials by calling the security-credentials
   * endpoint as specified in the `credential_source` object.
   * @param roleName The role attached to the current VM.
   * @param headers The headers to be used in the metadata request.
   * @param transporter The transporter to use for requests.
   * @return A promise that resolves with the temporary AWS credentials
   *   needed for creating the GetCallerIdentity signed request.
   */
  async function _DefaultAwsSecurityCredentialsSupplier_retrieveAwsSecurityCredentials2(roleName, headers, transporter) {
    const response = await transporter.request({
      ...this.additionalGaxiosOptions,
      url: `${this.securityCredentialsUrl}/${roleName}`,
      responseType: "json",
      headers
    });
    return response.data;
  }, _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get = function _DefaultAwsSecurityCredentialsSupplier_regionFromEnv_get2() {
    return process.env["AWS_REGION"] || process.env["AWS_DEFAULT_REGION"] || null;
  }, _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get = function _DefaultAwsSecurityCredentialsSupplier_securityCredentialsFromEnv_get2() {
    if (process.env["AWS_ACCESS_KEY_ID"] && process.env["AWS_SECRET_ACCESS_KEY"]) {
      return {
        accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
        secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
        token: process.env["AWS_SESSION_TOKEN"]
      };
    }
    return null;
  };
  return defaultawssecuritycredentialssupplier;
}
var hasRequiredAwsclient;
function requireAwsclient() {
  if (hasRequiredAwsclient) return awsclient;
  hasRequiredAwsclient = 1;
  var __classPrivateFieldGet = awsclient && awsclient.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _a, _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL;
  Object.defineProperty(awsclient, "__esModule", { value: true });
  awsclient.AwsClient = void 0;
  const awsrequestsigner_1 = requireAwsrequestsigner();
  const baseexternalclient_1 = requireBaseexternalclient();
  const defaultawssecuritycredentialssupplier_1 = requireDefaultawssecuritycredentialssupplier();
  const util_1 = requireUtil();
  class AwsClient extends baseexternalclient_1.BaseExternalAccountClient {
    /**
     * Instantiates an AwsClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid AWS credential.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     * @param additionalOptions **DEPRECATED, all options are available in the
     *   `options` parameter.** Optional additional behavior customization options.
     *   These currently customize expiration threshold time and whether to retry
     *   on 401/403 API request errors.
     */
    constructor(options2, additionalOptions) {
      super(options2, additionalOptions);
      const opts = (0, util_1.originalOrCamelOptions)(options2);
      const credentialSource = opts.get("credential_source");
      const awsSecurityCredentialsSupplier = opts.get("aws_security_credentials_supplier");
      if (!credentialSource && !awsSecurityCredentialsSupplier) {
        throw new Error("A credential source or AWS security credentials supplier must be specified.");
      }
      if (credentialSource && awsSecurityCredentialsSupplier) {
        throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
      }
      if (awsSecurityCredentialsSupplier) {
        this.awsSecurityCredentialsSupplier = awsSecurityCredentialsSupplier;
        this.regionalCredVerificationUrl = __classPrivateFieldGet(_a, _a, "f", _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL);
        this.credentialSourceType = "programmatic";
      } else {
        const credentialSourceOpts = (0, util_1.originalOrCamelOptions)(credentialSource);
        this.environmentId = credentialSourceOpts.get("environment_id");
        const regionUrl = credentialSourceOpts.get("region_url");
        const securityCredentialsUrl = credentialSourceOpts.get("url");
        const imdsV2SessionTokenUrl = credentialSourceOpts.get("imdsv2_session_token_url");
        this.awsSecurityCredentialsSupplier = new defaultawssecuritycredentialssupplier_1.DefaultAwsSecurityCredentialsSupplier({
          regionUrl,
          securityCredentialsUrl,
          imdsV2SessionTokenUrl
        });
        this.regionalCredVerificationUrl = credentialSourceOpts.get("regional_cred_verification_url");
        this.credentialSourceType = "aws";
        this.validateEnvironmentId();
      }
      this.awsRequestSigner = null;
      this.region = "";
    }
    validateEnvironmentId() {
      var _b;
      const match = (_b = this.environmentId) === null || _b === void 0 ? void 0 : _b.match(/^(aws)(\d+)$/);
      if (!match || !this.regionalCredVerificationUrl) {
        throw new Error('No valid AWS "credential_source" provided');
      } else if (parseInt(match[2], 10) !== 1) {
        throw new Error(`aws version "${match[2]}" is not supported in the current build.`);
      }
    }
    /**
     * Triggered when an external subject token is needed to be exchanged for a
     * GCP access token via GCP STS endpoint. This will call the
     * {@link AwsSecurityCredentialsSupplier} to retrieve an AWS region and AWS
     * Security Credentials, then use them to create a signed AWS STS request that
     * can be exchanged for a GCP access token.
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      if (!this.awsRequestSigner) {
        this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext);
        this.awsRequestSigner = new awsrequestsigner_1.AwsRequestSigner(async () => {
          return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext);
        }, this.region);
      }
      const options2 = await this.awsRequestSigner.getRequestOptions({
        ..._a.RETRY_CONFIG,
        url: this.regionalCredVerificationUrl.replace("{region}", this.region),
        method: "POST"
      });
      const reformattedHeader = [];
      const extendedHeaders = Object.assign({
        // The full, canonical resource name of the workload identity pool
        // provider, with or without the HTTPS prefix.
        // Including this header as part of the signature is recommended to
        // ensure data integrity.
        "x-goog-cloud-target-resource": this.audience
      }, options2.headers);
      for (const key in extendedHeaders) {
        reformattedHeader.push({
          key,
          value: extendedHeaders[key]
        });
      }
      return encodeURIComponent(JSON.stringify({
        url: options2.url,
        method: options2.method,
        headers: reformattedHeader
      }));
    }
  }
  awsclient.AwsClient = AwsClient;
  _a = AwsClient;
  _AwsClient_DEFAULT_AWS_REGIONAL_CREDENTIAL_VERIFICATION_URL = { value: "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15" };
  AwsClient.AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
  AwsClient.AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254";
  return awsclient;
}
var pluggableAuthClient = {};
var executableResponse = {};
var hasRequiredExecutableResponse;
function requireExecutableResponse() {
  if (hasRequiredExecutableResponse) return executableResponse;
  hasRequiredExecutableResponse = 1;
  Object.defineProperty(executableResponse, "__esModule", { value: true });
  executableResponse.InvalidSubjectTokenError = executableResponse.InvalidMessageFieldError = executableResponse.InvalidCodeFieldError = executableResponse.InvalidTokenTypeFieldError = executableResponse.InvalidExpirationTimeFieldError = executableResponse.InvalidSuccessFieldError = executableResponse.InvalidVersionFieldError = executableResponse.ExecutableResponseError = executableResponse.ExecutableResponse = void 0;
  const SAML_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:saml2";
  const OIDC_SUBJECT_TOKEN_TYPE1 = "urn:ietf:params:oauth:token-type:id_token";
  const OIDC_SUBJECT_TOKEN_TYPE2 = "urn:ietf:params:oauth:token-type:jwt";
  class ExecutableResponse {
    /**
     * Instantiates an ExecutableResponse instance using the provided JSON object
     * from the output of the executable.
     * @param responseJson Response from a 3rd party executable, loaded from a
     * run of the executable or a cached output file.
     */
    constructor(responseJson) {
      if (!responseJson.version) {
        throw new InvalidVersionFieldError("Executable response must contain a 'version' field.");
      }
      if (responseJson.success === void 0) {
        throw new InvalidSuccessFieldError("Executable response must contain a 'success' field.");
      }
      this.version = responseJson.version;
      this.success = responseJson.success;
      if (this.success) {
        this.expirationTime = responseJson.expiration_time;
        this.tokenType = responseJson.token_type;
        if (this.tokenType !== SAML_SUBJECT_TOKEN_TYPE && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE1 && this.tokenType !== OIDC_SUBJECT_TOKEN_TYPE2) {
          throw new InvalidTokenTypeFieldError(`Executable response must contain a 'token_type' field when successful and it must be one of ${OIDC_SUBJECT_TOKEN_TYPE1}, ${OIDC_SUBJECT_TOKEN_TYPE2}, or ${SAML_SUBJECT_TOKEN_TYPE}.`);
        }
        if (this.tokenType === SAML_SUBJECT_TOKEN_TYPE) {
          if (!responseJson.saml_response) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'saml_response' field when token_type=${SAML_SUBJECT_TOKEN_TYPE}.`);
          }
          this.subjectToken = responseJson.saml_response;
        } else {
          if (!responseJson.id_token) {
            throw new InvalidSubjectTokenError(`Executable response must contain a 'id_token' field when token_type=${OIDC_SUBJECT_TOKEN_TYPE1} or ${OIDC_SUBJECT_TOKEN_TYPE2}.`);
          }
          this.subjectToken = responseJson.id_token;
        }
      } else {
        if (!responseJson.code) {
          throw new InvalidCodeFieldError("Executable response must contain a 'code' field when unsuccessful.");
        }
        if (!responseJson.message) {
          throw new InvalidMessageFieldError("Executable response must contain a 'message' field when unsuccessful.");
        }
        this.errorCode = responseJson.code;
        this.errorMessage = responseJson.message;
      }
    }
    /**
     * @return A boolean representing if the response has a valid token. Returns
     * true when the response was successful and the token is not expired.
     */
    isValid() {
      return !this.isExpired() && this.success;
    }
    /**
     * @return A boolean representing if the response is expired. Returns true if the
     * provided timeout has passed.
     */
    isExpired() {
      return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1e3);
    }
  }
  executableResponse.ExecutableResponse = ExecutableResponse;
  class ExecutableResponseError extends Error {
    constructor(message) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  executableResponse.ExecutableResponseError = ExecutableResponseError;
  class InvalidVersionFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidVersionFieldError = InvalidVersionFieldError;
  class InvalidSuccessFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidSuccessFieldError = InvalidSuccessFieldError;
  class InvalidExpirationTimeFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidExpirationTimeFieldError = InvalidExpirationTimeFieldError;
  class InvalidTokenTypeFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidTokenTypeFieldError = InvalidTokenTypeFieldError;
  class InvalidCodeFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidCodeFieldError = InvalidCodeFieldError;
  class InvalidMessageFieldError extends ExecutableResponseError {
  }
  executableResponse.InvalidMessageFieldError = InvalidMessageFieldError;
  class InvalidSubjectTokenError extends ExecutableResponseError {
  }
  executableResponse.InvalidSubjectTokenError = InvalidSubjectTokenError;
  return executableResponse;
}
var pluggableAuthHandler = {};
var hasRequiredPluggableAuthHandler;
function requirePluggableAuthHandler() {
  if (hasRequiredPluggableAuthHandler) return pluggableAuthHandler;
  hasRequiredPluggableAuthHandler = 1;
  Object.defineProperty(pluggableAuthHandler, "__esModule", { value: true });
  pluggableAuthHandler.PluggableAuthHandler = void 0;
  const pluggable_auth_client_1 = requirePluggableAuthClient();
  const executable_response_1 = requireExecutableResponse();
  const childProcess = require$$1$3;
  const fs = require$$0$3;
  class PluggableAuthHandler {
    /**
     * Instantiates a PluggableAuthHandler instance using the provided
     * PluggableAuthHandlerOptions object.
     */
    constructor(options2) {
      if (!options2.command) {
        throw new Error("No command provided.");
      }
      this.commandComponents = PluggableAuthHandler.parseCommand(options2.command);
      this.timeoutMillis = options2.timeoutMillis;
      if (!this.timeoutMillis) {
        throw new Error("No timeoutMillis provided.");
      }
      this.outputFile = options2.outputFile;
    }
    /**
     * Calls user provided executable to get a 3rd party subject token and
     * returns the response.
     * @param envMap a Map of additional Environment Variables required for
     *   the executable.
     * @return A promise that resolves with the executable response.
     */
    retrieveResponseFromExecutable(envMap) {
      return new Promise((resolve, reject) => {
        const child = childProcess.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
          env: { ...process.env, ...Object.fromEntries(envMap) }
        });
        let output = "";
        child.stdout.on("data", (data) => {
          output += data;
        });
        child.stderr.on("data", (err) => {
          output += err;
        });
        const timeout = setTimeout(() => {
          child.removeAllListeners();
          child.kill();
          return reject(new Error("The executable failed to finish within the timeout specified."));
        }, this.timeoutMillis);
        child.on("close", (code) => {
          clearTimeout(timeout);
          if (code === 0) {
            try {
              const responseJson = JSON.parse(output);
              const response = new executable_response_1.ExecutableResponse(responseJson);
              return resolve(response);
            } catch (error) {
              if (error instanceof executable_response_1.ExecutableResponseError) {
                return reject(error);
              }
              return reject(new executable_response_1.ExecutableResponseError(`The executable returned an invalid response: ${output}`));
            }
          } else {
            return reject(new pluggable_auth_client_1.ExecutableError(output, code.toString()));
          }
        });
      });
    }
    /**
     * Checks user provided output file for response from previous run of
     * executable and return the response if it exists, is formatted correctly, and is not expired.
     */
    async retrieveCachedResponse() {
      if (!this.outputFile || this.outputFile.length === 0) {
        return void 0;
      }
      let filePath;
      try {
        filePath = await fs.promises.realpath(this.outputFile);
      } catch (_a) {
        return void 0;
      }
      if (!(await fs.promises.lstat(filePath)).isFile()) {
        return void 0;
      }
      const responseString = await fs.promises.readFile(filePath, {
        encoding: "utf8"
      });
      if (responseString === "") {
        return void 0;
      }
      try {
        const responseJson = JSON.parse(responseString);
        const response = new executable_response_1.ExecutableResponse(responseJson);
        if (response.isValid()) {
          return new executable_response_1.ExecutableResponse(responseJson);
        }
        return void 0;
      } catch (error) {
        if (error instanceof executable_response_1.ExecutableResponseError) {
          throw error;
        }
        throw new executable_response_1.ExecutableResponseError(`The output file contained an invalid response: ${responseString}`);
      }
    }
    /**
     * Parses given command string into component array, splitting on spaces unless
     * spaces are between quotation marks.
     */
    static parseCommand(command) {
      const components = command.match(/(?:[^\s"]+|"[^"]*")+/g);
      if (!components) {
        throw new Error(`Provided command: "${command}" could not be parsed.`);
      }
      for (let i = 0; i < components.length; i++) {
        if (components[i][0] === '"' && components[i].slice(-1) === '"') {
          components[i] = components[i].slice(1, -1);
        }
      }
      return components;
    }
  }
  pluggableAuthHandler.PluggableAuthHandler = PluggableAuthHandler;
  return pluggableAuthHandler;
}
var hasRequiredPluggableAuthClient;
function requirePluggableAuthClient() {
  if (hasRequiredPluggableAuthClient) return pluggableAuthClient;
  hasRequiredPluggableAuthClient = 1;
  Object.defineProperty(pluggableAuthClient, "__esModule", { value: true });
  pluggableAuthClient.PluggableAuthClient = pluggableAuthClient.ExecutableError = void 0;
  const baseexternalclient_1 = requireBaseexternalclient();
  const executable_response_1 = requireExecutableResponse();
  const pluggable_auth_handler_1 = requirePluggableAuthHandler();
  class ExecutableError extends Error {
    constructor(message, code) {
      super(`The executable failed with exit code: ${code} and error message: ${message}.`);
      this.code = code;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  pluggableAuthClient.ExecutableError = ExecutableError;
  const DEFAULT_EXECUTABLE_TIMEOUT_MILLIS = 30 * 1e3;
  const MINIMUM_EXECUTABLE_TIMEOUT_MILLIS = 5 * 1e3;
  const MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS = 120 * 1e3;
  const GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES";
  const MAXIMUM_EXECUTABLE_VERSION = 1;
  class PluggableAuthClient extends baseexternalclient_1.BaseExternalAccountClient {
    /**
     * Instantiates a PluggableAuthClient instance using the provided JSON
     * object loaded from an external account credentials file.
     * An error is thrown if the credential is not a valid pluggable auth credential.
     * @param options The external account options object typically loaded from
     *   the external account JSON credential file.
     * @param additionalOptions **DEPRECATED, all options are available in the
     *   `options` parameter.** Optional additional behavior customization options.
     *   These currently customize expiration threshold time and whether to retry
     *   on 401/403 API request errors.
     */
    constructor(options2, additionalOptions) {
      super(options2, additionalOptions);
      if (!options2.credential_source.executable) {
        throw new Error('No valid Pluggable Auth "credential_source" provided.');
      }
      this.command = options2.credential_source.executable.command;
      if (!this.command) {
        throw new Error('No valid Pluggable Auth "credential_source" provided.');
      }
      if (options2.credential_source.executable.timeout_millis === void 0) {
        this.timeoutMillis = DEFAULT_EXECUTABLE_TIMEOUT_MILLIS;
      } else {
        this.timeoutMillis = options2.credential_source.executable.timeout_millis;
        if (this.timeoutMillis < MINIMUM_EXECUTABLE_TIMEOUT_MILLIS || this.timeoutMillis > MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS) {
          throw new Error(`Timeout must be between ${MINIMUM_EXECUTABLE_TIMEOUT_MILLIS} and ${MAXIMUM_EXECUTABLE_TIMEOUT_MILLIS} milliseconds.`);
        }
      }
      this.outputFile = options2.credential_source.executable.output_file;
      this.handler = new pluggable_auth_handler_1.PluggableAuthHandler({
        command: this.command,
        timeoutMillis: this.timeoutMillis,
        outputFile: this.outputFile
      });
      this.credentialSourceType = "executable";
    }
    /**
     * Triggered when an external subject token is needed to be exchanged for a
     * GCP access token via GCP STS endpoint.
     * This uses the `options.credential_source` object to figure out how
     * to retrieve the token using the current environment. In this case,
     * this calls a user provided executable which returns the subject token.
     * The logic is summarized as:
     * 1. Validated that the executable is allowed to run. The
     *    GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment must be set to
     *    1 for security reasons.
     * 2. If an output file is specified by the user, check the file location
     *    for a response. If the file exists and contains a valid response,
     *    return the subject token from the file.
     * 3. Call the provided executable and return response.
     * @return A promise that resolves with the external subject token.
     */
    async retrieveSubjectToken() {
      if (process.env[GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES] !== "1") {
        throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
      }
      let executableResponse2 = void 0;
      if (this.outputFile) {
        executableResponse2 = await this.handler.retrieveCachedResponse();
      }
      if (!executableResponse2) {
        const envMap = /* @__PURE__ */ new Map();
        envMap.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience);
        envMap.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType);
        envMap.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0");
        if (this.outputFile) {
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
        }
        const serviceAccountEmail = this.getServiceAccountEmail();
        if (serviceAccountEmail) {
          envMap.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", serviceAccountEmail);
        }
        executableResponse2 = await this.handler.retrieveResponseFromExecutable(envMap);
      }
      if (executableResponse2.version > MAXIMUM_EXECUTABLE_VERSION) {
        throw new Error(`Version of executable is not currently supported, maximum supported version is ${MAXIMUM_EXECUTABLE_VERSION}.`);
      }
      if (!executableResponse2.success) {
        throw new ExecutableError(executableResponse2.errorMessage, executableResponse2.errorCode);
      }
      if (this.outputFile) {
        if (!executableResponse2.expirationTime) {
          throw new executable_response_1.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.");
        }
      }
      if (executableResponse2.isExpired()) {
        throw new Error("Executable response is expired.");
      }
      return executableResponse2.subjectToken;
    }
  }
  pluggableAuthClient.PluggableAuthClient = PluggableAuthClient;
  return pluggableAuthClient;
}
var hasRequiredExternalclient;
function requireExternalclient() {
  if (hasRequiredExternalclient) return externalclient;
  hasRequiredExternalclient = 1;
  Object.defineProperty(externalclient, "__esModule", { value: true });
  externalclient.ExternalAccountClient = void 0;
  const baseexternalclient_1 = requireBaseexternalclient();
  const identitypoolclient_1 = requireIdentitypoolclient();
  const awsclient_1 = requireAwsclient();
  const pluggable_auth_client_1 = requirePluggableAuthClient();
  class ExternalAccountClient {
    constructor() {
      throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()");
    }
    /**
     * This static method will instantiate the
     * corresponding type of external account credential depending on the
     * underlying credential source.
     * @param options The external account options object typically loaded
     *   from the external account JSON credential file.
     * @param additionalOptions **DEPRECATED, all options are available in the
     *   `options` parameter.** Optional additional behavior customization options.
     *   These currently customize expiration threshold time and whether to retry
     *   on 401/403 API request errors.
     * @return A BaseExternalAccountClient instance or null if the options
     *   provided do not correspond to an external account credential.
     */
    static fromJSON(options2, additionalOptions) {
      var _a, _b;
      if (options2 && options2.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
        if ((_a = options2.credential_source) === null || _a === void 0 ? void 0 : _a.environment_id) {
          return new awsclient_1.AwsClient(options2, additionalOptions);
        } else if ((_b = options2.credential_source) === null || _b === void 0 ? void 0 : _b.executable) {
          return new pluggable_auth_client_1.PluggableAuthClient(options2, additionalOptions);
        } else {
          return new identitypoolclient_1.IdentityPoolClient(options2, additionalOptions);
        }
      } else {
        return null;
      }
    }
  }
  externalclient.ExternalAccountClient = ExternalAccountClient;
  return externalclient;
}
var externalAccountAuthorizedUserClient = {};
var hasRequiredExternalAccountAuthorizedUserClient;
function requireExternalAccountAuthorizedUserClient() {
  if (hasRequiredExternalAccountAuthorizedUserClient) return externalAccountAuthorizedUserClient;
  hasRequiredExternalAccountAuthorizedUserClient = 1;
  Object.defineProperty(externalAccountAuthorizedUserClient, "__esModule", { value: true });
  externalAccountAuthorizedUserClient.ExternalAccountAuthorizedUserClient = externalAccountAuthorizedUserClient.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
  const authclient_1 = requireAuthclient();
  const oauth2common_1 = requireOauth2common();
  const gaxios_1 = requireSrc$8();
  const stream = require$$0$5;
  const baseexternalclient_1 = requireBaseexternalclient();
  externalAccountAuthorizedUserClient.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
  const DEFAULT_TOKEN_URL = "https://sts.{universeDomain}/v1/oauthtoken";
  class ExternalAccountAuthorizedUserHandler extends oauth2common_1.OAuthClientAuthHandler {
    /**
     * Initializes an ExternalAccountAuthorizedUserHandler instance.
     * @param url The URL of the token refresh endpoint.
     * @param transporter The transporter to use for the refresh request.
     * @param clientAuthentication The client authentication credentials to use
     *   for the refresh request.
     */
    constructor(url, transporter, clientAuthentication) {
      super(clientAuthentication);
      this.url = url;
      this.transporter = transporter;
    }
    /**
     * Requests a new access token from the token_url endpoint using the provided
     *   refresh token.
     * @param refreshToken The refresh token to use to generate a new access token.
     * @param additionalHeaders Optional additional headers to pass along the
     *   request.
     * @return A promise that resolves with the token refresh response containing
     *   the requested access token and its expiration time.
     */
    async refreshToken(refreshToken, additionalHeaders) {
      const values = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken
      });
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        ...additionalHeaders
      };
      const opts = {
        ...ExternalAccountAuthorizedUserHandler.RETRY_CONFIG,
        url: this.url,
        method: "POST",
        headers,
        data: values.toString(),
        responseType: "json"
      };
      this.applyClientAuthenticationOptions(opts);
      try {
        const response = await this.transporter.request(opts);
        const tokenRefreshResponse = response.data;
        tokenRefreshResponse.res = response;
        return tokenRefreshResponse;
      } catch (error) {
        if (error instanceof gaxios_1.GaxiosError && error.response) {
          throw (0, oauth2common_1.getErrorFromOAuthErrorResponse)(
            error.response.data,
            // Preserve other fields from the original error.
            error
          );
        }
        throw error;
      }
    }
  }
  class ExternalAccountAuthorizedUserClient extends authclient_1.AuthClient {
    /**
     * Instantiates an ExternalAccountAuthorizedUserClient instances using the
     * provided JSON object loaded from a credentials files.
     * An error is throws if the credential is not valid.
     * @param options The external account authorized user option object typically
     *   from the external accoutn authorized user JSON credential file.
     * @param additionalOptions **DEPRECATED, all options are available in the
     *   `options` parameter.** Optional additional behavior customization options.
     *   These currently customize expiration threshold time and whether to retry
     *   on 401/403 API request errors.
     */
    constructor(options2, additionalOptions) {
      var _a;
      super({ ...options2, ...additionalOptions });
      if (options2.universe_domain) {
        this.universeDomain = options2.universe_domain;
      }
      this.refreshToken = options2.refresh_token;
      const clientAuth = {
        confidentialClientType: "basic",
        clientId: options2.client_id,
        clientSecret: options2.client_secret
      };
      this.externalAccountAuthorizedUserHandler = new ExternalAccountAuthorizedUserHandler((_a = options2.token_url) !== null && _a !== void 0 ? _a : DEFAULT_TOKEN_URL.replace("{universeDomain}", this.universeDomain), this.transporter, clientAuth);
      this.cachedAccessToken = null;
      this.quotaProjectId = options2.quota_project_id;
      if (typeof (additionalOptions === null || additionalOptions === void 0 ? void 0 : additionalOptions.eagerRefreshThresholdMillis) !== "number") {
        this.eagerRefreshThresholdMillis = baseexternalclient_1.EXPIRATION_TIME_OFFSET;
      } else {
        this.eagerRefreshThresholdMillis = additionalOptions.eagerRefreshThresholdMillis;
      }
      this.forceRefreshOnFailure = !!(additionalOptions === null || additionalOptions === void 0 ? void 0 : additionalOptions.forceRefreshOnFailure);
    }
    async getAccessToken() {
      if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) {
        await this.refreshAccessTokenAsync();
      }
      return {
        token: this.cachedAccessToken.access_token,
        res: this.cachedAccessToken.res
      };
    }
    async getRequestHeaders() {
      const accessTokenResponse = await this.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessTokenResponse.token}`
      };
      return this.addSharedMetadataHeaders(headers);
    }
    request(opts, callback) {
      if (callback) {
        this.requestAsync(opts).then((r) => callback(null, r), (e) => {
          return callback(e, e.response);
        });
      } else {
        return this.requestAsync(opts);
      }
    }
    /**
     * Authenticates the provided HTTP request, processes it and resolves with the
     * returned response.
     * @param opts The HTTP request options.
     * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure.
     * @return A promise that resolves with the successful response.
     */
    async requestAsync(opts, reAuthRetried = false) {
      let response;
      try {
        const requestHeaders = await this.getRequestHeaders();
        opts.headers = opts.headers || {};
        if (requestHeaders && requestHeaders["x-goog-user-project"]) {
          opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
        }
        if (requestHeaders && requestHeaders.Authorization) {
          opts.headers.Authorization = requestHeaders.Authorization;
        }
        response = await this.transporter.request(opts);
      } catch (e) {
        const res = e.response;
        if (res) {
          const statusCode = res.status;
          const isReadableStream = res.config.data instanceof stream.Readable;
          const isAuthErr = statusCode === 401 || statusCode === 403;
          if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
            await this.refreshAccessTokenAsync();
            return await this.requestAsync(opts, true);
          }
        }
        throw e;
      }
      return response;
    }
    /**
     * Forces token refresh, even if unexpired tokens are currently cached.
     * @return A promise that resolves with the refreshed credential.
     */
    async refreshAccessTokenAsync() {
      const refreshResponse = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
      this.cachedAccessToken = {
        access_token: refreshResponse.access_token,
        expiry_date: (/* @__PURE__ */ new Date()).getTime() + refreshResponse.expires_in * 1e3,
        res: refreshResponse.res
      };
      if (refreshResponse.refresh_token !== void 0) {
        this.refreshToken = refreshResponse.refresh_token;
      }
      return this.cachedAccessToken;
    }
    /**
     * Returns whether the provided credentials are expired or not.
     * If there is no expiry time, assumes the token is not expired or expiring.
     * @param credentials The credentials to check for expiration.
     * @return Whether the credentials are expired or not.
     */
    isExpired(credentials) {
      const now = (/* @__PURE__ */ new Date()).getTime();
      return credentials.expiry_date ? now >= credentials.expiry_date - this.eagerRefreshThresholdMillis : false;
    }
  }
  externalAccountAuthorizedUserClient.ExternalAccountAuthorizedUserClient = ExternalAccountAuthorizedUserClient;
  return externalAccountAuthorizedUserClient;
}
var hasRequiredGoogleauth;
function requireGoogleauth() {
  if (hasRequiredGoogleauth) return googleauth;
  hasRequiredGoogleauth = 1;
  (function(exports) {
    var __classPrivateFieldGet = googleauth && googleauth.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = googleauth && googleauth.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _GoogleAuth_instances, _GoogleAuth_pendingAuthClient, _GoogleAuth_prepareAndCacheClient, _GoogleAuth_determineClient;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.GoogleAuthExceptionMessages = exports.CLOUD_SDK_CLIENT_ID = void 0;
    const child_process_1 = require$$1$3;
    const fs = require$$0$3;
    const gcpMetadata = requireSrc$9();
    const os = require$$1;
    const path = require$$5;
    const crypto_1 = requireCrypto();
    const transporters_1 = requireTransporters();
    const computeclient_1 = requireComputeclient();
    const idtokenclient_1 = requireIdtokenclient();
    const envDetect_1 = requireEnvDetect();
    const jwtclient_1 = requireJwtclient();
    const refreshclient_1 = requireRefreshclient();
    const impersonated_1 = requireImpersonated();
    const externalclient_1 = requireExternalclient();
    const baseexternalclient_1 = requireBaseexternalclient();
    const authclient_1 = requireAuthclient();
    const externalAccountAuthorizedUserClient_1 = requireExternalAccountAuthorizedUserClient();
    const util_1 = requireUtil();
    exports.CLOUD_SDK_CLIENT_ID = "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com";
    exports.GoogleAuthExceptionMessages = {
      API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
      NO_PROJECT_ID_FOUND: "Unable to detect a Project Id in the current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_CREDENTIALS_FOUND: "Unable to find credentials in current environment. \nTo learn more about authentication and Google APIs, visit: \nhttps://cloud.google.com/docs/authentication/getting-started",
      NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
      NO_UNIVERSE_DOMAIN_FOUND: "Unable to detect a Universe Domain in the current environment.\nTo learn more about Universe Domain retrieval, visit: \nhttps://cloud.google.com/compute/docs/metadata/predefined-metadata-keys"
    };
    class GoogleAuth {
      // Note:  this properly is only public to satisfy unit tests.
      // https://github.com/Microsoft/TypeScript/issues/5228
      get isGCE() {
        return this.checkIsGCE;
      }
      /**
       * Configuration is resolved in the following order of precedence:
       * - {@link GoogleAuthOptions.credentials `credentials`}
       * - {@link GoogleAuthOptions.keyFilename `keyFilename`}
       * - {@link GoogleAuthOptions.keyFile `keyFile`}
       *
       * {@link GoogleAuthOptions.clientOptions `clientOptions`} are passed to the
       * {@link AuthClient `AuthClient`s}.
       *
       * @param opts
       */
      constructor(opts = {}) {
        _GoogleAuth_instances.add(this);
        this.checkIsGCE = void 0;
        this.jsonContent = null;
        this.cachedCredential = null;
        _GoogleAuth_pendingAuthClient.set(this, null);
        this.clientOptions = {};
        this._cachedProjectId = opts.projectId || null;
        this.cachedCredential = opts.authClient || null;
        this.keyFilename = opts.keyFilename || opts.keyFile;
        this.scopes = opts.scopes;
        this.clientOptions = opts.clientOptions || {};
        this.jsonContent = opts.credentials || null;
        this.apiKey = opts.apiKey || this.clientOptions.apiKey || null;
        if (this.apiKey && (this.jsonContent || this.clientOptions.credentials)) {
          throw new RangeError(exports.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
        }
        if (opts.universeDomain) {
          this.clientOptions.universeDomain = opts.universeDomain;
        }
      }
      // GAPIC client libraries should always use self-signed JWTs. The following
      // variables are set on the JWT client in order to indicate the type of library,
      // and sign the JWT with the correct audience and scopes (if not supplied).
      setGapicJWTValues(client) {
        client.defaultServicePath = this.defaultServicePath;
        client.useJWTAccessWithScope = this.useJWTAccessWithScope;
        client.defaultScopes = this.defaultScopes;
      }
      getProjectId(callback) {
        if (callback) {
          this.getProjectIdAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getProjectIdAsync();
        }
      }
      /**
       * A temporary method for internal `getProjectId` usages where `null` is
       * acceptable. In a future major release, `getProjectId` should return `null`
       * (as the `Promise<string | null>` base signature describes) and this private
       * method should be removed.
       *
       * @returns Promise that resolves with project id (or `null`)
       */
      async getProjectIdOptional() {
        try {
          return await this.getProjectId();
        } catch (e) {
          if (e instanceof Error && e.message === exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) {
            return null;
          } else {
            throw e;
          }
        }
      }
      /**
       * A private method for finding and caching a projectId.
       *
       * Supports environments in order of precedence:
       * - GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variable
       * - GOOGLE_APPLICATION_CREDENTIALS JSON file
       * - Cloud SDK: `gcloud config config-helper --format json`
       * - GCE project ID from metadata server
       *
       * @returns projectId
       */
      async findAndCacheProjectId() {
        let projectId = null;
        projectId || (projectId = await this.getProductionProjectId());
        projectId || (projectId = await this.getFileProjectId());
        projectId || (projectId = await this.getDefaultServiceProjectId());
        projectId || (projectId = await this.getGCEProjectId());
        projectId || (projectId = await this.getExternalAccountClientProjectId());
        if (projectId) {
          this._cachedProjectId = projectId;
          return projectId;
        } else {
          throw new Error(exports.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND);
        }
      }
      async getProjectIdAsync() {
        if (this._cachedProjectId) {
          return this._cachedProjectId;
        }
        if (!this._findProjectIdPromise) {
          this._findProjectIdPromise = this.findAndCacheProjectId();
        }
        return this._findProjectIdPromise;
      }
      /**
       * Retrieves a universe domain from the metadata server via
       * {@link gcpMetadata.universe}.
       *
       * @returns a universe domain
       */
      async getUniverseDomainFromMetadataServer() {
        var _a;
        let universeDomain;
        try {
          universeDomain = await gcpMetadata.universe("universe-domain");
          universeDomain || (universeDomain = authclient_1.DEFAULT_UNIVERSE);
        } catch (e) {
          if (e && ((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
            universeDomain = authclient_1.DEFAULT_UNIVERSE;
          } else {
            throw e;
          }
        }
        return universeDomain;
      }
      /**
       * Retrieves, caches, and returns the universe domain in the following order
       * of precedence:
       * - The universe domain in {@link GoogleAuth.clientOptions}
       * - An existing or ADC {@link AuthClient}'s universe domain
       * - {@link gcpMetadata.universe}, if {@link Compute} client
       *
       * @returns The universe domain
       */
      async getUniverseDomain() {
        let universeDomain = (0, util_1.originalOrCamelOptions)(this.clientOptions).get("universe_domain");
        try {
          universeDomain !== null && universeDomain !== void 0 ? universeDomain : universeDomain = (await this.getClient()).universeDomain;
        } catch (_a) {
          universeDomain !== null && universeDomain !== void 0 ? universeDomain : universeDomain = authclient_1.DEFAULT_UNIVERSE;
        }
        return universeDomain;
      }
      /**
       * @returns Any scopes (user-specified or default scopes specified by the
       *   client library) that need to be set on the current Auth client.
       */
      getAnyScopes() {
        return this.scopes || this.defaultScopes;
      }
      getApplicationDefault(optionsOrCallback = {}, callback) {
        let options2;
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.getApplicationDefaultAsync(options2).then((r) => callback(null, r.credential, r.projectId), callback);
        } else {
          return this.getApplicationDefaultAsync(options2);
        }
      }
      async getApplicationDefaultAsync(options2 = {}) {
        if (this.cachedCredential) {
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, this.cachedCredential, null);
        }
        let credential;
        credential = await this._tryGetApplicationCredentialsFromEnvironmentVariable(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, credential);
        }
        credential = await this._tryGetApplicationCredentialsFromWellKnownFile(options2);
        if (credential) {
          if (credential instanceof jwtclient_1.JWT) {
            credential.scopes = this.scopes;
          } else if (credential instanceof baseexternalclient_1.BaseExternalAccountClient) {
            credential.scopes = this.getAnyScopes();
          }
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, credential);
        }
        if (await this._checkIsGCE()) {
          options2.scopes = this.getAnyScopes();
          return await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, new computeclient_1.Compute(options2));
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_ADC_FOUND);
      }
      /**
       * Determines whether the auth layer is running on Google Compute Engine.
       * Checks for GCP Residency, then fallback to checking if metadata server
       * is available.
       *
       * @returns A promise that resolves with the boolean.
       * @api private
       */
      async _checkIsGCE() {
        if (this.checkIsGCE === void 0) {
          this.checkIsGCE = gcpMetadata.getGCPResidency() || await gcpMetadata.isAvailable();
        }
        return this.checkIsGCE;
      }
      /**
       * Attempts to load default credentials from the environment variable path..
       * @returns Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromEnvironmentVariable(options2) {
        const credentialsPath = process.env["GOOGLE_APPLICATION_CREDENTIALS"] || process.env["google_application_credentials"];
        if (!credentialsPath || credentialsPath.length === 0) {
          return null;
        }
        try {
          return this._getApplicationCredentialsFromFilePath(credentialsPath, options2);
        } catch (e) {
          if (e instanceof Error) {
            e.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${e.message}`;
          }
          throw e;
        }
      }
      /**
       * Attempts to load default credentials from a well-known file location
       * @return Promise that resolves with the OAuth2Client or null.
       * @api private
       */
      async _tryGetApplicationCredentialsFromWellKnownFile(options2) {
        let location = null;
        if (this._isWindows()) {
          location = process.env["APPDATA"];
        } else {
          const home = process.env["HOME"];
          if (home) {
            location = path.join(home, ".config");
          }
        }
        if (location) {
          location = path.join(location, "gcloud", "application_default_credentials.json");
          if (!fs.existsSync(location)) {
            location = null;
          }
        }
        if (!location) {
          return null;
        }
        const client = await this._getApplicationCredentialsFromFilePath(location, options2);
        return client;
      }
      /**
       * Attempts to load default credentials from a file at the given path..
       * @param filePath The path to the file to read.
       * @returns Promise that resolves with the OAuth2Client
       * @api private
       */
      async _getApplicationCredentialsFromFilePath(filePath, options2 = {}) {
        if (!filePath || filePath.length === 0) {
          throw new Error("The file path is invalid.");
        }
        try {
          filePath = fs.realpathSync(filePath);
          if (!fs.lstatSync(filePath).isFile()) {
            throw new Error();
          }
        } catch (err) {
          if (err instanceof Error) {
            err.message = `The file at ${filePath} does not exist, or it is not a file. ${err.message}`;
          }
          throw err;
        }
        const readStream = fs.createReadStream(filePath);
        return this.fromStream(readStream, options2);
      }
      /**
       * Create a credentials instance using a given impersonated input options.
       * @param json The impersonated input object.
       * @returns JWT or UserRefresh Client with data
       */
      fromImpersonatedJSON(json) {
        var _a, _b, _c, _d;
        if (!json) {
          throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
        }
        if (json.type !== impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          throw new Error(`The incoming JSON object does not have the "${impersonated_1.IMPERSONATED_ACCOUNT_TYPE}" type`);
        }
        if (!json.source_credentials) {
          throw new Error("The incoming JSON object does not contain a source_credentials field");
        }
        if (!json.service_account_impersonation_url) {
          throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
        }
        const sourceClient = this.fromJSON(json.source_credentials);
        if (((_a = json.service_account_impersonation_url) === null || _a === void 0 ? void 0 : _a.length) > 256) {
          throw new RangeError(`Target principal is too long: ${json.service_account_impersonation_url}`);
        }
        const targetPrincipal = (_c = (_b = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(json.service_account_impersonation_url)) === null || _b === void 0 ? void 0 : _b.groups) === null || _c === void 0 ? void 0 : _c.target;
        if (!targetPrincipal) {
          throw new RangeError(`Cannot extract target principal from ${json.service_account_impersonation_url}`);
        }
        const targetScopes = (_d = this.getAnyScopes()) !== null && _d !== void 0 ? _d : [];
        return new impersonated_1.Impersonated({
          ...json,
          sourceClient,
          targetPrincipal,
          targetScopes: Array.isArray(targetScopes) ? targetScopes : [targetScopes]
        });
      }
      /**
       * Create a credentials instance using the given input options.
       * This client is not cached.
       *
       * **Important**: If you accept a credential configuration (credential JSON/File/Stream) from an external source for authentication to Google Cloud, you must validate it before providing it to any Google API or library. Providing an unvalidated credential configuration to Google APIs can compromise the security of your systems and data. For more information, refer to {@link https://cloud.google.com/docs/authentication/external/externally-sourced-credentials Validate credential configurations from external sources}.
       *
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      fromJSON(json, options2 = {}) {
        let client;
        const preferredUniverseDomain = (0, util_1.originalOrCamelOptions)(options2).get("universe_domain");
        if (json.type === refreshclient_1.USER_REFRESH_ACCOUNT_TYPE) {
          client = new refreshclient_1.UserRefreshClient(options2);
          client.fromJSON(json);
        } else if (json.type === impersonated_1.IMPERSONATED_ACCOUNT_TYPE) {
          client = this.fromImpersonatedJSON(json);
        } else if (json.type === baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          client = externalclient_1.ExternalAccountClient.fromJSON(json, options2);
          client.scopes = this.getAnyScopes();
        } else if (json.type === externalAccountAuthorizedUserClient_1.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) {
          client = new externalAccountAuthorizedUserClient_1.ExternalAccountAuthorizedUserClient(json, options2);
        } else {
          options2.scopes = this.scopes;
          client = new jwtclient_1.JWT(options2);
          this.setGapicJWTValues(client);
          client.fromJSON(json);
        }
        if (preferredUniverseDomain) {
          client.universeDomain = preferredUniverseDomain;
        }
        return client;
      }
      /**
       * Return a JWT or UserRefreshClient from JavaScript object, caching both the
       * object used to instantiate and the client.
       * @param json The input object.
       * @param options The JWT or UserRefresh options for the client
       * @returns JWT or UserRefresh Client with data
       */
      _cacheClientFromJSON(json, options2) {
        const client = this.fromJSON(json, options2);
        this.jsonContent = json;
        this.cachedCredential = client;
        return client;
      }
      fromStream(inputStream, optionsOrCallback = {}, callback) {
        let options2 = {};
        if (typeof optionsOrCallback === "function") {
          callback = optionsOrCallback;
        } else {
          options2 = optionsOrCallback;
        }
        if (callback) {
          this.fromStreamAsync(inputStream, options2).then((r) => callback(null, r), callback);
        } else {
          return this.fromStreamAsync(inputStream, options2);
        }
      }
      fromStreamAsync(inputStream, options2) {
        return new Promise((resolve, reject) => {
          if (!inputStream) {
            throw new Error("Must pass in a stream containing the Google auth settings.");
          }
          const chunks = [];
          inputStream.setEncoding("utf8").on("error", reject).on("data", (chunk) => chunks.push(chunk)).on("end", () => {
            try {
              try {
                const data = JSON.parse(chunks.join(""));
                const r = this._cacheClientFromJSON(data, options2);
                return resolve(r);
              } catch (err) {
                if (!this.keyFilename)
                  throw err;
                const client = new jwtclient_1.JWT({
                  ...this.clientOptions,
                  keyFile: this.keyFilename
                });
                this.cachedCredential = client;
                this.setGapicJWTValues(client);
                return resolve(client);
              }
            } catch (err) {
              return reject(err);
            }
          });
        });
      }
      /**
       * Create a credentials instance using the given API key string.
       * The created client is not cached. In order to create and cache it use the {@link GoogleAuth.getClient `getClient`} method after first providing an {@link GoogleAuth.apiKey `apiKey`}.
       *
       * @param apiKey The API key string
       * @param options An optional options object.
       * @returns A JWT loaded from the key
       */
      fromAPIKey(apiKey, options2 = {}) {
        return new jwtclient_1.JWT({ ...options2, apiKey });
      }
      /**
       * Determines whether the current operating system is Windows.
       * @api private
       */
      _isWindows() {
        const sys = os.platform();
        if (sys && sys.length >= 3) {
          if (sys.substring(0, 3).toLowerCase() === "win") {
            return true;
          }
        }
        return false;
      }
      /**
       * Run the Google Cloud SDK command that prints the default project ID
       */
      async getDefaultServiceProjectId() {
        return new Promise((resolve) => {
          (0, child_process_1.exec)("gcloud config config-helper --format json", (err, stdout) => {
            if (!err && stdout) {
              try {
                const projectId = JSON.parse(stdout).configuration.properties.core.project;
                resolve(projectId);
                return;
              } catch (e) {
              }
            }
            resolve(null);
          });
        });
      }
      /**
       * Loads the project id from environment variables.
       * @api private
       */
      getProductionProjectId() {
        return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || process.env["gcloud_project"] || process.env["google_cloud_project"];
      }
      /**
       * Loads the project id from the GOOGLE_APPLICATION_CREDENTIALS json file.
       * @api private
       */
      async getFileProjectId() {
        if (this.cachedCredential) {
          return this.cachedCredential.projectId;
        }
        if (this.keyFilename) {
          const creds = await this.getClient();
          if (creds && creds.projectId) {
            return creds.projectId;
          }
        }
        const r = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
        if (r) {
          return r.projectId;
        } else {
          return null;
        }
      }
      /**
       * Gets the project ID from external account client if available.
       */
      async getExternalAccountClientProjectId() {
        if (!this.jsonContent || this.jsonContent.type !== baseexternalclient_1.EXTERNAL_ACCOUNT_TYPE) {
          return null;
        }
        const creds = await this.getClient();
        return await creds.getProjectId();
      }
      /**
       * Gets the Compute Engine project ID if it can be inferred.
       */
      async getGCEProjectId() {
        try {
          const r = await gcpMetadata.project("project-id");
          return r;
        } catch (e) {
          return null;
        }
      }
      getCredentials(callback) {
        if (callback) {
          this.getCredentialsAsync().then((r) => callback(null, r), callback);
        } else {
          return this.getCredentialsAsync();
        }
      }
      async getCredentialsAsync() {
        const client = await this.getClient();
        if (client instanceof impersonated_1.Impersonated) {
          return { client_email: client.getTargetPrincipal() };
        }
        if (client instanceof baseexternalclient_1.BaseExternalAccountClient) {
          const serviceAccountEmail = client.getServiceAccountEmail();
          if (serviceAccountEmail) {
            return {
              client_email: serviceAccountEmail,
              universe_domain: client.universeDomain
            };
          }
        }
        if (this.jsonContent) {
          return {
            client_email: this.jsonContent.client_email,
            private_key: this.jsonContent.private_key,
            universe_domain: this.jsonContent.universe_domain
          };
        }
        if (await this._checkIsGCE()) {
          const [client_email, universe_domain] = await Promise.all([
            gcpMetadata.instance("service-accounts/default/email"),
            this.getUniverseDomain()
          ]);
          return { client_email, universe_domain };
        }
        throw new Error(exports.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND);
      }
      /**
       * Automatically obtain an {@link AuthClient `AuthClient`} based on the
       * provided configuration. If no options were passed, use Application
       * Default Credentials.
       */
      async getClient() {
        if (this.cachedCredential) {
          return this.cachedCredential;
        }
        __classPrivateFieldSet(this, _GoogleAuth_pendingAuthClient, __classPrivateFieldGet(this, _GoogleAuth_pendingAuthClient, "f") || __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_determineClient).call(this), "f");
        try {
          return await __classPrivateFieldGet(this, _GoogleAuth_pendingAuthClient, "f");
        } finally {
          __classPrivateFieldSet(this, _GoogleAuth_pendingAuthClient, null, "f");
        }
      }
      /**
       * Creates a client which will fetch an ID token for authorization.
       * @param targetAudience the audience for the fetched ID token.
       * @returns IdTokenClient for making HTTP calls authenticated with ID tokens.
       */
      async getIdTokenClient(targetAudience) {
        const client = await this.getClient();
        if (!("fetchIdToken" in client)) {
          throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
        }
        return new idtokenclient_1.IdTokenClient({ targetAudience, idTokenProvider: client });
      }
      /**
       * Automatically obtain application default credentials, and return
       * an access token for making requests.
       */
      async getAccessToken() {
        const client = await this.getClient();
        return (await client.getAccessToken()).token;
      }
      /**
       * Obtain the HTTP headers that will provide authorization for a given
       * request.
       */
      async getRequestHeaders(url) {
        const client = await this.getClient();
        return client.getRequestHeaders(url);
      }
      /**
       * Obtain credentials for a request, then attach the appropriate headers to
       * the request options.
       * @param opts Axios or Request options on which to attach the headers
       */
      async authorizeRequest(opts) {
        opts = opts || {};
        const url = opts.url || opts.uri;
        const client = await this.getClient();
        const headers = await client.getRequestHeaders(url);
        opts.headers = Object.assign(opts.headers || {}, headers);
        return opts;
      }
      /**
       * Automatically obtain application default credentials, and make an
       * HTTP request using the given options.
       * @param opts Axios request options for the HTTP request.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async request(opts) {
        const client = await this.getClient();
        return client.request(opts);
      }
      /**
       * Determine the compute environment in which the code is running.
       */
      getEnv() {
        return (0, envDetect_1.getEnv)();
      }
      /**
       * Sign the given data with the current private key, or go out
       * to the IAM API to sign it.
       * @param data The data to be signed.
       * @param endpoint A custom endpoint to use.
       *
       * @example
       * ```
       * sign('data', 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/');
       * ```
       */
      async sign(data, endpoint) {
        const client = await this.getClient();
        const universe = await this.getUniverseDomain();
        endpoint = endpoint || `https://iamcredentials.${universe}/v1/projects/-/serviceAccounts/`;
        if (client instanceof impersonated_1.Impersonated) {
          const signed = await client.sign(data);
          return signed.signedBlob;
        }
        const crypto2 = (0, crypto_1.createCrypto)();
        if (client instanceof jwtclient_1.JWT && client.key) {
          const sign = await crypto2.sign(client.key, data);
          return sign;
        }
        const creds = await this.getCredentials();
        if (!creds.client_email) {
          throw new Error("Cannot sign data without `client_email`.");
        }
        return this.signBlob(crypto2, creds.client_email, data, endpoint);
      }
      async signBlob(crypto2, emailOrUniqueId, data, endpoint) {
        const url = new URL(endpoint + `${emailOrUniqueId}:signBlob`);
        const res = await this.request({
          method: "POST",
          url: url.href,
          data: {
            payload: crypto2.encodeBase64StringUtf8(data)
          },
          retry: true,
          retryConfig: {
            httpMethodsToRetry: ["POST"]
          }
        });
        return res.data.signedBlob;
      }
    }
    exports.GoogleAuth = GoogleAuth;
    _GoogleAuth_pendingAuthClient = /* @__PURE__ */ new WeakMap(), _GoogleAuth_instances = /* @__PURE__ */ new WeakSet(), _GoogleAuth_prepareAndCacheClient = async function _GoogleAuth_prepareAndCacheClient2(credential, quotaProjectIdOverride = process.env["GOOGLE_CLOUD_QUOTA_PROJECT"] || null) {
      const projectId = await this.getProjectIdOptional();
      if (quotaProjectIdOverride) {
        credential.quotaProjectId = quotaProjectIdOverride;
      }
      this.cachedCredential = credential;
      return { credential, projectId };
    }, _GoogleAuth_determineClient = async function _GoogleAuth_determineClient2() {
      if (this.jsonContent) {
        return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
      } else if (this.keyFilename) {
        const filePath = path.resolve(this.keyFilename);
        const stream = fs.createReadStream(filePath);
        return await this.fromStreamAsync(stream, this.clientOptions);
      } else if (this.apiKey) {
        const client = await this.fromAPIKey(this.apiKey, this.clientOptions);
        client.scopes = this.scopes;
        const { credential } = await __classPrivateFieldGet(this, _GoogleAuth_instances, "m", _GoogleAuth_prepareAndCacheClient).call(this, client);
        return credential;
      } else {
        const { credential } = await this.getApplicationDefaultAsync(this.clientOptions);
        return credential;
      }
    };
    GoogleAuth.DefaultTransporter = transporters_1.DefaultTransporter;
  })(googleauth);
  return googleauth;
}
var iam = {};
var hasRequiredIam;
function requireIam() {
  if (hasRequiredIam) return iam;
  hasRequiredIam = 1;
  Object.defineProperty(iam, "__esModule", { value: true });
  iam.IAMAuth = void 0;
  class IAMAuth {
    /**
     * IAM credentials.
     *
     * @param selector the iam authority selector
     * @param token the token
     * @constructor
     */
    constructor(selector, token) {
      this.selector = selector;
      this.token = token;
      this.selector = selector;
      this.token = token;
    }
    /**
     * Acquire the HTTP headers required to make an authenticated request.
     */
    getRequestHeaders() {
      return {
        "x-goog-iam-authority-selector": this.selector,
        "x-goog-iam-authorization-token": this.token
      };
    }
  }
  iam.IAMAuth = IAMAuth;
  return iam;
}
var downscopedclient = {};
var hasRequiredDownscopedclient;
function requireDownscopedclient() {
  if (hasRequiredDownscopedclient) return downscopedclient;
  hasRequiredDownscopedclient = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DownscopedClient = exports.EXPIRATION_TIME_OFFSET = exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
    const stream = require$$0$5;
    const authclient_1 = requireAuthclient();
    const sts = requireStscredentials();
    const STS_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:token-exchange";
    const STS_REQUEST_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    const STS_SUBJECT_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:access_token";
    exports.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
    exports.EXPIRATION_TIME_OFFSET = 5 * 60 * 1e3;
    class DownscopedClient extends authclient_1.AuthClient {
      /**
       * Instantiates a downscoped client object using the provided source
       * AuthClient and credential access boundary rules.
       * To downscope permissions of a source AuthClient, a Credential Access
       * Boundary that specifies which resources the new credential can access, as
       * well as an upper bound on the permissions that are available on each
       * resource, has to be defined. A downscoped client can then be instantiated
       * using the source AuthClient and the Credential Access Boundary.
       * @param authClient The source AuthClient to be downscoped based on the
       *   provided Credential Access Boundary rules.
       * @param credentialAccessBoundary The Credential Access Boundary which
       *   contains a list of access boundary rules. Each rule contains information
       *   on the resource that the rule applies to, the upper bound of the
       *   permissions that are available on that resource and an optional
       *   condition to further restrict permissions.
       * @param additionalOptions **DEPRECATED, set this in the provided `authClient`.**
       *   Optional additional behavior customization options.
       * @param quotaProjectId **DEPRECATED, set this in the provided `authClient`.**
       *   Optional quota project id for setting up in the x-goog-user-project header.
       */
      constructor(authClient, credentialAccessBoundary, additionalOptions, quotaProjectId) {
        super({ ...additionalOptions, quotaProjectId });
        this.authClient = authClient;
        this.credentialAccessBoundary = credentialAccessBoundary;
        if (credentialAccessBoundary.accessBoundary.accessBoundaryRules.length === 0) {
          throw new Error("At least one access boundary rule needs to be defined.");
        } else if (credentialAccessBoundary.accessBoundary.accessBoundaryRules.length > exports.MAX_ACCESS_BOUNDARY_RULES_COUNT) {
          throw new Error(`The provided access boundary has more than ${exports.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
        }
        for (const rule of credentialAccessBoundary.accessBoundary.accessBoundaryRules) {
          if (rule.availablePermissions.length === 0) {
            throw new Error("At least one permission should be defined in access boundary rules.");
          }
        }
        this.stsCredential = new sts.StsCredentials(`https://sts.${this.universeDomain}/v1/token`);
        this.cachedDownscopedAccessToken = null;
      }
      /**
       * Provides a mechanism to inject Downscoped access tokens directly.
       * The expiry_date field is required to facilitate determination of the token
       * expiration which would make it easier for the token consumer to handle.
       * @param credentials The Credentials object to set on the current client.
       */
      setCredentials(credentials) {
        if (!credentials.expiry_date) {
          throw new Error("The access token expiry_date field is missing in the provided credentials.");
        }
        super.setCredentials(credentials);
        this.cachedDownscopedAccessToken = credentials;
      }
      async getAccessToken() {
        if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) {
          await this.refreshAccessTokenAsync();
        }
        return {
          token: this.cachedDownscopedAccessToken.access_token,
          expirationTime: this.cachedDownscopedAccessToken.expiry_date,
          res: this.cachedDownscopedAccessToken.res
        };
      }
      /**
       * The main authentication interface. It takes an optional url which when
       * present is the endpoint being accessed, and returns a Promise which
       * resolves with authorization header fields.
       *
       * The result has the form:
       * { Authorization: 'Bearer <access_token_value>' }
       */
      async getRequestHeaders() {
        const accessTokenResponse = await this.getAccessToken();
        const headers = {
          Authorization: `Bearer ${accessTokenResponse.token}`
        };
        return this.addSharedMetadataHeaders(headers);
      }
      request(opts, callback) {
        if (callback) {
          this.requestAsync(opts).then((r) => callback(null, r), (e) => {
            return callback(e, e.response);
          });
        } else {
          return this.requestAsync(opts);
        }
      }
      /**
       * Authenticates the provided HTTP request, processes it and resolves with the
       * returned response.
       * @param opts The HTTP request options.
       * @param reAuthRetried Whether the current attempt is a retry after a failed attempt due to an auth failure
       * @return A promise that resolves with the successful response.
       */
      async requestAsync(opts, reAuthRetried = false) {
        let response;
        try {
          const requestHeaders = await this.getRequestHeaders();
          opts.headers = opts.headers || {};
          if (requestHeaders && requestHeaders["x-goog-user-project"]) {
            opts.headers["x-goog-user-project"] = requestHeaders["x-goog-user-project"];
          }
          if (requestHeaders && requestHeaders.Authorization) {
            opts.headers.Authorization = requestHeaders.Authorization;
          }
          response = await this.transporter.request(opts);
        } catch (e) {
          const res = e.response;
          if (res) {
            const statusCode = res.status;
            const isReadableStream = res.config.data instanceof stream.Readable;
            const isAuthErr = statusCode === 401 || statusCode === 403;
            if (!reAuthRetried && isAuthErr && !isReadableStream && this.forceRefreshOnFailure) {
              await this.refreshAccessTokenAsync();
              return await this.requestAsync(opts, true);
            }
          }
          throw e;
        }
        return response;
      }
      /**
       * Forces token refresh, even if unexpired tokens are currently cached.
       * GCP access tokens are retrieved from authclient object/source credential.
       * Then GCP access tokens are exchanged for downscoped access tokens via the
       * token exchange endpoint.
       * @return A promise that resolves with the fresh downscoped access token.
       */
      async refreshAccessTokenAsync() {
        var _a;
        const subjectToken = (await this.authClient.getAccessToken()).token;
        const stsCredentialsOptions = {
          grantType: STS_GRANT_TYPE,
          requestedTokenType: STS_REQUEST_TOKEN_TYPE,
          subjectToken,
          subjectTokenType: STS_SUBJECT_TOKEN_TYPE
        };
        const stsResponse = await this.stsCredential.exchangeToken(stsCredentialsOptions, void 0, this.credentialAccessBoundary);
        const sourceCredExpireDate = ((_a = this.authClient.credentials) === null || _a === void 0 ? void 0 : _a.expiry_date) || null;
        const expiryDate = stsResponse.expires_in ? (/* @__PURE__ */ new Date()).getTime() + stsResponse.expires_in * 1e3 : sourceCredExpireDate;
        this.cachedDownscopedAccessToken = {
          access_token: stsResponse.access_token,
          expiry_date: expiryDate,
          res: stsResponse.res
        };
        this.credentials = {};
        Object.assign(this.credentials, this.cachedDownscopedAccessToken);
        delete this.credentials.res;
        this.emit("tokens", {
          refresh_token: null,
          expiry_date: this.cachedDownscopedAccessToken.expiry_date,
          access_token: this.cachedDownscopedAccessToken.access_token,
          token_type: "Bearer",
          id_token: null
        });
        return this.cachedDownscopedAccessToken;
      }
      /**
       * Returns whether the provided credentials are expired or not.
       * If there is no expiry time, assumes the token is not expired or expiring.
       * @param downscopedAccessToken The credentials to check for expiration.
       * @return Whether the credentials are expired or not.
       */
      isExpired(downscopedAccessToken) {
        const now = (/* @__PURE__ */ new Date()).getTime();
        return downscopedAccessToken.expiry_date ? now >= downscopedAccessToken.expiry_date - this.eagerRefreshThresholdMillis : false;
      }
    }
    exports.DownscopedClient = DownscopedClient;
  })(downscopedclient);
  return downscopedclient;
}
var passthrough = {};
var hasRequiredPassthrough;
function requirePassthrough() {
  if (hasRequiredPassthrough) return passthrough;
  hasRequiredPassthrough = 1;
  Object.defineProperty(passthrough, "__esModule", { value: true });
  passthrough.PassThroughClient = void 0;
  const authclient_1 = requireAuthclient();
  class PassThroughClient extends authclient_1.AuthClient {
    /**
     * Creates a request without any authentication headers or checks.
     *
     * @remarks
     *
     * In testing environments it may be useful to change the provided
     * {@link AuthClient.transporter} for any desired request overrides/handling.
     *
     * @param opts
     * @returns The response of the request.
     */
    async request(opts) {
      return this.transporter.request(opts);
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getAccessToken() {
      return {};
    }
    /**
     * A required method of the base class.
     * Always will return an empty object.
     *
     * @returns {}
     */
    async getRequestHeaders() {
      return {};
    }
  }
  passthrough.PassThroughClient = PassThroughClient;
  const a = new PassThroughClient();
  a.getAccessToken();
  return passthrough;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GoogleAuth = exports.auth = exports.DefaultTransporter = exports.PassThroughClient = exports.ExecutableError = exports.PluggableAuthClient = exports.DownscopedClient = exports.BaseExternalAccountClient = exports.ExternalAccountClient = exports.IdentityPoolClient = exports.AwsRequestSigner = exports.AwsClient = exports.UserRefreshClient = exports.LoginTicket = exports.ClientAuthentication = exports.OAuth2Client = exports.CodeChallengeMethod = exports.Impersonated = exports.JWT = exports.JWTAccess = exports.IdTokenClient = exports.IAMAuth = exports.GCPEnv = exports.Compute = exports.DEFAULT_UNIVERSE = exports.AuthClient = exports.gaxios = exports.gcpMetadata = void 0;
    const googleauth_1 = requireGoogleauth();
    Object.defineProperty(exports, "GoogleAuth", { enumerable: true, get: function() {
      return googleauth_1.GoogleAuth;
    } });
    exports.gcpMetadata = requireSrc$9();
    exports.gaxios = requireSrc$8();
    var authclient_1 = requireAuthclient();
    Object.defineProperty(exports, "AuthClient", { enumerable: true, get: function() {
      return authclient_1.AuthClient;
    } });
    Object.defineProperty(exports, "DEFAULT_UNIVERSE", { enumerable: true, get: function() {
      return authclient_1.DEFAULT_UNIVERSE;
    } });
    var computeclient_1 = requireComputeclient();
    Object.defineProperty(exports, "Compute", { enumerable: true, get: function() {
      return computeclient_1.Compute;
    } });
    var envDetect_1 = requireEnvDetect();
    Object.defineProperty(exports, "GCPEnv", { enumerable: true, get: function() {
      return envDetect_1.GCPEnv;
    } });
    var iam_1 = requireIam();
    Object.defineProperty(exports, "IAMAuth", { enumerable: true, get: function() {
      return iam_1.IAMAuth;
    } });
    var idtokenclient_1 = requireIdtokenclient();
    Object.defineProperty(exports, "IdTokenClient", { enumerable: true, get: function() {
      return idtokenclient_1.IdTokenClient;
    } });
    var jwtaccess_1 = requireJwtaccess();
    Object.defineProperty(exports, "JWTAccess", { enumerable: true, get: function() {
      return jwtaccess_1.JWTAccess;
    } });
    var jwtclient_1 = requireJwtclient();
    Object.defineProperty(exports, "JWT", { enumerable: true, get: function() {
      return jwtclient_1.JWT;
    } });
    var impersonated_1 = requireImpersonated();
    Object.defineProperty(exports, "Impersonated", { enumerable: true, get: function() {
      return impersonated_1.Impersonated;
    } });
    var oauth2client_1 = requireOauth2client();
    Object.defineProperty(exports, "CodeChallengeMethod", { enumerable: true, get: function() {
      return oauth2client_1.CodeChallengeMethod;
    } });
    Object.defineProperty(exports, "OAuth2Client", { enumerable: true, get: function() {
      return oauth2client_1.OAuth2Client;
    } });
    Object.defineProperty(exports, "ClientAuthentication", { enumerable: true, get: function() {
      return oauth2client_1.ClientAuthentication;
    } });
    var loginticket_1 = requireLoginticket();
    Object.defineProperty(exports, "LoginTicket", { enumerable: true, get: function() {
      return loginticket_1.LoginTicket;
    } });
    var refreshclient_1 = requireRefreshclient();
    Object.defineProperty(exports, "UserRefreshClient", { enumerable: true, get: function() {
      return refreshclient_1.UserRefreshClient;
    } });
    var awsclient_1 = requireAwsclient();
    Object.defineProperty(exports, "AwsClient", { enumerable: true, get: function() {
      return awsclient_1.AwsClient;
    } });
    var awsrequestsigner_1 = requireAwsrequestsigner();
    Object.defineProperty(exports, "AwsRequestSigner", { enumerable: true, get: function() {
      return awsrequestsigner_1.AwsRequestSigner;
    } });
    var identitypoolclient_1 = requireIdentitypoolclient();
    Object.defineProperty(exports, "IdentityPoolClient", { enumerable: true, get: function() {
      return identitypoolclient_1.IdentityPoolClient;
    } });
    var externalclient_1 = requireExternalclient();
    Object.defineProperty(exports, "ExternalAccountClient", { enumerable: true, get: function() {
      return externalclient_1.ExternalAccountClient;
    } });
    var baseexternalclient_1 = requireBaseexternalclient();
    Object.defineProperty(exports, "BaseExternalAccountClient", { enumerable: true, get: function() {
      return baseexternalclient_1.BaseExternalAccountClient;
    } });
    var downscopedclient_1 = requireDownscopedclient();
    Object.defineProperty(exports, "DownscopedClient", { enumerable: true, get: function() {
      return downscopedclient_1.DownscopedClient;
    } });
    var pluggable_auth_client_1 = requirePluggableAuthClient();
    Object.defineProperty(exports, "PluggableAuthClient", { enumerable: true, get: function() {
      return pluggable_auth_client_1.PluggableAuthClient;
    } });
    Object.defineProperty(exports, "ExecutableError", { enumerable: true, get: function() {
      return pluggable_auth_client_1.ExecutableError;
    } });
    var passthrough_1 = requirePassthrough();
    Object.defineProperty(exports, "PassThroughClient", { enumerable: true, get: function() {
      return passthrough_1.PassThroughClient;
    } });
    var transporters_1 = requireTransporters();
    Object.defineProperty(exports, "DefaultTransporter", { enumerable: true, get: function() {
      return transporters_1.DefaultTransporter;
    } });
    const auth = new googleauth_1.GoogleAuth();
    exports.auth = auth;
  })(src);
  return src;
}
export {
  requireSrc$1 as a,
  requireSrc as b,
  requireSrc$2 as r
};
