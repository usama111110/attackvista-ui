
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertTriangle, Shield, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/utils/userDatabase";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/providers/ThemeProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, currentUser } = useUserStore();
  const { isDarkMode } = useTheme();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  
  // Show notification if redirected to login page
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Authentication Required",
        description: location.state.message,
        variant: "destructive"
      });
    }
  }, [location.state, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    try {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Call login function from user store
      const user = login(email, password);
      
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`
        });
        navigate("/");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid email or password");
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Enhanced animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
        } animate-pulse blur-3xl`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
        } animate-pulse delay-1000 blur-3xl`}></div>
        
        {/* Additional security-themed orbs */}
        <div className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 ${
          isDarkMode ? 'bg-green-500/20' : 'bg-green-500/10'
        } animate-pulse delay-500 blur-2xl`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-500/10'
        } animate-pulse delay-1500 blur-2xl`}></div>
        
        {/* Hexagonal security grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Simplified logo and branding */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
                <Logo size="lg" />
              </div>
            </div>
            <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
              Network Security
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
              Enterprise Dashboard
            </p>
          </div>

          {/* Enhanced login form */}
          <div className={`relative ${
            isDarkMode 
              ? 'bg-gray-900/90 backdrop-blur-2xl border-gray-700/40 shadow-2xl shadow-black/50' 
              : 'bg-white/95 backdrop-blur-2xl border-white/50 shadow-2xl shadow-gray-900/10'
          } rounded-3xl p-12 border-2`}>
            
            <div className="mb-10">
              <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>
                Sign In
              </h2>
              <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Access your security dashboard
              </p>
            </div>
            
            {error && (
              <div className="mb-8 p-5 bg-red-900/20 border border-red-700/30 rounded-2xl flex items-center gap-3 text-red-400 animate-fade-in">
                <AlertTriangle size={20} />
                <div>
                  <p className="font-medium">Authentication Failed</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-4">
                <label htmlFor="email" className={`text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} block`}>
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${
                      isDarkMode ? 'text-gray-500 group-focus-within:text-primary' : 'text-gray-400 group-focus-within:text-primary'
                    }`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400' 
                        : 'bg-gray-50/90 border-gray-300/60 text-gray-900 placeholder-gray-500'
                    } border-2 rounded-2xl py-5 pl-14 pr-5 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 font-medium`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label htmlFor="password" className={`text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} block`}>
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${
                      isDarkMode ? 'text-gray-500 group-focus-within:text-primary' : 'text-gray-400 group-focus-within:text-primary'
                    }`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400' 
                        : 'bg-gray-50/90 border-gray-300/60 text-gray-900 placeholder-gray-500'
                    } border-2 rounded-2xl py-5 pl-14 pr-16 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 font-medium`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-5"
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                    )}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 text-white py-5 rounded-2xl font-bold text-lg hover:from-primary/90 hover:to-primary/80 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-primary/20 mt-10"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6" />
                    Access Dashboard
                  </>
                )}
              </button>
            </form>
            
            {/* Enhanced demo credentials section */}
            <div className={`mt-12 p-6 rounded-2xl ${
              isDarkMode 
                ? 'bg-gray-800/60 border border-gray-700/40' 
                : 'bg-gray-50/80 border border-gray-200/60'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                <p className={`text-base font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Demo Accounts
                </p>
              </div>
              <div className={`space-y-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex justify-between items-center p-4 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-semibold">Administrator</span>
                  <code className={`px-3 py-2 rounded-lg text-sm font-mono ${isDarkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'}`}>
                    admin@example.com / admin123
                  </code>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-semibold">Security Analyst</span>
                  <code className={`px-3 py-2 rounded-lg text-sm font-mono ${isDarkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'}`}>
                    analyst@example.com / analyst123
                  </code>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-black/5 dark:bg-white/5">
                  <span className="font-semibold">Guest User</span>
                  <code className={`px-3 py-2 rounded-lg text-sm font-mono ${isDarkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'}`}>
                    guest@example.com / guest123
                  </code>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simplified footer */}
          <div className="text-center mt-8">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 NetworkFort. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
