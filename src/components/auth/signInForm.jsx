"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: userData.email,
        password: userData.password,
        callbackURL: "/",
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 transition-colors duration-200"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* globals.css এর .card ইউটিলিটি ক্লাস ব্যবহার করা হয়েছে */}
      <Form
        className="card w-full max-w-md flex flex-col gap-5 p-8 transition-colors duration-200"
        onSubmit={onSubmit}
      >
        {/* Header */}
        <div className="flex flex-col gap-1 mb-2">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Welcome Back
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Sign in to your WeCare account to continue.
          </p>
        </div>

        {/* Email Field */}
        <TextField isRequired name="email" type="email" className="w-full">
          <Label style={{ color: "var(--text-primary)" }}>Email Address</Label>
          <Input placeholder="john@example.com" className="mt-1" />
          <FieldError />
        </TextField>

        {/* Password Field */}
        <TextField
          isRequired
          name="password"
          type="password"
          className="w-full"
        >
          <div className="flex justify-between items-center">
            <Label style={{ color: "var(--text-primary)" }}>Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              Forgot password?
            </Link>
          </div>
          <Input placeholder="Enter your password" className="mt-1" />
          <FieldError />
        </TextField>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-4 w-full">
          {/* globals.css এর .btn-primary ইউটিলিটি ক্লাস ব্যবহার করা হয়েছে */}
          <Button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        {/* Footer Link */}
        <p
          className="text-center text-sm mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Create an account
          </Link>
        </p>
      </Form>
    </div>
  );
}
