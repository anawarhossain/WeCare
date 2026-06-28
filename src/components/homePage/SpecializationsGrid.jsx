import {
  MdFavorite,
  MdPsychology,
  MdAccessibilityNew,
  MdChildCare,
  MdFace3,
  MdBloodtype,
  MdMedicalServices,
  MdVisibility,
  MdHealing,
} from "react-icons/md";

// specialization নামের সাথে মিল রেখে icon বাছাই করার হেল্পার —
// আপনার doctorsCollection-এ কোনো icon ফিল্ড নেই, তাই keyword match করে বাছা হচ্ছে
function getIconForSpecialization(name) {
  const key = name.toLowerCase();
  if (key.includes("cardio")) return <MdFavorite />;
  if (key.includes("neuro")) return <MdPsychology />;
  if (key.includes("ortho")) return <MdAccessibilityNew />;
  if (key.includes("pediatric") || key.includes("child")) return <MdChildCare />;
  if (key.includes("derma")) return <MdFace3 />;
  if (key.includes("hemato") || key.includes("blood")) return <MdBloodtype />;
  if (key.includes("eye") || key.includes("ophthalm")) return <MdVisibility />;
  if (key.includes("general")) return <MdMedicalServices />;
  return <MdHealing />;
}

export default function SpecializationsGrid({ specializations }) {
  if (specializations.length === 0) return null;

  return (
    <section className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Our Specializations
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Access a wide network of specialized medical professionals across various fields of
            clinical expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specializations.map((spec) => (
            <div
              key={spec.name}
              className="p-6 rounded-xl border text-center transition-all cursor-pointer hover:shadow-md group"
              style={{ backgroundColor: "var(--color-primary-light)", borderColor: "var(--border-default)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: "var(--color-primary)", color: "var(--text-on-primary)" }}
              >
                {getIconForSpecialization(spec.name)}
              </div>
              <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                {spec.name}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {spec.count} doctor{spec.count === 1 ? "" : "s"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
