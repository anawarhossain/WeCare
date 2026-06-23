"use client";

import { useState } from "react";
import DoctorCard from "@/components/find-doctors/DoctorCard";
import DoctorCardSkeleton from "@/components/find-doctors/DoctorCardSkeleton";
import FilterSidebar from "@/components/find-doctors/FilterSidebar";
import Pagination from "@/components/find-doctors/Pagination";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdSearchOff } from "react-icons/md";

const DOCTORS_PER_PAGE = 6;

export default function FindDoctorsClient({ doctors }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    specializations: [],
    experience: "",
    sortBy: "fee",
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Client-side filter + search
  const filtered = doctors
    .filter((doc) => {
      const matchSearch =
        !searchQuery ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSpec =
        filters.specializations.length === 0 ||
        filters.specializations.some((s) =>
          doc.specialization.toLowerCase().includes(s.toLowerCase())
        );

      const matchExp =
        !filters.experience || doc.experience >= Number(filters.experience);

      return matchSearch && matchSpec && matchExp;
    })
    .sort((a, b) => {
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "experience") return b.experience - a.experience;
      return a.fee - b.fee;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / DOCTORS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE,
    currentPage * DOCTORS_PER_PAGE
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setCurrentPage(1);
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      {/* ── Hero Search Section ── */}
      <section
        className="py-14"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-(--primary-300) text-sm font-semibold uppercase tracking-widest mb-3">
            WeCare Network
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            Find Your Doctor
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-3 flex flex-col md:flex-row gap-3"
          >
            <div className="flex-1 flex items-center bg-(--bg-surface) px-4 py-2.5 rounded-md border border-(--border-default)">
              <span className=" text-(--text-muted) mr-3 text-xl">
                <CiSearch />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-(--text-primary)] placeholder:text-(--text-muted)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className=" text-(--text-muted) hover:text-(--text-secondary) text-xl ml-2"
                >
                  <IoClose />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 text-sm"
            >
              <span className=" text-xl">
                <CiSearch />
              </span>
              Search
            </button>
          </form>

          {/* Quick Specialty Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              "Cardiology",
              "Pediatrics",
              "Dermatology",
              "Neurology",
              "Orthopedics",
            ].map((spec) => (
              <button
                key={spec}
                onClick={() => {
                  setSearchQuery(spec);
                  setCurrentPage(1);
                }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border border-(--primary-400) text-(--primary-200) hover:bg-(--primary-800) transition-colors"
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar — Desktop */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24 h-fit">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </aside>

        {/* Doctor Listings */}
        <div className="col-span-1 lg:col-span-3">
          {/* Mobile Filter Bar */}
          <div className="lg:hidden flex items-center justify-between bg-(--bg-card) border border-(--border-default) rounded-lg) px-4 py-3 mb-5 shadow-sm">
            <span className="text-sm font-semibold text-(--text-primary)">
              {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
            </span>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 text-sm font-semibold text-(--color-primary) border border-(--color-primary) px-3 py-1.5 rounded-md hover:bg-(--color-primary-light) transition-colors"
            >
              <span className=" text-xl">
                <HiAdjustmentsHorizontal />
              </span>
              Filters
            </button>
          </div>

          {/* Mobile Filter Panel */}
          {mobileFilterOpen && (
            <div className="lg:hidden mb-5">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          )}

          {/* Results Count — Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-5">
            <p className="text-sm text-(--text-secondary)">
              <span className="font-semibold text-(--text-primary)">
                {filtered.length}
              </span>{" "}
              doctor{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Doctor Grid */}
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <DoctorCardSkeleton key={i} />
              ))}
            </div>
          ) : paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginated.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className=" text-6xl text-(--text-muted) mb-4">
                <MdSearchOff />
              </span>
              <h3 className="text-lg font-semibold text-(--text-primary) mb-2">
                No doctors found
              </h3>
              <p className="text-sm text-(--text-secondary) max-w-xs">
                Try adjusting your search or filters to find the right doctor.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!isSearching && filtered.length > DOCTORS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile FAB — Filter */}
      <button
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center md:hidden transition-transform hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "var(--color-success)",
          color: "white",
        }}
        aria-label="Toggle filters"
      >
        <span className="">
          <HiAdjustmentsHorizontal />
        </span>
      </button>
    </>
  );
}
