
import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Shield, Clock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";

interface NotificationProps {
  onClose: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  severity: "critical" | "warning" | "info";
  read: boolean;
}

export function NotificationDropdown({ onClose }: NotificationProps) {
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Critical Alert",
      message: "DDoS attack detected on your main server",
      time: "5 min ago",
      severity: "critical",
      read: false
    },
    {
      id: 2,
      title: "Warning",
      message: "Unusual login attempts detected",
      time: "15 min ago",
      severity: "warning",
      read: false
    },
    {
      id: 3,
      title: "Security Update",
      message: "Security updates are available for your system",
      time: "1 hour ago",
      severity: "info",
      read: true
    },
    {
      id: 4,
      title: "Firewall Alert",
      message: "Firewall blocked 23 connection attempts",
      time: "3 hours ago",
      severity: "warning",
      read: true
    },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const markAsRead = (id: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <Card 
      ref={dropdownRef}
      className={`absolute right-0 top-12 w-96 overflow-hidden shadow-lg animate-fade-in ${
        isDarkMode ? "bg-gray-900/90 border-gray-700/50" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="text-xs text-primary hover:underline"
          >
            Mark all as read
          </button>
          <button 
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700/50`}
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-4 border-b border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors ${
              notification.read ? "opacity-80" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                {notification.severity === "critical" && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {notification.severity === "warning" && (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                {notification.severity === "info" && (
                  <Shield className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">
                    {notification.title}
                    {!notification.read && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-primary inline-block"></span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.time}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700/50">
        <a href="/notifications" className="text-primary text-sm hover:underline">
          View all notifications
        </a>
      </div>
    </Card>
  );
}
