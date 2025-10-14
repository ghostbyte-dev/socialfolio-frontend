import type { MatrixData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface MatrixWidgetProps {
  data: MatrixData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function MatrixWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: MatrixWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://matrix.to/#/@${data.username}:${data.instance}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/matrix-black.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain block dark:hidden"
          />
          <img
            src="/widgeteditor/matrix-white.svg"
            alt="Pixelfed logo"
            className="w-[50%] h-[50%] object-contain hidden dark:block"
          />
        </div>
      )}
    </BaseWidget>
  );
}
