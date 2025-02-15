import React, { useEffect, useRef, useState } from "react";

export interface BaseWidgetProps {
  children: React.ReactNode;
  isOwner: boolean;
  isClickable: boolean;
  deleteWidget: () => void;
  onResize?: (size: number) => void; // Optional callback
}

export function BaseWidget({
  children,
  isOwner,
  isClickable,
  deleteWidget,
  onResize
}: BaseWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onResize) return; // Skip if no resize handler is provided
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        onResize(entry.contentRect.width );
      }
    });

    if (widgetRef.current) resizeObserver.observe(widgetRef.current);

    return () => resizeObserver.disconnect();
  }, []);
  
  return (
    <div
    ref={widgetRef}
      className={`h-full w-full border rounded-2xl shadow-md bg-white duration-300 ease-in-out overflow-hidden group 
      ${isClickable ? "hover:scale-95 cursor-pointer" : ""}`}
    >
      {children}

      {isOwner && (
        <div
          onClick={deleteWidget}
          className="top-4 left-4 absolute bg-red-500 rounded-full h-8 w-8 flex justify-center items-center scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:!scale-110"
        >
          <img src="/icons/close.svg" alt="Close icon" width={10} height={10} />
        </div>
      )}
    </div>
  );
}
