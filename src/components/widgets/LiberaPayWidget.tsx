import type { LiberaPayData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface LiberaPayWidgetProps {
  data: LiberaPayData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LiberaPayWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: LiberaPayWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://liberapay.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full bg-[#f6c915] flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/liberapay/liberapay-logo-black.webp"
              alt="LiberaPay logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
