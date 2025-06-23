
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { Eye, Shield, AlertTriangle, Activity, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced attack data with more details
const enhancedAttackData = [
  { 
    id: 1,
    type: "DDoS Attack", 
    ip: "192.168.1.1", 
    time: "2 min ago", 
    severity: "High", 
    details: "TCP flood targeting port 80",
    location: "Moscow, Russia",
    blocked: true,
    packetsCount: 45000,
    duration: "5 min"
  },
  { 
    id: 2,
    type: "SQL Injection", 
    ip: "192.168.1.45", 
    time: "15 min ago", 
    severity: "Critical", 
    details: "Attack detected on login form",
    location: "Beijing, China",
    blocked: true,
    packetsCount: 234,
    duration: "2 min"
  },
  { 
    id: 3,
    type: "Brute Force", 
    ip: "192.168.2.12", 
    time: "1 hour ago", 
    severity: "Medium", 
    details: "Multiple failed auth attempts",
    location: "São Paulo, Brazil",
    blocked: false,
    packetsCount: 1205,
    duration: "15 min"
  },
  { 
    id: 4,
    type: "XSS Attack", 
    ip: "192.168.3.78", 
    time: "3 hours ago", 
    severity: "High", 
    details: "Stored XSS in comment field",
    location: "London, UK",
    blocked: true,
    packetsCount: 89,
    duration: "1 min"
  },
  { 
    id: 5,
    type: "Port Scan", 
    ip: "192.168.5.22", 
    time: "4 hours ago", 
    severity: "Low", 
    details: "Systematic port scanning detected",
    location: "New York, USA",
    blocked: true,
    packetsCount: 567,
    duration: "8 min"
  }
];

export function EnhancedAttackLog() {
  const { isDarkMode } = useTheme();
  const [selectedAttack, setSelectedAttack] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30";
      case "High":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800/30";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30";
      default:
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30";
    }
  };

  const getAttackIcon = (type: string) => {
    switch (type) {
      case "DDoS Attack":
        return <Activity className="h-5 w-5" />;
      case "SQL Injection":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <Card className={`p-6 backdrop-blur-lg border hover-lift animate-fade-in ${
      isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Enhanced Attack Log</h3>
          <Badge variant="outline" className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30">
            {enhancedAttackData.length} Recent
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Real-time monitoring
        </div>
      </div>

      <div className="space-y-3">
        {enhancedAttackData.map((attack, i) => (
          <div 
            key={attack.id} 
            className={cn(
              "group relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
              isDarkMode 
                ? "bg-gradient-to-r from-gray-900/30 to-gray-800/20 hover:from-gray-900/50 hover:to-gray-800/40 border-gray-700/30" 
                : "bg-gradient-to-r from-white to-gray-50/80 hover:from-white hover:to-gray-100/60 border-gray-200/60",
              selectedAttack === attack.id && "ring-2 ring-primary/50"
            )}
            onClick={() => setSelectedAttack(selectedAttack === attack.id ? null : attack.id)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-full transition-colors",
                    attack.severity === "Critical" 
                      ? "bg-red-500/10 text-red-500" 
                      : attack.severity === "High" 
                        ? "bg-orange-500/10 text-orange-500" 
                        : attack.severity === "Medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-green-500/10 text-green-500"
                  )}>
                    {getAttackIcon(attack.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{attack.type}</p>
                      {attack.blocked && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30 text-xs">
                          Blocked
                        </Badge>
                      )}
                      {i === 0 && (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/30 animate-pulse text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {attack.ip}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {attack.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getSeverityColor(attack.severity)}>
                    {attack.severity}
                  </Badge>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full group-hover:scale-110 transition-transform">
                    <Eye size={14} />
                  </Button>
                </div>
              </div>

              {selectedAttack === attack.id && (
                <div className="mt-4 pt-4 border-t border-muted/30 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Details</p>
                      <p>{attack.details}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Location</p>
                      <p>{attack.location}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Duration</p>
                      <p>{attack.duration}</p>
                      <p className="text-xs text-muted-foreground">{attack.packetsCount.toLocaleString()} packets</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Animated background elements */}
            <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500"></div>
            <div className="absolute -left-4 -bottom-4 w-6 h-6 rounded-full bg-primary/5 opacity-50 transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </Card>
  );
}
