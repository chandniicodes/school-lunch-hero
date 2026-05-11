import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { protein: number; carbs: number; fats: number };

export function DigitalPlate({ protein, carbs, fats }: Props) {
  const total = Math.max(1, protein + carbs + fats);
  const segs = [
    { label: "Protein", val: protein, color: "#10b981", from: 0 },
    { label: "Carbs", val: carbs, color: "#34d399", from: 0 },
    { label: "Fats", val: fats, color: "#a7f3d0", from: 0 },
  ];
  let acc = 0;
  for (const s of segs) {
    s.from = acc;
    acc += (s.val / total) * 360;
  }
  const [hover, setHover] = useState<string | null>(null);

  const C = 50;
  const R = 42;
  const r = 26;

  const arc = (start: number, end: number) => {
    const s = (start - 90) * (Math.PI / 180);
    const e = (end - 90) * (Math.PI / 180);
    const large = end - start > 180 ? 1 : 0;
    const x1 = C + R * Math.cos(s), y1 = C + R * Math.sin(s);
    const x2 = C + R * Math.cos(e), y2 = C + R * Math.sin(e);
    const x3 = C + r * Math.cos(e), y3 = C + r * Math.sin(e);
    const x4 = C + r * Math.cos(s), y4 = C + r * Math.sin(s);
    return `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r},${r} 0 ${large} 0 ${x4},${y4} Z`;
  };

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full blur-2xl bg-emerald-300/40" />
        <svg viewBox="0 0 100 100" className="relative w-56 h-56 drop-shadow-xl">
          <circle cx={C} cy={C} r={R + 3} fill="white" />
          {segs.map((s, i) => {
            const start = s.from;
            const end = s.from + (s.val / total) * 360;
            return (
              <motion.path
                key={s.label}
                d={arc(start, Math.max(start + 0.01, end))}
                fill={s.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: hover && hover !== s.label ? 0.96 : 1 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 140 }}
                onMouseEnter={() => setHover(s.label)}
                onMouseLeave={() => setHover(null)}
                style={{ transformOrigin: "50% 50%", cursor: "pointer" }}
              />
            );
          })}
          <circle cx={C} cy={C} r={r - 2} fill="white" />
          <text x="50" y="48" textAnchor="middle" className="fill-emerald-900" style={{ fontSize: 7, fontWeight: 700 }}>
            {hover ?? "Macros"}
          </text>
          <text x="50" y="58" textAnchor="middle" className="fill-emerald-700" style={{ fontSize: 6 }}>
            {hover ? `${segs.find((x) => x.label === hover)?.val}g` : `${Math.round(total)}g`}
          </text>
        </svg>
      </motion.div>
      <div className="mt-4 flex gap-3 text-xs">
        {segs.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-emerald-900/80">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
