
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Shield, AlertTriangle, Info, CheckCircle, Clock, X } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { 
  useNotificationStore, 
  useSettingsStore, 
  simulateAttackDetection, 
  NotificationType 
} from "@/utils/notificationUtils";

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotificationStore();
  const settings = useSettingsStore();
  const user = useUserStore((state) => state.currentUser);
  
  const [mounted, setMounted] = useState(false);
  
  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Simulate attack detection
  useEffect(() => {
    if (!mounted) return;
    
    // Only simulate attacks if attack notifications are enabled
    if (!settings.attackNotifications) return;
    
    const interval = setInterval(() => {
      const shouldTriggerAttack = Math.random() < 0.3; // 30% chance of attack
      
      if (shouldTriggerAttack) {
        const attackNotification = simulateAttackDetection();
        useNotificationStore.getState().addNotification(attackNotification);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [mounted, settings.attackNotifications]);

  if (!mounted) {
    return null;
  }
  
  // Filter notifications based on user settings
  const filteredNotifications = notifications.filter(notification => {
    if (notification.type === "attack" && !settings.attackNotifications) return false;
    if (notification.type === "system" && !settings.systemNotifications) return false;
    return true;
  });
  
  // Get unread count
  const unreadCount = filteredNotifications.filter(notification => !notification.read).length;
  
  // Get icon for notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "attack":
        return <Shield className="h-5 w-5 text-red-500" />;
      case "system":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
              {unreadCount} unread
            </span>
          )}
        </div>
        <p className="text-gray-400">System alerts and notifications</p>
      </header>

      <Card className="bg-card backdrop-blur-sm border border-gray-700/50 mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Notification Center</CardTitle>
          
          <div className="flex items-center gap-2">
            {filteredNotifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  Mark all as read
                </button>
                
                <button
                  onClick={clearAllNotifications}
                  className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-400 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </button>
              </>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400">No notifications to display</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg transition-colors flex items-start justify-between ${
                    notification.read 
                      ? 'bg-gray-800/20' 
                      : 'bg-gray-800/40 border-l-4 border-primary'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        {!notification.read && (
                          <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </button>
                    )}
                    
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                      title="Delete notification"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;
