
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "warm" | "cool";
}

export function GradientBackground({ 
  children, 
  className,
  variant = "primary" 
}: GradientBackgroundProps) {
  const variants = {
    primary: "bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 dark:from-slate-900 dark:via-blue-950/50 dark:to-indigo-950/30",
    secondary: "bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30 dark:from-slate-900 dark:via-emerald-950/50 dark:to-teal-950/30",
    accent: "bg-gradient-to-br from-orange-50 via-amber-50/50 to-yellow-50/30 dark:from-slate-900 dark:via-orange-950/50 dark:to-amber-950/30",
    warm: "bg-gradient-to-br from-rose-50 via-pink-50/50 to-red-50/30 dark:from-slate-900 dark:via-rose-950/50 dark:to-pink-950/30",
    cool: "bg-gradient-to-br from-slate-50 via-gray-50/50 to-zinc-50/30 dark:from-slate-950 dark:via-gray-950/50 dark:to-zinc-950/30"
  };

  return (
    <div className={cn(
      "relative min-h-screen transition-all duration-1000",
      variants[variant],
      className
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
