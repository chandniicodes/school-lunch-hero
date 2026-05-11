import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Ingredient } from "@/lib/vitality/types";

const areaTint: Record<string, string> = {
  immunity: "bg-rose-100 text-rose-700",
  digestion: "bg-amber-100 text-amber-700",
  skin: "bg-pink-100 text-pink-700",
  energy: "bg-orange-100 text-orange-700",
  recovery: "bg-emerald-100 text-emerald-700",
  focus: "bg-sky-100 text-sky-700",
};

export function IngredientLab({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80">Ingredient Lab</h3>
      </div>
      <div className="space-y-2.5">
        {ingredients.slice(0, 3).map((ing, i) => (
          <motion.div
            key={ing.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl bg-white/70 border border-emerald-100 p-3 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-emerald-900">{ing.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${areaTint[ing.area]}`}>
                {ing.area}
              </span>
            </div>
            <p className="text-xs text-emerald-800/80 leading-relaxed">{ing.benefit}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
