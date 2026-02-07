"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  const Component = hover ? motion.div : "div";
  const hoverProps = hover
    ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <Component
      {...hoverProps}
      onClick={onClick}
      className={`rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 ${
        hover ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-glass dark:bg-glass bg-glass-light p-6 ${className}`}
    >
      {children}
    </div>
  );
}
