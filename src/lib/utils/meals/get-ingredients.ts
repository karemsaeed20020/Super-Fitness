import type {
  IngredientKeys,
  MealDetails,
  MeasureKeys,
} from '@/lib/types/meals/meal-id';

export function getIngredients(meal: MealDetails) {
  return Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      name: meal[`strIngredient${i}` as keyof IngredientKeys],
      measure: meal[`strMeasure${i}` as keyof MeasureKeys],
    }))
    .filter((item) => item.name && item.name.trim() !== '');
}
