"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import Popup from "../Popup";
import WidgetEditor from "../widgetEditor/WidgetCreator";
import { BaseWidget } from "./BaseWidget";

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
        <div className="h-full w-full flex justify-center items-center flex-col hover:cursor-pointer bg-primary text-on-primary">
          <PlusIcon size={56} />
          <span className="md:mt-5 font-bold text-xl md:text-2xl">
            Add Widget
          </span>
        </div>
      </BaseWidget>

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        width="xl"
        nopadding
      >
        <WidgetEditor onClose={() => setIsOpen(false)} />
      </Popup>
    </>
  );
}
