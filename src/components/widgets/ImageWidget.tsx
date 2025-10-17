import type { ImageWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface ImageWidgetProps {
  data: ImageWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function ImageWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: ImageWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={data.link}
    >
      {variant === 1 && (
        <div className={`h-full w-full relative variant-${variant}`}>
          <Image src={data.image} alt="" fill className="object-cover" />
        </div>
      )}
    </BaseWidget>
  );
}
