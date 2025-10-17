import type { MatrixData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://matrix.to/#/@${data.username}:${data.instance}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 relative">
            <Image
              src="/widgeteditor/matrix-black.svg"
              alt="Lemmy logo"
              fill
              className="object-contain block dark:hidden"
            />

            <Image
              src="/widgeteditor/matrix-white.svg"
              alt="Lemmy logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
