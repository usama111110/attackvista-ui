
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNotificationStore, Notification, simulateAttackDetection } from "@/utils/notificationUtils";
import { toast } from 'sonner';
import { Shield, AlertTriangle, Info, CheckCircle, Bell } from 'lucide-react';

interface NotificationContextType {
  pushNotification: (notification: Omit<Notification, "id" | "read" | "time">) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { addNotification, notifications } = useNotificationStore();
  const { toast: uiToast } = useToast();
  const [unreadCount, setUnreadCount] = useState(0);

  // Push notification helper
  const pushNotification = (notification: Omit<Notification, "id" | "read" | "time">) => {
    addNotification(notification);
    
    // Show different types of UI notifications based on type
    if (notification.type === 'attack') {
      toast.error(notification.title, {
        description: notification.message,
        icon: <AlertTriangle className="h-4 w-4" />,
        duration: 5000,
      });
    } else if (notification.type === 'system') {
      toast.info(notification.title, {
        description: notification.message,
        icon: <Info className="h-4 w-4" />,
        duration: 4000,
      });
    } else if (notification.type === 'success') {
      toast.success(notification.title, {
        description: notification.message,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 3000,
      });
    } else {
      toast.info(notification.title, {
        description: notification.message,
        icon: <Info className="h-4 w-4" />,
        duration: 3000,
      });
    }
    
    // For critical attack notifications, also show the shadcn toast
    if (notification.type === 'attack') {
      uiToast({
        title: "🚨 " + notification.title,
        description: notification.message,
        variant: "destructive",
      });
    }
  };

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Simulate random security events (for demo purposes)
  useEffect(() => {
    // Simulate a security event every 30-90 seconds
    const simulateSecurityEvent = () => {
      const attackNotification = simulateAttackDetection();
      pushNotification(attackNotification);
    };

    // Set up a simulation interval
    const minInterval = 30000; // 30 seconds
    const maxInterval = 90000; // 90 seconds
    
    const scheduleNextSimulation = () => {
      const randomDelay = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
      return setTimeout(() => {
        simulateSecurityEvent();
        timeoutId = scheduleNextSimulation();
      }, randomDelay);
    };
    
    let timeoutId = scheduleNextSimulation();
    
    // Clean up on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NotificationContext.Provider value={{ pushNotification, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
