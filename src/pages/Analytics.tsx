
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { useTheme } from "@/providers/ThemeProvider";
import { PredictiveAnalytics } from "@/components/predictive-analytics";
import { Button } from "@/components/ui/button";
import { Filter, RefreshCw } from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const { isDarkMode } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Security Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">In-depth analysis and predictive insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1" onClick={refreshData}>
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attacks">Attack Analysis</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className={`p-6 backdrop-blur-lg border h-[400px] hover-lift ${
                  isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
                }`}>
                  <h3 className="text-lg font-semibold mb-4">Security Trends Over Time</h3>
                  {/* This is where we'd have a line chart showing trends over time */}
                  <div className="flex items-center justify-center h-[320px] text-gray-500 dark:text-gray-400">
                    <div>Visualization coming soon</div>
                  </div>
                </Card>
              </div>
              <div>
                <Card className={`p-6 backdrop-blur-lg border hover-lift ${
                  isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
                }`}>
                  <h3 className="text-lg font-semibold mb-4">Security Summary</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Total Attacks", value: "1,234", change: "+12%" },
                      { label: "Blocked Attacks", value: "1,198", change: "+15%" },
                      { label: "Success Rate", value: "97.1%", change: "+2.3%" },
                      { label: "Avg. Response Time", value: "1.2s", change: "-0.3s" },
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
                        <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                          <div className={stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400 text-sm' : 'text-red-600 dark:text-red-400 text-sm'}>
                            {stat.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            
            <AttackInsights />
          </TabsContent>
          
          <TabsContent value="attacks">
            <AttackTypesVisualization />
          </TabsContent>
          
          <TabsContent value="predictive">
            <div>
              <PredictiveAnalytics />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
