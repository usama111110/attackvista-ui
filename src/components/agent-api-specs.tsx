
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/providers/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Code, Shield, Server, Network } from "lucide-react";

export function AgentApiSpecs() {
  const { isDarkMode } = useTheme();
  
  return (
    <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Agent API Specification</h3>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="data">Data Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-4">
            <p>
              The AttackVista Security Agent communicates with the central server using a RESTful API over 
              HTTPS. All communication is encrypted and authenticated to ensure data security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>API Security</span>
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• TLS 1.3 for all communications</li>
                  <li>• API key + JWT token authentication</li>
                  <li>• Rate limiting and request throttling</li>
                  <li>• Request signing and verification</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span>Server Requirements</span>
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Open HTTPS port (default: 443)</li>
                  <li>• Valid TLS certificate</li>
                  <li>• Static IP or domain name</li>
                  <li>• Minimum 2GB RAM, 2 CPU cores</li>
                </ul>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Network className="h-4 w-4 text-primary" />
                <span>Communication Flow</span>
              </h4>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>1. Agent registration and authentication</p>
                <p>2. Periodic heartbeat and status updates (configurable interval)</p>
                <p>3. Security event reporting (real-time)</p>
                <p>4. System metrics collection (configurable frequency)</p>
                <p>5. Command and control from server to agent</p>
                <p>6. Configuration updates and policy enforcement</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="auth">
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-blue-900/10 border border-blue-900/20" : "bg-blue-50 border border-blue-100"}`}>
              <h4 className="font-medium text-blue-600 dark:text-blue-400">Authentication Flow</h4>
              <div className="mt-2 space-y-2 text-sm">
                <p className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  1. Agent -&gt; Server: Initial registration with agent UUID and auth key
                </p>
                <p className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  2. Server -&gt; Agent: JWT token + refresh token if validated
                </p>
                <p className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  3. Agent -&gt; Server: Includes JWT in Authorization header for all requests
                </p>
                <p className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                  4. Agent -&gt; Server: Uses refresh token to get new JWT when expired
                </p>
              </div>
            </div>
            
            <h4 className="font-medium mt-4">Authentication Headers</h4>
            <div className={`overflow-x-auto ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-4`}>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Header</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Description</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Example</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="py-2 pr-4 font-mono">Authorization</td>
                    <td className="py-2 pr-4">JWT token for authenticated requests</td>
                    <td className="py-2 font-mono text-xs">Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">X-Agent-ID</td>
                    <td className="py-2 pr-4">Unique agent identifier</td>
                    <td className="py-2 font-mono text-xs">550e8400-e29b-41d4-a716-446655440000</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">X-Request-Timestamp</td>
                    <td className="py-2 pr-4">Request timestamp for verification</td>
                    <td className="py-2 font-mono text-xs">2023-04-12T14:32:00Z</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">X-Request-Signature</td>
                    <td className="py-2 pr-4">HMAC signature of request</td>
                    <td className="py-2 font-mono text-xs">sha256=7392bc2267...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="endpoints">
          <div className="space-y-4">
            <div className={`overflow-x-auto ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-4`}>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Endpoint</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Method</th>
                    <th className="text-left text-sm font-medium text-muted-foreground pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/agents/register</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Register a new agent with the server</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/agents/heartbeat</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Regular agent check-in and status update</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/events</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Submit security event or alert</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/metrics</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Submit system performance metrics</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/network</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Submit network connection information</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/commands</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-blue-500">GET</Badge>
                    </td>
                    <td className="py-2">Retrieve commands from the server</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/config</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-blue-500">GET</Badge>
                    </td>
                    <td className="py-2">Get latest agent configuration</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">/api/v1/commands/{"{id}"}/result</td>
                    <td className="py-2 pr-4">
                      <Badge className="bg-green-500">POST</Badge>
                    </td>
                    <td className="py-2">Submit command execution results</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="data">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Agent Registration Payload</h4>
              <pre className={`p-4 rounded-lg overflow-x-auto text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
{`{
  "agentId": "550e8400-e29b-41d4-a716-446655440000",
  "hostname": "desktop-win-01",
  "os": {
    "type": "windows",
    "version": "10",
    "build": "19044"
  },
  "ip": "192.168.1.105",
  "mac": "00:1A:2B:3C:4D:5E",
  "systemInfo": {
    "cpuModel": "Intel Core i7-10700",
    "cpuCores": 8,
    "memoryTotal": 16384,
    "diskTotal": 512000
  },
  "agentVersion": "1.0.3",
  "authKey": "c29tZXJhbmRvbWtleQ=="
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Security Event Payload</h4>
              <pre className={`p-4 rounded-lg overflow-x-auto text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
{`{
  "id": "event-001",
  "type": "malware-detection",
  "severity": "high",
  "timestamp": "2023-04-12T14:32:00Z",
  "details": {
    "file": "C:\\Users\\Downloads\\suspicious.exe",
    "hash": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "signatures": ["signature1", "signature2"],
    "actionTaken": "quarantined"
  },
  "status": "active"
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">System Metrics Payload</h4>
              <pre className={`p-4 rounded-lg overflow-x-auto text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
{`{
  "timestamp": "2023-04-12T14:35:00Z",
  "cpuUsage": 32.5,
  "memoryUsage": {
    "total": 16384,
    "used": 10485,
    "free": 5899
  },
  "diskUsage": [
    {
      "device": "C:",
      "total": 512000,
      "used": 399360,
      "free": 112640
    }
  ],
  "networkInterfaces": [
    {
      "name": "eth0",
      "ipv4": "192.168.1.105",
      "ipv6": "fe80::1a2b:3c4d:5e6f",
      "rxBytes": 1024000,
      "txBytes": 512000
    }
  ],
  "processes": {
    "total": 124,
    "cpu": [
      {
        "pid": 1234,
        "name": "chrome.exe",
        "usage": 12.3
      }
    ],
    "memory": [
      {
        "pid": 1234,
        "name": "chrome.exe",
        "usage": 1024
      }
    ]
  }
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Network Information Payload</h4>
              <pre className={`p-4 rounded-lg overflow-x-auto text-xs ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
{`{
  "timestamp": "2023-04-12T14:38:00Z",
  "connections": [
    {
      "localIp": "192.168.1.105",
      "localPort": 54321,
      "remoteIp": "203.0.113.5",
      "remotePort": 443,
      "protocol": "TCP",
      "state": "ESTABLISHED",
      "process": {
        "pid": 1234,
        "name": "chrome.exe"
      }
    }
  ],
  "openPorts": [
    {
      "port": 443,
      "protocol": "TCP",
      "process": {
        "pid": 5678,
        "name": "nginx.exe"
      }
    }
  ],
  "dnsQueries": [
    {
      "domain": "example.com",
      "result": "203.0.113.10",
      "timestamp": "2023-04-12T14:37:55Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
