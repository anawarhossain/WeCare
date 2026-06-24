// Server Component — hover via CSS class, no JS event handlers

import { MdMedication, MdOutlineMedicalServices, MdOutlineScience, MdVaccines } from "react-icons/md";

export default function QuickReferenceCard() {
  const quickLinks = [
    { icon: <MdMedication />, label: "Drug Interactions", href: "#" },
    { icon: <MdOutlineScience />, label: "Lab Reference Ranges", href: "#" },
    { icon: <MdVaccines />, label: "Vaccination Chart", href: "#" },
  ];

  return (
    <>
      <style>{`
        .quick-link-btn {
          background-color: rgba(255,255,255,0.08);
          transition: background-color 0.2s;
        }
        .quick-link-btn:hover {
          background-color: rgba(255,255,255,0.16);
        }
      `}</style>

      <div
        className="rounded-xl overflow-hidden shadow-sm"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        <div className="p-6 relative">
          {/* Background decorative icon */}
          <div className="absolute -bottom-3 -right-3 opacity-[0.07] pointer-events-none select-none">
            <span
              className=" text-[100px] text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <MdOutlineMedicalServices />
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--primary-300)" }}
            >
              Clinical Reference
            </p>
            <h4 className="text-lg font-semibold text-white mb-1">
              Quick Tools
            </h4>
            <p className="text-sm mb-5" style={{ color: "var(--neutral-400)" }}>
              Fast-access clinical resources for accurate prescriptions.
            </p>

            <div className="space-y-2">
              {quickLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="quick-link-btn flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-semibold"
                  style={{ color: "var(--neutral-100)" }}
                >
                  <span
                    className=" text-xl"
                    style={{ color: "var(--primary-300)" }}
                  >
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
