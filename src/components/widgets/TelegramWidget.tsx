import Image from "next/image";
import type { TelegramData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WidgetProps {
  data: TelegramData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function TelegramWidget({
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
      link={`https://t.me/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#37aee2]">
          <div className="w-2/3 h-2/3 relative">
            <Image
              src="/widgets/telegram/telegram.svg"
              alt="Telegram logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
