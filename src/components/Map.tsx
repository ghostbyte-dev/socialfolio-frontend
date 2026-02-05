"use client";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MyMap(props: any) {
  const { position, zoom, light } = props;
  /*const markerIcon = new Icon({
    iconUrl: "/icons/marker.svg",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });*/

  return (
    <Map
      reuseMaps
      mapboxAccessToken="pk.eyJ1IjoiZ2hvc3RieXRlZGV2IiwiYSI6ImNtbDhuc3htejAyeWozY3NqODBucjZiZHMifQ.b0K9z_-Vg95ws47A452HnQ"
      initialViewState={{
        longitude: position.lon,
        latitude: position.lat,
        zoom: zoom,
      }}
      mapStyle="mapbox://styles/ghostbytedev/cml8py2h6005n01sj9cn7hes5"
      config={{
        basemap: {
          lightPreset: light ? "day" : "dusk",
        },
      }}
    >
      <Marker longitude={position.lon} latitude={position.lat}>
        <div className="relative flex h-6 w-6">
          <span className="absolute inline-flex h-full w-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex h-6 w-6 rounded-full bg-blue-600 border-3 border-white"></span>
        </div>{" "}
      </Marker>
    </Map>
  );

  /*return (
    <MapContainer
      center={position}
      zoom={zoom ?? 4}
      className="w-full h-full relative z-0"
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
  );*/
}
