"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Moon from "@/assets/icons/moon-outline.svg";
import Sunny from "@/assets/icons/sunny-outline.svg";
import Laptop from "@/assets/icons/laptop-outline.svg";

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
        className={`rounded-lg p-2 ${
          theme === "system" ? activeColor : bgColor
        }`}
        aria-label="System Theme"
      >
        <Laptop className="w-[20px] h-[20px]" />
      </button>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => setTheme("light")}
        className={`rounded-lg p-2 ${
          theme === "light" ? activeColor : bgColor
        }`}
        aria-label="Light Theme"
      >
        <Sunny className="w-[20px] h-[20px]" />
      </button>
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={() => setTheme("dark")}
        className={`rounded-lg p-2 ${theme === "dark" ? activeColor : bgColor}`}
        aria-label="Dark Theme"
      >
        <Moon className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};
