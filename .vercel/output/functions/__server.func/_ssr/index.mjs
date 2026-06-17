let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage(error) {
  let errorMsg = "Unknown server error";
  let errorStack = "";
  let debugDetails = "";
  try {
    if (error !== void 0 && error !== null) {
      if (error instanceof Error) {
        errorMsg = error.message || "Error with empty message";
        errorStack = error.stack || "";
      } else if (typeof error === "object") {
        errorMsg = error.message || `Object: ${JSON.stringify(error)}`;
        errorStack = error.stack || "";
        debugDetails = `Keys: ${Object.getOwnPropertyNames(error).join(", ")}`;
      } else {
        errorMsg = String(error);
      }
      debugDetails = `Type: ${typeof error} | ${debugDetails}`;
    } else {
      errorMsg = `Falsy error value: ${String(error)}`;
    }
  } catch (inspectErr) {
    errorMsg = `Failed to inspect error: ${inspectErr.message}`;
  }
  const stackHtml = errorStack ? `<details style="margin-top: 1.5rem; text-align: left;">
         <summary style="cursor: pointer; color: #4b5563; font-size: 0.875rem;">Show Error Details</summary>
         <pre style="background: #f3f4f6; color: #1f2937; padding: 1rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.75rem; overflow: auto; max-height: 15rem; margin-top: 0.5rem; border: 1px solid #e5e7eb; white-space: pre-wrap; word-break: break-all;">${errorStack}</pre>
       </details>` : "";
  const debugHtml = debugDetails ? `<div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.75rem; color: #9ca3af;">
         ${debugDetails}
       </div>` : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div style="margin-bottom: 1.5rem; color: #dc2626; font-weight: 500; font-size: 0.875rem;">
        Error: ${errorMsg}
      </div>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
      ${stackHtml}
      ${debugHtml}
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-CtNwD_lG.mjs").then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }
  const err = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  console.error(err);
  return new Response(renderErrorPage(err), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
const server = {
  async fetch(request, env, ctx) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(error), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }
  }
};
export {
  server as default,
  renderErrorPage as r
};
