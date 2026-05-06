const BASE_URL = 'https://fitness.elevateegy.com/api/v1';

export const ChatService = {
  async getExercises() {
    const res = await fetch(`${BASE_URL}/exercises`);
    const data = await res.json();
    return data.exercises;
  },
  
  async getLevels() {
    const res = await fetch(`${BASE_URL}/levels`);
    const data = await res.json();
    return data.levels;
  },

  async getMuscles() {
    const res = await fetch(`${BASE_URL}/muscles`);
    const data = await res.json();
    return data.musclesGroup;
  },

  async getMeals() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    return data.categories;
  },
//   meals
  async getMealsByCategory(category: string) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  },

  async getChatResponse(message: string) {
    const msg = message.toLowerCase();
    
    if (msg.includes('seafood') || msg.includes('سمك') || msg.includes('بحرية')) {
      return { type: 'meals', category: 'Seafood' };
    }
    
    return { type: 'text', content: "أنا هنا لمساعدتك! هل تريد اقتراحات لوجبات صحية؟ جرب كتابة 'Seafood'." };
  }

};