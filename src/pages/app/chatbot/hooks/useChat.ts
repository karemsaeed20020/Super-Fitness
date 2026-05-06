// src/hooks/useChat.ts
import type { Level, Meal, MealCategory, MuscleGroup } from '@/lib/types/chatbot';
import { useState } from 'react';
import { ChatService } from '../services/chatbot.service';
import { useTranslations } from 'use-intl';

export const useChat = () => {
    // states
  const [loading, setLoading] = useState(false);

//   translation    
  const t =useTranslations('chatbot');
  const processMessage = async (input: string): Promise<string> => {
    setLoading(true);
    const msg = input.toLowerCase();

    try {
    //  meal details logic
      if (msg.length > 3) {
        const searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${msg.replace('طريقة عمل ', '').replace('تفاصيل ', '')}`);
        const searchData = await searchRes.json();

        if (searchData.meals && searchData.meals.length > 0) {
          const meal = searchData.meals[0];
          
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
              ingredients.push(`${ingredient} (${measure})`);
            }
          }

          return ` ${t('meal-description')}: ${meal.strMeal}\n\n` +
                 ` ${t('category')}: ${meal.strCategory}\n` +
                 `🌍 ${t('cuisine')}: ${meal.strArea}\n\n` +
                 `🛒 ${t('ingredients')}: \n${ingredients.slice(0, 8).join('\n')}\n\n` +
                 `👨‍🍳 ${t('preparation')}: \n${meal.strInstructions.substring(0, 300)}...\n\n` +
                 `📺 ${t('tutorial')}: ${meal.strYoutube || t('not-available')}`;
        }
      }
      if (msg.includes('تمرين') || msg.includes('exercise')) {
        const data = await ChatService.getExercises();
        const item = data[0];
        return ` ${t('suggest-u-exercises')}: ${item.exercise}\n${t('target')}: ${item.target_muscle_group}\n${t('level')}: ${item.difficulty_level}\n${t('video')}: ${item.short_youtube_demonstration_link}`;
      }

      if (msg.includes('مستوى') || msg.includes('level')) {
        const data = await ChatService.getLevels();
        const levels = data.map((l: Level) => l.name).join(' - ');
        return `${t('available-levels')}: \n${levels}`;
      }

      if (msg.includes('عضلات') || msg.includes('muscle')) {
        const data = await ChatService.getMuscles();
        const muscles = data.slice(0, 5).map((m: MuscleGroup) => m.name).join('، ');
        return `${t('focused-muscles')}: ${muscles}، ${t('and')} ${t('others')}: ${muscles} .`;
      }

    //  meals logic with category recognition
      const catRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const { categories } = await catRes.json();
      
      const foundCategory = categories.find((cat: MealCategory) => 
        msg.includes(cat.strCategory.toLowerCase())
      );

      if (foundCategory) {
        const categoryName = foundCategory.strCategory;
        const mealsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const mealsData = await mealsRes.json();

        if (mealsData.meals) {
          const mealList = mealsData.meals
            .slice(0, 5)
            .map((m: Meal) => `🍴 ${m.strMeal}`)
            .join('\n');

          return `لقيتلك وجبات ممتازة في قسم ${categoryName}:\n\n${mealList}\n\nحابب تعرف تفاصيل أكتر عن وجبة معينة؟`;
        }
      }
    //    meals logic
      if (msg.includes('أكل') || msg.includes('وجبات') || msg.includes('diet') || msg.includes('جوعان')) {
        const categoriesList = categories.slice(0, 6).map((c: MealCategory) => c.strCategory).join(' - ');
        return `${t('available-categories')}: \n(${categoriesList})\n\n${t('which-category')}`;
      }

      return t('default-question');
      
    } catch (error) {
      return `${t('error')} ${error instanceof Error ? error.message : ''}`;
    } finally {
      setLoading(false);
    }
  };

  return { processMessage, loading };
};