import type { RecordClubData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

interface RecordClubWigetProps {
  data: RecordClubData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function RecordClubWidget({
  data,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: RecordClubWigetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={true}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://record.club/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <img
            src="/widgeteditor/recordClub.png"
            alt="LiberaPay logo"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      )}
    </BaseWidget>
  );
}
