"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

export const ThemeSwitcher = ({
  bgColor = "bg-surface-container",
  activeColor = "bg-primary text-on-primary",
  isFocusable = true,
}: {
  bgColor?: string;
  activeColor?: string;
  isFocusable?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const tabIndex = isFocusable ? 0 : -1;

  return (
    <div className={`relative rounded-xl p-1 text-text ${bgColor}`}>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => setTheme("system")}
        className={`rounded-lg p-1.5 ${
          theme === "system" ? activeColor : bgColor
        }`}
        aria-label="System Theme"
      >
        <LaptopIcon size={22} />
      </button>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => setTheme("light")}
        className={`rounded-lg p-1.5 ${
          theme === "light" ? activeColor : bgColor
        }`}
        aria-label="Light Theme"
      >
        <SunIcon size={22} />
      </button>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => setTheme("dark")}
        className={`rounded-lg p-1.5 ${
          theme === "dark" ? activeColor : bgColor
        }`}
        aria-label="Dark Theme"
      >
        <MoonIcon size={22} />
      </button>
    </div>
  );
};
