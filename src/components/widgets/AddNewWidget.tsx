"use client";

import { BaseWidget } from "./BaseWidget";
import { useState } from "react";
import WidgetEditor from "../widgetEditor/WidgetCreator";
import { PlusIcon } from "lucide-react";

export function AddNewWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseWidget
        isOwner={false}
        deleteWidget={() => {}}
        editWidget={() => {}}
        onClick={() => setIsOpen(true)}
      >
        <div className="h-full w-full flex justify-center items-center flex-col hover:cursor-pointer">
          <PlusIcon size={56} />
          <span className="md:mt-5 font-bold text-xl md:text-2xl">
            Add Widget
          </span>
        </div>
      </BaseWidget>
      {isOpen && <WidgetEditor onClose={() => setIsOpen(false)} />}
    </>
  );
}
