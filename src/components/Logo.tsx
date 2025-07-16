
import { Shield } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const { isDarkMode } = useTheme();
  
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const iconClass = sizeClasses[size];
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-full p-2 shadow-lg">
          <Shield className={iconClass} strokeWidth={1.5} />
        </div>
      </div>
      
      {showText && (
        <div className="font-bold text-xl text-foreground">
          NetworkFort
        </div>
      )}
    </div>
  );
};
