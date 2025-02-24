"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative bg-surface rounded-full p-1">
      <button onClick={() => setTheme("system")} className={"rounded-full p-1 " + ((theme === 'system') ? "bg-background" : "bg-surface")}>
        <Image src="/icons/laptop-outline.svg" alt="" height={24} width={24} />
      </button>
      <button onClick={() => setTheme("light")} className={"rounded-full p-1 " + ((theme === 'light') ? "bg-background" : "bg-surface")}>
        <Image src="/icons/sunny-outline.svg" alt="" height={24} width={24} />
      </button>
      <button onClick={() => setTheme("dark")} className={"rounded-full p-1 " + ((theme === 'dark') ? "bg-background" : "bg-surface")}>
        <Image src="/icons/moon-outline.svg" alt="" height={24} width={24} />
      </button>
    </div>
  );
};
