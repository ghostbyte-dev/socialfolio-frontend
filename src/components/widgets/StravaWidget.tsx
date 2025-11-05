import type { StravaData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Image from "next/image";

interface StravaWidgetProps {
  data: StravaData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function StravaWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: StravaWidgetProps) {
  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link={`https://strava.com/athletes/${data.username}`}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center bg-[#fc4c02]">
          <div className="w-3/4 h-3/4 relative">
            <Image
              src="/widgets/strava/strava-logo.svg"
              alt="Strava logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </BaseWidget>
  );
}
