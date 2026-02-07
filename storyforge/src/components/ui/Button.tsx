"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-semibold hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/20",
  secondary:
    "bg-[var(--surface)] text-foreground border border-[var(--border)] hover:bg-[var(--surface-2)]",
  ghost: "text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)]",
  outline:
    "border border-gold-500/30 text-gold-500 hover:bg-gold-500/10",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
