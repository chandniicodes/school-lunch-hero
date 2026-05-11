import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function VitalityScore({ score }: { score: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;

  return (
    <div className="flex items-center gap-5">
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} stroke="#d1fae5" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            stroke="url(#vit)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
          <defs>
            <linearGradient id="vit" x1="0" x2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-emerald-900">{v}</span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-700/70">/ 100</span>
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-emerald-700/70">Daily Vitality</div>
        <div className="text-lg font-semibold text-emerald-900">
          {score >= 80 ? "Thriving" : score >= 60 ? "Balanced" : score >= 40 ? "Steady" : "Needs care"}
        </div>
        <div className="text-xs text-emerald-700/80 mt-1">Updated from your latest meal</div>
      </div>
    </div>
  );
}
