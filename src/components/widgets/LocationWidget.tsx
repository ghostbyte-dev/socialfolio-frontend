import { LocationWidgetData } from "@/types/widget-types";
import { BaseWidget } from "./BaseWidget";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import L, { Icon, marker } from "leaflet";

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
  size,
  isOwner,
  variant,
  deleteWidget,
  editWidget,
}: LocationWidgetProps) {
  const mapRef = useRef(null);
  const markerIcon = new Icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  if (!data.lat || !data.lon) {
    return (
      <BaseWidget
        isOwner={isOwner}
        isClickable={false}
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
      isClickable={false}
      deleteWidget={deleteWidget}
      editWidget={editWidget}
    >
      {variant == 1 && (
        <div className="flex justify-center items-center relative h-full w-full z-0">
          <MapContainer
            center={[Number(data.lat), Number(data.lon)]}
            zoom={data.zoom ?? 4}
            ref={mapRef}
            className="w-full h-full relative"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />
            <Marker
              position={[Number(data.lat), Number(data.lon)]}
              icon={markerIcon}
            >
            </Marker>
          </MapContainer>
        </div>
      )}
      {variant == 2 && (
        <div className="flex justify-center items-center relative h-full w-full z-0">
          <MapContainer
            center={[Number(data.lat), Number(data.lon)]}
            zoom={data.zoom ?? 4}
            ref={mapRef}
            className="w-full h-full relative"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            />
            <Marker
              position={[Number(data.lat), Number(data.lon)]}
              icon={markerIcon}
            >
            </Marker>
          </MapContainer>
        </div>
      )}
    </BaseWidget>
  );
}
