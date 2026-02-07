import { describe, it, expect, beforeEach, vi } from "vitest";
import { useProgressStore } from "@/stores/useProgressStore";

// Mock the sync module
vi.mock("@/lib/supabase/sync", () => ({
  saveProgress: vi.fn(() => Promise.resolve()),
  debouncedSaveProgress: vi.fn(),
}));

import { saveProgress, debouncedSaveProgress } from "@/lib/supabase/sync";

describe("useProgressStore", () => {
  beforeEach(() => {
    useProgressStore.getState().reset();
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has empty defaults", () => {
      const state = useProgressStore.getState();
      expect(state.userId).toBeNull();
      expect(state.completedLessons).toEqual([]);
      expect(state.quizScores).toEqual({});
      expect(state.currentModule).toBeNull();
      expect(state.currentLesson).toBeNull();
      expect(state.submittedExercises).toEqual([]);
    });
  });

  describe("setUserId", () => {
    it("sets the user ID", () => {
      useProgressStore.getState().setUserId("user-123");
      expect(useProgressStore.getState().userId).toBe("user-123");
    });
  });

  describe("hydrate", () => {
    it("hydrates state from database data", () => {
      useProgressStore.getState().hydrate({
        completedLessons: ["lesson-1", "lesson-2"],
        quizScores: {
          "lesson-1": {
            lessonId: "lesson-1",
            score: 3,
            total: 5,
            completedAt: "2024-01-01",
          },
        },
        currentModule: "module-1",
        currentLesson: "lesson-1",
        submittedExercises: ["exercise-1"],
      });

      const state = useProgressStore.getState();
      expect(state.completedLessons).toEqual(["lesson-1", "lesson-2"]);
      expect(state.quizScores["lesson-1"].score).toBe(3);
      expect(state.currentModule).toBe("module-1");
      expect(state.currentLesson).toBe("lesson-1");
      expect(state.submittedExercises).toEqual(["exercise-1"]);
    });
  });

  describe("reset", () => {
    it("resets all state to defaults", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().hydrate({
        completedLessons: ["lesson-1"],
        quizScores: {},
        currentModule: "mod-1",
        currentLesson: "lesson-1",
        submittedExercises: ["ex-1"],
      });

      useProgressStore.getState().reset();

      const state = useProgressStore.getState();
      expect(state.userId).toBeNull();
      expect(state.completedLessons).toEqual([]);
      expect(state.currentModule).toBeNull();
    });
  });

  describe("completeLesson", () => {
    it("adds a lesson to completedLessons", () => {
      useProgressStore.getState().completeLesson("lesson-1");
      expect(useProgressStore.getState().completedLessons).toEqual(["lesson-1"]);
    });

    it("does not duplicate lessons", () => {
      useProgressStore.getState().completeLesson("lesson-1");
      useProgressStore.getState().completeLesson("lesson-1");
      expect(useProgressStore.getState().completedLessons).toEqual(["lesson-1"]);
    });

    it("syncs to Supabase when userId is set", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().completeLesson("lesson-1");

      expect(saveProgress).toHaveBeenCalledWith("user-123", {
        completed_lessons: ["lesson-1"],
      });
    });

    it("does not sync when userId is null", () => {
      useProgressStore.getState().completeLesson("lesson-1");
      expect(saveProgress).not.toHaveBeenCalled();
    });
  });

  describe("saveQuizScore", () => {
    it("saves a quiz score", () => {
      useProgressStore.getState().saveQuizScore("lesson-1", 4, 5);

      const scores = useProgressStore.getState().quizScores;
      expect(scores["lesson-1"].score).toBe(4);
      expect(scores["lesson-1"].total).toBe(5);
      expect(scores["lesson-1"].lessonId).toBe("lesson-1");
      expect(scores["lesson-1"].completedAt).toBeTruthy();
    });

    it("syncs to Supabase when userId is set", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().saveQuizScore("lesson-1", 4, 5);

      expect(saveProgress).toHaveBeenCalledWith(
        "user-123",
        expect.objectContaining({
          quiz_scores: expect.objectContaining({
            "lesson-1": expect.objectContaining({ score: 4, total: 5 }),
          }),
        })
      );
    });
  });

  describe("setCurrentModule", () => {
    it("sets the current module", () => {
      useProgressStore.getState().setCurrentModule("module-3");
      expect(useProgressStore.getState().currentModule).toBe("module-3");
    });

    it("uses debounced save when userId is set", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().setCurrentModule("module-3");

      expect(debouncedSaveProgress).toHaveBeenCalledWith("user-123", {
        current_module: "module-3",
      });
    });
  });

  describe("setCurrentLesson", () => {
    it("sets the current lesson", () => {
      useProgressStore.getState().setCurrentLesson("lesson-5");
      expect(useProgressStore.getState().currentLesson).toBe("lesson-5");
    });

    it("uses debounced save when userId is set", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().setCurrentLesson("lesson-5");

      expect(debouncedSaveProgress).toHaveBeenCalledWith("user-123", {
        current_lesson: "lesson-5",
      });
    });
  });

  describe("submitExercise", () => {
    it("adds an exercise to submittedExercises", () => {
      useProgressStore.getState().submitExercise("exercise-1");
      expect(useProgressStore.getState().submittedExercises).toEqual([
        "exercise-1",
      ]);
    });

    it("does not duplicate exercises", () => {
      useProgressStore.getState().submitExercise("exercise-1");
      useProgressStore.getState().submitExercise("exercise-1");
      expect(useProgressStore.getState().submittedExercises).toEqual([
        "exercise-1",
      ]);
    });

    it("syncs to Supabase when userId is set", () => {
      useProgressStore.getState().setUserId("user-123");
      useProgressStore.getState().submitExercise("exercise-1");

      expect(saveProgress).toHaveBeenCalledWith("user-123", {
        submitted_exercises: ["exercise-1"],
      });
    });
  });

  describe("query helpers", () => {
    beforeEach(() => {
      useProgressStore.getState().hydrate({
        completedLessons: ["m1-l1", "m1-l2", "m1-l3", "m2-l1"],
        quizScores: {},
        currentModule: null,
        currentLesson: null,
        submittedExercises: [],
      });
    });

    it("isLessonCompleted returns true for completed lessons", () => {
      expect(useProgressStore.getState().isLessonCompleted("m1-l1")).toBe(true);
      expect(useProgressStore.getState().isLessonCompleted("m3-l1")).toBe(false);
    });

    it("isModuleCompleted returns true when all lessons are done", () => {
      expect(
        useProgressStore
          .getState()
          .isModuleCompleted("m1", ["m1-l1", "m1-l2", "m1-l3"])
      ).toBe(true);
      expect(
        useProgressStore
          .getState()
          .isModuleCompleted("m2", ["m2-l1", "m2-l2"])
      ).toBe(false);
    });

    it("getModuleProgress returns correct percentage", () => {
      expect(
        useProgressStore
          .getState()
          .getModuleProgress("m1", ["m1-l1", "m1-l2", "m1-l3", "m1-l4"])
      ).toBe(75);

      expect(
        useProgressStore.getState().getModuleProgress("m1", ["m1-l1", "m1-l2"])
      ).toBe(100);
    });

    it("getModuleProgress returns 0 for empty lesson list", () => {
      expect(useProgressStore.getState().getModuleProgress("m1", [])).toBe(0);
    });
  });
});
