
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";

export function UserProfile() {
  const { currentUser, logout } = useUserStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    navigate("/login");
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    
    const hashCode = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hashCode % colors.length];
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
          {currentUser ? (
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt={currentUser.name} />
              <AvatarFallback className={getAvatarColor(currentUser.name)}>
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gray-400">
                <User className="h-5 w-5 text-white" />
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {currentUser ? (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-0.5 leading-none">
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => navigate("/login")}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
