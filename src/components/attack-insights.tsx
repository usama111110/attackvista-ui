
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Lock, Network, Worm, Bug, Zap, Search } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

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
  const { isDarkMode } = useTheme();
  
  return (
    <Card className={`p-6 backdrop-blur-lg ${
      isDarkMode ? "bg-gray-800/20 border-gray-700/50 text-gray-100" : "bg-white/90 border-gray-200 text-gray-800"
    } data-card hover-lift animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-gradient" : "text-gray-800"}`}>Attack Insights</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border animate-pulse ${
          isDarkMode ? "bg-gray-800/40 border-gray-700/50 text-gray-400" : "bg-gray-100 border-gray-200 text-gray-600"
        }`}>
          <Search className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Real-time analysis</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {insightsData.map((insight, index) => (
          <div 
            key={index} 
            className={`rounded-lg p-4 border hover:bg-gray-200 transition-all duration-300 hover-lift animate-fade-in ${
              isDarkMode ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-700/40" : "bg-gray-100 border-gray-200"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                insight.severity === "critical" ? 
                  isDarkMode ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-600" :
                insight.severity === "high" ? 
                  isDarkMode ? "bg-orange-900/20 text-orange-400" : "bg-orange-100 text-orange-600" :
                  isDarkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-100 text-blue-600"
              }`}>
                <insight.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{insight.type}</h4>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.severity === "critical" ? 
                        isDarkMode ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-600" :
                      insight.severity === "high" ? 
                        isDarkMode ? "bg-orange-900/20 text-orange-400" : "bg-orange-100 text-orange-600" :
                        isDarkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-100 text-blue-600"
                    }`}>
                      {insight.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      insight.trend === "increasing" ? 
                        isDarkMode ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-600" :
                      insight.trend === "decreasing" ? 
                        isDarkMode ? "bg-green-900/20 text-green-400" : "bg-green-100 text-green-600" :
                        isDarkMode ? "bg-gray-700/30 text-gray-400" : "bg-gray-200 text-gray-600"
                    }`}>
                      {insight.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm mt-1.5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{insight.description}</p>
                
                <div className={`mt-3 rounded p-2 border ${
                  isDarkMode ? "bg-gray-900/40 border-gray-700/30" : "bg-white/50 border-gray-200"
                }`}>
                  <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>RECOMMENDATION</span>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{insight.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
