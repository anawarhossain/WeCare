import { MdVerified, MdSchedule, MdBlock } from "react-icons/md";

const STATUS_STYLES = {
  pending: {
    bg: "var(--color-warning-bg)",
    text: "var(--color-warning-text)",
    label: "Pending Verification",
    icon: <MdSchedule className="text-sm animate-pulse" />,
  },
  verified: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Verified",
    icon: <MdVerified className="text-sm" />,
  },
  rejected: {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    label: "Rejected",
    icon: <MdBlock className="text-sm" />,
  },
};

export default function VerificationStatusBadge({ status }) {
  const key = (status || "pending").toLowerCase();
  const style = STATUS_STYLES[key] ?? STATUS_STYLES.pending;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.icon}
      {style.label}
    </span>
  );
}
