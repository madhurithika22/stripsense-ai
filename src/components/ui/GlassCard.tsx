import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "elevated" | "subtle";
  glow?: boolean;
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, children, ...props }, ref) => {
    const variants = {
      default: "glass border-border/50",
      elevated: "glass-strong border-border/30 shadow-lg",
      subtle: "bg-card/50 border-border/20",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl border p-6 transition-all duration-300",
          variants[variant],
          glow && "shadow-glow",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
