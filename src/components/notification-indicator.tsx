
import { useNotifications } from "./notification-provider";
import { Bell } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function NotificationIndicator({ onClick }: { onClick?: () => void }) {
  const { unreadCount } = useNotifications();
  const { isDarkMode } = useTheme();
  
  return (
    <button 
      onClick={onClick || (() => {})}
      className={`p-2 rounded-full transition-all duration-300 relative group ${
        isDarkMode 
          ? 'bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 backdrop-blur-lg hover:text-white hover:shadow-inner' 
          : 'bg-gray-100/90 hover:bg-gray-200/90 text-gray-600 backdrop-blur-lg hover:text-gray-900 hover:shadow-inner'
      }`}
      aria-label="Open notifications"
    >
      <Bell size={18} className="group-hover:scale-110 transition-transform duration-300" />
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  );
}
