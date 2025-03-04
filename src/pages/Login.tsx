import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/providers/ThemeProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Authentication Required",
        description: location.state.message,
        variant: "destructive"
      });
    }
  }, [location.state, toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    setTimeout(() => {
      const user = login(email, password);
      
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`
        });
        navigate("/");
      } else {
        setError("Invalid email or password");
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Network Security Dashboard</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800/50 backdrop-blur-md border-gray-700' : 'bg-white/90 backdrop-blur-md border-gray-200'} rounded-xl p-8 shadow-xl border`}>
          <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Login</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-700/30 rounded-lg flex items-center gap-2 text-red-400">
              <AlertTriangle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full ${isDarkMode ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full ${isDarkMode ? 'bg-gray-900/50 border-gray-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <div className={`mt-6 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            <p>Default users for testing:</p>
            <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} space-y-1`}>
              <p>admin@example.com / admin123</p>
              <p>analyst@example.com / analyst123</p>
              <p>guest@example.com / guest123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
