declare type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

declare type GetMealsByCategorySuccessResponse = {
  meals: Meal[];
};

declare type GetMealsByCategoryFailureResponse = {
  meals: null;
};

declare type GetMealsByCategoryResponse =
  | GetMealsByCategorySuccessResponse
  | GetMealsByCategoryFailureResponse;