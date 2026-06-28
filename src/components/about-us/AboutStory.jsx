// components/about/AboutStory.jsx
// Presentational Server Component

import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";

const MILESTONES = [
  { year: "1998", text: "Founded by a group of cardiologists in Dhaka" },
  { year: "2010", text: "Expanded to 10+ specialties across Bangladesh" },
  { year: "2018", text: "Launched digital appointment booking platform" },
  { year: "2024", text: "Reached 150,000+ successful appointments" },
];

export default function AboutStory() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-300 mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left — Image */}
        <div className="relative order-2 md:order-1">
          {/* <div className="relative rounded-[28px] overflow-hidden shadow-xl group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk8JxCJNmlVbcLZ2RWqV5eSI6XgJSoEGBMX4xiCXu4mX4hkrynVLesffknwlWVEuazOIgqZ5O7A6migLEawLZbkLBSdBVICpoTvLatFJ9KZkRolBQvzDOOqvhc7R_eZv6jvnd8eO4u7MKPaOOlXCyL_ZkM6PNs9_l0FwbIgN-ismrn1V-Qd8OlnjctAAHKcyzDTU237Lp2gp2OyU0odupvnNP15r2wbsP6c3CUd8W-zRiXaNLeG-pf7omAROT00zII0yXZXAwNGSg"
              alt="Doctor with patient"
              className="w-full h-115 object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              objectPosition="relative"
              
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--primary-900) 0%, transparent 55%)",
                opacity: 0.28,
              }}
            />
          </div> */}

          {/* Milestone floating card */}
          <div
            className="absolute -right-4 bottom-8 rounded-4xl px-5 py-4 shadow-xl w-52"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Journey
            </p>
            {MILESTONES.slice(0, 2).map((m) => (
              <div key={m.year} className="flex items-start gap-2 mb-2">
                <span
                  className="text-xs font-bold mt-0.5 shrink-0"
                  style={{ color: "var(--color-primary)" }}
                >
                  {m.year}
                </span>
                <span
                  className="text-xs leading-snug"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Text */}
        <div className="order-1 md:order-2">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: "var(--color-success)" }}
          >
            Our Legacy
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Our Story
          </h2>

          <div
            className="space-y-4 text-base leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              WeCare was founded in 1998 with a singular vision: to bridge the
              gap between quality medical expertise and patient convenience.
              What began as a small group of passionate cardiologists has
              evolved into a comprehensive digital-first healthcare ecosystem.
            </p>
            <p>
              For over two decades, we have remained committed to the principle
              that distance or administrative hurdles should never stand between
              a patient and clinical excellence — keeping rigor at the heart of
              innovation.
            </p>
          </div>

          {/* Milestone list */}
          <div className="space-y-3">
            {MILESTONES.map((m) => (
              <div key={m.year} className="flex items-start gap-3">
                <MdCheckCircle
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--color-success)" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="font-bold mr-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {m.year} —
                  </span>
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
