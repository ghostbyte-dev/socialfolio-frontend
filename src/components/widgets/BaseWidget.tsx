import type React from "react";
import Pencil from "@/assets/icons/pencil-outline.svg";
import Close from "@/assets/icons/close.svg";
import { isTouch } from "@/lib/isTouch";

export interface BaseWidgetProps {
  children: React.ReactNode;
  isOwner: boolean;
  isClickable: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  onClick?: () => void;
  link?: string;
}

export function BaseWidget({
  children,
  isOwner,
  isClickable,
  deleteWidget,
  editWidget,
  onClick = () => {},
  link,
}: BaseWidgetProps) {
  const click = () => {
    if (isClickable && !(isOwner && isTouch())) {
      onClick();
    }
  };

  const touchStyle = isTouch()
    ? "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100"
    : "group-focus:opacity-100 group-focus:scale-100 focus:scale-100 focus:opacity-100";

  return (
    <div className="wrapper w-full h-full">
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )}

      {!link && (
        <div
          className={`h-full w-full
      ${isClickable && !(isOwner && isTouch()) ? "clickable" : ""}`}
          role="link"
          tabIndex={0}
          onClick={click}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              click();
            }
          }}
        >
          {children}
        </div>
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
            className={`top-4 left-4 absolute bg-red-500 rounded-full h-8 w-8 flex justify-center items-center scale-75  ease-in-out duration-300 opacity-0 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
          >
            <Close className="w-[10px] h-[10px] text-white" />
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
            <Pencil className="w-[18px] h-[18px] text-surface" />
          </button>
        </>
      )}
    </div>
  );
}
