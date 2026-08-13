import { useState } from "react";
import type { Itinerary } from "../../types/mountain";

interface Props {
  itineraries: Itinerary[];
}

export default function ItineraryPlanner({ itineraries }: Props) {
  const sorted = [...itineraries].sort((a, b) => a.days - b.days);
  const [active, setActive] = useState(0);
  const plan = sorted[active];

  return (
    <div>
      <div className="flex gap-2">
        {sorted.map((it, i) => (
          <button
            key={it.days}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              i === active
                ? "bg-accent text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-accent"
            }`}
          >
            {it.days} {it.days === 1 ? "day" : "days"}
          </button>
        ))}
      </div>

      <div className="mt-5 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h3 className="text-lg font-bold tracking-tighter text-slate-900">{plan.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">{plan.suitable}</span>
        </div>

        <ol className="mt-6 space-y-0">
          {plan.steps.map((step, i) => (
            <li key={step.title} className="relative pl-8 pb-6 last:pb-0">
              {i < plan.steps.length - 1 && (
                <span className="absolute left-[9px] top-6 bottom-0 w-px bg-slate-200" aria-hidden="true" />
              )}
              <span
                className={`absolute left-0 top-1.5 w-[19px] h-[19px] rounded-full border-2 flex items-center justify-center ${
                  i === 0 ? "bg-accent border-accent" : "bg-white border-slate-300"
                }`}
                aria-hidden="true"
              >
                {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wide whitespace-nowrap">{step.time}</span>
                <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
                <span className="text-xs text-slate-400 whitespace-nowrap">{step.duration}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>

        <p className="mt-5 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-900">Editor's note: </span>{plan.note}
        </p>
      </div>
    </div>
  );
}
