import { r as requireIndex_min } from "./lru-cache.mjs";
import require$$0 from "events";
import { r as requireLodash_clonedeep } from "./lodash.clonedeep.mjs";
var async = {};
var freeze = {};
var hasRequiredFreeze;
function requireFreeze() {
  if (hasRequiredFreeze) return freeze;
  hasRequiredFreeze = 1;
  Object.defineProperty(freeze, "__esModule", { value: true });
  freeze.deepFreeze = void 0;
  function deepFreeze(o) {
    if (o) {
      Object.freeze(o);
      Object.getOwnPropertyNames(o).forEach(function(prop) {
        if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && o[prop].constructor !== Buffer && !Object.isFrozen(o[prop])) {
          deepFreeze(o[prop]);
        }
      });
    }
    return o;
  }
  freeze.deepFreeze = deepFreeze;
  return freeze;
}
var sync = {};
var hasRequiredSync;
function requireSync() {
  if (hasRequiredSync) return sync;
  hasRequiredSync = 1;
  var __importDefault = sync && sync.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(sync, "__esModule", { value: true });
  sync.syncMemoizer = void 0;
  const lru_cache_1 = /* @__PURE__ */ requireIndex_min();
  const events_1 = require$$0;
  const lodash_clonedeep_1 = __importDefault(requireLodash_clonedeep());
  const freeze_1 = requireFreeze();
  function syncMemoizer(options) {
    const cache = new lru_cache_1.LRUCache(options);
    const load = options.load;
    const hash = options.hash;
    const bypass = options.bypass;
    const itemTTL = options.itemTTL;
    const freeze2 = options.freeze;
    const clone = options.clone;
    const emitter = new events_1.EventEmitter();
    const defaultResult = Object.assign({
      del,
      reset: () => cache.clear(),
      keys: () => [...cache.keys()],
      on: emitter.on.bind(emitter),
      once: emitter.once.bind(emitter)
    }, options);
    if (options.disable) {
      return Object.assign(load, defaultResult);
    }
    function del() {
      const key = hash(...arguments);
      cache.delete(key);
    }
    function emit(event, ...parameters) {
      emitter.emit(event, ...parameters);
    }
    function isPromise(result2) {
      return result2 && result2.then && typeof result2.then === "function";
    }
    function processResult(result2) {
      let res = result2;
      if (clone) {
        if (isPromise(res)) {
          res = res.then(lodash_clonedeep_1.default);
        } else {
          res = (0, lodash_clonedeep_1.default)(res);
        }
      }
      if (freeze2) {
        if (isPromise(res)) {
          res = res.then(freeze_1.deepFreeze);
        } else {
          (0, freeze_1.deepFreeze)(res);
        }
      }
      return res;
    }
    const result = function(...args) {
      if (bypass && bypass(...args)) {
        emit("miss", ...args);
        return load(...args);
      }
      var key = hash(...args);
      var fromCache = cache.get(key);
      if (fromCache) {
        emit("hit", ...args);
        return processResult(fromCache);
      }
      emit("miss", ...args);
      const result2 = load(...args);
      if (itemTTL) {
        cache.set(key, result2, { ttl: itemTTL(...args.concat([result2])) });
      } else {
        cache.set(key, result2);
      }
      return processResult(result2);
    };
    return Object.assign(result, defaultResult);
  }
  sync.syncMemoizer = syncMemoizer;
  return sync;
}
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  var __importDefault = async && async.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(async, "__esModule", { value: true });
  async.asyncMemoizer = void 0;
  const lru_cache_1 = /* @__PURE__ */ requireIndex_min();
  const events_1 = require$$0;
  const lodash_clonedeep_1 = __importDefault(requireLodash_clonedeep());
  const freeze_1 = requireFreeze();
  const sync_1 = requireSync();
  function asyncMemoizer(options) {
    const cache = new lru_cache_1.LRUCache(options);
    const load = options.load;
    const hash = options.hash;
    const bypass = options.bypass;
    const itemTTL = options.itemTTL;
    const freeze2 = options.freeze;
    const clone = options.clone;
    const queueTTL = options.queueTTL || 1e3;
    const loading = /* @__PURE__ */ new Map();
    const emitter = new events_1.EventEmitter();
    const memoizerMethods = Object.assign({
      del,
      reset: () => cache.clear(),
      keys: () => [...cache.keys()],
      on: emitter.on.bind(emitter),
      once: emitter.once.bind(emitter)
    }, options);
    if (options.disable) {
      return Object.assign(load, memoizerMethods);
    }
    function del(...args) {
      const key = hash(...args);
      cache.delete(key);
    }
    function add(key, parameters, result) {
      if (freeze2) {
        result.forEach(freeze_1.deepFreeze);
      }
      if (itemTTL) {
        cache.set(key, result, { ttl: itemTTL(...parameters.concat(result)) });
      } else {
        cache.set(key, result);
      }
    }
    function runCallbacks(callbacks, args) {
      for (const callback of callbacks) {
        if (clone) {
          setImmediate(callback, ...args.map(lodash_clonedeep_1.default));
        } else {
          setImmediate(callback, ...args);
        }
      }
    }
    function emit(event, ...parameters) {
      emitter.emit(event, ...parameters);
    }
    function memoizedFunction(...args) {
      const parameters = args.slice(0, -1);
      const callback = args.slice(-1).pop();
      let key;
      if (bypass && bypass(...parameters)) {
        emit("miss", ...parameters);
        return load(...args);
      }
      if (parameters.length === 0 && !hash) {
        key = "_";
      } else {
        key = hash(...parameters);
      }
      const fromCache = cache.get(key);
      if (fromCache) {
        emit("hit", ...parameters);
        return runCallbacks([callback], [null].concat(fromCache));
      }
      const pendingLoad = loading.get(key);
      if (pendingLoad && pendingLoad.expiresAt > Date.now()) {
        pendingLoad.queue.push(callback);
        emit("queue", ...parameters);
        return;
      }
      emit("miss", ...parameters);
      const started = Date.now();
      const queue = [callback];
      loading.set(key, {
        queue,
        expiresAt: started + queueTTL
      });
      const loadHandler = (...args2) => {
        const err = args2[0];
        if (!err) {
          add(key, parameters, args2.slice(1));
        }
        loading.delete(key);
        emit("loaded", Date.now() - started, ...parameters);
        runCallbacks(queue, args2);
      };
      load(...parameters, loadHandler);
    }
    return Object.assign(memoizedFunction, memoizerMethods);
  }
  async.asyncMemoizer = asyncMemoizer;
  asyncMemoizer.sync = sync_1.syncMemoizer;
  return async;
}
var lib;
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  const async_1 = requireAsync();
  lib = async_1.asyncMemoizer;
  return lib;
}
export {
  requireLib as r
};
