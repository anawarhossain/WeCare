"use client";
// components/about/AboutStats.jsx
// Client Component — counter animation on scroll

import { useEffect, useRef, useState } from "react";
import { MdStar } from "react-icons/md";

const STATS = [
  { value: 500, suffix: "+", label: "Specialized Doctors" },
  { value: 50000, suffix: "+", label: "Happy Patients", format: "50k" },
  { value: 150000, suffix: "+", label: "Appointments", format: "150k" },
  { value: 4.9, suffix: "/5", label: "Average Rating", isStar: true },
];

function useCountUp(target, duration = 1600, start = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((target * eased).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return current;
}

function StatItem({ stat, animate }) {
  const raw = useCountUp(stat.value, 1600, animate);

  let display;
  if (stat.format === "50k") display = `${Math.round(raw / 1000)}k`;
  else if (stat.format === "150k") display = `${Math.round(raw / 1000)}k`;
  else display = raw % 1 !== 0 ? raw.toFixed(1) : Math.round(raw).toLocaleString();

  return (
    <div className="text-center px-4">
      <div
        className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center gap-1"
        style={{ color: "var(--color-primary)" }}
      >
        {display}
        {stat.suffix}
        {stat.isStar && (
          <MdStar size={28} style={{ color: "var(--accent-500)" }} />
        )}
      </div>
      <div
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function AboutStats() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 border-y"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="max-w-300 mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x"
          style={{ "--tw-divide-opacity": 1 }}
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
