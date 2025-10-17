import type { PeertubeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface PeertubeWidgetProps {
  data: PeertubeData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function PeertubeWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: PeertubeWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/c/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/peertube.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
