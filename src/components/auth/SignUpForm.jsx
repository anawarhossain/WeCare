"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imgUpload";

// react-icons
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineAddAPhoto,
  MdCheckCircleOutline,
  MdErrorOutline,
  MdClose,
  MdArrowForward,
  MdHealthAndSafety,
  MdExpandMore,
} from "react-icons/md";
import { TbProgress } from "react-icons/tb";

// ── Password strength helper ──────────────────────────────────
function getStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;
  const map = {
    0: { label: "", color: "var(--bg-muted)" },
    1: { label: "Weak", color: "var(--color-danger)" },
    2: { label: "Fair", color: "var(--accent-500)" },
    3: { label: "Good", color: "var(--primary-400)" },
    4: { label: "Strong", color: "var(--color-success)" },
  };
  return { score, ...map[score] };
}

// ── Reusable labelled input wrapper ───────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="flex items-center gap-1 text-xs"
          style={{ color: "var(--color-danger)" }}
        >
          <MdErrorOutline size={14} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Shared input class + style ────────────────────────────────
const inputClass =
  "w-full h-12 px-4 text-sm rounded-[var(--radius-md)] border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]";
const inputStyle = (err) => ({
  backgroundColor: "var(--bg-surface)",
  borderColor: err ? "var(--color-danger)" : "var(--border-default)",
  color: "var(--text-primary)",
});

