
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, AlertTriangle, Shield, TrendingUp, Eye, CheckCircle, XCircle } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { behavioralAnomalies, BehavioralAnomaly, calculateRiskScore, getAnomalyColor } from "@/utils/mitreAttackUtils";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BehavioralAnalytics() {
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [anomalies, setAnomalies] = useState<BehavioralAnomaly[]>(behavioralAnomalies);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const updateAnomalyStatus = (id: string, status: BehavioralAnomaly['status']) => {
    setAnomalies(prev => 
      prev.map(anomaly => 
        anomaly.id === id ? { ...anomaly, status } : anomaly
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Anomaly marked as ${status.replace('_', ' ')}`,
    });
  };

  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesStatus = statusFilter === "all" || anomaly.status === statusFilter;
    const matchesType = typeFilter === "all" || anomaly.anomalyType === typeFilter;
    return matchesStatus && matchesType;
  });

  const getStatusBadge = (status: BehavioralAnomaly['status']) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400">New</Badge>;
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400">Resolved</Badge>;
      case "false_positive":
        return <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-950/30 dark:text-gray-400">False Positive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: BehavioralAnomaly['anomalyType']) => {
    switch (type) {
      case "login_pattern":
        return <User className="h-4 w-4" />;
      case "data_access":
        return <Shield className="h-4 w-4" />;
      case "network_behavior":
        return <TrendingUp className="h-4 w-4" />;
      case "privilege_escalation":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  // Calculate summary statistics
  const totalAnomalies = anomalies.length;
  const newAnomalies = anomalies.filter(a => a.status === "new").length;
  const highRiskAnomalies = anomalies.filter(a => a.riskScore >= 70).length;
  const averageRiskScore = Math.round(anomalies.reduce((sum, a) => sum + a.riskScore, 0) / totalAnomalies);

  return (
    <Card className={`p-6 backdrop-blur-lg border h-full ${
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Behavioral Analytics</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          AI-Powered
        </Badge>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800/30" : "bg-gray-100/50"}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Anomalies</div>
          <div className="text-xl font-bold">{totalAnomalies}</div>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-red-950/30" : "bg-red-100/50"}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400">New Alerts</div>
          <div className="text-xl font-bold text-red-500">{newAnomalies}</div>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-orange-950/30" : "bg-orange-100/50"}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400">High Risk</div>
          <div className="text-xl font-bold text-orange-500">{highRiskAnomalies}</div>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-blue-950/30" : "bg-blue-100/50"}`}>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Risk Score</div>
          <div className="text-xl font-bold text-blue-500">{averageRiskScore}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="false_positive">False Positive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="login_pattern">Login Pattern</SelectItem>
            <SelectItem value="data_access">Data Access</SelectItem>
            <SelectItem value="network_behavior">Network Behavior</SelectItem>
            <SelectItem value="privilege_escalation">Privilege Escalation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Anomalies List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAnomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
              isDarkMode 
                ? "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50" 
                : "bg-white border-gray-200/80 hover:bg-gray-50/80"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${getAnomalyColor(anomaly.riskScore)} bg-opacity-10`}>
                  {getTypeIcon(anomaly.anomalyType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{anomaly.userName}</h4>
                    {getStatusBadge(anomaly.status)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {anomaly.anomalyType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getAnomalyColor(anomaly.riskScore)}`}>
                  {anomaly.riskScore}
                </div>
                <div className="text-xs text-gray-500">{calculateRiskScore(anomaly)}</div>
              </div>
            </div>

            <p className="text-sm mb-3">{anomaly.description}</p>

            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Risk Score</div>
              <Progress value={anomaly.riskScore} className="h-2" />
            </div>

            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Evidence</div>
              <div className="space-y-1">
                {anomaly.evidence.map((evidence, i) => (
                  <div key={i} className="text-xs bg-muted/50 px-2 py-1 rounded">
                    {evidence}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {anomaly.timestamp.toLocaleString()}
              </div>
              
              {anomaly.status === "new" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAnomalyStatus(anomaly.id, "investigating")}
                    className="gap-1 h-7"
                  >
                    <Eye className="h-3 w-3" />
                    Investigate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAnomalyStatus(anomaly.id, "false_positive")}
                    className="gap-1 h-7"
                  >
                    <XCircle className="h-3 w-3" />
                    False Positive
                  </Button>
                </div>
              )}
              
              {anomaly.status === "investigating" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAnomalyStatus(anomaly.id, "resolved")}
                    className="gap-1 h-7"
                  >
                    <CheckCircle className="h-3 w-3" />
                    Resolve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateAnomalyStatus(anomaly.id, "false_positive")}
                    className="gap-1 h-7"
                  >
                    <XCircle className="h-3 w-3" />
                    False Positive
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAnomalies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No behavioral anomalies found matching the current filters</p>
        </div>
      )}
    </Card>
  );
}
