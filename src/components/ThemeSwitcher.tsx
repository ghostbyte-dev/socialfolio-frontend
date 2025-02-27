"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Moon from "@/assets/icons/moon-outline.svg";
import Sunny from "@/assets/icons/sunny-outline.svg";
import Laptop from "@/assets/icons/laptop-outline.svg";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative bg-surface-container rounded-xl p-1">
      <button
        onClick={() => setTheme("system")}
        className={
          "rounded-lg p-2 " +
          (theme === "system" ? "bg-surface-container-high" : "bg-surface-container")
        }
      >
        <Laptop className="w-[20px] h-[20px]" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={
          "rounded-lg p-2 " +
          (theme === "light" ? "bg-surface-container-high" : "bg-surface-container")
        }      >
        <Sunny className="w-[20px] h-[20px]" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={
          "rounded-lg p-2 " +
          (theme === "dark" ? "bg-surface-container-high" : "bg-surface-container")
        }      >
        <Moon className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
};
