import { CountryWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { getCountryCode, getCountryData, ICountryData } from "countries-list";

interface CountryWidgetProps {
  data: CountryWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function CountryWidget({
  data,
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: CountryWidgetProps) {
  const countryCode = getCountryCode(data.countryName).toString().toLowerCase()
  const backgroundImageUrl = `/widgets/country/1x1/${countryCode}.svg`;
  return (
    <BaseWidget
      isOwner={isOwner}
      isClickable={false}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant == 1 && (
        <div
          className="h-full w-full flex justify-center items-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
        </div>
      )}
    </BaseWidget>
  );
}
