import { ImageWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface ImageWidgetProps {
  data: ImageWidgetData;
  size: { cols: number; rows: number };
  variant: number;
}

export function ImageWidget({ data, size, variant }: ImageWidgetProps) {
  return (
    <BaseWidget>
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
