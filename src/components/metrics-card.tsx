
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

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
  const { isDarkMode } = useTheme();
  
  return (
    <Card className={cn(
      "p-6 backdrop-blur-lg border hover:bg-opacity-30 transition-all duration-300 overflow-hidden relative group data-card shadow-glow animate-fade-in", 
      isDarkMode ? "bg-gray-900/50 border-gray-700/50 text-gray-100" : "bg-white/90 border-gray-200 text-gray-800",
      className
    )}>
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
      <div className="flex items-center justify-between">
        <div className="space-y-2 z-10">
          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{title}</p>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{value}</p>
          {trend && (
            <div className={cn(
              "text-sm flex items-center gap-1 font-medium", 
              trend.isPositive ? 
                (isDarkMode ? "text-green-400" : "text-green-600") : 
                (isDarkMode ? "text-red-400" : "text-red-600")
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className={`${isDarkMode ? "text-gray-500" : "text-gray-500"} text-xs`}>vs last week</span>
            </div>
          )}
        </div>
        <div className="text-primary text-2xl bg-primary/10 p-3 rounded-lg z-10 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      </div>
    </Card>
  );
}
