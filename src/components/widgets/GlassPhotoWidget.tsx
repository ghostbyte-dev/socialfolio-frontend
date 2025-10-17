import type { GlassPhotoData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://glass.photo/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ffcc00] dark:bg-[ffd60A]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/glassphoto/glass-wordmark-black.svg"
              alt="NeoDB logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
