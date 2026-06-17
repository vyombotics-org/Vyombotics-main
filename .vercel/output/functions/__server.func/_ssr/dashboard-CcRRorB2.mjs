import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { P as Progress } from "./progress-Do8U__Mw.mjs";
import { a as adminExists } from "./admin-users.functions-DW6aTeju.mjs";
import { m as myActiveBatches } from "./learn.functions-D3toCDaH.mjs";
import { c as createSsrRpc } from "./router-BBmNS5j3.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import "../_libs/sonner.mjs";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import { L as LoaderCircle, t as Crown, u as BookOpen, v as Flame, w as Clock, T as Trophy, S as Sparkles, x as ChartColumn, U as Users, y as Mail, z as Palette, h as ShoppingBag } from "../_libs/lucide-react.mjs";
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
import "./client-DwVEAZaB.mjs";
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
import "../_libs/react-i18next.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/zod.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client.server-B5gl9oyA.mjs";
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
const getStudentStats = createServerFn({
  method: "GET"
}).middleware([requireFirebaseAuth]).handler(createSsrRpc("336bd982cb82f92838daa56b06571bfde39af45307a1734d44fbbcf206f183aa"));
function Dashboard() {
  const {
    user,
    primaryRole,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const existsFn = useServerFn(adminExists);
  const {
    data: existsData
  } = useQuery({
    queryKey: ["admin", "exists"],
    queryFn: () => existsFn(),
    enabled: !!user
  });
  const statsFn = useServerFn(getStudentStats);
  const {
    data: stats
  } = useQuery({
    queryKey: ["student-stats"],
    queryFn: () => statsFn(),
    enabled: !!user && primaryRole === "student"
  });
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth",
      search: {
        mode: "login"
      }
    });
  }, [user, loading, navigate]);
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  const name = user.displayName || user.email?.split("@")[0] || "Learner";
  const showClaim = !!user && existsData && !existsData.exists && primaryRole !== "admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-32 pb-16", children: [
      showClaim && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 card-3d gradient-border flex flex-col items-start justify-between gap-3 rounded-2xl p-5 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-8 w-8 text-primary-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold", children: "No admin yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Claim platform admin to manage users, courses, and settings." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "btn-glow text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", children: "Claim admin →" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d gradient-border relative overflow-hidden rounded-3xl p-8 animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: primaryRole === "admin" ? "Admin Console" : primaryRole === "instructor" ? "Instructor Studio" : "Student Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-display text-4xl font-bold", children: [
            "Welcome back, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: name }),
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: primaryRole === "student" ? "Pick up where you left off, or explore something new." : primaryRole === "instructor" ? "Manage your courses, students, and earnings." : "Full control over the platform." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-4", children: [{
        icon: BookOpen,
        label: "Active Courses",
        value: String(stats?.activeCourses ?? 0)
      }, {
        icon: Flame,
        label: "Day Streak",
        value: String(stats?.streak ?? 0)
      }, {
        icon: Clock,
        label: "Hours Learned",
        value: String(stats?.hoursLearned ?? 0)
      }, {
        icon: Trophy,
        label: "Certificates",
        value: String(stats?.certificates ?? 0)
      }].map((s, i) => {
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d card-3d-hover rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold gradient-text", children: s.value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-muted-foreground", children: s.label })
        ] }, i);
      }) }),
      primaryRole === "student" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/certificates", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
          " My Certificates"
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MyBatches, {})
      ] }),
      primaryRole === "instructor" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [{
        icon: BookOpen,
        title: "My Courses",
        desc: "Create and manage your published courses.",
        to: "/admin/courses"
      }, {
        icon: Sparkles,
        title: "Coupons",
        desc: "Create promo codes for your batches.",
        to: "/admin/coupons"
      }, {
        icon: ChartColumn,
        title: "Analytics",
        desc: "Revenue, enrollments, and top batches.",
        to: "/analytics"
      }, {
        icon: Users,
        title: "Students",
        desc: "Open a batch from your courses to manage enrolled learners.",
        to: "/admin/courses"
      }].map((t, i) => {
        const Icon = t.icon;
        const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.desc })
        ] });
        return t.to ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: t.to, className: "card-3d card-3d-hover rounded-2xl p-6 block", children: inner }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d card-3d-hover rounded-2xl p-6", children: inner }, i);
      }) }),
      primaryRole === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [{
        icon: BookOpen,
        title: "Courses & Batches",
        desc: "Create, edit, publish your catalog.",
        to: "/admin/courses"
      }, {
        icon: Users,
        title: "User Management",
        desc: "Manage students, instructors, and roles.",
        to: "/admin/users"
      }, {
        icon: Sparkles,
        title: "Coupons",
        desc: "Create and manage promo codes.",
        to: "/admin/coupons"
      }, {
        icon: ChartColumn,
        title: "Analytics",
        desc: "Revenue, growth, and engagement metrics.",
        to: "/analytics"
      }, {
        icon: Mail,
        title: "Contact Messages",
        desc: "Read and reply to messages from the contact form.",
        to: "/admin/contact"
      }, {
        icon: Trophy,
        title: "Certificates",
        desc: "Open any batch's Students page to issue certificates manually.",
        to: "/admin/courses"
      }, {
        icon: Palette,
        title: "Site Settings",
        desc: "Edit hero text, announcement bar and the floating video — no code.",
        to: "/admin/site"
      }, {
        icon: ShoppingBag,
        title: "Shop Products",
        desc: "Add and manage robotics kits, merch and accessories.",
        to: "/admin/shop"
      }].map((t, i) => {
        const Icon = t.icon;
        const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary-glow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.desc })
        ] });
        return t.to ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: t.to, className: "card-3d card-3d-hover rounded-2xl p-6 block", children: inner }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d card-3d-hover rounded-2xl p-6", children: inner }, i);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Continue Learning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No active lectures yet" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: 0, className: "h-2" })
      ] })
    ] })
  ] });
}
function MyBatches() {
  const fn = useServerFn(myActiveBatches);
  const {
    user
  } = useAuth();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["my-batches"],
    queryFn: () => fn()
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid place-items-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) });
  const items = data?.enrollments ?? [];
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto h-10 w-10 text-primary-glow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-semibold", children: "Start your first course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You haven't enrolled in any batch yet. Explore courses to begin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "btn-glow mt-6 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Explore Courses" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: items.map((e) => {
    const daysLeft = e.expires_at ? Math.max(0, Math.ceil((new Date(e.expires_at).getTime() - Date.now()) / 864e5)) : null;
    const expired = daysLeft === 0;
    const paid = e.payment_status === "success";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d card-3d-hover gradient-border rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$batchId", params: {
        batchId: e.batches?.id
      }, className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: e.batches?.courses?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-lg font-semibold", children: e.batches?.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 ${paid ? "bg-primary/15 text-primary-glow" : "bg-amber-500/15 text-amber-400"}`, children: paid ? "Active" : "Pending payment" }),
          daysLeft !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 ${expired ? "bg-destructive/15 text-destructive" : "bg-card/60 text-muted-foreground"}`, children: expired ? "Expired" : `${daysLeft} days left` })
        ] })
      ] }),
      paid && user?.uid && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reports/$batchId/$userId", params: {
        batchId: e.batches?.id,
        userId: user.uid
      }, children: "View Progress Report →" }) }) })
    ] }, e.id);
  }) });
}
export {
  Dashboard as component
};
