"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function getInitialTheme(): Theme {
  try {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
  } catch (_) {}
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // useLayoutEffect runs synchronously after DOM mutations but BEFORE paint.
  // This is critical — useEffect would flash the wrong theme for a frame.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      root.dataset.theme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.dataset.theme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")) }}>
      {children}
    </ThemeContext.Provider>
  );
}