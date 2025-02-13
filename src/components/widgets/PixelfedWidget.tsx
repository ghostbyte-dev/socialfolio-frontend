import { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";

interface PixelfedWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
}

export function PixelfedWidget({ data, size, isOwner, variant, deleteWidget }: PixelfedWidgetProps) {
  return (
    <BaseWidget isOwner={isOwner} deleteWidget={deleteWidget}>
      {variant == 1 && (
        <Link href={"https://" + data.instance + "/@" + data.username}>
          <div className="h-full w-full p-20">
            <img
              src="/widgets/pixelfed/pixelfed-logo.webp"
              alt="Pixelfed logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
