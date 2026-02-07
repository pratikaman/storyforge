"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  BookOpen,
  PenTool,
  Target,
  TrendingUp,
} from "lucide-react";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { useProgressStore } from "@/stores/useProgressStore";

import { modules } from "@/data/curriculum";
import XPBar from "@/components/gamification/XPBar";
import StreakCounter from "@/components/gamification/StreakCounter";
import LevelBadge from "@/components/gamification/LevelBadge";
import BadgeGrid from "@/components/gamification/BadgeGrid";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProfilePage() {
  const { xp, level, levelTitle, streak, unlockedBadges } =
    useGamificationStore();
  const { completedLessons, quizScores, submittedExercises } =
    useProgressStore();

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const avgQuizScore =
    Object.values(quizScores).length > 0
      ? Math.round(
          (Object.values(quizScores).reduce(
            (a, q) => a + (q.score / q.total) * 100,
            0
          ) /
            Object.values(quizScores).length)
        )
      : 0;

  const stats = [
    {
      label: "Total XP",
      value: xp.toLocaleString(),
      icon: TrendingUp,
      color: "text-gold-500",
    },
    {
      label: "Lessons Done",
      value: `${completedLessons.length}/${totalLessons}`,
      icon: BookOpen,
      color: "text-blue-400",
    },
    {
      label: "Exercises",
      value: submittedExercises.length.toString(),
      icon: PenTool,
      color: "text-emerald-500",
    },
    {
      label: "Avg Quiz",
      value: `${avgQuizScore}%`,
      icon: Target,
      color: "text-purple-400",
    },
    {
      label: "Day Streak",
      value: streak.toString(),
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Badges",
      value: `${unlockedBadges.length}/15`,
      icon: Trophy,
      color: "text-gold-500",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Your <span className="text-gradient">Profile</span>
        </h1>
        <p className="text-[var(--muted)]">
          Track your progress, celebrate achievements, and see how far
          you&apos;ve come.
        </p>
      </motion.div>

      {/* Level & XP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl border border-gold-500/20 bg-gold-500/5 mb-8"
      >
        <div className="flex items-center gap-6 mb-4">
          <LevelBadge size="lg" />
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold">{levelTitle}</h2>
            <p className="text-sm text-[var(--muted)]">Level {level}</p>
          </div>
          <StreakCounter size="lg" />
        </div>
        <XPBar />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center"
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="font-display text-2xl font-bold mb-6">
          Module Progress
        </h2>
        <div className="space-y-3">
          {modules.map((mod) => {
            const lessonIds = mod.lessons.map((l) => l.id);
            const completed = lessonIds.filter((id) =>
              completedLessons.includes(id)
            ).length;
            return (
              <div
                key={mod.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <span className="text-xl">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{mod.title}</p>
                  <ProgressBar
                    value={completed}
                    max={lessonIds.length}
                    size="sm"
                    animated={false}
                  />
                </div>
                <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                  {completed}/{lessonIds.length}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-display text-2xl font-bold mb-6">Badges</h2>
        <BadgeGrid />
      </motion.div>
    </div>
  );
}
