import { useQuery } from '@tanstack/react-query';
import type { HealthyCategory } from '@/lib/types/healthy';
import { getHealthyCategories } from '../apis/healthy.api';

export type HealthyMealTime = 'breakfast' | 'lunch' | 'dinner';

export function useHealthyCategories() {
  // Queries
  const query = useQuery<HealthyCategory[]>({
    queryKey: ['healthy-categories'],
    queryFn: async () => {
      const response = await getHealthyCategories();
      return response.categories ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });

  return query;
}
