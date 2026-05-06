import type { GetMealsByIdResponse } from '@/lib/types/meals/meal-id';
import axios from 'axios';

export const getMealsById = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = await axios.get<GetMealsByIdResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php`,
    {
      params: {
        i: params.id,
      },
    },
  );

  return data;
};
