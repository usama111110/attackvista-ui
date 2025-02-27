
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
    <Card className={cn("p-6 backdrop-blur-sm bg-card hover:bg-opacity-10 transition-all duration-300", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && (
            <div className={cn("text-sm", trend.isPositive ? "text-green-400" : "text-red-400")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className="text-primary text-2xl">{icon}</div>
      </div>
    </Card>
  );
}
