
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/providers/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Scan, FileCheck, Shield, FileX, ShieldAlert, AlertCircle, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Agent = {
  id: string;
  name: string;
  status: string;
  os: string;
};

type ScanType = 'quick' | 'full' | 'custom';

type ScanHistory = {
  id: string;
  agentId: string;
  type: string;
  startTime: string;
  endTime: string;
  status: string;
  filesScanned: number;
  threatsFound: number;
  threatsRemoved: number;
};

type AgentScanControlProps = {
  agents: Agent[];
  scanHistory: ScanHistory[];
  selectedAgent: string | null;
  isScanningAgent: string | null;
  onStartScan: (agentId: string, scanType: ScanType) => void;
};

export function AgentScanControl({
  agents,
  scanHistory,
  selectedAgent,
  isScanningAgent,
  onStartScan
}: AgentScanControlProps) {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [scanTabView, setScanTabView] = useState<'start' | 'history'>('start');
  
  // Memoize filtered agents and scans to improve performance
  const filteredAgents = useMemo(() => 
    selectedAgent ? agents.filter(agent => agent.id === selectedAgent) : agents,
    [agents, selectedAgent]
  );
    
  const filteredScans = useMemo(() => 
    selectedAgent ? scanHistory.filter(scan => scan.agentId === selectedAgent) : scanHistory,
    [scanHistory, selectedAgent]
  );

  const handleScanAll = (scanType: ScanType) => {
    // Get all online agents
    const onlineAgents = agents.filter(agent => agent.status === "online");
    
    if (onlineAgents.length === 0) {
      toast({
        title: "No online agents",
        description: "There are no online agents available for scanning"
      });
      return;
    }
    
    toast({
      title: `Starting ${scanType} scan on all agents`,
      description: `Initiating scan on ${onlineAgents.length} agents`
    });
    
    // Start scan on each agent with a slight delay to prevent overwhelming the server
    onlineAgents.forEach((agent, index) => {
      setTimeout(() => {
        onStartScan(agent.id, scanType);
      }, index * 300);
    });
  };

  return (
    <div className="space-y-6">
      <Card className={`p-6 shadow-lg rounded-xl ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-indigo-100"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Antivirus Scanner</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50"
              onClick={() => handleScanAll('quick')}
            >
              <Scan size={14} />
              <span>Quick Scan All</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50"
              onClick={() => handleScanAll('full')}
            >
              <Shield size={14} />
              <span>Full Scan All</span>
            </Button>
          </div>
        </div>

        <Tabs 
          value={scanTabView} 
          onValueChange={(v) => setScanTabView(v as 'start' | 'history')}
          className="rounded-lg overflow-hidden"
        >
          <TabsList className="mb-4 p-1 bg-indigo-50/50 dark:bg-gray-800/50 border border-indigo-100 dark:border-gray-700/50 rounded-lg">
            <TabsTrigger value="start" className="rounded-md">Start Scans</TabsTrigger>
            <TabsTrigger value="history" className="rounded-md">Scan History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredAgents.map(agent => (
                <div 
                  key={agent.id} 
                  className={`p-4 rounded-xl border shadow-sm transition-all hover:shadow-md ${
                    agent.status === "online" 
                      ? isDarkMode 
                        ? "border-green-800/30 bg-gradient-to-b from-gray-800/80 to-gray-900/80" 
                        : "border-green-200 bg-gradient-to-b from-white to-indigo-50/30"
                      : isDarkMode
                        ? "border-gray-700/30 bg-gray-900/50 opacity-70"
                        : "border-gray-200 bg-gray-50 opacity-70"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{agent.name}</div>
                    <Badge 
                      variant={agent.status === "online" ? "outline" : "secondary"} 
                      className={`capitalize rounded-full px-2 ${
                        agent.status === "online" 
                          ? "text-green-500 border-green-500 bg-green-100/10" 
                          : ""
                      }`}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">{agent.os}</div>
                  
                  <div className="space-y-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="w-full flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors" 
                      disabled={agent.status !== "online" || isScanningAgent === agent.id}
                      onClick={() => onStartScan(agent.id, "quick")}
                    >
                      <Scan size={14} />
                      {isScanningAgent === agent.id ? "Scanning..." : "Quick Scan"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex items-center gap-1 border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400" 
                      disabled={agent.status !== "online" || isScanningAgent === agent.id}
                      onClick={() => onStartScan(agent.id, "full")}
                    >
                      <Shield size={14} />
                      Full System Scan
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full flex items-center gap-1" 
                      disabled={agent.status !== "online" || isScanningAgent === agent.id}
                      onClick={() => onStartScan(agent.id, "custom")}
                    >
                      <FileCheck size={14} />
                      Custom Scan
                    </Button>
                  </div>
                  
                  {isScanningAgent === agent.id && (
                    <div className="mt-3">
                      <div className="text-xs text-muted-foreground mb-1">Scanning in progress...</div>
                      <Progress value={50} className="h-2 bg-indigo-100 dark:bg-indigo-900/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="rounded-xl overflow-hidden border border-indigo-100 dark:border-gray-700/50">
              <Table>
                <TableHeader className={isDarkMode ? "bg-gray-800/80" : "bg-indigo-50/80"}>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Files Scanned</TableHead>
                    <TableHead>Threats</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScans.length > 0 ? (
                    filteredScans.map((scan) => {
                      const agent = agents.find(a => a.id === scan.agentId);
                      const startTime = new Date(scan.startTime);
                      const endTime = new Date(scan.endTime);
                      const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // minutes
                      
                      return (
                        <TableRow key={scan.id} className="hover:bg-indigo-50/30 dark:hover:bg-gray-800/50 transition-colors">
                          <TableCell>{agent?.name || 'Unknown'}</TableCell>
                          <TableCell className="capitalize">{scan.type}</TableCell>
                          <TableCell>{startTime.toLocaleString()}</TableCell>
                          <TableCell>{duration} min</TableCell>
                          <TableCell>{scan.filesScanned.toLocaleString()}</TableCell>
                          <TableCell>
                            {scan.threatsFound > 0 ? (
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertCircle size={12} />
                                {scan.threatsFound} found, {scan.threatsRemoved} removed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-green-500 border-green-500 flex items-center gap-1">
                                <CheckCircle size={12} />
                                Clean
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`capitalize ${
                                scan.status === "completed" 
                                  ? "border-green-500 text-green-500" 
                                  : scan.status === "in-progress"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-red-500 text-red-500"
                              }`}
                            >
                              {scan.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                          <FileCheck size={32} className="mb-2 text-indigo-400 dark:text-indigo-400" />
                          <p>No scan history available</p>
                          <p className="text-sm text-muted-foreground">Start a scan to see results here</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className={`p-6 shadow-lg rounded-xl ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-indigo-100"}`}>
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Antivirus Detection Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-blue-500" />
              <span>Signature-based Detection</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Compares files against a database of known malware signatures for fast and reliable detection of known threats.
            </p>
          </div>
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-purple-500" />
              <span>Heuristic Analysis</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Examines code for suspicious patterns without relying on exact signatures, helping detect new or modified malware.
            </p>
          </div>
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-green-500" />
              <span>Behavioral Monitoring</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Tracks program behavior in real-time to identify malicious activities like unauthorized system changes.
            </p>
          </div>
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-yellow-500" />
              <span>Machine Learning</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Uses AI algorithms to predict whether files are malicious based on patterns learned from millions of samples.
            </p>
          </div>
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-red-500" />
              <span>Cloud Lookups</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Checks file hashes against real-time cloud databases for up-to-date protection against emerging threats.
            </p>
          </div>
          <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-800/70" : "bg-gradient-to-br from-white to-indigo-50/30"}`}>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <ShieldAlert size={16} className="text-orange-500" />
              <span>YARA Rules</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Uses custom pattern matching rules to identify malware based on textual or binary patterns specific to malware families.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
