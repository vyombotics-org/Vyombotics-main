import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

async function verifyFirebaseIdToken(token: string) {
  const apiKey = process.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_FIREBASE_API_KEY configuration");
  }
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: token }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error?.message || "Token verification failed");
  }
  const data = await response.json();
  const user = data?.users?.[0];
  if (!user) {
    throw new Error("No user found for this token");
  }
  return {
    uid: user.localId,
    email: user.email,
    name: user.displayName,
    picture: user.photoUrl,
  };
}

export const requireFirebaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getRequest();

    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      throw new Error("Unauthorized: No authorization header provided");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Only Bearer tokens are supported");
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    try {
      const decodedToken = await verifyFirebaseIdToken(token);
      if (!decodedToken.uid) {
        throw new Error("Unauthorized: No user ID found in token");
      }

      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      return next({
        context: {
          supabase: supabaseAdmin,
          userId: decodedToken.uid,
          claims: decodedToken,
        },
      });
    } catch (err: any) {
      console.error("[Firebase Auth Middleware] Token verification failed:", err);
      throw new Error(`Unauthorized: Invalid token: ${err.message}`);
    }
  },
);
