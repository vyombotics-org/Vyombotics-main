import { useEffect, useState } from "react";

// Mock createServerFn to execute the handler directly on the client
export function createServerFn(options: any = {}) {
  const builder = {
    middleware(m: any) {
      this.middlewares = m;
      return this;
    },
    inputValidator(v: any) {
      this.validator = v;
      return this;
    },
    handler(h: any) {
      const fn = async (input: any) => {
        // Run input validation
        let validatedInput = input;
        if (this.validator) {
          validatedInput = this.validator(input);
        }

        // Run middleware mock context
        const { auth } = await import("@/integrations/firebase/client");
        const currentUser = auth.currentUser;
        const context = {
          userId: currentUser?.uid || null,
          claims: currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
        };

        return h({ data: validatedInput, context });
      };
      // Attach .handler so it can be called if needed (e.g. fn.handler())
      fn.handler = fn;
      return fn;
    }
  };

  return builder;
}

// Mock useServerFn to just return the function itself since we execute on the client
export function useServerFn(fn: any) {
  return fn;
}

// Mock createMiddleware to return a pass-through builder
export function createMiddleware(options: any = {}) {
  return {
    client(c: any) {
      this.clientMiddleware = c;
      return this;
    },
    server(s: any) {
      this.serverMiddleware = s;
      return this;
    }
  };
}
