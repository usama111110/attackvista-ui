
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";
import { Users, User, UserPlus, Copy, Check, Share } from "lucide-react";

export function Collaboration({ trigger }: { trigger: React.ReactNode }) {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  
  const [activeCollaborators, setActiveCollaborators] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Admin", active: true },
    { id: 2, name: "Maya Smith", email: "maya@example.com", role: "Analyst", active: true },
  ]);
  
  const [inviteEmail, setInviteEmail] = useState("");
  const [shareLink, setShareLink] = useState("https://securesentry.app/share/abcd1234");
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    });
  };
  
  const handleInvite = () => {
    if (!inviteEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Invitation Sent",
      description: `Collaboration invitation sent to ${inviteEmail}`,
    });
    
    setInviteEmail("");
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-md ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle>Collaboration</DialogTitle>
          <DialogDescription>
            Invite team members to collaborate in real-time
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Active Collaborators</span>
            </h4>
            
            <div className="space-y-2">
              {activeCollaborators.map(collaborator => (
                <div 
                  key={collaborator.id}
                  className={`p-3 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-gray-50 border border-gray-100'
                  } flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary`}>
                      {collaborator.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{collaborator.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{collaborator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      collaborator.role === 'Admin' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500'
                    }`}>
                      {collaborator.role}
                    </span>
                    <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-primary" />
              <span>Invite Collaborators</span>
            </h4>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                />
              </div>
              <Button onClick={handleInvite}>Invite</Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Share className="h-4 w-4 text-primary" />
              <span>Share Link</span>
            </h4>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={shareLink}
                  readOnly
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''} pr-10`}
                />
              </div>
              <Button size="icon" onClick={handleCopyLink} variant="outline">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This link allows view-only access to your security dashboard
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={() => {}}>
            Manage Permissions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
