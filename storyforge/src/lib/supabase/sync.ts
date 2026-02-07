import { createClient } from "./client";
import type { ProgressRow, GamificationRow, SettingsRow } from "./types";

// ─── Load all user data in parallel ──────────────────────
export async function loadUserData(userId: string) {
  const supabase = createClient();

  const [progressRes, gamificationRes, settingsRes] = await Promise.all([
    supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single(),
    supabase
      .from("user_gamification")
      .select("*")
      .eq("user_id", userId)
      .single(),
    supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .single(),
  ]);

  return {
    progress: progressRes.data as ProgressRow | null,
    gamification: gamificationRes.data as GamificationRow | null,
    settings: settingsRes.data as SettingsRow | null,
  };
}

// ─── Save helpers ────────────────────────────────────────
export async function saveProgress(
  userId: string,
  data: Partial<{
    completed_lessons: string[];
    quiz_scores: Record<string, unknown>;
    current_module: string | null;
    current_lesson: string | null;
    submitted_exercises: string[];
  }>
) {
  const supabase = createClient();
  await supabase.from("user_progress").update(data).eq("user_id", userId);
}

export async function saveGamification(
  userId: string,
  data: Partial<{
    xp: number;
    level: number;
    level_title: string;
    streak: number;
    last_visit_date: string | null;
    unlocked_badges: string[];
  }>
) {
  const supabase = createClient();
  await supabase.from("user_gamification").update(data).eq("user_id", userId);
}

export async function saveSettings(
  userId: string,
  data: Partial<{
    provider: string;
    theme: string;
  }>
) {
  const supabase = createClient();
  await supabase.from("user_settings").update(data).eq("user_id", userId);
}

// ─── Debounce utility ────────────────────────────────────
function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  ms: number
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export const debouncedSaveProgress = debounce(
  (userId: string, data: Parameters<typeof saveProgress>[1]) =>
    saveProgress(userId, data),
  500
);

export const debouncedSaveSettings = debounce(
  (userId: string, data: Parameters<typeof saveSettings>[1]) =>
    saveSettings(userId, data),
  500
);
