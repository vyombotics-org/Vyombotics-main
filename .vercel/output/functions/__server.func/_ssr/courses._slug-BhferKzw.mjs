import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as SiteNav, u as useAuth } from "./SiteNav-BaCidO1A.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getCourseBySlug, a as listPreviewLecturesBySlug } from "./courses.functions-C1R7_4D0.mjs";
import { l as listBatchesByCourseSlug, m as myActiveBatches } from "./learn.functions-D3toCDaH.mjs";
import { f as Route$k, c as createSsrRpc } from "./router-BBmNS5j3.mjs";
import { c as createServerFn } from "./server-CtNwD_lG.mjs";
import { r as requireFirebaseAuth } from "./auth-middleware-CZNhPrkM.mjs";
import { v as validateCoupon } from "./coupons.functions-Courpk9F.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__firestore.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/seroval.mjs";
import "../_libs/firebase-admin.mjs";
import { l as LoaderCircle, I as ArrowLeft, U as Users, q as Star, w as Clock, af as Radio, ag as CirclePlay, S as Sparkles, T as Trophy, u as BookOpen, ah as Calendar, ai as Tag, X, i as Check, aj as CreditCard, ad as ShieldCheck } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, c as coerce } from "../_libs/zod.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./client.server-B5gl9oyA.mjs";
import "http";
import "http2";
import "zlib";
import "https";
import "events";
import "../_libs/@fastify/busboy.mjs";
import "node:events";
import "node:util";
import "node:crypto";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "../_libs/jwks-rsa.mjs";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/jose.mjs";
import "../_libs/lru-memoizer.mjs";
import "../_libs/lru-cache.mjs";
import "node:diagnostics_channel";
import "../_libs/lodash.clonedeep.mjs";
import "../_libs/limiter.mjs";
import "../_libs/@google-cloud/firestore.mjs";
import "assert";
import "url";
import "../_libs/google-gax.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "tls";
import "net";
import "dns";
import "process";
import "fs";
import "../_libs/js-sdsl__ordered-map.mjs";
import "../_libs/grpc__proto-loader.mjs";
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
import "path";
import "child_process";
import "../_libs/google-auth-library.mjs";
import "querystring";
import "../_libs/gaxios.mjs";
import "../_libs/extend.mjs";
import "../_libs/node-fetch.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "punycode";
import "../_libs/tr46.mjs";
import "node:http";
import "node:https";
import "node:zlib";
import "node:buffer";
import "../_libs/data-uri-to-buffer.mjs";
import "../_libs/fetch-blob.mjs";
import "node:fs";
import "../_libs/node-domexception.mjs";
import "../_libs/web-streams-polyfill.mjs";
import "../_libs/formdata-polyfill.mjs";
import "node:url";
import "node:net";
import "../_libs/is-stream.mjs";
import "../_libs/uuid.mjs";
import "../_libs/https-proxy-agent.mjs";
import "../_libs/agent-base.mjs";
import "../_libs/gcp-metadata.mjs";
import "../_libs/json-bigint.mjs";
import "../_libs/bignumber.js.mjs";
import "../_libs/google-logging-utils.mjs";
import "node:process";
import "../_libs/base64-js.mjs";
import "../_libs/gtoken.mjs";
import "../_libs/object-hash.mjs";
import "../_libs/proto3-json-serializer.mjs";
import "../_libs/duplexify.mjs";
import "../_libs/readable-stream.mjs";
import "node:string_decoder";
import "../_libs/inherits.mjs";
import "../_libs/util-deprecate.mjs";
import "../_libs/end-of-stream.mjs";
import "../_libs/once.mjs";
import "../_libs/wrappy.mjs";
import "../_libs/stream-shift.mjs";
import "../_libs/retry-request.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/functional-red-black-tree.mjs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/google-cloud__storage.mjs";
import "../_libs/google-cloud__projectify.mjs";
import "../_libs/html-entities.mjs";
import "../_libs/teeny-request.mjs";
import "../_libs/http-proxy-agent.mjs";
import "../_libs/tootallnate__once.mjs";
import "../_libs/stream-events.mjs";
import "../_libs/stubs.mjs";
import "../_libs/google-cloud__promisify.mjs";
import "../_libs/google-cloud__paginator.mjs";
import "../_libs/arrify.mjs";
import "../_libs/mime.mjs";
import "../_libs/p-limit.mjs";
import "../_libs/yocto-queue.mjs";
import "../_libs/async-retry.mjs";
import "../_libs/retry.mjs";
import "../_libs/abort-controller.mjs";
import "../_libs/event-target-shim.mjs";
import "../_libs/fast-xml-parser.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/re2js.mjs";
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const createRazorpayOrder = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  batch_id: stringType().uuid(),
  coupon_id: stringType().uuid().nullish()
}).parse(d)).handler(createSsrRpc("a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4"));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).middleware([requireFirebaseAuth]).inputValidator((d) => objectType({
  enrollment_id: stringType().uuid(),
  razorpay_order_id: stringType().min(1).max(120),
  razorpay_payment_id: stringType().min(1).max(120),
  razorpay_signature: stringType().min(1).max(255),
  applied_coupon_id: stringType().uuid().nullish(),
  amount_paid: coerce.number().min(0).optional()
}).parse(d)).handler(createSsrRpc("5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199"));
function CourseDetail() {
  const {
    slug
  } = Route$k.useParams();
  const fetcher = useServerFn(getCourseBySlug);
  const previewFn = useServerFn(listPreviewLecturesBySlug);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetcher({
      data: {
        slug
      }
    })
  });
  const previewsQ = useQuery({
    queryKey: ["course-previews", slug],
    queryFn: () => previewFn({
      data: {
        slug
      }
    })
  });
  const [activePreview, setActivePreview] = reactExports.useState(null);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  const c = data?.course;
  if (!c) return null;
  const previews = previewsQ.data?.lectures ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pt-28 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " All courses"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-10 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-2 lg:order-1 lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-3d gradient-border overflow-hidden rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-[image:var(--gradient-primary)]", children: c.thumbnail_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.thumbnail_url, alt: c.title, className: "h-full w-full object-cover" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-2 text-xs", children: [
            c.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/15 px-3 py-1 text-primary-glow", children: c.category }),
            c.level && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-accent/15 px-3 py-1 text-accent-foreground capitalize", children: c.level })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl font-bold md:text-5xl", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
              " ",
              Number(c.students_count ?? 0).toLocaleString(),
              " ",
              "students"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current text-primary-glow" }),
              " ",
              Number(c.rating ?? 0).toFixed(1)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              " ",
              c.duration_hours ?? 0,
              " hrs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 card-3d rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "About this course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap text-muted-foreground", children: c.description || "Detailed description coming soon." })
          ] }),
          previews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 card-3d gradient-border rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold", children: [
                "Free ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Demo Videos" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-primary/15 px-3 py-1 text-xs text-primary-glow", children: [
                previews.length,
                " free"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try a sample lesson before you enroll." }),
            activePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 overflow-hidden rounded-xl bg-black", children: [
              activePreview.kind === "recorded" && activePreview.video_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: activePreview.video_url, controls: true, autoPlay: true, className: "aspect-video w-full" }, activePreview.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-video w-full place-items-center text-muted-foreground", children: "No preview available" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/60 px-4 py-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: activePreview.title }),
                activePreview.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: activePreview.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-2", children: previews.map((l) => {
              const isActive = activePreview?.id === l.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActivePreview(l), className: `flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${isActive ? "border-primary bg-primary/10" : "border-border/40 hover:border-border hover:bg-card/40"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-lg ${l.kind === "live" ? "bg-red-500/15 text-red-400" : "bg-primary/15 text-primary-glow"}`, children: l.kind === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: l.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mr-1 inline h-3 w-3" }),
                      l.duration_min || 0,
                      " min · Free preview"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-glow", children: isActive ? "Playing" : "Play ▶" })
              ] }, l.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [{
            icon: Sparkles,
            t: "Live Mentorship",
            d: "Weekly 1:1 with experts"
          }, {
            icon: Trophy,
            t: "Certificate",
            d: "Verified on completion"
          }, {
            icon: BookOpen,
            t: "Real Projects",
            d: "Portfolio-grade work"
          }, {
            icon: Users,
            t: "Community",
            d: "Discord + peer learning"
          }].map((p, i) => {
            const I = p.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-6 w-6 text-primary-glow" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-semibold", children: p.t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.d })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BatchesPanel, { slug, coursePrice: Number(c.price_inr ?? 0) }) })
      ] })
    ] })
  ] });
}
function BatchesPanel({
  slug,
  coursePrice
}) {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listBatchesByCourseSlug);
  const createOrderFn = useServerFn(createRazorpayOrder);
  const verifyFn = useServerFn(verifyRazorpayPayment);
  const myFn = useServerFn(myActiveBatches);
  const validateFn = useServerFn(validateCoupon);
  const batchesQ = useQuery({
    queryKey: ["batches", slug],
    queryFn: () => listFn({
      data: {
        slug
      }
    })
  });
  const myQ = useQuery({
    queryKey: ["my-batches"],
    queryFn: () => myFn(),
    enabled: !!user
  });
  const enrolledMap = {};
  (myQ.data?.enrollments ?? []).forEach((e) => {
    if (e.batches?.id) enrolledMap[e.batches.id] = {
      id: e.id,
      payment_status: e.payment_status
    };
  });
  const [codes, setCodes] = reactExports.useState({});
  const [applied, setApplied] = reactExports.useState({});
  const [validating, setValidating] = reactExports.useState(null);
  const apply = async (batch_id) => {
    const code = (codes[batch_id] || "").trim();
    if (!code) return;
    setValidating(batch_id);
    try {
      const res = await validateFn({
        data: {
          code,
          batch_id
        }
      });
      setApplied((m) => ({
        ...m,
        [batch_id]: res
      }));
      toast.success(`Coupon "${res.code}" applied — you save ₹${res.discount.toLocaleString()}`);
    } catch (e) {
      toast.error(e?.message || "Invalid coupon");
    } finally {
      setValidating(null);
    }
  };
  const [checkout, setCheckout] = reactExports.useState(null);
  const [creatingOrder, setCreatingOrder] = reactExports.useState(null);
  const openCheckout = async (batch_id) => {
    setCreatingOrder(batch_id);
    try {
      const couponId = applied[batch_id]?.coupon_id ?? null;
      const order = await createOrderFn({
        data: {
          batch_id,
          coupon_id: couponId
        }
      });
      setCheckout({
        batch_id,
        order
      });
    } catch (e) {
      toast.error(e?.message || "Could not start checkout");
    } finally {
      setCreatingOrder(null);
    }
  };
  const pay = useMutation({
    mutationFn: async () => {
      if (!checkout) throw new Error("No order");
      const {
        order
      } = checkout;
      const payment_id = `pay_DUMMY_${Math.random().toString(36).slice(2, 14)}`;
      const signature = `sig_DUMMY_${Math.random().toString(36).slice(2, 20)}`;
      return verifyFn({
        data: {
          enrollment_id: order.enrollment_id,
          razorpay_order_id: order.order_id,
          razorpay_payment_id: payment_id,
          razorpay_signature: signature,
          applied_coupon_id: order.applied_coupon_id,
          amount_paid: order.amount / 100
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-batches"]
      });
      setCheckout(null);
      toast.success("Payment successful — enrolled!");
    },
    onError: (e) => toast.error(e?.message || "Payment failed")
  });
  const batches = batchesQ.data?.batches ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d gradient-border rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold", children: [
        "Available ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Batches" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        batches.length,
        " active"
      ] })
    ] }),
    batchesQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }) : batches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-border/40 p-4 text-sm text-muted-foreground", children: [
      "No batches scheduled yet. Starting from ₹",
      coursePrice.toLocaleString(),
      "."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3", children: batches.map((b) => {
      const enrolled = enrolledMap[b.id];
      const isPending = enrolled?.payment_status === "pending";
      const isPaid = enrolled?.payment_status === "success";
      const ap = applied[b.id];
      const displayPrice = ap ? ap.final_price : Number(b.price_inr);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/40 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: b.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                new Date(b.start_date).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· ",
                b.validity_days,
                " days access"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· ",
                b.seats,
                " seats"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            ap && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground line-through", children: [
              "₹",
              Number(b.price_inr).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold gradient-text", children: [
              "₹",
              displayPrice.toLocaleString()
            ] })
          ] })
        ] }),
        !isPaid && user && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: ap ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-primary-glow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ap.code }),
            " — saved ₹",
            ap.discount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setApplied((m) => {
            const n = {
              ...m
            };
            delete n[b.id];
            return n;
          }), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: codes[b.id] || "", onChange: (e) => setCodes((m) => ({
            ...m,
            [b.id]: e.target.value.toUpperCase()
          })), placeholder: "Promo code", className: "h-8 text-xs", maxLength: 40 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: validating === b.id || !codes[b.id]?.trim(), onClick: () => apply(b.id), children: validating === b.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : "Apply" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-2", children: !user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "btn-glow w-full text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          mode: "signup"
        }, children: "Sign in to enroll" }) }) : isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full", variant: "outline", onClick: () => navigate({
          to: "/learn/$batchId",
          params: {
            batchId: b.id
          }
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
          " Go to batch"
        ] }) : b.buy_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "btn-glow w-full text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: b.buy_url, target: "_blank", rel: "noopener noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
          " Pay · ₹",
          displayPrice.toLocaleString()
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow w-full text-primary-foreground", disabled: creatingOrder === b.id, onClick: () => openCheckout(b.id), children: [
          creatingOrder === b.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
          " ",
          isPending ? "Resume payment" : `Pay · ₹${displayPrice.toLocaleString()}`
        ] }) })
      ] }, b.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "✓ Live + recorded classes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "✓ Batch validity tracked automatically" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "✓ Attendance and progress dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "✓ Certificate on completion" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!checkout, onOpenChange: (o) => {
      if (!o && !pay.isPending) setCheckout(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-primary-glow" }),
          " Checkout"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Test mode — Razorpay live integration coming soon." })
      ] }),
      checkout && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: checkout.order.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: checkout.order.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total payable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold gradient-text", children: [
              "₹",
              (checkout.order.amount / 100).toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[10px] text-muted-foreground break-all", children: [
            "Order: ",
            checkout.order.order_id
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary-glow" }),
          " Secure dummy gateway — no real charge."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: pay.isPending, onClick: () => setCheckout(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "btn-glow text-primary-foreground", disabled: pay.isPending, onClick: () => pay.mutate(), children: [
          pay.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
          " ",
          "Pay ₹",
          checkout ? (checkout.order.amount / 100).toLocaleString() : ""
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CourseDetail as component
};
