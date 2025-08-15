import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface EnhancedLoadingProps {
  className?: string;
  variant?: "card" | "metrics" | "chart" | "table" | "list";
  count?: number;
}

export function EnhancedLoading({ 
  className, 
  variant = "card", 
  count = 1 
}: EnhancedLoadingProps) {
  const renderContent = () => {
    switch (variant) {
      case "metrics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
                <Skeleton className="h-8 w-16 mb-2 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>
        );
      
      case "chart":
        return (
          <div className="p-6 rounded-xl border border-border/40 bg-card/50 animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
            <div className="h-80 bg-muted/30 rounded-xl flex items-end justify-between px-4 pb-4 space-x-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton 
                  key={i} 
                  className={cn(
                    "w-8 rounded-t-md bg-primary/20",
                    `h-${Math.floor(Math.random() * 20) + 10}`
                  )}
                />
              ))}
            </div>
          </div>
        );
      
      case "table":
        return (
          <div className="p-6 rounded-xl border border-border/40 bg-card/50 animate-pulse space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded-md" />
                      <Skeleton className="h-3 w-24 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        );
      
      case "list":
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-border/40 bg-card/50 animate-pulse">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-3 w-1/2 rounded-md" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/40 bg-card/50 animate-pulse">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-1/3 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                    <Skeleton className="h-4 w-3/5 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={cn("animate-fade-in", className)}>
      {renderContent()}
    </div>
  );
}

// Specialized loading components
export function MetricsLoading() {
  return <EnhancedLoading variant="metrics" />;
}

export function ChartLoading() {
  return <EnhancedLoading variant="chart" />;
}

export function TableLoading() {
  return <EnhancedLoading variant="table" />;
}

export function ListLoading({ count = 3 }: { count?: number }) {
  return <EnhancedLoading variant="list" count={count} />;
}