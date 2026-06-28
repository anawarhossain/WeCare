"use client";
// components/contact/ContactMap.jsx
// Client Component — map interaction (zoom buttons)

import { useState } from "react";
import { MdAdd, MdRemove, MdLocalHospital, MdOpenInNew } from "react-icons/md";

export default function ContactMap() {
  const [zoom, setZoom] = useState(14);

  const MAP_SRC = `https://maps.google.com/maps?q=Dhaka+Bangladesh&t=m&z=${zoom}&output=embed&iwloc=near`;

  return (
    <div
      className="rounded-[20px] overflow-hidden border relative"
      style={{
        borderColor: "var(--border-default)",
        boxShadow: "var(--shadow-md)",
        height: 420,
      }}
    >
      {/* Embedded map */}
      <iframe
        title="WeCare Location"
        src={MAP_SRC}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Location card overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="flex flex-col items-center gap-1.5 px-5 py-3.5 rounded-[14px] text-center pointer-events-auto"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <MdLocalHospital
            size={28}
            style={{ color: "var(--color-primary)" }}
          />
          <p
            className="text-sm font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            WeCare Health Center
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            123 Healthcare Plaza, Dhaka 1205
          </p>
          <a
            href="https://maps.google.com/?q=Dhaka+Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold mt-1 transition-opacity hover:opacity-80"
            style={{ color: "var(--color-primary)" }}
          >
            <MdOpenInNew size={13} />
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-1.5 z-10">
        {[
          { label: "+", action: () => setZoom((z) => Math.min(z + 1, 20)), Icon: MdAdd },
          { label: "−", action: () => setZoom((z) => Math.max(z - 1, 8)), Icon: MdRemove },
        ].map(({ label, action, Icon }) => (
          <button
            key={label}
            onClick={action}
            className="w-9 h-9 flex items-center justify-center rounded-[8px] border transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-default)",
              color: "var(--text-secondary)",
            }}
            aria-label={label}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
