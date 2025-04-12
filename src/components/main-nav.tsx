
import {
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  Activity,
  BarChart,
  Network,
  Users,
  FileText
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/utils/userDatabase";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { MainNavItem, NavItem } from "@/types";

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  collapsed: boolean;
}

interface NavItemType {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export function MainNav({
  items,
  children,
  collapsed
}: MainNavProps) {
  const { isAuthenticated, currentUser } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !isAuthenticated || !currentUser) {
    return null;
  }

  const navItems: NavItemType[] = [
    {
      path: "/",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      path: "/detection",
      label: "Threat Detection",
      icon: <Shield size={18} />
    },
    {
      path: "/live-traffic",
      label: "Live Traffic",
      icon: <Activity size={18} />
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: <BarChart size={18} />
    },
    {
      path: "/network",
      label: "Network",
      icon: <Network size={18} />
    },
    {
      path: "/reports",
      label: "Reports",
      icon: <FileText size={18} />
    },
    {
      path: "/users",
      label: "User Management",
      icon: <Users size={18} />
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings size={18} />
    }
  ];

  return (
    <div className="flex flex-col space-y-1">
      <div className="px-3 py-2">
        <h2 className={`mb-2 px-4 text-sm font-semibold ${collapsed ? 'hidden' : ''}`}>
          Main Menu
        </h2>
        <ul className="space-y-1">
          {navItems?.length ? (
            navItems.map(item => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    location.pathname === item.path ? 'bg-accent text-accent-foreground' : ''
                  } ${isDarkMode
                    ? 'text-gray-300 hover:text-gray-50'
                    : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <div className="mr-2">{item.icon}</div>
                  <span className={collapsed ? 'hidden' : ''}>{item.label}</span>
                </Link>
              </li>
            ))
          ) : null}
        </ul>
      </div>
    </div>
  )
}
