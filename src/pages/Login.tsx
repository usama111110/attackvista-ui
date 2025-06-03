
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
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
        } animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
        } animate-pulse delay-1000`}></div>
        
        {/* Security grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'} 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                <Logo size="lg" />
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              SecureSentry
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Network Security Dashboard
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className={`w-4 h-4 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Enterprise-grade protection
              </span>
            </div>
          </div>

          {/* Login form */}
          <div className={`relative ${
            isDarkMode 
              ? 'bg-gray-900/60 backdrop-blur-xl border-gray-800/50 shadow-2xl shadow-black/20' 
              : 'bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl shadow-gray-900/10'
          } rounded-2xl p-8 border`}>
            
            {/* Security badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className={`px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                isDarkMode 
                  ? 'bg-green-900/50 text-green-400 border border-green-700/50' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                <Shield className="w-3 h-3" />
                Secure Login
              </div>
            </div>

            <div className="pt-4">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Sign in to your account
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                Access your security dashboard and network monitoring tools
              </p>
              
              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-xl flex items-center gap-3 text-red-400 animate-fade-in">
                  <AlertTriangle size={20} />
                  <div>
                    <p className="font-medium">Authentication Failed</p>
                    <p className="text-sm opacity-90">{error}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                          ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500' 
                          : 'bg-gray-50/50 border-gray-300/50 text-gray-900 placeholder-gray-400'
                      } border rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                          ? 'bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500' 
                          : 'bg-gray-50/50 border-gray-300/50 text-gray-900 placeholder-gray-400'
                      } border rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
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
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-primary/70 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Secure Sign In
                    </>
                  )}
                </button>
              </form>
              
              {/* Demo credentials */}
              <div className={`mt-8 p-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-gray-800/30 border border-gray-700/30' 
                  : 'bg-gray-50/50 border border-gray-200/50'
              }`}>
                <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Demo Accounts for Testing:
                </p>
                <div className={`space-y-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Administrator:</span>
                    <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'}`}>
                      admin@example.com / admin123
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Security Analyst:</span>
                    <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'}`}>
                      analyst@example.com / analyst123
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Guest User:</span>
                    <code className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'}`}>
                      guest@example.com / guest123
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Protected by enterprise-grade security protocols
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
