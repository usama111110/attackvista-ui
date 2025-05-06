import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Shield, Server, RefreshCw, Download, HardDrive, Cpu, Network, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { AgentDownloadCard } from "@/components/agent-download-card";
import { AgentApiSpecs } from "@/components/agent-api-specs";
import { AgentScanControl } from "@/components/agent-scan-control";

// Mock data - in a real app this would come from your backend API
const mockAgents = [
  { 
    id: "agent-001", 
    name: "Desktop-Win-01", 
    status: "online", 
    os: "Windows 11", 
    lastSeen: "2 minutes ago",
    ip: "192.168.1.105",
    version: "1.0.3",
    securityScore: 87
  },
  { 
    id: "agent-002", 
    name: "MacBook-Pro-Jane", 
    status: "online", 
    os: "macOS 13.1", 
    lastSeen: "5 minutes ago",
    ip: "192.168.1.120",
    version: "1.0.2",
    securityScore: 92
  },
  { 
    id: "agent-003", 
    name: "Ubuntu-Server-01", 
    status: "offline", 
    os: "Ubuntu 22.04", 
    lastSeen: "3 hours ago",
    ip: "192.168.1.150",
    version: "1.0.3",
    securityScore: 78
  },
];

const mockSecurityEvents = [
  { 
    id: "event-001", 
    agentId: "agent-001", 
    type: "malware-detection", 
    severity: "high", 
    timestamp: "2023-04-12T14:32:00Z", 
    details: "Suspicious executable detected in C:\\Users\\Downloads\\",
    status: "resolved"
  },
  { 
    id: "event-002", 
    agentId: "agent-002", 
    type: "unauthorized-access", 
    severity: "critical", 
    timestamp: "2023-04-12T12:45:00Z", 
    details: "Multiple failed login attempts from IP 203.45.67.89",
    status: "active" 
  },
  { 
    id: "event-003", 
    agentId: "agent-003", 
    type: "vulnerability", 
    severity: "medium", 
    timestamp: "2023-04-11T23:12:00Z", 
    details: "Outdated package with known vulnerability: openssl 1.1.1",
    status: "active" 
  },
];

const mockSystemInfo = [
  {
    agentId: "agent-001",
    cpuUsage: 32,
    memoryUsage: 64,
    diskUsage: 78,
    uptime: "3 days, 7 hours",
    networkConnections: 47,
    runningProcesses: 124,
    openPorts: [80, 443, 3389]
  },
  {
    agentId: "agent-002",
    cpuUsage: 24,
    memoryUsage: 42,
    diskUsage: 56,
    uptime: "5 days, 12 hours",
    networkConnections: 32,
    runningProcesses: 98,
    openPorts: [22, 80, 443]
  },
  {
    agentId: "agent-003",
    cpuUsage: 15,
    memoryUsage: 38,
    diskUsage: 47,
    uptime: "14 days, 3 hours",
    networkConnections: 12,
    runningProcesses: 76,
    openPorts: [22, 80, 443, 8080]
  }
];

// New mock data for scans
const mockScanHistory = [
  {
    id: "scan-001",
    agentId: "agent-001",
    type: "quick",
    startTime: "2023-04-12T10:30:00Z",
    endTime: "2023-04-12T10:35:00Z",
    status: "completed",
    filesScanned: 5432,
    threatsFound: 2,
    threatsRemoved: 2
  },
  {
    id: "scan-002",
    agentId: "agent-002",
    type: "full",
    startTime: "2023-04-11T22:00:00Z",
    endTime: "2023-04-12T00:15:00Z",
    status: "completed",
    filesScanned: 156743,
    threatsFound: 0,
    threatsRemoved: 0
  },
  {
    id: "scan-003",
    agentId: "agent-003",
    type: "custom",
    startTime: "2023-04-10T15:20:00Z",
    endTime: "2023-04-10T15:45:00Z",
    status: "completed",
    filesScanned: 34521,
    threatsFound: 5,
    threatsRemoved: 4
  },
];

