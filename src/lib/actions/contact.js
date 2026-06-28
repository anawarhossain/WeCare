"use server";

import { serverMutation } from "@/lib/core/server";
import { revalidatePath } from "next/cache";

export async function submitContactForm(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const department = formData.get("department")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // ── Client-side validation (server re-check) ──────────────────
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      error: "Please fill in all required fields.",
      fields: { name, email, phone, subject, department, message },
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address.",
      fields: { name, email, phone, subject, department, message },
    };
  }

  if (message.length < 20) {
    return {
      success: false,
      error: "Message must be at least 20 characters long.",
      fields: { name, email, phone, subject, department, message },
    };
  }

  const data = {
    name,
    email,
    phone: phone || null,
    subject,
    department,
    message,
    createdAt: new Date(), // স্ট্যান্ডার্ড প্র্যাকটিস হিসেবে একটি টাইমস্ট্যাম্প যোগ করতে পারেন
  };

  // ── Send to Express API (এখানে ফিক্স করা হয়েছে: "/api/contact" এর বদলে "api/contacts") ──
  const result = await serverMutation("api/contacts", data, "POST");

  if (!result || result.error) {
    return {
      success: false,
      error: result?.error ?? "Something went wrong. Please try again.",
      fields: { name, email, phone, subject, department, message },
    };
  }

  return {
    success: true,
    message:
      "Your message has been sent! We'll get back to you within 24 hours.",
  };
}
