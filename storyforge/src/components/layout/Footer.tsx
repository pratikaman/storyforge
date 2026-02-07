"use client";

import { BookOpen, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)] dark:bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-navy-900" />
              </div>
              <span className="font-display text-lg font-bold">
                StoryForge
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-sm">
              Master the art of storytelling through guided lessons, hands-on
              practice, and AI-powered mentorship. Your journey from reader to
              writer starts here.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Learn</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/learn"
                  className="hover:text-gold-500 transition-colors"
                >
                  Curriculum
                </Link>
              </li>
              <li>
                <Link
                  href="/practice"
                  className="hover:text-gold-500 transition-colors"
                >
                  Practice
                </Link>
              </li>
              <li>
                <Link
                  href="/reference"
                  className="hover:text-gold-500 transition-colors"
                >
                  Reference Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Your Journey</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="/profile"
                  className="hover:text-gold-500 transition-colors"
                >
                  Profile & Stats
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="hover:text-gold-500 transition-colors"
                >
                  Learning Path
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} StoryForge. Crafted for
            storytellers.
          </p>
          <p className="text-xs text-[var(--muted)] flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> for the love
            of stories
          </p>
        </div>
      </div>
    </footer>
  );
}
