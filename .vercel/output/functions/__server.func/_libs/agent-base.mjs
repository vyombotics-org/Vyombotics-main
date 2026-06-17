import require$$0$1 from "net";
import require$$0 from "http";
import require$$1 from "https";
import require$$0$2 from "events";
import { r as requireSrc$2 } from "./debug.mjs";
var dist = {};
var helpers = {};
var hasRequiredHelpers;
function requireHelpers() {
  if (hasRequiredHelpers) return helpers;
  hasRequiredHelpers = 1;
  var __createBinding = helpers && helpers.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
  var __setModuleDefault = helpers && helpers.__setModuleDefault || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
    o["default"] = v;
  });
  var __importStar = helpers && helpers.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(helpers, "__esModule", { value: true });
  helpers.req = helpers.json = helpers.toBuffer = void 0;
  const http = __importStar(require$$0);
  const https = __importStar(require$$1);
  async function toBuffer(stream) {
    let length = 0;
    const chunks = [];
    for await (const chunk of stream) {
      length += chunk.length;
      chunks.push(chunk);
    }
    return Buffer.concat(chunks, length);
  }
  helpers.toBuffer = toBuffer;
  async function json(stream) {
    const buf = await toBuffer(stream);
    const str = buf.toString("utf8");
    try {
      return JSON.parse(str);
    } catch (_err) {
      const err = _err;
      err.message += ` (input: ${str})`;
      throw err;
    }
  }
  helpers.json = json;
  function req(url, opts = {}) {
    const href = typeof url === "string" ? url : url.href;
    const req2 = (href.startsWith("https:") ? https : http).request(url, opts);
    const promise = new Promise((resolve, reject) => {
      req2.once("response", resolve).once("error", reject).end();
    });
    req2.then = promise.then.bind(promise);
    return req2;
  }
  helpers.req = req;
  return helpers;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    var __createBinding = dist && dist.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
    var __setModuleDefault = dist && dist.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = dist && dist.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = dist && dist.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Agent = void 0;
    const net = __importStar(require$$0$1);
    const http = __importStar(require$$0);
    const https_1 = require$$1;
    __exportStar(requireHelpers(), exports);
    const INTERNAL = /* @__PURE__ */ Symbol("AgentBaseInternalState");
    class Agent extends http.Agent {
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name]) {
          this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
          return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name, fakeSocket);
          if (socket instanceof http.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    }
    exports.Agent = Agent;
  })(dist);
  return dist;
}
var promisify$1 = {};
var hasRequiredPromisify$1;
function requirePromisify$1() {
  if (hasRequiredPromisify$1) return promisify$1;
  hasRequiredPromisify$1 = 1;
  Object.defineProperty(promisify$1, "__esModule", { value: true });
  function promisify2(fn) {
    return function(req, opts) {
      return new Promise((resolve, reject) => {
        fn.call(this, req, opts, (err, rtn) => {
          if (err) {
            reject(err);
          } else {
            resolve(rtn);
          }
        });
      });
    };
  }
  promisify$1.default = promisify2;
  return promisify$1;
}
var src$1;
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  var __importDefault = src$1 && src$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  const events_1 = require$$0$2;
  const debug_1 = __importDefault(requireSrc$2());
  const promisify_1 = __importDefault(requirePromisify$1());
  const debug = debug_1.default("agent-base");
  function isAgent(v) {
    return Boolean(v) && typeof v.addRequest === "function";
  }
  function isSecureEndpoint() {
    const { stack } = new Error();
    if (typeof stack !== "string")
      return false;
    return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
  }
  function createAgent(callback, opts) {
    return new createAgent.Agent(callback, opts);
  }
  (function(createAgent2) {
    class Agent extends events_1.EventEmitter {
      constructor(callback, _opts) {
        super();
        let opts = _opts;
        if (typeof callback === "function") {
          this.callback = callback;
        } else if (callback) {
          opts = callback;
        }
        this.timeout = null;
        if (opts && typeof opts.timeout === "number") {
          this.timeout = opts.timeout;
        }
        this.maxFreeSockets = 1;
        this.maxSockets = 1;
        this.maxTotalSockets = Infinity;
        this.sockets = {};
        this.freeSockets = {};
        this.requests = {};
        this.options = {};
      }
      get defaultPort() {
        if (typeof this.explicitDefaultPort === "number") {
          return this.explicitDefaultPort;
        }
        return isSecureEndpoint() ? 443 : 80;
      }
      set defaultPort(v) {
        this.explicitDefaultPort = v;
      }
      get protocol() {
        if (typeof this.explicitProtocol === "string") {
          return this.explicitProtocol;
        }
        return isSecureEndpoint() ? "https:" : "http:";
      }
      set protocol(v) {
        this.explicitProtocol = v;
      }
      callback(req, opts, fn) {
        throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
      }
      /**
       * Called by node-core's "_http_client.js" module when creating
       * a new HTTP request with this Agent instance.
       *
       * @api public
       */
      addRequest(req, _opts) {
        const opts = Object.assign({}, _opts);
        if (typeof opts.secureEndpoint !== "boolean") {
          opts.secureEndpoint = isSecureEndpoint();
        }
        if (opts.host == null) {
          opts.host = "localhost";
        }
        if (opts.port == null) {
          opts.port = opts.secureEndpoint ? 443 : 80;
        }
        if (opts.protocol == null) {
          opts.protocol = opts.secureEndpoint ? "https:" : "http:";
        }
        if (opts.host && opts.path) {
          delete opts.path;
        }
        delete opts.agent;
        delete opts.hostname;
        delete opts._defaultAgent;
        delete opts.defaultPort;
        delete opts.createConnection;
        req._last = true;
        req.shouldKeepAlive = false;
        let timedOut = false;
        let timeoutId = null;
        const timeoutMs = opts.timeout || this.timeout;
        const onerror = (err) => {
          if (req._hadError)
            return;
          req.emit("error", err);
          req._hadError = true;
        };
        const ontimeout = () => {
          timeoutId = null;
          timedOut = true;
          const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
          err.code = "ETIMEOUT";
          onerror(err);
        };
        const callbackError = (err) => {
          if (timedOut)
            return;
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          onerror(err);
        };
        const onsocket = (socket) => {
          if (timedOut)
            return;
          if (timeoutId != null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          if (isAgent(socket)) {
            debug("Callback returned another Agent instance %o", socket.constructor.name);
            socket.addRequest(req, opts);
            return;
          }
          if (socket) {
            socket.once("free", () => {
              this.freeSocket(socket, opts);
            });
            req.onSocket(socket);
            return;
          }
          const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
          onerror(err);
        };
        if (typeof this.callback !== "function") {
          onerror(new Error("`callback` is not defined"));
          return;
        }
        if (!this.promisifiedCallback) {
          if (this.callback.length >= 3) {
            debug("Converting legacy callback function to promise");
            this.promisifiedCallback = promisify_1.default(this.callback);
          } else {
            this.promisifiedCallback = this.callback;
          }
        }
        if (typeof timeoutMs === "number" && timeoutMs > 0) {
          timeoutId = setTimeout(ontimeout, timeoutMs);
        }
        if ("port" in opts && typeof opts.port !== "number") {
          opts.port = Number(opts.port);
        }
        try {
          debug("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
          Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
        } catch (err) {
          Promise.reject(err).catch(callbackError);
        }
      }
      freeSocket(socket, opts) {
        debug("Freeing socket %o %o", socket.constructor.name, opts);
        socket.destroy();
      }
      destroy() {
        debug("Destroying agent %o", this.constructor.name);
      }
    }
    createAgent2.Agent = Agent;
    createAgent2.prototype = createAgent2.Agent.prototype;
  })(createAgent || (createAgent = {}));
  src$1 = createAgent;
  return src$1;
}
var promisify = {};
var hasRequiredPromisify;
function requirePromisify() {
  if (hasRequiredPromisify) return promisify;
  hasRequiredPromisify = 1;
  Object.defineProperty(promisify, "__esModule", { value: true });
  function promisify$12(fn) {
    return function(req, opts) {
      return new Promise((resolve, reject) => {
        fn.call(this, req, opts, (err, rtn) => {
          if (err) {
            reject(err);
          } else {
            resolve(rtn);
          }
        });
      });
    };
  }
  promisify.default = promisify$12;
  return promisify;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  var __importDefault = src && src.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  const events_1 = require$$0$2;
  const debug_1 = __importDefault(requireSrc$2());
  const promisify_1 = __importDefault(requirePromisify());
  const debug = debug_1.default("agent-base");
  function isAgent(v) {
    return Boolean(v) && typeof v.addRequest === "function";
  }
  function isSecureEndpoint() {
    const { stack } = new Error();
    if (typeof stack !== "string")
      return false;
    return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
  }
  function createAgent(callback, opts) {
    return new createAgent.Agent(callback, opts);
  }
  (function(createAgent2) {
    class Agent extends events_1.EventEmitter {
      constructor(callback, _opts) {
        super();
        let opts = _opts;
        if (typeof callback === "function") {
          this.callback = callback;
        } else if (callback) {
          opts = callback;
        }
        this.timeout = null;
        if (opts && typeof opts.timeout === "number") {
          this.timeout = opts.timeout;
        }
        this.maxFreeSockets = 1;
        this.maxSockets = 1;
        this.maxTotalSockets = Infinity;
        this.sockets = {};
        this.freeSockets = {};
        this.requests = {};
        this.options = {};
      }
      get defaultPort() {
        if (typeof this.explicitDefaultPort === "number") {
          return this.explicitDefaultPort;
        }
        return isSecureEndpoint() ? 443 : 80;
      }
      set defaultPort(v) {
        this.explicitDefaultPort = v;
      }
      get protocol() {
        if (typeof this.explicitProtocol === "string") {
          return this.explicitProtocol;
        }
        return isSecureEndpoint() ? "https:" : "http:";
      }
      set protocol(v) {
        this.explicitProtocol = v;
      }
      callback(req, opts, fn) {
        throw new Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
      }
      /**
       * Called by node-core's "_http_client.js" module when creating
       * a new HTTP request with this Agent instance.
       *
       * @api public
       */
      addRequest(req, _opts) {
        const opts = Object.assign({}, _opts);
        if (typeof opts.secureEndpoint !== "boolean") {
          opts.secureEndpoint = isSecureEndpoint();
        }
        if (opts.host == null) {
          opts.host = "localhost";
        }
        if (opts.port == null) {
          opts.port = opts.secureEndpoint ? 443 : 80;
        }
        if (opts.protocol == null) {
          opts.protocol = opts.secureEndpoint ? "https:" : "http:";
        }
        if (opts.host && opts.path) {
          delete opts.path;
        }
        delete opts.agent;
        delete opts.hostname;
        delete opts._defaultAgent;
        delete opts.defaultPort;
        delete opts.createConnection;
        req._last = true;
        req.shouldKeepAlive = false;
        let timedOut = false;
        let timeoutId = null;
        const timeoutMs = opts.timeout || this.timeout;
        const onerror = (err) => {
          if (req._hadError)
            return;
          req.emit("error", err);
          req._hadError = true;
        };
        const ontimeout = () => {
          timeoutId = null;
          timedOut = true;
          const err = new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
          err.code = "ETIMEOUT";
          onerror(err);
        };
        const callbackError = (err) => {
          if (timedOut)
            return;
          if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          onerror(err);
        };
        const onsocket = (socket) => {
          if (timedOut)
            return;
          if (timeoutId != null) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          if (isAgent(socket)) {
            debug("Callback returned another Agent instance %o", socket.constructor.name);
            socket.addRequest(req, opts);
            return;
          }
          if (socket) {
            socket.once("free", () => {
              this.freeSocket(socket, opts);
            });
            req.onSocket(socket);
            return;
          }
          const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
          onerror(err);
        };
        if (typeof this.callback !== "function") {
          onerror(new Error("`callback` is not defined"));
          return;
        }
        if (!this.promisifiedCallback) {
          if (this.callback.length >= 3) {
            debug("Converting legacy callback function to promise");
            this.promisifiedCallback = promisify_1.default(this.callback);
          } else {
            this.promisifiedCallback = this.callback;
          }
        }
        if (typeof timeoutMs === "number" && timeoutMs > 0) {
          timeoutId = setTimeout(ontimeout, timeoutMs);
        }
        if ("port" in opts && typeof opts.port !== "number") {
          opts.port = Number(opts.port);
        }
        try {
          debug("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
          Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
        } catch (err) {
          Promise.reject(err).catch(callbackError);
        }
      }
      freeSocket(socket, opts) {
        debug("Freeing socket %o %o", socket.constructor.name, opts);
        socket.destroy();
      }
      destroy() {
        debug("Destroying agent %o", this.constructor.name);
      }
    }
    createAgent2.Agent = Agent;
    createAgent2.prototype = createAgent2.Agent.prototype;
  })(createAgent || (createAgent = {}));
  src = createAgent;
  return src;
}
export {
  requireSrc as a,
  requireSrc$1 as b,
  requireDist as r
};
