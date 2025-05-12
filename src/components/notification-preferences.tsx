
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettingsStore } from "@/utils/notificationUtils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";
import { Bell, BellRing, Shield, Info, CheckCircle, User, Mail } from "lucide-react";

export function NotificationPreferences({ trigger }: { trigger: React.ReactNode }) {
  const settings = useSettingsStore();
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  
  const [attackNotifications, setAttackNotifications] = useState(settings.attackNotifications);
  const [systemNotifications, setSystemNotifications] = useState(settings.systemNotifications);
  const [emailAlerts, setEmailAlerts] = useState(settings.emailAlerts);
  const [emailFrequency, setEmailFrequency] = useState(settings.emailFrequency);
  
  const handleSave = () => {
    // Save notification preferences
    if (attackNotifications !== settings.attackNotifications) {
      settings.toggleSetting('attackNotifications');
    }
    
    if (systemNotifications !== settings.systemNotifications) {
      settings.toggleSetting('systemNotifications');
    }
    
    if (emailAlerts !== settings.emailAlerts) {
      settings.toggleSetting('emailAlerts');
    }
    
    if (emailFrequency !== settings.emailFrequency) {
      settings.updateEmailFrequency(emailFrequency);
    }
    
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated",
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle>Notification Preferences</DialogTitle>
          <DialogDescription>
            Customize how and when you receive notifications
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <BellRing className="h-4 w-4 text-primary" />
              <span>In-App Notifications</span>
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <Label htmlFor="attack-notifications" className="text-sm">Attack Notifications</Label>
                </div>
                <Switch 
                  id="attack-notifications" 
                  checked={attackNotifications}
                  onCheckedChange={setAttackNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <Label htmlFor="system-notifications" className="text-sm">System Notifications</Label>
                </div>
                <Switch 
                  id="system-notifications" 
                  checked={systemNotifications}
                  onCheckedChange={setSystemNotifications}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>Email Notifications</span>
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  <Label htmlFor="email-alerts" className="text-sm">Email Alerts</Label>
                </div>
                <Switch 
                  id="email-alerts" 
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              
              {emailAlerts && (
                <div className="space-y-2">
                  <Label htmlFor="email-frequency" className="text-sm">Frequency</Label>
                  <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                    <SelectTrigger id="email-frequency" className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={handleSave}>Save Preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
