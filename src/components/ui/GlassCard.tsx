import { forwardRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -5 } : undefined}
        className={cn(
          "bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl relative overflow-hidden",
          hoverEffect && "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.15)] transition-all duration-300",
          className
        )}
        {...props}
      >
        {hoverEffect && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
