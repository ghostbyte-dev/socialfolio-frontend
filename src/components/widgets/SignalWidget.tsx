import Image from "next/image";
import type { SignalData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WidgetProps {
  data: SignalData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function SignalWidget({
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
      link={`${data.link}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#3b45fd]">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/signal/signal_white.svg"
              alt="Signal logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
