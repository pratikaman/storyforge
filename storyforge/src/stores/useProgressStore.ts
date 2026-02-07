import { create } from "zustand";
import { saveProgress, debouncedSaveProgress } from "@/lib/supabase/sync";

interface QuizScore {
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
}

interface ProgressState {
  userId: string | null;
  completedLessons: string[];
  quizScores: Record<string, QuizScore>;
  currentModule: string | null;
  currentLesson: string | null;
  submittedExercises: string[];

  setUserId: (userId: string | null) => void;
  hydrate: (data: {
    completedLessons: string[];
    quizScores: Record<string, QuizScore>;
    currentModule: string | null;
    currentLesson: string | null;
    submittedExercises: string[];
  }) => void;
  reset: () => void;
  completeLesson: (lessonId: string) => void;
  saveQuizScore: (lessonId: string, score: number, total: number) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  submitExercise: (exerciseId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isModuleCompleted: (moduleId: string, lessonIds: string[]) => boolean;
  getModuleProgress: (moduleId: string, lessonIds: string[]) => number;
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  userId: null,
  completedLessons: [],
  quizScores: {},
  currentModule: null,
  currentLesson: null,
  submittedExercises: [],

  setUserId: (userId) => set({ userId }),

  hydrate: (data) =>
    set({
      completedLessons: data.completedLessons,
      quizScores: data.quizScores,
      currentModule: data.currentModule,
      currentLesson: data.currentLesson,
      submittedExercises: data.submittedExercises,
    }),

  reset: () =>
    set({
      userId: null,
      completedLessons: [],
      quizScores: {},
      currentModule: null,
      currentLesson: null,
      submittedExercises: [],
    }),

  completeLesson: (lessonId) => {
    const state = get();
    if (state.completedLessons.includes(lessonId)) return;
    const completedLessons = [...state.completedLessons, lessonId];
    set({ completedLessons });
    if (state.userId) {
      saveProgress(state.userId, { completed_lessons: completedLessons });
    }
  },

  saveQuizScore: (lessonId, score, total) => {
    const state = get();
    const quizScores = {
      ...state.quizScores,
      [lessonId]: {
        lessonId,
        score,
        total,
        completedAt: new Date().toISOString(),
      },
    };
    set({ quizScores });
    if (state.userId) {
      saveProgress(state.userId, { quiz_scores: quizScores });
    }
  },

  setCurrentModule: (moduleId) => {
    set({ currentModule: moduleId });
    const { userId } = get();
    if (userId) {
      debouncedSaveProgress(userId, { current_module: moduleId });
    }
  },

  setCurrentLesson: (lessonId) => {
    set({ currentLesson: lessonId });
    const { userId } = get();
    if (userId) {
      debouncedSaveProgress(userId, { current_lesson: lessonId });
    }
  },

  submitExercise: (exerciseId) => {
    const state = get();
    if (state.submittedExercises.includes(exerciseId)) return;
    const submittedExercises = [...state.submittedExercises, exerciseId];
    set({ submittedExercises });
    if (state.userId) {
      saveProgress(state.userId, {
        submitted_exercises: submittedExercises,
      });
    }
  },

  isLessonCompleted: (lessonId) =>
    get().completedLessons.includes(lessonId),

  isModuleCompleted: (moduleId, lessonIds) =>
    lessonIds.every((id) => get().completedLessons.includes(id)),

  getModuleProgress: (moduleId, lessonIds) => {
    if (lessonIds.length === 0) return 0;
    const completed = lessonIds.filter((id) =>
      get().completedLessons.includes(id)
    ).length;
    return Math.round((completed / lessonIds.length) * 100);
  },
}));
