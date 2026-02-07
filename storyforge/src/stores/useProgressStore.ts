import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizScore {
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
}

interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, QuizScore>;
  currentModule: string | null;
  currentLesson: string | null;
  submittedExercises: string[];

  completeLesson: (lessonId: string) => void;
  saveQuizScore: (lessonId: string, score: number, total: number) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  submitExercise: (exerciseId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isModuleCompleted: (moduleId: string, lessonIds: string[]) => boolean;
  getModuleProgress: (moduleId: string, lessonIds: string[]) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},
      currentModule: null,
      currentLesson: null,
      submittedExercises: [],

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),

      saveQuizScore: (lessonId, score, total) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [lessonId]: {
              lessonId,
              score,
              total,
              completedAt: new Date().toISOString(),
            },
          },
        })),

      setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
      setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),

      submitExercise: (exerciseId) =>
        set((state) => ({
          submittedExercises: state.submittedExercises.includes(exerciseId)
            ? state.submittedExercises
            : [...state.submittedExercises, exerciseId],
        })),

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
    }),
    {
      name: "storyforge-progress",
    }
  )
);
