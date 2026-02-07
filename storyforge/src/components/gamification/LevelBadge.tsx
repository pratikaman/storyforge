"use client";

import { useGamificationStore } from "@/stores/useGamificationStore";

export default function LevelBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { level, levelTitle } = useGamificationStore();

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizes[size]} rounded-full border-2 border-[var(--accent)] flex items-center justify-center font-mono font-bold text-[var(--accent)]`}
      >
        {level}
      </div>
      <span className="text-xs font-medium text-[var(--muted)]">
        {levelTitle}
      </span>
    </div>
  );
}
