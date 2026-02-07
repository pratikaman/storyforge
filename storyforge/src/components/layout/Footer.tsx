"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-base font-semibold tracking-tight">
                StoryForge
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Master storytelling through guided lessons, practice, and
              AI-powered mentorship.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="font-medium text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3 font-mono">
                Learn
              </h4>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>
                  <Link
                    href="/learn"
                    className="hover:text-foreground transition-colors"
                  >
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/practice"
                    className="hover:text-foreground transition-colors"
                  >
                    Practice
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reference"
                    className="hover:text-foreground transition-colors"
                  >
                    Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3 font-mono">
                Account
              </h4>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-foreground transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn"
                    className="hover:text-foreground transition-colors"
                  >
                    Progress
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} StoryForge
          </p>
          <p className="text-xs text-[var(--muted)]">
            Crafted for storytellers
          </p>
        </div>
      </div>
    </footer>
  );
}
