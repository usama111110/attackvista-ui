
import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  href: string;
  title: string;
  icon: LucideIcon;
  collapsed?: boolean;
}

export function NavItem({ href, title, icon: Icon, collapsed }: NavItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground",
          collapsed && "justify-center p-2"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {!collapsed && <span>{title}</span>}
    </NavLink>
  );
}
