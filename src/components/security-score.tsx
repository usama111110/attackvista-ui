
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface SecurityScoreProps {
  score: number;
}

export function SecurityScore({ score }: SecurityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { isDarkMode } = useTheme();
  
  // Animate the score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score]);

  // Calculate color based on score
  const getColor = () => {
    if (score >= 80) return "#10B981"; // Green
    if (score >= 60) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  // Calculate description and icon based on score
  const getDescription = () => {
    if (score >= 80) return { text: "Good", icon: <Shield className={`${isDarkMode ? "text-green-500" : "text-green-600"}`} /> };
    if (score >= 60) return { text: "Fair", icon: <Shield className={`${isDarkMode ? "text-yellow-500" : "text-yellow-600"}`} /> };
    return { text: "Poor", icon: <AlertTriangle className={`${isDarkMode ? "text-red-500" : "text-red-600"}`} /> };
  };

  const color = getColor();
  const { text, icon } = getDescription();
  
  // Calculate the circumference of the circle
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-lg bg-gray-900/50 border border-gray-700/50 h-[400px]"
    : "p-6 backdrop-blur-lg bg-white/90 border border-gray-200 h-[400px]";

  return (
    <Card className={`${cardClassName} flex flex-col items-center justify-center data-card hover-lift transition-all duration-300 animate-fade-in`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "dark:text-gradient" : "text-gray-800"}`}>Security Score</h3>
      
      <div className="relative">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{animatedScore}</div>
          <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>out of 100</div>
        </div>
      </div>
      
      <div className={`flex items-center gap-2 mt-6 text-lg font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        <span>Rating:</span> 
        <div className="flex items-center gap-1">
          {icon}
          <span style={{ color }}>{text}</span>
        </div>
      </div>
      
      <button className="mt-4 text-primary hover:underline text-sm bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">View details</button>
    </Card>
  );
}
