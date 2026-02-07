"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "from-orange-500 to-amber-500",
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
          <span>{percentage}% complete</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
      <div
        className={`w-full ${heights[size]} bg-[var(--surface)] rounded-full overflow-hidden`}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
