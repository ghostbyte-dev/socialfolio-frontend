import type { BookWyrmWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface BookWyrmWidgetProps {
  data: BookWyrmWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function BookWyrmWiget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: BookWyrmWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`${data.instance}/user/${data.username}`}
    >
      {variant == 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/bookwyrm.png"
            alt="Bookwyrm logo"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
