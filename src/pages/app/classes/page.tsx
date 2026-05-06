import { useState } from 'react';
import { useTranslations } from 'use-intl';

import PageHero from '@/components/shared/page-hero';
import MuscleCarouselSection from '@/components/features/muscle/muscle-carousel-section';
import { useGetMuscleGroups } from './hooks/use-get-muscle-group';
import { useGetMusclesByGroup } from './hooks/use-get-muscles-by-group';
import { useGetAllMuscles } from './hooks/use-get-all-muscles';

export default function ClassesPage() {
  // Translation
  const t = useTranslations();

  // State
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Queries
  const { data: groups, isLoading: groupsLoading } = useGetMuscleGroups();

  const { data: allMuscles, isLoading: allMusclesLoading } = useGetAllMuscles(
    selectedGroupId === null ? groups : null,
  );

  const { data: filteredMuscles, isLoading: filteredLoading } =
    useGetMusclesByGroup(selectedGroupId);

  // Variables
  const isFullBody = selectedGroupId === null;
  const muscles = isFullBody ? allMuscles : filteredMuscles;
  const musclesLoading = isFullBody ? allMusclesLoading : filteredLoading;

  return (
    <div className="space-y-8 bg-orange-50 dark:bg-[#201f1f]">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <PageHero
          badge={t('fitnessclass')}
          backgroundText={t('workouts')}
          titleStart={t('transform-your-body-with-our-dynamic')}
          titleHighlight={t('upcoming-workouts')}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <MuscleCarouselSection
          tabsLoading={groupsLoading}
          carouselLoading={musclesLoading}
          activeId={selectedGroupId}
          allTab={{ id: 'full-body', label: t('fullBody') }}
          tabs={
            groups?.map((group) => ({
              id: group._id,
              label: group.name,
            })) ?? []
          }
          onChange={setSelectedGroupId}
          muscles={muscles}
          emptyText={t('noMusclesFound')}
          cardBasePath="/exercises"
        />
      </div>
    </div>
  );
}
