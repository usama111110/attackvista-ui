
import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useSettingsStore, EmailFrequency } from "@/utils/notificationUtils";
import { Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EmailSettings = () => {
  const settings = useSettingsStore();
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  
  const [email, setEmail] = useState(settings.emailAddress);
  const [emailError, setEmailError] = useState("");
  
  const validateEmail = (email: string) => {
    if (!email && settings.emailAlerts) {
      return "Email address is required when alerts are enabled";
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    
    return "";
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };
  
  const handleSaveEmail = () => {
    const error = validateEmail(email);
    
    if (error) {
      setEmailError(error);
      return;
    }
    
    settings.updateEmailAddress(email);
    toast({
      title: "Email Updated",
      description: "Your notification email address has been updated.",
    });
  };
  
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    settings.updateEmailFrequency(e.target.value as EmailFrequency);
    toast({
      title: "Email Frequency Updated",
      description: `Email notifications will now be sent ${e.target.value}.`,
    });
  };
  
  useEffect(() => {
    // Reset email error when email alerts are toggled off
    if (!settings.emailAlerts) {
      setEmailError("");
    }
  }, [settings.emailAlerts]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
        <div className="flex">
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            disabled={!settings.emailAlerts}
            placeholder="Enter your email address"
            className={`flex-1 px-3 py-2 rounded-l-md bg-background border ${
              emailError 
                ? "border-red-500" 
                : isDarkMode 
                  ? "border-gray-700" 
                  : "border-gray-300"
            } ${
              !settings.emailAlerts 
                ? isDarkMode 
                  ? "bg-gray-800 text-gray-500" 
                  : "bg-gray-100 text-gray-500" 
                : ""
            }`}
          />
          <button
            onClick={handleSaveEmail}
            disabled={!settings.emailAlerts || Boolean(emailError)}
            className={`px-4 py-2 rounded-r-md ${
              !settings.emailAlerts || Boolean(emailError)
                ? isDarkMode 
                  ? "bg-gray-800 text-gray-500" 
                  : "bg-gray-200 text-gray-500"
                : "bg-primary text-white hover:bg-primary/90"
            } transition-colors`}
          >
            Save
          </button>
        </div>
        {emailError && (
          <div className="flex items-center mt-1 text-red-500 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            {emailError}
          </div>
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <label htmlFor="frequency" className="text-sm font-medium">Notification Frequency</label>
        <select
          id="frequency"
          value={settings.emailFrequency}
          onChange={handleFrequencyChange}
          disabled={!settings.emailAlerts}
          className={`px-3 py-2 rounded-md bg-background border ${
            isDarkMode 
              ? "border-gray-700" 
              : "border-gray-300"
          } ${
            !settings.emailAlerts 
              ? isDarkMode 
                ? "bg-gray-800 text-gray-500" 
                : "bg-gray-100 text-gray-500" 
              : ""
          }`}
        >
          <option value="realtime">Real-time (Immediately)</option>
          <option value="hourly">Hourly Summary</option>
          <option value="daily">Daily Digest</option>
          <option value="weekly">Weekly Report</option>
          <option value="never">Never (Only in-app)</option>
        </select>
        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {settings.emailFrequency === "realtime" && "You will receive emails immediately when important events occur."}
          {settings.emailFrequency === "hourly" && "You will receive a summary of notifications every hour."}
          {settings.emailFrequency === "daily" && "You will receive a daily digest of all notifications."}
          {settings.emailFrequency === "weekly" && "You will receive a weekly report of notifications."}
          {settings.emailFrequency === "never" && "You will only receive notifications in the app."}
        </p>
      </div>
    </div>
  );
};
