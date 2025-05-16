
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { ThreatSeverity, useAIThreatDetection } from "@/utils/aiThreatUtils";
import { AIThreatHeader } from "./ai-threat-header";
import { AIThreatScore } from "./ai-threat-score";
import { AIThreatInsightsList } from "./ai-threat-insights-list";

export function AIThreatDetection() {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the AI threat detection hook
  const { 
    isAnalyzing, 
    insights, 
    detectionScore, 
    runAnalysis 
  } = useAIThreatDetection();

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle running a deep analysis
  const handleRunAnalysis = async () => {
    toast({
      title: "Deep Analysis Started",
      description: "AI is scanning network patterns for advanced threats",
    });

    const newInsights = await runAnalysis();
    
    if (newInsights.length > 0) {
      toast({
        title: "Analysis Complete",
        description: `${newInsights.length} new potential threats identified by AI engine`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Analysis Complete",
        description: "No new threats detected in this scan",
      });
    }
  };

  const getColorForSeverity = (severity: ThreatSeverity) => {
    switch (severity) {
      case "critical":
        return isDarkMode ? "text-red-400 bg-red-950/30" : "text-red-700 bg-red-100";
      case "high":
        return isDarkMode ? "text-orange-400 bg-orange-950/30" : "text-orange-700 bg-orange-100";
      case "medium":
        return isDarkMode ? "text-amber-400 bg-amber-950/30" : "text-amber-700 bg-amber-100";
      case "low":
      default:
        return isDarkMode ? "text-blue-400 bg-blue-950/30" : "text-blue-700 bg-blue-100";
    }
  };

  if (isLoading) {
    return (
      <Card className={cn(
        "p-6 backdrop-blur-lg border h-full flex items-center justify-center",
        isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
      )}>
        <div className="text-center">
          <Spinner size="lg" className="mb-4" />
          <p>Loading AI threat detection module...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "p-6 backdrop-blur-lg border h-full",
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    )}>
      <AIThreatHeader isDarkMode={isDarkMode} />
      
      <AIThreatScore 
        isDarkMode={isDarkMode}
        detectionScore={detectionScore}
        isAnalyzing={isAnalyzing}
        onRunAnalysis={handleRunAnalysis}
      />
      
      <AIThreatInsightsList 
        insights={insights}
        isDarkMode={isDarkMode}
        getColorForSeverity={getColorForSeverity}
      />
    </Card>
  );
}
