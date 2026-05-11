export type DietTag = "Veg" | "Non-Veg" | "Vegan" | "Jain";
export type AgeMode = "Kid" | "Teen" | "Adult";
export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";

export type Ingredient = {
  name: string;
  benefit: string;
  area: "immunity" | "digestion" | "skin" | "energy" | "recovery" | "focus";
};

export type NutritionItem = {
  id: string;
  name: string;
  emoji: string;
  diet: DietTag[];
  calories: number;
  protein: number; // g
  carbs: number; // g
  fats: number; // g
  fiber: number; // g
  sugar: number; // g
  processing: 1 | 2 | 3 | 4; // 1 = whole, 4 = ultra-processed
  ingredients: Ingredient[];
  insights: string[];
};
