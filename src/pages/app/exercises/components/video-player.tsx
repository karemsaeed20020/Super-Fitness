import type { Exercise } from '@/lib/types/exercises';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'use-intl/react';

export default function VideoPlayer({
  getYouTubeEmbed,
  getYouTubeThumbnail,
  exercise,
  isPlaying,
  onToggle,
}: {
  getYouTubeEmbed: (url: string | null | undefined) => string | null;
  getYouTubeThumbnail: (url: string | null | undefined) => string | null;
  exercise: Exercise;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = getYouTubeEmbed(exercise.in_depth_youtube_explanation_link);
  const thumbnail = getYouTubeThumbnail(
    exercise.in_depth_youtube_explanation_link,
  );

  const handleToggle = () => {
    setIsLoaded(false);
    onToggle();
  };

  return (
    <div className="group relative mb-2 aspect-video max-h-134 w-full overflow-hidden rounded-2xl">
      {!embedUrl ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <span className="text-l font-medium text-zinc-500 dark:text-zinc-500">
            {t('noVideoAvailable')}
          </span>
        </div>
      ) : isPlaying ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-300 border-t-orange-500 dark:border-zinc-700" />
            </div>
          )}
          <iframe
            title={exercise.exercise}
            src={embedUrl}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        </>
      ) : (
        <div onClick={handleToggle} className="absolute inset-0 cursor-pointer">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={exercise.exercise}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
              <span className="px-6 text-center text-3xl font-black tracking-wide text-zinc-400 uppercase dark:text-zinc-700">
                {exercise.exercise}
              </span>
            </div>
          )}
        </div>
      )}

      {!isPlaying && (
        <div
          onClick={handleToggle}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-linear-to-t from-black/60 via-transparent to-transparent dark:from-black/80"
        >
          <div className="relative mb-4">
            <div
              className={cn(
                'bg-main/90 flex h-16 w-16 items-center justify-center rounded-full',
                'shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-200',
                'group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]',
              )}
            >
              <Play className="ms-1 h-6 w-6 fill-white text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
