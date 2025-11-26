import Image from "next/image";
import type { WattpadData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WattpadWidgetProps {
  data: WattpadData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function WattpadWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: WattpadWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://wattpad.com/user/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/wattpad/wattpad-logo.png"
              alt="Wattpad logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
