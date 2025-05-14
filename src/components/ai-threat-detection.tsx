
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, Shield, Network, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAIThreatDetection, AIThreatInsight, ThreatSeverity, aiModelInfo } from "@/utils/aiThreatUtils";

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Threat Detection</h3>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {aiModelInfo.name} v{aiModelInfo.version}
        </Badge>
      </div>

      <div className={cn(
        "p-4 rounded-lg mb-6",
        isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"
      )}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">AI Detection Confidence</span>
          <span className="text-sm font-bold">{detectionScore}%</span>
        </div>
        <Progress value={detectionScore} className="h-2" />
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5" />
                <span>Run Deep Analysis</span>
              </>
            )}
          </Button>
          
          <span className={cn(
            "text-xs flex items-center gap-1",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            <Network className="h-3.5 w-3.5" />
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">AI-Detected Threats</h4>
        
        {insights.length > 0 ? (
          insights.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "p-3 rounded-lg border transition-all hover:shadow-md",
                isDarkMode 
                  ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50" 
                  : "bg-white border-gray-200/80 hover:bg-gray-50/80"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className={cn(
                    "p-2 rounded-md",
                    getColorForSeverity(insight.severity)
                  )}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{insight.type}</h5>
                      {insight.isNew && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30 text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">{insight.description}</p>
                    
                    <div className="mt-2">
                      <span className={cn(
                        "inline-block rounded px-1.5 py-0.5 text-xs",
                        getColorForSeverity(insight.severity)
                      )}>
                        {insight.severity.toUpperCase()} ({insight.confidence}% confidence)
                      </span>
                    </div>
                    
                    <div className={cn(
                      "mt-3 flex items-center gap-1 text-xs",
                      isDarkMode ? "text-primary" : "text-primary"
                    )}>
                      <Shield className="h-3 w-3" />
                      <span>{insight.suggestedAction}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="rounded-full h-6 w-6 mt-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-full p-4 inline-flex mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">No threats detected yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Run a deep analysis to scan for potential threats
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
