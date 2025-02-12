import React from "react";

export interface BaseWidgetProps {
  children: React.ReactNode;
}

export function BaseWidget({ children }: BaseWidgetProps) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="mt-2">{children}</div>
    </div>
  );
}