import { PixelfedData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface LemmyWidgetProps {
  data: PixelfedData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LemmyWidget({ data, size, isOwner, variant, deleteWidget, editWidget }: LemmyWidgetProps) {
  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget}>
      {variant == 1 && (
        <Link href={data.instance + "/@" + data.username}>
          <div className="h-full w-full p-20">
            <img
              src="/widgeteditor/lemmy.svg"
              alt="Pixelfed logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
      )}
    </BaseWidget>
  );
}
