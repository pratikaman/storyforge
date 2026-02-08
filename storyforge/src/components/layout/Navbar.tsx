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
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass-light dark:bg-glass border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display text-base font-semibold tracking-tight">
              StoryForge
            </span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-[var(--muted)] hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-[var(--surface)] rounded-md -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            {user && streak > 0 && (
              <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-orange-500">
                <Flame className="w-3.5 h-3.5" />
                <span>{streak}</span>
              </div>
            )}

            {/* Level */}
            {user && (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--surface)] text-xs">
                <span className="font-semibold text-[var(--accent)]">
                  Lv.{level}
                </span>
                <span className="text-[var(--muted)] hidden lg:inline">
                  {levelTitle}
                </span>
              </div>
            )}

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md hover:bg-[var(--surface)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[var(--muted)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--muted)]" />
              )}
            </button>

            {/* User / Auth */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  {avatarLetter}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-xl py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-[var(--border)]">
                      <p className="text-sm font-medium truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)] transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      Profile
                    </Link>
                    <form
                      action="/auth/signout"
                      method="POST"
                      onSubmit={handleLogout}
                    >
                      <button
                        type="submit"
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <Link
                  href="/auth/login"
                  className="px-3 py-1.5 rounded-md text-[13px] font-medium text-[var(--muted)] hover:text-foreground transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-3 py-1.5 rounded-md bg-[var(--accent)] text-white text-[13px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-md hover:bg-[var(--surface)] transition-colors"
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
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-[var(--border)] bg-[var(--background)]"
        >
          <div className="px-4 py-2 space-y-0.5">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "text-[var(--accent)] bg-[var(--accent-muted)]"
                          : "text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <form
                  action="/auth/signout"
                  method="POST"
                  onSubmit={handleLogout}
                >
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/5 transition-colors"
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--accent)] bg-[var(--accent-muted)]"
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
