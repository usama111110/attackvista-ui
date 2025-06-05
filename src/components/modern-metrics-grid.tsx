
import { ModernCard } from "@/components/ui/modern-card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

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

function ModernMetric({ title, value, icon, trend, color = "blue", className }: ModernMetricProps) {
  const colorClasses = {
    blue: "from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30",
    red: "from-red-500/10 to-rose-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30",
    green: "from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30",
    purple: "from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800/30",
    orange: "from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/30",
  };

  return (
    <ModernCard variant="gradient" className={`bg-gradient-to-br ${colorClasses[color]} ${className || ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
          {icon}
        </div>
        {trend && (
          <Badge 
            variant="outline" 
            className={`bg-background/30 backdrop-blur-sm ${
              trend.isPositive 
                ? "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30" 
                : "text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={12} className="mr-1" />
            ) : (
              <TrendingDown size={12} className="mr-1" />
            )}
            {trend.value}%
          </Badge>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          {typeof value === 'number' && value > 999 ? `${(value / 1000).toFixed(1)}k` : value}
        </p>
        <p className="text-sm font-medium text-muted-foreground/80">{title}</p>
      </div>
    </ModernCard>
  );
}

interface ModernMetricsGridProps {
  metrics: Array<{
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    color?: "blue" | "red" | "green" | "purple" | "orange";
  }>;
}

export function ModernMetricsGrid({ metrics }: ModernMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <ModernMetric
          key={index}
          className="transform transition-all duration-300 hover:scale-105"
          {...metric}
        />
      ))}
    </div>
  );
}
