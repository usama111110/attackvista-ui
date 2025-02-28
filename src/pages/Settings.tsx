
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, Shield, Bell, Zap, Globe, EyeOff, Wifi, Moon, Sun, MailWarning } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSettingsStore } from "@/utils/notificationUtils";

const Settings = () => {
  const settings = useSettingsStore();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  
  // Wait for client-side hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleToggle = (setting: keyof Omit<typeof settings, "toggleSetting">) => {
    settings.toggleSetting(setting);
    
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} has been ${settings[setting] ? 'disabled' : 'enabled'}.`,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Configure system settings and preferences</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" /> 
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Attack Notifications</p>
                  <p className="text-xs text-gray-400">Get notified when attacks are detected</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.attackNotifications}
                  onChange={() => handleToggle('attackNotifications')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">System Notifications</p>
                  <p className="text-xs text-gray-400">Get notified about system events</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.systemNotifications}
                  onChange={() => handleToggle('systemNotifications')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MailWarning className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Email Alerts</p>
                  <p className="text-xs text-gray-400">Receive critical alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle('emailAlerts')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> 
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">High Security Mode</p>
                  <p className="text-xs text-gray-400">Enable stricter security checks</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.highSecurityMode}
                  onChange={() => handleToggle('highSecurityMode')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Auto Logout on Inactivity</p>
                  <p className="text-xs text-gray-400">Automatically log out when inactive</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.logoutOnInactivity}
                  onChange={() => handleToggle('logoutOnInactivity')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> 
              Network Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="text-sm font-medium">Network Monitoring</p>
                  <p className="text-xs text-gray-400">Continuously monitor network traffic</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.networkMonitoring}
                  onChange={() => handleToggle('networkMonitoring')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-indigo-500" />
                <div>
                  <p className="text-sm font-medium">Anonymous Usage Data</p>
                  <p className="text-xs text-gray-400">Share anonymous data to improve security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.anonymousUsageData}
                  onChange={() => handleToggle('anonymousUsageData')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" /> 
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-gray-400">Use dark mode for the interface</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')} 
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
