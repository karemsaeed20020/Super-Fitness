import type { Exercise } from '@/lib/types/exercises';
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '../apis/exercises.api';
import { useLocale } from '@/hooks/shared/use-locale';

export const useGetExercises = (
  muscleId: string,
  difficultyId: string
) => {
  const { locale } = useLocale();

  return useQuery<Exercise[]>({
    queryKey: ['exercises', muscleId, difficultyId, locale],
    enabled: !!muscleId && !!difficultyId,
    queryFn: async () => {
      const data = await getExercises(muscleId, difficultyId);
      return data.exercises;
    },
  });
};