import { BlueskyData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface BlueskyWidgetProps {
  data: BlueskyData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function BlueskyWidget({ data, size, isOwner, variant, deleteWidget, editWidget }: BlueskyWidgetProps) {
  const onClick = () => {
    const url = "https://bsky.app/profile/" + data.handle;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src="/widgeteditor/bluesky.svg"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
      )}
    </BaseWidget>
  );
}
