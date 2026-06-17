import { r as require$$0$1 } from "./node-fetch.mjs";
import require$$0$2 from "stream";
import { r as requireDist$2 } from "./uuid.mjs";
import require$$0 from "http";
import require$$1 from "https";
import Url from "url";
import { r as requireDist } from "./http-proxy-agent.mjs";
import { a as requireDist$1 } from "./https-proxy-agent.mjs";
import { r as requireStreamEvents } from "./stream-events.mjs";
import require$$1$1 from "querystring";
var src = {};
var agents = {};
var hasRequiredAgents;
function requireAgents() {
  if (hasRequiredAgents) return agents;
  hasRequiredAgents = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAgent = exports.pool = void 0;
    const http_1 = require$$0;
    const https_1 = require$$1;
    const url_1 = Url;
    exports.pool = /* @__PURE__ */ new Map();
    function shouldUseProxyForURI(uri) {
      const noProxyEnv = process.env.NO_PROXY || process.env.no_proxy;
      if (!noProxyEnv) {
        return true;
      }
      const givenURI = new URL(uri);
      for (const noProxyRaw of noProxyEnv.split(",")) {
        const noProxy = noProxyRaw.trim();
        if (noProxy === givenURI.origin || noProxy === givenURI.hostname) {
          return false;
        } else if (noProxy.startsWith("*.") || noProxy.startsWith(".")) {
          const noProxyWildcard = noProxy.replace(/^\*\./, ".");
          if (givenURI.hostname.endsWith(noProxyWildcard)) {
            return false;
          }
        }
      }
      return true;
    }
    function getAgent(uri, reqOpts) {
      const isHttp = uri.startsWith("http://");
      const proxy = reqOpts.proxy || process.env.HTTP_PROXY || process.env.http_proxy || process.env.HTTPS_PROXY || process.env.https_proxy;
      const poolOptions = Object.assign({}, reqOpts.pool);
      const manuallyProvidedProxy = !!reqOpts.proxy;
      const shouldUseProxy = manuallyProvidedProxy || shouldUseProxyForURI(uri);
      if (proxy && shouldUseProxy) {
        const Agent = isHttp ? requireDist() : requireDist$1();
        const proxyOpts = { ...(0, url_1.parse)(proxy), ...poolOptions };
        return new Agent(proxyOpts);
      }
      let key = isHttp ? "http" : "https";
      if (reqOpts.forever) {
        key += ":forever";
        if (!exports.pool.has(key)) {
          const Agent = isHttp ? http_1.Agent : https_1.Agent;
          exports.pool.set(key, new Agent({ ...poolOptions, keepAlive: true }));
        }
      }
      return exports.pool.get(key);
    }
    exports.getAgent = getAgent;
  })(agents);
  return agents;
}
var TeenyStatistics = {};
var hasRequiredTeenyStatistics;
function requireTeenyStatistics() {
  if (hasRequiredTeenyStatistics) return TeenyStatistics;
  hasRequiredTeenyStatistics = 1;
  Object.defineProperty(TeenyStatistics, "__esModule", { value: true });
  TeenyStatistics.TeenyStatistics = TeenyStatistics.TeenyStatisticsWarning = void 0;
  class TeenyStatisticsWarning extends Error {
    /**
     * @param {string} message
     */
    constructor(message) {
      super(message);
      this.threshold = 0;
      this.type = "";
      this.value = 0;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  TeenyStatistics.TeenyStatisticsWarning = TeenyStatisticsWarning;
  TeenyStatisticsWarning.CONCURRENT_REQUESTS = "ConcurrentRequestsExceededWarning";
  let TeenyStatistics$1 = class TeenyStatistics2 {
    /**
     * @param {TeenyStatisticsOptions} [opts]
     */
    constructor(opts) {
      this._concurrentRequests = 0;
      this._didConcurrentRequestWarn = false;
      this._options = TeenyStatistics2._prepareOptions(opts);
    }
    /**
     * Returns a copy of the current options.
     * @return {TeenyStatisticsOptions}
     */
    getOptions() {
      return Object.assign({}, this._options);
    }
    /**
     * Change configured statistics options. This will not preserve unspecified
     *   options that were previously specified, i.e. this is a reset of options.
     * @param {TeenyStatisticsOptions} [opts]
     * @returns {TeenyStatisticsConfig} The previous options.
     * @see _prepareOptions
     */
    setOptions(opts) {
      const oldOpts = this._options;
      this._options = TeenyStatistics2._prepareOptions(opts);
      return oldOpts;
    }
    /**
     * @readonly
     * @return {TeenyStatisticsCounters}
     */
    get counters() {
      return {
        concurrentRequests: this._concurrentRequests
      };
    }
    /**
     * @description Should call this right before making a request.
     */
    requestStarting() {
      this._concurrentRequests++;
      if (this._options.concurrentRequests > 0 && this._concurrentRequests >= this._options.concurrentRequests && !this._didConcurrentRequestWarn) {
        this._didConcurrentRequestWarn = true;
        const warning = new TeenyStatisticsWarning("Possible excessive concurrent requests detected. " + this._concurrentRequests + " requests in-flight, which exceeds the configured threshold of " + this._options.concurrentRequests + ". Use the TEENY_REQUEST_WARN_CONCURRENT_REQUESTS environment variable or the concurrentRequests option of teeny-request to increase or disable (0) this warning.");
        warning.type = TeenyStatisticsWarning.CONCURRENT_REQUESTS;
        warning.value = this._concurrentRequests;
        warning.threshold = this._options.concurrentRequests;
        process.emitWarning(warning);
      }
    }
    /**
     * @description When using `requestStarting`, call this after the request
     *   has finished.
     */
    requestFinished() {
      this._concurrentRequests--;
    }
    /**
     * Configuration Precedence:
     *   1. Dependency inversion via defined option.
     *   2. Global numeric environment variable.
     *   3. Built-in default.
     * This will not preserve unspecified options previously specified.
     * @param {TeenyStatisticsOptions} [opts]
     * @returns {TeenyStatisticsOptions}
     * @private
     */
    static _prepareOptions({ concurrentRequests: diConcurrentRequests } = {}) {
      let concurrentRequests = this.DEFAULT_WARN_CONCURRENT_REQUESTS;
      const envConcurrentRequests = Number(process.env.TEENY_REQUEST_WARN_CONCURRENT_REQUESTS);
      if (diConcurrentRequests !== void 0) {
        concurrentRequests = diConcurrentRequests;
      } else if (!Number.isNaN(envConcurrentRequests)) {
        concurrentRequests = envConcurrentRequests;
      }
      return { concurrentRequests };
    }
  };
  TeenyStatistics.TeenyStatistics = TeenyStatistics$1;
  TeenyStatistics$1.DEFAULT_WARN_CONCURRENT_REQUESTS = 5e3;
  return TeenyStatistics;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  Object.defineProperty(src, "__esModule", { value: true });
  src.teenyRequest = src.RequestError = void 0;
  const node_fetch_1 = require$$0$1;
  const stream_1 = require$$0$2;
  const uuid = /* @__PURE__ */ requireDist$2();
  const agents_1 = requireAgents();
  const TeenyStatistics_1 = requireTeenyStatistics();
  const streamEvents = requireStreamEvents();
  class RequestError extends Error {
  }
  src.RequestError = RequestError;
  function requestToFetchOptions(reqOpts) {
    const options = {
      method: reqOpts.method || "GET",
      ...reqOpts.timeout && { timeout: reqOpts.timeout },
      ...typeof reqOpts.gzip === "boolean" && { compress: reqOpts.gzip }
    };
    if (typeof reqOpts.json === "object") {
      reqOpts.headers = reqOpts.headers || {};
      reqOpts.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(reqOpts.json);
    } else {
      if (Buffer.isBuffer(reqOpts.body)) {
        options.body = reqOpts.body;
      } else if (typeof reqOpts.body !== "string") {
        options.body = JSON.stringify(reqOpts.body);
      } else {
        options.body = reqOpts.body;
      }
    }
    options.headers = reqOpts.headers;
    let uri = reqOpts.uri || reqOpts.url;
    if (!uri) {
      throw new Error("Missing uri or url in reqOpts.");
    }
    if (reqOpts.useQuerystring === true || typeof reqOpts.qs === "object") {
      const qs = require$$1$1;
      const params = qs.stringify(reqOpts.qs);
      uri = uri + "?" + params;
    }
    options.agent = (0, agents_1.getAgent)(uri, reqOpts);
    return { uri, options };
  }
  function fetchToRequestResponse(opts, res) {
    const request = {};
    request.agent = opts.agent || false;
    request.headers = opts.headers || {};
    request.href = res.url;
    const resHeaders = {};
    res.headers.forEach((value, key) => resHeaders[key] = value);
    const response = Object.assign(res.body, {
      statusCode: res.status,
      statusMessage: res.statusText,
      request,
      body: res.body,
      headers: resHeaders,
      toJSON: () => ({ headers: resHeaders })
    });
    return response;
  }
  function createMultipartStream(boundary, multipart) {
    const finale = `--${boundary}--`;
    const stream = new stream_1.PassThrough();
    for (const part of multipart) {
      const preamble = `--${boundary}\r
Content-Type: ${part["Content-Type"]}\r
\r
`;
      stream.write(preamble);
      if (typeof part.body === "string") {
        stream.write(part.body);
        stream.write("\r\n");
      } else {
        part.body.pipe(stream, { end: false });
        part.body.on("end", () => {
          stream.write("\r\n");
          stream.write(finale);
          stream.end();
        });
      }
    }
    return stream;
  }
  function teenyRequest(reqOpts, callback) {
    const { uri, options } = requestToFetchOptions(reqOpts);
    const multipart = reqOpts.multipart;
    if (reqOpts.multipart && multipart.length === 2) {
      if (!callback) {
        throw new Error("Multipart without callback is not implemented.");
      }
      const boundary = uuid.v4();
      options.headers["Content-Type"] = `multipart/related; boundary=${boundary}`;
      options.body = createMultipartStream(boundary, multipart);
      teenyRequest.stats.requestStarting();
      (0, node_fetch_1.default)(uri, options).then((res) => {
        teenyRequest.stats.requestFinished();
        const header = res.headers.get("content-type");
        const response = fetchToRequestResponse(options, res);
        const body = response.body;
        if (header === "application/json" || header === "application/json; charset=utf-8") {
          res.json().then((json) => {
            response.body = json;
            callback(null, response, json);
          }, (err) => {
            callback(err, response, body);
          });
          return;
        }
        res.text().then((text) => {
          response.body = text;
          callback(null, response, text);
        }, (err) => {
          callback(err, response, body);
        });
      }, (err) => {
        teenyRequest.stats.requestFinished();
        callback(err, null, null);
      });
      return;
    }
    if (callback === void 0) {
      const requestStream = streamEvents(new stream_1.PassThrough());
      let responseStream;
      requestStream.once("reading", () => {
        if (responseStream) {
          (0, stream_1.pipeline)(responseStream, requestStream, () => {
          });
        } else {
          requestStream.once("response", () => {
            (0, stream_1.pipeline)(responseStream, requestStream, () => {
            });
          });
        }
      });
      options.compress = false;
      teenyRequest.stats.requestStarting();
      (0, node_fetch_1.default)(uri, options).then((res) => {
        teenyRequest.stats.requestFinished();
        responseStream = res.body;
        responseStream.on("error", (err) => {
          requestStream.emit("error", err);
        });
        const response = fetchToRequestResponse(options, res);
        requestStream.emit("response", response);
      }, (err) => {
        teenyRequest.stats.requestFinished();
        requestStream.emit("error", err);
      });
      return requestStream;
    }
    teenyRequest.stats.requestStarting();
    (0, node_fetch_1.default)(uri, options).then((res) => {
      teenyRequest.stats.requestFinished();
      const header = res.headers.get("content-type");
      const response = fetchToRequestResponse(options, res);
      const body = response.body;
      if (header === "application/json" || header === "application/json; charset=utf-8") {
        if (response.statusCode === 204) {
          callback(null, response, body);
          return;
        }
        res.json().then((json) => {
          response.body = json;
          callback(null, response, json);
        }, (err) => {
          callback(err, response, body);
        });
        return;
      }
      res.text().then((text) => {
        const response2 = fetchToRequestResponse(options, res);
        response2.body = text;
        callback(null, response2, text);
      }, (err) => {
        callback(err, response, body);
      });
    }, (err) => {
      teenyRequest.stats.requestFinished();
      callback(err, null, null);
    });
    return;
  }
  src.teenyRequest = teenyRequest;
  teenyRequest.defaults = (defaults) => {
    return (reqOpts, callback) => {
      const opts = { ...defaults, ...reqOpts };
      if (callback === void 0) {
        return teenyRequest(opts);
      }
      teenyRequest(opts, callback);
    };
  };
  teenyRequest.stats = new TeenyStatistics_1.TeenyStatistics();
  teenyRequest.resetStats = () => {
    teenyRequest.stats = new TeenyStatistics_1.TeenyStatistics(teenyRequest.stats.getOptions());
  };
  return src;
}
export {
  requireSrc as r
};
