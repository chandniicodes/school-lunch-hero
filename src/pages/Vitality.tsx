import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Activity, Apple, Calendar, Sparkles } from "lucide-react";
import type { AgeMode, DietTag, NutritionItem } from "@/lib/vitality/types";
import { MOCK_FOODS } from "@/lib/vitality/mockData";
import { computeGrade, computeVitalityScore } from "@/lib/vitality/api";
import { OmniSearch } from "@/components/vitality/OmniSearch";
import { DigitalPlate } from "@/components/vitality/DigitalPlate";
import { VitalityScore } from "@/components/vitality/VitalityScore";
import { IngredientLab } from "@/components/vitality/IngredientLab";
import { SustainabilityGrade } from "@/components/vitality/SustainabilityGrade";
import { DietToggles } from "@/components/vitality/DietToggles";
import { AgeModeSwitcher } from "@/components/vitality/AgeModeSwitcher";
import { AIInsights } from "@/components/vitality/AIInsights";
import { HydrationCard } from "@/components/vitality/HydrationCard";

const cardBase =
  "rounded-3xl bg-white/70 backdrop-blur-xl border border-emerald-100 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.25)] p-6";

export default function Vitality() {
  const [diets, setDiets] = useState<DietTag[]>([]);
  const [age, setAge] = useState<AgeMode>("Teen");
  const [selected, setSelected] = useState<NutritionItem>(MOCK_FOODS[0]);
  const [history, setHistory] = useState<NutritionItem[]>([MOCK_FOODS[0]]);

  const score = useMemo(() => computeVitalityScore(selected), [selected]);
  const grade = useMemo(() => computeGrade(score), [score]);

  const tone = age === "Kid" ? "playful" : age === "Teen" ? "bold" : "refined";
  const headline =
    age === "Kid"
      ? "Hi explorer! Let's build a power plate 🍎"
      : age === "Teen"
      ? "Fuel your day with smart nutrition"
      : "Your daily vitality, beautifully measured";

  const onSelect = (f: NutritionItem) => {
    setSelected(f);
    setHistory((h) => [f, ...h.filter((x) => x.id !== f.id)].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-[#fafaf5] to-teal-50">
      {/* floating gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-teal-200/40 blur-3xl"
        />
      </div>

      <div className="container max-w-7xl py-8 md:py-12 space-y-6" style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif" }}>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" /> Vitality Dashboard
            </div>
            <motion.h1
              key={headline}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950 tracking-tight"
            >
              {headline}
            </motion.h1>
          </div>
          <AgeModeSwitcher value={age} onChange={setAge} />
        </div>

        {/* Search */}
        <OmniSearch diets={diets} onSelect={onSelect} />

        {/* Diet toggles */}
        <DietToggles value={diets} onChange={setDiets} />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Hero plate */}
          <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardBase} md:col-span-3 md:row-span-2 flex flex-col items-center justify-center text-center`}
          >
            <div className="text-xs uppercase tracking-wider text-emerald-700/70">Now exploring</div>
            <div className="mt-1 text-2xl font-bold text-emerald-950 flex items-center gap-2">
              <span className="text-3xl">{selected.emoji}</span> {selected.name}
            </div>
            <div className="mt-1 text-sm text-emerald-700/80">{selected.calories} kcal · grade {grade}</div>
            <div className="mt-5">
              <DigitalPlate protein={selected.protein} carbs={selected.carbs} fats={selected.fats} />
            </div>
          </motion.div>

          {/* Vitality score */}
          <motion.div layout className={`${cardBase} md:col-span-3`}>
            <VitalityScore score={score} />
          </motion.div>

          {/* Grade */}
          <motion.div layout className={`${cardBase} md:col-span-3`}>
            <SustainabilityGrade grade={grade} />
          </motion.div>

          {/* Ingredient Lab */}
          <motion.div layout className={`${cardBase} md:col-span-3`}>
            <IngredientLab ingredients={selected.ingredients} />
          </motion.div>

          {/* AI Insights */}
          <motion.div layout className={`${cardBase} md:col-span-3`}>
            <AIInsights insights={selected.insights} />
          </motion.div>

          {/* Hydration */}
          <motion.div layout className={`${cardBase} md:col-span-2`}>
            <HydrationCard />
          </motion.div>

          {/* Macro nutrients quick stats */}
          <motion.div layout className={`${cardBase} md:col-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80">Nutrients</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { l: "Protein", v: `${selected.protein}g` },
                { l: "Carbs", v: `${selected.carbs}g` },
                { l: "Fats", v: `${selected.fats}g` },
                { l: "Fiber", v: `${selected.fiber}g` },
              ].map((n) => (
                <div key={n.l} className="rounded-xl bg-emerald-50/70 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-emerald-700/70">{n.l}</div>
                  <div className="text-lg font-bold text-emerald-950">{n.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Meal history */}
          <motion.div layout className={`${cardBase} md:col-span-2`}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80">Recent meals</h3>
            </div>
            <AnimatePresence initial={false}>
              {history.length === 0 ? (
                <div className="text-xs text-emerald-700/60 flex items-center gap-2 py-4">
                  <Apple className="h-4 w-4" /> Search to log your first meal
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {history.map((h) => (
                    <motion.li
                      key={h.id}
                      layout
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelected(h)}
                      className="flex items-center gap-2 text-sm rounded-xl px-2 py-1.5 hover:bg-emerald-50 cursor-pointer"
                    >
                      <span className="text-lg">{h.emoji}</span>
                      <span className="flex-1 truncate text-emerald-900">{h.name}</span>
                      <span className="text-xs text-emerald-700/70">{h.calories} kcal</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="text-xs text-emerald-700/60 text-center pt-2">
          {tone === "playful"
            ? "Tip: green plates make happy tummies! 🌱"
            : tone === "bold"
            ? "Pro tip: pair protein with fiber for steady energy."
            : "Curated insights powered by mock AI · ready for live data."}
        </p>
      </div>
    </div>
  );
}
