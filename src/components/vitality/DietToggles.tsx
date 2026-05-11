import { motion } from "framer-motion";
import type { DietTag } from "@/lib/vitality/types";

const ALL: DietTag[] = ["Veg", "Non-Veg", "Vegan", "Jain"];

export function DietToggles({ value, onChange }: { value: DietTag[]; onChange: (v: DietTag[]) => void }) {
  const toggle = (d: DietTag) =>
    onChange(value.includes(d) ? value.filter((x) => x !== d) : [...value, d]);

  return (
    <div className="flex flex-wrap gap-2">
      {ALL.map((d) => {
        const on = value.includes(d);
        return (
          <motion.button
            key={d}
            onClick={() => toggle(d)}
            whileTap={{ scale: 0.94 }}
            whileHover={{ y: -2 }}
            className={`relative px-4 py-2 rounded-full text-sm font-medium border transition ${
              on
                ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200"
                : "bg-white/70 text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {d}
          </motion.button>
        );
      })}
    </div>
  );
}
