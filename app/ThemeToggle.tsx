"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-14 items-center rounded-full border border-[var(--border)] bg-[var(--hover-bg)] p-1 transition-colors hover:bg-[var(--hover-bg-strong)]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Knob */}
      <div
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-[var(--text-primary)] shadow-lg shadow-[var(--accent)]/25 transition-transform duration-300 ${
          theme === "light" ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={14} />
        ) : (
          <Sun size={14} />
        )}
      </div>

      {/* Sun (left) */}
      <div className="relative z-10 ml-5 flex items-center">
        <Sun
          size={13}
          className={`transition-all duration-300 ${
            theme === "light" ? "text-[var(--text-warning)]" : "text-[var(--text-tertiary)]"
          }`}
        />
      </div>

      {/* Moon (right) */}
      <div className="relative z-10 mr-5 flex items-center">
        <Moon
          size={13}
          className={`transition-all duration-300 ${
            theme === "dark" ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
          }`}
        />
      </div>
    </button>
  );
}