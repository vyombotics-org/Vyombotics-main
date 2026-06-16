import { r as requireArrify } from "./arrify.mjs";
import { r as requireExtend } from "./extend.mjs";
import require$$0 from "stream";
var src = {};
var resourceStream = {};
var hasRequiredResourceStream;
function requireResourceStream() {
  if (hasRequiredResourceStream) return resourceStream;
  hasRequiredResourceStream = 1;
  Object.defineProperty(resourceStream, "__esModule", { value: true });
  resourceStream.ResourceStream = void 0;
  const stream_1 = require$$0;
  class ResourceStream extends stream_1.Transform {
    constructor(args, requestFn) {
      const options = Object.assign({ objectMode: true }, args.streamOptions);
      super(options);
      this._ended = false;
      this._maxApiCalls = args.maxApiCalls === -1 ? Infinity : args.maxApiCalls;
      this._nextQuery = args.query;
      this._reading = false;
      this._requestFn = requestFn;
      this._requestsMade = 0;
      this._resultsToSend = args.maxResults === -1 ? Infinity : args.maxResults;
      this._otherArgs = [];
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    end(...args) {
      this._ended = true;
      return super.end(...args);
    }
    _read() {
      if (this._reading) {
        return;
      }
      this._reading = true;
      try {
        this._requestFn(this._nextQuery, (err, results, nextQuery, ...otherArgs) => {
          if (err) {
            this.destroy(err);
            return;
          }
          this._otherArgs = otherArgs;
          this._nextQuery = nextQuery;
          if (this._resultsToSend !== Infinity) {
            results = results.splice(0, this._resultsToSend);
            this._resultsToSend -= results.length;
          }
          let more = true;
          for (const result of results) {
            if (this._ended) {
              break;
            }
            more = this.push(result);
          }
          const isFinished = !this._nextQuery || this._resultsToSend < 1;
          const madeMaxCalls = ++this._requestsMade >= this._maxApiCalls;
          if (isFinished || madeMaxCalls) {
            this.end();
          }
          if (more && !this._ended) {
            setImmediate(() => this._read());
          }
          this._reading = false;
        });
      } catch (e) {
        this.destroy(e);
      }
    }
  }
  resourceStream.ResourceStream = ResourceStream;
  return resourceStream;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceStream = exports.paginator = exports.Paginator = void 0;
    const arrify = requireArrify();
    const extend = requireExtend();
    const resource_stream_1 = requireResourceStream();
    Object.defineProperty(exports, "ResourceStream", { enumerable: true, get: function() {
      return resource_stream_1.ResourceStream;
    } });
    class Paginator {
      /**
       * Cache the original method, then overwrite it on the Class's prototype.
       *
       * @param {function} Class - The parent class of the methods to extend.
       * @param {string|string[]} methodNames - Name(s) of the methods to extend.
       */
      // tslint:disable-next-line:variable-name
      extend(Class, methodNames) {
        methodNames = arrify(methodNames);
        methodNames.forEach((methodName) => {
          const originalMethod = Class.prototype[methodName];
          Class.prototype[methodName + "_"] = originalMethod;
          Class.prototype[methodName] = function(...args) {
            const parsedArguments = paginator.parseArguments_(args);
            return paginator.run_(parsedArguments, originalMethod.bind(this));
          };
        });
      }
      /**
       * Wraps paginated API calls in a readable object stream.
       *
       * This method simply calls the nextQuery recursively, emitting results to a
       * stream. The stream ends when `nextQuery` is null.
       *
       * `maxResults` will act as a cap for how many results are fetched and emitted
       * to the stream.
       *
       * @param {string} methodName - Name of the method to streamify.
       * @return {function} - Wrapped function.
       */
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      streamify(methodName) {
        return function(...args) {
          const parsedArguments = paginator.parseArguments_(args);
          const originalMethod = this[methodName + "_"] || this[methodName];
          return paginator.runAsStream_(parsedArguments, originalMethod.bind(this));
        };
      }
      /**
       * Parse a pseudo-array `arguments` for a query and callback.
       *
       * @param {array} args - The original `arguments` pseduo-array that the original
       *     method received.
       */
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      parseArguments_(args) {
        let query;
        let autoPaginate = true;
        let maxApiCalls = -1;
        let maxResults = -1;
        let callback;
        const firstArgument = args[0];
        const lastArgument = args[args.length - 1];
        if (typeof firstArgument === "function") {
          callback = firstArgument;
        } else {
          query = firstArgument;
        }
        if (typeof lastArgument === "function") {
          callback = lastArgument;
        }
        if (typeof query === "object") {
          query = extend(true, {}, query);
          if (query.maxResults && typeof query.maxResults === "number") {
            maxResults = query.maxResults;
          } else if (typeof query.pageSize === "number") {
            maxResults = query.pageSize;
          }
          if (query.maxApiCalls && typeof query.maxApiCalls === "number") {
            maxApiCalls = query.maxApiCalls;
            delete query.maxApiCalls;
          }
          if (maxResults !== -1 || query.autoPaginate === false) {
            autoPaginate = false;
          }
        }
        const parsedArguments = {
          query: query || {},
          autoPaginate,
          maxApiCalls,
          maxResults,
          callback
        };
        parsedArguments.streamOptions = extend(true, {}, parsedArguments.query);
        delete parsedArguments.streamOptions.autoPaginate;
        delete parsedArguments.streamOptions.maxResults;
        delete parsedArguments.streamOptions.pageSize;
        return parsedArguments;
      }
      /**
       * This simply checks to see if `autoPaginate` is set or not, if it's true
       * then we buffer all results, otherwise simply call the original method.
       *
       * @param {array} parsedArguments - Parsed arguments from the original method
       *     call.
       * @param {object=|string=} parsedArguments.query - Query object. This is most
       *     commonly an object, but to make the API more simple, it can also be a
       *     string in some places.
       * @param {function=} parsedArguments.callback - Callback function.
       * @param {boolean} parsedArguments.autoPaginate - Auto-pagination enabled.
       * @param {boolean} parsedArguments.maxApiCalls - Maximum API calls to make.
       * @param {number} parsedArguments.maxResults - Maximum results to return.
       * @param {function} originalMethod - The cached method that accepts a callback
       *     and returns `nextQuery` to receive more results.
       */
      run_(parsedArguments, originalMethod) {
        const query = parsedArguments.query;
        const callback = parsedArguments.callback;
        if (!parsedArguments.autoPaginate) {
          return originalMethod(query, callback);
        }
        const results = new Array();
        let otherArgs = [];
        const promise = new Promise((resolve, reject) => {
          const stream = paginator.runAsStream_(parsedArguments, originalMethod);
          stream.on("error", reject).on("data", (data) => results.push(data)).on("end", () => {
            otherArgs = stream._otherArgs || [];
            resolve(results);
          });
        });
        if (!callback) {
          return promise.then((results2) => [results2, query, ...otherArgs]);
        }
        promise.then((results2) => callback(null, results2, query, ...otherArgs), (err) => callback(err));
      }
      /**
       * This method simply calls the nextQuery recursively, emitting results to a
       * stream. The stream ends when `nextQuery` is null.
       *
       * `maxResults` will act as a cap for how many results are fetched and emitted
       * to the stream.
       *
       * @param {object=|string=} parsedArguments.query - Query object. This is most
       *     commonly an object, but to make the API more simple, it can also be a
       *     string in some places.
       * @param {function=} parsedArguments.callback - Callback function.
       * @param {boolean} parsedArguments.autoPaginate - Auto-pagination enabled.
       * @param {boolean} parsedArguments.maxApiCalls - Maximum API calls to make.
       * @param {number} parsedArguments.maxResults - Maximum results to return.
       * @param {function} originalMethod - The cached method that accepts a callback
       *     and returns `nextQuery` to receive more results.
       * @return {stream} - Readable object stream.
       */
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      runAsStream_(parsedArguments, originalMethod) {
        return new resource_stream_1.ResourceStream(parsedArguments, originalMethod);
      }
    }
    exports.Paginator = Paginator;
    const paginator = new Paginator();
    exports.paginator = paginator;
  })(src);
  return src;
}
export {
  requireSrc as r
};
