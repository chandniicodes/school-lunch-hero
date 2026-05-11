import { motion } from "framer-motion";
import { Droplets, Flame, Plus, Minus } from "lucide-react";
import { useState } from "react";

export function HydrationCard() {
  const [glasses, setGlasses] = useState(4);
  const goal = 8;
  const pct = Math.min(100, (glasses / goal) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-sky-500" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80">Hydration</h3>
        </div>
        <div className="text-xs text-emerald-700/80">{glasses} / {goal} glasses</div>
      </div>
      <div className="relative h-3 rounded-full bg-emerald-100 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 to-cyan-300"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => setGlasses((g) => Math.max(0, g - 1))} className="h-8 w-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center hover:bg-emerald-50">
          <Minus className="h-3.5 w-3.5 text-emerald-700" />
        </button>
        <button onClick={() => setGlasses((g) => Math.min(goal, g + 1))} className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shadow">
          <Plus className="h-3.5 w-3.5" />
        </button>
        <div className="ml-auto flex items-center gap-1 text-xs text-orange-600 font-medium">
          <Flame className="h-3.5 w-3.5" /> 7-day streak
        </div>
      </div>
    </div>
  );
}
