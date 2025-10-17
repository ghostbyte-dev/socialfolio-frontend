import type { BlueskyData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: BlueskyWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://bsky.app/profile/${data.handle}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#1185fe]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/bluesky/bluesky_white.svg"
              alt="Bluesky logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/bluesky/bluesky.svg"
              alt="Bluesky logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {variant === 3 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/bluesky/bluesky_white.svg"
              alt="Bluesky logo"
              fill
              className="object-contain hidden dark:block"
            />

            <Image
              src="/widgets/bluesky/bluesky_black.svg"
              alt="Bluesky logo"
              fill
              className="object-contain block dark:hidden"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
