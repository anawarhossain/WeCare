import { MdCheckCircle, MdBlock } from "react-icons/md";

const STATUS_STYLES = {
  active: {
    bg: "var(--color-success-bg)",
    text: "var(--color-success-text)",
    label: "Active",
    icon: <MdCheckCircle className="text-sm" />,
  },
  suspended: {
    bg: "var(--color-danger-bg)",
    text: "var(--color-danger-text)",
    label: "Suspended",
    icon: <MdBlock className="text-sm" />,
  },
};

export default function PatientStatusBadge({ status }) {
  const key = (status || "active").toLowerCase();
  const style = STATUS_STYLES[key] ?? STATUS_STYLES.active;

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
