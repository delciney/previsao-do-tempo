"use client";

import { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function getStoredTheme() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("theme");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(
    () => () => {},
    () => getStoredTheme(),
    () => null
  );
  const [dark, setDark] = useState(stored !== "light");

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={dark ? "dark" : ""} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext>
  );
}
