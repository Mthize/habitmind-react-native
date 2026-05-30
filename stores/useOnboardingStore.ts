import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingStore = {
  hasSeenWelcome: boolean;
  hasCompletedOnboarding: boolean;
  selectedGoals: string[];
  selectedHabits: string[];
  setHasSeenWelcome: (value: boolean) => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  toggleGoal: (goal: string) => void;
  toggleHabit: (habit: string) => void;
  resetOnboarding: () => void;
};

const initialState = {
  hasSeenWelcome: false,
  hasCompletedOnboarding: false,
  selectedGoals: [],
  selectedHabits: [],
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,
      setHasSeenWelcome: (value) => set({ hasSeenWelcome: value }),
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      toggleGoal: (goal) =>
        set((state) => ({
          selectedGoals: state.selectedGoals.includes(goal)
            ? state.selectedGoals.filter((item) => item !== goal)
            : [...state.selectedGoals, goal],
        })),
      toggleHabit: (habit) =>
        set((state) => ({
          selectedHabits: state.selectedHabits.includes(habit)
            ? state.selectedHabits.filter((item) => item !== habit)
            : [...state.selectedHabits, habit],
        })),
      resetOnboarding: () => set(initialState),
    }),
    {
      name: "habitmind-onboarding-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
