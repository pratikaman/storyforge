import { create } from "zustand";
import { saveSettings } from "@/lib/supabase/sync";

interface ThemeState {
  userId: string | null;
  theme: "dark" | "light";
  setUserId: (userId: string | null) => void;
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
  userId: null,
  theme: "dark",

  setUserId: (userId) => set({ userId }),

  toggleTheme: () => {
    const state = get();
    const newTheme = state.theme === "dark" ? "light" : "dark";
    set({ theme: newTheme });
    if (state.userId) {
      saveSettings(state.userId, { theme: newTheme });
    }
  },

  setTheme: (theme) => {
    set({ theme });
    const { userId } = get();
    if (userId) {
      saveSettings(userId, { theme });
    }
  },
}));
