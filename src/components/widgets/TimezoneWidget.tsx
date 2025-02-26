import { TimezoneData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Moonlight from "@/assets/icons/moonlight.svg";
import Sunlight from "@/assets/icons/sunlight.svg";

interface TimezoneWidgetProps {
  data: TimezoneData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function TimezoneWidget({
  data,
  size,
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: TimezoneWidgetProps) {
  const formattedTime = new Date().toLocaleTimeString(undefined, {
    timeZone: data.timezone,
    hour: "2-digit",
    minute: "2-digit",
  });

   // Get the hour in the specified timezone
   const hour = Number(new Date().toLocaleString("en-US", {
    timeZone: data.timezone,
    hour: "2-digit",
    hour12: false,
  }));
  const isDaytime = hour >= 6 && hour < 20; // Daytime: 6 AM to 6 PM

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={false}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant == 1 && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">{formattedTime}</span>
          <span className="mt-1">local time</span>
        </div>
      )}

      {variant == 2 && (
        <div className="h-full w-full relative flex justify-center pt-10">
          <span className="text-3xl font-bold">{formattedTime}</span>
          {isDaytime ? (
            <Sunlight className="absolute bottom-0 w-full" />
          ) : (
            <Moonlight className="absolute bottom-0 w-full" />
          )}
        </div>
      )}
    </BaseWidget>
  );
}
