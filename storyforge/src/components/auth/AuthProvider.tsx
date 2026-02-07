"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { loadUserData } from "@/lib/supabase/sync";
import { useProgressStore } from "@/stores/useProgressStore";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useThemeStore } from "@/stores/useThemeStore";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

async function migrateLocalStorage(userId: string) {
  const supabase = createClient();

  // Check if user has default (empty) data in Supabase
  const { data: progress } = await supabase
    .from("user_progress")
    .select("completed_lessons")
    .eq("user_id", userId)
    .single();

  if (progress && progress.completed_lessons && progress.completed_lessons.length > 0) {
    // User already has cloud data, skip migration
    return;
  }

  // Check for old localStorage data
  const localProgress = localStorage.getItem("storyforge-progress");
  const localGamification = localStorage.getItem("storyforge-gamification");
  const localSettings = localStorage.getItem("storyforge-settings");
  const localTheme = localStorage.getItem("storyforge-theme");

  if (!localProgress && !localGamification && !localSettings && !localTheme) {
    return; // Nothing to migrate
  }

  try {
    if (localProgress) {
      const parsed = JSON.parse(localProgress);
      const state = parsed.state || parsed;
      if (state.completedLessons?.length > 0 || Object.keys(state.quizScores || {}).length > 0) {
        await supabase.from("user_progress").update({
          completed_lessons: state.completedLessons || [],
          quiz_scores: state.quizScores || {},
          current_module: state.currentModule || null,
          current_lesson: state.currentLesson || null,
          submitted_exercises: state.submittedExercises || [],
        }).eq("user_id", userId);
      }
    }

    if (localGamification) {
      const parsed = JSON.parse(localGamification);
      const state = parsed.state || parsed;
      if (state.xp > 0 || state.unlockedBadges?.length > 0) {
        await supabase.from("user_gamification").update({
          xp: state.xp || 0,
          level: state.level || 1,
          level_title: state.levelTitle || "Scribbler",
          streak: state.streak || 0,
          last_visit_date: state.lastVisitDate || null,
          unlocked_badges: state.unlockedBadges || [],
        }).eq("user_id", userId);
      }
    }

    if (localSettings) {
      const parsed = JSON.parse(localSettings);
      const state = parsed.state || parsed;
      if (state.provider && state.provider !== "anthropic") {
        await supabase.from("user_settings").update({
          provider: state.provider,
        }).eq("user_id", userId);
      }
    }

    if (localTheme) {
      const parsed = JSON.parse(localTheme);
      const state = parsed.state || parsed;
      if (state.theme && state.theme !== "dark") {
        await supabase.from("user_settings").update({
          theme: state.theme,
        }).eq("user_id", userId);
      }
    }

    // Clean up localStorage
    localStorage.removeItem("storyforge-progress");
    localStorage.removeItem("storyforge-gamification");
    localStorage.removeItem("storyforge-settings");
    localStorage.removeItem("storyforge-theme");
  } catch (err) {
    console.error("localStorage migration error:", err);
  }
}

async function hydrateStores(userId: string) {
  const data = await loadUserData(userId);
  if (!data) return;

  const { progress, gamification, settings } = data;

  if (progress) {
    useProgressStore.getState().hydrate({
      completedLessons: progress.completed_lessons || [],
      quizScores: progress.quiz_scores || {},
      currentModule: progress.current_module || null,
      currentLesson: progress.current_lesson || null,
      submittedExercises: progress.submitted_exercises || [],
    });
    useProgressStore.getState().setUserId(userId);
  }

  if (gamification) {
    useGamificationStore.getState().hydrate({
      xp: gamification.xp,
      level: gamification.level,
      levelTitle: gamification.level_title,
      streak: gamification.streak,
      lastVisitDate: gamification.last_visit_date,
      unlockedBadges: gamification.unlocked_badges || [],
    });
    useGamificationStore.getState().setUserId(userId);
  }

  if (settings) {
    useSettingsStore.getState().hydrateFromDb({
      provider: settings.provider,
    });
    useSettingsStore.getState().setUserId(userId);
  }

  if (settings) {
    useThemeStore.getState().setUserId(userId);
    useThemeStore.getState().setTheme(settings.theme as "dark" | "light");
  }
}

function resetStores() {
  useProgressStore.getState().reset();
  useGamificationStore.getState().reset();
  useSettingsStore.getState().reset();
  useThemeStore.getState().setUserId(null);
}

export default function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Initial hydration
    if (initialUser) {
      migrateLocalStorage(initialUser.id).then(() => {
        hydrateStores(initialUser.id).then(() => setLoading(false));
      });
    } else {
      setLoading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (event === "SIGNED_IN" && currentUser) {
        await migrateLocalStorage(currentUser.id);
        await hydrateStores(currentUser.id);
        setLoading(false);
      }

      if (event === "SIGNED_OUT") {
        resetStores();
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
