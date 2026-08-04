import { useState } from "react";
import { recommendMountains, mountains } from "../data/mountains";

type Step = "season" | "preference" | "difficulty" | "results";

const seasons = [
  { id: "spring", label: "Spring", months: "Mar \u2013 May" },
  { id: "summer", label: "Summer", months: "Jun \u2013 Aug" },
  { id: "autumn", label: "Autumn", months: "Sep \u2013 Nov" },
  { id: "winter", label: "Winter", months: "Dec \u2013 Feb" },
];

const preferences = [
  { id: "scenery", label: "Scenery", desc: "I want breathtaking views" },
  { id: "culture", label: "Culture", desc: "I want temples and history" },
  { id: "hiking", label: "Hiking", desc: "I want epic trails" },
];

const difficulties = [
  { id: "easy", label: "Relaxed", desc: "Cable cars and gentle walks" },
  { id: "moderate", label: "Moderate", desc: "Some steps but doable" },
  { id: "hard", label: "Challenging", desc: "Bring your best boots" },
];

const seasonToMonths: Record<string, string[]> = {
  spring: ["March", "April", "May"],
  summer: ["June", "July", "August"],
  autumn: ["September", "October", "November"],
  winter: ["December", "January", "February"],
};

const SHARED_BUTTON =
  "p-4 rounded-xl border border-slate-200 hover:border-accent hover:bg-accent-50 transition-all text-left cursor-pointer";

export default function MountainQuiz() {
  const [step, setStep] = useState<Step>("season");
  const [season, setSeason] = useState("");
  const [preference, setPreference] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [results, setResults] = useState<typeof mountains>([]);

  function handleSeason(s: string) {
    setSeason(s);
    setStep("preference");
  }
  function handlePreference(p: string) {
    setPreference(p);
    setStep("difficulty");
  }
  function handleDifficulty(d: string) {
    setDifficulty(d);
    const months = seasonToMonths[season] || [];
    const r = recommendMountains(months[0] || "April", preference || d, d);
    setResults(r);
    setStep("results");
  }
  function reset() {
    setStep("season");
    setSeason("");
    setPreference("");
    setDifficulty("");
    setResults([]);
  }

  const stepOrder: Step[] = ["season", "preference", "difficulty"];
  const currentIdx = stepOrder.indexOf(step === "results" ? "difficulty" : step);

  if (step === "results") {
    return (
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your perfect matches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((m) => (
            <a
              key={m.id}
              href={`/mountains/${m.slug}`}
              className="block rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all no-underline group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={m.images[0]?.src}
                  alt={m.images[0]?.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900">{m.name.en}</h4>
                <p className="text-sm text-slate-500 mt-1">{m.tagline}</p>
                <div className="flex gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {m.physical.elevation.toLocaleString()}m
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    {m.rating.overall}/5
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <button onClick={reset} className="mt-6 text-sm text-accent hover:underline cursor-pointer">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-6">
        {stepOrder.map((s, i) => (
          <div className="flex items-center gap-2" key={s}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                i <= currentIdx ? "bg-accent text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="w-6 h-0.5 bg-slate-200" />}
          </div>
        ))}
      </div>

      {/* Step: Season */}
      {step === "season" && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">When are you going?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {seasons.map((s) => (
              <button key={s.id} onClick={() => handleSeason(s.id)} className={SHARED_BUTTON}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-medium text-sm text-slate-900">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.months}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Preference */}
      {step === "preference" && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">What matters most to you?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {preferences.map((p) => (
              <button key={p.id} onClick={() => handlePreference(p.id)} className={SHARED_BUTTON}>
                <div className="font-medium text-sm text-slate-900">{p.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Difficulty */}
      {step === "difficulty" && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">How challenging do you want it?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {difficulties.map((d) => (
              <button key={d.id} onClick={() => handleDifficulty(d.id)} className={SHARED_BUTTON}>
                <div className="font-medium text-sm text-slate-900">{d.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
