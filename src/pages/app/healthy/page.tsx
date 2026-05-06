import CommonCard from '@/components/shared/common-card';
import PageHero from '@/components/shared/page-hero';
import type { HealthyCategory } from '@/lib/types/healthy';
import { Dumbbell } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslations } from 'use-intl';
import {
  type HealthyMealTime,
  useHealthyCategories,
} from './hooks/use-healthy-categories';

// Variables
const TAB_OPTIONS: HealthyMealTime[] = ['breakfast', 'lunch', 'dinner'];

const CATEGORY_SLICES: Record<HealthyMealTime, [number, number]> = {
  breakfast: [0, 6],
  lunch: [3, 9],
  dinner: [6, 12],
};

// Functions
function getCategoriesByMealTime(
  categories: HealthyCategory[],
  mealTime: HealthyMealTime,
) {
  const [start, end] = CATEGORY_SLICES[mealTime];
  const list = categories.slice(start, end);

  if (list.length >= 6) return list;
  return categories.slice(0, 6);
}

export default function HealthyPage() {
  // Translation
  const t = useTranslations();

  // State
  const [activeTab, setActiveTab] = useState<HealthyMealTime>('dinner');

  // Queries
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useHealthyCategories();

  // Variables
  const visibleCategories = useMemo(
    () => getCategoriesByMealTime(categories, activeTab),
    [categories, activeTab],
  );

  return (
    <section className="overflow-hidden border border-background/8 bg-white dark:bg-[#1a1a1a] py-6 sm:py-12">
      <PageHero
        badge={t('healthy-badge')}
        titleStart={t('healthy-heading-start')}
        titleHighlight={t('healthy-heading-highlight')}
        titleEnd={t('healthy-heading-end')}
        backgroundText={t('healthy-background-text')}
        icon={<Dumbbell size={20} />}
        className="pt-8 pb-6 sm:pt-10"
        titleClassName="max-w-190 text-[30px] leading-[1.22] text-white sm:text-[42px]"
      />

      <nav
        aria-label={t('healthy-meal-time-filter')}
        className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full bg-gray-200 dark:bg-background/80 p-1"
      >
        {TAB_OPTIONS.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              aria-pressed={isActive}
              className={
                isActive
                  ? 'bg-main rounded-full px-4 py-1.5 text-sm font-semibold text-background '
                  : 'rounded-full px-4 py-1.5 text-sm font-semibold text-foreground/75 dark:hover:bg-white/10 hover:bg-black/10 hover:text-foreground cursor-pointer transition-colors duration-300'
              }
            >
              {t(`healthy-tab-${tab}`)}
            </button>
          );
        })}
      </nav>

      {isLoading && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative h-80 animate-pulse overflow-hidden rounded-xl border border-white/15 bg-white/5 sm:h-85"
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-white/8 p-4">
                <div className="h-4 w-2/3 rounded-md bg-white/15" />
                <div className="h-3 w-1/3 rounded-md bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-sm text-white/80">
            {error instanceof Error ? error.message : t('something-went-wrong')}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="bg-main rounded-full px-5 py-2 text-sm font-semibold text-white"
          >
            {t('healthy-retry')}
          </button>
        </div>
      )}

      {!isLoading && !isError && visibleCategories.length === 0 && (
        <p className="py-6 text-center text-sm text-white/75">
          {t('healthy-empty')}
        </p>
      )}

      {!isLoading && !isError && visibleCategories.length > 0 && (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((category) => (
            <CommonCard
              key={category.idCategory}
              image={category.strCategoryThumb}
              alt={category.strCategory}
              title={category.strCategory}
              text={t('healthy-card-cta')}
              icon="/assets/icon/Vector.svg"
              to={`/HealthyDetails/${encodeURIComponent(category.strCategory)}`}
              className="h-80 sm:h-85"
            />
          ))}
        </div>
      )}
    </section>
  );
}
