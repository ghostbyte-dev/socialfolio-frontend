import { useEffect, useState } from "react";
import Moonlight from "@/assets/icons/moonlight.svg";
import Sunlight from "@/assets/icons/sunlight.svg";
import type { TimezoneData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";

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
  variant,
  isOwner,
  deleteWidget,
  editWidget,
}: TimezoneWidgetProps) {
  // Use state to avoid hydration mismatch errors
  const [time, setTime] = useState<string | null>(null);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      // Fallback to UTC if timezone is missing or invalid
      const tz = data.timezone || "UTC";

      try {
        const now = new Date();

        const formatted = now.toLocaleTimeString(undefined, {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
        });

        const hour = Number(
          now.toLocaleString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            hour12: false,
          }),
        );

        setTime(formatted);
        setIsDaytime(hour >= 6 && hour < 20);
      } catch (e) {
        // Fallback for invalid timezone strings during editing
        setTime("--:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [data.timezone]);

  // Don't render time-specific UI until client-side state is set
  const displayTime = time || "--:--";

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant === 1 && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">{displayTime}</span>
          <span className="mt-1">local time</span>
        </div>
      )}

      {variant === 2 && (
        <div className="h-full w-full relative flex justify-center pt-8 md:pt-10">
          <span className="text-2xl md:text-3xl font-bold">{displayTime}</span>
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
