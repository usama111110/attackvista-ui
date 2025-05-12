
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotificationStore, Notification } from '@/utils/notificationUtils';
import { NotificationDropdown } from './notification-dropdown';

interface NotificationContextType {
  isOpen: boolean;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationStore = useNotificationStore();
  
  const unreadCount = notificationStore.notifications.filter(n => !n.read).length;
  
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  const closeNotifications = () => {
    setIsOpen(false);
  };
  
  return (
    <NotificationContext.Provider value={{
      isOpen,
      toggleNotifications,
      closeNotifications,
      notifications: notificationStore.notifications,
      unreadCount,
      markAsRead: notificationStore.markAsRead,
      markAllAsRead: notificationStore.markAllAsRead,
      deleteNotification: notificationStore.deleteNotification,
      clearAll: notificationStore.clearAllNotifications
    }}>
      {children}
      {isOpen && <NotificationDropdown onClose={closeNotifications} />}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
