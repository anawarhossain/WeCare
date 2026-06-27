import { MdPersonSearch } from "react-icons/md";

export default function EmptyState({ isSearching }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4" style={{ color: "var(--text-muted)" }}>
        <MdPersonSearch />
      </span>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {isSearching ? "No matching doctors" : "No doctors found"}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
        {isSearching
          ? "Try a different name, specialization, or clear the search."
          : "Doctors will appear here once they register on the platform."}
      </p>
    </div>
  );
}