// ── Main component ────────────────────────────────────────────
export default function SignUpForm() {
  const router = useRouter();

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    role: "patient",
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [toast, setToast] = useState(false);

  // image state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const strength = getStrength(form.password);

  // ── Field change ─────────────────────────────────────────────
  const set = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  // ── Image handling ───────────────────────────────────────────
  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Image must be under 5MB." }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((p) => ({ ...p, image: "" }));
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageFile(e.dataTransfer.files[0]);
  }, []);

  // ── Validation ───────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone))
      e.phone = "Enter a valid phone number.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Minimum 8 characters.";
    else if (strength.score < 2) e.password = "Password is too weak.";
    if (!form.gender) e.gender = "Please select a gender.";
    if (!imageFile) e.image = "Profile photo is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const imageUploadData = await imageUpload(imageFile);

      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: imageUploadData.url,
        phone: form.phone,
        role: form.role,
        gender: form.gender,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      if (error) {
        setGlobalError(error.message ?? "Sign-up failed. Please try again.");
        setLoading(false);
        return;
      }

      setToast(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error(err);
      setGlobalError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Google OAuth ─────────────────────────────────────────────
  const handleGoogle = async () => {
    setGlobalError("");
    setGoogleLoad(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setGlobalError("Google sign-up failed. Please try again.");
      setGoogleLoad(false);
    }
  };

  // ── Role tab style helper ─────────────────────────────────────
  const roleStyle = (val) => ({
    backgroundColor:
      form.role === val ? "var(--color-primary)" : "var(--bg-surface)",
    color: form.role === val ? "#ffffff" : "var(--text-secondary)",
    borderColor:
      form.role === val ? "var(--color-primary)" : "var(--border-default)",
  });

  return (
    <div className="w-full max-w-lg flex flex-col">
      {/* ── Brand ──────────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-7">
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
          className="text-2xl font-bold mt-2"
          style={{ color: "var(--text-primary)" }}
        >
          Create Account
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Join WeCare to connect with doctors and health profiles.
        </p>
      </div>

      {/* ── Card ───────────────────────────────────────────── */}
      <div
        className="card p-8 space-y-5"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        {/* Global error */}
        {globalError && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-md text-sm border"
            style={{
              backgroundColor: "var(--color-danger-bg)",
              borderColor: "var(--danger-200)",
              color: "var(--color-danger-text)",
            }}
          >
            <MdErrorOutline size={18} className="shrink-0" />
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* ── Name + Email ──────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" error={errors.name}>
              <div className="relative">
                <MdOutlinePerson
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  className={`${inputClass} pl-10`}
                  style={inputStyle(errors.name)}
                />
              </div>
            </Field>

            <Field label="Email Address" error={errors.email}>
              <div className="relative">
                <MdOutlineEmail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  className={`${inputClass} pl-10`}
                  style={inputStyle(errors.email)}
                />
              </div>
            </Field>
          </div>

          {/* ── Role pills ────────────────────────────────── */}
          <Field label="I am a">
            <div className="grid grid-cols-2 gap-3">
              {["patient", "doctor"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, role: r }))}
                  className="h-12 rounded-md border text-sm font-semibold capitalize transition-all hover:brightness-95"
                  style={roleStyle(r)}
                >
                  {r === "patient" ? "🩺 Patient" : "👨‍⚕️ Doctor"}
                </button>
              ))}
            </div>
          </Field>

          {/* ── Phone + Gender ────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone Number" error={errors.phone}>
              <div className="relative">
                <MdOutlinePhone
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="tel"
                  placeholder="+8801xxxxxxxxx"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={`${inputClass} pl-10`}
                  style={inputStyle(errors.phone)}
                />
              </div>
            </Field>

            <Field label="Gender" error={errors.gender}>
              <div className="relative">
                <select
                  value={form.gender}
                  onChange={set("gender")}
                  className={`${inputClass} pl-4 pr-10 appearance-none cursor-pointer`}
                  style={inputStyle(errors.gender)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <span
                  className=" absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[20px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MdExpandMore />
                </span>
              </div>
            </Field>
          </div>

          {/* ── Profile Photo ─────────────────────────────── */}
          <Field label="Profile Photo" error={errors.image}>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all"
              style={{
                borderColor: dragOver
                  ? "var(--color-primary)"
                  : "var(--border-default)",
                backgroundColor: dragOver
                  ? "var(--primary-50)"
                  : "var(--bg-surface)",
              }}
            >
              {imagePreview ? (
                <div className="relative flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden border-4 relative"
                    style={{ borderColor: "var(--primary-200)" }}
                  >
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-success)" }}
                  >
                    ✓ Photo selected — click to change
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="text-xs hover:underline"
                    style={{ color: "var(--color-danger)" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: "var(--bg-muted)" }}
                  >
                    <MdOutlineAddAPhoto
                      size={28}
                      style={{ color: "var(--text-muted)" }}
                    />
                  </div>
                  <p
                    className="text-sm text-center"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Drag & drop or{" "}
                    <span
                      className="font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      browse
                    </span>
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    JPG, PNG — max 5MB
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageFile(e.target.files?.[0])}
            />
          </Field>

          {/* ── Password ──────────────────────────────────── */}
          <Field label="Password" error={errors.password}>
            <div className="relative">
              <MdOutlineLock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={set("password")}
                className={`${inputClass} pl-10 pr-11`}
                style={inputStyle(errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {showPwd ? (
                  <MdOutlineVisibilityOff size={20} />
                ) : (
                  <MdOutlineVisibility size={20} />
                )}
              </button>
            </div>

            {/* Strength meter */}
            {form.password && (
              <div className="mt-2 space-y-1.5">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          i <= strength.score
                            ? strength.color
                            : "var(--bg-muted)",
                      }}
                    />
                  ))}
                </div>
                <p
                  className="text-[11px] font-semibold"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </p>
              </div>
            )}
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Min. 8 chars with 1 uppercase, 1 number & 1 special character.
            </p>
          </Field>

          {/* ── Submit ────────────────────────────────────── */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-md text-sm font-semibold shadow-md hover:brightness-95 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
            }}
          >
            {loading ? (
              <>
                <span className=" text-[18px] animate-spin">
                  <TbProgress />
                </span>
                Creating Account...
              </>
            ) : (
              <>
                Register
                <MdArrowForward size={18} />
              </>
            )}
          </button>
        </form>

        {/* ── OR Divider ─────────────────────────────────── */}
        <div className="relative flex items-center gap-4">
          <div
            className="flex-1 border-t"
            style={{ borderColor: "var(--border-default)" }}
          />
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            or
          </span>
          <div
            className="flex-1 border-t"
            style={{ borderColor: "var(--border-default)" }}
          />
        </div>

        {/* ── Google OAuth ───────────────────────────────── */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoad}
          className="w-full h-12 flex items-center justify-center gap-3 rounded-md border text-sm font-semibold transition-all hover:bg-(--bg-surface) hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            borderColor: "var(--border-default)",
            color: "var(--text-primary)",
          }}
        >
          {googleLoad ? (
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
              <FcGoogle size={20} />
              Continue with Google
            </>
          )}
        </button>

        {/* ── Footer link ────────────────────────────────── */}
        <p
          className="text-center text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* ── Success Toast ──────────────────────────────────── */}
      {toast && (
        <div
          className="fixed top-8 right-8 z-100 flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl border-l-4 border-(--color-success) max-w-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--color-success)",
          }}
        >
          <MdCheckCircleOutline
            size={28}
            style={{ color: "var(--color-success)" }}
            className="shrink-0"
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Account created successfully!
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Redirecting to your dashboard...
            </p>
          </div>
          <button
            onClick={() => setToast(false)}
            style={{ color: "var(--text-muted)" }}
          >
            <MdClose size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
