export type HealthyCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type HealthyCategoriesPayload = {
  categories: HealthyCategory[];
};
