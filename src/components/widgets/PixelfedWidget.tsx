import { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";

interface PixelfedWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
}

export function PixelfedWidget({ data, size, variant }: PixelfedWidgetProps) {
  return (
    <BaseWidget>
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
