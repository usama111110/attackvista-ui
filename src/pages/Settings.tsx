import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, Shield, Bell, Zap, Globe, EyeOff, Wifi, Moon, Sun, MailWarning, Mail, Database, ActivitySquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSettingsStore } from "@/utils/notificationUtils";
import { useTheme } from "@/providers/ThemeProvider";
import { EmailSettings } from "@/components/email-settings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const settings = useSettingsStore();
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [networkRetentionDays, setNetworkRetentionDays] = useState('30');
  const [attackRetentionDays, setAttackRetentionDays] = useState('90');
  
  // Wait for client-side hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setNetworkRetentionDays(settings.networkDataRetentionDays.toString());
    setAttackRetentionDays(settings.attackDataRetentionDays.toString());
  }, [settings.networkDataRetentionDays, settings.attackDataRetentionDays]);
  
  const handleToggle = (setting: keyof Omit<typeof settings, "toggleSetting" | "emailAddress" | "emailFrequency" | "networkDataRetentionDays" | "attackDataRetentionDays" | "updateEmailAddress" | "updateEmailFrequency" | "updateNetworkDataRetention" | "updateAttackDataRetention">) => {
    settings.toggleSetting(setting);
    
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} has been ${settings[setting] ? 'disabled' : 'enabled'}.`,
    });
  };

  // Handle dark mode toggle specifically
  const handleDarkModeToggle = () => {
    toggleDarkMode();
    
    toast({
      title: "Theme Updated",
      description: `${isDarkMode ? 'Light' : 'Dark'} mode has been enabled.`,
    });
  };

  // Handle network data retention days update
  const handleNetworkRetentionUpdate = () => {
    const days = parseInt(networkRetentionDays);
    
    if (isNaN(days) || days < 1) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number of days (minimum 1).",
        variant: "destructive",
      });
      setNetworkRetentionDays(settings.networkDataRetentionDays.toString());
      return;
    }
    
    settings.updateNetworkDataRetention(days);
    
    toast({
      title: "Network Data Retention Updated",
      description: `Normal network traffic data will now be retained for ${days} days.`,
    });
  };

  // Handle attack data retention days update
  const handleAttackRetentionUpdate = () => {
    const days = parseInt(attackRetentionDays);
    
    if (isNaN(days) || days < 1) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number of days (minimum 1).",
        variant: "destructive",
      });
      setAttackRetentionDays(settings.attackDataRetentionDays.toString());
      return;
    }
    
    settings.updateAttackDataRetention(days);
    
    toast({
      title: "Attack Data Retention Updated",
      description: `Attack traffic data will now be retained for ${days} days.`,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure system settings and preferences</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary" /> 
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">Attack Notifications</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notified when attacks are detected</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.attackNotifications}
                  onChange={() => handleToggle('attackNotifications')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">System Notifications</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notified about system events</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.systemNotifications}
                  onChange={() => handleToggle('systemNotifications')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MailWarning className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Email Alerts</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive critical alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle('emailAlerts')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> 
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">High Security Mode</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Enable stricter security checks</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.highSecurityMode}
                  onChange={() => handleToggle('highSecurityMode')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <EyeOff className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Auto Logout on Inactivity</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automatically log out when inactive</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.logoutOnInactivity}
                  onChange={() => handleToggle('logoutOnInactivity')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" /> 
              Email Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {settings.emailAlerts ? (
              <EmailSettings />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Mail className={`h-12 w-12 mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className="text-sm font-medium mb-1">Email Notifications Disabled</p>
                <p className={`text-xs max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Enable Email Alerts in the Notification Settings to configure email delivery options.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" /> 
              Data Retention Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Wifi className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Normal Network Traffic Retention</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Specify how many days to keep regular network traffic data
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={networkRetentionDays}
                    onChange={(e) => setNetworkRetentionDays(e.target.value)}
                    className={`w-24 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                  />
                  <span className="flex items-center">days</span>
                  <Button 
                    onClick={handleNetworkRetentionUpdate}
                    className="ml-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Attack Traffic Retention</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Specify how many days to keep attack-related traffic data
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={attackRetentionDays}
                    onChange={(e) => setAttackRetentionDays(e.target.value)}
                    className={`w-24 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
                  />
                  <span className="flex items-center">days</span>
                  <Button 
                    onClick={handleAttackRetentionUpdate}
                    className="ml-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-4 p-3 rounded-md border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                <p className="font-medium mb-1">Note:</p>
                <p>Attack traffic is typically retained longer than normal traffic to enable thorough forensic analysis. Adjust according to your organization's compliance requirements.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> 
              Network Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5 text-cyan-500" />
                <div>
                  <p className="text-sm font-medium">Network Monitoring</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Continuously monitor network traffic</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.networkMonitoring}
                  onChange={() => handleToggle('networkMonitoring')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-indigo-500" />
                <div>
                  <p className="text-sm font-medium">Anonymous Usage Data</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Share anonymous data to improve security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.anonymousUsageData}
                  onChange={() => handleToggle('anonymousUsageData')} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${isDarkMode 
          ? 'bg-card backdrop-blur-sm border-gray-700/50' 
          : 'bg-white border-gray-200 shadow-sm'}`}
        >
          <CardHeader className={isDarkMode ? '' : 'border-b border-gray-100'}>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sun className="h-5 w-5 text-primary" /> 
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Use dark mode for the interface</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isDarkMode}
                  onChange={handleDarkModeToggle} 
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary`}></div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
