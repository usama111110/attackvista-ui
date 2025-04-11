import {
  Home,
  Layout,
  BadgeInfo,
  Activity,
  Network,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Bell,
  AreaChart
} from "lucide-react";
import { NavItem } from "./nav-item";

interface MainNavProps {
  className?: string;
  collapsed?: boolean;
}

const navItems = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Custom Dashboard", href: "/custom-dashboard", icon: Layout }, // Add this line
  { title: "Detection", href: "/detection", icon: BadgeInfo },
  { title: "Live Traffic", href: "/live-traffic", icon: Activity },
  { title: "Analytics", href: "/analytics", icon: AreaChart },
  { title: "Network", href: "/network", icon: Network },
  { title: "Users", href: "/users", icon: UsersIcon },
  { title: "Settings", href: "/settings", icon: SettingsIcon },
  { title: "Notifications", href: "/notifications", icon: Bell },
];

export function MainNav({
  className,
  collapsed
}: MainNavProps) {
  return (
    <nav className={className}>
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            title={item.title}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
      </div>
    </nav>
  )
}
