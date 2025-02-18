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
  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget}>
      {variant == 1 && (
        <Link href={"https://liberapay.com/" + data.username}>
          <div className="h-full w-full bg-[#f6c915] p-20">
            <img
              src="/widgets/liberapay/liberapay-logo-black.webp"
              alt="LiberaPay logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
