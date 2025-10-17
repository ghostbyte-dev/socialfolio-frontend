import type { BuymeacoffeeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface BuyMeACoffeeWidgetProps {
  data: BuymeacoffeeData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function BuyMeACoffeeWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: BuyMeACoffeeWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://buymeacoffee.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ffdd00]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/buymeacoffee/buymeacoffee.svg"
              alt="Buy me a Coffee logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
