import { createContext, useContext, useState } from 'react';

type MealContextType = {
  mealId: string | null;
  setMealId: (id: string) => void;
  clearMealId: () => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [mealId, setMealIdState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('mealId');
  });

  // Save to localStorage whenever changes
  const setMealId = (id: string) => {
    setMealIdState(id);
    localStorage.setItem('mealId', id);
  };

  const clearMealId = () => {
    setMealIdState(null);
    localStorage.removeItem('mealId');
  };

  return (
    <MealContext.Provider value={{ mealId, setMealId, clearMealId }}>
      {children}
    </MealContext.Provider>
  );
}

// ✅ Custom Hook (IMPORTANT)
export function useMeal() {
  const context = useContext(MealContext);

  if (!context) {
    throw new Error('useMeal must be used inside MealProvider');
  }

  return context;
}
