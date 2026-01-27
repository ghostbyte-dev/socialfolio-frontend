"use client";

import type React from "react";
import { useEffect, useState } from "react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: "md" | "lg" | "xl";
  nopadding?: boolean;
};

const Popup = ({
  isOpen,
  onClose,
  children,
  width = "md",
  nopadding = false,
}: PopupProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  const widthClasses = {
    md: "max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[30vw]",
    lg: "max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[40vw]",
    xl: "max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[70vw]",
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldRender && isOpen) {
      const frame1 = requestAnimationFrame(() => {
        const frame2 = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
        return () => cancelAnimationFrame(frame2);
      });
      return () => cancelAnimationFrame(frame1);
    }
  }, [shouldRender, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the body
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function in case the component unmounts unexpectedly
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <>
    <div
      role="presentation"
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating
          ? "bg-black/30 backdrop-blur-sm opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={onClose}
    >
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`wrapper z-50 h-fit flex flex-col shadow-xl transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        } w-full ${widthClasses[width]}`}
      >
        <div
          className={`${nopadding ? "p-0" : "p-8"} overflow-y-auto max-h-[90vh]`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
