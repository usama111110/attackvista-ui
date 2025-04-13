
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";
import { Download, Terminal, Copy, Check, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AgentDownloadCard() {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const [serverAddress, setServerAddress] = useState("");
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    windows: false,
    linux: false,
    mac: false
  });
  
  // Mock version details
  const agentVersion = "1.0.3";
  const releaseDate = "2023-04-10";
  
  // Installation commands
  const installCommands = {
    windows: `# Download the installer
curl -L https://github.com/attackvista/agent/releases/download/v${agentVersion}/attackvista-agent-setup.exe -o attackvista-agent-setup.exe

# Run the installer
./attackvista-agent-setup.exe --server-address=${serverAddress || "your.server.address"}`,
    
    linux: `# Install using our script
curl -s https://install.attackvista.io | sudo bash -s -- --server-address=${serverAddress || "your.server.address"}

# Or download and install manually
wget https://github.com/attackvista/agent/releases/download/v${agentVersion}/attackvista-agent-linux-amd64.tar.gz
tar -xzf attackvista-agent-linux-amd64.tar.gz
cd attackvista-agent
sudo ./install.sh --server-address=${serverAddress || "your.server.address"}`,
    
    mac: `# Install using Homebrew
brew tap attackvista/tap
brew install attackvista-agent

# Configure server address
attackvista-agent config --server-address=${serverAddress || "your.server.address"}

# Start the agent
attackvista-agent start`
  };
  
  const copyToClipboard = (text: string, osType: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [osType]: true });
      toast({
        title: "Copied to clipboard",
        description: "Installation command has been copied"
      });
      
      // Reset copy state after 2 seconds
      setTimeout(() => {
        setCopied({ ...copied, [osType]: false });
      }, 2000);
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold">AttackVista Security Agent</h3>
              <p className="text-sm text-muted-foreground">
                Cross-platform security monitoring agent for Windows, Linux, and macOS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Version {agentVersion}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Released: {releaseDate}
              </Badge>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-dashed">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-grow">
                <Label htmlFor="server-address" className="mb-2 block">AttackVista Server Address</Label>
                <Input
                  id="server-address"
                  placeholder="Enter your AttackVista server address (e.g., 10.0.0.5 or server.example.com)"
                  value={serverAddress}
                  onChange={(e) => setServerAddress(e.target.value)}
                />
              </div>
              <Button variant="outline" disabled={!serverAddress} className="gap-1.5 w-full md:w-auto" onClick={() => {
                toast({
                  title: "Server address set",
                  description: `Using ${serverAddress} for agent installation`
                });
              }}>
                <Globe size={16} />
                <span>Set Server Address</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="windows">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="windows">Windows</TabsTrigger>
              <TabsTrigger value="linux">Linux</TabsTrigger>
              <TabsTrigger value="mac">macOS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="windows">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Windows Installation</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1.5 text-xs" 
                    onClick={() => copyToClipboard(installCommands.windows, "windows")}
                  >
                    {copied.windows ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied.windows ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                  isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                  {installCommands.windows}
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Supported: Windows 10/11, Windows Server 2019/2022
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download size={14} />
                    <span>Download Installer</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="linux">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Linux Installation</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1.5 text-xs" 
                    onClick={() => copyToClipboard(installCommands.linux, "linux")}
                  >
                    {copied.linux ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied.linux ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                  isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                  {installCommands.linux}
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Supported: Ubuntu, Debian, CentOS, RHEL, Fedora, and more
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Terminal size={14} />
                    <span>View Manual Install</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mac">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">macOS Installation</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1.5 text-xs" 
                    onClick={() => copyToClipboard(installCommands.mac, "mac")}
                  >
                    {copied.mac ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied.mac ? "Copied" : "Copy"}</span>
                  </Button>
                </div>
                <div className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                  isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                  {installCommands.mac}
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Supported: macOS 11 (Big Sur) and newer
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download size={14} />
                    <span>Download Package</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-blue-900/10 border border-blue-900/20" : "bg-blue-50 border border-blue-100"}`}>
            <h4 className="font-medium text-blue-600 dark:text-blue-400">Security Agent Features</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Real-time security monitoring and threat detection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>System performance and health metrics collection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Network connection analysis and anomaly detection</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Process monitoring and suspicious activity alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-blue-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Automatic updates and vulnerability scanning</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      <Card className={`p-6 ${isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/90 border-gray-200"}`}>
        <h3 className="text-lg font-semibold mb-4">Agent Architecture & Technical Details</h3>
        <div className="space-y-4">
          <p className="text-sm">
            The AttackVista Security Agent is built with Rust for its core components, providing excellent performance, 
            memory safety, and cross-platform compatibility. The agent utilizes minimal system resources while 
            continuously monitoring for security threats and collecting system metrics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
              <h4 className="font-medium mb-2">Core Technology</h4>
              <ul className="space-y-1 text-sm">
                <li>• Rust for core engine</li>
                <li>• Platform-specific modules in C/C++</li>
                <li>• SQLite for local data storage</li>
                <li>• TLS 1.3 encrypted communications</li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
              <h4 className="font-medium mb-2">System Requirements</h4>
              <ul className="space-y-1 text-sm">
                <li>• Memory: 50MB minimum</li>
                <li>• Disk: 100MB free space</li>
                <li>• CPU: Minimal usage (~1%)</li>
                <li>• Network: Outbound HTTPS access</li>
              </ul>
            </div>
            
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100"}`}>
              <h4 className="font-medium mb-2">Security & Privacy</h4>
              <ul className="space-y-1 text-sm">
                <li>• End-to-end encryption</li>
                <li>• No personal data collection</li>
                <li>• Customizable data collection</li>
                <li>• Digital signature verification</li>
              </ul>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-yellow-900/10 border border-yellow-900/20" : "bg-yellow-50 border border-yellow-100"}`}>
            <h4 className="font-medium text-yellow-600 dark:text-yellow-400">Important Installation Notes</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <div className="bg-yellow-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Administrative or root privileges are required during installation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-yellow-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Firewall exceptions may be needed for communication with the AttackVista server</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-yellow-500 rounded-full w-1.5 h-1.5 mt-1.5"></div>
                <span>Anti-virus software might need to be temporarily disabled during installation</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
