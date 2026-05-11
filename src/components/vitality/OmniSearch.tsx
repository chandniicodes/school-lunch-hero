import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DietTag, NutritionItem } from "@/lib/vitality/types";
import { searchFoods } from "@/lib/vitality/api";

type Props = {
  diets: DietTag[];
  onSelect: (item: NutritionItem) => void;
};

export function OmniSearch({ diets, onSelect }: Props) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(async () => {
      const r = await searchFoods(q, diets);
      setResults(r);
      setLoading(false);
    }, 180);
    return () => clearTimeout(id);
  }, [q, diets]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur border border-emerald-100 shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-300 transition">
        <Search className="h-5 w-5 text-emerald-600" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
            else if (e.key === "Enter" && results[active]) { onSelect(results[active]); setOpen(false); }
            else if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search any meal, ingredient or nutrient…"
          className="flex-1 bg-transparent outline-none text-emerald-900 placeholder:text-emerald-700/40"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-30 mt-2 w-full rounded-2xl bg-white/95 backdrop-blur border border-emerald-100 shadow-xl overflow-hidden"
          >
            {loading ? (
              <div className="p-3 space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-12 rounded-xl bg-emerald-50 animate-pulse" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="p-6 text-sm text-emerald-700/70 text-center">No matches. Try "oat" or "salmon".</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto py-1">
                {results.map((r, i) => (
                  <li
                    key={r.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => { onSelect(r); setOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition ${i === active ? "bg-emerald-50" : ""}`}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-emerald-900 truncate">{r.name}</div>
                      <div className="text-xs text-emerald-700/70">{r.calories} kcal · {r.protein}g protein</div>
                    </div>
                    <div className="flex gap-1">
                      {r.diet.slice(0, 2).map((d) => (
                        <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{d}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
