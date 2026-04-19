"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  return (
    <ThemeContext value={{ dark, toggle: () => setDark((d) => !d) }}>
      <div className={dark ? "dark" : ""} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext>
  );
}
