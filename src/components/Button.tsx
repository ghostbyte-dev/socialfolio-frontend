"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "primary"
  | "warning"
  | "danger"
  | "success"
  | "neutral"
  | "surface";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ComponentProps<"button"> {
  label: string;
  isLoading?: boolean;
  href?: string;
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-black hover:bg-primary-variant",
  warning: "bg-warning hover:bg-warning-variant",
  danger: "bg-danger text-white hover:bg-danger-variant",
  success: "bg-success hover:bg-success-variant",
  neutral: "bg-neutral text-on-surface hover:bg-neutral-variant",
  surface: "bg-surface text-on-surface hover:bg-surface-variant",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-5 py-3 text-sm rounded-xl",
};

export function Button({
  label,
  disabled = false,
  isLoading = false,
  onClick,
  className = "",
  href,
  external = false,
  variant = "primary",
  size = "md",
  icon: Icon = undefined,
  ...props
}: ButtonProps) {
  const sharedClasses = `
    relative inline-flex items-center justify-center 
    font-medium transition-all
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${
      isLoading || disabled
        ? "opacity-70 pointer-events-none cursor-not-allowed"
        : "active:scale-95"
    }
    ${className}
  `.trim();

  const content = (
    <>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <Spinner size={size === "sm" ? 14 : 18} />
      </div>
      <div
        className={`flex items-center gap-2 transition-opacity ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {Icon && <Icon size={size === "sm" ? 14 : 18} />}
        <span className="font-bold">{label}</span>
      </div>
    </>
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link
        href={href}
        className={sharedClasses}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      type={props.type || "button"}
      className={sharedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
