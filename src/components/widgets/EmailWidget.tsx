"use client";

import type { EmailData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { MailIcon } from "lucide-react";

interface EmailWidgetProps {
  data: EmailData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function EmailWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: EmailWidgetProps) {
  const onClick = () => {
    const url = `mailto:${data.email}`;
    window.location.href = url;
  };

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      onClick={onClick}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <MailIcon className="w-[50%] h-[50%]" />
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full justify-center items-center flex flex-col">
          <MailIcon className="w-[50%] h-[50%]" />
          <p className="break-words max-w-full">{data.email}</p>
        </div>
      )}
    </BaseWidget>
  );
}
