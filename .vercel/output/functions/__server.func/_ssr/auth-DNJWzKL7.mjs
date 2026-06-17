import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as logo } from "./router-BBmNS5j3.mjs";
import { e as useSearch, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { a as auth, d as db } from "./client-DwVEAZaB.mjs";
import { G as GoogleAuthProvider, s as signInWithPopup, c as createUserWithEmailAndPassword, u as updateProfile, a as signInWithEmailAndPassword, b as sendPasswordResetEmail } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { d as doc, b as getDoc, s as setDoc } from "../_libs/firebase__firestore.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "firebase-admin/app";
import "firebase-admin/auth";
import "firebase-admin/firestore";
import "firebase-admin/storage";
import "../_libs/i18next.mjs";
import "../_libs/i18next-browser-languagedetector+[...].mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__storage.mjs";
import { L as LoaderCircle, I as ArrowLeft, J as EyeOff, K as Eye, n as Check, X } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const rules = [{
  label: "At least 8 characters",
  test: (p) => p.length >= 8
}, {
  label: "One uppercase letter",
  test: (p) => /[A-Z]/.test(p)
}, {
  label: "One lowercase letter",
  test: (p) => /[a-z]/.test(p)
}, {
  label: "One number",
  test: (p) => /\d/.test(p)
}, {
  label: "One special character",
  test: (p) => /[^A-Za-z0-9]/.test(p)
}];
function AuthPage() {
  const {
    mode
  } = useSearch({
    from: "/auth"
  });
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = reactExports.useState("email");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [checkingSession, setCheckingSession] = reactExports.useState(true);
  const [phone, setPhone] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [otp, setOtp] = reactExports.useState("");
  reactExports.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate({
          to: "/dashboard"
        });
      } else {
        setCheckingSession(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  const passed = reactExports.useMemo(() => rules.map((r) => r.test(password)), [password]);
  const strength = passed.filter(Boolean).length;
  const allPassed = strength === rules.length;
  const setMode = (m) => navigate({
    to: "/auth",
    search: {
      mode: m
    }
  });
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || mode !== "forgot" && !password) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!allPassed) {
          toast.error("Password doesn't meet all requirements");
          setLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, {
          displayName: fullName
        });
        const roleRef = doc(db, "user_roles", userCred.user.uid);
        await setDoc(roleRef, {
          user_id: userCred.user.uid,
          role: "student",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        toast.success("Account created! Welcome to Vyombotics 🚀");
        navigate({
          to: "/dashboard"
        });
      } else if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
        navigate({
          to: "/dashboard"
        });
      } else {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset link sent to your email");
        setMode("login");
      }
    } catch (err) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const roleRef = doc(db, "user_roles", userCred.user.uid);
      const roleSnap = await getDoc(roleRef);
      if (!roleSnap.exists()) {
        await setDoc(roleRef, {
          user_id: userCred.user.uid,
          role: "student",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      toast.success("Welcome back!");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };
  if (checkingSession) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
      background: "var(--gradient-hero)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-glow-pulse", style: {
      animationDelay: "1.5s"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "absolute left-6 top-6 z-10 glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:scale-105 hover:text-primary-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to home"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center gap-2", "aria-label": "Vyombotics", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Vyombotics Academy of Future Education", className: "h-12 w-auto" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-3d gradient-border rounded-2xl p-8 animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: mode === "signup" ? "Create your account" : mode === "forgot" ? "Reset password" : "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "signup" ? "Start learning in under 60 seconds" : mode === "forgot" ? "We'll email you a reset link" : "Sign in to continue your journey" }),
        mode !== "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleGoogle, disabled: loading, variant: "outline", className: "glass w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
            ] }),
            "Continue with Google"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "OR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEmailAuth, className: "space-y-4", children: [
            mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "Sejal Sharma", required: true, className: "mt-1.5 h-11 bg-input/50" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true, className: "mt-1.5 h-11 bg-input/50" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pw", children: "Password" }),
                mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("forgot"), className: "text-xs text-primary-glow hover:underline", children: "Forgot?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pw", type: showPw ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8, className: "h-11 bg-input/50 pr-10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw(!showPw), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
              ] }),
              mode === "signup" && password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 rounded-full transition-colors ${i <= strength ? strength <= 2 ? "bg-destructive" : strength <= 3 ? "bg-yellow-500" : "bg-green-500" : "bg-border"}` }, i)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: rules.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-2 text-xs ${passed[i] ? "text-green-400" : "text-muted-foreground"}`, children: [
                  passed[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                  " ",
                  r.label
                ] }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "btn-glow h-11 w-full text-primary-foreground", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : mode === "signup" ? "Create account" : "Sign in" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: "📱 Phone OTP login coming soon" })
        ] }),
        mode === "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEmailAuth, className: "mt-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", required: true, className: "mt-1.5 h-11 bg-input/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "btn-glow h-11 w-full text-primary-foreground", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Send reset link" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          mode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "New here?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("signup"), className: "text-primary-glow hover:underline", children: "Create an account" })
          ] }),
          mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("login"), className: "text-primary-glow hover:underline", children: "Sign in" })
          ] }),
          mode === "forgot" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("login"), className: "text-primary-glow hover:underline", children: "Back to sign in" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "By continuing you agree to our Terms & Privacy Policy." })
    ] })
  ] });
}
export {
  AuthPage as component
};
