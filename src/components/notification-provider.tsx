
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotificationStore, Notification, NotificationType } from '@/utils/notificationUtils';
import { NotificationDropdown } from './notification-dropdown';

// Update the context type to include pushNotification
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
  pushNotification: (notification: { type: NotificationType; title: string; message: string }) => void;
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
  
  // Add the pushNotification function with correct type
  const pushNotification = (notification: { type: NotificationType; title: string; message: string }) => {
    notificationStore.addNotification(notification);
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
      clearAll: notificationStore.clearAllNotifications,
      pushNotification
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
