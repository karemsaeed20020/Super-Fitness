import { useInfiniteQuery } from '@tanstack/react-query';
import { getMealsByCategory } from '../apis/get-meal-category-api';

const ITEMS_PER_PAGE = 12;

export const useMealId = (meal: string) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['MealsCategory', meal],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const data = await getMealsByCategory({
        params: {
          meal,
        },
      });

      const allMeals = data.meals ?? [];

      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;

      return {
        meals: allMeals.slice(start, end),
        nextPage: end < allMeals.length ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!meal,
  });

  return {
    meals: data?.pages.flatMap((page) => page.meals) ?? [],
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
