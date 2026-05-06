'use client';

import { Separator } from '@/components/ui/separator';
import { featureItems } from '@/lib/constants/exercises/exercises.constant';
import type { Level as ApiLevel, Exercise } from '@/lib/types/exercises';
import { useEffect, useMemo, useState } from 'react';
import ExercisesPlaylist from './exercises-playlist';
import VideoInfo from './video-info';
import VideoPlayer from './video-player';
import ExercisesCarousel from './exercises-carousel';
import type { Muscle, MuscleGroup } from '@/lib/types/muscle';
import FilterTabs from '@/components/shared/filter-tabes';
import { useTranslations } from 'use-intl/react';
import { Spinner } from '@/components/ui/spinner';

export interface LevelTab {
  id: string;
  name: string;
}

function getYouTubeId(url: string | null | undefined) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

function getYouTubeEmbed(url: string | null | undefined) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=0` : null;
}

function getYouTubeThumbnail(url: string | null | undefined) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function FeaturesBar() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-3 gap-3">
      {featureItems.map(({ icon: Icon, labelKey }) => (
        <div
          key={labelKey}
          className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500">
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[11px] font-bold tracking-wide text-zinc-600 uppercase dark:text-zinc-500">
            {t(labelKey)}
          </span>
        </div>
      ))}
    </div>
  );
}

interface MainExercisesProps {
  groupsLoading: boolean;
  groups: MuscleGroup[] | undefined;
  selectedGroupId: string | null;
  setSelectedGroupId: (groupId: string | null) => void;
  pages: Muscle[][];
  levels: ApiLevel[];
  activeLevelId: string;
  onLevelChange: (levelId: string) => void;
  exercises: Exercise[];
  isLoading: boolean;
}

export default function MainExercises({
  groupsLoading,
  groups,
  selectedGroupId,
  setSelectedGroupId,
  pages,
  levels,
  activeLevelId,
  onLevelChange,
  exercises,
  isLoading,
}: MainExercisesProps) {
  const t = useTranslations();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!activeLevelId && levels.length > 0) {
      onLevelChange(levels[0]._id);
    }
  }, [levels, activeLevelId, onLevelChange]);

  const mappedLevels = useMemo(
    () => levels.map((level) => ({ id: level._id, name: level.name })),
    [levels],
  );

  const activeVideo = useMemo(() => {
    if (!exercises.length) return null;
    return exercises.find((e) => e._id === selectedId) || exercises[0];
  }, [exercises, selectedId]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <div className="flex items-start">
        {/* Sidebar */}
        <aside className="min-h-screen w-80 shrink-0 border-r border-zinc-200 dark:border-zinc-800">
          <ExercisesPlaylist
            getYouTubeThumbnail={getYouTubeThumbnail}
            levels={mappedLevels}
            activeLevelId={activeLevelId}
            onLevelChange={onLevelChange}
            list={exercises}
            activeVideoId={activeVideo?._id ?? ''}
            onSelectVideo={(item) => {
              setSelectedId(item._id);
              setIsPlaying(false);
            }}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 py-4">
            {isLoading || !activeVideo ? (
              <div className="flex min-h-100 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50/40 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
                {isLoading ? (
                  <Spinner className="size-6" />
                ) : (
                  t('noExercisesFound')
                )}
              </div>
            ) : (
              <>
                <VideoPlayer
                  getYouTubeEmbed={getYouTubeEmbed}
                  getYouTubeThumbnail={getYouTubeThumbnail}
                  exercise={activeVideo}
                  isPlaying={isPlaying}
                  onToggle={() => setIsPlaying((p) => !p)}
                />
                <VideoInfo exercise={activeVideo} />
              </>
            )}

            <Separator className="bg-zinc-200 dark:bg-zinc-800/60" />
            <FeaturesBar />
            <FilterTabs
              className="mt-2"
              isLoading={groupsLoading}
              activeId={selectedGroupId}
              allTab={{ id: 'full-body', label: t('fullBody') }}
              items={
                groups?.map((group) => ({
                  id: group._id,
                  label: group.name,
                })) ?? []
              }
              onChange={setSelectedGroupId}
            />
            <p className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              {t('discoverExercises')}
            </p>
            <ExercisesCarousel pages={pages} cardBasePath="/exercises" />
          </div>
        </main>
      </div>
    </div>
  );
}
