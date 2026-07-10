"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { destinations } from "@/lib/data";

function FitBounds({ markers }: { markers: [number, number][] }) {
  const { useMap } = require("react-leaflet");
  const map = useMap();
  const L = require("leaflet");

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers);
      map.fitBounds(bounds, { padding: [60, 60] });
    }
  }, [map, markers, L]);

  return null;
}

function DestinationsOverviewMapInner() {
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");

  const markerPositions = React.useMemo(
    () => destinations.map((d) => [d.coordinates.lat, d.coordinates.lng] as [number, number]),
    []
  );

  const icon = React.useMemo(() => {
    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 28px; height: 28px;
          background: #FF8A00;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="transform: rotate(45deg); color: white; font-size: 12px; font-weight: bold;">&#9733;</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });
  }, [L]);

  const tileUrl = isDark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full" style={{ height: 500 }}>
      <MapContainer
        center={[27.05, 88.4]}
        zoom={9}
        scrollWheelZoom
        zoomControl
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        <FitBounds markers={markerPositions} />
        {destinations.map((d) => (
          <Marker key={d.id} position={[d.coordinates.lat, d.coordinates.lng]} icon={icon}>
            <Popup>
              <div className="min-w-[180px]">
                <div className="text-sm font-bold text-foreground">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.tagline}</div>
                <div className="mt-1 text-xs font-medium text-primary">{d.state}</div>
                <a
                  href={`/destinations/${d.slug}`}
                  className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                >
                  View Details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export const DestinationsOverviewMap = dynamic(() => Promise.resolve(DestinationsOverviewMapInner), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse rounded-xl bg-muted" />,
});
