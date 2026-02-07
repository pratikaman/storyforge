"use client";

import { motion } from "framer-motion";
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
      <motion.div
        className={`${sizes[size]} rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-navy-900 shadow-lg shadow-gold-500/20`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {level}
      </motion.div>
      <span className="text-xs font-medium text-[var(--muted)]">
        {levelTitle}
      </span>
    </div>
  );
}
