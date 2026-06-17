import require$$0$1 from "stream";
import require$$0$2 from "http";
import Url from "url";
import { w as whatwgUrl } from "./whatwg-url.mjs";
import require$$1 from "https";
import zlib from "zlib";
import { b as getAugmentedNamespace } from "./react.mjs";
import http from "node:http";
import https from "node:https";
import zlib$1 from "node:zlib";
import Stream, { PassThrough as PassThrough$2, pipeline as pipeline$3 } from "node:stream";
import { Buffer as Buffer$1 } from "node:buffer";
import { d as dataUriToBuffer } from "./data-uri-to-buffer.mjs";
import { types, deprecate, promisify } from "node:util";
import { B as Blob$1, F as File } from "./fetch-blob.mjs";
import { F as FormData, f as formDataToBlob } from "./formdata-polyfill.mjs";
import { format } from "node:url";
import { isIP } from "node:net";
const Readable = require$$0$1.Readable;
const BUFFER = /* @__PURE__ */ Symbol("buffer");
const TYPE = /* @__PURE__ */ Symbol("type");
class Blob {
  constructor() {
    this[TYPE] = "";
    const blobParts = arguments[0];
    const options = arguments[1];
    const buffers = [];
    let size = 0;
    if (blobParts) {
      const a = blobParts;
      const length = Number(a.length);
      for (let i = 0; i < length; i++) {
        const element = a[i];
        let buffer;
        if (element instanceof Buffer) {
          buffer = element;
        } else if (ArrayBuffer.isView(element)) {
          buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
        } else if (element instanceof ArrayBuffer) {
          buffer = Buffer.from(element);
        } else if (element instanceof Blob) {
          buffer = element[BUFFER];
        } else {
          buffer = Buffer.from(typeof element === "string" ? element : String(element));
        }
        size += buffer.length;
        buffers.push(buffer);
      }
    }
    this[BUFFER] = Buffer.concat(buffers);
    let type = options && options.type !== void 0 && String(options.type).toLowerCase();
    if (type && !/[^\u0020-\u007E]/.test(type)) {
      this[TYPE] = type;
    }
  }
  get size() {
    return this[BUFFER].length;
  }
  get type() {
    return this[TYPE];
  }
  text() {
    return Promise.resolve(this[BUFFER].toString());
  }
  arrayBuffer() {
    const buf = this[BUFFER];
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return Promise.resolve(ab);
  }
  stream() {
    const readable = new Readable();
    readable._read = function() {
    };
    readable.push(this[BUFFER]);
    readable.push(null);
    return readable;
  }
  toString() {
    return "[object Blob]";
  }
  slice() {
    const size = this.size;
    const start = arguments[0];
    const end = arguments[1];
    let relativeStart, relativeEnd;
    if (start === void 0) {
      relativeStart = 0;
    } else if (start < 0) {
      relativeStart = Math.max(size + start, 0);
    } else {
      relativeStart = Math.min(start, size);
    }
    if (end === void 0) {
      relativeEnd = size;
    } else if (end < 0) {
      relativeEnd = Math.max(size + end, 0);
    } else {
      relativeEnd = Math.min(end, size);
    }
    const span = Math.max(relativeEnd - relativeStart, 0);
    const buffer = this[BUFFER];
    const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
    const blob = new Blob([], { type: arguments[2] });
    blob[BUFFER] = slicedBuffer;
    return blob;
  }
}
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
  value: "Blob",
  writable: false,
  enumerable: false,
  configurable: true
});
function FetchError$3(message, type, systemError) {
  Error.call(this, message);
  this.message = message;
  this.type = type;
  if (systemError) {
    this.code = this.errno = systemError.code;
  }
  Error.captureStackTrace(this, this.constructor);
}
FetchError$3.prototype = Object.create(Error.prototype);
FetchError$3.prototype.constructor = FetchError$3;
FetchError$3.prototype.name = "FetchError";
let convert;
try {
  convert = require("encoding").convert;
} catch (e) {
}
const INTERNALS$9 = /* @__PURE__ */ Symbol("Body internals");
const PassThrough = require$$0$1.PassThrough;
function Body$3(body) {
  var _this = this;
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
  let size = _ref$size === void 0 ? 0 : _ref$size;
  var _ref$timeout = _ref.timeout;
  let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
  if (body == null) {
    body = null;
  } else if (isURLSearchParams(body)) {
    body = Buffer.from(body.toString());
  } else if (isBlob$3(body)) ;
  else if (Buffer.isBuffer(body)) ;
  else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
    body = Buffer.from(body);
  } else if (ArrayBuffer.isView(body)) {
    body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
  } else if (body instanceof require$$0$1) ;
  else {
    body = Buffer.from(String(body));
  }
  this[INTERNALS$9] = {
    body,
    disturbed: false,
    error: null
  };
  this.size = size;
  this.timeout = timeout;
  if (body instanceof require$$0$1) {
    body.on("error", function(err) {
      const error = err.name === "AbortError" ? err : new FetchError$3(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
      _this[INTERNALS$9].error = error;
    });
  }
}
Body$3.prototype = {
  get body() {
    return this[INTERNALS$9].body;
  },
  get bodyUsed() {
    return this[INTERNALS$9].disturbed;
  },
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  arrayBuffer() {
    return consumeBody$3.call(this).then(function(buf) {
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    });
  },
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  blob() {
    let ct = this.headers && this.headers.get("content-type") || "";
    return consumeBody$3.call(this).then(function(buf) {
      return Object.assign(
        // Prevent copying
        new Blob([], {
          type: ct.toLowerCase()
        }),
        {
          [BUFFER]: buf
        }
      );
    });
  },
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  json() {
    var _this2 = this;
    return consumeBody$3.call(this).then(function(buffer) {
      try {
        return JSON.parse(buffer.toString());
      } catch (err) {
        return Body$3.Promise.reject(new FetchError$3(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
      }
    });
  },
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  text() {
    return consumeBody$3.call(this).then(function(buffer) {
      return buffer.toString();
    });
  },
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return consumeBody$3.call(this);
  },
  /**
   * Decode response as text, while automatically detecting the encoding and
   * trying to decode to UTF-8 (non-spec api)
   *
   * @return  Promise
   */
  textConverted() {
    var _this3 = this;
    return consumeBody$3.call(this).then(function(buffer) {
      return convertBody(buffer, _this3.headers);
    });
  }
};
Object.defineProperties(Body$3.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
Body$3.mixIn = function(proto) {
  for (const name of Object.getOwnPropertyNames(Body$3.prototype)) {
    if (!(name in proto)) {
      const desc = Object.getOwnPropertyDescriptor(Body$3.prototype, name);
      Object.defineProperty(proto, name, desc);
    }
  }
};
function consumeBody$3() {
  var _this4 = this;
  if (this[INTERNALS$9].disturbed) {
    return Body$3.Promise.reject(new TypeError(`body used already for: ${this.url}`));
  }
  this[INTERNALS$9].disturbed = true;
  if (this[INTERNALS$9].error) {
    return Body$3.Promise.reject(this[INTERNALS$9].error);
  }
  let body = this.body;
  if (body === null) {
    return Body$3.Promise.resolve(Buffer.alloc(0));
  }
  if (isBlob$3(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return Body$3.Promise.resolve(body);
  }
  if (!(body instanceof require$$0$1)) {
    return Body$3.Promise.resolve(Buffer.alloc(0));
  }
  let accum = [];
  let accumBytes = 0;
  let abort = false;
  return new Body$3.Promise(function(resolve, reject) {
    let resTimeout;
    if (_this4.timeout) {
      resTimeout = setTimeout(function() {
        abort = true;
        reject(new FetchError$3(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
      }, _this4.timeout);
    }
    body.on("error", function(err) {
      if (err.name === "AbortError") {
        abort = true;
        reject(err);
      } else {
        reject(new FetchError$3(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
      }
    });
    body.on("data", function(chunk) {
      if (abort || chunk === null) {
        return;
      }
      if (_this4.size && accumBytes + chunk.length > _this4.size) {
        abort = true;
        reject(new FetchError$3(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
        return;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    });
    body.on("end", function() {
      if (abort) {
        return;
      }
      clearTimeout(resTimeout);
      try {
        resolve(Buffer.concat(accum, accumBytes));
      } catch (err) {
        reject(new FetchError$3(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
      }
    });
  });
}
function convertBody(buffer, headers) {
  if (typeof convert !== "function") {
    throw new Error("The package `encoding` must be installed to use the textConverted() function");
  }
  const ct = headers.get("content-type");
  let charset = "utf-8";
  let res, str;
  if (ct) {
    res = /charset=([^;]*)/i.exec(ct);
  }
  str = buffer.slice(0, 1024).toString();
  if (!res && str) {
    res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
  }
  if (!res && str) {
    res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
    if (!res) {
      res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
      if (res) {
        res.pop();
      }
    }
    if (res) {
      res = /charset=(.*)/i.exec(res.pop());
    }
  }
  if (!res && str) {
    res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
  }
  if (res) {
    charset = res.pop();
    if (charset === "gb2312" || charset === "gbk") {
      charset = "gb18030";
    }
  }
  return convert(buffer, "UTF-8", charset).toString();
}
function isURLSearchParams(obj) {
  if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
    return false;
  }
  return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
}
function isBlob$3(obj) {
  return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}
function clone$3(instance) {
  let p1, p2;
  let body = instance.body;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof require$$0$1 && typeof body.getBoundary !== "function") {
    p1 = new PassThrough();
    p2 = new PassThrough();
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$9].body = p1;
    body = p2;
  }
  return body;
}
function extractContentType$3(body) {
  if (body === null) {
    return null;
  } else if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  } else if (isURLSearchParams(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  } else if (isBlob$3(body)) {
    return body.type || null;
  } else if (Buffer.isBuffer(body)) {
    return null;
  } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
    return null;
  } else if (ArrayBuffer.isView(body)) {
    return null;
  } else if (typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  } else if (body instanceof require$$0$1) {
    return null;
  } else {
    return "text/plain;charset=UTF-8";
  }
}
function getTotalBytes$3(instance) {
  const body = instance.body;
  if (body === null) {
    return 0;
  } else if (isBlob$3(body)) {
    return body.size;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (body && typeof body.getLengthSync === "function") {
    if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
    body.hasKnownLength && body.hasKnownLength()) {
      return body.getLengthSync();
    }
    return null;
  } else {
    return null;
  }
}
function writeToStream$3(dest, instance) {
  const body = instance.body;
  if (body === null) {
    dest.end();
  } else if (isBlob$3(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
}
Body$3.Promise = global.Promise;
const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
function validateName(name) {
  name = `${name}`;
  if (invalidTokenRegex.test(name) || name === "") {
    throw new TypeError(`${name} is not a legal HTTP header name`);
  }
}
function validateValue(value) {
  value = `${value}`;
  if (invalidHeaderCharRegex.test(value)) {
    throw new TypeError(`${value} is not a legal HTTP header value`);
  }
}
function find(map, name) {
  name = name.toLowerCase();
  for (const key in map) {
    if (key.toLowerCase() === name) {
      return key;
    }
  }
  return void 0;
}
const MAP = /* @__PURE__ */ Symbol("map");
let Headers$3 = class Headers {
  /**
   * Headers class
   *
   * @param   Object  headers  Response headers
   * @return  Void
   */
  constructor() {
    let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
    this[MAP] = /* @__PURE__ */ Object.create(null);
    if (init instanceof Headers) {
      const rawHeaders = init.raw();
      const headerNames = Object.keys(rawHeaders);
      for (const headerName of headerNames) {
        for (const value of rawHeaders[headerName]) {
          this.append(headerName, value);
        }
      }
      return;
    }
    if (init == null) ;
    else if (typeof init === "object") {
      const method = init[Symbol.iterator];
      if (method != null) {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        const pairs = [];
        for (const pair of init) {
          if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
            throw new TypeError("Each header pair must be iterable");
          }
          pairs.push(Array.from(pair));
        }
        for (const pair of pairs) {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          this.append(pair[0], pair[1]);
        }
      } else {
        for (const key of Object.keys(init)) {
          const value = init[key];
          this.append(key, value);
        }
      }
    } else {
      throw new TypeError("Provided initializer must be an object");
    }
  }
  /**
   * Return combined header value given name
   *
   * @param   String  name  Header name
   * @return  Mixed
   */
  get(name) {
    name = `${name}`;
    validateName(name);
    const key = find(this[MAP], name);
    if (key === void 0) {
      return null;
    }
    return this[MAP][key].join(", ");
  }
  /**
   * Iterate over all headers
   *
   * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
   * @param   Boolean   thisArg   `this` context for callback function
   * @return  Void
   */
  forEach(callback) {
    let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
    let pairs = getHeaders(this);
    let i = 0;
    while (i < pairs.length) {
      var _pairs$i = pairs[i];
      const name = _pairs$i[0], value = _pairs$i[1];
      callback.call(thisArg, value, name, this);
      pairs = getHeaders(this);
      i++;
    }
  }
  /**
   * Overwrite header values given name
   *
   * @param   String  name   Header name
   * @param   String  value  Header value
   * @return  Void
   */
  set(name, value) {
    name = `${name}`;
    value = `${value}`;
    validateName(name);
    validateValue(value);
    const key = find(this[MAP], name);
    this[MAP][key !== void 0 ? key : name] = [value];
  }
  /**
   * Append a value onto existing header
   *
   * @param   String  name   Header name
   * @param   String  value  Header value
   * @return  Void
   */
  append(name, value) {
    name = `${name}`;
    value = `${value}`;
    validateName(name);
    validateValue(value);
    const key = find(this[MAP], name);
    if (key !== void 0) {
      this[MAP][key].push(value);
    } else {
      this[MAP][name] = [value];
    }
  }
  /**
   * Check for header name existence
   *
   * @param   String   name  Header name
   * @return  Boolean
   */
  has(name) {
    name = `${name}`;
    validateName(name);
    return find(this[MAP], name) !== void 0;
  }
  /**
   * Delete all header values given name
   *
   * @param   String  name  Header name
   * @return  Void
   */
  delete(name) {
    name = `${name}`;
    validateName(name);
    const key = find(this[MAP], name);
    if (key !== void 0) {
      delete this[MAP][key];
    }
  }
  /**
   * Return raw headers (non-spec api)
   *
   * @return  Object
   */
  raw() {
    return this[MAP];
  }
  /**
   * Get an iterator on keys.
   *
   * @return  Iterator
   */
  keys() {
    return createHeadersIterator(this, "key");
  }
  /**
   * Get an iterator on values.
   *
   * @return  Iterator
   */
  values() {
    return createHeadersIterator(this, "value");
  }
  /**
   * Get an iterator on entries.
   *
   * This is the default iterator of the Headers object.
   *
   * @return  Iterator
   */
  [Symbol.iterator]() {
    return createHeadersIterator(this, "key+value");
  }
};
Headers$3.prototype.entries = Headers$3.prototype[Symbol.iterator];
Object.defineProperty(Headers$3.prototype, Symbol.toStringTag, {
  value: "Headers",
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperties(Headers$3.prototype, {
  get: { enumerable: true },
  forEach: { enumerable: true },
  set: { enumerable: true },
  append: { enumerable: true },
  has: { enumerable: true },
  delete: { enumerable: true },
  keys: { enumerable: true },
  values: { enumerable: true },
  entries: { enumerable: true }
});
function getHeaders(headers) {
  let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
  const keys = Object.keys(headers[MAP]).sort();
  return keys.map(kind === "key" ? function(k) {
    return k.toLowerCase();
  } : kind === "value" ? function(k) {
    return headers[MAP][k].join(", ");
  } : function(k) {
    return [k.toLowerCase(), headers[MAP][k].join(", ")];
  });
}
const INTERNAL = /* @__PURE__ */ Symbol("internal");
function createHeadersIterator(target, kind) {
  const iterator = Object.create(HeadersIteratorPrototype);
  iterator[INTERNAL] = {
    target,
    kind,
    index: 0
  };
  return iterator;
}
const HeadersIteratorPrototype = Object.setPrototypeOf({
  next() {
    if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
      throw new TypeError("Value of `this` is not a HeadersIterator");
    }
    var _INTERNAL = this[INTERNAL];
    const target = _INTERNAL.target, kind = _INTERNAL.kind, index2 = _INTERNAL.index;
    const values = getHeaders(target, kind);
    const len = values.length;
    if (index2 >= len) {
      return {
        value: void 0,
        done: true
      };
    }
    this[INTERNAL].index = index2 + 1;
    return {
      value: values[index2],
      done: false
    };
  }
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
  value: "HeadersIterator",
  writable: false,
  enumerable: false,
  configurable: true
});
function exportNodeCompatibleHeaders(headers) {
  const obj = Object.assign({ __proto__: null }, headers[MAP]);
  const hostHeaderKey = find(headers[MAP], "Host");
  if (hostHeaderKey !== void 0) {
    obj[hostHeaderKey] = obj[hostHeaderKey][0];
  }
  return obj;
}
function createHeadersLenient(obj) {
  const headers = new Headers$3();
  for (const name of Object.keys(obj)) {
    if (invalidTokenRegex.test(name)) {
      continue;
    }
    if (Array.isArray(obj[name])) {
      for (const val of obj[name]) {
        if (invalidHeaderCharRegex.test(val)) {
          continue;
        }
        if (headers[MAP][name] === void 0) {
          headers[MAP][name] = [val];
        } else {
          headers[MAP][name].push(val);
        }
      }
    } else if (!invalidHeaderCharRegex.test(obj[name])) {
      headers[MAP][name] = [obj[name]];
    }
  }
  return headers;
}
const INTERNALS$1$1 = /* @__PURE__ */ Symbol("Response internals");
const STATUS_CODES = require$$0$2.STATUS_CODES;
let Response$3 = class Response {
  constructor() {
    let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    Body$3.call(this, body, opts);
    const status = opts.status || 200;
    const headers = new Headers$3(opts.headers);
    if (body != null && !headers.has("Content-Type")) {
      const contentType = extractContentType$3(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1$1] = {
      url: opts.url,
      status,
      statusText: opts.statusText || STATUS_CODES[status],
      headers,
      counter: opts.counter
    };
  }
  get url() {
    return this[INTERNALS$1$1].url || "";
  }
  get status() {
    return this[INTERNALS$1$1].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[INTERNALS$1$1].status >= 200 && this[INTERNALS$1$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1$1].headers;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new Response(clone$3(this), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected
    });
  }
};
Body$3.mixIn(Response$3.prototype);
Object.defineProperties(Response$3.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
Object.defineProperty(Response$3.prototype, Symbol.toStringTag, {
  value: "Response",
  writable: false,
  enumerable: false,
  configurable: true
});
const INTERNALS$2$1 = /* @__PURE__ */ Symbol("Request internals");
const URL$1 = Url.URL || whatwgUrl.URL;
const parse_url = Url.parse;
const format_url = Url.format;
function parseURL(urlStr) {
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
    urlStr = new URL$1(urlStr).toString();
  }
  return parse_url(urlStr);
}
const streamDestructionSupported = "destroy" in require$$0$1.Readable.prototype;
function isRequest$3(input) {
  return typeof input === "object" && typeof input[INTERNALS$2$1] === "object";
}
function isAbortSignal$3(signal) {
  const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
  return !!(proto && proto.constructor.name === "AbortSignal");
}
let Request$3 = class Request {
  constructor(input) {
    let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let parsedURL;
    if (!isRequest$3(input)) {
      if (input && input.href) {
        parsedURL = parseURL(input.href);
      } else {
        parsedURL = parseURL(`${input}`);
      }
      input = {};
    } else {
      parsedURL = parseURL(input.url);
    }
    let method = init.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init.body != null || isRequest$3(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    let inputBody = init.body != null ? init.body : isRequest$3(input) && input.body !== null ? clone$3(input) : null;
    Body$3.call(this, inputBody, {
      timeout: init.timeout || input.timeout || 0,
      size: init.size || input.size || 0
    });
    const headers = new Headers$3(init.headers || input.headers || {});
    if (inputBody != null && !headers.has("Content-Type")) {
      const contentType = extractContentType$3(inputBody);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest$3(input) ? input.signal : null;
    if ("signal" in init) signal = init.signal;
    if (signal != null && !isAbortSignal$3(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS$2$1] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
    this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
  }
  get method() {
    return this[INTERNALS$2$1].method;
  }
  get url() {
    return format_url(this[INTERNALS$2$1].parsedURL);
  }
  get headers() {
    return this[INTERNALS$2$1].headers;
  }
  get redirect() {
    return this[INTERNALS$2$1].redirect;
  }
  get signal() {
    return this[INTERNALS$2$1].signal;
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new Request(this);
  }
};
Body$3.mixIn(Request$3.prototype);
Object.defineProperty(Request$3.prototype, Symbol.toStringTag, {
  value: "Request",
  writable: false,
  enumerable: false,
  configurable: true
});
Object.defineProperties(Request$3.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
function getNodeRequestOptions$3(request) {
  const parsedURL = request[INTERNALS$2$1].parsedURL;
  const headers = new Headers$3(request[INTERNALS$2$1].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  if (!parsedURL.protocol || !parsedURL.hostname) {
    throw new TypeError("Only absolute URLs are supported");
  }
  if (!/^https?:$/.test(parsedURL.protocol)) {
    throw new TypeError("Only HTTP(S) protocols are supported");
  }
  if (request.signal && request.body instanceof require$$0$1.Readable && !streamDestructionSupported) {
    throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
  }
  let contentLengthValue = null;
  if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body != null) {
    const totalBytes = getTotalBytes$3(request);
    if (typeof totalBytes === "number") {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate");
  }
  let agent = request.agent;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  return Object.assign({}, parsedURL, {
    method: request.method,
    headers: exportNodeCompatibleHeaders(headers),
    agent
  });
}
function AbortError$3(message) {
  Error.call(this, message);
  this.type = "aborted";
  this.message = message;
  Error.captureStackTrace(this, this.constructor);
}
AbortError$3.prototype = Object.create(Error.prototype);
AbortError$3.prototype.constructor = AbortError$3;
AbortError$3.prototype.name = "AbortError";
const URL$1$1 = Url.URL || whatwgUrl.URL;
const PassThrough$1 = require$$0$1.PassThrough;
const isDomainOrSubdomain$3 = function isDomainOrSubdomain(destination, original) {
  const orig = new URL$1$1(original).hostname;
  const dest = new URL$1$1(destination).hostname;
  return orig === dest || orig[orig.length - dest.length - 1] === "." && orig.endsWith(dest);
};
const isSameProtocol$3 = function isSameProtocol(destination, original) {
  const orig = new URL$1$1(original).protocol;
  const dest = new URL$1$1(destination).protocol;
  return orig === dest;
};
function fetch$3(url, opts) {
  if (!fetch$3.Promise) {
    throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
  }
  Body$3.Promise = fetch$3.Promise;
  return new fetch$3.Promise(function(resolve, reject) {
    const request = new Request$3(url, opts);
    const options = getNodeRequestOptions$3(request);
    const send = (options.protocol === "https:" ? require$$1 : require$$0$2).request;
    const signal = request.signal;
    let response = null;
    const abort = function abort2() {
      let error = new AbortError$3("The user aborted a request.");
      reject(error);
      if (request.body && request.body instanceof require$$0$1.Readable) {
        destroyStream(request.body, error);
      }
      if (!response || !response.body) return;
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = function abortAndFinalize2() {
      abort();
      finalize();
    };
    const req = send(options);
    let reqTimeout;
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    function finalize() {
      req.abort();
      if (signal) signal.removeEventListener("abort", abortAndFinalize);
      clearTimeout(reqTimeout);
    }
    if (request.timeout) {
      req.once("socket", function(socket) {
        reqTimeout = setTimeout(function() {
          reject(new FetchError$3(`network timeout at: ${request.url}`, "request-timeout"));
          finalize();
        }, request.timeout);
      });
    }
    req.on("error", function(err) {
      reject(new FetchError$3(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      if (response && response.body) {
        destroyStream(response.body, err);
      }
      finalize();
    });
    fixResponseChunkedTransferBadEnding$3(req, function(err) {
      if (signal && signal.aborted) {
        return;
      }
      if (response && response.body) {
        destroyStream(response.body, err);
      }
    });
    if (parseInt(process.version.substring(1)) < 14) {
      req.on("socket", function(s2) {
        s2.addListener("close", function(hadError) {
          const hasDataListener = s2.listenerCount("data") > 0;
          if (response && hasDataListener && !hadError && !(signal && signal.aborted)) {
            const err = new Error("Premature close");
            err.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", err);
          }
        });
      });
    }
    req.on("response", function(res) {
      clearTimeout(reqTimeout);
      const headers = createHeadersLenient(res.headers);
      if (fetch$3.isRedirect(res.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL$1$1(location, request.url).toString();
        } catch (err) {
          if (request.redirect !== "manual") {
            reject(new FetchError$3(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError$3(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (err) {
                reject(err);
              }
            }
            break;
          case "follow":
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError$3(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOpts = {
              headers: new Headers$3(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              timeout: request.timeout,
              size: request.size
            };
            if (!isDomainOrSubdomain$3(request.url, locationURL) || !isSameProtocol$3(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOpts.headers.delete(name);
              }
            }
            if (res.statusCode !== 303 && request.body && getTotalBytes$3(request) === null) {
              reject(new FetchError$3("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
              requestOpts.method = "GET";
              requestOpts.body = void 0;
              requestOpts.headers.delete("content-length");
            }
            resolve(fetch$3(new Request$3(locationURL, requestOpts)));
            finalize();
            return;
        }
      }
      res.once("end", function() {
        if (signal) signal.removeEventListener("abort", abortAndFinalize);
      });
      let body = res.pipe(new PassThrough$1());
      const response_options = {
        url: request.url,
        status: res.statusCode,
        statusText: res.statusMessage,
        headers,
        size: request.size,
        timeout: request.timeout,
        counter: request.counter
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
        response = new Response$3(body, response_options);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings == "gzip" || codings == "x-gzip") {
        body = body.pipe(zlib.createGunzip(zlibOptions));
        response = new Response$3(body, response_options);
        resolve(response);
        return;
      }
      if (codings == "deflate" || codings == "x-deflate") {
        const raw = res.pipe(new PassThrough$1());
        raw.once("data", function(chunk) {
          if ((chunk[0] & 15) === 8) {
            body = body.pipe(zlib.createInflate());
          } else {
            body = body.pipe(zlib.createInflateRaw());
          }
          response = new Response$3(body, response_options);
          resolve(response);
        });
        raw.on("end", function() {
          if (!response) {
            response = new Response$3(body, response_options);
            resolve(response);
          }
        });
        return;
      }
      if (codings == "br" && typeof zlib.createBrotliDecompress === "function") {
        body = body.pipe(zlib.createBrotliDecompress());
        response = new Response$3(body, response_options);
        resolve(response);
        return;
      }
      response = new Response$3(body, response_options);
      resolve(response);
    });
    writeToStream$3(req, request);
  });
}
function fixResponseChunkedTransferBadEnding$3(request, errorCallback) {
  let socket;
  request.on("socket", function(s2) {
    socket = s2;
  });
  request.on("response", function(response) {
    const headers = response.headers;
    if (headers["transfer-encoding"] === "chunked" && !headers["content-length"]) {
      response.once("close", function(hadError) {
        const hasDataListener = socket && socket.listenerCount("data") > 0;
        if (hasDataListener && !hadError) {
          const err = new Error("Premature close");
          err.code = "ERR_STREAM_PREMATURE_CLOSE";
          errorCallback(err);
        }
      });
    }
  });
}
function destroyStream(stream, err) {
  if (stream.destroy) {
    stream.destroy(err);
  } else {
    stream.emit("error", err);
    stream.end();
  }
}
fetch$3.isRedirect = function(code) {
  return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};
fetch$3.Promise = global.Promise;
const lib = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbortError: AbortError$3,
  FetchError: FetchError$3,
  Headers: Headers$3,
  Request: Request$3,
  Response: Response$3,
  default: fetch$3
});
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(lib);
let FetchBaseError$2 = class FetchBaseError extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
let FetchError$2 = class FetchError extends FetchBaseError$2 {
  /**
   * @param  {string} message -      Error message for human
   * @param  {string} [type] -        Error type for machine
   * @param  {SystemError} [systemError] - For Node.js system error
   */
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
const NAME$2 = Symbol.toStringTag;
const isURLSearchParameters$2 = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME$2] === "URLSearchParams";
};
const isBlob$2 = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME$2]);
};
const isAbortSignal$2 = (object) => {
  return typeof object === "object" && (object[NAME$2] === "AbortSignal" || object[NAME$2] === "EventTarget");
};
const isDomainOrSubdomain$2 = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
const isSameProtocol$2 = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};
const pipeline$2 = promisify(Stream.pipeline);
const INTERNALS$8 = /* @__PURE__ */ Symbol("Body internals");
let Body$2 = class Body {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters$2(body)) {
      body = Buffer$1.from(body.toString());
    } else if (isBlob$2(body)) ;
    else if (Buffer$1.isBuffer(body)) ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer$1.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer$1.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream) ;
    else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = Buffer$1.from(String(body));
    }
    let stream = body;
    if (Buffer$1.isBuffer(body)) {
      stream = Stream.Readable.from(body);
    } else if (isBlob$2(body)) {
      stream = Stream.Readable.from(body.stream());
    }
    this[INTERNALS$8] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError$2 ? error_ : new FetchError$2(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$8].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS$8].stream;
  }
  get bodyUsed() {
    return this[INTERNALS$8].disturbed;
  }
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody$2(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(function() {
      return multipartParser$2;
    });
    return toFormData2(this.body, ct);
  }
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$8].body && this[INTERNALS$8].body.type || "";
    const buf = await this.arrayBuffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  async text() {
    const buffer = await consumeBody$2(this);
    return new TextDecoder().decode(buffer);
  }
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return consumeBody$2(this);
  }
};
Body$2.prototype.buffer = deprecate(Body$2.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body$2.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody$2(data) {
  if (data[INTERNALS$8].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$8].disturbed = true;
  if (data[INTERNALS$8].error) {
    throw data[INTERNALS$8].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer$1.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer$1.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError$2(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError$2 ? error : new FetchError$2(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer$1.from(accum.join(""));
      }
      return Buffer$1.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError$2(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError$2(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone$2 = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS$8];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough$2({ highWaterMark });
    p2 = new PassThrough$2({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$8].stream = p1;
    body = p2;
  }
  return body;
};
const getNonSpecFormDataBoundary$2 = deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
const extractContentType$2 = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters$2(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob$2(body)) {
    return body.type || null;
  }
  if (Buffer$1.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS$8].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary$2(body)}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes$2 = (request) => {
  const { body } = request[INTERNALS$8];
  if (body === null) {
    return 0;
  }
  if (isBlob$2(body)) {
    return body.size;
  }
  if (Buffer$1.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
const writeToStream$2 = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline$2(body, dest);
  }
};
const validateHeaderName$2 = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
const validateHeaderValue$2 = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
let Headers$2 = class Headers2 extends URLSearchParams {
  /**
   * Headers class
   *
   * @constructor
   * @param {HeadersInit} [init] - Response headers
   */
  constructor(init) {
    let result = [];
    if (init instanceof Headers2) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) ;
    else if (typeof init === "object" && !types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName$2(name);
      validateHeaderValue$2(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName$2(name);
              validateHeaderValue$2(name, String(value));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName$2(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  /**
   * @type {() => IterableIterator<[string, string]>}
   */
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Node-fetch non-spec method
   * returning all headers and their values as array
   * @returns {Record<string, string[]>}
   */
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  /**
   * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
   */
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(
  Headers$2.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders$2(headers = []) {
  return new Headers$2(
    headers.reduce((result, value, index2, array) => {
      if (index2 % 2 === 0) {
        result.push(array.slice(index2, index2 + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName$2(name);
        validateHeaderValue$2(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
const redirectStatus$2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const isRedirect$2 = (code) => {
  return redirectStatus$2.has(code);
};
const INTERNALS$7 = /* @__PURE__ */ Symbol("Response internals");
let Response$2 = class Response2 extends Body$2 {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers$2(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType$2(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$7] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$7].type;
  }
  get url() {
    return this[INTERNALS$7].url || "";
  }
  get status() {
    return this[INTERNALS$7].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[INTERNALS$7].status >= 200 && this[INTERNALS$7].status < 300;
  }
  get redirected() {
    return this[INTERNALS$7].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$7].statusText;
  }
  get headers() {
    return this[INTERNALS$7].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$7].highWaterMark;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new Response2(clone$2(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  /**
   * @param {string} url    The URL that the new response is to originate from.
   * @param {number} status An optional status code for the response (e.g., 302.)
   * @returns {Response}    A Response object.
   */
  static redirect(url, status = 302) {
    if (!isRedirect$2(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response2(null, { status: 0, statusText: "" });
    response[INTERNALS$7].type = "error";
    return response;
  }
  static json(data = void 0, init = {}) {
    const body = JSON.stringify(data);
    if (body === void 0) {
      throw new TypeError("data is not JSON serializable");
    }
    const headers = new Headers$2(init && init.headers);
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return new Response2(body, {
      ...init,
      headers
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response$2.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
const getSearch$2 = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
function stripURLForUseAsAReferrer$2(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
const ReferrerPolicy$2 = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
const DEFAULT_REFERRER_POLICY$2 = "strict-origin-when-cross-origin";
function validateReferrerPolicy$2(referrerPolicy) {
  if (!ReferrerPolicy$2.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy$2(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy$2(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy$2(url);
}
function determineRequestsReferrer$2(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer$2(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer$2(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy$2(referrerURL) && !isUrlPotentiallyTrustworthy$2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy$2(referrerURL) && !isUrlPotentiallyTrustworthy$2(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy$2(referrerURL) && !isUrlPotentiallyTrustworthy$2(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader$2(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy$2.has(token)) {
      policy = token;
    }
  }
  return policy;
}
const INTERNALS$6 = /* @__PURE__ */ Symbol("Request internals");
const isRequest$2 = (object) => {
  return typeof object === "object" && typeof object[INTERNALS$6] === "object";
};
const doBadDataWarn$2 = deprecate(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
let Request$2 = class Request2 extends Body$2 {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest$2(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest$2(init) && "data" in init) {
      doBadDataWarn$2();
    }
    if ((init.body != null || isRequest$2(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest$2(input) && input.body !== null ? clone$2(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers$2(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType$2(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest$2(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal$2(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS$6] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  /** @returns {string} */
  get method() {
    return this[INTERNALS$6].method;
  }
  /** @returns {string} */
  get url() {
    return format(this[INTERNALS$6].parsedURL);
  }
  /** @returns {Headers} */
  get headers() {
    return this[INTERNALS$6].headers;
  }
  get redirect() {
    return this[INTERNALS$6].redirect;
  }
  /** @returns {AbortSignal} */
  get signal() {
    return this[INTERNALS$6].signal;
  }
  // https://fetch.spec.whatwg.org/#dom-request-referrer
  get referrer() {
    if (this[INTERNALS$6].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS$6].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS$6].referrer) {
      return this[INTERNALS$6].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS$6].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS$6].referrerPolicy = validateReferrerPolicy$2(referrerPolicy);
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new Request2(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request$2.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
const getNodeRequestOptions$2 = (request) => {
  const { parsedURL } = request[INTERNALS$6];
  const headers = new Headers$2(request[INTERNALS$6].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes$2(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY$2;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS$6].referrer = determineRequestsReferrer$2(request);
  } else {
    request[INTERNALS$6].referrer = "no-referrer";
  }
  if (request[INTERNALS$6].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  const search = getSearch$2(parsedURL);
  const options = {
    // Overwrite search to retain trailing ? (issue #776)
    path: parsedURL.pathname + search,
    // The following options are not expressed in the URL
    method: request.method,
    headers: headers[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    /** @type {URL} */
    parsedURL,
    options
  };
};
let AbortError$2 = class AbortError extends FetchBaseError$2 {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
const supportedSchemas$2 = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch$2(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request$2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions$2(request);
    if (!supportedSchemas$2.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response$2(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError$2("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError$2(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding$2(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders$2(response_.rawHeaders);
      if (isRedirect$2(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError$2(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError$2(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError$2(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers$2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone$2(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain$2(request.url, locationURL) || !isSameProtocol$2(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError$2("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader$2(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch$2(new Request$2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline$3(response_, new PassThrough$2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response$2(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib$1.Z_SYNC_FLUSH,
        finishFlush: zlib$1.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline$3(body, zlib$1.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response$2(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline$3(response_, new PassThrough$2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pipeline$3(body, zlib$1.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pipeline$3(body, zlib$1.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response$2(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response$2(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pipeline$3(body, zlib$1.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response$2(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response$2(body, responseOptions);
      resolve(response);
    });
    writeToStream$2(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding$2(request, errorCallback) {
  const LAST_CHUNK = Buffer$1.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer$1.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer$1.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer$1.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
const index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbortError: AbortError$2,
  Blob: Blob$1,
  FetchError: FetchError$2,
  File,
  FormData,
  Headers: Headers$2,
  Request: Request$2,
  Response: Response$2,
  default: fetch$2,
  isRedirect: isRedirect$2
});
let FetchBaseError$1 = class FetchBaseError2 extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
let FetchError$1 = class FetchError2 extends FetchBaseError$1 {
  /**
   * @param  {string} message -      Error message for human
   * @param  {string} [type] -        Error type for machine
   * @param  {SystemError} [systemError] - For Node.js system error
   */
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
const NAME$1 = Symbol.toStringTag;
const isURLSearchParameters$1 = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME$1] === "URLSearchParams";
};
const isBlob$1 = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME$1]);
};
const isAbortSignal$1 = (object) => {
  return typeof object === "object" && (object[NAME$1] === "AbortSignal" || object[NAME$1] === "EventTarget");
};
const isDomainOrSubdomain$1 = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
const isSameProtocol$1 = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};
const pipeline$1 = promisify(Stream.pipeline);
const INTERNALS$5 = /* @__PURE__ */ Symbol("Body internals");
let Body$1 = class Body2 {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters$1(body)) {
      body = Buffer$1.from(body.toString());
    } else if (isBlob$1(body)) ;
    else if (Buffer$1.isBuffer(body)) ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer$1.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer$1.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream) ;
    else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = Buffer$1.from(String(body));
    }
    let stream = body;
    if (Buffer$1.isBuffer(body)) {
      stream = Stream.Readable.from(body);
    } else if (isBlob$1(body)) {
      stream = Stream.Readable.from(body.stream());
    }
    this[INTERNALS$5] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError$1 ? error_ : new FetchError$1(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$5].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS$5].stream;
  }
  get bodyUsed() {
    return this[INTERNALS$5].disturbed;
  }
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody$1(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(function() {
      return multipartParser$1;
    });
    return toFormData2(this.body, ct);
  }
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$5].body && this[INTERNALS$5].body.type || "";
    const buf = await this.arrayBuffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  async text() {
    const buffer = await consumeBody$1(this);
    return new TextDecoder().decode(buffer);
  }
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return consumeBody$1(this);
  }
};
Body$1.prototype.buffer = deprecate(Body$1.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body$1.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody$1(data) {
  if (data[INTERNALS$5].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$5].disturbed = true;
  if (data[INTERNALS$5].error) {
    throw data[INTERNALS$5].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer$1.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer$1.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError$1(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError$1 ? error : new FetchError$1(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer$1.from(accum.join(""));
      }
      return Buffer$1.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError$1(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError$1(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone$1 = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS$5];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough$2({ highWaterMark });
    p2 = new PassThrough$2({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$5].stream = p1;
    body = p2;
  }
  return body;
};
const getNonSpecFormDataBoundary$1 = deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
const extractContentType$1 = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters$1(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob$1(body)) {
    return body.type || null;
  }
  if (Buffer$1.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS$5].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary$1(body)}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes$1 = (request) => {
  const { body } = request[INTERNALS$5];
  if (body === null) {
    return 0;
  }
  if (isBlob$1(body)) {
    return body.size;
  }
  if (Buffer$1.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
const writeToStream$1 = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline$1(body, dest);
  }
};
const validateHeaderName$1 = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
const validateHeaderValue$1 = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
let Headers$1 = class Headers3 extends URLSearchParams {
  /**
   * Headers class
   *
   * @constructor
   * @param {HeadersInit} [init] - Response headers
   */
  constructor(init) {
    let result = [];
    if (init instanceof Headers3) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) ;
    else if (typeof init === "object" && !types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName$1(name);
      validateHeaderValue$1(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName$1(name);
              validateHeaderValue$1(name, String(value));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName$1(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  /**
   * @type {() => IterableIterator<[string, string]>}
   */
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Node-fetch non-spec method
   * returning all headers and their values as array
   * @returns {Record<string, string[]>}
   */
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  /**
   * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
   */
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(
  Headers$1.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders$1(headers = []) {
  return new Headers$1(
    headers.reduce((result, value, index2, array) => {
      if (index2 % 2 === 0) {
        result.push(array.slice(index2, index2 + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName$1(name);
        validateHeaderValue$1(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
const redirectStatus$1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const isRedirect$1 = (code) => {
  return redirectStatus$1.has(code);
};
const INTERNALS$4 = /* @__PURE__ */ Symbol("Response internals");
let Response$1 = class Response3 extends Body$1 {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers$1(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType$1(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$4] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$4].type;
  }
  get url() {
    return this[INTERNALS$4].url || "";
  }
  get status() {
    return this[INTERNALS$4].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[INTERNALS$4].status >= 200 && this[INTERNALS$4].status < 300;
  }
  get redirected() {
    return this[INTERNALS$4].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$4].statusText;
  }
  get headers() {
    return this[INTERNALS$4].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$4].highWaterMark;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new Response3(clone$1(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  /**
   * @param {string} url    The URL that the new response is to originate from.
   * @param {number} status An optional status code for the response (e.g., 302.)
   * @returns {Response}    A Response object.
   */
  static redirect(url, status = 302) {
    if (!isRedirect$1(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response3(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response3(null, { status: 0, statusText: "" });
    response[INTERNALS$4].type = "error";
    return response;
  }
  static json(data = void 0, init = {}) {
    const body = JSON.stringify(data);
    if (body === void 0) {
      throw new TypeError("data is not JSON serializable");
    }
    const headers = new Headers$1(init && init.headers);
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return new Response3(body, {
      ...init,
      headers
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response$1.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
const getSearch$1 = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
function stripURLForUseAsAReferrer$1(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
const ReferrerPolicy$1 = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
const DEFAULT_REFERRER_POLICY$1 = "strict-origin-when-cross-origin";
function validateReferrerPolicy$1(referrerPolicy) {
  if (!ReferrerPolicy$1.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy$1(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy$1(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy$1(url);
}
function determineRequestsReferrer$1(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer$1(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer$1(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy$1(referrerURL) && !isUrlPotentiallyTrustworthy$1(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy$1(referrerURL) && !isUrlPotentiallyTrustworthy$1(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy$1(referrerURL) && !isUrlPotentiallyTrustworthy$1(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader$1(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy$1.has(token)) {
      policy = token;
    }
  }
  return policy;
}
const INTERNALS$3 = /* @__PURE__ */ Symbol("Request internals");
const isRequest$1 = (object) => {
  return typeof object === "object" && typeof object[INTERNALS$3] === "object";
};
const doBadDataWarn$1 = deprecate(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
let Request$1 = class Request3 extends Body$1 {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest$1(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest$1(init) && "data" in init) {
      doBadDataWarn$1();
    }
    if ((init.body != null || isRequest$1(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest$1(input) && input.body !== null ? clone$1(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers$1(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType$1(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest$1(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal$1(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS$3] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  /** @returns {string} */
  get method() {
    return this[INTERNALS$3].method;
  }
  /** @returns {string} */
  get url() {
    return format(this[INTERNALS$3].parsedURL);
  }
  /** @returns {Headers} */
  get headers() {
    return this[INTERNALS$3].headers;
  }
  get redirect() {
    return this[INTERNALS$3].redirect;
  }
  /** @returns {AbortSignal} */
  get signal() {
    return this[INTERNALS$3].signal;
  }
  // https://fetch.spec.whatwg.org/#dom-request-referrer
  get referrer() {
    if (this[INTERNALS$3].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS$3].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS$3].referrer) {
      return this[INTERNALS$3].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS$3].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS$3].referrerPolicy = validateReferrerPolicy$1(referrerPolicy);
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new Request3(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request$1.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
const getNodeRequestOptions$1 = (request) => {
  const { parsedURL } = request[INTERNALS$3];
  const headers = new Headers$1(request[INTERNALS$3].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes$1(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY$1;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS$3].referrer = determineRequestsReferrer$1(request);
  } else {
    request[INTERNALS$3].referrer = "no-referrer";
  }
  if (request[INTERNALS$3].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  const search = getSearch$1(parsedURL);
  const options = {
    // Overwrite search to retain trailing ? (issue #776)
    path: parsedURL.pathname + search,
    // The following options are not expressed in the URL
    method: request.method,
    headers: headers[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    /** @type {URL} */
    parsedURL,
    options
  };
};
let AbortError$1 = class AbortError2 extends FetchBaseError$1 {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
const supportedSchemas$1 = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch$1(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request$1(url, options_);
    const { parsedURL, options } = getNodeRequestOptions$1(request);
    if (!supportedSchemas$1.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response$1(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError$1("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError$1(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding$1(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders$1(response_.rawHeaders);
      if (isRedirect$1(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError$1(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError$1(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError$1(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers$1(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone$1(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain$1(request.url, locationURL) || !isSameProtocol$1(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError$1("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader$1(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch$1(new Request$1(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline$3(response_, new PassThrough$2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response$1(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib$1.Z_SYNC_FLUSH,
        finishFlush: zlib$1.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline$3(body, zlib$1.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response$1(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline$3(response_, new PassThrough$2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pipeline$3(body, zlib$1.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pipeline$3(body, zlib$1.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response$1(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response$1(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pipeline$3(body, zlib$1.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response$1(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response$1(body, responseOptions);
      resolve(response);
    });
    writeToStream$1(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding$1(request, errorCallback) {
  const LAST_CHUNK = Buffer$1.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer$1.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer$1.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer$1.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
const index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbortError: AbortError$1,
  Blob: Blob$1,
  FetchError: FetchError$1,
  File,
  FormData,
  Headers: Headers$1,
  Request: Request$1,
  Response: Response$1,
  default: fetch$1,
  isRedirect: isRedirect$1
});
class FetchBaseError3 extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class FetchError3 extends FetchBaseError3 {
  /**
   * @param  {string} message -      Error message for human
   * @param  {string} [type] -        Error type for machine
   * @param  {SystemError} [systemError] - For Node.js system error
   */
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
}
const NAME = Symbol.toStringTag;
const isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
const isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
const isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
const isDomainOrSubdomain2 = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
const isSameProtocol2 = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};
const pipeline = promisify(Stream.pipeline);
const INTERNALS$2 = /* @__PURE__ */ Symbol("Body internals");
class Body3 {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer$1.from(body.toString());
    } else if (isBlob(body)) ;
    else if (Buffer$1.isBuffer(body)) ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer$1.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer$1.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream) ;
    else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = Buffer$1.from(String(body));
    }
    let stream = body;
    if (Buffer$1.isBuffer(body)) {
      stream = Stream.Readable.from(body);
    } else if (isBlob(body)) {
      stream = Stream.Readable.from(body.stream());
    }
    this[INTERNALS$2] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError3 ? error_ : new FetchError3(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].stream;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(function() {
      return multipartParser;
    });
    return toFormData2(this.body, ct);
  }
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.arrayBuffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return consumeBody(this);
  }
}
Body3.prototype.buffer = deprecate(Body3.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body3.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer$1.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer$1.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError3(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError3 ? error : new FetchError3(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer$1.from(accum.join(""));
      }
      return Buffer$1.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError3(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError3(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance[INTERNALS$2];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough$2({ highWaterMark });
    p2 = new PassThrough$2({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].stream = p1;
    body = p2;
  }
  return body;
};
const getNonSpecFormDataBoundary = deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
const extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer$1.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes = (request) => {
  const { body } = request[INTERNALS$2];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer$1.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
const writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};
const validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
const validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
class Headers4 extends URLSearchParams {
  /**
   * Headers class
   *
   * @constructor
   * @param {HeadersInit} [init] - Response headers
   */
  constructor(init) {
    let result = [];
    if (init instanceof Headers4) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) ;
    else if (typeof init === "object" && !types.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  /**
   * @type {() => IterableIterator<[string, string]>}
   */
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Node-fetch non-spec method
   * returning all headers and their values as array
   * @returns {Record<string, string[]>}
   */
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  /**
   * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
   */
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
}
Object.defineProperties(
  Headers4.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders(headers = []) {
  return new Headers4(
    headers.reduce((result, value, index2, array) => {
      if (index2 % 2 === 0) {
        result.push(array.slice(index2, index2 + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
const redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
const isRedirect = (code) => {
  return redirectStatus.has(code);
};
const INTERNALS$1 = /* @__PURE__ */ Symbol("Response internals");
class Response4 extends Body3 {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers4(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new Response4(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  /**
   * @param {string} url    The URL that the new response is to originate from.
   * @param {number} status An optional status code for the response (e.g., 302.)
   * @returns {Response}    A Response object.
   */
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response4(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response4(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  static json(data = void 0, init = {}) {
    const body = JSON.stringify(data);
    if (body === void 0) {
      throw new TypeError("data is not JSON serializable");
    }
    const headers = new Headers4(init && init.headers);
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return new Response4(body, {
      ...init,
      headers
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(Response4.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
const getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
const ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
const DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
const INTERNALS = /* @__PURE__ */ Symbol("Request internals");
const isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
const doBadDataWarn = deprecate(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
class Request4 extends Body3 {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers4(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  /** @returns {string} */
  get method() {
    return this[INTERNALS].method;
  }
  /** @returns {string} */
  get url() {
    return format(this[INTERNALS].parsedURL);
  }
  /** @returns {Headers} */
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  /** @returns {AbortSignal} */
  get signal() {
    return this[INTERNALS].signal;
  }
  // https://fetch.spec.whatwg.org/#dom-request-referrer
  get referrer() {
    if (this[INTERNALS].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS].referrer) {
      return this[INTERNALS].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new Request4(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(Request4.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
const getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers4(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS].referrer = "no-referrer";
  }
  if (request[INTERNALS].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  const search = getSearch(parsedURL);
  const options = {
    // Overwrite search to retain trailing ? (issue #776)
    path: parsedURL.pathname + search,
    // The following options are not expressed in the URL
    method: request.method,
    headers: headers[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    /** @type {URL} */
    parsedURL,
    options
  };
};
class AbortError3 extends FetchBaseError3 {
  constructor(message, type = "aborted") {
    super(message, type);
  }
}
const supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request4(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response4(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? https : http).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError3("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError3(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError3(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError3(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError3(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers4(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain2(request.url, locationURL) || !isSameProtocol2(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError3("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request4(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pipeline$3(response_, new PassThrough$2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response4(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib$1.Z_SYNC_FLUSH,
        finishFlush: zlib$1.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline$3(body, zlib$1.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response4(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline$3(response_, new PassThrough$2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pipeline$3(body, zlib$1.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pipeline$3(body, zlib$1.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response4(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response4(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pipeline$3(body, zlib$1.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response4(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response4(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer$1.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer$1.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer$1.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer$1.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbortError: AbortError3,
  Blob: Blob$1,
  FetchError: FetchError3,
  File,
  FormData,
  Headers: Headers4,
  Request: Request4,
  Response: Response4,
  default: fetch,
  isRedirect
});
let s$2 = 0;
const S$2 = {
  START_BOUNDARY: s$2++,
  HEADER_FIELD_START: s$2++,
  HEADER_FIELD: s$2++,
  HEADER_VALUE_START: s$2++,
  HEADER_VALUE: s$2++,
  HEADER_VALUE_ALMOST_DONE: s$2++,
  HEADERS_ALMOST_DONE: s$2++,
  PART_DATA_START: s$2++,
  PART_DATA: s$2++,
  END: s$2++
};
let f$2 = 1;
const F$2 = {
  PART_BOUNDARY: f$2,
  LAST_BOUNDARY: f$2 *= 2
};
const LF$2 = 10;
const CR$2 = 13;
const SPACE$2 = 32;
const HYPHEN$2 = 45;
const COLON$2 = 58;
const A$2 = 97;
const Z$2 = 122;
const lower$2 = (c) => c | 32;
const noop$2 = () => {
};
let MultipartParser$2 = class MultipartParser {
  /**
   * @param {string} boundary
   */
  constructor(boundary) {
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop$2;
    this.onHeaderField = noop$2;
    this.onHeadersEnd = noop$2;
    this.onHeaderValue = noop$2;
    this.onPartBegin = noop$2;
    this.onPartData = noop$2;
    this.onPartEnd = noop$2;
    this.boundaryChars = {};
    boundary = "\r\n--" + boundary;
    const ui8a = new Uint8Array(boundary.length);
    for (let i = 0; i < boundary.length; i++) {
      ui8a[i] = boundary.charCodeAt(i);
      this.boundaryChars[ui8a[i]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S$2.START_BOUNDARY;
  }
  /**
   * @param {Uint8Array} data
   */
  write(data) {
    let i = 0;
    const length_ = data.length;
    let previousIndex = this.index;
    let { lookbehind, boundary, boundaryChars, index: index2, state, flags } = this;
    const boundaryLength = this.boundary.length;
    const boundaryEnd = boundaryLength - 1;
    const bufferLength = data.length;
    let c;
    let cl;
    const mark = (name) => {
      this[name + "Mark"] = i;
    };
    const clear = (name) => {
      delete this[name + "Mark"];
    };
    const callback = (callbackSymbol, start, end, ui8a) => {
      if (start === void 0 || start !== end) {
        this[callbackSymbol](ui8a && ui8a.subarray(start, end));
      }
    };
    const dataCallback = (name, clear2) => {
      const markSymbol = name + "Mark";
      if (!(markSymbol in this)) {
        return;
      }
      if (clear2) {
        callback(name, this[markSymbol], i, data);
        delete this[markSymbol];
      } else {
        callback(name, this[markSymbol], data.length, data);
        this[markSymbol] = 0;
      }
    };
    for (i = 0; i < length_; i++) {
      c = data[i];
      switch (state) {
        case S$2.START_BOUNDARY:
          if (index2 === boundary.length - 2) {
            if (c === HYPHEN$2) {
              flags |= F$2.LAST_BOUNDARY;
            } else if (c !== CR$2) {
              return;
            }
            index2++;
            break;
          } else if (index2 - 1 === boundary.length - 2) {
            if (flags & F$2.LAST_BOUNDARY && c === HYPHEN$2) {
              state = S$2.END;
              flags = 0;
            } else if (!(flags & F$2.LAST_BOUNDARY) && c === LF$2) {
              index2 = 0;
              callback("onPartBegin");
              state = S$2.HEADER_FIELD_START;
            } else {
              return;
            }
            break;
          }
          if (c !== boundary[index2 + 2]) {
            index2 = -2;
          }
          if (c === boundary[index2 + 2]) {
            index2++;
          }
          break;
        case S$2.HEADER_FIELD_START:
          state = S$2.HEADER_FIELD;
          mark("onHeaderField");
          index2 = 0;
        // falls through
        case S$2.HEADER_FIELD:
          if (c === CR$2) {
            clear("onHeaderField");
            state = S$2.HEADERS_ALMOST_DONE;
            break;
          }
          index2++;
          if (c === HYPHEN$2) {
            break;
          }
          if (c === COLON$2) {
            if (index2 === 1) {
              return;
            }
            dataCallback("onHeaderField", true);
            state = S$2.HEADER_VALUE_START;
            break;
          }
          cl = lower$2(c);
          if (cl < A$2 || cl > Z$2) {
            return;
          }
          break;
        case S$2.HEADER_VALUE_START:
          if (c === SPACE$2) {
            break;
          }
          mark("onHeaderValue");
          state = S$2.HEADER_VALUE;
        // falls through
        case S$2.HEADER_VALUE:
          if (c === CR$2) {
            dataCallback("onHeaderValue", true);
            callback("onHeaderEnd");
            state = S$2.HEADER_VALUE_ALMOST_DONE;
          }
          break;
        case S$2.HEADER_VALUE_ALMOST_DONE:
          if (c !== LF$2) {
            return;
          }
          state = S$2.HEADER_FIELD_START;
          break;
        case S$2.HEADERS_ALMOST_DONE:
          if (c !== LF$2) {
            return;
          }
          callback("onHeadersEnd");
          state = S$2.PART_DATA_START;
          break;
        case S$2.PART_DATA_START:
          state = S$2.PART_DATA;
          mark("onPartData");
        // falls through
        case S$2.PART_DATA:
          previousIndex = index2;
          if (index2 === 0) {
            i += boundaryEnd;
            while (i < bufferLength && !(data[i] in boundaryChars)) {
              i += boundaryLength;
            }
            i -= boundaryEnd;
            c = data[i];
          }
          if (index2 < boundary.length) {
            if (boundary[index2] === c) {
              if (index2 === 0) {
                dataCallback("onPartData", true);
              }
              index2++;
            } else {
              index2 = 0;
            }
          } else if (index2 === boundary.length) {
            index2++;
            if (c === CR$2) {
              flags |= F$2.PART_BOUNDARY;
            } else if (c === HYPHEN$2) {
              flags |= F$2.LAST_BOUNDARY;
            } else {
              index2 = 0;
            }
          } else if (index2 - 1 === boundary.length) {
            if (flags & F$2.PART_BOUNDARY) {
              index2 = 0;
              if (c === LF$2) {
                flags &= ~F$2.PART_BOUNDARY;
                callback("onPartEnd");
                callback("onPartBegin");
                state = S$2.HEADER_FIELD_START;
                break;
              }
            } else if (flags & F$2.LAST_BOUNDARY) {
              if (c === HYPHEN$2) {
                callback("onPartEnd");
                state = S$2.END;
                flags = 0;
              } else {
                index2 = 0;
              }
            } else {
              index2 = 0;
            }
          }
          if (index2 > 0) {
            lookbehind[index2 - 1] = c;
          } else if (previousIndex > 0) {
            const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
            callback("onPartData", 0, previousIndex, _lookbehind);
            previousIndex = 0;
            mark("onPartData");
            i--;
          }
          break;
        case S$2.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${state}`);
      }
    }
    dataCallback("onHeaderField");
    dataCallback("onHeaderValue");
    dataCallback("onPartData");
    this.index = index2;
    this.state = state;
    this.flags = flags;
  }
  end() {
    if (this.state === S$2.HEADER_FIELD_START && this.index === 0 || this.state === S$2.PART_DATA && this.index === this.boundary.length) {
      this.onPartEnd();
    } else if (this.state !== S$2.END) {
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
  }
};
function _fileName$2(headerValue) {
  const m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m) {
    return;
  }
  const match = m[2] || m[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m2, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData$2(Body4, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser$2(m[1] || m[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m2 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m2) {
        entryName = m2[2] || m2[3] || "";
      }
      filename = _fileName$2(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body4) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
const multipartParser$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toFormData: toFormData$2
});
let s$1 = 0;
const S$1 = {
  START_BOUNDARY: s$1++,
  HEADER_FIELD_START: s$1++,
  HEADER_FIELD: s$1++,
  HEADER_VALUE_START: s$1++,
  HEADER_VALUE: s$1++,
  HEADER_VALUE_ALMOST_DONE: s$1++,
  HEADERS_ALMOST_DONE: s$1++,
  PART_DATA_START: s$1++,
  PART_DATA: s$1++,
  END: s$1++
};
let f$1 = 1;
const F$1 = {
  PART_BOUNDARY: f$1,
  LAST_BOUNDARY: f$1 *= 2
};
const LF$1 = 10;
const CR$1 = 13;
const SPACE$1 = 32;
const HYPHEN$1 = 45;
const COLON$1 = 58;
const A$1 = 97;
const Z$1 = 122;
const lower$1 = (c) => c | 32;
const noop$1 = () => {
};
let MultipartParser$1 = class MultipartParser2 {
  /**
   * @param {string} boundary
   */
  constructor(boundary) {
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop$1;
    this.onHeaderField = noop$1;
    this.onHeadersEnd = noop$1;
    this.onHeaderValue = noop$1;
    this.onPartBegin = noop$1;
    this.onPartData = noop$1;
    this.onPartEnd = noop$1;
    this.boundaryChars = {};
    boundary = "\r\n--" + boundary;
    const ui8a = new Uint8Array(boundary.length);
    for (let i = 0; i < boundary.length; i++) {
      ui8a[i] = boundary.charCodeAt(i);
      this.boundaryChars[ui8a[i]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S$1.START_BOUNDARY;
  }
  /**
   * @param {Uint8Array} data
   */
  write(data) {
    let i = 0;
    const length_ = data.length;
    let previousIndex = this.index;
    let { lookbehind, boundary, boundaryChars, index: index2, state, flags } = this;
    const boundaryLength = this.boundary.length;
    const boundaryEnd = boundaryLength - 1;
    const bufferLength = data.length;
    let c;
    let cl;
    const mark = (name) => {
      this[name + "Mark"] = i;
    };
    const clear = (name) => {
      delete this[name + "Mark"];
    };
    const callback = (callbackSymbol, start, end, ui8a) => {
      if (start === void 0 || start !== end) {
        this[callbackSymbol](ui8a && ui8a.subarray(start, end));
      }
    };
    const dataCallback = (name, clear2) => {
      const markSymbol = name + "Mark";
      if (!(markSymbol in this)) {
        return;
      }
      if (clear2) {
        callback(name, this[markSymbol], i, data);
        delete this[markSymbol];
      } else {
        callback(name, this[markSymbol], data.length, data);
        this[markSymbol] = 0;
      }
    };
    for (i = 0; i < length_; i++) {
      c = data[i];
      switch (state) {
        case S$1.START_BOUNDARY:
          if (index2 === boundary.length - 2) {
            if (c === HYPHEN$1) {
              flags |= F$1.LAST_BOUNDARY;
            } else if (c !== CR$1) {
              return;
            }
            index2++;
            break;
          } else if (index2 - 1 === boundary.length - 2) {
            if (flags & F$1.LAST_BOUNDARY && c === HYPHEN$1) {
              state = S$1.END;
              flags = 0;
            } else if (!(flags & F$1.LAST_BOUNDARY) && c === LF$1) {
              index2 = 0;
              callback("onPartBegin");
              state = S$1.HEADER_FIELD_START;
            } else {
              return;
            }
            break;
          }
          if (c !== boundary[index2 + 2]) {
            index2 = -2;
          }
          if (c === boundary[index2 + 2]) {
            index2++;
          }
          break;
        case S$1.HEADER_FIELD_START:
          state = S$1.HEADER_FIELD;
          mark("onHeaderField");
          index2 = 0;
        // falls through
        case S$1.HEADER_FIELD:
          if (c === CR$1) {
            clear("onHeaderField");
            state = S$1.HEADERS_ALMOST_DONE;
            break;
          }
          index2++;
          if (c === HYPHEN$1) {
            break;
          }
          if (c === COLON$1) {
            if (index2 === 1) {
              return;
            }
            dataCallback("onHeaderField", true);
            state = S$1.HEADER_VALUE_START;
            break;
          }
          cl = lower$1(c);
          if (cl < A$1 || cl > Z$1) {
            return;
          }
          break;
        case S$1.HEADER_VALUE_START:
          if (c === SPACE$1) {
            break;
          }
          mark("onHeaderValue");
          state = S$1.HEADER_VALUE;
        // falls through
        case S$1.HEADER_VALUE:
          if (c === CR$1) {
            dataCallback("onHeaderValue", true);
            callback("onHeaderEnd");
            state = S$1.HEADER_VALUE_ALMOST_DONE;
          }
          break;
        case S$1.HEADER_VALUE_ALMOST_DONE:
          if (c !== LF$1) {
            return;
          }
          state = S$1.HEADER_FIELD_START;
          break;
        case S$1.HEADERS_ALMOST_DONE:
          if (c !== LF$1) {
            return;
          }
          callback("onHeadersEnd");
          state = S$1.PART_DATA_START;
          break;
        case S$1.PART_DATA_START:
          state = S$1.PART_DATA;
          mark("onPartData");
        // falls through
        case S$1.PART_DATA:
          previousIndex = index2;
          if (index2 === 0) {
            i += boundaryEnd;
            while (i < bufferLength && !(data[i] in boundaryChars)) {
              i += boundaryLength;
            }
            i -= boundaryEnd;
            c = data[i];
          }
          if (index2 < boundary.length) {
            if (boundary[index2] === c) {
              if (index2 === 0) {
                dataCallback("onPartData", true);
              }
              index2++;
            } else {
              index2 = 0;
            }
          } else if (index2 === boundary.length) {
            index2++;
            if (c === CR$1) {
              flags |= F$1.PART_BOUNDARY;
            } else if (c === HYPHEN$1) {
              flags |= F$1.LAST_BOUNDARY;
            } else {
              index2 = 0;
            }
          } else if (index2 - 1 === boundary.length) {
            if (flags & F$1.PART_BOUNDARY) {
              index2 = 0;
              if (c === LF$1) {
                flags &= ~F$1.PART_BOUNDARY;
                callback("onPartEnd");
                callback("onPartBegin");
                state = S$1.HEADER_FIELD_START;
                break;
              }
            } else if (flags & F$1.LAST_BOUNDARY) {
              if (c === HYPHEN$1) {
                callback("onPartEnd");
                state = S$1.END;
                flags = 0;
              } else {
                index2 = 0;
              }
            } else {
              index2 = 0;
            }
          }
          if (index2 > 0) {
            lookbehind[index2 - 1] = c;
          } else if (previousIndex > 0) {
            const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
            callback("onPartData", 0, previousIndex, _lookbehind);
            previousIndex = 0;
            mark("onPartData");
            i--;
          }
          break;
        case S$1.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${state}`);
      }
    }
    dataCallback("onHeaderField");
    dataCallback("onHeaderValue");
    dataCallback("onPartData");
    this.index = index2;
    this.state = state;
    this.flags = flags;
  }
  end() {
    if (this.state === S$1.HEADER_FIELD_START && this.index === 0 || this.state === S$1.PART_DATA && this.index === this.boundary.length) {
      this.onPartEnd();
    } else if (this.state !== S$1.END) {
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
  }
};
function _fileName$1(headerValue) {
  const m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m) {
    return;
  }
  const match = m[2] || m[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m2, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData$1(Body4, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser$1(m[1] || m[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m2 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m2) {
        entryName = m2[2] || m2[3] || "";
      }
      filename = _fileName$1(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body4) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
const multipartParser$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toFormData: toFormData$1
});
let s = 0;
const S = {
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  END: s++
};
let f = 1;
const F = {
  PART_BOUNDARY: f,
  LAST_BOUNDARY: f *= 2
};
const LF = 10;
const CR = 13;
const SPACE = 32;
const HYPHEN = 45;
const COLON = 58;
const A = 97;
const Z = 122;
const lower = (c) => c | 32;
const noop = () => {
};
class MultipartParser3 {
  /**
   * @param {string} boundary
   */
  constructor(boundary) {
    this.index = 0;
    this.flags = 0;
    this.onHeaderEnd = noop;
    this.onHeaderField = noop;
    this.onHeadersEnd = noop;
    this.onHeaderValue = noop;
    this.onPartBegin = noop;
    this.onPartData = noop;
    this.onPartEnd = noop;
    this.boundaryChars = {};
    boundary = "\r\n--" + boundary;
    const ui8a = new Uint8Array(boundary.length);
    for (let i = 0; i < boundary.length; i++) {
      ui8a[i] = boundary.charCodeAt(i);
      this.boundaryChars[ui8a[i]] = true;
    }
    this.boundary = ui8a;
    this.lookbehind = new Uint8Array(this.boundary.length + 8);
    this.state = S.START_BOUNDARY;
  }
  /**
   * @param {Uint8Array} data
   */
  write(data) {
    let i = 0;
    const length_ = data.length;
    let previousIndex = this.index;
    let { lookbehind, boundary, boundaryChars, index: index2, state, flags } = this;
    const boundaryLength = this.boundary.length;
    const boundaryEnd = boundaryLength - 1;
    const bufferLength = data.length;
    let c;
    let cl;
    const mark = (name) => {
      this[name + "Mark"] = i;
    };
    const clear = (name) => {
      delete this[name + "Mark"];
    };
    const callback = (callbackSymbol, start, end, ui8a) => {
      if (start === void 0 || start !== end) {
        this[callbackSymbol](ui8a && ui8a.subarray(start, end));
      }
    };
    const dataCallback = (name, clear2) => {
      const markSymbol = name + "Mark";
      if (!(markSymbol in this)) {
        return;
      }
      if (clear2) {
        callback(name, this[markSymbol], i, data);
        delete this[markSymbol];
      } else {
        callback(name, this[markSymbol], data.length, data);
        this[markSymbol] = 0;
      }
    };
    for (i = 0; i < length_; i++) {
      c = data[i];
      switch (state) {
        case S.START_BOUNDARY:
          if (index2 === boundary.length - 2) {
            if (c === HYPHEN) {
              flags |= F.LAST_BOUNDARY;
            } else if (c !== CR) {
              return;
            }
            index2++;
            break;
          } else if (index2 - 1 === boundary.length - 2) {
            if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
              state = S.END;
              flags = 0;
            } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
              index2 = 0;
              callback("onPartBegin");
              state = S.HEADER_FIELD_START;
            } else {
              return;
            }
            break;
          }
          if (c !== boundary[index2 + 2]) {
            index2 = -2;
          }
          if (c === boundary[index2 + 2]) {
            index2++;
          }
          break;
        case S.HEADER_FIELD_START:
          state = S.HEADER_FIELD;
          mark("onHeaderField");
          index2 = 0;
        // falls through
        case S.HEADER_FIELD:
          if (c === CR) {
            clear("onHeaderField");
            state = S.HEADERS_ALMOST_DONE;
            break;
          }
          index2++;
          if (c === HYPHEN) {
            break;
          }
          if (c === COLON) {
            if (index2 === 1) {
              return;
            }
            dataCallback("onHeaderField", true);
            state = S.HEADER_VALUE_START;
            break;
          }
          cl = lower(c);
          if (cl < A || cl > Z) {
            return;
          }
          break;
        case S.HEADER_VALUE_START:
          if (c === SPACE) {
            break;
          }
          mark("onHeaderValue");
          state = S.HEADER_VALUE;
        // falls through
        case S.HEADER_VALUE:
          if (c === CR) {
            dataCallback("onHeaderValue", true);
            callback("onHeaderEnd");
            state = S.HEADER_VALUE_ALMOST_DONE;
          }
          break;
        case S.HEADER_VALUE_ALMOST_DONE:
          if (c !== LF) {
            return;
          }
          state = S.HEADER_FIELD_START;
          break;
        case S.HEADERS_ALMOST_DONE:
          if (c !== LF) {
            return;
          }
          callback("onHeadersEnd");
          state = S.PART_DATA_START;
          break;
        case S.PART_DATA_START:
          state = S.PART_DATA;
          mark("onPartData");
        // falls through
        case S.PART_DATA:
          previousIndex = index2;
          if (index2 === 0) {
            i += boundaryEnd;
            while (i < bufferLength && !(data[i] in boundaryChars)) {
              i += boundaryLength;
            }
            i -= boundaryEnd;
            c = data[i];
          }
          if (index2 < boundary.length) {
            if (boundary[index2] === c) {
              if (index2 === 0) {
                dataCallback("onPartData", true);
              }
              index2++;
            } else {
              index2 = 0;
            }
          } else if (index2 === boundary.length) {
            index2++;
            if (c === CR) {
              flags |= F.PART_BOUNDARY;
            } else if (c === HYPHEN) {
              flags |= F.LAST_BOUNDARY;
            } else {
              index2 = 0;
            }
          } else if (index2 - 1 === boundary.length) {
            if (flags & F.PART_BOUNDARY) {
              index2 = 0;
              if (c === LF) {
                flags &= ~F.PART_BOUNDARY;
                callback("onPartEnd");
                callback("onPartBegin");
                state = S.HEADER_FIELD_START;
                break;
              }
            } else if (flags & F.LAST_BOUNDARY) {
              if (c === HYPHEN) {
                callback("onPartEnd");
                state = S.END;
                flags = 0;
              } else {
                index2 = 0;
              }
            } else {
              index2 = 0;
            }
          }
          if (index2 > 0) {
            lookbehind[index2 - 1] = c;
          } else if (previousIndex > 0) {
            const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
            callback("onPartData", 0, previousIndex, _lookbehind);
            previousIndex = 0;
            mark("onPartData");
            i--;
          }
          break;
        case S.END:
          break;
        default:
          throw new Error(`Unexpected state entered: ${state}`);
      }
    }
    dataCallback("onHeaderField");
    dataCallback("onHeaderValue");
    dataCallback("onPartData");
    this.index = index2;
    this.state = state;
    this.flags = flags;
  }
  end() {
    if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
      this.onPartEnd();
    } else if (this.state !== S.END) {
      throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
  }
}
function _fileName(headerValue) {
  const m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m) {
    return;
  }
  const match = m[2] || m[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m2, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body4, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser3(m[1] || m[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m2 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m2) {
        entryName = m2[2] || m2[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body4) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
const multipartParser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toFormData
});
export {
  index$1 as a,
  index as b,
  index$2 as i,
  require$$0 as r
};
