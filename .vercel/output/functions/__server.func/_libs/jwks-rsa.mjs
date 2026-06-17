import { r as requireSrc$1 } from "./debug.mjs";
import { r as require$$0 } from "./jose.mjs";
import require$$0$1 from "http";
import require$$1 from "https";
import { r as requireLib } from "./lru-memoizer.mjs";
import require$$0$2 from "util";
import { r as requireLimiter } from "./limiter.mjs";
var src = { exports: {} };
var JwksError_1;
var hasRequiredJwksError;
function requireJwksError() {
  if (hasRequiredJwksError) return JwksError_1;
  hasRequiredJwksError = 1;
  function JwksError(message) {
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "JwksError";
    this.message = message;
  }
  JwksError.prototype = Object.create(Error.prototype);
  JwksError.prototype.constructor = JwksError;
  JwksError_1 = JwksError;
  return JwksError_1;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const jose = require$$0;
  const JwksError = requireJwksError();
  function resolveAlg(jwk) {
    if (jwk.alg) {
      return jwk.alg;
    }
    if (jwk.kty === "RSA") {
      return "RS256";
    }
    if (jwk.kty === "EC") {
      switch (jwk.crv) {
        case "P-256":
          return "ES256";
        case "P-384":
          return "ES384";
        case "P-521":
          return "ES512";
      }
    }
    if (jwk.kty === "OKP") {
      switch (jwk.crv) {
        case "Ed25519":
        case "Ed448":
          return "EdDSA";
      }
    }
    throw new JwksError("Unsupported JWK");
  }
  async function retrieveSigningKeys(jwks) {
    const results = [];
    jwks = jwks.filter(({ use }) => use === "sig" || use === void 0).filter(({ kty }) => kty === "RSA" || kty === "EC" || kty === "OKP");
    for (const jwk of jwks) {
      try {
        const key = await jose.importJWK({ ...jwk, ext: true }, resolveAlg(jwk));
        if (key.type !== "public") {
          continue;
        }
        let getSpki;
        switch (key[Symbol.toStringTag]) {
          case "CryptoKey": {
            const spki = await jose.exportSPKI(key);
            getSpki = () => spki;
            break;
          }
          case "KeyObject":
          // Assume legacy Node.js version without the Symbol.toStringTag backported
          // Fall through
          default:
            getSpki = () => key.export({ format: "pem", type: "spki" });
        }
        results.push({
          get publicKey() {
            return getSpki();
          },
          get rsaPublicKey() {
            return getSpki();
          },
          getPublicKey() {
            return getSpki();
          },
          ...typeof jwk.kid === "string" && jwk.kid ? { kid: jwk.kid } : void 0,
          ...typeof jwk.alg === "string" && jwk.alg ? { alg: jwk.alg } : void 0
        });
      } catch (err) {
        continue;
      }
    }
    return results;
  }
  utils = {
    retrieveSigningKeys
  };
  return utils;
}
var request = {};
var ArgumentError_1;
var hasRequiredArgumentError;
function requireArgumentError() {
  if (hasRequiredArgumentError) return ArgumentError_1;
  hasRequiredArgumentError = 1;
  function ArgumentError(message) {
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "ArgumentError";
    this.message = message;
  }
  ArgumentError.prototype = Object.create(Error.prototype);
  ArgumentError.prototype.constructor = ArgumentError;
  ArgumentError_1 = ArgumentError;
  return ArgumentError_1;
}
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest) return request;
  hasRequiredRequest = 1;
  const http = require$$0$1;
  const https = require$$1;
  const ArgumentError = requireArgumentError();
  request.default = (options) => {
    if (options.fetcher) {
      return options.fetcher(options.uri);
    }
    return new Promise((resolve, reject) => {
      let url;
      try {
        url = new URL(options.uri);
      } catch (err) {
        throw new ArgumentError("Invalid JWKS URI: The provided URI is not a valid URL.");
      }
      const { hostname, port, protocol, pathname, search } = url;
      const path = pathname + search;
      const requestOptions = {
        hostname,
        path,
        port,
        method: "GET",
        ...options.headers && { headers: { ...options.headers } },
        ...options.timeout && { timeout: options.timeout },
        ...options.agent && { agent: options.agent }
      };
      const httpRequestLib = protocol === "https:" ? https : http;
      const httpRequest = httpRequestLib.request(requestOptions, (res) => {
        let rawData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const errorMsg = res.body && (res.body.message || res.body) || res.statusMessage || `Http Error ${res.statusCode}`;
            reject({ errorMsg });
          } else {
            try {
              resolve(rawData && JSON.parse(rawData));
            } catch (error) {
              reject(error);
            }
          }
        });
      });
      httpRequest.on("timeout", () => httpRequest.destroy()).on("error", (e) => reject(e)).end();
    });
  };
  return request;
}
var cache = {};
var hasRequiredCache;
function requireCache() {
  if (hasRequiredCache) return cache;
  hasRequiredCache = 1;
  const logger = requireSrc$1()("jwks");
  const memoizer = requireLib();
  const { promisify, callbackify } = require$$0$2;
  function cacheWrapper(client, { cacheMaxEntries = 5, cacheMaxAge = 6e5 }) {
    logger(`Configured caching of signing keys. Max: ${cacheMaxEntries} / Age: ${cacheMaxAge}`);
    return promisify(memoizer({
      hash: (kid) => kid,
      load: callbackify(client.getSigningKey.bind(client)),
      ttl: cacheMaxAge,
      max: cacheMaxEntries
    }));
  }
  cache.default = cacheWrapper;
  return cache;
}
var rateLimit = {};
var JwksRateLimitError_1;
var hasRequiredJwksRateLimitError;
function requireJwksRateLimitError() {
  if (hasRequiredJwksRateLimitError) return JwksRateLimitError_1;
  hasRequiredJwksRateLimitError = 1;
  function JwksRateLimitError(message) {
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "JwksRateLimitError";
    this.message = message;
  }
  JwksRateLimitError.prototype = Object.create(Error.prototype);
  JwksRateLimitError.prototype.constructor = JwksRateLimitError;
  JwksRateLimitError_1 = JwksRateLimitError;
  return JwksRateLimitError_1;
}
var hasRequiredRateLimit;
function requireRateLimit() {
  if (hasRequiredRateLimit) return rateLimit;
  hasRequiredRateLimit = 1;
  const logger = requireSrc$1()("jwks");
  const { RateLimiter } = requireLimiter();
  const JwksRateLimitError = requireJwksRateLimitError();
  function rateLimitWrapper(client, { jwksRequestsPerMinute = 10 }) {
    const getSigningKey = client.getSigningKey.bind(client);
    const limiter = new RateLimiter(jwksRequestsPerMinute, "minute", true);
    logger(`Configured rate limiting to JWKS endpoint at ${jwksRequestsPerMinute}/minute`);
    return async (kid) => await new Promise((resolve, reject) => {
      limiter.removeTokens(1, async (err, remaining) => {
        if (err) {
          reject(err);
        }
        logger("Requests to the JWKS endpoint available for the next minute:", remaining);
        if (remaining < 0) {
          logger("Too many requests to the JWKS endpoint");
          reject(new JwksRateLimitError("Too many requests to the JWKS endpoint"));
        } else {
          try {
            const key = await getSigningKey(kid);
            resolve(key);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  rateLimit.default = rateLimitWrapper;
  return rateLimit;
}
var interceptor = {};
var hasRequiredInterceptor;
function requireInterceptor() {
  if (hasRequiredInterceptor) return interceptor;
  hasRequiredInterceptor = 1;
  const retrieveSigningKeys = requireUtils().retrieveSigningKeys;
  function getKeysInterceptor(client, { getKeysInterceptor: getKeysInterceptor2 }) {
    const getSigningKey = client.getSigningKey.bind(client);
    return async (kid) => {
      const keys = await getKeysInterceptor2();
      let signingKeys;
      if (keys && keys.length) {
        signingKeys = await retrieveSigningKeys(keys);
      }
      if (signingKeys && signingKeys.length) {
        const key = signingKeys.find((k) => !kid || k.kid === kid);
        if (key) {
          return key;
        }
      }
      return getSigningKey(kid);
    };
  }
  interceptor.default = getKeysInterceptor;
  return interceptor;
}
var callbackSupport = {};
var hasRequiredCallbackSupport;
function requireCallbackSupport() {
  if (hasRequiredCallbackSupport) return callbackSupport;
  hasRequiredCallbackSupport = 1;
  const { callbackify } = require$$0$2;
  const callbackSupport$1 = (client) => {
    const getSigningKey = client.getSigningKey.bind(client);
    return (kid, cb) => {
      if (cb) {
        const callbackFunc = callbackify(getSigningKey);
        return callbackFunc(kid, cb);
      }
      return getSigningKey(kid);
    };
  };
  callbackSupport.default = callbackSupport$1;
  return callbackSupport;
}
var wrappers;
var hasRequiredWrappers;
function requireWrappers() {
  if (hasRequiredWrappers) return wrappers;
  hasRequiredWrappers = 1;
  wrappers = {
    request: requireRequest().default,
    cacheSigningKey: requireCache().default,
    rateLimitSigningKey: requireRateLimit().default,
    getKeysInterceptor: requireInterceptor().default,
    callbackSupport: requireCallbackSupport().default
  };
  return wrappers;
}
var SigningKeyNotFoundError_1;
var hasRequiredSigningKeyNotFoundError;
function requireSigningKeyNotFoundError() {
  if (hasRequiredSigningKeyNotFoundError) return SigningKeyNotFoundError_1;
  hasRequiredSigningKeyNotFoundError = 1;
  function SigningKeyNotFoundError(message) {
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "SigningKeyNotFoundError";
    this.message = message;
  }
  SigningKeyNotFoundError.prototype = Object.create(Error.prototype);
  SigningKeyNotFoundError.prototype.constructor = SigningKeyNotFoundError;
  SigningKeyNotFoundError_1 = SigningKeyNotFoundError;
  return SigningKeyNotFoundError_1;
}
var JwksClient_1;
var hasRequiredJwksClient;
function requireJwksClient() {
  if (hasRequiredJwksClient) return JwksClient_1;
  hasRequiredJwksClient = 1;
  const logger = requireSrc$1()("jwks");
  const { retrieveSigningKeys } = requireUtils();
  const { request: request2, cacheSigningKey, rateLimitSigningKey, getKeysInterceptor, callbackSupport: callbackSupport2 } = requireWrappers();
  const JwksError = requireJwksError();
  const SigningKeyNotFoundError = requireSigningKeyNotFoundError();
  class JwksClient {
    constructor(options) {
      this.options = {
        rateLimit: false,
        cache: true,
        timeout: 3e4,
        ...options
      };
      if (this.options.getKeysInterceptor) {
        this.getSigningKey = getKeysInterceptor(this, options);
      }
      if (this.options.rateLimit) {
        this.getSigningKey = rateLimitSigningKey(this, options);
      }
      if (this.options.cache) {
        this.getSigningKey = cacheSigningKey(this, options);
      }
      this.getSigningKey = callbackSupport2(this, options);
    }
    async getKeys() {
      logger(`Fetching keys from '${this.options.jwksUri}'`);
      try {
        const res = await request2({
          uri: this.options.jwksUri,
          headers: this.options.requestHeaders,
          agent: this.options.requestAgent,
          timeout: this.options.timeout,
          fetcher: this.options.fetcher
        });
        logger("Keys:", res.keys);
        return res.keys;
      } catch (err) {
        const { errorMsg } = err;
        logger("Failure:", errorMsg || err);
        throw errorMsg ? new JwksError(errorMsg) : err;
      }
    }
    async getSigningKeys() {
      const keys = await this.getKeys();
      if (!keys || !keys.length) {
        throw new JwksError("The JWKS endpoint did not contain any keys");
      }
      const signingKeys = await retrieveSigningKeys(keys);
      if (!signingKeys.length) {
        throw new JwksError("The JWKS endpoint did not contain any signing keys");
      }
      logger("Signing Keys:", signingKeys);
      return signingKeys;
    }
    async getSigningKey(kid) {
      logger(`Fetching signing key for '${kid}'`);
      const keys = await this.getSigningKeys();
      const kidDefined = kid !== void 0 && kid !== null;
      if (!kidDefined && keys.length > 1) {
        logger("No KID specified and JWKS endpoint returned more than 1 key");
        throw new SigningKeyNotFoundError("No KID specified and JWKS endpoint returned more than 1 key");
      }
      const key = keys.find((k) => !kidDefined || k.kid === kid);
      if (key) {
        return key;
      } else {
        logger(`Unable to find a signing key that matches '${kid}'`);
        throw new SigningKeyNotFoundError(`Unable to find a signing key that matches '${kid}'`);
      }
    }
  }
  JwksClient_1 = {
    JwksClient
  };
  return JwksClient_1;
}
var errors;
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  errors = {
    ArgumentError: requireArgumentError(),
    JwksError: requireJwksError(),
    JwksRateLimitError: requireJwksRateLimitError(),
    SigningKeyNotFoundError: requireSigningKeyNotFoundError()
  };
  return errors;
}
var hapi = { exports: {} };
var config;
var hasRequiredConfig;
function requireConfig() {
  if (hasRequiredConfig) return config;
  hasRequiredConfig = 1;
  const allowedSignatureAlg = [
    "RS256",
    "RS384",
    "RS512",
    "PS256",
    "PS384",
    "PS512",
    "ES256",
    "ES384",
    "ES512",
    "EdDSA"
  ];
  config = allowedSignatureAlg;
  return config;
}
var hasRequiredHapi;
function requireHapi() {
  if (hasRequiredHapi) return hapi.exports;
  hasRequiredHapi = 1;
  (function(module) {
    const { ArgumentError } = requireErrors();
    const { JwksClient } = requireJwksClient();
    const supportedAlg = requireConfig();
    const handleSigningKeyError = (err, cb) => {
      if (err && err.name === "SigningKeyNotFoundError") {
        return cb(err, null, null);
      }
      if (err) {
        return cb(err, null, null);
      }
    };
    module.exports.hapiJwt2KeyAsync = (options) => {
      const secretProvider = module.exports.hapiJwt2Key(options);
      return function(decoded) {
        return new Promise((resolve, reject) => {
          const cb = (err, key) => {
            !key || err ? reject(err) : resolve({ key });
          };
          secretProvider(decoded, cb);
        });
      };
    };
    module.exports.hapiJwt2Key = function(options) {
      if (options === null || options === void 0) {
        throw new ArgumentError("An options object must be provided when initializing hapiJwt2Key");
      }
      const client = new JwksClient(options);
      const onError = options.handleSigningKeyError || handleSigningKeyError;
      return function secretProvider(decoded, cb) {
        if (!decoded || !decoded.header) {
          return cb(new Error("Cannot find a signing certificate if there is no header"), null, null);
        }
        if (!supportedAlg.includes(decoded.header.alg)) {
          return cb(new Error("Unsupported algorithm " + decoded.header.alg + " supplied."), null, null);
        }
        client.getSigningKey(decoded.header.kid).then((key) => {
          return cb(null, key.publicKey || key.rsaPublicKey, key);
        }).catch((err) => {
          return onError(err, (newError) => cb(newError, null, null));
        });
      };
    };
  })(hapi);
  return hapi.exports;
}
var express = {};
var hasRequiredExpress;
function requireExpress() {
  if (hasRequiredExpress) return express;
  hasRequiredExpress = 1;
  const { ArgumentError } = requireErrors();
  const { JwksClient } = requireJwksClient();
  const supportedAlg = requireConfig();
  const handleSigningKeyError = (err, cb) => {
    if (err && err.name === "SigningKeyNotFoundError") {
      return cb(null);
    }
    if (err) {
      return cb(err);
    }
  };
  express.expressJwtSecret = function(options) {
    if (options === null || options === void 0) {
      throw new ArgumentError("An options object must be provided when initializing expressJwtSecret");
    }
    const client = new JwksClient(options);
    const onError = options.handleSigningKeyError || handleSigningKeyError;
    const expressJwt7Provider = async (req, token) => {
      if (!token) {
        return;
      }
      const header = token.header;
      if (!header || !supportedAlg.includes(header.alg)) {
        return;
      }
      try {
        const key = await client.getSigningKey(header.kid);
        return key.publicKey || key.rsaPublicKey;
      } catch (err) {
        return new Promise((resolve, reject) => {
          onError(err, (newError) => {
            if (!newError) {
              return resolve();
            }
            reject(newError);
          });
        });
      }
    };
    return function secretProvider(req, header, payload, cb) {
      if (arguments.length === 4) {
        expressJwt7Provider(req, { header }).then((key) => {
          setImmediate(cb, null, key);
        }).catch((err) => {
          setImmediate(cb, err);
        });
        return;
      }
      return expressJwt7Provider(req, arguments[1]);
    };
  };
  return express;
}
var koa = {};
var hasRequiredKoa;
function requireKoa() {
  if (hasRequiredKoa) return koa;
  hasRequiredKoa = 1;
  const { ArgumentError } = requireErrors();
  const { JwksClient } = requireJwksClient();
  const supportedAlg = requireConfig();
  koa.koaJwtSecret = function(options = {}) {
    if (!options.jwksUri) {
      throw new ArgumentError("No JWKS provided. Please provide a jwksUri");
    }
    const client = new JwksClient(options);
    return function secretProvider({ alg, kid } = {}) {
      return new Promise((resolve, reject) => {
        if (!supportedAlg.includes(alg)) {
          return reject(new Error("Missing / invalid token algorithm"));
        }
        client.getSigningKey(kid).then((key) => {
          resolve(key.publicKey || key.rsaPublicKey);
        }).catch((err) => {
          if (options.handleSigningKeyError) {
            return options.handleSigningKeyError(err).then(reject);
          }
          return reject(err);
        });
      });
    };
  };
  return koa;
}
var passport = {};
var hasRequiredPassport;
function requirePassport() {
  if (hasRequiredPassport) return passport;
  hasRequiredPassport = 1;
  const jose = require$$0;
  const { ArgumentError } = requireErrors();
  const { JwksClient } = requireJwksClient();
  const supportedAlg = requireConfig();
  const handleSigningKeyError = (err, cb) => {
    if (err && err.name === "SigningKeyNotFoundError") {
      return cb(null);
    }
    if (err) {
      return cb(err);
    }
  };
  passport.passportJwtSecret = function(options) {
    if (options === null || options === void 0) {
      throw new ArgumentError("An options object must be provided when initializing passportJwtSecret");
    }
    if (!options.jwksUri) {
      throw new ArgumentError("No JWKS provided. Please provide a jwksUri");
    }
    const client = new JwksClient(options);
    const onError = options.handleSigningKeyError || handleSigningKeyError;
    return function secretProvider(req, rawJwtToken, cb) {
      let decoded;
      try {
        decoded = {
          payload: jose.decodeJwt(rawJwtToken),
          header: jose.decodeProtectedHeader(rawJwtToken)
        };
      } catch (err) {
        decoded = null;
      }
      if (!decoded || !supportedAlg.includes(decoded.header.alg)) {
        return cb(null, null);
      }
      client.getSigningKey(decoded.header.kid).then((key) => {
        cb(null, key.publicKey || key.rsaPublicKey);
      }).catch((err) => {
        onError(err, (newError) => cb(newError, null));
      });
    };
  };
  return passport;
}
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src.exports;
  hasRequiredSrc = 1;
  const { JwksClient } = requireJwksClient();
  const errors2 = requireErrors();
  const { hapiJwt2Key, hapiJwt2KeyAsync } = requireHapi();
  const { expressJwtSecret } = requireExpress();
  const { koaJwtSecret } = requireKoa();
  const { passportJwtSecret } = requirePassport();
  src.exports = (options) => {
    return new JwksClient(options);
  };
  src.exports.JwksClient = JwksClient;
  src.exports.ArgumentError = errors2.ArgumentError;
  src.exports.JwksError = errors2.JwksError;
  src.exports.JwksRateLimitError = errors2.JwksRateLimitError;
  src.exports.SigningKeyNotFoundError = errors2.SigningKeyNotFoundError;
  src.exports.expressJwtSecret = expressJwtSecret;
  src.exports.hapiJwt2Key = hapiJwt2Key;
  src.exports.hapiJwt2KeyAsync = hapiJwt2KeyAsync;
  src.exports.koaJwtSecret = koaJwtSecret;
  src.exports.passportJwtSecret = passportJwtSecret;
  return src.exports;
}
export {
  requireSrc as r
};
