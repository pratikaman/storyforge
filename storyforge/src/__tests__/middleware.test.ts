import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock the updateSession function
const mockUpdateSession = vi.fn();

vi.mock("@/lib/supabase/middleware", () => ({
  updateSession: (...args: unknown[]) => mockUpdateSession(...args),
}));

import { middleware, config } from "../../middleware";

function createRequest(url: string) {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

function mockNextResponse() {
  return {
    headers: new Headers(),
    cookies: { set: vi.fn(), getAll: vi.fn(() => []) },
  };
}

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("config matcher", () => {
    it("has a matcher that excludes static files and API routes", () => {
      expect(config.matcher).toBeDefined();
      expect(config.matcher[0]).toContain("_next/static");
      expect(config.matcher[0]).toContain("api/");
    });
  });

  describe("public routes", () => {
    it("allows unauthenticated access to landing page", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/"));

      // Should return supabaseResponse (not a redirect)
      expect(response).toBe(supabaseResponse);
    });

    it("allows unauthenticated access to /auth/login", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/auth/login"));
      expect(response).toBe(supabaseResponse);
    });

    it("allows unauthenticated access to /auth/signup", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/auth/signup"));
      expect(response).toBe(supabaseResponse);
    });

    it("allows unauthenticated access to /reference paths", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(
        createRequest("/reference/some-technique")
      );
      expect(response).toBe(supabaseResponse);
    });
  });

  describe("protected routes", () => {
    it("redirects unauthenticated users from /learn to login", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/learn"));

      expect(response.status).toBe(307);
      const location = response.headers.get("location");
      expect(location).toContain("/auth/login");
      expect(location).toContain("redirectTo=%2Flearn");
    });

    it("redirects unauthenticated users from /profile to login", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/profile"));

      expect(response.status).toBe(307);
      const location = response.headers.get("location");
      expect(location).toContain("/auth/login");
      expect(location).toContain("redirectTo=%2Fprofile");
    });

    it("redirects unauthenticated users from /practice to login", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({ user: null, supabaseResponse });

      const response = await middleware(createRequest("/practice"));

      expect(response.status).toBe(307);
      const location = response.headers.get("location");
      expect(location).toContain("/auth/login");
    });
  });

  describe("authenticated user redirects", () => {
    const mockUser = { id: "user-123", email: "test@test.com" };

    it("redirects authenticated users from /auth/login to /learn", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({
        user: mockUser,
        supabaseResponse,
      });

      const response = await middleware(createRequest("/auth/login"));

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/learn");
    });

    it("redirects authenticated users from /auth/signup to /learn", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({
        user: mockUser,
        supabaseResponse,
      });

      const response = await middleware(createRequest("/auth/signup"));

      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/learn");
    });

    it("allows authenticated users to access protected routes", async () => {
      const supabaseResponse = mockNextResponse();
      mockUpdateSession.mockResolvedValue({
        user: mockUser,
        supabaseResponse,
      });

      const response = await middleware(createRequest("/learn"));
      expect(response).toBe(supabaseResponse);
    });
  });
});
