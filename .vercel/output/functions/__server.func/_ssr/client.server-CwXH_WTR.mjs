import { b as adminDb, a as adminAuth } from "./client.server-B5gl9oyA.mjs";
import "../_libs/firebase-admin.mjs";
import "../_libs/react.mjs";
import "http";
import "http2";
import "zlib";
import "https";
import "events";
import "../_libs/@fastify/busboy.mjs";
import "node:events";
import "node:stream";
import "node:util";
import "node:crypto";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "stream";
import "util";
import "../_libs/jwa.mjs";
import "crypto";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "../_libs/jwks-rsa.mjs";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/jose.mjs";
import "../_libs/lru-memoizer.mjs";
import "../_libs/lru-cache.mjs";
import "node:diagnostics_channel";
import "../_libs/lodash.clonedeep.mjs";
import "../_libs/limiter.mjs";
import "../_libs/@google-cloud/firestore.mjs";
import "assert";
import "url";
import "../_libs/google-gax.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "tls";
import "net";
import "dns";
import "process";
import "fs";
import "../_libs/js-sdsl__ordered-map.mjs";
import "../_libs/grpc__proto-loader.mjs";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "path";
import "child_process";
import "../_libs/google-auth-library.mjs";
import "querystring";
import "../_libs/gaxios.mjs";
import "../_libs/extend.mjs";
import "../_libs/node-fetch.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "punycode";
import "../_libs/tr46.mjs";
import "node:http";
import "node:https";
import "node:zlib";
import "node:buffer";
import "../_libs/data-uri-to-buffer.mjs";
import "../_libs/fetch-blob.mjs";
import "node:fs";
import "../_libs/node-domexception.mjs";
import "../_libs/web-streams-polyfill.mjs";
import "../_libs/formdata-polyfill.mjs";
import "node:url";
import "node:net";
import "../_libs/is-stream.mjs";
import "../_libs/uuid.mjs";
import "../_libs/https-proxy-agent.mjs";
import "../_libs/agent-base.mjs";
import "../_libs/gcp-metadata.mjs";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "node:process";
import "../_libs/base64-js.mjs";
import "../_libs/gtoken.mjs";
import "../_libs/object-hash.mjs";
import "../_libs/proto3-json-serializer.mjs";
import "../_libs/duplexify.mjs";
import "../_libs/readable-stream.mjs";
import "node:string_decoder";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/end-of-stream.mjs";
import "../_libs/once.mjs";
import "../_libs/wrappy.mjs";
import "../_libs/stream-shift.mjs";
import "../_libs/retry-request.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/functional-red-black-tree.mjs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/google-cloud__storage.mjs";
import "../_libs/google-cloud__projectify.mjs";
import "../_libs/html-entities.mjs";
import "../_libs/teeny-request.mjs";
import "../_libs/http-proxy-agent.mjs";
import "../_libs/tootallnate__once.mjs";
import "../_libs/stream-events.mjs";
import "../_libs/stubs.mjs";
import "../_libs/google-cloud__promisify.mjs";
import "../_libs/google-cloud__paginator.mjs";
import "../_libs/arrify.mjs";
import "../_libs/mime.mjs";
import "../_libs/p-limit.mjs";
import "../_libs/yocto-queue.mjs";
import "../_libs/async-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/abort-controller.mjs";
import "../_libs/event-target-shim.mjs";
import "../_libs/fast-xml-parser.mjs";
class QueryBuilder {
  table;
  selects = "*";
  filters = [];
  orderField = null;
  orderAscending = true;
  limitCount = null;
  countOption = null;
  headOption = false;
  constructor(table) {
    this.table = table;
  }
  select(fields, options) {
    this.selects = fields;
    this.countOption = options?.count || null;
    this.headOption = options?.head || false;
    return this;
  }
  eq(field, value) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "==", value });
    return this;
  }
  in(field, values) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "in", value: values });
    return this;
  }
  order(field, options) {
    this.orderField = field === "id" ? "__name__" : field;
    this.orderAscending = options?.ascending !== false;
    return this;
  }
  limit(count) {
    this.limitCount = count;
    return this;
  }
  async get() {
    let ref = adminDb.collection(this.table);
    const hasEmptyInFilter = this.filters.some(
      (f) => f.op === "in" && (!Array.isArray(f.value) || f.value.length === 0)
    );
    if (hasEmptyInFilter) {
      if (this.countOption) {
        return { count: 0, data: [], error: null };
      }
      return { data: [], error: null };
    }
    for (const f of this.filters) {
      ref = ref.where(f.field, f.op, f.value);
    }
    if (this.orderField) {
      ref = ref.orderBy(this.orderField, this.orderAscending ? "asc" : "desc");
    }
    if (this.limitCount !== null) {
      ref = ref.limit(this.limitCount);
    }
    try {
      const snapshot = await ref.get();
      if (this.countOption) {
        return { count: snapshot.size, data: null, error: null };
      }
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      await this.resolveJoins(results);
      return { data: results, error: null };
    } catch (err) {
      console.error(`[Firebase DB Adapter] Query error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
  async single() {
    const { data, error } = await this.get();
    if (error) return { data: null, error };
    if (!data || data.length === 0) return { data: null, error: new Error("Row not found") };
    return { data: data[0], error: null };
  }
  async maybeSingle() {
    const { data, error } = await this.get();
    if (error) return { data: null, error };
    return { data: data && data.length > 0 ? data[0] : null, error: null };
  }
  async resolveJoins(items) {
    if (items.length === 0) return;
    if (this.selects.includes("courses(")) {
      await this.join(items, "course_id", "courses", "courses");
    }
    if (this.selects.includes("batches(")) {
      await this.join(items, "batch_id", "batches", "batches");
    }
    if (this.selects.includes("assignments(")) {
      await this.join(items, "assignment_id", "assignments", "assignments");
    }
    if (this.selects.includes("quizzes(")) {
      await this.join(items, "quiz_id", "quizzes", "quizzes");
    }
    if (this.selects.includes("lectures(")) {
      await this.join(items, "lecture_id", "lectures", "lectures");
    }
    if (this.selects.includes("profiles:user_id(") || this.selects.includes("profiles(")) {
      await this.join(items, "user_id", "profiles", "profiles");
      for (const item of items) {
        if (item.profiles) {
          item["profiles:user_id"] = item.profiles;
        }
      }
    }
    if (this.selects.includes("batches(courses(")) {
      const nestedBatches = items.map((item) => item.batches).filter(Boolean);
      if (nestedBatches.length > 0) {
        await this.join(nestedBatches, "course_id", "courses", "courses");
      }
    }
  }
  async join(items, fkField, refTable, targetField) {
    const ids = Array.from(new Set(items.map((item) => item[fkField]).filter(Boolean)));
    if (ids.length === 0) return;
    try {
      const refSnapshot = await adminDb.collection(refTable).where("__name__", "in", ids).get();
      const refMap = /* @__PURE__ */ new Map();
      refSnapshot.forEach((doc) => {
        refMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
      for (const item of items) {
        const fk = item[fkField];
        if (fk && refMap.has(fk)) {
          item[targetField] = refMap.get(fk);
        } else {
          item[targetField] = null;
        }
      }
    } catch (err) {
      console.warn(`[Firebase DB Adapter] Join failed for ${refTable} on keys:`, ids, err);
    }
  }
}
class WriteBuilder {
  table;
  filters = [];
  constructor(table) {
    this.table = table;
  }
  eq(field, value) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "==", value });
    return this;
  }
  async insert(payload) {
    const collectionRef = adminDb.collection(this.table);
    const payloads = Array.isArray(payload) ? payload : [payload];
    const results = [];
    try {
      for (const p of payloads) {
        let docRef;
        if (p.id) {
          docRef = collectionRef.doc(p.id);
          const data = { ...p };
          delete data.id;
          await docRef.set(data);
          results.push({ id: p.id, ...data });
        } else {
          docRef = await collectionRef.add(p);
          results.push({ id: docRef.id, ...p });
        }
      }
      return { data: Array.isArray(payload) ? results : results[0], error: null };
    } catch (err) {
      console.error(`[Firebase DB Adapter] Insert error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
  async update(payload) {
    let queryRef = adminDb.collection(this.table);
    for (const f of this.filters) {
      queryRef = queryRef.where(f.field, f.op, f.value);
    }
    try {
      const snapshot = await queryRef.get();
      const results = [];
      const batch = adminDb.batch();
      snapshot.forEach((doc) => {
        const docRef = adminDb.collection(this.table).doc(doc.id);
        batch.update(docRef, payload);
        results.push({ id: doc.id, ...doc.data(), ...payload });
      });
      await batch.commit();
      return { data: results, error: null };
    } catch (err) {
      console.error(`[Firebase DB Adapter] Update error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
  async delete() {
    let queryRef = adminDb.collection(this.table);
    for (const f of this.filters) {
      queryRef = queryRef.where(f.field, f.op, f.value);
    }
    try {
      const snapshot = await queryRef.get();
      const results = [];
      const batch = adminDb.batch();
      snapshot.forEach((doc) => {
        const docRef = adminDb.collection(this.table).doc(doc.id);
        batch.delete(docRef);
        results.push({ id: doc.id, ...doc.data() });
      });
      await batch.commit();
      return { data: results, error: null };
    } catch (err) {
      console.error(`[Firebase DB Adapter] Delete error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
  async upsert(payload) {
    const collectionRef = adminDb.collection(this.table);
    try {
      if (payload.id) {
        const docRef = collectionRef.doc(payload.id);
        const data = { ...payload };
        delete data.id;
        await docRef.set(data, { merge: true });
        return { data: payload, error: null };
      } else {
        return this.insert(payload);
      }
    } catch (err) {
      console.error(`[Firebase DB Adapter] Upsert error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
}
class AdminAuthWrapper {
  async listUsers(options) {
    try {
      const result = await adminAuth.listUsers(options?.perPage || 200);
      const mappedUsers = result.users.map((u) => ({
        id: u.uid,
        email: u.email ?? "",
        created_at: u.metadata.creationTime ?? (/* @__PURE__ */ new Date()).toISOString()
      }));
      return { data: { users: mappedUsers }, error: null };
    } catch (err) {
      console.error("Error listing users in firebase-admin:", err);
      return { data: null, error: err };
    }
  }
}
class AuthWrapper {
  admin = new AdminAuthWrapper();
}
const supabaseAdmin = {
  auth: new AuthWrapper(),
  from: (table) => {
    const query = new QueryBuilder(table);
    const write = new WriteBuilder(table);
    return new Proxy({}, {
      get(_, prop) {
        if (prop in query) {
          const val = query[prop];
          if (typeof val === "function") {
            return (...args) => {
              const res = val.apply(query, args);
              return res === query ? _ : res;
            };
          }
          return val;
        }
        if (prop in write) {
          const val = write[prop];
          if (typeof val === "function") {
            return (...args) => {
              const res = val.apply(write, args);
              return res === write ? _ : res;
            };
          }
          return val;
        }
        return void 0;
      }
    });
  }
};
export {
  supabaseAdmin
};
