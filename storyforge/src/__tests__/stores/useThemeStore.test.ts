import { describe, it, expect, beforeEach, vi } from "vitest";
import { useThemeStore } from "@/stores/useThemeStore";

vi.mock("@/lib/supabase/sync", () => ({
  saveSettings: vi.fn(() => Promise.resolve()),
}));

import { saveSettings } from "@/lib/supabase/sync";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ userId: null, theme: "dark" });
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has correct defaults", () => {
      const state = useThemeStore.getState();
      expect(state.userId).toBeNull();
      expect(state.theme).toBe("dark");
    });
  });

  describe("setUserId", () => {
    it("sets the user ID", () => {
      useThemeStore.getState().setUserId("user-123");
      expect(useThemeStore.getState().userId).toBe("user-123");
    });

    it("can clear the user ID", () => {
      useThemeStore.getState().setUserId("user-123");
      useThemeStore.getState().setUserId(null);
      expect(useThemeStore.getState().userId).toBeNull();
    });
  });

  describe("toggleTheme", () => {
    it("toggles from dark to light", () => {
      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().theme).toBe("light");
    });

    it("toggles from light to dark", () => {
      useThemeStore.setState({ theme: "light" });
      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().theme).toBe("dark");
    });

    it("syncs to Supabase when userId is set", () => {
      useThemeStore.getState().setUserId("user-123");
      useThemeStore.getState().toggleTheme();

      expect(saveSettings).toHaveBeenCalledWith("user-123", {
        theme: "light",
      });
    });

    it("does not sync when userId is null", () => {
      useThemeStore.getState().toggleTheme();
      expect(saveSettings).not.toHaveBeenCalled();
    });
  });

  describe("setTheme", () => {
    it("sets a specific theme", () => {
      useThemeStore.getState().setTheme("light");
      expect(useThemeStore.getState().theme).toBe("light");
    });

    it("syncs to Supabase when userId is set", () => {
      useThemeStore.getState().setUserId("user-123");
      useThemeStore.getState().setTheme("light");

      expect(saveSettings).toHaveBeenCalledWith("user-123", {
        theme: "light",
      });
    });

    it("does not sync when userId is null", () => {
      useThemeStore.getState().setTheme("light");
      expect(saveSettings).not.toHaveBeenCalled();
    });
  });
});
