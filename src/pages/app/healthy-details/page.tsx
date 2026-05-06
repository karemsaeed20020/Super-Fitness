import { cn } from '@/lib/utils/tailwind-merge/cn';
import Meals from './componnents/meals';
import MealsCategory from './componnents/meals-category';
import { useTranslations } from 'use-intl';
import { useParams } from 'react-router-dom';
import { useMeal } from '@/components/providers/meals/meal-provider';
import PageHero from '@/components/shared/page-hero';
import { Dumbbell } from 'lucide-react';

export default function Page() {
  // Translations
  const t = useTranslations('');

  // Context
  const { mealId } = useMeal();

  // Hook
  const { id } = useParams();

  if (!id) return null;

  return (
    <main
      className={cn(
        'relative grid w-full grid-cols-1 md:grid-cols-12',
        "bg-[url('/assets/images/person-fit.png')]",
        'bg-cover bg-center bg-no-repeat',
      )}
    >
      {/* Overlay (gradient + blur) */}
      <div
        className={cn(
          'absolute inset-0 backdrop-blur-2xl',
          // light mode
          'bg-linear-to-l from-white/90 via-white/70 to-white/40',
          // dark mode
          'dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-800/40',
          'dark:bg-linear-to-l',
        )}
      />

      {/* Content */}
      <section className="relative z-30 col-span-12 flex justify-center pt-20 pb-2">
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
      </section>

      <section className="relative z-30 col-span-12 h-full md:col-span-4">
        <MealsCategory title={id} />
      </section>

      <section className="relative z-30 col-span-12 h-full md:col-span-8">
        {mealId ? (
          <Meals />
        ) : (
          <p className="text-center text-zinc-500">Select a meal</p>
        )}
      </section>
    </main>
  );
}
