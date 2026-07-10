"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

interface NearbyPlace {
  name: string;
  lat: number;
  lng: number;
  type: "Attraction" | "Restaurant" | "Viewpoint";
}

interface DestinationMapProps {
  lat: number;
  lng: number;
  name: string;
  nearbyPlaces?: NearbyPlace[];
}

function DestinationMapInner({ lat, lng, name, nearbyPlaces = [] }: DestinationMapProps) {
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  const destinationIcon = useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 32px; height: 32px;
          background: #0B5D3B;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="transform: rotate(45deg); color: white; font-size: 14px;">&#9733;</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, [L]);

  const getNearbyIcon = (type: NearbyPlace["type"]) => {
    const color = type === "Attraction" ? "#3B82F6" : type === "Restaurant" ? "#F97316" : "#22C55E";
    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 20px; height: 20px;
          background: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    });
  };

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full" style={{ height: 400 }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom
        zoomControl
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        <Marker position={[lat, lng]} icon={destinationIcon}>
          <Popup>
            <div className="text-sm font-semibold text-foreground">{name}</div>
            <a
              href={`/destinations/${name.toLowerCase().replace(/\s+/g, "-")}`}
              className="mt-1 inline-block text-xs text-primary hover:underline"
            >
              View Details
            </a>
          </Popup>
        </Marker>
        {nearbyPlaces.map((place, idx) => (
          <Marker key={idx} position={[place.lat, place.lng]} icon={getNearbyIcon(place.type)}>
            <Popup>
              <div className="text-sm font-medium text-foreground">{place.name}</div>
              <div className="text-xs text-muted-foreground">{place.type}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export const DestinationMap = dynamic(() => Promise.resolve(DestinationMapInner), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-xl bg-muted" />,
});
