import { describe, it, expect, beforeEach, vi } from "vitest";
import { useSettingsStore } from "@/stores/useSettingsStore";

vi.mock("@/lib/supabase/sync", () => ({
  saveSettings: vi.fn(() => Promise.resolve()),
}));

import { saveSettings } from "@/lib/supabase/sync";

describe("useSettingsStore", () => {
  beforeEach(() => {
    useSettingsStore.getState().reset();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has correct defaults", () => {
      const state = useSettingsStore.getState();
      expect(state.userId).toBeNull();
      expect(state.provider).toBe("anthropic");
      expect(state.availableProviders).toEqual([]);
    });
  });

  describe("setUserId", () => {
    it("sets user ID", () => {
      useSettingsStore.getState().setUserId("user-123");
      expect(useSettingsStore.getState().userId).toBe("user-123");
    });
  });

  describe("hydrateFromDb", () => {
    it("hydrates provider from DB data", () => {
      useSettingsStore.getState().hydrateFromDb({ provider: "openrouter" });
      expect(useSettingsStore.getState().provider).toBe("openrouter");
    });

    it("falls back to anthropic for empty provider", () => {
      useSettingsStore.getState().hydrateFromDb({ provider: "" });
      expect(useSettingsStore.getState().provider).toBe("anthropic");
    });
  });

  describe("reset", () => {
    it("resets to defaults", () => {
      useSettingsStore.getState().setUserId("user-123");
      useSettingsStore.getState().hydrateFromDb({ provider: "openrouter" });

      useSettingsStore.getState().reset();

      const state = useSettingsStore.getState();
      expect(state.userId).toBeNull();
      expect(state.provider).toBe("anthropic");
    });
  });

  describe("setProvider", () => {
    it("sets the provider", () => {
      useSettingsStore.getState().setProvider("bedrock");
      expect(useSettingsStore.getState().provider).toBe("bedrock");
    });

    it("syncs to Supabase when userId is set", () => {
      useSettingsStore.getState().setUserId("user-123");
      useSettingsStore.getState().setProvider("openrouter");

      expect(saveSettings).toHaveBeenCalledWith("user-123", {
        provider: "openrouter",
      });
    });

    it("does not sync when userId is null", () => {
      useSettingsStore.getState().setProvider("openrouter");
      expect(saveSettings).not.toHaveBeenCalled();
    });
  });

  describe("setAvailableProviders", () => {
    it("sets the available providers list", () => {
      const providers = [
        {
          name: "anthropic" as const,
          displayName: "Anthropic",
          description: "Direct API",
          model: "claude-3",
          configured: true,
        },
      ];

      useSettingsStore.getState().setAvailableProviders(providers);
      expect(useSettingsStore.getState().availableProviders).toEqual(providers);
    });
  });
});
