
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
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

// Security trends data
const securityTrendsData = [
  { date: "Jan", attacks: 45, blocked: 43, threats: 38, vulnerabilities: 12 },
  { date: "Feb", attacks: 52, blocked: 49, threats: 42, vulnerabilities: 15 },
  { date: "Mar", attacks: 48, blocked: 46, threats: 40, vulnerabilities: 10 },
  { date: "Apr", attacks: 61, blocked: 58, threats: 55, vulnerabilities: 18 },
  { date: "May", attacks: 55, blocked: 53, threats: 48, vulnerabilities: 14 },
  { date: "Jun", attacks: 67, blocked: 64, threats: 59, vulnerabilities: 22 },
  { date: "Jul", attacks: 72, blocked: 69, threats: 65, vulnerabilities: 19 },
];

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
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={securityTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="date" 
                          stroke={isDarkMode ? "#888888" : "#666666"}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke={isDarkMode ? "#888888" : "#666666"}
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.95)",
                            border: "none",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                            color: isDarkMode ? "#fff" : "#333",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="attacks"
                          stackId="1"
                          stroke="#FF6B6B"
                          fill="#FF6B6B"
                          fillOpacity={0.3}
                          name="Total Attacks"
                        />
                        <Area
                          type="monotone"
                          dataKey="blocked"
                          stackId="2"
                          stroke="#4ECDC4"
                          fill="#4ECDC4"
                          fillOpacity={0.3}
                          name="Blocked Attacks"
                        />
                        <Area
                          type="monotone"
                          dataKey="threats"
                          stackId="3"
                          stroke="#45B7D1"
                          fill="#45B7D1"
                          fillOpacity={0.3}
                          name="Threats Detected"
                        />
                        <Area
                          type="monotone"
                          dataKey="vulnerabilities"
                          stackId="4"
                          stroke="#F7DC6F"
                          fill="#F7DC6F"
                          fillOpacity={0.3}
                          name="Vulnerabilities"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
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
                      { label: "Total Attacks", value: "1,234", change: "+12%", color: "text-red-500" },
                      { label: "Blocked Attacks", value: "1,198", change: "+15%", color: "text-green-500" },
                      { label: "Success Rate", value: "97.1%", change: "+2.3%", color: "text-green-500" },
                      { label: "Avg. Response Time", value: "1.2s", change: "-0.3s", color: "text-green-500" },
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gray-100/80 dark:bg-gray-800/50 hover:bg-gray-200/80 dark:hover:bg-gray-700/50 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                          <div className={`${stat.color} text-sm font-medium`}>
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
