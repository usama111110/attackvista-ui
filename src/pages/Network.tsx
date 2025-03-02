
import { DashboardLayout } from "@/components/dashboard-layout";
import { 
  Network as NetworkIcon, 
  Laptop, 
  Server, 
  Smartphone, 
  Wifi, 
  Shield, 
  Globe,
  Share2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Network = () => {
  // Mock data for the network information
  const networkInfo = {
    id: "NET-78921",
    name: "Corporate HQ",
    subnet: "192.168.1.0/24",
    gateway: "192.168.1.1",
    dhcpRange: "192.168.1.100-192.168.1.200",
    dns: ["8.8.8.8", "8.8.4.4"],
    vpnEnabled: true,
    firewallStatus: "Active",
    lastScan: "2 hours ago",
    securityLevel: "High"
  };

  // Mock data for protected systems
  const protectedSystems = [
    { id: "SRV-001", name: "Main Database Server", ip: "192.168.1.10", type: "Server", status: "Protected", icon: Server },
    { id: "SRV-002", name: "Application Server", ip: "192.168.1.11", type: "Server", status: "Protected", icon: Server },
    { id: "SRV-003", name: "File Server", ip: "192.168.1.12", type: "Server", status: "Protected", icon: Server },
    { id: "WS-001", name: "CEO Workstation", ip: "192.168.1.101", type: "Workstation", status: "Protected", icon: Laptop },
    { id: "WS-002", name: "Finance Department", ip: "192.168.1.102", type: "Workstation", status: "Protected", icon: Laptop },
    { id: "WS-003", name: "Engineering Team", ip: "192.168.1.103", type: "Workstation", status: "Protected", icon: Laptop },
    { id: "MOB-001", name: "Executive Mobile Devices", ip: "192.168.1.150", type: "Mobile", status: "Protected", icon: Smartphone },
    { id: "IOT-001", name: "Office IoT Devices", ip: "192.168.1.180", type: "IoT", status: "Protected", icon: Wifi },
  ];

  return (
    <DashboardLayout>
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Network Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and monitor your protected network infrastructure</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 data-card hover-lift animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/20 text-primary rounded-lg">
              <NetworkIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{networkInfo.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">Network ID: {networkInfo.id}</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-gray-600 dark:text-gray-400" />
                <span>Subnet</span>
              </div>
              <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded text-primary">{networkInfo.subnet}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
                <span>Gateway</span>
              </div>
              <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded text-green-600 dark:text-green-400">{networkInfo.gateway}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Laptop size={18} className="text-gray-600 dark:text-gray-400" />
                <span>DHCP Range</span>
              </div>
              <span className="font-mono bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded">{networkInfo.dhcpRange}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Server size={18} className="text-gray-600 dark:text-gray-400" />
                <span>DNS Servers</span>
              </div>
              <div className="flex gap-2">
                {networkInfo.dns.map((dns, index) => (
                  <span key={index} className="font-mono bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded">{dns}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">VPN Status</span>
                <span className={`px-2 py-1 rounded-full text-xs ${networkInfo.vpnEnabled ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" : "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"}`}>
                  {networkInfo.vpnEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Scan</span>
                <span>{networkInfo.lastScan}</span>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Firewall</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">{networkInfo.firewallStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Security Level</span>
                <span className="text-primary font-medium">{networkInfo.securityLevel}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 data-card hover-lift animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/20 text-primary rounded-lg">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Protection Status</h2>
              <p className="text-gray-600 dark:text-gray-400">{protectedSystems.length} systems protected</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Server size={24} className="text-primary mb-2" />
                <span className="text-2xl font-bold">
                  {protectedSystems.filter(s => s.type === "Server").length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">Servers</span>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Laptop size={24} className="text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-2xl font-bold">
                  {protectedSystems.filter(s => s.type === "Workstation").length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">Workstations</span>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Smartphone size={24} className="text-yellow-600 dark:text-yellow-400 mb-2" />
                <span className="text-2xl font-bold">
                  {protectedSystems.filter(s => s.type === "Mobile").length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">Mobile Devices</span>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                <Wifi size={24} className="text-green-600 dark:text-green-400 mb-2" />
                <span className="text-2xl font-bold">
                  {protectedSystems.filter(s => s.type === "IoT").length}
                </span>
                <span className="text-gray-600 dark:text-gray-400">IoT Devices</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 backdrop-blur-lg bg-white/90 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700/50 mb-6 data-card hover-lift animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Protected Systems</h3>
          <div className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800/40 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700/50">
            <Shield size={14} className="text-primary" />
            <span>All systems secure</span>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-700/50">
              <TableHead className="text-gray-600 dark:text-gray-400">System ID</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">System Name</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">IP Address</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400">Type</TableHead>
              <TableHead className="text-gray-600 dark:text-gray-400 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {protectedSystems.map((system) => (
              <TableRow key={system.id} className="border-gray-200 dark:border-gray-700/50">
                <TableCell className="font-mono">{system.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <system.icon size={16} className="text-primary" />
                    <span>{system.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono">{system.ip}</TableCell>
                <TableCell>{system.type}</TableCell>
                <TableCell className="text-right">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    {system.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
};

export default Network;
