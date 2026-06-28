"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

export default function FeaturedDoctorsSection({ doctors }) {
  if (doctors.length === 0) return null;

  return (
    <section className="py-20" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Featured Doctors
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Top-rated specialists available for immediate booking.
            </p>
          </div>
          <Link
            href="/find-doctors"
            className="font-bold flex items-center gap-1 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            View All Doctors <MdArrowForward />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor, i) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
            >
              <div className="relative w-full h-56">
                <Image
                  src={doctor.image || "/default-avatar.png"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p
                  className="font-bold text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {doctor.specialization}
                </p>
                <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {doctor.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  {doctor.experience} Years Experience
                </p>
                <div
                  className="flex justify-between items-center pt-3 border-t"
                  style={{ borderColor: "var(--border-default)" }}
                >
                  <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    ${doctor.consultationFee}/session
                  </span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-sm" style={{ color: "var(--accent-500)" }} />
                    <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                      {doctor.avgRating ? doctor.avgRating.toFixed(1) : "New"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/find-doctors/${doctor._id}`}
                  className="w-full mt-4 py-2.5 rounded-lg font-bold text-sm text-center block opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--text-on-primary)" }}
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
