// ✅ Server Component — purely presentational

/**
 * ইউজারের নামের প্রথম ১-২ অক্ষর দিয়ে avatar তৈরি করে।
 * image থাকলে image দেখায়, না থাকলে initials দেখায়।
 *
 * Props:
 *   name:  string  — ইউজারের পুরো নাম
 *   image: string | null — avatar image URL (better-auth থেকে আসে)
 *   size:  "sm" | "md" | "lg"
 */

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic color from name — same name always same color
function getAvatarColor(name = "") {
  const colors = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-indigo-400 to-blue-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
}

const sizeClasses = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-11 h-11 text-sm",
};

export function UserAvatar({ name = "", image = null, size = "md" }) {
  const initials = getInitials(name);
  const colorClass = getAvatarColor(name);
  const sizeClass = sizeClasses[size] ?? sizeClasses.md;

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white/10`}
      />
    );
  }

  return (
    <span
      aria-label={name}
      className={`${sizeClass} rounded-full bg-linear-to-br ${colorClass} flex items-center justify-center font-semibold text-white ring-2 ring-white/10 shrink-0 select-none`}
    >
      {initials}
    </span>
  );
}
