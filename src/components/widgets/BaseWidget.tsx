import React from "react";

export interface BaseWidgetProps {
  children: React.ReactNode;
}

export function BaseWidget({ children }: BaseWidgetProps) {
  return (
    <div className="h-full w-full border rounded-2xl shadow-md bg-white overflow-hidden">
      {children}
    </div>
  );
}
