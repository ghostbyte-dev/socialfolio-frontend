import Image from "next/image";
import type { FacebookData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WidgetProps {
  data: FacebookData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function FacebookWidget({
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
      link={`https://facebook.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#1773ea]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/facebook/facebook.svg"
              alt="Facebook logo"
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
              src="/widgets/facebook/facebook.png"
              alt="Facebook logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
