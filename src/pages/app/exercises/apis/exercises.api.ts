import type { ExercisesResponse, LevelsResponse } from '@/lib/types/exercises';
import { apiRequest } from '@/lib/utils/api/api-request';

//  get exercises by muscle and difficulty
export const getExercises = (muscleId: string, difficultyId: string) =>
  apiRequest<ExercisesResponse>({
    endpoint: `/exercises/by-muscle-difficulty?primeMoverMuscleId=${muscleId}&difficultyLevelId=${difficultyId}`,
  });

  // get difficulty levels
export const getLevels = () =>
  apiRequest<LevelsResponse>({
    endpoint: '/levels',
  });