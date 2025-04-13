
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { Library, Server, Lock, Clock, Shield, Network, Settings, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AgentTechStack() {
  const { isDarkMode } = useTheme();

  const techComponents = {
    core: [
      { name: "Rust", description: "High-performance, memory-safe systems programming", type: "language" },
      { name: "tokio", description: "Asynchronous runtime for networking and I/O", type: "library" },
      { name: "reqwest", description: "HTTP client for API communication", type: "library" },
      { name: "serde", description: "Data serialization and deserialization", type: "library" },
      { name: "SQLite", description: "Embedded database for local storage", type: "database" },
      { name: "clap", description: "Command line argument parsing", type: "library" },
      { name: "log4rs", description: "Configurable logging framework", type: "library" },
    ],
    security: [
      { name: "ring", description: "Cryptographic operations and TLS", type: "library" },
      { name: "jsonwebtoken", description: "JWT token validation and creation", type: "library" },
      { name: "OpenSSL", description: "TLS and cryptographic functions", type: "library" },
      { name: "zeroize", description: "Secure memory wiping", type: "library" },
      { name: "sha2", description: "SHA-2 cryptographic hash functions", type: "library" },
      { name: "BLAKE3", description: "Cryptographic hash function for file integrity", type: "algorithm" },
    ],
    monitoring: [
      { name: "sysinfo", description: "Cross-platform system information", type: "library" },
      { name: "pnet", description: "Low-level networking for packet analysis", type: "library" },
      { name: "YARA", description: "Pattern matching for malware detection", type: "engine" },
      { name: "ClamAV", description: "Antivirus engine integration", type: "engine" },
      { name: "procfs", description: "Linux process filesystem interface", type: "library" },
      { name: "psutil", description: "Process and system utilities", type: "library" },
    ]
  };

  const architectureDetails = [
    {
      name: "Core Agent Service",
      icon: Shield,
      description: "Manages the agent lifecycle and coordinates all monitoring activities",
      features: [
        "Handles agent registration with server",
        "Manages authentication and authorization",
        "Coordinates monitoring modules",
        "Ensures reliable data transmission",
        "Implements automatic recovery mechanisms"
      ]
    },
    {
      name: "System Monitor",
      icon: Server,
      description: "Collects system performance metrics and resource usage information",
      features: [
        "CPU, memory, and disk usage monitoring",
        "Process monitoring and resource tracking",
        "Hardware information collection",
        "Performance anomaly detection",
        "System health assessment"
      ]
    },
    {
      name: "Network Monitor",
      icon: Network,
      description: "Monitors network traffic and connections for security threats",
      features: [
        "Connection tracking and logging",
        "Network traffic analysis",
        "DNS query monitoring",
        "Suspicious connection detection",
        "Protocol analysis capabilities"
      ]
    },
    {
      name: "Security Scanner",
      icon: Lock,
      description: "Performs security scanning and threat detection",
      features: [
        "File integrity monitoring",
        "Malware and virus detection",
        "Vulnerability scanning",
        "Behavioral analysis",
        "Signature-based detection"
      ]
    },
    {
      name: "Data Manager",
      icon: Library,
      description: "Manages data collection, storage, and transmission",
      features: [
        "Local data storage and management",
        "Data compression and optimization",
        "Efficient data transmission protocols",
        "Offline operation capabilities",
        "Data retention policies"
      ]
    },
    {
      name: "Configuration Manager",
      icon: Settings,
      description: "Handles agent configuration and policy enforcement",
      features: [
        "Remote configuration updates",
        "Policy-based configuration",
        "User-defined monitoring rules",
        "Environment-specific settings",
        "Configuration validation"
      ]
    }
  ];
  
  return (
    <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Agent Technology Stack</h3>
      </div>
      
      <Tabs defaultValue="components">
        <TabsList className="mb-4">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="tech">Technology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="components">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {architectureDetails.map((component, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${
                  isDarkMode ? "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60" : 
                  "bg-white border-gray-200 hover:bg-gray-50"
                } transition-colors`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`}>
                    <component.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-medium">{component.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                <ul className="space-y-1">
                  {component.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className={`bg-primary rounded-full w-1.5 h-1.5 mt-1.5 flex-shrink-0`}></div>
                      <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="architecture">
          <div className="space-y-6">
            <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800/40" : "bg-gray-100"}`}>
              <h4 className="font-medium mb-4">Agent Architecture</h4>
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <div className={`inline-block p-4 rounded-lg ${isDarkMode ? "bg-primary/20" : "bg-primary/10"}`}>
                    <Shield className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <div className="mt-2 font-medium">Core Agent Service</div>
                  <div className="mt-1 text-sm text-muted-foreground">Manages agent lifecycle</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* System Monitor */}
                  <div className="text-center">
                    <div className={`p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-100"}`}>
                      <Server className="h-6 w-6 text-blue-500 mx-auto" />
                    </div>
                    <div className="mt-2 text-sm font-medium">System Monitor</div>
                  </div>
                  
                  {/* Network Monitor */}
                  <div className="text-center">
                    <div className={`p-3 rounded-lg ${isDarkMode ? "bg-green-900/20" : "bg-green-100"}`}>
                      <Network className="h-6 w-6 text-green-500 mx-auto" />
                    </div>
                    <div className="mt-2 text-sm font-medium">Network Monitor</div>
                  </div>
                  
                  {/* Security Scanner */}
                  <div className="text-center">
                    <div className={`p-3 rounded-lg ${isDarkMode ? "bg-red-900/20" : "bg-red-100"}`}>
                      <Lock className="h-6 w-6 text-red-500 mx-auto" />
                    </div>
                    <div className="mt-2 text-sm font-medium">Security Scanner</div>
                  </div>
                  
                  {/* Data Manager */}
                  <div className="text-center">
                    <div className={`p-3 rounded-lg ${isDarkMode ? "bg-purple-900/20" : "bg-purple-100"}`}>
                      <Library className="h-6 w-6 text-purple-500 mx-auto" />
                    </div>
                    <div className="mt-2 text-sm font-medium">Data Manager</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                    <Clock className="h-6 w-6 text-gray-500 mx-auto" />
                  </div>
                  <div className="mt-2 text-sm font-medium">Scheduler & Background Services</div>
                </div>
                
                <div className="flex items-center justify-center mt-2">
                  <div className="w-0 h-16 border-l-2 border-dashed border-gray-400"></div>
                </div>
                
                <div className="text-center">
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-blue-900/30" : "bg-blue-200"}`}>
                    <Server className="h-6 w-6 text-blue-500 mx-auto" />
                  </div>
                  <div className="mt-2 text-sm font-medium">AttackVista Server</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/40" : "bg-gray-100"}`}>
                <h4 className="font-medium mb-3">Data Flow</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">1</div>
                    <div>
                      <span className="font-medium">Data Collection</span>
                      <p className="text-muted-foreground">Monitors collect system metrics, network data, and security information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">2</div>
                    <div>
                      <span className="font-medium">Local Processing</span>
                      <p className="text-muted-foreground">Data is analyzed locally for immediate threats and anomalies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">3</div>
                    <div>
                      <span className="font-medium">Local Storage</span>
                      <p className="text-muted-foreground">Information is temporarily stored in local database if server is unreachable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">4</div>
                    <div>
                      <span className="font-medium">Data Transmission</span>
                      <p className="text-muted-foreground">Encrypted data is sent to AttackVista server at configurable intervals</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/40" : "bg-gray-100"}`}>
                <h4 className="font-medium mb-3">Communication</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">1</div>
                    <div>
                      <span className="font-medium">Agent Registration</span>
                      <p className="text-muted-foreground">Secure registration with server using unique agent ID and authentication key</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">2</div>
                    <div>
                      <span className="font-medium">Secure Channel</span>
                      <p className="text-muted-foreground">TLS 1.3 encrypted communication with certificate validation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">3</div>
                    <div>
                      <span className="font-medium">Bidirectional Control</span>
                      <p className="text-muted-foreground">Server can send commands and configuration updates to agent</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs text-white">4</div>
                    <div>
                      <span className="font-medium">Heartbeat Mechanism</span>
                      <p className="text-muted-foreground">Regular check-ins to verify agent status and connectivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tech">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-700/50" : "border-gray-200"}`}>
                <h4 className="font-medium mb-3">Core Technologies</h4>
                <div className="space-y-2">
                  {techComponents.core.map((tech, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-2 rounded ${
                        isDarkMode ? "bg-gray-800/50 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <span>{tech.name}</span>
                      <Badge variant="outline" className="text-xs capitalize">{tech.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-700/50" : "border-gray-200"}`}>
                <h4 className="font-medium mb-3">Security Components</h4>
                <div className="space-y-2">
                  {techComponents.security.map((tech, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-2 rounded ${
                        isDarkMode ? "bg-gray-800/50 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <span>{tech.name}</span>
                      <Badge variant="outline" className="text-xs capitalize">{tech.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-700/50" : "border-gray-200"}`}>
                <h4 className="font-medium mb-3">Monitoring Technologies</h4>
                <div className="space-y-2">
                  {techComponents.monitoring.map((tech, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-2 rounded ${
                        isDarkMode ? "bg-gray-800/50 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <span>{tech.name}</span>
                      <Badge variant="outline" className="text-xs capitalize">{tech.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-blue-900/10 border border-blue-900/20" : "bg-blue-50 border border-blue-100"}`}>
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Why Rust for the Core?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                <div className="space-y-1">
                  <div className="font-medium">Memory Safety</div>
                  <p className="text-muted-foreground">Eliminates memory-related vulnerabilities without runtime cost</p>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Performance</div>
                  <p className="text-muted-foreground">Comparable to C/C++ with much stronger safety guarantees</p>
                </div>
                <div className="space-y-1">
                  <div className="font-medium">Cross-Platform</div>
                  <p className="text-muted-foreground">Excellent support for Windows, Linux, and macOS from single codebase</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/40" : "bg-gray-100"}`}>
              <h4 className="font-medium mb-3">Platform-Specific Implementation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Badge variant="outline" className="mb-2">Windows</Badge>
                  <ul className="space-y-1">
                    <li>• Windows API for system monitoring</li>
                    <li>• WMI for hardware information</li>
                    <li>• ETW for event tracing</li>
                    <li>• Windows Security APIs</li>
                  </ul>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Linux</Badge>
                  <ul className="space-y-1">
                    <li>• procfs interface for process data</li>
                    <li>• sysfs for hardware information</li>
                    <li>• eBPF for advanced monitoring</li>
                    <li>• Linux Audit framework</li>
                  </ul>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">macOS</Badge>
                  <ul className="space-y-1">
                    <li>• IOKit for hardware information</li>
                    <li>• EndpointSecurity framework</li>
                    <li>• Darwin Kernel interfaces</li>
                    <li>• macOS security frameworks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
