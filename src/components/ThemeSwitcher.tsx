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
    <div className="relative bg-surface rounded-full p-1">
      <button
        onClick={() => setTheme("system")}
        className={
          "rounded-full p-1 " +
          (theme === "system" ? "bg-background" : "bg-surface")
        }
      >
        <Laptop className="w-[24px] h-[24px]" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={
          "rounded-full p-1 " +
          (theme === "light" ? "bg-background" : "bg-surface")
        }
      >
        <Sunny className="w-[24px] h-[24px]" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={
          "rounded-full p-1 " +
          (theme === "dark" ? "bg-background" : "bg-surface")
        }
      >
        <Moon className="w-[24px] h-[24px]" />
      </button>
    </div>
  );
};
