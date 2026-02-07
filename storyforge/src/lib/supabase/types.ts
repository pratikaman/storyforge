export interface ProfileRow {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProgressRow {
  id: string;
  user_id: string;
  completed_lessons: string[];
  quiz_scores: Record<string, { lessonId: string; score: number; total: number; completedAt: string }>;
  current_module: string | null;
  current_lesson: string | null;
  submitted_exercises: string[];
  created_at: string;
  updated_at: string;
}

export interface GamificationRow {
  id: string;
  user_id: string;
  xp: number;
  level: number;
  level_title: string;
  streak: number;
  last_visit_date: string | null;
  unlocked_badges: string[];
  created_at: string;
  updated_at: string;
}

export interface SettingsRow {
  id: string;
  user_id: string;
  provider: string;
  theme: "dark" | "light";
  created_at: string;
  updated_at: string;
}
