import type { PatreonData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface WidgetProps {
  data: PatreonData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function PatreonWidget({
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
      link={`https://patreon.com/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/patreon/patreon_white.svg"
              alt="Patreon logo"
              fill
              className="object-contain hidden dark:block"
            />

            <Image
              src="/widgets/patreon/patreon_black.svg"
              alt="Patreon logo"
              fill
              className="object-contain block dark:hidden"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
