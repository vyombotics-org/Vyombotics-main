import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { v as verifyCertificate } from "./certificates.functions-CyTKSy0x.mjs";
import { R as Route$m } from "./router-BBmNS5j3.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__storage.mjs";
import { L as LoaderCircle, ab as ShieldAlert, ac as Printer, T as Trophy, ad as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-CtNwD_lG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CZNhPrkM.mjs";
import "./client.server-B5gl9oyA.mjs";
import "../_libs/zod.mjs";
import "./client-DwVEAZaB.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
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
import "../_libs/re2js.mjs";
function Verify() {
  const {
    serial
  } = Route$m.useParams();
  const fn = useServerFn(verifyCertificate);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["verify", serial],
    queryFn: () => fn({
      data: {
        serial_no: serial
      }
    })
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  if (!data?.valid) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d rounded-2xl p-10 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-14 w-14 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Certificate not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
        "Serial number ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: serial }),
        " is invalid or doesn't exist."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Go home" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen px-6 py-10 print:py-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground", children: "← Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => window.print(), variant: "outline", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
        " Print / Save PDF"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border-4 border-primary/30 bg-gradient-to-br from-card via-background to-card p-12 text-center shadow-2xl print:border-double", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl print:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-glow/10 blur-3xl print:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto h-16 w-16 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Certificate of Completion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-2xl font-medium text-muted-foreground", children: "This is to certify that" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-5xl font-bold gradient-text", children: data.student_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg", children: "has successfully completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-3xl font-semibold", children: data.course_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: data.batch_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center justify-center gap-2 text-primary-glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Verified" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 gap-6 text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Issued" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: new Date(data.issued_at).toLocaleDateString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Serial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono", children: data.serial_no })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-border/40 pt-4 text-xs text-muted-foreground", children: [
          "Vyombotics Academy · Verify at vyombotics/verify/",
          data.serial_no
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Verify as component
};
