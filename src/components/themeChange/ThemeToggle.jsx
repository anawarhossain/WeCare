"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@gravity-ui/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

 

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full border"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
