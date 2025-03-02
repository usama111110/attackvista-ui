
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricsCard({ title, value, icon, className, trend }: MetricsCardProps) {
  return (
    <Card className={cn(
      "p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 hover:bg-gray-700/30 transition-all duration-300 overflow-hidden relative group data-card", 
      className
    )}>
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
      <div className="flex items-center justify-between">
        <div className="space-y-2 z-10">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <div className={cn(
              "text-sm flex items-center gap-1 font-medium", 
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className="text-primary text-2xl bg-primary/10 p-3 rounded-lg z-10">{icon}</div>
      </div>
    </Card>
  );
}
