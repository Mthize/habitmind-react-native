export type GoalOption = string;
export type HabitOption = string;

export type OnboardingProgress = {
  hasSeenWelcome: boolean;
  hasCompletedOnboarding: boolean;
  selectedGoals: GoalOption[];
  selectedHabits: HabitOption[];
};
