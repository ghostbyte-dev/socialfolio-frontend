import { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface PixelfedWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function PixelfedWidget({ data, size, isOwner, variant, deleteWidget, editWidget }: PixelfedWidgetProps) {

  const onClick = () => {
    const url = data.instance + "/@" + data.username;
    window.location.href = url;
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src="/widgets/pixelfed/pixelfed-logo.webp"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
      )}
    </BaseWidget>
  );
}
