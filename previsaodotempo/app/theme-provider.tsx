"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) setDark(saved === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  if (!mounted) return null;

  return (
    <ThemeContext value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={dark ? "dark" : ""} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext>
  );
}
