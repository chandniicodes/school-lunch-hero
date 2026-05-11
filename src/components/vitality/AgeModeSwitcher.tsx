import { motion } from "framer-motion";
import type { AgeMode } from "@/lib/vitality/types";

const MODES: AgeMode[] = ["Kid", "Teen", "Adult"];

export function AgeModeSwitcher({ value, onChange }: { value: AgeMode; onChange: (m: AgeMode) => void }) {
  return (
    <div className="inline-flex p-1 rounded-full bg-emerald-100/70 border border-emerald-200 relative">
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full transition ${
            value === m ? "text-white" : "text-emerald-800/70 hover:text-emerald-900"
          }`}
        >
          {value === m && (
            <motion.span
              layoutId="age-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative">{m} Mode</span>
        </button>
      ))}
    </div>
  );
}
