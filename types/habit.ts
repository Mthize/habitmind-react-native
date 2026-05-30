export type HabitItem = {
  id: string;
  name: string;
  cadence?: string;
};

export type MoodCheckIn = {
  id: string;
  mood: string;
  createdAt: string;
  note?: string;
};
