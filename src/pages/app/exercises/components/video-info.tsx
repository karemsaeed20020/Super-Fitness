'use client';

import { Timer, Flame, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Exercise } from '@/lib/types/exercises';
import { levelBadgeClass } from '@/lib/constants/exercises/exercises.constant';
import { useTranslations } from 'use-intl/react';

const getLevelClass = (levelName: string) =>
  levelBadgeClass[levelName as keyof typeof levelBadgeClass] ??
  'bg-zinc-100 dark:bg-zinc-700/20 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700';

export default function VideoInfo({ exercise }: { exercise: Exercise }) {
  const t = useTranslations();

  const badges = [
    {
      value: exercise.difficulty_level,
      className: getLevelClass(exercise.difficulty_level),
    },
    {
      value: exercise.target_muscle_group,
      className:
        'border-zinc-300 dark:border-zinc-700 text-xs font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase',
    },
    {
      value: exercise.mechanics,
      className:
        'border-zinc-300 dark:border-zinc-700 text-xs font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase',
    },
  ];

  const stats = [
    {
      icon: Timer,
      value: 'N/A',
      className:
        'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300',
      iconClass: 'text-zinc-400 dark:text-zinc-500',
    },
    {
      icon: Flame,
      value: exercise.body_region,
      className: 'border-main/40 text-main',
      iconClass: '',
    },
    {
      icon: ClipboardList,
      value: exercise.primary_exercise_classification,
      className:
        'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300',
      iconClass: 'text-zinc-400 dark:text-zinc-500',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Title */}
      <h3 className="text-xl font-black tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
        {exercise.exercise}
      </h3>

      {/* Badges — flex-wrap is direction-agnostic */}
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant="outline"
            className={cn(
              'text-xs font-bold tracking-widest uppercase',
              badge.className,
            )}
          >
            {badge.value}
          </Badge>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
        {t('aTargetedWorkout', {
          muscle: exercise.target_muscle_group?.toLowerCase() ?? '',
          pattern: exercise.movement_pattern_1 ?? '',
        })}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold',
                stat.className,
              )}
            >
              <Icon className={cn('h-4 w-4', stat.iconClass)} />
              {stat.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
