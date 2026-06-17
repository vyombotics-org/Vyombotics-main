// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof process !== "undefined" && typeof process.on === "function") {
  process.on("uncaughtException", (error) => record(error));
  process.on("unhandledRejection", (reason) => record(reason));
} else if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

// Monkey-patch console.error to capture H3's internal error logging
if (typeof console !== "undefined" && typeof console.error === "function") {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    let captured = false;
    for (const arg of args) {
      if (arg instanceof Error) {
        record(arg);
        captured = true;
        break;
      } else if (arg && typeof arg === "object" && (arg.message || arg.stack)) {
        record(arg);
        captured = true;
        break;
      }
    }
    if (!captured && args.length > 0) {
      // Fallback for string-based logs that contain error-like details
      const msg = args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ");
      if (msg.toLowerCase().includes("error") || msg.toLowerCase().includes("fail")) {
        record(new Error(msg));
      }
    }
    originalConsoleError.apply(console, args);
  };
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
