import { LiberaPayData, PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";

interface LiberaPayWidgetProps {
  data: LiberaPayData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LiberaPayWidget({ data, size, variant, isOwner, deleteWidget, editWidget }: LiberaPayWidgetProps) {

  const onClick = () => {
    const url = "https://liberapay.com/" + data.username;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
          <div className="h-full w-full bg-[#f6c915] flex justify-center items-center">
            <img
              src="/widgets/liberapay/liberapay-logo-black.webp"
              alt="LiberaPay logo"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
      )}
    </BaseWidget>
  );
}
