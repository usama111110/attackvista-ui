
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertCircle } from "lucide-react";

// Define the type for an attack log entry
interface AttackLogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  sourcePort: number;
  destIp: string;
  destPort: number;
  protocol: string;
  attackType: string;
  severity: "critical" | "high" | "medium" | "low";
  payload?: string;
}

interface AttackLogTableProps {
  attackId: string;
  logs: AttackLogEntry[];
  victimIp: string;
}

// Function to generate mock attack logs based on attack type
export const generateMockAttackLogs = (attackId: string, count: number = 10): { logs: AttackLogEntry[], victimIp: string } => {
  // Common victim IPs by subnet to create a pattern
  const victimIps = {
    "ddos": "192.168.1.25",
    "dns": "192.168.2.53",
    "exfil": "10.0.0.15",
    "ransomware": "192.168.1.101",
    "lateral": "10.0.1.45",
    "encrypted": "172.16.0.22",
    "mitre": "10.0.0.88",
    "anomaly": "192.168.2.120",
    "worm": "172.16.0.35",
    "apt": "10.0.1.77",
    "arp": "192.168.1.150",
    "xss": "192.168.2.200",
    "sql": "10.0.0.201"
  }[attackId] || "192.168.1.25";

  // Generate IP based on attack type to create patterns
  const attackerSubnets = {
    "ddos": ["103.35.", "45.227.", "91.92.", "122.194.", "185.156."],
    "dns": ["45.89.", "194.26.", "89.44.", "176.32.", "51.89."],
    "exfil": ["116.24.", "58.221.", "185.220.", "193.27.", "45.153."],
    "ransomware": ["91.219.", "5.188.", "185.220.", "45.32.", "23.94."],
    "lateral": ["192.168.1.", "192.168.2.", "10.0.0.", "10.0.1.", "172.16.0."],
    "encrypted": ["91.92.", "185.220.", "46.182.", "51.68.", "162.247."],
    "mitre": ["91.219.", "5.188.", "185.220.", "45.32.", "23.94."],
    "anomaly": ["91.219.", "45.153.", "185.220.", "193.27.", "51.89."],
    "worm": ["192.168.1.", "192.168.2.", "10.0.0.", "10.0.1.", "172.16.0."]
  }[attackId] || ["45.227.", "91.92.", "185.156.", "103.35.", "122.194."];

  // Protocol patterns based on attack type
  const protocols = {
    "ddos": ["TCP", "UDP", "ICMP"],
    "dns": ["UDP", "TCP"],
    "exfil": ["DNS", "HTTPS", "ICMP"],
    "ransomware": ["HTTPS", "HTTP", "SMB"],
    "lateral": ["SMB", "RDP", "WMI"],
    "encrypted": ["HTTPS", "TLS", "SSH"],
    "mitre": ["HTTP", "HTTPS", "SMB", "RDP"],
    "anomaly": ["TCP", "UDP", "HTTP", "HTTPS"],
    "worm": ["SMB", "HTTP", "NetBIOS"],
    "apt": ["HTTPS", "DNS", "SMTP"],
    "arp": ["ARP"],
    "xss": ["HTTP", "HTTPS"],
    "sql": ["HTTP", "HTTPS", "MySQL", "MSSQL"]
  }[attackId] || ["TCP", "UDP", "HTTP"];

  // Port patterns based on attack type
  const targetPorts = {
    "ddos": [80, 443, 53, 3389, 22],
    "dns": [53, 5353, 8053],
    "exfil": [53, 443, 8080, 22],
    "ransomware": [445, 139, 3389, 22, 21],
    "lateral": [445, 135, 139, 3389, 5985],
    "encrypted": [443, 8443, 22, 8080],
    "mitre": [445, 3389, 80, 443],
    "anomaly": [80, 443, 8080, 22, 3306],
    "worm": [445, 139, 135, 137, 138],
    "apt": [443, 53, 25, 22],
    "arp": [0],
    "xss": [80, 443, 8080],
    "sql": [80, 443, 1433, 3306]
  }[attackId] || [80, 443, 8080];

  // Generate timestamp within the last hour
  const getRecentTimestamp = () => {
    const now = new Date();
    const randomMinutesAgo = Math.floor(Math.random() * 60);
    const randomSecondsAgo = Math.floor(Math.random() * 60);
    now.setMinutes(now.getMinutes() - randomMinutesAgo);
    now.setSeconds(now.getSeconds() - randomSecondsAgo);
    return now.toISOString().replace('T', ' ').substring(0, 19);
  };

  // Generate severity with weighted distribution based on attack type
  const getSeverity = (): "critical" | "high" | "medium" | "low" => {
    const r = Math.random();
    if (["ransomware", "apt", "lateral"].includes(attackId)) {
      // Higher chance of critical for serious attacks
      if (r < 0.4) return "critical";
      if (r < 0.7) return "high";
      if (r < 0.9) return "medium";
      return "low";
    } else {
      // Normal distribution
      if (r < 0.15) return "critical";
      if (r < 0.45) return "high";
      if (r < 0.8) return "medium";
      return "low";
    }
  };

  // Generate the logs
  const logs: AttackLogEntry[] = Array.from({ length: count }, (_, i) => {
    const subnet = attackerSubnets[Math.floor(Math.random() * attackerSubnets.length)];
    const sourceIp = subnet + Math.floor(Math.random() * 255);
    const sourcePort = 1024 + Math.floor(Math.random() * 64000);
    const destPort = targetPorts[Math.floor(Math.random() * targetPorts.length)];
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];

    return {
      id: `log-${attackId}-${i}-${Date.now()}`,
      timestamp: getRecentTimestamp(),
      sourceIp,
      sourcePort,
      destIp: victimIps,  // Fix: Use victimIps instead of victimIp
      destPort,
      protocol,
      attackType: {
        "ddos": "DDoS",
        "dns": "DNS Poisoning",
        "exfil": "Data Exfiltration",
        "ransomware": "Ransomware",
        "lateral": "Lateral Movement",
        "encrypted": "Encrypted Attack",
        "mitre": "MITRE ATT&CK",
        "anomaly": "Anomalous Traffic",
        "worm": "Network Worm",
        "apt": "APT",
        "arp": "ARP Poisoning",
        "xss": "Cross-Site Scripting",
        "sql": "SQL Injection"
      }[attackId] || attackId,
      severity: getSeverity(),
      payload: ["xss", "sql", "exfil"].includes(attackId) ? 
        `Suspicious payload detected in ${protocol} traffic` : undefined
    };
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp)); // Sort by most recent first

  return { logs, victimIp: victimIps };  // Fix: Return victimIps as victimIp
};

export function AttackLogTable({ logs, victimIp }: AttackLogTableProps) {
  // Define colors for severity levels
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Recent Attack Logs
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span>Target IP: <span className="font-mono bg-gray-800/50 px-2 py-0.5 rounded text-red-400">{victimIp}</span></span>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-700/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50">
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="hidden md:table-cell">Payload</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-800/50">
                <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                <TableCell className="font-mono text-xs">
                  {log.sourceIp}:{log.sourcePort}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {log.destIp}:{log.destPort}
                </TableCell>
                <TableCell>{log.protocol}</TableCell>
                <TableCell className={getSeverityColor(log.severity)}>
                  {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs truncate max-w-[200px]">
                  {log.payload || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
