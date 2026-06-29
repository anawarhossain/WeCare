"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { MdError, MdHealthAndSafety, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";
import { AiOutlineLogin } from "react-icons/ai";

// ── Google SVG Icon (no external dep) ────────────────────────
function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  // ── Inline validation ─────────────────────────────────────
  const validateEmail = (val) => {
    if (!val) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (val) => {
    if (!val) return "Password is required.";
    if (val.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleBlur = (field) => {
    if (field === "email")
      setFieldErrors((p) => ({ ...p, email: validateEmail(email) }));
    if (field === "password")
      setFieldErrors((p) => ({ ...p, password: validatePassword(password) }));
  };

  // ── Email / Password sign-in ──────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setFieldErrors({ email: eErr, password: pErr });
    if (eErr || pErr) return;

    setLoading(true);
    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message ?? "Invalid email or password. Please try again.",
        );
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Google OAuth sign-in ──────────────────────────────────
  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      // redirect handled by OAuth flow — no need to router.push
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  // ── Shared input style ────────────────────────────────────
  const inputBase = [
    "w-full pl-10 pr-4 py-3 text-sm rounded-[var(--radius-md)]",
    "border transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]",
    "placeholder:text-[var(--text-muted)]",
  ].join(" ");

  const inputStyle = (hasError) => ({
    backgroundColor: "var(--bg-surface)",
    borderColor: hasError ? "var(--color-danger)" : "var(--border-default)",
    color: "var(--text-primary)",
  });

  return (
    <div className="w-full max-w-110 flex flex-col">
      {/* ── Brand ──────────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span
            className=" text-[34px]"
            style={{
              color: "var(--color-primary)",
              fontVariationSettings: "'FILL' 1",
            }}
          >
            <MdHealthAndSafety />
          </span>
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            WeCare
          </span>
        </div>
        <h1
          className="text-2xl font-bold mt-3"
          style={{ color: "var(--text-primary)" }}
        >
          Welcome Back
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Please enter your details to sign in
        </p>
      </div>

      {/* ── Card ───────────────────────────────────────────── */}
      <div
        className="card p-8 space-y-5"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        {/* Global error banner */}
        {error && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-md text-sm border"
            style={{
              backgroundColor: "var(--color-danger-bg)",
              borderColor: "var(--danger-200)",
              color: "var(--color-danger-text)",
            }}
          >
            <span className=" text-[18px] shrink-0">
              <MdError />
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Email Address
            </label>
            <div className="relative">
              <span
                className=" absolute left-3 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <CiMail />
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email)
                    setFieldErrors((p) => ({ ...p, email: "" }));
                }}
                onBlur={() => handleBlur("email")}
                className={inputBase}
                style={inputStyle(!!fieldErrors.email)}
              />
            </div>
            {fieldErrors.email && (
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--color-danger)" }}
              >
                <span className=" text-[14px]">
                  <MdError />
                </span>
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold hover:underline transition-colors"
                style={{ color: "var(--color-primary)" }}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span
                className=" absolute left-3 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <FaLock />
              </span>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password)
                    setFieldErrors((p) => ({ ...p, password: "" }));
                }}
                onBlur={() => handleBlur("password")}
                className={`${inputBase} pr-11`}
                style={inputStyle(!!fieldErrors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--text-muted)" }}
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                <span className=" text-[20px]">
                  {showPwd ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
              </button>
            </div>
            {fieldErrors.password && (
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--color-danger)" }}
              >
                <span className=" text-[14px]">
                  <MdError />
                </span>
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-semibold shadow-md hover:brightness-95 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-1"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            {loading ? (
              <>
                <span className=" text-[18px] animate-spin">
                  <TbProgress />
                </span>
                Signing In...
              </>
            ) : (
              <>
                <span
                  className=" text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <AiOutlineLogin />
                </span>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* OR divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full border-t"
              style={{ borderColor: "var(--border-default)" }}
            />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-4 text-[11px] font-bold uppercase tracking-widest"
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-muted)",
              }}
            >
              or continue with
            </span>
          </div>
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-md text-sm font-semibold border transition-all hover:bg-(--bg-surface) hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-primary)",
          }}
        >
          {googleLoading ? (
            <>
              <span
                className=" text-[18px] animate-spin"
                style={{ color: "var(--text-muted)" }}
              >
                <TbProgress />
              </span>
              Connecting to Google...
            </>
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>

        {/* Sign-up link */}
        <p
          className="text-center text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold hover:underline transition-colors"
            style={{ color: "var(--color-primary)" }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
