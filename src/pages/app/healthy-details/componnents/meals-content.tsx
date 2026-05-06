import type { Mealss } from '@/lib/types/meals/meal-id';
import { getIngredients } from '@/lib/utils/meals/get-ingredients';
import { useTranslations } from 'use-intl';

interface MealsContentProps {
  meal: Mealss;
}

export default function MealsContent({ meal }: MealsContentProps) {
  // Translations
  const t = useTranslations('meals');

  // Variables
  const ingredients = meal ? getIngredients(meal) : [];
  const steps = meal?.strInstructions?.split('\r\n\r\n').filter(Boolean) ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616]">
      {/* Hero */}
      <figure className="relative h-60">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#161616]" />

        {/* Upper Content */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Title */}
          <figcaption className="rounded-full border border-orange-900/50 bg-orange-950 px-3 py-1 text-xs font-medium text-orange-300">
            {meal.strCategory}
          </figcaption>

          {/* Location */}
          <figcaption className="rounded-full border border-blue-900/50 bg-blue-950 px-3 py-1 text-xs font-medium text-blue-300">
            {meal.strArea}
          </figcaption>
        </div>
      </figure>

      {/* Lower Content */}
      <div className="relative -mt-6 p-5">
        <h1 className="mb-1 text-xl font-medium text-gray-100">
          {meal.strMeal}
        </h1>
        {meal.strYoutube && (
          <a
            href={meal.strYoutube}
            target="_blank"
            className="mb-5 inline-block text-xs text-blue-400 hover:underline"
          >
            {t('youtube')} ↗
          </a>
        )}

        {/* Ingredients */}
        <p className="mt-4 mb-3 text-[11px] font-medium tracking-wider text-gray-500 uppercase">
          {t('Ingredients')}
        </p>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5"
            >
              <p className="mb-0.5 text-[11px] font-medium text-orange-300">
                {ing.measure}
              </p>
              <p className="text-sm text-gray-300">{ing.name}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <p className="mb-3 text-[11px] font-medium tracking-wider text-gray-500 uppercase">
          {t('Instructions')}
        </p>
        <article className="space-y-4 rounded-xl border border-white/5 bg-[#111] p-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange-900/50 bg-orange-950 text-[11px] font-medium text-orange-300">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-gray-400">{step}</p>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}
