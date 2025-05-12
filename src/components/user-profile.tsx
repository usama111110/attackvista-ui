
import { useState } from "react";
import { useUserStore, User } from "@/utils/userDatabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Edit, Save, X, Check, Mail } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function UserProfile() {
  const { currentUser, updateUser } = useUserStore();
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [avatarColor, setAvatarColor] = useState(() => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  });
  
  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U";

  if (!currentUser) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p>Please login to view your profile</p>
        </CardContent>
      </Card>
    );
  }

  const handleSave = () => {
    if (name.trim() === "") {
      toast({
        title: "Invalid Name",
        description: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    updateUser(currentUser.id, {
      name,
      email,
    });

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 px-2 hover:bg-primary/10 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className={`${avatarColor} text-white`}>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{currentUser.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            View and update your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
              <AvatarFallback className={`text-2xl ${avatarColor} text-white`}>{initials}</AvatarFallback>
            </Avatar>
            
            <div className="absolute bottom-0 right-0">
              {!isEditing ? (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="default"
                    className="h-7 w-7 p-0 rounded-full bg-green-500 hover:bg-green-600"
                    onClick={handleSave}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full"
                    onClick={handleCancel}
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3 w-full">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                  <UserRound className="h-4 w-4 text-gray-500" />
                  <span>{currentUser.name}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{currentUser.email}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <Label>Role</Label>
              <div className="flex items-center gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                  {currentUser.role}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Label>Last Active</Label>
              <div className="flex items-center gap-2 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <span>{currentUser.lastActive}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
