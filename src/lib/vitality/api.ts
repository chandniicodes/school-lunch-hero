import { MOCK_FOODS } from "./mockData";
import type { DietTag, Grade, NutritionItem } from "./types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function searchFoods(query: string, diets: DietTag[] = []): Promise<NutritionItem[]> {
  await delay(280);
  const q = query.trim().toLowerCase();
  return MOCK_FOODS.filter((f) => {
    const matchesQ = !q || f.name.toLowerCase().includes(q) || f.ingredients.some((i) => i.name.toLowerCase().includes(q));
    const matchesDiet = diets.length === 0 || diets.every((d) => f.diet.includes(d));
    return matchesQ && matchesDiet;
  });
}

export async function getFood(id: string): Promise<NutritionItem | undefined> {
  await delay(120);
  return MOCK_FOODS.find((f) => f.id === id);
}

export function computeVitalityScore(f: NutritionItem): number {
  const macroBalance = 100 - Math.min(100, Math.abs(40 - (f.carbs * 4 * 100) / Math.max(1, f.calories)));
  const proteinScore = Math.min(100, (f.protein / Math.max(1, f.calories / 10)) * 35);
  const fiberScore = Math.min(100, f.fiber * 8);
  const sugarPenalty = Math.min(60, f.sugar * 1.2);
  const procPenalty = (f.processing - 1) * 12;
  const raw = macroBalance * 0.25 + proteinScore * 0.3 + fiberScore * 0.3 + (100 - sugarPenalty) * 0.15 - procPenalty;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function computeGrade(score: number): Grade {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}
