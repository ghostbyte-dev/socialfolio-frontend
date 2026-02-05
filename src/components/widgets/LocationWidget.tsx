import { useMemo, useRef } from "react";
import type { LocationWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

interface LocationWidgetProps {
  data: LocationWidgetData;
  size: { cols: number; rows: number };
  variant: number;
  isOwner: boolean;
  deleteWidget: () => void;
  editWidget: () => void;
}

export function LocationWidget({
  data,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LocationWidgetProps) {
  const mapRef = useRef(null);

  const MyMapDynamic = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  if (!data.lat || !data.lon) {
    return (
      <BaseWidget
        isOwner={isOwner}
        deleteWidget={deleteWidget}
        editWidget={editWidget}
      >
        <></>
      </BaseWidget>
    );
  }

  return (
    <BaseWidget
      isOwner={isOwner}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant === 1 && (
        <MyMapDynamic
          position={{ lon: data.lon, lat: data.lat }}
          zoom={data.zoom}
          light={true}
        />
      )}
      {variant === 2 && (
        <MyMapDynamic
          position={{ lon: data.lon, lat: data.lat }}
          zoom={data.zoom}
          light={false}
        />
      )}
    </BaseWidget>
  );
}
