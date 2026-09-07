import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { mountains } from "../data/mountains";
import type { Mountain } from "../types/mountain";
import { thumb } from "../utils/thumb";
import "leaflet/dist/leaflet.css";

const CHINA_CENTER: [number, number] = [35.86, 104.19];
const DEFAULT_ZOOM = 4;
const TILE_URL = "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
function popupHTML(m: Mountain): string {
  const img = thumb(m.images[0]?.src, 640);
  const alt = m.images[0]?.alt ?? m.name.en;
  const el = m.physical.elevation.toLocaleString();
  return '<div style="font-family:system-ui,sans-serif;min-width:180px">' +
    '<img src="' + img + '" alt="' + alt + '" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px" />' +
    '<div style="font-weight:600;font-size:14px;color:#0f172a">' + m.name.en + '</div>' +
    '<div style="font-size:12px;color:#64748b;margin-top:2px">' + m.name.zh + ' ' + m.location.province + '</div>' +
    '<div style="display:flex;gap:6px;margin-top:6px">' +
    '<span style="font-size:11px;padding:2px 6px;border-radius:999px;background:#f1f5f9;color:#475569">' + el + 'm</span>' +
    '<span style="font-size:11px;padding:2px 6px;border-radius:999px;background:#ecfdf5;color:#059669">' + m.rating.overall + '/5</span>' +
    '</div>' +
    '<a href="/mountains/' + m.slug + '/" style="display:inline-block;margin-top:8px;font-size:12px;color:#059669;text-decoration:none;font-weight:500">View full guide &rarr;</a>' +
    '</div>';
}

interface Props { className?: string; }

export default function InteractiveMap({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    let cancelled = false;

    if (cancelled || !ref.current) return;

    const map = L.map(ref.current, { center: CHINA_CENTER, zoom: DEFAULT_ZOOM, zoomControl: true, scrollWheelZoom: true, attributionControl: false });
    const tiles = L.tileLayer(TILE_URL, { maxZoom: 13 });
    tiles.on("tileerror", () => setTileError(true));
    tiles.on("tileload", (e: any) => {
      if (e.tile && e.tile instanceof HTMLImageElement && !e.tile.getAttribute("alt")) {
        e.tile.alt = "Map tile of China with mountain locations";
      }
    });
    tiles.addTo(map);

    const icon = L.divIcon({
      className: "mountain-marker",
      html: '<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer"><div class="w-3 h-3 bg-accent rounded-full border-2 border-white shadow-md ring-2 ring-accent/20"></div></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    mountains.forEach((m) => {
      const mk = L.marker([m.location.coordinates.lat, m.location.coordinates.lng], { icon })
        .bindPopup(popupHTML(m), { maxWidth: 240, closeButton: false })
        .bindTooltip(m.name.en, { direction: "top", offset: [0, -10] })
        .addTo(map);
      if ((mk as any)._icon) {
        (mk as any)._icon.setAttribute("role", "button");
        (mk as any)._icon.setAttribute("aria-label", "Open guide for " + m.name.en);
      }
    });

    mapRef.current = map;
    document.querySelectorAll("[data-map-placeholder]").forEach((el) => ((el as HTMLElement).style.display = "none"));

    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, []);

  return (
    <div ref={ref} className={"absolute inset-0 " + className}>
      {tileError && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-slate-600 text-xs px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
          Map tiles unavailable — <a href="/explore/" className="text-accent font-medium hover:underline">browse the list instead</a>
        </div>
      )}
    </div>
  );
}
