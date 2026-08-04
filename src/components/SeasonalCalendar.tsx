import { useState } from "react";
import { mountains, allMonths } from "../data/mountains";

const monthSeasons: Record<string, string[]> = {
  January: ["December","January","February"],
  February: ["December","January","February"],
  March: ["March","April","May"],
  April: ["March","April","May"],
  May: ["March","April","May"],
  June: ["June","July","August"],
  July: ["June","July","August"],
  August: ["June","July","August"],
  September: ["September","October","November"],
  October: ["September","October","November"],
  November: ["September","October","November"],
  December: ["December","January","February"],
};

export default function SeasonalCalendar() {
  const [activeMonth, setActiveMonth] = useState("October");

  const relevantSeasons = monthSeasons[activeMonth] || [];
  const monthMountains = mountains
    .filter((m) => m.tourism.bestSeason.some((s) => relevantSeasons.includes(s)))
    .sort((a, b) => b.rating.overall - a.rating.overall)
    .slice(0, 3);

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
        {allMonths.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMonth(m)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeMonth === m
                ? "bg-accent text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {monthMountains.map((m) => (
          <a
            key={m.id}
            href={`/mountains/${m.slug}`}
            className="block rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all no-underline group"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={m.images[0]?.src}
                alt={m.images[0]?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm text-slate-900">{m.name.en}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {m.location.province} · {m.physical.elevation.toLocaleString()}m
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
