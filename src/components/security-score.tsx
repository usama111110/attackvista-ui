
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, ArrowRight, Lock, CheckCircle } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface SecurityScoreProps {
  score: number;
}

export function SecurityScore({ score }: SecurityScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();
  const circleRef = useRef<SVGCircleElement>(null);
  
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
    if (score >= 80) return { 
      text: "Good", 
      icon: <Shield className={`${isDarkMode ? "text-green-500" : "text-green-600"}`} />,
      details: "Your system is well protected"
    };
    if (score >= 60) return { 
      text: "Fair", 
      icon: <Shield className={`${isDarkMode ? "text-yellow-500" : "text-yellow-600"}`} />,
      details: "Some improvements recommended"
    };
    return { 
      text: "Poor", 
      icon: <AlertTriangle className={`${isDarkMode ? "text-red-500" : "text-red-600"}`} />,
      details: "Urgent security updates needed"
    };
  };

  const color = getColor();
  const { text, icon, details } = getDescription();
  
  // Calculate the circumference of the circle
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const cardClassName = isDarkMode
    ? "p-6 backdrop-blur-xl bg-gray-900/60 border border-gray-700/50 h-[400px] hover:bg-gray-900/70 hover:border-gray-600/60 transition-all duration-500"
    : "p-6 backdrop-blur-xl bg-white/90 border border-gray-200 h-[400px] hover:bg-white hover:border-gray-300 transition-all duration-500";

  return (
    <Card 
      className={`${cardClassName} flex flex-col items-center justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3">
        <Lock 
          className={`absolute -top-1 -right-6 text-primary/70 transition-all duration-500 ${
            isHovered ? 'rotate-12 scale-110' : ''
          }`} 
          size={22} 
        />
        <h3 className={`text-xl font-bold ${
          isDarkMode ? "bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent" : "text-gray-800"
        }`}>
          Security Score
        </h3>
      </div>
      
      <div className="relative mt-2">
        {/* Background circle with subtle pulse animation */}
        <svg 
          width={size} 
          height={size} 
          className={`transform -rotate-90 transition-transform duration-700 ${
            isHovered ? 'scale-105' : ''
          }`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
            strokeWidth={strokeWidth}
            className={`${isHovered ? 'animate-pulse' : ''}`}
          />
          
          {/* Foreground circle with gradient and animation */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
            
            {/* Add a filter for glow effect */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${
              isHovered ? 'filter-glow' : ''
            }`}
            filter={isHovered ? "url(#glow)" : ""}
          />
          
          {/* Add decorative dots along the circle */}
          {[0, 25, 50, 75].map((point) => {
            const angle = (point / 100) * 360 - 90;
            const x = (size / 2) + (radius * Math.cos(angle * Math.PI / 180));
            const y = (size / 2) + (radius * Math.sin(angle * Math.PI / 180));
            const isActive = animatedScore >= point;
            
            return (
              <circle
                key={point}
                cx={x}
                cy={y}
                r={4}
                fill={isActive ? color : isDarkMode ? "#374151" : "#E5E7EB"}
                className={`transition-all duration-300 ${
                  isActive && isHovered ? 'animate-pulse' : ''
                }`}
              />
            );
          })}
        </svg>
        
        {/* Score text with animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold transition-all duration-300 ${
            isHovered ? 'scale-110' : ''
          } ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            {animatedScore}
          </div>
          <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>out of 100</div>
        </div>
      </div>
      
      <div className={`flex items-center gap-2 mt-6 text-lg font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
        <span>Rating:</span> 
        <div className="flex items-center gap-1">
          {icon}
          <span style={{ color }} className="transition-all duration-300 hover:font-bold">{text}</span>
        </div>
      </div>
      
      <p className={`text-sm mt-2 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {details}
      </p>
      
      <button 
        className={`mt-5 text-primary hover:bg-primary/10 text-sm px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ${
          isHovered ? 'pl-5 pr-3 shadow-md' : ''
        }`}
      >
        View security report 
        <ArrowRight size={16} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </button>
      
      {/* Security verification badge */}
      <div className={`mt-4 flex items-center gap-1.5 text-xs ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      } transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
        <CheckCircle size={12} className="text-primary" />
        <span>Verified by SecureSentry™</span>
      </div>
    </Card>
  );
}
