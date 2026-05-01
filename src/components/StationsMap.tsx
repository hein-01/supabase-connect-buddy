import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Station } from "@/data/mock";
import { Zap } from "lucide-react";

// Fix default marker icon paths in bundlers
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -36],
});
L.Marker.prototype.options.icon = DefaultIcon;

function FitBounds({ stations }: { stations: Station[] }) {
  const map = useMap();
  useEffect(() => {
    if (stations.length === 0) return;
    const bounds = L.latLngBounds(stations.map((s) => [s.lat, s.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [stations, map]);
  return null;
}

export function StationsMap({ stations }: { stations: Station[] }) {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <MapContainer
        center={[19.7, 96.1]}
        zoom={6}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds stations={stations} />
        {stations.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]}>
            <Popup>
              <div className="min-w-[180px]">
                <div className="font-display text-base font-bold">{s.name}</div>
                <div className="mt-0.5 text-xs text-gray-600">{s.city}</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Zap className="h-3 w-3" /> {s.maxKw} kW
                  </span>
                  <span>{s.pricePerKwh} MMK/kWh</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className={s.available > 0 ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold"}>
                    {s.available > 0 ? `${s.available}/${s.total} available` : "All busy"}
                  </span>
                  {" · "}
                  <span className="text-gray-600">{s.hours}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}