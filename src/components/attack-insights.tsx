
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Lock, Network, Worm, Bug, Zap, Search } from "lucide-react";

// Simulated attack insights data
const insightsData = [
  {
    type: "DDoS",
    icon: Zap,
    description: "Distributed Denial of Service attacks attempting to overwhelm servers with traffic",
    recommendation: "Implement rate limiting and traffic filtering at edge servers",
    severity: "high",
    trend: "increasing"
  },
  {
    type: "DNS Exfiltration",
    icon: Bug,
    description: "Data exfiltration through manipulated DNS queries",
    recommendation: "Monitor DNS query patterns and implement DNS filtering",
    severity: "critical",
    trend: "stable"
  },
  {
    type: "Ransomware",
    icon: Lock,
    description: "Encryption-based attacks attempting to lock systems for ransom",
    recommendation: "Regular backups and zero-trust security model implementation",
    severity: "critical",
    trend: "decreasing"
  },
  {
    type: "Network Worm",
    icon: Worm,
    description: "Self-replicating malware spreading across connected systems",
    recommendation: "Network segmentation and enhanced endpoint security",
    severity: "high",
    trend: "stable"
  }
];

export function AttackInsights() {
  return (
    <Card className="p-6 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50 data-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gradient">Attack Insights</h3>
        </div>
        <div className="flex items-center gap-2 bg-gray-800/40 px-3 py-1 rounded-full border border-gray-700/50 animate-pulse">
          <Search className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400">Real-time analysis</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {insightsData.map((insight, index) => (
          <div 
            key={index} 
            className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:bg-gray-700/40 transition-all duration-300 hover-lift"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                insight.severity === "critical" ? "bg-red-900/20 text-red-400" :
                insight.severity === "high" ? "bg-orange-900/20 text-orange-400" :
                "bg-blue-900/20 text-blue-400"
              }`}>
                <insight.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{insight.type}</h4>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.severity === "critical" ? "bg-red-900/20 text-red-400" :
                      insight.severity === "high" ? "bg-orange-900/20 text-orange-400" :
                      "bg-blue-900/20 text-blue-400"
                    }`}>
                      {insight.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.trend === "increasing" ? "bg-red-900/20 text-red-400" :
                      insight.trend === "decreasing" ? "bg-green-900/20 text-green-400" :
                      "bg-gray-700/30 text-gray-400"
                    }`}>
                      {insight.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-1.5">{insight.description}</p>
                
                <div className="mt-3 bg-gray-900/40 rounded p-2 border border-gray-700/30">
                  <span className="text-xs text-gray-500">RECOMMENDATION</span>
                  <p className="text-sm text-gray-300">{insight.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
