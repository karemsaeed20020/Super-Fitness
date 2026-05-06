import axios from 'axios';

export const getMealsByCategory = async ({
  params,
}: {
  params: {
    meal: string;
  };
}) => {
  const { data } = await axios.get<GetMealsByCategoryResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php`,
    {
      params: {
        c: params.meal,
      },
    },
  );

  return data;
};
