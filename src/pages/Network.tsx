
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AttackTrendsChart } from "@/components/attack-trends-chart";
import { LiveConnectionsTable } from "@/components/live-connections-table";
import { LiveTrafficGraph } from "@/components/live-traffic-graph";
import { 
  Network as NetworkIcon, 
  Laptop, 
  Server, 
  Smartphone, 
  Wifi, 
  Shield, 
  Globe,
  Share2,
  Activity,
  Eye,
  Filter,
  Download,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { MetricsCard } from "@/components/metrics-card";
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

const Network = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for the network information
  const networkInfo = {
    id: "NET-78921",
    name: "Corporate HQ",
    subnet: "192.168.1.0/24",
    gateway: "192.168.1.1",
    dhcpRange: "192.168.1.100-192.168.1.200",
    dns: ["8.8.8.8", "8.8.4.4"],
    vpnEnabled: true,
    firewallStatus: "Active",
    lastScan: "2 hours ago",
    securityLevel: "High"
  };

  // Network metrics for cards
  const networkMetrics = [
    { name: "Active Connections", value: 1247, change: 5, status: "positive", icon: <Activity className="h-5 w-5" /> },
    { name: "Bandwidth Usage", value: 78, change: -3, status: "positive", icon: <TrendingUp className="h-5 w-5" /> },
    { name: "Protected Devices", value: 8, change: 0, status: "neutral", icon: <Shield className="h-5 w-5" /> },
    { name: "Network Health", value: 98, change: 2, status: "positive", icon: <CheckCircle className="h-5 w-5" /> },
  ];

  // Mock data for protected systems
  const protectedSystems = [
    { id: "SRV-001", name: "Main Database Server", ip: "192.168.1.10", type: "Server", status: "Protected", health: "Excellent", icon: Server },
    { id: "SRV-002", name: "Application Server", ip: "192.168.1.11", type: "Server", status: "Protected", health: "Good", icon: Server },
    { id: "SRV-003", name: "File Server", ip: "192.168.1.12", type: "Server", status: "Protected", health: "Excellent", icon: Server },
    { id: "WS-001", name: "CEO Workstation", ip: "192.168.1.101", type: "Workstation", status: "Protected", health: "Good", icon: Laptop },
    { id: "WS-002", name: "Finance Department", ip: "192.168.1.102", type: "Workstation", status: "Protected", health: "Excellent", icon: Laptop },
    { id: "WS-003", name: "Engineering Team", ip: "192.168.1.103", type: "Workstation", status: "Protected", health: "Good", icon: Laptop },
    { id: "MOB-001", name: "Executive Mobile Devices", ip: "192.168.1.150", type: "Mobile", status: "Protected", health: "Good", icon: Smartphone },
    { id: "IOT-001", name: "Office IoT Devices", ip: "192.168.1.180", type: "IoT", status: "Protected", health: "Fair", icon: Wifi },
  ];

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Network data refreshed",
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/5 rounded-2xl"></div>
        <div className="relative p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <NetworkIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Network Management
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monitor and manage your protected network infrastructure
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Systems Healthy
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-blue-500/5"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                  <DropdownMenuLabel>Network Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAutoRefresh(!isAutoRefresh)}>
                    <Activity className="h-4 w-4 mr-2" />
                    {isAutoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export network report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Network diagnostics
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Network Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {networkMetrics.map((metric, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <MetricsCard
              title={metric.name}
              value={metric.name === "Bandwidth Usage" || metric.name === "Network Health" ? `${metric.value}%` : metric.value}
              icon={metric.icon}
              className="hover:scale-105 transition-all duration-300 border-2 hover:border-blue-500/30 hover:shadow-lg"
              trend={{
                value: Math.abs(metric.change),
                isPositive: metric.status === "positive"
              }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live Traffic
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Network Configuration Card */}
            <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
              isDarkMode 
                ? "bg-gray-900/50 border-gray-700/50 text-gray-100" 
                : "bg-white/90 border-gray-200 text-gray-800"
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg">
                  <NetworkIcon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{networkInfo.name}</h2>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Network ID: {networkInfo.id}</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-gray-600 dark:text-gray-400" />
                    <span>Subnet</span>
                  </div>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 border">{networkInfo.subnet}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
                    <span>Gateway</span>
                  </div>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg text-green-600 dark:text-green-400 border">{networkInfo.gateway}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Laptop size={18} className="text-gray-600 dark:text-gray-400" />
                    <span>DHCP Range</span>
                  </div>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg border">{networkInfo.dhcpRange}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Server size={18} className="text-gray-600 dark:text-gray-400" />
                    <span>DNS Servers</span>
                  </div>
                  <div className="flex gap-2">
                    {networkInfo.dns.map((dns, index) => (
                      <span key={index} className="font-mono bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded border">{dns}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">VPN Status</span>
                    <Badge variant={networkInfo.vpnEnabled ? "default" : "destructive"} className="text-xs">
                      {networkInfo.vpnEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Scan</span>
                    <span className="text-sm">{networkInfo.lastScan}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Firewall</span>
                    <Badge variant="default" className="text-xs bg-green-500">{networkInfo.firewallStatus}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Security Level</span>
                    <span className="text-blue-500 font-medium">{networkInfo.securityLevel}</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Protection Status Card */}
            <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
              isDarkMode 
                ? "bg-gray-900/50 border-gray-700/50 text-gray-100" 
                : "bg-white/90 border-gray-200 text-gray-800"
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-500/20 text-green-500 rounded-lg">
                  <Shield size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Protection Status</h2>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{protectedSystems.length} systems protected</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border flex flex-col items-center justify-center hover:bg-opacity-80 transition-colors ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-blue-50 border-blue-200"
                }`}>
                  <Server size={24} className="text-blue-500 mb-2" />
                  <span className="text-2xl font-bold text-blue-500">
                    {protectedSystems.filter(s => s.type === "Server").length}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Servers</span>
                </div>
                
                <div className={`p-4 rounded-lg border flex flex-col items-center justify-center hover:bg-opacity-80 transition-colors ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-purple-50 border-purple-200"
                }`}>
                  <Laptop size={24} className="text-purple-600 dark:text-purple-400 mb-2" />
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {protectedSystems.filter(s => s.type === "Workstation").length}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Workstations</span>
                </div>
                
                <div className={`p-4 rounded-lg border flex flex-col items-center justify-center hover:bg-opacity-80 transition-colors ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-yellow-50 border-yellow-200"
                }`}>
                  <Smartphone size={24} className="text-yellow-600 dark:text-yellow-400 mb-2" />
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {protectedSystems.filter(s => s.type === "Mobile").length}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Mobile</span>
                </div>
                
                <div className={`p-4 rounded-lg border flex flex-col items-center justify-center hover:bg-opacity-80 transition-colors ${
                  isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-green-50 border-green-200"
                }`}>
                  <Wifi size={24} className="text-green-600 dark:text-green-400 mb-2" />
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {protectedSystems.filter(s => s.type === "IoT").length}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">IoT Devices</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <LiveTrafficGraph />
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
            isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Live Network Connections</h3>
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Live Data
              </Badge>
            </div>
            <LiveConnectionsTable />
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <AttackTrendsChart />
        </TabsContent>
      </Tabs>
      
      {/* Protected Systems Table */}
      <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 mb-6 hover-lift animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Protected Systems</h3>
          <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800/40 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50">
            <Shield size={14} className="text-green-500" />
            <span>All systems secure</span>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-700/50">
              <TableHead className="text-gray-600 dark:text-gray-400">System ID</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">System Name</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">IP Address</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">Type</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">Health</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protectedSystems.map((system, index) => (
              <TableRow key={system.id} className="border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <TableCell className="font-mono">{system.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <system.icon size={16} className="text-blue-500" />
                    <span>{system.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono">{system.ip}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {system.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      system.health === "Excellent" 
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                        : system.health === "Good"
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                        : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
                    }
                  >
                    {system.health}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {system.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default Network;
