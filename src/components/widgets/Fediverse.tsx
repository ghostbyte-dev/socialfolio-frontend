import type { FediverseData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: FediverseWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={data.link}
    >
      {variant == 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/fediverse.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
      {variant == 2 && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <img
            src="/widgeteditor/fediverse.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain"
          />
          <p>{data.fediverseHandle}</p>
        </div>
      )}
    </BaseWidget>
  );
}
