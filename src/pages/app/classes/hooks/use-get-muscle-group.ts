import type { MuscleGroup } from '@/lib/types/muscle';
import { useQuery } from '@tanstack/react-query';
import { getMuscles } from '../apis/muscle.api';
import { useLocale } from '@/hooks/shared/use-locale';

export const useGetMuscleGroups = () => {
  const { locale } = useLocale();
  return useQuery<MuscleGroup[]>({
    queryKey: ['muscle-groups', locale],
    queryFn: async () => {
      const data = await getMuscles();
      return data.musclesGroup;
    },
  });
};
