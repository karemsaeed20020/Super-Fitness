import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Exercise } from '@/lib/types/exercises';
import { Play } from 'lucide-react';
import Image from '@/components/ui/image';
import { useTranslations } from 'use-intl/react';

interface PlaylistItemProps {
  getYouTubeThumbnail: (url: string | null | undefined) => string | null;
  item: Exercise;
  isActive: boolean;
  onSelect: (item: Exercise) => void;
}

export default function PlaylistItem({
  getYouTubeThumbnail,
  item,
  isActive,
  onSelect,
}: PlaylistItemProps) {
  const t = useTranslations();
  const thumbnail = getYouTubeThumbnail(item.short_youtube_demonstration_link);

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-label={t('playExercise', { name: item.exercise })}
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 border-l-[3px] px-4 py-3 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5',
        isActive ? 'border-l-main bg-orange-500/10' : 'border-l-transparent',
      )}
    >
      {/* LEFT (START): Thumbnail + Text */}
      <div className="flex w-1 flex-1 items-center gap-3">
        {/* Thumbnail */}
        <div className="relative h-13 w-18 shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-700">
          {thumbnail ? (
            <Image
              src={thumbnail}
              width={72}
              height={52}
              alt={item.exercise}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              {t('noPreview')}
            </span>
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {item.exercise}
          </p>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-300">
            {item.movement_pattern_1}
          </p>
          <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-500">
            {item.primary_equipment}
          </p>
        </div>
      </div>

      <div
        className={cn(
          'bg-main ms-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform',
          isActive && 'scale-110',
        )}
      >
        <Play className="ms-0.5 h-3 w-3 fill-white text-white dark:fill-zinc-800 dark:text-zinc-800" />
      </div>
    </button>
  );
}
