"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MdCalendarMonth, MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const SLIDE_INTERVAL_MS = 4000;

export default function HeroSection({ doctors, patientCount }) {
  // হিরো স্লাইডের জন্য — ছবি না থাকা ডাক্তার বাদ দেওয়া হলো, কারণ খালি স্লাইড দেখানোর কোনো মানে নেই
  const slides = doctors.filter((d) => d.image).slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeDoctor = slides[activeIndex];

  return (
    <header
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ── Left: Copy + CTA ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Healthcare at your{" "}
            <span style={{ color: "var(--color-primary)" }}>fingertips</span>
          </h1>
          <p className="text-lg mb-8 max-w-lg" style={{ color: "var(--text-secondary)" }}>
            Book appointments with top-rated doctors in minutes. Experience clinical excellence
            and personalized care from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/find-doctors"
              className="px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--text-on-primary)" }}
            >
              <MdCalendarMonth className="text-xl" />
              Book an Appointment
            </Link>
            <Link
              href="/about"
              className="border-2 px-8 py-4 rounded-xl font-bold transition-all hover:bg-gray-50"
              style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
            >
              Learn More
            </Link>
          </div>

          {/* Trust strip — real patient count */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {slides.slice(0, 3).map((d) => (
                <div
                  key={d._id}
                  className="w-10 h-10 rounded-full border-2 overflow-hidden relative"
                  style={{ borderColor: "var(--bg-card)" }}
                >
                  <Image src={d.image} alt={d.name} fill className="object-cover" sizes="40px" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Trusted by{" "}
              <span className="font-bold" style={{ color: "var(--color-primary)" }}>
                {patientCount.toLocaleString()}+
              </span>{" "}
              happy patients
            </p>
          </div>
        </motion.div>

        {/* ── Right: Auto-sliding doctor showcase ─────────────────── */}
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-[2rem] blur-3xl"
            style={{ backgroundColor: "var(--color-primary-light)" }}
          />
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-4/5">
            <AnimatePresence mode="wait">
              {activeDoctor && (
                <motion.div
                  key={activeDoctor._id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                    <p className="text-white font-bold text-lg">{activeDoctor.name}</p>
                    <p className="text-white/80 text-sm">{activeDoctor.specialization}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          {slides.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((d, i) => (
                <button
                  key={d._id}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show ${d.name}`}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    backgroundColor: i === activeIndex ? "var(--color-primary)" : "var(--border-default)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating verified badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 p-4 rounded-xl shadow-xl border hidden sm:block"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--color-success-bg)" }}>
                <MdVerified className="text-xl" style={{ color: "var(--color-success)" }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                  Verified Doctors
                </p>
                <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <FaStar className="text-[10px]" style={{ color: "var(--accent-500)" }} />
                  100% Certified Pros
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
