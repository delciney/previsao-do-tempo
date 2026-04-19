"use client";

import { createContext, useContext, useSyncExternalStore, useMemo, useCallback } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => { listeners = listeners.filter((l) => l !== listener); };
}

function getTheme() {
  return localStorage.getItem("theme") ?? "dark";
}

function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
  emitChange();
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const dark = theme === "dark";
  const toggle = useCallback(() => setTheme(dark ? "light" : "dark"), [dark]);
  const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);

  return (
    <ThemeContext value={value}>
      <div className={dark ? "dark" : ""} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext>
  );
}
