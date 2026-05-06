import { Link } from 'react-router-dom';
import { ArrowUpRight, Dumbbell } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Muscle } from '@/lib/types/muscle';

//Types
type MuscleCardProps = {
  muscle: Muscle;
  to: string;
};

//Styles
const cardBase = cn(
  'group relative isolate overflow-hidden rounded-lg',
  'border border-black/10 bg-zinc-900',
  'shadow-[0_10px_30px_rgba(0,0,0,0.16)]',
  'transition-all duration-300',
  'hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)]',
  'dark:border-white/10 dark:bg-zinc-900',
);

const imageWrapperClasses = cn(
  'relative aspect-[1/1] w-full overflow-hidden rounded-lg',
);

const imageClasses = cn(
  'h-full w-full object-cover transition-transform duration-500 ease-out',
  'group-hover:scale-[1.03]',
);

const imageFallbackClasses = cn(
  'flex h-full w-full items-center justify-center',
  'bg-gradient-to-br from-zinc-700 via-zinc-900 to-black text-white/30',
);

const imageOverlayClasses = cn(
  'absolute inset-0 z-[1]',
  'bg-gradient-to-t from-black/30 via-transparent to-transparent',
);

const bottomPanelClasses = cn(
  'absolute inset-x-0 bottom-0 z-10',
  'px-5 bg-gray-800/95 py-1',
  'sm:px-3',
);

const glowClasses = cn(
  'absolute bottom-0 left-1/2 z-[9] h-24 w-[70%] -translate-x-1/2',
  'bg-[radial-gradient(ellipse_at_center,rgba(255,115,0,0.10),transparent_70%)]',
  'pointer-events-none',
);

const titleClasses = cn('mb-4 font-bold uppercase', ' text-white');

const exploreLinkClasses = cn(
  'inline-flex items-center gap-3',
  'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
);

const exploreTextClasses = cn(
  'text-[15px] font-semibold text-orange-500',
  'transition-colors duration-200 group-hover:text-orange-400',
);

const exploreIconClasses = cn(
  'inline-flex h-8 w-8 items-center justify-center rounded-full',
  'bg-orange-500 text-white',
  'shadow-[0_8px_20px_rgba(255,98,0,0.32)]',
  'transition-all duration-200',
  'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105',
);

export default function MuscleCard({ muscle, to }: MuscleCardProps) {
  // Translations
  const t = useTranslations();

  return (
    <article className={cardBase}>
      <div className={imageWrapperClasses}>
        {/* ─── Image ─── */}
        {muscle.image ? (
          <img
            src={muscle.image}
            alt={muscle.name}
            loading="lazy"
            className={imageClasses}
          />
        ) : (
          <div className={imageFallbackClasses}>
            <Dumbbell size={42} strokeWidth={1.8} />
          </div>
        )}

        {/* ─── Soft image overlay ─── */}
        <div className={imageOverlayClasses} />

        {/* ─── Bottom glow ─── */}
        <div className={glowClasses} />

        {/* ─── Bottom content panel ─── */}
        <div className={bottomPanelClasses}>
          <h3 className={titleClasses}>{muscle.name}</h3>

          <Link to={to} className={exploreLinkClasses}>
            <span className={exploreTextClasses}>{t('explore')}</span>

            <span className={exploreIconClasses}>
              <ArrowUpRight size={14} strokeWidth={2.8} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
