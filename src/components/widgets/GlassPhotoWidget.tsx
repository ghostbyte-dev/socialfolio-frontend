import type { GlassPhotoData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface GlassPhotoWidgetProps {
  data: GlassPhotoData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function GlassPhotoWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: GlassPhotoWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://glass.photo/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ffcc00] dark:bg-[ffd60A]">
          <img
            src="/widgets/glassphoto/glass-wordmark-black.svg"
            alt="NeoDB logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
