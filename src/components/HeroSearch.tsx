import { useState, useEffect, useRef } from "react";
import { mountains } from "../data/mountains";
import type { Mountain } from "../types/mountain";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Mountain[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const q = query.toLowerCase();
    const hits = mountains.filter(m =>
      m.name.en.toLowerCase().includes(q) ||
      m.name.zh.includes(query) ||
      (m.name.alt && m.name.alt.toLowerCase().includes(q)) ||
      m.location.province.toLowerCase().includes(q)
    ).slice(0, 6);
    setResults(hits);
    setOpen(hits.length > 0);
    setSelected(-1);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected(s => Math.max(s - 1, -1)); }
    else if (e.key === "Enter" && selected >= 0 && results[selected]) {
      window.location.href = "/mountains/" + results[selected].slug + "/";
    }
    else if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
  }

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder="Search a mountain..."
          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-shadow shadow-sm"
          aria-label="Search mountains"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 cursor-pointer" aria-label="Clear search">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {results.map((m, i) => (
            <a
              key={m.id}
              href={"/mountains/" + m.slug}
              className={"flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors no-underline " + (i === selected ? "bg-accent-50" : "")}
              onMouseEnter={() => setSelected(i)}
            >
              <img src={m.images[0]?.src ?? "/images/placeholder.jpg"} alt={m.name.en} className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-100" />
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm text-slate-900 truncate">{m.name.en}</div>
                <div className="text-xs text-slate-400 truncate">{m.name.zh} &middot; {m.location.province} &middot; {m.physical.elevation.toLocaleString()}m</div>
              </div>
              <span className="text-xs font-semibold text-accent shrink-0">{m.rating.overall}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
