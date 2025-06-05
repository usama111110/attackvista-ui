
import { ReactNode } from "react";
import { ModernCard } from "@/components/ui/modern-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernMetricProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "red" | "green" | "purple" | "orange";
  className?: string;
}

export function ModernMetric({
  title,
  value,
  icon,
  trend,
  color = "blue",
  className
}: ModernMetricProps) {
  const numericValue = typeof value === 'string' ? 
    parseInt(value.replace(/[^0-9]/g, '')) : value;

  const colorMap = {
    blue: {
      bg: "from-blue-500/10 to-cyan-500/10",
      border: "border-blue-200/50 dark:border-blue-800/30",
      icon: "text-blue-500",
      accent: "bg-blue-500/10"
    },
    red: {
      bg: "from-red-500/10 to-pink-500/10",
      border: "border-red-200/50 dark:border-red-800/30",
      icon: "text-red-500",
      accent: "bg-red-500/10"
    },
    green: {
      bg: "from-green-500/10 to-emerald-500/10",
      border: "border-green-200/50 dark:border-green-800/30",
      icon: "text-green-500",
      accent: "bg-green-500/10"
    },
    purple: {
      bg: "from-purple-500/10 to-indigo-500/10",
      border: "border-purple-200/50 dark:border-purple-800/30",
      icon: "text-purple-500",
      accent: "bg-purple-500/10"
    },
    orange: {
      bg: "from-orange-500/10 to-amber-500/10",
      border: "border-orange-200/50 dark:border-orange-800/30",
      icon: "text-orange-500",
      accent: "bg-orange-500/10"
    }
  };

  const colors = colorMap[color];

  return (
    <ModernCard 
      variant="gradient" 
      className={cn(
        `bg-gradient-to-br ${colors.bg} ${colors.border} group relative overflow-hidden`,
        className
      )}
    >
      {/* Background decoration */}
      <div className={cn(
        "absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-50 transition-all duration-500 group-hover:scale-125 group-hover:opacity-70",
        colors.accent
      )} />
      
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight">
              {!isNaN(numericValue) ? (
                <AnimatedCounter value={numericValue} />
              ) : (
                value
              )}
            </p>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" 
                  : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
        </div>
        
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
          colors.accent,
          colors.icon
        )}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="text-xs text-muted-foreground">
          vs last month
        </div>
      )}
    </ModernCard>
  );
}

interface ModernMetricsGridProps {
  metrics: Array<Omit<ModernMetricProps, 'className'>>;
  className?: string;
}

export function ModernMetricsGrid({ metrics, className }: ModernMetricsGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
      className
    )}>
      {metrics.map((metric, index) => (
        <ModernMetric
          key={index}
          {...metric}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` } as any}
        />
      ))}
    </div>
  );
}
