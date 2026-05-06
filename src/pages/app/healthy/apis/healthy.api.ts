import type { HealthyCategoriesPayload } from '@/lib/types/healthy';
import { apiRequest } from '@/lib/utils/api/api-request';

// Variables
const HEALTHY_CATEGORIES_ENDPOINT =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

// Functions
export const getHealthyCategories = () =>
  apiRequest<HealthyCategoriesPayload>({
    endpoint: HEALTHY_CATEGORIES_ENDPOINT,
  });
