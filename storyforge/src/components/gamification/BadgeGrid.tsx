"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Zap,
  Library,
  GraduationCap,
  Trophy,
  Crown,
  Flame,
  Sparkles,
  PenTool,
  FileText,
  Star,
  Award,
  Medal,
  Gem,
} from "lucide-react";
import { badges as badgeDefinitions } from "@/data/badges";
import { useGamificationStore } from "@/stores/useGamificationStore";

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Zap,
  Library,
  GraduationCap,
  Trophy,
  Crown,
  Flame,
  Fire: Flame,
  Sparkles,
  PenTool,
  FileText,
  Star,
  Award,
  Medal,
  Gem,
};

export default function BadgeGrid() {
  const { unlockedBadges } = useGamificationStore();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
      {badgeDefinitions.map((badge, index) => {
        const isUnlocked = unlockedBadges.includes(badge.id);
        const Icon = iconMap[badge.icon] || Star;

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--surface)] shadow-sm transition-all ${
              isUnlocked ? "" : "opacity-40"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isUnlocked
                  ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                  : "bg-[var(--surface-2)] text-[var(--muted)]"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p
                className={`text-xs font-semibold ${
                  isUnlocked ? "text-foreground" : "text-[var(--muted)]"
                }`}
              >
                {badge.name}
              </p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">
                {badge.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
