import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { PiBuildingApartmentDuotone } from "react-icons/pi";

export default function DoctorCard({ doctor }) {
  const {
    id,
    name,
    specialization,
    hospitalName,
    experience,
    consultationFee,
    rating,
    image,
    availableToday,
  } = doctor;

  return (
    <div className="card hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
      {/* Doctor Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={`Dr. ${name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {availableToday && (
          <span className="absolute top-3 right-3 bg-(--color-success) text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Available Today
          </span>
        )}
      </div>

      {/* Doctor Info */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name & Rating */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-(--text-primary) font-semibold text-lg leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <span className=" text-amber-500 text-base leading-none [font-variation-settings:'FILL'_1]">
              <FaStar />
            </span>
            <span className="font-bold text-(--text-primary) text-sm">
              {rating}
            </span>
          </div>
        </div>

        {/* Specialization Badge */}
        <span className="inline-block bg-(--primary-50) text-(--color-primary) px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
          {specialization}
        </span>

        {/* Details */}
        <div className="space-y-2 mb-5 flex-1">
          {/* Hospital & Experience */}
          <div className="flex items-center gap-3 text-(--text-secondary)">
            <span className=" text-(--text-muted) text-xl">
              <PiBuildingApartmentDuotone />
            </span>
            <span className="text-sm">{hospitalName}</span>
          </div>
          <div className="flex items-center gap-3 text-(--text-secondary)">
            <span className=" text-(--text-muted) text-xl">
              <MdOutlineWorkHistory />
            </span>
            <span className="text-sm">{experience} Years Experience</span>
          </div>
          <div className="flex items-center gap-3 text-(--color-primary) font-semibold">
            <span className=" text-xl">
              <FaMoneyBills />
            </span>
            <span className="text-lg">${consultationFee}</span>
          </div>
        </div>

        {/* Book Button */}
        <Link
          href={`/find-doctors/${id}`}
          className="btn-primary text-center block text-sm font-semibold hover:opacity-90 active:scale-[0.98]"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
