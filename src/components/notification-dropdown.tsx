
import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Shield, Clock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/providers/ThemeProvider";
import { Notification } from "@/utils/notificationUtils";
import { useNotifications } from "./notification-provider";

interface NotificationProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationProps) {
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  
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

  return (
    <Card 
      ref={dropdownRef}
      className={`fixed right-6 top-16 w-96 overflow-hidden shadow-lg animate-fade-in z-50 ${
        isDarkMode ? "bg-gray-900/90 border-gray-700/50" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="font-semibold">Notifications</h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => markAllAsRead()}
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
                {notification.type === "attack" && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                {notification.type === "system" || notification.type === "warning" && (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                {notification.type === "info" || notification.type === "success" && (
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
