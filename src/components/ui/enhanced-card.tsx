
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function EnhancedCard({ 
  children, 
  className, 
  hover = true, 
  glow = false,
  gradient = false 
}: EnhancedCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      hover && "hover:shadow-lg hover:-translate-y-1",
      glow && "shadow-lg shadow-primary/10",
      gradient && "bg-gradient-to-br from-background to-muted/20",
      className
    )}>
      {children}
      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none" />
    </Card>
  );
}
