
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";

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
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card className={cn(
      "p-6 backdrop-blur-lg border overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-1", 
      isDarkMode 
        ? "bg-gray-900/50 border-gray-700/50 text-gray-100 hover:bg-gray-900/60 hover:border-gray-600/50" 
        : "bg-white/90 border-gray-200 text-gray-800 hover:bg-white hover:border-gray-300/80",
      animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      className
    )}>
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500"></div>
      <div className="flex items-center justify-between">
        <div className="space-y-2 z-10">
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            {typeof value === 'number' ? 
              new Intl.NumberFormat().format(value) : 
              value
            }
          </p>
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
        <div className={`text-primary text-2xl bg-primary/10 p-3 rounded-lg z-10 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300`}>
          {icon}
        </div>
      </div>
      
      {/* Bottom highlight bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary/0 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></div>
    </Card>
  );
}
