import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateLevel, getLevelTitle } from "@/lib/xp";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface GamificationState {
  xp: number;
  level: number;
  levelTitle: string;
  streak: number;
  lastVisitDate: string | null;
  unlockedBadges: string[];
  recentXPGain: { amount: number; source: string } | null;
  recentBadge: string | null;

  addXP: (amount: number, source: string) => void;
  checkStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
  clearRecentXP: () => void;
  clearRecentBadge: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      levelTitle: "Scribbler",
      streak: 0,
      lastVisitDate: null,
      unlockedBadges: [],
      recentXPGain: null,
      recentBadge: null,

      addXP: (amount, source) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = calculateLevel(newXP);
          return {
            xp: newXP,
            level: newLevel,
            levelTitle: getLevelTitle(newLevel),
            recentXPGain: { amount, source },
          };
        }),

      checkStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const { lastVisitDate, streak } = get();

        if (lastVisitDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastVisitDate === yesterdayStr) {
          set({
            streak: streak + 1,
            lastVisitDate: today,
          });
        } else {
          set({
            streak: 1,
            lastVisitDate: today,
          });
        }
      },

      unlockBadge: (badgeId) =>
        set((state) => {
          if (state.unlockedBadges.includes(badgeId)) return state;
          return {
            unlockedBadges: [...state.unlockedBadges, badgeId],
            recentBadge: badgeId,
          };
        }),

      hasBadge: (badgeId) => get().unlockedBadges.includes(badgeId),

      clearRecentXP: () => set({ recentXPGain: null }),
      clearRecentBadge: () => set({ recentBadge: null }),
    }),
    {
      name: "storyforge-gamification",
    }
  )
);
