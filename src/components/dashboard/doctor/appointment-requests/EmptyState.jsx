// Pure server component — no interactivity

import { MdEventBusy } from "react-icons/md";

const EMPTY_CONFIG = {
  pending: {
    icon: <MdEventBusy />,
    title: "No pending requests",
    sub: "All caught up! New requests will appear here.",
  },
  accepted: {
    icon: <MdEventBusy />,
    title: "No accepted requests",
    sub: "Accepted appointments will show up here.",
  },
  completed: {
    icon: <MdEventBusy />,
    title: "No completed sessions",
    sub: "Completed consultations will be listed here.",
  },
  rejected: {
    icon: <MdEventBusy />,
    title: "No rejected requests",
    sub: "Rejected appointments will appear here.",
  },
};

export default function EmptyState({ tab }) {
  const { icon, title, sub } = EMPTY_CONFIG[tab] ?? EMPTY_CONFIG.pending;
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span
        className=" text-6xl mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        {icon}
      </span>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>
        {sub}
      </p>
    </div>
  );
}
