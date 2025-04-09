
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface SecurityScoreProps {
  score: number;
}

export function SecurityScore({ score }: SecurityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Animate the score on mount with delay
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
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
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(visibilityTimer);
    };
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
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 h-[400px] hover:bg-gray-900/70 hover:border-gray-600/60 hover:shadow-xl"
    : "p-6 backdrop-blur-xl bg-white/90 border border-gray-200 h-[400px] hover:bg-white hover:border-gray-300 hover:shadow-lg";

  return (
    <Card className={`${cardClassName} flex flex-col items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "dark:text-gradient" : "text-gray-800"}`}>Security Score</h3>
      
      <div className="relative">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle with gradient */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            filter="drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2))"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{animatedScore}</div>
          <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>out of 100</div>
        </div>
      </div>
      
      <div className={`flex items-center gap-2 mt-6 text-lg font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        <span>Rating:</span> 
        <div className="flex items-center gap-1">
          {icon}
          <span style={{ color }}>{text}</span>
        </div>
      </div>
      
      <button 
        className="mt-4 text-primary hover:bg-primary/10 text-sm px-3 py-1.5 rounded-full flex items-center gap-1 transition-all hover:shadow-sm hover:pl-4"
      >
        View details <ArrowRight size={14} />
      </button>
    </Card>
  );
}
