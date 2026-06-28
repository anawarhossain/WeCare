// components/about/AboutTeam.jsx
// Presentational Server Component

import { MdLinkedCamera } from "react-icons/md";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const TEAM = [
  {
    name: "Dr. Sarah Ahmed",
    role: "Founder & Chief Medical Officer",
    specialization: "Cardiology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Karim Hassan",
    role: "Co-Founder & Head of Operations",
    specialization: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Nadia Islam",
    role: "Director of Patient Experience",
    specialization: "General Medicine",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Rahim Chowdhury",
    role: "Chief Technology Officer",
    specialization: "Health Informatics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80",
    linkedin: "#",
    twitter: "#",
  },
];

export default function AboutTeam() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-300 mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: "var(--color-success)" }}
          >
            The People Behind WeCare
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Meet Our Leadership
          </h2>
          <p
            className="text-sm mt-3 max-w-md mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Visionaries who combine clinical excellence with a passion for
            making healthcare better for everyone.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group rounded-[20px] overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-default)",
              }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden h-56">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  fill
                />
                {/* Overlay with social links */}
                <div
                  className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(12,74,110,0.7)" }}
                >
                  <a
                    href={member.linkedin}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: "white" }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={15} style={{ color: "var(--color-primary)" }} />
                  </a>
                  <a
                    href={member.twitter}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: "white" }}
                    aria-label="Twitter"
                  >
                    <FaTwitter size={15} style={{ color: "var(--color-primary)" }} />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {member.specialization}
                </p>
                <h3
                  className="text-sm font-bold leading-snug mb-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs leading-snug"
                  style={{ color: "var(--text-muted)" }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
