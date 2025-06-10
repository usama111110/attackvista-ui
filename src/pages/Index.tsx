import { Shield, AlertTriangle, Activity, Network, Database, Lock, Zap, AreaChart, Gauge, Globe, Loader2, Search, Calendar, Filter, RefreshCw, BarChart4, Cpu, Eye, BellRing, ArrowUpRight } from "lucide-react";
import { EnhancedMetricsCard } from "@/components/enhanced-metrics-card";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { SecurityScore } from "@/components/security-score";
import { InteractiveThreatMap } from "@/components/interactive-threat-map";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { MetricsSkeleton, LoadingSkeleton, CardSkeleton } from "@/components/ui/loading-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { SecurityTrendsChart } from "@/components/data-visualizations/security-trends-chart";
import { useNotifications } from "@/components/notification-provider";
import { WidgetManager, WidgetType } from "@/components/widget-manager";
import { AIThreatDetection } from "@/components/ai-threat-detection";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { EnhancedCard } from "@/components/ui/enhanced-card";

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
  const { pushNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("today");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default widgets for the dashboard
  const defaultWidgets = [
    { id: "security-score-1", type: "security-score" as WidgetType, title: "Security Score", defaultSize: "small" as const },
    { id: "attack-chart-1", type: "attack-chart" as WidgetType, title: "Attack Distribution", defaultSize: "medium" as const },
    { id: "threat-map-1", type: "threat-map" as WidgetType, title: "Threat Map", defaultSize: "large" as const }
  ];

  // Render widget based on type
  const renderWidget = (type: WidgetType) => {
    switch(type) {
      case "security-score":
        return <SecurityScore score={78} />;
      case "attack-chart":
        return <AttackChart />;
      case "threat-map":
        return <InteractiveThreatMap />;
      case "live-traffic":
        return <LiveTrafficGraph />;
      case "metrics":
        return (
          <div className="grid grid-cols-2 gap-4">
            <EnhancedMetricsCard 
              title="Total Attacks" 
              value={1234} 
              icon={<Shield className="text-blue-500 h-5 w-5" />} 
              trend={{ value: 12, isPositive: false }} 
            />
            <EnhancedMetricsCard 
              title="Critical Threats" 
              value={23} 
              icon={<AlertTriangle className="text-red-500 h-5 w-5" />} 
              trend={{ value: 5, isPositive: false }} 
            />
          </div>
        );
      case "network-status":
        return (
          <Card className="p-4 h-full">
            <h3 className="font-medium mb-4">Network Status</h3>
            <div className="space-y-4">
              {["Gateway", "Core Router", "Firewall", "Load Balancer"].map((device, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span>{device}</span>
                  <span className="flex items-center gap-1 text-green-500">
                    <Activity size={14} />
                    Online
                  </span>
                </div>
              ))}
            </div>
          </Card>
        );
      case "system-health":
        return (
          <Card className="p-4 h-full">
            <h3 className="font-medium mb-4">System Health</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>CPU</span>
                <span>45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory</span>
                <span>62%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Disk</span>
                <span>37%</span>
              </div>
            </div>
          </Card>
        );
      case "ai-threat-detection":
        return <AIThreatDetection />; // New AI threat detection widget
      default:
        return (
          <Card className="p-4 h-full flex items-center justify-center">
            <span className="text-gray-500">Widget not configured</span>
          </Card>
        );
    }
  };
  
  // Filter data based on search query
  const filteredAttacks = searchQuery 
    ? attackData.filter(attack => 
        attack.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
        attack.ip.includes(searchQuery) ||
        attack.details.toLowerCase().includes(searchQuery.toLowerCase()))
    : attackData;
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Simulate a welcome notification
      setTimeout(() => {
        pushNotification({
          type: "info",
          title: "Welcome to SecureSentry",
          message: "Your security dashboard is ready. Monitoring network activity in real-time."
        });
      }, 2000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [pushNotification]);
  
  // Simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "All metrics and data have been refreshed",
      });
      
      // Simulate finding a new threat on refresh
      pushNotification({
        type: "attack",
        title: "New Threat Detected",
        message: "Potential port scanning detected from IP 203.45.78.32"
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
      <div className="space-y-8 animate-fade-in">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <TypographyH1 className="mb-2">Security Dashboard</TypographyH1>
              <TypographyLead>Real-time network security monitoring with AI-powered insights</TypographyLead>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border">
                <Loader2 size={14} className={`${isRefreshing ? 'animate-spin' : ''} text-primary`} />
                <span>Live monitoring active</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 hover:scale-105 transition-transform"
                onClick={refreshData}
              >
                <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm font-medium mr-2">Time Period:</span>
            {timePeriods.map((period) => (
              <Button
                key={period.value}
                variant={timeFilter === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(period.value)}
                className="text-xs h-8 transition-all hover:scale-105"
              >
                {period.label}
              </Button>
            ))}
          </div>

          <div className="mb-6 relative w-full md:w-1/2 lg:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search attacks, IPs, threats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30 border-0 focus:bg-background/50 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6 p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-lg">Performance</TabsTrigger>
            <TabsTrigger value="threats" className="rounded-lg">Threats</TabsTrigger>
            <TabsTrigger value="widgets" className="rounded-lg">Widgets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {isLoading ? (
                <MetricsSkeleton />
              ) : (
                <>
                  <EnhancedMetricsCard
                    title="Total Attacks"
                    value={1234}
                    icon={<Shield className="text-blue-500 h-5 w-5" />}
                    trend={{ value: 12, isPositive: false }}
                    className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50"
                  />
                  <EnhancedMetricsCard
                    title="Critical Threats"
                    value={23}
                    icon={<AlertTriangle className="text-red-500 h-5 w-5" />}
                    trend={{ value: 5, isPositive: false }}
                    className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-200/50"
                  />
                  <EnhancedMetricsCard
                    title="Network Status"
                    value="Stable"
                    icon={<Activity className="text-green-500 h-5 w-5" />}
                    className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/50"
                    animated={false}
                  />
                  <EnhancedMetricsCard
                    title="Protected Systems"
                    value={156}
                    icon={<Database className="text-purple-500 h-5 w-5" />}
                    trend={{ value: 3, isPositive: true }}
                    className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50"
                  />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {isLoading ? (
                  <EnhancedCard className="h-[400px]">
                    <CardSkeleton />
                  </EnhancedCard>
                ) : (
                  <LiveTrafficGraph />
                )}
              </div>
              {isLoading ? (
                <EnhancedCard className="h-[400px]">
                  <CardSkeleton />
                </EnhancedCard>
              ) : (
                <SecurityScore score={78} />
              )}
            </div>
            
            {!isLoading && (
              <div className="mb-8">
                <SecurityTrendsChart />
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
                  isDarkMode ? "bg-gray-900/50" : "bg-white/90"
                }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Network Performance</h3>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30">
                    Real-time
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Main Gateway", value: 92, icon: <Globe size={18} /> },
                    { name: "Database Server", value: 88, icon: <Database size={18} /> },
                    { name: "Application Server", value: 95, icon: <Zap size={18} /> },
                    { name: "DNS Server", value: 97, icon: <Network size={18} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
                          {item.icon}
                        </div>
                        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">System Health</h3>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30">
                    Healthy
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "CPU Usage", value: 42, icon: <Cpu size={18} /> },
                    { name: "Memory Usage", value: 65, icon: <BarChart4 size={18} /> },
                    { name: "Disk Space", value: 28, icon: <Database size={18} /> },
                    { name: "Network I/O", value: 54, icon: <Activity size={18} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-gray-100 to-gray-200"}`}>
                          {item.icon}
                        </div>
                        <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-36 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/70"}`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              item.value > 80 ? 'bg-gradient-to-r from-red-500 to-red-400' : 
                              item.value > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 
                              'bg-gradient-to-r from-green-500 to-green-400'
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
                {isLoading ? (
                  <EnhancedCard className="h-[400px]">
                    <CardSkeleton />
                  </EnhancedCard>
                ) : (
                  <InteractiveThreatMap />
                )}
              </div>
              {isLoading ? (
                <EnhancedCard className="h-[400px]">
                  <CardSkeleton />
                </EnhancedCard>
              ) : (
                <AttackChart />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="widgets">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Customizable Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add, remove, and resize widgets to customize your security dashboard. Your layout will be saved automatically.
              </p>
              <WidgetManager 
                defaultWidgets={defaultWidgets}
                renderWidget={renderWidget}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className={`p-6 rounded-lg backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 mb-6 hover-lift animate-fade-in ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Recent Attacks</h3>
              <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30">
                {filteredAttacks.length} Incidents
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter size={14} />
                Filter
              </Button>
              <Link to="/live-traffic" className="text-primary hover:underline text-sm">View all</Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttacks.map((attack, i) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.01] ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-black/30 to-gray-900/20 hover:from-black/40 hover:to-gray-900/30 border border-gray-700/30" 
                    : "bg-gradient-to-r from-white to-gray-100/80 hover:from-white hover:to-gray-200/60 border border-gray-200/60"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      attack.severity === "Critical" 
                        ? "bg-red-500/10 text-red-500" 
                        : attack.severity === "High" 
                          ? "bg-orange-500/10 text-orange-500" 
                          : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      <Network className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {attack.type}
                        {i === 0 && (
                          <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30 animate-pulse">
                            New
                          </Badge>
                        )}
                      </p>
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
                      <Eye size={14} />
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
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-white/90"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <ArrowUpRight size={14} className="text-gray-400" />
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { icon: <AlertTriangle size={14} />, text: "Critical attack detected on web server", time: "5 min ago", color: "text-red-500" },
                  { icon: <BellRing size={14} />, text: "System update completed successfully", time: "2 hours ago", color: "text-green-500" },
                  { icon: <Shield size={14} />, text: "Firewall rules updated", time: "4 hours ago", color: "text-blue-500" },
                ].map((item, i) => (
                  <div key={i} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/70"}`}>
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-white"} ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm">{item.text}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">View all notifications</Button>
              </div>
            )}
          </Card>
          
          <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-white/90"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Summary</h3>
              <ArrowUpRight size={14} className="text-gray-400" />
            </div>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-full rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Security Status Summary</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Attacks", value: "342", change: "+8%", color: "text-red-500" },
                    { label: "Resolved", value: "329", change: "+12%", color: "text-green-500" },
                    { label: "Pending", value: "13", change: "-5%", color: "text-yellow-500" },
                    { label: "Severity", value: "Medium", change: "-", color: "text-blue-500" },
                  ].map((item, i) => (
                    <div key={i} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/70"}`}>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-gray-500">{item.change}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">View full report</Button>
              </div>
            )}
          </Card>
          
          <Card className={`p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700/50 hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50" : "bg-white/90"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <ArrowUpRight size={14} className="text-gray-400" />
            </div>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Run Security Scan", icon: <Shield size={14} />, color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" },
                  { label: "Update Firewall Rules", icon: <Lock size={14} />, color: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
                  { label: "System Backup", icon: <Database size={14} />, color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20" },
                  { label: "Generate Report", icon: <BarChart4 size={14} />, color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20" },
                ].map((item, i) => (
                  <Button 
                    key={i} 
                    variant="outline"
                    className={`w-full justify-start gap-2 ${item.color}`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;

</edits_to_apply>
