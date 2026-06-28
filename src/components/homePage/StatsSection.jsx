"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  const formatted = display >= 1000 ? `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 1)}k` : display;

  return (
    <p ref={ref} className="text-3xl md:text-4xl font-bold mb-1" style={{ color: "var(--text-on-primary)" }}>
      {formatted}
      {value >= 1 ? "+" : ""}
    </p>
  );
}

export default function StatsSection({ stats }) {
  const items = [
    { label: "Doctors", value: stats.doctors },
    { label: "Patients", value: stats.patients },
    { label: "Appointments", value: stats.appointments },
    { label: "Reviews", value: stats.reviews },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: "var(--color-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6"
            >
              <Counter value={item.value} />
              <p className="font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
