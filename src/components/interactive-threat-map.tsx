
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Activity } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  threatType: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
}

const mockThreats: ThreatLocation[] = [
  { id: "1", country: "USA", city: "New York", lat: 40.7128, lng: -74.0060, threatType: "DDoS", severity: "high", timestamp: "2 min ago" },
  { id: "2", country: "China", city: "Beijing", lat: 39.9042, lng: 116.4074, threatType: "Malware", severity: "critical", timestamp: "5 min ago" },
  { id: "3", country: "Russia", city: "Moscow", lat: 55.7558, lng: 37.6176, threatType: "Brute Force", severity: "medium", timestamp: "12 min ago" },
  { id: "4", country: "Brazil", city: "São Paulo", lat: -23.5505, lng: -46.6333, threatType: "SQL Injection", severity: "high", timestamp: "18 min ago" },
  { id: "5", country: "Germany", city: "Berlin", lat: 52.5200, lng: 13.4050, threatType: "Phishing", severity: "low", timestamp: "25 min ago" },
];

export function InteractiveThreatMap() {
  const { isDarkMode } = useTheme();
  const [activeThreats, setActiveThreats] = useState(mockThreats);
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <Card className="p-6 h-[400px] overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Global Threat Map</h3>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-red-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="relative h-[280px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        {/* World map background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Simplified world continents */}
            <path d="M200 150 Q250 120 300 140 Q350 130 400 150 Q450 140 500 160 Q550 150 600 170 L580 200 Q530 190 480 200 Q430 210 380 200 Q330 190 280 200 Q230 210 200 190 Z" 
                  fill="currentColor" opacity="0.3" />
            <path d="M150 250 Q200 230 250 250 Q300 240 350 260 L330 290 Q280 280 230 290 Q180 300 150 280 Z" 
                  fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Threat markers */}
        {activeThreats.map((threat, index) => (
          <div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${(threat.lng + 180) * (100 / 360)}%`,
              top: `${(90 - threat.lat) * (100 / 180)}%`,
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => setSelectedThreat(threat)}
          >
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} animate-ping absolute`} />
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} relative z-10`} />
            </div>
          </div>
        ))}

        {/* Threat details overlay */}
        {selectedThreat && (
          <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm border rounded-lg p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{selectedThreat.city}, {selectedThreat.country}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedThreat(null)}
              >
                ×
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{selectedThreat.threatType}</p>
                <p className="text-xs text-muted-foreground">{selectedThreat.timestamp}</p>
              </div>
              <Badge variant="outline" className={getSeverityTextColor(selectedThreat.severity)}>
                {selectedThreat.severity}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        {["low", "medium", "high", "critical"].map((severity) => (
          <div key={severity} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getSeverityColor(severity)}`} />
            <span className="capitalize">{severity}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
