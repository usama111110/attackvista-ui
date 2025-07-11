
import { create } from "zustand";
import { persist } from "zustand/middleware";

// User interface definition
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  lastActive: string;
}

// Initial users to populate the database
const initialUsers: User[] = [
  { 
    id: 1, 
    name: "Admin User", 
    email: "admin@example.com", 
    password: "admin123", // In a real app, passwords should be hashed
    role: "Admin", 
    lastActive: "2 hours ago" 
  },
  { 
    id: 2, 
    name: "Security Analyst", 
    email: "analyst@example.com", 
    password: "analyst123",
    role: "Analyst", 
    lastActive: "5 min ago" 
  },
  { 
    id: 3, 
    name: "Network Manager", 
    email: "manager@example.com", 
    password: "manager123",
    role: "Manager", 
    lastActive: "1 day ago" 
  },
  { 
    id: 4, 
    name: "Guest User", 
    email: "guest@example.com", 
    password: "guest123",
    role: "Guest", 
    lastActive: "1 week ago" 
  },
];

// User store interface
interface UserStore {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, "id" | "lastActive">) => void;
  updateUser: (id: number, userData: Partial<User>) => void;
  deleteUser: (id: number) => void;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

// Create user store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      currentUser: null,
      
      // Add a new user
      addUser: (user) => {
        set((state) => {
          // Generate a new ID (in a real app, this would be handled by the backend)
          const newId = Math.max(0, ...state.users.map((u) => u.id)) + 1;
          
          return {
            users: [
              ...state.users,
              {
                ...user,
                id: newId,
                lastActive: "Just now"
              }
            ]
          };
        });
      },
      
      // Update an existing user
      updateUser: (id, userData) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...userData } : user
          ),
          // If updating the current user, update that as well
          currentUser: state.currentUser?.id === id ? 
            { ...state.currentUser, ...userData } : 
            state.currentUser
        }));
      },
      
      // Delete a user
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          // If deleting the current user, log out
          currentUser: state.currentUser?.id === id ? null : state.currentUser
        }));
      },
      
      // Login functionality
      login: (email, password) => {
        const foundUser = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          // Update last active time
          const updatedUser = { ...foundUser, lastActive: "Just now" };
          set({
            currentUser: updatedUser,
            users: get().users.map((u) => 
              u.id === foundUser.id ? updatedUser : u
            )
          });
          return updatedUser;
        }
        
        return null;
      },
      
      // Logout functionality
      logout: () => {
        set({ currentUser: null });
      }
    }),
    {
      name: "user-storage", // Storage key
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
