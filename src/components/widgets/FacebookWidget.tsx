import type { FacebookData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
