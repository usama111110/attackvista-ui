
import { ReactNode } from "react";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedMetricsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  animated?: boolean;
  variant?: "default" | "modern" | "glass" | "premium" | "elevated";
  description?: string;
}

export function EnhancedMetricsCard({
  title,
  value,
  icon,
  trend,
  className,
  animated = true,
  variant = "default",
  description
}: EnhancedMetricsCardProps) {
  const numericValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^0-9]/g, '')) : value;

  const cardVariantClass = {
    default: "bg-card",
    modern: "card-modern",
    glass: "card-glass",
    premium: "card-premium",
    elevated: "bg-card shadow-depth border-border/30 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1"
  }[variant];

  return (
    <EnhancedCard className={cn("p-6 group", cardVariantClass, className)} hover glow>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{title}</h3>
        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-3xl font-bold group-hover:text-primary transition-colors">
          {animated && !isNaN(numericValue) ? (
            <AnimatedCounter value={numericValue} />
          ) : (
            value
          )}
        </p>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-2 text-sm",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              trend.isPositive 
                ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" 
                : "bg-red-500/10 text-red-600 hover:bg-red-500/20"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
            <span className="text-muted-foreground text-xs">vs last period</span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Enhanced hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
    </EnhancedCard>
  );
}
