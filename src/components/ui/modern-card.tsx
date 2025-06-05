
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient" | "elevated";
  size?: "sm" | "md" | "lg";
}

export function ModernCard({ 
  children, 
  className, 
  variant = "default",
  size = "md"
}: ModernCardProps) {
  const variants = {
    default: "bg-card border-border/50",
    glass: "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl",
    gradient: "bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20",
    elevated: "bg-card shadow-2xl border-0 ring-1 ring-border/20"
  };

  const sizes = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:via-transparent before:to-secondary/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
      variants[variant],
      sizes[size],
      className
    )}>
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}
