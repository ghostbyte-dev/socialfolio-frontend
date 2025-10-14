import type { ImageWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
  size,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: ImageWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={!!data.link}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={data.link}
    >
      {variant === 1 && (
        <div className={`h-full w-full variant-${variant}`}>
          <img src={data.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </BaseWidget>
  );
}
