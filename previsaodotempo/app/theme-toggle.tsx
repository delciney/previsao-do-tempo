"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur rounded-full p-2 text-2xl shadow-lg hover:bg-white/30 transition-all"
      aria-label="Alternar tema"
    >
      <span className={dark ? "opacity-50 grayscale" : ""}>💡</span>
    </button>
  );
}
