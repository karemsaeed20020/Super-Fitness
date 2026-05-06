import { useQuery } from '@tanstack/react-query';

import { getMealsById } from '../apis/get-meal-id-api';

export const useMealIds = (id: string) => {
  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['MealsID', id],
    queryFn: () =>
      getMealsById({
        params: {
          id,
        },
      }),
    enabled: !!id,
  });

  return {
    meals,
    isLoading,
    error,
  };
};
