import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTheme } from "@/context/theme";

// Mock connection data generator for demonstration
const generateConnectionData = () => {
  const connections = [];
  const protocols = ["TCP", "UDP", "HTTP", "HTTPS"];
  const statuses = ["Active", "Established", "Closing", "Time Wait"];
  
  for (let i = 0; i < 10; i++) {
    connections.push({
      id: `conn-${i}`,
      sourceIp: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      sourcePort: Math.floor(Math.random() * 60000) + 1024,
      destIp: `74.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destPort: Math.floor(Math.random() * 1000) + 1,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      bytesIn: Math.floor(Math.random() * 100000),
      bytesOut: Math.floor(Math.random() * 100000),
      timestamp: new Date().toLocaleTimeString(),
      isMalicious: Math.random() > 0.8 // 20% chance of being flagged as malicious
    });
  }
  return connections;
};

export function LiveConnectionsTable() {
  const [connections, setConnections] = useState(generateConnectionData());
  const { isDarkMode } = useTheme();

  // Function to format bytes into KB, MB, GB
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
    else return (bytes / 1073741824).toFixed(2) + " GB";
  };

  // Update connections every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setConnections(generateConnectionData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Source IP</TableHead>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Source Port</TableHead>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Destination IP</TableHead>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Destination Port</TableHead>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Protocol</TableHead>
            <TableHead className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Status</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <ArrowDownRight className="h-4 w-4" />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Ingress</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4" />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Egress</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connections.map((connection) => (
            <TableRow 
              key={connection.id}
              className={connection.isMalicious ? "bg-red-900/20" : ""}
            >
              <TableCell className={`font-mono text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {connection.sourceIp}
                {connection.isMalicious && (
                  <Badge variant="destructive" className="ml-2">Suspicious</Badge>
                )}
              </TableCell>
              <TableCell className={`font-mono text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{connection.sourcePort}</TableCell>
              <TableCell className={`font-mono text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{connection.destIp}</TableCell>
              <TableCell className={`font-mono text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{connection.destPort}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    connection.protocol === "HTTP" || connection.protocol === "HTTPS" 
                      ? "bg-blue-900/20 text-blue-400 border-blue-500/50" 
                      : "bg-purple-900/20 text-purple-400 border-purple-500/50"
                  }
                >
                  {connection.protocol}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    connection.status === "Active" || connection.status === "Established"
                      ? "bg-green-900/20 text-green-400 border-green-500/50"
                      : "bg-orange-900/20 text-orange-400 border-orange-500/50"
                  }
                >
                  {connection.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">{formatBytes(connection.bytesIn)}</TableCell>
              <TableCell className="font-mono text-sm">{formatBytes(connection.bytesOut)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
