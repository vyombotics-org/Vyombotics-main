import require$$0 from "fs";
import { a as requireSrc$2, b as requireSrc$3 } from "./gaxios.mjs";
import { r as requireJws } from "./jws.mjs";
import require$$5 from "path";
import require$$0$1 from "util";
var src$1 = {};
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1;
  hasRequiredSrc$1 = 1;
  Object.defineProperty(src$1, "__esModule", {
    value: true
  });
  src$1.GoogleToken = void 0;
  var fs = _interopRequireWildcard(require$$0);
  var _gaxios = requireSrc$2();
  var jws = _interopRequireWildcard(requireJws());
  var path = _interopRequireWildcard(require$$5);
  var _util = require$$0$1;
  function _interopRequireWildcard(e, t) {
    if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
    return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
      if (!t2 && e2 && e2.__esModule) return e2;
      var o, i, f = { __proto__: null, "default": e2 };
      if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
      if (o = t2 ? n : r) {
        if (o.has(e2)) return o.get(e2);
        o.set(e2, f);
      }
      for (var _t3 in e2) "default" !== _t3 && {}.hasOwnProperty.call(e2, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e2[_t3]);
      return f;
    })(e, t);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
  }
  function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
  }
  function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
  function _classPrivateFieldSet(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
  }
  function _classPrivateFieldGet(s, a) {
    return s.get(_assertClassBrand(s, a));
  }
  function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", { writable: false }), e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
      if (null === t2 || !_isNativeFunction(t2)) return t2;
      if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t2)) return r.get(t2);
        r.set(t2, Wrapper);
      }
      function Wrapper() {
        return _construct(t2, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper, t2);
    }, _wrapNativeSuper(t);
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t2) {
    }
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
      return !!t;
    })();
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
      return t2.__proto__ = e2, t2;
    }, _setPrototypeOf(t, e);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
      return t2.__proto__ || Object.getPrototypeOf(t2);
    }, _getPrototypeOf(t);
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }
  function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(t);
  }
  function _regenerator() {
    var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r2, n2, o2, i2) {
      var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
      return _regeneratorDefine2(u2, "_invoke", (function(r3, n3, o3) {
        var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d2(t2, r4) {
          return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
        } };
        function d(r4, n4) {
          for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
            var o4, i4 = p[t], d2 = G.p, l = i4[2];
            r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
          }
          if (o4 || r4 > 1) return a;
          throw y = true, n4;
        }
        return function(o4, p2, l) {
          if (f2 > 1) throw TypeError("Generator is already running");
          for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
            i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
            try {
              if (f2 = 2, i3) {
                if (c3 || (o4 = "next"), t = i3[o4]) {
                  if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u3 = t.value, c3 < 2 && (c3 = 0);
                } else 1 === c3 && (t = i3["return"]) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                i3 = e;
              } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
            } catch (t2) {
              i3 = e, c3 = 1, u3 = t2;
            } finally {
              f2 = 1;
            }
          }
          return { value: t, done: y };
        };
      })(r2, o2, i2), true), u2;
    }
    var a = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function() {
      return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e2) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function() {
      return this;
    }), _regeneratorDefine2(u, "toString", function() {
      return "[object Generator]";
    }), (_regenerator = function _regenerator2() {
      return { w: i, m: f };
    })();
  }
  function _regeneratorDefine2(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e2) {
      i = 0;
    }
    _regeneratorDefine2 = function _regeneratorDefine(e2, r2, n2, t2) {
      if (r2) i ? i(e2, r2, { value: n2, enumerable: !t2, configurable: !t2, writable: !t2 }) : e2[r2] = n2;
      else {
        var o = function o2(r3, n3) {
          _regeneratorDefine2(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        };
        o("next", 0), o("throw", 1), o("return", 2);
      }
    }, _regeneratorDefine2(e, r, n, t);
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c), u = i.value;
    } catch (n2) {
      return void e(n2);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function() {
      var t = this, e = arguments;
      return new Promise(function(r, o) {
        var a = n.apply(t, e);
        function _next(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
        }
        function _throw(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
        }
        _next(void 0);
      });
    };
  }
  var readFile = fs.readFile ? (0, _util.promisify)(fs.readFile) : /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee() {
    return _regenerator().w(function(_context) {
      while (1) switch (_context.n) {
        case 0:
          throw new ErrorWithCode("use key rather than keyFile.", "MISSING_CREDENTIALS");
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  var GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
  var GOOGLE_REVOKE_TOKEN_URL = "https://oauth2.googleapis.com/revoke?token=";
  var ErrorWithCode = /* @__PURE__ */ (function(_Error) {
    function ErrorWithCode2(message, code) {
      var _this;
      _classCallCheck(this, ErrorWithCode2);
      _this = _callSuper(this, ErrorWithCode2, [message]);
      _defineProperty(_this, "code", void 0);
      _this.code = code;
      return _this;
    }
    _inherits(ErrorWithCode2, _Error);
    return _createClass(ErrorWithCode2);
  })(/* @__PURE__ */ _wrapNativeSuper(Error));
  var _inFlightRequest = /* @__PURE__ */ new WeakMap();
  var _GoogleToken_brand = /* @__PURE__ */ new WeakSet();
  src$1.GoogleToken = /* @__PURE__ */ (function() {
    function GoogleToken(_options) {
      _classCallCheck(this, GoogleToken);
      _classPrivateMethodInitSpec(this, _GoogleToken_brand);
      _defineProperty(this, "expiresAt", void 0);
      _defineProperty(this, "key", void 0);
      _defineProperty(this, "keyFile", void 0);
      _defineProperty(this, "iss", void 0);
      _defineProperty(this, "sub", void 0);
      _defineProperty(this, "scope", void 0);
      _defineProperty(this, "rawToken", void 0);
      _defineProperty(this, "tokenExpires", void 0);
      _defineProperty(this, "email", void 0);
      _defineProperty(this, "additionalClaims", void 0);
      _defineProperty(this, "eagerRefreshThresholdMillis", void 0);
      _defineProperty(this, "transporter", {
        request: function request(opts) {
          return (0, _gaxios.request)(opts);
        }
      });
      _classPrivateFieldInitSpec(this, _inFlightRequest, void 0);
      _assertClassBrand(_GoogleToken_brand, this, _configure).call(this, _options);
    }
    return _createClass(GoogleToken, [{
      key: "accessToken",
      get: function get() {
        return this.rawToken ? this.rawToken.access_token : void 0;
      }
    }, {
      key: "idToken",
      get: function get() {
        return this.rawToken ? this.rawToken.id_token : void 0;
      }
    }, {
      key: "tokenType",
      get: function get() {
        return this.rawToken ? this.rawToken.token_type : void 0;
      }
    }, {
      key: "refreshToken",
      get: function get() {
        return this.rawToken ? this.rawToken.refresh_token : void 0;
      }
    }, {
      key: "hasExpired",
      value: function hasExpired() {
        var now = (/* @__PURE__ */ new Date()).getTime();
        if (this.rawToken && this.expiresAt) {
          return now >= this.expiresAt;
        } else {
          return true;
        }
      }
      /**
       * Returns whether the token will expire within eagerRefreshThresholdMillis
       *
       * @return true if the token will be expired within eagerRefreshThresholdMillis, false otherwise.
       */
    }, {
      key: "isTokenExpiring",
      value: function isTokenExpiring() {
        var _this$eagerRefreshThr;
        var now = (/* @__PURE__ */ new Date()).getTime();
        var eagerRefreshThresholdMillis = (_this$eagerRefreshThr = this.eagerRefreshThresholdMillis) !== null && _this$eagerRefreshThr !== void 0 ? _this$eagerRefreshThr : 0;
        if (this.rawToken && this.expiresAt) {
          return this.expiresAt <= now + eagerRefreshThresholdMillis;
        } else {
          return true;
        }
      }
      /**
       * Returns a cached token or retrieves a new one from Google.
       *
       * @param callback The callback function.
       */
    }, {
      key: "getToken",
      value: function getToken(callback) {
        var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (_typeof(callback) === "object") {
          opts = callback;
          callback = void 0;
        }
        opts = Object.assign({
          forceRefresh: false
        }, opts);
        if (callback) {
          var cb = callback;
          _assertClassBrand(_GoogleToken_brand, this, _getTokenAsync).call(this, opts).then(function(t) {
            return cb(null, t);
          }, callback);
          return;
        }
        return _assertClassBrand(_GoogleToken_brand, this, _getTokenAsync).call(this, opts);
      }
      /**
       * Given a keyFile, extract the key and client email if available
       * @param keyFile Path to a json, pem, or p12 file that contains the key.
       * @returns an object with privateKey and clientEmail properties
       */
    }, {
      key: "getCredentials",
      value: (function() {
        var _getCredentials = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee2(keyFile) {
          var ext, key, body, privateKey, clientEmail, _privateKey, _t;
          return _regenerator().w(function(_context2) {
            while (1) switch (_context2.n) {
              case 0:
                ext = path.extname(keyFile);
                _t = ext;
                _context2.n = _t === ".json" ? 1 : _t === ".der" ? 4 : _t === ".crt" ? 4 : _t === ".pem" ? 4 : _t === ".p12" ? 6 : _t === ".pfx" ? 6 : 7;
                break;
              case 1:
                _context2.n = 2;
                return readFile(keyFile, "utf8");
              case 2:
                key = _context2.v;
                body = JSON.parse(key);
                privateKey = body.private_key;
                clientEmail = body.client_email;
                if (!(!privateKey || !clientEmail)) {
                  _context2.n = 3;
                  break;
                }
                throw new ErrorWithCode("private_key and client_email are required.", "MISSING_CREDENTIALS");
              case 3:
                return _context2.a(2, {
                  privateKey,
                  clientEmail
                });
              case 4:
                _context2.n = 5;
                return readFile(keyFile, "utf8");
              case 5:
                _privateKey = _context2.v;
                return _context2.a(2, {
                  privateKey: _privateKey
                });
              case 6:
                throw new ErrorWithCode("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
              case 7:
                throw new ErrorWithCode("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE");
              case 8:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        function getCredentials(_x) {
          return _getCredentials.apply(this, arguments);
        }
        return getCredentials;
      })()
    }, {
      key: "revokeToken",
      value: function revokeToken(callback) {
        if (callback) {
          _assertClassBrand(_GoogleToken_brand, this, _revokeTokenAsync).call(this).then(function() {
            return callback();
          }, callback);
          return;
        }
        return _assertClassBrand(_GoogleToken_brand, this, _revokeTokenAsync).call(this);
      }
    }]);
  })();
  function _getTokenAsync(_x2) {
    return _getTokenAsync2.apply(this, arguments);
  }
  function _getTokenAsync2() {
    _getTokenAsync2 = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee3(opts) {
      return _regenerator().w(function(_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(_classPrivateFieldGet(_inFlightRequest, this) && !opts.forceRefresh)) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, _classPrivateFieldGet(_inFlightRequest, this));
          case 1:
            _context3.p = 1;
            _context3.n = 2;
            return _classPrivateFieldSet(_inFlightRequest, this, _assertClassBrand(_GoogleToken_brand, this, _getTokenAsyncInner).call(this, opts));
          case 2:
            return _context3.a(2, _context3.v);
          case 3:
            _context3.p = 3;
            _classPrivateFieldSet(_inFlightRequest, this, void 0);
            return _context3.f(3);
          case 4:
            return _context3.a(2);
        }
      }, _callee3, this, [[1, , 3, 4]]);
    }));
    return _getTokenAsync2.apply(this, arguments);
  }
  function _getTokenAsyncInner(_x3) {
    return _getTokenAsyncInner2.apply(this, arguments);
  }
  function _getTokenAsyncInner2() {
    _getTokenAsyncInner2 = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee4(opts) {
      var creds;
      return _regenerator().w(function(_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (!(this.isTokenExpiring() === false && opts.forceRefresh === false)) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, Promise.resolve(this.rawToken));
          case 1:
            if (!(!this.key && !this.keyFile)) {
              _context4.n = 2;
              break;
            }
            throw new Error("No key or keyFile set.");
          case 2:
            if (!(!this.key && this.keyFile)) {
              _context4.n = 4;
              break;
            }
            _context4.n = 3;
            return this.getCredentials(this.keyFile);
          case 3:
            creds = _context4.v;
            this.key = creds.privateKey;
            this.iss = creds.clientEmail || this.iss;
            if (!creds.clientEmail) {
              _assertClassBrand(_GoogleToken_brand, this, _ensureEmail).call(this);
            }
          case 4:
            return _context4.a(2, _assertClassBrand(_GoogleToken_brand, this, _requestToken).call(this));
        }
      }, _callee4, this);
    }));
    return _getTokenAsyncInner2.apply(this, arguments);
  }
  function _ensureEmail() {
    if (!this.iss) {
      throw new ErrorWithCode("email is required.", "MISSING_CREDENTIALS");
    }
  }
  function _revokeTokenAsync() {
    return _revokeTokenAsync2.apply(this, arguments);
  }
  function _revokeTokenAsync2() {
    _revokeTokenAsync2 = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee5() {
      var url;
      return _regenerator().w(function(_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (this.accessToken) {
              _context5.n = 1;
              break;
            }
            throw new Error("No token to revoke.");
          case 1:
            url = GOOGLE_REVOKE_TOKEN_URL + this.accessToken;
            _context5.n = 2;
            return this.transporter.request({
              url,
              retry: true
            });
          case 2:
            _assertClassBrand(_GoogleToken_brand, this, _configure).call(this, {
              email: this.iss,
              sub: this.sub,
              key: this.key,
              keyFile: this.keyFile,
              scope: this.scope,
              additionalClaims: this.additionalClaims
            });
          case 3:
            return _context5.a(2);
        }
      }, _callee5, this);
    }));
    return _revokeTokenAsync2.apply(this, arguments);
  }
  function _configure() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.keyFile = options.keyFile;
    this.key = options.key;
    this.rawToken = void 0;
    this.iss = options.email || options.iss;
    this.sub = options.sub;
    this.additionalClaims = options.additionalClaims;
    if (_typeof(options.scope) === "object") {
      this.scope = options.scope.join(" ");
    } else {
      this.scope = options.scope;
    }
    this.eagerRefreshThresholdMillis = options.eagerRefreshThresholdMillis;
    if (options.transporter) {
      this.transporter = options.transporter;
    }
  }
  function _requestToken() {
    return _requestToken2.apply(this, arguments);
  }
  function _requestToken2() {
    _requestToken2 = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee6() {
      var iat, additionalClaims, payload, signedJWT, r, _response, _response2, body, desc, _t2;
      return _regenerator().w(function(_context6) {
        while (1) switch (_context6.n) {
          case 0:
            iat = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
            additionalClaims = this.additionalClaims || {};
            payload = Object.assign({
              iss: this.iss,
              scope: this.scope,
              aud: GOOGLE_TOKEN_URL,
              exp: iat + 3600,
              iat,
              sub: this.sub
            }, additionalClaims);
            signedJWT = jws.sign({
              header: {
                alg: "RS256"
              },
              payload,
              secret: this.key
            });
            _context6.p = 1;
            _context6.n = 2;
            return this.transporter.request({
              method: "POST",
              url: GOOGLE_TOKEN_URL,
              data: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: signedJWT
              }),
              responseType: "json",
              retryConfig: {
                httpMethodsToRetry: ["POST"]
              }
            });
          case 2:
            r = _context6.v;
            this.rawToken = r.data;
            this.expiresAt = r.data.expires_in === null || r.data.expires_in === void 0 ? void 0 : (iat + r.data.expires_in) * 1e3;
            return _context6.a(2, this.rawToken);
          case 3:
            _context6.p = 3;
            _t2 = _context6.v;
            this.rawToken = void 0;
            this.tokenExpires = void 0;
            body = _t2.response && (_response = _t2.response) !== null && _response !== void 0 && _response.data ? (_response2 = _t2.response) === null || _response2 === void 0 ? void 0 : _response2.data : {};
            if (body.error) {
              desc = body.error_description ? ": ".concat(body.error_description) : "";
              _t2.message = "".concat(body.error).concat(desc);
            }
            throw _t2;
          case 4:
            return _context6.a(2);
        }
      }, _callee6, this, [[1, 3]]);
    }));
    return _requestToken2.apply(this, arguments);
  }
  return src$1;
}
var src = {};
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  var __classPrivateFieldGet = src && src.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = src && src.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _GoogleToken_instances, _GoogleToken_inFlightRequest, _GoogleToken_getTokenAsync, _GoogleToken_getTokenAsyncInner, _GoogleToken_ensureEmail, _GoogleToken_revokeTokenAsync, _GoogleToken_configure, _GoogleToken_requestToken;
  Object.defineProperty(src, "__esModule", { value: true });
  src.GoogleToken = void 0;
  const fs = require$$0;
  const gaxios_1 = requireSrc$3();
  const jws = requireJws();
  const path = require$$5;
  const util_1 = require$$0$1;
  const readFile = fs.readFile ? (0, util_1.promisify)(fs.readFile) : async () => {
    throw new ErrorWithCode("use key rather than keyFile.", "MISSING_CREDENTIALS");
  };
  const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
  const GOOGLE_REVOKE_TOKEN_URL = "https://accounts.google.com/o/oauth2/revoke?token=";
  class ErrorWithCode extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }
  class GoogleToken {
    get accessToken() {
      return this.rawToken ? this.rawToken.access_token : void 0;
    }
    get idToken() {
      return this.rawToken ? this.rawToken.id_token : void 0;
    }
    get tokenType() {
      return this.rawToken ? this.rawToken.token_type : void 0;
    }
    get refreshToken() {
      return this.rawToken ? this.rawToken.refresh_token : void 0;
    }
    /**
     * Create a GoogleToken.
     *
     * @param options  Configuration object.
     */
    constructor(options) {
      _GoogleToken_instances.add(this);
      this.transporter = {
        request: (opts) => (0, gaxios_1.request)(opts)
      };
      _GoogleToken_inFlightRequest.set(this, void 0);
      __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_configure).call(this, options);
    }
    /**
     * Returns whether the token has expired.
     *
     * @return true if the token has expired, false otherwise.
     */
    hasExpired() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (this.rawToken && this.expiresAt) {
        return now >= this.expiresAt;
      } else {
        return true;
      }
    }
    /**
     * Returns whether the token will expire within eagerRefreshThresholdMillis
     *
     * @return true if the token will be expired within eagerRefreshThresholdMillis, false otherwise.
     */
    isTokenExpiring() {
      var _a;
      const now = (/* @__PURE__ */ new Date()).getTime();
      const eagerRefreshThresholdMillis = (_a = this.eagerRefreshThresholdMillis) !== null && _a !== void 0 ? _a : 0;
      if (this.rawToken && this.expiresAt) {
        return this.expiresAt <= now + eagerRefreshThresholdMillis;
      } else {
        return true;
      }
    }
    getToken(callback, opts = {}) {
      if (typeof callback === "object") {
        opts = callback;
        callback = void 0;
      }
      opts = Object.assign({
        forceRefresh: false
      }, opts);
      if (callback) {
        const cb = callback;
        __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsync).call(this, opts).then((t) => cb(null, t), callback);
        return;
      }
      return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsync).call(this, opts);
    }
    /**
     * Given a keyFile, extract the key and client email if available
     * @param keyFile Path to a json, pem, or p12 file that contains the key.
     * @returns an object with privateKey and clientEmail properties
     */
    async getCredentials(keyFile) {
      const ext = path.extname(keyFile);
      switch (ext) {
        case ".json": {
          const key = await readFile(keyFile, "utf8");
          const body = JSON.parse(key);
          const privateKey = body.private_key;
          const clientEmail = body.client_email;
          if (!privateKey || !clientEmail) {
            throw new ErrorWithCode("private_key and client_email are required.", "MISSING_CREDENTIALS");
          }
          return { privateKey, clientEmail };
        }
        case ".der":
        case ".crt":
        case ".pem": {
          const privateKey = await readFile(keyFile, "utf8");
          return { privateKey };
        }
        case ".p12":
        case ".pfx": {
          throw new ErrorWithCode("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
        }
        default:
          throw new ErrorWithCode("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE");
      }
    }
    revokeToken(callback) {
      if (callback) {
        __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_revokeTokenAsync).call(this).then(() => callback(), callback);
        return;
      }
      return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_revokeTokenAsync).call(this);
    }
  }
  src.GoogleToken = GoogleToken;
  _GoogleToken_inFlightRequest = /* @__PURE__ */ new WeakMap(), _GoogleToken_instances = /* @__PURE__ */ new WeakSet(), _GoogleToken_getTokenAsync = async function _GoogleToken_getTokenAsync2(opts) {
    if (__classPrivateFieldGet(this, _GoogleToken_inFlightRequest, "f") && !opts.forceRefresh) {
      return __classPrivateFieldGet(this, _GoogleToken_inFlightRequest, "f");
    }
    try {
      return await __classPrivateFieldSet(this, _GoogleToken_inFlightRequest, __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_getTokenAsyncInner).call(this, opts), "f");
    } finally {
      __classPrivateFieldSet(this, _GoogleToken_inFlightRequest, void 0, "f");
    }
  }, _GoogleToken_getTokenAsyncInner = async function _GoogleToken_getTokenAsyncInner2(opts) {
    if (this.isTokenExpiring() === false && opts.forceRefresh === false) {
      return Promise.resolve(this.rawToken);
    }
    if (!this.key && !this.keyFile) {
      throw new Error("No key or keyFile set.");
    }
    if (!this.key && this.keyFile) {
      const creds = await this.getCredentials(this.keyFile);
      this.key = creds.privateKey;
      this.iss = creds.clientEmail || this.iss;
      if (!creds.clientEmail) {
        __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_ensureEmail).call(this);
      }
    }
    return __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_requestToken).call(this);
  }, _GoogleToken_ensureEmail = function _GoogleToken_ensureEmail2() {
    if (!this.iss) {
      throw new ErrorWithCode("email is required.", "MISSING_CREDENTIALS");
    }
  }, _GoogleToken_revokeTokenAsync = async function _GoogleToken_revokeTokenAsync2() {
    if (!this.accessToken) {
      throw new Error("No token to revoke.");
    }
    const url = GOOGLE_REVOKE_TOKEN_URL + this.accessToken;
    await this.transporter.request({
      url,
      retry: true
    });
    __classPrivateFieldGet(this, _GoogleToken_instances, "m", _GoogleToken_configure).call(this, {
      email: this.iss,
      sub: this.sub,
      key: this.key,
      keyFile: this.keyFile,
      scope: this.scope,
      additionalClaims: this.additionalClaims
    });
  }, _GoogleToken_configure = function _GoogleToken_configure2(options = {}) {
    this.keyFile = options.keyFile;
    this.key = options.key;
    this.rawToken = void 0;
    this.iss = options.email || options.iss;
    this.sub = options.sub;
    this.additionalClaims = options.additionalClaims;
    if (typeof options.scope === "object") {
      this.scope = options.scope.join(" ");
    } else {
      this.scope = options.scope;
    }
    this.eagerRefreshThresholdMillis = options.eagerRefreshThresholdMillis;
    if (options.transporter) {
      this.transporter = options.transporter;
    }
  }, _GoogleToken_requestToken = /**
   * Request the token from Google.
   */
  async function _GoogleToken_requestToken2() {
    var _a, _b;
    const iat = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    const additionalClaims = this.additionalClaims || {};
    const payload = Object.assign({
      iss: this.iss,
      scope: this.scope,
      aud: GOOGLE_TOKEN_URL,
      exp: iat + 3600,
      iat,
      sub: this.sub
    }, additionalClaims);
    const signedJWT = jws.sign({
      header: { alg: "RS256" },
      payload,
      secret: this.key
    });
    try {
      const r = await this.transporter.request({
        method: "POST",
        url: GOOGLE_TOKEN_URL,
        data: {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: signedJWT
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "json",
        retryConfig: {
          httpMethodsToRetry: ["POST"]
        }
      });
      this.rawToken = r.data;
      this.expiresAt = r.data.expires_in === null || r.data.expires_in === void 0 ? void 0 : (iat + r.data.expires_in) * 1e3;
      return this.rawToken;
    } catch (e) {
      this.rawToken = void 0;
      this.tokenExpires = void 0;
      const body = e.response && ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) ? (_b = e.response) === null || _b === void 0 ? void 0 : _b.data : {};
      if (body.error) {
        const desc = body.error_description ? `: ${body.error_description}` : "";
        e.message = `${body.error}${desc}`;
      }
      throw e;
    }
  };
  return src;
}
export {
  requireSrc as a,
  requireSrc$1 as r
};
