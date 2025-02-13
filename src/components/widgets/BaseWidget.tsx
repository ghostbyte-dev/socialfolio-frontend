import React from "react";

export interface BaseWidgetProps {
  children: React.ReactNode;
  deleteWidget: () => void;
}

export function BaseWidget({ children, deleteWidget }: BaseWidgetProps) {
  return (
    <div className="h-full w-full border rounded-2xl shadow-md bg-white overflow-hidden">
      {children}

      <div
          onClick={deleteWidget}
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center hover:cursor-pointer"
        >
          <img src="/icons/close.svg" alt="Close icon" width={10} height={10} />
        </div>
    </div>
  );
}
