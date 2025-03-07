
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define notification types
export type NotificationType = "attack" | "system" | "info" | "success";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock notifications data
const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "attack",
    title: "DDoS Attack Detected",
    message: "A potential DDoS attack was detected from IP 192.168.1.105",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "attack",
    title: "SQL Injection Attempt",
    message: "Multiple SQL injection attempts detected from IP 203.45.78.32",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "system",
    title: "System Update Available",
    message: "A new security update is available for your system",
    time: "3 hours ago",
    read: true
  },
  {
    id: 4,
    type: "info",
    title: "Network Scan Completed",
    message: "The scheduled network vulnerability scan has been completed",
    time: "5 hours ago",
    read: true
  },
  {
    id: 5,
    type: "success",
    title: "Firewall Rules Updated",
    message: "Firewall rules have been successfully updated",
    time: "Yesterday",
    read: true
  }
];

// Create Notifications store
interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "read" | "time">) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: initialNotifications,
      
      addNotification: (notification) => {
        set((state) => {
          const newId = Math.max(0, ...state.notifications.map((n) => n.id)) + 1;
          return {
            notifications: [
              {
                ...notification,
                id: newId,
                read: false,
                time: "Just now"
              },
              ...state.notifications
            ]
          };
        });
      },
      
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        }));
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => 
            ({ ...notification, read: true })
          )
        }));
      },
      
      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((notification) => notification.id !== id)
        }));
      },
      
      clearAllNotifications: () => {
        set({ notifications: [] });
      }
    }),
    {
      name: "notifications-storage"
    }
  )
);

// Email notification frequency options
export type EmailFrequency = "realtime" | "hourly" | "daily" | "weekly" | "never";

// Create settings store
export interface SettingsState {
  attackNotifications: boolean;
  systemNotifications: boolean;
  darkMode: boolean;
  logoutOnInactivity: boolean;
  highSecurityMode: boolean;
  anonymousUsageData: boolean;
  networkMonitoring: boolean;
  emailAlerts: boolean;
  emailAddress: string;
  emailFrequency: EmailFrequency;
  networkDataRetentionDays: number;
  attackDataRetentionDays: number;
  toggleSetting: (setting: keyof Omit<SettingsState, "toggleSetting" | "emailAddress" | "emailFrequency" | "networkDataRetentionDays" | "attackDataRetentionDays" | "updateNetworkDataRetention" | "updateAttackDataRetention" | "updateEmailAddress" | "updateEmailFrequency">) => void;
  updateEmailAddress: (email: string) => void;
  updateEmailFrequency: (frequency: EmailFrequency) => void;
  updateNetworkDataRetention: (days: number) => void;
  updateAttackDataRetention: (days: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      attackNotifications: true,
      systemNotifications: true,
      darkMode: true,
      logoutOnInactivity: false,
      highSecurityMode: false,
      anonymousUsageData: true,
      networkMonitoring: true,
      emailAlerts: false,
      emailAddress: "",
      emailFrequency: "daily",
      networkDataRetentionDays: 30, // Default to 30 days for normal traffic
      attackDataRetentionDays: 90, // Default to 90 days for attack traffic
      toggleSetting: (setting) => 
        set((state) => ({ [setting]: !state[setting] })),
      updateEmailAddress: (email) =>
        set({ emailAddress: email }),
      updateEmailFrequency: (frequency) =>
        set({ emailFrequency: frequency }),
      updateNetworkDataRetention: (days) =>
        set({ networkDataRetentionDays: days }),
      updateAttackDataRetention: (days) =>
        set({ attackDataRetentionDays: days }),
    }),
    {
      name: "settings-storage",
    }
  )
);

// Utility function to simulate attack detection
export const simulateAttackDetection = () => {
  const attackTypes = [
    { title: "DDoS Attack Detected", message: "A potential DDoS attack was detected from IP 192.168.1.105" },
    { title: "SQL Injection Attempt", message: "Multiple SQL injection attempts detected from IP 203.45.78.32" },
    { title: "XSS Attack Blocked", message: "Cross-site scripting attack was blocked from IP 78.32.45.90" },
    { title: "Brute Force Attack", message: "Brute force login attempt detected from IP 45.67.89.21" },
    { title: "Suspicious Network Activity", message: "Unusual network behavior detected from device MAC:00:1B:44:11:3A:B7" }
  ];
  
  const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
  
  return {
    type: "attack" as NotificationType,
    title: randomAttack.title,
    message: randomAttack.message
  };
};
