"use client";

import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [];
    if (currentPage > 3) pages.push(1, "...");
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...", totalPages);
    return pages;
  };

  return (
    <div className="mt-10 flex justify-center items-center gap-2">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-(--border-default) hover:bg-(--bg-surface) text-(--text-secondary) flex items-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <span className=" text-xl">
          <IoChevronBackOutline />
        </span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-1 text-(--text-muted) select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-md font-semibold text-sm transition-colors ${
                currentPage === page
                  ? "bg-(--color-primary) text-white shadow-sm"
                  : "text-(--text-secondary) hover:bg-(--bg-surface)"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md) border border-(--border-default) hover:bg-(--bg-surface) text-(--text-secondary) flex items-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <span className=" text-xl">
          <IoChevronForward />
        </span>
      </button>
    </div>
  );
}
