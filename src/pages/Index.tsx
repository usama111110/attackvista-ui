
import { Shield, AlertTriangle, Activity, Network, Database, Lock, Zap, AreaChart, Gauge, Globe, Loader2, Search, Calendar, Filter } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { SecurityScore } from "@/components/security-score";
import { ThreatMap } from "@/components/threat-map";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Example attack data
const attackData = [
  { type: "DDoS Attack", ip: "192.168.1.1", time: "2 min ago", severity: "High", details: "TCP flood targeting port 80" },
  { type: "SQL Injection", ip: "192.168.1.45", time: "15 min ago", severity: "Critical", details: "Attack detected on login form" },
  { type: "Brute Force", ip: "192.168.2.12", time: "1 hour ago", severity: "Medium", details: "Multiple failed auth attempts" },
  { type: "XSS Attack", ip: "192.168.3.78", time: "3 hours ago", severity: "High", details: "Stored XSS in comment field" },
  { type: "Suspicious Login", ip: "192.168.5.22", time: "4 hours ago", severity: "Medium", details: "Login from unusual location" }
];

// Time periods for filtering
const timePeriods = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "week" },
  { label: "Last 30 days", value: "month" },
];

const Index = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("today");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Filter data based on search query
  const filteredAttacks = searchQuery 
    ? attackData.filter(attack => 
        attack.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
        attack.ip.includes(searchQuery) ||
        attack.details.toLowerCase().includes(searchQuery.toLowerCase()))
    : attackData;
  
  // Simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Dashboard Updated",
        description: "All metrics and data have been refreshed",
      });
    }, 1500);
  };

  // Auto-refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Security Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time network security monitoring</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800/40 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50">
              <Loader2 size={14} className={`${isRefreshing ? 'animate-spin' : ''} text-primary`} />
              <span className="text-gray-700 dark:text-gray-300">Live monitoring active</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={refreshData}
            >
              <Activity size={14} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Time period selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Calendar size={16} className="text-primary" />
          <span className="text-sm font-medium mr-2">Time Period:</span>
          {timePeriods.map((period) => (
            <Button
              key={period.value}
              variant={timeFilter === period.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(period.value)}
              className="text-xs h-8"
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Search bar */}
        <div className="mb-6 relative w-full md:w-1/2 lg:w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search attacks, IPs, threats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/90 border-gray-200'}`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="threats">Threats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Attacks"
              value="1,234"
              icon={<Shield />}
              trend={{ value: 12, isPositive: false }}
            />
            <MetricsCard
              title="Critical Threats"
              value="23"
              icon={<AlertTriangle className="text-destructive" />}
              trend={{ value: 5, isPositive: false }}
            />
            <MetricsCard
              title="Network Status"
              value="Stable"
              icon={<Activity className="text-green-600 dark:text-green-400" />}
            />
            <MetricsCard
              title="Protected Systems"
              value="156"
              icon={<Database />}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LiveTrafficGraph />
            </div>
            <SecurityScore score={78} />
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
                isDarkMode ? "bg-gray-900/50" : "bg-white/90"
              }`}>
              <h3 className="text-lg font-semibold mb-4">Network Performance</h3>
              <div className="space-y-4">
                {[
                  { name: "Main Gateway", value: 92, icon: <Globe size={18} /> },
                  { name: "Database Server", value: 88, icon: <Database size={18} /> },
                  { name: "Application Server", value: 95, icon: <Zap size={18} /> },
                  { name: "DNS Server", value: 97, icon: <Network size={18} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                        {item.icon}
                      </div>
                      <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
                isDarkMode ? "bg-gray-900/50" : "bg-white/90"
              }`}>
              <h3 className="text-lg font-semibold mb-4">System Health</h3>
              <div className="space-y-4">
                {[
                  { name: "CPU Usage", value: 42, icon: <Gauge size={18} /> },
                  { name: "Memory Usage", value: 65, icon: <AreaChart size={18} /> },
                  { name: "Disk Space", value: 28, icon: <Database size={18} /> },
                  { name: "Network I/O", value: 54, icon: <Activity size={18} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                        {item.icon}
                      </div>
                      <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.value > 80 ? 'bg-red-500' : 
                            item.value > 60 ? 'bg-orange-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
                isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Global Threat Map</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>Live attacks</span>
                  </div>
                </div>
                <ThreatMap />
              </Card>
            </div>
            <AttackChart />
          </div>
        </TabsContent>
      </Tabs>

      <div className={`p-6 rounded-lg backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 mb-6 hover-lift animate-fade-in ${
        isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Attacks</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
            <Link to="/live-traffic" className="text-primary hover:underline text-sm">View all</Link>
          </div>
        </div>
        <div className="space-y-4">
          {filteredAttacks.map((attack, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
              isDarkMode 
                ? "bg-black/20 hover:bg-black/30" 
                : "bg-gray-100/70 hover:bg-gray-200/70"
            }`}>
              <div className="flex items-center gap-4">
                <Network className="text-primary" />
                <div>
                  <p className="font-medium">{attack.type}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{attack.ip}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{attack.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  attack.severity === "Critical" ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400" :
                  attack.severity === "High" ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400" :
                  "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                }`}>
                  {attack.severity}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{attack.time}</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Lock size={16} />
                </Button>
              </div>
            </div>
          ))}
          {searchQuery && filteredAttacks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;