const Security = () => {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [agents, setAgents] = useState(mockAgents);
  const [securityEvents, setSecurityEvents] = useState(mockSecurityEvents);
  const [systemInfo, setSystemInfo] = useState(mockSystemInfo);
  const [scanHistory, setScanHistory] = useState(mockScanHistory);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isScanningAgent, setIsScanningAgent] = useState<string | null>(null);

  // Simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      toast({
        title: "Data refreshed",
        description: "Latest security information has been loaded",
      });
      setIsRefreshing(false);
    }, 1500);
  };

  // Simulate starting a scan
  const startScan = (agentId: string, scanType: 'quick' | 'full' | 'custom') => {
    setIsScanningAgent(agentId);
    
    // Show immediate feedback
    toast({
      title: `${scanType.charAt(0).toUpperCase() + scanType.slice(1)} scan started`,
      description: `Scanning ${agents.find(a => a.id === agentId)?.name || 'agent'}...`
    });
    
    // Simulate scan time based on type
    const scanTime = scanType === 'quick' ? 3000 : scanType === 'full' ? 5000 : 4000;
    
    setTimeout(() => {
      // Add the new scan to history
      const newScan = {
        id: `scan-${Date.now()}`,
        agentId,
        type: scanType,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(), // Simplified for demo
        status: "completed",
        filesScanned: scanType === 'quick' ? 5000 : scanType === 'full' ? 150000 : 30000,
        threatsFound: Math.floor(Math.random() * 3),
        threatsRemoved: Math.floor(Math.random() * 3)
      };
      
      setScanHistory(prev => [newScan, ...prev]);
      setIsScanningAgent(null);
      
      toast({
        title: "Scan completed",
        description: `${newScan.threatsFound} threats found, ${newScan.threatsRemoved} removed`
      });
    }, scanTime);
  };

  // Filter data for selected agent or show all
  const filteredAgents = selectedAgent 
    ? agents.filter(agent => agent.id === selectedAgent)
    : agents;
  
  const filteredEvents = selectedAgent
    ? securityEvents.filter(event => event.agentId === selectedAgent)
    : securityEvents;
    
  const filteredScans = selectedAgent
    ? scanHistory.filter(scan => scan.agentId === selectedAgent)
    : scanHistory;

  // Function to get severity badge styling
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return isDarkMode ? "bg-red-900/40 text-red-400" : "bg-red-100 text-red-600";
      case "high":
        return isDarkMode ? "bg-orange-900/40 text-orange-400" : "bg-orange-100 text-orange-600";
      case "medium":
        return isDarkMode ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-100 text-yellow-600";
      default:
        return isDarkMode ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600";
    }
  };

  // Calculate overall security status
  const overallSecurityScore = agents.reduce((sum, agent) => sum + agent.securityScore, 0) / agents.length;
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 dark:text-gradient">Security Agents</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and manage security agents across your network</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1" onClick={refreshData}>
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              Refresh Data
            </Button>
            <select 
              className={`p-2 rounded-md text-sm ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} border border-gray-300`}
              value={selectedAgent || ""}
              onChange={(e) => setSelectedAgent(e.target.value || null)}
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Connected Agents</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="scans">Antivirus Scans</TabsTrigger>
            <TabsTrigger value="download">Agent Download</TabsTrigger>
            <TabsTrigger value="api">API Specs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className={`p-6 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Agents</h3>
                    <p className="text-2xl font-bold mt-1">{agents.length}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-100"}`}>
                    <Shield className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}>
                      {agents.filter(a => a.status === "online").length} Online
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"}`}>
                      {agents.filter(a => a.status === "offline").length} Offline
                    </span>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Security Score</h3>
                    <p className="text-2xl font-bold mt-1">{Math.round(overallSecurityScore)}%</p>
                  </div>
                  <div className={`p-2 rounded-lg ${overallSecurityScore > 80 ? (isDarkMode ? "bg-green-900/20" : "bg-green-100") : (isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100")}`}>
                    <Shield className={`h-5 w-5 ${overallSecurityScore > 80 ? "text-green-500" : "text-yellow-500"}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress 
                    value={overallSecurityScore} 
                    className={`h-2 ${
                      overallSecurityScore > 80 ? "bg-green-200 dark:bg-green-950" : 
                      overallSecurityScore > 60 ? "bg-yellow-200 dark:bg-yellow-950" : 
                      "bg-red-200 dark:bg-red-950"
                    }`} 
                  />
                </div>
              </Card>

              <Card className={`p-6 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Security Events</h3>
                    <p className="text-2xl font-bold mt-1">{securityEvents.length}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-orange-900/20" : "bg-orange-100"}`}>
                    <Server className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"}`}>
                      {securityEvents.filter(e => e.status === "active" && (e.severity === "critical" || e.severity === "high")).length} Critical
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${isDarkMode ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-600"}`}>
                      {securityEvents.filter(e => e.status === "active" && e.severity === "medium").length} Medium
                    </span>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Last Scan</h3>
                    <p className="text-2xl font-bold mt-1">4h ago</p>
                  </div>
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-purple-900/20" : "bg-purple-100"}`}>
                    <Scan className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => startScan("agent-001", "full")}>
                    Run Full Scan
                  </Button>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className={`p-6 lg:col-span-2 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <h3 className="text-lg font-semibold mb-4">Recent Security Events</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityEvents.slice(0, 5).map((event) => {
                      const agent = agents.find(a => a.id === event.agentId);
                      return (
                        <TableRow key={event.id}>
                          <TableCell>{agent?.name || 'Unknown'}</TableCell>
                          <TableCell className="capitalize">{event.type.replace(/-/g, ' ')}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadge(event.severity)}>
                              {event.severity.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={event.status === "active" ? "destructive" : "outline"}>
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>

              <Card className={`p-6 hover-lift ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <h3 className="text-lg font-semibold mb-4">Agent Status</h3>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className={`p-4 rounded-lg border ${
                      agent.status === "online" 
                        ? isDarkMode ? "border-green-800/30 bg-green-900/10" : "border-green-200 bg-green-50" 
                        : isDarkMode ? "border-gray-700/30 bg-gray-800/10" : "border-gray-200 bg-gray-50"
                    }`}>
                      <div className="flex justify-between">
                        <div className="font-medium">{agent.name}</div>
                        <Badge variant={agent.status === "online" ? "outline" : "secondary"} className={`capitalize ${agent.status === "online" ? "text-green-500 border-green-500" : ""}`}>
                          {agent.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{agent.os}</div>
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <div>Last seen: {agent.lastSeen}</div>
                        <div>v{agent.version}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="agents">
            <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
              <h3 className="text-lg font-semibold mb-4">Connected Agents</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>OS</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Security Score</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Version</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.os}</TableCell>
                      <TableCell>{agent.ip}</TableCell>
                      <TableCell>
                        <Badge variant={agent.status === "online" ? "outline" : "secondary"} className={`capitalize ${agent.status === "online" ? "text-green-500 border-green-500" : ""}`}>
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={agent.securityScore} 
                            className={`h-2 w-24 ${
                              agent.securityScore > 80 ? "bg-green-200 dark:bg-green-950" : 
                              agent.securityScore > 60 ? "bg-yellow-200 dark:bg-yellow-950" : 
                              "bg-red-200 dark:bg-red-950"
                            }`} 
                          />
                          <span>{agent.securityScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{agent.lastSeen}</TableCell>
                      <TableCell>v{agent.version}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <h3 className="text-lg font-semibold mb-4">System Information</h3>
                {selectedAgent ? (
                  systemInfo.filter(info => info.agentId === selectedAgent).map(info => (
                    <div key={info.agentId} className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Cpu size={14} /> CPU Usage
                          </span>
                          <span>{info.cpuUsage}%</span>
                        </div>
                        <Progress value={info.cpuUsage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Server size={14} /> Memory Usage
                          </span>
                          <span>{info.memoryUsage}%</span>
                        </div>
                        <Progress value={info.memoryUsage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <HardDrive size={14} /> Disk Usage
                          </span>
                          <span>{info.diskUsage}%</span>
                        </div>
                        <Progress value={info.diskUsage} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                          <div className="text-sm text-muted-foreground">Uptime</div>
                          <div className="font-medium">{info.uptime}</div>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                          <div className="text-sm text-muted-foreground">Network Connections</div>
                          <div className="font-medium">{info.networkConnections}</div>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                          <div className="text-sm text-muted-foreground">Running Processes</div>
                          <div className="font-medium">{info.runningProcesses}</div>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                          <div className="text-sm text-muted-foreground">Open Ports</div>
                          <div className="font-medium">{info.openPorts.join(", ")}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Select an agent to view system information
                  </div>
                )}
              </Card>

              <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
                <h3 className="text-lg font-semibold mb-4">Network Activity</h3>
                {selectedAgent ? (
                  <div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                      <h4 className="font-medium mb-2">Active Connections</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Remote IP</TableHead>
                            <TableHead>Port</TableHead>
                            <TableHead>Protocol</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>203.0.113.5</TableCell>
                            <TableCell>443</TableCell>
                            <TableCell>TCP</TableCell>
                            <TableCell>ESTABLISHED</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>192.168.1.1</TableCell>
                            <TableCell>53</TableCell>
                            <TableCell>UDP</TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>198.51.100.12</TableCell>
                            <TableCell>80</TableCell>
                            <TableCell>TCP</TableCell>
                            <TableCell>ESTABLISHED</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Network Interfaces</h4>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="font-medium">Interface</div>
                            <div className="font-medium">IP Address</div>
                            <div className="font-medium">Status</div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>eth0</div>
                            <div>192.168.1.105</div>
                            <div>
                              <Badge variant="outline" className="text-green-500 border-green-500">UP</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>wlan0</div>
                            <div>-</div>
                            <div>
                              <Badge variant="secondary">DOWN</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Select an agent to view network activity
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
              <h3 className="text-lg font-semibold mb-4">Security Events</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => {
                    const agent = agents.find(a => a.id === event.agentId);
                    return (
                      <TableRow key={event.id}>
                        <TableCell>{agent?.name || 'Unknown'}</TableCell>
                        <TableCell className="capitalize">{event.type.replace(/-/g, ' ')}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityBadge(event.severity)}>
                            {event.severity.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={event.status === "active" ? "destructive" : "outline"}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          
          <TabsContent value="scans">
            <AgentScanControl 
              agents={filteredAgents} 
              scanHistory={filteredScans} 
              selectedAgent={selectedAgent} 
              isScanningAgent={isScanningAgent} 
              onStartScan={startScan}
            />
          </TabsContent>
          
          <TabsContent value="download">
            <AgentDownloadCard />
          </TabsContent>
          
          <TabsContent value="api">
            <AgentApiSpecs />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Security;
