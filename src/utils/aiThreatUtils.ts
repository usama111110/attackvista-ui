
// This file contains utility functions for AI-powered threat detection

// Import hooks
import { useState, useEffect } from "react";

// Types for AI threat detection
export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface AIThreatInsight {
  id: string;
  type: string;
  confidence: number;
  description: string;
  suggestedAction: string;
  severity: ThreatSeverity;
  timestamp: Date;
  isNew: boolean;
}

// Network traffic data type
interface NetworkTrafficData {
  sourceIP: string;
  destinationIP: string;
  protocol: string;
  port: number;
  timestamp: Date;
  packetSize: number;
  requestCount: number;
}

// Sample dataset for demonstration
const sampleTrafficData: NetworkTrafficData[] = [
  {
    sourceIP: '192.168.1.45',
    destinationIP: '203.0.113.10',
    protocol: 'TCP',
    port: 443,
    timestamp: new Date(),
    packetSize: 1024,
    requestCount: 150
  },
  {
    sourceIP: '192.168.1.32',
    destinationIP: '203.0.113.25',
    protocol: 'UDP',
    port: 53,
    timestamp: new Date(),
    packetSize: 512,
    requestCount: 85
  },
  {
    sourceIP: '192.168.1.78',
    destinationIP: '198.51.100.5',
    protocol: 'TCP',
    port: 80,
    timestamp: new Date(),
    packetSize: 2048,
    requestCount: 320
  }
];

// AI model that analyzes traffic patterns and identifies anomalies
export function analyzeTrafficPatterns(trafficData: NetworkTrafficData[]): AIThreatInsight[] {
  // In a real implementation, this would use actual ML algorithms
  // Here we're simulating the AI detection logic
  
  const insights: AIThreatInsight[] = [];
  
  // Detect high request counts (simulating potential DDoS)
  const highRequestTraffic = trafficData.filter(data => data.requestCount > 200);
  if (highRequestTraffic.length > 0) {
    highRequestTraffic.forEach(traffic => {
      insights.push({
        id: `ddos-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type: "Potential DDoS Attack",
        confidence: Math.floor(Math.random() * 10) + 85, // 85-95%
        description: `Unusually high request count (${traffic.requestCount}) detected from IP ${traffic.sourceIP}`,
        suggestedAction: "Enable rate limiting and verify traffic legitimacy",
        severity: "high",
        timestamp: new Date(),
        isNew: true
      });
    });
  }
  
  // Detect suspicious port access (simulating potential port scanning)
  const suspiciousPorts = [22, 3389, 21, 23];
  trafficData.forEach(traffic => {
    if (suspiciousPorts.includes(traffic.port)) {
      insights.push({
        id: `port-scan-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type: "Suspicious Port Access",
        confidence: Math.floor(Math.random() * 15) + 75, // 75-90%
        description: `Access attempt detected on sensitive port ${traffic.port} from IP ${traffic.sourceIP}`,
        suggestedAction: "Review firewall rules and block unauthorized access",
        severity: "medium",
        timestamp: new Date(),
        isNew: true
      });
    }
  });
  
  // Random chance of detecting an advanced threat (simulating zero-day exploit)
  if (Math.random() > 0.7) {
    insights.push({
      id: `zero-day-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: "Zero-Day Vulnerability",
      confidence: Math.floor(Math.random() * 10) + 80, // 80-90%
      description: "Unusual traffic pattern matching potential zero-day exploit signature",
      suggestedAction: "Update all systems and apply emergency patches",
      severity: "critical",
      timestamp: new Date(),
      isNew: true
    });
  }
  
  return insights;
}

// Function to simulate fetching network traffic data
function fetchNetworkTrafficData(): Promise<NetworkTrafficData[]> {
  // In a real app, this would fetch from a backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate some random variations in the sample data
      const variableData = sampleTrafficData.map(data => ({
        ...data,
        packetSize: data.packetSize + Math.floor(Math.random() * 500),
        requestCount: data.requestCount + Math.floor(Math.random() * 100),
        timestamp: new Date()
      }));
      resolve(variableData);
    }, 1000);
  });
}

// Hook for AI threat detection
export function useAIThreatDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<AIThreatInsight[]>([]);
  const [detectionScore, setDetectionScore] = useState(0);
  const [trafficData, setTrafficData] = useState<NetworkTrafficData[]>([]);

  // Fetch initial traffic data
  useEffect(() => {
    let isMounted = true;
    
    const fetchInitialData = async () => {
      const data = await fetchNetworkTrafficData();
      if (isMounted) {
        setTrafficData(data);
        // Run initial analysis with 30% chance of finding something
        if (Math.random() > 0.7) {
          const initialInsights = analyzeTrafficPatterns(data);
          setInsights(initialInsights);
          setDetectionScore(initialInsights.length > 0 ? 65 : 45);
        } else {
          setDetectionScore(45); // Baseline score
        }
      }
    };
    
    fetchInitialData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Function to trigger manual analysis
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Fetch fresh network data
      const freshData = await fetchNetworkTrafficData();
      setTrafficData(freshData);
      
      // Analyze the data using our AI model
      const newInsights = analyzeTrafficPatterns(freshData);
      
      // Mark all previous insights as not new
      const updatedPreviousInsights = insights.map(insight => ({
        ...insight,
        isNew: false
      }));
      
      // Combine new insights with previous ones
      const allInsights = [...newInsights, ...updatedPreviousInsights];
      
      // Update the state
      setInsights(allInsights);
      
      // Update the detection score based on new insights
      if (newInsights.length > 0) {
        // Increase the score when new threats are found
        const severityImpact = newInsights.reduce((score, insight) => {
          switch (insight.severity) {
            case 'critical': return score + 15;
            case 'high': return score + 10;
            case 'medium': return score + 5;
            default: return score + 2;
          }
        }, 0);
        
        setDetectionScore(prev => Math.min(prev + severityImpact, 100));
      } else {
        // Small increase for running the analysis even if nothing found
        setDetectionScore(prev => Math.min(prev + 3, 100));
      }
      
      return newInsights;
    } catch (error) {
      console.error("Error running AI threat analysis:", error);
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Return the hook values
  return {
    isAnalyzing,
    insights,
    detectionScore,
    runAnalysis,
    trafficData
  };
}

// Function to categorize threats based on AI confidence
export function categorizeThreat(confidence: number): ThreatSeverity {
  if (confidence >= 90) return 'critical';
  if (confidence >= 75) return 'high';
  if (confidence >= 50) return 'medium';
  return 'low';
}

// Export AI model information
export const aiModelInfo = {
  name: "ThreatSentry ML",
  version: "1.3.5",
  features: [
    "Network anomaly detection",
    "User behavior analysis",
    "Zero-day exploit prediction",
    "DDoS pattern recognition",
    "Credential stuffing detection"
  ],
  accuracy: "91.5%",
  lastUpdated: "2025-04-28"
};
