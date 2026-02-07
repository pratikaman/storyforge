import { create } from "zustand";
import { calculateLevel, getLevelTitle } from "@/lib/xp";
import { saveGamification } from "@/lib/supabase/sync";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface GamificationState {
  userId: string | null;
  xp: number;
  level: number;
  levelTitle: string;
  streak: number;
  lastVisitDate: string | null;
  unlockedBadges: string[];
  recentXPGain: { amount: number; source: string } | null;
  recentBadge: string | null;

  setUserId: (userId: string | null) => void;
  hydrate: (data: {
    xp: number;
    level: number;
    levelTitle: string;
    streak: number;
    lastVisitDate: string | null;
    unlockedBadges: string[];
  }) => void;
  reset: () => void;
  addXP: (amount: number, source: string) => void;
  checkStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
  clearRecentXP: () => void;
  clearRecentBadge: () => void;
}

export const useGamificationStore = create<GamificationState>()((set, get) => ({
  userId: null,
  xp: 0,
  level: 1,
  levelTitle: "Scribbler",
  streak: 0,
  lastVisitDate: null,
  unlockedBadges: [],
  recentXPGain: null,
  recentBadge: null,

  setUserId: (userId) => set({ userId }),

  hydrate: (data) =>
    set({
      xp: data.xp,
      level: data.level,
      levelTitle: data.levelTitle,
      streak: data.streak,
      lastVisitDate: data.lastVisitDate,
      unlockedBadges: data.unlockedBadges,
    }),

  reset: () =>
    set({
      userId: null,
      xp: 0,
      level: 1,
      levelTitle: "Scribbler",
      streak: 0,
      lastVisitDate: null,
      unlockedBadges: [],
      recentXPGain: null,
      recentBadge: null,
    }),

  addXP: (amount, source) => {
    const state = get();
    const newXP = state.xp + amount;
    const newLevel = calculateLevel(newXP);
    const newLevelTitle = getLevelTitle(newLevel);
    set({
      xp: newXP,
      level: newLevel,
      levelTitle: newLevelTitle,
      recentXPGain: { amount, source },
    });
    if (state.userId) {
      saveGamification(state.userId, {
        xp: newXP,
        level: newLevel,
        level_title: newLevelTitle,
      });
    }
  },

  checkStreak: () => {
    const today = new Date().toISOString().split("T")[0];
    const { lastVisitDate, streak, userId } = get();

    if (lastVisitDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak: number;
    if (lastVisitDate === yesterdayStr) {
      newStreak = streak + 1;
    } else {
      newStreak = 1;
    }

    set({
      streak: newStreak,
      lastVisitDate: today,
    });

    if (userId) {
      saveGamification(userId, {
        streak: newStreak,
        last_visit_date: today,
      });
    }
  },

  unlockBadge: (badgeId) => {
    const state = get();
    if (state.unlockedBadges.includes(badgeId)) return;
    const unlockedBadges = [...state.unlockedBadges, badgeId];
    set({
      unlockedBadges,
      recentBadge: badgeId,
    });
    if (state.userId) {
      saveGamification(state.userId, {
        unlocked_badges: unlockedBadges,
      });
    }
  },

  hasBadge: (badgeId) => get().unlockedBadges.includes(badgeId),

  clearRecentXP: () => set({ recentXPGain: null }),
  clearRecentBadge: () => set({ recentBadge: null }),
}));
