"use client";

import { useEffect } from "react";
import { Settings } from "lucide-react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import type { ProviderName } from "@/lib/providers";

export default function ProviderSelector() {
  const { provider, availableProviders, setProvider, setAvailableProviders } =
    useSettingsStore();

  useEffect(() => {
    fetch("/api/providers")
      .then((res) => res.json())
      .then((data) => setAvailableProviders(data.providers))
      .catch(() => {});
  }, [setAvailableProviders]);

  if (availableProviders.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Settings className="w-4 h-4 text-[var(--muted)]" />
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value as ProviderName)}
        className="text-xs px-2 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-foreground focus:outline-none focus:border-[var(--accent)]/50 transition-colors cursor-pointer"
      >
        {availableProviders.map((p) => (
          <option key={p.name} value={p.name} disabled={!p.configured}>
            {p.displayName}
            {!p.configured ? " (not configured)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
