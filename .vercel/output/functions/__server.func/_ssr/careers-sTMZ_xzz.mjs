import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as logo } from "./router-BBmNS5j3.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase__storage.mjs";
import { H as Briefcase, E as MapPin, w as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./server-CtNwD_lG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "./auth-middleware-CZNhPrkM.mjs";
import "./client.server-B5gl9oyA.mjs";
import "./client-DwVEAZaB.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const ROLES = [{
  title: "Senior Full-Stack Engineer",
  team: "Engineering",
  location: "Bengaluru / Remote",
  type: "Full-time"
}, {
  title: "Curriculum Lead — AI/ML",
  team: "Content",
  location: "Remote, India",
  type: "Full-time"
}, {
  title: "Product Designer",
  team: "Design",
  location: "Bengaluru",
  type: "Full-time"
}, {
  title: "Placement Manager",
  team: "Operations",
  location: "Pune",
  type: "Full-time"
}, {
  title: "Community Manager",
  team: "Growth",
  location: "Remote, India",
  type: "Contract"
}, {
  title: "Teaching Assistant (Web Dev)",
  team: "Mentorship",
  location: "Remote",
  type: "Part-time"
}];
function CareersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2", "aria-label": "Vyombotics", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Vyombotics Academy of Future Education", className: "h-10 w-auto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-foreground", children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "hover:text-foreground", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground", children: "Contact" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-widest text-primary", children: "Careers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-5xl font-bold leading-tight", children: [
        "Help us build the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "future of learning" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground", children: "We're a fully-remote-first team of builders, educators, and operators who care deeply about learner outcomes. If you want your work to change someone's career, you'll feel at home here." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Why Vyombotics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: [{
        t: "Real impact",
        d: "Every shipped feature, every lesson — directly touches thousands of learners within a week."
      }, {
        t: "Remote-first",
        d: "Work from anywhere in India. Quarterly offsites in Goa, Bengaluru and the hills."
      }, {
        t: "Top-of-market pay",
        d: "Competitive salary + meaningful ESOPs. We share the upside with the people who build it."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/40 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: b.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: b.d })
      ] }, b.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/40 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Open roles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-2xl border border-border/40 p-5 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3" }),
              r.team
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              r.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              r.type
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: "Apply" })
      ] }, r.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-sm text-muted-foreground", children: [
        "Don't see your role? Email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:careers@vyombotics.example", className: "text-primary hover:underline", children: "careers@vyombotics.example" }),
        " ",
        "with what you'd build here."
      ] })
    ] }) })
  ] });
}
export {
  CareersPage as component
};
