
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className, delay = 0 }: FloatingElementProps) {
  return (
    <div 
      className={cn(
        "animate-[float_6s_ease-in-out_infinite]",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

interface GlowingOrbProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  intensity?: "low" | "medium" | "high";
}

export function GlowingOrb({ 
  size = "md", 
  color = "primary",
  position = "top-right",
  intensity = "medium"
}: GlowingOrbProps) {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-48 h-48", 
    lg: "w-64 h-64"
  };

  const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };

  const positions = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  const intensities = {
    low: "opacity-20 blur-2xl",
    medium: "opacity-30 blur-3xl",
    high: "opacity-40 blur-3xl"
  };

  return (
    <div className={cn(
      "absolute pointer-events-none rounded-full",
      "animate-[float_8s_ease-in-out_infinite]",
      sizes[size],
      colors[color],
      positions[position],
      intensities[intensity]
    )} />
  );
}
