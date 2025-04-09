
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AdvancedFilter } from "@/components/advanced-filter";
import { Card } from "@/components/ui/card";
import { BarChart, PieChart, LineChart, Filter, Clock, AlertTriangle } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Analytics = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { isDarkMode } = useTheme();
  
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  };
  
  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Security Analytics</h1>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Advanced insights and analytics for your network security
            </p>
          </div>
        </div>
      </header>
      
      {/* Filters */}
      <div className="mb-8 animate-fade-in">
        <AdvancedFilter onFilterChange={handleFilterChange} />
      </div>
      
      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`p-6 backdrop-blur-lg border hover-lift shadow-glow animate-fade-in ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-700/50" 
            : "bg-white/90 border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/20 text-primary rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">2,457</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Total Alerts
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Critical</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>High</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '23%' }}></div>
                </div>
                <span className="text-sm font-medium">23%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Medium</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '12%' }}></div>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className={`p-6 backdrop-blur-lg border hover-lift shadow-glow animate-fade-in ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-700/50" 
            : "bg-white/90 border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">18.5 min</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Avg. Response Time
              </p>
            </div>
          </div>
          <div className="h-[100px] flex items-end justify-between">
            {[35, 48, 25, 65, 32, 45, 70].map((value, i) => (
              <div key={i} className="h-full flex items-end">
                <div 
                  className="w-6 bg-blue-500 rounded-t-sm mx-1 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${value}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>
        
        <Card className={`p-6 backdrop-blur-lg border hover-lift shadow-glow animate-fade-in ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-700/50" 
            : "bg-white/90 border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 text-green-500 rounded-lg">
              <Filter size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">93.7%</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Filter Efficiency
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>DDoS Protection</span>
              <span className="text-sm font-medium text-green-500">99.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Malware Detection</span>
              <span className="text-sm font-medium text-green-500">97.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Intrusion Prevention</span>
              <span className="text-sm font-medium text-yellow-500">84.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Phishing Protection</span>
              <span className="text-sm font-medium text-green-500">93.5%</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-700/50" 
            : "bg-white/90 border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Attack Distribution</h3>
            </div>
            <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              Last 30 days
            </div>
          </div>
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <PieChart className="h-16 w-16 mx-auto text-primary opacity-20" />
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Select filter options to view attack distribution
              </p>
            </div>
          </div>
        </Card>
        
        <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
          isDarkMode 
            ? "bg-gray-900/50 border-gray-700/50" 
            : "bg-white/90 border-gray-200"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Security Trends</h3>
            </div>
            <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              Last 6 months
            </div>
          </div>
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <LineChart className="h-16 w-16 mx-auto text-blue-500 opacity-20" />
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Select filter options to view security trends
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Detailed Analysis */}
      <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
        isDarkMode 
          ? "bg-gray-900/50 border-gray-700/50" 
          : "bg-white/90 border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Detailed Analysis</h3>
          </div>
          <div className="flex gap-2">
            <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
              <Clock size={12} />
              <span>Real-time</span>
            </div>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="max-w-md mx-auto space-y-4">
            <div className="rounded-full h-16 w-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
              <Filter className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-medium">No filters applied</h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Apply filters above to see detailed security analytics and insights tailored to your criteria.
            </p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Analytics;
