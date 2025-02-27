
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

interface SecurityScoreProps {
  score: number;
}

export function SecurityScore({ score }: SecurityScoreProps) {
  // Calculate color based on score
  const getColor = () => {
    if (score >= 80) return "#10B981"; // Green
    if (score >= 60) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  // Calculate description and icon based on score
  const getDescription = () => {
    if (score >= 80) return { text: "Good", icon: <Shield className="text-green-500" /> };
    if (score >= 60) return { text: "Fair", icon: <Shield className="text-yellow-500" /> };
    return { text: "Poor", icon: <AlertTriangle className="text-red-500" /> };
  };

  const color = getColor();
  const { text, icon } = getDescription();
  
  // Calculate the circumference of the circle
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 h-[400px] flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">Security Score</h3>
      
      <div className="relative">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
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
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-sm text-gray-400">out of 100</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-6 text-lg font-medium">
        <span>Rating:</span> 
        <div className="flex items-center gap-1">
          {icon}
          <span style={{ color }}>{text}</span>
        </div>
      </div>
      
      <button className="mt-4 text-primary hover:underline text-sm">View details</button>
    </Card>
  );
}
