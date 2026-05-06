export type Mealss = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

export type IngredientKeys = {
  [K in `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string;
};

export type MeasureKeys = {
  [K in `strMeasure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string;
};

export type MealDetails = Meal & Partial<IngredientKeys> & Partial<MeasureKeys>;

export type GetMealsByIdSuccessResponse = {
  meals: Mealss[];
};

export type GetMealsByIdFailureResponse = {
  meals: null
};

export type GetMealsByIdResponse =
  | GetMealsByIdSuccessResponse
  | GetMealsByIdFailureResponse;
