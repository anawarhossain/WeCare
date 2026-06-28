// components/about/AboutValues.jsx
// Presentational Server Component

import {
  MdLocationOn,
  MdVerifiedUser,
  MdLightbulb,
  MdHealthAndSafety,
  MdFavorite,
  MdPeople,
} from "react-icons/md";

const VALUES = [
  {
    Icon: MdLocationOn,
    title: "Accessibility",
    desc: "Reaching patients where they are — through digital and physical care touchpoints across the country.",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    hoverBorder: "var(--color-success)",
  },
  {
    Icon: MdVerifiedUser,
    title: "Trust",
    desc: "Every professional is verified and every health record secured with enterprise-grade encryption.",
    iconBg: "var(--color-primary-light)",
    iconColor: "var(--color-primary)",
    hoverBorder: "var(--color-primary)",
  },
  {
    Icon: MdLightbulb,
    title: "Innovation",
    desc: "Leveraging modern technology for predictive health outcomes and seamless appointment scheduling.",
    iconBg: "var(--color-warning-bg)",
    iconColor: "var(--color-warning)",
    hoverBorder: "var(--color-warning)",
  },
  {
    Icon: MdHealthAndSafety,
    title: "Quality Care",
    desc: "Uncompromising clinical standards applied consistently across our entire healthcare network.",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    hoverBorder: "var(--color-success)",
  },
  {
    Icon: MdFavorite,
    title: "Compassion",
    desc: "Every interaction — whether digital or in-person — is guided by empathy and genuine concern.",
    iconBg: "var(--color-danger-bg)",
    iconColor: "var(--color-danger)",
    hoverBorder: "var(--color-danger)",
  },
  {
    Icon: MdPeople,
    title: "Community",
    desc: "Building a healthcare network that serves families, not just individuals, across Bangladesh.",
    iconBg: "var(--color-primary-light)",
    iconColor: "var(--color-primary)",
    hoverBorder: "var(--color-primary)",
  },
];

export default function AboutValues() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg-surface)" }}
    >
      <div className="max-w-300 mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: "var(--color-primary)" }}
          >
            What Drives Us
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Guided by Our Values
          </h2>
          <div
            className="w-14 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: "var(--color-success)" }}
          />
        </div>

        {/* Value cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => {
            const Icon = v.Icon;
            return (
              <div
                key={v.title}
                className="group rounded-4xl p-7 border transition-all duration-300 hover:shadow-lg cursor-default"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-default)",
                  // hover border handled via inline onMouseEnter/Leave not possible in Server
                  // — use a subtle left accent bar instead
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: v.iconBg }}
                >
                  <Icon size={22} style={{ color: v.iconColor }} />
                </div>

                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {v.desc}
                </p>

                {/* Bottom accent line on hover via CSS group */}
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: v.hoverBorder }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
