"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "info";
  size?: "sm" | "md";
}

const variants = {
  default: "bg-[var(--surface-2)] text-[var(--muted)]",
  gold: "bg-[var(--accent)]/10 text-[var(--accent)]",
  success: "bg-emerald-500/10 text-emerald-500",
  warning: "bg-amber-500/10 text-amber-500",
  info: "bg-blue-500/10 text-blue-400",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-mono font-medium ${
        variants[variant]
      } ${size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
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
      className={`inline-flex items-center gap-1 rounded-full font-mono font-medium px-3 py-1 text-xs ${variants[variant]}`}
    >
      {children}
    </motion.span>
  );
}
