import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineMilitaryTech } from "react-icons/md";

export default function AboutTab({ doctor }) {
  const { bio, specializations, awards } = doctor;

  return (
    <div
      className="p-6 md:p-8 rounded-2xl border shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <h2
        className="text-2xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        Professional Biography
      </h2>

      <div className="space-y-4 mb-8">
        {bio}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Specializations */}
        <div
          className="p-5 rounded-xl"
          style={{ backgroundColor: "var(--bg-surface)" }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Specializations
          </h3>
          <ul className="space-y-2">
            {specializations.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className=" text-xl"
                  style={{
                    color: "var(--color-primary)",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  <IoIosCheckmarkCircleOutline />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div
          className="p-5 rounded-xl"
          style={{ backgroundColor: "var(--bg-surface)" }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Awards & Honors
          </h3>
          <ul className="space-y-2">
            {awards.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className=" text-amber-500 text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <MdOutlineMilitaryTech />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
