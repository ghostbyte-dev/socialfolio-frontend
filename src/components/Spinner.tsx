"use client";

import { LoaderCircleIcon } from "lucide-react";

interface SpinnerProps {
  color?: string;
  size?: number;
}

export function Spinner({ color = "", size = 24 }: SpinnerProps) {
  return (
    <span className="inline-block">
      <LoaderCircleIcon className={`animate-spin ${color}`} size={size} />
      <span className="sr-only">Loading</span>
    </span>
  );
}
