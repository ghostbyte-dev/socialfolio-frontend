"use client";

import { LinkData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import LinkIcon from "@/assets/icons/link.svg";
import Link from "next/link";

interface LinkWidgetProps {
  data: LinkData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LinkWidget({
  data,
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LinkWidgetProps) {
  const onClick = () => {
    const url = data.link;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      onClick={onClick}
    >
      {variant == 1 && (
        <div className="h-full w-full justify-center items-center flex flex-col">
          <LinkIcon className="w-[30%] h-[30%]" />

          {data.link && (
            <Link className="break-words max-w-full" href={data.link}>
              {data.link}
            </Link>
          )}
        </div>
      )}
    </BaseWidget>
  );
}
