import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav } from "./SiteNav-BaCidO1A.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as submitQuizAttempt, g as getQuizForStudent } from "./quizzes.functions-BZosOXb0.mjs";
import { m as Route$8 } from "./router-BBmNS5j3.mjs";
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
import { L as LoaderCircle, I as ArrowLeft, aJ as CircleX, an as BrainCircuit, O as CircleCheck } from "../_libs/lucide-react.mjs";
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
function QuizPage() {
  const {
    batchId,
    quizId
  } = Route$8.useParams();
  useNavigate();
  const getFn = useServerFn(getQuizForStudent);
  const submitFn = useServerFn(submitQuizAttempt);
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getFn({
      data: {
        quiz_id: quizId
      }
    }),
    retry: false
  });
  const [answers, setAnswers] = reactExports.useState({});
  const [result, setResult] = reactExports.useState(null);
  const submit = useMutation({
    mutationFn: () => submitFn({
      data: {
        quiz_id: quizId,
        answers
      }
    }),
    onSuccess: (r) => {
      setResult(r);
      toast.success(r.passed ? "Passed!" : "Submitted");
    },
    onError: (e) => toast.error(e?.message || "Failed")
  });
  const answered = reactExports.useMemo(() => Object.keys(answers).length, [answers]);
  const total = data?.questions?.length ?? 0;
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  if (error || !data) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 pt-28 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$batchId", params: {
        batchId
      }, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to batch"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d rounded-2xl p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto h-12 w-12 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl font-bold", children: "Quiz unavailable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: error?.message || "This quiz could not be loaded. Make sure it's published and you're enrolled in the batch." })
      ] })
    ] })
  ] });
  if (total === 0) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 pt-28 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$batchId", params: {
        batchId
      }, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to batch"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "h-7 w-7 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: data.quiz.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 card-3d rounded-2xl p-8 text-center text-muted-foreground", children: "No questions have been added to this quiz yet." })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 pt-28 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/learn/$batchId", params: {
        batchId
      }, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to batch"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "h-7 w-7 text-primary-glow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: data.quiz.title })
      ] }),
      data.quiz.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: data.quiz.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [
        "Pass: ",
        data.quiz.pass_percent,
        "% · ",
        total,
        " questions"
      ] }),
      result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 card-3d rounded-2xl p-8 text-center", children: [
        result.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-16 w-16 text-primary-glow" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto h-16 w-16 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-bold", children: result.passed ? "Congratulations!" : "Try again" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-muted-foreground", children: [
          "Score: ",
          result.score,
          " / ",
          result.max_score,
          " (",
          Math.round(result.score / result.max_score * 100),
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
            setResult(null);
            setAnswers({});
          }, children: "Retake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "btn-glow text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/learn/$batchId", params: {
            batchId
          }, children: "Back" }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        data.attempts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-border/40 bg-card/30 p-3 text-sm", children: [
          "Previous best: ",
          Math.max(...data.attempts.map((a) => a.score)),
          " /",
          " ",
          data.attempts[0].max_score
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-6 space-y-5", children: data.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "card-3d rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Q",
            i + 1,
            " · ",
            q.marks,
            " mark",
            q.marks > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-medium", children: q.prompt }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-2", children: q.options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${answers[q.id] === opt.id ? "border-primary bg-primary/10" : "border-border/40 hover:border-border"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", name: q.id, checked: answers[q.id] === opt.id, onChange: () => setAnswers((a) => ({
              ...a,
              [q.id]: opt.id
            })), className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: opt.text })
          ] }, opt.id)) })
        ] }, q.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            answered,
            " / ",
            total,
            " answered"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", disabled: answered < total || submit.isPending, onClick: () => submit.mutate(), children: [
            submit.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
            " Submit quiz"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  QuizPage as component
};
