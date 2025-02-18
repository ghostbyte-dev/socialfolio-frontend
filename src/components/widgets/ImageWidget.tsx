import { ImageWidgetData } from "@/types/widget-types";
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

export function ImageWidget({ data, size, variant, isOwner, deleteWidget, editWidget }: ImageWidgetProps) {
  return (
    <BaseWidget isOwner={isOwner} isClickable={false} deleteWidget={deleteWidget} editWidget={editWidget}>
      {variant == 1 && (
        <div className={`h-full w-full variant-${variant}`}>
          <img
            src={data.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </BaseWidget>
  );
}
