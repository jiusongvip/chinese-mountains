import { useEffect, useState } from "react";
import type { PackingItem } from "../../types/mountain";

interface Props {
  items: PackingItem[];
  storageKey: string;
}

export default function PackingChecklist({ items, storageKey }: Props) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as boolean[];
        if (parsed.length === items.length) setChecked(parsed);
      }
    } catch {
      /* ignore storage errors */
    }
  }, [storageKey, items.length]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      /* ignore storage errors */
    }
  }, [checked, storageKey]);

  const done = checked.filter(Boolean).length;
  const allDone = done === items.length && items.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="font-bold text-slate-900">Packing checklist</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{done}/{items.length} packed</span>
          <button
            onClick={() => setChecked(items.map(() => false))}
            className="text-xs font-medium text-accent hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item, i) => (
          <li key={item.item}>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                className="mt-0.5 w-4 h-4 accent-accent shrink-0 cursor-pointer"
              />
              <span className="text-sm leading-relaxed">
                <span className={`font-medium ${checked[i] ? "text-slate-400 line-through" : "text-slate-800"}`}>{item.item}</span>
                <span className="block text-xs text-slate-400 mt-0.5">{item.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      {allDone && <p className="mt-4 text-sm font-medium text-accent">All packed — have a great trip.</p>}
    </div>
  );
}
