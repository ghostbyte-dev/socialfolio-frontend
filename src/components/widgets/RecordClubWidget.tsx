import type { RecordClubData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

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
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://record.club/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-3/5 h-3/5 relative">
            <Image
              src="/widgeteditor/recordClub.png"
              alt="RecordClub logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
