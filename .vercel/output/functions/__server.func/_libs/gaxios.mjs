import require$$1 from "https";
import { r as requireExtend } from "./extend.mjs";
import require$$0$4 from "stream";
import { r as require$$0$5 } from "./node-fetch.mjs";
import require$$1$1 from "querystring";
import { r as requireIsStream } from "./is-stream.mjs";
import Url from "url";
import { r as requireDist$1 } from "./uuid.mjs";
import { r as requireDist } from "./https-proxy-agent.mjs";
var src$3 = {};
var gaxios$3 = {};
var common$3 = {};
const name$3 = "gaxios";
const version$3 = "7.1.5";
const description$3 = "A simple common HTTP client specifically for Google APIs and services.";
const main$3 = "build/cjs/src/index.js";
const types$3 = "build/cjs/src/index.d.ts";
const files$3 = ["build/"];
const exports$3 = { ".": { "import": { "types": "./build/esm/src/index.d.ts", "default": "./build/esm/src/index.js" }, "require": { "types": "./build/cjs/src/index.d.ts", "default": "./build/cjs/src/index.js" } } };
const scripts$3 = { "lint": "gts check --no-inline-config", "test": "c8 mocha build/esm/test", "presystem-test": "npm run compile", "system-test": "mocha build/esm/system-test --timeout 80000", "compile": "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs", "fix": "gts fix", "prepare": "npm run compile", "pretest": "npm run compile", "webpack": "webpack", "prebrowser-test": "npm run compile", "browser-test": "node build/browser-test/browser-test-runner.js", "docs": "jsdoc -c .jsdoc.js", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "prelint": "cd samples; npm link ../; npm install", "clean": "gts clean" };
const repository$3 = { "type": "git", "directory": "packages/gaxios", "url": "https://github.com/googleapis/google-cloud-node-core.git" };
const keywords$3 = ["google"];
const engines$3 = { "node": ">=18" };
const author$3 = "Google, LLC";
const license$3 = "Apache-2.0";
const devDependencies$3 = { "@babel/plugin-proposal-private-methods": "^7.18.6", "@types/cors": "^2.8.6", "@types/express": "^5.0.0", "@types/extend": "^3.0.1", "@types/mocha": "^10.0.10", "@types/multiparty": "4.2.1", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.8", "@types/node": "^24.0.0", "@types/sinon": "^21.0.0", "@types/tmp": "^0.2.6", "assert": "^2.0.0", "browserify": "^17.0.0", "c8": "^10.1.3", "cors": "^2.8.5", "express": "^5.0.0", "gts": "^6.0.2", "is-docker": "^3.0.0", "jsdoc": "^4.0.4", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-remap-coverage": "^0.1.5", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "^5.0.1", "mocha": "^11.1.0", "multiparty": "^4.2.1", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "14.0.5", "null-loader": "^4.0.1", "pack-n-play": "^4.0.0", "puppeteer": "^24.0.0", "sinon": "21.0.3", "stream-browserify": "^3.0.0", "tmp": "0.2.6", "ts-loader": "^9.5.2", "typescript": "5.8.3", "undici-types": "^7.24.1", "webpack": "^5.97.1", "webpack-cli": "^6.0.1" };
const dependencies$3 = { "extend": "^3.0.2", "https-proxy-agent": "^7.0.1", "node-fetch": "^3.3.2" };
const homepage$2 = "https://github.com/googleapis/google-cloud-node-core/tree/main/packages/gaxios";
const require$$0$3 = {
  name: name$3,
  version: version$3,
  description: description$3,
  main: main$3,
  types: types$3,
  files: files$3,
  exports: exports$3,
  scripts: scripts$3,
  repository: repository$3,
  keywords: keywords$3,
  engines: engines$3,
  author: author$3,
  license: license$3,
  devDependencies: devDependencies$3,
  dependencies: dependencies$3,
  homepage: homepage$2
};
var util$3;
var hasRequiredUtil$3;
function requireUtil$3() {
  if (hasRequiredUtil$3) return util$3;
  hasRequiredUtil$3 = 1;
  const pkg = require$$0$3;
  util$3 = { pkg };
  return util$3;
}
var hasRequiredCommon$3;
function requireCommon$3() {
  if (hasRequiredCommon$3) return common$3;
  hasRequiredCommon$3 = 1;
  (function(exports) {
    var __importDefault = common$3 && common$3.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    const extend_1 = __importDefault(requireExtend());
    const util_cjs_1 = __importDefault(requireUtil$3());
    const pkg = util_cjs_1.default.pkg;
    exports.GAXIOS_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for(`${pkg.name}-gaxios-error`);
    class GaxiosError extends Error {
      config;
      response;
      /**
       * An error code.
       * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
       *
       * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
       *
       * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @example
       * 'ECONNRESET'
       *
       * @example
       * 'TimeoutError'
       *
       * @example
       * 500
       */
      code;
      /**
       * An HTTP Status code.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
       *
       * @example
       * 500
       */
      status;
      /**
       * @deprecated use {@link GaxiosError.cause} instead.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
       *
       * @privateRemarks
       *
       * We will want to remove this property later as the modern `cause` property is better suited
       * for displaying and relaying nested errors. Keeping this here makes the resulting
       * error log larger than it needs to be.
       *
       */
      error;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[Symbol.hasInstance]}
       * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
       * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
       */
      [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(GaxiosError, instance);
      }
      constructor(message, config, response, cause) {
        super(message, { cause });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : void 0;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(
              this.config.responseType,
              // workaround for `node-fetch`'s `.data` deprecation...
              this.response?.bodyUsed ? this.response?.data : void 0
            );
          } catch {
          }
          this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
          this.code = cause.name;
        } else if (cause && typeof cause === "object" && "code" in cause && (typeof cause.code === "string" || typeof cause.code === "number")) {
          this.code = cause.code;
        }
      }
      /**
       * An AIP-193 conforming error extractor.
       *
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @internal
       * @expiremental
       *
       * @param res the response object
       * @returns the extracted error information
       */
      static extractAPIErrorFromResponse(res, defaultErrorMessage = "The request failed") {
        let message = defaultErrorMessage;
        if (typeof res.data === "string") {
          message = res.data;
        }
        if (res.data && typeof res.data === "object" && "error" in res.data && res.data.error && !res.ok) {
          if (typeof res.data.error === "string") {
            return {
              message: res.data.error,
              code: res.status,
              status: res.statusText
            };
          }
          if (typeof res.data.error === "object") {
            message = "message" in res.data.error && typeof res.data.error.message === "string" ? res.data.error.message : message;
            const status = "status" in res.data.error && typeof res.data.error.status === "string" ? res.data.error.status : res.statusText;
            const code = "code" in res.data.error && typeof res.data.error.code === "number" ? res.data.error.code : res.status;
            if ("errors" in res.data.error && Array.isArray(res.data.error.errors)) {
              const errorMessages = [];
              for (const e of res.data.error.errors) {
                if (typeof e === "object" && "message" in e && typeof e.message === "string") {
                  errorMessages.push(e.message);
                }
              }
              return Object.assign({
                message: errorMessages.join("\n") || message,
                code,
                status
              }, res.data.error);
            }
            return Object.assign({
              message,
              code,
              status
            }, res.data.error);
          }
        }
        return {
          message,
          code: res.status,
          status: res.statusText
        };
      }
    }
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        headers.forEach((_, key) => {
          if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key))
            headers.set(key, REDACT);
        });
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || // support `node-fetch` FormData/URLSearchParams
        "forEach" in obj && "set" in obj) {
          obj.forEach((_, key) => {
            if (["grant_type", "assertion"].includes(key) || /secret/.test(key)) {
              obj.set(key, REDACT);
            }
          });
        } else {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        if (data.config.url.searchParams.has("token")) {
          data.config.url.searchParams.set("token", REDACT);
        }
        if (data.config.url.searchParams.has("client_secret")) {
          data.config.url.searchParams.set("client_secret", REDACT);
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        if (data.response.bodyUsed) {
          redactString(data.response, "data");
          redactObject(data.response.data);
        }
      }
      return data;
    }
  })(common$3);
  return common$3;
}
var retry$3 = {};
var hasRequiredRetry$3;
function requireRetry$3() {
  if (hasRequiredRetry$3) return retry$3;
  hasRequiredRetry$3 = 1;
  Object.defineProperty(retry$3, "__esModule", { value: true });
  retry$3.getRetryConfig = getRetryConfig;
  async function getRetryConfig(err) {
    let config = getConfig(err);
    if (!err || !err.config || !config && !err.config.retry) {
      return { shouldRetry: false };
    }
    config = config || {};
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
    config.httpMethodsToRetry = config.httpMethodsToRetry || [
      "GET",
      "HEAD",
      "PUT",
      "OPTIONS",
      "DELETE"
    ];
    config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
    config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
    config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
    config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
    config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    const retryRanges = [
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      // 1xx - Retry (Informational, request still processing)
      // 2xx - Do not retry (Success)
      // 3xx - Do not retry (Redirect)
      // 4xx - Do not retry (Client errors)
      // 408 - Retry ("Request Timeout")
      // 429 - Retry ("Too Many Requests")
      // 5xx - Retry (Server errors)
      [100, 199],
      [408, 408],
      [429, 429],
      [500, 599]
    ];
    config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
    err.config.retryConfig = config;
    const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
    if (!await shouldRetryFn(err)) {
      return { shouldRetry: false, config: err.config };
    }
    const delay = getNextRetryDelay(config);
    err.config.retryConfig.currentRetryAttempt += 1;
    const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (config.onRetryAttempt) {
      await config.onRetryAttempt(err);
    }
    await backoff;
    return { shouldRetry: true, config: err.config };
  }
  function shouldRetryRequest(err) {
    const config = getConfig(err);
    if (err.config.signal?.aborted && err.code !== "TimeoutError" || err.code === "AbortError") {
      return false;
    }
    if (!config || config.retry === 0) {
      return false;
    }
    if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
      return false;
    }
    if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || "GET")) {
      return false;
    }
    if (err.response && err.response.status) {
      let isInRange = false;
      for (const [min, max] of config.statusCodesToRetry) {
        const status = err.response.status;
        if (status >= min && status <= max) {
          isInRange = true;
          break;
        }
      }
      if (!isInRange) {
        return false;
      }
    }
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    if (config.currentRetryAttempt >= config.retry) {
      return false;
    }
    return true;
  }
  function getConfig(err) {
    if (err && err.config && err.config.retryConfig) {
      return err.config.retryConfig;
    }
    return;
  }
  function getNextRetryDelay(config) {
    const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
    const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
    const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
    return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
  }
  return retry$3;
}
var interceptor$3 = {};
var hasRequiredInterceptor$3;
function requireInterceptor$3() {
  if (hasRequiredInterceptor$3) return interceptor$3;
  hasRequiredInterceptor$3 = 1;
  Object.defineProperty(interceptor$3, "__esModule", { value: true });
  interceptor$3.GaxiosInterceptorManager = void 0;
  class GaxiosInterceptorManager extends Set {
  }
  interceptor$3.GaxiosInterceptorManager = GaxiosInterceptorManager;
  return interceptor$3;
}
var hasRequiredGaxios$3;
function requireGaxios$3() {
  if (hasRequiredGaxios$3) return gaxios$3;
  hasRequiredGaxios$3 = 1;
  var __importDefault = gaxios$3 && gaxios$3.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _a;
  Object.defineProperty(gaxios$3, "__esModule", { value: true });
  gaxios$3.Gaxios = void 0;
  const extend_1 = __importDefault(requireExtend());
  const https_1 = require$$1;
  const common_js_1 = requireCommon$3();
  const retry_js_1 = requireRetry$3();
  const stream_1 = require$$0$4;
  const interceptor_js_1 = requireInterceptor$3();
  const randomUUID = async () => globalThis.crypto?.randomUUID() || (await import("crypto")).randomUUID();
  const HTTP_STATUS_NO_CONTENT = 204;
  class Gaxios {
    agentCache = /* @__PURE__ */ new Map();
    /**
     * Default HTTP options that will be used for every HTTP request.
     */
    defaults;
    /**
     * Interceptors
     */
    interceptors;
    /**
     * The Gaxios class is responsible for making HTTP requests.
     * @param defaults The default set of options to be used for this instance.
     */
    constructor(defaults) {
      this.defaults = defaults || {};
      this.interceptors = {
        request: new interceptor_js_1.GaxiosInterceptorManager(),
        response: new interceptor_js_1.GaxiosInterceptorManager()
      };
    }
    /**
     * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
     *
     * @remarks
     *
     * This is useful as a drop-in replacement for `fetch` API usage.
     *
     * @example
     *
     * ```ts
     * const gaxios = new Gaxios();
     * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
     * await myFetch('https://example.com');
     * ```
     *
     * @param args `fetch` API or `Gaxios#request` parameters
     * @returns the {@link Response} with Gaxios-added properties
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
        _a.mergeHeaders(headers, input.headers);
      }
      if (init) {
        _a.mergeHeaders(headers, new Headers(init.headers));
      }
      if (typeof input === "object" && !(input instanceof URL)) {
        return this.request({ ...init, ...input, headers, url });
      } else {
        return this.request({ ...init, headers, url });
      }
    }
    /**
     * Perform an HTTP request with the given options.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async request(opts = {}) {
      let prepared = await this.#prepareRequest(opts);
      prepared = await this.#applyRequestInterceptors(prepared);
      return this.#applyResponseInterceptors(this._request(prepared));
    }
    async _defaultAdapter(config) {
      const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
      const preparedOpts = { ...config };
      delete preparedOpts.data;
      const res = await fetchImpl(config.url, preparedOpts);
      const data = await this.getResponseData(config, res);
      if (!Object.getOwnPropertyDescriptor(res, "data")?.configurable) {
        Object.defineProperties(res, {
          data: {
            configurable: true,
            writable: true,
            enumerable: true,
            value: data
          }
        });
      }
      return Object.assign(res, { config, data });
    }
    /**
     * Internal, retryable version of the `request` method.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async _request(opts) {
      try {
        let translatedResponse;
        if (opts.adapter) {
          translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
        } else {
          translatedResponse = await this._defaultAdapter(opts);
        }
        if (!opts.validateStatus(translatedResponse.status)) {
          if (opts.responseType === "stream") {
            const response = [];
            for await (const chunk of translatedResponse.data) {
              response.push(chunk);
            }
            translatedResponse.data = response.toString();
          }
          const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
          throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
        }
        return translatedResponse;
      } catch (e) {
        let err;
        if (e instanceof common_js_1.GaxiosError) {
          err = e;
        } else if (e instanceof Error) {
          err = new common_js_1.GaxiosError(e.message, opts, void 0, e);
        } else {
          err = new common_js_1.GaxiosError("Unexpected Gaxios Error", opts, void 0, e);
        }
        const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
        if (shouldRetry && config) {
          err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
          opts.retryConfig = err.config?.retryConfig;
          this.#appendTimeoutToSignal(opts);
          return this._request(opts);
        }
        if (opts.errorRedactor) {
          opts.errorRedactor(err);
        }
        throw err;
      }
    }
    async getResponseData(opts, res) {
      if (res.status === HTTP_STATUS_NO_CONTENT) {
        return "";
      }
      if (opts.maxContentLength && res.headers.has("content-length") && opts.maxContentLength < Number.parseInt(res.headers?.get("content-length") || "")) {
        throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, { config: opts }));
      }
      switch (opts.responseType) {
        case "stream":
          return res.body;
        case "json": {
          const data = await res.text();
          try {
            return JSON.parse(data);
          } catch {
            return data;
          }
        }
        case "arraybuffer":
          return res.arrayBuffer();
        case "blob":
          return res.blob();
        case "text":
          return res.text();
        default:
          return this.getResponseDataFromContentType(res);
      }
    }
    #urlMayUseProxy(url, noProxy = []) {
      const candidate = new URL(url);
      const noProxyList = [...noProxy];
      const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(",") || [];
      for (const rule of noProxyEnvList) {
        noProxyList.push(rule.trim());
      }
      for (const rule of noProxyList) {
        if (rule instanceof RegExp) {
          if (rule.test(candidate.toString())) {
            return false;
          }
        } else if (rule instanceof URL) {
          if (rule.origin === candidate.origin) {
            return false;
          }
        } else if (rule.startsWith("*.") || rule.startsWith(".")) {
          const cleanedRule = rule.replace(/^\*\./, ".");
          if (candidate.hostname.endsWith(cleanedRule)) {
            return false;
          }
        } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
          return false;
        }
      }
      return true;
    }
    /**
     * Applies the request interceptors. The request interceptors are applied after the
     * call to prepareRequest is completed.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyRequestInterceptors(options) {
      let promiseChain = Promise.resolve(options);
      for (const interceptor2 of this.interceptors.request.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Applies the response interceptors. The response interceptors are applied after the
     * call to request is made.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyResponseInterceptors(response) {
      let promiseChain = Promise.resolve(response);
      for (const interceptor2 of this.interceptors.response.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Validates the options, merges them with defaults, and prepare request.
     *
     * @param options The original options passed from the client.
     * @returns Prepared options, ready to make a request
     */
    async #prepareRequest(options) {
      const preparedHeaders = new Headers(this.defaults.headers);
      _a.mergeHeaders(preparedHeaders, options.headers);
      const opts = (0, extend_1.default)(true, {}, this.defaults, options);
      if (!opts.url) {
        throw new Error("URL is required.");
      }
      if (opts.baseURL) {
        opts.url = new URL(opts.url, opts.baseURL);
      }
      opts.url = new URL(opts.url);
      if (opts.params) {
        if (opts.paramsSerializer) {
          let additionalQueryParams = opts.paramsSerializer(opts.params);
          if (additionalQueryParams.startsWith("?")) {
            additionalQueryParams = additionalQueryParams.slice(1);
          }
          const prefix = opts.url.toString().includes("?") ? "&" : "?";
          opts.url = opts.url + prefix + additionalQueryParams;
        } else {
          const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
          for (const [key, value] of new URLSearchParams(opts.params)) {
            url.searchParams.append(key, value);
          }
          opts.url = url;
        }
      }
      if (typeof options.maxContentLength === "number") {
        opts.size = options.maxContentLength;
      }
      if (typeof options.maxRedirects === "number") {
        opts.follow = options.maxRedirects;
      }
      const shouldDirectlyPassData = typeof opts.data === "string" || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || // Node 18 does not have a global `File` object
      globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
      /**
       * @deprecated `node-fetch` or another third-party's request types
       */
      ["Blob", "File", "FormData"].includes(opts.data?.constructor?.name || "");
      if (opts.multipart?.length) {
        const boundary = await randomUUID();
        preparedHeaders.set("content-type", `multipart/related; boundary=${boundary}`);
        opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
      } else if (shouldDirectlyPassData) {
        opts.body = opts.data;
      } else if (typeof opts.data === "object") {
        if (preparedHeaders.get("Content-Type") === "application/x-www-form-urlencoded") {
          opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
        } else {
          if (!preparedHeaders.has("content-type")) {
            preparedHeaders.set("content-type", "application/json");
          }
          opts.body = JSON.stringify(opts.data);
        }
      } else if (opts.data) {
        opts.body = opts.data;
      }
      opts.validateStatus = opts.validateStatus || this.validateStatus;
      opts.responseType = opts.responseType || "unknown";
      if (!preparedHeaders.has("accept") && opts.responseType === "json") {
        preparedHeaders.set("accept", "application/json");
      }
      const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
      if (opts.agent) ;
      else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
        const HttpsProxyAgent = await _a.#getProxyAgent();
        if (this.agentCache.has(proxy)) {
          opts.agent = this.agentCache.get(proxy);
        } else {
          opts.agent = new HttpsProxyAgent(proxy, {
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(proxy, opts.agent);
        }
      } else if (opts.cert && opts.key) {
        if (this.agentCache.has(opts.key)) {
          opts.agent = this.agentCache.get(opts.key);
        } else {
          opts.agent = new https_1.Agent({
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(opts.key, opts.agent);
        }
      }
      if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
        opts.errorRedactor = common_js_1.defaultErrorRedactor;
      }
      if (opts.body && !("duplex" in opts)) {
        opts.duplex = "half";
      }
      this.#appendTimeoutToSignal(opts);
      return Object.assign(opts, {
        headers: preparedHeaders,
        url: opts.url instanceof URL ? opts.url : new URL(opts.url)
      });
    }
    #appendTimeoutToSignal(opts) {
      if (opts.timeout) {
        const timeoutSignal = AbortSignal.timeout(opts.timeout);
        if (opts.signal && !opts.signal.aborted) {
          opts.signal = AbortSignal.any([opts.signal, timeoutSignal]);
        } else {
          opts.signal = timeoutSignal;
        }
      }
    }
    /**
     * By default, throw for any non-2xx status code
     * @param status status code from the HTTP response
     */
    validateStatus(status) {
      return status >= 200 && status < 300;
    }
    /**
     * Attempts to parse a response by looking at the Content-Type header.
     * @param {Response} response the HTTP response.
     * @returns a promise that resolves to the response data.
     */
    async getResponseDataFromContentType(response) {
      let contentType = response.headers.get("Content-Type");
      if (contentType === null) {
        return response.text();
      }
      contentType = contentType.toLowerCase();
      if (contentType.includes("application/json")) {
        let data = await response.text();
        try {
          data = JSON.parse(data);
        } catch {
        }
        return data;
      } else if (contentType.match(/^text\//)) {
        return response.text();
      } else {
        return response.blob();
      }
    }
    /**
     * Creates an async generator that yields the pieces of a multipart/related request body.
     * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
     * multipart/related requests are not currently supported.
     *
     * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
     * @param {string} boundary the boundary string to be placed between each part.
     */
    async *getMultipartRequest(multipartOptions, boundary) {
      const finale = `--${boundary}--`;
      for (const currentPart of multipartOptions) {
        const partContentType = currentPart.headers.get("Content-Type") || "application/octet-stream";
        const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
        yield preamble;
        if (typeof currentPart.content === "string") {
          yield currentPart.content;
        } else {
          yield* currentPart.content;
        }
        yield "\r\n";
      }
      yield finale;
    }
    /**
     * A cache for the lazily-loaded proxy agent.
     *
     * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
     */
    // using `import` to dynamically import the types here
    static #proxyAgent;
    /**
     * A cache for the lazily-loaded fetch library.
     *
     * Should use {@link Gaxios[#getFetch]} to retrieve.
     */
    //
    static #fetch;
    /**
     * Imports, caches, and returns a proxy agent - if not already imported
     *
     * @returns A proxy agent
     */
    static async #getProxyAgent() {
      this.#proxyAgent ||= (await import("./https-proxy-agent.mjs").then(function(n) {
        return n.i;
      })).HttpsProxyAgent;
      return this.#proxyAgent;
    }
    static async #getFetch() {
      const hasWindow = typeof window !== "undefined" && !!window;
      this.#fetch ||= hasWindow ? window.fetch : (await import("./node-fetch.mjs").then(function(n) {
        return n.i;
      })).default;
      return this.#fetch;
    }
    /**
     * Merges headers.
     * If the base headers do not exist a new `Headers` object will be returned.
     *
     * @remarks
     *
     * Using this utility can be helpful when the headers are not known to exist:
     * - if they exist as `Headers`, that instance will be used
     *   - it improves performance and allows users to use their existing references to their `Headers`
     * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
     * - if the base headers do not exist a new `Headers` object will be created
     *
     * @param base headers to append/overwrite to
     * @param append headers to append/overwrite with
     * @returns the base headers instance with merged `Headers`
     */
    static mergeHeaders(base, ...append) {
      base = base instanceof Headers ? base : new Headers(base);
      for (const headers of append) {
        const add = headers instanceof Headers ? headers : new Headers(headers);
        add.forEach((value, key) => {
          key === "set-cookie" ? base.append(key, value) : base.set(key, value);
        });
      }
      return base;
    }
  }
  gaxios$3.Gaxios = Gaxios;
  _a = Gaxios;
  return gaxios$3;
}
var hasRequiredSrc$3;
function requireSrc$3() {
  if (hasRequiredSrc$3) return src$3;
  hasRequiredSrc$3 = 1;
  (function(exports) {
    var __createBinding = src$3 && src$3.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = src$3 && src$3.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    const gaxios_js_1 = requireGaxios$3();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_js_1.Gaxios;
    } });
    var common_js_1 = requireCommon$3();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_js_1.GaxiosError;
    } });
    __exportStar(requireInterceptor$3(), exports);
    exports.instance = new gaxios_js_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  })(src$3);
  return src$3;
}
var src$2 = {};
var gaxios$2 = {};
var common$2 = {};
const name$2 = "gaxios";
const version$2 = "7.1.5";
const description$2 = "A simple common HTTP client specifically for Google APIs and services.";
const main$2 = "build/cjs/src/index.js";
const types$2 = "build/cjs/src/index.d.ts";
const files$2 = ["build/"];
const exports$2 = { ".": { "import": { "types": "./build/esm/src/index.d.ts", "default": "./build/esm/src/index.js" }, "require": { "types": "./build/cjs/src/index.d.ts", "default": "./build/cjs/src/index.js" } } };
const scripts$2 = { "lint": "gts check --no-inline-config", "test": "c8 mocha build/esm/test", "presystem-test": "npm run compile", "system-test": "mocha build/esm/system-test --timeout 80000", "compile": "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs", "fix": "gts fix", "prepare": "npm run compile", "pretest": "npm run compile", "webpack": "webpack", "prebrowser-test": "npm run compile", "browser-test": "node build/browser-test/browser-test-runner.js", "docs": "jsdoc -c .jsdoc.js", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "prelint": "cd samples; npm link ../; npm install", "clean": "gts clean" };
const repository$2 = { "type": "git", "directory": "packages/gaxios", "url": "https://github.com/googleapis/google-cloud-node-core.git" };
const keywords$2 = ["google"];
const engines$2 = { "node": ">=18" };
const author$2 = "Google, LLC";
const license$2 = "Apache-2.0";
const devDependencies$2 = { "@babel/plugin-proposal-private-methods": "^7.18.6", "@types/cors": "^2.8.6", "@types/express": "^5.0.0", "@types/extend": "^3.0.1", "@types/mocha": "^10.0.10", "@types/multiparty": "4.2.1", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.8", "@types/node": "^24.0.0", "@types/sinon": "^21.0.0", "@types/tmp": "^0.2.6", "assert": "^2.0.0", "browserify": "^17.0.0", "c8": "^10.1.3", "cors": "^2.8.5", "express": "^5.0.0", "gts": "^6.0.2", "is-docker": "^3.0.0", "jsdoc": "^4.0.4", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-remap-coverage": "^0.1.5", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "^5.0.1", "mocha": "^11.1.0", "multiparty": "^4.2.1", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "14.0.5", "null-loader": "^4.0.1", "pack-n-play": "^4.0.0", "puppeteer": "^24.0.0", "sinon": "21.0.3", "stream-browserify": "^3.0.0", "tmp": "0.2.6", "ts-loader": "^9.5.2", "typescript": "5.8.3", "undici-types": "^7.24.1", "webpack": "^5.97.1", "webpack-cli": "^6.0.1" };
const dependencies$2 = { "extend": "^3.0.2", "https-proxy-agent": "^7.0.1", "node-fetch": "^3.3.2" };
const homepage$1 = "https://github.com/googleapis/google-cloud-node-core/tree/main/packages/gaxios";
const require$$0$2 = {
  name: name$2,
  version: version$2,
  description: description$2,
  main: main$2,
  types: types$2,
  files: files$2,
  exports: exports$2,
  scripts: scripts$2,
  repository: repository$2,
  keywords: keywords$2,
  engines: engines$2,
  author: author$2,
  license: license$2,
  devDependencies: devDependencies$2,
  dependencies: dependencies$2,
  homepage: homepage$1
};
var util$2;
var hasRequiredUtil$2;
function requireUtil$2() {
  if (hasRequiredUtil$2) return util$2;
  hasRequiredUtil$2 = 1;
  const pkg = require$$0$2;
  util$2 = { pkg };
  return util$2;
}
var hasRequiredCommon$2;
function requireCommon$2() {
  if (hasRequiredCommon$2) return common$2;
  hasRequiredCommon$2 = 1;
  (function(exports) {
    var __importDefault = common$2 && common$2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    const extend_1 = __importDefault(requireExtend());
    const util_cjs_1 = __importDefault(requireUtil$2());
    const pkg = util_cjs_1.default.pkg;
    exports.GAXIOS_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for(`${pkg.name}-gaxios-error`);
    class GaxiosError extends Error {
      config;
      response;
      /**
       * An error code.
       * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
       *
       * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
       *
       * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @example
       * 'ECONNRESET'
       *
       * @example
       * 'TimeoutError'
       *
       * @example
       * 500
       */
      code;
      /**
       * An HTTP Status code.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
       *
       * @example
       * 500
       */
      status;
      /**
       * @deprecated use {@link GaxiosError.cause} instead.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
       *
       * @privateRemarks
       *
       * We will want to remove this property later as the modern `cause` property is better suited
       * for displaying and relaying nested errors. Keeping this here makes the resulting
       * error log larger than it needs to be.
       *
       */
      error;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[Symbol.hasInstance]}
       * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
       * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
       */
      [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(GaxiosError, instance);
      }
      constructor(message, config, response, cause) {
        super(message, { cause });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : void 0;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(
              this.config.responseType,
              // workaround for `node-fetch`'s `.data` deprecation...
              this.response?.bodyUsed ? this.response?.data : void 0
            );
          } catch {
          }
          this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
          this.code = cause.name;
        } else if (cause && typeof cause === "object" && "code" in cause && (typeof cause.code === "string" || typeof cause.code === "number")) {
          this.code = cause.code;
        }
      }
      /**
       * An AIP-193 conforming error extractor.
       *
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @internal
       * @expiremental
       *
       * @param res the response object
       * @returns the extracted error information
       */
      static extractAPIErrorFromResponse(res, defaultErrorMessage = "The request failed") {
        let message = defaultErrorMessage;
        if (typeof res.data === "string") {
          message = res.data;
        }
        if (res.data && typeof res.data === "object" && "error" in res.data && res.data.error && !res.ok) {
          if (typeof res.data.error === "string") {
            return {
              message: res.data.error,
              code: res.status,
              status: res.statusText
            };
          }
          if (typeof res.data.error === "object") {
            message = "message" in res.data.error && typeof res.data.error.message === "string" ? res.data.error.message : message;
            const status = "status" in res.data.error && typeof res.data.error.status === "string" ? res.data.error.status : res.statusText;
            const code = "code" in res.data.error && typeof res.data.error.code === "number" ? res.data.error.code : res.status;
            if ("errors" in res.data.error && Array.isArray(res.data.error.errors)) {
              const errorMessages = [];
              for (const e of res.data.error.errors) {
                if (typeof e === "object" && "message" in e && typeof e.message === "string") {
                  errorMessages.push(e.message);
                }
              }
              return Object.assign({
                message: errorMessages.join("\n") || message,
                code,
                status
              }, res.data.error);
            }
            return Object.assign({
              message,
              code,
              status
            }, res.data.error);
          }
        }
        return {
          message,
          code: res.status,
          status: res.statusText
        };
      }
    }
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        headers.forEach((_, key) => {
          if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key))
            headers.set(key, REDACT);
        });
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || // support `node-fetch` FormData/URLSearchParams
        "forEach" in obj && "set" in obj) {
          obj.forEach((_, key) => {
            if (["grant_type", "assertion"].includes(key) || /secret/.test(key)) {
              obj.set(key, REDACT);
            }
          });
        } else {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        if (data.config.url.searchParams.has("token")) {
          data.config.url.searchParams.set("token", REDACT);
        }
        if (data.config.url.searchParams.has("client_secret")) {
          data.config.url.searchParams.set("client_secret", REDACT);
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        if (data.response.bodyUsed) {
          redactString(data.response, "data");
          redactObject(data.response.data);
        }
      }
      return data;
    }
  })(common$2);
  return common$2;
}
var retry$2 = {};
var hasRequiredRetry$2;
function requireRetry$2() {
  if (hasRequiredRetry$2) return retry$2;
  hasRequiredRetry$2 = 1;
  Object.defineProperty(retry$2, "__esModule", { value: true });
  retry$2.getRetryConfig = getRetryConfig;
  async function getRetryConfig(err) {
    let config = getConfig(err);
    if (!err || !err.config || !config && !err.config.retry) {
      return { shouldRetry: false };
    }
    config = config || {};
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
    config.httpMethodsToRetry = config.httpMethodsToRetry || [
      "GET",
      "HEAD",
      "PUT",
      "OPTIONS",
      "DELETE"
    ];
    config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
    config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
    config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
    config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
    config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    const retryRanges = [
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      // 1xx - Retry (Informational, request still processing)
      // 2xx - Do not retry (Success)
      // 3xx - Do not retry (Redirect)
      // 4xx - Do not retry (Client errors)
      // 408 - Retry ("Request Timeout")
      // 429 - Retry ("Too Many Requests")
      // 5xx - Retry (Server errors)
      [100, 199],
      [408, 408],
      [429, 429],
      [500, 599]
    ];
    config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
    err.config.retryConfig = config;
    const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
    if (!await shouldRetryFn(err)) {
      return { shouldRetry: false, config: err.config };
    }
    const delay = getNextRetryDelay(config);
    err.config.retryConfig.currentRetryAttempt += 1;
    const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (config.onRetryAttempt) {
      await config.onRetryAttempt(err);
    }
    await backoff;
    return { shouldRetry: true, config: err.config };
  }
  function shouldRetryRequest(err) {
    const config = getConfig(err);
    if (err.config.signal?.aborted && err.code !== "TimeoutError" || err.code === "AbortError") {
      return false;
    }
    if (!config || config.retry === 0) {
      return false;
    }
    if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
      return false;
    }
    if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || "GET")) {
      return false;
    }
    if (err.response && err.response.status) {
      let isInRange = false;
      for (const [min, max] of config.statusCodesToRetry) {
        const status = err.response.status;
        if (status >= min && status <= max) {
          isInRange = true;
          break;
        }
      }
      if (!isInRange) {
        return false;
      }
    }
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    if (config.currentRetryAttempt >= config.retry) {
      return false;
    }
    return true;
  }
  function getConfig(err) {
    if (err && err.config && err.config.retryConfig) {
      return err.config.retryConfig;
    }
    return;
  }
  function getNextRetryDelay(config) {
    const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
    const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
    const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
    return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
  }
  return retry$2;
}
var interceptor$2 = {};
var hasRequiredInterceptor$2;
function requireInterceptor$2() {
  if (hasRequiredInterceptor$2) return interceptor$2;
  hasRequiredInterceptor$2 = 1;
  Object.defineProperty(interceptor$2, "__esModule", { value: true });
  interceptor$2.GaxiosInterceptorManager = void 0;
  class GaxiosInterceptorManager extends Set {
  }
  interceptor$2.GaxiosInterceptorManager = GaxiosInterceptorManager;
  return interceptor$2;
}
var hasRequiredGaxios$2;
function requireGaxios$2() {
  if (hasRequiredGaxios$2) return gaxios$2;
  hasRequiredGaxios$2 = 1;
  var __importDefault = gaxios$2 && gaxios$2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _a;
  Object.defineProperty(gaxios$2, "__esModule", { value: true });
  gaxios$2.Gaxios = void 0;
  const extend_1 = __importDefault(requireExtend());
  const https_1 = require$$1;
  const common_js_1 = requireCommon$2();
  const retry_js_1 = requireRetry$2();
  const stream_1 = require$$0$4;
  const interceptor_js_1 = requireInterceptor$2();
  const randomUUID = async () => globalThis.crypto?.randomUUID() || (await import("crypto")).randomUUID();
  const HTTP_STATUS_NO_CONTENT = 204;
  class Gaxios {
    agentCache = /* @__PURE__ */ new Map();
    /**
     * Default HTTP options that will be used for every HTTP request.
     */
    defaults;
    /**
     * Interceptors
     */
    interceptors;
    /**
     * The Gaxios class is responsible for making HTTP requests.
     * @param defaults The default set of options to be used for this instance.
     */
    constructor(defaults) {
      this.defaults = defaults || {};
      this.interceptors = {
        request: new interceptor_js_1.GaxiosInterceptorManager(),
        response: new interceptor_js_1.GaxiosInterceptorManager()
      };
    }
    /**
     * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
     *
     * @remarks
     *
     * This is useful as a drop-in replacement for `fetch` API usage.
     *
     * @example
     *
     * ```ts
     * const gaxios = new Gaxios();
     * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
     * await myFetch('https://example.com');
     * ```
     *
     * @param args `fetch` API or `Gaxios#request` parameters
     * @returns the {@link Response} with Gaxios-added properties
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
        _a.mergeHeaders(headers, input.headers);
      }
      if (init) {
        _a.mergeHeaders(headers, new Headers(init.headers));
      }
      if (typeof input === "object" && !(input instanceof URL)) {
        return this.request({ ...init, ...input, headers, url });
      } else {
        return this.request({ ...init, headers, url });
      }
    }
    /**
     * Perform an HTTP request with the given options.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async request(opts = {}) {
      let prepared = await this.#prepareRequest(opts);
      prepared = await this.#applyRequestInterceptors(prepared);
      return this.#applyResponseInterceptors(this._request(prepared));
    }
    async _defaultAdapter(config) {
      const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
      const preparedOpts = { ...config };
      delete preparedOpts.data;
      const res = await fetchImpl(config.url, preparedOpts);
      const data = await this.getResponseData(config, res);
      if (!Object.getOwnPropertyDescriptor(res, "data")?.configurable) {
        Object.defineProperties(res, {
          data: {
            configurable: true,
            writable: true,
            enumerable: true,
            value: data
          }
        });
      }
      return Object.assign(res, { config, data });
    }
    /**
     * Internal, retryable version of the `request` method.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async _request(opts) {
      try {
        let translatedResponse;
        if (opts.adapter) {
          translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
        } else {
          translatedResponse = await this._defaultAdapter(opts);
        }
        if (!opts.validateStatus(translatedResponse.status)) {
          if (opts.responseType === "stream") {
            const response = [];
            for await (const chunk of translatedResponse.data) {
              response.push(chunk);
            }
            translatedResponse.data = response.toString();
          }
          const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
          throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
        }
        return translatedResponse;
      } catch (e) {
        let err;
        if (e instanceof common_js_1.GaxiosError) {
          err = e;
        } else if (e instanceof Error) {
          err = new common_js_1.GaxiosError(e.message, opts, void 0, e);
        } else {
          err = new common_js_1.GaxiosError("Unexpected Gaxios Error", opts, void 0, e);
        }
        const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
        if (shouldRetry && config) {
          err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
          opts.retryConfig = err.config?.retryConfig;
          this.#appendTimeoutToSignal(opts);
          return this._request(opts);
        }
        if (opts.errorRedactor) {
          opts.errorRedactor(err);
        }
        throw err;
      }
    }
    async getResponseData(opts, res) {
      if (res.status === HTTP_STATUS_NO_CONTENT) {
        return "";
      }
      if (opts.maxContentLength && res.headers.has("content-length") && opts.maxContentLength < Number.parseInt(res.headers?.get("content-length") || "")) {
        throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, { config: opts }));
      }
      switch (opts.responseType) {
        case "stream":
          return res.body;
        case "json": {
          const data = await res.text();
          try {
            return JSON.parse(data);
          } catch {
            return data;
          }
        }
        case "arraybuffer":
          return res.arrayBuffer();
        case "blob":
          return res.blob();
        case "text":
          return res.text();
        default:
          return this.getResponseDataFromContentType(res);
      }
    }
    #urlMayUseProxy(url, noProxy = []) {
      const candidate = new URL(url);
      const noProxyList = [...noProxy];
      const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(",") || [];
      for (const rule of noProxyEnvList) {
        noProxyList.push(rule.trim());
      }
      for (const rule of noProxyList) {
        if (rule instanceof RegExp) {
          if (rule.test(candidate.toString())) {
            return false;
          }
        } else if (rule instanceof URL) {
          if (rule.origin === candidate.origin) {
            return false;
          }
        } else if (rule.startsWith("*.") || rule.startsWith(".")) {
          const cleanedRule = rule.replace(/^\*\./, ".");
          if (candidate.hostname.endsWith(cleanedRule)) {
            return false;
          }
        } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
          return false;
        }
      }
      return true;
    }
    /**
     * Applies the request interceptors. The request interceptors are applied after the
     * call to prepareRequest is completed.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyRequestInterceptors(options) {
      let promiseChain = Promise.resolve(options);
      for (const interceptor2 of this.interceptors.request.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Applies the response interceptors. The response interceptors are applied after the
     * call to request is made.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyResponseInterceptors(response) {
      let promiseChain = Promise.resolve(response);
      for (const interceptor2 of this.interceptors.response.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Validates the options, merges them with defaults, and prepare request.
     *
     * @param options The original options passed from the client.
     * @returns Prepared options, ready to make a request
     */
    async #prepareRequest(options) {
      const preparedHeaders = new Headers(this.defaults.headers);
      _a.mergeHeaders(preparedHeaders, options.headers);
      const opts = (0, extend_1.default)(true, {}, this.defaults, options);
      if (!opts.url) {
        throw new Error("URL is required.");
      }
      if (opts.baseURL) {
        opts.url = new URL(opts.url, opts.baseURL);
      }
      opts.url = new URL(opts.url);
      if (opts.params) {
        if (opts.paramsSerializer) {
          let additionalQueryParams = opts.paramsSerializer(opts.params);
          if (additionalQueryParams.startsWith("?")) {
            additionalQueryParams = additionalQueryParams.slice(1);
          }
          const prefix = opts.url.toString().includes("?") ? "&" : "?";
          opts.url = opts.url + prefix + additionalQueryParams;
        } else {
          const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
          for (const [key, value] of new URLSearchParams(opts.params)) {
            url.searchParams.append(key, value);
          }
          opts.url = url;
        }
      }
      if (typeof options.maxContentLength === "number") {
        opts.size = options.maxContentLength;
      }
      if (typeof options.maxRedirects === "number") {
        opts.follow = options.maxRedirects;
      }
      const shouldDirectlyPassData = typeof opts.data === "string" || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || // Node 18 does not have a global `File` object
      globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
      /**
       * @deprecated `node-fetch` or another third-party's request types
       */
      ["Blob", "File", "FormData"].includes(opts.data?.constructor?.name || "");
      if (opts.multipart?.length) {
        const boundary = await randomUUID();
        preparedHeaders.set("content-type", `multipart/related; boundary=${boundary}`);
        opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
      } else if (shouldDirectlyPassData) {
        opts.body = opts.data;
      } else if (typeof opts.data === "object") {
        if (preparedHeaders.get("Content-Type") === "application/x-www-form-urlencoded") {
          opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
        } else {
          if (!preparedHeaders.has("content-type")) {
            preparedHeaders.set("content-type", "application/json");
          }
          opts.body = JSON.stringify(opts.data);
        }
      } else if (opts.data) {
        opts.body = opts.data;
      }
      opts.validateStatus = opts.validateStatus || this.validateStatus;
      opts.responseType = opts.responseType || "unknown";
      if (!preparedHeaders.has("accept") && opts.responseType === "json") {
        preparedHeaders.set("accept", "application/json");
      }
      const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
      if (opts.agent) ;
      else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
        const HttpsProxyAgent = await _a.#getProxyAgent();
        if (this.agentCache.has(proxy)) {
          opts.agent = this.agentCache.get(proxy);
        } else {
          opts.agent = new HttpsProxyAgent(proxy, {
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(proxy, opts.agent);
        }
      } else if (opts.cert && opts.key) {
        if (this.agentCache.has(opts.key)) {
          opts.agent = this.agentCache.get(opts.key);
        } else {
          opts.agent = new https_1.Agent({
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(opts.key, opts.agent);
        }
      }
      if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
        opts.errorRedactor = common_js_1.defaultErrorRedactor;
      }
      if (opts.body && !("duplex" in opts)) {
        opts.duplex = "half";
      }
      this.#appendTimeoutToSignal(opts);
      return Object.assign(opts, {
        headers: preparedHeaders,
        url: opts.url instanceof URL ? opts.url : new URL(opts.url)
      });
    }
    #appendTimeoutToSignal(opts) {
      if (opts.timeout) {
        const timeoutSignal = AbortSignal.timeout(opts.timeout);
        if (opts.signal && !opts.signal.aborted) {
          opts.signal = AbortSignal.any([opts.signal, timeoutSignal]);
        } else {
          opts.signal = timeoutSignal;
        }
      }
    }
    /**
     * By default, throw for any non-2xx status code
     * @param status status code from the HTTP response
     */
    validateStatus(status) {
      return status >= 200 && status < 300;
    }
    /**
     * Attempts to parse a response by looking at the Content-Type header.
     * @param {Response} response the HTTP response.
     * @returns a promise that resolves to the response data.
     */
    async getResponseDataFromContentType(response) {
      let contentType = response.headers.get("Content-Type");
      if (contentType === null) {
        return response.text();
      }
      contentType = contentType.toLowerCase();
      if (contentType.includes("application/json")) {
        let data = await response.text();
        try {
          data = JSON.parse(data);
        } catch {
        }
        return data;
      } else if (contentType.match(/^text\//)) {
        return response.text();
      } else {
        return response.blob();
      }
    }
    /**
     * Creates an async generator that yields the pieces of a multipart/related request body.
     * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
     * multipart/related requests are not currently supported.
     *
     * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
     * @param {string} boundary the boundary string to be placed between each part.
     */
    async *getMultipartRequest(multipartOptions, boundary) {
      const finale = `--${boundary}--`;
      for (const currentPart of multipartOptions) {
        const partContentType = currentPart.headers.get("Content-Type") || "application/octet-stream";
        const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
        yield preamble;
        if (typeof currentPart.content === "string") {
          yield currentPart.content;
        } else {
          yield* currentPart.content;
        }
        yield "\r\n";
      }
      yield finale;
    }
    /**
     * A cache for the lazily-loaded proxy agent.
     *
     * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
     */
    // using `import` to dynamically import the types here
    static #proxyAgent;
    /**
     * A cache for the lazily-loaded fetch library.
     *
     * Should use {@link Gaxios[#getFetch]} to retrieve.
     */
    //
    static #fetch;
    /**
     * Imports, caches, and returns a proxy agent - if not already imported
     *
     * @returns A proxy agent
     */
    static async #getProxyAgent() {
      this.#proxyAgent ||= (await import("./https-proxy-agent.mjs").then(function(n) {
        return n.i;
      })).HttpsProxyAgent;
      return this.#proxyAgent;
    }
    static async #getFetch() {
      const hasWindow = typeof window !== "undefined" && !!window;
      this.#fetch ||= hasWindow ? window.fetch : (await import("./node-fetch.mjs").then(function(n) {
        return n.a;
      })).default;
      return this.#fetch;
    }
    /**
     * Merges headers.
     * If the base headers do not exist a new `Headers` object will be returned.
     *
     * @remarks
     *
     * Using this utility can be helpful when the headers are not known to exist:
     * - if they exist as `Headers`, that instance will be used
     *   - it improves performance and allows users to use their existing references to their `Headers`
     * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
     * - if the base headers do not exist a new `Headers` object will be created
     *
     * @param base headers to append/overwrite to
     * @param append headers to append/overwrite with
     * @returns the base headers instance with merged `Headers`
     */
    static mergeHeaders(base, ...append) {
      base = base instanceof Headers ? base : new Headers(base);
      for (const headers of append) {
        const add = headers instanceof Headers ? headers : new Headers(headers);
        add.forEach((value, key) => {
          key === "set-cookie" ? base.append(key, value) : base.set(key, value);
        });
      }
      return base;
    }
  }
  gaxios$2.Gaxios = Gaxios;
  _a = Gaxios;
  return gaxios$2;
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
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    const gaxios_js_1 = requireGaxios$2();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_js_1.Gaxios;
    } });
    var common_js_1 = requireCommon$2();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_js_1.GaxiosError;
    } });
    __exportStar(requireInterceptor$2(), exports);
    exports.instance = new gaxios_js_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  })(src$2);
  return src$2;
}
var src$1 = {};
var gaxios$1 = {};
var common$1 = {};
const name$1 = "gaxios";
const version$1 = "7.1.5";
const description$1 = "A simple common HTTP client specifically for Google APIs and services.";
const main$1 = "build/cjs/src/index.js";
const types$1 = "build/cjs/src/index.d.ts";
const files$1 = ["build/"];
const exports$1 = { ".": { "import": { "types": "./build/esm/src/index.d.ts", "default": "./build/esm/src/index.js" }, "require": { "types": "./build/cjs/src/index.d.ts", "default": "./build/cjs/src/index.js" } } };
const scripts$1 = { "lint": "gts check --no-inline-config", "test": "c8 mocha build/esm/test", "presystem-test": "npm run compile", "system-test": "mocha build/esm/system-test --timeout 80000", "compile": "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs", "fix": "gts fix", "prepare": "npm run compile", "pretest": "npm run compile", "webpack": "webpack", "prebrowser-test": "npm run compile", "browser-test": "node build/browser-test/browser-test-runner.js", "docs": "jsdoc -c .jsdoc.js", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "prelint": "cd samples; npm link ../; npm install", "clean": "gts clean" };
const repository$1 = { "type": "git", "directory": "packages/gaxios", "url": "https://github.com/googleapis/google-cloud-node-core.git" };
const keywords$1 = ["google"];
const engines$1 = { "node": ">=18" };
const author$1 = "Google, LLC";
const license$1 = "Apache-2.0";
const devDependencies$1 = { "@babel/plugin-proposal-private-methods": "^7.18.6", "@types/cors": "^2.8.6", "@types/express": "^5.0.0", "@types/extend": "^3.0.1", "@types/mocha": "^10.0.10", "@types/multiparty": "4.2.1", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.8", "@types/node": "^24.0.0", "@types/sinon": "^21.0.0", "@types/tmp": "^0.2.6", "assert": "^2.0.0", "browserify": "^17.0.0", "c8": "^10.1.3", "cors": "^2.8.5", "express": "^5.0.0", "gts": "^6.0.2", "is-docker": "^3.0.0", "jsdoc": "^4.0.4", "jsdoc-fresh": "^5.0.0", "jsdoc-region-tag": "^4.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-remap-coverage": "^0.1.5", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "^5.0.1", "mocha": "^11.1.0", "multiparty": "^4.2.1", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "14.0.5", "null-loader": "^4.0.1", "pack-n-play": "^4.0.0", "puppeteer": "^24.0.0", "sinon": "21.0.3", "stream-browserify": "^3.0.0", "tmp": "0.2.6", "ts-loader": "^9.5.2", "typescript": "5.8.3", "undici-types": "^7.24.1", "webpack": "^5.97.1", "webpack-cli": "^6.0.1" };
const dependencies$1 = { "extend": "^3.0.2", "https-proxy-agent": "^7.0.1", "node-fetch": "^3.3.2" };
const homepage = "https://github.com/googleapis/google-cloud-node-core/tree/main/packages/gaxios";
const require$$0$1 = {
  name: name$1,
  version: version$1,
  description: description$1,
  main: main$1,
  types: types$1,
  files: files$1,
  exports: exports$1,
  scripts: scripts$1,
  repository: repository$1,
  keywords: keywords$1,
  engines: engines$1,
  author: author$1,
  license: license$1,
  devDependencies: devDependencies$1,
  dependencies: dependencies$1,
  homepage
};
var util$1;
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$1;
  hasRequiredUtil$1 = 1;
  const pkg = require$$0$1;
  util$1 = { pkg };
  return util$1;
}
var hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  (function(exports) {
    var __importDefault = common$1 && common$1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    const extend_1 = __importDefault(requireExtend());
    const util_cjs_1 = __importDefault(requireUtil$1());
    const pkg = util_cjs_1.default.pkg;
    exports.GAXIOS_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for(`${pkg.name}-gaxios-error`);
    class GaxiosError extends Error {
      config;
      response;
      /**
       * An error code.
       * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
       *
       * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
       *
       * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @example
       * 'ECONNRESET'
       *
       * @example
       * 'TimeoutError'
       *
       * @example
       * 500
       */
      code;
      /**
       * An HTTP Status code.
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
       *
       * @example
       * 500
       */
      status;
      /**
       * @deprecated use {@link GaxiosError.cause} instead.
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
       *
       * @privateRemarks
       *
       * We will want to remove this property later as the modern `cause` property is better suited
       * for displaying and relaying nested errors. Keeping this here makes the resulting
       * error log larger than it needs to be.
       *
       */
      error;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[Symbol.hasInstance]}
       * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
       * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
       */
      [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(GaxiosError, instance);
      }
      constructor(message, config, response, cause) {
        super(message, { cause });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : void 0;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(
              this.config.responseType,
              // workaround for `node-fetch`'s `.data` deprecation...
              this.response?.bodyUsed ? this.response?.data : void 0
            );
          } catch {
          }
          this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
          this.code = cause.name;
        } else if (cause && typeof cause === "object" && "code" in cause && (typeof cause.code === "string" || typeof cause.code === "number")) {
          this.code = cause.code;
        }
      }
      /**
       * An AIP-193 conforming error extractor.
       *
       * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
       *
       * @internal
       * @expiremental
       *
       * @param res the response object
       * @returns the extracted error information
       */
      static extractAPIErrorFromResponse(res, defaultErrorMessage = "The request failed") {
        let message = defaultErrorMessage;
        if (typeof res.data === "string") {
          message = res.data;
        }
        if (res.data && typeof res.data === "object" && "error" in res.data && res.data.error && !res.ok) {
          if (typeof res.data.error === "string") {
            return {
              message: res.data.error,
              code: res.status,
              status: res.statusText
            };
          }
          if (typeof res.data.error === "object") {
            message = "message" in res.data.error && typeof res.data.error.message === "string" ? res.data.error.message : message;
            const status = "status" in res.data.error && typeof res.data.error.status === "string" ? res.data.error.status : res.statusText;
            const code = "code" in res.data.error && typeof res.data.error.code === "number" ? res.data.error.code : res.status;
            if ("errors" in res.data.error && Array.isArray(res.data.error.errors)) {
              const errorMessages = [];
              for (const e of res.data.error.errors) {
                if (typeof e === "object" && "message" in e && typeof e.message === "string") {
                  errorMessages.push(e.message);
                }
              }
              return Object.assign({
                message: errorMessages.join("\n") || message,
                code,
                status
              }, res.data.error);
            }
            return Object.assign({
              message,
              code,
              status
            }, res.data.error);
          }
        }
        return {
          message,
          code: res.status,
          status: res.statusText
        };
      }
    }
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        headers.forEach((_, key) => {
          if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key))
            headers.set(key, REDACT);
        });
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (!obj || typeof obj !== "object") {
          return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || // support `node-fetch` FormData/URLSearchParams
        "forEach" in obj && "set" in obj) {
          obj.forEach((_, key) => {
            if (["grant_type", "assertion"].includes(key) || /secret/.test(key)) {
              obj.set(key, REDACT);
            }
          });
        } else {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        if (data.config.url.searchParams.has("token")) {
          data.config.url.searchParams.set("token", REDACT);
        }
        if (data.config.url.searchParams.has("client_secret")) {
          data.config.url.searchParams.set("client_secret", REDACT);
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        if (data.response.bodyUsed) {
          redactString(data.response, "data");
          redactObject(data.response.data);
        }
      }
      return data;
    }
  })(common$1);
  return common$1;
}
var retry$1 = {};
var hasRequiredRetry$1;
function requireRetry$1() {
  if (hasRequiredRetry$1) return retry$1;
  hasRequiredRetry$1 = 1;
  Object.defineProperty(retry$1, "__esModule", { value: true });
  retry$1.getRetryConfig = getRetryConfig;
  async function getRetryConfig(err) {
    let config = getConfig(err);
    if (!err || !err.config || !config && !err.config.retry) {
      return { shouldRetry: false };
    }
    config = config || {};
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
    config.httpMethodsToRetry = config.httpMethodsToRetry || [
      "GET",
      "HEAD",
      "PUT",
      "OPTIONS",
      "DELETE"
    ];
    config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
    config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
    config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
    config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
    config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    const retryRanges = [
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      // 1xx - Retry (Informational, request still processing)
      // 2xx - Do not retry (Success)
      // 3xx - Do not retry (Redirect)
      // 4xx - Do not retry (Client errors)
      // 408 - Retry ("Request Timeout")
      // 429 - Retry ("Too Many Requests")
      // 5xx - Retry (Server errors)
      [100, 199],
      [408, 408],
      [429, 429],
      [500, 599]
    ];
    config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
    err.config.retryConfig = config;
    const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
    if (!await shouldRetryFn(err)) {
      return { shouldRetry: false, config: err.config };
    }
    const delay = getNextRetryDelay(config);
    err.config.retryConfig.currentRetryAttempt += 1;
    const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (config.onRetryAttempt) {
      await config.onRetryAttempt(err);
    }
    await backoff;
    return { shouldRetry: true, config: err.config };
  }
  function shouldRetryRequest(err) {
    const config = getConfig(err);
    if (err.config.signal?.aborted && err.code !== "TimeoutError" || err.code === "AbortError") {
      return false;
    }
    if (!config || config.retry === 0) {
      return false;
    }
    if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
      return false;
    }
    if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || "GET")) {
      return false;
    }
    if (err.response && err.response.status) {
      let isInRange = false;
      for (const [min, max] of config.statusCodesToRetry) {
        const status = err.response.status;
        if (status >= min && status <= max) {
          isInRange = true;
          break;
        }
      }
      if (!isInRange) {
        return false;
      }
    }
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    if (config.currentRetryAttempt >= config.retry) {
      return false;
    }
    return true;
  }
  function getConfig(err) {
    if (err && err.config && err.config.retryConfig) {
      return err.config.retryConfig;
    }
    return;
  }
  function getNextRetryDelay(config) {
    const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
    const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
    const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
    return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
  }
  return retry$1;
}
var interceptor$1 = {};
var hasRequiredInterceptor$1;
function requireInterceptor$1() {
  if (hasRequiredInterceptor$1) return interceptor$1;
  hasRequiredInterceptor$1 = 1;
  Object.defineProperty(interceptor$1, "__esModule", { value: true });
  interceptor$1.GaxiosInterceptorManager = void 0;
  class GaxiosInterceptorManager extends Set {
  }
  interceptor$1.GaxiosInterceptorManager = GaxiosInterceptorManager;
  return interceptor$1;
}
var hasRequiredGaxios$1;
function requireGaxios$1() {
  if (hasRequiredGaxios$1) return gaxios$1;
  hasRequiredGaxios$1 = 1;
  var __importDefault = gaxios$1 && gaxios$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _a;
  Object.defineProperty(gaxios$1, "__esModule", { value: true });
  gaxios$1.Gaxios = void 0;
  const extend_1 = __importDefault(requireExtend());
  const https_1 = require$$1;
  const common_js_1 = requireCommon$1();
  const retry_js_1 = requireRetry$1();
  const stream_1 = require$$0$4;
  const interceptor_js_1 = requireInterceptor$1();
  const randomUUID = async () => globalThis.crypto?.randomUUID() || (await import("crypto")).randomUUID();
  const HTTP_STATUS_NO_CONTENT = 204;
  class Gaxios {
    agentCache = /* @__PURE__ */ new Map();
    /**
     * Default HTTP options that will be used for every HTTP request.
     */
    defaults;
    /**
     * Interceptors
     */
    interceptors;
    /**
     * The Gaxios class is responsible for making HTTP requests.
     * @param defaults The default set of options to be used for this instance.
     */
    constructor(defaults) {
      this.defaults = defaults || {};
      this.interceptors = {
        request: new interceptor_js_1.GaxiosInterceptorManager(),
        response: new interceptor_js_1.GaxiosInterceptorManager()
      };
    }
    /**
     * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
     *
     * @remarks
     *
     * This is useful as a drop-in replacement for `fetch` API usage.
     *
     * @example
     *
     * ```ts
     * const gaxios = new Gaxios();
     * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
     * await myFetch('https://example.com');
     * ```
     *
     * @param args `fetch` API or `Gaxios#request` parameters
     * @returns the {@link Response} with Gaxios-added properties
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
        _a.mergeHeaders(headers, input.headers);
      }
      if (init) {
        _a.mergeHeaders(headers, new Headers(init.headers));
      }
      if (typeof input === "object" && !(input instanceof URL)) {
        return this.request({ ...init, ...input, headers, url });
      } else {
        return this.request({ ...init, headers, url });
      }
    }
    /**
     * Perform an HTTP request with the given options.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async request(opts = {}) {
      let prepared = await this.#prepareRequest(opts);
      prepared = await this.#applyRequestInterceptors(prepared);
      return this.#applyResponseInterceptors(this._request(prepared));
    }
    async _defaultAdapter(config) {
      const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
      const preparedOpts = { ...config };
      delete preparedOpts.data;
      const res = await fetchImpl(config.url, preparedOpts);
      const data = await this.getResponseData(config, res);
      if (!Object.getOwnPropertyDescriptor(res, "data")?.configurable) {
        Object.defineProperties(res, {
          data: {
            configurable: true,
            writable: true,
            enumerable: true,
            value: data
          }
        });
      }
      return Object.assign(res, { config, data });
    }
    /**
     * Internal, retryable version of the `request` method.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async _request(opts) {
      try {
        let translatedResponse;
        if (opts.adapter) {
          translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
        } else {
          translatedResponse = await this._defaultAdapter(opts);
        }
        if (!opts.validateStatus(translatedResponse.status)) {
          if (opts.responseType === "stream") {
            const response = [];
            for await (const chunk of translatedResponse.data) {
              response.push(chunk);
            }
            translatedResponse.data = response.toString();
          }
          const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
          throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
        }
        return translatedResponse;
      } catch (e) {
        let err;
        if (e instanceof common_js_1.GaxiosError) {
          err = e;
        } else if (e instanceof Error) {
          err = new common_js_1.GaxiosError(e.message, opts, void 0, e);
        } else {
          err = new common_js_1.GaxiosError("Unexpected Gaxios Error", opts, void 0, e);
        }
        const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
        if (shouldRetry && config) {
          err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
          opts.retryConfig = err.config?.retryConfig;
          this.#appendTimeoutToSignal(opts);
          return this._request(opts);
        }
        if (opts.errorRedactor) {
          opts.errorRedactor(err);
        }
        throw err;
      }
    }
    async getResponseData(opts, res) {
      if (res.status === HTTP_STATUS_NO_CONTENT) {
        return "";
      }
      if (opts.maxContentLength && res.headers.has("content-length") && opts.maxContentLength < Number.parseInt(res.headers?.get("content-length") || "")) {
        throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, { config: opts }));
      }
      switch (opts.responseType) {
        case "stream":
          return res.body;
        case "json": {
          const data = await res.text();
          try {
            return JSON.parse(data);
          } catch {
            return data;
          }
        }
        case "arraybuffer":
          return res.arrayBuffer();
        case "blob":
          return res.blob();
        case "text":
          return res.text();
        default:
          return this.getResponseDataFromContentType(res);
      }
    }
    #urlMayUseProxy(url, noProxy = []) {
      const candidate = new URL(url);
      const noProxyList = [...noProxy];
      const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(",") || [];
      for (const rule of noProxyEnvList) {
        noProxyList.push(rule.trim());
      }
      for (const rule of noProxyList) {
        if (rule instanceof RegExp) {
          if (rule.test(candidate.toString())) {
            return false;
          }
        } else if (rule instanceof URL) {
          if (rule.origin === candidate.origin) {
            return false;
          }
        } else if (rule.startsWith("*.") || rule.startsWith(".")) {
          const cleanedRule = rule.replace(/^\*\./, ".");
          if (candidate.hostname.endsWith(cleanedRule)) {
            return false;
          }
        } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
          return false;
        }
      }
      return true;
    }
    /**
     * Applies the request interceptors. The request interceptors are applied after the
     * call to prepareRequest is completed.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyRequestInterceptors(options) {
      let promiseChain = Promise.resolve(options);
      for (const interceptor2 of this.interceptors.request.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Applies the response interceptors. The response interceptors are applied after the
     * call to request is made.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */
    async #applyResponseInterceptors(response) {
      let promiseChain = Promise.resolve(response);
      for (const interceptor2 of this.interceptors.response.values()) {
        if (interceptor2) {
          promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
        }
      }
      return promiseChain;
    }
    /**
     * Validates the options, merges them with defaults, and prepare request.
     *
     * @param options The original options passed from the client.
     * @returns Prepared options, ready to make a request
     */
    async #prepareRequest(options) {
      const preparedHeaders = new Headers(this.defaults.headers);
      _a.mergeHeaders(preparedHeaders, options.headers);
      const opts = (0, extend_1.default)(true, {}, this.defaults, options);
      if (!opts.url) {
        throw new Error("URL is required.");
      }
      if (opts.baseURL) {
        opts.url = new URL(opts.url, opts.baseURL);
      }
      opts.url = new URL(opts.url);
      if (opts.params) {
        if (opts.paramsSerializer) {
          let additionalQueryParams = opts.paramsSerializer(opts.params);
          if (additionalQueryParams.startsWith("?")) {
            additionalQueryParams = additionalQueryParams.slice(1);
          }
          const prefix = opts.url.toString().includes("?") ? "&" : "?";
          opts.url = opts.url + prefix + additionalQueryParams;
        } else {
          const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
          for (const [key, value] of new URLSearchParams(opts.params)) {
            url.searchParams.append(key, value);
          }
          opts.url = url;
        }
      }
      if (typeof options.maxContentLength === "number") {
        opts.size = options.maxContentLength;
      }
      if (typeof options.maxRedirects === "number") {
        opts.follow = options.maxRedirects;
      }
      const shouldDirectlyPassData = typeof opts.data === "string" || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || // Node 18 does not have a global `File` object
      globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
      /**
       * @deprecated `node-fetch` or another third-party's request types
       */
      ["Blob", "File", "FormData"].includes(opts.data?.constructor?.name || "");
      if (opts.multipart?.length) {
        const boundary = await randomUUID();
        preparedHeaders.set("content-type", `multipart/related; boundary=${boundary}`);
        opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
      } else if (shouldDirectlyPassData) {
        opts.body = opts.data;
      } else if (typeof opts.data === "object") {
        if (preparedHeaders.get("Content-Type") === "application/x-www-form-urlencoded") {
          opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
        } else {
          if (!preparedHeaders.has("content-type")) {
            preparedHeaders.set("content-type", "application/json");
          }
          opts.body = JSON.stringify(opts.data);
        }
      } else if (opts.data) {
        opts.body = opts.data;
      }
      opts.validateStatus = opts.validateStatus || this.validateStatus;
      opts.responseType = opts.responseType || "unknown";
      if (!preparedHeaders.has("accept") && opts.responseType === "json") {
        preparedHeaders.set("accept", "application/json");
      }
      const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
      if (opts.agent) ;
      else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
        const HttpsProxyAgent = await _a.#getProxyAgent();
        if (this.agentCache.has(proxy)) {
          opts.agent = this.agentCache.get(proxy);
        } else {
          opts.agent = new HttpsProxyAgent(proxy, {
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(proxy, opts.agent);
        }
      } else if (opts.cert && opts.key) {
        if (this.agentCache.has(opts.key)) {
          opts.agent = this.agentCache.get(opts.key);
        } else {
          opts.agent = new https_1.Agent({
            cert: opts.cert,
            key: opts.key
          });
          this.agentCache.set(opts.key, opts.agent);
        }
      }
      if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
        opts.errorRedactor = common_js_1.defaultErrorRedactor;
      }
      if (opts.body && !("duplex" in opts)) {
        opts.duplex = "half";
      }
      this.#appendTimeoutToSignal(opts);
      return Object.assign(opts, {
        headers: preparedHeaders,
        url: opts.url instanceof URL ? opts.url : new URL(opts.url)
      });
    }
    #appendTimeoutToSignal(opts) {
      if (opts.timeout) {
        const timeoutSignal = AbortSignal.timeout(opts.timeout);
        if (opts.signal && !opts.signal.aborted) {
          opts.signal = AbortSignal.any([opts.signal, timeoutSignal]);
        } else {
          opts.signal = timeoutSignal;
        }
      }
    }
    /**
     * By default, throw for any non-2xx status code
     * @param status status code from the HTTP response
     */
    validateStatus(status) {
      return status >= 200 && status < 300;
    }
    /**
     * Attempts to parse a response by looking at the Content-Type header.
     * @param {Response} response the HTTP response.
     * @returns a promise that resolves to the response data.
     */
    async getResponseDataFromContentType(response) {
      let contentType = response.headers.get("Content-Type");
      if (contentType === null) {
        return response.text();
      }
      contentType = contentType.toLowerCase();
      if (contentType.includes("application/json")) {
        let data = await response.text();
        try {
          data = JSON.parse(data);
        } catch {
        }
        return data;
      } else if (contentType.match(/^text\//)) {
        return response.text();
      } else {
        return response.blob();
      }
    }
    /**
     * Creates an async generator that yields the pieces of a multipart/related request body.
     * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
     * multipart/related requests are not currently supported.
     *
     * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
     * @param {string} boundary the boundary string to be placed between each part.
     */
    async *getMultipartRequest(multipartOptions, boundary) {
      const finale = `--${boundary}--`;
      for (const currentPart of multipartOptions) {
        const partContentType = currentPart.headers.get("Content-Type") || "application/octet-stream";
        const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
        yield preamble;
        if (typeof currentPart.content === "string") {
          yield currentPart.content;
        } else {
          yield* currentPart.content;
        }
        yield "\r\n";
      }
      yield finale;
    }
    /**
     * A cache for the lazily-loaded proxy agent.
     *
     * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
     */
    // using `import` to dynamically import the types here
    static #proxyAgent;
    /**
     * A cache for the lazily-loaded fetch library.
     *
     * Should use {@link Gaxios[#getFetch]} to retrieve.
     */
    //
    static #fetch;
    /**
     * Imports, caches, and returns a proxy agent - if not already imported
     *
     * @returns A proxy agent
     */
    static async #getProxyAgent() {
      this.#proxyAgent ||= (await import("./https-proxy-agent.mjs").then(function(n) {
        return n.i;
      })).HttpsProxyAgent;
      return this.#proxyAgent;
    }
    static async #getFetch() {
      const hasWindow = typeof window !== "undefined" && !!window;
      this.#fetch ||= hasWindow ? window.fetch : (await import("./node-fetch.mjs").then(function(n) {
        return n.b;
      })).default;
      return this.#fetch;
    }
    /**
     * Merges headers.
     * If the base headers do not exist a new `Headers` object will be returned.
     *
     * @remarks
     *
     * Using this utility can be helpful when the headers are not known to exist:
     * - if they exist as `Headers`, that instance will be used
     *   - it improves performance and allows users to use their existing references to their `Headers`
     * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
     * - if the base headers do not exist a new `Headers` object will be created
     *
     * @param base headers to append/overwrite to
     * @param append headers to append/overwrite with
     * @returns the base headers instance with merged `Headers`
     */
    static mergeHeaders(base, ...append) {
      base = base instanceof Headers ? base : new Headers(base);
      for (const headers of append) {
        const add = headers instanceof Headers ? headers : new Headers(headers);
        add.forEach((value, key) => {
          key === "set-cookie" ? base.append(key, value) : base.set(key, value);
        });
      }
      return base;
    }
  }
  gaxios$1.Gaxios = Gaxios;
  _a = Gaxios;
  return gaxios$1;
}
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  (function(exports) {
    var __createBinding = src$1 && src$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __exportStar = src$1 && src$1.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    const gaxios_js_1 = requireGaxios$1();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_js_1.Gaxios;
    } });
    var common_js_1 = requireCommon$1();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_js_1.GaxiosError;
    } });
    __exportStar(requireInterceptor$1(), exports);
    exports.instance = new gaxios_js_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  })(src$1);
  return src$1;
}
var src = {};
var gaxios = {};
var common = {};
var util = {};
const name = "gaxios";
const version = "6.7.1";
const description = "A simple common HTTP client specifically for Google APIs and services.";
const main = "build/src/index.js";
const types = "build/src/index.d.ts";
const files = ["build/src"];
const scripts = { "lint": "gts check", "test": "c8 mocha build/test", "presystem-test": "npm run compile", "system-test": "mocha build/system-test --timeout 80000", "compile": "tsc -p .", "fix": "gts fix", "prepare": "npm run compile", "pretest": "npm run compile", "webpack": "webpack", "prebrowser-test": "npm run compile", "browser-test": "node build/browser-test/browser-test-runner.js", "docs": "compodoc src/", "docs-test": "linkinator docs", "predocs-test": "npm run docs", "samples-test": "cd samples/ && npm link ../ && npm test && cd ../", "prelint": "cd samples; npm link ../; npm install", "clean": "gts clean", "precompile": "gts clean" };
const repository = "googleapis/gaxios";
const keywords = ["google"];
const engines = { "node": ">=14" };
const author = "Google, LLC";
const license = "Apache-2.0";
const devDependencies = { "@babel/plugin-proposal-private-methods": "^7.18.6", "@compodoc/compodoc": "1.1.19", "@types/cors": "^2.8.6", "@types/express": "^4.16.1", "@types/extend": "^3.0.1", "@types/mocha": "^9.0.0", "@types/multiparty": "0.0.36", "@types/mv": "^2.1.0", "@types/ncp": "^2.0.1", "@types/node": "^20.0.0", "@types/node-fetch": "^2.5.7", "@types/sinon": "^17.0.0", "@types/tmp": "0.2.6", "@types/uuid": "^10.0.0", "abort-controller": "^3.0.0", "assert": "^2.0.0", "browserify": "^17.0.0", "c8": "^8.0.0", "cheerio": "1.0.0-rc.10", "cors": "^2.8.5", "execa": "^5.0.0", "express": "^4.16.4", "form-data": "^4.0.0", "gts": "^5.0.0", "is-docker": "^2.0.0", "karma": "^6.0.0", "karma-chrome-launcher": "^3.0.0", "karma-coverage": "^2.0.0", "karma-firefox-launcher": "^2.0.0", "karma-mocha": "^2.0.0", "karma-remap-coverage": "^0.1.5", "karma-sourcemap-loader": "^0.4.0", "karma-webpack": "5.0.0", "linkinator": "^3.0.0", "mocha": "^8.0.0", "multiparty": "^4.2.1", "mv": "^2.1.1", "ncp": "^2.0.0", "nock": "^13.0.0", "null-loader": "^4.0.0", "puppeteer": "^19.0.0", "sinon": "^18.0.0", "stream-browserify": "^3.0.0", "tmp": "0.2.3", "ts-loader": "^8.0.0", "typescript": "^5.1.6", "webpack": "^5.35.0", "webpack-cli": "^4.0.0" };
const dependencies = { "extend": "^3.0.2", "https-proxy-agent": "^7.0.1", "is-stream": "^2.0.0", "node-fetch": "^2.6.9", "uuid": "^9.0.1" };
const require$$0 = {
  name,
  version,
  description,
  main,
  types,
  files,
  scripts,
  repository,
  keywords,
  engines,
  author,
  license,
  devDependencies,
  dependencies
};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  Object.defineProperty(util, "__esModule", { value: true });
  util.pkg = void 0;
  util.pkg = require$$0;
  return util;
}
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  (function(exports) {
    var __importDefault = common && common.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
    exports.defaultErrorRedactor = defaultErrorRedactor;
    const url_1 = Url;
    const util_1 = requireUtil();
    const extend_1 = __importDefault(requireExtend());
    exports.GAXIOS_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for(`${util_1.pkg.name}-gaxios-error`);
    class GaxiosError extends Error {
      /**
       * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
       *
       * @see {@link GAXIOS_ERROR_SYMBOL}
       * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
       */
      static [(_a = exports.GAXIOS_ERROR_SYMBOL, Symbol.hasInstance)](instance) {
        if (instance && typeof instance === "object" && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === util_1.pkg.version) {
          return true;
        }
        return Function.prototype[Symbol.hasInstance].call(GaxiosError, instance);
      }
      constructor(message, config, response, error) {
        var _b;
        super(message);
        this.config = config;
        this.response = response;
        this.error = error;
        this[_a] = util_1.pkg.version;
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
          this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
          try {
            this.response.data = translateData(this.config.responseType, (_b = this.response) === null || _b === void 0 ? void 0 : _b.data);
          } catch (_c) {
          }
          this.status = this.response.status;
        }
        if (error && "code" in error && error.code) {
          this.code = error.code;
        }
        if (config.errorRedactor) {
          config.errorRedactor({
            config: this.config,
            response: this.response
          });
        }
      }
    }
    exports.GaxiosError = GaxiosError;
    function translateData(responseType, data) {
      switch (responseType) {
        case "stream":
          return data;
        case "json":
          return JSON.parse(JSON.stringify(data));
        case "arraybuffer":
          return JSON.parse(Buffer.from(data).toString("utf8"));
        case "blob":
          return JSON.parse(data.text());
        default:
          return data;
      }
    }
    function defaultErrorRedactor(data) {
      const REDACT = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      function redactHeaders(headers) {
        if (!headers)
          return;
        for (const key of Object.keys(headers)) {
          if (/^authentication$/i.test(key)) {
            headers[key] = REDACT;
          }
          if (/^authorization$/i.test(key)) {
            headers[key] = REDACT;
          }
          if (/secret/i.test(key)) {
            headers[key] = REDACT;
          }
        }
      }
      function redactString(obj, key) {
        if (typeof obj === "object" && obj !== null && typeof obj[key] === "string") {
          const text = obj[key];
          if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
            obj[key] = REDACT;
          }
        }
      }
      function redactObject(obj) {
        if (typeof obj === "object" && obj !== null) {
          if ("grant_type" in obj) {
            obj["grant_type"] = REDACT;
          }
          if ("assertion" in obj) {
            obj["assertion"] = REDACT;
          }
          if ("client_secret" in obj) {
            obj["client_secret"] = REDACT;
          }
        }
      }
      if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, "data");
        redactObject(data.config.data);
        redactString(data.config, "body");
        redactObject(data.config.body);
        try {
          const url = new url_1.URL("", data.config.url);
          if (url.searchParams.has("token")) {
            url.searchParams.set("token", REDACT);
          }
          if (url.searchParams.has("client_secret")) {
            url.searchParams.set("client_secret", REDACT);
          }
          data.config.url = url.toString();
        } catch (_b) {
        }
      }
      if (data.response) {
        defaultErrorRedactor({ config: data.response.config });
        redactHeaders(data.response.headers);
        redactString(data.response, "data");
        redactObject(data.response.data);
      }
      return data;
    }
  })(common);
  return common;
}
var retry = {};
var hasRequiredRetry;
function requireRetry() {
  if (hasRequiredRetry) return retry;
  hasRequiredRetry = 1;
  Object.defineProperty(retry, "__esModule", { value: true });
  retry.getRetryConfig = getRetryConfig;
  async function getRetryConfig(err) {
    let config = getConfig(err);
    if (!err || !err.config || !config && !err.config.retry) {
      return { shouldRetry: false };
    }
    config = config || {};
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    config.retry = config.retry === void 0 || config.retry === null ? 3 : config.retry;
    config.httpMethodsToRetry = config.httpMethodsToRetry || [
      "GET",
      "HEAD",
      "PUT",
      "OPTIONS",
      "DELETE"
    ];
    config.noResponseRetries = config.noResponseRetries === void 0 || config.noResponseRetries === null ? 2 : config.noResponseRetries;
    config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
    config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
    config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
    config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    const retryRanges = [
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      // 1xx - Retry (Informational, request still processing)
      // 2xx - Do not retry (Success)
      // 3xx - Do not retry (Redirect)
      // 4xx - Do not retry (Client errors)
      // 408 - Retry ("Request Timeout")
      // 429 - Retry ("Too Many Requests")
      // 5xx - Retry (Server errors)
      [100, 199],
      [408, 408],
      [429, 429],
      [500, 599]
    ];
    config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
    err.config.retryConfig = config;
    const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
    if (!await shouldRetryFn(err)) {
      return { shouldRetry: false, config: err.config };
    }
    const delay = getNextRetryDelay(config);
    err.config.retryConfig.currentRetryAttempt += 1;
    const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    if (config.onRetryAttempt) {
      config.onRetryAttempt(err);
    }
    await backoff;
    return { shouldRetry: true, config: err.config };
  }
  function shouldRetryRequest(err) {
    var _a;
    const config = getConfig(err);
    if (err.name === "AbortError" || ((_a = err.error) === null || _a === void 0 ? void 0 : _a.name) === "AbortError") {
      return false;
    }
    if (!config || config.retry === 0) {
      return false;
    }
    if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
      return false;
    }
    if (!err.config.method || config.httpMethodsToRetry.indexOf(err.config.method.toUpperCase()) < 0) {
      return false;
    }
    if (err.response && err.response.status) {
      let isInRange = false;
      for (const [min, max] of config.statusCodesToRetry) {
        const status = err.response.status;
        if (status >= min && status <= max) {
          isInRange = true;
          break;
        }
      }
      if (!isInRange) {
        return false;
      }
    }
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    if (config.currentRetryAttempt >= config.retry) {
      return false;
    }
    return true;
  }
  function getConfig(err) {
    if (err && err.config && err.config.retryConfig) {
      return err.config.retryConfig;
    }
    return;
  }
  function getNextRetryDelay(config) {
    var _a;
    const retryDelay = config.currentRetryAttempt ? 0 : (_a = config.retryDelay) !== null && _a !== void 0 ? _a : 100;
    const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1e3;
    const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
    return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
  }
  return retry;
}
var interceptor = {};
var hasRequiredInterceptor;
function requireInterceptor() {
  if (hasRequiredInterceptor) return interceptor;
  hasRequiredInterceptor = 1;
  Object.defineProperty(interceptor, "__esModule", { value: true });
  interceptor.GaxiosInterceptorManager = void 0;
  class GaxiosInterceptorManager extends Set {
  }
  interceptor.GaxiosInterceptorManager = GaxiosInterceptorManager;
  return interceptor;
}
var hasRequiredGaxios;
function requireGaxios() {
  if (hasRequiredGaxios) return gaxios;
  hasRequiredGaxios = 1;
  var __createBinding = gaxios && gaxios.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = gaxios && gaxios.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = gaxios && gaxios.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __classPrivateFieldGet = gaxios && gaxios.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = gaxios && gaxios.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __importDefault = gaxios && gaxios.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _Gaxios_instances, _a, _Gaxios_urlMayUseProxy, _Gaxios_applyRequestInterceptors, _Gaxios_applyResponseInterceptors, _Gaxios_prepareRequest, _Gaxios_proxyAgent, _Gaxios_getProxyAgent;
  Object.defineProperty(gaxios, "__esModule", { value: true });
  gaxios.Gaxios = void 0;
  const extend_1 = __importDefault(requireExtend());
  const https_1 = require$$1;
  const node_fetch_1 = __importDefault(require$$0$5);
  const querystring_1 = __importDefault(require$$1$1);
  const is_stream_1 = __importDefault(requireIsStream());
  const url_1 = Url;
  const common_1 = requireCommon();
  const retry_1 = requireRetry();
  const stream_1 = require$$0$4;
  const uuid_1 = /* @__PURE__ */ requireDist$1();
  const interceptor_1 = requireInterceptor();
  const fetch = hasFetch() ? window.fetch : node_fetch_1.default;
  function hasWindow() {
    return typeof window !== "undefined" && !!window;
  }
  function hasFetch() {
    return hasWindow() && !!window.fetch;
  }
  function hasBuffer() {
    return typeof Buffer !== "undefined";
  }
  function hasHeader(options, header) {
    return !!getHeader(options, header);
  }
  function getHeader(options, header) {
    header = header.toLowerCase();
    for (const key of Object.keys((options === null || options === void 0 ? void 0 : options.headers) || {})) {
      if (header === key.toLowerCase()) {
        return options.headers[key];
      }
    }
    return void 0;
  }
  class Gaxios {
    /**
     * The Gaxios class is responsible for making HTTP requests.
     * @param defaults The default set of options to be used for this instance.
     */
    constructor(defaults) {
      _Gaxios_instances.add(this);
      this.agentCache = /* @__PURE__ */ new Map();
      this.defaults = defaults || {};
      this.interceptors = {
        request: new interceptor_1.GaxiosInterceptorManager(),
        response: new interceptor_1.GaxiosInterceptorManager()
      };
    }
    /**
     * Perform an HTTP request with the given options.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async request(opts = {}) {
      opts = await __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_prepareRequest).call(this, opts);
      opts = await __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_applyRequestInterceptors).call(this, opts);
      return __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_applyResponseInterceptors).call(this, this._request(opts));
    }
    async _defaultAdapter(opts) {
      const fetchImpl = opts.fetchImplementation || fetch;
      const res = await fetchImpl(opts.url, opts);
      const data = await this.getResponseData(opts, res);
      return this.translateResponse(opts, res, data);
    }
    /**
     * Internal, retryable version of the `request` method.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */
    async _request(opts = {}) {
      var _b;
      try {
        let translatedResponse;
        if (opts.adapter) {
          translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
        } else {
          translatedResponse = await this._defaultAdapter(opts);
        }
        if (!opts.validateStatus(translatedResponse.status)) {
          if (opts.responseType === "stream") {
            let response = "";
            await new Promise((resolve) => {
              (translatedResponse === null || translatedResponse === void 0 ? void 0 : translatedResponse.data).on("data", (chunk) => {
                response += chunk;
              });
              (translatedResponse === null || translatedResponse === void 0 ? void 0 : translatedResponse.data).on("end", resolve);
            });
            translatedResponse.data = response;
          }
          throw new common_1.GaxiosError(`Request failed with status code ${translatedResponse.status}`, opts, translatedResponse);
        }
        return translatedResponse;
      } catch (e) {
        const err = e instanceof common_1.GaxiosError ? e : new common_1.GaxiosError(e.message, opts, void 0, e);
        const { shouldRetry, config } = await (0, retry_1.getRetryConfig)(err);
        if (shouldRetry && config) {
          err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
          opts.retryConfig = (_b = err.config) === null || _b === void 0 ? void 0 : _b.retryConfig;
          return this._request(opts);
        }
        throw err;
      }
    }
    async getResponseData(opts, res) {
      switch (opts.responseType) {
        case "stream":
          return res.body;
        case "json": {
          let data = await res.text();
          try {
            data = JSON.parse(data);
          } catch (_b) {
          }
          return data;
        }
        case "arraybuffer":
          return res.arrayBuffer();
        case "blob":
          return res.blob();
        case "text":
          return res.text();
        default:
          return this.getResponseDataFromContentType(res);
      }
    }
    /**
     * By default, throw for any non-2xx status code
     * @param status status code from the HTTP response
     */
    validateStatus(status) {
      return status >= 200 && status < 300;
    }
    /**
     * Encode a set of key/value pars into a querystring format (?foo=bar&baz=boo)
     * @param params key value pars to encode
     */
    paramsSerializer(params) {
      return querystring_1.default.stringify(params);
    }
    translateResponse(opts, res, data) {
      const headers = {};
      res.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return {
        config: opts,
        data,
        headers,
        status: res.status,
        statusText: res.statusText,
        // XMLHttpRequestLike
        request: {
          responseURL: res.url
        }
      };
    }
    /**
     * Attempts to parse a response by looking at the Content-Type header.
     * @param {FetchResponse} response the HTTP response.
     * @returns {Promise<any>} a promise that resolves to the response data.
     */
    async getResponseDataFromContentType(response) {
      let contentType = response.headers.get("Content-Type");
      if (contentType === null) {
        return response.text();
      }
      contentType = contentType.toLowerCase();
      if (contentType.includes("application/json")) {
        let data = await response.text();
        try {
          data = JSON.parse(data);
        } catch (_b) {
        }
        return data;
      } else if (contentType.match(/^text\//)) {
        return response.text();
      } else {
        return response.blob();
      }
    }
    /**
     * Creates an async generator that yields the pieces of a multipart/related request body.
     * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
     * multipart/related requests are not currently supported.
     *
     * @param {GaxioMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
     * @param {string} boundary the boundary string to be placed between each part.
     */
    async *getMultipartRequest(multipartOptions, boundary) {
      const finale = `--${boundary}--`;
      for (const currentPart of multipartOptions) {
        const partContentType = currentPart.headers["Content-Type"] || "application/octet-stream";
        const preamble = `--${boundary}\r
Content-Type: ${partContentType}\r
\r
`;
        yield preamble;
        if (typeof currentPart.content === "string") {
          yield currentPart.content;
        } else {
          yield* currentPart.content;
        }
        yield "\r\n";
      }
      yield finale;
    }
  }
  gaxios.Gaxios = Gaxios;
  _a = Gaxios, _Gaxios_instances = /* @__PURE__ */ new WeakSet(), _Gaxios_urlMayUseProxy = function _Gaxios_urlMayUseProxy2(url, noProxy = []) {
    var _b, _c;
    const candidate = new url_1.URL(url);
    const noProxyList = [...noProxy];
    const noProxyEnvList = ((_c = (_b = process.env.NO_PROXY) !== null && _b !== void 0 ? _b : process.env.no_proxy) === null || _c === void 0 ? void 0 : _c.split(",")) || [];
    for (const rule of noProxyEnvList) {
      noProxyList.push(rule.trim());
    }
    for (const rule of noProxyList) {
      if (rule instanceof RegExp) {
        if (rule.test(candidate.toString())) {
          return false;
        }
      } else if (rule instanceof url_1.URL) {
        if (rule.origin === candidate.origin) {
          return false;
        }
      } else if (rule.startsWith("*.") || rule.startsWith(".")) {
        const cleanedRule = rule.replace(/^\*\./, ".");
        if (candidate.hostname.endsWith(cleanedRule)) {
          return false;
        }
      } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
        return false;
      }
    }
    return true;
  }, _Gaxios_applyRequestInterceptors = /**
   * Applies the request interceptors. The request interceptors are applied after the
   * call to prepareRequest is completed.
   *
   * @param {GaxiosOptions} options The current set of options.
   *
   * @returns {Promise<GaxiosOptions>} Promise that resolves to the set of options or response after interceptors are applied.
   */
  async function _Gaxios_applyRequestInterceptors2(options) {
    let promiseChain = Promise.resolve(options);
    for (const interceptor2 of this.interceptors.request.values()) {
      if (interceptor2) {
        promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
      }
    }
    return promiseChain;
  }, _Gaxios_applyResponseInterceptors = /**
   * Applies the response interceptors. The response interceptors are applied after the
   * call to request is made.
   *
   * @param {GaxiosOptions} options The current set of options.
   *
   * @returns {Promise<GaxiosOptions>} Promise that resolves to the set of options or response after interceptors are applied.
   */
  async function _Gaxios_applyResponseInterceptors2(response) {
    let promiseChain = Promise.resolve(response);
    for (const interceptor2 of this.interceptors.response.values()) {
      if (interceptor2) {
        promiseChain = promiseChain.then(interceptor2.resolved, interceptor2.rejected);
      }
    }
    return promiseChain;
  }, _Gaxios_prepareRequest = /**
   * Validates the options, merges them with defaults, and prepare request.
   *
   * @param options The original options passed from the client.
   * @returns Prepared options, ready to make a request
   */
  async function _Gaxios_prepareRequest2(options) {
    var _b, _c, _d, _e;
    const opts = (0, extend_1.default)(true, {}, this.defaults, options);
    if (!opts.url) {
      throw new Error("URL is required.");
    }
    const baseUrl = opts.baseUrl || opts.baseURL;
    if (baseUrl) {
      opts.url = baseUrl.toString() + opts.url;
    }
    opts.paramsSerializer = opts.paramsSerializer || this.paramsSerializer;
    if (opts.params && Object.keys(opts.params).length > 0) {
      let additionalQueryParams = opts.paramsSerializer(opts.params);
      if (additionalQueryParams.startsWith("?")) {
        additionalQueryParams = additionalQueryParams.slice(1);
      }
      const prefix = opts.url.toString().includes("?") ? "&" : "?";
      opts.url = opts.url + prefix + additionalQueryParams;
    }
    if (typeof options.maxContentLength === "number") {
      opts.size = options.maxContentLength;
    }
    if (typeof options.maxRedirects === "number") {
      opts.follow = options.maxRedirects;
    }
    opts.headers = opts.headers || {};
    if (opts.multipart === void 0 && opts.data) {
      const isFormData = typeof FormData === "undefined" ? false : (opts === null || opts === void 0 ? void 0 : opts.data) instanceof FormData;
      if (is_stream_1.default.readable(opts.data)) {
        opts.body = opts.data;
      } else if (hasBuffer() && Buffer.isBuffer(opts.data)) {
        opts.body = opts.data;
        if (!hasHeader(opts, "Content-Type")) {
          opts.headers["Content-Type"] = "application/json";
        }
      } else if (typeof opts.data === "object") {
        if (!isFormData) {
          if (getHeader(opts, "content-type") === "application/x-www-form-urlencoded") {
            opts.body = opts.paramsSerializer(opts.data);
          } else {
            if (!hasHeader(opts, "Content-Type")) {
              opts.headers["Content-Type"] = "application/json";
            }
            opts.body = JSON.stringify(opts.data);
          }
        }
      } else {
        opts.body = opts.data;
      }
    } else if (opts.multipart && opts.multipart.length > 0) {
      const boundary = (0, uuid_1.v4)();
      opts.headers["Content-Type"] = `multipart/related; boundary=${boundary}`;
      const bodyStream = new stream_1.PassThrough();
      opts.body = bodyStream;
      (0, stream_1.pipeline)(this.getMultipartRequest(opts.multipart, boundary), bodyStream, () => {
      });
    }
    opts.validateStatus = opts.validateStatus || this.validateStatus;
    opts.responseType = opts.responseType || "unknown";
    if (!opts.headers["Accept"] && opts.responseType === "json") {
      opts.headers["Accept"] = "application/json";
    }
    opts.method = opts.method || "GET";
    const proxy = opts.proxy || ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.HTTPS_PROXY) || ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.https_proxy) || ((_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.HTTP_PROXY) || ((_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.http_proxy);
    const urlMayUseProxy = __classPrivateFieldGet(this, _Gaxios_instances, "m", _Gaxios_urlMayUseProxy).call(this, opts.url, opts.noProxy);
    if (opts.agent) ;
    else if (proxy && urlMayUseProxy) {
      const HttpsProxyAgent = await __classPrivateFieldGet(_a, _a, "m", _Gaxios_getProxyAgent).call(_a);
      if (this.agentCache.has(proxy)) {
        opts.agent = this.agentCache.get(proxy);
      } else {
        opts.agent = new HttpsProxyAgent(proxy, {
          cert: opts.cert,
          key: opts.key
        });
        this.agentCache.set(proxy, opts.agent);
      }
    } else if (opts.cert && opts.key) {
      if (this.agentCache.has(opts.key)) {
        opts.agent = this.agentCache.get(opts.key);
      } else {
        opts.agent = new https_1.Agent({
          cert: opts.cert,
          key: opts.key
        });
        this.agentCache.set(opts.key, opts.agent);
      }
    }
    if (typeof opts.errorRedactor !== "function" && opts.errorRedactor !== false) {
      opts.errorRedactor = common_1.defaultErrorRedactor;
    }
    return opts;
  }, _Gaxios_getProxyAgent = async function _Gaxios_getProxyAgent2() {
    __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _Gaxios_proxyAgent) || (await Promise.resolve().then(() => __importStar(requireDist()))).HttpsProxyAgent, "f", _Gaxios_proxyAgent);
    return __classPrivateFieldGet(this, _a, "f", _Gaxios_proxyAgent);
  };
  _Gaxios_proxyAgent = { value: void 0 };
  return gaxios;
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
    exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
    exports.request = request;
    const gaxios_1 = requireGaxios();
    Object.defineProperty(exports, "Gaxios", { enumerable: true, get: function() {
      return gaxios_1.Gaxios;
    } });
    var common_1 = requireCommon();
    Object.defineProperty(exports, "GaxiosError", { enumerable: true, get: function() {
      return common_1.GaxiosError;
    } });
    __exportStar(requireInterceptor(), exports);
    exports.instance = new gaxios_1.Gaxios();
    async function request(opts) {
      return exports.instance.request(opts);
    }
  })(src);
  return src;
}
export {
  requireSrc$1 as a,
  requireSrc as b,
  requireSrc$2 as c,
  requireSrc$3 as r
};
