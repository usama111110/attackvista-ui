import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { AttackChart } from "@/components/attack-chart";
import { AIThreatDetection } from "@/components/ai-threat/ai-threat-detection";
import { Shield, AlertTriangle, Clock, LineChart, Filter, BarChart3, ArrowUpDown, Download, Target, TrendingUp, Eye, Zap, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AttackDetailView } from "@/components/attack-detail-view";
import { DateRangePicker } from "@/components/date-range-picker";
import { MetricsCard } from "@/components/metrics-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define the attack types
export const attackTypes = [
  { id: "ddos", name: "DDoS", value: 45, description: "Distributed Denial of Service attacks targeting network availability" },
  { id: "dns", name: "DNS", value: 32, description: "DNS-based attacks targeting domain name resolution" },
  { id: "exfil", name: "DNS Exfiltration", value: 28, description: "Data exfiltration through DNS queries" },
  { id: "ransomware", name: "Ransomware", value: 22, description: "Malware designed to block access to systems until a ransom is paid" },
  { id: "lateral", name: "Lateral Movement", value: 18, description: "Techniques used to move through a network while searching for assets and data" },
  { id: "encrypted", name: "Encrypted Attack", value: 15, description: "Attacks using encryption to evade detection" },
  { id: "mitre", name: "MITRE Attack", value: 12, description: "Attacks documented in the MITRE ATT&CK framework" },
  { id: "anomaly", name: "Anomaly", value: 10, description: "Unusual behavior detected that may indicate a security threat" },
  { id: "worm", name: "Network Worm", value: 8, description: "Self-replicating malware that spreads across networks" },
  { id: "apt", name: "APT", value: 17, description: "Advanced Persistent Threat - sophisticated, targeted cyber attacks" },
  { id: "arp", name: "ARP Poisoning", value: 14, description: "Address Resolution Protocol attacks that redirect network traffic" },
  { id: "xss", name: "XSS", value: 25, description: "Cross-Site Scripting attacks that inject malicious code into websites" },
  { id: "sql", name: "SQL Injection", value: 30, description: "Attacks that insert malicious SQL code into database queries" },
];

// Generate mock data for the attack metrics cards
const attackMetrics = [
  { name: "Active Threats", value: 27, change: 12, status: "negative", icon: <AlertTriangle className="h-5 w-5" /> },
  { name: "Attack Types", value: 9, change: 3, status: "negative", icon: <Shield className="h-5 w-5" /> },
  { name: "Mitigated", value: 132, change: 8, status: "positive", icon: <Shield className="h-5 w-5" /> },
  { name: "Pending Review", value: 15, change: 5, status: "negative", icon: <Clock className="h-5 w-5" /> },
];

const Detection = () => {
  const [selectedAttackId, setSelectedAttackId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [sortBy, setSortBy] = useState<"name" | "value">("value");
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const selectedAttack = selectedAttackId 
    ? attackTypes.find(attack => attack.id === selectedAttackId) 
    : null;

  // Sort attacks based on the selected sort criteria
  const sortedAttackTypes = [...attackTypes].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return b.value - a.value;
    }
  });

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Detection data refreshed",
        description: `Updated as of ${new Date().toLocaleTimeString()}`,
      });
    }, 1500);
  };

  // Auto-refresh effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isAutoRefresh) {
      interval = window.setInterval(() => {
        refreshData();
      }, 60000); // refresh every minute
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoRefresh]);

  return (
    <DashboardLayout>
      {/* Enhanced Header with Gradient Background */}
      <div className="relative mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-2xl"></div>
        <div className="relative p-6 rounded-2xl border border-primary/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Threat Detection Center
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Real-time monitoring and analysis of security threats
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                27 Active Threats
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary/5"
                onClick={refreshData}
                disabled={isLoading}
              >
                <Activity className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Options
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Detection Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("value")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Sort by count
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort alphabetically
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAutoRefresh(!isAutoRefresh)}>
                    <Clock className="h-4 w-4 mr-2" />
                    {isAutoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Date Range Filter */}
      <div className="mb-8">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Enhanced Tabs with Better Styling */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="ai-detection" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Detection
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-8">
          {/* Enhanced Attack Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {attackMetrics.map((metric, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <MetricsCard
                  title={metric.name}
                  value={metric.value}
                  icon={metric.icon}
                  className="hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 hover:shadow-lg"
                  trend={{
                    value: metric.change,
                    isPositive: metric.status === "positive"
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Enhanced Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {selectedAttack ? (
                <AttackDetailView 
                  attack={selectedAttack} 
                  timeRange={dateRange ? `${dateRange.from?.toISOString()}-${dateRange.to?.toISOString()}` : "24h"} 
                  onBack={() => setSelectedAttackId(null)}
                />
              ) : (
                <Card className="backdrop-blur-lg bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Select Attack Type for Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Click on any attack type below to view detailed graphs and analysis
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sortedAttackTypes.slice(0, 9).map((attack, index) => (
                        <button
                          key={attack.id}
                          onClick={() => setSelectedAttackId(attack.id)}
                          className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 text-left transform hover:shadow-lg"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold group-hover:text-primary transition-colors">
                              {attack.name}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {attack.value}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {attack.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <AttackChart />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="backdrop-blur-lg bg-gradient-to-br from-red-50/80 to-white/90 dark:from-red-900/20 dark:to-gray-800/50 border-2 border-red-200/50 dark:border-red-800/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Critical Alerts</h3>
                </div>
                <div className="space-y-4">
                  {attackTypes.slice(0, 5).map((attack, index) => (
                    <div 
                      key={attack.id}
                      className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-red-200 dark:border-red-800/30 flex items-center justify-between hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">{attack.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                            {attack.description}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-gradient-to-br from-amber-50/80 to-white/90 dark:from-amber-900/20 dark:to-gray-800/50 border-2 border-amber-200/50 dark:border-amber-800/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Warning Alerts</h3>
                </div>
                <div className="space-y-4">
                  {attackTypes.slice(5, 10).map((attack, index) => (
                    <div 
                      key={attack.id}
                      className="p-4 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-amber-200 dark:border-amber-800/30 flex items-center justify-between hover:bg-white dark:hover:bg-gray-800 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">{attack.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                            {attack.description}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Attack Analysis Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive visualization of attack patterns and trends
            </p>
          </div>
          <AttackTypesVisualization />
        </TabsContent>

        <TabsContent value="ai-detection" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI-Powered Threat Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced machine learning algorithms analyzing network behavior
            </p>
          </div>
          <AIThreatDetection />
        </TabsContent>
      </Tabs>

      {/* Enhanced Attack insights section */}
      <div className="mt-12">
        <AttackInsights />
      </div>
    </DashboardLayout>
  );
};

export default Detection;
