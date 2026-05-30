import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthMethod = "google" | "apple" | "email" | null;

type AuthFlowStore = {
  lastAuthMethod: AuthMethod;
  pendingEmail: string | null;
  setLastAuthMethod: (method: AuthMethod) => void;
  setPendingEmail: (email: string | null) => void;
  resetAuthFlow: () => void;
};

const initialState = {
  lastAuthMethod: null,
  pendingEmail: null,
};

export const useAuthFlowStore = create<AuthFlowStore>()(
  persist(
    (set) => ({
      ...initialState,
      setLastAuthMethod: (method) => set({ lastAuthMethod: method }),
      setPendingEmail: (email) => set({ pendingEmail: email }),
      resetAuthFlow: () => set(initialState),
    }),
    {
      name: "habitmind-auth-flow-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
