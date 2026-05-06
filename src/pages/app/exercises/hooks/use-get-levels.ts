import { useQuery } from '@tanstack/react-query';
import { getLevels } from '../apis/exercises.api';
import type { Level, LevelsResponse } from '@/lib/types/exercises';
import { useLocale } from '@/hooks/shared/use-locale';

export const useGetLevels = () => {
  const { locale } = useLocale();

  return useQuery<LevelsResponse, Error, Level[]>({
    queryKey: ['levels', locale],
    queryFn: async () => {
      const response = await getLevels();
      return response;
    },
    select: (data) => data.levels.slice(0, 4),
    staleTime: 1000 * 60 * 60,
  });
};