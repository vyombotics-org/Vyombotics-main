import { a as createMiddleware, b as getRequest } from "./server-CtNwD_lG.mjs";
import { a as adminAuth, b as adminDb } from "./client.server-B5gl9oyA.mjs";
const requireFirebaseAuth = createMiddleware({ type: "function" }).server(
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
      const decodedToken = await adminAuth.verifyIdToken(token);
      if (!decodedToken.uid) {
        throw new Error("Unauthorized: No user ID found in token");
      }
      const { supabaseAdmin } = await import("./client.server-CwXH_WTR.mjs");
      return next({
        context: {
          supabase: supabaseAdmin,
          userId: decodedToken.uid,
          claims: decodedToken,
          adminDb,
          adminAuth
        }
      });
    } catch (err) {
      console.error("[Firebase Auth Middleware] Token verification failed:", err);
      throw new Error(`Unauthorized: Invalid token: ${err.message}`);
    }
  }
);
export {
  requireFirebaseAuth as r
};
