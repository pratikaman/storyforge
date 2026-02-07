import { describe, it, expect, vi, beforeEach } from "vitest";

// We need to mock createClient before importing sync
const mockUpdate = vi.fn(() => ({
  eq: vi.fn(() => Promise.resolve({ data: null, error: null })),
}));

const mockSelect = vi.fn(() => ({
  eq: vi.fn(() => ({
    single: vi.fn(() => Promise.resolve({ data: { user_id: "u1" }, error: null })),
  })),
}));

const mockFrom = vi.fn(() => ({
  select: mockSelect,
  update: mockUpdate,
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

// Import after mocking
import { loadUserData, saveProgress, saveGamification, saveSettings } from "@/lib/supabase/sync";

describe("sync utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loadUserData", () => {
    it("calls all three tables in parallel", async () => {
      await loadUserData("user-123");

      expect(mockFrom).toHaveBeenCalledWith("user_progress");
      expect(mockFrom).toHaveBeenCalledWith("user_gamification");
      expect(mockFrom).toHaveBeenCalledWith("user_settings");
      expect(mockFrom).toHaveBeenCalledTimes(3);
    });

    it("returns structured data", async () => {
      const result = await loadUserData("user-123");

      expect(result).toHaveProperty("progress");
      expect(result).toHaveProperty("gamification");
      expect(result).toHaveProperty("settings");
    });
  });

  describe("saveProgress", () => {
    it("updates user_progress table", async () => {
      await saveProgress("user-123", { completed_lessons: ["l1", "l2"] });

      expect(mockFrom).toHaveBeenCalledWith("user_progress");
      expect(mockUpdate).toHaveBeenCalledWith({
        completed_lessons: ["l1", "l2"],
      });
    });
  });

  describe("saveGamification", () => {
    it("updates user_gamification table", async () => {
      await saveGamification("user-123", { xp: 100, level: 2 });

      expect(mockFrom).toHaveBeenCalledWith("user_gamification");
      expect(mockUpdate).toHaveBeenCalledWith({ xp: 100, level: 2 });
    });
  });

  describe("saveSettings", () => {
    it("updates user_settings table", async () => {
      await saveSettings("user-123", { theme: "light" });

      expect(mockFrom).toHaveBeenCalledWith("user_settings");
      expect(mockUpdate).toHaveBeenCalledWith({ theme: "light" });
    });
  });
});
