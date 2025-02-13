import React from "react";

export interface BaseWidgetProps {
  children: React.ReactNode;
  isOwner: boolean;
  deleteWidget: () => void;
}

export function BaseWidget({
  children,
  isOwner,
  deleteWidget,
}: BaseWidgetProps) {
  return (
    <div className="h-full w-full border rounded-2xl shadow-md bg-white overflow-hidden group">
      {children}

      {isOwner && (
        <div
          onClick={deleteWidget}
          className="top-4 right-4 absolute bg-red-500 rounded-full w-8 h-8 flex justify-center items-center opacity-0 hover:cursor-pointer group-hover:opacity-100"
        >
          <img src="/icons/close.svg" alt="Close icon" width={10} height={10} />
        </div>
      )}
    </div>
  );
}
