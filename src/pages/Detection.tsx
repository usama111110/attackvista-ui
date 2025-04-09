
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttackTypesVisualization } from "@/components/attack-types-visualization";
import { AttackInsights } from "@/components/attack-insights";
import { AttackChart } from "@/components/attack-chart";
import { Shield, AlertTriangle, Clock, LineChart, Filter, BarChart3, ArrowUpDown, Download, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AttackDetailView } from "@/components/attack-detail-view";
import { TimeFilter } from "@/components/time-filter";
import { MetricsCard } from "@/components/metrics-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const [timeRange, setTimeRange] = useState("24h");
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
      <header className="mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Attack Detection</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and analyze security threats across your network</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-700/50 animate-pulse">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">27 Active Threats Detected</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={refreshData}
              disabled={isLoading}
            >
              <Clock className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
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
      </header>

      {/* Time Filter */}
      <div className="mb-6 animate-fade-in">
        <TimeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {/* Attack Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {attackMetrics.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.name}
                value={metric.value}
                icon={metric.icon}
                className="hover-lift"
                trend={{
                  value: metric.change,
                  isPositive: metric.status === "positive"
                }}
              />
            ))}
          </div>
          
          {/* Main attack visualization section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {selectedAttack ? (
                <AttackDetailView 
                  attack={selectedAttack} 
                  timeRange={timeRange} 
                  onBack={() => setSelectedAttackId(null)}
                />
              ) : (
                <Card className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 data-card hover-lift animate-fade-in">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Select an attack type to view detailed analysis
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Click on any attack type from the list to view detailed graphs and analysis for that specific attack.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {sortedAttackTypes.map((attack) => (
                        <button
                          key={attack.id}
                          onClick={() => setSelectedAttackId(attack.id)}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-all duration-300 hover:scale-105 text-left hover-lift shadow-glow group"
                        >
                          <div className="font-medium group-hover:text-primary transition-colors">{attack.name}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{attack.value} incidents</div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            <div>
              <AttackChart />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Critical Alerts</h3>
                <div className="space-y-4">
                  {attackTypes.slice(0, 5).map(attack => (
                    <div 
                      key={attack.id}
                      className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium">{attack.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{attack.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Warning Alerts</h3>
                <div className="space-y-4">
                  {attackTypes.slice(5, 10).map(attack => (
                    <div 
                      key={attack.id}
                      className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="font-medium">{attack.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{attack.description}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="h-8">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          {/* Attack types visualization */}
          {!selectedAttack && (
            <>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 animate-fade-in">
                <LineChart className="h-5 w-5 text-primary" />
                <span className="dark:text-gradient">Attack Types Analysis</span>
              </h2>
              <AttackTypesVisualization />
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Attack insights section */}
      <div className="mt-6">
        <AttackInsights />
      </div>
    </DashboardLayout>
  );
};

export default Detection;
