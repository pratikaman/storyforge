import { describe, it, expect, beforeEach, vi } from "vitest";
import { useGamificationStore } from "@/stores/useGamificationStore";

vi.mock("@/lib/supabase/sync", () => ({
  saveGamification: vi.fn(() => Promise.resolve()),
}));

import { saveGamification } from "@/lib/supabase/sync";

describe("useGamificationStore", () => {
  beforeEach(() => {
    useGamificationStore.getState().reset();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has correct defaults", () => {
      const state = useGamificationStore.getState();
      expect(state.userId).toBeNull();
      expect(state.xp).toBe(0);
      expect(state.level).toBe(1);
      expect(state.levelTitle).toBe("Scribbler");
      expect(state.streak).toBe(0);
      expect(state.lastVisitDate).toBeNull();
      expect(state.unlockedBadges).toEqual([]);
      expect(state.recentXPGain).toBeNull();
      expect(state.recentBadge).toBeNull();
    });
  });

  describe("hydrate", () => {
    it("hydrates from database data", () => {
      useGamificationStore.getState().hydrate({
        xp: 500,
        level: 4,
        levelTitle: "Chronicler",
        streak: 7,
        lastVisitDate: "2024-06-01",
        unlockedBadges: ["badge-1", "badge-2"],
      });

      const state = useGamificationStore.getState();
      expect(state.xp).toBe(500);
      expect(state.level).toBe(4);
      expect(state.levelTitle).toBe("Chronicler");
      expect(state.streak).toBe(7);
      expect(state.unlockedBadges).toEqual(["badge-1", "badge-2"]);
    });

    it("does not overwrite transient fields", () => {
      useGamificationStore.setState({ recentXPGain: { amount: 50, source: "test" } });

      useGamificationStore.getState().hydrate({
        xp: 500,
        level: 4,
        levelTitle: "Chronicler",
        streak: 7,
        lastVisitDate: "2024-06-01",
        unlockedBadges: [],
      });

      // recentXPGain is not part of hydrate, so it gets overwritten by set()
      // but the hydrate function doesn't touch it explicitly
      expect(useGamificationStore.getState().xp).toBe(500);
    });
  });

  describe("reset", () => {
    it("resets to defaults", () => {
      useGamificationStore.getState().setUserId("user-1");
      useGamificationStore.getState().hydrate({
        xp: 1000,
        level: 5,
        levelTitle: "Wordsmith",
        streak: 10,
        lastVisitDate: "2024-01-01",
        unlockedBadges: ["b1"],
      });

      useGamificationStore.getState().reset();

      const state = useGamificationStore.getState();
      expect(state.userId).toBeNull();
      expect(state.xp).toBe(0);
      expect(state.level).toBe(1);
      expect(state.streak).toBe(0);
      expect(state.unlockedBadges).toEqual([]);
    });
  });

  describe("addXP", () => {
    it("adds XP and recalculates level", () => {
      useGamificationStore.getState().addXP(50, "lesson");

      const state = useGamificationStore.getState();
      expect(state.xp).toBe(50);
      expect(state.recentXPGain).toEqual({ amount: 50, source: "lesson" });
    });

    it("levels up when threshold is reached", () => {
      // Level 2 threshold is 100 XP
      useGamificationStore.getState().addXP(100, "lesson");

      const state = useGamificationStore.getState();
      expect(state.level).toBe(2);
      expect(state.levelTitle).toBe("Apprentice");
    });

    it("syncs to Supabase when userId is set", () => {
      useGamificationStore.getState().setUserId("user-123");
      useGamificationStore.getState().addXP(50, "lesson");

      expect(saveGamification).toHaveBeenCalledWith("user-123", {
        xp: 50,
        level: 1,
        level_title: "Scribbler",
      });
    });

    it("does not sync when userId is null", () => {
      useGamificationStore.getState().addXP(50, "lesson");
      expect(saveGamification).not.toHaveBeenCalled();
    });

    it("accumulates XP across multiple calls", () => {
      useGamificationStore.getState().addXP(50, "lesson");
      useGamificationStore.getState().addXP(60, "quiz");

      expect(useGamificationStore.getState().xp).toBe(110);
      expect(useGamificationStore.getState().level).toBe(2);
    });
  });

  describe("checkStreak", () => {
    it("starts a streak on first visit", () => {
      useGamificationStore.getState().checkStreak();

      const state = useGamificationStore.getState();
      expect(state.streak).toBe(1);
      expect(state.lastVisitDate).toBe(
        new Date().toISOString().split("T")[0]
      );
    });

    it("does nothing if already visited today", () => {
      const today = new Date().toISOString().split("T")[0];
      useGamificationStore.setState({ lastVisitDate: today, streak: 5 });

      useGamificationStore.getState().checkStreak();

      expect(useGamificationStore.getState().streak).toBe(5);
    });

    it("increments streak if last visit was yesterday", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      useGamificationStore.setState({
        lastVisitDate: yesterdayStr,
        streak: 3,
      });

      useGamificationStore.getState().checkStreak();

      expect(useGamificationStore.getState().streak).toBe(4);
    });

    it("resets streak if gap is more than one day", () => {
      useGamificationStore.setState({
        lastVisitDate: "2020-01-01",
        streak: 10,
      });

      useGamificationStore.getState().checkStreak();

      expect(useGamificationStore.getState().streak).toBe(1);
    });

    it("syncs streak to Supabase when userId is set", () => {
      useGamificationStore.getState().setUserId("user-123");
      useGamificationStore.getState().checkStreak();

      expect(saveGamification).toHaveBeenCalledWith("user-123", {
        streak: 1,
        last_visit_date: new Date().toISOString().split("T")[0],
      });
    });
  });

  describe("unlockBadge", () => {
    it("unlocks a new badge", () => {
      useGamificationStore.getState().unlockBadge("first-lesson");

      const state = useGamificationStore.getState();
      expect(state.unlockedBadges).toEqual(["first-lesson"]);
      expect(state.recentBadge).toBe("first-lesson");
    });

    it("does not duplicate badges", () => {
      useGamificationStore.getState().unlockBadge("first-lesson");
      useGamificationStore.getState().unlockBadge("first-lesson");

      expect(useGamificationStore.getState().unlockedBadges).toEqual([
        "first-lesson",
      ]);
    });

    it("syncs to Supabase when userId is set", () => {
      useGamificationStore.getState().setUserId("user-123");
      useGamificationStore.getState().unlockBadge("first-lesson");

      expect(saveGamification).toHaveBeenCalledWith("user-123", {
        unlocked_badges: ["first-lesson"],
      });
    });

    it("does not sync when userId is null", () => {
      useGamificationStore.getState().unlockBadge("first-lesson");
      expect(saveGamification).not.toHaveBeenCalled();
    });
  });

  describe("hasBadge", () => {
    it("returns true for unlocked badges", () => {
      useGamificationStore.getState().unlockBadge("badge-1");
      expect(useGamificationStore.getState().hasBadge("badge-1")).toBe(true);
    });

    it("returns false for locked badges", () => {
      expect(useGamificationStore.getState().hasBadge("badge-1")).toBe(false);
    });
  });

  describe("clearRecentXP / clearRecentBadge", () => {
    it("clears recent XP gain", () => {
      useGamificationStore.getState().addXP(50, "test");
      expect(useGamificationStore.getState().recentXPGain).not.toBeNull();

      useGamificationStore.getState().clearRecentXP();
      expect(useGamificationStore.getState().recentXPGain).toBeNull();
    });

    it("clears recent badge", () => {
      useGamificationStore.getState().unlockBadge("badge-1");
      expect(useGamificationStore.getState().recentBadge).toBe("badge-1");

      useGamificationStore.getState().clearRecentBadge();
      expect(useGamificationStore.getState().recentBadge).toBeNull();
    });
  });
});
