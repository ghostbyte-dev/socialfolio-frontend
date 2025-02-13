import { NoteWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface NoteWidgetProps {
  data: NoteWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
}

export function NoteWidget({ data, size, isOwner, variant, deleteWidget }: NoteWidgetProps) {
  return (
    <BaseWidget isOwner={isOwner} deleteWidget={deleteWidget}>
      {variant == 1 && (
          <div className="h-full w-full p-20">
            <p>
              {data.note}
            </p>
          </div>
      )}
    </BaseWidget>
  );
}
