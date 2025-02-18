"use client";

import { useEffect, useState } from "react";

const themes = ["default", "light", "dark"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "default";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="relative">
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="p-2 border rounded"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
