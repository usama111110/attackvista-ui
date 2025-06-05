import { Shield, AlertTriangle, Activity, Network, Database, Lock, Zap, AreaChart, Gauge, Globe, Loader2, Search, Calendar, Filter, RefreshCw, BarChart4, Cpu, Eye, BellRing, ArrowUpRight } from "lucide-react";
import { AttackChart } from "@/components/attack-chart";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { DashboardLayout } from "@/components/dashboard-layout";
import { SecurityScore } from "@/components/security-score";
import { InteractiveThreatMap } from "@/components/interactive-threat-map";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
import { ModernCard } from "@/components/ui/modern-card";
import { ModernButton } from "@/components/ui/modern-button";
import { GradientBackground, GlowingOrb } from "@/components/ui/floating-elements";
import { ModernMetricsGrid } from "@/components/modern-metrics-grid";

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

  // Modern metrics data
  const modernMetrics = [
    {
      title: "Total Attacks",
      value: 1234,
      icon: <Shield className="h-6 w-6" />,
      trend: { value: 12, isPositive: false },
      color: "blue" as const
    },
    {
      title: "Critical Threats",
      value: 23,
      icon: <AlertTriangle className="h-6 w-6" />,
      trend: { value: 5, isPositive: false },
      color: "red" as const
    },
    {
      title: "Network Status",
      value: "Stable",
      icon: <Activity className="h-6 w-6" />,
      color: "green" as const
    },
    {
      title: "Protected Systems",
      value: 156,
      icon: <Database className="h-6 w-6" />,
      trend: { value: 3, isPositive: true },
      color: "purple" as const
    }
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
    <GradientBackground>
      {/* Floating background elements */}
      <GlowingOrb size="lg" color="primary" position="top-right" intensity="low" />
      <GlowingOrb size="md" color="secondary" position="bottom-left" intensity="medium" />
      
      <div className="space-y-8 animate-fade-in relative z-10">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <TypographyH1 className="mb-2 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Security Dashboard
              </TypographyH1>
              <TypographyLead className="text-muted-foreground/80">
                Real-time network security monitoring with AI-powered insights
              </TypographyLead>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
                <Loader2 size={14} className={`${isRefreshing ? 'animate-spin' : ''} text-primary`} />
                <span className="font-medium">Live monitoring active</span>
              </div>
              <ModernButton 
                variant="glass" 
                size="sm" 
                className="gap-2"
                onClick={refreshData}
              >
                <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                Refresh
              </ModernButton>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Calendar size={16} className="text-primary" />
            <span className="text-sm font-medium mr-2">Time Period:</span>
            {timePeriods.map((period) => (
              <ModernButton
                key={period.value}
                variant={timeFilter === period.value ? "glow" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter(period.value)}
                className="text-xs h-8"
              >
                {period.label}
              </ModernButton>
            ))}
          </div>

          <div className="mb-6 relative w-full md:w-1/2 lg:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search attacks, IPs, threats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-primary/20 focus:bg-white/80 dark:focus:bg-gray-900/80 transition-all duration-300"
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
          <TabsList className="mb-6 p-1 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-primary/10">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Performance</TabsTrigger>
            <TabsTrigger value="threats" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Threats</TabsTrigger>
            <TabsTrigger value="widgets" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Widgets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="mb-8">
              {isLoading ? (
                <MetricsSkeleton />
              ) : (
                <ModernMetricsGrid metrics={modernMetrics} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {isLoading ? (
                  <ModernCard variant="glass" className="h-[400px]">
                    <CardSkeleton />
                  </ModernCard>
                ) : (
                  <ModernCard variant="glass">
                    <LiveTrafficGraph />
                  </ModernCard>
                )}
              </div>
              {isLoading ? (
                <ModernCard variant="glass" className="h-[400px]">
                  <CardSkeleton />
                </ModernCard>
              ) : (
                <ModernCard variant="glass">
                  <SecurityScore score={78} />
                </ModernCard>
              )}
            </div>
            
            {!isLoading && (
              <div className="mb-8">
                <ModernCard variant="glass">
                  <SecurityTrendsChart />
                </ModernCard>
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ModernCard variant="gradient" className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
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
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-36 h-3 rounded-full overflow-hidden bg-muted/50">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>

              <ModernCard variant="gradient" className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
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
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-36 h-3 rounded-full overflow-hidden bg-muted/50">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              item.value > 80 ? 'bg-gradient-to-r from-red-500 to-red-400' : 
                              item.value > 60 ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 
                              'bg-gradient-to-r from-green-500 to-green-400'
                            }`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ModernCard>
            </div>
          </TabsContent>

          <TabsContent value="threats">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                {isLoading ? (
                  <ModernCard variant="glass" className="h-[400px]">
                    <CardSkeleton />
                  </ModernCard>
                ) : (
                  <ModernCard variant="glass">
                    <InteractiveThreatMap />
                  </ModernCard>
                )}
              </div>
              {isLoading ? (
                <ModernCard variant="glass" className="h-[400px]">
                  <CardSkeleton />
                </ModernCard>
              ) : (
                <ModernCard variant="glass">
                  <AttackChart />
                </ModernCard>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="widgets">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Customizable Dashboard</h2>
              <p className="text-muted-foreground mb-4">
                Add, remove, and resize widgets to customize your security dashboard. Your layout will be saved automatically.
              </p>
              <WidgetManager 
                defaultWidgets={defaultWidgets}
                renderWidget={renderWidget}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Attacks Section */}
        <ModernCard variant="glass" className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Recent Attacks</h3>
              <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30">
                {filteredAttacks.length} Incidents
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <ModernButton variant="outline" size="sm" className="gap-1">
                <Filter size={14} />
                Filter
              </ModernButton>
              <Link to="/live-traffic" className="text-primary hover:underline text-sm font-medium">View all</Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <ModernCard key={i} variant="elevated" size="sm">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttacks.map((attack, i) => (
                <ModernCard key={i} variant="elevated" size="sm" className="transition-all hover:scale-[1.01]">
                  <div className="flex items-center justify-between">
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
                        <p className="text-sm text-muted-foreground">{attack.ip}</p>
                        <p className="text-xs text-muted-foreground mt-1">{attack.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={
                        attack.severity === "Critical" ? "destructive" :
                        attack.severity === "High" ? "secondary" : "outline"
                      }>
                        {attack.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{attack.time}</span>
                      <ModernButton variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Eye size={14} />
                      </ModernButton>
                    </div>
                  </div>
                </ModernCard>
              ))}
              {searchQuery && filteredAttacks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </ModernCard>
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ModernCard variant="gradient" className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <ArrowUpRight size={14} className="text-muted-foreground" />
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
                  <div key={i} className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full bg-muted ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <ModernButton variant="outline" size="sm" className="w-full">View all notifications</ModernButton>
              </div>
            )}
          </ModernCard>
          
          <ModernCard variant="gradient" className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Summary</h3>
              <ArrowUpRight size={14} className="text-muted-foreground" />
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
                <p className="text-sm text-muted-foreground">Security Status Summary</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Attacks", value: "342", change: "+8%", color: "text-red-500" },
                    { label: "Resolved", value: "329", change: "+12%", color: "text-green-500" },
                    { label: "Pending", value: "13", change: "-5%", color: "text-yellow-500" },
                    { label: "Severity", value: "Medium", change: "-", color: "text-blue-500" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.change}</p>
                    </div>
                  ))}
                </div>
                <ModernButton variant="outline" size="sm" className="w-full">View full report</ModernButton>
              </div>
            )}
          </ModernCard>
          
          <ModernCard variant="gradient" className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <ArrowUpRight size={14} className="text-muted-foreground" />
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
          </ModernCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Index;
