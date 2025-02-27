
import { Link, useLocation } from "react-router-dom";
import { Shield, BarChart, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Shield, label: "Dashboard", path: "/" },
  { icon: BarChart, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function MainNav() {
  const location = useLocation();
  
  return (
    <nav className="py-4 px-2 space-y-1">
      <div className="mb-6 px-4">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <Shield className="h-6 w-6" />
          <span>AttackVista</span>
        </div>
      </div>
      
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
            location.pathname === item.path
              ? "bg-primary/20 text-primary"
              : "text-gray-400 hover:text-white hover:bg-white/10"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
      
      <div className="pt-6 mt-6 border-t border-gray-800">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
