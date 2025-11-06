import type { PinterestData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface WidgetProps {
  data: PinterestData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function PinterestWidget({
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
      link={`https://pinterest.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#fff]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/instagram/instagram_logo.svg"
              alt="Pinterest logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
