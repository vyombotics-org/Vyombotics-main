import { g as getDefaultExportFromCjs } from "./react.mjs";
import require$$0$3 from "http";
import require$$0$2 from "http2";
import zlib from "zlib";
import require$$1$1 from "https";
import require$$0$1 from "events";
import { r as requireMain } from "./@fastify/busboy.mjs";
import require$$1 from "node:crypto";
import { r as requireJsonwebtoken } from "./jsonwebtoken.mjs";
import { r as requireSrc$1 } from "./jwks-rsa.mjs";
import { r as requireSrc$2 } from "./@google-cloud/firestore.mjs";
import require$$0 from "fs";
import { r as requireSrc } from "./google-auth-library.mjs";
import { r as requireFastDeepEqual } from "./fast-deep-equal.mjs";
import { r as requireSrc$3 } from "./google-cloud__storage.mjs";
var app = {};
var utils$1 = {};
var credentialInternal = {};
var error$4 = {};
var error$3 = {};
var hasRequiredError$4;
function requireError$4() {
  if (hasRequiredError$4) return error$3;
  hasRequiredError$4 = 1;
  Object.defineProperty(error$3, "__esModule", { value: true });
  error$3.FirebaseError = void 0;
  error$3.toHttpResponse = toHttpResponse;
  function toHttpResponse(resp) {
    return {
      status: resp.status,
      headers: resp.headers,
      data: resp.isJson() ? resp.data : resp.text
    };
  }
  class FirebaseError extends Error {
    /**
     * @param errorInfo - The error information (code and message).
     */
    constructor(errorInfo) {
      super(errorInfo.message);
      this.code = errorInfo.code;
      if (errorInfo.cause !== void 0) {
        this.cause = errorInfo.cause;
      }
      if (errorInfo.httpResponse !== void 0) {
        this.httpResponse = errorInfo.httpResponse;
      }
    }
    /** {@inheritDoc FirebaseError.hasCode} */
    hasCode(code) {
      if (this.code === code) {
        return true;
      }
      return this.codePrefix != null && this.code === `${this.codePrefix}/${code}`;
    }
    /** @returns The object representation of the error. */
    toJSON() {
      const json = {
        code: this.code,
        message: this.message
      };
      if (this.httpResponse) {
        json.httpResponse = {
          status: this.httpResponse.status,
          headers: this.httpResponse.headers,
          data: this.httpResponse.data
        };
      }
      if (this.cause) {
        json.cause = {
          name: this.cause.name || "Error",
          message: this.cause.message || String(this.cause),
          stack: this.cause.stack
        };
        if ("errors" in this.cause && Array.isArray(this.cause.errors)) {
          json.cause.errors = this.cause.errors.map((e) => {
            if (e instanceof Error) {
              return { name: e.name, message: e.message, stack: e.stack };
            }
            return String(e);
          });
        }
      }
      return json;
    }
  }
  error$3.FirebaseError = FirebaseError;
  return error$3;
}
var hasRequiredError$3;
function requireError$3() {
  if (hasRequiredError$3) return error$4;
  hasRequiredError$3 = 1;
  Object.defineProperty(error$4, "__esModule", { value: true });
  error$4.AppErrorCode = error$4.FirebaseAppError = void 0;
  const error_1 = requireError$4();
  class FirebaseAppError extends error_1.FirebaseError {
    /**
     * @param info - The error code info.
     * @param message - The error message. This will override the default message if provided.
     */
    constructor(info, message) {
      super({
        code: `app/${info.code}`,
        message: message || info.message,
        httpResponse: info.httpResponse,
        cause: info.cause
      });
      this.codePrefix = "app";
    }
  }
  error$4.FirebaseAppError = FirebaseAppError;
  error$4.AppErrorCode = {
    APP_DELETED: "app-deleted",
    DUPLICATE_APP: "duplicate-app",
    INVALID_ARGUMENT: "invalid-argument",
    INTERNAL_ERROR: "internal-error",
    INVALID_APP_NAME: "invalid-app-name",
    INVALID_APP_OPTIONS: "invalid-app-options",
    INVALID_CREDENTIAL: "invalid-credential",
    NETWORK_ERROR: "network-error",
    NETWORK_TIMEOUT: "network-timeout",
    NO_APP: "no-app",
    UNABLE_TO_PARSE_RESPONSE: "unable-to-parse-response"
  };
  return error$4;
}
var validator = {};
var hasRequiredValidator;
function requireValidator() {
  if (hasRequiredValidator) return validator;
  hasRequiredValidator = 1;
  Object.defineProperty(validator, "__esModule", { value: true });
  validator.isBuffer = isBuffer;
  validator.isArray = isArray;
  validator.isNonEmptyArray = isNonEmptyArray;
  validator.isBoolean = isBoolean;
  validator.isNumber = isNumber;
  validator.isString = isString;
  validator.isBase64String = isBase64String;
  validator.isNonEmptyString = isNonEmptyString;
  validator.isObject = isObject;
  validator.isNonNullObject = isNonNullObject;
  validator.isUid = isUid;
  validator.isPassword = isPassword;
  validator.isEmail = isEmail;
  validator.isPhoneNumber = isPhoneNumber;
  validator.isISODateString = isISODateString;
  validator.isUTCDateString = isUTCDateString;
  validator.isURL = isURL;
  validator.isTopic = isTopic;
  validator.isTaskId = isTaskId;
  function isBuffer(value) {
    return value instanceof Buffer;
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isNonEmptyArray(value) {
    return isArray(value) && value.length !== 0;
  }
  function isBoolean(value) {
    return typeof value === "boolean";
  }
  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isBase64String(value) {
    if (!isString(value)) {
      return false;
    }
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value);
  }
  function isNonEmptyString(value) {
    return isString(value) && value !== "";
  }
  function isObject(value) {
    return typeof value === "object" && !isArray(value);
  }
  function isNonNullObject(value) {
    return isObject(value) && value !== null;
  }
  function isUid(uid) {
    return typeof uid === "string" && uid.length > 0 && uid.length <= 128;
  }
  function isPassword(password) {
    return typeof password === "string" && password.length >= 6;
  }
  function isEmail(email) {
    if (typeof email !== "string") {
      return false;
    }
    const re = /^[^@]+@[^@]+$/;
    return re.test(email);
  }
  function isPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== "string") {
      return false;
    }
    const re1 = /^\+/;
    const re2 = /[\da-zA-Z]+/;
    return re1.test(phoneNumber) && re2.test(phoneNumber);
  }
  function isISODateString(dateString) {
    try {
      return isNonEmptyString(dateString) && new Date(dateString).toISOString() === dateString;
    } catch (e) {
      return false;
    }
  }
  function isUTCDateString(dateString) {
    try {
      return isNonEmptyString(dateString) && new Date(dateString).toUTCString() === dateString;
    } catch (e) {
      return false;
    }
  }
  function isURL(urlStr) {
    if (typeof urlStr !== "string") {
      return false;
    }
    const re = /[^a-z0-9:/?#[\]@!$&'()*+,;=.\-_~%]/i;
    if (re.test(urlStr)) {
      return false;
    }
    try {
      const uri = new URL(urlStr);
      const scheme = uri.protocol;
      if (scheme !== "http:" && scheme !== "https:") {
        return false;
      }
      const hostname = uri.hostname;
      if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/.test(hostname)) {
        if (!/^\[[a-fA-F0-9:.]+\]$/.test(hostname)) {
          return false;
        }
      }
      const pathnameRe = /^(\/[\w\-.~!$'()*+,;=:@%]+)*\/?$/;
      const pathname = uri.pathname;
      if (pathname && pathname !== "/" && !pathnameRe.test(pathname)) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  function isTopic(topic) {
    if (typeof topic !== "string") {
      return false;
    }
    const VALID_TOPIC_REGEX = /^(\/topics\/)?(private\/)?[a-zA-Z0-9-_.~%]+$/;
    return VALID_TOPIC_REGEX.test(topic);
  }
  function isTaskId(taskId) {
    if (typeof taskId !== "string") {
      return false;
    }
    const VALID_TASK_ID_REGEX = /^[A-Za-z0-9_-]+$/;
    return VALID_TASK_ID_REGEX.test(taskId);
  }
  return validator;
}
var hasRequiredCredentialInternal;
function requireCredentialInternal() {
  if (hasRequiredCredentialInternal) return credentialInternal;
  hasRequiredCredentialInternal = 1;
  Object.defineProperty(credentialInternal, "__esModule", { value: true });
  credentialInternal.ImpersonatedServiceAccountCredential = credentialInternal.RefreshTokenCredential = credentialInternal.ServiceAccountCredential = credentialInternal.ApplicationDefaultCredential = void 0;
  credentialInternal.isApplicationDefault = isApplicationDefault;
  credentialInternal.getApplicationDefault = getApplicationDefault;
  const fs = require$$0;
  const node_crypto_1 = require$$1;
  const google_auth_library_1 = requireSrc();
  const error_1 = requireError$3();
  const util = requireValidator();
  const SCOPES = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/firebase.database",
    "https://www.googleapis.com/auth/firebase.messaging",
    "https://www.googleapis.com/auth/identitytoolkit",
    "https://www.googleapis.com/auth/userinfo.email"
  ];
  class ApplicationDefaultCredential {
    constructor(httpAgent) {
      this.googleAuth = new google_auth_library_1.GoogleAuth({
        scopes: SCOPES,
        clientOptions: {
          transporterOptions: {
            agent: httpAgent
          }
        }
      });
    }
    async getAccessToken() {
      if (!this.authClient) {
        this.authClient = await this.googleAuth.getClient();
      }
      await this.authClient.getAccessToken();
      const credentials = this.authClient.credentials;
      this.quotaProjectId = this.authClient.quotaProjectId;
      return populateCredential(credentials);
    }
    async getProjectId() {
      if (!this.projectId) {
        this.projectId = await this.googleAuth.getProjectId();
      }
      return Promise.resolve(this.projectId);
    }
    getQuotaProjectId() {
      if (!this.quotaProjectId) {
        this.quotaProjectId = this.authClient?.quotaProjectId;
      }
      return this.quotaProjectId;
    }
    async isComputeEngineCredential() {
      if (!this.authClient) {
        this.authClient = await this.googleAuth.getClient();
      }
      return Promise.resolve(this.authClient instanceof google_auth_library_1.Compute);
    }
    /**
     * getIDToken returns a OIDC token from the compute metadata service
     * that can be used to make authenticated calls to audience
     * @param audience the URL the returned ID token will be used to call.
    */
    async getIDToken(audience) {
      if (await this.isComputeEngineCredential()) {
        return this.authClient.fetchIdToken(audience);
      } else {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Credentials type should be Compute Engine Credentials."
        });
      }
    }
    async getServiceAccountEmail() {
      if (this.accountId) {
        return Promise.resolve(this.accountId);
      }
      const { client_email: clientEmail } = await this.googleAuth.getCredentials();
      this.accountId = clientEmail ?? "";
      return Promise.resolve(this.accountId);
    }
  }
  credentialInternal.ApplicationDefaultCredential = ApplicationDefaultCredential;
  class ServiceAccountCredential {
    /**
     * Creates a new ServiceAccountCredential from the given parameters.
     *
     * @param serviceAccountPathOrObject - Service account json object or path to a service account json file.
     * @param httpAgent - Optional http.Agent to use when calling the remote token server.
     * @param implicit - An optional boolean indicating whether this credential was implicitly discovered from the
     *   environment, as opposed to being explicitly specified by the developer.
     *
     * @constructor
     */
    constructor(serviceAccountPathOrObject, httpAgent, implicit = false) {
      this.serviceAccountPathOrObject = serviceAccountPathOrObject;
      this.httpAgent = httpAgent;
      this.implicit = implicit;
      const serviceAccount = typeof serviceAccountPathOrObject === "string" ? ServiceAccount.fromPath(serviceAccountPathOrObject) : new ServiceAccount(serviceAccountPathOrObject);
      this.projectId = serviceAccount.projectId;
      this.privateKey = serviceAccount.privateKey;
      this.clientEmail = serviceAccount.clientEmail;
    }
    getGoogleAuth() {
      if (this.googleAuth) {
        return this.googleAuth;
      }
      const { auth: auth2, client } = populateGoogleAuth(this.serviceAccountPathOrObject, this.httpAgent);
      this.googleAuth = auth2;
      this.authClient = client;
      return this.googleAuth;
    }
    async getAccessToken() {
      const googleAuth = this.getGoogleAuth();
      if (this.authClient === void 0) {
        this.authClient = await googleAuth.getClient();
      }
      await this.authClient.getAccessToken();
      const credentials = this.authClient.credentials;
      return populateCredential(credentials);
    }
  }
  credentialInternal.ServiceAccountCredential = ServiceAccountCredential;
  class ServiceAccount {
    static fromPath(filePath) {
      try {
        return new ServiceAccount(JSON.parse(fs.readFileSync(filePath, "utf8")));
      } catch (error2) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: `Failed to parse service account json file: ${error2.message}`,
          cause: error2
        });
      }
    }
    constructor(json) {
      if (!util.isNonNullObject(json)) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Service account must be an object."
        });
      }
      copyAttr(this, json, "projectId", "project_id");
      copyAttr(this, json, "privateKey", "private_key");
      copyAttr(this, json, "clientEmail", "client_email");
      let errorMessage;
      if (!util.isNonEmptyString(this.projectId)) {
        errorMessage = 'Service account object must contain a string "project_id" property.';
      } else if (!util.isNonEmptyString(this.privateKey)) {
        errorMessage = 'Service account object must contain a string "private_key" property.';
      } else if (!util.isNonEmptyString(this.clientEmail)) {
        errorMessage = 'Service account object must contain a string "client_email" property.';
      }
      if (typeof errorMessage !== "undefined") {
        throw new error_1.FirebaseAppError({ code: error_1.AppErrorCode.INVALID_CREDENTIAL, message: errorMessage });
      }
      try {
        (0, node_crypto_1.createPrivateKey)(this.privateKey);
      } catch (error2) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Failed to parse private key.",
          cause: error2
        });
      }
    }
  }
  class RefreshTokenCredential {
    /**
     * Creates a new RefreshTokenCredential from the given parameters.
     *
     * @param refreshTokenPathOrObject - Refresh token json object or path to a refresh token
     *   (user credentials) json file.
     * @param httpAgent - Optional http.Agent to use when calling the remote token server.
     * @param implicit - An optinal boolean indicating whether this credential was implicitly
     *   discovered from the environment, as opposed to being explicitly specified by the developer.
     *
     * @constructor
     */
    constructor(refreshTokenPathOrObject, httpAgent, implicit = false) {
      this.refreshTokenPathOrObject = refreshTokenPathOrObject;
      this.httpAgent = httpAgent;
      this.implicit = implicit;
      typeof refreshTokenPathOrObject === "string" ? RefreshToken.validateFromPath(refreshTokenPathOrObject) : RefreshToken.validateFromJSON(refreshTokenPathOrObject);
    }
    getGoogleAuth() {
      if (this.googleAuth) {
        return this.googleAuth;
      }
      const { auth: auth2, client } = populateGoogleAuth(this.refreshTokenPathOrObject, this.httpAgent);
      this.googleAuth = auth2;
      this.authClient = client;
      return this.googleAuth;
    }
    async getAccessToken() {
      const googleAuth = this.getGoogleAuth();
      if (this.authClient === void 0) {
        this.authClient = await googleAuth.getClient();
      }
      await this.authClient.getAccessToken();
      const credentials = this.authClient.credentials;
      return populateCredential(credentials);
    }
  }
  credentialInternal.RefreshTokenCredential = RefreshTokenCredential;
  class RefreshToken {
    /*
     * Tries to load a RefreshToken from a path. Throws if the path doesn't exist or the
     * data at the path is invalid.
     */
    static validateFromPath(filePath) {
      try {
        RefreshToken.validateFromJSON(JSON.parse(fs.readFileSync(filePath, "utf8")));
      } catch (error2) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Failed to parse refresh token file.",
          cause: error2
        });
      }
    }
    static validateFromJSON(json) {
      const creds = { clientId: "", clientSecret: "", refreshToken: "", type: "" };
      copyAttr(creds, json, "clientId", "client_id");
      copyAttr(creds, json, "clientSecret", "client_secret");
      copyAttr(creds, json, "refreshToken", "refresh_token");
      copyAttr(creds, json, "type", "type");
      let errorMessage;
      if (!util.isNonEmptyString(creds.clientId)) {
        errorMessage = 'Refresh token must contain a "client_id" property.';
      } else if (!util.isNonEmptyString(creds.clientSecret)) {
        errorMessage = 'Refresh token must contain a "client_secret" property.';
      } else if (!util.isNonEmptyString(creds.refreshToken)) {
        errorMessage = 'Refresh token must contain a "refresh_token" property.';
      } else if (!util.isNonEmptyString(creds.type)) {
        errorMessage = 'Refresh token must contain a "type" property.';
      }
      if (typeof errorMessage !== "undefined") {
        throw new error_1.FirebaseAppError({ code: error_1.AppErrorCode.INVALID_CREDENTIAL, message: errorMessage });
      }
    }
  }
  class ImpersonatedServiceAccountCredential {
    /**
     * Creates a new ImpersonatedServiceAccountCredential from the given parameters.
     *
     * @param impersonatedServiceAccountPathOrObject - Impersonated Service account json object or
     * path to a service account json file.
     * @param httpAgent - Optional http.Agent to use when calling the remote token server.
     * @param implicit - An optional boolean indicating whether this credential was implicitly
     *   discovered from the environment, as opposed to being explicitly specified by the developer.
     *
     * @constructor
     */
    constructor(impersonatedServiceAccountPathOrObject, httpAgent, implicit = false) {
      this.impersonatedServiceAccountPathOrObject = impersonatedServiceAccountPathOrObject;
      this.httpAgent = httpAgent;
      this.implicit = implicit;
      typeof impersonatedServiceAccountPathOrObject === "string" ? ImpersonatedServiceAccount.validateFromPath(impersonatedServiceAccountPathOrObject) : ImpersonatedServiceAccount.validateFromJSON(impersonatedServiceAccountPathOrObject);
    }
    getGoogleAuth() {
      if (this.googleAuth) {
        return this.googleAuth;
      }
      const { auth: auth2, client } = populateGoogleAuth(this.impersonatedServiceAccountPathOrObject, this.httpAgent);
      this.googleAuth = auth2;
      this.authClient = client;
      return this.googleAuth;
    }
    async getAccessToken() {
      const googleAuth = this.getGoogleAuth();
      if (this.authClient === void 0) {
        this.authClient = await googleAuth.getClient();
      }
      await this.authClient.getAccessToken();
      const credentials = this.authClient.credentials;
      return populateCredential(credentials);
    }
  }
  credentialInternal.ImpersonatedServiceAccountCredential = ImpersonatedServiceAccountCredential;
  class ImpersonatedServiceAccount {
    /*
     * Tries to load a ImpersonatedServiceAccount from a path. Throws if the path doesn't exist or the
     * data at the path is invalid.
     */
    static validateFromPath(filePath) {
      try {
        ImpersonatedServiceAccount.validateFromJSON(JSON.parse(fs.readFileSync(filePath, "utf8")));
      } catch (error2) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Failed to parse impersonated service account file.",
          cause: error2
        });
      }
    }
    static validateFromJSON(json) {
      const { client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, type } = json["source_credentials"];
      let errorMessage;
      if (!util.isNonEmptyString(clientId)) {
        errorMessage = 'Impersonated Service Account must contain a "source_credentials.client_id" property.';
      } else if (!util.isNonEmptyString(clientSecret)) {
        errorMessage = 'Impersonated Service Account must contain a "source_credentials.client_secret" property.';
      } else if (!util.isNonEmptyString(refreshToken)) {
        errorMessage = 'Impersonated Service Account must contain a "source_credentials.refresh_token" property.';
      } else if (!util.isNonEmptyString(type)) {
        errorMessage = 'Impersonated Service Account must contain a "source_credentials.type" property.';
      }
      if (typeof errorMessage !== "undefined") {
        throw new error_1.FirebaseAppError({ code: error_1.AppErrorCode.INVALID_CREDENTIAL, message: errorMessage });
      }
    }
  }
  function isApplicationDefault(credential) {
    return credential instanceof ApplicationDefaultCredential || credential instanceof RefreshTokenCredential && credential.implicit;
  }
  function getApplicationDefault(httpAgent) {
    return new ApplicationDefaultCredential(httpAgent);
  }
  function copyAttr(to, from, key, alt) {
    const tmp = from[key] || from[alt];
    if (typeof tmp !== "undefined") {
      to[key] = tmp;
    }
  }
  function populateGoogleAuth(keyFile, httpAgent) {
    let client;
    const auth2 = new google_auth_library_1.GoogleAuth({
      scopes: SCOPES,
      clientOptions: {
        transporterOptions: {
          agent: httpAgent
        }
      },
      keyFile: typeof keyFile === "string" ? keyFile : void 0
    });
    if (typeof keyFile === "object") {
      if (!util.isNonNullObject(keyFile)) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: "Service account must be an object."
        });
      }
      copyAttr(keyFile, keyFile, "project_id", "projectId");
      copyAttr(keyFile, keyFile, "private_key", "privateKey");
      copyAttr(keyFile, keyFile, "client_email", "clientEmail");
      client = auth2.fromJSON(keyFile);
    }
    return { auth: auth2, client };
  }
  function populateCredential(credentials) {
    const accessToken = credentials?.access_token;
    const expiryDate = credentials?.expiry_date;
    if (typeof accessToken !== "string")
      throw new error_1.FirebaseAppError({
        code: error_1.AppErrorCode.INVALID_CREDENTIAL,
        message: "Failed to parse Google auth credential: access_token must be a non empty string."
      });
    if (typeof expiryDate !== "number")
      throw new error_1.FirebaseAppError({
        code: error_1.AppErrorCode.INVALID_CREDENTIAL,
        message: "Failed to parse Google auth credential: Invalid expiry_date."
      });
    return {
      ...credentials,
      access_token: accessToken,
      // inverse operation of following
      // https://github.com/googleapis/google-auth-library-nodejs/blob/5ed910513451c82e2551777a3e2212964799ef8e/src/auth/baseexternalclient.ts#L446-L446
      expires_in: Math.floor((expiryDate - (/* @__PURE__ */ new Date()).getTime()) / 1e3)
    };
  }
  return credentialInternal;
}
const version = "14.0.0";
const require$$2 = {
  version
};
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  Object.defineProperty(utils$1, "__esModule", { value: true });
  utils$1.getSdkVersion = getSdkVersion;
  utils$1.getMetricsHeader = getMetricsHeader;
  utils$1.renameProperties = renameProperties;
  utils$1.addReadonlyGetter = addReadonlyGetter;
  utils$1.getExplicitProjectId = getExplicitProjectId;
  utils$1.findProjectId = findProjectId;
  utils$1.getExplicitServiceAccountEmail = getExplicitServiceAccountEmail;
  utils$1.findServiceAccountEmail = findServiceAccountEmail;
  utils$1.toWebSafeBase64 = toWebSafeBase64;
  utils$1.formatString = formatString;
  utils$1.generateUpdateMask = generateUpdateMask;
  utils$1.transformMillisecondsToSecondsString = transformMillisecondsToSecondsString;
  utils$1.parseResourceName = parseResourceName;
  const credential_internal_1 = requireCredentialInternal();
  const validator2 = requireValidator();
  let sdkVersion;
  function getSdkVersion() {
    if (!sdkVersion) {
      const { version: version2 } = require$$2;
      sdkVersion = version2;
    }
    return sdkVersion;
  }
  function getMetricsHeader() {
    return `gl-node/${process.versions.node} fire-admin/${getSdkVersion()}`;
  }
  function renameProperties(obj, keyMap) {
    Object.keys(keyMap).forEach((oldKey) => {
      if (oldKey in obj) {
        const newKey = keyMap[oldKey];
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }
    });
  }
  function addReadonlyGetter(obj, prop, value) {
    Object.defineProperty(obj, prop, {
      value,
      // Make this property read-only.
      writable: false,
      // Include this property during enumeration of obj's properties.
      enumerable: true
    });
  }
  function getExplicitProjectId(app2) {
    const options = app2.options;
    if (validator2.isNonEmptyString(options.projectId)) {
      return options.projectId;
    }
    const credential = app2.options.credential;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
      return credential.projectId;
    }
    const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
    if (validator2.isNonEmptyString(projectId)) {
      return projectId;
    }
    return null;
  }
  function findProjectId(app2) {
    const projectId = getExplicitProjectId(app2);
    if (projectId) {
      return Promise.resolve(projectId);
    }
    const credential = app2.options.credential;
    if (credential instanceof credential_internal_1.ApplicationDefaultCredential) {
      return credential.getProjectId();
    }
    return Promise.resolve(null);
  }
  function getExplicitServiceAccountEmail(app2) {
    const options = app2.options;
    if (validator2.isNonEmptyString(options.serviceAccountId)) {
      return options.serviceAccountId;
    }
    const credential = app2.options.credential;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
      return credential.clientEmail;
    }
    return null;
  }
  function findServiceAccountEmail(app2) {
    const accountId = getExplicitServiceAccountEmail(app2);
    if (accountId) {
      return Promise.resolve(accountId);
    }
    const credential = app2.options.credential;
    if (credential instanceof credential_internal_1.ApplicationDefaultCredential) {
      return credential.getServiceAccountEmail();
    }
    return Promise.resolve(null);
  }
  function toWebSafeBase64(data) {
    return data.toString("base64").replace(/\//g, "_").replace(/\+/g, "-");
  }
  function formatString(str, params) {
    let formatted = str;
    Object.keys(params || {}).forEach((key) => {
      formatted = formatted.replace(new RegExp("{" + key + "}", "g"), params[key]);
    });
    return formatted;
  }
  function generateUpdateMask(obj, terminalPaths = [], root = "") {
    const updateMask = [];
    if (!validator2.isNonNullObject(obj)) {
      return updateMask;
    }
    for (const key in obj) {
      if (typeof obj[key] !== "undefined") {
        const nextPath = root ? `${root}.${key}` : key;
        if (terminalPaths.indexOf(nextPath) !== -1) {
          updateMask.push(key);
        } else {
          const maskList = generateUpdateMask(obj[key], terminalPaths, nextPath);
          if (maskList.length > 0) {
            maskList.forEach((mask) => {
              updateMask.push(`${key}.${mask}`);
            });
          } else {
            updateMask.push(key);
          }
        }
      }
    }
    return updateMask;
  }
  function transformMillisecondsToSecondsString(milliseconds) {
    let duration;
    const seconds = Math.floor(milliseconds / 1e3);
    const nanos = Math.floor((milliseconds - seconds * 1e3) * 1e6);
    if (nanos > 0) {
      let nanoString = nanos.toString();
      while (nanoString.length < 9) {
        nanoString = "0" + nanoString;
      }
      duration = `${seconds}.${nanoString}s`;
    } else {
      duration = `${seconds}s`;
    }
    return duration;
  }
  function parseResourceName(resourceName, resourceIdKey) {
    if (!resourceName.includes("/")) {
      return { resourceId: resourceName };
    }
    const CHANNEL_NAME_REGEX = new RegExp(`^(projects/([^/]+)/)?locations/([^/]+)/${resourceIdKey}/([^/]+)$`);
    const match = CHANNEL_NAME_REGEX.exec(resourceName);
    if (match === null) {
      throw new Error("Invalid resource name format.");
    }
    const projectId = match[2];
    const locationId = match[3];
    const resourceId = match[4];
    return { projectId, locationId, resourceId };
  }
  return utils$1;
}
var lifecycle = {};
var firebaseApp = {};
var deepCopy = {};
var hasRequiredDeepCopy;
function requireDeepCopy() {
  if (hasRequiredDeepCopy) return deepCopy;
  hasRequiredDeepCopy = 1;
  Object.defineProperty(deepCopy, "__esModule", { value: true });
  deepCopy.deepCopy = deepCopy$1;
  deepCopy.deepExtend = deepExtend;
  function deepCopy$1(value) {
    return deepExtend(void 0, value);
  }
  function deepExtend(target, source) {
    if (!(source instanceof Object)) {
      return source;
    }
    switch (source.constructor) {
      case Date: {
        const dateValue = source;
        return new Date(dateValue.getTime());
      }
      case Object:
        if (target === void 0) {
          target = {};
        }
        break;
      case Array:
        target = [];
        break;
      default:
        return source;
    }
    for (const prop in source) {
      if (!Object.prototype.hasOwnProperty.call(source, prop)) {
        continue;
      }
      target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
  }
  return deepCopy;
}
var hasRequiredFirebaseApp;
function requireFirebaseApp() {
  if (hasRequiredFirebaseApp) return firebaseApp;
  hasRequiredFirebaseApp = 1;
  Object.defineProperty(firebaseApp, "__esModule", { value: true });
  firebaseApp.FirebaseApp = firebaseApp.FirebaseAppInternals = void 0;
  const credential_internal_1 = requireCredentialInternal();
  const validator2 = requireValidator();
  const deep_copy_1 = requireDeepCopy();
  const error_1 = requireError$3();
  const TOKEN_EXPIRY_THRESHOLD_MILLIS = 5 * 60 * 1e3;
  class FirebaseAppInternals {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor(credential_) {
      this.credential_ = credential_;
      this.tokenListeners_ = [];
      this.isRefreshing = false;
    }
    getToken(forceRefresh = false) {
      if (forceRefresh || this.shouldRefresh()) {
        this.promiseToCachedToken_ = this.refreshToken();
      }
      return this.promiseToCachedToken_;
    }
    getCachedToken() {
      return this.cachedToken_ || null;
    }
    refreshToken() {
      this.isRefreshing = true;
      return Promise.resolve(this.credential_.getAccessToken()).then((result) => {
        if (!validator2.isNonNullObject(result) || typeof result.expires_in !== "number" || typeof result.access_token !== "string") {
          throw new error_1.FirebaseAppError({
            code: error_1.AppErrorCode.INVALID_CREDENTIAL,
            message: `Invalid access token generated: "${JSON.stringify(result)}". Valid access tokens must be an object with the "expires_in" (number) and "access_token" (string) properties.`
          });
        }
        const token = {
          accessToken: result.access_token,
          expirationTime: Date.now() + result.expires_in * 1e3
        };
        if (!this.cachedToken_ || this.cachedToken_.accessToken !== token.accessToken || this.cachedToken_.expirationTime !== token.expirationTime) {
          this.cachedToken_ = token;
          this.tokenListeners_.forEach((listener) => {
            listener(token.accessToken);
          });
        }
        return token;
      }).catch((error2) => {
        let errorMessage = typeof error2 === "string" ? error2 : error2.message;
        errorMessage = `Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token with the following error: "${errorMessage}".`;
        if (errorMessage.indexOf("invalid_grant") !== -1) {
          errorMessage += " There are two likely causes: (1) your server time is not properly synced or (2) your certificate key file has been revoked. To solve (1), re-sync the time on your server. To solve (2), make sure the key ID for your key file is still present at https://console.firebase.google.com/iam-admin/serviceaccounts/project. If not, generate a new key file at https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk.";
        }
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_CREDENTIAL,
          message: errorMessage,
          cause: error2
        });
      }).finally(() => {
        this.isRefreshing = false;
      });
    }
    shouldRefresh() {
      return (!this.cachedToken_ || this.cachedToken_.expirationTime - Date.now() <= TOKEN_EXPIRY_THRESHOLD_MILLIS) && !this.isRefreshing;
    }
    /**
     * Adds a listener that is called each time a token changes.
     *
     * @param listener - The listener that will be called with each new token.
     */
    addAuthTokenListener(listener) {
      this.tokenListeners_.push(listener);
      if (this.cachedToken_) {
        listener(this.cachedToken_.accessToken);
      }
    }
    /**
     * Removes a token listener.
     *
     * @param listener - The listener to remove.
     */
    removeAuthTokenListener(listener) {
      this.tokenListeners_ = this.tokenListeners_.filter((other) => other !== listener);
    }
  }
  firebaseApp.FirebaseAppInternals = FirebaseAppInternals;
  class FirebaseApp {
    constructor(options, name, autoInit = false, appStore) {
      this.appStore = appStore;
      this.services_ = {};
      this.isDeleted_ = false;
      this.autoInit_ = false;
      this.customCredential_ = true;
      this.name_ = name;
      this.options_ = (0, deep_copy_1.deepCopy)(options);
      this.autoInit_ = autoInit;
      if (!validator2.isNonNullObject(this.options_)) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `Invalid Firebase app options passed as the first argument to initializeApp() for the app named "${this.name_}". Options must be a non-null object.`
        });
      }
      const hasCredential = "credential" in this.options_;
      if (!hasCredential) {
        this.customCredential_ = false;
        this.options_.credential = (0, credential_internal_1.getApplicationDefault)(this.options_.httpAgent);
      }
      const credential = this.options_.credential;
      if (typeof credential !== "object" || credential === null || typeof credential.getAccessToken !== "function") {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `Invalid Firebase app options passed as the first argument to initializeApp() for the app named "${this.name_}". The "credential" property must be an object which implements the Credential interface.`
        });
      }
      this.INTERNAL = new FirebaseAppInternals(credential);
    }
    /**
     * Returns the name of the FirebaseApp instance.
     *
     * @returns The name of the FirebaseApp instance.
     */
    get name() {
      this.checkDestroyed_();
      return this.name_;
    }
    /**
     * Returns the options for the FirebaseApp instance.
     *
     * @returns The options for the FirebaseApp instance.
     */
    get options() {
      this.checkDestroyed_();
      return (0, deep_copy_1.deepCopy)(this.options_);
    }
    /**
     * @internal
     */
    getOrInitService(name, init) {
      return this.ensureService_(name, () => init(this));
    }
    /**
     * Returns `true` if this app was initialized with auto-initialization.
     *
     * @internal
     */
    autoInit() {
      return this.autoInit_;
    }
    /**
     * Returns `true` if the `FirebaseApp` instance was initialized with a custom
     * `Credential`.
     *
     * @internal
     */
    customCredential() {
      return this.customCredential_;
    }
    /**
     * Deletes the FirebaseApp instance.
     *
     * @returns An empty Promise fulfilled once the FirebaseApp instance is deleted.
     */
    delete() {
      this.checkDestroyed_();
      this.appStore?.removeApp(this.name);
      return Promise.all(Object.keys(this.services_).map((serviceName) => {
        const service = this.services_[serviceName];
        if (isStateful(service)) {
          return service.delete();
        }
        return Promise.resolve();
      })).then(() => {
        this.services_ = {};
        this.isDeleted_ = true;
      });
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ensureService_(serviceName, initializer) {
      this.checkDestroyed_();
      if (!(serviceName in this.services_)) {
        this.services_[serviceName] = initializer();
      }
      return this.services_[serviceName];
    }
    /**
     * Throws an Error if the FirebaseApp instance has already been deleted.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    checkDestroyed_() {
      if (this.isDeleted_) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.APP_DELETED,
          message: `Firebase app named "${this.name_}" has already been deleted.`
        });
      }
    }
  }
  firebaseApp.FirebaseApp = FirebaseApp;
  function isStateful(service) {
    return typeof service.delete === "function";
  }
  return firebaseApp;
}
var hasRequiredLifecycle;
function requireLifecycle() {
  if (hasRequiredLifecycle) return lifecycle;
  hasRequiredLifecycle = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FIREBASE_CONFIG_VAR = exports.defaultAppStore = exports.AppStore = void 0;
    exports.initializeApp = initializeApp2;
    exports.getApp = getApp;
    exports.getApps = getApps2;
    exports.deleteApp = deleteApp;
    const fs = require$$0;
    const validator2 = requireValidator();
    const error_1 = requireError$3();
    const credential_internal_1 = requireCredentialInternal();
    const firebase_app_1 = requireFirebaseApp();
    const fastDeepEqual = requireFastDeepEqual();
    const DEFAULT_APP_NAME = "[DEFAULT]";
    class AppStore {
      constructor() {
        this.appStore = /* @__PURE__ */ new Map();
      }
      initializeApp(options, appName = DEFAULT_APP_NAME) {
        validateAppNameFormat(appName);
        let autoInit = false;
        if (typeof options === "undefined") {
          autoInit = true;
          options = loadOptionsFromEnvVar();
          options.credential = (0, credential_internal_1.getApplicationDefault)();
        }
        if (!this.appStore.has(appName)) {
          const app2 = new firebase_app_1.FirebaseApp(options, appName, autoInit, this);
          this.appStore.set(app2.name, app2);
          return app2;
        }
        const currentApp = this.appStore.get(appName);
        if (currentApp.autoInit() !== autoInit) {
          throw new error_1.FirebaseAppError({
            code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
            message: `A Firebase app named "${appName}" already exists with a different configuration.`
          });
        }
        if (autoInit) {
          return currentApp;
        }
        validateAppOptionsSupportDeepEquals(options, currentApp);
        const currentAppOptions = { ...currentApp.options };
        delete currentAppOptions.credential;
        if (!fastDeepEqual(options, currentAppOptions)) {
          throw new error_1.FirebaseAppError({
            code: error_1.AppErrorCode.DUPLICATE_APP,
            message: `A Firebase app named "${appName}" already exists with a different configuration.`
          });
        }
        return currentApp;
      }
      getApp(appName = DEFAULT_APP_NAME) {
        validateAppNameFormat(appName);
        if (!this.appStore.has(appName)) {
          let errorMessage = appName === DEFAULT_APP_NAME ? "The default Firebase app does not exist. " : `Firebase app named "${appName}" does not exist. `;
          errorMessage += "Make sure you call initializeApp() before using any of the Firebase services.";
          throw new error_1.FirebaseAppError({ code: error_1.AppErrorCode.NO_APP, message: errorMessage });
        }
        return this.appStore.get(appName);
      }
      getApps() {
        return Array.from(this.appStore.values());
      }
      deleteApp(app2) {
        if (typeof app2 !== "object" || app2 === null || !("options" in app2)) {
          throw new error_1.FirebaseAppError({ code: error_1.AppErrorCode.INVALID_ARGUMENT, message: "Invalid app argument." });
        }
        const existingApp = getApp(app2.name);
        return existingApp.delete();
      }
      clearAllApps() {
        const promises = [];
        this.getApps().forEach((app2) => {
          promises.push(this.deleteApp(app2));
        });
        return Promise.all(promises).then();
      }
      /**
       * Removes the specified App instance from the store. This is currently called by the
       * {@link FirebaseApp.delete} method. Can be removed once the app deletion is handled
       * entirely by the {@link deleteApp} top-level function.
       */
      removeApp(appName) {
        this.appStore.delete(appName);
      }
    }
    exports.AppStore = AppStore;
    function validateAppOptionsSupportDeepEquals(requestedOptions, existingApp) {
      if (typeof requestedOptions.httpAgent !== "undefined") {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `Firebase app named "${existingApp.name}" already exists and initializeApp was invoked with an optional http.Agent. The SDK cannot confirm the equality of http.Agent objects with the existing app. Please use getApp or getApps to reuse the existing app instead.`
        });
      } else if (typeof existingApp.options.httpAgent !== "undefined") {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `An existing app named "${existingApp.name}" already exists with a different options configuration: httpAgent.`
        });
      }
      if (typeof requestedOptions.credential !== "undefined") {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `Firebase app named "${existingApp.name}" already exists and initializeApp was invoked with an optional Credential. The SDK cannot confirm the equality of Credential objects with the existing app. Please use getApp or getApps to reuse the existing app instead.`
        });
      }
      if (existingApp.customCredential()) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `An existing app named "${existingApp.name}" already exists with a different options configuration: Credential.`
        });
      }
    }
    function validateAppNameFormat(appName) {
      if (!validator2.isNonEmptyString(appName)) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_NAME,
          message: `Invalid Firebase app name "${appName}" provided. App name must be a non-empty string.`
        });
      }
    }
    exports.defaultAppStore = new AppStore();
    function initializeApp2(options, appName = DEFAULT_APP_NAME) {
      return exports.defaultAppStore.initializeApp(options, appName);
    }
    function getApp(appName = DEFAULT_APP_NAME) {
      return exports.defaultAppStore.getApp(appName);
    }
    function getApps2() {
      return exports.defaultAppStore.getApps();
    }
    function deleteApp(app2) {
      return exports.defaultAppStore.deleteApp(app2);
    }
    exports.FIREBASE_CONFIG_VAR = "FIREBASE_CONFIG";
    function loadOptionsFromEnvVar() {
      const config = process.env[exports.FIREBASE_CONFIG_VAR];
      if (!validator2.isNonEmptyString(config)) {
        return {};
      }
      try {
        const contents = config.startsWith("{") ? config : fs.readFileSync(config, "utf8");
        return JSON.parse(contents);
      } catch (error2) {
        throw new error_1.FirebaseAppError({
          code: error_1.AppErrorCode.INVALID_APP_OPTIONS,
          message: `Failed to parse app options file: ${error2.message}`,
          cause: error2
        });
      }
    }
  })(lifecycle);
  return lifecycle;
}
var credentialFactory = {};
var hasRequiredCredentialFactory;
function requireCredentialFactory() {
  if (hasRequiredCredentialFactory) return credentialFactory;
  hasRequiredCredentialFactory = 1;
  Object.defineProperty(credentialFactory, "__esModule", { value: true });
  credentialFactory.applicationDefault = applicationDefault2;
  credentialFactory.cert = cert2;
  credentialFactory.refreshToken = refreshToken;
  credentialFactory.clearGlobalAppDefaultCred = clearGlobalAppDefaultCred;
  const credential_internal_1 = requireCredentialInternal();
  let globalAppDefaultCred;
  const globalCertCreds = {};
  const globalRefreshTokenCreds = {};
  function applicationDefault2(httpAgent) {
    if (typeof globalAppDefaultCred === "undefined") {
      globalAppDefaultCred = (0, credential_internal_1.getApplicationDefault)(httpAgent);
    }
    return globalAppDefaultCred;
  }
  function cert2(serviceAccountPathOrObject, httpAgent) {
    const stringifiedServiceAccount = JSON.stringify(serviceAccountPathOrObject);
    if (!(stringifiedServiceAccount in globalCertCreds)) {
      globalCertCreds[stringifiedServiceAccount] = new credential_internal_1.ServiceAccountCredential(serviceAccountPathOrObject, httpAgent);
    }
    return globalCertCreds[stringifiedServiceAccount];
  }
  function refreshToken(refreshTokenPathOrObject, httpAgent) {
    const stringifiedRefreshToken = JSON.stringify(refreshTokenPathOrObject);
    if (!(stringifiedRefreshToken in globalRefreshTokenCreds)) {
      globalRefreshTokenCreds[stringifiedRefreshToken] = new credential_internal_1.RefreshTokenCredential(refreshTokenPathOrObject, httpAgent);
    }
    return globalRefreshTokenCreds[stringifiedRefreshToken];
  }
  function clearGlobalAppDefaultCred() {
    globalAppDefaultCred = void 0;
  }
  return credentialFactory;
}
var hasRequiredApp;
function requireApp() {
  if (hasRequiredApp) return app;
  hasRequiredApp = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK_VERSION = exports.AppErrorCode = exports.FirebaseAppError = exports.FirebaseError = exports.refreshToken = exports.cert = exports.applicationDefault = exports.deleteApp = exports.getApps = exports.getApp = exports.initializeApp = void 0;
    const utils_1 = requireUtils$1();
    var lifecycle_1 = requireLifecycle();
    Object.defineProperty(exports, "initializeApp", { enumerable: true, get: function() {
      return lifecycle_1.initializeApp;
    } });
    Object.defineProperty(exports, "getApp", { enumerable: true, get: function() {
      return lifecycle_1.getApp;
    } });
    Object.defineProperty(exports, "getApps", { enumerable: true, get: function() {
      return lifecycle_1.getApps;
    } });
    Object.defineProperty(exports, "deleteApp", { enumerable: true, get: function() {
      return lifecycle_1.deleteApp;
    } });
    var credential_factory_1 = requireCredentialFactory();
    Object.defineProperty(exports, "applicationDefault", { enumerable: true, get: function() {
      return credential_factory_1.applicationDefault;
    } });
    Object.defineProperty(exports, "cert", { enumerable: true, get: function() {
      return credential_factory_1.cert;
    } });
    Object.defineProperty(exports, "refreshToken", { enumerable: true, get: function() {
      return credential_factory_1.refreshToken;
    } });
    var error_1 = requireError$4();
    Object.defineProperty(exports, "FirebaseError", { enumerable: true, get: function() {
      return error_1.FirebaseError;
    } });
    var error_2 = requireError$3();
    Object.defineProperty(exports, "FirebaseAppError", { enumerable: true, get: function() {
      return error_2.FirebaseAppError;
    } });
    Object.defineProperty(exports, "AppErrorCode", { enumerable: true, get: function() {
      return error_2.AppErrorCode;
    } });
    exports.SDK_VERSION = (0, utils_1.getSdkVersion)();
  })(app);
  return app;
}
var appExports = requireApp();
const mod$3 = /* @__PURE__ */ getDefaultExportFromCjs(appExports);
mod$3.AppErrorCode;
mod$3.FirebaseAppError;
mod$3.FirebaseError;
mod$3.SDK_VERSION;
const applicationDefault = mod$3.applicationDefault;
const cert = mod$3.cert;
mod$3.deleteApp;
mod$3.getApp;
const getApps = mod$3.getApps;
const initializeApp = mod$3.initializeApp;
mod$3.refreshToken;
var auth$1 = {};
var auth = {};
var authApiRequest = {};
var error$2 = {};
var hasRequiredError$2;
function requireError$2() {
  if (hasRequiredError$2) return error$2;
  hasRequiredError$2 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirebaseAuthError = exports.authClientErrorCode = exports.AuthErrorCode = void 0;
    const error_1 = requireError$4();
    const deep_copy_1 = requireDeepCopy();
    exports.AuthErrorCode = {
      AUTH_BLOCKING_TOKEN_EXPIRED: "auth-blocking-token-expired",
      BILLING_NOT_ENABLED: "billing-not-enabled",
      CLAIMS_TOO_LARGE: "claims-too-large",
      CONFIGURATION_EXISTS: "configuration-exists",
      CONFIGURATION_NOT_FOUND: "configuration-not-found",
      ID_TOKEN_EXPIRED: "id-token-expired",
      INVALID_ARGUMENT: "argument-error",
      INVALID_CONFIG: "invalid-config",
      EMAIL_ALREADY_EXISTS: "email-already-exists",
      EMAIL_NOT_FOUND: "email-not-found",
      FORBIDDEN_CLAIM: "reserved-claim",
      INVALID_ID_TOKEN: "invalid-id-token",
      ID_TOKEN_REVOKED: "id-token-revoked",
      INTERNAL_ERROR: "internal-error",
      INVALID_CLAIMS: "invalid-claims",
      INVALID_CONTINUE_URI: "invalid-continue-uri",
      INVALID_CREATION_TIME: "invalid-creation-time",
      INVALID_CREDENTIAL: "invalid-credential",
      INVALID_DISABLED_FIELD: "invalid-disabled-field",
      INVALID_DISPLAY_NAME: "invalid-display-name",
      INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
      INVALID_HOSTING_LINK_DOMAIN: "invalid-hosting-link-domain",
      INVALID_EMAIL_VERIFIED: "invalid-email-verified",
      INVALID_EMAIL: "invalid-email",
      INVALID_NEW_EMAIL: "invalid-new-email",
      INVALID_ENROLLED_FACTORS: "invalid-enrolled-factors",
      INVALID_ENROLLMENT_TIME: "invalid-enrollment-time",
      INVALID_HASH_ALGORITHM: "invalid-hash-algorithm",
      INVALID_HASH_BLOCK_SIZE: "invalid-hash-block-size",
      INVALID_HASH_DERIVED_KEY_LENGTH: "invalid-hash-derived-key-length",
      INVALID_HASH_KEY: "invalid-hash-key",
      INVALID_HASH_MEMORY_COST: "invalid-hash-memory-cost",
      INVALID_HASH_PARALLELIZATION: "invalid-hash-parallelization",
      INVALID_HASH_ROUNDS: "invalid-hash-rounds",
      INVALID_HASH_SALT_SEPARATOR: "invalid-hash-salt-separator",
      INVALID_LAST_SIGN_IN_TIME: "invalid-last-sign-in-time",
      INVALID_NAME: "invalid-name",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      INVALID_PAGE_TOKEN: "invalid-page-token",
      INVALID_PASSWORD: "invalid-password",
      INVALID_PASSWORD_HASH: "invalid-password-hash",
      INVALID_PASSWORD_SALT: "invalid-password-salt",
      INVALID_PHONE_NUMBER: "invalid-phone-number",
      INVALID_PHOTO_URL: "invalid-photo-url",
      INVALID_PROJECT_ID: "invalid-project-id",
      INVALID_PROVIDER_DATA: "invalid-provider-data",
      INVALID_PROVIDER_ID: "invalid-provider-id",
      INVALID_PROVIDER_UID: "invalid-provider-uid",
      INVALID_OAUTH_RESPONSETYPE: "invalid-oauth-responsetype",
      INVALID_SESSION_COOKIE_DURATION: "invalid-session-cookie-duration",
      INVALID_TENANT_ID: "invalid-tenant-id",
      INVALID_TENANT_TYPE: "invalid-tenant-type",
      INVALID_TESTING_PHONE_NUMBER: "invalid-testing-phone-number",
      INVALID_UID: "invalid-uid",
      INVALID_USER_IMPORT: "invalid-user-import",
      INVALID_TOKENS_VALID_AFTER_TIME: "invalid-tokens-valid-after-time",
      MISMATCHING_TENANT_ID: "mismatching-tenant-id",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-package-name",
      MISSING_CONFIG: "missing-config",
      MISSING_CONTINUE_URI: "missing-continue-uri",
      MISSING_DISPLAY_NAME: "missing-display-name",
      MISSING_EMAIL: "missing-email",
      MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
      MISSING_ISSUER: "missing-issuer",
      MISSING_HASH_ALGORITHM: "missing-hash-algorithm",
      MISSING_OAUTH_CLIENT_ID: "missing-oauth-client-id",
      MISSING_OAUTH_CLIENT_SECRET: "missing-oauth-client-secret",
      MISSING_PROVIDER_ID: "missing-provider-id",
      MISSING_SAML_RELYING_PARTY_CONFIG: "missing-saml-relying-party-config",
      MAXIMUM_TEST_PHONE_NUMBER_EXCEEDED: "test-phone-number-limit-exceeded",
      MAXIMUM_USER_COUNT_EXCEEDED: "maximum-user-count-exceeded",
      MISSING_UID: "missing-uid",
      OPERATION_NOT_ALLOWED: "operation-not-allowed",
      PHONE_NUMBER_ALREADY_EXISTS: "phone-number-already-exists",
      PROJECT_NOT_FOUND: "project-not-found",
      INSUFFICIENT_PERMISSION: "insufficient-permission",
      QUOTA_EXCEEDED: "quota-exceeded",
      SECOND_FACTOR_LIMIT_EXCEEDED: "second-factor-limit-exceeded",
      SECOND_FACTOR_UID_ALREADY_EXISTS: "second-factor-uid-already-exists",
      SESSION_COOKIE_EXPIRED: "session-cookie-expired",
      SESSION_COOKIE_REVOKED: "session-cookie-revoked",
      TENANT_NOT_FOUND: "tenant-not-found",
      UID_ALREADY_EXISTS: "uid-already-exists",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      UNSUPPORTED_FIRST_FACTOR: "unsupported-first-factor",
      UNSUPPORTED_SECOND_FACTOR: "unsupported-second-factor",
      UNSUPPORTED_TENANT_OPERATION: "unsupported-tenant-operation",
      UNVERIFIED_EMAIL: "unverified-email",
      USER_NOT_FOUND: "user-not-found",
      NOT_FOUND: "not-found",
      USER_DISABLED: "user-disabled",
      USER_NOT_DISABLED: "user-not-disabled",
      INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
      INVALID_RECAPTCHA_ENFORCEMENT_STATE: "invalid-recaptcha-enforcement-state",
      RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled"
    };
    exports.authClientErrorCode = {
      AUTH_BLOCKING_TOKEN_EXPIRED: {
        code: exports.AuthErrorCode.AUTH_BLOCKING_TOKEN_EXPIRED,
        message: "The provided Firebase Auth Blocking token is expired."
      },
      BILLING_NOT_ENABLED: {
        code: exports.AuthErrorCode.BILLING_NOT_ENABLED,
        message: "Feature requires billing to be enabled."
      },
      CLAIMS_TOO_LARGE: {
        code: exports.AuthErrorCode.CLAIMS_TOO_LARGE,
        message: "Developer claims maximum payload size exceeded."
      },
      CONFIGURATION_EXISTS: {
        code: exports.AuthErrorCode.CONFIGURATION_EXISTS,
        message: "A configuration already exists with the provided identifier."
      },
      CONFIGURATION_NOT_FOUND: {
        code: exports.AuthErrorCode.CONFIGURATION_NOT_FOUND,
        message: "There is no configuration corresponding to the provided identifier."
      },
      ID_TOKEN_EXPIRED: {
        code: exports.AuthErrorCode.ID_TOKEN_EXPIRED,
        message: "The provided Firebase ID token is expired."
      },
      INVALID_ARGUMENT: {
        code: exports.AuthErrorCode.INVALID_ARGUMENT,
        message: "Invalid argument provided."
      },
      INVALID_CONFIG: {
        code: exports.AuthErrorCode.INVALID_CONFIG,
        message: "The provided configuration is invalid."
      },
      EMAIL_ALREADY_EXISTS: {
        code: exports.AuthErrorCode.EMAIL_ALREADY_EXISTS,
        message: "The email address is already in use by another account."
      },
      EMAIL_NOT_FOUND: {
        code: exports.AuthErrorCode.EMAIL_NOT_FOUND,
        message: "There is no user record corresponding to the provided email."
      },
      FORBIDDEN_CLAIM: {
        code: exports.AuthErrorCode.FORBIDDEN_CLAIM,
        message: "The specified developer claim is reserved and cannot be specified."
      },
      INVALID_ID_TOKEN: {
        code: exports.AuthErrorCode.INVALID_ID_TOKEN,
        message: "The provided ID token is not a valid Firebase ID token."
      },
      ID_TOKEN_REVOKED: {
        code: exports.AuthErrorCode.ID_TOKEN_REVOKED,
        message: "The Firebase ID token has been revoked."
      },
      INTERNAL_ERROR: {
        code: exports.AuthErrorCode.INTERNAL_ERROR,
        message: "An internal error has occurred."
      },
      INVALID_CLAIMS: {
        code: exports.AuthErrorCode.INVALID_CLAIMS,
        message: "The provided custom claim attributes are invalid."
      },
      INVALID_CONTINUE_URI: {
        code: exports.AuthErrorCode.INVALID_CONTINUE_URI,
        message: "The continue URL must be a valid URL string."
      },
      INVALID_CREATION_TIME: {
        code: exports.AuthErrorCode.INVALID_CREATION_TIME,
        message: "The creation time must be a valid UTC date string."
      },
      INVALID_CREDENTIAL: {
        code: exports.AuthErrorCode.INVALID_CREDENTIAL,
        message: "Invalid credential object provided."
      },
      INVALID_DISABLED_FIELD: {
        code: exports.AuthErrorCode.INVALID_DISABLED_FIELD,
        message: "The disabled field must be a boolean."
      },
      INVALID_DISPLAY_NAME: {
        code: exports.AuthErrorCode.INVALID_DISPLAY_NAME,
        message: "The displayName field must be a valid string."
      },
      INVALID_DYNAMIC_LINK_DOMAIN: {
        code: exports.AuthErrorCode.INVALID_DYNAMIC_LINK_DOMAIN,
        message: "The provided dynamic link domain is not configured or authorized for the current project."
      },
      INVALID_HOSTING_LINK_DOMAIN: {
        code: exports.AuthErrorCode.INVALID_HOSTING_LINK_DOMAIN,
        message: "The provided hosting link domain is not configured in Firebase Hosting or is not owned by the current project."
      },
      INVALID_EMAIL_VERIFIED: {
        code: exports.AuthErrorCode.INVALID_EMAIL_VERIFIED,
        message: "The emailVerified field must be a boolean."
      },
      INVALID_EMAIL: {
        code: exports.AuthErrorCode.INVALID_EMAIL,
        message: "The email address is improperly formatted."
      },
      INVALID_NEW_EMAIL: {
        code: exports.AuthErrorCode.INVALID_NEW_EMAIL,
        message: "The new email address is improperly formatted."
      },
      INVALID_ENROLLED_FACTORS: {
        code: exports.AuthErrorCode.INVALID_ENROLLED_FACTORS,
        message: "The enrolled factors must be a valid array of MultiFactorInfo objects."
      },
      INVALID_ENROLLMENT_TIME: {
        code: exports.AuthErrorCode.INVALID_ENROLLMENT_TIME,
        message: "The second factor enrollment time must be a valid UTC date string."
      },
      INVALID_HASH_ALGORITHM: {
        code: exports.AuthErrorCode.INVALID_HASH_ALGORITHM,
        message: "The hash algorithm must match one of the strings in the list of supported algorithms."
      },
      INVALID_HASH_BLOCK_SIZE: {
        code: exports.AuthErrorCode.INVALID_HASH_BLOCK_SIZE,
        message: "The hash block size must be a valid number."
      },
      INVALID_HASH_DERIVED_KEY_LENGTH: {
        code: exports.AuthErrorCode.INVALID_HASH_DERIVED_KEY_LENGTH,
        message: "The hash derived key length must be a valid number."
      },
      INVALID_HASH_KEY: {
        code: exports.AuthErrorCode.INVALID_HASH_KEY,
        message: "The hash key must a valid byte buffer."
      },
      INVALID_HASH_MEMORY_COST: {
        code: exports.AuthErrorCode.INVALID_HASH_MEMORY_COST,
        message: "The hash memory cost must be a valid number."
      },
      INVALID_HASH_PARALLELIZATION: {
        code: exports.AuthErrorCode.INVALID_HASH_PARALLELIZATION,
        message: "The hash parallelization must be a valid number."
      },
      INVALID_HASH_ROUNDS: {
        code: exports.AuthErrorCode.INVALID_HASH_ROUNDS,
        message: "The hash rounds must be a valid number."
      },
      INVALID_HASH_SALT_SEPARATOR: {
        code: exports.AuthErrorCode.INVALID_HASH_SALT_SEPARATOR,
        message: "The hashing algorithm salt separator field must be a valid byte buffer."
      },
      INVALID_LAST_SIGN_IN_TIME: {
        code: exports.AuthErrorCode.INVALID_LAST_SIGN_IN_TIME,
        message: "The last sign-in time must be a valid UTC date string."
      },
      INVALID_NAME: {
        code: exports.AuthErrorCode.INVALID_NAME,
        message: "The resource name provided is invalid."
      },
      INVALID_OAUTH_CLIENT_ID: {
        code: exports.AuthErrorCode.INVALID_OAUTH_CLIENT_ID,
        message: "The provided OAuth client ID is invalid."
      },
      INVALID_PAGE_TOKEN: {
        code: exports.AuthErrorCode.INVALID_PAGE_TOKEN,
        message: "The page token must be a valid non-empty string."
      },
      INVALID_PASSWORD: {
        code: exports.AuthErrorCode.INVALID_PASSWORD,
        message: "The password must be a string with at least 6 characters."
      },
      INVALID_PASSWORD_HASH: {
        code: exports.AuthErrorCode.INVALID_PASSWORD_HASH,
        message: "The password hash must be a valid byte buffer."
      },
      INVALID_PASSWORD_SALT: {
        code: exports.AuthErrorCode.INVALID_PASSWORD_SALT,
        message: "The password salt must be a valid byte buffer."
      },
      INVALID_PHONE_NUMBER: {
        code: exports.AuthErrorCode.INVALID_PHONE_NUMBER,
        message: "The phone number must be a non-empty E.164 standard compliant identifier string."
      },
      INVALID_PHOTO_URL: {
        code: exports.AuthErrorCode.INVALID_PHOTO_URL,
        message: "The photoURL field must be a valid URL."
      },
      INVALID_PROJECT_ID: {
        code: exports.AuthErrorCode.INVALID_PROJECT_ID,
        message: "Invalid parent project. Either parent project doesn't exist or didn't enable multi-tenancy."
      },
      INVALID_PROVIDER_DATA: {
        code: exports.AuthErrorCode.INVALID_PROVIDER_DATA,
        message: "The providerData must be a valid array of UserInfo objects."
      },
      INVALID_PROVIDER_ID: {
        code: exports.AuthErrorCode.INVALID_PROVIDER_ID,
        message: "The providerId must be a valid supported provider identifier string."
      },
      INVALID_PROVIDER_UID: {
        code: exports.AuthErrorCode.INVALID_PROVIDER_UID,
        message: "The providerUid must be a valid provider uid string."
      },
      INVALID_OAUTH_RESPONSETYPE: {
        code: exports.AuthErrorCode.INVALID_OAUTH_RESPONSETYPE,
        message: "Only exactly one OAuth responseType should be set to true."
      },
      INVALID_SESSION_COOKIE_DURATION: {
        code: exports.AuthErrorCode.INVALID_SESSION_COOKIE_DURATION,
        message: "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks."
      },
      INVALID_TENANT_ID: {
        code: exports.AuthErrorCode.INVALID_TENANT_ID,
        message: "The tenant ID must be a valid non-empty string."
      },
      INVALID_TENANT_TYPE: {
        code: exports.AuthErrorCode.INVALID_TENANT_TYPE,
        message: 'Tenant type must be either "full_service" or "lightweight".'
      },
      INVALID_TESTING_PHONE_NUMBER: {
        code: exports.AuthErrorCode.INVALID_TESTING_PHONE_NUMBER,
        message: "Invalid testing phone number or invalid test code provided."
      },
      INVALID_UID: {
        code: exports.AuthErrorCode.INVALID_UID,
        message: "The uid must be a non-empty string with at most 128 characters."
      },
      INVALID_USER_IMPORT: {
        code: exports.AuthErrorCode.INVALID_USER_IMPORT,
        message: "The user record to import is invalid."
      },
      INVALID_TOKENS_VALID_AFTER_TIME: {
        code: exports.AuthErrorCode.INVALID_TOKENS_VALID_AFTER_TIME,
        message: "The tokensValidAfterTime must be a valid UTC number in seconds."
      },
      MISMATCHING_TENANT_ID: {
        code: exports.AuthErrorCode.MISMATCHING_TENANT_ID,
        message: "User tenant ID does not match with the current TenantAwareAuth tenant ID."
      },
      MISSING_ANDROID_PACKAGE_NAME: {
        code: exports.AuthErrorCode.MISSING_ANDROID_PACKAGE_NAME,
        message: "An Android Package Name must be provided if the Android App is required to be installed."
      },
      MISSING_CONFIG: {
        code: exports.AuthErrorCode.MISSING_CONFIG,
        message: "The provided configuration is missing required attributes."
      },
      MISSING_CONTINUE_URI: {
        code: exports.AuthErrorCode.MISSING_CONTINUE_URI,
        message: "A valid continue URL must be provided in the request."
      },
      MISSING_DISPLAY_NAME: {
        code: exports.AuthErrorCode.MISSING_DISPLAY_NAME,
        message: "The resource being created or edited is missing a valid display name."
      },
      MISSING_EMAIL: {
        code: exports.AuthErrorCode.MISSING_EMAIL,
        message: "The email is required for the specified action. For example, a multi-factor user requires a verified email."
      },
      MISSING_IOS_BUNDLE_ID: {
        code: exports.AuthErrorCode.MISSING_IOS_BUNDLE_ID,
        message: "The request is missing an iOS Bundle ID."
      },
      MISSING_ISSUER: {
        code: exports.AuthErrorCode.MISSING_ISSUER,
        message: "The OAuth/OIDC configuration issuer must not be empty."
      },
      MISSING_HASH_ALGORITHM: {
        code: exports.AuthErrorCode.MISSING_HASH_ALGORITHM,
        message: "Importing users with password hashes requires that the hashing algorithm and its parameters be provided."
      },
      MISSING_OAUTH_CLIENT_ID: {
        code: exports.AuthErrorCode.MISSING_OAUTH_CLIENT_ID,
        message: "The OAuth/OIDC configuration client ID must not be empty."
      },
      MISSING_OAUTH_CLIENT_SECRET: {
        code: exports.AuthErrorCode.MISSING_OAUTH_CLIENT_SECRET,
        message: "The OAuth configuration client secret is required to enable OIDC code flow."
      },
      MISSING_PROVIDER_ID: {
        code: exports.AuthErrorCode.MISSING_PROVIDER_ID,
        message: "A valid provider ID must be provided in the request."
      },
      MISSING_SAML_RELYING_PARTY_CONFIG: {
        code: exports.AuthErrorCode.MISSING_SAML_RELYING_PARTY_CONFIG,
        message: "The SAML configuration provided is missing a relying party configuration."
      },
      MAXIMUM_TEST_PHONE_NUMBER_EXCEEDED: {
        code: exports.AuthErrorCode.MAXIMUM_TEST_PHONE_NUMBER_EXCEEDED,
        message: "The maximum allowed number of test phone number / code pairs has been exceeded."
      },
      MAXIMUM_USER_COUNT_EXCEEDED: {
        code: exports.AuthErrorCode.MAXIMUM_USER_COUNT_EXCEEDED,
        message: "The maximum allowed number of users to import has been exceeded."
      },
      MISSING_UID: {
        code: exports.AuthErrorCode.MISSING_UID,
        message: "A uid identifier is required for the current operation."
      },
      OPERATION_NOT_ALLOWED: {
        code: exports.AuthErrorCode.OPERATION_NOT_ALLOWED,
        message: "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section."
      },
      PHONE_NUMBER_ALREADY_EXISTS: {
        code: exports.AuthErrorCode.PHONE_NUMBER_ALREADY_EXISTS,
        message: "The user with the provided phone number already exists."
      },
      PROJECT_NOT_FOUND: {
        code: exports.AuthErrorCode.PROJECT_NOT_FOUND,
        message: "No Firebase project was found for the provided credential."
      },
      INSUFFICIENT_PERMISSION: {
        code: exports.AuthErrorCode.INSUFFICIENT_PERMISSION,
        message: 'Credential implementation provided to initializeApp() via the "credential" property has insufficient permission to access the requested resource. See https://firebase.google.com/docs/admin/setup for details on how to authenticate this SDK with appropriate permissions.'
      },
      QUOTA_EXCEEDED: {
        code: exports.AuthErrorCode.QUOTA_EXCEEDED,
        message: "The project quota for the specified operation has been exceeded."
      },
      SECOND_FACTOR_LIMIT_EXCEEDED: {
        code: exports.AuthErrorCode.SECOND_FACTOR_LIMIT_EXCEEDED,
        message: "The maximum number of allowed second factors on a user has been exceeded."
      },
      SECOND_FACTOR_UID_ALREADY_EXISTS: {
        code: exports.AuthErrorCode.SECOND_FACTOR_UID_ALREADY_EXISTS,
        message: 'The specified second factor "uid" already exists.'
      },
      SESSION_COOKIE_EXPIRED: {
        code: exports.AuthErrorCode.SESSION_COOKIE_EXPIRED,
        message: "The Firebase session cookie is expired."
      },
      SESSION_COOKIE_REVOKED: {
        code: exports.AuthErrorCode.SESSION_COOKIE_REVOKED,
        message: "The Firebase session cookie has been revoked."
      },
      TENANT_NOT_FOUND: {
        code: exports.AuthErrorCode.TENANT_NOT_FOUND,
        message: "There is no tenant corresponding to the provided identifier."
      },
      UID_ALREADY_EXISTS: {
        code: exports.AuthErrorCode.UID_ALREADY_EXISTS,
        message: "The user with the provided uid already exists."
      },
      UNAUTHORIZED_DOMAIN: {
        code: exports.AuthErrorCode.UNAUTHORIZED_DOMAIN,
        message: "The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console."
      },
      UNSUPPORTED_FIRST_FACTOR: {
        code: exports.AuthErrorCode.UNSUPPORTED_FIRST_FACTOR,
        message: "A multi-factor user requires a supported first factor."
      },
      UNSUPPORTED_SECOND_FACTOR: {
        code: exports.AuthErrorCode.UNSUPPORTED_SECOND_FACTOR,
        message: "The request specified an unsupported type of second factor."
      },
      UNSUPPORTED_TENANT_OPERATION: {
        code: exports.AuthErrorCode.UNSUPPORTED_TENANT_OPERATION,
        message: "This operation is not supported in a multi-tenant context."
      },
      UNVERIFIED_EMAIL: {
        code: exports.AuthErrorCode.UNVERIFIED_EMAIL,
        message: "A verified email is required for the specified action. For example, a multi-factor user requires a verified email."
      },
      USER_NOT_FOUND: {
        code: exports.AuthErrorCode.USER_NOT_FOUND,
        message: "There is no user record corresponding to the provided identifier."
      },
      NOT_FOUND: {
        code: exports.AuthErrorCode.NOT_FOUND,
        message: "The requested resource was not found."
      },
      USER_DISABLED: {
        code: exports.AuthErrorCode.USER_DISABLED,
        message: "The user record is disabled."
      },
      USER_NOT_DISABLED: {
        code: exports.AuthErrorCode.USER_NOT_DISABLED,
        message: "The user must be disabled in order to bulk delete it (or you must pass force=true)."
      },
      INVALID_RECAPTCHA_ACTION: {
        code: exports.AuthErrorCode.INVALID_RECAPTCHA_ACTION,
        message: 'reCAPTCHA action must be "BLOCK".'
      },
      INVALID_RECAPTCHA_ENFORCEMENT_STATE: {
        code: exports.AuthErrorCode.INVALID_RECAPTCHA_ENFORCEMENT_STATE,
        message: 'reCAPTCHA enforcement state must be either "OFF", "AUDIT" or "ENFORCE".'
      },
      RECAPTCHA_NOT_ENABLED: {
        code: exports.AuthErrorCode.RECAPTCHA_NOT_ENABLED,
        message: "reCAPTCHA enterprise is not enabled."
      }
    };
    const AUTH_SERVER_TO_CLIENT_CODE = {
      // Feature being configured or used requires a billing account.
      BILLING_NOT_ENABLED: "BILLING_NOT_ENABLED",
      // Claims payload is too large.
      CLAIMS_TOO_LARGE: "CLAIMS_TOO_LARGE",
      // Configuration being added already exists.
      CONFIGURATION_EXISTS: "CONFIGURATION_EXISTS",
      // Configuration not found.
      CONFIGURATION_NOT_FOUND: "CONFIGURATION_NOT_FOUND",
      // Provided credential has insufficient permissions.
      INSUFFICIENT_PERMISSION: "INSUFFICIENT_PERMISSION",
      // Provided configuration has invalid fields.
      INVALID_CONFIG: "INVALID_CONFIG",
      // Provided configuration identifier is invalid.
      INVALID_CONFIG_ID: "INVALID_PROVIDER_ID",
      // ActionCodeSettings missing continue URL.
      INVALID_CONTINUE_URI: "INVALID_CONTINUE_URI",
      // Dynamic link domain in provided ActionCodeSettings is not authorized.
      INVALID_DYNAMIC_LINK_DOMAIN: "INVALID_DYNAMIC_LINK_DOMAIN",
      // Hosting link domain in provided ActionCodeSettings is not owned by the current project.
      INVALID_HOSTING_LINK_DOMAIN: "INVALID_HOSTING_LINK_DOMAIN",
      // uploadAccount provides an email that already exists.
      DUPLICATE_EMAIL: "EMAIL_ALREADY_EXISTS",
      // uploadAccount provides a localId that already exists.
      DUPLICATE_LOCAL_ID: "UID_ALREADY_EXISTS",
      // Request specified a multi-factor enrollment ID that already exists.
      DUPLICATE_MFA_ENROLLMENT_ID: "SECOND_FACTOR_UID_ALREADY_EXISTS",
      // setAccountInfo email already exists.
      EMAIL_EXISTS: "EMAIL_ALREADY_EXISTS",
      // /accounts:sendOobCode for password reset when user is not found.
      EMAIL_NOT_FOUND: "EMAIL_NOT_FOUND",
      // Reserved claim name.
      FORBIDDEN_CLAIM: "FORBIDDEN_CLAIM",
      // Invalid claims provided.
      INVALID_CLAIMS: "INVALID_CLAIMS",
      // Invalid session cookie duration.
      INVALID_DURATION: "INVALID_SESSION_COOKIE_DURATION",
      // Invalid email provided.
      INVALID_EMAIL: "INVALID_EMAIL",
      // Invalid new email provided.
      INVALID_NEW_EMAIL: "INVALID_NEW_EMAIL",
      // Invalid tenant display name. This can be thrown on CreateTenant and UpdateTenant.
      INVALID_DISPLAY_NAME: "INVALID_DISPLAY_NAME",
      // Invalid ID token provided.
      INVALID_ID_TOKEN: "INVALID_ID_TOKEN",
      // Invalid tenant/parent resource name.
      INVALID_NAME: "INVALID_NAME",
      // OIDC configuration has an invalid OAuth client ID.
      INVALID_OAUTH_CLIENT_ID: "INVALID_OAUTH_CLIENT_ID",
      // Invalid page token.
      INVALID_PAGE_SELECTION: "INVALID_PAGE_TOKEN",
      // Invalid phone number.
      INVALID_PHONE_NUMBER: "INVALID_PHONE_NUMBER",
      // Invalid agent project. Either agent project doesn't exist or didn't enable multi-tenancy.
      INVALID_PROJECT_ID: "INVALID_PROJECT_ID",
      // Invalid provider ID.
      INVALID_PROVIDER_ID: "INVALID_PROVIDER_ID",
      // Invalid service account.
      INVALID_SERVICE_ACCOUNT: "INVALID_CREDENTIAL",
      // Invalid testing phone number.
      INVALID_TESTING_PHONE_NUMBER: "INVALID_TESTING_PHONE_NUMBER",
      // Invalid tenant type.
      INVALID_TENANT_TYPE: "INVALID_TENANT_TYPE",
      // Missing Android package name.
      MISSING_ANDROID_PACKAGE_NAME: "MISSING_ANDROID_PACKAGE_NAME",
      // Missing configuration.
      MISSING_CONFIG: "MISSING_CONFIG",
      // Missing configuration identifier.
      MISSING_CONFIG_ID: "MISSING_PROVIDER_ID",
      // Missing tenant display name: This can be thrown on CreateTenant and UpdateTenant.
      MISSING_DISPLAY_NAME: "MISSING_DISPLAY_NAME",
      // Email is required for the specified action. For example a multi-factor user requires
      // a verified email.
      MISSING_EMAIL: "MISSING_EMAIL",
      // Missing iOS bundle ID.
      MISSING_IOS_BUNDLE_ID: "MISSING_IOS_BUNDLE_ID",
      // Missing OIDC issuer.
      MISSING_ISSUER: "MISSING_ISSUER",
      // No localId provided (deleteAccount missing localId).
      MISSING_LOCAL_ID: "MISSING_UID",
      // OIDC configuration is missing an OAuth client ID.
      MISSING_OAUTH_CLIENT_ID: "MISSING_OAUTH_CLIENT_ID",
      // Missing provider ID.
      MISSING_PROVIDER_ID: "MISSING_PROVIDER_ID",
      // Missing SAML RP config.
      MISSING_SAML_RELYING_PARTY_CONFIG: "MISSING_SAML_RELYING_PARTY_CONFIG",
      // Empty user list in uploadAccount.
      MISSING_USER_ACCOUNT: "MISSING_UID",
      // Password auth disabled in console.
      OPERATION_NOT_ALLOWED: "OPERATION_NOT_ALLOWED",
      // Provided credential has insufficient permissions.
      PERMISSION_DENIED: "INSUFFICIENT_PERMISSION",
      // Phone number already exists.
      PHONE_NUMBER_EXISTS: "PHONE_NUMBER_ALREADY_EXISTS",
      // Project not found.
      PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND",
      // In multi-tenancy context: project creation quota exceeded.
      QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
      // Currently only 5 second factors can be set on the same user.
      SECOND_FACTOR_LIMIT_EXCEEDED: "SECOND_FACTOR_LIMIT_EXCEEDED",
      // Tenant not found.
      TENANT_NOT_FOUND: "TENANT_NOT_FOUND",
      // Tenant ID mismatch.
      TENANT_ID_MISMATCH: "MISMATCHING_TENANT_ID",
      // Token expired error.
      TOKEN_EXPIRED: "ID_TOKEN_EXPIRED",
      // Continue URL provided in ActionCodeSettings has a domain that is not whitelisted.
      UNAUTHORIZED_DOMAIN: "UNAUTHORIZED_DOMAIN",
      // A multi-factor user requires a supported first factor.
      UNSUPPORTED_FIRST_FACTOR: "UNSUPPORTED_FIRST_FACTOR",
      // The request specified an unsupported type of second factor.
      UNSUPPORTED_SECOND_FACTOR: "UNSUPPORTED_SECOND_FACTOR",
      // Operation is not supported in a multi-tenant context.
      UNSUPPORTED_TENANT_OPERATION: "UNSUPPORTED_TENANT_OPERATION",
      // A verified email is required for the specified action. For example a multi-factor user
      // requires a verified email.
      UNVERIFIED_EMAIL: "UNVERIFIED_EMAIL",
      // User on which action is to be performed is not found.
      USER_NOT_FOUND: "USER_NOT_FOUND",
      // User record is disabled.
      USER_DISABLED: "USER_DISABLED",
      // Password provided is too weak.
      WEAK_PASSWORD: "INVALID_PASSWORD",
      // Unrecognized reCAPTCHA action.
      INVALID_RECAPTCHA_ACTION: "INVALID_RECAPTCHA_ACTION",
      // Unrecognized reCAPTCHA enforcement state.
      INVALID_RECAPTCHA_ENFORCEMENT_STATE: "INVALID_RECAPTCHA_ENFORCEMENT_STATE",
      // reCAPTCHA is not enabled for account defender.
      RECAPTCHA_NOT_ENABLED: "RECAPTCHA_NOT_ENABLED"
    };
    class FirebaseAuthError extends error_1.FirebaseError {
      /**
       * Creates the developer-facing error corresponding to the backend error code.
       *
       * @param serverErrorCode - The server error code.
       * @param [message] The error message. The default message is used
       *     if not provided.
       * @param [serverError] The error's raw server response.
       * @returns The corresponding developer-facing error.
       * @internal
       */
      static fromServerError(serverErrorCode, message, serverError) {
        const colonSeparator = (serverErrorCode || "").indexOf(":");
        let customMessage = null;
        if (colonSeparator !== -1) {
          customMessage = serverErrorCode.substring(colonSeparator + 1).trim();
          serverErrorCode = serverErrorCode.substring(0, colonSeparator).trim();
        }
        const clientCodeKey = AUTH_SERVER_TO_CLIENT_CODE[serverErrorCode] || "INTERNAL_ERROR";
        const error2 = (0, deep_copy_1.deepCopy)(exports.authClientErrorCode[clientCodeKey]);
        error2.message = customMessage || message || error2.message;
        error2.cause = serverError;
        error2.httpResponse = serverError?.response ? (0, error_1.toHttpResponse)(serverError.response) : void 0;
        return new FirebaseAuthError(error2);
      }
      /**
       * @param info - The error code info.
       * @param message - The error message. This will override the default message if provided.
       */
      constructor(info, message) {
        super({
          code: `auth/${info.code}`,
          message: message || info.message,
          httpResponse: info.httpResponse,
          cause: info.cause
        });
        this.codePrefix = "auth";
      }
    }
    exports.FirebaseAuthError = FirebaseAuthError;
  })(error$2);
  return error$2;
}
var apiRequest = {};
var hasRequiredApiRequest;
function requireApiRequest() {
  if (hasRequiredApiRequest) return apiRequest;
  hasRequiredApiRequest = 1;
  Object.defineProperty(apiRequest, "__esModule", { value: true });
  apiRequest.Http2SessionHandler = apiRequest.ExponentialBackoffPoller = apiRequest.ApiSettings = apiRequest.AuthorizedHttp2Client = apiRequest.AuthorizedHttpClient = apiRequest.Http2Client = apiRequest.HttpClient = apiRequest.RequestClient = apiRequest.RequestResponseError = void 0;
  apiRequest.defaultRetryConfig = defaultRetryConfig;
  apiRequest.parseHttpResponse = parseHttpResponse;
  const error_1 = requireError$4();
  const error_2 = requireError$3();
  const validator2 = requireValidator();
  const http = require$$0$3;
  const https = require$$1$1;
  const http2 = require$$0$2;
  const events_1 = require$$0$1;
  const credential_internal_1 = requireCredentialInternal();
  const index_1 = requireUtils$1();
  class DefaultRequestResponse {
    /**
     * Constructs a new `RequestResponse` from the given `LowLevelResponse`.
     */
    constructor(resp) {
      this.status = resp.status;
      this.headers = resp.headers;
      this.text = resp.data;
      try {
        if (!resp.data) {
          throw new error_2.FirebaseAppError({ code: error_2.AppErrorCode.INTERNAL_ERROR, message: "HTTP response missing data." });
        }
        this.parsedData = JSON.parse(resp.data);
      } catch (err) {
        this.parsedData = void 0;
        this.parseError = err;
      }
    }
    get data() {
      if (this.isJson()) {
        return this.parsedData;
      }
      throw new error_2.FirebaseAppError({
        code: error_2.AppErrorCode.UNABLE_TO_PARSE_RESPONSE,
        message: "Error while parsing response data",
        cause: this.parseError,
        httpResponse: (0, error_1.toHttpResponse)(this)
      });
    }
    isJson() {
      return typeof this.parsedData !== "undefined";
    }
  }
  class MultipartRequestResponse {
    constructor(resp) {
      this.status = resp.status;
      this.headers = resp.headers;
      this.multipart = resp.multipart;
    }
    get text() {
      throw new error_2.FirebaseAppError({
        code: error_2.AppErrorCode.UNABLE_TO_PARSE_RESPONSE,
        message: "Unable to parse multipart payload as text"
      });
    }
    get data() {
      throw new error_2.FirebaseAppError({
        code: error_2.AppErrorCode.UNABLE_TO_PARSE_RESPONSE,
        message: "Unable to parse multipart payload as JSON"
      });
    }
    isJson() {
      return false;
    }
  }
  class RequestResponseError extends Error {
    constructor(response) {
      super(`Server responded with status ${response.status}.`);
      this.response = response;
      Object.setPrototypeOf(this, RequestResponseError.prototype);
    }
  }
  apiRequest.RequestResponseError = RequestResponseError;
  function defaultRetryConfig() {
    return {
      maxRetries: 4,
      statusCodes: [503],
      ioErrorCodes: ["ECONNRESET", "ETIMEDOUT"],
      backOffFactor: 0.5,
      maxDelayInMillis: 60 * 1e3
    };
  }
  function validateRetryConfig(retry) {
    if (!validator2.isNumber(retry.maxRetries) || retry.maxRetries < 0) {
      throw new error_2.FirebaseAppError({
        code: error_2.AppErrorCode.INVALID_ARGUMENT,
        message: "maxRetries must be a non-negative integer"
      });
    }
    if (typeof retry.backOffFactor !== "undefined") {
      if (!validator2.isNumber(retry.backOffFactor) || retry.backOffFactor < 0) {
        throw new error_2.FirebaseAppError({
          code: error_2.AppErrorCode.INVALID_ARGUMENT,
          message: "backOffFactor must be a non-negative number"
        });
      }
    }
    if (!validator2.isNumber(retry.maxDelayInMillis) || retry.maxDelayInMillis < 0) {
      throw new error_2.FirebaseAppError({
        code: error_2.AppErrorCode.INVALID_ARGUMENT,
        message: "maxDelayInMillis must be a non-negative integer"
      });
    }
    if (typeof retry.statusCodes !== "undefined" && !validator2.isArray(retry.statusCodes)) {
      throw new error_2.FirebaseAppError({ code: error_2.AppErrorCode.INVALID_ARGUMENT, message: "statusCodes must be an array" });
    }
    if (typeof retry.ioErrorCodes !== "undefined" && !validator2.isArray(retry.ioErrorCodes)) {
      throw new error_2.FirebaseAppError({ code: error_2.AppErrorCode.INVALID_ARGUMENT, message: "ioErrorCodes must be an array" });
    }
  }
  class RequestClient {
    constructor(retry = defaultRetryConfig()) {
      if (retry) {
        this.retry = retry;
        validateRetryConfig(this.retry);
      }
    }
    createRequestResponse(resp) {
      if (resp.multipart) {
        return new MultipartRequestResponse(resp);
      }
      return new DefaultRequestResponse(resp);
    }
    waitForRetry(delayMillis) {
      if (delayMillis > 0) {
        return new Promise((resolve) => {
          setTimeout(resolve, delayMillis);
        });
      }
      return Promise.resolve();
    }
    /**
     * Checks if a failed request is eligible for a retry, and if so returns the duration to wait before initiating
     * the retry.
     *
     * @param retryAttempts - Number of retries completed up to now.
     * @param err - The last encountered error.
     * @returns A 2-tuple where the 1st element is the duration to wait before another retry, and the
     *     2nd element is a boolean indicating whether the request is eligible for a retry or not.
     */
    getRetryDelayMillis(retryAttempts, err) {
      if (!this.isRetryEligible(retryAttempts, err)) {
        return [0, false];
      }
      const response = err.response;
      if (response && response.headers["retry-after"]) {
        const delayMillis = this.parseRetryAfterIntoMillis(response.headers["retry-after"]);
        if (delayMillis > 0) {
          return [delayMillis, true];
        }
      }
      return [this.backOffDelayMillis(retryAttempts), true];
    }
    isRetryEligible(retryAttempts, err) {
      if (!this.retry) {
        return false;
      }
      if (retryAttempts >= this.retry.maxRetries) {
        return false;
      }
      if (err.response) {
        const statusCodes = this.retry.statusCodes || [];
        return statusCodes.indexOf(err.response.status) !== -1;
      }
      if (err.code) {
        const retryCodes = this.retry.ioErrorCodes || [];
        return retryCodes.indexOf(err.code) !== -1;
      }
      return false;
    }
    /**???
     * Parses the Retry-After header as a milliseconds value. Return value is negative if the Retry-After header
     * contains an expired timestamp or otherwise malformed.
     */
    parseRetryAfterIntoMillis(retryAfter) {
      const delaySeconds = parseInt(retryAfter, 10);
      if (!isNaN(delaySeconds)) {
        return delaySeconds * 1e3;
      }
      const date = new Date(retryAfter);
      if (!isNaN(date.getTime())) {
        return date.getTime() - Date.now();
      }
      return -1;
    }
    backOffDelayMillis(retryAttempts) {
      if (retryAttempts === 0) {
        return 0;
      }
      if (!this.retry) {
        throw new error_2.FirebaseAppError({ code: error_2.AppErrorCode.INTERNAL_ERROR, message: "Expected this.retry to exist." });
      }
      const backOffFactor = this.retry.backOffFactor || 0;
      const delayInSeconds = 2 ** retryAttempts * backOffFactor;
      return Math.min(delayInSeconds * 1e3, this.retry.maxDelayInMillis);
    }
  }
  apiRequest.RequestClient = RequestClient;
  class HttpClient extends RequestClient {
    constructor(retry) {
      super(retry);
    }
    /**
     * Sends an HTTP request to a remote server. If the server responds with a successful response (2xx), the returned
     * promise resolves with an `RequestResponse`. If the server responds with an error (3xx, 4xx, 5xx), the promise
     * rejects with an `RequestResponseError`. In case of all other errors, the promise rejects with a `FirebaseAppError`.
     * If a request fails due to a low-level network error, the client transparently retries the request once before
     * rejecting the promise.
     *
     * If the request data is specified as an object, it will be serialized into a JSON string. The application/json
     * content-type header will also be automatically set in this case. For all other payload types, the content-type
     * header should be explicitly set by the caller. To send a JSON leaf value (e.g. "foo", 5), parse it into JSON,
     * and pass as a string or a Buffer along with the appropriate content-type header.
     *
     * @param config - HTTP request to be sent.
     * @returns A promise that resolves with the response details.
     */
    send(config) {
      return this.sendWithRetry(config);
    }
    /**
     * Sends an HTTP request. In the event of an error, retries the HTTP request according to the
     * `RetryConfig` set on the `HttpClient`.
     *
     * @param config - HTTP request to be sent.
     * @param retryAttempts - Number of retries performed up to now.
     * @returns A promise that resolves with the response details.
     */
    sendWithRetry(config, retryAttempts = 0) {
      return AsyncHttpCall.invoke(config).then((resp) => {
        return this.createRequestResponse(resp);
      }).catch((err) => {
        const [delayMillis, canRetry] = this.getRetryDelayMillis(retryAttempts, err);
        if (canRetry && this.retry && delayMillis <= this.retry.maxDelayInMillis) {
          return this.waitForRetry(delayMillis).then(() => {
            return this.sendWithRetry(config, retryAttempts + 1);
          });
        }
        if (err.response) {
          throw new RequestResponseError(this.createRequestResponse(err.response));
        }
        if (err.code === "ETIMEDOUT") {
          throw new error_2.FirebaseAppError({
            code: error_2.AppErrorCode.NETWORK_TIMEOUT,
            message: `Error while making request: ${err.message}.`,
            cause: err
          });
        }
        throw new error_2.FirebaseAppError({
          code: error_2.AppErrorCode.NETWORK_ERROR,
          message: `Error while making request: ${err.message}. Error code: ${err.code}`,
          cause: err
        });
      });
    }
  }
  apiRequest.HttpClient = HttpClient;
  class Http2Client extends RequestClient {
    constructor(retry = defaultRetryConfig()) {
      super(retry);
    }
    /**
     * Sends an HTTP/2 request to a remote server. If the server responds with a successful response (2xx), the returned
     * promise resolves with an `RequestResponse`. If the server responds with an error (3xx, 4xx, 5xx), the promise
     * rejects with an `RequestResponseError`. In case of all other errors, the promise rejects with a `FirebaseAppError`.
     * If a request fails due to a low-level network error, the client transparently retries the request once before
     * rejecting the promise.
     *
     * If the request data is specified as an object, it will be serialized into a JSON string. The application/json
     * content-type header will also be automatically set in this case. For all other payload types, the content-type
     * header should be explicitly set by the caller. To send a JSON leaf value (e.g. "foo", 5), parse it into JSON,
     * and pass as a string or a Buffer along with the appropriate content-type header.
     *
     * @param config - HTTP/2 request to be sent.
     * @returns A promise that resolves with the response details.
     */
    send(config) {
      return this.sendWithRetry(config);
    }
    /**
     * Sends an HTTP/2 request. In the event of an error, retries the HTTP/2 request according to the
     * `RetryConfig` set on the `Http2Client`.
     *
     * @param config - HTTP/2 request to be sent.
     * @param retryAttempts - Number of retries performed up to now.
     * @returns A promise that resolves with the response details.
     */
    sendWithRetry(config, retryAttempts = 0) {
      return AsyncHttp2Call.invoke(config).then((resp) => {
        return this.createRequestResponse(resp);
      }).catch((err) => {
        const [delayMillis, canRetry] = this.getRetryDelayMillis(retryAttempts, err);
        if (canRetry && this.retry && delayMillis <= this.retry.maxDelayInMillis) {
          return this.waitForRetry(delayMillis).then(() => {
            return this.sendWithRetry(config, retryAttempts + 1);
          });
        }
        if (err.response) {
          throw new RequestResponseError(this.createRequestResponse(err.response));
        }
        if (err.code === "ETIMEDOUT") {
          throw new error_2.FirebaseAppError({
            code: error_2.AppErrorCode.NETWORK_TIMEOUT,
            message: `Error while making request: ${err.message}.`,
            cause: err
          });
        }
        throw new error_2.FirebaseAppError({
          code: error_2.AppErrorCode.NETWORK_ERROR,
          message: `Error while making request: ${err.message}. Error code: ${err.code}`,
          cause: err
        });
      });
    }
  }
  apiRequest.Http2Client = Http2Client;
  function parseHttpResponse(response, config) {
    const responseText = validator2.isBuffer(response) ? response.toString("utf-8") : response;
    const endOfHeaderPos = responseText.indexOf("\r\n\r\n");
    const headerLines = responseText.substring(0, endOfHeaderPos).split("\r\n");
    const statusLine = headerLines[0];
    const status = statusLine.trim().split(/\s/)[1];
    const headers = {};
    headerLines.slice(1).forEach((line) => {
      const colonPos = line.indexOf(":");
      const name = line.substring(0, colonPos).trim().toLowerCase();
      const value = line.substring(colonPos + 1).trim();
      headers[name] = value;
    });
    let data = responseText.substring(endOfHeaderPos + 4);
    if (data.endsWith("\n")) {
      data = data.slice(0, -1);
    }
    if (data.endsWith("\r")) {
      data = data.slice(0, -1);
    }
    const lowLevelResponse = {
      status: parseInt(status, 10),
      headers,
      data,
      config,
      request: null
    };
    if (!validator2.isNumber(lowLevelResponse.status)) {
      throw new error_2.FirebaseAppError({ code: error_2.AppErrorCode.INTERNAL_ERROR, message: "Malformed HTTP status line." });
    }
    return new DefaultRequestResponse(lowLevelResponse);
  }
  class AsyncRequestCall {
    constructor(configImpl) {
      this.configImpl = configImpl;
    }
    /**
     * Extracts multipart boundary from the HTTP header. The content-type header of a multipart
     * response has the form 'multipart/subtype; boundary=string'.
     *
     * If the content-type header does not exist, or does not start with
     * 'multipart/', then null will be returned.
     */
    getMultipartBoundary(headers) {
      const contentType = headers["content-type"];
      if (!contentType || !contentType.startsWith("multipart/")) {
        return null;
      }
      const segments = contentType.split(";");
      const emptyObject = {};
      const headerParams = segments.slice(1).map((segment) => segment.trim().split("=")).reduce((curr, params) => {
        if (params.length === 2) {
          const keyValuePair = {};
          keyValuePair[params[0]] = params[1];
          return Object.assign(curr, keyValuePair);
        }
        return curr;
      }, emptyObject);
      return headerParams.boundary;
    }
    handleMultipartResponse(response, respStream, boundary) {
      const busboy = requireMain();
      const multipartParser = new busboy.Dicer({ boundary });
      const responseBuffer = [];
      multipartParser.on("part", (part) => {
        const tempBuffers = [];
        part.on("data", (partData) => {
          tempBuffers.push(partData);
        });
        part.on("end", () => {
          responseBuffer.push(Buffer.concat(tempBuffers));
        });
      });
      multipartParser.on("finish", () => {
        response.data = void 0;
        response.multipart = responseBuffer;
        this.finalizeResponse(response);
      });
      respStream.pipe(multipartParser);
    }
    handleRegularResponse(response, respStream) {
      const responseBuffer = [];
      respStream.on("data", (chunk) => {
        responseBuffer.push(chunk);
      });
      respStream.on("error", (err) => {
        const req = response.request;
        if (req && req.destroyed) {
          return;
        }
        this.enhanceAndReject(err, null, req);
      });
      respStream.on("end", () => {
        response.data = Buffer.concat(responseBuffer).toString();
        this.finalizeResponse(response);
      });
    }
    /**
     * Finalizes the current request call in-flight by either resolving or rejecting the associated
     * promise. In the event of an error, adds additional useful information to the returned error.
     */
    finalizeResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        this.resolve(response);
      } else {
        this.rejectWithError("Request failed with status code " + response.status, null, response.request, response);
      }
    }
    /**
     * Creates a new error from the given message, and enhances it with other information available.
     * Then the promise associated with this request call is rejected with the resulting error.
     */
    rejectWithError(message, code, request, response) {
      const error2 = new Error(message);
      this.enhanceAndReject(error2, code, request, response);
    }
    enhanceAndReject(error2, code, request, response) {
      this.reject(this.enhanceError(error2, code, request, response));
    }
    /**
     * Enhances the given error by adding more information to it. Specifically, the request config,
     * the underlying request and response will be attached to the error.
     */
    enhanceError(error2, code, request, response) {
      error2.config = this.configImpl;
      if (code) {
        error2.code = code;
      }
      error2.request = request;
      error2.response = response;
      return error2;
    }
  }
  class AsyncHttpCall extends AsyncRequestCall {
    /**
     * Sends an HTTP request based on the provided configuration.
     */
    static invoke(config) {
      return new AsyncHttpCall(config).promise;
    }
    constructor(config) {
      const httpConfigImpl = new HttpRequestConfigImpl(config);
      super(httpConfigImpl);
      try {
        this.httpConfigImpl = httpConfigImpl;
        this.options = this.httpConfigImpl.buildRequestOptions();
        if (!validator2.isNonNullObject(this.options.headers)) {
          this.options.headers = {};
        }
        this.entity = this.httpConfigImpl.buildEntity(this.options.headers);
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
          this.execute();
        });
      } catch (err) {
        this.promise = Promise.reject(this.enhanceError(err, null));
      }
    }
    execute() {
      const transport = this.options.protocol === "https:" ? https : http;
      const req = transport.request(this.options, (res) => {
        this.handleResponse(res, req);
      });
      req.on("error", (err) => {
        if (req.aborted) {
          return;
        }
        this.enhanceAndReject(err, null, req);
      });
      const timeout = this.httpConfigImpl.timeout;
      const timeoutCallback = () => {
        req.destroy();
        this.rejectWithError(`timeout of ${timeout}ms exceeded`, "ETIMEDOUT", req);
      };
      if (timeout) {
        req.setTimeout(timeout, timeoutCallback);
      }
      req.end(this.entity);
    }
    handleResponse(res, req) {
      if (req.aborted) {
        return;
      }
      if (!res.statusCode) {
        throw new error_2.FirebaseAppError({
          code: error_2.AppErrorCode.INTERNAL_ERROR,
          message: "Expected a statusCode on the response from a ClientRequest"
        });
      }
      const response = {
        status: res.statusCode,
        headers: res.headers,
        request: req,
        data: void 0,
        config: this.httpConfigImpl
      };
      const boundary = this.getMultipartBoundary(res.headers);
      const respStream = this.uncompressResponse(res);
      if (boundary) {
        this.handleMultipartResponse(response, respStream, boundary);
      } else {
        this.handleRegularResponse(response, respStream);
      }
    }
    uncompressResponse(res) {
      let respStream = res;
      const encodings = ["gzip", "compress", "deflate"];
      if (res.headers["content-encoding"] && encodings.indexOf(res.headers["content-encoding"]) !== -1) {
        const zlib$1 = zlib;
        respStream = respStream.pipe(zlib$1.createUnzip());
        delete res.headers["content-encoding"];
      }
      return respStream;
    }
  }
  class AsyncHttp2Call extends AsyncRequestCall {
    /**
     * Sends an HTTP2 request based on the provided configuration.
     */
    static invoke(config) {
      return new AsyncHttp2Call(config).promise;
    }
    constructor(config) {
      const http2ConfigImpl = new Http2RequestConfigImpl(config);
      super(http2ConfigImpl);
      try {
        this.http2ConfigImpl = http2ConfigImpl;
        this.options = this.http2ConfigImpl.buildRequestOptions();
        if (!validator2.isNonNullObject(this.options.headers)) {
          this.options.headers = {};
        }
        this.entity = this.http2ConfigImpl.buildEntity(this.options.headers);
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
          this.execute();
        });
      } catch (err) {
        this.promise = Promise.reject(this.enhanceError(err, null));
      }
    }
    execute() {
      const req = this.http2ConfigImpl.http2SessionHandler.session.request({
        ":method": this.options.method,
        ":scheme": this.options.protocol,
        ":path": this.options.path,
        ...this.options.headers
      });
      req.on("response", (headers) => {
        this.handleHttp2Response(headers, req);
      });
      req.on("error", (err) => {
        if (req.aborted) {
          return;
        }
        this.enhanceAndReject(err, null, req);
      });
      const timeout = this.http2ConfigImpl.timeout;
      const timeoutCallback = () => {
        req.destroy();
        this.rejectWithError(`timeout of ${timeout}ms exceeded`, "ETIMEDOUT", req);
      };
      if (timeout) {
        req.setTimeout(timeout, timeoutCallback);
      }
      req.end(this.entity);
    }
    handleHttp2Response(headers, stream) {
      if (stream.aborted) {
        return;
      }
      if (!headers[":status"]) {
        throw new error_2.FirebaseAppError({
          code: error_2.AppErrorCode.INTERNAL_ERROR,
          message: "Expected a statusCode on the response from a ClientRequest"
        });
      }
      const response = {
        status: headers[":status"],
        headers,
        request: stream,
        data: void 0,
        config: this.http2ConfigImpl
      };
      const boundary = this.getMultipartBoundary(headers);
      const respStream = this.uncompressResponse(headers, stream);
      if (boundary) {
        this.handleMultipartResponse(response, respStream, boundary);
      } else {
        this.handleRegularResponse(response, respStream);
      }
    }
    uncompressResponse(headers, stream) {
      let respStream = stream;
      const encodings = ["gzip", "compress", "deflate"];
      if (headers["content-encoding"] && encodings.indexOf(headers["content-encoding"]) !== -1) {
        const zlib$1 = zlib;
        respStream = respStream.pipe(zlib$1.createUnzip());
        delete headers["content-encoding"];
      }
      return respStream;
    }
  }
  class BaseRequestConfigImpl {
    constructor(config) {
      this.config = config;
      this.config = config;
    }
    get method() {
      return this.config.method;
    }
    get url() {
      return this.config.url;
    }
    get headers() {
      return this.config.headers;
    }
    get data() {
      return this.config.data;
    }
    get timeout() {
      return this.config.timeout;
    }
    buildEntity(headers) {
      let data;
      if (!this.hasEntity() || !this.isEntityEnclosingRequest()) {
        return data;
      }
      if (validator2.isBuffer(this.data)) {
        data = this.data;
      } else if (validator2.isObject(this.data)) {
        data = Buffer.from(JSON.stringify(this.data), "utf-8");
        if (typeof headers["content-type"] === "undefined") {
          headers["content-type"] = "application/json;charset=utf-8";
        }
      } else if (validator2.isString(this.data)) {
        data = Buffer.from(this.data, "utf-8");
      } else {
        throw new Error("Request data must be a string, a Buffer or a json serializable object");
      }
      headers["Content-Length"] = data.length.toString();
      return data;
    }
    buildUrl() {
      const fullUrl = this.urlWithProtocol();
      const parsedUrl = new URL(fullUrl);
      if (!this.hasEntity() || this.isEntityEnclosingRequest()) {
        return parsedUrl;
      }
      if (!validator2.isObject(this.data)) {
        throw new Error(`${this.method} requests cannot have a body`);
      }
      const dataObj = this.data;
      for (const key in dataObj) {
        if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
          parsedUrl.searchParams.append(key, dataObj[key]);
        }
      }
      return parsedUrl;
    }
    urlWithProtocol() {
      const fullUrl = this.url;
      if (fullUrl.startsWith("http://") || fullUrl.startsWith("https://")) {
        return fullUrl;
      }
      return `https://${fullUrl}`;
    }
    hasEntity() {
      return !!this.data;
    }
    isEntityEnclosingRequest() {
      return this.method !== "GET" && this.method !== "HEAD";
    }
  }
  class HttpRequestConfigImpl extends BaseRequestConfigImpl {
    constructor(httpConfig) {
      super(httpConfig);
      this.httpConfig = httpConfig;
    }
    get httpAgent() {
      return this.httpConfig.httpAgent;
    }
    buildRequestOptions() {
      const parsed = this.buildUrl();
      const protocol = parsed.protocol;
      let port = parsed.port;
      if (!port) {
        const isHttps = protocol === "https:";
        port = isHttps ? "443" : "80";
      }
      return {
        protocol,
        hostname: parsed.hostname,
        port,
        path: `${parsed.pathname}${parsed.search}`,
        method: this.method,
        agent: this.httpAgent,
        headers: Object.assign({}, this.headers)
      };
    }
  }
  class Http2RequestConfigImpl extends BaseRequestConfigImpl {
    constructor(http2Config) {
      super(http2Config);
      this.http2Config = http2Config;
    }
    get http2SessionHandler() {
      return this.http2Config.http2SessionHandler;
    }
    buildRequestOptions() {
      const parsed = this.buildUrl();
      const protocol = parsed.protocol;
      return {
        protocol,
        path: `${parsed.pathname}${parsed.search}`,
        method: this.method,
        headers: Object.assign({}, this.headers)
      };
    }
  }
  class AuthorizedHttpClient extends HttpClient {
    constructor(app2) {
      super();
      this.app = app2;
    }
    send(request) {
      return this.getToken().then((token) => {
        const requestCopy = Object.assign({}, request);
        requestCopy.headers = Object.assign({}, request.headers);
        const authHeader = "Authorization";
        requestCopy.headers[authHeader] = `Bearer ${token}`;
        let quotaProjectId;
        if (this.app.options.credential instanceof credential_internal_1.ApplicationDefaultCredential) {
          quotaProjectId = this.app.options.credential.getQuotaProjectId();
        }
        quotaProjectId = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || quotaProjectId;
        if (!requestCopy.headers["x-goog-user-project"] && validator2.isNonEmptyString(quotaProjectId)) {
          requestCopy.headers["x-goog-user-project"] = quotaProjectId;
        }
        if (!requestCopy.httpAgent && this.app.options.httpAgent) {
          requestCopy.httpAgent = this.app.options.httpAgent;
        }
        if (!requestCopy.headers["X-Goog-Api-Client"]) {
          requestCopy.headers["X-Goog-Api-Client"] = (0, index_1.getMetricsHeader)();
        }
        return super.send(requestCopy);
      });
    }
    getToken() {
      return this.app.INTERNAL.getToken().then((accessTokenObj) => accessTokenObj.accessToken);
    }
  }
  apiRequest.AuthorizedHttpClient = AuthorizedHttpClient;
  class AuthorizedHttp2Client extends Http2Client {
    constructor(app2) {
      super();
      this.app = app2;
    }
    send(request) {
      return this.getToken().then((token) => {
        const requestCopy = Object.assign({}, request);
        requestCopy.headers = Object.assign({}, request.headers);
        const authHeader = "Authorization";
        requestCopy.headers[authHeader] = `Bearer ${token}`;
        let quotaProjectId;
        if (this.app.options.credential instanceof credential_internal_1.ApplicationDefaultCredential) {
          quotaProjectId = this.app.options.credential.getQuotaProjectId();
        }
        quotaProjectId = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || quotaProjectId;
        if (!requestCopy.headers["x-goog-user-project"] && validator2.isNonEmptyString(quotaProjectId)) {
          requestCopy.headers["x-goog-user-project"] = quotaProjectId;
        }
        if (!requestCopy.headers["X-Goog-Api-Client"]) {
          requestCopy.headers["X-Goog-Api-Client"] = (0, index_1.getMetricsHeader)();
        }
        return super.send(requestCopy);
      });
    }
    getToken() {
      return this.app.INTERNAL.getToken().then((accessTokenObj) => accessTokenObj.accessToken);
    }
  }
  apiRequest.AuthorizedHttp2Client = AuthorizedHttp2Client;
  class ApiSettings {
    constructor(endpoint, httpMethod = "POST") {
      this.endpoint = endpoint;
      this.httpMethod = httpMethod;
      this.setRequestValidator(null).setResponseValidator(null);
    }
    /** @returns The backend API endpoint. */
    getEndpoint() {
      return this.endpoint;
    }
    /** @returns The request HTTP method. */
    getHttpMethod() {
      return this.httpMethod;
    }
    /**
     * @param requestValidator - The request validator.
     * @returns The current API settings instance.
     */
    setRequestValidator(requestValidator) {
      const nullFunction = () => void 0;
      this.requestValidator = requestValidator || nullFunction;
      return this;
    }
    /** @returns The request validator. */
    getRequestValidator() {
      return this.requestValidator;
    }
    /**
     * @param responseValidator - The response validator.
     * @returns The current API settings instance.
     */
    setResponseValidator(responseValidator) {
      const nullFunction = () => void 0;
      this.responseValidator = responseValidator || nullFunction;
      return this;
    }
    /** @returns The response validator. */
    getResponseValidator() {
      return this.responseValidator;
    }
  }
  apiRequest.ApiSettings = ApiSettings;
  class ExponentialBackoffPoller extends events_1.EventEmitter {
    constructor(initialPollingDelayMillis = 1e3, maxPollingDelayMillis = 1e4, masterTimeoutMillis = 6e4) {
      super();
      this.initialPollingDelayMillis = initialPollingDelayMillis;
      this.maxPollingDelayMillis = maxPollingDelayMillis;
      this.masterTimeoutMillis = masterTimeoutMillis;
      this.numTries = 0;
      this.completed = false;
    }
    /**
     * Poll the provided callback with exponential backoff.
     *
     * @param callback - The callback to be called for each poll. If the
     *     callback resolves to a falsey value, polling will continue. Otherwise, the truthy
     *     resolution will be used to resolve the promise returned by this method.
     * @returns A Promise which resolves to the truthy value returned by the provided
     *     callback when polling is complete.
     */
    poll(callback) {
      if (this.pollCallback) {
        throw new Error("poll() can only be called once per instance of ExponentialBackoffPoller");
      }
      this.pollCallback = callback;
      this.on("poll", this.repoll);
      this.masterTimer = setTimeout(() => {
        if (this.completed) {
          return;
        }
        this.markCompleted();
        this.reject(new Error("ExponentialBackoffPoller deadline exceeded - Master timeout reached"));
      }, this.masterTimeoutMillis);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
        this.repoll();
      });
    }
    repoll() {
      this.pollCallback().then((result) => {
        if (this.completed) {
          return;
        }
        if (!result) {
          this.repollTimer = setTimeout(() => this.emit("poll"), this.getPollingDelayMillis());
          this.numTries++;
          return;
        }
        this.markCompleted();
        this.resolve(result);
      }).catch((err) => {
        if (this.completed) {
          return;
        }
        this.markCompleted();
        this.reject(err);
      });
    }
    getPollingDelayMillis() {
      const increasedPollingDelay = Math.pow(2, this.numTries) * this.initialPollingDelayMillis;
      return Math.min(increasedPollingDelay, this.maxPollingDelayMillis);
    }
    markCompleted() {
      this.completed = true;
      if (this.masterTimer) {
        clearTimeout(this.masterTimer);
      }
      if (this.repollTimer) {
        clearTimeout(this.repollTimer);
      }
    }
  }
  apiRequest.ExponentialBackoffPoller = ExponentialBackoffPoller;
  class Http2SessionHandler {
    constructor(url) {
      this.sessionErrors = [];
      this.createSession(url);
    }
    createSession(url) {
      if (!this.http2Session || this.isCurrentSessionClosed) {
        this.sessionErrors = [];
        const opts = {
          // Set local max concurrent stream limit to respect backend limit
          peerMaxConcurrentStreams: 100,
          ALPNProtocols: ["h2"]
        };
        this.http2Session = http2.connect(url, opts);
        this.http2Session.on("goaway", (errorCode, _, opaqueData) => {
          const error2 = new error_2.FirebaseAppError({
            code: error_2.AppErrorCode.NETWORK_ERROR,
            message: `Error while making requests: GOAWAY - ${opaqueData?.toString()}, Error code: ${errorCode}`
          });
          this.sessionErrors.push(error2);
        });
        this.http2Session.on("error", (error2) => {
          const codePart = error2?.code ? `${error2.code} - ` : "";
          let errorMessage;
          if ((error2 instanceof AggregateError || error2?.name === "AggregateError") && Array.isArray(error2.errors)) {
            errorMessage = `Session error while making requests: ${codePart}${error2.name}: [${error2.errors.map((e) => e.message).join(", ")}]`;
          } else {
            errorMessage = `Session error while making requests: ${codePart}${error2?.message || "Unknown error"}`;
          }
          const appError = new error_2.FirebaseAppError({
            code: error_2.AppErrorCode.NETWORK_ERROR,
            message: errorMessage,
            cause: error2
          });
          this.sessionErrors.push(appError);
        });
      }
      return this.http2Session;
    }
    getErrors() {
      return this.sessionErrors;
    }
    get session() {
      return this.http2Session;
    }
    get isCurrentSessionClosed() {
      return !!this.http2Session?.closed;
    }
    close() {
      this.http2Session?.close();
    }
  }
  apiRequest.Http2SessionHandler = Http2SessionHandler;
  return apiRequest;
}
var userImportBuilder = {};
var hasRequiredUserImportBuilder;
function requireUserImportBuilder() {
  if (hasRequiredUserImportBuilder) return userImportBuilder;
  hasRequiredUserImportBuilder = 1;
  Object.defineProperty(userImportBuilder, "__esModule", { value: true });
  userImportBuilder.UserImportBuilder = void 0;
  userImportBuilder.convertMultiFactorInfoToServerFormat = convertMultiFactorInfoToServerFormat;
  const deep_copy_1 = requireDeepCopy();
  const utils2 = requireUtils$1();
  const validator2 = requireValidator();
  const error_1 = requireError$2();
  function convertMultiFactorInfoToServerFormat(multiFactorInfo) {
    let enrolledAt;
    if (typeof multiFactorInfo.enrollmentTime !== "undefined") {
      if (validator2.isUTCDateString(multiFactorInfo.enrollmentTime)) {
        enrolledAt = new Date(multiFactorInfo.enrollmentTime).toISOString();
      } else {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ENROLLMENT_TIME, `The second factor "enrollmentTime" for "${multiFactorInfo.uid}" must be a valid UTC date string.`);
      }
    }
    if (isPhoneFactor(multiFactorInfo)) {
      const authFactorInfo = {
        mfaEnrollmentId: multiFactorInfo.uid,
        displayName: multiFactorInfo.displayName,
        // Required for all phone second factors.
        phoneInfo: multiFactorInfo.phoneNumber,
        enrolledAt
      };
      for (const objKey in authFactorInfo) {
        if (typeof authFactorInfo[objKey] === "undefined") {
          delete authFactorInfo[objKey];
        }
      }
      return authFactorInfo;
    } else {
      throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.UNSUPPORTED_SECOND_FACTOR, `Unsupported second factor "${JSON.stringify(multiFactorInfo)}" provided.`);
    }
  }
  function isPhoneFactor(multiFactorInfo) {
    return multiFactorInfo.factorId === "phone";
  }
  function getNumberField(obj, key) {
    if (typeof obj[key] !== "undefined" && obj[key] !== null) {
      return parseInt(obj[key].toString(), 10);
    }
    return NaN;
  }
  function populateUploadAccountUser(user, userValidator) {
    const result = {
      localId: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      disabled: user.disabled,
      photoUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerUserInfo: [],
      mfaInfo: [],
      tenantId: user.tenantId,
      customAttributes: user.customClaims && JSON.stringify(user.customClaims)
    };
    if (typeof user.passwordHash !== "undefined") {
      if (!validator2.isBuffer(user.passwordHash)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD_HASH);
      }
      result.passwordHash = utils2.toWebSafeBase64(user.passwordHash);
    }
    if (typeof user.passwordSalt !== "undefined") {
      if (!validator2.isBuffer(user.passwordSalt)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD_SALT);
      }
      result.salt = utils2.toWebSafeBase64(user.passwordSalt);
    }
    if (validator2.isNonNullObject(user.metadata)) {
      if (validator2.isNonEmptyString(user.metadata.creationTime)) {
        result.createdAt = new Date(user.metadata.creationTime).getTime();
      }
      if (validator2.isNonEmptyString(user.metadata.lastSignInTime)) {
        result.lastLoginAt = new Date(user.metadata.lastSignInTime).getTime();
      }
    }
    if (validator2.isArray(user.providerData)) {
      user.providerData.forEach((providerData) => {
        result.providerUserInfo.push({
          providerId: providerData.providerId,
          rawId: providerData.uid,
          email: providerData.email,
          displayName: providerData.displayName,
          photoUrl: providerData.photoURL
        });
      });
    }
    if (validator2.isNonNullObject(user.multiFactor) && validator2.isNonEmptyArray(user.multiFactor.enrolledFactors)) {
      user.multiFactor.enrolledFactors.forEach((multiFactorInfo) => {
        result.mfaInfo.push(convertMultiFactorInfoToServerFormat(multiFactorInfo));
      });
    }
    let key;
    for (key in result) {
      if (typeof result[key] === "undefined") {
        delete result[key];
      }
    }
    if (result.providerUserInfo.length === 0) {
      delete result.providerUserInfo;
    }
    if (result.mfaInfo.length === 0) {
      delete result.mfaInfo;
    }
    if (typeof userValidator === "function") {
      userValidator(result);
    }
    return result;
  }
  class UserImportBuilder {
    /**
     * @param {UserImportRecord[]} users The list of user records to import.
     * @param {UserImportOptions=} options The import options which includes hashing
     *     algorithm details.
     * @param {ValidatorFunction=} userRequestValidator The user request validator function.
     * @constructor
     */
    constructor(users, options, userRequestValidator) {
      this.requiresHashOptions = false;
      this.validatedUsers = [];
      this.userImportResultErrors = [];
      this.indexMap = {};
      this.validatedUsers = this.populateUsers(users, userRequestValidator);
      this.validatedOptions = this.populateOptions(options, this.requiresHashOptions);
    }
    /**
     * Returns the corresponding constructed uploadAccount request.
     * @returns {UploadAccountRequest} The constructed uploadAccount request.
     */
    buildRequest() {
      const users = this.validatedUsers.map((user) => {
        return (0, deep_copy_1.deepCopy)(user);
      });
      return (0, deep_copy_1.deepExtend)({ users }, (0, deep_copy_1.deepCopy)(this.validatedOptions));
    }
    /**
     * Populates the UserImportResult using the client side detected errors and the server
     * side returned errors.
     * @returns {UserImportResult} The user import result based on the returned failed
     *     uploadAccount response.
     */
    buildResponse(failedUploads) {
      const importResult = {
        successCount: this.validatedUsers.length,
        failureCount: this.userImportResultErrors.length,
        errors: (0, deep_copy_1.deepCopy)(this.userImportResultErrors)
      };
      importResult.failureCount += failedUploads.length;
      importResult.successCount -= failedUploads.length;
      failedUploads.forEach((failedUpload) => {
        importResult.errors.push({
          // Map backend request index to original developer provided array index.
          index: this.indexMap[failedUpload.index],
          error: new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_USER_IMPORT, failedUpload.message)
        });
      });
      importResult.errors.sort((a, b) => {
        return a.index - b.index;
      });
      return importResult;
    }
    /**
     * Validates and returns the hashing options of the uploadAccount request.
     * Throws an error whenever an invalid or missing options is detected.
     * @param {UserImportOptions} options The UserImportOptions.
     * @param {boolean} requiresHashOptions Whether to require hash options.
     * @returns {UploadAccountOptions} The populated UploadAccount options.
     */
    populateOptions(options, requiresHashOptions) {
      let populatedOptions;
      if (!requiresHashOptions) {
        return {};
      }
      if (!validator2.isNonNullObject(options)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"UserImportOptions" are required when importing users with passwords.');
      }
      if (!validator2.isNonNullObject(options.hash)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISSING_HASH_ALGORITHM, '"hash.algorithm" is missing from the provided "UserImportOptions".');
      }
      if (typeof options.hash.algorithm === "undefined" || !validator2.isNonEmptyString(options.hash.algorithm)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_ALGORITHM, '"hash.algorithm" must be a string matching the list of supported algorithms.');
      }
      let rounds;
      switch (options.hash.algorithm) {
        case "HMAC_SHA512":
        case "HMAC_SHA256":
        case "HMAC_SHA1":
        case "HMAC_MD5":
          if (!validator2.isBuffer(options.hash.key)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_KEY, `A non-empty "hash.key" byte buffer must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm,
            signerKey: utils2.toWebSafeBase64(options.hash.key)
          };
          break;
        case "MD5":
        case "SHA1":
        case "SHA256":
        case "SHA512": {
          rounds = getNumberField(options.hash, "rounds");
          const minRounds = options.hash.algorithm === "MD5" ? 0 : 1;
          if (isNaN(rounds) || rounds < minRounds || rounds > 8192) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_ROUNDS, `A valid "hash.rounds" number between ${minRounds} and 8192 must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm,
            rounds
          };
          break;
        }
        case "PBKDF_SHA1":
        case "PBKDF2_SHA256":
          rounds = getNumberField(options.hash, "rounds");
          if (isNaN(rounds) || rounds < 0 || rounds > 12e4) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_ROUNDS, `A valid "hash.rounds" number between 0 and 120000 must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm,
            rounds
          };
          break;
        case "SCRYPT": {
          if (!validator2.isBuffer(options.hash.key)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_KEY, `A "hash.key" byte buffer must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          rounds = getNumberField(options.hash, "rounds");
          if (isNaN(rounds) || rounds <= 0 || rounds > 8) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_ROUNDS, `A valid "hash.rounds" number between 1 and 8 must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          const memoryCost = getNumberField(options.hash, "memoryCost");
          if (isNaN(memoryCost) || memoryCost <= 0 || memoryCost > 14) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_MEMORY_COST, `A valid "hash.memoryCost" number between 1 and 14 must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          if (typeof options.hash.saltSeparator !== "undefined" && !validator2.isBuffer(options.hash.saltSeparator)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_SALT_SEPARATOR, '"hash.saltSeparator" must be a byte buffer.');
          }
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm,
            signerKey: utils2.toWebSafeBase64(options.hash.key),
            rounds,
            memoryCost,
            saltSeparator: utils2.toWebSafeBase64(options.hash.saltSeparator || Buffer.from(""))
          };
          break;
        }
        case "BCRYPT":
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm
          };
          break;
        case "STANDARD_SCRYPT": {
          const cpuMemCost = getNumberField(options.hash, "memoryCost");
          if (isNaN(cpuMemCost)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_MEMORY_COST, `A valid "hash.memoryCost" number must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          const parallelization = getNumberField(options.hash, "parallelization");
          if (isNaN(parallelization)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_PARALLELIZATION, `A valid "hash.parallelization" number must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          const blockSize = getNumberField(options.hash, "blockSize");
          if (isNaN(blockSize)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_BLOCK_SIZE, `A valid "hash.blockSize" number must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          const dkLen = getNumberField(options.hash, "derivedKeyLength");
          if (isNaN(dkLen)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_DERIVED_KEY_LENGTH, `A valid "hash.derivedKeyLength" number must be provided for hash algorithm ${options.hash.algorithm}.`);
          }
          populatedOptions = {
            hashAlgorithm: options.hash.algorithm,
            cpuMemCost,
            parallelization,
            blockSize,
            dkLen
          };
          break;
        }
        default:
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HASH_ALGORITHM, `Unsupported hash algorithm provider "${options.hash.algorithm}".`);
      }
      return populatedOptions;
    }
    /**
     * Validates and returns the users list of the uploadAccount request.
     * Whenever a user with an error is detected, the error is cached and will later be
     * merged into the user import result. This allows the processing of valid users without
     * failing early on the first error detected.
     * @param {UserImportRecord[]} users The UserImportRecords to convert to UnploadAccountUser
     *     objects.
     * @param {ValidatorFunction=} userValidator The user validator function.
     * @returns {UploadAccountUser[]} The populated uploadAccount users.
     */
    populateUsers(users, userValidator) {
      const populatedUsers = [];
      users.forEach((user, index) => {
        try {
          const result = populateUploadAccountUser(user, userValidator);
          if (typeof result.passwordHash !== "undefined") {
            this.requiresHashOptions = true;
          }
          populatedUsers.push(result);
          this.indexMap[populatedUsers.length - 1] = index;
        } catch (error2) {
          this.userImportResultErrors.push({
            index,
            error: error2
          });
        }
      });
      return populatedUsers;
    }
  }
  userImportBuilder.UserImportBuilder = UserImportBuilder;
  return userImportBuilder;
}
var actionCodeSettingsBuilder = {};
var hasRequiredActionCodeSettingsBuilder;
function requireActionCodeSettingsBuilder() {
  if (hasRequiredActionCodeSettingsBuilder) return actionCodeSettingsBuilder;
  hasRequiredActionCodeSettingsBuilder = 1;
  Object.defineProperty(actionCodeSettingsBuilder, "__esModule", { value: true });
  actionCodeSettingsBuilder.ActionCodeSettingsBuilder = void 0;
  const validator2 = requireValidator();
  const error_1 = requireError$2();
  class ActionCodeSettingsBuilder {
    /**
     * ActionCodeSettingsBuilder constructor.
     *
     * @param {ActionCodeSettings} actionCodeSettings The ActionCodeSettings
     *     object used to initiliaze this server request builder.
     * @constructor
     */
    constructor(actionCodeSettings) {
      if (!validator2.isNonNullObject(actionCodeSettings)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings" must be a non-null object.');
      }
      if (typeof actionCodeSettings.url === "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISSING_CONTINUE_URI);
      } else if (!validator2.isURL(actionCodeSettings.url)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONTINUE_URI);
      }
      this.continueUrl = actionCodeSettings.url;
      if (typeof actionCodeSettings.handleCodeInApp !== "undefined" && !validator2.isBoolean(actionCodeSettings.handleCodeInApp)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.handleCodeInApp" must be a boolean.');
      }
      this.canHandleCodeInApp = actionCodeSettings.handleCodeInApp || false;
      if (typeof actionCodeSettings.dynamicLinkDomain !== "undefined" && !validator2.isNonEmptyString(actionCodeSettings.dynamicLinkDomain)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DYNAMIC_LINK_DOMAIN);
      }
      this.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
      if (typeof actionCodeSettings.linkDomain !== "undefined" && !validator2.isNonEmptyString(actionCodeSettings.linkDomain)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_HOSTING_LINK_DOMAIN);
      }
      this.linkDomain = actionCodeSettings.linkDomain;
      if (typeof actionCodeSettings.iOS !== "undefined") {
        if (!validator2.isNonNullObject(actionCodeSettings.iOS)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.iOS" must be a valid non-null object.');
        } else if (typeof actionCodeSettings.iOS.bundleId === "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISSING_IOS_BUNDLE_ID);
        } else if (!validator2.isNonEmptyString(actionCodeSettings.iOS.bundleId)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.iOS.bundleId" must be a valid non-empty string.');
        }
        this.ibi = actionCodeSettings.iOS.bundleId;
      }
      if (typeof actionCodeSettings.android !== "undefined") {
        if (!validator2.isNonNullObject(actionCodeSettings.android)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.android" must be a valid non-null object.');
        } else if (typeof actionCodeSettings.android.packageName === "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISSING_ANDROID_PACKAGE_NAME);
        } else if (!validator2.isNonEmptyString(actionCodeSettings.android.packageName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.android.packageName" must be a valid non-empty string.');
        } else if (typeof actionCodeSettings.android.minimumVersion !== "undefined" && !validator2.isNonEmptyString(actionCodeSettings.android.minimumVersion)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.android.minimumVersion" must be a valid non-empty string.');
        } else if (typeof actionCodeSettings.android.installApp !== "undefined" && !validator2.isBoolean(actionCodeSettings.android.installApp)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"ActionCodeSettings.android.installApp" must be a valid boolean.');
        }
        this.apn = actionCodeSettings.android.packageName;
        this.amv = actionCodeSettings.android.minimumVersion;
        this.installApp = actionCodeSettings.android.installApp || false;
      }
    }
    /**
     * Returns the corresponding constructed server request corresponding to the
     * current ActionCodeSettings.
     *
     * @returns The constructed EmailActionCodeRequest request.
     */
    buildRequest() {
      const request = {
        continueUrl: this.continueUrl,
        canHandleCodeInApp: this.canHandleCodeInApp,
        dynamicLinkDomain: this.dynamicLinkDomain,
        linkDomain: this.linkDomain,
        androidPackageName: this.apn,
        androidMinimumVersion: this.amv,
        androidInstallApp: this.installApp,
        iOSBundleId: this.ibi
      };
      for (const key in request) {
        if (Object.prototype.hasOwnProperty.call(request, key)) {
          if (typeof request[key] === "undefined" || request[key] === null) {
            delete request[key];
          }
        }
      }
      return request;
    }
  }
  actionCodeSettingsBuilder.ActionCodeSettingsBuilder = ActionCodeSettingsBuilder;
  return actionCodeSettingsBuilder;
}
var tenant = {};
var authConfig = {};
var hasRequiredAuthConfig;
function requireAuthConfig() {
  if (hasRequiredAuthConfig) return authConfig;
  hasRequiredAuthConfig = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EmailPrivacyAuthConfig = exports.PasswordPolicyAuthConfig = exports.MobileLinksAuthConfig = exports.RecaptchaAuthConfig = exports.SmsRegionsAuthConfig = exports.OIDCConfig = exports.SAMLConfig = exports.EmailSignInConfig = exports.MultiFactorAuthConfig = exports.MAXIMUM_TEST_PHONE_NUMBERS = void 0;
    exports.validateTestPhoneNumbers = validateTestPhoneNumbers;
    const validator2 = requireValidator();
    const deep_copy_1 = requireDeepCopy();
    const error_1 = requireError$2();
    exports.MAXIMUM_TEST_PHONE_NUMBERS = 10;
    const AUTH_FACTOR_CLIENT_TO_SERVER_TYPE = {
      phone: "PHONE_SMS"
    };
    const AUTH_FACTOR_SERVER_TO_CLIENT_TYPE = Object.keys(AUTH_FACTOR_CLIENT_TO_SERVER_TYPE).reduce((res, key) => {
      res[AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[key]] = key;
      return res;
    }, {});
    class MultiFactorAuthConfig {
      /**
       * Static method to convert a client side request to a MultiFactorAuthServerConfig.
       * Throws an error if validation fails.
       *
       * @param options - The options object to convert to a server request.
       * @returns The resulting server request.
       * @internal
       */
      static buildServerRequest(options) {
        const request = {};
        MultiFactorAuthConfig.validate(options);
        if (Object.prototype.hasOwnProperty.call(options, "state")) {
          request.state = options.state;
        }
        if (Object.prototype.hasOwnProperty.call(options, "factorIds")) {
          (options.factorIds || []).forEach((factorId) => {
            if (typeof request.enabledProviders === "undefined") {
              request.enabledProviders = [];
            }
            request.enabledProviders.push(AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[factorId]);
          });
          if (options.factorIds && options.factorIds.length === 0) {
            request.enabledProviders = [];
          }
        }
        if (Object.prototype.hasOwnProperty.call(options, "providerConfigs")) {
          request.providerConfigs = options.providerConfigs;
        }
        return request;
      }
      /**
       * Validates the MultiFactorConfig options object. Throws an error on failure.
       *
       * @param options - The options object to validate.
       */
      static validate(options) {
        const validKeys = {
          state: true,
          factorIds: true,
          providerConfigs: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid MultiFactorConfig parameter.`);
          }
        }
        if (typeof options.state !== "undefined" && options.state !== "ENABLED" && options.state !== "DISABLED") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.state" must be either "ENABLED" or "DISABLED".');
        }
        if (typeof options.factorIds !== "undefined") {
          if (!validator2.isArray(options.factorIds)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.factorIds" must be an array of valid "AuthFactorTypes".');
          }
          options.factorIds.forEach((factorId) => {
            if (typeof AUTH_FACTOR_CLIENT_TO_SERVER_TYPE[factorId] === "undefined") {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${factorId}" is not a valid "AuthFactorType".`);
            }
          });
        }
        if (typeof options.providerConfigs !== "undefined") {
          if (!validator2.isArray(options.providerConfigs)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.providerConfigs" must be an array of valid "MultiFactorProviderConfig."');
          }
          options.providerConfigs.forEach((multiFactorProviderConfig) => {
            if (typeof multiFactorProviderConfig === "undefined" || !validator2.isObject(multiFactorProviderConfig)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${multiFactorProviderConfig}" is not a valid "MultiFactorProviderConfig" type.`);
            }
            const validProviderConfigKeys = {
              state: true,
              totpProviderConfig: true
            };
            for (const key in multiFactorProviderConfig) {
              if (!(key in validProviderConfigKeys)) {
                throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid ProviderConfig parameter.`);
              }
            }
            if (typeof multiFactorProviderConfig.state === "undefined" || multiFactorProviderConfig.state !== "ENABLED" && multiFactorProviderConfig.state !== "DISABLED") {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.providerConfigs.state" must be either "ENABLED" or "DISABLED".');
            }
            if (typeof multiFactorProviderConfig.totpProviderConfig === "undefined") {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MultiFactorConfig.providerConfigs.totpProviderConfig" must be defined.');
            }
            const validTotpProviderConfigKeys = {
              adjacentIntervals: true
            };
            for (const key in multiFactorProviderConfig.totpProviderConfig) {
              if (!(key in validTotpProviderConfigKeys)) {
                throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid TotpProviderConfig parameter.`);
              }
            }
            const adjIntervals = multiFactorProviderConfig.totpProviderConfig.adjacentIntervals;
            if (typeof adjIntervals !== "undefined" && (!Number.isInteger(adjIntervals) || adjIntervals < 0 || adjIntervals > 10)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"MultiFactorConfig.providerConfigs.totpProviderConfig.adjacentIntervals" must be a valid number between 0 and 10 (both inclusive).');
            }
          });
        }
      }
      /**
       * The MultiFactorAuthConfig constructor.
       *
       * @param response - The server side response used to initialize the
       *     MultiFactorAuthConfig object.
       * @constructor
       * @internal
       */
      constructor(response) {
        if (typeof response.state === "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid multi-factor configuration response");
        }
        this.state = response.state;
        this.factorIds = [];
        (response.enabledProviders || []).forEach((enabledProvider) => {
          if (typeof AUTH_FACTOR_SERVER_TO_CLIENT_TYPE[enabledProvider] !== "undefined") {
            this.factorIds.push(AUTH_FACTOR_SERVER_TO_CLIENT_TYPE[enabledProvider]);
          }
        });
        this.providerConfigs = [];
        (response.providerConfigs || []).forEach((providerConfig) => {
          if (typeof providerConfig !== "undefined") {
            if (typeof providerConfig.state === "undefined" || typeof providerConfig.totpProviderConfig === "undefined" || typeof providerConfig.totpProviderConfig.adjacentIntervals !== "undefined" && typeof providerConfig.totpProviderConfig.adjacentIntervals !== "number") {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid multi-factor configuration response");
            }
            this.providerConfigs.push(providerConfig);
          }
        });
      }
      /** Converts MultiFactorConfig to JSON object
       * @returns The plain object representation of the multi-factor config instance. */
      toJSON() {
        return {
          state: this.state,
          factorIds: this.factorIds,
          providerConfigs: this.providerConfigs
        };
      }
    }
    exports.MultiFactorAuthConfig = MultiFactorAuthConfig;
    function validateTestPhoneNumbers(testPhoneNumbers) {
      if (!validator2.isObject(testPhoneNumbers)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"testPhoneNumbers" must be a map of phone number / code pairs.');
      }
      if (Object.keys(testPhoneNumbers).length > exports.MAXIMUM_TEST_PHONE_NUMBERS) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MAXIMUM_TEST_PHONE_NUMBER_EXCEEDED);
      }
      for (const phoneNumber in testPhoneNumbers) {
        if (!validator2.isPhoneNumber(phoneNumber)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TESTING_PHONE_NUMBER, `"${phoneNumber}" is not a valid E.164 standard compliant phone number.`);
        }
        if (!validator2.isString(testPhoneNumbers[phoneNumber]) || !/^[\d]{6}$/.test(testPhoneNumbers[phoneNumber])) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TESTING_PHONE_NUMBER, `"${testPhoneNumbers[phoneNumber]}" is not a valid 6 digit code string.`);
        }
      }
    }
    class EmailSignInConfig {
      /**
       * Static method to convert a client side request to a EmailSignInConfigServerRequest.
       * Throws an error if validation fails.
       *
       * @param options - The options object to convert to a server request.
       * @returns The resulting server request.
       * @internal
       */
      static buildServerRequest(options) {
        const request = {};
        EmailSignInConfig.validate(options);
        if (Object.prototype.hasOwnProperty.call(options, "enabled")) {
          request.allowPasswordSignup = options.enabled;
        }
        if (Object.prototype.hasOwnProperty.call(options, "passwordRequired")) {
          request.enableEmailLinkSignin = !options.passwordRequired;
        }
        return request;
      }
      /**
       * Validates the EmailSignInConfig options object. Throws an error on failure.
       *
       * @param options - The options object to validate.
       */
      static validate(options) {
        const validKeys = {
          enabled: true,
          passwordRequired: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${key}" is not a valid EmailSignInConfig parameter.`);
          }
        }
        if (typeof options.enabled !== "undefined" && !validator2.isBoolean(options.enabled)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig.enabled" must be a boolean.');
        }
        if (typeof options.passwordRequired !== "undefined" && !validator2.isBoolean(options.passwordRequired)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"EmailSignInConfig.passwordRequired" must be a boolean.');
        }
      }
      /**
       * The EmailSignInConfig constructor.
       *
       * @param response - The server side response used to initialize the
       *     EmailSignInConfig object.
       * @constructor
       */
      constructor(response) {
        if (typeof response.allowPasswordSignup === "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid email sign-in configuration response");
        }
        this.enabled = response.allowPasswordSignup;
        this.passwordRequired = !response.enableEmailLinkSignin;
      }
      /** @returns The plain object representation of the email sign-in config. */
      toJSON() {
        return {
          enabled: this.enabled,
          passwordRequired: this.passwordRequired
        };
      }
    }
    exports.EmailSignInConfig = EmailSignInConfig;
    class SAMLConfig {
      /**
       * Converts a client side request to a SAMLConfigServerRequest which is the format
       * accepted by the backend server.
       * Throws an error if validation fails. If the request is not a SAMLConfig request,
       * returns null.
       *
       * @param options - The options object to convert to a server request.
       * @param ignoreMissingFields - Whether to ignore missing fields.
       * @returns The resulting server request or null if not valid.
       */
      static buildServerRequest(options, ignoreMissingFields = false) {
        const makeRequest = validator2.isNonNullObject(options) && (options.providerId || ignoreMissingFields);
        if (!makeRequest) {
          return null;
        }
        const request = {};
        SAMLConfig.validate(options, ignoreMissingFields);
        request.enabled = options.enabled;
        request.displayName = options.displayName;
        if (options.idpEntityId || options.ssoURL || options.x509Certificates) {
          request.idpConfig = {
            idpEntityId: options.idpEntityId,
            ssoUrl: options.ssoURL,
            signRequest: options.enableRequestSigning,
            idpCertificates: typeof options.x509Certificates === "undefined" ? void 0 : []
          };
          if (options.x509Certificates) {
            for (const cert2 of options.x509Certificates || []) {
              request.idpConfig.idpCertificates.push({ x509Certificate: cert2 });
            }
          }
        }
        if (options.callbackURL || options.rpEntityId) {
          request.spConfig = {
            spEntityId: options.rpEntityId,
            callbackUri: options.callbackURL
          };
        }
        return request;
      }
      /**
       * Returns the provider ID corresponding to the resource name if available.
       *
       * @param resourceName - The server side resource name.
       * @returns The provider ID corresponding to the resource, null otherwise.
       */
      static getProviderIdFromResourceName(resourceName) {
        const matchProviderRes = resourceName.match(/\/inboundSamlConfigs\/(saml\..*)$/);
        if (!matchProviderRes || matchProviderRes.length < 2) {
          return null;
        }
        return matchProviderRes[1];
      }
      /**
       * @param providerId - The provider ID to check.
       * @returns Whether the provider ID corresponds to a SAML provider.
       */
      static isProviderId(providerId) {
        return validator2.isNonEmptyString(providerId) && providerId.indexOf("saml.") === 0;
      }
      /**
       * Validates the SAMLConfig options object. Throws an error on failure.
       *
       * @param options - The options object to validate.
       * @param ignoreMissingFields - Whether to ignore missing fields.
       */
      static validate(options, ignoreMissingFields = false) {
        const validKeys = {
          enabled: true,
          displayName: true,
          providerId: true,
          idpEntityId: true,
          ssoURL: true,
          x509Certificates: true,
          rpEntityId: true,
          callbackURL: true,
          enableRequestSigning: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig" must be a valid non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid SAML config parameter.`);
          }
        }
        if (validator2.isNonEmptyString(options.providerId)) {
          if (options.providerId.indexOf("saml.") !== 0) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID, '"SAMLAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "saml.".');
          }
        } else if (!ignoreMissingFields) {
          throw new error_1.FirebaseAuthError(!options.providerId ? error_1.authClientErrorCode.MISSING_PROVIDER_ID : error_1.authClientErrorCode.INVALID_PROVIDER_ID, '"SAMLAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "saml.".');
        }
        if (!(ignoreMissingFields && typeof options.idpEntityId === "undefined") && !validator2.isNonEmptyString(options.idpEntityId)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.idpEntityId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.ssoURL === "undefined") && !validator2.isURL(options.ssoURL)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.ssoURL" must be a valid URL string.');
        }
        if (!(ignoreMissingFields && typeof options.rpEntityId === "undefined") && !validator2.isNonEmptyString(options.rpEntityId)) {
          throw new error_1.FirebaseAuthError(!options.rpEntityId ? error_1.authClientErrorCode.MISSING_SAML_RELYING_PARTY_CONFIG : error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.rpEntityId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.callbackURL === "undefined") && !validator2.isURL(options.callbackURL)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.callbackURL" must be a valid URL string.');
        }
        if (!(ignoreMissingFields && typeof options.x509Certificates === "undefined") && !validator2.isArray(options.x509Certificates)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.x509Certificates" must be a valid array of X509 certificate strings.');
        }
        (options.x509Certificates || []).forEach((cert2) => {
          if (!validator2.isNonEmptyString(cert2)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.x509Certificates" must be a valid array of X509 certificate strings.');
          }
        });
        if (typeof options.enableRequestSigning !== "undefined" && !validator2.isBoolean(options.enableRequestSigning)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.enableRequestSigning" must be a boolean.');
        }
        if (typeof options.enabled !== "undefined" && !validator2.isBoolean(options.enabled)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.enabled" must be a boolean.');
        }
        if (typeof options.displayName !== "undefined" && !validator2.isString(options.displayName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SAMLAuthProviderConfig.displayName" must be a valid string.');
        }
      }
      /**
       * The SAMLConfig constructor.
       *
       * @param response - The server side response used to initialize the SAMLConfig object.
       * @constructor
       */
      constructor(response) {
        if (!response || !response.idpConfig || !response.idpConfig.idpEntityId || !response.idpConfig.ssoUrl || !response.spConfig || !response.spConfig.spEntityId || !response.name || !(validator2.isString(response.name) && SAMLConfig.getProviderIdFromResourceName(response.name))) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid SAML configuration response");
        }
        const providerId = SAMLConfig.getProviderIdFromResourceName(response.name);
        if (!providerId) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid SAML configuration response");
        }
        this.providerId = providerId;
        this.rpEntityId = response.spConfig.spEntityId;
        this.callbackURL = response.spConfig.callbackUri;
        this.idpEntityId = response.idpConfig.idpEntityId;
        this.ssoURL = response.idpConfig.ssoUrl;
        this.enableRequestSigning = !!response.idpConfig.signRequest;
        const x509Certificates = [];
        for (const cert2 of response.idpConfig.idpCertificates || []) {
          if (cert2.x509Certificate) {
            x509Certificates.push(cert2.x509Certificate);
          }
        }
        this.x509Certificates = x509Certificates;
        this.enabled = !!response.enabled;
        this.displayName = response.displayName;
      }
      /** @returns The plain object representation of the SAMLConfig. */
      toJSON() {
        return {
          enabled: this.enabled,
          displayName: this.displayName,
          providerId: this.providerId,
          idpEntityId: this.idpEntityId,
          ssoURL: this.ssoURL,
          x509Certificates: (0, deep_copy_1.deepCopy)(this.x509Certificates),
          rpEntityId: this.rpEntityId,
          callbackURL: this.callbackURL,
          enableRequestSigning: this.enableRequestSigning
        };
      }
    }
    exports.SAMLConfig = SAMLConfig;
    class OIDCConfig {
      /**
       * Converts a client side request to a OIDCConfigServerRequest which is the format
       * accepted by the backend server.
       * Throws an error if validation fails. If the request is not a OIDCConfig request,
       * returns null.
       *
       * @param options - The options object to convert to a server request.
       * @param ignoreMissingFields - Whether to ignore missing fields.
       * @returns The resulting server request or null if not valid.
       */
      static buildServerRequest(options, ignoreMissingFields = false) {
        const makeRequest = validator2.isNonNullObject(options) && (options.providerId || ignoreMissingFields);
        if (!makeRequest) {
          return null;
        }
        const request = {};
        OIDCConfig.validate(options, ignoreMissingFields);
        request.enabled = options.enabled;
        request.displayName = options.displayName;
        request.issuer = options.issuer;
        request.clientId = options.clientId;
        if (typeof options.clientSecret !== "undefined") {
          request.clientSecret = options.clientSecret;
        }
        if (typeof options.responseType !== "undefined") {
          request.responseType = options.responseType;
        }
        return request;
      }
      /**
       * Returns the provider ID corresponding to the resource name if available.
       *
       * @param resourceName - The server side resource name
       * @returns The provider ID corresponding to the resource, null otherwise.
       */
      static getProviderIdFromResourceName(resourceName) {
        const matchProviderRes = resourceName.match(/\/oauthIdpConfigs\/(oidc\..*)$/);
        if (!matchProviderRes || matchProviderRes.length < 2) {
          return null;
        }
        return matchProviderRes[1];
      }
      /**
       * @param providerId - The provider ID to check.
       * @returns Whether the provider ID corresponds to an OIDC provider.
       */
      static isProviderId(providerId) {
        return validator2.isNonEmptyString(providerId) && providerId.indexOf("oidc.") === 0;
      }
      /**
       * Validates the OIDCConfig options object. Throws an error on failure.
       *
       * @param options - The options object to validate.
       * @param ignoreMissingFields - Whether to ignore missing fields.
       */
      static validate(options, ignoreMissingFields = false) {
        const validKeys = {
          enabled: true,
          displayName: true,
          providerId: true,
          clientId: true,
          issuer: true,
          clientSecret: true,
          responseType: true
        };
        const validResponseTypes = {
          idToken: true,
          code: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig" must be a valid non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid OIDC config parameter.`);
          }
        }
        if (validator2.isNonEmptyString(options.providerId)) {
          if (options.providerId.indexOf("oidc.") !== 0) {
            throw new error_1.FirebaseAuthError(!options.providerId ? error_1.authClientErrorCode.MISSING_PROVIDER_ID : error_1.authClientErrorCode.INVALID_PROVIDER_ID, '"OIDCAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "oidc.".');
          }
        } else if (!ignoreMissingFields) {
          throw new error_1.FirebaseAuthError(!options.providerId ? error_1.authClientErrorCode.MISSING_PROVIDER_ID : error_1.authClientErrorCode.INVALID_PROVIDER_ID, '"OIDCAuthProviderConfig.providerId" must be a valid non-empty string prefixed with "oidc.".');
        }
        if (!(ignoreMissingFields && typeof options.clientId === "undefined") && !validator2.isNonEmptyString(options.clientId)) {
          throw new error_1.FirebaseAuthError(!options.clientId ? error_1.authClientErrorCode.MISSING_OAUTH_CLIENT_ID : error_1.authClientErrorCode.INVALID_OAUTH_CLIENT_ID, '"OIDCAuthProviderConfig.clientId" must be a valid non-empty string.');
        }
        if (!(ignoreMissingFields && typeof options.issuer === "undefined") && !validator2.isURL(options.issuer)) {
          throw new error_1.FirebaseAuthError(!options.issuer ? error_1.authClientErrorCode.MISSING_ISSUER : error_1.authClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.issuer" must be a valid URL string.');
        }
        if (typeof options.enabled !== "undefined" && !validator2.isBoolean(options.enabled)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.enabled" must be a boolean.');
        }
        if (typeof options.displayName !== "undefined" && !validator2.isString(options.displayName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.displayName" must be a valid string.');
        }
        if (typeof options.clientSecret !== "undefined" && !validator2.isNonEmptyString(options.clientSecret)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"OIDCAuthProviderConfig.clientSecret" must be a valid string.');
        }
        if (validator2.isNonNullObject(options.responseType) && typeof options.responseType !== "undefined") {
          Object.keys(options.responseType).forEach((key) => {
            if (!(key in validResponseTypes)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid OAuthResponseType parameter.`);
            }
          });
          const idToken = options.responseType.idToken;
          if (typeof idToken !== "undefined" && !validator2.isBoolean(idToken)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"OIDCAuthProviderConfig.responseType.idToken" must be a boolean.');
          }
          const code = options.responseType.code;
          if (typeof code !== "undefined") {
            if (!validator2.isBoolean(code)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"OIDCAuthProviderConfig.responseType.code" must be a boolean.');
            }
            if (code && typeof options.clientSecret === "undefined") {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISSING_OAUTH_CLIENT_SECRET, "The OAuth configuration client secret is required to enable OIDC code flow.");
            }
          }
          const allKeys = Object.keys(options.responseType).length;
          const enabledCount = Object.values(options.responseType).filter(Boolean).length;
          if (allKeys > 1 && enabledCount !== 1) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_OAUTH_RESPONSETYPE, "Only exactly one OAuth responseType should be set to true.");
          }
        }
      }
      /**
       * The OIDCConfig constructor.
       *
       * @param response - The server side response used to initialize the OIDCConfig object.
       * @constructor
       */
      constructor(response) {
        if (!response || !response.issuer || !response.clientId || !response.name || !(validator2.isString(response.name) && OIDCConfig.getProviderIdFromResourceName(response.name))) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid OIDC configuration response");
        }
        const providerId = OIDCConfig.getProviderIdFromResourceName(response.name);
        if (!providerId) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid SAML configuration response");
        }
        this.providerId = providerId;
        this.clientId = response.clientId;
        this.issuer = response.issuer;
        this.enabled = !!response.enabled;
        this.displayName = response.displayName;
        if (typeof response.clientSecret !== "undefined") {
          this.clientSecret = response.clientSecret;
        }
        if (typeof response.responseType !== "undefined") {
          this.responseType = response.responseType;
        }
      }
      /** @returns The plain object representation of the OIDCConfig. */
      toJSON() {
        return {
          enabled: this.enabled,
          displayName: this.displayName,
          providerId: this.providerId,
          issuer: this.issuer,
          clientId: this.clientId,
          clientSecret: (0, deep_copy_1.deepCopy)(this.clientSecret),
          responseType: (0, deep_copy_1.deepCopy)(this.responseType)
        };
      }
    }
    exports.OIDCConfig = OIDCConfig;
    class SmsRegionsAuthConfig {
      static validate(options) {
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SmsRegionConfig" must be a non-null object.');
        }
        const validKeys = {
          allowlistOnly: true,
          allowByDefault: true
        };
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid SmsRegionConfig parameter.`);
          }
        }
        if (typeof options.allowByDefault !== "undefined" && typeof options.allowlistOnly !== "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, 'SmsRegionConfig cannot have both "allowByDefault" and "allowlistOnly" parameters.');
        }
        if (typeof options.allowByDefault !== "undefined") {
          const allowByDefaultValidKeys = {
            disallowedRegions: true
          };
          for (const key in options.allowByDefault) {
            if (!(key in allowByDefaultValidKeys)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid SmsRegionConfig.allowByDefault parameter.`);
            }
          }
          if (typeof options.allowByDefault.disallowedRegions !== "undefined" && !validator2.isArray(options.allowByDefault.disallowedRegions)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SmsRegionConfig.allowByDefault.disallowedRegions" must be a valid string array.');
          }
        }
        if (typeof options.allowlistOnly !== "undefined") {
          const allowListOnlyValidKeys = {
            allowedRegions: true
          };
          for (const key in options.allowlistOnly) {
            if (!(key in allowListOnlyValidKeys)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid SmsRegionConfig.allowlistOnly parameter.`);
            }
          }
          if (typeof options.allowlistOnly.allowedRegions !== "undefined" && !validator2.isArray(options.allowlistOnly.allowedRegions)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"SmsRegionConfig.allowlistOnly.allowedRegions" must be a valid string array.');
          }
        }
      }
    }
    exports.SmsRegionsAuthConfig = SmsRegionsAuthConfig;
    class RecaptchaAuthConfig {
      /**
       * The RecaptchaAuthConfig constructor.
       *
       * @param response - The server side response used to initialize the
       *     RecaptchaAuthConfig object.
       * @constructor
       * @internal
       */
      constructor(response) {
        const filteredResponse = Object.fromEntries(Object.entries(response).filter(([, value]) => value !== void 0));
        if (filteredResponse.tollFraudManagedRules !== void 0) {
          this.smsTollFraudManagedRules = filteredResponse.tollFraudManagedRules;
          delete filteredResponse.tollFraudManagedRules;
        }
        Object.assign(this, filteredResponse);
      }
      /**
       * Builds a server request object from the client-side RecaptchaConfig.
       * Converts client-side fields to their server-side equivalents.
       *
       * @param options - The client-side RecaptchaConfig object.
       * @returns The server-side RecaptchaAuthServerConfig object.
       */
      static buildServerRequest(options) {
        RecaptchaAuthConfig.validate(options);
        const request = {};
        if (typeof options.emailPasswordEnforcementState !== "undefined") {
          request.emailPasswordEnforcementState = options.emailPasswordEnforcementState;
        }
        if (typeof options.phoneEnforcementState !== "undefined") {
          request.phoneEnforcementState = options.phoneEnforcementState;
        }
        if (typeof options.managedRules !== "undefined") {
          request.managedRules = options.managedRules;
        }
        if (typeof options.recaptchaKeys !== "undefined") {
          request.recaptchaKeys = options.recaptchaKeys;
        }
        if (typeof options.useAccountDefender !== "undefined") {
          request.useAccountDefender = options.useAccountDefender;
        }
        if (typeof options.useSmsBotScore !== "undefined") {
          request.useSmsBotScore = options.useSmsBotScore;
        }
        if (typeof options.useSmsTollFraudProtection !== "undefined") {
          request.useSmsTollFraudProtection = options.useSmsTollFraudProtection;
        }
        if (typeof options.smsTollFraudManagedRules !== "undefined") {
          request.tollFraudManagedRules = options.smsTollFraudManagedRules;
        }
        return request;
      }
      /**
       * Validates the RecaptchaConfig options object. Throws an error on failure.
       * @param options - The options object to validate.
       */
      static validate(options) {
        const validKeys = {
          emailPasswordEnforcementState: true,
          phoneEnforcementState: true,
          managedRules: true,
          recaptchaKeys: true,
          useAccountDefender: true,
          useSmsBotScore: true,
          useSmsTollFraudProtection: true,
          smsTollFraudManagedRules: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid RecaptchaConfig parameter.`);
          }
        }
        if (typeof options.emailPasswordEnforcementState !== "undefined") {
          if (!validator2.isNonEmptyString(options.emailPasswordEnforcementState)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"RecaptchaConfig.emailPasswordEnforcementState" must be a valid non-empty string.');
          }
          if (options.emailPasswordEnforcementState !== "OFF" && options.emailPasswordEnforcementState !== "AUDIT" && options.emailPasswordEnforcementState !== "ENFORCE") {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.emailPasswordEnforcementState" must be either "OFF", "AUDIT" or "ENFORCE".');
          }
        }
        if (typeof options.phoneEnforcementState !== "undefined") {
          if (!validator2.isNonEmptyString(options.phoneEnforcementState)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"RecaptchaConfig.phoneEnforcementState" must be a valid non-empty string.');
          }
          if (options.phoneEnforcementState !== "OFF" && options.phoneEnforcementState !== "AUDIT" && options.phoneEnforcementState !== "ENFORCE") {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.phoneEnforcementState" must be either "OFF", "AUDIT" or "ENFORCE".');
          }
        }
        if (typeof options.managedRules !== "undefined") {
          if (!validator2.isArray(options.managedRules)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.managedRules" must be an array of valid "RecaptchaManagedRule".');
          }
          options.managedRules.forEach((managedRule) => {
            RecaptchaAuthConfig.validateManagedRule(managedRule);
          });
        }
        if (typeof options.useAccountDefender !== "undefined") {
          if (!validator2.isBoolean(options.useAccountDefender)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.useAccountDefender" must be a boolean value".');
          }
        }
        if (typeof options.useSmsBotScore !== "undefined") {
          if (!validator2.isBoolean(options.useSmsBotScore)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.useSmsBotScore" must be a boolean value".');
          }
        }
        if (typeof options.useSmsTollFraudProtection !== "undefined") {
          if (!validator2.isBoolean(options.useSmsTollFraudProtection)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.useSmsTollFraudProtection" must be a boolean value".');
          }
        }
        if (typeof options.smsTollFraudManagedRules !== "undefined") {
          if (!validator2.isArray(options.smsTollFraudManagedRules)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaConfig.smsTollFraudManagedRules" must be an array of valid "RecaptchaTollFraudManagedRule".');
          }
          options.smsTollFraudManagedRules.forEach((tollFraudManagedRule) => {
            RecaptchaAuthConfig.validateTollFraudManagedRule(tollFraudManagedRule);
          });
        }
      }
      /**
       * Validate each element in ManagedRule array
       * @param options - The options object to validate.
       */
      static validateManagedRule(options) {
        const validKeys = {
          endScore: true,
          action: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaManagedRule" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid RecaptchaManagedRule parameter.`);
          }
        }
        if (typeof options.action !== "undefined" && options.action !== "BLOCK") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaManagedRule.action" must be "BLOCK".');
        }
      }
      /**
       * Validate each element in TollFraudManagedRule array
       * @param options - The options object to validate.
       */
      static validateTollFraudManagedRule(options) {
        const validKeys = {
          startScore: true,
          action: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaTollFraudManagedRule" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid RecaptchaTollFraudManagedRule parameter.`);
          }
        }
        if (typeof options.action !== "undefined" && options.action !== "BLOCK") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"RecaptchaTollFraudManagedRule.action" must be "BLOCK".');
        }
      }
    }
    exports.RecaptchaAuthConfig = RecaptchaAuthConfig;
    class MobileLinksAuthConfig {
      static validate(options) {
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MobileLinksConfig" must be a non-null object.');
        }
        const validKeys = {
          domain: true
        };
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid "MobileLinksConfig" parameter.`);
          }
        }
        if (typeof options.domain !== "undefined" && options.domain !== "HOSTING_DOMAIN" && options.domain !== "FIREBASE_DYNAMIC_LINK_DOMAIN") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"MobileLinksConfig.domain" must be either "HOSTING_DOMAIN" or "FIREBASE_DYNAMIC_LINK_DOMAIN".');
        }
      }
    }
    exports.MobileLinksAuthConfig = MobileLinksAuthConfig;
    class PasswordPolicyAuthConfig {
      /**
       * Static method to convert a client side request to a PasswordPolicyAuthServerConfig.
       * Throws an error if validation fails.
       *
       * @param options - The options object to convert to a server request.
       * @returns The resulting server request.
       * @internal
       */
      static buildServerRequest(options) {
        const request = {};
        PasswordPolicyAuthConfig.validate(options);
        if (Object.prototype.hasOwnProperty.call(options, "enforcementState")) {
          request.passwordPolicyEnforcementState = options.enforcementState;
        }
        request.forceUpgradeOnSignin = false;
        if (Object.prototype.hasOwnProperty.call(options, "forceUpgradeOnSignin")) {
          request.forceUpgradeOnSignin = options.forceUpgradeOnSignin;
        }
        const constraintsRequest = {
          containsUppercaseCharacter: false,
          containsLowercaseCharacter: false,
          containsNonAlphanumericCharacter: false,
          containsNumericCharacter: false,
          minPasswordLength: 6,
          maxPasswordLength: 4096
        };
        request.passwordPolicyVersions = [];
        if (Object.prototype.hasOwnProperty.call(options, "constraints")) {
          if (options) {
            if (options.constraints?.requireUppercase !== void 0) {
              constraintsRequest.containsUppercaseCharacter = options.constraints.requireUppercase;
            }
            if (options.constraints?.requireLowercase !== void 0) {
              constraintsRequest.containsLowercaseCharacter = options.constraints.requireLowercase;
            }
            if (options.constraints?.requireNonAlphanumeric !== void 0) {
              constraintsRequest.containsNonAlphanumericCharacter = options.constraints.requireNonAlphanumeric;
            }
            if (options.constraints?.requireNumeric !== void 0) {
              constraintsRequest.containsNumericCharacter = options.constraints.requireNumeric;
            }
            if (options.constraints?.minLength !== void 0) {
              constraintsRequest.minPasswordLength = options.constraints.minLength;
            }
            if (options.constraints?.maxLength !== void 0) {
              constraintsRequest.maxPasswordLength = options.constraints.maxLength;
            }
          }
        }
        request.passwordPolicyVersions.push({ customStrengthOptions: constraintsRequest });
        return request;
      }
      /**
       * Validates the PasswordPolicyConfig options object. Throws an error on failure.
       *
       * @param options - The options object to validate.
       * @internal
       */
      static validate(options) {
        const validKeys = {
          enforcementState: true,
          forceUpgradeOnSignin: true,
          constraints: true
        };
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig" must be a non-null object.');
        }
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid PasswordPolicyConfig parameter.`);
          }
        }
        if (typeof options.enforcementState === "undefined" || !(options.enforcementState === "ENFORCE" || options.enforcementState === "OFF")) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.enforcementState" must be either "ENFORCE" or "OFF".');
        }
        if (typeof options.forceUpgradeOnSignin !== "undefined") {
          if (!validator2.isBoolean(options.forceUpgradeOnSignin)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.forceUpgradeOnSignin" must be a boolean.');
          }
        }
        if (typeof options.constraints !== "undefined") {
          if (options.enforcementState === "ENFORCE" && !validator2.isNonNullObject(options.constraints)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints" must be a non-empty object.');
          }
          const validCharKeys = {
            requireUppercase: true,
            requireLowercase: true,
            requireNumeric: true,
            requireNonAlphanumeric: true,
            minLength: true,
            maxLength: true
          };
          for (const key in options.constraints) {
            if (!(key in validCharKeys)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid PasswordPolicyConfig.constraints parameter.`);
            }
          }
          if (typeof options.constraints.requireUppercase !== "undefined" && !validator2.isBoolean(options.constraints.requireUppercase)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.requireUppercase" must be a boolean.');
          }
          if (typeof options.constraints.requireLowercase !== "undefined" && !validator2.isBoolean(options.constraints.requireLowercase)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.requireLowercase" must be a boolean.');
          }
          if (typeof options.constraints.requireNonAlphanumeric !== "undefined" && !validator2.isBoolean(options.constraints.requireNonAlphanumeric)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.requireNonAlphanumeric" must be a boolean.');
          }
          if (typeof options.constraints.requireNumeric !== "undefined" && !validator2.isBoolean(options.constraints.requireNumeric)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.requireNumeric" must be a boolean.');
          }
          if (typeof options.constraints.minLength === "undefined") {
            options.constraints.minLength = 6;
          } else if (!validator2.isNumber(options.constraints.minLength)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.minLength" must be a number.');
          } else {
            if (!(options.constraints.minLength >= 6 && options.constraints.minLength <= 30)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.minLength" must be an integer between 6 and 30, inclusive.');
            }
          }
          if (typeof options.constraints.maxLength === "undefined") {
            options.constraints.maxLength = 4096;
          } else if (!validator2.isNumber(options.constraints.maxLength)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.maxLength" must be a number.');
          } else {
            if (!(options.constraints.maxLength >= options.constraints.minLength && options.constraints.maxLength <= 4096)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints.maxLength" must be greater than or equal to minLength and at max 4096.');
            }
          }
        } else {
          if (options.enforcementState === "ENFORCE") {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"PasswordPolicyConfig.constraints" must be defined.');
          }
        }
      }
      /**
       * The PasswordPolicyAuthConfig constructor.
       *
       * @param response - The server side response used to initialize the
       *     PasswordPolicyAuthConfig object.
       * @constructor
       * @internal
       */
      constructor(response) {
        if (typeof response.passwordPolicyEnforcementState === "undefined") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid password policy configuration response");
        }
        this.enforcementState = response.passwordPolicyEnforcementState;
        let constraintsResponse = {};
        if (typeof response.passwordPolicyVersions !== "undefined") {
          (response.passwordPolicyVersions || []).forEach((policyVersion) => {
            constraintsResponse = {
              requireLowercase: policyVersion.customStrengthOptions?.containsLowercaseCharacter,
              requireUppercase: policyVersion.customStrengthOptions?.containsUppercaseCharacter,
              requireNonAlphanumeric: policyVersion.customStrengthOptions?.containsNonAlphanumericCharacter,
              requireNumeric: policyVersion.customStrengthOptions?.containsNumericCharacter,
              minLength: policyVersion.customStrengthOptions?.minPasswordLength,
              maxLength: policyVersion.customStrengthOptions?.maxPasswordLength
            };
          });
        }
        this.constraints = constraintsResponse;
        this.forceUpgradeOnSignin = response.forceUpgradeOnSignin ? true : false;
      }
    }
    exports.PasswordPolicyAuthConfig = PasswordPolicyAuthConfig;
    class EmailPrivacyAuthConfig {
      static validate(options) {
        if (!validator2.isNonNullObject(options)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"EmailPrivacyConfig" must be a non-null object.');
        }
        const validKeys = {
          enableImprovedEmailPrivacy: true
        };
        for (const key in options) {
          if (!(key in validKeys)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, `"${key}" is not a valid "EmailPrivacyConfig" parameter.`);
          }
        }
        if (typeof options.enableImprovedEmailPrivacy !== "undefined" && !validator2.isBoolean(options.enableImprovedEmailPrivacy)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, '"EmailPrivacyConfig.enableImprovedEmailPrivacy" must be a valid boolean value.');
        }
      }
    }
    exports.EmailPrivacyAuthConfig = EmailPrivacyAuthConfig;
  })(authConfig);
  return authConfig;
}
var hasRequiredTenant;
function requireTenant() {
  if (hasRequiredTenant) return tenant;
  hasRequiredTenant = 1;
  Object.defineProperty(tenant, "__esModule", { value: true });
  tenant.Tenant = void 0;
  const validator2 = requireValidator();
  const deep_copy_1 = requireDeepCopy();
  const error_1 = requireError$2();
  const auth_config_1 = requireAuthConfig();
  class Tenant {
    /**
     * Builds the corresponding server request for a TenantOptions object.
     *
     * @param tenantOptions - The properties to convert to a server request.
     * @param createRequest - Whether this is a create request.
     * @returns The equivalent server request.
     *
     * @internal
     */
    static buildServerRequest(tenantOptions, createRequest) {
      Tenant.validate(tenantOptions, createRequest);
      let request = {};
      if (typeof tenantOptions.emailSignInConfig !== "undefined") {
        request = auth_config_1.EmailSignInConfig.buildServerRequest(tenantOptions.emailSignInConfig);
      }
      if (typeof tenantOptions.displayName !== "undefined") {
        request.displayName = tenantOptions.displayName;
      }
      if (typeof tenantOptions.anonymousSignInEnabled !== "undefined") {
        request.enableAnonymousUser = tenantOptions.anonymousSignInEnabled;
      }
      if (typeof tenantOptions.multiFactorConfig !== "undefined") {
        request.mfaConfig = auth_config_1.MultiFactorAuthConfig.buildServerRequest(tenantOptions.multiFactorConfig);
      }
      if (typeof tenantOptions.testPhoneNumbers !== "undefined") {
        request.testPhoneNumbers = tenantOptions.testPhoneNumbers ?? {};
      }
      if (typeof tenantOptions.smsRegionConfig !== "undefined") {
        request.smsRegionConfig = tenantOptions.smsRegionConfig;
      }
      if (typeof tenantOptions.recaptchaConfig !== "undefined") {
        request.recaptchaConfig = auth_config_1.RecaptchaAuthConfig.buildServerRequest(tenantOptions.recaptchaConfig);
      }
      if (typeof tenantOptions.passwordPolicyConfig !== "undefined") {
        request.passwordPolicyConfig = auth_config_1.PasswordPolicyAuthConfig.buildServerRequest(tenantOptions.passwordPolicyConfig);
      }
      if (typeof tenantOptions.emailPrivacyConfig !== "undefined") {
        request.emailPrivacyConfig = tenantOptions.emailPrivacyConfig;
      }
      return request;
    }
    /**
     * Returns the tenant ID corresponding to the resource name if available.
     *
     * @param resourceName - The server side resource name
     * @returns The tenant ID corresponding to the resource, null otherwise.
     *
     * @internal
     */
    static getTenantIdFromResourceName(resourceName) {
      const matchTenantRes = resourceName.match(/\/tenants\/(.*)$/);
      if (!matchTenantRes || matchTenantRes.length < 2) {
        return null;
      }
      return matchTenantRes[1];
    }
    /**
     * Validates a tenant options object. Throws an error on failure.
     *
     * @param request - The tenant options object to validate.
     * @param createRequest - Whether this is a create request.
     */
    static validate(request, createRequest) {
      const validKeys = {
        displayName: true,
        emailSignInConfig: true,
        anonymousSignInEnabled: true,
        multiFactorConfig: true,
        testPhoneNumbers: true,
        smsRegionConfig: true,
        recaptchaConfig: true,
        passwordPolicyConfig: true,
        emailPrivacyConfig: true
      };
      const label = createRequest ? "CreateTenantRequest" : "UpdateTenantRequest";
      if (!validator2.isNonNullObject(request)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${label}" must be a valid non-null object.`);
      }
      for (const key in request) {
        if (!(key in validKeys)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${key}" is not a valid ${label} parameter.`);
        }
      }
      if (typeof request.displayName !== "undefined" && !validator2.isNonEmptyString(request.displayName)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${label}.displayName" must be a valid non-empty string.`);
      }
      if (typeof request.emailSignInConfig !== "undefined") {
        auth_config_1.EmailSignInConfig.buildServerRequest(request.emailSignInConfig);
      }
      if (typeof request.testPhoneNumbers !== "undefined" && request.testPhoneNumbers !== null) {
        (0, auth_config_1.validateTestPhoneNumbers)(request.testPhoneNumbers);
      } else if (request.testPhoneNumbers === null && createRequest) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${label}.testPhoneNumbers" must be a non-null object.`);
      }
      if (typeof request.multiFactorConfig !== "undefined") {
        auth_config_1.MultiFactorAuthConfig.buildServerRequest(request.multiFactorConfig);
      }
      if (typeof request.smsRegionConfig !== "undefined") {
        auth_config_1.SmsRegionsAuthConfig.validate(request.smsRegionConfig);
      }
      if (typeof request.recaptchaConfig !== "undefined") {
        auth_config_1.RecaptchaAuthConfig.buildServerRequest(request.recaptchaConfig);
      }
      if (typeof request.passwordPolicyConfig !== "undefined") {
        auth_config_1.PasswordPolicyAuthConfig.buildServerRequest(request.passwordPolicyConfig);
      }
      if (typeof request.emailPrivacyConfig !== "undefined") {
        auth_config_1.EmailPrivacyAuthConfig.validate(request.emailPrivacyConfig);
      }
    }
    /**
     * The Tenant object constructor.
     *
     * @param response - The server side response used to initialize the Tenant object.
     * @constructor
     * @internal
     */
    constructor(response) {
      const tenantId = Tenant.getTenantIdFromResourceName(response.name);
      if (!tenantId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid tenant response");
      }
      this.tenantId = tenantId;
      this.displayName = response.displayName;
      try {
        this.emailSignInConfig_ = new auth_config_1.EmailSignInConfig(response);
      } catch (e) {
        this.emailSignInConfig_ = new auth_config_1.EmailSignInConfig({
          allowPasswordSignup: false
        });
      }
      this.anonymousSignInEnabled = !!response.enableAnonymousUser;
      if (typeof response.mfaConfig !== "undefined") {
        this.multiFactorConfig_ = new auth_config_1.MultiFactorAuthConfig(response.mfaConfig);
      }
      if (typeof response.testPhoneNumbers !== "undefined") {
        this.testPhoneNumbers = (0, deep_copy_1.deepCopy)(response.testPhoneNumbers || {});
      }
      if (typeof response.smsRegionConfig !== "undefined") {
        this.smsRegionConfig = (0, deep_copy_1.deepCopy)(response.smsRegionConfig);
      }
      if (typeof response.recaptchaConfig !== "undefined") {
        this.recaptchaConfig_ = new auth_config_1.RecaptchaAuthConfig(response.recaptchaConfig);
      }
      if (typeof response.passwordPolicyConfig !== "undefined") {
        this.passwordPolicyConfig = new auth_config_1.PasswordPolicyAuthConfig(response.passwordPolicyConfig);
      }
      if (typeof response.emailPrivacyConfig !== "undefined") {
        this.emailPrivacyConfig = (0, deep_copy_1.deepCopy)(response.emailPrivacyConfig);
      }
    }
    /**
     * The email sign in provider configuration.
     */
    get emailSignInConfig() {
      return this.emailSignInConfig_;
    }
    /**
     * The multi-factor auth configuration on the current tenant.
     */
    get multiFactorConfig() {
      return this.multiFactorConfig_;
    }
    /**
     * The recaptcha config auth configuration of the current tenant.
     */
    get recaptchaConfig() {
      return this.recaptchaConfig_;
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      const json = {
        tenantId: this.tenantId,
        displayName: this.displayName,
        emailSignInConfig: this.emailSignInConfig_?.toJSON(),
        multiFactorConfig: this.multiFactorConfig_?.toJSON(),
        anonymousSignInEnabled: this.anonymousSignInEnabled,
        testPhoneNumbers: this.testPhoneNumbers,
        smsRegionConfig: (0, deep_copy_1.deepCopy)(this.smsRegionConfig),
        recaptchaConfig: (0, deep_copy_1.deepCopy)(this.recaptchaConfig),
        passwordPolicyConfig: (0, deep_copy_1.deepCopy)(this.passwordPolicyConfig),
        emailPrivacyConfig: (0, deep_copy_1.deepCopy)(this.emailPrivacyConfig)
      };
      if (typeof json.multiFactorConfig === "undefined") {
        delete json.multiFactorConfig;
      }
      if (typeof json.testPhoneNumbers === "undefined") {
        delete json.testPhoneNumbers;
      }
      if (typeof json.smsRegionConfig === "undefined") {
        delete json.smsRegionConfig;
      }
      if (typeof json.recaptchaConfig === "undefined") {
        delete json.recaptchaConfig;
      }
      if (typeof json.passwordPolicyConfig === "undefined") {
        delete json.passwordPolicyConfig;
      }
      if (typeof json.emailPrivacyConfig === "undefined") {
        delete json.emailPrivacyConfig;
      }
      return json;
    }
  }
  tenant.Tenant = Tenant;
  return tenant;
}
var identifier = {};
var hasRequiredIdentifier;
function requireIdentifier() {
  if (hasRequiredIdentifier) return identifier;
  hasRequiredIdentifier = 1;
  Object.defineProperty(identifier, "__esModule", { value: true });
  identifier.isUidIdentifier = isUidIdentifier;
  identifier.isEmailIdentifier = isEmailIdentifier;
  identifier.isPhoneIdentifier = isPhoneIdentifier;
  identifier.isProviderIdentifier = isProviderIdentifier;
  function isUidIdentifier(id) {
    return id.uid !== void 0;
  }
  function isEmailIdentifier(id) {
    return id.email !== void 0;
  }
  function isPhoneIdentifier(id) {
    return id.phoneNumber !== void 0;
  }
  function isProviderIdentifier(id) {
    const pid = id;
    return pid.providerId !== void 0 && pid.providerUid !== void 0;
  }
  return identifier;
}
var projectConfig = {};
var hasRequiredProjectConfig;
function requireProjectConfig() {
  if (hasRequiredProjectConfig) return projectConfig;
  hasRequiredProjectConfig = 1;
  Object.defineProperty(projectConfig, "__esModule", { value: true });
  projectConfig.ProjectConfig = void 0;
  const validator2 = requireValidator();
  const error_1 = requireError$2();
  const auth_config_1 = requireAuthConfig();
  const deep_copy_1 = requireDeepCopy();
  class ProjectConfig {
    /**
     * The multi-factor auth configuration.
     */
    get multiFactorConfig() {
      return this.multiFactorConfig_;
    }
    /**
     * The reCAPTCHA configuration.
     */
    get recaptchaConfig() {
      return this.recaptchaConfig_;
    }
    /**
     * Validates a project config options object. Throws an error on failure.
     *
     * @param request - The project config options object to validate.
     */
    static validate(request) {
      if (!validator2.isNonNullObject(request)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"UpdateProjectConfigRequest" must be a valid non-null object.');
      }
      const validKeys = {
        smsRegionConfig: true,
        multiFactorConfig: true,
        recaptchaConfig: true,
        passwordPolicyConfig: true,
        emailPrivacyConfig: true,
        mobileLinksConfig: true
      };
      for (const key in request) {
        if (!(key in validKeys)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${key}" is not a valid UpdateProjectConfigRequest parameter.`);
        }
      }
      if (typeof request.smsRegionConfig !== "undefined") {
        auth_config_1.SmsRegionsAuthConfig.validate(request.smsRegionConfig);
      }
      if (typeof request.multiFactorConfig !== "undefined") {
        auth_config_1.MultiFactorAuthConfig.validate(request.multiFactorConfig);
      }
      if (typeof request.recaptchaConfig !== "undefined") {
        auth_config_1.RecaptchaAuthConfig.validate(request.recaptchaConfig);
      }
      if (typeof request.passwordPolicyConfig !== "undefined") {
        auth_config_1.PasswordPolicyAuthConfig.validate(request.passwordPolicyConfig);
      }
      if (typeof request.emailPrivacyConfig !== "undefined") {
        auth_config_1.EmailPrivacyAuthConfig.validate(request.emailPrivacyConfig);
      }
      if (typeof request.mobileLinksConfig !== "undefined") {
        auth_config_1.MobileLinksAuthConfig.validate(request.mobileLinksConfig);
      }
    }
    /**
     * Build the corresponding server request for a UpdateProjectConfigRequest object.
     * @param configOptions - The properties to convert to a server request.
     * @returns  The equivalent server request.
     *
     * @internal
     */
    static buildServerRequest(configOptions) {
      ProjectConfig.validate(configOptions);
      const request = {};
      if (typeof configOptions.smsRegionConfig !== "undefined") {
        request.smsRegionConfig = configOptions.smsRegionConfig;
      }
      if (typeof configOptions.multiFactorConfig !== "undefined") {
        request.mfa = auth_config_1.MultiFactorAuthConfig.buildServerRequest(configOptions.multiFactorConfig);
      }
      if (typeof configOptions.recaptchaConfig !== "undefined") {
        request.recaptchaConfig = auth_config_1.RecaptchaAuthConfig.buildServerRequest(configOptions.recaptchaConfig);
      }
      if (typeof configOptions.passwordPolicyConfig !== "undefined") {
        request.passwordPolicyConfig = auth_config_1.PasswordPolicyAuthConfig.buildServerRequest(configOptions.passwordPolicyConfig);
      }
      if (typeof configOptions.emailPrivacyConfig !== "undefined") {
        request.emailPrivacyConfig = configOptions.emailPrivacyConfig;
      }
      if (typeof configOptions.mobileLinksConfig !== "undefined") {
        request.mobileLinksConfig = configOptions.mobileLinksConfig;
      }
      return request;
    }
    /**
     * The Project Config object constructor.
     *
     * @param response - The server side response used to initialize the Project Config object.
     * @constructor
     * @internal
     */
    constructor(response) {
      if (typeof response.smsRegionConfig !== "undefined") {
        this.smsRegionConfig = response.smsRegionConfig;
      }
      if (typeof response.mfa !== "undefined") {
        this.multiFactorConfig_ = new auth_config_1.MultiFactorAuthConfig(response.mfa);
      }
      if (typeof response.recaptchaConfig !== "undefined") {
        this.recaptchaConfig_ = new auth_config_1.RecaptchaAuthConfig(response.recaptchaConfig);
      }
      if (typeof response.passwordPolicyConfig !== "undefined") {
        this.passwordPolicyConfig = new auth_config_1.PasswordPolicyAuthConfig(response.passwordPolicyConfig);
      }
      if (typeof response.emailPrivacyConfig !== "undefined") {
        this.emailPrivacyConfig = response.emailPrivacyConfig;
      }
      if (typeof response.mobileLinksConfig !== "undefined") {
        this.mobileLinksConfig = response.mobileLinksConfig;
      }
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      const json = {
        smsRegionConfig: (0, deep_copy_1.deepCopy)(this.smsRegionConfig),
        multiFactorConfig: (0, deep_copy_1.deepCopy)(this.multiFactorConfig),
        recaptchaConfig: (0, deep_copy_1.deepCopy)(this.recaptchaConfig),
        passwordPolicyConfig: (0, deep_copy_1.deepCopy)(this.passwordPolicyConfig),
        emailPrivacyConfig: (0, deep_copy_1.deepCopy)(this.emailPrivacyConfig),
        mobileLinksConfig: (0, deep_copy_1.deepCopy)(this.mobileLinksConfig)
      };
      if (typeof json.smsRegionConfig === "undefined") {
        delete json.smsRegionConfig;
      }
      if (typeof json.multiFactorConfig === "undefined") {
        delete json.multiFactorConfig;
      }
      if (typeof json.recaptchaConfig === "undefined") {
        delete json.recaptchaConfig;
      }
      if (typeof json.passwordPolicyConfig === "undefined") {
        delete json.passwordPolicyConfig;
      }
      if (typeof json.emailPrivacyConfig === "undefined") {
        delete json.emailPrivacyConfig;
      }
      if (typeof json.mobileLinksConfig === "undefined") {
        delete json.mobileLinksConfig;
      }
      return json;
    }
  }
  projectConfig.ProjectConfig = ProjectConfig;
  return projectConfig;
}
var hasRequiredAuthApiRequest;
function requireAuthApiRequest() {
  if (hasRequiredAuthApiRequest) return authApiRequest;
  hasRequiredAuthApiRequest = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TenantAwareAuthRequestHandler = exports.AuthRequestHandler = exports.AbstractAuthRequestHandler = exports.FIREBASE_AUTH_SIGN_UP_NEW_USER = exports.FIREBASE_AUTH_SET_ACCOUNT_INFO = exports.FIREBASE_AUTH_BATCH_DELETE_ACCOUNTS = exports.FIREBASE_AUTH_DELETE_ACCOUNT = exports.FIREBASE_AUTH_GET_ACCOUNTS_INFO = exports.FIREBASE_AUTH_GET_ACCOUNT_INFO = exports.FIREBASE_AUTH_DOWNLOAD_ACCOUNT = exports.FIREBASE_AUTH_UPLOAD_ACCOUNT = exports.FIREBASE_AUTH_CREATE_SESSION_COOKIE = exports.EMAIL_ACTION_REQUEST_TYPES = exports.RESERVED_CLAIMS = void 0;
    exports.useEmulator = useEmulator;
    const validator2 = requireValidator();
    const deep_copy_1 = requireDeepCopy();
    const error_1 = requireError$2();
    const error_2 = requireError$4();
    const api_request_1 = requireApiRequest();
    const utils2 = requireUtils$1();
    const user_import_builder_1 = requireUserImportBuilder();
    const action_code_settings_builder_1 = requireActionCodeSettingsBuilder();
    const tenant_1 = requireTenant();
    const identifier_1 = requireIdentifier();
    const auth_config_1 = requireAuthConfig();
    const project_config_1 = requireProjectConfig();
    const FIREBASE_AUTH_HEADERS = {
      "X-Client-Version": `Node/Admin/${utils2.getSdkVersion()}`
    };
    const FIREBASE_AUTH_TIMEOUT = 25e3;
    exports.RESERVED_CLAIMS = [
      "acr",
      "amr",
      "at_hash",
      "aud",
      "auth_time",
      "azp",
      "cnf",
      "c_hash",
      "exp",
      "iat",
      "iss",
      "jti",
      "nbf",
      "nonce",
      "sub",
      "firebase"
    ];
    exports.EMAIL_ACTION_REQUEST_TYPES = [
      "PASSWORD_RESET",
      "VERIFY_EMAIL",
      "EMAIL_SIGNIN",
      "VERIFY_AND_CHANGE_EMAIL"
    ];
    const MAX_CLAIMS_PAYLOAD_SIZE = 1e3;
    const MAX_DOWNLOAD_ACCOUNT_PAGE_SIZE = 1e3;
    const MAX_UPLOAD_ACCOUNT_BATCH_SIZE = 1e3;
    const MAX_GET_ACCOUNTS_BATCH_SIZE = 100;
    const MAX_DELETE_ACCOUNTS_BATCH_SIZE = 1e3;
    const MIN_SESSION_COOKIE_DURATION_SECS = 5 * 60;
    const MAX_SESSION_COOKIE_DURATION_SECS = 14 * 24 * 60 * 60;
    const MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE = 100;
    const FIREBASE_AUTH_BASE_URL_FORMAT = "https://identitytoolkit.googleapis.com/{version}/projects/{projectId}{api}";
    const FIREBASE_AUTH_EMULATOR_BASE_URL_FORMAT = "http://{host}/identitytoolkit.googleapis.com/{version}/projects/{projectId}{api}";
    const FIREBASE_AUTH_TENANT_URL_FORMAT = FIREBASE_AUTH_BASE_URL_FORMAT.replace("projects/{projectId}", "projects/{projectId}/tenants/{tenantId}");
    const FIREBASE_AUTH_EMULATOR_TENANT_URL_FORMAT = FIREBASE_AUTH_EMULATOR_BASE_URL_FORMAT.replace("projects/{projectId}", "projects/{projectId}/tenants/{tenantId}");
    const MAX_LIST_TENANT_PAGE_SIZE = 1e3;
    var WriteOperationType;
    (function(WriteOperationType2) {
      WriteOperationType2["Create"] = "create";
      WriteOperationType2["Update"] = "update";
      WriteOperationType2["Upload"] = "upload";
    })(WriteOperationType || (WriteOperationType = {}));
    class AuthResourceUrlBuilder {
      /**
       * The resource URL builder constructor.
       *
       * @param app - The app for this URL builder.
       * @param version - The endpoint API version.
       * @param emulatorHost - Optional emulator host captured at init time.
       * @constructor
       */
      constructor(app2, version2 = "v1", emHost) {
        this.app = app2;
        this.version = version2;
        if (emHost) {
          this.urlFormat = utils2.formatString(FIREBASE_AUTH_EMULATOR_BASE_URL_FORMAT, {
            host: emHost
          });
        } else {
          this.urlFormat = FIREBASE_AUTH_BASE_URL_FORMAT;
        }
      }
      /**
       * Returns the resource URL corresponding to the provided parameters.
       *
       * @param api - The backend API name.
       * @param params - The optional additional parameters to substitute in the
       *     URL path.
       * @returns The corresponding resource URL.
       */
      getUrl(api, params) {
        return this.getProjectId().then((projectId) => {
          const baseParams = {
            version: this.version,
            projectId,
            api: api || ""
          };
          const baseUrl = utils2.formatString(this.urlFormat, baseParams);
          return utils2.formatString(baseUrl, params || {});
        });
      }
      getProjectId() {
        if (this.projectId) {
          return Promise.resolve(this.projectId);
        }
        return utils2.findProjectId(this.app).then((projectId) => {
          if (!validator2.isNonEmptyString(projectId)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CREDENTIAL, "Failed to determine project ID for Auth. Initialize the SDK with service account credentials or set project ID as an app option. Alternatively set the GOOGLE_CLOUD_PROJECT environment variable.");
          }
          this.projectId = projectId;
          return projectId;
        });
      }
    }
    class TenantAwareAuthResourceUrlBuilder extends AuthResourceUrlBuilder {
      /**
       * The tenant aware resource URL builder constructor.
       *
       * @param app - The app for this URL builder.
       * @param version - The endpoint API version.
       * @param tenantId - The tenant ID.
       * @param emHost - Optional emulator host captured at init time.
       * @constructor
       */
      constructor(app2, version2, tenantId, emHost) {
        super(app2, version2, emHost);
        this.app = app2;
        this.version = version2;
        this.tenantId = tenantId;
        if (emHost) {
          this.urlFormat = utils2.formatString(FIREBASE_AUTH_EMULATOR_TENANT_URL_FORMAT, {
            host: emHost
          });
        } else {
          this.urlFormat = FIREBASE_AUTH_TENANT_URL_FORMAT;
        }
      }
      /**
       * Returns the resource URL corresponding to the provided parameters.
       *
       * @param api - The backend API name.
       * @param params - The optional additional parameters to substitute in the
       *     URL path.
       * @returns The corresponding resource URL.
       */
      getUrl(api, params) {
        return super.getUrl(api, params).then((url) => {
          return utils2.formatString(url, { tenantId: this.tenantId });
        });
      }
    }
    class AuthHttpClient extends api_request_1.AuthorizedHttpClient {
      constructor(app2, isEmulator) {
        super(app2);
        this.isEmulator = isEmulator;
      }
      getToken() {
        if (this.isEmulator) {
          return Promise.resolve("owner");
        }
        return super.getToken();
      }
    }
    function validateAuthFactorInfo(request) {
      const validKeys = {
        mfaEnrollmentId: true,
        displayName: true,
        phoneInfo: true,
        enrolledAt: true
      };
      for (const key in request) {
        if (!(key in validKeys)) {
          delete request[key];
        }
      }
      const authFactorInfoIdentifier = request.mfaEnrollmentId || request.phoneInfo || JSON.stringify(request);
      if (typeof request.mfaEnrollmentId !== "undefined" && !validator2.isNonEmptyString(request.mfaEnrollmentId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID, 'The second factor "uid" must be a valid non-empty string.');
      }
      if (typeof request.displayName !== "undefined" && !validator2.isString(request.displayName)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DISPLAY_NAME, `The second factor "displayName" for "${authFactorInfoIdentifier}" must be a valid string.`);
      }
      if (typeof request.enrolledAt !== "undefined" && !validator2.isISODateString(request.enrolledAt)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ENROLLMENT_TIME, `The second factor "enrollmentTime" for "${authFactorInfoIdentifier}" must be a valid UTC date string.`);
      }
      if (typeof request.phoneInfo !== "undefined") {
        if (!validator2.isPhoneNumber(request.phoneInfo)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHONE_NUMBER, `The second factor "phoneNumber" for "${authFactorInfoIdentifier}" must be a non-empty E.164 standard compliant identifier string.`);
        }
      } else {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ENROLLED_FACTORS, "MFAInfo object provided is invalid.");
      }
    }
    function validateProviderUserInfo(request) {
      const validKeys = {
        rawId: true,
        providerId: true,
        email: true,
        displayName: true,
        photoUrl: true
      };
      for (const key in request) {
        if (!(key in validKeys)) {
          delete request[key];
        }
      }
      if (!validator2.isNonEmptyString(request.providerId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID);
      }
      if (typeof request.displayName !== "undefined" && typeof request.displayName !== "string") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DISPLAY_NAME, `The provider "displayName" for "${request.providerId}" must be a valid string.`);
      }
      if (!validator2.isNonEmptyString(request.rawId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID, `The provider "uid" for "${request.providerId}" must be a valid non-empty string.`);
      }
      if (typeof request.email !== "undefined" && !validator2.isEmail(request.email)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL, `The provider "email" for "${request.providerId}" must be a valid email string.`);
      }
      if (typeof request.photoUrl !== "undefined" && !validator2.isURL(request.photoUrl)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHOTO_URL, `The provider "photoURL" for "${request.providerId}" must be a valid URL string.`);
      }
    }
    function validateCreateEditRequest(request, writeOperationType) {
      const uploadAccountRequest = writeOperationType === WriteOperationType.Upload;
      const validKeys = {
        displayName: true,
        localId: true,
        email: true,
        password: true,
        rawPassword: true,
        emailVerified: true,
        photoUrl: true,
        disabled: true,
        disableUser: true,
        deleteAttribute: true,
        deleteProvider: true,
        sanityCheck: true,
        phoneNumber: true,
        customAttributes: true,
        validSince: true,
        // Pass linkProviderUserInfo only for updates (i.e. not for uploads.)
        linkProviderUserInfo: !uploadAccountRequest,
        // Pass tenantId only for uploadAccount requests.
        tenantId: uploadAccountRequest,
        passwordHash: uploadAccountRequest,
        salt: uploadAccountRequest,
        createdAt: uploadAccountRequest,
        lastLoginAt: uploadAccountRequest,
        providerUserInfo: uploadAccountRequest,
        mfaInfo: uploadAccountRequest,
        // Only for non-uploadAccount requests.
        mfa: !uploadAccountRequest
      };
      for (const key in request) {
        if (!(key in validKeys)) {
          delete request[key];
        }
      }
      if (typeof request.tenantId !== "undefined" && !validator2.isNonEmptyString(request.tenantId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TENANT_ID);
      }
      if (typeof request.displayName !== "undefined" && !validator2.isString(request.displayName)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DISPLAY_NAME);
      }
      if ((typeof request.localId !== "undefined" || uploadAccountRequest) && !validator2.isUid(request.localId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID);
      }
      if (typeof request.email !== "undefined" && !validator2.isEmail(request.email)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL);
      }
      if (typeof request.phoneNumber !== "undefined" && !validator2.isPhoneNumber(request.phoneNumber)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHONE_NUMBER);
      }
      if (typeof request.password !== "undefined" && !validator2.isPassword(request.password)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD);
      }
      if (typeof request.rawPassword !== "undefined" && !validator2.isPassword(request.rawPassword)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD);
      }
      if (typeof request.emailVerified !== "undefined" && typeof request.emailVerified !== "boolean") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL_VERIFIED);
      }
      if (typeof request.photoUrl !== "undefined" && !validator2.isURL(request.photoUrl)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHOTO_URL);
      }
      if (typeof request.disabled !== "undefined" && typeof request.disabled !== "boolean") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DISABLED_FIELD);
      }
      if (typeof request.validSince !== "undefined" && !validator2.isNumber(request.validSince)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TOKENS_VALID_AFTER_TIME);
      }
      if (typeof request.createdAt !== "undefined" && !validator2.isNumber(request.createdAt)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CREATION_TIME);
      }
      if (typeof request.lastLoginAt !== "undefined" && !validator2.isNumber(request.lastLoginAt)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_LAST_SIGN_IN_TIME);
      }
      if (typeof request.disableUser !== "undefined" && typeof request.disableUser !== "boolean") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_DISABLED_FIELD);
      }
      if (typeof request.customAttributes !== "undefined") {
        let developerClaims;
        try {
          developerClaims = JSON.parse(request.customAttributes);
        } catch (error2) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CLAIMS, error2.message);
        }
        const invalidClaims = [];
        exports.RESERVED_CLAIMS.forEach((blacklistedClaim) => {
          if (Object.prototype.hasOwnProperty.call(developerClaims, blacklistedClaim)) {
            invalidClaims.push(blacklistedClaim);
          }
        });
        if (invalidClaims.length > 0) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.FORBIDDEN_CLAIM, invalidClaims.length > 1 ? `Developer claims "${invalidClaims.join('", "')}" are reserved and cannot be specified.` : `Developer claim "${invalidClaims[0]}" is reserved and cannot be specified.`);
        }
        if (request.customAttributes.length > MAX_CLAIMS_PAYLOAD_SIZE) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.CLAIMS_TOO_LARGE, `Developer claims payload should not exceed ${MAX_CLAIMS_PAYLOAD_SIZE} characters.`);
        }
      }
      if (typeof request.passwordHash !== "undefined" && !validator2.isString(request.passwordHash)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD_HASH);
      }
      if (typeof request.salt !== "undefined" && !validator2.isString(request.salt)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PASSWORD_SALT);
      }
      if (typeof request.providerUserInfo !== "undefined" && !validator2.isArray(request.providerUserInfo)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_DATA);
      } else if (validator2.isArray(request.providerUserInfo)) {
        request.providerUserInfo.forEach((providerUserInfoEntry) => {
          validateProviderUserInfo(providerUserInfoEntry);
        });
      }
      if (typeof request.linkProviderUserInfo !== "undefined") {
        validateProviderUserInfo(request.linkProviderUserInfo);
      }
      let enrollments = null;
      if (request.mfaInfo) {
        enrollments = request.mfaInfo;
      } else if (request.mfa && request.mfa.enrollments) {
        enrollments = request.mfa.enrollments;
      }
      if (enrollments) {
        if (!validator2.isArray(enrollments)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ENROLLED_FACTORS);
        }
        enrollments.forEach((authFactorInfoEntry) => {
          validateAuthFactorInfo(authFactorInfoEntry);
        });
      }
    }
    exports.FIREBASE_AUTH_CREATE_SESSION_COOKIE = new api_request_1.ApiSettings(":createSessionCookie", "POST").setRequestValidator((request) => {
      if (!validator2.isNonEmptyString(request.idToken)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ID_TOKEN);
      }
      if (!validator2.isNumber(request.validDuration) || request.validDuration < MIN_SESSION_COOKIE_DURATION_SECS || request.validDuration > MAX_SESSION_COOKIE_DURATION_SECS) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_SESSION_COOKIE_DURATION);
      }
    }).setResponseValidator((response) => {
      if (!validator2.isNonEmptyString(response.data?.sessionCookie)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    exports.FIREBASE_AUTH_UPLOAD_ACCOUNT = new api_request_1.ApiSettings("/accounts:batchCreate", "POST");
    exports.FIREBASE_AUTH_DOWNLOAD_ACCOUNT = new api_request_1.ApiSettings("/accounts:batchGet", "GET").setRequestValidator((request) => {
      if (typeof request.nextPageToken !== "undefined" && !validator2.isNonEmptyString(request.nextPageToken)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PAGE_TOKEN);
      }
      if (!validator2.isNumber(request.maxResults) || request.maxResults <= 0 || request.maxResults > MAX_DOWNLOAD_ACCOUNT_PAGE_SIZE) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `Required "maxResults" must be a positive integer that does not exceed ${MAX_DOWNLOAD_ACCOUNT_PAGE_SIZE}.`);
      }
    });
    exports.FIREBASE_AUTH_GET_ACCOUNT_INFO = new api_request_1.ApiSettings("/accounts:lookup", "POST").setRequestValidator((request) => {
      if (!request.localId && !request.email && !request.phoneNumber && !request.federatedUserId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing user identifier");
      }
    }).setResponseValidator((response) => {
      const data = response.data;
      if (!data.users || !data.users.length) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.USER_NOT_FOUND,
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    exports.FIREBASE_AUTH_GET_ACCOUNTS_INFO = new api_request_1.ApiSettings("/accounts:lookup", "POST").setRequestValidator((request) => {
      if (!request.localId && !request.email && !request.phoneNumber && !request.federatedUserId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing user identifier");
      }
    });
    exports.FIREBASE_AUTH_DELETE_ACCOUNT = new api_request_1.ApiSettings("/accounts:delete", "POST").setRequestValidator((request) => {
      if (!request.localId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing user identifier");
      }
    });
    exports.FIREBASE_AUTH_BATCH_DELETE_ACCOUNTS = new api_request_1.ApiSettings("/accounts:batchDelete", "POST").setRequestValidator((request) => {
      if (!request.localIds) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing user identifiers");
      }
      if (typeof request.force === "undefined" || request.force !== true) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing force=true field");
      }
    }).setResponseValidator((response) => {
      const data = response.data;
      const errors = data.errors || [];
      errors.forEach((batchDeleteErrorInfo) => {
        if (typeof batchDeleteErrorInfo.index === "undefined") {
          throw new error_1.FirebaseAuthError({
            ...error_1.authClientErrorCode.INTERNAL_ERROR,
            message: "INTERNAL ASSERT FAILED: Server BatchDeleteAccountResponse is missing an errors.index field",
            httpResponse: (0, error_2.toHttpResponse)(response)
          });
        }
        if (!batchDeleteErrorInfo.localId) {
          throw new error_1.FirebaseAuthError({
            ...error_1.authClientErrorCode.INTERNAL_ERROR,
            message: "INTERNAL ASSERT FAILED: Server BatchDeleteAccountResponse is missing an errors.localId field",
            httpResponse: (0, error_2.toHttpResponse)(response)
          });
        }
      });
    });
    exports.FIREBASE_AUTH_SET_ACCOUNT_INFO = new api_request_1.ApiSettings("/accounts:update", "POST").setRequestValidator((request) => {
      if (typeof request.localId === "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Server request is missing user identifier");
      }
      if (typeof request.tenantId !== "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"tenantId" is an invalid "UpdateRequest" property.');
      }
      validateCreateEditRequest(request, WriteOperationType.Update);
    }).setResponseValidator((response) => {
      const data = response.data;
      if (!data?.localId) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.USER_NOT_FOUND,
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    exports.FIREBASE_AUTH_SIGN_UP_NEW_USER = new api_request_1.ApiSettings("/accounts", "POST").setRequestValidator((request) => {
      if (typeof request.customAttributes !== "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"customAttributes" cannot be set when creating a new user.');
      }
      if (typeof request.validSince !== "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"validSince" cannot be set when creating a new user.');
      }
      if (typeof request.tenantId !== "undefined") {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"tenantId" is an invalid "CreateRequest" property.');
      }
      validateCreateEditRequest(request, WriteOperationType.Create);
    }).setResponseValidator((response) => {
      const data = response.data;
      if (!data?.localId) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to create new user",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const FIREBASE_AUTH_GET_OOB_CODE = new api_request_1.ApiSettings("/accounts:sendOobCode", "POST").setRequestValidator((request) => {
      if (!validator2.isEmail(request.email)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL);
      }
      if (typeof request.newEmail !== "undefined" && !validator2.isEmail(request.newEmail)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_NEW_EMAIL);
      }
      if (exports.EMAIL_ACTION_REQUEST_TYPES.indexOf(request.requestType) === -1) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `"${request.requestType}" is not a supported email action request type.`);
      }
    }).setResponseValidator((response) => {
      const data = response.data;
      if (!data?.oobLink) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to create the email action link",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const GET_OAUTH_IDP_CONFIG = new api_request_1.ApiSettings("/oauthIdpConfigs/{providerId}", "GET").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to get OIDC configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const DELETE_OAUTH_IDP_CONFIG = new api_request_1.ApiSettings("/oauthIdpConfigs/{providerId}", "DELETE");
    const CREATE_OAUTH_IDP_CONFIG = new api_request_1.ApiSettings("/oauthIdpConfigs?oauthIdpConfigId={providerId}", "POST").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to create new OIDC configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const UPDATE_OAUTH_IDP_CONFIG = new api_request_1.ApiSettings("/oauthIdpConfigs/{providerId}?updateMask={updateMask}", "PATCH").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to update OIDC configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const LIST_OAUTH_IDP_CONFIGS = new api_request_1.ApiSettings("/oauthIdpConfigs", "GET").setRequestValidator((request) => {
      if (typeof request.pageToken !== "undefined" && !validator2.isNonEmptyString(request.pageToken)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PAGE_TOKEN);
      }
      if (!validator2.isNumber(request.pageSize) || request.pageSize <= 0 || request.pageSize > MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `Required "maxResults" must be a positive integer that does not exceed ${MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE}.`);
      }
    });
    const GET_INBOUND_SAML_CONFIG = new api_request_1.ApiSettings("/inboundSamlConfigs/{providerId}", "GET").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to get SAML configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const DELETE_INBOUND_SAML_CONFIG = new api_request_1.ApiSettings("/inboundSamlConfigs/{providerId}", "DELETE");
    const CREATE_INBOUND_SAML_CONFIG = new api_request_1.ApiSettings("/inboundSamlConfigs?inboundSamlConfigId={providerId}", "POST").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to create new SAML configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const UPDATE_INBOUND_SAML_CONFIG = new api_request_1.ApiSettings("/inboundSamlConfigs/{providerId}?updateMask={updateMask}", "PATCH").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to update SAML configuration",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const LIST_INBOUND_SAML_CONFIGS = new api_request_1.ApiSettings("/inboundSamlConfigs", "GET").setRequestValidator((request) => {
      if (typeof request.pageToken !== "undefined" && !validator2.isNonEmptyString(request.pageToken)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PAGE_TOKEN);
      }
      if (!validator2.isNumber(request.pageSize) || request.pageSize <= 0 || request.pageSize > MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `Required "maxResults" must be a positive integer that does not exceed ${MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE}.`);
      }
    });
    class AbstractAuthRequestHandler {
      /**
       * @param response - The response to check for errors.
       * @returns The error code if present; null otherwise.
       */
      static getErrorCode(response) {
        return validator2.isNonNullObject(response) && response.error && response.error.message || null;
      }
      static addUidToRequest(id, request) {
        if (!validator2.isUid(id.uid)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID);
        }
        request.localId ? request.localId.push(id.uid) : request.localId = [id.uid];
        return request;
      }
      static addEmailToRequest(id, request) {
        if (!validator2.isEmail(id.email)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL);
        }
        request.email ? request.email.push(id.email) : request.email = [id.email];
        return request;
      }
      static addPhoneToRequest(id, request) {
        if (!validator2.isPhoneNumber(id.phoneNumber)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHONE_NUMBER);
        }
        request.phoneNumber ? request.phoneNumber.push(id.phoneNumber) : request.phoneNumber = [id.phoneNumber];
        return request;
      }
      static addProviderToRequest(id, request) {
        if (!validator2.isNonEmptyString(id.providerId)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID);
        }
        if (!validator2.isNonEmptyString(id.providerUid)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_UID);
        }
        const federatedUserId = {
          providerId: id.providerId,
          rawId: id.providerUid
        };
        request.federatedUserId ? request.federatedUserId.push(federatedUserId) : request.federatedUserId = [federatedUserId];
        return request;
      }
      /**
       * @param app - The app used to fetch access tokens to sign API requests.
       * @param emHost - Optional emulator host override. When provided (including
       *     null for explicitly no emulator), this value is used instead of reading
       *     from the FIREBASE_AUTH_EMULATOR_HOST environment variable.
       * @constructor
       */
      constructor(app2, emHost) {
        this.app = app2;
        if (typeof app2 !== "object" || app2 === null || !("options" in app2)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "First argument passed to admin.auth() must be a valid Firebase app instance.");
        }
        this.emulatorHostValue = emHost !== void 0 ? emHost || void 0 : emulatorHost();
        this.httpClient = new AuthHttpClient(app2, !!this.emulatorHostValue);
      }
      /**
       * Creates a new Firebase session cookie with the specified duration that can be used for
       * session management (set as a server side session cookie with custom cookie policy).
       * The session cookie JWT will have the same payload claims as the provided ID token.
       *
       * @param idToken - The Firebase ID token to exchange for a session cookie.
       * @param expiresIn - The session cookie duration in milliseconds.
       *
       * @returns A promise that resolves on success with the created session cookie.
       */
      createSessionCookie(idToken, expiresIn) {
        const request = {
          idToken,
          // Convert to seconds.
          validDuration: Math.floor(expiresIn / 1e3)
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_CREATE_SESSION_COOKIE, request).then((response) => response.sessionCookie);
      }
      /**
       * Looks up a user by uid.
       *
       * @param uid - The uid of the user to lookup.
       * @returns A promise that resolves with the user information.
       */
      getAccountInfoByUid(uid) {
        if (!validator2.isUid(uid)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID));
        }
        const request = {
          localId: [uid]
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_GET_ACCOUNT_INFO, request);
      }
      /**
       * Looks up a user by email.
       *
       * @param email - The email of the user to lookup.
       * @returns A promise that resolves with the user information.
       */
      getAccountInfoByEmail(email) {
        if (!validator2.isEmail(email)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_EMAIL));
        }
        const request = {
          email: [email]
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_GET_ACCOUNT_INFO, request);
      }
      /**
       * Looks up a user by phone number.
       *
       * @param phoneNumber - The phone number of the user to lookup.
       * @returns A promise that resolves with the user information.
       */
      getAccountInfoByPhoneNumber(phoneNumber) {
        if (!validator2.isPhoneNumber(phoneNumber)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PHONE_NUMBER));
        }
        const request = {
          phoneNumber: [phoneNumber]
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_GET_ACCOUNT_INFO, request);
      }
      getAccountInfoByFederatedUid(providerId, rawId) {
        if (!validator2.isNonEmptyString(providerId) || !validator2.isNonEmptyString(rawId)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID);
        }
        const request = {
          federatedUserId: [{
            providerId,
            rawId
          }]
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_GET_ACCOUNT_INFO, request);
      }
      /**
       * Looks up multiple users by their identifiers (uid, email, etc).
       *
       * @param identifiers - The identifiers indicating the users
       *     to be looked up. Must have <= 100 entries.
       * @param A - promise that resolves with the set of successfully
       *     looked up users. Possibly empty if no users were looked up.
       */
      getAccountInfoByIdentifiers(identifiers) {
        if (identifiers.length === 0) {
          return Promise.resolve({ users: [] });
        } else if (identifiers.length > MAX_GET_ACCOUNTS_BATCH_SIZE) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MAXIMUM_USER_COUNT_EXCEEDED, "`identifiers` parameter must have <= " + MAX_GET_ACCOUNTS_BATCH_SIZE + " entries.");
        }
        let request = {};
        for (const id of identifiers) {
          if ((0, identifier_1.isUidIdentifier)(id)) {
            request = AbstractAuthRequestHandler.addUidToRequest(id, request);
          } else if ((0, identifier_1.isEmailIdentifier)(id)) {
            request = AbstractAuthRequestHandler.addEmailToRequest(id, request);
          } else if ((0, identifier_1.isPhoneIdentifier)(id)) {
            request = AbstractAuthRequestHandler.addPhoneToRequest(id, request);
          } else if ((0, identifier_1.isProviderIdentifier)(id)) {
            request = AbstractAuthRequestHandler.addProviderToRequest(id, request);
          } else {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Unrecognized identifier: " + id);
          }
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_GET_ACCOUNTS_INFO, request);
      }
      /**
       * Exports the users (single batch only) with a size of maxResults and starting from
       * the offset as specified by pageToken.
       *
       * @param maxResults - The page size, 1000 if undefined. This is also the maximum
       *     allowed limit.
       * @param pageToken - The next page token. If not specified, returns users starting
       *     without any offset. Users are returned in the order they were created from oldest to
       *     newest, relative to the page token offset.
       * @returns A promise that resolves with the current batch of downloaded
       *     users and the next page token if available. For the last page, an empty list of users
       *     and no page token are returned.
       */
      downloadAccount(maxResults = MAX_DOWNLOAD_ACCOUNT_PAGE_SIZE, pageToken) {
        const request = {
          maxResults,
          nextPageToken: pageToken
        };
        if (typeof request.nextPageToken === "undefined") {
          delete request.nextPageToken;
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_DOWNLOAD_ACCOUNT, request).then((response) => {
          if (!response.users) {
            response.users = [];
          }
          return response;
        });
      }
      /**
       * Imports the list of users provided to Firebase Auth. This is useful when
       * migrating from an external authentication system without having to use the Firebase CLI SDK.
       * At most, 1000 users are allowed to be imported one at a time.
       * When importing a list of password users, UserImportOptions are required to be specified.
       *
       * @param users - The list of user records to import to Firebase Auth.
       * @param options - The user import options, required when the users provided
       *     include password credentials.
       * @returns A promise that resolves when the operation completes
       *     with the result of the import. This includes the number of successful imports, the number
       *     of failed uploads and their corresponding errors.
       */
      uploadAccount(users, options) {
        const userImportBuilder2 = new user_import_builder_1.UserImportBuilder(users, options, (userRequest) => {
          validateCreateEditRequest(userRequest, WriteOperationType.Upload);
        });
        const request = userImportBuilder2.buildRequest();
        if (validator2.isArray(users) && users.length > MAX_UPLOAD_ACCOUNT_BATCH_SIZE) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MAXIMUM_USER_COUNT_EXCEEDED, `A maximum of ${MAX_UPLOAD_ACCOUNT_BATCH_SIZE} users can be imported at once.`);
        }
        if (!request.users || request.users.length === 0) {
          return Promise.resolve(userImportBuilder2.buildResponse([]));
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_UPLOAD_ACCOUNT, request).then((response) => {
          const failedUploads = response.error || [];
          return userImportBuilder2.buildResponse(failedUploads);
        });
      }
      /**
       * Deletes an account identified by a uid.
       *
       * @param uid - The uid of the user to delete.
       * @returns A promise that resolves when the user is deleted.
       */
      deleteAccount(uid) {
        if (!validator2.isUid(uid)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID));
        }
        const request = {
          localId: uid
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_DELETE_ACCOUNT, request);
      }
      deleteAccounts(uids, force) {
        if (uids.length === 0) {
          return Promise.resolve({});
        } else if (uids.length > MAX_DELETE_ACCOUNTS_BATCH_SIZE) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MAXIMUM_USER_COUNT_EXCEEDED, "`uids` parameter must have <= " + MAX_DELETE_ACCOUNTS_BATCH_SIZE + " entries.");
        }
        const request = {
          localIds: [],
          force
        };
        uids.forEach((uid) => {
          if (!validator2.isUid(uid)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID);
          }
          request.localIds.push(uid);
        });
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_BATCH_DELETE_ACCOUNTS, request);
      }
      /**
       * Sets additional developer claims on an existing user identified by provided UID.
       *
       * @param uid - The user to edit.
       * @param customUserClaims - The developer claims to set.
       * @returns A promise that resolves when the operation completes
       *     with the user id that was edited.
       */
      setCustomUserClaims(uid, customUserClaims) {
        if (!validator2.isUid(uid)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID));
        } else if (!validator2.isObject(customUserClaims)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "CustomUserClaims argument must be an object or null."));
        }
        if (customUserClaims === null) {
          customUserClaims = {};
        }
        const request = {
          localId: uid,
          customAttributes: JSON.stringify(customUserClaims)
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_SET_ACCOUNT_INFO, request).then((response) => {
          return response.localId;
        });
      }
      /**
       * Edits an existing user.
       *
       * @param uid - The user to edit.
       * @param properties - The properties to set on the user.
       * @returns A promise that resolves when the operation completes
       *     with the user id that was edited.
       */
      updateExistingAccount(uid, properties) {
        if (!validator2.isUid(uid)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID));
        } else if (!validator2.isNonNullObject(properties)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Properties argument must be a non-null object."));
        } else if (validator2.isNonNullObject(properties.providerToLink)) {
          if (!validator2.isNonEmptyString(properties.providerToLink.providerId)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "providerToLink.providerId of properties argument must be a non-empty string.");
          }
          if (!validator2.isNonEmptyString(properties.providerToLink.uid)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "providerToLink.uid of properties argument must be a non-empty string.");
          }
        } else if (typeof properties.providersToUnlink !== "undefined") {
          if (!validator2.isArray(properties.providersToUnlink)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "providersToUnlink of properties argument must be an array of strings.");
          }
          properties.providersToUnlink.forEach((providerId) => {
            if (!validator2.isNonEmptyString(providerId)) {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "providersToUnlink of properties argument must be an array of strings.");
            }
          });
        }
        const request = (0, deep_copy_1.deepCopy)(properties);
        request.localId = uid;
        const deletableParams = {
          displayName: "DISPLAY_NAME",
          photoURL: "PHOTO_URL"
        };
        request.deleteAttribute = [];
        for (const key in deletableParams) {
          if (request[key] === null) {
            request.deleteAttribute.push(deletableParams[key]);
            delete request[key];
          }
        }
        if (request.deleteAttribute.length === 0) {
          delete request.deleteAttribute;
        }
        if (request.phoneNumber === null) {
          request.deleteProvider ? request.deleteProvider.push("phone") : request.deleteProvider = ["phone"];
          delete request.phoneNumber;
        }
        if (typeof request.providerToLink !== "undefined") {
          request.linkProviderUserInfo = (0, deep_copy_1.deepCopy)(request.providerToLink);
          delete request.providerToLink;
          request.linkProviderUserInfo.rawId = request.linkProviderUserInfo.uid;
          delete request.linkProviderUserInfo.uid;
        }
        if (typeof request.providersToUnlink !== "undefined") {
          if (!validator2.isArray(request.deleteProvider)) {
            request.deleteProvider = [];
          }
          request.deleteProvider = request.deleteProvider.concat(request.providersToUnlink);
          delete request.providersToUnlink;
        }
        if (typeof request.photoURL !== "undefined") {
          request.photoUrl = request.photoURL;
          delete request.photoURL;
        }
        if (typeof request.disabled !== "undefined") {
          request.disableUser = request.disabled;
          delete request.disabled;
        }
        if (validator2.isNonNullObject(request.multiFactor)) {
          if (request.multiFactor.enrolledFactors === null) {
            request.mfa = {};
          } else if (validator2.isArray(request.multiFactor.enrolledFactors)) {
            request.mfa = {
              enrollments: []
            };
            try {
              request.multiFactor.enrolledFactors.forEach((multiFactorInfo) => {
                request.mfa.enrollments.push((0, user_import_builder_1.convertMultiFactorInfoToServerFormat)(multiFactorInfo));
              });
            } catch (e) {
              return Promise.reject(e);
            }
            if (request.mfa.enrollments.length === 0) {
              delete request.mfa.enrollments;
            }
          }
          delete request.multiFactor;
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_SET_ACCOUNT_INFO, request).then((response) => {
          return response.localId;
        });
      }
      /**
       * Revokes all refresh tokens for the specified user identified by the uid provided.
       * In addition to revoking all refresh tokens for a user, all ID tokens issued
       * before revocation will also be revoked on the Auth backend. Any request with an
       * ID token generated before revocation will be rejected with a token expired error.
       * Note that due to the fact that the timestamp is stored in seconds, any tokens minted in
       * the same second as the revocation will still be valid. If there is a chance that a token
       * was minted in the last second, delay for 1 second before revoking.
       *
       * @param uid - The user whose tokens are to be revoked.
       * @returns A promise that resolves when the operation completes
       *     successfully with the user id of the corresponding user.
       */
      revokeRefreshTokens(uid) {
        if (!validator2.isUid(uid)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_UID));
        }
        const request = {
          localId: uid,
          // validSince is in UTC seconds.
          validSince: Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3)
        };
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_SET_ACCOUNT_INFO, request).then((response) => {
          return response.localId;
        });
      }
      /**
       * Create a new user with the properties supplied.
       *
       * @param properties - The properties to set on the user.
       * @returns A promise that resolves when the operation completes
       *     with the user id that was created.
       */
      createNewAccount(properties) {
        if (!validator2.isNonNullObject(properties)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Properties argument must be a non-null object."));
        }
        const request = (0, deep_copy_1.deepCopy)(properties);
        if (typeof request.photoURL !== "undefined") {
          request.photoUrl = request.photoURL;
          delete request.photoURL;
        }
        if (typeof request.uid !== "undefined") {
          request.localId = request.uid;
          delete request.uid;
        }
        if (validator2.isNonNullObject(request.multiFactor)) {
          if (validator2.isNonEmptyArray(request.multiFactor.enrolledFactors)) {
            const mfaInfo = [];
            try {
              request.multiFactor.enrolledFactors.forEach((multiFactorInfo) => {
                if ("enrollmentTime" in multiFactorInfo) {
                  throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"enrollmentTime" is not supported when adding second factors via "createUser()"');
                } else if ("uid" in multiFactorInfo) {
                  throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"uid" is not supported when adding second factors via "createUser()"');
                }
                mfaInfo.push((0, user_import_builder_1.convertMultiFactorInfoToServerFormat)(multiFactorInfo));
              });
            } catch (e) {
              return Promise.reject(e);
            }
            request.mfaInfo = mfaInfo;
          }
          delete request.multiFactor;
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), exports.FIREBASE_AUTH_SIGN_UP_NEW_USER, request).then((response) => {
          return response.localId;
        });
      }
      /**
       * Generates the out of band email action link for the email specified using the action code settings provided.
       * Returns a promise that resolves with the generated link.
       *
       * @param requestType - The request type. This could be either used for password reset,
       *     email verification, email link sign-in.
       * @param email - The email of the user the link is being sent to.
       * @param actionCodeSettings - The optional action code setings which defines whether
       *     the link is to be handled by a mobile app and the additional state information to be passed in the
       *     deep link, etc. Required when requestType === 'EMAIL_SIGNIN'
       * @param newEmail - The email address the account is being updated to.
       *     Required only for VERIFY_AND_CHANGE_EMAIL requests.
       * @returns A promise that resolves with the email action link.
       */
      getEmailActionLink(requestType, email, actionCodeSettings, newEmail) {
        let request = {
          requestType,
          email,
          returnOobLink: true,
          ...typeof newEmail !== "undefined" && { newEmail }
        };
        if (typeof actionCodeSettings === "undefined" && requestType === "EMAIL_SIGNIN") {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "`actionCodeSettings` is required when `requestType` === 'EMAIL_SIGNIN'"));
        }
        if (typeof actionCodeSettings !== "undefined" || requestType === "EMAIL_SIGNIN") {
          try {
            const builder = new action_code_settings_builder_1.ActionCodeSettingsBuilder(actionCodeSettings);
            request = (0, deep_copy_1.deepExtend)(request, builder.buildRequest());
          } catch (e) {
            return Promise.reject(e);
          }
        }
        if (requestType === "VERIFY_AND_CHANGE_EMAIL" && typeof newEmail === "undefined") {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "`newEmail` is required when `requestType` === 'VERIFY_AND_CHANGE_EMAIL'"));
        }
        return this.invokeRequestHandler(this.getAuthUrlBuilder(), FIREBASE_AUTH_GET_OOB_CODE, request).then((response) => {
          return response.oobLink;
        });
      }
      /**
       * Looks up an OIDC provider configuration by provider ID.
       *
       * @param providerId - The provider identifier of the configuration to lookup.
       * @returns A promise that resolves with the provider configuration information.
       */
      getOAuthIdpConfig(providerId) {
        if (!auth_config_1.OIDCConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), GET_OAUTH_IDP_CONFIG, {}, { providerId });
      }
      /**
       * Lists the OIDC configurations (single batch only) with a size of maxResults and starting from
       * the offset as specified by pageToken.
       *
       * @param maxResults - The page size, 100 if undefined. This is also the maximum
       *     allowed limit.
       * @param pageToken - The next page token. If not specified, returns OIDC configurations
       *     without any offset. Configurations are returned in the order they were created from oldest to
       *     newest, relative to the page token offset.
       * @returns A promise that resolves with the current batch of downloaded
       *     OIDC configurations and the next page token if available. For the last page, an empty list of provider
       *     configuration and no page token are returned.
       */
      listOAuthIdpConfigs(maxResults = MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE, pageToken) {
        const request = {
          pageSize: maxResults
        };
        if (typeof pageToken !== "undefined") {
          request.pageToken = pageToken;
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), LIST_OAUTH_IDP_CONFIGS, request).then((response) => {
          if (!response.oauthIdpConfigs) {
            response.oauthIdpConfigs = [];
            delete response.nextPageToken;
          }
          return response;
        });
      }
      /**
       * Deletes an OIDC configuration identified by a providerId.
       *
       * @param providerId - The identifier of the OIDC configuration to delete.
       * @returns A promise that resolves when the OIDC provider is deleted.
       */
      deleteOAuthIdpConfig(providerId) {
        if (!auth_config_1.OIDCConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), DELETE_OAUTH_IDP_CONFIG, {}, { providerId }).then(() => {
        });
      }
      /**
       * Creates a new OIDC provider configuration with the properties provided.
       *
       * @param options - The properties to set on the new OIDC provider configuration to be created.
       * @returns A promise that resolves with the newly created OIDC
       *     configuration.
       */
      createOAuthIdpConfig(options) {
        let request;
        try {
          request = auth_config_1.OIDCConfig.buildServerRequest(options) || {};
        } catch (e) {
          return Promise.reject(e);
        }
        const providerId = options.providerId;
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), CREATE_OAUTH_IDP_CONFIG, request, { providerId }).then((response) => {
          if (!auth_config_1.OIDCConfig.getProviderIdFromResourceName(response.name)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Unable to create new OIDC provider configuration");
          }
          return response;
        });
      }
      /**
       * Updates an existing OIDC provider configuration with the properties provided.
       *
       * @param providerId - The provider identifier of the OIDC configuration to update.
       * @param options - The properties to update on the existing configuration.
       * @returns A promise that resolves with the modified provider
       *     configuration.
       */
      updateOAuthIdpConfig(providerId, options) {
        if (!auth_config_1.OIDCConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        let request;
        try {
          request = auth_config_1.OIDCConfig.buildServerRequest(options, true) || {};
        } catch (e) {
          return Promise.reject(e);
        }
        const updateMask = utils2.generateUpdateMask(request);
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), UPDATE_OAUTH_IDP_CONFIG, request, { providerId, updateMask: updateMask.join(",") }).then((response) => {
          if (!auth_config_1.OIDCConfig.getProviderIdFromResourceName(response.name)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Unable to update OIDC provider configuration");
          }
          return response;
        });
      }
      /**
       * Looks up an SAML provider configuration by provider ID.
       *
       * @param providerId - The provider identifier of the configuration to lookup.
       * @returns A promise that resolves with the provider configuration information.
       */
      getInboundSamlConfig(providerId) {
        if (!auth_config_1.SAMLConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), GET_INBOUND_SAML_CONFIG, {}, { providerId });
      }
      /**
       * Lists the SAML configurations (single batch only) with a size of maxResults and starting from
       * the offset as specified by pageToken.
       *
       * @param maxResults - The page size, 100 if undefined. This is also the maximum
       *     allowed limit.
       * @param pageToken - The next page token. If not specified, returns SAML configurations starting
       *     without any offset. Configurations are returned in the order they were created from oldest to
       *     newest, relative to the page token offset.
       * @returns A promise that resolves with the current batch of downloaded
       *     SAML configurations and the next page token if available. For the last page, an empty list of provider
       *     configuration and no page token are returned.
       */
      listInboundSamlConfigs(maxResults = MAX_LIST_PROVIDER_CONFIGURATION_PAGE_SIZE, pageToken) {
        const request = {
          pageSize: maxResults
        };
        if (typeof pageToken !== "undefined") {
          request.pageToken = pageToken;
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), LIST_INBOUND_SAML_CONFIGS, request).then((response) => {
          if (!response.inboundSamlConfigs) {
            response.inboundSamlConfigs = [];
            delete response.nextPageToken;
          }
          return response;
        });
      }
      /**
       * Deletes a SAML configuration identified by a providerId.
       *
       * @param providerId - The identifier of the SAML configuration to delete.
       * @returns A promise that resolves when the SAML provider is deleted.
       */
      deleteInboundSamlConfig(providerId) {
        if (!auth_config_1.SAMLConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), DELETE_INBOUND_SAML_CONFIG, {}, { providerId }).then(() => {
        });
      }
      /**
       * Creates a new SAML provider configuration with the properties provided.
       *
       * @param options - The properties to set on the new SAML provider configuration to be created.
       * @returns A promise that resolves with the newly created SAML
       *     configuration.
       */
      createInboundSamlConfig(options) {
        let request;
        try {
          request = auth_config_1.SAMLConfig.buildServerRequest(options) || {};
        } catch (e) {
          return Promise.reject(e);
        }
        const providerId = options.providerId;
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), CREATE_INBOUND_SAML_CONFIG, request, { providerId }).then((response) => {
          if (!auth_config_1.SAMLConfig.getProviderIdFromResourceName(response.name)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Unable to create new SAML provider configuration");
          }
          return response;
        });
      }
      /**
       * Updates an existing SAML provider configuration with the properties provided.
       *
       * @param providerId - The provider identifier of the SAML configuration to update.
       * @param options - The properties to update on the existing configuration.
       * @returns A promise that resolves with the modified provider
       *     configuration.
       */
      updateInboundSamlConfig(providerId, options) {
        if (!auth_config_1.SAMLConfig.isProviderId(providerId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
        }
        let request;
        try {
          request = auth_config_1.SAMLConfig.buildServerRequest(options, true) || {};
        } catch (e) {
          return Promise.reject(e);
        }
        const updateMask = utils2.generateUpdateMask(request);
        return this.invokeRequestHandler(this.getProjectConfigUrlBuilder(), UPDATE_INBOUND_SAML_CONFIG, request, { providerId, updateMask: updateMask.join(",") }).then((response) => {
          if (!auth_config_1.SAMLConfig.getProviderIdFromResourceName(response.name)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Unable to update SAML provider configuration");
          }
          return response;
        });
      }
      /**
       * Invokes the request handler based on the API settings object passed.
       *
       * @param urlBuilder - The URL builder for Auth endpoints.
       * @param apiSettings - The API endpoint settings to apply to request and response.
       * @param requestData - The request data.
       * @param additionalResourceParams - Additional resource related params if needed.
       * @returns A promise that resolves with the response.
       */
      invokeRequestHandler(urlBuilder, apiSettings, requestData, additionalResourceParams) {
        return urlBuilder.getUrl(apiSettings.getEndpoint(), additionalResourceParams).then((url) => {
          if (requestData) {
            const requestValidator = apiSettings.getRequestValidator();
            requestValidator(requestData);
          }
          const req = {
            method: apiSettings.getHttpMethod(),
            url,
            headers: FIREBASE_AUTH_HEADERS,
            data: requestData,
            timeout: FIREBASE_AUTH_TIMEOUT
          };
          return this.httpClient.send(req);
        }).then((response) => {
          const responseValidator = apiSettings.getResponseValidator();
          if (responseValidator) {
            responseValidator(response);
          }
          return response.data;
        }).catch((err) => {
          if (err instanceof api_request_1.RequestResponseError) {
            const errorCode = AbstractAuthRequestHandler.getErrorCode(err.response.data);
            if (!errorCode) {
              throw new error_1.FirebaseAuthError({
                ...error_1.authClientErrorCode.INTERNAL_ERROR,
                message: "An internal error occurred while attempting to extract the errorcode from the error.",
                cause: err,
                httpResponse: (0, error_2.toHttpResponse)(err.response)
              });
            }
            throw error_1.FirebaseAuthError.fromServerError(
              errorCode,
              /* message */
              void 0,
              err
            );
          }
          throw err;
        });
      }
      /**
       * @returns The current Auth user management resource URL builder.
       */
      getAuthUrlBuilder() {
        if (!this.authUrlBuilder) {
          this.authUrlBuilder = this.newAuthUrlBuilder();
        }
        return this.authUrlBuilder;
      }
      /**
       * @returns The current project config resource URL builder.
       */
      getProjectConfigUrlBuilder() {
        if (!this.projectConfigUrlBuilder) {
          this.projectConfigUrlBuilder = this.newProjectConfigUrlBuilder();
        }
        return this.projectConfigUrlBuilder;
      }
    }
    exports.AbstractAuthRequestHandler = AbstractAuthRequestHandler;
    const GET_PROJECT_CONFIG = new api_request_1.ApiSettings("/config", "GET").setResponseValidator((response) => {
      if (useEmulator()) {
        return;
      }
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to get project config",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const UPDATE_PROJECT_CONFIG = new api_request_1.ApiSettings("/config?updateMask={updateMask}", "PATCH").setResponseValidator((response) => {
      if (useEmulator()) {
        return;
      }
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to update project config",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const GET_TENANT = new api_request_1.ApiSettings("/tenants/{tenantId}", "GET").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to get tenant",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const DELETE_TENANT = new api_request_1.ApiSettings("/tenants/{tenantId}", "DELETE");
    const UPDATE_TENANT = new api_request_1.ApiSettings("/tenants/{tenantId}?updateMask={updateMask}", "PATCH").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name) || !tenant_1.Tenant.getTenantIdFromResourceName(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to update tenant",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    const LIST_TENANTS = new api_request_1.ApiSettings("/tenants", "GET").setRequestValidator((request) => {
      if (typeof request.pageToken !== "undefined" && !validator2.isNonEmptyString(request.pageToken)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PAGE_TOKEN);
      }
      if (!validator2.isNumber(request.pageSize) || request.pageSize <= 0 || request.pageSize > MAX_LIST_TENANT_PAGE_SIZE) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `Required "maxResults" must be a positive non-zero number that does not exceed the allowed ${MAX_LIST_TENANT_PAGE_SIZE}.`);
      }
    });
    const CREATE_TENANT = new api_request_1.ApiSettings("/tenants", "POST").setResponseValidator((response) => {
      const data = response.data;
      if (!validator2.isNonEmptyString(data?.name) || !tenant_1.Tenant.getTenantIdFromResourceName(data?.name)) {
        throw new error_1.FirebaseAuthError({
          ...error_1.authClientErrorCode.INTERNAL_ERROR,
          message: "INTERNAL ASSERT FAILED: Unable to create tenant",
          httpResponse: (0, error_2.toHttpResponse)(response)
        });
      }
    });
    class AuthRequestHandler extends AbstractAuthRequestHandler {
      /**
       * The FirebaseAuthRequestHandler constructor used to initialize an instance using a FirebaseApp.
       *
       * @param app - The app used to fetch access tokens to sign API requests.
       * @constructor
       */
      constructor(app2) {
        super(app2);
        this.authResourceUrlBuilder = new AuthResourceUrlBuilder(app2, "v2", this.emulatorHostValue);
      }
      /**
       * @returns A new Auth user management resource URL builder instance.
       */
      newAuthUrlBuilder() {
        return new AuthResourceUrlBuilder(this.app, "v1", this.emulatorHostValue);
      }
      /**
       * @returns A new project config resource URL builder instance.
       */
      newProjectConfigUrlBuilder() {
        return new AuthResourceUrlBuilder(this.app, "v2", this.emulatorHostValue);
      }
      /**
       * Get the current project's config
       * @returns A promise that resolves with the project config information.
       */
      getProjectConfig() {
        return this.invokeRequestHandler(this.authResourceUrlBuilder, GET_PROJECT_CONFIG, {}, {}).then((response) => {
          return response;
        });
      }
      /**
       * Update the current project's config.
       * @returns A promise that resolves with the project config information.
       */
      updateProjectConfig(options) {
        try {
          const request = project_config_1.ProjectConfig.buildServerRequest(options);
          const updateMask = utils2.generateUpdateMask(request);
          return this.invokeRequestHandler(this.authResourceUrlBuilder, UPDATE_PROJECT_CONFIG, request, { updateMask: updateMask.join(",") }).then((response) => {
            return response;
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
      /**
       * Looks up a tenant by tenant ID.
       *
       * @param tenantId - The tenant identifier of the tenant to lookup.
       * @returns A promise that resolves with the tenant information.
       */
      getTenant(tenantId) {
        if (!validator2.isNonEmptyString(tenantId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TENANT_ID));
        }
        return this.invokeRequestHandler(this.authResourceUrlBuilder, GET_TENANT, {}, { tenantId }).then((response) => {
          return response;
        });
      }
      /**
       * Exports the tenants (single batch only) with a size of maxResults and starting from
       * the offset as specified by pageToken.
       *
       * @param maxResults - The page size, 1000 if undefined. This is also the maximum
       *     allowed limit.
       * @param pageToken - The next page token. If not specified, returns tenants starting
       *     without any offset. Tenants are returned in the order they were created from oldest to
       *     newest, relative to the page token offset.
       * @returns A promise that resolves with the current batch of downloaded
       *     tenants and the next page token if available. For the last page, an empty list of tenants
       *     and no page token are returned.
       */
      listTenants(maxResults = MAX_LIST_TENANT_PAGE_SIZE, pageToken) {
        const request = {
          pageSize: maxResults,
          pageToken
        };
        if (typeof request.pageToken === "undefined") {
          delete request.pageToken;
        }
        return this.invokeRequestHandler(this.authResourceUrlBuilder, LIST_TENANTS, request).then((response) => {
          if (!response.tenants) {
            response.tenants = [];
            delete response.nextPageToken;
          }
          return response;
        });
      }
      /**
       * Deletes a tenant identified by a tenantId.
       *
       * @param tenantId - The identifier of the tenant to delete.
       * @returns A promise that resolves when the tenant is deleted.
       */
      deleteTenant(tenantId) {
        if (!validator2.isNonEmptyString(tenantId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TENANT_ID));
        }
        return this.invokeRequestHandler(this.authResourceUrlBuilder, DELETE_TENANT, void 0, { tenantId }).then(() => {
        });
      }
      /**
       * Creates a new tenant with the properties provided.
       *
       * @param tenantOptions - The properties to set on the new tenant to be created.
       * @returns A promise that resolves with the newly created tenant object.
       */
      createTenant(tenantOptions) {
        try {
          const request = tenant_1.Tenant.buildServerRequest(tenantOptions, true);
          return this.invokeRequestHandler(this.authResourceUrlBuilder, CREATE_TENANT, request).then((response) => {
            return response;
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
      /**
       * Updates an existing tenant with the properties provided.
       *
       * @param tenantId - The tenant identifier of the tenant to update.
       * @param tenantOptions - The properties to update on the existing tenant.
       * @returns A promise that resolves with the modified tenant object.
       */
      updateTenant(tenantId, tenantOptions) {
        if (!validator2.isNonEmptyString(tenantId)) {
          return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TENANT_ID));
        }
        try {
          const request = tenant_1.Tenant.buildServerRequest(tenantOptions, false);
          const updateMask = utils2.generateUpdateMask(request, ["testPhoneNumbers"]);
          return this.invokeRequestHandler(this.authResourceUrlBuilder, UPDATE_TENANT, request, { tenantId, updateMask: updateMask.join(",") }).then((response) => {
            return response;
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    exports.AuthRequestHandler = AuthRequestHandler;
    class TenantAwareAuthRequestHandler extends AbstractAuthRequestHandler {
      /**
       * The FirebaseTenantRequestHandler constructor used to initialize an instance using a
       * FirebaseApp and a tenant ID.
       *
       * @param app - The app used to fetch access tokens to sign API requests.
       * @param tenantId - The request handler's tenant ID.
       * @param emHost - Optional emulator host override captured at init time.
       * @constructor
       */
      constructor(app2, tenantId, emHost) {
        super(app2, emHost);
        this.tenantId = tenantId;
      }
      /**
       * @returns A new Auth user management resource URL builder instance.
       */
      newAuthUrlBuilder() {
        return new TenantAwareAuthResourceUrlBuilder(this.app, "v1", this.tenantId, this.emulatorHostValue);
      }
      /**
       * @returns A new project config resource URL builder instance.
       */
      newProjectConfigUrlBuilder() {
        return new TenantAwareAuthResourceUrlBuilder(this.app, "v2", this.tenantId, this.emulatorHostValue);
      }
      /**
       * Imports the list of users provided to Firebase Auth. This is useful when
       * migrating from an external authentication system without having to use the Firebase CLI SDK.
       * At most, 1000 users are allowed to be imported one at a time.
       * When importing a list of password users, UserImportOptions are required to be specified.
       *
       * Overrides the superclass methods by adding an additional check to match tenant IDs of
       * imported user records if present.
       *
       * @param users - The list of user records to import to Firebase Auth.
       * @param options - The user import options, required when the users provided
       *     include password credentials.
       * @returns A promise that resolves when the operation completes
       *     with the result of the import. This includes the number of successful imports, the number
       *     of failed uploads and their corresponding errors.
       */
      uploadAccount(users, options) {
        users.forEach((user, index) => {
          if (validator2.isNonEmptyString(user.tenantId) && user.tenantId !== this.tenantId) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISMATCHING_TENANT_ID, `UserRecord of index "${index}" has mismatching tenant ID "${user.tenantId}"`);
          }
        });
        return super.uploadAccount(users, options);
      }
    }
    exports.TenantAwareAuthRequestHandler = TenantAwareAuthRequestHandler;
    function emulatorHost() {
      return process.env.FIREBASE_AUTH_EMULATOR_HOST;
    }
    function useEmulator() {
      return !!emulatorHost();
    }
  })(authApiRequest);
  return authApiRequest;
}
var tenantManager = {};
var baseAuth = {};
var tokenGenerator = {};
var cryptoSigner = {};
var hasRequiredCryptoSigner;
function requireCryptoSigner() {
  if (hasRequiredCryptoSigner) return cryptoSigner;
  hasRequiredCryptoSigner = 1;
  Object.defineProperty(cryptoSigner, "__esModule", { value: true });
  cryptoSigner.CryptoSignerErrorCode = cryptoSigner.CryptoSignerError = cryptoSigner.IAMSigner = cryptoSigner.ServiceAccountSigner = void 0;
  cryptoSigner.cryptoSignerFromApp = cryptoSignerFromApp;
  const credential_internal_1 = requireCredentialInternal();
  const api_request_1 = requireApiRequest();
  const utils2 = requireUtils$1();
  const validator2 = requireValidator();
  const ALGORITHM_RS256 = "RS256";
  class ServiceAccountSigner {
    /**
     * Creates a new CryptoSigner instance from the given service account credential.
     *
     * @param credential - A service account credential.
     */
    constructor(credential) {
      this.credential = credential;
      this.algorithm = ALGORITHM_RS256;
      if (!credential) {
        throw new CryptoSignerError({
          code: CryptoSignerErrorCode.INVALID_CREDENTIAL,
          message: "INTERNAL ASSERT: Must provide a service account credential to initialize ServiceAccountSigner."
        });
      }
    }
    /**
     * @inheritDoc
     */
    sign(buffer) {
      const crypto = require$$1;
      const sign = crypto.createSign("RSA-SHA256");
      sign.update(buffer);
      return Promise.resolve(sign.sign(this.credential.privateKey));
    }
    /**
     * @inheritDoc
     */
    getAccountId() {
      return Promise.resolve(this.credential.clientEmail);
    }
  }
  cryptoSigner.ServiceAccountSigner = ServiceAccountSigner;
  class IAMSigner {
    constructor(httpClient, app2) {
      this.algorithm = ALGORITHM_RS256;
      if (!httpClient) {
        throw new CryptoSignerError({
          code: CryptoSignerErrorCode.INVALID_ARGUMENT,
          message: "INTERNAL ASSERT: Must provide a HTTP client to initialize IAMSigner."
        });
      }
      if (app2 && (typeof app2 !== "object" || app2 === null || !("options" in app2))) {
        throw new CryptoSignerError({
          code: CryptoSignerErrorCode.INVALID_ARGUMENT,
          message: "INTERNAL ASSERT: Must provide a valid Firebase app instance."
        });
      }
      this.httpClient = httpClient;
      this.app = app2;
    }
    /**
     * @inheritDoc
     */
    sign(buffer) {
      return this.getAccountId().then((serviceAccount) => {
        const request = {
          method: "POST",
          url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccount}:signBlob`,
          data: { payload: buffer.toString("base64") }
        };
        return this.httpClient.send(request);
      }).then((response) => {
        return Buffer.from(response.data.signedBlob, "base64");
      }).catch((err) => {
        if (err instanceof api_request_1.RequestResponseError) {
          throw new CryptoSignerError({
            code: CryptoSignerErrorCode.SERVER_ERROR,
            message: err.message,
            cause: err
          });
        }
        throw err;
      });
    }
    /**
     * @inheritDoc
     */
    async getAccountId() {
      if (validator2.isNonEmptyString(this.serviceAccountId)) {
        return this.serviceAccountId;
      }
      if (this.app) {
        const accountId = await utils2.findServiceAccountEmail(this.app);
        if (accountId) {
          this.serviceAccountId = accountId;
          return accountId;
        }
      }
      const request = {
        method: "GET",
        url: "http://metadata/computeMetadata/v1/instance/service-accounts/default/email",
        headers: {
          "Metadata-Flavor": "Google"
        }
      };
      const client = new api_request_1.HttpClient();
      return client.send(request).then((response) => {
        if (!response.text) {
          throw new CryptoSignerError({
            code: CryptoSignerErrorCode.INTERNAL_ERROR,
            message: "HTTP Response missing payload"
          });
        }
        this.serviceAccountId = response.text;
        return response.text;
      }).catch((err) => {
        throw new CryptoSignerError({
          code: CryptoSignerErrorCode.INVALID_CREDENTIAL,
          message: `Failed to determine service account. Make sure to initialize the SDK with a service account credential. Alternatively specify a service account with iam.serviceAccounts.signBlob permission. Original error: ${err}`
        });
      });
    }
  }
  cryptoSigner.IAMSigner = IAMSigner;
  function cryptoSignerFromApp(app2) {
    const credential = app2.options.credential;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
      return new ServiceAccountSigner(credential);
    }
    return new IAMSigner(new api_request_1.AuthorizedHttpClient(app2), app2);
  }
  class CryptoSignerError extends Error {
    constructor(errorInfo) {
      super(errorInfo.message);
      this.errorInfo = errorInfo;
    }
    /** @returns The error code. */
    get code() {
      return this.errorInfo.code;
    }
    /** @returns The error message. */
    get message() {
      return this.errorInfo.message;
    }
    /** @returns The error data. */
    get cause() {
      return this.errorInfo.cause;
    }
  }
  cryptoSigner.CryptoSignerError = CryptoSignerError;
  class CryptoSignerErrorCode {
  }
  cryptoSigner.CryptoSignerErrorCode = CryptoSignerErrorCode;
  CryptoSignerErrorCode.INVALID_ARGUMENT = "invalid-argument";
  CryptoSignerErrorCode.INTERNAL_ERROR = "internal-error";
  CryptoSignerErrorCode.INVALID_CREDENTIAL = "invalid-credential";
  CryptoSignerErrorCode.SERVER_ERROR = "server-error";
  return cryptoSigner;
}
var hasRequiredTokenGenerator;
function requireTokenGenerator() {
  if (hasRequiredTokenGenerator) return tokenGenerator;
  hasRequiredTokenGenerator = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirebaseTokenGenerator = exports.EmulatedSigner = exports.BLACKLISTED_CLAIMS = void 0;
    exports.handleCryptoSignerError = handleCryptoSignerError;
    const error_1 = requireError$2();
    const crypto_signer_1 = requireCryptoSigner();
    const validator2 = requireValidator();
    const utils_1 = requireUtils$1();
    const ALGORITHM_NONE = "none";
    const ONE_HOUR_IN_SECONDS = 60 * 60;
    exports.BLACKLISTED_CLAIMS = [
      "acr",
      "amr",
      "at_hash",
      "aud",
      "auth_time",
      "azp",
      "cnf",
      "c_hash",
      "exp",
      "iat",
      "iss",
      "jti",
      "nbf",
      "nonce"
    ];
    const FIREBASE_AUDIENCE = "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit";
    class EmulatedSigner {
      constructor() {
        this.algorithm = ALGORITHM_NONE;
      }
      /**
       * @inheritDoc
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sign(buffer) {
        return Promise.resolve(Buffer.from(""));
      }
      /**
       * @inheritDoc
       */
      getAccountId() {
        return Promise.resolve("firebase-auth-emulator@example.com");
      }
    }
    exports.EmulatedSigner = EmulatedSigner;
    class FirebaseTokenGenerator {
      /**
       * @param tenantId - The tenant ID to use for the generated Firebase Auth
       *     Custom token. If absent, then no tenant ID claim will be set in the
       *     resulting JWT.
       */
      constructor(signer, tenantId) {
        this.tenantId = tenantId;
        if (!validator2.isNonNullObject(signer)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CREDENTIAL, "INTERNAL ASSERT: Must provide a CryptoSigner to use FirebaseTokenGenerator.");
        }
        if (typeof this.tenantId !== "undefined" && !validator2.isNonEmptyString(this.tenantId)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "`tenantId` argument must be a non-empty string.");
        }
        this.signer = signer;
      }
      /**
       * Creates a new Firebase Auth Custom token.
       *
       * @param uid - The user ID to use for the generated Firebase Auth Custom token.
       * @param developerClaims - Optional developer claims to include in the generated Firebase
       *     Auth Custom token.
       * @returns A Promise fulfilled with a Firebase Auth Custom token signed with a
       *     service account key and containing the provided payload.
       */
      createCustomToken(uid, developerClaims) {
        let errorMessage;
        if (!validator2.isNonEmptyString(uid)) {
          errorMessage = "`uid` argument must be a non-empty string uid.";
        } else if (uid.length > 128) {
          errorMessage = "`uid` argument must a uid with less than or equal to 128 characters.";
        } else if (!this.isDeveloperClaimsValid_(developerClaims)) {
          errorMessage = "`developerClaims` argument must be a valid, non-null object containing the developer claims.";
        }
        if (errorMessage) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
        const claims = {};
        if (typeof developerClaims !== "undefined") {
          for (const key in developerClaims) {
            if (Object.prototype.hasOwnProperty.call(developerClaims, key)) {
              if (exports.BLACKLISTED_CLAIMS.indexOf(key) !== -1) {
                throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `Developer claim "${key}" is reserved and cannot be specified.`);
              }
              claims[key] = developerClaims[key];
            }
          }
        }
        return this.signer.getAccountId().then((account) => {
          const header = {
            alg: this.signer.algorithm,
            typ: "JWT"
          };
          const iat = Math.floor(Date.now() / 1e3);
          const body = {
            aud: FIREBASE_AUDIENCE,
            iat,
            exp: iat + ONE_HOUR_IN_SECONDS,
            iss: account,
            sub: account,
            uid
          };
          if (this.tenantId) {
            body.tenant_id = this.tenantId;
          }
          if (Object.keys(claims).length > 0) {
            body.claims = claims;
          }
          const token = `${this.encodeSegment(header)}.${this.encodeSegment(body)}`;
          const signPromise = this.signer.sign(Buffer.from(token));
          return Promise.all([token, signPromise]);
        }).then(([token, signature]) => {
          return `${token}.${this.encodeSegment(signature)}`;
        }).catch((err) => {
          throw handleCryptoSignerError(err);
        });
      }
      encodeSegment(segment) {
        const buffer = segment instanceof Buffer ? segment : Buffer.from(JSON.stringify(segment));
        return (0, utils_1.toWebSafeBase64)(buffer).replace(/=+$/, "");
      }
      /**
       * Returns whether or not the provided developer claims are valid.
       *
       * @param developerClaims - Optional developer claims to validate.
       * @returns True if the provided claims are valid; otherwise, false.
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      isDeveloperClaimsValid_(developerClaims) {
        if (typeof developerClaims === "undefined") {
          return true;
        }
        return validator2.isNonNullObject(developerClaims);
      }
    }
    exports.FirebaseTokenGenerator = FirebaseTokenGenerator;
    function handleCryptoSignerError(err) {
      if (!(err instanceof crypto_signer_1.CryptoSignerError)) {
        return err;
      }
      if (err.code === crypto_signer_1.CryptoSignerErrorCode.SERVER_ERROR && validator2.isNonNullObject(err.cause)) {
        const httpError = err.cause;
        const errorResponse = httpError.response.data;
        if (validator2.isNonNullObject(errorResponse) && errorResponse.error) {
          const errorCode = errorResponse.error.status;
          const description = "Please refer to https://firebase.google.com/docs/auth/admin/create-custom-tokens for more details on how to use and troubleshoot this feature.";
          const errorMsg = `${errorResponse.error.message}; ${description}`;
          return error_1.FirebaseAuthError.fromServerError(errorCode, errorMsg, httpError);
        }
        return new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "Error returned from server: " + errorResponse + ". Additionally, an internal error occurred while attempting to extract the errorcode from the error.");
      }
      return new error_1.FirebaseAuthError(mapToAuthErrorInfo(err.code), err.message);
    }
    function mapToAuthErrorInfo(code) {
      switch (code) {
        case crypto_signer_1.CryptoSignerErrorCode.INVALID_CREDENTIAL:
          return error_1.authClientErrorCode.INVALID_CREDENTIAL;
        case crypto_signer_1.CryptoSignerErrorCode.INVALID_ARGUMENT:
          return error_1.authClientErrorCode.INVALID_ARGUMENT;
        default:
          return error_1.authClientErrorCode.INTERNAL_ERROR;
      }
    }
  })(tokenGenerator);
  return tokenGenerator;
}
var tokenVerifier = {};
var jwt = {};
var hasRequiredJwt;
function requireJwt() {
  if (hasRequiredJwt) return jwt;
  hasRequiredJwt = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JwtErrorCode = exports.JwtError = exports.EmulatorSignatureVerifier = exports.PublicKeySignatureVerifier = exports.UrlKeyFetcher = exports.JwksFetcher = exports.ALGORITHM_ES256 = exports.ALGORITHM_RS256 = void 0;
    exports.verifyJwtSignature = verifyJwtSignature;
    exports.decodeJwt = decodeJwt;
    const validator2 = requireValidator();
    const jwt2 = requireJsonwebtoken();
    const jwks = requireSrc$1();
    const api_request_1 = requireApiRequest();
    exports.ALGORITHM_RS256 = "RS256";
    exports.ALGORITHM_ES256 = "ES256";
    const JWT_CALLBACK_ERROR_PREFIX = "error in secret or public key callback: ";
    const NO_MATCHING_KID_ERROR_MESSAGE = "no-matching-kid-error";
    const NO_KID_IN_HEADER_ERROR_MESSAGE = "no-kid-in-header-error";
    const HOUR_IN_SECONDS = 3600;
    class JwksFetcher {
      constructor(jwksUrl, httpAgent) {
        this.publicKeysExpireAt = 0;
        if (!validator2.isURL(jwksUrl)) {
          throw new Error("The provided JWKS URL is not a valid URL.");
        }
        this.client = jwks({
          jwksUri: jwksUrl,
          cache: false,
          // disable jwks-rsa LRU cache as the keys are always cached for 6 hours.
          requestAgent: httpAgent
        });
      }
      fetchPublicKeys() {
        if (this.shouldRefresh()) {
          return this.refresh();
        }
        return Promise.resolve(this.publicKeys);
      }
      shouldRefresh() {
        return !this.publicKeys || this.publicKeysExpireAt <= Date.now();
      }
      refresh() {
        return this.client.getSigningKeys().then((signingKeys) => {
          this.publicKeysExpireAt = 0;
          const newKeys = signingKeys.reduce((map, signingKey) => {
            map[signingKey.kid] = signingKey.getPublicKey();
            return map;
          }, {});
          this.publicKeysExpireAt = Date.now() + HOUR_IN_SECONDS * 6 * 1e3;
          this.publicKeys = newKeys;
          return newKeys;
        }).catch((err) => {
          throw new Error(`Error fetching Json Web Keys: ${err.message}`);
        });
      }
    }
    exports.JwksFetcher = JwksFetcher;
    class UrlKeyFetcher {
      constructor(clientCertUrl, httpAgent) {
        this.clientCertUrl = clientCertUrl;
        this.httpAgent = httpAgent;
        this.publicKeysExpireAt = 0;
        if (!validator2.isURL(clientCertUrl)) {
          throw new Error("The provided public client certificate URL is not a valid URL.");
        }
      }
      /**
       * Fetches the public keys for the Google certs.
       *
       * @returns A promise fulfilled with public keys for the Google certs.
       */
      fetchPublicKeys() {
        if (this.shouldRefresh()) {
          return this.refresh();
        }
        return Promise.resolve(this.publicKeys);
      }
      /**
       * Checks if the cached public keys need to be refreshed.
       *
       * @returns Whether the keys should be fetched from the client certs url or not.
       */
      shouldRefresh() {
        return !this.publicKeys || this.publicKeysExpireAt <= Date.now();
      }
      refresh() {
        const client = new api_request_1.HttpClient();
        const request = {
          method: "GET",
          url: this.clientCertUrl,
          httpAgent: this.httpAgent
        };
        return client.send(request).then((resp) => {
          if (!resp.isJson() || resp.data.error) {
            throw new api_request_1.RequestResponseError(resp);
          }
          this.publicKeysExpireAt = 0;
          if (Object.prototype.hasOwnProperty.call(resp.headers, "cache-control")) {
            const cacheControlHeader = resp.headers["cache-control"];
            const parts = cacheControlHeader.split(",");
            parts.forEach((part) => {
              const subParts = part.trim().split("=");
              if (subParts[0] === "max-age") {
                const maxAge = +subParts[1];
                this.publicKeysExpireAt = Date.now() + maxAge * 1e3;
              }
            });
          }
          this.publicKeys = resp.data;
          return resp.data;
        }).catch((err) => {
          if (err instanceof api_request_1.RequestResponseError) {
            let errorMessage = "Error fetching public keys for Google certs: ";
            const resp = err.response;
            if (resp.isJson() && resp.data.error) {
              errorMessage += `${resp.data.error}`;
              if (resp.data.error_description) {
                errorMessage += " (" + resp.data.error_description + ")";
              }
            } else {
              errorMessage += `${resp.text}`;
            }
            throw new Error(errorMessage);
          }
          throw err;
        });
      }
    }
    exports.UrlKeyFetcher = UrlKeyFetcher;
    class PublicKeySignatureVerifier {
      constructor(keyFetcher) {
        this.keyFetcher = keyFetcher;
        if (!validator2.isNonNullObject(keyFetcher)) {
          throw new Error("The provided key fetcher is not an object or null.");
        }
      }
      static withCertificateUrl(clientCertUrl, httpAgent) {
        return new PublicKeySignatureVerifier(new UrlKeyFetcher(clientCertUrl, httpAgent));
      }
      static withJwksUrl(jwksUrl, httpAgent) {
        return new PublicKeySignatureVerifier(new JwksFetcher(jwksUrl, httpAgent));
      }
      verify(token) {
        if (!validator2.isString(token)) {
          return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, "The provided token must be a string."));
        }
        return verifyJwtSignature(token, getKeyCallback(this.keyFetcher), { algorithms: [exports.ALGORITHM_RS256, exports.ALGORITHM_ES256] }).catch((error2) => {
          if (error2.code === JwtErrorCode.NO_KID_IN_HEADER) {
            return this.verifyWithoutKid(token);
          }
          throw error2;
        });
      }
      verifyWithoutKid(token) {
        return this.keyFetcher.fetchPublicKeys().then((publicKeys) => this.verifyWithAllKeys(token, publicKeys));
      }
      verifyWithAllKeys(token, keys) {
        const promises = [];
        Object.values(keys).forEach((key) => {
          const result = verifyJwtSignature(token, key).then(() => true).catch((error2) => {
            if (error2.code === JwtErrorCode.TOKEN_EXPIRED) {
              throw error2;
            }
            return false;
          });
          promises.push(result);
        });
        return Promise.all(promises).then((result) => {
          if (result.every((r) => r === false)) {
            throw new JwtError(JwtErrorCode.INVALID_SIGNATURE, "Invalid token signature.");
          }
        });
      }
    }
    exports.PublicKeySignatureVerifier = PublicKeySignatureVerifier;
    class EmulatorSignatureVerifier {
      verify(token) {
        return verifyJwtSignature(token, void 0, { algorithms: ["none"] });
      }
    }
    exports.EmulatorSignatureVerifier = EmulatorSignatureVerifier;
    function getKeyCallback(fetcher) {
      return (header, callback) => {
        if (!header.kid) {
          callback(new Error(NO_KID_IN_HEADER_ERROR_MESSAGE));
        }
        const kid = header.kid || "";
        fetcher.fetchPublicKeys().then((publicKeys) => {
          if (!Object.prototype.hasOwnProperty.call(publicKeys, kid)) {
            callback(new Error(NO_MATCHING_KID_ERROR_MESSAGE));
          } else {
            callback(null, publicKeys[kid]);
          }
        }).catch((error2) => {
          callback(error2);
        });
      };
    }
    function verifyJwtSignature(token, secretOrPublicKey, options) {
      if (!validator2.isString(token)) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, "The provided token must be a string."));
      }
      return new Promise((resolve, reject) => {
        jwt2.verify(token, secretOrPublicKey, options, (error2) => {
          if (!error2) {
            return resolve();
          }
          if (error2.name === "TokenExpiredError") {
            return reject(new JwtError(JwtErrorCode.TOKEN_EXPIRED, "The provided token has expired. Get a fresh token from your client app and try again."));
          } else if (error2.name === "JsonWebTokenError") {
            if (error2.message && error2.message.includes(JWT_CALLBACK_ERROR_PREFIX)) {
              const message = error2.message.split(JWT_CALLBACK_ERROR_PREFIX).pop() || "Error fetching public keys.";
              let code = JwtErrorCode.KEY_FETCH_ERROR;
              if (message === NO_MATCHING_KID_ERROR_MESSAGE) {
                code = JwtErrorCode.NO_MATCHING_KID;
              } else if (message === NO_KID_IN_HEADER_ERROR_MESSAGE) {
                code = JwtErrorCode.NO_KID_IN_HEADER;
              }
              return reject(new JwtError(code, message));
            }
          }
          return reject(new JwtError(JwtErrorCode.INVALID_SIGNATURE, error2.message));
        });
      });
    }
    function decodeJwt(jwtToken) {
      if (!validator2.isString(jwtToken)) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, "The provided token must be a string."));
      }
      const fullDecodedToken = jwt2.decode(jwtToken, {
        complete: true
      });
      if (!fullDecodedToken) {
        return Promise.reject(new JwtError(JwtErrorCode.INVALID_ARGUMENT, "Decoding token failed."));
      }
      const header = fullDecodedToken?.header;
      const payload = fullDecodedToken?.payload;
      return Promise.resolve({ header, payload });
    }
    class JwtError extends Error {
      constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
      }
    }
    exports.JwtError = JwtError;
    var JwtErrorCode;
    (function(JwtErrorCode2) {
      JwtErrorCode2["INVALID_ARGUMENT"] = "invalid-argument";
      JwtErrorCode2["INVALID_CREDENTIAL"] = "invalid-credential";
      JwtErrorCode2["TOKEN_EXPIRED"] = "token-expired";
      JwtErrorCode2["INVALID_SIGNATURE"] = "invalid-token";
      JwtErrorCode2["NO_MATCHING_KID"] = "no-matching-kid-error";
      JwtErrorCode2["NO_KID_IN_HEADER"] = "no-kid-error";
      JwtErrorCode2["KEY_FETCH_ERROR"] = "key-fetch-error";
    })(JwtErrorCode || (exports.JwtErrorCode = JwtErrorCode = {}));
  })(jwt);
  return jwt;
}
var hasRequiredTokenVerifier;
function requireTokenVerifier() {
  if (hasRequiredTokenVerifier) return tokenVerifier;
  hasRequiredTokenVerifier = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirebaseTokenVerifier = exports.SESSION_COOKIE_INFO = exports.AUTH_BLOCKING_TOKEN_INFO = exports.ID_TOKEN_INFO = void 0;
    exports.createIdTokenVerifier = createIdTokenVerifier;
    exports.createAuthBlockingTokenVerifier = createAuthBlockingTokenVerifier;
    exports.createSessionCookieVerifier = createSessionCookieVerifier;
    const error_1 = requireError$2();
    const util = requireUtils$1();
    const validator2 = requireValidator();
    const jwt_1 = requireJwt();
    const FIREBASE_AUDIENCE = "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit";
    const CLIENT_CERT_URL = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
    const SESSION_COOKIE_CERT_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys";
    const EMULATOR_VERIFIER = new jwt_1.EmulatorSignatureVerifier();
    exports.ID_TOKEN_INFO = {
      url: "https://firebase.google.com/docs/auth/admin/verify-id-tokens",
      verifyApiName: "verifyIdToken()",
      jwtName: "Firebase ID token",
      shortName: "ID token",
      expiredErrorCode: error_1.authClientErrorCode.ID_TOKEN_EXPIRED
    };
    exports.AUTH_BLOCKING_TOKEN_INFO = {
      url: "https://cloud.google.com/identity-platform/docs/blocking-functions",
      verifyApiName: "_verifyAuthBlockingToken()",
      jwtName: "Firebase Auth Blocking token",
      shortName: "Auth Blocking token",
      expiredErrorCode: error_1.authClientErrorCode.AUTH_BLOCKING_TOKEN_EXPIRED
    };
    exports.SESSION_COOKIE_INFO = {
      url: "https://firebase.google.com/docs/auth/admin/manage-cookies",
      verifyApiName: "verifySessionCookie()",
      jwtName: "Firebase session cookie",
      shortName: "session cookie",
      expiredErrorCode: error_1.authClientErrorCode.SESSION_COOKIE_EXPIRED
    };
    class FirebaseTokenVerifier {
      constructor(clientCertUrl, issuer, tokenInfo, app2) {
        this.issuer = issuer;
        this.tokenInfo = tokenInfo;
        this.app = app2;
        if (!validator2.isURL(clientCertUrl)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The provided public client certificate URL is an invalid URL.");
        } else if (!validator2.isURL(issuer)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The provided JWT issuer is an invalid URL.");
        } else if (!validator2.isNonNullObject(tokenInfo)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The provided JWT information is not an object or null.");
        } else if (!validator2.isURL(tokenInfo.url)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The provided JWT verification documentation URL is invalid.");
        } else if (!validator2.isNonEmptyString(tokenInfo.verifyApiName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The JWT verify API name must be a non-empty string.");
        } else if (!validator2.isNonEmptyString(tokenInfo.jwtName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The JWT public full name must be a non-empty string.");
        } else if (!validator2.isNonEmptyString(tokenInfo.shortName)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The JWT public short name must be a non-empty string.");
        } else if (!validator2.isNonNullObject(tokenInfo.expiredErrorCode) || !("code" in tokenInfo.expiredErrorCode)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "The JWT expiration error code must be a non-null ErrorInfo object.");
        }
        this.shortNameArticle = tokenInfo.shortName.charAt(0).match(/[aeiou]/i) ? "an" : "a";
        this.signatureVerifier = jwt_1.PublicKeySignatureVerifier.withCertificateUrl(clientCertUrl, app2.options.httpAgent);
      }
      /**
       * Verifies the format and signature of a Firebase Auth JWT token.
       *
       * @param jwtToken - The Firebase Auth JWT token to verify.
       * @param isEmulator - Whether to accept Auth Emulator tokens.
       * @returns A promise fulfilled with the decoded claims of the Firebase Auth ID token.
       */
      verifyJWT(jwtToken, isEmulator = false) {
        if (!validator2.isString(jwtToken)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `First argument to ${this.tokenInfo.verifyApiName} must be a ${this.tokenInfo.jwtName} string.`);
        }
        return this.ensureProjectId().then((projectId) => {
          return this.decodeAndVerify(jwtToken, projectId, isEmulator);
        }).then((decoded) => {
          const decodedIdToken = decoded.payload;
          decodedIdToken.uid = decodedIdToken.sub;
          return decodedIdToken;
        });
      }
      /** @alpha */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _verifyAuthBlockingToken(jwtToken, isEmulator, audience) {
        if (!validator2.isString(jwtToken)) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, `First argument to ${this.tokenInfo.verifyApiName} must be a ${this.tokenInfo.jwtName} string.`);
        }
        return this.ensureProjectId().then((projectId) => {
          if (typeof audience === "undefined") {
            audience = `${projectId}.cloudfunctions.net/`;
          }
          return this.decodeAndVerify(jwtToken, projectId, isEmulator, audience);
        }).then((decoded) => {
          const decodedAuthBlockingToken = decoded.payload;
          decodedAuthBlockingToken.uid = decodedAuthBlockingToken.sub;
          return decodedAuthBlockingToken;
        });
      }
      ensureProjectId() {
        return util.findProjectId(this.app).then((projectId) => {
          if (!validator2.isNonEmptyString(projectId)) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CREDENTIAL, `Must initialize app with a cert credential or set your Firebase project ID as the GOOGLE_CLOUD_PROJECT environment variable to call ${this.tokenInfo.verifyApiName}.`);
          }
          return Promise.resolve(projectId);
        });
      }
      decodeAndVerify(token, projectId, isEmulator, audience) {
        return this.safeDecode(token).then((decodedToken) => {
          this.verifyContent(decodedToken, projectId, isEmulator, audience);
          return this.verifySignature(token, isEmulator).then(() => decodedToken);
        });
      }
      safeDecode(jwtToken) {
        return (0, jwt_1.decodeJwt)(jwtToken).catch((err) => {
          if (err.code === jwt_1.JwtErrorCode.INVALID_ARGUMENT) {
            const verifyJwtTokenDocsMessage = ` See ${this.tokenInfo.url} for details on how to retrieve ${this.shortNameArticle} ${this.tokenInfo.shortName}.`;
            const errorMessage = `Decoding ${this.tokenInfo.jwtName} failed. Make sure you passed the entire string JWT which represents ${this.shortNameArticle} ${this.tokenInfo.shortName}.` + verifyJwtTokenDocsMessage;
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, errorMessage);
          }
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, err.message);
        });
      }
      /**
       * Verifies the content of a Firebase Auth JWT.
       *
       * @param fullDecodedToken - The decoded JWT.
       * @param projectId - The Firebase Project Id.
       * @param isEmulator - Whether the token is an Emulator token.
       */
      verifyContent(fullDecodedToken, projectId, isEmulator, audience) {
        const header = fullDecodedToken && fullDecodedToken.header;
        const payload = fullDecodedToken && fullDecodedToken.payload;
        const projectIdMatchMessage = ` Make sure the ${this.tokenInfo.shortName} comes from the same Firebase project as the service account used to authenticate this SDK.`;
        const verifyJwtTokenDocsMessage = ` See ${this.tokenInfo.url} for details on how to retrieve ${this.shortNameArticle} ${this.tokenInfo.shortName}.`;
        let errorMessage;
        if (!isEmulator && typeof header.kid === "undefined") {
          const isCustomToken = payload.aud === FIREBASE_AUDIENCE;
          const isLegacyCustomToken = header.alg === "HS256" && payload.v === 0 && "d" in payload && "uid" in payload.d;
          if (isCustomToken) {
            errorMessage = `${this.tokenInfo.verifyApiName} expects ${this.shortNameArticle} ${this.tokenInfo.shortName}, but was given a custom token.`;
          } else if (isLegacyCustomToken) {
            errorMessage = `${this.tokenInfo.verifyApiName} expects ${this.shortNameArticle} ${this.tokenInfo.shortName}, but was given a legacy custom token.`;
          } else {
            errorMessage = `${this.tokenInfo.jwtName} has no "kid" claim.`;
          }
          errorMessage += verifyJwtTokenDocsMessage;
        } else if (!isEmulator && header.alg !== jwt_1.ALGORITHM_RS256) {
          errorMessage = `${this.tokenInfo.jwtName} has incorrect algorithm. Expected "` + jwt_1.ALGORITHM_RS256 + '" but got "' + header.alg + '".' + verifyJwtTokenDocsMessage;
        } else if (typeof audience !== "undefined" && !payload.aud.includes(audience)) {
          errorMessage = `${this.tokenInfo.jwtName} has incorrect "aud" (audience) claim. Expected "` + audience + '" but got "' + payload.aud + '".' + verifyJwtTokenDocsMessage;
        } else if (typeof audience === "undefined" && payload.aud !== projectId) {
          errorMessage = `${this.tokenInfo.jwtName} has incorrect "aud" (audience) claim. Expected "` + projectId + '" but got "' + payload.aud + '".' + projectIdMatchMessage + verifyJwtTokenDocsMessage;
        } else if (payload.iss !== this.issuer + projectId) {
          errorMessage = `${this.tokenInfo.jwtName} has incorrect "iss" (issuer) claim. Expected "${this.issuer}` + projectId + '" but got "' + payload.iss + '".' + projectIdMatchMessage + verifyJwtTokenDocsMessage;
        } else if (!(payload.event_type !== void 0 && (payload.event_type === "beforeSendSms" || payload.event_type === "beforeSendEmail"))) {
          if (typeof payload.sub !== "string") {
            errorMessage = `${this.tokenInfo.jwtName} has no "sub" (subject) claim.` + verifyJwtTokenDocsMessage;
          } else if (payload.sub === "") {
            errorMessage = `${this.tokenInfo.jwtName} has an empty "sub" (subject) claim.` + verifyJwtTokenDocsMessage;
          } else if (payload.sub.length > 128) {
            errorMessage = `${this.tokenInfo.jwtName} has a "sub" (subject) claim longer than 128 characters.` + verifyJwtTokenDocsMessage;
          }
        }
        if (errorMessage) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
      }
      verifySignature(jwtToken, isEmulator) {
        const verifier = isEmulator ? EMULATOR_VERIFIER : this.signatureVerifier;
        return verifier.verify(jwtToken).catch((error2) => {
          throw this.mapJwtErrorToAuthError(error2);
        });
      }
      /**
       * Maps JwtError to FirebaseAuthError
       *
       * @param error - JwtError to be mapped.
       * @returns FirebaseAuthError or Error instance.
       */
      mapJwtErrorToAuthError(error2) {
        const verifyJwtTokenDocsMessage = ` See ${this.tokenInfo.url} for details on how to retrieve ${this.shortNameArticle} ${this.tokenInfo.shortName}.`;
        if (error2.code === jwt_1.JwtErrorCode.TOKEN_EXPIRED) {
          const errorMessage = `${this.tokenInfo.jwtName} has expired. Get a fresh ${this.tokenInfo.shortName} from your client app and try again (auth/${this.tokenInfo.expiredErrorCode.code}).` + verifyJwtTokenDocsMessage;
          return new error_1.FirebaseAuthError(this.tokenInfo.expiredErrorCode, errorMessage);
        } else if (error2.code === jwt_1.JwtErrorCode.INVALID_SIGNATURE) {
          const errorMessage = `${this.tokenInfo.jwtName} has invalid signature.` + verifyJwtTokenDocsMessage;
          return new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, errorMessage);
        } else if (error2.code === jwt_1.JwtErrorCode.NO_MATCHING_KID) {
          const errorMessage = `${this.tokenInfo.jwtName} has "kid" claim which does not correspond to a known public key. Most likely the ${this.tokenInfo.shortName} is expired, so get a fresh token from your client app and try again.`;
          return new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, errorMessage);
        }
        return new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, error2.message);
      }
    }
    exports.FirebaseTokenVerifier = FirebaseTokenVerifier;
    function createIdTokenVerifier(app2) {
      return new FirebaseTokenVerifier(CLIENT_CERT_URL, "https://securetoken.google.com/", exports.ID_TOKEN_INFO, app2);
    }
    function createAuthBlockingTokenVerifier(app2) {
      return new FirebaseTokenVerifier(CLIENT_CERT_URL, "https://securetoken.google.com/", exports.AUTH_BLOCKING_TOKEN_INFO, app2);
    }
    function createSessionCookieVerifier(app2) {
      return new FirebaseTokenVerifier(SESSION_COOKIE_CERT_URL, "https://session.firebase.google.com/", exports.SESSION_COOKIE_INFO, app2);
    }
  })(tokenVerifier);
  return tokenVerifier;
}
var userRecord = {};
var hasRequiredUserRecord;
function requireUserRecord() {
  if (hasRequiredUserRecord) return userRecord;
  hasRequiredUserRecord = 1;
  Object.defineProperty(userRecord, "__esModule", { value: true });
  userRecord.UserRecord = userRecord.UserInfo = userRecord.UserMetadata = userRecord.MultiFactorSettings = userRecord.TotpMultiFactorInfo = userRecord.TotpInfo = userRecord.PhoneMultiFactorInfo = userRecord.MultiFactorInfo = void 0;
  const deep_copy_1 = requireDeepCopy();
  const validator_1 = requireValidator();
  const utils2 = requireUtils$1();
  const error_1 = requireError$2();
  const B64_REDACTED = Buffer.from("REDACTED").toString("base64");
  function parseDate(time) {
    try {
      const date = new Date(parseInt(time, 10));
      if (!isNaN(date.getTime())) {
        return date.toUTCString();
      }
    } catch (e) {
    }
    return null;
  }
  var MultiFactorId;
  (function(MultiFactorId2) {
    MultiFactorId2["Phone"] = "phone";
    MultiFactorId2["Totp"] = "totp";
  })(MultiFactorId || (MultiFactorId = {}));
  class MultiFactorInfo {
    /**
     * Initializes the MultiFactorInfo associated subclass using the server side.
     * If no MultiFactorInfo is associated with the response, null is returned.
     *
     * @param response - The server side response.
     * @internal
     */
    static initMultiFactorInfo(response) {
      let multiFactorInfo = null;
      try {
        if (response.phoneInfo !== void 0) {
          multiFactorInfo = new PhoneMultiFactorInfo(response);
        } else if (response.totpInfo !== void 0) {
          multiFactorInfo = new TotpMultiFactorInfo(response);
        } else {
        }
      } catch (e) {
      }
      return multiFactorInfo;
    }
    /**
     * Initializes the MultiFactorInfo object using the server side response.
     *
     * @param response - The server side response.
     * @constructor
     * @internal
     */
    constructor(response) {
      this.initFromServerResponse(response);
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      return {
        uid: this.uid,
        displayName: this.displayName,
        factorId: this.factorId,
        enrollmentTime: this.enrollmentTime
      };
    }
    /**
     * Initializes the MultiFactorInfo object using the provided server response.
     *
     * @param response - The server side response.
     */
    initFromServerResponse(response) {
      const factorId = response && this.getFactorId(response);
      if (!factorId || !response || !response.mfaEnrollmentId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid multi-factor info response");
      }
      utils2.addReadonlyGetter(this, "uid", response.mfaEnrollmentId);
      utils2.addReadonlyGetter(this, "factorId", factorId);
      utils2.addReadonlyGetter(this, "displayName", response.displayName);
      if (response.enrolledAt) {
        utils2.addReadonlyGetter(this, "enrollmentTime", new Date(response.enrolledAt).toUTCString());
      } else {
        utils2.addReadonlyGetter(this, "enrollmentTime", null);
      }
    }
  }
  userRecord.MultiFactorInfo = MultiFactorInfo;
  class PhoneMultiFactorInfo extends MultiFactorInfo {
    /**
     * Initializes the PhoneMultiFactorInfo object using the server side response.
     *
     * @param response - The server side response.
     * @constructor
     * @internal
     */
    constructor(response) {
      super(response);
      utils2.addReadonlyGetter(this, "phoneNumber", response.phoneInfo);
    }
    /**
     * {@inheritdoc MultiFactorInfo.toJSON}
     */
    toJSON() {
      return Object.assign(super.toJSON(), {
        phoneNumber: this.phoneNumber
      });
    }
    /**
     * Returns the factor ID based on the response provided.
     *
     * @param response - The server side response.
     * @returns The multi-factor ID associated with the provided response. If the response is
     *     not associated with any known multi-factor ID, null is returned.
     *
     * @internal
     */
    getFactorId(response) {
      return response && response.phoneInfo ? MultiFactorId.Phone : null;
    }
  }
  userRecord.PhoneMultiFactorInfo = PhoneMultiFactorInfo;
  class TotpInfo {
  }
  userRecord.TotpInfo = TotpInfo;
  class TotpMultiFactorInfo extends MultiFactorInfo {
    /**
     * Initializes the `TotpMultiFactorInfo` object using the server side response.
     *
     * @param response - The server side response.
     * @constructor
     * @internal
     */
    constructor(response) {
      super(response);
      utils2.addReadonlyGetter(this, "totpInfo", response.totpInfo);
    }
    /**
     * {@inheritdoc MultiFactorInfo.toJSON}
     */
    toJSON() {
      return Object.assign(super.toJSON(), {
        totpInfo: this.totpInfo
      });
    }
    /**
     * Returns the factor ID based on the response provided.
     *
     * @param response - The server side response.
     * @returns The multi-factor ID associated with the provided response. If the response is
     *     not associated with any known multi-factor ID, `null` is returned.
     *
     * @internal
     */
    getFactorId(response) {
      return response && response.totpInfo ? MultiFactorId.Totp : null;
    }
  }
  userRecord.TotpMultiFactorInfo = TotpMultiFactorInfo;
  class MultiFactorSettings {
    /**
     * Initializes the `MultiFactor` object using the server side or JWT format response.
     *
     * @param response - The server side response.
     * @constructor
     * @internal
     */
    constructor(response) {
      const parsedEnrolledFactors = [];
      if (!(0, validator_1.isNonNullObject)(response)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid multi-factor response");
      } else if (response.mfaInfo) {
        response.mfaInfo.forEach((factorResponse) => {
          const multiFactorInfo = MultiFactorInfo.initMultiFactorInfo(factorResponse);
          if (multiFactorInfo) {
            parsedEnrolledFactors.push(multiFactorInfo);
          }
        });
      }
      utils2.addReadonlyGetter(this, "enrolledFactors", Object.freeze(parsedEnrolledFactors));
    }
    /**
     * Returns a JSON-serializable representation of this multi-factor object.
     *
     * @returns A JSON-serializable representation of this multi-factor object.
     */
    toJSON() {
      return {
        enrolledFactors: this.enrolledFactors.map((info) => info.toJSON())
      };
    }
  }
  userRecord.MultiFactorSettings = MultiFactorSettings;
  class UserMetadata {
    /**
     * @param response - The server side response returned from the `getAccountInfo`
     *     endpoint.
     * @constructor
     * @internal
     */
    constructor(response) {
      utils2.addReadonlyGetter(this, "creationTime", parseDate(response.createdAt));
      utils2.addReadonlyGetter(this, "lastSignInTime", parseDate(response.lastLoginAt));
      const lastRefreshAt = response.lastRefreshAt ? new Date(response.lastRefreshAt).toUTCString() : null;
      utils2.addReadonlyGetter(this, "lastRefreshTime", lastRefreshAt);
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      return {
        lastSignInTime: this.lastSignInTime,
        creationTime: this.creationTime,
        lastRefreshTime: this.lastRefreshTime
      };
    }
  }
  userRecord.UserMetadata = UserMetadata;
  class UserInfo {
    /**
     * @param response - The server side response returned from the `getAccountInfo`
     *     endpoint.
     * @constructor
     * @internal
     */
    constructor(response) {
      if (!response.rawId || !response.providerId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid user info response");
      }
      utils2.addReadonlyGetter(this, "uid", response.rawId);
      utils2.addReadonlyGetter(this, "displayName", response.displayName);
      utils2.addReadonlyGetter(this, "email", response.email);
      utils2.addReadonlyGetter(this, "photoURL", response.photoUrl);
      utils2.addReadonlyGetter(this, "providerId", response.providerId);
      utils2.addReadonlyGetter(this, "phoneNumber", response.phoneNumber);
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      return {
        uid: this.uid,
        displayName: this.displayName,
        email: this.email,
        photoURL: this.photoURL,
        providerId: this.providerId,
        phoneNumber: this.phoneNumber
      };
    }
  }
  userRecord.UserInfo = UserInfo;
  class UserRecord {
    /**
     * @param response - The server side response returned from the getAccountInfo
     *     endpoint.
     * @constructor
     * @internal
     */
    constructor(response) {
      if (!response.localId) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "INTERNAL ASSERT FAILED: Invalid user response");
      }
      utils2.addReadonlyGetter(this, "uid", response.localId);
      utils2.addReadonlyGetter(this, "email", response.email);
      utils2.addReadonlyGetter(this, "emailVerified", !!response.emailVerified);
      utils2.addReadonlyGetter(this, "displayName", response.displayName);
      utils2.addReadonlyGetter(this, "photoURL", response.photoUrl);
      utils2.addReadonlyGetter(this, "phoneNumber", response.phoneNumber);
      utils2.addReadonlyGetter(this, "disabled", response.disabled || false);
      utils2.addReadonlyGetter(this, "metadata", new UserMetadata(response));
      const providerData = [];
      for (const entry of response.providerUserInfo || []) {
        providerData.push(new UserInfo(entry));
      }
      utils2.addReadonlyGetter(this, "providerData", providerData);
      if (response.passwordHash === B64_REDACTED) {
        utils2.addReadonlyGetter(this, "passwordHash", void 0);
      } else {
        utils2.addReadonlyGetter(this, "passwordHash", response.passwordHash);
      }
      utils2.addReadonlyGetter(this, "passwordSalt", response.salt);
      if (response.customAttributes) {
        utils2.addReadonlyGetter(this, "customClaims", JSON.parse(response.customAttributes));
      }
      let validAfterTime = null;
      if (typeof response.validSince !== "undefined") {
        validAfterTime = parseDate(parseInt(response.validSince, 10) * 1e3);
      }
      utils2.addReadonlyGetter(this, "tokensValidAfterTime", validAfterTime || void 0);
      utils2.addReadonlyGetter(this, "tenantId", response.tenantId);
      const multiFactor = new MultiFactorSettings(response);
      if (multiFactor.enrolledFactors.length > 0) {
        utils2.addReadonlyGetter(this, "multiFactor", multiFactor);
      }
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
      const json = {
        uid: this.uid,
        email: this.email,
        emailVerified: this.emailVerified,
        displayName: this.displayName,
        photoURL: this.photoURL,
        phoneNumber: this.phoneNumber,
        disabled: this.disabled,
        // Convert metadata to json.
        metadata: this.metadata.toJSON(),
        passwordHash: this.passwordHash,
        passwordSalt: this.passwordSalt,
        customClaims: (0, deep_copy_1.deepCopy)(this.customClaims),
        tokensValidAfterTime: this.tokensValidAfterTime,
        tenantId: this.tenantId
      };
      if (this.multiFactor) {
        json.multiFactor = this.multiFactor.toJSON();
      }
      json.providerData = [];
      for (const entry of this.providerData) {
        json.providerData.push(entry.toJSON());
      }
      return json;
    }
  }
  userRecord.UserRecord = UserRecord;
  return userRecord;
}
var hasRequiredBaseAuth;
function requireBaseAuth() {
  if (hasRequiredBaseAuth) return baseAuth;
  hasRequiredBaseAuth = 1;
  Object.defineProperty(baseAuth, "__esModule", { value: true });
  baseAuth.BaseAuth = void 0;
  baseAuth.createFirebaseTokenGenerator = createFirebaseTokenGenerator;
  const error_1 = requireError$2();
  const deep_copy_1 = requireDeepCopy();
  const validator2 = requireValidator();
  const auth_api_request_1 = requireAuthApiRequest();
  const token_generator_1 = requireTokenGenerator();
  const token_verifier_1 = requireTokenVerifier();
  const auth_config_1 = requireAuthConfig();
  const user_record_1 = requireUserRecord();
  const identifier_1 = requireIdentifier();
  const crypto_signer_1 = requireCryptoSigner();
  function createFirebaseTokenGenerator(app2, tenantId, isEmulator) {
    try {
      const shouldEmulate = isEmulator !== void 0 ? isEmulator : (0, auth_api_request_1.useEmulator)();
      const signer = shouldEmulate ? new token_generator_1.EmulatedSigner() : (0, crypto_signer_1.cryptoSignerFromApp)(app2);
      return new token_generator_1.FirebaseTokenGenerator(signer, tenantId);
    } catch (err) {
      throw (0, token_generator_1.handleCryptoSignerError)(err);
    }
  }
  class BaseAuth {
    /**
     * The BaseAuth class constructor.
     *
     * @param app - The FirebaseApp to associate with this Auth instance.
     * @param authRequestHandler - The RPC request handler for this instance.
     * @param tokenGenerator - Optional token generator. If not specified, a
     *     (non-tenant-aware) instance will be created. Use this paramter to
     *     specify a tenant-aware tokenGenerator.
     * @constructor
     * @internal
     */
    constructor(app2, authRequestHandler, tokenGenerator2) {
      this.authRequestHandler = authRequestHandler;
      this.emulatorMode = !!this.authRequestHandler.emulatorHostValue;
      if (tokenGenerator2) {
        this.tokenGenerator = tokenGenerator2;
      } else {
        this.tokenGenerator = createFirebaseTokenGenerator(app2);
      }
      this.sessionCookieVerifier = (0, token_verifier_1.createSessionCookieVerifier)(app2);
      this.idTokenVerifier = (0, token_verifier_1.createIdTokenVerifier)(app2);
      this.authBlockingTokenVerifier = (0, token_verifier_1.createAuthBlockingTokenVerifier)(app2);
    }
    /**
     * Creates a new Firebase custom token (JWT) that can be sent back to a client
     * device to use to sign in with the client SDKs' `signInWithCustomToken()`
     * methods. (Tenant-aware instances will also embed the tenant ID in the
     * token.)
     *
     * See {@link https://firebase.google.com/docs/auth/admin/create-custom-tokens | Create Custom Tokens}
     * for code samples and detailed documentation.
     *
     * @param uid - The `uid` to use as the custom token's subject.
     * @param developerClaims - Optional additional claims to include
     *   in the custom token's payload.
     *
     * @returns A promise fulfilled with a custom token for the
     *   provided `uid` and payload.
     */
    createCustomToken(uid, developerClaims) {
      return this.tokenGenerator.createCustomToken(uid, developerClaims);
    }
    /**
     * Verifies a Firebase ID token (JWT). If the token is valid, the promise is
     * fulfilled with the token's decoded claims; otherwise, the promise is
     * rejected.
     *
     * If `checkRevoked` is set to true, first verifies whether the corresponding
     * user is disabled. If yes, an `auth/user-disabled` error is thrown. If no,
     * verifies if the session corresponding to the ID token was revoked. If the
     * corresponding user's session was invalidated, an `auth/id-token-revoked`
     * error is thrown. If not specified the check is not applied.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/verify-id-tokens | Verify ID Tokens}
     * for code samples and detailed documentation.
     *
     * @param idToken - The ID token to verify.
     * @param checkRevoked - Whether to check if the ID token was revoked.
     *   This requires an extra request to the Firebase Auth backend to check
     *   the `tokensValidAfterTime` time for the corresponding user.
     *   When not specified, this additional check is not applied.
     *
     * @returns A promise fulfilled with the
     *   token's decoded claims if the ID token is valid; otherwise, a rejected
     *   promise.
     */
    verifyIdToken(idToken, checkRevoked = false) {
      const isEmulator = this.emulatorMode;
      return this.idTokenVerifier.verifyJWT(idToken, isEmulator).then((decodedIdToken) => {
        if (checkRevoked || isEmulator) {
          return this.verifyDecodedJWTNotRevokedOrDisabled(decodedIdToken, error_1.authClientErrorCode.ID_TOKEN_REVOKED);
        }
        return decodedIdToken;
      });
    }
    /**
     * Gets the user data for the user corresponding to a given `uid`.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data | Retrieve user data}
     * for code samples and detailed documentation.
     *
     * @param uid - The `uid` corresponding to the user whose data to fetch.
     *
     * @returns A promise fulfilled with the user
     *   data corresponding to the provided `uid`.
     */
    getUser(uid) {
      return this.authRequestHandler.getAccountInfoByUid(uid).then((response) => {
        return new user_record_1.UserRecord(response.users[0]);
      });
    }
    /**
     * Gets the user data for the user corresponding to a given email.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data | Retrieve user data}
     * for code samples and detailed documentation.
     *
     * @param email - The email corresponding to the user whose data to
     *   fetch.
     *
     * @returns A promise fulfilled with the user
     *   data corresponding to the provided email.
     */
    getUserByEmail(email) {
      return this.authRequestHandler.getAccountInfoByEmail(email).then((response) => {
        return new user_record_1.UserRecord(response.users[0]);
      });
    }
    /**
     * Gets the user data for the user corresponding to a given phone number. The
     * phone number has to conform to the E.164 specification.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data | Retrieve user data}
     * for code samples and detailed documentation.
     *
     * @param phoneNumber - The phone number corresponding to the user whose
     *   data to fetch.
     *
     * @returns A promise fulfilled with the user
     *   data corresponding to the provided phone number.
     */
    getUserByPhoneNumber(phoneNumber) {
      return this.authRequestHandler.getAccountInfoByPhoneNumber(phoneNumber).then((response) => {
        return new user_record_1.UserRecord(response.users[0]);
      });
    }
    /**
     * Gets the user data for the user corresponding to a given provider id.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data | Retrieve user data}
     * for code samples and detailed documentation.
     *
     * @param providerId - The provider ID, for example, "google.com" for the
     *   Google provider.
     * @param uid - The user identifier for the given provider.
     *
     * @returns A promise fulfilled with the user data corresponding to the
     *   given provider id.
     */
    getUserByProviderUid(providerId, uid) {
      if (providerId === "phone") {
        return this.getUserByPhoneNumber(uid);
      } else if (providerId === "email") {
        return this.getUserByEmail(uid);
      }
      return this.authRequestHandler.getAccountInfoByFederatedUid(providerId, uid).then((response) => {
        return new user_record_1.UserRecord(response.users[0]);
      });
    }
    /**
     * Gets the user data corresponding to the specified identifiers.
     *
     * There are no ordering guarantees; in particular, the nth entry in the result list is not
     * guaranteed to correspond to the nth entry in the input parameters list.
     *
     * Only a maximum of 100 identifiers may be supplied. If more than 100 identifiers are supplied,
     * this method throws a FirebaseAuthError.
     *
     * @param identifiers - The identifiers used to indicate which user records should be returned.
     *     Must not have more than 100 entries.
     * @returns A promise that resolves to the corresponding user records.
     * @throws FirebaseAuthError If any of the identifiers are invalid or if more than 100
     *     identifiers are specified.
     */
    getUsers(identifiers) {
      if (!validator2.isArray(identifiers)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "`identifiers` parameter must be an array");
      }
      return this.authRequestHandler.getAccountInfoByIdentifiers(identifiers).then((response) => {
        const isUserFound = ((id, userRecords) => {
          return !!userRecords.find((userRecord2) => {
            if ((0, identifier_1.isUidIdentifier)(id)) {
              return id.uid === userRecord2.uid;
            } else if ((0, identifier_1.isEmailIdentifier)(id)) {
              return id.email === userRecord2.email;
            } else if ((0, identifier_1.isPhoneIdentifier)(id)) {
              return id.phoneNumber === userRecord2.phoneNumber;
            } else if ((0, identifier_1.isProviderIdentifier)(id)) {
              const matchingUserInfo = userRecord2.providerData.find((userInfo) => {
                return id.providerId === userInfo.providerId;
              });
              return !!matchingUserInfo && id.providerUid === matchingUserInfo.uid;
            } else {
              throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "Unhandled identifier type");
            }
          });
        });
        const users = response.users ? response.users.map((user) => new user_record_1.UserRecord(user)) : [];
        const notFound = identifiers.filter((id) => !isUserFound(id, users));
        return { users, notFound };
      });
    }
    /**
     * Retrieves a list of users (single batch only) with a size of `maxResults`
     * starting from the offset as specified by `pageToken`. This is used to
     * retrieve all the users of a specified project in batches.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#list_all_users | List all users}
     * for code samples and detailed documentation.
     *
     * @param maxResults - The page size, 1000 if undefined. This is also
     *   the maximum allowed limit.
     * @param pageToken - The next page token. If not specified, returns
     *   users starting without any offset.
     * @returns A promise that resolves with
     *   the current batch of downloaded users and the next page token.
     */
    listUsers(maxResults, pageToken) {
      return this.authRequestHandler.downloadAccount(maxResults, pageToken).then((response) => {
        const users = [];
        response.users.forEach((userResponse) => {
          users.push(new user_record_1.UserRecord(userResponse));
        });
        const result = {
          users,
          pageToken: response.nextPageToken
        };
        if (typeof result.pageToken === "undefined") {
          delete result.pageToken;
        }
        return result;
      });
    }
    /**
     * Creates a new user.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#create_a_user | Create a user}
     * for code samples and detailed documentation.
     *
     * @param properties - The properties to set on the
     *   new user record to be created.
     *
     * @returns A promise fulfilled with the user
     *   data corresponding to the newly created user.
     */
    createUser(properties) {
      return this.authRequestHandler.createNewAccount(properties).then((uid) => {
        return this.getUser(uid);
      }).catch((error2) => {
        if (error2.code === "auth/user-not-found") {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "Unable to create the user record provided.");
        }
        throw error2;
      });
    }
    /**
     * Deletes an existing user.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#delete_a_user | Delete a user}
     * for code samples and detailed documentation.
     *
     * @param uid - The `uid` corresponding to the user to delete.
     *
     * @returns An empty promise fulfilled once the user has been
     *   deleted.
     */
    deleteUser(uid) {
      return this.authRequestHandler.deleteAccount(uid).then(() => {
      });
    }
    /**
     * Deletes the users specified by the given uids.
     *
     * Deleting a non-existing user won't generate an error (i.e. this method
     * is idempotent.) Non-existing users are considered to be successfully
     * deleted, and are therefore counted in the
     * `DeleteUsersResult.successCount` value.
     *
     * Only a maximum of 1000 identifiers may be supplied. If more than 1000
     * identifiers are supplied, this method throws a FirebaseAuthError.
     *
     * This API is currently rate limited at the server to 1 QPS. If you exceed
     * this, you may get a quota exceeded error. Therefore, if you want to
     * delete more than 1000 users, you may need to add a delay to ensure you
     * don't go over this limit.
     *
     * @param uids - The `uids` corresponding to the users to delete.
     *
     * @returns A Promise that resolves to the total number of successful/failed
     *     deletions, as well as the array of errors that corresponds to the
     *     failed deletions.
     */
    deleteUsers(uids) {
      if (!validator2.isArray(uids)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "`uids` parameter must be an array");
      }
      return this.authRequestHandler.deleteAccounts(
        uids,
        /*force=*/
        true
      ).then((batchDeleteAccountsResponse) => {
        const result = {
          failureCount: 0,
          successCount: uids.length,
          errors: []
        };
        if (!validator2.isNonEmptyArray(batchDeleteAccountsResponse.errors)) {
          return result;
        }
        result.failureCount = batchDeleteAccountsResponse.errors.length;
        result.successCount = uids.length - batchDeleteAccountsResponse.errors.length;
        result.errors = batchDeleteAccountsResponse.errors.map((batchDeleteErrorInfo) => {
          if (batchDeleteErrorInfo.index === void 0) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INTERNAL_ERROR, "Corrupt BatchDeleteAccountsResponse detected");
          }
          const errMsgToError = (msg) => {
            const code = msg && msg.startsWith("NOT_DISABLED") ? error_1.authClientErrorCode.USER_NOT_DISABLED : error_1.authClientErrorCode.INTERNAL_ERROR;
            return new error_1.FirebaseAuthError(code, batchDeleteErrorInfo.message);
          };
          return {
            index: batchDeleteErrorInfo.index,
            error: errMsgToError(batchDeleteErrorInfo.message)
          };
        });
        return result;
      });
    }
    /**
     * Updates an existing user.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-users#update_a_user | Update a user}
     * for code samples and detailed documentation.
     *
     * @param uid - The `uid` corresponding to the user to update.
     * @param properties - The properties to update on
     *   the provided user.
     *
     * @returns A promise fulfilled with the
     *   updated user data.
     */
    updateUser(uid, properties) {
      properties = (0, deep_copy_1.deepCopy)(properties);
      if (properties?.providerToLink) {
        if (properties.providerToLink.providerId === "email") {
          if (typeof properties.email !== "undefined") {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Both UpdateRequest.email and UpdateRequest.providerToLink.providerId='email' were set. To link to the email/password provider, only specify the UpdateRequest.email field.");
          }
          properties.email = properties.providerToLink.uid;
          delete properties.providerToLink;
        } else if (properties.providerToLink.providerId === "phone") {
          if (typeof properties.phoneNumber !== "undefined") {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Both UpdateRequest.phoneNumber and UpdateRequest.providerToLink.providerId='phone' were set. To link to a phone provider, only specify the UpdateRequest.phoneNumber field.");
          }
          properties.phoneNumber = properties.providerToLink.uid;
          delete properties.providerToLink;
        }
      }
      if (properties?.providersToUnlink) {
        if (properties.providersToUnlink.indexOf("phone") !== -1) {
          if (properties.phoneNumber === null) {
            throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, "Both UpdateRequest.phoneNumber=null and UpdateRequest.providersToUnlink=['phone'] were set. To unlink from a phone provider, only specify the UpdateRequest.phoneNumber=null field.");
          }
        }
      }
      return this.authRequestHandler.updateExistingAccount(uid, properties).then((existingUid) => {
        return this.getUser(existingUid);
      });
    }
    /**
     * Sets additional developer claims on an existing user identified by the
     * provided `uid`, typically used to define user roles and levels of
     * access. These claims should propagate to all devices where the user is
     * already signed in (after token expiration or when token refresh is forced)
     * and the next time the user signs in. If a reserved OIDC claim name
     * is used (sub, iat, iss, etc), an error is thrown. They are set on the
     * authenticated user's ID token JWT.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/custom-claims |
     * Defining user roles and access levels}
     * for code samples and detailed documentation.
     *
     * @param uid - The `uid` of the user to edit.
     * @param customUserClaims - The developer claims to set. If null is
     *   passed, existing custom claims are deleted. Passing a custom claims payload
     *   larger than 1000 bytes will throw an error. Custom claims are added to the
     *   user's ID token which is transmitted on every authenticated request.
     *   For profile non-access related user attributes, use database or other
     *   separate storage systems.
     * @returns A promise that resolves when the operation completes
     *   successfully.
     */
    setCustomUserClaims(uid, customUserClaims) {
      return this.authRequestHandler.setCustomUserClaims(uid, customUserClaims).then(() => {
      });
    }
    /**
     * Revokes all refresh tokens for an existing user.
     *
     * This API will update the user's {@link UserRecord.tokensValidAfterTime} to
     * the current UTC. It is important that the server on which this is called has
     * its clock set correctly and synchronized.
     *
     * While this will revoke all sessions for a specified user and disable any
     * new ID tokens for existing sessions from getting minted, existing ID tokens
     * may remain active until their natural expiration (one hour). To verify that
     * ID tokens are revoked, use {@link BaseAuth.verifyIdToken}
     * where `checkRevoked` is set to true.
     *
     * @param uid - The `uid` corresponding to the user whose refresh tokens
     *   are to be revoked.
     *
     * @returns An empty promise fulfilled once the user's refresh
     *   tokens have been revoked.
     */
    revokeRefreshTokens(uid) {
      return this.authRequestHandler.revokeRefreshTokens(uid).then(() => {
      });
    }
    /**
     * Imports the provided list of users into Firebase Auth.
     * A maximum of 1000 users are allowed to be imported one at a time.
     * When importing users with passwords,
     * {@link UserImportOptions} are required to be
     * specified.
     * This operation is optimized for bulk imports and will ignore checks on `uid`,
     * `email` and other identifier uniqueness which could result in duplications.
     *
     * @param users - The list of user records to import to Firebase Auth.
     * @param options - The user import options, required when the users provided include
     *   password credentials.
     * @returns A promise that resolves when
     *   the operation completes with the result of the import. This includes the
     *   number of successful imports, the number of failed imports and their
     *   corresponding errors.
    */
    importUsers(users, options) {
      return this.authRequestHandler.uploadAccount(users, options);
    }
    /**
     * Creates a new Firebase session cookie with the specified options. The created
     * JWT string can be set as a server-side session cookie with a custom cookie
     * policy, and be used for session management. The session cookie JWT will have
     * the same payload claims as the provided ID token.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-cookies | Manage Session Cookies}
     * for code samples and detailed documentation.
     *
     * @param idToken - The Firebase ID token to exchange for a session
     *   cookie.
     * @param sessionCookieOptions - The session
     *   cookie options which includes custom session duration.
     *
     * @returns A promise that resolves on success with the
     *   created session cookie.
     */
    createSessionCookie(idToken, sessionCookieOptions) {
      if (!validator2.isNonNullObject(sessionCookieOptions) || !validator2.isNumber(sessionCookieOptions.expiresIn)) {
        return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_SESSION_COOKIE_DURATION));
      }
      return this.authRequestHandler.createSessionCookie(idToken, sessionCookieOptions.expiresIn);
    }
    /**
     * Verifies a Firebase session cookie. Returns a Promise with the cookie claims.
     * Rejects the promise if the cookie could not be verified.
     *
     * If `checkRevoked` is set to true, first verifies whether the corresponding
     * user is disabled: If yes, an `auth/user-disabled` error is thrown. If no,
     * verifies if the session corresponding to the session cookie was revoked.
     * If the corresponding user's session was invalidated, an
     * `auth/session-cookie-revoked` error is thrown. If not specified the check
     * is not performed.
     *
     * See {@link https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions |
     * Verify Session Cookies}
     * for code samples and detailed documentation
     *
     * @param sessionCookie - The session cookie to verify.
     * @param checkForRevocation -  Whether to check if the session cookie was
     *   revoked. This requires an extra request to the Firebase Auth backend to
     *   check the `tokensValidAfterTime` time for the corresponding user.
     *   When not specified, this additional check is not performed.
     *
     * @returns A promise fulfilled with the
     *   session cookie's decoded claims if the session cookie is valid; otherwise,
     *   a rejected promise.
     */
    verifySessionCookie(sessionCookie, checkRevoked = false) {
      const isEmulator = this.emulatorMode;
      return this.sessionCookieVerifier.verifyJWT(sessionCookie, isEmulator).then((decodedIdToken) => {
        if (checkRevoked || isEmulator) {
          return this.verifyDecodedJWTNotRevokedOrDisabled(decodedIdToken, error_1.authClientErrorCode.SESSION_COOKIE_REVOKED);
        }
        return decodedIdToken;
      });
    }
    /**
     * Generates the out of band email action link to reset a user's password.
     * The link is generated for the user with the specified email address. The
     * optional  {@link ActionCodeSettings} object
     * defines whether the link is to be handled by a mobile app or browser and the
     * additional state information to be passed in the deep link, etc.
     *
     * @example
     * ```javascript
     * var actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *     bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true,
     *   linkDomain: 'project-id.firebaseapp.com'
     * };
     * admin.auth()
     *     .generatePasswordResetLink('user@example.com', actionCodeSettings)
     *     .then(function(link) {
     *       // The link was successfully generated.
     *     })
     *     .catch(function(error) {
     *       // Some error occurred, you can inspect the code: error.code
     *     });
     * ```
     *
     * @param email - The email address of the user whose password is to be
     *   reset.
     * @param actionCodeSettings - The action
     *     code settings. If specified, the state/continue URL is set as the
     *     "continueUrl" parameter in the password reset link. The default password
     *     reset landing page will use this to display a link to go back to the app
     *     if it is installed.
     *     If the actionCodeSettings is not specified, no URL is appended to the
     *     action URL.
     *     The state URL provided must belong to a domain that is whitelisted by the
     *     developer in the console. Otherwise an error is thrown.
     *     Mobile app redirects are only applicable if the developer configures
     *     and accepts the Firebase Dynamic Links terms of service.
     *     The Android package name and iOS bundle ID are respected only if they
     *     are configured in the same Firebase Auth project.
     * @returns A promise that resolves with the generated link.
     */
    generatePasswordResetLink(email, actionCodeSettings) {
      return this.authRequestHandler.getEmailActionLink("PASSWORD_RESET", email, actionCodeSettings);
    }
    /**
     * Generates the out of band email action link to verify the user's ownership
     * of the specified email. The {@link ActionCodeSettings} object provided
     * as an argument to this method defines whether the link is to be handled by a
     * mobile app or browser along with additional state information to be passed in
     * the deep link, etc.
     *
     * @example
     * ```javascript
     * var actionCodeSettings = {
     *   url: 'https://www.example.com/cart?email=user@example.com&cartId=123',
     *   iOS: {
     *     bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true,
     *   linkDomain: 'project-id.firebaseapp.com'
     * };
     * admin.auth()
     *     .generateEmailVerificationLink('user@example.com', actionCodeSettings)
     *     .then(function(link) {
     *       // The link was successfully generated.
     *     })
     *     .catch(function(error) {
     *       // Some error occurred, you can inspect the code: error.code
     *     });
     * ```
     *
     * @param email - The email account to verify.
     * @param actionCodeSettings - The action
     *     code settings. If specified, the state/continue URL is set as the
     *     "continueUrl" parameter in the email verification link. The default email
     *     verification landing page will use this to display a link to go back to
     *     the app if it is installed.
     *     If the actionCodeSettings is not specified, no URL is appended to the
     *     action URL.
     *     The state URL provided must belong to a domain that is whitelisted by the
     *     developer in the console. Otherwise an error is thrown.
     *     Mobile app redirects are only applicable if the developer configures
     *     and accepts the Firebase Dynamic Links terms of service.
     *     The Android package name and iOS bundle ID are respected only if they
     *     are configured in the same Firebase Auth project.
     * @returns A promise that resolves with the generated link.
     */
    generateEmailVerificationLink(email, actionCodeSettings) {
      return this.authRequestHandler.getEmailActionLink("VERIFY_EMAIL", email, actionCodeSettings);
    }
    /**
     * Generates an out-of-band email action link to verify the user's ownership
     * of the specified email. The {@link ActionCodeSettings} object provided
     * as an argument to this method defines whether the link is to be handled by a
     * mobile app or browser along with additional state information to be passed in
     * the deep link, etc.
     *
     * @param email - The current email account.
     * @param newEmail - The email address the account is being updated to.
     * @param actionCodeSettings - The action
     *     code settings. If specified, the state/continue URL is set as the
     *     "continueUrl" parameter in the email verification link. The default email
     *     verification landing page will use this to display a link to go back to
     *     the app if it is installed.
     *     If the actionCodeSettings is not specified, no URL is appended to the
     *     action URL.
     *     The state URL provided must belong to a domain that is authorized
     *     in the console, or an error will be thrown.
     *     Mobile app redirects are only applicable if the developer configures
     *     and accepts the Firebase Dynamic Links terms of service.
     *     The Android package name and iOS bundle ID are respected only if they
     *     are configured in the same Firebase Auth project.
     * @returns A promise that resolves with the generated link.
     */
    generateVerifyAndChangeEmailLink(email, newEmail, actionCodeSettings) {
      return this.authRequestHandler.getEmailActionLink("VERIFY_AND_CHANGE_EMAIL", email, actionCodeSettings, newEmail);
    }
    /**
     * Generates the out of band email action link to verify the user's ownership
     * of the specified email. The {@link ActionCodeSettings} object provided
     * as an argument to this method defines whether the link is to be handled by a
     * mobile app or browser along with additional state information to be passed in
     * the deep link, etc.
     *
     * @example
     * ```javascript
     * var actionCodeSettings = {
     *   url: 'https://www.example.com/cart?email=user@example.com&cartId=123',
     *   iOS: {
     *     bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true,
     *   linkDomain: 'project-id.firebaseapp.com'
     * };
     * admin.auth()
     *     .generateEmailVerificationLink('user@example.com', actionCodeSettings)
     *     .then(function(link) {
     *       // The link was successfully generated.
     *     })
     *     .catch(function(error) {
     *       // Some error occurred, you can inspect the code: error.code
     *     });
     * ```
     *
     * @param email - The email account to verify.
     * @param actionCodeSettings - The action
     *     code settings. If specified, the state/continue URL is set as the
     *     "continueUrl" parameter in the email verification link. The default email
     *     verification landing page will use this to display a link to go back to
     *     the app if it is installed.
     *     If the actionCodeSettings is not specified, no URL is appended to the
     *     action URL.
     *     The state URL provided must belong to a domain that is whitelisted by the
     *     developer in the console. Otherwise an error is thrown.
     *     Mobile app redirects are only applicable if the developer configures
     *     and accepts the Firebase Dynamic Links terms of service.
     *     The Android package name and iOS bundle ID are respected only if they
     *     are configured in the same Firebase Auth project.
     * @returns A promise that resolves with the generated link.
     */
    generateSignInWithEmailLink(email, actionCodeSettings) {
      return this.authRequestHandler.getEmailActionLink("EMAIL_SIGNIN", email, actionCodeSettings);
    }
    /**
     * Returns the list of existing provider configurations matching the filter
     * provided. At most, 100 provider configs can be listed at a time.
     *
     * SAML and OIDC provider support requires Google Cloud's Identity Platform
     * (GCIP). To learn more about GCIP, including pricing and features,
     * see the {@link https://cloud.google.com/identity-platform | GCIP documentation}.
     *
     * @param options - The provider config filter to apply.
     * @returns A promise that resolves with the list of provider configs meeting the
     *   filter requirements.
     */
    listProviderConfigs(options) {
      const processResponse = (response, providerConfigs) => {
        const result = {
          providerConfigs
        };
        if (Object.prototype.hasOwnProperty.call(response, "nextPageToken")) {
          result.pageToken = response.nextPageToken;
        }
        return result;
      };
      if (options && options.type === "oidc") {
        return this.authRequestHandler.listOAuthIdpConfigs(options.maxResults, options.pageToken).then((response) => {
          const providerConfigs = [];
          response.oauthIdpConfigs.forEach((configResponse) => {
            providerConfigs.push(new auth_config_1.OIDCConfig(configResponse));
          });
          return processResponse(response, providerConfigs);
        });
      } else if (options && options.type === "saml") {
        return this.authRequestHandler.listInboundSamlConfigs(options.maxResults, options.pageToken).then((response) => {
          const providerConfigs = [];
          response.inboundSamlConfigs.forEach((configResponse) => {
            providerConfigs.push(new auth_config_1.SAMLConfig(configResponse));
          });
          return processResponse(response, providerConfigs);
        });
      }
      return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ARGUMENT, '"AuthProviderConfigFilter.type" must be either "saml" or "oidc"'));
    }
    /**
     * Looks up an Auth provider configuration by the provided ID.
     * Returns a promise that resolves with the provider configuration
     * corresponding to the provider ID specified. If the specified ID does not
     * exist, an `auth/configuration-not-found` error is thrown.
     *
     * SAML and OIDC provider support requires Google Cloud's Identity Platform
     * (GCIP). To learn more about GCIP, including pricing and features,
     * see the {@link https://cloud.google.com/identity-platform | GCIP documentation}.
     *
     * @param providerId - The provider ID corresponding to the provider
     *     config to return.
     * @returns A promise that resolves
     *     with the configuration corresponding to the provided ID.
     */
    getProviderConfig(providerId) {
      if (auth_config_1.OIDCConfig.isProviderId(providerId)) {
        return this.authRequestHandler.getOAuthIdpConfig(providerId).then((response) => {
          return new auth_config_1.OIDCConfig(response);
        });
      } else if (auth_config_1.SAMLConfig.isProviderId(providerId)) {
        return this.authRequestHandler.getInboundSamlConfig(providerId).then((response) => {
          return new auth_config_1.SAMLConfig(response);
        });
      }
      return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
    }
    /**
     * Deletes the provider configuration corresponding to the provider ID passed.
     * If the specified ID does not exist, an `auth/configuration-not-found` error
     * is thrown.
     *
     * SAML and OIDC provider support requires Google Cloud's Identity Platform
     * (GCIP). To learn more about GCIP, including pricing and features,
     * see the {@link https://cloud.google.com/identity-platform | GCIP documentation}.
     *
     * @param providerId - The provider ID corresponding to the provider
     *     config to delete.
     * @returns A promise that resolves on completion.
     */
    deleteProviderConfig(providerId) {
      if (auth_config_1.OIDCConfig.isProviderId(providerId)) {
        return this.authRequestHandler.deleteOAuthIdpConfig(providerId);
      } else if (auth_config_1.SAMLConfig.isProviderId(providerId)) {
        return this.authRequestHandler.deleteInboundSamlConfig(providerId);
      }
      return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
    }
    /**
     * Returns a promise that resolves with the updated `AuthProviderConfig`
     * corresponding to the provider ID specified.
     * If the specified ID does not exist, an `auth/configuration-not-found` error
     * is thrown.
     *
     * SAML and OIDC provider support requires Google Cloud's Identity Platform
     * (GCIP). To learn more about GCIP, including pricing and features,
     * see the {@link https://cloud.google.com/identity-platform | GCIP documentation}.
     *
     * @param providerId - The provider ID corresponding to the provider
     *     config to update.
     * @param updatedConfig - The updated configuration.
     * @returns A promise that resolves with the updated provider configuration.
     */
    updateProviderConfig(providerId, updatedConfig) {
      if (!validator2.isNonNullObject(updatedConfig)) {
        return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, 'Request is missing "UpdateAuthProviderRequest" configuration.'));
      }
      if (auth_config_1.OIDCConfig.isProviderId(providerId)) {
        return this.authRequestHandler.updateOAuthIdpConfig(providerId, updatedConfig).then((response) => {
          return new auth_config_1.OIDCConfig(response);
        });
      } else if (auth_config_1.SAMLConfig.isProviderId(providerId)) {
        return this.authRequestHandler.updateInboundSamlConfig(providerId, updatedConfig).then((response) => {
          return new auth_config_1.SAMLConfig(response);
        });
      }
      return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
    }
    /**
     * Returns a promise that resolves with the newly created `AuthProviderConfig`
     * when the new provider configuration is created.
     *
     * SAML and OIDC provider support requires Google Cloud's Identity Platform
     * (GCIP). To learn more about GCIP, including pricing and features,
     * see the {@link https://cloud.google.com/identity-platform | GCIP documentation}.
     *
     * @param config - The provider configuration to create.
     * @returns A promise that resolves with the created provider configuration.
     */
    createProviderConfig(config) {
      if (!validator2.isNonNullObject(config)) {
        return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_CONFIG, 'Request is missing "AuthProviderConfig" configuration.'));
      }
      if (auth_config_1.OIDCConfig.isProviderId(config.providerId)) {
        return this.authRequestHandler.createOAuthIdpConfig(config).then((response) => {
          return new auth_config_1.OIDCConfig(response);
        });
      } else if (auth_config_1.SAMLConfig.isProviderId(config.providerId)) {
        return this.authRequestHandler.createInboundSamlConfig(config).then((response) => {
          return new auth_config_1.SAMLConfig(response);
        });
      }
      return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_PROVIDER_ID));
    }
    /** @alpha */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _verifyAuthBlockingToken(token, audience) {
      const isEmulator = this.emulatorMode;
      return this.authBlockingTokenVerifier._verifyAuthBlockingToken(token, isEmulator, audience).then((decodedAuthBlockingToken) => {
        return decodedAuthBlockingToken;
      });
    }
    /**
     * Verifies the decoded Firebase issued JWT is not revoked or disabled. Returns a promise that
     * resolves with the decoded claims on success. Rejects the promise with revocation error if revoked
     * or user disabled.
     *
     * @param decodedIdToken - The JWT's decoded claims.
     * @param revocationErrorInfo - The revocation error info to throw on revocation
     *     detection.
     * @returns A promise that will be fulfilled after a successful verification.
     */
    verifyDecodedJWTNotRevokedOrDisabled(decodedIdToken, revocationErrorInfo) {
      return this.getUser(decodedIdToken.sub).then((user) => {
        if (user.disabled) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.USER_DISABLED, "The user record is disabled.");
        }
        if (user.tokensValidAfterTime) {
          const authTimeUtc = decodedIdToken.auth_time * 1e3;
          const validSinceUtc = new Date(user.tokensValidAfterTime).getTime();
          if (authTimeUtc < validSinceUtc) {
            throw new error_1.FirebaseAuthError(revocationErrorInfo);
          }
        }
        return decodedIdToken;
      });
    }
  }
  baseAuth.BaseAuth = BaseAuth;
  return baseAuth;
}
var hasRequiredTenantManager;
function requireTenantManager() {
  if (hasRequiredTenantManager) return tenantManager;
  hasRequiredTenantManager = 1;
  Object.defineProperty(tenantManager, "__esModule", { value: true });
  tenantManager.TenantManager = tenantManager.TenantAwareAuth = void 0;
  const validator2 = requireValidator();
  const utils2 = requireUtils$1();
  const error_1 = requireError$2();
  const base_auth_1 = requireBaseAuth();
  const tenant_1 = requireTenant();
  const auth_api_request_1 = requireAuthApiRequest();
  class TenantAwareAuth extends base_auth_1.BaseAuth {
    /**
     * The TenantAwareAuth class constructor.
     *
     * @param app - The app that created this tenant.
     * @param tenantId - The corresponding tenant ID.
     * @param emHost - Optional emulator host captured at init time.
     * @constructor
     * @internal
     */
    constructor(app2, tenantId, emHost) {
      const emIsSet = emHost !== void 0;
      super(app2, new auth_api_request_1.TenantAwareAuthRequestHandler(app2, tenantId, emHost), (0, base_auth_1.createFirebaseTokenGenerator)(app2, tenantId, emIsSet ? !!emHost : void 0));
      utils2.addReadonlyGetter(this, "tenantId", tenantId);
    }
    /**
     * {@inheritdoc BaseAuth.verifyIdToken}
     */
    verifyIdToken(idToken, checkRevoked = false) {
      return super.verifyIdToken(idToken, checkRevoked).then((decodedClaims) => {
        if (decodedClaims.firebase.tenant !== this.tenantId) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISMATCHING_TENANT_ID);
        }
        return decodedClaims;
      });
    }
    /**
     * {@inheritdoc BaseAuth.createSessionCookie}
     */
    createSessionCookie(idToken, sessionCookieOptions) {
      if (!validator2.isNonEmptyString(idToken)) {
        return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_ID_TOKEN));
      }
      if (!validator2.isNonNullObject(sessionCookieOptions) || !validator2.isNumber(sessionCookieOptions.expiresIn)) {
        return Promise.reject(new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_SESSION_COOKIE_DURATION));
      }
      return this.verifyIdToken(idToken).then(() => {
        return super.createSessionCookie(idToken, sessionCookieOptions);
      });
    }
    /**
     * {@inheritdoc BaseAuth.verifySessionCookie}
     */
    verifySessionCookie(sessionCookie, checkRevoked = false) {
      return super.verifySessionCookie(sessionCookie, checkRevoked).then((decodedClaims) => {
        if (decodedClaims.firebase.tenant !== this.tenantId) {
          throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.MISMATCHING_TENANT_ID);
        }
        return decodedClaims;
      });
    }
  }
  tenantManager.TenantAwareAuth = TenantAwareAuth;
  class TenantManager {
    /**
     * Initializes a TenantManager instance for a specified FirebaseApp.
     *
     * @param app - The app for this TenantManager instance.
     *
     * @constructor
     * @internal
     */
    constructor(app2) {
      this.app = app2;
      this.authRequestHandler = new auth_api_request_1.AuthRequestHandler(app2);
      this.emulatorHost = this.authRequestHandler.emulatorHostValue;
      this.tenantsMap = {};
    }
    /**
     * Returns a `TenantAwareAuth` instance bound to the given tenant ID.
     *
     * @param tenantId - The tenant ID whose `TenantAwareAuth` instance is to be returned.
     *
     * @returns The `TenantAwareAuth` instance corresponding to this tenant identifier.
     */
    authForTenant(tenantId) {
      if (!validator2.isNonEmptyString(tenantId)) {
        throw new error_1.FirebaseAuthError(error_1.authClientErrorCode.INVALID_TENANT_ID);
      }
      if (typeof this.tenantsMap[tenantId] === "undefined") {
        this.tenantsMap[tenantId] = new TenantAwareAuth(this.app, tenantId, this.emulatorHost ?? null);
      }
      return this.tenantsMap[tenantId];
    }
    /**
     * Gets the tenant configuration for the tenant corresponding to a given `tenantId`.
     *
     * @param tenantId - The tenant identifier corresponding to the tenant whose data to fetch.
     *
     * @returns A promise fulfilled with the tenant configuration to the provided `tenantId`.
     */
    getTenant(tenantId) {
      return this.authRequestHandler.getTenant(tenantId).then((response) => {
        return new tenant_1.Tenant(response);
      });
    }
    /**
     * Retrieves a list of tenants (single batch only) with a size of `maxResults`
     * starting from the offset as specified by `pageToken`. This is used to
     * retrieve all the tenants of a specified project in batches.
     *
     * @param maxResults - The page size, 1000 if undefined. This is also
     *   the maximum allowed limit.
     * @param pageToken - The next page token. If not specified, returns
     *   tenants starting without any offset.
     *
     * @returns A promise that resolves with
     *   a batch of downloaded tenants and the next page token.
     */
    listTenants(maxResults, pageToken) {
      return this.authRequestHandler.listTenants(maxResults, pageToken).then((response) => {
        const tenants = [];
        response.tenants.forEach((tenantResponse) => {
          tenants.push(new tenant_1.Tenant(tenantResponse));
        });
        const result = {
          tenants,
          pageToken: response.nextPageToken
        };
        if (typeof result.pageToken === "undefined") {
          delete result.pageToken;
        }
        return result;
      });
    }
    /**
     * Deletes an existing tenant.
     *
     * @param tenantId - The `tenantId` corresponding to the tenant to delete.
     *
     * @returns An empty promise fulfilled once the tenant has been deleted.
     */
    deleteTenant(tenantId) {
      return this.authRequestHandler.deleteTenant(tenantId);
    }
    /**
     * Creates a new tenant.
     * When creating new tenants, tenants that use separate billing and quota will require their
     * own project and must be defined as `full_service`.
     *
     * @param tenantOptions - The properties to set on the new tenant configuration to be created.
     *
     * @returns A promise fulfilled with the tenant configuration corresponding to the newly
     *   created tenant.
     */
    createTenant(tenantOptions) {
      return this.authRequestHandler.createTenant(tenantOptions).then((response) => {
        return new tenant_1.Tenant(response);
      });
    }
    /**
     * Updates an existing tenant configuration.
     *
     * @param tenantId - The `tenantId` corresponding to the tenant to delete.
     * @param tenantOptions - The properties to update on the provided tenant.
     *
     * @returns A promise fulfilled with the update tenant data.
     */
    updateTenant(tenantId, tenantOptions) {
      return this.authRequestHandler.updateTenant(tenantId, tenantOptions).then((response) => {
        return new tenant_1.Tenant(response);
      });
    }
  }
  tenantManager.TenantManager = TenantManager;
  return tenantManager;
}
var projectConfigManager = {};
var hasRequiredProjectConfigManager;
function requireProjectConfigManager() {
  if (hasRequiredProjectConfigManager) return projectConfigManager;
  hasRequiredProjectConfigManager = 1;
  Object.defineProperty(projectConfigManager, "__esModule", { value: true });
  projectConfigManager.ProjectConfigManager = void 0;
  const project_config_1 = requireProjectConfig();
  const auth_api_request_1 = requireAuthApiRequest();
  class ProjectConfigManager {
    /**
     * Initializes a ProjectConfigManager instance for a specified FirebaseApp.
     *
     * @param app - The app for this ProjectConfigManager instance.
     *
     * @constructor
     * @internal
     */
    constructor(app2) {
      this.authRequestHandler = new auth_api_request_1.AuthRequestHandler(app2);
    }
    /**
     * Get the project configuration.
     *
     * @returns A promise fulfilled with the project configuration.
     */
    getProjectConfig() {
      return this.authRequestHandler.getProjectConfig().then((response) => {
        return new project_config_1.ProjectConfig(response);
      });
    }
    /**
     * Updates an existing project configuration.
     *
     * @param projectConfigOptions - The properties to update on the project.
     *
     * @returns A promise fulfilled with the updated project config.
     */
    updateProjectConfig(projectConfigOptions) {
      return this.authRequestHandler.updateProjectConfig(projectConfigOptions).then((response) => {
        return new project_config_1.ProjectConfig(response);
      });
    }
  }
  projectConfigManager.ProjectConfigManager = ProjectConfigManager;
  return projectConfigManager;
}
var hasRequiredAuth$1;
function requireAuth$1() {
  if (hasRequiredAuth$1) return auth;
  hasRequiredAuth$1 = 1;
  Object.defineProperty(auth, "__esModule", { value: true });
  auth.Auth = void 0;
  const auth_api_request_1 = requireAuthApiRequest();
  const tenant_manager_1 = requireTenantManager();
  const base_auth_1 = requireBaseAuth();
  const project_config_manager_1 = requireProjectConfigManager();
  class Auth extends base_auth_1.BaseAuth {
    /**
     * @param app - The app for this Auth service.
     * @constructor
     * @internal
     */
    constructor(app2) {
      super(app2, new auth_api_request_1.AuthRequestHandler(app2));
      this.app_ = app2;
      this.tenantManager_ = new tenant_manager_1.TenantManager(app2);
      this.projectConfigManager_ = new project_config_manager_1.ProjectConfigManager(app2);
    }
    /**
     * Returns the app associated with this Auth instance.
     *
     * @returns The app associated with this Auth instance.
     */
    get app() {
      return this.app_;
    }
    /**
     * Returns the tenant manager instance associated with the current project.
     *
     * @returns The tenant manager instance associated with the current project.
     */
    tenantManager() {
      return this.tenantManager_;
    }
    /**
     * Returns the project config manager instance associated with the current project.
     *
     * @returns The project config manager instance associated with the current project.
     */
    projectConfigManager() {
      return this.projectConfigManager_;
    }
  }
  auth.Auth = Auth;
  return auth;
}
var hasRequiredAuth;
function requireAuth() {
  if (hasRequiredAuth) return auth$1;
  hasRequiredAuth = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthErrorCode = exports.FirebaseAuthError = exports.UserRecord = exports.UserMetadata = exports.UserInfo = exports.PhoneMultiFactorInfo = exports.MultiFactorSettings = exports.MultiFactorInfo = exports.ProjectConfigManager = exports.ProjectConfig = exports.TenantManager = exports.TenantAwareAuth = exports.Tenant = exports.BaseAuth = exports.Auth = void 0;
    exports.getAuth = getAuth2;
    const index_1 = requireApp();
    const auth_1 = requireAuth$1();
    function getAuth2(app2) {
      if (typeof app2 === "undefined") {
        app2 = (0, index_1.getApp)();
      }
      const firebaseApp2 = app2;
      return firebaseApp2.getOrInitService("auth", (app3) => new auth_1.Auth(app3));
    }
    var auth_2 = requireAuth$1();
    Object.defineProperty(exports, "Auth", { enumerable: true, get: function() {
      return auth_2.Auth;
    } });
    var base_auth_1 = requireBaseAuth();
    Object.defineProperty(exports, "BaseAuth", { enumerable: true, get: function() {
      return base_auth_1.BaseAuth;
    } });
    var tenant_1 = requireTenant();
    Object.defineProperty(exports, "Tenant", { enumerable: true, get: function() {
      return tenant_1.Tenant;
    } });
    var tenant_manager_1 = requireTenantManager();
    Object.defineProperty(exports, "TenantAwareAuth", { enumerable: true, get: function() {
      return tenant_manager_1.TenantAwareAuth;
    } });
    Object.defineProperty(exports, "TenantManager", { enumerable: true, get: function() {
      return tenant_manager_1.TenantManager;
    } });
    var project_config_1 = requireProjectConfig();
    Object.defineProperty(exports, "ProjectConfig", { enumerable: true, get: function() {
      return project_config_1.ProjectConfig;
    } });
    var project_config_manager_1 = requireProjectConfigManager();
    Object.defineProperty(exports, "ProjectConfigManager", { enumerable: true, get: function() {
      return project_config_manager_1.ProjectConfigManager;
    } });
    var user_record_1 = requireUserRecord();
    Object.defineProperty(exports, "MultiFactorInfo", { enumerable: true, get: function() {
      return user_record_1.MultiFactorInfo;
    } });
    Object.defineProperty(exports, "MultiFactorSettings", { enumerable: true, get: function() {
      return user_record_1.MultiFactorSettings;
    } });
    Object.defineProperty(exports, "PhoneMultiFactorInfo", { enumerable: true, get: function() {
      return user_record_1.PhoneMultiFactorInfo;
    } });
    Object.defineProperty(exports, "UserInfo", { enumerable: true, get: function() {
      return user_record_1.UserInfo;
    } });
    Object.defineProperty(exports, "UserMetadata", { enumerable: true, get: function() {
      return user_record_1.UserMetadata;
    } });
    Object.defineProperty(exports, "UserRecord", { enumerable: true, get: function() {
      return user_record_1.UserRecord;
    } });
    var error_1 = requireError$2();
    Object.defineProperty(exports, "FirebaseAuthError", { enumerable: true, get: function() {
      return error_1.FirebaseAuthError;
    } });
    Object.defineProperty(exports, "AuthErrorCode", { enumerable: true, get: function() {
      return error_1.AuthErrorCode;
    } });
  })(auth$1);
  return auth$1;
}
var authExports = requireAuth();
const mod$2 = /* @__PURE__ */ getDefaultExportFromCjs(authExports);
mod$2.Auth;
mod$2.AuthErrorCode;
mod$2.BaseAuth;
mod$2.FirebaseAuthError;
mod$2.MultiFactorInfo;
mod$2.MultiFactorSettings;
mod$2.PhoneMultiFactorInfo;
mod$2.ProjectConfig;
mod$2.ProjectConfigManager;
mod$2.Tenant;
mod$2.TenantAwareAuth;
mod$2.TenantManager;
mod$2.UserInfo;
mod$2.UserMetadata;
mod$2.UserRecord;
const getAuth = mod$2.getAuth;
var firestore = {};
var firestoreInternal = {};
var error$1 = {};
var hasRequiredError$1;
function requireError$1() {
  if (hasRequiredError$1) return error$1;
  hasRequiredError$1 = 1;
  Object.defineProperty(error$1, "__esModule", { value: true });
  error$1.FirebaseFirestoreError = error$1.FirestoreErrorCode = void 0;
  const error_1 = requireError$4();
  error$1.FirestoreErrorCode = {
    FAILED_PRECONDITION: "failed-precondition",
    INVALID_ARGUMENT: "invalid-argument",
    INVALID_CREDENTIAL: "invalid-credential",
    MISSING_DEPENDENCIES: "missing-dependencies"
  };
  class FirebaseFirestoreError extends error_1.FirebaseError {
    /**
     * @param info - The error code info.
     * @param message - The error message. This will override the default
     *     message if provided.
     */
    constructor(info, message) {
      super({
        code: `firestore/${info.code}`,
        message: message || info.message,
        httpResponse: info.httpResponse,
        cause: info.cause
      });
      this.codePrefix = "firestore";
    }
  }
  error$1.FirebaseFirestoreError = FirebaseFirestoreError;
  return error$1;
}
var hasRequiredFirestoreInternal;
function requireFirestoreInternal() {
  if (hasRequiredFirestoreInternal) return firestoreInternal;
  hasRequiredFirestoreInternal = 1;
  Object.defineProperty(firestoreInternal, "__esModule", { value: true });
  firestoreInternal.FirestoreService = firestoreInternal.DEFAULT_DATABASE_ID = void 0;
  firestoreInternal.getFirestoreOptions = getFirestoreOptions;
  const error_1 = requireError$1();
  const credential_internal_1 = requireCredentialInternal();
  const validator2 = requireValidator();
  const utils2 = requireUtils$1();
  firestoreInternal.DEFAULT_DATABASE_ID = "(default)";
  class FirestoreService {
    constructor(app2) {
      this.databases = /* @__PURE__ */ new Map();
      this.firestoreSettings = /* @__PURE__ */ new Map();
      this.appInternal = app2;
    }
    initializeDatabase(databaseId, settings) {
      const existingInstance = this.databases.get(databaseId);
      if (existingInstance) {
        const initialSettings = this.firestoreSettings.get(databaseId) ?? {};
        if (this.checkIfSameSettings(settings, initialSettings)) {
          return existingInstance;
        }
        throw new error_1.FirebaseFirestoreError({
          code: "failed-precondition",
          message: "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance."
        });
      }
      const newInstance = initFirestore(this.app, databaseId, settings);
      this.databases.set(databaseId, newInstance);
      this.firestoreSettings.set(databaseId, settings);
      return newInstance;
    }
    getDatabase(databaseId) {
      let database = this.databases.get(databaseId);
      if (database === void 0) {
        database = initFirestore(this.app, databaseId, {});
        this.databases.set(databaseId, database);
        this.firestoreSettings.set(databaseId, {});
      }
      return database;
    }
    checkIfSameSettings(settingsA, settingsB) {
      const a = settingsA ?? {};
      const b = settingsB ?? {};
      return a.preferRest === b.preferRest;
    }
    /**
     * Returns the app associated with this Storage instance.
     *
     * @returns The app associated with this Storage instance.
     */
    get app() {
      return this.appInternal;
    }
  }
  firestoreInternal.FirestoreService = FirestoreService;
  function getFirestoreOptions(app2, firestoreSettings) {
    if (!validator2.isNonNullObject(app2) || !("options" in app2)) {
      throw new error_1.FirebaseFirestoreError({
        code: "invalid-argument",
        message: "First argument passed to admin.firestore() must be a valid Firebase app instance."
      });
    }
    const projectId = utils2.getExplicitProjectId(app2);
    const credential = app2.options.credential;
    const sdkVersion = utils2.getSdkVersion();
    const preferRest = firestoreSettings?.preferRest;
    if (credential instanceof credential_internal_1.ServiceAccountCredential) {
      return {
        credentials: {
          private_key: credential.privateKey,
          client_email: credential.clientEmail
        },
        // When the SDK is initialized with ServiceAccountCredentials an explicit projectId is
        // guaranteed to be available.
        projectId,
        firebaseVersion: sdkVersion,
        firebaseAdminVersion: sdkVersion,
        preferRest
      };
    } else if ((0, credential_internal_1.isApplicationDefault)(app2.options.credential)) {
      return validator2.isNonEmptyString(projectId) ? {
        projectId,
        firebaseVersion: sdkVersion,
        firebaseAdminVersion: sdkVersion,
        preferRest
      } : {
        firebaseVersion: sdkVersion,
        firebaseAdminVersion: sdkVersion,
        preferRest
      };
    }
    throw new error_1.FirebaseFirestoreError({
      code: "invalid-credential",
      message: "Failed to initialize Google Cloud Firestore client with the available credentials. Must initialize the SDK with a certificate credential or application default credentials to use Cloud Firestore API."
    });
  }
  function initFirestore(app2, databaseId, firestoreSettings) {
    const options = getFirestoreOptions(app2, firestoreSettings);
    options.databaseId = databaseId;
    let firestoreDatabase;
    try {
      firestoreDatabase = requireSrc$2().Firestore;
    } catch (err) {
      throw new error_1.FirebaseFirestoreError({
        code: "missing-dependencies",
        message: 'Failed to import the Cloud Firestore client library for Node.js. Make sure to install the "@google-cloud/firestore" npm package.',
        cause: err
      });
    }
    return new firestoreDatabase(options);
  }
  return firestoreInternal;
}
var hasRequiredFirestore;
function requireFirestore() {
  if (hasRequiredFirestore) return firestore;
  hasRequiredFirestore = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FirebaseFirestoreError = exports.FirestoreErrorCode = exports.setLogFunction = exports.v1 = exports.WriteResult = exports.WriteBatch = exports.Transaction = exports.Timestamp = exports.QuerySnapshot = exports.QueryPartition = exports.QueryDocumentSnapshot = exports.Query = exports.GrpcStatus = exports.GeoPoint = exports.Firestore = exports.Filter = exports.FieldValue = exports.FieldPath = exports.DocumentSnapshot = exports.DocumentReference = exports.CollectionReference = exports.CollectionGroup = exports.BundleBuilder = exports.BulkWriter = exports.AggregateQuerySnapshot = exports.AggregateQuery = exports.AggregateField = void 0;
    exports.getFirestore = getFirestore2;
    exports.initializeFirestore = initializeFirestore;
    const app_1 = requireApp();
    const firestore_internal_1 = requireFirestoreInternal();
    var firestore_1 = requireSrc$2();
    Object.defineProperty(exports, "AggregateField", { enumerable: true, get: function() {
      return firestore_1.AggregateField;
    } });
    Object.defineProperty(exports, "AggregateQuery", { enumerable: true, get: function() {
      return firestore_1.AggregateQuery;
    } });
    Object.defineProperty(exports, "AggregateQuerySnapshot", { enumerable: true, get: function() {
      return firestore_1.AggregateQuerySnapshot;
    } });
    Object.defineProperty(exports, "BulkWriter", { enumerable: true, get: function() {
      return firestore_1.BulkWriter;
    } });
    Object.defineProperty(exports, "BundleBuilder", { enumerable: true, get: function() {
      return firestore_1.BundleBuilder;
    } });
    Object.defineProperty(exports, "CollectionGroup", { enumerable: true, get: function() {
      return firestore_1.CollectionGroup;
    } });
    Object.defineProperty(exports, "CollectionReference", { enumerable: true, get: function() {
      return firestore_1.CollectionReference;
    } });
    Object.defineProperty(exports, "DocumentReference", { enumerable: true, get: function() {
      return firestore_1.DocumentReference;
    } });
    Object.defineProperty(exports, "DocumentSnapshot", { enumerable: true, get: function() {
      return firestore_1.DocumentSnapshot;
    } });
    Object.defineProperty(exports, "FieldPath", { enumerable: true, get: function() {
      return firestore_1.FieldPath;
    } });
    Object.defineProperty(exports, "FieldValue", { enumerable: true, get: function() {
      return firestore_1.FieldValue;
    } });
    Object.defineProperty(exports, "Filter", { enumerable: true, get: function() {
      return firestore_1.Filter;
    } });
    Object.defineProperty(exports, "Firestore", { enumerable: true, get: function() {
      return firestore_1.Firestore;
    } });
    Object.defineProperty(exports, "GeoPoint", { enumerable: true, get: function() {
      return firestore_1.GeoPoint;
    } });
    Object.defineProperty(exports, "GrpcStatus", { enumerable: true, get: function() {
      return firestore_1.GrpcStatus;
    } });
    Object.defineProperty(exports, "Query", { enumerable: true, get: function() {
      return firestore_1.Query;
    } });
    Object.defineProperty(exports, "QueryDocumentSnapshot", { enumerable: true, get: function() {
      return firestore_1.QueryDocumentSnapshot;
    } });
    Object.defineProperty(exports, "QueryPartition", { enumerable: true, get: function() {
      return firestore_1.QueryPartition;
    } });
    Object.defineProperty(exports, "QuerySnapshot", { enumerable: true, get: function() {
      return firestore_1.QuerySnapshot;
    } });
    Object.defineProperty(exports, "Timestamp", { enumerable: true, get: function() {
      return firestore_1.Timestamp;
    } });
    Object.defineProperty(exports, "Transaction", { enumerable: true, get: function() {
      return firestore_1.Transaction;
    } });
    Object.defineProperty(exports, "WriteBatch", { enumerable: true, get: function() {
      return firestore_1.WriteBatch;
    } });
    Object.defineProperty(exports, "WriteResult", { enumerable: true, get: function() {
      return firestore_1.WriteResult;
    } });
    Object.defineProperty(exports, "v1", { enumerable: true, get: function() {
      return firestore_1.v1;
    } });
    Object.defineProperty(exports, "setLogFunction", { enumerable: true, get: function() {
      return firestore_1.setLogFunction;
    } });
    function getFirestore2(appOrDatabaseId, optionalDatabaseId) {
      const app2 = typeof appOrDatabaseId === "object" ? appOrDatabaseId : (0, app_1.getApp)();
      const databaseId = (typeof appOrDatabaseId === "string" ? appOrDatabaseId : optionalDatabaseId) || firestore_internal_1.DEFAULT_DATABASE_ID;
      const firebaseApp2 = app2;
      const firestoreService = firebaseApp2.getOrInitService("firestore", (app3) => new firestore_internal_1.FirestoreService(app3));
      return firestoreService.getDatabase(databaseId);
    }
    function initializeFirestore(app2, settings, databaseId) {
      settings ??= {};
      databaseId ??= firestore_internal_1.DEFAULT_DATABASE_ID;
      const firebaseApp2 = app2;
      const firestoreService = firebaseApp2.getOrInitService("firestore", (app3) => new firestore_internal_1.FirestoreService(app3));
      return firestoreService.initializeDatabase(databaseId, settings);
    }
    var error_1 = requireError$1();
    Object.defineProperty(exports, "FirestoreErrorCode", { enumerable: true, get: function() {
      return error_1.FirestoreErrorCode;
    } });
    Object.defineProperty(exports, "FirebaseFirestoreError", { enumerable: true, get: function() {
      return error_1.FirebaseFirestoreError;
    } });
  })(firestore);
  return firestore;
}
var firestoreExports = requireFirestore();
const mod$1 = /* @__PURE__ */ getDefaultExportFromCjs(firestoreExports);
mod$1.AggregateField;
mod$1.AggregateQuery;
mod$1.AggregateQuerySnapshot;
mod$1.BulkWriter;
mod$1.BundleBuilder;
mod$1.CollectionGroup;
mod$1.CollectionReference;
mod$1.DocumentReference;
mod$1.DocumentSnapshot;
mod$1.FieldPath;
mod$1.FieldValue;
mod$1.Filter;
mod$1.FirebaseFirestoreError;
mod$1.Firestore;
mod$1.FirestoreErrorCode;
mod$1.GeoPoint;
mod$1.GrpcStatus;
mod$1.Query;
mod$1.QueryDocumentSnapshot;
mod$1.QueryPartition;
mod$1.QuerySnapshot;
mod$1.Timestamp;
mod$1.Transaction;
mod$1.WriteBatch;
mod$1.WriteResult;
const getFirestore = mod$1.getFirestore;
mod$1.initializeFirestore;
mod$1.setLogFunction;
mod$1.v1;
var storage$1 = {};
var storage = {};
var error = {};
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1;
  Object.defineProperty(error, "__esModule", { value: true });
  error.FirebaseStorageError = error.StorageErrorCode = void 0;
  const error_1 = requireError$4();
  error.StorageErrorCode = {
    INVALID_ARGUMENT: "invalid-argument",
    INVALID_EMULATOR_HOST: "invalid-emulator-host",
    MISSING_DEPENDENCIES: "missing-dependencies",
    INVALID_CREDENTIAL: "invalid-credential",
    NO_DOWNLOAD_TOKEN: "no-download-token"
  };
  class FirebaseStorageError extends error_1.FirebaseError {
    /**
     * @param info - The error code info.
     * @param message - The error message. If provided, this will override the default message.
     */
    constructor(info, message) {
      super({
        code: `storage/${info.code}`,
        message: message || info.message,
        httpResponse: info.httpResponse,
        cause: info.cause
      });
      this.codePrefix = "storage";
    }
  }
  error.FirebaseStorageError = FirebaseStorageError;
  return error;
}
var hasRequiredStorage$1;
function requireStorage$1() {
  if (hasRequiredStorage$1) return storage;
  hasRequiredStorage$1 = 1;
  Object.defineProperty(storage, "__esModule", { value: true });
  storage.Storage = void 0;
  const error_1 = requireError();
  const credential_internal_1 = requireCredentialInternal();
  const utils2 = requireUtils$1();
  const validator2 = requireValidator();
  class Storage {
    /**
     * @param app - The app for this Storage service.
     * @constructor
     * @internal
     */
    constructor(app2) {
      if (!validator2.isNonNullObject(app2) || !("options" in app2)) {
        throw new error_1.FirebaseStorageError({
          code: "invalid-argument",
          message: "First argument passed to admin.storage() must be a valid Firebase app instance."
        });
      }
      if (!process.env.STORAGE_EMULATOR_HOST && process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
        const firebaseStorageEmulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST;
        if (firebaseStorageEmulatorHost.match(/https?:\/\//)) {
          throw new error_1.FirebaseStorageError({
            code: "invalid-emulator-host",
            message: "FIREBASE_STORAGE_EMULATOR_HOST should not contain a protocol (http or https)."
          });
        }
        process.env.STORAGE_EMULATOR_HOST = `http://${process.env.FIREBASE_STORAGE_EMULATOR_HOST}`;
      }
      let storage2;
      try {
        storage2 = requireSrc$3().Storage;
      } catch (err) {
        throw new error_1.FirebaseStorageError({
          code: "missing-dependencies",
          message: `Failed to import the Cloud Storage client library for Node.js. Make sure to install the "@google-cloud/storage" npm package. Original error: ${err}`
        });
      }
      const projectId = utils2.getExplicitProjectId(app2);
      const credential = app2.options.credential;
      if (credential instanceof credential_internal_1.ServiceAccountCredential) {
        this.storageClient = new storage2({
          // When the SDK is initialized with ServiceAccountCredentials an explicit projectId is
          // guaranteed to be available.
          projectId,
          credentials: {
            private_key: credential.privateKey,
            client_email: credential.clientEmail
          }
        });
      } else if ((0, credential_internal_1.isApplicationDefault)(app2.options.credential)) {
        this.storageClient = new storage2();
      } else {
        throw new error_1.FirebaseStorageError({
          code: "invalid-credential",
          message: "Failed to initialize Google Cloud Storage client with the available credential. Must initialize the SDK with a certificate credential or application default credentials to use Cloud Storage API."
        });
      }
      this.appInternal = app2;
    }
    /**
     * Gets a reference to a Cloud Storage bucket.
     *
     * @param name - Optional name of the bucket to be retrieved. If name is not specified,
     * retrieves a reference to the default bucket.
     * @returns A {@link https://cloud.google.com/nodejs/docs/reference/storage/latest/Bucket | Bucket}
     * instance as defined in the `@google-cloud/storage` package.
     */
    bucket(name) {
      const bucketName = typeof name !== "undefined" ? name : this.appInternal.options.storageBucket;
      if (validator2.isNonEmptyString(bucketName)) {
        return this.storageClient.bucket(bucketName);
      }
      throw new error_1.FirebaseStorageError({
        code: "invalid-argument",
        message: "Bucket name not specified or invalid. Specify a valid bucket name via the storageBucket option when initializing the app, or specify the bucket name explicitly when calling the getBucket() method."
      });
    }
    /**
     * Optional app whose `Storage` service to
     * return. If not provided, the default `Storage` service will be returned.
     */
    get app() {
      return this.appInternal;
    }
  }
  storage.Storage = Storage;
  return storage;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.getFirebaseMetadata = getFirebaseMetadata;
  function getFirebaseMetadata(endpoint, file) {
    const uri = `${endpoint}/b/${file.bucket.name}/o/${encodeURIComponent(file.name)}`;
    return new Promise((resolve, reject) => {
      file.storage.makeAuthenticatedRequest({
        method: "GET",
        uri
      }, (err, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }
  return utils;
}
var hasRequiredStorage;
function requireStorage() {
  if (hasRequiredStorage) return storage$1;
  hasRequiredStorage = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorageErrorCode = exports.FirebaseStorageError = exports.Storage = void 0;
    exports.getStorage = getStorage2;
    exports.getDownloadURL = getDownloadURL;
    const app_1 = requireApp();
    const storage_1 = requireStorage$1();
    const error_1 = requireError();
    const utils_1 = requireUtils();
    var storage_2 = requireStorage$1();
    Object.defineProperty(exports, "Storage", { enumerable: true, get: function() {
      return storage_2.Storage;
    } });
    function getStorage2(app2) {
      if (typeof app2 === "undefined") {
        app2 = (0, app_1.getApp)();
      }
      const firebaseApp2 = app2;
      return firebaseApp2.getOrInitService("storage", (app3) => new storage_1.Storage(app3));
    }
    async function getDownloadURL(file) {
      const endpoint = (process.env.STORAGE_EMULATOR_HOST || "https://firebasestorage.googleapis.com") + "/v0";
      const { downloadTokens } = await (0, utils_1.getFirebaseMetadata)(endpoint, file);
      if (!downloadTokens) {
        throw new error_1.FirebaseStorageError({
          code: "no-download-token",
          message: "No download token available. Please create one in the Firebase Console."
        });
      }
      const [token] = downloadTokens.split(",");
      return `${endpoint}/b/${file.bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
    }
    var error_2 = requireError();
    Object.defineProperty(exports, "FirebaseStorageError", { enumerable: true, get: function() {
      return error_2.FirebaseStorageError;
    } });
    Object.defineProperty(exports, "StorageErrorCode", { enumerable: true, get: function() {
      return error_2.StorageErrorCode;
    } });
  })(storage$1);
  return storage$1;
}
var storageExports = requireStorage();
const mod = /* @__PURE__ */ getDefaultExportFromCjs(storageExports);
mod.FirebaseStorageError;
mod.Storage;
mod.StorageErrorCode;
mod.getDownloadURL;
const getStorage = mod.getStorage;
export {
  getFirestore as a,
  getApps as b,
  cert as c,
  applicationDefault as d,
  getStorage as e,
  getAuth as g,
  initializeApp as i
};
