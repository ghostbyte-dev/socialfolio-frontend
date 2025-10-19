import type React from "react";
import { isTouch } from "@/lib/isTouch";
import { PencilIcon, XIcon } from "lucide-react";

export interface BaseWidgetProps {
  children: React.ReactNode;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  onClick?: () => void;
  link?: string;
}

export function BaseWidget({
  children,
  isOwner,
  deleteWidget,
  editWidget,
  onClick,
  link,
}: BaseWidgetProps) {
  const isClickable = !!(link || onClick) && !(isOwner && isTouch());

  const handleClick = onClick ?? (() => {});

  const click = () => {
    if (isClickable && !(isOwner && isTouch())) {
      handleClick();
    }
  };

  const touchStyle = isTouch()
    ? "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100"
    : "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100";

  return (
    <div className="relative w-full h-full group">
      {!isClickable && <div className="w-full h-full wrapper">{children}</div>}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="wrapper clickable w-full h-full block"
        >
          {children}
        </a>
      )}

      {!link && isClickable && (
        <button
          type="button"
          className="h-full w-full wrapper clickable"
          onClick={click}
        >
          {children}
        </button>
      )}

      {isOwner && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteWidget();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                deleteWidget();
              }
            }}
            aria-label="Delete widget"
            className={`top-4 left-4 z-50 absolute bg-red-500 rounded-full h-8 w-8 flex justify-center items-center scale-75  ease-in-out duration-300 opacity-0 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
          >
            <XIcon size={18} className="text-white" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              editWidget();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                editWidget();
              }
            }}
            aria-label="Edit widget"
            className={`top-4 right-4 absolute bg-on-surface rounded-full h-8 w-8 flex justify-center items-center scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
          >
            <PencilIcon size={18} className="text-surface" />
          </button>
        </>
      )}
    </div>
  );
}
