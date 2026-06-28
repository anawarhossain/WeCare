import { MdPersonSearch } from "react-icons/md";

export default function EmptyState({ isSearching }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4" style={{ color: "var(--text-muted)" }}>
        <MdPersonSearch />
      </span>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {isSearching ? "No matching patients" : "No patients found"}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
        {isSearching
          ? "Try a different name or email, or clear the search."
          : "Registered patients will appear here."}
      </p>
    </div>
  );
}
