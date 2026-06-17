import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as adminExists, c as claimAdminIfNone, l as listUsersWithRoles, s as setUserRole } from "./admin-users.functions-DW6aTeju.mjs";
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
import { L as LoaderCircle, t as Crown, S as Sparkles, ab as ShieldAlert, I as ArrowLeft, N as GraduationCap, au as User } from "../_libs/lucide-react.mjs";
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
import "./router-BBmNS5j3.mjs";
import "./server-CtNwD_lG.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminUsers() {
  const {
    user,
    primaryRole,
    loading
  } = useAuth();
  const qc = useQueryClient();
  const existsFn = useServerFn(adminExists);
  const claimFn = useServerFn(claimAdminIfNone);
  const listFn = useServerFn(listUsersWithRoles);
  const setFn = useServerFn(setUserRole);
  const {
    data: existsData
  } = useQuery({
    queryKey: ["admin", "exists"],
    queryFn: () => existsFn()
  });
  const isAdmin = primaryRole === "admin";
  const usersQ = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => listFn(),
    enabled: isAdmin
  });
  const claim = useMutation({
    mutationFn: () => claimFn(),
    onSuccess: () => {
      toast.success("You are now the admin. Reloading...");
      setTimeout(() => window.location.reload(), 600);
    },
    onError: (e) => toast.error(e?.message || "Could not claim admin")
  });
  const setRole = useMutation({
    mutationFn: (v) => setFn({
      data: v
    }),
    onSuccess: () => {
      toast.success("Role updated");
      qc.invalidateQueries({
        queryKey: ["admin", "users"]
      });
    },
    onError: (e) => toast.error(e?.message || "Update failed")
  });
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  if (!isAdmin && existsData && !existsData.exists) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md px-6 pt-40 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d gradient-border rounded-2xl p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mx-auto h-12 w-12 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Claim platform admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "No admin exists yet. As the first user, you can claim admin access." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow mt-6 w-full text-primary-foreground", disabled: claim.isPending, onClick: () => claim.mutate(), children: [
          claim.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          " ",
          "Make me admin"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", className: "mt-2 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Cancel" }) })
      ] }) })
    ] });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-6 pt-40 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "mx-auto h-12 w-12 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold", children: "Admin only" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ask an existing admin to grant you access." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Back to dashboard" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Dashboard"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-3xl font-bold", children: [
        "Users & ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Roles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Promote users to instructor or admin. Every user is a student by default." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: usersQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : (usersQ.data?.users ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d rounded-2xl p-10 text-center text-muted-foreground", children: "No users yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d overflow-x-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Instructor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Student" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (usersQ.data?.users ?? []).map((u) => {
          const has = (r) => u.roles.includes(r);
          const isMe = u.id === user?.uid;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-background", children: (u.full_name || u.email || "?").slice(0, 1).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                  u.full_name || "—",
                  " ",
                  isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs text-primary-glow", children: "(you)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 pt-0.5", children: [
                  has("admin") && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "primary", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
                    "Admin"
                  ] }),
                  has("instructor") && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "accent", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3 w-3" }),
                    "Instructor"
                  ] }),
                  has("student") && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { tone: "muted", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                    "Student"
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: u.email }),
            ["admin", "instructor", "student"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-4 w-4 cursor-pointer accent-primary", checked: has(r), disabled: setRole.isPending, onChange: (e) => setRole.mutate({
              user_id: u.id,
              role: r,
              enabled: e.target.checked
            }) }) }, r))
          ] }, u.id);
        }) })
      ] }) }) })
    ] })
  ] });
}
function Badge({
  tone,
  children
}) {
  const cls = tone === "primary" ? "bg-primary/15 text-primary-glow" : tone === "accent" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`, children });
}
export {
  AdminUsers as component
};
