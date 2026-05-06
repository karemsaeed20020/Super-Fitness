import type { PageHeroProps } from '../../lib/types/page-hero';
import { Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge/cn';

export default function PageHero({
  badge,
  titleStart,
  titleHighlight,
  titleEnd,
  backgroundText = 'WORKOUTS',
  className,
  icon = <Dumbbell />,
  contentClassName,
  badgeClassName,
  titleClassName,
  backgroundTextClassName,
}: PageHeroProps) {
  // Variables
  const hasTitle = Boolean(titleStart || titleHighlight || titleEnd);

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        'py-10 sm:py-12 lg:py-14',
        className,
      )}
    >
      {/* ─── Background Word ─── */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute top-2 left-1/2 -translate-x-1/2',
          'font-extrabold tracking-widest uppercase',
          'text-[42px] sm:text-[54px] lg:text-[64px]',
          'whitespace-nowrap select-none',
          'text-transparent',
          'bg-linear-to-r from-foreground/22 to-[#232425]',
          'bg-clip-text [-webkit-background-clip:text]',
          '[-webkit-text-stroke:1px_rgba(255,255,255,0.05)]',
          backgroundTextClassName,
        )}
      >
        {backgroundText}
      </div>

      <div
        aria-hidden="true"
        className="bg-main/12 absolute top-12 left-1/2 h-24 w-64 -translate-x-1/2 blur-3xl"
      />

      <div
        className={cn(
          'relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center',
          contentClassName,
        )}
      >
        <div className={cn('relative', hasTitle && 'mb-6')}>
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 rounded-full blur-xl',
              'bg-main/35 dark:bg-main/25',
            )}
          />

          <div
            className={cn(
              'relative inline-flex items-center gap-2 rounded-full px-4 py-2',
              'text-main text-lg font-semibold',
              badgeClassName,
            )}
          >
            {icon}
            <span>{badge}</span>
          </div>
        </div>

        {hasTitle && (
          <h1
            className={cn(
              'text-foreground max-w-195 text-center font-bold uppercase',
              'text-[40px] leading-[1.4]',
              'tracking-[0.02em]',
              titleClassName,
            )}
          >
            {titleStart ? <span className="text-foreground">{titleStart} </span> : null}
            {titleHighlight ? (
              <span className="text-main">{titleHighlight}</span>
            ) : null}
            {titleEnd ? <span className="text-foreground"> {titleEnd}</span> : null}
          </h1>
        )}
      </div>
    </section>
  );
}
