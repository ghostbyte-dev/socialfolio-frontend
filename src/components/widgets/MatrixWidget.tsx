import { MatrixData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface MatrixWidgetProps {
  data: MatrixData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function MatrixWidget({ data, size, isOwner, variant, deleteWidget, editWidget }: MatrixWidgetProps) {
  const onClick = () => {
    const url = "https://matrix.to/#/@" + data.username + ":" + data.instance;
    window.location.href = url;
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
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
