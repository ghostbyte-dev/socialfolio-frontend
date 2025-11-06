import type { YoutubeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
        <div className="h-full w-full flex justify-center items-center bg-[#fff]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/instagram/instagram_logo.svg"
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
