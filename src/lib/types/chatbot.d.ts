// في ملف الأنواع types
export interface Message {
  text: string;
  sender: 'user' | 'bot';
  images?: string[]; // روابط صور الوجبات
}
export interface Exercise {
  exercise: string;
  difficulty_level: string;
  target_muscle_group: string;
  short_youtube_demonstration_link: string;
}

export interface Level {
  _id: string;
  name: string;
}

export interface MuscleGroup {
  _id: string;
  name: string;
}

export interface MealCategory {
  strCategory: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
}