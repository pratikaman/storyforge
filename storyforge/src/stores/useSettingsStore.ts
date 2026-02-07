import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProviderName } from "@/lib/providers";

interface ProviderInfo {
  name: ProviderName;
  displayName: string;
  description: string;
  model: string;
  configured: boolean;
}

interface SettingsState {
  provider: ProviderName;
  availableProviders: ProviderInfo[];
  setProvider: (provider: ProviderName) => void;
  setAvailableProviders: (providers: ProviderInfo[]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      provider: "anthropic",
      availableProviders: [],
      setProvider: (provider) => set({ provider }),
      setAvailableProviders: (availableProviders) => set({ availableProviders }),
    }),
    {
      name: "storyforge-settings",
      partialize: (state) => ({ provider: state.provider }),
    }
  )
);
