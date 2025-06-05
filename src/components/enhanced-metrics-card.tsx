
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
}

export function EnhancedMetricsCard({
  title,
  value,
  icon,
  trend,
  className,
  animated = true
}: EnhancedMetricsCardProps) {
  const numericValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^0-9]/g, '')) : value;

  return (
    <EnhancedCard className={cn("p-6 group", className)} hover glow>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold">
          {animated && !isNaN(numericValue) ? (
            <AnimatedCounter value={numericValue} />
          ) : (
            value
          )}
        </p>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
    </EnhancedCard>
  );
}
