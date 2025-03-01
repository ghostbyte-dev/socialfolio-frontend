import { BlueskyData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Bluesky from "@/assets/icons/bluesky.svg";

interface BlueskyWidgetProps {
  data: BlueskyData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function BlueskyWidget({
  data,
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: BlueskyWidgetProps) {
  const onClick = () => {
    const url = "https://bsky.app/profile/" + data.handle;
    window.location.href = url;
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
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/bluesky.svg"
            alt="Bluesky logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
      {variant == 2 && (
        <div className="h-full w-full flex justify-center items-center bg-[#1185fe]">
          <img
            src="/widgets/bluesky/bluesky_white.svg"
            alt="Bluesky logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
      {variant == 3 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgets/bluesky/bluesky_white.svg"
            alt="Bluesky logo"
            className="w-[50%] h-[50%] object-contain hidden dark:block"
          />
          <img
            src="/widgets/bluesky/bluesky_black.svg"
            alt="Bluesky logo"
            className="w-[50%] h-[50%] object-contain block dark:hidden"
          />
        </div>
      )}
    </BaseWidget>
  );
}
