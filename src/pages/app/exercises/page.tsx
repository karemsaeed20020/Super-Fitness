'use client';

import PageHero from '@/components/shared/page-hero';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { useGetLevels } from './hooks/use-get-levels';
import { useGetExercises } from './hooks/use-get-exercises';
import { useGetMuscleGroups } from '../classes/hooks/use-get-muscle-group';
import { useGetAllMuscles } from '../classes/hooks/use-get-all-muscles';
import { useGetMusclesByGroup } from '../classes/hooks/use-get-muscles-by-group';
import MainExercises from './components/main-exercises';

// Constants
const PAGE_SIZE = 6;

// Helpers
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ExercisePage() {
  // Translations
  const t = useTranslations();

  // Route param (muscle id)
  const { id: muscleId } = useParams();

  // UI State
  const [selectedLevelId, setSelectedLevelId] = useState<string>(''); // difficulty level
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null); // muscle group filter

  // Fetch difficulty levels
  const { data: levels = [], isLoading: isLevelsLoading } = useGetLevels();  

  // Fetch exercises based on muscle + level
  const { data: exercises = [], isLoading: isExercisesLoading } =
    useGetExercises(muscleId as string, selectedLevelId);

  // Fetch muscle groups
  const { data: groups, isLoading: groupsLoading } = useGetMuscleGroups();

  // Fetch muscles (all OR filtered by group)
  const { data: allMuscles } = useGetAllMuscles(
    selectedGroupId === null ? groups : null,
  );

  const { data: filteredMuscles } = useGetMusclesByGroup(selectedGroupId);

  // Derived state: choose correct muscles source
  const muscles = selectedGroupId === null ? allMuscles : filteredMuscles;

  // Pagination (chunk into pages)
  const pages = chunkArray(muscles ?? [], PAGE_SIZE);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <PageHero backgroundText={t('workouts')} className="lg:pb-1" />
      </div>

      {/* Main Exercises Section */}
      <MainExercises
        groupsLoading={groupsLoading}
        groups={groups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        pages={pages}
        levels={levels}
        activeLevelId={selectedLevelId}
        onLevelChange={setSelectedLevelId}
        exercises={exercises}
        isLoading={isLevelsLoading || isExercisesLoading}
      />
    </div>
  );
}
