"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { getLevelProgress, getXPForNextLevel, getXPForLevel } from "@/lib/xp";
import { useEffect } from "react";

export default function XPBar() {
  const { xp, level, levelTitle, recentXPGain, clearRecentXP } =
    useGamificationStore();

  const progress = getLevelProgress(xp, level);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForNextLevel(level);

  useEffect(() => {
    if (recentXPGain) {
      const timer = setTimeout(clearRecentXP, 3000);
      return () => clearTimeout(timer);
    }
  }, [recentXPGain, clearRecentXP]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-navy-900 text-sm">
            {level}
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">{levelTitle}</p>
            <p className="text-xs text-[var(--muted)]">
              {xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* XP Gain Popup */}
      <AnimatePresence>
        {recentXPGain && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute -top-8 right-0 flex items-center gap-1 px-2 py-1 rounded-full bg-gold-500 text-navy-900 text-xs font-bold shadow-lg"
          >
            <Sparkles className="w-3 h-3" />+{recentXPGain.amount} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
