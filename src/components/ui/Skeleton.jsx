export default function Skeleton({
  className = "",
  style = {},
  rounded = "md",
}) {
  const radiusMap = {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    full: "9999px",
  };

  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{ borderRadius: radiusMap[rounded] || radiusMap.md, ...style }}
    />
  );
}
