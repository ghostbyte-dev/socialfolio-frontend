import type { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface LemmyWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LemmyWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LemmyWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/u/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/lemmy.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
