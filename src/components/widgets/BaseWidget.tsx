import React, { useRef } from "react";
import Pencil from "@/assets/icons/pencil-outline.svg";
import Close from "@/assets/icons/close.svg";

export interface BaseWidgetProps {
  children: React.ReactNode;
  isOwner: boolean;
  isClickable: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  onClick?: () => void;
}

export function BaseWidget({
  children,
  isOwner,
  isClickable,
  deleteWidget,
  editWidget,
  onClick = () => {},
}: BaseWidgetProps) {
  const isTouch = () => {
    if (typeof window !== "undefined") {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
      );
    }
    return false;
  };

  const click = () => {
    if (isClickable && !(isOwner && isTouch())) {
      onClick();
    }
  };

  const touchStyle = isTouch()
    ? "group-focus:opacity-100 group-focus:scale-100"
    : "";

  return (
    <div
      className={`h-full w-full dark:border-2 dark:border-outline rounded-2xl shadow-md bg-surface-container duration-300 ease-in-out overflow-hidden group
      ${
        isClickable && !(isOwner && isTouch())
          ? "hover:scale-95 cursor-pointer"
          : ""
      }`}
      tabIndex={0}
      onClick={click}
    >
      {children}

      {isOwner && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              deleteWidget();
            }}
            className={`top-4 left-4 absolute bg-red-500 rounded-full h-8 w-8 flex justify-center items-center scale-75  ease-in-out duration-300 opacity-0 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
          >
            <Close className="w-[10px] h-[10px] text-white" />
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              editWidget();
            }}
            className={`top-4 right-4 absolute bg-on-surface rounded-full h-8 w-8 flex justify-center items-center scale-75 opacity-0 ease-in-out duration-300 hover:cursor-pointer group-hover:opacity-100 group-hover:scale-100 hover:scale-110! ${touchStyle}`}
          >
            <Pencil className="w-[18px] h-[18px] text-surface" />
          </div>
        </>
      )}
    </div>
  );
}
