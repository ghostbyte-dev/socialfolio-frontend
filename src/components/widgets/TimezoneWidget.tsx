import { GitHubData, TimezoneData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import Link from "next/link";

interface TimezoneWidgetProps {
  data: TimezoneData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
}

export function TimezoneWidget({
  data,
  size,
  variant,
  isOwner,
  deleteWidget,
}: TimezoneWidgetProps) {

  const formattedTime = new Date().toLocaleTimeString(undefined, {
    timeZone: data.timezone,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={false}
      deleteWidget={deleteWidget}
    >
      {variant == 1 && (
        <div className="h-full w-full flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">{formattedTime}</span>
          <span className="mt-1">local time</span>
        </div>
      )}
    </BaseWidget>
  );
}
