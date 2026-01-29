import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import { WidgetService } from "@/services/widget.service";
import type { WidgetApiData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import type { ApodApiData, WeatherApiData } from "./MastodonWidget";

interface ApodWidgetProps {
  id: string;
  data: null;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  preview?: boolean;
}

export function ApodWidget({
  id,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
  preview = false,
}: ApodWidgetProps) {
  const { data: apiData } = useQuery<ApodApiData>({
    queryKey: ["apodWidget", id],
    queryFn: () => WidgetService.getWidgetData(id) as Promise<ApodApiData>,
    enabled: id !== "",
  });

  const widgetApiData: ApodApiData | undefined = preview
    ? {
        url: "https://apod.nasa.gov/apod/image/0907/corona_vangorp.jpg",
      }
    : apiData;

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
      link="https://apod.nasa.gov/apod/"
    >
      <div className="h-full w-full flex justify-center items-center relative">
        {widgetApiData && (
          <Image
            src={widgetApiData.url}
            alt={"apod image"}
            fill
            className="object-cover"
          />
        )}
      </div>
    </BaseWidget>
  );
}
