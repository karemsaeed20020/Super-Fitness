import { useMeal } from '@/components/providers/meals/meal-provider';
import { useMealIds } from '../hooks/use-meals-id';
import MealsSkeleton from '@/components/skeleton/meals/meals-skeleton';
import MealsContent from './meals-content';

export default function Meals() {
  // Context
  const { mealId } = useMeal();

  // Query
  const { meals, isLoading } = useMealIds(mealId!);

  // Variables
  const meal = meals?.meals?.[0];

  return (
    <section className="relative z-30 mx-4 mt-10 min-h-screen rounded-2xl text-white">
      {meal && (
        <>
          <img
            src={meal.strMealThumb}
            alt="meal bg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        {isLoading && <MealsSkeleton />}
        {!isLoading && !meal && (
          <p className="text-center text-red-400">No meal found</p>
        )}

        {!isLoading && meal && <MealsContent meal={meal} />}
      </div>
    </section>
  );
}
