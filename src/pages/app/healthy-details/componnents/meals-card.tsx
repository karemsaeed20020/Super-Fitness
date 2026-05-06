import { useMeal } from '@/components/providers/meals/meal-provider';
import { cn } from '@/lib/utils/tailwind-merge/cn';

interface CategoryProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealCard({
  idMeal,
  strMeal,
  strMealThumb,
}: CategoryProps) {
  // Context
  const { setMealId, mealId } = useMeal();

  const isActive = mealId === idMeal;

  return (
    <div
      onClick={() => setMealId(idMeal)}
      className={cn(
        'flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors last:border-0',
        'border-b border-zinc-200 dark:border-white/5',
        'hover:bg-zinc-100 dark:hover:bg-white/5',
        isActive && 'border-orange-500/30 bg-orange-100 dark:bg-orange-500/10',
      )}
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        className={cn(
          'size-20 shrink-0 rounded-xl object-cover transition',
          'border border-zinc-200 dark:border-white/10',
          isActive && 'border-orange-400',
        )}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'mb-0.5 text-sm font-medium',
            'text-zinc-800 dark:text-gray-100',
            isActive && 'text-orange-600 dark:text-orange-300',
          )}
        >
          {strMeal}
        </p>
      </div>

      <span
        className={cn(
          'shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium',
          isActive
            ? 'border-orange-400 bg-orange-100 text-orange-600 dark:border-orange-500/50 dark:bg-orange-500/20 dark:text-orange-300'
            : 'border-zinc-300 bg-zinc-100 text-zinc-600 dark:border-orange-900/50 dark:bg-orange-950 dark:text-orange-300',
        )}
      >
        #{idMeal}
      </span>

      <span
        className={cn(
          'text-zinc-400 dark:text-gray-600',
          isActive && 'text-orange-500 dark:text-orange-400',
        )}
      >
        ›
      </span>
    </div>
  );
}
