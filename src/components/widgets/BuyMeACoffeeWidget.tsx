import type { BuymeacoffeeData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
          <img
            src="/widgets/buymeacoffee/buymeacoffee.svg"
            alt="Buy me a Coffee logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
