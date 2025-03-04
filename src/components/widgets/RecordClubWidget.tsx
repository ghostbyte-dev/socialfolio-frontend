import { RecordClubData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";
import Image from "next/image";

interface RecordClubWigetProps {
  data: RecordClubData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function RecordClubWidget({ data, size, variant, isOwner, deleteWidget, editWidget }: RecordClubWigetProps) {

  const onClick = () => {
    const url = "https://record.club/" + data.username;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
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
