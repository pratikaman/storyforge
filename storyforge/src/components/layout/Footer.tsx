"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-display text-sm font-bold">StoryForge</span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/learn" className="hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/practice" className="hover:text-foreground transition-colors">
              Practice
            </Link>
            <Link href="/reference" className="hover:text-foreground transition-colors">
              Reference
            </Link>
          </div>

          <p className="text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} StoryForge
          </p>
        </div>
      </div>
    </footer>
  );
}
