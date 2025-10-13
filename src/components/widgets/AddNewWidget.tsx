"use client";

import { BaseWidget } from "./BaseWidget";
import { useState } from "react";
import WidgetEditor from "../widgetEditor/WidgetCreator";
import Add from "@/assets/icons/add.svg";

interface AddNewWidgetProps {
  size: { cols: number; rows: number };
}

export function AddNewWidget({ size }: AddNewWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseWidget
        isOwner={false}
        isClickable={true}
        deleteWidget={() => {}}
        editWidget={() => {}}
        onClick={() => setIsOpen(true)}
      >
        <div className="h-full w-full flex justify-center items-center flex-col hover:cursor-pointer">
          <Add className="w-[64px] h-[64px]" />
          <span className="md:mt-5 font-bold text-xl md:text-2xl">
            Add Widget
          </span>
        </div>
      </BaseWidget>
      {isOpen && <WidgetEditor onClose={() => setIsOpen(false)} />}{" "}
    </>
  );
}
