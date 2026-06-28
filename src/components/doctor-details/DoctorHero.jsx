import Image from "next/image";
import { BsChatLeftText } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { MdOutlineWorkHistory, MdVerified } from "react-icons/md";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { SlGraduation } from "react-icons/sl";

export default function DoctorHero({ doctor, onBookClick, onFavoriteClick, isFavorite }) {
  const {
    name,
    specialization,
    hospitalName,
    experience,
    qualifications,
    rating,
    reviewCount,
    consultationFee,
    image,
    verificationStatus,
  } = doctor;

  const statusStyle = {
    pending: {
      backgroundColor: "var(--color-warning-bg)",
      color: "var(--color-warning-text)",
    },
    verified: {
      backgroundColor: "var(--color-success-bg)",
      color: "var(--color-success-text)",
    },
    rejected: {
      backgroundColor: "var(--danger-100)",
      color: "var(--danger-800)",
    },
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-8 rounded-2xl border shadow-sm mb-8 overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      {/* Photo */}
      <div className="md:col-span-4 lg:col-span-3">
        <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-md">
          <Image
            src={image}
            alt={`Portrait of ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
            priority
          />
          {/* Verified badge */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full shadow-sm text-xs font-semibold"
            style={statusStyle[verificationStatus.toLowerCase()]}
          >
            <span
              className=" text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <MdVerified />
            </span>
            {verificationStatus}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Name + Fee Row */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </h1>
              <div className="flex items-center flex-wrap gap-4">
                {/* Specialization badge */}
                <span
                  className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: "var(--primary-100)",
                    color: "var(--primary-900)",
                  }}
                >
                  {specialization}
                </span>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span
                    className=" text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    <FaStar />
                  </span>
                  <span
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {rating}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ({reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Fee box */}
            <div
              className="p-4 rounded-xl border text-center min-w-35"
              style={{
                backgroundColor: "var(--color-primary-light)",
                borderColor: "var(--primary-200)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--color-primary)" }}
              >
                Consultation Fee
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                ${consultationFee}
              </p>
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              {
                icon: <PiBuildingApartmentDuotone />,
                label: "Hospital",
                value: hospitalName,
              },
              {
                icon: <MdOutlineWorkHistory />,
                label: "Experience",
                value: `${experience}+ Years Experience`,
              },
              {
                icon: <SlGraduation />,
                label: "Qualifications",
                value: qualifications,
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span
                  className=" text-xl mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {icon}
                </span>
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onBookClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--text-on-primary)",
            }}
          >
            Book Appointment
            <span className=" text-xl">
              <CiCalendar />
            </span>
          </button>
          <button
            onClick={onFavoriteClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border hover:opacity-80 transition-all"
            style={{
              borderColor: isFavorite
                ? "var(--color-danger)"
                : "var(--border-default)",
              color: isFavorite ? "var(--color-danger)" : "var(--text-primary)",
              backgroundColor: isFavorite
                ? "var(--color-danger-bg)"
                : "transparent",
            }}
          >
            <span className="text-xl">
              {/* কন্ডিশনাল আইকন চেঞ্জ */}
              {isFavorite ? (
                <FaHeart className="text-rose-600 animate-pulse" />
              ) : (
                <FaRegHeart />
              )}
            </span>
            {isFavorite ? "Favorited" : "Favorite"}
          </button>
        </div>
      </div>
    </section>
  );
}
