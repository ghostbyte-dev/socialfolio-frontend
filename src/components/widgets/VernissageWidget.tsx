import type { VernissageData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface VernissageWidgetProps {
  data: VernissageData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function VernissageWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: VernissageWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://vernissage.photos/@${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/vernissage/vernissage-black.svg"
              alt="Vernissage logo"
              fill
              className="object-contain block dark:hidden"
            />

            <Image
              src="/widgets/vernissage/vernissage-white.svg"
              alt="Vernissage logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgets/vernissage/vernissage-V-black.svg"
              alt="Vernissage logo"
              fill
              className="object-contain block dark:hidden"
            />

            <Image
              src="/widgets/vernissage/vernissage-V-white.svg"
              alt="Vernissage logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
