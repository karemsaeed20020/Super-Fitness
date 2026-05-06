import { create } from "zustand";
import type { RegisterFields } from "@/lib/schemes/auth/register.schema";

type RegisterData = Partial<RegisterFields>;

interface RegisterState {
  step: number;
  data: RegisterData;
  setStepData: (data: RegisterData) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  data: {},

  setStepData: (incoming) =>
    set((state) => ({ data: { ...state.data, ...incoming } })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  reset: () => set({ step: 1, data: {} }),
}));