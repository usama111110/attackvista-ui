
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Activity, Share2 } from "lucide-react";

// Mock traffic data for demonstration
const generateTrafficData = () => {
  return {
    totalConnections: Math.floor(Math.random() * 1000) + 500,
    activeConnections: Math.floor(Math.random() * 500) + 100,
    ingressRate: Math.floor(Math.random() * 1000) + 100, // KB/s
    egressRate: Math.floor(Math.random() * 800) + 50, // KB/s
    totalIngress: Math.floor(Math.random() * 100) + 50, // GB
    totalEgress: Math.floor(Math.random() * 80) + 30, // GB
    protocols: {
      tcp: Math.floor(Math.random() * 70) + 30,
      udp: Math.floor(Math.random() * 20) + 5,
      http: Math.floor(Math.random() * 30) + 10,
      https: Math.floor(Math.random() * 50) + 20,
    }
  };
};

export function TrafficSummary() {
  const [trafficData, setTrafficData] = useState(generateTrafficData());

  // Update traffic data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(generateTrafficData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Active Connections</p>
            <p className="text-2xl font-bold mt-1">{trafficData.activeConnections}</p>
            <p className="text-xs text-gray-500 mt-1">of {trafficData.totalConnections} total</p>
          </div>
          <div className="p-2 rounded-lg bg-blue-900/20">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
        </div>
      </Card>

      <Card className="p-4 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Ingress Traffic</p>
            <p className="text-2xl font-bold mt-1">{trafficData.ingressRate} KB/s</p>
            <p className="text-xs text-gray-500 mt-1">Total: {trafficData.totalIngress} GB</p>
          </div>
          <div className="p-2 rounded-lg bg-green-900/20">
            <ArrowDown className="h-5 w-5 text-green-400" />
          </div>
        </div>
      </Card>

      <Card className="p-4 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Egress Traffic</p>
            <p className="text-2xl font-bold mt-1">{trafficData.egressRate} KB/s</p>
            <p className="text-xs text-gray-500 mt-1">Total: {trafficData.totalEgress} GB</p>
          </div>
          <div className="p-2 rounded-lg bg-purple-900/20">
            <ArrowUp className="h-5 w-5 text-purple-400" />
          </div>
        </div>
      </Card>

      <Card className="p-4 backdrop-blur-lg bg-gray-800/20 border border-gray-700/50">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Protocol Distribution</p>
            <div className="flex gap-2 mt-2">
              <div className="text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>TCP: {trafficData.protocols.tcp}%</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>UDP: {trafficData.protocols.udp}%</span>
                </div>
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>HTTP: {trafficData.protocols.http}%</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>HTTPS: {trafficData.protocols.https}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-yellow-900/20">
            <Share2 className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      </Card>
    </div>
  );
}
