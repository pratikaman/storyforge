"use client";

import { Flame } from "lucide-react";
import { useGamificationStore } from "@/stores/useGamificationStore";

export default function StreakCounter({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { streak } = useGamificationStore();

  const sizes = {
    sm: { icon: 16, text: "text-sm", container: "gap-1" },
    md: { icon: 20, text: "text-base", container: "gap-1.5" },
    lg: { icon: 28, text: "text-xl", container: "gap-2" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.container}`}>
      <Flame
        size={s.icon}
        className={streak > 0 ? "text-orange-500" : "text-[var(--muted)]"}
        fill={streak > 0 ? "currentColor" : "none"}
      />
      <span
        className={`font-mono font-bold ${s.text} ${
          streak > 0 ? "text-orange-500" : "text-[var(--muted)]"
        }`}
      >
        {streak}
      </span>
      <span className="text-xs text-[var(--muted)]">
        {streak === 1 ? "day" : "days"}
      </span>
    </div>
  );
}
