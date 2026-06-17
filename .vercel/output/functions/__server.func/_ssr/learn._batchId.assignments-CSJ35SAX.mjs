import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Textarea } from "./textarea-F69quoCd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as submitAssignment, l as listBatchAssignments } from "./assignments.functions-BQIuIl2k.mjs";
import { k as Route$9 } from "./router-BBmNS5j3.mjs";
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
import { L as LoaderCircle, I as ArrowLeft, ao as FileText, O as CircleCheck, ar as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
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
function AssignmentsPage() {
  const {
    batchId
  } = Route$9.useParams();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchAssignments);
  const submitFn = useServerFn(submitAssignment);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["assignments", batchId],
    queryFn: () => listFn({
      data: {
        batch_id: batchId
      }
    })
  });
  const submit = useMutation({
    mutationFn: (p) => submitFn({
      data: {
        assignment_id: p.assignment_id,
        text_content: p.text_content || null,
        file_url: p.file_url || null
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["assignments", batchId]
      });
      toast.success("Submitted");
    },
    onError: (e) => toast.error(e?.message || "Failed")
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  const subsByA = {};
  (data?.submissions ?? []).forEach((s) => {
    subsByA[s.assignment_id] = s;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-6 pt-28 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$batchId", params: {
        batchId
      }, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to batch"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold", children: "Assignments" }),
      (data?.assignments ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 card-3d rounded-2xl p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mx-auto h-10 w-10 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "No assignments yet." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-4", children: (data?.assignments ?? []).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssignmentItem, { a, sub: subsByA[a.id], onSubmit: (text, url) => submit.mutate({
        assignment_id: a.id,
        text_content: text,
        file_url: url
      }), submitting: submit.isPending }, a.id)) })
    ] })
  ] });
}
function AssignmentItem({
  a,
  sub,
  onSubmit,
  submitting
}) {
  const [text, setText] = reactExports.useState(sub?.text_content || "");
  const [url, setUrl] = reactExports.useState(sub?.file_url || "");
  const graded = sub?.marks_awarded != null;
  const past = a.due_at && new Date(a.due_at) < /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "card-3d rounded-2xl p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: a.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          a.max_marks,
          " marks"
        ] }),
        a.due_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: past ? "text-destructive" : "", children: [
          "· Due ",
          new Date(a.due_at).toLocaleString()
        ] }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/15 px-2 py-0.5 text-primary-glow", children: "Submitted" }),
        graded && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-primary/20 px-2 py-0.5 text-primary-glow", children: [
          "Graded: ",
          sub.marks_awarded,
          "/",
          a.max_marks
        ] })
      ] })
    ] }) }),
    a.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm text-muted-foreground", children: a.description }),
    graded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-primary/40 bg-primary/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
        " Graded ",
        sub.marks_awarded,
        "/",
        a.max_marks
      ] }),
      sub.feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
        "Feedback: ",
        sub.feedback
      ] }),
      sub.text_content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 whitespace-pre-wrap rounded bg-card/40 p-2 text-sm", children: sub.text_content })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Your answer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: text, onChange: (e) => setText(e.target.value), placeholder: "Write your answer..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Attachment URL (Google Drive, Dropbox, etc.)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow w-fit text-primary-foreground", disabled: !text && !url || submitting, onClick: () => onSubmit(text, url), children: [
        submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
        " ",
        sub ? "Update submission" : "Submit"
      ] })
    ] })
  ] });
}
export {
  AssignmentsPage as component
};
