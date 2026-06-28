import { MdShield, MdSupportAgent, MdVerifiedUser, MdBolt } from "react-icons/md";

const FEATURES = [
  {
    icon: <MdShield />,
    title: "Secure Records",
    description: "Your medical data is protected by industry-standard encryption and strict privacy protocols.",
    bg: "var(--color-success-bg)",
    color: "var(--color-success)",
  },
  {
    icon: <MdSupportAgent />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your healthcare needs and technical inquiries.",
    bg: "var(--color-primary-light)",
    color: "var(--color-primary)",
  },
  {
    icon: <MdVerifiedUser />,
    title: "Verified Doctors",
    description: "Every physician on our platform undergoes a rigorous vetting and credentialing process.",
    bg: "var(--color-success-bg)",
    color: "var(--color-success)",
  },
  {
    icon: <MdBolt />,
    title: "Easy Booking",
    description: "Book, reschedule, or cancel appointments in seconds with our intuitive interface.",
    bg: "var(--color-primary-light)",
    color: "var(--color-primary)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Why Choose WeCare?
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            We combine advanced technology with compassionate care to deliver a seamless healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-8 rounded-xl border shadow-sm hover:shadow-md transition-all"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-default)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-3xl"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--text-secondary)" }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
