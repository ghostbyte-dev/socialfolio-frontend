import { PixelfedData, VernissageData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface VernissageWidgetProps {
  data: VernissageData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function VernissageWidget({ data, size, isOwner, variant, deleteWidget, editWidget }: VernissageWidgetProps) {
  const onClick = () => {
    const url = "https://vernissage.photos/@" + data.username;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <BaseWidget isOwner={isOwner} isClickable={true} deleteWidget={deleteWidget} editWidget={editWidget} onClick={onClick}>
      {variant == 1 && (
          <div className="h-full w-full flex justify-center items-center">
            <img
              src="/widgets/vernissage/vernissage-white.svg"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] hidden dark:block"
            />
             <img
              src="/widgets/vernissage/vernissage-black.svg"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] block dark:hidden"
            />
          </div>
      )}
      {variant == 2 && (
          <div className="h-full w-full flex justify-center items-center">
           <img
              src="/widgets/vernissage/vernissage-V-white.svg"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] hidden dark:block"
            />
             <img
              src="/widgets/vernissage/vernissage-V-black.svg"
              alt="Pixelfed logo"
              className="w-[50%] h-[50%] block dark:hidden"
            />
          </div>
      )}
    </BaseWidget>
  );
}
