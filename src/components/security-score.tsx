
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

interface SecurityScoreProps {
  score: number;
}

export function SecurityScore({ score }: SecurityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
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
    if (score >= 80) return { text: "Good", icon: <Shield className="text-green-600 dark:text-green-500" /> };
    if (score >= 60) return { text: "Fair", icon: <Shield className="text-yellow-600 dark:text-yellow-500" /> };
    return { text: "Poor", icon: <AlertTriangle className="text-red-600 dark:text-red-500" /> };
  };

  const color = getColor();
  const { text, icon } = getDescription();
  
  // Calculate the circumference of the circle
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 h-[400px] flex flex-col items-center justify-center data-card hover-lift transition-all duration-300 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 dark:text-gradient">Security Score</h3>
      
      <div className="relative">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(0,0,0,0.1)"
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
          <div className="text-4xl font-bold">{animatedScore}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-6 text-lg font-medium">
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
