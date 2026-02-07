"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "info";
  size?: "sm" | "md";
}

const variants = {
  default: "bg-[var(--surface)] text-[var(--muted)] border-[var(--border)]",
  gold: "bg-gold-500/10 text-gold-500 border-gold-500/20",
  success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${
        variants[variant]
      } ${size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}`}
    >
      {children}
    </span>
  );
}

export function AnimatedBadge({
  children,
  variant = "gold",
}: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
      className={`inline-flex items-center gap-1 rounded-full border font-medium px-3 py-1 text-sm ${variants[variant]}`}
    >
      {children}
    </motion.span>
  );
}
