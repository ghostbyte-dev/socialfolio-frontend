import Image from "next/image";
import type { ThreemaData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface WidgetProps {
  data: ThreemaData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function ThreemaWidget({
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
      link={`https://threema.id/${data.id}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/threema/threema_white.svg"
              alt="Threema logo"
              fill
              className="object-contain hidden dark:block"
            />

            <Image
              src="/widgets/threema/threema_black.svg"
              alt="Threema logo"
              fill
              className="object-contain block dark:hidden"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
