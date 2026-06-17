import logo from "@/assets/logo.png";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Sparkles, Check, X, Loader2, Mail, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { auth, db } from "@/integrations/firebase/client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const searchSchema = z.object({
  mode: z.enum(["login", "signup", "forgot"]).optional().default("login"),
});

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Vyombotics Academy" },
      { name: "description", content: "Access your Vyombotics learning dashboard." },
    ],
  }),
  validateSearch: searchSchema,
  component: AuthPage,
});

// Password strength rules
const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function AuthPage() {
  const { mode } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate({ to: "/dashboard" });
      } else {
        setCheckingSession(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const passed = useMemo(() => rules.map((r) => r.test(password)), [password]);
  const strength = passed.filter(Boolean).length;
  const allPassed = strength === rules.length;

  const setMode = (m: "login" | "signup" | "forgot") =>
    navigate({ to: "/auth", search: { mode: m } });

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (mode !== "forgot" && !password)) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!allPassed) {
          toast.error("Password doesn't meet all requirements");
          setLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: fullName });

        // Save default student role in Firestore
        const roleRef = doc(db, "user_roles", userCred.user.uid);
        await setDoc(roleRef, {
          user_id: userCred.user.uid,
          role: "student",
          created_at: new Date().toISOString(),
        });

        toast.success("Account created! Welcome to Vyombotics 🚀");
        navigate({ to: "/dashboard" });
      } else if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset link sent to your email");
        setMode("login");
      }
    } catch (err: any) {
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

      // Ensure role exists in Firestore
      const roleRef = doc(db, "user_roles", userCred.user.uid);
      const roleSnap = await getDoc(roleRef);
      if (!roleSnap.exists()) {
        await setDoc(roleRef, {
          user_id: userCred.user.uid,
          role: "student",
          created_at: new Date().toISOString(),
        });
      }

      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const normalizePhone = (p: string) => {
    const trimmed = p.trim().replace(/\s|-/g, "");
    if (trimmed.startsWith("+")) return trimmed;
    if (/^\d{10}$/.test(trimmed)) return "+91" + trimmed;
    return trimmed;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("Phone OTP is not available. Please sign in with Email or Google.");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("Phone OTP is not available. Please sign in with Email or Google.");
  };

  if (checkingSession) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-glow-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Back button */}
      <Link
        to="/"
        className="absolute left-6 top-6 z-10 glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:scale-105 hover:text-primary-glow"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-20">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2" aria-label="Vyombotics">
            <img
              src={logo}
              alt="Vyombotics Academy of Future Education"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="card-3d gradient-border rounded-2xl p-8 animate-fade-up">
          <h1 className="font-display text-2xl font-bold">
            {mode === "signup"
              ? "Create your account"
              : mode === "forgot"
                ? "Reset password"
                : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signup"
              ? "Start learning in under 60 seconds"
              : mode === "forgot"
                ? "We'll email you a reset link"
                : "Sign in to continue your journey"}
          </p>

          {mode !== "forgot" && (
            <div className="mt-6">
              <Button
                onClick={handleGoogle}
                disabled={loading}
                variant="outline"
                className="glass w-full"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sejal Sharma"
                      required
                      className="mt-1.5 h-11 bg-input/50"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="mt-1.5 h-11 bg-input/50"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pw">Password</Label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-primary-glow hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative mt-1.5">
                    <Input
                      id="pw"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="h-11 bg-input/50 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {mode === "signup" && password && (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? (strength <= 2 ? "bg-destructive" : strength <= 3 ? "bg-yellow-500" : "bg-green-500") : "bg-border"}`}
                          />
                        ))}
                      </div>
                      <ul className="mt-2 space-y-1">
                        {rules.map((r, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-xs ${passed[i] ? "text-green-400" : "text-muted-foreground"}`}
                          >
                            {passed[i] ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}{" "}
                            {r.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-glow h-11 w-full text-primary-foreground"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "signup" ? (
                    "Create account"
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                📱 Phone OTP login coming soon
              </p>
            </div>
          )}

          {mode === "forgot" && (
            <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-1.5 h-11 bg-input/50"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="btn-glow h-11 w-full text-primary-foreground"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" && (
              <>
                New here?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-primary-glow hover:underline"
                >
                  Create an account
                </button>
              </>
            )}
            {mode === "signup" && (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-primary-glow hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
            {mode === "forgot" && (
              <button
                onClick={() => setMode("login")}
                className="text-primary-glow hover:underline"
              >
                Back to sign in
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
