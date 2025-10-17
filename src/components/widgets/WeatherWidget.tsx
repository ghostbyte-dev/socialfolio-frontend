import type { WeatherWidgetData, WidgetApiData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { useQuery } from "@tanstack/react-query";
import type { WeatherApiData } from "./MastodonWidget";
import { WidgetService } from "@/services/widget.service";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

interface WeatherWidgetProps {
  id: string;
  data: WeatherWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
  preview?: boolean;
}

export function WeatherWidget({
  id,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
  preview = false,
}: WeatherWidgetProps) {
  const { data: apiData } = useQuery<WeatherApiData>({
    queryKey: ["mastodonWidgetData", id],
    queryFn: () => WidgetService.getWidgetData(id) as Promise<WeatherApiData>,
    enabled: id !== "",
  });

  const widgetApiData: WidgetApiData | undefined = preview
    ? {
        elevation: 0,
        current: {
          weatherCode: 0,
          temperature: "30°C",
        },
        isDay: true,
      }
    : apiData;

  const iconFolder = widgetApiData?.isDay ? "day" : "night";

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant === 1 && (
        <div className="h-full w-full flex justify-center items-center">
          {widgetApiData && (
            <img
              src={`widgets/weather/${iconFolder}/${getWeatherIcon(
                widgetApiData.current.weatherCode
              )}.svg`}
              alt={getWeatherIcon(widgetApiData.current.weatherCode)}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      )}
      {variant === 2 && (
        <div className="h-full w-full flex flex-col justify-center items-center py-5">
          {widgetApiData && (
            <>
              <img
                src={`widgets/weather/${iconFolder}/${getWeatherIcon(
                  widgetApiData.current.weatherCode
                )}.svg`}
                alt={getWeatherIcon(widgetApiData.current.weatherCode)}
                className="w-full h-full object-contain"
              />
              <p className="text-xl font-bold">
                {widgetApiData.current.temperature}
              </p>
            </>
          )}
        </div>
      )}
    </BaseWidget>
  );
}
