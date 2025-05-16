
import React from "react";
import { Brain } from "lucide-react";

export function AIThreatEmptyState() {
  return (
    <div className="text-center py-8">
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-full p-4 inline-flex mb-4">
        <Brain className="h-6 w-6 text-primary" />
      </div>
      <p className="text-gray-600 dark:text-gray-400">No threats detected yet</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
        Run a deep analysis to scan for potential threats
      </p>
    </div>
  );
}
