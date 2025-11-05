import type { LoopsData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface LoopsWidgetProps {
  data: LoopsData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LoopsWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LoopsWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#ffe500]">
          <div className="w-2/3 h-2/3 relative">
            <Image
              src="/widgets/loops/loops_logo.png"
              alt="Loops logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
