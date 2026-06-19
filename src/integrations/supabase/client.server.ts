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
  private isSingle: boolean = false;
  private isMaybeSingle: boolean = false;

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

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  async execute() {
    const constraints: any[] = [];

    const hasEmptyInFilter = this.filters.some(
      (f) => f.op === "in" && (!Array.isArray(f.value) || f.value.length === 0),
    );
    if (hasEmptyInFilter) {
      if (this.countOption) {
        return { count: 0, data: [], error: null };
      }
      if (this.isSingle || this.isMaybeSingle) {
        if (this.isSingle) {
          return { data: null, error: new Error("Row not found") };
        }
        return { data: null, error: null };
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

      if (this.isSingle || this.isMaybeSingle) {
        if (results.length === 0) {
          if (this.isSingle) {
            return { data: null, error: new Error("Row not found") };
          }
          return { data: null, error: null };
        }
        return { data: results[0], error: null };
      }

      return { data: results, error: null };
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Query error on ${this.table}:`, err);
      return { data: null, error: err };
    }
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
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
  private op: "insert" | "update" | "delete" | "upsert" | null = null;
  private payload: any = null;
  private selectFields: string | null = null;
  private isSingle: boolean = false;
  private isMaybeSingle: boolean = false;

  constructor(table: string) {
    this.table = table;
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

  insert(payload: any | any[]) {
    this.op = "insert";
    this.payload = payload;
    return this;
  }

  update(payload: any) {
    this.op = "update";
    this.payload = payload;
    return this;
  }

  delete() {
    this.op = "delete";
    return this;
  }

  upsert(payload: any, options?: any) {
    this.op = "upsert";
    this.payload = payload;
    return this;
  }

  select(fields: string = "*") {
    this.selectFields = fields;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  async execute() {
    try {
      let results: any = null;

      if (this.op === "insert") {
        const collectionRef = collection(db, this.table);
        const payloads = Array.isArray(this.payload) ? this.payload : [this.payload];
        const inserted: any[] = [];
        for (const p of payloads) {
          let docId = p.id;
          if (!docId && (this.table === "user_roles" || this.table === "profiles") && p.user_id) {
            docId = p.user_id;
          }

          if (docId) {
            const docRef = doc(db, this.table, docId);
            const data = { ...p };
            delete data.id;
            await setDoc(docRef, data);
            inserted.push({ id: docId, ...data });
          } else {
            const docRef = await addDoc(collectionRef, p);
            inserted.push({ id: docRef.id, ...p });
          }
        }
        results = Array.isArray(this.payload) ? inserted : inserted[0];
      } else if (this.op === "update") {
        const constraints: any[] = [];
        for (const f of this.filters) {
          constraints.push(where(f.field, f.op as any, f.value));
        }
        const q = query(collection(db, this.table), ...constraints);
        const snapshot = await getDocs(q);
        const updated: any[] = [];
        const batch = writeBatch(db);
        snapshot.forEach((snapshotDoc) => {
          const docRef = doc(db, this.table, snapshotDoc.id);
          batch.update(docRef, this.payload);
          updated.push({ id: snapshotDoc.id, ...snapshotDoc.data(), ...this.payload });
        });
        await batch.commit();
        results = updated;
      } else if (this.op === "delete") {
        const constraints: any[] = [];
        for (const f of this.filters) {
          constraints.push(where(f.field, f.op as any, f.value));
        }
        const q = query(collection(db, this.table), ...constraints);
        const snapshot = await getDocs(q);
        const deleted: any[] = [];
        const batch = writeBatch(db);
        snapshot.forEach((snapshotDoc) => {
          const docRef = doc(db, this.table, snapshotDoc.id);
          batch.delete(docRef);
          deleted.push({ id: snapshotDoc.id, ...snapshotDoc.data() });
        });
        await batch.commit();
        results = deleted;
      } else if (this.op === "upsert") {
        const payloads = Array.isArray(this.payload) ? this.payload : [this.payload];
        const upserted: any[] = [];
        for (const p of payloads) {
          let docId = p.id;
          if (!docId) {
            if (this.table === "site_settings" && p.key) {
              docId = p.key;
            } else if (this.table === "user_roles" && p.user_id) {
              docId = p.user_id;
            } else if (this.table === "profiles" && p.user_id) {
              docId = p.user_id;
            }
          }

          if (docId) {
            const docRef = doc(db, this.table, docId);
            const data = { ...p };
            delete data.id;
            await setDoc(docRef, data, { merge: true });
            upserted.push({ id: docId, ...data });
          } else {
            const collectionRef = collection(db, this.table);
            const docRef = await addDoc(collectionRef, p);
            upserted.push({ id: docRef.id, ...p });
          }
        }
        results = Array.isArray(this.payload) ? upserted : upserted[0];
      }

      // Handle single / maybeSingle formatting
      if (this.isSingle || this.isMaybeSingle) {
        if (Array.isArray(results)) {
          if (results.length === 0) {
            if (this.isSingle) {
              return { data: null, error: new Error("Row not found") };
            }
            return { data: null, error: null };
          }
          results = results[0];
        } else if (!results && this.isSingle) {
          return { data: null, error: new Error("Row not found") };
        }
      }

      return { data: results, error: null };
    } catch (err: any) {
      console.error(`[Firebase DB Adapter] Write error on ${this.table} (${this.op}):`, err);
      return { data: null, error: err };
    }
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

class TableBuilder {
  private table: string;
  constructor(table: string) {
    this.table = table;
  }
  select(fields: string = "*", options?: { count?: string; head?: boolean }) {
    const qb = new QueryBuilder(this.table);
    return qb.select(fields, options);
  }
  insert(payload: any | any[]) {
    const wb = new WriteBuilder(this.table);
    return wb.insert(payload);
  }
  update(payload: any) {
    const wb = new WriteBuilder(this.table);
    return wb.update(payload);
  }
  delete() {
    const wb = new WriteBuilder(this.table);
    return wb.delete();
  }
  upsert(payload: any, options?: any) {
    const wb = new WriteBuilder(this.table);
    return wb.upsert(payload, options);
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
    return new TableBuilder(table);
  },
};
