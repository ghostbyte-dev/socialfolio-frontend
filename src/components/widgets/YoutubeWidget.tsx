import Image from "next/image";
import type { YoutubeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WidgetProps {
  data: YoutubeData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function YoutubeWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: WidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://youtube.com/${data.handle}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ff0033]">
          <div className="w-2/3 h-2/3 relative">
            <Image
              src="/widgets/youtube/youtube.svg"
              alt="YouTube logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
