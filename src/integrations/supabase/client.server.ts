import { db } from "@/integrations/firebase/client";
import {
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch
} from "firebase/firestore";

class QueryBuilder {
  private table: string;
  private selects: string = "*";
  private filters: Array<{ field: string; op: string; value: any }> = [];
  private orderField: string | null = null;
  private orderAscending: boolean = true;
  private limitCount: number | null = null;
  private countOption: string | null = null;
  private headOption: boolean = false;

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string, options?: { count?: string; head?: boolean }) {
    this.selects = fields;
    this.countOption = options?.count || null;
    this.headOption = options?.head || false;
    return this;
  }

  eq(field: string, value: any) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "==", value });
    return this;
  }

  in(field: string, values: any[]) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "in", value: values });
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field === "id" ? "__name__" : field;
    this.orderAscending = options?.ascending !== false;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  async get() {
    const constraints: any[] = [];

    const hasEmptyInFilter = this.filters.some(
      (f) => f.op === "in" && (!Array.isArray(f.value) || f.value.length === 0),
    );
    if (hasEmptyInFilter) {
      if (this.countOption) {
        return { count: 0, data: [], error: null };
      }
      return { data: [], error: null };
    }

    for (const f of this.filters) {
      constraints.push(where(f.field, f.op as any, f.value));
    }

    if (this.orderField) {
      constraints.push(orderBy(this.orderField, this.orderAscending ? "asc" : "desc"));
    }

    if (this.limitCount !== null) {
      constraints.push(firestoreLimit(this.limitCount));
    }

    try {
      const collectionRef = collection(db, this.table);
      const q = query(collectionRef, ...constraints);
      const snapshot = await getDocs(q);

      if (this.countOption) {
        return { count: snapshot.size, data: null, error: null };
      }

      const results: any[] = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      await this.resolveJoins(results);

      return { data: results, error: null };
    } catch (err: any) {
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

  private async resolveJoins(items: any[]) {
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

  private async join(items: any[], fkField: string, refTable: string, targetField: string) {
    const ids = Array.from(new Set(items.map((item) => item[fkField]).filter(Boolean)));
    if (ids.length === 0) return;

    try {
      const q = query(collection(db, refTable), where("__name__", "in", ids));
      const refSnapshot = await getDocs(q);
      const refMap = new Map();
      refSnapshot.forEach((doc: any) => {
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
  private table: string;
  private filters: Array<{ field: string; op: string; value: any }> = [];

  constructor(table: string) {
    this.table = table;
  }

  eq(field: string, value: any) {
    const fName = field === "id" ? "__name__" : field;
    this.filters.push({ field: fName, op: "==", value });
    return this;
  }

  async insert(payload: any | any[]) {
    const collectionRef = collection(db, this.table);
    const payloads = Array.isArray(payload) ? payload : [payload];
    const results: any[] = [];
    try {
      for (const p of payloads) {
        if (p.id) {
          const docRef = doc(db, this.table, p.id);
          const data = { ...p };
          delete data.id;
          await setDoc(docRef, data);
          results.push({ id: p.id, ...data });
        } else {
          const docRef = await addDoc(collectionRef, p);
          results.push({ id: docRef.id, ...p });
        }
      }
      return { data: Array.isArray(payload) ? results : results[0], error: null };
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Insert error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }

  async update(payload: any) {
    const constraints: any[] = [];
    for (const f of this.filters) {
      constraints.push(where(f.field, f.op as any, f.value));
    }
    try {
      const q = query(collection(db, this.table), ...constraints);
      const snapshot = await getDocs(q);
      const results: any[] = [];
      const batch = writeBatch(db);
      snapshot.forEach((snapshotDoc) => {
        const docRef = doc(db, this.table, snapshotDoc.id);
        batch.update(docRef, payload);
        results.push({ id: snapshotDoc.id, ...snapshotDoc.data(), ...payload });
      });
      await batch.commit();
      return { data: results, error: null };
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Update error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }

  async delete() {
    const constraints: any[] = [];
    for (const f of this.filters) {
      constraints.push(where(f.field, f.op as any, f.value));
    }
    try {
      const q = query(collection(db, this.table), ...constraints);
      const snapshot = await getDocs(q);
      const results: any[] = [];
      const batch = writeBatch(db);
      snapshot.forEach((snapshotDoc) => {
        const docRef = doc(db, this.table, snapshotDoc.id);
        batch.delete(docRef);
        results.push({ id: snapshotDoc.id, ...snapshotDoc.data() });
      });
      await batch.commit();
      return { data: results, error: null };
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Delete error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }

  async upsert(payload: any) {
    try {
      if (payload.id) {
        const docRef = doc(db, this.table, payload.id);
        const data = { ...payload };
        delete data.id;
        await setDoc(docRef, data, { merge: true });
        return { data: payload, error: null };
      } else {
        return this.insert(payload);
      }
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Upsert error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }
}

class AdminAuthWrapper {
  async listUsers(options?: { page?: number; perPage?: number }) {
    try {
      const q = query(collection(db, "profiles"));
      const snapshot = await getDocs(q);
      const users: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          email: data.email ?? "",
          created_at: data.created_at ?? new Date().toISOString(),
        });
      });
      return { data: { users }, error: null };
    } catch (err: any) {
      console.error("Error listing users in db:", err);
      return { data: null, error: err };
    }
  }
}

class AuthWrapper {
  admin = new AdminAuthWrapper();
}

export const supabaseAdmin = {
  auth: new AuthWrapper(),
  from: (table: string) => {
    const query = new QueryBuilder(table);
    const write = new WriteBuilder(table);

    const proxy = new Proxy({} as any, {
      get(_, prop) {
        if (prop in query) {
          const val = (query as any)[prop];
          if (typeof val === "function") {
            return (...args: any[]) => {
              const res = val.apply(query, args);
              return res === query ? proxy : res;
            };
          }
          return val;
        }
        if (prop in write) {
          const val = (write as any)[prop];
          if (typeof val === "function") {
            return (...args: any[]) => {
              const res = val.apply(write, args);
              return res === write ? proxy : res;
            };
          }
          return val;
        }
        return undefined;
      },
    });

    return proxy;
  },
};
