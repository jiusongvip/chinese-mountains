import { useEffect, useRef, useState } from "react";
import { mountains } from "../data/mountains";
import type { Mountain } from "../types/mountain";

let _L: any = null;
const CHINA_CENTER: [number, number] = [35.86, 104.19];
const DEFAULT_ZOOM = 4;
const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

function popupHTML(m: Mountain): string {
  const img = m.images[0]?.src ?? "/images/placeholder.jpg";
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
    '<a href="/mountains/' + m.slug + '" style="display:inline-block;margin-top:8px;font-size:12px;color:#059669;text-decoration:none;font-weight:500">View full guide &rarr;</a>' +
    '</div>';
}

interface Props { className?: string; }

export default function InteractiveMap({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLoaded(true); obs.disconnect(); } }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!loaded || !ref.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      if (!_L) _L = (await import("leaflet")).default || (await import("leaflet"));
      const L = _L;
      if (cancelled || !ref.current) return;

      const map = L.map(ref.current, { center: CHINA_CENTER, zoom: DEFAULT_ZOOM, zoomControl: true, scrollWheelZoom: true, attributionControl: false });
      L.tileLayer(TILE_URL, { maxZoom: 13 }).addTo(map);

      const icon = L.divIcon({ className: "mountain-marker", html: '<div class="w-3 h-3 bg-accent rounded-full border-2 border-white shadow-md ring-2 ring-accent/20"></div>', iconSize: [12, 12], iconAnchor: [6, 6] });

      mountains.forEach((m) => {
        L.marker([m.location.coordinates.lat, m.location.coordinates.lng], { icon })
          .bindPopup(popupHTML(m), { maxWidth: 240, closeButton: false })
          .bindTooltip(m.name.en, { direction: "top", offset: [0, -10] })
          .addTo(map);
      });

      mapRef.current = map;
    })();

    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [loaded]);

  return (
    <div ref={ref} className={"relative w-full h-full min-h-[400px] bg-slate-100 rounded-2xl overflow-hidden " + className}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <img src="/images/hero-map-bg.webp" alt="Topographic map of China" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-slate-400 text-sm">Loading map...</div>
          </div>
        </div>
      )}
    </div>
  );
}
