"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Flame,
  BookOpen,
  PenTool,
  Target,
  TrendingUp,
  LogOut,
  Calendar,
} from "lucide-react";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { useProgressStore } from "@/stores/useProgressStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAuth } from "@/components/auth/AuthProvider";

import { modules } from "@/data/curriculum";
import XPBar from "@/components/gamification/XPBar";
import StreakCounter from "@/components/gamification/StreakCounter";
import LevelBadge from "@/components/gamification/LevelBadge";
import BadgeGrid from "@/components/gamification/BadgeGrid";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProfilePage() {
  const { user } = useAuth();
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

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Writer";

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  function handleLogout() {
    useProgressStore.getState().reset();
    useGamificationStore.getState().reset();
    useSettingsStore.getState().reset();
    useThemeStore.getState().setUserId(null);
  }

  const stats = [
    { label: "Total XP", value: xp.toLocaleString(), color: "text-[var(--accent)]" },
    { label: "Lessons", value: `${completedLessons.length}/${totalLessons}`, color: "text-blue-400" },
    { label: "Exercises", value: submittedExercises.length.toString(), color: "text-emerald-500" },
    { label: "Avg Quiz", value: `${avgQuizScore}%`, color: "text-purple-400" },
    { label: "Streak", value: streak.toString(), color: "text-orange-500" },
    { label: "Badges", value: `${unlockedBadges.length}/15`, color: "text-[var(--accent)]" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Your Profile
        </h1>
        <p className="text-[var(--muted)]">
          Track your progress, celebrate achievements, and see how far
          you&apos;ve come.
        </p>
      </motion.div>

      {/* User Account Card */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-5 p-6 rounded-xl bg-[var(--surface)] shadow-sm mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-zinc-900 font-bold text-2xl shrink-0">
            {avatarLetter}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold truncate">
              {displayName}
            </h2>
            <p className="text-sm text-[var(--muted)] truncate">{user.email}</p>
            {memberSince && (
              <p className="flex items-center gap-1 text-xs text-[var(--muted)] mt-1">
                <Calendar className="w-3 h-3" />
                Member since {memberSince}
              </p>
            )}
          </div>
          <form action="/auth/signout" method="POST" onSubmit={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </form>
        </motion.div>
      )}

      {/* Level & XP */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl bg-[var(--surface)] shadow-sm mb-8"
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

      {/* Stats Grid — 3x2, just numbers + labels */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center py-3"
          >
            <p className={`font-mono text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[var(--muted)]">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="font-display text-2xl font-bold mb-6">
          Module Progress
        </h2>
        <div className="space-y-1">
          {modules.map((mod) => {
            const lessonIds = mod.lessons.map((l) => l.id);
            const completed = lessonIds.filter((id) =>
              completedLessons.includes(id)
            ).length;
            return (
              <div
                key={mod.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--surface)] transition-colors"
              >
                <span className="font-mono text-xs text-[var(--muted)] w-6">
                  {String(mod.order).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{mod.title}</p>
                </div>
                <div className="w-24">
                  <ProgressBar
                    value={completed}
                    max={lessonIds.length}
                    size="sm"
                    animated={false}
                  />
                </div>
                <span className="text-xs text-[var(--muted)] w-10 text-right">
                  {completed}/{lessonIds.length}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-display text-2xl font-bold mb-6">Badges</h2>
        <BadgeGrid />
      </motion.div>
    </div>
  );
}
