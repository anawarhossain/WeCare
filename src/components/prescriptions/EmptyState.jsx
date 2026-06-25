// Pure server component — no interactivity
import { MdEventBusy, MdSearchOff } from "react-icons/md";

export default function EmptyState({ isSearching }) {
  const icon = isSearching ? <MdSearchOff /> : <MdEventBusy />;
  const title = isSearching
    ? "No matching prescriptions"
    : "No prescriptions yet";
  const sub = isSearching
    ? "Try a different patient name or clear the search."
    : "Prescriptions you issue after completing appointments will appear here.";

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4" style={{ color: "var(--text-muted)" }}>
        {icon}
      </span>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm max-w-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        {sub}
      </p>
    </div>
  );
}
