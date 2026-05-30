import { create } from "zustand";

import type { HabitItem, MoodCheckIn } from "@/types/habit";

type HabitStore = {
  habits: HabitItem[];
  moodCheckIns: MoodCheckIn[];
  addHabit: (habit: HabitItem) => void;
  updateHabit: (habitId: string, updates: Partial<HabitItem>) => void;
  removeHabit: (habitId: string) => void;
  addMoodCheckIn: (checkIn: MoodCheckIn) => void;
};

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  moodCheckIns: [],
  addHabit: (habit) =>
    set((state) => ({
      habits: [...state.habits, habit],
    })),
  updateHabit: (habitId, updates) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updates } : habit,
      ),
    })),
  removeHabit: (habitId) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== habitId),
    })),
  addMoodCheckIn: (checkIn) =>
    set((state) => ({
      moodCheckIns: [...state.moodCheckIns, checkIn],
    })),
}));
