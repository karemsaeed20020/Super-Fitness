import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Exercise } from '@/lib/types/exercises';
import type { LevelTab } from './main-exercises';
import PlaylistItem from './playlist-item';
import { levelTabActiveClass } from '@/lib/constants/exercises/exercises.constant';

interface ExercisesPlaylistProps {
  getYouTubeThumbnail: (url: string | null | undefined) => string | null;
  levels: readonly LevelTab[];
  activeLevelId: string;
  onLevelChange: (levelId: string) => void;
  list: Exercise[];
  activeVideoId: string;
  onSelectVideo: (item: Exercise) => void;
}

export default function ExercisesPlaylist({
  getYouTubeThumbnail,
  levels,
  activeLevelId,
  onLevelChange,
  list,
  activeVideoId,
  onSelectVideo,
}: ExercisesPlaylistProps) {
  return (
    <div className="flex h-full w-90 shrink-0 flex-col overflow-hidden border-r border-zinc-200 bg-white dark:border-zinc-800/60 dark:bg-zinc-900">
      {/* Tabs */}
      <div className="flex gap-1 px-4 pt-3.5">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => onLevelChange(level.id)}
            className={cn(
              'flex-1 cursor-pointer rounded-t-lg border-b-2 py-2 text-[11px] font-black tracking-widest uppercase transition-all duration-200',
              level.id === activeLevelId
                ? levelTabActiveClass[
                    level.name as keyof typeof levelTabActiveClass
                  ]
                : 'border-b-transparent bg-zinc-100 text-zinc-500 hover:text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-600 dark:hover:text-zinc-300',
            )}
          >
            {level.name}
          </button>
        ))}
      </div>

      {/* Scroll */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="py-2">
          {list.map((item) => (
            <PlaylistItem
              key={item._id}
              getYouTubeThumbnail={getYouTubeThumbnail}
              item={item}
              isActive={activeVideoId === item._id}
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
