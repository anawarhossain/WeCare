"use client";

import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdSchedule,
  MdLocalHospital,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const INFO_CARDS = [
  {
    Icon: MdPhone,
    title: "Phone",
    value: "+880 1800-WECARE",
    href: "tel:+8801800932273",
    iconBg: "var(--color-primary-light)",
    iconColor: "var(--color-primary)",
  },
  {
    Icon: MdEmail,
    title: "Email",
    value: "support@wecare.com",
    href: "mailto:support@wecare.com",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
  },
  {
    Icon: MdLocationOn,
    title: "Address",
    value: "123 Healthcare Plaza, Dhaka 1205",
    href: "https://maps.google.com",
    iconBg: "var(--color-warning-bg)",
    iconColor: "var(--color-warning)",
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Emergency only" },
];

const SOCIALS = [
  { Icon: FaFacebookF, label: "Facebook", href: "#" },
  { Icon: FaTwitter, label: "Twitter", href: "#" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { Icon: FaYoutube, label: "YouTube", href: "#" },
];

export default function ContactInfoPanel() {
  return (
    <div className="flex flex-col gap-5">
      {/* Section label */}
      <div>
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Get in Touch
        </span>
        <h2
          className="text-xl font-bold mt-1"
          style={{ color: "var(--text-primary)" }}
        >
          Contact Information
        </h2>
      </div>

      {/* Info cards */}
      {INFO_CARDS.map(({ Icon, title, value, href, iconBg, iconColor }) => (
        <a
          key={title}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="group flex items-start gap-4 p-4 rounded-[14px] border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-default)",
          }}
        >
          <div
            className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: iconBg }}
          >
            <Icon size={20} style={{ color: iconColor }} />
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {title}
            </p>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </p>
          </div>
        </a>
      ))}

      {/* Emergency hotline */}
      <div
        className="relative overflow-hidden rounded-[14px] p-5 border"
        style={{
          backgroundColor: "var(--color-danger-bg)",
          borderColor: "var(--color-danger)",
        }}
      >
        {/* bg decor */}
        <MdLocalHospital
          size={100}
          className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none"
          style={{ color: "var(--color-danger)" }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MdLocalHospital
              size={28}
              className="animate-pulse shrink-0"
              style={{ color: "var(--color-danger)" }}
            />
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--color-danger-text)" }}
              >
                24/7 Emergency Hotline
              </p>
              <p
                className="text-lg font-bold tracking-tight leading-none mt-0.5"
                style={{ color: "var(--color-danger)" }}
              >
                1-800-WE-CARE
              </p>
            </div>
          </div>
          <a
            href="tel:18009332273"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 hover:shadow-lg shrink-0"
            style={{
              backgroundColor: "var(--color-danger)",
              color: "#ffffff",
            }}
          >
            <MdPhone size={14} />
            Call Now
          </a>
        </div>
      </div>

      {/* Working hours */}
      <div
        className="rounded-[14px] p-5 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-default)",
        }}
      >
        <h3
          className="text-sm font-bold flex items-center gap-2 mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          <MdSchedule size={18} style={{ color: "var(--color-primary)" }} />
          Working Hours
        </h3>
        <div className="space-y-2.5">
          {HOURS.map(({ day, time }) => (
            <div
              key={day}
              className="flex items-center justify-between text-xs"
            >
              <span
                className="font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {day}
              </span>
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3 pt-1">
        <span
          className="text-xs font-bold uppercase tracking-widest mr-1"
          style={{ color: "var(--text-muted)" }}
        >
          Follow Us
        </span>
        {SOCIALS.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
            style={{
              borderColor: "var(--border-default)",
              backgroundColor: "var(--bg-muted)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-muted)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border-default)";
            }}
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}
