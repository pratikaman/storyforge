import { create } from "zustand";
import type { ProviderName } from "@/lib/providers";
import { saveSettings } from "@/lib/supabase/sync";

interface ProviderInfo {
  name: ProviderName;
  displayName: string;
  description: string;
  model: string;
  configured: boolean;
}

interface SettingsState {
  userId: string | null;
  provider: ProviderName;
  availableProviders: ProviderInfo[];

  setUserId: (userId: string | null) => void;
  hydrateFromDb: (data: { provider: string }) => void;
  reset: () => void;
  setProvider: (provider: ProviderName) => void;
  setAvailableProviders: (providers: ProviderInfo[]) => void;
}

export const useSettingsStore = create<SettingsState>()((set, get) => ({
  userId: null,
  provider: "anthropic",
  availableProviders: [],

  setUserId: (userId) => set({ userId }),

  hydrateFromDb: (data) =>
    set({
      provider: (data.provider as ProviderName) || "anthropic",
    }),

  reset: () =>
    set({
      userId: null,
      provider: "anthropic",
      availableProviders: [],
    }),

  setProvider: (provider) => {
    set({ provider });
    const { userId } = get();
    if (userId) {
      saveSettings(userId, { provider });
    }
  },

  setAvailableProviders: (availableProviders) => set({ availableProviders }),
}));
