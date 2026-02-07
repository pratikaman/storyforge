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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
              isUnlocked
                ? "border-gold-500/30 bg-gold-500/5"
                : "border-[var(--border)] bg-[var(--surface)] opacity-40"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isUnlocked
                  ? "bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900"
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
