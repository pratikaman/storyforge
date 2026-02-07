"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  PenTool,
  Library,
  User,
  Sun,
  Moon,
  Flame,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { useProgressStore } from "@/stores/useProgressStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "/learn", label: "Learn", icon: Compass },
  { href: "/practice", label: "Practice", icon: PenTool },
  { href: "/reference", label: "Reference", icon: Library },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { streak, level, levelTitle } = useGamificationStore();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    useProgressStore.getState().reset();
    useGamificationStore.getState().reset();
    useSettingsStore.getState().reset();
    useThemeStore.getState().setUserId(null);
  }

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass dark:bg-glass border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-navy-900" />
            </div>
            <span className="font-display text-xl font-bold text-foreground group-hover:text-gold-500 transition-colors">
              StoryForge
            </span>
          </Link>

          {/* Desktop Nav — only when logged in */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + "/");
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-gold-500"
                        : "text-[var(--muted)] hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-gold-500/10 rounded-lg border border-gold-500/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Streak — logged in only */}
            {user && streak > 0 && (
              <div className="hidden sm:flex items-center gap-1 text-sm">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-semibold text-orange-500">{streak}</span>
              </div>
            )}

            {/* Level Badge — logged in only */}
            {user && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                <span className="text-xs font-bold text-gold-500">
                  Lv.{level}
                </span>
                <span className="text-xs text-[var(--muted)]">{levelTitle}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-gold-400" />
              ) : (
                <Moon className="w-4 h-4 text-navy-600" />
              )}
            </button>

            {/* User avatar / Auth buttons */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900 font-bold text-sm hover:ring-2 hover:ring-gold-500/50 transition-all"
                >
                  {avatarLetter}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-[var(--border)]">
                      <p className="text-sm font-medium truncate">{displayName}</p>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--muted)] hover:text-foreground hover:bg-[var(--background)] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <form action="/auth/signout" method="POST" onSubmit={handleLogout}>
                      <button
                        type="submit"
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-foreground transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 text-sm font-semibold hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-[var(--border)] bg-[var(--background)]"
        >
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/");
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-gold-500 bg-gold-500/10"
                          : "text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <form action="/auth/signout" method="POST" onSubmit={() => { setMobileOpen(false); handleLogout(); }}>
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)]"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gold-500 bg-gold-500/10"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
