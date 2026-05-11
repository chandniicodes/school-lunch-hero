import { motion } from "framer-motion";
import type { Grade } from "@/lib/vitality/types";

const map: Record<Grade, { tint: string; label: string }> = {
  "A+": { tint: "from-emerald-400 to-teal-400", label: "Whole-food excellence" },
  "A":  { tint: "from-emerald-300 to-emerald-500", label: "Highly nutritious" },
  "B":  { tint: "from-lime-300 to-emerald-400", label: "Solid choice" },
  "C":  { tint: "from-amber-300 to-yellow-400", label: "Balanced occasionally" },
  "D":  { tint: "from-orange-300 to-amber-400", label: "Eat sparingly" },
  "F":  { tint: "from-rose-300 to-orange-400", label: "Heavily processed" },
};

export function SustainabilityGrade({ grade }: { grade: Grade }) {
  const m = map[grade];
  return (
    <div className="flex items-center gap-4">
      <motion.div
        key={grade}
        initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className={`relative h-20 w-20 rounded-2xl bg-gradient-to-br ${m.tint} shadow-lg flex items-center justify-center`}
      >
        <span className="text-3xl font-bold text-white drop-shadow">{grade}</span>
      </motion.div>
      <div>
        <div className="text-xs uppercase tracking-wider text-emerald-700/70">Quality Grade</div>
        <div className="text-base font-semibold text-emerald-900">{m.label}</div>
        <div className="text-xs text-emerald-700/70 mt-0.5">Whole-food, processing & density</div>
      </div>
    </div>
  );
}
