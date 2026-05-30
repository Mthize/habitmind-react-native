export type AuthMethod = "google" | "apple" | "email" | null;

export type HabitMindUser = {
  id: string;
  email?: string;
  displayName?: string;
};
