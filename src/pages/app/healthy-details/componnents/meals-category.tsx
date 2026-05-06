import MealsCategorySkeleton from '@/components/skeleton/meals/meals-category-skeleton';
import { useMealId } from '../hooks/use-meal-id';
import MealCard from './meals-card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'use-intl';

export default function MealsCategory({ title }: { title: string }) {
  // Translations
  const t = useTranslations('meals');

  // Query
  const { meals, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMealId(title);

  if (!title) return null;

  return (
    <main>
      {/* Meals Card */}

      {isLoading ? (
        <MealsCategorySkeleton />
      ) : (
        <section className="relative z-30 container mx-auto px-4 py-10">
          <div className="grid grid-cols-1">
            {meals?.map((cat) => (
              <MealCard
                key={cat.idMeal}
                idMeal={cat.idMeal}
                strMeal={cat.strMeal}
                strMealThumb={cat.strMealThumb}
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-4 flex w-full items-center justify-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="w-52 cursor-pointer"
              >
                {isFetchingNextPage ? t('loading') : t('load-more')}
              </Button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
