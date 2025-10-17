import type { FediverseData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface FediverseWidgetProps {
  data: FediverseData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function FediverseWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: FediverseWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={data.link}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgeteditor/fediverse.svg"
              alt="Fediverse logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgeteditor/fediverse.svg"
              alt="Fediverse logo"
              fill
              className="object-contain"
            />
          </div>
          <p>{data.fediverseHandle}</p>
        </div>
      )}
    </BaseWidget>
  );
}
