import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { l as listBatchEnrollments, c as adminMarkEnrollmentPaid, d as adminRevokeEnrollment, e as adminIssueCertificate } from "./enrollments.functions-CCS4ZgTy.mjs";
import { o as Route$6 } from "./router-BBmNS5j3.mjs";
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
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import { L as LoaderCircle, I as ArrowLeft, U as Users, O as CircleCheck, _ as Award, aJ as CircleX } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
function StudentsPage() {
  const {
    id
  } = Route$6.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchEnrollments);
  const payFn = useServerFn(adminMarkEnrollmentPaid);
  const revokeFn = useServerFn(adminRevokeEnrollment);
  const certFn = useServerFn(adminIssueCertificate);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-enrollments", id],
    queryFn: () => listFn({
      data: {
        batch_id: id
      }
    })
  });
  const invalidate = () => qc.invalidateQueries({
    queryKey: ["admin-enrollments", id]
  });
  const pay = useMutation({
    mutationFn: (eid) => payFn({
      data: {
        enrollment_id: eid
      }
    }),
    onSuccess: () => {
      toast.success("Marked paid");
      invalidate();
    },
    onError: (e) => toast.error(e.message || "Failed")
  });
  const revoke = useMutation({
    mutationFn: (eid) => revokeFn({
      data: {
        enrollment_id: eid
      }
    }),
    onSuccess: () => {
      toast.success("Enrollment removed");
      invalidate();
    },
    onError: (e) => toast.error(e.message || "Failed")
  });
  const cert = useMutation({
    mutationFn: (uid) => certFn({
      data: {
        batch_id: id,
        user_id: uid
      }
    }),
    onSuccess: (r) => {
      toast.success(r?.just_issued ? `Certificate issued (${r.certificate?.serial_no})` : "Already issued");
      invalidate();
    },
    onError: (e) => toast.error(e.message || "Failed")
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  const rows = data?.enrollments ?? [];
  const batch = data?.batch;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/courses", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: batch?.courses?.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-7 w-7 text-primary-glow" }),
            "Students · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: batch?.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          rows.length,
          " enrolled"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 card-3d rounded-2xl overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[720px] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium", children: "Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium", children: "Expires" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 font-medium text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "px-4 py-10 text-center text-muted-foreground", children: "No enrollments yet." }) }) : rows.map((e) => {
          const paid = e.payment_status === "success";
          const expired = e.expires_at && new Date(e.expires_at) < /* @__PURE__ */ new Date();
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: e.profiles?.full_name || e.user_id.slice(0, 8) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground", children: e.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${paid ? expired ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary-glow" : "bg-amber-500/15 text-amber-400"}`, children: paid ? expired ? "Expired" : "Active" : e.payment_status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3", children: [
              "₹",
              Number(e.amount_paid || 0).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-xs text-muted-foreground", children: e.expires_at ? new Date(e.expires_at).toLocaleDateString() : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
              !paid && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: pay.isPending, onClick: () => pay.mutate(e.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                " Mark paid"
              ] }),
              paid && (e.certificate_serial ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs text-primary-glow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3 w-3" }),
                " ",
                e.certificate_serial
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: cert.isPending, onClick: () => cert.mutate(e.user_id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3 w-3" }),
                " Issue cert"
              ] })),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", disabled: revoke.isPending, onClick: () => {
                if (confirm("Remove this enrollment?")) revoke.mutate(e.id);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3 text-destructive" }) })
            ] }) })
          ] }, e.id);
        }) })
      ] }) })
    ] })
  ] });
}
export {
  StudentsPage as component
};
