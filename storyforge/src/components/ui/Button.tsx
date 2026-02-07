"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantStyles = {
  primary:
    "bg-[var(--accent)] text-zinc-900 font-semibold hover:brightness-110 shadow-sm hover:shadow-md",
  secondary:
    "bg-[var(--surface)] text-foreground border border-[var(--border)] hover:bg-[var(--surface-2)]",
  ghost: "text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface)]",
  outline:
    "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10",
};

const sizeStyles = {
  sm: "px-3.5 py-1.5 text-xs rounded-full",
  md: "px-5 py-2.5 text-sm rounded-full",
  lg: "px-8 py-3.5 text-base rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
