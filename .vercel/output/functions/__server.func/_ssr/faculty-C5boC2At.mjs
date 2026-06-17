import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { u as useSiteSettings } from "./router-BBmNS5j3.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import { S as Sparkles, T as Trophy, Z as Zap } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./button-DjOZMqFS.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./client-DwVEAZaB.mjs";
import "./useServerFn-DL2oePlL.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./server-CtNwD_lG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CZNhPrkM.mjs";
import "./client.server-B5gl9oyA.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
const DEFAULT_FACULTY = [{
  name: "Aman Verma",
  role: "Lead Instructor · Full-Stack",
  company: "Ex-Razorpay, Flipkart",
  exp: "9+ yrs",
  expertise: ["React", "Node.js", "System Design"]
}, {
  name: "Priya Singh",
  role: "AI / ML Mentor",
  company: "Ex-Google, Microsoft",
  exp: "11+ yrs",
  expertise: ["Deep Learning", "NLP", "PyTorch"]
}, {
  name: "Rohit Sharma",
  role: "DSA Coach",
  company: "Ex-Amazon SDE-3",
  exp: "8+ yrs",
  expertise: ["DSA", "Java", "Competitive"]
}];
function FacultyPage() {
  const {
    facultyPage
  } = useSiteSettings();
  const members = facultyPage.members && facultyPage.members.length > 0 ? facultyPage.members : DEFAULT_FACULTY;
  const heading = facultyPage.heading ?? "Featured Faculty";
  const subheading = facultyPage.subheading ?? "Industry mentors who code with you, not just lecture.";
  const badge = facultyPage.badge ?? "Our Mentors";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-10 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary-glow" }),
            " ",
            badge
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold md:text-5xl", children: heading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: subheading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: members.map((m, i) => {
          const initials = (m.name || "?").split(/\s+/).map((s) => s[0]).slice(0, 2).join("").toUpperCase();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d card-3d-hover gradient-border group relative overflow-hidden rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-2xl transition-opacity group-hover:opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              m.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.image, alt: m.name, className: "h-16 w-16 rounded-2xl object-cover glow-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-display text-xl font-bold text-background glow-primary", children: initials }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: m.name }),
                m.role && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-glow", children: m.role })
              ] })
            ] }),
            (m.company || m.exp) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-1 text-sm text-muted-foreground", children: [
              m.company && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-primary-glow" }),
                " ",
                m.company
              ] }),
              m.exp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary-glow" }),
                " ",
                m.exp
              ] })
            ] }),
            m.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: m.bio }),
            m.expertise && m.expertise.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-4", children: m.expertise.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs text-primary-glow", children: tag }, tag)) })
          ] }, i);
        }) })
      ] })
    ] })
  ] });
}
export {
  FacultyPage as component
};
