import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

export default function MyMap(props: any) {
  const { position, zoom, light } = props;
  const markerIcon = new Icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
  return (
    <MapContainer
      center={position}
      zoom={zoom ?? 4}
      className="w-full h-full relative"
      zoomControl={false}
    >
      {light ? (
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
      ) : (
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        />
      )}

      <Marker position={position} icon={markerIcon}></Marker>
    </MapContainer>
  );
}
