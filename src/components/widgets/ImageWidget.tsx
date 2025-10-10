import { ImageWidgetData } from "@/types/widget-types";
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
  const onClick = () => {
    const url = data.link;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={!!data.link}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      onClick={onClick}
    >
      {variant == 1 && (
        <div className={`h-full w-full variant-${variant}`}>
          <img src={data.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </BaseWidget>
  );
}
