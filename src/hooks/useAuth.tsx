import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";

export type AppRole = "admin" | "instructor" | "student";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const q = query(collection(db, "user_roles"), where("user_id", "==", u.uid));
          const snapshot = await getDocs(q);
          const userRoles: AppRole[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.role) {
              userRoles.push(data.role as AppRole);
            }
          });
          setRoles(userRoles);
        } catch (err) {
          console.error("Error fetching user roles from Firestore:", err);
          setRoles(["student"]); // Default fallback role
        }
      } else {
        setRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const hasRole = (r: AppRole) => roles.includes(r);
  const primaryRole: AppRole = roles.includes("admin")
    ? "admin"
    : roles.includes("instructor")
      ? "instructor"
      : "student";

  // Emulate Supabase session shape
  const session = user ? { user } : null;

  return { session, user, roles, primaryRole, hasRole, loading };
}
