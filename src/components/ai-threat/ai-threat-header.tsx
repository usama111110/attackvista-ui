
import React from "react";
import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { aiModelInfo } from "@/utils/aiThreatUtils";

interface AIThreatHeaderProps {
  isDarkMode: boolean;
}

export function AIThreatHeader({ isDarkMode }: AIThreatHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Threat Detection</h3>
      </div>
      <Badge 
        variant="outline" 
        className="bg-primary/10 text-primary border-primary/20"
      >
        {aiModelInfo.name} v{aiModelInfo.version}
      </Badge>
    </div>
  );
}
