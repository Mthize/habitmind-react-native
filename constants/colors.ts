export const colors = {
  background: "#FAFAF8",
  card: "#FFFFFF",
  text: "#111111",
  mutedText: "#6B6B6B",
  border: "#E3E3E0",
  black: "#111111",
  white: "#FFFFFF",
  disabled: "#A3A3A3",
} as const;

export type HabitMindColor = keyof typeof colors;
